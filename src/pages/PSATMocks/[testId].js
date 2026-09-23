import { getVerifiedSatServerAccessState } from "../../lib/sat/satAccess";
import { getSatLoginUrl } from "../../lib/sat/satLogin";
import { getSatTestAccess } from "../../lib/sat/testAccess";
import { normalizeMockKey, buildClientSafeTest } from "../../lib/sat/productionAdaptiveMockEngine";
import SATMockTestRunner from "../../components/SATMockTestRunner";

export async function getServerSideProps(context) {
  const rawTestId = String(context.params?.testId || "");
  const testKey = normalizeMockKey(rawTestId);

  if (!testKey || !testKey.startsWith("PSAT")) return { notFound: true };

  const testNumber = Number(testKey.slice(4));
  if (!Number.isInteger(testNumber) || testNumber < 1 || testNumber > 10) return { notFound: true };

  const accessState = await getVerifiedSatServerAccessState(context.req);
  if (!accessState.authenticated) {
    return {
      redirect: {
        destination: getSatLoginUrl("/PSATMocks/" + testKey),
        permanent: false,
      },
    };
  }

  const access = await getSatTestAccess(accessState.user?.id, testNumber, "psat");
  if (!access.allowed) return { redirect: { destination: "/PSATMocks", permanent: false } };

  const test = buildClientSafeTest(testKey);
  if (!test) return { notFound: true };

  return { props: { test } };
}

export default function PSATMockTest(props) {
  return <SATMockTestRunner {...props} />;
}
