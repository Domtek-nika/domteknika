import Image from "next/image";
import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/providers/reveal";
import { ExpertiseOverviewSection } from "@/components/sections/home-expertise-overview";

const SHOW_BREAKTHROUGH_SECTION = true;
const BREAKTHROUGH_IMAGE =
  "/assets/breakthrough/aventor-breakthrough-original-lettering-thin-e-fix-v197.png";

export function HomeIntroductionSections() {
  return (
    <div className="relative isolate overflow-hidden bg-[#fefefe]">
      {SHOW_BREAKTHROUGH_SECTION ? (
        <BreakthroughSection />
      ) : null}
      <ExpertiseOverviewSection />
    </div>
  );
}

function BreakthroughSection() {
  const t = useTranslations("HomeIntro.breakthrough");

  return (
    <section
      id="breakthrough"
      className="relative z-10 isolate mt-4 flex min-h-[340px] items-start overflow-hidden border-t border-border/60 bg-transparent py-12 sm:mt-6 sm:min-h-[360px] sm:py-14 md:min-h-[420px] md:items-center lg:mt-8 lg:min-h-[560px] lg:py-16"
      aria-labelledby="breakthrough-title"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden lg:block"
        aria-hidden
      >
        <Container size="wide" className="relative h-full">
          <div className="absolute left-[420px] top-[calc(50%-27px)] aspect-[1672/941] w-[clamp(768px,75vw,1030px)] -translate-y-1/2">
            <Image
              src={BREAKTHROUGH_IMAGE}
              alt=""
              fill
              sizes="(min-width: 1374px) 1030px, 75vw"
              unoptimized
              className="object-contain object-left"
            />
          </div>
        </Container>
      </div>
      <Container size="wide">
        <div className="relative z-20 lg:-translate-y-10">
          <Reveal className="max-w-[340px] sm:max-w-[400px] lg:max-w-[440px]">
            <span
              className="block h-[3px] w-[34px] bg-brand"
              aria-hidden
            />
            <h2
              id="breakthrough-title"
              className="mt-2.5 max-w-[390px] text-[34px] font-extrabold leading-[1.02] tracking-[-0.035em] text-foreground sm:text-[38px] lg:text-[42px]"
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
