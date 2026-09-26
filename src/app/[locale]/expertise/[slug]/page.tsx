import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, LockKeyhole, Plus } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Container } from "@/components/layout/container";
import { getProjectBySlug } from "@/data/projects";
import { getServiceCopy } from "@/data/service-copy";
import { getService, serviceReferences, services } from "@/data/services";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata, localizedUrl, SITE_URL } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

const focusStyle = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand";
const buttonStyle = `inline-flex min-h-11 items-center justify-between gap-4 rounded-[7px] bg-brand px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_4px_10px_rgba(0,0,0,0.28)] transition-transform motion-safe:hover:-translate-y-0.5 ${focusStyle}`;

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
  const reference = serviceReferences[service.slug];
  const t = await getTranslations({ locale, namespace: "ExpertisePage.Services" });
  const displayTitle = t(`items.${service.key}.title`);
  const projects = service.projects.flatMap((id) => {
    const project = getProjectBySlug(locale, id);
    return project ? [project] : [];
  });
  const heroProject = projects[0];
  const path = `/expertise/${service.slug}`;
  const url = localizedUrl(locale as Locale, path);
  const sections = [
    { id: "service-insight", label: labels.technicalFocus },
    { id: "service-projects", label: labels.projects },
    { id: "service-method", label: labels.method },
    { id: "service-faq", label: labels.faq },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: copy.title,
        description: copy.description,
        url,
        provider: { "@id": `${SITE_URL}#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: labels.back, item: localizedUrl(locale as Locale, "/expertise") },
          { "@type": "ListItem", position: 2, name: copy.title, item: url },
        ],
      },
    ],
  };

  return (
    <article className="bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <header className="relative overflow-hidden pb-10 pt-[112px] md:pb-14 md:pt-[152px]">
        <Image src="/assets/expertise-page/image-fond-top.png" alt="" width={1351} height={421} sizes="100vw" className="pointer-events-none absolute right-[-10%] top-[112px] w-[85vw] max-w-[1150px] opacity-45 md:w-[70vw]" />
        <Container size="wide" className="relative z-10">
          <Link href="/expertise" className={`inline-flex min-h-11 items-center gap-3 text-[13px] font-extrabold transition-colors hover:text-brand ${focusStyle}`}>
            <ArrowLeft className="size-4 text-brand" aria-hidden />{labels.back}
          </Link>
          <div className="mt-6 grid gap-5 md:mt-9 md:gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-14">
            <div>
              <p className="flex items-center gap-3 text-[15px] font-medium text-muted-foreground">
                <span className="h-[3px] w-[34px] shrink-0 bg-brand" aria-hidden />{labels.eyebrow}
              </p>
              <h1 className="domtek-text-shadow mt-5 text-[42px] font-extrabold leading-[1.05] text-foreground sm:text-[60px] md:mt-8 md:text-[66px] min-[1800px]:text-[74px]">
                {displayTitle}<span className="text-brand">.</span>
              </h1>
            </div>
            <div>
              <p className="max-w-[520px] text-[15px] font-medium leading-[1.5] text-muted-foreground min-[1800px]:text-[18px]">{copy.description}</p>
              <Link href="/contact" className={`mt-7 ${buttonStyle}`}>
                {labels.contact}<ArrowRight className="size-4 shrink-0" aria-hidden />
              </Link>
            </div>
          </div>
          <nav aria-label={labels.onThisPage} className="mt-5 grid grid-cols-2 gap-x-4 md:mt-8 sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-1">
            {sections.map(({ id, label }) => (
              <a key={id} href={`#${id}`} className={`inline-flex min-h-11 items-center gap-2 text-[11px] font-bold text-muted-foreground transition-colors hover:text-brand sm:text-xs ${focusStyle}`}>
                {label}<ArrowRight className="size-3 shrink-0 text-brand" aria-hidden />
              </a>
            ))}
          </nav>
        </Container>
      </header>

      <section id="service-insight" aria-labelledby="service-insight-title" className="scroll-mt-32 pb-16 md:pb-24">
        <Container size="wide">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.35fr] lg:gap-12">
            <div>
              <p className="flex items-center gap-3 text-[14px] font-medium text-muted-foreground"><span className="h-[3px] w-[34px] shrink-0 bg-brand" aria-hidden />{labels.technicalFocus}</p>
              <h2 id="service-insight-title" className="domtek-text-shadow mt-6 text-[30px] font-extrabold leading-[1.1] sm:text-[36px] min-[1800px]:text-[42px]">{copy.technicalFocus.title}</h2>
              <p className="mt-6 text-[15px] font-medium leading-[1.6] text-muted-foreground">{copy.technicalFocus.intro}</p>
            </div>
            <div className="min-w-0">
              <table className="w-full table-fixed text-left text-[13px] leading-[1.5]">
                <caption className="sr-only">{copy.technicalFocus.title}</caption>
                <thead className="sr-only md:not-sr-only">
                  <tr>
                    {copy.technicalFocus.columns.map((column, index) => <th key={column} scope="col" className={`border-b-2 border-brand pb-4 pr-4 align-bottom text-xs font-extrabold text-brand ${index === 0 ? "w-[25%]" : "w-[37.5%]"}`}>{column}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {copy.technicalFocus.rows.map((row) => (
                    <tr key={row.title} className="grid gap-3 border-b border-border py-5 md:table-row">
                      <th scope="row" className="text-left text-[15px] font-extrabold md:py-5 md:pr-5 md:align-top md:text-[13px]">{row.title}</th>
                      <td className="font-medium text-muted-foreground md:py-5 md:pr-5 md:align-top"><span aria-hidden className="mb-1 block text-xs font-bold text-brand md:hidden">{copy.technicalFocus.columns[1]}</span>{row.why}</td>
                      <td className="font-medium text-muted-foreground md:py-5 md:align-top"><span aria-hidden className="mb-1 block text-xs font-bold text-brand md:hidden">{copy.technicalFocus.columns[2]}</span>{row.check}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-5 text-[11px] leading-relaxed text-muted-foreground">{labels.reference} : <a href={reference.url} className={`font-bold underline underline-offset-4 hover:text-brand ${focusStyle}`}>{reference.title}</a></p>
            </div>
          </div>
          <div className="mt-9 max-w-[900px] border-l-[3px] border-brand pl-5">
            <h3 className="text-xs font-extrabold text-brand">{labels.takeaway}</h3>
            <p className="mt-2 text-[14px] font-medium leading-[1.6]">{copy.technicalFocus.takeaway}</p>
          </div>
        </Container>
      </section>

      <section id="service-projects" aria-labelledby="service-projects-title" className="scroll-mt-32 bg-white pb-16 md:pb-24">
        <Container size="wide">
          {heroProject && (
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
              <Link href={`/projects/${heroProject.id}`} aria-label={`${labels.viewProject} : ${heroProject.title}`} className={`relative block aspect-[4/3] overflow-hidden rounded-[7px] bg-muted ${focusStyle}`}>
                <Image src={heroProject.image} alt={heroProject.imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-5 sm:p-8" />
              </Link>
              <div>
                <p className="flex items-center gap-3 text-[14px] font-medium text-muted-foreground"><span className="h-[3px] w-[34px] bg-brand" aria-hidden />{labels.caseStudy}</p>
                <p className="mt-6 text-xs font-extrabold text-brand">{heroProject.title}</p>
                <h2 id="service-projects-title" className="domtek-text-shadow mt-3 text-[30px] font-extrabold leading-[1.08] sm:text-[38px] min-[1800px]:text-[46px]">{copy.caseStudy.title}</h2>
                <p className="mt-6 text-[15px] font-medium leading-[1.55] text-muted-foreground">{copy.caseStudy.body}</p>
                <Link href={`/projects/${heroProject.id}`} className={`mt-5 inline-flex min-h-11 items-center gap-4 text-[13px] font-bold text-brand hover:underline ${focusStyle}`}>{labels.viewProject}<ArrowUpRight className="size-4" aria-hidden /></Link>
              </div>
            </div>
          )}
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {projects.slice(1).map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`} className={`group grid min-w-0 grid-cols-[100px_1fr] gap-4 rounded-[7px] border border-border bg-white p-4 transition-shadow hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] sm:grid-cols-[120px_1fr] ${focusStyle}`}>
                <div className="relative aspect-square self-start rounded-[7px] bg-muted/60"><Image src={project.image} alt={project.imageAlt} fill sizes="120px" className="object-contain p-2" /></div>
                <div className="min-w-0"><h3 className="text-[14px] font-extrabold leading-tight">{project.title}</h3><p className="mt-2 text-xs font-medium leading-[1.45] text-muted-foreground">{project.scope?.[0] ?? project.description}</p><span className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-brand">{labels.viewProject}<ArrowUpRight className="size-3.5" aria-hidden /></span></div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section aria-label={labels.approach} className="pb-16 md:pb-24">
        <Container size="wide" className="max-w-[1400px] px-4 sm:px-6 min-[1800px]:max-w-[1680px]">
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.25fr_1.15fr] lg:items-stretch min-[1800px]:gap-5">
            <section id="service-needs" aria-labelledby="service-needs-title" className="scroll-mt-32 rounded-[15px] border border-border bg-white p-6 min-[1800px]:p-8">
              <span className="block h-[3px] w-[34px] bg-brand" aria-hidden />
              <h2 id="service-needs-title" className="mt-4 text-[20px] font-extrabold leading-tight">{labels.needs}</h2>
              <p className="mt-5 text-[14px] font-bold leading-[1.4]">{copy.outcome}</p>
              <ul className="mt-6 space-y-4">
                {copy.needs.map((need) => <li key={need} className="flex gap-3 text-[13px] font-medium leading-[1.45] text-muted-foreground"><Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />{need}</li>)}
              </ul>
            </section>

            <section id="service-method" aria-labelledby="service-method-title" className="relative z-10 scroll-mt-32 rounded-[15px] bg-brand p-6 text-white shadow-[0_24px_42px_rgba(0,0,0,0.18)] min-[1800px]:p-8">
              <span className="block h-[3px] w-[34px] bg-white" aria-hidden />
              <h2 id="service-method-title" className="mt-4 text-[22px] font-extrabold leading-tight">{labels.approach}</h2>
              <p className="mt-5 text-[13px] font-medium leading-[1.5] text-white/95">{copy.approach}</p>
              <ol className="mt-6 space-y-5 border-t border-white/35 pt-6">
                {copy.steps.map((step, index) => (
                  <li key={step.title} className="flex items-start gap-4">
                    <span className="pt-0.5 text-xs font-extrabold tabular-nums text-white/75" aria-hidden>{String(index + 1).padStart(2, "0")}</span>
                    <div><h3 className="text-[14px] font-extrabold leading-snug">{step.title}</h3><p className="mt-1.5 text-[13px] leading-[1.4] text-white/90">{step.body}</p></div>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="service-deliverables" className="rounded-[15px] border border-border bg-white p-6 min-[1800px]:p-8">
              <span className="block h-[3px] w-[34px] bg-brand" aria-hidden />
              <h2 id="service-deliverables" className="mt-4 text-[20px] font-extrabold leading-tight">{labels.deliverables}</h2>
              <ul className="mt-5 space-y-4">
                {copy.deliverables.map((item) => <li key={item} className="flex gap-3 text-[13px] font-medium leading-[1.45]"><Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />{item}</li>)}
              </ul>
              <p className="mt-6 text-[13px] leading-[1.5] text-muted-foreground">{copy.validation}</p>
              <p className="mt-6 border-t border-border pt-5 text-xs leading-[1.5] text-muted-foreground">{labels.scopeNote}</p>
            </section>
          </div>
        </Container>
      </section>

      <section id="service-faq" aria-labelledby="service-faq-title" className="scroll-mt-32 pb-8 md:pb-12">
        <Container size="wide">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.35fr] lg:gap-12">
            <h2 id="service-faq-title" className="domtek-text-shadow max-w-sm text-[30px] font-extrabold leading-[1.1] sm:text-[36px]">{labels.faq}<span className="text-brand">.</span></h2>
            <div className="border-t border-border">
              {copy.faq.map(({ question, answer }) => (
                <details key={question} className="group border-b border-border">
                  <summary className={`flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-[14px] font-bold leading-relaxed [&::-webkit-details-marker]:hidden ${focusStyle}`}>
                    {question}<Plus className="size-5 shrink-0 text-brand transition-transform group-open:rotate-45 motion-reduce:transition-none" aria-hidden />
                  </summary>
                  <p className="max-w-3xl pb-6 pr-7 text-[14px] font-medium leading-[1.55] text-muted-foreground">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="service-contact" className="relative overflow-hidden bg-white py-16 md:py-24">
        <Image src="/assets/technical-drawing-bottom-2x.webp" alt="" width={2246} height={602} sizes="50vw" className="pointer-events-none absolute right-0 top-8 hidden w-[50vw] max-w-[960px] opacity-60 md:block" />
        <Container size="wide" className="relative z-10">
          <div className="max-w-[700px]">
            <p className="flex items-center gap-3 text-[14px] font-medium text-muted-foreground"><span className="h-[3px] w-[34px] bg-brand" aria-hidden />{labels.briefTitle}</p>
            <h2 id="service-contact" className="domtek-text-shadow mt-6 text-[34px] font-extrabold leading-[1.05] sm:text-[46px] md:text-[52px]"><span className="text-brand">.</span>{copy.ctaTitle}</h2>
            <p className="mt-6 max-w-[500px] text-[14px] font-medium leading-[1.5] text-muted-foreground">{labels.ctaBody}</p>
            <ul className="mt-5 max-w-[500px] space-y-2.5">
              {labels.brief.map((item) => <li key={item} className="flex gap-3 text-[12px] font-medium leading-[1.45] text-muted-foreground"><Check className="mt-0.5 size-3.5 shrink-0 text-brand" aria-hidden />{item}</li>)}
            </ul>
            <Link href="/contact" className={`mt-7 ${buttonStyle}`}>{labels.contact}<ArrowRight className="size-4 shrink-0" aria-hidden /></Link>
            <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground"><LockKeyhole className="mt-0.5 size-3 shrink-0 text-brand" aria-hidden />{labels.confidentiality}</p>
          </div>
        </Container>
      </section>

      <nav aria-label={labels.other} className="pb-16">
        <Container size="wide">
          <h2 className="text-[16px] font-extrabold">{labels.other}</h2>
          <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-1">
            {services.filter((item) => item.slug !== service.slug).map((item) => (
              <li key={item.slug}><Link href={`/expertise/${item.slug}`} className={`inline-flex min-h-11 items-center gap-2 text-[12px] font-bold text-muted-foreground transition-colors hover:text-brand ${focusStyle}`}>{items[item.slug].title}<ArrowRight className="size-3.5 shrink-0 text-brand" aria-hidden /></Link></li>
            ))}
          </ul>
        </Container>
      </nav>
    </article>
  );
}
