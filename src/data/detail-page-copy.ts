import { locales, type Locale } from "@/i18n/routing";

type DetailPageCopy = {
  backToProjects: string;
  backToPatents: string;
  category: string;
  overview: string;
  scope: string;
  gallery: string;
  relatedPatents: string;
  relatedProjects: string;
  publication: string;
  publicationDate: string;
  priorityDate: string;
  inventors: string;
  applicants: string;
  classification: string;
  family: string;
  description: string;
  claims: string;
  sources: string;
  openSource: string;
  openProject: string;
  contact: string;
};

const COPY: Record<Locale, DetailPageCopy> = {
  en: {
    backToProjects: "Back to projects",
    backToPatents: "Back to patents",
    category: "Category",
    overview: "Project overview",
    scope: "What we handled",
    gallery: "Project images",
    relatedPatents: "Related patents",
    relatedProjects: "Related projects",
    publication: "Publication",
    publicationDate: "Publication date",
    priorityDate: "Priority date",
    inventors: "Inventors",
    applicants: "Applicants",
    classification: "Classification",
    family: "Patent family publications",
    description: "Description",
    claims: "Claims",
    sources: "Official sources",
    openSource: "Open source",
    openProject: "Open project",
    contact: "Start a project",
  },
  fr: {
    backToProjects: "Retour aux projets",
    backToPatents: "Retour aux brevets",
    category: "Domaine",
    overview: "Vue d’ensemble du projet",
    scope: "Travail réalisé",
    gallery: "Images du projet",
    relatedPatents: "Brevets liés",
    relatedProjects: "Projets liés",
    publication: "Publication",
    publicationDate: "Date de publication",
    priorityDate: "Date de priorité",
    inventors: "Inventeurs",
    applicants: "Déposants",
    classification: "Classification",
    family: "Publications de la famille",
    description: "Description",
    claims: "Revendications",
    sources: "Sources officielles",
    openSource: "Ouvrir la source",
    openProject: "Voir le projet",
    contact: "Démarrer un projet",
  },
  de: {
    backToProjects: "Zurück zu den Projekten",
    backToPatents: "Zurück zu den Patenten",
    category: "Bereich",
    overview: "Projektübersicht",
    scope: "Unser Beitrag",
    gallery: "Projektbilder",
    relatedPatents: "Verknüpfte Patente",
    relatedProjects: "Verknüpfte Projekte",
    publication: "Veröffentlichung",
    publicationDate: "Veröffentlichungsdatum",
    priorityDate: "Prioritätsdatum",
    inventors: "Erfinder",
    applicants: "Anmelder",
    classification: "Klassifikation",
    family: "Patentfamilie",
    description: "Beschreibung",
    claims: "Ansprüche",
    sources: "Offizielle Quellen",
    openSource: "Quelle öffnen",
    openProject: "Projekt öffnen",
    contact: "Projekt starten",
  },
  es: {
    backToProjects: "Volver a proyectos",
    backToPatents: "Volver a patentes",
    category: "Área",
    overview: "Resumen del proyecto",
    scope: "Trabajo realizado",
    gallery: "Imágenes del proyecto",
    relatedPatents: "Patentes relacionadas",
    relatedProjects: "Proyectos relacionados",
    publication: "Publicación",
    publicationDate: "Fecha de publicación",
    priorityDate: "Fecha de prioridad",
    inventors: "Inventores",
    applicants: "Solicitantes",
    classification: "Clasificación",
    family: "Publicaciones de la familia",
    description: "Descripción",
    claims: "Reivindicaciones",
    sources: "Fuentes oficiales",
    openSource: "Abrir fuente",
    openProject: "Ver proyecto",
    contact: "Iniciar un proyecto",
  },
  ko: {
    backToProjects: "프로젝트로 돌아가기",
    backToPatents: "특허로 돌아가기",
    category: "분야",
    overview: "프로젝트 개요",
    scope: "담당 범위",
    gallery: "프로젝트 이미지",
    relatedPatents: "관련 특허",
    relatedProjects: "관련 프로젝트",
    publication: "공개번호",
    publicationDate: "공개일",
    priorityDate: "우선일",
    inventors: "발명자",
    applicants: "출원인",
    classification: "분류",
    family: "특허 패밀리 공개번호",
    description: "설명",
    claims: "청구항",
    sources: "공식 출처",
    openSource: "출처 열기",
    openProject: "프로젝트 보기",
    contact: "프로젝트 시작",
  },
  zh: {
    backToProjects: "返回项目",
    backToPatents: "返回专利",
    category: "领域",
    overview: "项目概览",
    scope: "我们负责的工作",
    gallery: "项目图片",
    relatedPatents: "相关专利",
    relatedProjects: "相关项目",
    publication: "公开号",
    publicationDate: "公开日期",
    priorityDate: "优先权日",
    inventors: "发明人",
    applicants: "申请人",
    classification: "分类",
    family: "专利族公开文本",
    description: "说明",
    claims: "权利要求",
    sources: "官方来源",
    openSource: "打开来源",
    openProject: "查看项目",
    contact: "启动项目",
  },
};

export function getDetailPageCopy(locale: string) {
  return COPY[locales.includes(locale as Locale) ? (locale as Locale) : "en"];
}
