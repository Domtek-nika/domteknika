import { getRequestConfig } from "next-intl/server";
import { routing, type Locale } from "./routing";

const messageLoaders = {
  en: () => import("../../messages/en.json"),
  fr: () => import("../../messages/fr.json"),
  de: () => import("../../messages/de.json"),
  es: () => import("../../messages/es.json"),
  ko: () => import("../../messages/ko.json"),
  zh: () => import("../../messages/zh.json"),
} satisfies Record<Locale, () => Promise<{ default: Record<string, unknown> }>>;

export default getRequestConfig(async ({ requestLocale }) => {
  // `requestLocale` corresponds to the `[locale]` segment
  const requestedLocale = await requestLocale;

  // Ensure that a valid locale is used
  const locale = routing.locales.includes(requestedLocale as Locale)
    ? (requestedLocale as Locale)
    : routing.defaultLocale;

  return {
    locale,
    messages: (await messageLoaders[locale]()).default,
  };
});
