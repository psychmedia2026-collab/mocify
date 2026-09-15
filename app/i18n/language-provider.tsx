"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { getDictionary } from "./index";
import { defaultLocale, isLocale, type Locale } from "./config";

const STORAGE_KEY = "mocify-interface-language";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dictionary: ReturnType<typeof getDictionary>;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const savedLocale = window.localStorage.getItem(STORAGE_KEY);

    if (savedLocale && isLocale(savedLocale)) {
      setLocaleState(savedLocale);
    }
  }, []);

  function setLocale(newLocale: Locale) {
    setLocaleState(newLocale);
    window.localStorage.setItem(STORAGE_KEY, newLocale);
    document.documentElement.lang = newLocale;
  }

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        dictionary: getDictionary(locale),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}