"use client";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import styles from "@/components/home/home-profile.module.css";

const rainStickerSources = [
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

function shuffle<T>(items: T[]) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

type RainSticker = {
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

function createRainSticker(id: number, src: string): RainSticker {
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

function pickRandomSource(excluding: Set<string>) {
  const available = rainStickerSources.filter((src) => !excluding.has(src));
  const pool = available.length > 0 ? available : rainStickerSources;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function HomeProfile() {
  const [isRainEnabled, setIsRainEnabled] = useState(true);
  const [rainStickers, setRainStickers] = useState<RainSticker[]>([]);

  useEffect(() => {
    const shuffledSources = shuffle(rainStickerSources);
    setRainStickers(
      Array.from({ length: 8 }, (_, idx) =>
        createRainSticker(idx, shuffledSources[idx % shuffledSources.length]),
      ),
    );
  }, []);

  const handleStickerCycle = (stickerId: number) => {
    setRainStickers((prev) => {
      const usedSources = new Set(
        prev.filter((item) => item.id !== stickerId).map((item) => item.src),
      );
      const nextSource = pickRandomSource(usedSources);
      return prev.map((item) =>
        item.id === stickerId
          ? {
              ...item,
              src: nextSource,
              opacity: 0.15 + Math.random() * 0.18,
            }
          : item,
      );
    });
  };

  return (
    <section
      className={`${styles.section} w-full px-3 py-6 pb-28 sm:px-6 sm:py-8 sm:pb-32 md:pb-36`}
    >
      {isRainEnabled && (
        <div className={styles.rainLayer} aria-hidden>
          {rainStickers.map((sticker) => (
            <img
              key={sticker.id}
              src={sticker.src}
              alt=""
              className={styles.rainSticker}
              onAnimationIteration={() => handleStickerCycle(sticker.id)}
              style={
                {
                  left: `${sticker.left}%`,
                  width: `${sticker.size}px`,
                  animationDuration: `${sticker.duration}s`,
                  animationDelay: `-${sticker.delay}s`,
                  "--drift-x": `${sticker.drift}px`,
                  "--spin": `${sticker.rotate}deg`,
                  opacity: sticker.opacity,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsRainEnabled((prev) => !prev)}
        className={styles.rainToggle}
        aria-pressed={isRainEnabled}
      >
        {isRainEnabled ? "스티커 비 끄기" : "스티커 비 켜기"}
      </button>

      <div className={styles.board}>
        <div
          className={`${styles.sticker} ${styles.now} rounded-xl bg-[#1a1a2e] px-4 py-3 text-white`}
          style={{ animationDelay: "0.08s" }}
        >
          <div className={styles.tapeSm} />
          <div className="text-xs tracking-[0.12em] text-[#c9f135] md:text-sm lg:text-base">
            ✦ NOW WRITING
          </div>
          <div className="mt-1 text-sm font-bold leading-relaxed md:text-base lg:text-lg xl:text-xl">
            Next.js App Router
            <br />
            완전 정복 시리즈
          </div>
          <div className="mt-2 h-[3px] overflow-hidden rounded bg-white/10">
            <div
              className={`${styles.progressBar} h-full rounded bg-linear-to-r from-[#c9f135] to-[#9bf800]`}
            />
          </div>
        </div>

        <div
          className={`${styles.sticker} ${styles.about} rounded-[5px] bg-[#ffe566] px-5 py-4`}
          style={{ animationDelay: "0.06s" }}
        >
          <div className={styles.tape} />
          <p className="text-sm leading-relaxed text-zinc-800 md:text-md lg:text-lg">
            🖥️ 사용자 시각에서
            <br />
            먼저 생각하는
            <br />
            프론트엔드 개발자
          </p>
        </div>

        <div
          className={`${styles.sticker} ${styles.phil} rounded-[14px] border border-[#e8e4dc] bg-white px-5 py-4`}
          style={{ animationDelay: "0.14s" }}
        >
          <div className={styles.tape} />
          <div className="text-xs uppercase tracking-[0.16em] text-zinc-400 md:text-sm">// Philosophy</div>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700 md:text-md lg:text-lg">
            기능 구현에 그치지 않고
            <br />
            <strong>사용자 흐름</strong>을 먼저 고민합니다.
            <br />
            <strong>불필요한 구조와 비효율</strong>을 지양합니다.
          </p>
        </div>

        <div
          className={`${styles.sticker} ${styles.awards} rounded-[14px] bg-[#ff5252] px-5 py-4 text-white`}
          style={{ animationDelay: "0.22s" }}
        >
          <div className={styles.tape} />
          <div className="text-xs uppercase tracking-[0.16em] text-white/60 md:text-sm">// Awards</div>
          <div className="mt-2 space-y-1 text-xs text-white/90 md:text-sm lg:text-base">
            <p>✦ UMC 데모데이 최우수상</p>
            <p>✦ 서울시 AIoT 해커톤 장려상</p>
            <p>✦ 와글와글 해커톤 장려상</p>
            <p>✦ 카카오 SW아카데미 표창장</p>
          </div>
        </div>

        <div
          className={`${styles.sticker} ${styles.name} rounded-[18px] bg-[#141414] px-7 py-7 text-white md:px-8 md:py-8 lg:px-10 lg:py-10 xl:px-12 xl:py-11`}
          style={{ animationDelay: "0.32s" }}
        >
          <div className={styles.tape} />
          <div className="text-xs tracking-[0.2em] text-zinc-500 md:text-sm lg:text-base">
            KIM JINSEONG · FRONTEND
          </div>
          <h1 className="mt-3 text-[34px] font-black leading-[1.1] md:text-[42px] lg:text-[56px] xl:text-[64px]">
            <span className="text-[#ff5252]">안녕하세요,</span>
            <br />
            <span className="text-[#c9f135] [text-shadow:0_0_16px_rgba(201,241,53,0.45)]">
              개발자
            </span>
            <br />
            김진성입니다
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 md:text-base lg:text-lg">
            React · Next.js 생태계를 탐구하며
            <br />
            배운 것들을 이 블로그에 씁니다.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <a
              href="/blog"
              className="rounded-full bg-[#c9f135] px-3 py-1.5 text-xs font-bold text-zinc-900 transition-transform hover:scale-105 md:px-4 md:py-2 md:text-sm lg:text-base"
            >
              글 보러가기 →
            </a>
            <a
              href="https://github.com/smileman62"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-400 underline underline-offset-2 hover:text-[#c9f135] md:text-sm lg:text-base"
            >
              GitHub ↗
            </a>
          </div>
        </div>

        <div
          className={`${styles.sticker} ${styles.stack} rounded-[14px] bg-[#c4adff] px-5 py-4`}
          style={{ animationDelay: "0.1s" }}
        >
          <div className={styles.tape} />
          <div className="text-xs uppercase tracking-[0.16em] text-zinc-700 md:text-sm">// Stack</div>
          <div className="mt-2 flex flex-wrap gap-1.5 text-xs md:text-sm lg:text-base">
            {["React", "Next.js", "TypeScript", "TanStack Query", "Zustand", "Tailwind", "Axios"].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/80 bg-white/60 px-2 py-0.5 font-medium text-zinc-900"
                >
                  {tag}
                </span>
              ),
            )}
          </div>
        </div>

        <div
          className={`${styles.sticker} ${styles.projects} rounded-[14px] bg-[#4dbbff] px-5 py-4`}
          style={{ animationDelay: "0.18s" }}
        >
          <div className={styles.tape} />
          <div className="text-xs uppercase tracking-[0.16em] text-zinc-700 md:text-sm">// Projects</div>
          <div className="mt-2 space-y-2">
            <div>
              <p className="text-sm font-bold text-zinc-900 md:text-base lg:text-lg">마음모음</p>
              <p className="text-xs text-zinc-700/70 md:text-sm lg:text-base">멘탈 헬스케어 서비스</p>
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900 md:text-base lg:text-lg">DKaffeine</p>
              <p className="text-xs text-zinc-700/70 md:text-sm lg:text-base">RAG 기반 챗봇 관리자 플랫폼</p>
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900 md:text-base lg:text-lg">MCP Hub</p>
              <p className="text-xs text-zinc-700/70 md:text-sm lg:text-base">MCP 통합 탐색 & 실행 플랫폼</p>
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900 md:text-base lg:text-lg">퍼퓨온미</p>
              <p className="text-xs text-zinc-700/70 md:text-sm lg:text-base">AI 향수 추천 서비스</p>
            </div>
          </div>
        </div>

        <div
          className={`${styles.sticker} ${styles.edu} rounded-[14px] bg-[#c9f135] px-5 py-4`}
          style={{ animationDelay: "0.26s" }}
        >
          <div className={styles.tape} />
          <div className="text-xs uppercase tracking-[0.16em] text-zinc-700 md:text-sm">// Education</div>
          <p className="mt-2 text-sm font-bold text-zinc-900 md:text-base lg:text-lg">가천대학교</p>
          <p className="text-xs text-zinc-700/70 md:text-sm lg:text-base">소프트웨어학과 · 2026.08 졸업예정</p>
          <div className="mt-2 flex items-end gap-1">
            <span className="text-2xl font-bold leading-none text-zinc-900 md:text-3xl lg:text-4xl">4.10</span>
            <span className="text-xs text-zinc-700/60 md:text-sm lg:text-base">/ 4.5</span>
            <span className="ml-auto text-xs tracking-[0.08em] text-zinc-700/60 md:text-sm">GPA</span>
          </div>
        </div>

        <div
          className={`${styles.sticker} ${styles.cert} rounded-[10px] border border-[#e0dbd0] bg-white px-4 py-3`}
          style={{ animationDelay: "0.48s" }}
        >
          <div className={styles.tapeSm} />
          <div className="text-xs uppercase tracking-[0.16em] text-zinc-400 md:text-sm">// Certs</div>
          <div className="mt-2 space-y-1 text-xs text-zinc-700 md:text-sm lg:text-base">
            <p>📜 정보처리기사</p>
            <p>📊 ADsP · SQLD</p>
            <p>🗣 OPIc IM1</p>
          </div>
        </div>

        <div
          className={`${styles.sticker} ${styles.links} flex items-center gap-3 whitespace-nowrap rounded-full bg-[#141414] px-5 py-3 text-white`}
          style={{ animationDelay: "0.42s" }}
        >
          <a
            className="text-xs font-bold text-white/60 hover:text-[#c9f135] md:text-sm lg:text-base"
            href="https://github.com/smileman62"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <span className="text-white/25">|</span>
          <a
            className="text-xs font-bold text-white/60 hover:text-[#c9f135] md:text-sm lg:text-base"
            href="https://jskim6335.tistory.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tistory
          </a>
          <span className="text-white/25">|</span>
          <a
            className="text-xs font-bold text-white/60 hover:text-[#c9f135] md:text-sm lg:text-base"
            href="mailto:jskim6335@naver.com"
          >
            ✉ Email
          </a>
          <span className="text-white/25">|</span>
          <span className="text-xs tracking-widest text-white/35 md:text-sm">SEOUL · 2023~</span>
        </div>
      </div>
    </section>
  );
}
