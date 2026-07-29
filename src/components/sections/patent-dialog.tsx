"use client";

import {
  CarFront,
  ChevronLeft,
  ChevronRight,
  Cog,
  Cpu,
  Download,
  ExternalLink,
  HeartPulse,
  Layers3,
  RotateCw,
  Search,
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
  useRef,
  useState,
} from "react";

import {
  type PatentAsset,
  type PatentDetail,
  type PatentFilterKey,
  type PatentRecord,
  type PatentReferenceRow,
  type PatentSourceLinks,
} from "@/data/patents";
import { cn } from "@/lib/utils";

type PatentLocale = "en" | "fr" | "de" | "es" | "ko" | "zh";

type PanelRect = {
  left: number;
  top: number;
  width: number;
  height: number;
  radius: string;
};

type PatentDialogCopy = {
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
  fullDescription: string;
  claims: string;
  legalStatus: string;
  family: string;
  cited: string;
  citing: string;
  loading: string;
  unavailable: string;
};

const ASSET_BASE = "/assets/patent-page";
const MODAL_TRANSITION_MS = 320;
const MODAL_CLOSE_FALLBACK_MS = 360;

const CARD_ICON: Record<PatentFilterKey, LucideIcon> = {
  mobility: CarFront,
  industrial: Cog,
  medical: HeartPulse,
  energy: Zap,
  materials: Layers3,
  digital: Cpu,
};

const CATEGORY_LABELS: Record<PatentLocale, Record<PatentFilterKey, string>> = {
  en: {
    mobility: "Mobility",
    industrial: "Products",
    medical: "Medical",
    energy: "Energy",
    materials: "Materials",
    digital: "Digital",
  },
  fr: {
    mobility: "Mobilité",
    industrial: "Produits",
    medical: "Médical",
    energy: "Énergie",
    materials: "Matériaux",
    digital: "Digital",
  },
  de: {
    mobility: "Mobilität",
    industrial: "Produkte",
    medical: "Medizin",
    energy: "Energie",
    materials: "Materialien",
    digital: "Digital",
  },
  es: {
    mobility: "Movilidad",
    industrial: "Productos",
    medical: "Médico",
    energy: "Energía",
    materials: "Materiales",
    digital: "Digital",
  },
  ko: {
    mobility: "모빌리티",
    industrial: "제품",
    medical: "의료",
    energy: "에너지",
    materials: "소재",
    digital: "디지털",
  },
  zh: {
    mobility: "出行",
    industrial: "产品",
    medical: "医疗",
    energy: "能源",
    materials: "材料",
    digital: "数字",
  },
};

const PATENT_DIALOG_COPY: Record<PatentLocale, PatentDialogCopy> = {
  en: {
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
    fullDescription: "Full description",
    claims: "Claims",
    legalStatus: "Legal status",
    family: "INPADOC family",
    cited: "Cited documents",
    citing: "Citing documents",
    loading: "Loading verified patent record...",
    unavailable: "No local text available for this section.",
  },
  fr: {
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
    fullDescription: "Description complète",
    claims: "Revendications",
    legalStatus: "Situation juridique",
    family: "Famille INPADOC",
    cited: "Documents cités",
    citing: "Documents citant",
    loading: "Chargement de la fiche brevet vérifiée...",
    unavailable: "Aucun texte local disponible pour cette section.",
  },
  de: {
    close: "Patentdetails schließen",
    eyebrow: "Innovation mit Patentschutz",
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
    fullDescription: "Vollständige Beschreibung",
    claims: "Ansprüche",
    legalStatus: "Rechtsstand",
    family: "INPADOC-Familie",
    cited: "Zitierte Dokumente",
    citing: "Zitierende Dokumente",
    loading: "Verifizierten Patenteintrag laden...",
    unavailable: "Für diesen Abschnitt ist lokal kein Text verfügbar.",
  },
  es: {
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
    fullDescription: "Descripción completa",
    claims: "Reivindicaciones",
    legalStatus: "Situación jurídica",
    family: "Familia INPADOC",
    cited: "Documentos citados",
    citing: "Documentos citantes",
    loading: "Cargando ficha de patente verificada...",
    unavailable: "No hay texto local disponible para esta sección.",
  },
  ko: {
    close: "특허 상세 닫기",
    eyebrow: "특허로 보호된 혁신",
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
    fullDescription: "전체 설명",
    claims: "청구항",
    legalStatus: "법적 상태",
    family: "INPADOC 패밀리",
    cited: "인용 문헌",
    citing: "피인용 문헌",
    loading: "검증된 특허 기록을 불러오는 중...",
    unavailable: "이 섹션에는 로컬 텍스트가 없습니다.",
  },
  zh: {
    close: "关闭专利详情",
    eyebrow: "专利保护的创新成果",
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
    fullDescription: "完整说明",
    claims: "权利要求",
    legalStatus: "法律状态",
    family: "INPADOC 族",
    cited: "被引用文献",
    citing: "引用文献",
    loading: "正在加载已验证专利记录...",
    unavailable: "此部分没有本地文本。",
  },
};

function resolvePatentLocale(locale: string): PatentLocale {
  return locale in PATENT_DIALOG_COPY ? (locale as PatentLocale) : "en";
}

function centeredPatentPanelRect(): PanelRect {
  const isMobile = window.innerWidth <= 640;
  const pad = isMobile ? 12 : 24;
  const width = Math.min(1180, window.innerWidth - pad * 2);
  const height = Math.min(780, window.innerHeight - pad * 2);

  return {
    left: (window.innerWidth - width) / 2,
    top: (window.innerHeight - height) / 2,
    width,
    height,
    radius: isMobile ? "16px" : "22px",
  };
}

export function PatentDialog({
  locale,
  patent,
  onClosed,
  zIndexClassName = "z-[1100]",
}: {
  locale: string;
  patent: PatentRecord;
  onClosed: () => void;
  zIndexClassName?: string;
}) {
  const resolvedLocale = resolvePatentLocale(locale);
  const copy = PATENT_DIALOG_COPY[resolvedLocale];
  const renderedPatent = patent;
  const PatentCategoryIcon = CARD_ICON[renderedPatent.filter];
  const [selectedPatentDetails, setSelectedPatentDetails] =
    useState<PatentDetail | null>(null);
  const [detailError, setDetailError] = useState(false);
  const [dialogState, setDialogState] = useState<
    "closed" | "opening" | "open" | "closing"
  >("opening");
  const [panelRect, setPanelRect] = useState<PanelRect | null>(() =>
    typeof window === "undefined" ? null : centeredPatentPanelRect(),
  );
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
  } | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const openFrameRef = useRef<number | null>(null);
  const secondOpenFrameRef = useRef<number | null>(null);
  const lockedScrollYRef = useRef(0);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const finishClose = useCallback(() => {
    clearCloseTimer();
    setSelectedPatentDetails(null);
    setDetailError(false);
    setPanelRect(null);
    setActiveDrawingIndex(null);
    setModalImageIndex(0);
    setModalImageOffset({ x: 0, y: 0 });
    setModalImageRotation(0);
    setModalImageZoom(1);
    setDialogState("closed");
    previousFocusRef.current?.focus?.({ preventScroll: true });
    previousFocusRef.current = null;
    onClosed();
  }, [clearCloseTimer, onClosed]);

  const closePatent = useCallback(() => {
    if (dialogState === "closing") return;

    clearCloseTimer();
    if (openFrameRef.current !== null) {
      window.cancelAnimationFrame(openFrameRef.current);
      openFrameRef.current = null;
    }
    if (secondOpenFrameRef.current !== null) {
      window.cancelAnimationFrame(secondOpenFrameRef.current);
      secondOpenFrameRef.current = null;
    }
    setActiveDrawingIndex(null);
    setModalImageOffset({ x: 0, y: 0 });
    setModalImageRotation(0);
    setModalImageZoom(1);
    setDialogState("closing");

    closeTimerRef.current = window.setTimeout(
      finishClose,
      MODAL_CLOSE_FALLBACK_MS,
    );
  }, [clearCloseTimer, dialogState, finishClose]);

  useEffect(() => {
    lockedScrollYRef.current = window.scrollY;
    previousFocusRef.current = document.activeElement as HTMLElement | null;

    openFrameRef.current = window.requestAnimationFrame(() => {
      secondOpenFrameRef.current = window.requestAnimationFrame(() => {
        setDialogState((current) => (current === "opening" ? "open" : current));
        secondOpenFrameRef.current = null;
      });
      openFrameRef.current = null;
    });

    return () => {
      if (openFrameRef.current !== null) {
        window.cancelAnimationFrame(openFrameRef.current);
        openFrameRef.current = null;
      }
      if (secondOpenFrameRef.current !== null) {
        window.cancelAnimationFrame(secondOpenFrameRef.current);
        secondOpenFrameRef.current = null;
      }
    };
  }, []);

  const closeDrawing = useCallback(() => {
    setActiveDrawingIndex(null);
  }, []);

  const showDrawing = useCallback((index: number) => {
    setActiveDrawingIndex(index);
  }, []);

  const cycleDrawing = useCallback(
    (direction: -1 | 1) => {
      setActiveDrawingIndex((current) => {
        const count = renderedPatent?.images.length ?? 0;
        if (!count) return null;
        const safeCurrent = current ?? 0;
        return (safeCurrent + direction + count) % count;
      });
    },
    [renderedPatent],
  );

  const cycleModalImage = useCallback(
    (direction: -1 | 1) => {
      setModalImageIndex((current) => {
        const count = renderedPatent?.images.length ?? 0;
        if (!count) return 0;
        return (current + direction + count) % count;
      });
      setModalImageOffset({ x: 0, y: 0 });
      setModalImageRotation(0);
      setModalImageZoom(1);
    },
    [renderedPatent],
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
      if (modalImageZoom <= 1) return;
      if ((event.target as HTMLElement).closest("button, a")) return;
      event.preventDefault();
      modalImagePanRef.current = {
        pointerId: event.pointerId,
        x: event.clientX,
        y: event.clientY,
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
      modalImagePanRef.current = null;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    },
    [],
  );

  useEffect(() => {
    if (!renderedPatent) return;

    let cancelled = false;

    fetch(renderedPatent.detailPath)
      .then((response) => {
        if (!response.ok)
          throw new Error(`Failed to load ${renderedPatent.detailPath}`);
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
  }, [renderedPatent]);

  useEffect(() => {
    if (!renderedPatent) return;

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
        "[data-patent-dialog-scroll]",
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
  }, [renderedPatent]);

  useEffect(() => {
    if (dialogState !== "open") return;

    const focusTimer = window.setTimeout(() => {
      panelRef.current?.focus({ preventScroll: true });
    }, MODAL_TRANSITION_MS);

    return () => window.clearTimeout(focusTimer);
  }, [dialogState]);

  useEffect(() => {
    if (!renderedPatent) return;

    const onKeyDown = (event: KeyboardEvent) => {
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
        event.preventDefault();
        closePatent();
        return;
      }

      if (renderedPatent.images.length > 1 && event.key === "ArrowLeft") {
        event.preventDefault();
        cycleModalImage(-1);
        return;
      }

      if (renderedPatent.images.length > 1 && event.key === "ArrowRight") {
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
    renderedPatent,
  ]);

  useEffect(() => {
    if (!renderedPatent || dialogState !== "open") return;

    const onResize = () => setPanelRect(centeredPatentPanelRect());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [dialogState, renderedPatent]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  if (!renderedPatent) return null;

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
  const selectedPatentCategory =
    CATEGORY_LABELS[resolvedLocale][renderedPatent.filter] ??
    renderedPatent.filter;
  const selectedPatentImages = renderedPatent.images;
  const safeModalImageIndex = selectedPatentImages[modalImageIndex]
    ? modalImageIndex
    : 0;
  const modalImage = selectedPatentImages[safeModalImageIndex] ?? null;
  const modalImageHref = modalImage?.href ?? renderedPatent.coverImage ?? "";
  const hasMultipleModalImages = selectedPatentImages.length > 1;
  const modalImageStyle = {
    transform: `translate3d(${modalImageOffset.x}px, ${modalImageOffset.y}px, 0) rotate(${modalImageRotation}deg) scale(${modalImageZoom})`,
  } satisfies CSSProperties;

  return (
    <div
      ref={modalRootRef}
      className={cn("fixed inset-0", zIndexClassName)}
      aria-hidden={dialogState === "closed"}
    >
      <button
        type="button"
        tabIndex={-1}
        className={cn(
          "absolute inset-0 cursor-default bg-black/55 backdrop-blur-[7px] transition-opacity duration-200 ease-out",
          backdropVisible ? "opacity-100" : "opacity-0",
        )}
        aria-label={copy.close}
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
          aria-label={copy.close}
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
                : "cursor-default",
            )}
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
                  aria-label={copy.previousDrawing}
                  onClick={() => cycleModalImage(-1)}
                >
                  <ChevronLeft className="size-5" aria-hidden />
                </button>
                <button
                  type="button"
                  className="absolute right-4 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-foreground shadow-[0_10px_26px_rgba(0,0,0,0.14)] transition-[transform,background-color,color] duration-500 hover:scale-110 hover:bg-brand hover:text-white focus-visible:ring-2 focus-visible:ring-brand/30 [transition-timing-function:var(--ease-smooth)]"
                  aria-label={copy.nextDrawing}
                  onClick={() => cycleModalImage(1)}
                >
                  <ChevronRight className="size-5" aria-hidden />
                </button>
              </>
            )}
            {selectedPatentImages.length > 0 && (
              <div className="absolute right-16 top-6 z-20 rounded-full bg-white/95 px-3 py-2 text-[11px] font-extrabold text-foreground shadow-[0_8px_20px_rgba(0,0,0,0.12)] md:right-6">
                {safeModalImageIndex + 1} / {selectedPatentImages.length}
              </div>
            )}
            {modalImageHref && (
              <div className="absolute bottom-12 right-5 z-20 flex items-center gap-2 md:right-6">
                <button
                  type="button"
                  className="grid size-9 place-items-center rounded-full bg-white/95 text-foreground shadow-[0_10px_24px_rgba(0,0,0,0.16)] transition-[transform,background-color,color,opacity] duration-500 hover:scale-110 hover:bg-brand hover:text-white focus-visible:ring-2 focus-visible:ring-brand/30 disabled:cursor-not-allowed disabled:opacity-45 [transition-timing-function:var(--ease-smooth)]"
                  aria-label={copy.zoomOutDrawing}
                  title={copy.zoomOutDrawing}
                  disabled={modalImageZoom <= 1}
                  onClick={() => zoomModalImage(-1)}
                >
                  <ZoomOut className="size-4" aria-hidden />
                </button>
                <button
                  type="button"
                  className="grid size-9 place-items-center rounded-full bg-white/95 text-foreground shadow-[0_10px_24px_rgba(0,0,0,0.16)] transition-[transform,background-color,color] duration-500 hover:scale-110 hover:bg-brand hover:text-white focus-visible:ring-2 focus-visible:ring-brand/30 [transition-timing-function:var(--ease-smooth)]"
                  aria-label={copy.zoomInDrawing}
                  title={copy.zoomInDrawing}
                  onClick={() => zoomModalImage(1)}
                >
                  <ZoomIn className="size-4" aria-hidden />
                </button>
                <button
                  type="button"
                  className="grid size-9 place-items-center rounded-full bg-white/95 text-foreground shadow-[0_10px_24px_rgba(0,0,0,0.16)] transition-[transform,background-color,color] duration-500 hover:scale-110 hover:bg-brand hover:text-white focus-visible:ring-2 focus-visible:ring-brand/30 [transition-timing-function:var(--ease-smooth)]"
                  aria-label={copy.rotateDrawing}
                  title={copy.rotateDrawing}
                  onClick={rotateModalImage}
                >
                  <RotateCw className="size-4" aria-hidden />
                </button>
                {modalImage && (
                  <button
                    type="button"
                    className="grid size-9 place-items-center rounded-full bg-white/95 text-foreground shadow-[0_10px_24px_rgba(0,0,0,0.16)] transition-[transform,background-color,color] duration-500 hover:scale-110 hover:bg-brand hover:text-white focus-visible:ring-2 focus-visible:ring-brand/30 [transition-timing-function:var(--ease-smooth)]"
                    aria-label={copy.openImageViewer}
                    title={copy.openImageViewer}
                    onClick={() => showDrawing(safeModalImageIndex)}
                  >
                    <Search className="size-4" aria-hidden />
                  </button>
                )}
              </div>
            )}
            <div className="absolute left-6 top-6 grid size-12 place-items-center rounded-[6px] bg-white shadow-[0_12px_28px_rgba(0,0,0,0.08)]">
              <PatentCategoryIcon
                aria-hidden
                strokeWidth={1.8}
                className="size-8 text-brand"
              />
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[11px] font-extrabold uppercase tracking-wide text-brand">
                {selectedPatentCategory}
              </span>
              <strong className="mt-2 block max-w-[360px] text-[25px] font-extrabold leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
                {renderedPatent.publication}
              </strong>
            </div>
          </div>

          <div
            data-patent-dialog-scroll
            data-lenis-prevent
            className="min-w-0 overflow-y-auto overscroll-contain px-5 py-7 md:px-10 md:py-10 lg:px-12"
          >
            <span className="text-[11px] font-extrabold uppercase tracking-wide text-brand">
              {copy.eyebrow}
            </span>
            <h2
              id="patent-dialog-title"
              className="mt-3 max-w-[680px] break-words text-[27px] font-extrabold leading-[1.04] text-foreground md:text-[34px] lg:text-[36px]"
            >
              {renderedPatent.title}
            </h2>
            <p className="mt-4 max-w-[680px] text-[14px] font-medium leading-[1.55] text-muted-foreground md:text-[15px]">
              {renderedPatent.abstract || copy.unavailable}
            </p>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <section>
                <h3 className="text-[12px] font-extrabold uppercase tracking-wide">
                  {copy.overview}
                </h3>
                <p className="mt-3 text-[14px] font-medium leading-[1.65] text-muted-foreground">
                  {renderedPatent.abstract || copy.unavailable}
                </p>
              </section>
              <section>
                <h3 className="text-[12px] font-extrabold uppercase tracking-wide">
                  {copy.tags}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[selectedPatentCategory, ...renderedPatent.tags].map(
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
                label={copy.publication}
                value={renderedPatent.publication}
              />
              <PatentFact
                label={copy.publicationDate}
                value={renderedPatent.date}
              />
              <PatentFact
                label={copy.priorityDate}
                value={renderedPatent.priorityDate}
              />
              <PatentFact
                label={copy.category}
                value={selectedPatentCategory}
              />
              <PatentFact
                label={copy.inventors}
                value={renderedPatent.inventors}
                wide
              />
              <PatentFact
                label={copy.applicants}
                value={renderedPatent.applicants}
                wide
              />
              <PatentFact
                label={copy.application}
                value={renderedPatent.applicationNumber}
                wide
              />
              <PatentFact
                label={copy.classification}
                value={renderedPatent.classification}
                wide
              />
              <PatentFact
                label={copy.alsoPublishedAs}
                value={renderedPatent.alsoPublishedAs}
                wide
              />
            </div>

            {renderedPatent.images.length > 0 && (
              <PatentDrawingGallery
                title={copy.images}
                images={renderedPatent.images}
                copy={copy}
                onOpen={showDrawing}
              />
            )}

            <section className="mt-8 grid gap-3 sm:grid-cols-2">
              <PatentLinkGroup
                title={copy.sourceLinks}
                links={renderedPatent.links}
              />
              <PatentPdfGroup
                title={copy.downloadPdfs}
                pdfs={renderedPatent.pdfs}
              />
            </section>

            <section className="mt-8 grid gap-4">
              {detailError ? (
                <p className="rounded-[4px] border border-border bg-muted px-4 py-3 text-[13px] font-medium text-muted-foreground">
                  {copy.unavailable}
                </p>
              ) : selectedPatentDetails ? (
                <PatentDetailSections
                  copy={copy}
                  detail={selectedPatentDetails}
                />
              ) : (
                <p className="rounded-[4px] border border-border bg-muted px-4 py-3 text-[13px] font-medium text-muted-foreground">
                  {copy.loading}
                </p>
              )}
            </section>
          </div>
        </div>
      </section>
      {activeDrawingIndex !== null &&
        renderedPatent.images[activeDrawingIndex] && (
          <PatentDrawingLightbox
            images={renderedPatent.images}
            activeIndex={activeDrawingIndex}
            copy={copy}
            onClose={closeDrawing}
            onPrevious={() => cycleDrawing(-1)}
            onNext={() => cycleDrawing(1)}
          />
        )}
    </div>
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
  copy: PatentDialogCopy;
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
  copy: PatentDialogCopy;
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
  copy: PatentDialogCopy;
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
