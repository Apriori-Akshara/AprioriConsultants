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

function MockCard({ track, testNumber, attempt }) {
  const isPsat = track === 'PSAT'
  const routeKey = `${track}${testNumber}`
  const title = `${isPsat ? 'PSAT/NMSQT' : 'SAT'} Mock Test ${String(testNumber).padStart(2, '0')}`
  const label = `${isPsat ? 'PSAT / NMSQT' : 'SAT'} · MOCK ${String(testNumber).padStart(2, '0')}`
  const description = isPsat
    ? `Original PSAT/NMSQT-style adaptive practice with timed modules, persistent progress, scoring, and reporting.`
    : `Original Digital SAT-style adaptive practice with timed modules, persistent progress, scoring, and reporting.`

  const status = attempt?.status === 'in-progress' ? 'In Progress' : attempt?.status === 'completed' ? 'Completed' : 'Ready'
  const actionLabel = status === 'In Progress'
    ? `Resume Mock ${String(testNumber).padStart(2, '0')}`
    : status === 'Completed'
      ? `Retake Mock ${String(testNumber).padStart(2, '0')}`
      : `Start Mock ${String(testNumber).padStart(2, '0')}`

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
        <span className={styles.status}>{status}</span>
      </div>
      <p className={styles.testDescription}>{description}</p>
      <div className={styles.testMeta}>
        <Meta value="98" label="questions" />
        <Meta value="2 + 2" label="modules" />
        <Meta value="64 + 70" label="minutes" />
      </div>
      <div className={styles.actionArea}>
        <Link href={`/SATMocks/${routeKey}`} className={`${styles.actionButton} ${styles.primaryButton}`}>
          {actionLabel}
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
  const inProgressCount = (progress.attempts || []).filter((item) => item.status === 'in-progress').length
  const bestAccuracy = useMemo(() => {
    const values = (progress.completed || [])
      .map((item) => Number(item.section_scores?.accuracy))
      .filter(Number.isFinite)
    return values.length ? Math.max(...values) : 0
  }, [progress])

  const attemptsByTestKey = useMemo(() => {
    const grouped = {}
    for (const item of progress.attempts || []) {
      const key = String(item?.test_key || '')
      if (!key) continue
      const existing = grouped[key]
      if (!existing || item.status === 'in-progress' || new Date(item.updated_at || 0).getTime() > new Date(existing.updated_at || 0).getTime()) {
        grouped[key] = item
      }
    }
    return grouped
  }, [progress])

  const attemptFor = (key) => attemptsByTestKey[key] || null

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
          <div className={styles.summaryCard}><span className={styles.summaryLabel}>IN PROGRESS</span><strong>{inProgressCount}</strong><p>PSAT/SAT mocks with an active saved attempt</p></div>
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
            <MockCard key={`PSAT${testNumber}`} track="PSAT" testNumber={testNumber} attempt={attemptFor(`PSAT${testNumber}`)} />
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
            <MockCard key={`SAT${testNumber}`} track="SAT" testNumber={testNumber} attempt={attemptFor(`SAT${testNumber}`)} />
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
