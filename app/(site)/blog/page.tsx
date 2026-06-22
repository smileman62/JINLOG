import type { Metadata } from "next";
import { BlogFeaturedPost } from "@/components/blog/blog-featured-post";
import { BlogRecentPosts } from "@/components/blog/blog-recent-posts";
import { BlogStickerHero } from "@/components/blog/blog-sticker-hero";
import enter from "@/components/blog/blog-enter.module.css";
import { JsonLd } from "@/components/seo/json-ld";
import { getAllPosts } from "@/lib/blog/data";
import { blogPageJsonLd } from "@/lib/seo";
import { siteName } from "@/lib/site";

const RECENT_POSTS_COUNT = 3;

export const metadata: Metadata = {
  title: "블로그",
  description:
    "김진성(JINLOG)의 React, Next.js, TypeScript 학습·프로젝트 기록. 프론트엔드 개발 블로그.",
  keywords: [
    "김진성 블로그",
    "JINLOG",
    "React 블로그",
    "Next.js 블로그",
    "프론트엔드",
    "TypeScript",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `블로그 · ${siteName}`,
    description:
      "React, Next.js, TypeScript를 다루는 김진성의 기술 블로그.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogLandingPage() {
  const [featured, ...rest] = getAllPosts();
  const recentPosts = rest.slice(0, RECENT_POSTS_COUNT);

  return (
    <div className="mx-auto max-w-6xl">
      <JsonLd data={blogPageJsonLd()} />

      <BlogStickerHero nowWritingTitle={featured?.title} />

      {featured ? (
        <BlogFeaturedPost post={featured} />
      ) : (
        <p
          className={`rounded-xl border border-dashed border-zinc-300 px-4 py-16 text-center text-zinc-500 dark:border-zinc-700 dark:text-zinc-400 ${enter.enter}`}
          style={{ animationDelay: "0.22s" }}
        >
          아직 게시된 글이 없습니다.
        </p>      )}

      <BlogRecentPosts posts={recentPosts} />
    </div>
  );
}
