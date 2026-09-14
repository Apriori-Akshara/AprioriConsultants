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

Representative inspection established that the 144 grammar failures were false positives from the generic semantic-overlap rule rather than evidence that the items were invalid. Example valid constructs included punctuation alternatives such as `; however,`, `, however`, and verb-form alternatives such as `affected`, `affecting`, and `has affected`.

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

Do not weaken the uniqueness gate merely to make the dry run pass. The generator should produce genuinely distinct normalized prompts.

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

## 7. Older desktop working folders

During this project, additional QC work was performed in the earlier local repository folder because production-scale run commands could not be executed directly through GitHub. Those files are not to be copied or merged blindly. If the remediation branch later shows material discrepancies after the targeted fixes, compare the relevant older file(s) against the current GitHub branch and recover only verified missing work.

## 8. Production boundary

All remediation files remain candidate-only. The frozen production corpus has not been mutated by this work. No production replacement is authorized until the complete SAT + PSAT production-scale dry run passes every required gate.

After a complete pass, only audited affected records may enter targeted replacement, followed by affected-mock gates, collective corpus gating, cross-corpus calibration, deferred public verification, and final release acceptance.
