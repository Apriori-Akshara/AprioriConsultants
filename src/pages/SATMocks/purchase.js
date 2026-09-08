import Link from "next/link";

import {
  getVerifiedSatServerAccessState,
} from "../../lib/sat/satAccess";

import { getSatPremiumPlan } from "../../lib/sat/subscriptionPlans";

import styles from "../../styles/SATPurchase.module.css";

export default function SatPurchasePage({
  plan,
  requestedTest,
}) {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link
          href="/SATMocks"
          className={styles.backLink}
        >
          ← Back to Mock Tests
        </Link>

        <div className={styles.layout}>
          <section className={styles.mainCard}>
            <div className={styles.eyebrow}>
              DIGITAL SAT PREMIUM
            </div>

            <h1 className={styles.title}>
              Unlock SAT Premium
            </h1>

            <p className={styles.intro}>
              Get access to Digital SAT Mock Tests{" "}
              {plan.includedTests.from}–
              {plan.includedTests.to} through your
              student account.
            </p>

            {requestedTest && (
              <div className={styles.context}>
                You selected <strong>Test {requestedTest}</strong>.
                <br />
                SAT Premium unlocks Tests 3–10.
              </div>
            )}

            <ul className={styles.featureList}>
              <li className={styles.feature}>
                <span className={styles.check}>✓</span>
                <span>
                  Access to Mock Tests 3–10
                </span>
              </li>

              <li className={styles.feature}>
                <span className={styles.check}>✓</span>
                <span>
                  Premium access linked to your student
                  account
                </span>
              </li>

              <li className={styles.feature}>
                <span className={styles.check}>✓</span>
                <span>
                  Server-side access control
                </span>
              </li>

              <li className={styles.feature}>
                <span className={styles.check}>✓</span>
                <span>
                  Subscription status and payment records
                  will be linked to your account
                </span>
              </li>
            </ul>

            <div className={styles.priceBox}>
              <div className={styles.priceLabel}>
                SAT Premium
              </div>

              <div className={styles.price}>
                {plan.currency}{" "}
                {plan.amount.toLocaleString("en-IN")}
              </div>

              <div className={styles.duration}>
                Premium subscription
              </div>
            </div>

            <button
              type="button"
              disabled
              className={`${styles.purchaseButton} ${styles.disabled}`}
            >
              Payment gateway coming next
            </button>

            <p className={styles.notice}>
              No payment has been processed. Premium will
              only be activated after payment is successfully
              verified by the server.
            </p>
          </section>

          <aside className={styles.sideCard}>
            <h2 className={styles.sideTitle}>
              Payment status design
            </h2>

            <div className={styles.stateList}>
              <div className={styles.state}>
                <div className={styles.stateName}>
                  Ready to purchase
                </div>
                <div className={styles.stateDescription}>
                  Student can begin the payment process.
                </div>
              </div>

              <div className={styles.state}>
                <div className={styles.stateName}>
                  Payment processing
                </div>
                <div className={styles.stateDescription}>
                  Gateway payment is being processed.
                </div>
              </div>

              <div className={styles.state}>
                <div className={styles.stateName}>
                  Payment successful
                </div>
                <div className={styles.stateDescription}>
                  Server verification activates entitlement.
                </div>
              </div>

              <div className={styles.state}>
                <div className={styles.stateName}>
                  Payment failed or cancelled
                </div>
                <div className={styles.stateDescription}>
                  Student receives a clear retry path.
                </div>
              </div>

              <div className={styles.state}>
                <div className={styles.stateName}>
                  Subscription active / expired
                </div>
                <div className={styles.stateDescription}>
                  Dashboard access reflects the actual
                  entitlement.
                </div>
              </div>

              <div className={styles.state}>
                <div className={styles.stateName}>
                  Receipt / support
                </div>
                <div className={styles.stateDescription}>
                  Receipt and support paths can be connected
                  when the gateway is integrated.
                </div>
              </div>
            </div>

            <div className={styles.trust}>
              Payment activation is intentionally not
              simulated during this development stage.
              The real payment gateway will be connected
              in the next milestone.
            </div>
          </aside>
        </div>
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
        destination: "/Auth",
        permanent: false,
      },
    };
  }

  const plan = getSatPremiumPlan();

  const requestedTestNumber = context.query?.test
    ? Number(context.query.test)
    : null;

  const requestedTest =
    Number.isInteger(requestedTestNumber) &&
    requestedTestNumber >= 3 &&
    requestedTestNumber <= 10
      ? requestedTestNumber
      : null;

  return {
    props: {
      plan,
      requestedTest,
    },
  };
}
