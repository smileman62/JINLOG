import type { Metadata } from "next";
import { HomeProfile } from "@/components/home/home-profile";

export const metadata: Metadata = {
  title: "소개",
  description: "김진성 — 프론트엔드 개발자 소개, 프로젝트 및 경력",
};

export default function HomePage() {
  return <HomeProfile />;
}
