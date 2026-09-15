export const MEASUREMENT_ID = "G-DLCHX3TCF2";
export const CONSENT_KEY = "dtk.analytics-consent.v1";
export const CONSENT_EVENT = "dtk:analytics-consent";
export const SETTINGS_EVENT = "dtk:cookie-settings";
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
