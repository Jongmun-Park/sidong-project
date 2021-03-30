export interface Artist {
  id: number
  realName: string
  artistName: string
  description: string
  thumbnail: {
    id: number
    url: string
  }
  representativeWork: {
    id: number
    url: string
  }
  category: number
  residence: number
  website: string
}

export interface Art {
  id: number
  createdAt: Date
  artist: {
    id: number
    artistName: string
    realName: string
  }
  name: string
  description: string
  medium: Medium
  orientation: Orientation
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
  representativeImageUrl: string
  images: Array<number>
  imageUrls: {
    id: number
    url: string
  }[]
}

export interface ArtOptions {
  styles: Array<{
    id: number
    name: string
  }>
  techniques: Array<{
    id: number
    name: string
  }>
  themes: Array<{
    id: number
    name: string
  }>
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

export enum Residence {
  SEOUL,
  PUSAN,
  DAEGU,
  INCHEON,
  GWANGJU,
  DAEJEON,
  ULSAN,
  SEJONG,
  GYEONGGI,
  GANGWON,
  CHUNGBUK,
  CHUNGNAM,
  JEONBUK,
  JEONNAM,
  GYEONGBUK,
  GYEONGNAM,
  JEJU,
}
