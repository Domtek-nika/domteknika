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
