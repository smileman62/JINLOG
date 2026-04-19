import type { Metadata } from "next";
import { BlogCategoryTabs } from "@/components/blog/blog-category-tabs";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogPagination } from "@/components/blog/blog-pagination";
import { BlogPostList } from "@/components/blog/blog-post-list";
import {
  allPosts,
  categoryHeroImage,
  categoryLabels,
  filterPostsByCategory,
  paginatePosts,
  parseCategoryFilter,
  parsePage,
  POSTS_PER_PAGE,
} from "@/lib/blog/data";

export const metadata: Metadata = {
  title: "블로그",
};

function firstString(
  value: string | string[] | undefined,
): string | undefined {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value[0];
  return undefined;
}

export default async function BlogPage(props: PageProps<"/blog">) {
  const searchParams = await props.searchParams;
  const category = parseCategoryFilter(firstString(searchParams.category));
  const requestedPage = parsePage(firstString(searchParams.page));

  const filtered = filterPostsByCategory(allPosts, category);
  const { items, totalPages, page } = paginatePosts(
    filtered,
    requestedPage,
    POSTS_PER_PAGE,
  );

  return (
    <div className="mx-auto max-w-6xl space-y-8">
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
