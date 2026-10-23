import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Container } from "@/components/layout/container";
import { FaqSearch } from "@/components/sections/faq-search";
import { getFaqCopy } from "@/data/faq-copy";
import { getProjectBySlug } from "@/data/projects";
import { getServiceCopy } from "@/data/service-copy";
import { getService, services } from "@/data/services";
import { Link } from "@/i18n/navigation";
import {
  expertiseDrawingBackground,
  expertiseDrawingFooter,
  expertiseDrawingMargin,
} from "@/lib/decorative-assets";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata, localizedUrl, SITE_URL } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

const focusStyle = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand";
const introTextStyle = "max-w-[760px] text-[15px] font-medium leading-[1.5] text-muted-foreground min-[1800px]:text-[18px]";
const buttonStyle = `inline-flex min-h-11 items-center justify-between gap-4 rounded-[7px] bg-brand px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_4px_10px_rgba(0,0,0,0.28)] transition-[transform,background-color] hover:bg-primary/80 motion-safe:hover:-translate-y-0.5 ${focusStyle}`;
const secondaryButtonStyle = `inline-flex min-h-11 items-center gap-3 rounded-[7px] border border-border bg-white px-4 py-3 text-[13px] font-bold text-foreground shadow-[0_2px_6px_rgba(0,0,0,0.05)] transition-[translate,border-color,box-shadow] duration-500 motion-safe:hover:-translate-y-1 hover:border-brand/35 hover:shadow-[0_12px_26px_rgba(0,0,0,0.09)] active:border-brand focus-visible:border-brand motion-reduce:transition-none [transition-timing-function:var(--ease-smooth)] ${focusStyle}`;
const homeAccentLineStyle = "block h-[3px] w-8 transition-[width] duration-300 group-hover:w-16 motion-reduce:transition-none motion-reduce:group-hover:w-8";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const copy = getServiceCopy(locale).items[service.slug];
  return buildPageMetadata({
    locale,
    path: `/expertise/${service.slug}`,
    title: `${copy.title} — DOMTEKNIKA`,
    description: copy.description,
  });
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = getService(slug);
  if (!service) notFound();
  const { labels, items } = getServiceCopy(locale);
  const copy = items[service.slug];
  const faqCopy = getFaqCopy(locale);
  const t = await getTranslations({ locale, namespace: "ExpertisePage.Services" });
  const displayTitle = t(`items.${service.key}.title`);
  const projects = service.projects.flatMap((id) => {
    const project = getProjectBySlug(locale, id);
    return project ? [project] : [];
  });
  const heroProject = projects[0];
  const path = `/expertise/${service.slug}`;
  const url = localizedUrl(locale as Locale, path);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: displayTitle,
        description: copy.description,
        url,
        provider: { "@id": `${SITE_URL}#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: labels.back, item: localizedUrl(locale as Locale, "/expertise") },
          { "@type": "ListItem", position: 2, name: displayTitle, item: url },
        ],
      },
    ],
  };

  return (
    <article className="bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <header className="relative overflow-hidden pb-[68px] pt-[112px] md:pb-[66px] md:pt-[152px]">
        <div
          className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block"
          style={{
            maskImage: "linear-gradient(to bottom, transparent, black 15%, black 65%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 65%, transparent)",
          }}
          aria-hidden
        >
          <Image
            src={expertiseDrawingMargin}
            alt=""
            width={360}
            height={700}
            unoptimized
            sizes="360px"
            className="absolute -left-5 top-[132px] h-auto w-[max(90px,calc((100vw-1160px)/2+45px))] max-w-[360px] opacity-80 min-[1800px]:!w-[max(90px,calc((100vw-1680px)/2+45px))] min-[2400px]:!w-[max(90px,calc((100vw-1900px)/2+45px))]"
          />
        </div>
        <Image
          src={expertiseDrawingBackground}
          alt=""
          width={1351}
          height={421}
          unoptimized
          sizes="(min-width: 1539px) 1200px, (min-width: 768px) 78vw, 120vw"
          className="pointer-events-none absolute right-[-35%] top-[108px] w-[120vw] max-w-[1200px] opacity-40 md:right-[-3%] md:top-[100px] md:w-[78vw] md:opacity-65"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, rgb(0 0 0 / 0.16) 25%, black 65%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgb(0 0 0 / 0.16) 25%, black 65%)",
          }}
        />
        <div
          className="pointer-events-none absolute bottom-2 right-0 h-[56px] w-[74vw] max-w-[660px] overflow-hidden md:bottom-0 md:h-[128px] md:w-[48vw] min-[1800px]:h-[148px]"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 30%), linear-gradient(to bottom, black 65%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 30%), linear-gradient(to bottom, black 65%, transparent)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
          aria-hidden
        >
          <Image
            src={expertiseDrawingFooter}
            alt=""
            fill
            unoptimized
            sizes="(min-width: 1375px) 660px, (min-width: 768px) 48vw, 74vw"
            className="object-contain opacity-55 md:opacity-80"
          />
        </div>
        <Container size="wide" className="relative z-10">
          <Link href="/expertise" className={buttonStyle}>
            <ArrowLeft className="size-4 shrink-0" aria-hidden />{labels.back}
          </Link>
          <div className="mt-7 md:mt-[42px]">
            <p className="flex items-center gap-3 text-muted-foreground text-[15px] font-medium">
              <span className="h-[3px] w-[34px] shrink-0 bg-brand" aria-hidden />{labels.eyebrow}
            </p>
            <h1 className="domtek-text-shadow mt-6 max-w-[980px] text-foreground md:mt-[38px] text-[42px] font-extrabold leading-[1.05] sm:text-[60px] md:text-[66px] min-[1800px]:text-[74px]">
              {displayTitle}<span className="text-brand">.</span>
            </h1>
            <p className={`mt-7 md:mt-9 ${introTextStyle}`}>{copy.description}</p>
            <Link href="/contact" className={`mt-8 ${buttonStyle}`}>
              {labels.contact}<ArrowRight className="size-4 shrink-0" aria-hidden />
            </Link>
          </div>
        </Container>
      </header>

      <section id="service-insight" aria-labelledby="service-insight-title" className="scroll-mt-32 pb-[76px] md:pb-[114px]">
        <Container size="wide">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.35fr] lg:gap-12">
            <div>
              <p className="flex items-center gap-3 text-muted-foreground text-[14px] font-medium"><span className="h-[3px] w-[34px] shrink-0 bg-brand" aria-hidden />{labels.technicalFocus}</p>
              <h2 id="service-insight-title" className="domtek-text-shadow mt-6 text-[30px] font-extrabold leading-[1.1] sm:text-[36px] min-[1800px]:text-[42px]">{copy.technicalFocus.title}</h2>
              <p className="mt-6 text-muted-foreground text-[15px] font-medium leading-[1.6]">{copy.technicalFocus.intro}</p>
            </div>
            <div className="min-w-0">
              <table className="w-full table-fixed text-left text-[13px] leading-[1.5]">
                <caption className="sr-only">{copy.technicalFocus.title}</caption>
                <thead className="sr-only md:not-sr-only">
                  <tr>
                    {copy.technicalFocus.columns.map((column, index) => <th key={column} scope="col" className={`border-b-2 border-brand pb-4 pr-4 align-bottom text-brand text-xs font-extrabold ${index === 0 ? "w-[25%]" : "w-[37.5%]"}`}>{column}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {copy.technicalFocus.rows.map((row) => (
                    <tr key={row.title} className="grid gap-3 border-b border-border py-5 md:table-row">
                      <th scope="row" className="text-left md:py-5 md:pr-5 md:align-top text-[15px] font-extrabold md:text-[13px]">{row.title}</th>
                      <td className="font-medium text-muted-foreground md:py-5 md:pr-5 md:align-top"><span aria-hidden className="mb-1 block text-brand md:hidden text-xs font-bold">{copy.technicalFocus.columns[1]}</span>{row.why}</td>
                      <td className="font-medium text-muted-foreground md:py-5 md:align-top"><span aria-hidden className="mb-1 block text-brand md:hidden text-xs font-bold">{copy.technicalFocus.columns[2]}</span>{row.check}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      <section id="service-projects" aria-labelledby="service-projects-title" className="scroll-mt-32 bg-white pb-[76px] md:pb-[114px]">
        <Container size="wide">
          {heroProject && (
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
              <Link href={`/projects/${heroProject.id}`} aria-label={`${labels.viewProject} : ${heroProject.title}`} className={`relative block aspect-[4/3] overflow-hidden rounded-[7px] bg-muted ${focusStyle}`}>
                <Image src={heroProject.image} alt={heroProject.imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-5 sm:p-8" />
              </Link>
              <div>
                <p className="flex items-center gap-3 text-muted-foreground text-[14px] font-medium"><span className="h-[3px] w-[34px] bg-brand" aria-hidden />{labels.caseStudy}</p>
                <p className="mt-6 text-brand text-xs font-extrabold">{heroProject.title}</p>
                <h2 id="service-projects-title" className="domtek-text-shadow mt-3 text-[30px] font-extrabold leading-[1.08] sm:text-[38px] min-[1800px]:text-[46px]">{copy.caseStudy.title}</h2>
                <p className="mt-6 text-muted-foreground text-[15px] font-medium leading-[1.55]">{copy.caseStudy.body}</p>
                <Link href={`/projects/${heroProject.id}`} className={`mt-6 md:mt-8 ${buttonStyle}`}>{labels.viewProject}<ArrowRight className="size-4 shrink-0" aria-hidden /></Link>
              </div>
            </div>
          )}
        </Container>
      </section>

      <section aria-label={labels.approach} className="pb-[76px] md:pb-[114px]">
        <Container size="wide" className="max-w-[1400px] px-4 sm:px-6 min-[1800px]:max-w-[1680px]">
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.25fr_1.15fr] lg:items-stretch min-[1800px]:gap-5">
            <section id="service-needs" aria-labelledby="service-needs-title" className="group scroll-mt-32 rounded-[15px] border border-border bg-white p-6 transition-shadow duration-300 hover:shadow-[0_18px_42px_rgba(0,0,0,0.07)] motion-reduce:transition-none min-[1800px]:p-8">
              <span className={`${homeAccentLineStyle} bg-brand`} aria-hidden />
              <h2 id="service-needs-title" className="mt-4 text-[20px] font-extrabold leading-tight">{labels.needs}</h2>
              <p className="mt-5 text-[14px] font-bold leading-[1.4]">{copy.outcome}</p>
              <ul className="mt-6 space-y-4">
                {copy.needs.map((need) => <li key={need} className="flex gap-3 text-muted-foreground text-[13px] font-medium leading-[1.45]"><Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />{need}</li>)}
              </ul>
            </section>

            <section id="service-method" aria-labelledby="service-method-title" className="group relative z-10 scroll-mt-32 rounded-[15px] bg-brand p-6 text-white shadow-[0_24px_42px_rgba(0,0,0,0.18)] transition-shadow duration-300 hover:shadow-[0_34px_70px_rgba(0,0,0,0.28)] motion-reduce:transition-none min-[1800px]:p-8">
              <span className={`${homeAccentLineStyle} bg-white`} aria-hidden />
              <h2 id="service-method-title" className="mt-4 text-[22px] font-extrabold leading-tight">{labels.approach}</h2>
              <p className="mt-5 text-white/95 text-[13px] font-medium leading-[1.5]">{copy.approach}</p>
              <ol className="mt-6 space-y-5 border-t border-white/35 pt-6">
                {copy.steps.map((step, index) => (
                  <li key={step.title} className="flex items-start gap-4">
                    <span className="pt-0.5 tabular-nums text-white/75 text-xs font-extrabold" aria-hidden>{String(index + 1).padStart(2, "0")}</span>
                    <div><h3 className="text-[14px] font-extrabold leading-snug">{step.title}</h3><p className="mt-1.5 text-white/90 text-[13px] leading-[1.4]">{step.body}</p></div>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="service-deliverables" className="group rounded-[15px] border border-border bg-white p-6 transition-shadow duration-300 hover:shadow-[0_18px_42px_rgba(0,0,0,0.07)] motion-reduce:transition-none min-[1800px]:p-8">
              <span className={`${homeAccentLineStyle} bg-brand`} aria-hidden />
              <h2 id="service-deliverables" className="mt-4 text-[20px] font-extrabold leading-tight">{labels.deliverables}</h2>
              <ul className="mt-5 space-y-4">
                {copy.deliverables.map((item) => <li key={item} className="flex gap-3 text-[13px] font-medium leading-[1.45]"><Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />{item}</li>)}
              </ul>
              <p className="mt-6 text-muted-foreground text-[13px] leading-[1.5]">{copy.validation}</p>
              <p className="mt-6 border-t border-border pt-5 text-muted-foreground text-xs leading-[1.5]">{labels.scopeNote}</p>
            </section>
          </div>
        </Container>
      </section>

      <section id="service-faq" aria-labelledby="service-faq-title" className="pb-[38px] md:pb-[57px]">
        <Container size="wide">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.35fr] lg:gap-12">
            <div>
              <h2 id="service-faq-title" className="domtek-text-shadow max-w-sm text-[30px] font-extrabold leading-[1.1] sm:text-[36px]">{labels.faq}<span className="text-brand">.</span></h2>
              <Link href="/expertise#expertise-faq" className={`mt-6 ${buttonStyle}`}>{faqCopy.fullFaqLink}<ArrowRight className="size-4 shrink-0" aria-hidden /></Link>
            </div>
            <FaqSearch questions={copy.faq.map((item, index) => ({ ...item, id: `${service.slug}-${index}`, topic: service.slug }))} topics={[{id: service.slug, label: displayTitle}]} labels={faqCopy.labels} locale={locale} />
          </div>
        </Container>
      </section>

      <section aria-labelledby="service-contact" className="relative overflow-hidden bg-white py-[76px] md:py-[114px]">
        <Image src="/assets/technical-drawing-bottom-2x.webp" alt="" width={2246} height={602} sizes="50vw" className="pointer-events-none absolute right-0 top-8 hidden w-[50vw] max-w-[960px] opacity-60 md:block" />
        <Container size="wide" className="relative z-10">
          <div className="max-w-[700px]">
            <p className="flex items-center gap-3 text-muted-foreground text-[14px] font-medium"><span className="h-[3px] w-[34px] bg-brand" aria-hidden />{labels.briefTitle}</p>
            <h2 id="service-contact" className="domtek-text-shadow mt-6 text-[34px] font-extrabold leading-[1.05] sm:text-[46px] md:text-[52px]"><span className="text-brand">.</span>{copy.ctaTitle}</h2>
            <p className="mt-6 max-w-[500px] text-muted-foreground text-[14px] font-medium leading-[1.5]">{copy.ctaBody}</p>
            <Link href="/contact" className={`mt-7 ${buttonStyle}`}>{labels.contact}<ArrowRight className="size-4 shrink-0" aria-hidden /></Link>
          </div>
        </Container>
      </section>

      <nav aria-label={labels.other} className="pb-[76px]">
        <Container size="wide">
          <h2 className="text-[22px] font-extrabold">{labels.other}</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {services.filter((item) => item.slug !== service.slug).map((item) => (
              <li key={item.slug} className="min-w-0">
                <Link href={`/expertise/${item.slug}`} className={`${secondaryButtonStyle} h-full min-h-[72px] w-full justify-between leading-[1.4]`}>
                  <span>{t(`items.${item.key}.title`)}</span><ArrowRight className="size-4 shrink-0 text-brand" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </article>
  );
}
