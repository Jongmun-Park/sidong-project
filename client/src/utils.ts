import { ChangeEvent } from 'react'
import get from 'lodash/get'

const ARTIST_CATEGORY = {
  0: '화가',
  1: '조각가',
  2: '공예가',
  3: '기타',
}

const SALE_STATUS = {
  '0': '비매품',
  '1': '판매품',
  '2': '판매 완료',
}

const MEDIUM = {
  0: '회화',
  1: '조각',
  2: '소묘',
  3: '판화',
  4: '종이',
  5: '섬유',
  6: '기타 매체',
}

export function translateArtistCategory(path: number) {
  return get(ARTIST_CATEGORY, path)
}

export function translateSaleStatus(path: string) {
  return get(SALE_STATUS, path)
}

export function translateMedium(path: number) {
  return get(MEDIUM, path)
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
