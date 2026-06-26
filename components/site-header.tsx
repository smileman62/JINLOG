"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@wrksz/themes/client";
import { useCallback, useEffect, useRef, useState } from "react";

const nav = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
] as const;

function isNavActive(pathname: string, href: string) {
  if (href === "/blog") {
    return pathname === "/blog" || pathname.startsWith("/blog/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function navLinkClass(active: boolean) {
  return active
    ? "font-medium text-[#0f0f0f] dark:text-zinc-50"
    : "text-[#888] hover:text-[#0f0f0f] dark:text-zinc-500 dark:hover:text-zinc-100";
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [squashed, setSquashed] = useState(false);
  const busyRef = useRef(false);
  const layerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
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
        className="inline-flex h-8 w-8 shrink-0 rounded-full border border-[#e8e8e8] dark:border-zinc-700"
        aria-hidden
      />
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#e8e8e8] text-[#888] transition-colors hover:border-[#0f0f0f] hover:text-[#0f0f0f] dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-300 dark:hover:text-zinc-100"
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
    >
      <span
        ref={layerRef}
        className="inline-flex h-[16px] w-[16px] origin-center will-change-transform transition-[transform] duration-[240ms] ease-in-out motion-reduce:transition-none motion-reduce:duration-0"
        style={{
          transform: squashed ? "scaleX(0)" : "scaleX(1)",
        }}
      >
        {isDark ? (
          <SunIcon className="h-[16px] w-[16px]" aria-hidden />
        ) : (
          <MoonIcon className="h-[16px] w-[16px]" aria-hidden />
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
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md dark:bg-background/80">
      <div className="mx-auto flex max-w-[104rem] items-center justify-between gap-4 px-4 py-3 sm:px-8 lg:px-16 lg:py-4">
        <Link
          href="/"
          className={`font-[family-name:var(--font-syne)] text-[0.9rem] font-extrabold tracking-[-0.01em] transition-colors ${
            isHome
              ? "text-[#0f0f0f] dark:text-zinc-50"
              : "text-[#888] hover:text-[#0f0f0f] dark:text-zinc-500 dark:hover:text-zinc-100"
          }`}
        >
          JS.
        </Link>

        <div className="flex items-center gap-8 sm:gap-12">
          <nav className="flex items-center gap-5 sm:gap-10" aria-label="주요 메뉴">
            {nav.map(({ href, label }) => {
              const active = isNavActive(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`font-[family-name:var(--font-space-mono)] text-[0.68rem] tracking-[0.14em] uppercase transition-colors ${navLinkClass(active)}`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
