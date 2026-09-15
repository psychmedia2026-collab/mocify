import en from "./en";
import ro from "./ro";
import nl from "./nl";

import {
  defaultLocale,
  isLocale,
  supportedLocales,
  type Locale,
} from "./config";

const dictionaries = {
  en,
  ro,
  nl,
};

export function getDictionary(locale: string) {
  const safeLocale: Locale = isLocale(locale) ? locale : defaultLocale;
  return dictionaries[safeLocale];
}

export {
  defaultLocale,
  isLocale,
  supportedLocales,
  type Locale,
};
