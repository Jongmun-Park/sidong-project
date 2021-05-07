import { ChangeEvent } from 'react'
import get from 'lodash/get'

const ARTIST_CATEGORY = {
  0: '화가',
  1: '조각가',
  2: '공예가',
  3: '기타',
}

const SALE_STATUS = {
  0: '비매품',
  1: '판매품',
  2: '판매 완료',
}

const ORDER_STATUS = {
  0: '주문 취소',
  1: '결제 대기',
  2: '결제 실패',
  3: '결제 완료',
  4: '배송 준비중',
  5: '배송 중',
  6: '배송 완료',
  7: '환불 요청',
  8: '환불 완료',
  9: '구매 확정',
}

const MEDIUM = {
  0: '회화 (Painting)',
  1: '조각 (Sculpture)',
  2: '소묘 (Drawing)',
  3: '판화 (Print)',
  4: '종이 (Paper)',
  5: '섬유 (Texttile)',
  6: '기타 매체',
}

const RESIDENCE = {
  0: '서울특별시',
  1: '부산광역시',
  2: '대구광역시',
  3: '인천광역시',
  4: '광주광역시',
  5: '대전광역시',
  6: '울산광역시',
  7: '세종특별자치시',
  8: '경기도',
  9: '강원도',
  10: '충청북도',
  11: '충청남도',
  12: '전라북도',
  13: '전라남도',
  14: '경상북도',
  15: '경상남도',
  16: '제주특별자치도',
}

export function translateArtistCategory(path: number) {
  return get(ARTIST_CATEGORY, path)
}

export function translateSaleStatus(path: number) {
  return get(SALE_STATUS, path)
}

export function translateOrderStatus(path: number) {
  return get(ORDER_STATUS, path)
}

export function translateMedium(path: number) {
  return get(MEDIUM, path)
}

export function translateResidence(path: number) {
  return get(RESIDENCE, path)
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
          // 마지막에 onChange 실행
          onChange(previewList)
        }
      }
    }
  }
}

export function currencyFormatter(number: number) {
  return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(number)
}
