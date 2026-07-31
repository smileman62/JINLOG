"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects/data";
import { ProjectDetailModal } from "@/components/projects/project-detail-modal";
import enter from "@/components/projects/projects-enter.module.css";

type ProjectsShowcaseProps = {
  projects: Project[];
};

const NAV_VISIBLE_COUNT = 5;
const NAV_THUMB_WIDTH = 64;
const NAV_THUMB_GAP = 8;
const NAV_SIDE_BUTTON_WIDTH = 220;

function padIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

const TAG_CHIP_CLASS =
  "rounded-full bg-zinc-100 px-[10px] py-[4px] text-[11px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300";

function ProjectTagChips({ tags }: { tags: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(tags.length);

  useLayoutEffect(() => {
    setVisibleCount(tags.length);
  }, [tags]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || tags.length === 0) return;

    const chips = Array.from(
      container.querySelectorAll<HTMLElement>("[data-tag-chip]"),
    );
    if (chips.length === 0) return;

    const rowTops: number[] = [];
    for (const chip of chips) {
      const top = chip.offsetTop;
      if (!rowTops.some((rowTop) => Math.abs(rowTop - top) <= 2)) {
        rowTops.push(top);
      }
      if (rowTops.length > 2) {
        setVisibleCount((count) => Math.max(1, count - 1));
        return;
      }
    }
  }, [visibleCount, tags]);

  const hiddenCount = Math.max(0, tags.length - visibleCount);
  const visibleTags = tags.slice(0, visibleCount);

  return (
    <div ref={containerRef} className="mt-[18px] flex flex-wrap gap-[6px]">
      {visibleTags.map((tag) => (
        <span key={tag} data-tag-chip className={TAG_CHIP_CLASS}>
          {tag}
        </span>
      ))}
      {hiddenCount > 0 ? (
        <span data-tag-chip className={TAG_CHIP_CLASS}>
          +{hiddenCount}
        </span>
      ) : null}
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 6H5a2 2 0 00-2 2v1a4 4 0 004 4M17 6h2a2 2 0 012 2v1a4 4 0 01-4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ProjectGridCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const cover = project.images[0];

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative aspect-[4/3] w-full overflow-hidden rounded-[20px] border border-zinc-200/60 text-left shadow-[0_8px_24px_rgba(15,15,15,0.08)] dark:border-zinc-700"
    >
      <Image
        src={cover}
        alt=""
        fill
        sizes="(max-width: 1023px) 50vw, 0px"
        className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-black/80 via-black/35 to-black/10"
      />
      <div className="absolute inset-x-0 bottom-0 z-10 p-[14px] sm:p-[18px]">
        <p className="break-keep text-[11px] font-medium leading-snug text-white/80 sm:text-[12px]">
          {project.subtitle}
        </p>
        <h2 className="mt-[4px] break-keep text-[15px] font-extrabold leading-tight tracking-[-0.02em] text-white sm:text-[18px]">
          {project.title}
        </h2>
        <div className="mt-[10px] flex flex-wrap gap-[6px]">
          <span className="inline-flex items-center gap-[5px] rounded-full bg-white/20 px-[10px] py-[5px] text-[10px] font-medium text-white backdrop-blur-sm sm:text-[11px]">
            <CalendarIcon />
            {project.period}
          </span>
          {project.award ? (
            <span className="inline-flex items-center gap-[5px] rounded-full bg-[#F59E0B]/90 px-[10px] py-[5px] text-[10px] font-semibold text-white sm:text-[11px]">
              <TrophyIcon />
              {project.award}
            </span>
          ) : null}
        </div>
      </div>
    </button>
  );
}

export function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageReady, setImageReady] = useState(true);
  const [detailOpen, setDetailOpen] = useState(false);
  const [thumbWindowStart, setThumbWindowStart] = useState(0);

  const count = projects.length;
  const project = projects[activeIndex];
  const prevProject = projects[(activeIndex - 1 + count) % count];
  const nextProject = projects[(activeIndex + 1) % count];
  const selectedImage = project.images[selectedImageIndex] ?? project.images[0];
  const thumbStep = NAV_THUMB_WIDTH + NAV_THUMB_GAP;
  const thumbViewportWidth =
    Math.min(count, NAV_VISIBLE_COUNT) * NAV_THUMB_WIDTH +
    (Math.min(count, NAV_VISIBLE_COUNT) - 1) * NAV_THUMB_GAP;

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [activeIndex]);

  useEffect(() => {
    setImageReady(false);
    const timer = window.setTimeout(() => setImageReady(true), 20);
    return () => window.clearTimeout(timer);
  }, [selectedImage]);

  useEffect(() => {
    setThumbWindowStart((start) => {
      if (count <= NAV_VISIBLE_COUNT) return 0;
      if (activeIndex < start) return activeIndex;
      if (activeIndex >= start + NAV_VISIBLE_COUNT) {
        return activeIndex - NAV_VISIBLE_COUNT + 1;
      }
      return start;
    });
  }, [activeIndex, count]);

  const goToProject = (index: number) => {
    setActiveIndex(index);
  };

  const goPrev = () => goToProject((activeIndex - 1 + count) % count);
  const goNext = () => goToProject((activeIndex + 1) % count);
  const openDetail = (index?: number) => {
    if (typeof index === "number") setActiveIndex(index);
    setDetailOpen(true);
  };

  if (!project) return null;

  return (
    <section className="mx-auto w-full max-w-[1200px]">
      <header
        className={`mb-[28px] ${enter.enter}`}
        style={{ animationDelay: "0.04s" }}
      >
        <h1 className="text-[40px] font-extrabold leading-none tracking-[-0.04em] text-zinc-900 sm:text-[48px] dark:text-zinc-50">
          Projects
        </h1>
      </header>

      <div className="grid grid-cols-2 gap-[12px] sm:gap-[16px] lg:hidden">
        {projects.map((item, index) => (
          <div
            key={item.id}
            className={`w-full min-w-0 ${enter.enter}`}
            style={{ animationDelay: `${0.1 + index * 0.06}s` }}
          >
            <ProjectGridCard
              project={item}
              onOpen={() => openDetail(index)}
            />
          </div>
        ))}
      </div>

      <div className="hidden lg:block">
        <article
          className={`overflow-hidden rounded-[28px] border border-zinc-200/80 bg-white shadow-[0_20px_60px_rgba(15,15,15,0.08)] dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)] ${enter.enter}`}
          style={{ animationDelay: "0.12s" }}
        >
          <div className="flex min-h-[480px]">
            <div className="flex min-w-0 flex-1 flex-col">
              <div
                className={`relative min-h-[480px] flex-1 transition-opacity duration-300 ${
                  imageReady ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  key={selectedImage}
                  src={selectedImage}
                  alt={`${project.title} \uB300\uD45C \uC774\uBBF8\uC9C0`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 800px, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="border-t border-zinc-100 bg-white px-[20px] py-[12px] dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex justify-start gap-[8px] overflow-x-auto pb-[2px]">
                  {project.images.map((image, index) => {
                    const isActive = index === selectedImageIndex;
                    return (
                      <button
                        key={`${project.id}-${image}-${index}`}
                        type="button"
                        onClick={() => setSelectedImageIndex(index)}
                        aria-label={`${project.title} \uC774\uBBF8\uC9C0 ${index + 1}`}
                        aria-current={isActive ? "true" : undefined}
                        className={`relative h-[56px] w-[88px] shrink-0 overflow-hidden rounded-[10px] border-2 transition-[transform,border-color,opacity] duration-200 ${
                          isActive
                            ? "border-[#0EA5E9] opacity-100"
                            : "border-transparent opacity-75 hover:scale-[1.03] hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={image}
                          alt=""
                          fill
                          sizes="88px"
                          className="object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex w-[400px] shrink-0 flex-col bg-white p-[48px] dark:bg-zinc-950">
              <div>
                <p className="text-[13px] font-bold tracking-[0.08em] text-[#0EA5E9]">
                  {padIndex(activeIndex)} / {String(count).padStart(2, "0")}
                </p>

                <h2 className="mt-[14px] break-keep text-[36px] font-extrabold leading-[1.1] tracking-[-0.03em] text-zinc-900 dark:text-zinc-50">
                  {project.title}
                </h2>

                <p className="mt-[14px] break-keep text-[16px] leading-[1.65] text-zinc-600 dark:text-zinc-300">
                  {project.description}
                </p>

                <ProjectTagChips key={project.id} tags={project.tags} />
              </div>

              <button
                type="button"
                onClick={() => openDetail()}
                className="mt-auto inline-flex w-fit items-center gap-[8px] rounded-full bg-zinc-900 px-[22px] py-[12px] text-[14px] font-bold text-white transition-transform duration-200 hover:scale-[1.03] dark:bg-zinc-100 dark:text-zinc-900"
              >
                {"\uC790\uC138\uD788 \uBCF4\uAE30 \u2192"}
              </button>
            </div>
          </div>
        </article>

        <nav
          className={`mt-[28px] flex items-center justify-between gap-[20px] rounded-[24px] border border-zinc-200 bg-white px-[12px] py-[10px] dark:border-zinc-800 dark:bg-zinc-950 ${enter.enter}`}
          style={{ animationDelay: "0.22s" }}
        >
          <button
            type="button"
            onClick={goPrev}
            className="group relative flex shrink-0 items-center gap-[12px] overflow-hidden rounded-[16px] px-[16px] py-[10px] text-left transition-[transform,background-color] duration-200 hover:bg-[#0EA5E9]/08 active:scale-[0.98] active:bg-[#0EA5E9]/12 dark:hover:bg-[#0EA5E9]/15 dark:active:bg-[#0EA5E9]/20"
            style={{ width: NAV_SIDE_BUTTON_WIDTH }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-[56px] bg-linear-to-r from-[#0EA5E9]/18 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
            <span
              className="relative text-[18px] text-zinc-400 transition-[color,transform] duration-200 group-hover:translate-x-[-2px] group-hover:text-[#0EA5E9] group-active:translate-x-[-4px]"
              aria-hidden
            >
              {"\u2190"}
            </span>
            <span className="relative min-w-0">
              <span className="block text-[12px] font-medium text-zinc-400 transition-colors duration-200 group-hover:text-[#0EA5E9]/80">
                {"\uC774\uC804 \uD504\uB85C\uC81D\uD2B8"}
              </span>
              <span className="mt-[2px] block truncate break-keep text-[15px] font-bold text-zinc-900 transition-colors duration-200 group-hover:text-[#0EA5E9] dark:text-zinc-50 dark:group-hover:text-[#38BDF8]">
                {prevProject.title}
              </span>
            </span>
          </button>

          <div
            className="overflow-hidden"
            style={{ width: Math.max(thumbViewportWidth, 0) }}
          >
            <div
              className="flex items-center transition-transform duration-300 ease-out"
              style={{
                gap: NAV_THUMB_GAP,
                transform: `translateX(-${thumbWindowStart * thumbStep}px)`,
              }}
            >
              {projects.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goToProject(index)}
                  aria-label={`${item.title}\uB85C \uC774\uB3D9`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className={`relative h-[44px] shrink-0 overflow-hidden rounded-[10px] border-2 transition-[transform,border-color,opacity] duration-200 ${
                    index === activeIndex
                      ? "border-[#0EA5E9]"
                      : "border-transparent opacity-70 hover:scale-[1.04] hover:opacity-100"
                  }`}
                  style={{ width: NAV_THUMB_WIDTH }}
                >
                  <Image
                    src={item.images[0]}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={goNext}
            className="group relative flex shrink-0 items-center justify-end gap-[12px] overflow-hidden rounded-[16px] px-[16px] py-[10px] text-right transition-[transform,background-color] duration-200 hover:bg-[#0EA5E9]/08 active:scale-[0.98] active:bg-[#0EA5E9]/12 dark:hover:bg-[#0EA5E9]/15 dark:active:bg-[#0EA5E9]/20"
            style={{ width: NAV_SIDE_BUTTON_WIDTH }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-[56px] bg-linear-to-l from-[#0EA5E9]/18 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
            <span className="relative min-w-0">
              <span className="block text-[12px] font-medium text-zinc-400 transition-colors duration-200 group-hover:text-[#0EA5E9]/80">
                {"\uB2E4\uC74C \uD504\uB85C\uC81D\uD2B8"}
              </span>
              <span className="mt-[2px] block truncate break-keep text-[15px] font-bold text-zinc-900 transition-colors duration-200 group-hover:text-[#0EA5E9] dark:text-zinc-50 dark:group-hover:text-[#38BDF8]">
                {nextProject.title}
              </span>
            </span>
            <span
              className="relative text-[18px] text-zinc-400 transition-[color,transform] duration-200 group-hover:translate-x-[2px] group-hover:text-[#0EA5E9] group-active:translate-x-[4px]"
              aria-hidden
            >
              {"\u2192"}
            </span>
          </button>
        </nav>
      </div>

      {detailOpen ? (
        <ProjectDetailModal project={project} onClose={() => setDetailOpen(false)} />
      ) : null}
    </section>
  );
}
