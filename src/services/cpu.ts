import { Config } from "../types";
import { info } from "../utils/handler";
import { bool, float, int, switcher } from "../utils/parse";
import { warranty } from "../utils/translate";

export const cpu = {
  slug: "processors",
  tables: {
    Merk: {
      key: "brand",
      handle: table => {
        return table["Merk CPU"];
      }
    },
    Algemeen: {
      key: "general",
      handle: table => {
        return {
          generation: table["CPU generatie"],
          architecture: table["Architectuur cpu-core"],
          windows11: bool(table["Windows 11 compatibel"])
        }
      }
    },
    Processortechniek: {
      key: "technology",
      handle: table => {
        return {
          socket: table["Socket"],
          cores: int(table["Aantal cores"]),
          frequency: float(table["Klokfrequentie"]),
          turboFrequency: float(table["Maximale turboklokfrequentie"]),
          maxMemory: int(table["Maximum grootte werkgeheugen"]),
          memory: table["Geheugenondersteuning"],
          channels: switcher(table["Geheugenkanalen"], {
            "Dual-channel": 2
          }),
          ecc: bool(table["ECC ondersteuning"]),
          nmProcess: int(table["Procestechnologie"]),
          dieSize: int(table["Totale Die-size"]),
          tdp: int(table["Thermal Design Power"]),
          maxTemp: int(table["Maximale bedrijfstemperatuur"])
        }
      }
    },
    Video: {
      key: "video",
      handle: table => {
        return {
          integrated: bool(table["Geïntegreerde graphics"]),
          gpu: table["Geïntegreerde gpu"],
          frequency: int(table["Klokfrequentie videochip"]),
          turboFrequency: float(table["Maximale turboklokfrequentie videochip"])
        }
      }
    },
    Cache: {
      key: "cache",
      handle: table => {
        return {
          level1: int(table["CPU Cache Level 1"]),
          level2: int(table["CPU Cache Level 2"]),
          level3: int(table["CPU Cache Level 3"]),
          "3dvcache": bool(table["3D V-Cache"])
        }
      }
    },
    Functies: {
      key: "functions",
      handle: table => {
        return {
          threads: int(table["Threads"]),
          hyperthreading: bool(table["Hyperthreading / SMT"]),
          pcie: table["PCIe ondersteuning"]?.split(', '),
          maxPcie: int(table["Max aantal PCIe lanes"])
        }
      }
    },
    Instructieset: {
      key: "instructionSet",
      handle: table => {
        return {
          virtualization: bool(table["Virtualisatie"]),
          types: table["Virtualisatie type"]?.split(', '),
          sets: table["CPU Instructieset"]?.split(', ')
        }
      }
    },
    Koeler: {
      key: "cooler",
      handle: table => {
        return {
          included: bool(table["CPU koeler meegeleverd"])
        }
      }
    },
    Overig: {
      key: "other",
      handle: table => {
        return {
          salesStatus: table["Verkoopstatus (CPU)"]
        }
      }
    },
    "Garantie en bijzonderheden": {
      key: "warranty",
      handle: table => {
        return warranty(table["Fabrieksgarantie"])
      }
    },
    Duurzaamheid: {
      key: "sustainability",
      handle: table => {
        return {
          extras: table["Meegeleverde extra's processor"]
        }
      }
    },
    "Meer informatie": {
      key: "info",
      handle: info
    }
  }
} as const satisfies Config