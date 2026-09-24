"use client";

import { ArrowRight, RefreshCw } from "lucide-react";
import { usePathname } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { cn } from "@/lib/utils";
import { locales, type Locale } from "@/i18n/routing";

type ErrorCopy = {
  eyebrow: string;
  lead: string;
  contact: string;
  retry: string;
  statusLabels: Partial<Record<number, string>>;
};

const ERROR_COPY: Record<Locale, ErrorCopy> = {
  fr: {
    eyebrow: "Page d'erreur",
    lead:
      "La page n'a pas pu être affichée correctement. Relancez la demande ou contactez-nous si le problème persiste.",
    contact: "Contact",
    retry: "Réessayer",
    statusLabels: {
      400: "Requête incorrecte",
      401: "Accès non authentifié",
      403: "Accès refusé",
      404: "Page introuvable",
      405: "Méthode non autorisée",
      408: "Temps d'attente dépassé",
      409: "Conflit de requête",
      410: "Ressource supprimée",
      413: "Requête trop volumineuse",
      414: "URL trop longue",
      415: "Format non supporté",
      422: "Données impossibles à traiter",
      429: "Trop de requêtes",
      451: "Accès indisponible",
      500: "Erreur interne",
      501: "Fonction non disponible",
      502: "Réponse serveur invalide",
      503: "Service indisponible",
      504: "Réponse trop lente",
      505: "Version HTTP non supportée",
    },
  },
  en: {
    eyebrow: "Error page",
    lead:
      "This page could not be displayed correctly. Try again, or contact us if the issue persists.",
    contact: "Contact",
    retry: "Try again",
    statusLabels: {
      400: "Bad request",
      401: "Authentication required",
      403: "Access denied",
      404: "Page not found",
      405: "Method not allowed",
      408: "Request timeout",
      409: "Request conflict",
      410: "Resource gone",
      413: "Request too large",
      414: "URL too long",
      415: "Unsupported format",
      422: "Unprocessable data",
      429: "Too many requests",
      451: "Unavailable access",
      500: "Internal error",
      501: "Feature unavailable",
      502: "Invalid server response",
      503: "Service unavailable",
      504: "Server response timeout",
      505: "HTTP version unsupported",
    },
  },
  de: {
    eyebrow: "Fehlerseite",
    lead:
      "Diese Seite konnte nicht korrekt angezeigt werden. Versuchen Sie es erneut oder kontaktieren Sie uns, falls das Problem bestehen bleibt.",
    contact: "Kontakt",
    retry: "Erneut versuchen",
    statusLabels: {
      400: "Fehlerhafte Anfrage",
      401: "Authentifizierung erforderlich",
      403: "Zugriff verweigert",
      404: "Seite nicht gefunden",
      405: "Methode nicht erlaubt",
      408: "Zeitüberschreitung",
      409: "Anfragekonflikt",
      410: "Ressource entfernt",
      413: "Anfrage zu gross",
      414: "URL zu lang",
      415: "Format nicht unterstützt",
      422: "Daten nicht verarbeitbar",
      429: "Zu viele Anfragen",
      451: "Zugriff nicht verfügbar",
      500: "Interner Fehler",
      501: "Funktion nicht verfügbar",
      502: "Ungültige Serverantwort",
      503: "Dienst nicht verfügbar",
      504: "Serverantwort zu langsam",
      505: "HTTP-Version nicht unterstützt",
    },
  },
  es: {
    eyebrow: "Página de error",
    lead:
      "Esta página no se pudo mostrar correctamente. Inténtalo de nuevo o contáctanos si el problema continúa.",
    contact: "Contacto",
    retry: "Intentar de nuevo",
    statusLabels: {
      400: "Solicitud incorrecta",
      401: "Autenticación requerida",
      403: "Acceso denegado",
      404: "Página no encontrada",
      405: "Método no permitido",
      408: "Tiempo de espera agotado",
      409: "Conflicto de solicitud",
      410: "Recurso eliminado",
      413: "Solicitud demasiado grande",
      414: "URL demasiado larga",
      415: "Formato no compatible",
      422: "Datos no procesables",
      429: "Demasiadas solicitudes",
      451: "Acceso no disponible",
      500: "Error interno",
      501: "Función no disponible",
      502: "Respuesta inválida del servidor",
      503: "Servicio no disponible",
      504: "Respuesta demasiado lenta",
      505: "Versión HTTP no compatible",
    },
  },
  ko: {
    eyebrow: "오류 페이지",
    lead:
      "이 페이지를 올바르게 표시할 수 없습니다. 다시 시도하거나 문제가 계속되면 문의해 주세요.",
    contact: "문의",
    retry: "다시 시도",
    statusLabels: {
      400: "잘못된 요청",
      401: "인증 필요",
      403: "접근 거부",
      404: "페이지 없음",
      405: "허용되지 않은 메서드",
      408: "요청 시간 초과",
      409: "요청 충돌",
      410: "리소스 삭제됨",
      413: "요청이 너무 큼",
      414: "URL이 너무 김",
      415: "지원하지 않는 형식",
      422: "처리할 수 없는 데이터",
      429: "요청이 너무 많음",
      451: "접근 불가",
      500: "내부 오류",
      501: "기능 사용 불가",
      502: "잘못된 서버 응답",
      503: "서비스 사용 불가",
      504: "서버 응답 시간 초과",
      505: "지원하지 않는 HTTP 버전",
    },
  },
  zh: {
    eyebrow: "错误页面",
    lead:
      "此页面无法正确显示。请重试；如果问题仍然存在，请联系我们。",
    contact: "联系",
    retry: "重试",
    statusLabels: {
      400: "错误请求",
      401: "需要认证",
      403: "访问被拒绝",
      404: "页面未找到",
      405: "方法不允许",
      408: "请求超时",
      409: "请求冲突",
      410: "资源已移除",
      413: "请求过大",
      414: "URL 过长",
      415: "格式不支持",
      422: "数据无法处理",
      429: "请求过多",
      451: "访问不可用",
      500: "内部错误",
      501: "功能不可用",
      502: "服务器响应无效",
      503: "服务不可用",
      504: "服务器响应超时",
      505: "HTTP 版本不支持",
    },
  },
  ja: {
    eyebrow: "エラーページ",
    lead:
      "このページは正しく表示できませんでした。もう一度試してください。問題が解決しない場合は、お問い合わせください。",
    contact: "お問い合わせ",
    retry: "もう一度試してください",
    statusLabels: {
      400: "不正なリクエスト",
      401: "認証が必要です",
      403: "アクセスが拒否されました",
      404: "ページが見つかりません",
      405: "許可されていないメソッド",
      408: "リクエストタイムアウト",
      409: "リクエストの競合",
      410: "リソースがなくなった",
      413: "リクエストが大きすぎます",
      414: "URLが長すぎます",
      415: "サポートされていない形式",
      422: "処理できないデータ",
      429: "リクエストが多すぎます",
      451: "利用できないアクセス",
      500: "内部エラー",
      501: "利用できない機能",
      502: "無効なサーバー応答",
      503: "サービスが利用できません",
      504: "サーバー応答タイムアウト",
      505: "HTTP バージョンがサポートされていません",
    },
  },
};

interface ErrorPageContentProps {
  statusCode?: number;
  locale?: string;
  standalone?: boolean;
  resetAction?: () => void;
}

export function ErrorPageContent({
  statusCode = 500,
  locale,
  standalone = false,
  resetAction,
}: ErrorPageContentProps) {
  const pathname = usePathname();
  const activeLocale = getLocale(locale, pathname);
  const copy = ERROR_COPY[activeLocale];
  const normalizedCode = normalizeStatusCode(statusCode);
  const statusTitle = getStatusTitle(copy, normalizedCode);
  const contactHref = `/${activeLocale}/contact`;
  const retryAction = resetAction ?? (() => window.location.reload());

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-background px-0 text-center",
        standalone
          ? "min-h-screen"
          : "min-h-[calc(100svh-180px)] pb-16 pt-[112px] sm:pb-20 sm:pt-[132px]",
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[url('/assets/project-page/hero-sketch.png')] bg-[length:920px_auto] bg-[center_28px] bg-no-repeat opacity-[0.055]"
        aria-hidden
      />

      <Container
        size="wide"
        className={cn(
          "flex min-h-[inherit] items-center justify-center py-12 sm:py-16",
          standalone && "min-h-screen",
        )}
      >
        <div className="mx-auto max-w-[820px]">
          {standalone && (
            <a
              href={`/${activeLocale}`}
              className="mb-10 inline-flex rounded-[7px] outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
              aria-label="DOMTEKNIKA"
            >
              <Logo className="w-[150px] sm:w-[170px]" />
            </a>
          )}

          <p className="domtek-text-shadow mx-auto max-w-[760px] text-[clamp(40px,7vw,76px)] font-extrabold leading-[0.96] text-foreground">
            {copy.eyebrow}
            <span className="text-brand">.</span>
          </p>

          <p className="mt-6 text-[clamp(76px,16vw,150px)] font-extrabold leading-[0.82] text-brand/95">
            {normalizedCode}
          </p>

          <h1 className="mx-auto mt-6 max-w-[760px] text-[clamp(30px,4vw,48px)] font-extrabold leading-[1.02] text-foreground">
            {statusTitle}
            <span className="text-brand">.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-[650px] text-[17px] font-medium leading-[1.5] text-muted-foreground sm:text-[21px]">
            {copy.lead}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[7px] bg-brand px-5 text-[15px] font-extrabold text-white shadow-[0_4px_10px_rgba(0,0,0,0.24)] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35"
              onClick={retryAction}
            >
              <RefreshCw className="size-4" aria-hidden />
              {copy.retry}
            </button>
            <a
              href={contactHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[7px] border border-border bg-white px-5 text-[15px] font-extrabold text-foreground transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-brand/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/25"
            >
              {copy.contact}
              <ArrowRight className="size-4 text-brand" aria-hidden />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

function getLocale(locale: string | undefined, pathname: string | null): Locale {
  if (isLocale(locale)) return locale;

  const pathLocale = pathname?.split("/")[1];
  if (isLocale(pathLocale)) return pathLocale;

  return "en";
}

function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

function normalizeStatusCode(statusCode: number) {
  if (!Number.isFinite(statusCode)) return 500;
  if (statusCode < 100 || statusCode > 599) return 500;
  return Math.trunc(statusCode);
}

function getStatusTitle(copy: ErrorCopy, statusCode: number) {
  return copy.statusLabels[statusCode] ?? `HTTP ${statusCode}`;
}
