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

  const { test } = req.query;

  const access = await getSatTestAccess(
    accessState.user.id,
    test
  );

  if (!access.allowed) {
    return res.status(
      access.reason === "subscription_required" ? 403 : 400
    ).json({
      ...access,
      authenticated: true,
    });
  }

  return res.status(200).json({
    ...access,
    authenticated: true,
  });
}
