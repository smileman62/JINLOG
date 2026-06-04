/** 프로덕션 기본 URL — Vercel env 미설정 시 fallback */
export const DEFAULT_SITE_URL = "https://jinlog-zeta.vercel.app";

export const siteName = "JINLOG";

export const siteDescription =
  "김진성의 프론트엔드 개발 블로그. React, Next.js, TypeScript 학습과 프로젝트 기록.";

export function resolveSiteUrl(): string {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    DEFAULT_SITE_URL;
  return rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
}

export function getSiteUrl(): URL {
  return new URL(resolveSiteUrl());
}

export function absoluteUrl(path: string): string {
  const base = resolveSiteUrl().replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
