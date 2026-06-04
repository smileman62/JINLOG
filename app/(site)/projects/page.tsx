import type { Metadata } from "next";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "프로젝트",
  description: "프론트엔드 개발자 김진성(JINLOG)의 사이드 프로젝트와 포트폴리오.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: `프로젝트 · ${siteName}`,
    description: "김진성의 프로젝트 모음",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        프로젝트
      </h1>
      <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
        작업한 프로젝트 카드나 링크를 이 영역에 모아두면 됩니다.
      </p>
    </div>
  );
}
