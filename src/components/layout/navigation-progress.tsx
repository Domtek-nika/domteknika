"use client";

import { useLinkStatus } from "next/link";
import { useTranslations } from "next-intl";
import { createPortal } from "react-dom";

/** Uses the router's real pending state; never delays navigation itself. */
export function NavigationProgress({ pending }: { pending: boolean }) {
  const t = useTranslations("Interface");

  if (!pending) return null;

  return createPortal(
    <div className="navigation-progress" role="progressbar" aria-label={t("loading")}>
      <span className="navigation-progress-bar" />
    </div>,
    document.body,
  );
}

export function LinkNavigationProgress() {
  const { pending } = useLinkStatus();
  return pending ? <NavigationProgress pending /> : null;
}
