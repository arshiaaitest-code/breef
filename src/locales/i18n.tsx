import React, { createContext, useContext, useState, useEffect } from 'react';
import { fa } from './fa';
import { en } from './en';

export type Language = 'fa' | 'en';
type TranslationKeys = keyof typeof fa;

interface I18nContextValue {
  language: Language;
  direction: 'rtl' | 'ltr';
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKeys | string, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem('atelier_brief_lang');
      if (stored === 'en' || stored === 'fa') return stored;
    } catch {
      // ignore
    }
    return 'fa';
  });

  const direction: 'rtl' | 'ltr' = language === 'fa' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    try {
      localStorage.setItem('atelier_brief_lang', language);
    } catch {
      // ignore
    }
  }, [language, direction]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'fa' ? 'en' : 'fa'));
  };

  const t = (key: TranslationKeys | string, fallback?: string): string => {
    const dict = language === 'fa' ? fa : en;
    const value = (dict as Record<string, string>)[key];
    if (value !== undefined) return value;
    if (fallback !== undefined) return fallback;
    return key;
  };

  return (
    <I18nContext.Provider
      value={{
        language,
        direction,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextValue => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
