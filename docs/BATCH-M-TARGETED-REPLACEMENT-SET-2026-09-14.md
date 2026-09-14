# Batch M Targeted Replacement Set — September 14, 2026

## Status

**TARGETED REPLACEMENT SET ESTABLISHED — PRODUCTION MUTATION NOT YET EXECUTED**

This checkpoint follows the read-only production-impact audit. It records the exact scope approved for targeted remediation without broadening the frozen production boundary.

## Audit basis

The read-only audit covered the frozen production corpus for:

- SAT1–SAT10
- PSAT1–PSAT10

This is 20 mocks / 3,920 records. SAT11–SAT20 remain excluded from content-impact replacement at this stage because their public verification is explicitly deferred.

## Targeted replacement set

The audit identified **1,264 records** for targeted replacement recommendation:

- **732 R&W**
- **532 Math**

The remaining 2,656 audited records are retained for now even where they carry systemic construction-impact flags, because the audit decision rule is targeted replacement rather than wholesale regeneration.

### Replacement construction families

| Construction family | Recommended records |
|---|---:|
| relationship-first Cross-Text | 216 |
| contextual lexical inference | 216 |
| notes → communication goal → synthesis | 216 |
| reasoning-demand-driven R&W construction | 84 |
| strategic/multi-step Math reasoning with misconception-based distractors | 341 |
| figure-essential Math construction | 191 |
| **Total** | **1,264** |

### Mock-level replacement counts

| Mock | Replacement candidates |
|---|---:|
| SAT1 | 61 |
| SAT2 | 70 |
| SAT3 | 70 |
| SAT4 | 59 |
| SAT5 | 61 |
| SAT6 | 60 |
| SAT7 | 69 |
| SAT8 | 69 |
| SAT9 | 60 |
| SAT10 | 58 |
| PSAT1 | 59 |
| PSAT2 | 70 |
| PSAT3 | 69 |
| PSAT4 | 58 |
| PSAT5 | 59 |
| PSAT6 | 60 |
| PSAT7 | 68 |
| PSAT8 | 68 |
| PSAT9 | 58 |
| PSAT10 | 58 |
| **Total** | **1,264** |

## Important production rule

This checkpoint does **not** itself mutate, regenerate, reorder, or silently replace production records.

The strengthened remediation construction layer has passed the representative 80-item candidate QC, but that representative result does not establish production-scale uniqueness or quality for 1,264 replacements. Therefore the next implementation task is a **production-scale targeted replacement dry run**:

1. generate candidates only for the 1,264 approved targets;
2. preserve each target's production question identity and required domain/skill/type constraints;
3. run the strengthened content-quality gate on every candidate;
4. reject duplicates and candidates that fail corpus-level originality or figure constraints;
5. confirm every target has exactly one passing replacement before mutating the frozen corpus;
6. only then perform the explicit post-freeze replacement and record each changed mock/question ID.

No SAT21, no wholesale regeneration, and no unrelated website/auth/payment changes are authorized.

## Release position

Batch M remains on **QUALITY HOLD** until the targeted replacements are generated, individually gated, inserted explicitly, the affected mocks are re-gated, and the final 30-mock collective gate plus 30-mock calibration and release checks pass.
