import { setRequestLocale } from "next-intl/server";

import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ProcessSection } from "@/components/sections/process-section";
import { SwissBannerSection } from "@/components/sections/swiss-banner-section";
import { CtaSection } from "@/components/sections/cta-section";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <ProcessSection />
      <SwissBannerSection />
      <CtaSection />
    </>
  );
}
