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

function MockCard({ icon, label, title, description, completed, href, action }) {
  return (
    <article className={`${styles.testCard} ${styles.testCardIncluded}`}>
      <div className={styles.testCardTop}>
        <div className={styles.testIdentity}><div className={styles.testIcon}>{icon}</div><div><span className={styles.testNumber}>{label}</span><h3>{title}</h3></div></div>
        <span className={styles.status}>{completed ? 'Completed' : 'Ready'}</span>
      </div>
      <p className={styles.testDescription}>{description}</p>
      <div className={styles.testMeta}><Meta value="98" label="questions" /><Meta value="2 + 2" label="modules" /><Meta value="64 + 70" label="minutes" /></div>
      <div className={styles.actionArea}><Link href={href} className={`${styles.actionButton} ${styles.primaryButton}`}>{completed ? `Retake ${action}` : `Start ${action}`}</Link></div>
    </article>
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
    const values = (progress.completed || []).map((item) => Number(item.section_scores?.accuracy)).filter(Number.isFinite)
    return values.length ? Math.max(...values) : 0
  }, [progress])
  const premiumActive = tests.some((testNumber) => testAccess[testNumber]?.premiumRequired === true && testAccess[testNumber]?.allowed === true)
  const premiumTests = tests.filter((testNumber) => testAccess[testNumber]?.premiumRequired).length
  const completed = (key) => (progress.completed || []).some((item) => item.test_key === key)

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <div><span className={styles.eyebrow}>APRIORI TEST LAB</span><h1>PSAT &amp; SAT Mock Tests</h1><p>Full-length adaptive practice with timed modules, persistent attempts, and a progress trail that carries into your student dashboard.</p></div>
          <div className={styles.heroBadge}><span>30</span><small>Planned Mocks</small></div>
        </section>

        <section className={styles.summaryGrid}>
          <div className={styles.summaryCard}><span className={styles.summaryLabel}>TESTS COMPLETED</span><strong>{completedCount}</strong><p>Completed PSAT/SAT attempts saved to your account</p></div>
          <div className={styles.summaryCard}><span className={styles.summaryLabel}>BEST ACCURACY</span><strong>{bestAccuracy}%</strong><p>Highest completed mock accuracy so far</p></div>
          <div className={styles.summaryCard}><span className={styles.summaryLabel}>PREMIUM LIBRARY</span><strong>{premiumActive ? 'ACTIVE' : `${premiumTests} tests`}</strong><p>{premiumActive ? 'Premium access is active' : 'SAT Tests 3–10 unlock with Premium'}</p></div>
        </section>

        <section className={styles.sectionHeader}>
          <div><span className={styles.sectionEyebrow}>LIVE MOCKS</span><h2>Six calibrated tests are now online</h2><p>Mock 03 joins the same validated adaptive execution contract as Mocks 01 and 02, with independent original content and series-wide quality gates.</p></div>
          <Link href="/SATMocks/results" className={styles.actionButton}>View Performance Reports</Link>
        </section>

        <section className={styles.testGrid}>
          <MockCard icon="P" label="PSAT / NMSQT · MOCK 01" title="PSAT Mock Test 01" description="Full-length PSAT/NMSQT-style adaptive practice with timed modules, persistent attempts, scoring, and reporting." completed={completed('PSAT1')} href="/SATMocks/PSAT1" action="PSAT 01" />
          <MockCard icon="P" label="PSAT / NMSQT · MOCK 02" title="PSAT Mock Test 02" description="A second independent PSAT/NMSQT-style adaptive form with a fresh question bank, fresh passages, new Math applications, and validated figures." completed={completed('PSAT2')} href="/SATMocks/PSAT2" action="PSAT 02" />
          <MockCard icon="P" label="PSAT / NMSQT · MOCK 03" title="PSAT Mock Test 03" description="A third independent PSAT/NMSQT-style adaptive form with original R&amp;W passages, fresh Math applications, validated figures, timed execution, persistence, scoring, and reporting." completed={completed('PSAT3')} href="/SATMocks/PSAT3" action="PSAT 03" />
          <MockCard icon="S" label="SAT · SERIES A · MOCK 01" title="SAT Mock Test 01" description="Full-length Digital SAT-style adaptive practice with R&amp;W and Math modules, adaptive routing, timed execution, persistence, and results reporting." completed={completed('SAT1')} href="/SATMocks/Test1" action="SAT Mock" />
          <MockCard icon="S" label="SAT · SERIES A · MOCK 02" title="SAT Mock Test 02" description="A second independent Digital SAT-style adaptive form with a fresh question bank, new Math applications, independent figures, and the same shared execution engine." completed={completed('SAT2')} href="/SATMocks/Test2" action="SAT 02" />
          <MockCard icon="S" label="SAT · SERIES A · MOCK 03" title="SAT Mock Test 03" description="A third independent Digital SAT-style adaptive form with original R&amp;W passages, fresh Math applications, independent figures, timed execution, persistence, scoring, and reporting." completed={completed('SAT3')} href="/SATMocks/SAT3" action="SAT 03" />

          {tests.slice(3).map((testNumber) => {
            const access = testAccess[testNumber] || {}
            const isPremium = access.premiumRequired === true
            const isAllowed = access.allowed === true
            return <article key={testNumber} className={`${styles.testCard} ${isPremium ? (isAllowed ? styles.testCardPremiumUnlocked : styles.testCardPremiumLocked) : styles.testCardIncluded}`}>
              <div className={styles.testCardTop}><div className={styles.testIdentity}><div className={styles.testIcon}>{testNumber}</div><div><span className={styles.testNumber}>SAT · SERIES A · MOCK 0{testNumber}</span><h3>SAT Mock Test {testNumber}</h3></div></div><span className={styles.status}>{isAllowed ? 'Unlocked' : 'In build'}</span></div>
              <p className={styles.testDescription}>Reserved in the SAT mock library. Future forms will use the same validated adaptive test architecture and series-wide duplicate controls.</p>
              <div className={styles.testMeta}><Meta value="98" label="questions" /><Meta value="2 + 2" label="modules" /><Meta value="Adaptive" label="template" /></div>
              <div className={styles.actionArea}><span className={`${styles.actionButton} ${styles.premiumButton}`}>Coming next</span></div>
            </article>
          })}
        </section>

        <section className={styles.premiumBanner}><div className={styles.premiumBannerContent}><span className={styles.premiumBannerEyebrow}>SAT PREMIUM</span><h2>Unlock Tests 3–10</h2><p>Premium can be purchased at any stage of preparation. Confirmed payment activates access to the premium SAT test library.</p><div className={styles.premiumBannerFeatures}><span>✓ Tests 3–10</span><span>✓ One Premium subscription</span><span>✓ Payment-verified access</span></div></div><Link href="/SATMocks/purchase" className={styles.premiumBannerButton}>View Premium</Link></section>
        <div className={styles.dashboardFooterNote}><p>Your PSAT/SAT mock attempts are saved against your verified student account and reflected in the Profile dashboard.</p><Link href="/Profile">View Progress Dashboard</Link></div>
      </div>
    </div>
  )
}
