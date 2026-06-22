export type HeroCursorPhoto = {
  src: string;
  alt: string;
  left: string;
  top: string;
  size: number;
  rotate: number;
};

export const heroCursorPhotos: HeroCursorPhoto[] = [
  { src: "/react.png", alt: "React", left: "4%", top: "10%", size: 78, rotate: -10 },
  { src: "/typescript.png", alt: "TypeScript", left: "86%", top: "8%", size: 72, rotate: 12 },
  { src: "/gojo.png", alt: "", left: "16%", top: "24%", size: 68, rotate: 8 },
  { src: "/profile.png", alt: "김진성", left: "78%", top: "22%", size: 92, rotate: -8 },
  { src: "/helldivers2.png", alt: "", left: "8%", top: "66%", size: 74, rotate: 6 },
  { src: "/mariomushroom.png", alt: "", left: "82%", top: "70%", size: 66, rotate: -8 },
  { src: "/steve.png", alt: "", left: "24%", top: "80%", size: 70, rotate: 5 },
  { src: "/naruto.png", alt: "", left: "62%", top: "84%", size: 68, rotate: -12 },
];

export const PHOTO_REVEAL_RADIUS = 150;
