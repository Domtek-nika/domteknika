// Links are shared by service pages, project pages, the expertise grid and sitemap.
// Project associations use the documented scope in projects.generated.json.
export const services = [
  { slug: "mechanical-design", key: "design", projects: ["velum-sky-screen", "flex-drill", "filter-carafe"] },
  { slug: "prototyping", key: "prototyping", projects: ["aventor", "biome-staple-applicator", "glove-helmet-dryer"] },
  { slug: "simulation", key: "simulation", projects: ["acetabular-reamer-holder", "bottom-filling-cup"] },
  { slug: "electronics-integration", key: "electronics", projects: ["aventor", "transparent-clock", "angel-interceptor"] },
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
