
# Question-Bank Source Import and Review Workflow

**Status:** Approved implementation design — pre-launch content workflow
**Scope:** Bulk intake of user-supplied question documents and controlled review/candidate preparation for the frozen 30-mock corpus
**Master roadmap:** docs/QUESTION-GENERATION-ROADMAP.md

## 1. Purpose

The project must support efficient bulk content intake without requiring the user to manually edit Markdown or JavaScript question records one item at a time.

Preferred bulk inputs are:

- Microsoft Word (.docx)
- text-based PDF (.pdf)
- structured text pasted into the conversation

Scanned/image PDFs may be accepted when extraction is reliable. Figures and tables must be visually inspected when text extraction cannot preserve their structure.

This workflow does not replace the human-editable Markdown representation or canonical runtime records. It adds a controlled source-ingestion layer.

## 2. Pre-launch versus post-launch terminology

Before launch, changes supplied through external source documents are **source replacements or content candidates**, not post-launch edits. They must never mutate the frozen legacy baseline directly.

After launch, an observed released-item problem may be handled as a controlled **maintenance edit** to the human-editable question-bank document, followed by canonical reconstruction, QC, authorization, and re-gating.

This distinction prevents pre-launch source consolidation from being confused with production incident correction.

## 3. Source intake boundary

User-supplied Word/PDF/pasted material enters a non-production source-import workflow.

The raw source file is treated as source material. The repository may retain provenance/manifest information, but copyrighted or otherwise restricted source material must not be copied into the public repository merely for convenience.

The import process must never write directly to:

- the canonical production runtime corpus
- production JavaScript question files
- approved-launch canonical staging
- release eligibility

## 4. Deterministic question mapping

Mapping priority is:

1. explicit testKey + questionId supplied by the source
2. exact mock identity + section + module + question position when identity is omitted
3. otherwise stop and report an ambiguous mapping

The importer must verify:

- frozen mock exists
- section is valid
- module is valid
- question count and order are plausible
- question identity is not duplicated
- mapped question belongs to the target mock
- no new mock target is inferred

The importer must never silently remap an ambiguous question.

## 5. Accepted source layout

A practical Word document may contain:

**Mock identity → section → module → questions in order**

Each question should contain, as available:

- prompt/stimulus
- answer choices or student-produced-response answer
- correct answer
- explanation
- table/figure/chart information
- source notes relevant to the question

Internal canonical metadata does not need to be manually supplied when the importer can recover it from the frozen question identity.

## 6. Import outputs

A successful import produces non-production artifacts:

1. normalized candidate question content
2. the corresponding human-editable Markdown representation
3. an import manifest containing source/provenance and exact target identities
4. an exception manifest for anything requiring human attention
5. structured figure/data candidates where applicable

The legacy 30-mock documents remain the frozen baseline and are not overwritten merely because a new source document was imported.

## 7. Exception-first review

Review should be batch-based and exception-first.

The importer and deterministic validators should surface only material exceptions such as:

- ambiguous mapping
- missing required content
- answer mismatch
- malformed mathematical notation
- unsupported figure type
- figure/data inconsistency
- duplicate or near-duplicate content
- incompatible section/module/domain/skill
- malformed question format

Items that pass the applicable automated checks may proceed without repetitive manual transcription.

## 8. Figures, charts, and tables

Pasted images from Word/PDF are source references only.

For production, the importer must reconstruct a structured figure/data object whenever the information can be recovered:

**underlying data → structured figure object → deterministic renderer**

Do not store a pasted screenshot, opaque SVG, or AI-drawn image as the canonical production figure.

When the source visual cannot be reliably reconstructed, create a review exception rather than guessing.

## 9. Mathematical notation during import

Imported text may contain source-style notation such as x^2, sqrt(x), <=, or 3/4.

The importer must preserve meaning while passing mathematical spans through the canonical math-typography normalization layer defined in docs/SAT-MATH-TYPOGRAPHY-AND-RENDERING-STANDARD.md.

Do not perform blind global character substitution.

## 10. Approval boundary

Imported content remains candidate content until human review/approval and the applicable canonical/content/figure/originality/compatibility gates pass.

Approval does not itself authorize production mutation.

Production replacement requires the existing explicit authorization and affected/corpus re-gates.

## 11. Acceptance criteria

The import system is complete only when it can demonstrate:

- DOCX intake
- PDF or reliable text-PDF intake
- structured pasted-text intake
- deterministic mapping to existing testKey + questionId identities
- exception reporting for ambiguous/malformed inputs
- preservation of the frozen 30-mock boundary
- generation of a controlled human-editable candidate representation
- structured figure/data extraction or a review exception
- mathematical notation normalization without meaning changes
- no production mutation

## 12. Operating rule

Do not ask the user to retype the same question into Markdown or JavaScript when a Word/PDF/pasted source can be imported in bulk.

The assistant should handle extraction, mapping, candidate reconstruction, validation, and exception reporting.

The user's content decisions remain the human approval boundary.
