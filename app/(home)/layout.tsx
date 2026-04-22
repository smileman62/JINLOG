import { SiteHeader } from "@/components/site-header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <SiteHeader />
      <main className="w-full flex-1">{children}</main>
    </div>
  );
}
