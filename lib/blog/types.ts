export type PostCategory = "react" | "nextjs";

export type BlogCategoryFilter = "all" | PostCategory;

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: PostCategory;
  publishedAt: string;
};
