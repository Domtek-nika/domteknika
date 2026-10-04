"use client";

import { ChevronLeft, ChevronRight, Plus, Search, X } from "lucide-react";
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
  resultRange: string;
  paginationLabel: string;
  previousPage: string;
  nextPage: string;
  pageLabel: string;
  noResultsTitle: string;
  noResultsBody: string;
  resetFilters: string;
};

function normalizeSearch(value: string) {
  return value.normalize("NFKC").normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

const focusStyle = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand";
const questionsPerPage = 6;

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
  const resultsId = useId();
  const [query, setQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState("all");
  const [page, setPage] = useState(0);
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
  const formatNumber = new Intl.NumberFormat(locale);
  const pageCount = Math.ceil(results.length / questionsPerPage);
  const currentPage = Math.min(page, Math.max(0, pageCount - 1));
  const firstResult = currentPage * questionsPerPage;
  const visibleResults = results.slice(firstResult, firstResult + questionsPerPage);
  const singleTopic = visibleResults.every((item) => item.topic === visibleResults[0]?.topic);
  const count = formatNumber.format(results.length);
  const resultLabel = results.length > questionsPerPage
    ? labels.resultRange.replace("{from}", formatNumber.format(firstResult + 1)).replace("{to}", formatNumber.format(firstResult + visibleResults.length)).replace("{count}", count)
    : (results.length === 1 ? labels.resultSingle : labels.resultPlural).replace("{count}", count);
  const pageLabel = labels.pageLabel.replace("{current}", formatNumber.format(currentPage + 1)).replace("{total}", formatNumber.format(pageCount));

  function clearSearch() {
    setQuery("");
    setPage(0);
  }

  function resetFilters() {
    setQuery("");
    setActiveTopic("all");
    setPage(0);
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
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(0);
          }}
          placeholder={labels.searchPlaceholder}
          className={`min-h-14 w-full rounded-[7px] border border-border bg-white py-3 pl-12 pr-12 text-[14px] font-medium shadow-[0_3px_8px_rgba(0,0,0,0.06)] placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden ${focusStyle}`}
        />
        {query && (
          <button type="button" onClick={clearSearch} aria-label={labels.clearSearch} className={`absolute right-1 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-[7px] text-muted-foreground hover:text-brand ${focusStyle}`}>
            <X className="size-4" aria-hidden />
          </button>
        )}
      </div>

      {showTopics && (
        <div aria-label={labels.topicsLabel} role="group" className="mt-5 flex flex-wrap gap-2">
          {[{ id: "all", label: labels.allTopics }, ...topics].map((topic) => (
            <button key={topic.id} type="button" aria-pressed={activeTopic === topic.id} onClick={() => {
              setActiveTopic(topic.id);
              setPage(0);
            }} className={`min-h-11 rounded-[7px] border px-4 py-2.5 text-left text-[12px] font-bold leading-[1.35] transition-colors ${activeTopic === topic.id ? "border-brand bg-brand text-white" : "border-border bg-white text-foreground hover:border-foreground/25 hover:bg-muted/40"} ${focusStyle}`}>
              {topic.label}
            </button>
          ))}
        </div>
      )}

      <p aria-live="polite" aria-atomic="true" className="mb-4 mt-5 text-xs font-bold text-muted-foreground">{resultLabel}</p>

      {results.length > 0 ? (
        <div id={resultsId}>
          {showTopics && activeTopic === "all" && singleTopic && <p className="mb-3 text-[11px] font-extrabold text-brand">{visibleResults[0].topicLabel}</p>}
          <div className="border-t border-border">
            {visibleResults.map((item) => (
              <details key={item.id} className="group border-b border-border">
                <summary className={`flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-[14px] font-bold leading-relaxed [&::-webkit-details-marker]:hidden ${focusStyle}`}>
                  <span>
                    {showTopics && activeTopic === "all" && !singleTopic && <span className="mb-1.5 block text-[11px] font-extrabold text-brand">{item.topicLabel}</span>}
                    {item.question}
                  </span>
                  <Plus className="size-5 shrink-0 text-brand transition-transform group-open:rotate-45 motion-reduce:transition-none" aria-hidden />
                </summary>
                <p className="max-w-3xl pb-6 pr-7 text-[14px] font-medium leading-[1.6] text-muted-foreground">{item.answer}</p>
              </details>
            ))}
          </div>
          {pageCount > 1 && (
            <nav aria-label={labels.paginationLabel} className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <button type="button" disabled={currentPage === 0} aria-controls={resultsId} onClick={() => setPage(currentPage - 1)} className={`inline-flex min-h-11 items-center gap-2 rounded-[7px] border border-border bg-white px-3 py-2.5 text-[12px] font-bold transition-colors hover:border-foreground/25 hover:bg-muted/40 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:bg-white ${focusStyle}`}>
                <ChevronLeft className="size-4 shrink-0 text-brand" aria-hidden />{labels.previousPage}
              </button>
              <span className="text-[12px] font-bold text-muted-foreground">{pageLabel}</span>
              <button type="button" disabled={currentPage === pageCount - 1} aria-controls={resultsId} onClick={() => setPage(currentPage + 1)} className={`inline-flex min-h-11 items-center gap-2 rounded-[7px] border border-border bg-white px-3 py-2.5 text-[12px] font-bold transition-colors hover:border-foreground/25 hover:bg-muted/40 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:bg-white ${focusStyle}`}>
                {labels.nextPage}<ChevronRight className="size-4 shrink-0 text-brand" aria-hidden />
              </button>
            </nav>
          )}
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
