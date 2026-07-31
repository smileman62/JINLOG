import type { Metadata } from "next";
import { BlogCategoryTabs } from "@/components/blog/blog-category-tabs";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogPagination } from "@/components/blog/blog-pagination";
import { BlogPostList } from "@/components/blog/blog-post-list";
import { JsonLd } from "@/components/seo/json-ld";
import {
  categoryHeroImage,
  categoryLabels,
  POSTS_PER_PAGE,
} from "@/lib/blog/constants";
import {
  filterPostsByCategory,
  getAllPosts,
  paginatePosts,
  parseCategoryFilter,
  parsePage,
} from "@/lib/blog/data";
import { blogPostsPageJsonLd } from "@/lib/seo";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "전체 글 | React·Next.js 기술 글",
  description:
    "김진성(JINLOG)의 React, Next.js, TypeScript 학습·프로젝트 기록. 프론트엔드 개발 블로그 글 목록.",
  keywords: [
    "김진성 블로그",
    "JINLOG",
    "React 블로그",
    "Next.js 블로그",
    "프론트엔드",
    "TypeScript",
  ],
  alternates: {
    canonical: "/blog/posts",
  },
  openGraph: {
    title: `전체 글 · ${siteName}`,
    description:
      "React, Next.js, TypeScript를 다루는 김진성의 기술 블로그.",
    url: "/blog/posts",
    type: "website",
  },
};

function firstString(
  value: string | string[] | undefined,
): string | undefined {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value[0];
  return undefined;
}

export default async function BlogPostsPage(
  props: PageProps<"/blog/posts">,
) {
  const searchParams = await props.searchParams;
  const category = parseCategoryFilter(firstString(searchParams.category));
  const requestedPage = parsePage(firstString(searchParams.page));

  const filtered = filterPostsByCategory(getAllPosts(), category);
  const { items, totalPages, page } = paginatePosts(
    filtered,
    requestedPage,
    POSTS_PER_PAGE,
  );

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <JsonLd data={blogPostsPageJsonLd()} />
      <BlogHero
        imageSrc={categoryHeroImage[category]}
        categoryLabel={categoryLabels[category]}
        postCount={filtered.length}
      />
      <BlogCategoryTabs active={category} />
      <BlogPostList posts={items} />
      <BlogPagination
        category={category}
        page={page}
        totalPages={totalPages}
      />
    </div>
  );
}
