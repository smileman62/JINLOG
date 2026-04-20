import type { BlogCategoryFilter, BlogPost } from "./types";

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

const react = (n: number, title: string, commentCount: number): BlogPost => ({
  id: `r-${n}`,
  slug: `react-${n}`,
  title,
  category: "react",
  publishedAt: `2026-03-${String((n % 28) + 1).padStart(2, "0")}`,
  commentCount,
});

const nextjs = (n: number, title: string, commentCount: number): BlogPost => ({
  id: `n-${n}`,
  slug: `nextjs-${n}`,
  title,
  category: "nextjs",
  publishedAt: `2026-02-${String((n % 28) + 1).padStart(2, "0")}`,
  commentCount,
});

export const allPosts: BlogPost[] = [
  react(1, "useEffect 의존성 배열 정리하기", 12),
  react(2, "React 19에서 바뀐 점 메모", 4),
  react(3, "커스텀 훅으로 폼 상태 다루기", 0),
  react(4, "리스트 렌더링 성능 체크리스트", 28),
  react(5, "Context API 남용 피하기", 7),
  react(6, "에러 바운더리와 폴백 UI", 15),
  react(7, "접근성 있는 모달 만들기", 3),
  react(8, "스토리북으로 컴포넌트 계약 잡기", 9),
  react(9, "TanStack Query와 함께하는 데이터 패칭", 21),
  react(10, "테스트에서 사용자 관점 유지하기", 1),
  nextjs(1, "App Router 레이아웃 끼워 넣기", 6),
  nextjs(2, "generateMetadata로 OG 태그 채우기", 11),
  nextjs(3, "next/image로 LCP 줄이기", 19),
  nextjs(4, "Route Handler에서 인증 검증", 2),
  nextjs(5, "ISR과 on-demand revalidation", 8),
  nextjs(6, "서버 액션과 폼 UX", 14),
  nextjs(7, "미들웨어로 경로 보호하기", 5),
  nextjs(8, "Turbopack 개발 경험 메모", 0),
].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : 0));

export function filterPostsByCategory(
  posts: BlogPost[],
  filter: BlogCategoryFilter,
): BlogPost[] {
  if (filter === "all") return posts;
  return posts.filter((p) => p.category === filter);
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
