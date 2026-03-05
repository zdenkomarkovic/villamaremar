export interface Room {
  _id: string
  name: { sr: string; en: string; ru: string; de: string }
  description: { sr: string; en: string; ru: string; de: string }
  images: string[]
  priceLow?: number
  priceHigh?: number
  guests: number
  children?: number
  doubleBeds?: number
  singleBeds?: number
  size: number
  features: string[]
  available: boolean
  order?: number
}
