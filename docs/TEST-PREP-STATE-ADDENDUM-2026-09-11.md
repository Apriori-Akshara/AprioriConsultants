# Test-Prep Architecture State Addendum — September 11, 2026

This addendum records the product and UI/UX decisions established on September 11, 2026. It should be read together with `docs/SAT-PROJECT-STATE.md`, `docs/SAT-ARCHITECTURE.md`, and `docs/TEST-PREP-ARCHITECTURE.md` until the next project-state consolidation.

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

The canonical Mock route remains `/SATMocks`.

### SAT Courses navigation

The public Courses area is the primary discovery point for SAT preparation and must visibly provide:

- SAT Foundation → `/Courses/SATFoundation`
- SAT Advanced → `/Courses/SATAdvanced`
- SAT Mock Tests → `/SATMocks`

The Progress Dashboard remains under the student Profile area and is not duplicated as a top-level Courses item.

### Student Profile / Progress Dashboard UX

The existing Profile architecture remains in use, but the visible dashboard has been redesigned specifically for test preparation.

The redesign removes the inappropriate language-learning/generic gamification emphasis from the student-facing SAT dashboard, including the visible leaderboard, language selector, generic points/rank presentation, and unrelated language-course statistics.

The new visual direction uses the existing Apriori colour family:

- white;
- blue;
- different shades of blue;
- grey/light neutral surfaces.

The profile dashboard now presents a client-demo-oriented SAT preparation experience with:

- SAT preparation overview;
- Foundation → Advanced → Mock Tests learning path;
- practice/activity snapshot;
- study streak/activity indicators where currently available;
- SAT accuracy placeholder until the SAT data pipeline is connected;
- performance insight areas for strengths/weaknesses, pacing/timing, review queue, and topic progress;
- recommended next step;
- study roadmap;
- goal-setting area marked for future integration;
- downloadable dashboard/progress presentation.

This is a UI/UX milestone. It does not yet implement the underlying SAT analytics/content integrations for every visible feature.

### Legacy question/test material

The repository was verified to contain legacy SAT content and execution infrastructure:

- `src/data/questions.json`
- `src/data/tests.json`
- `src/pages/SATDiagnosticTest/`
- `components/SATTest/`

These are candidates for controlled repurposing into Foundation content, especially Easy-level activities. They must first be audited, classified, assigned new Foundation content IDs, checked for correctness and appropriateness, and reviewed for duplication/originality concerns before publication.

The legacy runtime is not the new SAT Mock architecture.

### Benchmarking decision

The dashboard UX direction is informed by current test-prep patterns from OnePrep, Magoosh, and Manhattan Prep.

Useful patterns to carry into Apriori include:

- practice volume and accuracy;
- skill/topic mastery;
- pacing/timing insights;
- strengths and weaknesses;
- saved/bookmarked/flagged review;
- recommended next activity;
- structured learning paths;
- detailed practice-test reporting;
- clear distinction between learning/practice and full mock-test simulation.

Apriori must not copy competitor branding, wording, proprietary content, or visual design.

## Future implementation contracts — must be planned from Day 1

The current profile UI is intentionally ahead of some backend functionality. Every visible feature must later connect cleanly to product-specific contracts rather than legacy language-learning data.

Future SAT integrations must cover, where relevant:

- Foundation progress;
- Advanced progress;
- question attempts;
- accuracy;
- pacing/timing;
- topic/domain/skill mastery;
- difficulty performance;
- bookmarks/flags;
- recent activity;
- study streak/activity history;
- target score and test date;
- mock attempts and score reports;
- personalized recommendations;
- progress-report generation.

These integrations must remain compatible with the existing server-side authentication/authorization model and must never allow client UI state, Redux, browser-readable data, or legacy score fields to determine access.

## Parallel development

SAT Foundation, SAT Advanced, and SAT Mocks are intended to be developed simultaneously where practical.

This does not mean they should share their question banks, attempts, progress records, or mock-test runtime. Shared authentication/session infrastructure is acceptable.

The profile dashboard is the cross-feature student presentation layer, while product-specific data and authorization remain separate underneath it.

## Current implementation status after this batch

Completed in GitHub:

1. Added **SAT Mock Tests** as a visible third SAT card on the public Courses page, linking to `/SATMocks`.
2. Redesigned the Profile page as an SAT-focused student preparation dashboard while retaining the existing Profile route/architecture.
3. Replaced generic/language-learning dashboard elements with SAT preparation path cards, study snapshots, performance insight areas, roadmap, recommendations, and integration-ready placeholders.
4. Applied the existing white/blue/grey visual family to the redesigned Profile dashboard.
5. Kept the existing SAT Mock engine and authorization architecture untouched.

### Controlled live verification required

After Render deploys this batch, live testing should focus on:

- `/Courses` loads normally and shows Foundation, Advanced, and Mock Tests.
- The **SAT Mock Tests** Courses card opens `/SATMocks`.
- `/Profile` loads normally for a logged-in student.
- The Profile dashboard no longer presents the old leaderboard/language-learning UI.
- The new SAT path cards, progress snapshot, recommendation area, roadmap, and performance areas render correctly on desktop and mobile.
- `/SATMocks` itself remains unchanged in behaviour and access logic.

Do not treat the current visual placeholder states as completed analytics functionality. Their backend/data integrations are later milestones recorded above.
