import { notFound } from 'next/navigation'
import { fetchRoomById, fetchAllRoomIds } from '@/lib/sanity/client'
import { LanguageProvider } from '@/components/LanguageContext'
import RoomDetail from '@/components/RoomDetail'
import Navbar from '@/components/Navbar'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const ids = await fetchAllRoomIds()
  return ids.map(({ _id }) => ({ id: _id }))
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const room = await fetchRoomById(id)
  const name = room?.name?.sr ?? room?.name?.en ?? 'Soba'
  return {
    title: `${name} | Villa Mare Mar`,
    description: room?.description?.sr ?? room?.description?.en ?? '',
  }
}

export default async function RoomPage({ params }: Props) {
  const { id } = await params
  const room = await fetchRoomById(id)

  if (!room) notFound()

  return (
    <LanguageProvider>
      <Navbar />
      <div className="h-20 bg-[var(--color-sea-900)]" />
      <main className="pb-16 min-h-screen bg-[var(--color-sand-50)]">
        <RoomDetail room={room} />
      </main>
    </LanguageProvider>
  )
}
