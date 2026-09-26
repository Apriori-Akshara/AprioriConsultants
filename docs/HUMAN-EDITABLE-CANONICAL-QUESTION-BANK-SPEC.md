# Human-Editable and Canonical SAT/PSAT Question-Bank Specification

**Status:** IMPLEMENTED — legacy/approved separation, deterministic export, parser/validator, approval gate, canonical staging bridge, and end-to-end CI pilot verified
**Scope:** Human-readable question editing, canonical question synchronization, validation, and controlled item-level maintenance
**Production boundary:** This document does not authorize production mutation
**Production target:** The frozen 30-mock corpus — SAT1–SAT10, PSAT1–PSAT10, SAT11–SAT20
**SAT21:** prohibited / not created

## 1. Purpose

The project uses two connected representations of the same question content:

1. a **human-editable mock question-bank document** that is comfortable for an AI or human reviewer to read and edit as text; and
2. a **canonical question-bank representation** that follows the executable production schema and is used by the existing SAT test engine and validation system.

These are not two independent question banks containing different content. They are two controlled representations of the same content.

The human-editable document is the preferred content-editing surface.

The canonical representation is the validated structured form used for runtime delivery, automated checks, and production assembly.

## 2. Authoritative roles

### Human-editable question-bank document

The mock document is the **content-authoring source** for routine item-level wording/content maintenance.

It is intended to make a request such as:

> Change PSAT Mock 6, R&W Question 8.

unambiguous and easy to implement without manually editing a large JavaScript content file.

### Canonical question bank

The canonical question record is the **validated structured runtime representation**.

It must remain compatible with the existing executable schema and production gates. The current executable contract is validated by:

src/data/sat/questionSchema.js

The canonical representation remains authoritative for what the website can deliver.

### JavaScript content files

Current JavaScript content files are an implementation/storage mechanism for canonical question records and production assembly. They are not the preferred human editing interface.

Routine content maintenance must not require the user to edit JavaScript.

## 3. Relationship between the two representations

For newly accepted content:

**Blueprint → Draft → Independent QC → Canonical Storage → Existing SAT Engine**

For human maintenance of an accepted question:

**Canonical Question Record → Human-Editable Mock Question-Bank Document → Requested Edit → Document Parser/Validator → Canonical Question Record → Applicable QC → Existing SAT Engine**

The first maintenance step exports accepted canonical content into the document representation.

After a document is edited, the parser must reconstruct the same canonical field structure rather than inventing a second runtime format.

The document must never bypass schema or content-quality validation.

## 4. File organization

The human-editable documents live in:

question-banks/

There is one document for each frozen production mock.

Examples:

question-banks/legacy-30-mock-corpus/SAT1.md
question-banks/legacy-30-mock-corpus/PSAT6.md
question-banks/legacy-30-mock-corpus/SAT20.md

Approved working documents use the parallel `question-banks/approved-launch-corpus/` area. Canonical promotion artifacts are written only to `question-banks/approved-launch-corpus/canonical-promotion-staging/`.

The filename is an organizational convenience; the document metadata and every question's canonical identity remain authoritative.

No document may create a new mock target. The document set must remain exactly aligned with the frozen 30-mock production sequence.

## 5. Mock document structure

Each mock document must contain:

- mock identity: testKey, testId, assessment variant, assessment number;
- expected question count;
- section/module organization;
- one clearly delimited block per question;
- exact canonical questionId for every question;
- student-facing question content;
- answer choices and correct answer where applicable;
- explanation;
- figure/data definition where applicable;
- required canonical metadata.

The planned document format is Markdown with deterministic headings and labels so that it remains readable to people while also being safely machine-parsed.

Illustrative structure:

~~~text
# PSAT Mock 06 Question Bank

TEST KEY: PSAT6
TEST ID: psat-mock-06
ASSESSMENT VARIANT: psat-nmsqt
QUESTION COUNT: 196

## Question: psat-mock-06-rw-008-1535

SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: information-and-ideas
SKILL: Inferences
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
[student-facing question text]

CHOICES:
A. [choice]
B. [choice]
C. [choice]
D. [choice]

ANSWER:
B

EXPLANATION:
[explanation]

FIGURE:
none

SYSTEM METADATA:
[canonical metadata retained by the synchronization system]
~~~

The exact grammar/parser rules will be implemented separately. This illustrative format is not itself the executable schema.

## 6. Field ownership

The document system must distinguish between **content-editable fields** and **system-managed fields**.

### Content-editable fields

Routine item maintenance may change, when the requested change requires it:

- prompt/stimulus text;
- answer choices;
- correct answer;
- explanation;
- structured figure/data parameters;
- limited human-authored explanatory metadata intended for question review.

### System-managed fields

These must not be casually rewritten during a wording-only edit:

- canonical question ID;
- mock/test identity;
- module identity;
- production ordering;
- originality fingerprints;
- concept/application fingerprints;
- QC status;
- release eligibility;
- operational status;
- production-mutation flags;
- audit identifiers;
- response statistics populated from real student attempts.

If a system-managed field genuinely needs to change, the change must be treated as a structured content change and revalidated accordingly.

## 7. Identity and replacement rules

Every question is identified by the exact production identity:

**testKey + questionId**

The document system must preserve that identity during normal editing.

A question number in the document is not sufficient by itself because it can be confused with a different module or mock.

Routine replacement means:

- keep the target testKey;
- keep the target questionId unless an explicit identity migration is approved;
- change only the intended content fields;
- preserve required assessment/module/domain/skill compatibility;
- validate the edited canonical result before any production update.

Do not delete and recreate a question with a new ID merely because the wording changed.

## 8. Synchronization and drift detection

The document and canonical representation must be kept synchronized by deterministic tooling.

The system must be able to detect:

- a question present in the document but missing from canonical storage;
- a canonical question missing from the document;
- duplicate question identities;
- unexpected mock identity changes;
- unsupported fields;
- lost required metadata;
- content changes that were not validated;
- document/canonical content drift.

A document should not silently overwrite a canonical record when synchronization detects a structural mismatch.

## 9. Validation pipeline for an edited question

When a specific question is changed through the document workflow:

1. locate the exact testKey + questionId;
2. parse the edited question into the canonical structure;
3. run canonical schema validation;
4. run the applicable content-quality checks;
5. run mathematical/figure checks where applicable;
6. run originality and duplicate checks;
7. verify section/module/domain/skill/assessment compatibility;
8. verify the change does not introduce prohibited corpus conflicts;
9. record the exact changed identity and reason;
10. only after the required authorization, update the production canonical record;
11. rerun the affected mock and collective gates required by the change.

The document edit itself is therefore **not** the same thing as a production release.

## 10. Production safety boundary

The document workflow must never automatically mutate the production corpus merely because a Markdown file was edited.

The required boundary is:

**Edit → Validate → Review/decision → Explicit production authorization when required → Apply → Re-gate**

Candidate-only and hypothetical validation modes must retain the existing production-safety flags and must not create SAT21.

## 11. Figures and structured data

Human-editable documents may describe a figure or table in structured text, but the canonical runtime representation remains the structured figure/data object already required by the SAT/PSAT specification.

Do not introduce image URLs, AI-drawn images, ASCII diagrams, or opaque SVG as the canonical figure source.

The synchronization layer must preserve figure parameters exactly enough for the existing renderer and figure QC to validate the question.

## 12. Relationship to the existing website

The student-facing website continues to use the existing SAT engine, scoring, adaptive flow, reporting, authentication, and server-side authorization.

The document system adds a content-maintenance layer only:

**Mock document → synchronization/validation → canonical question → existing SAT engine**

It must not create a second test engine, scoring system, adaptive engine, authentication system, or separate student-facing question API solely for document support.

## 13. Relationship to Batch A–M

This is not a new Batch N.

The document system is a **Batch M content-maintenance capability** built on top of the completed A–L foundations.

The planned implementation checkpoint is:

1. resolve the current deep SAT/PSAT content-quality/diversity blocker through the existing candidate-only remediation/review path;
2. implement and round-trip test the human-editable 30-mock document set against canonical records;
3. use the documents for future item-specific maintenance;
4. apply the normal affected-item and corpus re-gates after any authorized production edit;
5. continue the existing final Batch M release checkpoints.

The document system must not interrupt, weaken, or broaden the current deep-QC remediation scope.

## 14. Round-trip acceptance test

Before the document system is considered complete, it must demonstrate:

**Canonical → Document → Parse → Canonical**

with no unintended loss or transformation of required question data.

It must also demonstrate a controlled edit:

**Canonical → Document → change one question → Parse → validate → canonical replacement candidate**

with the exact testKey + questionId preserved.

A successful round-trip test does not itself authorize production mutation.

## 15. AI working rule

When the user asks for a change to a specific question after this system is implemented, the assistant should:

- identify the exact mock and question ID;
- edit the human-readable mock document as the primary content-authoring surface;
- preserve system-managed identifiers and metadata unless the requested change requires otherwise;
- reconstruct/validate the canonical question;
- run the applicable QC;
- report whether the result is still candidate-only or has been authorized for production;
- never claim a website change merely because the document changed.

## 16. Current implementation status

The human-editable/canonical question-bank bridge is **implemented and CI-verified**. The repository now contains:

- `question-banks/legacy-30-mock-corpus/` for the frozen legacy working copy;
- `question-banks/approved-launch-corpus/` for explicitly approved working content;
- `scripts/exportBatchMLegacyCorpusToHumanBank.mjs` for deterministic legacy export;
- `scripts/validateHumanEditableQuestionBank.mjs` for deterministic parsing and canonical schema validation;
- `scripts/promoteHumanBankToCanonicalStaging.mjs` for approval-gated canonical staging;
- `scripts/humanQuestionBankContentAdapter.mjs` for conservative answer/choice resolution;
- `scripts/runHumanQuestionBankPilot.mjs` for the end-to-end acceptance pilot;
- `.github/workflows/human-question-bank-pilot.yml` for continuous verification.

The runtime production corpus remains the existing canonical JavaScript store. The human-editable system is a maintenance layer and does not itself change production.

## 17. Verified pilot acceptance

The end-to-end pilot has passed in GitHub Actions after correcting the Markdown answer-field parsing compatibility issue.

Verified workflow: **Human question bank pilot — run 36152194934 — SUCCESS**.

The pilot verifies, using real frozen SAT1 production questions:

- deterministic Markdown generation;
- explicit approval status;
- parsing and canonical schema validation;
- canonical staging only;
- preservation of exact question identities;
- preservation of resolved answer identities;
- removal of temporary staging artifacts;
- no production mutation;
- no SAT21 creation.

The parser accepts both `ANSWER: B` and a two-line `ANSWER:` followed by `B`. New exports write `ANSWER: B`.

## 18. Controlled maintenance workflow — current contract

For future content maintenance, use this sequence:

**1. Select exact target → 2. Edit human-readable mock document → 3. Mark item APPROVED only after review → 4. Validate document/schema → 5. Promote to canonical staging → 6. Run applicable item/corpus QC → 7. Obtain explicit production authorization when required → 8. Apply to existing canonical production target → 9. Re-run required affected/collective gates → 10. Release only after the separate Batch M release checkpoints pass.**

The human-editable document is the preferred authoring surface. JavaScript remains the canonical runtime storage mechanism until an authorized production promotion is applied.

## 19. Full-corpus preparation — next implementation step

Step 1 is **complete**: the complete frozen 30-mock legacy human-editable document set has been materialized using:

`npm run question-bank:export-legacy`

Expected scope:

- SAT1–SAT10;
- PSAT1–PSAT10;
- SAT11–SAT20;
- 30 documents total;
- 196 questions per document;
- 5,880 questions total;
- all records retained as `STATUS: LEGACY` / not launch-approved;
- no canonical production mutation;
- no SAT21.

After Step 1, the next documented task is to establish the review/approval working process on those documents. Do **not** promote the full legacy corpus automatically.

## 20. Production safety boundary

The full legacy export is a non-production documentation operation. It does not authorize replacement of the current runtime corpus and does not change release eligibility.

Any future approved edit must continue through the controlled validation and staging path above and then through the normal affected-item and corpus re-gates. Explicit production authorization is still required for production mutation when applicable.
