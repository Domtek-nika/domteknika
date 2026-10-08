import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";
import createNextIntlPlugin from "next-intl/plugin";

import { PATENTS } from "./src/data/patents";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isDevelopment = process.env.NODE_ENV === "development";
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com${isDevelopment ? " 'unsafe-eval'" : ""}`,
  "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://basemaps.cartocdn.com https://*.basemaps.cartocdn.com",
  "font-src 'self' data:",
  "connect-src 'self' https://basemaps.cartocdn.com https://*.basemaps.cartocdn.com https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com",
  "media-src 'self' blob:",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "object-src 'none'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin",
  },
  {
    key: "Permissions-Policy",
    value:
      "browsing-topics=(), camera=(), geolocation=(), microphone=(), payment=(), usb=()",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  ...(!isDevelopment
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000",
        },
      ]
    : []),
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "off",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
];

const noIndexMediaHeaders = [
  {
    key: "X-Robots-Tag",
    value: "noindex",
  },
];

// Keep HTML pages indexable, and leave media crawlable so search engines can
// read their noindex header. This also covers static imports and optimized or
// generated images without changing how browsers and social previews load them.
const nonIndexableMediaSources = [
  "/:file(.*\\.(?:apng|avif|bmp|gif|heic|heif|ico|jfif|jpe?g|jxl|pdf|png|svgz?|tiff?|webp))",
  "/_next/image",
  "/social-image",
] as const;

// Preserve the language of known legacy pages instead of sending every old URL
// to the homepage. Removed pages without a matching service keep their 404.
const legacyPagePaths = [
  ["projets", "projects"],
  ["projets-2", "projects"],
  ["brevets", "patents"],
  ["conception-2", "expertise/mechanical-design"],
  ["analyse-numerique-2", "expertise/simulation"],
  ["electronique-2", "expertise/electronics-integration"],
  ["creativite", "expertise/creativity-innovation"],
  ["creativite-2", "expertise/creativity-innovation"],
] as const;

const legacyPageRedirects = legacyPagePaths.flatMap(([legacyPath, path]) => [
  {
    source: `/${legacyPath}`,
    destination: `/fr/${path}`,
    permanent: true,
  },
  {
    source: `/en/${legacyPath}`,
    destination: `/en/${path}`,
    permanent: true,
  },
]);

const localDevOrigins = Object.values(networkInterfaces())
  .flatMap((entries) => entries ?? [])
  .filter((entry) => entry.family === "IPv4" && !entry.internal)
  .map((entry) => entry.address);

const patentFamilyRedirects = Array.from(
  new Map(
    PATENTS.flatMap((patent) =>
      patent.publicationAliases.flatMap((alias) => {
        const normalizedAlias = alias.replace(/[^a-z0-9]/gi, "");
        if (!normalizedAlias || normalizedAlias === patent.id) return [];

        return [
          [
            normalizedAlias,
            {
              source: `/:locale(en|fr|de|es|ko|zh|ja)/patents/${normalizedAlias}`,
              destination: `/:locale/patents/${patent.id.toLowerCase()}`,
              permanent: true,
            },
          ] as const,
        ];
      }),
    ),
  ).values(),
);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  allowedDevOrigins: localDevOrigins,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www\\.domteknika\\.ch" }],
        destination: "https://domteknika.ch/:path*",
        permanent: true,
      },
      ...legacyPageRedirects,
      {
        source: "/domteknika.ch/creativite",
        destination: "/fr/expertise/creativity-innovation",
        permanent: true,
      },
      {
        source: "/:locale(en|fr|de|es|ko|zh|ja)/patent",
        destination: "/:locale/patents",
        permanent: true,
      },
      {
        source: "/:locale(en|fr|de|es|ko|zh|ja)/projects/vacheron-watch-mechanics",
        destination: "/:locale/projects",
        permanent: true,
      },
      ...patentFamilyRedirects,
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      ...nonIndexableMediaSources.map((source) => ({
        source,
        headers: noIndexMediaHeaders,
      })),
      {
        source: "/assets/logo_DOMTEKNIKA_2023-alpha.png",
        headers: [
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
        ],
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90, 100],
  },
  // `npm run build` requires typecheck to pass before starting Next.js.
  // Run the checks sequentially to limit peak memory on constrained hosts.
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    // Explicit root so Next.js doesn't misdetect the workspace root
    // (a stray lockfile exists in a parent directory).
    root: __dirname,
  },
};

export default withNextIntl(nextConfig);
