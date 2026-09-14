# Question Generation Checkpoint — September 13, 2026

**Status:** Batch M active. SAT1–SAT10, PSAT1–PSAT10, and SAT11–SAT18 are accepted and Render-LIVE. SAT19 is the current production target.

## Batch M production rule

Mocks are generated one at a time. Each mock must pass generation, independent QC, figure/math/originality checks, mock-level checks, cross-mock uniqueness against all previously accepted mocks, canonical storage validation, and Render deployment acceptance before the next mock begins.

## Accepted SAT18

SAT18 is accepted and Render-LIVE.

- test key: `SAT18`
- test ID: `sat-series-b-mock-18`
- variant: `sat-series-b`
- assessment number: `18`
- deterministic seed: `1018`
- validated mock size: `196`
- storage mode: `canonical-runtime-records`
- cross-mock baseline: all 27 prior accepted production mocks

Implementation merge commit: `8fc244c55b2a42f21dfcb8471ac5a5dee0e6aac6`.

## Current target — SAT19

SAT19 is the active production target.

- test key: `SAT19`
- test ID: `sat-series-b-mock-19`
- variant: `sat-series-b`
- assessment number: `19`
- deterministic seed: `1019`
- required validated mock size: `196`
- cross-mock baseline: all 28 accepted production mocks

Implementation files:
- `src/data/sat/mockContent/batchMSAT19ProductionGate.js`
- `src/data/sat/mockContent/batchMProductionStore.js`

The SAT19 gate preserves the established generation, Stage 2, figure quality, Math QC, R&W variation, cross-mock uniqueness, figure originality, canonical schema, 196-record, and JSON round-trip checks.

SAT19 must not be considered accepted until Render-LIVE acceptance.

The Batch M production records remain separate from the legacy public corpus until the final 30-mock corpus gate passes.

## Final corpus gate

After SAT20, run collective QC across all 30 production mocks for schema, distributions, difficulty/adaptive balance, R&W uniqueness, Math construction uniqueness, figure/data uniqueness and relationships, answer-key balance, source/rhetorical diversity, mathematical correctness, originality, storage integrity, and runtime compatibility.