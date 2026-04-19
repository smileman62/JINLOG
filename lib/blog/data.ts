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

const react = (n: number, title: string, excerpt: string): BlogPost => ({
  id: `r-${n}`,
  slug: `react-${n}`,
  title,
  excerpt,
  category: "react",
  publishedAt: `2026-03-${String((n % 28) + 1).padStart(2, "0")}`,
});

const nextjs = (n: number, title: string, excerpt: string): BlogPost => ({
  id: `n-${n}`,
  slug: `nextjs-${n}`,
  title,
  excerpt,
  category: "nextjs",
  publishedAt: `2026-02-${String((n % 28) + 1).padStart(2, "0")}`,
});

export const allPosts: BlogPost[] = [
  react(1, "useEffect 의존성 배열 정리하기", "실무에서 자주 만나는 패턴과 실수를 줄이는 방법을 정리했습니다."),
  react(2, "React 19에서 바뀐 점 메모", "서버 컴포넌트와 함께 쓰일 때 유의할 포인트를 짧게 적었습니다."),
  react(3, "커스텀 훅으로 폼 상태 다루기", "중복을 줄이면서 테스트하기 쉬운 구조로 나누는 기준을 공유합니다."),
  react(4, "리스트 렌더링 성능 체크리스트", "키 사용, 가상화, 메모이제이션을 언제 쓸지 기준을 정리했습니다."),
  react(5, "Context API 남용 피하기", "전역 상태가 불어날 때 대안과 경계를 나누는 팁입니다."),
  react(6, "에러 바운더리와 폴백 UI", "사용자에게 보여줄 메시지와 로깅을 어떻게 나눌지 정리했습니다."),
  react(7, "접근성 있는 모달 만들기", "포커스 트랩, 스크롤 잠금, aria 속성을 한 번에 다룹니다."),
  react(8, "스토리북으로 컴포넌트 계약 잡기", "UI 변형을 문서화하고 리뷰 비용을 줄이는 방법입니다."),
  react(9, "TanStack Query와 함께하는 데이터 패칭", "캐시 키 설계와 staleTime 선택 기준을 메모했습니다."),
  react(10, "테스트에서 사용자 관점 유지하기", "Testing Library로 의미 있는 단언을 만드는 연습입니다."),
  nextjs(1, "App Router 레이아웃 끼워 넣기", "route group과 중첩 레이아웃으로 도메인을 나누는 예시입니다."),
  nextjs(2, "generateMetadata로 OG 태그 채우기", "동적 라우트에서 메타데이터를 안전하게 만드는 패턴입니다."),
  nextjs(3, "next/image로 LCP 줄이기", "sizes와 priority를 어떻게 잡을지 체크리스트 형태로 정리했습니다."),
  nextjs(4, "Route Handler에서 인증 검증", "쿠키·헤더 검증을 한곳에 모아 중복을 줄였습니다."),
  nextjs(5, "ISR과 on-demand revalidation", "콘텐츠 성격에 맞는 갱신 전략을 골라 쓰는 기준입니다."),
  nextjs(6, "서버 액션과 폼 UX", "낙관적 업데이트 전에 고려한 검증·에러 처리 흐름입니다."),
  nextjs(7, "미들웨어로 경로 보호하기", "세션 없는 요청을 일찍 걸러내는 구성 예시를 담았습니다."),
  nextjs(8, "Turbopack 개발 경험 메모", "빌드 설정과 주의할 호환 이슈를 짧게 기록했습니다."),
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
