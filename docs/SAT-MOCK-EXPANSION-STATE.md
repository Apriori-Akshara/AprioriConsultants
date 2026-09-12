# SAT Mock Expansion State — September 12, 2026

This is the current expansion addendum to `docs/SAT-PROJECT-STATE.md`.

## Completed expansion batches

- Mock 3: complete and frozen.
- Mock 4: complete and frozen.
- Mock 5: complete and deployed LIVE.
- Mock 6: complete and deployed LIVE after originality/generation fixes.
- Mock 7: complete and deployed LIVE after originality/generation fixes.
- Existing Mocks 1–7 remain preserved and are not regenerated.

## Mock 8 batch

Mock 8 is implemented through the existing shared production pipeline:
- PSAT Mock 8
- SAT Mock 8 — Series A
- Original R&W contexts and Math generation seed pair 14/15.
- Cross-mock question ID, verbal context/prompt, and Math application checks remain active across all sixteen content sets.
- Shared adaptive engine extended with PSAT8/SAT8.
- No parallel mock engine created.
- Central bank target after this batch: 3,136 questions across 16 mock content sets (196 per mock).

## Quality standard

Each mock must provide 196 bank questions: 27 R&W Module 1, 81 R&W Module 2 route questions, 22 Math Module 1, and 66 Math Module 2 route questions. Shared structural, originality, figure, answer-position, and adaptive-pool gates remain active. Mock 8 must pass the complete series gate before merge.

## Current deployment process

Mock 8 is kept as one coherent branch/PR deployment batch. Do not merge until the full quality gate passes. After merge and LIVE confirmation, freeze this state and proceed directly to Mock 9.

## Public verification

The user will test only the public/live site when explicitly told. Do not ask the user to test the Render URL.

Public site: `https://www.aprioriconsultants.org`

## Next build

After Mock 8 deployment is confirmed LIVE, build **PSAT Mock 9 + SAT Mock 9 — Series A** using the same shared pipeline. Do not restart Stage 3 and do not regenerate earlier mocks.
