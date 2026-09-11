# Test-Prep Architecture State Addendum — September 11, 2026

This addendum records the product decisions established on September 11, 2026. It should be read together with `docs/SAT-PROJECT-STATE.md`, `docs/SAT-ARCHITECTURE.md`, and `docs/TEST-PREP-ARCHITECTURE.md` until the next project-state consolidation.

## Confirmed product decisions

### SAT Foundation

SAT Foundation is a standalone learning course that bridges students toward SAT mock-test readiness but is not technically connected to the SAT Mock engine.

The Foundation course contains Verbal and Math and divides each major activity/component into three levels:

- Easy
- Medium
- Hard

The Foundation course has its own progress dashboard.

No leaderboard is required.

The same authenticated student account/session may access SAT Foundation and SAT Mocks, but their progress, content state, activity records, and mock attempts remain separate.

### SAT Mocks

The current SAT Mock dashboard and test architecture remain unchanged and continue according to `docs/SAT-ARCHITECTURE.md` and `docs/SAT-PROJECT-STATE.md`.

No Foundation content is to be inserted into the SAT Mock question pools merely because it is reused for Foundation.

### Legacy question/test material

The repository was verified to contain legacy SAT content and execution infrastructure:

- `src/data/questions.json`
- `src/data/tests.json`
- `src/pages/SATDiagnosticTest/`
- `components/SATTest/`

These are candidates for controlled repurposing into Foundation content, especially Easy-level activities. They must first be audited, classified, assigned new Foundation content IDs, checked for correctness and appropriateness, and reviewed for duplication/originality concerns before publication.

The legacy runtime is not the new SAT Mock architecture.

### Parallel development

SAT Foundation, SAT Advanced, and SAT Mocks are intended to be developed simultaneously where practical.

This does not mean they should share their question banks, attempts, progress records, or mock-test runtime. Shared authentication/session infrastructure is acceptable.

### Future products

Apriori will support separate product paths for:

- SAT
- GRE
- GMAT

The same student login may be used across products, but product-specific authorization and content remain separate.

SAT and GRE may follow similar Foundation/Advanced and adaptive mock-test architecture where appropriate.

GMAT will share the common account/dashboard/course-module architecture but will require a separate mock-test algorithm, structure, timing, scoring, and test-taking design. GMAT mock specifications must be documented before that work begins.

## Repository implementation status

No existing SAT Mock code was changed as part of these decisions.

The new cross-product architecture is documented in:

`docs/TEST-PREP-ARCHITECTURE.md`

The existing live SAT Mock implementation remains the source of truth for the current Mock milestone.

## Next development direction

The next implementation work should build SAT Foundation and SAT Mocks in parallel without coupling them:

1. Design the SAT Foundation information architecture and progress-dashboard model.
2. Inventory and classify the legacy SAT question bank for possible Foundation reuse.
3. Define Foundation activity/content identifiers and storage contracts.
4. Build the Foundation Verbal/Math dashboard with Easy/Medium/Hard states.
5. In parallel, continue the existing SAT Mock milestone from its documented resume point.
6. Keep future GRE/GMAT namespaces and product boundaries in mind when creating shared infrastructure.
