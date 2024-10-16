import { Config } from "../types";
import { bool } from "../utils/parse";
import { info } from "../utils/handler";

export const smartphone = {
  slug: "smartphones",
  tables: {
    Besturingssysteem: {
      key: "os",
      handle: table => {
        return {
          name: table["Mobiel besturingssysteem"],
          androidOne: bool(table["Android One"])
        }
      }
    },
    "Meer informatie": {
      key: "info",
      handle: info
    }
  }
} as const satisfies Config