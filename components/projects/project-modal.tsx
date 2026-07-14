import type { CSSProperties } from "react";
import type { Project } from "@/lib/projects/data";
import styles from "@/components/projects/projects.module.css";

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
      <button type="button" className={styles.modalBg} onClick={onClose} aria-label="닫기" />
      <div className={styles.modalBox}>
        <div
          className={styles.modalStrip}
          style={{ background: project.accent }}
        />
        <button type="button" className={styles.modalClose} onClick={onClose} aria-label="닫기">
          ✕
        </button>
        <div className={styles.modalContent}>
          <span className={styles.modalCat}>{project.category}</span>
          <h2 id="project-modal-title" className={styles.modalName}>
            {project.name}
            <span className={styles.modalOutline}>{project.nameOutline}</span>
          </h2>

          {project.award ? (
            <div className={styles.modalAward}>✦ {project.award}</div>
          ) : null}

          <div
            className={styles.modalRole}
            style={{ "--maccent": project.accent } as CSSProperties}
          >
            <span className={styles.modalRoleDot} />
            {project.roleLine}
          </div>

          <p className={styles.modalDesc}>{project.description}</p>

          <div className={styles.modalMetaGrid}>
            {project.meta.map((item) => (
              <div key={item.label} className={styles.modalMetaItem}>
                <span className={styles.modalMetaLabel}>{item.label}</span>
                <span className={styles.modalMetaValue}>{item.value}</span>
              </div>
            ))}
          </div>

          <span className={styles.modalStackLabel}>Stack</span>
          <div className={styles.modalPills}>
            {project.stack.map((item, index) => (
              <span
                key={item}
                className={`${styles.modalPill} ${
                  project.stackHighlight.includes(index) ? styles.modalPillHl : ""
                }`}
              >
                {item}
              </span>
            ))}
          </div>

          {project.githubUrl ? (
            <a
              className={styles.modalCta}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub 보기 →
            </a>
          ) : (
            <button type="button" className={styles.modalCta} onClick={onClose}>
              닫기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
