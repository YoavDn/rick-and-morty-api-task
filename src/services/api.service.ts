import axios from 'axios'
import type { IFilter, IInfo } from '../types'

const BASE_URL = 'https://rickandmortyapi.com/api'

export async function getCharacters(filter: IFilter): Promise<{
  results: []
  info: IInfo
}> {
  const { page, query, sort } = filter
  const url = `${BASE_URL}/character/?page=${page}&name=${query}`
  try {
    const { data } = await axios.get(url)

    data.results = data.results.sort((a, b) => {
      if (sort === 'asc') {
        return a.name.localeCompare(b.name)
      } else {
        return b.name.localeCompare(a.name)
      }
    })

    return data
  } catch (err) {
    console.error(err)
  }
}
