import { Medium, SaleStatus } from './types'

export interface ArtDetailPresenterProps {
  art: {
    id: number
    createdAt: string
    artist: {
      id: number
      artistName: string
      realName: string
    }
    name: string
    description: string
    medium: Medium
    theme: {
      id: number
      name: string
    }
    style: {
      id: number
      name: string
    }
    technique: {
      id: number
      name: string
    }
    saleStatus: SaleStatus
    isFramed: boolean
    price: number
    width: number
    height: number
    images: Array<number>
    imageUrls: {
      id: number
      url: string
    }[]
  }
}
