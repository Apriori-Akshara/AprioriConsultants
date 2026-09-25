# Human-Editable and Canonical SAT/PSAT Question-Bank Specification

**Status:** IMPLEMENTATION STARTED — legacy/approved separation and legacy export implemented; controlled parser/promotion remains pending
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

question-banks/SAT01.md
question-banks/PSAT06.md
question-banks/SAT20.md

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

The human-editable/canonical two-representation architecture is **partially implemented**. The repository now contains separate legacy and approved working areas plus a deterministic exporter for the frozen 30-mock corpus. The legacy export is intentionally non-production and cannot mutate canonical records. The document parser, approval-state validator, canonical promotion adapter, and full round-trip acceptance test remain to be implemented.

Until implementation is completed, existing JavaScript production content and the current canonical validation/storage path remain the working runtime mechanism.

This feature is a maintenance improvement; it does not change the frozen 30-mock production scope.
## 17. Parser and approval-gate implementation checkpoint

The controlled document bridge is now implemented at the tooling level.

### Implemented

- `scripts/validateHumanEditableQuestionBank.mjs` parses the deterministic Markdown format, reconstructs canonical editable fields, preserves the system-managed metadata block, detects duplicate question identities, checks document identity consistency, and runs the existing `validateSatQuestion` canonical schema validator.
- `scripts/promoteHumanBankToCanonicalStaging.mjs` accepts only documents whose questions are explicitly marked `STATUS: APPROVED`, validates them first, restricts promotion targets to the frozen 30-mock scope, and writes only a **canonical staging** JSON artifact.
- No script in this bridge mutates the production JavaScript corpus.
- Production authorization is still a separate step.

### Commands

```bash
npm run question-bank:validate -- question-banks/legacy-30-mock-corpus/SAT1.md
npm run question-bank:promote-staging -- question-banks/approved-launch-corpus/SAT1.md
```

The first command performs document/schema validation. The second performs the approval-gated conversion to canonical staging. A legacy document intentionally fails the approval gate until its questions have been explicitly reviewed and marked APPROVED.

### Safety rule

**Markdown edit → validation → explicit APPROVED status → canonical staging → separate production authorization → production update → affected re-gates**

Canonical staging is not production. It is the controlled bridge needed before a future authorized production promotion.

## 18. Next implementation checkpoint

The bridge is ready for a small end-to-end pilot. The next step is to export/prepare a small representative set of existing questions, explicitly approve the acceptable items, run document validation and canonical staging, and verify the round-trip without touching production. Only after that pilot passes should the workflow be expanded to the full 30-mock legacy corpus.

## 19. Pilot hardening after CI failure

The first CI pilot exposed a representation-compatibility issue rather than a parser-heading issue. A small number of existing/remediated records can retain the answer redundantly in controlled metadata or in an explicit explanation statement even when a direct answer field is blank.

The maintenance bridge now uses scripts/humanQuestionBankContentAdapter.mjs to resolve answers conservatively:

1. use the explicit question-level answer first;
2. then use explicit redundant answer fields;
3. for multiple-choice records only, use a single machine-readable correct profile when present;
4. then accept an explicit explanation statement such as "Choice B is correct";
5. reject conflicts instead of guessing.

The pilot now selects real SAT1 R&W and Math multiple-choice records with a resolvable answer and verifies both question identity and answer identity after canonical staging.

The workflow remains staging-only. No production corpus mutation is performed by this pilot.

The expanded workflow is expected to pass before the full 30-mock human-editable export is generated and committed.
### 19.1 Parser compatibility fix

The Markdown parser now accepts both `ANSWER: B` and a two-line `ANSWER:` followed by `B`. New exports write the answer inline while legacy/hand-edited files remain readable.
