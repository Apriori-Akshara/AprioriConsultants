import { getVerifiedSatServerAccessState } from "../../lib/sat/satAccess";
import { getSatLoginUrl } from "../../lib/sat/satLogin";
import { getSatTestAccess } from "../../lib/sat/testAccess";
import { normalizeMockKey, buildClientSafeTest } from "../../lib/sat/productionAdaptiveMockEngine";
import SATMockTestRunner from "../../components/SATMockTestRunner";

export async function getServerSideProps(context) {
  const accessState = await getVerifiedSatServerAccessState(context.req);
  if (!accessState.authenticated) {
    return {
      redirect: {
        destination: getSatLoginUrl("/SATMocks/" + String(context.params.testId || "")),
        permanent: false,
      },
    };
  }

  const testKey = normalizeMockKey(String(context.params.testId || ""));
  if (!testKey) return { notFound: true };

  if (testKey.startsWith("PSAT")) {
    return { redirect: { destination: "/PSATMocks/" + testKey, permanent: false } };
  }

  const testNumber = testKey.startsWith("SAT") ? Number(testKey.slice(3)) : null;
  const assessmentFamily = testKey.startsWith("SAT") ? "sat" : null;
  const access = testNumber
    ? await getSatTestAccess(accessState.user?.id, testNumber, assessmentFamily)
    : { allowed: false };

  if (!access.allowed) {
    const fallbackDestination =
      testNumber && testNumber <= 10 ? "/SATMocks" : "/SATMocksSeriesB";
    return { redirect: { destination: fallbackDestination, permanent: false } };
  }

  const test = buildClientSafeTest(testKey);
  if (!test) return { notFound: true };
  return { props: { test } };
}

export default SATMockTestRunner;
