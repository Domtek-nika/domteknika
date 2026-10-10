"use client";

import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import CardSwapModule, { Card as CardModule } from "@/components/CardSwap";

type CardSwapProps = {
  width?: number;
  height?: number;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  manualSwapSignal?: number;
  skewAmount?: number;
  easing?: "elastic" | string;
  children: ReactNode;
};

type CardProps = {
  customClass?: string;
  className?: string;
  children?: ReactNode;
};

const CardSwap = CardSwapModule as ComponentType<CardSwapProps>;
const Card = CardModule as ComponentType<CardProps>;

const DEFAULT_SWAP_SIZE = {
  width: 460,
  height: 360,
  cardDistance: 64,
  verticalDistance: 46,
};

const BRAINSTORMING_CARDS = [
  {
    image:
      "/assets/expertise-page/brainstorming/softcar-locks/softcar-lock-brainstorming-01-landscape.jpg",
    titleKey: "doorRod",
  },
  {
    image:
      "/assets/expertise-page/brainstorming/softcar-locks/softcar-lock-brainstorming-02.jpg",
    titleKey: "springLock",
  },
  {
    image:
      "/assets/expertise-page/brainstorming/softcar-locks/softcar-lock-brainstorming-03.jpg",
    titleKey: "magneticLock",
  },
  {
    image:
      "/assets/expertise-page/brainstorming/softcar-locks/softcar-lock-brainstorming-04-landscape.jpg",
    titleKey: "threePointAttachment",
  },
  {
    image:
      "/assets/expertise-page/brainstorming/softcar-locks/softcar-lock-brainstorming-05-landscape.jpg",
    titleKey: "flexibleLatch",
  },
  {
    image:
      "/assets/expertise-page/brainstorming/softcar-locks/softcar-lock-brainstorming-06-landscape.jpg",
    titleKey: "mechanicalUnlock",
  },
  {
    image:
      "/assets/expertise-page/brainstorming/softcar-locks/softcar-lock-brainstorming-07-landscape.jpg",
    titleKey: "rotation90",
  },
  {
    image:
      "/assets/expertise-page/brainstorming/softcar-locks/softcar-lock-brainstorming-08.jpg",
    titleKey: "mechanicalAdhesion",
  },
] as const;

export function BrainstormingCardSwap() {
  const t = useTranslations("ExpertisePage.Services.brainstorming.cards");
  const interfaceT = useTranslations("Interface");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [manualSwapSignal, setManualSwapSignal] = useState(0);
  const [swapSize, setSwapSize] = useState(DEFAULT_SWAP_SIZE);
  const triggerSwap = () => setManualSwapSignal((signal) => signal + 1);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;

    const updateSize = () => {
      const availableWidth = node.getBoundingClientRect().width;
      const widthRatio =
        availableWidth < 480 ? 0.84 : availableWidth < 900 ? 0.76 : 0.72;
      const minWidth = availableWidth < 340 ? 250 : 286;
      const width = Math.round(
        Math.min(460, Math.max(minWidth, availableWidth * widthRatio)),
      );
      const height = Math.round(width * (availableWidth < 480 ? 0.84 : 0.78));
      const cardDistance = Math.round(
        width * (availableWidth < 480 ? 0.055 : 0.14),
      );
      const verticalDistance = Math.round(
        width * (availableWidth < 480 ? 0.06 : 0.1),
      );

      setSwapSize((current) => {
        if (
          current.width === width &&
          current.height === height &&
          current.cardDistance === cardDistance &&
          current.verticalDistance === verticalDistance
        ) {
          return current;
        }

        return { width, height, cardDistance, verticalDistance };
      });
    };

    updateSize();

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(updateSize);
      observer.observe(node);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="domtek-card-swap relative h-[440px] w-full min-w-0 cursor-pointer overflow-hidden bg-transparent sm:h-[500px] lg:h-[560px]"
      style={{
        height: `clamp(356px, ${swapSize.height + 144}px, 560px)`,
      }}
      role="button"
      tabIndex={0}
      aria-label={interfaceT("nextBrainstormingCard")}
      onPointerDown={triggerSwap}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          triggerSwap();
        }
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12px_12px,rgba(227,6,19,0.08)_1.2px,transparent_1.3px)] bg-[length:28px_28px] opacity-45" />
      <div className="domtek-card-swap-side-fade pointer-events-none absolute inset-y-0 z-20" />
      <div className="domtek-card-swap-side-fade-right pointer-events-none absolute inset-y-0 z-20" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-white to-transparent" />

      <CardSwap
        width={swapSize.width}
        height={swapSize.height}
        cardDistance={swapSize.cardDistance}
        verticalDistance={swapSize.verticalDistance}
        delay={3200}
        manualSwapSignal={manualSwapSignal}
        skewAmount={0}
        easing="elastic"
      >
        {BRAINSTORMING_CARDS.map((item) => {
          const title = t(item.titleKey);

          return (
            <Card
              key={item.image}
              customClass="brainstorming-swap-card overflow-hidden bg-white shadow-[0_18px_44px_rgba(0,0,0,0.11)] ring-1 ring-brand/35"
            >
              <div className="flex size-full flex-col bg-white">
                <div className="border-b border-brand/75 px-4 pb-2 pt-3">
                  <p className="text-[13px] font-extrabold leading-none text-foreground">
                    {title}
                  </p>
                </div>
                <div className="relative min-h-0 flex-1">
                  <Image
                    src={item.image}
                    alt={title}
                    fill
                    loading="lazy"
                    fetchPriority="low"
                    sizes="(max-width: 640px) 320px, (max-width: 1024px) 420px, 460px"
                    className="object-contain"
                    draggable={false}
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </CardSwap>
    </div>
  );
}
