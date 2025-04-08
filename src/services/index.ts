import { Config } from "../types";
import { getProduct, listProducts } from "../utils";

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
}