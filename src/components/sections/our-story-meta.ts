type StoryLocale = "en" | "fr" | "de" | "es" | "ko" | "zh" | "ja";

const metaCopy = {
  en: {
    title: "DOMTEKNIKA - Our Story",
    description:
      "Discover DOMTEKNIKA's journey from La Neuveville since 1998 through product engineering, mobility, medtech and prototyping milestones.",
  },
  fr: {
    title: "DOMTEKNIKA - Notre histoire",
    description:
      "Découvrez le parcours de DOMTEKNIKA depuis 1998 à travers ses jalons en ingénierie produit, mobilité, dispositifs médicaux et prototypage.",
  },
  de: {
    title: "DOMTEKNIKA - Unsere Geschichte",
    description:
      "Entdecken Sie DOMTEKNIKAs Weg seit 1998 über Meilensteine in Produktentwicklung, Mobilität, Medizintechnik und Prototyping.",
  },
  es: {
    title: "DOMTEKNIKA - Nuestra historia",
    description:
      "Descubre el recorrido de DOMTEKNIKA desde 1998 a través de hitos en ingeniería de producto, movilidad, tecnología médica y prototipado.",
  },
  ko: {
    title: "DOMTEKNIKA - 회사 연혁",
    description:
      "1998년부터 이어진 DOMTEKNIKA의 제품 엔지니어링, 모빌리티, 의료기술, 프로토타이핑 여정을 살펴보세요.",
  },
  zh: {
    title: "DOMTEKNIKA - 我们的故事",
    description:
      "了解 DOMTEKNIKA 自 1998 年以来在产品工程、出行、医疗技术和原型开发方面的重要历程。",
  },
  ja: {
    title: "DOMTEKNIKA | 私たちの歩み",
    description:
      "1998 年の創業以来、DOMTEKNIKA が製品開発、モビリティ、医療技術、試作で積み重ねてきた歩みをご紹介します。",
  },
} satisfies Record<StoryLocale, { title: string; description: string }>;

export function getOurStoryMeta(locale: string) {
  return metaCopy[locale in metaCopy ? (locale as StoryLocale) : "en"];
}
