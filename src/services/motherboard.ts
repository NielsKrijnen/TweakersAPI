import { Config } from "../types";
import { info } from "../utils/handler";
import { array, bool, float, int, multi } from "../utils/parse";
import { color, warranty } from "../utils/translate";
import { bios } from "../utils/translate/motherboard";
import { Ethernet, SFP } from "./switch";

type RAMType = "DDR2" |
  "DDR2 (SODIMM)" |
  "DDR3" |
  "DDR3 (SODIMM)" |
  "DDR3L" |
  "DDR3L (SODIMM)" |
  "DDR4" |
  "DDR4 (SODIMM)" |
  "DDR5" |
  "DDR5 (SODIMM)" |
  "FB-DIMM" |
  "SRAM"
;

type RAMModules = "CUDIMM" |
  "ECC (in non-ECC mode)" |
  "Error Correcting Code" |
  "Registered"
;

type RAID = "0" |
  "0+1" |
  "0+3" |
  "1" |
  "1E" |
  "3" |
  "4" |
  "5" |
  "5+0" |
  "5+1" |
  "6" |
  "10" |
  "30" |
  "50" |
  "60" |
  "100" |
  "JBOD"
;

export const motherboard = {
  slug: "moederborden",
  tables: {
    "Socket en CPU": {
      key: "cpu",
      handle: table => {
        const embedded = !!table["Cpu/soc"];
        return {
          socket: table["Socket"],
          dualSocket: bool(table["Dual socket"]),
          embedded: embedded ? {
            cpu: table["Cpu/soc"],
            cores: int(table["Aantal cores"]),
            frequency: float(table["Klokfrequentie"]),
            turboFrequency: float(table["Maximale turboklokfrequentie"]),
            tdp: int(table["Maximaal TDP processor"])
          } : undefined
        }
      }
    },
    "Form factor, bios en chipset": {
      key: "motherboard",
      handle: table => {
        return {
          formFactor: table["Form Factor"],
          bios: bios(array(table["(UEFI) Bios"])),
          chipset: table["Moederbordchipset"]
        }
      }
    },
    Geheugen: {
      key: "ram",
      handle: table => {
        return {
          type: multi<RAMType>(table["Geheugentype (moederbord)"]),
          capacity: int(table["Maximum grootte werkgeheugen"]),
          modules: array<RAMModules>(table["Compatible modules"]),
          overclocking: array<"AMD EXPO" | "Intel XMP">(table["Overklokprofielen"])
        }
      }
    },
    Opslag: {
      key: "storage",
      handle: table => {
        return {
          buses: multi(table["Hardeschijf bus (intern)"]),
          cooledM2: int(table["Aantal gekoelde M.2 slots"]),
          raid: array<RAID>(table["Raid-modi"])
        }
      }
    },
    Uitbreidingsslots: {
      key: "expansionSlots",
      handle: table => {
        return {
          slots: multi(table["Uitbreidingsslots"]),
          linkInterfaces: array<"AMD Crossfire" | "Nvidia NVLink (SLI)">(table["Link Interface"]) 
        }
      }
    },
    Netwerk: {
      key: "network",
      handle: table => {
        return {
          ethernet: multi<Ethernet>(table["Ethernet (RJ45)"]),
          sfp: multi<SFP>(table["SFP/XFP-poorten"]),
          controller1: table["Netwerkcontroller"],
          controller2: table["Tweede netwerkcontroller"],
          controller3: table["Derde netwerkcontroller"]
        }
      }
    },
    "Wifi en bluetooth": {
      key: "wireless",
      handle: table => {
        return {
          wlan: array(table["Verbinding (wlan)"]),
          bluetooth: table["Bluetooth"],
          wifiController: table["Wifi-controller"]
        }
      }
    },
    "Aansluitingen": {
      key: "connections",
      handle: table => {
        return {
          usb: {
            internal: multi(table["USB/TB intern"]),
            external: multi(table["USB/TB extern"])
          },
          video: {
            out: multi<"HDMI">(table["Video uit"]),
            in: multi(table["Video in (voor TB/USB-c)"])
          },
          hdmi: table["Hoogste HDMI versie"],
          displayport: table["Hoogste DisplayPort versie"],
          other: multi(table["Overige aansluitingen"])
        }
      }
    },
    "(Fan) headers": {
      key: "fans",
      handle: table => {
        const headers = multi<"4-pins" | "6-pins">(table["Headers (fan/water)"])
        for (const key of Object.keys(headers)) {
          delete Object.assign(headers, { [key.replace(' (totaal)', '')]: headers[key as keyof typeof headers] })[key];
        }
        return {
          headers
        }
      }
    },
    RGB: {
      key: "rgb",
      handle: table => {
        return {
          headers: multi<"3-pins (ARGB)" | "4-pins (RGB)">(table["RGB-headers"]),
          colors: color(array(table["LED kleur"]))
        }
      }
    },
    "Overige eigenschappen": {
      key: "other",
      handle: table => {
        return {
          powerConnector: array(table["(Stroom)connector"]),
          onboardButtons: array(table["Onboard knoppen"]),
          errorDiagnosis: array(table["Foutdiagnose"]),
          ioShield: bool(table["Geïntegreerd I/O-shield"])
        }
      }
    },
    Audio: {
      key: "audio",
      handle: table => {
        return {
          channels: table["Audio kanalen"],
          connections: multi(table["Audio-aansluitingen"]),
          chip: table["Audiochip"]
        }
      }
    },
    Vrm: {
      key: "vrm",
      handle: table => {
        return {
          type: table["Type stroomvoorziening"],
          vcorePowerstages: table["VCore-powerstages"],
          vcorePowerstagesAmount: table["Aantal VCore-powerstages"],
          cooling: multi(table["Vrm-koeling"])
        }
      }
    },
    "Garantie en bijzonderheden": {
      key: "warranty",
      handle: table => warranty(table["Fabrieksgarantie"])
    },
    "Meer informatie": {
      key: "info",
      handle: info
    }
  }
} as const satisfies Config