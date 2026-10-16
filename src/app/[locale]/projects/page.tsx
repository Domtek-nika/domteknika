import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import {
  ProjectsPageContent,
  ProjectsPageCta,
} from "@/components/sections/projects-page-content";
import { buildPageMetadata } from "@/lib/seo";
import { getPreparedProjectsPageCopy } from "@/data/project-page-copy";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ProjectsPage.Meta" });

  return buildPageMetadata({
    description: t("description"),
    locale,
    path: "/projects",
    title: t("title"),
  });
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = getPreparedProjectsPageCopy(locale);

  return (
    <>
      <ProjectsPageContent locale={locale} copy={copy} />
      <ProjectsPageCta copy={copy.cta} />
    </>
  );
}
