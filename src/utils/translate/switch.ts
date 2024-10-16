export function powerSupply(values: string[] | undefined) {
  if (!values) return undefined;
  const functions: string[] = [];
  for (const value of values) {
    switch (value) {
      case "Netvoeding": functions.push("Power supply"); break;
      case "Oplaadbare accu": functions.push("Rechargeable battery"); break;
      default: functions.push(value);
    }
  }
  return functions
}