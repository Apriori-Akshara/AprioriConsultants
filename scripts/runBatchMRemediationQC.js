import { buildRepresentativeBatchMRemediationCandidates } from '../src/data/sat/mockContent/batchMRemediationCandidateFactory';

const result = buildRepresentativeBatchMRemediationCandidates({
  rwCount: 40,
  mathCount: 40,
  testId: 'SAT1',
  variant: 'sat',
});

const summary = {
  readingWritingCount: result.readingWritingCount,
  mathCount: result.mathCount,
  mathStudentProducedResponsePercent: result.mathStudentProducedResponsePercent,
  productionMutation: result.productionMutation,
  releaseEligible: result.releaseEligible,
  quality: result.quality,
};

console.log(JSON.stringify(summary, null, 2));

if (!result.quality.pass) {
  console.error('Batch M representative remediation QC FAILED.');
  process.exitCode = 1;
} else {
  console.log('Batch M representative remediation QC PASSED.');
}
