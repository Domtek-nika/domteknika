import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/providers/reveal";
import { AventorWaveVisual } from "@/components/sections/aventor-wave-visual";

import styles from "./home-positioning-section.module.css";

export function HomePositioningSection() {
  const innovation = useTranslations("HomeIntro.breakthrough");

  return (
    <section
      id="breakthrough"
      aria-labelledby="positioning-title"
      className={`${styles.section} scroll-mt-28 pb-3 pt-5 sm:pb-4 sm:pt-7`}
    >
      <Container size="wide" className="max-w-[1460px] min-[1800px]:max-w-[1520px]">
        <Reveal
          minimumScrollY={24}
          className="grid items-center gap-5 py-5 motion-reduce:!transform-none motion-reduce:!opacity-100 sm:py-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.45fr)] lg:gap-9"
        >
          <div className={`${styles.copy} mx-auto w-full max-w-[680px] text-center lg:max-w-none lg:text-left`}>
            <p className="flex items-center justify-center gap-3 text-[15px] font-medium leading-none text-muted-foreground md:text-[16px] lg:justify-start min-[2400px]:gap-5 min-[2400px]:text-[26px]">
              <span className="h-[3px] w-[34px] shrink-0 bg-brand min-[2400px]:h-1 min-[2400px]:w-[74px]" aria-hidden />
              {innovation("eyebrow")}
            </p>
            <h2
              id="positioning-title"
              className="mx-auto mt-5 scroll-mt-36 text-balance text-[28px] font-extrabold leading-[1.15] text-foreground sm:mt-6 sm:text-[32px] lg:text-[36px] min-[1800px]:text-[42px]"
            >
              {innovation("title")}
              <span className="text-brand">.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[720px] text-balance text-[14px] font-medium leading-[1.5] text-muted-foreground sm:text-[15px] min-[1800px]:max-w-[820px] min-[1800px]:text-[18px]">
              {innovation("body")}
            </p>
          </div>

          <div className="-mx-4 sm:mx-auto sm:w-full sm:max-w-[880px] lg:max-w-none">
            <AventorWaveVisual alt={innovation("imageAlt")} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
