"use client";

import {
  useRef,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
} from "react";
import {
  AlertCircle,
  ArrowUpRight,
  LoaderCircle,
  LockKeyhole,
} from "lucide-react";

import { cn } from "@/lib/utils";

type ContactFormCopy = {
  title: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  submit: string;
  sending: string;
  success: string;
  invalid: string;
  rateLimited: string;
  error: string;
};

type SubmissionStatus = "idle" | "sending" | "success" | "invalid" | "rateLimited" | "error";

export function ContactForm({
  copy,
  locale,
}: {
  copy: ContactFormCopy;
  locale: string;
}) {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const submissionIdRef = useRef<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const submissionId = submissionIdRef.current ?? createSubmissionId();
    submissionIdRef.current = submissionId;
    setStatus("sending");

    const abortController = new AbortController();
    const timeout = window.setTimeout(() => abortController.abort(), 12_000);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        credentials: "same-origin",
        cache: "no-store",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: getFormString(formData, "firstName"),
          lastName: getFormString(formData, "lastName"),
          company: getFormString(formData, "company"),
          email: getFormString(formData, "email"),
          phone: getFormString(formData, "phone"),
          message: getFormString(formData, "message"),
          website: getFormString(formData, "website"),
          locale,
          submissionId,
        }),
        signal: abortController.signal,
      });

      if (response.ok) {
        form.reset();
        submissionIdRef.current = null;
        setStatus("success");
        return;
      }

      if (response.status === 422) {
        setStatus("invalid");
      } else if (response.status === 429) {
        setStatus("rateLimited");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
    }
  };

  const resetSubmissionState = () => {
    submissionIdRef.current = null;
    if (status !== "idle" && status !== "sending") setStatus("idle");
  };

  const feedback = getFeedback(status, copy);

  return (
    <form
      className="rounded-[12px] border border-border bg-white/88 px-5 py-5 shadow-[0_18px_46px_rgba(0,0,0,0.09)] backdrop-blur-sm md:px-6 md:py-6 min-[1800px]:!rounded-[16px] min-[1800px]:!px-8 min-[1800px]:!py-8 min-[2400px]:!rounded-[18px] min-[2400px]:!px-10 min-[2400px]:!py-10"
      onSubmit={onSubmit}
      onInput={resetSubmissionState}
      aria-busy={status === "sending"}
    >
      <h2 className="text-[19px] font-extrabold leading-none text-foreground md:text-[20px] min-[1800px]:!text-[26px] min-[2400px]:!text-[30px]">
        {copy.title}
      </h2>

      <div className="pointer-events-none absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-4 grid gap-2.5 sm:grid-cols-2 min-[1800px]:!mt-6 min-[1800px]:!gap-4 min-[2400px]:!mt-7 min-[2400px]:!gap-5">
        <ContactInput
          name="firstName"
          placeholder={copy.firstName}
          autoComplete="given-name"
          maxLength={80}
          required
        />
        <ContactInput
          name="lastName"
          placeholder={copy.lastName}
          autoComplete="family-name"
          maxLength={80}
          required
        />
      </div>

      <div className="mt-2.5 grid gap-2.5 min-[1800px]:!mt-4 min-[1800px]:!gap-4 min-[2400px]:!mt-5 min-[2400px]:!gap-5">
        <ContactInput
          name="company"
          placeholder={copy.company}
          autoComplete="organization"
          maxLength={120}
        />
        <ContactInput
          name="email"
          type="email"
          placeholder={copy.email}
          autoComplete="email"
          maxLength={254}
          required
        />
        <ContactInput
          name="phone"
          type="tel"
          placeholder={copy.phone}
          autoComplete="tel"
          maxLength={40}
        />
        <label className="sr-only" htmlFor="contact-message">
          {copy.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          placeholder={copy.message}
          minLength={10}
          maxLength={5000}
          required
          className="min-h-[88px] resize-y rounded-[7px] border border-input bg-white px-3.5 py-3 text-[13px] font-medium leading-[1.45] text-foreground outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground focus:border-brand/45 focus:shadow-[0_0_0_3px_rgba(227,6,19,0.08)] min-[1800px]:!min-h-[130px] min-[1800px]:!rounded-[10px] min-[1800px]:!px-5 min-[1800px]:!py-4 min-[1800px]:!text-[15px] min-[2400px]:!min-h-[160px] min-[2400px]:!rounded-[12px] min-[2400px]:!px-6 min-[2400px]:!py-5 min-[2400px]:!text-[17px]"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-3 inline-flex h-[44px] w-full items-center justify-between rounded-[7px] bg-brand px-5 text-[14px] font-extrabold text-white shadow-[0_6px_12px_rgba(0,0,0,0.22)] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 focus-visible:ring-offset-2 [transition-timing-function:var(--ease-smooth)] min-[1800px]:!mt-4 min-[1800px]:!h-[56px] min-[1800px]:!rounded-[10px] min-[1800px]:!px-7 min-[1800px]:!text-[17px] min-[2400px]:!mt-5 min-[2400px]:!h-[64px] min-[2400px]:!rounded-[12px] min-[2400px]:!px-8 min-[2400px]:!text-[19px]"
      >
        {status === "sending" ? copy.sending : copy.submit}
        {status === "sending" ? (
          <LoaderCircle className="size-4 animate-spin min-[1800px]:!size-5 min-[2400px]:!size-6" aria-hidden />
        ) : (
          <ArrowUpRight className="size-4 min-[1800px]:!size-5 min-[2400px]:!size-6" aria-hidden />
        )}
      </button>

      {feedback && (
        <p
          className={cn(
            "mt-3 flex items-start gap-2 text-[12px] font-medium leading-[1.35] min-[1800px]:!mt-4 min-[1800px]:!gap-3 min-[1800px]:!text-[14px] min-[2400px]:!text-[16px]",
            feedback.isError ? "text-brand" : "text-foreground",
          )}
          role={feedback.isError ? "alert" : "status"}
          aria-live={feedback.isError ? "assertive" : "polite"}
        >
          {feedback.isError ? (
            <AlertCircle className="mt-px size-4 shrink-0 min-[1800px]:!size-5 min-[2400px]:!size-6" aria-hidden />
          ) : (
            <LockKeyhole className="mt-px size-4 shrink-0 text-brand min-[1800px]:!size-5 min-[2400px]:!size-6" aria-hidden />
          )}
          {feedback.message}
        </p>
      )}
    </form>
  );
}

function getFormString(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

function createSubmissionId() {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();

  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0"));

  return [
    hex.slice(0, 4).join(""),
    hex.slice(4, 6).join(""),
    hex.slice(6, 8).join(""),
    hex.slice(8, 10).join(""),
    hex.slice(10, 16).join(""),
  ].join("-");
}

function getFeedback(status: SubmissionStatus, copy: ContactFormCopy) {
  if (status === "success") {
    return { message: copy.success, isError: false };
  }
  if (status === "invalid") {
    return { message: copy.invalid, isError: true };
  }
  if (status === "rateLimited") {
    return { message: copy.rateLimited, isError: true };
  }
  if (status === "error") {
    return { message: copy.error, isError: true };
  }

  return null;
}

function ContactInput({
  className,
  id,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  const inputId = id ?? `contact-${props.name}`;

  return (
    <>
      <label className="sr-only" htmlFor={inputId}>
        {props.placeholder}
      </label>
      <input
        id={inputId}
        className={cn(
          "h-[40px] rounded-[7px] border border-input bg-white px-3.5 text-[13px] font-medium text-foreground outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground focus:border-brand/45 focus:shadow-[0_0_0_3px_rgba(227,6,19,0.08)] min-[1800px]:!h-[52px] min-[1800px]:!rounded-[10px] min-[1800px]:!px-5 min-[1800px]:!text-[15px] min-[2400px]:!h-[58px] min-[2400px]:!rounded-[12px] min-[2400px]:!px-6 min-[2400px]:!text-[17px]",
          className,
        )}
        {...props}
      />
    </>
  );
}
