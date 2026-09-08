import {
  getVerifiedSatServerAccessState,
} from "../../../../lib/sat/satAccess";

import {
  getSatPremiumPlan,
} from "../../../../lib/sat/subscriptionPlans";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      reason: "method_not_allowed",
    });
  }

  const accessState =
    await getVerifiedSatServerAccessState(req);

  if (!accessState.authenticated) {
    return res.status(401).json({
      success: false,
      reason: "not_authenticated",
    });
  }

  const plan = getSatPremiumPlan();

  return res.status(200).json({
    success: true,
    plan: {
      code: plan.code,
      name: plan.name,
      currency: plan.currency,
      amount: plan.amount,
      durationDays: plan.durationDays,
    },
    paymentStatus: "gateway_not_connected",
  });
}
