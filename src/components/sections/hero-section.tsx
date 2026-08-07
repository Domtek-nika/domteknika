import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

function LeftHeroArrow({ className }: { className: string }) {
  return (
    <Image
      src="/assets/arrow-left-hd.webp"
      alt=""
      width={351}
      height={512}
      unoptimized
      draggable={false}
      className={className}
      aria-hidden
    />
  );
}

function RightHeroArrow({ className }: { className: string }) {
  return (
    <Image
      src="/assets/arrow-right-hd.webp"
      alt=""
      width={323}
      height={512}
      unoptimized
      draggable={false}
      className={className}
      aria-hidden
    />
  );
}

export function HeroSection() {
  const t = useTranslations("Hero");
  const shapeWords = t("shape").split(" ");
  const shapeLastWord = shapeWords.pop();
  const shapeFirstLine = shapeWords.join(" ");

  return (
    <section
      id="top"
      className="relative min-h-[680px] overflow-hidden bg-background pb-10 pt-[132px] md:min-h-[660px] md:pb-[56px] md:pt-[152px] min-[1800px]:min-h-[820px] min-[2300px]:!min-h-[840px]"
      aria-labelledby="hero-title"
    >
      <Image
        src="/assets/technical-drawing-top-2x.webp"
        alt=""
        width={2360}
        height={1532}
        quality={100}
        loading="eager"
        fetchPriority="high"
        sizes="(min-width: 2300px) 70vw, (min-width: 2200px) 72vw, (max-width: 640px) 112vw, (max-width: 767px) 96vw, (max-width: 1024px) 82vw, 56vw"
        className="pointer-events-none absolute right-[-48vw] top-[76px] z-0 h-auto w-[112vw] max-w-none opacity-[0.82] min-[390px]:right-[-50vw] min-[390px]:w-[116vw] sm:right-[-30vw] sm:top-[100px] sm:w-[96vw] md:right-[-18vw] md:top-[72px] md:w-[82vw] md:opacity-60 lg:right-0 lg:top-[82px] lg:w-[56vw] lg:max-w-[900px] min-[1800px]:right-[calc((100vw-1680px)/2-60px)] min-[1800px]:top-[96px] min-[1800px]:w-[56vw] min-[1800px]:max-w-[1260px] min-[2200px]:max-[2299px]:!right-[calc((100vw-1880px)/2-130px)] min-[2200px]:max-[2299px]:!top-[96px] min-[2200px]:max-[2299px]:!w-[60vw] min-[2200px]:max-[2299px]:!max-w-[1450px] min-[2300px]:!right-[calc((100vw-1900px)/2-110px)] min-[2300px]:!top-[96px] min-[2300px]:!w-[58vw] min-[2300px]:!max-w-[1450px]"
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-white via-white/62 to-white/8 md:via-white/76 md:to-white/16" />
      <div
        className="pointer-events-none absolute z-[1] hidden max-w-none md:bottom-[28px] md:right-[-8vw] md:top-auto md:block md:h-[520px] md:w-[74vw] md:max-w-[1040px] md:opacity-100 lg:right-[-14vw] xl:right-[-12vw] 2xl:right-[-6vw] min-[1800px]:!bottom-[36px] min-[1800px]:!right-[-5vw] min-[1800px]:!h-[620px] min-[1800px]:!max-w-[1280px] min-[2300px]:!bottom-[38px] min-[2300px]:!right-[-4vw] min-[2300px]:!h-[640px] min-[2300px]:!max-w-[1360px]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, rgb(0 0 0 / 0.12) 5%, black 16%, black 83%, rgb(0 0 0 / 0.18) 94%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, rgb(0 0 0 / 0.12) 5%, black 16%, black 83%, rgb(0 0 0 / 0.18) 94%, transparent 100%)",
        }}
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 82%, rgb(0 0 0 / 0.42) 92%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 82%, rgb(0 0 0 / 0.42) 92%, transparent 100%)",
          }}
        >
          <Image
            src="/assets/rv01-hero.png"
            alt=""
            fill
            loading="lazy"
            fetchPriority="low"
            sizes="(max-width: 1024px) 82vw, 1040px"
            className="object-contain object-bottom"
          />
          <div
            className="absolute inset-y-0 left-0 w-[20%] bg-gradient-to-r from-white via-white/80 to-transparent"
            aria-hidden
          />
          <div
            className="absolute inset-y-0 right-0 w-[18%] bg-gradient-to-l from-white via-white/75 to-transparent"
            aria-hidden
          />
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[170px] bg-gradient-to-t from-background via-background/90 to-transparent md:hidden"
        aria-hidden
      />

      <Container
        size="wide"
        className="relative z-10 min-[2400px]:!max-w-[1900px]"
      >
        <div className="w-full max-w-[620px] min-[1800px]:max-w-[760px] min-[2300px]:!max-w-[800px]">
          <div className="mb-[38px] flex items-start gap-3 text-[15px] font-medium leading-none text-muted-foreground md:mb-[52px] md:items-center md:text-[16px] min-[2400px]:!mb-[82px] min-[2400px]:!gap-5 min-[2400px]:!text-[26px]">
            <span
              className="mt-[6px] h-[3px] w-[34px] shrink-0 bg-[#e30613] md:mt-0 min-[2400px]:!h-1 min-[2400px]:!w-[74px]"
              style={{ backgroundImage: "none" }}
              aria-hidden
            />
            <span className="relative isolate min-w-0 max-w-[calc(100vw-150px)] leading-[1.2] md:max-w-none md:leading-none">
              <span
                className="pointer-events-none absolute -bottom-2 -left-2 -right-4 -top-2 z-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.92)_58%,rgba(255,255,255,0)_100%)] blur-[3px]"
                aria-hidden
              />
              <span className="relative z-10">{t("eyebrow")}</span>
            </span>
          </div>

          <div className="relative">
            <h1
              id="hero-title"
              className="domtek-text-shadow max-w-[min(100%,390px)] text-[clamp(28px,6.8vw,38px)] font-medium leading-[1.1] tracking-normal text-foreground sm:max-w-full sm:text-[42px] lg:text-[46px] 2xl:text-[48px] min-[1800px]:!text-[62px] min-[2300px]:!text-[64px]"
            >
              <span className="relative block w-fit">
                {t("engineering")}
                <span className="text-brand">.</span>
                <LeftHeroArrow className="pointer-events-none absolute left-[calc(100%+0.04em)] top-[-0.02em] block h-auto w-[0.78em] max-w-none sm:w-[0.88em] md:top-[-0.08em] md:w-[0.98em] lg:left-[calc(100%+0.08em)] lg:top-[-0.16em] lg:w-[1.08em]" />
              </span>
              <span className="block">
                {t("prototyping")}
                <span className="text-brand">.</span>
              </span>
              <span className="block">
                {t("producing")}
                <span className="text-brand">.</span>
              </span>
              <span className="relative left-1/2 mt-4 block w-max max-w-none -translate-x-1/2 whitespace-nowrap pl-0 text-center text-[clamp(24px,8.4vw,38px)] font-extrabold leading-[1.03] sm:left-auto sm:max-w-full sm:translate-x-0 sm:text-left sm:text-[42px] md:mt-6 md:pl-[52px] lg:mt-7 lg:text-[48px] 2xl:pl-[58px] 2xl:text-[50px] min-[1800px]:!mt-8 min-[1800px]:!pl-[76px] min-[1800px]:!text-[68px] min-[2300px]:!pl-[80px] min-[2300px]:!text-[70px]">
                <RightHeroArrow className="pointer-events-none absolute left-[-0.64em] top-[-0.92em] block h-auto w-[0.82em] max-w-none sm:w-[0.9em] md:left-[-0.72em] md:top-[-1.04em] md:w-[1.02em] lg:top-[calc(-0.84em-10px)] lg:w-[1.14em]" />
                <span className="text-brand">.</span>
                {shapeFirstLine}
                {shapeLastWord ? (
                  <>
                    <span> </span>
                    <span className="inline">
                      {shapeLastWord}
                      <span className="text-brand">.</span>
                    </span>
                  </>
                ) : (
                  <span className="text-brand">.</span>
                )}
              </span>
            </h1>
          </div>

          <p className="mt-8 max-w-[280px] text-[14px] font-medium leading-[1.34] text-muted-foreground min-[390px]:max-w-[320px] sm:max-w-[390px] min-[1800px]:mt-10 min-[1800px]:max-w-[580px] min-[1800px]:text-[18px] min-[2300px]:!max-w-[620px] min-[2300px]:!text-[19px]">
            {t.rich("lead", {
              brand: (chunks) => (
                <strong className="font-extrabold text-foreground underline decoration-brand decoration-[2px] underline-offset-[3px]">
                  {chunks}
                </strong>
              ),
              strong: (chunks) => (
                <strong className="font-extrabold text-foreground">
                  {chunks}
                </strong>
              ),
            })}
          </p>

          <div className="mt-10 min-[1800px]:mt-12 min-[2300px]:!mt-12">
            <Button
              nativeButton={false}
              size="lg"
              className="h-10 rounded-[7px] border-0 px-5 text-[14px] font-bold leading-none shadow-[0_4px_10px_rgba(0,0,0,0.28)] outline-none ring-0 transition-transform has-data-[icon=inline-end]:pr-5 hover:-translate-y-0.5 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-brand/35 min-[1800px]:h-[52px] min-[1800px]:px-8 min-[1800px]:text-[18px] min-[2300px]:!h-[54px] min-[2300px]:!px-8 min-[2300px]:!text-[18px]"
              render={<Link href="/contact" />}
            >
              {t("ctaPrimary")}
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
