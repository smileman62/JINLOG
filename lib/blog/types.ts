export type PostCategory = "react" | "nextjs";

export type BlogCategoryFilter = "all" | PostCategory;

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  cover?: string;
  category: PostCategory;
  publishedAt: string;
  body: string;
};
