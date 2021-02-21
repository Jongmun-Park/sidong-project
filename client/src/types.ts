export type Art = {
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

export enum ArtistCategory {
  PAINTER,
  SCULPTOR,
  CRAFTSMAN,
  ETC,
}

export enum Medium {
  PAINTING,
  SCULPTURE,
  DRAWING,
  PRINT,
  PAPER,
  TEXTILE,
  ETC,
}

export enum SaleStatus {
  NOT_FOR_SALE,
  ON_SALE,
  SOLD_OUT,
}

export enum Orientation {
  LANDSCAPE,
  PORTRAIT,
  SQUARE,
  ETC,
}
