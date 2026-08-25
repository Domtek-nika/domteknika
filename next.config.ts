import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";
import createNextIntlPlugin from "next-intl/plugin";

import { PATENTS } from "./src/data/patents";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isDevelopment = process.env.NODE_ENV === "development";
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""}`,
  "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://basemaps.cartocdn.com https://*.basemaps.cartocdn.com",
  "font-src 'self' data:",
  "connect-src 'self' https://basemaps.cartocdn.com https://*.basemaps.cartocdn.com",
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

const noIndexImageHeaders = [
  {
    key: "X-Robots-Tag",
    value: "noindex",
  },
];

// These assets are visual dressing, not standalone editorial content. Keep the
// page indexable while preventing search engines from presenting the artwork as
// a DOMTEKNIKA image result. The query patterns also cover Next's image optimizer.
const decorativeImageRules = [
  {
    source: "/assets/contact-page/technical-sketch.png",
    optimizerQuery: "/assets/contact-page/technical-sketch\\.png",
  },
  {
    source: "/assets/our-story/background/:path*",
    optimizerQuery: "/assets/our-story/background/.+",
  },
  {
    source: "/assets/technical-drawing-top.png",
    optimizerQuery: "/assets/technical-drawing-top\\.png",
  },
  {
    source: "/assets/technical-drawing-top-2x.webp",
    optimizerQuery: "/assets/technical-drawing-top-2x\\.webp",
  },
  {
    source: "/assets/technical-drawing-bottom.png",
    optimizerQuery: "/assets/technical-drawing-bottom\\.png",
  },
  {
    source: "/assets/technical-drawing-bottom-2x.webp",
    optimizerQuery: "/assets/technical-drawing-bottom-2x\\.webp",
  },
  {
    source: "/assets/expertise-page/image-fond-top.png",
    optimizerQuery: "/assets/expertise-page/image-fond-top\\.png",
  },
  {
    source: "/assets/project-page/hero-sketch.png",
    optimizerQuery: "/assets/project-page/hero-sketch\\.png",
  },
  {
    source: "/assets/project-page/cta-sketch.png",
    optimizerQuery: "/assets/project-page/cta-sketch\\.png",
  },
  {
    source: "/assets/project-page/image-fond-top.png",
    optimizerQuery: "/assets/project-page/image-fond-top\\.png",
  },
  {
    source: "/assets/patent-page/hero-sketch.png",
    optimizerQuery: "/assets/patent-page/hero-sketch\\.png",
  },
  {
    source: "/assets/patent-page/cta-sketch.png",
    optimizerQuery: "/assets/patent-page/cta-sketch\\.png",
  },
] as const;

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
              source: `/:locale(en|fr|de|es|ko|zh)/patents/${normalizedAlias}`,
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
        source: "/:locale(en|fr|de|es|ko|zh)/patent",
        destination: "/:locale/patents",
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
      ...decorativeImageRules.map(({ source }) => ({
        source,
        headers: noIndexImageHeaders,
      })),
      ...decorativeImageRules.map(({ optimizerQuery }) => ({
        source: "/_next/image",
        has: [
          {
            type: "query" as const,
            key: "url",
            value: optimizerQuery,
          },
        ],
        headers: noIndexImageHeaders,
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
    qualities: [75, 100],
  },
  // Type checking runs separately via `npm run typecheck`. Keeping it out of
  // the production build avoids exceeding constrained hosting build memory.
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
