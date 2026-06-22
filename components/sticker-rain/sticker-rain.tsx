"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import {
  createInitialRainStickers,
  createRainSticker,
  pickRandomSource,
  type RainSticker,
} from "@/lib/stickers/rain-config";
import styles from "./sticker-rain.module.css";

export function StickerRain() {
  const [isRainEnabled, setIsRainEnabled] = useState(true);
  const [rainStickers, setRainStickers] = useState<RainSticker[]>([]);

  useEffect(() => {
    setRainStickers(createInitialRainStickers());
  }, []);

  const handleStickerCycle = (stickerId: number) => {
    setRainStickers((prev) => {
      const usedSources = new Set(
        prev.filter((item) => item.id !== stickerId).map((item) => item.src),
      );
      const nextSource = pickRandomSource(usedSources);
      return prev.map((item) =>
        item.id === stickerId
          ? {
              ...item,
              src: nextSource,
              opacity: 0.15 + Math.random() * 0.18,
            }
          : item,
      );
    });
  };

  return (
    <>
      {isRainEnabled && (
        <div className={styles.rainLayer} aria-hidden>
          {rainStickers.map((sticker) => (
            <img
              key={sticker.id}
              src={sticker.src}
              alt=""
              className={styles.rainSticker}
              onAnimationIteration={() => handleStickerCycle(sticker.id)}
              style={
                {
                  left: `${sticker.left}%`,
                  width: `${sticker.size}px`,
                  animationDuration: `${sticker.duration}s`,
                  animationDelay: `-${sticker.delay}s`,
                  "--drift-x": `${sticker.drift}px`,
                  "--spin": `${sticker.rotate}deg`,
                  opacity: sticker.opacity,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsRainEnabled((prev) => !prev)}
        className={styles.rainToggle}
        aria-pressed={isRainEnabled}
      >
        {isRainEnabled ? "스티커 비 끄기" : "스티커 비 켜기"}
      </button>
    </>
  );
}
