"use client";

import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useId, useMemo, useRef, useState } from "react";

import { FaqAnswer } from "./faq-answer";
import styles from "./faq-search.module.css";

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
  resultRangeSingle: string;
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
const buttonMotionStyle = "cursor-pointer transition-[translate,scale,border-color,box-shadow,background-color,color] duration-500 motion-safe:enabled:hover:-translate-y-1 motion-safe:enabled:active:scale-[0.98] motion-reduce:transition-none [transition-timing-function:var(--ease-smooth)]";
const inactiveButtonStyle = "border-border bg-white text-foreground shadow-[0_2px_6px_rgba(0,0,0,0.05)] enabled:hover:border-brand/35 enabled:hover:shadow-[0_12px_26px_rgba(0,0,0,0.09)] active:border-brand focus-visible:border-brand";
const questionsPerPage = 7;

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
  const searchRef = useRef<HTMLInputElement>(null);
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
  const resultPages = Array.from({ length: pageCount }, (_, index) =>
    results.slice(index * questionsPerPage, (index + 1) * questionsPerPage),
  );
  const count = formatNumber.format(results.length);
  const resultLabel = results.length > questionsPerPage
    ? (visibleResults.length === 1 ? labels.resultRangeSingle : labels.resultRange)
      .replace("{from}", formatNumber.format(firstResult + 1))
      .replace("{to}", formatNumber.format(firstResult + visibleResults.length))
      .replace("{count}", count)
    : (results.length === 1 ? labels.resultSingle : labels.resultPlural).replace("{count}", count);
  const pageLabel = labels.pageLabel.replace("{current}", formatNumber.format(currentPage + 1)).replace("{total}", formatNumber.format(pageCount));

  function clearSearch() {
    setQuery("");
    setPage(0);
    searchRef.current?.focus({ preventScroll: true });
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
          ref={searchRef}
          id={searchId}
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(0);
          }}
          placeholder={labels.searchPlaceholder}
          className="min-h-14 w-full rounded-[7px] border border-border bg-white py-3 pl-12 pr-12 text-[14px] font-medium text-foreground outline-none shadow-[0_2px_7px_rgba(0,0,0,0.05)] transition-[border-color,box-shadow] duration-300 placeholder:text-muted-foreground/75 hover:border-brand/35 focus:border-brand/50 focus:shadow-[0_10px_24px_rgba(0,0,0,0.08)] motion-reduce:transition-none [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button type="button" onClick={clearSearch} aria-label={labels.clearSearch} className={`absolute right-1 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-[7px] text-muted-foreground hover:text-brand ${focusStyle}`}>
            <X className="size-4" aria-hidden />
          </button>
        )}
      </div>

      {showTopics && (
        <div className={styles.topicsViewport}>
          <div aria-label={labels.topicsLabel} role="group" className={styles.topicsGrid}>
            {[{ id: "all", label: labels.allTopics }, ...topics].map((topic) => (
              <button key={topic.id} type="button" aria-pressed={activeTopic === topic.id} onClick={() => {
                setActiveTopic(topic.id);
                setPage(0);
              }} className={`min-h-11 rounded-[7px] border px-4 py-2.5 text-left text-[12px] font-bold leading-[1.35] ${buttonMotionStyle} ${activeTopic === topic.id ? "border-brand bg-brand text-white shadow-[0_10px_22px_rgba(0,0,0,0.18)] hover:border-brand hover:bg-brand hover:shadow-[0_12px_26px_rgba(0,0,0,0.18)]" : inactiveButtonStyle} ${focusStyle}`}>
                {topic.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <p aria-live="polite" aria-atomic="true" className="mb-4 mt-5 text-muted-foreground text-xs font-bold">{resultLabel}</p>

      {results.length > 0 ? (
        <div id={resultsId}>
          <div key={`${activeTopic}:${currentPage}`} className={`${styles.results} grid items-start`}>
            {/* Overlapping pages reserve the tallest page's natural height at
                every screen size. Inactive pages cannot be seen or focused. */}
            {resultPages.map((items, pageIndex) => (
              <div
                key={pageIndex}
                aria-hidden={pageIndex !== currentPage ? true : undefined}
                inert={pageIndex !== currentPage}
                className={`col-start-1 row-start-1 border-t border-border ${pageIndex !== currentPage ? "invisible pointer-events-none" : ""}`}
              >
                {items.map((item) => (
                  <FaqAnswer
                    key={item.id}
                    hidden={false}
                    answer={item.answer}
                    focusClassName={focusStyle}
                  >
                    {showTopics && <span className="mb-1.5 block text-brand text-[11px] font-extrabold">{item.topicLabel}</span>}
                    {item.question}
                  </FaqAnswer>
                ))}
              </div>
            ))}
          </div>
          {pageCount > 1 && (
            <nav aria-label={labels.paginationLabel} className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <button type="button" disabled={currentPage === 0} aria-controls={resultsId} onClick={() => setPage(currentPage - 1)} className={`inline-flex min-h-11 items-center gap-2 rounded-[7px] border px-3 py-2.5 disabled:cursor-not-allowed disabled:opacity-40 text-[12px] font-bold ${buttonMotionStyle} ${inactiveButtonStyle} ${focusStyle}`}>
                <ChevronLeft className="size-4 shrink-0 text-brand" aria-hidden />{labels.previousPage}
              </button>
              <span className="text-muted-foreground text-[12px] font-bold">{pageLabel}</span>
              <button type="button" disabled={currentPage === pageCount - 1} aria-controls={resultsId} onClick={() => setPage(currentPage + 1)} className={`inline-flex min-h-11 items-center gap-2 rounded-[7px] border px-3 py-2.5 disabled:cursor-not-allowed disabled:opacity-40 text-[12px] font-bold ${buttonMotionStyle} ${inactiveButtonStyle} ${focusStyle}`}>
                {labels.nextPage}<ChevronRight className="size-4 shrink-0 text-brand" aria-hidden />
              </button>
            </nav>
          )}
        </div>
      ) : (
        <div className="rounded-[7px] border border-border bg-white px-5 py-8 sm:px-7">
          <p className="text-[16px] font-extrabold">{labels.noResultsTitle}</p>
          <p className="mt-2 text-muted-foreground text-[14px] leading-[1.5]">{labels.noResultsBody}</p>
          <button type="button" onClick={resetFilters} className={`mt-5 min-h-11 text-left text-brand hover:underline text-[13px] font-bold ${focusStyle}`}>{labels.resetFilters}</button>
        </div>
      )}
    </div>
  );
}
