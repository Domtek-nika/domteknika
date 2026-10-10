import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { POST } from "../src/app/api/contact/route";

type TransportCall = {
  url: string;
  method?: string;
  headers: Headers;
  body: unknown;
  signal?: AbortSignal | null;
};

type MockOptions = {
  missingApiKey?: boolean;
  expireTimeoutImmediately?: boolean;
  respond?: (call: TransportCall) => Promise<Response>;
};

const validPayload = {
  firstName: "Audit",
  lastName: "Test",
  company: "",
  email: "qa@example.invalid",
  phone: "",
  message: "This is a simulated contact request for the test suite.",
  locale: "fr",
  submissionId: "c5a07cef-7f65-4bd0-aa0e-049e21d91ca9",
  website: "",
};

function contactRequest(
  changes: Record<string, unknown> = {},
  headers: Record<string, string> = {},
  body?: string,
) {
  return new Request("https://domteknika.ch/api/contact", {
    method: "POST",
    headers: {
      Origin: "https://domteknika.ch",
      "Sec-Fetch-Site": "same-origin",
      "Content-Type": "application/json",
      "X-Real-IP": "203.0.113.1",
      ...headers,
    },
    body: body ?? JSON.stringify({ ...validPayload, ...changes }),
  });
}

async function withMockTransport(
  options: MockOptions,
  check: (calls: TransportCall[]) => Promise<void>,
) {
  const originalFetch = globalThis.fetch;
  const originalTimeout = globalThis.setTimeout;
  const originalApiKey = process.env.RESEND_API_KEY;
  const originalConsoleError = console.error;
  const rateLimitStore = (globalThis as typeof globalThis & {
    __domtekContactRateLimit?: Map<string, number[]>;
  }).__domtekContactRateLimit;
  const previousAttempts = new Map<string, number[]>(
    Array.from(rateLimitStore ?? [], ([key, timestamps]) => [
      key,
      [...timestamps],
    ] as const),
  );
  const calls: TransportCall[] = [];

  try {
    rateLimitStore?.clear();
    if (options.missingApiKey) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = "re_test_placeholder_never_sent";
    console.error = () => {};
    globalThis.fetch = async (input, init) => {
      const url = input instanceof Request ? input.url : String(input);
      assert.equal(url, "https://api.resend.com/emails/batch");
      const call: TransportCall = {
        url,
        method: init?.method,
        headers: new Headers(init?.headers),
        body: JSON.parse(String(init?.body)),
        signal: init?.signal,
      };
      calls.push(call);
      if (options.respond) return options.respond(call);
      return Response.json({ data: [{ id: "mock-internal" }, { id: "mock-confirmation" }] });
    };
    if (options.expireTimeoutImmediately) {
      globalThis.setTimeout = ((
        callback: (...args: unknown[]) => void,
        delay?: number,
        ...args: unknown[]
      ) => originalTimeout(callback, delay === 8_000 ? 1 : delay, ...args)) as typeof setTimeout;
    }
    await check(calls);
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalTimeout;
    console.error = originalConsoleError;
    if (originalApiKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = originalApiKey;
    rateLimitStore?.clear();
    for (const [key, timestamps] of previousAttempts)
      rateLimitStore?.set(key, timestamps);
  }
}

describe("contact API with simulated Resend transport", { concurrency: false }, () => {
  test("accepts the seven site languages and submits the internal and confirmation emails", async () => {
    await withMockTransport({}, async (calls) => {
      const locales = ["fr", "en", "de", "es", "ja", "ko", "zh"];
      for (const [index, locale] of locales.entries()) {
        const response = await POST(contactRequest({
          locale,
          email: `qa-${locale}@example.invalid`,
        }, { "X-Real-IP": `203.0.113.${index + 1}` }));
        assert.equal(response.status, 200, locale);
        assert.deepEqual(await response.json(), { ok: true });
        assert.equal(response.headers.get("Cache-Control"), "no-store, max-age=0");
        const call = calls[index];
        assert.equal(call.method, "POST");
        assert.equal(call.headers.get("x-batch-validation"), "strict");
        assert.equal(call.headers.get("Idempotency-Key"), `contact-form/${validPayload.submissionId}`);
        assert(call.signal instanceof AbortSignal);
        const emails = call.body as Array<{ to: string[]; reply_to: string; tags: Array<{ name: string; value: string }> }>;
        assert.equal(emails.length, 2);
        assert.deepEqual(emails[0].to, ["contact@domteknika.ch"]);
        assert.deepEqual(emails[1].to, [`qa-${locale}@example.invalid`]);
        assert.equal(emails[0].reply_to, `qa-${locale}@example.invalid`);
        assert(emails.every((email) => email.tags.some((tag) => tag.name === "locale" && tag.value === locale)));
      }
    });
  });

  test("reports unavailable service without attempting transport when the key is missing", async () => {
    await withMockTransport({ missingApiKey: true }, async (calls) => {
      const response = await POST(contactRequest());
      assert.equal(response.status, 503);
      assert.deepEqual(await response.json(), { ok: false, code: "unavailable" });
      assert.equal(calls.length, 0);
    });
  });

  test("rejects untrusted origins and cross-site requests before transport", async () => {
    await withMockTransport({}, async (calls) => {
      const headerCases: Array<Record<string, string>> = [
        { Origin: "https://untrusted.example.invalid" },
        { "Sec-Fetch-Site": "cross-site" },
      ];
      for (const headers of headerCases) {
        const response = await POST(contactRequest({}, headers));
        assert.equal(response.status, 403);
      }
      assert.equal(calls.length, 0);
    });
  });

  test("rejects incompatible content types and malformed JSON", async () => {
    await withMockTransport({}, async (calls) => {
      assert.equal((await POST(contactRequest({}, { "Content-Type": "text/plain" }))).status, 415);
      assert.equal((await POST(contactRequest({}, {}, "not JSON"))).status, 400);
      assert.equal(calls.length, 0);
    });
  });

  test("rejects invalid required fields, languages, identifiers and unexpected fields", async () => {
    await withMockTransport({}, async (calls) => {
      for (const changes of [
        { firstName: "" },
        { email: "not-an-email" },
        { message: "short" },
        { locale: "xx" },
        { submissionId: "invalid" },
        { unexpected: "value" },
      ]) assert.equal((await POST(contactRequest(changes))).status, 422);
      assert.equal(calls.length, 0);
    });
  });

  test("bounds declared and streamed request bodies", async () => {
    await withMockTransport({}, async (calls) => {
      assert.equal((await POST(contactRequest({}, { "Content-Length": String(16 * 1024 + 1) }))).status, 413);
      assert.equal((await POST(contactRequest({ message: "x".repeat(17 * 1024) }))).status, 413);
      assert.equal(calls.length, 0);
    });
  });

  test("silently accepts a filled honeypot without creating an email", async () => {
    await withMockTransport({}, async (calls) => {
      const response = await POST(contactRequest({ website: "https://bot.example.invalid" }));
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), { ok: true });
      assert.equal(calls.length, 0);
    });
  });

  test("applies the contact rate limit and exposes a retry interval", async () => {
    await withMockTransport({}, async (calls) => {
      for (let attempt = 0; attempt < 5; attempt++)
        assert.equal((await POST(contactRequest())).status, 200);
      const limited = await POST(contactRequest());
      assert.equal(limited.status, 429);
      assert.deepEqual(await limited.json(), { ok: false, code: "rate_limited" });
      assert(Number(limited.headers.get("Retry-After")) > 0);
      assert.equal(calls.length, 5);
    });
  });

  test("returns a failure when Resend rejects the batch or does not acknowledge both emails", async () => {
    for (const respond of [
      async () => Response.json({ name: "application_error", message: "Simulated rejection" }, { status: 503 }),
      async () => Response.json({ data: [{ id: "mock-internal" }] }),
    ]) {
      await withMockTransport({ respond }, async (calls) => {
        const response = await POST(contactRequest());
        assert.equal(response.status, 502);
        assert.deepEqual(await response.json(), { ok: false, code: "unavailable" });
        assert.equal(calls.length, 1);
      });
    }
  });

  test("reuses the same idempotency key when a submission is retried", async () => {
    await withMockTransport({}, async (calls) => {
      assert.equal((await POST(contactRequest())).status, 200);
      assert.equal((await POST(contactRequest())).status, 200);
      assert.equal(calls[0].headers.get("Idempotency-Key"), calls[1].headers.get("Idempotency-Key"));
    });
  });

  test("propagates the timeout AbortSignal into the real SDK transport", { timeout: 2_000 }, async () => {
    await withMockTransport({
      expireTimeoutImmediately: true,
      respond: (call) => new Promise((_resolve, reject) => {
        assert(call.signal);
        call.signal.addEventListener("abort", () => reject(new DOMException("Simulated timeout", "AbortError")), { once: true });
      }),
    }, async (calls) => {
      const response = await POST(contactRequest());
      assert.equal(response.status, 502);
      assert.equal(calls.length, 1);
      assert.equal(calls[0].signal?.aborted, true);
    });
  });
});
