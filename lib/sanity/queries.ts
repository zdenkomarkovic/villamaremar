import { groq } from 'next-sanity'

const ROOM_FIELDS = groq`
  _id,
  name,
  description,
  "images": images[].asset->url,
  priceLow,
  priceHigh,
  guests,
  children,
  doubleBeds,
  singleBeds,
  size,
  features,
  available
`

export const ROOMS_QUERY = groq`
  *[_type == "room" && available != false] | order(order asc, _createdAt asc) {
    ${ROOM_FIELDS}
  }
`

export const ROOM_BY_ID_QUERY = groq`
  *[_type == "room" && _id == $id][0] {
    ${ROOM_FIELDS}
  }
`

export const ALL_ROOM_IDS_QUERY = groq`
  *[_type == "room"] { _id }
`

export const PRICING_QUERY = groq`
  *[_type == "cenovnik"][0] {
    r1low, r1high,
    r2low, r2high,
    r3low, r3high,
    r4low, r4high,
    r5low, r5high,
    r6low, r6high
  }
`

export const GALLERY_IMAGES_QUERY = groq`
  *[_type == "galleryImage"] | order(order asc) {
    _id,
    "url": image.asset->url,
    alt,
    order
  }
`
