import type { CSSProperties } from "react";
import type { Project } from "@/lib/projects/data";
import styles from "@/components/projects/projects.module.css";

type ProjectMobileGridProps = {
  projects: Project[];
  onOpenDetail: (index: number) => void;
};

export function ProjectMobileGrid({ projects, onOpenDetail }: ProjectMobileGridProps) {
  return (
    <div className={styles.mobileView}>
      <div className={styles.mobileMain}>
        <div className={styles.mobileHead}>
          <div>
            <span className={styles.mobileEye}>Selected Work</span>
            <h1 className={styles.mobileTitle}>Projects</h1>
          </div>
          <span className={styles.mobileCount}>{projects.length} projects</span>
        </div>

        <div className={styles.mobileGrid}>
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              className={styles.mobileCard}
              style={
                {
                  "--accent": project.accent,
                  "--cbg": project.cardBg,
                } as CSSProperties
              }
              onClick={() => onOpenDetail(index)}
            >
              <div className={styles.mobileCardImg} />
              <div className={styles.mobileCardOverlay} />
              <div className={styles.mobileCardTint} />
              <div className={styles.mobileCardInner}>
                <div className={styles.mobileCardTop}>
                  <span className={styles.mobileCardYear}>{project.year}</span>
                  {project.award ? (
                    <span className={styles.mobileCardStar} aria-label="수상">
                      ★
                    </span>
                  ) : null}
                </div>
                <div className={styles.mobileCardBottom}>
                  <span className={styles.mobileCardCat}>{project.category}</span>
                  <div className={styles.mobileCardName}>{project.name}</div>
                  <div className={styles.mobileCardRole}>{project.role}</div>
                  <div className={styles.mobileCardTap}>탭하여 상세보기 ↗</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.mobileFoot}>
        <span className={styles.mobileFootText}>© 2026 김진성</span>
        <a
          className={styles.mobileFootLink}
          href="https://github.com/smileman62"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub ↗
        </a>
      </div>
    </div>
  );
}
