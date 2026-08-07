import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import type { ProjectLink } from "@/data/project-types";
import { Link } from "@/i18n/navigation";
import { getProjectCardImageFitClass } from "@/lib/project-card-image";
import { cn } from "@/lib/utils";

export function RelatedProjectCard({
  actionLabel,
  eager = false,
  embedded = false,
  project,
}: {
  actionLabel: string;
  eager?: boolean;
  embedded?: boolean;
  project: ProjectLink;
}) {
  return (
    <Link
      href={`/projects/${project.id}`}
      aria-label={`${actionLabel}: ${project.title}`}
      className={cn(
        "group/relatedProject grid min-w-0 overflow-hidden bg-white text-left transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:bg-muted/35 hover:shadow-[0_14px_34px_rgba(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 sm:grid-cols-[168px_minmax(0,1fr)]",
        embedded ? "border-0" : "rounded-[8px] border border-border",
      )}
    >
      <span className="relative block min-h-[150px] overflow-hidden bg-muted sm:min-h-full">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          sizes="(max-width: 640px) 100vw, 168px"
          className={cn(
            "transition-transform duration-500 group-hover/relatedProject:scale-[1.035]",
            getProjectCardImageFitClass(project.id),
            project.id !== "velum-sky-screen" && "p-2",
          )}
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent" />
      </span>

      <span className="flex min-w-0 flex-col p-4 sm:p-5">
        <span className="text-[10px] font-extrabold uppercase tracking-wide text-brand">
          {project.category}
        </span>
        <strong className="mt-2 text-[18px] font-extrabold leading-tight text-foreground transition-colors group-hover/relatedProject:text-brand">
          {project.title}
        </strong>
        <span className="mt-2 line-clamp-3 text-[12px] font-medium leading-[1.5] text-muted-foreground">
          {project.description}
        </span>

        {project.tags.length ? (
          <span className="mt-4 flex flex-wrap gap-1.5" aria-hidden>
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2.5 py-1 text-[9px] font-bold text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </span>
        ) : null}

        <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-extrabold text-foreground">
          {actionLabel}
          <ArrowUpRight
            className="size-3.5 text-brand transition-transform duration-300 group-hover/relatedProject:-translate-y-0.5 group-hover/relatedProject:translate-x-0.5"
            aria-hidden
          />
        </span>
      </span>
    </Link>
  );
}
