export function translate(values: string[] | undefined, config: Record<string, string>) {
  if (!values) return undefined;
  const translated: string[] = [];
  for (const value of values) {
    if (config[value]) translated.push(config[value]);
    else translated.push(value);
  }
  return translated
}

export function date(value: string | undefined) {
  if (!value) return undefined;
  let [day, month, year] = value.split(' ');
  switch (month) {
    case "januari": month = "january"; break;
    case "februari": month = "february"; break;
    case "maart": month = "march"; break;
    case "mei": month = "may"; break;
    case "juni": month = "june"; break;
    case "juli": month = "july"; break;
    case "augustus": month = "august"; break;
    case "oktober": month = "october"; break;
  }
  return new Date([day, month, year].join(' '));
}

export function color(values: string[] | undefined) {
  if (!values) return undefined
  const colors: string[] = [];
  for (const color of values) {
    switch (color) {
      case "Aluminium": colors.push("Aluminum"); break;
      case "Antraciet": colors.push("Anthracite"); break;
      case "Blauw": colors.push("Blue"); break;
      case "Bordeaux Rood": colors.push("Bordeaux Red"); break;
      case "Brons": colors.push("Bronze"); break;
      case "Bruin": colors.push("Brown"); break;
      case "Chroom": colors.push("Chrome"); break;
      case "Crème": colors.push("Cream"); break;
      case "Cyaan": colors.push("Cyan"); break;
      case "Geel": colors.push("Yellow"); break;
      case "Goud": colors.push("Gold"); break;
      case "Grafiet": colors.push("Graphite"); break;
      case "Grijs": colors.push("Gray"); break;
      case "Groen": colors.push("Green"); break;
      case "Koper": colors.push("Copper"); break;
      case "Oranje": colors.push("Orange"); break;
      case "Paars": colors.push("Purple"); break;
      case "Rood": colors.push("Red"); break;
      case "Rosé Goud": colors.push("Rose Gold"); break;
      case "Roze": colors.push("Pink"); break;
      case "RVS": colors.push("Stainless steel"); break;
      case "Transparant": colors.push("Transparent"); break;
      case "Wit": colors.push("White"); break;
      case "Zilver": colors.push("Silver"); break;
      case "Zwart": colors.push("Black"); break;
      default: colors.push(color);
    }
  }
  return colors
}

export function warranty(value: string | undefined) {
  if (!value) return undefined;
  if (value === "Levenslang") return "Lifetime";
  return value.replace("jaar", "year");
}