import { createHash } from "node:crypto";

import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 10;

const CONTACT_ADDRESS = "contact@domteknika.ch";
const CONTACT_FROM = `DOMTEKNIKA Website <${CONTACT_ADDRESS}>`;
const CONFIRMATION_FROM = `DOMTEKNIKA <${CONTACT_ADDRESS}>`;
const EMAIL_LOGO_PATH = "/assets/logo_DOMTEKNIKA_2023-alpha.png";
const MAX_BODY_BYTES = 16 * 1024;
const RESEND_TIMEOUT_MS = 8_000;
const RATE_LIMIT_MAX_KEYS = 5_000;
const RATE_LIMIT_RULES = [
  { limit: 5, windowMs: 10 * 60 * 1_000 },
  { limit: 20, windowMs: 24 * 60 * 60 * 1_000 },
] as const;
const MAX_RATE_LIMIT_WINDOW_MS = Math.max(
  ...RATE_LIMIT_RULES.map((rule) => rule.windowMs),
);
const CONTACT_LOCALES = ["de", "en", "es", "fr", "ja", "ko", "zh"] as const;
const ALLOWED_LOCALES = new Set<string>(CONTACT_LOCALES);
const ALLOWED_FIELDS = new Set([
  "company",
  "email",
  "firstName",
  "lastName",
  "locale",
  "message",
  "phone",
  "submissionId",
  "website",
]);
const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/u;
const MESSAGE_CONTROL_CHARACTERS = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u;
const EMAIL_PATTERN = /^[A-Z0-9.!#$%&'*+/=?^_{}|~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/iu;
const PHONE_PATTERN = /^[+()\d\s./-]+$/u;
const UUID_V4_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;

type ContactLocale = (typeof CONTACT_LOCALES)[number];

const CONFIRMATION_COPY: Record<
  ContactLocale,
  {
    subject: string;
    greeting: (firstName: string) => string;
    message: string;
    notice: string;
    closing: string;
    team: string;
  }
> = {
  de: {
    subject: "Wir haben Ihre Nachricht erhalten",
    greeting: (firstName) => `Guten Tag ${firstName},`,
    message:
      "Vielen Dank für Ihre Kontaktaufnahme mit DOMTEKNIKA. Wir haben Ihre Nachricht erhalten und werden uns so bald wie möglich bei Ihnen melden.",
    notice:
      "Diese automatische Bestätigung wurde gesendet, weil Ihre E-Mail-Adresse im Kontaktformular auf domteknika.ch angegeben wurde. Falls Sie diese Anfrage nicht gesendet haben, können Sie diese Nachricht ignorieren.",
    closing: "Freundliche Grüsse",
    team: "Ihr DOMTEKNIKA-Team",
  },
  en: {
    subject: "We have received your message",
    greeting: (firstName) => `Hello ${firstName},`,
    message:
      "Thank you for contacting DOMTEKNIKA. We have received your message and our team will get back to you as soon as possible.",
    notice:
      "This automatic confirmation was sent because your email address was entered in the contact form on domteknika.ch. If you did not submit this request, you can ignore this message.",
    closing: "Best regards,",
    team: "The DOMTEKNIKA team",
  },
  es: {
    subject: "Hemos recibido su mensaje",
    greeting: (firstName) => `Hola ${firstName},`,
    message:
      "Gracias por ponerse en contacto con DOMTEKNIKA. Hemos recibido su mensaje y nuestro equipo le responderá lo antes posible.",
    notice:
      "Esta confirmación automática se envió porque su dirección de correo electrónico se introdujo en el formulario de contacto de domteknika.ch. Si no realizó esta solicitud, puede ignorar este mensaje.",
    closing: "Un cordial saludo,",
    team: "El equipo de DOMTEKNIKA",
  },
  fr: {
    subject: "Nous avons bien reçu votre message",
    greeting: (firstName) => `Bonjour ${firstName},`,
    message:
      "Merci d’avoir contacté DOMTEKNIKA. Nous avons bien reçu votre message et notre équipe vous répondra dans les meilleurs délais.",
    notice:
      "Cette confirmation automatique vous est envoyée parce que votre adresse e-mail a été saisie dans le formulaire de contact de domteknika.ch. Si vous n’êtes pas à l’origine de cette demande, vous pouvez ignorer ce message.",
    closing: "Meilleures salutations,",
    team: "L’équipe DOMTEKNIKA",
  },
  ja: {
    subject: "お問い合わせを受け付けました",
    greeting: (firstName) => `${firstName} 様`,
    message:
      "DOMTEKNIKA にお問い合わせいただき、ありがとうございます。メッセージを受け付けました。担当者よりできるだけ早くご連絡いたします。",
    notice:
      "この自動確認メールは、domteknika.ch のお問い合わせフォームにお客様のメールアドレスが入力されたため送信されています。お心当たりがない場合は、このメールを破棄してください。",
    closing: "よろしくお願いいたします。",
    team: "DOMTEKNIKA チーム",
  },
  ko: {
    subject: "문의가 접수되었습니다",
    greeting: (firstName) => `${firstName}님, 안녕하세요.`,
    message:
      "DOMTEKNIKA에 문의해 주셔서 감사합니다. 메시지가 정상적으로 접수되었으며 담당자가 가능한 한 빨리 답변드리겠습니다.",
    notice:
      "이 자동 확인 메일은 domteknika.ch 문의 양식에 귀하의 이메일 주소가 입력되어 발송되었습니다. 문의를 제출하지 않으셨다면 이 메일을 무시하셔도 됩니다.",
    closing: "감사합니다.",
    team: "DOMTEKNIKA 팀",
  },
  zh: {
    subject: "我们已收到您的留言",
    greeting: (firstName) => `${firstName}，您好！`,
    message:
      "感谢您联系 DOMTEKNIKA。我们已收到您的留言，团队将尽快回复您。",
    notice:
      "由于您的电子邮箱地址被填写在 domteknika.ch 的联系表单中，系统向您发送了此自动确认邮件。如果并非您本人提交，请忽略此邮件。",
    closing: "此致",
    team: "DOMTEKNIKA 团队",
  },
};

const COUNTRY_BY_LOCALE: Record<ContactLocale, string> = {
  de: "Schweiz",
  en: "Switzerland",
  es: "Suiza",
  fr: "Suisse",
  ja: "スイス",
  ko: "스위스",
  zh: "瑞士",
};

type ContactPayload = {
  company: string;
  email: string;
  firstName: string;
  lastName: string;
  locale: ContactLocale;
  message: string;
  phone: string;
  submissionId: string;
};

type ContactResponseCode =
  | "invalid"
  | "rate_limited"
  | "unavailable";

type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number };

type RateLimitGlobal = typeof globalThis & {
  __domtekContactRateLimit?: Map<string, number[]>;
};

const rateLimitGlobal = globalThis as RateLimitGlobal;
const rateLimitStore =
  rateLimitGlobal.__domtekContactRateLimit ?? new Map<string, number[]>();

rateLimitGlobal.__domtekContactRateLimit = rateLimitStore;

export async function POST(request: Request) {
  if (!isTrustedBrowserRequest(request)) {
    return errorResponse("invalid", 403);
  }

  if (
    request.headers
      .get("content-type")
      ?.split(";", 1)[0]
      ?.trim()
      .toLowerCase() !== "application/json"
  ) {
    return errorResponse("invalid", 415);
  }

  const declaredLength = Number(request.headers.get("content-length"));
  if (
    Number.isFinite(declaredLength) &&
    declaredLength > MAX_BODY_BYTES
  ) {
    return errorResponse("invalid", 413);
  }

  const bodyResult = await readBoundedRequestBody(request);
  if (!bodyResult.ok) return errorResponse("invalid", bodyResult.status);
  const rawBody = bodyResult.body;

  let parsedBody: unknown;
  try {
    parsedBody = JSON.parse(rawBody);
  } catch {
    return errorResponse("invalid", 400);
  }

  if (isRecord(parsedBody) && hasFilledHoneypot(parsedBody)) {
    return successResponse();
  }

  const payload = parseContactPayload(parsedBody);
  if (!payload) {
    return errorResponse("invalid", 422);
  }

  const rateLimitKeys = [
    `client:${getClientFingerprint(request)}`,
    `recipient:${getRecipientFingerprint(payload.email)}`,
  ];

  for (const rateLimitKey of rateLimitKeys) {
    const rateLimit = checkRateLimit(rateLimitKey);
    if (!rateLimit.allowed) {
      return errorResponse("rate_limited", 429, {
        "Retry-After": String(rateLimit.retryAfterSeconds),
      });
    }
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not configured");
    return errorResponse("unavailable", 503);
  }

  const resend = new Resend(apiKey);
  const abortController = new AbortController();
  const timeout = setTimeout(
    () => abortController.abort(),
    RESEND_TIMEOUT_MS,
  );

  try {
    const emailLogoUrl = getEmailLogoUrl(request);
    const confirmation = buildConfirmationEmail(payload, emailLogoUrl);
    const requestOptions = {
      idempotencyKey: `contact-form/${payload.submissionId}`,
      batchValidation: "strict" as const,
      signal: abortController.signal,
    } as Parameters<typeof resend.batch.send>[1] & {
      signal: AbortSignal;
    };

    const { data, error } = await resend.batch.send(
      [
        {
          from: CONTACT_FROM,
          to: [CONTACT_ADDRESS],
          replyTo: payload.email,
          subject: "Nouveau message du site DOMTEKNIKA",
          text: buildPlainTextEmail(payload),
          html: buildHtmlEmail(payload, emailLogoUrl),
          tags: [
            { name: "source", value: "contact_form" },
            { name: "kind", value: "internal" },
            { name: "locale", value: payload.locale },
          ],
        },
        {
          from: CONFIRMATION_FROM,
          to: [payload.email],
          replyTo: CONTACT_ADDRESS,
          subject: confirmation.subject,
          text: confirmation.text,
          html: confirmation.html,
          tags: [
            { name: "source", value: "contact_form" },
            { name: "kind", value: "confirmation" },
            { name: "locale", value: payload.locale },
          ],
        },
      ],
      requestOptions,
    );

    if (error || data?.data.length !== 2) {
      console.error("[contact] Resend delivery failed", {
        name: error?.name ?? "unknown",
        statusCode: error?.statusCode ?? null,
      });
      return errorResponse("unavailable", 502);
    }

    return successResponse();
  } catch {
    console.error("[contact] Resend request failed");
    return errorResponse("unavailable", 502);
  } finally {
    clearTimeout(timeout);
  }
}

function parseContactPayload(value: unknown): ContactPayload | null {
  if (!isRecord(value)) return null;
  if (Object.keys(value).some((key) => !ALLOWED_FIELDS.has(key))) return null;

  const firstName = parseSingleLine(value.firstName, 1, 80);
  const lastName = parseSingleLine(value.lastName, 1, 80);
  const company = parseSingleLine(value.company, 0, 120);
  const rawEmail = parseSingleLine(value.email, 3, 254);
  const phone = parseSingleLine(value.phone, 0, 40);
  const message = parseMessage(value.message);
  const rawLocale = parseSingleLine(value.locale, 2, 2);
  const rawSubmissionId = parseSingleLine(value.submissionId, 36, 36);

  if (
    !firstName ||
    !lastName ||
    company === null ||
    !rawEmail ||
    phone === null ||
    !message ||
    !rawLocale ||
    !rawSubmissionId
  ) {
    return null;
  }

  const email = rawEmail.toLowerCase();
  const locale = rawLocale.toLowerCase();
  const submissionId = rawSubmissionId.toLowerCase();

  if (
    !EMAIL_PATTERN.test(email) ||
    (phone && !PHONE_PATTERN.test(phone)) ||
    !isContactLocale(locale) ||
    !UUID_V4_PATTERN.test(submissionId)
  ) {
    return null;
  }

  return {
    company,
    email,
    firstName,
    lastName,
    locale,
    message,
    phone,
    submissionId,
  };
}

function isContactLocale(value: string): value is ContactLocale {
  return ALLOWED_LOCALES.has(value);
}

async function readBoundedRequestBody(request: Request) {
  if (!request.body) {
    return { ok: true as const, body: "" };
  }

  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let body = "";
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      totalBytes += value.byteLength;
      if (totalBytes > MAX_BODY_BYTES) {
        await reader.cancel();
        return { ok: false as const, status: 413 };
      }

      body += decoder.decode(value, { stream: true });
    }

    body += decoder.decode();
    return { ok: true as const, body };
  } catch {
    return { ok: false as const, status: 400 };
  } finally {
    reader.releaseLock();
  }
}

function parseSingleLine(value: unknown, minLength: number, maxLength: number) {
  if (typeof value !== "string") return null;

  const normalized = value.trim().normalize("NFC");
  if (
    normalized.length < minLength ||
    normalized.length > maxLength ||
    CONTROL_CHARACTERS.test(normalized)
  ) {
    return null;
  }

  return normalized;
}

function parseMessage(value: unknown) {
  if (typeof value !== "string") return "";

  const normalized = value
    .replace(/\r\n?/gu, "\n")
    .trim()
    .normalize("NFC");

  if (
    normalized.length < 10 ||
    normalized.length > 5_000 ||
    MESSAGE_CONTROL_CHARACTERS.test(normalized)
  ) {
    return "";
  }

  return normalized;
}

function hasFilledHoneypot(value: Record<string, unknown>) {
  return typeof value.website === "string" && value.website.trim().length > 0;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isTrustedBrowserRequest(request: Request) {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin") return false;

  const originHeader = request.headers.get("origin");
  if (!originHeader) return false;

  let origin: URL;
  try {
    origin = new URL(originHeader);
  } catch {
    return false;
  }

  if (process.env.NODE_ENV !== "production" && isLocalDevelopmentOrigin(origin)) {
    return true;
  }

  const allowedOrigins = new Set([
    "https://domteknika.ch",
    "https://test.domteknika.ch",
    "https://www.domteknika.ch",
  ]);

  return allowedOrigins.has(origin.origin);
}

function isLocalDevelopmentOrigin(origin: URL) {
  return (
    (origin.protocol === "http:" || origin.protocol === "https:") &&
    ["127.0.0.1", "[::1]", "localhost"].includes(origin.hostname)
  );
}

function getEmailLogoUrl(request: Request) {
  const requestOrigin = request.headers.get("origin");
  const assetOrigin =
    requestOrigin === "https://domteknika.ch" ||
    requestOrigin === "https://www.domteknika.ch"
      ? "https://domteknika.ch"
      : "https://test.domteknika.ch";

  return new URL(EMAIL_LOGO_PATH, assetOrigin).toString();
}

function getClientFingerprint(request: Request) {
  const ip =
    getLastHeaderValue(request.headers.get("x-forwarded-for")) ||
    getLastHeaderValue(request.headers.get("x-real-ip"));
  const fallback = [
    request.headers.get("user-agent")?.slice(0, 256) ?? "unknown",
    request.headers.get("accept-language")?.slice(0, 128) ?? "unknown",
  ].join("\n");

  return createHash("sha256")
    .update(ip || fallback)
    .digest("hex")
    .slice(0, 40);
}

function getRecipientFingerprint(email: string) {
  return createHash("sha256").update(email).digest("hex").slice(0, 40);
}

function getLastHeaderValue(value: string | null) {
  return value?.split(",").at(-1)?.trim().slice(0, 128) ?? "";
}

function checkRateLimit(key: string, now = Date.now()): RateLimitResult {
  pruneRateLimitStore(now);

  const previousAttempts = rateLimitStore.get(key) ?? [];
  const attempts = previousAttempts.filter(
    (timestamp) => timestamp > now - MAX_RATE_LIMIT_WINDOW_MS,
  );

  for (const rule of RATE_LIMIT_RULES) {
    const windowStart = now - rule.windowMs;
    const attemptsInWindow = attempts.filter(
      (timestamp) => timestamp > windowStart,
    );

    if (attemptsInWindow.length >= rule.limit) {
      const retryAfterMs = attemptsInWindow[0] + rule.windowMs - now;
      return {
        allowed: false,
        retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1_000)),
      };
    }
  }

  attempts.push(now);
  rateLimitStore.set(key, attempts);
  return { allowed: true };
}

function pruneRateLimitStore(now: number) {
  const oldestAllowedTimestamp = now - MAX_RATE_LIMIT_WINDOW_MS;

  for (const [key, timestamps] of rateLimitStore) {
    if (!timestamps.some((timestamp) => timestamp > oldestAllowedTimestamp)) {
      rateLimitStore.delete(key);
    }
  }

  while (rateLimitStore.size >= RATE_LIMIT_MAX_KEYS) {
    const oldestKey = rateLimitStore.keys().next().value;
    if (typeof oldestKey !== "string") break;
    rateLimitStore.delete(oldestKey);
  }
}

function buildPlainTextEmail(payload: ContactPayload) {
  return [
    "Nouveau message depuis le formulaire DOMTEKNIKA",
    "",
    `Nom : ${payload.firstName} ${payload.lastName}`,
    `Entreprise : ${payload.company || "Non renseignée"}`,
    `E-mail : ${payload.email}`,
    `Téléphone : ${payload.phone || "Non renseigné"}`,
    `Langue du formulaire : ${payload.locale.toUpperCase()}`,
    "",
    "Message :",
    payload.message,
  ].join("\n");
}

function buildHtmlEmail(payload: ContactPayload, emailLogoUrl: string) {
  const rows = [
    ["Nom", `${payload.firstName} ${payload.lastName}`],
    ["Entreprise", payload.company || "Non renseignée"],
    ["E-mail", payload.email],
    ["Téléphone", payload.phone || "Non renseigné"],
    ["Langue", payload.locale.toUpperCase()],
  ];

  return `<!doctype html>
<html lang="fr">
  <body style="margin:0;padding:0;background:#f2f2f2;color:#161616;font-family:Arial,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#f2f2f2;border-collapse:collapse;">
      <tr>
        <td align="center" style="padding:36px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:680px;background:#ffffff;border:1px solid #e3e3e3;border-top:4px solid #e30613;border-radius:12px;border-collapse:separate;overflow:hidden;">
            <tr>
              <td style="padding:24px 28px;border-bottom:1px solid #eeeeee;">
                <img src="${emailLogoUrl}" width="140" alt="DOMTEKNIKA" style="display:block;width:140px;max-width:100%;height:auto;border:0;">
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <p style="margin:0 0 8px;color:#e30613;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;">Formulaire du site</p>
                <h1 style="margin:0 0 24px;color:#161616;font-size:24px;line-height:1.25;">Nouveau message DOMTEKNIKA</h1>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;">
                  ${rows
                    .map(
                      ([label, value]) => `<tr>
                        <td style="width:130px;padding:10px 12px 10px 0;border-bottom:1px solid #eeeeee;font-weight:700;vertical-align:top;">${escapeHtml(label)}</td>
                        <td style="padding:10px 0;border-bottom:1px solid #eeeeee;vertical-align:top;overflow-wrap:anywhere;">${escapeHtml(value)}</td>
                      </tr>`,
                    )
                    .join("")}
                </table>
                <h2 style="margin:28px 0 10px;font-size:16px;">Message</h2>
                <div style="padding:18px;background:#f7f7f7;border-left:3px solid #e30613;border-radius:6px;white-space:pre-wrap;overflow-wrap:anywhere;line-height:1.6;">${escapeHtml(payload.message)}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildConfirmationEmail(
  payload: ContactPayload,
  emailLogoUrl: string,
) {
  const copy = CONFIRMATION_COPY[payload.locale];
  const country = COUNTRY_BY_LOCALE[payload.locale];
  const greeting = copy.greeting(payload.firstName);

  return {
    subject: copy.subject,
    text: [
      greeting,
      "",
      copy.message,
      "",
      copy.closing,
      "DOMTEKNIKA Team",
      "+41 32 751 71 46 · contact@domteknika.ch",
      "www.domteknika.ch",
      `Chem. de Saint-Joux 16B · 2520 La Neuveville, ${country}`,
      "",
      copy.notice,
    ].join("\n"),
    html: `<!doctype html>
<html lang="${payload.locale}">
  <body style="margin:0;padding:0;background:#f2f2f2;color:#161616;font-family:Arial,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#f2f2f2;border-collapse:collapse;">
      <tr>
        <td align="center" style="padding:36px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:640px;background:#ffffff;border:1px solid #e3e3e3;border-top:4px solid #e30613;border-radius:12px;border-collapse:separate;overflow:hidden;">
            <tr>
              <td style="padding:32px 28px;">
                <h1 style="margin:0 0 24px;color:#161616;font-size:24px;line-height:1.25;">${escapeHtml(copy.subject)}</h1>
                <p style="margin:0 0 16px;line-height:1.65;">${escapeHtml(greeting)}</p>
                <p style="margin:0 0 28px;line-height:1.65;">${escapeHtml(copy.message)}</p>
                <p style="margin:0 0 12px;color:#333333;line-height:1.5;">${escapeHtml(copy.closing)}</p>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
                  <tr>
                    <td valign="middle" style="padding:2px 12px 2px 0;">
                      <img src="${emailLogoUrl}" width="68" alt="DOMTEKNIKA" style="display:block;width:68px;max-width:100%;height:auto;border:0;">
                    </td>
                    <td valign="middle" style="padding:1px 0 1px 12px;border-left:1px solid #e30613;color:#555555;font-size:11px;line-height:1.45;">
                      <strong style="color:#222222;font-size:13px;">DOMTEKNIKA Team</strong><br>
                      <a href="tel:+41327517146" style="color:#555555;text-decoration:none;">+41 32 751 71 46</a>
                      <span style="color:#bbbbbb;"> · </span>
                      <a href="mailto:${CONTACT_ADDRESS}" style="color:#e30613;text-decoration:none;">${CONTACT_ADDRESS}</a><br>
                      <a href="https://domteknika.ch" style="color:#555555;text-decoration:none;">www.domteknika.ch</a><br>
                      Chem. de Saint-Joux 16B · 2520 La Neuveville, ${escapeHtml(country)}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 28px;background:#fafafa;border-top:1px solid #eeeeee;color:#777777;font-size:12px;line-height:1.55;">
                ${escapeHtml(copy.notice)}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
  };
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/gu, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "'": "&#39;",
      '"': "&quot;",
      "<": "&lt;",
      ">": "&gt;",
    };

    return entities[character] ?? character;
  });
}

function successResponse() {
  return jsonResponse({ ok: true }, 200);
}

function errorResponse(
  code: ContactResponseCode,
  status: number,
  headers?: HeadersInit,
) {
  return jsonResponse({ ok: false, code }, status, headers);
}

function jsonResponse(
  body: { ok: true } | { ok: false; code: ContactResponseCode },
  status: number,
  extraHeaders?: HeadersInit,
) {
  const headers = new Headers(extraHeaders);
  headers.set("Cache-Control", "no-store, max-age=0");
  headers.set("Referrer-Policy", "no-referrer");
  headers.set("Vary", "Origin");
  headers.set("X-Content-Type-Options", "nosniff");

  return Response.json(body, { status, headers });
}
