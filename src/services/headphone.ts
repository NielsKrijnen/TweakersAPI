import { Config } from "../types";
import { info } from "../utils/handler";
import { color, warranty } from "../utils/translate";
import { float, int } from "../utils/parse";
import { connection, noiseCancelling, remoteControl, soundBox, type } from "../utils/translate/headphone";

export const headphone = {
  slug: "hoofdtelefoons",
  tables: {
    "Type koptelefoon": {
      key: "general",
      handle: table => {
        return {
          connection: connection(table["Type verbinding"]),
          type: type(table["Koptelefoon type"]),
          soundBox: soundBox(table["Klankkast"])
        }
      }
    },
    Audio: {
      key: "audio",
      handle: table => {
        return {
          playback: table["Audioweergave"],
          minFrequency: float(table["Minimale frequentie"]),
          maxFrequency: float(table["Maximale frequentie"]),
          sensitivity: float(table["Gevoeligheid"]),
          maxInputPower: float(table["Maximaal input vermogen"]),
          impedance: float(table["Impedantie"])
        }
      }
    },
    Eigenschappen: {
      key: "properties",
      handle: table => {
        return {
          noiseCancelling: noiseCancelling(table["Noise-cancelling"]),
          remoteControl: remoteControl(table["Afstands/volumebediening"]),
          audioCodec: table["Bluetooth audiocodec"]?.split(', '),
          // properties: table["Eigenschappen hoofdtelefoon"]?.split(', ') TODO: Translation
        }
      }
    },
    Driver: {
      key: "driver",
      handle: table => {
        return {
          // type: table["Driver type"] TODO: Translation
          amount: int(table["Aantal drivers"]),
          speakerDiameter: int(table["Diameter speaker"])
        }
      }
    },
    Verbindingen: {
      key: "connections",
      handle: table => {
        return {
          // others: table["Overige draadloze verbindingen"] TODO: Translation
          // bluetooth: table["Bluetooth"]?.split(', ') TODO: Improvement
        }
      }
    },
    Aansluitingen: {
      key: "plugs",
      handle: table => {
        return {
          // audio: table["Aansluitingen (audio)"]?.split(', ') TODO: Translation
          length: float(table["Kabellengte"]),
          // type: table["Type plug"]?.split(', ') TODO: Translation
        }
      }
    },
    "IP-classificatie": {
      key: "ip",
      handle: table => {
        return {
          // classification: table["IP-classificatie"] TODO: Translation
        }
      }
    },
    "Accu en lader": {
      key: "battery",
      handle: table => {
        return {
          life: int(table["Batterijduur (uren)"]),
          ancLife: int(table["Batterijduur met noise cancelling"]),
          chargingCaseBattery: int(table["Accucapaciteit oplaadcase"]),
          // plug: table["Oplaad(case) aansluiting"]?.split(', ') TODO: Translation
        }
      }
    },
    "Gewicht en kleur": {
      key: "dimensions",
      handle: table => {
        return {
          weight: float(table["Gewicht (gram)"]),
          colors: color(table["Kleur"]?.split(', '))
        }
      }
    },
    "Garantie en bijzonderheden": {
      key: "warranty",
      handle: table => {
        return warranty(table["Fabrieksgarantie"])
      }
    },
    "Meer informatie": {
      key: "info",
      handle: info
    }
  }
} as const satisfies Config