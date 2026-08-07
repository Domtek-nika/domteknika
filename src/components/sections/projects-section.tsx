"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Container } from "@/components/layout/container";
import type { ProjectCardSummary } from "@/data/project-types";
import { Link } from "@/i18n/navigation";
import { getProjectCardImageFitClass } from "@/lib/project-card-image";
import { cn } from "@/lib/utils";

const importProjectDetailsDialog = () =>
  import("@/components/sections/projects-page-content");
let projectDetailsDialogPromise: ReturnType<
  typeof importProjectDetailsDialog
> | null = null;

function loadProjectDetailsDialog() {
  projectDetailsDialogPromise ??= importProjectDetailsDialog();
  return projectDetailsDialogPromise;
}

const DynamicProjectDetailsDialog = dynamic(
  () =>
    loadProjectDetailsDialog().then(
      (module) => module.HomeProjectDetailsDialog,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="fixed inset-0 z-[999] bg-black/10 backdrop-blur-[2px]"
        aria-busy="true"
        aria-live="polite"
      />
    ),
  },
);

export function ProjectsSection({
  projects,
}: {
  projects: ProjectCardSummary[];
}) {
  const t = useTranslations("Projects");
  const locale = useLocale();
  const [api, setApi] = useState<CarouselApi>();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );
  const carouselProjects = useMemo(
    () => [...projects, ...projects],
    [projects],
  );
  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: 3000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    [],
  );
  const closeProject = useCallback(() => setSelectedProjectId(null), []);

  return (
    <section
      id="projects"
      className="relative overflow-hidden scroll-mt-24 bg-background pb-10 pt-10 md:pb-[104px] md:pt-20 min-[1800px]:pb-[120px] min-[1800px]:pt-24 min-[2300px]:!pb-[120px] min-[2300px]:!pt-24"
      aria-labelledby="projects-title"
    >
      <Container
        size="wide"
        className="xl:max-w-[1280px] min-[1800px]:!max-w-[1780px] min-[2300px]:!max-w-[2100px]"
      >
        <div className="relative">
          <div className="mb-5 flex flex-col items-start gap-3 md:mb-[38px] md:gap-4 lg:flex-row lg:items-center lg:justify-between min-[1800px]:mb-[50px] min-[2300px]:!mb-[50px]">
            <h2
              id="projects-title"
              className="text-[20px] font-extrabold leading-none text-foreground min-[1800px]:text-[32px] min-[2300px]:!text-[34px]"
            >
              {t("title")}
            </h2>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-[13px] font-extrabold text-foreground transition-colors hover:text-brand sm:gap-6 sm:text-[15px] min-[1800px]:text-[19px] min-[2300px]:!text-[20px]"
            >
              {t("viewAll")}
              <ArrowRight className="size-5 text-brand" aria-hidden />
            </Link>
          </div>

          <div
            data-projects-carousel
            className="relative -mx-7 overflow-hidden pb-14 sm:-mx-10 lg:-mx-14 lg:px-14 xl:-mx-20 xl:px-20 min-[1800px]:pb-[80px] min-[2300px]:!pb-[82px]"
          >
            <Carousel
              setApi={setApi}
              opts={{
                align: "center",
                loop: true,
                dragFree: false,
              }}
              plugins={[autoplay]}
              className="w-full touch-pan-y"
              style={{
                maskImage:
                  "linear-gradient(90deg, transparent 0%, black min(14vw, 170px), black calc(100% - min(14vw, 170px)), transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent 0%, black min(14vw, 170px), black calc(100% - min(14vw, 170px)), transparent 100%)",
              }}
              onFocus={() => autoplay.stop()}
              onBlur={() => autoplay.reset()}
            >
              <CarouselContent className="-ml-4">
                {carouselProjects.map((project, index) => (
                  <CarouselItem
                    key={`${project.id}-${index}`}
                    className="basis-[min(340px,82vw)] pl-4 md:basis-[274px] min-[1800px]:!basis-[470px] min-[2300px]:!basis-[490px]"
                  >
                    <ProjectCard
                      onOpen={() => setSelectedProjectId(project.id)}
                      project={project}
                      tag={
                        project.tags[1] ?? project.tags[0] ?? project.category
                      }
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <ProjectArrow
              label={t("previous")}
              className="left-[calc(50%-58px)]"
              disabled={!api}
              onClick={() => api?.scrollPrev()}
            >
              <ChevronLeft className="size-8" aria-hidden />
            </ProjectArrow>
            <ProjectArrow
              label={t("next")}
              className="right-[calc(50%-58px)]"
              disabled={!api}
              onClick={() => api?.scrollNext()}
            >
              <ChevronRight className="size-8" aria-hidden />
            </ProjectArrow>
          </div>
        </div>
      </Container>

      {selectedProjectId ? (
        <DynamicProjectDetailsDialog
          locale={locale}
          onClosed={closeProject}
          projectId={selectedProjectId}
        />
      ) : null}
    </section>
  );
}

function ProjectCard({
  onOpen,
  project,
  tag,
}: {
  onOpen: () => void;
  project: ProjectCardSummary;
  tag: string;
}) {
  return (
    <button
      type="button"
      className="group block h-[334px] w-full overflow-hidden rounded-[7px] border border-border bg-white text-left outline-none transition-shadow duration-300 hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)] focus-visible:ring-2 focus-visible:ring-brand/30 min-[1800px]:h-[500px] min-[2300px]:!h-[510px]"
      aria-label={project.title}
      aria-haspopup="dialog"
      onClick={onOpen}
      onFocus={() => void loadProjectDetailsDialog()}
      onPointerEnter={() => void loadProjectDetailsDialog()}
    >
      <article className="h-full">
        <div className="relative h-[148px] bg-muted min-[1800px]:h-[230px] min-[2300px]:!h-[235px]">
          <Image
            src={project.image}
            alt=""
            fill
            loading="lazy"
            decoding="async"
            sizes="(min-width: 2300px) 490px, (min-width: 1800px) 470px, 274px"
            className={cn(
              "transition-transform duration-500 ease-smooth group-hover:scale-[1.035]",
              getProjectCardImageFitClass(project.id),
              project.id !== "velum-sky-screen" &&
                "p-4 min-[1800px]:p-7 min-[2300px]:!p-7",
            )}
          />
        </div>
        <div className="flex h-[186px] flex-col px-4 pb-4 pt-4 min-[1800px]:h-[270px] min-[1800px]:px-7 min-[1800px]:pb-7 min-[1800px]:pt-7 min-[2300px]:!h-[275px] min-[2300px]:!px-8 min-[2300px]:!pb-7 min-[2300px]:!pt-7">
          <h3 className="text-[14px] font-extrabold leading-tight text-foreground min-[1800px]:text-[21px] min-[2300px]:!text-[22px]">
            {project.title}
          </h3>
          <p className="mt-2 text-[12.5px] font-medium leading-[1.24] text-muted-foreground min-[1800px]:mt-4 min-[1800px]:text-[16px] min-[1800px]:leading-[1.34] min-[2300px]:!mt-4 min-[2300px]:!text-[16px]">
            {project.description}
          </p>
          <p className="mt-auto text-[12px] font-extrabold leading-none text-brand min-[1800px]:text-[16px] min-[2300px]:!text-[16px]">
            {tag}
          </p>
        </div>
      </article>
    </button>
  );
}

function ProjectArrow({
  children,
  label,
  className,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "absolute bottom-0 z-50 grid size-11 place-items-center rounded-[4px] text-brand transition-[background-color,transform] hover:scale-110 hover:bg-brand/5 disabled:pointer-events-none disabled:opacity-40 md:size-12 min-[1800px]:size-14",
        className,
      )}
    >
      {children}
    </button>
  );
}
