"use client";

import { useEffect, useRef, useState } from "react";
import spotlight from "./name-spotlight.module.css";

const SPOTLIGHT_RADIUS = 72;

type NameSpotlightProps = {
  children: React.ReactNode;
  className?: string;
};

export function NameSpotlight({ children, className }: NameSpotlightProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const updateFromPointer = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      const nearText =
        clientX >= rect.left - SPOTLIGHT_RADIUS &&
        clientX <= rect.right + SPOTLIGHT_RADIUS &&
        clientY >= rect.top - SPOTLIGHT_RADIUS &&
        clientY <= rect.bottom + SPOTLIGHT_RADIUS;

      if (!nearText) {
        setActive(false);
        el.style.setProperty("--mx", "-999px");
        el.style.setProperty("--my", "-999px");
        return;
      }

      setActive(true);
      el.style.setProperty("--mx", `${clientX - rect.left}px`);
      el.style.setProperty("--my", `${clientY - rect.top}px`);
    };

    const onPointerMove = (event: PointerEvent) => {
      updateFromPointer(event.clientX, event.clientY);
    };

    const onPointerLeave = () => {
      setActive(false);
      el.style.setProperty("--mx", "-999px");
      el.style.setProperty("--my", "-999px");
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <span
      ref={wrapRef}
      className={`${spotlight.nameSpotlight} ${active ? spotlight.isActive : ""} ${className ?? ""}`}
    >
      <span className={spotlight.base}>{children}</span>
      <span className={spotlight.reveal} aria-hidden>
        {children}
      </span>
    </span>
  );
}
