import { HomePageBackground } from "@/components/home/home-page-background";
import layoutStyles from "@/components/home/home-layout.module.css";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={layoutStyles.homeShell}>
      <HomePageBackground />
      <main
        className={`${layoutStyles.main} mx-auto flex h-full w-full max-w-7xl min-h-0 flex-1 flex-col px-4 sm:px-8 lg:px-16`}
      >
        {children}
      </main>
    </div>
  );
}
