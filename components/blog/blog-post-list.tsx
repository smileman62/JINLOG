import type { BlogPost } from "@/lib/blog/types";
import { categoryLabels } from "@/lib/blog/data";

type BlogPostListProps = {
  posts: BlogPost[];
};

function formatPublishedAt(isoDate: string) {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogPostList({ posts }: BlogPostListProps) {
  if (posts.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-zinc-300 px-4 py-12 text-center text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
        이 카테고리에 표시할 글이 없습니다.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-black border-y border-black dark:divide-zinc-400 dark:border-zinc-400">
      {posts.map((post) => (
        <li key={post.id} className="group px-2 sm:px-4">
          <article className="relative cursor-pointer py-7 transition-colors">
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              <span className="inline-flex rounded-md bg-zinc-100 px-2 py-0.5 font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                {categoryLabels[post.category]}
              </span>
            </div>
            <h2 className="mt-3 text-lg font-semibold leading-snug text-foreground">
              {post.title}
            </h2>
            <div className="mt-1 flex flex-wrap items-center gap-x-1 gap-y-1 text-sm text-zinc-500 dark:text-zinc-400">
              <time dateTime={post.publishedAt} className="text-sm">
                {formatPublishedAt(post.publishedAt)}
              </time>
              <span className="text-zinc-300 dark:text-zinc-600" aria-hidden>
                ·
              </span>
              <span className="text-xs text-zinc-600 dark:text-zinc-300">
                댓글 {post.commentCount}개
              </span>
            </div>
            <p
              className="pointer-events-none absolute bottom-6 right-0 whitespace-nowrap text-[11px] font-medium leading-none text-sky-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:text-xs dark:text-sky-400"
              aria-hidden
            >
              자세히 보기<span className="ml-0.5">&gt;</span>
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}
