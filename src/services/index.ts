import { Config } from "../types";
import { getProduct, listProducts } from "../utils";
import { Page } from "puppeteer";

export { cpu } from "./cpu";
export { game } from "./game";
export { headphone } from "./headphone";
export { ram } from "./ram";
export { smartphone } from "./smartphone";
export { _switch } from "./switch";

export class TweakersAPIService<T extends Config> {
  constructor(private page: Promise<Page>, private readonly config: T) {}
  
  async list(params?: {
    page?: number
  }) {
    const page = await this.page;
    const url = new URL(`https://tweakers.net/${this.config.slug}/vergelijken`);
    if (params?.page) url.searchParams.set("page", params.page.toString());
    await page.goto(url.toString());
    return listProducts(page);
  }
  
  async get(id: number) {
    const page = await this.page;
    await page.goto(`https://tweakers.net/pricewatch/${id}`);
    return getProduct<T>(page, this.config);
  }
}