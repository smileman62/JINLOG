import type { BlogCategoryFilter } from "./types";

export function blogListUrl(category: BlogCategoryFilter, page: number): string {
  const params = new URLSearchParams();
  if (category !== "all") params.set("category", category);
  if (page > 1) params.set("page", String(page));
  const q = params.toString();
  return q ? `/blog?${q}` : "/blog";
}
