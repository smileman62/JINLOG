import type { BlogPost } from "@/lib/blog/types";
import Link from "next/link";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import enter from "@/components/blog/blog-enter.module.css";

type BlogRecentPostsProps = {
  posts: BlogPost[];
};

function ViewMoreButton({ className }: { className?: string }) {
  return (
    <Link
      href="/blog/posts"
      className={`inline-flex min-h-[48px] items-center justify-center gap-[8px] rounded-full border border-zinc-300 bg-white px-[22px] text-[14px] font-semibold text-zinc-800 shadow-[0_8px_24px_rgba(15,15,15,0.06)] transition-[transform,background,border-color] duration-200 hover:scale-[1.02] hover:border-zinc-400 hover:bg-zinc-50 md:min-h-[52px] md:gap-[10px] md:px-[28px] md:text-[15px] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-500 dark:hover:bg-zinc-800 ${className ?? ""}`}
    >
      <span aria-hidden className="text-[18px]">
        ▦
      </span>
      더 많은 글 보기 →
    </Link>
  );
}

export function BlogRecentPosts({ posts }: BlogRecentPostsProps) {
  return (
    <section className="mt-[24px] sm:mt-[56px]">
      <div
        className={`mb-[20px] flex flex-col gap-[14px] md:flex-row md:items-center md:justify-between md:gap-[16px] ${enter.enter}`}
        style={{ animationDelay: "0.18s" }}
      >
        <ViewMoreButton className="w-full md:order-2 md:w-auto" />
        <h2 className="text-[22px] font-bold tracking-tight text-foreground md:order-1 sm:text-[24px]">
          최근 글
        </h2>
      </div>

      {posts.length === 0 ? (
        <p
          className={`rounded-xl border border-dashed border-zinc-300 px-4 py-10 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400 ${enter.enter}`}
          style={{ animationDelay: "0.24s" }}
        >
          Featured를 제외하고 표시할 다른 글이 아직 없습니다.
        </p>
      ) : (
        <ul className="grid gap-[20px] sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <li
              key={post.slug}
              className={enter.enter}
              style={{ animationDelay: `${0.22 + index * 0.06}s` }}
            >
              <BlogPostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
