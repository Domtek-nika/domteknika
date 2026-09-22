"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { createAventorLiquidRenderer } from "./aventor-liquid-renderer";
import { createAventorLiquidMotion } from "./aventor-liquid-motion";
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
    const mousePreference = window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)");
    const motion = createAventorLiquidMotion();
    const renderer = createAventorLiquidRenderer(canvas, image, motion.samples);
    if (!renderer) return;

    let inView = false;
    let frame = 0;
    let previousTime = 0;
    let elapsed = 0;

    const animate = (time: number) => {
      const delta = time - previousTime;
      previousTime = time;
      elapsed += delta / 1000;
      renderer.render(motion.step(Math.min(delta, 64)), elapsed);
      canvas.style.opacity = "1";
      frame = requestAnimationFrame(animate);
    };
    const start = () => {
      if (!frame && inView && !document.hidden && !motionPreference.matches) {
        previousTime = performance.now();
        frame = requestAnimationFrame(animate);
      }
    };
    const resetPointer = () => { motion.leave(); };
    const movePointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !mousePreference.matches || motionPreference.matches) return;
      const bounds = visual.getBoundingClientRect();
      motion.move(
        (event.clientX - bounds.left) / bounds.width * 1671,
        (event.clientY - bounds.top) / bounds.height * 941,
        1671 / bounds.width,
      );
    };
    const updateMouseMode = () => {
      motion.reset();
      canvas.dataset.interaction = mousePreference.matches ? "mouse" : "none";
    };
    updateMouseMode();
    const updatePlayback = () => {
      if (inView && !document.hidden && !motionPreference.matches) start();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
        motion.reset();
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
    visual.addEventListener("pointerenter", movePointer);
    visual.addEventListener("pointermove", movePointer);
    visual.addEventListener("pointerleave", resetPointer);
    visual.addEventListener("pointercancel", resetPointer);
    motionPreference.addEventListener("change", updatePlayback);
    mousePreference.addEventListener("change", updateMouseMode);
    document.addEventListener("visibilitychange", updatePlayback);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      renderer.dispose();
      visual.removeEventListener("pointerenter", movePointer);
      visual.removeEventListener("pointermove", movePointer);
      visual.removeEventListener("pointerleave", resetPointer);
      visual.removeEventListener("pointercancel", resetPointer);
      motionPreference.removeEventListener("change", updatePlayback);
      mousePreference.removeEventListener("change", updateMouseMode);
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
