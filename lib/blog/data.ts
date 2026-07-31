import { readVelitePosts } from "./posts-source";
import type { BlogCategoryFilter, BlogPost, PostCategory } from "./types";

export { categoryHeroImage, categoryLabels, POSTS_PER_PAGE } from "./constants";

const CATEGORY_PRIORITY: PostCategory[] = [
  "retrospective",
  "python",
  "nextjs",
  "react",
];

function inferCategory(tags: string[]): PostCategory {
  const loweredTags = new Set(tags.map((tag) => tag.toLowerCase()));
  const matched = CATEGORY_PRIORITY.find((category) =>
    loweredTags.has(category),
  );
  return matched ?? "react";
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

export function getAllPosts(): BlogPost[] {
  return toBlogPosts();
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
  if (
    value === "react" ||
    value === "nextjs" ||
    value === "python" ||
    value === "retrospective"
  ) {
    return value;
  }
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
