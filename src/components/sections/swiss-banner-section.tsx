import Image from "next/image";
import { CirclePlus, Gauge, Handshake, LockKeyhole } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/providers/reveal";

const VALUES = [
  { key: "swissQuality", Icon: CirclePlus },
  { key: "endToEnd", Icon: Handshake },
  { key: "agile", Icon: Gauge },
  { key: "confidential", Icon: LockKeyhole },
] as const;

export function SwissBannerSection() {
  const t = useTranslations("SwissBanner");

  return (
    <section className="relative min-h-[130px] overflow-hidden bg-alps md:min-h-[160px] lg:min-h-[190px] min-[1800px]:min-h-[300px] min-[2300px]:!min-h-[320px]">
      <Image
        src="/assets/alps-background.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover lg:object-top"
      />

      <div
        className="absolute inset-y-0 left-0 w-2/3"
        style={{
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, black 58%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, black 0%, black 58%, transparent 100%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0,70,145,0.49) 0%, rgba(0,39,61,0) 100%)",
        }}
        aria-hidden
      />

      <Container
        size="wide"
        className="relative z-10 flex min-h-[130px] max-w-none items-center justify-start px-5 py-2 text-left sm:px-8 md:min-h-[160px] md:px-10 md:py-3 lg:min-h-[190px] lg:px-12 lg:py-4 min-[1800px]:min-h-[300px] min-[1800px]:max-w-none min-[1800px]:!px-20 min-[1800px]:!py-7 min-[2300px]:!min-h-[320px] min-[2300px]:!px-24 min-[2300px]:!py-8"
      >
        <Reveal initiallyHidden className="flex w-full max-w-[1080px] items-center justify-start gap-4 text-left md:gap-6 min-[1800px]:!max-w-[1320px] min-[1800px]:!gap-8 min-[2300px]:!max-w-[1400px]">
          <Image
            src="/assets/flag-switzerland.webp"
            alt=""
            width={88}
            height={88}
            className="size-8 shrink-0 object-contain md:size-11 lg:size-12 min-[1800px]:size-[72px] min-[2300px]:!size-[76px]"
          />

          <div className="min-w-0 flex-1 text-left">
            <h2 className="max-w-[500px] text-left text-[14px] font-extrabold uppercase leading-[1.08] tracking-wide text-white [text-wrap:balance] md:text-[17px] md:leading-[1.12] lg:text-[20px] min-[1800px]:!max-w-[760px] min-[1800px]:!text-[32px] min-[2300px]:!max-w-[820px] min-[2300px]:!text-[34px]">
              {t("titleLineOne")}
              <br />
              {t("titleLineTwo")}
            </h2>

            <div className="mt-2 grid w-full max-w-[560px] grid-cols-2 text-left md:mt-3 md:max-w-[640px] lg:mt-4 lg:max-w-[780px] lg:grid-cols-4 min-[1800px]:!mt-4 min-[1800px]:!max-w-[920px] min-[2300px]:!max-w-[960px]">
              {VALUES.map((value, index) => (
                <div
                  key={value.key}
                  className={`relative grid min-w-0 grid-cols-[24px_minmax(0,1fr)] items-center gap-2 px-2 py-1.5 text-left md:grid-cols-[28px_minmax(0,1fr)] md:gap-2.5 md:px-3 md:py-2 lg:grid-cols-[30px_minmax(0,1fr)] lg:py-1 min-[1800px]:!grid-cols-[38px_minmax(0,1fr)] min-[1800px]:!gap-3 min-[1800px]:!px-4 ${
                    index >= 2
                      ? "border-t border-white/45 lg:border-t-0"
                      : ""
                  }`}
                >
                  {index > 0 && (
                    <span
                      className={`${index % 2 === 1 ? "block" : "hidden"} absolute left-0 top-1/2 h-[58%] w-px -translate-y-1/2 rounded-full bg-white/75 lg:block lg:h-[64%]`}
                      aria-hidden
                    />
                  )}
                  <value.Icon
                    aria-hidden
                    strokeWidth={1.8}
                    className="size-5 justify-self-center text-brand md:size-6 lg:size-7 min-[1800px]:size-[34px] min-[2300px]:!size-9"
                  />
                  <strong className="min-w-0 text-left text-[9.5px] font-extrabold leading-[1.2] text-white md:text-[11px] lg:whitespace-nowrap lg:text-[10.5px] min-[1800px]:text-[12px] min-[2300px]:!text-[13px]">
                    {t(`values.${value.key}` as never)}
                  </strong>
                  {index === VALUES.length - 1 && (
                    <span className="sr-only">{t("end")}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
