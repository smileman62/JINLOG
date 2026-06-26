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
    <div className="mx-auto max-w-5xl">
      <ProjectCarousel projects={projects} />
    </div>
  );
}
