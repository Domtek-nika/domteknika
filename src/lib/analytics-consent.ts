export const MEASUREMENT_ID = "G-DLCHX3TCF2";
export const CONSENT_KEY = "dtk.analytics-consent.v1";
export const CONSENT_EVENT = "dtk:analytics-consent";
export const SETTINGS_EVENT = "dtk:cookie-settings";
const SETTINGS_KEY = "dtk.cookie-settings-open.v1";
let settingsOpenFallback = false;

// UI state only: reopening the notice never changes the stored consent.
export function readCookieSettingsOpen(): boolean {
  try { return sessionStorage.getItem(SETTINGS_KEY) === "true"; }
  catch { return settingsOpenFallback; }
}

export function setCookieSettingsOpen(open: boolean) {
  settingsOpenFallback = open;
  try {
    if (open) sessionStorage.setItem(SETTINGS_KEY, "true");
    else sessionStorage.removeItem(SETTINGS_KEY);
  } catch { /* Keep working for client navigation when storage is unavailable. */ }
  window.dispatchEvent(new Event(SETTINGS_EVENT));
}
export const SIX_MONTHS = 180 * 24 * 60 * 60;
export type Consent = "accepted" | "rejected" | "unknown";

export function parseConsent(raw: string | null, now = Date.now()): Consent {
  try {
    const record = JSON.parse(raw ?? "null");
    return record && (record.choice === "accepted" || record.choice === "rejected") &&
      typeof record.expires === "number" && record.expires > now &&
      record.expires <= now + SIX_MONTHS * 1000
      ? record.choice : "unknown";
  } catch { return "unknown"; }
}

export function readConsent(): Consent {
  try { return parseConsent(localStorage.getItem(CONSENT_KEY)); }
  catch { return "unknown"; }
}

export function clearAnalyticsCookies() {
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.trim().split("=")[0];
    if (!/^_ga(?:_|$)/.test(name)) continue;
    for (const domain of ["", location.hostname, ".domteknika.ch"]) {
      document.cookie = `${name}=; Max-Age=0; Path=/;${domain ? ` Domain=${domain};` : ""} SameSite=Lax`;
    }
  }
}
