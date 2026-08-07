import { readFile } from "node:fs/promises";
import path from "node:path";

import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { PatentDetailPage } from "@/components/sections/patent-detail-page";
import {
  getCanonicalPatentSlugs,
  getPatentByPublication,
  normalizePublication,
} from "@/data/patent-lookup";
import type { PatentDetail } from "@/data/patents";
import { getPatentProjectLinks } from "@/data/projects";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata, localizedUrl, SITE_URL } from "@/lib/seo";

export function generateStaticParams() {
  return getCanonicalPatentSlugs().map((publication) => ({ publication }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; publication: string }>;
}): Promise<Metadata> {
  const { locale, publication } = await params;
  const patent = getPatentByPublication(locale, publication);
  if (!patent) return {};

  return buildPageMetadata({
    description: patent.abstract,
    image: patent.coverImage ?? undefined,
    imageAlt: `${patent.publication} — ${patent.title}`,
    locale,
    path: `/patents/${patent.id.toLowerCase()}`,
    title: `${patent.title} — ${patent.publication}`,
  });
}

async function loadPatentDetail(detailPath: string) {
  try {
    const absolutePath = path.join(process.cwd(), "public", detailPath);
    return JSON.parse(await readFile(absolutePath, "utf8")) as PatentDetail;
  } catch {
    return null;
  }
}

export default async function PatentPage({
  params,
}: {
  params: Promise<{ locale: string; publication: string }>;
}) {
  const { locale, publication } = await params;
  setRequestLocale(locale);
  const patent = getPatentByPublication(locale, publication);
  if (!patent) notFound();

  const canonicalSlug = patent.id.toLowerCase();
  if (normalizePublication(publication) !== normalizePublication(patent.id)) {
    permanentRedirect(`/${locale}/patents/${canonicalSlug}`);
  }

  const [detail, linkedProjectsByPatent] = await Promise.all([
    loadPatentDetail(patent.detailPath),
    Promise.resolve(getPatentProjectLinks(locale)),
  ]);
  const url = localizedUrl(locale as Locale, `/patents/${canonicalSlug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: patent.title,
    description: patent.abstract,
    datePublished: patent.date,
    image: patent.coverImage
      ? new URL(patent.coverImage, SITE_URL).toString()
      : undefined,
    url,
    author: { "@id": `${SITE_URL}#organization` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PatentDetailPage
        detail={detail}
        linkedProjects={linkedProjectsByPatent[patent.id] ?? []}
        locale={locale}
        patent={patent}
      />
    </>
  );
}
