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
