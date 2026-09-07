/**
 * Authenticated SAT program entry point.
 *
 * DAY 2:
 * - Protect the SAT area from logged-out users.
 * - Use the server-side authenticated session as the authority.
 * - Preserve a safe return path through the existing login page.
 */

import Head from "next/head";
import {
  getSafeSatReturnPath,
  getSatLoginUrl,
  getVerifiedSatServerAccessState,
} from "../../lib/sat/satAccess";
import SAT_PROGRAM_CONFIG from "../../data/sat/programConfig";

export async function getServerSideProps(context) {
  const returnTo = getSafeSatReturnPath(
    context.resolvedUrl || "/SATMocks"
  );

  const access = await getVerifiedSatServerAccessState(context.req);

  if (!access.authenticated) {
    return {
      redirect: {
        destination: getSatLoginUrl(returnTo),
        permanent: false,
      },
    };
  }

  return {
    props: {
      satUser: access.user,
      satAuthMode: access.mode,
      programName: SAT_PROGRAM_CONFIG.shortName,
    },
  };
}

export default function SATMocks({
  satUser,
  satAuthMode,
  programName,
}) {
  return (
    <>
      <Head>
        <title>{programName}</title>
        <meta
          name="robots"
          content="noindex,nofollow"
        />
      </Head>

      <main
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 20px",
          background: "#f7f8fc",
        }}
      >
        <section
          style={{
            width: "100%",
            maxWidth: "900px",
            background: "#ffffff",
            borderRadius: "20px",
            padding: "48px 36px",
            boxShadow: "0 10px 35px rgba(0, 0, 0, 0.08)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 14px",
              borderRadius: "999px",
              background: "#eef4ff",
              color: "#1f4fbf",
              fontSize: "14px",
              fontWeight: 600,
              marginBottom: "18px",
            }}
          >
            <span aria-hidden="true">✓</span>
            Authenticated SAT Area
          </div>

          <h1
            style={{
              margin: "0 0 14px",
              fontSize: "clamp(30px, 5vw, 48px)",
              lineHeight: 1.1,
            }}
          >
            {programName}
          </h1>

          <p
            style={{
              margin: "0 auto 12px",
              maxWidth: "650px",
              fontSize: "18px",
              lineHeight: 1.6,
              color: "#5a6170",
            }}
          >
            Welcome{satUser?.name ? `, ${satUser.name}` : ""}.
          </p>

          <p
            style={{
              margin: "0 auto 24px",
              maxWidth: "650px",
              fontSize: "16px",
              lineHeight: 1.6,
              color: "#6b7280",
            }}
          >
            Your authenticated SAT program entry point is now protected
            by the server-side session. The student dashboard and
            complete mock-test experience will be added in the next
            development stages.
          </p>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 14px",
              borderRadius: "10px",
              background: "#f4f5f7",
              color: "#5d6470",
              fontSize: "13px",
            }}
          >
            Access state: {satAuthMode}
          </div>
        </section>
      </main>
    </>
  );
}
