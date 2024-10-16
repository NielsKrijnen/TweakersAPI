import { parse } from "node-html-parser";

export function bool(value: string | undefined, identifier = "Ja") {
  if (!value) return undefined;
  return value === identifier;
}

export function int(value: string | undefined) {
  return value ? parseInt(value) : undefined;
}

export function float(value: string | undefined) {
  return value ? parseFloat(value.replace(',', '.')) : undefined;
}

export function switcher<T extends string | number, R>(value: T | undefined, config: Record<T, R>) {
  if (!value) return undefined
  for (const key of Object.keys(config)) {
    if (key === value) return config[key as T] as R;
  }
  return undefined
}

export function innerHTML(value: string | undefined) {
  return value ? parse(value).firstChild?.innerText : undefined
}

export function href(value: string | undefined) {
  if (!value) return undefined;
  const root = parse(value);
  const a = root.querySelector("a");
  return a?.getAttribute("href")
}

export function multi<T extends string>(value: string | undefined) {
  if (!value) return undefined;
  const values = value.split(', ');
  const multi: Record<string, number> = {}
  for (const value of values) {
    const [multiplier, ...key] = value.split(' ');
    multi[key.join(' ')] = int(multiplier.replace('x', ''))!;
  }
  return multi as {
    [K in T]: number | undefined
  }
}