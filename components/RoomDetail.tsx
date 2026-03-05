"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "./LanguageContext";
import type { Room } from "@/types/room";
import type { Lang } from "@/lib/translations";

const FEATURE_ICONS: Record<string, string> = {
  beach: "🏖️",
  seaView: "🌊",
  terrace: "🏡",
  balcony: "🪟",
  ac: "❄️",
  wifi: "📶",
  kitchen: "🍳",
  bathroom: "🚿",
  tv: "📺",
  parking: "🅿️",
  bbq: "🔥",
  garden: "🌿",
  safe: "🔒",
};

export default function RoomDetail({ room }: { room: Room }) {
  const { t, lang } = useLang();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const images = room.images ?? [];
  const name = room.name?.[lang as Lang] ?? room.name?.sr ?? "";
  const description = room.description?.[lang as Lang] ?? room.description?.sr ?? "";

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevImg = useCallback(
    () => setLightbox((p) => (p === null ? null : p === 0 ? images.length - 1 : p - 1)),
    [images.length]
  );
  const nextImg = useCallback(
    () => setLightbox((p) => (p === null ? null : p === images.length - 1 ? 0 : p + 1)),
    [images.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImg();
      if (e.key === "ArrowRight") nextImg();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, closeLightbox, prevImg, nextImg]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back + Title */}
        <div className="mb-6">
          <Link
            href="/#rooms"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[var(--color-sea-800)] transition-colors mb-4"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t.rooms.backToRooms}
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--color-sea-900)] mb-3">
            {name}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            {room.guests && (
              <span className="flex items-center gap-1.5">
                👥 {room.guests} {t.rooms.guests}
                {room.children != null ? ` + ${room.children} ${t.rooms.children}` : ''}
              </span>
            )}
            {room.doubleBeds ? (
              <span className="flex items-center gap-1.5">💑 {room.doubleBeds} {t.rooms.doubleBeds}</span>
            ) : null}
            {room.singleBeds ? (
              <span className="flex items-center gap-1.5">🛏️ {room.singleBeds} {t.rooms.singleBeds}</span>
            ) : null}
            {room.size && <span className="flex items-center gap-1.5">📐 {room.size} m²</span>}
          </div>
        </div>

        {/* Main layout: left (photos + info) | right (price card) */}
        <div className="grid lg:grid-cols-3 gap-10 items-start">
          {/* LEFT COLUMN: large image + thumbnail grid + description + features */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Large main image */}
            {images[0] && (
              <button
                onClick={() => setLightbox(0)}
                className="group relative w-full rounded-2xl overflow-hidden"
                style={{ aspectRatio: "16/10" }}
              >
                <Image
                  src={images[0]}
                  alt={name}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </button>
            )}

            {/* Thumbnail grid — sve ostale slike u 3 kolone */}
            {images.length > 1 && (
              <div className="grid grid-cols-9 gap-2">
                {images.slice(1).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setLightbox(i + 1)}
                    className="group relative aspect-square rounded-xl overflow-hidden"
                  >
                    <Image
                      src={img}
                      alt={`${name} ${i + 2}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 33vw, (max-width: 1024px) 22vw, 15vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md"
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
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: price card + description */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-white rounded-2xl shadow-lg border border-[var(--color-sand-100)] p-6 flex flex-col gap-5"
            >
              {/* Tabela cijena */}
              {(room.priceLow || room.priceHigh) && (
                <div className="border-b border-[var(--color-sand-100)] pb-4">
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
                          <td className="text-gray-500 px-3 py-2.5">{t.rooms.lowSeasonDates}</td>
                          <td className="text-right font-bold text-[var(--color-sea-900)] text-lg px-3 py-2.5">€{room.priceLow}</td>
                        </tr>
                      )}
                      {room.priceHigh && (
                        <tr className="border-t border-[var(--color-sand-100)]">
                          <td className="text-gray-500 px-3 py-2.5">{t.rooms.highSeasonDates}</td>
                          <td className="text-right font-bold text-[var(--color-coral-500)] text-lg px-3 py-2.5">€{room.priceHigh}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="flex flex-col gap-2 text-sm">
                {room.guests && (
                  <div className="flex justify-between text-gray-600">
                    <span>👥 {t.rooms.guests}</span>
                    <span className="font-semibold text-[var(--color-sea-900)]">{room.guests}</span>
                  </div>
                )}
                {room.children != null && (
                  <div className="flex justify-between text-gray-600">
                    <span>👧 {t.rooms.children}</span>
                    <span className="font-semibold text-[var(--color-sea-900)]">{room.children}</span>
                  </div>
                )}
                {room.doubleBeds != null && (
                  <div className="flex justify-between text-gray-600">
                    <span>💑 {t.rooms.doubleBeds}</span>
                    <span className="font-semibold text-[var(--color-sea-900)]">{room.doubleBeds}</span>
                  </div>
                )}
                {room.singleBeds != null && (
                  <div className="flex justify-between text-gray-600">
                    <span>🛏️ {t.rooms.singleBeds}</span>
                    <span className="font-semibold text-[var(--color-sea-900)]">{room.singleBeds}</span>
                  </div>
                )}
                {room.size && (
                  <div className="flex justify-between text-gray-600">
                    <span>📐 {t.rooms.sqm}</span>
                    <span className="font-semibold text-[var(--color-sea-900)]">
                      {room.size} m²
                    </span>
                  </div>
                )}
              </div>

              {/* Napomena o djeci */}
              <div className="text-xs text-gray-500 bg-[var(--color-sand-50)] border border-[var(--color-sand-200)] rounded-xl px-3 py-2.5 leading-relaxed">
                🧒 {t.rooms.childrenFreeNote}
              </div>

              <a
                href="https://wa.me/381638650691"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-3 rounded-xl text-center transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
              <a
                href="mailto:villa.maremar@gmail.com"
                className="border border-[var(--color-sea-800)] text-[var(--color-sea-800)] hover:bg-[var(--color-sea-800)] hover:text-white font-semibold py-3 rounded-xl text-center transition-colors"
              >
                {t.rooms.contactCta}
              </a>

              <Link
                href="/#rooms"
                className="text-center text-sm text-gray-400 hover:text-[var(--color-sea-700)] transition-colors"
              >
                {t.rooms.backToRooms}
              </Link>
            </motion.div>

            {/* Description */}
            {description && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">
                  {description}
                </p>
              </motion.div>
            )}

          </div>
        </div>

        {/* Features — puna sirina stranice */}
        {room.features && room.features.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-10"
          >
            <h2 className="font-serif text-2xl font-bold text-[var(--color-sea-900)] mb-4">
              {t.amenities.title}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {room.features.map((f) => {
                const label = t.rooms.features[f as keyof typeof t.rooms.features];
                if (!label) return null;
                return (
                  <div
                    key={f}
                    className="flex items-center gap-3 bg-[var(--color-sea-50)] border border-[var(--color-sea-100)] rounded-xl px-4 py-3"
                  >
                    <span className="text-xl">{FEATURE_ICONS[f]}</span>
                    <span className="text-sm text-[var(--color-sea-800)] font-medium">{label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/70 hover:text-white z-10 p-2"
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
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-sm select-none">
              {lightbox + 1} / {images.length}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImg();
              }}
              className="absolute left-3 sm:left-6 text-white/70 hover:text-white p-3 z-10 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <AnimatePresence mode="wait">
              <motion.div
                key={lightbox}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="relative w-full h-full max-w-6xl max-h-[88vh] mx-20"
                onClick={(e) => e.stopPropagation()}
              >
                {images[lightbox] && (
                  <Image
                    src={images[lightbox]!}
                    alt={name}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                )}
              </motion.div>
            </AnimatePresence>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImg();
              }}
              className="absolute right-3 sm:right-6 text-white/70 hover:text-white p-3 z-10 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
