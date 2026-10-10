import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("Interface");
  return (
    <section
      className="grid min-h-screen place-items-center bg-background px-6 pt-[112px]"
      aria-label={t("loading")}
    >
      <div className="grid justify-items-center gap-5 text-center">
        <div className="relative size-12">
          <span className="absolute inset-0 rounded-full border-2 border-brand/20" />
          <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand motion-safe:animate-spin" />
        </div>
        <p className="text-[14px] font-extrabold uppercase tracking-wide text-muted-foreground">
          DOMTEKNIKA
        </p>
      </div>
    </section>
  );
}
