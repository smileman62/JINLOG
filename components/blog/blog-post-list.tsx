import type { BlogPost } from "@/lib/blog/types";
import { categoryLabels } from "@/lib/blog/data";

type BlogPostListProps = {
  posts: BlogPost[];
};

export function BlogPostList({ posts }: BlogPostListProps) {
  if (posts.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-zinc-300 px-4 py-12 text-center text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
        이 카테고리에 표시할 글이 없습니다.
      </p>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {posts.map((post) => (
        <li key={post.id}>
          <article className="flex h-full flex-col rounded-xl border border-zinc-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-950/40">
            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="rounded-md bg-zinc-100 px-2 py-0.5 font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                {categoryLabels[post.category]}
              </span>
              <time dateTime={post.publishedAt}>{post.publishedAt}</time>
            </div>
            <h2 className="mt-3 text-lg font-semibold leading-snug text-foreground">
              {post.title}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {post.excerpt}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}
