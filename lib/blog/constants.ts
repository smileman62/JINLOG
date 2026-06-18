import type { BlogCategoryFilter } from "./types";

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
