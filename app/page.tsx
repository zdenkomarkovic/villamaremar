import { fetchRooms } from '@/lib/sanity/client'
import VillaSite from '@/components/VillaSite'

export default async function HomePage() {
  const rooms = await fetchRooms()
  return <VillaSite rooms={rooms} />
}
