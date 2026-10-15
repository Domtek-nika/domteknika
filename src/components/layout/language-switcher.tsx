"use client";

import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useTransition,
} from "react";
import { createPortal } from "react-dom";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";

import { locales, type Locale } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import styles from "./language-switcher.module.css";

const LANGUAGE_NAMES: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  de: "Deutsch",
  es: "Español",
  ko: "한국어",
  zh: "中文",
  ja: "日本語",
};

const LANGUAGE_BADGES: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  de: "DE",
  es: "ES",
  ko: "KO",
  zh: "ZH",
  ja: "JA",
};

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("Language");
  const current = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{
    left: number;
    minWidth: number;
    top: number;
  } | null>(null);
  const [isPending, startTransition] = useTransition();
  const menuReady = menuPosition !== null;

  const closeMenu = useCallback(() => {
    setClosing(
      menuRef.current !== null
      && !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!closing) return;
    // Also remove the inert menu if an animation-end event is interrupted.
    const timeout = window.setTimeout(() => setClosing(false), 240);
    return () => window.clearTimeout(timeout);
  }, [closing]);

  const updateMenuPosition = useCallback(() => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return;

    const viewportWidth = window.innerWidth;
    const minWidth = Math.max(
      viewportWidth >= 2200 ? 220 : 144,
      rect.width,
    );
    setMenuPosition({
      left: Math.max(12, rect.right - minWidth),
      minWidth,
      top: rect.bottom + (viewportWidth >= 2200 ? 14 : 8),
    });
  }, []);

  useEffect(() => {
    if (!open) return;

    updateMenuPosition();

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (rootRef.current?.contains(target) || menuRef.current?.contains(target)) {
        return;
      }
      closeMenu();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        triggerRef.current?.focus({ preventScroll: true });
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", updateMenuPosition);
    window.addEventListener("scroll", updateMenuPosition, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    };
  }, [open, updateMenuPosition, closeMenu]);

  useEffect(() => {
    if (!open || !menuReady) return;
    menuRef.current?.querySelector<HTMLButtonElement>('[aria-checked="true"]')?.focus({ preventScroll: true });
  }, [open, menuReady]);

  function handleMenuKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === "Tab") {
      closeMenu();
      triggerRef.current?.focus({ preventScroll: true });
      return;
    }
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const items = Array.from(menuRef.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? []);
    if (!items.length) return;
    const currentIndex = items.findIndex((item) => item === document.activeElement);
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? items.length - 1
        : (currentIndex + (event.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
    items[nextIndex].focus();
  }

  function switchTo(next: Locale) {
    closeMenu();
    triggerRef.current?.focus({ preventScroll: true });
    if (next === current) return;
    try {
      window.sessionStorage.setItem(
        "domtek:preserve-scroll-on-route",
        JSON.stringify({
          left: window.scrollX,
          top: window.scrollY,
        }),
      );
    } catch {
      // Language navigation must still work when browser storage is unavailable.
    }
    startTransition(() => {
      router.push(`${pathname}${window.location.search}${window.location.hash}`, { locale: next, scroll: false, transitionTypes: ["page-navigation"] });
    });
  }

  const menu =
    typeof document !== "undefined" && (open || closing) && menuPosition
      ? createPortal(
          <div
            ref={menuRef}
            id={menuId}
            role="menu"
            aria-hidden={!open}
            inert={!open}
            onKeyDown={handleMenuKeyDown}
            onAnimationEnd={(event) => {
              if (event.target === event.currentTarget && !open) setClosing(false);
            }}
            className={cn(
              "fixed z-[950] rounded-[10px] border border-white/80 bg-white/90 p-1 shadow-[0_16px_34px_rgba(0,0,0,0.14)] backdrop-blur-2xl min-[1800px]:!rounded-[12px] min-[1800px]:!p-1.5",
              open ? styles.enter : styles.exit,
            )}
            style={{
              left: menuPosition.left,
              minWidth: menuPosition.minWidth,
              top: menuPosition.top,
            }}
          >
            {locales.map((locale) => {
              const active = locale === current;
              const badge = LANGUAGE_BADGES[locale];
              const showBadge = badge !== LANGUAGE_NAMES[locale];

              return (
                <button
                  key={locale}
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  disabled={isPending}
                  onClick={() => switchTo(locale)}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between gap-4 rounded-[7px] px-3 py-2 text-left text-[13px] font-bold text-foreground transition-[background-color,color,box-shadow] duration-200 enabled:hover:bg-brand/10 enabled:hover:text-brand enabled:hover:shadow-[inset_2px_0_0_var(--brand)] focus-visible:bg-brand/10 focus-visible:text-brand focus-visible:shadow-[inset_2px_0_0_var(--brand)] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none [--tw-ease:var(--ease-smooth)] min-[1800px]:!gap-4 min-[1800px]:!rounded-[9px] min-[1800px]:!px-3 min-[1800px]:!py-2 min-[1800px]:!text-[14px] min-[2400px]:!text-[15px]",
                    active && "bg-brand text-white enabled:hover:bg-primary/80 enabled:hover:text-white focus-visible:bg-brand focus-visible:text-white",
                  )}
                >
                  <span>{LANGUAGE_NAMES[locale]}</span>
                  {showBadge ? (
                    <span className="text-[11px] min-[1800px]:!text-[12px] min-[2400px]:!text-[13px]">{badge}</span>
                  ) : null}
                </button>
              );
            })}
          </div>,
          document.body,
        )
      : null;

  return (
    <div ref={rootRef} className={cn("relative inline-flex", className)}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          if (open) closeMenu();
          else {
            setClosing(false);
            setOpen(true);
          }
        }}
        onKeyDown={(event) => {
          if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
          event.preventDefault();
          setClosing(false);
          setOpen(true);
        }}
        disabled={isPending}
        className="inline-flex h-[42px] min-w-[64px] cursor-pointer items-center justify-center gap-1.5 rounded-[10px] border border-white/75 bg-white/[0.72] px-3 text-[13px] font-extrabold text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_6px_16px_rgba(0,0,0,0.08)] backdrop-blur-2xl !transition-[background-color,border-color,box-shadow,color,translate,scale] duration-300 enabled:hover:border-brand/35 enabled:hover:bg-white/[0.92] enabled:hover:text-brand enabled:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_9px_20px_rgba(0,0,0,0.12)] motion-safe:enabled:hover:-translate-y-0.5 active:scale-[0.96] aria-expanded:border-brand/35 aria-expanded:bg-white/[0.92] aria-expanded:text-brand aria-expanded:shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_9px_20px_rgba(0,0,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:!translate-y-0 motion-reduce:!transition-none motion-reduce:hover:!translate-y-0 motion-reduce:active:!scale-100 [--tw-ease:var(--ease-smooth)] min-[1800px]:!h-[44px] min-[1800px]:!min-w-[76px] min-[1800px]:!gap-2 min-[1800px]:!rounded-[9px] min-[1800px]:!px-3 min-[1800px]:!text-[14px] min-[2400px]:!h-[48px] min-[2400px]:!min-w-[82px] min-[2400px]:!gap-2 min-[2400px]:!rounded-[10px] min-[2400px]:!px-3.5 min-[2400px]:!text-[15px]"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={open ? menuId : undefined}
        aria-label={t("switch")}
      >
        {LANGUAGE_BADGES[current]}
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-200 motion-reduce:transition-none min-[1800px]:!size-4 min-[2400px]:!size-[18px]",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>
      {menu}
    </div>
  );
}
