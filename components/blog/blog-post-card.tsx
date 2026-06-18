import type { BlogPost } from "@/lib/blog/types";
import Image from "next/image";
import Link from "next/link";
import { categoryHeroImage, categoryLabels } from "@/lib/blog/constants";
import { estimateReadingMinutes } from "@/lib/blog/format";

type BlogPostCardProps = {
  post: BlogPost;
};

export function BlogPostCard({ post }: BlogPostCardProps) {
  const coverSrc = post.cover ?? categoryHeroImage[post.category];
  const readMinutes = estimateReadingMinutes(post.body);

  return (
    <article className="group">
      <Link
        href={`/blog/${post.slug}`}
        className="block overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900"
      >
        <div className="relative aspect-16/10 w-full">
          <Image
            src={coverSrc}
            alt={`${post.title} 썸네일`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </Link>
      <div className="mt-3 space-y-1.5">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {categoryLabels[post.category]} · {readMinutes}분
        </p>
        <h3 className="text-base leading-snug font-semibold text-foreground">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>
      </div>
    </article>
  );
}
