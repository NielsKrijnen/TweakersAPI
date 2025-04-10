import { TweakersAPIService } from "./services";
import { cpu, game, headphone, ram, smartphone, _switch } from "./services";
import { Config } from "./types";
import { I18n } from "i18n"

const locales = ["nl", "en"] as const satisfies string[]

const i18n = new I18n({
  locales,
  directory: "./locales"
})

/**
 * @param config Configure the API.
 **/
export class TweakersAPI<E extends Record<string, Config>> {
  private readonly fetch: typeof fetch

  constructor(private readonly config?: {
    extend?: E
    fetch?: typeof fetch
    /** Specifies whether to translate the response. Defaults to 'nl' (no translation) */
    locale?: typeof locales[number]
  }) {
    i18n.setLocale(config?.locale ?? "nl")

    this.fetch = config?.fetch ?? fetch
  }
  
  get extend(): { [K in keyof E]: TweakersAPIService<E[K]> } {
    if (!this.config?.extend) { // @ts-ignore
      return {}
    }
    const extend: Record<string, TweakersAPIService<any>> = {}
    for (const key of Object.keys(this.config?.extend)) {
      extend[key] = new TweakersAPIService(this.fetch, this.config.extend[key as keyof E])
    }
    // @ts-ignore
    return extend;
  }
  get cpu() {
    return new TweakersAPIService(this.fetch, cpu);
  }
  get game() {
    return new TweakersAPIService(this.fetch, game);
  }
  get headphone() {
    return new TweakersAPIService(this.fetch, headphone);
  }
  get ram() {
    return new TweakersAPIService(this.fetch, ram);
  }
  get smartphone() {
    return new TweakersAPIService(this.fetch, smartphone);
  }
  get switch() {
    return new TweakersAPIService(this.fetch, _switch);
  }
}