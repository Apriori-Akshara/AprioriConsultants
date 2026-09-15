/**
 * Batch M targeted replacement dry run.
 * Candidate-only. Does not mutate the production corpus.
 */

import { buildRepresentativeBatchMRemediationCandidates } from '../src/data/sat/mockContent/batchMRemediationCandidateFactory.js';
import { evaluateContentQualityBatch } from '../src/data/sat/mockContent/batchMContentQualityGate.js';

const REQUIREMENTS = {
  sat: {
    rw: {
      crossText: 108,
      synthesis: 108,
      wic: 108,
      reasoning: 42
    },
    math: {
      strategic: 168,
      figure: 103
    }
  },
  psat: {
    rw: {
      crossText: 108,
      synthesis: 108,
      wic: 108,
      reasoning: 42
    },
    math: {
      strategic: 173,
      figure: 88
    }
  }
};

function normalize(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

function assertCandidates(pool, label) {
  if (!pool || !Array.isArray(pool.candidates)) {
    throw new Error(label + ': candidates array is missing.');
  }
}

function assertMinimum(items, minimum, label) {
  if (items.length < minimum) {
    throw new Error(
      label +
        ': expected at least ' +
        minimum +
        ' candidates, found ' +
        items.length +
        '.'
    );
  }
}

function assertUnique(items, label) {
  const prompts = items.map(function (item) {
    return normalize(item.prompt);
  });

  const unique = new Set(prompts);

  if (unique.size !== prompts.length) {
    throw new Error(
      label +
        ': duplicate normalized prompts found (' +
        (prompts.length - unique.size) +
        ').'
    );
  }
}

function assertQuality(result, label) {
  if (result && result.passed === true) {
    return;
  }

  console.log('');
  console.log(label + ': CONTENT-QUALITY FAILURE');
  console.log(
    'Total candidates: ' +
      (result ? result.itemCount : 'unknown')
  );
  console.log(
    'Passed: ' +
      (result ? result.passedCount : 'unknown')
  );
  console.log(
    'Failed: ' +
      (result ? result.failedCount : 'unknown')
  );
  console.log(
    'Serious failures: ' +
      (result ? result.seriousFailureCount : 'unknown')
  );

  if (result && Array.isArray(result.items)) {
    const flagCounts = {};

    result.items.forEach(function (item) {
      if (!item || !Array.isArray(item.checks)) {
        return;
      }

      item.checks.forEach(function (check) {
        flagCounts[check] = (flagCounts[check] || 0) + 1;
      });
    });

    console.log('');
    console.log('QC failure flags:');

    const flags = Object.keys(flagCounts).sort();

    if (flags.length === 0) {
      console.log('No individual flags were returned.');
    } else {
      flags.forEach(function (flag) {
        console.log(
          '  ' +
            flag +
            ': ' +
            flagCounts[flag]
        );
      });
    }

    console.log('');
    console.log('First failed candidates:');

    let shown = 0;

    for (
      let index = 0;
      index < result.items.length && shown < 10;
      index += 1
    ) {
      const item = result.items[index];

      if (item && item.verdict !== 'pass') {
        console.log(
          '  Candidate ' +
            (index + 1) +
            ': ' +
            (Array.isArray(item.checks)
              ? item.checks.join(', ')
              : 'no checks returned')
        );

        shown += 1;
      }
    }
  }

  throw new Error(label + ': content-quality gate failed.');
}

function getRWBuckets(candidates) {
  return {
    crossText: candidates.filter(function (item) {
      return item.skill === 'Cross-Text Connections';
    }),
    synthesis: candidates.filter(function (item) {
      return item.skill === 'Rhetorical Synthesis';
    }),
    wic: candidates.filter(function (item) {
      return item.skill === 'Words in Context';
    }),
    reasoning: candidates.filter(function (item) {
      return (
        item.skill !== 'Cross-Text Connections' &&
        item.skill !== 'Rhetorical Synthesis' &&
        item.skill !== 'Words in Context'
      );
    })
  };
}

function getMathBuckets(candidates) {
  return {
    figure: candidates.filter(function (item) {
      return Boolean(item.figure);
    }),
    strategic: candidates.filter(function (item) {
      return !item.figure;
    })
  };
}

function buildCandidatePool(product) {
  const testId = product === 'sat' ? 'SAT1' : 'PSAT1';
  const variant = product === 'sat' ? 'sat' : 'psat-nmsqt';

  return buildRepresentativeBatchMRemediationCandidates({
    rwCount: 1080,
    mathCount: 1100,
    testId: testId,
    variant: variant
  });
}

function runRWCandidates(product, candidates) {
  const requirements = REQUIREMENTS[product];
  const rwCandidates = candidates.filter(function (item) {
    return item.section === 'reading-writing';
  });

  assertMinimum(
    rwCandidates,
    1080,
    product + ' R&W pool'
  );

  console.log(
    'R&W pool size: ' +
      rwCandidates.length
  );

  const quality = evaluateContentQualityBatch(
    rwCandidates
  );

  assertQuality(quality, product + ' R&W');

  const buckets = getRWBuckets(rwCandidates);

  console.log(
    'Cross-Text: ' +
      buckets.crossText.length +
      ' / ' +
      requirements.rw.crossText
  );

  console.log(
    'Rhetorical Synthesis: ' +
      buckets.synthesis.length +
      ' / ' +
      requirements.rw.synthesis
  );

  console.log(
    'Words in Context: ' +
      buckets.wic.length +
      ' / ' +
      requirements.rw.wic
  );

  console.log(
    'Reasoning-driven: ' +
      buckets.reasoning.length +
      ' / ' +
      requirements.rw.reasoning
  );

  if (
    buckets.crossText.length <
    requirements.rw.crossText
  ) {
    throw new Error(
      product +
        ' R&W Cross-Text requirement not met.'
    );
  }

  if (
    buckets.synthesis.length <
    requirements.rw.synthesis
  ) {
    throw new Error(
      product +
        ' R&W Rhetorical Synthesis requirement not met.'
    );
  }

  if (
    buckets.wic.length <
    requirements.rw.wic
  ) {
    throw new Error(
      product +
        ' R&W Words in Context requirement not met.'
    );
  }

  if (
    buckets.reasoning.length <
    requirements.rw.reasoning
  ) {
    throw new Error(
      product +
        ' R&W reasoning requirement not met.'
    );
  }

  assertUnique(
    buckets.crossText.slice(
      0,
      requirements.rw.crossText
    ),
    product + ' R&W Cross-Text'
  );

  assertUnique(
    buckets.synthesis.slice(
      0,
      requirements.rw.synthesis
    ),
    product + ' R&W Rhetorical Synthesis'
  );

  assertUnique(
    buckets.wic.slice(
      0,
      requirements.rw.wic
    ),
    product + ' R&W Words in Context'
  );

  assertUnique(
    buckets.reasoning.slice(
      0,
      requirements.rw.reasoning
    ),
    product + ' R&W reasoning'
  );

  return {
    poolSize: rwCandidates.length,
    qualityPassed: quality.passed,
    crossText: buckets.crossText.length,
    synthesis: buckets.synthesis.length,
    wic: buckets.wic.length,
    reasoning: buckets.reasoning.length
  };
}

function runMathCandidates(product, candidates) {
  const requirements = REQUIREMENTS[product];
  const mathCandidates = candidates.filter(function (item) {
    return item.section === 'math';
  });

  assertMinimum(
    mathCandidates,
    1100,
    product + ' Math pool'
  );

  console.log(
    'Math pool size: ' +
      mathCandidates.length
  );

  const quality = evaluateContentQualityBatch(
    mathCandidates
  );

  assertQuality(quality, product + ' Math');

  const buckets = getMathBuckets(mathCandidates);

  const sprPercent = Number(
    candidates
      .filter(function (item) {
        return item.section === 'math';
      })
      .filter(function (item) {
        return item.questionType === 'student-produced-response';
      }).length /
      Math.max(1, mathCandidates.length) *
      100
  );

  console.log(
    'Strategic: ' +
      buckets.strategic.length +
      ' / ' +
      requirements.math.strategic
  );

  console.log(
    'Figure: ' +
      buckets.figure.length +
      ' / ' +
      requirements.math.figure
  );

  console.log(
    'Calculated SPR: ' +
      sprPercent.toFixed(2) +
      '%'
  );

  if (
    buckets.strategic.length <
    requirements.math.strategic
  ) {
    throw new Error(
      product +
        ' Math strategic requirement not met.'
    );
  }

  if (
    buckets.figure.length <
    requirements.math.figure
  ) {
    throw new Error(
      product +
        ' Math figure requirement not met.'
    );
  }

  assertUnique(
    buckets.strategic.slice(
      0,
      requirements.math.strategic
    ),
    product + ' Math strategic'
  );

  assertUnique(
    buckets.figure.slice(
      0,
      requirements.math.figure
    ),
    product + ' Math figure'
  );

  if (
    sprPercent < 25 ||
    sprPercent > 30
  ) {
    throw new Error(
      product +
        ' Math SPR is outside the required 25%-30% range.'
    );
  }

  return {
    poolSize: mathCandidates.length,
    qualityPassed: quality.passed,
    strategic: buckets.strategic.length,
    figure: buckets.figure.length,
    sprPercent: Number(
      sprPercent.toFixed(2)
    )
  };
}

function runProduct(product) {
  console.log('');
  console.log(
    '=== ' +
      product.toUpperCase() +
      ' TARGETED REPLACEMENT DRY RUN ==='
  );

  const pool = buildCandidatePool(product);

  assertCandidates(
    pool,
    product + ' remediation factory'
  );

  const rw = runRWCandidates(
    product,
    pool.candidates
  );

  const math = runMathCandidates(
    product,
    pool.candidates
  );

  return {
    rw: rw,
    math: math
  };
}

function main() {
  const result = {
    sat: runProduct('sat'),
    psat: runProduct('psat'),
    productionMutation: false,
    releaseEligible: false
  };

  console.log('');
  console.log('=== FINAL DRY-RUN RESULT ===');
  console.log(
    JSON.stringify(result, null, 2)
  );
  console.log('');
  console.log(
    'Batch M targeted replacement dry run PASSED.'
  );
}

try {
  main();
} catch (error) {
  console.error('');
  console.error(
    'Batch M targeted replacement dry run FAILED.'
  );

  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(error);
  }

  process.exitCode = 1;
}
