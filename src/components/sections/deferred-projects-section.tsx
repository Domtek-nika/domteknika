"use client";

import dynamic from "next/dynamic";

import type { ProjectCardSummary } from "@/data/project-types";

const DynamicProjectsSection = dynamic(
  () => import("@/components/sections/projects-section").then((module) => module.ProjectsSection),
);

export function DeferredProjectsSection({ projects }: { projects: ProjectCardSummary[] }) {
  // Keep the project links in the server HTML. Images remain lazy-loaded and
  // the larger project dialog is imported only when the visitor needs it.
  return (
    <div>
      <DynamicProjectsSection projects={projects} />
    </div>
  );
}
