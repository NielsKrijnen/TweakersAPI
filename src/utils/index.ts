import type { Config, Product } from "../types";
import { innerHTML } from "./parse";
import { parse, type HTMLElement } from "node-html-parser";

/** This needs to be a page that ends with '/vergelijken' **/
export function listProducts(text: string) {
  const html = parse(text)

  const productsWrapperEl = html.querySelector(".item-listing")
  if (!productsWrapperEl) throw Error("Product listing not found");
  const productsEl = productsWrapperEl.querySelectorAll("li");

  const products: (Product | null)[] = productsEl.map(el => {
    const imgEl = el.querySelector("img")
    const nameEl = el.querySelector(".editionName")
    if (!nameEl || !imgEl) return null;

    const img = imgEl?.getAttribute("src") || ''
    const name = nameEl?.innerHTML || ''
    const href = nameEl.getAttribute("href") || ''
    const id = parseInt(href.split('/')[4] || '0')

    return { name, id, img }
  })

  return products.filter(product => !!product)
}

export function getProduct<T extends Config>(text: string, config: T): Promise<{ name?: string } & {
  -readonly [K in keyof T["tables"] as T["tables"][K]["key"]]: ReturnType<T["tables"][K]["handle"]>
}> {
  const getTable = (table: HTMLElement) => {
    const rows = Array.from(table.querySelectorAll("tr"))
    const result: Record<string, string> = {}

    rows.map(row => {
      const spans = row.querySelectorAll("span");
      if (!spans[0] || !spans[1]) return;
      const key = spans[0].innerHTML
      result[key] = spans[1].innerHTML;
    })

    return result;
  }

  const html = parse(text)

  let name = html.querySelector("h1")?.innerHTML
  name = innerHTML(name?.replaceAll('\n ', '').trim())

  const tables = html.querySelectorAll("table")
  const result: Record<string, any> = { name }

  tables.map(tableEl => {
    const nameEl = tableEl.querySelector("h3");
    if (!nameEl) return;

    const name = nameEl.innerHTML
    const response = getTable(tableEl);

    if (config.tables[name]) {
      result[config.tables[name].key] = config.tables[name].handle(response);
    }
  })
  
  return result as any;
}