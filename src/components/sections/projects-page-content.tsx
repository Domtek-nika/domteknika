"use client";

import Image from "next/image";
import {
  ArrowDownUp,
  ArrowRight,
  Box,
  Building2,
  CalendarDays,
  CarFront,
  Check,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Globe2,
  HeartPulse,
  HousePlug,
  Search,
  Shapes,
  ShieldCheck,
  Target,
  Watch as WatchIcon,
  X,
} from "lucide-react";
import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/providers/reveal";
import { DesktopHeroImage } from "@/components/ui/desktop-hero-image";
import { Link } from "@/i18n/navigation";
import { getProjectCardImageFitClass } from "@/lib/project-card-image";
import {
  RELATED_CARD_EMBEDDED_OUTLINE_CLASS,
  RELATED_CARD_MOTION_CLASS,
} from "@/lib/related-card-motion";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/project-types";
import {
  getProjectGallery,
  resolveProjectsLocale,
  type FilterKey,
  type ProjectSortKey,
  type ProjectsLocale,
  type ProjectStat,
  type ProjectModalCopy,
  type ProjectsPageCopy,
} from "@/data/project-page-types";

const PROJECT_ICONS = {
  Box,
  ShieldCheck,
  Target,
  Globe2,
  CalendarDays,
  CarFront,
  HousePlug,
  HeartPulse,
  Watch: WatchIcon,
  Building2,
  Dumbbell,
  Shapes,
};

const PROJECT_LIGHTBOX_FRAME_CLASS =
  "relative h-[min(82vh,620px)] w-[min(92vw,900px)] touch-pan-y md:h-[min(70vh,560px)] md:w-[min(74vw,840px)] lg:w-[min(64vw,820px)]";

const PROJECT_LIGHTBOX_IMAGE_SIZES =
  "(max-width: 768px) 92vw, (max-width: 1024px) 74vw, 820px";

const PROJECT_IMAGE_ZOOM_SELECTOR = "[data-project-image-zoom]";

type PanelRect = {
  left: number;
  top: number;
  width: number;
  height: number;
  radius: string;
};

const PROJECT_SORT_YEARS: Partial<Record<string, number>> = {
  "kitesurf-safety": 2010,
  "invisible-gear-train-bridge": 2011,
  "bottom-filling-cup": 2015,
  "smart-bottle": 2015,
  "single-use-turbine": 2005,
  "totalcar-concept": 2011,
  "transparent-clock": 2013,
  softcar: 2006,
};

const PROJECT_COUNT_LABELS: Record<ProjectsLocale, string> = {
  en: "projects",
  fr: "projets",
  de: "Projekte",
  es: "proyectos",
  ko: "개 프로젝트",
  zh: "个项目",
  ja: "プロジェクト",
};

const MODAL_TRANSITION_MS = 320;

const MODAL_CLOSE_FALLBACK_MS = 360;

const PROJECT_HORIZONTAL_SCROLL_SELECTOR =
  "[data-project-dialog-horizontal-scroll]";

export const PROJECT_DETAIL_HASH_PREFIX = "project-";

function canScrollHorizontally(container: HTMLElement, deltaX: number) {
  const maxScrollLeft = container.scrollWidth - container.clientWidth;
  if (maxScrollLeft <= 0) return false;
  if (deltaX < 0) return container.scrollLeft > 0;
  if (deltaX > 0) return container.scrollLeft < maxScrollLeft - 1;
  return true;
}

function scrollHorizontalTrackFromWheel(
  event: WheelEvent,
  container: HTMLElement,
) {
  const delta =
    Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ? event.deltaX
      : event.deltaY;

  if (!delta || !canScrollHorizontally(container, delta)) return false;

  const maxScrollLeft = container.scrollWidth - container.clientWidth;
  container.scrollLeft = Math.max(
    0,
    Math.min(container.scrollLeft + delta, maxScrollLeft),
  );

  return true;
}

function getProjectSortYear(project: Project) {
  const explicitYear = PROJECT_SORT_YEARS[project.id];
  if (explicitYear) return explicitYear;

  const yearTag = project.tags.find((tag) => /^#(?:19|20)\d{2}$/.test(tag));
  return yearTag ? Number(yearTag.slice(1)) : 0;
}

function compareProjectTitles(a: Project, b: Project, locale: ProjectsLocale) {
  return new Intl.Collator(locale, {
    numeric: true,
    sensitivity: "base",
  }).compare(a.title, b.title);
}

function sortProjects(
  projects: Project[],
  sortKey: ProjectSortKey,
  locale: ProjectsLocale,
) {
  const withIndex = projects.map((project, index) => ({ project, index }));

  return withIndex
    .sort((a, b) => {
      switch (sortKey) {
        case "date-desc": {
          const yearOrder =
            getProjectSortYear(b.project) - getProjectSortYear(a.project);
          if (yearOrder !== 0) return yearOrder;

          return a.index - b.index;
        }
        case "date-asc": {
          const yearOrder =
            getProjectSortYear(a.project) - getProjectSortYear(b.project);
          if (yearOrder !== 0) return yearOrder;

          return a.index - b.index;
        }
        case "title-asc":
          return compareProjectTitles(a.project, b.project, locale);
        case "title-desc":
          return compareProjectTitles(b.project, a.project, locale);
        case "default":
        default:
          return a.index - b.index;
      }
    })
    .map(({ project }) => project);
}

function centeredPanelRect(): PanelRect {
  const isMobile = window.innerWidth <= 640;
  const pad = isMobile ? 14 : 34;
  const maxWidth =
    window.innerWidth >= 2400 ? 2040 : window.innerWidth >= 1800 ? 1680 : 880;
  const maxHeight =
    window.innerWidth >= 2400 ? 1180 : window.innerWidth >= 1800 ? 980 : 720;
  const width = Math.min(maxWidth, window.innerWidth - pad * 2);
  const height = Math.min(maxHeight, window.innerHeight - pad * 2);

  return {
    left: (window.innerWidth - width) / 2,
    top: (window.innerHeight - height) / 2,
    width,
    height,
    radius: isMobile ? "16px" : window.innerWidth >= 1800 ? "26px" : "22px",
  };
}

function ProjectImageLightbox({
  image,
  alt,
  closeLabel,
  previousLabel,
  nextLabel,
  hasMultiple,
  onClose,
  onPrevious,
  onNext,
}: {
  image: string;
  alt: string;
  closeLabel: string;
  previousLabel: string;
  nextLabel: string;
  hasMultiple: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const [viewerState, setViewerState] = useState({
    image,
    offsetX: 0,
    offsetY: 0,
    zoom: 1,
  });
  const activePointersRef = useRef<Map<number, { x: number; y: number }>>(
    new Map(),
  );
  const panRef = useRef<{
    pointerId: number;
    x: number;
    y: number;
  } | null>(null);
  const pinchRef = useRef<{
    distance: number;
    centerX: number;
    centerY: number;
    offsetX: number;
    offsetY: number;
    zoom: number;
  } | null>(null);
  const swipeRef = useRef<{
    pointerId: number;
    x: number;
    y: number;
    used: boolean;
  } | null>(null);

  const currentViewerState =
    viewerState.image === image
      ? viewerState
      : { image, offsetX: 0, offsetY: 0, zoom: 1 };
  const { offsetX, offsetY, zoom } = currentViewerState;
  const imageStyle = {
    transform: `translate3d(${offsetX}px, ${offsetY}px, 0) scale(${zoom})`,
  } satisfies CSSProperties;

  const updateViewerState = useCallback(
    (nextState: Omit<typeof viewerState, "image">) => {
      setViewerState({
        image,
        ...nextState,
      });
    },
    [image],
  );

  const clampZoom = useCallback(
    (value: number) => Math.min(3, Math.max(1, Number(value.toFixed(2)))),
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
      const nextZoom = clampZoom(zoom * Math.exp(-normalizedDelta * 0.01));
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
        zoom: nextZoom,
      });
    },
    [clampZoom, getZoomedOffset, offsetX, offsetY, updateViewerState, zoom],
  );

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      activePointersRef.current.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
      });
      event.currentTarget.setPointerCapture(event.pointerId);

      if (activePointersRef.current.size >= 2) {
        event.preventDefault();
        panRef.current = null;
        swipeRef.current = null;
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

      swipeRef.current = {
        pointerId: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        used: false,
      };

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

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
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

        const nextZoom = clampZoom(
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
          current.image === image
            ? current
            : { image, offsetX: 0, offsetY: 0, zoom: 1 };

        return {
          ...base,
          offsetX: base.offsetX + deltaX,
          offsetY: base.offsetY + deltaY,
        };
      });
    },
    [
      clampZoom,
      getPinchGesture,
      image,
      offsetX,
      offsetY,
      updateViewerState,
      zoom,
    ],
  );

  const handlePointerEnd = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      activePointersRef.current.delete(event.pointerId);
      if (activePointersRef.current.size < 2) {
        pinchRef.current = null;
      }

      const pan = panRef.current;
      if (pan?.pointerId === event.pointerId) {
        panRef.current = null;
      }

      const swipe = swipeRef.current;
      if (
        swipe?.pointerId === event.pointerId &&
        !swipe.used &&
        zoom <= 1 &&
        hasMultiple &&
        event.pointerType === "touch"
      ) {
        const deltaX = swipe.x - event.clientX;
        const deltaY = swipe.y - event.clientY;
        if (Math.abs(deltaX) > 42 && Math.abs(deltaX) > Math.abs(deltaY)) {
          swipeRef.current = { ...swipe, used: true };
          if (deltaX > 0) {
            onNext();
          } else {
            onPrevious();
          }
        }
      }

      if (swipe?.pointerId === event.pointerId) {
        swipeRef.current = null;
      }

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    },
    [hasMultiple, onNext, onPrevious, zoom],
  );

  return (
    <div
      className="fixed inset-0 z-[40] grid place-items-center bg-black/82 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={closeLabel}
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full border border-white/25 bg-white text-foreground shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
        aria-label={closeLabel}
        onClick={onClose}
      >
        <X className="size-5" aria-hidden />
      </button>
      {hasMultiple && (
        <>
          <button
            type="button"
            className="absolute left-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-white text-foreground shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 md:left-6 md:size-12"
            aria-label={previousLabel}
            onClick={(event) => {
              event.stopPropagation();
              onPrevious();
            }}
          >
            <ChevronLeft className="size-6" aria-hidden />
          </button>
          <button
            type="button"
            className="absolute right-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-white text-foreground shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 md:right-6 md:size-12"
            aria-label={nextLabel}
            onClick={(event) => {
              event.stopPropagation();
              onNext();
            }}
          >
            <ChevronRight className="size-6" aria-hidden />
          </button>
        </>
      )}
      <div
        data-project-image-zoom
        data-lenis-prevent
        className={cn(
          PROJECT_LIGHTBOX_FRAME_CLASS,
          "overflow-hidden select-none",
          zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in",
        )}
        style={{ touchAction: "none" }}
        onClick={(event) => event.stopPropagation()}
        onDoubleClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          const nextZoom = zoom > 1 ? 1 : 2;
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
            zoom: nextZoom,
          });
        }}
        onWheel={handleWheelZoom}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        <Image
          src={image}
          alt={alt}
          fill
          draggable={false}
          sizes={PROJECT_LIGHTBOX_IMAGE_SIZES}
          style={imageStyle}
          className="object-contain"
        />
      </div>
    </div>
  );
}

export function ProjectDetailsDialog({
  modal,
  onClosed,
  project,
}: {
  modal: ProjectModalCopy;
  onClosed: () => void;
  project: Project;
}) {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [expandedImageIndex, setExpandedImageIndex] = useState<number | null>(
    null,
  );
  const [dialogState, setDialogState] = useState<
    "opening" | "open" | "closing"
  >("opening");
  const [panelRect, setPanelRect] = useState<PanelRect>(() =>
    centeredPanelRect(),
  );
  const panelRef = useRef<HTMLElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const lockedScrollYRef = useRef(0);

  const projectGallery = useMemo(() => getProjectGallery(project), [project]);
  const activeGalleryImage =
    projectGallery[
      Math.min(activeGalleryIndex, Math.max(projectGallery.length - 1, 0))
    ] ?? project.image;
  const expandedImage =
    expandedImageIndex === null
      ? null
      : (projectGallery[expandedImageIndex] ?? activeGalleryImage);

  const showExpandedImageAt = useCallback(
    (index: number) => {
      if (!projectGallery.length) return;

      const nextIndex =
        ((index % projectGallery.length) + projectGallery.length) %
        projectGallery.length;
      setActiveGalleryIndex(nextIndex);
      setExpandedImageIndex(nextIndex);
    },
    [projectGallery.length],
  );

  const showPreviousExpandedImage = useCallback(() => {
    if (expandedImageIndex === null) return;
    showExpandedImageAt(expandedImageIndex - 1);
  }, [expandedImageIndex, showExpandedImageAt]);

  const showNextExpandedImage = useCallback(() => {
    if (expandedImageIndex === null) return;
    showExpandedImageAt(expandedImageIndex + 1);
  }, [expandedImageIndex, showExpandedImageAt]);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const finishClose = useCallback(() => {
    clearCloseTimer();
    setExpandedImageIndex(null);
    previousFocusRef.current?.focus?.({ preventScroll: true });
    previousFocusRef.current = null;
    onClosed();
  }, [clearCloseTimer, onClosed]);

  const closeProject = useCallback(() => {
    if (dialogState === "closing") return;

    clearCloseTimer();
    setDialogState("closing");
    closeTimerRef.current = window.setTimeout(
      finishClose,
      MODAL_CLOSE_FALLBACK_MS,
    );
  }, [clearCloseTimer, dialogState, finishClose]);

  useEffect(() => {
    lockedScrollYRef.current = window.scrollY;
    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setDialogState("open");
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
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
    let touchStartX = 0;
    let touchStartY = 0;

    const canScrollWithin = (container: HTMLElement, deltaY: number) => {
      const maxScrollTop = container.scrollHeight - container.clientHeight;
      if (maxScrollTop <= 0) return false;
      if (deltaY < 0) return container.scrollTop > 0;
      if (deltaY > 0) return container.scrollTop < maxScrollTop - 1;
      return true;
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartX = event.touches[0]?.clientX ?? 0;
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const preventBackgroundScroll = (event: Event) => {
      const horizontalScrollContainer =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(
              PROJECT_HORIZONTAL_SCROLL_SELECTOR,
            )
          : null;
      const zoomContainer =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(PROJECT_IMAGE_ZOOM_SELECTOR)
          : null;
      const scrollContainer =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(
              "[data-project-dialog-scroll], [data-patent-dialog-scroll]",
            )
          : null;
      const deltaY =
        event instanceof WheelEvent
          ? event.deltaY
          : event instanceof TouchEvent
            ? touchStartY - (event.touches[0]?.clientY ?? touchStartY)
            : 0;

      if (zoomContainer) return;

      if (horizontalScrollContainer) {
        if (
          event instanceof WheelEvent &&
          scrollHorizontalTrackFromWheel(event, horizontalScrollContainer)
        ) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }

        if (event instanceof TouchEvent) {
          const currentX = event.touches[0]?.clientX ?? touchStartX;
          const currentY = event.touches[0]?.clientY ?? touchStartY;
          const deltaX = touchStartX - currentX;
          const touchDeltaY = touchStartY - currentY;

          if (
            Math.abs(deltaX) > Math.abs(touchDeltaY) &&
            canScrollHorizontally(horizontalScrollContainer, deltaX)
          ) {
            event.stopPropagation();
            return;
          }
        }
      }

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
      const restoreScrollY = window.scrollY || lockedScrollYRef.current;
      window.scrollTo(window.scrollX, restoreScrollY);
      window.dispatchEvent(
        new CustomEvent("domtek:scroll-lock", {
          detail: { locked: false, scrollY: restoreScrollY },
        }),
      );
    };
  }, []);

  useEffect(() => {
    if (dialogState !== "open") return;

    const focusTimer = window.setTimeout(() => {
      panelRef.current?.focus({ preventScroll: true });
    }, MODAL_TRANSITION_MS);

    return () => window.clearTimeout(focusTimer);
  }, [dialogState]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (expandedImageIndex !== null) {
        if (event.key === "Escape") {
          setExpandedImageIndex(null);
          return;
        }

        if (projectGallery.length > 1 && event.key === "ArrowLeft") {
          event.preventDefault();
          showPreviousExpandedImage();
          return;
        }

        if (projectGallery.length > 1 && event.key === "ArrowRight") {
          event.preventDefault();
          showNextExpandedImage();
        }

        return;
      }

      if (event.key === "Escape") {
        closeProject();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
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
    closeProject,
    expandedImageIndex,
    projectGallery.length,
    showNextExpandedImage,
    showPreviousExpandedImage,
  ]);

  useEffect(() => {
    if (dialogState !== "open") return;

    const onResize = () => setPanelRect(centeredPanelRect());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [dialogState]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  const panelStyle = {
    left: panelRect.left,
    top: panelRect.top,
    width: Math.max(panelRect.width, 1),
    height: Math.max(panelRect.height, 1),
    borderRadius: panelRect.radius,
    transformOrigin: "50% 50%",
  } satisfies CSSProperties;

  const contentVisible = dialogState !== "closing";
  const backdropVisible = dialogState === "open";
  const panelVisible = dialogState === "open";

  return (
    <>
      <div className="fixed inset-0 z-[1000]">
        <button
          type="button"
          tabIndex={-1}
          className={cn(
            "absolute inset-0 cursor-default bg-black/55 backdrop-blur-[7px] transition-opacity duration-200 ease-out",
            backdropVisible ? "opacity-100" : "opacity-0",
          )}
          aria-label={modal.close}
          onClick={closeProject}
        />

        <section
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-dialog-title"
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
              "absolute right-4 top-4 z-20 grid size-10 place-items-center rounded-full border border-border bg-white/95 text-foreground transition duration-200 hover:rotate-6 hover:scale-105 focus-visible:ring-2 focus-visible:ring-brand/30 min-[1800px]:right-8 min-[1800px]:top-8 min-[1800px]:size-14 min-[2400px]:size-16",
              contentVisible ? "opacity-100" : "opacity-0",
            )}
            aria-label={modal.close}
            onClick={closeProject}
          >
            <X
              className="size-4 min-[1800px]:size-6 min-[2400px]:size-7"
              aria-hidden
            />
          </button>

          <div
            className={cn(
              "grid h-full md:grid-cols-[46%_54%] min-[1800px]:grid-cols-[48%_52%]",
              !contentVisible && "pointer-events-none",
            )}
          >
            <div className="flex min-h-[280px] flex-col overflow-hidden bg-muted md:min-h-0">
              <button
                type="button"
                className="relative min-h-[210px] flex-1 cursor-zoom-in overflow-hidden text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/35 min-[1800px]:min-h-[620px] min-[2400px]:min-h-[740px]"
                aria-label={modal.openImage}
                onClick={() =>
                  setExpandedImageIndex(
                    Math.min(
                      activeGalleryIndex,
                      Math.max(projectGallery.length - 1, 0),
                    ),
                  )
                }
              >
                <Image
                  src={activeGalleryImage}
                  alt={project.imageAlt}
                  fill
                  sizes="(min-width: 2400px) 980px, (min-width: 1800px) 820px, (max-width: 768px) 100vw, 460px"
                  className="object-contain p-6 md:p-7 min-[1800px]:p-12 min-[2400px]:p-14"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
              </button>

              {projectGallery.length > 1 && (
                <div
                  className="border-t border-border bg-white/[0.92] p-3 min-[1800px]:p-6 min-[2400px]:p-7"
                  aria-label={modal.gallery}
                >
                  <div
                    data-project-dialog-horizontal-scroll
                    data-lenis-prevent
                    className="flex touch-pan-x gap-2 overflow-x-auto overscroll-x-contain pb-1 min-[1800px]:gap-4"
                  >
                    {projectGallery.map((image, index) => (
                      <button
                        key={image}
                        type="button"
                        className={cn(
                          "relative h-[54px] w-[76px] shrink-0 overflow-hidden rounded-[4px] border bg-muted transition-[border-color,opacity,transform] duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-brand/30 min-[1800px]:h-[92px] min-[1800px]:w-[132px] min-[2400px]:h-[108px] min-[2400px]:w-[156px]",
                          activeGalleryIndex === index
                            ? "border-brand opacity-100"
                            : "border-border opacity-70 hover:opacity-100",
                        )}
                        aria-label={`${modal.gallery} ${index + 1}`}
                        aria-current={activeGalleryIndex === index}
                        onClick={() => setActiveGalleryIndex(index)}
                      >
                        <Image
                          src={image}
                          alt=""
                          fill
                          sizes="(min-width: 2400px) 156px, (min-width: 1800px) 132px, 76px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div
              data-project-dialog-scroll
              data-lenis-prevent
              className="min-h-0 overflow-y-auto overscroll-contain px-5 py-7 md:px-9 md:py-10 min-[1800px]:px-16 min-[1800px]:py-16 min-[2400px]:px-20 min-[2400px]:py-[72px]"
            >
              <span className="uppercase text-brand text-[11px] font-extrabold tracking-wide min-[1800px]:text-[17px] min-[2400px]:text-[19px]">
                {project.category}
              </span>
              <h2
                id="project-dialog-title"
                className="mt-4 max-w-[500px] text-foreground min-[1800px]:max-w-[840px] min-[2400px]:max-w-[980px] text-[34px] font-extrabold leading-[0.98] tracking-[-0.02em] md:text-[48px] min-[1800px]:text-[78px] min-[2400px]:text-[92px]"
              >
                {project.title}
              </h2>
              <p className="mt-6 max-w-[500px] text-muted-foreground min-[1800px]:max-w-[860px] min-[2400px]:max-w-[980px] text-[16px] font-medium leading-[1.45] md:text-[17px] min-[1800px]:text-[26px] min-[2400px]:text-[30px]">
                {project.description}
              </p>

              <Link
                href={`/projects/${project.id}`}
                className="group/fullProject mt-7 inline-flex min-h-11 items-center justify-center gap-3 rounded-[7px] bg-brand px-5 py-2.5 text-[13px] font-extrabold text-white shadow-[0_8px_22px_rgba(0,0,0,0.16)] transition-[transform,background-color] duration-300 motion-safe:hover:-translate-y-0.5 hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 motion-reduce:transition-none min-[1800px]:mt-10 min-[1800px]:min-h-16 min-[1800px]:px-8 min-[1800px]:text-[20px] min-[2400px]:text-[22px]"
              >
                <span>{modal.openFullPage}</span>
                <ArrowRight
                  className="size-4 transition-transform duration-300 motion-safe:group-hover/fullProject:translate-x-1 motion-reduce:transition-none min-[1800px]:size-6"
                  aria-hidden
                />
              </Link>

              <div className="mt-8 grid gap-6 md:grid-cols-2 min-[1800px]:mt-14 min-[1800px]:gap-12 min-[2400px]:mt-16">
                <section>
                  <h3 className="uppercase text-[12px] font-extrabold tracking-wide min-[1800px]:text-[18px] min-[2400px]:text-[20px]">
                    {modal.overview}
                  </h3>
                  <p className="mt-4 text-muted-foreground text-[14px] font-medium leading-[1.65] min-[1800px]:text-[21px] min-[2400px]:text-[24px]">
                    {project.overview}
                  </p>
                </section>
                <section>
                  <h3 className="uppercase text-[12px] font-extrabold tracking-wide min-[1800px]:text-[18px] min-[2400px]:text-[20px]">
                    {modal.tags}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-muted px-3 py-1.5 text-muted-foreground min-[1800px]:px-5 min-[1800px]:py-2.5 text-[11px] font-medium min-[1800px]:text-[17px] min-[2400px]:text-[19px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </section>
              </div>

              {project.relatedPatents?.length ? (
                <section className="mt-8 border border-border bg-white min-[1800px]:mt-14">
                  <div className="border-b border-border px-4 py-3 min-[1800px]:px-7 min-[1800px]:py-6">
                    <h3 className="uppercase text-[12px] font-extrabold tracking-wide min-[1800px]:text-[18px] min-[2400px]:text-[20px]">
                      {modal.relatedPatents}
                    </h3>
                  </div>
                  <div className="grid divide-y divide-border">
                    {project.relatedPatents.map((patent) => (
                      <Link
                        key={patent.publication}
                        href={`/patents/${patent.patentId.toLowerCase()}`}
                        className={`group/patentLink grid gap-1 bg-white px-4 py-3 text-left min-[1800px]:gap-3 min-[1800px]:px-7 min-[1800px]:py-6 ${RELATED_CARD_MOTION_CLASS} ${RELATED_CARD_EMBEDDED_OUTLINE_CLASS}`}
                      >
                        <span className="text-brand text-[11px] font-extrabold min-[1800px]:text-[17px] min-[2400px]:text-[19px]">
                          {patent.publication}
                        </span>
                        <span className="text-foreground text-[14px] font-extrabold leading-tight min-[1800px]:text-[22px] min-[2400px]:text-[25px]">
                          {patent.title}
                        </span>
                        <span className="text-muted-foreground text-[12px] font-medium leading-[1.45] min-[1800px]:text-[18px] min-[2400px]:text-[20px]">
                          {patent.note}
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
          </div>
        </section>

        {expandedImage && (
          <ProjectImageLightbox
            image={expandedImage}
            alt={project.imageAlt}
            closeLabel={modal.closeImage}
            previousLabel={modal.previousImage}
            nextLabel={modal.nextImage}
            hasMultiple={projectGallery.length > 1}
            onClose={() => setExpandedImageIndex(null)}
            onPrevious={showPreviousExpandedImage}
            onNext={showNextExpandedImage}
          />
        )}
      </div>
    </>
  );
}

export function ProjectsPageContent({ locale, copy }: { locale: string; copy: ProjectsPageCopy }) {
  const resolvedLocale = resolveProjectsLocale(locale);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [sortKey, setSortKey] = useState<ProjectSortKey>("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [dialogState, setDialogState] = useState<
    "closed" | "opening" | "open" | "closing"
  >("closed");
  const [panelRect, setPanelRect] = useState<PanelRect | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const dialogStateRef = useRef(dialogState);
  const lockedScrollYRef = useRef(0);

  useEffect(() => {
    const closeSortOnOutsidePointer = (event: PointerEvent) => {
      const sortDetails = Array.from(
        document.querySelectorAll<HTMLDetailsElement>(
          "[data-project-sort-details]",
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

  const visibleProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const filteredProjects =
      activeFilter === "all"
        ? copy.projects
        : copy.projects.filter((project) => project.filter === activeFilter);

    const matchedProjects = query
      ? filteredProjects.filter((project) =>
          [
            project.category,
            project.title,
            project.description,
            project.overview,
            ...(project.scope ?? []),
            ...project.tags,
          ]
            .join(" ")
            .toLowerCase()
            .includes(query),
        )
      : filteredProjects;

    return sortProjects(matchedProjects, sortKey, resolvedLocale);
  }, [activeFilter, copy.projects, resolvedLocale, searchQuery, sortKey]);
  const handleFilterChange = useCallback((filter: FilterKey) => {
    setActiveFilter(filter);
    setSortKey("default");
  }, []);
  const activeSortLabel =
    copy.sort.options.find((option) => option.key === sortKey)?.label ??
    copy.sort.options[0]?.label ??
    copy.sort.label;

  const renderProjectControls = ({
    wrapperClassName,
    sortClassName,
    searchClassName,
  }: {
    wrapperClassName: string;
    sortClassName: string;
    searchClassName: string;
  }) => (
    <div className={wrapperClassName}>
      <details data-project-sort-details className={sortClassName}>
        <summary
          className="flex h-12 w-full cursor-pointer list-none items-center justify-between gap-2 rounded-[4px] border border-border bg-white px-4 text-[13px] font-extrabold text-foreground shadow-[0_2px_7px_rgba(0,0,0,0.05)] outline-none transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-brand/35 focus-visible:ring-2 focus-visible:ring-brand/35 min-[520px]:px-2 md:px-3 xl:px-4 min-[1800px]:!h-[58px] min-[2400px]:!h-[64px] min-[2400px]:!gap-4 min-[2400px]:!rounded-[7px] min-[2400px]:!px-6 min-[1800px]:!text-[15px] min-[2400px]:!text-[17px] [&::-webkit-details-marker]:hidden"
          aria-label={copy.sort.label}
        >
          <span className="inline-flex min-w-0 items-center gap-2">
            <ArrowDownUp
              className="size-4 shrink-0 text-brand min-[2400px]:!size-6"
              aria-hidden
            />
            <span className="shrink-0">{copy.sort.label}</span>
          </span>
          <span className="max-w-[110px] truncate text-[12px] font-medium text-muted-foreground min-[520px]:max-w-[48px] md:max-w-[74px] xl:max-w-[110px] min-[1800px]:!text-[14px] min-[2400px]:!max-w-[190px] min-[2400px]:!text-[15px]">
            {activeSortLabel}
          </span>
        </summary>
        <div className="absolute left-0 top-[calc(100%+8px)] grid min-w-[220px] rounded-[7px] border border-border bg-white p-1 shadow-[0_16px_34px_rgba(0,0,0,0.14)] min-[2400px]:top-[calc(100%+14px)] min-[2400px]:min-w-[360px] min-[2400px]:rounded-[12px] min-[2400px]:p-2">
          {copy.sort.options.map((option) => {
            const active = option.key === sortKey;

            return (
              <button
                key={option.key}
                type="button"
                className={cn(
                  "flex items-center justify-between gap-4 rounded-[5px] px-3 py-2 text-left text-foreground transition-colors hover:bg-brand/10 focus-visible:bg-brand/10 focus-visible:outline-none min-[2400px]:rounded-[8px] min-[2400px]:px-5 min-[2400px]:py-4 text-[13px] font-bold min-[1800px]:!text-[15px] min-[2400px]:!text-[17px]",
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
                  <Check
                    className="size-4 shrink-0 min-[2400px]:size-6"
                    aria-hidden
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      </details>

      <label className={searchClassName}>
        <span className="sr-only">{copy.searchLabel}</span>
        <Search
          className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground min-[2400px]:!left-6 min-[2400px]:!size-6"
          aria-hidden
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder={copy.searchPlaceholder}
          className="h-12 w-full rounded-[4px] border border-border bg-white pl-11 pr-4 text-foreground outline-none shadow-[0_2px_7px_rgba(0,0,0,0.05)] transition-[border-color,box-shadow] duration-300 placeholder:text-muted-foreground/75 focus:border-brand/50 focus:shadow-[0_10px_24px_rgba(0,0,0,0.08)] min-[1800px]:!h-[58px] min-[2400px]:!h-[64px] min-[2400px]:!rounded-[7px] min-[2400px]:!pl-[58px] min-[2400px]:!pr-6 text-[13px] font-medium min-[1800px]:!text-[15px] min-[2400px]:!text-[17px]"
        />
      </label>
    </div>
  );
  const [expandedGalleryIndex, setExpandedGalleryIndex] = useState<
    number | null
  >(null);

  const selectedProjectGallery = useMemo(
    () => (selectedProject ? getProjectGallery(selectedProject) : []),
    [selectedProject],
  );
  const activeGalleryImage =
    selectedProjectGallery[
      Math.min(
        activeGalleryIndex,
        Math.max(selectedProjectGallery.length - 1, 0),
      )
    ] ?? selectedProject?.image;
  const expandedGalleryImage =
    expandedGalleryIndex === null
      ? null
      : (selectedProjectGallery[expandedGalleryIndex] ??
        activeGalleryImage ??
        selectedProject?.image ??
        null);

  const showExpandedGalleryImageAt = useCallback(
    (index: number) => {
      if (!selectedProjectGallery.length) return;

      const nextIndex =
        ((index % selectedProjectGallery.length) +
          selectedProjectGallery.length) %
        selectedProjectGallery.length;
      setActiveGalleryIndex(nextIndex);
      setExpandedGalleryIndex(nextIndex);
    },
    [selectedProjectGallery.length],
  );

  const showPreviousExpandedGalleryImage = useCallback(() => {
    if (expandedGalleryIndex === null) return;
    showExpandedGalleryImageAt(expandedGalleryIndex - 1);
  }, [expandedGalleryIndex, showExpandedGalleryImageAt]);

  const showNextExpandedGalleryImage = useCallback(() => {
    if (expandedGalleryIndex === null) return;
    showExpandedGalleryImageAt(expandedGalleryIndex + 1);
  }, [expandedGalleryIndex, showExpandedGalleryImageAt]);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const finishClose = useCallback(() => {
    clearCloseTimer();
    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has("project")) {
      searchParams.delete("project");
      const nextSearch = searchParams.toString();
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ""}${window.location.hash}`,
      );
    }

    setExpandedGalleryIndex(null);
    setSelectedProject(null);
    setPanelRect(null);
    setDialogState("closed");
    previousFocusRef.current?.focus?.({ preventScroll: true });
    previousFocusRef.current = null;
  }, [clearCloseTimer]);

  const openProject = useCallback(
    (project: Project) => {
      clearCloseTimer();
      lockedScrollYRef.current = window.scrollY;
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      setActiveGalleryIndex(0);
      setExpandedGalleryIndex(null);
      setSelectedProject(project);
      setPanelRect(centeredPanelRect());
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
    const openProjectFromUrl = () => {
      const projectId = new URLSearchParams(window.location.search).get(
        "project",
      );
      if (!projectId || selectedProject?.id === projectId) return;

      const project = copy.projects.find((item) => item.id === projectId);
      if (!project) return;

      setActiveFilter(project.filter ?? "all");
      openProject(project);
    };

    openProjectFromUrl();
    window.addEventListener("popstate", openProjectFromUrl);
    return () => window.removeEventListener("popstate", openProjectFromUrl);
  }, [copy.projects, openProject, selectedProject?.id]);

  const closeProject = useCallback(() => {
    if (!selectedProject || dialogState === "closing") return;

    if (window.location.hash.startsWith(`#${PROJECT_DETAIL_HASH_PREFIX}`)) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }

    clearCloseTimer();
    setDialogState("closing");

    closeTimerRef.current = window.setTimeout(
      finishClose,
      MODAL_CLOSE_FALLBACK_MS,
    );
  }, [clearCloseTimer, dialogState, finishClose, selectedProject]);

  const openProjectFromHash = useCallback(() => {
    const hash = window.location.hash.slice(1);
    if (!hash.startsWith(PROJECT_DETAIL_HASH_PREFIX)) return;

    let projectId: string;
    try {
      projectId = decodeURIComponent(hash.slice(PROJECT_DETAIL_HASH_PREFIX.length));
    } catch {
      return;
    }
    if (!projectId || selectedProject?.id === projectId) return;

    const project =
      copy.featuredProject.id === projectId
        ? copy.featuredProject
        : copy.projects.find((item) => item.id === projectId);
    if (!project) return;

    openProject(project);
  }, [copy.featuredProject, copy.projects, openProject, selectedProject?.id]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(openProjectFromHash);
    window.addEventListener("hashchange", openProjectFromHash);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", openProjectFromHash);
    };
  }, [openProjectFromHash]);

  useEffect(() => {
    dialogStateRef.current = dialogState;
  }, [dialogState]);

  useEffect(() => {
    if (!selectedProject) return;

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
    let touchStartX = 0;
    let touchStartY = 0;

    const canScrollWithin = (container: HTMLElement, deltaY: number) => {
      const maxScrollTop = container.scrollHeight - container.clientHeight;
      if (maxScrollTop <= 0) return false;
      if (deltaY < 0) return container.scrollTop > 0;
      if (deltaY > 0) return container.scrollTop < maxScrollTop - 1;
      return true;
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartX = event.touches[0]?.clientX ?? 0;
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const preventBackgroundScroll = (event: Event) => {
      const horizontalScrollContainer =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(
              PROJECT_HORIZONTAL_SCROLL_SELECTOR,
            )
          : null;
      const zoomContainer =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(PROJECT_IMAGE_ZOOM_SELECTOR)
          : null;
      const scrollContainer =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(
              "[data-project-dialog-scroll], [data-patent-dialog-scroll]",
            )
          : null;
      const deltaY =
        event instanceof WheelEvent
          ? event.deltaY
          : event instanceof TouchEvent
            ? touchStartY - (event.touches[0]?.clientY ?? touchStartY)
            : 0;

      if (zoomContainer) return;

      if (horizontalScrollContainer) {
        if (
          event instanceof WheelEvent &&
          scrollHorizontalTrackFromWheel(event, horizontalScrollContainer)
        ) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }

        if (event instanceof TouchEvent) {
          const currentX = event.touches[0]?.clientX ?? touchStartX;
          const currentY = event.touches[0]?.clientY ?? touchStartY;
          const deltaX = touchStartX - currentX;
          const touchDeltaY = touchStartY - currentY;

          if (
            Math.abs(deltaX) > Math.abs(touchDeltaY) &&
            canScrollHorizontally(horizontalScrollContainer, deltaX)
          ) {
            event.stopPropagation();
            return;
          }
        }
      }

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
      const restoreScrollY = window.scrollY || lockedScrollYRef.current;
      window.scrollTo(window.scrollX, restoreScrollY);
      window.dispatchEvent(
        new CustomEvent("domtek:scroll-lock", {
          detail: { locked: false, scrollY: restoreScrollY },
        }),
      );
    };
  }, [selectedProject]);

  useEffect(() => {
    if (dialogState !== "open") return;

    const focusTimer = window.setTimeout(() => {
      panelRef.current?.focus({ preventScroll: true });
    }, MODAL_TRANSITION_MS);

    return () => window.clearTimeout(focusTimer);
  }, [dialogState]);

  useEffect(() => {
    if (!selectedProject) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (expandedGalleryIndex !== null) {
        if (event.key === "Escape") {
          setExpandedGalleryIndex(null);
          return;
        }

        if (selectedProjectGallery.length > 1 && event.key === "ArrowLeft") {
          event.preventDefault();
          showPreviousExpandedGalleryImage();
          return;
        }

        if (selectedProjectGallery.length > 1 && event.key === "ArrowRight") {
          event.preventDefault();
          showNextExpandedGalleryImage();
        }

        return;
      }

      if (event.key === "Escape") {
        closeProject();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
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
    closeProject,
    expandedGalleryIndex,
    selectedProject,
    selectedProjectGallery.length,
    showNextExpandedGalleryImage,
    showPreviousExpandedGalleryImage,
  ]);

  useEffect(() => {
    if (!selectedProject || dialogState !== "open") return;

    const onResize = () => setPanelRect(centeredPanelRect());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [dialogState, selectedProject]);

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

  return (
    <>
      <section
        className="relative overflow-hidden border-b border-border bg-background pt-[132px] md:max-[1180px]:min-h-[640px] md:pt-[152px] min-[1180px]:min-h-[590px] min-[2400px]:!min-h-[1060px] min-[2400px]:!pt-[152px]"
        aria-labelledby="projects-page-title"
      >
        <Image
          src="/assets/project-page/image-fond-top.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="pointer-events-none absolute inset-0 z-0 object-contain object-right-top opacity-[0.82] min-[2400px]:scale-[1.18] min-[2400px]:opacity-90"
        />
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-white/55 via-white/15 to-transparent" />
        <div
          className="pointer-events-none absolute bottom-[-22px] right-[-44vw] z-[1] hidden h-[430px] w-[96vw] max-w-none opacity-95 md:block lg:bottom-[-36px] lg:right-[-31vw] lg:h-[520px] lg:w-[86vw] xl:right-[-24vw] 2xl:right-[-15vw] min-[1800px]:!right-[calc((100vw-1680px)/2-170px)] min-[1800px]:!w-[min(72vw,1640px)] min-[2400px]:!bottom-[-64px] min-[2400px]:!right-[calc((100vw-1900px)/2-330px)] min-[2400px]:!h-[860px] min-[2400px]:!w-[1900px]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgb(0 0 0 / 0.18) 7%, black 18%, black 82%, rgb(0 0 0 / 0.24) 93%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, rgb(0 0 0 / 0.18) 7%, black 18%, black 82%, rgb(0 0 0 / 0.24) 93%, transparent 100%)",
          }}
          aria-hidden
        >
          <div
            className="absolute inset-0"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, rgb(0 0 0 / 0.72) 7%, black 18%, black 78%, rgb(0 0 0 / 0.35) 91%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, rgb(0 0 0 / 0.72) 7%, black 18%, black 78%, rgb(0 0 0 / 0.35) 91%, transparent 100%)",
            }}
          >
            <div
              className="absolute bottom-[14%] left-[18%] right-[5%] z-[1] h-[18%] rotate-[-1deg] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.46)_0%,rgba(0,0,0,0.3)_34%,rgba(0,0,0,0.13)_62%,transparent_80%)] opacity-85 blur-[20px] mix-blend-multiply lg:bottom-[12%] lg:left-[15%] lg:right-[4%] lg:h-[20%] lg:blur-[26px]"
              aria-hidden
            />
            <div
              className="absolute left-[18%] right-[5%] top-[17%] z-[1] h-[17%] rotate-[1deg] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.26)_34%,rgba(0,0,0,0.12)_62%,transparent_80%)] opacity-78 blur-[22px] mix-blend-multiply lg:left-[14%] lg:right-[4%] lg:top-[15%] lg:h-[18%] lg:blur-[28px]"
              aria-hidden
            />
            <DesktopHeroImage
              src="/assets/projects/aventor/aventor-hero.webp"
              sizes="(max-width: 1024px) 96vw, 1180px"
              className="z-[2] object-contain object-center"
            />
            <div
              className="absolute inset-y-0 left-0 z-[3] w-[36%] bg-gradient-to-r from-background via-background/90 to-transparent xl:w-[38%]"
              aria-hidden
            />
            <div
              className="absolute inset-x-0 bottom-0 z-[3] h-[24%] bg-gradient-to-t from-background via-background/86 to-transparent"
              aria-hidden
            />
            <div
              className="absolute inset-y-0 right-0 z-[3] w-[18%] bg-gradient-to-l from-background/90 via-background/52 to-transparent"
              aria-hidden
            />
          </div>
        </div>

        <Container
          size="wide"
          className="relative z-10 flex items-start pb-14 md:min-h-[410px] md:pb-10 min-[2400px]:!min-h-[780px] min-[2400px]:!pb-20"
        >
          <Reveal className="max-w-[560px] pb-5 md:pb-0 min-[1800px]:!max-w-[720px] min-[2400px]:!max-w-[900px]">
            <div className="flex items-center gap-3 text-muted-foreground min-[2400px]:!gap-5 text-[15px] font-medium leading-none md:text-[16px] min-[2400px]:!text-[26px]">
              <span
                className="h-[3px] w-[34px] shrink-0 bg-brand min-[2400px]:!h-1 min-[2400px]:!w-[74px]"
                aria-hidden
              />
              {copy.hero.eyebrow}
            </div>
            <h1
              id="projects-page-title"
              className="domtek-text-shadow mt-[38px] max-w-full text-foreground md:mt-[52px] min-[2400px]:!mt-[82px] text-[42px] font-extrabold leading-none sm:text-[60px] md:text-[66px] min-[1800px]:!text-[74px] min-[2400px]:!text-[96px]"
            >
              {copy.hero.title}
              <span className="text-brand">.</span>
            </h1>
            <p className="mt-8 max-w-[430px] text-muted-foreground min-[1800px]:!max-w-[620px] min-[2400px]:!max-w-[760px] text-[15px] font-medium leading-[1.35] sm:text-[16px] min-[1800px]:!text-[18px] min-[2400px]:!text-[21px]">
              <strong className="font-extrabold">{copy.hero.strong}</strong>{" "}
              {copy.hero.rest}
            </p>
            <p className="mt-5 max-w-[430px] text-muted-foreground min-[1800px]:!max-w-[620px] min-[2400px]:!max-w-[760px] text-[15px] font-medium leading-[1.35] sm:text-[16px] min-[1800px]:!text-[18px] min-[2400px]:!text-[21px]">
              {copy.hero.lead}
            </p>
          </Reveal>
        </Container>
        <ProjectsStatsSection stats={copy.stats} ariaLabel={copy.statsLabel} />
      </section>

      <section
        id="projects"
        className="bg-background py-[48px] md:py-[56px] min-[2400px]:!py-[96px]"
        aria-labelledby="selected-projects"
      >
        <Container size="wide">
          <Reveal className="flex min-w-0 flex-col gap-4 md:flex-row md:items-end md:justify-between min-[2400px]:gap-8">
            <div className="min-w-0 shrink-0">
              <h2
                id="selected-projects"
                className="text-foreground text-[22px] font-extrabold leading-none min-[1800px]:!text-[28px] min-[2400px]:!text-[32px]"
              >
                {copy.selectedTitle}
              </h2>
              <p className="mt-3 text-muted-foreground min-[2400px]:!mt-5 text-[12px] font-medium min-[1800px]:!text-[14px] min-[2400px]:!text-[16px]">
                {visibleProjects.length} / {copy.projects.length}{" "}
                {copy.resultsLabel}
              </p>
            </div>
            {renderProjectControls({
              wrapperClassName:
                "grid w-full min-w-0 gap-3 min-[520px]:grid-cols-[minmax(138px,180px)_minmax(0,1fr)] md:w-auto md:flex",
              sortClassName: "relative z-30 min-w-0 md:w-[180px]",
              searchClassName: "relative block min-w-0 md:w-[320px]",
            })}
          </Reveal>

          <Reveal
            delay={0.06}
            className="mb-7 mt-7 min-[2400px]:mb-12 min-[2400px]:mt-12"
            as="div"
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 min-[1700px]:grid-cols-8 min-[2400px]:!gap-5">
              <div
                className="contents"
                role="group"
                aria-label={copy.filtersLabel}
              >
                {copy.filters.map((filter) => {
                  const active = activeFilter === filter.key;
                  const FilterIcon = filter.icon ? PROJECT_ICONS[filter.icon] : undefined;
                  const count =
                    filter.key === "all"
                      ? copy.projects.length
                      : copy.projects.filter(
                          (project) => project.filter === filter.key,
                        ).length;

                  return (
                    <button
                      key={filter.key}
                      type="button"
                      className={cn(
                        "group/filter grid h-[48px] min-w-0 items-center gap-3 rounded-[4px] border border-border bg-white px-4 text-left shadow-[0_2px_6px_rgba(0,0,0,0.05)] outline-none transition-[translate,background-color,border-color,box-shadow,color] duration-500 hover:-translate-y-1 hover:border-brand/35 hover:shadow-[0_12px_26px_rgba(0,0,0,0.09)] focus-visible:ring-2 focus-visible:ring-brand/35 sm:gap-2 sm:px-3 min-[1700px]:h-[58px] min-[1700px]:px-4 min-[2400px]:!h-[64px] min-[2400px]:!gap-4 min-[2400px]:!px-6 [transition-timing-function:var(--ease-smooth)]",
                        FilterIcon
                          ? "grid-cols-[auto_1fr]"
                          : "place-items-center text-center",
                        active &&
                          "border-brand bg-brand text-white shadow-[0_10px_22px_rgba(0,0,0,0.18)] hover:border-brand hover:bg-brand hover:text-white hover:shadow-[0_12px_26px_rgba(0,0,0,0.18)]",
                      )}
                      aria-pressed={active}
                      onClick={() => handleFilterChange(filter.key)}
                    >
                      {FilterIcon && (
                        <FilterIcon
                          aria-hidden="true"
                          strokeWidth={1.7}
                          className={cn(
                            "h-7 w-7 shrink-0 text-brand transition-transform duration-500 group-hover/filter:-translate-y-0.5 group-hover/filter:scale-105 min-[2400px]:!h-11 min-[2400px]:!w-11 [transition-timing-function:var(--ease-smooth)]",
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
                        <strong className="line-clamp-2 text-[12px] font-extrabold leading-[1.1] min-[1800px]:!text-[14px] min-[2400px]:!text-[16px]">
                          {filter.label}
                        </strong>
                        {filter.key !== "all" && (
                          <span
                            className={cn(
                              "mt-1 truncate text-muted-foreground min-[2400px]:!mt-2 text-[9px] font-medium leading-none min-[1800px]:!text-[10px] min-[2400px]:!text-[12px]",
                              active && "text-white/85",
                            )}
                          >
                            {count} {PROJECT_COUNT_LABELS[resolvedLocale]}
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {visibleProjects.length > 0 ? (
            <div className="grid items-stretch gap-4 md:grid-cols-2 min-[2400px]:!grid-cols-3 min-[2400px]:!gap-6">
              {visibleProjects.map((project, index) => (
                <div key={project.id} className="h-full">
                  <ProjectCard
                    project={project}
                    onOpen={openProject}
                    ctaLabel={copy.viewCaseStudy}
                    openDetailsLabel={copy.cardOpenDetails}
                    imageFetchPriority={index < 2 ? "auto" : "low"}
                  />
                </div>
              ))}
            </div>
          ) : (
            <Reveal className="rounded-[7px] border border-border bg-white px-5 py-12 text-center text-[14px] font-medium text-muted-foreground">
              {copy.noResults}
            </Reveal>
          )}
        </Container>
      </section>

      {selectedProject && (
        <div
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
            aria-label={copy.modal.close}
            onClick={closeProject}
          />

          <section
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
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
                "absolute right-4 top-4 z-20 grid size-10 place-items-center rounded-full border border-border bg-white/95 text-foreground transition duration-200 hover:rotate-6 hover:scale-105 focus-visible:ring-2 focus-visible:ring-brand/30 min-[1800px]:right-8 min-[1800px]:top-8 min-[1800px]:size-14 min-[2400px]:size-16",
                contentVisible ? "opacity-100" : "opacity-0",
              )}
              aria-label={copy.modal.close}
              onClick={closeProject}
            >
              <X
                className="size-4 min-[1800px]:size-6 min-[2400px]:size-7"
                aria-hidden
              />
            </button>

            <div
              className={cn(
                "grid h-full md:grid-cols-[46%_54%] min-[1800px]:grid-cols-[48%_52%]",
                !contentVisible && "pointer-events-none",
              )}
            >
              <div className="flex min-h-[280px] flex-col overflow-hidden bg-muted md:min-h-0">
                <button
                  type="button"
                  className="relative min-h-[210px] flex-1 cursor-zoom-in overflow-hidden text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/35 min-[1800px]:min-h-[620px] min-[2400px]:min-h-[740px]"
                  aria-label={copy.modal.openImage}
                  onClick={() =>
                    setExpandedGalleryIndex(
                      Math.min(
                        activeGalleryIndex,
                        Math.max(selectedProjectGallery.length - 1, 0),
                      ),
                    )
                  }
                >
                  <Image
                    src={activeGalleryImage ?? selectedProject.image}
                    alt={selectedProject.imageAlt}
                    fill
                    sizes="(min-width: 2400px) 980px, (min-width: 1800px) 820px, (max-width: 768px) 100vw, 460px"
                    className="object-contain p-6 md:p-7 min-[1800px]:p-12 min-[2400px]:p-14"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
                </button>

                {selectedProjectGallery.length > 1 && (
                  <div
                    className="border-t border-border bg-white/[0.92] p-3 min-[1800px]:p-6 min-[2400px]:p-7"
                    aria-label={copy.modal.gallery}
                  >
                    <div
                      data-project-dialog-horizontal-scroll
                      data-lenis-prevent
                      className="flex touch-pan-x gap-2 overflow-x-auto overscroll-x-contain pb-1 min-[1800px]:gap-4"
                    >
                      {selectedProjectGallery.map((image, index) => (
                        <button
                          key={image}
                          type="button"
                          className={cn(
                            "relative h-[54px] w-[76px] shrink-0 overflow-hidden rounded-[4px] border bg-muted transition-[border-color,opacity,transform] duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-brand/30 min-[1800px]:h-[92px] min-[1800px]:w-[132px] min-[2400px]:h-[108px] min-[2400px]:w-[156px]",
                            activeGalleryIndex === index
                              ? "border-brand opacity-100"
                              : "border-border opacity-70 hover:opacity-100",
                          )}
                          aria-label={`${copy.modal.gallery} ${index + 1}`}
                          aria-current={activeGalleryIndex === index}
                          onClick={() => setActiveGalleryIndex(index)}
                        >
                          <Image
                            src={image}
                            alt=""
                            fill
                            sizes="(min-width: 2400px) 156px, (min-width: 1800px) 132px, 76px"
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div
                data-project-dialog-scroll
                data-lenis-prevent
                className="min-h-0 overflow-y-auto overscroll-contain px-5 py-7 md:px-9 md:py-10 min-[1800px]:px-16 min-[1800px]:py-16 min-[2400px]:px-20 min-[2400px]:py-[72px]"
              >
                <span className="uppercase text-brand text-[11px] font-extrabold tracking-wide min-[1800px]:text-[17px] min-[2400px]:text-[19px]">
                  {selectedProject.category}
                </span>
                <h2
                  id="project-dialog-title"
                  className="mt-4 max-w-[500px] text-foreground min-[1800px]:max-w-[840px] min-[2400px]:max-w-[980px] text-[34px] font-extrabold leading-[0.98] tracking-[-0.02em] md:text-[48px] min-[1800px]:text-[78px] min-[2400px]:text-[92px]"
                >
                  {selectedProject.title}
                </h2>
                <p className="mt-6 max-w-[500px] text-muted-foreground min-[1800px]:max-w-[860px] min-[2400px]:max-w-[980px] text-[16px] font-medium leading-[1.45] md:text-[17px] min-[1800px]:text-[26px] min-[2400px]:text-[30px]">
                  {selectedProject.description}
                </p>

                <Link
                  href={`/projects/${selectedProject.id}`}
                  className="group/fullProject mt-7 inline-flex min-h-11 items-center justify-center gap-3 rounded-[7px] bg-brand px-5 py-2.5 text-[13px] font-extrabold text-white shadow-[0_8px_22px_rgba(0,0,0,0.16)] transition-[transform,background-color] duration-300 motion-safe:hover:-translate-y-0.5 hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 motion-reduce:transition-none min-[1800px]:mt-10 min-[1800px]:min-h-16 min-[1800px]:px-8 min-[1800px]:text-[20px] min-[2400px]:text-[22px]"
                >
                  <span>{copy.modal.openFullPage}</span>
                  <ArrowRight
                    className="size-4 transition-transform duration-300 motion-safe:group-hover/fullProject:translate-x-1 motion-reduce:transition-none min-[1800px]:size-6"
                    aria-hidden
                  />
                </Link>

                <div className="mt-8 grid gap-6 md:grid-cols-2 min-[1800px]:mt-14 min-[1800px]:gap-12 min-[2400px]:mt-16">
                  <section>
                    <h3 className="uppercase text-[12px] font-extrabold tracking-wide min-[1800px]:text-[18px] min-[2400px]:text-[20px]">
                      {copy.modal.overview}
                    </h3>
                    <p className="mt-4 text-muted-foreground text-[14px] font-medium leading-[1.65] min-[1800px]:text-[21px] min-[2400px]:text-[24px]">
                      {selectedProject.overview}
                    </p>
                  </section>
                  <section>
                    <h3 className="uppercase text-[12px] font-extrabold tracking-wide min-[1800px]:text-[18px] min-[2400px]:text-[20px]">
                      {copy.modal.tags}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-muted px-3 py-1.5 text-muted-foreground min-[1800px]:px-5 min-[1800px]:py-2.5 text-[11px] font-medium min-[1800px]:text-[17px] min-[2400px]:text-[19px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </section>
                </div>

                {selectedProject.relatedPatents?.length ? (
                  <section className="mt-8 border border-border bg-white min-[1800px]:mt-14">
                    <div className="border-b border-border px-4 py-3 min-[1800px]:px-7 min-[1800px]:py-6">
                      <h3 className="uppercase text-[12px] font-extrabold tracking-wide min-[1800px]:text-[18px] min-[2400px]:text-[20px]">
                        {copy.modal.relatedPatents}
                      </h3>
                    </div>
                    <div className="grid divide-y divide-border">
                      {selectedProject.relatedPatents.map((patent) => (
                        <Link
                          key={patent.publication}
                          href={`/patents/${patent.patentId.toLowerCase()}`}
                          className={`group/patentLink grid gap-1 bg-white px-4 py-3 text-left min-[1800px]:gap-3 min-[1800px]:px-7 min-[1800px]:py-6 ${RELATED_CARD_MOTION_CLASS} ${RELATED_CARD_EMBEDDED_OUTLINE_CLASS}`}
                        >
                          <span className="text-brand text-[11px] font-extrabold min-[1800px]:text-[17px] min-[2400px]:text-[19px]">
                            {patent.publication}
                          </span>
                          <span className="text-foreground text-[14px] font-extrabold leading-tight min-[1800px]:text-[22px] min-[2400px]:text-[25px]">
                            {patent.title}
                          </span>
                          <span className="text-muted-foreground text-[12px] font-medium leading-[1.45] min-[1800px]:text-[18px] min-[2400px]:text-[20px]">
                            {patent.note}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </section>
                ) : null}
              </div>
            </div>
            {expandedGalleryImage && (
              <ProjectImageLightbox
                image={expandedGalleryImage}
                alt={selectedProject.imageAlt}
                closeLabel={copy.modal.closeImage}
                previousLabel={copy.modal.previousImage}
                nextLabel={copy.modal.nextImage}
                hasMultiple={selectedProjectGallery.length > 1}
                onClose={() => setExpandedGalleryIndex(null)}
                onPrevious={showPreviousExpandedGalleryImage}
                onNext={showNextExpandedGalleryImage}
              />
            )}
          </section>
        </div>
      )}
    </>
  );
}

function ProjectsStatsSection({
  stats,
  ariaLabel,
}: {
  stats: ProjectStat[];
  ariaLabel: string;
}) {
  return (
    <section
      className="relative z-20 pb-9 md:absolute md:inset-x-0 md:bottom-9 md:pb-0 min-[1800px]:!bottom-12 min-[2400px]:!bottom-14"
      aria-label={ariaLabel}
    >
      <Container size="wide">
        <div className="grid grid-cols-2 overflow-hidden rounded-[9px] border border-border/80 bg-white shadow-[0_7px_14px_rgba(0,0,0,0.20)] md:max-[1180px]:grid-cols-5 min-[1180px]:grid-cols-[0.8fr_1.1fr_1.2fr_1.35fr_1fr]">
          {stats.map((stat, index) => {
            const Icon = PROJECT_ICONS[stat.icon];

            return (
              <Reveal
                as="article"
                key={`${index}-${stat.label}`}
                delay={index * 0.05}
                className={cn(
                  "group/stat relative flex min-h-[116px] transform-gpu flex-col items-center justify-center gap-1 bg-white px-4 py-2.5 text-center transition-shadow duration-500 hover:z-10 hover:shadow-[0_18px_42px_rgba(0,0,0,0.07)] sm:min-h-[92px] sm:px-7 sm:py-1.5 md:max-[1180px]:min-h-[128px] md:max-[1180px]:gap-2 md:max-[1180px]:px-2 md:max-[1180px]:py-3 min-[1180px]:grid min-[1180px]:min-h-[76px] min-[1180px]:grid-cols-[34px_minmax(0,1fr)] min-[1180px]:items-center min-[1180px]:gap-3 min-[1180px]:!py-2 min-[1180px]:!pl-3 min-[1180px]:!pr-3 min-[1180px]:text-left min-[2400px]:!min-h-[90px] min-[2400px]:!grid-cols-[48px_1fr] min-[2400px]:!gap-4 min-[2400px]:!px-5 min-[2400px]:!py-3 motion-reduce:transition-none [transition-timing-function:var(--ease-smooth)]",
                  index % 2 === 0 &&
                    index < stats.length - 1 &&
                    "border-r border-border md:border-r-0",
                  index < stats.length - 1 &&
                    "border-b border-border md:border-b-0",
                  index < stats.length - 1 &&
                    "md:border-r md:border-border",
                  index === stats.length - 1 &&
                    "col-span-2 md:col-span-1",
                )}
              >
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.65}
                  className="h-[36px] w-[40px] text-brand transition-transform duration-500 group-hover/stat:-translate-y-1 sm:h-[40px] sm:w-[44px] md:max-[1180px]:h-[28px] md:max-[1180px]:w-[30px] min-[1180px]:relative min-[1180px]:h-[30px] min-[1180px]:w-[32px] min-[1180px]:justify-self-start min-[2400px]:!h-[46px] min-[2400px]:!w-[48px] motion-reduce:transition-none [transition-timing-function:var(--ease-smooth)]"
                />
                <div className="grid w-full min-w-0 max-w-full grid-rows-[44px_auto] gap-y-1 md:max-[1180px]:grid-rows-[34px_auto] min-[1180px]:grid-rows-[22px_auto] min-[2400px]:!grid-rows-[28px_auto]">
                  <strong className={cn("block max-w-full text-[18px] font-extrabold leading-[1.2] text-foreground sm:text-[19px] md:max-[1180px]:text-[14px] min-[1180px]:text-[17px] min-[1180px]:whitespace-nowrap 2xl:text-[18px] min-[2400px]:!text-[22px]", index === 2 ? "whitespace-nowrap" : "break-words [hyphens:auto]")}>
                    {stat.value}
                  </strong>
                  {stat.label && <span className="block max-w-full break-words text-muted-foreground [hyphens:auto] text-[12px] font-medium leading-tight md:max-[1180px]:text-[11px] min-[1180px]:text-[11px] min-[1180px]:leading-[14px] 2xl:text-[12px] min-[2400px]:!text-[15px] min-[2400px]:!leading-[17px]">
                    {stat.label}
                    {stat.detail ? ` ${stat.detail}` : null}
                  </span>}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function ProjectCard({
  project,
  onOpen,
  ctaLabel,
  openDetailsLabel,
  imageFetchPriority,
}: {
  project: Project;
  onOpen: (project: Project) => void;
  ctaLabel: string;
  openDetailsLabel: string;
  imageFetchPriority: "auto" | "low";
}) {
  return (
    <article
      data-project-origin
      className="group relative z-0 h-full origin-center transform-gpu cursor-pointer overflow-hidden rounded-[7px] border border-border bg-white shadow-[0_4px_7px_rgba(0,0,0,0.18)] transition-[scale,box-shadow,border-color] duration-[1100ms] will-change-transform hover:z-10 hover:scale-[1.025] hover:border-brand/25 hover:shadow-[0_16px_34px_rgba(0,0,0,0.15)] focus-within:z-10 focus-within:scale-[1.025] focus-within:border-brand/25 focus-within:shadow-[0_16px_34px_rgba(0,0,0,0.15)] motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:focus-within:scale-100 min-[2400px]:rounded-[8px] [transition-timing-function:var(--ease-smooth)]"
    >
      <button
        type="button"
        className="absolute inset-0 z-10 cursor-pointer rounded-[7px] text-left outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
        aria-haspopup="dialog"
        aria-label={`${openDetailsLabel}: ${project.title}`}
        onClick={() => onOpen(project)}
      />
      <div className="pointer-events-none relative z-20 flex h-full w-full flex-col text-left">
        <span className="relative block h-[220px] overflow-hidden bg-muted min-[2400px]:!h-[260px]">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            loading="lazy"
            fetchPriority={imageFetchPriority}
            sizes="(min-width: 2400px) 580px, (max-width: 768px) 100vw, 560px"
            className={cn(
              "transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 [transition-timing-function:var(--ease-smooth)]",
              getProjectCardImageFitClass(project.id),
            )}
          />
        </span>

        <span className="flex min-h-[150px] flex-1 flex-col px-5 pb-5 pt-5 min-[2400px]:!min-h-[210px] min-[2400px]:!px-6 min-[2400px]:!pb-6 min-[2400px]:!pt-6">
          <span className="text-brand text-[11px] font-extrabold min-[2400px]:!text-[14px]">
            {project.category}
          </span>
          <strong className="mt-2 text-foreground min-[2400px]:!mt-3 text-[19px] font-extrabold leading-tight min-[2400px]:!text-[24px]">
            {project.title}
          </strong>
          <span className="mt-2 text-muted-foreground min-[2400px]:!mt-3 text-[13px] font-medium leading-[1.4] min-[2400px]:!text-[16px]">
            {project.description}
          </span>

          <span className="mt-auto flex items-end justify-between gap-4 pt-6 min-[2400px]:!gap-5 min-[2400px]:!pt-7">
            <span className="inline-flex items-center gap-5 text-[12px] font-extrabold text-foreground min-[2400px]:!gap-5 min-[2400px]:!text-[15px]">
              {ctaLabel}
              <ArrowRight
                className="size-4 text-brand transition-transform duration-300 group-hover:translate-x-1 min-[2400px]:!size-5"
                aria-hidden
              />
            </span>
            <span className="text-right text-muted-foreground text-[10px] font-medium min-[2400px]:!text-[12px]">
              {project.tags.join(" ")}
            </span>
          </span>
        </span>
      </div>
    </article>
  );
}

export function ProjectsPageCta({ copy }: { copy: ProjectsPageCopy["cta"] }) {
  const mailSubject = encodeURIComponent(copy.subject);

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border bg-white py-16 md:min-h-[310px] md:py-20 min-[2400px]:!min-h-[650px] min-[2400px]:!py-[192px]"
      aria-labelledby="projects-cta-title"
    >
      <Image
        src="/assets/project-page/cta-sketch.png"
        alt=""
        width={874}
        height={398}
        quality={100}
        sizes="(min-width: 2400px) 70vw, (max-width: 1024px) 100vw, 700px"
        unoptimized
        className="pointer-events-none absolute bottom-0 right-0 hidden w-[46vw] max-w-[700px] opacity-35 md:block min-[2400px]:bottom-[-40px] min-[2400px]:right-[-6vw] min-[2400px]:w-[70vw] min-[2400px]:max-w-[1640px] min-[2400px]:opacity-45"
      />

      <Container size="wide" className="relative z-10">
        <Reveal className="max-w-[590px] min-[2400px]:!max-w-[1160px]">
          <div className="flex items-center gap-3 text-muted-foreground min-[2400px]:!gap-5 text-[15px] font-medium min-[2400px]:!text-[26px]">
            <span
              className="h-[2px] w-[26px] bg-brand min-[2400px]:!h-1 min-[2400px]:!w-[74px]"
              aria-hidden
            />
            {copy.eyebrow}
          </div>
          <h2
            id="projects-cta-title"
            className="domtek-text-shadow mt-8 text-foreground min-[2400px]:!mt-[82px] min-[2400px]:!max-w-[1100px] text-[36px] font-extrabold leading-[1.05] sm:text-[48px] min-[2400px]:!text-[96px]"
          >
            <span className="text-brand">.</span>
            {copy.title} <span className="text-brand">?</span>
          </h2>
          <p className="mt-6 max-w-[560px] text-muted-foreground min-[2400px]:!mt-10 min-[2400px]:!max-w-[900px] text-[16px] font-medium leading-[1.35] min-[2400px]:!text-[29px]">
            <strong className="font-extrabold">{copy.bodyStrong}</strong>{" "}
            {copy.body}
          </p>
          <a
            href={`mailto:contact@domteknika.ch?subject=${mailSubject}`}
            className="mt-8 inline-flex h-10 items-center justify-center gap-6 rounded-[7px] bg-brand px-5 text-[14px] font-extrabold text-white shadow-[0_4px_10px_rgba(0,0,0,0.28)] transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-brand/35 min-[2400px]:!mt-14 min-[2400px]:!h-[82px] min-[2400px]:!gap-8 min-[2400px]:!rounded-[10px] min-[2400px]:!px-14 min-[2400px]:!text-[29px]"
          >
            {copy.button}
            <ArrowRight className="size-4 min-[2400px]:!size-9" aria-hidden />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
