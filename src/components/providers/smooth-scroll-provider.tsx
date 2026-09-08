"use client";

import { usePathname } from "next/navigation";
import { type ReactNode, useEffect } from "react";

/**
 * Keeps route transitions predictable while preserving native browser scroll.
 *
 * Lenis used to run a requestAnimationFrame loop on every page and smooth every
 * wheel event. On long DOMTEKNIKA pages that made quick scrolling feel choppy,
 * especially while reveal animations were entering the viewport. Native CSS
 * smooth scroll is still allowed for anchors because it does not intercept
 * wheel/touch input.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const preservedScroll = readPreservedRouteScroll();
      window.dispatchEvent(new Event("domtek:scroll-resize"));

      // Let Next.js restore history entries and handle links/anchors. Only a
      // language switch explicitly asks us to preserve the current position.
      if (!preservedScroll) return;

      window.scrollTo({ ...preservedScroll, behavior: "instant" });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [pathname]);

  return <>{children}</>;
}

function readPreservedRouteScroll() {
  try {
    const rawValue = window.sessionStorage.getItem(
      "domtek:preserve-scroll-on-route",
    );
    if (!rawValue) return null;
    window.sessionStorage.removeItem("domtek:preserve-scroll-on-route");

    const parsed = JSON.parse(rawValue) as {
      left?: unknown;
      top?: unknown;
    };
    if (
      typeof parsed.left !== "number" ||
      typeof parsed.top !== "number" ||
      !Number.isFinite(parsed.left) ||
      !Number.isFinite(parsed.top)
    ) {
      return null;
    }

    return { left: parsed.left, top: parsed.top };
  } catch {
    return null;
  }
}
