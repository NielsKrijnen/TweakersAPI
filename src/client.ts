import puppeteer, { Page, PuppeteerLaunchOptions } from "puppeteer";
import { TweakersAPIService } from "./services";
import { cpu, game, headphone, ram, smartphone, _switch } from "./services";
import { Config } from "./types";

/**
 * ### Requirements
 * - Node is required (can't run on browser)
 * ### Tips
 * - Don't send too much requests, you'll be IP-blocked when doing so
 * - Data retrieval takes long, so it's best to store it in your own database
 * @param config Configure the API. Currently only the puppeteer launch options are available
 **/
export class TweakersAPI<E extends Record<string, Config>> {
  private readonly page: Promise<Page>
  
  constructor(private readonly config?: {
    puppeteer?: PuppeteerLaunchOptions,
    extend?: E
  }) {
    this.page = this.load(config?.puppeteer);
  }
  
  private async load(options?: PuppeteerLaunchOptions) {
    const browser = await puppeteer.launch(options);
    return browser.newPage();
  }
  
  get extend(): { [K in keyof E]: TweakersAPIService<E[K]> } {
    if (!this.config?.extend) { // @ts-ignore
      return {}
    }
    const extend: Record<string, TweakersAPIService<any>> = {}
    for (const key of Object.keys(this.config?.extend)) {
      extend[key] = new TweakersAPIService(this.page, this.config.extend[key as keyof E])
    }
    // @ts-ignore
    return extend;
  }
  get cpu() {
    return new TweakersAPIService(this.page, cpu);
  }
  get game() {
    return new TweakersAPIService(this.page, game);
  }
  get headphone() {
    return new TweakersAPIService(this.page, headphone);
  }
  get ram() {
    return new TweakersAPIService(this.page, ram);
  }
  get smartphone() {
    return new TweakersAPIService(this.page, smartphone);
  }
  get switch() {
    return new TweakersAPIService(this.page, _switch);
  }
}