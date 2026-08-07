import type { MetadataRoute } from "next";

import { getCanonicalPatentSlugs } from "@/data/patent-lookup";
import { PATENTS } from "@/data/patents";
import { getProjectSlugs } from "@/data/projects";
import { locales } from "@/i18n/routing";
import {
  INDEXABLE_ROUTES,
  languageAlternates,
  localizedUrl,
} from "@/lib/seo";

const ROUTE_SETTINGS: Record<
  (typeof INDEXABLE_ROUTES)[number],
  {
    changeFrequency: "monthly" | "yearly";
    priority: number;
  }
> = {
  "": { changeFrequency: "monthly", priority: 1 },
  "/projects": { changeFrequency: "monthly", priority: 0.9 },
  "/expertise": { changeFrequency: "monthly", priority: 0.9 },
  "/patents": { changeFrequency: "monthly", priority: 0.8 },
  "/our-story": { changeFrequency: "yearly", priority: 0.7 },
  "/contact": { changeFrequency: "yearly", priority: 0.7 },
  "/legal-notice": { changeFrequency: "yearly", priority: 0.3 },
  "/privacy-policy": { changeFrequency: "yearly", priority: 0.3 },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const mainRoutes = INDEXABLE_ROUTES.flatMap((path) =>
    locales.map((locale) => ({
      url: localizedUrl(locale, path),
      alternates: {
        languages: languageAlternates(path),
      },
      ...ROUTE_SETTINGS[path],
    })),
  );

  const projectRoutes = getProjectSlugs().flatMap((slug) => {
    const path = `/projects/${slug}`;
    return locales.map((locale) => ({
      url: localizedUrl(locale, path),
      alternates: { languages: languageAlternates(path) },
      changeFrequency: "yearly" as const,
      priority: 0.7,
    }));
  });

  const patentBySlug = new Map(
    PATENTS.map((patent) => [patent.id.toLowerCase(), patent]),
  );
  const patentRoutes = getCanonicalPatentSlugs().flatMap((publication) => {
    const path = `/patents/${publication}`;
    const patent = patentBySlug.get(publication);
    return locales.map((locale) => ({
      url: localizedUrl(locale, path),
      alternates: { languages: languageAlternates(path) },
      changeFrequency: "yearly" as const,
      lastModified: patent?.date ? new Date(patent.date) : undefined,
      priority: 0.6,
    }));
  });

  return [...mainRoutes, ...projectRoutes, ...patentRoutes];
}
