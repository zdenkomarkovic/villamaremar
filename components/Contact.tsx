'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from './LanguageContext'

const CONTACTS = {
  phoneMontenegro: ['+382 30 373 262', '+382 68 759 607'],
  phoneBelgrade: '+381 63 865 0691',
  email: 'villa.maremar@gmail.com',
  instagram: 'https://www.instagram.com/villamaremar',
  facebook: 'https://www.facebook.com/villamaremar',
  booking: 'https://www.booking.com/hotel/me/mare-mar.html',
}

function ContactCard({
  icon,
  label,
  children,
  delay,
  inView,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
  delay: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--color-sand-100)] hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-[var(--color-sea-50)] rounded-lg flex items-center justify-center text-[var(--color-sea-700)]">
          {icon}
        </div>
        <span className="text-[var(--color-sea-700)] font-semibold text-sm uppercase tracking-wide">
          {label}
        </span>
      </div>
      {children}
    </motion.div>
  )
}

export default function Contact() {
  const { t } = useLang()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="section-padding bg-[var(--color-sand-50)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-[var(--color-coral-500)] text-sm font-semibold tracking-widest uppercase">
            {t.contact.title}
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[var(--color-sea-900)] font-bold mt-2">
            {t.contact.subtitle}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {/* Montenegro phones */}
          <ContactCard
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            }
            label={`${t.contact.phone} – ${t.contact.montenegro}`}
            delay={0.1}
            inView={inView}
          >
            <div className="flex flex-col gap-2">
              {CONTACTS.phoneMontenegro.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="text-[var(--color-sea-800)] font-semibold text-base hover:text-[var(--color-coral-500)] transition-colors"
                >
                  {phone}
                </a>
              ))}
            </div>
          </ContactCard>

          {/* Belgrade phone */}
          <ContactCard
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            }
            label={`${t.contact.phone} – ${t.contact.belgrade}`}
            delay={0.2}
            inView={inView}
          >
            <a
              href={`tel:${CONTACTS.phoneBelgrade.replace(/\s/g, '')}`}
              className="text-[var(--color-sea-800)] font-semibold text-base hover:text-[var(--color-coral-500)] transition-colors block"
            >
              {CONTACTS.phoneBelgrade}
            </a>
          </ContactCard>

          {/* Email */}
          <ContactCard
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
            label={t.contact.email}
            delay={0.3}
            inView={inView}
          >
            <a
              href={`mailto:${CONTACTS.email}`}
              className="text-[var(--color-sea-800)] font-semibold text-base hover:text-[var(--color-coral-500)] transition-colors break-all"
            >
              {CONTACTS.email}
            </a>
          </ContactCard>
        </div>

        {/* Social */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--color-sand-100)]"
        >
          <p className="text-[var(--color-sea-700)] font-semibold text-sm uppercase tracking-wide mb-4">
            {t.contact.followUs}
          </p>
          <div className="flex gap-4">
            <a
              href={CONTACTS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[var(--color-sea-800)] hover:text-[#E1306C] transition-colors font-semibold"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Instagram
            </a>
            <a
              href={CONTACTS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[var(--color-sea-800)] hover:text-[#1877F2] transition-colors font-semibold"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
