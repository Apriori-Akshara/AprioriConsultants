# SAT20 — Legacy Human-Editable Export

STATUS: LEGACY
APPROVAL: NOT APPROVED
TEST KEY: SAT20
TEST ID: sat-series-b-mock-20
ASSESSMENT VARIANT: sat-series-b
QUESTION COUNT: 196

> This file is a working copy of the frozen 30-mock production corpus. It is not launch-approved content.
> Changes here do not mutate canonical production content. Promote only explicitly approved questions through the controlled workflow.

### Question: sat-series-b-mock-20-rw-001

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: standard-english-conventions
SKILL: Boundaries
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
The estimate from the agricultural field trial was reliable _____ only within the range represented by the data.

CHOICES:
[
  "; but",
  ", but",
  ": but",
  "but"
]

ANSWER: D

EXPLANATION:
“But” connects the qualification within the same sentence without an unnecessary comma.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-001",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-001",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-1",
  "domain": "standard-english-conventions",
  "skill": "Boundaries",
  "subskill": "compound-predicate",
  "conceptId": "standard-english-conventions-boundaries",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 55,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": null,
  "figure": null,
  "isOperational": false,
  "adaptiveRoute": null,
  "originalityFingerprint": "batch-m-calibration-sec-v2-095-boundaries-easy",
  "conceptFingerprint": "standard-english-conventions-Boundaries-easy-94",
  "tags": [
    "sat-series-a",
    "batch-m-remediation-candidate",
    "apriori-original",
    "source-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-001-sat-mock-20-1",
    "contextFamily": "sat-series-b-literature-observation-qualification",
    "passageGenre": "literature",
    "readingTopic": "a cartographer returning to a town altered by a new railway",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "literary-prose",
    "rhetoricalStructure": "compound-predicate",
    "evidenceRelationship": "example-to-claim",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Central Ideas and Details",
    "passageWordCount": 63,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "B": {
          "role": "distractor",
          "misconception": "true-but-nonresponsive",
          "error_mechanism": "Chooses a true detail that does not state the text’s central idea.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "overly-broad-inference",
          "error_mechanism": "Extends the passage to a universal claim that the evidence does not support.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "too-narrow-detail",
          "error_mechanism": "Treats one local observation as the whole point of the passage.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "A": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "literature",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "direct-support",
      "cognitive_operation": "identify",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the passage-level claim that best integrates the major information rather than a single detail. Evidence relationship: direct-support.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "B": "Chooses a true detail that does not state the text’s central idea.",
        "C": "Extends the passage to a universal claim that the evidence does not support.",
        "D": "Treats one local observation as the whole point of the passage."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent.",
    "sourceBlueprint": "field study finds a broad pattern with an ecological limitation",
    "difficultyFeatures": [],
    "difficultyRequirements": {
      "minimumReasoningSteps": 1,
      "requiredFeatures": [],
      "distractorStandard": "one plausible procedural error"
    },
    "targetWord": null,
    "crossTextRelationship": null,
    "candidateConstructionIndex": 94,
    "candidateOnly": false,
    "productionMutation": true,
    "calibrationReconciliation": true,
    "assessmentFamily": "sat",
    "assessmentVariant": "sat-series-b",
    "assessmentNumber": 20,
    "productionTestId": "sat-series-b-mock-20",
    "productionTestKey": "sat-series-b-mock-20",
    "sourceDomain": "information-and-ideas",
    "targetDomain": "standard-english-conventions",
    "controlledReplacement": {
      "date": "2026-09-17",
      "authorization": "explicit-user-authorization",
      "authorizationScope": "exact-195-target-calibration-reconciliation-lock",
      "testKey": "sat-series-b-mock-20",
      "productionTestId": "sat-series-b-mock-20",
      "replacedQuestionId": "sat-series-b-mock-20-rw-001",
      "candidateQuestionId": "BATCH-M-CAL-SEC-095",
      "sourceDomain": "information-and-ideas",
      "targetDomain": "standard-english-conventions"
    }
  }
}
```

### Question: sat-series-b-mock-20-rw-002

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: expression-of-ideas
SKILL: Transitions
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of changes in how local newspapers described public libraries in the early twentieth century drew on 2030 examples from 7 settings over 8 observation periods. The researchers observed a strong overall pattern. _____, the size of the effect differed among the study conditions.

CHOICES:
[
  "For example,",
  "However,",
  "Similarly,",
  "In addition,"
]

ANSWER: B

EXPLANATION:
However correctly signals the contrast between the broad pattern and the difference in effect size.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-002",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-002",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-1",
  "domain": "expression-of-ideas",
  "skill": "Transitions",
  "subskill": "Transitions",
  "conceptId": "expression-of-ideas-transitions",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-002",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-002-history-social-science-problem-response-limitation",
  "conceptFingerprint": "expression-of-ideas-Transitions-history-social-science-1",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-history-social-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-002-sat-mock-20-2",
    "contextFamily": "sat-series-b-history-social-science-problem-response-limitation",
    "passageGenre": "history-social-science",
    "readingTopic": "changes in how local newspapers described public libraries in the early twentieth century",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "qualified-support",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Transitions",
    "passageWordCount": 60,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "non-structural-fit",
          "error_mechanism": "Chooses a transition that is grammatical but does not express the relationship between the sentences.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "example-for-contrast",
          "error_mechanism": "Treats a contrast as though the second sentence were merely an example.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "addition-for-contrast",
          "error_mechanism": "Signals addition when the sentence relationship requires a contrasting move.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "history-social-science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "qualified-support",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the logical relationship between the surrounding sentences before selecting the transition. Evidence relationship: qualified-support.",
      "correct_reasoning": "However correctly signals the contrast between the broad pattern and the difference in effect size.",
      "distractor_reasoning": {
        "A": "Chooses a transition that is grammatical but does not express the relationship between the sentences.",
        "C": "Treats a contrast as though the second sentence were merely an example.",
        "D": "Signals addition when the sentence relationship requires a contrasting move."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-003

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: standard-english-conventions
SKILL: Form, Structure, and Sense
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The revised model for the neighborhood tree study _____ more accurate than the earlier model.

CHOICES:
[
  "were",
  "being",
  "was",
  "have been"
]

ANSWER: C

EXPLANATION:
The singular subject “model” takes the singular verb “was.”

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-003",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-003",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-1",
  "domain": "standard-english-conventions",
  "skill": "Form, Structure, and Sense",
  "subskill": "parallel-structure",
  "conceptId": "standard-english-conventions-form-structure-and-sense",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 70,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": null,
  "figure": null,
  "isOperational": false,
  "adaptiveRoute": null,
  "originalityFingerprint": "batch-m-calibration-sec-v2-030-form-structure-and-sense-medium",
  "conceptFingerprint": "standard-english-conventions-Form, Structure, and Sense-medium-29",
  "tags": [
    "sat-series-a",
    "batch-m-remediation-candidate",
    "apriori-original",
    "source-humanities"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-003-sat-mock-20-3",
    "contextFamily": "sat-series-b-humanities-observation-qualification",
    "passageGenre": "humanities",
    "readingTopic": "the changing use of color in a regional school of landscape painting",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "parallel-structure",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Text Structure and Purpose",
    "passageWordCount": 63,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "local-detail-as-purpose",
          "error_mechanism": "Treats the immediate detail as the author’s overall rhetorical purpose.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "overbroad-purpose",
          "error_mechanism": "Assigns a purpose broader than the passage evidence warrants.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "reversed-rhetorical-role",
          "error_mechanism": "Reverses the function of the information in the development of the passage.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "humanities",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "contrast",
      "cognitive_operation": "interpret",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Determine what rhetorical job the referenced information performs in the passage as a whole. Evidence relationship: contrast.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Treats the immediate detail as the author’s overall rhetorical purpose.",
        "B": "Assigns a purpose broader than the passage evidence warrants.",
        "D": "Reverses the function of the information in the development of the passage."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent.",
    "sourceBlueprint": "architectural choices reflect practical and symbolic purposes",
    "difficultyFeatures": [
      "careful-interpretation"
    ],
    "difficultyRequirements": {
      "minimumReasoningSteps": 2,
      "requiredFeatures": [
        "careful-interpretation"
      ],
      "distractorStandard": "plausible misconception or missed condition"
    },
    "targetWord": null,
    "crossTextRelationship": null,
    "candidateConstructionIndex": 29,
    "candidateOnly": false,
    "productionMutation": true,
    "calibrationReconciliation": true,
    "assessmentFamily": "sat",
    "assessmentVariant": "sat-series-b",
    "assessmentNumber": 20,
    "productionTestId": "sat-series-b-mock-20",
    "productionTestKey": "sat-series-b-mock-20",
    "sourceDomain": "craft-and-structure",
    "targetDomain": "standard-english-conventions",
    "controlledReplacement": {
      "date": "2026-09-17",
      "authorization": "explicit-user-authorization",
      "authorizationScope": "exact-195-target-calibration-reconciliation-lock",
      "testKey": "sat-series-b-mock-20",
      "productionTestId": "sat-series-b-mock-20",
      "replacedQuestionId": "sat-series-b-mock-20-rw-003",
      "candidateQuestionId": "BATCH-M-CAL-SEC-030",
      "sourceDomain": "craft-and-structure",
      "targetDomain": "standard-english-conventions"
    }
  }
}
```

### Question: sat-series-b-mock-20-rw-004

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: standard-english-conventions
SKILL: Boundaries
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
The estimate from the telescope calibration study was reliable _____ only within the range represented by the data.

CHOICES:
[
  "; but",
  "but",
  ", but",
  ": but"
]

ANSWER: B

EXPLANATION:
“But” connects the qualification within the same sentence without an unnecessary comma.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-004",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-004",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-1",
  "domain": "standard-english-conventions",
  "skill": "Boundaries",
  "subskill": "dependent-introductory-clause",
  "conceptId": "standard-english-conventions-boundaries",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 82,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": null,
  "figure": null,
  "isOperational": false,
  "adaptiveRoute": null,
  "originalityFingerprint": "batch-m-calibration-sec-v2-125-boundaries-hard",
  "conceptFingerprint": "standard-english-conventions-Boundaries-hard-124",
  "tags": [
    "sat-series-a",
    "batch-m-remediation-candidate",
    "apriori-original",
    "source-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-004-sat-mock-20-4",
    "contextFamily": "sat-series-b-science-problem-response-limitation",
    "passageGenre": "science",
    "readingTopic": "how migratory birds alter stopover timing when food availability changes",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "dependent-introductory-clause",
    "evidenceRelationship": "example-to-claim",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Inferences",
    "passageWordCount": 59,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "causal-overreach",
          "error_mechanism": "Infers a causal claim even though the passage establishes only an observed relationship.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "absolute-inference",
          "error_mechanism": "Turns a qualified inference into an unconditional statement.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "under-interpretation",
          "error_mechanism": "Repeats a surface observation without drawing the required supported inference.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "inference",
      "cognitive_operation": "infer",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Draw only the conclusion that is warranted by the stated or strongly implied evidence. Evidence relationship: inference.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Infers a causal claim even though the passage establishes only an observed relationship.",
        "B": "Turns a qualified inference into an unconditional statement.",
        "C": "Repeats a surface observation without drawing the required supported inference."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent.",
    "sourceBlueprint": "field study finds a broad pattern with an ecological limitation",
    "difficultyFeatures": [
      "multi-step",
      "strategic-choice",
      "evidence-synthesis"
    ],
    "difficultyRequirements": {
      "minimumReasoningSteps": 2,
      "requiredFeatures": [
        "multi-step",
        "strategic-choice"
      ],
      "distractorStandard": "high-plausibility alternative based on a specific reasoning error"
    },
    "targetWord": null,
    "crossTextRelationship": null,
    "candidateConstructionIndex": 124,
    "candidateOnly": false,
    "productionMutation": true,
    "calibrationReconciliation": true,
    "assessmentFamily": "sat",
    "assessmentVariant": "sat-series-b",
    "assessmentNumber": 20,
    "productionTestId": "sat-series-b-mock-20",
    "productionTestKey": "sat-series-b-mock-20",
    "sourceDomain": "information-and-ideas",
    "targetDomain": "standard-english-conventions",
    "controlledReplacement": {
      "date": "2026-09-17",
      "authorization": "explicit-user-authorization",
      "authorizationScope": "exact-195-target-calibration-reconciliation-lock",
      "testKey": "sat-series-b-mock-20",
      "productionTestId": "sat-series-b-mock-20",
      "replacedQuestionId": "sat-series-b-mock-20-rw-004",
      "candidateQuestionId": "BATCH-M-CAL-SEC-125",
      "sourceDomain": "information-and-ideas",
      "targetDomain": "standard-english-conventions"
    }
  }
}
```

### Question: sat-series-b-mock-20-rw-005

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: standard-english-conventions
SKILL: Boundaries
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of sculptor reconsidering a work after seeing it in a crowded exhibition drew on 2033 examples from 10 settings over 7 observation periods. The revised method produced a clearer signal _____ it required additional calibration.

CHOICES:
[
  "; however,",
  "; therefore,",
  "; for example,",
  "; similarly,"
]

ANSWER: A

EXPLANATION:
The semicolon separates two independent clauses, while however correctly signals their contrast.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-005",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-005",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-1",
  "domain": "standard-english-conventions",
  "skill": "Boundaries",
  "subskill": "Boundaries",
  "conceptId": "standard-english-conventions-boundaries",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-005",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-005-literature-observation-qualification",
  "conceptFingerprint": "standard-english-conventions-Boundaries-literature-4",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-literature"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-005-sat-mock-20-5",
    "contextFamily": "sat-series-b-literature-observation-qualification",
    "passageGenre": "literature",
    "readingTopic": "a sculptor reconsidering a work after seeing it in a crowded exhibition",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "example-to-claim",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Boundaries",
    "passageWordCount": 64,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "B": {
          "role": "distractor",
          "misconception": "comma-splice-or-fragment",
          "error_mechanism": "Treats two sentence boundaries as though one punctuation mark could incorrectly join or fragment them.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "independent-clause-confusion",
          "error_mechanism": "Fails to recognize the clause structure needed for the sentence boundary.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "misplaced-transition",
          "error_mechanism": "Selects punctuation/transition placement that does not correctly separate the surrounding clauses.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "A": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "literature",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "example-to-claim",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the clause structure and then select punctuation that creates the required sentence boundary. Evidence relationship: example-to-claim.",
      "correct_reasoning": "The semicolon separates two independent clauses, while however correctly signals their contrast.",
      "distractor_reasoning": {
        "B": "Treats two sentence boundaries as though one punctuation mark could incorrectly join or fragment them.",
        "C": "Fails to recognize the clause structure needed for the sentence boundary.",
        "D": "Selects punctuation/transition placement that does not correctly separate the surrounding clauses."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-006

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: standard-english-conventions
SKILL: Form, Structure, and Sense
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
The revised model for the regional library survey _____ more accurate than the earlier model.

CHOICES:
[
  "was",
  "were",
  "being",
  "have been"
]

ANSWER: A

EXPLANATION:
The singular subject “model” takes the singular verb “was.”

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-006",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-006",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-1",
  "domain": "standard-english-conventions",
  "skill": "Form, Structure, and Sense",
  "subskill": "pronoun-reference",
  "conceptId": "standard-english-conventions-form-structure-and-sense",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 55,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": null,
  "figure": null,
  "isOperational": false,
  "adaptiveRoute": null,
  "originalityFingerprint": "batch-m-calibration-sec-v2-060-form-structure-and-sense-easy",
  "conceptFingerprint": "standard-english-conventions-Form, Structure, and Sense-easy-59",
  "tags": [
    "sat-series-a",
    "batch-m-remediation-candidate",
    "apriori-original",
    "source-literature"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-006-sat-mock-20-6",
    "contextFamily": "sat-series-b-history-social-science-problem-response-limitation",
    "passageGenre": "history-social-science",
    "readingTopic": "a policy experiment designed to reduce congestion without restricting access to businesses",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "informational-prose",
    "rhetoricalStructure": "pronoun-reference",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Cross-Text Connections",
    "passageWordCount": 67,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "one-passage-only",
          "error_mechanism": "Answers from one passage while ignoring the relationship required across both texts.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "reversed-relationship",
          "error_mechanism": "Switches agreement, contrast, qualification, or another stated relationship.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "overgeneralized-agreement",
          "error_mechanism": "Attributes a stronger or broader agreement to both authors than the texts support.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "history-social-science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "relationship-reversal",
      "cognitive_operation": "synthesize",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "passage_1_evidence"
        },
        {
          "locator": "stimulus.segment.2",
          "role": "passage_2_evidence"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.2",
          "role": "passage_2_evidence"
        }
      ],
      "required_inference": "Compare both passages before deciding how their claims or interpretations relate. Evidence relationship: relationship-reversal.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Answers from one passage while ignoring the relationship required across both texts.",
        "C": "Switches agreement, contrast, qualification, or another stated relationship.",
        "D": "Attributes a stronger or broader agreement to both authors than the texts support."
      }
    },
    "qc_status": "failed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 3,
    "qc_failed_checks": [
      "2"
    ],
    "qc_reviewer_notes": "Independent Batch D review failed checks 2. Correct the flagged internal structure or route the item to human review; do not bypass the gate.",
    "sourceBlueprint": "character weighs continuity against an unexpected opportunity",
    "difficultyFeatures": [],
    "difficultyRequirements": {
      "minimumReasoningSteps": 1,
      "requiredFeatures": [],
      "distractorStandard": "one plausible procedural error"
    },
    "targetWord": null,
    "crossTextRelationship": null,
    "candidateConstructionIndex": 59,
    "candidateOnly": false,
    "productionMutation": true,
    "calibrationReconciliation": true,
    "assessmentFamily": "sat",
    "assessmentVariant": "sat-series-b",
    "assessmentNumber": 20,
    "productionTestId": "sat-series-b-mock-20",
    "productionTestKey": "sat-series-b-mock-20",
    "sourceDomain": "craft-and-structure",
    "targetDomain": "standard-english-conventions",
    "controlledReplacement": {
      "date": "2026-09-17",
      "authorization": "explicit-user-authorization",
      "authorizationScope": "exact-195-target-calibration-reconciliation-lock",
      "testKey": "sat-series-b-mock-20",
      "productionTestId": "sat-series-b-mock-20",
      "replacedQuestionId": "sat-series-b-mock-20-rw-006",
      "candidateQuestionId": "BATCH-M-CAL-SEC-060",
      "sourceDomain": "craft-and-structure",
      "targetDomain": "standard-english-conventions"
    }
  }
}
```

### Question: sat-series-b-mock-20-rw-007

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: standard-english-conventions
SKILL: Boundaries
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
The estimate from the language-learning study was reliable _____ only within the range represented by the data.

CHOICES:
[
  "; but",
  ", but",
  ": but",
  "but"
]

ANSWER: D

EXPLANATION:
“But” connects the qualification within the same sentence without an unnecessary comma.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-007",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-007",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-1",
  "domain": "standard-english-conventions",
  "skill": "Boundaries",
  "subskill": "dependent-introductory-clause",
  "conceptId": "standard-english-conventions-boundaries",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 82,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": null,
  "figure": null,
  "isOperational": false,
  "adaptiveRoute": null,
  "originalityFingerprint": "batch-m-calibration-sec-v2-155-boundaries-hard",
  "conceptFingerprint": "standard-english-conventions-Boundaries-hard-154",
  "tags": [
    "sat-series-a",
    "batch-m-remediation-candidate",
    "apriori-original",
    "source-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-007-sat-mock-20-7",
    "contextFamily": "sat-series-b-humanities-observation-qualification",
    "passageGenre": "humanities",
    "readingTopic": "the acoustic design of small performance spaces",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "informational-prose",
    "rhetoricalStructure": "dependent-introductory-clause",
    "evidenceRelationship": "example-to-claim",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Command of Evidence",
    "passageWordCount": 56,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "true-but-nonresponsive",
          "error_mechanism": "Selects evidence that is accurate but does not directly support the stated interpretation.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "method-instead-of-evidence",
          "error_mechanism": "Confuses study procedure or context with evidence for the claim.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "background-instead-of-support",
          "error_mechanism": "Chooses surrounding information rather than evidence bearing on the target claim.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "humanities",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "direct-support",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Connect the selected evidence directly to the interpretation named in the question. Evidence relationship: direct-support.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Selects evidence that is accurate but does not directly support the stated interpretation.",
        "B": "Confuses study procedure or context with evidence for the claim.",
        "D": "Chooses surrounding information rather than evidence bearing on the target claim."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent.",
    "sourceBlueprint": "field study finds a broad pattern with an ecological limitation",
    "difficultyFeatures": [
      "multi-step",
      "strategic-choice",
      "evidence-synthesis"
    ],
    "difficultyRequirements": {
      "minimumReasoningSteps": 2,
      "requiredFeatures": [
        "multi-step",
        "strategic-choice"
      ],
      "distractorStandard": "high-plausibility alternative based on a specific reasoning error"
    },
    "targetWord": null,
    "crossTextRelationship": null,
    "candidateConstructionIndex": 154,
    "candidateOnly": false,
    "productionMutation": true,
    "calibrationReconciliation": true,
    "assessmentFamily": "sat",
    "assessmentVariant": "sat-series-b",
    "assessmentNumber": 20,
    "productionTestId": "sat-series-b-mock-20",
    "productionTestKey": "sat-series-b-mock-20",
    "sourceDomain": "information-and-ideas",
    "targetDomain": "standard-english-conventions",
    "controlledReplacement": {
      "date": "2026-09-17",
      "authorization": "explicit-user-authorization",
      "authorizationScope": "exact-195-target-calibration-reconciliation-lock",
      "testKey": "sat-series-b-mock-20",
      "productionTestId": "sat-series-b-mock-20",
      "replacedQuestionId": "sat-series-b-mock-20-rw-007",
      "candidateQuestionId": "BATCH-M-CAL-SEC-155",
      "sourceDomain": "information-and-ideas",
      "targetDomain": "standard-english-conventions"
    }
  }
}
```

### Question: sat-series-b-mock-20-rw-008

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: standard-english-conventions
SKILL: Form, Structure, and Sense
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of the movement of sediment after vegetation is restored along a riverbank drew on 2036 examples from 5 settings over 6 observation periods. The set of measurements, rather than the individual readings, _____ the basis for comparison.

CHOICES:
[
  "support",
  "supporting",
  "have supported",
  "supports"
]

ANSWER: D

EXPLANATION:
The singular subject set takes the singular verb supports.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-008",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-008",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-1",
  "domain": "standard-english-conventions",
  "skill": "Form, Structure, and Sense",
  "subskill": "Form, Structure, and Sense",
  "conceptId": "standard-english-conventions-form-structure-and-sense",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-008",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-008-science-problem-response-limitation",
  "conceptFingerprint": "standard-english-conventions-Form, Structure, and Sense-science-7",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-008-sat-mock-20-8",
    "contextFamily": "sat-series-b-science-problem-response-limitation",
    "passageGenre": "science",
    "readingTopic": "the movement of sediment after vegetation is restored along a riverbank",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "qualified-support",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Form, Structure, and Sense",
    "passageWordCount": 61,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "subject-verb-agreement",
          "error_mechanism": "Selects a verb that agrees with a nearby noun rather than the actual subject.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "tense-or-person-mismatch",
          "error_mechanism": "Chooses a form inconsistent with the sentence’s established tense or grammatical person.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "modifier-or-structure-error",
          "error_mechanism": "Chooses a form that creates a grammatical or structural mismatch in the sentence.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "qualified-support",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Select the grammatical form that agrees with the sentence structure and preserves its meaning. Evidence relationship: qualified-support.",
      "correct_reasoning": "The singular subject set takes the singular verb supports.",
      "distractor_reasoning": {
        "A": "Selects a verb that agrees with a nearby noun rather than the actual subject.",
        "B": "Chooses a form inconsistent with the sentence’s established tense or grammatical person.",
        "C": "Chooses a form that creates a grammatical or structural mismatch in the sentence."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-009

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: expression-of-ideas
SKILL: Rhetorical Synthesis
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
Study focus: a community debate over whether a new transit route should follow an older commercial corridor. Observation: the evidence shows a measurable difference between the two settings. Qualification: the size of the difference depends on conditions surrounding the observation. Goal: state the result accurately without making a broader claim than the evidence supports. The analysis of gardener noticing that a neglected courtyard has become a meeting place drew on 2037 examples from 6 settings over 8 observation periods. The comparison was reviewed again so that the result could be stated without dropping its important qualification.

The student wants to emphasize the study’s main result while preserving its important qualification. Which choice best accomplishes this goal?

CHOICES:
[
  "The comparison reveals a measurable effect, although its size depends on the conditions studied.",
  "The researchers collected observations and recorded them at several locations.",
  "The study examined a defined group during a specified period.",
  "The project used multiple observations but did not report a result."
]

ANSWER: A

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-009",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-009",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-1",
  "domain": "expression-of-ideas",
  "skill": "Rhetorical Synthesis",
  "subskill": "Rhetorical Synthesis",
  "conceptId": "expression-of-ideas-rhetorical-synthesis",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "synthesize",
  "questionType": "multiple-choice",
  "stimulusType": "notes",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-009",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-009-literature-observation-qualification",
  "conceptFingerprint": "expression-of-ideas-Rhetorical Synthesis-literature-8",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-literature"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-009-sat-mock-20-9",
    "contextFamily": "sat-series-b-literature-observation-qualification",
    "passageGenre": "literature",
    "readingTopic": "a gardener noticing that a neglected courtyard has become a meeting place",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "contrast",
    "cognitiveOperation": "synthesize",
    "questionConstruction": "Rhetorical Synthesis",
    "passageWordCount": null,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "B": {
          "role": "distractor",
          "misconception": "note-dump",
          "error_mechanism": "Includes a relevant note but does not fulfill the communication goal stated in the prompt.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "goal-mismatch",
          "error_mechanism": "Uses relevant information but emphasizes the wrong rhetorical priority.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "overclaim",
          "error_mechanism": "Combines the notes into a statement stronger than the supplied evidence.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "A": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "literature",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "contrast",
      "cognitive_operation": "synthesize",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "goal_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "goal_or_qualification"
        }
      ],
      "required_inference": "Select notes that fulfill the stated communication goal without adding an unsupported claim. Evidence relationship: contrast.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "B": "Includes a relevant note but does not fulfill the communication goal stated in the prompt.",
        "C": "Uses relevant information but emphasizes the wrong rhetorical priority.",
        "D": "Combines the notes into a statement stronger than the supplied evidence."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-010

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: craft-and-structure
SKILL: Words in Context
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
In examining farmers adapting cooperative practices when regional prices became less predictable, researchers focused on what changed rather than assuming that the change had a single explanation. Contemporary records show that the policy produced a visible change, although the effect varied across neighborhoods. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. The analysis of farmers adapting cooperative practices when regional prices became less predictable drew on 2038 examples from 7 settings over 10 observation periods.

As used in the text, what does “qualify” most nearly mean?

CHOICES:
[
  "measure",
  "qualify",
  "decorate",
  "separate"
]

ANSWER: B

EXPLANATION:
In context, qualify means to limit or modify a statement so that it is not interpreted too broadly.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-010",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-010",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-1",
  "domain": "craft-and-structure",
  "skill": "Words in Context",
  "subskill": "Words in Context",
  "conceptId": "craft-and-structure-words-in-context",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-010",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-010-history-social-science-problem-response-limitation",
  "conceptFingerprint": "craft-and-structure-Words in Context-history-social-science-9",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-history-social-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-010-sat-mock-20-10",
    "contextFamily": "sat-series-b-history-social-science-problem-response-limitation",
    "passageGenre": "history-social-science",
    "readingTopic": "farmers adapting cooperative practices when regional prices became less predictable",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "inference",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Words in Context",
    "passageWordCount": 59,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "literal-near-synonym",
          "error_mechanism": "Selects a familiar dictionary sense that does not fit the word’s use in context.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "irrelevant-context",
          "error_mechanism": "Chooses a possible meaning associated with the topic rather than the sentence.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "reversed-meaning",
          "error_mechanism": "Interprets the word in a direction opposite to the relationship established by the text.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "history-social-science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "inference",
      "cognitive_operation": "interpret",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Use the surrounding sentence relationship to select the sense that fits this specific context. Evidence relationship: inference.",
      "correct_reasoning": "In context, qualify means to limit or modify a statement so that it is not interpreted too broadly.",
      "distractor_reasoning": {
        "A": "Selects a familiar dictionary sense that does not fit the word’s use in context.",
        "C": "Chooses a possible meaning associated with the topic rather than the sentence.",
        "D": "Interprets the word in a direction opposite to the relationship established by the text."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-011

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: standard-english-conventions
SKILL: Boundaries
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
The estimate from the renewable-energy trial was reliable _____ only within the range represented by the data.

CHOICES:
[
  "; but",
  "but",
  ", but",
  ": but"
]

ANSWER: B

EXPLANATION:
“But” connects the qualification within the same sentence without an unnecessary comma.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-011",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-011",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-1",
  "domain": "standard-english-conventions",
  "skill": "Boundaries",
  "subskill": "compound-predicate",
  "conceptId": "standard-english-conventions-boundaries",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 55,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": null,
  "figure": null,
  "isOperational": false,
  "adaptiveRoute": null,
  "originalityFingerprint": "batch-m-calibration-sec-v2-185-boundaries-easy",
  "conceptFingerprint": "standard-english-conventions-Boundaries-easy-184",
  "tags": [
    "sat-series-a",
    "batch-m-remediation-candidate",
    "apriori-original",
    "source-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-011-sat-mock-20-11",
    "contextFamily": "sat-series-b-humanities-observation-qualification",
    "passageGenre": "humanities",
    "readingTopic": "the restoration choices made when a damaged architectural feature has several plausible originals",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "informational-prose",
    "rhetoricalStructure": "compound-predicate",
    "evidenceRelationship": "example-to-claim",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Central Ideas and Details",
    "passageWordCount": 64,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "true-but-nonresponsive",
          "error_mechanism": "Chooses a true detail that does not state the text’s central idea.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "overly-broad-inference",
          "error_mechanism": "Extends the passage to a universal claim that the evidence does not support.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "too-narrow-detail",
          "error_mechanism": "Treats one local observation as the whole point of the passage.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "humanities",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "example-to-claim",
      "cognitive_operation": "identify",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the passage-level claim that best integrates the major information rather than a single detail. Evidence relationship: example-to-claim.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Chooses a true detail that does not state the text’s central idea.",
        "B": "Extends the passage to a universal claim that the evidence does not support.",
        "D": "Treats one local observation as the whole point of the passage."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent.",
    "sourceBlueprint": "field study finds a broad pattern with an ecological limitation",
    "difficultyFeatures": [],
    "difficultyRequirements": {
      "minimumReasoningSteps": 1,
      "requiredFeatures": [],
      "distractorStandard": "one plausible procedural error"
    },
    "targetWord": null,
    "crossTextRelationship": null,
    "candidateConstructionIndex": 184,
    "candidateOnly": false,
    "productionMutation": true,
    "calibrationReconciliation": true,
    "assessmentFamily": "sat",
    "assessmentVariant": "sat-series-b",
    "assessmentNumber": 20,
    "productionTestId": "sat-series-b-mock-20",
    "productionTestKey": "sat-series-b-mock-20",
    "sourceDomain": "information-and-ideas",
    "targetDomain": "standard-english-conventions",
    "controlledReplacement": {
      "date": "2026-09-17",
      "authorization": "explicit-user-authorization",
      "authorizationScope": "exact-195-target-calibration-reconciliation-lock",
      "testKey": "sat-series-b-mock-20",
      "productionTestId": "sat-series-b-mock-20",
      "replacedQuestionId": "sat-series-b-mock-20-rw-011",
      "candidateQuestionId": "BATCH-M-CAL-SEC-185",
      "sourceDomain": "information-and-ideas",
      "targetDomain": "standard-english-conventions"
    }
  }
}
```

### Question: sat-series-b-mock-20-rw-012

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: expression-of-ideas
SKILL: Transitions
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of whether an imaging method detects canopy changes more consistently after calibration drew on 2040 examples from 9 settings over 7 observation periods. The researchers observed a strong overall pattern. _____, the size of the effect differed among the study conditions.

CHOICES:
[
  "For example,",
  "Similarly,",
  "In addition,",
  "However,"
]

ANSWER: D

EXPLANATION:
However correctly signals the contrast between the broad pattern and the difference in effect size.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-012",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-012",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-1",
  "domain": "expression-of-ideas",
  "skill": "Transitions",
  "subskill": "Transitions",
  "conceptId": "expression-of-ideas-transitions",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-012",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-012-science-problem-response-limitation",
  "conceptFingerprint": "expression-of-ideas-Transitions-science-11",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-012-sat-mock-20-12",
    "contextFamily": "sat-series-b-science-problem-response-limitation",
    "passageGenre": "science",
    "readingTopic": "whether an imaging method detects canopy changes more consistently after calibration",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Transitions",
    "passageWordCount": 64,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "non-structural-fit",
          "error_mechanism": "Chooses a transition that is grammatical but does not express the relationship between the sentences.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "example-for-contrast",
          "error_mechanism": "Treats a contrast as though the second sentence were merely an example.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "addition-for-contrast",
          "error_mechanism": "Signals addition when the sentence relationship requires a contrasting move.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "relationship-reversal",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the logical relationship between the surrounding sentences before selecting the transition. Evidence relationship: relationship-reversal.",
      "correct_reasoning": "However correctly signals the contrast between the broad pattern and the difference in effect size.",
      "distractor_reasoning": {
        "A": "Chooses a transition that is grammatical but does not express the relationship between the sentences.",
        "B": "Treats a contrast as though the second sentence were merely an example.",
        "C": "Signals addition when the sentence relationship requires a contrasting move."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-013

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: craft-and-structure
SKILL: Text Structure and Purpose
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of a cartographer returning to a town altered by a new railway compared observations from different conditions instead of treating the first pattern as conclusive. The narrator initially treats the change as an inconvenience, but a later observation makes the earlier judgment seem incomplete. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. A later moment changes how the character understands a detail that initially seemed ordinary. The analysis of cartographer returning to a town altered by a new railway drew on 2041 examples from 10 settings over 9 observation periods.

Why does the author include the information about the conditions surrounding the result?

CHOICES:
[
  "To qualify a broader finding by identifying a condition that limits it.",
  "To replace the central finding with an unrelated explanation.",
  "To provide background that has no effect on the interpretation.",
  "To repeat the earlier observation without adding information."
]

ANSWER: A

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-013",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-013",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-1",
  "domain": "craft-and-structure",
  "skill": "Text Structure and Purpose",
  "subskill": "Text Structure and Purpose",
  "conceptId": "craft-and-structure-text-structure-and-purpose",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-013",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-013-literature-observation-qualification",
  "conceptFingerprint": "craft-and-structure-Text Structure and Purpose-literature-12",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-literature"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-013-sat-mock-20-13",
    "contextFamily": "sat-series-b-literature-observation-qualification",
    "passageGenre": "literature",
    "readingTopic": "a cartographer returning to a town altered by a new railway",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Text Structure and Purpose",
    "passageWordCount": 63,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "B": {
          "role": "distractor",
          "misconception": "local-detail-as-purpose",
          "error_mechanism": "Treats the immediate detail as the author’s overall rhetorical purpose.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "overbroad-purpose",
          "error_mechanism": "Assigns a purpose broader than the passage evidence warrants.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "reversed-rhetorical-role",
          "error_mechanism": "Reverses the function of the information in the development of the passage.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "A": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "literature",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "direct-support",
      "cognitive_operation": "interpret",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Determine what rhetorical job the referenced information performs in the passage as a whole. Evidence relationship: direct-support.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "B": "Treats the immediate detail as the author’s overall rhetorical purpose.",
        "C": "Assigns a purpose broader than the passage evidence warrants.",
        "D": "Reverses the function of the information in the development of the passage."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-014

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: information-and-ideas
SKILL: Inferences
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of changes in how local newspapers described public libraries in the early twentieth century compared observations from different conditions instead of treating the first pattern as conclusive. Researchers distinguish the stated purpose of the initiative from the later uses residents found for it. The result therefore supports a narrower claim than a simple comparison might initially suggest. The historical account distinguishes the initial policy decision from later ways in which residents adapted to it. The analysis of changes in how local newspapers described public libraries in the early twentieth century drew on 2042 examples from 3 settings over 4 observation periods.

Which inference is best supported by the text?

CHOICES:
[
  "The observed relationship must remain identical regardless of surrounding conditions.",
  "The observed relationship may change when relevant surrounding conditions change.",
  "The evidence establishes a single cause with no need for further comparison.",
  "The observations show that the measured difference is too small to interpret."
]

ANSWER: B

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-014",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-014",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-1",
  "domain": "information-and-ideas",
  "skill": "Inferences",
  "subskill": "Inferences",
  "conceptId": "information-and-ideas-inferences",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-014",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-014-history-social-science-problem-response-limitation",
  "conceptFingerprint": "information-and-ideas-Inferences-history-social-science-13",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-history-social-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-014-sat-mock-20-14",
    "contextFamily": "sat-series-b-history-social-science-problem-response-limitation",
    "passageGenre": "history-social-science",
    "readingTopic": "changes in how local newspapers described public libraries in the early twentieth century",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "qualified-support",
    "cognitiveOperation": "infer",
    "questionConstruction": "Inferences",
    "passageWordCount": 60,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "causal-overreach",
          "error_mechanism": "Infers a causal claim even though the passage establishes only an observed relationship.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "absolute-inference",
          "error_mechanism": "Turns a qualified inference into an unconditional statement.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "under-interpretation",
          "error_mechanism": "Repeats a surface observation without drawing the required supported inference.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "history-social-science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "qualified-support",
      "cognitive_operation": "infer",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Draw only the conclusion that is warranted by the stated or strongly implied evidence. Evidence relationship: qualified-support.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Infers a causal claim even though the passage establishes only an observed relationship.",
        "C": "Turns a qualified inference into an unconditional statement.",
        "D": "Repeats a surface observation without drawing the required supported inference."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-015

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: standard-english-conventions
SKILL: Boundaries
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of the changing use of color in a regional school of landscape painting drew on 2043 examples from 4 settings over 6 observation periods. The revised method produced a clearer signal _____ it required additional calibration.

CHOICES:
[
  "; therefore,",
  "; for example,",
  "; however,",
  "; similarly,"
]

ANSWER: C

EXPLANATION:
The semicolon separates two independent clauses, while however correctly signals their contrast.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-015",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-015",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-1",
  "domain": "standard-english-conventions",
  "skill": "Boundaries",
  "subskill": "Boundaries",
  "conceptId": "standard-english-conventions-boundaries",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-015",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-015-humanities-observation-qualification",
  "conceptFingerprint": "standard-english-conventions-Boundaries-humanities-14",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-humanities"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-015-sat-mock-20-15",
    "contextFamily": "sat-series-b-humanities-observation-qualification",
    "passageGenre": "humanities",
    "readingTopic": "the changing use of color in a regional school of landscape painting",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "contrast",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Boundaries",
    "passageWordCount": 63,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "comma-splice-or-fragment",
          "error_mechanism": "Treats two sentence boundaries as though one punctuation mark could incorrectly join or fragment them.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "independent-clause-confusion",
          "error_mechanism": "Fails to recognize the clause structure needed for the sentence boundary.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "misplaced-transition",
          "error_mechanism": "Selects punctuation/transition placement that does not correctly separate the surrounding clauses.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "humanities",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "contrast",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the clause structure and then select punctuation that creates the required sentence boundary. Evidence relationship: contrast.",
      "correct_reasoning": "The semicolon separates two independent clauses, while however correctly signals their contrast.",
      "distractor_reasoning": {
        "A": "Treats two sentence boundaries as though one punctuation mark could incorrectly join or fragment them.",
        "B": "Fails to recognize the clause structure needed for the sentence boundary.",
        "D": "Selects punctuation/transition placement that does not correctly separate the surrounding clauses."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-016

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: craft-and-structure
SKILL: Cross-Text Connections
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
In examining how migratory birds alter stopover timing when food availability changes, researchers focused on what changed rather than assuming that the change had a single explanation. Measurements show a consistent overall pattern, but the magnitude of the effect changes under different conditions. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation.

Passage 2: In examining the spread of neighborhood associations during a period of rapid population growth, researchers focused on what changed rather than assuming that the change had a single explanation. Researchers distinguish the stated purpose of the initiative from the later uses residents found for it. The result therefore supports a narrower claim than a simple comparison might initially suggest. The study included a comparison condition so that an observed change could be separated from ordinary variation in the measurements. The analysis of how migratory birds alter stopover timing when food availability changes drew on 2044 examples from 5 settings over 8 observation periods.

Based on the two passages, which statement would both authors most likely agree with?

CHOICES:
[
  "Both authors argue that a result must be identical in every setting.",
  "Both authors conclude that local conditions make comparison unnecessary.",
  "Both authors treat a single observation as sufficient for a universal rule.",
  "Both authors support a qualified interpretation of a broad pattern."
]

ANSWER: D

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-016",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-016",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-1",
  "domain": "craft-and-structure",
  "skill": "Cross-Text Connections",
  "subskill": "Cross-Text Connections",
  "conceptId": "craft-and-structure-cross-text-connections",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "synthesize",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-016",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-016-science-problem-response-limitation",
  "conceptFingerprint": "craft-and-structure-Cross-Text Connections-science-15",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-016-sat-mock-20-16",
    "contextFamily": "sat-series-b-science-problem-response-limitation",
    "passageGenre": "science",
    "readingTopic": "how migratory birds alter stopover timing when food availability changes",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "inference",
    "cognitiveOperation": "synthesize",
    "questionConstruction": "Cross-Text Connections",
    "passageWordCount": 59,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "one-passage-only",
          "error_mechanism": "Answers from one passage while ignoring the relationship required across both texts.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "reversed-relationship",
          "error_mechanism": "Switches agreement, contrast, qualification, or another stated relationship.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "overgeneralized-agreement",
          "error_mechanism": "Attributes a stronger or broader agreement to both authors than the texts support.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "inference",
      "cognitive_operation": "synthesize",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "passage_1_evidence"
        },
        {
          "locator": "stimulus.segment.2",
          "role": "passage_2_evidence"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.2",
          "role": "passage_2_evidence"
        }
      ],
      "required_inference": "Compare both passages before deciding how their claims or interpretations relate. Evidence relationship: inference.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Answers from one passage while ignoring the relationship required across both texts.",
        "B": "Switches agreement, contrast, qualification, or another stated relationship.",
        "C": "Attributes a stronger or broader agreement to both authors than the texts support."
      }
    },
    "qc_status": "failed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 3,
    "qc_failed_checks": [
      "2"
    ],
    "qc_reviewer_notes": "Independent Batch D review failed checks 2. Correct the flagged internal structure or route the item to human review; do not bypass the gate."
  }
}
```

### Question: sat-series-b-mock-20-rw-017

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: information-and-ideas
SKILL: Command of Evidence
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
An account of a sculptor reconsidering a work after seeing it in a crowded exhibition becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The scene moves from a concrete detail to a reflection that reveals the character’s uncertainty rather than resolving it. The result therefore supports a narrower claim than a simple comparison might initially suggest. The scene contrasts a remembered version of the setting with the present one, prompting the character to reconsider the earlier impression. The analysis of sculptor reconsidering a work after seeing it in a crowded exhibition drew on 2045 examples from 6 settings over 10 observation periods.

Which finding would best support the interpretation presented in the text?

CHOICES:
[
  "A follow-up observation reproduces the predicted pattern after the relevant condition is changed.",
  "The researchers collected observations from more than one location or setting.",
  "The researchers recorded both averages and individual observations.",
  "The study followed earlier work on a related question."
]

ANSWER: A

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-017",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-017",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-1",
  "domain": "information-and-ideas",
  "skill": "Command of Evidence",
  "subskill": "Command of Evidence",
  "conceptId": "information-and-ideas-command-of-evidence",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-017",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-017-literature-observation-qualification",
  "conceptFingerprint": "information-and-ideas-Command of Evidence-literature-16",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-literature"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-017-sat-mock-20-17",
    "contextFamily": "sat-series-b-literature-observation-qualification",
    "passageGenre": "literature",
    "readingTopic": "a sculptor reconsidering a work after seeing it in a crowded exhibition",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "example-to-claim",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Command of Evidence",
    "passageWordCount": 64,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "B": {
          "role": "distractor",
          "misconception": "true-but-nonresponsive",
          "error_mechanism": "Selects evidence that is accurate but does not directly support the stated interpretation.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "method-instead-of-evidence",
          "error_mechanism": "Confuses study procedure or context with evidence for the claim.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "background-instead-of-support",
          "error_mechanism": "Chooses surrounding information rather than evidence bearing on the target claim.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "A": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "literature",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "example-to-claim",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Connect the selected evidence directly to the interpretation named in the question. Evidence relationship: example-to-claim.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "B": "Selects evidence that is accurate but does not directly support the stated interpretation.",
        "C": "Confuses study procedure or context with evidence for the claim.",
        "D": "Chooses surrounding information rather than evidence bearing on the target claim."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-018

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: standard-english-conventions
SKILL: Form, Structure, and Sense
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of policy experiment designed to reduce congestion without restricting access to businesses drew on 2046 examples from 7 settings over 5 observation periods. The set of measurements, rather than the individual readings, _____ the basis for comparison.

CHOICES:
[
  "support",
  "supports",
  "supporting",
  "have supported"
]

ANSWER: B

EXPLANATION:
The singular subject set takes the singular verb supports.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-018",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-018",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-1",
  "domain": "standard-english-conventions",
  "skill": "Form, Structure, and Sense",
  "subskill": "Form, Structure, and Sense",
  "conceptId": "standard-english-conventions-form-structure-and-sense",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-018",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-018-history-social-science-problem-response-limitation",
  "conceptFingerprint": "standard-english-conventions-Form, Structure, and Sense-history-social-science-0",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-history-social-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-018-sat-mock-20-18",
    "contextFamily": "sat-series-b-history-social-science-problem-response-limitation",
    "passageGenre": "history-social-science",
    "readingTopic": "a policy experiment designed to reduce congestion without restricting access to businesses",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Form, Structure, and Sense",
    "passageWordCount": 67,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "subject-verb-agreement",
          "error_mechanism": "Selects a verb that agrees with a nearby noun rather than the actual subject.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "tense-or-person-mismatch",
          "error_mechanism": "Chooses a form inconsistent with the sentence’s established tense or grammatical person.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "modifier-or-structure-error",
          "error_mechanism": "Chooses a form that creates a grammatical or structural mismatch in the sentence.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "history-social-science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "relationship-reversal",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Select the grammatical form that agrees with the sentence structure and preserves its meaning. Evidence relationship: relationship-reversal.",
      "correct_reasoning": "The singular subject set takes the singular verb supports.",
      "distractor_reasoning": {
        "A": "Selects a verb that agrees with a nearby noun rather than the actual subject.",
        "C": "Chooses a form inconsistent with the sentence’s established tense or grammatical person.",
        "D": "Chooses a form that creates a grammatical or structural mismatch in the sentence."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-019

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: expression-of-ideas
SKILL: Rhetorical Synthesis
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
Study focus: municipal efforts to coordinate street markets as cities expanded. Observation: the evidence shows a measurable difference between the two settings. Qualification: the size of the difference depends on conditions surrounding the observation. Goal: state the result accurately without making a broader claim than the evidence supports. The analysis of the acoustic design of small performance spaces drew on 2047 examples from 8 settings over 7 observation periods. The comparison was reviewed again so that the result could be stated without dropping its important qualification.

The student wants to emphasize the study’s main result while preserving its important qualification. Which choice best accomplishes this goal?

CHOICES:
[
  "The researchers collected observations and recorded them at several locations.",
  "The study examined a defined group during a specified period.",
  "The comparison reveals a measurable effect, although its size depends on the conditions studied.",
  "The project used multiple observations but did not report a result."
]

ANSWER: C

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-019",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-019",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-1",
  "domain": "expression-of-ideas",
  "skill": "Rhetorical Synthesis",
  "subskill": "Rhetorical Synthesis",
  "conceptId": "expression-of-ideas-rhetorical-synthesis",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "synthesize",
  "questionType": "multiple-choice",
  "stimulusType": "notes",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-019",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-019-humanities-observation-qualification",
  "conceptFingerprint": "expression-of-ideas-Rhetorical Synthesis-humanities-1",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-humanities"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-019-sat-mock-20-19",
    "contextFamily": "sat-series-b-humanities-observation-qualification",
    "passageGenre": "humanities",
    "readingTopic": "the acoustic design of small performance spaces",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "synthesize",
    "questionConstruction": "Rhetorical Synthesis",
    "passageWordCount": null,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "note-dump",
          "error_mechanism": "Includes a relevant note but does not fulfill the communication goal stated in the prompt.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "goal-mismatch",
          "error_mechanism": "Uses relevant information but emphasizes the wrong rhetorical priority.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "overclaim",
          "error_mechanism": "Combines the notes into a statement stronger than the supplied evidence.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "humanities",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "direct-support",
      "cognitive_operation": "synthesize",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "goal_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "goal_or_qualification"
        }
      ],
      "required_inference": "Select notes that fulfill the stated communication goal without adding an unsupported claim. Evidence relationship: direct-support.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Includes a relevant note but does not fulfill the communication goal stated in the prompt.",
        "B": "Uses relevant information but emphasizes the wrong rhetorical priority.",
        "D": "Combines the notes into a statement stronger than the supplied evidence."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-020

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: craft-and-structure
SKILL: Words in Context
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of the movement of sediment after vegetation is restored along a riverbank compared observations from different conditions instead of treating the first pattern as conclusive. A follow-up measurement supports the broad interpretation while identifying a condition that limits how widely it can be applied. The result therefore supports a narrower claim than a simple comparison might initially suggest. The analysis of the movement of sediment after vegetation is restored along a riverbank drew on 2048 examples from 9 settings over 9 observation periods.

As used in the text, what does “qualify” most nearly mean?

CHOICES:
[
  "measure",
  "decorate",
  "separate",
  "qualify"
]

ANSWER: D

EXPLANATION:
In context, qualify means to limit or modify a statement so that it is not interpreted too broadly.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-020",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-020",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-1",
  "domain": "craft-and-structure",
  "skill": "Words in Context",
  "subskill": "Words in Context",
  "conceptId": "craft-and-structure-words-in-context",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-020",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-020-science-problem-response-limitation",
  "conceptFingerprint": "craft-and-structure-Words in Context-science-2",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-020-sat-mock-20-20",
    "contextFamily": "sat-series-b-science-problem-response-limitation",
    "passageGenre": "science",
    "readingTopic": "the movement of sediment after vegetation is restored along a riverbank",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "qualified-support",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Words in Context",
    "passageWordCount": 61,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "literal-near-synonym",
          "error_mechanism": "Selects a familiar dictionary sense that does not fit the word’s use in context.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "irrelevant-context",
          "error_mechanism": "Chooses a possible meaning associated with the topic rather than the sentence.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "reversed-meaning",
          "error_mechanism": "Interprets the word in a direction opposite to the relationship established by the text.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "qualified-support",
      "cognitive_operation": "interpret",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Use the surrounding sentence relationship to select the sense that fits this specific context. Evidence relationship: qualified-support.",
      "correct_reasoning": "In context, qualify means to limit or modify a statement so that it is not interpreted too broadly.",
      "distractor_reasoning": {
        "A": "Selects a familiar dictionary sense that does not fit the word’s use in context.",
        "B": "Chooses a possible meaning associated with the topic rather than the sentence.",
        "C": "Interprets the word in a direction opposite to the relationship established by the text."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-021

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: information-and-ideas
SKILL: Central Ideas and Details
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
In examining a gardener noticing that a neglected courtyard has become a meeting place, researchers focused on what changed rather than assuming that the change had a single explanation. The character values continuity, yet the setting repeatedly introduces evidence that change has already occurred. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. Two descriptions of the same place do not fully agree, creating a reason to question the first impression. The analysis of gardener noticing that a neglected courtyard has become a meeting place drew on 2049 examples from 10 settings over 4 observation periods.

Which choice best states the main idea of the text?

CHOICES:
[
  "The the passage identifies a pattern while qualifying how broadly it should be interpreted.",
  "The the passage proves that the observed result occurs in every comparable setting.",
  "The the passage treats one observation as sufficient to establish a universal rule.",
  "The the passage focuses mainly on background details without reaching an interpretive conclusion."
]

ANSWER: A

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-021",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-021",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-1",
  "domain": "information-and-ideas",
  "skill": "Central Ideas and Details",
  "subskill": "Central Ideas and Details",
  "conceptId": "information-and-ideas-central-ideas-and-details",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "recall",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-021",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-021-literature-observation-qualification",
  "conceptFingerprint": "information-and-ideas-Central Ideas and Details-literature-3",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-literature"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-021-sat-mock-20-21",
    "contextFamily": "sat-series-b-literature-observation-qualification",
    "passageGenre": "literature",
    "readingTopic": "a gardener noticing that a neglected courtyard has become a meeting place",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "contrast",
    "cognitiveOperation": "identify",
    "questionConstruction": "Central Ideas and Details",
    "passageWordCount": 61,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "B": {
          "role": "distractor",
          "misconception": "true-but-nonresponsive",
          "error_mechanism": "Chooses a true detail that does not state the text’s central idea.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "overly-broad-inference",
          "error_mechanism": "Extends the passage to a universal claim that the evidence does not support.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "too-narrow-detail",
          "error_mechanism": "Treats one local observation as the whole point of the passage.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "A": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "literature",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "contrast",
      "cognitive_operation": "identify",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the passage-level claim that best integrates the major information rather than a single detail. Evidence relationship: contrast.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "B": "Chooses a true detail that does not state the text’s central idea.",
        "C": "Extends the passage to a universal claim that the evidence does not support.",
        "D": "Treats one local observation as the whole point of the passage."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-022

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: expression-of-ideas
SKILL: Transitions
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of farmers adapting cooperative practices when regional prices became less predictable drew on 2050 examples from 3 settings over 6 observation periods. The researchers observed a strong overall pattern. _____, the size of the effect differed among the study conditions.

CHOICES:
[
  "For example,",
  "However,",
  "Similarly,",
  "In addition,"
]

ANSWER: B

EXPLANATION:
However correctly signals the contrast between the broad pattern and the difference in effect size.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-022",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-022",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-1",
  "domain": "expression-of-ideas",
  "skill": "Transitions",
  "subskill": "Transitions",
  "conceptId": "expression-of-ideas-transitions",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-022",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-022-history-social-science-problem-response-limitation",
  "conceptFingerprint": "expression-of-ideas-Transitions-history-social-science-4",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-history-social-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-022-sat-mock-20-22",
    "contextFamily": "sat-series-b-history-social-science-problem-response-limitation",
    "passageGenre": "history-social-science",
    "readingTopic": "farmers adapting cooperative practices when regional prices became less predictable",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "inference",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Transitions",
    "passageWordCount": 59,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "non-structural-fit",
          "error_mechanism": "Chooses a transition that is grammatical but does not express the relationship between the sentences.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "example-for-contrast",
          "error_mechanism": "Treats a contrast as though the second sentence were merely an example.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "addition-for-contrast",
          "error_mechanism": "Signals addition when the sentence relationship requires a contrasting move.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "history-social-science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "inference",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the logical relationship between the surrounding sentences before selecting the transition. Evidence relationship: inference.",
      "correct_reasoning": "However correctly signals the contrast between the broad pattern and the difference in effect size.",
      "distractor_reasoning": {
        "A": "Chooses a transition that is grammatical but does not express the relationship between the sentences.",
        "C": "Treats a contrast as though the second sentence were merely an example.",
        "D": "Signals addition when the sentence relationship requires a contrasting move."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-023

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: craft-and-structure
SKILL: Text Structure and Purpose
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
An account of the restoration choices made when a damaged architectural feature has several plausible originals becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The evidence becomes more informative when the object is considered alongside the setting in which audiences encountered it. The result therefore supports a narrower claim than a simple comparison might initially suggest. Researchers evaluated the pattern across multiple objects before treating it as evidence of a general practice. The analysis of the restoration choices made when a damaged architectural feature has several plausible originals drew on 2051 examples from 4 settings over 8 observation periods.

Why does the author include the information about the conditions surrounding the result?

CHOICES:
[
  "To replace the central finding with an unrelated explanation.",
  "To provide background that has no effect on the interpretation.",
  "To qualify a broader finding by identifying a condition that limits it.",
  "To repeat the earlier observation without adding information."
]

ANSWER: C

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-023",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-023",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-1",
  "domain": "craft-and-structure",
  "skill": "Text Structure and Purpose",
  "subskill": "Text Structure and Purpose",
  "conceptId": "craft-and-structure-text-structure-and-purpose",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-023",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-023-humanities-observation-qualification",
  "conceptFingerprint": "craft-and-structure-Text Structure and Purpose-humanities-5",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-humanities"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-023-sat-mock-20-23",
    "contextFamily": "sat-series-b-humanities-observation-qualification",
    "passageGenre": "humanities",
    "readingTopic": "the restoration choices made when a damaged architectural feature has several plausible originals",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "example-to-claim",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Text Structure and Purpose",
    "passageWordCount": 64,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "local-detail-as-purpose",
          "error_mechanism": "Treats the immediate detail as the author’s overall rhetorical purpose.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "overbroad-purpose",
          "error_mechanism": "Assigns a purpose broader than the passage evidence warrants.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "reversed-rhetorical-role",
          "error_mechanism": "Reverses the function of the information in the development of the passage.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "humanities",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "example-to-claim",
      "cognitive_operation": "interpret",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Determine what rhetorical job the referenced information performs in the passage as a whole. Evidence relationship: example-to-claim.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Treats the immediate detail as the author’s overall rhetorical purpose.",
        "B": "Assigns a purpose broader than the passage evidence warrants.",
        "D": "Reverses the function of the information in the development of the passage."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-024

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: information-and-ideas
SKILL: Inferences
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
An account of whether an imaging method detects canopy changes more consistently after calibration becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The experiment separates an observed association from the stronger claim that one factor alone caused the outcome. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. The investigators reviewed results from multiple observation points to determine whether the relationship was consistent. The analysis of whether an imaging method detects canopy changes more consistently after calibration drew on 2052 examples from 5 settings over 10 observation periods.

Which inference is best supported by the text?

CHOICES:
[
  "The observed relationship must remain identical regardless of surrounding conditions.",
  "The evidence establishes a single cause with no need for further comparison.",
  "The observations show that the measured difference is too small to interpret.",
  "The observed relationship may change when relevant surrounding conditions change."
]

ANSWER: D

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-024",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-024",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-1",
  "domain": "information-and-ideas",
  "skill": "Inferences",
  "subskill": "Inferences",
  "conceptId": "information-and-ideas-inferences",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-024",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-024-science-problem-response-limitation",
  "conceptFingerprint": "information-and-ideas-Inferences-science-6",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-024-sat-mock-20-24",
    "contextFamily": "sat-series-b-science-problem-response-limitation",
    "passageGenre": "science",
    "readingTopic": "whether an imaging method detects canopy changes more consistently after calibration",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "infer",
    "questionConstruction": "Inferences",
    "passageWordCount": 64,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "causal-overreach",
          "error_mechanism": "Infers a causal claim even though the passage establishes only an observed relationship.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "absolute-inference",
          "error_mechanism": "Turns a qualified inference into an unconditional statement.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "under-interpretation",
          "error_mechanism": "Repeats a surface observation without drawing the required supported inference.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "relationship-reversal",
      "cognitive_operation": "infer",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Draw only the conclusion that is warranted by the stated or strongly implied evidence. Evidence relationship: relationship-reversal.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Infers a causal claim even though the passage establishes only an observed relationship.",
        "B": "Turns a qualified inference into an unconditional statement.",
        "C": "Repeats a surface observation without drawing the required supported inference."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-025

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: standard-english-conventions
SKILL: Boundaries
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of cartographer returning to a town altered by a new railway drew on 2053 examples from 6 settings over 5 observation periods. The revised method produced a clearer signal _____ it required additional calibration.

CHOICES:
[
  "; however,",
  "; therefore,",
  "; for example,",
  "; similarly,"
]

ANSWER: A

EXPLANATION:
The semicolon separates two independent clauses, while however correctly signals their contrast.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-025",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-025",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-1",
  "domain": "standard-english-conventions",
  "skill": "Boundaries",
  "subskill": "Boundaries",
  "conceptId": "standard-english-conventions-boundaries",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-025",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-025-literature-observation-qualification",
  "conceptFingerprint": "standard-english-conventions-Boundaries-literature-7",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-literature"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-025-sat-mock-20-25",
    "contextFamily": "sat-series-b-literature-observation-qualification",
    "passageGenre": "literature",
    "readingTopic": "a cartographer returning to a town altered by a new railway",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Boundaries",
    "passageWordCount": 63,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "B": {
          "role": "distractor",
          "misconception": "comma-splice-or-fragment",
          "error_mechanism": "Treats two sentence boundaries as though one punctuation mark could incorrectly join or fragment them.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "independent-clause-confusion",
          "error_mechanism": "Fails to recognize the clause structure needed for the sentence boundary.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "misplaced-transition",
          "error_mechanism": "Selects punctuation/transition placement that does not correctly separate the surrounding clauses.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "A": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "literature",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "direct-support",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the clause structure and then select punctuation that creates the required sentence boundary. Evidence relationship: direct-support.",
      "correct_reasoning": "The semicolon separates two independent clauses, while however correctly signals their contrast.",
      "distractor_reasoning": {
        "B": "Treats two sentence boundaries as though one punctuation mark could incorrectly join or fragment them.",
        "C": "Fails to recognize the clause structure needed for the sentence boundary.",
        "D": "Selects punctuation/transition placement that does not correctly separate the surrounding clauses."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-026

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: craft-and-structure
SKILL: Cross-Text Connections
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of changes in how local newspapers described public libraries in the early twentieth century compared observations from different conditions instead of treating the first pattern as conclusive. Researchers distinguish the stated purpose of the initiative from the later uses residents found for it. The result therefore supports a narrower claim than a simple comparison might initially suggest.

Passage 2: A recent study of whether a coating changes the stability of a battery electrode during repeated cycles compared observations from different conditions instead of treating the first pattern as conclusive. The experiment separates an observed association from the stronger claim that one factor alone caused the outcome. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. The historical account distinguishes the initial policy decision from later ways in which residents adapted to it. The analysis of changes in how local newspapers described public libraries in the early twentieth century drew on 2054 examples from 7 settings over 7 observation periods.

Based on the two passages, which statement would both authors most likely agree with?

CHOICES:
[
  "Both authors argue that a result must be identical in every setting.",
  "Both authors support a qualified interpretation of a broad pattern.",
  "Both authors conclude that local conditions make comparison unnecessary.",
  "Both authors treat a single observation as sufficient for a universal rule."
]

ANSWER: B

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-026",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-026",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-1",
  "domain": "craft-and-structure",
  "skill": "Cross-Text Connections",
  "subskill": "Cross-Text Connections",
  "conceptId": "craft-and-structure-cross-text-connections",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "synthesize",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-026",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-026-history-social-science-problem-response-limitation",
  "conceptFingerprint": "craft-and-structure-Cross-Text Connections-history-social-science-8",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-history-social-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-026-sat-mock-20-26",
    "contextFamily": "sat-series-b-history-social-science-problem-response-limitation",
    "passageGenre": "history-social-science",
    "readingTopic": "changes in how local newspapers described public libraries in the early twentieth century",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "qualified-support",
    "cognitiveOperation": "synthesize",
    "questionConstruction": "Cross-Text Connections",
    "passageWordCount": 60,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "one-passage-only",
          "error_mechanism": "Answers from one passage while ignoring the relationship required across both texts.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "reversed-relationship",
          "error_mechanism": "Switches agreement, contrast, qualification, or another stated relationship.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "overgeneralized-agreement",
          "error_mechanism": "Attributes a stronger or broader agreement to both authors than the texts support.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "history-social-science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "qualified-support",
      "cognitive_operation": "synthesize",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "passage_1_evidence"
        },
        {
          "locator": "stimulus.segment.2",
          "role": "passage_2_evidence"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.2",
          "role": "passage_2_evidence"
        }
      ],
      "required_inference": "Compare both passages before deciding how their claims or interpretations relate. Evidence relationship: qualified-support.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Answers from one passage while ignoring the relationship required across both texts.",
        "C": "Switches agreement, contrast, qualification, or another stated relationship.",
        "D": "Attributes a stronger or broader agreement to both authors than the texts support."
      }
    },
    "qc_status": "failed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 3,
    "qc_failed_checks": [
      "2"
    ],
    "qc_reviewer_notes": "Independent Batch D review failed checks 2. Correct the flagged internal structure or route the item to human review; do not bypass the gate."
  }
}
```

### Question: sat-series-b-mock-20-rw-027

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: information-and-ideas
SKILL: Command of Evidence
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
In examining the changing use of color in a regional school of landscape painting, researchers focused on what changed rather than assuming that the change had a single explanation. The researchers caution that a recurring feature does not by itself establish a single origin or intention. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. The comparison includes cases in which the feature is prominent and cases in which it is much less noticeable. The analysis of the changing use of color in a regional school of landscape painting drew on 2055 examples from 8 settings over 9 observation periods.

Which finding would best support the interpretation presented in the text?

CHOICES:
[
  "The researchers collected observations from more than one location or setting.",
  "The researchers recorded both averages and individual observations.",
  "A follow-up observation reproduces the predicted pattern after the relevant condition is changed.",
  "The study followed earlier work on a related question."
]

ANSWER: C

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-027",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-027",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-1",
  "domain": "information-and-ideas",
  "skill": "Command of Evidence",
  "subskill": "Command of Evidence",
  "conceptId": "information-and-ideas-command-of-evidence",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-027",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-027-humanities-observation-qualification",
  "conceptFingerprint": "information-and-ideas-Command of Evidence-humanities-9",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-humanities"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-027-sat-mock-20-27",
    "contextFamily": "sat-series-b-humanities-observation-qualification",
    "passageGenre": "humanities",
    "readingTopic": "the changing use of color in a regional school of landscape painting",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "contrast",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Command of Evidence",
    "passageWordCount": 63,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "true-but-nonresponsive",
          "error_mechanism": "Selects evidence that is accurate but does not directly support the stated interpretation.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "method-instead-of-evidence",
          "error_mechanism": "Confuses study procedure or context with evidence for the claim.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "background-instead-of-support",
          "error_mechanism": "Chooses surrounding information rather than evidence bearing on the target claim.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "humanities",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "contrast",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Connect the selected evidence directly to the interpretation named in the question. Evidence relationship: contrast.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Selects evidence that is accurate but does not directly support the stated interpretation.",
        "B": "Confuses study procedure or context with evidence for the claim.",
        "D": "Chooses surrounding information rather than evidence bearing on the target claim."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-028

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Form, Structure, and Sense
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of how migratory birds alter stopover timing when food availability changes drew on 2056 examples from 9 settings over 4 observation periods. The set of measurements, rather than the individual readings, _____ the basis for comparison.

CHOICES:
[
  "support",
  "supporting",
  "have supported",
  "supports"
]

ANSWER: D

EXPLANATION:
The singular subject set takes the singular verb supports.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-028",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-028",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "standard-english-conventions",
  "skill": "Form, Structure, and Sense",
  "subskill": "Form, Structure, and Sense",
  "conceptId": "standard-english-conventions-form-structure-and-sense",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-028",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-028-science-problem-response-limitation",
  "conceptFingerprint": "standard-english-conventions-Form, Structure, and Sense-science-10",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-028-sat-mock-20-28",
    "contextFamily": "sat-series-b-science-problem-response-limitation",
    "passageGenre": "science",
    "readingTopic": "how migratory birds alter stopover timing when food availability changes",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "inference",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Form, Structure, and Sense",
    "passageWordCount": 59,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "subject-verb-agreement",
          "error_mechanism": "Selects a verb that agrees with a nearby noun rather than the actual subject.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "tense-or-person-mismatch",
          "error_mechanism": "Chooses a form inconsistent with the sentence’s established tense or grammatical person.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "modifier-or-structure-error",
          "error_mechanism": "Chooses a form that creates a grammatical or structural mismatch in the sentence.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "inference",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Select the grammatical form that agrees with the sentence structure and preserves its meaning. Evidence relationship: inference.",
      "correct_reasoning": "The singular subject set takes the singular verb supports.",
      "distractor_reasoning": {
        "A": "Selects a verb that agrees with a nearby noun rather than the actual subject.",
        "B": "Chooses a form inconsistent with the sentence’s established tense or grammatical person.",
        "C": "Chooses a form that creates a grammatical or structural mismatch in the sentence."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-029

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Rhetorical Synthesis
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
Study focus: the restoration choices made when a damaged architectural feature has several plausible originals. Observation: the evidence shows a measurable difference between the two settings. Qualification: the size of the difference depends on conditions surrounding the observation. Goal: state the result accurately without making a broader claim than the evidence supports. The analysis of sculptor reconsidering a work after seeing it in a crowded exhibition drew on 2057 examples from 10 settings over 6 observation periods. The comparison was reviewed again so that the result could be stated without dropping its important qualification.

The student wants to emphasize the study’s main result while preserving its important qualification. Which choice best accomplishes this goal?

CHOICES:
[
  "The comparison reveals a measurable effect, although its size depends on the conditions studied.",
  "The researchers collected observations and recorded them at several locations.",
  "The study examined a defined group during a specified period.",
  "The project used multiple observations but did not report a result."
]

ANSWER: A

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-029",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-029",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "expression-of-ideas",
  "skill": "Rhetorical Synthesis",
  "subskill": "Rhetorical Synthesis",
  "conceptId": "expression-of-ideas-rhetorical-synthesis",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "synthesize",
  "questionType": "multiple-choice",
  "stimulusType": "notes",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-029",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-029-literature-observation-qualification",
  "conceptFingerprint": "expression-of-ideas-Rhetorical Synthesis-literature-11",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-literature"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-029-sat-mock-20-29",
    "contextFamily": "sat-series-b-literature-observation-qualification",
    "passageGenre": "literature",
    "readingTopic": "a sculptor reconsidering a work after seeing it in a crowded exhibition",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "example-to-claim",
    "cognitiveOperation": "synthesize",
    "questionConstruction": "Rhetorical Synthesis",
    "passageWordCount": null,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "B": {
          "role": "distractor",
          "misconception": "note-dump",
          "error_mechanism": "Includes a relevant note but does not fulfill the communication goal stated in the prompt.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "goal-mismatch",
          "error_mechanism": "Uses relevant information but emphasizes the wrong rhetorical priority.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "overclaim",
          "error_mechanism": "Combines the notes into a statement stronger than the supplied evidence.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "A": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "literature",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "example-to-claim",
      "cognitive_operation": "synthesize",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "goal_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "goal_or_qualification"
        }
      ],
      "required_inference": "Select notes that fulfill the stated communication goal without adding an unsupported claim. Evidence relationship: example-to-claim.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "B": "Includes a relevant note but does not fulfill the communication goal stated in the prompt.",
        "C": "Uses relevant information but emphasizes the wrong rhetorical priority.",
        "D": "Combines the notes into a statement stronger than the supplied evidence."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-030

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Words in Context
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
An account of a policy experiment designed to reduce congestion without restricting access to businesses becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The evidence suggests that the change was not caused by a single decision but developed through several local responses. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. The analysis of policy experiment designed to reduce congestion without restricting access to businesses drew on 2058 examples from 3 settings over 8 observation periods.

As used in the text, what does “qualify” most nearly mean?

CHOICES:
[
  "measure",
  "qualify",
  "decorate",
  "separate"
]

ANSWER: B

EXPLANATION:
In context, qualify means to limit or modify a statement so that it is not interpreted too broadly.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-030",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-030",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "craft-and-structure",
  "skill": "Words in Context",
  "subskill": "Words in Context",
  "conceptId": "craft-and-structure-words-in-context",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-030",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-030-history-social-science-problem-response-limitation",
  "conceptFingerprint": "craft-and-structure-Words in Context-history-social-science-12",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-history-social-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-030-sat-mock-20-30",
    "contextFamily": "sat-series-b-history-social-science-problem-response-limitation",
    "passageGenre": "history-social-science",
    "readingTopic": "a policy experiment designed to reduce congestion without restricting access to businesses",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Words in Context",
    "passageWordCount": 67,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "literal-near-synonym",
          "error_mechanism": "Selects a familiar dictionary sense that does not fit the word’s use in context.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "irrelevant-context",
          "error_mechanism": "Chooses a possible meaning associated with the topic rather than the sentence.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "reversed-meaning",
          "error_mechanism": "Interprets the word in a direction opposite to the relationship established by the text.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "history-social-science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "relationship-reversal",
      "cognitive_operation": "interpret",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Use the surrounding sentence relationship to select the sense that fits this specific context. Evidence relationship: relationship-reversal.",
      "correct_reasoning": "In context, qualify means to limit or modify a statement so that it is not interpreted too broadly.",
      "distractor_reasoning": {
        "A": "Selects a familiar dictionary sense that does not fit the word’s use in context.",
        "C": "Chooses a possible meaning associated with the topic rather than the sentence.",
        "D": "Interprets the word in a direction opposite to the relationship established by the text."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-031

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Central Ideas and Details
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of the acoustic design of small performance spaces compared observations from different conditions instead of treating the first pattern as conclusive. The comparison indicates that a feature often described as decorative also served a practical communicative purpose. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. Earlier and later examples were compared to determine whether the observed characteristic changed with context. The analysis of the acoustic design of small performance spaces drew on 2059 examples from 4 settings over 10 observation periods.

Which choice best states the main idea of the text?

CHOICES:
[
  "The the account proves that the observed result occurs in every comparable setting.",
  "The the account treats one observation as sufficient to establish a universal rule.",
  "The the account identifies a pattern while qualifying how broadly it should be interpreted.",
  "The the account focuses mainly on background details without reaching an interpretive conclusion."
]

ANSWER: C

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-031",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-031",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "information-and-ideas",
  "skill": "Central Ideas and Details",
  "subskill": "Central Ideas and Details",
  "conceptId": "information-and-ideas-central-ideas-and-details",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "recall",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-031",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-031-humanities-observation-qualification",
  "conceptFingerprint": "information-and-ideas-Central Ideas and Details-humanities-13",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-humanities"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-031-sat-mock-20-31",
    "contextFamily": "sat-series-b-humanities-observation-qualification",
    "passageGenre": "humanities",
    "readingTopic": "the acoustic design of small performance spaces",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "identify",
    "questionConstruction": "Central Ideas and Details",
    "passageWordCount": 56,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "true-but-nonresponsive",
          "error_mechanism": "Chooses a true detail that does not state the text’s central idea.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "overly-broad-inference",
          "error_mechanism": "Extends the passage to a universal claim that the evidence does not support.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "too-narrow-detail",
          "error_mechanism": "Treats one local observation as the whole point of the passage.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "humanities",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "direct-support",
      "cognitive_operation": "identify",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the passage-level claim that best integrates the major information rather than a single detail. Evidence relationship: direct-support.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Chooses a true detail that does not state the text’s central idea.",
        "B": "Extends the passage to a universal claim that the evidence does not support.",
        "D": "Treats one local observation as the whole point of the passage."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-032

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Transitions
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of the movement of sediment after vegetation is restored along a riverbank drew on 2060 examples from 5 settings over 5 observation periods. The researchers observed a strong overall pattern. _____, the size of the effect differed among the study conditions.

CHOICES:
[
  "For example,",
  "Similarly,",
  "In addition,",
  "However,"
]

ANSWER: D

EXPLANATION:
However correctly signals the contrast between the broad pattern and the difference in effect size.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-032",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-032",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "expression-of-ideas",
  "skill": "Transitions",
  "subskill": "Transitions",
  "conceptId": "expression-of-ideas-transitions",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-032",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-032-science-problem-response-limitation",
  "conceptFingerprint": "expression-of-ideas-Transitions-science-14",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-032-sat-mock-20-32",
    "contextFamily": "sat-series-b-science-problem-response-limitation",
    "passageGenre": "science",
    "readingTopic": "the movement of sediment after vegetation is restored along a riverbank",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "qualified-support",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Transitions",
    "passageWordCount": 61,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "non-structural-fit",
          "error_mechanism": "Chooses a transition that is grammatical but does not express the relationship between the sentences.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "example-for-contrast",
          "error_mechanism": "Treats a contrast as though the second sentence were merely an example.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "addition-for-contrast",
          "error_mechanism": "Signals addition when the sentence relationship requires a contrasting move.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "qualified-support",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the logical relationship between the surrounding sentences before selecting the transition. Evidence relationship: qualified-support.",
      "correct_reasoning": "However correctly signals the contrast between the broad pattern and the difference in effect size.",
      "distractor_reasoning": {
        "A": "Chooses a transition that is grammatical but does not express the relationship between the sentences.",
        "B": "Treats a contrast as though the second sentence were merely an example.",
        "C": "Signals addition when the sentence relationship requires a contrasting move."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-033

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Text Structure and Purpose
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
In examining a gardener noticing that a neglected courtyard has become a meeting place, researchers focused on what changed rather than assuming that the change had a single explanation. The character values continuity, yet the setting repeatedly introduces evidence that change has already occurred. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. Two descriptions of the same place do not fully agree, creating a reason to question the first impression. The analysis of gardener noticing that a neglected courtyard has become a meeting place drew on 2061 examples from 6 settings over 7 observation periods.

Why does the author include the information about the conditions surrounding the result?

CHOICES:
[
  "To qualify a broader finding by identifying a condition that limits it.",
  "To replace the central finding with an unrelated explanation.",
  "To provide background that has no effect on the interpretation.",
  "To repeat the earlier observation without adding information."
]

ANSWER: A

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-033",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-033",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "craft-and-structure",
  "skill": "Text Structure and Purpose",
  "subskill": "Text Structure and Purpose",
  "conceptId": "craft-and-structure-text-structure-and-purpose",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-033",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-033-literature-observation-qualification",
  "conceptFingerprint": "craft-and-structure-Text Structure and Purpose-literature-15",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-literature"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-033-sat-mock-20-33",
    "contextFamily": "sat-series-b-literature-observation-qualification",
    "passageGenre": "literature",
    "readingTopic": "a gardener noticing that a neglected courtyard has become a meeting place",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "contrast",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Text Structure and Purpose",
    "passageWordCount": 61,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "B": {
          "role": "distractor",
          "misconception": "local-detail-as-purpose",
          "error_mechanism": "Treats the immediate detail as the author’s overall rhetorical purpose.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "overbroad-purpose",
          "error_mechanism": "Assigns a purpose broader than the passage evidence warrants.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "reversed-rhetorical-role",
          "error_mechanism": "Reverses the function of the information in the development of the passage.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "A": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "literature",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "contrast",
      "cognitive_operation": "interpret",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Determine what rhetorical job the referenced information performs in the passage as a whole. Evidence relationship: contrast.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "B": "Treats the immediate detail as the author’s overall rhetorical purpose.",
        "C": "Assigns a purpose broader than the passage evidence warrants.",
        "D": "Reverses the function of the information in the development of the passage."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-034

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Inferences
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
In examining farmers adapting cooperative practices when regional prices became less predictable, researchers focused on what changed rather than assuming that the change had a single explanation. Contemporary records show that the policy produced a visible change, although the effect varied across neighborhoods. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. The study compares multiple contemporary reports instead of relying on the most detailed account alone. The analysis of farmers adapting cooperative practices when regional prices became less predictable drew on 2062 examples from 7 settings over 9 observation periods.

Which inference is best supported by the text?

CHOICES:
[
  "The observed relationship must remain identical regardless of surrounding conditions.",
  "The observed relationship may change when relevant surrounding conditions change.",
  "The evidence establishes a single cause with no need for further comparison.",
  "The observations show that the measured difference is too small to interpret."
]

ANSWER: B

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-034",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-034",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "information-and-ideas",
  "skill": "Inferences",
  "subskill": "Inferences",
  "conceptId": "information-and-ideas-inferences",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-034",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-034-history-social-science-problem-response-limitation",
  "conceptFingerprint": "information-and-ideas-Inferences-history-social-science-16",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-history-social-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-034-sat-mock-20-34",
    "contextFamily": "sat-series-b-history-social-science-problem-response-limitation",
    "passageGenre": "history-social-science",
    "readingTopic": "farmers adapting cooperative practices when regional prices became less predictable",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "inference",
    "cognitiveOperation": "infer",
    "questionConstruction": "Inferences",
    "passageWordCount": 59,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "causal-overreach",
          "error_mechanism": "Infers a causal claim even though the passage establishes only an observed relationship.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "absolute-inference",
          "error_mechanism": "Turns a qualified inference into an unconditional statement.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "under-interpretation",
          "error_mechanism": "Repeats a surface observation without drawing the required supported inference.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "history-social-science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "inference",
      "cognitive_operation": "infer",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Draw only the conclusion that is warranted by the stated or strongly implied evidence. Evidence relationship: inference.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Infers a causal claim even though the passage establishes only an observed relationship.",
        "C": "Turns a qualified inference into an unconditional statement.",
        "D": "Repeats a surface observation without drawing the required supported inference."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-035

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Boundaries
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of the restoration choices made when a damaged architectural feature has several plausible originals drew on 2063 examples from 8 settings over 4 observation periods. The revised method produced a clearer signal _____ it required additional calibration.

CHOICES:
[
  "; therefore,",
  "; for example,",
  "; however,",
  "; similarly,"
]

ANSWER: C

EXPLANATION:
The semicolon separates two independent clauses, while however correctly signals their contrast.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-035",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-035",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "standard-english-conventions",
  "skill": "Boundaries",
  "subskill": "Boundaries",
  "conceptId": "standard-english-conventions-boundaries",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-035",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-035-humanities-observation-qualification",
  "conceptFingerprint": "standard-english-conventions-Boundaries-humanities-0",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-humanities"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-035-sat-mock-20-35",
    "contextFamily": "sat-series-b-humanities-observation-qualification",
    "passageGenre": "humanities",
    "readingTopic": "the restoration choices made when a damaged architectural feature has several plausible originals",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "example-to-claim",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Boundaries",
    "passageWordCount": 64,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "comma-splice-or-fragment",
          "error_mechanism": "Treats two sentence boundaries as though one punctuation mark could incorrectly join or fragment them.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "independent-clause-confusion",
          "error_mechanism": "Fails to recognize the clause structure needed for the sentence boundary.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "misplaced-transition",
          "error_mechanism": "Selects punctuation/transition placement that does not correctly separate the surrounding clauses.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "humanities",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "example-to-claim",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the clause structure and then select punctuation that creates the required sentence boundary. Evidence relationship: example-to-claim.",
      "correct_reasoning": "The semicolon separates two independent clauses, while however correctly signals their contrast.",
      "distractor_reasoning": {
        "A": "Treats two sentence boundaries as though one punctuation mark could incorrectly join or fragment them.",
        "B": "Fails to recognize the clause structure needed for the sentence boundary.",
        "D": "Selects punctuation/transition placement that does not correctly separate the surrounding clauses."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-036

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Cross-Text Connections
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
An account of whether an imaging method detects canopy changes more consistently after calibration becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The experiment separates an observed association from the stronger claim that one factor alone caused the outcome. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition.

Passage 2: In examining municipal efforts to coordinate street markets as cities expanded, researchers focused on what changed rather than assuming that the change had a single explanation. Contemporary records show that the policy produced a visible change, although the effect varied across neighborhoods. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. The investigators reviewed results from multiple observation points to determine whether the relationship was consistent. The analysis of whether an imaging method detects canopy changes more consistently after calibration drew on 2064 examples from 9 settings over 6 observation periods.

Based on the two passages, which statement would both authors most likely agree with?

CHOICES:
[
  "Both authors argue that a result must be identical in every setting.",
  "Both authors conclude that local conditions make comparison unnecessary.",
  "Both authors treat a single observation as sufficient for a universal rule.",
  "Both authors support a qualified interpretation of a broad pattern."
]

ANSWER: D

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-036",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-036",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "craft-and-structure",
  "skill": "Cross-Text Connections",
  "subskill": "Cross-Text Connections",
  "conceptId": "craft-and-structure-cross-text-connections",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "synthesize",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-036",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-036-science-problem-response-limitation",
  "conceptFingerprint": "craft-and-structure-Cross-Text Connections-science-1",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-036-sat-mock-20-36",
    "contextFamily": "sat-series-b-science-problem-response-limitation",
    "passageGenre": "science",
    "readingTopic": "whether an imaging method detects canopy changes more consistently after calibration",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "synthesize",
    "questionConstruction": "Cross-Text Connections",
    "passageWordCount": 64,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "one-passage-only",
          "error_mechanism": "Answers from one passage while ignoring the relationship required across both texts.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "reversed-relationship",
          "error_mechanism": "Switches agreement, contrast, qualification, or another stated relationship.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "overgeneralized-agreement",
          "error_mechanism": "Attributes a stronger or broader agreement to both authors than the texts support.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "relationship-reversal",
      "cognitive_operation": "synthesize",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "passage_1_evidence"
        },
        {
          "locator": "stimulus.segment.2",
          "role": "passage_2_evidence"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.2",
          "role": "passage_2_evidence"
        }
      ],
      "required_inference": "Compare both passages before deciding how their claims or interpretations relate. Evidence relationship: relationship-reversal.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Answers from one passage while ignoring the relationship required across both texts.",
        "B": "Switches agreement, contrast, qualification, or another stated relationship.",
        "C": "Attributes a stronger or broader agreement to both authors than the texts support."
      }
    },
    "qc_status": "failed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 3,
    "qc_failed_checks": [
      "2"
    ],
    "qc_reviewer_notes": "Independent Batch D review failed checks 2. Correct the flagged internal structure or route the item to human review; do not bypass the gate."
  }
}
```

### Question: sat-series-b-mock-20-rw-037

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Command of Evidence
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of a cartographer returning to a town altered by a new railway compared observations from different conditions instead of treating the first pattern as conclusive. The narrator initially treats the change as an inconvenience, but a later observation makes the earlier judgment seem incomplete. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. A later moment changes how the character understands a detail that initially seemed ordinary. The analysis of cartographer returning to a town altered by a new railway drew on 2065 examples from 10 settings over 8 observation periods.

Which finding would best support the interpretation presented in the text?

CHOICES:
[
  "A follow-up observation reproduces the predicted pattern after the relevant condition is changed.",
  "The researchers collected observations from more than one location or setting.",
  "The researchers recorded both averages and individual observations.",
  "The study followed earlier work on a related question."
]

ANSWER: A

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-037",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-037",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "information-and-ideas",
  "skill": "Command of Evidence",
  "subskill": "Command of Evidence",
  "conceptId": "information-and-ideas-command-of-evidence",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-037",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-037-literature-observation-qualification",
  "conceptFingerprint": "information-and-ideas-Command of Evidence-literature-2",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-literature"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-037-sat-mock-20-37",
    "contextFamily": "sat-series-b-literature-observation-qualification",
    "passageGenre": "literature",
    "readingTopic": "a cartographer returning to a town altered by a new railway",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Command of Evidence",
    "passageWordCount": 63,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "B": {
          "role": "distractor",
          "misconception": "true-but-nonresponsive",
          "error_mechanism": "Selects evidence that is accurate but does not directly support the stated interpretation.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "method-instead-of-evidence",
          "error_mechanism": "Confuses study procedure or context with evidence for the claim.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "background-instead-of-support",
          "error_mechanism": "Chooses surrounding information rather than evidence bearing on the target claim.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "A": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "literature",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "direct-support",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Connect the selected evidence directly to the interpretation named in the question. Evidence relationship: direct-support.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "B": "Selects evidence that is accurate but does not directly support the stated interpretation.",
        "C": "Confuses study procedure or context with evidence for the claim.",
        "D": "Chooses surrounding information rather than evidence bearing on the target claim."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-038

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Form, Structure, and Sense
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of changes in how local newspapers described public libraries in the early twentieth century drew on 2066 examples from 3 settings over 10 observation periods. The set of measurements, rather than the individual readings, _____ the basis for comparison.

CHOICES:
[
  "support",
  "supports",
  "supporting",
  "have supported"
]

ANSWER: B

EXPLANATION:
The singular subject set takes the singular verb supports.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-038",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-038",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "standard-english-conventions",
  "skill": "Form, Structure, and Sense",
  "subskill": "Form, Structure, and Sense",
  "conceptId": "standard-english-conventions-form-structure-and-sense",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-038",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-038-history-social-science-problem-response-limitation",
  "conceptFingerprint": "standard-english-conventions-Form, Structure, and Sense-history-social-science-3",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-history-social-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-038-sat-mock-20-38",
    "contextFamily": "sat-series-b-history-social-science-problem-response-limitation",
    "passageGenre": "history-social-science",
    "readingTopic": "changes in how local newspapers described public libraries in the early twentieth century",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "qualified-support",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Form, Structure, and Sense",
    "passageWordCount": 60,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "subject-verb-agreement",
          "error_mechanism": "Selects a verb that agrees with a nearby noun rather than the actual subject.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "tense-or-person-mismatch",
          "error_mechanism": "Chooses a form inconsistent with the sentence’s established tense or grammatical person.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "modifier-or-structure-error",
          "error_mechanism": "Chooses a form that creates a grammatical or structural mismatch in the sentence.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "history-social-science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "qualified-support",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Select the grammatical form that agrees with the sentence structure and preserves its meaning. Evidence relationship: qualified-support.",
      "correct_reasoning": "The singular subject set takes the singular verb supports.",
      "distractor_reasoning": {
        "A": "Selects a verb that agrees with a nearby noun rather than the actual subject.",
        "C": "Chooses a form inconsistent with the sentence’s established tense or grammatical person.",
        "D": "Chooses a form that creates a grammatical or structural mismatch in the sentence."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-039

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Rhetorical Synthesis
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
Study focus: the changing use of color in a regional school of landscape painting. Observation: the evidence shows a measurable difference between the two settings. Qualification: the size of the difference depends on conditions surrounding the observation. Goal: state the result accurately without making a broader claim than the evidence supports. The analysis of the changing use of color in a regional school of landscape painting drew on 2067 examples from 4 settings over 5 observation periods. The comparison was reviewed again so that the result could be stated without dropping its important qualification.

The student wants to emphasize the study’s main result while preserving its important qualification. Which choice best accomplishes this goal?

CHOICES:
[
  "The researchers collected observations and recorded them at several locations.",
  "The study examined a defined group during a specified period.",
  "The comparison reveals a measurable effect, although its size depends on the conditions studied.",
  "The project used multiple observations but did not report a result."
]

ANSWER: C

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-039",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-039",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "expression-of-ideas",
  "skill": "Rhetorical Synthesis",
  "subskill": "Rhetorical Synthesis",
  "conceptId": "expression-of-ideas-rhetorical-synthesis",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "synthesize",
  "questionType": "multiple-choice",
  "stimulusType": "notes",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-039",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-039-humanities-observation-qualification",
  "conceptFingerprint": "expression-of-ideas-Rhetorical Synthesis-humanities-4",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-humanities"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-039-sat-mock-20-39",
    "contextFamily": "sat-series-b-humanities-observation-qualification",
    "passageGenre": "humanities",
    "readingTopic": "the changing use of color in a regional school of landscape painting",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "contrast",
    "cognitiveOperation": "synthesize",
    "questionConstruction": "Rhetorical Synthesis",
    "passageWordCount": null,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "note-dump",
          "error_mechanism": "Includes a relevant note but does not fulfill the communication goal stated in the prompt.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "goal-mismatch",
          "error_mechanism": "Uses relevant information but emphasizes the wrong rhetorical priority.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "overclaim",
          "error_mechanism": "Combines the notes into a statement stronger than the supplied evidence.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "humanities",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "contrast",
      "cognitive_operation": "synthesize",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "goal_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "goal_or_qualification"
        }
      ],
      "required_inference": "Select notes that fulfill the stated communication goal without adding an unsupported claim. Evidence relationship: contrast.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Includes a relevant note but does not fulfill the communication goal stated in the prompt.",
        "B": "Uses relevant information but emphasizes the wrong rhetorical priority.",
        "D": "Combines the notes into a statement stronger than the supplied evidence."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-040

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Words in Context
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
In examining how migratory birds alter stopover timing when food availability changes, researchers focused on what changed rather than assuming that the change had a single explanation. Measurements show a consistent overall pattern, but the magnitude of the effect changes under different conditions. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. The analysis of how migratory birds alter stopover timing when food availability changes drew on 2068 examples from 5 settings over 7 observation periods.

As used in the text, what does “qualify” most nearly mean?

CHOICES:
[
  "measure",
  "decorate",
  "separate",
  "qualify"
]

ANSWER: D

EXPLANATION:
In context, qualify means to limit or modify a statement so that it is not interpreted too broadly.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-040",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-040",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "craft-and-structure",
  "skill": "Words in Context",
  "subskill": "Words in Context",
  "conceptId": "craft-and-structure-words-in-context",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-040",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-040-science-problem-response-limitation",
  "conceptFingerprint": "craft-and-structure-Words in Context-science-5",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-040-sat-mock-20-40",
    "contextFamily": "sat-series-b-science-problem-response-limitation",
    "passageGenre": "science",
    "readingTopic": "how migratory birds alter stopover timing when food availability changes",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "inference",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Words in Context",
    "passageWordCount": 59,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "literal-near-synonym",
          "error_mechanism": "Selects a familiar dictionary sense that does not fit the word’s use in context.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "irrelevant-context",
          "error_mechanism": "Chooses a possible meaning associated with the topic rather than the sentence.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "reversed-meaning",
          "error_mechanism": "Interprets the word in a direction opposite to the relationship established by the text.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "inference",
      "cognitive_operation": "interpret",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Use the surrounding sentence relationship to select the sense that fits this specific context. Evidence relationship: inference.",
      "correct_reasoning": "In context, qualify means to limit or modify a statement so that it is not interpreted too broadly.",
      "distractor_reasoning": {
        "A": "Selects a familiar dictionary sense that does not fit the word’s use in context.",
        "B": "Chooses a possible meaning associated with the topic rather than the sentence.",
        "C": "Interprets the word in a direction opposite to the relationship established by the text."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-041

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Central Ideas and Details
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
An account of a sculptor reconsidering a work after seeing it in a crowded exhibition becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The scene moves from a concrete detail to a reflection that reveals the character’s uncertainty rather than resolving it. The result therefore supports a narrower claim than a simple comparison might initially suggest. The scene contrasts a remembered version of the setting with the present one, prompting the character to reconsider the earlier impression. The analysis of sculptor reconsidering a work after seeing it in a crowded exhibition drew on 2069 examples from 6 settings over 9 observation periods.

Which choice best states the main idea of the text?

CHOICES:
[
  "The the passage identifies a pattern while qualifying how broadly it should be interpreted.",
  "The the passage proves that the observed result occurs in every comparable setting.",
  "The the passage treats one observation as sufficient to establish a universal rule.",
  "The the passage focuses mainly on background details without reaching an interpretive conclusion."
]

ANSWER: A

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-041",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-041",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "information-and-ideas",
  "skill": "Central Ideas and Details",
  "subskill": "Central Ideas and Details",
  "conceptId": "information-and-ideas-central-ideas-and-details",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "recall",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-041",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-041-literature-observation-qualification",
  "conceptFingerprint": "information-and-ideas-Central Ideas and Details-literature-6",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-literature"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-041-sat-mock-20-41",
    "contextFamily": "sat-series-b-literature-observation-qualification",
    "passageGenre": "literature",
    "readingTopic": "a sculptor reconsidering a work after seeing it in a crowded exhibition",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "example-to-claim",
    "cognitiveOperation": "identify",
    "questionConstruction": "Central Ideas and Details",
    "passageWordCount": 64,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "B": {
          "role": "distractor",
          "misconception": "true-but-nonresponsive",
          "error_mechanism": "Chooses a true detail that does not state the text’s central idea.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "overly-broad-inference",
          "error_mechanism": "Extends the passage to a universal claim that the evidence does not support.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "too-narrow-detail",
          "error_mechanism": "Treats one local observation as the whole point of the passage.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "A": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "literature",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "example-to-claim",
      "cognitive_operation": "identify",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the passage-level claim that best integrates the major information rather than a single detail. Evidence relationship: example-to-claim.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "B": "Chooses a true detail that does not state the text’s central idea.",
        "C": "Extends the passage to a universal claim that the evidence does not support.",
        "D": "Treats one local observation as the whole point of the passage."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-042

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Transitions
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of policy experiment designed to reduce congestion without restricting access to businesses drew on 2070 examples from 7 settings over 4 observation periods. The researchers observed a strong overall pattern. _____, the size of the effect differed among the study conditions.

CHOICES:
[
  "For example,",
  "However,",
  "Similarly,",
  "In addition,"
]

ANSWER: B

EXPLANATION:
However correctly signals the contrast between the broad pattern and the difference in effect size.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-042",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-042",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "expression-of-ideas",
  "skill": "Transitions",
  "subskill": "Transitions",
  "conceptId": "expression-of-ideas-transitions",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-042",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-042-history-social-science-problem-response-limitation",
  "conceptFingerprint": "expression-of-ideas-Transitions-history-social-science-7",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-history-social-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-042-sat-mock-20-42",
    "contextFamily": "sat-series-b-history-social-science-problem-response-limitation",
    "passageGenre": "history-social-science",
    "readingTopic": "a policy experiment designed to reduce congestion without restricting access to businesses",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Transitions",
    "passageWordCount": 67,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "non-structural-fit",
          "error_mechanism": "Chooses a transition that is grammatical but does not express the relationship between the sentences.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "example-for-contrast",
          "error_mechanism": "Treats a contrast as though the second sentence were merely an example.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "addition-for-contrast",
          "error_mechanism": "Signals addition when the sentence relationship requires a contrasting move.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "history-social-science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "relationship-reversal",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the logical relationship between the surrounding sentences before selecting the transition. Evidence relationship: relationship-reversal.",
      "correct_reasoning": "However correctly signals the contrast between the broad pattern and the difference in effect size.",
      "distractor_reasoning": {
        "A": "Chooses a transition that is grammatical but does not express the relationship between the sentences.",
        "C": "Treats a contrast as though the second sentence were merely an example.",
        "D": "Signals addition when the sentence relationship requires a contrasting move."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-043

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Text Structure and Purpose
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of the acoustic design of small performance spaces compared observations from different conditions instead of treating the first pattern as conclusive. The comparison indicates that a feature often described as decorative also served a practical communicative purpose. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. Earlier and later examples were compared to determine whether the observed characteristic changed with context. The analysis of the acoustic design of small performance spaces drew on 2071 examples from 8 settings over 6 observation periods.

Why does the author include the information about the conditions surrounding the result?

CHOICES:
[
  "To replace the central finding with an unrelated explanation.",
  "To provide background that has no effect on the interpretation.",
  "To qualify a broader finding by identifying a condition that limits it.",
  "To repeat the earlier observation without adding information."
]

ANSWER: C

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-043",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-043",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "craft-and-structure",
  "skill": "Text Structure and Purpose",
  "subskill": "Text Structure and Purpose",
  "conceptId": "craft-and-structure-text-structure-and-purpose",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-043",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-043-humanities-observation-qualification",
  "conceptFingerprint": "craft-and-structure-Text Structure and Purpose-humanities-8",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-humanities"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-043-sat-mock-20-43",
    "contextFamily": "sat-series-b-humanities-observation-qualification",
    "passageGenre": "humanities",
    "readingTopic": "the acoustic design of small performance spaces",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Text Structure and Purpose",
    "passageWordCount": 56,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "local-detail-as-purpose",
          "error_mechanism": "Treats the immediate detail as the author’s overall rhetorical purpose.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "overbroad-purpose",
          "error_mechanism": "Assigns a purpose broader than the passage evidence warrants.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "reversed-rhetorical-role",
          "error_mechanism": "Reverses the function of the information in the development of the passage.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "humanities",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "direct-support",
      "cognitive_operation": "interpret",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Determine what rhetorical job the referenced information performs in the passage as a whole. Evidence relationship: direct-support.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Treats the immediate detail as the author’s overall rhetorical purpose.",
        "B": "Assigns a purpose broader than the passage evidence warrants.",
        "D": "Reverses the function of the information in the development of the passage."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-044

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Inferences
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of the movement of sediment after vegetation is restored along a riverbank compared observations from different conditions instead of treating the first pattern as conclusive. A follow-up measurement supports the broad interpretation while identifying a condition that limits how widely it can be applied. The result therefore supports a narrower claim than a simple comparison might initially suggest. The researchers compared results from two sampling periods rather than relying on a single measurement series. The analysis of the movement of sediment after vegetation is restored along a riverbank drew on 2072 examples from 9 settings over 8 observation periods.

Which inference is best supported by the text?

CHOICES:
[
  "The observed relationship must remain identical regardless of surrounding conditions.",
  "The evidence establishes a single cause with no need for further comparison.",
  "The observations show that the measured difference is too small to interpret.",
  "The observed relationship may change when relevant surrounding conditions change."
]

ANSWER: D

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-044",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-044",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "information-and-ideas",
  "skill": "Inferences",
  "subskill": "Inferences",
  "conceptId": "information-and-ideas-inferences",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-044",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-044-science-problem-response-limitation",
  "conceptFingerprint": "information-and-ideas-Inferences-science-9",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-044-sat-mock-20-44",
    "contextFamily": "sat-series-b-science-problem-response-limitation",
    "passageGenre": "science",
    "readingTopic": "the movement of sediment after vegetation is restored along a riverbank",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "qualified-support",
    "cognitiveOperation": "infer",
    "questionConstruction": "Inferences",
    "passageWordCount": 61,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "causal-overreach",
          "error_mechanism": "Infers a causal claim even though the passage establishes only an observed relationship.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "absolute-inference",
          "error_mechanism": "Turns a qualified inference into an unconditional statement.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "under-interpretation",
          "error_mechanism": "Repeats a surface observation without drawing the required supported inference.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "qualified-support",
      "cognitive_operation": "infer",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Draw only the conclusion that is warranted by the stated or strongly implied evidence. Evidence relationship: qualified-support.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Infers a causal claim even though the passage establishes only an observed relationship.",
        "B": "Turns a qualified inference into an unconditional statement.",
        "C": "Repeats a surface observation without drawing the required supported inference."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-045

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Boundaries
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of gardener noticing that a neglected courtyard has become a meeting place drew on 2073 examples from 10 settings over 10 observation periods. The revised method produced a clearer signal _____ it required additional calibration.

CHOICES:
[
  "; however,",
  "; therefore,",
  "; for example,",
  "; similarly,"
]

ANSWER: A

EXPLANATION:
The semicolon separates two independent clauses, while however correctly signals their contrast.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-045",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-045",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "standard-english-conventions",
  "skill": "Boundaries",
  "subskill": "Boundaries",
  "conceptId": "standard-english-conventions-boundaries",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-045",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-045-literature-observation-qualification",
  "conceptFingerprint": "standard-english-conventions-Boundaries-literature-10",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-literature"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-045-sat-mock-20-45",
    "contextFamily": "sat-series-b-literature-observation-qualification",
    "passageGenre": "literature",
    "readingTopic": "a gardener noticing that a neglected courtyard has become a meeting place",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "contrast",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Boundaries",
    "passageWordCount": 61,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "B": {
          "role": "distractor",
          "misconception": "comma-splice-or-fragment",
          "error_mechanism": "Treats two sentence boundaries as though one punctuation mark could incorrectly join or fragment them.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "independent-clause-confusion",
          "error_mechanism": "Fails to recognize the clause structure needed for the sentence boundary.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "misplaced-transition",
          "error_mechanism": "Selects punctuation/transition placement that does not correctly separate the surrounding clauses.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "A": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "literature",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "contrast",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the clause structure and then select punctuation that creates the required sentence boundary. Evidence relationship: contrast.",
      "correct_reasoning": "The semicolon separates two independent clauses, while however correctly signals their contrast.",
      "distractor_reasoning": {
        "B": "Treats two sentence boundaries as though one punctuation mark could incorrectly join or fragment them.",
        "C": "Fails to recognize the clause structure needed for the sentence boundary.",
        "D": "Selects punctuation/transition placement that does not correctly separate the surrounding clauses."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-046

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Cross-Text Connections
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
In examining farmers adapting cooperative practices when regional prices became less predictable, researchers focused on what changed rather than assuming that the change had a single explanation. Contemporary records show that the policy produced a visible change, although the effect varied across neighborhoods. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation.

Passage 2: In examining the effect of water temperature on the activity of a freshwater organism, researchers focused on what changed rather than assuming that the change had a single explanation. A follow-up measurement supports the broad interpretation while identifying a condition that limits how widely it can be applied. The result therefore supports a narrower claim than a simple comparison might initially suggest. The study compares multiple contemporary reports instead of relying on the most detailed account alone. The analysis of farmers adapting cooperative practices when regional prices became less predictable drew on 2074 examples from 3 settings over 5 observation periods.

Based on the two passages, which statement would both authors most likely agree with?

CHOICES:
[
  "Both authors argue that a result must be identical in every setting.",
  "Both authors support a qualified interpretation of a broad pattern.",
  "Both authors conclude that local conditions make comparison unnecessary.",
  "Both authors treat a single observation as sufficient for a universal rule."
]

ANSWER: B

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-046",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-046",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "craft-and-structure",
  "skill": "Cross-Text Connections",
  "subskill": "Cross-Text Connections",
  "conceptId": "craft-and-structure-cross-text-connections",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "synthesize",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-046",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-046-history-social-science-problem-response-limitation",
  "conceptFingerprint": "craft-and-structure-Cross-Text Connections-history-social-science-11",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-history-social-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-046-sat-mock-20-46",
    "contextFamily": "sat-series-b-history-social-science-problem-response-limitation",
    "passageGenre": "history-social-science",
    "readingTopic": "farmers adapting cooperative practices when regional prices became less predictable",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "inference",
    "cognitiveOperation": "synthesize",
    "questionConstruction": "Cross-Text Connections",
    "passageWordCount": 59,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "one-passage-only",
          "error_mechanism": "Answers from one passage while ignoring the relationship required across both texts.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "reversed-relationship",
          "error_mechanism": "Switches agreement, contrast, qualification, or another stated relationship.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "overgeneralized-agreement",
          "error_mechanism": "Attributes a stronger or broader agreement to both authors than the texts support.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "history-social-science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "inference",
      "cognitive_operation": "synthesize",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "passage_1_evidence"
        },
        {
          "locator": "stimulus.segment.2",
          "role": "passage_2_evidence"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.2",
          "role": "passage_2_evidence"
        }
      ],
      "required_inference": "Compare both passages before deciding how their claims or interpretations relate. Evidence relationship: inference.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Answers from one passage while ignoring the relationship required across both texts.",
        "C": "Switches agreement, contrast, qualification, or another stated relationship.",
        "D": "Attributes a stronger or broader agreement to both authors than the texts support."
      }
    },
    "qc_status": "failed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 3,
    "qc_failed_checks": [
      "2"
    ],
    "qc_reviewer_notes": "Independent Batch D review failed checks 2. Correct the flagged internal structure or route the item to human review; do not bypass the gate."
  }
}
```

### Question: sat-series-b-mock-20-rw-047

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Command of Evidence
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
An account of the restoration choices made when a damaged architectural feature has several plausible originals becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The evidence becomes more informative when the object is considered alongside the setting in which audiences encountered it. The result therefore supports a narrower claim than a simple comparison might initially suggest. Researchers evaluated the pattern across multiple objects before treating it as evidence of a general practice. The analysis of the restoration choices made when a damaged architectural feature has several plausible originals drew on 2075 examples from 4 settings over 7 observation periods.

Which finding would best support the interpretation presented in the text?

CHOICES:
[
  "The researchers collected observations from more than one location or setting.",
  "The researchers recorded both averages and individual observations.",
  "A follow-up observation reproduces the predicted pattern after the relevant condition is changed.",
  "The study followed earlier work on a related question."
]

ANSWER: C

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-047",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-047",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "information-and-ideas",
  "skill": "Command of Evidence",
  "subskill": "Command of Evidence",
  "conceptId": "information-and-ideas-command-of-evidence",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-047",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-047-humanities-observation-qualification",
  "conceptFingerprint": "information-and-ideas-Command of Evidence-humanities-12",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-humanities"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-047-sat-mock-20-47",
    "contextFamily": "sat-series-b-humanities-observation-qualification",
    "passageGenre": "humanities",
    "readingTopic": "the restoration choices made when a damaged architectural feature has several plausible originals",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "example-to-claim",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Command of Evidence",
    "passageWordCount": 64,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "true-but-nonresponsive",
          "error_mechanism": "Selects evidence that is accurate but does not directly support the stated interpretation.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "method-instead-of-evidence",
          "error_mechanism": "Confuses study procedure or context with evidence for the claim.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "background-instead-of-support",
          "error_mechanism": "Chooses surrounding information rather than evidence bearing on the target claim.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "humanities",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "example-to-claim",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Connect the selected evidence directly to the interpretation named in the question. Evidence relationship: example-to-claim.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Selects evidence that is accurate but does not directly support the stated interpretation.",
        "B": "Confuses study procedure or context with evidence for the claim.",
        "D": "Chooses surrounding information rather than evidence bearing on the target claim."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-048

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Form, Structure, and Sense
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of whether an imaging method detects canopy changes more consistently after calibration drew on 2076 examples from 5 settings over 9 observation periods. The set of measurements, rather than the individual readings, _____ the basis for comparison.

CHOICES:
[
  "support",
  "supporting",
  "have supported",
  "supports"
]

ANSWER: D

EXPLANATION:
The singular subject set takes the singular verb supports.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-048",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-048",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "standard-english-conventions",
  "skill": "Form, Structure, and Sense",
  "subskill": "Form, Structure, and Sense",
  "conceptId": "standard-english-conventions-form-structure-and-sense",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-048",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-048-science-problem-response-limitation",
  "conceptFingerprint": "standard-english-conventions-Form, Structure, and Sense-science-13",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-048-sat-mock-20-48",
    "contextFamily": "sat-series-b-science-problem-response-limitation",
    "passageGenre": "science",
    "readingTopic": "whether an imaging method detects canopy changes more consistently after calibration",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Form, Structure, and Sense",
    "passageWordCount": 64,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "subject-verb-agreement",
          "error_mechanism": "Selects a verb that agrees with a nearby noun rather than the actual subject.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "tense-or-person-mismatch",
          "error_mechanism": "Chooses a form inconsistent with the sentence’s established tense or grammatical person.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "modifier-or-structure-error",
          "error_mechanism": "Chooses a form that creates a grammatical or structural mismatch in the sentence.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "relationship-reversal",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Select the grammatical form that agrees with the sentence structure and preserves its meaning. Evidence relationship: relationship-reversal.",
      "correct_reasoning": "The singular subject set takes the singular verb supports.",
      "distractor_reasoning": {
        "A": "Selects a verb that agrees with a nearby noun rather than the actual subject.",
        "B": "Chooses a form inconsistent with the sentence’s established tense or grammatical person.",
        "C": "Chooses a form that creates a grammatical or structural mismatch in the sentence."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-049

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Rhetorical Synthesis
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
Study focus: the acoustic design of small performance spaces. Observation: the evidence shows a measurable difference between the two settings. Qualification: the size of the difference depends on conditions surrounding the observation. Goal: state the result accurately without making a broader claim than the evidence supports. The analysis of cartographer returning to a town altered by a new railway drew on 2077 examples from 6 settings over 4 observation periods. The comparison was reviewed again so that the result could be stated without dropping its important qualification.

The student wants to emphasize the study’s main result while preserving its important qualification. Which choice best accomplishes this goal?

CHOICES:
[
  "The comparison reveals a measurable effect, although its size depends on the conditions studied.",
  "The researchers collected observations and recorded them at several locations.",
  "The study examined a defined group during a specified period.",
  "The project used multiple observations but did not report a result."
]

ANSWER: A

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-049",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-049",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "expression-of-ideas",
  "skill": "Rhetorical Synthesis",
  "subskill": "Rhetorical Synthesis",
  "conceptId": "expression-of-ideas-rhetorical-synthesis",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "synthesize",
  "questionType": "multiple-choice",
  "stimulusType": "notes",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-049",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-049-literature-observation-qualification",
  "conceptFingerprint": "expression-of-ideas-Rhetorical Synthesis-literature-14",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-literature"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-049-sat-mock-20-49",
    "contextFamily": "sat-series-b-literature-observation-qualification",
    "passageGenre": "literature",
    "readingTopic": "a cartographer returning to a town altered by a new railway",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "synthesize",
    "questionConstruction": "Rhetorical Synthesis",
    "passageWordCount": null,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "B": {
          "role": "distractor",
          "misconception": "note-dump",
          "error_mechanism": "Includes a relevant note but does not fulfill the communication goal stated in the prompt.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "goal-mismatch",
          "error_mechanism": "Uses relevant information but emphasizes the wrong rhetorical priority.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "overclaim",
          "error_mechanism": "Combines the notes into a statement stronger than the supplied evidence.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "A": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "literature",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "direct-support",
      "cognitive_operation": "synthesize",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "goal_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "goal_or_qualification"
        }
      ],
      "required_inference": "Select notes that fulfill the stated communication goal without adding an unsupported claim. Evidence relationship: direct-support.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "B": "Includes a relevant note but does not fulfill the communication goal stated in the prompt.",
        "C": "Uses relevant information but emphasizes the wrong rhetorical priority.",
        "D": "Combines the notes into a statement stronger than the supplied evidence."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-050

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Words in Context
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of changes in how local newspapers described public libraries in the early twentieth century compared observations from different conditions instead of treating the first pattern as conclusive. Researchers distinguish the stated purpose of the initiative from the later uses residents found for it. The result therefore supports a narrower claim than a simple comparison might initially suggest. The analysis of changes in how local newspapers described public libraries in the early twentieth century drew on 2078 examples from 7 settings over 6 observation periods.

As used in the text, what does “qualify” most nearly mean?

CHOICES:
[
  "measure",
  "qualify",
  "decorate",
  "separate"
]

ANSWER: B

EXPLANATION:
In context, qualify means to limit or modify a statement so that it is not interpreted too broadly.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-050",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-050",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "craft-and-structure",
  "skill": "Words in Context",
  "subskill": "Words in Context",
  "conceptId": "craft-and-structure-words-in-context",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-050",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-050-history-social-science-problem-response-limitation",
  "conceptFingerprint": "craft-and-structure-Words in Context-history-social-science-15",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-history-social-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-050-sat-mock-20-50",
    "contextFamily": "sat-series-b-history-social-science-problem-response-limitation",
    "passageGenre": "history-social-science",
    "readingTopic": "changes in how local newspapers described public libraries in the early twentieth century",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "qualified-support",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Words in Context",
    "passageWordCount": 60,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "literal-near-synonym",
          "error_mechanism": "Selects a familiar dictionary sense that does not fit the word’s use in context.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "irrelevant-context",
          "error_mechanism": "Chooses a possible meaning associated with the topic rather than the sentence.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "reversed-meaning",
          "error_mechanism": "Interprets the word in a direction opposite to the relationship established by the text.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "history-social-science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "qualified-support",
      "cognitive_operation": "interpret",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Use the surrounding sentence relationship to select the sense that fits this specific context. Evidence relationship: qualified-support.",
      "correct_reasoning": "In context, qualify means to limit or modify a statement so that it is not interpreted too broadly.",
      "distractor_reasoning": {
        "A": "Selects a familiar dictionary sense that does not fit the word’s use in context.",
        "C": "Chooses a possible meaning associated with the topic rather than the sentence.",
        "D": "Interprets the word in a direction opposite to the relationship established by the text."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-051

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Central Ideas and Details
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
In examining the changing use of color in a regional school of landscape painting, researchers focused on what changed rather than assuming that the change had a single explanation. The researchers caution that a recurring feature does not by itself establish a single origin or intention. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. The comparison includes cases in which the feature is prominent and cases in which it is much less noticeable. The analysis of the changing use of color in a regional school of landscape painting drew on 2079 examples from 8 settings over 8 observation periods.

Which choice best states the main idea of the text?

CHOICES:
[
  "The the account proves that the observed result occurs in every comparable setting.",
  "The the account treats one observation as sufficient to establish a universal rule.",
  "The the account identifies a pattern while qualifying how broadly it should be interpreted.",
  "The the account focuses mainly on background details without reaching an interpretive conclusion."
]

ANSWER: C

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-051",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-051",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "information-and-ideas",
  "skill": "Central Ideas and Details",
  "subskill": "Central Ideas and Details",
  "conceptId": "information-and-ideas-central-ideas-and-details",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "recall",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-051",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-051-humanities-observation-qualification",
  "conceptFingerprint": "information-and-ideas-Central Ideas and Details-humanities-16",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-humanities"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-051-sat-mock-20-51",
    "contextFamily": "sat-series-b-humanities-observation-qualification",
    "passageGenre": "humanities",
    "readingTopic": "the changing use of color in a regional school of landscape painting",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "contrast",
    "cognitiveOperation": "identify",
    "questionConstruction": "Central Ideas and Details",
    "passageWordCount": 63,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "true-but-nonresponsive",
          "error_mechanism": "Chooses a true detail that does not state the text’s central idea.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "overly-broad-inference",
          "error_mechanism": "Extends the passage to a universal claim that the evidence does not support.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "too-narrow-detail",
          "error_mechanism": "Treats one local observation as the whole point of the passage.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "humanities",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "contrast",
      "cognitive_operation": "identify",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the passage-level claim that best integrates the major information rather than a single detail. Evidence relationship: contrast.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Chooses a true detail that does not state the text’s central idea.",
        "B": "Extends the passage to a universal claim that the evidence does not support.",
        "D": "Treats one local observation as the whole point of the passage."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-052

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Transitions
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of how migratory birds alter stopover timing when food availability changes drew on 2080 examples from 9 settings over 10 observation periods. The researchers observed a strong overall pattern. _____, the size of the effect differed among the study conditions.

CHOICES:
[
  "For example,",
  "Similarly,",
  "In addition,",
  "However,"
]

ANSWER: D

EXPLANATION:
However correctly signals the contrast between the broad pattern and the difference in effect size.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-052",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-052",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "expression-of-ideas",
  "skill": "Transitions",
  "subskill": "Transitions",
  "conceptId": "expression-of-ideas-transitions",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-052",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-052-science-problem-response-limitation",
  "conceptFingerprint": "expression-of-ideas-Transitions-science-0",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-052-sat-mock-20-52",
    "contextFamily": "sat-series-b-science-problem-response-limitation",
    "passageGenre": "science",
    "readingTopic": "how migratory birds alter stopover timing when food availability changes",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "inference",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Transitions",
    "passageWordCount": 59,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "non-structural-fit",
          "error_mechanism": "Chooses a transition that is grammatical but does not express the relationship between the sentences.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "example-for-contrast",
          "error_mechanism": "Treats a contrast as though the second sentence were merely an example.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "addition-for-contrast",
          "error_mechanism": "Signals addition when the sentence relationship requires a contrasting move.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "inference",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the logical relationship between the surrounding sentences before selecting the transition. Evidence relationship: inference.",
      "correct_reasoning": "However correctly signals the contrast between the broad pattern and the difference in effect size.",
      "distractor_reasoning": {
        "A": "Chooses a transition that is grammatical but does not express the relationship between the sentences.",
        "B": "Treats a contrast as though the second sentence were merely an example.",
        "C": "Signals addition when the sentence relationship requires a contrasting move."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-053

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Text Structure and Purpose
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
An account of a sculptor reconsidering a work after seeing it in a crowded exhibition becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The scene moves from a concrete detail to a reflection that reveals the character’s uncertainty rather than resolving it. The result therefore supports a narrower claim than a simple comparison might initially suggest. The scene contrasts a remembered version of the setting with the present one, prompting the character to reconsider the earlier impression. The analysis of sculptor reconsidering a work after seeing it in a crowded exhibition drew on 2081 examples from 10 settings over 5 observation periods.

Why does the author include the information about the conditions surrounding the result?

CHOICES:
[
  "To qualify a broader finding by identifying a condition that limits it.",
  "To replace the central finding with an unrelated explanation.",
  "To provide background that has no effect on the interpretation.",
  "To repeat the earlier observation without adding information."
]

ANSWER: A

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-053",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-053",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "craft-and-structure",
  "skill": "Text Structure and Purpose",
  "subskill": "Text Structure and Purpose",
  "conceptId": "craft-and-structure-text-structure-and-purpose",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-053",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-053-literature-observation-qualification",
  "conceptFingerprint": "craft-and-structure-Text Structure and Purpose-literature-1",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-literature"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-053-sat-mock-20-53",
    "contextFamily": "sat-series-b-literature-observation-qualification",
    "passageGenre": "literature",
    "readingTopic": "a sculptor reconsidering a work after seeing it in a crowded exhibition",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "example-to-claim",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Text Structure and Purpose",
    "passageWordCount": 64,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "B": {
          "role": "distractor",
          "misconception": "local-detail-as-purpose",
          "error_mechanism": "Treats the immediate detail as the author’s overall rhetorical purpose.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "overbroad-purpose",
          "error_mechanism": "Assigns a purpose broader than the passage evidence warrants.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "reversed-rhetorical-role",
          "error_mechanism": "Reverses the function of the information in the development of the passage.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "A": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "literature",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "example-to-claim",
      "cognitive_operation": "interpret",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Determine what rhetorical job the referenced information performs in the passage as a whole. Evidence relationship: example-to-claim.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "B": "Treats the immediate detail as the author’s overall rhetorical purpose.",
        "C": "Assigns a purpose broader than the passage evidence warrants.",
        "D": "Reverses the function of the information in the development of the passage."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-054

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Inferences
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
An account of a policy experiment designed to reduce congestion without restricting access to businesses becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The evidence suggests that the change was not caused by a single decision but developed through several local responses. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. A later group of records provides a check on whether the initial interpretation also fits developments that followed. The analysis of policy experiment designed to reduce congestion without restricting access to businesses drew on 2082 examples from 3 settings over 7 observation periods.

Which inference is best supported by the text?

CHOICES:
[
  "The observed relationship must remain identical regardless of surrounding conditions.",
  "The observed relationship may change when relevant surrounding conditions change.",
  "The evidence establishes a single cause with no need for further comparison.",
  "The observations show that the measured difference is too small to interpret."
]

ANSWER: B

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-054",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-054",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "information-and-ideas",
  "skill": "Inferences",
  "subskill": "Inferences",
  "conceptId": "information-and-ideas-inferences",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-054",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-054-history-social-science-problem-response-limitation",
  "conceptFingerprint": "information-and-ideas-Inferences-history-social-science-2",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-history-social-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-054-sat-mock-20-54",
    "contextFamily": "sat-series-b-history-social-science-problem-response-limitation",
    "passageGenre": "history-social-science",
    "readingTopic": "a policy experiment designed to reduce congestion without restricting access to businesses",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "infer",
    "questionConstruction": "Inferences",
    "passageWordCount": 67,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "causal-overreach",
          "error_mechanism": "Infers a causal claim even though the passage establishes only an observed relationship.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "absolute-inference",
          "error_mechanism": "Turns a qualified inference into an unconditional statement.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "under-interpretation",
          "error_mechanism": "Repeats a surface observation without drawing the required supported inference.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "history-social-science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "relationship-reversal",
      "cognitive_operation": "infer",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Draw only the conclusion that is warranted by the stated or strongly implied evidence. Evidence relationship: relationship-reversal.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Infers a causal claim even though the passage establishes only an observed relationship.",
        "C": "Turns a qualified inference into an unconditional statement.",
        "D": "Repeats a surface observation without drawing the required supported inference."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-055

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Boundaries
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of the acoustic design of small performance spaces drew on 2083 examples from 4 settings over 9 observation periods. The revised method produced a clearer signal _____ it required additional calibration.

CHOICES:
[
  "; therefore,",
  "; for example,",
  "; however,",
  "; similarly,"
]

ANSWER: C

EXPLANATION:
The semicolon separates two independent clauses, while however correctly signals their contrast.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-055",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-055",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "standard-english-conventions",
  "skill": "Boundaries",
  "subskill": "Boundaries",
  "conceptId": "standard-english-conventions-boundaries",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-055",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-055-humanities-observation-qualification",
  "conceptFingerprint": "standard-english-conventions-Boundaries-humanities-3",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-humanities"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-055-sat-mock-20-55",
    "contextFamily": "sat-series-b-humanities-observation-qualification",
    "passageGenre": "humanities",
    "readingTopic": "the acoustic design of small performance spaces",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Boundaries",
    "passageWordCount": 56,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "comma-splice-or-fragment",
          "error_mechanism": "Treats two sentence boundaries as though one punctuation mark could incorrectly join or fragment them.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "independent-clause-confusion",
          "error_mechanism": "Fails to recognize the clause structure needed for the sentence boundary.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "misplaced-transition",
          "error_mechanism": "Selects punctuation/transition placement that does not correctly separate the surrounding clauses.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "humanities",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "direct-support",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the clause structure and then select punctuation that creates the required sentence boundary. Evidence relationship: direct-support.",
      "correct_reasoning": "The semicolon separates two independent clauses, while however correctly signals their contrast.",
      "distractor_reasoning": {
        "A": "Treats two sentence boundaries as though one punctuation mark could incorrectly join or fragment them.",
        "B": "Fails to recognize the clause structure needed for the sentence boundary.",
        "D": "Selects punctuation/transition placement that does not correctly separate the surrounding clauses."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-056

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Cross-Text Connections
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of the movement of sediment after vegetation is restored along a riverbank compared observations from different conditions instead of treating the first pattern as conclusive. A follow-up measurement supports the broad interpretation while identifying a condition that limits how widely it can be applied. The result therefore supports a narrower claim than a simple comparison might initially suggest.

Passage 2: A recent study of a community debate over whether a new transit route should follow an older commercial corridor compared observations from different conditions instead of treating the first pattern as conclusive. The evidence suggests that the change was not caused by a single decision but developed through several local responses. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. The researchers compared results from two sampling periods rather than relying on a single measurement series. The analysis of the movement of sediment after vegetation is restored along a riverbank drew on 2084 examples from 5 settings over 4 observation periods.

Based on the two passages, which statement would both authors most likely agree with?

CHOICES:
[
  "Both authors argue that a result must be identical in every setting.",
  "Both authors conclude that local conditions make comparison unnecessary.",
  "Both authors treat a single observation as sufficient for a universal rule.",
  "Both authors support a qualified interpretation of a broad pattern."
]

ANSWER: D

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-056",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-056",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "craft-and-structure",
  "skill": "Cross-Text Connections",
  "subskill": "Cross-Text Connections",
  "conceptId": "craft-and-structure-cross-text-connections",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "synthesize",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-056",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-056-science-problem-response-limitation",
  "conceptFingerprint": "craft-and-structure-Cross-Text Connections-science-4",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-056-sat-mock-20-56",
    "contextFamily": "sat-series-b-science-problem-response-limitation",
    "passageGenre": "science",
    "readingTopic": "the movement of sediment after vegetation is restored along a riverbank",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "qualified-support",
    "cognitiveOperation": "synthesize",
    "questionConstruction": "Cross-Text Connections",
    "passageWordCount": 61,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "one-passage-only",
          "error_mechanism": "Answers from one passage while ignoring the relationship required across both texts.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "reversed-relationship",
          "error_mechanism": "Switches agreement, contrast, qualification, or another stated relationship.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "overgeneralized-agreement",
          "error_mechanism": "Attributes a stronger or broader agreement to both authors than the texts support.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "qualified-support",
      "cognitive_operation": "synthesize",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "passage_1_evidence"
        },
        {
          "locator": "stimulus.segment.2",
          "role": "passage_2_evidence"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.2",
          "role": "passage_2_evidence"
        }
      ],
      "required_inference": "Compare both passages before deciding how their claims or interpretations relate. Evidence relationship: qualified-support.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Answers from one passage while ignoring the relationship required across both texts.",
        "B": "Switches agreement, contrast, qualification, or another stated relationship.",
        "C": "Attributes a stronger or broader agreement to both authors than the texts support."
      }
    },
    "qc_status": "failed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 3,
    "qc_failed_checks": [
      "2"
    ],
    "qc_reviewer_notes": "Independent Batch D review failed checks 2. Correct the flagged internal structure or route the item to human review; do not bypass the gate."
  }
}
```

### Question: sat-series-b-mock-20-rw-057

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Command of Evidence
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
In examining a gardener noticing that a neglected courtyard has become a meeting place, researchers focused on what changed rather than assuming that the change had a single explanation. The character values continuity, yet the setting repeatedly introduces evidence that change has already occurred. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. Two descriptions of the same place do not fully agree, creating a reason to question the first impression. The analysis of gardener noticing that a neglected courtyard has become a meeting place drew on 2085 examples from 6 settings over 6 observation periods.

Which finding would best support the interpretation presented in the text?

CHOICES:
[
  "A follow-up observation reproduces the predicted pattern after the relevant condition is changed.",
  "The researchers collected observations from more than one location or setting.",
  "The researchers recorded both averages and individual observations.",
  "The study followed earlier work on a related question."
]

ANSWER: A

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-057",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-057",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "information-and-ideas",
  "skill": "Command of Evidence",
  "subskill": "Command of Evidence",
  "conceptId": "information-and-ideas-command-of-evidence",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-057",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-057-literature-observation-qualification",
  "conceptFingerprint": "information-and-ideas-Command of Evidence-literature-5",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-literature"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-057-sat-mock-20-57",
    "contextFamily": "sat-series-b-literature-observation-qualification",
    "passageGenre": "literature",
    "readingTopic": "a gardener noticing that a neglected courtyard has become a meeting place",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "contrast",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Command of Evidence",
    "passageWordCount": 61,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "B": {
          "role": "distractor",
          "misconception": "true-but-nonresponsive",
          "error_mechanism": "Selects evidence that is accurate but does not directly support the stated interpretation.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "method-instead-of-evidence",
          "error_mechanism": "Confuses study procedure or context with evidence for the claim.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "background-instead-of-support",
          "error_mechanism": "Chooses surrounding information rather than evidence bearing on the target claim.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "A": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "literature",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "contrast",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Connect the selected evidence directly to the interpretation named in the question. Evidence relationship: contrast.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "B": "Selects evidence that is accurate but does not directly support the stated interpretation.",
        "C": "Confuses study procedure or context with evidence for the claim.",
        "D": "Chooses surrounding information rather than evidence bearing on the target claim."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-058

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Form, Structure, and Sense
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of farmers adapting cooperative practices when regional prices became less predictable drew on 2086 examples from 7 settings over 8 observation periods. The set of measurements, rather than the individual readings, _____ the basis for comparison.

CHOICES:
[
  "support",
  "supports",
  "supporting",
  "have supported"
]

ANSWER: B

EXPLANATION:
The singular subject set takes the singular verb supports.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-058",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-058",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "standard-english-conventions",
  "skill": "Form, Structure, and Sense",
  "subskill": "Form, Structure, and Sense",
  "conceptId": "standard-english-conventions-form-structure-and-sense",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-058",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-058-history-social-science-problem-response-limitation",
  "conceptFingerprint": "standard-english-conventions-Form, Structure, and Sense-history-social-science-6",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-history-social-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-058-sat-mock-20-58",
    "contextFamily": "sat-series-b-history-social-science-problem-response-limitation",
    "passageGenre": "history-social-science",
    "readingTopic": "farmers adapting cooperative practices when regional prices became less predictable",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "inference",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Form, Structure, and Sense",
    "passageWordCount": 59,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "subject-verb-agreement",
          "error_mechanism": "Selects a verb that agrees with a nearby noun rather than the actual subject.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "tense-or-person-mismatch",
          "error_mechanism": "Chooses a form inconsistent with the sentence’s established tense or grammatical person.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "modifier-or-structure-error",
          "error_mechanism": "Chooses a form that creates a grammatical or structural mismatch in the sentence.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "history-social-science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "inference",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Select the grammatical form that agrees with the sentence structure and preserves its meaning. Evidence relationship: inference.",
      "correct_reasoning": "The singular subject set takes the singular verb supports.",
      "distractor_reasoning": {
        "A": "Selects a verb that agrees with a nearby noun rather than the actual subject.",
        "C": "Chooses a form inconsistent with the sentence’s established tense or grammatical person.",
        "D": "Chooses a form that creates a grammatical or structural mismatch in the sentence."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-059

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Rhetorical Synthesis
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
Study focus: the spread of neighborhood associations during a period of rapid population growth. Observation: the evidence shows a measurable difference between the two settings. Qualification: the size of the difference depends on conditions surrounding the observation. Goal: state the result accurately without making a broader claim than the evidence supports. The analysis of the restoration choices made when a damaged architectural feature has several plausible originals drew on 2087 examples from 8 settings over 10 observation periods. The comparison was reviewed again so that the result could be stated without dropping its important qualification.

The student wants to emphasize the study’s main result while preserving its important qualification. Which choice best accomplishes this goal?

CHOICES:
[
  "The researchers collected observations and recorded them at several locations.",
  "The study examined a defined group during a specified period.",
  "The comparison reveals a measurable effect, although its size depends on the conditions studied.",
  "The project used multiple observations but did not report a result."
]

ANSWER: C

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-059",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-059",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "expression-of-ideas",
  "skill": "Rhetorical Synthesis",
  "subskill": "Rhetorical Synthesis",
  "conceptId": "expression-of-ideas-rhetorical-synthesis",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "synthesize",
  "questionType": "multiple-choice",
  "stimulusType": "notes",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-059",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-059-humanities-observation-qualification",
  "conceptFingerprint": "expression-of-ideas-Rhetorical Synthesis-humanities-7",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-humanities"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-059-sat-mock-20-59",
    "contextFamily": "sat-series-b-humanities-observation-qualification",
    "passageGenre": "humanities",
    "readingTopic": "the restoration choices made when a damaged architectural feature has several plausible originals",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "example-to-claim",
    "cognitiveOperation": "synthesize",
    "questionConstruction": "Rhetorical Synthesis",
    "passageWordCount": null,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "note-dump",
          "error_mechanism": "Includes a relevant note but does not fulfill the communication goal stated in the prompt.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "goal-mismatch",
          "error_mechanism": "Uses relevant information but emphasizes the wrong rhetorical priority.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "overclaim",
          "error_mechanism": "Combines the notes into a statement stronger than the supplied evidence.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "humanities",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "example-to-claim",
      "cognitive_operation": "synthesize",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "goal_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "goal_or_qualification"
        }
      ],
      "required_inference": "Select notes that fulfill the stated communication goal without adding an unsupported claim. Evidence relationship: example-to-claim.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Includes a relevant note but does not fulfill the communication goal stated in the prompt.",
        "B": "Uses relevant information but emphasizes the wrong rhetorical priority.",
        "D": "Combines the notes into a statement stronger than the supplied evidence."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-060

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Words in Context
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
An account of whether an imaging method detects canopy changes more consistently after calibration becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The experiment separates an observed association from the stronger claim that one factor alone caused the outcome. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. The analysis of whether an imaging method detects canopy changes more consistently after calibration drew on 2088 examples from 9 settings over 5 observation periods.

As used in the text, what does “qualify” most nearly mean?

CHOICES:
[
  "measure",
  "decorate",
  "separate",
  "qualify"
]

ANSWER: D

EXPLANATION:
In context, qualify means to limit or modify a statement so that it is not interpreted too broadly.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-060",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-060",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "craft-and-structure",
  "skill": "Words in Context",
  "subskill": "Words in Context",
  "conceptId": "craft-and-structure-words-in-context",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-060",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-060-science-problem-response-limitation",
  "conceptFingerprint": "craft-and-structure-Words in Context-science-8",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-060-sat-mock-20-60",
    "contextFamily": "sat-series-b-science-problem-response-limitation",
    "passageGenre": "science",
    "readingTopic": "whether an imaging method detects canopy changes more consistently after calibration",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Words in Context",
    "passageWordCount": 64,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "literal-near-synonym",
          "error_mechanism": "Selects a familiar dictionary sense that does not fit the word’s use in context.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "irrelevant-context",
          "error_mechanism": "Chooses a possible meaning associated with the topic rather than the sentence.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "reversed-meaning",
          "error_mechanism": "Interprets the word in a direction opposite to the relationship established by the text.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "relationship-reversal",
      "cognitive_operation": "interpret",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Use the surrounding sentence relationship to select the sense that fits this specific context. Evidence relationship: relationship-reversal.",
      "correct_reasoning": "In context, qualify means to limit or modify a statement so that it is not interpreted too broadly.",
      "distractor_reasoning": {
        "A": "Selects a familiar dictionary sense that does not fit the word’s use in context.",
        "B": "Chooses a possible meaning associated with the topic rather than the sentence.",
        "C": "Interprets the word in a direction opposite to the relationship established by the text."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-061

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Central Ideas and Details
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of a cartographer returning to a town altered by a new railway compared observations from different conditions instead of treating the first pattern as conclusive. The narrator initially treats the change as an inconvenience, but a later observation makes the earlier judgment seem incomplete. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. A later moment changes how the character understands a detail that initially seemed ordinary. The analysis of cartographer returning to a town altered by a new railway drew on 2089 examples from 10 settings over 7 observation periods.

Which choice best states the main idea of the text?

CHOICES:
[
  "The the passage identifies a pattern while qualifying how broadly it should be interpreted.",
  "The the passage proves that the observed result occurs in every comparable setting.",
  "The the passage treats one observation as sufficient to establish a universal rule.",
  "The the passage focuses mainly on background details without reaching an interpretive conclusion."
]

ANSWER: A

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-061",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-061",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "information-and-ideas",
  "skill": "Central Ideas and Details",
  "subskill": "Central Ideas and Details",
  "conceptId": "information-and-ideas-central-ideas-and-details",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "recall",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-061",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-061-literature-observation-qualification",
  "conceptFingerprint": "information-and-ideas-Central Ideas and Details-literature-9",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-literature"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-061-sat-mock-20-61",
    "contextFamily": "sat-series-b-literature-observation-qualification",
    "passageGenre": "literature",
    "readingTopic": "a cartographer returning to a town altered by a new railway",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "identify",
    "questionConstruction": "Central Ideas and Details",
    "passageWordCount": 63,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "B": {
          "role": "distractor",
          "misconception": "true-but-nonresponsive",
          "error_mechanism": "Chooses a true detail that does not state the text’s central idea.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "overly-broad-inference",
          "error_mechanism": "Extends the passage to a universal claim that the evidence does not support.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "too-narrow-detail",
          "error_mechanism": "Treats one local observation as the whole point of the passage.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "A": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "literature",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "direct-support",
      "cognitive_operation": "identify",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the passage-level claim that best integrates the major information rather than a single detail. Evidence relationship: direct-support.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "B": "Chooses a true detail that does not state the text’s central idea.",
        "C": "Extends the passage to a universal claim that the evidence does not support.",
        "D": "Treats one local observation as the whole point of the passage."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-062

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Transitions
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of changes in how local newspapers described public libraries in the early twentieth century drew on 2090 examples from 3 settings over 9 observation periods. The researchers observed a strong overall pattern. _____, the size of the effect differed among the study conditions.

CHOICES:
[
  "For example,",
  "However,",
  "Similarly,",
  "In addition,"
]

ANSWER: B

EXPLANATION:
However correctly signals the contrast between the broad pattern and the difference in effect size.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-062",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-062",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "expression-of-ideas",
  "skill": "Transitions",
  "subskill": "Transitions",
  "conceptId": "expression-of-ideas-transitions",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-062",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-062-history-social-science-problem-response-limitation",
  "conceptFingerprint": "expression-of-ideas-Transitions-history-social-science-10",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-history-social-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-062-sat-mock-20-62",
    "contextFamily": "sat-series-b-history-social-science-problem-response-limitation",
    "passageGenre": "history-social-science",
    "readingTopic": "changes in how local newspapers described public libraries in the early twentieth century",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "qualified-support",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Transitions",
    "passageWordCount": 60,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "non-structural-fit",
          "error_mechanism": "Chooses a transition that is grammatical but does not express the relationship between the sentences.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "example-for-contrast",
          "error_mechanism": "Treats a contrast as though the second sentence were merely an example.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "addition-for-contrast",
          "error_mechanism": "Signals addition when the sentence relationship requires a contrasting move.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "history-social-science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "qualified-support",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the logical relationship between the surrounding sentences before selecting the transition. Evidence relationship: qualified-support.",
      "correct_reasoning": "However correctly signals the contrast between the broad pattern and the difference in effect size.",
      "distractor_reasoning": {
        "A": "Chooses a transition that is grammatical but does not express the relationship between the sentences.",
        "C": "Treats a contrast as though the second sentence were merely an example.",
        "D": "Signals addition when the sentence relationship requires a contrasting move."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-063

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Text Structure and Purpose
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
In examining the changing use of color in a regional school of landscape painting, researchers focused on what changed rather than assuming that the change had a single explanation. The researchers caution that a recurring feature does not by itself establish a single origin or intention. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. The comparison includes cases in which the feature is prominent and cases in which it is much less noticeable. The analysis of the changing use of color in a regional school of landscape painting drew on 2091 examples from 4 settings over 4 observation periods.

Why does the author include the information about the conditions surrounding the result?

CHOICES:
[
  "To replace the central finding with an unrelated explanation.",
  "To provide background that has no effect on the interpretation.",
  "To qualify a broader finding by identifying a condition that limits it.",
  "To repeat the earlier observation without adding information."
]

ANSWER: C

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-063",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-063",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "craft-and-structure",
  "skill": "Text Structure and Purpose",
  "subskill": "Text Structure and Purpose",
  "conceptId": "craft-and-structure-text-structure-and-purpose",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-063",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-063-humanities-observation-qualification",
  "conceptFingerprint": "craft-and-structure-Text Structure and Purpose-humanities-11",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-humanities"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-063-sat-mock-20-63",
    "contextFamily": "sat-series-b-humanities-observation-qualification",
    "passageGenre": "humanities",
    "readingTopic": "the changing use of color in a regional school of landscape painting",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "contrast",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Text Structure and Purpose",
    "passageWordCount": 63,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "local-detail-as-purpose",
          "error_mechanism": "Treats the immediate detail as the author’s overall rhetorical purpose.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "overbroad-purpose",
          "error_mechanism": "Assigns a purpose broader than the passage evidence warrants.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "reversed-rhetorical-role",
          "error_mechanism": "Reverses the function of the information in the development of the passage.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "humanities",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "contrast",
      "cognitive_operation": "interpret",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Determine what rhetorical job the referenced information performs in the passage as a whole. Evidence relationship: contrast.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Treats the immediate detail as the author’s overall rhetorical purpose.",
        "B": "Assigns a purpose broader than the passage evidence warrants.",
        "D": "Reverses the function of the information in the development of the passage."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-064

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Inferences
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
In examining how migratory birds alter stopover timing when food availability changes, researchers focused on what changed rather than assuming that the change had a single explanation. Measurements show a consistent overall pattern, but the magnitude of the effect changes under different conditions. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. The study included a comparison condition so that an observed change could be separated from ordinary variation in the measurements. The analysis of how migratory birds alter stopover timing when food availability changes drew on 2092 examples from 5 settings over 6 observation periods.

Which inference is best supported by the text?

CHOICES:
[
  "The observed relationship must remain identical regardless of surrounding conditions.",
  "The evidence establishes a single cause with no need for further comparison.",
  "The observations show that the measured difference is too small to interpret.",
  "The observed relationship may change when relevant surrounding conditions change."
]

ANSWER: D

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-064",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-064",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "information-and-ideas",
  "skill": "Inferences",
  "subskill": "Inferences",
  "conceptId": "information-and-ideas-inferences",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-064",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-064-science-problem-response-limitation",
  "conceptFingerprint": "information-and-ideas-Inferences-science-12",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-064-sat-mock-20-64",
    "contextFamily": "sat-series-b-science-problem-response-limitation",
    "passageGenre": "science",
    "readingTopic": "how migratory birds alter stopover timing when food availability changes",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "inference",
    "cognitiveOperation": "infer",
    "questionConstruction": "Inferences",
    "passageWordCount": 59,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "causal-overreach",
          "error_mechanism": "Infers a causal claim even though the passage establishes only an observed relationship.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "absolute-inference",
          "error_mechanism": "Turns a qualified inference into an unconditional statement.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "under-interpretation",
          "error_mechanism": "Repeats a surface observation without drawing the required supported inference.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "inference",
      "cognitive_operation": "infer",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Draw only the conclusion that is warranted by the stated or strongly implied evidence. Evidence relationship: inference.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Infers a causal claim even though the passage establishes only an observed relationship.",
        "B": "Turns a qualified inference into an unconditional statement.",
        "C": "Repeats a surface observation without drawing the required supported inference."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-065

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Boundaries
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of sculptor reconsidering a work after seeing it in a crowded exhibition drew on 2093 examples from 6 settings over 8 observation periods. The revised method produced a clearer signal _____ it required additional calibration.

CHOICES:
[
  "; however,",
  "; therefore,",
  "; for example,",
  "; similarly,"
]

ANSWER: A

EXPLANATION:
The semicolon separates two independent clauses, while however correctly signals their contrast.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-065",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-065",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "standard-english-conventions",
  "skill": "Boundaries",
  "subskill": "Boundaries",
  "conceptId": "standard-english-conventions-boundaries",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-065",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-065-literature-observation-qualification",
  "conceptFingerprint": "standard-english-conventions-Boundaries-literature-13",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-literature"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-065-sat-mock-20-65",
    "contextFamily": "sat-series-b-literature-observation-qualification",
    "passageGenre": "literature",
    "readingTopic": "a sculptor reconsidering a work after seeing it in a crowded exhibition",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "example-to-claim",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Boundaries",
    "passageWordCount": 64,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "B": {
          "role": "distractor",
          "misconception": "comma-splice-or-fragment",
          "error_mechanism": "Treats two sentence boundaries as though one punctuation mark could incorrectly join or fragment them.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "independent-clause-confusion",
          "error_mechanism": "Fails to recognize the clause structure needed for the sentence boundary.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "misplaced-transition",
          "error_mechanism": "Selects punctuation/transition placement that does not correctly separate the surrounding clauses.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "A": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "literature",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "example-to-claim",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the clause structure and then select punctuation that creates the required sentence boundary. Evidence relationship: example-to-claim.",
      "correct_reasoning": "The semicolon separates two independent clauses, while however correctly signals their contrast.",
      "distractor_reasoning": {
        "B": "Treats two sentence boundaries as though one punctuation mark could incorrectly join or fragment them.",
        "C": "Fails to recognize the clause structure needed for the sentence boundary.",
        "D": "Selects punctuation/transition placement that does not correctly separate the surrounding clauses."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-066

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Cross-Text Connections
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
An account of a policy experiment designed to reduce congestion without restricting access to businesses becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The evidence suggests that the change was not caused by a single decision but developed through several local responses. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition.

Passage 2: In examining how seedlings respond to intermittent rather than constant light, researchers focused on what changed rather than assuming that the change had a single explanation. Measurements show a consistent overall pattern, but the magnitude of the effect changes under different conditions. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. A later group of records provides a check on whether the initial interpretation also fits developments that followed. The analysis of policy experiment designed to reduce congestion without restricting access to businesses drew on 2094 examples from 7 settings over 10 observation periods.

Based on the two passages, which statement would both authors most likely agree with?

CHOICES:
[
  "Both authors argue that a result must be identical in every setting.",
  "Both authors support a qualified interpretation of a broad pattern.",
  "Both authors conclude that local conditions make comparison unnecessary.",
  "Both authors treat a single observation as sufficient for a universal rule."
]

ANSWER: B

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-066",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-066",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "craft-and-structure",
  "skill": "Cross-Text Connections",
  "subskill": "Cross-Text Connections",
  "conceptId": "craft-and-structure-cross-text-connections",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "synthesize",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-066",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-066-history-social-science-problem-response-limitation",
  "conceptFingerprint": "craft-and-structure-Cross-Text Connections-history-social-science-14",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-history-social-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-066-sat-mock-20-66",
    "contextFamily": "sat-series-b-history-social-science-problem-response-limitation",
    "passageGenre": "history-social-science",
    "readingTopic": "a policy experiment designed to reduce congestion without restricting access to businesses",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "synthesize",
    "questionConstruction": "Cross-Text Connections",
    "passageWordCount": 67,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "one-passage-only",
          "error_mechanism": "Answers from one passage while ignoring the relationship required across both texts.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "reversed-relationship",
          "error_mechanism": "Switches agreement, contrast, qualification, or another stated relationship.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "overgeneralized-agreement",
          "error_mechanism": "Attributes a stronger or broader agreement to both authors than the texts support.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "history-social-science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "relationship-reversal",
      "cognitive_operation": "synthesize",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "passage_1_evidence"
        },
        {
          "locator": "stimulus.segment.2",
          "role": "passage_2_evidence"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.2",
          "role": "passage_2_evidence"
        }
      ],
      "required_inference": "Compare both passages before deciding how their claims or interpretations relate. Evidence relationship: relationship-reversal.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Answers from one passage while ignoring the relationship required across both texts.",
        "C": "Switches agreement, contrast, qualification, or another stated relationship.",
        "D": "Attributes a stronger or broader agreement to both authors than the texts support."
      }
    },
    "qc_status": "failed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 3,
    "qc_failed_checks": [
      "2"
    ],
    "qc_reviewer_notes": "Independent Batch D review failed checks 2. Correct the flagged internal structure or route the item to human review; do not bypass the gate."
  }
}
```

### Question: sat-series-b-mock-20-rw-067

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Command of Evidence
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of the acoustic design of small performance spaces compared observations from different conditions instead of treating the first pattern as conclusive. The comparison indicates that a feature often described as decorative also served a practical communicative purpose. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. Earlier and later examples were compared to determine whether the observed characteristic changed with context. The analysis of the acoustic design of small performance spaces drew on 2095 examples from 8 settings over 5 observation periods.

Which finding would best support the interpretation presented in the text?

CHOICES:
[
  "The researchers collected observations from more than one location or setting.",
  "The researchers recorded both averages and individual observations.",
  "A follow-up observation reproduces the predicted pattern after the relevant condition is changed.",
  "The study followed earlier work on a related question."
]

ANSWER: C

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-067",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-067",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "information-and-ideas",
  "skill": "Command of Evidence",
  "subskill": "Command of Evidence",
  "conceptId": "information-and-ideas-command-of-evidence",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-067",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-067-humanities-observation-qualification",
  "conceptFingerprint": "information-and-ideas-Command of Evidence-humanities-15",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-humanities"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-067-sat-mock-20-67",
    "contextFamily": "sat-series-b-humanities-observation-qualification",
    "passageGenre": "humanities",
    "readingTopic": "the acoustic design of small performance spaces",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Command of Evidence",
    "passageWordCount": 56,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "true-but-nonresponsive",
          "error_mechanism": "Selects evidence that is accurate but does not directly support the stated interpretation.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "method-instead-of-evidence",
          "error_mechanism": "Confuses study procedure or context with evidence for the claim.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "background-instead-of-support",
          "error_mechanism": "Chooses surrounding information rather than evidence bearing on the target claim.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "humanities",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "direct-support",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Connect the selected evidence directly to the interpretation named in the question. Evidence relationship: direct-support.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Selects evidence that is accurate but does not directly support the stated interpretation.",
        "B": "Confuses study procedure or context with evidence for the claim.",
        "D": "Chooses surrounding information rather than evidence bearing on the target claim."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-068

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Form, Structure, and Sense
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of the movement of sediment after vegetation is restored along a riverbank drew on 2096 examples from 9 settings over 7 observation periods. The set of measurements, rather than the individual readings, _____ the basis for comparison.

CHOICES:
[
  "support",
  "supporting",
  "have supported",
  "supports"
]

ANSWER: D

EXPLANATION:
The singular subject set takes the singular verb supports.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-068",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-068",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "standard-english-conventions",
  "skill": "Form, Structure, and Sense",
  "subskill": "Form, Structure, and Sense",
  "conceptId": "standard-english-conventions-form-structure-and-sense",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-068",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-068-science-problem-response-limitation",
  "conceptFingerprint": "standard-english-conventions-Form, Structure, and Sense-science-16",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-068-sat-mock-20-68",
    "contextFamily": "sat-series-b-science-problem-response-limitation",
    "passageGenre": "science",
    "readingTopic": "the movement of sediment after vegetation is restored along a riverbank",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "qualified-support",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Form, Structure, and Sense",
    "passageWordCount": 61,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "subject-verb-agreement",
          "error_mechanism": "Selects a verb that agrees with a nearby noun rather than the actual subject.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "tense-or-person-mismatch",
          "error_mechanism": "Chooses a form inconsistent with the sentence’s established tense or grammatical person.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "modifier-or-structure-error",
          "error_mechanism": "Chooses a form that creates a grammatical or structural mismatch in the sentence.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "qualified-support",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Select the grammatical form that agrees with the sentence structure and preserves its meaning. Evidence relationship: qualified-support.",
      "correct_reasoning": "The singular subject set takes the singular verb supports.",
      "distractor_reasoning": {
        "A": "Selects a verb that agrees with a nearby noun rather than the actual subject.",
        "B": "Chooses a form inconsistent with the sentence’s established tense or grammatical person.",
        "C": "Chooses a form that creates a grammatical or structural mismatch in the sentence."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-069

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Rhetorical Synthesis
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
Study focus: a community debate over whether a new transit route should follow an older commercial corridor. Observation: the evidence shows a measurable difference between the two settings. Qualification: the size of the difference depends on conditions surrounding the observation. Goal: state the result accurately without making a broader claim than the evidence supports. The analysis of gardener noticing that a neglected courtyard has become a meeting place drew on 2097 examples from 10 settings over 9 observation periods. The comparison was reviewed again so that the result could be stated without dropping its important qualification.

The student wants to emphasize the study’s main result while preserving its important qualification. Which choice best accomplishes this goal?

CHOICES:
[
  "The comparison reveals a measurable effect, although its size depends on the conditions studied.",
  "The researchers collected observations and recorded them at several locations.",
  "The study examined a defined group during a specified period.",
  "The project used multiple observations but did not report a result."
]

ANSWER: A

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-069",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-069",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "expression-of-ideas",
  "skill": "Rhetorical Synthesis",
  "subskill": "Rhetorical Synthesis",
  "conceptId": "expression-of-ideas-rhetorical-synthesis",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "synthesize",
  "questionType": "multiple-choice",
  "stimulusType": "notes",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-069",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-069-literature-observation-qualification",
  "conceptFingerprint": "expression-of-ideas-Rhetorical Synthesis-literature-0",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-literature"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-069-sat-mock-20-69",
    "contextFamily": "sat-series-b-literature-observation-qualification",
    "passageGenre": "literature",
    "readingTopic": "a gardener noticing that a neglected courtyard has become a meeting place",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "contrast",
    "cognitiveOperation": "synthesize",
    "questionConstruction": "Rhetorical Synthesis",
    "passageWordCount": null,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "B": {
          "role": "distractor",
          "misconception": "note-dump",
          "error_mechanism": "Includes a relevant note but does not fulfill the communication goal stated in the prompt.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "goal-mismatch",
          "error_mechanism": "Uses relevant information but emphasizes the wrong rhetorical priority.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "overclaim",
          "error_mechanism": "Combines the notes into a statement stronger than the supplied evidence.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "A": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "literature",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "contrast",
      "cognitive_operation": "synthesize",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "goal_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "goal_or_qualification"
        }
      ],
      "required_inference": "Select notes that fulfill the stated communication goal without adding an unsupported claim. Evidence relationship: contrast.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "B": "Includes a relevant note but does not fulfill the communication goal stated in the prompt.",
        "C": "Uses relevant information but emphasizes the wrong rhetorical priority.",
        "D": "Combines the notes into a statement stronger than the supplied evidence."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-070

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Words in Context
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
In examining farmers adapting cooperative practices when regional prices became less predictable, researchers focused on what changed rather than assuming that the change had a single explanation. Contemporary records show that the policy produced a visible change, although the effect varied across neighborhoods. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. The analysis of farmers adapting cooperative practices when regional prices became less predictable drew on 2098 examples from 3 settings over 4 observation periods.

As used in the text, what does “qualify” most nearly mean?

CHOICES:
[
  "measure",
  "qualify",
  "decorate",
  "separate"
]

ANSWER: B

EXPLANATION:
In context, qualify means to limit or modify a statement so that it is not interpreted too broadly.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-070",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-070",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "craft-and-structure",
  "skill": "Words in Context",
  "subskill": "Words in Context",
  "conceptId": "craft-and-structure-words-in-context",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-070",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-070-history-social-science-problem-response-limitation",
  "conceptFingerprint": "craft-and-structure-Words in Context-history-social-science-1",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-history-social-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-070-sat-mock-20-70",
    "contextFamily": "sat-series-b-history-social-science-problem-response-limitation",
    "passageGenre": "history-social-science",
    "readingTopic": "farmers adapting cooperative practices when regional prices became less predictable",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "inference",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Words in Context",
    "passageWordCount": 59,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "literal-near-synonym",
          "error_mechanism": "Selects a familiar dictionary sense that does not fit the word’s use in context.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "irrelevant-context",
          "error_mechanism": "Chooses a possible meaning associated with the topic rather than the sentence.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "reversed-meaning",
          "error_mechanism": "Interprets the word in a direction opposite to the relationship established by the text.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "history-social-science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "inference",
      "cognitive_operation": "interpret",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Use the surrounding sentence relationship to select the sense that fits this specific context. Evidence relationship: inference.",
      "correct_reasoning": "In context, qualify means to limit or modify a statement so that it is not interpreted too broadly.",
      "distractor_reasoning": {
        "A": "Selects a familiar dictionary sense that does not fit the word’s use in context.",
        "C": "Chooses a possible meaning associated with the topic rather than the sentence.",
        "D": "Interprets the word in a direction opposite to the relationship established by the text."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-071

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Central Ideas and Details
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
An account of the restoration choices made when a damaged architectural feature has several plausible originals becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The evidence becomes more informative when the object is considered alongside the setting in which audiences encountered it. The result therefore supports a narrower claim than a simple comparison might initially suggest. Researchers evaluated the pattern across multiple objects before treating it as evidence of a general practice. The analysis of the restoration choices made when a damaged architectural feature has several plausible originals drew on 2099 examples from 4 settings over 6 observation periods.

Which choice best states the main idea of the text?

CHOICES:
[
  "The the account proves that the observed result occurs in every comparable setting.",
  "The the account treats one observation as sufficient to establish a universal rule.",
  "The the account identifies a pattern while qualifying how broadly it should be interpreted.",
  "The the account focuses mainly on background details without reaching an interpretive conclusion."
]

ANSWER: C

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-071",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-071",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "information-and-ideas",
  "skill": "Central Ideas and Details",
  "subskill": "Central Ideas and Details",
  "conceptId": "information-and-ideas-central-ideas-and-details",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "recall",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-071",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-071-humanities-observation-qualification",
  "conceptFingerprint": "information-and-ideas-Central Ideas and Details-humanities-2",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-humanities"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-071-sat-mock-20-71",
    "contextFamily": "sat-series-b-humanities-observation-qualification",
    "passageGenre": "humanities",
    "readingTopic": "the restoration choices made when a damaged architectural feature has several plausible originals",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "example-to-claim",
    "cognitiveOperation": "identify",
    "questionConstruction": "Central Ideas and Details",
    "passageWordCount": 64,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "true-but-nonresponsive",
          "error_mechanism": "Chooses a true detail that does not state the text’s central idea.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "overly-broad-inference",
          "error_mechanism": "Extends the passage to a universal claim that the evidence does not support.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "too-narrow-detail",
          "error_mechanism": "Treats one local observation as the whole point of the passage.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "humanities",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "example-to-claim",
      "cognitive_operation": "identify",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the passage-level claim that best integrates the major information rather than a single detail. Evidence relationship: example-to-claim.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Chooses a true detail that does not state the text’s central idea.",
        "B": "Extends the passage to a universal claim that the evidence does not support.",
        "D": "Treats one local observation as the whole point of the passage."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-072

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Transitions
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of whether an imaging method detects canopy changes more consistently after calibration drew on 2100 examples from 5 settings over 8 observation periods. The researchers observed a strong overall pattern. _____, the size of the effect differed among the study conditions.

CHOICES:
[
  "For example,",
  "Similarly,",
  "In addition,",
  "However,"
]

ANSWER: D

EXPLANATION:
However correctly signals the contrast between the broad pattern and the difference in effect size.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-072",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-072",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "expression-of-ideas",
  "skill": "Transitions",
  "subskill": "Transitions",
  "conceptId": "expression-of-ideas-transitions",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-072",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-072-science-problem-response-limitation",
  "conceptFingerprint": "expression-of-ideas-Transitions-science-3",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-072-sat-mock-20-72",
    "contextFamily": "sat-series-b-science-problem-response-limitation",
    "passageGenre": "science",
    "readingTopic": "whether an imaging method detects canopy changes more consistently after calibration",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Transitions",
    "passageWordCount": 64,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "non-structural-fit",
          "error_mechanism": "Chooses a transition that is grammatical but does not express the relationship between the sentences.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "example-for-contrast",
          "error_mechanism": "Treats a contrast as though the second sentence were merely an example.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "addition-for-contrast",
          "error_mechanism": "Signals addition when the sentence relationship requires a contrasting move.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "relationship-reversal",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the logical relationship between the surrounding sentences before selecting the transition. Evidence relationship: relationship-reversal.",
      "correct_reasoning": "However correctly signals the contrast between the broad pattern and the difference in effect size.",
      "distractor_reasoning": {
        "A": "Chooses a transition that is grammatical but does not express the relationship between the sentences.",
        "B": "Treats a contrast as though the second sentence were merely an example.",
        "C": "Signals addition when the sentence relationship requires a contrasting move."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-073

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Text Structure and Purpose
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of a cartographer returning to a town altered by a new railway compared observations from different conditions instead of treating the first pattern as conclusive. The narrator initially treats the change as an inconvenience, but a later observation makes the earlier judgment seem incomplete. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. A later moment changes how the character understands a detail that initially seemed ordinary. The analysis of cartographer returning to a town altered by a new railway drew on 2101 examples from 6 settings over 10 observation periods.

Why does the author include the information about the conditions surrounding the result?

CHOICES:
[
  "To qualify a broader finding by identifying a condition that limits it.",
  "To replace the central finding with an unrelated explanation.",
  "To provide background that has no effect on the interpretation.",
  "To repeat the earlier observation without adding information."
]

ANSWER: A

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-073",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-073",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "craft-and-structure",
  "skill": "Text Structure and Purpose",
  "subskill": "Text Structure and Purpose",
  "conceptId": "craft-and-structure-text-structure-and-purpose",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-073",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-073-literature-observation-qualification",
  "conceptFingerprint": "craft-and-structure-Text Structure and Purpose-literature-4",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-literature"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-073-sat-mock-20-73",
    "contextFamily": "sat-series-b-literature-observation-qualification",
    "passageGenre": "literature",
    "readingTopic": "a cartographer returning to a town altered by a new railway",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Text Structure and Purpose",
    "passageWordCount": 63,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "B": {
          "role": "distractor",
          "misconception": "local-detail-as-purpose",
          "error_mechanism": "Treats the immediate detail as the author’s overall rhetorical purpose.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "overbroad-purpose",
          "error_mechanism": "Assigns a purpose broader than the passage evidence warrants.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "reversed-rhetorical-role",
          "error_mechanism": "Reverses the function of the information in the development of the passage.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "A": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "literature",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "direct-support",
      "cognitive_operation": "interpret",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Determine what rhetorical job the referenced information performs in the passage as a whole. Evidence relationship: direct-support.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "B": "Treats the immediate detail as the author’s overall rhetorical purpose.",
        "C": "Assigns a purpose broader than the passage evidence warrants.",
        "D": "Reverses the function of the information in the development of the passage."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-074

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Inferences
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of changes in how local newspapers described public libraries in the early twentieth century compared observations from different conditions instead of treating the first pattern as conclusive. Researchers distinguish the stated purpose of the initiative from the later uses residents found for it. The result therefore supports a narrower claim than a simple comparison might initially suggest. The historical account distinguishes the initial policy decision from later ways in which residents adapted to it. The analysis of changes in how local newspapers described public libraries in the early twentieth century drew on 2102 examples from 7 settings over 5 observation periods.

Which inference is best supported by the text?

CHOICES:
[
  "The observed relationship must remain identical regardless of surrounding conditions.",
  "The observed relationship may change when relevant surrounding conditions change.",
  "The evidence establishes a single cause with no need for further comparison.",
  "The observations show that the measured difference is too small to interpret."
]

ANSWER: B

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-074",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-074",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "information-and-ideas",
  "skill": "Inferences",
  "subskill": "Inferences",
  "conceptId": "information-and-ideas-inferences",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-074",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-074-history-social-science-problem-response-limitation",
  "conceptFingerprint": "information-and-ideas-Inferences-history-social-science-5",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-history-social-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-074-sat-mock-20-74",
    "contextFamily": "sat-series-b-history-social-science-problem-response-limitation",
    "passageGenre": "history-social-science",
    "readingTopic": "changes in how local newspapers described public libraries in the early twentieth century",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "qualified-support",
    "cognitiveOperation": "infer",
    "questionConstruction": "Inferences",
    "passageWordCount": 60,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "causal-overreach",
          "error_mechanism": "Infers a causal claim even though the passage establishes only an observed relationship.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "absolute-inference",
          "error_mechanism": "Turns a qualified inference into an unconditional statement.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "under-interpretation",
          "error_mechanism": "Repeats a surface observation without drawing the required supported inference.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "history-social-science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "qualified-support",
      "cognitive_operation": "infer",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Draw only the conclusion that is warranted by the stated or strongly implied evidence. Evidence relationship: qualified-support.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Infers a causal claim even though the passage establishes only an observed relationship.",
        "C": "Turns a qualified inference into an unconditional statement.",
        "D": "Repeats a surface observation without drawing the required supported inference."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-075

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Boundaries
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of the changing use of color in a regional school of landscape painting drew on 2103 examples from 8 settings over 7 observation periods. The revised method produced a clearer signal _____ it required additional calibration.

CHOICES:
[
  "; therefore,",
  "; for example,",
  "; however,",
  "; similarly,"
]

ANSWER: C

EXPLANATION:
The semicolon separates two independent clauses, while however correctly signals their contrast.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-075",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-075",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "standard-english-conventions",
  "skill": "Boundaries",
  "subskill": "Boundaries",
  "conceptId": "standard-english-conventions-boundaries",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-075",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-075-humanities-observation-qualification",
  "conceptFingerprint": "standard-english-conventions-Boundaries-humanities-6",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-humanities"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-075-sat-mock-20-75",
    "contextFamily": "sat-series-b-humanities-observation-qualification",
    "passageGenre": "humanities",
    "readingTopic": "the changing use of color in a regional school of landscape painting",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "contrast",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Boundaries",
    "passageWordCount": 63,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "comma-splice-or-fragment",
          "error_mechanism": "Treats two sentence boundaries as though one punctuation mark could incorrectly join or fragment them.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "independent-clause-confusion",
          "error_mechanism": "Fails to recognize the clause structure needed for the sentence boundary.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "misplaced-transition",
          "error_mechanism": "Selects punctuation/transition placement that does not correctly separate the surrounding clauses.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "humanities",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "contrast",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the clause structure and then select punctuation that creates the required sentence boundary. Evidence relationship: contrast.",
      "correct_reasoning": "The semicolon separates two independent clauses, while however correctly signals their contrast.",
      "distractor_reasoning": {
        "A": "Treats two sentence boundaries as though one punctuation mark could incorrectly join or fragment them.",
        "B": "Fails to recognize the clause structure needed for the sentence boundary.",
        "D": "Selects punctuation/transition placement that does not correctly separate the surrounding clauses."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-076

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Cross-Text Connections
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
In examining how migratory birds alter stopover timing when food availability changes, researchers focused on what changed rather than assuming that the change had a single explanation. Measurements show a consistent overall pattern, but the magnitude of the effect changes under different conditions. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation.

Passage 2: In examining the spread of neighborhood associations during a period of rapid population growth, researchers focused on what changed rather than assuming that the change had a single explanation. Researchers distinguish the stated purpose of the initiative from the later uses residents found for it. The result therefore supports a narrower claim than a simple comparison might initially suggest. The study included a comparison condition so that an observed change could be separated from ordinary variation in the measurements. The analysis of how migratory birds alter stopover timing when food availability changes drew on 2104 examples from 9 settings over 9 observation periods.

Based on the two passages, which statement would both authors most likely agree with?

CHOICES:
[
  "Both authors argue that a result must be identical in every setting.",
  "Both authors conclude that local conditions make comparison unnecessary.",
  "Both authors treat a single observation as sufficient for a universal rule.",
  "Both authors support a qualified interpretation of a broad pattern."
]

ANSWER: D

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-076",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-076",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "craft-and-structure",
  "skill": "Cross-Text Connections",
  "subskill": "Cross-Text Connections",
  "conceptId": "craft-and-structure-cross-text-connections",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "synthesize",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-076",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-076-science-problem-response-limitation",
  "conceptFingerprint": "craft-and-structure-Cross-Text Connections-science-7",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-076-sat-mock-20-76",
    "contextFamily": "sat-series-b-science-problem-response-limitation",
    "passageGenre": "science",
    "readingTopic": "how migratory birds alter stopover timing when food availability changes",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "inference",
    "cognitiveOperation": "synthesize",
    "questionConstruction": "Cross-Text Connections",
    "passageWordCount": 59,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "one-passage-only",
          "error_mechanism": "Answers from one passage while ignoring the relationship required across both texts.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "reversed-relationship",
          "error_mechanism": "Switches agreement, contrast, qualification, or another stated relationship.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "overgeneralized-agreement",
          "error_mechanism": "Attributes a stronger or broader agreement to both authors than the texts support.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "inference",
      "cognitive_operation": "synthesize",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "passage_1_evidence"
        },
        {
          "locator": "stimulus.segment.2",
          "role": "passage_2_evidence"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.2",
          "role": "passage_2_evidence"
        }
      ],
      "required_inference": "Compare both passages before deciding how their claims or interpretations relate. Evidence relationship: inference.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Answers from one passage while ignoring the relationship required across both texts.",
        "B": "Switches agreement, contrast, qualification, or another stated relationship.",
        "C": "Attributes a stronger or broader agreement to both authors than the texts support."
      }
    },
    "qc_status": "failed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 3,
    "qc_failed_checks": [
      "2"
    ],
    "qc_reviewer_notes": "Independent Batch D review failed checks 2. Correct the flagged internal structure or route the item to human review; do not bypass the gate."
  }
}
```

### Question: sat-series-b-mock-20-rw-077

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Command of Evidence
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
An account of a sculptor reconsidering a work after seeing it in a crowded exhibition becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The scene moves from a concrete detail to a reflection that reveals the character’s uncertainty rather than resolving it. The result therefore supports a narrower claim than a simple comparison might initially suggest. The scene contrasts a remembered version of the setting with the present one, prompting the character to reconsider the earlier impression. The analysis of sculptor reconsidering a work after seeing it in a crowded exhibition drew on 2105 examples from 10 settings over 4 observation periods.

Which finding would best support the interpretation presented in the text?

CHOICES:
[
  "A follow-up observation reproduces the predicted pattern after the relevant condition is changed.",
  "The researchers collected observations from more than one location or setting.",
  "The researchers recorded both averages and individual observations.",
  "The study followed earlier work on a related question."
]

ANSWER: A

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-077",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-077",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "information-and-ideas",
  "skill": "Command of Evidence",
  "subskill": "Command of Evidence",
  "conceptId": "information-and-ideas-command-of-evidence",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-077",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-077-literature-observation-qualification",
  "conceptFingerprint": "information-and-ideas-Command of Evidence-literature-8",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-literature"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-077-sat-mock-20-77",
    "contextFamily": "sat-series-b-literature-observation-qualification",
    "passageGenre": "literature",
    "readingTopic": "a sculptor reconsidering a work after seeing it in a crowded exhibition",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "example-to-claim",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Command of Evidence",
    "passageWordCount": 64,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "B": {
          "role": "distractor",
          "misconception": "true-but-nonresponsive",
          "error_mechanism": "Selects evidence that is accurate but does not directly support the stated interpretation.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "method-instead-of-evidence",
          "error_mechanism": "Confuses study procedure or context with evidence for the claim.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "background-instead-of-support",
          "error_mechanism": "Chooses surrounding information rather than evidence bearing on the target claim.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "A": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "literature",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "example-to-claim",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Connect the selected evidence directly to the interpretation named in the question. Evidence relationship: example-to-claim.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "B": "Selects evidence that is accurate but does not directly support the stated interpretation.",
        "C": "Confuses study procedure or context with evidence for the claim.",
        "D": "Chooses surrounding information rather than evidence bearing on the target claim."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-078

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Form, Structure, and Sense
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of policy experiment designed to reduce congestion without restricting access to businesses drew on 2106 examples from 3 settings over 6 observation periods. The set of measurements, rather than the individual readings, _____ the basis for comparison.

CHOICES:
[
  "support",
  "supports",
  "supporting",
  "have supported"
]

ANSWER: B

EXPLANATION:
The singular subject set takes the singular verb supports.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-078",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-078",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "standard-english-conventions",
  "skill": "Form, Structure, and Sense",
  "subskill": "Form, Structure, and Sense",
  "conceptId": "standard-english-conventions-form-structure-and-sense",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-078",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-078-history-social-science-problem-response-limitation",
  "conceptFingerprint": "standard-english-conventions-Form, Structure, and Sense-history-social-science-9",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-history-social-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-078-sat-mock-20-78",
    "contextFamily": "sat-series-b-history-social-science-problem-response-limitation",
    "passageGenre": "history-social-science",
    "readingTopic": "a policy experiment designed to reduce congestion without restricting access to businesses",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Form, Structure, and Sense",
    "passageWordCount": 67,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "subject-verb-agreement",
          "error_mechanism": "Selects a verb that agrees with a nearby noun rather than the actual subject.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "tense-or-person-mismatch",
          "error_mechanism": "Chooses a form inconsistent with the sentence’s established tense or grammatical person.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "modifier-or-structure-error",
          "error_mechanism": "Chooses a form that creates a grammatical or structural mismatch in the sentence.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "history-social-science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "relationship-reversal",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Select the grammatical form that agrees with the sentence structure and preserves its meaning. Evidence relationship: relationship-reversal.",
      "correct_reasoning": "The singular subject set takes the singular verb supports.",
      "distractor_reasoning": {
        "A": "Selects a verb that agrees with a nearby noun rather than the actual subject.",
        "C": "Chooses a form inconsistent with the sentence’s established tense or grammatical person.",
        "D": "Chooses a form that creates a grammatical or structural mismatch in the sentence."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-079

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Rhetorical Synthesis
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
Study focus: municipal efforts to coordinate street markets as cities expanded. Observation: the evidence shows a measurable difference between the two settings. Qualification: the size of the difference depends on conditions surrounding the observation. Goal: state the result accurately without making a broader claim than the evidence supports. The analysis of the acoustic design of small performance spaces drew on 2107 examples from 4 settings over 8 observation periods. The comparison was reviewed again so that the result could be stated without dropping its important qualification.

The student wants to emphasize the study’s main result while preserving its important qualification. Which choice best accomplishes this goal?

CHOICES:
[
  "The researchers collected observations and recorded them at several locations.",
  "The study examined a defined group during a specified period.",
  "The comparison reveals a measurable effect, although its size depends on the conditions studied.",
  "The project used multiple observations but did not report a result."
]

ANSWER: C

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-079",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-079",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "expression-of-ideas",
  "skill": "Rhetorical Synthesis",
  "subskill": "Rhetorical Synthesis",
  "conceptId": "expression-of-ideas-rhetorical-synthesis",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "synthesize",
  "questionType": "multiple-choice",
  "stimulusType": "notes",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-079",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-079-humanities-observation-qualification",
  "conceptFingerprint": "expression-of-ideas-Rhetorical Synthesis-humanities-10",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-humanities"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-079-sat-mock-20-79",
    "contextFamily": "sat-series-b-humanities-observation-qualification",
    "passageGenre": "humanities",
    "readingTopic": "the acoustic design of small performance spaces",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "synthesize",
    "questionConstruction": "Rhetorical Synthesis",
    "passageWordCount": null,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "note-dump",
          "error_mechanism": "Includes a relevant note but does not fulfill the communication goal stated in the prompt.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "goal-mismatch",
          "error_mechanism": "Uses relevant information but emphasizes the wrong rhetorical priority.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "overclaim",
          "error_mechanism": "Combines the notes into a statement stronger than the supplied evidence.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "humanities",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "direct-support",
      "cognitive_operation": "synthesize",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "goal_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "goal_or_qualification"
        }
      ],
      "required_inference": "Select notes that fulfill the stated communication goal without adding an unsupported claim. Evidence relationship: direct-support.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Includes a relevant note but does not fulfill the communication goal stated in the prompt.",
        "B": "Uses relevant information but emphasizes the wrong rhetorical priority.",
        "D": "Combines the notes into a statement stronger than the supplied evidence."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-080

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Words in Context
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of the movement of sediment after vegetation is restored along a riverbank compared observations from different conditions instead of treating the first pattern as conclusive. A follow-up measurement supports the broad interpretation while identifying a condition that limits how widely it can be applied. The result therefore supports a narrower claim than a simple comparison might initially suggest. The analysis of the movement of sediment after vegetation is restored along a riverbank drew on 2108 examples from 5 settings over 10 observation periods.

As used in the text, what does “qualify” most nearly mean?

CHOICES:
[
  "measure",
  "decorate",
  "separate",
  "qualify"
]

ANSWER: D

EXPLANATION:
In context, qualify means to limit or modify a statement so that it is not interpreted too broadly.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-080",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-080",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "craft-and-structure",
  "skill": "Words in Context",
  "subskill": "Words in Context",
  "conceptId": "craft-and-structure-words-in-context",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-080",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-080-science-problem-response-limitation",
  "conceptFingerprint": "craft-and-structure-Words in Context-science-11",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-080-sat-mock-20-80",
    "contextFamily": "sat-series-b-science-problem-response-limitation",
    "passageGenre": "science",
    "readingTopic": "the movement of sediment after vegetation is restored along a riverbank",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "qualified-support",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Words in Context",
    "passageWordCount": 61,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "literal-near-synonym",
          "error_mechanism": "Selects a familiar dictionary sense that does not fit the word’s use in context.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "irrelevant-context",
          "error_mechanism": "Chooses a possible meaning associated with the topic rather than the sentence.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "reversed-meaning",
          "error_mechanism": "Interprets the word in a direction opposite to the relationship established by the text.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "qualified-support",
      "cognitive_operation": "interpret",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Use the surrounding sentence relationship to select the sense that fits this specific context. Evidence relationship: qualified-support.",
      "correct_reasoning": "In context, qualify means to limit or modify a statement so that it is not interpreted too broadly.",
      "distractor_reasoning": {
        "A": "Selects a familiar dictionary sense that does not fit the word’s use in context.",
        "B": "Chooses a possible meaning associated with the topic rather than the sentence.",
        "C": "Interprets the word in a direction opposite to the relationship established by the text."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-081

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Central Ideas and Details
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
In examining a gardener noticing that a neglected courtyard has become a meeting place, researchers focused on what changed rather than assuming that the change had a single explanation. The character values continuity, yet the setting repeatedly introduces evidence that change has already occurred. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. Two descriptions of the same place do not fully agree, creating a reason to question the first impression. The analysis of gardener noticing that a neglected courtyard has become a meeting place drew on 2109 examples from 6 settings over 5 observation periods.

Which choice best states the main idea of the text?

CHOICES:
[
  "The the passage identifies a pattern while qualifying how broadly it should be interpreted.",
  "The the passage proves that the observed result occurs in every comparable setting.",
  "The the passage treats one observation as sufficient to establish a universal rule.",
  "The the passage focuses mainly on background details without reaching an interpretive conclusion."
]

ANSWER: A

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-081",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-081",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "information-and-ideas",
  "skill": "Central Ideas and Details",
  "subskill": "Central Ideas and Details",
  "conceptId": "information-and-ideas-central-ideas-and-details",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "recall",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-081",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-081-literature-observation-qualification",
  "conceptFingerprint": "information-and-ideas-Central Ideas and Details-literature-12",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-literature"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-081-sat-mock-20-81",
    "contextFamily": "sat-series-b-literature-observation-qualification",
    "passageGenre": "literature",
    "readingTopic": "a gardener noticing that a neglected courtyard has become a meeting place",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "contrast",
    "cognitiveOperation": "identify",
    "questionConstruction": "Central Ideas and Details",
    "passageWordCount": 61,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "B": {
          "role": "distractor",
          "misconception": "true-but-nonresponsive",
          "error_mechanism": "Chooses a true detail that does not state the text’s central idea.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "overly-broad-inference",
          "error_mechanism": "Extends the passage to a universal claim that the evidence does not support.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "too-narrow-detail",
          "error_mechanism": "Treats one local observation as the whole point of the passage.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "A": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "literature",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "contrast",
      "cognitive_operation": "identify",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the passage-level claim that best integrates the major information rather than a single detail. Evidence relationship: contrast.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "B": "Chooses a true detail that does not state the text’s central idea.",
        "C": "Extends the passage to a universal claim that the evidence does not support.",
        "D": "Treats one local observation as the whole point of the passage."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-082

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Transitions
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of farmers adapting cooperative practices when regional prices became less predictable drew on 2110 examples from 7 settings over 7 observation periods. The researchers observed a strong overall pattern. _____, the size of the effect differed among the study conditions.

CHOICES:
[
  "For example,",
  "However,",
  "Similarly,",
  "In addition,"
]

ANSWER: B

EXPLANATION:
However correctly signals the contrast between the broad pattern and the difference in effect size.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-082",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-082",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "expression-of-ideas",
  "skill": "Transitions",
  "subskill": "Transitions",
  "conceptId": "expression-of-ideas-transitions",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-082",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-082-history-social-science-problem-response-limitation",
  "conceptFingerprint": "expression-of-ideas-Transitions-history-social-science-13",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-history-social-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-082-sat-mock-20-82",
    "contextFamily": "sat-series-b-history-social-science-problem-response-limitation",
    "passageGenre": "history-social-science",
    "readingTopic": "farmers adapting cooperative practices when regional prices became less predictable",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "inference",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Transitions",
    "passageWordCount": 59,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "non-structural-fit",
          "error_mechanism": "Chooses a transition that is grammatical but does not express the relationship between the sentences.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "example-for-contrast",
          "error_mechanism": "Treats a contrast as though the second sentence were merely an example.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "addition-for-contrast",
          "error_mechanism": "Signals addition when the sentence relationship requires a contrasting move.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "history-social-science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "inference",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the logical relationship between the surrounding sentences before selecting the transition. Evidence relationship: inference.",
      "correct_reasoning": "However correctly signals the contrast between the broad pattern and the difference in effect size.",
      "distractor_reasoning": {
        "A": "Chooses a transition that is grammatical but does not express the relationship between the sentences.",
        "C": "Treats a contrast as though the second sentence were merely an example.",
        "D": "Signals addition when the sentence relationship requires a contrasting move."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-083

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Text Structure and Purpose
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
An account of the restoration choices made when a damaged architectural feature has several plausible originals becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The evidence becomes more informative when the object is considered alongside the setting in which audiences encountered it. The result therefore supports a narrower claim than a simple comparison might initially suggest. Researchers evaluated the pattern across multiple objects before treating it as evidence of a general practice. The analysis of the restoration choices made when a damaged architectural feature has several plausible originals drew on 2111 examples from 8 settings over 9 observation periods.

Why does the author include the information about the conditions surrounding the result?

CHOICES:
[
  "To replace the central finding with an unrelated explanation.",
  "To provide background that has no effect on the interpretation.",
  "To qualify a broader finding by identifying a condition that limits it.",
  "To repeat the earlier observation without adding information."
]

ANSWER: C

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-083",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-083",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "craft-and-structure",
  "skill": "Text Structure and Purpose",
  "subskill": "Text Structure and Purpose",
  "conceptId": "craft-and-structure-text-structure-and-purpose",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-083",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-083-humanities-observation-qualification",
  "conceptFingerprint": "craft-and-structure-Text Structure and Purpose-humanities-14",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-humanities"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-083-sat-mock-20-83",
    "contextFamily": "sat-series-b-humanities-observation-qualification",
    "passageGenre": "humanities",
    "readingTopic": "the restoration choices made when a damaged architectural feature has several plausible originals",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "example-to-claim",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Text Structure and Purpose",
    "passageWordCount": 64,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "local-detail-as-purpose",
          "error_mechanism": "Treats the immediate detail as the author’s overall rhetorical purpose.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "overbroad-purpose",
          "error_mechanism": "Assigns a purpose broader than the passage evidence warrants.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "reversed-rhetorical-role",
          "error_mechanism": "Reverses the function of the information in the development of the passage.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "humanities",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "example-to-claim",
      "cognitive_operation": "interpret",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Determine what rhetorical job the referenced information performs in the passage as a whole. Evidence relationship: example-to-claim.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Treats the immediate detail as the author’s overall rhetorical purpose.",
        "B": "Assigns a purpose broader than the passage evidence warrants.",
        "D": "Reverses the function of the information in the development of the passage."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-084

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Inferences
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
An account of whether an imaging method detects canopy changes more consistently after calibration becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The experiment separates an observed association from the stronger claim that one factor alone caused the outcome. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. The investigators reviewed results from multiple observation points to determine whether the relationship was consistent. The analysis of whether an imaging method detects canopy changes more consistently after calibration drew on 2112 examples from 9 settings over 4 observation periods.

Which inference is best supported by the text?

CHOICES:
[
  "The observed relationship must remain identical regardless of surrounding conditions.",
  "The evidence establishes a single cause with no need for further comparison.",
  "The observations show that the measured difference is too small to interpret.",
  "The observed relationship may change when relevant surrounding conditions change."
]

ANSWER: D

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-084",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-084",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "information-and-ideas",
  "skill": "Inferences",
  "subskill": "Inferences",
  "conceptId": "information-and-ideas-inferences",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-084",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-084-science-problem-response-limitation",
  "conceptFingerprint": "information-and-ideas-Inferences-science-15",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-084-sat-mock-20-84",
    "contextFamily": "sat-series-b-science-problem-response-limitation",
    "passageGenre": "science",
    "readingTopic": "whether an imaging method detects canopy changes more consistently after calibration",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "infer",
    "questionConstruction": "Inferences",
    "passageWordCount": 64,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "causal-overreach",
          "error_mechanism": "Infers a causal claim even though the passage establishes only an observed relationship.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "absolute-inference",
          "error_mechanism": "Turns a qualified inference into an unconditional statement.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "under-interpretation",
          "error_mechanism": "Repeats a surface observation without drawing the required supported inference.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "relationship-reversal",
      "cognitive_operation": "infer",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Draw only the conclusion that is warranted by the stated or strongly implied evidence. Evidence relationship: relationship-reversal.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Infers a causal claim even though the passage establishes only an observed relationship.",
        "B": "Turns a qualified inference into an unconditional statement.",
        "C": "Repeats a surface observation without drawing the required supported inference."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-085

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Boundaries
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of cartographer returning to a town altered by a new railway drew on 2113 examples from 10 settings over 6 observation periods. The revised method produced a clearer signal _____ it required additional calibration.

CHOICES:
[
  "; however,",
  "; therefore,",
  "; for example,",
  "; similarly,"
]

ANSWER: A

EXPLANATION:
The semicolon separates two independent clauses, while however correctly signals their contrast.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-085",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-085",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "standard-english-conventions",
  "skill": "Boundaries",
  "subskill": "Boundaries",
  "conceptId": "standard-english-conventions-boundaries",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-085",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-085-literature-observation-qualification",
  "conceptFingerprint": "standard-english-conventions-Boundaries-literature-16",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-literature"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-085-sat-mock-20-85",
    "contextFamily": "sat-series-b-literature-observation-qualification",
    "passageGenre": "literature",
    "readingTopic": "a cartographer returning to a town altered by a new railway",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Boundaries",
    "passageWordCount": 63,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "B": {
          "role": "distractor",
          "misconception": "comma-splice-or-fragment",
          "error_mechanism": "Treats two sentence boundaries as though one punctuation mark could incorrectly join or fragment them.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "independent-clause-confusion",
          "error_mechanism": "Fails to recognize the clause structure needed for the sentence boundary.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "misplaced-transition",
          "error_mechanism": "Selects punctuation/transition placement that does not correctly separate the surrounding clauses.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "A": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "literature",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "direct-support",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the clause structure and then select punctuation that creates the required sentence boundary. Evidence relationship: direct-support.",
      "correct_reasoning": "The semicolon separates two independent clauses, while however correctly signals their contrast.",
      "distractor_reasoning": {
        "B": "Treats two sentence boundaries as though one punctuation mark could incorrectly join or fragment them.",
        "C": "Fails to recognize the clause structure needed for the sentence boundary.",
        "D": "Selects punctuation/transition placement that does not correctly separate the surrounding clauses."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-086

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Cross-Text Connections
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of changes in how local newspapers described public libraries in the early twentieth century compared observations from different conditions instead of treating the first pattern as conclusive. Researchers distinguish the stated purpose of the initiative from the later uses residents found for it. The result therefore supports a narrower claim than a simple comparison might initially suggest.

Passage 2: A recent study of whether a coating changes the stability of a battery electrode during repeated cycles compared observations from different conditions instead of treating the first pattern as conclusive. The experiment separates an observed association from the stronger claim that one factor alone caused the outcome. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. The historical account distinguishes the initial policy decision from later ways in which residents adapted to it. The analysis of changes in how local newspapers described public libraries in the early twentieth century drew on 2114 examples from 3 settings over 8 observation periods.

Based on the two passages, which statement would both authors most likely agree with?

CHOICES:
[
  "Both authors argue that a result must be identical in every setting.",
  "Both authors support a qualified interpretation of a broad pattern.",
  "Both authors conclude that local conditions make comparison unnecessary.",
  "Both authors treat a single observation as sufficient for a universal rule."
]

ANSWER: B

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-086",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-086",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "craft-and-structure",
  "skill": "Cross-Text Connections",
  "subskill": "Cross-Text Connections",
  "conceptId": "craft-and-structure-cross-text-connections",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "synthesize",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-086",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-086-history-social-science-problem-response-limitation",
  "conceptFingerprint": "craft-and-structure-Cross-Text Connections-history-social-science-0",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-history-social-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-086-sat-mock-20-86",
    "contextFamily": "sat-series-b-history-social-science-problem-response-limitation",
    "passageGenre": "history-social-science",
    "readingTopic": "changes in how local newspapers described public libraries in the early twentieth century",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "qualified-support",
    "cognitiveOperation": "synthesize",
    "questionConstruction": "Cross-Text Connections",
    "passageWordCount": 60,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "one-passage-only",
          "error_mechanism": "Answers from one passage while ignoring the relationship required across both texts.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "reversed-relationship",
          "error_mechanism": "Switches agreement, contrast, qualification, or another stated relationship.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "overgeneralized-agreement",
          "error_mechanism": "Attributes a stronger or broader agreement to both authors than the texts support.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "history-social-science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "qualified-support",
      "cognitive_operation": "synthesize",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "passage_1_evidence"
        },
        {
          "locator": "stimulus.segment.2",
          "role": "passage_2_evidence"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.2",
          "role": "passage_2_evidence"
        }
      ],
      "required_inference": "Compare both passages before deciding how their claims or interpretations relate. Evidence relationship: qualified-support.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Answers from one passage while ignoring the relationship required across both texts.",
        "C": "Switches agreement, contrast, qualification, or another stated relationship.",
        "D": "Attributes a stronger or broader agreement to both authors than the texts support."
      }
    },
    "qc_status": "failed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 3,
    "qc_failed_checks": [
      "2"
    ],
    "qc_reviewer_notes": "Independent Batch D review failed checks 2. Correct the flagged internal structure or route the item to human review; do not bypass the gate."
  }
}
```

### Question: sat-series-b-mock-20-rw-087

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Command of Evidence
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
In examining the changing use of color in a regional school of landscape painting, researchers focused on what changed rather than assuming that the change had a single explanation. The researchers caution that a recurring feature does not by itself establish a single origin or intention. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. The comparison includes cases in which the feature is prominent and cases in which it is much less noticeable. The analysis of the changing use of color in a regional school of landscape painting drew on 2115 examples from 4 settings over 10 observation periods.

Which finding would best support the interpretation presented in the text?

CHOICES:
[
  "The researchers collected observations from more than one location or setting.",
  "The researchers recorded both averages and individual observations.",
  "A follow-up observation reproduces the predicted pattern after the relevant condition is changed.",
  "The study followed earlier work on a related question."
]

ANSWER: C

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-087",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-087",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "information-and-ideas",
  "skill": "Command of Evidence",
  "subskill": "Command of Evidence",
  "conceptId": "information-and-ideas-command-of-evidence",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-087",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-087-humanities-observation-qualification",
  "conceptFingerprint": "information-and-ideas-Command of Evidence-humanities-1",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-humanities"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-087-sat-mock-20-87",
    "contextFamily": "sat-series-b-humanities-observation-qualification",
    "passageGenre": "humanities",
    "readingTopic": "the changing use of color in a regional school of landscape painting",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "contrast",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Command of Evidence",
    "passageWordCount": 63,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "true-but-nonresponsive",
          "error_mechanism": "Selects evidence that is accurate but does not directly support the stated interpretation.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "method-instead-of-evidence",
          "error_mechanism": "Confuses study procedure or context with evidence for the claim.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "background-instead-of-support",
          "error_mechanism": "Chooses surrounding information rather than evidence bearing on the target claim.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "humanities",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "contrast",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Connect the selected evidence directly to the interpretation named in the question. Evidence relationship: contrast.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Selects evidence that is accurate but does not directly support the stated interpretation.",
        "B": "Confuses study procedure or context with evidence for the claim.",
        "D": "Chooses surrounding information rather than evidence bearing on the target claim."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-088

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Form, Structure, and Sense
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of how migratory birds alter stopover timing when food availability changes drew on 2116 examples from 5 settings over 5 observation periods. The set of measurements, rather than the individual readings, _____ the basis for comparison.

CHOICES:
[
  "support",
  "supporting",
  "have supported",
  "supports"
]

ANSWER: D

EXPLANATION:
The singular subject set takes the singular verb supports.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-088",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-088",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "standard-english-conventions",
  "skill": "Form, Structure, and Sense",
  "subskill": "Form, Structure, and Sense",
  "conceptId": "standard-english-conventions-form-structure-and-sense",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-088",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-088-science-problem-response-limitation",
  "conceptFingerprint": "standard-english-conventions-Form, Structure, and Sense-science-2",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-088-sat-mock-20-88",
    "contextFamily": "sat-series-b-science-problem-response-limitation",
    "passageGenre": "science",
    "readingTopic": "how migratory birds alter stopover timing when food availability changes",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "inference",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Form, Structure, and Sense",
    "passageWordCount": 59,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "subject-verb-agreement",
          "error_mechanism": "Selects a verb that agrees with a nearby noun rather than the actual subject.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "tense-or-person-mismatch",
          "error_mechanism": "Chooses a form inconsistent with the sentence’s established tense or grammatical person.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "modifier-or-structure-error",
          "error_mechanism": "Chooses a form that creates a grammatical or structural mismatch in the sentence.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "inference",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Select the grammatical form that agrees with the sentence structure and preserves its meaning. Evidence relationship: inference.",
      "correct_reasoning": "The singular subject set takes the singular verb supports.",
      "distractor_reasoning": {
        "A": "Selects a verb that agrees with a nearby noun rather than the actual subject.",
        "B": "Chooses a form inconsistent with the sentence’s established tense or grammatical person.",
        "C": "Chooses a form that creates a grammatical or structural mismatch in the sentence."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-089

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Rhetorical Synthesis
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
Study focus: the restoration choices made when a damaged architectural feature has several plausible originals. Observation: the evidence shows a measurable difference between the two settings. Qualification: the size of the difference depends on conditions surrounding the observation. Goal: state the result accurately without making a broader claim than the evidence supports. The analysis of sculptor reconsidering a work after seeing it in a crowded exhibition drew on 2117 examples from 6 settings over 7 observation periods. The comparison was reviewed again so that the result could be stated without dropping its important qualification.

The student wants to emphasize the study’s main result while preserving its important qualification. Which choice best accomplishes this goal?

CHOICES:
[
  "The comparison reveals a measurable effect, although its size depends on the conditions studied.",
  "The researchers collected observations and recorded them at several locations.",
  "The study examined a defined group during a specified period.",
  "The project used multiple observations but did not report a result."
]

ANSWER: A

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-089",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-089",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "expression-of-ideas",
  "skill": "Rhetorical Synthesis",
  "subskill": "Rhetorical Synthesis",
  "conceptId": "expression-of-ideas-rhetorical-synthesis",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "synthesize",
  "questionType": "multiple-choice",
  "stimulusType": "notes",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-089",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-089-literature-observation-qualification",
  "conceptFingerprint": "expression-of-ideas-Rhetorical Synthesis-literature-3",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-literature"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-089-sat-mock-20-89",
    "contextFamily": "sat-series-b-literature-observation-qualification",
    "passageGenre": "literature",
    "readingTopic": "a sculptor reconsidering a work after seeing it in a crowded exhibition",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "example-to-claim",
    "cognitiveOperation": "synthesize",
    "questionConstruction": "Rhetorical Synthesis",
    "passageWordCount": null,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "B": {
          "role": "distractor",
          "misconception": "note-dump",
          "error_mechanism": "Includes a relevant note but does not fulfill the communication goal stated in the prompt.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "goal-mismatch",
          "error_mechanism": "Uses relevant information but emphasizes the wrong rhetorical priority.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "overclaim",
          "error_mechanism": "Combines the notes into a statement stronger than the supplied evidence.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "A": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "literature",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "example-to-claim",
      "cognitive_operation": "synthesize",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "goal_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "goal_or_qualification"
        }
      ],
      "required_inference": "Select notes that fulfill the stated communication goal without adding an unsupported claim. Evidence relationship: example-to-claim.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "B": "Includes a relevant note but does not fulfill the communication goal stated in the prompt.",
        "C": "Uses relevant information but emphasizes the wrong rhetorical priority.",
        "D": "Combines the notes into a statement stronger than the supplied evidence."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-090

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Words in Context
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
An account of a policy experiment designed to reduce congestion without restricting access to businesses becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The evidence suggests that the change was not caused by a single decision but developed through several local responses. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. The analysis of policy experiment designed to reduce congestion without restricting access to businesses drew on 2118 examples from 7 settings over 9 observation periods.

As used in the text, what does “qualify” most nearly mean?

CHOICES:
[
  "measure",
  "qualify",
  "decorate",
  "separate"
]

ANSWER: B

EXPLANATION:
In context, qualify means to limit or modify a statement so that it is not interpreted too broadly.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-090",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-090",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "craft-and-structure",
  "skill": "Words in Context",
  "subskill": "Words in Context",
  "conceptId": "craft-and-structure-words-in-context",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-090",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-090-history-social-science-problem-response-limitation",
  "conceptFingerprint": "craft-and-structure-Words in Context-history-social-science-4",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-history-social-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-090-sat-mock-20-90",
    "contextFamily": "sat-series-b-history-social-science-problem-response-limitation",
    "passageGenre": "history-social-science",
    "readingTopic": "a policy experiment designed to reduce congestion without restricting access to businesses",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Words in Context",
    "passageWordCount": 67,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "literal-near-synonym",
          "error_mechanism": "Selects a familiar dictionary sense that does not fit the word’s use in context.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "irrelevant-context",
          "error_mechanism": "Chooses a possible meaning associated with the topic rather than the sentence.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "reversed-meaning",
          "error_mechanism": "Interprets the word in a direction opposite to the relationship established by the text.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "history-social-science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "relationship-reversal",
      "cognitive_operation": "interpret",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Use the surrounding sentence relationship to select the sense that fits this specific context. Evidence relationship: relationship-reversal.",
      "correct_reasoning": "In context, qualify means to limit or modify a statement so that it is not interpreted too broadly.",
      "distractor_reasoning": {
        "A": "Selects a familiar dictionary sense that does not fit the word’s use in context.",
        "C": "Chooses a possible meaning associated with the topic rather than the sentence.",
        "D": "Interprets the word in a direction opposite to the relationship established by the text."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-091

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Central Ideas and Details
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of the acoustic design of small performance spaces compared observations from different conditions instead of treating the first pattern as conclusive. The comparison indicates that a feature often described as decorative also served a practical communicative purpose. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. Earlier and later examples were compared to determine whether the observed characteristic changed with context. The analysis of the acoustic design of small performance spaces drew on 2119 examples from 8 settings over 4 observation periods.

Which choice best states the main idea of the text?

CHOICES:
[
  "The the account proves that the observed result occurs in every comparable setting.",
  "The the account treats one observation as sufficient to establish a universal rule.",
  "The the account identifies a pattern while qualifying how broadly it should be interpreted.",
  "The the account focuses mainly on background details without reaching an interpretive conclusion."
]

ANSWER: C

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-091",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-091",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "information-and-ideas",
  "skill": "Central Ideas and Details",
  "subskill": "Central Ideas and Details",
  "conceptId": "information-and-ideas-central-ideas-and-details",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "recall",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-091",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-091-humanities-observation-qualification",
  "conceptFingerprint": "information-and-ideas-Central Ideas and Details-humanities-5",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-humanities"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-091-sat-mock-20-91",
    "contextFamily": "sat-series-b-humanities-observation-qualification",
    "passageGenre": "humanities",
    "readingTopic": "the acoustic design of small performance spaces",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "identify",
    "questionConstruction": "Central Ideas and Details",
    "passageWordCount": 56,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "true-but-nonresponsive",
          "error_mechanism": "Chooses a true detail that does not state the text’s central idea.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "overly-broad-inference",
          "error_mechanism": "Extends the passage to a universal claim that the evidence does not support.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "too-narrow-detail",
          "error_mechanism": "Treats one local observation as the whole point of the passage.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "humanities",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "direct-support",
      "cognitive_operation": "identify",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the passage-level claim that best integrates the major information rather than a single detail. Evidence relationship: direct-support.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Chooses a true detail that does not state the text’s central idea.",
        "B": "Extends the passage to a universal claim that the evidence does not support.",
        "D": "Treats one local observation as the whole point of the passage."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-092

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Transitions
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of the movement of sediment after vegetation is restored along a riverbank drew on 2120 examples from 9 settings over 6 observation periods. The researchers observed a strong overall pattern. _____, the size of the effect differed among the study conditions.

CHOICES:
[
  "For example,",
  "Similarly,",
  "In addition,",
  "However,"
]

ANSWER: D

EXPLANATION:
However correctly signals the contrast between the broad pattern and the difference in effect size.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-092",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-092",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "expression-of-ideas",
  "skill": "Transitions",
  "subskill": "Transitions",
  "conceptId": "expression-of-ideas-transitions",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-092",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-092-science-problem-response-limitation",
  "conceptFingerprint": "expression-of-ideas-Transitions-science-6",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-092-sat-mock-20-92",
    "contextFamily": "sat-series-b-science-problem-response-limitation",
    "passageGenre": "science",
    "readingTopic": "the movement of sediment after vegetation is restored along a riverbank",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "qualified-support",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Transitions",
    "passageWordCount": 61,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "non-structural-fit",
          "error_mechanism": "Chooses a transition that is grammatical but does not express the relationship between the sentences.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "example-for-contrast",
          "error_mechanism": "Treats a contrast as though the second sentence were merely an example.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "addition-for-contrast",
          "error_mechanism": "Signals addition when the sentence relationship requires a contrasting move.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "qualified-support",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the logical relationship between the surrounding sentences before selecting the transition. Evidence relationship: qualified-support.",
      "correct_reasoning": "However correctly signals the contrast between the broad pattern and the difference in effect size.",
      "distractor_reasoning": {
        "A": "Chooses a transition that is grammatical but does not express the relationship between the sentences.",
        "B": "Treats a contrast as though the second sentence were merely an example.",
        "C": "Signals addition when the sentence relationship requires a contrasting move."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-093

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Text Structure and Purpose
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
In examining a gardener noticing that a neglected courtyard has become a meeting place, researchers focused on what changed rather than assuming that the change had a single explanation. The character values continuity, yet the setting repeatedly introduces evidence that change has already occurred. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. Two descriptions of the same place do not fully agree, creating a reason to question the first impression. The analysis of gardener noticing that a neglected courtyard has become a meeting place drew on 2121 examples from 10 settings over 8 observation periods.

Why does the author include the information about the conditions surrounding the result?

CHOICES:
[
  "To qualify a broader finding by identifying a condition that limits it.",
  "To replace the central finding with an unrelated explanation.",
  "To provide background that has no effect on the interpretation.",
  "To repeat the earlier observation without adding information."
]

ANSWER: A

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-093",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-093",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "craft-and-structure",
  "skill": "Text Structure and Purpose",
  "subskill": "Text Structure and Purpose",
  "conceptId": "craft-and-structure-text-structure-and-purpose",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-093",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-093-literature-observation-qualification",
  "conceptFingerprint": "craft-and-structure-Text Structure and Purpose-literature-7",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-literature"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-093-sat-mock-20-93",
    "contextFamily": "sat-series-b-literature-observation-qualification",
    "passageGenre": "literature",
    "readingTopic": "a gardener noticing that a neglected courtyard has become a meeting place",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "contrast",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Text Structure and Purpose",
    "passageWordCount": 61,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "B": {
          "role": "distractor",
          "misconception": "local-detail-as-purpose",
          "error_mechanism": "Treats the immediate detail as the author’s overall rhetorical purpose.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "overbroad-purpose",
          "error_mechanism": "Assigns a purpose broader than the passage evidence warrants.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "reversed-rhetorical-role",
          "error_mechanism": "Reverses the function of the information in the development of the passage.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "A": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "literature",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "contrast",
      "cognitive_operation": "interpret",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Determine what rhetorical job the referenced information performs in the passage as a whole. Evidence relationship: contrast.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "B": "Treats the immediate detail as the author’s overall rhetorical purpose.",
        "C": "Assigns a purpose broader than the passage evidence warrants.",
        "D": "Reverses the function of the information in the development of the passage."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-094

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Inferences
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
In examining farmers adapting cooperative practices when regional prices became less predictable, researchers focused on what changed rather than assuming that the change had a single explanation. Contemporary records show that the policy produced a visible change, although the effect varied across neighborhoods. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. The study compares multiple contemporary reports instead of relying on the most detailed account alone. The analysis of farmers adapting cooperative practices when regional prices became less predictable drew on 2122 examples from 3 settings over 10 observation periods.

Which inference is best supported by the text?

CHOICES:
[
  "The observed relationship must remain identical regardless of surrounding conditions.",
  "The observed relationship may change when relevant surrounding conditions change.",
  "The evidence establishes a single cause with no need for further comparison.",
  "The observations show that the measured difference is too small to interpret."
]

ANSWER: B

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-094",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-094",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "information-and-ideas",
  "skill": "Inferences",
  "subskill": "Inferences",
  "conceptId": "information-and-ideas-inferences",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-094",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-094-history-social-science-problem-response-limitation",
  "conceptFingerprint": "information-and-ideas-Inferences-history-social-science-8",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-history-social-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-094-sat-mock-20-94",
    "contextFamily": "sat-series-b-history-social-science-problem-response-limitation",
    "passageGenre": "history-social-science",
    "readingTopic": "farmers adapting cooperative practices when regional prices became less predictable",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "inference",
    "cognitiveOperation": "infer",
    "questionConstruction": "Inferences",
    "passageWordCount": 59,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "causal-overreach",
          "error_mechanism": "Infers a causal claim even though the passage establishes only an observed relationship.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "absolute-inference",
          "error_mechanism": "Turns a qualified inference into an unconditional statement.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "under-interpretation",
          "error_mechanism": "Repeats a surface observation without drawing the required supported inference.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "history-social-science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "inference",
      "cognitive_operation": "infer",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Draw only the conclusion that is warranted by the stated or strongly implied evidence. Evidence relationship: inference.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Infers a causal claim even though the passage establishes only an observed relationship.",
        "C": "Turns a qualified inference into an unconditional statement.",
        "D": "Repeats a surface observation without drawing the required supported inference."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-095

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Boundaries
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of the restoration choices made when a damaged architectural feature has several plausible originals drew on 2123 examples from 4 settings over 5 observation periods. The revised method produced a clearer signal _____ it required additional calibration.

CHOICES:
[
  "; therefore,",
  "; for example,",
  "; however,",
  "; similarly,"
]

ANSWER: C

EXPLANATION:
The semicolon separates two independent clauses, while however correctly signals their contrast.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-095",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-095",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "standard-english-conventions",
  "skill": "Boundaries",
  "subskill": "Boundaries",
  "conceptId": "standard-english-conventions-boundaries",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-095",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-095-humanities-observation-qualification",
  "conceptFingerprint": "standard-english-conventions-Boundaries-humanities-9",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-humanities"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-095-sat-mock-20-95",
    "contextFamily": "sat-series-b-humanities-observation-qualification",
    "passageGenre": "humanities",
    "readingTopic": "the restoration choices made when a damaged architectural feature has several plausible originals",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "example-to-claim",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Boundaries",
    "passageWordCount": 64,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "comma-splice-or-fragment",
          "error_mechanism": "Treats two sentence boundaries as though one punctuation mark could incorrectly join or fragment them.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "independent-clause-confusion",
          "error_mechanism": "Fails to recognize the clause structure needed for the sentence boundary.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "misplaced-transition",
          "error_mechanism": "Selects punctuation/transition placement that does not correctly separate the surrounding clauses.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "humanities",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "example-to-claim",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the clause structure and then select punctuation that creates the required sentence boundary. Evidence relationship: example-to-claim.",
      "correct_reasoning": "The semicolon separates two independent clauses, while however correctly signals their contrast.",
      "distractor_reasoning": {
        "A": "Treats two sentence boundaries as though one punctuation mark could incorrectly join or fragment them.",
        "B": "Fails to recognize the clause structure needed for the sentence boundary.",
        "D": "Selects punctuation/transition placement that does not correctly separate the surrounding clauses."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-096

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Cross-Text Connections
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
An account of whether an imaging method detects canopy changes more consistently after calibration becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The experiment separates an observed association from the stronger claim that one factor alone caused the outcome. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition.

Passage 2: In examining municipal efforts to coordinate street markets as cities expanded, researchers focused on what changed rather than assuming that the change had a single explanation. Contemporary records show that the policy produced a visible change, although the effect varied across neighborhoods. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. The investigators reviewed results from multiple observation points to determine whether the relationship was consistent. The analysis of whether an imaging method detects canopy changes more consistently after calibration drew on 2124 examples from 5 settings over 7 observation periods.

Based on the two passages, which statement would both authors most likely agree with?

CHOICES:
[
  "Both authors argue that a result must be identical in every setting.",
  "Both authors conclude that local conditions make comparison unnecessary.",
  "Both authors treat a single observation as sufficient for a universal rule.",
  "Both authors support a qualified interpretation of a broad pattern."
]

ANSWER: D

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-096",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-096",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "craft-and-structure",
  "skill": "Cross-Text Connections",
  "subskill": "Cross-Text Connections",
  "conceptId": "craft-and-structure-cross-text-connections",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "synthesize",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-096",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-096-science-problem-response-limitation",
  "conceptFingerprint": "craft-and-structure-Cross-Text Connections-science-10",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-096-sat-mock-20-96",
    "contextFamily": "sat-series-b-science-problem-response-limitation",
    "passageGenre": "science",
    "readingTopic": "whether an imaging method detects canopy changes more consistently after calibration",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "synthesize",
    "questionConstruction": "Cross-Text Connections",
    "passageWordCount": 64,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "one-passage-only",
          "error_mechanism": "Answers from one passage while ignoring the relationship required across both texts.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "reversed-relationship",
          "error_mechanism": "Switches agreement, contrast, qualification, or another stated relationship.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "overgeneralized-agreement",
          "error_mechanism": "Attributes a stronger or broader agreement to both authors than the texts support.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "relationship-reversal",
      "cognitive_operation": "synthesize",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "passage_1_evidence"
        },
        {
          "locator": "stimulus.segment.2",
          "role": "passage_2_evidence"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.2",
          "role": "passage_2_evidence"
        }
      ],
      "required_inference": "Compare both passages before deciding how their claims or interpretations relate. Evidence relationship: relationship-reversal.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Answers from one passage while ignoring the relationship required across both texts.",
        "B": "Switches agreement, contrast, qualification, or another stated relationship.",
        "C": "Attributes a stronger or broader agreement to both authors than the texts support."
      }
    },
    "qc_status": "failed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 3,
    "qc_failed_checks": [
      "2"
    ],
    "qc_reviewer_notes": "Independent Batch D review failed checks 2. Correct the flagged internal structure or route the item to human review; do not bypass the gate."
  }
}
```

### Question: sat-series-b-mock-20-rw-097

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Command of Evidence
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of a cartographer returning to a town altered by a new railway compared observations from different conditions instead of treating the first pattern as conclusive. The narrator initially treats the change as an inconvenience, but a later observation makes the earlier judgment seem incomplete. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. A later moment changes how the character understands a detail that initially seemed ordinary. The analysis of cartographer returning to a town altered by a new railway drew on 2125 examples from 6 settings over 9 observation periods.

Which finding would best support the interpretation presented in the text?

CHOICES:
[
  "A follow-up observation reproduces the predicted pattern after the relevant condition is changed.",
  "The researchers collected observations from more than one location or setting.",
  "The researchers recorded both averages and individual observations.",
  "The study followed earlier work on a related question."
]

ANSWER: A

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-097",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-097",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "information-and-ideas",
  "skill": "Command of Evidence",
  "subskill": "Command of Evidence",
  "conceptId": "information-and-ideas-command-of-evidence",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-097",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-097-literature-observation-qualification",
  "conceptFingerprint": "information-and-ideas-Command of Evidence-literature-11",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-literature"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-097-sat-mock-20-97",
    "contextFamily": "sat-series-b-literature-observation-qualification",
    "passageGenre": "literature",
    "readingTopic": "a cartographer returning to a town altered by a new railway",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Command of Evidence",
    "passageWordCount": 63,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "B": {
          "role": "distractor",
          "misconception": "true-but-nonresponsive",
          "error_mechanism": "Selects evidence that is accurate but does not directly support the stated interpretation.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "method-instead-of-evidence",
          "error_mechanism": "Confuses study procedure or context with evidence for the claim.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "background-instead-of-support",
          "error_mechanism": "Chooses surrounding information rather than evidence bearing on the target claim.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "A": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "literature",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "direct-support",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Connect the selected evidence directly to the interpretation named in the question. Evidence relationship: direct-support.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "B": "Selects evidence that is accurate but does not directly support the stated interpretation.",
        "C": "Confuses study procedure or context with evidence for the claim.",
        "D": "Chooses surrounding information rather than evidence bearing on the target claim."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-098

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Form, Structure, and Sense
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of changes in how local newspapers described public libraries in the early twentieth century drew on 2126 examples from 7 settings over 4 observation periods. The set of measurements, rather than the individual readings, _____ the basis for comparison.

CHOICES:
[
  "support",
  "supports",
  "supporting",
  "have supported"
]

ANSWER: B

EXPLANATION:
The singular subject set takes the singular verb supports.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-098",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-098",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "standard-english-conventions",
  "skill": "Form, Structure, and Sense",
  "subskill": "Form, Structure, and Sense",
  "conceptId": "standard-english-conventions-form-structure-and-sense",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-098",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-098-history-social-science-problem-response-limitation",
  "conceptFingerprint": "standard-english-conventions-Form, Structure, and Sense-history-social-science-12",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-history-social-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-098-sat-mock-20-98",
    "contextFamily": "sat-series-b-history-social-science-problem-response-limitation",
    "passageGenre": "history-social-science",
    "readingTopic": "changes in how local newspapers described public libraries in the early twentieth century",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "qualified-support",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Form, Structure, and Sense",
    "passageWordCount": 60,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "subject-verb-agreement",
          "error_mechanism": "Selects a verb that agrees with a nearby noun rather than the actual subject.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "tense-or-person-mismatch",
          "error_mechanism": "Chooses a form inconsistent with the sentence’s established tense or grammatical person.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "modifier-or-structure-error",
          "error_mechanism": "Chooses a form that creates a grammatical or structural mismatch in the sentence.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "history-social-science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "qualified-support",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Select the grammatical form that agrees with the sentence structure and preserves its meaning. Evidence relationship: qualified-support.",
      "correct_reasoning": "The singular subject set takes the singular verb supports.",
      "distractor_reasoning": {
        "A": "Selects a verb that agrees with a nearby noun rather than the actual subject.",
        "C": "Chooses a form inconsistent with the sentence’s established tense or grammatical person.",
        "D": "Chooses a form that creates a grammatical or structural mismatch in the sentence."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-099

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Rhetorical Synthesis
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
Study focus: the changing use of color in a regional school of landscape painting. Observation: the evidence shows a measurable difference between the two settings. Qualification: the size of the difference depends on conditions surrounding the observation. Goal: state the result accurately without making a broader claim than the evidence supports. The analysis of the changing use of color in a regional school of landscape painting drew on 2127 examples from 8 settings over 6 observation periods. The comparison was reviewed again so that the result could be stated without dropping its important qualification.

The student wants to emphasize the study’s main result while preserving its important qualification. Which choice best accomplishes this goal?

CHOICES:
[
  "The researchers collected observations and recorded them at several locations.",
  "The study examined a defined group during a specified period.",
  "The comparison reveals a measurable effect, although its size depends on the conditions studied.",
  "The project used multiple observations but did not report a result."
]

ANSWER: C

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-099",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-099",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "expression-of-ideas",
  "skill": "Rhetorical Synthesis",
  "subskill": "Rhetorical Synthesis",
  "conceptId": "expression-of-ideas-rhetorical-synthesis",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "synthesize",
  "questionType": "multiple-choice",
  "stimulusType": "notes",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-099",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-099-humanities-observation-qualification",
  "conceptFingerprint": "expression-of-ideas-Rhetorical Synthesis-humanities-13",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-humanities"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-099-sat-mock-20-99",
    "contextFamily": "sat-series-b-humanities-observation-qualification",
    "passageGenre": "humanities",
    "readingTopic": "the changing use of color in a regional school of landscape painting",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "contrast",
    "cognitiveOperation": "synthesize",
    "questionConstruction": "Rhetorical Synthesis",
    "passageWordCount": null,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "note-dump",
          "error_mechanism": "Includes a relevant note but does not fulfill the communication goal stated in the prompt.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "goal-mismatch",
          "error_mechanism": "Uses relevant information but emphasizes the wrong rhetorical priority.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "overclaim",
          "error_mechanism": "Combines the notes into a statement stronger than the supplied evidence.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "humanities",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "contrast",
      "cognitive_operation": "synthesize",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "goal_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "goal_or_qualification"
        }
      ],
      "required_inference": "Select notes that fulfill the stated communication goal without adding an unsupported claim. Evidence relationship: contrast.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Includes a relevant note but does not fulfill the communication goal stated in the prompt.",
        "B": "Uses relevant information but emphasizes the wrong rhetorical priority.",
        "D": "Combines the notes into a statement stronger than the supplied evidence."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-100

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Words in Context
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
In examining how migratory birds alter stopover timing when food availability changes, researchers focused on what changed rather than assuming that the change had a single explanation. Measurements show a consistent overall pattern, but the magnitude of the effect changes under different conditions. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. The analysis of how migratory birds alter stopover timing when food availability changes drew on 2128 examples from 9 settings over 8 observation periods.

As used in the text, what does “qualify” most nearly mean?

CHOICES:
[
  "measure",
  "decorate",
  "separate",
  "qualify"
]

ANSWER: D

EXPLANATION:
In context, qualify means to limit or modify a statement so that it is not interpreted too broadly.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-100",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-100",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "craft-and-structure",
  "skill": "Words in Context",
  "subskill": "Words in Context",
  "conceptId": "craft-and-structure-words-in-context",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-100",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-100-science-problem-response-limitation",
  "conceptFingerprint": "craft-and-structure-Words in Context-science-14",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-100-sat-mock-20-100",
    "contextFamily": "sat-series-b-science-problem-response-limitation",
    "passageGenre": "science",
    "readingTopic": "how migratory birds alter stopover timing when food availability changes",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "inference",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Words in Context",
    "passageWordCount": 59,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "literal-near-synonym",
          "error_mechanism": "Selects a familiar dictionary sense that does not fit the word’s use in context.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "irrelevant-context",
          "error_mechanism": "Chooses a possible meaning associated with the topic rather than the sentence.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "reversed-meaning",
          "error_mechanism": "Interprets the word in a direction opposite to the relationship established by the text.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "inference",
      "cognitive_operation": "interpret",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Use the surrounding sentence relationship to select the sense that fits this specific context. Evidence relationship: inference.",
      "correct_reasoning": "In context, qualify means to limit or modify a statement so that it is not interpreted too broadly.",
      "distractor_reasoning": {
        "A": "Selects a familiar dictionary sense that does not fit the word’s use in context.",
        "B": "Chooses a possible meaning associated with the topic rather than the sentence.",
        "C": "Interprets the word in a direction opposite to the relationship established by the text."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-101

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Central Ideas and Details
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
An account of a sculptor reconsidering a work after seeing it in a crowded exhibition becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The scene moves from a concrete detail to a reflection that reveals the character’s uncertainty rather than resolving it. The result therefore supports a narrower claim than a simple comparison might initially suggest. The scene contrasts a remembered version of the setting with the present one, prompting the character to reconsider the earlier impression. The analysis of sculptor reconsidering a work after seeing it in a crowded exhibition drew on 2129 examples from 10 settings over 10 observation periods.

Which choice best states the main idea of the text?

CHOICES:
[
  "The the passage identifies a pattern while qualifying how broadly it should be interpreted.",
  "The the passage proves that the observed result occurs in every comparable setting.",
  "The the passage treats one observation as sufficient to establish a universal rule.",
  "The the passage focuses mainly on background details without reaching an interpretive conclusion."
]

ANSWER: A

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-101",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-101",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "information-and-ideas",
  "skill": "Central Ideas and Details",
  "subskill": "Central Ideas and Details",
  "conceptId": "information-and-ideas-central-ideas-and-details",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "recall",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-101",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-101-literature-observation-qualification",
  "conceptFingerprint": "information-and-ideas-Central Ideas and Details-literature-15",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-literature"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-101-sat-mock-20-101",
    "contextFamily": "sat-series-b-literature-observation-qualification",
    "passageGenre": "literature",
    "readingTopic": "a sculptor reconsidering a work after seeing it in a crowded exhibition",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "example-to-claim",
    "cognitiveOperation": "identify",
    "questionConstruction": "Central Ideas and Details",
    "passageWordCount": 64,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "B": {
          "role": "distractor",
          "misconception": "true-but-nonresponsive",
          "error_mechanism": "Chooses a true detail that does not state the text’s central idea.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "overly-broad-inference",
          "error_mechanism": "Extends the passage to a universal claim that the evidence does not support.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "too-narrow-detail",
          "error_mechanism": "Treats one local observation as the whole point of the passage.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "A": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "literature",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "example-to-claim",
      "cognitive_operation": "identify",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the passage-level claim that best integrates the major information rather than a single detail. Evidence relationship: example-to-claim.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "B": "Chooses a true detail that does not state the text’s central idea.",
        "C": "Extends the passage to a universal claim that the evidence does not support.",
        "D": "Treats one local observation as the whole point of the passage."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-102

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Transitions
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of policy experiment designed to reduce congestion without restricting access to businesses drew on 2130 examples from 3 settings over 5 observation periods. The researchers observed a strong overall pattern. _____, the size of the effect differed among the study conditions.

CHOICES:
[
  "For example,",
  "However,",
  "Similarly,",
  "In addition,"
]

ANSWER: B

EXPLANATION:
However correctly signals the contrast between the broad pattern and the difference in effect size.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-102",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-102",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "expression-of-ideas",
  "skill": "Transitions",
  "subskill": "Transitions",
  "conceptId": "expression-of-ideas-transitions",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-102",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-102-history-social-science-problem-response-limitation",
  "conceptFingerprint": "expression-of-ideas-Transitions-history-social-science-16",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-history-social-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-102-sat-mock-20-102",
    "contextFamily": "sat-series-b-history-social-science-problem-response-limitation",
    "passageGenre": "history-social-science",
    "readingTopic": "a policy experiment designed to reduce congestion without restricting access to businesses",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Transitions",
    "passageWordCount": 67,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "non-structural-fit",
          "error_mechanism": "Chooses a transition that is grammatical but does not express the relationship between the sentences.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "example-for-contrast",
          "error_mechanism": "Treats a contrast as though the second sentence were merely an example.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "addition-for-contrast",
          "error_mechanism": "Signals addition when the sentence relationship requires a contrasting move.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "history-social-science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "relationship-reversal",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the logical relationship between the surrounding sentences before selecting the transition. Evidence relationship: relationship-reversal.",
      "correct_reasoning": "However correctly signals the contrast between the broad pattern and the difference in effect size.",
      "distractor_reasoning": {
        "A": "Chooses a transition that is grammatical but does not express the relationship between the sentences.",
        "C": "Treats a contrast as though the second sentence were merely an example.",
        "D": "Signals addition when the sentence relationship requires a contrasting move."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-103

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Text Structure and Purpose
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of the acoustic design of small performance spaces compared observations from different conditions instead of treating the first pattern as conclusive. The comparison indicates that a feature often described as decorative also served a practical communicative purpose. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. Earlier and later examples were compared to determine whether the observed characteristic changed with context. The analysis of the acoustic design of small performance spaces drew on 2131 examples from 4 settings over 7 observation periods.

Why does the author include the information about the conditions surrounding the result?

CHOICES:
[
  "To replace the central finding with an unrelated explanation.",
  "To provide background that has no effect on the interpretation.",
  "To qualify a broader finding by identifying a condition that limits it.",
  "To repeat the earlier observation without adding information."
]

ANSWER: C

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-103",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-103",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "craft-and-structure",
  "skill": "Text Structure and Purpose",
  "subskill": "Text Structure and Purpose",
  "conceptId": "craft-and-structure-text-structure-and-purpose",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-103",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-103-humanities-observation-qualification",
  "conceptFingerprint": "craft-and-structure-Text Structure and Purpose-humanities-0",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-humanities"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-103-sat-mock-20-103",
    "contextFamily": "sat-series-b-humanities-observation-qualification",
    "passageGenre": "humanities",
    "readingTopic": "the acoustic design of small performance spaces",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Text Structure and Purpose",
    "passageWordCount": 56,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "local-detail-as-purpose",
          "error_mechanism": "Treats the immediate detail as the author’s overall rhetorical purpose.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "overbroad-purpose",
          "error_mechanism": "Assigns a purpose broader than the passage evidence warrants.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "reversed-rhetorical-role",
          "error_mechanism": "Reverses the function of the information in the development of the passage.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "humanities",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "direct-support",
      "cognitive_operation": "interpret",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Determine what rhetorical job the referenced information performs in the passage as a whole. Evidence relationship: direct-support.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Treats the immediate detail as the author’s overall rhetorical purpose.",
        "B": "Assigns a purpose broader than the passage evidence warrants.",
        "D": "Reverses the function of the information in the development of the passage."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-104

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Inferences
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of the movement of sediment after vegetation is restored along a riverbank compared observations from different conditions instead of treating the first pattern as conclusive. A follow-up measurement supports the broad interpretation while identifying a condition that limits how widely it can be applied. The result therefore supports a narrower claim than a simple comparison might initially suggest. The researchers compared results from two sampling periods rather than relying on a single measurement series. The analysis of the movement of sediment after vegetation is restored along a riverbank drew on 2132 examples from 5 settings over 9 observation periods.

Which inference is best supported by the text?

CHOICES:
[
  "The observed relationship must remain identical regardless of surrounding conditions.",
  "The evidence establishes a single cause with no need for further comparison.",
  "The observations show that the measured difference is too small to interpret.",
  "The observed relationship may change when relevant surrounding conditions change."
]

ANSWER: D

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-104",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-104",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "information-and-ideas",
  "skill": "Inferences",
  "subskill": "Inferences",
  "conceptId": "information-and-ideas-inferences",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-104",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-104-science-problem-response-limitation",
  "conceptFingerprint": "information-and-ideas-Inferences-science-1",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-104-sat-mock-20-104",
    "contextFamily": "sat-series-b-science-problem-response-limitation",
    "passageGenre": "science",
    "readingTopic": "the movement of sediment after vegetation is restored along a riverbank",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "qualified-support",
    "cognitiveOperation": "infer",
    "questionConstruction": "Inferences",
    "passageWordCount": 61,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "causal-overreach",
          "error_mechanism": "Infers a causal claim even though the passage establishes only an observed relationship.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "absolute-inference",
          "error_mechanism": "Turns a qualified inference into an unconditional statement.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "under-interpretation",
          "error_mechanism": "Repeats a surface observation without drawing the required supported inference.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "qualified-support",
      "cognitive_operation": "infer",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Draw only the conclusion that is warranted by the stated or strongly implied evidence. Evidence relationship: qualified-support.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Infers a causal claim even though the passage establishes only an observed relationship.",
        "B": "Turns a qualified inference into an unconditional statement.",
        "C": "Repeats a surface observation without drawing the required supported inference."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-105

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Boundaries
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of gardener noticing that a neglected courtyard has become a meeting place drew on 2133 examples from 6 settings over 4 observation periods. The revised method produced a clearer signal _____ it required additional calibration.

CHOICES:
[
  "; however,",
  "; therefore,",
  "; for example,",
  "; similarly,"
]

ANSWER: A

EXPLANATION:
The semicolon separates two independent clauses, while however correctly signals their contrast.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-105",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-105",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "standard-english-conventions",
  "skill": "Boundaries",
  "subskill": "Boundaries",
  "conceptId": "standard-english-conventions-boundaries",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-105",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-105-literature-observation-qualification",
  "conceptFingerprint": "standard-english-conventions-Boundaries-literature-2",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-literature"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-105-sat-mock-20-105",
    "contextFamily": "sat-series-b-literature-observation-qualification",
    "passageGenre": "literature",
    "readingTopic": "a gardener noticing that a neglected courtyard has become a meeting place",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "contrast",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Boundaries",
    "passageWordCount": 61,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "B": {
          "role": "distractor",
          "misconception": "comma-splice-or-fragment",
          "error_mechanism": "Treats two sentence boundaries as though one punctuation mark could incorrectly join or fragment them.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "independent-clause-confusion",
          "error_mechanism": "Fails to recognize the clause structure needed for the sentence boundary.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "misplaced-transition",
          "error_mechanism": "Selects punctuation/transition placement that does not correctly separate the surrounding clauses.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "A": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "literature",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "contrast",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Identify the clause structure and then select punctuation that creates the required sentence boundary. Evidence relationship: contrast.",
      "correct_reasoning": "The semicolon separates two independent clauses, while however correctly signals their contrast.",
      "distractor_reasoning": {
        "B": "Treats two sentence boundaries as though one punctuation mark could incorrectly join or fragment them.",
        "C": "Fails to recognize the clause structure needed for the sentence boundary.",
        "D": "Selects punctuation/transition placement that does not correctly separate the surrounding clauses."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-106

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Cross-Text Connections
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
In examining farmers adapting cooperative practices when regional prices became less predictable, researchers focused on what changed rather than assuming that the change had a single explanation. Contemporary records show that the policy produced a visible change, although the effect varied across neighborhoods. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation.

Passage 2: In examining the effect of water temperature on the activity of a freshwater organism, researchers focused on what changed rather than assuming that the change had a single explanation. A follow-up measurement supports the broad interpretation while identifying a condition that limits how widely it can be applied. The result therefore supports a narrower claim than a simple comparison might initially suggest. The study compares multiple contemporary reports instead of relying on the most detailed account alone. The analysis of farmers adapting cooperative practices when regional prices became less predictable drew on 2134 examples from 7 settings over 6 observation periods.

Based on the two passages, which statement would both authors most likely agree with?

CHOICES:
[
  "Both authors argue that a result must be identical in every setting.",
  "Both authors support a qualified interpretation of a broad pattern.",
  "Both authors conclude that local conditions make comparison unnecessary.",
  "Both authors treat a single observation as sufficient for a universal rule."
]

ANSWER: B

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-106",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-106",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "craft-and-structure",
  "skill": "Cross-Text Connections",
  "subskill": "Cross-Text Connections",
  "conceptId": "craft-and-structure-cross-text-connections",
  "difficulty": "easy",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "synthesize",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-106",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-106-history-social-science-problem-response-limitation",
  "conceptFingerprint": "craft-and-structure-Cross-Text Connections-history-social-science-3",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-history-social-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-106-sat-mock-20-106",
    "contextFamily": "sat-series-b-history-social-science-problem-response-limitation",
    "passageGenre": "history-social-science",
    "readingTopic": "farmers adapting cooperative practices when regional prices became less predictable",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "inference",
    "cognitiveOperation": "synthesize",
    "questionConstruction": "Cross-Text Connections",
    "passageWordCount": 59,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "one-passage-only",
          "error_mechanism": "Answers from one passage while ignoring the relationship required across both texts.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "reversed-relationship",
          "error_mechanism": "Switches agreement, contrast, qualification, or another stated relationship.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "overgeneralized-agreement",
          "error_mechanism": "Attributes a stronger or broader agreement to both authors than the texts support.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "history-social-science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "inference",
      "cognitive_operation": "synthesize",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "passage_1_evidence"
        },
        {
          "locator": "stimulus.segment.2",
          "role": "passage_2_evidence"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.2",
          "role": "passage_2_evidence"
        }
      ],
      "required_inference": "Compare both passages before deciding how their claims or interpretations relate. Evidence relationship: inference.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Answers from one passage while ignoring the relationship required across both texts.",
        "C": "Switches agreement, contrast, qualification, or another stated relationship.",
        "D": "Attributes a stronger or broader agreement to both authors than the texts support."
      }
    },
    "qc_status": "failed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 3,
    "qc_failed_checks": [
      "2"
    ],
    "qc_reviewer_notes": "Independent Batch D review failed checks 2. Correct the flagged internal structure or route the item to human review; do not bypass the gate."
  }
}
```

### Question: sat-series-b-mock-20-rw-107

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Command of Evidence
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
An account of the restoration choices made when a damaged architectural feature has several plausible originals becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The evidence becomes more informative when the object is considered alongside the setting in which audiences encountered it. The result therefore supports a narrower claim than a simple comparison might initially suggest. Researchers evaluated the pattern across multiple objects before treating it as evidence of a general practice. The analysis of the restoration choices made when a damaged architectural feature has several plausible originals drew on 2135 examples from 8 settings over 8 observation periods.

Which finding would best support the interpretation presented in the text?

CHOICES:
[
  "The researchers collected observations from more than one location or setting.",
  "The researchers recorded both averages and individual observations.",
  "A follow-up observation reproduces the predicted pattern after the relevant condition is changed.",
  "The study followed earlier work on a related question."
]

ANSWER: C

EXPLANATION:
The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-107",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-107",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "information-and-ideas",
  "skill": "Command of Evidence",
  "subskill": "Command of Evidence",
  "conceptId": "information-and-ideas-command-of-evidence",
  "difficulty": "hard",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-107",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-107-humanities-observation-qualification",
  "conceptFingerprint": "information-and-ideas-Command of Evidence-humanities-4",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-humanities"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-107-sat-mock-20-107",
    "contextFamily": "sat-series-b-humanities-observation-qualification",
    "passageGenre": "humanities",
    "readingTopic": "the restoration choices made when a damaged architectural feature has several plausible originals",
    "rhetoricalPurpose": "observation-qualification",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "observation-qualification",
    "evidenceRelationship": "example-to-claim",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Command of Evidence",
    "passageWordCount": 64,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "true-but-nonresponsive",
          "error_mechanism": "Selects evidence that is accurate but does not directly support the stated interpretation.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "method-instead-of-evidence",
          "error_mechanism": "Confuses study procedure or context with evidence for the claim.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "distractor",
          "misconception": "background-instead-of-support",
          "error_mechanism": "Chooses surrounding information rather than evidence bearing on the target claim.",
          "why_plausible": "Choice D preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "humanities",
      "rhetorical_structure": "observation-qualification",
      "evidence_relationship": "example-to-claim",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Connect the selected evidence directly to the interpretation named in the question. Evidence relationship: example-to-claim.",
      "correct_reasoning": "The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.",
      "distractor_reasoning": {
        "A": "Selects evidence that is accurate but does not directly support the stated interpretation.",
        "B": "Confuses study procedure or context with evidence for the claim.",
        "D": "Chooses surrounding information rather than evidence bearing on the target claim."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-rw-108

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Form, Structure, and Sense
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of whether an imaging method detects canopy changes more consistently after calibration drew on 2136 examples from 9 settings over 10 observation periods. The set of measurements, rather than the individual readings, _____ the basis for comparison.

CHOICES:
[
  "support",
  "supporting",
  "have supported",
  "supports"
]

ANSWER: D

EXPLANATION:
The singular subject set takes the singular verb supports.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-rw-108",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-rw-108",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-2",
  "domain": "standard-english-conventions",
  "skill": "Form, Structure, and Sense",
  "subskill": "Form, Structure, and Sense",
  "conceptId": "standard-english-conventions-form-structure-and-sense",
  "difficulty": "medium",
  "difficultyBand": "rw-originality",
  "cognitiveDemand": "evaluate",
  "questionType": "multiple-choice",
  "stimulusType": "short-passage",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 71,
  "calculatorEligibility": false,
  "calculatorMode": "not-applicable",
  "calculatorRequired": false,
  "referenceSheetRelevant": false,
  "passageId": "sat-mock-20-passage-108",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-rw-108-science-problem-response-limitation",
  "conceptFingerprint": "standard-english-conventions-Form, Structure, and Sense-science-5",
  "tags": [
    "sat-series-b",
    "mock",
    "reading-writing",
    "apriori-original",
    "source-science"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "draft",
  "status": "draft",
  "releaseEligibility": false,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-rw-108-sat-mock-20-108",
    "contextFamily": "sat-series-b-science-problem-response-limitation",
    "passageGenre": "science",
    "readingTopic": "whether an imaging method detects canopy changes more consistently after calibration",
    "rhetoricalPurpose": "problem-response-limitation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "problem-response-limitation",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Form, Structure, and Sense",
    "passageWordCount": 64,
    "constructionBlueprintVersion": "batch-c-v1",
    "distractor_architecture": {
      "version": "batch-d-1",
      "internal_only": true,
      "profiles": {
        "A": {
          "role": "distractor",
          "misconception": "subject-verb-agreement",
          "error_mechanism": "Selects a verb that agrees with a nearby noun rather than the actual subject.",
          "why_plausible": "Choice A preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "B": {
          "role": "distractor",
          "misconception": "tense-or-person-mismatch",
          "error_mechanism": "Chooses a form inconsistent with the sentence’s established tense or grammatical person.",
          "why_plausible": "Choice B preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "C": {
          "role": "distractor",
          "misconception": "modifier-or-structure-error",
          "error_mechanism": "Chooses a form that creates a grammatical or structural mismatch in the sentence.",
          "why_plausible": "Choice C preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation."
        },
        "D": {
          "role": "correct",
          "misconception": null,
          "error_mechanism": null,
          "why_plausible": "Matches the evidence, reasoning task, and stated answer relationship for the item."
        }
      }
    },
    "evidence_map": {
      "version": "batch-d-1",
      "internal_only": true,
      "source_family": "science",
      "rhetorical_structure": "problem-response-limitation",
      "evidence_relationship": "relationship-reversal",
      "cognitive_operation": "evaluate",
      "target_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "primary_evidence"
        },
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "supporting_evidence": [
        {
          "locator": "stimulus.segment.1",
          "role": "conclusion_or_qualification"
        }
      ],
      "required_inference": "Select the grammatical form that agrees with the sentence structure and preserves its meaning. Evidence relationship: relationship-reversal.",
      "correct_reasoning": "The singular subject set takes the singular verb supports.",
      "distractor_reasoning": {
        "A": "Selects a verb that agrees with a nearby noun rather than the actual subject.",
        "B": "Chooses a form inconsistent with the sentence’s established tense or grammatical person.",
        "C": "Chooses a form that creates a grammatical or structural mismatch in the sentence."
      }
    },
    "qc_status": "passed",
    "qc_reviewer_id": "batch-d-independent-rw-v1",
    "qc_attempts": 1,
    "qc_failed_checks": [],
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent."
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-1-m1-01

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-1
DOMAIN: Algebra
SKILL: Linear functions
DIFFICULTY: easy
QUESTION TYPE: student-produced-response

PROMPT:
A planning analyst models a changing quantity from a stated baseline and rate. The model provides the constraint needed to determine the target. The initial condition establishes the reference relationship. A linear model is y = 6x + 17. What is y when x = 5?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 47

EXPLANATION:
Substitute x = 5: y = 6(5) + 17 = 47.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-1-m1-01",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-1-m1-01",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-1",
  "domain": "Algebra",
  "skill": "Linear functions",
  "subskill": "Linear functions",
  "conceptId": "Algebra-linear-functions",
  "difficulty": "easy",
  "difficultyBand": "math-module-1-easy",
  "cognitiveDemand": "apply",
  "questionType": "student-produced-response",
  "stimulusType": "numeric-text",
  "interactionType": "student-produced-response",
  "timingMode": "timed",
  "estimatedTimeSeconds": 80,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-1-m1-01",
  "conceptFingerprint": "Algebra-Linear functions-0",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-0",
    "contextFamily": "sat-series-b-Algebra-Linear functions",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Algebra-Linear functions-0",
    "constructionFamily": "sat-series-b|sat-mock-20|Algebra|Linear functions|family-0",
    "answerFormat": "numeric",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-1-m1-02

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-1
DOMAIN: Algebra
SKILL: Linear equations
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A measurement team uses a stated relationship between variables to reconstruct the missing value. The unknown is isolated from the stated condition. The initial condition establishes the reference relationship. A linear model is y = 4x + 17. For what value of x is y = 41?

CHOICES:
[
  "6",
  "7",
  "5",
  "12"
]

ANSWER: A

EXPLANATION:
Subtract 17 and divide by 4 to obtain x = 6.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-1-m1-02",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-1-m1-02",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-1",
  "domain": "Algebra",
  "skill": "Linear equations",
  "subskill": "Linear equations",
  "conceptId": "Algebra-linear-equations",
  "difficulty": "easy",
  "difficultyBand": "math-module-1-easy",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 80,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-1-m1-02",
  "conceptFingerprint": "Algebra-Linear equations-1",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-1",
    "contextFamily": "sat-series-b-Algebra-Linear equations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Algebra-Linear equations-1",
    "constructionFamily": "sat-series-b|sat-mock-20|Algebra|Linear equations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "two-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-1-m1-03

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-1
DOMAIN: Algebra
SKILL: Linear representations
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A project analyst translates the reported quantities into an equation before evaluating the target. The mathematical relationship is evaluated using the given measurements. The initial condition establishes the reference relationship. A line passes through (7, 31) and has slope 2. What is its y-intercept?

CHOICES:
[
  "18",
  "17",
  "16",
  "34"
]

ANSWER: B

EXPLANATION:
Using y = mx + b gives b = 17.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-1-m1-03",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-1-m1-03",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-1",
  "domain": "Algebra",
  "skill": "Linear representations",
  "subskill": "Linear representations",
  "conceptId": "Algebra-linear-representations",
  "difficulty": "easy",
  "difficultyBand": "math-module-1-easy",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 80,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-1-m1-03",
  "conceptFingerprint": "Algebra-Linear representations-2",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-2",
    "contextFamily": "sat-series-b-Algebra-Linear representations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Algebra-Linear representations-2",
    "constructionFamily": "sat-series-b|sat-mock-20|Algebra|Linear representations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-1-m1-04

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-1
DOMAIN: Algebra
SKILL: Linear functions and representations
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A data specialist translates the stated relationship into a mathematical model before determining the requested value. The reported measurements are translated into the required mathematical form. The initial condition establishes the reference relationship. A line passes through (8, 72) and (10, 86). What is its slope?

CHOICES:
[
  "8",
  "6",
  "7",
  "14"
]

ANSWER: C

EXPLANATION:
Slope = (86 − 72)/(10 − 8) = 7.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-1-m1-04",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-1-m1-04",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-1",
  "domain": "Algebra",
  "skill": "Linear functions and representations",
  "subskill": "Linear functions and representations",
  "conceptId": "Algebra-linear-functions-and-representations",
  "difficulty": "easy",
  "difficultyBand": "math-module-1-easy",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 80,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-1-m1-04",
  "conceptFingerprint": "Algebra-Linear functions and representations-3",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-3",
    "contextFamily": "sat-series-b-Algebra-Linear functions and representations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Algebra-Linear functions and representations-3",
    "constructionFamily": "sat-series-b|sat-mock-20|Algebra|Linear functions and representations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift",
      "two-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-1-m1-05

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-1
DOMAIN: Algebra
SKILL: Linear functions
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A research coordinator compares linked measurements and uses the reported constraint to determine the result. The quantities are connected through the model given in the scenario. The initial condition establishes the reference relationship. A linear model is y = 5x + 16. What is y when x = 9?

CHOICES:
[
  "122",
  "62",
  "60",
  "61"
]

ANSWER: D

EXPLANATION:
Substitute x = 9: y = 5(9) + 16 = 61.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-1-m1-05",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-1-m1-05",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-1",
  "domain": "Algebra",
  "skill": "Linear functions",
  "subskill": "Linear functions",
  "conceptId": "Algebra-linear-functions",
  "difficulty": "easy",
  "difficultyBand": "math-module-1-easy",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 80,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-1-m1-05",
  "conceptFingerprint": "Algebra-Linear functions-4",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-4",
    "contextFamily": "sat-series-b-Algebra-Linear functions",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Algebra-Linear functions-4",
    "constructionFamily": "sat-series-b|sat-mock-20|Algebra|Linear functions|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-1-m1-06

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-1
DOMAIN: Algebra
SKILL: Linear equations
DIFFICULTY: easy
QUESTION TYPE: student-produced-response

PROMPT:
A field researcher compares two measured states and reconstructs the unknown quantity from the reported relationship. The baseline is established before the requested quantity is determined. The initial condition establishes the reference relationship. A linear model is y = 3x + 16. For what value of x is y = 46?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 10

EXPLANATION:
Subtract 16 and divide by 3 to obtain x = 10.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-1-m1-06",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-1-m1-06",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-1",
  "domain": "Algebra",
  "skill": "Linear equations",
  "subskill": "Linear equations",
  "conceptId": "Algebra-linear-equations",
  "difficulty": "easy",
  "difficultyBand": "math-module-1-easy",
  "cognitiveDemand": "apply",
  "questionType": "student-produced-response",
  "stimulusType": "numeric-text",
  "interactionType": "student-produced-response",
  "timingMode": "timed",
  "estimatedTimeSeconds": 80,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-1-m1-06",
  "conceptFingerprint": "Algebra-Linear equations-5",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-5",
    "contextFamily": "sat-series-b-Algebra-Linear equations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Algebra-Linear equations-5",
    "constructionFamily": "sat-series-b|sat-mock-20|Algebra|Linear equations|family-0",
    "answerFormat": "numeric",
    "figurePurpose": null,
    "difficultyFeatures": [
      "two-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-1-m1-07

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-1
DOMAIN: Algebra
SKILL: Linear representations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A quality analyst checks how a reported change follows from the quantities given in the scenario. The calculation focuses on the condition that links the known and unknown values. The initial condition establishes the reference relationship. A line passes through (11, 103) and has slope 8. What is its y-intercept?

CHOICES:
[
  "15",
  "14",
  "16",
  "30"
]

ANSWER: A

EXPLANATION:
Using y = mx + b gives b = 15.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-1-m1-07",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-1-m1-07",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-1",
  "domain": "Algebra",
  "skill": "Linear representations",
  "subskill": "Linear representations",
  "conceptId": "Algebra-linear-representations",
  "difficulty": "medium",
  "difficultyBand": "math-module-1-medium",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-1-m1-07",
  "conceptFingerprint": "Algebra-Linear representations-6",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-6",
    "contextFamily": "sat-series-b-Algebra-Linear representations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Algebra-Linear representations-6",
    "constructionFamily": "sat-series-b|sat-mock-20|Algebra|Linear representations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-1-m1-08

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-1
DOMAIN: Algebra
SKILL: Linear functions and representations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A monitoring team relates the measured values through the stated mathematical condition. The requested value follows from the relationship among the measured quantities. The initial condition establishes the reference relationship. A line passes through (12, 87) and (14, 99). What is its slope?

CHOICES:
[
  "7",
  "6",
  "12",
  "5"
]

ANSWER: B

EXPLANATION:
Slope = (99 − 87)/(14 − 12) = 6.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-1-m1-08",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-1-m1-08",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-1",
  "domain": "Algebra",
  "skill": "Linear functions and representations",
  "subskill": "Linear functions and representations",
  "conceptId": "Algebra-linear-functions-and-representations",
  "difficulty": "medium",
  "difficultyBand": "math-module-1-medium",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-1-m1-08",
  "conceptFingerprint": "Algebra-Linear functions and representations-7",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-7",
    "contextFamily": "sat-series-b-Algebra-Linear functions and representations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Algebra-Linear functions and representations-7",
    "constructionFamily": "sat-series-b|sat-mock-20|Algebra|Linear functions and representations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift",
      "two-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-1-m1-09

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-1
DOMAIN: Advanced Math
SKILL: Quadratic equations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A project analyst translates the reported quantities into an equation before evaluating the target. The calculation uses the reported relationship directly. The initial condition establishes the reference relationship. A quadratic has roots 8 and 18. What is the sum of the roots?

CHOICES:
[
  "25",
  "27",
  "26",
  "52"
]

ANSWER: C

EXPLANATION:
Add the two roots: 8 + 18 = 26.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-1-m1-09",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-1-m1-09",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-1",
  "domain": "Advanced Math",
  "skill": "Quadratic equations",
  "subskill": "Quadratic equations",
  "conceptId": "Advanced Math-quadratic-equations",
  "difficulty": "medium",
  "difficultyBand": "math-module-1-medium",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-1-m1-09",
  "conceptFingerprint": "Advanced Math-Quadratic equations-8",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-8",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic equations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Advanced Math-Quadratic equations-8",
    "constructionFamily": "sat-series-b|sat-mock-20|Advanced Math|Quadratic equations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-1-m1-10

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-1
DOMAIN: Advanced Math
SKILL: Exponential equations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A data specialist translates the stated relationship into a mathematical model before determining the requested value. The stated quantities provide enough information to identify the target. The initial condition establishes the reference relationship. If 3^x = 243, what is x?

CHOICES:
[
  "6",
  "10",
  "4",
  "5"
]

ANSWER: D

EXPLANATION:
Equal powers with the same base have equal exponents, so x = 5.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-1-m1-10",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-1-m1-10",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-1",
  "domain": "Advanced Math",
  "skill": "Exponential equations",
  "subskill": "Exponential equations",
  "conceptId": "Advanced Math-exponential-equations",
  "difficulty": "medium",
  "difficultyBand": "math-module-1-medium",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-1-m1-10",
  "conceptFingerprint": "Advanced Math-Exponential equations-9",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-9",
    "contextFamily": "sat-series-b-Advanced Math-Exponential equations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Advanced Math-Exponential equations-9",
    "constructionFamily": "sat-series-b|sat-mock-20|Advanced Math|Exponential equations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-1-m1-11

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-1
DOMAIN: Advanced Math
SKILL: Quadratic functions and representations
DIFFICULTY: medium
QUESTION TYPE: student-produced-response

PROMPT:
A research coordinator compares linked measurements and uses the reported constraint to determine the result. The model provides the constraint needed to determine the target. The initial condition establishes the reference relationship. For f(x) = (x − 20411)² + 20410, what is the minimum value of f?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 20410

EXPLANATION:
The square is minimized at 0, so the minimum is 20410.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-1-m1-11",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-1-m1-11",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-1",
  "domain": "Advanced Math",
  "skill": "Quadratic functions and representations",
  "subskill": "Quadratic functions and representations",
  "conceptId": "Advanced Math-quadratic-functions-and-representations",
  "difficulty": "medium",
  "difficultyBand": "math-module-1-medium",
  "cognitiveDemand": "apply",
  "questionType": "student-produced-response",
  "stimulusType": "quadratic",
  "interactionType": "student-produced-response",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": {
    "type": "parabola",
    "equation": "y = 1x² − 40822x + 416629331",
    "x_range": [
      20401,
      20421
    ],
    "visualVariant": "sat-mock-20-math-math-module-1-m1-11"
  },
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-1-m1-11",
  "conceptFingerprint": "Advanced Math-Quadratic functions and representations-10",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-10",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic functions and representations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Advanced Math-Quadratic functions and representations-10",
    "constructionFamily": "sat-series-b|sat-mock-20|Advanced Math|Quadratic functions and representations|family-0",
    "answerFormat": "numeric",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "representation-shift",
      "multi-step",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "advanced math|parabola|{equation:y = <n>x² − <n>x + <n>|type:parabola|x_range:[<n>,<n>]}|data:advanced math|parabola|{equation:y = 1x² − 40822x + 416629331|type:parabola|x_range:[20401,20421]}",
    "figureStructureFingerprint": "advanced math|parabola|{equation:y = <n>x² − <n>x + <n>|type:parabola|x_range:[<n>,<n>]}",
    "figureDataFingerprint": "advanced math|parabola|{equation:y = 1x² − 40822x + 416629331|type:parabola|x_range:[20401,20421]}"
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-1-m1-12

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-1
DOMAIN: Advanced Math
SKILL: Quadratic parameter reasoning
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A field researcher compares two measured states and reconstructs the unknown quantity from the reported relationship. The unknown is isolated from the stated condition. The initial condition establishes the reference relationship. For 3x² − 18x + k = 0, the equation has exactly one real solution. What is k?

CHOICES:
[
  "27",
  "26",
  "54",
  "28"
]

ANSWER: A

EXPLANATION:
A repeated root requires the discriminant to equal zero.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-1-m1-12",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-1-m1-12",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-1",
  "domain": "Advanced Math",
  "skill": "Quadratic parameter reasoning",
  "subskill": "Quadratic parameter reasoning",
  "conceptId": "Advanced Math-quadratic-parameter-reasoning",
  "difficulty": "medium",
  "difficultyBand": "math-module-1-medium",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-1-m1-12",
  "conceptFingerprint": "Advanced Math-Quadratic parameter reasoning-11",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-11",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic parameter reasoning",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Advanced Math-Quadratic parameter reasoning-11",
    "constructionFamily": "sat-series-b|sat-mock-20|Advanced Math|Quadratic parameter reasoning|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "parameter-reasoning",
      "constraint-inference",
      "multi-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-1-m1-13

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-1
DOMAIN: Advanced Math
SKILL: Quadratic equations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A quality analyst checks how a reported change follows from the quantities given in the scenario. The mathematical relationship is evaluated using the given measurements. The initial condition establishes the reference relationship. A quadratic has roots 12 and 22. What is the sum of the roots?

CHOICES:
[
  "35",
  "34",
  "33",
  "68"
]

ANSWER: B

EXPLANATION:
Add the two roots: 12 + 22 = 34.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-1-m1-13",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-1-m1-13",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-1",
  "domain": "Advanced Math",
  "skill": "Quadratic equations",
  "subskill": "Quadratic equations",
  "conceptId": "Advanced Math-quadratic-equations",
  "difficulty": "medium",
  "difficultyBand": "math-module-1-medium",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-1-m1-13",
  "conceptFingerprint": "Advanced Math-Quadratic equations-12",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-12",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic equations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Advanced Math-Quadratic equations-12",
    "constructionFamily": "sat-series-b|sat-mock-20|Advanced Math|Quadratic equations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-1-m1-14

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-1
DOMAIN: Advanced Math
SKILL: Exponential equations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A monitoring team relates the measured values through the stated mathematical condition. The reported measurements are translated into the required mathematical form. The initial condition establishes the reference relationship. If 2^x = 32, what is x?

CHOICES:
[
  "6",
  "4",
  "5",
  "10"
]

ANSWER: C

EXPLANATION:
Equal powers with the same base have equal exponents, so x = 5.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-1-m1-14",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-1-m1-14",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-1",
  "domain": "Advanced Math",
  "skill": "Exponential equations",
  "subskill": "Exponential equations",
  "conceptId": "Advanced Math-exponential-equations",
  "difficulty": "medium",
  "difficultyBand": "math-module-1-medium",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-1-m1-14",
  "conceptFingerprint": "Advanced Math-Exponential equations-13",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-13",
    "contextFamily": "sat-series-b-Advanced Math-Exponential equations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Advanced Math-Exponential equations-13",
    "constructionFamily": "sat-series-b|sat-mock-20|Advanced Math|Exponential equations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-1-m1-15

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-1
DOMAIN: Advanced Math
SKILL: Quadratic functions and representations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A resource planner compares a starting condition with a later condition to determine the requested quantity. The quantities are connected through the model given in the scenario. The initial condition establishes the reference relationship. For f(x) = (x − 20415)² + 20406, what is the minimum value of f?

CHOICES:
[
  "20407",
  "20405",
  "40812",
  "20406"
]

ANSWER: D

EXPLANATION:
The square is minimized at 0, so the minimum is 20406.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-1-m1-15",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-1-m1-15",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-1",
  "domain": "Advanced Math",
  "skill": "Quadratic functions and representations",
  "subskill": "Quadratic functions and representations",
  "conceptId": "Advanced Math-quadratic-functions-and-representations",
  "difficulty": "medium",
  "difficultyBand": "math-module-1-medium",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "quadratic",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": {
    "type": "parabola",
    "equation": "y = 1x² − 40830x + 416792631",
    "x_range": [
      20405,
      20425
    ],
    "visualVariant": "sat-mock-20-math-math-module-1-m1-15"
  },
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-1-m1-15",
  "conceptFingerprint": "Advanced Math-Quadratic functions and representations-14",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-14",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic functions and representations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Advanced Math-Quadratic functions and representations-14",
    "constructionFamily": "sat-series-b|sat-mock-20|Advanced Math|Quadratic functions and representations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "representation-shift",
      "multi-step",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "advanced math|parabola|{equation:y = <n>x² − <n>x + <n>|type:parabola|x_range:[<n>,<n>]}|data:advanced math|parabola|{equation:y = 1x² − 40830x + 416792631|type:parabola|x_range:[20405,20425]}",
    "figureStructureFingerprint": "advanced math|parabola|{equation:y = <n>x² − <n>x + <n>|type:parabola|x_range:[<n>,<n>]}",
    "figureDataFingerprint": "advanced math|parabola|{equation:y = 1x² − 40830x + 416792631|type:parabola|x_range:[20405,20425]}"
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-1-m1-16

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-1
DOMAIN: Advanced Math
SKILL: Quadratic parameter reasoning
DIFFICULTY: hard
QUESTION TYPE: student-produced-response

PROMPT:
An operations analyst uses the stated model to connect the observed quantities and identify the requested value. The baseline is established before the requested quantity is determined. The initial condition establishes the reference relationship. For 5x² − 20x + k = 0, the equation has exactly one real solution. What is k?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 20

EXPLANATION:
A repeated root requires the discriminant to equal zero.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-1-m1-16",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-1-m1-16",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-1",
  "domain": "Advanced Math",
  "skill": "Quadratic parameter reasoning",
  "subskill": "Quadratic parameter reasoning",
  "conceptId": "Advanced Math-quadratic-parameter-reasoning",
  "difficulty": "hard",
  "difficultyBand": "math-module-1-hard",
  "cognitiveDemand": "analyze",
  "questionType": "student-produced-response",
  "stimulusType": "numeric-text",
  "interactionType": "student-produced-response",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-1-m1-16",
  "conceptFingerprint": "Advanced Math-Quadratic parameter reasoning-15",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-15",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic parameter reasoning",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Advanced Math-Quadratic parameter reasoning-15",
    "constructionFamily": "sat-series-b|sat-mock-20|Advanced Math|Quadratic parameter reasoning|family-0",
    "answerFormat": "numeric",
    "figurePurpose": null,
    "difficultyFeatures": [
      "parameter-reasoning",
      "constraint-inference",
      "multi-step",
      "strategic-choice"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-1-m1-17

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-1
DOMAIN: Problem-Solving and Data Analysis
SKILL: Percentages
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
An engineering team represents the relationship symbolically and checks the unknown against an observed condition. The calculation focuses on the condition that links the known and unknown values. The initial condition establishes the reference relationship. A survey includes 233 responses. 55% select option A. How many responses select A?

CHOICES:
[
  "128.15",
  "129.15",
  "127.15",
  "256.3"
]

ANSWER: A

EXPLANATION:
Multiply 233 by 55/100.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-1-m1-17",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-1-m1-17",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-1",
  "domain": "Problem-Solving and Data Analysis",
  "skill": "Percentages",
  "subskill": "Percentages",
  "conceptId": "Problem-Solving and Data Analysis-percentages",
  "difficulty": "hard",
  "difficultyBand": "math-module-1-hard",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-1-m1-17",
  "conceptFingerprint": "Problem-Solving and Data Analysis-Percentages-16",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-16",
    "contextFamily": "sat-series-b-Problem-Solving and Data Analysis-Percentages",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Problem-Solving and Data Analysis-Percentages-16",
    "constructionFamily": "sat-series-b|sat-mock-20|Problem-Solving and Data Analysis|Percentages|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step",
      "strategic-choice",
      "multi-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-1-m1-18

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-1
DOMAIN: Problem-Solving and Data Analysis
SKILL: Data models
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A systems analyst converts the stated conditions into a mathematical relationship and evaluates the unknown. The requested value follows from the relationship among the measured quantities. The initial condition establishes the reference relationship. A data set is modeled by y = 7x + 16. What y-value is predicted when x = 5?

CHOICES:
[
  "52",
  "51",
  "50",
  "102"
]

ANSWER: B

EXPLANATION:
Substitute x = 5 into the model.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-1-m1-18",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-1-m1-18",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-1",
  "domain": "Problem-Solving and Data Analysis",
  "skill": "Data models",
  "subskill": "Data models",
  "conceptId": "Problem-Solving and Data Analysis-data-models",
  "difficulty": "hard",
  "difficultyBand": "math-module-1-hard",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "scatter",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": {
    "type": "scatter_plot",
    "points": [
      [
        1,
        20416
      ],
      [
        2,
        20406
      ],
      [
        3,
        20413
      ],
      [
        4,
        20420
      ],
      [
        5,
        20410
      ],
      [
        6,
        20417
      ]
    ],
    "visualVariant": "sat-mock-20-math-math-module-1-m1-18"
  },
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-1-m1-18",
  "conceptFingerprint": "Problem-Solving and Data Analysis-Data models-17",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-17",
    "contextFamily": "sat-series-b-Problem-Solving and Data Analysis-Data models",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Problem-Solving and Data Analysis-Data models-17",
    "constructionFamily": "sat-series-b|sat-mock-20|Problem-Solving and Data Analysis|Data models|family-0",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "data-interpretation",
      "representation-shift",
      "strategic-choice",
      "multi-step"
    ],
    "figureOriginalityFingerprint": "problem-solving and data analysis|scatter_plot|{points:[[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>]]|type:scatter_plot}|data:problem-solving and data analysis|scatter_plot|{points:[[1,20416],[2,20406],[3,20413],[4,20420],[5,20410],[6,20417]]|type:scatter_plot}",
    "figureStructureFingerprint": "problem-solving and data analysis|scatter_plot|{points:[[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>]]|type:scatter_plot}",
    "figureDataFingerprint": "problem-solving and data analysis|scatter_plot|{points:[[1,20416],[2,20406],[3,20413],[4,20420],[5,20410],[6,20417]]|type:scatter_plot}"
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-1-m1-19

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-1
DOMAIN: Problem-Solving and Data Analysis
SKILL: Measures of spread
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A planning analyst models a changing quantity from a stated baseline and rate. The calculation uses the reported relationship directly. The initial condition establishes the reference relationship. A data set has first quartile 9 and third quartile 31. What is the interquartile range?

CHOICES:
[
  "23",
  "21",
  "22",
  "44"
]

ANSWER: C

EXPLANATION:
IQR equals Q3 minus Q1.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-1-m1-19",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-1-m1-19",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-1",
  "domain": "Problem-Solving and Data Analysis",
  "skill": "Measures of spread",
  "subskill": "Measures of spread",
  "conceptId": "Problem-Solving and Data Analysis-measures-of-spread",
  "difficulty": "hard",
  "difficultyBand": "math-module-1-hard",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-1-m1-19",
  "conceptFingerprint": "Problem-Solving and Data Analysis-Measures of spread-18",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-18",
    "contextFamily": "sat-series-b-Problem-Solving and Data Analysis-Measures of spread",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Problem-Solving and Data Analysis-Measures of spread-18",
    "constructionFamily": "sat-series-b|sat-mock-20|Problem-Solving and Data Analysis|Measures of spread|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step",
      "strategic-choice",
      "multi-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-1-m1-20

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-1
DOMAIN: Geometry and Trigonometry
SKILL: Similarity and scaling
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A measurement team uses a stated relationship between variables to reconstruct the missing value. The stated quantities provide enough information to identify the target. The initial condition establishes the reference relationship. Two similar figures have corresponding lengths in the ratio 5103:1. The smaller figure has area 51040. What is the larger area?

CHOICES:
[
  "1329112683361",
  "1329112683359",
  "2658225366720",
  "1329112683360"
]

ANSWER: D

EXPLANATION:
Areas scale by the square of the length ratio.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-1-m1-20",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-1-m1-20",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-1",
  "domain": "Geometry and Trigonometry",
  "skill": "Similarity and scaling",
  "subskill": "Similarity and scaling",
  "conceptId": "Geometry and Trigonometry-similarity-and-scaling",
  "difficulty": "hard",
  "difficultyBand": "math-module-1-hard",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "geometry",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": {
    "type": "geometry",
    "shape": "similar-figures",
    "values": {
      "scale": 5103,
      "area": 51040
    },
    "visualVariant": "sat-mock-20-math-math-module-1-m1-20"
  },
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-1-m1-20",
  "conceptFingerprint": "Geometry and Trigonometry-Similarity and scaling-19",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-19",
    "contextFamily": "sat-series-b-Geometry and Trigonometry-Similarity and scaling",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Geometry and Trigonometry-Similarity and scaling-19",
    "constructionFamily": "sat-series-b|sat-mock-20|Geometry and Trigonometry|Similarity and scaling|family-0",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "multi-step",
      "constraint-inference",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:<n>|scale:<n>}}|data:geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:51040|scale:5103}}",
    "figureStructureFingerprint": "geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:<n>|scale:<n>}}",
    "figureDataFingerprint": "geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:51040|scale:5103}}"
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-1-m1-21

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-1
DOMAIN: Geometry and Trigonometry
SKILL: Geometry and measurement
DIFFICULTY: hard
QUESTION TYPE: student-produced-response

PROMPT:
A project analyst translates the reported quantities into an equation before evaluating the target. The model provides the constraint needed to determine the target. The initial condition establishes the reference relationship. A triangle has base 20420 and height 20411. What is its area?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 208396310

EXPLANATION:
Use one-half times base times height.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-1-m1-21",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-1-m1-21",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-1",
  "domain": "Geometry and Trigonometry",
  "skill": "Geometry and measurement",
  "subskill": "Geometry and measurement",
  "conceptId": "Geometry and Trigonometry-geometry-and-measurement",
  "difficulty": "hard",
  "difficultyBand": "math-module-1-hard",
  "cognitiveDemand": "analyze",
  "questionType": "student-produced-response",
  "stimulusType": "geometry",
  "interactionType": "student-produced-response",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": {
    "type": "geometry",
    "shape": "triangle",
    "values": {
      "base": 20420,
      "height": 20411
    },
    "visualVariant": "sat-mock-20-math-math-module-1-m1-21"
  },
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-1-m1-21",
  "conceptFingerprint": "Geometry and Trigonometry-Geometry and measurement-20",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-20",
    "contextFamily": "sat-series-b-Geometry and Trigonometry-Geometry and measurement",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Geometry and Trigonometry-Geometry and measurement-20",
    "constructionFamily": "sat-series-b|sat-mock-20|Geometry and Trigonometry|Geometry and measurement|family-0",
    "answerFormat": "numeric",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "multi-step",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:<n>|height:<n>}}|data:geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:20420|height:20411}}",
    "figureStructureFingerprint": "geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:<n>|height:<n>}}",
    "figureDataFingerprint": "geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:20420|height:20411}}"
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-1-m1-22

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-1
DOMAIN: Geometry and Trigonometry
SKILL: Circles
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A data specialist translates the stated relationship into a mathematical model before determining the requested value. The unknown is isolated from the stated condition. The initial condition establishes the reference relationship. A circle has radius 20412. What is its area in terms of π?

CHOICES:
[
  "416649744π",
  "416649744π + 1",
  "416649744π − 1",
  "none of these"
]

ANSWER: A

EXPLANATION:
Area equals πr².

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-1-m1-22",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-1-m1-22",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-1",
  "domain": "Geometry and Trigonometry",
  "skill": "Circles",
  "subskill": "Circles",
  "conceptId": "Geometry and Trigonometry-circles",
  "difficulty": "hard",
  "difficultyBand": "math-module-1-hard",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "geometry",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": {
    "type": "circle",
    "radius": 20412,
    "center_label": "O",
    "visualVariant": "sat-mock-20-math-math-module-1-m1-22"
  },
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-1-m1-22",
  "conceptFingerprint": "Geometry and Trigonometry-Circles-21",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-21",
    "contextFamily": "sat-series-b-Geometry and Trigonometry-Circles",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Geometry and Trigonometry-Circles-21",
    "constructionFamily": "sat-series-b|sat-mock-20|Geometry and Trigonometry|Circles|family-0",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "direct-application",
      "single-step",
      "strategic-choice",
      "multi-step"
    ],
    "figureOriginalityFingerprint": "geometry and trigonometry|circle|{center_label:o|radius:<n>|type:circle}|data:geometry and trigonometry|circle|{center_label:o|radius:20412|type:circle}",
    "figureStructureFingerprint": "geometry and trigonometry|circle|{center_label:o|radius:<n>|type:circle}",
    "figureDataFingerprint": "geometry and trigonometry|circle|{center_label:o|radius:20412|type:circle}"
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-high-23

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear representations
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
An operations analyst uses the stated model to connect the observed quantities and identify the requested value. The mathematical relationship is evaluated using the given measurements. The selected comparison condition establishes the target relationship. A line passes through (5, 55) and has slope 7. What is its y-intercept?

CHOICES:
[
  "21",
  "20",
  "19",
  "40"
]

ANSWER: B

EXPLANATION:
Using y = mx + b gives b = 20.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-high-23",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-high-23",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Algebra",
  "skill": "Linear representations",
  "subskill": "Linear representations",
  "conceptId": "Algebra-linear-representations",
  "difficulty": "easy",
  "difficultyBand": "math-high-easy",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 80,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-high-23",
  "conceptFingerprint": "Algebra-Linear representations-22",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-22",
    "contextFamily": "sat-series-b-Algebra-Linear representations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Algebra-Linear representations-22",
    "constructionFamily": "sat-series-b|sat-mock-20|Algebra|Linear representations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-high-24

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear functions and representations
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
An engineering team represents the relationship symbolically and checks the unknown against an observed condition. The reported measurements are translated into the required mathematical form. The selected comparison condition establishes the target relationship. A line passes through (6, 50) and (8, 60). What is its slope?

CHOICES:
[
  "6",
  "4",
  "5",
  "10"
]

ANSWER: C

EXPLANATION:
Slope = (60 − 50)/(8 − 6) = 5.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-high-24",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-high-24",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Algebra",
  "skill": "Linear functions and representations",
  "subskill": "Linear functions and representations",
  "conceptId": "Algebra-linear-functions-and-representations",
  "difficulty": "easy",
  "difficultyBand": "math-high-easy",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 80,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-high-24",
  "conceptFingerprint": "Algebra-Linear functions and representations-23",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-23",
    "contextFamily": "sat-series-b-Algebra-Linear functions and representations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Algebra-Linear functions and representations-23",
    "constructionFamily": "sat-series-b|sat-mock-20|Algebra|Linear functions and representations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift",
      "two-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-high-25

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear functions
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A systems analyst converts the stated conditions into a mathematical relationship and evaluates the unknown. The quantities are connected through the model given in the scenario. The selected comparison condition establishes the target relationship. A linear model is y = 3x + 20. What is y when x = 7?

CHOICES:
[
  "82",
  "42",
  "40",
  "41"
]

ANSWER: D

EXPLANATION:
Substitute x = 7: y = 3(7) + 20 = 41.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-high-25",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-high-25",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Algebra",
  "skill": "Linear functions",
  "subskill": "Linear functions",
  "conceptId": "Algebra-linear-functions",
  "difficulty": "medium",
  "difficultyBand": "math-high-medium",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-high-25",
  "conceptFingerprint": "Algebra-Linear functions-24",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-24",
    "contextFamily": "sat-series-b-Algebra-Linear functions",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Algebra-Linear functions-24",
    "constructionFamily": "sat-series-b|sat-mock-20|Algebra|Linear functions|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-high-26

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear equations
DIFFICULTY: medium
QUESTION TYPE: student-produced-response

PROMPT:
A planning analyst models a changing quantity from a stated baseline and rate. The baseline is established before the requested quantity is determined. The selected comparison condition establishes the target relationship. A linear model is y = 8x + 19. For what value of x is y = 83?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 8

EXPLANATION:
Subtract 19 and divide by 8 to obtain x = 8.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-high-26",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-high-26",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Algebra",
  "skill": "Linear equations",
  "subskill": "Linear equations",
  "conceptId": "Algebra-linear-equations",
  "difficulty": "medium",
  "difficultyBand": "math-high-medium",
  "cognitiveDemand": "apply",
  "questionType": "student-produced-response",
  "stimulusType": "numeric-text",
  "interactionType": "student-produced-response",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-high-26",
  "conceptFingerprint": "Algebra-Linear equations-25",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-25",
    "contextFamily": "sat-series-b-Algebra-Linear equations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Algebra-Linear equations-25",
    "constructionFamily": "sat-series-b|sat-mock-20|Algebra|Linear equations|family-0",
    "answerFormat": "numeric",
    "figurePurpose": null,
    "difficultyFeatures": [
      "two-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-high-27

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear representations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A measurement team uses a stated relationship between variables to reconstruct the missing value. The calculation focuses on the condition that links the known and unknown values. The selected comparison condition establishes the target relationship. A line passes through (9, 73) and has slope 6. What is its y-intercept?

CHOICES:
[
  "19",
  "18",
  "20",
  "38"
]

ANSWER: A

EXPLANATION:
Using y = mx + b gives b = 19.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-high-27",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-high-27",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Algebra",
  "skill": "Linear representations",
  "subskill": "Linear representations",
  "conceptId": "Algebra-linear-representations",
  "difficulty": "medium",
  "difficultyBand": "math-high-medium",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-high-27",
  "conceptFingerprint": "Algebra-Linear representations-26",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-26",
    "contextFamily": "sat-series-b-Algebra-Linear representations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Algebra-Linear representations-26",
    "constructionFamily": "sat-series-b|sat-mock-20|Algebra|Linear representations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-high-28

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear functions and representations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A project analyst translates the reported quantities into an equation before evaluating the target. The requested value follows from the relationship among the measured quantities. The selected comparison condition establishes the target relationship. A line passes through (10, 59) and (12, 67). What is its slope?

CHOICES:
[
  "5",
  "4",
  "8",
  "3"
]

ANSWER: B

EXPLANATION:
Slope = (67 − 59)/(12 − 10) = 4.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-high-28",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-high-28",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Algebra",
  "skill": "Linear functions and representations",
  "subskill": "Linear functions and representations",
  "conceptId": "Algebra-linear-functions-and-representations",
  "difficulty": "medium",
  "difficultyBand": "math-high-medium",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-high-28",
  "conceptFingerprint": "Algebra-Linear functions and representations-27",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-27",
    "contextFamily": "sat-series-b-Algebra-Linear functions and representations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Algebra-Linear functions and representations-27",
    "constructionFamily": "sat-series-b|sat-mock-20|Algebra|Linear functions and representations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift",
      "two-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-high-29

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear functions
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A data specialist translates the stated relationship into a mathematical model before determining the requested value. The calculation uses the reported relationship directly. The selected comparison condition establishes the target relationship. A linear model is y = 2x + 19. What is y when x = 11?

CHOICES:
[
  "40",
  "42",
  "41",
  "82"
]

ANSWER: C

EXPLANATION:
Substitute x = 11: y = 2(11) + 19 = 41.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-high-29",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-high-29",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Algebra",
  "skill": "Linear functions",
  "subskill": "Linear functions",
  "conceptId": "Algebra-linear-functions",
  "difficulty": "medium",
  "difficultyBand": "math-high-medium",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-high-29",
  "conceptFingerprint": "Algebra-Linear functions-28",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-28",
    "contextFamily": "sat-series-b-Algebra-Linear functions",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Algebra-Linear functions-28",
    "constructionFamily": "sat-series-b|sat-mock-20|Algebra|Linear functions|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-high-30

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Exponential equations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
An engineering team represents the relationship symbolically and checks the unknown against an observed condition. The stated quantities provide enough information to identify the target. The selected comparison condition establishes the target relationship. If 3^x = 81, what is x?

CHOICES:
[
  "5",
  "8",
  "3",
  "4"
]

ANSWER: D

EXPLANATION:
Equal powers with the same base have equal exponents, so x = 4.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-high-30",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-high-30",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Advanced Math",
  "skill": "Exponential equations",
  "subskill": "Exponential equations",
  "conceptId": "Advanced Math-exponential-equations",
  "difficulty": "medium",
  "difficultyBand": "math-high-medium",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-high-30",
  "conceptFingerprint": "Advanced Math-Exponential equations-29",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-29",
    "contextFamily": "sat-series-b-Advanced Math-Exponential equations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Advanced Math-Exponential equations-29",
    "constructionFamily": "sat-series-b|sat-mock-20|Advanced Math|Exponential equations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-high-31

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic functions and representations
DIFFICULTY: medium
QUESTION TYPE: student-produced-response

PROMPT:
A systems analyst converts the stated conditions into a mathematical relationship and evaluates the unknown. The model provides the constraint needed to determine the target. The selected comparison condition establishes the target relationship. For f(x) = (x − 20414)² + 20409, what is the minimum value of f?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 20409

EXPLANATION:
The square is minimized at 0, so the minimum is 20409.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-high-31",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-high-31",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Advanced Math",
  "skill": "Quadratic functions and representations",
  "subskill": "Quadratic functions and representations",
  "conceptId": "Advanced Math-quadratic-functions-and-representations",
  "difficulty": "medium",
  "difficultyBand": "math-high-medium",
  "cognitiveDemand": "apply",
  "questionType": "student-produced-response",
  "stimulusType": "quadratic",
  "interactionType": "student-produced-response",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": {
    "type": "parabola",
    "equation": "y = 1x² − 40828x + 416751805",
    "x_range": [
      20404,
      20424
    ],
    "visualVariant": "sat-mock-20-math-math-module-2-high-31"
  },
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-high-31",
  "conceptFingerprint": "Advanced Math-Quadratic functions and representations-30",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-30",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic functions and representations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Advanced Math-Quadratic functions and representations-30",
    "constructionFamily": "sat-series-b|sat-mock-20|Advanced Math|Quadratic functions and representations|family-0",
    "answerFormat": "numeric",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "representation-shift",
      "multi-step",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "advanced math|parabola|{equation:y = <n>x² − <n>x + <n>|type:parabola|x_range:[<n>,<n>]}|data:advanced math|parabola|{equation:y = 1x² − 40828x + 416751805|type:parabola|x_range:[20404,20424]}",
    "figureStructureFingerprint": "advanced math|parabola|{equation:y = <n>x² − <n>x + <n>|type:parabola|x_range:[<n>,<n>]}",
    "figureDataFingerprint": "advanced math|parabola|{equation:y = 1x² − 40828x + 416751805|type:parabola|x_range:[20404,20424]}"
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-high-32

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic parameter reasoning
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A planning analyst models a changing quantity from a stated baseline and rate. The unknown is isolated from the stated condition. The selected comparison condition establishes the target relationship. For 3x² − 30x + k = 0, the equation has exactly one real solution. What is k?

CHOICES:
[
  "75",
  "74",
  "150",
  "76"
]

ANSWER: A

EXPLANATION:
A repeated root requires the discriminant to equal zero.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-high-32",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-high-32",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Advanced Math",
  "skill": "Quadratic parameter reasoning",
  "subskill": "Quadratic parameter reasoning",
  "conceptId": "Advanced Math-quadratic-parameter-reasoning",
  "difficulty": "hard",
  "difficultyBand": "math-high-hard",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-high-32",
  "conceptFingerprint": "Advanced Math-Quadratic parameter reasoning-31",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-31",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic parameter reasoning",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Advanced Math-Quadratic parameter reasoning-31",
    "constructionFamily": "sat-series-b|sat-mock-20|Advanced Math|Quadratic parameter reasoning|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "parameter-reasoning",
      "constraint-inference",
      "multi-step",
      "strategic-choice"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-high-33

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic equations
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A measurement team uses a stated relationship between variables to reconstruct the missing value. The mathematical relationship is evaluated using the given measurements. The selected comparison condition establishes the target relationship. A quadratic has roots 2 and 6. What is the sum of the roots?

CHOICES:
[
  "9",
  "8",
  "7",
  "16"
]

ANSWER: B

EXPLANATION:
Add the two roots: 2 + 6 = 8.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-high-33",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-high-33",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Advanced Math",
  "skill": "Quadratic equations",
  "subskill": "Quadratic equations",
  "conceptId": "Advanced Math-quadratic-equations",
  "difficulty": "hard",
  "difficultyBand": "math-high-hard",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-high-33",
  "conceptFingerprint": "Advanced Math-Quadratic equations-32",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-32",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic equations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Advanced Math-Quadratic equations-32",
    "constructionFamily": "sat-series-b|sat-mock-20|Advanced Math|Quadratic equations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step",
      "strategic-choice",
      "multi-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-high-34

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Exponential equations
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A project analyst translates the reported quantities into an equation before evaluating the target. The reported measurements are translated into the required mathematical form. The selected comparison condition establishes the target relationship. If 2^x = 16, what is x?

CHOICES:
[
  "5",
  "3",
  "4",
  "8"
]

ANSWER: C

EXPLANATION:
Equal powers with the same base have equal exponents, so x = 4.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-high-34",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-high-34",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Advanced Math",
  "skill": "Exponential equations",
  "subskill": "Exponential equations",
  "conceptId": "Advanced Math-exponential-equations",
  "difficulty": "hard",
  "difficultyBand": "math-high-hard",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-high-34",
  "conceptFingerprint": "Advanced Math-Exponential equations-33",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-33",
    "contextFamily": "sat-series-b-Advanced Math-Exponential equations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Advanced Math-Exponential equations-33",
    "constructionFamily": "sat-series-b|sat-mock-20|Advanced Math|Exponential equations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift",
      "strategic-choice",
      "multi-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-high-35

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic functions and representations
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A data specialist translates the stated relationship into a mathematical model before determining the requested value. The quantities are connected through the model given in the scenario. The selected comparison condition establishes the target relationship. For f(x) = (x − 20405)² + 20406, what is the minimum value of f?

CHOICES:
[
  "20407",
  "20405",
  "40812",
  "20406"
]

ANSWER: D

EXPLANATION:
The square is minimized at 0, so the minimum is 20406.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-high-35",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-high-35",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Advanced Math",
  "skill": "Quadratic functions and representations",
  "subskill": "Quadratic functions and representations",
  "conceptId": "Advanced Math-quadratic-functions-and-representations",
  "difficulty": "hard",
  "difficultyBand": "math-high-hard",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "quadratic",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": {
    "type": "parabola",
    "equation": "y = 1x² − 40810x + 416384431",
    "x_range": [
      20395,
      20415
    ],
    "visualVariant": "sat-mock-20-math-math-module-2-high-35"
  },
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-high-35",
  "conceptFingerprint": "Advanced Math-Quadratic functions and representations-34",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-34",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic functions and representations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Advanced Math-Quadratic functions and representations-34",
    "constructionFamily": "sat-series-b|sat-mock-20|Advanced Math|Quadratic functions and representations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "representation-shift",
      "multi-step",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "advanced math|parabola|{equation:y = <n>x² − <n>x + <n>|type:parabola|x_range:[<n>,<n>]}|data:advanced math|parabola|{equation:y = 1x² − 40810x + 416384431|type:parabola|x_range:[20395,20415]}",
    "figureStructureFingerprint": "advanced math|parabola|{equation:y = <n>x² − <n>x + <n>|type:parabola|x_range:[<n>,<n>]}",
    "figureDataFingerprint": "advanced math|parabola|{equation:y = 1x² − 40810x + 416384431|type:parabola|x_range:[20395,20415]}"
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-high-36

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic parameter reasoning
DIFFICULTY: hard
QUESTION TYPE: student-produced-response

PROMPT:
A research coordinator compares linked measurements and uses the reported constraint to determine the result. The baseline is established before the requested quantity is determined. The selected comparison condition establishes the target relationship. For 5x² − 40x + k = 0, the equation has exactly one real solution. What is k?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 80

EXPLANATION:
A repeated root requires the discriminant to equal zero.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-high-36",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-high-36",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Advanced Math",
  "skill": "Quadratic parameter reasoning",
  "subskill": "Quadratic parameter reasoning",
  "conceptId": "Advanced Math-quadratic-parameter-reasoning",
  "difficulty": "hard",
  "difficultyBand": "math-high-hard",
  "cognitiveDemand": "analyze",
  "questionType": "student-produced-response",
  "stimulusType": "numeric-text",
  "interactionType": "student-produced-response",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-high-36",
  "conceptFingerprint": "Advanced Math-Quadratic parameter reasoning-35",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-35",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic parameter reasoning",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Advanced Math-Quadratic parameter reasoning-35",
    "constructionFamily": "sat-series-b|sat-mock-20|Advanced Math|Quadratic parameter reasoning|family-0",
    "answerFormat": "numeric",
    "figurePurpose": null,
    "difficultyFeatures": [
      "parameter-reasoning",
      "constraint-inference",
      "multi-step",
      "strategic-choice"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-high-37

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Problem-Solving and Data Analysis
SKILL: Percentages
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A field researcher compares two measured states and reconstructs the unknown quantity from the reported relationship. The calculation focuses on the condition that links the known and unknown values. The selected comparison condition establishes the target relationship. A survey includes 453 responses. 31% select option A. How many responses select A?

CHOICES:
[
  "140.43",
  "141.43",
  "139.43",
  "280.86"
]

ANSWER: A

EXPLANATION:
Multiply 453 by 31/100.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-high-37",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-high-37",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Problem-Solving and Data Analysis",
  "skill": "Percentages",
  "subskill": "Percentages",
  "conceptId": "Problem-Solving and Data Analysis-percentages",
  "difficulty": "hard",
  "difficultyBand": "math-high-hard",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-high-37",
  "conceptFingerprint": "Problem-Solving and Data Analysis-Percentages-36",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-36",
    "contextFamily": "sat-series-b-Problem-Solving and Data Analysis-Percentages",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Problem-Solving and Data Analysis-Percentages-36",
    "constructionFamily": "sat-series-b|sat-mock-20|Problem-Solving and Data Analysis|Percentages|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step",
      "strategic-choice",
      "multi-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-high-38

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Problem-Solving and Data Analysis
SKILL: Data models
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A quality analyst checks how a reported change follows from the quantities given in the scenario. The requested value follows from the relationship among the measured quantities. The selected comparison condition establishes the target relationship. A data set is modeled by y = 4x + 11. What y-value is predicted when x = 6?

CHOICES:
[
  "36",
  "35",
  "34",
  "70"
]

ANSWER: B

EXPLANATION:
Substitute x = 6 into the model.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-high-38",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-high-38",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Problem-Solving and Data Analysis",
  "skill": "Data models",
  "subskill": "Data models",
  "conceptId": "Problem-Solving and Data Analysis-data-models",
  "difficulty": "hard",
  "difficultyBand": "math-high-hard",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "scatter",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": {
    "type": "scatter_plot",
    "points": [
      [
        1,
        20411
      ],
      [
        2,
        20416
      ],
      [
        3,
        20421
      ],
      [
        4,
        20409
      ],
      [
        5,
        20414
      ],
      [
        6,
        20419
      ]
    ],
    "visualVariant": "sat-mock-20-math-math-module-2-high-38"
  },
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-high-38",
  "conceptFingerprint": "Problem-Solving and Data Analysis-Data models-37",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-37",
    "contextFamily": "sat-series-b-Problem-Solving and Data Analysis-Data models",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Problem-Solving and Data Analysis-Data models-37",
    "constructionFamily": "sat-series-b|sat-mock-20|Problem-Solving and Data Analysis|Data models|family-0",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "data-interpretation",
      "representation-shift",
      "strategic-choice",
      "multi-step"
    ],
    "figureOriginalityFingerprint": "problem-solving and data analysis|scatter_plot|{points:[[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>]]|type:scatter_plot}|data:problem-solving and data analysis|scatter_plot|{points:[[1,20411],[2,20416],[3,20421],[4,20409],[5,20414],[6,20419]]|type:scatter_plot}",
    "figureStructureFingerprint": "problem-solving and data analysis|scatter_plot|{points:[[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>]]|type:scatter_plot}",
    "figureDataFingerprint": "problem-solving and data analysis|scatter_plot|{points:[[1,20411],[2,20416],[3,20421],[4,20409],[5,20414],[6,20419]]|type:scatter_plot}"
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-high-39

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Problem-Solving and Data Analysis
SKILL: Measures of spread
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A monitoring team relates the measured values through the stated mathematical condition. The calculation uses the reported relationship directly. The selected comparison condition establishes the target relationship. A data set has first quartile 15 and third quartile 37. What is the interquartile range?

CHOICES:
[
  "23",
  "21",
  "22",
  "44"
]

ANSWER: C

EXPLANATION:
IQR equals Q3 minus Q1.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-high-39",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-high-39",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Problem-Solving and Data Analysis",
  "skill": "Measures of spread",
  "subskill": "Measures of spread",
  "conceptId": "Problem-Solving and Data Analysis-measures-of-spread",
  "difficulty": "hard",
  "difficultyBand": "math-high-hard",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-high-39",
  "conceptFingerprint": "Problem-Solving and Data Analysis-Measures of spread-38",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-38",
    "contextFamily": "sat-series-b-Problem-Solving and Data Analysis-Measures of spread",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Problem-Solving and Data Analysis-Measures of spread-38",
    "constructionFamily": "sat-series-b|sat-mock-20|Problem-Solving and Data Analysis|Measures of spread|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step",
      "strategic-choice",
      "multi-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-high-40

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Problem-Solving and Data Analysis
SKILL: Weighted means
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A resource planner compares a starting condition with a later condition to determine the requested quantity. The stated quantities provide enough information to identify the target. The selected comparison condition establishes the target relationship. Group A has 19 observations with mean 19; Group B has 33 observations with mean 35. What is the combined mean?

CHOICES:
[
  "30.15",
  "28.15",
  "58.3",
  "29.15"
]

ANSWER: D

EXPLANATION:
Use the weighted total divided by the combined number of observations.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-high-40",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-high-40",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Problem-Solving and Data Analysis",
  "skill": "Weighted means",
  "subskill": "Weighted means",
  "conceptId": "Problem-Solving and Data Analysis-weighted-means",
  "difficulty": "hard",
  "difficultyBand": "math-high-hard",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-high-40",
  "conceptFingerprint": "Problem-Solving and Data Analysis-Weighted means-39",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-39",
    "contextFamily": "sat-series-b-Problem-Solving and Data Analysis-Weighted means",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Problem-Solving and Data Analysis-Weighted means-39",
    "constructionFamily": "sat-series-b|sat-mock-20|Problem-Solving and Data Analysis|Weighted means|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "data-interpretation",
      "multi-step",
      "strategic-choice"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-high-41

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Geometry and Trigonometry
SKILL: Geometry and measurement
DIFFICULTY: hard
QUESTION TYPE: student-produced-response

PROMPT:
An operations analyst uses the stated model to connect the observed quantities and identify the requested value. The model provides the constraint needed to determine the target. The selected comparison condition establishes the target relationship. A triangle has base 20418 and height 20416. What is its area?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 208426944

EXPLANATION:
Use one-half times base times height.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-high-41",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-high-41",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Geometry and Trigonometry",
  "skill": "Geometry and measurement",
  "subskill": "Geometry and measurement",
  "conceptId": "Geometry and Trigonometry-geometry-and-measurement",
  "difficulty": "hard",
  "difficultyBand": "math-high-hard",
  "cognitiveDemand": "analyze",
  "questionType": "student-produced-response",
  "stimulusType": "geometry",
  "interactionType": "student-produced-response",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": {
    "type": "geometry",
    "shape": "triangle",
    "values": {
      "base": 20418,
      "height": 20416
    },
    "visualVariant": "sat-mock-20-math-math-module-2-high-41"
  },
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-high-41",
  "conceptFingerprint": "Geometry and Trigonometry-Geometry and measurement-40",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-40",
    "contextFamily": "sat-series-b-Geometry and Trigonometry-Geometry and measurement",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Geometry and Trigonometry-Geometry and measurement-40",
    "constructionFamily": "sat-series-b|sat-mock-20|Geometry and Trigonometry|Geometry and measurement|family-0",
    "answerFormat": "numeric",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "multi-step",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:<n>|height:<n>}}|data:geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:20418|height:20416}}",
    "figureStructureFingerprint": "geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:<n>|height:<n>}}",
    "figureDataFingerprint": "geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:20418|height:20416}}"
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-high-42

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Geometry and Trigonometry
SKILL: Circles
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
An engineering team represents the relationship symbolically and checks the unknown against an observed condition. The unknown is isolated from the stated condition. The selected comparison condition establishes the target relationship. A circle has radius 20407. What is its area in terms of π?

CHOICES:
[
  "416445649π",
  "416445649π + 1",
  "416445649π − 1",
  "none of these"
]

ANSWER: A

EXPLANATION:
Area equals πr².

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-high-42",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-high-42",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Geometry and Trigonometry",
  "skill": "Circles",
  "subskill": "Circles",
  "conceptId": "Geometry and Trigonometry-circles",
  "difficulty": "hard",
  "difficultyBand": "math-high-hard",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "geometry",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": {
    "type": "circle",
    "radius": 20407,
    "center_label": "O",
    "visualVariant": "sat-mock-20-math-math-module-2-high-42"
  },
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-high-42",
  "conceptFingerprint": "Geometry and Trigonometry-Circles-41",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-41",
    "contextFamily": "sat-series-b-Geometry and Trigonometry-Circles",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Geometry and Trigonometry-Circles-41",
    "constructionFamily": "sat-series-b|sat-mock-20|Geometry and Trigonometry|Circles|family-0",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "direct-application",
      "single-step",
      "strategic-choice",
      "multi-step"
    ],
    "figureOriginalityFingerprint": "geometry and trigonometry|circle|{center_label:o|radius:<n>|type:circle}|data:geometry and trigonometry|circle|{center_label:o|radius:20407|type:circle}",
    "figureStructureFingerprint": "geometry and trigonometry|circle|{center_label:o|radius:<n>|type:circle}",
    "figureDataFingerprint": "geometry and trigonometry|circle|{center_label:o|radius:20407|type:circle}"
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-high-43

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Geometry and Trigonometry
SKILL: Right triangles
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A systems analyst converts the stated conditions into a mathematical relationship and evaluates the unknown. The mathematical relationship is evaluated using the given measurements. The selected comparison condition establishes the target relationship. A right triangle has legs 20415 and 20409. What is its area?

CHOICES:
[
  "208324868.5",
  "208324867.5",
  "208324866.5",
  "416649735"
]

ANSWER: B

EXPLANATION:
Area equals one-half the product of the perpendicular legs.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-high-43",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-high-43",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Geometry and Trigonometry",
  "skill": "Right triangles",
  "subskill": "Right triangles",
  "conceptId": "Geometry and Trigonometry-right-triangles",
  "difficulty": "hard",
  "difficultyBand": "math-high-hard",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "geometry",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": {
    "type": "right_triangle",
    "leg_a": 20415,
    "leg_b": 20409,
    "labels": {
      "a": "a",
      "b": "b",
      "c": "c"
    },
    "unknown_side": "c",
    "visualVariant": "sat-mock-20-math-math-module-2-high-43"
  },
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-high-43",
  "conceptFingerprint": "Geometry and Trigonometry-Right triangles-42",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-42",
    "contextFamily": "sat-series-b-Geometry and Trigonometry-Right triangles",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Geometry and Trigonometry-Right triangles-42",
    "constructionFamily": "sat-series-b|sat-mock-20|Geometry and Trigonometry|Right triangles|family-0",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "representation-shift",
      "multi-step",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "geometry and trigonometry|right_triangle|{labels:{a:a|b:b|c:c}|leg_a:<n>|leg_b:<n>|type:right_triangle|unknown_side:c}|data:geometry and trigonometry|right_triangle|{labels:{a:a|b:b|c:c}|leg_a:20415|leg_b:20409|type:right_triangle|unknown_side:c}",
    "figureStructureFingerprint": "geometry and trigonometry|right_triangle|{labels:{a:a|b:b|c:c}|leg_a:<n>|leg_b:<n>|type:right_triangle|unknown_side:c}",
    "figureDataFingerprint": "geometry and trigonometry|right_triangle|{labels:{a:a|b:b|c:c}|leg_a:20415|leg_b:20409|type:right_triangle|unknown_side:c}"
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-high-44

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Geometry and Trigonometry
SKILL: Similarity and scaling
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A planning analyst models a changing quantity from a stated baseline and rate. The reported measurements are translated into the required mathematical form. The selected comparison condition establishes the target relationship. Two similar figures have corresponding lengths in the ratio 5102:1. The smaller figure has area 51050. What is the larger area?

CHOICES:
[
  "1328852124201",
  "1328852124199",
  "1328852124200",
  "2657704248400"
]

ANSWER: C

EXPLANATION:
Areas scale by the square of the length ratio.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-high-44",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-high-44",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Geometry and Trigonometry",
  "skill": "Similarity and scaling",
  "subskill": "Similarity and scaling",
  "conceptId": "Geometry and Trigonometry-similarity-and-scaling",
  "difficulty": "hard",
  "difficultyBand": "math-high-hard",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "geometry",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": {
    "type": "geometry",
    "shape": "similar-figures",
    "values": {
      "scale": 5102,
      "area": 51050
    },
    "visualVariant": "sat-mock-20-math-math-module-2-high-44"
  },
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-high-44",
  "conceptFingerprint": "Geometry and Trigonometry-Similarity and scaling-43",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-43",
    "contextFamily": "sat-series-b-Geometry and Trigonometry-Similarity and scaling",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Geometry and Trigonometry-Similarity and scaling-43",
    "constructionFamily": "sat-series-b|sat-mock-20|Geometry and Trigonometry|Similarity and scaling|family-0",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "multi-step",
      "constraint-inference",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:<n>|scale:<n>}}|data:geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:51050|scale:5102}}",
    "figureStructureFingerprint": "geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:<n>|scale:<n>}}",
    "figureDataFingerprint": "geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:51050|scale:5102}}"
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-standard-45

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear functions
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A monitoring team relates the measured values through the stated mathematical condition. The quantities are connected through the model given in the scenario. The reported comparison condition establishes the target relationship. A linear model is y = 8x + 23. What is y when x = 5?

CHOICES:
[
  "126",
  "64",
  "62",
  "63"
]

ANSWER: D

EXPLANATION:
Substitute x = 5: y = 8(5) + 23 = 63.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-standard-45",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-standard-45",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Algebra",
  "skill": "Linear functions",
  "subskill": "Linear functions",
  "conceptId": "Algebra-linear-functions",
  "difficulty": "easy",
  "difficultyBand": "math-standard-easy",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 80,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-standard-45",
  "conceptFingerprint": "Algebra-Linear functions-44",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-44",
    "contextFamily": "sat-series-b-Algebra-Linear functions",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Algebra-Linear functions-44",
    "constructionFamily": "sat-series-b|sat-mock-20|Algebra|Linear functions|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-standard-46

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear equations
DIFFICULTY: easy
QUESTION TYPE: student-produced-response

PROMPT:
A resource planner compares a starting condition with a later condition to determine the requested quantity. The baseline is established before the requested quantity is determined. The reported comparison condition establishes the target relationship. A linear model is y = 6x + 23. For what value of x is y = 59?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 6

EXPLANATION:
Subtract 23 and divide by 6 to obtain x = 6.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-standard-46",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-standard-46",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Algebra",
  "skill": "Linear equations",
  "subskill": "Linear equations",
  "conceptId": "Algebra-linear-equations",
  "difficulty": "easy",
  "difficultyBand": "math-standard-easy",
  "cognitiveDemand": "apply",
  "questionType": "student-produced-response",
  "stimulusType": "numeric-text",
  "interactionType": "student-produced-response",
  "timingMode": "timed",
  "estimatedTimeSeconds": 80,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-standard-46",
  "conceptFingerprint": "Algebra-Linear equations-45",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-45",
    "contextFamily": "sat-series-b-Algebra-Linear equations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Algebra-Linear equations-45",
    "constructionFamily": "sat-series-b|sat-mock-20|Algebra|Linear equations|family-0",
    "answerFormat": "numeric",
    "figurePurpose": null,
    "difficultyFeatures": [
      "two-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-standard-47

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear representations
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
An operations analyst uses the stated model to connect the observed quantities and identify the requested value. The calculation focuses on the condition that links the known and unknown values. The reported comparison condition establishes the target relationship. A line passes through (7, 51) and has slope 4. What is its y-intercept?

CHOICES:
[
  "23",
  "22",
  "24",
  "46"
]

ANSWER: A

EXPLANATION:
Using y = mx + b gives b = 23.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-standard-47",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-standard-47",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Algebra",
  "skill": "Linear representations",
  "subskill": "Linear representations",
  "conceptId": "Algebra-linear-representations",
  "difficulty": "easy",
  "difficultyBand": "math-standard-easy",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 80,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-standard-47",
  "conceptFingerprint": "Algebra-Linear representations-46",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-46",
    "contextFamily": "sat-series-b-Algebra-Linear representations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Algebra-Linear representations-46",
    "constructionFamily": "sat-series-b|sat-mock-20|Algebra|Linear representations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-standard-48

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear functions and representations
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
An engineering team represents the relationship symbolically and checks the unknown against an observed condition. The requested value follows from the relationship among the measured quantities. The reported comparison condition establishes the target relationship. A line passes through (8, 39) and (10, 43). What is its slope?

CHOICES:
[
  "3",
  "2",
  "4",
  "1"
]

ANSWER: B

EXPLANATION:
Slope = (43 − 39)/(10 − 8) = 2.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-standard-48",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-standard-48",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Algebra",
  "skill": "Linear functions and representations",
  "subskill": "Linear functions and representations",
  "conceptId": "Algebra-linear-functions-and-representations",
  "difficulty": "easy",
  "difficultyBand": "math-standard-easy",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 80,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-standard-48",
  "conceptFingerprint": "Algebra-Linear functions and representations-47",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-47",
    "contextFamily": "sat-series-b-Algebra-Linear functions and representations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Algebra-Linear functions and representations-47",
    "constructionFamily": "sat-series-b|sat-mock-20|Algebra|Linear functions and representations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift",
      "two-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-standard-49

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear functions
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A systems analyst converts the stated conditions into a mathematical relationship and evaluates the unknown. The calculation uses the reported relationship directly. The reported comparison condition establishes the target relationship. A linear model is y = 7x + 22. What is y when x = 9?

CHOICES:
[
  "84",
  "86",
  "85",
  "170"
]

ANSWER: C

EXPLANATION:
Substitute x = 9: y = 7(9) + 22 = 85.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-standard-49",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-standard-49",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Algebra",
  "skill": "Linear functions",
  "subskill": "Linear functions",
  "conceptId": "Algebra-linear-functions",
  "difficulty": "easy",
  "difficultyBand": "math-standard-easy",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 80,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-standard-49",
  "conceptFingerprint": "Algebra-Linear functions-48",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-48",
    "contextFamily": "sat-series-b-Algebra-Linear functions",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Algebra-Linear functions-48",
    "constructionFamily": "sat-series-b|sat-mock-20|Algebra|Linear functions|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-standard-50

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear equations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A planning analyst models a changing quantity from a stated baseline and rate. The stated quantities provide enough information to identify the target. The reported comparison condition establishes the target relationship. A linear model is y = 5x + 22. For what value of x is y = 72?

CHOICES:
[
  "11",
  "20",
  "9",
  "10"
]

ANSWER: D

EXPLANATION:
Subtract 22 and divide by 5 to obtain x = 10.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-standard-50",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-standard-50",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Algebra",
  "skill": "Linear equations",
  "subskill": "Linear equations",
  "conceptId": "Algebra-linear-equations",
  "difficulty": "medium",
  "difficultyBand": "math-standard-medium",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-standard-50",
  "conceptFingerprint": "Algebra-Linear equations-49",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-49",
    "contextFamily": "sat-series-b-Algebra-Linear equations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Algebra-Linear equations-49",
    "constructionFamily": "sat-series-b|sat-mock-20|Algebra|Linear equations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "two-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-standard-51

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear representations
DIFFICULTY: medium
QUESTION TYPE: student-produced-response

PROMPT:
A measurement team uses a stated relationship between variables to reconstruct the missing value. The model provides the constraint needed to determine the target. The reported comparison condition establishes the target relationship. A line passes through (11, 55) and has slope 3. What is its y-intercept?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 22

EXPLANATION:
Using y = mx + b gives b = 22.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-standard-51",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-standard-51",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Algebra",
  "skill": "Linear representations",
  "subskill": "Linear representations",
  "conceptId": "Algebra-linear-representations",
  "difficulty": "medium",
  "difficultyBand": "math-standard-medium",
  "cognitiveDemand": "apply",
  "questionType": "student-produced-response",
  "stimulusType": "numeric-text",
  "interactionType": "student-produced-response",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-standard-51",
  "conceptFingerprint": "Algebra-Linear representations-50",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-50",
    "contextFamily": "sat-series-b-Algebra-Linear representations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Algebra-Linear representations-50",
    "constructionFamily": "sat-series-b|sat-mock-20|Algebra|Linear representations|family-0",
    "answerFormat": "numeric",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-standard-52

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic parameter reasoning
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A resource planner compares a starting condition with a later condition to determine the requested quantity. The unknown is isolated from the stated condition. The reported comparison condition establishes the target relationship. For 3x² − 42x + k = 0, the equation has exactly one real solution. What is k?

CHOICES:
[
  "147",
  "146",
  "294",
  "148"
]

ANSWER: A

EXPLANATION:
A repeated root requires the discriminant to equal zero.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-standard-52",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-standard-52",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Advanced Math",
  "skill": "Quadratic parameter reasoning",
  "subskill": "Quadratic parameter reasoning",
  "conceptId": "Advanced Math-quadratic-parameter-reasoning",
  "difficulty": "medium",
  "difficultyBand": "math-standard-medium",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-standard-52",
  "conceptFingerprint": "Advanced Math-Quadratic parameter reasoning-51",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-51",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic parameter reasoning",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Advanced Math-Quadratic parameter reasoning-51",
    "constructionFamily": "sat-series-b|sat-mock-20|Advanced Math|Quadratic parameter reasoning|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "parameter-reasoning",
      "constraint-inference",
      "multi-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-standard-53

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic equations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
An operations analyst uses the stated model to connect the observed quantities and identify the requested value. The mathematical relationship is evaluated using the given measurements. The reported comparison condition establishes the target relationship. A quadratic has roots 5 and 10. What is the sum of the roots?

CHOICES:
[
  "16",
  "15",
  "14",
  "30"
]

ANSWER: B

EXPLANATION:
Add the two roots: 5 + 10 = 15.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-standard-53",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-standard-53",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Advanced Math",
  "skill": "Quadratic equations",
  "subskill": "Quadratic equations",
  "conceptId": "Advanced Math-quadratic-equations",
  "difficulty": "medium",
  "difficultyBand": "math-standard-medium",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-standard-53",
  "conceptFingerprint": "Advanced Math-Quadratic equations-52",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-52",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic equations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Advanced Math-Quadratic equations-52",
    "constructionFamily": "sat-series-b|sat-mock-20|Advanced Math|Quadratic equations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-standard-54

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Exponential equations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
An engineering team represents the relationship symbolically and checks the unknown against an observed condition. The reported measurements are translated into the required mathematical form. The reported comparison condition establishes the target relationship. If 2^x = 8, what is x?

CHOICES:
[
  "4",
  "2",
  "3",
  "6"
]

ANSWER: C

EXPLANATION:
Equal powers with the same base have equal exponents, so x = 3.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-standard-54",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-standard-54",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Advanced Math",
  "skill": "Exponential equations",
  "subskill": "Exponential equations",
  "conceptId": "Advanced Math-exponential-equations",
  "difficulty": "medium",
  "difficultyBand": "math-standard-medium",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-standard-54",
  "conceptFingerprint": "Advanced Math-Exponential equations-53",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-53",
    "contextFamily": "sat-series-b-Advanced Math-Exponential equations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Advanced Math-Exponential equations-53",
    "constructionFamily": "sat-series-b|sat-mock-20|Advanced Math|Exponential equations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-standard-55

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic functions and representations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A systems analyst converts the stated conditions into a mathematical relationship and evaluates the unknown. The quantities are connected through the model given in the scenario. The reported comparison condition establishes the target relationship. For f(x) = (x − 20408)² + 20405, what is the minimum value of f?

CHOICES:
[
  "20406",
  "20404",
  "40810",
  "20405"
]

ANSWER: D

EXPLANATION:
The square is minimized at 0, so the minimum is 20405.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-standard-55",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-standard-55",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Advanced Math",
  "skill": "Quadratic functions and representations",
  "subskill": "Quadratic functions and representations",
  "conceptId": "Advanced Math-quadratic-functions-and-representations",
  "difficulty": "medium",
  "difficultyBand": "math-standard-medium",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "quadratic",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": {
    "type": "parabola",
    "equation": "y = 1x² − 40816x + 416506869",
    "x_range": [
      20398,
      20418
    ],
    "visualVariant": "sat-mock-20-math-math-module-2-standard-55"
  },
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-standard-55",
  "conceptFingerprint": "Advanced Math-Quadratic functions and representations-54",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-54",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic functions and representations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Advanced Math-Quadratic functions and representations-54",
    "constructionFamily": "sat-series-b|sat-mock-20|Advanced Math|Quadratic functions and representations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "representation-shift",
      "multi-step",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "advanced math|parabola|{equation:y = <n>x² − <n>x + <n>|type:parabola|x_range:[<n>,<n>]}|data:advanced math|parabola|{equation:y = 1x² − 40816x + 416506869|type:parabola|x_range:[20398,20418]}",
    "figureStructureFingerprint": "advanced math|parabola|{equation:y = <n>x² − <n>x + <n>|type:parabola|x_range:[<n>,<n>]}",
    "figureDataFingerprint": "advanced math|parabola|{equation:y = 1x² − 40816x + 416506869|type:parabola|x_range:[20398,20418]}"
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-standard-56

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic parameter reasoning
DIFFICULTY: medium
QUESTION TYPE: student-produced-response

PROMPT:
A planning analyst models a changing quantity from a stated baseline and rate. The baseline is established before the requested quantity is determined. The reported comparison condition establishes the target relationship. For 5x² − 60x + k = 0, the equation has exactly one real solution. What is k?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 180

EXPLANATION:
A repeated root requires the discriminant to equal zero.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-standard-56",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-standard-56",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Advanced Math",
  "skill": "Quadratic parameter reasoning",
  "subskill": "Quadratic parameter reasoning",
  "conceptId": "Advanced Math-quadratic-parameter-reasoning",
  "difficulty": "medium",
  "difficultyBand": "math-standard-medium",
  "cognitiveDemand": "apply",
  "questionType": "student-produced-response",
  "stimulusType": "numeric-text",
  "interactionType": "student-produced-response",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-standard-56",
  "conceptFingerprint": "Advanced Math-Quadratic parameter reasoning-55",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-55",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic parameter reasoning",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Advanced Math-Quadratic parameter reasoning-55",
    "constructionFamily": "sat-series-b|sat-mock-20|Advanced Math|Quadratic parameter reasoning|family-0",
    "answerFormat": "numeric",
    "figurePurpose": null,
    "difficultyFeatures": [
      "parameter-reasoning",
      "constraint-inference",
      "multi-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-standard-57

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic equations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A measurement team uses a stated relationship between variables to reconstruct the missing value. The calculation focuses on the condition that links the known and unknown values. The reported comparison condition establishes the target relationship. A quadratic has roots 9 and 14. What is the sum of the roots?

CHOICES:
[
  "23",
  "24",
  "22",
  "46"
]

ANSWER: A

EXPLANATION:
Add the two roots: 9 + 14 = 23.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-standard-57",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-standard-57",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Advanced Math",
  "skill": "Quadratic equations",
  "subskill": "Quadratic equations",
  "conceptId": "Advanced Math-quadratic-equations",
  "difficulty": "medium",
  "difficultyBand": "math-standard-medium",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-standard-57",
  "conceptFingerprint": "Advanced Math-Quadratic equations-56",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-56",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic equations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Advanced Math-Quadratic equations-56",
    "constructionFamily": "sat-series-b|sat-mock-20|Advanced Math|Quadratic equations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-standard-58

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Exponential equations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A project analyst translates the reported quantities into an equation before evaluating the target. The requested value follows from the relationship among the measured quantities. The reported comparison condition establishes the target relationship. If 6^x = 36, what is x?

CHOICES:
[
  "3",
  "2",
  "1",
  "4"
]

ANSWER: B

EXPLANATION:
Equal powers with the same base have equal exponents, so x = 2.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-standard-58",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-standard-58",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Advanced Math",
  "skill": "Exponential equations",
  "subskill": "Exponential equations",
  "conceptId": "Advanced Math-exponential-equations",
  "difficulty": "medium",
  "difficultyBand": "math-standard-medium",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-standard-58",
  "conceptFingerprint": "Advanced Math-Exponential equations-57",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-57",
    "contextFamily": "sat-series-b-Advanced Math-Exponential equations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Advanced Math-Exponential equations-57",
    "constructionFamily": "sat-series-b|sat-mock-20|Advanced Math|Exponential equations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-standard-59

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Problem-Solving and Data Analysis
SKILL: Measures of spread
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A data specialist translates the stated relationship into a mathematical model before determining the requested value. The calculation uses the reported relationship directly. The reported comparison condition establishes the target relationship. A data set has first quartile 21 and third quartile 43. What is the interquartile range?

CHOICES:
[
  "23",
  "21",
  "22",
  "44"
]

ANSWER: C

EXPLANATION:
IQR equals Q3 minus Q1.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-standard-59",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-standard-59",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Problem-Solving and Data Analysis",
  "skill": "Measures of spread",
  "subskill": "Measures of spread",
  "conceptId": "Problem-Solving and Data Analysis-measures-of-spread",
  "difficulty": "hard",
  "difficultyBand": "math-standard-hard",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-standard-59",
  "conceptFingerprint": "Problem-Solving and Data Analysis-Measures of spread-58",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-58",
    "contextFamily": "sat-series-b-Problem-Solving and Data Analysis-Measures of spread",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Problem-Solving and Data Analysis-Measures of spread-58",
    "constructionFamily": "sat-series-b|sat-mock-20|Problem-Solving and Data Analysis|Measures of spread|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step",
      "strategic-choice",
      "multi-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-standard-60

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Problem-Solving and Data Analysis
SKILL: Weighted means
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A research coordinator compares linked measurements and uses the reported constraint to determine the result. The stated quantities provide enough information to identify the target. The reported comparison condition establishes the target relationship. Group A has 22 observations with mean 20; Group B has 28 observations with mean 38. What is the combined mean?

CHOICES:
[
  "31.08",
  "29.08",
  "60.16",
  "30.08"
]

ANSWER: D

EXPLANATION:
Use the weighted total divided by the combined number of observations.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-standard-60",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-standard-60",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Problem-Solving and Data Analysis",
  "skill": "Weighted means",
  "subskill": "Weighted means",
  "conceptId": "Problem-Solving and Data Analysis-weighted-means",
  "difficulty": "hard",
  "difficultyBand": "math-standard-hard",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-standard-60",
  "conceptFingerprint": "Problem-Solving and Data Analysis-Weighted means-59",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-59",
    "contextFamily": "sat-series-b-Problem-Solving and Data Analysis-Weighted means",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Problem-Solving and Data Analysis-Weighted means-59",
    "constructionFamily": "sat-series-b|sat-mock-20|Problem-Solving and Data Analysis|Weighted means|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "data-interpretation",
      "multi-step",
      "strategic-choice"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-standard-61

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Problem-Solving and Data Analysis
SKILL: Percentages
DIFFICULTY: hard
QUESTION TYPE: student-produced-response

PROMPT:
A field researcher compares two measured states and reconstructs the unknown quantity from the reported relationship. The model provides the constraint needed to determine the target. The reported comparison condition establishes the target relationship. A survey includes 697 responses. 39% select option A. How many responses select A?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 271.83

EXPLANATION:
Multiply 697 by 39/100.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-standard-61",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-standard-61",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Problem-Solving and Data Analysis",
  "skill": "Percentages",
  "subskill": "Percentages",
  "conceptId": "Problem-Solving and Data Analysis-percentages",
  "difficulty": "hard",
  "difficultyBand": "math-standard-hard",
  "cognitiveDemand": "analyze",
  "questionType": "student-produced-response",
  "stimulusType": "numeric-text",
  "interactionType": "student-produced-response",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-standard-61",
  "conceptFingerprint": "Problem-Solving and Data Analysis-Percentages-60",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-60",
    "contextFamily": "sat-series-b-Problem-Solving and Data Analysis-Percentages",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Problem-Solving and Data Analysis-Percentages-60",
    "constructionFamily": "sat-series-b|sat-mock-20|Problem-Solving and Data Analysis|Percentages|family-0",
    "answerFormat": "numeric",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step",
      "strategic-choice",
      "multi-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-standard-62

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Problem-Solving and Data Analysis
SKILL: Data models
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A quality analyst checks how a reported change follows from the quantities given in the scenario. The unknown is isolated from the stated condition. The reported comparison condition establishes the target relationship. A data set is modeled by y = 3x + 20. What y-value is predicted when x = 3?

CHOICES:
[
  "29",
  "30",
  "28",
  "58"
]

ANSWER: A

EXPLANATION:
Substitute x = 3 into the model.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-standard-62",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-standard-62",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Problem-Solving and Data Analysis",
  "skill": "Data models",
  "subskill": "Data models",
  "conceptId": "Problem-Solving and Data Analysis-data-models",
  "difficulty": "hard",
  "difficultyBand": "math-standard-hard",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "scatter",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": {
    "type": "scatter_plot",
    "points": [
      [
        1,
        20420
      ],
      [
        2,
        20405
      ],
      [
        3,
        20407
      ],
      [
        4,
        20409
      ],
      [
        5,
        20411
      ],
      [
        6,
        20413
      ]
    ],
    "visualVariant": "sat-mock-20-math-math-module-2-standard-62"
  },
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-standard-62",
  "conceptFingerprint": "Problem-Solving and Data Analysis-Data models-61",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-61",
    "contextFamily": "sat-series-b-Problem-Solving and Data Analysis-Data models",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Problem-Solving and Data Analysis-Data models-61",
    "constructionFamily": "sat-series-b|sat-mock-20|Problem-Solving and Data Analysis|Data models|family-0",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "data-interpretation",
      "representation-shift",
      "strategic-choice",
      "multi-step"
    ],
    "figureOriginalityFingerprint": "problem-solving and data analysis|scatter_plot|{points:[[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>]]|type:scatter_plot}|data:problem-solving and data analysis|scatter_plot|{points:[[1,20420],[2,20405],[3,20407],[4,20409],[5,20411],[6,20413]]|type:scatter_plot}",
    "figureStructureFingerprint": "problem-solving and data analysis|scatter_plot|{points:[[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>]]|type:scatter_plot}",
    "figureDataFingerprint": "problem-solving and data analysis|scatter_plot|{points:[[1,20420],[2,20405],[3,20407],[4,20409],[5,20411],[6,20413]]|type:scatter_plot}"
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-standard-63

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Geometry and Trigonometry
SKILL: Right triangles
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A monitoring team relates the measured values through the stated mathematical condition. The mathematical relationship is evaluated using the given measurements. The reported comparison condition establishes the target relationship. A right triangle has legs 20405 and 20415. What is its area?

CHOICES:
[
  "208284038.5",
  "208284037.5",
  "208284036.5",
  "416568075"
]

ANSWER: B

EXPLANATION:
Area equals one-half the product of the perpendicular legs.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-standard-63",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-standard-63",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Geometry and Trigonometry",
  "skill": "Right triangles",
  "subskill": "Right triangles",
  "conceptId": "Geometry and Trigonometry-right-triangles",
  "difficulty": "hard",
  "difficultyBand": "math-standard-hard",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "geometry",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": {
    "type": "right_triangle",
    "leg_a": 20405,
    "leg_b": 20415,
    "labels": {
      "a": "a",
      "b": "b",
      "c": "c"
    },
    "unknown_side": "c",
    "visualVariant": "sat-mock-20-math-math-module-2-standard-63"
  },
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-standard-63",
  "conceptFingerprint": "Geometry and Trigonometry-Right triangles-62",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-62",
    "contextFamily": "sat-series-b-Geometry and Trigonometry-Right triangles",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Geometry and Trigonometry-Right triangles-62",
    "constructionFamily": "sat-series-b|sat-mock-20|Geometry and Trigonometry|Right triangles|family-0",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "representation-shift",
      "multi-step",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "geometry and trigonometry|right_triangle|{labels:{a:a|b:b|c:c}|leg_a:<n>|leg_b:<n>|type:right_triangle|unknown_side:c}|data:geometry and trigonometry|right_triangle|{labels:{a:a|b:b|c:c}|leg_a:20405|leg_b:20415|type:right_triangle|unknown_side:c}",
    "figureStructureFingerprint": "geometry and trigonometry|right_triangle|{labels:{a:a|b:b|c:c}|leg_a:<n>|leg_b:<n>|type:right_triangle|unknown_side:c}",
    "figureDataFingerprint": "geometry and trigonometry|right_triangle|{labels:{a:a|b:b|c:c}|leg_a:20405|leg_b:20415|type:right_triangle|unknown_side:c}"
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-standard-64

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Geometry and Trigonometry
SKILL: Similarity and scaling
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A resource planner compares a starting condition with a later condition to determine the requested quantity. The reported measurements are translated into the required mathematical form. The reported comparison condition establishes the target relationship. Two similar figures have corresponding lengths in the ratio 5102:1. The smaller figure has area 51037. What is the larger area?

CHOICES:
[
  "1328513728949",
  "1328513728947",
  "1328513728948",
  "2657027457896"
]

ANSWER: C

EXPLANATION:
Areas scale by the square of the length ratio.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-standard-64",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-standard-64",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Geometry and Trigonometry",
  "skill": "Similarity and scaling",
  "subskill": "Similarity and scaling",
  "conceptId": "Geometry and Trigonometry-similarity-and-scaling",
  "difficulty": "hard",
  "difficultyBand": "math-standard-hard",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "geometry",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": {
    "type": "geometry",
    "shape": "similar-figures",
    "values": {
      "scale": 5102,
      "area": 51037
    },
    "visualVariant": "sat-mock-20-math-math-module-2-standard-64"
  },
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-standard-64",
  "conceptFingerprint": "Geometry and Trigonometry-Similarity and scaling-63",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-63",
    "contextFamily": "sat-series-b-Geometry and Trigonometry-Similarity and scaling",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Geometry and Trigonometry-Similarity and scaling-63",
    "constructionFamily": "sat-series-b|sat-mock-20|Geometry and Trigonometry|Similarity and scaling|family-0",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "multi-step",
      "constraint-inference",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:<n>|scale:<n>}}|data:geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:51037|scale:5102}}",
    "figureStructureFingerprint": "geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:<n>|scale:<n>}}",
    "figureDataFingerprint": "geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:51037|scale:5102}}"
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-standard-65

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Geometry and Trigonometry
SKILL: Geometry and measurement
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
An operations analyst uses the stated model to connect the observed quantities and identify the requested value. The quantities are connected through the model given in the scenario. The reported comparison condition establishes the target relationship. A triangle has base 20408 and height 20407. What is its area?

CHOICES:
[
  "416466056",
  "208233029",
  "208233027",
  "208233028"
]

ANSWER: D

EXPLANATION:
Use one-half times base times height.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-standard-65",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-standard-65",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Geometry and Trigonometry",
  "skill": "Geometry and measurement",
  "subskill": "Geometry and measurement",
  "conceptId": "Geometry and Trigonometry-geometry-and-measurement",
  "difficulty": "hard",
  "difficultyBand": "math-standard-hard",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "geometry",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": {
    "type": "geometry",
    "shape": "triangle",
    "values": {
      "base": 20408,
      "height": 20407
    },
    "visualVariant": "sat-mock-20-math-math-module-2-standard-65"
  },
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-standard-65",
  "conceptFingerprint": "Geometry and Trigonometry-Geometry and measurement-64",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-64",
    "contextFamily": "sat-series-b-Geometry and Trigonometry-Geometry and measurement",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Geometry and Trigonometry-Geometry and measurement-64",
    "constructionFamily": "sat-series-b|sat-mock-20|Geometry and Trigonometry|Geometry and measurement|family-0",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "multi-step",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:<n>|height:<n>}}|data:geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:20408|height:20407}}",
    "figureStructureFingerprint": "geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:<n>|height:<n>}}",
    "figureDataFingerprint": "geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:20408|height:20407}}"
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-standard-66

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Geometry and Trigonometry
SKILL: Circles
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
An engineering team represents the relationship symbolically and checks the unknown against an observed condition. The baseline is established before the requested quantity is determined. The reported comparison condition establishes the target relationship. A circle has radius 20416. What is its area in terms of π?

CHOICES:
[
  "416813056π",
  "416813056π+1",
  "416813056π−1",
  "none"
]

ANSWER: A

EXPLANATION:
Area equals πr².

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-standard-66",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-standard-66",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Geometry and Trigonometry",
  "skill": "Circles",
  "subskill": "Circles",
  "conceptId": "Geometry and Trigonometry-circles",
  "difficulty": "hard",
  "difficultyBand": "math-standard-hard",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "geometry",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": {
    "type": "circle",
    "radius": 20416,
    "center_label": "O",
    "visualVariant": "sat-mock-20-math-math-module-2-standard-66"
  },
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-standard-66",
  "conceptFingerprint": "Geometry and Trigonometry-Circles-65",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-65",
    "contextFamily": "sat-series-b-Geometry and Trigonometry-Circles",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Geometry and Trigonometry-Circles-65",
    "constructionFamily": "sat-series-b|sat-mock-20|Geometry and Trigonometry|Circles|family-0",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "direct-application",
      "single-step",
      "strategic-choice",
      "multi-step"
    ],
    "figureOriginalityFingerprint": "geometry and trigonometry|circle|{center_label:o|radius:<n>|type:circle}|data:geometry and trigonometry|circle|{center_label:o|radius:20416|type:circle}",
    "figureStructureFingerprint": "geometry and trigonometry|circle|{center_label:o|radius:<n>|type:circle}",
    "figureDataFingerprint": "geometry and trigonometry|circle|{center_label:o|radius:20416|type:circle}"
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-low-67

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear representations
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A field researcher compares two measured states and reconstructs the unknown quantity from the reported relationship. The calculation focuses on the condition that links the known and unknown values. The observed comparison condition establishes the target relationship. A line passes through (6, 20) and has slope 2. What is its y-intercept?

CHOICES:
[
  "8",
  "7",
  "9",
  "16"
]

ANSWER: A

EXPLANATION:
Using y = mx + b gives b = 8.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-low-67",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-low-67",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Algebra",
  "skill": "Linear representations",
  "subskill": "Linear representations",
  "conceptId": "Algebra-linear-representations",
  "difficulty": "easy",
  "difficultyBand": "math-low-easy",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 80,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-low-67",
  "conceptFingerprint": "Algebra-Linear representations-66",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-66",
    "contextFamily": "sat-series-b-Algebra-Linear representations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Algebra-Linear representations-66",
    "constructionFamily": "sat-series-b|sat-mock-20|Algebra|Linear representations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-low-68

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear functions and representations
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A quality analyst checks how a reported change follows from the quantities given in the scenario. The requested value follows from the relationship among the measured quantities. The observed comparison condition establishes the target relationship. A line passes through (7, 56) and (9, 70). What is its slope?

CHOICES:
[
  "8",
  "7",
  "14",
  "6"
]

ANSWER: B

EXPLANATION:
Slope = (70 − 56)/(9 − 7) = 7.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-low-68",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-low-68",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Algebra",
  "skill": "Linear functions and representations",
  "subskill": "Linear functions and representations",
  "conceptId": "Algebra-linear-functions-and-representations",
  "difficulty": "easy",
  "difficultyBand": "math-low-easy",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 80,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-low-68",
  "conceptFingerprint": "Algebra-Linear functions and representations-67",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-67",
    "contextFamily": "sat-series-b-Algebra-Linear functions and representations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Algebra-Linear functions and representations-67",
    "constructionFamily": "sat-series-b|sat-mock-20|Algebra|Linear functions and representations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift",
      "two-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-low-69

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear functions
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A monitoring team relates the measured values through the stated mathematical condition. The calculation uses the reported relationship directly. The observed comparison condition establishes the target relationship. A linear model is y = 5x + 7. What is y when x = 8?

CHOICES:
[
  "46",
  "48",
  "47",
  "94"
]

ANSWER: C

EXPLANATION:
Substitute x = 8: y = 5(8) + 7 = 47.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-low-69",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-low-69",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Algebra",
  "skill": "Linear functions",
  "subskill": "Linear functions",
  "conceptId": "Algebra-linear-functions",
  "difficulty": "easy",
  "difficultyBand": "math-low-easy",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 80,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-low-69",
  "conceptFingerprint": "Algebra-Linear functions-68",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-68",
    "contextFamily": "sat-series-b-Algebra-Linear functions",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Algebra-Linear functions-68",
    "constructionFamily": "sat-series-b|sat-mock-20|Algebra|Linear functions|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-low-70

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear equations
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A resource planner compares a starting condition with a later condition to determine the requested quantity. The stated quantities provide enough information to identify the target. The observed comparison condition establishes the target relationship. A linear model is y = 3x + 7. For what value of x is y = 34?

CHOICES:
[
  "10",
  "18",
  "8",
  "9"
]

ANSWER: D

EXPLANATION:
Subtract 7 and divide by 3 to obtain x = 9.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-low-70",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-low-70",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Algebra",
  "skill": "Linear equations",
  "subskill": "Linear equations",
  "conceptId": "Algebra-linear-equations",
  "difficulty": "easy",
  "difficultyBand": "math-low-easy",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 80,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-low-70",
  "conceptFingerprint": "Algebra-Linear equations-69",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-69",
    "contextFamily": "sat-series-b-Algebra-Linear equations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Algebra-Linear equations-69",
    "constructionFamily": "sat-series-b|sat-mock-20|Algebra|Linear equations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "two-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-low-71

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear representations
DIFFICULTY: easy
QUESTION TYPE: student-produced-response

PROMPT:
An operations analyst uses the stated model to connect the observed quantities and identify the requested value. The model provides the constraint needed to determine the target. The observed comparison condition establishes the target relationship. A line passes through (10, 86) and has slope 8. What is its y-intercept?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 6

EXPLANATION:
Using y = mx + b gives b = 6.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-low-71",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-low-71",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Algebra",
  "skill": "Linear representations",
  "subskill": "Linear representations",
  "conceptId": "Algebra-linear-representations",
  "difficulty": "easy",
  "difficultyBand": "math-low-easy",
  "cognitiveDemand": "apply",
  "questionType": "student-produced-response",
  "stimulusType": "numeric-text",
  "interactionType": "student-produced-response",
  "timingMode": "timed",
  "estimatedTimeSeconds": 80,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-low-71",
  "conceptFingerprint": "Algebra-Linear representations-70",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-70",
    "contextFamily": "sat-series-b-Algebra-Linear representations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Algebra-Linear representations-70",
    "constructionFamily": "sat-series-b|sat-mock-20|Algebra|Linear representations|family-0",
    "answerFormat": "numeric",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-low-72

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear functions and representations
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
An engineering team represents the relationship symbolically and checks the unknown against an observed condition. The unknown is isolated from the stated condition. The observed comparison condition establishes the target relationship. A line passes through (11, 72) and (13, 84). What is its slope?

CHOICES:
[
  "6",
  "5",
  "12",
  "7"
]

ANSWER: A

EXPLANATION:
Slope = (84 − 72)/(13 − 11) = 6.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-low-72",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-low-72",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Algebra",
  "skill": "Linear functions and representations",
  "subskill": "Linear functions and representations",
  "conceptId": "Algebra-linear-functions-and-representations",
  "difficulty": "easy",
  "difficultyBand": "math-low-easy",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 80,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-low-72",
  "conceptFingerprint": "Algebra-Linear functions and representations-71",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-71",
    "contextFamily": "sat-series-b-Algebra-Linear functions and representations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Algebra-Linear functions and representations-71",
    "constructionFamily": "sat-series-b|sat-mock-20|Algebra|Linear functions and representations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift",
      "two-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-low-73

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear functions
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A systems analyst converts the stated conditions into a mathematical relationship and evaluates the unknown. The mathematical relationship is evaluated using the given measurements. The observed comparison condition establishes the target relationship. A linear model is y = 4x + 6. What is y when x = 12?

CHOICES:
[
  "55",
  "54",
  "53",
  "108"
]

ANSWER: B

EXPLANATION:
Substitute x = 12: y = 4(12) + 6 = 54.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-low-73",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-low-73",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Algebra",
  "skill": "Linear functions",
  "subskill": "Linear functions",
  "conceptId": "Algebra-linear-functions",
  "difficulty": "easy",
  "difficultyBand": "math-low-easy",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 80,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-low-73",
  "conceptFingerprint": "Algebra-Linear functions-72",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-72",
    "contextFamily": "sat-series-b-Algebra-Linear functions",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Algebra-Linear functions-72",
    "constructionFamily": "sat-series-b|sat-mock-20|Algebra|Linear functions|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-low-74

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Exponential equations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A quality analyst checks how a reported change follows from the quantities given in the scenario. The reported measurements are translated into the required mathematical form. The observed comparison condition establishes the target relationship. If 2^x = 4, what is x?

CHOICES:
[
  "3",
  "1",
  "2",
  "4"
]

ANSWER: C

EXPLANATION:
Equal powers with the same base have equal exponents, so x = 2.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-low-74",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-low-74",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Advanced Math",
  "skill": "Exponential equations",
  "subskill": "Exponential equations",
  "conceptId": "Advanced Math-exponential-equations",
  "difficulty": "medium",
  "difficultyBand": "math-low-medium",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-low-74",
  "conceptFingerprint": "Advanced Math-Exponential equations-73",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-73",
    "contextFamily": "sat-series-b-Advanced Math-Exponential equations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Advanced Math-Exponential equations-73",
    "constructionFamily": "sat-series-b|sat-mock-20|Advanced Math|Exponential equations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-low-75

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic functions and representations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A monitoring team relates the measured values through the stated mathematical condition. The quantities are connected through the model given in the scenario. The observed comparison condition establishes the target relationship. For f(x) = (x − 20411)² + 20404, what is the minimum value of f?

CHOICES:
[
  "20405",
  "20403",
  "40808",
  "20404"
]

ANSWER: D

EXPLANATION:
The square is minimized at 0, so the minimum is 20404.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-low-75",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-low-75",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Advanced Math",
  "skill": "Quadratic functions and representations",
  "subskill": "Quadratic functions and representations",
  "conceptId": "Advanced Math-quadratic-functions-and-representations",
  "difficulty": "medium",
  "difficultyBand": "math-low-medium",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "quadratic",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": {
    "type": "parabola",
    "equation": "y = 1x² − 40822x + 416629325",
    "x_range": [
      20401,
      20421
    ],
    "visualVariant": "sat-mock-20-math-math-module-2-low-75"
  },
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-low-75",
  "conceptFingerprint": "Advanced Math-Quadratic functions and representations-74",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-74",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic functions and representations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Advanced Math-Quadratic functions and representations-74",
    "constructionFamily": "sat-series-b|sat-mock-20|Advanced Math|Quadratic functions and representations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "representation-shift",
      "multi-step",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "advanced math|parabola|{equation:y = <n>x² − <n>x + <n>|type:parabola|x_range:[<n>,<n>]}|data:advanced math|parabola|{equation:y = 1x² − 40822x + 416629325|type:parabola|x_range:[20401,20421]}",
    "figureStructureFingerprint": "advanced math|parabola|{equation:y = <n>x² − <n>x + <n>|type:parabola|x_range:[<n>,<n>]}",
    "figureDataFingerprint": "advanced math|parabola|{equation:y = 1x² − 40822x + 416629325|type:parabola|x_range:[20401,20421]}"
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-low-76

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic parameter reasoning
DIFFICULTY: medium
QUESTION TYPE: student-produced-response

PROMPT:
A resource planner compares a starting condition with a later condition to determine the requested quantity. The baseline is established before the requested quantity is determined. The observed comparison condition establishes the target relationship. For 5x² − 80x + k = 0, the equation has exactly one real solution. What is k?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 320

EXPLANATION:
A repeated root requires the discriminant to equal zero.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-low-76",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-low-76",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Advanced Math",
  "skill": "Quadratic parameter reasoning",
  "subskill": "Quadratic parameter reasoning",
  "conceptId": "Advanced Math-quadratic-parameter-reasoning",
  "difficulty": "medium",
  "difficultyBand": "math-low-medium",
  "cognitiveDemand": "apply",
  "questionType": "student-produced-response",
  "stimulusType": "numeric-text",
  "interactionType": "student-produced-response",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-low-76",
  "conceptFingerprint": "Advanced Math-Quadratic parameter reasoning-75",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-75",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic parameter reasoning",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Advanced Math-Quadratic parameter reasoning-75",
    "constructionFamily": "sat-series-b|sat-mock-20|Advanced Math|Quadratic parameter reasoning|family-0",
    "answerFormat": "numeric",
    "figurePurpose": null,
    "difficultyFeatures": [
      "parameter-reasoning",
      "constraint-inference",
      "multi-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-low-77

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic equations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
An operations analyst uses the stated model to connect the observed quantities and identify the requested value. The calculation focuses on the condition that links the known and unknown values. The observed comparison condition establishes the target relationship. A quadratic has roots 12 and 18. What is the sum of the roots?

CHOICES:
[
  "30",
  "31",
  "29",
  "60"
]

ANSWER: A

EXPLANATION:
Add the two roots: 12 + 18 = 30.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-low-77",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-low-77",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Advanced Math",
  "skill": "Quadratic equations",
  "subskill": "Quadratic equations",
  "conceptId": "Advanced Math-quadratic-equations",
  "difficulty": "medium",
  "difficultyBand": "math-low-medium",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-low-77",
  "conceptFingerprint": "Advanced Math-Quadratic equations-76",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-76",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic equations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Advanced Math-Quadratic equations-76",
    "constructionFamily": "sat-series-b|sat-mock-20|Advanced Math|Quadratic equations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-low-78

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Exponential equations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
An engineering team represents the relationship symbolically and checks the unknown against an observed condition. The requested value follows from the relationship among the measured quantities. The observed comparison condition establishes the target relationship. If 6^x = 46656, what is x?

CHOICES:
[
  "7",
  "6",
  "5",
  "12"
]

ANSWER: B

EXPLANATION:
Equal powers with the same base have equal exponents, so x = 6.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-low-78",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-low-78",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Advanced Math",
  "skill": "Exponential equations",
  "subskill": "Exponential equations",
  "conceptId": "Advanced Math-exponential-equations",
  "difficulty": "medium",
  "difficultyBand": "math-low-medium",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-low-78",
  "conceptFingerprint": "Advanced Math-Exponential equations-77",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-77",
    "contextFamily": "sat-series-b-Advanced Math-Exponential equations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Advanced Math-Exponential equations-77",
    "constructionFamily": "sat-series-b|sat-mock-20|Advanced Math|Exponential equations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-low-79

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic functions and representations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A systems analyst converts the stated conditions into a mathematical relationship and evaluates the unknown. The calculation uses the reported relationship directly. The observed comparison condition establishes the target relationship. For f(x) = (x − 20415)² + 20411, what is the minimum value of f?

CHOICES:
[
  "20412",
  "20410",
  "20411",
  "40822"
]

ANSWER: C

EXPLANATION:
The square is minimized at 0, so the minimum is 20411.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-low-79",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-low-79",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Advanced Math",
  "skill": "Quadratic functions and representations",
  "subskill": "Quadratic functions and representations",
  "conceptId": "Advanced Math-quadratic-functions-and-representations",
  "difficulty": "medium",
  "difficultyBand": "math-low-medium",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "quadratic",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": {
    "type": "parabola",
    "equation": "y = 1x² − 40830x + 416792636",
    "x_range": [
      20405,
      20425
    ],
    "visualVariant": "sat-mock-20-math-math-module-2-low-79"
  },
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-low-79",
  "conceptFingerprint": "Advanced Math-Quadratic functions and representations-78",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-78",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic functions and representations",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Advanced Math-Quadratic functions and representations-78",
    "constructionFamily": "sat-series-b|sat-mock-20|Advanced Math|Quadratic functions and representations|family-0",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "representation-shift",
      "multi-step",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "advanced math|parabola|{equation:y = <n>x² − <n>x + <n>|type:parabola|x_range:[<n>,<n>]}|data:advanced math|parabola|{equation:y = 1x² − 40830x + 416792636|type:parabola|x_range:[20405,20425]}",
    "figureStructureFingerprint": "advanced math|parabola|{equation:y = <n>x² − <n>x + <n>|type:parabola|x_range:[<n>,<n>]}",
    "figureDataFingerprint": "advanced math|parabola|{equation:y = 1x² − 40830x + 416792636|type:parabola|x_range:[20405,20425]}"
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-low-80

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic parameter reasoning
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A planning analyst models a changing quantity from a stated baseline and rate. The stated quantities provide enough information to identify the target. The observed comparison condition establishes the target relationship. For 1x² − 16x + k = 0, the equation has exactly one real solution. What is k?

CHOICES:
[
  "65",
  "63",
  "128",
  "64"
]

ANSWER: D

EXPLANATION:
A repeated root requires the discriminant to equal zero.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-low-80",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-low-80",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Advanced Math",
  "skill": "Quadratic parameter reasoning",
  "subskill": "Quadratic parameter reasoning",
  "conceptId": "Advanced Math-quadratic-parameter-reasoning",
  "difficulty": "medium",
  "difficultyBand": "math-low-medium",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-low-80",
  "conceptFingerprint": "Advanced Math-Quadratic parameter reasoning-79",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-79",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic parameter reasoning",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Advanced Math-Quadratic parameter reasoning-79",
    "constructionFamily": "sat-series-b|sat-mock-20|Advanced Math|Quadratic parameter reasoning|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "parameter-reasoning",
      "constraint-inference",
      "multi-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-low-81

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Problem-Solving and Data Analysis
SKILL: Percentages
DIFFICULTY: medium
QUESTION TYPE: student-produced-response

PROMPT:
A measurement team uses a stated relationship between variables to reconstruct the missing value. The model provides the constraint needed to determine the target. The observed comparison condition establishes the target relationship. A survey includes 417 responses. 56% select option A. How many responses select A?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 233.52

EXPLANATION:
Multiply 417 by 56/100.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-low-81",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-low-81",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Problem-Solving and Data Analysis",
  "skill": "Percentages",
  "subskill": "Percentages",
  "conceptId": "Problem-Solving and Data Analysis-percentages",
  "difficulty": "medium",
  "difficultyBand": "math-low-medium",
  "cognitiveDemand": "apply",
  "questionType": "student-produced-response",
  "stimulusType": "numeric-text",
  "interactionType": "student-produced-response",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-low-81",
  "conceptFingerprint": "Problem-Solving and Data Analysis-Percentages-80",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-80",
    "contextFamily": "sat-series-b-Problem-Solving and Data Analysis-Percentages",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Problem-Solving and Data Analysis-Percentages-80",
    "constructionFamily": "sat-series-b|sat-mock-20|Problem-Solving and Data Analysis|Percentages|family-0",
    "answerFormat": "numeric",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-low-82

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Problem-Solving and Data Analysis
SKILL: Data models
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A project analyst translates the reported quantities into an equation before evaluating the target. The unknown is isolated from the stated condition. The observed comparison condition establishes the target relationship. A data set is modeled by y = 9x + 15. What y-value is predicted when x = 4?

CHOICES:
[
  "51",
  "52",
  "50",
  "102"
]

ANSWER: A

EXPLANATION:
Substitute x = 4 into the model.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-low-82",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-low-82",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Problem-Solving and Data Analysis",
  "skill": "Data models",
  "subskill": "Data models",
  "conceptId": "Problem-Solving and Data Analysis-data-models",
  "difficulty": "medium",
  "difficultyBand": "math-low-medium",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "scatter",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": {
    "type": "scatter_plot",
    "points": [
      [
        1,
        20415
      ],
      [
        2,
        20405
      ],
      [
        3,
        20412
      ],
      [
        4,
        20419
      ],
      [
        5,
        20409
      ],
      [
        6,
        20416
      ]
    ],
    "visualVariant": "sat-mock-20-math-math-module-2-low-82"
  },
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-low-82",
  "conceptFingerprint": "Problem-Solving and Data Analysis-Data models-81",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-81",
    "contextFamily": "sat-series-b-Problem-Solving and Data Analysis-Data models",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Problem-Solving and Data Analysis-Data models-81",
    "constructionFamily": "sat-series-b|sat-mock-20|Problem-Solving and Data Analysis|Data models|family-0",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "data-interpretation",
      "representation-shift"
    ],
    "figureOriginalityFingerprint": "problem-solving and data analysis|scatter_plot|{points:[[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>]]|type:scatter_plot}|data:problem-solving and data analysis|scatter_plot|{points:[[1,20415],[2,20405],[3,20412],[4,20419],[5,20409],[6,20416]]|type:scatter_plot}",
    "figureStructureFingerprint": "problem-solving and data analysis|scatter_plot|{points:[[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>]]|type:scatter_plot}",
    "figureDataFingerprint": "problem-solving and data analysis|scatter_plot|{points:[[1,20415],[2,20405],[3,20412],[4,20419],[5,20409],[6,20416]]|type:scatter_plot}"
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-low-83

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Problem-Solving and Data Analysis
SKILL: Measures of spread
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A data specialist translates the stated relationship into a mathematical model before determining the requested value. The mathematical relationship is evaluated using the given measurements. The observed comparison condition establishes the target relationship. A data set has first quartile 11 and third quartile 32. What is the interquartile range?

CHOICES:
[
  "22",
  "21",
  "20",
  "42"
]

ANSWER: B

EXPLANATION:
IQR equals Q3 minus Q1.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-low-83",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-low-83",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Problem-Solving and Data Analysis",
  "skill": "Measures of spread",
  "subskill": "Measures of spread",
  "conceptId": "Problem-Solving and Data Analysis-measures-of-spread",
  "difficulty": "medium",
  "difficultyBand": "math-low-medium",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-low-83",
  "conceptFingerprint": "Problem-Solving and Data Analysis-Measures of spread-82",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-82",
    "contextFamily": "sat-series-b-Problem-Solving and Data Analysis-Measures of spread",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Problem-Solving and Data Analysis-Measures of spread-82",
    "constructionFamily": "sat-series-b|sat-mock-20|Problem-Solving and Data Analysis|Measures of spread|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-low-84

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Problem-Solving and Data Analysis
SKILL: Weighted means
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A research coordinator compares linked measurements and uses the reported constraint to determine the result. The reported measurements are translated into the required mathematical form. The observed comparison condition establishes the target relationship. Group A has 16 observations with mean 28; Group B has 20 observations with mean 32. What is the combined mean?

CHOICES:
[
  "31.22",
  "29.22",
  "30.22",
  "60.44"
]

ANSWER: C

EXPLANATION:
Use the weighted total divided by the combined number of observations.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-low-84",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-low-84",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Problem-Solving and Data Analysis",
  "skill": "Weighted means",
  "subskill": "Weighted means",
  "conceptId": "Problem-Solving and Data Analysis-weighted-means",
  "difficulty": "medium",
  "difficultyBand": "math-low-medium",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "numeric-text",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-low-84",
  "conceptFingerprint": "Problem-Solving and Data Analysis-Weighted means-83",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-83",
    "contextFamily": "sat-series-b-Problem-Solving and Data Analysis-Weighted means",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Problem-Solving and Data Analysis-Weighted means-83",
    "constructionFamily": "sat-series-b|sat-mock-20|Problem-Solving and Data Analysis|Weighted means|family-0",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "data-interpretation",
      "multi-step"
    ]
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-low-85

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Geometry and Trigonometry
SKILL: Geometry and measurement
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A field researcher compares two measured states and reconstructs the unknown quantity from the reported relationship. The quantities are connected through the model given in the scenario. The observed comparison condition establishes the target relationship. A triangle has base 20420 and height 20411. What is its area?

CHOICES:
[
  "416792620",
  "208396311",
  "208396309",
  "208396310"
]

ANSWER: D

EXPLANATION:
Use one-half times base times height.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-low-85",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-low-85",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Geometry and Trigonometry",
  "skill": "Geometry and measurement",
  "subskill": "Geometry and measurement",
  "conceptId": "Geometry and Trigonometry-geometry-and-measurement",
  "difficulty": "medium",
  "difficultyBand": "math-low-medium",
  "cognitiveDemand": "apply",
  "questionType": "multiple-choice",
  "stimulusType": "geometry",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 95,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": {
    "type": "geometry",
    "shape": "triangle",
    "values": {
      "base": 20420,
      "height": 20411
    },
    "visualVariant": "sat-mock-20-math-math-module-2-low-85"
  },
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-low-85",
  "conceptFingerprint": "Geometry and Trigonometry-Geometry and measurement-84",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-84",
    "contextFamily": "sat-series-b-Geometry and Trigonometry-Geometry and measurement",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Geometry and Trigonometry-Geometry and measurement-84",
    "constructionFamily": "sat-series-b|sat-mock-20|Geometry and Trigonometry|Geometry and measurement|family-0",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "multi-step"
    ],
    "figureOriginalityFingerprint": "geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:<n>|height:<n>}}|data:geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:20420|height:20411}}",
    "figureStructureFingerprint": "geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:<n>|height:<n>}}",
    "figureDataFingerprint": "geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:20420|height:20411}}"
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-low-86

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Geometry and Trigonometry
SKILL: Circles
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A quality analyst checks how a reported change follows from the quantities given in the scenario. The baseline is established before the requested quantity is determined. The observed comparison condition establishes the target relationship. A circle has radius 20411. What is its area in terms of π?

CHOICES:
[
  "416608921π+1",
  "416608921π",
  "416608921π−1",
  "none"
]

ANSWER: B

EXPLANATION:
Area equals πr².

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-low-86",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-low-86",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Geometry and Trigonometry",
  "skill": "Circles",
  "subskill": "Circles",
  "conceptId": "Geometry and Trigonometry-circles",
  "difficulty": "hard",
  "difficultyBand": "math-low-hard",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "geometry",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": {
    "type": "circle",
    "radius": 20411,
    "center_label": "O",
    "visualVariant": "sat-mock-20-math-math-module-2-low-86"
  },
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-low-86",
  "conceptFingerprint": "Geometry and Trigonometry-Circles-85",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-85",
    "contextFamily": "sat-series-b-Geometry and Trigonometry-Circles",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Geometry and Trigonometry-Circles-85",
    "constructionFamily": "sat-series-b|sat-mock-20|Geometry and Trigonometry|Circles|family-0",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "direct-application",
      "single-step",
      "strategic-choice",
      "multi-step"
    ],
    "figureOriginalityFingerprint": "geometry and trigonometry|circle|{center_label:o|radius:<n>|type:circle}|data:geometry and trigonometry|circle|{center_label:o|radius:20411|type:circle}",
    "figureStructureFingerprint": "geometry and trigonometry|circle|{center_label:o|radius:<n>|type:circle}",
    "figureDataFingerprint": "geometry and trigonometry|circle|{center_label:o|radius:20411|type:circle}"
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-low-87

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Geometry and Trigonometry
SKILL: Right triangles
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A monitoring team relates the measured values through the stated mathematical condition. The calculation focuses on the condition that links the known and unknown values. The observed comparison condition establishes the target relationship. A right triangle has legs 20412 and 20418. What is its area?

CHOICES:
[
  "208386108",
  "208386107",
  "208386109",
  "416772216"
]

ANSWER: A

EXPLANATION:
Area equals one-half the product of the perpendicular legs.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-low-87",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-low-87",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Geometry and Trigonometry",
  "skill": "Right triangles",
  "subskill": "Right triangles",
  "conceptId": "Geometry and Trigonometry-right-triangles",
  "difficulty": "hard",
  "difficultyBand": "math-low-hard",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "geometry",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": {
    "type": "right_triangle",
    "leg_a": 20412,
    "leg_b": 20418,
    "labels": {
      "a": "a",
      "b": "b",
      "c": "c"
    },
    "unknown_side": "c",
    "visualVariant": "sat-mock-20-math-math-module-2-low-87"
  },
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-low-87",
  "conceptFingerprint": "Geometry and Trigonometry-Right triangles-86",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-86",
    "contextFamily": "sat-series-b-Geometry and Trigonometry-Right triangles",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Geometry and Trigonometry-Right triangles-86",
    "constructionFamily": "sat-series-b|sat-mock-20|Geometry and Trigonometry|Right triangles|family-0",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "representation-shift",
      "multi-step",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "geometry and trigonometry|right_triangle|{labels:{a:a|b:b|c:c}|leg_a:<n>|leg_b:<n>|type:right_triangle|unknown_side:c}|data:geometry and trigonometry|right_triangle|{labels:{a:a|b:b|c:c}|leg_a:20412|leg_b:20418|type:right_triangle|unknown_side:c}",
    "figureStructureFingerprint": "geometry and trigonometry|right_triangle|{labels:{a:a|b:b|c:c}|leg_a:<n>|leg_b:<n>|type:right_triangle|unknown_side:c}",
    "figureDataFingerprint": "geometry and trigonometry|right_triangle|{labels:{a:a|b:b|c:c}|leg_a:20412|leg_b:20418|type:right_triangle|unknown_side:c}"
  }
}
```

### Question: sat-series-b-mock-20-math-math-module-2-low-88

STATUS: LEGACY
TEST KEY: sat-series-b-mock-20
TEST ID: sat-series-b-mock-20
SECTION: math
MODULE: math-module-2
DOMAIN: Geometry and Trigonometry
SKILL: Similarity and scaling
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A resource planner compares a starting condition with a later condition to determine the requested quantity. The requested value follows from the relationship among the measured quantities. The observed comparison condition establishes the target relationship. Two similar figures have corresponding lengths in the ratio 5106:1. The smaller figure has area 51046. What is the larger area?

CHOICES:
[
  "1330832312857",
  "1330832312856",
  "2661664625712",
  "1330832312855"
]

ANSWER: B

EXPLANATION:
Areas scale by the square of the length ratio.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-20-math-math-module-2-low-88",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-20-math-math-module-2-low-88",
  "testId": "sat-series-b-mock-20",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 20,
  "section": "math",
  "module": "math-module-2",
  "domain": "Geometry and Trigonometry",
  "skill": "Similarity and scaling",
  "subskill": "Similarity and scaling",
  "conceptId": "Geometry and Trigonometry-similarity-and-scaling",
  "difficulty": "hard",
  "difficultyBand": "math-low-hard",
  "cognitiveDemand": "analyze",
  "questionType": "multiple-choice",
  "stimulusType": "geometry",
  "interactionType": "single-select",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": {
    "type": "geometry",
    "shape": "similar-figures",
    "values": {
      "scale": 5106,
      "area": 51046
    },
    "visualVariant": "sat-mock-20-math-math-module-2-low-88"
  },
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-20-math-math-module-2-low-88",
  "conceptFingerprint": "Geometry and Trigonometry-Similarity and scaling-87",
  "tags": [
    "sat-series-b",
    "mock",
    "math",
    "apriori-original"
  ],
  "lessonIds": [],
  "sourceType": "apriori-original",
  "authoringStatus": "qc-approved",
  "status": "assembly-ready",
  "releaseEligibility": true,
  "metadata": {
    "contextKey": "sat-series-b-sat-mock-20-math-87",
    "contextFamily": "sat-series-b-Geometry and Trigonometry-Similarity and scaling",
    "applicationFingerprint": "sat-series-b-sat-mock-20-Geometry and Trigonometry-Similarity and scaling-87",
    "constructionFamily": "sat-series-b|sat-mock-20|Geometry and Trigonometry|Similarity and scaling|family-0",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "multi-step",
      "constraint-inference",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:<n>|scale:<n>}}|data:geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:51046|scale:5106}}",
    "figureStructureFingerprint": "geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:<n>|scale:<n>}}",
    "figureDataFingerprint": "geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:51046|scale:5106}}"
  }
}
```
