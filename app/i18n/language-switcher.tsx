"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./language-provider";
import { supportedLocales, type Locale } from "./config";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const currentLanguage =
    supportedLocales.find((language) => language.code === locale) ??
    supportedLocales[0];

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  function chooseLanguage(newLocale: Locale) {
    setLocale(newLocale);
    setOpen(false);
  }

  return (
    <div className="m-language" ref={wrapperRef}>
      <button
        type="button"
        className="m-language-button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span className="m-language-globe" aria-hidden="true">
          ◉
        </span>

        <span>{currentLanguage.nativeName}</span>

        <span
          className={`m-language-chevron${open ? " open" : ""}`}
          aria-hidden="true"
        >
         ⌄
        </span>
      </button>

      {open && (
        <div className="m-language-menu" role="menu">
          <div className="m-language-menu-title">LANGUAGE</div>

          {supportedLocales.map((language) => (
            <button
              key={language.code}
              type="button"
              role="menuitem"
              className={
                language.code === locale
                  ? "m-language-option active"
                  : "m-language-option"
              }
              onClick={() => chooseLanguage(language.code)}
            >
              <span>{language.nativeName}</span>

              {language.code === locale && (
                <span className="m-language-check" aria-hidden="true">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}