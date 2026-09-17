import fs from 'node:fs';

const INPUT = process.env.BATCH_M_RECONCILIATION_INPUT ||
  'artifacts/batch-m-calibration-reconciliation-candidates/BATCH-M-CALIBRATION-RECONCILIATION-CANDIDATES-2026-09-17.json';

if (!fs.existsSync(INPUT)) {
  throw new Error(`Batch M calibration review normalization: input not found: ${INPUT}`);
}

const packageData = JSON.parse(fs.readFileSync(INPUT, 'utf8'));
const candidates = Array.isArray(packageData.candidates) ? packageData.candidates : [];

for (const candidate of candidates) {
  if (!candidate.id) {
    if (!candidate.questionId) throw new Error('Batch M calibration review normalization: candidate missing both id and questionId');
    candidate.id = candidate.questionId;
  }
  if (!candidate.sourceCandidateQuestionId) {
    if (!candidate.questionId) throw new Error('Batch M calibration review normalization: candidate missing both sourceCandidateQuestionId and questionId');
    candidate.sourceCandidateQuestionId = candidate.questionId;
  }
}

if (candidates.length !== 195) {
  throw new Error(`Batch M calibration review normalization: expected 195 candidates, found ${candidates.length}`);
}

fs.writeFileSync(INPUT, JSON.stringify(packageData, null, 2));
console.log(JSON.stringify({ normalizedCandidates: candidates.length, identityFields: ['id<-questionId', 'sourceCandidateQuestionId<-questionId'] }, null, 2));
