import type { Metadata } from "next";
import Image from "next/image";
import {
  Award,
  BadgeCheck,
  ArrowRight,
  Box,
  Cpu,
  Factory,
  Globe2,
  Hourglass,
  Lightbulb,
  LockKeyhole,
  Monitor,
  Target,
  UsersRound,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/providers/reveal";
import { BrainstormingCardSwap } from "@/components/sections/brainstorming-card-swap";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

function RunningPersonIcon({ className }: { className?: string }) {
  return (
    <Image
      alt=""
      className={className}
      height={57}
      src="/assets/expertise-value-agile.svg"
      unoptimized
      width={54}
    />
  );
}

const EXPERTISE_ITEMS = [
  { key: "creativity", icon: Lightbulb },
  { key: "design", icon: Box },
  { key: "prototyping", icon: Hourglass },
  { key: "simulation", icon: Monitor },
  { key: "polymer", icon: Factory },
  { key: "electronics", icon: Cpu },
] as const;

const VALUE_ITEMS = [
  { key: "partner", icon: UsersRound },
  { key: "agile", icon: RunningPersonIcon },
  { key: "confidential", icon: LockKeyhole },
  { key: "quality", icon: BadgeCheck },
] as const;

const STATS = [
  { key: "projects", icon: Box },
  { key: "years", icon: Award },
  { key: "worldwide", icon: Globe2 },
  { key: "industries", icon: Target },
] as const;

const TEAM_MEMBERS = [
  { name: "Etienne", image: "/assets/team/etienne.png" },
  { name: "Nicole", image: "/assets/team/nicole.png" },
  { name: "Guillaume", image: "/assets/team/guillaume.png" },
  { name: "Nicolas", image: "/assets/team/nicolas.png" },
  { name: "Hector", image: "/assets/team/hector.png" },
  { name: "Quentin", image: "/assets/team/quentin-c.png" },
  { name: "Robin", image: "/assets/team/robin.png" },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ExpertisePage.Meta" });

  return buildPageMetadata({
    description: t("description"),
    locale,
    path: "/expertise",
    title: t("title"),
  });
}

export default async function ExpertisePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ExpertiseHero />
      <ExpertiseGrid />
      <ExpertiseSwissBanner />
      <AddedValueSection />
      <ExpertiseCta />
    </>
  );
}

function ExpertiseHero() {
  const t = useTranslations("ExpertisePage.Hero");

  return (
    <section
      className="relative overflow-visible bg-background pb-[42px] pt-[132px] md:min-h-[376px] md:pb-[46px] md:pt-[152px] min-[1800px]:!min-h-[520px] min-[1800px]:!pb-[60px] min-[2400px]:!min-h-[700px] min-[2400px]:!pb-20 min-[2400px]:!pt-[152px]"
      aria-labelledby="expertise-hero-title"
    >
      <Image
        src="/assets/expertise-page/image-fond-top.png"
        alt=""
        width={1351}
        height={421}
        priority
        sizes="100vw"
        className="pointer-events-none absolute left-1/2 top-[112px] z-0 h-auto w-[58vw] max-w-[728px] -translate-x-1/2 opacity-100 min-[1800px]:!top-[128px] min-[1800px]:!w-[48vw] min-[1800px]:!max-w-[920px]"
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-white/70 via-white/45 to-white/15" />

      <Container size="wide" className="relative z-10">
        <div className="relative grid gap-12 md:block">
          <Reveal>
            <div className="flex items-center gap-3 text-[15px] font-medium leading-none text-muted-foreground md:text-[16px] min-[2400px]:!gap-5 min-[2400px]:!text-[26px]">
              <span
                className="h-[3px] w-[34px] shrink-0 bg-brand min-[2400px]:!h-1 min-[2400px]:!w-[74px]"
                aria-hidden
              />
              {t("eyebrow")}
            </div>

            <h1
              id="expertise-hero-title"
              className="domtek-text-shadow mt-[38px] text-[42px] font-extrabold leading-none text-foreground sm:text-[60px] md:mt-[52px] md:text-[66px] min-[1800px]:!text-[74px] min-[2400px]:!mt-[82px] min-[2400px]:!text-[96px]"
            >
              {t("title")}
              <span className="text-brand">.</span>
            </h1>
          </Reveal>

          <Reveal
            delay={0.1}
            className="min-h-[326px] sm:min-h-[356px] md:absolute md:right-0 md:top-[-32px] md:min-h-0 md:w-[52%] lg:right-[-36px] lg:top-[-48px] lg:w-[54%] xl:right-[-84px] xl:w-[58%] 2xl:right-[-148px] 2xl:w-[60%] min-[1800px]:!right-[40px] min-[1800px]:!top-[-24px] min-[1800px]:!w-[55%] min-[2300px]:!right-[80px] min-[2400px]:!top-[-10px]"
          >
            <div className="relative left-1/2 w-[min(calc(100vw-28px),380px)] -translate-x-1/2 pt-1 sm:w-[min(100%,520px)] md:left-auto md:ml-auto md:mr-0 md:w-full md:max-w-[520px] md:translate-x-0 lg:max-w-[580px] xl:max-w-[640px] 2xl:max-w-[660px] min-[1800px]:!max-w-[800px] min-[2400px]:!max-w-[880px]">
              <div className="mx-auto mb-4 flex w-fit flex-col items-center gap-1">
                <p className="text-center text-[17px] font-medium leading-none text-muted-foreground md:text-[15px] min-[1800px]:!text-[20px] min-[2400px]:!text-[22px]">
                  {t("team")}
                </p>
                <span
                  className="h-px w-16 bg-brand/55 min-[1800px]:!w-24 min-[2400px]:!w-28"
                  aria-hidden
                />
              </div>

              <div
                className="pointer-events-none absolute left-1/2 top-12 h-[272px] w-full -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(227,6,19,0.065),rgba(255,255,255,0)_72%)] sm:h-[292px] md:top-11 md:h-[238px] lg:h-[266px]"
                aria-hidden
              />
              <div className="relative mx-auto flex max-w-[292px] items-start justify-center gap-1 min-[360px]:max-w-[326px] min-[390px]:max-w-[366px] min-[390px]:gap-1.5 sm:max-w-[520px] sm:gap-3 md:max-w-[520px] md:gap-2 lg:max-w-[560px] lg:gap-4 xl:max-w-[620px] xl:gap-5 min-[1800px]:!max-w-[720px] min-[2300px]:!max-w-[760px] min-[2400px]:!max-w-[820px]">
                {TEAM_MEMBERS.slice(0, 4).map((member, index) => (
                  <TeamPortrait
                    key={member.name}
                    member={member}
                    eager
                    className={cn(
                      index === 0 && "mt-2",
                      index === 1 && "mt-0",
                      index === 2 && "mt-1",
                      index === 3 && "mt-2",
                    )}
                  />
                ))}
              </div>
              <div className="relative mx-auto mt-4 flex max-w-[258px] items-start justify-center gap-3 min-[360px]:max-w-[284px] min-[390px]:max-w-[328px] sm:max-w-[428px] md:max-w-[408px] lg:mt-3 lg:max-w-[440px] lg:gap-5 xl:max-w-[470px] min-[1800px]:!max-w-[540px] min-[2300px]:!max-w-[570px] min-[2400px]:!max-w-[610px]">
                {TEAM_MEMBERS.slice(4).map((member, index) => (
                  <TeamPortrait
                    key={member.name}
                    member={member}
                    className={cn(index === 1 && "mt-1")}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function TeamPortrait({
  member,
  className,
  eager = false,
}: {
  member: (typeof TEAM_MEMBERS)[number];
  className?: string;
  eager?: boolean;
}) {
  return (
    <figure
      className={cn(
        "group relative isolate aspect-[196/269] w-[70px] shrink-0 rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.24),rgba(255,255,255,0.045)_38%,rgba(10,10,10,0.10)_100%)] p-[5px] shadow-[0_14px_30px_rgba(0,0,0,0.16)] backdrop-blur-[12px] transition duration-300 before:pointer-events-none before:absolute before:-inset-[5px] before:-z-10 before:rounded-full before:bg-[radial-gradient(circle_at_24%_12%,rgba(255,255,255,0.46),transparent_28%),radial-gradient(circle_at_78%_92%,rgba(0,0,0,0.10),transparent_34%)] before:blur-[6px] after:pointer-events-none after:absolute after:inset-[1px] after:z-20 after:rounded-full after:shadow-[inset_0_1px_2px_rgba(255,255,255,0.34),inset_0_-10px_16px_rgba(0,0,0,0.13),inset_0_0_0_1px_rgba(255,255,255,0.16)] hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(0,0,0,0.19)] min-[360px]:w-[78px] min-[390px]:w-[88px] sm:w-[108px] md:w-[112px] lg:w-[122px] xl:w-[134px] 2xl:w-[142px] min-[1800px]:!w-[152px] min-[2300px]:!w-[160px] min-[2400px]:!w-[170px]",
        className,
      )}
    >
      <div className="relative z-10 size-full overflow-hidden rounded-full bg-black">
        <Image
          src={member.image}
          alt={member.name}
          fill
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "auto" : "low"}
          sizes="(max-width: 640px) 76px, (max-width: 768px) 88px, (max-width: 1024px) 108px, (max-width: 1280px) 124px, (max-width: 1799px) 142px, (max-width: 2299px) 152px, (max-width: 2399px) 160px, 170px"
          className="scale-[1.025] object-cover object-center opacity-[0.99] saturate-[0.98] transition duration-300 group-hover:scale-[1.055] group-hover:opacity-100 group-hover:saturate-100"
        />
      </div>
    </figure>
  );
}

function ExpertiseGrid() {
  const t = useTranslations("ExpertisePage.Services");

  return (
    <section
      className="bg-background pb-[118px] min-[1800px]:!pb-[140px] min-[2400px]:!pb-[160px]"
      aria-labelledby="expertise-services"
    >
      <Container size="wide">
        <div className="mx-auto max-w-[1080px] min-[1800px]:!max-w-[1480px] min-[2400px]:!max-w-[1600px]">
          <Reveal>
            <div className="flex items-center gap-3 text-[15px] font-medium text-muted-foreground min-[1800px]:!gap-4 min-[1800px]:!text-[18px]">
              <span
                className="h-[3px] w-[34px] bg-brand min-[1800px]:!w-[44px]"
                aria-hidden
              />
              {t("eyebrow")}
            </div>

            <h2
              id="expertise-services"
              className="domtek-text-shadow mt-8 max-w-[320px] text-[30px] font-extrabold leading-[1.06] text-foreground sm:max-w-[560px] sm:text-[44px] md:text-[52px] min-[1800px]:!max-w-[680px] min-[1800px]:!text-[58px] min-[2400px]:!max-w-[760px] min-[2400px]:!text-[66px]"
            >
              {t("title")}
              <span className="text-brand">.</span>
            </h2>

            <p className="mt-7 max-w-[320px] text-[15px] font-medium leading-[1.42] text-muted-foreground sm:max-w-[610px] min-[1800px]:!max-w-[760px] min-[1800px]:!text-[17px] min-[2400px]:!text-[19px]">
              {t("intro")}
            </p>
          </Reveal>

          <ExpertiseServiceCards items={EXPERTISE_ITEMS} startIndex={0} />
          <BrainstormingSection />
        </div>
      </Container>
    </section>
  );
}

function ExpertiseServiceCards({
  items,
  startIndex,
}: {
  items: readonly (typeof EXPERTISE_ITEMS)[number][];
  startIndex: number;
}) {
  const t = useTranslations("ExpertisePage.Services");

  return (
    <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 min-[1800px]:!gap-6 min-[2400px]:!mt-12">
      {items.map((item, index) => {
        const Icon = item.icon;

        return (
          <Reveal
            as="article"
            key={item.key}
            delay={(startIndex + index) * 0.05}
            className="group flex min-h-[220px] flex-col items-center justify-center rounded-[7px] border border-border bg-white px-3 py-6 text-center transition-shadow duration-300 hover:shadow-[0_18px_42px_rgba(0,0,0,0.07)] sm:min-h-[246px] sm:px-6 sm:py-8 min-[1800px]:!min-h-[270px] min-[1800px]:!px-8 min-[2400px]:!min-h-[292px]"
          >
            <Icon
              className="size-9 stroke-[1.8] text-brand transition-transform duration-300 group-hover:-translate-y-1 sm:size-10 min-[1800px]:!size-12 min-[2400px]:!size-[52px]"
              aria-hidden
            />
            <h3 className="mt-6 text-[14px] font-extrabold leading-tight text-foreground sm:mt-8 sm:text-[16px] min-[1800px]:!text-[18px] min-[2400px]:!text-[20px]">
              {t(`items.${item.key}.title` as never)}
            </h3>
            <p className="mt-5 max-w-[250px] text-[12.5px] font-medium leading-[1.28] text-muted-foreground sm:mt-8 sm:text-[14px] min-[1800px]:!max-w-[320px] min-[1800px]:!text-[15px] min-[1800px]:!leading-[1.35] min-[2400px]:!text-[16px]">
              {t(`items.${item.key}.description` as never)}
            </p>
          </Reveal>
        );
      })}
    </div>
  );
}

function BrainstormingSection() {
  const t = useTranslations("ExpertisePage.Services.brainstorming");
  const lead = t("lead");
  const separatorIndex = Math.max(lead.indexOf(":"), lead.indexOf("："));
  const emphasizedLead =
    separatorIndex >= 0 ? lead.slice(0, separatorIndex + 1) : lead;
  const remainingLead =
    separatorIndex >= 0 ? lead.slice(separatorIndex + 1) : "";

  return (
    <div className="my-14 grid gap-8 md:my-20 lg:grid-cols-[0.82fr_1.18fr] lg:items-center min-[1800px]:!my-24 min-[1800px]:!grid-cols-[0.95fr_1.05fr] min-[1800px]:!gap-12">
      <div className="relative">
        <div className="flex items-center gap-3 text-[14px] font-medium text-muted-foreground min-[1800px]:!gap-4 min-[1800px]:!text-[17px]">
          <span
            className="h-[3px] w-[34px] bg-brand min-[1800px]:!w-[44px]"
            aria-hidden
          />
          {t("title")}
        </div>
        <h3 className="domtek-text-shadow mt-7 max-w-[520px] text-[42px] font-extrabold leading-none text-foreground sm:text-[58px] min-[1800px]:!max-w-[700px] min-[1800px]:!text-[68px] min-[2400px]:!text-[74px]">
          {t("eyebrow")}
          <span className="text-brand">.</span>
        </h3>
        <p className="mt-6 max-w-[470px] text-[15px] font-medium leading-[1.45] text-muted-foreground min-[1800px]:!max-w-[620px] min-[1800px]:!text-[18px] min-[2400px]:!text-[19px]">
          <span className="font-extrabold">{emphasizedLead}</span>
          {remainingLead}
        </p>
        <p className="mt-4 max-w-[470px] text-[15px] font-medium leading-[1.45] text-muted-foreground min-[1800px]:!max-w-[620px] min-[1800px]:!text-[18px] min-[2400px]:!text-[19px]">
          {t("body")}
        </p>
      </div>

      <div className="w-full min-w-0 lg:translate-x-0 xl:translate-x-10 2xl:translate-x-24 min-[1800px]:!translate-x-0 min-[1800px]:justify-self-center">
        <BrainstormingCardSwap />
      </div>
    </div>
  );
}

function ExpertiseSwissBanner() {
  const t = useTranslations("ExpertisePage.Swiss");
  const titleLineTwo = t("titleLineTwo");
  const titleLineTwoWords = titleLineTwo.split(" ");
  const mobileTitleLines =
    titleLineTwoWords.length > 3
      ? [
          titleLineTwoWords.slice(0, -2).join(" "),
          titleLineTwoWords.slice(-2).join(" "),
        ]
      : [titleLineTwo];

  return (
    <section className="relative h-[176px] overflow-hidden bg-alps md:h-[236px] min-[1800px]:!h-[280px] min-[2400px]:!h-[320px]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/assets/expertise-alps-cows.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_68%]"
        />
      </div>
      <div
        className="absolute inset-y-0 right-0 w-[76%] bg-[linear-gradient(to_left,rgba(4,91,39,0.58)_0%,rgba(4,91,39,0.42)_48%,rgba(4,91,39,0)_100%)] md:hidden"
        aria-hidden
      />
      <div
        className="absolute inset-y-0 right-0 w-[72%] md:hidden"
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          WebkitMaskImage:
            "linear-gradient(to left, black 0%, black 44%, transparent 100%)",
          maskImage:
            "linear-gradient(to left, black 0%, black 44%, transparent 100%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-y-0 right-0 hidden w-[60%] md:block"
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          WebkitMaskImage:
            "linear-gradient(to left, black 0%, black 42%, transparent 100%)",
          maskImage:
            "linear-gradient(to left, black 0%, black 42%, transparent 100%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-y-0 right-0 hidden w-[60%] md:block"
        style={{
          background:
            "linear-gradient(to left, rgba(4,91,39,0.49) 0%, rgba(4,91,39,0.32) 42%, rgba(4,91,39,0) 100%)",
        }}
        aria-hidden
      />

      <Container
        size="wide"
        className="relative z-10 flex h-full max-w-none items-center justify-between px-5 sm:px-8 md:justify-end lg:px-10 xl:px-11"
      >
        <Reveal className="flex w-full min-w-0 items-center justify-end gap-3 md:w-auto md:justify-start md:gap-6">
          <h2
            className="min-w-0 max-w-[calc(100vw-104px)] text-right text-[15px] font-extrabold uppercase leading-[1.05] tracking-wide text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.42)] min-[390px]:text-[17px] sm:max-w-[560px] sm:text-[22px] md:max-w-[660px] md:text-left md:text-[26px] md:leading-[1.16] min-[1800px]:!max-w-[780px] min-[1800px]:!text-[32px] min-[2400px]:!text-[36px]"
            aria-label={t("title")}
          >
            <span className="block whitespace-nowrap" aria-hidden>
              {t("titleLineOne")}
            </span>
            <span className="hidden whitespace-nowrap sm:block" aria-hidden>
              {titleLineTwo}
            </span>
            {mobileTitleLines.map((line) => (
              <span key={line} className="block sm:hidden" aria-hidden>
                {line}
              </span>
            ))}
          </h2>
          <Image
            src="/assets/flag-switzerland.webp"
            alt=""
            width={88}
            height={88}
            className="size-[38px] shrink-0 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.28)] sm:size-[42px] md:size-[52px] lg:size-[58px] min-[1800px]:!size-[64px] min-[2400px]:!size-[72px]"
          />
        </Reveal>
      </Container>
    </section>
  );
}

function AddedValueSection() {
  const t = useTranslations("ExpertisePage.AddedValue");

  return (
    <section className="bg-background py-[78px] md:py-[92px] min-[1800px]:!py-[96px] min-[2400px]:!py-[112px]">
      <Container
        size="wide"
        className="max-w-[1440px] px-4 sm:px-6 lg:px-4 xl:px-6 min-[1800px]:!max-w-[1560px]"
      >
        <div className="grid gap-7 lg:grid-cols-[1.4fr_0.95fr] lg:items-stretch min-[1800px]:!grid-cols-[1.25fr_1fr] min-[1800px]:!gap-8">
          <Reveal className="transform-gpu rounded-[7px] border border-border bg-white px-6 py-5 transition-shadow duration-300 hover:shadow-[0_18px_42px_rgba(0,0,0,0.07)] md:px-9 md:py-6">
            <div className="flex items-center gap-4 text-[16px] font-extrabold leading-none text-foreground min-[1800px]:!text-[18px]">
              <span
                className="h-[3px] w-[34px] bg-brand min-[1800px]:!w-[44px]"
                aria-hidden
              />
              {t("eyebrow")}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-0">
              {VALUE_ITEMS.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Reveal
                    as="article"
                    key={item.key}
                    delay={index * 0.04}
                    className="group flex transform-gpu flex-col items-center rounded-[7px] border border-border bg-background/45 px-3 py-4 text-center transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-brand/25 hover:shadow-[0_18px_24px_-18px_rgba(0,0,0,0.22)] sm:px-5 sm:py-5 lg:border-y-0 lg:border-r-0 lg:border-l lg:border-border lg:bg-transparent lg:px-7 lg:py-1 lg:shadow-none"
                  >
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1.65}
                      className="h-9 w-9 text-brand transition-transform duration-300 group-hover:-translate-y-1 sm:h-11 sm:w-11 min-[1800px]:!size-12 min-[2400px]:!size-[52px]"
                    />
                    <h3 className="mt-4 flex min-h-[2.5em] w-full items-center justify-center text-[13px] font-extrabold leading-tight text-foreground sm:mt-5 sm:text-[15px] lg:text-[16px] min-[1800px]:!text-[18px] min-[2400px]:!text-[19px]">
                      {t(`values.${item.key}.title` as never)}
                    </h3>
                    <p className="mt-3 text-[11.5px] font-medium leading-[1.34] text-muted-foreground sm:mt-4 sm:text-[14px] sm:leading-[1.38] min-[1800px]:!text-[15px] min-[1800px]:!leading-[1.42] min-[2400px]:!text-[16px]">
                      {t(`values.${item.key}.description` as never)}
                    </p>
                  </Reveal>
                );
              })}
            </div>
          </Reveal>

          <div className="relative lg:min-h-0">
            <Reveal
              delay={0.1}
              className="relative transform-gpu overflow-hidden rounded-[7px] bg-brand px-5 py-5 text-white shadow-[0_18px_38px_rgba(0,0,0,0.16)] transition-[box-shadow,transform] duration-300 hover:shadow-[0_24px_50px_rgba(0,0,0,0.22)] md:px-7 md:py-7 lg:absolute lg:inset-0 lg:h-full motion-safe:hover:-translate-y-1"
            >
              <div className="relative lg:h-full">
                <div
                  className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-px -translate-y-1/2 bg-white/28"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-px -translate-x-1/2 bg-white/28"
                  aria-hidden
                />

                <div className="relative grid grid-cols-2 auto-rows-fr lg:h-full lg:grid-rows-2">
                  {STATS.map((stat, index) => {
                    const isIndustries = stat.key === "industries";
                    const Icon = stat.icon;

                    return (
                      <div
                        key={stat.key}
                        className={cn(
                          "group flex min-h-[122px] min-w-0 flex-col justify-center gap-1.5 py-4 sm:min-h-[138px] sm:gap-2 sm:py-5 lg:grid lg:min-h-0 lg:content-start lg:grid-rows-[50px_auto] lg:justify-stretch lg:py-0",
                          index % 2 === 0 ? "pr-3 sm:pr-6" : "pl-3 sm:pl-6",
                          index < 2 ? "lg:-translate-y-2 lg:pb-9" : "lg:pt-4",
                        )}
                      >
                        <div className="flex h-[40px] items-center sm:h-[46px] lg:h-[50px]">
                          <Icon
                            aria-hidden="true"
                            strokeWidth={1.65}
                            className="size-[34px] shrink-0 text-white transition-transform duration-300 group-hover:-translate-y-1 sm:size-[40px] md:size-[42px] lg:size-[44px] min-[1800px]:!size-[46px] min-[2400px]:!size-[50px]"
                          />
                        </div>
                        <div className="min-w-0 self-start">
                          <div
                            className={cn(
                              isIndustries &&
                                "flex items-baseline gap-1.5 whitespace-nowrap sm:gap-2",
                            )}
                          >
                            <strong className="block max-w-full text-[clamp(14px,3.8vw,18px)] font-extrabold leading-none tracking-normal sm:text-[clamp(17px,2.2vw,21px)] lg:text-[20px] min-[1800px]:!text-[22px] min-[2400px]:!text-[24px]">
                              {t(`stats.${stat.key}.value` as never)}
                              {isIndustries && (
                                <span className="ml-1.5 sm:ml-2">
                                  {t(`stats.${stat.key}.label` as never)}
                                </span>
                              )}
                            </strong>
                            {!isIndustries && (
                              <span className="mt-1.5 block text-[12px] font-medium leading-tight text-white/88 sm:mt-2 sm:text-[13px] md:text-[13px] min-[1800px]:!text-[14px] min-[2400px]:!text-[15px]">
                                {t(`stats.${stat.key}.label` as never)}
                              </span>
                            )}
                          </div>
                          {isIndustries && (
                            <span className="mt-1.5 block max-w-[31ch] text-[10px] font-medium leading-[1.16] text-white/88 sm:mt-2 sm:text-[12px] md:text-[12px] min-[1800px]:!text-[13px] min-[2400px]:!text-[14px]">
                              {t("stats.industries.detail")}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ExpertiseCta() {
  const t = useTranslations("ExpertisePage.Cta");

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-b border-brand/35 bg-white py-20 md:min-h-[360px] md:py-24 min-[1800px]:!min-h-[440px] min-[1800px]:!py-[120px] min-[2400px]:!min-h-[520px] min-[2400px]:!py-[140px]"
      aria-labelledby="expertise-cta-title"
    >
      <Image
        src="/assets/technical-drawing-bottom.png"
        alt=""
        width={1123}
        height={301}
        quality={100}
        sizes="(max-width: 1024px) 100vw, 720px"
        unoptimized
        className="pointer-events-none absolute right-[-120px] top-12 hidden w-[52vw] max-w-[760px] opacity-60 md:block min-[1800px]:!right-[4vw] min-[1800px]:!w-[44vw] min-[1800px]:!max-w-[900px] min-[2400px]:!max-w-[1000px]"
      />

      <Container
        size="wide"
        className="relative z-10 min-[1800px]:!max-w-[1600px] min-[2400px]:!max-w-[1900px]"
      >
        <Reveal className="max-w-[560px] md:max-w-[860px] min-[1800px]:!max-w-[1040px] min-[2400px]:!max-w-[1200px]">
          <div className="flex items-center gap-3 text-[14px] font-medium text-muted-foreground min-[1800px]:!gap-4 min-[1800px]:!text-[18px]">
            <span
              className="h-[3px] w-[34px] bg-brand min-[1800px]:!w-[44px]"
              aria-hidden
            />
            {t("eyebrow")}
          </div>

          <h2
            id="expertise-cta-title"
            className="domtek-text-shadow mt-8 text-[34px] font-extrabold leading-[1.05] text-foreground sm:text-[46px] md:text-[52px] min-[1800px]:!text-[62px] min-[2400px]:!text-[72px]"
          >
            <span className="text-brand">.</span>
            {t("title")} <span className="text-brand">?</span>
          </h2>

          <p className="mt-5 max-w-[450px] text-[14px] font-medium leading-[1.4] text-muted-foreground min-[1800px]:!max-w-[600px] min-[1800px]:!text-[18px] min-[2400px]:!text-[20px]">
            {t("subtitle")}
          </p>

          <Button
            nativeButton={false}
            className="mt-8 h-10 rounded-[7px] border-0 px-5 text-[13px] font-bold shadow-[0_4px_10px_rgba(0,0,0,0.28)] outline-none ring-0 transition-transform has-data-[icon=inline-end]:pr-5 hover:-translate-y-0.5 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-brand/35 min-[1800px]:!h-[52px] min-[1800px]:!px-7 min-[1800px]:!text-[17px] min-[2400px]:!h-[58px] min-[2400px]:!text-[18px]"
            render={<Link href="/contact" />}
          >
            {t("button")}
            <ArrowRight data-icon="inline-end" />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
