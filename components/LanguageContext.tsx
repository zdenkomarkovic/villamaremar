'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { translations, type Lang, type Translations } from '@/lib/translations'

interface LanguageContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('sr')

  useEffect(() => {
    const saved = localStorage.getItem('villa-lang') as Lang | null
    if (saved && ['sr', 'en', 'ru', 'de'].includes(saved)) {
      setLangState(saved)
    }
  }, [])

  const setLang = (newLang: Lang) => {
    setLangState(newLang)
    localStorage.setItem('villa-lang', newLang)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
