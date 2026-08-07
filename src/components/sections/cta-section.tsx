"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/providers/reveal";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export function CtaSection() {
  const t = useTranslations("Cta");

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-white py-20 md:min-h-[320px] md:py-24 min-[1800px]:min-h-[480px] min-[1800px]:py-[120px] min-[2300px]:!min-h-[500px] min-[2300px]:!py-[125px]"
      aria-labelledby="cta-title"
    >
      <Image
        src="/assets/technical-drawing-bottom-2x.webp"
        alt=""
        width={2246}
        height={602}
        quality={100}
        sizes="(min-width: 2300px) 1250px, (min-width: 1800px) 1100px, (min-width: 768px) 50vw, 1px"
        className="pointer-events-none absolute right-0 top-8 hidden w-[50vw] max-w-[960px] opacity-60 md:block min-[1800px]:!w-[55vw] min-[1800px]:!max-w-[1100px] min-[2300px]:!right-[-2vw] min-[2300px]:!top-6 min-[2300px]:!w-[56vw] min-[2300px]:!max-w-[1250px]"
      />

      <Container
        size="wide"
        className="relative z-10 min-[2300px]:!max-w-[1900px]"
      >
        <Reveal className="max-w-[920px] min-[1800px]:max-w-[1000px] min-[2300px]:!max-w-[1040px]">
          <div className="flex items-center gap-3 text-[16px] font-medium text-muted-foreground min-[1800px]:gap-4 min-[1800px]:text-[20px] min-[2300px]:!gap-4 min-[2300px]:!text-[20px]">
            <span className="h-[3px] w-[34px] bg-brand min-[1800px]:h-[3px] min-[1800px]:w-[52px] min-[2300px]:!h-[3px] min-[2300px]:!w-[52px]" aria-hidden />
            {t("eyebrow")}
          </div>

          <h2
            id="cta-title"
            className="domtek-text-shadow mt-6 max-w-[860px] text-[32px] font-extrabold leading-[1.08] text-foreground sm:text-[42px] lg:text-[48px] min-[1800px]:max-w-[1000px] min-[1800px]:text-[66px] min-[2300px]:!max-w-[1020px] min-[2300px]:!text-[68px]"
          >
            <span className="text-brand">.</span>
            {t("title")}
            <span className="whitespace-nowrap text-brand">&nbsp;?</span>
          </h2>

          <p className="mt-7 max-w-[500px] text-[15px] font-medium leading-[1.34] text-muted-foreground min-[1800px]:max-w-[650px] min-[1800px]:text-[19px] min-[2300px]:!max-w-[680px] min-[2300px]:!text-[20px]">
            {t("subtitle")}
          </p>

          <Button
            nativeButton={false}
            className="mt-8 inline-flex h-10 items-center justify-center gap-2 rounded-[7px] border-0 px-5 text-[13px] font-bold shadow-[0_4px_10px_rgba(0,0,0,0.28)] outline-none ring-0 transition-transform hover:-translate-y-0.5 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-brand/35 min-[1800px]:mt-10 min-[1800px]:h-[54px] min-[1800px]:gap-3 min-[1800px]:px-8 min-[1800px]:text-[18px] min-[1800px]:[&_svg]:size-6 min-[2300px]:!mt-10 min-[2300px]:!h-[54px] min-[2300px]:!gap-3 min-[2300px]:!px-8 min-[2300px]:!text-[19px] min-[2300px]:[&_svg]:!size-6"
            render={<Link href="/contact" />}
          >
            {t("cta")}
            <ArrowRight data-icon="inline-end" />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
