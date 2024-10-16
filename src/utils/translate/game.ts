export function genres(values: string[] | undefined) {
  if (!values) return undefined;
  const genres: string[] = [];
  for (const genre of values) {
    switch (genre) {
      case "Actie": genres.push("Action"); break;
      case "Applicatie": genres.push("Application"); break;
      case "Avontuur": genres.push("Adventure"); break;
      case "Basketbal": genres.push("Basketball"); break;
      case "Bord en kaart": genres.push("Board and card"); break;
      case "Bouw": genres.push("Build"); break;
      case "Health en educatie": genres.push("Health and education"); break;
      case "Muziek": genres.push("Music"); break;
      case "Puzzel": genres.push("Puzzle"); break;
      case "Simulatie": genres.push("Simulation"); break;
      case "Strategie en management": genres.push("Strategy and management"); break;
      case "Vecht": genres.push("Fight"); break;
      case "Virtueel leven": genres.push("Virtual life"); break;
      case "Vlieg": genres.push("Fly"); break;
      case "Voetbal": genres.push("Football"); break;
      default: genres.push(genre);
    }
  }
  return genres;
}

export function content(values: string[] | undefined) {
  if (!values) return undefined; 
  const contents: string[] = [];
  for (const content of values) {
    switch (content) {
      case "Figuur (extra content)": contents.push("Figure"); break;
      case "Hardwarebundel": contents.push("Hardware bundel"); break;
      default: contents.push(content)
    }
  }
  return contents;
}