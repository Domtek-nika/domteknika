import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { ProjectDetailPage } from "@/components/sections/project-detail-page";
import { getProjectBySlug, getProjectSlugs } from "@/data/projects";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata, localizedUrl, SITE_URL } from "@/lib/seo";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(locale, slug);
  if (!project) return {};

  return buildPageMetadata({
    description: project.description,
    image: project.image,
    imageAlt: project.imageAlt,
    locale,
    path: `/projects/${project.id}`,
    title: `${project.title} — DOMTEKNIKA`,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProjectBySlug(locale, slug);
  if (!project) notFound();

  const url = localizedUrl(locale as Locale, `/projects/${project.id}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: new URL(project.image, SITE_URL).toString(),
    url,
    creator: { "@id": `${SITE_URL}#organization` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ProjectDetailPage locale={locale} project={project} />
    </>
  );
}
