import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PatentPageContent, PatentPageCta } from "@/components/sections/patent-page-content";
import { getPatentProjectLinks } from "@/data/projects";
import { buildPageMetadata } from "@/lib/seo";
import { getLocalizedPatents } from "@/data/patent-lookup";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PatentPage.Meta" });

  return buildPageMetadata({
    description: t("description"),
    locale,
    path: "/patents",
    title: t("title"),
  });
}

export default async function PatentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const linkedProjectsByPatent = getPatentProjectLinks(locale);

  return (
    <>
      <PatentPageContent
        linkedProjectsByPatent={linkedProjectsByPatent}
        locale={locale}
        localizedPatents={getLocalizedPatents(locale)}
      />
      <PatentPageCta locale={locale} />
    </>
  );
}
