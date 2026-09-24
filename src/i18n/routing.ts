import { defineRouting } from "next-intl/routing";

/**
 * Domteknika — i18n routing configuration.
 * English is the fallback locale; all translated routes are prefixed.
 */
export const locales = ["en", "fr", "de", "es", "ko", "zh", "ja"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
});
