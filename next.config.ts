import type { NextConfig } from "next";
import { build } from "velite";

const isBuild = process.argv.includes("build");

async function ensureVelite() {
  if (!isBuild || process.env.VELITE_STARTED) return;
  process.env.VELITE_STARTED = "1";
  await build({ watch: false, clean: true });
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img1.daumcdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "blog.kakaocdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "t1.daumcdn.net",
        pathname: "/**",
      },
    ],
  },
};

export default async function config(): Promise<NextConfig> {
  await ensureVelite();
  return nextConfig;
}
