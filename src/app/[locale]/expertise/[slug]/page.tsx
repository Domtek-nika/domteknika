import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

import { Container } from "@/components/layout/container";
import { getProjectBySlug } from "@/data/projects";
import { getServiceCopy } from "@/data/service-copy";
import { getService, services } from "@/data/services";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata, localizedUrl, SITE_URL } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

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
  const projects = service.projects.flatMap((id) => {
    const project = getProjectBySlug(locale, id);
    return project ? [project] : [];
  });
  const url = localizedUrl(locale as Locale, `/expertise/${service.slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: copy.title,
    description: copy.description,
    url,
    provider: { "@id": `${SITE_URL}#organization` },
  };

  return (
    <article className="overflow-hidden bg-background pb-20 pt-[132px] md:pt-[152px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Container size="wide">
        <Link href="/expertise" className="inline-flex min-h-11 items-center gap-3 text-sm font-bold hover:text-brand">
          <ArrowLeft className="size-4 text-brand" aria-hidden />{labels.back}
        </Link>

        <header className="mt-8 grid gap-10 border-b border-border pb-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">DOMTEKNIKA · Switzerland</p>
            <h1 className="domtek-text-shadow mt-5 text-[34px] font-extrabold leading-[1.08] tracking-tight sm:text-[48px] lg:text-[56px]">
              {copy.title}<span className="text-brand">.</span>
            </h1>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">{copy.description}</p>
            <Link href="/contact" className="mt-7 inline-flex min-h-12 items-center gap-4 rounded-[7px] bg-brand px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-brand/90">
              {labels.contact}<ArrowUpRight className="size-4 shrink-0" aria-hidden />
            </Link>
          </div>
        </header>

        <div className="grid gap-10 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <section aria-labelledby="service-approach">
            <h2 id="service-approach" className="text-2xl font-extrabold">{labels.approach}</h2>
            <p className="mt-5 text-[15px] leading-[1.75] text-muted-foreground">{copy.approach}</p>
            <p className="mt-4 text-[15px] leading-[1.75] text-muted-foreground">{copy.validation}</p>
          </section>
          <section className="rounded-[7px] border border-border bg-muted/40 p-6 sm:p-8" aria-labelledby="service-deliverables">
            <h2 id="service-deliverables" className="text-xl font-extrabold">{labels.deliverables}</h2>
            <ul className="mt-6 space-y-5">
              {copy.deliverables.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />{item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="border-t border-border pt-10" aria-labelledby="service-projects">
          <h2 id="service-projects" className="text-[28px] font-extrabold">{labels.projects}</h2>
          <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`} className="group overflow-hidden rounded-[7px] border border-border bg-white transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
                <div className="relative aspect-[4/3] bg-muted/40">
                  <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-contain p-6 transition-transform group-hover:scale-[1.03]" />
                </div>
                <div className="p-6">
                  <h3 className="flex items-start justify-between gap-3 text-lg font-extrabold">{project.title}<ArrowUpRight className="mt-1 size-4 shrink-0 text-brand" aria-hidden /></h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-[7px] border-l-4 border-brand bg-muted/40 p-6 sm:p-9" aria-labelledby="service-contact">
          <h2 id="service-contact" className="text-2xl font-extrabold">{labels.ctaTitle}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{labels.ctaBody}</p>
          <Link href="/contact" className="mt-5 inline-flex min-h-11 items-center gap-3 font-bold text-brand hover:underline">{labels.contact}<ArrowRight className="size-4" aria-hidden /></Link>
        </section>

        <nav aria-label={labels.other} className="mt-12 border-t border-border pt-8">
          <h2 className="text-lg font-extrabold">{labels.other}</h2>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
            {services.filter((item) => item.slug !== service.slug).map((item) => (
              <li key={item.slug}><Link href={`/expertise/${item.slug}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-muted-foreground hover:text-brand">{items[item.slug].title}<ArrowRight className="size-4 shrink-0" aria-hidden /></Link></li>
            ))}
          </ul>
        </nav>
      </Container>
    </article>
  );
}
