import type { Metadata } from "next";
import { ProjectCarousel } from "@/components/projects/project-carousel";
import { projects } from "@/lib/projects/data";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "프론트엔드 개발자 김진성(JINLOG)의 사이드 프로젝트와 포트폴리오.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: `Projects · ${siteName}`,
    description: "김진성의 프로젝트 모음",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <header className="text-center">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Projects
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-500 sm:text-base dark:text-zinc-400">
          마음모음, DKaffeine, MCP Hub, PerfumeOnMe 등
          <br className="hidden sm:block" />
          직접 참여한 프로젝트입니다.
        </p>
      </header>

      <ProjectCarousel projects={projects} />
    </div>
  );
}
