import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { CONSENT_KEY, SIX_MONTHS } from "../src/lib/analytics-consent";
import { trackContactLead } from "../src/lib/analytics-events";

type BrowserOptions = {
  ssr?: boolean;
  hostname?: string;
  consent?: string | null;
  storageUnavailable?: boolean;
  tag?: "ready" | "missing" | "invalid" | "disabled" | "throwing";
};

const browserGlobals = ["window", "location", "localStorage"] as const;

function withBrowser(
  options: BrowserOptions,
  check: (calls: unknown[][]) => void,
) {
  const originalDescriptors = browserGlobals.map((key) => [
    key,
    Object.getOwnPropertyDescriptor(globalThis, key),
  ] as const);
  const calls: unknown[][] = [];
  const location = { hostname: options.hostname ?? "domteknika.ch" };
  const acceptedConsent = JSON.stringify({
    choice: "accepted",
    expires: Date.now() + 60_000,
  });
  const rawConsent = options.consent === undefined
    ? acceptedConsent
    : options.consent;
  const localStorage = {
    getItem(key: string) {
      if (options.storageUnavailable) throw new Error("Storage unavailable");
      return key === CONSENT_KEY ? rawConsent : null;
    },
  };
  const tag = (...args: unknown[]) => {
    calls.push(args);
    if (options.tag === "throwing") throw new Error("Analytics unavailable");
  };
  const window = {
    location,
    gtag: options.tag === "missing"
      ? undefined
      : options.tag === "invalid" ? "not a function" : tag,
    "ga-disable-G-DLCHX3TCF2": options.tag === "disabled",
  };
  const values = { window, location, localStorage };

  try {
    for (const key of browserGlobals) {
      if (options.ssr) {
        Reflect.deleteProperty(globalThis, key);
      } else {
        Object.defineProperty(globalThis, key, {
          configurable: true,
          writable: true,
          value: values[key],
        });
      }
    }
    check(calls);
  } finally {
    for (const [key, descriptor] of originalDescriptors) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else Reflect.deleteProperty(globalThis, key);
    }
  }
}

function expectNoLead(options: BrowserOptions) {
  withBrowser(options, (calls) => {
    assert.doesNotThrow(() => trackContactLead("fr"));
    assert.deepEqual(calls, []);
  });
}

describe("contact lead measurement", { concurrency: false }, () => {
  test("does nothing during server rendering", () => {
    expectNoLead({ ssr: true });
  });

  test("does nothing on localhost, preview hosts or lookalike domains", () => {
    for (const hostname of [
      "localhost",
      "127.0.0.1",
      "preview.domteknika.ch",
      "domteknika.ch.example.com",
    ]) expectNoLead({ hostname });
  });

  test("does nothing without a saved consent choice", () => {
    expectNoLead({ consent: null });
  });

  test("does nothing with malformed consent", () => {
    for (const consent of ["invalid", "null", "{}"])
      expectNoLead({ consent });
  });

  test("does nothing after consent is rejected", () => {
    expectNoLead({
      consent: JSON.stringify({
        choice: "rejected",
        expires: Date.now() + 60_000,
      }),
    });
  });

  test("does nothing after consent expires", () => {
    expectNoLead({
      consent: JSON.stringify({
        choice: "accepted",
        expires: Date.now() - 1,
      }),
    });
  });

  test("does nothing with a consent expiration beyond the permitted lifetime", () => {
    expectNoLead({
      consent: JSON.stringify({
        choice: "accepted",
        expires: Date.now() + SIX_MONTHS * 2_000,
      }),
    });
  });

  test("fails closed when browser storage is unavailable", () => {
    expectNoLead({ storageUnavailable: true });
  });

  test("sends only generate_lead, the form source and language after valid consent", () => {
    for (const hostname of ["domteknika.ch", "www.domteknika.ch"]) {
      for (const locale of ["fr", "en", "de", "es", "ja", "ko", "zh"]) {
        withBrowser({ hostname }, (calls) => {
          trackContactLead(locale);
          assert.deepEqual(calls, [[
            "event",
            "generate_lead",
            { lead_source: "contact_form", language: locale },
          ]]);
        });
      }
    }
  });

  test("does nothing when the analytics tag is absent", () => {
    expectNoLead({ tag: "missing" });
  });

  test("does nothing when the analytics tag is not a function", () => {
    expectNoLead({ tag: "invalid" });
  });

  test("does nothing when the analytics measurement is explicitly disabled", () => {
    expectNoLead({ tag: "disabled" });
  });

  test("never propagates an exception thrown by the analytics tag", () => {
    withBrowser({ tag: "throwing" }, (calls) => {
      assert.doesNotThrow(() => trackContactLead("fr"));
      assert.equal(calls.length, 1);
    });
  });

  test("restores the original browser global descriptors after each check", () => {
    const before = browserGlobals.map((key) =>
      Object.getOwnPropertyDescriptor(globalThis, key));
    withBrowser({}, () => trackContactLead("fr"));
    const after = browserGlobals.map((key) =>
      Object.getOwnPropertyDescriptor(globalThis, key));
    assert.deepEqual(after, before);
  });
});
