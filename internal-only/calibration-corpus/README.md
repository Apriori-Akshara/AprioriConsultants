# Private SAT/PSAT Calibration Corpus

Batch K establishes the private calibration-corpus boundary.

## What belongs here

Use this directory only on a local/private working copy for legally permitted calibration anchors. The repository intentionally does **not** contain official College Board question text, answer choices, passages, figures, or other copyrighted anchor content.

Recommended structure:

- `sat-rw-craft-and-structure/`
- `sat-rw-information-and-ideas/`
- `sat-rw-standard-english-conventions/`
- `sat-rw-expression-of-ideas/`
- `sat-math-algebra/`
- `sat-math-advanced-math/`
- `sat-math-problem-solving-data-analysis/`
- `sat-math-geometry-trigonometry/`

## Record format

Store metadata JSON records only in the repository-facing adapter. Each record must contain:

- `id`
- `domain`
- `difficulty`
- `skill`
- `sourceFamily`
- `textType`
- `rhetoricalPattern`
- `questionConstruction`
- `cognitiveDemand`
- `distractorBehavior`
- `figureDataType`
- `anchorFile`

`anchorFile` points to the private local source. Do not put the anchor text itself into repository source files.

The runtime adapter is `src/data/sat/mockContent/calibrationCorpus.js`. Set `SAT_CALIBRATION_CORPUS_DIR` locally when private records are available. Without that variable, production behavior is unchanged and the loader returns an empty corpus.

## Calibration rule

Use official/retired material only as a private reference for structural characteristics such as source family, difficulty, question construction, passage density, distractor behavior, and figure/data usage. Production content must remain original and must never copy or closely paraphrase an anchor.

The calibration adapter is deliberately separate from live question delivery. It is not a production content source and it does not add copyrighted material to the public build.
