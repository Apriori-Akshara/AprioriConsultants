import {
  getVerifiedSatServerAccessState,
} from "../../lib/sat/satAccess";

import { getSatLoginUrl } from "../../lib/sat/satLogin";

import {
  getSatTestAccess,
} from "../../lib/sat/testAccess";

const tests = Array.from(
  { length: 10 },
  (_, index) => index + 1
);

export default function SATMocksPage({
  authenticated,
  user,
  testAccess,
}) {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f7f8fa",
        padding: "32px 20px 60px",
      }}
    >
      <div
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
        }}
      >
        {!authenticated ? (
          <section
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "16px",
              padding: "40px",
              textAlign: "center",
              boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
            }}
          >
            <h1
              style={{
                margin: "0 0 12px",
                fontSize: "32px",
                lineHeight: "1.2",
              }}
            >
              Digital SAT Mock Tests
            </h1>

            <p
              style={{
                margin: "0 0 24px",
                color: "#4b5563",
                fontSize: "16px",
              }}
            >
              Please log in to access your SAT mock tests.
            </p>

            <a
              href={getSatLoginUrl("/SATMocks")}
              style={{
                display: "inline-block",
                padding: "12px 22px",
                borderRadius: "8px",
                background: "#111827",
                color: "#ffffff",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Log in
            </a>
          </section>
        ) : (
          <>
            {/* Page Header */}
            <section
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "18px",
                padding: "30px",
                marginBottom: "24px",
                boxShadow: "0 4px 18px rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "24px",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ maxWidth: "700px" }}>
                  <div
                    style={{
                      display: "inline-block",
                      padding: "6px 10px",
                      borderRadius: "999px",
                      background: "#eef2ff",
                      color: "#4338ca",
                      fontSize: "12px",
                      fontWeight: "700",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      marginBottom: "12px",
                    }}
                  >
                    Digital SAT
                  </div>

                  <h1
                    style={{
                      margin: "0 0 10px",
                      fontSize: "clamp(30px, 5vw, 42px)",
                      lineHeight: "1.1",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Mock Tests
                  </h1>

                  <p
                    style={{
                      margin: "0",
                      color: "#4b5563",
                      fontSize: "16px",
                      lineHeight: "1.6",
                    }}
                  >
                    Welcome
                    {user?.name ? `, ${user.name}` : ""}.
                    Choose a mock test below and build your
                    Digital SAT readiness step by step.
                  </p>
                </div>
              </div>
            </section>

            {/* Access Summary */}
            <section
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "14px",
                marginBottom: "30px",
              }}
            >
              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "14px",
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    color: "#6b7280",
                    marginBottom: "8px",
                  }}
                >
                  Total mock tests
                </div>

                <div
                  style={{
                    fontSize: "30px",
                    fontWeight: "700",
                  }}
                >
                  10
                </div>
              </div>

              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid #d1fae5",
                  borderRadius: "14px",
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    color: "#047857",
                    marginBottom: "8px",
                  }}
                >
                  Included with account
                </div>

                <div
                  style={{
                    fontSize: "30px",
                    fontWeight: "700",
                    color: "#047857",
                  }}
                >
                  2
                </div>

                <div
                  style={{
                    marginTop: "4px",
                    fontSize: "13px",
                    color: "#6b7280",
                  }}
                >
                  Tests 1–2
                </div>
              </div>

              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid #e0e7ff",
                  borderRadius: "14px",
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    color: "#4338ca",
                    marginBottom: "8px",
                  }}
                >
                  SAT Premium
                </div>

                <div
                  style={{
                    fontSize: "30px",
                    fontWeight: "700",
                    color: "#4338ca",
                  }}
                >
                  8
                </div>

                <div
                  style={{
                    marginTop: "4px",
                    fontSize: "13px",
                    color: "#6b7280",
                  }}
                >
                  Tests 3–10
                </div>
              </div>
            </section>

            {/* Test Section Header */}
            <section style={{ marginBottom: "16px" }}>
              <h2
                style={{
                  margin: "0 0 6px",
                  fontSize: "24px",
                }}
              >
                Your mock tests
              </h2>

              <p
                style={{
                  margin: "0",
                  color: "#6b7280",
                  fontSize: "14px",
                }}
              >
                Tests 1 and 2 are included with your verified
                account. Tests 3–10 require SAT Premium.
              </p>
            </section>

            {/* Test Cards */}
            <section
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "18px",
              }}
            >
              {tests.map((testNumber) => {
                const access = testAccess[testNumber];

                if (!access) {
                  return (
                    <article
                      key={testNumber}
                      style={{
                        background: "#ffffff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "16px",
                        padding: "22px",
                        minHeight: "190px",
                      }}
                    >
                      <h3
                        style={{
                          margin: "0 0 12px",
                          fontSize: "21px",
                        }}
                      >
                        Test {testNumber}
                      </h3>

                      <p
                        style={{
                          margin: "0",
                          color: "#6b7280",
                          lineHeight: "1.5",
                        }}
                      >
                        Access information is currently
                        unavailable.
                      </p>
                    </article>
                  );
                }

                const isPremium =
                  testNumber >= 3;

                const isLocked =
                  !access.allowed &&
                  access.reason ===
                    "subscription_required";

                return (
                  <article
                    key={testNumber}
                    style={{
                      background: "#ffffff",
                      border: isLocked
                        ? "1px solid #e5e7eb"
                        : "1px solid #d1fae5",
                      borderRadius: "16px",
                      padding: "22px",
                      minHeight: "190px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      boxShadow:
                        "0 3px 12px rgba(0,0,0,0.035)",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent:
                            "space-between",
                          alignItems: "center",
                          gap: "10px",
                          marginBottom: "16px",
                        }}
                      >
                        <h3
                          style={{
                            margin: "0",
                            fontSize: "21px",
                          }}
                        >
                          Test {testNumber}
                        </h3>

                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "5px 9px",
                            borderRadius: "999px",
                            fontSize: "11px",
                            fontWeight: "700",
                            whiteSpace: "nowrap",
                            background: isLocked
                              ? "#f3f4f6"
                              : "#ecfdf5",
                            color: isLocked
                              ? "#4b5563"
                              : "#047857",
                          }}
                        >
                          {isLocked
                            ? "PREMIUM"
                            : isPremium
                              ? "UNLOCKED"
                              : "AVAILABLE"}
                        </span>
                      </div>

                      <p
                        style={{
                          margin: "0 0 20px",
                          color: "#4b5563",
                          fontSize: "14px",
                          lineHeight: "1.5",
                        }}
                      >
                        {access.allowed
                          ? isPremium
                            ? "Premium access is active. You can start this mock test."
                            : "Available with your verified student account."
                          : "SAT Premium is required to access this mock test."}
                      </p>
                    </div>

                    <div>
                      {access.allowed ? (
                        <a
                          href={`/SATMocks/Test${testNumber}`}
                          style={{
                            display: "block",
                            textAlign: "center",
                            padding: "11px 14px",
                            borderRadius: "8px",
                            background: "#111827",
                            color: "#ffffff",
                            textDecoration: "none",
                            fontWeight: "600",
                            fontSize: "14px",
                          }}
                        >
                          Start Test {testNumber}
                        </a>
                      ) : isLocked ? (
                        <a
                          href={`/SATMocks/purchase?test=${testNumber}`}
                          style={{
                            display: "block",
                            textAlign: "center",
                            padding: "11px 14px",
                            borderRadius: "8px",
                            background: "#4338ca",
                            color: "#ffffff",
                            textDecoration: "none",
                            fontWeight: "600",
                            fontSize: "14px",
                          }}
                        >
                          Unlock with SAT Premium
                        </a>
                      ) : (
                        <div
                          style={{
                            padding: "11px 14px",
                            borderRadius: "8px",
                            background: "#f3f4f6",
                            color: "#6b7280",
                            textAlign: "center",
                            fontSize: "14px",
                          }}
                        >
                          Currently unavailable
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </section>
          </>
        )}
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
