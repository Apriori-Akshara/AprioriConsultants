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

  return { props: { testAccess } }
}

function Meta({ value, label }) {
  return (
    <div className={styles.metaItem}>
      <span className={styles.metaIcon}>✓</span>
      <span>{value}</span>
      <strong>{label}</strong>
    </div>
  )
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
    const values = (progress.completed || [])
      .map((item) => Number(item.section_scores?.accuracy))
      .filter(Number.isFinite)
    return values.length ? Math.max(...values) : 0
  }, [progress])

  const premiumActive = tests.some((testNumber) => {
    const access = testAccess[testNumber]
    return access?.premiumRequired === true && access?.allowed === true
  })

  const premiumTests = tests.filter((testNumber) => testAccess[testNumber]?.premiumRequired).length
  const psat1Completed = (progress.completed || []).some((item) => item.test_key === 'PSAT1')
  const psat2Completed = (progress.completed || []).some((item) => item.test_key === 'PSAT2')
  const sat1Completed = (progress.completed || []).some((item) => item.test_key === 'SAT1')
  const sat2Completed = (progress.completed || []).some((item) => item.test_key === 'SAT2')

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>APRIORI TEST LAB</span>
            <h1>PSAT &amp; SAT Mock Tests</h1>
            <p>
              Full-length adaptive practice with timed modules, persistent attempts,
              and a progress trail that carries into your student dashboard.
            </p>
          </div>
          <div className={styles.heroBadge}>
            <span>30</span>
            <small>Planned Mocks</small>
          </div>
        </section>

        <section className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>TESTS COMPLETED</span>
            <strong>{completedCount}</strong>
            <p>Completed PSAT/SAT attempts saved to your account</p>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>BEST ACCURACY</span>
            <strong>{bestAccuracy}%</strong>
            <p>Highest completed mock accuracy so far</p>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>PREMIUM LIBRARY</span>
            <strong>{premiumActive ? 'ACTIVE' : `${premiumTests} tests`}</strong>
            <p>{premiumActive ? 'Premium access is active' : 'SAT Tests 3–10 unlock with Premium'}</p>
          </div>
        </section>

        <section className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionEyebrow}>LIVE MOCKS</span>
            <h2>Four calibrated tests are now online</h2>
            <p>Mock 02 uses the same validated adaptive execution contract as Mock 01, with independent original content and cross-mock quality gates.</p>
          </div>
        </section>

        <section className={styles.testGrid}>
          <article className={`${styles.testCard} ${styles.testCardIncluded}`}>
            <div className={styles.testCardTop}>
              <div className={styles.testIdentity}>
                <div className={styles.testIcon}>P</div>
                <div>
                  <span className={styles.testNumber}>PSAT / NMSQT · MOCK 01</span>
                  <h3>PSAT Mock Test 01</h3>
                </div>
              </div>
              <span className={styles.status}>{psat1Completed ? 'Completed' : 'Ready'}</span>
            </div>
            <p className={styles.testDescription}>Full-length PSAT/NMSQT-style adaptive practice with timed modules, persistent attempts, scoring, and reporting.</p>
            <div className={styles.testMeta}>
              <Meta value="98" label="questions" />
              <Meta value="2 + 2" label="modules" />
              <Meta value="64 + 70" label="minutes" />
            </div>
            <div className={styles.actionArea}>
              <Link href="/SATMocks/PSAT1" className={`${styles.actionButton} ${styles.primaryButton}`}>{psat1Completed ? 'Retake PSAT' : 'Start PSAT Mock'}</Link>
            </div>
          </article>

          <article className={`${styles.testCard} ${styles.testCardIncluded}`}>
            <div className={styles.testCardTop}>
              <div className={styles.testIdentity}>
                <div className={styles.testIcon}>P</div>
                <div>
                  <span className={styles.testNumber}>PSAT / NMSQT · MOCK 02</span>
                  <h3>PSAT Mock Test 02</h3>
                </div>
              </div>
              <span className={styles.status}>{psat2Completed ? 'Completed' : 'Ready'}</span>
            </div>
            <p className={styles.testDescription}>A second independent PSAT/NMSQT-style adaptive form with a fresh question bank, fresh passages, new Math applications, and validated figures.</p>
            <div className={styles.testMeta}>
              <Meta value="98" label="questions" />
              <Meta value="2 + 2" label="modules" />
              <Meta value="64 + 70" label="minutes" />
            </div>
            <div className={styles.actionArea}>
              <Link href="/SATMocks/PSAT2" className={`${styles.actionButton} ${styles.primaryButton}`}>{psat2Completed ? 'Retake PSAT 02' : 'Start PSAT 02'}</Link>
            </div>
          </article>

          <article className={`${styles.testCard} ${styles.testCardIncluded}`}>
            <div className={styles.testCardTop}>
              <div className={styles.testIdentity}>
                <div className={styles.testIcon}>S</div>
                <div>
                  <span className={styles.testNumber}>SAT · SERIES A · MOCK 01</span>
                  <h3>SAT Mock Test 01</h3>
                </div>
              </div>
              <span className={styles.status}>{sat1Completed ? 'Completed' : 'Ready'}</span>
            </div>
            <p className={styles.testDescription}>Full-length Digital SAT-style adaptive practice with R&amp;W and Math modules, adaptive routing, timed execution, persistence, and results reporting.</p>
            <div className={styles.testMeta}>
              <Meta value="98" label="questions" />
              <Meta value="2 + 2" label="modules" />
              <Meta value="64 + 70" label="minutes" />
            </div>
            <div className={styles.actionArea}>
              <Link href="/SATMocks/Test1" className={`${styles.actionButton} ${styles.primaryButton}`}>{sat1Completed ? 'Retake SAT Mock' : 'Start SAT Mock'}</Link>
            </div>
          </article>

          <article className={`${styles.testCard} ${styles.testCardIncluded}`}>
            <div className={styles.testCardTop}>
              <div className={styles.testIdentity}>
                <div className={styles.testIcon}>S</div>
                <div>
                  <span className={styles.testNumber}>SAT · SERIES A · MOCK 02</span>
                  <h3>SAT Mock Test 02</h3>
                </div>
              </div>
              <span className={styles.status}>{sat2Completed ? 'Completed' : 'Ready'}</span>
            </div>
            <p className={styles.testDescription}>A second independent Digital SAT-style adaptive form with a fresh question bank, new Math applications, independent figures, and the same shared execution engine.</p>
            <div className={styles.testMeta}>
              <Meta value="98" label="questions" />
              <Meta value="2 + 2" label="modules" />
              <Meta value="64 + 70" label="minutes" />
            </div>
            <div className={styles.actionArea}>
              <Link href="/SATMocks/Test2" className={`${styles.actionButton} ${styles.primaryButton}`}>{sat2Completed ? 'Retake SAT 02' : 'Start SAT 02'}</Link>
            </div>
          </article>

          {tests.slice(2).map((testNumber) => {
            const access = testAccess[testNumber] || {}
            const isPremium = access.premiumRequired === true
            const isAllowed = access.allowed === true

            return (
              <article key={testNumber} className={`${styles.testCard} ${isPremium ? (isAllowed ? styles.testCardPremiumUnlocked : styles.testCardPremiumLocked) : styles.testCardIncluded}`}>
                <div className={styles.testCardTop}>
                  <div className={styles.testIdentity}>
                    <div className={styles.testIcon}>{testNumber}</div>
                    <div>
                      <span className={styles.testNumber}>SAT · SERIES A · MOCK 0{testNumber}</span>
                      <h3>SAT Mock Test {testNumber}</h3>
                    </div>
                  </div>
                  <span className={styles.status}>{isAllowed ? 'Unlocked' : 'In build'}</span>
                </div>
                <p className={styles.testDescription}>Reserved in the SAT mock library. Future forms will use the same validated adaptive test architecture and series-wide duplicate controls.</p>
                <div className={styles.testMeta}>
                  <Meta value="98" label="questions" />
                  <Meta value="2 + 2" label="modules" />
                  <Meta value="Adaptive" label="template" />
                </div>
                <div className={styles.actionArea}>
                  <span className={`${styles.actionButton} ${styles.premiumButton}`}>Coming next</span>
                </div>
              </article>
            )
          })}
        </section>

        <section className={styles.premiumBanner}>
          <div className={styles.premiumBannerContent}>
            <span className={styles.premiumBannerEyebrow}>SAT PREMIUM</span>
            <h2>Unlock Tests 3–10</h2>
            <p>Premium can be purchased at any stage of preparation. Confirmed payment activates access to the premium SAT test library.</p>
            <div className={styles.premiumBannerFeatures}>
              <span>✓ Tests 3–10</span>
              <span>✓ One Premium subscription</span>
              <span>✓ Payment-verified access</span>
            </div>
          </div>
          <Link href="/SATMocks/purchase" className={styles.premiumBannerButton}>View Premium</Link>
        </section>

        <div className={styles.dashboardFooterNote}>
          <p>Your PSAT/SAT mock attempts are saved against your verified student account and reflected in the Profile dashboard.</p>
          <Link href="/Profile">View Progress Dashboard</Link>
        </div>
      </div>
    </div>
  )
}
