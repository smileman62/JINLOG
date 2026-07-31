import { siteName } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-aut">
      <div className="mx-auto flex w-full justify-center items-center max-w-[104rem] flex-col gap-0 px-4 py-2 sm:px-8 sm:py-4 lg:px-16">
        <p className="text-[13px] text-zinc-400 dark:text-zinc-500">
          © {year} {siteName}. All rights reserved.
        </p>
        <p className="break-keep text-[12px] leading-relaxed text-zinc-500 dark:text-zinc-400">
          Designed &amp; developed by 김진성
        </p>
        <p className="text-[12px] break-keep  leading-relaxed text-zinc-500 dark:text-zinc-400">
          Contact : jskim6335@naver.com
        </p>
      </div>
    </footer>
  );
}
