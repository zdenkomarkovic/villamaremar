import { createClient } from 'next-sanity'
import type { Room } from '@/types/room'
import { ROOMS_QUERY, ROOM_BY_ID_QUERY, ALL_ROOM_IDS_QUERY } from './queries'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

export const client = projectId
  ? createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
      apiVersion: '2024-01-01',
      useCdn: true,
    })
  : null

export async function fetchRooms(): Promise<Room[]> {
  if (!client) return []
  try {
    return await client.fetch<Room[]>(ROOMS_QUERY)
  } catch {
    return []
  }
}

export async function fetchRoomById(id: string): Promise<Room | null> {
  if (!client) return null
  try {
    return await client.fetch<Room>(ROOM_BY_ID_QUERY, { id })
  } catch {
    return null
  }
}

export async function fetchAllRoomIds(): Promise<{ _id: string }[]> {
  if (!client) return []
  try {
    return await client.fetch<{ _id: string }[]>(ALL_ROOM_IDS_QUERY)
  } catch {
    return []
  }
}
