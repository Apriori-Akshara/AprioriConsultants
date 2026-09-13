import React, { useEffect, useRef, useState } from 'react';
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

function mockFamilyLabel(testKey) {
  return String(testKey || '').toUpperCase().startsWith('PSAT') ? 'PSAT/NMSQT' : 'Digital SAT';
}

function mockNumberLabel(testKey) {
  const match = String(testKey || '').match(/(\d+)$/);
  return match ? String(Number(match[1])).padStart(2, '0') : '01';
}

function mockTitle(testKey) {
  return `${mockFamilyLabel(testKey)} Mock Test ${mockNumberLabel(testKey)}`;
}

function routeLabel(value) {
  const route = String(value || 'standard').toLowerCase();
  if (route === 'high') return 'Higher-difficulty Module 2';
  if (route === 'low') return 'Lower-difficulty Module 2';
  return 'Standard-difficulty Module 2';
}

function mockLibraryPath(testKey) {
  return String(testKey || '').toUpperCase().startsWith('PSAT') ? '/PSATMocks' : '/SATMocks';
}

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

  const completedMocks = mockProgress.completed || [];
  const totalQuestionsAnswered = completedMocks.reduce(
    (sum, item) => sum + Number(item.section_scores?.readingWriting?.answered || 0) + Number(item.section_scores?.math?.answered || 0),
    0
  );
  const bestAccuracy = completedMocks.reduce(
    (best, item) => Math.max(best, Number(item.section_scores?.accuracy || 0)),
    0
  );
  const latestMock = completedMocks[0] || null;
  const latestMockFamily = mockFamilyLabel(latestMock?.test_key);
  const latestMockPath = mockLibraryPath(latestMock?.test_key);

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
              identify what to work on next, and carry every completed mock into your progress history.
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
            <div><span>Mocks completed</span><strong>{completedMocks.length}</strong><small>PSAT and SAT attempts completed</small></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><FaClock /></div>
            <div><span>Questions answered</span><strong>{totalQuestionsAnswered}</strong><small>Across completed mock attempts</small></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><FaBullseye /></div>
            <div><span>Latest accuracy</span><strong>{Number(latestMock?.section_scores?.accuracy || 0)}%</strong><small>{latestMock ? latestMock.test_key : 'Complete a mock to begin'}</small></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><FaStar /></div>
            <div><span>Best accuracy</span><strong>{bestAccuracy}%</strong><small>Highest completed mock</small></div>
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
                  <span className={styles.statusPill}>{completedMocks.length ? `${completedMocks.length} completed` : '2 live mocks'}</span>
                </div>
                <h3>PSAT &amp; SAT Mocks</h3>
                <p>Run the live adaptive PSAT and SAT mocks, save your attempts, and bring the results back into this dashboard.</p>
                <div className={styles.pathMeta}><span>Adaptive</span><span>Timed</span><span>Score Reports</span></div>
                <span className={styles.pathLink}>Open Mock Tests <FaArrowRight /></span>
              </Link>
            </div>

            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.sectionLabel}>MOCK PROGRESS</span>
                <h2>Your latest test performance</h2>
              </div>
              <Link href="/SATMocks" className={styles.sectionAction}>Open all mocks <FaArrowRight /></Link>
            </div>

            <div className={styles.mockProgressPanel}>
              {latestMock ? (
                <div className={styles.latestMockGrid}>
                  <div className={styles.latestMockIdentity}>
                    <span className={styles.latestBadge}>{latestMockFamily}</span>
                    <div>
                      <span className={styles.sectionLabel}>LATEST COMPLETED</span>
                      <h3>{mockTitle(latestMock.test_key)}</h3>
                      <p>Module 2 pathway: {routeLabel(latestMock.section_scores?.adaptiveRoutes?.readingWriting)} for Reading &amp; Writing · {routeLabel(latestMock.section_scores?.adaptiveRoutes?.math)} for Math.</p>
                    </div>
                  </div>
                  <div className={styles.latestScore}><strong>{Number(latestMock.section_scores?.accuracy || 0)}%</strong><span>overall accuracy</span></div>
                  <div className={styles.latestBreakdown}>
                    <span>Reading &amp; Writing <strong>{latestMock.section_scores?.readingWriting?.correct || 0}/{latestMock.section_scores?.readingWriting?.total || 54}</strong></span>
                    <span>Math <strong>{latestMock.section_scores?.math?.correct || 0}/{latestMock.section_scores?.math?.total || 44}</strong></span>
                  </div>
                </div>
              ) : (
                <div className={styles.emptyMockState}>
                  <div className={styles.emptyMockIcon}><FaClipboardCheck /></div>
                  <div>
                    <h3>Your mock results will appear here</h3>
                    <p>Complete a PSAT or SAT mock and this panel will become your live progress record.</p>
                  </div>
                  <Link href="/SATMocks" className={styles.fullButton}>Start a Mock <FaArrowRight /></Link>
                </div>
              )}
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
                <div><h3>Strengths &amp; weaknesses</h3><p>Your highest- and lowest-performing SAT skills will appear here as question-level analytics are connected.</p></div>
              </div>
              <div className={styles.performanceCard}>
                <FaClock className={styles.performanceIcon} />
                <div><h3>Pacing &amp; timing</h3><p>Track average time by section, question difficulty, and test mode so timing becomes part of the learning process.</p></div>
              </div>
              <div className={styles.performanceCard}>
                <FaRegBookmark className={styles.performanceIcon} />
                <div><h3>Review queue</h3><p>Flagged and bookmarked questions will become a focused review list instead of getting lost in past attempts.</p></div>
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
              <h2>{latestMock ? 'Review your latest mock' : 'Start your first live mock'}</h2>
              <p>{latestMock ? 'Your latest result is now recorded. Open the appropriate mock library to continue with your next available test.' : 'PSAT Mock 01 and SAT Mock 01 are the first live adaptive experiences in the mock library.'}</p>
              <Link href={latestMock ? latestMockPath : '/SATMocks'} className={styles.fullButton}>Open Mock Library <FaArrowRight /></Link>
            </div>

            <div className={styles.sideCard}>
              <div className={styles.sideCardIcon}><FaRoad /></div>
              <h3>Study roadmap</h3>
              <div className={styles.roadmapItem}><strong>01</strong><span>Foundation skills</span></div>
              <div className={styles.roadmapItem}><strong>02</strong><span>Advanced strategy</span></div>
              <div className={styles.roadmapItem}><strong>03</strong><span>PSAT / SAT mocks</span></div>
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
