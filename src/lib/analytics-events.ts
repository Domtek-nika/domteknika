import { readConsent } from "@/lib/analytics-consent";

/** Called only after the contact API confirms that the request was sent. */
export function trackContactLead(locale: string) {
  if (
    typeof window === "undefined"
    || !["domteknika.ch", "www.domteknika.ch"].includes(window.location.hostname)
    || readConsent() !== "accepted"
    || window["ga-disable-G-DLCHX3TCF2"] === true
    || typeof window.gtag !== "function"
  ) return;

  try {
    window.gtag("event", "generate_lead", {
      lead_source: "contact_form",
      language: locale,
    });
  } catch {
    // Analytics must never interrupt a successful contact request.
  }
}
