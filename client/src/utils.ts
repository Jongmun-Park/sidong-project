import { ChangeEvent } from 'react'
import { ArtistCategory, SaleStatusKorean } from './types'
import get from 'lodash/get'

const ARTIST_CATEGORY = {
  A_0: ArtistCategory.A_0,
  A_1: ArtistCategory.A_1,
  A_2: ArtistCategory.A_2,
  A_3: ArtistCategory.A_3,
}

const SALE_STATUS = {
  A_0: SaleStatusKorean.A_0,
  A_1: SaleStatusKorean.A_1,
  A_2: SaleStatusKorean.A_2,
}

export function translateArtistCategory(path: string) {
  return get(ARTIST_CATEGORY, path)
}

export function translateSaleStatus(path: string) {
  return get(SALE_STATUS, path)
}

export function handleImagePreview(
  e: ChangeEvent<HTMLInputElement>,
  onChange: (arg0: string) => void
) {
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

export function handleImagePreviewList(
  e: ChangeEvent<HTMLInputElement>,
  onChange: (arg0: Array<string>) => void
) {
  const files = e.target.files
  const previewList: Array<string> = []
  if (files?.[0]) {
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader()
      reader.readAsDataURL(files[i])
      reader.onload = () => {
        const base64 = reader.result
        if (base64) {
          previewList.push(base64.toString())
        }
        if (i === files.length - 1) {
          onChange(previewList)
        }
      }
    }
  }
}

export function currencyFormatter(number: number) {
  return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(number)
}
