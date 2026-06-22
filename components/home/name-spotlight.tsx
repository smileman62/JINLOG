"use client";

import { useRef, useState } from "react";
import spotlight from "./name-spotlight.module.css";

type NameSpotlightProps = {
  children: React.ReactNode;
  className?: string;
};

export function NameSpotlight({ children, className }: NameSpotlightProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);

  const updatePointer = (clientX: number, clientY: number) => {
    const el = wrapRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${clientX - rect.left}px`);
    el.style.setProperty("--my", `${clientY - rect.top}px`);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    setActive(true);
    updatePointer(event.clientX, event.clientY);
  };

  const handlePointerLeave = () => {
    setActive(false);
    wrapRef.current?.style.setProperty("--mx", "-999px");
    wrapRef.current?.style.setProperty("--my", "-999px");
  };

  return (
    <span
      ref={wrapRef}
      className={`${spotlight.nameSpotlight} ${active ? spotlight.isActive : ""} ${className ?? ""}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <span className={spotlight.base}>{children}</span>
      <span className={spotlight.reveal} aria-hidden>
        {children}
      </span>
    </span>
  );
}
