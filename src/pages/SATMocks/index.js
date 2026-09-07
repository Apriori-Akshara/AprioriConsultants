import { getVerifiedSatServerAccessState } from "../../lib/sat/satAccess";
import { getSatLoginUrl } from "../../lib/sat/satLogin";

const tests = Array.from({ length: 10 }, (_, index) => index + 1);

export default function SATMocksPage({
  authenticated,
  user,
}) {
  return (
    <main
      style={{
        padding: "40px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1>Digital SAT Mock Tests</h1>

      {!authenticated ? (
        <section>
          <p>
            Please log in to access your SAT mock tests.
          </p>

          <a href={getSatLoginUrl("/SATMocks")}>
            Log in
          </a>
        </section>
      ) : (
        <section>
          <p>
            Welcome{user?.name ? `, ${user.name}` : ""}.
          </p>

          <p>
            Tests 1 and 2 are available with your verified account.
            Tests 3–10 require the SAT Premium subscription.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "16px",
              marginTop: "30px",
            }}
          >
            {tests.map((testNumber) => {
              const premium = testNumber >= 3;

              return (
                <div
                  key={testNumber}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "20px",
                  }}
                >
                  <h2>Test {testNumber}</h2>

                  {premium ? (
                    <>
                      <p>
                        Premium subscription required.
                      </p>

                      <a
                        href={`/SATMocks/purchase?test=${testNumber}`}
                      >
                        Unlock Premium Tests
                      </a>
                    </>
                  ) : (
                    <>
                      <p>
                        Available with your verified account.
                      </p>

                      <a
                        href={`/SATMocks/Test${testNumber}`}
                      >
                        Start Test {testNumber}
                      </a>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}

export async function getServerSideProps(context) {
  const accessState =
    await getVerifiedSatServerAccessState(context.req);

  if (!accessState.authenticated) {
    return {
      redirect: {
        destination: getSatLoginUrl("/SATMocks"),
        permanent: false,
      },
    };
  }

  return {
    props: {
      authenticated: true,
      user: {
        id: accessState.user?.id || null,
        name: accessState.user?.name || null,
      },
    },
  };
}
