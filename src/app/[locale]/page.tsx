import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { HeroSection } from "@/components/sections/hero-section";
import { HomeIntroductionSections } from "@/components/sections/home-introduction-sections";
import { DeferredProjectsSection } from "@/components/sections/deferred-projects-section";
import { ProcessSection } from "@/components/sections/process-section";
import { SwissBannerSection } from "@/components/sections/swiss-banner-section";
import { CtaSection } from "@/components/sections/cta-section";
import { getProjectsForLocale } from "@/data/projects";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return buildPageMetadata({
    description: t("description"),
    shareDescription: t("shareDescription"),
    shareTitle: t("title"),
    locale,
    title: t("seoTitle"),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const projects = getProjectsForLocale(locale).map(
    ({ category, description, id, image, imageAlt, tags, title }) => ({
      category,
      description,
      id,
      image,
      imageAlt,
      tags,
      title,
    }),
  );

  return (
    <>
      <HeroSection />
      <HomeIntroductionSections />
      <DeferredProjectsSection projects={projects} />
      <ProcessSection />
      <SwissBannerSection />
      <CtaSection />
    </>
  );
}
