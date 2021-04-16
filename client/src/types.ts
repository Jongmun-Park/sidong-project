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

export interface Order {
  id: number
  userinfo: {
    id: number
    name: string
    phone: string
    address: string
  }
  artName: string
  price: number
  status: OrderStatus
  createdAt: Date
  art: Art
  artist: Artist
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

export enum OrderStatus {
  CANCEL = 0,
  WAIT = 1,
  FAIL = 2,
  SUCCESS = 3,
  PREPARE_DELIVERY = 4,
  ON_DELIVERY = 5,
  DELIVERY_COMPLETED = 6,
  REFUND = 7,
  REFUND_COMPLETED = 8,
  COMPLETED = 9,
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
