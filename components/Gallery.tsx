"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useLang } from "./LanguageContext";
import type { GalleryImage } from "@/types/galleryImage";

const LOCAL_IMAGES = [
  "491527617.webp",
  "491527770.webp",
  "156069210.webp",
  "156075390.webp",
  "84407726.webp",
  "84407771.webp",
  "84407930.webp",
  "84408390.webp",
  "84406659.webp",
  "84406304.webp",
  "84406136.webp",
  "84405917.webp",
  "84404779.webp",
  "84403951.webp",
  "84403059.webp",
  "84402925.webp",
  "84402427.webp",
  "84409304.webp",
  "84417111.webp",
  "84416173.webp",
  "84407130.webp",
  "84407801.webp",
  "84408134.webp",
  "84406283.webp",
  "63819163.webp",
  "63819159.webp",
  "63819154.webp",
  "63819153.webp",
  "63817464.webp",
  "63817462.webp",
  "43318575.webp",
  "43318574.webp",
  "43318573.webp",
  "43318572.webp",
  "43318567.webp",
  "43318566.webp",
  "43318563.webp",
  "43318559.webp",
  "43318548.webp",
  "43318538.webp",
  "43318519.webp",
  "43318518.webp",
  "43318517.webp",
];

const PREVIEW_COUNT = 16;

export default function Gallery({ sanityImages = [] }: { sanityImages?: GalleryImage[] }) {
  const { t } = useLang();
  const [showAll, setShowAll] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Sanity slike (pune URL) + lokalne slike (path)
  const sanityEntries = sanityImages.map((img) => ({ src: img.url, alt: img.alt }));
  const localEntries = LOCAL_IMAGES.map((f, i) => ({
    src: `/images/${f}`,
    alt: `Villa Mare Mar ${i + 1}`,
  }));
  const ALL_ENTRIES = [...sanityEntries, ...localEntries];

  const displayed = showAll ? ALL_ENTRIES : ALL_ENTRIES.slice(0, PREVIEW_COUNT);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevImg = useCallback(
    () => setLightbox((p) => (p === null ? null : p === 0 ? ALL_ENTRIES.length - 1 : p - 1)),
    [ALL_ENTRIES.length]
  );
  const nextImg = useCallback(
    () => setLightbox((p) => (p === null ? null : p === ALL_ENTRIES.length - 1 ? 0 : p + 1)),
    [ALL_ENTRIES.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImg();
      if (e.key === "ArrowRight") nextImg();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [lightbox, closeLightbox, prevImg, nextImg]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <>
      <section id="gallery" className="section-padding bg-[var(--color-sand-50)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <span className="text-[var(--color-coral-500)] font-serif text-4xl sm:text-5xl font-semibold tracking-widest uppercase">
              {t.gallery.title}
            </span>
            {/* <h2 className=" text-4xl sm:text-5xl text-[var(--color-sea-900)] font-bold mt-2">
              {t.gallery.subtitle}
            </h2> */}
          </motion.div>

          {/* Masonry grid — slike se prikazuju u prirodnim proporcijama */}
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
            {displayed.map((entry, i) => (
              <motion.button
                key={entry.src}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: Math.min(i * 0.035, 0.5) }}
                onClick={() => setLightbox(ALL_ENTRIES.findIndex((e) => e.src === entry.src))}
                className="group block w-full mb-3 rounded-xl overflow-hidden relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-sea-400)] break-inside-avoid"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={entry.src}
                  alt={entry.alt ?? `Villa Mare Mar ${i + 1}`}
                  loading={i < 8 ? "eager" : "lazy"}
                  className="w-full h-auto block group-hover:scale-105 transition-transform duration-500 origin-center"
                  style={{ display: "block" }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[var(--color-sea-900)]/0 group-hover:bg-[var(--color-sea-900)]/30 transition-colors duration-300 flex items-center justify-center">
                  <svg
                    className="w-9 h-9 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Show more */}
          {!showAll && ALL_ENTRIES.length > PREVIEW_COUNT && (
            <div className="text-center mt-10">
              <button
                onClick={() => setShowAll(true)}
                className="bg-[var(--color-sea-800)] hover:bg-[var(--color-sea-700)] text-white font-semibold px-8 py-3 rounded-full transition-colors"
              >
                + {ALL_ENTRIES.length - PREVIEW_COUNT} {t.gallery.photo}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/96 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/70 hover:text-white z-10 p-2"
              aria-label={t.gallery.close}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-sm select-none">
              {lightbox + 1} / {ALL_ENTRIES.length}
            </div>

            {/* Prev */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImg();
              }}
              className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 z-10 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              aria-label={t.gallery.prev}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Image — prirodne proporcije, fituje se u ekran */}
            <AnimatePresence mode="wait">
              <motion.div
                key={lightbox}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center px-16 py-12 w-full h-full"
                onClick={(e) => e.stopPropagation()}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ALL_ENTRIES[lightbox].src}
                  alt={ALL_ENTRIES[lightbox].alt ?? `Villa Mare Mar ${lightbox + 1}`}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "85vh",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    borderRadius: "8px",
                    boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImg();
              }}
              className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 z-10 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              aria-label={t.gallery.next}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
