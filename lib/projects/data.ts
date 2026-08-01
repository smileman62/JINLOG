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
    id: "nova",
    title: "NOVA",
    subtitle: "개발자를 위한 AI 트렌드 인사이트 플랫폼",
    description:
      "AI 트렌드·뉴스를 카드뉴스 형태로 요약해 보여주는 데이터 기반 인사이트 플랫폼. 저장함·프로필·인증·이벤트(룰렛)를 담당하며 FSD 구조와 서버/클라이언트 상태 분리를 적용했습니다.",
    period: "2025 – 2026",
    role: "프론트엔드",
    roleDetail: "저장함 · 프로필 · 인증 · 이벤트 · API 기반",
    team: "팀 프로젝트",
    tags: [
      "Next.js",
      "React 19",
      "TypeScript",
      "TanStack Query",
      "Zustand",
      "Axios",
      "Tailwind CSS",
      "CVA",
      "React Hook Form",
      "Zod",
      "Chart.js",
      "jsPDF",
    ],
    github: "https://github.com/smileman62",
    link: "https://github.com/smileman62",
    intro: [
      "NOVA는 AI 트렌드·뉴스를 카드뉴스 형태로 요약해 보여주는 데이터 기반 인사이트 플랫폼입니다.",
      "사용자는 관심 키워드를 기반으로 피드를 구독하고, 마음에 드는 아티클을 저장함에 모아 검토하거나 JSON/PDF로 내보낼 수 있습니다.",
      "Next.js App Router와 FSD(Feature-Sliced Design) 구조를 기반으로 설계했으며, 서버 상태(TanStack Query)와 클라이언트 상태(Zustand)를 명확히 분리해 유지보수성을 높였습니다.",
    ],
    contributions: [
      "저장함(Saved) 페이지 전체 UI/기능 — useInfiniteQuery 무한 스크롤, Zustand 필터, 관심사·출처별 통계, JSON/PDF 내보내기(html2canvas + jsPDF 멀티페이지), 모바일 필터 UI",
      "프로필(Profile) 페이지 전체 UI/기능 — 회원정보·이미지 업로드, 연동 계정, 개인화(관심 키워드), 데이터 관리(저장함 삭제·숨김 초기화), 탈퇴/로그아웃·스켈레톤 UI",
      "로그인·인증 흐름 — OAuth 콜백, useAuthRedirect·useOnboardingGate로 접근 제어/온보딩 분기 통일",
      "API 통신 기반 — Axios 커스텀 Fetch Adapter, 토큰 인터셉터, 401/403/500·에러 코드 공통화",
      "이벤트(룰렛) 페이지 — 역할 선택→퀴즈→룰렛 phase(Zustand), 가중치 추첨, confetti·사운드 연출",
      "공통 UI 초기 구축 — Badge·Header·ItemList·SelectionChip 등 CVA 기반 variant 설계",
    ],
    troubleshootings: [
      {
        problem:
          "브라우저/서버 환경에서 XHR 기반 Axios 기본 어댑터 대신 표준 fetch API를 사용해야 하는 요구가 있었습니다.",
        solution:
          "AxiosAdapter를 직접 구현해 GET/POST/PUT/PATCH/DELETE, FormData, 쿼리 파라미터, timeout(AbortController)을 지원하고 응답을 Axios 형식으로 재매핑했습니다. 인터셉터·에러 처리는 그대로 재사용하면서 fetch 기반 통신으로 전환했습니다.",
      },
      {
        problem:
          "무한 스크롤 페이지네이션에서 백엔드 응답으로 동일 아티클이 중복 노출되는 경우가 있었습니다.",
        solution:
          "useInfiniteQuery로 받은 모든 페이지를 Map으로 병합해 ID 기준 중복을 제거하는 방어 로직을 추가해, 응답이 흔들려도 고유 아티클만 노출되도록 했습니다.",
      },
      {
        problem:
          "html2canvas로 캡처한 긴 저장 리스트를 하나의 A4 PDF에 넣으면 내용이 잘렸습니다.",
        solution:
          "캡처 이미지 높이를 페이지 높이 기준으로 나눠 남은 높이만큼 addPage()로 페이지를 추가하며 이미지를 반복 삽입해, 아티클 수와 무관하게 멀티페이지 PDF로 출력되게 했습니다.",
      },
      {
        problem:
          "로그인 여부, 온보딩 완료 여부, 현재 경로에 따른 리다이렉트 조건이 얽혀 라우팅 분기가 복잡했습니다.",
        solution:
          "useAuthRedirect(로그인 상태)와 useOnboardingGate(개인화 데이터)를 역할별로 분리하고 ignorePaths/enabledPaths 옵션으로 페이지별 조합이 가능하게 해, 가드 로직을 재사용했습니다.",
      },
    ],
    retrospectives: [
      "FSD로 app/widgets/features/shared 계층을 나누고, TanStack Query(서버)·Zustand(인증·필터·이벤트)를 분리한 덕분에 저장함·프로필·이벤트처럼 담당 영역이 커져도 기능 단위로 확장하기 수월했습니다.",
      "CVA로 Badge·칩·헤더 등 variant를 통일해 디자인 시스템과 코드 구조를 맞추고, 컨테이너 패턴으로 데이터 로직과 뷰를 분리한 경험이 이후 협업·리팩토링에도 도움이 되었습니다.",
    ],
    images: [
      "/images/projects/nova-1.png",
      "/images/projects/nova-2.png",
      "/images/projects/nova-3.png",
      "/images/projects/nova-4.png",
    ],
  },
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
      "/images/projects/maeum-moeum-1.png",
      "/images/projects/maeum-moeum-2.png",
      "/images/projects/maeum-moeum-3.png",
      "/images/projects/maeum-moeum-4.png",
    ],
  },
  {
    id: "dkaffeine",
    title: "DKaffeine",
    subtitle: "RAG 기반 챗봇 통합 관리 플랫폼",
    description:
      "사내 RAG 챗봇의 설정·데이터 소스·사용자 관리를 한곳에 모은 통합 관리 플랫폼. 프론트엔드를 단독으로 담당하며 Features 기반 아키텍처와 WebSocket 실시간 업로드 상태 추적을 구축했습니다.",
    period: "2025.10.27 – 2025.12.10",
    durationLabel: "약 1.5개월",
    role: "프론트엔드",
    roleDetail: "전체 아키텍처 단독 설계 · 주요 기능 구현",
    team: "FE 1 · BE 2 · Infra 2 · AI 2",
    award: "우수팀 선정 · MVP 개발자",
    tags: [
      "Next.js",
      "TypeScript",
      "Zustand",
      "TanStack Query",
      "WebSocket",
      "STOMP",
      "Axios",
      "Tailwind CSS",
      "Recharts",
      "Nivo",
      "react-markdown",
    ],
    github: "https://github.com/smileman62",
    link: "https://github.com/smileman62",
    intro: [
      "사내 RAG(Retrieval-Augmented Generation) 기반 챗봇을 효율적으로 관리·운영하기 위한 통합 관리 플랫폼입니다.",
      "기존에는 챗봇 설정, 데이터 소스 관리, 사용자 관리가 분산되어 관리자가 여러 시스템을 오가야 했습니다. DKaffeine은 이를 하나의 플랫폼으로 통합해 업무 효율을 높이고, 실시간 모니터링과 피드백 수집으로 챗봇 품질을 지속적으로 개선할 수 있도록 설계했습니다.",
      "프론트엔드 개발자 1명(본인)으로 참여해 전체 프론트엔드 아키텍처 설계와 주요 기능 구현을 담당했으며, Features 기반 구조로 코드를 모듈화해 유지보수성을 높였습니다.",
    ],
    contributions: [
      "Features 기반 아키텍처·Container/Presenter 패턴·상태 관리 전략(서버: TanStack Query / 클라이언트: Zustand / UI: Context) 수립",
      "Zustand + localStorage 기반 로그인 상태 관리, ProtectedLayout·JWT(쿠키) 인증 게이트 구현",
      "STOMP/SockJS WebSocket 클라이언트·자동 재연결(5초)·하트비트(4초)·파일 업로드 실시간 상태 추적(UPLOADING → PROCESSING → SUCCESS/FAILED)",
      "파일 업로드 UI: 실시간 진행률, 상태별 아이콘·색상, 슬라이드 인/아웃 애니메이션, 완료 항목 자동 제거",
      "페이지네이션 UX: keepPreviousData로 깜빡임 제거, 생략(...) 페이지 UI, 쿼리 키 참조 동일성 문제 해결",
      "react-markdown·rehype-highlight·remark-gfm 기반 채팅/FAQ/변경 이력 마크다운 렌더링",
      "UTC→KST 날짜 포맷 유틸(formatDateTime/formatDate/formatTime/formatTimeAgo)을 프로젝트 전반에 적용",
      "Recharts·Nivo 대시보드(사용 통계·품질 지표·API 비용 분석), 데이터 소스·FAQ·사용자 CRUD/권한 관리",
    ],
    troubleshootings: [
      {
        problem:
          "Next.js middleware의 쿠키 기반 로그인 확인과 클라이언트 상태가 어긋나 서버·클라이언트 간 로그인 상태 동기화 문제가 발생했습니다.",
        solution:
          "Zustand + localStorage를 활용한 클라이언트 측 상태 관리로 전환해 리다이렉트·인증 게이트를 안정화했습니다. httpOnly 쿠키만으로는 로그인 여부를 판단할 수 없다는 점을 반영해, 전역 상태를 무조건 줄이기보다 필요한 정보만 안전하게 영속화하는 전략으로 조정했습니다.",
      },
      {
        problem:
          "클라우드 인프라 이슈로 파일 업로드 실패 시 사용자에게 명확한 피드백을 주기 어려웠습니다.",
        solution:
          "WebSocket으로 파일 처리 상태를 실시간 추적해 업로드 실패 시 즉시 알림을 제공하고, 진행률·상태별 UI로 대기 체감을 줄였습니다.",
      },
      {
        problem:
          "페이지네이션 버튼 클릭 시 데이터 로딩 중 화면이 깜빡여 사용자 경험이 저하되었습니다.",
        solution:
          "React Query의 keepPreviousData(placeholderData)로 이전 데이터를 유지하고, 쿼리 키를 객체 대신 개별 값으로 구성해 참조 동일성 문제를 해결했습니다.",
      },
    ],
    retrospectives: [
      "프론트엔드를 혼자 담당하며 도메인(Features) 폴더 구조, 재사용 가능한 공용 컴포넌트, 전역 상태 최소화, 꼭 필요한 라이브러리만 사용한다는 네 가지 목표를 세우고 프로젝트를 진행했습니다.",
      "전역 상태를 무조건 줄이는 것이 항상 최선은 아니라는 점, UI를 빠르게 공유해 팀의 방향성을 맞추는 것이 협업 효율에 큰 영향을 준다는 점을 배웠습니다. 기능 구현을 최우선으로 한 뒤 UI/UX를 점진적으로 다듬는 전략으로 핵심 기능을 모두 구현할 수 있었습니다.",
      "최종 발표회에서 팀이 1등을 차지하고 MVP 개발자로 선정된 경험이 큰 동기부여가 되었습니다. 멘토로부터 프론트엔드 측면에서 크게 피드백할 부분이 없다는 평가를 받았을 때 특히 뿌듯했습니다.",
    ],
    images: [
      "/images/projects/dkaffeine-1.png",
      "/images/projects/dkaffeine-2.png",
      "/images/projects/dkaffeine-3.png",
      "/images/projects/dkaffeine-4.png",
      "/images/projects/dkaffeine-5.png",
    ],
  },
  {
    id: "mcp-hub",
    title: "MCP Hub",
    subtitle: "MCP 탐색 · 체험 · 공유 통합 플랫폼",
    description:
      "MCP를 마켓플레이스에서 탐색하고 웹에서 바로 체험·업로드할 수 있는 통합 플랫폼. 프론트엔드 리더로 아키텍처·핵심 채팅/마켓·다국어를 이끌며 SSR/CSR 혼합과 반응형 UX를 구축했습니다.",
    period: "2025.09.04 – 2025.10.24",
    durationLabel: "약 2개월",
    role: "프론트엔드 리더",
    roleDetail: "아키텍처 설계 · 작업 분배 · 코드 리뷰",
    team: "FE 3 · BE 3 · Infra 2",
    tags: [
      "Next.js",
      "App Router",
      "TypeScript",
      "TanStack Query",
      "Zustand",
      "next-intl",
      "Framer Motion",
      "Axios",
      "Tailwind CSS",
      "next-themes",
    ],
    github: "https://github.com/smileman62",
    link: "https://github.com/smileman62",
    intro: [
      "MCP(Model Context Platform)를 소개하고, 웹사이트 내에서 서비스를 바로 체험할 수 있는 통합 플랫폼입니다.",
      "사용자는 마켓플레이스에서 다양한 MCP를 탐색하고, 실시간 채팅으로 기능을 체험하며, 자신만의 MCP를 업로드해 커뮤니티와 공유할 수 있습니다. 복잡한 설치·설정 없이 브라우저만으로 MCP를 활용할 수 있도록 진입 장벽을 낮추는 것이 목표였습니다.",
      "프론트엔드 리더로서 전체 아키텍처 설계, 주요 기능 구현, 팀원 작업 분배와 코드 리뷰를 담당했습니다. Features 기반·DDD 스타일 구조로 모듈화하고, 백엔드와 API 스펙을 지속적으로 맞추며 프로젝트를 완성했습니다.",
    ],
    contributions: [
      "Features 기반 아키텍처·DDD 스타일 구조 제안/확정, 서버·클라이언트·UI 상태 분리 전략 수립, 코딩 컨벤션·코드 리뷰 주도",
      "워크스페이스 기반 실시간 채팅: 히스토리·MCP 토글·모델 선택·토큰 UX, debounce(800ms) 서버 동기화, 낙관적 업데이트·자동 스크롤",
      "MCP 마켓플레이스: 카테고리 탐색·서버 사이드 검색/페이지네이션, SearchBar SSR 이슈 해결(use client 분리), 스켈레톤 UI",
      "Google/GitHub/Kakao 소셜 로그인, middleware Protected Route, Zustand+localStorage 로그인 상태, 하드 로그아웃(메모리·스토리지·쿠키)",
      "next-intl 기반 한/영 다국어([locale] 라우팅, 서버 getTranslations / 클라이언트 useTranslations, 로케일 스위처)",
      "반응형 채팅 레이아웃(모바일·태블릿 드로어 / 데스크톱 고정 패널), ESC 닫기, Framer Motion·다크 모드·Pretendard 전역 적용",
      "프로덕션 배포·Node 22·pnpm 전환·Next.js 프록시 타임아웃(600초)·환경 변수 보안 강화",
    ],
    troubleshootings: [
      {
        problem:
          "MCP 활성화/비활성화마다 서버 요청을 보내면 부하가 커지고 UX가 끊기는 문제가 있었습니다.",
        solution:
          "로컬 상태를 즉시 반영하고 debounce(800ms)로 서버 동기화를 지연시켰으며, 채팅 전송 시에는 강제 동기화로 최신 상태를 보장했습니다.",
      },
      {
        problem:
          "새 워크스페이스 생성과 기존 워크스페이스 선택의 MCP 상태 관리 로직이 달라 복잡도가 높았습니다.",
        solution:
          "`new-` 접두사로 워크스페이스 ID를 구분하고 조건부 로직으로 새 채팅과 기존 워크스페이스의 MCP 상태를 명확히 분리했습니다.",
      },
      {
        problem:
          "App Router 다국어 라우팅에서 서버·클라이언트 컴포넌트 간 메시지 전달이 어긋났습니다.",
        solution:
          "next-intl의 서버 지원(getTranslations)과 클라이언트 훅(useTranslations)을 역할에 맞게 분리하고, 하드코딩 텍스트를 번역 키로 정리했습니다.",
      },
      {
        problem:
          "채팅 좌우 패널(히스토리·MCP 목록)을 모바일과 데스크톱에서 다르게 보여야 해 상태 관리가 복잡했습니다.",
        solution:
          "window.matchMedia 리스너로 화면 크기에 맞춰 패널 상태를 동기화하고, 모바일은 드로어·데스크톱은 고정 패널로 구현했습니다.",
      },
    ],
    retrospectives: [
      "프론트엔드 리더로서 UI/API 완성에 그치지 않고, 팀원이 스스로 고민하며 개발할 수 있도록 폴더 구조·컴포넌트 설계·연동 패턴·라이브러리 기준을 문서화하고 코드 리뷰로 지속적으로 공유했습니다.",
      "경험이 적은 팀원에게는 맞춤형 피드백이 필요했지만, 시간이 지나며 공유된 기준으로 완성도를 높여가는 모습을 보며 보람을 느꼈습니다. 머지 전 구현 내용을 함께 공유하고 충돌 지점을 미리 정리하는 방식으로 병합 시간도 줄일 수 있었습니다.",
      "MCP라는 새로운 개념을 학습에 그치지 않고 실제 채팅 서비스로 연결해 구현한 경험이 큰 자산이 되었습니다. 앞으로도 새 기술을 빠르게 습득하고 서비스로 확장해, 생산성 있고 흥미로운 사용자 경험을 만드는 개발자로 성장하고자 합니다.",
    ],
    images: [
      "/images/projects/mcp-hub-1.png",
      "/images/projects/mcp-hub-2.png",
      "/images/projects/mcp-hub-3.png",
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
      "/images/projects/perfume-on-me-1.png",
      "/images/projects/perfume-on-me-2.png",
      "/images/projects/perfume-on-me-3.png",
      "/images/projects/perfume-on-me-4.png",
    ],
  },
];
