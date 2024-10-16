import { Config } from "../types";
import { info } from "../utils/handler";
import { content, genres } from "../utils/translate/game";
import { int } from "../utils/parse";
import { date } from "../utils/translate";

export const game = {
  slug: "games",
  tables: {
    Productinformatie: {
      key: "product",
      handle: table => {
        return {
          platform: table["Platform (Games)"],
          pcPlatform: table["Platform (PC/Mac)"]?.split(', '),
          genres: genres(table["Game Genre"]?.split(', ')),
          content: content(table["Soort gamecontent"]?.split(', '))
        }
      }
    },
    Leeftijdsclassificatie: {
      key: "age",
      handle: table => {
        return int(table["Leeftijdsclassificatie"])
      }
    },
    Ontwikkelaar: {
      key: "developer",
      handle: table => {
        return table["Ontwikkelaar"]
      }
    },
    Releasedatum: {
      key: "releaseDate",
      handle: table => {
        return date(table["(Verwachte) releasedatum"])
      }
    },
    "Meer informatie": {
      key: "info",
      handle: info
    }
  }
} as const satisfies Config