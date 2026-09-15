export const supportedLocales = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "ro", name: "Romanian", nativeName: "Română" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands" },
] as const;

export type Locale = (typeof supportedLocales)[number]["code"];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return supportedLocales.some((locale) => locale.code === value);
}
