export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <main className="mx-auto w-full max-w-[104rem] flex-1 px-4 py-8 sm:px-8 lg:px-16">
        {children}
      </main>
    </div>
  );
}
