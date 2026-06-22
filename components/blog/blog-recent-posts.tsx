import type { BlogPost } from "@/lib/blog/types";
import Link from "next/link";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import enter from "@/components/blog/blog-enter.module.css";

type BlogRecentPostsProps = {
  posts: BlogPost[];
};

export function BlogRecentPosts({ posts }: BlogRecentPostsProps) {
  return (
    <section className="mt-16 sm:mt-20">
      <div
        className={`mb-6 flex items-end justify-between gap-4 ${enter.enter}`}
        style={{ animationDelay: "0.32s" }}
      >
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          최근 글
        </h2>
        <Link
          href="/blog/posts"
          className="shrink-0 text-sm text-zinc-500 transition-colors hover:text-foreground dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          전체글 <span aria-hidden>&gt;</span>
        </Link>
      </div>
      {posts.length === 0 ? (
        <p
          className={`rounded-xl border border-dashed border-zinc-300 px-4 py-10 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400 ${enter.enter}`}
          style={{ animationDelay: "0.4s" }}
        >
          Featured를 제외하고 표시할 다른 글이 아직 없습니다.
        </p>
      ) : (
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <li
              key={post.slug}
              className={enter.enter}
              style={{ animationDelay: `${0.4 + index * 0.08}s` }}
            >
              <BlogPostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
