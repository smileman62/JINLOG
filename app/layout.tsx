import type { Metadata } from "next";
import { Gaegu, Geist_Mono, Space_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

function getSiteUrl() {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    "https://jinlog.vercel.app";
  const withProtocol = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
  return new URL(withProtocol);
}

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

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: "JINLOG",
    template: "%s · JINLOG",
  },
  description: "개인 블로그와 프로젝트 기록",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "JINLOG",
    description: "개인 블로그와 프로젝트 기록",
    url: "/",
    siteName: "JINLOG",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JINLOG",
    description: "개인 블로그와 프로젝트 기록",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${geistMono.variable} ${gaegu.variable} ${spaceMono.variable}`}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
