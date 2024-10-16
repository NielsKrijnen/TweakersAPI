import type { ElementHandle, Page } from "puppeteer";
import type { Config, Product } from "../types";
import { innerHTML } from "./parse";

/** This needs to be a page that ends with '/vergelijken' **/
export async function listProducts(page: Page) {
  const productsWrapperEl = await page.$(".item-listing");
  if (!productsWrapperEl) throw Error("Product listing not found");
  const productsEl = await productsWrapperEl.$$("li");

  const products: (Product | null)[] = await Promise.all(
    productsEl.map(async productEl => {
      const [imgEl, nameEl] = await Promise.all([
        productEl.$('img'),
        productEl.$(".editionName")
      ]);
      if (!nameEl || !imgEl) return null;

      return await productEl.evaluate(el => {
        const img = el.querySelector('img')?.src || '';
        const nameEl = el.querySelector(".editionName");
        const href = nameEl?.getAttribute("href") || '';
        const id = parseInt(href.split('/')[4] || "0");
        const name = nameEl?.innerHTML || '';

        return { name, id, img };
      })
    })
  )

  return products.filter(product => product !== null);
}

export async function getProduct<T extends Config>(page: Page, config: T): Promise<{ name?: string } & {
  -readonly [K in keyof T["tables"] as T["tables"][K]["key"]]: ReturnType<T["tables"][K]["handle"]>
}> {
  const getTable = async (table: ElementHandle) => {
    const rows = await table.$$("tr");
    const result: Record<string, string> = {}

    await Promise.all(
      rows.map(async row => {
        const spans = await row.$$("span");
        if (!spans[0] || !spans[1]) return;
        const [key, value] = await Promise.all([
          spans[0].evaluate(el => el.innerHTML),
          spans[1].evaluate(el => el.innerHTML)
        ]);
        result[key] = value;
      })
    )

    return result;
  }

  const tab = await page.$("text/Kenmerken");
  if (!tab) throw Error("Something went wrong");

  await tab.click()
  await page.waitForNavigation();  
  const nameEl = await page.$("h1");
  let name = await nameEl?.evaluate(el => el.innerHTML);
  name = innerHTML(name?.replaceAll('\n ', '').trim())

  const tables = await page.$$("table");
  const result: Record<string, any> = { name }

  await Promise.all(
    tables.map(async tableEl => {
      const nameEl = await tableEl.$("h3");
      if (!nameEl) return;

      const name = await nameEl.evaluate(el => el.innerHTML);
      const response = await getTable(tableEl);

      if (config.tables[name]) {
        result[config.tables[name].key] = config.tables[name].handle(response);
      }
    })
  )
  
  return result as any;
}