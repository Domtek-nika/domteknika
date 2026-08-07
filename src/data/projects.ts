import "server-only";

import projectsJson from "@/data/projects.generated.json";
import { locales, type Locale } from "@/i18n/routing";

import type { Project, ProjectLink } from "./project-types";

const PROJECTS_BY_LOCALE = projectsJson as Record<Locale, Project[]>;

function resolveLocale(locale: string): Locale {
  return locales.includes(locale as Locale) ? (locale as Locale) : "en";
}

export function getProjectsForLocale(
  locale: string,
  options?: { includeHidden?: boolean },
) {
  const projects = PROJECTS_BY_LOCALE[resolveLocale(locale)];
  return options?.includeHidden
    ? projects
    : projects.filter((project) => !project.hiddenFromCatalog);
}

export function getProjectBySlug(locale: string, slug: string) {
  return getProjectsForLocale(locale, { includeHidden: true }).find(
    (project) => project.id === slug.toLowerCase(),
  );
}

export function getProjectSlugs() {
  return PROJECTS_BY_LOCALE.en.map((project) => project.id);
}

export function getPatentProjectLinks(locale: string) {
  return getProjectsForLocale(locale).reduce<Record<string, ProjectLink[]>>(
    (links, project) => {
      for (const patent of project.relatedPatents ?? []) {
        (links[patent.patentId] ??= []).push({
          category: project.category,
          description: project.description,
          id: project.id,
          image: project.image,
          imageAlt: project.imageAlt,
          tags: project.tags,
          title: project.title,
        });
      }
      return links;
    },
    {},
  );
}
