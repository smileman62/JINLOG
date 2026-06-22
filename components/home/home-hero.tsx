import Link from "next/link";
import { NameSpotlight } from "@/components/home/name-spotlight";
import styles from "./home-hero.module.css";

export function HomeHero() {
  return (
    <div className={styles.root}>
      <div className={styles.page}>
        <div className={styles.heroCenter}>
          <div className={styles.hero}>
            <h1>
              <span className={styles.nameLine}>
                <span className={styles.nameInner}>Frontend Developer</span>
              </span>
              <span className={styles.nameLine}>
                <NameSpotlight className={`${styles.nameInner} ${styles.nameAccent}`}>
                  김진성입니다.
                </NameSpotlight>
              </span>
            </h1>

            <div className={styles.lineAnim} aria-hidden />

            <div className={styles.bottomRow}>
              <p className={styles.role}>
                React · Next.js · TypeScript
                <br />
                <em className={styles.roleEm}>User-first frontend development</em>
              </p>
            </div>

            <div className={styles.heroActions}>
              <Link className={styles.heroBtn} href="/blog">
                블로그 보기 <span className={styles.heroBtnArrow}>→</span>
              </Link>
              <Link className={`${styles.heroBtn} ${styles.heroBtnOutline}`} href="/projects">
                프로젝트 보기 <span className={styles.heroBtnArrow}>→</span>
              </Link>
            </div>
          </div>
        </div>

        <footer className={styles.foot}>
          <div className={styles.footLinks}>
            <a
              className={styles.footLink}
              href="https://github.com/smileman62"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a className={styles.footLink} href="mailto:jskim6335@naver.com">
              Email
            </a>
          </div>
        </footer>
      </div>

      <div className={styles.limeSq} aria-hidden />
    </div>
  );
}
