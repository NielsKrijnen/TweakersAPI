import { Config } from "../types";
import { info } from "../utils/handler";
import { float, int } from "../utils/parse";

export const ram = {
  slug: "geheugen-intern",
  tables: {
    Capaciteit: {
      key: "capacity",
      handle: table => {
        return {
          memory: int(table["Werkgeheugen"]),
          amount: int(table["Aantal"])
        }
      }
    },
    "Type, snelheid en spanning": {
      key: "specs",
      handle: table => {
        return {
          type: table["Geheugentype"],
          speed: int(table["Geheugensnelheid (DDR)"]),
          voltage: float(table["Spanning"]),
          overclocking: table["Overklokprofielen"]?.split(', ')
        }
      }
    },
    Beveiliging: {
      key: "security",
      handle: table => {
        return table["Soort module"]?.split(', ')
      }
    },
    Timings: {
      key: "timings",
      handle: table => {
        return {
          casLatency: int(table["CAS Latency"]),
          tRCD: int(table["tRCD"]),
          tRP: int(table["tRP"]),
          tRAS: int(table["tRAS"])
        }
      }
    },
    "Kleur en afmetingen": {
      key: "height",
      handle: table => {
        return int(table["Hoogte"])
      }
    },
    "Meer informatie": {
      key: "info",
      handle: info
    }
  }
} as const satisfies Config