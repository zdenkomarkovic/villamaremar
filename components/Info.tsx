'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from './LanguageContext'

function InfoCard({
  icon,
  title,
  children,
  delay,
  inView,
}: {
  icon: string
  title: string
  children: React.ReactNode
  delay: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--color-sand-100)]"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{icon}</span>
        <h3 className="font-semibold text-[var(--color-sea-800)] text-base">{title}</h3>
      </div>
      {children}
    </motion.div>
  )
}

export default function Info() {
  const { t } = useLang()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const i = t.info

  return (
    <section id="info" className="section-padding bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-[var(--color-coral-500)] text-sm font-semibold tracking-widest uppercase">
            Villa Mare Mar
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[var(--color-sea-900)] font-bold mt-2">
            {i.title}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Check-in / Check-out */}
          <InfoCard icon="🕑" title={i.checkInOut} delay={0.1} inView={inView}>
            <div className="flex flex-col gap-2 text-sm">
              <p className="text-gray-600 font-medium border-b border-[var(--color-sand-100)] pb-2">{i.checkIn}</p>
              <p className="text-gray-600 font-medium border-b border-[var(--color-sand-100)] pb-2">{i.checkOut}</p>
              <p className="text-gray-500 pt-1">{i.earlyCheckin}</p>
              <p className="text-gray-500">{i.lateCheckout}</p>
              <p className="text-gray-400 text-xs">{i.lateCheckoutFull}</p>
            </div>
          </InfoCard>

          {/* Posteljina i peškiri */}
          <InfoCard icon="🛏️" title={i.linenTitle} delay={0.2} inView={inView}>
            <p className="text-sm text-gray-500 leading-relaxed">{i.linen}</p>
            <p className="text-sm text-gray-500 mt-3">{i.childrenFree}</p>
          </InfoCard>

          {/* Turistička taksa + parking */}
          <InfoCard icon="🏛️" title={i.taxTitle} delay={0.3} inView={inView}>
            <table className="w-full text-sm border border-[var(--color-sand-200)] rounded-xl overflow-hidden mb-4">
              <tbody>
                <tr className="bg-[var(--color-sand-50)]">
                  <td className="px-3 py-2 text-gray-500">{i.taxAdult}</td>
                  <td className="px-3 py-2 text-right font-bold text-[var(--color-sea-900)]">1 EUR</td>
                </tr>
                <tr className="border-t border-[var(--color-sand-100)]">
                  <td className="px-3 py-2 text-gray-500">{i.taxChild}</td>
                  <td className="px-3 py-2 text-right font-bold text-[var(--color-sea-900)]">0,50 EUR</td>
                </tr>
                <tr className="border-t border-[var(--color-sand-100)]">
                  <td className="px-3 py-2 text-gray-500">{i.taxChildFree}</td>
                  <td className="px-3 py-2 text-right font-bold text-green-600">{i.taxFree}</td>
                </tr>
              </tbody>
            </table>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>🅿️</span>
              <span>{i.parking}</span>
            </div>
          </InfoCard>
        </div>

        {/* Welcome message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-8 text-center"
        >
          <p className="font-serif text-xl text-[var(--color-sea-800)] italic">{i.welcome}</p>
        </motion.div>
      </div>
    </section>
  )
}
