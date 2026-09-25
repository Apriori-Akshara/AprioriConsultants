# Question-Bank Working Area

This directory separates **legacy production content** from the new **human-editable approved content**.

## Two separate areas

- `legacy-30-mock-corpus/` — exported working copies of the existing frozen 30-mock corpus. These records are **not approved launch content** and are never promoted automatically.
- `approved-launch-corpus/` — human-editable questions that have passed review and have been explicitly approved for canonical promotion.

## Controlled flow

```
Frozen 30-mock runtime corpus
        ↓
legacy-30-mock-corpus/
        ↓
human review / edit / replacement
        ↓
approved-launch-corpus/
        ↓
schema + content + originality + corpus validation
        ↓
canonical production record
        ↓
runtime JS / mock assembly
```

The legacy area and approved area must never be merged implicitly.

No SAT21 may be created. The frozen production scope remains SAT1–SAT10, PSAT1–PSAT10, and SAT11–SAT20.

The legacy exporter is:

`scripts/exportBatchMLegacyCorpusToHumanBank.mjs`

Run it with:

`npm run question-bank:export-legacy`

This exporter is intentionally one-way. It creates human-readable working documents from the current frozen corpus; editing those documents does not mutate production.
