import type { Project, ProjectSectorKey } from "./project-types";

export type ProjectIconKey =
  | "Box"
  | "ShieldCheck"
  | "Target"
  | "Globe2"
  | "CalendarDays"
  | "CarFront"
  | "HousePlug"
  | "HeartPulse"
  | "Watch"
  | "Building2"
  | "Dumbbell"
  | "Shapes";
export type FilterKey = "all" | ProjectSectorKey;
export type ProjectSortKey =
  | "default"
  | "date-desc"
  | "date-asc"
  | "title-asc"
  | "title-desc";
export type ProjectsLocale = "en" | "fr" | "de" | "es" | "ko" | "zh" | "ja";
export type ProjectStat = {
  label: string;
  value: string;
  detail?: string;
  icon: ProjectIconKey;
};
export type ProjectFilterOption = {
  key: FilterKey;
  label: string;
  icon?: ProjectIconKey;
};
export type ProjectSortOption = {
  key: ProjectSortKey;
  label: string;
};
export type ProjectsPageCopy = {
  hero: {
    eyebrow: string;
    title: string;
    strong: string;
    rest: string;
    lead: string;
  };
  filters: ProjectFilterOption[];
  featuredProject: Project;
  projects: Project[];
  stats: ProjectStat[];
  statsLabel: string;
  selectedTitle: string;
  resultsLabel: string;
  filtersLabel: string;
  sort: {
    label: string;
    options: ProjectSortOption[];
  };
  searchLabel: string;
  searchPlaceholder: string;
  noResults: string;
  featuredLabel: string;
  viewCaseStudy: string;
  cardOpenDetails: string;
  modal: {
    close: string;
    openImage: string;
    closeImage: string;
    previousImage: string;
    nextImage: string;
    gallery: string;
    overview: string;
    scope: string;
    tags: string;
    relatedPatents: string;
    area: string;
    focus: string;
    output: string;
    design: string;
    prototype: string;
    openFullPage: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    bodyStrong: string;
    body: string;
    button: string;
    subject: string;
  };
};
export type ProjectModalCopy = ProjectsPageCopy["modal"];
export function resolveProjectsLocale(locale: string): ProjectsLocale {
  return ["en", "fr", "de", "es", "ko", "zh", "ja"].includes(locale)
    ? (locale as ProjectsLocale)
    : "en";
}

export function getProjectGallery(project: Project) {
  const gallery = project.gallery ?? [];
  const images = gallery.includes(project.image)
    ? gallery
    : [project.image, ...gallery];
  return images.length > 0 ? images : [project.image];
}
