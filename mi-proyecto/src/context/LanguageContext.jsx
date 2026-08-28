import { createContext, useContext, useState, useEffect } from 'react'
import translations from './translations'

const LanguageContext = createContext()

const LANGUAGE_KEY = 'veterinaria:idioma'

function getInitialLanguage() {
  try {
    const saved = localStorage.getItem(LANGUAGE_KEY)
    if (saved === 'es' || saved === 'en') return saved
  } catch {}
  return 'es'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLanguage)

  useEffect(() => {
    try {
      localStorage.setItem(LANGUAGE_KEY, lang)
    } catch {}
    document.documentElement.lang = lang
  }, [lang])

  function t(key, params) {
    const keys = key.split('.')
    let value = translations[lang]
    for (const k of keys) {
      value = value?.[k]
    }
    if (typeof value === 'function') return value(params)
    if (typeof value === 'string' && params) {
      return Object.entries(params).reduce(
        (str, [p, v]) => str.replace(`{${p}}`, v),
        value,
      )
    }
    return value ?? key
  }

  function toggleLang() {
    setLang((prev) => (prev === 'es' ? 'en' : 'es'))
  }

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
