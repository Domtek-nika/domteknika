"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";

const importContactMap = () => import("@/components/sections/contact-map");
let contactMapPromise: ReturnType<typeof importContactMap> | null = null;

function loadContactMap() {
  contactMapPromise ??= importContactMap();
  return contactMapPromise;
}

const DynamicContactMap = dynamic(
  () => loadContactMap().then((module) => module.ContactMap),
  {
    ssr: false,
    loading: () => <MapPlaceholder loading />,
  },
);

const LOAD_LABELS: Record<string, string> = {
  en: "Load interactive map",
  fr: "Charger la carte interactive",
  de: "Interaktive Karte laden",
  es: "Cargar el mapa interactivo",
  ko: "인터랙티브 지도 불러오기",
  zh: "加载交互式地图",
};

export function LazyContactMap({ label }: { label: string }) {
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    let timeoutId: number | null = null;
    let idleCallbackId: number | null = null;
    const idleWindow = window as Window & {
      requestIdleCallback?: Window["requestIdleCallback"];
      cancelIdleCallback?: Window["cancelIdleCallback"];
    };

    const preloadWhenIdle = () => {
      if (typeof idleWindow.requestIdleCallback === "function") {
        idleCallbackId = idleWindow.requestIdleCallback(
          () => {
            void loadContactMap();
          },
          { timeout: 5000 },
        );
        return;
      }

      timeoutId = window.setTimeout(() => {
        void loadContactMap();
      }, 3000);
    };

    if (document.readyState === "complete") {
      preloadWhenIdle();
    } else {
      window.addEventListener("load", preloadWhenIdle, { once: true });
    }

    return () => {
      window.removeEventListener("load", preloadWhenIdle);
      if (timeoutId !== null) window.clearTimeout(timeoutId);
      if (
        idleCallbackId !== null &&
        typeof idleWindow.cancelIdleCallback === "function"
      ) {
        idleWindow.cancelIdleCallback(idleCallbackId);
      }
    };
  }, []);

  useEffect(() => {
    if (shouldLoad || !containerRef.current) return;
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className="size-full">
      {shouldLoad ? (
        <DynamicContactMap label={label} />
      ) : (
        <button
          type="button"
          className="group grid size-full place-items-center bg-[linear-gradient(135deg,#f8f8f8,#eeeeee)] text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/35"
          onClick={() => setShouldLoad(true)}
        >
          <span className="grid justify-items-center gap-3 rounded-[7px] border border-border bg-white/90 px-5 py-4 shadow-[0_10px_26px_rgba(0,0,0,0.08)]">
            <MapPin
              className="size-6 text-brand transition-transform group-hover:-translate-y-0.5"
              aria-hidden
            />
            <span className="text-[12px] font-extrabold">
              {LOAD_LABELS[locale] ?? LOAD_LABELS.en}
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

function MapPlaceholder({ loading = false }: { loading?: boolean }) {
  return (
    <div
      className="grid size-full animate-pulse place-items-center bg-muted/70"
      aria-busy={loading}
    >
      <MapPin className="size-7 text-brand/60" aria-hidden />
    </div>
  );
}
