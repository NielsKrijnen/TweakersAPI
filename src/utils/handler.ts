import type { Table } from "../types";
import { href, innerHTML, int } from "./parse";

export function info(table: Table) {
  return {
    serie: innerHTML(table["Serie"]),
    brand: innerHTML(table["Merk"]),
    id: int(table["Tweakers ID"]),
    ean: table["EAN"]?.split(', '),
    sku: table["SKU"]?.split(', '),
    link: href(table["Specs van de fabrikant"])
  }
}