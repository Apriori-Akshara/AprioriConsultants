import Link from 'next/link'

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

export default function SATMocksSeriesB() {
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
            <p>Select any Series B mock to launch its production test route. Access control remains server-authoritative; no question content is fabricated on this page.</p>
          </div>
          <Link href="/SATMocks" className={styles.actionButton}>View SAT Series A</Link>
        </section>

        <section className={styles.testGrid}>
          {tests.map((testNumber) => (
            <article key={testNumber} className={`${styles.testCard} ${styles.testCardPremiumUnlocked}`}>
              <div className={styles.testCardTop}>
                <div className={styles.testIdentity}>
                  <div className={styles.testIcon}>S</div>
                  <div>
                    <span className={styles.testNumber}>SAT · SERIES B</span>
                    <h3>SAT Mock Test {testNumber}</h3>
                  </div>
                </div>
                <span className={styles.status}>Available</span>
              </div>
              <p className={styles.testDescription}>Canonical production mock with Reading and Writing, Math, adaptive Module 2 routing, saved progress, scoring, and detailed reporting.</p>
              <div className={styles.testMeta}>
                <div className={styles.metaItem}><span className={styles.metaIcon}>✓</span><span>Adaptive</span><strong>2 + 2 modules</strong></div>
                <div className={styles.metaItem}><span className={styles.metaIcon}>✓</span><span>Timed</span><strong>32 + 35 min</strong></div>
                <div className={styles.metaItem}><span className={styles.metaIcon}>✓</span><span>Production</span><strong>196 records</strong></div>
              </div>
              <div className={styles.actionArea}>
                <Link href={`/SATMocks/SAT${testNumber}`} className={`${styles.actionButton} ${styles.premiumButton}`}>
                  Open Mock {testNumber}
                </Link>
              </div>
            </article>
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
