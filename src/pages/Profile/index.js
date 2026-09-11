import React, { useRef } from 'react';
import Link from 'next/link';
import Navbar from '../../../components/NavbarJS';
import { useSelector } from 'react-redux';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  FaArrowRight,
  FaBookOpen,
  FaBullseye,
  FaChartLine,
  FaClipboardCheck,
  FaClock,
  FaFlag,
  FaLayerGroup,
  FaRegBookmark,
  FaRoad,
  FaStar,
} from 'react-icons/fa';
import styles from './Profile.module.css';

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const sectionRef = useRef();
  const firstName = user?.name?.split(' ')[0] || 'Student';

  const handleDownload = async () => {
    if (!sectionRef.current) return;

    const canvas = await html2canvas(sectionRef.current, {
      scale: 2,
      backgroundColor: '#f6f8fb',
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = 210;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('apriori-sat-dashboard.pdf');
  };

  return (
    <>
      <Navbar />

      <main className={styles.profilePage} ref={sectionRef}>
        <section className={styles.dashboardHero}>
          <div>
            <span className={styles.eyebrow}>STUDENT PROFILE · SAT PREPARATION</span>
            <h1>Welcome back, {firstName}</h1>
            <p>
              Your profile is now your SAT preparation command centre — track your learning,
              identify what to work on next, and move from Foundation to full mock-test readiness.
            </p>
          </div>
          <div className={styles.heroActions}>
            <Link href="/Courses" className={styles.secondaryButton}>Explore Courses</Link>
            <button type="button" className={styles.primaryButton} onClick={handleDownload}>
              Download Progress
            </button>
          </div>
        </section>

        <section className={styles.quickStats} aria-label="SAT study snapshot">
          <div className={styles.statCard}>
            <div className={styles.statIcon}><FaClipboardCheck /></div>
            <div><span>Practice completed</span><strong>—</strong><small>Appears after SAT practice is connected</small></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><FaClock /></div>
            <div><span>Weekly activity</span><strong>—</strong><small>Appears after SAT activity is connected</small></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><FaBullseye /></div>
            <div><span>Study streak</span><strong>—</strong><small>Appears after SAT activity is connected</small></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><FaStar /></div>
            <div><span>SAT accuracy</span><strong>—</strong><small>Appears after SAT practice is connected</small></div>
          </div>
        </section>

        <section className={styles.contentGrid}>
          <div className={styles.mainColumn}>
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.sectionLabel}>YOUR SAT PATH</span>
                <h2>Prepare with purpose</h2>
              </div>
              <span className={styles.sectionHint}>Foundation → Advanced → Mocks</span>
            </div>

            <div className={styles.pathGrid}>
              <Link href="/Courses/SATFoundation" className={styles.pathCard}>
                <div className={styles.pathCardTop}>
                  <span className={styles.pathIcon}><FaBookOpen /></span>
                  <span className={styles.statusPill}>Available</span>
                </div>
                <h3>SAT Foundation</h3>
                <p>Build Verbal and Math fundamentals across Easy, Medium, and Hard learning levels.</p>
                <div className={styles.pathMeta}><span>Lessons</span><span>Drills</span><span>Topic Practice</span></div>
                <span className={styles.pathLink}>Open Foundation <FaArrowRight /></span>
              </Link>

              <Link href="/Courses/SATAdvanced" className={styles.pathCard}>
                <div className={styles.pathCardTop}>
                  <span className={styles.pathIcon}><FaChartLine /></span>
                  <span className={`${styles.statusPill} ${styles.muted}`}>Next stage</span>
                </div>
                <h3>SAT Advanced</h3>
                <p>Move into higher-level strategy, timing, difficult questions, and score-building practice.</p>
                <div className={styles.pathMeta}><span>Strategy</span><span>Timed Work</span><span>Hard Skills</span></div>
                <span className={styles.pathLink}>View Advanced <FaArrowRight /></span>
              </Link>

              <Link href="/SATMocks" className={`${styles.pathCard} ${styles.featuredPath}`}>
                <div className={styles.pathCardTop}>
                  <span className={styles.pathIcon}><FaClipboardCheck /></span>
                  <span className={styles.statusPill}>Tests 1–2 available</span>
                </div>
                <h3>SAT Mock Tests</h3>
                <p>Experience realistic Digital SAT-style mock tests with premium Tests 3–10 ready for future entitlement.</p>
                <div className={styles.pathMeta}><span>Adaptive</span><span>Timed</span><span>Score Reports</span></div>
                <span className={styles.pathLink}>Open Mock Tests <FaArrowRight /></span>
              </Link>
            </div>

            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.sectionLabel}>PERFORMANCE CENTRE</span>
                <h2>What you will see as you practice</h2>
              </div>
            </div>

            <div className={styles.performanceGrid}>
              <div className={styles.performanceCard}>
                <FaChartLine className={styles.performanceIcon} />
                <div><h3>Strengths & weaknesses</h3><p>Your highest- and lowest-performing SAT skills will appear here once Foundation and practice responses are connected.</p></div>
              </div>
              <div className={styles.performanceCard}>
                <FaClock className={styles.performanceIcon} />
                <div><h3>Pacing & timing</h3><p>Track average time by section, question difficulty, and test mode so timing becomes part of the learning process.</p></div>
              </div>
              <div className={styles.performanceCard}>
                <FaRegBookmark className={styles.performanceIcon} />
                <div><h3>Review queue</h3><p>Flagged and bookmarked questions will become a focused review list instead of getting lost in past attempts.</p></div>
              </div>
              <div className={styles.performanceCard}>
                <FaLayerGroup className={styles.performanceIcon} />
                <div><h3>Progress by topic</h3><p>See Verbal and Math progress by domain, skill, difficulty, and activity type as the content engine comes online.</p></div>
              </div>
            </div>
          </div>

          <aside className={styles.sideColumn}>
            <div className={styles.sideCardAccent}>
              <span className={`${styles.sectionLabel} ${styles.heroLabel}`}>RECOMMENDED NEXT</span>
              <h2>Start building your SAT base</h2>
              <p>Begin with Foundation to establish the concepts and skills that will feed into Advanced practice and mock performance later.</p>
              <Link href="/Courses/SATFoundation" className={styles.fullButton}>Continue to Foundation <FaArrowRight /></Link>
            </div>

            <div className={styles.sideCard}>
              <div className={styles.sideCardIcon}><FaRoad /></div>
              <h3>Study roadmap</h3>
              <div className={styles.roadmapItem}><strong>01</strong><span>Foundation skills</span></div>
              <div className={styles.roadmapItem}><strong>02</strong><span>Advanced strategy</span></div>
              <div className={styles.roadmapItem}><strong>03</strong><span>Mock-test readiness</span></div>
              <div className={styles.roadmapItem}><strong>04</strong><span>Targeted review</span></div>
            </div>

            <div className={styles.sideCard}>
              <div className={styles.sideCardIcon}><FaFlag /></div>
              <h3>Goal setting</h3>
              <p>Target score, SAT test date, weekly study target, and readiness milestones will be integrated here with the student profile.</p>
              <span className={styles.futureTag}>Planned integration</span>
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}
