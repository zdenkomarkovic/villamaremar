'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useLang } from './LanguageContext'

type AmenityItem = { icon: string; key: keyof ReturnType<typeof useLang>['t']['amenities']['items'] }

// Najinteresantniji sadrzaji – prikazuju se uvek
const HIGHLIGHTS: AmenityItem[] = [
  { icon: '🏖️', key: 'privateBeach' },
  { icon: '🌊', key: 'seaView' },
  { icon: '🏡', key: 'terrace' },
  { icon: '🪟', key: 'balcony' },
  { icon: '🔥', key: 'bbq' },
  { icon: '☀️', key: 'sunbeds' },
  { icon: '❄️', key: 'ac' },
  { icon: '📶', key: 'wifi' },
  { icon: '🅿️', key: 'parking' },
  { icon: '🧊', key: 'fridge' },
  { icon: '🚿', key: 'shower' },
  { icon: '📺', key: 'flatTV' },
]

// Sve kategorije sa preostalim sadrzajima (bez duplikata iz HIGHLIGHTS)
const EXTRA_CATEGORIES: {
  key: 'outdoor' | 'room' | 'kitchen' | 'bathroom' | 'tech' | 'services'
  items: AmenityItem[]
}[] = [
  {
    key: 'outdoor',
    items: [
      { icon: '⛱️', key: 'umbrellas' },
      { icon: '🍽️', key: 'diningArea' },
      { icon: '🔥', key: 'fireplace' },
      { icon: '🌿', key: 'garden' },
      { icon: '🪑', key: 'outdoorFurniture' },
    ],
  },
  {
    key: 'room',
    items: [
      { icon: '🌡️', key: 'heating' },
      { icon: '🔇', key: 'soundproof' },
      { icon: '🔒', key: 'safe' },
      { icon: '👗', key: 'wardrobe' },
      { icon: '🛏️', key: 'extraBeds' },
      { icon: '🛏️', key: 'linen' },
    ],
  },
  {
    key: 'kitchen',
    items: [
      { icon: '🍳', key: 'cooktop' },
      { icon: '🥣', key: 'dishes' },
      { icon: '🫖', key: 'kettle' },
      { icon: '🍴', key: 'kitchenette' },
      { icon: '☕', key: 'coffee' },
    ],
  },
  {
    key: 'bathroom',
    items: [
      { icon: '🚽', key: 'toilet' },
      { icon: '💨', key: 'hairDryer' },
      { icon: '🛁', key: 'towels' },
      { icon: '🚪', key: 'bathroom' },
    ],
  },
  {
    key: 'tech',
    items: [
      { icon: '📡', key: 'cableTV' },
      { icon: '🥤', key: 'drinkVending' },
    ],
  },
  {
    key: 'services',
    items: [
      { icon: '🚭', key: 'noSmoking' },
    ],
  },
]

function AmenityCard({ icon, label, delay }: { icon: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay }}
      className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-[var(--color-sand-100)] hover:border-[var(--color-sea-300)] hover:shadow-md transition-all"
    >
      <span className="text-xl flex-shrink-0">{icon}</span>
      <span className="text-sm text-[var(--color-sea-800)] font-medium leading-tight">{label}</span>
    </motion.div>
  )
}

const SHOW_MORE_LABELS: Record<string, [string, string]> = {
  sr: ['Prikaži sve sadržaje', 'Prikaži manje'],
  en: ['Show all amenities', 'Show less'],
  ru: ['Показать все удобства', 'Скрыть'],
  de: ['Alle Ausstattung anzeigen', 'Weniger anzeigen'],
}

export default function Amenities() {
  const { t, lang } = useLang()
  const [expanded, setExpanded] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [showMore, showLess] = (SHOW_MORE_LABELS[lang] ?? SHOW_MORE_LABELS.en) as [string, string]

  // count of hidden items
  const hiddenCount = EXTRA_CATEGORIES.reduce((sum, cat) => sum + cat.items.length, 0)

  return (
    <section id="amenities" className="section-padding bg-white">
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
            {t.amenities.title}
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[var(--color-sea-900)] font-bold mt-2">
            {t.amenities.subtitle}
          </h2>
        </motion.div>

        {/* Highlights – always visible */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
          {HIGHLIGHTS.map((item, i) => (
            <AmenityCard
              key={item.key}
              icon={item.icon}
              label={t.amenities.items[item.key]}
              delay={inView ? i * 0.04 : 0}
            />
          ))}
        </div>

        {/* Expandable extra categories */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="extra"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-8 pt-2 pb-8">
                {EXTRA_CATEGORIES.map((cat, catIdx) => (
                  <div key={cat.key}>
                    <motion.h3
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: catIdx * 0.06 }}
                      className="text-[var(--color-sea-700)] font-semibold text-xs uppercase tracking-widest mb-3 flex items-center gap-3"
                    >
                      <span className="flex-1 h-px bg-[var(--color-sand-300)]" />
                      {t.amenities[cat.key]}
                      <span className="flex-1 h-px bg-[var(--color-sand-300)]" />
                    </motion.h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {cat.items.map((item, i) => (
                        <AmenityCard
                          key={item.key}
                          icon={item.icon}
                          label={t.amenities.items[item.key]}
                          delay={i * 0.04}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle button */}
        <div className="flex justify-center">
          <motion.button
            onClick={() => setExpanded((v) => !v)}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-2 border border-[var(--color-sea-700)] text-[var(--color-sea-800)] hover:bg-[var(--color-sea-800)] hover:text-white font-semibold px-7 py-3 rounded-full text-sm transition-colors"
          >
            <span>{expanded ? showLess : `${showMore} (+${hiddenCount})`}</span>
            <motion.svg
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </motion.button>
        </div>
      </div>
    </section>
  )
}
