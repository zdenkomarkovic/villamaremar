"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "./LanguageContext";

export default function Location() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const mapQuery = encodeURIComponent("Obala Iva Novakovica 10, Sutomore, Montenegro");

  return (
    <section id="location" className="section-padding bg-[var(--color-sea-900)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-[var(--color-sand-300)] text-sm font-semibold tracking-widest uppercase">
            {t.location.title}
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-white font-bold mt-2">
            {t.location.subtitle}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Map embed */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-2xl overflow-hidden shadow-2xl h-[350px] sm:h-[450px]"
          >
            <iframe
              title="Villa Mare Mar location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1346.0208743029793!2d19.061543855687084!3d42.13087296553416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134e76ee19503e3f%3A0xe2b46144e79a08ea!2sVilla%20Mare%20Mar!5e0!3m2!1ssr!2srs!4v1773049089348!5m2!1ssr!2srs"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-col gap-6"
          >
            {/* Address */}
            <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[var(--color-coral-500)] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white/60 text-sm font-medium uppercase tracking-wide mb-1">
                    {t.location.title}
                  </p>
                  <p className="text-white font-semibold text-lg leading-snug">
                    {t.location.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Highlights grid */}
            <div className="grid grid-cols-2 gap-3">
              {t.location.highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
                  className="bg-white/10 rounded-xl px-4 py-4 border border-white/10"
                >
                  <span className="text-2xl block mb-2">{item.icon}</span>
                  <p className="text-white/80 text-sm leading-snug">{item.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Map link */}
            <a
              href="https://maps.app.goo.gl/YRksGcinDssF9Zjo8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[var(--color-coral-500)] hover:bg-[var(--color-coral-400)] text-white font-semibold px-6 py-4 rounded-xl transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              {t.location.viewMap}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
