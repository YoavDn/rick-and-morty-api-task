export interface IFilter {
  query?: string
  sort?: 'asc' | 'desc'
  page?: number
}

export interface IInfo {
  count: number
  prev: string | null
  next: string | null
  pages: number
}
