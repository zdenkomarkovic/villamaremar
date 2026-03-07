'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from './LanguageContext'

const CONTACTS = {
  phoneBelgrade: '+381 63 865 0691',
  phoneBelgradeRaw: '+381638650691',
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

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    checkin: '',
    checkout: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', checkin: '', checkout: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const phoneIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )

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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left – contact info */}
          <div className="flex flex-col gap-5">
            {/* Belgrade phone with Viber + WhatsApp */}
            <ContactCard
              icon={phoneIcon}
              label={`${t.contact.phone} – ${t.contact.belgrade}`}
              delay={0.1}
              inView={inView}
            >
              <a
                href={`tel:${CONTACTS.phoneBelgradeRaw}`}
                className="text-[var(--color-sea-800)] font-semibold text-base hover:text-[var(--color-coral-500)] transition-colors block mb-3"
              >
                {CONTACTS.phoneBelgrade}
              </a>
              <div className="flex gap-3">
                <a
                  href={`https://wa.me/${CONTACTS.phoneBelgradeRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
                <a
                  href={`viber://chat?number=%2B${CONTACTS.phoneBelgradeRaw.replace('+', '')}`}
                  className="flex items-center gap-2 bg-[#7360F2] hover:bg-[#6250d8] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.4 0C5.5.1.9 4.8.9 10.7c0 2.4.8 4.7 2.2 6.6L2 24l6.9-1.1c1.8 1.1 3.8 1.7 5.9 1.7 6 0 10.7-4.8 10.7-10.7S17.4-.1 11.4 0zm5.3 15.8c-.2.5-.9.9-1.5 1-.4.1-.9.1-2.6-.6-2.2-.9-3.8-3.1-3.9-3.2-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.2.2-.2.5-.3.7-.3h.5c.2 0 .4.1.5.4.2.4.7 1.7.8 1.8.1.2.1.3 0 .5-.1.2-.1.3-.3.4-.1.1-.3.3-.4.4-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2 1.1.9 2 1.2 2.3 1.3.3.1.5.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.7-.1.3.1 1.7.8 2 .9.3.1.5.2.6.3.1.3.1.9-.1 1.5z" />
                  </svg>
                  Viber
                </a>
              </div>
            </ContactCard>

            {/* Email */}
            <ContactCard
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
              label={t.contact.email}
              delay={0.2}
              inView={inView}
            >
              <a
                href={`mailto:${CONTACTS.email}`}
                className="text-[var(--color-sea-800)] font-semibold text-base hover:text-[var(--color-coral-500)] transition-colors break-all"
              >
                {CONTACTS.email}
              </a>
            </ContactCard>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
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

          {/* Right – contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[var(--color-sand-100)]"
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center gap-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-[var(--color-sea-800)] font-semibold text-lg">{t.contact.formSuccess}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[var(--color-sea-700)]">
                      {t.contact.formName} <span className="text-[var(--color-coral-500)]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="border border-[var(--color-sand-200)] rounded-xl px-4 py-3 text-sm text-[var(--color-sea-900)] focus:outline-none focus:ring-2 focus:ring-[var(--color-sea-700)] focus:border-transparent transition"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[var(--color-sea-700)]">
                      {t.contact.formEmail} <span className="text-[var(--color-coral-500)]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="border border-[var(--color-sand-200)] rounded-xl px-4 py-3 text-sm text-[var(--color-sea-900)] focus:outline-none focus:ring-2 focus:ring-[var(--color-sea-700)] focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[var(--color-sea-700)]">
                    {t.contact.formPhone}
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="border border-[var(--color-sand-200)] rounded-xl px-4 py-3 text-sm text-[var(--color-sea-900)] focus:outline-none focus:ring-2 focus:ring-[var(--color-sea-700)] focus:border-transparent transition"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[var(--color-sea-700)]">
                      {t.contact.formCheckin}
                    </label>
                    <input
                      type="date"
                      value={form.checkin}
                      onChange={(e) => setForm({ ...form, checkin: e.target.value })}
                      className="border border-[var(--color-sand-200)] rounded-xl px-4 py-3 text-sm text-[var(--color-sea-900)] focus:outline-none focus:ring-2 focus:ring-[var(--color-sea-700)] focus:border-transparent transition"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[var(--color-sea-700)]">
                      {t.contact.formCheckout}
                    </label>
                    <input
                      type="date"
                      value={form.checkout}
                      onChange={(e) => setForm({ ...form, checkout: e.target.value })}
                      className="border border-[var(--color-sand-200)] rounded-xl px-4 py-3 text-sm text-[var(--color-sea-900)] focus:outline-none focus:ring-2 focus:ring-[var(--color-sea-700)] focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[var(--color-sea-700)]">
                    {t.contact.formMessage} <span className="text-[var(--color-coral-500)]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="border border-[var(--color-sand-200)] rounded-xl px-4 py-3 text-sm text-[var(--color-sea-900)] focus:outline-none focus:ring-2 focus:ring-[var(--color-sea-700)] focus:border-transparent transition resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-600 text-sm">{t.contact.formError}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="bg-[var(--color-sea-800)] hover:bg-[var(--color-sea-900)] disabled:opacity-60 text-white font-bold px-6 py-4 rounded-xl transition-colors text-base mt-1"
                >
                  {status === 'sending' ? t.contact.formSending : t.contact.formSend}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
