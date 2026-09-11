import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  const [mockProgress, setMockProgress] = useState({ attempts: [], completed: [] });
  const firstName = user?.name?.split(' ')[0] || 'Student';

  useEffect(() => {
    fetch('/api/sat/mock-progress', { credentials: 'include' })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => data && setMockProgress(data))
      .catch(() => null);
  }, []);

  const completed = mockProgress.completed || [];
  const completedCount = completed.length;
  const bestAccuracy = useMemo(() => {
    const values = completed
      .map((attempt) => Number(attempt.section_scores?.accuracy))
      .filter((value) => Number.isFinite(value));
    return values.length ? Math.max(...values) : 0;
  }, [completed]);

  const totalAnswered = useMemo(() => {
    return completed.reduce((sum, attempt) => {
      const scores = attempt.section_scores || {};
      return sum + Number(scores.readingWriting?.answered || 0) + Number(scores.math?.answered || 0);
    }, 0);
  }, [completed]);

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
              Your profile is your SAT preparation command centre — track your learning,
              monitor mock performance, and see what to work on next.
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
            <div><span>Mocks completed</span><strong>{completedCount}</strong><small>Saved against your verified account</small></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><FaClock /></div>
            <div><span>Questions answered</span><strong>{totalAnswered}</strong><small>Across completed mock attempts</small></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><FaBullseye /></div>
            <div><span>Study streak</span><strong>—</strong><small>Will use activity history as drills connect</small></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><FaStar /></div>
            <div><span>Best mock accuracy</span><strong>{bestAccuracy}%</strong><small>Highest completed mock result</small></div>
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
                  <span className={styles.statusPill}>{completedCount ? `${completedCount} mock${completedCount === 1 ? '' : 's'} completed` : 'Adaptive mocks live'}</span>
                </div>
                <h3>SAT Mock Tests</h3>
                <p>Experience realistic Digital SAT-style mock tests with adaptive Module 2 routing and persistent progress reports.</p>
                <div className={styles.pathMeta}><span>Adaptive</span><span>Timed</span><span>Score Reports</span></div>
                <span className={styles.pathLink}>Open Mock Tests <FaArrowRight /></span>
              </Link>
            </div>

            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.sectionLabel}>MOCK PERFORMANCE</span>
                <h2>Your latest recorded attempts</h2>
              </div>
              <Link href="/SATMocks" className={styles.sectionHint}>Open test library</Link>
            </div>

            <div className={styles.performanceGrid}>
              {completed.length ? completed.slice(0, 4).map((attempt) => {
                const scores = attempt.section_scores || {};
                const label = attempt.test_key === 'PSAT1' ? 'PSAT/NMSQT Mock 01' : attempt.test_key === 'SAT1' ? 'SAT Mock 01 — Series A' : attempt.test_key;
                return (
                  <div className={styles.performanceCard} key={attempt.id}>
                    <FaChartLine className={styles.performanceIcon} />
                    <div>
                      <h3>{label}</h3>
                      <p>{scores.totalCorrect || 0}/{scores.totalQuestions || 98} correct · {scores.accuracy || 0}% accuracy</p>
                      <small>Completed {attempt.completed_at ? new Date(attempt.completed_at).toLocaleDateString() : 'recently'}</small>
                    </div>
                  </div>
                );
              }) : (
                <>
                  <div className={styles.performanceCard}>
                    <FaChartLine className={styles.performanceIcon} />
                    <div><h3>No completed mock yet</h3><p>Start the PSAT Mock 01 or SAT Mock 01 to populate this report automatically.</p></div>
                  </div>
                  <div className={styles.performanceCard}>
                    <FaClock className={styles.performanceIcon} />
                    <div><h3>Pacing & timing</h3><p>Future attempts will record module timing and adaptive route selection for deeper analysis.</p></div>
                  </div>
                </>
              )}
            </div>

            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.sectionLabel}>PERFORMANCE CENTRE</span>
                <h2>What will expand next</h2>
              </div>
            </div>

            <div className={styles.performanceGrid}>
              <div className={styles.performanceCard}>
                <FaChartLine className={styles.performanceIcon} />
                <div><h3>Strengths & weaknesses</h3><p>Skill-level accuracy will appear once Foundation and question-bank responses are connected to the same reporting layer.</p></div>
              </div>
              <div className={styles.performanceCard}>
                <FaClock className={styles.performanceIcon} />
                <div><h3>Pacing & timing</h3><p>Track time by section, module, question, and difficulty so timing becomes part of the learning process.</p></div>
              </div>
              <div className={styles.performanceCard}>
                <FaRegBookmark className={styles.performanceIcon} />
                <div><h3>Review queue</h3><p>Flagged and bookmarked questions will become a focused review list across practice and mocks.</p></div>
              </div>
              <div className={styles.performanceCard}>
                <FaLayerGroup className={styles.performanceIcon} />
                <div><h3>Progress by topic</h3><p>See Verbal and Math progress by domain, skill, difficulty, and activity type as the content engine expands.</p></div>
              </div>
            </div>
          </div>

          <aside className={styles.sideColumn}>
            <div className={styles.sideCardAccent}>
              <span className={`${styles.sectionLabel} ${styles.heroLabel}`}>RECOMMENDED NEXT</span>
              <h2>Use the adaptive mocks as your benchmark</h2>
              <p>Run a full mock now, then use the recorded accuracy and module route to guide the next Foundation or Advanced study cycle.</p>
              <Link href="/SATMocks" className={styles.fullButton}>Open Mock Tests <FaArrowRight /></Link>
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
              <p>Target score, SAT test date, weekly study target, and readiness milestones will be integrated into this dashboard as the student data layer expands.</p>
              <span className={styles.futureTag}>Planned integration</span>
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}
