import { Config } from "../types";
import { getProduct, listProducts } from "../utils";
import { parse } from "node-html-parser";

export { cpu } from "./cpu";
export { game } from "./game";
export { headphone } from "./headphone";
export { ram } from "./ram";
export { smartphone } from "./smartphone";
export { _switch } from "./switch";

export class TweakersAPIService<T extends Config> {
  constructor(private fetch: typeof globalThis.fetch, private readonly config: T) {}
  
  async list(params?: { page?: number }) {
    const url = new URL(`https://tweakers.net/${this.config.slug}/vergelijken`);
    if (params?.page) url.searchParams.set("page", params.page.toString());

    const response = await this.fetch(url)
    if (!response.ok) throw new Error(response.statusText)

    return listProducts(await response.text());
  }
  
  async get(id: number) {
    const redirect = await this.fetch(`https://tweakers.net/pricewatch/${id}`)
    if (!redirect.ok) throw new Error(redirect.statusText)
    const url = new URL(redirect.url + "/specificaties")
    const response = await this.fetch(url)
    if (!response.ok) throw new Error(response.statusText)

    return getProduct<T>(await response.text(), this.config);
  }

  async price(id: number) {
    const redirect = await this.fetch(`https://tweakers.net/pricewatch/${id}`)
    if (!redirect.ok) throw new Error(redirect.statusText)
    const response = await this.fetch(redirect.url)
    if (!response.ok) throw new Error(response.statusText)

    const text = await response.text()
    const html = parse(text)

    const table = html.querySelector(".shop-listing")
    if (!table) throw new Error("No Data Found")

    const rows = table.querySelectorAll("tr").filter(tr => {
      return tr.getAttribute("data-shop-id") !== undefined
    })

    const prices = rows.map(row => {
      const tagline = row.querySelector(".tagline")
      const a = row.querySelector("a")
      const priceColumn = row.querySelector(".shop-price")
      const price = priceColumn?.querySelector("a")
      if (!price || !a) return
      const parsedPrice = price.innerText.replace(',-', '').replace(',', '.').slice(3)
      const href = a.getAttribute("href")

      return {
        link: href ? new URL(href) : undefined,
        name: a.innerText.trim(),
        total: Number(parsedPrice),
        tagline: tagline?.getAttribute("title")
      }
    })

    return prices.filter(price => price !== undefined)
  }
}