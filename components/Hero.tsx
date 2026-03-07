"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "./LanguageContext";

const HERO_IMAGES = [
  "/images/63817462.webp",
  "/images/43318563.webp",
  "/images/156069210.webp",
  "/images/491527770.webp",
  "/images/84407726.webp",
];

export default function Hero() {
  const { t } = useLang();
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Slideshow background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImg}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={HERO_IMAGES[currentImg]!}
            alt="Villa Mare Mar"
            fill
            className="object-cover"
            priority={currentImg === 0}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-sea-900)]/60 via-[var(--color-sea-900)]/30 to-[var(--color-sea-900)]/70" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-sm px-4 py-2 rounded-full">
            <span className="text-[var(--color-sand-300)] font-semibold text-base">
              ★ {t.hero.rating}
            </span>
            <span className="text-white/80">{t.hero.ratingLabel}</span>
            <span className="w-px h-4 bg-white/30" />
            <span className="text-white/80">{t.hero.ratingDesc}</span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-bold leading-tight mb-4"
        >
          Villa Mare Mar
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-[var(--color-sand-300)] text-lg sm:text-xl font-medium tracking-widest uppercase mb-3"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-white/80 text-base sm:text-lg mb-10 max-w-xl"
        >
          {t.hero.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() =>
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-2 bg-[var(--color-coral-500)] hover:bg-[var(--color-coral-400)] text-white font-semibold px-8 py-4 rounded-full text-base transition-all hover:scale-105 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {t.hero.cta}
          </button>
          <button
            onClick={() =>
              document.querySelector("#gallery")?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-white/15 backdrop-blur-sm hover:bg-white/25 border border-white/30 text-white font-semibold px-8 py-4 rounded-full text-base transition-all hover:scale-105"
          >
            {t.hero.ctaGallery}
          </button>
        </motion.div>
      </div>

      {/* Image dots */}
      <div className="absolute bottom-24 left-0 right-0 flex justify-center gap-2 z-10">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImg(i)}
            className={`rounded-full transition-all duration-300 ${
              i === currentImg ? "bg-[var(--color-sand-300)] w-6 h-2" : "bg-white/40 w-2 h-2"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60 hover:text-white transition-colors"
        aria-label="Scroll down"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.button>
    </section>
  );
}
