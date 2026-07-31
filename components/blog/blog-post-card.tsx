import type { BlogPost } from "@/lib/blog/types";
import Image from "next/image";
import Link from "next/link";
import { categoryHeroImage, categoryLabels } from "@/lib/blog/constants";
import { estimateReadingMinutes, formatDateDot } from "@/lib/blog/format";

type BlogPostCardProps = {
  post: BlogPost;
};

export function BlogPostCard({ post }: BlogPostCardProps) {
  const coverSrc = post.cover ?? categoryHeroImage[post.category];
  const readMinutes = estimateReadingMinutes(post.body);

  return (
    <article className="group overflow-hidden rounded-[20px] border border-zinc-200/80 bg-white shadow-[0_8px_24px_rgba(15,15,15,0.06)] dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={coverSrc}
            alt={`${post.title} 썸네일`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute top-[12px] right-[12px] rounded-full bg-white/95 px-[10px] py-[5px] text-[11px] font-semibold text-zinc-700 shadow-sm dark:bg-zinc-900/90 dark:text-zinc-200">
            {categoryLabels[post.category]}
          </span>
        </div>

        <div className="flex flex-col gap-[10px] p-[16px] sm:p-[18px]">
          <h3 className="line-clamp-2 text-[16px] leading-snug font-bold tracking-[-0.02em] text-foreground sm:text-[17px]">
            {post.title}
          </h3>
          <p className="line-clamp-2 text-[13px] leading-relaxed text-zinc-500 dark:text-zinc-400">
            {post.description}
          </p>
          <div className="mt-[4px] flex flex-wrap items-center gap-[8px] text-[11px] text-zinc-400 dark:text-zinc-500">
            <span>{categoryLabels[post.category]}</span>
            <span aria-hidden>·</span>
            <span>{readMinutes}분</span>
            <span aria-hidden>·</span>
            <time dateTime={post.publishedAt}>{formatDateDot(post.publishedAt)}</time>
          </div>
        </div>
      </Link>
    </article>
  );
}
