import Image from "next/image";

type BlogHeroProps = {
  imageSrc: string;
  categoryLabel: string;
  postCount: number;
};

export function BlogHero({ imageSrc, categoryLabel, postCount }: BlogHeroProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-sm border border-zinc-200/80 dark:border-zinc-800/80">
      <div className="relative aspect-[16/4] w-full">
        <Image
          src={imageSrc}
          alt={`${categoryLabel} 카테고리 배경 이미지`}
          fill
          priority
          sizes="(max-width: 1152px) 100vw, 1152px"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25"
          aria-hidden
        />
        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
          <p className="text-xs font-medium uppercase tracking-wider text-white/75 sm:text-sm">
            카테고리
          </p>
          <h1 className="mt-0.5 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {categoryLabel}
          </h1>
          <p className="mt-1 text-sm text-white/90 sm:text-base">
            이 카테고리 글 <span className="font-semibold text-white">{postCount}</span>개
          </p>
        </div>
      </div>
    </div>
  );
}
