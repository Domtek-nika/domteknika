"use client";

import { Check, Copy } from "lucide-react";
import { useRef, useState } from "react";

type Props = {
  value: string;
  labels: { copy: string; copied: string; selected: string };
};

export function CopyContactValue({ value, labels }: Props) {
  const valueRef = useRef<HTMLSpanElement>(null);
  const [status, setStatus] = useState<"idle" | "copied" | "selected">("idle");

  async function copyValue() {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch {
      if (valueRef.current) {
        const range = document.createRange();
        range.selectNodeContents(valueRef.current);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        setStatus("selected");
      }
    }
  }

  const feedback = status === "copied" ? labels.copied : status === "selected" ? labels.selected : "";

  return (
    <span className="block max-w-full">
      <span ref={valueRef} className="min-w-0 cursor-text select-all break-all">
        {value}
      </span>
      <button
        type="button"
        onClick={copyValue}
        onBlur={() => setStatus("idle")}
        aria-label={status === "copied" ? labels.copied : labels.copy}
        title={feedback || labels.copy}
        className="absolute right-2.5 top-2.5 inline-grid size-11 cursor-pointer place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand min-[1800px]:right-3.5 min-[1800px]:top-3.5 min-[1800px]:size-[52px] min-[2400px]:right-[18px] min-[2400px]:top-[18px] min-[2400px]:size-14"
      >
        <span className="grid size-8 place-items-center rounded-full border border-border bg-white/90 text-foreground shadow-[0_8px_18px_rgba(0,0,0,0.06)] transition-[transform,background-color,color,border-color,box-shadow] duration-300 group-hover/contact-card:-translate-y-0.5 group-hover/contact-card:border-brand group-hover/contact-card:bg-brand group-hover/contact-card:text-white group-hover/contact-card:shadow-[0_10px_22px_rgba(227,6,19,0.22)] motion-reduce:transition-none [transition-timing-function:var(--ease-smooth)] min-[1800px]:size-10 min-[2400px]:size-11">
          {status === "copied" ? <Check className="size-4 min-[1800px]:size-5 min-[2400px]:size-6" aria-hidden /> : <Copy className="size-4 min-[1800px]:size-5 min-[2400px]:size-6" aria-hidden />}
        </span>
      </button>
      <span className="sr-only" role="status">{feedback}</span>
    </span>
  );
}
