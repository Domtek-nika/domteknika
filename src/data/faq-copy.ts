import "server-only";

import en from "./faq/en.json";
import fr from "./faq/fr.json";
import de from "./faq/de.json";
import es from "./faq/es.json";
import ko from "./faq/ko.json";
import zh from "./faq/zh.json";
import ja from "./faq/ja.json";
import type { FaqSearchLabels } from "@/components/sections/faq-search";
import { locales, type Locale } from "@/i18n/routing";

type FaqCopy = {
  title: string;
  intro: string;
  generalTopic: string;
  fullFaqLink: string;
  labels: FaqSearchLabels;
  general: { question: string; answer: string }[];
};

const copy = { en, fr, de, es, ko, zh, ja } satisfies Record<Locale, FaqCopy>;

export function getFaqCopy(locale: string) {
  return copy[locales.includes(locale as Locale) ? locale as Locale : "en"];
}
