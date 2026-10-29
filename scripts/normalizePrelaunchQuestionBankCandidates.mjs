import fs from "node:fs";
import path from "node:path";
import { buildFrozenIdentityIndex } from "./questionBankSourceImport.mjs";
import { normalizePrelaunchCandidateBatch } from "../src/lib/sat/prelaunchCandidateNormalization.js";

function readJson(filePath, label) {
  const absolute = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(absolute)) throw new Error(label + " not found: " + filePath);
  try { return JSON.parse(fs.readFileSync(absolute, "utf8")); }
  catch (error) { throw new Error("Could not parse " + label + ": " + error.message); }
}

function unwrapCandidates(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.candidates)) return value.candidates;
  throw new Error("Candidate input must be an array or an object containing candidates[].");
}

function unwrapFigures(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.figureCandidates)) return value.figureCandidates;
  return [];
}

function ensureSafeOutputDirectory(repoRoot, requested) {
  const root = path.resolve(repoRoot, ".question-bank-normalization");
  const output = path.resolve(repoRoot, requested || ".question-bank-normalization");
  const relative = path.relative(repoRoot, output);
  const insideRepo = relative && !relative.startsWith("..") && !path.isAbsolute(relative);
  const insideCandidateRoot = output === root || output.startsWith(root + path.sep);
  if (insideRepo && !insideCandidateRoot) {
    throw new Error("Step 5 normalizer may write only inside .question-bank-normalization or to an external output directory.");
  }
  return output;
}

const candidatePath = process.argv[2];
if (!candidatePath) throw new Error("Usage: node normalizePrelaunchQuestionBankCandidates.mjs <candidates.json> [figure-candidates.json] [output-dir]");

const figurePath = process.argv[3] && !process.argv[3].startsWith("-") ? process.argv[3] : null;
const outputPath = process.argv[4] && !process.argv[4].startsWith("-") ? process.argv[4] : null;
const repoRoot = process.cwd();
const candidates = unwrapCandidates(readJson(candidatePath, "candidate input"));
const figureCandidates = figurePath ? unwrapFigures(readJson(figurePath, "figure candidate input")) : [];

const frozen = buildFrozenIdentityIndex(repoRoot);
const normalized = normalizePrelaunchCandidateBatch(candidates, {
  figureCandidates,
  targetResolver: (testKey, questionId) => {
    if (!testKey || !questionId) return null;
    const record = frozen.byQuestionId.get(String(questionId));
    return record && record.testKey === String(testKey) ? record : null;
  },
});

const safeOutput = ensureSafeOutputDirectory(repoRoot, outputPath);
fs.mkdirSync(safeOutput, { recursive: true });
fs.writeFileSync(path.join(safeOutput, "normalized-candidates.json"), JSON.stringify(normalized.candidates, null, 2) + "\n", "utf8");
fs.writeFileSync(path.join(safeOutput, "review-queue.json"), JSON.stringify(normalized.reviewQueue, null, 2) + "\n", "utf8");
fs.writeFileSync(path.join(safeOutput, "exceptions.json"), JSON.stringify(normalized.reviewQueue, null, 2) + "\n", "utf8");

const manifest = {
  ...normalized,
  frozenMockCount: frozen.frozenMockCount,
  frozenQuestionCount: frozen.frozenQuestionCount,
  output: {
    root: safeOutput,
    normalizedCandidates: path.join(safeOutput, "normalized-candidates.json"),
    reviewQueue: path.join(safeOutput, "review-queue.json"),
    exceptions: path.join(safeOutput, "exceptions.json"),
  },
};
fs.writeFileSync(path.join(safeOutput, "normalization-manifest.json"), JSON.stringify(manifest, null, 2) + "\n", "utf8");

console.log(JSON.stringify({
  status: manifest.status,
  candidateCount: manifest.summary.candidateCount,
  normalizedCount: manifest.summary.normalizedCount,
  reviewRequiredCount: manifest.summary.reviewRequiredCount,
  exceptionCount: manifest.summary.exceptionCount,
  frozenMockCount: frozen.frozenMockCount,
  frozenQuestionCount: frozen.frozenQuestionCount,
  productionMutation: false,
  outputDir: safeOutput,
  sat21Created: false,
}, null, 2));
