import type { ReactNode } from "react";
import Link from "next/link";
import type { BlogCategoryFilter } from "@/lib/blog/types";
import { blogListUrl } from "@/lib/blog/url";

type BlogPaginationProps = {
  category: BlogCategoryFilter;
  page: number;
  totalPages: number;
};

export function BlogPagination({ category, page, totalPages }: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="flex justify-center pt-10"
      aria-label="블로그 페이지"
    >
      <ul className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
        <li>
          <PaginationLink
            href={page > 1 ? blogListUrl(category, page - 1) : undefined}
            label="이전 페이지"
            disabled={page <= 1}
          >
            이전
          </PaginationLink>
        </li>
        {pages.map((p) => (
          <li key={p}>
            <PaginationLink
              href={p === page ? undefined : blogListUrl(category, p)}
              label={`${p}페이지`}
              active={p === page}
            >
              {p}
            </PaginationLink>
          </li>
        ))}
        <li>
          <PaginationLink
            href={page < totalPages ? blogListUrl(category, page + 1) : undefined}
            label="다음 페이지"
            disabled={page >= totalPages}
          >
            다음
          </PaginationLink>
        </li>
      </ul>
    </nav>
  );
}

function PaginationLink({
  href,
  label,
  children,
  disabled,
  active,
}: {
  href?: string;
  label: string;
  children: ReactNode;
  disabled?: boolean;
  active?: boolean;
}) {
  const className = `inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors ${
    active
      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
      : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
  } ${disabled ? "pointer-events-none opacity-40" : ""}`;

  if (!href || disabled || active) {
    return (
      <span
        className={className}
        aria-current={active ? "page" : undefined}
        aria-label={label}
      >
        {children}
      </span>
    );
  }

  return (
    <Link href={href} scroll={false} className={className} aria-label={label}>
      {children}
    </Link>
  );
}
