import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

import { getVerifiedSatServerAccessState } from '../../lib/sat/satAccess'
import { getSatLoginUrl } from '../../lib/sat/satLogin'

import styles from '../../styles/SATMocks.module.css'

const tests = Array.from({ length: 10 }, (_, index) => index + 11)

export async function getServerSideProps(context) {
  const accessState = await getVerifiedSatServerAccessState(context.req)

  if (!accessState.authenticated) {
    return { redirect: { destination: getSatLoginUrl('/SATMocksSeriesB'), permanent: false } }
  }

  return { props: {} }
}

function Meta({ value, label }) {
  return <div className={styles.metaItem}><span className={styles.metaIcon}>✓</span><span>{value}</span><strong>{label}</strong></div>
}

function MockCard({ testNumber, attempt }) {
  const routeKey = `SAT${testNumber}`
  const title = `SAT Mock Test ${String(testNumber).padStart(2, '0')}`
  const label = `SAT · SERIES B`
  const description = 'Original Digital SAT-style adaptive practice with timed modules, persistent progress, scoring, and reporting.'

  const status = attempt?.status === 'in-progress' ? 'In Progress' : attempt?.status === 'completed' ? 'Completed' : 'Ready'
  const actionLabel = status === 'In Progress'
    ? `Resume Mock ${String(testNumber).padStart(2, '0')}`
    : status === 'Completed'
      ? `Retake Mock ${String(testNumber).padStart(2, '0')}`
      : `Start Mock ${String(testNumber).padStart(2, '0')}`

  return (
    <article key={routeKey} className={`${styles.testCard} ${styles.testCardIncluded}`}>
      <div className={styles.testCardTop}>
        <div className={styles.testIdentity}>
          <div className={styles.testIcon}>S</div>
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

export default function SATMocksSeriesB() {
  const [progress, setProgress] = useState({ attempts: [], completed: [] })

  useEffect(() => {
    fetch('/api/sat/mock-progress', { credentials: 'include' })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => data && setProgress(data))
      .catch(() => null)
  }, [])

  const attemptsByTestKey = useMemo(() => {
    const grouped = {}
    for (const item of progress.attempts || []) {
      const key = String(item?.test_key || '')
      if (!/^SAT(?:1[1-9]|20)$/.test(key)) continue
      const existing = grouped[key]
      if (!existing || item.status === 'in-progress' || new Date(item.updated_at || 0).getTime() > new Date(existing.updated_at || 0).getTime()) {
        grouped[key] = item
      }
    }
    return grouped
  }, [progress])

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>APRIORI TEST LAB</span>
            <h1>SAT Mock Tests · Series B</h1>
            <p>The second SAT mock-test series contains SAT Mock Tests 11–20. These are the canonical Batch M production forms and use the same adaptive, timed, resumable test experience as Series A.</p>
          </div>
          <div className={styles.heroBadge}><span>10</span><small>Production Mocks</small></div>
        </section>

        <section className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionEyebrow}>DIGITAL SAT · SERIES B</span>
            <h2>SAT Mock Tests 11–20</h2>
            <p>Choose a mock to start it, resume an in-progress attempt, or retake a completed mock. Your attempt history is tied to your verified student account.</p>
          </div>
          <Link href="/SATMocks" className={styles.actionButton}>View SAT Series A</Link>
        </section>

        <section className={styles.testGrid}>
          {tests.map((testNumber) => (
            <MockCard key={testNumber} testNumber={testNumber} attempt={attemptsByTestKey[`SAT${testNumber}`]} />
          ))}
        </section>

        <div className={styles.dashboardFooterNote}>
          <p>Production sequence: SAT Series A 1–10 → PSAT 1–10 → SAT Series B 11–20. The 30-mock production corpus is frozen.</p>
          <Link href="/PSATMocks">View PSAT Mocks</Link>
        </div>
      </div>
    </div>
  )
}
