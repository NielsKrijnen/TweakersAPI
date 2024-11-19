import { translate } from ".";

export function powerSupply(values: string[] | undefined) {
  return translate(values, {
    "Netvoeding": "Power supply",
    "Oplaadbare accu": "Rechargeable battery"
  })
}