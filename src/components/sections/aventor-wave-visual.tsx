"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import aventorImage from "@/assets/breakthrough/aventor-transonic-keyframe-v2-logo-corrected-q98.webp";

import type { createAventorLiquidRenderer } from "./aventor-liquid-renderer";
import styles from "./home-positioning-section.module.css";

const FRAME_INTERVAL = 1000 / 30;

export function AventorWaveVisual({ alt }: { alt: string }) {
  const visualRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageSource, setImageSource] = useState("");

  useEffect(() => {
    const visual = visualRef.current;
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!image || !image.complete || !image.naturalWidth || !visual || !canvas) return;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let renderer: ReturnType<typeof createAventorLiquidRenderer> = null;
    let disposed = false;
    let preparing = false;
    let unavailable = false;
    let inView = false;
    let frame = 0;
    let previousTime = 0;
    let previousRenderTime = 0;
    let slowFrames = 0;
    let elapsed = 0;

    const canAnimate = () =>
      !disposed && !unavailable && inView && !document.hidden && !motionPreference.matches;

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      canvas.style.opacity = "0";
    };

    const showStillImage = () => {
      unavailable = true;
      stop();
      renderer?.dispose();
      renderer = null;
    };

    const animate = (time: number) => {
      frame = 0;
      if (!canAnimate() || !renderer) return;

      const delta = Math.max(0, time - previousTime);
      previousTime = time;
      elapsed += delta / 1000;

      const sinceRender = time - previousRenderTime;
      if (sinceRender >= FRAME_INTERVAL - 1) {
        const started = performance.now();
        try {
          renderer.render(elapsed);
        } catch {
          showStillImage();
          return;
        }

        const renderDuration = performance.now() - started;
        const slow = renderDuration > 50 || (previousRenderTime > 0 && sinceRender > 120);
        slowFrames = slow ? slowFrames + 1 : 0;
        previousRenderTime = time;
        canvas.style.opacity = "1";

        // Keep the normal animation on capable devices. Under sustained load,
        // reduce the GPU work before falling back to the identical still image.
        if (slowFrames >= 3) {
          if (!renderer.reduceResolution()) {
            showStillImage();
            return;
          }
          canvas.style.opacity = "0";
          slowFrames = 0;
        }
      }

      frame = requestAnimationFrame(animate);
    };

    const start = async () => {
      if (frame || preparing || !canAnimate()) return;

      if (!renderer) {
        preparing = true;
        try {
          const { createAventorLiquidRenderer } = await import("./aventor-liquid-renderer");
          if (!canAnimate()) return;
          renderer = createAventorLiquidRenderer(canvas, image);
          if (!renderer) {
            showStillImage();
            return;
          }
        } catch {
          showStillImage();
          return;
        } finally {
          preparing = false;
        }
      }

      if (!canAnimate()) return;
      previousTime = performance.now();
      previousRenderTime = 0;
      slowFrames = 0;
      frame = requestAnimationFrame(animate);
    };

    const updatePlayback = () => {
      if (canAnimate()) void start();
      else stop();
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updatePlayback();
    }, { threshold: 0.1 });
    observer.observe(visual);

    const resizeObserver = new ResizeObserver(() => {
      if (renderer?.resize()) canvas.style.opacity = "0";
      updatePlayback();
    });
    resizeObserver.observe(visual);

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      showStillImage();
    };

    canvas.addEventListener("webglcontextlost", handleContextLost);
    motionPreference.addEventListener("change", updatePlayback);
    document.addEventListener("visibilitychange", updatePlayback);

    return () => {
      disposed = true;
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      renderer?.dispose();
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      motionPreference.removeEventListener("change", updatePlayback);
      document.removeEventListener("visibilitychange", updatePlayback);
    };
  }, [imageSource]);

  return (
    <div ref={visualRef} className={styles.visual}>
      <Image
        ref={imageRef}
        src={aventorImage}
        alt={alt}
        quality={90}
        loading="lazy"
        sizes="(min-width: 2400px) 1100px, (min-width: 1800px) 880px, (min-width: 1460px) 818px, (min-width: 1280px) calc(63vw - 104px), (min-width: 1024px) calc(63vw - 93px), (min-width: 960px) 880px, (min-width: 640px) calc(100vw - 80px), calc(100vw - 24px)"
        className={styles.still}
        draggable={false}
        onLoad={(event) => setImageSource(event.currentTarget.currentSrc)}
      />
      <canvas ref={canvasRef} className={styles.wave} style={{ opacity: 0 }}
        aria-hidden="true" data-aventor-wave />
    </div>
  );
}
