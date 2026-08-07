import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/layout/container";
import { getDetailPageCopy } from "@/data/detail-page-copy";
import type { Project } from "@/data/project-types";
import { Link } from "@/i18n/navigation";

export function ProjectDetailPage({
  locale,
  project,
}: {
  locale: string;
  project: Project;
}) {
  const copy = getDetailPageCopy(locale);
  const gallery = Array.from(new Set([project.image, ...(project.gallery ?? [])]));

  return (
    <main className="bg-background pb-24 pt-[132px] md:pt-[152px]">
      <Container size="wide">
        <Link
          href="/projects"
          className="inline-flex items-center gap-3 text-[13px] font-extrabold text-foreground transition-colors hover:text-brand"
        >
          <ArrowLeft className="size-4 text-brand" aria-hidden />
          {copy.backToProjects}
        </Link>

        <article className="mt-9">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] lg:items-center lg:gap-14">
            <div>
              <p className="text-[13px] font-extrabold uppercase tracking-wide text-brand">
                {project.category}
              </p>
              <h1 className="domtek-text-shadow mt-4 text-[42px] font-extrabold leading-[0.98] text-foreground sm:text-[60px]">
                {project.title}<span className="text-brand">.</span>
              </h1>
              <p className="mt-7 max-w-[700px] text-[16px] font-medium leading-[1.55] text-muted-foreground">
                {project.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-muted px-3 py-1.5 text-[11px] font-bold text-muted-foreground">
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
            <section>
              <h2 className="text-[24px] font-extrabold text-foreground">{copy.overview}</h2>
              <p className="mt-5 text-[15px] font-medium leading-[1.7] text-muted-foreground">{project.overview}</p>
            </section>
            {project.scope?.length ? (
              <section>
                <h2 className="text-[24px] font-extrabold text-foreground">{copy.scope}</h2>
                <ul className="mt-5 grid gap-3">
                  {project.scope.map((item) => (
                    <li key={item} className="border-l-2 border-brand pl-4 text-[15px] font-medium leading-[1.55] text-muted-foreground">{item}</li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          {gallery.length > 1 ? (
            <section className="mt-16" aria-labelledby="project-gallery-title">
              <h2 id="project-gallery-title" className="text-[28px] font-extrabold text-foreground">{copy.gallery}</h2>
              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {gallery.map((image, index) => (
                  <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-[7px] border border-border bg-muted">
                    <Image src={image} alt={`${project.title} — ${index + 1}`} fill loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-contain p-3" />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {project.relatedPatents?.length ? (
            <section className="mt-16 border-t border-border pt-10">
              <h2 className="text-[28px] font-extrabold text-foreground">{copy.relatedPatents}</h2>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {project.relatedPatents.map((patent) => (
                  <Link key={patent.patentId} href={`/patents/${patent.patentId.toLowerCase()}`} className="group rounded-[7px] border border-border bg-white p-5 transition-[transform,border-color,box-shadow] hover:-translate-y-0.5 hover:border-brand/35 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
                    <span className="flex items-start justify-between gap-4 text-[12px] font-extrabold text-brand">{patent.publication}<ArrowUpRight className="size-4 shrink-0" aria-hidden /></span>
                    <strong className="mt-3 block text-[15px] leading-tight text-foreground">{patent.title}</strong>
                    <span className="mt-2 block text-[12px] font-medium leading-[1.5] text-muted-foreground">{patent.note}</span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <Link href="/contact" className="mt-14 inline-flex min-h-12 items-center gap-5 rounded-[7px] bg-brand px-6 text-[14px] font-extrabold text-white shadow-[0_10px_24px_rgba(227,6,19,0.2)]">
            {copy.contact}<ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </article>
      </Container>
    </main>
  );
}
