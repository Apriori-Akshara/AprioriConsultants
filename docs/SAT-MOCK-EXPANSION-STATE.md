# SAT Mock Expansion State — September 12, 2026

This is the current expansion addendum to `docs/SAT-PROJECT-STATE.md`.

## Authoritative student access rule

PSAT Mocks 1–10 and SAT Mocks 1–10 are accessed through the **same single student login/account**. **Subscription payment is not required for any of these 20 mocks.**

- One verified student account is used for both PSAT and SAT.
- The same authenticated session can access PSAT Mocks 1–10 and SAT Mocks 1–10.
- Do not create separate PSAT/SAT login systems or require a second account.
- Do not add subscription/payment gating to Mocks 1–10.
- Any older documentation or implementation assumption that Mocks 3–10 require subscription is superseded by this rule.

## Completed expansion batches

- Mock 3: complete and frozen.
- Mock 4: complete and frozen.
- Mock 5: complete and deployed LIVE.
- Mock 6: complete and deployed LIVE after originality/generation fixes.
- Mock 7: complete and deployed LIVE after originality/generation fixes.
- Mock 8: complete and deployed LIVE after the full 16-mock quality gate passed; Mock 2 legacy identity collision was corrected at the source.
- Mock 9: complete and deployed LIVE after the full 18-mock quality gate passed.
- Existing Mocks 1–9 remain preserved and are not regenerated.

## Mock 10 batch

Mock 10 is now implemented through the existing shared production pipeline:
- PSAT Mock 10
- SAT Mock 10 — Series A
- Original R&W contexts and Math generation seed pair 18/19.
- Cross-mock question ID, verbal context/prompt, and Math application checks remain active across all twenty content sets.
- Shared adaptive engine is reused; no parallel mock engine is created.
- Central bank target after this batch: 3,920 questions across 20 mock content sets (196 per mock).

## Quality standard

Each mock must provide 196 bank questions: 27 R&W Module 1, 81 R&W Module 2 route questions, 22 Math Module 1, and 66 Math Module 2 route questions. Shared structural, originality, figure, answer-position, and adaptive-pool gates remain active. Mock 10 passed the complete twenty-mock series gate.

## Current status

Content expansion is **frozen at Mock 10**. The next work is Stage 3 functional completion of PSAT and SAT Mocks 1–10. Do not create Mock 11 until all 10 PSAT mocks and all 10 SAT mocks have been fully functional and publicly QC-approved by the user.

Stage 3 is to be deployed sequentially, one approved step at a time. Avoid unnecessary intermediate deployments within a step.

## Public verification

The user will test only the public/live site when explicitly told. Do not ask the user to test the Render URL.

Public site: `https://www.aprioriconsultants.org`

## Next build

**Stage 3, Step 1 of 12.** Complete the student-facing functional flow for all PSAT Mocks 1–10 and SAT Mocks 1–10 using the existing shared architecture. No subscription gate applies to these mocks. Do not regenerate earlier content and do not create Mock 11.