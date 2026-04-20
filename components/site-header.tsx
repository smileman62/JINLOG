"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";

const nav = [
  { href: "/blog", label: "블로그" },
  { href: "/projects", label: "프로젝트" },
] as const;

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  /** true = 가로로 접힘(중간) → 테마 전환 후 펼침 (backdrop-blur 환경에서도 동작) */
  const [squashed, setSquashed] = useState(false);
  const busyRef = useRef(false);
  const layerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // 테마 아이콘은 클라이언트에서만 결정 (서버/클라 불일치 방지)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 마운트 후에만 표시
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  const handleToggle = useCallback(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setTheme(isDark ? "light" : "dark");
      return;
    }

    if (busyRef.current) return;
    const el = layerRef.current;

    const applyTheme = () => {
      setTheme(isDark ? "light" : "dark");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setSquashed(false);
          busyRef.current = false;
        });
      });
    };

    if (!el) {
      setTheme(isDark ? "light" : "dark");
      return;
    }

    busyRef.current = true;
    setSquashed(true);

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      window.clearTimeout(safety);
      el.removeEventListener("transitionend", onEnd);
      applyTheme();
    };

    const onEnd = (e: TransitionEvent) => {
      if (e.propertyName !== "transform") return;
      finish();
    };

    const safety = window.setTimeout(finish, 400);
    el.addEventListener("transitionend", onEnd);
  }, [isDark, setTheme]);

  if (!mounted) {
    return (
      <span
        className="inline-flex h-9 w-9 shrink-0 rounded-lg border border-zinc-200 bg-transparent dark:border-zinc-700"
        aria-hidden
      />
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-zinc-200 bg-transparent text-foreground transition-[transform] hover:opacity-80 active:scale-95 active:duration-100 dark:border-zinc-700"
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
    >
      <span
        ref={layerRef}
        className="inline-flex h-[18px] w-[18px] origin-center will-change-transform transition-[transform] duration-[240ms] ease-in-out motion-reduce:transition-none motion-reduce:duration-0"
        style={{
          transform: squashed ? "scaleX(0)" : "scaleX(1)",
        }}
      >
        {isDark ? (
          <SunIcon className="h-[18px] w-[18px]" aria-hidden />
        ) : (
          <MoonIcon className="h-[18px] w-[18px]" aria-hidden />
        )}
      </span>
    </button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-background/80 backdrop-blur-md dark:border-zinc-800/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="shrink-0 text-lg font-semibold tracking-tight text-foreground"
          >
            JINLOG
          </Link>
          <nav
            className="flex min-w-0 flex-1 items-center justify-center overflow-x-auto gap-4"
            aria-label="주요 메뉴"
          >
            {nav.map(({ href, label }) => {
              const active =
                pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`whitespace-nowrap rounded-md px-1 py-1 text-sm transition-colors ${
                    active
                      ? "font-bold text-zinc-900 dark:text-zinc-50"
                      : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
