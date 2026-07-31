import Image from "next/image";
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

type ExpertiseKey = (typeof expertiseItems)[number];

const expertiseCategories: Record<ExpertiseKey, string> = {
  creativity: "R&D",
  design: "Engineering",
  prototyping: "Validation",
  simulation: "CAD & FEA",
  polymer: "Materials",
  electronics: "Embedded systems",
};

const expertiseIcons: Record<ExpertiseKey, string> = {
  creativity: "/assets/home-expertise/creativity.png",
  design: "/assets/home-expertise/design.png",
  prototyping: "/assets/home-expertise/prototyping.png",
  simulation: "/assets/home-expertise/simulation.png",
  polymer: "/assets/home-expertise/polymer.png",
  electronics: "/assets/home-expertise/electronics.png",
};

export function ExpertiseOverviewSection() {
  const t = useTranslations("HomeIntro.expertise");
  const expertiseT = useTranslations("ExpertisePage.Services");
  const title = t("title");
  const titlePunctuation = title.endsWith("。")
    ? "。"
    : title.endsWith(".")
      ? "."
      : "";
  const titleText = titlePunctuation ? title.slice(0, -1) : title;

  return (
    <section
      id="capabilities"
      className="relative scroll-mt-28 bg-transparent pb-12 pt-20 sm:pb-14 sm:pt-24 lg:pb-16 lg:pt-20"
      aria-labelledby="capabilities-title"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden lg:block"
        aria-hidden
      >
        <Image
          src="/assets/home-expertise/technical-mesh.png"
          alt=""
          width={1000}
          height={667}
          sizes="(min-width: 1800px) 980px, (min-width: 1280px) 860px, 720px"
          className="absolute -bottom-10 -left-8 w-[720px] brightness-0 opacity-[0.1] xl:w-[860px] min-[1800px]:w-[980px]"
        />
        <Image
          src="/assets/home-expertise/fracture-continuation.png"
          alt=""
          width={1000}
          height={667}
          sizes="(min-width: 1800px) 1080px, (min-width: 1280px) 900px, 760px"
          className="absolute -left-[180px] top-[320px] w-[760px] opacity-[0.82] xl:-left-[220px] xl:w-[900px] min-[1800px]:-left-[260px] min-[1800px]:top-[350px] min-[1800px]:w-[1080px]"
        />
      </div>

      <Container
        size="wide"
        className="relative z-10 max-w-[1460px] min-[1800px]:max-w-[1520px]"
      >
        <div className="grid gap-9 lg:grid-cols-[minmax(260px,0.66fr)_minmax(0,1.34fr)] lg:gap-14 xl:gap-16">
          <Reveal>
            <div className="max-w-[370px]">
              <p className="flex items-center gap-4 text-[13px] font-semibold uppercase tracking-[0.11em] text-brand">
                <span className="h-0.5 w-9 shrink-0 bg-brand" aria-hidden />
                {t("eyebrow")}
              </p>

              <h2
                id="capabilities-title"
                className="mt-4 max-w-[410px] text-balance text-[30px] font-extrabold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-[34px] lg:text-[40px] xl:text-[44px]"
              >
                {titleText}
                <span className="text-brand">{titlePunctuation}</span>
              </h2>

              <span
                className="mt-6 block h-0.5 w-8 bg-brand"
                aria-hidden
              />

              <p className="mt-6 max-w-[350px] text-pretty text-[14px] font-medium leading-[1.7] text-muted-foreground xl:text-[14.5px]">
                {t("body")}
              </p>

              <Link
                href="/expertise"
                className="group mt-8 inline-flex w-fit items-center gap-7 rounded-sm border-b border-brand pb-2.5 text-[12px] font-bold uppercase tracking-[0.08em] text-brand transition-colors duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4"
              >
                <span>{t("cta")}</span>
                <span
                  className="text-lg leading-none text-brand transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-4 min-[560px]:grid-cols-2">
            {expertiseItems.map((item, index) => (
              <Reveal
                as="article"
                key={item}
                delay={index * 0.04}
                className="min-w-0"
              >
                <Link
                  href="/expertise"
                  aria-label={`${t("cta")} — ${expertiseT(`items.${item}.title`)}`}
                  className="group relative grid min-h-[168px] grid-cols-[50px_minmax(0,1fr)] gap-4 rounded-[7px] border border-border/80 bg-white/95 px-5 py-5 pr-11 transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-brand/25 hover:shadow-[0_14px_34px_rgba(17,17,17,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 sm:min-h-[178px] sm:grid-cols-[54px_minmax(0,1fr)] sm:gap-5 sm:px-6 sm:py-6 sm:pr-12 xl:min-h-[205px] xl:grid-cols-[56px_minmax(0,1fr)] xl:px-6 xl:py-6 xl:pr-12"
                >
                  <span className="flex size-[50px] items-center justify-center rounded-full bg-brand/[0.07] sm:size-[54px] xl:size-14">
                    <Image
                      src={expertiseIcons[item]}
                      alt=""
                      width={38}
                      height={38}
                      className="size-[34px] object-contain sm:size-[38px] xl:size-10"
                    />
                  </span>

                  <span className="min-w-0">
                    <span className="flex items-center gap-2.5 text-[10px] font-semibold uppercase italic tracking-[0.14em] text-brand">
                      <span
                        className="size-1.5 shrink-0 rounded-full bg-brand"
                        aria-hidden
                      />
                      {expertiseCategories[item]}
                    </span>

                    <span className="mt-3 block text-[16px] font-extrabold leading-[1.2] tracking-[-0.01em] text-foreground transition-colors duration-300 group-hover:text-brand sm:text-[17px] xl:text-[18px]">
                      {expertiseT(`items.${item}.title`)}
                    </span>
                    <span className="mt-2.5 block max-w-[24rem] text-pretty text-[12.5px] font-medium leading-[1.5] text-muted-foreground xl:mt-3 xl:text-[13.5px] xl:leading-[1.55]">
                      {t(`items.${item}.body`)}
                    </span>
                  </span>

                  <span
                    className="absolute bottom-4 right-5 text-xl leading-none text-brand transition-transform duration-300 group-hover:translate-x-1 sm:bottom-5 xl:right-6"
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
