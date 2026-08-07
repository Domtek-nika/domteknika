"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import type { ProjectCardSummary } from "@/data/project-types";

const DynamicProjectsSection = dynamic(
  () => import("@/components/sections/projects-section").then((module) => module.ProjectsSection),
  { ssr: false },
);

export function DeferredProjectsSection({ projects }: { projects: ProjectCardSummary[] }) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad || !sectionRef.current) return;
    if (!("IntersectionObserver" in window)) {
      const timer = globalThis.setTimeout(() => setShouldLoad(true), 0);
      return () => globalThis.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={sectionRef}>
      {shouldLoad ? (
        <DynamicProjectsSection projects={projects} />
      ) : (
        <div className="min-h-[470px] bg-background md:min-h-[610px]" aria-hidden />
      )}
    </div>
  );
}
