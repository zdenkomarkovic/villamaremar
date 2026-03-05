'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLang } from './LanguageContext'

const featureIcons = ['🏖️', '📶', '❄️', '🅿️']

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  const { t } = useLang()

  return (
    <section id="about" className="section-padding bg-[var(--color-sand-50)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Images */}
          <AnimatedSection delay={0}>
            <div className="relative">
              <div className="relative h-[420px] sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/84407726.webp"
                  alt="Villa Mare Mar"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-sea-900)]/30 to-transparent" />
              </div>

              {/* Floating accent image */}
              <div className="absolute -bottom-6 -right-6 w-44 h-44 sm:w-56 sm:h-56 rounded-xl overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="/images/43318517.webp"
                  alt="Villa Mare Mar terasa"
                  fill
                  className="object-cover"
                  sizes="224px"
                />
              </div>

              {/* Rating badge */}
              <div className="absolute top-4 left-4 bg-white rounded-xl shadow-lg px-4 py-3 flex flex-col items-center">
                <span className="font-serif text-3xl font-bold text-[var(--color-sea-800)]">
                  {t.about.ratingTitle === 'Booking.com Rating' ? '9.5' : t.hero.rating}
                </span>
                <span className="text-xs text-gray-500 font-medium">Booking.com</span>
                <div className="flex gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 text-[var(--color-sand-500)]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Text */}
          <div className="flex flex-col gap-6">
            <AnimatedSection delay={0.15}>
              <span className="text-[var(--color-coral-500)] text-sm font-semibold tracking-widest uppercase">
                Mare Mar
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-[var(--color-sea-900)] font-bold leading-tight mt-2">
                {t.about.title}
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <p className="text-gray-600 leading-relaxed text-base">
                {t.about.text1}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.35}>
              <p className="text-gray-600 leading-relaxed text-base">
                {t.about.text2}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.45}>
              <p className="text-gray-600 leading-relaxed text-base">
                {t.about.text3}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.55}>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {t.about.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-[var(--color-sand-100)]"
                  >
                    <span className="text-2xl">{featureIcons[i]}</span>
                    <span className="text-sm font-semibold text-[var(--color-sea-800)]">{feature}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.65}>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border border-[var(--color-sea-800)] text-[var(--color-sea-800)] hover:bg-[var(--color-sea-800)] hover:text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
                >
                  {t.hero.ctaGallery}
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}
