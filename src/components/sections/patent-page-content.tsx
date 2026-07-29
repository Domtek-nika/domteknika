"use client";

import {
  ArrowRight,
  ArrowDownUp,
  ArrowUpRight,
  CalendarDays,
  CarFront,
  Check,
  ChevronLeft,
  ChevronRight,
  Cog,
  Cpu,
  Download,
  ExternalLink,
  FileBadge2,
  HeartPulse,
  Layers3,
  RotateCw,
  Search,
  Target,
  type LucideIcon,
  X,
  Zap,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Image from "next/image";
import {
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
  type WheelEvent as ReactWheelEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/providers/reveal";
import {
  type Project,
  getPatentLinkedProjectsForLocale,
  getProjectsForLocale,
  getProjectsPageCopy,
  ProjectDetailsDialog,
} from "@/components/sections/projects-page-content";
import { Button } from "@/components/ui/button";
import PATENT_LOCALIZATIONS from "@/data/patent-localizations.json";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  PATENTS,
  PATENT_STATS,
  type PatentAsset,
  type PatentDetail,
  type PatentFilterKey,
  type PatentRecord,
  type PatentReferenceRow,
  type PatentSourceLinks,
} from "@/data/patents";

type PatentLocale = "en" | "fr" | "de" | "es" | "ko" | "zh";
type FilterKey = "all" | PatentFilterKey;
type PatentSortKey = "date-desc" | "date-asc" | "publication" | "title";
type PatentTranslation = Pick<PatentRecord, "title" | "abstract">;

const PATENT_TRANSLATIONS = PATENT_LOCALIZATIONS as Record<
  Exclude<PatentLocale, "en">,
  Record<string, PatentTranslation>
>;

type PatentItem = PatentRecord;

type PanelRect = {
  left: number;
  top: number;
  width: number;
  height: number;
  radius: string;
};

type PatentStat = {
  icon: LucideIcon;
  value: string;
  label: string;
};

type PatentFilterOption = {
  key: FilterKey;
  label: string;
  count?: string;
  icon?: LucideIcon;
};

type PatentSortOption = {
  key: PatentSortKey;
  label: string;
};

const ASSET_BASE = "/assets/patent-page";

const MODAL_TRANSITION_MS = 320;
const MODAL_CLOSE_FALLBACK_MS = 360;

function centeredPatentPanelRect(): PanelRect {
  const isMobile = window.innerWidth <= 640;
  const pad = isMobile ? 12 : 24;
  const maxWidth =
    window.innerWidth >= 2400
      ? 1680
      : window.innerWidth >= 1800
        ? 1480
        : window.innerWidth >= 1440
          ? 1320
          : 1180;
  const maxHeight =
    window.innerWidth >= 2400
      ? 980
      : window.innerWidth >= 1800
        ? 900
        : window.innerWidth >= 1440
          ? 840
          : 780;
  const width = Math.min(maxWidth, window.innerWidth - pad * 2);
  const height = Math.min(maxHeight, window.innerHeight - pad * 2);

  return {
    left: (window.innerWidth - width) / 2,
    top: (window.innerHeight - height) / 2,
    width,
    height,
    radius: isMobile ? "16px" : "22px",
  };
}

const STATS: Record<PatentLocale, PatentStat[]> = {
  en: [
    {
      icon: FileBadge2,
      value: String(PATENT_STATS.total),
      label: "Patents verified",
    },
    {
      icon: Target,
      value: String(PATENT_STATS.categories),
      label: "Core industries",
    },
    {
      icon: CalendarDays,
      value: `Since ${PATENT_STATS.since}`,
      label: "+25 Years of innovation",
    },
  ],
  fr: [
    {
      icon: FileBadge2,
      value: String(PATENT_STATS.total),
      label: "Brevets vérifiés",
    },
    {
      icon: Target,
      value: String(PATENT_STATS.categories),
      label: "Industries clés",
    },
    {
      icon: CalendarDays,
      value: `Depuis ${PATENT_STATS.since}`,
      label: "+25 ans d'innovation",
    },
  ],
  de: [
    {
      icon: FileBadge2,
      value: String(PATENT_STATS.total),
      label: "Verifizierte Patente",
    },
    {
      icon: Target,
      value: String(PATENT_STATS.categories),
      label: "Kernbranchen",
    },
    {
      icon: CalendarDays,
      value: `Seit ${PATENT_STATS.since}`,
      label: "+25 Jahre Innovation",
    },
  ],
  es: [
    {
      icon: FileBadge2,
      value: String(PATENT_STATS.total),
      label: "Patentes verificadas",
    },
    {
      icon: Target,
      value: String(PATENT_STATS.categories),
      label: "Industrias clave",
    },
    {
      icon: CalendarDays,
      value: `Desde ${PATENT_STATS.since}`,
      label: "+25 años de innovación",
    },
  ],
  ko: [
    {
      icon: FileBadge2,
      value: String(PATENT_STATS.total),
      label: "검증된 특허",
    },
    {
      icon: Target,
      value: String(PATENT_STATS.categories),
      label: "핵심 산업",
    },
    {
      icon: CalendarDays,
      value: `${PATENT_STATS.since}년부터`,
      label: "+25년의 혁신",
    },
  ],
  zh: [
    {
      icon: FileBadge2,
      value: String(PATENT_STATS.total),
      label: "已验证专利",
    },
    {
      icon: Target,
      value: String(PATENT_STATS.categories),
      label: "核心行业",
    },
    {
      icon: CalendarDays,
      value: `自 ${PATENT_STATS.since} 年`,
      label: "+25 年创新",
    },
  ],
};

const FILTERS: Record<PatentLocale, PatentFilterOption[]> = {
  en: [
    { key: "all", label: "All" },
    {
      key: "mobility",
      label: "Mobility",
      icon: CarFront,
    },
    {
      key: "industrial",
      label: "Products",
      icon: Cog,
    },
    {
      key: "medical",
      label: "Medical",
      icon: HeartPulse,
    },
    {
      key: "energy",
      label: "Energy",
      icon: Zap,
    },
    {
      key: "materials",
      label: "Materials",
      icon: Layers3,
    },
    {
      key: "digital",
      label: "Digital",
      icon: Cpu,
    },
  ],
  fr: [
    { key: "all", label: "Tous" },
    {
      key: "mobility",
      label: "Mobilité",
      icon: CarFront,
    },
    {
      key: "industrial",
      label: "Produits",
      icon: Cog,
    },
    {
      key: "medical",
      label: "Médical",
      icon: HeartPulse,
    },
    {
      key: "energy",
      label: "Énergie",
      icon: Zap,
    },
    {
      key: "materials",
      label: "Matériaux",
      icon: Layers3,
    },
    {
      key: "digital",
      label: "Digital",
      icon: Cpu,
    },
  ],
  de: [
    { key: "all", label: "Alle" },
    {
      key: "mobility",
      label: "Mobilität",
      icon: CarFront,
    },
    {
      key: "industrial",
      label: "Produkte",
      icon: Cog,
    },
    {
      key: "medical",
      label: "Medizin",
      icon: HeartPulse,
    },
    {
      key: "energy",
      label: "Energie",
      icon: Zap,
    },
    {
      key: "materials",
      label: "Materialien",
      icon: Layers3,
    },
    {
      key: "digital",
      label: "Digital",
      icon: Cpu,
    },
  ],
  es: [
    { key: "all", label: "Todo" },
    {
      key: "mobility",
      label: "Movilidad",
      icon: CarFront,
    },
    {
      key: "industrial",
      label: "Productos",
      icon: Cog,
    },
    {
      key: "medical",
      label: "Médico",
      icon: HeartPulse,
    },
    {
      key: "energy",
      label: "Energía",
      icon: Zap,
    },
    {
      key: "materials",
      label: "Materiales",
      icon: Layers3,
    },
    {
      key: "digital",
      label: "Digital",
      icon: Cpu,
    },
  ],
  ko: [
    { key: "all", label: "전체" },
    {
      key: "mobility",
      label: "모빌리티",
      icon: CarFront,
    },
    {
      key: "industrial",
      label: "제품",
      icon: Cog,
    },
    {
      key: "medical",
      label: "의료",
      icon: HeartPulse,
    },
    {
      key: "energy",
      label: "에너지",
      icon: Zap,
    },
    {
      key: "materials",
      label: "소재",
      icon: Layers3,
    },
    {
      key: "digital",
      label: "디지털",
      icon: Cpu,
    },
  ],
  zh: [
    { key: "all", label: "全部" },
    {
      key: "mobility",
      label: "出行",
      icon: CarFront,
    },
    {
      key: "industrial",
      label: "产品",
      icon: Cog,
    },
    {
      key: "medical",
      label: "医疗",
      icon: HeartPulse,
    },
    {
      key: "energy",
      label: "能源",
      icon: Zap,
    },
    {
      key: "materials",
      label: "材料",
      icon: Layers3,
    },
    {
      key: "digital",
      label: "数字",
      icon: Cpu,
    },
  ],
};

const CARD_ICON: Record<PatentFilterKey, LucideIcon> = {
  mobility: CarFront,
  industrial: Cog,
  medical: HeartPulse,
  energy: Zap,
  materials: Layers3,
  digital: Cpu,
};
const COPY: Record<
  PatentLocale,
  {
    hero: {
      eyebrow: string;
      title: string;
      leadOne: string;
      leadTwo: string;
    };
    archiveTitle: string;
    filtersLabel: string;
    noResults: string;
    searchPlaceholder: string;
    resultsLabel: string;
    filterCountLabel: string;
    sort: {
      label: string;
      options: PatentSortOption[];
    };
    deposited: string;
    details: {
      close: string;
      eyebrow: string;
      overview: string;
      tags: string;
      category: string;
      publication: string;
      publicationDate: string;
      priorityDate: string;
      inventors: string;
      applicants: string;
      application: string;
      classification: string;
      alsoPublishedAs: string;
      images: string;
      openDrawing: string;
      closeDrawing: string;
      previousDrawing: string;
      nextDrawing: string;
      rotateDrawing: string;
      zoomInDrawing: string;
      zoomOutDrawing: string;
      openImageViewer: string;
      vectorPdf: string;
      sourceLinks: string;
      downloadPdfs: string;
      linkedProjects: string;
      openLinkedProject: string;
      fullDescription: string;
      claims: string;
      legalStatus: string;
      family: string;
      cited: string;
      citing: string;
      loading: string;
      unavailable: string;
    };
    card: {
      openDetails: string;
    };
    cta: {
      eyebrow: string;
      titlePrefix: string;
      title: string;
      titleQuestion: string;
      body: string;
      button: string;
    };
  }
> = {
  en: {
    hero: {
      eyebrow: "Our innovation, protected",
      title: "Patents",
      leadOne:
        "Our patent portfolio reflects years of research, engineering excellence and a commitment to solving complex challenges.",
      leadTwo:
        "Explore our protected innovations shaping the future across multiple industries.",
    },
    archiveTitle: "Innovation archive",
    filtersLabel: "Filter patents",
    noResults: "No patents match this category.",
    searchPlaceholder: "Search title, inventor, applicant, publication...",
    resultsLabel: "patents shown",
    filterCountLabel: "patents",
    sort: {
      label: "Sort",
      options: [
        { key: "date-desc", label: "Newest first" },
        { key: "date-asc", label: "Oldest first" },
        { key: "publication", label: "Publication" },
        { key: "title", label: "Title A-Z" },
      ],
    },
    deposited: "Published:",
    details: {
      close: "Close patent details",
      eyebrow: "Protected innovation",
      overview: "Patent overview",
      tags: "Patent tags",
      category: "Category",
      publication: "Publication",
      publicationDate: "Publication date",
      priorityDate: "Priority date",
      inventors: "Inventors",
      applicants: "Applicants",
      application: "Application",
      classification: "Classification",
      alsoPublishedAs: "Also published as",
      images: "Drawings",
      openDrawing: "Open drawing",
      closeDrawing: "Close drawing",
      previousDrawing: "Previous drawing",
      nextDrawing: "Next drawing",
      rotateDrawing: "Rotate drawing",
      zoomInDrawing: "Zoom in drawing",
      zoomOutDrawing: "Zoom out drawing",
      openImageViewer: "Open image viewer",
      vectorPdf: "Vector PDF",
      sourceLinks: "Espacenet source",
      downloadPdfs: "Download PDFs",
      linkedProjects: "Linked projects",
      openLinkedProject: "Open project",
      fullDescription: "Full description",
      claims: "Claims",
      legalStatus: "Legal status",
      family: "INPADOC family",
      cited: "Cited documents",
      citing: "Citing documents",
      loading: "Loading verified patent record...",
      unavailable: "No local text available for this section.",
    },
    card: {
      openDetails: "Open patent details",
    },
    cta: {
      eyebrow: "Let's build together",
      titlePrefix: ".",
      title: "Anything we can build for you",
      titleQuestion: "?",
      body: "We partner with forward-thinking companies to turn complex challenges into smart, manufacturable solutions.",
      button: "Start your project",
    },
  },
  fr: {
    hero: {
      eyebrow: "Our innovation, protected",
      title: "Brevets",
      leadOne:
        "Notre portefeuille de brevets reflète des années de recherche, d'excellence en ingénierie et d'engagement à résoudre des défis complexes.",
      leadTwo:
        "Découvrez nos innovations protégées qui façonnent l'avenir dans de multiples industries.",
    },
    archiveTitle: "Archive d'innovation",
    filtersLabel: "Filtrer les brevets",
    noResults: "Aucun brevet ne correspond à cette catégorie.",
    searchPlaceholder: "Rechercher titre, inventeur, demandeur, publication...",
    resultsLabel: "brevets affichés",
    filterCountLabel: "brevets",
    sort: {
      label: "Trier",
      options: [
        { key: "date-desc", label: "Plus récents" },
        { key: "date-asc", label: "Plus anciens" },
        { key: "publication", label: "Publication" },
        { key: "title", label: "Titre A-Z" },
      ],
    },
    deposited: "Publié :",
    details: {
      close: "Fermer le détail du brevet",
      eyebrow: "Innovation protégée",
      overview: "Synthèse du brevet",
      tags: "Tags du brevet",
      category: "Catégorie",
      publication: "Publication",
      publicationDate: "Date de publication",
      priorityDate: "Date de priorité",
      inventors: "Inventeurs",
      applicants: "Demandeurs",
      application: "Demande",
      classification: "Classification",
      alsoPublishedAs: "Également publié",
      images: "Dessins",
      openDrawing: "Ouvrir le dessin",
      closeDrawing: "Fermer le dessin",
      previousDrawing: "Dessin précédent",
      nextDrawing: "Dessin suivant",
      rotateDrawing: "Tourner le dessin",
      zoomInDrawing: "Agrandir le dessin",
      zoomOutDrawing: "Réduire le dessin",
      openImageViewer: "Ouvrir la loupe",
      vectorPdf: "PDF vectoriel",
      sourceLinks: "Source Espacenet",
      downloadPdfs: "Télécharger les PDF",
      linkedProjects: "Projets liés",
      openLinkedProject: "Ouvrir le projet",
      fullDescription: "Description complète",
      claims: "Revendications",
      legalStatus: "Situation juridique",
      family: "Famille INPADOC",
      cited: "Documents cités",
      citing: "Documents citant",
      loading: "Chargement de la fiche brevet vérifiée...",
      unavailable: "Aucun texte local disponible pour cette section.",
    },
    card: {
      openDetails: "Ouvrir le détail du brevet",
    },
    cta: {
      eyebrow: "Let's build together",
      titlePrefix: ".",
      title: "Un défi à relever ensemble",
      titleQuestion: "?",
      body: "Nous accompagnons les entreprises visionnaires pour transformer des défis complexes en solutions pertinentes et industrialisables.",
      button: "Démarrer votre projet",
    },
  },
  de: {
    hero: {
      eyebrow: "Our innovation, protected",
      title: "Patente",
      leadOne:
        "Unser Patentportfolio steht für langjährige Forschung, hohe Ingenieurskompetenz und den Anspruch, komplexe Herausforderungen zu lösen.",
      leadTwo:
        "Entdecken Sie unsere geschützten Innovationen, die mehrere Branchen mitgestalten.",
    },
    archiveTitle: "Innovationsarchiv",
    filtersLabel: "Patente filtern",
    noResults: "Keine Patente passen zu dieser Kategorie.",
    searchPlaceholder: "Titel, Erfinder, Anmelder, Veröffentlichung suchen...",
    resultsLabel: "Patente angezeigt",
    filterCountLabel: "Patente",
    sort: {
      label: "Sortieren",
      options: [
        { key: "date-desc", label: "Neueste zuerst" },
        { key: "date-asc", label: "Älteste zuerst" },
        { key: "publication", label: "Veröffentlichung" },
        { key: "title", label: "Titel A-Z" },
      ],
    },
    deposited: "Veröffentlicht:",
    details: {
      close: "Patentdetails schließen",
      eyebrow: "Geschützte Innovation",
      overview: "Patentübersicht",
      tags: "Patent-Tags",
      category: "Kategorie",
      publication: "Veröffentlichung",
      publicationDate: "Veröffentlichungsdatum",
      priorityDate: "Prioritätsdatum",
      inventors: "Erfinder",
      applicants: "Anmelder",
      application: "Anmeldung",
      classification: "Klassifikation",
      alsoPublishedAs: "Auch veröffentlicht als",
      images: "Zeichnungen",
      openDrawing: "Zeichnung öffnen",
      closeDrawing: "Zeichnung schließen",
      previousDrawing: "Vorherige Zeichnung",
      nextDrawing: "Nächste Zeichnung",
      rotateDrawing: "Zeichnung drehen",
      zoomInDrawing: "Zeichnung vergrößern",
      zoomOutDrawing: "Zeichnung verkleinern",
      openImageViewer: "Bildbetrachter öffnen",
      vectorPdf: "Vektor-PDF",
      sourceLinks: "Espacenet-Quelle",
      downloadPdfs: "PDFs herunterladen",
      linkedProjects: "Verknüpfte Projekte",
      openLinkedProject: "Projekt öffnen",
      fullDescription: "Vollständige Beschreibung",
      claims: "Ansprüche",
      legalStatus: "Rechtsstand",
      family: "INPADOC-Familie",
      cited: "Zitierte Dokumente",
      citing: "Zitierende Dokumente",
      loading: "Verifizierten Patenteintrag laden...",
      unavailable: "Für diesen Abschnitt ist lokal kein Text verfügbar.",
    },
    card: {
      openDetails: "Patentdetails öffnen",
    },
    cta: {
      eyebrow: "Let's build together",
      titlePrefix: ".",
      title: "Eine Herausforderung, die wir gemeinsam lösen können",
      titleQuestion: "?",
      body: "Wir arbeiten mit zukunftsorientierten Unternehmen zusammen, um komplexe Herausforderungen in durchdachte, industrialisierbare Lösungen zu verwandeln.",
      button: "Projekt starten",
    },
  },
  es: {
    hero: {
      eyebrow: "Our innovation, protected",
      title: "Patentes",
      leadOne:
        "Nuestra cartera de patentes refleja años de investigación, excelencia en ingeniería y compromiso con la resolución de retos complejos.",
      leadTwo:
        "Explora nuestras innovaciones protegidas que dan forma al futuro en múltiples industrias.",
    },
    archiveTitle: "Archivo de innovación",
    filtersLabel: "Filtrar patentes",
    noResults: "Ninguna patente coincide con esta categoría.",
    searchPlaceholder: "Buscar título, inventor, solicitante, publicación...",
    resultsLabel: "patentes mostradas",
    filterCountLabel: "patentes",
    sort: {
      label: "Ordenar",
      options: [
        { key: "date-desc", label: "Más recientes" },
        { key: "date-asc", label: "Más antiguos" },
        { key: "publication", label: "Publicación" },
        { key: "title", label: "Título A-Z" },
      ],
    },
    deposited: "Publicado:",
    details: {
      close: "Cerrar detalles de la patente",
      eyebrow: "Innovación protegida",
      overview: "Resumen de la patente",
      tags: "Etiquetas de patente",
      category: "Categoría",
      publication: "Publicación",
      publicationDate: "Fecha de publicación",
      priorityDate: "Fecha de prioridad",
      inventors: "Inventores",
      applicants: "Solicitantes",
      application: "Solicitud",
      classification: "Clasificación",
      alsoPublishedAs: "También publicado como",
      images: "Dibujos",
      openDrawing: "Abrir dibujo",
      closeDrawing: "Cerrar dibujo",
      previousDrawing: "Dibujo anterior",
      nextDrawing: "Dibujo siguiente",
      rotateDrawing: "Girar dibujo",
      zoomInDrawing: "Acercar dibujo",
      zoomOutDrawing: "Alejar dibujo",
      openImageViewer: "Abrir visor de imagen",
      vectorPdf: "PDF vectorial",
      sourceLinks: "Fuente Espacenet",
      downloadPdfs: "Descargar PDFs",
      linkedProjects: "Proyectos vinculados",
      openLinkedProject: "Abrir proyecto",
      fullDescription: "Descripción completa",
      claims: "Reivindicaciones",
      legalStatus: "Situación jurídica",
      family: "Familia INPADOC",
      cited: "Documentos citados",
      citing: "Documentos citantes",
      loading: "Cargando ficha de patente verificada...",
      unavailable: "No hay texto local disponible para esta sección.",
    },
    card: {
      openDetails: "Abrir detalles de la patente",
    },
    cta: {
      eyebrow: "Let's build together",
      titlePrefix: ".",
      title: "Un reto que podamos resolver juntos",
      titleQuestion: "?",
      body: "Colaboramos con empresas visionarias para convertir retos complejos en soluciones pertinentes y listas para industrializar.",
      button: "Iniciar tu proyecto",
    },
  },
  ko: {
    hero: {
      eyebrow: "Our innovation, protected",
      title: "특허",
      leadOne:
        "특허 포트폴리오는 수년간의 연구, 엔지니어링 우수성, 복잡한 과제를 해결하려는 의지를 보여 줍니다.",
      leadTwo:
        "특허로 보호된 기술이 여러 산업의 발전에 어떻게 기여하는지 살펴보세요.",
    },
    archiveTitle: "혁신 아카이브",
    filtersLabel: "특허 필터",
    noResults: "이 카테고리에 맞는 특허가 없습니다.",
    searchPlaceholder: "제목, 발명자, 출원인, 공개번호 검색...",
    resultsLabel: "건의 특허",
    filterCountLabel: "건",
    sort: {
      label: "정렬",
      options: [
        { key: "date-desc", label: "최신순" },
        { key: "date-asc", label: "오래된순" },
        { key: "publication", label: "공개번호" },
        { key: "title", label: "제목 A-Z" },
      ],
    },
    deposited: "공개:",
    details: {
      close: "특허 상세 닫기",
      eyebrow: "보호된 혁신",
      overview: "특허 개요",
      tags: "특허 태그",
      category: "카테고리",
      publication: "공개번호",
      publicationDate: "공개일",
      priorityDate: "우선일",
      inventors: "발명자",
      applicants: "출원인",
      application: "출원",
      classification: "분류",
      alsoPublishedAs: "동시 공개",
      images: "도면",
      openDrawing: "도면 열기",
      closeDrawing: "도면 닫기",
      previousDrawing: "이전 도면",
      nextDrawing: "다음 도면",
      rotateDrawing: "도면 회전",
      zoomInDrawing: "도면 확대",
      zoomOutDrawing: "도면 축소",
      openImageViewer: "이미지 뷰어 열기",
      vectorPdf: "벡터 PDF",
      sourceLinks: "Espacenet 출처",
      downloadPdfs: "PDF 다운로드",
      linkedProjects: "연결된 프로젝트",
      openLinkedProject: "프로젝트 열기",
      fullDescription: "전체 설명",
      claims: "청구항",
      legalStatus: "법적 상태",
      family: "INPADOC 패밀리",
      cited: "인용 문헌",
      citing: "피인용 문헌",
      loading: "검증된 특허 기록을 불러오는 중...",
      unavailable: "이 섹션에는 로컬 텍스트가 없습니다.",
    },
    card: {
      openDetails: "특허 상세 열기",
    },
    cta: {
      eyebrow: "Let's build together",
      titlePrefix: ".",
      title: "함께 해결할 과제가 있으신가요",
      titleQuestion: "?",
      body: "저희는 미래지향적인 기업과 협력해 복잡한 과제를 실용적이고 양산 가능한 솔루션으로 전환합니다.",
      button: "프로젝트 시작하기",
    },
  },
  zh: {
    hero: {
      eyebrow: "Our innovation, protected",
      title: "专利",
      leadOne:
        "我们的专利组合体现了多年研究、卓越工程能力，以及解决复杂挑战的持续投入。",
      leadTwo: "了解我们如何以受专利保护的技术推动多个行业持续发展。",
    },
    archiveTitle: "创新档案",
    filtersLabel: "筛选专利",
    noResults: "没有符合该类别的专利。",
    searchPlaceholder: "搜索标题、发明人、申请人、公布号...",
    resultsLabel: "项专利",
    filterCountLabel: "项专利",
    sort: {
      label: "排序",
      options: [
        { key: "date-desc", label: "最新优先" },
        { key: "date-asc", label: "最早优先" },
        { key: "publication", label: "公布号" },
        { key: "title", label: "标题 A-Z" },
      ],
    },
    deposited: "公开：",
    details: {
      close: "关闭专利详情",
      eyebrow: "受保护创新",
      overview: "专利概览",
      tags: "专利标签",
      category: "类别",
      publication: "公布",
      publicationDate: "公布日期",
      priorityDate: "优先权日",
      inventors: "发明人",
      applicants: "申请人",
      application: "申请",
      classification: "分类",
      alsoPublishedAs: "也公布为",
      images: "附图",
      openDrawing: "打开附图",
      closeDrawing: "关闭附图",
      previousDrawing: "上一张附图",
      nextDrawing: "下一张附图",
      rotateDrawing: "旋转附图",
      zoomInDrawing: "放大附图",
      zoomOutDrawing: "缩小附图",
      openImageViewer: "打开图片查看器",
      vectorPdf: "矢量 PDF",
      sourceLinks: "Espacenet 来源",
      downloadPdfs: "下载 PDF",
      linkedProjects: "关联项目",
      openLinkedProject: "打开项目",
      fullDescription: "完整说明",
      claims: "权利要求",
      legalStatus: "法律状态",
      family: "INPADOC 族",
      cited: "被引用文献",
      citing: "引用文献",
      loading: "正在加载已验证专利记录...",
      unavailable: "此部分没有本地文本。",
    },
    card: {
      openDetails: "打开专利详情",
    },
    cta: {
      eyebrow: "Let's build together",
      titlePrefix: ".",
      title: "有需要我们共同解决的项目吗",
      titleQuestion: "?",
      body: "我们与具有前瞻性的企业合作，将复杂挑战转化为切实可行且可制造的解决方案。",
      button: "启动您的项目",
    },
  },
};

function resolveLocale(locale: string): PatentLocale {
  return locale in COPY ? (locale as PatentLocale) : "en";
}

function getPatentCategoryLabel(
  filter: Exclude<FilterKey, "all">,
  locale: PatentLocale,
) {
  return FILTERS[locale].find((item) => item.key === filter)?.label ?? filter;
}

function getFilterCount(filter: FilterKey) {
  if (filter === "all") return PATENTS.length;
  return PATENT_STATS.byCategory[filter] ?? 0;
}

function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function patentMatchesSearch(patent: PatentItem, query: string) {
  if (!query) return true;

  return normalizeSearch(
    [
      patent.title,
      patent.id,
      patent.publication,
      patent.inventors,
      patent.applicants,
    ].join(" "),
  ).includes(query);
}

function sortPatents(
  patents: PatentItem[],
  sortKey: PatentSortKey,
  locale: PatentLocale,
) {
  return [...patents].sort((a, b) => {
    switch (sortKey) {
      case "date-asc":
        return a.date.localeCompare(b.date);
      case "publication":
        return a.publication.localeCompare(b.publication, locale, {
          numeric: true,
        });
      case "title":
        return a.title.localeCompare(b.title, locale, { numeric: true });
      case "date-desc":
      default:
        return b.date.localeCompare(a.date);
    }
  });
}

export function PatentPageContent({ locale }: { locale: string }) {
  const resolvedLocale = resolveLocale(locale);
  const copy = COPY[resolvedLocale];
  const stats = STATS[resolvedLocale];
  const filters = FILTERS[resolvedLocale];
  const localizedPatents = useMemo(() => {
    if (resolvedLocale === "en") return PATENTS;

    const translations =
      PATENT_TRANSLATIONS[resolvedLocale as Exclude<PatentLocale, "en">];

    return PATENTS.map((patent) => {
      const translation = translations?.[patent.id];

      return {
        ...patent,
        title: translation?.title || patent.title,
        abstract: translation?.abstract || patent.abstract,
      };
    });
  }, [resolvedLocale]);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [sortKey, setSortKey] = useState<PatentSortKey>("date-desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatent, setSelectedPatent] = useState<PatentItem | null>(null);
  const [selectedLinkedProject, setSelectedLinkedProject] =
    useState<Project | null>(null);
  const [selectedPatentDetails, setSelectedPatentDetails] =
    useState<PatentDetail | null>(null);
  const [detailError, setDetailError] = useState(false);
  const [dialogState, setDialogState] = useState<
    "closed" | "opening" | "open" | "closing"
  >("closed");
  const [panelRect, setPanelRect] = useState<PanelRect | null>(null);
  const [activeDrawingIndex, setActiveDrawingIndex] = useState<number | null>(
    null,
  );
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [modalImageOffset, setModalImageOffset] = useState({ x: 0, y: 0 });
  const [modalImageRotation, setModalImageRotation] = useState(0);
  const [modalImageZoom, setModalImageZoom] = useState(1);
  const modalRootRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const modalImagePanRef = useRef<{
    pointerId: number;
    x: number;
    y: number;
    startX: number;
    startY: number;
    moved: boolean;
  } | null>(null);
  const modalImageClickSuppressedRef = useRef(false);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const lockedScrollYRef = useRef(0);

  useEffect(() => {
    const closeSortOnOutsidePointer = (event: globalThis.PointerEvent) => {
      const sortDetails = Array.from(
        document.querySelectorAll<HTMLDetailsElement>(
          "[data-patent-sort-details]",
        ),
      );
      const openSortDetails = sortDetails.filter((details) => details.open);
      if (openSortDetails.length === 0) return;
      if (
        event.target instanceof Node &&
        openSortDetails.some((details) =>
          details.contains(event.target as Node),
        )
      ) {
        return;
      }

      openSortDetails.forEach((details) => details.removeAttribute("open"));
    };

    document.addEventListener("pointerdown", closeSortOnOutsidePointer);

    return () => {
      document.removeEventListener("pointerdown", closeSortOnOutsidePointer);
    };
  }, []);

  const normalizedSearchTerm = useMemo(
    () => normalizeSearch(searchTerm),
    [searchTerm],
  );

  const visiblePatents = useMemo(() => {
    const filteredPatents = localizedPatents.filter((patent) => {
      const matchesFilter =
        activeFilter === "all" || patent.filter === activeFilter;
      return matchesFilter && patentMatchesSearch(patent, normalizedSearchTerm);
    });

    return sortPatents(filteredPatents, sortKey, resolvedLocale);
  }, [
    activeFilter,
    localizedPatents,
    normalizedSearchTerm,
    resolvedLocale,
    sortKey,
  ]);
  const activeSortLabel =
    copy.sort.options.find((option) => option.key === sortKey)?.label ??
    copy.sort.options[0]?.label ??
    copy.sort.label;
  const renderPatentControls = ({
    wrapperClassName,
    sortClassName,
    searchClassName,
  }: {
    wrapperClassName: string;
    sortClassName: string;
    searchClassName: string;
  }) => (
    <div className={wrapperClassName}>
      <details data-patent-sort-details className={sortClassName}>
        <summary
          className="flex h-11 w-full cursor-pointer list-none items-center justify-between gap-3 rounded-[4px] border border-border bg-white px-4 text-[13px] font-extrabold text-foreground shadow-[0_2px_7px_rgba(0,0,0,0.05)] outline-none transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-brand/35 focus-visible:ring-2 focus-visible:ring-brand/35 [&::-webkit-details-marker]:hidden min-[1800px]:!h-[52px] min-[1800px]:!px-5 min-[1800px]:!text-[15px] min-[2400px]:!h-[58px] min-[2400px]:!text-[17px]"
          aria-label={copy.sort.label}
        >
          <span className="inline-flex min-w-0 items-center gap-2">
            <ArrowDownUp
              className="size-4 shrink-0 text-brand min-[1800px]:!size-5 min-[2400px]:!size-6"
              aria-hidden
            />
            <span className="shrink-0">{copy.sort.label}</span>
          </span>
          <span className="max-w-[92px] truncate text-[12px] font-medium text-muted-foreground min-[1800px]:!max-w-[128px] min-[1800px]:!text-[14px] min-[2400px]:!text-[15px]">
            {activeSortLabel}
          </span>
        </summary>
        <div className="absolute left-0 top-[calc(100%+8px)] grid min-w-[220px] rounded-[7px] border border-border bg-white p-1 shadow-[0_16px_34px_rgba(0,0,0,0.14)] min-[1800px]:!min-w-[270px] min-[1800px]:!p-1.5">
          {copy.sort.options.map((option) => {
            const active = option.key === sortKey;

            return (
              <button
                key={option.key}
                type="button"
                className={cn(
                  "flex items-center justify-between gap-4 rounded-[5px] px-3 py-2 text-left text-[13px] font-bold text-foreground transition-colors hover:bg-brand/10 focus-visible:bg-brand/10 focus-visible:outline-none min-[1800px]:!px-4 min-[1800px]:!py-3 min-[1800px]:!text-[15px] min-[2400px]:!text-[17px]",
                  active && "bg-brand text-white hover:bg-brand",
                )}
                aria-pressed={active}
                onClick={(event) => {
                  setSortKey(option.key);
                  event.currentTarget
                    .closest("details")
                    ?.removeAttribute("open");
                }}
              >
                <span>{option.label}</span>
                {active ? (
                  <Check className="size-4 shrink-0" aria-hidden />
                ) : null}
              </button>
            );
          })}
        </div>
      </details>

      <label className={searchClassName}>
        <Search
          className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground min-[1800px]:!left-5 min-[1800px]:!size-5 min-[2400px]:!size-6"
          aria-hidden
        />
        <input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder={copy.searchPlaceholder}
          className="h-11 w-full rounded-[4px] border border-border bg-white pl-11 pr-4 text-[13px] font-medium text-foreground outline-none shadow-[0_2px_7px_rgba(0,0,0,0.05)] transition-[border-color,box-shadow] duration-300 placeholder:text-muted-foreground/75 focus:border-brand/50 focus:shadow-[0_10px_24px_rgba(0,0,0,0.08)] min-[1800px]:!h-[52px] min-[1800px]:!pl-14 min-[1800px]:!pr-5 min-[1800px]:!text-[15px] min-[2400px]:!h-[58px] min-[2400px]:!text-[17px]"
          type="search"
        />
      </label>
    </div>
  );
  const localizedProjects = useMemo(
    () => getProjectsForLocale(resolvedLocale),
    [resolvedLocale],
  );
  const projectsCopy = useMemo(
    () => getProjectsPageCopy(resolvedLocale),
    [resolvedLocale],
  );

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const finishClose = useCallback(() => {
    clearCloseTimer();
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }
    setSelectedPatent(null);
    setSelectedLinkedProject(null);
    setPanelRect(null);
    setActiveDrawingIndex(null);
    setModalImageIndex(0);
    setModalImageOffset({ x: 0, y: 0 });
    setModalImageRotation(0);
    setModalImageZoom(1);
    setDialogState("closed");
    previousFocusRef.current?.focus?.({ preventScroll: true });
    previousFocusRef.current = null;
  }, [clearCloseTimer]);

  const openPatent = useCallback(
    (patent: PatentItem) => {
      clearCloseTimer();
      lockedScrollYRef.current = window.scrollY;
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      setSelectedPatent(patent);
      setSelectedPatentDetails(null);
      setDetailError(false);
      setActiveDrawingIndex(null);
      setModalImageIndex(0);
      setModalImageOffset({ x: 0, y: 0 });
      setModalImageRotation(0);
      setModalImageZoom(1);
      setPanelRect(centeredPatentPanelRect());
      setDialogState("opening");

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setDialogState("open");
        });
      });
    },
    [clearCloseTimer],
  );

  useEffect(() => {
    const openPatentFromHash = () => {
      const patentId = decodeURIComponent(
        window.location.hash.replace(/^#/, ""),
      );
      if (!patentId || selectedPatent?.id === patentId) return;

      const patent = localizedPatents.find((item) => item.id === patentId);
      if (patent) {
        setActiveFilter(patent.filter);
        openPatent(patent);
      }
    };

    openPatentFromHash();
    window.addEventListener("hashchange", openPatentFromHash);
    return () => window.removeEventListener("hashchange", openPatentFromHash);
  }, [localizedPatents, openPatent, selectedPatent?.id]);

  const closePatent = useCallback(() => {
    if (!selectedPatent || dialogState === "closing") return;

    clearCloseTimer();
    setActiveDrawingIndex(null);
    setModalImageOffset({ x: 0, y: 0 });
    setModalImageRotation(0);
    setModalImageZoom(1);
    setDialogState("closing");

    closeTimerRef.current = window.setTimeout(
      finishClose,
      MODAL_CLOSE_FALLBACK_MS,
    );
  }, [clearCloseTimer, dialogState, finishClose, selectedPatent]);

  const openLinkedProject = useCallback(
    (projectId: string) => {
      const project = localizedProjects.find((item) => item.id === projectId);
      if (!project) return;

      setSelectedLinkedProject(project);
    },
    [localizedProjects],
  );

  const closeDrawing = useCallback(() => {
    setActiveDrawingIndex(null);
  }, []);

  const showDrawing = useCallback((index: number) => {
    setActiveDrawingIndex(index);
  }, []);

  const cycleDrawing = useCallback(
    (direction: -1 | 1) => {
      setActiveDrawingIndex((current) => {
        const count = selectedPatent?.images.length ?? 0;
        if (!count) return null;
        const safeCurrent = current ?? 0;
        return (safeCurrent + direction + count) % count;
      });
    },
    [selectedPatent],
  );

  const cycleModalImage = useCallback(
    (direction: -1 | 1) => {
      setModalImageIndex((current) => {
        const count = selectedPatent?.images.length ?? 0;
        if (!count) return 0;
        return (current + direction + count) % count;
      });
      setModalImageOffset({ x: 0, y: 0 });
      setModalImageRotation(0);
      setModalImageZoom(1);
    },
    [selectedPatent],
  );

  const rotateModalImage = useCallback(() => {
    setModalImageRotation((current) => (current + 90) % 360);
  }, []);

  const zoomModalImage = useCallback((direction: -1 | 1) => {
    setModalImageZoom((current) => {
      const nextZoom = Math.min(
        2.5,
        Math.max(1, Number((current + direction * 0.25).toFixed(2))),
      );
      if (nextZoom === 1) {
        setModalImageOffset({ x: 0, y: 0 });
      }
      return nextZoom;
    });
  }, []);

  const handleModalImagePanStart = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if ((event.target as HTMLElement).closest("button, a")) return;
      modalImageClickSuppressedRef.current = false;
      if (modalImageZoom <= 1) return;
      event.preventDefault();
      modalImagePanRef.current = {
        pointerId: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        startX: event.clientX,
        startY: event.clientY,
        moved: false,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [modalImageZoom],
  );

  const handleModalImagePanMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const pan = modalImagePanRef.current;
      if (!pan || pan.pointerId !== event.pointerId) return;
      event.preventDefault();

      const deltaX = event.clientX - pan.x;
      const deltaY = event.clientY - pan.y;
      modalImagePanRef.current = {
        ...pan,
        x: event.clientX,
        y: event.clientY,
        moved:
          pan.moved ||
          Math.hypot(event.clientX - pan.startX, event.clientY - pan.startY) >
            5,
      };
      setModalImageOffset((current) => ({
        x: current.x + deltaX,
        y: current.y + deltaY,
      }));
    },
    [],
  );

  const handleModalImagePanEnd = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const pan = modalImagePanRef.current;
      if (!pan || pan.pointerId !== event.pointerId) return;
      modalImageClickSuppressedRef.current = pan.moved;
      modalImagePanRef.current = null;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    },
    [],
  );

  useEffect(() => {
    if (!selectedPatent) return;

    let cancelled = false;

    fetch(selectedPatent.detailPath)
      .then((response) => {
        if (!response.ok)
          throw new Error(`Failed to load ${selectedPatent.detailPath}`);
        return response.json() as Promise<PatentDetail>;
      })
      .then((detail) => {
        if (!cancelled) setSelectedPatentDetails(detail);
      })
      .catch(() => {
        if (!cancelled) setDetailError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedPatent]);

  useEffect(() => {
    if (!selectedPatent) return;

    const { body, documentElement } = document;
    const previousBodyStyles = {
      overscrollBehavior: body.style.overscrollBehavior,
    };
    const previousDocumentStyles = {
      overflowY: documentElement.style.overflowY,
      overscrollBehavior: documentElement.style.overscrollBehavior,
    };
    const scrollEventOptions = {
      capture: true,
      passive: false,
    } satisfies AddEventListenerOptions;
    let touchStartY = 0;

    const canScrollWithin = (container: HTMLElement, deltaY: number) => {
      const maxScrollTop = container.scrollHeight - container.clientHeight;
      if (maxScrollTop <= 0) return false;
      if (deltaY < 0) return container.scrollTop > 0;
      if (deltaY > 0) return container.scrollTop < maxScrollTop - 1;
      return true;
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const preventBackgroundScroll = (event: Event) => {
      const eventTarget = event.target instanceof Element ? event.target : null;
      const drawingZoomTarget = eventTarget?.closest<HTMLElement>(
        "[data-patent-drawing-zoom]",
      );
      if (
        drawingZoomTarget &&
        event instanceof WheelEvent &&
        (event.ctrlKey || event.metaKey)
      ) {
        return;
      }

      const scrollContainer = eventTarget?.closest<HTMLElement>(
        "[data-patent-dialog-scroll], [data-project-dialog-scroll]",
      );
      const deltaY =
        event instanceof WheelEvent
          ? event.deltaY
          : event instanceof TouchEvent
            ? touchStartY - (event.touches[0]?.clientY ?? touchStartY)
            : 0;

      if (scrollContainer && canScrollWithin(scrollContainer, deltaY)) {
        event.stopPropagation();
        return;
      }

      event.preventDefault();
      event.stopPropagation();
    };

    window.dispatchEvent(
      new CustomEvent("domtek:scroll-lock", { detail: { locked: true } }),
    );
    body.style.overscrollBehavior = "none";
    documentElement.style.overflowY = "scroll";
    documentElement.style.overscrollBehavior = "none";
    window.addEventListener("touchstart", onTouchStart, {
      capture: true,
      passive: true,
    });
    window.addEventListener(
      "wheel",
      preventBackgroundScroll,
      scrollEventOptions,
    );
    window.addEventListener(
      "touchmove",
      preventBackgroundScroll,
      scrollEventOptions,
    );

    return () => {
      window.removeEventListener("touchstart", onTouchStart, {
        capture: true,
      });
      window.removeEventListener(
        "wheel",
        preventBackgroundScroll,
        scrollEventOptions,
      );
      window.removeEventListener(
        "touchmove",
        preventBackgroundScroll,
        scrollEventOptions,
      );
      body.style.overscrollBehavior = previousBodyStyles.overscrollBehavior;
      documentElement.style.overflowY = previousDocumentStyles.overflowY;
      documentElement.style.overscrollBehavior =
        previousDocumentStyles.overscrollBehavior;
      const restoreScrollY = lockedScrollYRef.current;
      window.scrollTo(window.scrollX, restoreScrollY);
      window.dispatchEvent(
        new CustomEvent("domtek:scroll-lock", {
          detail: { locked: false, scrollY: restoreScrollY },
        }),
      );
    };
  }, [selectedPatent]);

  useEffect(() => {
    if (dialogState !== "open") return;

    const focusTimer = window.setTimeout(() => {
      panelRef.current?.focus({ preventScroll: true });
    }, MODAL_TRANSITION_MS);

    return () => window.clearTimeout(focusTimer);
  }, [dialogState]);

  useEffect(() => {
    if (!selectedPatent) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (selectedLinkedProject) return;

      if (activeDrawingIndex !== null) {
        if (event.key === "Escape") {
          closeDrawing();
          return;
        }

        if (event.key === "ArrowLeft") {
          event.preventDefault();
          cycleDrawing(-1);
          return;
        }

        if (event.key === "ArrowRight") {
          event.preventDefault();
          cycleDrawing(1);
          return;
        }
      }

      if (event.key === "Escape") {
        closePatent();
        return;
      }

      if (selectedPatent.images.length > 1 && event.key === "ArrowLeft") {
        event.preventDefault();
        cycleModalImage(-1);
        return;
      }

      if (selectedPatent.images.length > 1 && event.key === "ArrowRight") {
        event.preventDefault();
        cycleModalImage(1);
        return;
      }

      const focusRoot = modalRootRef.current ?? panelRef.current;
      if (event.key !== "Tab" || !focusRoot) return;

      const focusable = Array.from(
        focusRoot.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])',
        ),
      ).filter(
        (element) =>
          !element.hasAttribute("disabled") &&
          element.getClientRects().length > 0,
      );

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    activeDrawingIndex,
    closeDrawing,
    closePatent,
    cycleDrawing,
    cycleModalImage,
    selectedPatent,
    selectedLinkedProject,
  ]);

  useEffect(() => {
    if (!selectedPatent || dialogState !== "open") return;

    const onResize = () => setPanelRect(centeredPatentPanelRect());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [dialogState, selectedPatent]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  const panelStyle = panelRect
    ? ({
        left: panelRect.left,
        top: panelRect.top,
        width: Math.max(panelRect.width, 1),
        height: Math.max(panelRect.height, 1),
        borderRadius: panelRect.radius,
        transformOrigin: "50% 50%",
      } satisfies CSSProperties)
    : undefined;

  const contentVisible = dialogState !== "closing";
  const backdropVisible = dialogState === "open";
  const panelVisible = dialogState === "open";
  const selectedPatentCategory = selectedPatent
    ? getPatentCategoryLabel(selectedPatent.filter, resolvedLocale)
    : "";
  const selectedPatentLinkedProjects = useMemo(
    () =>
      selectedPatent
        ? getPatentLinkedProjectsForLocale(selectedPatent.id, resolvedLocale)
        : [],
    [resolvedLocale, selectedPatent],
  );
  const selectedPatentImages = selectedPatent?.images ?? [];
  const safeModalImageIndex = selectedPatentImages[modalImageIndex]
    ? modalImageIndex
    : 0;
  const modalImage = selectedPatentImages[safeModalImageIndex] ?? null;
  const modalImageHref = modalImage?.href ?? selectedPatent?.coverImage ?? "";
  const hasMultipleModalImages = selectedPatentImages.length > 1;
  const modalImageStyle = {
    transform: `translate3d(${modalImageOffset.x}px, ${modalImageOffset.y}px, 0) rotate(${modalImageRotation}deg) scale(${modalImageZoom})`,
  } satisfies CSSProperties;
  return (
    <>
      <section
        className="relative min-h-[560px] overflow-hidden border-b border-border bg-background pt-[132px] md:min-h-[620px] md:pt-[152px] min-[1800px]:!min-h-[700px] min-[2400px]:!min-h-[820px] min-[2400px]:!pt-[152px]"
        aria-labelledby="patent-page-title"
      >
        <Image
          src={`${ASSET_BASE}/hero-sketch.png`}
          alt=""
          width={897}
          height={738}
          priority
          quality={100}
          unoptimized
          sizes="(max-width: 768px) 92vw, (max-width: 1799px) 800px, (max-width: 2399px) 1040px, 1200px"
          className="pointer-events-none absolute right-[-250px] top-[66px] z-0 hidden w-[61vw] max-w-[800px] opacity-[0.82] md:block lg:right-[-54px] xl:right-0 min-[1800px]:!right-[4vw] min-[1800px]:!top-[84px] min-[1800px]:!w-[52vw] min-[1800px]:!max-w-[1040px] min-[2400px]:!right-[6vw] min-[2400px]:!max-w-[1200px]"
        />
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-white via-white/42 to-transparent" />

        <Container
          size="wide"
          className="relative z-10 grid min-h-[440px] items-start min-[1800px]:!min-h-[540px] min-[2400px]:!min-h-[660px]"
        >
          <Reveal className="max-w-[515px] min-[1800px]:!max-w-[720px] min-[2400px]:!max-w-[900px]">
            <div className="flex items-center gap-3 text-[15px] font-medium leading-none text-muted-foreground md:text-[16px] min-[2400px]:!gap-5 min-[2400px]:!text-[26px]">
              <span
                className="h-[3px] w-[34px] shrink-0 bg-brand min-[2400px]:!h-1 min-[2400px]:!w-[74px]"
                aria-hidden
              />
              {copy.hero.eyebrow}
            </div>
            <h1
              id="patent-page-title"
              className="domtek-text-shadow mt-[38px] text-[42px] font-extrabold leading-none text-foreground sm:text-[60px] md:mt-[52px] md:text-[66px] min-[1800px]:!text-[74px] min-[2400px]:!mt-[82px] min-[2400px]:!text-[96px]"
            >
              {copy.hero.title}
              <span className="text-brand">.</span>
            </h1>
            <p className="mt-8 max-w-[430px] text-[15px] font-medium leading-[1.35] text-muted-foreground sm:text-[16px] min-[1800px]:!max-w-[620px] min-[1800px]:!text-[18px] min-[2400px]:!max-w-[760px] min-[2400px]:!text-[21px]">
              {copy.hero.leadOne}
            </p>
            <p className="mt-5 max-w-[430px] text-[15px] font-medium leading-[1.35] text-muted-foreground sm:text-[16px] min-[1800px]:!max-w-[620px] min-[1800px]:!text-[18px] min-[2400px]:!max-w-[760px] min-[2400px]:!text-[21px]">
              {copy.hero.leadTwo}
            </p>
          </Reveal>

          <PatentStatsBar stats={stats} />
        </Container>
      </section>

      <section
        className="bg-background pb-[64px] pt-[116px] md:pb-[58px] md:pt-[98px] min-[1800px]:!pb-[96px] min-[1800px]:!pt-[120px] min-[2400px]:!pb-[112px] min-[2400px]:!pt-[140px]"
        aria-labelledby="patent-archive-title"
      >
        <Container size="wide">
          <Reveal className="flex min-w-0 flex-col gap-4 min-[860px]:flex-row min-[860px]:items-end min-[860px]:justify-between">
            <div className="min-w-0 shrink-0">
              <h2
                id="patent-archive-title"
                className="text-[22px] font-extrabold leading-none text-foreground min-[1800px]:!text-[28px] min-[2400px]:!text-[32px]"
              >
                {copy.archiveTitle}
              </h2>
              <p className="mt-3 text-[12px] font-medium text-muted-foreground min-[1800px]:!text-[14px] min-[2400px]:!text-[16px]">
                {visiblePatents.length} / {PATENTS.length} {copy.resultsLabel}
              </p>
            </div>
            {renderPatentControls({
              wrapperClassName:
                "hidden w-full min-w-0 gap-3 sm:grid sm:grid-cols-[minmax(150px,210px)_minmax(0,1fr)] min-[860px]:w-auto min-[860px]:grid-cols-[180px_320px] min-[860px]:justify-end lg:grid-cols-[210px_360px] min-[1800px]:!grid-cols-[250px_440px] min-[1800px]:!gap-4 min-[2400px]:!grid-cols-[280px_500px]",
              sortClassName: "relative z-30 min-w-0",
              searchClassName: "relative block min-w-0",
            })}
          </Reveal>

          <Reveal
            delay={0.06}
            className="mt-9 sm:mt-6 min-[860px]:mt-9"
            as="div"
          >
            <div
              className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-[82px_repeat(6,minmax(0,1fr))] min-[1800px]:!grid-cols-[110px_repeat(6,minmax(0,1fr))] min-[1800px]:!gap-5 min-[2400px]:!grid-cols-[128px_repeat(6,minmax(0,1fr))] min-[2400px]:!gap-6"
              role="group"
              aria-label={copy.filtersLabel}
            >
              {filters.map((filter) => {
                const active = activeFilter === filter.key;
                const count = getFilterCount(filter.key);
                const FilterIcon = filter.icon;
                return (
                  <button
                    key={filter.key}
                    type="button"
                    className={cn(
                      "group/filter grid h-[48px] min-w-0 items-center gap-3 rounded-[4px] border border-border bg-white px-4 text-left shadow-[0_2px_6px_rgba(0,0,0,0.05)] outline-none transition-[translate,background-color,border-color,box-shadow,color] duration-500 hover:-translate-y-1 hover:border-brand/35 hover:shadow-[0_12px_26px_rgba(0,0,0,0.09)] focus-visible:ring-2 focus-visible:ring-brand/35 [transition-timing-function:var(--ease-smooth)] min-[1800px]:!h-[58px] min-[1800px]:!px-5 min-[2400px]:!h-[64px] min-[2400px]:!px-6",
                      FilterIcon
                        ? "grid-cols-[auto_1fr]"
                        : "place-items-center text-center",
                      active &&
                        "border-brand bg-brand text-white shadow-[0_10px_22px_rgba(0,0,0,0.18)] hover:border-brand hover:bg-brand hover:text-white hover:shadow-[0_12px_26px_rgba(0,0,0,0.18)]",
                    )}
                    aria-pressed={active}
                    onClick={() => setActiveFilter(filter.key)}
                  >
                    {FilterIcon && (
                      <FilterIcon
                        aria-hidden
                        strokeWidth={1.8}
                        className={cn(
                          "size-7 shrink-0 text-brand transition-transform duration-500 group-hover/filter:-translate-y-0.5 group-hover/filter:scale-105 [transition-timing-function:var(--ease-smooth)]",
                          active && "text-white",
                        )}
                      />
                    )}
                    <span
                      className={cn(
                        "grid min-w-0",
                        !FilterIcon && "place-items-center text-center",
                      )}
                    >
                      <strong className="text-[12px] font-extrabold leading-none min-[1800px]:!text-[14px] min-[2400px]:!text-[16px]">
                        {filter.label}
                      </strong>
                      {filter.key !== "all" && (
                        <span
                          className={cn(
                            "mt-1 text-[9px] font-medium leading-none text-muted-foreground min-[1800px]:!text-[10px] min-[2400px]:!text-[12px]",
                            active && "text-white/85",
                          )}
                        >
                          {count} {copy.filterCountLabel}
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.09} className="mt-5 sm:hidden" as="div">
            {renderPatentControls({
              wrapperClassName: "grid w-full gap-3",
              sortClassName: "relative z-30 w-full",
              searchClassName: "relative block w-full",
            })}
          </Reveal>

          {visiblePatents.length > 0 ? (
            <div className="mt-10 grid gap-5 lg:grid-cols-2 min-[1800px]:!mt-12 min-[1800px]:!gap-6 min-[2400px]:!mt-16 min-[2400px]:!gap-8">
              {visiblePatents.map((patent) => (
                <div key={patent.id}>
                  <PatentCard
                    patent={patent}
                    depositedLabel={copy.deposited}
                    openDetailsLabel={copy.card.openDetails}
                    previousDrawingLabel={copy.details.previousDrawing}
                    nextDrawingLabel={copy.details.nextDrawing}
                    onOpen={openPatent}
                  />
                </div>
              ))}
            </div>
          ) : (
            <Reveal className="mt-8 rounded-[5px] border border-border bg-white px-5 py-10 text-center text-[14px] font-medium text-muted-foreground">
              {copy.noResults}
            </Reveal>
          )}
        </Container>
      </section>

      {selectedPatent && (
        <div
          ref={modalRootRef}
          className="fixed inset-0 z-[1000]"
          aria-hidden={dialogState === "closed"}
        >
          <button
            type="button"
            tabIndex={-1}
            className={cn(
              "absolute inset-0 cursor-default bg-black/55 backdrop-blur-[7px] transition-opacity duration-200 ease-out",
              backdropVisible ? "opacity-100" : "opacity-0",
            )}
            aria-label={copy.details.close}
            onClick={closePatent}
          />

          <section
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="patent-dialog-title"
            tabIndex={-1}
            style={panelStyle}
            className={cn(
              "fixed transform-gpu overflow-hidden bg-white shadow-[0_34px_110px_rgba(0,0,0,0.26)] outline-none transition-[opacity,transform] duration-300 ease-out will-change-transform",
              panelVisible
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-4 scale-[0.975] opacity-0",
            )}
          >
            <button
              type="button"
              className={cn(
                "absolute right-4 top-4 z-20 grid size-10 place-items-center rounded-full border border-border bg-white/95 text-foreground transition duration-200 hover:rotate-6 hover:scale-105 focus-visible:ring-2 focus-visible:ring-brand/30",
                contentVisible ? "opacity-100" : "opacity-0",
              )}
              aria-label={copy.details.close}
              onClick={closePatent}
            >
              <X className="size-4" aria-hidden />
            </button>

            <div
              className={cn(
                "grid h-full md:grid-cols-[44%_56%]",
                !contentVisible && "pointer-events-none",
              )}
            >
              <div
                className={cn(
                  "relative min-h-[240px] touch-none overflow-hidden bg-[#f7f7f7] md:min-h-0",
                  modalImageZoom > 1
                    ? "cursor-grab active:cursor-grabbing"
                    : modalImage
                      ? "cursor-zoom-in"
                      : "cursor-default",
                )}
                data-patent-image-preview
                onClick={(event) => {
                  if (!modalImage) return;
                  if ((event.target as HTMLElement).closest("button, a"))
                    return;
                  if (modalImageClickSuppressedRef.current) {
                    modalImageClickSuppressedRef.current = false;
                    return;
                  }
                  showDrawing(safeModalImageIndex);
                }}
                onPointerDown={handleModalImagePanStart}
                onPointerMove={handleModalImagePanMove}
                onPointerUp={handleModalImagePanEnd}
                onPointerCancel={handleModalImagePanEnd}
              >
                {modalImageHref ? (
                  <Image
                    src={modalImageHref}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 520px"
                    quality={100}
                    unoptimized
                    draggable={false}
                    className="pointer-events-none select-none object-contain object-center p-5 transition-transform duration-500 md:p-8 [transition-timing-function:var(--ease-smooth)]"
                    style={modalImageStyle}
                  />
                ) : (
                  <Image
                    src={`${ASSET_BASE}/hero-sketch.png`}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 390px"
                    quality={100}
                    unoptimized
                    className="object-cover object-center opacity-20"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-transparent to-black/50" />
                {hasMultipleModalImages && (
                  <>
                    <button
                      type="button"
                      className="absolute left-4 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-foreground shadow-[0_10px_26px_rgba(0,0,0,0.14)] transition-[transform,background-color,color] duration-500 hover:scale-110 hover:bg-brand hover:text-white focus-visible:ring-2 focus-visible:ring-brand/30 [transition-timing-function:var(--ease-smooth)]"
                      aria-label={copy.details.previousDrawing}
                      onClick={() => cycleModalImage(-1)}
                    >
                      <ChevronLeft className="size-5" aria-hidden />
                    </button>
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-foreground shadow-[0_10px_26px_rgba(0,0,0,0.14)] transition-[transform,background-color,color] duration-500 hover:scale-110 hover:bg-brand hover:text-white focus-visible:ring-2 focus-visible:ring-brand/30 [transition-timing-function:var(--ease-smooth)]"
                      aria-label={copy.details.nextDrawing}
                      onClick={() => cycleModalImage(1)}
                    >
                      <ChevronRight className="size-5" aria-hidden />
                    </button>
                  </>
                )}
                {selectedPatentImages.length > 0 && (
                  <div className="absolute right-16 top-[34px] z-20 rounded-full bg-white/95 px-3 py-2 text-[11px] font-extrabold text-foreground shadow-[0_8px_20px_rgba(0,0,0,0.12)] md:right-6">
                    {safeModalImageIndex + 1} / {selectedPatentImages.length}
                  </div>
                )}
                {modalImageHref && (
                  <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2 md:right-6">
                    <button
                      type="button"
                      className="grid size-9 place-items-center rounded-full bg-white/95 text-foreground shadow-[0_10px_24px_rgba(0,0,0,0.16)] transition-[transform,background-color,color,opacity] duration-500 hover:scale-110 hover:bg-brand hover:text-white focus-visible:ring-2 focus-visible:ring-brand/30 disabled:cursor-not-allowed disabled:opacity-45 [transition-timing-function:var(--ease-smooth)]"
                      aria-label={copy.details.zoomOutDrawing}
                      title={copy.details.zoomOutDrawing}
                      disabled={modalImageZoom <= 1}
                      onClick={() => zoomModalImage(-1)}
                    >
                      <ZoomOut className="size-4" aria-hidden />
                    </button>
                    <button
                      type="button"
                      className="grid size-9 place-items-center rounded-full bg-white/95 text-foreground shadow-[0_10px_24px_rgba(0,0,0,0.16)] transition-[transform,background-color,color] duration-500 hover:scale-110 hover:bg-brand hover:text-white focus-visible:ring-2 focus-visible:ring-brand/30 [transition-timing-function:var(--ease-smooth)]"
                      aria-label={copy.details.zoomInDrawing}
                      title={copy.details.zoomInDrawing}
                      onClick={() => zoomModalImage(1)}
                    >
                      <ZoomIn className="size-4" aria-hidden />
                    </button>
                    <button
                      type="button"
                      className="grid size-9 place-items-center rounded-full bg-white/95 text-foreground shadow-[0_10px_24px_rgba(0,0,0,0.16)] transition-[transform,background-color,color] duration-500 hover:scale-110 hover:bg-brand hover:text-white focus-visible:ring-2 focus-visible:ring-brand/30 [transition-timing-function:var(--ease-smooth)]"
                      aria-label={copy.details.rotateDrawing}
                      title={copy.details.rotateDrawing}
                      onClick={rotateModalImage}
                    >
                      <RotateCw className="size-4" aria-hidden />
                    </button>
                    {modalImage && (
                      <button
                        type="button"
                        className="grid size-9 place-items-center rounded-full bg-white/95 text-foreground shadow-[0_10px_24px_rgba(0,0,0,0.16)] transition-[transform,background-color,color] duration-500 hover:scale-110 hover:bg-brand hover:text-white focus-visible:ring-2 focus-visible:ring-brand/30 [transition-timing-function:var(--ease-smooth)]"
                        aria-label={copy.details.openImageViewer}
                        title={copy.details.openImageViewer}
                        onClick={() => showDrawing(safeModalImageIndex)}
                      >
                        <Search className="size-4" aria-hidden />
                      </button>
                    )}
                  </div>
                )}
                <div className="absolute left-6 top-6 grid size-12 place-items-center rounded-[6px] bg-white shadow-[0_12px_28px_rgba(0,0,0,0.08)]">
                  {(() => {
                    const SelectedPatentIcon = CARD_ICON[selectedPatent.filter];
                    return (
                      <SelectedPatentIcon
                        aria-hidden
                        strokeWidth={1.8}
                        className="size-8 text-brand"
                      />
                    );
                  })()}
                </div>
                <div className="absolute bottom-20 left-6 right-6">
                  <strong className="block max-w-[360px] text-[25px] font-extrabold leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
                    {selectedPatent.publication}
                  </strong>
                  <span className="mt-2 block text-[11px] font-extrabold uppercase tracking-wide text-brand">
                    {selectedPatentCategory}
                  </span>
                </div>
              </div>

              <div
                data-patent-dialog-scroll
                data-lenis-prevent
                className="min-w-0 overflow-y-auto overscroll-contain px-5 py-7 md:px-10 md:py-10 lg:px-12"
              >
                <span className="text-[11px] font-extrabold uppercase tracking-wide text-brand">
                  {copy.details.eyebrow}
                </span>
                <h2
                  id="patent-dialog-title"
                  className="mt-3 max-w-[680px] break-words text-[27px] font-extrabold leading-[1.04] text-foreground md:text-[34px] lg:text-[36px]"
                >
                  {selectedPatent.title}
                </h2>
                <p className="mt-4 max-w-[680px] text-[14px] font-medium leading-[1.55] text-muted-foreground md:text-[15px]">
                  {selectedPatent.abstract || copy.details.unavailable}
                </p>

                {selectedPatentLinkedProjects.length > 0 && (
                  <section className="mt-6">
                    <h3 className="text-[12px] font-extrabold uppercase tracking-wide">
                      {copy.details.linkedProjects}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {selectedPatentLinkedProjects.map((project) => (
                        <button
                          key={project.id}
                          type="button"
                          className="group/projectLink inline-flex min-h-11 items-center justify-center gap-3 rounded-[7px] bg-brand px-4 py-2.5 text-[13px] font-extrabold text-white shadow-[0_4px_10px_rgba(0,0,0,0.28)] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35"
                          aria-haspopup="dialog"
                          aria-label={`${copy.details.openLinkedProject}: ${project.title}`}
                          onClick={() => openLinkedProject(project.id)}
                        >
                          <span>{project.title}</span>
                          <ArrowRight
                            className="size-4 transition-transform duration-300 group-hover/projectLink:translate-x-0.5"
                            aria-hidden
                          />
                        </button>
                      ))}
                    </div>
                  </section>
                )}

                <div className="mt-7 grid gap-5 md:grid-cols-2">
                  <section>
                    <h3 className="text-[12px] font-extrabold uppercase tracking-wide">
                      {copy.details.overview}
                    </h3>
                    <p className="mt-3 text-[14px] font-medium leading-[1.65] text-muted-foreground">
                      {selectedPatent.abstract || copy.details.unavailable}
                    </p>
                  </section>
                  <section>
                    <h3 className="text-[12px] font-extrabold uppercase tracking-wide">
                      {copy.details.tags}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[selectedPatentCategory, ...selectedPatent.tags].map(
                        (tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-muted px-3 py-1.5 text-[11px] font-medium text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ),
                      )}
                    </div>
                  </section>
                </div>

                <div className="mt-8 grid border border-border sm:grid-cols-2">
                  <PatentFact
                    label={copy.details.publication}
                    value={selectedPatent.publication}
                  />
                  <PatentFact
                    label={copy.details.publicationDate}
                    value={selectedPatent.date}
                  />
                  <PatentFact
                    label={copy.details.priorityDate}
                    value={selectedPatent.priorityDate}
                  />
                  <PatentFact
                    label={copy.details.category}
                    value={selectedPatentCategory}
                  />
                  <PatentFact
                    label={copy.details.inventors}
                    value={selectedPatent.inventors}
                    wide
                  />
                  <PatentFact
                    label={copy.details.applicants}
                    value={selectedPatent.applicants}
                    wide
                  />
                  <PatentFact
                    label={copy.details.application}
                    value={selectedPatent.applicationNumber}
                    wide
                  />
                  <PatentFact
                    label={copy.details.classification}
                    value={selectedPatent.classification}
                    wide
                  />
                  <PatentFact
                    label={copy.details.alsoPublishedAs}
                    value={selectedPatent.alsoPublishedAs}
                    wide
                  />
                </div>

                {selectedPatent.images.length > 0 && (
                  <PatentDrawingGallery
                    title={copy.details.images}
                    images={selectedPatent.images}
                    copy={copy.details}
                    onOpen={showDrawing}
                  />
                )}

                <section className="mt-8 grid gap-3 sm:grid-cols-2">
                  <PatentLinkGroup
                    title={copy.details.sourceLinks}
                    links={selectedPatent.links}
                  />
                  <PatentPdfGroup
                    title={copy.details.downloadPdfs}
                    pdfs={selectedPatent.pdfs}
                  />
                </section>

                <section className="mt-8 grid gap-4">
                  {detailError ? (
                    <p className="rounded-[4px] border border-border bg-muted px-4 py-3 text-[13px] font-medium text-muted-foreground">
                      {copy.details.unavailable}
                    </p>
                  ) : selectedPatentDetails ? (
                    <PatentDetailSections
                      copy={copy.details}
                      detail={selectedPatentDetails}
                    />
                  ) : (
                    <p className="rounded-[4px] border border-border bg-muted px-4 py-3 text-[13px] font-medium text-muted-foreground">
                      {copy.details.loading}
                    </p>
                  )}
                </section>
              </div>
            </div>
          </section>
          {activeDrawingIndex !== null &&
            selectedPatent.images[activeDrawingIndex] && (
              <PatentDrawingLightbox
                images={selectedPatent.images}
                activeIndex={activeDrawingIndex}
                copy={copy.details}
                onClose={closeDrawing}
                onPrevious={() => cycleDrawing(-1)}
                onNext={() => cycleDrawing(1)}
              />
            )}
        </div>
      )}
      {selectedLinkedProject && (
        <ProjectDetailsDialog
          key={selectedLinkedProject.id}
          locale={resolvedLocale}
          modal={projectsCopy.modal}
          project={selectedLinkedProject}
          onClosed={() => setSelectedLinkedProject(null)}
        />
      )}
    </>
  );
}

function PatentStatsBar({ stats }: { stats: PatentStat[] }) {
  return (
    <Reveal
      delay={0.1}
      className="relative z-20 mx-auto mt-10 w-full max-w-[720px] md:absolute md:bottom-9 md:left-1/2 md:mt-0 md:-translate-x-1/2 min-[1800px]:!bottom-12 min-[1800px]:!max-w-[1000px] min-[2400px]:!bottom-14 min-[2400px]:!max-w-[1180px]"
    >
      <div className="grid overflow-hidden rounded-[9px] border border-border/80 bg-white shadow-[0_7px_14px_rgba(0,0,0,0.20)] sm:grid-cols-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className={cn(
                "group/stat grid min-h-[74px] grid-cols-[34px_1fr] items-center gap-3 px-5 py-3 transition-shadow duration-500 hover:z-10 hover:shadow-[0_18px_42px_rgba(0,0,0,0.08)] [transition-timing-function:var(--ease-smooth)] min-[1800px]:!min-h-[90px] min-[1800px]:!grid-cols-[44px_1fr] min-[1800px]:!gap-4 min-[1800px]:!px-7 min-[1800px]:!py-4 min-[2400px]:!min-h-[104px] min-[2400px]:!grid-cols-[50px_1fr] min-[2400px]:!px-8",
                index < stats.length - 1 &&
                  "border-b border-border sm:border-b-0 sm:border-r",
              )}
            >
              <span className="grid size-8 place-items-center text-brand transition-transform duration-500 group-hover/stat:-translate-y-1 [transition-timing-function:var(--ease-smooth)] min-[1800px]:!size-10 min-[2400px]:!size-12">
                <Icon aria-hidden strokeWidth={1.8} className="size-full" />
              </span>
              <div className="min-w-0">
                <strong className="block text-[24px] font-extrabold leading-none text-foreground min-[1800px]:!text-[30px] min-[2400px]:!text-[34px]">
                  {stat.value}
                </strong>
                <span className="mt-1 block text-[10px] font-extrabold leading-none text-foreground/80 min-[1800px]:!mt-2 min-[1800px]:!text-[13px] min-[2400px]:!text-[15px]">
                  {stat.label}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </Reveal>
  );
}

function PatentFact({
  label,
  value,
  wide = false,
}: {
  label: string;
  value?: string;
  wide?: boolean;
}) {
  if (!value) return null;

  return (
    <div
      className={cn(
        "border-b border-border p-4 last:border-b-0 sm:border-r sm:[&:nth-child(even)]:border-r-0",
        wide && "sm:col-span-2 sm:border-r-0",
      )}
    >
      <strong className="block text-[13px] font-extrabold leading-tight text-foreground">
        {value}
      </strong>
      <span className="mt-2 block text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function PatentLinkGroup({
  title,
  links,
}: {
  title: string;
  links: PatentSourceLinks;
}) {
  const entries = [
    ["Biblio", links.biblio],
    ["Description", links.description],
    ["Claims", links.claims],
    ["Mosaics", links.mosaics],
    ["Original", links.originalDocument],
    ["Legal", links.legalStatus],
    ["Family", links.inpadocFamily],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]));

  if (!entries.length) return null;

  return (
    <div className="rounded-[4px] border border-border p-4">
      <h3 className="text-[12px] font-extrabold uppercase tracking-wide">
        {title}
      </h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {entries.map(([label, href]) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 items-center gap-2 rounded-full bg-muted px-3 text-[11px] font-extrabold text-foreground transition-colors hover:bg-brand hover:text-white"
          >
            {label}
            <ExternalLink className="size-3" aria-hidden />
          </a>
        ))}
      </div>
    </div>
  );
}

function PatentPdfGroup({
  title,
  pdfs,
}: {
  title: string;
  pdfs: PatentAsset[];
}) {
  if (!pdfs.length) return null;

  return (
    <div className="rounded-[4px] border border-border p-4">
      <h3 className="text-[12px] font-extrabold uppercase tracking-wide">
        {title}
      </h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {pdfs.slice(0, 8).map((pdf, index) => (
          <a
            key={pdf.href}
            href={pdf.href}
            download
            className="inline-flex h-8 items-center gap-2 rounded-full bg-muted px-3 text-[11px] font-extrabold text-foreground transition-colors hover:bg-brand hover:text-white"
          >
            PDF {index + 1}
            <Download className="size-3" aria-hidden />
          </a>
        ))}
      </div>
    </div>
  );
}

function PatentDetailSections({
  copy,
  detail,
}: {
  copy: (typeof COPY)["en"]["details"];
  detail: PatentDetail;
}) {
  return (
    <>
      <PatentTextSection
        title={copy.fullDescription}
        paragraphs={detail.descriptionParagraphs}
        fallback={copy.unavailable}
        defaultOpen
      />
      <PatentClaimsSection
        title={copy.claims}
        claims={detail.claims}
        fallback={copy.unavailable}
      />
      <PatentLegalSection
        title={copy.legalStatus}
        events={detail.legalEvents}
        fallback={copy.unavailable}
      />
      <PatentReferenceSection
        title={copy.family}
        rows={detail.familyRows}
        fallback={copy.unavailable}
        defaultOpen
      />
      <PatentReferenceSection
        title={copy.cited}
        rows={detail.citedRows}
        fallback={copy.unavailable}
      />
      <PatentReferenceSection
        title={copy.citing}
        rows={detail.citingRows}
        fallback={copy.unavailable}
      />
    </>
  );
}

function PatentSectionShell({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      className="group rounded-[5px] border border-border bg-white shadow-[0_4px_14px_rgba(0,0,0,0.04)]"
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[12px] font-extrabold uppercase tracking-wide text-foreground marker:hidden">
        {title}
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-muted text-[15px] leading-none text-brand transition-transform duration-300 group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="border-t border-border px-5 py-5">{children}</div>
    </details>
  );
}

function PatentTextSection({
  title,
  paragraphs,
  fallback,
  defaultOpen = false,
}: {
  title: string;
  paragraphs: string[];
  fallback: string;
  defaultOpen?: boolean;
}) {
  return (
    <PatentSectionShell title={title} defaultOpen={defaultOpen}>
      {paragraphs.length ? (
        <div className="max-h-[360px] space-y-3 overflow-y-auto pr-2 text-[13px] font-medium leading-[1.65] text-muted-foreground">
          {paragraphs.map((paragraph, index) => (
            <p key={`${paragraph.slice(0, 28)}-${index}`}>{paragraph}</p>
          ))}
        </div>
      ) : (
        <PatentEmptyText>{fallback}</PatentEmptyText>
      )}
    </PatentSectionShell>
  );
}

function PatentClaimsSection({
  title,
  claims,
  fallback,
}: {
  title: string;
  claims: string[];
  fallback: string;
}) {
  return (
    <PatentSectionShell title={title}>
      {claims.length ? (
        <div className="max-h-[360px] space-y-2 overflow-y-auto pr-2">
          {claims.map((claim, index) => (
            <p
              key={`${claim.slice(0, 28)}-${index}`}
              className="rounded-[4px] bg-muted px-4 py-3 text-[12px] font-medium leading-[1.55] text-muted-foreground"
            >
              {claim}
            </p>
          ))}
        </div>
      ) : (
        <PatentEmptyText>{fallback}</PatentEmptyText>
      )}
    </PatentSectionShell>
  );
}

function PatentLegalSection({
  title,
  events,
  fallback,
}: {
  title: string;
  events: string[];
  fallback: string;
}) {
  return (
    <PatentSectionShell title={title}>
      {events.length ? (
        <div className="grid gap-3">
          {events.map((event, index) => {
            const [headline, ...details] = event.split("\n").filter(Boolean);
            return (
              <article
                key={`${headline}-${index}`}
                className="rounded-[4px] border border-border bg-muted/45 px-4 py-3"
              >
                <strong className="block text-[13px] font-extrabold leading-tight text-foreground">
                  {headline}
                </strong>
                {details.length > 0 && (
                  <p className="mt-2 whitespace-pre-line text-[12px] font-medium leading-[1.55] text-muted-foreground">
                    {details.join("\n")}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      ) : (
        <PatentEmptyText>{fallback}</PatentEmptyText>
      )}
    </PatentSectionShell>
  );
}

function PatentReferenceSection({
  title,
  rows,
  fallback,
  defaultOpen = false,
}: {
  title: string;
  rows: PatentReferenceRow[];
  fallback: string;
  defaultOpen?: boolean;
}) {
  return (
    <PatentSectionShell title={title} defaultOpen={defaultOpen}>
      {rows.length ? (
        <div className="grid gap-3">
          {rows.map((row) => (
            <PatentReferenceCard key={`${row.idx}-${row.title}`} row={row} />
          ))}
        </div>
      ) : (
        <PatentEmptyText>{fallback}</PatentEmptyText>
      )}
    </PatentSectionShell>
  );
}

function PatentReferenceCard({ row }: { row: PatentReferenceRow }) {
  const entries = Object.entries(row.sections);

  return (
    <article className="rounded-[4px] border border-border bg-muted/35 p-4">
      <div className="flex items-start justify-between gap-4">
        <strong className="text-[13px] font-extrabold leading-tight text-foreground">
          {row.idx ? `${row.idx}. ` : ""}
          {row.title}
        </strong>
        {row.link && (
          <a
            href={row.link}
            target="_blank"
            rel="noreferrer"
            className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-muted-foreground shadow-[0_3px_8px_rgba(0,0,0,0.08)] transition-colors hover:bg-brand hover:text-white"
          >
            <ExternalLink className="size-3.5" aria-hidden />
            <span className="sr-only">Open patent source</span>
          </a>
        )}
      </div>
      {entries.length > 0 && (
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          {entries.map(([label, value]) => (
            <div key={label} className="min-w-0">
              <dt className="text-[9px] font-extrabold uppercase tracking-wide text-brand">
                {label}
              </dt>
              <dd className="mt-1 break-words text-[11px] font-medium leading-[1.45] text-muted-foreground">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
}

function PatentEmptyText({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-[4px] bg-muted px-4 py-3 text-[12px] font-medium text-muted-foreground">
      {children}
    </p>
  );
}

function PatentDrawingGallery({
  title,
  images,
  copy,
  onOpen,
}: {
  title: string;
  images: PatentAsset[];
  copy: (typeof COPY)["en"]["details"];
  onOpen: (index: number) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const safeActiveIndex = images[activeIndex] ? activeIndex : 0;
  const activeImage = images[safeActiveIndex] ?? images[0];
  const hasMultiple = images.length > 1;

  const cycle = (direction: -1 | 1) => {
    setActiveIndex(
      (current) => (current + direction + images.length) % images.length,
    );
  };

  if (!activeImage) return null;

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-[12px] font-extrabold uppercase tracking-wide">
          {title}
        </h3>
        {hasMultiple && (
          <span className="text-[10px] font-extrabold text-muted-foreground">
            {safeActiveIndex + 1} / {images.length}
          </span>
        )}
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_150px]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[5px] border border-border bg-white">
          <button
            type="button"
            className="absolute inset-0 z-10"
            aria-label={`${copy.openDrawing} ${safeActiveIndex + 1}`}
            onClick={() => onOpen(safeActiveIndex)}
          />
          <Image
            src={activeImage.href}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 360px"
            quality={100}
            unoptimized
            className="object-contain p-3 transition-transform duration-700 hover:scale-[1.025] [transition-timing-function:var(--ease-smooth)]"
          />
          {hasMultiple && (
            <div className="pointer-events-none absolute inset-x-3 top-1/2 z-20 flex -translate-y-1/2 justify-between">
              <button
                type="button"
                className="pointer-events-auto grid size-8 place-items-center rounded-full bg-white/95 text-foreground shadow-[0_8px_20px_rgba(0,0,0,0.14)] transition-[transform,background-color,color] duration-500 hover:scale-110 hover:bg-brand hover:text-white [transition-timing-function:var(--ease-smooth)]"
                aria-label={copy.previousDrawing}
                onClick={(event) => {
                  event.stopPropagation();
                  cycle(-1);
                }}
              >
                <ChevronLeft className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                className="pointer-events-auto grid size-8 place-items-center rounded-full bg-white/95 text-foreground shadow-[0_8px_20px_rgba(0,0,0,0.14)] transition-[transform,background-color,color] duration-500 hover:scale-110 hover:bg-brand hover:text-white [transition-timing-function:var(--ease-smooth)]"
                aria-label={copy.nextDrawing}
                onClick={(event) => {
                  event.stopPropagation();
                  cycle(1);
                }}
              >
                <ChevronRight className="size-4" aria-hidden />
              </button>
            </div>
          )}
        </div>

        {hasMultiple && (
          <div className="grid max-h-[260px] grid-cols-3 gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
            {images.map((image, index) => (
              <button
                key={image.href}
                type="button"
                className={cn(
                  "relative aspect-[3/4] overflow-hidden rounded-[4px] border bg-white transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-[0_10px_20px_rgba(0,0,0,0.10)] [transition-timing-function:var(--ease-smooth)]",
                  index === safeActiveIndex
                    ? "border-brand shadow-[0_9px_18px_rgba(0,0,0,0.12)]"
                    : "border-border",
                )}
                aria-label={`${copy.openDrawing} ${index + 1}`}
                aria-pressed={index === safeActiveIndex}
                onClick={() => setActiveIndex(index)}
                onDoubleClick={() => onOpen(index)}
              >
                <Image
                  src={image.href}
                  alt=""
                  fill
                  sizes="80px"
                  quality={100}
                  unoptimized
                  className="object-contain p-1.5"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {activeImage.pdfHref && (
        <a
          href={activeImage.pdfHref}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex h-8 items-center gap-2 rounded-full bg-muted px-3 text-[11px] font-extrabold text-foreground transition-colors duration-300 hover:bg-brand hover:text-white"
        >
          {copy.vectorPdf}
          <ExternalLink className="size-3" aria-hidden />
        </a>
      )}
    </section>
  );
}

function PatentDrawingLightbox({
  images,
  activeIndex,
  copy,
  onClose,
  onPrevious,
  onNext,
}: {
  images: PatentAsset[];
  activeIndex: number;
  copy: (typeof COPY)["en"]["details"];
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const image = images[activeIndex];
  const hasMultiple = images.length > 1;
  const [viewerState, setViewerState] = useState({
    activeIndex,
    offsetX: 0,
    offsetY: 0,
    rotation: 0,
    zoom: 1,
  });
  const panRef = useRef<{
    pointerId: number;
    x: number;
    y: number;
  } | null>(null);
  const activePointersRef = useRef<Map<number, { x: number; y: number }>>(
    new Map(),
  );
  const pinchRef = useRef<{
    distance: number;
    centerX: number;
    centerY: number;
    offsetX: number;
    offsetY: number;
    zoom: number;
  } | null>(null);
  const currentViewerState =
    viewerState.activeIndex === activeIndex
      ? viewerState
      : {
          activeIndex,
          offsetX: 0,
          offsetY: 0,
          rotation: 0,
          zoom: 1,
        };
  const { offsetX, offsetY, rotation, zoom } = currentViewerState;

  const imageStyle = {
    transform: `translate3d(${offsetX}px, ${offsetY}px, 0) rotate(${rotation}deg) scale(${zoom})`,
  } satisfies CSSProperties;

  const updateViewerState = useCallback(
    (nextState: Omit<typeof viewerState, "activeIndex">) => {
      setViewerState({
        activeIndex,
        ...nextState,
      });
    },
    [activeIndex],
  );

  const clampViewerZoom = useCallback(
    (value: number) => Math.min(2.8, Math.max(1, Number(value.toFixed(2)))),
    [],
  );

  const getPinchGesture = useCallback(() => {
    const [first, second] = Array.from(activePointersRef.current.values());
    if (!first || !second) return null;

    const deltaX = second.x - first.x;
    const deltaY = second.y - first.y;

    return {
      centerX: (first.x + second.x) / 2,
      centerY: (first.y + second.y) / 2,
      distance: Math.hypot(deltaX, deltaY),
    };
  }, []);

  const getZoomedOffset = useCallback(
    (
      element: HTMLDivElement,
      clientX: number,
      clientY: number,
      startZoom: number,
      nextZoom: number,
      startOffsetX: number,
      startOffsetY: number,
    ) => {
      if (nextZoom <= 1) return { offsetX: 0, offsetY: 0 };

      const rect = element.getBoundingClientRect();
      const focalX = clientX - rect.left;
      const focalY = clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const zoomRatio = nextZoom / Math.max(startZoom, 0.01);

      return {
        offsetX:
          startOffsetX + (focalX - centerX - startOffsetX) * (1 - zoomRatio),
        offsetY:
          startOffsetY + (focalY - centerY - startOffsetY) * (1 - zoomRatio),
      };
    },
    [],
  );

  const handleWheelZoom = useCallback(
    (event: ReactWheelEvent<HTMLDivElement>) => {
      if (!event.ctrlKey && !event.metaKey) return;

      event.preventDefault();
      event.stopPropagation();

      const normalizedDelta = Math.max(-18, Math.min(18, event.deltaY));
      const nextZoom = clampViewerZoom(
        zoom * Math.exp(-normalizedDelta * 0.01),
      );
      if (nextZoom === zoom) return;

      updateViewerState({
        ...getZoomedOffset(
          event.currentTarget,
          event.clientX,
          event.clientY,
          zoom,
          nextZoom,
          offsetX,
          offsetY,
        ),
        rotation,
        zoom: nextZoom,
      });
    },
    [
      clampViewerZoom,
      getZoomedOffset,
      offsetX,
      offsetY,
      rotation,
      updateViewerState,
      zoom,
    ],
  );

  const handlePanStart = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      activePointersRef.current.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
      });
      event.currentTarget.setPointerCapture(event.pointerId);

      if (activePointersRef.current.size >= 2) {
        event.preventDefault();
        panRef.current = null;
        const pinch = getPinchGesture();
        if (pinch) {
          pinchRef.current = {
            ...pinch,
            offsetX,
            offsetY,
            zoom,
          };
        }
        return;
      }

      if (zoom <= 1) return;
      event.preventDefault();
      panRef.current = {
        pointerId: event.pointerId,
        x: event.clientX,
        y: event.clientY,
      };
    },
    [getPinchGesture, offsetX, offsetY, zoom],
  );

  const handlePanMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (activePointersRef.current.has(event.pointerId)) {
        activePointersRef.current.set(event.pointerId, {
          x: event.clientX,
          y: event.clientY,
        });
      }

      const pinch = getPinchGesture();
      if (activePointersRef.current.size >= 2 && pinch) {
        event.preventDefault();
        if (!pinchRef.current) {
          pinchRef.current = {
            ...pinch,
            offsetX,
            offsetY,
            zoom,
          };
          return;
        }

        const start = pinchRef.current;
        if (start.distance <= 0) return;

        const nextZoom = clampViewerZoom(
          start.zoom * (pinch.distance / start.distance),
        );
        const rect = event.currentTarget.getBoundingClientRect();
        const startFocalX = start.centerX - rect.left;
        const startFocalY = start.centerY - rect.top;
        const focalX = pinch.centerX - rect.left;
        const focalY = pinch.centerY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const zoomRatio = nextZoom / Math.max(start.zoom, 0.01);

        updateViewerState({
          offsetX:
            nextZoom === 1
              ? 0
              : focalX -
                centerX -
                zoomRatio * (startFocalX - centerX - start.offsetX),
          offsetY:
            nextZoom === 1
              ? 0
              : focalY -
                centerY -
                zoomRatio * (startFocalY - centerY - start.offsetY),
          rotation,
          zoom: nextZoom,
        });
        return;
      }

      const pan = panRef.current;
      if (!pan || pan.pointerId !== event.pointerId) return;
      event.preventDefault();

      const deltaX = event.clientX - pan.x;
      const deltaY = event.clientY - pan.y;
      panRef.current = {
        ...pan,
        x: event.clientX,
        y: event.clientY,
      };
      setViewerState((current) => {
        const base =
          current.activeIndex === activeIndex
            ? current
            : {
                activeIndex,
                offsetX: 0,
                offsetY: 0,
                rotation: 0,
                zoom: 1,
              };

        return {
          ...base,
          offsetX: base.offsetX + deltaX,
          offsetY: base.offsetY + deltaY,
        };
      });
    },
    [
      activeIndex,
      clampViewerZoom,
      getPinchGesture,
      offsetX,
      offsetY,
      rotation,
      updateViewerState,
      zoom,
    ],
  );

  const handlePanEnd = useCallback((event: PointerEvent<HTMLDivElement>) => {
    activePointersRef.current.delete(event.pointerId);
    if (activePointersRef.current.size < 2) {
      pinchRef.current = null;
    }

    const pan = panRef.current;
    if (pan?.pointerId === event.pointerId) {
      panRef.current = null;
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  if (!image) return null;

  return (
    <div className="absolute inset-0 z-50 grid place-items-center bg-black/70 px-4 py-5 backdrop-blur-[4px]">
      <div className="relative h-full w-full max-w-[980px] overflow-hidden rounded-[12px] bg-white shadow-[0_26px_90px_rgba(0,0,0,0.32)]">
        <button
          type="button"
          className="absolute right-4 top-4 z-20 grid size-10 place-items-center rounded-full border border-border bg-white text-foreground transition duration-300 hover:rotate-6 hover:scale-105 focus-visible:ring-2 focus-visible:ring-brand/30"
          aria-label={copy.closeDrawing}
          onClick={onClose}
        >
          <X className="size-4" aria-hidden />
        </button>

        <div className="absolute left-5 top-5 z-20 rounded-full bg-white/95 px-3 py-2 text-[11px] font-extrabold text-foreground shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
          {activeIndex + 1} / {images.length}
        </div>

        <div className="absolute left-[104px] top-5 z-20 flex items-center gap-2">
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full bg-white/95 text-foreground shadow-[0_10px_24px_rgba(0,0,0,0.16)] transition-[transform,background-color,color,opacity] duration-500 hover:scale-110 hover:bg-brand hover:text-white focus-visible:ring-2 focus-visible:ring-brand/30 disabled:cursor-not-allowed disabled:opacity-45 [transition-timing-function:var(--ease-smooth)]"
            aria-label={copy.zoomOutDrawing}
            title={copy.zoomOutDrawing}
            disabled={zoom <= 1}
            onClick={() => {
              const nextZoom = Math.min(
                2.8,
                Math.max(1, Number((zoom - 0.25).toFixed(2))),
              );
              updateViewerState({
                offsetX: nextZoom === 1 ? 0 : offsetX,
                offsetY: nextZoom === 1 ? 0 : offsetY,
                rotation,
                zoom: nextZoom,
              });
            }}
          >
            <ZoomOut className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full bg-white/95 text-foreground shadow-[0_10px_24px_rgba(0,0,0,0.16)] transition-[transform,background-color,color] duration-500 hover:scale-110 hover:bg-brand hover:text-white focus-visible:ring-2 focus-visible:ring-brand/30 [transition-timing-function:var(--ease-smooth)]"
            aria-label={copy.zoomInDrawing}
            title={copy.zoomInDrawing}
            onClick={() =>
              updateViewerState({
                offsetX,
                offsetY,
                rotation,
                zoom: Math.min(
                  2.8,
                  Math.max(1, Number((zoom + 0.25).toFixed(2))),
                ),
              })
            }
          >
            <ZoomIn className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full bg-white/95 text-foreground shadow-[0_10px_24px_rgba(0,0,0,0.16)] transition-[transform,background-color,color] duration-500 hover:scale-110 hover:bg-brand hover:text-white focus-visible:ring-2 focus-visible:ring-brand/30 [transition-timing-function:var(--ease-smooth)]"
            aria-label={copy.rotateDrawing}
            title={copy.rotateDrawing}
            onClick={() =>
              updateViewerState({
                offsetX,
                offsetY,
                rotation: (rotation + 90) % 360,
                zoom,
              })
            }
          >
            <RotateCw className="size-4" aria-hidden />
          </button>
        </div>

        <div
          data-patent-drawing-zoom
          className={cn(
            "relative h-full touch-none bg-[#f8f8f8]",
            zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default",
          )}
          onWheel={handleWheelZoom}
          onPointerDown={handlePanStart}
          onPointerMove={handlePanMove}
          onPointerUp={handlePanEnd}
          onPointerCancel={handlePanEnd}
        >
          <Image
            src={image.href}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 980px"
            quality={100}
            unoptimized
            draggable={false}
            className="pointer-events-none select-none object-contain p-6 transition-transform duration-500 md:p-10 [transition-timing-function:var(--ease-smooth)]"
            style={imageStyle}
          />
        </div>

        {hasMultiple && (
          <>
            <button
              type="button"
              className="absolute left-5 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-foreground shadow-[0_10px_26px_rgba(0,0,0,0.16)] transition-[transform,background-color,color] duration-500 hover:scale-110 hover:bg-brand hover:text-white focus-visible:ring-2 focus-visible:ring-brand/30 [transition-timing-function:var(--ease-smooth)]"
              aria-label={copy.previousDrawing}
              onClick={onPrevious}
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              className="absolute right-5 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-foreground shadow-[0_10px_26px_rgba(0,0,0,0.16)] transition-[transform,background-color,color] duration-500 hover:scale-110 hover:bg-brand hover:text-white focus-visible:ring-2 focus-visible:ring-brand/30 [transition-timing-function:var(--ease-smooth)]"
              aria-label={copy.nextDrawing}
              onClick={onNext}
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </>
        )}

        {image.pdfHref && (
          <a
            href={image.pdfHref}
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-5 left-1/2 z-20 inline-flex h-9 -translate-x-1/2 items-center gap-2 rounded-full bg-white px-4 text-[11px] font-extrabold text-foreground shadow-[0_10px_26px_rgba(0,0,0,0.16)] transition-colors duration-300 hover:bg-brand hover:text-white"
          >
            {copy.vectorPdf}
            <ExternalLink className="size-3" aria-hidden />
          </a>
        )}
      </div>
    </div>
  );
}

function PatentCard({
  patent,
  depositedLabel,
  openDetailsLabel,
  previousDrawingLabel,
  nextDrawingLabel,
  onOpen,
}: {
  patent: PatentItem;
  depositedLabel: string;
  openDetailsLabel: string;
  previousDrawingLabel: string;
  nextDrawingLabel: string;
  onOpen: (patent: PatentItem) => void;
}) {
  const PatentCategoryIcon = CARD_ICON[patent.filter];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const safeActiveImageIndex = patent.images[activeImageIndex]
    ? activeImageIndex
    : 0;
  const activeImage = patent.images[safeActiveImageIndex] ?? patent.images[0];
  const hasMultipleImages = patent.images.length > 1;

  const cycleCardImage = (direction: -1 | 1) => {
    setActiveImageIndex((current) => {
      const count = patent.images.length;
      if (!count) return 0;
      return (current + direction + count) % count;
    });
  };

  return (
    <article className="group/patent relative z-0 flex h-[312px] w-full origin-center transform-gpu flex-row overflow-hidden rounded-[5px] border border-border bg-white text-left shadow-[0_4px_7px_rgba(0,0,0,0.18)] outline-none transition-[scale,box-shadow,border-color] duration-[1100ms] will-change-transform hover:z-10 hover:scale-[1.025] hover:border-brand/25 hover:shadow-[0_16px_34px_rgba(0,0,0,0.15)] focus-within:z-10 focus-within:scale-[1.025] focus-within:border-brand/25 focus-within:shadow-[0_16px_34px_rgba(0,0,0,0.15)] motion-reduce:transition-none min-[390px]:h-[306px] sm:h-[292px] lg:h-[286px] xl:h-[268px] min-[1800px]:!h-[310px] min-[2400px]:!h-[340px] [transition-timing-function:var(--ease-smooth)]">
      <button
        type="button"
        className="absolute inset-0 z-10 cursor-pointer rounded-[5px] outline-none focus-visible:ring-2 focus-visible:ring-brand/35"
        aria-haspopup="dialog"
        aria-label={`${openDetailsLabel}: ${patent.id}`}
        onClick={() => onOpen(patent)}
      />

      <span className="relative block h-full w-[36%] shrink-0 bg-[#f7f7f7] min-[390px]:w-[38%] lg:w-[35%]">
        {activeImage ? (
          <Image
            src={activeImage.href}
            alt=""
            fill
            sizes="(max-width: 768px) 36vw, (max-width: 1024px) 38vw, (max-width: 1799px) 220px, (max-width: 2399px) 300px, 340px"
            className="object-contain p-2.5 transition-transform duration-700 group-hover/patent:scale-105 min-[390px]:p-3 [transition-timing-function:var(--ease-smooth)]"
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center">
            <PatentCategoryIcon
              aria-hidden
              strokeWidth={1.7}
              className="size-12 text-brand opacity-55"
            />
          </span>
        )}
        {hasMultipleImages && (
          <>
            <button
              type="button"
              className="pointer-events-auto absolute left-3 top-1/2 z-30 grid size-7 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-foreground shadow-[0_6px_16px_rgba(0,0,0,0.13)] transition-[transform,background-color,color] duration-500 hover:scale-110 hover:bg-brand hover:text-white focus-visible:ring-2 focus-visible:ring-brand/35 [transition-timing-function:var(--ease-smooth)] min-[1800px]:!left-4 min-[1800px]:!size-8 min-[2400px]:!size-9"
              aria-label={previousDrawingLabel}
              onClick={(event) => {
                event.stopPropagation();
                cycleCardImage(-1);
              }}
            >
              <ChevronLeft className="size-3.5" aria-hidden />
            </button>
            <button
              type="button"
              className="pointer-events-auto absolute right-3 top-1/2 z-30 grid size-7 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-foreground shadow-[0_6px_16px_rgba(0,0,0,0.13)] transition-[transform,background-color,color] duration-500 hover:scale-110 hover:bg-brand hover:text-white focus-visible:ring-2 focus-visible:ring-brand/35 [transition-timing-function:var(--ease-smooth)] min-[1800px]:!right-4 min-[1800px]:!size-8 min-[2400px]:!size-9"
              aria-label={nextDrawingLabel}
              onClick={(event) => {
                event.stopPropagation();
                cycleCardImage(1);
              }}
            >
              <ChevronRight className="size-3.5" aria-hidden />
            </button>
            <span className="absolute bottom-2 right-2 rounded-full bg-white/95 px-2 py-1 text-[9px] font-extrabold text-muted-foreground shadow-[0_5px_12px_rgba(0,0,0,0.08)] min-[1800px]:!bottom-3 min-[1800px]:!right-3 min-[1800px]:!text-[10px] min-[2400px]:!text-[12px]">
              {safeActiveImageIndex + 1} / {patent.images.length}
            </span>
          </>
        )}
      </span>

      <span className="pointer-events-none relative z-20 flex min-w-0 flex-1 flex-col px-3 py-3 min-[390px]:px-4 min-[390px]:py-4 min-[1800px]:!px-6 min-[1800px]:!py-5 min-[2400px]:!px-7 min-[2400px]:!py-6">
        <span className="grid grid-cols-[24px_1fr_auto] items-start gap-2 min-[390px]:grid-cols-[28px_1fr_auto] min-[390px]:gap-3 min-[1800px]:!grid-cols-[32px_1fr_auto] min-[1800px]:!gap-4 min-[2400px]:!grid-cols-[36px_1fr_auto]">
          <span
            className="grid size-6 place-items-center min-[390px]:size-7 min-[1800px]:!size-8 min-[2400px]:!size-9"
            aria-hidden
          >
            <PatentCategoryIcon
              strokeWidth={1.8}
              className="size-full text-brand transition-transform duration-500 group-hover/patent:scale-110 group-focus-within/patent:scale-110 [transition-timing-function:var(--ease-smooth)]"
            />
          </span>
          <span className="max-w-none text-[12px] font-extrabold leading-none text-brand min-[390px]:text-[13px] lg:text-[14px] min-[1800px]:!text-[16px] min-[2400px]:!text-[18px]">
            {patent.publication}
            <span className="ml-2 inline-block size-1.5 translate-y-[-1px] rounded-full bg-brand" />
          </span>
          <ArrowUpRight
            className="size-[16px] text-muted-foreground transition-transform duration-500 group-hover/patent:translate-x-0.5 group-hover/patent:-translate-y-0.5 group-focus-within/patent:translate-x-0.5 group-focus-within/patent:-translate-y-0.5 [transition-timing-function:var(--ease-smooth)] min-[1800px]:!size-5 min-[2400px]:!size-6"
            aria-hidden
          />
        </span>

        <span className="mt-3 max-w-none overflow-hidden text-[12px] font-extrabold leading-[1.08] text-foreground [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] min-[390px]:mt-4 min-[390px]:text-[13px] lg:text-[14px] min-[1800px]:!text-[16px] min-[1800px]:!leading-[1.15] min-[2400px]:!text-[18px]">
          {patent.title}
        </span>
        <span className="mt-2 h-[68px] max-w-none overflow-hidden text-[9px] font-medium leading-[1.35] text-muted-foreground [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4] min-[390px]:mt-3 min-[390px]:h-[72px] min-[390px]:text-[10px] sm:h-[62px] sm:[-webkit-line-clamp:4] lg:h-[54px] xl:h-[50px] min-[1800px]:!mt-4 min-[1800px]:!h-[68px] min-[1800px]:!text-[12px] min-[1800px]:!leading-[1.42] min-[2400px]:!h-[78px] min-[2400px]:!text-[14px]">
          {patent.abstract}
        </span>

        <span className="mt-auto block pt-2 min-[390px]:pt-3">
          <span className="mb-2 block border-t border-border min-[390px]:mb-3" />
          <span className="flex items-end justify-between gap-3">
            <span className="flex h-[22px] min-w-0 flex-wrap gap-x-2 gap-y-2 overflow-hidden min-[390px]:h-[24px] min-[390px]:gap-x-3">
              {patent.tags.map((tag, index) => (
                <span
                  key={tag}
                  className="flex max-w-[116px] items-center gap-2.5 truncate text-[9px] font-extrabold leading-none text-muted-foreground min-[1800px]:!max-w-[150px] min-[1800px]:!text-[10px] min-[2400px]:!max-w-[180px] min-[2400px]:!text-[12px]"
                >
                  {tag}
                  {index < patent.tags.length - 1 && (
                    <span
                      className="size-1 rounded-full bg-brand"
                      aria-hidden
                    />
                  )}
                </span>
              ))}
            </span>
            <span className="shrink-0 text-[10px] font-medium leading-none text-muted-foreground min-[1800px]:!text-[12px] min-[2400px]:!text-[14px]">
              {depositedLabel} {patent.date}
            </span>
          </span>
        </span>
      </span>
    </article>
  );
}

export function PatentPageCta({ locale }: { locale: string }) {
  const copy = COPY[resolveLocale(locale)].cta;

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-white pb-[112px] pt-[72px] md:min-h-[430px] md:pb-[126px] md:pt-[86px] min-[1800px]:!min-h-[500px] min-[1800px]:!pb-[140px] min-[1800px]:!pt-[110px] min-[2400px]:!min-h-[580px] min-[2400px]:!pb-[160px] min-[2400px]:!pt-[130px]"
      aria-labelledby="patent-cta-title"
    >
      <Image
        src={`${ASSET_BASE}/cta-sketch.png`}
        alt=""
        width={665}
        height={415}
        quality={100}
        unoptimized
        sizes="(max-width: 1024px) 100vw, (max-width: 1799px) 620px, (max-width: 2399px) 900px, 1040px"
        className="pointer-events-none absolute bottom-[70px] right-[6%] hidden w-[43vw] max-w-[620px] opacity-35 md:block min-[1800px]:!bottom-[76px] min-[1800px]:!right-[5vw] min-[1800px]:!max-w-[900px] min-[2400px]:!max-w-[1040px]"
      />

      <Container size="wide" className="relative z-10">
        <Reveal className="max-w-[620px] md:pl-[72px] min-[1800px]:!max-w-[820px] min-[2400px]:!max-w-[940px]">
          <div className="flex items-center gap-3 text-[13px] font-extrabold leading-none text-foreground min-[1800px]:!gap-4 min-[1800px]:!text-[17px] min-[2400px]:!text-[19px]">
            <span
              className="h-[3px] w-[34px] bg-brand min-[1800px]:!w-[44px] min-[2400px]:!h-1 min-[2400px]:!w-[52px]"
              aria-hidden
            />
            {copy.eyebrow}
          </div>
          <h2
            id="patent-cta-title"
            className="domtek-text-shadow mt-10 text-[38px] font-extrabold leading-[1.02] text-foreground sm:text-[54px] min-[1800px]:!text-[62px] min-[2400px]:!text-[72px]"
          >
            <span className="text-brand">{copy.titlePrefix}</span>
            {copy.title}
            <span className="whitespace-nowrap text-brand">
              &nbsp;{copy.titleQuestion}
            </span>
          </h2>
          <p className="mt-8 max-w-[560px] text-[15px] font-medium leading-[1.35] text-muted-foreground sm:text-[16px] min-[1800px]:!max-w-[680px] min-[1800px]:!text-[18px] min-[2400px]:!max-w-[780px] min-[2400px]:!text-[20px]">
            {copy.body}
          </p>
          <Button
            nativeButton={false}
            className="mt-8 h-11 rounded-[4px] border-0 px-7 text-[14px] font-extrabold shadow-[0_4px_10px_rgba(0,0,0,0.28)] outline-none ring-0 transition-transform hover:-translate-y-0.5 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-brand/35 min-[1800px]:!h-[52px] min-[1800px]:!px-8 min-[1800px]:!text-[16px] min-[2400px]:!h-[58px] min-[2400px]:!text-[18px]"
            render={<Link href="/contact" />}
          >
            {copy.button}
            <ArrowRight data-icon="inline-end" />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
