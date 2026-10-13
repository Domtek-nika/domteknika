import { Container } from "@/components/layout/container";
import type { LegalSection } from "@/data/legal-pages";

function isExternalLink(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function LegalDocumentPage({
  eyebrow,
  title,
  intro,
  updatedLabel,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updatedLabel: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <section className="bg-background pb-20 pt-[132px] md:pb-28 md:pt-[152px]">
      <Container size="default">
        <div className="mx-auto max-w-[920px]">
          <div className="flex items-center gap-3 font-medium text-muted-foreground domtek-type-eyebrow">
            <span className="h-[3px] w-[34px] shrink-0 bg-brand" aria-hidden />
            {eyebrow}
          </div>

          <h1 className="mt-9 text-balance font-extrabold text-foreground md:mt-11 domtek-type-display">
            {title}
            <span className="text-brand">.</span>
          </h1>

          <p className="mt-5 max-w-[780px] text-pretty text-muted-foreground domtek-type-body">
            {intro}
          </p>
          <p className="mt-3 font-medium text-muted-foreground/80 domtek-type-small">
            {updatedLabel}: {updated}
          </p>

          <div className="mt-10 grid gap-9 border-t border-border pt-9 md:mt-12 md:gap-11 md:pt-11">
            {sections.map((section) => (
              <article key={section.title} className="max-w-[820px]">
                <h2 className="text-balance font-extrabold text-foreground domtek-type-heading">
                  {section.title}
                </h2>

                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-3 whitespace-pre-line text-pretty text-muted-foreground domtek-type-small"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.items && (
                  <ul className="mt-3 grid list-disc gap-1.5 pl-5 text-muted-foreground marker:text-brand domtek-type-body">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.links && (
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-semibold md:text-[14px]">
                    {section.links.map((link) => (
                      <a
                        key={`${link.href}-${link.label}`}
                        href={link.href}
                        className="text-brand underline decoration-brand/35 underline-offset-4 transition-colors hover:text-brand/75"
                        target={isExternalLink(link.href) ? "_blank" : undefined}
                        rel={isExternalLink(link.href) ? "noreferrer" : undefined}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
