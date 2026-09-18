export const supportedLocales = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands" },
  { code: "ro", name: "Romanian", nativeName: "Română" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "it", name: "Italian", nativeName: "Italiano" },
  { code: "pt", name: "Portuguese", nativeName: "Português" },
  { code: "pl", name: "Polish", nativeName: "Polski" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia" },
  { code: "ja", name: "Japanese", nativeName: "日本語" },
  { code: "ko", name: "Korean", nativeName: "한국어" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
] as const;

export type Locale = (typeof supportedLocales)[number]["code"];
export const defaultLocale: Locale = "en";
export function isLocale(value: string): value is Locale {
  return supportedLocales.some((locale) => locale.code === value);
}
