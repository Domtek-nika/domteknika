import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/providers/reveal";
import { getDetailPageCopy } from "@/data/detail-page-copy";
import type { Project } from "@/data/project-types";
import { Link } from "@/i18n/navigation";
import { getProjectServices } from "@/data/services";
import { getServiceCopy } from "@/data/service-copy";
import { RELATED_CARD_MOTION_CLASS } from "@/lib/related-card-motion";

export function ProjectDetailPage({
  locale,
  project,
}: {
  locale: string;
  project: Project;
}) {
  const copy = getDetailPageCopy(locale);
  const serviceCopy = getServiceCopy(locale);
  const relatedServices = getProjectServices(project.id);
  const gallery = Array.from(new Set([project.image, ...(project.gallery ?? [])]));

  return (
    <div className="bg-background pb-24 pt-[132px] md:pt-[152px]">
      <Container size="wide">
        <Link
          href="/projects"
          className="inline-flex min-h-11 items-center justify-between gap-4 rounded-[7px] bg-brand px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_4px_10px_rgba(0,0,0,0.28)] transition-[transform,background-color] hover:bg-primary/80 motion-safe:hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          <ArrowLeft className="size-4 shrink-0" aria-hidden />
          {copy.backToProjects}
        </Link>

        <article className="mt-9">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] lg:items-center lg:gap-14">
            <div>
              <p className="uppercase text-brand text-[13px] font-extrabold tracking-wide">
                {project.category}
              </p>
              <h1 className="domtek-text-shadow mt-4 text-foreground text-[42px] font-extrabold leading-[0.98] sm:text-[60px]">
                {project.title}<span className="text-brand">.</span>
              </h1>
              <p className="mt-7 max-w-[700px] text-muted-foreground text-[16px] font-medium leading-[1.55]">
                {project.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-muted px-3 py-1.5 text-muted-foreground text-[11px] font-bold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-border bg-muted shadow-[0_20px_56px_rgba(0,0,0,0.08)]">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 54vw"
                className="object-contain p-5 md:p-8"
              />
            </div>
          </div>

          <div className="mt-14 grid gap-10 border-t border-border pt-10 lg:grid-cols-2 lg:gap-16">
            <Reveal initiallyHidden as="section">
              <h2 className="text-foreground text-[24px] font-extrabold">{copy.overview}</h2>
              <p className="mt-5 text-muted-foreground text-[15px] font-medium leading-[1.7]">{project.overview}</p>
            </Reveal>
            {project.scope?.length ? (
              <Reveal initiallyHidden as="section" delay={0.08}>
                <h2 className="text-foreground text-[24px] font-extrabold">{copy.scope}</h2>
                <ul className="mt-5 grid gap-3">
                  {project.scope.map((item) => (
                    <li key={item} className="border-l-2 border-brand pl-4 text-muted-foreground text-[15px] font-medium leading-[1.55]">{item}</li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
          </div>

          {gallery.length > 1 ? (
            <section className="mt-16" aria-labelledby="project-gallery-title">
              <Reveal initiallyHidden><h2 id="project-gallery-title" className="text-foreground text-[28px] font-extrabold">{copy.gallery}</h2></Reveal>
              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {gallery.map((image, index) => (
                  <Reveal initiallyHidden key={image} delay={(index % 3) * 0.08} className="relative aspect-[4/3] overflow-hidden rounded-[7px] border border-border bg-muted">
                    <Image src={image} alt={`${project.title} — ${index + 1}`} fill loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-contain p-3" />
                  </Reveal>
                ))}
              </div>
            </section>
          ) : null}

          {project.relatedPatents?.length ? (
            <Reveal initiallyHidden as="section" className="mt-16 border-t border-border pt-10">
              <h2 className="text-foreground text-[28px] font-extrabold">{copy.relatedPatents}</h2>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {project.relatedPatents.map((patent) => (
                  <Link key={patent.patentId} href={`/patents/${patent.patentId.toLowerCase()}`} className={`group rounded-[7px] border border-border bg-white p-5 ${RELATED_CARD_MOTION_CLASS}`}>
                    <span className="flex items-start justify-between gap-4 text-brand text-[12px] font-extrabold">{patent.publication}<ArrowUpRight className="size-4 shrink-0" aria-hidden /></span>
                    <strong className="mt-3 block text-foreground text-[15px] leading-tight">{patent.title}</strong>
                    <span className="mt-2 block text-muted-foreground text-[12px] font-medium leading-[1.5]">{patent.note}</span>
                  </Link>
                ))}
              </div>
            </Reveal>
          ) : null}

          {relatedServices.length > 0 ? (
            <Reveal initiallyHidden as="section" className="mt-12 border-t border-border pt-8">
              <h2 className="text-2xl font-extrabold">{serviceCopy.labels.related}</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {relatedServices.map((service) => (
                  <li key={service.slug} className="min-w-0">
                    <Link href={`/expertise/${service.slug}`} className="inline-flex h-full min-h-[72px] w-full items-center justify-between gap-3 rounded-[7px] border border-border bg-white px-4 py-3 text-[13px] font-bold leading-[1.4] text-foreground shadow-[0_2px_6px_rgba(0,0,0,0.05)] transition-[translate,border-color,box-shadow] duration-500 motion-safe:hover:-translate-y-1 hover:border-brand/35 hover:shadow-[0_12px_26px_rgba(0,0,0,0.09)] active:border-brand focus-visible:border-brand motion-reduce:transition-none [transition-timing-function:var(--ease-smooth)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
                      <span>{serviceCopy.items[service.slug].title}</span><ArrowRight className="size-4 shrink-0 text-brand" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}

          <Reveal initiallyHidden className="mt-14">
            <Link href="/contact" className="inline-flex min-h-12 items-center gap-5 rounded-[7px] bg-brand px-6 py-3 text-[14px] font-extrabold text-white shadow-[0_10px_24px_rgba(227,6,19,0.2)]">
              {serviceCopy.labels.contact}<ArrowUpRight className="size-4 shrink-0" aria-hidden />
            </Link>
          </Reveal>
        </article>
      </Container>
    </div>
  );
}
