import { ChangeEvent } from 'react'
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

export const handleImagePreview = (
  e: ChangeEvent<HTMLInputElement>,
  onChange: (arg0: string) => void
) => {
  let reader = new FileReader()
  if (e.target.files?.[0]) {
    reader.readAsDataURL(e.target.files?.[0])
    reader.onload = () => {
      const base64 = reader.result
      if (base64) {
        onChange(base64.toString())
      }
    }
  }
}
