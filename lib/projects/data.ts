export type Project = {
  id: string;
  name: string;
  nameKo?: string;
  period: string;
  description: string;
  role: string;
  stack: string[];
  image: string;
  award?: string;
};

export const projects: Project[] = [
  {
    id: "maeum-moeum",
    name: "마음모음",
    period: "2026.01 — 2026.03",
    description:
      "모바일 카메라 기반 비접촉 생체 신호(rPPG)와 심리 진단(MWS)을 결합한 통합 멘탈 헬스케어 서비스",
    role: "Frontend Developer @ 플래드랩스",
    stack: ["React", "React Native", "TypeScript", "Zustand", "Shadcn"],
    image: "/images/projects/maeum-moeum.png",
  },
  {
    id: "dkaffeine",
    name: "DKaffeine",
    period: "2025.10 — 2025.12",
    description:
      "RAG 기반 챗봇을 효율적으로 관리하기 위한 통합 관리자 플랫폼",
    role: "단독 프론트엔드 개발 · 팀 리딩",
    stack: ["Next.js", "TypeScript", "Zustand", "WebSocket", "Recharts"],
    image: "/images/projects/dkaffeine.png",
    award: "카카오 SW아카데미 표창 · 우수팀 선정",
  },
  {
    id: "mcp-hub",
    name: "MCP Hub",
    period: "2025.09 — 2025.10",
    description:
      "MCP 서버를 탐색·이용·업로드할 수 있는 마켓플레이스 서비스",
    role: "프론트엔드 리더",
    stack: ["Next.js", "TypeScript", "TanStack Query", "next-intl", "Framer Motion"],
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&h=800&q=80",
  },
  {
    id: "perfume-on-me",
    name: "PerfumeOnMe",
    nameKo: "퍼퓨온미",
    period: "2025.06 — 2025.08",
    description:
      "감각과 취향에 기반한 개인화 향수 큐레이션 서비스",
    role: "FE 리더",
    stack: ["React", "TypeScript", "Framer Motion", "Axios"],
    image: "/images/projects/perfume-on-me.png",
    award: "UMC 8기 데모데이 최우수상",
  },
];
