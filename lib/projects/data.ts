export type ProjectTroubleshooting = {
  problem: string;
  solution: string;
};

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  period: string;
  award?: string;
  tags: string[];
  link?: string;
  github?: string;
  demo?: string;
  role?: string;
  roleDetail?: string;
  team?: string;
  durationLabel?: string;
  intro?: string[];
  contributions?: string[];
  troubleshootings?: ProjectTroubleshooting[];
  retrospectives?: string[];
  images: string[];
};

export const projects: Project[] = [
  {
    id: "maeum-moeum",
    title: "마음모음",
    subtitle: "멘탈 헬스케어 서비스",
    description:
      "AI 상담 페이지 설계 및 구현. Sonner 기반 토스트 모듈 공통화로 개발 효율을 높이고, 관리자 백오피스 핵심 영역을 구현한 멘탈 헬스케어 서비스.",
    period: "2025.03 – 2025.06",
    durationLabel: "3개월",
    role: "기여도 100%",
    roleDetail: "프론트엔드 전체 구현",
    team: "개인 프로젝트",
    tags: [
      "React",
      "TypeScript",
      "Zustand",
      "TanStack Query",
      "React Hook Form",
      "Sonner",
      "Vite",
      "Recharts",
    ],
    github: "https://github.com/smileman62",
    demo: "https://github.com/smileman62",
    link: "https://github.com/smileman62",
    intro: [
      "마음모음은 사용자의 감정 데이터를 기록하고 분석하여 정서적 건강을 관리할 수 있도록 돕는 멘탈 헬스케어 서비스입니다.",
      "AI 기반 상담과 데이터 시각화를 통해 사용자가 자신의 감정 변화를 쉽게 이해하고 관리할 수 있도록 설계했습니다.",
    ],
    contributions: [
      "AI 상담 페이지 설계 및 구현",
      "감정 기록·시각화(그래프, 통계) UI 구현",
      "관리자 백오피스 핵심 영역 구현",
      "Sonner 기반 토스트 모듈 공통화",
    ],
    troubleshootings: [
      {
        problem:
          "감정 데이터를 일별 그래프로 시각화하는 과정에서 날짜 그룹핑 로직이 예상보다 복잡했습니다.",
        solution:
          "날짜 키 기준을 통일하고 그룹핑 유틸을 분리해, 일별 집계가 안정적으로 동작하도록 정리했습니다.",
      },
      {
        problem:
          "타임존 처리 오류로 저장 값이 하루 밀리는 버그가 발생했습니다.",
        solution:
          "전체 저장 로직의 타임존 처리를 재점검하고 UTC 기준으로 정규화해 날짜 밀림을 해결했습니다.",
      },
    ],
    retrospectives: [
      "이 과정에서 데이터 구조 설계에 대한 이해를 크게 넓힐 수 있었습니다.",
    ],
    images: [
      "/images/projects/maeum-moeum.png",
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "dkaffeine",
    title: "DKaffeine",
    subtitle: "RAG 기반 챗봇 관리자 플랫폼",
    description:
      "Next.js 프론트엔드 전체 아키텍처를 단독 설계한 RAG 챗봇 관리자 플랫폼. WebSocket 기반 실시간 파일 업로드 상태 추적을 구축.",
    period: "2025.10 - 2025.12",
    durationLabel: "3개월",
    role: "프론트엔드",
    roleDetail: "전체 아키텍처 단독 설계",
    team: "팀 프로젝트",
    award: "우수팀 선정",
    tags: ["Next.js", "TypeScript", "WebSocket", "Zustand"],
    github: "https://github.com/smileman62",
    link: "https://github.com/smileman62",
    intro: [
      "Next.js 프론트엔드 전체 아키텍처를 단독 설계한 RAG 챗봇 관리자 플랫폼입니다.",
      "WebSocket 기반 실시간 파일 업로드 상태 추적을 구축했습니다.",
    ],
    contributions: [
      "프론트엔드 전체 아키텍처 단독 설계",
      "RAG 챗봇 관리자 대시보드 구현",
      "WebSocket 기반 실시간 업로드 상태 추적 구축",
    ],
    troubleshootings: [
      {
        problem: "업로드 실패·재시도 시 상태가 어긋나 UI와 서버 상태가 불일치했습니다.",
        solution:
          "이벤트 순서와 복구 흐름을 재설계해 WebSocket 상태 전이를 명확히 분리했습니다.",
      },
    ],
    retrospectives: [
      "실시간 상태 동기화와 업로드 실패 복구 흐름을 정리하면서 WebSocket UX를 다듬었습니다.",
    ],
    images: [
      "/images/projects/dkaffeine.png",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "mcp-hub",
    title: "MCP Hub",
    subtitle: "MCP 통합 탐색 & 실행 플랫폼",
    description:
      "프론트엔드 리더로 팀원 작업 분배와 멘토링을 담당. App Router SSR/CSR 혼합 렌더링 전략으로 초기 로딩 성능을 개선한 MCP 탐색 플랫폼.",
    period: "2025.09 - 2025.10",
    durationLabel: "2개월",
    role: "프론트엔드 리더",
    roleDetail: "작업 분배 및 멘토링",
    team: "팀 프로젝트",
    tags: ["Next.js", "App Router", "TypeScript", "TanStack Query"],
    github: "https://github.com/smileman62",
    link: "https://github.com/smileman62",
    intro: [
      "MCP 통합 탐색과 실행을 위한 플랫폼입니다.",
      "App Router SSR/CSR 혼합 렌더링 전략으로 초기 로딩 성능을 개선했습니다.",
    ],
    contributions: [
      "프론트엔드 리드 및 멘토링",
      "SSR/CSR 혼합 렌더링 전략 설계",
      "MCP 탐색·실행 UI 구현",
    ],
    troubleshootings: [
      {
        problem: "초기 로딩이 무거워져 첫 화면 체감 성능이 떨어졌습니다.",
        solution:
          "SSR/CSR 경계를 재조정하고 인터랙션 구간을 분리해 초기 로딩을 개선했습니다.",
      },
    ],
    retrospectives: [
      "렌더링 경계를 나누며 초기 로딩과 인터랙션 구간의 균형을 맞추는 경험을 쌓았습니다.",
    ],
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "perfume-on-me",
    title: "퍼퓨온미",
    subtitle: "AI & 설문 기반 향수 추천",
    description:
      "AI·설문 기반 향수 추천 서비스. 반응형 웹과 자연스러운 채팅 인터랙션 UX를 설계하고, 공통 컴포넌트로 팀 협업 효율을 높임.",
    period: "2025.06 - 2025.08",
    durationLabel: "3개월",
    role: "프론트엔드",
    roleDetail: "반응형 웹 · 채팅 UX",
    team: "팀 프로젝트",
    award: "최우수상",
    tags: ["React", "TypeScript", "Axios", "Context API"],
    github: "https://github.com/smileman62",
    link: "https://github.com/smileman62",
    intro: [
      "AI·설문 기반 향수 추천 서비스입니다.",
      "반응형 웹과 자연스러운 채팅 인터랙션 UX를 설계했습니다.",
    ],
    contributions: [
      "채팅형 인터랙션 UX 설계·구현",
      "반응형 웹 레이아웃 구성",
      "공통 컴포넌트 설계로 협업 효율 개선",
    ],
    troubleshootings: [
      {
        problem: "채팅 메시지 상태와 UI 동기화가 어긋나 렌더 이슈가 발생했습니다.",
        solution:
          "메시지 흐름을 단방향으로 정리해 상태와 UI가 같은 순서로 갱신되도록 맞췄습니다.",
      },
    ],
    retrospectives: [
      "채팅 UX와 공통 컴포넌트를 정리하며 팀 협업 효율을 높일 수 있었습니다.",
    ],
    images: [
      "/images/projects/perfume-on-me.png",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=1600&q=80",
    ],
  },
];
