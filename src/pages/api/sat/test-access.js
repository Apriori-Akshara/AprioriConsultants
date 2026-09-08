import { getVerifiedSatServerAccessState } from "../../../lib/sat/satAccess";
import { getSatTestAccess } from "../../../lib/sat/testAccess";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      allowed: false,
      reason: "method_not_allowed",
    });
  }

  const accessState = await getVerifiedSatServerAccessState(req);

  if (!accessState.authenticated) {
    return res.status(401).json({
      allowed: false,
      reason: "not_authenticated",
    });
  }

  const testNumber = req.query?.test;

  const access = await getSatTestAccess(
    accessState.user.id,
    testNumber
  );

  if (!access.allowed) {
    if (access.reason === "subscription_required") {
      return res.status(403).json({
        ...access,
        authenticated: true,
      });
    }

    return res.status(400).json({
      ...access,
      authenticated: true,
    });
  }

  return res.status(200).json({
    ...access,
    authenticated: true,
  });
}
