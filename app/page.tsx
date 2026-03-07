import { fetchRooms, fetchPricing, fetchGalleryImages } from '@/lib/sanity/client'
import VillaSite from '@/components/VillaSite'

export default async function HomePage() {
  const [rooms, priceRows, sanityGallery] = await Promise.all([
    fetchRooms(),
    fetchPricing(),
    fetchGalleryImages(),
  ])
  return <VillaSite rooms={rooms} cenovnik={priceRows} sanityGallery={sanityGallery} />
}
