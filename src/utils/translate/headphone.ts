import type { Table } from "$lib/types/scraper";

export function connection(value: Table[string]) {
  return value?.replace('Draadloos', 'Wireless').replace('Draad', 'Wired').replace('radiogestuurd', 'radio controlled')
}

export function type(value: Table[string]) {
  switch (value) {
    case "Botgeleiding": return "Bone conduction";
    case "Oordopjes (standaard)": return "Earplugs";
    default: return value;
  }
}

export function soundBox(value: Table[string]) {
  switch (value) {
    case "Gesloten": return "Closed";
    default: return value;
  }
}

export function noiseCancelling(value: Table[string]) {
  switch (value) {
    case "Nee": return "No";
    case "Actief": return "Active";
    case "Passief": return "Passive";
    default: return value;
  }
}

export function remoteControl(value: Table[string]) {
  switch (value) {
    case "Geen": return "None";
    case "Universeel": return "Universal";
    default: return value;
  }
}