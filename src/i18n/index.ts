import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from './locales/en.json';
import ptTranslations from './locales/pt.json';
import esTranslations from './locales/es.json';
import esUSTranslations from './locales/es-US.json';
import frTranslations from './locales/fr.json';
import deTranslations from './locales/de.json';
import itTranslations from './locales/it.json';
import jaTranslations from './locales/ja.json';
import koTranslations from './locales/ko.json';
import zhTranslations from './locales/zh.json';
import zhTWTranslations from './locales/zh-TW.json';
import arTranslations from './locales/ar.json';
import hiTranslations from './locales/hi.json';
import msTranslations from './locales/ms.json';
import nlTranslations from './locales/nl.json';
import svTranslations from './locales/sv.json';

const resources = {
  en: { translation: enTranslations },
  pt: { translation: ptTranslations },
  es: { translation: esTranslations },
  'es-US': { translation: esUSTranslations },
  fr: { translation: frTranslations },
  de: { translation: deTranslations },
  it: { translation: itTranslations },
  ja: { translation: jaTranslations },
  ko: { translation: koTranslations },
  zh: { translation: zhTranslations },
  'zh-TW': { translation: zhTWTranslations },
  ar: { translation: arTranslations },
  hi: { translation: hiTranslations },
  ms: { translation: msTranslations },
  nl: { translation: nlTranslations },
  sv: { translation: svTranslations },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language is English
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false, // This is important to avoid initialization issues
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
  });

export default i18n;