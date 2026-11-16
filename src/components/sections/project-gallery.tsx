"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export function ProjectGallery({
  images,
  imageAlt,
  label,
  previousLabel,
  nextLabel,
}: {
  images: string[];
  imageAlt: string;
  label: string;
  previousLabel: string;
  nextLabel: string;
}) {
  const [viewportRef, carousel] = useEmblaCarousel({ loop: true });
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const hasMultiple = images.length > 1;

  useEffect(() => {
    if (!carousel) return;

    const onSelect = () => {
      const index = carousel.selectedScrollSnap();
      setActiveIndex(index);

      const track = thumbnailsRef.current;
      const thumbnail = track?.children[index] as HTMLElement | undefined;
      if (track && thumbnail) {
        track.scrollTo({
          left: thumbnail.offsetLeft - (track.clientWidth - thumbnail.offsetWidth) / 2,
        });
      }
    };

    carousel.on("select", onSelect);
    carousel.on("reInit", onSelect);
    return () => {
      carousel.off("select", onSelect);
      carousel.off("reInit", onSelect);
    };
  }, [carousel]);

  return (
    <div
      role="region"
      aria-roledescription={hasMultiple ? "carousel" : undefined}
      aria-label={label}
      className="min-w-0"
      onKeyDown={(event) => {
        if (!hasMultiple) return;
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          carousel?.scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          carousel?.scrollNext();
        }
      }}
    >
      <div className="relative overflow-hidden rounded-[10px] border border-border bg-muted shadow-[0_20px_56px_rgba(0,0,0,0.08)]">
        <div ref={viewportRef} className="overflow-hidden">
          <div className="flex touch-pan-y touch-pinch-zoom">
            {images.map((image, index) => (
              <div
                key={image}
                role="group"
                aria-label={`${index + 1} / ${images.length}`}
                className="relative aspect-[4/3] min-w-0 shrink-0 basis-full"
              >
                <Image
                  src={image}
                  alt={image === images[0] ? imageAlt : `${label} — ${index + 1}`}
                  fill
                  draggable={false}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="object-contain p-5 md:p-8"
                />
              </div>
            ))}
          </div>
        </div>

        {hasMultiple ? (
          <>
            <button
              type="button"
              aria-label={previousLabel}
              onClick={() => carousel?.scrollPrev()}
              className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-white/95 text-foreground shadow-sm transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              aria-label={nextLabel}
              onClick={() => carousel?.scrollNext()}
              className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-white/95 text-foreground shadow-sm transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
            <p aria-live="polite" aria-atomic="true" className="absolute bottom-3 right-3 rounded-full bg-white/95 px-3 py-1 text-[12px] font-bold text-foreground shadow-sm">
              <span className="sr-only">{label} </span>
              {activeIndex + 1} / {images.length}
            </p>
          </>
        ) : null}
      </div>

      {hasMultiple ? (
        <div
          ref={thumbnailsRef}
          data-lenis-prevent
          className="relative mt-3 flex touch-pan-x gap-2 overflow-x-auto overscroll-x-contain p-1"
        >
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              aria-label={`${label} ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              onClick={() => carousel?.scrollTo(index)}
              className={cn(
                "relative h-[60px] w-[84px] shrink-0 overflow-hidden rounded-[7px] border-2 bg-muted transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:h-[68px] sm:w-[96px]",
                activeIndex === index ? "border-brand" : "border-border hover:border-brand/50",
              )}
            >
              <Image src={image} alt="" fill loading="lazy" sizes="96px" className="object-contain p-1" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
