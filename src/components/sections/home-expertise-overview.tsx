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
      className="relative z-10 -mt-8 scroll-mt-28 bg-transparent py-10 sm:-mt-10 sm:py-12 md:-mt-16 lg:mt-[-192px] lg:py-14"
      aria-labelledby="capabilities-title"
    >
      <Container
        size="wide"
        className="relative z-10 max-w-[1460px] min-[1800px]:max-w-[1520px]"
      >
        <Reveal>
          <div className="overflow-hidden rounded-[18px] border border-border/80 bg-white/[0.96] shadow-[0_18px_50px_rgba(17,17,17,0.055)] sm:rounded-[10px] lg:grid lg:grid-cols-[minmax(240px,0.72fr)_minmax(0,2.28fr)]">
            <div className="border-b border-border/80 px-5 py-5 sm:px-7 sm:py-6 lg:border-b-0 lg:border-r lg:px-8 lg:py-7">
              <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.13em] text-brand sm:text-[11px] sm:tracking-[0.12em]">
                <span className="h-0.5 w-7 shrink-0 bg-brand" aria-hidden />
                {t("eyebrow")}
              </p>

              <h2
                id="capabilities-title"
                className="mt-3 max-w-[290px] whitespace-nowrap text-[clamp(24px,7.5vw,27px)] font-extrabold leading-[1.06] tracking-[-0.03em] text-foreground sm:text-[27px] sm:leading-[1.08] sm:tracking-[-0.025em]"
              >
                {t("title")}
                <span className="text-brand">.</span>
              </h2>

              <Link
                href="/expertise"
                className="group mt-5 flex w-full items-center justify-between gap-3 rounded-sm text-[10.5px] font-bold uppercase tracking-[0.08em] text-brand transition-colors duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 sm:inline-flex sm:w-fit sm:text-[11px]"
              >
                <span className="border-b border-brand pb-1">{t("cta")}</span>
                <span
                  className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand/[0.07] text-base leading-none transition-transform duration-300 group-hover:translate-x-1 sm:size-auto sm:bg-transparent"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </div>

            <div className="flex flex-col gap-0 overflow-visible p-0 sm:flex-row sm:snap-x sm:snap-mandatory sm:gap-3 sm:overflow-x-auto sm:overscroll-x-contain sm:scroll-px-4 sm:px-4 sm:py-4 sm:[scrollbar-width:none] sm:[&::-webkit-scrollbar]:hidden min-[920px]:grid min-[920px]:grid-cols-4 min-[920px]:gap-0 min-[920px]:overflow-visible min-[920px]:p-0">
              {expertiseItems.map((item) => (
                <Link
                  key={item}
                  href="/expertise"
                  aria-label={`${t("cta")} — ${t(`items.${item}.title`)}`}
                  className="group flex min-w-0 snap-none items-start gap-3.5 border-0 border-b border-border/80 bg-transparent px-5 py-3.5 transition-colors duration-300 last:border-b-0 hover:bg-brand/[0.025] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand sm:min-w-[44%] sm:snap-start sm:gap-4 sm:rounded-[14px] sm:border sm:bg-white sm:px-4 sm:py-4 sm:last:border-b min-[920px]:block min-[920px]:min-w-0 min-[920px]:snap-none min-[920px]:rounded-none min-[920px]:border-b-0 min-[920px]:border-l min-[920px]:border-r-0 min-[920px]:border-t-0 min-[920px]:bg-transparent min-[920px]:px-6 min-[920px]:py-5 min-[920px]:first:border-l-0 lg:py-6"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-[11px] bg-brand/[0.07] ring-1 ring-brand/[0.06] sm:size-11 sm:rounded-[12px] min-[920px]:size-10 min-[920px]:rounded-full min-[920px]:ring-0">
                    <Image
                      src={expertiseIcons[item]}
                      alt=""
                      width={32}
                      height={32}
                      className="size-7 object-contain"
                    />
                  </span>

                  <span className="min-w-0 flex-1 min-[920px]:block">
                    <span className="block text-[15px] font-extrabold leading-[1.2] tracking-[-0.01em] text-foreground transition-colors duration-300 group-hover:text-brand min-[920px]:mt-3">
                      {t(`items.${item}.title`)}
                    </span>
                    <span className="mt-1 block text-pretty text-[12px] font-medium leading-[1.4] text-muted-foreground sm:mt-1.5 sm:leading-[1.45]">
                      {t(`items.${item}.body`)}
                    </span>
                  </span>

                  <span
                    className="mt-1 shrink-0 text-[15px] leading-none text-brand/70 transition-transform duration-300 group-hover:translate-x-0.5 min-[920px]:hidden"
                    aria-hidden
                  >
                    →
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
