import type { BlogPost } from "@/lib/blog/types";
import Image from "next/image";
import Link from "next/link";
import enter from "@/components/blog/blog-enter.module.css";
import { categoryHeroImage, categoryLabels } from "@/lib/blog/constants";
import { formatDateDot } from "@/lib/blog/format";

type BlogFeaturedPostProps = {
  post: BlogPost;
};

export function BlogFeaturedPost({ post }: BlogFeaturedPostProps) {
  const coverSrc = post.cover ?? categoryHeroImage[post.category];

  return (
    <section
      className={`flex flex-col gap-4 ${enter.enter}`}
      style={{ animationDelay: "0.22s" }}
    >
      <p className="text-xs font-medium tracking-[0.2em] text-zinc-400 uppercase dark:text-zinc-500">
        Featured
      </p>

      <div className="flex flex-row items-start justify-start min-w-0 gap-8 lg:flex-row lg:items-start lg:gap-12">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <h1 className="font-serif text-3xl leading-tight font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            {post.title}
          </h1>
          <p className="text-base leading-relaxed text-zinc-500 sm:text-lg dark:text-zinc-400">
            {post.description}
          </p>
          <span className="inline-flex w-fit rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            {categoryLabels[post.category]}
          </span>
          <Link
            href={`/blog/${post.slug}`}
            className="mt-2 inline-flex w-fit items-center gap-1 text-sm font-semibold text-foreground transition-opacity hover:opacity-70"
          >
            계속 읽기
            <span aria-hidden>→</span>
          </Link>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="group relative block aspect-3/2 w-[50%] shrink-0 overflow-hidden rounded-2xl bg-zinc-100 lg:aspect-4/3 lg:w-[42%] dark:bg-zinc-900"
        > 
          <Image
            src={coverSrc}
            alt={`${post.title} 대표 이미지`}
            fill
            priority
            sizes="(max-width: 720px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <time
            dateTime={post.publishedAt}
            className="absolute right-4 bottom-4 text-xs font-medium text-white/90 drop-shadow-sm"
          >
            {formatDateDot(post.publishedAt)}
          </time>
        </Link>
      </div>
    </section>
  );
}
