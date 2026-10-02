import "server-only";

import en from "./services/en.json";
import fr from "./services/fr.json";
import de from "./services/de.json";
import es from "./services/es.json";
import ko from "./services/ko.json";
import zh from "./services/zh.json";
import ja from "./services/ja.json";
import { locales, type Locale } from "@/i18n/routing";
import type { ServiceSlug } from "./services";

type ServiceContent = {
  title: string;
  description: string;
  outcome: string;
  caseStudy: { title: string; body: string };
  technicalFocus: {
    title: string;
    intro: string;
    columns: string[];
    rows: { title: string; why: string; check: string }[];
    takeaway: string;
  };
  ctaTitle: string;
  approach: string;
  validation: string;
  needs: string[];
  deliverables: string[];
  steps: { title: string; body: string }[];
  faq: { question: string; answer: string }[];
};

type ServiceCopy = {
  labels: typeof en.labels;
  items: Record<ServiceSlug, ServiceContent>;
};

const copy = { en, fr, de, es, ko, zh, ja } satisfies Record<Locale, ServiceCopy>;

export function getServiceCopy(locale: string) {
  return copy[locales.includes(locale as Locale) ? (locale as Locale) : "en"];
}
