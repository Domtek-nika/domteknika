import { ArrowLeft, ExternalLink } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/layout/container";
import { RelatedProjectCard } from "@/components/sections/related-project-card";
import { getDetailPageCopy } from "@/data/detail-page-copy";
import type { ProjectLink } from "@/data/project-types";
import type { PatentDetail, PatentRecord } from "@/data/patents";
import { Link } from "@/i18n/navigation";

export function PatentDetailPage({
  detail,
  linkedProjects,
  locale,
  patent,
}: {
  detail: PatentDetail | null;
  linkedProjects: ProjectLink[];
  locale: string;
  patent: PatentRecord;
}) {
  const copy = getDetailPageCopy(locale);
  const sourceLinks = Object.entries(patent.links).filter(
    (entry): entry is [string, string] => Boolean(entry[1]),
  );

  return (
    <main className="bg-background pb-24 pt-[132px] md:pt-[152px]">
      <Container size="wide">
        <Link
          href="/patents"
          className="inline-flex items-center gap-3 text-[13px] font-extrabold text-foreground transition-colors hover:text-brand"
        >
          <ArrowLeft className="size-4 text-brand" aria-hidden />
          {copy.backToPatents}
        </Link>

        <article className="mt-9">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:items-center lg:gap-14">
            <div>
              <p className="text-[13px] font-extrabold uppercase tracking-wide text-brand">
                {patent.publication}
              </p>
              <h1 className="domtek-text-shadow mt-4 max-w-[900px] break-words text-[36px] font-extrabold leading-[1.02] text-foreground sm:text-[52px]">
                {patent.title}
                <span className="text-brand">.</span>
              </h1>
              <p className="mt-7 max-w-[900px] text-[15px] font-medium leading-[1.65] text-muted-foreground">
                {patent.abstract}
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-border bg-[#f7f7f7] shadow-[0_20px_56px_rgba(0,0,0,0.08)]">
              {patent.coverImage ? (
                <Image
                  src={patent.coverImage}
                  alt={`${patent.publication} — ${patent.title}`}
                  fill
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-contain p-5 md:p-8"
                />
              ) : null}
            </div>
          </div>

          <dl className="mt-12 grid overflow-hidden rounded-[7px] border border-border bg-white sm:grid-cols-2 lg:grid-cols-3">
            <PatentFact label={copy.publication} value={patent.publication} />
            <PatentFact label={copy.publicationDate} value={patent.date} />
            <PatentFact label={copy.priorityDate} value={patent.priorityDate} />
            <PatentFact label={copy.inventors} value={patent.inventors} wide />
            <PatentFact
              label={copy.applicants}
              value={patent.applicants}
              wide
            />
            <PatentFact
              label={copy.classification}
              value={patent.classification}
              wide
            />
          </dl>

          {patent.publicationAliases.length > 1 ? (
            <section className="mt-12">
              <h2 className="text-[24px] font-extrabold text-foreground">
                {copy.family}
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {patent.publicationAliases.map((alias) => (
                  <Link
                    key={alias}
                    href={`/patents/${alias.replace(/[^a-z0-9]/gi, "").toLowerCase()}`}
                    className="rounded-full border border-border bg-white px-3 py-1.5 text-[11px] font-bold text-muted-foreground transition-colors hover:border-brand hover:text-brand"
                  >
                    {alias}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {linkedProjects.length ? (
            <section className="mt-12">
              <div className="flex items-center gap-3">
                <span className="size-2.5 bg-brand" aria-hidden />
                <h2 className="text-[24px] font-extrabold text-foreground">
                  {copy.relatedProjects}
                </h2>
              </div>
              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                {linkedProjects.map((project, index) => (
                  <RelatedProjectCard
                    key={project.id}
                    actionLabel={copy.openProject}
                    eager={index === 0}
                    project={project}
                  />
                ))}
              </div>
            </section>
          ) : null}

          {patent.images.length ? (
            <section className="mt-14">
              <h2 className="text-[28px] font-extrabold text-foreground">
                {copy.gallery}
              </h2>
              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {patent.images.slice(0, 12).map((image, index) => (
                  <div
                    key={image.href}
                    className="relative aspect-[4/3] overflow-hidden rounded-[7px] border border-border bg-[#f7f7f7]"
                  >
                    <Image
                      src={image.href}
                      alt={`${patent.publication} — ${index + 1}`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-3"
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {detail?.descriptionParagraphs.length ? (
            <TextSection
              title={copy.description}
              paragraphs={detail.descriptionParagraphs.slice(0, 16)}
            />
          ) : null}
          {detail?.claims.length ? (
            <TextSection
              title={copy.claims}
              paragraphs={detail.claims}
              ordered
            />
          ) : null}

          {sourceLinks.length ? (
            <section className="mt-14 border-t border-border pt-10">
              <h2 className="text-[28px] font-extrabold text-foreground">
                {copy.sources}
              </h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {sourceLinks.map(([key, href]) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center gap-3 rounded-[7px] border border-border bg-white px-4 text-[12px] font-extrabold text-foreground transition-colors hover:border-brand hover:text-brand"
                  >
                    {copy.openSource}: {key}
                    <ExternalLink className="size-3.5" aria-hidden />
                  </a>
                ))}
              </div>
            </section>
          ) : null}
        </article>
      </Container>
    </main>
  );
}

function PatentFact({
  label,
  value,
  wide = false,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`border-b border-r border-border p-5 ${wide ? "sm:col-span-2 lg:col-span-3" : ""}`}
    >
      <dt className="text-[10px] font-extrabold uppercase tracking-wide text-brand">
        {label}
      </dt>
      <dd className="mt-2 break-words text-[12px] font-medium leading-[1.5] text-muted-foreground">
        {value || "—"}
      </dd>
    </div>
  );
}

function TextSection({
  ordered = false,
  paragraphs,
  title,
}: {
  ordered?: boolean;
  paragraphs: string[];
  title: string;
}) {
  return (
    <section className="mt-14 border-t border-border pt-10">
      <h2 className="text-[28px] font-extrabold text-foreground">{title}</h2>
      {ordered ? (
        <ol className="mt-6 grid max-w-[1000px] list-decimal gap-4 pl-5">
          {paragraphs.map((paragraph, index) => (
            <li
              key={`${index}-${paragraph.slice(0, 28)}`}
              className="pl-2 text-[14px] font-medium leading-[1.7] text-muted-foreground"
            >
              {paragraph}
            </li>
          ))}
        </ol>
      ) : (
        <div className="mt-6 grid max-w-[1000px] gap-4">
          {paragraphs.map((paragraph, index) => (
            <p
              key={`${index}-${paragraph.slice(0, 28)}`}
              className="text-[14px] font-medium leading-[1.7] text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}
