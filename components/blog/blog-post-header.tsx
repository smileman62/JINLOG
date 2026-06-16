import type { BlogPost } from "@/lib/blog/types";
import { categoryLabels } from "@/lib/blog/data";

type BlogPostHeaderProps = {
  post: BlogPost;
};

function formatPublishedAt(isoDate: string) {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogPostHeader({ post }: BlogPostHeaderProps) {
  return (
    <header className="space-y-4 border-b border-zinc-200 pb-8 dark:border-zinc-800">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="inline-flex rounded-md bg-zinc-100 px-2 py-0.5 font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
          {categoryLabels[post.category]}
        </span>
        <time
          dateTime={post.publishedAt}
          className="text-zinc-500 dark:text-zinc-400"
        >
          {formatPublishedAt(post.publishedAt)}
        </time>
      </div>
      <div className="space-y-3">
        <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
          {post.title}
        </h1>
        <p className="text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-300">
          {post.description}
        </p>
      </div>
      {post.tags.length > 0 ? (
        <ul className="flex flex-wrap gap-2" aria-label="태그">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-zinc-200 px-2 py-0.5 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
            >
              #{tag}
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
