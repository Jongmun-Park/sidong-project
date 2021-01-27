import { ArtistCategory } from './types'
import get from 'lodash/get'

const ARTIST_CATEGORY = {
  A_0: ArtistCategory.A_0,
  A_1: ArtistCategory.A_1,
  A_2: ArtistCategory.A_2,
  A_3: ArtistCategory.A_3,
}

export function translateArtistCategory(path: string) {
  return get(ARTIST_CATEGORY, path)
}
