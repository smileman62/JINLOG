import { StickerRain } from "@/components/sticker-rain/sticker-rain";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StickerRain />
      <div className="relative z-10">{children}</div>
    </>
  );
}
