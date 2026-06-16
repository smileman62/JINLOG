import type { ComponentPropsWithoutRef } from "react";
import * as runtime from "react/jsx-runtime";
import Link from "next/link";

const mdxComponentCache = new Map<
  string,
  React.ComponentType<{ components?: Record<string, React.ComponentType> }>
>();

function getMDXComponent(code: string) {
  let Component = mdxComponentCache.get(code);
  if (!Component) {
    Component = (
      new Function(code)({ ...runtime }) as {
        default: React.ComponentType<{
          components?: Record<string, React.ComponentType>;
        }>;
      }
    ).default;
    mdxComponentCache.set(code, Component);
  }
  return Component;
}

function isBlockCode(className?: string) {
  return Boolean(className?.includes("language-"));
}

const sharedComponents = {
  a: ({ href, children, ...props }: ComponentPropsWithoutRef<"a">) => {
    if (href?.startsWith("/")) {
      return (
        <Link
          href={href}
          className="font-medium text-sky-600 underline-offset-2 hover:underline dark:text-sky-400"
          {...props}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-sky-600 underline-offset-2 hover:underline dark:text-sky-400"
        {...props}
      >
        {children}
      </a>
    );
  },
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1
      className="mb-10 scroll-mb-20 text-2xl font-bold tracking-tight first:mb-0 sm:text-3xl"
      {...props}
    />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-14 mb-3.5 scroll-mb-20 text-xl font-bold tracking-tight first:mb-0 first:border-t-0 first:pt-0 sm:text-2xl dark:border-zinc-800"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="mb-8 scroll-mb-20 text-lg font-semibold tracking-tight sm:text-xl"
      {...props}
    />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4 className="mb-6 scroll-mb-20 text-base font-semibold" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mb-7 leading-6 text-zinc-700 dark:text-zinc-300" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="mb-7 list-disc space-y-1 pl-8 text-zinc-700 dark:text-zinc-300"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="mb-7 list-decimal space-y-1 pl-6 text-zinc-700 dark:text-zinc-300"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="leading-7" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-6 border-l-4 border-sky-500/70 bg-zinc-50 py-3 pl-4 pr-3 text-[0.95rem] leading-relaxed text-zinc-600 dark:border-sky-400/60 dark:bg-zinc-900/50 dark:text-zinc-300 [&_p]:m-0 [&_ul]:m-0"
      {...props}
    />
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr className="my-19 border-zinc-200 dark:border-zinc-800" {...props} />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="mb-6 overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table
        className="w-full min-w-[280px] border-collapse text-left text-sm"
        {...props}
      />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<"thead">) => (
    <thead className="bg-zinc-50 dark:bg-zinc-900/60" {...props} />
  ),
  tbody: (props: ComponentPropsWithoutRef<"tbody">) => (
    <tbody
      className="[&_tr:last-child_td]:border-b-0 [&_tr:last-child_th]:border-b-0"
      {...props}
    />
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      className="border-b border-r border-zinc-200 px-4 py-2.5 font-semibold text-zinc-900 last:border-r-0 dark:border-zinc-800 dark:text-zinc-100"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td
      className="border-b border-r border-zinc-200 px-4 py-2.5 text-zinc-700 last:border-r-0 dark:border-zinc-800 dark:text-zinc-300"
      {...props}
    />
  ),
  tr: (props: ComponentPropsWithoutRef<"tr">) => (
    <tr
      className="even:bg-zinc-50/60 dark:even:bg-zinc-900/30"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => <pre {...props} />,
  code: ({
    className,
    children,
    ...props
  }: ComponentPropsWithoutRef<"code">) => {
    if (isBlockCode(className)) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="mr-1 px-1 p-0.5 rounded-sm bg-sky-50 font-mono text-[0.875em] text-sky-800 dark:bg-sky-950/50 dark:text-sky-300"
        {...props}
      >
        {children}
      </code>
    );
  },
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong
      className="font-semibold text-zinc-900 dark:text-zinc-100"
      {...props}
    />
  ),
};

type MDXContentProps = {
  code: string;
};

export function MDXContent({ code }: MDXContentProps) {
  const Component = getMDXComponent(code);
  return <Component components={sharedComponents} />;
}
