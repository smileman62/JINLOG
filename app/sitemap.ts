import type { MetadataRoute } from "next";

function getSiteOrigin() {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    "https://jinlog.vercel.app";
  return rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteOrigin = getSiteOrigin();
  const now = new Date();

  return [
    {
      url: `${siteOrigin}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteOrigin}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteOrigin}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
