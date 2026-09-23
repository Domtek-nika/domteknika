"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { createAventorLiquidRenderer } from "./aventor-liquid-renderer";
import { AVENTOR_FLOW_COLUMNS, AVENTOR_FLOW_SAMPLES } from "./aventor-liquid-motion";
import styles from "./home-positioning-section.module.css";

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
    const renderer = createAventorLiquidRenderer(canvas, image);
    if (!renderer) return;
    // Keep the existing ambient glass motion without any pointer-driven field.
    const neutralFlow = new Uint8Array(AVENTOR_FLOW_COLUMNS * AVENTOR_FLOW_SAMPLES * 4);
    for (let index = 0; index < neutralFlow.length; index += 4) {
      neutralFlow[index] = 128;
      neutralFlow[index + 2] = 128;
    }

    let inView = false;
    let frame = 0;
    let previousTime = 0;
    let elapsed = 0;

    const animate = (time: number) => {
      const delta = Math.max(0, time - previousTime);
      previousTime = time;
      elapsed += delta / 1000;
      renderer.render(neutralFlow, elapsed);
      canvas.style.opacity = "1";
      frame = requestAnimationFrame(animate);
    };
    const start = () => {
      if (!frame && inView && !document.hidden && !motionPreference.matches) {
        previousTime = performance.now();
        frame = requestAnimationFrame(animate);
      }
    };
    const updatePlayback = () => {
      if (inView && !document.hidden && !motionPreference.matches) start();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
        canvas.style.opacity = "0";
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updatePlayback();
    }, { threshold: 0.1 });
    observer.observe(visual);
    const resizeObserver = new ResizeObserver(start);
    resizeObserver.observe(visual);
    motionPreference.addEventListener("change", updatePlayback);
    document.addEventListener("visibilitychange", updatePlayback);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      renderer.dispose();
      motionPreference.removeEventListener("change", updatePlayback);
      document.removeEventListener("visibilitychange", updatePlayback);
    };
  }, [imageSource]);

  return (
    <div ref={visualRef} className={styles.visual}>
      <Image
        ref={imageRef}
        src="/assets/breakthrough/aventor-transonic-keyframe-v2-logo-corrected.png"
        alt={alt}
        width={1671}
        height={941}
        quality={100}
        loading="eager"
        sizes="(min-width: 1800px) 855px, (min-width: 1024px) 60vw, (min-width: 640px) 880px, 100vw"
        className={styles.still}
        draggable={false}
        onLoad={(event) => setImageSource(event.currentTarget.currentSrc)}
      />
      <canvas ref={canvasRef} className={styles.wave} style={{ opacity: 0 }}
        aria-hidden="true" data-aventor-wave />
    </div>
  );
}
