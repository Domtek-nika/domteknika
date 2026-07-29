import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { ContactForm } from "@/components/sections/contact-form";
import { ContactMap } from "@/components/sections/contact-map";
import { Reveal } from "@/components/providers/reveal";

const CONTACT_CARDS = [
  {
    key: "location",
    icon: MapPin,
    href: "https://www.google.com/maps/search/?api=1&query=Chemin%20de%20Saint-Joux%2016B%2C%202520%20La%20Neuveville%2C%20Switzerland",
    external: true,
  },
  {
    key: "email",
    icon: Mail,
    href: "mailto:contact@domteknika.ch",
    external: false,
  },
  {
    key: "phone",
    icon: Phone,
    href: "tel:+41327517146",
    external: false,
  },
] as const;

export function ContactPageContent() {
  const t = useTranslations("ContactPage");
  const locale = useLocale();

  const formCopy = {
    title: t("Form.title"),
    firstName: t("Form.firstName"),
    lastName: t("Form.lastName"),
    company: t("Form.company"),
    email: t("Form.email"),
    phone: t("Form.phone"),
    message: t("Form.message"),
    submit: t("Form.submit"),
    sending: t("Form.sending"),
    success: t("Form.success"),
    invalid: t("Form.invalid"),
    rateLimited: t("Form.rateLimited"),
    error: t("Form.error"),
  };

  return (
    <>
      <section
        className="relative overflow-hidden bg-background pb-[32px] pt-[132px] md:min-h-[640px] md:pb-[38px] md:pt-[152px] min-[1800px]:!min-h-[860px] min-[1800px]:!pb-[70px] min-[2400px]:!min-h-[1000px] min-[2400px]:!pb-[90px] min-[2400px]:!pt-[152px]"
        aria-labelledby="contact-page-title"
      >
        <Image
          src="/assets/contact-page/technical-sketch.png"
          alt=""
          width={618}
          height={642}
          priority
          quality={100}
          sizes="(max-width: 1024px) 70vw, (max-width: 1799px) 660px, (max-width: 2399px) 1000px, 1150px"
          unoptimized
          className="pointer-events-none absolute right-[-30vw] top-[182px] z-0 h-auto w-[80vw] max-w-[630px] opacity-[0.68] sm:right-[-20vw] md:right-[-9vw] md:top-[176px] md:w-[46vw] lg:right-[-5vw] xl:right-[1vw] xl:w-[33vw] min-[1800px]:!right-[4vw] min-[1800px]:!top-[190px] min-[1800px]:!w-[44vw] min-[1800px]:!max-w-[1000px] min-[2400px]:!right-[6vw] min-[2400px]:!top-[210px] min-[2400px]:!max-w-[1150px]"
        />

        <Container size="wide" className="relative z-10">
          <div className="grid gap-7 lg:grid-cols-[340px_minmax(380px,500px)_1fr] lg:items-start lg:gap-10 xl:gap-[54px] min-[1800px]:!grid-cols-[560px_minmax(600px,680px)_1fr] min-[1800px]:!gap-14 min-[2400px]:!grid-cols-[620px_minmax(700px,760px)_1fr] min-[2400px]:!gap-20">
            <div>
              <Reveal>
                <div className="flex items-center gap-3 text-[15px] font-medium leading-none text-muted-foreground md:text-[16px] min-[2400px]:!gap-5 min-[2400px]:!text-[26px]">
                  <span
                    className="h-[3px] w-[34px] shrink-0 bg-brand min-[2400px]:!h-1 min-[2400px]:!w-[74px]"
                    aria-hidden
                  />
                  {t("Hero.eyebrow")}
                </div>

                <h1
                  id="contact-page-title"
                  className="domtek-text-shadow mt-[38px] text-[42px] font-extrabold leading-none text-foreground sm:whitespace-nowrap sm:text-[60px] md:mt-[52px] md:text-[66px] min-[1800px]:!text-[74px] min-[2400px]:!mt-[82px] min-[2400px]:!text-[96px]"
                >
                  {t("Hero.title")}
                  <span className="text-brand">.</span>
                </h1>

                <p className="mt-8 max-w-[430px] text-[15px] font-medium leading-[1.35] text-muted-foreground sm:text-[16px] min-[1800px]:!max-w-[500px] min-[1800px]:!text-[18px] min-[2400px]:!max-w-[560px] min-[2400px]:!text-[21px]">
                  {t("Hero.lead")}
                </p>
              </Reveal>

              <div className="mt-6 grid gap-2.5 min-[1800px]:!mt-8 min-[1800px]:!gap-3.5 min-[2400px]:!mt-10 min-[2400px]:!gap-4">
                {CONTACT_CARDS.map((card, index) => {
                  const Icon = card.icon;

                  return (
                    <Reveal key={card.key} delay={0.08 * (index + 1)}>
                      <a
                        href={card.href}
                        aria-label={t(`Cards.${card.key}.action`)}
                        target={card.external ? "_blank" : undefined}
                        rel={card.external ? "noreferrer" : undefined}
                        className="group/contact-card relative grid min-h-[92px] transform-gpu grid-cols-[52px_1fr] items-center rounded-[10px] border border-border bg-white/85 px-5 py-3.5 pr-12 shadow-[0_12px_28px_rgba(0,0,0,0.04)] backdrop-blur-sm transition-[transform,box-shadow,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-brand/25 hover:bg-white hover:shadow-[0_18px_42px_rgba(0,0,0,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 motion-reduce:transition-none [transition-timing-function:var(--ease-smooth)] min-[1800px]:!min-h-[112px] min-[1800px]:!grid-cols-[64px_1fr] min-[1800px]:!rounded-[12px] min-[1800px]:!px-7 min-[1800px]:!py-5 min-[1800px]:!pr-16 min-[2400px]:!min-h-[128px] min-[2400px]:!grid-cols-[72px_1fr] min-[2400px]:!rounded-[14px] min-[2400px]:!px-8 min-[2400px]:!py-6 min-[2400px]:!pr-20"
                      >
                        <span
                          className="absolute right-4 top-4 grid size-8 place-items-center rounded-full border border-border bg-white/90 text-foreground shadow-[0_8px_18px_rgba(0,0,0,0.06)] transition-[transform,background-color,color,border-color,box-shadow] duration-300 group-hover/contact-card:-translate-y-0.5 group-hover/contact-card:border-brand group-hover/contact-card:bg-brand group-hover/contact-card:text-white group-hover/contact-card:shadow-[0_10px_22px_rgba(227,6,19,0.22)] motion-reduce:transition-none [transition-timing-function:var(--ease-smooth)] min-[1800px]:!right-5 min-[1800px]:!top-5 min-[1800px]:!size-10 min-[2400px]:!right-6 min-[2400px]:!top-6 min-[2400px]:!size-11"
                          aria-hidden
                        >
                          <ArrowUpRight
                            className="size-4 min-[1800px]:!size-5 min-[2400px]:!size-6"
                            aria-hidden
                          />
                        </span>
                        <Icon
                          aria-hidden
                          strokeWidth={1.8}
                          className="size-8 shrink-0 text-brand transition-transform duration-300 group-hover/contact-card:-translate-y-1 motion-reduce:transition-none min-[1800px]:!size-10 min-[2400px]:!size-11"
                        />
                        <div>
                          <h2 className="text-[14px] font-extrabold leading-tight text-foreground min-[1800px]:!text-[17px] min-[2400px]:!text-[19px]">
                            {t(`Cards.${card.key}.title`)}
                          </h2>
                          <p className="mt-1.5 whitespace-pre-line text-[12px] font-medium leading-[1.38] text-muted-foreground min-[1800px]:!mt-2 min-[1800px]:!text-[15px] min-[2400px]:!text-[17px]">
                            {t(`Cards.${card.key}.body`)}
                          </p>
                        </div>
                      </a>
                    </Reveal>
                  );
                })}
              </div>
            </div>

            <Reveal
              className="lg:pt-[234px] min-[1800px]:!pt-[260px] min-[2400px]:!pt-[310px]"
              delay={0.08}
            >
              <ContactForm copy={formCopy} locale={locale} />
            </Reveal>

            <div
              className="hidden min-h-[410px] lg:block min-[1800px]:!min-h-[620px] min-[2400px]:!min-h-[720px]"
              aria-hidden
            />
          </div>
        </Container>
      </section>

      <section
        className="bg-background pb-[72px] pt-0 md:pb-[88px] min-[1800px]:!pb-[120px] min-[1800px]:!pt-[40px] min-[2400px]:!pb-[140px] min-[2400px]:!pt-[60px]"
        aria-labelledby="contact-map-title"
      >
        <Container size="wide">
          <Reveal>
            <div className="grid gap-7 lg:grid-cols-[360px_1fr] lg:items-start min-[1800px]:!grid-cols-[480px_1fr] min-[1800px]:!gap-12 min-[2400px]:!grid-cols-[560px_1fr] min-[2400px]:!gap-16">
              <div>
                <div className="flex items-center gap-3 text-[15px] font-medium leading-none text-muted-foreground md:text-[16px] min-[1800px]:!text-[18px] min-[2400px]:!gap-4 min-[2400px]:!text-[21px]">
                  <span
                    className="h-[3px] w-[34px] shrink-0 bg-brand min-[1800px]:!w-[44px] min-[2400px]:!h-1 min-[2400px]:!w-[52px]"
                    aria-hidden
                  />
                  {t("Map.eyebrow")}
                </div>
                <h2
                  id="contact-map-title"
                  className="mt-5 max-w-[340px] text-[32px] font-extrabold leading-[1.05] text-foreground md:text-[40px] min-[1800px]:!mt-7 min-[1800px]:!max-w-[460px] min-[1800px]:!text-[52px] min-[2400px]:!max-w-[540px] min-[2400px]:!text-[60px]"
                >
                  {t("Map.title")}
                  <span className="text-brand">.</span>
                </h2>
              </div>

              <div className="relative h-[360px] overflow-hidden rounded-[10px] border border-border bg-white shadow-[0_20px_56px_rgba(0,0,0,0.08)] md:h-[380px] min-[1800px]:!h-[520px] min-[1800px]:!rounded-[14px] min-[2400px]:!h-[620px] min-[2400px]:!rounded-[16px]">
                <ContactMap label={t("Map.marker")} />
                <div className="pointer-events-none absolute bottom-4 left-4 rounded-[7px] border border-border bg-white/92 px-3.5 py-3 shadow-[0_10px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm min-[1800px]:!bottom-6 min-[1800px]:!left-6 min-[1800px]:!rounded-[10px] min-[1800px]:!px-5 min-[1800px]:!py-4 min-[2400px]:!bottom-8 min-[2400px]:!left-8 min-[2400px]:!rounded-[12px] min-[2400px]:!px-6 min-[2400px]:!py-5">
                  <p className="text-[11px] font-extrabold uppercase tracking-wide text-brand min-[1800px]:!text-[14px] min-[2400px]:!text-[16px]">
                    {t("Map.marker")}
                  </p>
                  <p className="mt-1 whitespace-pre-line text-[12px] font-medium leading-[1.35] text-muted-foreground min-[1800px]:!mt-2 min-[1800px]:!text-[15px] min-[2400px]:!text-[17px]">
                    {t("Cards.location.body")}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
