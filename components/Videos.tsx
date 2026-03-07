"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLang } from "./LanguageContext";

const VIDEO_FILES = [
  "/video/DJI_0960.mp4",
  "/video/DJI_0942.mp4",
  "/video/DJI_0943.mp4",
  "/video/DJI_0956.mp4",
  "/video/DJI_0957.mp4",
];

function PlayIcon() {
  return (
    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export default function Videos() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightbox, setLightbox] = useState<number | null>(null);
  const featuredRef = useRef<HTMLVideoElement>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevVideo = useCallback(
    () => setLightbox((p) => (p === null ? null : p === 0 ? VIDEO_FILES.length - 1 : p - 1)),
    []
  );
  const nextVideo = useCallback(
    () => setLightbox((p) => (p === null ? null : p === VIDEO_FILES.length - 1 ? 0 : p + 1)),
    []
  );

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevVideo();
      if (e.key === "ArrowRight") nextVideo();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, closeLightbox, prevVideo, nextVideo]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <section id="videos" className="section-padding bg-[var(--color-sea-900)]">
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
            {t.videos.title}
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-white font-bold mt-2">
            {t.videos.subtitle}
          </h2>
        </motion.div>

        {/* Featured video – autoplay loop muted */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative rounded-2xl overflow-hidden mb-8 cursor-pointer group"
          style={{ aspectRatio: "16/9" }}
          onClick={() => setLightbox(0)}
        >
          <video
            ref={featuredRef}
            src={VIDEO_FILES[0]}
            muted
            playsInline
            preload="metadata"
            onLoadedMetadata={(e) => { e.currentTarget.currentTime = 1 }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/20 backdrop-blur-sm text-white rounded-full p-5">
              <PlayIcon />
            </div>
          </div>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
          <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
            {t.videos.video} 1 / {VIDEO_FILES.length}
          </div>
        </motion.div>

        {/* Grid – ostali videi */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {VIDEO_FILES.slice(1).map((src, i) => (
            <motion.button
              key={src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}
              onClick={() => setLightbox(i + 1)}
              className="group relative rounded-xl overflow-hidden bg-[var(--color-sea-800)]"
              style={{ aspectRatio: "16/9" }}
            >
              <video
                src={src}
                muted
                playsInline
                preload="metadata"
                onLoadedMetadata={(e) => { e.currentTarget.currentTime = 1 }}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/20 group-hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-3 transition-all group-hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
                {i + 2}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
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

            {/* Counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-sm select-none">
              {lightbox + 1} / {VIDEO_FILES.length}
            </div>

            {/* Prev */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevVideo();
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

            {/* Video player */}
            <AnimatePresence mode="wait">
              <motion.div
                key={lightbox}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-5xl mx-16 rounded-xl overflow-hidden"
                style={{ aspectRatio: "16/9" }}
                onClick={(e) => e.stopPropagation()}
              >
                <video
                  key={VIDEO_FILES[lightbox]}
                  src={VIDEO_FILES[lightbox]}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain bg-black"
                />
              </motion.div>
            </AnimatePresence>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextVideo();
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
    </section>
  );
}
