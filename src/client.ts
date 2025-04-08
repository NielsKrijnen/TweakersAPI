import { TweakersAPIService } from "./services";
import { cpu, game, headphone, ram, smartphone, _switch } from "./services";
import { Config } from "./types";

/**
 * @param config Configure the API.
 **/
export class TweakersAPI<E extends Record<string, Config>> {
  private readonly fetch: typeof fetch

  constructor(private readonly config?: {
    extend?: E
    fetch?: typeof fetch
  }) {
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