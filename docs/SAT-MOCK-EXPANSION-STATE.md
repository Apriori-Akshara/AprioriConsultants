# SAT Mock Expansion State — September 12, 2026

This is the current expansion addendum to `docs/SAT-PROJECT-STATE.md`.

## Completed expansion batches

- Mock 3: complete and frozen.
- Mock 4: complete and frozen.
- Mock 5: complete and deployed LIVE.
- Existing Mocks 1–4 remain preserved and are not regenerated.

## Mock 6 batch

Mock 6 is implemented through the existing shared production pipeline:
- PSAT Mock 6
- SAT Mock 6 — Series A
- Original R&W contexts and Math generation seeds.
- Cross-mock question ID, verbal context/prompt, and Math application checks extended through all twelve content sets.
- Shared adaptive engine extended with PSAT6/SAT6.
- No parallel mock engine created.
- Central bank target after this batch: 2,352 questions across 12 mock content sets (196 per mock).

## Quality standard

Each mock must provide 196 bank questions: 27 R&W Module 1, 81 R&W Module 2 route questions, 22 Math Module 1, and 66 Math Module 2 route questions. Shared structural, originality, figure, answer-position, and adaptive-pool gates remain active.

## Current deployment process

Mock 6 is kept as one coherent branch/PR deployment batch. Once merged and LIVE, freeze this state and proceed directly to Mock 7 rather than introducing unnecessary intermediate deployments.

## Public verification

The user will test only the public/live site when explicitly told. Do not ask the user to test the Render URL.

Public site: `https://www.aprioriconsultants.org`

## Next build

After Mock 6 deployment is confirmed LIVE, build **PSAT Mock 7 + SAT Mock 7 — Series A** using the same shared pipeline. Do not restart Stage 3 and do not regenerate earlier mocks.
