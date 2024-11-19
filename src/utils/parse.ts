import { parse } from "node-html-parser";
import { Table } from "../types";

export function bool(value: Table[string], identifier = "Ja") {
  if (!value) return undefined;
  return value === identifier;
}

export function int(value: Table[string]) {
  return value ? parseInt(value) : undefined;
}

export function float(value: Table[string]) {
  return value ? parseFloat(value.replace(',', '.')) : undefined;
}

export function switcher<T extends string | number, R>(value: T | undefined, config: Record<T, R>) {
  if (!value) return undefined
  for (const key of Object.keys(config)) {
    if (key === value) return config[key as T] as R;
  }
  return undefined
}

export function innerHTML(value: Table[string]) {
  return value ? parse(value).firstChild?.innerText : undefined
}

export function href(value: Table[string]) {
  if (!value) return undefined;
  const root = parse(value);
  const a = root.querySelector("a");
  return a?.getAttribute("href")
}

export function multi<T extends string>(value: Table[string]): { [K in T]: number | undefined } {
  if (!value) return {} as { [K in T]: number };
  const values = value.split(/,\s*(?![^()]*\))/);
  const multi: Record<string, number> = {}
  for (const value of values) {
    if (!isNaN(parseInt(value[0])) && value[1] === 'x') {
      const [multiplier, ...key] = value.split(' ');
      multi[key.join(' ')] = int(multiplier.replace('x', ''))!;
    } else {
      multi[value] = 1;
    }
  }
  return multi as {
    [K in T]: number | undefined
  }
}

export function array<T = string>(value: Table[string]) {
  return value?.split(', ') ?? [] as T[]
}