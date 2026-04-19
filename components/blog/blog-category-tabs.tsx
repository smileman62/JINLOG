import Link from "next/link";
import type { BlogCategoryFilter } from "@/lib/blog/types";
import { categoryLabels } from "@/lib/blog/data";

const tabs: { key: BlogCategoryFilter; query: string }[] = [
  { key: "all", query: "all" },
  { key: "react", query: "react" },
  { key: "nextjs", query: "nextjs" },
];

type BlogCategoryTabsProps = {
  active: BlogCategoryFilter;
};

export function BlogCategoryTabs({ active }: BlogCategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="블로그 카테고리">
      {tabs.map(({ key, query }) => {
        const isActive = active === key;
        const href = query === "all" ? "/blog" : `/blog?category=${query}`;
        return (
          <Link
            key={key}
            href={href}
            scroll={false}
            role="tab"
            aria-selected={isActive}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            {categoryLabels[key]}
          </Link>
        );
      })}
    </div>
  );
}
