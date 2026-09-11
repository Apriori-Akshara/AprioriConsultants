import Link from 'next/link'

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
    testAccess[testNumber] = await getSatTestAccess(
      userId,
      testNumber
    )
  }

  return {
    props: {
      testAccess,
    },
  }
}

export default function SATMocks({ testAccess }) {
  const premiumActive = tests.some((testNumber) => {
    const access = testAccess[testNumber]

    return (
      access?.premiumRequired === true &&
      access?.allowed === true
    )
  })

  const includedTests = tests.filter(
    (testNumber) =>
      !testAccess[testNumber]?.premiumRequired
  ).length

  const premiumTests = tests.length - includedTests

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <section className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>
              APRIORI SAT PREP
            </span>

            <h1>SAT Mock Tests</h1>

            <p>
              Build confidence with structured SAT practice designed
              to help you understand your strengths and prepare
              effectively.
            </p>
          </div>

          <div className={styles.heroBadge}>
            <span>10</span>
            <small>Mock Tests</small>
          </div>
        </section>

        <section className={styles.summaryGrid}>

          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>
              TOTAL TESTS
            </span>

            <strong>{tests.length}</strong>

            <p>
              Complete SAT mock test collection
            </p>
          </div>

          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>
              INCLUDED
            </span>

            <strong>{includedTests}</strong>

            <p>
              Available with your verified account
            </p>
          </div>

          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>
              PREMIUM
            </span>

            <strong>{premiumTests}</strong>

            <p>
              Additional tests with SAT Premium
            </p>
          </div>

        </section>

        <section className={styles.sectionHeader}>

          <div>
            <span className={styles.sectionEyebrow}>
              PRACTICE LIBRARY
            </span>

            <h2>Choose a mock test</h2>

            <p>
              Start with an available test or unlock the complete
              Premium collection.
            </p>
          </div>

          {!premiumActive && (
            <Link
              href="/SATMocks/purchase"
              className={styles.sectionPremiumLink}
            >
              Explore Premium
            </Link>
          )}

        </section>

        <section className={styles.testGrid}>

          {tests.map((testNumber) => {
            const access = testAccess[testNumber] || {}

            const isPremium =
              access.premiumRequired === true

            const isAllowed =
              access.allowed === true

            const isPremiumUnlocked =
              isPremium && isAllowed

            return (
              <article
                key={testNumber}
                className={`${styles.testCard} ${
                  isPremium
                    ? isPremiumUnlocked
                      ? styles.testCardPremiumUnlocked
                      : styles.testCardPremiumLocked
                    : styles.testCardIncluded
                }`}
              >

                <div className={styles.testCardTop}>

                  <div>
                    <span className={styles.testNumber}>
                      TEST {testNumber}
                    </span>

                    <h3>
                      SAT Mock Test {testNumber}
                    </h3>
                  </div>

                  <span className={styles.status}>
                    {isAllowed
                      ? isPremium
                        ? 'Premium'
                        : 'Included'
                      : 'Locked'}
                  </span>

                </div>

                <p className={styles.testDescription}>
                  {isAllowed
                    ? isPremium
                      ? 'Premium access is active. You can start this mock test.'
                      : 'Available with your verified student account.'
                    : 'SAT Premium is required to access this mock test.'}
                </p>

                <div className={styles.testMeta}>

                  <div className={styles.metaItem}>
                    <span className={styles.metaIcon}>
                      ✓
                    </span>

                    <span>
                      {isPremium
                        ? 'Premium test'
                        : 'Included test'}
                    </span>
                  </div>

                  <div className={styles.metaItem}>
                    <span className={styles.metaIcon}>
                      •
                    </span>

                    <span>
                      Full SAT practice
                    </span>
                  </div>

                </div>

                <div className={styles.actionArea}>

                  {isAllowed ? (
                    <Link
                      href={`/SATMocks/Test${testNumber}`}
                      className={`${styles.actionButton} ${styles.primaryButton}`}
                    >
                      Start Test
                    </Link>
                  ) : (
                    <Link
                      href={`/SATMocks/purchase?test=${testNumber}`}
                      className={`${styles.actionButton} ${styles.premiumButton}`}
                    >
                      Unlock Test
                    </Link>
                  )}

                </div>

              </article>
            )
          })}

        </section>

        {!premiumActive && (
          <section className={styles.premiumBanner}>

            <div className={styles.premiumBannerContent}>

              <span className={styles.premiumBannerEyebrow}>
                SAT PREMIUM
              </span>

              <h2>
                Unlock Tests 3–10
              </h2>

              <p>
                Get access to the complete Premium mock-test
                collection. Premium can be purchased at any stage
                of your preparation.
              </p>

              <div className={styles.premiumBannerFeatures}>
                <span>✓ Tests 3–10</span>
                <span>✓ One Premium subscription</span>
                <span>✓ Access after payment verification</span>
              </div>

            </div>

            <Link
              href="/SATMocks/purchase"
              className={styles.premiumBannerButton}
            >
              View Premium
            </Link>

          </section>
        )}

        <div className={styles.dashboardFooterNote}>

          <p>
            Your access is securely checked against your student
            account. Premium access is activated only after payment
            verification.
          </p>

          <Link href="/SATMocks">
            Refresh access
          </Link>

        </div>

      </div>
    </div>
  )
}
