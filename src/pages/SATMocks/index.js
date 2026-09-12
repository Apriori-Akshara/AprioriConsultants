import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

import { getVerifiedSatServerAccessState } from '../../lib/sat/satAccess'
import { getSatLoginUrl } from '../../lib/sat/satLogin'
import { getSatTestAccess } from '../../lib/sat/testAccess'

import styles from '../../styles/SATMocks.module.css'

const tests = Array.from({ length: 10 }, (_, index) => index + 1)

export async function getServerSideProps(context) {
  const accessState = await getVerifiedSatServerAccessState(context.req)

  if (!accessState.authenticated) {
    return { redirect: { destination: getSatLoginUrl('/SATMocks'), permanent: false } }
  }

  const userId = accessState.user?.id || null
  const testAccess = {}
  for (const testNumber of tests) testAccess[testNumber] = await getSatTestAccess(userId, testNumber)
  return { props: { testAccess } }
}

function Meta({ value, label }) {
  return <div className={styles.metaItem}><span className={styles.metaIcon}>✓</span><span>{value}</span><strong>{label}</strong></div>
}

function MockCard({ track, testNumber, completed }) {
  const isPsat = track === 'PSAT'
  const routeKey = `${track}${testNumber}`
  const title = `${isPsat ? 'PSAT/NMSQT' : 'SAT'} Mock Test ${String(testNumber).padStart(2, '0')}`
  const label = `${isPsat ? 'PSAT / NMSQT' : 'SAT'} · MOCK ${String(testNumber).padStart(2, '0')}`
  const description = isPsat
    ? `Original PSAT/NMSQT-style adaptive practice with timed modules, persistent progress, scoring, and reporting.`
    : `Original Digital SAT-style adaptive practice with timed modules, persistent progress, scoring, and reporting.`

  return (
    <article className={`${styles.testCard} ${styles.testCardIncluded}`}>
      <div className={styles.testCardTop}>
        <div className={styles.testIdentity}>
          <div className={styles.testIcon}>{isPsat ? 'P' : 'S'}</div>
          <div>
            <span className={styles.testNumber}>{label}</span>
            <h3>{title}</h3>
          </div>
        </div>
        <span className={styles.status}>{completed ? 'Completed' : 'Ready'}</span>
      </div>
      <p className={styles.testDescription}>{description}</p>
      <div className={styles.testMeta}>
        <Meta value="98" label="questions" />
        <Meta value="2 + 2" label="modules" />
        <Meta value="64 + 70" label="minutes" />
      </div>
      <div className={styles.actionArea}>
        <Link href={`/SATMocks/${routeKey}`} className={`${styles.actionButton} ${styles.primaryButton}`}>
          {completed ? `Retake Mock ${String(testNumber).padStart(2, '0')}` : `Start Mock ${String(testNumber).padStart(2, '0')}`}
        </Link>
      </div>
    </article>
  )
}

export default function SATMocks() {
  const [progress, setProgress] = useState({ attempts: [], completed: [] })

  useEffect(() => {
    fetch('/api/sat/mock-progress', { credentials: 'include' })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => data && setProgress(data))
      .catch(() => null)
  }, [])

  const completedCount = progress.completed?.length || 0
  const bestAccuracy = useMemo(() => {
    const values = (progress.completed || [])
      .map((item) => Number(item.section_scores?.accuracy))
      .filter(Number.isFinite)
    return values.length ? Math.max(...values) : 0
  }, [progress])

  const completed = (key) => (progress.completed || []).some((item) => item.test_key === key)

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>APRIORI TEST LAB</span>
            <h1>PSAT &amp; SAT Mock Tests</h1>
            <p>Twenty full-length adaptive practice forms with timed modules, persistent attempts, scoring, and a progress trail that carries into your student dashboard.</p>
          </div>
          <div className={styles.heroBadge}><span>20</span><small>Live Mocks</small></div>
        </section>

        <section className={styles.summaryGrid}>
          <div className={styles.summaryCard}><span className={styles.summaryLabel}>TESTS COMPLETED</span><strong>{completedCount}</strong><p>Completed PSAT/SAT attempts saved to your account</p></div>
          <div className={styles.summaryCard}><span className={styles.summaryLabel}>BEST ACCURACY</span><strong>{bestAccuracy}%</strong><p>Highest completed mock accuracy so far</p></div>
          <div className={styles.summaryCard}><span className={styles.summaryLabel}>FULL LIBRARY</span><strong>20</strong><p>10 PSAT/NMSQT forms + 10 Digital SAT forms</p></div>
        </section>

        <section className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionEyebrow}>PSAT / NMSQT</span>
            <h2>Ten PSAT mock tests are available</h2>
            <p>All ten PSAT/NMSQT forms use the shared validated adaptive execution engine, persistent progress, scoring, and reporting.</p>
          </div>
          <Link href="/SATMocks/results" className={styles.actionButton}>View Performance Reports</Link>
        </section>

        <section className={styles.testGrid}>
          {tests.map((testNumber) => (
            <MockCard key={`PSAT${testNumber}`} track="PSAT" testNumber={testNumber} completed={completed(`PSAT${testNumber}`)} />
          ))}
        </section>

        <section className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionEyebrow}>DIGITAL SAT · SERIES A</span>
            <h2>Ten SAT mock tests are available</h2>
            <p>All ten Digital SAT forms use the same single student account and the shared validated adaptive execution engine.</p>
          </div>
        </section>

        <section className={styles.testGrid}>
          {tests.map((testNumber) => (
            <MockCard key={`SAT${testNumber}`} track="SAT" testNumber={testNumber} completed={completed(`SAT${testNumber}`)} />
          ))}
        </section>

        <div className={styles.dashboardFooterNote}>
          <p>All PSAT/SAT mock attempts are saved against the same verified student account and reflected in the Profile dashboard.</p>
          <Link href="/Profile">View Progress Dashboard</Link>
        </div>
      </div>
    </div>
  )
}
