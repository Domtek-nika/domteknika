"use client";

import { ProjectDetailsDialog } from "@/components/sections/projects-page-content";
import { getPreparedProjectsPageCopy } from "@/data/project-page-copy";

// This entire module is loaded on hover or interaction with a home project card.
export function HomeProjectDetailsDialog({
  locale,
  onClosed,
  projectId,
}: {
  locale: string;
  onClosed: () => void;
  projectId: string;
}) {
  const copy = getPreparedProjectsPageCopy(locale);
  const project = copy.projects.find((item) => item.id === projectId);

  if (!project) return null;

  return (
    <ProjectDetailsDialog
      modal={copy.modal}
      onClosed={onClosed}
      project={project}
    />
  );
}
