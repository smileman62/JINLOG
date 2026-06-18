"use client";

import Image from "next/image";
import styles from "./about-avatar.module.css";

export function AboutAvatar() {
  return (
    <div
      className={`relative aspect-3/4 w-full max-w-[200px] shrink-0 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:max-w-[220px] ${styles.avatar}`}
    >
      <Image
        src="/images/profile.png"
        alt="김진성 프로필 사진"
        fill
        priority
        sizes="(max-width: 640px) 200px, 220px"
        className="object-cover object-top"
      />
    </div>
  );
}
