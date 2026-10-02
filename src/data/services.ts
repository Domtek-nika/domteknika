// Links are shared by service pages, project pages, the expertise grid and sitemap.
// Project associations use the documented scope in projects.generated.json.
export const services = [
  { slug: "creativity-innovation", key: "creativity", projects: ["filter-carafe", "eternal-watch", "folding-umbrella"] },
  { slug: "mechanical-design", key: "design", projects: ["velum-sky-screen", "flex-drill", "filter-carafe"] },
  { slug: "prototyping", key: "prototyping", projects: ["aventor", "biome-staple-applicator", "glove-helmet-dryer"] },
  { slug: "simulation", key: "simulation", projects: ["acetabular-reamer-holder", "kitesurf-safety", "bottom-filling-cup"] },
  { slug: "polymer-injection", key: "polymer", projects: ["biome-staple-applicator", "stajvelo-rv01", "acetabular-reamer-holder"] },
  { slug: "electronics-integration", key: "electronics", projects: ["transparent-clock", "aventor", "totalcar-concept"] },
] as const;

export type ServiceSlug = (typeof services)[number]["slug"];

// Select the documented contribution that matches the service, in every locale.
const projectScopeIndices: Partial<Record<ServiceSlug, Readonly<Record<string, number>>>> = {
  "mechanical-design": { "flex-drill": 1 },
  prototyping: { "biome-staple-applicator": 1, "glove-helmet-dryer": 2 },
  simulation: { "kitesurf-safety": 1, "bottom-filling-cup": 2 },
  "polymer-injection": { "acetabular-reamer-holder": 1 },
  "electronics-integration": { "totalcar-concept": 1 },
};

export function getServiceProjectScopeIndex(slug: ServiceSlug, projectId: string) {
  return projectScopeIndices[slug]?.[projectId] ?? 0;
}

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getServicePath(key: string) {
  const service = services.find((candidate) => candidate.key === key);
  return service ? `/expertise/${service.slug}` : "/expertise";
}

export function getProjectServices(projectId: string) {
  return services.filter((service) =>
    (service.projects as readonly string[]).includes(projectId),
  );
}
