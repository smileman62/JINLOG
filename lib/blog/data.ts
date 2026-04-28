import { posts } from "#site/content";
import type { BlogCategoryFilter, BlogPost, PostCategory } from "./types";

export const POSTS_PER_PAGE = 8;

export const categoryLabels: Record<BlogCategoryFilter, string> = {
  all: "전체",
  react: "React",
  nextjs: "Next.js",
};

/** 카테고리별 16:4 히어로 배경 (Unsplash, object-cover로 크롭) */
export const categoryHeroImage: Record<BlogCategoryFilter, string> = {
  all: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1920&h=1080&q=80",
  react:
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1920&h=1080&q=80",
  nextjs:
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1920&h=1080&q=80",
};

function inferCategory(tags: string[]): PostCategory {
  const loweredTags = tags.map((tag) => tag.toLowerCase());
  const firstMatched = loweredTags.find(
    (tag): tag is PostCategory => tag === "react" || tag === "nextjs",
  );
  if (firstMatched) return firstMatched;
  return "react";
}

export const allPosts: BlogPost[] = posts
  .filter((post) => post.published)
  .map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    tags: post.tags,
    cover: post.cover,
    category: inferCategory(post.tags),
    publishedAt: post.date,
    body: post.body,
  }))
  .sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : 0,
  );

export function filterPostsByCategory(
  posts: BlogPost[],
  filter: BlogCategoryFilter,
): BlogPost[] {
  if (filter === "all") return posts;
  return posts.filter((post) =>
    post.tags.some((tag) => tag.toLowerCase() === filter),
  );
}

export function parseCategoryFilter(value: string | undefined): BlogCategoryFilter {
  if (value === "react" || value === "nextjs") return value;
  return "all";
}

export function parsePage(value: string | undefined): number {
  const n = parseInt(value ?? "1", 10);
  if (!Number.isFinite(n) || n < 1) return 1;
  return n;
}

export function paginatePosts<T>(items: T[], page: number, perPage: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    totalPages,
    page: safePage,
  };
}
