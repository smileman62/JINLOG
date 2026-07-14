"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import type { Project } from "@/lib/projects/data";
import styles from "@/components/projects/projects.module.css";

type ProjectCardTrackProps = {
  projects: Project[];
  active: number;
  onActiveChange: (index: number) => void;
  onOpenDetail: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

const CARD_GAP = 14;

function cardStyle(project: Project): CSSProperties {
  return {
    "--cbg": project.cardBg,
    "--cglow": project.cardGlow,
    "--ct": project.cardText,
    "--ctd": project.cardTextDim,
    "--cgh": project.cardGhostColor,
  } as CSSProperties;
}

export function ProjectCardTrack({
  projects,
  active,
  onActiveChange,
  onOpenDetail,
  onPrev,
  onNext,
}: ProjectCardTrackProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const count = projects.length;

  const measure = useCallback(() => {
    if (!outerRef.current) return;
    setCardWidth(Math.round(outerRef.current.clientWidth * 0.6));
  }, []);

  const setTrackPos = useCallback(
    (index: number, animated = true) => {
      const outer = outerRef.current;
      const track = trackRef.current;
      if (!outer || !track || cardWidth === 0) return;

      const cardCenter = (index + 1) * (cardWidth + CARD_GAP) + cardWidth / 2;
      const offset = Math.round(cardCenter - outer.clientWidth / 2);

      track.style.transition = animated
        ? "transform .5s cubic-bezier(.22,1,.36,1)"
        : "none";
      track.style.transform = `translateX(-${offset}px)`;
    },
    [cardWidth],
  );

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    setTrackPos(active, true);
  }, [active, cardWidth, setTrackPos]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onTransitionEnd = () => {
      setTrackPos(active, false);
    };

    track.addEventListener("transitionend", onTransitionEnd);
    return () => track.removeEventListener("transitionend", onTransitionEnd);
  }, [active, setTrackPos]);

  const cardHeight = cardWidth > 0 ? Math.round(cardWidth * 0.6) : 0;

  const handleCardClick = (index: number, isActive: boolean) => {
    if (isActive) {
      onOpenDetail(index);
      return;
    }
    onActiveChange(index);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta < 0) onNext();
      else onPrev();
    }
    touchStartX.current = null;
  };

  const renderCard = (project: Project, cardIndex: number, isClone = false) => {
    const isActive = cardIndex === active;

    return (
      <div
        key={`${project.id}-${isClone ? "clone" : "real"}-${cardIndex}`}
        className={`${styles.card} ${isActive && !isClone ? styles.cardActive : ""}`}
        style={{
          ...cardStyle(project),
          width: cardWidth || undefined,
          height: cardHeight || undefined,
        }}
        onClick={() => handleCardClick(cardIndex, isActive && !isClone)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleCardClick(cardIndex, isActive && !isClone);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`${project.name} 프로젝트`}
        aria-current={isActive && !isClone ? "true" : undefined}
      >
        <div className={styles.cardBg} />
        <div className={styles.cardNoise} />
        <div className={styles.cardGlow} />
        <span className={styles.cardGhost}>{project.cardGhost}</span>
        <div className={styles.cardInner}>
          <div className={styles.cardTop}>
            <span className={styles.cardNum}>
              0{cardIndex + 1} / 0{count}
            </span>
            <span className={styles.cardYear}>{project.year}</span>
          </div>
          <div className={styles.cardBottom}>
            <span className={styles.cardCat}>{project.category}</span>
            <div className={styles.cardName}>{project.name}</div>
            <div className={styles.cardRole}>{project.role}</div>
          </div>
        </div>
        <span className={styles.cardHint}>상세 보기 ↗</span>
      </div>
    );
  };

  return (
    <div className={styles.cardArea}>
      <div className={styles.cardHead}>
        <span className={styles.cardCounter}>
          <em>{active + 1}</em> / {count}
        </span>
        <div className={styles.cardArrows}>
          <button type="button" className={styles.arrowBtn} onClick={onPrev} aria-label="이전 프로젝트">
            ←
          </button>
          <button type="button" className={styles.arrowBtn} onClick={onNext} aria-label="다음 프로젝트">
            →
          </button>
        </div>
      </div>

      <div
        ref={outerRef}
        className={styles.trackOuter}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div ref={trackRef} className={styles.track}>
          {count > 0 ? renderCard(projects[count - 1], count - 1, true) : null}
          {projects.map((project, index) => renderCard(project, index))}
          {count > 0 ? renderCard(projects[0], 0, true) : null}
        </div>
      </div>

      <div className={styles.cardDots}>
        {projects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            className={`${styles.dot} ${index === active ? styles.dotOn : ""}`}
            onClick={() => onActiveChange(index)}
            aria-label={`${project.name} 보기`}
            aria-current={index === active ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
