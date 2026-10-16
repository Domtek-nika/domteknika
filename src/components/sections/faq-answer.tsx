"use client";

import { Plus } from "lucide-react";
import { type MouseEvent, type ReactNode, useEffect, useRef } from "react";

import styles from "./faq-search.module.css";

/** Keep native details semantics and animate measured heights, including on iOS. */
export function FaqAnswer({ children, answer, hidden, focusClassName }: {
  children: ReactNode;
  answer: string;
  hidden: boolean;
  focusClassName: string;
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const expandedRef = useRef(false);

  useEffect(() => {
    const details = detailsRef.current;
    return () => {
      animationRef.current?.cancel();
      animationRef.current = null;
      if (details) {
        details.open = expandedRef.current;
        details.style.height = "";
        details.style.overflow = "";
        details.removeAttribute("data-closing");
      }
    };
  }, []);

  function toggleAnswer(event: MouseEvent<HTMLElement>) {
    event.preventDefault();
    const details = detailsRef.current;
    if (!details) return;

    const opening = !(animationRef.current ? expandedRef.current : details.open);
    const startHeight = details.getBoundingClientRect().height;
    animationRef.current?.cancel();
    expandedRef.current = opening;

    const finish = () => {
      details.open = opening;
      details.style.height = "";
      details.style.overflow = "";
      details.removeAttribute("data-closing");
      animationRef.current?.cancel();
      animationRef.current = null;
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !details.animate) {
      finish();
      return;
    }

    // Keep the answer rendered until a closing animation has completed. Reading
    // the current height first also lets rapid taps reverse without a jump.
    details.style.height = "";
    details.open = true;
    details.toggleAttribute("data-closing", !opening);
    const styles = getComputedStyle(details);
    const endHeight = opening
      ? details.getBoundingClientRect().height
      : event.currentTarget.getBoundingClientRect().height
        + parseFloat(styles.borderTopWidth) + parseFloat(styles.borderBottomWidth);
    details.style.height = `${startHeight}px`;
    details.style.overflow = "hidden";
    const animation = details.animate(
      [{ height: `${startHeight}px` }, { height: `${endHeight}px` }],
      { duration: 320, easing: styles.getPropertyValue("--ease-smooth").trim(), fill: "both" },
    );
    animationRef.current = animation;
    animation.onfinish = () => {
      if (animationRef.current === animation) finish();
    };
  }

  return (
    <details ref={detailsRef} hidden={hidden} className={`group border-b border-border ${styles.question}`}>
      <summary onClick={toggleAnswer} className={`flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 [&::-webkit-details-marker]:hidden text-[16px] font-bold leading-relaxed ${focusClassName}`}>
        <span>{children}</span>
        <Plus className="size-5 shrink-0 text-brand transition-transform duration-300 group-open:rotate-45 group-data-[closing]:rotate-0 motion-reduce:transition-none [transition-timing-function:var(--ease-smooth)]" aria-hidden />
      </summary>
      <div className={styles.answer}>
        <p className="max-w-3xl pb-6 pr-7 text-muted-foreground text-[14px] font-medium leading-[1.6]">{answer}</p>
      </div>
    </details>
  );
}
