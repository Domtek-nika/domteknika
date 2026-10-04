import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/container";
import { FaqSearch } from "@/components/sections/faq-search";
import { getFaqCopy } from "@/data/faq-copy";
import { getServiceCopy } from "@/data/service-copy";
import { services } from "@/data/services";

export async function ExpertiseFaq({ locale }: { locale: string }) {
  const copy = getFaqCopy(locale);
  const serviceCopy = getServiceCopy(locale);
  const t = await getTranslations({ locale, namespace: "ExpertisePage.Services" });
  const topics = [
    { id: "general", label: copy.generalTopic },
    ...services.map((service) => ({ id: service.slug, label: t(`items.${service.key}.title`) })),
  ];
  const questions = [
    ...copy.general.map((item, index) => ({ ...item, topic: "general", id: `general-${index}` })),
    ...services.flatMap((service) => serviceCopy.items[service.slug].faq.map((item, index) => ({
      ...item,
      topic: service.slug,
      id: `${service.slug}-${index}`,
    }))),
  ];

  return (
    <section id="expertise-faq" aria-labelledby="expertise-faq-title" className="bg-background pb-20 pt-4 md:pb-24">
      <Container size="wide">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.45fr] lg:gap-12">
          <div>
            <span className="block h-[3px] w-[34px] bg-brand" aria-hidden />
            <h2 id="expertise-faq-title" className="domtek-text-shadow mt-6 text-[32px] font-extrabold leading-[1.1] sm:text-[42px] min-[1800px]:text-[52px]">{copy.title}<span className="text-brand">.</span></h2>
            <p className="mt-6 max-w-[440px] text-[15px] font-medium leading-[1.55] text-muted-foreground">{copy.intro}</p>
          </div>
          <FaqSearch questions={questions} topics={topics} labels={copy.labels} locale={locale} showTopics />
        </div>
      </Container>
    </section>
  );
}
