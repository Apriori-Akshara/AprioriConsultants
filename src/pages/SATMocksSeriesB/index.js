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
            <p>This is the second SAT mock-test series, containing SAT Mock Tests 11–20. It follows SAT Series A 1–10 and the PSAT 1–10 production sequence.</p>
          </div>
          <div className={styles.heroBadge}><span>10</span><small>Planned Mocks</small></div>
        </section>

        <section className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionEyebrow}>DIGITAL SAT · SERIES B</span>
            <h2>SAT Mock Tests 11–20</h2>
            <p>These forms are intentionally not released yet. Batch M will generate and validate them only after SAT Series A 1–10 and PSAT 1–10 have been accepted in sequence.</p>
          </div>
          <Link href="/SATMocks" className={styles.actionButton}>View SAT Series A</Link>
        </section>

        <section className={styles.testGrid}>
          {tests.map((testNumber) => (
            <article key={testNumber} className={`${styles.testCard} ${styles.testCardPremiumLocked}`}>
              <div className={styles.testCardTop}>
                <div className={styles.testIdentity}>
                  <div className={styles.testIcon}>S</div>
                  <div>
                    <span className={styles.testNumber}>SAT · SERIES B</span>
                    <h3>SAT Mock Test {testNumber}</h3>
                  </div>
                </div>
                <span className={styles.status}>Not released</span>
              </div>
              <p className={styles.testDescription}>Reserved production slot. No question data, score, progress, or payment-success state is fabricated before the mock passes Batch M QC.</p>
              <div className={styles.actionArea}>
                <span className={styles.actionButton} aria-disabled="true">Coming later</span>
              </div>
            </article>
          ))}
        </section>

        <div className={styles.dashboardFooterNote}>
          <p>Production order: SAT Series A 1–10 → PSAT 1–10 → SAT Series B 11–20 → final 20-mock corpus QC.</p>
          <Link href="/PSATMocks">View PSAT Mocks</Link>
        </div>
      </div>
    </div>
  )
}
