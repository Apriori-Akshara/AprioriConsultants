export const SAT_PREMIUM_PLAN = {
  code: "SAT_PREMIUM",
  name: "SAT Premium",
  description:
    "Unlock Digital SAT Mock Tests 3–10 with your verified student account.",
  currency: "INR",
  amount: 4999,
  durationDays: 365,
  includedTests: {
    from: 3,
    to: 10,
  },
};

export function getSatPremiumPlan() {
  return SAT_PREMIUM_PLAN;
}
