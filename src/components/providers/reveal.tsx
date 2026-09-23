"use client";

import { type ReactNode, useCallback, useEffect, useRef } from "react";
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

interface RevealProps {
  children: ReactNode;
  className?: string;
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
  as?: "article" | "div" | "section" | "li" | "span";
}

/**
 * Reveal — fades + slides content up once it enters the viewport.
 * Respects prefers-reduced-motion via Framer Motion's default behavior
 * (motion is disabled when the user opts out).
 */
export function Reveal({
  children,
  className,
  initiallyHidden = false,
  delay = 0,
  minimumScrollY = 0,
  minimumScrollYDesktopOnly = false,
  disabledOnMobile = false,
  disabledAtMinWidth,
  as = "div",
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
    void controls.start("visible", { delay });
  }, [controls, delay]);

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
    if (!minimumScrollY && !disabledOnMobile && !disabledAtMinWidth) return;

    const revealAfterScrollStarts = () => {
      const element = elementRef.current;
      if (!element || currentStateRef.current === "visible") return;
      if (isDisabledOnCurrentScreen()) {
        setStateImmediately("visible");
        return;
      }
      if (window.scrollY < getEffectiveMinimumScrollY()) return;

      const rect = element.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      if (rect.top < viewportHeight + 120 && rect.bottom > -120) {
        reveal();
      }
    };

    window.addEventListener("scroll", revealAfterScrollStarts, { passive: true });
    return () => window.removeEventListener("scroll", revealAfterScrollStarts);
  }, [
    disabledAtMinWidth,
    disabledOnMobile,
    getEffectiveMinimumScrollY,
    isDisabledOnCurrentScreen,
    minimumScrollY,
    reveal,
    setStateImmediately,
  ]);

  return (
    <MotionTag
      ref={(node: HTMLElement | null) => {
        elementRef.current = node;
      }}
      data-reveal
      variants={variants}
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
