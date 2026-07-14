import type { CSSProperties } from "react";
import type { Project } from "@/lib/projects/data";
import styles from "@/components/projects/projects.module.css";

type ProjectDetailPanelProps = {
  projects: Project[];
  active: number;
  onOpenDetail: () => void;
};

export function ProjectDetailPanel({
  projects,
  active,
  onOpenDetail,
}: ProjectDetailPanelProps) {
  return (
    <div className={styles.detail}>
      {projects.map((project, index) => (
        <div
          key={project.id}
          className={`${styles.detailPane} ${index === active ? styles.detailPaneOn : ""}`}
          style={{ "--accent": project.accent } as CSSProperties}
        >
          <div className={styles.detailHeader}>
            <span className={styles.detailEye}>{project.categoryEye}</span>
            <div className={styles.detailNameRow}>
              <div className={styles.detailName}>
                {project.name}
                <span className={styles.detailOutline}>{project.nameOutline}</span>
              </div>
              <div className={styles.detailNameRight}>
                {project.award ? (
                  <span className={styles.detailAward}>✦ {project.award}</span>
                ) : null}
                <button type="button" className={styles.detailCta} onClick={onOpenDetail}>
                  상세 보기 →
                </button>
              </div>
            </div>
          </div>

          <div className={styles.detailRole}>
            <span className={styles.detailRoleDot} />
            {project.roleLine}
          </div>

          <p className={styles.detailDesc}>{project.description}</p>

          <div className={styles.detailStackRow}>
            <span className={styles.detailStackLabel}>Stack</span>
            <div className={styles.detailPills}>
              {project.stack.map((item, stackIndex) => (
                <span
                  key={item}
                  className={`${styles.detailPill} ${
                    project.stackHighlight.includes(stackIndex) ? styles.detailPillHl : ""
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.detailPhotos}>
            <span className={styles.detailPhotoLabel}>Photos</span>
            <div className={styles.detailPhotoGrid}>
              {project.photos.map((photo) => (
                <div key={photo.label} className={styles.detailPhoto}>
                  {photo.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={photo.src} alt={photo.label} />
                  ) : (
                    <div className={styles.detailPhotoPh}>
                      <span className={styles.detailPhotoPhIcon} aria-hidden>
                        🖼
                      </span>
                      <span className={styles.detailPhotoPhTxt}>{photo.label}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
