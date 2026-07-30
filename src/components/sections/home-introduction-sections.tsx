import Image from "next/image";
import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/providers/reveal";
import { ExpertiseOverviewSection } from "@/components/sections/home-expertise-overview";

export function HomeIntroductionSections() {
  return (
    <>
      <BreakthroughSection />
      <ExpertiseOverviewSection />
    </>
  );
}

function BreakthroughSection() {
  const t = useTranslations("HomeIntro.breakthrough");

  return (
    <section
      id="breakthrough"
      className="relative isolate flex min-h-[390px] items-center overflow-hidden border-t border-border/60 bg-background py-12 sm:min-h-[360px] sm:py-14 lg:min-h-[380px] lg:py-16"
      aria-labelledby="breakthrough-title"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <Image
          src="/assets/breakthrough/breakthrough-fracture.png"
          alt=""
          fill
          sizes="100vw"
          unoptimized
          className="object-cover object-[68%_center] sm:object-[62%_center] lg:object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.94)_48%,rgba(255,255,255,0.28)_78%,rgba(255,255,255,0.04)_100%)] sm:bg-[linear-gradient(90deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.9)_42%,rgba(255,255,255,0.12)_72%,rgba(255,255,255,0)_100%)]" />
      </div>

      <Container size="wide">
        <div className="relative z-20">
          <Reveal className="max-w-[340px] sm:max-w-[400px] lg:max-w-[440px]">
            <div className="flex items-center gap-3" aria-hidden>
              <span className="block h-0.5 w-7 bg-brand" />
              <span className="block size-1 rotate-45 border border-brand/70" />
              <span className="block h-px w-8 bg-foreground/15" />
            </div>
            <h2
              id="breakthrough-title"
              className="mt-4 max-w-[390px] text-[34px] font-extrabold leading-[1.02] tracking-[-0.035em] text-foreground sm:text-[38px] lg:text-[42px]"
            >
              {t("eyebrow")}
              <span className="text-brand">.</span>
            </h2>
            <p className="mt-3 max-w-[380px] text-[15px] font-semibold leading-[1.3] text-foreground sm:text-[16px]">
              {t("title")}
              <span className="text-brand">.</span>
            </p>
            <p className="mt-4 max-w-[370px] border-l-2 border-brand pl-4 text-[13px] font-medium leading-[1.5] text-muted-foreground sm:text-[13.5px]">
              {t("body")}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
