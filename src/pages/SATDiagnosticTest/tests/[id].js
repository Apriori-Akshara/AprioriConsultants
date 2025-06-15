import testsData from '@/data/tests.json';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './tests.module.css';
import Navbar from '../../../../components/NavbarJS';

export async function getServerSideProps(context) {
  const { id } = context.params; // Extract the id from the URL
  return {
    props: { id }, // Pass the id as a prop to the component
  };
}

export default function PracticeTestPage({ id }) {
  // Find the test by converting id to a number
  const test = testsData.find((t) => t.id === Number(id));
  if (!test) {
    notFound();
    return null;
  }

  return (
    <>
          <Navbar />
    <div className={`${styles.container} ${styles.grid} ${styles.mt8} ${styles.grid3cols}`}>
      {/* Breadcrumb */}
      <div className={`${styles.breadcrumb} ${styles.colSpan3}`}>
        <Link href="/" className={styles.linkBlue}>
          Home
        </Link>
        {' '}› Practice Test
      </div>

      {/* Main Content */}
      <div className={`${styles.colSpan2} ${styles.mainContent}`}>
        <h1 className={styles.title}>{test.title}</h1>
        <p className={styles.textGray700}>Time: {test.duration}</p>
        <p className={styles.textGray800}>
          This practice test simulates the experience you will have taking the SAT on test day. When you finish the test, we’ll give you a score estimate which will help you predict how you would do on the actual SAT. You’ll also be able to review your answers and watch video explanations for every question.
        </p>

        {test.inProgress && (
          <div className={styles.alert}>
            <p>You&apos;re in the middle of a practice test.</p>
            <p>Click "Continue Practice Test" below to finish and get your scores.</p>
          </div>
        )}

        <h2 className={styles.title}>Preparation</h2>
        <p className={styles.textGray700}>
          Just like with the real test, you should have scratch paper to take notes and work out problems. A link to an external third-party graphing calculator is provided during the Math section, but you may also use your own.  
          <br /><br />
          Set aside about 2 hours and 30 minutes for this test; let your family and friends know not to interrupt you.  
          <br /><br />
          You can pause between sections if necessary, but not within a section. Once you start a section, you must finish it because the timer will continue running. We recommend taking the entire test in one sitting to practice pacing and build stamina for test day. Good luck!
        </p>
        <Link href={`/SATDiagnosticTest/Test/${test.id}`} className={styles.btnPrimary}>
          Continue Practice Test
        </Link>
      </div>

      {/* Sidebar */}
      <div className={`${styles.colSpan1} ${styles.sidebar}`}>
        <h3 className={styles.sidebarTitle}>Your Test Results</h3>
        <div>
          <div className={styles.sidebarItem}>
            <span>Reading &amp; Writing</span>
            <span className={styles.fontSemibold}>{test.scores?.rw ?? 'NS'}</span>
          </div>
          <div className={styles.sidebarItem}>
            <span>Math</span>
            <span className={styles.fontSemibold}>{test.scores?.math ?? 'NS'}</span>
          </div>
          <div className={`${styles.sidebarItem} ${styles.sidebarItemBorderTop}`}>
            <span>Total Score</span>
            <span className={styles.fontSemibold}>{test.scores?.total ?? 'NS'}</span>
          </div>
        </div>
        <p className={styles.textSm}>
          You&apos;re in the middle of a test. Finish to get your up-to-date scores.
        </p>
        <Link href={`/SATDiagnosticTest/Test/${test.id}`} className={styles.btnPrimary}>
          Continue Test
        </Link>
      </div>
    </div>
    </>
  );
}
