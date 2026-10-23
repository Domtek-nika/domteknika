"use client";

import { type AriaAttributes, type ReactNode, useCallback, useEffect, useRef } from "react";
import { motion, useAnimationControls, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealState = "hidden" | "visible";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const subtleTransition = {
  duration: 0.42,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

const subtleVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: subtleTransition,
  },
};

interface RevealProps extends AriaAttributes {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Shorter movement for reading-focused sections and detail pages. */
  subtle?: boolean;
  /** Begin hidden so an in-view block can animate when first revealed. */
  initiallyHidden?: boolean;
  /** Delay in seconds before the reveal animation starts. */
  delay?: number;
  /** Keep the reveal hidden until the page has been scrolled by this amount. */
  minimumScrollY?: number;
  /** Ignore minimumScrollY on mobile screens. */
  minimumScrollYDesktopOnly?: boolean;
  /** Render visible without reveal animation on mobile screens. */
  disabledOnMobile?: boolean;
  /** Render visible without reveal animation when the viewport is at least this wide. */
  disabledAtMinWidth?: number;
  /** Render as a different element. */
  as?: "article" | "div" | "section" | "li" | "span" | "dl";
}

/**
 * Reveal — fades + slides content up once it enters the viewport.
 * Content is visible in the HTML by default; only off-screen blocks are armed
 * after hydration. The visibility checks also respect prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  id,
  subtle = false,
  initiallyHidden = false,
  delay = 0,
  minimumScrollY = 0,
  minimumScrollYDesktopOnly = false,
  disabledOnMobile = false,
  disabledAtMinWidth,
  as = "div",
  ...ariaAttributes
}: RevealProps) {
  const MotionTag = motion[as];
  const controls = useAnimationControls();
  const elementRef = useRef<HTMLElement | null>(null);
  const currentStateRef = useRef<RevealState>("hidden");

  const setStateImmediately = useCallback(
    (state: RevealState) => {
      controls.stop();
      currentStateRef.current = state;
      controls.set(state);
    },
    [controls],
  );

  const reveal = useCallback(() => {
    if (currentStateRef.current === "visible") return;

    currentStateRef.current = "visible";
    // A delay-only override would replace the variant's easing with a spring.
    void controls.start("visible", subtle ? { ...subtleTransition, delay } : { delay });
  }, [controls, delay, subtle]);

  const getEffectiveMinimumScrollY = useCallback(() => {
    if (
      minimumScrollYDesktopOnly &&
      window.matchMedia("(max-width: 767px)").matches
    ) {
      return 0;
    }

    return minimumScrollY;
  }, [minimumScrollY, minimumScrollYDesktopOnly]);

  const isDisabledOnCurrentMobileScreen = useCallback(
    () =>
      disabledOnMobile && window.matchMedia("(max-width: 767px)").matches,
    [disabledOnMobile],
  );

  const isDisabledOnCurrentWideScreen = useCallback(
    () =>
      typeof disabledAtMinWidth === "number" &&
      window.matchMedia(`(min-width: ${disabledAtMinWidth}px)`).matches,
    [disabledAtMinWidth],
  );

  const isDisabledOnCurrentScreen = useCallback(
    () =>
      isDisabledOnCurrentMobileScreen() || isDisabledOnCurrentWideScreen(),
    [isDisabledOnCurrentMobileScreen, isDisabledOnCurrentWideScreen],
  );

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // A remount can interrupt the animation after visibility was requested.
    // Restore its final state instead of leaving the content transparent.
    if (currentStateRef.current === "visible") {
      setStateImmediately("visible");
      return;
    }

    if (
      isDisabledOnCurrentScreen() ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setStateImmediately("visible");
      return;
    }

    const effectiveMinimumScrollY = getEffectiveMinimumScrollY();
    const rect = element.getBoundingClientRect();
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const shouldStartVisible =
      window.scrollY >= effectiveMinimumScrollY &&
      rect.top < viewportHeight + 120 &&
      rect.bottom > -120;

    if (shouldStartVisible && initiallyHidden) reveal();
    else setStateImmediately(shouldStartVisible ? "visible" : "hidden");
  }, [
    getEffectiveMinimumScrollY,
    initiallyHidden,
    isDisabledOnCurrentScreen,
    reveal,
    setStateImmediately,
  ]);

  useEffect(() => {
    if (
      !initiallyHidden &&
      !minimumScrollY &&
      !disabledOnMobile &&
      !disabledAtMinWidth
    ) return;

    const stopWatching = () => {
      window.removeEventListener("scroll", revealAfterScrollStarts);
      window.removeEventListener("pageshow", revealAfterScrollStarts);
      window.removeEventListener("load", revealAfterScrollStarts);
      window.removeEventListener("resize", revealAfterScrollStarts);
    };

    const revealAfterScrollStarts = () => {
      const element = elementRef.current;
      if (!element || currentStateRef.current === "visible") {
        stopWatching();
        return;
      }
      if (
        isDisabledOnCurrentScreen() ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        setStateImmediately("visible");
        stopWatching();
        return;
      }
      if (window.scrollY < getEffectiveMinimumScrollY()) return;

      const rect = element.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      const margin = initiallyHidden ? 0 : 120;
      if (rect.top < viewportHeight + margin && rect.bottom > -margin) {
        reveal();
        stopWatching();
      }
    };

    window.addEventListener("scroll", revealAfterScrollStarts, { passive: true });
    window.addEventListener("pageshow", revealAfterScrollStarts);
    window.addEventListener("load", revealAfterScrollStarts);
    window.addEventListener("resize", revealAfterScrollStarts);
    revealAfterScrollStarts();
    return stopWatching;
  }, [
    disabledAtMinWidth,
    disabledOnMobile,
    getEffectiveMinimumScrollY,
    initiallyHidden,
    isDisabledOnCurrentScreen,
    minimumScrollY,
    reveal,
    setStateImmediately,
  ]);

  return (
    <MotionTag
      {...ariaAttributes}
      id={id}
      ref={(node: HTMLElement | null) => {
        elementRef.current = node;
      }}
      data-reveal
      variants={subtle ? subtleVariants : variants}
      initial={initiallyHidden ? "hidden" : false}
      animate={controls}
      viewport={{ once: true, margin: "-80px" }}
      onViewportEnter={() => {
        if (isDisabledOnCurrentScreen()) {
          setStateImmediately("visible");
          return;
        }
        if (window.scrollY < getEffectiveMinimumScrollY()) return;
        reveal();
      }}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}
