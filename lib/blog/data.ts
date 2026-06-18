import { readVelitePosts } from "./posts-source";
import type { BlogCategoryFilter, BlogPost, PostCategory } from "./types";

export { categoryHeroImage, categoryLabels, POSTS_PER_PAGE } from "./constants";

function inferCategory(tags: string[]): PostCategory {
  const loweredTags = tags.map((tag) => tag.toLowerCase());
  const firstMatched = loweredTags.find(
    (tag): tag is PostCategory => tag === "react" || tag === "nextjs",
  );
  if (firstMatched) return firstMatched;
  return "react";
}

function toBlogPosts(): BlogPost[] {
  return readVelitePosts()
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
}

let cachedPosts: BlogPost[] | null = null;

export function getAllPosts(): BlogPost[] {
  cachedPosts ??= toBlogPosts();
  return cachedPosts;
}

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
