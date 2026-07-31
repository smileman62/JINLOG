"use client";

import type { BlogPost } from "@/lib/blog/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import enter from "@/components/blog/blog-enter.module.css";
import { categoryHeroImage, categoryLabels } from "@/lib/blog/constants";
import { estimateReadingMinutes, formatDateDot } from "@/lib/blog/format";

type BlogFeaturedPostProps = {
  posts: BlogPost[];
};

const HIGHLIGHT_WORDS = ["React", "Next.js", "TypeScript", "JavaScript"] as const;

function TitleWithHighlight({ title }: { title: string }) {
  const pattern = new RegExp(`(${HIGHLIGHT_WORDS.map(escapeRegExp).join("|")})`, "g");
  const parts = title.split(pattern);

  return (
    <>
      {parts.map((part, index) =>
        HIGHLIGHT_WORDS.includes(part as (typeof HIGHLIGHT_WORDS)[number]) ? (
          <span key={`${part}-${index}`} className="text-[#A78BFA]">
            {part}
          </span>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        ),
      )}
    </>
  );
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FeaturedMobileCard({
  post,
  readMinutes,
  dateLabel,
}: {
  post: BlogPost;
  readMinutes: number;
  dateLabel: string;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-[28px] bg-[#141414] p-[26px] text-white shadow-[0_12px_40px_rgba(15,15,15,0.14)] transition-[transform,box-shadow] duration-300 active:scale-[0.985] md:hidden"
    >
      <span className="inline-flex w-fit items-center gap-[6px] rounded-full bg-white/[0.06] px-[10px] py-[5px] text-[10px] font-semibold tracking-[0.12em] text-zinc-400 uppercase">
        <span className="h-[5px] w-[5px] rounded-full bg-[#A78BFA]" aria-hidden />
        Recent
      </span>

      <h1 className="mt-[18px] line-clamp-2 break-keep text-[25px] font-bold leading-[1.25] tracking-[-0.03em]">
        <TitleWithHighlight title={post.title} />
      </h1>

      <p className="mt-[16px] line-clamp-3 break-keep text-[14px] leading-[1.65] text-[#A1A1AA]">
        {post.description}
      </p>

      <div className="mt-auto flex items-end justify-between gap-[16px] pt-[24px]">
        <div className="min-w-0 text-[12px] leading-[1.7] text-zinc-500">
          <span className="inline-flex rounded-full bg-white/[0.08] px-[10px] py-[4px] font-medium text-zinc-300">
            {categoryLabels[post.category]}
          </span>
          <p className="mt-[10px] flex flex-wrap items-center gap-x-[8px] gap-y-[2px]">
            {dateLabel ? (
              <>
                <span>{dateLabel}</span>
                <span aria-hidden className="text-zinc-600">
                  ·
                </span>
              </>
            ) : null}
            <span>{readMinutes}분 읽기</span>
          </p>
        </div>

        <span
          aria-hidden
          className="inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-white transition-[transform,background-color,color] duration-200 group-hover:scale-105 group-hover:bg-white group-hover:text-[#141414] group-hover:[&_svg]:translate-x-[1px] group-hover:[&_svg]:-translate-y-[1px]"
        >
          <ArrowUpRightIcon />
        </span>
      </div>
    </Link>
  );
}

function FeaturedDesktopCard({
  post,
  coverSrc,
  readMinutes,
  dateLabel,
}: {
  post: BlogPost;
  coverSrc: string;
  readMinutes: number;
  dateLabel: string;
}) {
  return (
    <div className="relative hidden overflow-hidden rounded-[28px] bg-[#141414] text-white shadow-[0_24px_60px_rgba(15,15,15,0.18)] md:block">
      <div className="grid md:min-h-[300px] md:grid-cols-[1.6fr_0.85fr] lg:min-h-[340px]">
        <div className="relative z-10 flex flex-col justify-center px-[36px] py-[36px] lg:px-[48px] lg:py-[40px]">
          <h1 className="max-w-[600px] break-keep text-[34px] font-extrabold leading-[1.25] tracking-[-0.03em] lg:text-[40px]">
            <Link href={`/blog/${post.slug}`} className="hover:opacity-90">
              <TitleWithHighlight title={post.title} />
            </Link>
          </h1>

          <p className="mt-[14px] max-w-[520px] break-keep text-[15px] leading-[1.7] text-zinc-400">
            {post.description}
          </p>

          <div className="mt-[18px] flex flex-wrap items-center gap-[10px] text-[13px] text-zinc-400">
            <span className="rounded-full bg-white/10 px-[10px] py-[5px] font-medium text-zinc-200">
              {categoryLabels[post.category]}
            </span>
            <span className="inline-flex items-center gap-[5px]">
              <CalendarIcon />
              {dateLabel}
            </span>
            <span className="inline-flex items-center gap-[5px]">
              <ClockIcon />
              {readMinutes}분 읽기
            </span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="mt-[28px] inline-flex w-fit items-center gap-[8px] rounded-full border border-white/70 px-[22px] py-[11px] text-[14px] font-semibold text-white transition-[background,transform] duration-200 hover:scale-[1.02] hover:bg-white/10"
          >
            글 읽기 →
          </Link>
        </div>

        <div className="relative min-h-[220px] md:min-h-full">
          <Image
            key={coverSrc}
            src={coverSrc}
            alt={`${post.title} 대표 이미지`}
            fill
            priority
            sizes="(max-width: 1024px) 40vw, 50vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-r from-[#141414] via-[#141414]/15 to-transparent"
          />
        </div>
      </div>
    </div>
  );
}

export function BlogFeaturedPost({ posts }: BlogFeaturedPostProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (posts.length === 0) return null;

  const post = posts[activeIndex];
  const coverSrc = post.cover ?? categoryHeroImage[post.category];
  const readMinutes = estimateReadingMinutes(post.body);
  const dateLabel = formatDateDot(post.publishedAt);

  return (
    <section className={`${enter.enter}`} style={{ animationDelay: "0.08s" }}>
      <FeaturedMobileCard
        post={post}
        readMinutes={readMinutes}
        dateLabel={dateLabel}
      />
      <FeaturedDesktopCard
        post={post}
        coverSrc={coverSrc}
        readMinutes={readMinutes}
        dateLabel={dateLabel}
      />

      {posts.length > 1 ? (
        <div className="mt-[16px] flex justify-center gap-[8px]">
          {posts.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              aria-label={`${item.title} 보기`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => setActiveIndex(index)}
              className={`h-[8px] w-[8px] rounded-full transition-colors duration-200 ${
                index === activeIndex
                  ? "bg-[#A78BFA]"
                  : "bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-600 dark:hover:bg-zinc-500"
              }`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
