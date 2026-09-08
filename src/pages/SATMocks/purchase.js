import Link from "next/link";
import {
  getVerifiedSatServerAccessState,
} from "../../lib/sat/satAccess";
import { getSatPremiumPlan } from "../../lib/sat/subscriptionPlans";

export default function SatPurchasePage({
  plan,
  requestedTest,
}) {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background: "#f7f8fb",
      }}
    >
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
        }}
      >
        <Link href="/SATMocks">
          ← Back to Mock Tests
        </Link>

        <section
          style={{
            marginTop: "30px",
            background: "#ffffff",
            border: "1px solid #e1e4e8",
            borderRadius: "16px",
            padding: "32px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            DIGITAL SAT
          </p>

          <h1
            style={{
              fontSize: "34px",
              margin: "10px 0",
            }}
          >
            Unlock SAT Premium
          </h1>

          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.6,
            }}
          >
            Get access to Digital SAT Mock Tests{" "}
            {plan.includedTests.from}–{plan.includedTests.to}.
          </p>

          {requestedTest && (
            <div
              style={{
                padding: "14px",
                margin: "24px 0",
                borderRadius: "10px",
                background: "#f1f3f5",
              }}
            >
              You selected Test {requestedTest}.
              <br />
              Premium access unlocks Tests 3–10.
            </div>
          )}

          <div
            style={{
              display: "grid",
              gap: "12px",
              margin: "24px 0",
            }}
          >
            <div>✓ Mock Tests 3–10</div>
            <div>✓ Premium access linked to your account</div>
            <div>✓ Access remains controlled server-side</div>
          </div>

          <div
            style={{
              borderTop: "1px solid #e1e4e8",
              paddingTop: "24px",
              marginTop: "24px",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                marginBottom: "6px",
              }}
            >
              SAT Premium
            </p>

            <strong
              style={{
                fontSize: "28px",
              }}
            >
              {plan.currency} {plan.amount.toLocaleString("en-IN")}
            </strong>
          </div>

          <button
            type="button"
            disabled
            style={{
              width: "100%",
              marginTop: "28px",
              padding: "15px",
              border: 0,
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: 700,
              cursor: "not-allowed",
            }}
          >
            Payment gateway coming next
          </button>

          <p
            style={{
              marginTop: "16px",
              fontSize: "13px",
              lineHeight: 1.5,
            }}
          >
            Your subscription will only be activated after
            payment is successfully verified by the server.
          </p>
        </section>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const accessState =
    await getVerifiedSatServerAccessState(context.req);

  if (!accessState.authenticated) {
    return {
      redirect: {
        destination: "/Auth",
        permanent: false,
      },
    };
  }

  const plan = getSatPremiumPlan();

  return {
    props: {
      plan,
      requestedTest:
        context.query?.test
          ? Number(context.query.test)
          : null,
    },
  };
}
