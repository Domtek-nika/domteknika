# Google Analytics — DOMTEKNIKA

Measurement ID: `G-DLCHX3TCF2`. This is a public identifier, not a secret.

The tag is loaded only on `domteknika.ch` and `www.domteknika.ch`, after explicit consent. Local previews never send analytics to the real property. No Google tag, preconnect or consent-mode ping is sent before acceptance. Refusal and acceptance are remembered for 180 days. The footer opens preferences; withdrawal disables the tag, removes accessible `_ga` cookies and reloads the page to unload Google code. Google advertising consent, Google Signals and ad personalization are disabled in this integration.

## Before/after deployment

- In Analytics → Admin → Data streams → DTK → Enhanced measurement, keep **Page views → Page changes based on browser history events** enabled. This handles Next.js navigation. Do not add another tag or manual page-view tracker (double counting).
- Disable unnecessary enhanced measurements, particularly form interactions and site search; never send contact form values or personal data in events/URLs.
- Keep Google Signals and user-provided data collection off in the Analytics property. Do not link advertising products without reviewing consent and privacy information.
- Set event data retention to 2 months in Analytics Admin. Cookie expiry in site code is 180 days and is not the same as server-side retention.
- After pulling `main`, install with `npm ci`, build with `npm run build`, then restart using the existing Infomaniak workflow. Do not pull over unexplained server-side changes.
- Verify in a fresh browser session on production: no Google requests before consent or after refusal; after acceptance, one initial page view and one per page navigation. Check Analytics → Reports → Realtime. Withdraw via the footer and confirm cookies and requests stop. Requests may be blocked by browser extensions; absence in reports is not proof that the site is broken.

Privacy disclosures are included in all six languages. The setup is not a legal certification; the site owner remains responsible for the Analytics account settings and applicable transfer arrangements.

Local checks: `npx tsx --test scripts/analytics-consent.test.ts`, `npm run build`, `npm run audit:content`.
