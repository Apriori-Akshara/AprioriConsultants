# Batch M Stage 14 — Frontend Route and Calculator Remediation — 2026-09-23

**Scope:** Stage 14 public student-facing inspection defect remediation  
**Branch:** `main`  
**Release eligibility:** false
**Stage 14 status:** COMPLETE — user quick-check verified all 30 frozen mocks on the public website

## Findings

Two student-facing defects were traced beyond the earlier page-level fixes:

1. PSAT cards were using the SAT dynamic route (`/SATMocks/PSATn`) instead of a canonical PSAT route. This left PSAT navigation dependent on SAT-route behavior and could surface the Series B fallback.
2. Desmos access was implemented as external anchors/iframe-oriented UI in the shared runner, without a single calculator control that guaranteed both testing calculator modes across Series A and Series B.

## Implemented correction

- PSAT library cards now use `/PSATMocks/PSAT1` through `/PSATMocks/PSAT10`.
- Added canonical `src/pages/PSATMocks/[testId].js` with explicit PSAT authentication, access, and test-family validation.
- Legacy `/SATMocks/PSATn` requests are redirected to the canonical PSAT route.
- Extracted the browser test runner into `src/components/SATMockTestRunner.jsx` so the PSAT page does not import a Next.js page module or risk carrying server-only dependencies into the client bundle.
- SAT and PSAT now share the same browser runner.
- Added a visible **Desmos Calculator** control in every Math module.
- Graphing and Scientific calculator actions open the current Desmos College Board testing calculators through a user-gesture `window.open` with a same-tab fallback if the browser blocks the new tab.
- Removed iframe dependence for Desmos.
- Updated the public smoke workflow and route verifier to cover the canonical PSAT URLs.

## Relevant commits

- `c1229c9b1f835c7187bcdc8f42245e9989b7a61e` — canonical PSAT library routes
- `dacfb3e0b9ed12ee6ed6e06db7f10af2a7b4c6a5` — PSAT legacy-route canonicalization + calculator controls
- `4fc9563e0dc29a00b0697d759d5aa3359be9fcf7` — calculator control styling
- `d0bded34a1ac77c37151273ae84bae3bd5535a99` — separate SAT server route from browser runner
- `0f8e0bf520c83d2395468cf987a0eff63618501` — shared browser runner
- `74aa5c2e986bb5910bc216aec72b09be6f6eda72` — canonical PSAT runner integration
- `048b337c21afc9c1f4657b604b46e530a49ce898` — smoke-workflow coverage update

## Validation status

Static source inspection confirms:

- canonical PSAT route exists;
- all 10 PSAT library cards point to the PSAT route;
- shared runner contains both official College Board Desmos testing calculator destinations;
- no calculator iframe remains;
- protected SAT/PSAT route smoke verification is configured for the canonical PSAT URLs.

The user subsequently completed the required live student-facing quick check across all 30 frozen mocks and reported that all 30 mocks are loading publicly. The user also separately verified that Series B tests are loading after the runtime memory remediation commit `c4e73fa0359f7356565aeb794f322b9362c435d6`. Therefore the previously pending live verification requirement is now satisfied at the documented quick-check level.

## Required live acceptance — RESULT

The user completed a quick public-site inspection of all 30 frozen production mocks and reported that all 30 mocks are loading. This closes the Stage 14 live student-facing inspection checkpoint at the documented quick-check level.

The earlier calculator/routing requirements were implemented in the commits listed above, and the user has now confirmed the broader 30-mock public loading check. No additional Stage 14 implementation is required unless a new defect is reported.

**Stage 14: COMPLETE.**
