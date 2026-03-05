'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useLang } from './LanguageContext'
import type { Room } from '@/types/room'
import type { Lang } from '@/lib/translations'

const FEATURE_ICONS: Record<string, string> = {
  beach: '🏖️',
  seaView: '🌊',
  terrace: '🏡',
  balcony: '🪟',
  ac: '❄️',
  wifi: '📶',
  kitchen: '🍳',
  bathroom: '🚿',
  tv: '📺',
  parking: '🅿️',
  bbq: '🔥',
  garden: '🌿',
  safe: '🔒',
}

function RoomCard({ room, index, inView }: { room: Room; index: number; inView: boolean }) {
  const { t, lang } = useLang()

  const name = room.name?.[lang as Lang] ?? room.name?.sr ?? ''
  const description = room.description?.[lang as Lang] ?? room.description?.sr ?? ''
  const images = room.images ?? []

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-[var(--color-sand-100)] hover:shadow-xl transition-shadow flex flex-col"
    >
      {/* Image – samo prva */}
      <div className="relative aspect-[4/3] bg-[var(--color-sand-50)]">
        {images[0] ? (
          <Image
            src={images[0]}
            alt={name}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-4xl text-gray-300">🛏️</div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* Title */}
        <Link href={`/rooms/${room._id}`}>
          <h3 className="font-serif text-xl font-bold text-[var(--color-sea-900)] leading-tight group-hover:text-[var(--color-sea-700)] transition-colors">
            {name}
          </h3>
        </Link>

        {/* Specs row */}
        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
          {room.guests && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {room.guests} {t.rooms.guests}
              {room.children ? ` + ${room.children} ${t.rooms.children}` : ''}
            </span>
          )}
          {room.doubleBeds ? (
            <span className="flex items-center gap-1">💑 {room.doubleBeds} {t.rooms.doubleBeds}</span>
          ) : null}
          {room.singleBeds ? (
            <span className="flex items-center gap-1">🛏️ {room.singleBeds} {t.rooms.singleBeds}</span>
          ) : null}
          {room.size && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              {room.size} {t.rooms.sqm}
            </span>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{description}</p>
        )}

        {/* Price table + CTA */}
        <div className="mt-auto pt-3 border-t border-[var(--color-sand-100)] flex flex-col gap-3">
          {(room.priceLow || room.priceHigh) && (
            <table className="w-full text-sm border border-[var(--color-sand-200)] rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-[var(--color-sand-50)]">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">{t.rooms.season}</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">{t.rooms.perNight}</th>
                </tr>
              </thead>
              <tbody>
                {room.priceLow && (
                  <tr className="border-t border-[var(--color-sand-100)]">
                    <td className="text-gray-500 px-3 py-2">{t.rooms.lowSeasonDates}</td>
                    <td className="text-right font-bold text-[var(--color-sea-900)] px-3 py-2">€{room.priceLow}</td>
                  </tr>
                )}
                {room.priceHigh && (
                  <tr className="border-t border-[var(--color-sand-100)]">
                    <td className="text-gray-500 px-3 py-2">{t.rooms.highSeasonDates}</td>
                    <td className="text-right font-bold text-[var(--color-coral-500)] px-3 py-2">€{room.priceHigh}</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
          <div className="flex gap-2">
            <Link
              href={`/rooms/${room._id}`}
              className="flex-1 border border-[var(--color-sea-800)] text-[var(--color-sea-800)] hover:bg-[var(--color-sea-800)] hover:text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors text-center"
            >
              {t.rooms.viewRoom}
            </Link>
            <a
              href="https://wa.me/381638650691"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

interface Props {
  rooms: Room[]
}

export default function Rooms({ rooms }: Props) {
  const { t } = useLang()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  if (rooms.length === 0) {
    return (
      <section id="rooms" className="section-padding bg-[var(--color-sand-50)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[var(--color-coral-500)] text-sm font-semibold tracking-widest uppercase">
            {t.rooms.title}
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[var(--color-sea-900)] font-bold mt-2 mb-6">
            {t.rooms.subtitle}
          </h2>
          <p className="text-gray-500 mt-8">{t.rooms.noRooms}</p>
        </div>
      </section>
    )
  }

  return (
    <section id="rooms" className="section-padding bg-[var(--color-sand-50)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-[var(--color-coral-500)] text-sm font-semibold tracking-widest uppercase">
            {t.rooms.title}
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[var(--color-sea-900)] font-bold mt-2">
            {t.rooms.subtitle}
          </h2>
        </motion.div>

        {/* Grid */}
        <div
          className={`grid gap-7 ${
            rooms.length === 1
              ? 'max-w-md mx-auto'
              : rooms.length === 2
              ? 'sm:grid-cols-2 max-w-3xl mx-auto'
              : 'sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {rooms.map((room, i) => (
            <RoomCard key={room._id} room={room} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
