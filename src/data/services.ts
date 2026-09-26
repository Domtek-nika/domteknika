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

// Further reading supports the explanations; it does not describe tools used by DOMTEKNIKA.
export const serviceReferences: Record<ServiceSlug, { title: string; url: string }> = {
  "creativity-innovation": {
    title: "Design Council · Double Diamond",
    url: "https://www.designcouncil.org.uk/resources/the-double-diamond/",
  },
  "mechanical-design": {
    title: "Autodesk · Tolerance Analysis",
    url: "https://www.autodesk.com/support/technical/article/caas/tsarticles/ts/63R3AYMja3Hl07cLHP5GMg.html",
  },
  prototyping: {
    title: "Formlabs · Guide to Rapid Prototyping",
    url: "https://formlabs.com/blog/ultimate-guide-to-rapid-prototyping/",
  },
  simulation: {
    title: "COMSOL · Singularities in Finite Element Models",
    url: "https://www.comsol.com/blogs/singularities-in-finite-element-models-dealing-with-red-spots",
  },
  "polymer-injection": {
    title: "Protolabs · Injection Molding Basics",
    url: "https://www.protolabs.com/resources/design-tips/injection-molding-basics/",
  },
  "electronics-integration": {
    title: "Texas Instruments · PCB Thermal Calculator",
    url: "https://www.ti.com/design-development/design-simulation-tools/pcb-thermal-calculator.html",
  },
};

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
