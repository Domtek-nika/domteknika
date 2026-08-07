import Image from "next/image";
import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/providers/reveal";
import { ExpertiseOverviewSection } from "@/components/sections/home-expertise-overview";

const SHOW_BREAKTHROUGH_SECTION = false;

export function HomeIntroductionSections() {
  return (
    <div className="relative isolate overflow-hidden bg-[#fefefe]">
      {SHOW_BREAKTHROUGH_SECTION ? (
        <>
          <div
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
            aria-hidden
          >
            <div className="absolute inset-0 hidden -translate-y-[15%] lg:block">
              <Image
                src="/assets/breakthrough/aventor-breakthrough-elastic-transformation-wide-v156.png"
                alt=""
                fill
                sizes="100vw"
                unoptimized
                className="object-contain object-top"
              />
            </div>

            <div className="absolute right-0 top-[330px] aspect-[5292/2160] w-[125vw] sm:top-[250px] sm:w-[min(100%,900px)] md:inset-x-0 md:-top-[9vw] md:h-[520px] md:w-full md:aspect-auto lg:hidden">
              <Image
                src="/assets/breakthrough/aventor-breakthrough-elastic-transformation-v155.png"
                alt=""
                fill
                sizes="(max-width: 767px) 100vw, 115vw"
                unoptimized
                className="object-contain object-top"
              />
            </div>

            <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,#fefefe_0%,rgba(254,254,254,0.98)_34%,rgba(254,254,254,0.72)_45%,rgba(254,254,254,0)_58%)] md:block lg:hidden" />
          </div>
          <BreakthroughSection />
        </>
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
      className="relative z-10 isolate flex min-h-[560px] items-start overflow-visible border-t border-border/60 bg-transparent py-12 sm:min-h-[520px] sm:py-14 md:min-h-[400px] md:items-center lg:min-h-[430px] lg:py-16"
      aria-labelledby="breakthrough-title"
    >
      <Container size="wide">
        <div className="relative z-20">
          <Reveal className="max-w-[340px] sm:max-w-[400px] lg:max-w-[440px]">
            <span
              className="block h-[3px] w-[34px] bg-brand"
              aria-hidden
            />
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
