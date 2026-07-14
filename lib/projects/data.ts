export type ProjectPhoto = {
  label: string;
  src?: string;
};

export type ProjectMeta = {
  label: string;
  value: string;
};

export type Project = {
  id: string;
  accent: string;
  cardBg: string;
  cardGlow: string;
  cardText: string;
  cardTextDim: string;
  cardGhostColor: string;
  cardGhost: string;
  category: string;
  categoryEye: string;
  name: string;
  nameOutline: string;
  role: string;
  roleLine: string;
  year: string;
  period: string;
  description: string;
  award?: string;
  stack: string[];
  stackHighlight: number[];
  meta: ProjectMeta[];
  photos: ProjectPhoto[];
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    id: "maeum-moeum",
    accent: "#6EA8FF",
    cardBg: "#EEF4FF",
    cardGlow: "rgba(110,168,255,.28)",
    cardText: "#1a2a4a",
    cardTextDim: "rgba(26,42,74,.38)",
    cardGhostColor: "rgba(26,42,74,.06)",
    cardGhost: "심",
    category: "멘탈 헬스케어",
    categoryEye: "멘탈 헬스케어 서비스",
    name: "마음모음",
    nameOutline: "Maummoum",
    role: "Frontend Developer",
    roleLine: "Frontend Developer · 2026.01 — 03",
    year: "2026",
    period: "2026.01 — 03",
    description:
      "AI 상담 페이지 설계 및 구현. Sonner 기반 토스트 모듈 공통화로 개발 효율 향상. 관리자 백오피스 핵심 5개 영역(회원/콘텐츠/운영/AI/권한) 구현. 플레이스토어 정식 출시.",
    stack: ["React", "TypeScript", "TanStack Query", "Zustand", "Axios"],
    stackHighlight: [0, 1],
    meta: [
      { label: "Period", value: "2026.01 — 03" },
      { label: "Role", value: "FE Developer" },
      { label: "Status", value: "출시 완료" },
    ],
    photos: [
      { label: "팀 사진", src: "/images/projects/maeum-moeum.png" },
      { label: "작업 화면" },
      { label: "출시 화면" },
    ],
  },
  {
    id: "dkaffeine",
    accent: "#FF7C7C",
    cardBg: "#1A1A1A",
    cardGlow: "rgba(255,100,100,.2)",
    cardText: "#ffffff",
    cardTextDim: "rgba(255,255,255,.35)",
    cardGhostColor: "rgba(255,255,255,.05)",
    cardGhost: "카",
    category: "RAG 챗봇 플랫폼",
    categoryEye: "RAG 기반 챗봇 관리자 플랫폼",
    name: "DKaffeine",
    nameOutline: "Platform",
    role: "Solo Architecture",
    roleLine: "Solo Frontend Architecture · 2025.10 — 12",
    year: "2025",
    period: "2025.10 — 12",
    description:
      "Next.js 프론트엔드 전체 아키텍처 단독 설계. Features 기반 모듈화 수립. WebSocket(STOMP) 실시간 파일 업로드 상태 추적 시스템 구축.",
    award: "카카오 SW아카데미 표창 · 우수팀 선정",
    stack: ["Next.js", "TypeScript", "WebSocket", "TanStack Query", "Zustand"],
    stackHighlight: [0, 1],
    meta: [
      { label: "Period", value: "2025.10 — 12" },
      { label: "Role", value: "Solo Arch" },
      { label: "Key", value: "WebSocket" },
    ],
    photos: [
      { label: "팀 사진", src: "/images/projects/dkaffeine.png" },
      { label: "작업 화면" },
      { label: "발표 화면" },
    ],
    githubUrl: "https://github.com/smileman62",
  },
  {
    id: "mcp-hub",
    accent: "#C9F135",
    cardBg: "#F0FAE6",
    cardGlow: "rgba(201,241,53,.28)",
    cardText: "#1e2a00",
    cardTextDim: "rgba(30,42,0,.38)",
    cardGhostColor: "rgba(30,42,0,.05)",
    cardGhost: "허",
    category: "MCP 탐색 플랫폼",
    categoryEye: "MCP 통합 탐색 & 실행 플랫폼",
    name: "MCP Hub",
    nameOutline: "Platform",
    role: "Frontend Leader",
    roleLine: "Frontend Leader · 2025.09 — 10",
    year: "2025",
    period: "2025.09 — 10",
    description:
      "프론트엔드 리더로 팀원 작업 분배 및 멘토링. App Router SSR/CSR 혼합 렌더링 전략 설계로 초기 로딩 성능 개선.",
    stack: ["Next.js", "App Router", "TypeScript", "TanStack Query", "Zustand"],
    stackHighlight: [0, 1],
    meta: [
      { label: "Period", value: "2025.09 — 10" },
      { label: "Role", value: "FE Leader" },
      { label: "Key", value: "SSR 최적화" },
    ],
    photos: [
      { label: "팀 사진" },
      { label: "작업 화면" },
      { label: "발표 화면" },
    ],
  },
  {
    id: "perfume-on-me",
    accent: "#FFB347",
    cardBg: "#FFF7ED",
    cardGlow: "rgba(255,180,71,.25)",
    cardText: "#2a1500",
    cardTextDim: "rgba(42,21,0,.38)",
    cardGhostColor: "rgba(42,21,0,.05)",
    cardGhost: "향",
    category: "AI 향수 추천",
    categoryEye: "AI & 설문 기반 향수 추천",
    name: "퍼퓨온미",
    nameOutline: "Perfume",
    role: "Frontend Leader",
    roleLine: "Frontend Leader · 2025.06 — 08",
    year: "2025",
    period: "2025.06 — 08",
    description:
      "반응형 웹 구현. 자연스러운 채팅 인터랙션 UX 설계. 코드 컨벤션 수립 및 공통 컴포넌트 정의로 팀 협업 효율 향상.",
    award: "UMC 8기 데모데이 최우수상",
    stack: ["React", "TypeScript", "Axios", "Context API"],
    stackHighlight: [0, 1],
    meta: [
      { label: "Period", value: "2025.06 — 08" },
      { label: "Role", value: "FE Leader" },
      { label: "Award", value: "최우수상" },
    ],
    photos: [
      { label: "팀 사진", src: "/images/projects/perfume-on-me.png" },
      { label: "수상 사진" },
      { label: "발표 화면" },
    ],
  },
];
