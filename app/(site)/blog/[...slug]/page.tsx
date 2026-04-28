import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
    <article className="mx-auto max-w-3xl space-y-6">
      <Link
        href="/blog"
        className="inline-block text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        ← 블로그 목록으로
      </Link>
      <header className="space-y-3">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {new Date(post.publishedAt).toLocaleDateString("ko-KR")}
        </p>
        <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
        <p className="text-zinc-600 dark:text-zinc-300">{post.description}</p>
      </header>

      {post.cover ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
          <Image
            src={post.cover}
            alt={`${post.title} 대표 이미지`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      ) : null}

      <section className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-5 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/30 dark:text-zinc-300">
        임시 상세 페이지입니다. 본문 MDX 렌더러는 다음 단계에서 연결할 예정이에요.
      </section>
    </article>
  );
}
