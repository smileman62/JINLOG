"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Project } from "@/lib/projects/data";
import enter from "@/components/projects/projects-enter.module.css";

type ProjectDetailModalProps = {
  project: Project;
  onClose: () => void;
};

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 5l14 14M19 5L5 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 6 9 17 4 12"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function padIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const images = project.images;
  const imageCount = images.length;
  const currentImage = images[imageIndex] ?? images[0];

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && imageCount > 1) {
        setImageIndex((index) => (index - 1 + imageCount) % imageCount);
      }
      if (event.key === "ArrowRight" && imageCount > 1) {
        setImageIndex((index) => (index + 1) % imageCount);
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, imageCount]);

  const github = project.github ?? project.link;
  const demo = project.demo;
  const hasGithub = Boolean(github);
  const hasDemo = Boolean(demo);
  const introText = project.intro?.length
    ? project.intro.join(" ")
    : project.description;
  const contributions = project.contributions ?? [];
  const troubleshootings = project.troubleshootings ?? [];
  const retrospectives = project.retrospectives ?? [];

  const goPrevImage = () => {
    setImageIndex((index) => (index - 1 + imageCount) % imageCount);
  };

  const goNextImage = () => {
    setImageIndex((index) => (index + 1) % imageCount);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-[16px] sm:p-[32px] ${enter.enterBackdrop}`}
    >
      <button
        type="button"
        aria-label="모달 닫기"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
        className={`relative z-10 my-auto w-full max-w-[860px] overflow-hidden rounded-[28px] bg-zinc-50 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.45)] dark:bg-zinc-950 ${enter.enterModal}`}
      >
        <button
          type="button"
          aria-label="닫기"
          onClick={onClose}
          className="absolute top-[16px] right-[16px] z-20 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white text-zinc-900 shadow-[0_6px_18px_rgba(0,0,0,0.16)] transition-colors hover:bg-zinc-100 hover:text-zinc-950 active:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800 dark:hover:text-white dark:active:bg-zinc-700"
        >
          <CloseIcon />
        </button>

        <div className="max-h-[88vh] overflow-y-auto">
          <header className="px-[20px] pt-[64px] pb-[22px] sm:px-[40px] sm:pt-[50px] sm:pb-[28px]">
            <div className="flex flex-col gap-[12px]">
              <div className="min-w-0 pr-[48px]">
                <h2
                  id="project-detail-title"
                  className="break-keep text-[32px] font-extrabold leading-[1.15] tracking-[-0.02em] text-zinc-900 sm:text-[42px] dark:text-zinc-50"
                >
                  {project.title}
                </h2>
                <p className="mt-[4px] break-keep text-[14px] font-medium leading-[1.55] text-zinc-500 sm:text-[15.5px]">
                  {project.subtitle}
                </p>
              </div>

              <div className="flex justify-end w-full gap-[8px]">
                {hasGithub ? (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-[6px] rounded-full border border-zinc-200 px-[16px] py-[10px] text-[13.5px] font-semibold text-zinc-900 transition-colors hover:bg-zinc-100 active:bg-zinc-200 sm:flex-none dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-800 dark:active:bg-zinc-700"
                  >
                    GitHub
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    className="inline-flex flex-1 cursor-not-allowed items-center justify-center gap-[6px] rounded-full border border-zinc-200 px-[16px] py-[10px] text-[13.5px] font-semibold text-zinc-400 opacity-50 sm:flex-none dark:border-zinc-800 dark:text-zinc-600"
                  >
                    GitHub
                  </span>
                )}
                {hasDemo ? (
                  <a
                    href={demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-[6px] rounded-full bg-zinc-900 px-[16px] py-[10px] text-[13.5px] font-semibold text-white transition-colors hover:bg-zinc-800 active:bg-zinc-700 sm:flex-none dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:active:bg-zinc-300"
                  >
                    배포 사이트
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    className="inline-flex flex-1 cursor-not-allowed items-center justify-center gap-[6px] rounded-full bg-zinc-300 px-[16px] py-[10px] text-[13.5px] font-semibold text-zinc-500 opacity-60 sm:flex-none dark:bg-zinc-800 dark:text-zinc-500"
                  >
                    배포 사이트
                  </span>
                )}
              </div>
            </div>
          </header>

          <div className="group relative mx-[20px] mb-[24px] aspect-video overflow-hidden rounded-[16px] sm:mx-[40px] sm:mb-[32px]">
            <Image
              key={currentImage}
              src={currentImage}
              alt={`${project.title} 이미지 ${imageIndex + 1}`}
              fill
              sizes="(max-width: 760px) 100vw, 760px"
              className="object-cover object-center"
              priority
            />

            {imageCount > 1 ? (
              <>
                <div className="absolute bottom-[14px] left-[14px] z-10 rounded-full bg-black/55 px-[12px] py-[6px] text-[12px] font-semibold tracking-[0.08em] text-white backdrop-blur-sm">
                  {padIndex(imageIndex)} / {String(imageCount).padStart(2, "0")}
                </div>

                <button
                  type="button"
                  aria-label="이전 이미지"
                  onClick={goPrevImage}
                  className="absolute top-1/2 left-[12px] z-10 flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow-sm opacity-100 transition-[opacity,transform,background-color,color] hover:bg-zinc-100 hover:text-zinc-950 active:scale-95 active:bg-zinc-200 sm:opacity-0 sm:group-hover:opacity-100 dark:bg-zinc-900/90 dark:text-zinc-50 dark:hover:bg-zinc-800 dark:active:bg-zinc-700"
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  type="button"
                  aria-label="다음 이미지"
                  onClick={goNextImage}
                  className="absolute top-1/2 right-[12px] z-10 flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow-sm opacity-100 transition-[opacity,transform,background-color,color] hover:bg-zinc-100 hover:text-zinc-950 active:scale-95 active:bg-zinc-200 sm:opacity-0 sm:group-hover:opacity-100 dark:bg-zinc-900/90 dark:text-zinc-50 dark:hover:bg-zinc-800 dark:active:bg-zinc-700"
                >
                  <ChevronRightIcon />
                </button>
              </>
            ) : null}
          </div>

          <section className="px-[20px] pb-[26px] sm:px-[40px] sm:pb-[32px]">
            <h3 className="mb-[16px] text-[17px] font-bold tracking-[-0.01em] text-zinc-800 dark:text-zinc-100">
              프로젝트 소개
            </h3>
            <p className="break-keep text-[14.5px] leading-[1.8] text-zinc-700 dark:text-zinc-300">
              {introText}
            </p>
          </section>

          <div className="mx-[20px] grid overflow-hidden rounded-[16px] border border-zinc-200 sm:mx-[40px] sm:grid-cols-3 dark:border-zinc-800">
            <div className="border-zinc-200 px-[20px] py-[18px] sm:border-r dark:border-zinc-800">
              <p className="mb-[8px] text-[12px] font-semibold tracking-[0.02em] text-zinc-400">
                기간
              </p>
              <p className="text-[14.5px] font-bold text-zinc-900 dark:text-zinc-50">
                {project.period}
              </p>
              {project.durationLabel ? (
                <p className="mt-[2px] text-[13px] font-medium text-zinc-500">
                  {project.durationLabel}
                </p>
              ) : null}
            </div>
            <div className="border-t border-zinc-200 px-[20px] py-[18px] sm:border-t-0 sm:border-r dark:border-zinc-800">
              <p className="mb-[8px] text-[12px] font-semibold tracking-[0.02em] text-zinc-400">
                역할
              </p>
              <p className="text-[14.5px] font-bold text-zinc-900 dark:text-zinc-50">
                {project.role ?? "-"}
              </p>
              {project.roleDetail ? (
                <p className="mt-[2px] text-[13px] font-medium text-zinc-500">
                  {project.roleDetail}
                </p>
              ) : null}
            </div>
            <div className="border-t border-zinc-200 px-[20px] py-[18px] sm:border-t-0 dark:border-zinc-800">
              <p className="mb-[8px] text-[12px] font-semibold tracking-[0.02em] text-zinc-400">
                팀
              </p>
              <p className="text-[14.5px] font-bold text-zinc-900 dark:text-zinc-50">
                {project.team ?? "-"}
              </p>
              {project.award ? (
                <p className="mt-[2px] text-[13px] font-medium text-zinc-500">
                  {project.award}
                </p>
              ) : null}
            </div>
          </div>

          <section className="px-[20px] pt-[26px] sm:px-[40px] sm:pt-[32px]">
            <h3 className="mb-[16px] text-[17px] font-bold tracking-[-0.01em] text-zinc-800 dark:text-zinc-100">
              사용 기술
            </h3>
            <div className="flex flex-wrap gap-[8px]">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-[8px] bg-zinc-100 px-[13px] py-[7px] text-[13px] font-semibold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <hr className="mx-[20px] mt-[26px] border-0 border-t border-zinc-200 sm:mx-[40px] sm:mt-[32px] dark:border-zinc-800" />

          {contributions.length > 0 ? (
            <section className="px-[20px] pt-[26px] sm:px-[40px] sm:pt-[32px]">
              <h3 className="mb-[16px] text-[17px] font-bold tracking-[-0.01em] text-zinc-800 dark:text-zinc-100">
                주요 기여
              </h3>
              <ul className="flex flex-col gap-[12px]">
                {contributions.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-[10px] break-keep text-[14.5px] leading-[1.6] text-zinc-900 dark:text-zinc-100"
                  >
                    <span className="mt-[1px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                      <CheckIcon />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {troubleshootings.length > 0 ? (
            <section className="px-[20px] pt-[26px] sm:px-[40px] sm:pt-[32px]">
              <h3 className="mb-[16px] text-[17px] font-bold tracking-[-0.01em] text-zinc-800 dark:text-zinc-100">
                트러블 슈팅
              </h3>
              <div className="flex flex-col gap-[16px]">
                {troubleshootings.map((item, index) => (
                  <div
                    key={`${item.problem}-${index}`}
                    className="rounded-[12px] border border-zinc-200 p-[16px] dark:border-zinc-800"
                  >
                    <div className="space-y-[14px]">
                      <div>
                        <p className="mb-[8px] text-[14px] font-bold tracking-[0.02em] text-rose-500 dark:text-rose-400">
                          Problem
                        </p>
                        <p className="break-keep text-[15px] leading-[1.7] text-zinc-800 dark:text-zinc-200">
                          {item.problem}
                        </p>
                      </div>
                      <div>
                        <p className="mb-[8px] text-[14px] font-bold tracking-[0.02em] text-emerald-600 dark:text-emerald-400">
                          Solution
                        </p>
                        <p className="break-keep text-[15px] leading-[1.7] text-zinc-800 dark:text-zinc-200">
                          {item.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {retrospectives.length > 0 ? (
            <section className="px-[20px] pt-[26px] pb-[40px] sm:px-[40px] sm:pt-[32px]">
              <h3 className="mb-[16px] text-[17px] font-bold tracking-[-0.01em] text-zinc-800 dark:text-zinc-100">
                프로젝트 후기
              </h3>
              <div className="rounded-r-[10px] border-l-[3px] border-zinc-400 bg-white px-[24px] py-[20px] dark:border-zinc-500 dark:bg-zinc-900">
                <div className="space-y-[10px]">
                  {retrospectives.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="break-keep text-[14.5px] leading-[1.85] text-zinc-700 dark:text-zinc-300"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </section>
          ) : (
            <div className="pb-[40px]" />
          )}
        </div>
      </div>
    </div>
  );
}
