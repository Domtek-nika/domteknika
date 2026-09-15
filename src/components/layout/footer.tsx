import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { CookieSettingsButton } from "@/components/providers/analytics-consent";
import { Link } from "@/i18n/navigation";

const FOOTER_NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "projects", href: "/projects" },
  { key: "expertise", href: "/expertise" },
  { key: "patent", href: "/patents" },
  { key: "story", href: "/our-story" },
  { key: "cta", href: "/contact" },
] as const;

export function Footer() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");

  return (
    <footer className="border-t border-brand/35 bg-background py-8 sm:py-10 lg:py-14 min-[1800px]:!py-16 min-[2400px]:!py-16">
      <Container size="wide">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-10 lg:grid-cols-[1.25fr_1fr_1fr_1fr] lg:gap-10 min-[1800px]:!gap-16 min-[2400px]:!gap-20">
          <div className="col-span-2 grid grid-cols-[96px_minmax(0,1fr)] items-start gap-4 lg:col-span-1 lg:block">
            <Link
              href="/"
              aria-label={nav("home")}
              className="inline-flex rounded-[4px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 focus-visible:ring-offset-4"
            >
              <Logo
                variant="footer"
                className="w-[96px] lg:w-[132px] min-[1800px]:!w-[168px] min-[2400px]:!w-[180px]"
              />
            </Link>
            <div>
              <p className="text-[13px] font-extrabold text-foreground lg:mt-4 min-[1800px]:!mt-5 min-[1800px]:!text-[18px] min-[2400px]:!text-[20px]">
                DOMTEKNIKA SA
              </p>
              <address className="mt-2 grid gap-1 not-italic text-[12px] font-medium leading-[1.5] text-muted-foreground lg:text-[13px] min-[1800px]:!mt-3 min-[1800px]:!text-[16px] min-[2400px]:!text-[18px]">
                <span>Chem. de Saint-Joux 16B</span>
                <span>2520 La Neuveville, {t("country")}</span>
              </address>
            </div>
          </div>

          <nav className="row-span-2 lg:row-span-1" aria-label={t("navigationLabel")}>
            <FooterHeading>{t("navigationLabel")}</FooterHeading>
            <div className="mt-3 grid gap-2 min-[1800px]:!mt-4 min-[1800px]:!gap-3">
              {FOOTER_NAV_ITEMS.map((item) => (
                <FooterLink key={item.key} href={item.href}>
                  {nav(item.key)}
                </FooterLink>
              ))}
            </div>
          </nav>

          <address className="not-italic">
            <FooterHeading>{t("contactLabel")}</FooterHeading>
            <div className="mt-3 grid gap-2 min-[1800px]:!mt-4 min-[1800px]:!gap-3">
              <FooterAnchor href="tel:+41327517146">
                +41 32 751 71 46
              </FooterAnchor>
              <FooterAnchor href="mailto:contact@domteknika.ch">
                contact@domteknika.ch
              </FooterAnchor>
            </div>
          </address>

          <nav aria-label={t("legalLabel")}>
            <FooterHeading>{t("legalLabel")}</FooterHeading>
            <div className="mt-3 grid gap-2 min-[1800px]:!mt-4 min-[1800px]:!gap-3">
              <FooterLink href="/legal-notice">
                {t("legalNotice")}
              </FooterLink>
              <FooterLink href="/privacy-policy">
                {t("privacyPolicy")}
              </FooterLink>
              <CookieSettingsButton />
            </div>
          </nav>
        </div>

        <p className="mt-8 border-t border-border/70 pt-5 text-center text-[12px] font-medium leading-[1.5] text-muted-foreground lg:mt-10 lg:text-[13px] min-[1800px]:!mt-12 min-[1800px]:!pt-6 min-[1800px]:!text-[16px] min-[2400px]:!text-[18px]">
          © 2026 DOMTEKNIKA SA · {t("rights")}
        </p>
      </Container>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[13px] font-extrabold leading-none text-foreground md:text-[14px] min-[1800px]:!text-[18px] min-[2400px]:!text-[20px]">
      {children}
    </h2>
  );
}

function FooterLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="w-fit text-[12px] font-medium leading-[1.5] text-muted-foreground transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 min-[1800px]:!text-[16px] min-[2400px]:!text-[18px]"
    >
      {children}
    </Link>
  );
}

function FooterAnchor({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className="w-fit text-[12px] font-medium leading-[1.5] text-muted-foreground transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 min-[1800px]:!text-[16px] min-[2400px]:!text-[18px]"
    >
      {children}
    </a>
  );
}
