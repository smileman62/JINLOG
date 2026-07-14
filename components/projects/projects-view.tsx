"use client";

import { useCallback, useEffect, useState } from "react";
import type { Project } from "@/lib/projects/data";
import { ProjectCardTrack } from "@/components/projects/project-card-track";
import { ProjectDetailPanel } from "@/components/projects/project-detail-panel";
import { ProjectMobileGrid } from "@/components/projects/project-mobile-grid";
import { ProjectModal } from "@/components/projects/project-modal";
import styles from "@/components/projects/projects.module.css";

type ProjectsViewProps = {
  projects: Project[];
};

export function ProjectsView({ projects }: ProjectsViewProps) {
  const [active, setActive] = useState(0);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const count = projects.length;

  const go = useCallback(
    (dir: number) => {
      setActive((prev) => (prev + dir + count) % count);
    },
    [count],
  );

  const openModal = useCallback((index: number) => {
    setModalIndex(index);
  }, []);

  const closeModal = useCallback(() => {
    setModalIndex(null);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 761px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (modalIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [modalIndex, closeModal]);

  useEffect(() => {
    if (isMobile || modalIndex !== null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [go, isMobile, modalIndex]);

  if (count === 0) return null;

  return (
    <div className={styles.root}>
      <div className={styles.desktop} aria-hidden={isMobile}>
        <div className={styles.body}>
          <ProjectDetailPanel
            projects={projects}
            active={active}
            onOpenDetail={() => openModal(active)}
          />

          <ProjectCardTrack
            projects={projects}
            active={active}
            onActiveChange={setActive}
            onOpenDetail={openModal}
            onPrev={() => go(-1)}
            onNext={() => go(1)}
          />
        </div>

        <footer className={styles.footer}>
          <span className={styles.footerText}>© 2026 김진성 · Frontend Developer</span>
          <a
            className={styles.footerLink}
            href="https://github.com/smileman62"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
        </footer>
      </div>

      <div className={styles.mobile} aria-hidden={!isMobile}>
        <ProjectMobileGrid projects={projects} onOpenDetail={openModal} />
      </div>

      {modalIndex !== null ? (
        <ProjectModal
          project={projects[modalIndex]}
          onClose={closeModal}
        />
      ) : null}
    </div>
  );
}
