import {
  getVerifiedSatServerAccessState,
} from "../../lib/sat/satAccess";

import { getSatLoginUrl } from "../../lib/sat/satLogin";

import {
  getSatTestAccess,
} from "../../lib/sat/testAccess";

import Link from "next/link";
import styles from "../../styles/SATMocks.module.css";

const tests = Array.from(
  { length: 10 },
  (_, index) => index + 1
);

export default function SATMocksPage({
  authenticated,
  user,
  testAccess,
}) {
  if (!authenticated) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <section className={styles.loginCard}>
            <div className={styles.eyebrow}>
              Digital SAT
            </div>

            <h1>Mock Tests</h1>

            <p>
              Please log in to access your Digital SAT
              mock tests.
            </p>

            <a
              href={getSatLoginUrl("/SATMocks")}
              className={`${styles.actionButton} ${styles.primaryButton}`}
            >
              Log in
            </a>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.heroAccent} />

          <div className={styles.eyebrow}>
            Digital SAT
          </div>

          <h1>Mock Tests</h1>

          <p>
            Welcome
            {user?.name ? `, ${user.name}` : ""}.
            Choose a mock test below and build your
            Digital SAT readiness step by step.
          </p>
        </section>

        <section className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <div className={styles.summaryLabel}>
              Total mock tests
            </div>

            <div className={styles.summaryNumber}>
              10
            </div>

            <div className={styles.summaryDescription}>
              Digital SAT practice tests
            </div>
          </div>

          <div
            className={`${styles.summaryCard} ${styles.summaryCardIncluded}`}
          >
            <div className={styles.summaryLabel}>
              Included with account
            </div>

            <div className={styles.summaryNumber}>
              2
            </div>

            <div className={styles.summaryDescription}>
              Tests 1–2
            </div>
          </div>

          <div
            className={`${styles.summaryCard} ${styles.summaryCardPremium}`}
          >
            <div className={styles.summaryLabel}>
              SAT Premium
            </div>

            <div className={styles.summaryNumber}>
              8
            </div>

            <div className={styles.summaryDescription}>
              Tests 3–10
            </div>
          </div>
        </section>

        <section className={styles.sectionHeader}>
          <h2>Your mock tests</h2>

          <p>
            Tests 1 and 2 are included with your verified
            student account. Tests 3–10 require SAT Premium.
          </p>
        </section>

        <section className={styles.testGrid}>
          {tests.map((testNumber) => {
            const access = testAccess[testNumber];

            if (!access) {
              return null;
            }

            const isPremium = testNumber >= 3;

            const isLocked =
              !access.allowed &&
              access.reason ===
                "subscription_required";

            return (
              <article
                key={testNumber}
                className={`${styles.testCard} ${
                  isLocked
                    ? styles.testCardLocked
                    : styles.testCardAvailable
                }`}
              >
                <div>
                  <div className={styles.testCardTop}>
                    <div>
                      <h3 className={styles.testNumber}>
                        Test {testNumber}
                      </h3>

                      <p className={styles.testSubtitle}>
                        Digital SAT Mock Test
                      </p>
                    </div>

                    <span
                      className={`${styles.status} ${
                        isLocked
                          ? styles.statusPremium
                          : styles.statusAvailable
                      }`}
                    >
                      {isLocked
                        ? "PREMIUM"
                        : isPremium
                        ? "UNLOCKED"
                        : "AVAILABLE"}
                    </span>
                  </div>

                  <p className={styles.testDescription}>
                    {access.allowed
                      ? isPremium
                        ? "Premium access is active. You can start this mock test."
                        : "Available with your verified student account."
                      : "SAT Premium is required to access this mock test."}
                  </p>
                </div>

                {access.allowed ? (
                  <Link
                    href={`/SATMocks/Test${testNumber}`}
                    className={`${styles.actionButton} ${styles.primaryButton}`}
                  >
                    Start Test {testNumber}
                  </Link>
                ) : isLocked ? (
                  <Link
                    href={`/SATMocks/purchase?test=${testNumber}`}
                    className={`${styles.actionButton} ${styles.premiumButton}`}
                  >
                    Unlock with SAT Premium
                  </Link>
                ) : (
                  <div
                    className={styles.actionButton}
                    style={{
                      background: "#eef0f4",
                      color: "#667085",
                      cursor: "default",
                    }}
                  >
                    Currently unavailable
                  </div>
                )}
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const accessState =
    await getVerifiedSatServerAccessState(
      context.req
    );

  if (!accessState.authenticated) {
    return {
      redirect: {
        destination: getSatLoginUrl("/SATMocks"),
        permanent: false,
      },
    };
  }

  const testAccess = {};

  for (const testNumber of tests) {
    testAccess[testNumber] =
      await getSatTestAccess(
        accessState.user.id,
        testNumber
      );
  }

  return {
    props: {
      authenticated: true,

      user: {
        id: accessState.user?.id || null,
        name: accessState.user?.name || null,
      },

      testAccess,
    },
  };
}
