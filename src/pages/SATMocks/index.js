import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

import { getVerifiedSatServerAccessState } from '../../lib/sat/satAccess'
import { getSatLoginUrl } from '../../lib/sat/satLogin'
import { getSatTestAccess } from '../../lib/sat/testAccess'

import styles from '../../styles/SATMocks.module.css'

const tests = Array.from({ length: 10 }, (_, index) => index + 1)
const liveSatTests = new Set([1])

export async function getServerSideProps(context) {
  const accessState = await getVerifiedSatServerAccessState(context.req)

  if (!accessState.authenticated) {
    return {
      redirect: {
        destination: getSatLoginUrl('/SATMocks'),
        permanent: false,
      },
    }
  }

  const userId = accessState.user?.id || null
  const testAccess = {}

  for (const testNumber of tests) {
    testAccess[testNumber] = await getSatTestAccess(userId, testNumber)
  }

  return {
    props: {
      testAccess,
    },
  }
}

export default function SATMocks({ testAccess }) {
  const [progress, setProgress] = useState({ attempts: [], completed: [] })

  useEffect(() => {
    fetch('/api/sat/mock-progress', { credentials: 'include' })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => data && setProgress(data))
      .catch(() => null)
  }, [])

  const completedCount = progress.completed?.length || 0
  const bestAccuracy = useMemo(() => {
    const scores = (progress.completed || [])
      .map((item) => item.section_scores?.accuracy)
      .filter((value) => Number.isFinite(Number(value)))
      .map(Number)
    return scores.length ? Math.max(...scores) : 0
  }, [progress])

  const premiumActive = tests.some((testNumber) => {
    const access = testAccess[testNumber]
    return access?.premiumRequired === true && access?.allowed === true
  })

  const includedTests = tests.filter((testNumber) => !testAccess[testNumber]?.premiumRequired).length
  const premiumTests = tests.length - includedTests

  const psatCompleted = (progress.completed || []).some((item) => item.test_key === 'PSAT1')
  const satCompleted = (progress.completed || []).some((item) => item.test_key === 'SAT1')

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>APRIORI SAT PREP</span>
            <h1>SAT Mock Tests</h1>
            <p>
              Full-length adaptive practice with timed modules, secure attempt saving,
              progress tracking, and performance reporting.
            </p>
          </div>
          <div className={styles.heroBadge}>
            <span>10</span>
            <small>SAT Tests</small>
          </div>
        </section>

        <section className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>TESTS COMPLETED</span>
            <strong>{completedCount}</strong>
            <p>Attempts recorded in your SAT dashboard</p>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>BEST ACCURACY</span>
            <strong>{bestAccuracy}%</strong>
            <p>Highest completed mock accuracy</p>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>SAT PREMIUM</span>
            <strong>{premiumActive ? 'ACTIVE' : `${premiumTests} tests`}</strong>
            <p>{premiumActive ? 'Premium access is active' : 'Tests 3–10 unlock with Premium'}</p>
          </div>
        </section>

        <section className={styles.testGrid}>
          <article className={styles.testCardIncluded}>
            <div className={styles.testCardTop}>
              <div>
                <span className={styles.testNumber}>PSAT / NMSQT</span>
                <h3>PSAT Mock Test 01</h3>
              </div>
              <span className={styles.status}>{psatCompleted ? 'Completed' : 'Ready'}</span>
            </div>
            <p className={styles.testDescription}>
              First adaptive PSAT prototype using the same authoring and attempt architecture planned for the full mock library.
            </p>
            <div className={styles.testMeta}>
              <div className={styles.metaItem}><span className={styles.metaIcon}>✓</span><span>54 R&amp;W + 44 Math</span></div>
              <div className={styles.metaItem}><span className={styles.metaIcon}>•</span><span>Adaptive Module 2</span></div>
            </div>
            <div className={styles.actionArea}>
              <Link href="/SATMocks/PSAT1" className={`${styles.actionButton} ${styles.primaryButton}`}>
                {psatCompleted ? 'Retake PSAT' : 'Start PSAT Mock'}
              </Link>
            </div>
          </article>

          {tests.map((testNumber) => {
            const access = testAccess[testNumber] || {}
            const isPremium = access.premiumRequired === true
            const isAllowed = access.allowed === true
            const isLive = liveSatTests.has(testNumber)
            const completed = (progress.completed || []).some((item) => item.test_key === `SAT${testNumber}`)

            return (
              <article
                key={testNumber}
                className={`${styles.testCard} ${isPremium ? (isAllowed ? styles.testCardPremiumUnlocked : styles.testCardPremiumLocked) : styles.testCardIncluded}`}
              >
                <div className={styles.testCardTop}>
                  <div>
                    <span className={styles.testNumber}>TEST {testNumber}</span>
                    <h3>SAT Mock Test {testNumber}</h3>
                  </div>
                  <span className={styles.status}>
                    {isLive ? (completed ? 'Completed' : (isAllowed ? 'Ready' : 'Locked')) : 'In build'}
                  </span>
                </div>

                <p className={styles.testDescription}>
                  {isLive
                    ? (isAllowed
                      ? 'Adaptive full-length mock with persistent attempt and progress reporting.'
                      : 'SAT Premium is required to access this mock test.')
                    : 'This test is reserved in the 10-test library and will use the same adaptive template as Mock Test 01.'}
                </p>

                <div className={styles.testMeta}>
                  <div className={styles.metaItem}><span className={styles.metaIcon}>✓</span><span>54 R&amp;W + 44 Math</span></div>
                  <div className={styles.metaItem}><span className={styles.metaIcon}>•</span><span>{isLive ? 'Adaptive Module 2' : 'Content authoring next'}</span></div>
                </div>

                <div className={styles.actionArea}>
                  {!isLive ? (
                    <span className={styles.actionButton}>Next in production queue</span>
                  ) : isAllowed ? (
                    <Link href={`/SATMocks/Test${testNumber}`} className={`${styles.actionButton} ${styles.primaryButton}`}>
                      {completed ? 'Retake Test' : 'Start Test'}
                    </Link>
                  ) : (
                    <Link href={`/SATMocks/purchase?test=${testNumber}`} className={`${styles.actionButton} ${styles.premiumButton}`}>
                      Unlock Test
                    </Link>
                  )}
                </div>
              </article>
            )
          })}
        </section>

        <section className={styles.premiumBanner}>
          <div className={styles.premiumBannerContent}>
            <span className={styles.premiumBannerEyebrow}>SAT PREMIUM</span>
            <h2>Unlock Tests 3–10</h2>
            <p>Premium can be purchased at any stage of preparation. Confirmed payment activates access to the premium test library.</p>
            <div className={styles.premiumBannerFeatures}>
              <span>✓ Tests 3–10</span><span>✓ One Premium subscription</span><span>✓ Payment-verified access</span>
            </div>
          </div>
          <Link href="/SATMocks/purchase" className={styles.premiumBannerButton}>View Premium</Link>
        </section>

        <div className={styles.dashboardFooterNote}>
          <p>Your mock attempts are saved against your verified student account and reflected in your progress dashboard.</p>
          <Link href="/Profile">View Progress Dashboard</Link>
        </div>
      </div>
    </div>
  )
}
