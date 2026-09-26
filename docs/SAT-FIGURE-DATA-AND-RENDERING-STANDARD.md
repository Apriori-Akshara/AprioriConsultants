
# SAT/PSAT Figure, Graph, Chart, and Table Data/Rendering Standard

**Status:** Approved implementation standard — pre-launch visual normalization and permanent rendering contract
**Scope:** Math figures, data displays, charts, graphs, geometry diagrams, and future supported visual types

## 1. Core rule

The canonical visual source is structured data/parameters.

The production path is:

**question intent → underlying values/geometry → structured figure object → deterministic renderer → student-facing visual**

A pasted image may be used as a source reference during import or review, but it is never the canonical production visual.

## 2. Supported figure families

The current registry supports, subject to renderer/QC readiness:

- bar charts
- line charts
- scatter plots
- tables
- number lines
- right triangles
- general triangles
- circles
- parabolas
- linear-function graphs
- coordinate shapes
- 3D solids
- legacy-compatible line/scatter/quadratic/geometry forms

Future figure types remain unavailable until a renderer and QC contract exist.

## 3. Figure authoring rules

Every figure must contain enough structured information for QC to recompute the relevant mathematical/data relationships.

Examples:

**Graph:** equation/points → plotted graph → answer

**Scatterplot:** source points → plotted points → interpreted relationship → answer

**Bar/line chart:** source table → series values → chart → answer

**Geometry:** dimensions/angles/coordinates → geometry → requested quantity → answer

**Table:** headers/rows → question interpretation → answer

The visual must be question-essential whenever the item is marked as using a figure.

## 4. Rendering rules

Renderers must provide, as applicable:

- readable labels
- meaningful axes and units
- appropriate tick marks/scales
- correct plotted values
- stable aspect and spacing
- non-overlapping annotations
- accessible titles/labels
- consistent mathematical typography
- responsive display
- deterministic output from the same figure data

Rendering must never invent or silently alter values.

## 5. Mathematical consistency gate

The visual gate must connect the figure to the answer calculation.

At minimum it must verify:

1. the structured figure is valid
2. the question and figure refer to the same values
3. the answer can be recomputed from the figure when the figure is part of the reasoning
4. labels/axes/units agree with the structured source
5. the rendered visual has no missing or misleading critical element

A visually attractive but mathematically inconsistent figure fails.

## 6. Import behavior

When a DOCX/PDF source contains a figure:

1. recover structured data/geometry when possible
2. preserve the original visual only as a review reference
3. build or select the canonical structured figure
4. run figure validation
5. render the canonical figure
6. compare the result to the source and question intent

If reconstruction is uncertain, create a review exception instead of guessing.

## 7. Visual duplication

The full frozen corpus must avoid exact or trivially modified visual duplication.

Originality checks should include normalized figure/data signatures in addition to question/content fingerprints.

Changing labels without changing the underlying construction does not make a duplicate visual original.

## 8. Pre-launch visual normalization

Existing acceptable questions may be normalized before launch through a candidate-only process:

**legacy/canonical content → structured figure normalization → deterministic render → mathematical/figure QC → approval**

No production replacement occurs during normalization unless separately authorized.

## 9. Post-launch correction

After release, a mismatch or incorrect rendering is handled by identifying the exact released question and correcting its human-editable content/figure data, then reconstructing canonical content and rerunning the applicable gates.

Do not patch a single screenshot or hard-code a question-specific visual exception when the underlying renderer or figure contract is the real defect.

## 10. Acceptance criteria

The visual system is complete when:

- supported figure types render deterministically
- figure data and answer relationships pass automated QC
- charts/graphs/tables/geometry are readable and accessible
- math notation is consistent with the Math Typography Standard
- source images are never required as the canonical runtime visual
- visual duplication checks work
- a representative corpus render audit shows no critical mismatch
- unsupported figure types fail closed rather than rendering an approximation

This document works with docs/SAT-PSAT-QUESTION-SPEC.md, docs/SAT-PSAT-MATH-QUALITY-CONTROL.md, and docs/HUMAN-EDITABLE-CANONICAL-QUESTION-BANK-SPEC.md.
