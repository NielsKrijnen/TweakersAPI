import { translate } from "./index";

export function bios(values: string[] | undefined) {
  return translate(values, {
    "Update zonder CPU (via USB)": "Update without CPU (via USB)"
  })
}