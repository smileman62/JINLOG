"use client";

import Image from "next/image";
import { useState } from "react";

export function ProfilePhoto() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="flex h-full w-full items-center justify-center text-lg font-semibold text-zinc-500 dark:text-zinc-400">
        김
      </span>
    );
  }

  return (
    <Image
      src="/images/profile.jpg"
      alt="김진성 프로필"
      fill
      className="object-cover"
      sizes="128px"
      priority
      onError={() => setFailed(true)}
    />
  );
}
