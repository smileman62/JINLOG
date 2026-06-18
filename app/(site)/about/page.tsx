import type { Metadata } from "next";
import { AboutProfile } from "@/components/about/about-profile";
import { JsonLd } from "@/components/seo/json-ld";
import { homePageJsonLd } from "@/lib/seo";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "프론트엔드 개발자 김진성(JINLOG) 소개. 활동, 경험, 강점, 기술 스택.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About · ${siteName}`,
    description:
      "프론트엔드 개발자 김진성 소개. React·Next.js 생태계를 탐구하며 배운 것을 기록합니다.",
    url: "/about",
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <div className="pt-4 sm:pt-8">
      <JsonLd data={homePageJsonLd()} />
      <AboutProfile />
    </div>
  );
}
