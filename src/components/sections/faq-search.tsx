"use client";

import { Plus, Search, X } from "lucide-react";
import { useId, useMemo, useState } from "react";

export type FaqQuestion = {
  id: string;
  topic: string;
  question: string;
  answer: string;
};

export type FaqTopic = { id: string; label: string };

export type FaqSearchLabels = {
  searchLabel: string;
  searchPlaceholder: string;
  clearSearch: string;
  allTopics: string;
  topicsLabel: string;
  resultSingle: string;
  resultPlural: string;
  noResultsTitle: string;
  noResultsBody: string;
  resetFilters: string;
};

function normalizeSearch(value: string) {
  return value.normalize("NFKC").normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

const focusStyle = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand";

export function FaqSearch({
  questions,
  topics,
  labels,
  locale,
  showTopics = false,
}: {
  questions: FaqQuestion[];
  topics: FaqTopic[];
  labels: FaqSearchLabels;
  locale: string;
  showTopics?: boolean;
}) {
  const searchId = useId();
  const [query, setQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState("all");
  const indexedQuestions = useMemo(() => questions.map((item) => ({
    ...item,
    topicLabel: topics.find((topic) => topic.id === item.topic)?.label ?? "",
    searchText: normalizeSearch(`${item.question} ${item.answer}`),
  })), [questions, topics]);
  const terms = normalizeSearch(query).trim().split(/\s+/u).filter(Boolean);
  const results = indexedQuestions.filter((item) =>
    (activeTopic === "all" || item.topic === activeTopic)
    && terms.every((term) => item.searchText.includes(term)),
  );
  const count = new Intl.NumberFormat(locale).format(results.length);
  const resultLabel = (results.length === 1 ? labels.resultSingle : labels.resultPlural).replace("{count}", count);

  function resetFilters() {
    setQuery("");
    setActiveTopic("all");
  }

  return (
    <div>
      <label htmlFor={searchId} className="sr-only">{labels.searchLabel}</label>
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-brand" aria-hidden />
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={labels.searchPlaceholder}
          className={`min-h-14 w-full rounded-[7px] border border-border bg-white py-3 pl-12 pr-12 text-[14px] font-medium shadow-[0_3px_8px_rgba(0,0,0,0.06)] placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden ${focusStyle}`}
        />
        {query && (
          <button type="button" onClick={() => setQuery("")} aria-label={labels.clearSearch} className={`absolute right-1 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-[7px] text-muted-foreground hover:text-brand ${focusStyle}`}>
            <X className="size-4" aria-hidden />
          </button>
        )}
      </div>

      {showTopics && (
        <div aria-label={labels.topicsLabel} role="group" className="mt-5 flex flex-wrap gap-2">
          {[{ id: "all", label: labels.allTopics }, ...topics].map((topic) => (
            <button key={topic.id} type="button" aria-pressed={activeTopic === topic.id} onClick={() => setActiveTopic(topic.id)} className={`min-h-11 rounded-[7px] border px-4 py-2.5 text-left text-[12px] font-bold leading-[1.35] transition-colors ${activeTopic === topic.id ? "border-brand bg-brand text-white" : "border-border bg-white text-foreground hover:border-brand/40 hover:bg-brand/5"} ${focusStyle}`}>
              {topic.label}
            </button>
          ))}
        </div>
      )}

      <p aria-live="polite" aria-atomic="true" className="mb-4 mt-5 text-xs font-bold text-muted-foreground">{resultLabel}</p>

      {results.length > 0 ? (
        <div className="border-t border-border">
          {results.map((item) => (
            <details key={item.id} className="group border-b border-border">
              <summary className={`flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-[14px] font-bold leading-relaxed [&::-webkit-details-marker]:hidden ${focusStyle}`}>
                <span>
                  {showTopics && activeTopic === "all" && <span className="mb-1.5 block text-[11px] font-extrabold text-brand">{item.topicLabel}</span>}
                  {item.question}
                </span>
                <Plus className="size-5 shrink-0 text-brand transition-transform group-open:rotate-45 motion-reduce:transition-none" aria-hidden />
              </summary>
              <p className="max-w-3xl pb-6 pr-7 text-[14px] font-medium leading-[1.6] text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      ) : (
        <div className="rounded-[7px] border border-border bg-white px-5 py-8 sm:px-7">
          <p className="text-[16px] font-extrabold">{labels.noResultsTitle}</p>
          <p className="mt-2 text-[14px] leading-[1.5] text-muted-foreground">{labels.noResultsBody}</p>
          <button type="button" onClick={resetFilters} className={`mt-5 min-h-11 text-left text-[13px] font-bold text-brand hover:underline ${focusStyle}`}>{labels.resetFilters}</button>
        </div>
      )}
    </div>
  );
}
