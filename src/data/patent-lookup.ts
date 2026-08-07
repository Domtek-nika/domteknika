import "server-only";

import PATENT_LOCALIZATIONS from "@/data/patent-localizations.json";
import { locales, type Locale } from "@/i18n/routing";

import { PATENTS, type PatentRecord } from "./patents";

type PatentTranslation = Pick<PatentRecord, "title" | "abstract">;

const TRANSLATIONS = PATENT_LOCALIZATIONS as Record<
  Exclude<Locale, "en">,
  Record<string, PatentTranslation>
>;

export function normalizePublication(value: string) {
  return decodeURIComponent(value).replace(/[^a-z0-9]/gi, "").toUpperCase();
}
function resolveLocale(locale: string): Locale {
  return locales.includes(locale as Locale) ? (locale as Locale) : "en";
}

export function getLocalizedPatents(locale: string) {
  const resolvedLocale = resolveLocale(locale);
  if (resolvedLocale === "en") return PATENTS;

  const translations = TRANSLATIONS[resolvedLocale];
  return PATENTS.map((patent) => {
    const translation = translations?.[patent.id];
    return {
      ...patent,
      title: translation?.title || patent.title,
      abstract: translation?.abstract || patent.abstract,
    };
  });
}

export function getPatentByPublication(locale: string, publication: string) {
  const normalizedPublication = normalizePublication(publication);
  return getLocalizedPatents(locale).find((patent) =>
    [patent.id, ...patent.publicationAliases].some(
      (alias) => normalizePublication(alias) === normalizedPublication,
    ),
  );
}

export function getCanonicalPatentSlugs() {
  return PATENTS.map((patent) => patent.id.toLowerCase());
}

export function getPatentAliasSlugs() {
  return Array.from(
    new Set(
      PATENTS.flatMap((patent) =>
        patent.publicationAliases.map((alias) =>
          normalizePublication(alias).toLowerCase(),
        ),
      ),
    ),
  );
}
