import { Config } from "../types";
import { info } from "../utils/handler";
import { color, warranty } from "../utils/translate";
import { bool, float, int, multi } from "../utils/parse";
import { powerSupply } from "../utils/translate/switch";

export type Ethernet = "Ethernet 1Gbps" |
  "Ethernet 2.5Gbps" |
  "Ethernet 5Gbps" |
  "Ethernet 10G/1G" |
  "Ethernet 10G/1G/100M" |
  "Ethernet 10G/5G/2.5G/1G" |
  "Ethernet 10G/5G/2.5G/1G/100M" |
  "Ethernet 100Mbps"

export type SFP = "Combo SFP" |
  "Combo SFP+" |
  "QSFP" |
  "QSFP+" |
  "QSFP-DD" |
  "QSFP28" |
  "QSFP28-DD" |
  "QSFP56" |
  "QSFP112" |
  "SFP" |
  "SFP+" |
  "SFP28" |
  "SFP56" |
  "XFP"

type PoE = "PoE (802.3af)" |
  "PoE+ (802.3at)" |
  "PoE++ (802.3bt)" |
  "PoE Passive" |
  "PoE Passthrough"

type ManagementProtocol = "BFD" |
  "Bidir-PIM" |
  "LLDP" |
  "PIM-DM" |
  "PIM-SM" |
  "PIM-SSM" |
  "RMON1" |
  "RMON2" |
  "sFlow (v5)" |
  "SNMP v1" |
  "SNMP v2" |
  "SNMP v2c" |
  "SNMP v3"

type Layer = "Layer 2" |
  "Layer 3" |
  "Layer 4"

type Property = "Broadcast stormbeheer" |
  "IGMP snooping" |
  "Jumbo frames" |
  "Link aggregation" |
  "Multicast" |
  "Port mirroring" |
  "Quality of Service (QoS)" |
  "Rate limiting" |
  "VLAN"

export const _switch = {
  slug: "netwerk-switches",
  tables: {
    Poorten: {
      key: "ports",
      handle: table => {
        return {
          ethernet: multi<Ethernet>(table["Ethernet (RJ45)"]),
          sfp: multi<SFP>(table["SFP/XFP-poorten"])
        }
      }
    },
    "Power-over-Ethernet": {
      key: "poe",
      handle: table => {
        return {
          ports: multi<PoE>(table["Power-over-Ethernet-poorten"]),
          budget: int(table["PoE-budget"])
        }
      }
    },
    Eigenschappen: {
      key: "properties",
      handle: table => {
        return {
          managed: bool(table["Switchtype"], "Managed"),
          ipv6: bool(table["IPv6 ondersteuning"]),
          managementProtocols: table["Beheerprotocollen"]?.split(', ') as ManagementProtocol[],
          layers: table["Switch layer"]?.split(', ') as Layer[],
          properties: table["Switch eigenschappen"]?.split(', ') as Property[]
        }
      }
    },
    "Data-uitwisseling": {
      key: "dataExchange",
      handle: table => {
        return {
          jumboFrame: int(table["Jumbo Frame grootte"]),
          vlans: int(table["Aantal VLANs"]),
          vlanFunctions: table["VLAN functies"]?.split(', '),
          routingEntries: int(table["Routing entries"]),
          macAddressTableEntries: int(table["Entries MAC-adrestabel"]),
          throughput: int(table["Throughput"]),
          queues: int(table["Wachtrijen"]),
          maxBandwidth: int(table["Maximale bandbreedte"])
        }
      }
    },
    Stroom: {
      key: "power",
      handle: table => {
        return {
          powerSupply: powerSupply(table["Voeding switch"]?.split(', ')),
          consumption: int(table["Stroomverbruik"])
        }
      }
    },
    "Afmetingen en kleur": {
      key: "dimensions",
      handle: table => {
        return {
          rackSize: float(table["Rack-afmeting"]),
          height: float(table["Hoogte"]),
          width: float(table["Breedte"]),
          depth: float(table["Diepte"]),
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