import Link from "next/link";
import { HeroCursorPhotos } from "@/components/home/hero-cursor-photos";
import { NameSpotlight } from "@/components/home/name-spotlight";
import styles from "./home-hero.module.css";

export function HomeHero() {
  return (
    <div className={styles.root}>
      <div className={styles.page}>
        <HeroCursorPhotos />

        <div className={styles.heroCenter}>
          <div className={styles.hero}>
            <div className={styles.status}>
              <span className={styles.statusDot} aria-hidden />
              <span className={styles.statusText}>Available for work</span>
            </div>

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
            <Link className={styles.footLink} href="/blog">
              Blog
            </Link>
            <a className={styles.footLink} href="mailto:jskim6335@naver.com">
              Email
            </a>
          </div>
          <Link className={styles.cta} href="/projects">
            View Projects <span className={styles.ctaArrow}>→</span>
          </Link>
        </footer>
      </div>

      <div className={styles.limeSq} aria-hidden />
    </div>
  );
}
