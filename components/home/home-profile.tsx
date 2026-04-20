import type { ReactNode } from "react";
import Link from "next/link";
import { ProfilePhoto } from "@/components/home/profile-photo";

function SectionTitle({
  id,
  children,
}: {
  id?: string;
  children: ReactNode;
}) {
  return (
    <h2
      id={id}
      className="mt-14 scroll-mt-24 border-b border-zinc-200 pb-2 text-xl font-semibold tracking-tight text-foreground first:mt-0 dark:border-zinc-800"
    >
      {children}
    </h2>
  );
}

function Subheading({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-8 text-base font-semibold text-foreground">{children}</h3>
  );
}

export function HomeProfile() {
  return (
    <article className="mx-auto max-w-3xl">
        <header className="flex flex-col items-start gap-3 mt-10">
          <div className="flex items-end gap-4 sm:gap-6">
            <div className="relative h-32 w-32 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
              <ProfilePhoto />
            </div>
            <div className="flex flex-col items-start gap-1.5">
              <h1 className="text-3xl font-bold leading-none tracking-[0.03em] text-foreground sm:text-5xl">
                KIM JINSUNG
              </h1>
              <p className="text-2xl font-medium text-sky-600 dark:text-sky-400">
                Frontend Developer
              </p>
            </div>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            사용자 시각에서 흐름을 먼저 고민하고, 구조적인 코드와 협업을 통해 경험 가치를
            높이는 프론트엔드 개발을 지향합니다.
          </p>
        </header>

        <SectionTitle id="contact">Contact</SectionTitle>
        <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
        <li>
          <span className="mr-2" aria-hidden>
            ✉️
          </span>
          <a
            href="mailto:jskim6335@naver.com"
            className="font-medium text-sky-600 underline-offset-2 hover:underline dark:text-sky-400"
          >
            jskim6335@naver.com
          </a>
        </li>
        </ul>

        <SectionTitle id="channel">Channel</SectionTitle>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        <li>
          <Link
            href="https://github.com/smileman62"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-sky-600 underline-offset-2 hover:underline dark:text-sky-400"
          >
            🐼 Github
          </Link>
        </li>
        <li>
          <Link
            href="https://velog.io/@yoosion030"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 underline-offset-2 hover:underline dark:text-sky-400"
          >
            Velog
          </Link>
        </li>
        <li>
          <Link
            href="https://jskim6335.tistory.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 underline-offset-2 hover:underline dark:text-sky-400"
          >
            Tistory
          </Link>
        </li>
        </ul>

        <section className="mt-12 space-y-10">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            사용자의 시각에서 먼저 생각합니다. 🤔💭
          </h2>
          <blockquote className="mt-3 border-l-4 border-sky-500/70 pl-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            기능 구현에 그치지 않고, 사용자 흐름을 먼저 고민하는 UI/UX 중심의 개발을
            추구합니다.
          </blockquote>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            함께일 때 더 큰 가치를 만들어낼 수 있다고 생각합니다. 👨‍👩‍👧‍👦
          </h2>
          <blockquote className="mt-3 border-l-4 border-sky-500/70 pl-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            코드 리뷰와 협업 프로세스를 통해 팀과 함께 성장하는 개발 문화를 중요하게
            생각합니다.
          </blockquote>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            배움에는 끝이 없습니다. 📝
          </h2>
          <blockquote className="mt-3 border-l-4 border-sky-500/70 pl-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            부족한 것이 있다면 더 열심히 배운다는 마인드로 성장 중입니다. 배운 것을
            정리하는{" "}
            <Link
              href="https://jskim6335.tistory.com/"
              className="font-medium text-sky-600 underline-offset-2 hover:underline dark:text-sky-400"
            >
              블로그
            </Link>
            를 운영하고 있습니다.
          </blockquote>
        </div>
        </section>

        <aside className="mt-10 rounded-xl border border-zinc-200/80 bg-zinc-50/80 p-6 text-sm leading-relaxed text-zinc-700 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:text-zinc-300">
        <p>
          어린 시절부터 컴퓨터에 관심을 가져 소프트웨어학과에 진학하였으며, 다양한
          프로젝트를 경험하는 과정에서{" "}
          <strong className="text-foreground">
            사용자 인터페이스를 직접 설계하고 개선하는 데 큰 흥미
          </strong>
          를 느끼게 되었습니다. 이후{" "}
          <strong className="text-foreground">
            사용자 경험을 향상시키는 프론트엔드 개발자
          </strong>
          가 되고자 방향을 확립하게 되었습니다.
        </p>
        <p className="mt-4">
          문제를 마주했을 때 쉽게 포기하지 않고, 팀원들과의 적극적인 소통과 토론을
          통해{" "}
          <strong className="text-foreground">
            문제의 본질을 파악하고 끝까지 해결하는 태도
          </strong>
          를 중요하게 생각합니다.
        </p>
        <p className="mt-4">
          <strong className="text-foreground">불필요한 구조와 비효율을 지양</strong>
          하며,{" "}
          <strong className="text-foreground">
            코드 구조 개선 · 데이터 흐름 설계 · 성능 최적화
          </strong>
          를 꾸준히 학습하고 실무에 적용하고 있습니다.
        </p>
        </aside>

        <SectionTitle id="projects">Projects</SectionTitle>

        <div className="mt-6 space-y-10">
        <section>
          <h3 className="text-base font-semibold text-foreground">
            마음모음 <span className="font-normal text-zinc-500">2026.01 ~ 2026.03</span>
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            멘탈 헬스케어 서비스
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            프론트엔드 개발팀의 일원으로 웹 애플리케이션 및 관리자 백오피스 개발
            경험이 있습니다.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li>
              앱 내 AI 상담 페이지를 설계·구현하였고, Sonner 기반 토스트 모듈 공통화로
              개발 효율을 높였으며, 관리자 백오피스 핵심 5개 영역(회원·콘텐츠·운영·AI·권한)을
              구현했습니다.
            </li>
            <li>
              소규모 팀에서 부서 간 주차 회의와 프론트엔드 팀 소통을 통해 역할 분배와
              QA의 중요성을 체감했고, 플레이스토어 출시 경험과 함께 성장의 필요성을 느낀
              프로젝트입니다.
            </li>
            <li>
              React, TypeScript, Axios, TanStack Query, Zustand 환경에서 개발했습니다.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-base font-semibold text-foreground">
            DKaffeien{" "}
            <span className="font-normal text-zinc-500">2025.10 ~ 2025.12</span>
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            RAG 기반 챗봇 관리자 플랫폼
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Next.js를 활용해 프론트엔드 전체 아키텍처를 단독 설계·구현했습니다.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li>
              Features 기반 모듈화 아키텍처와 서버·클라이언트·UI 상태 분리 전략(TanStack
              Query / Zustand / Context)을 직접 설계했습니다.
            </li>
            <li>
              파일 업로드 UX 개선을 위해 백엔드와 협의하여 WebSocket 기반 실시간 업로드
              상태 추적을 구축했습니다.
            </li>
            <li>
              파트 간 협업으로 서비스 품질과 개발 효율을 높였고, 생성형 AI 활용으로
              생산성을 극대화한 경험이 있습니다.
            </li>
            <li>
              Next.js, React, TypeScript, Axios, TanStack Query, Zustand, WebSocket
              (STOMP) 환경에서 개발했습니다.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-base font-semibold text-foreground">
            MCP HUB{" "}
            <span className="font-normal text-zinc-500">2025.09 ~ 2025.10</span>
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            MCP 통합 탐색 · 실행 플랫폼
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            프론트엔드 리더로 프로젝트 설계, 역할 분담, 개발을 담당했습니다.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li>
              MCP를 잘 모르는 사용자도 쓰기 쉽도록 UI·UX 설계와 기능 구상을 팀과
              진행했습니다.
            </li>
            <li>
              작업 분배와 멘토링으로 팀이 막히지 않도록 지원하며 리더 역할의 중요성을
              깊이 이해했습니다.
            </li>
            <li>
              Next.js App Router에서 서버·클라이언트 컴포넌트를 구분해 렌더링 전략을
              설계하고 초기 로딩 성능을 개선했습니다.
            </li>
            <li>
              Next.js, React, TypeScript, Axios, TanStack Query, Zustand 환경에서
              개발했습니다.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-base font-semibold text-foreground">
            퍼퓨온미 <span className="font-normal text-zinc-500">2025.06 ~ 2025.08</span>
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            AI 및 설문 기반 향수 추천 서비스
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            프론트엔드 리더로 폴더 구조·코드 컨벤션을 수립하고 반응형 웹을 구현했습니다.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li>
              PM·백엔드 리더와 필수 구현 요소를 주기적으로 정리해 팀에 전파·점검했습니다.
            </li>
            <li>
              응답 대기 UX를 위해 버튼 비활성화, 자동 스크롤, 로딩 처리로 자연스러운
              채팅 인터랙션을 설계했습니다.
            </li>
            <li>
              Axios 기반 API 통신 구조와 비동기 흐름을 정리해 안정적인 데이터 처리를
              구현했습니다.
            </li>
            <li>
              공통 컴포넌트와 폴더 구조를 정의해 코드 일관성과 협업 효율을 높였습니다.
            </li>
            <li>
              React, TypeScript, Axios, React Context 환경에서 개발했습니다.
            </li>
          </ul>
        </section>
        </div>

        <SectionTitle id="portfolio">Portfolio</SectionTitle>
        <p className="mt-4 text-sm">
        <Link
          href="https://www.notion.so/33e6ec4166058049a3c9d72b38645005"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-sky-600 underline-offset-2 hover:underline dark:text-sky-400"
        >
          Notion 포트폴리오 보기 →
        </Link>
        </p>

        <SectionTitle id="tech">Tech &amp; Tool</SectionTitle>
        <div className="mt-6 space-y-6 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <div>
          <Subheading>HTML/CSS · 반응형 UI</Subheading>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>시멘틱 마크업과 접근성·구조를 고려한 UI 구현</li>
            <li>다양한 디바이스 대응 반응형 경험</li>
            <li>
              Tailwind CSS, <code className="rounded bg-zinc-200/80 px-1 dark:bg-zinc-800">clsx</code>,{" "}
              <code className="rounded bg-zinc-200/80 px-1 dark:bg-zinc-800">tailwind-merge</code>를
              활용한 조건부 스타일링
            </li>
          </ul>
        </div>
        <div>
          <Subheading>JavaScript / TypeScript</Subheading>
          <p className="mt-2">
            ES6+와 TypeScript로 API·전역 상태 구조에 타입 안정성을 두어 생산성과 신뢰성을
            높입니다.
          </p>
        </div>
        <div>
          <Subheading>React · Next.js</Subheading>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>함수형 컴포넌트·Hooks·커스텀 훅으로 재사용 로직 설계</li>
            <li>Next.js App Router 기반 SSR/CSR 혼합 전략</li>
            <li>Middleware 기반 locale·인증/인가 게이트</li>
            <li>동적 라우팅·중첩 레이아웃 설계</li>
          </ul>
        </div>
        <div>
          <Subheading>상태 관리</Subheading>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Zustand 전역 상태·로컬 스토리지 연동</li>
            <li>TanStack Query로 서버 상태 캐싱·동기화·낙관적 업데이트</li>
          </ul>
        </div>
        <div>
          <Subheading>데이터 통신 · 실시간</Subheading>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Axios 인터셉터 기반 토큰·공통 에러 처리</li>
            <li>WebSocket(STOMP) 실시간 통신과 REST 결합</li>
          </ul>
        </div>
        <div>
          <Subheading>UI/UX 구현</Subheading>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>shadcn/ui 커스터마이징·디자인 시스템</li>
            <li>
              Framer Motion, Recharts/Nivo, react-markdown·highlight.js 등 시각화·콘텐츠
              렌더링
            </li>
            <li>Context API 기반 전역 토스트 설계</li>
          </ul>
        </div>
        <div>
          <Subheading>협업 · 코드 품질</Subheading>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>ESLint, Prettier, TypeScript로 컨벤션 유지</li>
            <li>Git 브랜치 전략·코드 리뷰·이슈 트래킹</li>
            <li>Vercel 배포·운영</li>
          </ul>
        </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
        {[
          "React",
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "TanStack Query",
          "Zustand",
          "Axios",
          "WebSocket",
          "shadcn/ui",
          "Framer Motion",
        ].map((t) => (
          <span
            key={t}
            className="rounded-md border border-zinc-200/80 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-300"
          >
            {t}
          </span>
        ))}
        </div>

        <SectionTitle id="education">Education</SectionTitle>
        <ul className="mt-4 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
        <li>
          <strong className="text-foreground">가천대학교 소프트웨어학과</strong>
          <br />
          <span className="text-zinc-500">2022.03 ~ 2026.08 (졸업 예정)</span>
        </li>
        <li>
          <strong className="text-foreground">위례고등학교</strong>
          <br />
          <span className="text-zinc-500">2017.02 ~ 2020.01</span>
        </li>
        </ul>

        <SectionTitle id="prize">Prize</SectionTitle>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
        <li>2024 서울시 AIoT 해커톤 대회 장려상</li>
        <li>제3회 와글와글 해커톤 장려상</li>
        <li>UMC 8기 데모데이 · 퍼퓨온미 최우수상</li>
        <li>
          과학기술정보통신부 대학/기업협력형 SW아카데미 · 가천대 카카오엔터프라이즈
          SW아카데미 표창장
        </li>
        </ul>

        <SectionTitle id="experience">Experience</SectionTitle>
        <p className="mt-2 text-sm font-medium text-foreground">
        총 평균 학점 4.10 / 4.5
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
        <li>ISSR Lab 5기 연구원</li>
        <li>
          2024 동계 AI·SW 해외연수 · UNLV(University of Nevada, Las Vegas) 교환학생
        </li>
        <li>UMC 8기 Web 시니어 과정 수료</li>
        <li>UMC 9기 Web 시니어 과정 수료</li>
        <li>가천대 카카오엔터프라이즈 SW 아카데미 7기 수료</li>
        </ul>

        <SectionTitle id="certificate">Certificate</SectionTitle>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
        <li>정보처리기사 · 2024.07.18</li>
        <li>OPIc IM1 · 2024.10.21</li>
        <li>ADsP · 2025.06.13</li>
        <li>SQLD · 2025.06.27</li>
        </ul>

        <p className="mt-16 text-center text-xs text-zinc-500 dark:text-zinc-500">
        더 자세한 프로젝트는{" "}
        <Link href="/projects" className="text-sky-600 underline-offset-2 hover:underline dark:text-sky-400">
          프로젝트
        </Link>
        · 글은{" "}
        <Link href="/blog" className="text-sky-600 underline-offset-2 hover:underline dark:text-sky-400">
          블로그
        </Link>
        에서 확인할 수 있어요.
        </p>
    </article>
  );
}
