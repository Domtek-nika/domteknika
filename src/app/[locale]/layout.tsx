import type { Metadata } from "next";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import { domtekSans } from "@/app/domtek-font";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AnalyticsConsent } from "@/components/providers/analytics-consent";
import { RouteRecovery } from "@/components/providers/route-recovery";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import {
  buildPageMetadata,
  organizationJsonLd,
  SITE_URL,
} from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    metadataBase: SITE_URL,
    ...buildPageMetadata({
      description: t("description"),
      locale,
      title: t("title"),
    }),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const htmlLang = locale === "zh" ? "zh-Hans" : locale;
  const jsonLd = organizationJsonLd(locale);

  return (
    <html
      lang={htmlLang}
      data-scroll-behavior="smooth"
      className={`${domtekSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <NextIntlClientProvider>
          <AnalyticsConsent />
          <SmoothScrollProvider>
            <RouteRecovery />
            <Navbar />
            <main className="relative">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
