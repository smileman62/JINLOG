"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { playHeroClickSound } from "@/lib/home/click-sound";
import { PHOTO_REVEAL_RADIUS, heroCursorPhotos } from "@/lib/home/cursor-photos";
import styles from "./hero-cursor-photos.module.css";

export function HeroCursorPhotos() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const triggerPop = useCallback((element: HTMLDivElement) => {
    const inner = element.firstElementChild;
    if (!(inner instanceof HTMLElement)) return;

    inner.classList.remove(styles.popActive);
    void inner.offsetWidth;
    inner.classList.add(styles.popActive);
  }, []);

  const handlePhotoPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>, index: number) => {
      if (event.button !== 0) return;

      const element = itemRefs.current[index];
      if (!element) return;

      const opacity = Number.parseFloat(element.style.opacity || "0");
      if (opacity < 0.2) return;

      event.stopPropagation();

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      playHeroClickSound();
      triggerPop(element);
    },
    [triggerPop],
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    let frameId = 0;
    let cursorX = -9999;
    let cursorY = -9999;

    const updateItems = () => {
      itemRefs.current.forEach((el, index) => {
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.hypot(cursorX - centerX, cursorY - centerY);
        const reveal = Math.max(0, Math.min(1, (PHOTO_REVEAL_RADIUS - distance) / PHOTO_REVEAL_RADIUS));
        const rotate = heroCursorPhotos[index]?.rotate ?? 0;

        el.style.opacity = String(reveal * 0.96);
        el.style.transform = `rotate(${rotate}deg) scale(${0.78 + reveal * 0.22})`;
        el.style.pointerEvents = reveal > 0.18 ? "auto" : "none";
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      cursorX = event.clientX;
      cursorY = event.clientY;

      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateItems);
    };

    const onPointerLeave = () => {
      cursorX = -9999;
      cursorY = -9999;
      updateItems();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className={styles.field}>
      {heroCursorPhotos.map((photo, index) => (
        <div
          key={photo.src}
          ref={(element) => {
            itemRefs.current[index] = element;
          }}
          className={styles.item}
          style={{
            left: photo.left,
            top: photo.top,
            width: photo.size,
          }}
          onPointerDown={(event) => handlePhotoPointerDown(event, index)}
        >
          <div className={styles.popInner}>
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.size}
              height={photo.size}
              className={styles.image}
              draggable={false}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
