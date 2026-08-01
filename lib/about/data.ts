export type AboutTimelineItem = {
  period: string;
  title: string;
  subtitle: string;
};

export type AboutStrength = {
  title: string;
  description: string;
};

export type AboutCertificate = {
  title: string;
  status: string;
  period?: string;
};

export const aboutIntro = {
  name: "김진성",
  role: "Frontend Developer",
  paragraphs: [
    "React와 TypeScript를 기반으로 사용자 경험을 고민하는 프론트엔드 개발자입니다. 제가 만든 화면이 사용자와 자연스럽게 소통하고, 서비스가 전달하고자 하는 가치를 명확하게 보여줄 때 가장 큰 보람을 느낍니다.",
    "기획, 디자인, 백엔드 등 다양한 직무와 소통하며 더 나은 방향을 함께 찾아가는 과정을 좋아합니다. React와 Next.js를 중심으로 웹 프론트엔드 역량을 쌓고 있으며, 더 나은 UI/UX와 재사용 가능한 컴포넌트 설계에 관심을 가지고 성장하고 있습니다.",
    "FE 리더로서 아키텍처 설계, 코드 리뷰, 컨벤션 수립을 주도한 경험이 있으며, 팀과 함께 더 빠르고 일관된 개발 문화를 만드는 것을 중요하게 생각합니다.",
  ],
};

export const aboutEducation: AboutTimelineItem[] = [
  {
    period: "2022.03 — 2026.08 (졸업 예정)",
    title: "가천대학교 소프트웨어학과",
    subtitle: "GPA 4.1 / 4.5 · 학사 과정",
  },
];

export const aboutActivity: AboutTimelineItem[] = [
  {
    period: "2026.01 — 2026.03",
    title: "플래드랩스 · 마음모음",
    subtitle: "Frontend Developer — 앱·백오피스 개발",
  },
  {
    period: "2025.09 — 2026.12",
    title: "가천대 카카오엔터프라이즈 SW 아카데미 7기",
    subtitle: "기업실무형 프로젝트 · DKaffeine 프론트엔드",
  },
  {
    period: "2025.04 — 2026.02",
    title: "UMC 8·9기 시니어 과정",
    subtitle: "University MakeUs Challenge · 팀 프로젝트 리딩",
  },
];

export const aboutRewards: AboutTimelineItem[] = [
  {
    period: "2025.12",
    title: "DKaffeine 우수팀 선정",
    subtitle: "가천대 카카오엔터프라이즈 SW 아카데미 7기",
  },
  {
    period: "2025.08",
    title: "퍼퓨온미 최우수상",
    subtitle: "UMC 프로젝트 · AI·설문 기반 향수 추천",
  },
];

export const aboutCertificates: AboutCertificate[] = [
  {
    title: "정보처리기사",
    status: "취득",
    period: "2024",
  },
  {
    title: "ADsP",
    status: "취득",
    period: "2024",
  },
  {
    title: "SQLD",
    status: "취득",
    period: "2024",
  },
];

export const aboutStrengths: AboutStrength[] = [
  {
    title: "사용자 중심 사고",
    description:
      "사용자 관점에서 UI/UX를 분석하고, 반응형·접근성을 고려한 직관적인 화면 구조를 설계해 개발합니다.",
  },
  {
    title: "협업 & 커뮤니케이션",
    description:
      "기획, 디자인, 백엔드와 지속적으로 소통하며 문제를 함께 정의하고 더 나은 방향을 찾아갑니다.",
  },
  {
    title: "개발 리드 경험",
    description:
      "프론트엔드 리더로 일정 관리, 구조 설계, 코드 컨벤션 정리를 주도하며 팀 협업 효율을 높인 경험이 있습니다.",
  },
  {
    title: "코드 품질 관리",
    description:
      "타입 기반 컴포넌트 설계와 재사용 가능한 구조로 가독성과 유지보수성을 고려한 코드를 작성합니다.",
  },
  {
    title: "빠른 학습 능력",
    description:
      "새로운 기술과 프레임워크에 빠르게 적응하고, 학습한 내용을 프로젝트에 즉시 적용합니다.",
  },
  {
    title: "실시간·인터랙션 경험",
    description:
      "WebSocket, Framer Motion, 데이터 시각화를 활용해 몰입감 있는 사용자 경험을 구현합니다.",
  },
];

export const aboutTechStack = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "TanStack Query",
  "Zustand",
  "React Hook Form",
  "Axios",
  "Context API",
  "WebSocket",
  "Vite",
  "Recharts",
  "Tailwind CSS",
  "CSS Modules",
  "React Native",
];

export const aboutContacts = [
  { label: "GitHub", href: "https://github.com/smileman62" },
  { label: "Blog", href: "https://jskim6335.tistory.com/" },
  { label: "Email", href: "mailto:jskim6335@naver.com" },
];
