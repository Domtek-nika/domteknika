import "server-only";

import en from "./services/en.json";
import fr from "./services/fr.json";
import de from "./services/de.json";
import es from "./services/es.json";
import ko from "./services/ko.json";
import zh from "./services/zh.json";
import { locales, type Locale } from "@/i18n/routing";

const copy = { en, fr, de, es, ko, zh };

export function getServiceCopy(locale: string) {
  return copy[locales.includes(locale as Locale) ? (locale as Locale) : "en"];
}
