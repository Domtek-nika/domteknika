"use client";

import { usePathname } from "next/navigation";
import { type ReactNode, useLayoutEffect, useRef } from "react";

/** Animate the ready page itself, preserving the live glass navbar and router tree. */
export function PageContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const previousPath = useRef(pathname);
  const mainRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const changed = previousPath.current !== pathname;
    previousPath.current = pathname;
    const main = mainRef.current;
    if (!changed || !main || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const styles = getComputedStyle(main);
    const duration = styles.getPropertyValue("--page-transition-duration").trim();
    const animation = main.animate(
      [
        { opacity: 0.25, transform: `translateY(${styles.getPropertyValue("--page-transition-offset").trim()})` },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: parseFloat(duration) * (duration.endsWith("ms") ? 1 : 1000),
        easing: styles.getPropertyValue("--page-transition-ease").trim(),
        fill: "both",
      },
    );
    animation.onfinish = () => animation.cancel();

    // A cached destination can arrive before the mobile menu has finished
    // closing. Start the reveal when it clears, not behind its glass overlay.
    const menu = document.querySelector('header [role="dialog"]');
    let observer: MutationObserver | undefined;
    let timeout: number | undefined;
    if (menu) {
      animation.pause();
      const play = () => {
        observer?.disconnect();
        window.clearTimeout(timeout);
        animation.play();
      };
      observer = new MutationObserver(() => { if (!menu.isConnected) play(); });
      observer.observe(document.querySelector("header")!, { childList: true, subtree: true });
      timeout = window.setTimeout(play, 500);
    }

    // A second navigation must never leave the page faded or translated.
    return () => {
      observer?.disconnect();
      window.clearTimeout(timeout);
      animation.cancel();
    };
  }, [pathname]);

  return <main ref={mainRef} className="relative">{children}</main>;
}
