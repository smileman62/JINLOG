import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { HomeHero } from "@/components/home/home-hero";
import { homePageJsonLd } from "@/lib/seo";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Frontend Developer 김진성",
  description:
    "프론트엔드 개발자 김진성(JINLOG) 소개. React, Next.js, TypeScript 기술 블로그와 프로젝트 포트폴리오.",
  keywords: [
    "김진성",
    "프론트엔드 개발자",
    "Frontend Developer",
    "JINLOG",
    "React",
    "Next.js",
    "TypeScript",
    "개발자 포트폴리오",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `Frontend Developer 김진성 · ${siteName}`,
    description:
      "프론트엔드 개발자 김진성 소개. React·Next.js 생태계를 탐구하며 배운 것을 기록합니다.",
    url: "/",
    type: "profile",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={homePageJsonLd()} />
      <HomeHero />
    </>
  );
}
