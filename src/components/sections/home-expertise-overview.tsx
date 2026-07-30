import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/providers/reveal";
import { Link } from "@/i18n/navigation";

const expertiseItems = [
  "creativity",
  "design",
  "prototyping",
  "simulation",
  "polymer",
  "electronics",
] as const;

export function ExpertiseOverviewSection() {
  const t = useTranslations("HomeIntro.expertise");
  const expertiseT = useTranslations("ExpertisePage.Services");

  return (
    <section
      id="capabilities"
      className="relative scroll-mt-28 bg-background pb-12 pt-20 sm:pb-14 sm:pt-24 lg:pb-16 lg:pt-24"
      aria-labelledby="capabilities-title"
    >
      <Container size="wide">
        <div className="grid gap-9 lg:grid-cols-[minmax(260px,0.62fr)_minmax(0,1.38fr)] lg:gap-14 xl:gap-20">
          <Reveal>
            <div className="max-w-[410px]">
              <p className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.11em] text-muted-foreground">
                <span className="h-0.5 w-8 shrink-0 bg-brand" aria-hidden />
                {t("eyebrow")}
              </p>

              <h2
                id="capabilities-title"
                className="mt-3 max-w-[460px] text-balance text-[28px] font-extrabold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-[31px] lg:text-[34px]"
              >
                {t("title")}
              </h2>

              <p className="mt-4 max-w-[390px] text-pretty text-[13.5px] font-medium leading-[1.5] text-muted-foreground sm:text-[14px]">
                {t("body")}
              </p>

              <Link
                href="/expertise"
                className="group mt-5 inline-flex w-fit items-center gap-3 rounded-sm text-[13px] font-bold text-foreground transition-colors duration-300 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4"
              >
                <span className="border-b-2 border-brand pb-1">{t("cta")}</span>
                <span
                  className="text-base leading-none text-brand transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </div>
          </Reveal>

          <div className="grid border-t border-foreground/20 min-[540px]:grid-cols-2">
            {expertiseItems.map((item, index) => (
              <Reveal
                as="article"
                key={item}
                delay={index * 0.04}
                className="group relative border-b border-foreground/15 py-4 min-[540px]:min-h-[104px] min-[540px]:px-5 min-[540px]:even:border-l min-[540px]:odd:pl-0 min-[540px]:even:pr-0"
              >
                <span
                  className="absolute -top-px left-0 h-px w-0 bg-brand transition-[width] duration-300 ease-out group-hover:w-8 min-[540px]:group-even:left-5"
                  aria-hidden
                />

                <div className="grid grid-cols-[24px_minmax(0,1fr)] gap-2.5">
                  <span className="pt-0.5 text-[10px] font-bold tabular-nums text-brand">
                    0{index + 1}
                  </span>

                  <div>
                    <h3 className="text-[15px] font-extrabold leading-[1.2] tracking-[-0.01em] text-foreground transition-colors duration-300 group-hover:text-brand sm:text-[16px]">
                      {expertiseT(`items.${item}.title`)}
                    </h3>
                    <p className="mt-1.5 max-w-[22rem] text-pretty text-[12.5px] font-medium leading-[1.4] text-muted-foreground">
                      {t(`items.${item}.body`)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
