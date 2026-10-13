import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
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
        <div className="grid items-center gap-5 py-5 sm:py-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.45fr)] lg:gap-9">
          <div className={`${styles.copy} mx-auto w-full max-w-[680px] text-center lg:max-w-none lg:text-left`}>
            <p className="flex items-center justify-center gap-3 font-medium text-muted-foreground lg:justify-start min-[2400px]:gap-5 domtek-type-eyebrow">
              <span className="h-[3px] w-[34px] shrink-0 bg-brand min-[2400px]:h-1 min-[2400px]:w-[74px]" aria-hidden />
              {innovation("eyebrow")}
            </p>
            <h2
              id="positioning-title"
              className="mx-auto mt-5 scroll-mt-36 text-balance font-extrabold text-foreground sm:mt-6 domtek-type-section"
            >
              {innovation("title")}
              <span className="text-brand">.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[720px] text-balance font-medium text-muted-foreground min-[1800px]:max-w-[820px] domtek-type-body">
              {innovation("body")}
            </p>
          </div>

          <div className="-mx-4 sm:mx-auto sm:w-full sm:max-w-[880px] lg:max-w-none">
            <AventorWaveVisual alt={innovation("imageAlt")} />
          </div>
        </div>
      </Container>
    </section>
  );
}
