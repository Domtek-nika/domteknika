import assert from "node:assert/strict";
import { test } from "node:test";
import { parseConsent, SIX_MONTHS } from "../src/lib/analytics-consent";

test("consent fails closed for absent, malformed, expired or invalid records", () => {
  const now = 1_800_000_000_000;
  for (const raw of [null, "invalid", "null", "{}", JSON.stringify({ choice: "accepted", expires: now - 1 }), JSON.stringify({ choice: "yes", expires: now + 1000 }), JSON.stringify({ choice: "accepted", expires: now + SIX_MONTHS * 2000 })]) {
    assert.equal(parseConsent(raw, now), "unknown");
  }
  for (const choice of ["accepted", "rejected"] as const) {
    assert.equal(parseConsent(JSON.stringify({ choice, expires: now + SIX_MONTHS * 1000 }), now), choice);
  }
});
