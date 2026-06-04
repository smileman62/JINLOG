import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { HomeProfile } from "@/components/home/home-profile";
import { homePageJsonLd } from "@/lib/seo";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "김진성 | React·Next.js 프론트엔드 개발자",
  description:
    "프론트엔드 개발자 김진성(JINLOG) 소개. React, Next.js, TypeScript 기술 블로그와 프로젝트 포트폴리오.",
  keywords: [
    "김진성",
    "프론트엔드 개발자",
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
    title: `김진성 | React·Next.js 프론트엔드 개발자 · ${siteName}`,
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
      <section
        className="flex items-center justify-center left-1/2 w-screen bg-[#f8f3e8]"
        style={{
          minHeight: "calc(100dvh - 56px)",
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(180,140,80,.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(160,120,60,.05) 0%, transparent 40%), linear-gradient(#ddd4c0 1px, transparent 1px), linear-gradient(90deg, #ddd4c0 1px, transparent 1px)",
          backgroundSize: "100% 100%, 100% 100%, 28px 28px, 28px 28px",
        }}
      >
        <HomeProfile />
      </section>
    </>
  );
}
