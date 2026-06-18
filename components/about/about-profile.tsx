import {
  aboutContacts,
  aboutIntro,
  aboutStrengths,
  aboutStudying,
  aboutTimeline,
} from "@/lib/about/data";
import { AboutAvatar } from "@/components/about/about-avatar";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
      {children}
    </h2>
  );
}

export function AboutProfile() {
  return (
    <div className="mx-auto max-w-3xl space-y-16 pb-8 sm:space-y-20">
      {/* 프로필: 사진 + 소개 */}
      <section className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-10">
        <AboutAvatar />
        <div className="flex flex-col gap-4">
          <div className="flex items-end gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {aboutIntro.name}
              </h1>
              <p className="-mb-1 text-xl font-medium text-zinc-500 dark:text-zinc-400">
                {aboutIntro.role}
              </p>
            </div>
          <div className="min-w-0 flex-1 space-y-3 text-center sm:text-left">
            
            {aboutIntro.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 28)}
                className="text-sm leading-[1.85] text-zinc-600 dark:text-zinc-400"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Activity */}
      <section className="space-y-8">
        <SectionHeading>Education &amp; Activity</SectionHeading>
        <ul className="space-y-8">
          {aboutTimeline.map((item) => (
            <li key={`${item.title}-${item.period}`} className="space-y-1.5">
              <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                {item.period}
              </p>
              <h3 className="text-base font-bold text-foreground sm:text-lg">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                {item.subtitle}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Strengths */}
      <section className="space-y-8">
        <SectionHeading>Strengths</SectionHeading>
        <ul className="grid gap-5 sm:grid-cols-2 sm:gap-6">
          {aboutStrengths.map((item) => (
            <li
              key={item.title}
              className="rounded-xl bg-zinc-50 px-5 py-5 dark:bg-zinc-900/60"
            >
              <h3 className="text-sm font-bold text-foreground sm:text-base">
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm leading-[1.75] text-zinc-500 dark:text-zinc-400">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Currently Studying */}
      <section className="space-y-6">
        <SectionHeading>Currently Studying</SectionHeading>
        <ul className="flex flex-wrap gap-2.5">
          {aboutStudying.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-zinc-200 bg-background px-3.5 py-1.5 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Contact */}
      <section className="space-y-6 border-t border-zinc-200 pt-12 dark:border-zinc-800">
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          <span className="text-zinc-400 dark:text-zinc-500">#</span> Contact
        </h2>
        <ul className="flex flex-wrap gap-3">
          {aboutContacts.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:text-foreground dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
