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
    team: "FE 4 · BE 4 · PM 1 · Design 1",
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
    github: "https://github.com/NOVA-9th/nova-fe",
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
      "Next.js를 활용하여 작업을 진행했습니다. 라우팅의 편리함과 SSR의 장점을 살리기 위해 Next.js를 사용하자고 의견을 제시했고, 이번 프로젝트에서는 FSD 파일 구조를 도입해보자고 건의했습니다. 이 외에도 JSON/PDF로 내보내기 기능을 구현했습니다.",
      "팀 개발 과정에서는 컨벤션을 함께 정하고 이를 기반으로 코드 스타일을 맞춰가며 개발했으며, 적극적인 코드 리뷰를 통해 일관성 있는 코드를 작성하기 위해 노력했습니다. 코드 리뷰는 특히 신경 써서 꼼꼼히 진행했습니다.",
      "프로젝트 도중 디자이너가 이탈해 당황스러웠고, 기존 디자인 체계가 제대로 잡혀 있지 않아 어려움을 겪기도 했습니다. 하지만 팀원들과 함께 기존 디자인 체계를 최대한 활용해 새로운 체계를 확립했고, 이를 바탕으로 예상 기간 안에 작업을 마무리할 수 있어 다행이었습니다.",
      "API 개발 과정에서는 브라우저와 서버 환경 모두에서 XHR 기반의 Axios 기본 어댑터 대신 표준 fetch API를 사용해야 하는 요구사항이 있었습니다. 이를 해결하기 위해 AxiosAdapter를 직접 구현하여 GET/POST/PUT/PATCH/DELETE 메서드, FormData, 쿼리 파라미터, timeout(AbortController)을 지원하도록 만들고, fetch의 응답을 Axios 형식으로 재매핑했습니다. 기존에 사용하던 인터셉터와 에러 처리 로직은 그대로 재사용하면서, 내부 통신 방식만 fetch 기반으로 자연스럽게 전환할 수 있었습니다.",
      "또한 SEO를 위해 API 데이터를 SSR로 처리해야 하는 과제도 있었습니다. 저희 프로젝트는 axios, fetch, React Query를 혼합해서 사용하고 있어, 서버에서는 fetch로 데이터를 미리 받아오고 클라이언트에서는 React Query로 이어받는 방식(prefetch + hydration)을 적용했습니다. 이를 통해 크롤러에는 완성된 HTML을 제공하면서도, 클라이언트에서는 로딩 깜빡임 없이 데이터를 바로 사용할 수 있도록 구현했습니다.",
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
          "백엔드 API 스펙이 자주 바뀌면서 프론트엔드 타입·호출 코드를 수동으로 맞추다 보니 수정 범위가 커지고, 스펙과 구현이 어긋날 위험이 있었습니다.",
        solution:
          "OpenAPI 스펙을 기준으로 Orval을 도입해 API 타입과 호출 코드를 자동 생성하도록 전환했습니다. 스펙 변경 시 생성 코드만 갱신하면 되어 수정 범위를 줄이고, 요청/응답 타입 안정성을 확보했습니다.",
      },
      {
        problem:
          "관리자마다 역할이 달라 동일 UI에서 모든 작업을 열어두면, 권한이 없는 계정이 잘못된 조작을 할 수 있는 위험이 있었습니다.",
        solution:
          "역할(권한) 정보를 기준으로 버튼·액션의 활성/비활성을 UI 레벨에서 제어하고, 접근이 제한된 작업은 비활성 상태로 노출해 잘못된 요청이 나가지 않도록 했습니다.",
      },
      {
        problem:
          "폼·설정 화면에서 내용이 바뀌지 않았는데도 저장 버튼이 항상 활성화되어 불필요한 API 호출이 발생했습니다.",
        solution:
          "초기값과 현재값의 변경 여부를 감지해, 변경이 없을 때는 저장 버튼을 비활성화하는 UX를 적용했습니다. 불필요한 요청을 줄이고 운영자가 ‘저장할 내용이 있는지’를 바로 판단할 수 있게 했습니다.",
      },
      {
        problem:
          "관리자 목록의 검색·필터 입력마다 즉시 API를 호출하면 요청이 과도하게 발생하고, 로딩 중 UI 피드백도 불명확했습니다.",
        solution:
          "검색어에 디바운스를 적용해 요청을 최적화하고, React Query의 `isFetching` 상태를 활용해 로딩 UI를 분리 표시했습니다. 이전 결과를 유지하면서도 갱신 중임을 명확히 보여 주도록 했습니다.",
      },
      {
        problem:
          "선택·비활성·포커스 상태가 시각적으로 구분되지 않아, 관리자 화면에서 현재 인터랙션 상태를 파악하기 어려웠습니다.",
        solution:
          "민트 포인트 컬러와 border로 선택/비활성/포커스 상태를 구분하고, 버튼·드롭다운·탭 등 주요 UI에 동일한 피드백 규칙을 적용해 인터랙션 상태를 일관되게 표현했습니다.",
      },
      {
        problem:
          "AI 상담 채팅에서 메시지 전송이 실패했을 때 화면에 낙관적으로 추가된 메시지가 남아, 실제 대화 상태와 UI가 어긋났습니다.",
        solution:
          "전송 실패 시 낙관적 업데이트를 rollback하고, role(user/assistant) 기반 렌더링·로딩 메시지·자동 스크롤과 함께 실패 피드백(토스트)을 제공해 채팅 상태를 일관되게 유지했습니다.",
      },
    ],
    retrospectives: [
      "리액트 네이티브와 웹뷰를 활용해 다양한 작업을 진행할 수 있었습니다. 소규모 팀이었지만 디자이너, PM, 백엔드 개발자와의 원활한 소통과 잦은 회의 덕분에 방향성을 자주 맞춰갈 수 있었고, 그 결과 프로젝트가 큰 혼선 없이 순조롭게 진행되었습니다. 특히 인원이 많지 않은 만큼 각자의 역할이 명확했고, 작은 이슈라도 빠르게 공유하고 결정할 수 있었던 점이 개발 속도를 높이는 데 도움이 되었습니다.",
      "오랜만에 RN을 다시 사용하는 것이라 처음에는 문법이나 환경 설정 등에서 다소 어색함을 느꼈습니다. 하지만 이전에 RN을 사용했던 경험이 있었기에 감을 되찾는 데 오래 걸리지 않았고, 과거의 경험을 살려 개발을 이어갈 수 있었습니다. 웹뷰와의 연동 과정에서도 네이티브와 웹 영역의 역할을 어떻게 나눌지 고민하며 작업했는데, 이때의 경험 이후 진행하는 개발에도 큰 도움이 되어 현재까지도 긍정적인 영향을 주고 있습니다.",
      "단기간에 많은 양을 개발해야 하는 상황이었지만, AI를 적극적으로 활용해 반복적인 코드 작성이나 문서 확인에 드는 시간을 줄일 수 있었습니다. 덕분에 정해진 일정 안에서도 기능 구현에 더 집중할 수 있었고, 결과적으로 목표한 범위의 작업을 무리 없이 완료할 수 있었습니다.",
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
      "프론트엔드를 혼자 맡게 되면서 처음에는 부담이 컸지만, 동시에 팀 협업에서 흔히 생기는 컨플릭트·머지 이슈를 상대적으로 덜 신경 써도 된다는 점에서는 집중하기 좋은 환경이기도 했습니다. 초기 기획 단계에서 도메인(Features) 폴더 구조 확립, 재사용 가능한 공용 컴포넌트, 전역 상태 최소화, 꼭 필요한 라이브러리만 사용하기라는 네 가지 목표를 세우고 프로젝트를 시작했습니다.",
      "지난 프로젝트에서 폴더 구조가 복잡해 어려움을 겪었던 경험이 있어, 이번엔 UI·훅·utils·services를 도메인 단위로 나누고 그 안에서 페이지별 폴더를 구성해 책임을 분명히 했습니다. 그 결과 작업 위치를 빠르게 파악할 수 있었고, 디자인에서 재사용 가능한 UI가 많다는 점을 일찍 인지해 기본 컴포넌트를 먼저 만든 뒤 확장하는 방식으로 작업 시간을 크게 줄일 수 있었습니다.",
      "전역 상태를 무조건 줄이려다 httpOnly 쿠키 환경에서 로그인 여부를 JS로 판별할 수 없어 리다이렉트 버그가 반복됐고, 결국 필요한 정보만 안전하게 영속화하는 선에서 전역 상태를 일부 도입했습니다. ‘적을수록 항상 좋다’기보다, 치명적 정보만 피한다면 localStorage를 적절히 쓰는 편이 유지보수에 도움이 될 수 있다는 점을 배웠습니다. 토스트처럼 직접 구현할 수 있는 기능은 Context로 만들어 커스터마이징 여지를 남긴 것도 만족스러웠습니다.",
      "디자인은 시간 제약으로 생성형 AI 시안을 기반으로 확장했고, Cursor에 반복적인 DTO·API 템플릿 작업을 맡겨 파일 업로드·공용 모달 같은 핵심 로직에 집중할 수 있었습니다. 멘토의 ‘기능 구현 최우선’ 조언에 따라 핵심 기능을 먼저 완성한 뒤 UI/UX를 다듬었고, 초반에 팀원마다 서비스 포인트가 달랐던 문제를 UI를 빠르게 공유해 방향성을 재정리하는 회의로 풀며 이후 속도와 협업 효율이 크게 올랐습니다.",
      "파일 업로드는 카카오 클라우드 설정과 프론트 설정이 맞지 않아 AWS 오브젝트 스토리지로 전환하기 전까지 많은 시행착오가 있었습니다. 자료와 레퍼런스가 부족하고 네트워크 로그 확인도 쉽지 않아 힘들었지만, 차근차근 계획을 세워 해결해 나가는 경험을 쌓았습니다. 스칼렛 멘토님께서 혼자 프론트를 맡았음에도 기획 기능을 모두 구현했고 크게 피드백할 부분이 없다고 말씀해 주셨을 때, 그리고 최종 발표 1등과 MVP 선정 소식을 들었을 때의 뿌듯함은 오래 기억에 남을 것 같습니다.",
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
    github: "https://github.com/8LOWUP/mcp-hub-FE",
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
      "프론트엔드 리더로 참여해 아키텍처 설계, 핵심 기능 구현, 작업 분배, 코드 리뷰를 맡았습니다. 목표는 UI·API 완성에 그치지 않고, 팀원이 스스로 고민하며 개발할 수 있도록 폴더 구조·컴포넌트 설계·연동 패턴·라이브러리 기준을 문서와 리뷰로 꾸준히 공유하는 것이었습니다. 카카오엔터프라이즈에서의 첫 프로젝트였던 만큼 초반에 안정적인 개발 흐름을 만드는 일이 특히 중요했습니다.",
      "경험이 상대적으로 적은 팀원에게는 초반 설명과 맞춤 피드백에 시간이 많이 들었지만, 시간이 지나며 공유된 기준으로 구현 근거를 설명하고 완성도를 높여가는 모습을 보며 큰 보람을 느꼈습니다. 각자 기능을 합치는 단계에서 시간이 오래 걸리던 문제도, 머지 전에 구현 내용을 함께 공유하고 충돌 지점을 미리 정리하는 방식으로 병합 시간을 줄일 수 있었습니다.",
      "MCP라는 개념을 처음 접한 뒤 구조와 장점을 이해하고, 백엔드와 연동해 워크스페이스 기반 채팅·마켓플레이스·다국어까지 실제 서비스 형태로 구현해 낸 경험이 큰 자산이 되었습니다. debounce로 MCP 상태를 최적화하고, next-intl로 서버/클라이언트 다국어를 나누며, 반응형 패널을 matchMedia로 맞추는 등 UX와 성능 사이의 균형을 잡는 연습이 되었습니다.",
      "잘한 점으로 리더십·Features/DDD 구조·상태 분리·타입 안정성·문서화된 트러블슈팅을 꼽을 수 있고, 아쉬운 점으로는 공용 컴포넌트 활용 부족, 모바일 반응형 완성도, 전역 에러 바운더리 부재가 있었습니다. 앞으로도 새 기술을 빠르게 익혀 서비스로 연결하고, 생산성 있고 흥미로운 사용자 경험을 만드는 개발자로 성장하고 싶습니다.",
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
      "향수 진입 장벽을 낮추는 AI·설문 기반 추천 서비스. 프론트엔드 리더로 챗봇·PBTI·인증·마이페이지를 이끌며 UMC 8기 데모데이 최우수상을 수상했습니다.",
    period: "2025.06.30 – 2025.08.21",
    durationLabel: "약 2개월",
    role: "프론트엔드 리더",
    roleDetail: "아키텍처 · 챗봇 · PBTI · 인증 · 코드 리뷰",
    team: "FE 4 · BE 4 · PM 1 · Designer 1",
    award: "UMC 8기 데모데이 최우수상",
    tags: [
      "React",
      "TypeScript",
      "Axios",
      "Context API",
      "React Router",
      "Framer Motion",
      "Tailwind CSS",
    ],
    github: "https://github.com/PerFumeOnMe/Front-end",
    intro: [
      "퍼퓨온미는 향수를 처음 접하거나 정보가 부족한 사용자에게 맞춤 추천을 제공해 진입 장벽을 낮추고, 나만의 향을 찾아가는 여정을 돕는 웹/앱 서비스입니다.",
      "고급스러운 향수 이미지를 살리면서도 PBTI, 이미지 키워드, 향수공방 등으로 쉽게 다가갈 수 있게 설계했습니다. 감정·상황·개성을 반영한 추천과 결과 저장·공유, 마이페이지 관리까지 이어집니다.",
      "프론트엔드 4명 중 리더로 참여해 초기 구조·컨벤션·챗봇·PBTI·인증·마이페이지를 담당했고, 디자이너 이탈 상황에서도 기능 우선 완성 후 디자인을 반영하는 전략으로 데모데이 최우수상을 수상했습니다.",
    ],
    contributions: [
      "프로젝트 초기 세팅·React Router SPA/중첩 라우팅·Protected Route, 코드·Git 컨벤션 수립 및 코드 리뷰 주도",
      "AI 향수 추천 챗봇: 실시간 송수신 UI, isLoading 기반 중복 요청 방지, 추천 태그·종료 확인 모달·beforeunload 이탈 경고",
      "AuthContext + localStorage 토큰 영속화, Axios 요청/응답 인터셉터(Authorization·401 로그아웃), Protected Route",
      "PBTI 설문·결과 플로우: Framer Motion 전환/말풍선·옵션 호버 애니메이션, 로딩·결과 저장·공유·마이페이지 연동",
      "마이페이지: 프로필·선호 향 수정, PBTI/이미지 키워드 결과·즐겨찾기 조회 및 상세 이동",
      "API 모듈화(Chatbot/PBTI/User/Fragrance 등)와 공통 Axios 인스턴스·에러 피드백 구조화",
    ],
    troubleshootings: [
      {
        problem:
          "챗봇에서 빠른 연속 요청으로 중복 API 호출과 UI 깜빡임이 발생했습니다.",
        solution:
          "isLoading으로 InputBox·태그 클릭을 막고, 빈 문자열 검증으로 불필요한 호출을 차단해 응답 대기 중 중복 전송을 막았습니다.",
      },
      {
        problem:
          "localStorage 토큰이 문자열 따옴표로 감싸져 API 인증이 실패했습니다.",
        solution:
          "Axios 인터셉터에서 토큰을 읽을 때 replace(/^\"(.*)\"$/, '$1')로 따옴표를 제거해 Authorization 헤더를 정상화했습니다.",
      },
      {
        problem:
          "챗봇 대화 중 페이지 이탈 시 대화 내용이 유실될 수 있었습니다.",
        solution:
          "사용자 메시지가 있을 때 beforeunload로 이탈 경고를 띄워 실수로 나가기 전 확인하도록 했습니다.",
      },
      {
        problem:
          "인증이 필요한 페이지에 미인증 사용자가 접근할 수 있었습니다.",
        solution:
          "ProtectedRoute로 인증 상태를 확인하고 미인증 시 로그인으로 리다이렉트했습니다.",
      },
      {
        problem: "API 에러 시 사용자에게 피드백이 불명확했습니다.",
        solution:
          "응답 인터셉터와 챗봇 UI에서 친화적인 에러 메시지를 노출해 실패 상황을 이해할 수 있게 했습니다.",
      },
    ],
    retrospectives: [
      "프론트엔드 4명 규모에서 리더를 맡으며, 소규모·단기간 협업만 해 온 입장에서 효율적인 협업 방식을 많이 고민했습니다. 부담감보다 ‘문제 없이 흘러가게 하자’는 마음으로 컨벤션·구조·리뷰 기준을 먼저 잡고, PM·리더 회의로 결정을 전파하는 방식을 활용했습니다.",
      "디자이너가 건강상 이유로 이탈했을 때는 UI 미확정 상태에서 개발을 시작해야 해 당황스러웠지만, 기능을 먼저 완성하고 이후 디자인을 반영하는 전략으로 전환했습니다. 제한된 기간 안에 데모 가능한 결과를 내기 위한 현실적인 선택이었고, 팀의 우선순위를 맞추는 연습이 되었습니다.",
      "AuthContext로 로그인 정보를 전역 공유하며 전역 상태의 필요성을 다시 느꼈고, min-h-screen을 부모·자식 관계까지 고려해 레이아웃을 잡는 경험을 통해 ‘속성 하나’가 아니라 계층 설계가 화면 안정성을 만든다는 점을 배웠습니다. 챗봇 중복 요청 방지, 토큰 따옴표 이슈, 이탈 경고 등 UX 디테일을 다듬는 과정도 인상 깊었습니다.",
      "데모데이 당일 새벽까지 작업하고 부스를 운영한 뒤 최우수상을 받았을 때의 기쁨은 아직도 생생합니다. 끝까지 달려준 팀원들 덕분이었고, 퍼퓨온미 덕분에 그 방학이 알차고 행복했습니다. 앞으로도 새 기술을 빠르게 익혀 서비스로 연결하고, 흥미로운 사용자 경험을 만드는 개발자로 성장하고 싶습니다.",
    ],
    images: [
      "/images/projects/perfume-on-me-1.png",
      "/images/projects/perfume-on-me-2.png",
      "/images/projects/perfume-on-me-3.png",
      "/images/projects/perfume-on-me-4.png",
    ],
  },
];
