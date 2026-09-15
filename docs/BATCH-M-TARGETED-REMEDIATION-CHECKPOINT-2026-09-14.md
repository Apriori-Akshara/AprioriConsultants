# Batch M Targeted Remediation Checkpoint — September 14, 2026

**Status:** IN PROGRESS — production replacement not authorized  
**Branch:** `batch-m-rw-generator-remediation-2026-09-14`  
**PR:** #23 — `Batch M: remediate production-scale R&W and Math candidate diversity`  
**Scope:** candidate-generation, storage-contract, and content-quality QC layers only

## 1. Current stopping point

The production-scale targeted replacement dry run is now executing successfully through module loading and candidate content-quality evaluation. The current blocker is **R&W Cross-Text prompt uniqueness**.

Latest local result:

`Error: sat R&W relationship-first cross-text: duplicate normalized prompts (36)`

The dry-run script reached this uniqueness gate after the earlier R&W content-quality failures were resolved.

## 2. Confirmed fixes completed on the remediation branch

### Module loading correction

`src/data/sat/mockContent/mathBankFactoryRemediated.js` was corrected so its two local ES-module imports explicitly use `.js`:

- `./batchMRemediationBlueprint.js`
- `./batchMContentQualityGate.js`

This resolved the local `ERR_MODULE_NOT_FOUND` failure during the production-scale dry run.

### Skill-aware R&W QC correction

`src/data/sat/mockContent/batchMContentQualityGate.js` was corrected so the generic semantic-overlap check does not incorrectly fail legitimate punctuation/inflection answer choices in:

- Boundaries
- Form, Structure, and Sense
- Transitions

Representative examples showed valid grammar/punctuation alternatives being falsely flagged by a generic semantic-token overlap test. The gate remains strict on choice count and other applicable checks.

Commit: `f3f1c93f1f9d5ed6b0113946cbf9a5d2c61d25e8`

### Words-in-Context target correction

The remediated WIC target `qualify` was replaced with `clarify` in the rhetorical target pool. This was required because the strengthened QC intentionally rejects the previously fixed `qualify` target.

The earlier diagnostic showed exactly **14** WIC failures, all `rw-fixed-wic-target`; those failures are now cleared.

### Math remediation construction

The remediated Math generator uses construction selection independently from domain cycling and retains the approved 25–30% SPR target logic. Production remains candidate-only.

## 3. R&W diagnostic findings

The first production-scale SAT R&W candidate run generated **1,080** candidates and failed content-quality QC for **158** items.

Failure breakdown:

- `Words in Context`: 14 `rw-fixed-wic-target`
- `Form, Structure, and Sense`: 72 `rw-choice-near-duplicate`
- `Boundaries`: 72 `rw-choice-near-duplicate`

Representative inspection established that the 144 grammar failures were false positives from the generic semantic-overlap rule rather than evidence that the items were invalid. Example valid constructs included punctuation alternatives such as `; however,`, `, however` and verb-form alternatives such as `affected`, `affecting`, and `has affected`.

After the skill-aware QC correction and WIC target correction, the dry run advanced past the content-quality gate.

## 4. Current Cross-Text blocker

The production-scale dry run now fails at:

`sat R&W relationship-first cross-text: duplicate normalized prompts (36)`

The intended Cross-Text design uses:

- relationship-first construction;
- 12 distinct question forms;
- 9 comparison lenses;
- 5 relationship families;
- deterministic source-family variation.

The current generator file still contains the older direct-index mapping inside `makeCrossText(index)`, so the intended 12 × 9 form/lens rotation has not yet been applied correctly to the generated Cross-Text ordinal.

## 5. Next exact implementation

In:

`src/data/sat/mockContent/verbalConstructionRemediated.js`

inside `function makeCrossText(index)`, replace the relationship/form/lens indexing with a Cross-Text ordinal based on `SECTIONS.length`.

Required logic:

```js
function makeCrossText(index) {
  const crossTextOrdinal = Math.floor(index / SECTIONS.length);
  const relation = pick(CROSS_RELATIONSHIPS, crossTextOrdinal);
  const firstFamily = pick(FAMILY_KEYS, index * 2 + 1);
  let secondFamily = pick(FAMILY_KEYS, index * 2 + 3);
  if (secondFamily === firstFamily) secondFamily = FAMILY_KEYS[(FAMILY_KEYS.indexOf(secondFamily) + 1) % FAMILY_KEYS.length];
  const first = sourcePair(firstFamily, index, hashIndex(index, 29, 4));
  const second = sourcePair(secondFamily, index + 1, hashIndex(index, 31, 4));
  const form = pick(CROSS_QUESTION_FORMS, crossTextOrdinal);
  const lens = pick(CROSS_LENSES, crossTextOrdinal);
```

**Follow-up verification finding:** the `crossTextOrdinal` logic above was already present on the active branch when work resumed. Testing showed it was not sufficient by itself to remove all 36 duplicate normalized prompts. The effective fix therefore retained the ordinal logic and added deterministic source-pair rotation inside `makeCrossText(index)`.

Implemented commit:

`6eca27bc972be4ca5e27d31a254b94caefe89672` — **Batch M: fix Cross-Text candidate prompt uniqueness**

This commit changes only `src/data/sat/mockContent/verbalConstructionRemediated.js` and does not modify the production corpus.

Do not weaken the uniqueness gate merely to make the dry run pass. The generator must produce genuinely distinct normalized prompts.

## 6. Exact next verification sequence

After the Cross-Text change:

1. Save the file in the Git-connected local repository.
2. Commit with: `Batch M: fix Cross-Text candidate prompt uniqueness`
3. Push the remediation branch.
4. Run:

`npm run qc:batch-m-targeted-replacement`

5. Confirm the run proceeds beyond SAT R&W uniqueness.
6. Continue through PSAT R&W and SAT/PSAT Math gates.
7. Require all production-scale diversity, content-quality, uniqueness, and 25–30% SPR gates to pass before any production replacement discussion.

## 7. Working-copy and backup-folder rule — IMPORTANT

There are two local project folders on the desktop:

### Active working copy — authoritative for current work

`AprioriConsultants-Git`

This is the local repository connected to the online GitHub repository through **GitHub Desktop**. Since September 14, 2026, this is the working copy used for the current Batch M remediation operations.

All current edits, commits, pushes, pulls, QC commands, and branch-based work must be performed from this folder unless a future instruction explicitly states otherwise.

The active remediation branch is:

`batch-m-rw-generator-remediation-2026-09-14`

### Older backup/reference copy — NOT authoritative

`AprioriConsultants`

This is the older local project folder used before GitHub Desktop was installed. It must be treated as a **backup/reference copy only**.

It may contain legitimate earlier work that was not synchronized to the online GitHub repository. It must therefore be preserved and may be inspected when a material discrepancy is discovered, especially for a specific file identified in the checkpoint.

**Do not copy, merge, or restore files from the backup folder blindly.** Any recovery must first be compared against the current active Git-connected copy and/or the online GitHub branch and must be explicitly verified before adoption.

### Command-location rule

Production-scale QC commands for the current Batch M task must be run from the active Git-connected working copy (`AprioriConsultants-Git`), not the older backup folder.

Before running a command, verify that the Command Prompt path points to the active Git-connected folder and that `git branch --show-current` reports the intended remediation branch.

## 8. Dry-run script synchronization discrepancy recorded

The checked file:

`scripts/runBatchMTargetedReplacementDryRun.js`

was found to differ between the active/previous local working material and the online GitHub branch. The shared local version contains additional candidate-only assertions and clearer gate-by-gate reporting, including explicit checks that `productionMutation === false` and `releaseEligible === false` and explicit pool-size checks.

The online GitHub copy did not yet contain those additional safeguards at the time of this checkpoint update.

This discrepancy must be resolved before treating the Git-connected working copy and online repository as fully synchronized. The shared local file is **not to be discarded or overwritten from the backup copy without comparison**.

## 9. Older desktop working folders

During this project, additional QC work was performed in the earlier local repository folder because production-scale run commands could not be executed directly through GitHub. Those files are not to be copied or merged blindly. If the remediation branch later shows material discrepancies after the targeted fixes, compare the relevant older file(s) against the current GitHub branch and recover only verified missing work.

## 10. Post-launch manual question-bank override system — approved for later implementation

A **manual question authoring/replacement system** is approved as a post-launch enhancement. It is intentionally **not part of the current Batch M release path** and must not be introduced until the first 10 SAT + 10 PSAT student-facing mocks are complete, fully QC-passed, calibrated, and accepted.

The later manual system will allow an explicitly human-authored question to be assigned to an exact target such as:

**Mock → section → module → question/slot → replacement question ID**

Manual content should support clear statuses such as:

- `AUTO` — generated through the normal remediation pipeline;
- `MANUAL-REVIEW` — manually supplied but awaiting review;
- `MANUAL-APPROVED` — explicitly approved for the designated production slot.

The manual path may override appropriate content-quality heuristics after explicit human approval, but it must **never bypass structural/safety validation** such as schema validity, required fields, answer-key validity, choice-count requirements, valid figure/data structures, unique IDs, valid Math structure, rendering integrity, and exact-target mapping.

### Release-path isolation requirement

When the manual system is implemented, the current release path must remain unchanged by default:

1. The existing `AUTO` generation path remains the default.
2. Existing automated QC gates continue to run unchanged for automatically generated questions.
3. Manual questions enter through a separate explicit authoring/replacement path.
4. Manual override is opt-in and target-specific; it must not silently change another mock/question.
5. Manual-approved records are recorded separately and do not alter the remediation generator's rules.
6. The current production corpus and release pipeline remain the source of truth unless a specific `MANUAL-APPROVED` replacement is explicitly assigned and accepted.
7. The new workflow must be tested outside the live student-facing release path before production activation.

### Non-coder authoring instructions and templates

The future manual question system must include a **brief, precise instruction guide written in simple language** for the user, without requiring coding knowledge.

It must include approximately **5–6 ready-to-use templates** explaining how to edit or replace a question in the question bank, including examples for common R&W and Math situations. Templates should cover, at minimum, a standard multiple-choice replacement, an R&W passage/question replacement, a Rhetorical Synthesis/notes replacement, a grammar/punctuation replacement, a Math multiple-choice replacement, and a Math figure/rendering replacement.

The guide must also provide simple plain-language instructions for **Math rendering/figure requests** the user may need to enter into the question bank, for example describing what the figure should show, labels, axes/values, relationships, and what the figure must communicate. The goal is that the user can describe or edit question content without directly editing JavaScript or other code.

The future manual system must preserve the same canonical question contract used by production and must produce a clear success/error message explaining any missing information before a manual question can be accepted.

## 11. Private reference/calibration corpus

The project will use a private reference corpus containing real SAT/PSAT reference material only for internal study of assessment characteristics. It is not production content and must not be copied, closely paraphrased, or shipped in the student-facing mocks.

The private reference corpus should be established before final cross-corpus calibration of the completed 20 student-facing mocks. It should inform calibration of source complexity, question construction, reasoning demand, distractor behavior, figure/data usage, and SAT-versus-PSAT characteristics.

## 12. Production boundary

All remediation files remain candidate-only. The frozen production corpus has not been mutated by this work. No production replacement is authorized until the complete SAT + PSAT production-scale dry run passes every required gate.

After a complete pass, only audited affected records may enter targeted replacement, followed by affected-mock gates, collective corpus gating, cross-corpus calibration, deferred public verification, and final release acceptance.
