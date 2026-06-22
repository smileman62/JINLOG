"use client";

import { HomeHeroCanvas } from "@/components/home/home-hero-canvas";
import styles from "./home-layout.module.css";

export function HomePageBackground() {
  return (
    <>
      <div className={styles.gridBg} aria-hidden />
      <HomeHeroCanvas className={styles.particleLayer} />
    </>
  );
}
