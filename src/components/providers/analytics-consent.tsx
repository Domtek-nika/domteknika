"use client";

import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getAnalyticsCopy } from "@/data/analytics-copy";
import { clearAnalyticsCookies, CONSENT_EVENT, CONSENT_KEY, MEASUREMENT_ID, readConsent, SETTINGS_EVENT, SIX_MONTHS } from "@/lib/analytics-consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    "ga-disable-G-DLCHX3TCF2"?: boolean;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("focus", callback);
  const timer = window.setInterval(callback, 60_000);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("focus", callback);
    window.clearInterval(timer);
  };
}

let initialized = false;
function initializeAnalytics() {
  if (initialized || readConsent() !== "accepted") return;
  initialized = true;
  window["ga-disable-G-DLCHX3TCF2"] = false;
  window.dataLayer ??= [];
  // gtag's queue uses Arguments objects, as required by Google's snippet.
  // eslint-disable-next-line prefer-rest-params
  window.gtag = function () { window.dataLayer!.push(arguments); };
  window.gtag("consent", "default", {
    analytics_storage: "granted", ad_storage: "denied",
    ad_user_data: "denied", ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  // One automatic initial page view; GA's enhanced measurement handles SPA history.
  window.gtag("config", MEASUREMENT_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_expires: SIX_MONTHS,
    cookie_update: false,
    cookie_flags: "SameSite=Lax;Secure",
  });
}

function saveChoice(choice: "accepted" | "rejected") {
  if (choice === "rejected") {
    window["ga-disable-G-DLCHX3TCF2"] = true;
    clearAnalyticsCookies();
  }
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ choice, expires: Date.now() + SIX_MONTHS * 1000 }));
    window.dispatchEvent(new Event(CONSENT_EVENT));
  } catch { /* Fail closed if storage is unavailable. */ }
}

export function CookieSettingsButton() {
  const copy = getAnalyticsCopy(useLocale());
  return <button type="button" onClick={() => window.dispatchEvent(new Event(SETTINGS_EVENT))}
    className="w-fit text-left text-[12px] font-medium text-muted-foreground hover:text-brand focus-visible:outline-2 focus-visible:outline-brand lg:text-[13px]">
    {copy.manage}
  </button>;
}

export function AnalyticsConsent() {
  const copy = getAnalyticsCopy(useLocale());
  const consent = useSyncExternalStore(subscribe, readConsent, () => "pending");
  const [settingsOpen, setSettingsOpen] = useState(false);
  useEffect(() => {
    const open = () => setSettingsOpen(true);
    window.addEventListener(SETTINGS_EVENT, open);
    return () => window.removeEventListener(SETTINGS_EVENT, open);
  }, []);
  useEffect(() => {
    if (consent !== "accepted" && initialized) {
      window["ga-disable-G-DLCHX3TCF2"] = true;
      clearAnalyticsCookies();
      // Unload the tag entirely, including when another tab withdraws consent.
      location.reload();
    }
  }, [consent]);

  function choose(choice: "accepted" | "rejected") {
    saveChoice(choice);
    setSettingsOpen(false);
  }

  const show = consent === "unknown" || settingsOpen;
  const productionHost = typeof window !== "undefined" && ["domteknika.ch", "www.domteknika.ch"].includes(location.hostname);
  return <>
    {consent === "accepted" && productionHost ? <Script
      id="dtk-google-analytics" src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
      strategy="afterInteractive" onReady={initializeAnalytics}
    /> : null}
    {show ? <section role="region" aria-label={copy.title} className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-[760px] rounded-2xl border border-black/10 bg-white p-5 text-[#111] shadow-[0_8px_40px_rgba(0,0,0,0.14)] sm:inset-x-6 sm:bottom-6 sm:p-6">
      <div className="mb-3 h-[3px] w-9 bg-brand" aria-hidden="true" />
      <h2 className="text-lg font-extrabold">{copy.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-[#595959]">{copy.text}</p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <Link href="/privacy-policy" className="text-xs underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-brand">{copy.privacy}</Link>
        <div className="flex w-full gap-3 sm:w-auto">
          {(["rejected", "accepted"] as const).map(choice => <button key={choice} type="button" onClick={() => choose(choice)}
            className="min-h-11 flex-1 rounded-lg border border-brand bg-white px-6 py-2 text-sm font-bold text-brand transition-colors hover:bg-brand hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:flex-none">
            {choice === "accepted" ? copy.accept : copy.reject}
          </button>)}
          {settingsOpen && consent !== "unknown" ? <button type="button" onClick={() => setSettingsOpen(false)} className="px-2 text-xs underline">{copy.close}</button> : null}
        </div>
      </div>
    </section> : null}
  </>;
}
