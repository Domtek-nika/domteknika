import Image from "next/image";
import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/providers/reveal";

export function ProcessSection() {
  const t = useTranslations("Process");

  return (
    <section
      id="expertise"
      className="scroll-mt-28 bg-white pb-7 pt-14 md:pb-16 md:pt-24 min-[1800px]:!pb-16 min-[1800px]:!pt-24 min-[2300px]:!pb-20 min-[2300px]:!pt-28"
      aria-labelledby="process-title"
    >
      <Container
        size="wide"
        className="max-w-[1400px] px-4 py-0 sm:px-6 lg:px-4 xl:px-4 min-[1800px]:!max-w-[1680px] min-[1800px]:!px-5 min-[2200px]:max-[2299px]:!max-w-[1800px] min-[2200px]:max-[2299px]:!px-4 min-[2300px]:!max-w-[1900px] min-[2300px]:!px-4"
      >
        <div className="grid gap-3 lg:grid-cols-[1.08fr_1.58fr_1.52fr] lg:items-stretch min-[1800px]:!gap-4 min-[2300px]:!gap-5">
          <Reveal
            as="article"
            className="group flex min-h-[200px] flex-col justify-start rounded-[15px] border border-border bg-white p-4 transition-shadow duration-300 hover:shadow-[0_18px_42px_rgba(0,0,0,0.07)] md:min-h-[220px] md:p-5 md:pt-6 min-[1800px]:!min-h-[260px] min-[1800px]:!rounded-[18px] min-[1800px]:!p-6 min-[2300px]:!min-h-[300px] min-[2300px]:!p-7"
          >
            <AccentLine />
            <h2 className="mt-3 text-[18px] font-extrabold leading-tight text-foreground md:text-[19px] min-[1800px]:!text-[24px] min-[2300px]:!text-[27px]">
              {t("ideaTitle")}
            </h2>
            <div className="mt-4 max-w-[390px] text-[13px] font-medium leading-[1.3] text-foreground md:text-[14px] min-[1800px]:!mt-3 min-[1800px]:max-w-[520px] min-[1800px]:!text-[16px] min-[2300px]:!text-[17px]">
              <p>{t("ideaIntro")}</p>
              <p className="mt-4 min-[1800px]:!mt-3 min-[2300px]:!mt-4">
                {t.rich("ideaBody", {
                  strong: (chunks) => (
                    <strong className="font-extrabold">{chunks}</strong>
                  ),
                })}
              </p>
            </div>
          </Reveal>

          <Reveal
            as="article"
            delay={0.08}
            className="group relative z-20 my-0 min-h-[210px] overflow-hidden rounded-[15px] bg-brand p-4 text-white transition-shadow duration-300 md:aspect-[1.75] md:min-h-[250px] md:p-6 lg:min-h-[220px] lg:p-5 lg:pt-6 lg:shadow-[0_24px_42px_rgba(0,0,0,0.24)] lg:hover:shadow-[0_34px_70px_rgba(0,0,0,0.28)] min-[1800px]:!rounded-[18px] min-[1800px]:!p-6 min-[2300px]:!p-7"
          >
            <div className="grid h-full grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-stretch gap-2 sm:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] sm:gap-3 md:grid-cols-[0.72fr_1.28fr] lg:grid-cols-[0.82fr_1.38fr] min-[1800px]:!gap-3 min-[2300px]:!gap-4">
              <div>
                <AccentLine light />
                <h2
                  id="process-title"
                  className="mt-3 text-[20px] font-extrabold leading-tight md:text-[22px] lg:text-[20px] min-[1800px]:!text-[26px] min-[2300px]:!text-[29px]"
                >
                  {t("processTitle")}
                </h2>
                <p className="mt-4 text-[13px] font-medium leading-[1.28] md:text-[15px] lg:text-[13px] min-[1800px]:!mt-3 min-[1800px]:!text-[16px] min-[2300px]:!mt-4 min-[2300px]:!text-[17px]">
                  {t("processBody")}
                </p>
              </div>

              <div className="relative h-full min-h-[180px] border-l border-white/70 sm:min-h-[190px] lg:min-h-[150px] min-[1800px]:!min-h-[180px] min-[2300px]:!min-h-[200px]">
                <div className="absolute inset-y-0 left-3 right-0 sm:left-4 md:left-5 lg:left-6 xl:left-5 min-[1800px]:!left-7 min-[2300px]:!left-8">
                  <ProcessDiagram />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal
            as="article"
            delay={0.16}
            className="group min-h-[210px] overflow-hidden rounded-[15px] border border-border bg-white transition-shadow duration-300 hover:shadow-[0_18px_42px_rgba(0,0,0,0.07)] md:min-h-[220px] min-[1800px]:!min-h-[260px] min-[1800px]:!rounded-[18px] min-[2300px]:!min-h-[300px]"
          >
            <div className="grid h-full grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:flex lg:min-h-[inherit] lg:flex-col lg:justify-between">
              <div className="px-4 pb-4 pt-4 md:px-5 md:pt-6 lg:pb-0 min-[1800px]:!px-6 min-[1800px]:!pt-6 min-[2300px]:!px-7 min-[2300px]:!pt-7">
                <AccentLine />
                <h2 className="mt-3 text-[18px] font-extrabold leading-tight text-foreground md:text-[19px] min-[1800px]:!text-[24px] min-[2300px]:!text-[27px]">
                  {t("productTitle")}
                </h2>
                <p className="mt-4 text-left text-[13px] font-medium leading-[1.3] text-foreground md:text-[14px] lg:mt-3 lg:max-w-[760px] min-[1800px]:!text-[16px] min-[2300px]:!mt-4 min-[2300px]:!text-[17px]">
                  {t("productBody")}
                </p>
              </div>

              <div className="flex min-w-0 flex-col border-l border-border lg:flex-1 lg:border-l-0">
                <div className="relative grid h-full grid-rows-3 bg-white before:absolute before:left-3 before:right-3 before:top-0 before:hidden before:h-px before:bg-border sm:before:left-4 sm:before:right-4 lg:mt-auto lg:h-auto lg:grid-cols-3 lg:grid-rows-none lg:before:left-5 lg:before:right-5 lg:before:block">
                  <Stat
                    centerOnDesktop
                    label={t("stats.years.label")}
                    value={t("stats.years.value")}
                  />
                  <Stat
                    label={t("stats.sectors.label")}
                    value={t("stats.sectors.value")}
                    divider
                  />
                  <Stat
                    label={t("stats.swiss.label")}
                    value={t("stats.swiss.value")}
                    withFlag
                    divider
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

const processSteps = [
  { label: "Creativity Session", top: "15.9%" },
  { label: "Patents Research", top: "28.3%" },
  { label: "Concept Design", top: "40.8%" },
  { label: "Prototyping", top: "53.2%" },
  { label: "Testing & validation", top: "65.7%" },
] as const;

function ProcessDiagram() {
  return (
    <div className="flex h-full items-center justify-center" aria-hidden>
      <div
        className="relative h-full max-w-full origin-center aspect-[334/370] scale-[0.96] sm:scale-[1.1] md:scale-[1.2] lg:scale-[1.18] xl:-translate-x-2.5 xl:scale-[1.22] min-[1800px]:!scale-[1.22] min-[2300px]:!scale-[1.24]"
        style={{ containerType: "size" }}
      >
        <Image
          src="/assets/schema-process.svg"
          alt=""
          fill
          unoptimized
          sizes="(min-width: 2300px) 430px, (min-width: 1800px) 390px, (min-width: 1280px) 280px, 45vw"
          className="object-contain"
        />

        <span className="absolute left-[8.7%] top-[13.2%] whitespace-nowrap text-[clamp(9px,5.4cqh,24px)] font-extrabold leading-none tracking-[-0.025em] text-white">
          IDEA
        </span>

        {processSteps.map((step) => (
          <span
            key={step.label}
            className="absolute left-[67.7%] whitespace-nowrap text-[5.5px] font-semibold leading-none tracking-[-0.02em] text-white sm:text-[7.5px] md:text-[15px] lg:text-[9px] xl:text-[10px] min-[1800px]:!text-[12px] min-[2300px]:!text-[14px]"
            style={{ top: step.top }}
          >
            {step.label}
          </span>
        ))}

        <span className="absolute left-[8.4%] top-[84.1%] whitespace-nowrap text-[clamp(9px,5.4cqh,24px)] font-extrabold leading-none tracking-[-0.025em] text-white">
          PRODUCT
        </span>
      </div>
    </div>
  );
}

function AccentLine({ light }: { light?: boolean }) {
  return (
    <span
      aria-hidden
      className={`block h-[3px] w-8 transition-[width] duration-300 group-hover:w-16 ${
        light ? "bg-white" : "bg-brand"
      }`}
    />
  );
}

function Stat({
  value,
  label,
  withFlag,
  divider,
  centerOnDesktop,
}: {
  value: string;
  label: string;
  withFlag?: boolean;
  divider?: boolean;
  centerOnDesktop?: boolean;
}) {
  return (
    <div
      className={`relative flex min-h-[58px] items-center px-4 py-2.5 lg:block lg:min-h-[72px] lg:border-t-0 lg:px-3 lg:py-2 xl:px-3 min-[1800px]:min-h-[84px] min-[1800px]:px-5 min-[1800px]:py-3 min-[2300px]:!min-h-[88px] min-[2300px]:!px-5 min-[2300px]:!py-3 ${
        divider
          ? "border-t border-border lg:border-t-0 lg:before:absolute lg:before:bottom-4 lg:before:left-0 lg:before:top-4 lg:before:w-px lg:before:bg-border"
          : ""
      }`}
    >
      <div
        className={`flex w-full items-center justify-between gap-4 ${
          centerOnDesktop ? "lg:-translate-x-3 lg:justify-center" : "lg:block"
        }`}
      >
        <div className="lg:pt-3 min-[1800px]:!pt-4">
          <strong className="block text-[18px] font-extrabold leading-[1.08] text-brand lg:text-[18px] xl:text-[19px] min-[1800px]:text-[27px] min-[2300px]:!text-[29px]">
            {value}
          </strong>
          <span className="mt-0.5 block text-[12px] font-normal leading-[1.12] text-brand lg:mt-1 lg:text-[11px] xl:text-[12px] min-[1800px]:text-[15px] min-[2300px]:!text-[16px]">
            {label}
          </span>
        </div>
        {withFlag && (
          <Image
            src="/assets/flag-switzerland.webp"
            alt=""
            width={37}
            height={37}
            className="size-7 shrink-0 lg:absolute lg:right-3 lg:top-2 lg:size-7 min-[1800px]:!right-5 min-[1800px]:!top-3 min-[1800px]:!size-[32px] min-[2300px]:!right-5 min-[2300px]:!size-[34px]"
          />
        )}
      </div>
    </div>
  );
}
