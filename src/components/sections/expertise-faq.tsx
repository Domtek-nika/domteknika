import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/providers/reveal";
import { FaqSearch } from "@/components/sections/faq-search";
import { getFaqCopy } from "@/data/faq-copy";
import { getServiceCopy } from "@/data/service-copy";
import { services } from "@/data/services";

const priorityQuestionIds = [
  "general-0",
  "general-1",
  "general-2",
  "general-5",
  "general-3",
  "general-4",
  "general-7",
];
const priorityQuestions = new Set(priorityQuestionIds);

export async function ExpertiseFaq({ locale }: { locale: string }) {
  const copy = getFaqCopy(locale);
  const serviceCopy = getServiceCopy(locale);
  const t = await getTranslations({ locale, namespace: "ExpertisePage.Services" });
  const topics = [
    { id: "general", label: copy.generalTopic },
    ...services.map((service) => ({ id: service.slug, label: t(`items.${service.key}.title`) })),
  ];
  const allQuestions = [
    ...copy.general.map((item, index) => ({ ...item, topic: "general", id: `general-${index}` })),
    ...services.flatMap((service) => serviceCopy.items[service.slug].faq.map((item, index) => ({
      ...item,
      topic: service.slug,
      id: `${service.slug}-${index}`,
    }))),
  ];
  const questionsById = new Map(allQuestions.map((item) => [item.id, item]));
  const questions = [
    ...priorityQuestionIds.flatMap((id) => {
      const question = questionsById.get(id);
      return question ? [question] : [];
    }),
    ...allQuestions.filter((item) => !priorityQuestions.has(item.id)),
  ];

  return (
    <section id="expertise-faq" aria-labelledby="expertise-faq-title" className="bg-background pb-8 pt-12 md:pt-16">
      <Container size="wide">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.45fr] lg:gap-12">
          <Reveal initiallyHidden>
            <span className="block h-[3px] w-[34px] bg-brand" aria-hidden />
            <h2 id="expertise-faq-title" className="domtek-text-shadow mt-6 text-[32px] font-extrabold leading-[1.1] sm:text-[42px] min-[1800px]:text-[52px]">{copy.title}<span className="text-brand">.</span></h2>
            <p className="mt-6 max-w-[440px] text-muted-foreground text-[15px] font-medium leading-[1.55]">{copy.intro}</p>
          </Reveal>
          <Reveal initiallyHidden delay={0.08} className="min-w-0">
            <FaqSearch questions={questions} topics={topics} labels={copy.labels} locale={locale} showTopics />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
