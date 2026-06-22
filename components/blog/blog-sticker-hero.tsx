import Link from "next/link";
import enter from "./blog-enter.module.css";
import styles from "./blog-sticker-hero.module.css";

type BlogStickerHeroProps = {
  nowWritingTitle?: string;
};

export function BlogStickerHero({ nowWritingTitle }: BlogStickerHeroProps) {
  return (
    <div className={styles.row}>
      <div
        className={`${styles.sticker} ${styles.name} ${enter.enter} rounded-[18px] bg-[#141414] px-6 py-6 text-white sm:px-7 sm:py-7`}
        style={{ animationDelay: "0.06s" }}
      >
        <div className={styles.nameInner}>
          <div className="min-w-0">
            <div className="text-xs tracking-[0.2em] text-zinc-500 sm:text-sm">
              KIM JINSEONG · FRONTEND
            </div>
            <h1 className="mt-3 text-2xl font-black leading-[1.1] sm:text-3xl lg:text-4xl">
              <span className="text-[#0b89ff]">안녕하세요,</span>
              <br />
              <span className="text-[#00e768] [text-shadow:0_0_16px_rgba(0,231,104,0.45)]">
                개발자
              </span>
              <br />
              김진성입니다
            </h1>
          </div>

          <div className={styles.actions}>
            <Link
              href="/blog/posts"
              className="inline-flex w-fit items-center rounded-full bg-[#01ccff] px-4 py-2 text-xs font-bold text-zinc-900 transition-transform hover:scale-105 sm:text-sm"
            >
              글 보러가기 →
            </Link>
            <a
              href="https://github.com/smileman62"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center rounded-full border border-zinc-600 px-4 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-400 hover:text-white sm:text-sm"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </div>

      <div
        className={`${styles.sticker} ${styles.now} ${enter.enter} rounded-xl bg-[#1a1a2e] px-4 py-3 text-white`}
        style={{ animationDelay: "0.14s" }}
      >
        <div className="text-xs tracking-[0.12em] text-[#c9f135] sm:text-sm">
          ✦ NOW WRITING
        </div>
        <div className="mt-1 line-clamp-3 text-sm font-bold leading-relaxed sm:text-base">
          {nowWritingTitle ?? "React · Next.js 기술 블로그"}
        </div>
        <div className="mt-2 h-[3px] overflow-hidden rounded bg-white/10">
          <div
            className={`${styles.progressBar} h-full rounded bg-linear-to-r from-[#c9f135] to-[#9bf800]`}
          />
        </div>
      </div>
    </div>
  );
}
