import type { Metadata } from "next";

import { locales, type Locale } from "@/i18n/routing";

export const SITE_URL = new URL("https://domteknika.ch");
const SOCIAL_IMAGE_PATH = "/social-image?v=shape-your-dream-20260926";

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
  ja: "ja_JP",
  ko: "ko_KR",
  zh: "zh_CN",
};

const HREF_LANGS: Record<Locale, string> = {
  de: "de",
  en: "en",
  es: "es",
  fr: "fr",
  ja: "ja",
  ko: "ko",
  zh: "zh-Hans",
};

const PATENT_DESCRIPTION_FALLBACKS: Record<Locale, string> = {
  fr: "{title}. Fiche de brevet {publication} : informations bibliographiques et documents disponibles.",
  en: "{title}. Patent record {publication}: bibliographic information and available documents.",
  de: "{title}. Patentdatensatz {publication}: bibliografische Angaben und verfügbare Dokumente.",
  es: "{title}. Ficha de patente {publication}: información bibliográfica y documentos disponibles.",
  ko: "{title}. 특허 {publication}의 서지 정보 및 제공되는 문서.",
  zh: "{title}。专利 {publication} 的书目信息及可用文献。",
  ja: "{title}。特許 {publication} の書誌情報と利用可能な文献。",
};

export function patentMetadataDescription(
  locale: string,
  patent: { abstract: string; title: string; publication: string },
) {
  // Some source records have no abstract. Describe the available page without
  // inventing technical claims or changing the original patent record.
  return patent.abstract.trim() || PATENT_DESCRIPTION_FALLBACKS[resolveLocale(locale)]
    .replace("{title}", () => patent.title)
    .replace("{publication}", () => patent.publication);
}

type PageMetadataInput = {
  description: string;
  image?: string;
  imageAlt?: string;
  shareDescription?: string;
  shareTitle?: string;
  locale: string;
  path?: string;
  title: string;
};

export function buildPageMetadata({
  description,
  image: imagePath,
  imageAlt,
  shareDescription,
  shareTitle,
  locale,
  path = "",
  title,
}: PageMetadataInput): Metadata {
  const resolvedLocale = resolveLocale(locale);
  const canonical = localizedUrl(resolvedLocale, path);
  const image = new URL(imagePath ?? SOCIAL_IMAGE_PATH, SITE_URL).toString();

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    openGraph: {
      title: shareTitle ?? title,
      description: shareDescription ?? description,
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
          // Only the shared social image has this fixed size. Project and
          // patent images keep their actual aspect ratio when fetched.
          ...(!imagePath ? { width: 1200, height: 630 } : {}),
          alt:
            imageAlt ??
            "DOMTEKNIKA — Shape your dream. Swiss engineering.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle ?? title,
      description: shareDescription ?? description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      noimageindex: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true,
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

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": `${SITE_URL}#organization`,
        "@type": ["Organization", "ProfessionalService"],
        name: "DOMTEKNIKA",
        legalName: "DOMTEKNIKA SA",
        url: SITE_URL.toString(),
        sameAs: ["https://www.linkedin.com/company/domteknika1/"],
        logo: {
          "@type": "ImageObject",
          url: new URL("/assets/domteknika-logo-search.png", SITE_URL).toString(),
          width: 600,
          height: 600,
        },
        image: new URL(SOCIAL_IMAGE_PATH, SITE_URL).toString(),
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
          "Electronics development",
          "Production engineering",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "business enquiries",
          email: "contact@domteknika.ch",
          telephone: "+41 32 751 71 46",
        },
      },
      {
        "@id": `${SITE_URL}#website`,
        "@type": "WebSite",
        name: "DOMTEKNIKA",
        alternateName: "DOMTEKNIKA SA",
        url: SITE_URL.toString(),
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
