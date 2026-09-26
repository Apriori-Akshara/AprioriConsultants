
# SAT/PSAT Math Typography and Student-Facing Rendering Standard

**Status:** Approved implementation standard — pre-launch normalization and permanent rendering contract
**Scope:** Mathematical notation in prompts, choices, explanations, tables, graph labels, figure annotations, and related student-facing content

## 1. Goal

Student-facing Math content must use recognizable mathematical typography rather than source-style ASCII notation.

Examples of source notation that must not remain visibly rendered to students include:

- x^2
- sqrt(x)
- x <= 5
- x >= 5
- 3/4 when intended as a mathematical fraction
- 2*pi*r when intended as a mathematical expression

These are source representations, not the final student-facing presentation.

## 2. Canonical representation

Math content must be represented as explicit mathematical spans using a single deterministic notation contract.

The renderer must support, at minimum:

- superscripts and subscripts
- fractions
- square roots and other supported radicals
- inequalities
- multiplication and division
- negative signs/minus
- absolute value
- exponents and scientific notation
- Greek symbols
- function notation
- coordinate pairs
- equations and expressions
- units embedded in mathematical expressions

A mature deterministic mathematical typesetting engine may be used, but the implementation must produce consistent SSR/client output in the Next.js application and must not depend on ad-hoc font substitutions.

## 3. No blind global replacement

A transformation such as replacing every caret or slash character globally is prohibited.

The normalization layer must identify mathematical spans and convert only syntactically valid mathematical expressions.

Ordinary prose, URLs, identifiers, dates, code-like metadata, and non-mathematical punctuation must remain unchanged.

## 4. Student-facing rendering rule

The final rendered DOM must present mathematical expressions as typeset mathematics, with accessible semantic/assistive representation where the chosen renderer supports it.

The source string is not the student-facing contract.

The same notation layer must be used by:

- question prompts
- answer choices
- explanations
- table cells
- figure labels
- graph annotations
- mathematical reference material

## 5. Figure integration

Figure labels and equations must use the same math typography system as question text.

A graph generated from y = x^2 + 2x + 1 must not display a different notation convention merely because the equation originated inside figure code.

Structured figure data remains numeric/semantic. Typography is applied only at the presentation boundary.

## 6. Pre-launch normalization

Before launch, the frozen corpus may be normalized in a controlled candidate-only transformation.

The process is:

**existing canonical/legacy content → detect mathematical spans → normalize notation → render → compare meaning/answer → run Math and figure QC → approve candidate**

The normalization must preserve:

- questionId
- testKey/testId
- answer
- explanation meaning
- figure parameters
- system-managed metadata

A formatting-only normalization must never silently alter the mathematical meaning.

## 7. Automatic formatting QC

The formatting gate should flag student-facing Math content containing suspicious raw notation in mathematical contexts, including untyped caret exponents, ASCII inequality operators, malformed fractions, unsupported radical syntax, malformed delimiters, or inconsistent multiplication.

It should also verify representative rendered output for:

- prompts
- all choice types
- explanations
- tables
- graphs
- geometry labels

## 8. Post-launch correction rule

After release, a discovered notation/rendering mismatch is handled as a controlled maintenance edit to the exact released question identity.

The edit must preserve the question identity and pass the applicable canonical, mathematical, figure, originality, and affected-corpus gates before authorized production application.

## 9. Acceptance criteria

The typography implementation is complete only when:

- common SAT/PSAT mathematical notation is consistently typeset
- raw ASCII mathematical operators are not exposed in student-facing Math where a semantic typeset form is required
- SSR/client output is consistent
- figure labels and graph equations use the same notation system
- accessibility is preserved
- mathematical meaning and answers are unchanged by formatting normalization
- automated QC can detect regressions

This standard is subordinate to the canonical question schema and the assessment/content standards.
