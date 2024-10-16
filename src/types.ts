export type Product = {
  id: number
  name: string
  img: string
}

export type Config = {
  slug: string
  tables: Record<string, {
    key: string
    handle: (table: Table) => Record<string, any> | string | number | undefined
  }>
}

export type Table = Record<string, string | undefined>