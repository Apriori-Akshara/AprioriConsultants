import testsData from '@/data/tests.json';
import Link from 'next/link';
import styles from "./satcomp.module.css";

export default function TestCards({user}) {
  return (
    <section id="tests" className={styles.testcards}>
      <div className={styles.container}>
        {testsData.map((test, idx) => {
          // Always show first two cards
          if (idx < 2) {
            return (
              <Link key={test.id} href={`/SATDiagnosticTest/tests/${test.id}`} className={styles.link}>
                <div className={styles.card}>
                  <img src={test.image} alt={test.title} />
                  <div className={styles.content}>
                    <h4>{test.title}</h4>
                    <p>{test.description}</p>
                  </div>
                </div>
              </Link>
            );
          }

          // For others, check if user exists
          if (!user) {
            return (
              <div key={test.id} className={`${styles.card} ${styles.locked}`}>
                <img src={test.image} alt={test.title} style={{filter: 'grayscale(1)', opacity: 0.5}} />
                <div className={styles.content}>
                  <h4>{test.title}</h4>
                  <p>{test.description}</p>
                </div>
                <div className={styles.lockOverlay}>
                  <span role="img" aria-label="locked">🔒</span>
                  <p>Login to unlock</p>
                </div>
              </div>
            );
          }

          // If user exists, show normally
          return (
            <Link key={test.id} href={`/SATDiagnosticTest/tests/${test.id}`} className={styles.link}>
              <div className={styles.card}>
                <img src={test.image} alt={test.title} />
                <div className={styles.content}>
                  <h4>{test.title}</h4>
                  <p>{test.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}