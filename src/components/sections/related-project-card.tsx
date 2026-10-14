import Image from "next/image";

import type { ProjectLink } from "@/data/project-types";
import { Link } from "@/i18n/navigation";
import { getProjectCardImageFitClass } from "@/lib/project-card-image";
import {
  RELATED_CARD_EMBEDDED_OUTLINE_CLASS,
  RELATED_CARD_MOTION_CLASS,
} from "@/lib/related-card-motion";
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
        "group/relatedProject grid min-w-0 overflow-hidden bg-white text-left sm:grid-cols-[168px_minmax(0,1fr)]",
        RELATED_CARD_MOTION_CLASS,
        embedded && RELATED_CARD_EMBEDDED_OUTLINE_CLASS,
        embedded
          ? "border-0 last:rounded-b-[7px] last:after:rounded-b-[7px]"
          : "rounded-[8px] border border-border",
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
            "transition-transform duration-700 group-hover/relatedProject:scale-105 motion-reduce:transition-none motion-reduce:group-hover/relatedProject:scale-100 [transition-timing-function:var(--ease-smooth)]",
            getProjectCardImageFitClass(project.id),
            project.id !== "velum-sky-screen" && "p-2",
          )}
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent" />
      </span>

      <span className="flex min-w-0 flex-col p-4 sm:p-5">
        <span className="uppercase text-brand text-[10px] font-extrabold tracking-wide">
          {project.category}
        </span>
        <strong className="mt-2 text-foreground text-[18px] font-extrabold leading-tight">
          {project.title}
        </strong>
        <span className="mt-2 line-clamp-3 text-muted-foreground text-[12px] font-medium leading-[1.5]">
          {project.description}
        </span>

        {project.tags.length ? (
          <span className="mt-4 flex flex-wrap gap-1.5" aria-hidden>
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground text-[9px] font-bold"
              >
                {tag}
              </span>
            ))}
          </span>
        ) : null}

      </span>
    </Link>
  );
}
