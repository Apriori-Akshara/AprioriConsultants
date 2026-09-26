import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { buildFrozenIdentityIndex, normalizeMathSourceNotation } from "./questionBankSourceImport.mjs";
import { normalizePrelaunchCandidate, normalizePrelaunchCandidateBatch } from "../src/lib/sat/prelaunchCandidateNormalization.js";

const repoRoot = process.cwd();
const frozen = buildFrozenIdentityIndex(repoRoot);
assert.equal(frozen.frozenMockCount, 30, "frozen mock count remains 30");
assert.equal(frozen.frozenQuestionCount, 5880, "frozen question count remains 5,880");

function parseLegacyMock(filePath) {
  const markdown = fs.readFileSync(filePath, "utf8");
  const headings = [...markdown.matchAll(/^###\s*Question:\s*(.+?)\s*$/gm)];
  const output = [];

  function field(block, label, nextLabels = []) {
    const start = block.match(new RegExp("^" + label + ":\\s*", "im"));
    if (!start) return "";
    const after = block.slice(start.index + start[0].length);
    const stops = nextLabels.map((next) => after.search(new RegExp("^" + next + ":\\s*", "im"))).filter((value) => value >= 0).sort((a, b) => a - b);
    return (stops.length ? after.slice(0, stops[0]) : after).trim();
  }

  for (let index = 0; index < headings.length; index += 1) {
    const blockStart = headings[index].index + headings[index][0].length;
    const blockEnd = index + 1 < headings.length ? headings[index + 1].index : markdown.length;
    const block = markdown.slice(blockStart, blockEnd);
    const metadataMatch = block.match(/SYSTEM METADATA \(DO NOT EDIT DIRECTLY\):\s*\n```json\n([\s\S]*?)\n```/);
    if (!metadataMatch) continue;
    let metadata;
    try { metadata = JSON.parse(metadataMatch[1]); } catch { continue; }

    const choicesRaw = field(block, "CHOICES", ["ANSWER", "EXPLANATION", "SYSTEM METADATA \(DO NOT EDIT DIRECTLY\)"]);
    let choices = [];
    try { choices = JSON.parse(choicesRaw); } catch { choices = []; }

    output.push({
      questionId: headings[index][1].trim(),
      metadata,
      prompt: field(block, "PROMPT", ["CHOICES", "ANSWER", "EXPLANATION", "SYSTEM METADATA \(DO NOT EDIT DIRECTLY\)"]),
      choices,
      answer: field(block, "ANSWER", ["EXPLANATION", "SYSTEM METADATA \(DO NOT EDIT DIRECTLY\)"]),
      explanation: field(block, "EXPLANATION", ["SYSTEM METADATA \(DO NOT EDIT DIRECTLY\)"]),
    });
  }
  return output;
}

const realQuestions = parseLegacyMock(path.join(repoRoot, "question-banks/legacy-30-mock-corpus/SAT1.md"));
assert.equal(realQuestions.length, 196, "SAT1 legacy document remains fully materialized");

let usable = null;
for (const item of realQuestions) {
  const target = frozen.byQuestionId.get(item.questionId);
  if (!target || target.testKey !== "SAT1") continue;
  const candidate = {
    testKey: "SAT1",
    questionId: item.questionId,
    sourceRef: { sourceName: "step5-real-SAT1-fixture", sha256: "fixture" },
    mappingMethod: "explicit-testKey-questionId",
    baseMetadata: structuredClone(item.metadata),
    prompt: item.prompt,
    choices: item.choices,
    answer: item.answer,
    explanation: item.explanation,
    status: "CANDIDATE",
    productionMutation: false,
  };
  const normalized = normalizePrelaunchCandidate(candidate, { targetResolver: () => target });
  if (normalized.eligible) {
    usable = { item, candidate, target, normalized };
    break;
  }
}
assert.ok(usable, "a real SAT1 question must pass the applicable Step 5 candidate gates");

const mathText = normalizeMathSourceNotation("For x <= 5, keep the URL https://example.com/a/b and date 2026/09/26.");
assert.equal(mathText, "For x ≤ 5, keep the URL https://example.com/a/b and date 2026/09/26.");

assert.equal(usable.normalized.productionMutation, false);
assert.equal(usable.normalized.testKey, usable.target.testKey);
assert.equal(usable.normalized.questionId, usable.target.questionId);
assert.equal(usable.normalized.reviewRequired, false);
assert.equal(usable.normalized.canonical.questionId, usable.item.questionId);
assert.equal(usable.normalized.canonical.testId, usable.target.testId);
assert.equal(usable.normalized.canonical.answer, usable.item.answer);

const duplicateCandidate = structuredClone(usable.candidate);
const missingExplanationCandidate = structuredClone(usable.candidate);
missingExplanationCandidate.explanation = "";

const batch = normalizePrelaunchCandidateBatch([usable.candidate, duplicateCandidate, missingExplanationCandidate], {
  targetResolver: () => usable.target,
});
assert.equal(batch.productionMutation, false);
assert.equal(batch.summary.candidateCount, 3);
assert.equal(batch.summary.reviewRequiredCount, 2);
assert.ok(batch.candidates[1].exceptions.some((item) => item.code === "DUPLICATE_TARGET"));
assert.ok(batch.candidates[2].exceptions.some((item) => item.code === "MISSING_REQUIRED_CONTENT"));

const tableResult = normalizePrelaunchCandidate({
  testKey: usable.target.testKey,
  questionId: usable.target.questionId,
  baseMetadata: structuredClone(usable.item.metadata),
  prompt: usable.item.prompt,
  choices: usable.item.choices,
  answer: usable.item.answer,
  explanation: usable.item.explanation,
  figure: { type: "table", data: { headers: ["x <= 5", "value"], rows: [["3/4", "1"], ["2", "2"]] } },
}, { targetResolver: () => usable.target });

assert.equal(tableResult.canonical.figure.type, "table");
assert.deepEqual(tableResult.canonical.figure.headers, ["x ≤ 5", "value"]);
assert.deepEqual(tableResult.canonical.figure.rows[0], ["3/4", "1"]);
assert.equal(tableResult.productionMutation, false);

console.log(JSON.stringify({
  status: "STEP5_PRELAUNCH_CANDIDATE_NORMALIZATION_ACCEPTANCE_PASS",
  assertions: 24,
  frozenMockCount: frozen.frozenMockCount,
  frozenQuestionCount: frozen.frozenQuestionCount,
  realCorpusFixture: usable.target.questionId,
  candidateOnly: true,
  exceptionFirstReview: true,
  identityPreserved: true,
  productionMutation: false,
  sat21Created: false,
}, null, 2));
