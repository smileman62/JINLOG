export const rainStickerSources = [
  "/apple.png",
  "/BT.png",
  "/corn.png",
  "/diamondSword.png",
  "/fineMeal.png",
  "/gojo.png",
  "/helldivers1.png",
  "/helldivers2.png",
  "/ironPickaxe.png",
  "/LavishMeal.png",
  "/mariomushroom.png",
  "/Muffalo.png",
  "/naruto.png",
  "/narutoTomo.png",
  "/potato.png",
  "/react.png",
  "/simpleMeal.png",
  "/steve.png",
  "/typescript.png",
];

export type RainSticker = {
  id: number;
  src: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  rotate: number;
  opacity: number;
};

export function shuffle<T>(items: T[]) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function createRainSticker(id: number, src: string): RainSticker {
  return {
    id,
    src,
    left: 2 + Math.random() * 80,
    size: 50 + Math.random() * 20,
    duration: 20 + Math.random() * 50,
    delay: Math.random() * 12,
    drift: -14 + Math.random() * 28,
    rotate: -10 + Math.random() * 20,
    opacity: 0.15 + Math.random() * 0.18,
  };
}

export function pickRandomSource(excluding: Set<string>) {
  const available = rainStickerSources.filter((src) => !excluding.has(src));
  const pool = available.length > 0 ? available : rainStickerSources;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function createInitialRainStickers(count = 8) {
  const shuffledSources = shuffle(rainStickerSources);
  return Array.from({ length: count }, (_, idx) =>
    createRainSticker(idx, shuffledSources[idx % shuffledSources.length]),
  );
}
