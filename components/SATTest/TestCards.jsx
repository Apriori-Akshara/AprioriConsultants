import testsData from '@/data/tests.json';
import Link from 'next/link';
import styles from "./satcomp.module.css";

export default function TestCards() {
  return (
    <section id="tests" className={styles.testcards}>
      <div className={styles.container}>
        {testsData.map((test) => (
          <Link key={test.id} href={`/SATDiagnosticTest/tests/${test.id}`} className={styles.link}>
            <div className={styles.card}>
              <img src={test.image} alt={test.title} />
              <div className={styles.content}>
                <h4>{test.title}</h4>
                <p>{test.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}