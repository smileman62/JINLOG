"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Project } from "@/lib/projects/data";

type ProjectCarouselProps = {
  projects: Project[];
};

const INTERVAL_MS = 3500;

function ChevronLeftIcon({ className }: { className?: string }) {
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
      aria-hidden
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
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
      aria-hidden
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = projects.length;

  const goPrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  const goNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % count);
  }, [count]);

  useEffect(() => {
    if (paused || count === 0) return;
    const id = window.setInterval(goNext, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, count, goNext]);

  if (count === 0) return null;

  const current = projects[index];

  return (
    <section
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="프로젝트 캐러셀"
      aria-live="polite"
    >
      <div
        className="mb-5 flex justify-center gap-2"
        role="tablist"
        aria-label="프로젝트 선택"
      >
        {projects.map((project, dotIndex) => (
          <button
            key={project.id}
            type="button"
            role="tab"
            aria-label={`${project.name} 보기`}
            aria-selected={dotIndex === index}
            onClick={() => setIndex(dotIndex)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              dotIndex === index
                ? "w-6 bg-foreground"
                : "w-1.5 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-600 dark:hover:bg-zinc-500"
            }`}
          />
        ))}
      </div>

      <div className="relative">
        <div className="relative mx-auto max-w-2xl">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {projects.map((project) => (
                <article key={project.id} className="w-full shrink-0">
                  <div className="relative aspect-16/10 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                    <Image
                      src={project.image}
                      alt={`${project.name} 프로젝트 이미지`}
                      fill
                      sizes="(max-width: 768px) 100vw, 672px"
                      className="object-cover"
                      priority={project.id === projects[0].id}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-transparent" />
                    <div className="absolute right-5 bottom-5 left-5 text-white">
                      <p className="text-xs font-medium tracking-wider text-white/70 uppercase">
                        {project.period}
                      </p>
                      <h3 className="mt-1 text-2xl font-bold">
                        {project.name}
                        {project.nameKo ? (
                          <span className="ml-2 text-base font-normal text-white/80">
                            {project.nameKo}
                          </span>
                        ) : null}
                      </h3>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={goPrev}
          aria-label="이전 프로젝트"
          className="absolute top-1/2 left-0 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-background/90 text-foreground shadow-md backdrop-blur-sm transition-[transform,opacity] hover:scale-105 hover:opacity-100 active:scale-95 sm:-left-5 sm:h-11 sm:w-11 dark:border-zinc-700"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="다음 프로젝트"
          className="absolute top-1/2 right-0 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-background/90 text-foreground shadow-md backdrop-blur-sm transition-[transform,opacity] hover:scale-105 hover:opacity-100 active:scale-95 sm:-right-5 sm:h-11 sm:w-11 dark:border-zinc-700"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="mx-auto mt-8 max-w-2xl space-y-3 text-center">
        <p className="text-base leading-relaxed text-foreground">
          {current.description}
        </p>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {current.role}
        </p>
        <div className="flex flex-wrap justify-center gap-1.5 pt-1">
          {current.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>
        {current.award ? (
          <p className="pt-1 text-sm font-medium text-sky-600 dark:text-sky-400">
            🏆 {current.award}
          </p>
        ) : null}
      </div>
    </section>
  );
}
