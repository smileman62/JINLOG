import type { Metadata } from "next";
import { ThemeProvider } from "@wrksz/themes/next";
import { SiteHeader } from "@/components/site-header";
import { DM_Sans, Gaegu, Geist_Mono, Noto_Serif_KR, Space_Mono, Syne } from "next/font/google";
import { getSiteUrl, siteDescription, siteName } from "@/lib/site";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const gaegu = Gaegu({
  variable: "--font-gaegu",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const notoSerifKr = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: `${siteName} | 김진성 프론트엔드 개발자`,
    template: `%s · ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "JINLOG",
    "김진성",
    "프론트엔드",
    "React",
    "Next.js",
    "TypeScript",
    "개발 블로그",
  ],
  openGraph: {
    title: `${siteName} | 김진성 프론트엔드 개발자`,
    description: siteDescription,
    siteName,
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | 김진성 프론트엔드 개발자`,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
      "opxNdeNCNwJIc4fLIfNnmpJBdJsOKq7s2aMs5oqP0A8",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${geistMono.variable} ${gaegu.variable} ${spaceMono.variable} ${dmSans.variable} ${syne.variable} ${notoSerifKr.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-dvh flex-col">
            <SiteHeader />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
