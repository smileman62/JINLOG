import { absoluteUrl, siteDescription, siteName } from "./site";

const personId = () => `${absoluteUrl("/")}#person`;
const websiteId = () => `${absoluteUrl("/")}#website`;
const blogId = () => `${absoluteUrl("/blog")}#blog`;

export function homePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId(),
        url: absoluteUrl("/"),
        name: siteName,
        description: siteDescription,
        inLanguage: "ko-KR",
        publisher: { "@id": personId() },
      },
      {
        "@type": "Person",
        "@id": personId(),
        name: "김진성",
        alternateName: "KIM JINSEONG",
        jobTitle: "프론트엔드 개발자",
        url: absoluteUrl("/"),
        sameAs: [
          "https://github.com/smileman62",
          "https://jskim6335.tistory.com/",
        ],
      },
    ],
  };
}

export function blogPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": blogId(),
    url: absoluteUrl("/blog"),
    name: `${siteName} 블로그`,
    description:
      "React, Next.js, TypeScript를 다루는 김진성의 기술 블로그 글 목록.",
    inLanguage: "ko-KR",
    author: { "@id": personId() },
    isPartOf: { "@id": websiteId() },
  };
}
