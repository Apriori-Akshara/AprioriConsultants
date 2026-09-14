# Batch M Targeted Replacement Dry-Run Checkpoint — September 14, 2026

## Status

**Representative remediation: PASS**  
**Production-impact audit: COMPLETE**  
**Targeted replacement dry run: NOT PASSED**  
**Frozen production corpus: QUALITY HOLD**  
**Production mutation: NOT AUTHORIZED**

## Completed work

1. The candidate-only Batch M remediation layer passed the strengthened representative QC: 80 evaluated, 80 passed, 0 failed, average score 100, 0 serious failures, 40 R&W + 40 Math, Math SPR 25%, with production mutation disabled and release eligibility disabled.
2. The production corpus remains frozen at SAT1–SAT10, PSAT1–PSAT10, and SAT11–SAT20: 30 mocks, 196 records per mock, 5,880 records total. No SAT21 has been created.
3. The read-only production-impact audit identified 1,264 targeted replacement candidates: 732 R&W and 532 Math.
4. A candidate-only production-scale targeted-replacement dry-run harness was created. The repository runner exists at `scripts/runBatchMTargetedReplacementDryRun.js`; the local runner was corrected during execution so that it reports substantive gate failures rather than generic runner errors.
5. The dry run reached the R&W capacity and normalized-prompt uniqueness gates without mutating production.

## Confirmed dry-run result

For SAT R&W, the remediation/candidate-factory path generated:

- 1,080 R&W candidates
- 108 Cross-Text candidates required and available
- 108 Rhetorical Synthesis candidates required and available
- 108 Words-in-Context candidates required and available
- 756 other reasoning-driven candidates available against a 42 minimum

The run failed the normalized-prompt uniqueness gate for Cross-Text:

- 108 selected Cross-Text candidates
- 2 unique normalized prompts
- 106 duplicate normalized prompts

An earlier raw-generator diagnostic also showed 162 of 1,080 R&W candidates failing the content-quality gate solely for `rw-choice-near-duplicate`. The existing candidate-factory bridge contains an R&W distractor-repair step, so the later production-scale failure is now correctly isolated to construction/prompt diversity rather than that raw distractor issue.

## Root cause identified

`src/data/sat/mockContent/verbalConstructionRemediated.js` uses a small fixed `SOURCE_MATERIAL` library with deterministic modulo selection. The current `makeCrossText()` implementation repeatedly reuses the same limited passage pairings and the same relationship prompt. That cannot support the approved production-scale replacement inventory without unacceptable repetition.

The current Math remediation generator still requires production-scale validation of independent construction-family selection, strategic/figure capacity, and the 25–30% SPR requirement after the R&W blocker is resolved.

## Pending implementation and verification sequence

### A. Generator remediation — pending

Replace/extend the candidate-only R&W remediation generator so that the required replacement families create materially distinct, content-specific prompts at production scale. At minimum this must address:

- relationship-first Cross-Text construction;
- Rhetorical Synthesis notes + communication-goal variation;
- contextual Words-in-Context variation;
- reasoning-driven R&W construction breadth;
- normalized-prompt uniqueness;
- distractor quality without reintroducing near-duplicate choices;
- preservation of the canonical schema and existing exports.

Math remediation must also be production-scale validated for construction-family diversity and the specified SPR range.

### B. Candidate dry run — pending

Re-run the complete SAT and PSAT targeted-replacement dry run only after the generator remediation. It must pass:

- full R&W candidate-pool size;
- R&W bucket capacity;
- normalized-prompt uniqueness;
- strengthened content-quality QC;
- Math strategic capacity;
- Math figure capacity;
- Math normalized-prompt uniqueness;
- Math SPR 25–30%;
- SAT/PSAT variant constraints;
- candidate-only/no-production-mutation status.

### C. Targeted production replacement — pending

Only after the complete dry run passes:

1. replace only the previously audited affected production question IDs;
2. record every post-freeze replacement by mock/question ID;
3. preserve the exact 30-mock production boundary;
4. rerun each affected mock's production gates;
5. rerun the final collective 30-mock corpus gate.

### D. Final calibration and release — pending

After targeted replacement and re-gating:

1. perform 30-mock cross-corpus calibration;
2. complete deferred public verification of SAT11–SAT20;
3. perform final end-to-end student acceptance;
4. finalize Batch M release acceptance.

## Release restrictions

Do not create SAT21.  
Do not wholesale-regenerate the 30-mock corpus.  
Do not silently replace production records.  
Do not treat the representative remediation pass as production release approval.
