import Image from "next/image";
import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/providers/reveal";
import { Link } from "@/i18n/navigation";

const expertiseItems = [
  "creativity",
  "prototyping",
  "simulation",
  "electronics",
] as const;

type ExpertiseKey = (typeof expertiseItems)[number];

const expertiseIcons: Record<ExpertiseKey, string> = {
  creativity: "/assets/home-expertise/creativity.png",
  prototyping: "/assets/home-expertise/prototyping.png",
  simulation: "/assets/home-expertise/simulation.png",
  electronics: "/assets/home-expertise/electronics.png",
};

export function ExpertiseOverviewSection() {
  const t = useTranslations("HomeIntro.expertise");

  return (
    <section
      id="capabilities"
      className="relative z-10 -mt-8 scroll-mt-28 bg-transparent py-10 sm:-mt-10 sm:py-12 lg:-mt-14 lg:py-14"
      aria-labelledby="capabilities-title"
    >
      <Container
        size="wide"
        className="relative z-10 max-w-[1460px] min-[1800px]:max-w-[1520px]"
      >
        <Reveal>
          <div className="overflow-hidden rounded-[8px] border border-border/80 bg-white/[0.94] shadow-[0_14px_40px_rgba(17,17,17,0.035)] backdrop-blur-[2px] lg:grid lg:grid-cols-[minmax(240px,0.72fr)_minmax(0,2.28fr)]">
            <div className="border-b border-border/80 px-6 py-6 sm:px-7 lg:border-b-0 lg:border-r lg:px-8 lg:py-7">
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.12em] text-brand">
                <span className="h-0.5 w-7 shrink-0 bg-brand" aria-hidden />
                {t("eyebrow")}
              </p>

              <h2
                id="capabilities-title"
                className="mt-3 max-w-[290px] text-balance text-[24px] font-extrabold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-[27px]"
              >
                {t("title")}
                <span className="text-brand">.</span>
              </h2>

              <Link
                href="/expertise"
                className="group mt-5 inline-flex w-fit items-center gap-3 rounded-sm text-[11px] font-bold uppercase tracking-[0.08em] text-brand transition-colors duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4"
              >
                <span className="border-b border-brand pb-1">{t("cta")}</span>
                <span
                  className="text-base leading-none transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-2 min-[920px]:grid-cols-4">
              {expertiseItems.map((item) => (
                <Link
                  key={item}
                  href="/expertise"
                  aria-label={`${t("cta")} — ${t(`items.${item}.title`)}`}
                  className="group min-w-0 border-b border-r border-border/80 px-5 py-5 transition-colors duration-300 even:border-r-0 hover:bg-brand/[0.025] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand sm:px-6 min-[920px]:border-b-0 min-[920px]:border-l min-[920px]:border-r-0 min-[920px]:first:border-l-0 lg:py-6"
                >
                  <span className="flex size-10 items-center justify-center rounded-full bg-brand/[0.07]">
                    <Image
                      src={expertiseIcons[item]}
                      alt=""
                      width={32}
                      height={32}
                      className="size-7 object-contain"
                    />
                  </span>

                  <span className="mt-3 block text-[14px] font-extrabold leading-[1.2] tracking-[-0.01em] text-foreground transition-colors duration-300 group-hover:text-brand sm:text-[15px]">
                    {t(`items.${item}.title`)}
                  </span>
                  <span className="mt-1.5 block text-pretty text-[11.5px] font-medium leading-[1.45] text-muted-foreground sm:text-[12px]">
                    {t(`items.${item}.body`)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
