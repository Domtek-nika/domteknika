"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import GlassSurface from "@/components/ui/glass-surface";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "expertise", href: "/expertise" },
  { key: "projects", href: "/projects" },
  { key: "patent", href: "/patents" },
  { key: "story", href: "/our-story" },
] as const;

const CONTACT_BUBBLE_IMAGES = [
  "/assets/contact-bubble-button-mask.png",
  "/assets/contact-bubble-button-mask-inverted.png",
] as const;

export function Navbar() {
  const t = useTranslations("Nav");
  const footerT = useTranslations("Footer");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileNavVisible, setMobileNavVisible] = useState(true);
  const [contactBubbleReady, setContactBubbleReady] = useState(false);
  const [hoveredNavKey, setHoveredNavKey] = useState<
    (typeof NAV_ITEMS)[number]["key"] | null
  >(null);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);
  const contactBubbleRef = useRef<HTMLDivElement>(null);
  const contactBubbleProgressRef = useRef(0);
  const currentNavKey =
    pathname === "/projects"
      ? "projects"
      : pathname === "/expertise"
        ? "expertise"
        : pathname === "/patents"
          ? "patent"
          : pathname === "/our-story"
            ? "story"
            : pathname === "/"
              ? "home"
              : null;
  const isContactPage = pathname === "/contact" || pathname.endsWith("/contact");

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      window.requestAnimationFrame(() => {
        const currentScrollY = Math.max(window.scrollY, 0);

        if (mobileOpen || currentScrollY <= 2) {
          setMobileNavVisible(true);
        } else if (currentScrollY > lastScrollYRef.current) {
          setMobileNavVisible(false);
        } else if (currentScrollY < lastScrollYRef.current) {
          setMobileNavVisible(true);
        }

        lastScrollYRef.current = currentScrollY;
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      tickingRef.current = false;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (isContactPage) return;

    let cancelled = false;

    Promise.all(CONTACT_BUBBLE_IMAGES.map(preloadImage))
      .then(waitForNextPaint)
      .then(() => {
        if (!cancelled) setContactBubbleReady(true);
      })
      .catch(() => {
        if (!cancelled) setContactBubbleReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, [isContactPage]);

  useEffect(() => {
    if (isContactPage) return;

    let animationFrame = 0;

    const updateContactBubbleColor = () => {
      animationFrame = 0;

      const bubble = contactBubbleRef.current;
      if (!bubble) return;

      const rect = bubble.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const samplePoints = [
        [0.25, 0.25],
        [0.5, 0.25],
        [0.75, 0.25],
        [0.25, 0.5],
        [0.5, 0.5],
        [0.75, 0.5],
        [0.25, 0.75],
        [0.5, 0.75],
        [0.75, 0.75],
      ] as const;

      const redHits = samplePoints.reduce((hits, [xRatio, yRatio]) => {
        const x = rect.left + rect.width * xRatio;
        const y = rect.top + rect.height * yRatio;

        return hits + (hasRedBackdropAtPoint(x, y, bubble) ? 1 : 0);
      }, 0);
      const progress = redHits / samplePoints.length;

      if (Math.abs(progress - contactBubbleProgressRef.current) < 0.01) return;

      contactBubbleProgressRef.current = progress;
      bubble.style.setProperty("--contact-invert-progress", progress.toFixed(3));
    };

    const scheduleUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateContactBubbleColor);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [isContactPage]);

  const contactBubbleVisible = contactBubbleReady && mobileNavVisible && !mobileOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-[900]">
      <nav
        className="relative isolate mx-auto hidden h-[80px] max-w-[1180px] rounded-b-[50px] min-[810px]:block min-[1800px]:h-[84px] min-[1800px]:max-w-[1480px] min-[2400px]:h-[92px] min-[2400px]:max-w-[1600px]"
        aria-label={footerT("navigationLabel")}
      >
        <div
          className="absolute inset-0 rounded-b-[50px] bg-white/75 shadow-[0_2px_10px_rgba(0,0,0,0.12)]"
          aria-hidden
        />
        <div className="domtek-glass-surface absolute inset-x-px top-0 bottom-px z-0 overflow-hidden rounded-b-[49px] border-b border-white/55 bg-white/[0.015] backdrop-blur-[10px] backdrop-saturate-[180%]">
          <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
            <GlassSurface
              width="100%"
              height="100%"
              borderRadius={0}
              backgroundOpacity={0.018}
              saturation={1.8}
              distortionScale={0}
              redOffset={0}
              greenOffset={0}
              blueOffset={0}
              fallbackVariant="svg-like"
              className="[&>div:last-child]:p-0"
            />
          </div>
        </div>
        <Container
          size="wide"
          className="relative z-10 grid h-full grid-cols-[132px_minmax(0,1fr)_210px] items-center gap-2 px-4 sm:px-4 md:px-4 min-[880px]:px-6 lg:grid-cols-[132px_minmax(0,1fr)_220px] lg:gap-3 lg:px-8 xl:px-10 min-[1400px]:grid-cols-[150px_minmax(0,1fr)_360px] min-[1400px]:px-10 min-[1800px]:grid-cols-[150px_minmax(0,1fr)_310px] min-[1800px]:gap-4 min-[1800px]:px-10 min-[2400px]:grid-cols-[160px_minmax(0,1fr)_340px] min-[2400px]:gap-5 min-[2400px]:px-12"
        >
          <Link
            href="/"
            className="inline-flex w-fit rounded-[7px] outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
            aria-label={`DOMTEKNIKA ${t("home")}`}
          >
            <Logo className="w-[132px] min-[1800px]:w-[150px] min-[2400px]:w-[160px]" />
          </Link>

          <ul
            className="hidden min-w-0 items-center justify-center gap-6 md:flex min-[1800px]:gap-8 min-[2400px]:gap-10"
            onMouseLeave={() => setHoveredNavKey(null)}
          >
            {NAV_ITEMS.map((item) => {
              const disabled = "disabled" in item ? Boolean(item.disabled) : false;
              const activeNavKey = hoveredNavKey ?? currentNavKey;

              return (
                <li
                  key={item.key}
                  onFocus={() => {
                    if (!disabled) setHoveredNavKey(item.key);
                  }}
                  onMouseEnter={() => {
                    if (!disabled) setHoveredNavKey(item.key);
                  }}
                >
                  <NavLink
                    href={item.href}
                    disabled={disabled}
                    active={!disabled && activeNavKey === item.key}
                  >
                    {t(item.key)}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          <div className="flex min-w-0 items-center justify-end gap-2 lg:gap-4 xl:gap-7 min-[1400px]:gap-8 min-[1800px]:gap-5 min-[2400px]:gap-6">
            <Button
              nativeButton={false}
              size="lg"
              className="domtek-nav-contact-cta hidden h-10 rounded-[7px] border-0 px-3 text-[12px] font-bold shadow-[0_4px_10px_rgba(0,0,0,0.28)] outline-none ring-0 transition-transform has-data-[icon=inline-end]:gap-2 hover:-translate-y-0.5 active:scale-[0.96] focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-brand/35 md:inline-flex lg:px-[14px] lg:text-[13px] 2xl:px-4 2xl:text-[14px] min-[1800px]:!h-[44px] min-[1800px]:!min-w-[120px] min-[1800px]:!gap-2 min-[1800px]:!rounded-[9px] min-[1800px]:!px-5 min-[1800px]:!text-[14px] min-[1800px]:!leading-none min-[1800px]:[&_svg]:!size-4 min-[2200px]:max-[2399px]:!h-[46px] min-[2200px]:max-[2399px]:!min-w-[128px] min-[2200px]:max-[2399px]:!text-[14px] min-[2400px]:!h-[48px] min-[2400px]:!min-w-[132px] min-[2400px]:!gap-2.5 min-[2400px]:!rounded-[10px] min-[2400px]:!px-5 min-[2400px]:!text-[15px] min-[2400px]:[&_svg]:!size-[18px]"
              render={<Link href="/contact" />}
            >
              {t("cta")}
              <ArrowRight data-icon="inline-end" />
            </Button>
            <LanguageSwitcher className="hidden md:inline-flex" />
          </div>
        </Container>
      </nav>

      <motion.div
        className={cn(
          "fixed inset-x-4 top-3 z-[910] transform-gpu will-change-transform min-[810px]:hidden",
          !mobileNavVisible && !mobileOpen && "pointer-events-none",
        )}
        initial={false}
        animate={{
          y: mobileNavVisible || mobileOpen ? 0 : -88,
          opacity: mobileNavVisible || mobileOpen ? 1 : 0,
        }}
        transition={{
          y: { duration: 0.52, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.36, ease: [0.16, 1, 0.3, 1] },
        }}
      >
        <div className="flex h-[68px] items-center justify-between gap-3 rounded-[18px] border border-border/80 bg-white px-3.5 pl-5 shadow-[0_10px_30px_rgba(0,0,0,0.14)] ring-1 ring-black/5">
          <Link
            href="/"
            className="inline-flex min-w-0 rounded-[7px] outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
            aria-label={`DOMTEKNIKA ${t("home")}`}
            onClick={() => setMobileOpen(false)}
          >
            <Logo className="w-[142px]" />
          </Link>
          <div className="flex shrink-0 items-center gap-2">
            <LanguageSwitcher className="[&>button]:h-[52px] [&>button]:min-w-[56px] [&>button]:rounded-[12px] [&>button]:border-border [&>button]:bg-white [&>button]:px-2.5 [&>button]:shadow-[0_6px_18px_rgba(0,0,0,0.10)] [&>button]:transition-[border-color,background-color,transform] [&>button]:duration-300 [&>button]:hover:-translate-y-0.5 [&>button]:hover:border-brand/35" />
            <button
              type="button"
              className="grid size-[52px] shrink-0 place-items-center rounded-[12px] border border-border bg-white text-foreground shadow-[0_6px_18px_rgba(0,0,0,0.12)] transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-brand/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35"
              aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((value) => !value)}
            >
              {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </motion.div>

      {!isContactPage && (
        <motion.div
          ref={contactBubbleRef}
          className={cn(
            "fixed bottom-[calc(env(safe-area-inset-bottom)+30px)] right-5 z-[905] min-[810px]:hidden",
            !contactBubbleVisible && "pointer-events-none",
          )}
          style={
            { "--contact-invert-progress": 0 } as CSSProperties
          }
          initial={{ y: 74, opacity: 0, scale: 0.92 }}
          animate={{
            y: contactBubbleVisible ? 0 : 74,
            opacity: contactBubbleVisible ? 1 : 0,
            scale: contactBubbleVisible ? 1 : 0.92,
          }}
          transition={{
            y: { duration: 0.52, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.36, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 0.36, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          <Link
            href="/contact"
            aria-label={t("cta")}
            className="group/contact-bubble relative grid size-[60px] place-items-center overflow-visible outline-none transition-transform duration-300 hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-brand/25"
          >
            <Image
              src="/assets/contact-bubble-button-mask.png"
              alt=""
              fill
              unoptimized
              sizes="60px"
              className="pointer-events-none object-contain drop-shadow-[0_8px_12px_rgba(227,6,19,0.34)] transition-[filter,opacity] duration-200 group-hover/contact-bubble:drop-shadow-[0_10px_16px_rgba(227,6,19,0.42)]"
              style={
                {
                  opacity: "calc(1 - var(--contact-invert-progress, 0))",
                } as CSSProperties
              }
              aria-hidden
            />
            <Image
              src="/assets/contact-bubble-button-mask-inverted.png"
              alt=""
              fill
              unoptimized
              sizes="60px"
              className="pointer-events-none object-contain drop-shadow-[0_8px_12px_rgba(227,6,19,0.18)] transition-[filter,opacity] duration-200 group-hover/contact-bubble:drop-shadow-[0_10px_16px_rgba(227,6,19,0.24)]"
              style={
                { opacity: "var(--contact-invert-progress, 0)" } as CSSProperties
              }
              aria-hidden
            />
          </Link>
        </motion.div>
      )}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[920] min-[810px]:hidden"
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.button
              type="button"
              className="absolute inset-0 cursor-default bg-black/20 backdrop-blur-[5px]"
              aria-label={t("closeMenu")}
              onClick={() => setMobileOpen(false)}
              variants={{
                closed: { opacity: 0 },
                open: { opacity: 1 },
              }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              className="absolute inset-y-0 right-0 isolate flex w-[min(84vw,360px)] flex-col overflow-hidden border-l border-border bg-white shadow-[-18px_0_42px_rgba(0,0,0,0.12)]"
              aria-label={t("openMenu")}
              variants={{
                closed: { x: "100%", opacity: 0.98 },
                open: { x: 0, opacity: 1 },
              }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative z-10 flex h-full flex-col px-6 pb-7 pt-5">
                <div className="flex items-center justify-between gap-4">
                  <Link
                    href="/"
                    className="inline-flex rounded-[7px] outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
                    aria-label={`DOMTEKNIKA ${t("home")}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Logo className="w-[126px]" />
                  </Link>
                  <button
                    type="button"
                    className="grid size-11 shrink-0 place-items-center rounded-full border border-brand/30 bg-white text-foreground shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35"
                    aria-label={t("closeMenu")}
                    onClick={() => setMobileOpen(false)}
                  >
                    <X className="size-5" aria-hidden />
                  </button>
                </div>

                <div className="mt-10 flex flex-col gap-2">
                  {NAV_ITEMS.map((item) => (
                    <NavLink
                      key={item.key}
                      href={item.href}
                      disabled={"disabled" in item ? Boolean(item.disabled) : false}
                      active={
                        !("disabled" in item ? Boolean(item.disabled) : false) &&
                        currentNavKey === item.key
                      }
                      mobile
                      onNavigate={() => setMobileOpen(false)}
                    >
                      {t(item.key)}
                    </NavLink>
                  ))}
                </div>

                <div className="mt-auto border-t border-border/70 pt-5">
                  <div className="flex items-center justify-start gap-3">
                    <Button
                      nativeButton={false}
                      className="h-11 rounded-[7px] border-0 px-5 font-bold shadow-[0_4px_10px_rgba(0,0,0,0.28)] outline-none ring-0 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-brand/35"
                      render={<Link href="/contact" />}
                      onClick={() => setMobileOpen(false)}
                    >
                      {t("cta")}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function hasRedBackdropAtPoint(x: number, y: number, bubble: HTMLElement) {
  const elements = document.elementsFromPoint(x, y);

  return elements.some((element) => {
    if (bubble.contains(element)) return false;
    return hasRedBackgroundInStack(element);
  });
}

function hasRedBackgroundInStack(element: Element) {
  let current: Element | null = element;

  while (current && current !== document.documentElement) {
    const styles = window.getComputedStyle(current);

    if (isRedBackgroundColor(styles.backgroundColor)) return true;
    if (isVisibleBackgroundColor(styles.backgroundColor)) return false;

    current = current.parentElement;
  }

  return false;
}

function isVisibleBackgroundColor(color: string) {
  const parsed = parseCssRgb(color);

  return Boolean(parsed && parsed.alpha > 0.08);
}

function isRedBackgroundColor(color: string) {
  const parsed = parseCssRgb(color);
  if (!parsed || parsed.alpha < 0.08) return false;

  return parsed.red > 150 && parsed.green < 85 && parsed.blue < 85;
}

function parseCssRgb(color: string) {
  const match = color.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/,
  );

  if (!match) return null;

  return {
    red: Number(match[1]),
    green: Number(match[2]),
    blue: Number(match[3]),
    alpha: match[4] === undefined ? 1 : Number(match[4]),
  };
}

function preloadImage(src: string) {
  return new Promise<void>((resolve, reject) => {
    const image = new window.Image();

    image.onload = () => {
      if (typeof image.decode !== "function") {
        resolve();
        return;
      }

      image.decode().then(resolve).catch(resolve);
    };

    image.onerror = () => reject(new Error(`Unable to preload ${src}`));
    image.src = src;
  });
}

function waitForNextPaint() {
  return new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => resolve());
    });
  });
}

function NavLink({
  href,
  children,
  disabled,
  active,
  mobile,
  onNavigate,
}: {
  href: string;
  children: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const className = cn(
    "relative inline-flex whitespace-nowrap text-[16px] font-bold text-foreground transition-colors duration-300 hover:text-brand focus-visible:text-brand min-[1800px]:text-[17px] min-[2400px]:text-[18px]",
    disabled && "cursor-not-allowed opacity-80 hover:text-foreground",
    mobile &&
      "w-full items-center rounded-[7px] px-4 py-3 text-[18px] hover:bg-muted",
    mobile && active && "bg-muted text-brand",
  );
  const indicator = !disabled && !mobile && (
    <span
      className={cn(
        "pointer-events-none absolute -bottom-[8px] left-0 h-px w-full origin-left bg-brand transition-transform duration-300 ease-smooth",
        active ? "scale-x-100" : "scale-x-0",
      )}
      aria-hidden
    />
  );

  if (disabled) {
    return (
      <a
        href="#"
        className={className}
        aria-disabled="true"
        onClick={(event) => event.preventDefault()}
      >
        {children}
        {indicator}
      </a>
    );
  }

  return (
    <Link href={href as never} className={className} onClick={onNavigate}>
      {children}
      {indicator}
    </Link>
  );
}
