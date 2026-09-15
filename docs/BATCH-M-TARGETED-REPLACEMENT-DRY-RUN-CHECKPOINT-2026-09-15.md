# Batch M Targeted Replacement Dry-Run Checkpoint — September 15, 2026

**Status:** DRY RUN EXECUTED — QUALITY GATE FAILED; R&W RHETORICAL SYNTHESIS UNIQUENESS REMEDIATION NEXT  
**Recorded on:** `main`  
**Code-remediation branch for the next generator change:** `batch-m-rw-generator-remediation-2026-09-14`  
**Production boundary:** Frozen; no production mutation, replacement, release, or SAT21 creation authorized

## 1. Steps completed in this work sequence

The following Batch M post-audit stages are complete and recorded:

1. Representative remediation QC — PASS.
2. Production impact identification — COMPLETE.
3. Impact classification — COMPLETE.
4. Targeted review inventory — COMPLETE.
5. Targeted replacement preparation — COMPLETE for 2,144 affected production records.
6. The stronger `scripts/runBatchMTargetedReplacementDryRun.js` candidate-pool quality harness was synchronized to `main`.
7. A local module-resolution correction in `src/data/sat/mockContent/mathBankFactoryRemediated.js` was restored and committed to `main` so the remediation dry run could execute.
8. The targeted replacement dry run was executed from `D:\AprioriConsultants-Git`.

No production question record was mutated during these steps.

## 2. Dry-run result

Command executed:

`npm run qc:batch-m-targeted-replacement`

The runner successfully reached the R&W candidate-pool quality checks.

Results reported by the runner:

- R&W pool size: **1,080**
- Cross-Text: **108 / 108**
- Rhetorical Synthesis: **108 / 108 generated**
- Words in Context: **108 / 108**
- Reasoning-driven: **756 / 42**

The run then failed the uniqueness gate:

`Batch M targeted replacement dry run FAILED.`

`SAT R&W Rhetorical Synthesis: duplicate normalized prompts found (96).`

The Node `MODULE_TYPELESS_PACKAGE_JSON` message was only a warning and was not the cause of the failure.

## 3. Interpretation of the failure

The module-resolution issue is resolved sufficiently for the dry-run harness to execute. The current blocker is now a **candidate-generator content/uniqueness defect**, specifically in Rhetorical Synthesis generation.

The generator currently uses deterministic source/goal/template combinations. The dry run demonstrates that generating 108 Rhetorical Synthesis candidates does not yet produce sufficient normalized prompt uniqueness: **96 duplicate normalized prompts were detected**.

This is a generator-level candidate-pool problem, not a production-store problem.

## 4. Explicit next step

**NEXT STEP: Diagnose and remediate Rhetorical Synthesis candidate uniqueness in `src/data/sat/mockContent/verbalConstructionRemediated.js`, specifically the `makeSynthesis()` construction, without mutating the frozen production corpus.**

The next implementation must:

1. inspect the existing `makeSynthesis()` construction and its deterministic variation inputs;
2. increase genuine Rhetorical Synthesis prompt/context/communication-goal diversity rather than merely changing IDs or metadata;
3. preserve the approved SAT-style Rhetorical Synthesis construction contract;
4. preserve originality and avoid copied College Board/competitor content;
5. keep all candidates `candidate`/non-operational and outside the production store;
6. rerun the targeted dry-run uniqueness gate after the generator correction;
7. continue only after the full applicable R&W and Math candidate-pool gates are evaluated.

Do not bypass or weaken the uniqueness gate merely to obtain a passing count.

## 5. Branch rule

**Documentation/status records belong on `main`** because `main` is the current source-of-truth repository state and must record what has actually been completed and what the current blocker/next step is.

**The next generator implementation belongs on `batch-m-rw-generator-remediation-2026-09-14`** (or a clearly designated successor remediation branch) so that the generator change can be validated in isolation and merged only after the relevant dry-run gates pass.

Production mutation remains unauthorized.

## 6. Resume rule

Future sessions must not repeat the completed impact audit, classification, inventory, preparation, module-resolution correction, or dry-run harness synchronization unless a repository discrepancy requires verification.

Resume by inspecting and correcting Rhetorical Synthesis candidate uniqueness, then rerun:

`npm run qc:batch-m-targeted-replacement`

No SAT21 or additional production target may be created.
