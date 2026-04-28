import type { MetadataRoute } from "next";

function getSiteOrigin() {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    "https://jinlog.vercel.app";
  return rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
}

export default function robots(): MetadataRoute.Robots {
  const siteOrigin = getSiteOrigin();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteOrigin}/sitemap.xml`,
    host: siteOrigin,
  };
}
