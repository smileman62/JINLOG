import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogPostHeader } from "@/components/blog/blog-post-header";
import { MDXContent } from "@/components/blog/mdx-content";
import { allPosts } from "@/lib/blog/data";

type BlogDetailPageProps = {
  params: Promise<{ slug: string[] }>;
};

function getPostBySlug(slugParts: string[]) {
  const joinedSlug = slugParts.join("/");
  return allPosts.find((post) => post.slug === joinedSlug);
}

export async function generateMetadata(
  props: BlogDetailPageProps,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug.split("/"),
  }));
}

export default async function BlogDetailPage(props: BlogDetailPageProps) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        <span aria-hidden>←</span>
        블로그 목록으로
      </Link>

      <div className="mt-6 space-y-8">
        <BlogPostHeader post={post} />

        {post.cover ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-zinc-200 dark:border-zinc-800">
            <Image
              src={post.cover}
              alt={`${post.title} 대표 이미지`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        ) : null}

        <div className="pb-12">
          <MDXContent code={post.body} />
        </div>
      </div>
    </article>
  );
}
