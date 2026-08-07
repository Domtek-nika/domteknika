import type { Metadata } from "next";

import { locales, type Locale } from "@/i18n/routing";

export const SITE_URL = new URL("https://domteknika.ch");

export const INDEXABLE_ROUTES = [
  "",
  "/projects",
  "/expertise",
  "/patents",
  "/our-story",
  "/contact",
  "/legal-notice",
  "/privacy-policy",
] as const;

const OPEN_GRAPH_LOCALES: Record<Locale, string> = {
  de: "de_CH",
  en: "en_US",
  es: "es_ES",
  fr: "fr_CH",
  ko: "ko_KR",
  zh: "zh_CN",
};

const HREF_LANGS: Record<Locale, string> = {
  de: "de",
  en: "en",
  es: "es",
  fr: "fr",
  ko: "ko",
  zh: "zh-Hans",
};

type PageMetadataInput = {
  description: string;
  image?: string;
  imageAlt?: string;
  locale: string;
  path?: string;
  title: string;
};

export function buildPageMetadata({
  description,
  image: imagePath,
  imageAlt,
  locale,
  path = "",
  title,
}: PageMetadataInput): Metadata {
  const resolvedLocale = resolveLocale(locale);
  const canonical = localizedUrl(resolvedLocale, path);
  const image = new URL(imagePath ?? "/social-image", SITE_URL).toString();

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "DOMTEKNIKA",
      locale: OPEN_GRAPH_LOCALES[resolvedLocale],
      alternateLocale: locales
        .filter((candidate) => candidate !== resolvedLocale)
        .map((candidate) => OPEN_GRAPH_LOCALES[candidate]),
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt:
            imageAlt ??
            "DOMTEKNIKA — Engineering, prototyping and production",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function languageAlternates(path = "") {
  const alternates: Record<string, string> = {
    "x-default": localizedUrl("en", path),
  };

  for (const locale of locales) {
    alternates[HREF_LANGS[locale]] = localizedUrl(locale, path);
  }

  return alternates;
}

export function localizedUrl(locale: Locale, path = "") {
  const normalizedPath = path && path.startsWith("/") ? path : `/${path}`;
  return new URL(`/${locale}${path ? normalizedPath : ""}`, SITE_URL).toString();
}

export function organizationJsonLd(locale: string) {
  const resolvedLocale = resolveLocale(locale);
  const localeUrl = localizedUrl(resolvedLocale);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": `${SITE_URL}#organization`,
        "@type": ["Organization", "ProfessionalService"],
        name: "DOMTEKNIKA SA",
        url: SITE_URL.toString(),
        logo: new URL("/assets/domteknika-logo.png", SITE_URL).toString(),
        image: new URL("/social-image", SITE_URL).toString(),
        email: "contact@domteknika.ch",
        telephone: "+41 32 751 71 46",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Chem. de Saint-Joux 16B",
          postalCode: "2520",
          addressLocality: "La Neuveville",
          addressCountry: "CH",
        },
        areaServed: "Worldwide",
        knowsAbout: [
          "Product engineering",
          "Prototyping",
          "Industrial design",
          "Simulation",
          "Electronics integration",
          "Production engineering",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "business enquiries",
          email: "contact@domteknika.ch",
          telephone: "+41 32 751 71 46",
          availableLanguage: ["de", "en", "es", "fr", "ko", "zh"],
        },
      },
      {
        "@id": `${SITE_URL}#website`,
        "@type": "WebSite",
        name: "DOMTEKNIKA",
        url: localeUrl,
        inLanguage: HREF_LANGS[resolvedLocale],
        publisher: {
          "@id": `${SITE_URL}#organization`,
        },
      },
    ],
  };
}

function resolveLocale(locale: string): Locale {
  return locales.includes(locale as Locale) ? (locale as Locale) : "en";
}
