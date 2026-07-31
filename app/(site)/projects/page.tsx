import type { Metadata } from "next";
import { ProjectsShowcase } from "@/components/projects/projects-showcase";
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
  return <ProjectsShowcase projects={projects} />;
}
