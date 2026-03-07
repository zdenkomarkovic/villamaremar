'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from './LanguageContext'
import type { Cenovnik } from '@/types/pricing'

// Hardkodirane cijene kao fallback
const DEFAULT: Required<Cenovnik> = {
  r1low: '80',  r1high: '95',
  r2low: '65',  r2high: '70',
  r3low: '50',  r3high: '55',
  r4low: '70',  r4high: '90',
  r5low: '60',  r5high: '70',
  r6low: '40 / 46', r6high: '45 / 56',
}

const ROWS = [
  { key: 'r1', capacity: 'Max 3', extra: '2 adl + 1 chd <12y', nameSr: 'Studio sa velikim balkonom i direktnim pogledom na more', nameEn: 'Studio with big balcony and direct sea view',     nameRu: 'Студия с большим балконом и прямым видом на море',   nameDe: 'Studio mit großem Balkon und direktem Meerblick',  highlight: true },
  { key: 'r2', capacity: 'Max 3', extra: '2 adl + 1 chd <12y', nameSr: 'Studio sa balkonom i bočnim pogledom na more',           nameEn: 'Studio with balcony and side sea view',           nameRu: 'Студия с балконом и боковым видом на море',          nameDe: 'Studio mit Balkon und seitlichem Meerblick',       highlight: false },
  { key: 'r3', capacity: 'Max 3', extra: null,                  nameSr: 'Studio bez balkona',                                    nameEn: 'Studio without balcony',                         nameRu: 'Студия без балкона',                                 nameDe: 'Studio ohne Balkon',                               highlight: false },
  { key: 'r4', capacity: 'Max 2', extra: null,                  nameSr: 'Studio sa velikim balkonom i direktnim pogledom na more', nameEn: 'Studio with big balcony and direct sea view',    nameRu: 'Студия с большим балконом и прямым видом на море',   nameDe: 'Studio mit großem Balkon und direktem Meerblick',  highlight: true },
  { key: 'r5', capacity: 'Max 2', extra: null,                  nameSr: 'Studio sa balkonom i bočnim pogledom na more',           nameEn: 'Studio with balcony and side sea view',           nameRu: 'Студия с балконом и боковым видом на море',          nameDe: 'Studio mit Balkon und seitlichem Meerblick',       highlight: false },
  { key: 'r6', capacity: 'Max 2', extra: null,                  nameSr: 'Studio / Soba bez balkona',                             nameEn: 'Studio / Room without balcony',                  nameRu: 'Студия / Комната без балкона',                       nameDe: 'Studio / Zimmer ohne Balkon',                      highlight: false },
]

const NAME_KEYS = { sr: 'nameSr', en: 'nameEn', ru: 'nameRu', de: 'nameDe' } as const
type RowType = typeof ROWS[0]
function getRowName(row: RowType, lang: string): string {
  const key = NAME_KEYS[lang as keyof typeof NAME_KEYS] ?? 'nameSr'
  return row[key]
}

export default function Pricing({ cenovnik }: { cenovnik?: Cenovnik | null }) {
  const { t, lang } = useLang()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Sanity cene, ili fallback ako nisu unešene
  const prices: Required<Cenovnik> = { ...DEFAULT, ...cenovnik }

  return (
    <section id="pricing" className="section-padding bg-[var(--color-sea-900)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-[var(--color-sand-300)] text-sm font-semibold tracking-widest uppercase">
            Villa Mare Mar
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-white font-bold mt-2">
            {t.pricing.title}
          </h2>
          <p className="text-white/60 mt-3 text-base">{t.pricing.subtitle}</p>
        </motion.div>

        {/* Tabela – desktop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="hidden sm:block rounded-2xl overflow-hidden border border-white/10"
        >
          {/* Header tabele */}
          <div className="grid grid-cols-[1fr_2fr_1fr_1fr] bg-[var(--color-sea-800)] text-white/70 text-xs font-semibold uppercase tracking-widest">
            <div className="px-5 py-4 border-r border-white/10">{t.pricing.capacity}</div>
            <div className="px-5 py-4 border-r border-white/10">{t.pricing.studioType}</div>
            <div className="px-5 py-4 border-r border-white/10 text-center leading-snug">{t.pricing.seasonLow}</div>
            <div className="px-5 py-4 text-center leading-snug">{t.pricing.seasonHigh}</div>
          </div>

          {ROWS.map((row, i) => {
            const low  = prices[`${row.key}low`  as keyof Cenovnik] ?? ''
            const high = prices[`${row.key}high` as keyof Cenovnik] ?? ''
            return (
              <motion.div
                key={row.key}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
                className={`grid grid-cols-[1fr_2fr_1fr_1fr] border-t border-white/10 ${i % 2 === 0 ? 'bg-white/5' : ''}`}
              >
                <div className="px-5 py-4 border-r border-white/10 flex flex-col justify-center">
                  <span className="text-white font-semibold text-sm">{row.capacity}</span>
                  {row.extra && <span className="text-white/50 text-xs mt-0.5">{row.extra}</span>}
                </div>
                <div className="px-5 py-4 border-r border-white/10 flex flex-col justify-center gap-0.5">
                  <span className="text-white font-semibold text-sm leading-snug">{getRowName(row, lang)}</span>
                </div>
                <div className="px-5 py-4 border-r border-white/10 flex items-center justify-center">
                  <span className={`text-xl font-bold ${row.highlight ? 'text-[var(--color-sand-300)]' : 'text-white'}`}>{low}</span>
                </div>
                <div className="px-5 py-4 flex items-center justify-center">
                  <span className={`text-xl font-bold ${row.highlight ? 'text-[var(--color-coral-500)]' : 'text-white'}`}>{high}</span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Kartice – mobilni */}
        <div className="sm:hidden flex flex-col gap-3">
          {ROWS.map((row, i) => {
            const low  = prices[`${row.key}low`  as keyof Cenovnik] ?? ''
            const high = prices[`${row.key}high` as keyof Cenovnik] ?? ''
            return (
              <motion.div
                key={row.key}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.07 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-4"
              >
                <div className="flex flex-col gap-2 mb-3">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-white font-semibold text-sm leading-snug">{getRowName(row, lang)}</p>
                    <div className="shrink-0 bg-[var(--color-sea-800)] rounded-lg px-3 py-1 text-center">
                      <span className="text-white/60 text-xs block">{row.capacity}</span>
                      {row.extra && <span className="text-white/40 text-xs">{row.extra}</span>}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[var(--color-sea-800)]/60 rounded-xl px-3 py-2 text-center">
                    <p className="text-white/50 text-xs mb-1">{t.pricing.seasonLow}</p>
                    <p className={`text-lg font-bold ${row.highlight ? 'text-[var(--color-sand-300)]' : 'text-white'}`}>{low} €</p>
                  </div>
                  <div className="bg-[var(--color-sea-800)]/60 rounded-xl px-3 py-2 text-center">
                    <p className="text-white/50 text-xs mb-1">{t.pricing.seasonHigh}</p>
                    <p className={`text-lg font-bold ${row.highlight ? 'text-[var(--color-coral-500)]' : 'text-white'}`}>{high} €</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Napomene */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-8 flex flex-col gap-5"
        >
          <p className="text-white/50 text-sm">{t.pricing.childrenNote}</p>
          <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5">
            <p className="text-[var(--color-sand-300)] font-semibold text-sm uppercase tracking-wide mb-3">
              {t.pricing.taxTitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
              <span className="text-white/80 text-sm">{t.pricing.taxAdult}</span>
              <span className="text-white/80 text-sm">{t.pricing.taxChild}</span>
              <span className="text-white/80 text-sm font-semibold">{t.pricing.taxChildFree}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
