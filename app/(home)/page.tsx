import type { Metadata } from "next";
import { HomeProfile } from "@/components/home/home-profile";

export const metadata: Metadata = {
  title: "소개",
  description: "김진성 — 프론트엔드 개발자 소개, 프로젝트 및 경력",
};

export default function HomePage() {
  return (
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
  );
}
