# SAT15 — Legacy Human-Editable Export

STATUS: LEGACY
APPROVAL: NOT APPROVED
TEST KEY: SAT15
TEST ID: sat-series-b-mock-15
ASSESSMENT VARIANT: sat-series-b
QUESTION COUNT: 196

> This file is a working copy of the frozen 30-mock production corpus. It is not launch-approved content.
> Changes here do not mutate canonical production content. Promote only explicitly approved questions through the controlled workflow.

### Question: sat-series-b-mock-15-rw-001

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: standard-english-conventions
SKILL: Boundaries
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
The estimate from the neighborhood tree study was reliable _____ only within the range represented by the data.

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
  "contentId": "sat-series-b-mock-15-rw-001",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-001",
  "testId": "sat-series-b-mock-15",
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
  "originalityFingerprint": "batch-m-calibration-sec-v2-025-boundaries-easy",
  "conceptFingerprint": "standard-english-conventions-Boundaries-easy-24",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-001-sat-mock-15-1",
    "contextFamily": "sat-series-b-science-claim-evidence-interpretation",
    "passageGenre": "science",
    "readingTopic": "whether a coating changes the stability of a battery electrode during repeated cycles",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "compound-predicate",
    "evidenceRelationship": "example-to-claim",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Cross-Text Connections",
    "passageWordCount": 63,
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
      "rhetorical_structure": "claim-evidence-interpretation",
      "evidence_relationship": "contrast",
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
      "required_inference": "Compare both passages before deciding how their claims or interpretations relate. Evidence relationship: contrast.",
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
    "qc_reviewer_notes": "Independent Batch D review failed checks 2. Correct the flagged internal structure or route the item to human review; do not bypass the gate.",
    "sourceBlueprint": "field study finds a broad pattern with an ecological limitation",
    "difficultyFeatures": [],
    "difficultyRequirements": {
      "minimumReasoningSteps": 1,
      "requiredFeatures": [],
      "distractorStandard": "one plausible procedural error"
    },
    "targetWord": null,
    "crossTextRelationship": null,
    "candidateConstructionIndex": 24,
    "candidateOnly": false,
    "productionMutation": true,
    "calibrationReconciliation": true,
    "assessmentFamily": "sat",
    "assessmentVariant": "sat-series-b",
    "assessmentNumber": 15,
    "productionTestId": "sat-series-b-mock-15",
    "productionTestKey": "sat-series-b-mock-15",
    "sourceDomain": "craft-and-structure",
    "targetDomain": "standard-english-conventions",
    "controlledReplacement": {
      "date": "2026-09-17",
      "authorization": "explicit-user-authorization",
      "authorizationScope": "exact-195-target-calibration-reconciliation-lock",
      "testKey": "sat-series-b-mock-15",
      "productionTestId": "sat-series-b-mock-15",
      "replacedQuestionId": "sat-series-b-mock-15-rw-001",
      "candidateQuestionId": "BATCH-M-CAL-SEC-025",
      "sourceDomain": "craft-and-structure",
      "targetDomain": "standard-english-conventions"
    }
  }
}
```

### Question: sat-series-b-mock-15-rw-002

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: standard-english-conventions
SKILL: Form, Structure, and Sense
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
The revised model for the community orchestra study _____ more accurate than the earlier model.

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
  "contentId": "sat-series-b-mock-15-rw-002",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-002",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-1",
  "domain": "standard-english-conventions",
  "skill": "Form, Structure, and Sense",
  "subskill": "parallel-structure",
  "conceptId": "standard-english-conventions-form-structure-and-sense",
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
  "originalityFingerprint": "batch-m-calibration-sec-v2-090-form-structure-and-sense-hard",
  "conceptFingerprint": "standard-english-conventions-Form, Structure, and Sense-hard-89",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-002-sat-mock-15-2",
    "contextFamily": "sat-series-b-literature-comparison-synthesis",
    "passageGenre": "literature",
    "readingTopic": "a student sorting letters left by a relative who avoided public attention",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "parallel-structure",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Command of Evidence",
    "passageWordCount": 62,
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Connect the selected evidence directly to the interpretation named in the question. Evidence relationship: inference.",
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
    "qc_reviewer_notes": "Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent.",
    "sourceBlueprint": "character weighs continuity against an unexpected opportunity",
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
    "candidateConstructionIndex": 89,
    "candidateOnly": false,
    "productionMutation": true,
    "calibrationReconciliation": true,
    "assessmentFamily": "sat",
    "assessmentVariant": "sat-series-b",
    "assessmentNumber": 15,
    "productionTestId": "sat-series-b-mock-15",
    "productionTestKey": "sat-series-b-mock-15",
    "sourceDomain": "information-and-ideas",
    "targetDomain": "standard-english-conventions",
    "controlledReplacement": {
      "date": "2026-09-17",
      "authorization": "explicit-user-authorization",
      "authorizationScope": "exact-195-target-calibration-reconciliation-lock",
      "testKey": "sat-series-b-mock-15",
      "productionTestId": "sat-series-b-mock-15",
      "replacedQuestionId": "sat-series-b-mock-15-rw-002",
      "candidateQuestionId": "BATCH-M-CAL-SEC-090",
      "sourceDomain": "information-and-ideas",
      "targetDomain": "standard-english-conventions"
    }
  }
}
```

### Question: sat-series-b-mock-15-rw-003

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: standard-english-conventions
SKILL: Form, Structure, and Sense
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of the spread of neighborhood associations during a period of rapid population growth drew on 1546 examples from 3 settings over 8 observation periods. The set of measurements, rather than the individual readings, _____ the basis for comparison.

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
  "contentId": "sat-series-b-mock-15-rw-003",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-003",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-003",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-003-history-social-science-claim-evidence-interpretation",
  "conceptFingerprint": "standard-english-conventions-Form, Structure, and Sense-history-social-science-2",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-003-sat-mock-15-3",
    "contextFamily": "sat-series-b-history-social-science-claim-evidence-interpretation",
    "passageGenre": "history-social-science",
    "readingTopic": "the spread of neighborhood associations during a period of rapid population growth",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "example-to-claim",
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Select the grammatical form that agrees with the sentence structure and preserves its meaning. Evidence relationship: example-to-claim.",
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

### Question: sat-series-b-mock-15-rw-004

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: expression-of-ideas
SKILL: Rhetorical Synthesis
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
Study focus: the spread of neighborhood associations during a period of rapid population growth. Observation: the evidence shows a measurable difference between the two settings. Qualification: the size of the difference depends on conditions surrounding the observation. Goal: state the result accurately without making a broader claim than the evidence supports. The analysis of museum study of how visitors move between objects with related themes drew on 1547 examples from 4 settings over 10 observation periods. The comparison was reviewed again so that the result could be stated without dropping its important qualification.

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
  "contentId": "sat-series-b-mock-15-rw-004",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-004",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-004",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-004-humanities-comparison-synthesis",
  "conceptFingerprint": "expression-of-ideas-Rhetorical Synthesis-humanities-3",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-004-sat-mock-15-4",
    "contextFamily": "sat-series-b-humanities-comparison-synthesis",
    "passageGenre": "humanities",
    "readingTopic": "a museum study of how visitors move between objects with related themes",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "relationship-reversal",
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
      "rhetorical_structure": "comparison-synthesis",
      "evidence_relationship": "relationship-reversal",
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
      "required_inference": "Select notes that fulfill the stated communication goal without adding an unsupported claim. Evidence relationship: relationship-reversal.",
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

### Question: sat-series-b-mock-15-rw-005

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: standard-english-conventions
SKILL: Boundaries
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
The estimate from the regional library survey was reliable _____ only within the range represented by the data.

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
  "contentId": "sat-series-b-mock-15-rw-005",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-005",
  "testId": "sat-series-b-mock-15",
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
  "originalityFingerprint": "batch-m-calibration-sec-v2-055-boundaries-hard",
  "conceptFingerprint": "standard-english-conventions-Boundaries-hard-54",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-005-sat-mock-15-5",
    "contextFamily": "sat-series-b-science-claim-evidence-interpretation",
    "passageGenre": "science",
    "readingTopic": "how seedlings respond to intermittent rather than constant light",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "dependent-introductory-clause",
    "evidenceRelationship": "example-to-claim",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Words in Context",
    "passageWordCount": 56,
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Use the surrounding sentence relationship to select the sense that fits this specific context. Evidence relationship: direct-support.",
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
    "candidateConstructionIndex": 54,
    "candidateOnly": false,
    "productionMutation": true,
    "calibrationReconciliation": true,
    "assessmentFamily": "sat",
    "assessmentVariant": "sat-series-b",
    "assessmentNumber": 15,
    "productionTestId": "sat-series-b-mock-15",
    "productionTestKey": "sat-series-b-mock-15",
    "sourceDomain": "craft-and-structure",
    "targetDomain": "standard-english-conventions",
    "controlledReplacement": {
      "date": "2026-09-17",
      "authorization": "explicit-user-authorization",
      "authorizationScope": "exact-195-target-calibration-reconciliation-lock",
      "testKey": "sat-series-b-mock-15",
      "productionTestId": "sat-series-b-mock-15",
      "replacedQuestionId": "sat-series-b-mock-15-rw-005",
      "candidateQuestionId": "BATCH-M-CAL-SEC-055",
      "sourceDomain": "craft-and-structure",
      "targetDomain": "standard-english-conventions"
    }
  }
}
```

### Question: sat-series-b-mock-15-rw-006

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: standard-english-conventions
SKILL: Form, Structure, and Sense
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
The revised model for the public health archive _____ more accurate than the earlier model.

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
  "contentId": "sat-series-b-mock-15-rw-006",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-006",
  "testId": "sat-series-b-mock-15",
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
  "originalityFingerprint": "batch-m-calibration-sec-v2-120-form-structure-and-sense-easy",
  "conceptFingerprint": "standard-english-conventions-Form, Structure, and Sense-easy-119",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-006-sat-mock-15-6",
    "contextFamily": "sat-series-b-literature-comparison-synthesis",
    "passageGenre": "literature",
    "readingTopic": "a musician deciding whether to preserve a family composition unchanged",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "pronoun-reference",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Central Ideas and Details",
    "passageWordCount": 65,
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
      "rhetorical_structure": "comparison-synthesis",
      "evidence_relationship": "qualified-support",
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
      "required_inference": "Identify the passage-level claim that best integrates the major information rather than a single detail. Evidence relationship: qualified-support.",
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
    "sourceBlueprint": "character weighs continuity against an unexpected opportunity",
    "difficultyFeatures": [],
    "difficultyRequirements": {
      "minimumReasoningSteps": 1,
      "requiredFeatures": [],
      "distractorStandard": "one plausible procedural error"
    },
    "targetWord": null,
    "crossTextRelationship": null,
    "candidateConstructionIndex": 119,
    "candidateOnly": false,
    "productionMutation": true,
    "calibrationReconciliation": true,
    "assessmentFamily": "sat",
    "assessmentVariant": "sat-series-b",
    "assessmentNumber": 15,
    "productionTestId": "sat-series-b-mock-15",
    "productionTestKey": "sat-series-b-mock-15",
    "sourceDomain": "information-and-ideas",
    "targetDomain": "standard-english-conventions",
    "controlledReplacement": {
      "date": "2026-09-17",
      "authorization": "explicit-user-authorization",
      "authorizationScope": "exact-195-target-calibration-reconciliation-lock",
      "testKey": "sat-series-b-mock-15",
      "productionTestId": "sat-series-b-mock-15",
      "replacedQuestionId": "sat-series-b-mock-15-rw-006",
      "candidateQuestionId": "BATCH-M-CAL-SEC-120",
      "sourceDomain": "information-and-ideas",
      "targetDomain": "standard-english-conventions"
    }
  }
}
```

### Question: sat-series-b-mock-15-rw-007

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: expression-of-ideas
SKILL: Transitions
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of community debate over whether a new transit route should follow an older commercial corridor drew on 1550 examples from 7 settings over 9 observation periods. The researchers observed a strong overall pattern. _____, the size of the effect differed among the study conditions.

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
  "contentId": "sat-series-b-mock-15-rw-007",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-007",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-007",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-007-history-social-science-claim-evidence-interpretation",
  "conceptFingerprint": "expression-of-ideas-Transitions-history-social-science-6",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-007-sat-mock-15-7",
    "contextFamily": "sat-series-b-history-social-science-claim-evidence-interpretation",
    "passageGenre": "history-social-science",
    "readingTopic": "a community debate over whether a new transit route should follow an older commercial corridor",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "contrast",
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Identify the logical relationship between the surrounding sentences before selecting the transition. Evidence relationship: contrast.",
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

### Question: sat-series-b-mock-15-rw-008

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: craft-and-structure
SKILL: Text Structure and Purpose
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of a linguist comparing how speakers signal uncertainty in two related dialects compared observations from different conditions instead of treating the first pattern as conclusive. The comparison indicates that a feature often described as decorative also served a practical communicative purpose. The result therefore supports a narrower claim than a simple comparison might initially suggest. The analysis separates what can be observed directly from what must be inferred about the creator’s intention. The analysis of linguist comparing how speakers signal uncertainty in two related dialects drew on 1551 examples from 8 settings over 4 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-008",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-008",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-008",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-008-humanities-comparison-synthesis",
  "conceptFingerprint": "craft-and-structure-Text Structure and Purpose-humanities-7",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-008-sat-mock-15-8",
    "contextFamily": "sat-series-b-humanities-comparison-synthesis",
    "passageGenre": "humanities",
    "readingTopic": "a linguist comparing how speakers signal uncertainty in two related dialects",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "inference",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Text Structure and Purpose",
    "passageWordCount": 58,
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Determine what rhetorical job the referenced information performs in the passage as a whole. Evidence relationship: inference.",
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

### Question: sat-series-b-mock-15-rw-009

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: standard-english-conventions
SKILL: Form, Structure, and Sense
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
The revised model for the urban heat survey _____ more accurate than the earlier model.

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
  "contentId": "sat-series-b-mock-15-rw-009",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-009",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-1",
  "domain": "standard-english-conventions",
  "skill": "Form, Structure, and Sense",
  "subskill": "parallel-structure",
  "conceptId": "standard-english-conventions-form-structure-and-sense",
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
  "originalityFingerprint": "batch-m-calibration-sec-v2-150-form-structure-and-sense-hard",
  "conceptFingerprint": "standard-english-conventions-Form, Structure, and Sense-hard-149",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-009-sat-mock-15-9",
    "contextFamily": "sat-series-b-science-claim-evidence-interpretation",
    "passageGenre": "science",
    "readingTopic": "the effect of water temperature on the activity of a freshwater organism",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "research-summary",
    "rhetoricalStructure": "parallel-structure",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "evaluate",
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
      "rhetorical_structure": "claim-evidence-interpretation",
      "evidence_relationship": "example-to-claim",
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
      "required_inference": "Draw only the conclusion that is warranted by the stated or strongly implied evidence. Evidence relationship: example-to-claim.",
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
    "sourceBlueprint": "character weighs continuity against an unexpected opportunity",
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
    "candidateConstructionIndex": 149,
    "candidateOnly": false,
    "productionMutation": true,
    "calibrationReconciliation": true,
    "assessmentFamily": "sat",
    "assessmentVariant": "sat-series-b",
    "assessmentNumber": 15,
    "productionTestId": "sat-series-b-mock-15",
    "productionTestKey": "sat-series-b-mock-15",
    "sourceDomain": "information-and-ideas",
    "targetDomain": "standard-english-conventions",
    "controlledReplacement": {
      "date": "2026-09-17",
      "authorization": "explicit-user-authorization",
      "authorizationScope": "exact-195-target-calibration-reconciliation-lock",
      "testKey": "sat-series-b-mock-15",
      "productionTestId": "sat-series-b-mock-15",
      "replacedQuestionId": "sat-series-b-mock-15-rw-009",
      "candidateQuestionId": "BATCH-M-CAL-SEC-150",
      "sourceDomain": "information-and-ideas",
      "targetDomain": "standard-english-conventions"
    }
  }
}
```

### Question: sat-series-b-mock-15-rw-010

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: standard-english-conventions
SKILL: Boundaries
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of traveler recognizing a familiar landscape from an unfamiliar direction drew on 1553 examples from 10 settings over 8 observation periods. The revised method produced a clearer signal _____ it required additional calibration.

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
  "contentId": "sat-series-b-mock-15-rw-010",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-010",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-010",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-010-literature-comparison-synthesis",
  "conceptFingerprint": "standard-english-conventions-Boundaries-literature-9",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-010-sat-mock-15-10",
    "contextFamily": "sat-series-b-literature-comparison-synthesis",
    "passageGenre": "literature",
    "readingTopic": "a traveler recognizing a familiar landscape from an unfamiliar direction",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Boundaries",
    "passageWordCount": 58,
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Identify the clause structure and then select punctuation that creates the required sentence boundary. Evidence relationship: relationship-reversal.",
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

### Question: sat-series-b-mock-15-rw-011

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: craft-and-structure
SKILL: Cross-Text Connections
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of municipal efforts to coordinate street markets as cities expanded compared observations from different conditions instead of treating the first pattern as conclusive. Contemporary records show that the policy produced a visible change, although the effect varied across neighborhoods. The result therefore supports a narrower claim than a simple comparison might initially suggest.

Passage 2: An account of the movement of sediment after vegetation is restored along a riverbank becomes more informative when its evidence is considered alongside the circumstances in which it was collected. A follow-up measurement supports the broad interpretation while identifying a condition that limits how widely it can be applied. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. The evidence is strongest when the regional pattern is considered alongside differences among individual communities. The analysis of municipal efforts to coordinate street markets as cities expanded drew on 1554 examples from 3 settings over 10 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-011",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-011",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-011",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-011-history-social-science-claim-evidence-interpretation",
  "conceptFingerprint": "craft-and-structure-Cross-Text Connections-history-social-science-10",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-011-sat-mock-15-11",
    "contextFamily": "sat-series-b-history-social-science-claim-evidence-interpretation",
    "passageGenre": "history-social-science",
    "readingTopic": "municipal efforts to coordinate street markets as cities expanded",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "synthesize",
    "questionConstruction": "Cross-Text Connections",
    "passageWordCount": 56,
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
      "rhetorical_structure": "claim-evidence-interpretation",
      "evidence_relationship": "direct-support",
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
      "required_inference": "Compare both passages before deciding how their claims or interpretations relate. Evidence relationship: direct-support.",
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

### Question: sat-series-b-mock-15-rw-012

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: standard-english-conventions
SKILL: Form, Structure, and Sense
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
The revised model for the historical map collection _____ more accurate than the earlier model.

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
  "contentId": "sat-series-b-mock-15-rw-012",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-012",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 1,
  "section": "reading-writing",
  "module": "rw-module-1",
  "domain": "standard-english-conventions",
  "skill": "Form, Structure, and Sense",
  "subskill": "parallel-structure",
  "conceptId": "standard-english-conventions-form-structure-and-sense",
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
  "originalityFingerprint": "batch-m-calibration-sec-v2-180-form-structure-and-sense-hard",
  "conceptFingerprint": "standard-english-conventions-Form, Structure, and Sense-hard-179",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-012-sat-mock-15-12",
    "contextFamily": "sat-series-b-humanities-comparison-synthesis",
    "passageGenre": "humanities",
    "readingTopic": "how archaeologists infer trade connections from recurring ceramic materials",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "informational-prose",
    "rhetoricalStructure": "parallel-structure",
    "evidenceRelationship": "direct-support",
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Connect the selected evidence directly to the interpretation named in the question. Evidence relationship: qualified-support.",
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
    "sourceBlueprint": "character weighs continuity against an unexpected opportunity",
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
    "candidateConstructionIndex": 179,
    "candidateOnly": false,
    "productionMutation": true,
    "calibrationReconciliation": true,
    "assessmentFamily": "sat",
    "assessmentVariant": "sat-series-b",
    "assessmentNumber": 15,
    "productionTestId": "sat-series-b-mock-15",
    "productionTestKey": "sat-series-b-mock-15",
    "sourceDomain": "information-and-ideas",
    "targetDomain": "standard-english-conventions",
    "controlledReplacement": {
      "date": "2026-09-17",
      "authorization": "explicit-user-authorization",
      "authorizationScope": "exact-195-target-calibration-reconciliation-lock",
      "testKey": "sat-series-b-mock-15",
      "productionTestId": "sat-series-b-mock-15",
      "replacedQuestionId": "sat-series-b-mock-15-rw-012",
      "candidateQuestionId": "BATCH-M-CAL-SEC-180",
      "sourceDomain": "information-and-ideas",
      "targetDomain": "standard-english-conventions"
    }
  }
}
```

### Question: sat-series-b-mock-15-rw-013

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: standard-english-conventions
SKILL: Form, Structure, and Sense
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of whether a coating changes the stability of a battery electrode during repeated cycles drew on 1556 examples from 5 settings over 7 observation periods. The set of measurements, rather than the individual readings, _____ the basis for comparison.

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
  "contentId": "sat-series-b-mock-15-rw-013",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-013",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-013",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-013-science-claim-evidence-interpretation",
  "conceptFingerprint": "standard-english-conventions-Form, Structure, and Sense-science-12",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-013-sat-mock-15-13",
    "contextFamily": "sat-series-b-science-claim-evidence-interpretation",
    "passageGenre": "science",
    "readingTopic": "whether a coating changes the stability of a battery electrode during repeated cycles",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "contrast",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Form, Structure, and Sense",
    "passageWordCount": 63,
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Select the grammatical form that agrees with the sentence structure and preserves its meaning. Evidence relationship: contrast.",
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

### Question: sat-series-b-mock-15-rw-014

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: expression-of-ideas
SKILL: Rhetorical Synthesis
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
Study focus: a community debate over whether a new transit route should follow an older commercial corridor. Observation: the evidence shows a measurable difference between the two settings. Qualification: the size of the difference depends on conditions surrounding the observation. Goal: state the result accurately without making a broader claim than the evidence supports. The analysis of student sorting letters left by a relative who avoided public attention drew on 1557 examples from 6 settings over 9 observation periods. The comparison was reviewed again so that the result could be stated without dropping its important qualification.

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
  "contentId": "sat-series-b-mock-15-rw-014",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-014",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-014",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-014-literature-comparison-synthesis",
  "conceptFingerprint": "expression-of-ideas-Rhetorical Synthesis-literature-13",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-014-sat-mock-15-14",
    "contextFamily": "sat-series-b-literature-comparison-synthesis",
    "passageGenre": "literature",
    "readingTopic": "a student sorting letters left by a relative who avoided public attention",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "inference",
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
      "rhetorical_structure": "comparison-synthesis",
      "evidence_relationship": "inference",
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
      "required_inference": "Select notes that fulfill the stated communication goal without adding an unsupported claim. Evidence relationship: inference.",
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

### Question: sat-series-b-mock-15-rw-015

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: craft-and-structure
SKILL: Words in Context
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
An account of the spread of neighborhood associations during a period of rapid population growth becomes more informative when its evidence is considered alongside the circumstances in which it was collected. Researchers distinguish the stated purpose of the initiative from the later uses residents found for it. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. The analysis of the spread of neighborhood associations during a period of rapid population growth drew on 1558 examples from 7 settings over 4 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-015",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-015",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-015",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-015-history-social-science-claim-evidence-interpretation",
  "conceptFingerprint": "craft-and-structure-Words in Context-history-social-science-14",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-015-sat-mock-15-15",
    "contextFamily": "sat-series-b-history-social-science-claim-evidence-interpretation",
    "passageGenre": "history-social-science",
    "readingTopic": "the spread of neighborhood associations during a period of rapid population growth",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "example-to-claim",
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Use the surrounding sentence relationship to select the sense that fits this specific context. Evidence relationship: example-to-claim.",
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

### Question: sat-series-b-mock-15-rw-016

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: information-and-ideas
SKILL: Central Ideas and Details
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
In examining a museum study of how visitors move between objects with related themes, researchers focused on what changed rather than assuming that the change had a single explanation. The researchers caution that a recurring feature does not by itself establish a single origin or intention. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. The evidence comes from multiple examples, allowing the researchers to distinguish a repeated pattern from an isolated design choice. The analysis of museum study of how visitors move between objects with related themes drew on 1559 examples from 8 settings over 6 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-016",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-016",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-016",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-016-humanities-comparison-synthesis",
  "conceptFingerprint": "information-and-ideas-Central Ideas and Details-humanities-15",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-016-sat-mock-15-16",
    "contextFamily": "sat-series-b-humanities-comparison-synthesis",
    "passageGenre": "humanities",
    "readingTopic": "a museum study of how visitors move between objects with related themes",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "identify",
    "questionConstruction": "Central Ideas and Details",
    "passageWordCount": 62,
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
      "rhetorical_structure": "comparison-synthesis",
      "evidence_relationship": "relationship-reversal",
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
      "required_inference": "Identify the passage-level claim that best integrates the major information rather than a single detail. Evidence relationship: relationship-reversal.",
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

### Question: sat-series-b-mock-15-rw-017

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: expression-of-ideas
SKILL: Transitions
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of how seedlings respond to intermittent rather than constant light drew on 1560 examples from 9 settings over 8 observation periods. The researchers observed a strong overall pattern. _____, the size of the effect differed among the study conditions.

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
  "contentId": "sat-series-b-mock-15-rw-017",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-017",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-017",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-017-science-claim-evidence-interpretation",
  "conceptFingerprint": "expression-of-ideas-Transitions-science-16",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-017-sat-mock-15-17",
    "contextFamily": "sat-series-b-science-claim-evidence-interpretation",
    "passageGenre": "science",
    "readingTopic": "how seedlings respond to intermittent rather than constant light",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Transitions",
    "passageWordCount": 56,
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Identify the logical relationship between the surrounding sentences before selecting the transition. Evidence relationship: direct-support.",
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

### Question: sat-series-b-mock-15-rw-018

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: craft-and-structure
SKILL: Text Structure and Purpose
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
An account of a musician deciding whether to preserve a family composition unchanged becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The scene moves from a concrete detail to a reflection that reveals the character’s uncertainty rather than resolving it. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. The character observes the setting from a new position, making a familiar feature appear different without changing the feature itself. The analysis of musician deciding whether to preserve a family composition unchanged drew on 1561 examples from 10 settings over 10 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-018",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-018",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-018",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-018-literature-comparison-synthesis",
  "conceptFingerprint": "craft-and-structure-Text Structure and Purpose-literature-0",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-018-sat-mock-15-18",
    "contextFamily": "sat-series-b-literature-comparison-synthesis",
    "passageGenre": "literature",
    "readingTopic": "a musician deciding whether to preserve a family composition unchanged",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "qualified-support",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Text Structure and Purpose",
    "passageWordCount": 65,
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Determine what rhetorical job the referenced information performs in the passage as a whole. Evidence relationship: qualified-support.",
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

### Question: sat-series-b-mock-15-rw-019

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: information-and-ideas
SKILL: Inferences
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
In examining a community debate over whether a new transit route should follow an older commercial corridor, researchers focused on what changed rather than assuming that the change had a single explanation. The evidence suggests that the change was not caused by a single decision but developed through several local responses. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. The comparison includes communities of different sizes, making it possible to distinguish a recurring tendency from a local exception. The analysis of community debate over whether a new transit route should follow an older commercial corridor drew on 1562 examples from 3 settings over 5 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-019",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-019",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-019",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-019-history-social-science-claim-evidence-interpretation",
  "conceptFingerprint": "information-and-ideas-Inferences-history-social-science-1",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-019-sat-mock-15-19",
    "contextFamily": "sat-series-b-history-social-science-claim-evidence-interpretation",
    "passageGenre": "history-social-science",
    "readingTopic": "a community debate over whether a new transit route should follow an older commercial corridor",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "contrast",
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
      "rhetorical_structure": "claim-evidence-interpretation",
      "evidence_relationship": "contrast",
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
      "required_inference": "Draw only the conclusion that is warranted by the stated or strongly implied evidence. Evidence relationship: contrast.",
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

### Question: sat-series-b-mock-15-rw-020

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: standard-english-conventions
SKILL: Boundaries
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of linguist comparing how speakers signal uncertainty in two related dialects drew on 1563 examples from 4 settings over 7 observation periods. The revised method produced a clearer signal _____ it required additional calibration.

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
  "contentId": "sat-series-b-mock-15-rw-020",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-020",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-020",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-020-humanities-comparison-synthesis",
  "conceptFingerprint": "standard-english-conventions-Boundaries-humanities-2",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-020-sat-mock-15-20",
    "contextFamily": "sat-series-b-humanities-comparison-synthesis",
    "passageGenre": "humanities",
    "readingTopic": "a linguist comparing how speakers signal uncertainty in two related dialects",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "inference",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Boundaries",
    "passageWordCount": 58,
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Identify the clause structure and then select punctuation that creates the required sentence boundary. Evidence relationship: inference.",
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

### Question: sat-series-b-mock-15-rw-021

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: craft-and-structure
SKILL: Cross-Text Connections
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
An account of the effect of water temperature on the activity of a freshwater organism becomes more informative when its evidence is considered alongside the circumstances in which it was collected. A follow-up measurement supports the broad interpretation while identifying a condition that limits how widely it can be applied. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition.

Passage 2: An account of a policy experiment designed to reduce congestion without restricting access to businesses becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The evidence suggests that the change was not caused by a single decision but developed through several local responses. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. The experiment repeated the procedure after one relevant condition was adjusted, allowing the interpretation to be qualified. The analysis of the effect of water temperature on the activity of a freshwater organism drew on 1564 examples from 5 settings over 9 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-021",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-021",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-021",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-021-science-claim-evidence-interpretation",
  "conceptFingerprint": "craft-and-structure-Cross-Text Connections-science-3",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-021-sat-mock-15-21",
    "contextFamily": "sat-series-b-science-claim-evidence-interpretation",
    "passageGenre": "science",
    "readingTopic": "the effect of water temperature on the activity of a freshwater organism",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "example-to-claim",
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
      "rhetorical_structure": "claim-evidence-interpretation",
      "evidence_relationship": "example-to-claim",
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
      "required_inference": "Compare both passages before deciding how their claims or interpretations relate. Evidence relationship: example-to-claim.",
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

### Question: sat-series-b-mock-15-rw-022

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: information-and-ideas
SKILL: Command of Evidence
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
In examining a traveler recognizing a familiar landscape from an unfamiliar direction, researchers focused on what changed rather than assuming that the change had a single explanation. The character values continuity, yet the setting repeatedly introduces evidence that change has already occurred. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. A concrete detail is repeated later in the scene, but its meaning shifts because the surrounding circumstances have changed. The analysis of traveler recognizing a familiar landscape from an unfamiliar direction drew on 1565 examples from 6 settings over 4 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-022",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-022",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-022",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-022-literature-comparison-synthesis",
  "conceptFingerprint": "information-and-ideas-Command of Evidence-literature-4",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-022-sat-mock-15-22",
    "contextFamily": "sat-series-b-literature-comparison-synthesis",
    "passageGenre": "literature",
    "readingTopic": "a traveler recognizing a familiar landscape from an unfamiliar direction",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Command of Evidence",
    "passageWordCount": 58,
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Connect the selected evidence directly to the interpretation named in the question. Evidence relationship: relationship-reversal.",
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

### Question: sat-series-b-mock-15-rw-023

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: standard-english-conventions
SKILL: Form, Structure, and Sense
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of municipal efforts to coordinate street markets as cities expanded drew on 1566 examples from 7 settings over 6 observation periods. The set of measurements, rather than the individual readings, _____ the basis for comparison.

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
  "contentId": "sat-series-b-mock-15-rw-023",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-023",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-023",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-023-history-social-science-claim-evidence-interpretation",
  "conceptFingerprint": "standard-english-conventions-Form, Structure, and Sense-history-social-science-5",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-023-sat-mock-15-23",
    "contextFamily": "sat-series-b-history-social-science-claim-evidence-interpretation",
    "passageGenre": "history-social-science",
    "readingTopic": "municipal efforts to coordinate street markets as cities expanded",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Form, Structure, and Sense",
    "passageWordCount": 56,
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Select the grammatical form that agrees with the sentence structure and preserves its meaning. Evidence relationship: direct-support.",
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

### Question: sat-series-b-mock-15-rw-024

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: expression-of-ideas
SKILL: Rhetorical Synthesis
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
Study focus: municipal efforts to coordinate street markets as cities expanded. Observation: the evidence shows a measurable difference between the two settings. Qualification: the size of the difference depends on conditions surrounding the observation. Goal: state the result accurately without making a broader claim than the evidence supports. The analysis of how archaeologists infer trade connections from recurring ceramic materials drew on 1567 examples from 8 settings over 8 observation periods. The comparison was reviewed again so that the result could be stated without dropping its important qualification.

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
  "contentId": "sat-series-b-mock-15-rw-024",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-024",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-024",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-024-humanities-comparison-synthesis",
  "conceptFingerprint": "expression-of-ideas-Rhetorical Synthesis-humanities-6",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-024-sat-mock-15-24",
    "contextFamily": "sat-series-b-humanities-comparison-synthesis",
    "passageGenre": "humanities",
    "readingTopic": "how archaeologists infer trade connections from recurring ceramic materials",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "qualified-support",
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
      "rhetorical_structure": "comparison-synthesis",
      "evidence_relationship": "qualified-support",
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
      "required_inference": "Select notes that fulfill the stated communication goal without adding an unsupported claim. Evidence relationship: qualified-support.",
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

### Question: sat-series-b-mock-15-rw-025

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: craft-and-structure
SKILL: Words in Context
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
In examining whether a coating changes the stability of a battery electrode during repeated cycles, researchers focused on what changed rather than assuming that the change had a single explanation. The experiment separates an observed association from the stronger claim that one factor alone caused the outcome. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. The analysis of whether a coating changes the stability of a battery electrode during repeated cycles drew on 1568 examples from 9 settings over 10 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-025",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-025",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-025",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-025-science-claim-evidence-interpretation",
  "conceptFingerprint": "craft-and-structure-Words in Context-science-7",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-025-sat-mock-15-25",
    "contextFamily": "sat-series-b-science-claim-evidence-interpretation",
    "passageGenre": "science",
    "readingTopic": "whether a coating changes the stability of a battery electrode during repeated cycles",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "contrast",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Words in Context",
    "passageWordCount": 63,
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Use the surrounding sentence relationship to select the sense that fits this specific context. Evidence relationship: contrast.",
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

### Question: sat-series-b-mock-15-rw-026

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: information-and-ideas
SKILL: Central Ideas and Details
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of a student sorting letters left by a relative who avoided public attention compared observations from different conditions instead of treating the first pattern as conclusive. The narrator initially treats the change as an inconvenience, but a later observation makes the earlier judgment seem incomplete. The result therefore supports a narrower claim than a simple comparison might initially suggest. The narrator notices a difference between what was expected and what is actually visible without immediately explaining it. The analysis of student sorting letters left by a relative who avoided public attention drew on 1569 examples from 10 settings over 5 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-026",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-026",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-026",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-026-literature-comparison-synthesis",
  "conceptFingerprint": "information-and-ideas-Central Ideas and Details-literature-8",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-026-sat-mock-15-26",
    "contextFamily": "sat-series-b-literature-comparison-synthesis",
    "passageGenre": "literature",
    "readingTopic": "a student sorting letters left by a relative who avoided public attention",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "inference",
    "cognitiveOperation": "identify",
    "questionConstruction": "Central Ideas and Details",
    "passageWordCount": 62,
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
      "rhetorical_structure": "comparison-synthesis",
      "evidence_relationship": "inference",
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
      "required_inference": "Identify the passage-level claim that best integrates the major information rather than a single detail. Evidence relationship: inference.",
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

### Question: sat-series-b-mock-15-rw-027

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-1
DOMAIN: expression-of-ideas
SKILL: Transitions
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of the spread of neighborhood associations during a period of rapid population growth drew on 1570 examples from 3 settings over 7 observation periods. The researchers observed a strong overall pattern. _____, the size of the effect differed among the study conditions.

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
  "contentId": "sat-series-b-mock-15-rw-027",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-027",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-027",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-027-history-social-science-claim-evidence-interpretation",
  "conceptFingerprint": "expression-of-ideas-Transitions-history-social-science-9",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-027-sat-mock-15-27",
    "contextFamily": "sat-series-b-history-social-science-claim-evidence-interpretation",
    "passageGenre": "history-social-science",
    "readingTopic": "the spread of neighborhood associations during a period of rapid population growth",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "example-to-claim",
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Identify the logical relationship between the surrounding sentences before selecting the transition. Evidence relationship: example-to-claim.",
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

### Question: sat-series-b-mock-15-rw-028

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Text Structure and Purpose
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
In examining a museum study of how visitors move between objects with related themes, researchers focused on what changed rather than assuming that the change had a single explanation. The researchers caution that a recurring feature does not by itself establish a single origin or intention. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. The evidence comes from multiple examples, allowing the researchers to distinguish a repeated pattern from an isolated design choice. The analysis of museum study of how visitors move between objects with related themes drew on 1571 examples from 4 settings over 9 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-028",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-028",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-028",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-028-humanities-comparison-synthesis",
  "conceptFingerprint": "craft-and-structure-Text Structure and Purpose-humanities-10",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-028-sat-mock-15-28",
    "contextFamily": "sat-series-b-humanities-comparison-synthesis",
    "passageGenre": "humanities",
    "readingTopic": "a museum study of how visitors move between objects with related themes",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Text Structure and Purpose",
    "passageWordCount": 62,
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Determine what rhetorical job the referenced information performs in the passage as a whole. Evidence relationship: relationship-reversal.",
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

### Question: sat-series-b-mock-15-rw-029

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Inferences
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of how seedlings respond to intermittent rather than constant light compared observations from different conditions instead of treating the first pattern as conclusive. Measurements show a consistent overall pattern, but the magnitude of the effect changes under different conditions. The result therefore supports a narrower claim than a simple comparison might initially suggest. A follow-up observation was collected after the system returned to typical conditions, providing a check on the initial result. The analysis of how seedlings respond to intermittent rather than constant light drew on 1572 examples from 5 settings over 4 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-029",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-029",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-029",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-029-science-claim-evidence-interpretation",
  "conceptFingerprint": "information-and-ideas-Inferences-science-11",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-029-sat-mock-15-29",
    "contextFamily": "sat-series-b-science-claim-evidence-interpretation",
    "passageGenre": "science",
    "readingTopic": "how seedlings respond to intermittent rather than constant light",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "infer",
    "questionConstruction": "Inferences",
    "passageWordCount": 56,
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
      "rhetorical_structure": "claim-evidence-interpretation",
      "evidence_relationship": "direct-support",
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
      "required_inference": "Draw only the conclusion that is warranted by the stated or strongly implied evidence. Evidence relationship: direct-support.",
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

### Question: sat-series-b-mock-15-rw-030

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Boundaries
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of musician deciding whether to preserve a family composition unchanged drew on 1573 examples from 6 settings over 6 observation periods. The revised method produced a clearer signal _____ it required additional calibration.

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
  "contentId": "sat-series-b-mock-15-rw-030",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-030",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-030",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-030-literature-comparison-synthesis",
  "conceptFingerprint": "standard-english-conventions-Boundaries-literature-12",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-030-sat-mock-15-30",
    "contextFamily": "sat-series-b-literature-comparison-synthesis",
    "passageGenre": "literature",
    "readingTopic": "a musician deciding whether to preserve a family composition unchanged",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "qualified-support",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Boundaries",
    "passageWordCount": 65,
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Identify the clause structure and then select punctuation that creates the required sentence boundary. Evidence relationship: qualified-support.",
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

### Question: sat-series-b-mock-15-rw-031

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Cross-Text Connections
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
In examining a community debate over whether a new transit route should follow an older commercial corridor, researchers focused on what changed rather than assuming that the change had a single explanation. The evidence suggests that the change was not caused by a single decision but developed through several local responses. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation.

Passage 2: A recent study of how migratory birds alter stopover timing when food availability changes compared observations from different conditions instead of treating the first pattern as conclusive. Measurements show a consistent overall pattern, but the magnitude of the effect changes under different conditions. The result therefore supports a narrower claim than a simple comparison might initially suggest. The comparison includes communities of different sizes, making it possible to distinguish a recurring tendency from a local exception. The analysis of community debate over whether a new transit route should follow an older commercial corridor drew on 1574 examples from 7 settings over 8 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-031",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-031",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-031",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-031-history-social-science-claim-evidence-interpretation",
  "conceptFingerprint": "craft-and-structure-Cross-Text Connections-history-social-science-13",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-031-sat-mock-15-31",
    "contextFamily": "sat-series-b-history-social-science-claim-evidence-interpretation",
    "passageGenre": "history-social-science",
    "readingTopic": "a community debate over whether a new transit route should follow an older commercial corridor",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "contrast",
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
      "rhetorical_structure": "claim-evidence-interpretation",
      "evidence_relationship": "contrast",
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
      "required_inference": "Compare both passages before deciding how their claims or interpretations relate. Evidence relationship: contrast.",
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

### Question: sat-series-b-mock-15-rw-032

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Command of Evidence
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of a linguist comparing how speakers signal uncertainty in two related dialects compared observations from different conditions instead of treating the first pattern as conclusive. The comparison indicates that a feature often described as decorative also served a practical communicative purpose. The result therefore supports a narrower claim than a simple comparison might initially suggest. The analysis separates what can be observed directly from what must be inferred about the creator’s intention. The analysis of linguist comparing how speakers signal uncertainty in two related dialects drew on 1575 examples from 8 settings over 10 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-032",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-032",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-032",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-032-humanities-comparison-synthesis",
  "conceptFingerprint": "information-and-ideas-Command of Evidence-humanities-14",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-032-sat-mock-15-32",
    "contextFamily": "sat-series-b-humanities-comparison-synthesis",
    "passageGenre": "humanities",
    "readingTopic": "a linguist comparing how speakers signal uncertainty in two related dialects",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "inference",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Command of Evidence",
    "passageWordCount": 58,
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Connect the selected evidence directly to the interpretation named in the question. Evidence relationship: inference.",
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

### Question: sat-series-b-mock-15-rw-033

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Form, Structure, and Sense
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of the effect of water temperature on the activity of a freshwater organism drew on 1576 examples from 9 settings over 5 observation periods. The set of measurements, rather than the individual readings, _____ the basis for comparison.

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
  "contentId": "sat-series-b-mock-15-rw-033",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-033",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-033",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-033-science-claim-evidence-interpretation",
  "conceptFingerprint": "standard-english-conventions-Form, Structure, and Sense-science-15",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-033-sat-mock-15-33",
    "contextFamily": "sat-series-b-science-claim-evidence-interpretation",
    "passageGenre": "science",
    "readingTopic": "the effect of water temperature on the activity of a freshwater organism",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "example-to-claim",
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Select the grammatical form that agrees with the sentence structure and preserves its meaning. Evidence relationship: example-to-claim.",
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

### Question: sat-series-b-mock-15-rw-034

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Rhetorical Synthesis
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
Study focus: the restoration choices made when a damaged architectural feature has several plausible originals. Observation: the evidence shows a measurable difference between the two settings. Qualification: the size of the difference depends on conditions surrounding the observation. Goal: state the result accurately without making a broader claim than the evidence supports. The analysis of traveler recognizing a familiar landscape from an unfamiliar direction drew on 1577 examples from 10 settings over 7 observation periods. The comparison was reviewed again so that the result could be stated without dropping its important qualification.

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
  "contentId": "sat-series-b-mock-15-rw-034",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-034",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-034",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-034-literature-comparison-synthesis",
  "conceptFingerprint": "expression-of-ideas-Rhetorical Synthesis-literature-16",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-034-sat-mock-15-34",
    "contextFamily": "sat-series-b-literature-comparison-synthesis",
    "passageGenre": "literature",
    "readingTopic": "a traveler recognizing a familiar landscape from an unfamiliar direction",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "relationship-reversal",
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
      "rhetorical_structure": "comparison-synthesis",
      "evidence_relationship": "relationship-reversal",
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
      "required_inference": "Select notes that fulfill the stated communication goal without adding an unsupported claim. Evidence relationship: relationship-reversal.",
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

### Question: sat-series-b-mock-15-rw-035

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Words in Context
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of municipal efforts to coordinate street markets as cities expanded compared observations from different conditions instead of treating the first pattern as conclusive. Contemporary records show that the policy produced a visible change, although the effect varied across neighborhoods. The result therefore supports a narrower claim than a simple comparison might initially suggest. The analysis of municipal efforts to coordinate street markets as cities expanded drew on 1578 examples from 3 settings over 9 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-035",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-035",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-035",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-035-history-social-science-claim-evidence-interpretation",
  "conceptFingerprint": "craft-and-structure-Words in Context-history-social-science-0",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-035-sat-mock-15-35",
    "contextFamily": "sat-series-b-history-social-science-claim-evidence-interpretation",
    "passageGenre": "history-social-science",
    "readingTopic": "municipal efforts to coordinate street markets as cities expanded",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Words in Context",
    "passageWordCount": 56,
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Use the surrounding sentence relationship to select the sense that fits this specific context. Evidence relationship: direct-support.",
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

### Question: sat-series-b-mock-15-rw-036

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Central Ideas and Details
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
An account of how archaeologists infer trade connections from recurring ceramic materials becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The evidence becomes more informative when the object is considered alongside the setting in which audiences encountered it. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. The interpretation becomes more precise when similarities among examples are weighed against their contextual differences. The analysis of how archaeologists infer trade connections from recurring ceramic materials drew on 1579 examples from 4 settings over 4 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-036",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-036",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-036",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-036-humanities-comparison-synthesis",
  "conceptFingerprint": "information-and-ideas-Central Ideas and Details-humanities-1",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-036-sat-mock-15-36",
    "contextFamily": "sat-series-b-humanities-comparison-synthesis",
    "passageGenre": "humanities",
    "readingTopic": "how archaeologists infer trade connections from recurring ceramic materials",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "qualified-support",
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
      "rhetorical_structure": "comparison-synthesis",
      "evidence_relationship": "qualified-support",
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
      "required_inference": "Identify the passage-level claim that best integrates the major information rather than a single detail. Evidence relationship: qualified-support.",
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

### Question: sat-series-b-mock-15-rw-037

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Transitions
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of whether a coating changes the stability of a battery electrode during repeated cycles drew on 1580 examples from 5 settings over 6 observation periods. The researchers observed a strong overall pattern. _____, the size of the effect differed among the study conditions.

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
  "contentId": "sat-series-b-mock-15-rw-037",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-037",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-037",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-037-science-claim-evidence-interpretation",
  "conceptFingerprint": "expression-of-ideas-Transitions-science-2",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-037-sat-mock-15-37",
    "contextFamily": "sat-series-b-science-claim-evidence-interpretation",
    "passageGenre": "science",
    "readingTopic": "whether a coating changes the stability of a battery electrode during repeated cycles",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "contrast",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Transitions",
    "passageWordCount": 63,
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Identify the logical relationship between the surrounding sentences before selecting the transition. Evidence relationship: contrast.",
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

### Question: sat-series-b-mock-15-rw-038

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Text Structure and Purpose
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of a student sorting letters left by a relative who avoided public attention compared observations from different conditions instead of treating the first pattern as conclusive. The narrator initially treats the change as an inconvenience, but a later observation makes the earlier judgment seem incomplete. The result therefore supports a narrower claim than a simple comparison might initially suggest. The narrator notices a difference between what was expected and what is actually visible without immediately explaining it. The analysis of student sorting letters left by a relative who avoided public attention drew on 1581 examples from 6 settings over 8 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-038",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-038",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-038",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-038-literature-comparison-synthesis",
  "conceptFingerprint": "craft-and-structure-Text Structure and Purpose-literature-3",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-038-sat-mock-15-38",
    "contextFamily": "sat-series-b-literature-comparison-synthesis",
    "passageGenre": "literature",
    "readingTopic": "a student sorting letters left by a relative who avoided public attention",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "inference",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Text Structure and Purpose",
    "passageWordCount": 62,
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Determine what rhetorical job the referenced information performs in the passage as a whole. Evidence relationship: inference.",
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

### Question: sat-series-b-mock-15-rw-039

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Inferences
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
An account of the spread of neighborhood associations during a period of rapid population growth becomes more informative when its evidence is considered alongside the circumstances in which it was collected. Researchers distinguish the stated purpose of the initiative from the later uses residents found for it. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. Records from before and after the change provide a baseline against which the later pattern can be interpreted. The analysis of the spread of neighborhood associations during a period of rapid population growth drew on 1582 examples from 7 settings over 10 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-039",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-039",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-039",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-039-history-social-science-claim-evidence-interpretation",
  "conceptFingerprint": "information-and-ideas-Inferences-history-social-science-4",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-039-sat-mock-15-39",
    "contextFamily": "sat-series-b-history-social-science-claim-evidence-interpretation",
    "passageGenre": "history-social-science",
    "readingTopic": "the spread of neighborhood associations during a period of rapid population growth",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "example-to-claim",
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
      "rhetorical_structure": "claim-evidence-interpretation",
      "evidence_relationship": "example-to-claim",
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
      "required_inference": "Draw only the conclusion that is warranted by the stated or strongly implied evidence. Evidence relationship: example-to-claim.",
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

### Question: sat-series-b-mock-15-rw-040

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Boundaries
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of museum study of how visitors move between objects with related themes drew on 1583 examples from 8 settings over 5 observation periods. The revised method produced a clearer signal _____ it required additional calibration.

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
  "contentId": "sat-series-b-mock-15-rw-040",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-040",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-040",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-040-humanities-comparison-synthesis",
  "conceptFingerprint": "standard-english-conventions-Boundaries-humanities-5",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-040-sat-mock-15-40",
    "contextFamily": "sat-series-b-humanities-comparison-synthesis",
    "passageGenre": "humanities",
    "readingTopic": "a museum study of how visitors move between objects with related themes",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Boundaries",
    "passageWordCount": 62,
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Identify the clause structure and then select punctuation that creates the required sentence boundary. Evidence relationship: relationship-reversal.",
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

### Question: sat-series-b-mock-15-rw-041

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Cross-Text Connections
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of how seedlings respond to intermittent rather than constant light compared observations from different conditions instead of treating the first pattern as conclusive. Measurements show a consistent overall pattern, but the magnitude of the effect changes under different conditions. The result therefore supports a narrower claim than a simple comparison might initially suggest.

Passage 2: An account of changes in how local newspapers described public libraries in the early twentieth century becomes more informative when its evidence is considered alongside the circumstances in which it was collected. Researchers distinguish the stated purpose of the initiative from the later uses residents found for it. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. A follow-up observation was collected after the system returned to typical conditions, providing a check on the initial result. The analysis of how seedlings respond to intermittent rather than constant light drew on 1584 examples from 9 settings over 7 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-041",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-041",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-041",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-041-science-claim-evidence-interpretation",
  "conceptFingerprint": "craft-and-structure-Cross-Text Connections-science-6",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-041-sat-mock-15-41",
    "contextFamily": "sat-series-b-science-claim-evidence-interpretation",
    "passageGenre": "science",
    "readingTopic": "how seedlings respond to intermittent rather than constant light",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "synthesize",
    "questionConstruction": "Cross-Text Connections",
    "passageWordCount": 56,
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
      "rhetorical_structure": "claim-evidence-interpretation",
      "evidence_relationship": "direct-support",
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
      "required_inference": "Compare both passages before deciding how their claims or interpretations relate. Evidence relationship: direct-support.",
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

### Question: sat-series-b-mock-15-rw-042

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Command of Evidence
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
An account of a musician deciding whether to preserve a family composition unchanged becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The scene moves from a concrete detail to a reflection that reveals the character’s uncertainty rather than resolving it. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. The character observes the setting from a new position, making a familiar feature appear different without changing the feature itself. The analysis of musician deciding whether to preserve a family composition unchanged drew on 1585 examples from 10 settings over 9 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-042",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-042",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-042",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-042-literature-comparison-synthesis",
  "conceptFingerprint": "information-and-ideas-Command of Evidence-literature-7",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-042-sat-mock-15-42",
    "contextFamily": "sat-series-b-literature-comparison-synthesis",
    "passageGenre": "literature",
    "readingTopic": "a musician deciding whether to preserve a family composition unchanged",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "qualified-support",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Command of Evidence",
    "passageWordCount": 65,
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Connect the selected evidence directly to the interpretation named in the question. Evidence relationship: qualified-support.",
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

### Question: sat-series-b-mock-15-rw-043

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Form, Structure, and Sense
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of community debate over whether a new transit route should follow an older commercial corridor drew on 1586 examples from 3 settings over 4 observation periods. The set of measurements, rather than the individual readings, _____ the basis for comparison.

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
  "contentId": "sat-series-b-mock-15-rw-043",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-043",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-043",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-043-history-social-science-claim-evidence-interpretation",
  "conceptFingerprint": "standard-english-conventions-Form, Structure, and Sense-history-social-science-8",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-043-sat-mock-15-43",
    "contextFamily": "sat-series-b-history-social-science-claim-evidence-interpretation",
    "passageGenre": "history-social-science",
    "readingTopic": "a community debate over whether a new transit route should follow an older commercial corridor",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "contrast",
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Select the grammatical form that agrees with the sentence structure and preserves its meaning. Evidence relationship: contrast.",
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

### Question: sat-series-b-mock-15-rw-044

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Rhetorical Synthesis
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
Study focus: the changing use of color in a regional school of landscape painting. Observation: the evidence shows a measurable difference between the two settings. Qualification: the size of the difference depends on conditions surrounding the observation. Goal: state the result accurately without making a broader claim than the evidence supports. The analysis of linguist comparing how speakers signal uncertainty in two related dialects drew on 1587 examples from 4 settings over 6 observation periods. The comparison was reviewed again so that the result could be stated without dropping its important qualification.

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
  "contentId": "sat-series-b-mock-15-rw-044",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-044",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-044",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-044-humanities-comparison-synthesis",
  "conceptFingerprint": "expression-of-ideas-Rhetorical Synthesis-humanities-9",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-044-sat-mock-15-44",
    "contextFamily": "sat-series-b-humanities-comparison-synthesis",
    "passageGenre": "humanities",
    "readingTopic": "a linguist comparing how speakers signal uncertainty in two related dialects",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "inference",
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
      "rhetorical_structure": "comparison-synthesis",
      "evidence_relationship": "inference",
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
      "required_inference": "Select notes that fulfill the stated communication goal without adding an unsupported claim. Evidence relationship: inference.",
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

### Question: sat-series-b-mock-15-rw-045

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Words in Context
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
An account of the effect of water temperature on the activity of a freshwater organism becomes more informative when its evidence is considered alongside the circumstances in which it was collected. A follow-up measurement supports the broad interpretation while identifying a condition that limits how widely it can be applied. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. The analysis of the effect of water temperature on the activity of a freshwater organism drew on 1588 examples from 5 settings over 8 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-045",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-045",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-045",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-045-science-claim-evidence-interpretation",
  "conceptFingerprint": "craft-and-structure-Words in Context-science-10",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-045-sat-mock-15-45",
    "contextFamily": "sat-series-b-science-claim-evidence-interpretation",
    "passageGenre": "science",
    "readingTopic": "the effect of water temperature on the activity of a freshwater organism",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "example-to-claim",
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Use the surrounding sentence relationship to select the sense that fits this specific context. Evidence relationship: example-to-claim.",
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

### Question: sat-series-b-mock-15-rw-046

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Central Ideas and Details
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
In examining a traveler recognizing a familiar landscape from an unfamiliar direction, researchers focused on what changed rather than assuming that the change had a single explanation. The character values continuity, yet the setting repeatedly introduces evidence that change has already occurred. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. A concrete detail is repeated later in the scene, but its meaning shifts because the surrounding circumstances have changed. The analysis of traveler recognizing a familiar landscape from an unfamiliar direction drew on 1589 examples from 6 settings over 10 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-046",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-046",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-046",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-046-literature-comparison-synthesis",
  "conceptFingerprint": "information-and-ideas-Central Ideas and Details-literature-11",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-046-sat-mock-15-46",
    "contextFamily": "sat-series-b-literature-comparison-synthesis",
    "passageGenre": "literature",
    "readingTopic": "a traveler recognizing a familiar landscape from an unfamiliar direction",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "identify",
    "questionConstruction": "Central Ideas and Details",
    "passageWordCount": 58,
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
      "rhetorical_structure": "comparison-synthesis",
      "evidence_relationship": "relationship-reversal",
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
      "required_inference": "Identify the passage-level claim that best integrates the major information rather than a single detail. Evidence relationship: relationship-reversal.",
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

### Question: sat-series-b-mock-15-rw-047

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Transitions
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of municipal efforts to coordinate street markets as cities expanded drew on 1590 examples from 7 settings over 5 observation periods. The researchers observed a strong overall pattern. _____, the size of the effect differed among the study conditions.

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
  "contentId": "sat-series-b-mock-15-rw-047",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-047",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-047",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-047-history-social-science-claim-evidence-interpretation",
  "conceptFingerprint": "expression-of-ideas-Transitions-history-social-science-12",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-047-sat-mock-15-47",
    "contextFamily": "sat-series-b-history-social-science-claim-evidence-interpretation",
    "passageGenre": "history-social-science",
    "readingTopic": "municipal efforts to coordinate street markets as cities expanded",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Transitions",
    "passageWordCount": 56,
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Identify the logical relationship between the surrounding sentences before selecting the transition. Evidence relationship: direct-support.",
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

### Question: sat-series-b-mock-15-rw-048

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Text Structure and Purpose
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
An account of how archaeologists infer trade connections from recurring ceramic materials becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The evidence becomes more informative when the object is considered alongside the setting in which audiences encountered it. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. The interpretation becomes more precise when similarities among examples are weighed against their contextual differences. The analysis of how archaeologists infer trade connections from recurring ceramic materials drew on 1591 examples from 8 settings over 7 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-048",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-048",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-048",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-048-humanities-comparison-synthesis",
  "conceptFingerprint": "craft-and-structure-Text Structure and Purpose-humanities-13",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-048-sat-mock-15-48",
    "contextFamily": "sat-series-b-humanities-comparison-synthesis",
    "passageGenre": "humanities",
    "readingTopic": "how archaeologists infer trade connections from recurring ceramic materials",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "qualified-support",
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Determine what rhetorical job the referenced information performs in the passage as a whole. Evidence relationship: qualified-support.",
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

### Question: sat-series-b-mock-15-rw-049

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Inferences
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
In examining whether a coating changes the stability of a battery electrode during repeated cycles, researchers focused on what changed rather than assuming that the change had a single explanation. The experiment separates an observed association from the stronger claim that one factor alone caused the outcome. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. The analysis compared repeated measurements taken under different conditions before the researchers interpreted the overall trend. The analysis of whether a coating changes the stability of a battery electrode during repeated cycles drew on 1592 examples from 9 settings over 9 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-049",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-049",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-049",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-049-science-claim-evidence-interpretation",
  "conceptFingerprint": "information-and-ideas-Inferences-science-14",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-049-sat-mock-15-49",
    "contextFamily": "sat-series-b-science-claim-evidence-interpretation",
    "passageGenre": "science",
    "readingTopic": "whether a coating changes the stability of a battery electrode during repeated cycles",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "contrast",
    "cognitiveOperation": "infer",
    "questionConstruction": "Inferences",
    "passageWordCount": 63,
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
      "rhetorical_structure": "claim-evidence-interpretation",
      "evidence_relationship": "contrast",
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
      "required_inference": "Draw only the conclusion that is warranted by the stated or strongly implied evidence. Evidence relationship: contrast.",
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

### Question: sat-series-b-mock-15-rw-050

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Boundaries
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of student sorting letters left by a relative who avoided public attention drew on 1593 examples from 10 settings over 4 observation periods. The revised method produced a clearer signal _____ it required additional calibration.

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
  "contentId": "sat-series-b-mock-15-rw-050",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-050",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-050",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-050-literature-comparison-synthesis",
  "conceptFingerprint": "standard-english-conventions-Boundaries-literature-15",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-050-sat-mock-15-50",
    "contextFamily": "sat-series-b-literature-comparison-synthesis",
    "passageGenre": "literature",
    "readingTopic": "a student sorting letters left by a relative who avoided public attention",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "inference",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Boundaries",
    "passageWordCount": 62,
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Identify the clause structure and then select punctuation that creates the required sentence boundary. Evidence relationship: inference.",
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

### Question: sat-series-b-mock-15-rw-051

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Cross-Text Connections
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
An account of the spread of neighborhood associations during a period of rapid population growth becomes more informative when its evidence is considered alongside the circumstances in which it was collected. Researchers distinguish the stated purpose of the initiative from the later uses residents found for it. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition.

Passage 2: An account of whether an imaging method detects canopy changes more consistently after calibration becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The experiment separates an observed association from the stronger claim that one factor alone caused the outcome. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. Records from before and after the change provide a baseline against which the later pattern can be interpreted. The analysis of the spread of neighborhood associations during a period of rapid population growth drew on 1594 examples from 3 settings over 6 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-051",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-051",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-051",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-051-history-social-science-claim-evidence-interpretation",
  "conceptFingerprint": "craft-and-structure-Cross-Text Connections-history-social-science-16",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-051-sat-mock-15-51",
    "contextFamily": "sat-series-b-history-social-science-claim-evidence-interpretation",
    "passageGenre": "history-social-science",
    "readingTopic": "the spread of neighborhood associations during a period of rapid population growth",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "example-to-claim",
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
      "rhetorical_structure": "claim-evidence-interpretation",
      "evidence_relationship": "example-to-claim",
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
      "required_inference": "Compare both passages before deciding how their claims or interpretations relate. Evidence relationship: example-to-claim.",
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

### Question: sat-series-b-mock-15-rw-052

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Command of Evidence
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
In examining a museum study of how visitors move between objects with related themes, researchers focused on what changed rather than assuming that the change had a single explanation. The researchers caution that a recurring feature does not by itself establish a single origin or intention. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. The evidence comes from multiple examples, allowing the researchers to distinguish a repeated pattern from an isolated design choice. The analysis of museum study of how visitors move between objects with related themes drew on 1595 examples from 4 settings over 8 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-052",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-052",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-052",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-052-humanities-comparison-synthesis",
  "conceptFingerprint": "information-and-ideas-Command of Evidence-humanities-0",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-052-sat-mock-15-52",
    "contextFamily": "sat-series-b-humanities-comparison-synthesis",
    "passageGenre": "humanities",
    "readingTopic": "a museum study of how visitors move between objects with related themes",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Command of Evidence",
    "passageWordCount": 62,
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Connect the selected evidence directly to the interpretation named in the question. Evidence relationship: relationship-reversal.",
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

### Question: sat-series-b-mock-15-rw-053

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Form, Structure, and Sense
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of how seedlings respond to intermittent rather than constant light drew on 1596 examples from 5 settings over 10 observation periods. The set of measurements, rather than the individual readings, _____ the basis for comparison.

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
  "contentId": "sat-series-b-mock-15-rw-053",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-053",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-053",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-053-science-claim-evidence-interpretation",
  "conceptFingerprint": "standard-english-conventions-Form, Structure, and Sense-science-1",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-053-sat-mock-15-53",
    "contextFamily": "sat-series-b-science-claim-evidence-interpretation",
    "passageGenre": "science",
    "readingTopic": "how seedlings respond to intermittent rather than constant light",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Form, Structure, and Sense",
    "passageWordCount": 56,
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Select the grammatical form that agrees with the sentence structure and preserves its meaning. Evidence relationship: direct-support.",
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

### Question: sat-series-b-mock-15-rw-054

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Rhetorical Synthesis
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
Study focus: the acoustic design of small performance spaces. Observation: the evidence shows a measurable difference between the two settings. Qualification: the size of the difference depends on conditions surrounding the observation. Goal: state the result accurately without making a broader claim than the evidence supports. The analysis of musician deciding whether to preserve a family composition unchanged drew on 1597 examples from 6 settings over 5 observation periods. The comparison was reviewed again so that the result could be stated without dropping its important qualification.

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
  "contentId": "sat-series-b-mock-15-rw-054",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-054",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-054",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-054-literature-comparison-synthesis",
  "conceptFingerprint": "expression-of-ideas-Rhetorical Synthesis-literature-2",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-054-sat-mock-15-54",
    "contextFamily": "sat-series-b-literature-comparison-synthesis",
    "passageGenre": "literature",
    "readingTopic": "a musician deciding whether to preserve a family composition unchanged",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "qualified-support",
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
      "rhetorical_structure": "comparison-synthesis",
      "evidence_relationship": "qualified-support",
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
      "required_inference": "Select notes that fulfill the stated communication goal without adding an unsupported claim. Evidence relationship: qualified-support.",
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

### Question: sat-series-b-mock-15-rw-055

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Words in Context
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
In examining a community debate over whether a new transit route should follow an older commercial corridor, researchers focused on what changed rather than assuming that the change had a single explanation. The evidence suggests that the change was not caused by a single decision but developed through several local responses. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. The analysis of community debate over whether a new transit route should follow an older commercial corridor drew on 1598 examples from 7 settings over 7 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-055",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-055",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-055",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-055-history-social-science-claim-evidence-interpretation",
  "conceptFingerprint": "craft-and-structure-Words in Context-history-social-science-3",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-055-sat-mock-15-55",
    "contextFamily": "sat-series-b-history-social-science-claim-evidence-interpretation",
    "passageGenre": "history-social-science",
    "readingTopic": "a community debate over whether a new transit route should follow an older commercial corridor",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "contrast",
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Use the surrounding sentence relationship to select the sense that fits this specific context. Evidence relationship: contrast.",
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

### Question: sat-series-b-mock-15-rw-056

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Central Ideas and Details
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of a linguist comparing how speakers signal uncertainty in two related dialects compared observations from different conditions instead of treating the first pattern as conclusive. The comparison indicates that a feature often described as decorative also served a practical communicative purpose. The result therefore supports a narrower claim than a simple comparison might initially suggest. The analysis separates what can be observed directly from what must be inferred about the creator’s intention. The analysis of linguist comparing how speakers signal uncertainty in two related dialects drew on 1599 examples from 8 settings over 9 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-056",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-056",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-056",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-056-humanities-comparison-synthesis",
  "conceptFingerprint": "information-and-ideas-Central Ideas and Details-humanities-4",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-056-sat-mock-15-56",
    "contextFamily": "sat-series-b-humanities-comparison-synthesis",
    "passageGenre": "humanities",
    "readingTopic": "a linguist comparing how speakers signal uncertainty in two related dialects",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "inference",
    "cognitiveOperation": "identify",
    "questionConstruction": "Central Ideas and Details",
    "passageWordCount": 58,
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
      "rhetorical_structure": "comparison-synthesis",
      "evidence_relationship": "inference",
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
      "required_inference": "Identify the passage-level claim that best integrates the major information rather than a single detail. Evidence relationship: inference.",
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

### Question: sat-series-b-mock-15-rw-057

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Transitions
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of the effect of water temperature on the activity of a freshwater organism drew on 1600 examples from 9 settings over 4 observation periods. The researchers observed a strong overall pattern. _____, the size of the effect differed among the study conditions.

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
  "contentId": "sat-series-b-mock-15-rw-057",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-057",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-057",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-057-science-claim-evidence-interpretation",
  "conceptFingerprint": "expression-of-ideas-Transitions-science-5",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-057-sat-mock-15-57",
    "contextFamily": "sat-series-b-science-claim-evidence-interpretation",
    "passageGenre": "science",
    "readingTopic": "the effect of water temperature on the activity of a freshwater organism",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "example-to-claim",
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Identify the logical relationship between the surrounding sentences before selecting the transition. Evidence relationship: example-to-claim.",
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

### Question: sat-series-b-mock-15-rw-058

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Text Structure and Purpose
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
In examining a traveler recognizing a familiar landscape from an unfamiliar direction, researchers focused on what changed rather than assuming that the change had a single explanation. The character values continuity, yet the setting repeatedly introduces evidence that change has already occurred. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. A concrete detail is repeated later in the scene, but its meaning shifts because the surrounding circumstances have changed. The analysis of traveler recognizing a familiar landscape from an unfamiliar direction drew on 1601 examples from 10 settings over 6 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-058",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-058",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-058",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-058-literature-comparison-synthesis",
  "conceptFingerprint": "craft-and-structure-Text Structure and Purpose-literature-6",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-058-sat-mock-15-58",
    "contextFamily": "sat-series-b-literature-comparison-synthesis",
    "passageGenre": "literature",
    "readingTopic": "a traveler recognizing a familiar landscape from an unfamiliar direction",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Text Structure and Purpose",
    "passageWordCount": 58,
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Determine what rhetorical job the referenced information performs in the passage as a whole. Evidence relationship: relationship-reversal.",
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

### Question: sat-series-b-mock-15-rw-059

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Inferences
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of municipal efforts to coordinate street markets as cities expanded compared observations from different conditions instead of treating the first pattern as conclusive. Contemporary records show that the policy produced a visible change, although the effect varied across neighborhoods. The result therefore supports a narrower claim than a simple comparison might initially suggest. The evidence is strongest when the regional pattern is considered alongside differences among individual communities. The analysis of municipal efforts to coordinate street markets as cities expanded drew on 1602 examples from 3 settings over 8 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-059",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-059",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-059",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-059-history-social-science-claim-evidence-interpretation",
  "conceptFingerprint": "information-and-ideas-Inferences-history-social-science-7",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-059-sat-mock-15-59",
    "contextFamily": "sat-series-b-history-social-science-claim-evidence-interpretation",
    "passageGenre": "history-social-science",
    "readingTopic": "municipal efforts to coordinate street markets as cities expanded",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "infer",
    "questionConstruction": "Inferences",
    "passageWordCount": 56,
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
      "rhetorical_structure": "claim-evidence-interpretation",
      "evidence_relationship": "direct-support",
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
      "required_inference": "Draw only the conclusion that is warranted by the stated or strongly implied evidence. Evidence relationship: direct-support.",
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

### Question: sat-series-b-mock-15-rw-060

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Boundaries
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of how archaeologists infer trade connections from recurring ceramic materials drew on 1603 examples from 4 settings over 10 observation periods. The revised method produced a clearer signal _____ it required additional calibration.

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
  "contentId": "sat-series-b-mock-15-rw-060",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-060",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-060",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-060-humanities-comparison-synthesis",
  "conceptFingerprint": "standard-english-conventions-Boundaries-humanities-8",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-060-sat-mock-15-60",
    "contextFamily": "sat-series-b-humanities-comparison-synthesis",
    "passageGenre": "humanities",
    "readingTopic": "how archaeologists infer trade connections from recurring ceramic materials",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "qualified-support",
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Identify the clause structure and then select punctuation that creates the required sentence boundary. Evidence relationship: qualified-support.",
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

### Question: sat-series-b-mock-15-rw-061

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Cross-Text Connections
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
In examining whether a coating changes the stability of a battery electrode during repeated cycles, researchers focused on what changed rather than assuming that the change had a single explanation. The experiment separates an observed association from the stronger claim that one factor alone caused the outcome. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation.

Passage 2: A recent study of farmers adapting cooperative practices when regional prices became less predictable compared observations from different conditions instead of treating the first pattern as conclusive. Contemporary records show that the policy produced a visible change, although the effect varied across neighborhoods. The result therefore supports a narrower claim than a simple comparison might initially suggest. The analysis compared repeated measurements taken under different conditions before the researchers interpreted the overall trend. The analysis of whether a coating changes the stability of a battery electrode during repeated cycles drew on 1604 examples from 5 settings over 5 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-061",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-061",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-061",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-061-science-claim-evidence-interpretation",
  "conceptFingerprint": "craft-and-structure-Cross-Text Connections-science-9",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-061-sat-mock-15-61",
    "contextFamily": "sat-series-b-science-claim-evidence-interpretation",
    "passageGenre": "science",
    "readingTopic": "whether a coating changes the stability of a battery electrode during repeated cycles",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "contrast",
    "cognitiveOperation": "synthesize",
    "questionConstruction": "Cross-Text Connections",
    "passageWordCount": 63,
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
      "rhetorical_structure": "claim-evidence-interpretation",
      "evidence_relationship": "contrast",
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
      "required_inference": "Compare both passages before deciding how their claims or interpretations relate. Evidence relationship: contrast.",
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

### Question: sat-series-b-mock-15-rw-062

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Command of Evidence
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of a student sorting letters left by a relative who avoided public attention compared observations from different conditions instead of treating the first pattern as conclusive. The narrator initially treats the change as an inconvenience, but a later observation makes the earlier judgment seem incomplete. The result therefore supports a narrower claim than a simple comparison might initially suggest. The narrator notices a difference between what was expected and what is actually visible without immediately explaining it. The analysis of student sorting letters left by a relative who avoided public attention drew on 1605 examples from 6 settings over 7 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-062",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-062",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-062",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-062-literature-comparison-synthesis",
  "conceptFingerprint": "information-and-ideas-Command of Evidence-literature-10",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-062-sat-mock-15-62",
    "contextFamily": "sat-series-b-literature-comparison-synthesis",
    "passageGenre": "literature",
    "readingTopic": "a student sorting letters left by a relative who avoided public attention",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "inference",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Command of Evidence",
    "passageWordCount": 62,
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Connect the selected evidence directly to the interpretation named in the question. Evidence relationship: inference.",
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

### Question: sat-series-b-mock-15-rw-063

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Form, Structure, and Sense
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of the spread of neighborhood associations during a period of rapid population growth drew on 1606 examples from 7 settings over 9 observation periods. The set of measurements, rather than the individual readings, _____ the basis for comparison.

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
  "contentId": "sat-series-b-mock-15-rw-063",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-063",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-063",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-063-history-social-science-claim-evidence-interpretation",
  "conceptFingerprint": "standard-english-conventions-Form, Structure, and Sense-history-social-science-11",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-063-sat-mock-15-63",
    "contextFamily": "sat-series-b-history-social-science-claim-evidence-interpretation",
    "passageGenre": "history-social-science",
    "readingTopic": "the spread of neighborhood associations during a period of rapid population growth",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "example-to-claim",
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Select the grammatical form that agrees with the sentence structure and preserves its meaning. Evidence relationship: example-to-claim.",
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

### Question: sat-series-b-mock-15-rw-064

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Rhetorical Synthesis
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
Study focus: the spread of neighborhood associations during a period of rapid population growth. Observation: the evidence shows a measurable difference between the two settings. Qualification: the size of the difference depends on conditions surrounding the observation. Goal: state the result accurately without making a broader claim than the evidence supports. The analysis of museum study of how visitors move between objects with related themes drew on 1607 examples from 8 settings over 4 observation periods. The comparison was reviewed again so that the result could be stated without dropping its important qualification.

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
  "contentId": "sat-series-b-mock-15-rw-064",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-064",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-064",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-064-humanities-comparison-synthesis",
  "conceptFingerprint": "expression-of-ideas-Rhetorical Synthesis-humanities-12",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-064-sat-mock-15-64",
    "contextFamily": "sat-series-b-humanities-comparison-synthesis",
    "passageGenre": "humanities",
    "readingTopic": "a museum study of how visitors move between objects with related themes",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "relationship-reversal",
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
      "rhetorical_structure": "comparison-synthesis",
      "evidence_relationship": "relationship-reversal",
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
      "required_inference": "Select notes that fulfill the stated communication goal without adding an unsupported claim. Evidence relationship: relationship-reversal.",
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

### Question: sat-series-b-mock-15-rw-065

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Words in Context
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of how seedlings respond to intermittent rather than constant light compared observations from different conditions instead of treating the first pattern as conclusive. Measurements show a consistent overall pattern, but the magnitude of the effect changes under different conditions. The result therefore supports a narrower claim than a simple comparison might initially suggest. The analysis of how seedlings respond to intermittent rather than constant light drew on 1608 examples from 9 settings over 6 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-065",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-065",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-065",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-065-science-claim-evidence-interpretation",
  "conceptFingerprint": "craft-and-structure-Words in Context-science-13",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-065-sat-mock-15-65",
    "contextFamily": "sat-series-b-science-claim-evidence-interpretation",
    "passageGenre": "science",
    "readingTopic": "how seedlings respond to intermittent rather than constant light",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Words in Context",
    "passageWordCount": 56,
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Use the surrounding sentence relationship to select the sense that fits this specific context. Evidence relationship: direct-support.",
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

### Question: sat-series-b-mock-15-rw-066

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Central Ideas and Details
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
An account of a musician deciding whether to preserve a family composition unchanged becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The scene moves from a concrete detail to a reflection that reveals the character’s uncertainty rather than resolving it. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. The character observes the setting from a new position, making a familiar feature appear different without changing the feature itself. The analysis of musician deciding whether to preserve a family composition unchanged drew on 1609 examples from 10 settings over 8 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-066",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-066",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-066",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-066-literature-comparison-synthesis",
  "conceptFingerprint": "information-and-ideas-Central Ideas and Details-literature-14",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-066-sat-mock-15-66",
    "contextFamily": "sat-series-b-literature-comparison-synthesis",
    "passageGenre": "literature",
    "readingTopic": "a musician deciding whether to preserve a family composition unchanged",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "qualified-support",
    "cognitiveOperation": "identify",
    "questionConstruction": "Central Ideas and Details",
    "passageWordCount": 65,
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
      "rhetorical_structure": "comparison-synthesis",
      "evidence_relationship": "qualified-support",
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
      "required_inference": "Identify the passage-level claim that best integrates the major information rather than a single detail. Evidence relationship: qualified-support.",
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

### Question: sat-series-b-mock-15-rw-067

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Transitions
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of community debate over whether a new transit route should follow an older commercial corridor drew on 1610 examples from 3 settings over 10 observation periods. The researchers observed a strong overall pattern. _____, the size of the effect differed among the study conditions.

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
  "contentId": "sat-series-b-mock-15-rw-067",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-067",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-067",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-067-history-social-science-claim-evidence-interpretation",
  "conceptFingerprint": "expression-of-ideas-Transitions-history-social-science-15",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-067-sat-mock-15-67",
    "contextFamily": "sat-series-b-history-social-science-claim-evidence-interpretation",
    "passageGenre": "history-social-science",
    "readingTopic": "a community debate over whether a new transit route should follow an older commercial corridor",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "contrast",
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Identify the logical relationship between the surrounding sentences before selecting the transition. Evidence relationship: contrast.",
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

### Question: sat-series-b-mock-15-rw-068

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Text Structure and Purpose
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of a linguist comparing how speakers signal uncertainty in two related dialects compared observations from different conditions instead of treating the first pattern as conclusive. The comparison indicates that a feature often described as decorative also served a practical communicative purpose. The result therefore supports a narrower claim than a simple comparison might initially suggest. The analysis separates what can be observed directly from what must be inferred about the creator’s intention. The analysis of linguist comparing how speakers signal uncertainty in two related dialects drew on 1611 examples from 4 settings over 5 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-068",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-068",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-068",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-068-humanities-comparison-synthesis",
  "conceptFingerprint": "craft-and-structure-Text Structure and Purpose-humanities-16",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-068-sat-mock-15-68",
    "contextFamily": "sat-series-b-humanities-comparison-synthesis",
    "passageGenre": "humanities",
    "readingTopic": "a linguist comparing how speakers signal uncertainty in two related dialects",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "inference",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Text Structure and Purpose",
    "passageWordCount": 58,
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Determine what rhetorical job the referenced information performs in the passage as a whole. Evidence relationship: inference.",
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

### Question: sat-series-b-mock-15-rw-069

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Inferences
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
An account of the effect of water temperature on the activity of a freshwater organism becomes more informative when its evidence is considered alongside the circumstances in which it was collected. A follow-up measurement supports the broad interpretation while identifying a condition that limits how widely it can be applied. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. The experiment repeated the procedure after one relevant condition was adjusted, allowing the interpretation to be qualified. The analysis of the effect of water temperature on the activity of a freshwater organism drew on 1612 examples from 5 settings over 7 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-069",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-069",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-069",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-069-science-claim-evidence-interpretation",
  "conceptFingerprint": "information-and-ideas-Inferences-science-0",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-069-sat-mock-15-69",
    "contextFamily": "sat-series-b-science-claim-evidence-interpretation",
    "passageGenre": "science",
    "readingTopic": "the effect of water temperature on the activity of a freshwater organism",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "example-to-claim",
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
      "rhetorical_structure": "claim-evidence-interpretation",
      "evidence_relationship": "example-to-claim",
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
      "required_inference": "Draw only the conclusion that is warranted by the stated or strongly implied evidence. Evidence relationship: example-to-claim.",
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

### Question: sat-series-b-mock-15-rw-070

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Boundaries
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of traveler recognizing a familiar landscape from an unfamiliar direction drew on 1613 examples from 6 settings over 9 observation periods. The revised method produced a clearer signal _____ it required additional calibration.

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
  "contentId": "sat-series-b-mock-15-rw-070",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-070",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-070",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-070-literature-comparison-synthesis",
  "conceptFingerprint": "standard-english-conventions-Boundaries-literature-1",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-070-sat-mock-15-70",
    "contextFamily": "sat-series-b-literature-comparison-synthesis",
    "passageGenre": "literature",
    "readingTopic": "a traveler recognizing a familiar landscape from an unfamiliar direction",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Boundaries",
    "passageWordCount": 58,
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Identify the clause structure and then select punctuation that creates the required sentence boundary. Evidence relationship: relationship-reversal.",
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

### Question: sat-series-b-mock-15-rw-071

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Cross-Text Connections
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of municipal efforts to coordinate street markets as cities expanded compared observations from different conditions instead of treating the first pattern as conclusive. Contemporary records show that the policy produced a visible change, although the effect varied across neighborhoods. The result therefore supports a narrower claim than a simple comparison might initially suggest.

Passage 2: An account of the movement of sediment after vegetation is restored along a riverbank becomes more informative when its evidence is considered alongside the circumstances in which it was collected. A follow-up measurement supports the broad interpretation while identifying a condition that limits how widely it can be applied. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. The evidence is strongest when the regional pattern is considered alongside differences among individual communities. The analysis of municipal efforts to coordinate street markets as cities expanded drew on 1614 examples from 7 settings over 4 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-071",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-071",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-071",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-071-history-social-science-claim-evidence-interpretation",
  "conceptFingerprint": "craft-and-structure-Cross-Text Connections-history-social-science-2",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-071-sat-mock-15-71",
    "contextFamily": "sat-series-b-history-social-science-claim-evidence-interpretation",
    "passageGenre": "history-social-science",
    "readingTopic": "municipal efforts to coordinate street markets as cities expanded",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "synthesize",
    "questionConstruction": "Cross-Text Connections",
    "passageWordCount": 56,
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
      "rhetorical_structure": "claim-evidence-interpretation",
      "evidence_relationship": "direct-support",
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
      "required_inference": "Compare both passages before deciding how their claims or interpretations relate. Evidence relationship: direct-support.",
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

### Question: sat-series-b-mock-15-rw-072

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Command of Evidence
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
An account of how archaeologists infer trade connections from recurring ceramic materials becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The evidence becomes more informative when the object is considered alongside the setting in which audiences encountered it. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. The interpretation becomes more precise when similarities among examples are weighed against their contextual differences. The analysis of how archaeologists infer trade connections from recurring ceramic materials drew on 1615 examples from 8 settings over 6 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-072",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-072",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-072",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-072-humanities-comparison-synthesis",
  "conceptFingerprint": "information-and-ideas-Command of Evidence-humanities-3",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-072-sat-mock-15-72",
    "contextFamily": "sat-series-b-humanities-comparison-synthesis",
    "passageGenre": "humanities",
    "readingTopic": "how archaeologists infer trade connections from recurring ceramic materials",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "qualified-support",
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Connect the selected evidence directly to the interpretation named in the question. Evidence relationship: qualified-support.",
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

### Question: sat-series-b-mock-15-rw-073

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Form, Structure, and Sense
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of whether a coating changes the stability of a battery electrode during repeated cycles drew on 1616 examples from 9 settings over 8 observation periods. The set of measurements, rather than the individual readings, _____ the basis for comparison.

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
  "contentId": "sat-series-b-mock-15-rw-073",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-073",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-073",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-073-science-claim-evidence-interpretation",
  "conceptFingerprint": "standard-english-conventions-Form, Structure, and Sense-science-4",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-073-sat-mock-15-73",
    "contextFamily": "sat-series-b-science-claim-evidence-interpretation",
    "passageGenre": "science",
    "readingTopic": "whether a coating changes the stability of a battery electrode during repeated cycles",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "contrast",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Form, Structure, and Sense",
    "passageWordCount": 63,
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Select the grammatical form that agrees with the sentence structure and preserves its meaning. Evidence relationship: contrast.",
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

### Question: sat-series-b-mock-15-rw-074

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Rhetorical Synthesis
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
Study focus: a community debate over whether a new transit route should follow an older commercial corridor. Observation: the evidence shows a measurable difference between the two settings. Qualification: the size of the difference depends on conditions surrounding the observation. Goal: state the result accurately without making a broader claim than the evidence supports. The analysis of student sorting letters left by a relative who avoided public attention drew on 1617 examples from 10 settings over 10 observation periods. The comparison was reviewed again so that the result could be stated without dropping its important qualification.

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
  "contentId": "sat-series-b-mock-15-rw-074",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-074",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-074",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-074-literature-comparison-synthesis",
  "conceptFingerprint": "expression-of-ideas-Rhetorical Synthesis-literature-5",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-074-sat-mock-15-74",
    "contextFamily": "sat-series-b-literature-comparison-synthesis",
    "passageGenre": "literature",
    "readingTopic": "a student sorting letters left by a relative who avoided public attention",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "inference",
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
      "rhetorical_structure": "comparison-synthesis",
      "evidence_relationship": "inference",
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
      "required_inference": "Select notes that fulfill the stated communication goal without adding an unsupported claim. Evidence relationship: inference.",
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

### Question: sat-series-b-mock-15-rw-075

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Words in Context
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
An account of the spread of neighborhood associations during a period of rapid population growth becomes more informative when its evidence is considered alongside the circumstances in which it was collected. Researchers distinguish the stated purpose of the initiative from the later uses residents found for it. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. The analysis of the spread of neighborhood associations during a period of rapid population growth drew on 1618 examples from 3 settings over 5 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-075",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-075",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-075",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-075-history-social-science-claim-evidence-interpretation",
  "conceptFingerprint": "craft-and-structure-Words in Context-history-social-science-6",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-075-sat-mock-15-75",
    "contextFamily": "sat-series-b-history-social-science-claim-evidence-interpretation",
    "passageGenre": "history-social-science",
    "readingTopic": "the spread of neighborhood associations during a period of rapid population growth",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "example-to-claim",
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Use the surrounding sentence relationship to select the sense that fits this specific context. Evidence relationship: example-to-claim.",
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

### Question: sat-series-b-mock-15-rw-076

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Central Ideas and Details
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
In examining a museum study of how visitors move between objects with related themes, researchers focused on what changed rather than assuming that the change had a single explanation. The researchers caution that a recurring feature does not by itself establish a single origin or intention. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. The evidence comes from multiple examples, allowing the researchers to distinguish a repeated pattern from an isolated design choice. The analysis of museum study of how visitors move between objects with related themes drew on 1619 examples from 4 settings over 7 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-076",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-076",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-076",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-076-humanities-comparison-synthesis",
  "conceptFingerprint": "information-and-ideas-Central Ideas and Details-humanities-7",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-076-sat-mock-15-76",
    "contextFamily": "sat-series-b-humanities-comparison-synthesis",
    "passageGenre": "humanities",
    "readingTopic": "a museum study of how visitors move between objects with related themes",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "identify",
    "questionConstruction": "Central Ideas and Details",
    "passageWordCount": 62,
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
      "rhetorical_structure": "comparison-synthesis",
      "evidence_relationship": "relationship-reversal",
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
      "required_inference": "Identify the passage-level claim that best integrates the major information rather than a single detail. Evidence relationship: relationship-reversal.",
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

### Question: sat-series-b-mock-15-rw-077

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Transitions
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of how seedlings respond to intermittent rather than constant light drew on 1620 examples from 5 settings over 9 observation periods. The researchers observed a strong overall pattern. _____, the size of the effect differed among the study conditions.

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
  "contentId": "sat-series-b-mock-15-rw-077",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-077",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-077",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-077-science-claim-evidence-interpretation",
  "conceptFingerprint": "expression-of-ideas-Transitions-science-8",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-077-sat-mock-15-77",
    "contextFamily": "sat-series-b-science-claim-evidence-interpretation",
    "passageGenre": "science",
    "readingTopic": "how seedlings respond to intermittent rather than constant light",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Transitions",
    "passageWordCount": 56,
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Identify the logical relationship between the surrounding sentences before selecting the transition. Evidence relationship: direct-support.",
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

### Question: sat-series-b-mock-15-rw-078

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Text Structure and Purpose
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
An account of a musician deciding whether to preserve a family composition unchanged becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The scene moves from a concrete detail to a reflection that reveals the character’s uncertainty rather than resolving it. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. The character observes the setting from a new position, making a familiar feature appear different without changing the feature itself. The analysis of musician deciding whether to preserve a family composition unchanged drew on 1621 examples from 6 settings over 4 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-078",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-078",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-078",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-078-literature-comparison-synthesis",
  "conceptFingerprint": "craft-and-structure-Text Structure and Purpose-literature-9",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-078-sat-mock-15-78",
    "contextFamily": "sat-series-b-literature-comparison-synthesis",
    "passageGenre": "literature",
    "readingTopic": "a musician deciding whether to preserve a family composition unchanged",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "qualified-support",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Text Structure and Purpose",
    "passageWordCount": 65,
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Determine what rhetorical job the referenced information performs in the passage as a whole. Evidence relationship: qualified-support.",
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

### Question: sat-series-b-mock-15-rw-079

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Inferences
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
In examining a community debate over whether a new transit route should follow an older commercial corridor, researchers focused on what changed rather than assuming that the change had a single explanation. The evidence suggests that the change was not caused by a single decision but developed through several local responses. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. The comparison includes communities of different sizes, making it possible to distinguish a recurring tendency from a local exception. The analysis of community debate over whether a new transit route should follow an older commercial corridor drew on 1622 examples from 7 settings over 6 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-079",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-079",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-079",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-079-history-social-science-claim-evidence-interpretation",
  "conceptFingerprint": "information-and-ideas-Inferences-history-social-science-10",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-079-sat-mock-15-79",
    "contextFamily": "sat-series-b-history-social-science-claim-evidence-interpretation",
    "passageGenre": "history-social-science",
    "readingTopic": "a community debate over whether a new transit route should follow an older commercial corridor",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "contrast",
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
      "rhetorical_structure": "claim-evidence-interpretation",
      "evidence_relationship": "contrast",
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
      "required_inference": "Draw only the conclusion that is warranted by the stated or strongly implied evidence. Evidence relationship: contrast.",
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

### Question: sat-series-b-mock-15-rw-080

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Boundaries
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of linguist comparing how speakers signal uncertainty in two related dialects drew on 1623 examples from 8 settings over 8 observation periods. The revised method produced a clearer signal _____ it required additional calibration.

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
  "contentId": "sat-series-b-mock-15-rw-080",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-080",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-080",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-080-humanities-comparison-synthesis",
  "conceptFingerprint": "standard-english-conventions-Boundaries-humanities-11",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-080-sat-mock-15-80",
    "contextFamily": "sat-series-b-humanities-comparison-synthesis",
    "passageGenre": "humanities",
    "readingTopic": "a linguist comparing how speakers signal uncertainty in two related dialects",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "inference",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Boundaries",
    "passageWordCount": 58,
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Identify the clause structure and then select punctuation that creates the required sentence boundary. Evidence relationship: inference.",
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

### Question: sat-series-b-mock-15-rw-081

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Cross-Text Connections
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
An account of the effect of water temperature on the activity of a freshwater organism becomes more informative when its evidence is considered alongside the circumstances in which it was collected. A follow-up measurement supports the broad interpretation while identifying a condition that limits how widely it can be applied. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition.

Passage 2: An account of a policy experiment designed to reduce congestion without restricting access to businesses becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The evidence suggests that the change was not caused by a single decision but developed through several local responses. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. The experiment repeated the procedure after one relevant condition was adjusted, allowing the interpretation to be qualified. The analysis of the effect of water temperature on the activity of a freshwater organism drew on 1624 examples from 9 settings over 10 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-081",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-081",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-081",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-081-science-claim-evidence-interpretation",
  "conceptFingerprint": "craft-and-structure-Cross-Text Connections-science-12",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-081-sat-mock-15-81",
    "contextFamily": "sat-series-b-science-claim-evidence-interpretation",
    "passageGenre": "science",
    "readingTopic": "the effect of water temperature on the activity of a freshwater organism",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "example-to-claim",
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
      "rhetorical_structure": "claim-evidence-interpretation",
      "evidence_relationship": "example-to-claim",
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
      "required_inference": "Compare both passages before deciding how their claims or interpretations relate. Evidence relationship: example-to-claim.",
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

### Question: sat-series-b-mock-15-rw-082

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Command of Evidence
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
In examining a traveler recognizing a familiar landscape from an unfamiliar direction, researchers focused on what changed rather than assuming that the change had a single explanation. The character values continuity, yet the setting repeatedly introduces evidence that change has already occurred. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. A concrete detail is repeated later in the scene, but its meaning shifts because the surrounding circumstances have changed. The analysis of traveler recognizing a familiar landscape from an unfamiliar direction drew on 1625 examples from 10 settings over 5 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-082",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-082",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-082",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-082-literature-comparison-synthesis",
  "conceptFingerprint": "information-and-ideas-Command of Evidence-literature-13",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-082-sat-mock-15-82",
    "contextFamily": "sat-series-b-literature-comparison-synthesis",
    "passageGenre": "literature",
    "readingTopic": "a traveler recognizing a familiar landscape from an unfamiliar direction",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Command of Evidence",
    "passageWordCount": 58,
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Connect the selected evidence directly to the interpretation named in the question. Evidence relationship: relationship-reversal.",
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

### Question: sat-series-b-mock-15-rw-083

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Form, Structure, and Sense
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of municipal efforts to coordinate street markets as cities expanded drew on 1626 examples from 3 settings over 7 observation periods. The set of measurements, rather than the individual readings, _____ the basis for comparison.

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
  "contentId": "sat-series-b-mock-15-rw-083",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-083",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-083",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-083-history-social-science-claim-evidence-interpretation",
  "conceptFingerprint": "standard-english-conventions-Form, Structure, and Sense-history-social-science-14",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-083-sat-mock-15-83",
    "contextFamily": "sat-series-b-history-social-science-claim-evidence-interpretation",
    "passageGenre": "history-social-science",
    "readingTopic": "municipal efforts to coordinate street markets as cities expanded",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Form, Structure, and Sense",
    "passageWordCount": 56,
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Select the grammatical form that agrees with the sentence structure and preserves its meaning. Evidence relationship: direct-support.",
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

### Question: sat-series-b-mock-15-rw-084

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Rhetorical Synthesis
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
Study focus: municipal efforts to coordinate street markets as cities expanded. Observation: the evidence shows a measurable difference between the two settings. Qualification: the size of the difference depends on conditions surrounding the observation. Goal: state the result accurately without making a broader claim than the evidence supports. The analysis of how archaeologists infer trade connections from recurring ceramic materials drew on 1627 examples from 4 settings over 9 observation periods. The comparison was reviewed again so that the result could be stated without dropping its important qualification.

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
  "contentId": "sat-series-b-mock-15-rw-084",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-084",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-084",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-084-humanities-comparison-synthesis",
  "conceptFingerprint": "expression-of-ideas-Rhetorical Synthesis-humanities-15",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-084-sat-mock-15-84",
    "contextFamily": "sat-series-b-humanities-comparison-synthesis",
    "passageGenre": "humanities",
    "readingTopic": "how archaeologists infer trade connections from recurring ceramic materials",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "qualified-support",
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
      "rhetorical_structure": "comparison-synthesis",
      "evidence_relationship": "qualified-support",
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
      "required_inference": "Select notes that fulfill the stated communication goal without adding an unsupported claim. Evidence relationship: qualified-support.",
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

### Question: sat-series-b-mock-15-rw-085

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Words in Context
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
In examining whether a coating changes the stability of a battery electrode during repeated cycles, researchers focused on what changed rather than assuming that the change had a single explanation. The experiment separates an observed association from the stronger claim that one factor alone caused the outcome. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. The analysis of whether a coating changes the stability of a battery electrode during repeated cycles drew on 1628 examples from 5 settings over 4 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-085",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-085",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-085",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-085-science-claim-evidence-interpretation",
  "conceptFingerprint": "craft-and-structure-Words in Context-science-16",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-085-sat-mock-15-85",
    "contextFamily": "sat-series-b-science-claim-evidence-interpretation",
    "passageGenre": "science",
    "readingTopic": "whether a coating changes the stability of a battery electrode during repeated cycles",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "contrast",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Words in Context",
    "passageWordCount": 63,
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Use the surrounding sentence relationship to select the sense that fits this specific context. Evidence relationship: contrast.",
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

### Question: sat-series-b-mock-15-rw-086

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Central Ideas and Details
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of a student sorting letters left by a relative who avoided public attention compared observations from different conditions instead of treating the first pattern as conclusive. The narrator initially treats the change as an inconvenience, but a later observation makes the earlier judgment seem incomplete. The result therefore supports a narrower claim than a simple comparison might initially suggest. The narrator notices a difference between what was expected and what is actually visible without immediately explaining it. The analysis of student sorting letters left by a relative who avoided public attention drew on 1629 examples from 6 settings over 6 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-086",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-086",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-086",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-086-literature-comparison-synthesis",
  "conceptFingerprint": "information-and-ideas-Central Ideas and Details-literature-0",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-086-sat-mock-15-86",
    "contextFamily": "sat-series-b-literature-comparison-synthesis",
    "passageGenre": "literature",
    "readingTopic": "a student sorting letters left by a relative who avoided public attention",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "inference",
    "cognitiveOperation": "identify",
    "questionConstruction": "Central Ideas and Details",
    "passageWordCount": 62,
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
      "rhetorical_structure": "comparison-synthesis",
      "evidence_relationship": "inference",
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
      "required_inference": "Identify the passage-level claim that best integrates the major information rather than a single detail. Evidence relationship: inference.",
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

### Question: sat-series-b-mock-15-rw-087

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Transitions
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of the spread of neighborhood associations during a period of rapid population growth drew on 1630 examples from 7 settings over 8 observation periods. The researchers observed a strong overall pattern. _____, the size of the effect differed among the study conditions.

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
  "contentId": "sat-series-b-mock-15-rw-087",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-087",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-087",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-087-history-social-science-claim-evidence-interpretation",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-087-sat-mock-15-87",
    "contextFamily": "sat-series-b-history-social-science-claim-evidence-interpretation",
    "passageGenre": "history-social-science",
    "readingTopic": "the spread of neighborhood associations during a period of rapid population growth",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "example-to-claim",
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Identify the logical relationship between the surrounding sentences before selecting the transition. Evidence relationship: example-to-claim.",
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

### Question: sat-series-b-mock-15-rw-088

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Text Structure and Purpose
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
In examining a museum study of how visitors move between objects with related themes, researchers focused on what changed rather than assuming that the change had a single explanation. The researchers caution that a recurring feature does not by itself establish a single origin or intention. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. The evidence comes from multiple examples, allowing the researchers to distinguish a repeated pattern from an isolated design choice. The analysis of museum study of how visitors move between objects with related themes drew on 1631 examples from 8 settings over 10 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-088",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-088",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-088",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-088-humanities-comparison-synthesis",
  "conceptFingerprint": "craft-and-structure-Text Structure and Purpose-humanities-2",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-088-sat-mock-15-88",
    "contextFamily": "sat-series-b-humanities-comparison-synthesis",
    "passageGenre": "humanities",
    "readingTopic": "a museum study of how visitors move between objects with related themes",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Text Structure and Purpose",
    "passageWordCount": 62,
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Determine what rhetorical job the referenced information performs in the passage as a whole. Evidence relationship: relationship-reversal.",
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

### Question: sat-series-b-mock-15-rw-089

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Inferences
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of how seedlings respond to intermittent rather than constant light compared observations from different conditions instead of treating the first pattern as conclusive. Measurements show a consistent overall pattern, but the magnitude of the effect changes under different conditions. The result therefore supports a narrower claim than a simple comparison might initially suggest. A follow-up observation was collected after the system returned to typical conditions, providing a check on the initial result. The analysis of how seedlings respond to intermittent rather than constant light drew on 1632 examples from 9 settings over 5 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-089",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-089",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-089",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-089-science-claim-evidence-interpretation",
  "conceptFingerprint": "information-and-ideas-Inferences-science-3",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-089-sat-mock-15-89",
    "contextFamily": "sat-series-b-science-claim-evidence-interpretation",
    "passageGenre": "science",
    "readingTopic": "how seedlings respond to intermittent rather than constant light",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "infer",
    "questionConstruction": "Inferences",
    "passageWordCount": 56,
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
      "rhetorical_structure": "claim-evidence-interpretation",
      "evidence_relationship": "direct-support",
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
      "required_inference": "Draw only the conclusion that is warranted by the stated or strongly implied evidence. Evidence relationship: direct-support.",
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

### Question: sat-series-b-mock-15-rw-090

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Boundaries
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of musician deciding whether to preserve a family composition unchanged drew on 1633 examples from 10 settings over 7 observation periods. The revised method produced a clearer signal _____ it required additional calibration.

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
  "contentId": "sat-series-b-mock-15-rw-090",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-090",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-090",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-090-literature-comparison-synthesis",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-090-sat-mock-15-90",
    "contextFamily": "sat-series-b-literature-comparison-synthesis",
    "passageGenre": "literature",
    "readingTopic": "a musician deciding whether to preserve a family composition unchanged",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "qualified-support",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Boundaries",
    "passageWordCount": 65,
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Identify the clause structure and then select punctuation that creates the required sentence boundary. Evidence relationship: qualified-support.",
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

### Question: sat-series-b-mock-15-rw-091

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Cross-Text Connections
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
In examining a community debate over whether a new transit route should follow an older commercial corridor, researchers focused on what changed rather than assuming that the change had a single explanation. The evidence suggests that the change was not caused by a single decision but developed through several local responses. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation.

Passage 2: A recent study of how migratory birds alter stopover timing when food availability changes compared observations from different conditions instead of treating the first pattern as conclusive. Measurements show a consistent overall pattern, but the magnitude of the effect changes under different conditions. The result therefore supports a narrower claim than a simple comparison might initially suggest. The comparison includes communities of different sizes, making it possible to distinguish a recurring tendency from a local exception. The analysis of community debate over whether a new transit route should follow an older commercial corridor drew on 1634 examples from 3 settings over 9 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-091",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-091",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-091",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-091-history-social-science-claim-evidence-interpretation",
  "conceptFingerprint": "craft-and-structure-Cross-Text Connections-history-social-science-5",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-091-sat-mock-15-91",
    "contextFamily": "sat-series-b-history-social-science-claim-evidence-interpretation",
    "passageGenre": "history-social-science",
    "readingTopic": "a community debate over whether a new transit route should follow an older commercial corridor",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "contrast",
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
      "rhetorical_structure": "claim-evidence-interpretation",
      "evidence_relationship": "contrast",
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
      "required_inference": "Compare both passages before deciding how their claims or interpretations relate. Evidence relationship: contrast.",
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

### Question: sat-series-b-mock-15-rw-092

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Command of Evidence
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of a linguist comparing how speakers signal uncertainty in two related dialects compared observations from different conditions instead of treating the first pattern as conclusive. The comparison indicates that a feature often described as decorative also served a practical communicative purpose. The result therefore supports a narrower claim than a simple comparison might initially suggest. The analysis separates what can be observed directly from what must be inferred about the creator’s intention. The analysis of linguist comparing how speakers signal uncertainty in two related dialects drew on 1635 examples from 4 settings over 4 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-092",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-092",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-092",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-092-humanities-comparison-synthesis",
  "conceptFingerprint": "information-and-ideas-Command of Evidence-humanities-6",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-092-sat-mock-15-92",
    "contextFamily": "sat-series-b-humanities-comparison-synthesis",
    "passageGenre": "humanities",
    "readingTopic": "a linguist comparing how speakers signal uncertainty in two related dialects",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "inference",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Command of Evidence",
    "passageWordCount": 58,
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Connect the selected evidence directly to the interpretation named in the question. Evidence relationship: inference.",
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

### Question: sat-series-b-mock-15-rw-093

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Form, Structure, and Sense
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of the effect of water temperature on the activity of a freshwater organism drew on 1636 examples from 5 settings over 6 observation periods. The set of measurements, rather than the individual readings, _____ the basis for comparison.

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
  "contentId": "sat-series-b-mock-15-rw-093",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-093",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-093",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-093-science-claim-evidence-interpretation",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-093-sat-mock-15-93",
    "contextFamily": "sat-series-b-science-claim-evidence-interpretation",
    "passageGenre": "science",
    "readingTopic": "the effect of water temperature on the activity of a freshwater organism",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "example-to-claim",
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Select the grammatical form that agrees with the sentence structure and preserves its meaning. Evidence relationship: example-to-claim.",
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

### Question: sat-series-b-mock-15-rw-094

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Rhetorical Synthesis
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
Study focus: the restoration choices made when a damaged architectural feature has several plausible originals. Observation: the evidence shows a measurable difference between the two settings. Qualification: the size of the difference depends on conditions surrounding the observation. Goal: state the result accurately without making a broader claim than the evidence supports. The analysis of traveler recognizing a familiar landscape from an unfamiliar direction drew on 1637 examples from 6 settings over 8 observation periods. The comparison was reviewed again so that the result could be stated without dropping its important qualification.

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
  "contentId": "sat-series-b-mock-15-rw-094",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-094",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-094",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-094-literature-comparison-synthesis",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-094-sat-mock-15-94",
    "contextFamily": "sat-series-b-literature-comparison-synthesis",
    "passageGenre": "literature",
    "readingTopic": "a traveler recognizing a familiar landscape from an unfamiliar direction",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "relationship-reversal",
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
      "rhetorical_structure": "comparison-synthesis",
      "evidence_relationship": "relationship-reversal",
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
      "required_inference": "Select notes that fulfill the stated communication goal without adding an unsupported claim. Evidence relationship: relationship-reversal.",
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

### Question: sat-series-b-mock-15-rw-095

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Words in Context
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of municipal efforts to coordinate street markets as cities expanded compared observations from different conditions instead of treating the first pattern as conclusive. Contemporary records show that the policy produced a visible change, although the effect varied across neighborhoods. The result therefore supports a narrower claim than a simple comparison might initially suggest. The analysis of municipal efforts to coordinate street markets as cities expanded drew on 1638 examples from 7 settings over 10 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-095",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-095",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-095",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-095-history-social-science-claim-evidence-interpretation",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-095-sat-mock-15-95",
    "contextFamily": "sat-series-b-history-social-science-claim-evidence-interpretation",
    "passageGenre": "history-social-science",
    "readingTopic": "municipal efforts to coordinate street markets as cities expanded",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Words in Context",
    "passageWordCount": 56,
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Use the surrounding sentence relationship to select the sense that fits this specific context. Evidence relationship: direct-support.",
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

### Question: sat-series-b-mock-15-rw-096

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Central Ideas and Details
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
An account of how archaeologists infer trade connections from recurring ceramic materials becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The evidence becomes more informative when the object is considered alongside the setting in which audiences encountered it. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. The interpretation becomes more precise when similarities among examples are weighed against their contextual differences. The analysis of how archaeologists infer trade connections from recurring ceramic materials drew on 1639 examples from 8 settings over 5 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-096",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-096",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-096",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-096-humanities-comparison-synthesis",
  "conceptFingerprint": "information-and-ideas-Central Ideas and Details-humanities-10",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-096-sat-mock-15-96",
    "contextFamily": "sat-series-b-humanities-comparison-synthesis",
    "passageGenre": "humanities",
    "readingTopic": "how archaeologists infer trade connections from recurring ceramic materials",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "qualified-support",
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
      "rhetorical_structure": "comparison-synthesis",
      "evidence_relationship": "qualified-support",
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
      "required_inference": "Identify the passage-level claim that best integrates the major information rather than a single detail. Evidence relationship: qualified-support.",
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

### Question: sat-series-b-mock-15-rw-097

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Transitions
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of whether a coating changes the stability of a battery electrode during repeated cycles drew on 1640 examples from 9 settings over 7 observation periods. The researchers observed a strong overall pattern. _____, the size of the effect differed among the study conditions.

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
  "contentId": "sat-series-b-mock-15-rw-097",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-097",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-097",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-097-science-claim-evidence-interpretation",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-097-sat-mock-15-97",
    "contextFamily": "sat-series-b-science-claim-evidence-interpretation",
    "passageGenre": "science",
    "readingTopic": "whether a coating changes the stability of a battery electrode during repeated cycles",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "contrast",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Transitions",
    "passageWordCount": 63,
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Identify the logical relationship between the surrounding sentences before selecting the transition. Evidence relationship: contrast.",
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

### Question: sat-series-b-mock-15-rw-098

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Text Structure and Purpose
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of a student sorting letters left by a relative who avoided public attention compared observations from different conditions instead of treating the first pattern as conclusive. The narrator initially treats the change as an inconvenience, but a later observation makes the earlier judgment seem incomplete. The result therefore supports a narrower claim than a simple comparison might initially suggest. The narrator notices a difference between what was expected and what is actually visible without immediately explaining it. The analysis of student sorting letters left by a relative who avoided public attention drew on 1641 examples from 10 settings over 9 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-098",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-098",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-098",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-098-literature-comparison-synthesis",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-098-sat-mock-15-98",
    "contextFamily": "sat-series-b-literature-comparison-synthesis",
    "passageGenre": "literature",
    "readingTopic": "a student sorting letters left by a relative who avoided public attention",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "inference",
    "cognitiveOperation": "interpret",
    "questionConstruction": "Text Structure and Purpose",
    "passageWordCount": 62,
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Determine what rhetorical job the referenced information performs in the passage as a whole. Evidence relationship: inference.",
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

### Question: sat-series-b-mock-15-rw-099

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Inferences
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
An account of the spread of neighborhood associations during a period of rapid population growth becomes more informative when its evidence is considered alongside the circumstances in which it was collected. Researchers distinguish the stated purpose of the initiative from the later uses residents found for it. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. Records from before and after the change provide a baseline against which the later pattern can be interpreted. The analysis of the spread of neighborhood associations during a period of rapid population growth drew on 1642 examples from 3 settings over 4 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-099",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-099",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-099",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-099-history-social-science-claim-evidence-interpretation",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-099-sat-mock-15-99",
    "contextFamily": "sat-series-b-history-social-science-claim-evidence-interpretation",
    "passageGenre": "history-social-science",
    "readingTopic": "the spread of neighborhood associations during a period of rapid population growth",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "example-to-claim",
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
      "rhetorical_structure": "claim-evidence-interpretation",
      "evidence_relationship": "example-to-claim",
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
      "required_inference": "Draw only the conclusion that is warranted by the stated or strongly implied evidence. Evidence relationship: example-to-claim.",
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

### Question: sat-series-b-mock-15-rw-100

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Boundaries
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of museum study of how visitors move between objects with related themes drew on 1643 examples from 4 settings over 6 observation periods. The revised method produced a clearer signal _____ it required additional calibration.

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
  "contentId": "sat-series-b-mock-15-rw-100",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-100",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-100",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-100-humanities-comparison-synthesis",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-100-sat-mock-15-100",
    "contextFamily": "sat-series-b-humanities-comparison-synthesis",
    "passageGenre": "humanities",
    "readingTopic": "a museum study of how visitors move between objects with related themes",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Boundaries",
    "passageWordCount": 62,
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Identify the clause structure and then select punctuation that creates the required sentence boundary. Evidence relationship: relationship-reversal.",
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

### Question: sat-series-b-mock-15-rw-101

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Cross-Text Connections
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A recent study of how seedlings respond to intermittent rather than constant light compared observations from different conditions instead of treating the first pattern as conclusive. Measurements show a consistent overall pattern, but the magnitude of the effect changes under different conditions. The result therefore supports a narrower claim than a simple comparison might initially suggest.

Passage 2: An account of changes in how local newspapers described public libraries in the early twentieth century becomes more informative when its evidence is considered alongside the circumstances in which it was collected. Researchers distinguish the stated purpose of the initiative from the later uses residents found for it. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. A follow-up observation was collected after the system returned to typical conditions, providing a check on the initial result. The analysis of how seedlings respond to intermittent rather than constant light drew on 1644 examples from 5 settings over 8 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-101",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-101",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-101",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-101-science-claim-evidence-interpretation",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-101-sat-mock-15-101",
    "contextFamily": "sat-series-b-science-claim-evidence-interpretation",
    "passageGenre": "science",
    "readingTopic": "how seedlings respond to intermittent rather than constant light",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "synthesize",
    "questionConstruction": "Cross-Text Connections",
    "passageWordCount": 56,
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
      "rhetorical_structure": "claim-evidence-interpretation",
      "evidence_relationship": "direct-support",
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
      "required_inference": "Compare both passages before deciding how their claims or interpretations relate. Evidence relationship: direct-support.",
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

### Question: sat-series-b-mock-15-rw-102

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Command of Evidence
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
An account of a musician deciding whether to preserve a family composition unchanged becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The scene moves from a concrete detail to a reflection that reveals the character’s uncertainty rather than resolving it. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. The character observes the setting from a new position, making a familiar feature appear different without changing the feature itself. The analysis of musician deciding whether to preserve a family composition unchanged drew on 1645 examples from 6 settings over 10 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-102",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-102",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-102",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-102-literature-comparison-synthesis",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-102-sat-mock-15-102",
    "contextFamily": "sat-series-b-literature-comparison-synthesis",
    "passageGenre": "literature",
    "readingTopic": "a musician deciding whether to preserve a family composition unchanged",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "qualified-support",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Command of Evidence",
    "passageWordCount": 65,
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Connect the selected evidence directly to the interpretation named in the question. Evidence relationship: qualified-support.",
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

### Question: sat-series-b-mock-15-rw-103

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: standard-english-conventions
SKILL: Form, Structure, and Sense
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of community debate over whether a new transit route should follow an older commercial corridor drew on 1646 examples from 7 settings over 5 observation periods. The set of measurements, rather than the individual readings, _____ the basis for comparison.

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
  "contentId": "sat-series-b-mock-15-rw-103",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-103",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-103",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-103-history-social-science-claim-evidence-interpretation",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-103-sat-mock-15-103",
    "contextFamily": "sat-series-b-history-social-science-claim-evidence-interpretation",
    "passageGenre": "history-social-science",
    "readingTopic": "a community debate over whether a new transit route should follow an older commercial corridor",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "contrast",
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Select the grammatical form that agrees with the sentence structure and preserves its meaning. Evidence relationship: contrast.",
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

### Question: sat-series-b-mock-15-rw-104

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Rhetorical Synthesis
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
Study focus: the changing use of color in a regional school of landscape painting. Observation: the evidence shows a measurable difference between the two settings. Qualification: the size of the difference depends on conditions surrounding the observation. Goal: state the result accurately without making a broader claim than the evidence supports. The analysis of linguist comparing how speakers signal uncertainty in two related dialects drew on 1647 examples from 8 settings over 7 observation periods. The comparison was reviewed again so that the result could be stated without dropping its important qualification.

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
  "contentId": "sat-series-b-mock-15-rw-104",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-104",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-104",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-104-humanities-comparison-synthesis",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-104-sat-mock-15-104",
    "contextFamily": "sat-series-b-humanities-comparison-synthesis",
    "passageGenre": "humanities",
    "readingTopic": "a linguist comparing how speakers signal uncertainty in two related dialects",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "inference",
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
      "rhetorical_structure": "comparison-synthesis",
      "evidence_relationship": "inference",
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
      "required_inference": "Select notes that fulfill the stated communication goal without adding an unsupported claim. Evidence relationship: inference.",
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

### Question: sat-series-b-mock-15-rw-105

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Words in Context
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
An account of the effect of water temperature on the activity of a freshwater organism becomes more informative when its evidence is considered alongside the circumstances in which it was collected. A follow-up measurement supports the broad interpretation while identifying a condition that limits how widely it can be applied. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. The analysis of the effect of water temperature on the activity of a freshwater organism drew on 1648 examples from 9 settings over 9 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-105",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-105",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-105",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-105-science-claim-evidence-interpretation",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-105-sat-mock-15-105",
    "contextFamily": "sat-series-b-science-claim-evidence-interpretation",
    "passageGenre": "science",
    "readingTopic": "the effect of water temperature on the activity of a freshwater organism",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "science",
    "textType": "research-summary",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "example-to-claim",
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Use the surrounding sentence relationship to select the sense that fits this specific context. Evidence relationship: example-to-claim.",
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

### Question: sat-series-b-mock-15-rw-106

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: information-and-ideas
SKILL: Central Ideas and Details
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
In examining a traveler recognizing a familiar landscape from an unfamiliar direction, researchers focused on what changed rather than assuming that the change had a single explanation. The character values continuity, yet the setting repeatedly introduces evidence that change has already occurred. Taken together, the observations support a useful pattern but leave room for a more qualified interpretation. A concrete detail is repeated later in the scene, but its meaning shifts because the surrounding circumstances have changed. The analysis of traveler recognizing a familiar landscape from an unfamiliar direction drew on 1649 examples from 10 settings over 4 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-106",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-106",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-106",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-106-literature-comparison-synthesis",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-106-sat-mock-15-106",
    "contextFamily": "sat-series-b-literature-comparison-synthesis",
    "passageGenre": "literature",
    "readingTopic": "a traveler recognizing a familiar landscape from an unfamiliar direction",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "literature",
    "textType": "literary-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "relationship-reversal",
    "cognitiveOperation": "identify",
    "questionConstruction": "Central Ideas and Details",
    "passageWordCount": 58,
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
      "rhetorical_structure": "comparison-synthesis",
      "evidence_relationship": "relationship-reversal",
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
      "required_inference": "Identify the passage-level claim that best integrates the major information rather than a single detail. Evidence relationship: relationship-reversal.",
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

### Question: sat-series-b-mock-15-rw-107

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: expression-of-ideas
SKILL: Transitions
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
The analysis of municipal efforts to coordinate street markets as cities expanded drew on 1650 examples from 3 settings over 6 observation periods. The researchers observed a strong overall pattern. _____, the size of the effect differed among the study conditions.

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
  "contentId": "sat-series-b-mock-15-rw-107",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-107",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-107",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-107-history-social-science-claim-evidence-interpretation",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-107-sat-mock-15-107",
    "contextFamily": "sat-series-b-history-social-science-claim-evidence-interpretation",
    "passageGenre": "history-social-science",
    "readingTopic": "municipal efforts to coordinate street markets as cities expanded",
    "rhetoricalPurpose": "claim-evidence-interpretation",
    "answerFormat": "A-D",
    "sourceFamily": "history-social-science",
    "textType": "informational-prose",
    "rhetoricalStructure": "claim-evidence-interpretation",
    "evidenceRelationship": "direct-support",
    "cognitiveOperation": "evaluate",
    "questionConstruction": "Transitions",
    "passageWordCount": 56,
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
      "rhetorical_structure": "claim-evidence-interpretation",
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
      "required_inference": "Identify the logical relationship between the surrounding sentences before selecting the transition. Evidence relationship: direct-support.",
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

### Question: sat-series-b-mock-15-rw-108

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: reading-writing
MODULE: rw-module-2
DOMAIN: craft-and-structure
SKILL: Text Structure and Purpose
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
An account of how archaeologists infer trade connections from recurring ceramic materials becomes more informative when its evidence is considered alongside the circumstances in which it was collected. The evidence becomes more informative when the object is considered alongside the setting in which audiences encountered it. This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition. The interpretation becomes more precise when similarities among examples are weighed against their contextual differences. The analysis of how archaeologists infer trade connections from recurring ceramic materials drew on 1651 examples from 4 settings over 8 observation periods.

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
  "contentId": "sat-series-b-mock-15-rw-108",
  "version": 5,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-rw-108",
  "testId": "sat-series-b-mock-15",
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
  "passageId": "sat-mock-15-passage-108",
  "figure": null,
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-rw-108-humanities-comparison-synthesis",
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
    "contextKey": "sat-series-b-sat-mock-15-rw-108-sat-mock-15-108",
    "contextFamily": "sat-series-b-humanities-comparison-synthesis",
    "passageGenre": "humanities",
    "readingTopic": "how archaeologists infer trade connections from recurring ceramic materials",
    "rhetoricalPurpose": "comparison-synthesis",
    "answerFormat": "A-D",
    "sourceFamily": "humanities",
    "textType": "informational-prose",
    "rhetoricalStructure": "comparison-synthesis",
    "evidenceRelationship": "qualified-support",
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
      "rhetorical_structure": "comparison-synthesis",
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
      "required_inference": "Determine what rhetorical job the referenced information performs in the passage as a whole. Evidence relationship: qualified-support.",
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

### Question: sat-series-b-mock-15-math-math-module-1-m1-01

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-1
DOMAIN: Algebra
SKILL: Linear functions and representations
DIFFICULTY: easy
QUESTION TYPE: student-produced-response

PROMPT:
A monitoring team relates the measured values through the stated mathematical condition. The model provides the constraint needed to determine the target. The initial condition establishes the reference relationship. A line passes through (13, 73) and (15, 83). What is its slope?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 5

EXPLANATION:
Slope = (83 − 73)/(15 − 13) = 5.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-1-m1-01",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-1-m1-01",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
  "section": "math",
  "module": "math-module-1",
  "domain": "Algebra",
  "skill": "Linear functions and representations",
  "subskill": "Linear functions and representations",
  "conceptId": "Algebra-linear-functions-and-representations",
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-1-m1-01",
  "conceptFingerprint": "Algebra-Linear functions and representations-0",
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
    "contextKey": "sat-series-b-sat-mock-15-math-0",
    "contextFamily": "sat-series-b-Algebra-Linear functions and representations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Algebra-Linear functions and representations-0",
    "constructionFamily": "sat-series-b|sat-mock-15|Algebra|Linear functions and representations|family-7",
    "answerFormat": "numeric",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift",
      "two-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-1-m1-02

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-1
DOMAIN: Algebra
SKILL: Linear functions
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A resource planner compares a starting condition with a later condition to determine the requested quantity. The unknown is isolated from the stated condition. The initial condition establishes the reference relationship. A linear model is y = 3x + 8. What is y when x = 14?

CHOICES:
[
  "50",
  "49",
  "100",
  "51"
]

ANSWER: A

EXPLANATION:
Substitute x = 14: y = 3(14) + 8 = 50.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-1-m1-02",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-1-m1-02",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-1-m1-02",
  "conceptFingerprint": "Algebra-Linear functions-1",
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
    "contextKey": "sat-series-b-sat-mock-15-math-1",
    "contextFamily": "sat-series-b-Algebra-Linear functions",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Algebra-Linear functions-1",
    "constructionFamily": "sat-series-b|sat-mock-15|Algebra|Linear functions|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-1-m1-03

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-1
DOMAIN: Algebra
SKILL: Linear equations
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
An operations analyst uses the stated model to connect the observed quantities and identify the requested value. The mathematical relationship is evaluated using the given measurements. The initial condition establishes the reference relationship. A linear model is y = 8x + 7. For what value of x is y = 127?

CHOICES:
[
  "16",
  "15",
  "14",
  "30"
]

ANSWER: B

EXPLANATION:
Subtract 7 and divide by 8 to obtain x = 15.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-1-m1-03",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-1-m1-03",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-1-m1-03",
  "conceptFingerprint": "Algebra-Linear equations-2",
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
    "contextKey": "sat-series-b-sat-mock-15-math-2",
    "contextFamily": "sat-series-b-Algebra-Linear equations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Algebra-Linear equations-2",
    "constructionFamily": "sat-series-b|sat-mock-15|Algebra|Linear equations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "two-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-1-m1-04

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-1
DOMAIN: Algebra
SKILL: Linear representations
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
An engineering team represents the relationship symbolically and checks the unknown against an observed condition. The reported measurements are translated into the required mathematical form. The initial condition establishes the reference relationship. A line passes through (16, 103) and has slope 6. What is its y-intercept?

CHOICES:
[
  "8",
  "6",
  "7",
  "14"
]

ANSWER: C

EXPLANATION:
Using y = mx + b gives b = 7.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-1-m1-04",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-1-m1-04",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-1-m1-04",
  "conceptFingerprint": "Algebra-Linear representations-3",
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
    "contextKey": "sat-series-b-sat-mock-15-math-3",
    "contextFamily": "sat-series-b-Algebra-Linear representations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Algebra-Linear representations-3",
    "constructionFamily": "sat-series-b|sat-mock-15|Algebra|Linear representations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-1-m1-05

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-1
DOMAIN: Algebra
SKILL: Linear functions and representations
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A systems analyst converts the stated conditions into a mathematical relationship and evaluates the unknown. The quantities are connected through the model given in the scenario. The initial condition establishes the reference relationship. A line passes through (2, 15) and (4, 23). What is its slope?

CHOICES:
[
  "5",
  "3",
  "8",
  "4"
]

ANSWER: D

EXPLANATION:
Slope = (23 − 15)/(4 − 2) = 4.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-1-m1-05",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-1-m1-05",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-1-m1-05",
  "conceptFingerprint": "Algebra-Linear functions and representations-4",
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
    "contextKey": "sat-series-b-sat-mock-15-math-4",
    "contextFamily": "sat-series-b-Algebra-Linear functions and representations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Algebra-Linear functions and representations-4",
    "constructionFamily": "sat-series-b|sat-mock-15|Algebra|Linear functions and representations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift",
      "two-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-1-m1-06

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-1
DOMAIN: Algebra
SKILL: Linear functions
DIFFICULTY: easy
QUESTION TYPE: student-produced-response

PROMPT:
A planning analyst models a changing quantity from a stated baseline and rate. The baseline is established before the requested quantity is determined. The initial condition establishes the reference relationship. A linear model is y = 2x + 7. What is y when x = 3?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 13

EXPLANATION:
Substitute x = 3: y = 2(3) + 7 = 13.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-1-m1-06",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-1-m1-06",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-1-m1-06",
  "conceptFingerprint": "Algebra-Linear functions-5",
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
    "contextKey": "sat-series-b-sat-mock-15-math-5",
    "contextFamily": "sat-series-b-Algebra-Linear functions",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Algebra-Linear functions-5",
    "constructionFamily": "sat-series-b|sat-mock-15|Algebra|Linear functions|family-7",
    "answerFormat": "numeric",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-1-m1-07

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-1
DOMAIN: Algebra
SKILL: Linear equations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A measurement team uses a stated relationship between variables to reconstruct the missing value. The calculation focuses on the condition that links the known and unknown values. The initial condition establishes the reference relationship. A linear model is y = 7x + 6. For what value of x is y = 34?

CHOICES:
[
  "4",
  "5",
  "3",
  "8"
]

ANSWER: A

EXPLANATION:
Subtract 6 and divide by 7 to obtain x = 4.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-1-m1-07",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-1-m1-07",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
  "section": "math",
  "module": "math-module-1",
  "domain": "Algebra",
  "skill": "Linear equations",
  "subskill": "Linear equations",
  "conceptId": "Algebra-linear-equations",
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-1-m1-07",
  "conceptFingerprint": "Algebra-Linear equations-6",
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
    "contextKey": "sat-series-b-sat-mock-15-math-6",
    "contextFamily": "sat-series-b-Algebra-Linear equations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Algebra-Linear equations-6",
    "constructionFamily": "sat-series-b|sat-mock-15|Algebra|Linear equations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "two-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-1-m1-08

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-1
DOMAIN: Algebra
SKILL: Linear representations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A project analyst translates the reported quantities into an equation before evaluating the target. The requested value follows from the relationship among the measured quantities. The initial condition establishes the reference relationship. A line passes through (5, 31) and has slope 5. What is its y-intercept?

CHOICES:
[
  "7",
  "6",
  "5",
  "12"
]

ANSWER: B

EXPLANATION:
Using y = mx + b gives b = 6.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-1-m1-08",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-1-m1-08",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-1-m1-08",
  "conceptFingerprint": "Algebra-Linear representations-7",
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
    "contextKey": "sat-series-b-sat-mock-15-math-7",
    "contextFamily": "sat-series-b-Algebra-Linear representations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Algebra-Linear representations-7",
    "constructionFamily": "sat-series-b|sat-mock-15|Algebra|Linear representations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-1-m1-09

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-1
DOMAIN: Advanced Math
SKILL: Quadratic parameter reasoning
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
An operations analyst uses the stated model to connect the observed quantities and identify the requested value. The calculation uses the reported relationship directly. The initial condition establishes the reference relationship. For 1x² − 18x + k = 0, the equation has exactly one real solution. What is k?

CHOICES:
[
  "82",
  "80",
  "81",
  "162"
]

ANSWER: C

EXPLANATION:
A repeated root requires the discriminant to equal zero.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-1-m1-09",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-1-m1-09",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-1-m1-09",
  "conceptFingerprint": "Advanced Math-Quadratic parameter reasoning-8",
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
    "contextKey": "sat-series-b-sat-mock-15-math-8",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic parameter reasoning",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Advanced Math-Quadratic parameter reasoning-8",
    "constructionFamily": "sat-series-b|sat-mock-15|Advanced Math|Quadratic parameter reasoning|family-7",
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

### Question: sat-series-b-mock-15-math-math-module-1-m1-10

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-1
DOMAIN: Advanced Math
SKILL: Quadratic equations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
An engineering team represents the relationship symbolically and checks the unknown against an observed condition. The stated quantities provide enough information to identify the target. The initial condition establishes the reference relationship. A quadratic has roots 3 and 8. What is the sum of the roots?

CHOICES:
[
  "12",
  "10",
  "22",
  "11"
]

ANSWER: D

EXPLANATION:
Add the two roots: 3 + 8 = 11.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-1-m1-10",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-1-m1-10",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-1-m1-10",
  "conceptFingerprint": "Advanced Math-Quadratic equations-9",
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
    "contextKey": "sat-series-b-sat-mock-15-math-9",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic equations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Advanced Math-Quadratic equations-9",
    "constructionFamily": "sat-series-b|sat-mock-15|Advanced Math|Quadratic equations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-1-m1-11

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-1
DOMAIN: Advanced Math
SKILL: Exponential equations
DIFFICULTY: medium
QUESTION TYPE: student-produced-response

PROMPT:
A systems analyst converts the stated conditions into a mathematical relationship and evaluates the unknown. The model provides the constraint needed to determine the target. The initial condition establishes the reference relationship. If 4^x = 256, what is x?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 4

EXPLANATION:
Equal powers with the same base have equal exponents, so x = 4.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-1-m1-11",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-1-m1-11",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
  "section": "math",
  "module": "math-module-1",
  "domain": "Advanced Math",
  "skill": "Exponential equations",
  "subskill": "Exponential equations",
  "conceptId": "Advanced Math-exponential-equations",
  "difficulty": "medium",
  "difficultyBand": "math-module-1-medium",
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
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-1-m1-11",
  "conceptFingerprint": "Advanced Math-Exponential equations-10",
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
    "contextKey": "sat-series-b-sat-mock-15-math-10",
    "contextFamily": "sat-series-b-Advanced Math-Exponential equations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Advanced Math-Exponential equations-10",
    "constructionFamily": "sat-series-b|sat-mock-15|Advanced Math|Exponential equations|family-7",
    "answerFormat": "numeric",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-1-m1-12

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-1
DOMAIN: Advanced Math
SKILL: Quadratic functions and representations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A planning analyst models a changing quantity from a stated baseline and rate. The unknown is isolated from the stated condition. The initial condition establishes the reference relationship. For f(x) = (x − 20306)² + 20311, what is the minimum value of f?

CHOICES:
[
  "20311",
  "20312",
  "20310",
  "40622"
]

ANSWER: A

EXPLANATION:
The square is minimized at 0, so the minimum is 20311.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-1-m1-12",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-1-m1-12",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
    "equation": "y = 1x² − 40612x + 412353947",
    "x_range": [
      20296,
      20316
    ],
    "visualVariant": "sat-mock-15-math-math-module-1-m1-12"
  },
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-1-m1-12",
  "conceptFingerprint": "Advanced Math-Quadratic functions and representations-11",
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
    "contextKey": "sat-series-b-sat-mock-15-math-11",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic functions and representations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Advanced Math-Quadratic functions and representations-11",
    "constructionFamily": "sat-series-b|sat-mock-15|Advanced Math|Quadratic functions and representations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "representation-shift",
      "multi-step",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "advanced math|parabola|{equation:y = <n>x² − <n>x + <n>|type:parabola|x_range:[<n>,<n>]}|data:advanced math|parabola|{equation:y = 1x² − 40612x + 412353947|type:parabola|x_range:[20296,20316]}",
    "figureStructureFingerprint": "advanced math|parabola|{equation:y = <n>x² − <n>x + <n>|type:parabola|x_range:[<n>,<n>]}",
    "figureDataFingerprint": "advanced math|parabola|{equation:y = 1x² − 40612x + 412353947|type:parabola|x_range:[20296,20316]}"
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-1-m1-13

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-1
DOMAIN: Advanced Math
SKILL: Quadratic parameter reasoning
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A measurement team uses a stated relationship between variables to reconstruct the missing value. The mathematical relationship is evaluated using the given measurements. The initial condition establishes the reference relationship. For 3x² − 48x + k = 0, the equation has exactly one real solution. What is k?

CHOICES:
[
  "193",
  "192",
  "191",
  "384"
]

ANSWER: B

EXPLANATION:
A repeated root requires the discriminant to equal zero.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-1-m1-13",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-1-m1-13",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-1-m1-13",
  "conceptFingerprint": "Advanced Math-Quadratic parameter reasoning-12",
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
    "contextKey": "sat-series-b-sat-mock-15-math-12",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic parameter reasoning",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Advanced Math-Quadratic parameter reasoning-12",
    "constructionFamily": "sat-series-b|sat-mock-15|Advanced Math|Quadratic parameter reasoning|family-7",
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

### Question: sat-series-b-mock-15-math-math-module-1-m1-14

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-1
DOMAIN: Advanced Math
SKILL: Quadratic equations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A project analyst translates the reported quantities into an equation before evaluating the target. The reported measurements are translated into the required mathematical form. The initial condition establishes the reference relationship. A quadratic has roots 7 and 12. What is the sum of the roots?

CHOICES:
[
  "20",
  "18",
  "19",
  "38"
]

ANSWER: C

EXPLANATION:
Add the two roots: 7 + 12 = 19.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-1-m1-14",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-1-m1-14",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-1-m1-14",
  "conceptFingerprint": "Advanced Math-Quadratic equations-13",
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
    "contextKey": "sat-series-b-sat-mock-15-math-13",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic equations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Advanced Math-Quadratic equations-13",
    "constructionFamily": "sat-series-b|sat-mock-15|Advanced Math|Quadratic equations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-1-m1-15

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-1
DOMAIN: Advanced Math
SKILL: Exponential equations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A data specialist translates the stated relationship into a mathematical model before determining the requested value. The quantities are connected through the model given in the scenario. The initial condition establishes the reference relationship. If 3^x = 81, what is x?

CHOICES:
[
  "8",
  "5",
  "3",
  "4"
]

ANSWER: D

EXPLANATION:
Equal powers with the same base have equal exponents, so x = 4.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-1-m1-15",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-1-m1-15",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-1-m1-15",
  "conceptFingerprint": "Advanced Math-Exponential equations-14",
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
    "contextKey": "sat-series-b-sat-mock-15-math-14",
    "contextFamily": "sat-series-b-Advanced Math-Exponential equations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Advanced Math-Exponential equations-14",
    "constructionFamily": "sat-series-b|sat-mock-15|Advanced Math|Exponential equations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-1-m1-16

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-1
DOMAIN: Advanced Math
SKILL: Quadratic functions and representations
DIFFICULTY: hard
QUESTION TYPE: student-produced-response

PROMPT:
A research coordinator compares linked measurements and uses the reported constraint to determine the result. The baseline is established before the requested quantity is determined. The initial condition establishes the reference relationship. For f(x) = (x − 20310)² + 20307, what is the minimum value of f?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 20307

EXPLANATION:
The square is minimized at 0, so the minimum is 20307.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-1-m1-16",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-1-m1-16",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
  "section": "math",
  "module": "math-module-1",
  "domain": "Advanced Math",
  "skill": "Quadratic functions and representations",
  "subskill": "Quadratic functions and representations",
  "conceptId": "Advanced Math-quadratic-functions-and-representations",
  "difficulty": "hard",
  "difficultyBand": "math-module-1-hard",
  "cognitiveDemand": "analyze",
  "questionType": "student-produced-response",
  "stimulusType": "quadratic",
  "interactionType": "student-produced-response",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": {
    "type": "parabola",
    "equation": "y = 1x² − 40620x + 412516407",
    "x_range": [
      20300,
      20320
    ],
    "visualVariant": "sat-mock-15-math-math-module-1-m1-16"
  },
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-1-m1-16",
  "conceptFingerprint": "Advanced Math-Quadratic functions and representations-15",
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
    "contextKey": "sat-series-b-sat-mock-15-math-15",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic functions and representations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Advanced Math-Quadratic functions and representations-15",
    "constructionFamily": "sat-series-b|sat-mock-15|Advanced Math|Quadratic functions and representations|family-7",
    "answerFormat": "numeric",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "representation-shift",
      "multi-step",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "advanced math|parabola|{equation:y = <n>x² − <n>x + <n>|type:parabola|x_range:[<n>,<n>]}|data:advanced math|parabola|{equation:y = 1x² − 40620x + 412516407|type:parabola|x_range:[20300,20320]}",
    "figureStructureFingerprint": "advanced math|parabola|{equation:y = <n>x² − <n>x + <n>|type:parabola|x_range:[<n>,<n>]}",
    "figureDataFingerprint": "advanced math|parabola|{equation:y = 1x² − 40620x + 412516407|type:parabola|x_range:[20300,20320]}"
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-1-m1-17

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-1
DOMAIN: Problem-Solving and Data Analysis
SKILL: Weighted means
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A field researcher compares two measured states and reconstructs the unknown quantity from the reported relationship. The calculation focuses on the condition that links the known and unknown values. The initial condition establishes the reference relationship. Group A has 20 observations with mean 19; Group B has 32 observations with mean 36. What is the combined mean?

CHOICES:
[
  "29.46",
  "28.46",
  "30.46",
  "58.92"
]

ANSWER: A

EXPLANATION:
Use the weighted total divided by the combined number of observations.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-1-m1-17",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-1-m1-17",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
  "section": "math",
  "module": "math-module-1",
  "domain": "Problem-Solving and Data Analysis",
  "skill": "Weighted means",
  "subskill": "Weighted means",
  "conceptId": "Problem-Solving and Data Analysis-weighted-means",
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-1-m1-17",
  "conceptFingerprint": "Problem-Solving and Data Analysis-Weighted means-16",
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
    "contextKey": "sat-series-b-sat-mock-15-math-16",
    "contextFamily": "sat-series-b-Problem-Solving and Data Analysis-Weighted means",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Problem-Solving and Data Analysis-Weighted means-16",
    "constructionFamily": "sat-series-b|sat-mock-15|Problem-Solving and Data Analysis|Weighted means|family-7",
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

### Question: sat-series-b-mock-15-math-math-module-1-m1-18

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-1
DOMAIN: Problem-Solving and Data Analysis
SKILL: Percentages
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A quality analyst checks how a reported change follows from the quantities given in the scenario. The requested value follows from the relationship among the measured quantities. The initial condition establishes the reference relationship. A survey includes 379 responses. 39% select option A. How many responses select A?

CHOICES:
[
  "148.81",
  "147.81",
  "295.62",
  "146.81"
]

ANSWER: B

EXPLANATION:
Multiply 379 by 39/100.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-1-m1-18",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-1-m1-18",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-1-m1-18",
  "conceptFingerprint": "Problem-Solving and Data Analysis-Percentages-17",
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
    "contextKey": "sat-series-b-sat-mock-15-math-17",
    "contextFamily": "sat-series-b-Problem-Solving and Data Analysis-Percentages",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Problem-Solving and Data Analysis-Percentages-17",
    "constructionFamily": "sat-series-b|sat-mock-15|Problem-Solving and Data Analysis|Percentages|family-7",
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

### Question: sat-series-b-mock-15-math-math-module-1-m1-19

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-1
DOMAIN: Problem-Solving and Data Analysis
SKILL: Data models
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A monitoring team relates the measured values through the stated mathematical condition. The calculation uses the reported relationship directly. The initial condition establishes the reference relationship. A data set is modeled by y = 4x + 7. What y-value is predicted when x = 13?

CHOICES:
[
  "58",
  "60",
  "59",
  "118"
]

ANSWER: C

EXPLANATION:
Substitute x = 13 into the model.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-1-m1-19",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-1-m1-19",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
        20307
      ],
      [
        2,
        20311
      ],
      [
        3,
        20315
      ],
      [
        4,
        20319
      ],
      [
        5,
        20306
      ],
      [
        6,
        20310
      ]
    ],
    "visualVariant": "sat-mock-15-math-math-module-1-m1-19"
  },
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-1-m1-19",
  "conceptFingerprint": "Problem-Solving and Data Analysis-Data models-18",
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
    "contextKey": "sat-series-b-sat-mock-15-math-18",
    "contextFamily": "sat-series-b-Problem-Solving and Data Analysis-Data models",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Problem-Solving and Data Analysis-Data models-18",
    "constructionFamily": "sat-series-b|sat-mock-15|Problem-Solving and Data Analysis|Data models|family-7",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "data-interpretation",
      "representation-shift",
      "strategic-choice",
      "multi-step"
    ],
    "figureOriginalityFingerprint": "problem-solving and data analysis|scatter_plot|{points:[[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>]]|type:scatter_plot}|data:problem-solving and data analysis|scatter_plot|{points:[[1,20307],[2,20311],[3,20315],[4,20319],[5,20306],[6,20310]]|type:scatter_plot}",
    "figureStructureFingerprint": "problem-solving and data analysis|scatter_plot|{points:[[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>]]|type:scatter_plot}",
    "figureDataFingerprint": "problem-solving and data analysis|scatter_plot|{points:[[1,20307],[2,20311],[3,20315],[4,20319],[5,20306],[6,20310]]|type:scatter_plot}"
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-1-m1-20

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-1
DOMAIN: Geometry and Trigonometry
SKILL: Right triangles
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A resource planner compares a starting condition with a later condition to determine the requested quantity. The stated quantities provide enough information to identify the target. The initial condition establishes the reference relationship. A right triangle has legs 20316 and 20310. What is its area?

CHOICES:
[
  "206308981",
  "412617960",
  "206308979",
  "206308980"
]

ANSWER: D

EXPLANATION:
Area equals one-half the product of the perpendicular legs.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-1-m1-20",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-1-m1-20",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
  "section": "math",
  "module": "math-module-1",
  "domain": "Geometry and Trigonometry",
  "skill": "Right triangles",
  "subskill": "Right triangles",
  "conceptId": "Geometry and Trigonometry-right-triangles",
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
    "type": "right_triangle",
    "leg_a": 20316,
    "leg_b": 20310,
    "labels": {
      "a": "a",
      "b": "b",
      "c": "c"
    },
    "unknown_side": "c",
    "visualVariant": "sat-mock-15-math-math-module-1-m1-20"
  },
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-1-m1-20",
  "conceptFingerprint": "Geometry and Trigonometry-Right triangles-19",
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
    "contextKey": "sat-series-b-sat-mock-15-math-19",
    "contextFamily": "sat-series-b-Geometry and Trigonometry-Right triangles",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Geometry and Trigonometry-Right triangles-19",
    "constructionFamily": "sat-series-b|sat-mock-15|Geometry and Trigonometry|Right triangles|family-7",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "representation-shift",
      "multi-step",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "geometry and trigonometry|right_triangle|{labels:{a:a|b:b|c:c}|leg_a:<n>|leg_b:<n>|type:right_triangle|unknown_side:c}|data:geometry and trigonometry|right_triangle|{labels:{a:a|b:b|c:c}|leg_a:20316|leg_b:20310|type:right_triangle|unknown_side:c}",
    "figureStructureFingerprint": "geometry and trigonometry|right_triangle|{labels:{a:a|b:b|c:c}|leg_a:<n>|leg_b:<n>|type:right_triangle|unknown_side:c}",
    "figureDataFingerprint": "geometry and trigonometry|right_triangle|{labels:{a:a|b:b|c:c}|leg_a:20316|leg_b:20310|type:right_triangle|unknown_side:c}"
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-1-m1-21

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-1
DOMAIN: Geometry and Trigonometry
SKILL: Similarity and scaling
DIFFICULTY: hard
QUESTION TYPE: student-produced-response

PROMPT:
An operations analyst uses the stated model to connect the observed quantities and identify the requested value. The model provides the constraint needed to determine the target. The initial condition establishes the reference relationship. Two similar figures have corresponding lengths in the ratio 5079:1. The smaller figure has area 50762. What is the larger area?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 1309468785642

EXPLANATION:
Areas scale by the square of the length ratio.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-1-m1-21",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-1-m1-21",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
  "section": "math",
  "module": "math-module-1",
  "domain": "Geometry and Trigonometry",
  "skill": "Similarity and scaling",
  "subskill": "Similarity and scaling",
  "conceptId": "Geometry and Trigonometry-similarity-and-scaling",
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
    "shape": "similar-figures",
    "values": {
      "scale": 5079,
      "area": 50762
    },
    "visualVariant": "sat-mock-15-math-math-module-1-m1-21"
  },
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-1-m1-21",
  "conceptFingerprint": "Geometry and Trigonometry-Similarity and scaling-20",
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
    "contextKey": "sat-series-b-sat-mock-15-math-20",
    "contextFamily": "sat-series-b-Geometry and Trigonometry-Similarity and scaling",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Geometry and Trigonometry-Similarity and scaling-20",
    "constructionFamily": "sat-series-b|sat-mock-15|Geometry and Trigonometry|Similarity and scaling|family-7",
    "answerFormat": "numeric",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "multi-step",
      "constraint-inference",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:<n>|scale:<n>}}|data:geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:50762|scale:5079}}",
    "figureStructureFingerprint": "geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:<n>|scale:<n>}}",
    "figureDataFingerprint": "geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:50762|scale:5079}}"
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-1-m1-22

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-1
DOMAIN: Geometry and Trigonometry
SKILL: Geometry and measurement
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
An engineering team represents the relationship symbolically and checks the unknown against an observed condition. The unknown is isolated from the stated condition. The initial condition establishes the reference relationship. A triangle has base 20310 and height 20316. What is its area?

CHOICES:
[
  "206308980",
  "206308979",
  "412617960",
  "206308981"
]

ANSWER: A

EXPLANATION:
Use one-half times base times height.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-1-m1-22",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-1-m1-22",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
  "section": "math",
  "module": "math-module-1",
  "domain": "Geometry and Trigonometry",
  "skill": "Geometry and measurement",
  "subskill": "Geometry and measurement",
  "conceptId": "Geometry and Trigonometry-geometry-and-measurement",
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
    "shape": "triangle",
    "values": {
      "base": 20310,
      "height": 20316
    },
    "visualVariant": "sat-mock-15-math-math-module-1-m1-22"
  },
  "isOperational": true,
  "adaptiveRoute": null,
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-1-m1-22",
  "conceptFingerprint": "Geometry and Trigonometry-Geometry and measurement-21",
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
    "contextKey": "sat-series-b-sat-mock-15-math-21",
    "contextFamily": "sat-series-b-Geometry and Trigonometry-Geometry and measurement",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Geometry and Trigonometry-Geometry and measurement-21",
    "constructionFamily": "sat-series-b|sat-mock-15|Geometry and Trigonometry|Geometry and measurement|family-7",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "multi-step",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:<n>|height:<n>}}|data:geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:20310|height:20316}}",
    "figureStructureFingerprint": "geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:<n>|height:<n>}}",
    "figureDataFingerprint": "geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:20310|height:20316}}"
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-high-23

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear equations
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A research coordinator compares linked measurements and uses the reported constraint to determine the result. The mathematical relationship is evaluated using the given measurements. The selected comparison condition establishes the target relationship. A linear model is y = 6x + 11. For what value of x is y = 89?

CHOICES:
[
  "14",
  "13",
  "12",
  "26"
]

ANSWER: B

EXPLANATION:
Subtract 11 and divide by 6 to obtain x = 13.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-high-23",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-high-23",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
  "section": "math",
  "module": "math-module-2",
  "domain": "Algebra",
  "skill": "Linear equations",
  "subskill": "Linear equations",
  "conceptId": "Algebra-linear-equations",
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-high-23",
  "conceptFingerprint": "Algebra-Linear equations-22",
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
    "contextKey": "sat-series-b-sat-mock-15-math-22",
    "contextFamily": "sat-series-b-Algebra-Linear equations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Algebra-Linear equations-22",
    "constructionFamily": "sat-series-b|sat-mock-15|Algebra|Linear equations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "two-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-high-24

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear representations
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A field researcher compares two measured states and reconstructs the unknown quantity from the reported relationship. The reported measurements are translated into the required mathematical form. The selected comparison condition establishes the target relationship. A line passes through (14, 67) and has slope 4. What is its y-intercept?

CHOICES:
[
  "12",
  "10",
  "11",
  "22"
]

ANSWER: C

EXPLANATION:
Using y = mx + b gives b = 11.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-high-24",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-high-24",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-high-24",
  "conceptFingerprint": "Algebra-Linear representations-23",
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
    "contextKey": "sat-series-b-sat-mock-15-math-23",
    "contextFamily": "sat-series-b-Algebra-Linear representations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Algebra-Linear representations-23",
    "constructionFamily": "sat-series-b|sat-mock-15|Algebra|Linear representations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-high-25

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear functions and representations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A quality analyst checks how a reported change follows from the quantities given in the scenario. The quantities are connected through the model given in the scenario. The selected comparison condition establishes the target relationship. A line passes through (15, 41) and (17, 45). What is its slope?

CHOICES:
[
  "3",
  "1",
  "4",
  "2"
]

ANSWER: D

EXPLANATION:
Slope = (45 − 41)/(17 − 15) = 2.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-high-25",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-high-25",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-high-25",
  "conceptFingerprint": "Algebra-Linear functions and representations-24",
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
    "contextKey": "sat-series-b-sat-mock-15-math-24",
    "contextFamily": "sat-series-b-Algebra-Linear functions and representations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Algebra-Linear functions and representations-24",
    "constructionFamily": "sat-series-b|sat-mock-15|Algebra|Linear functions and representations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift",
      "two-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-high-26

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear functions
DIFFICULTY: medium
QUESTION TYPE: student-produced-response

PROMPT:
A monitoring team relates the measured values through the stated mathematical condition. The baseline is established before the requested quantity is determined. The selected comparison condition establishes the target relationship. A linear model is y = 7x + 10. What is y when x = 16?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 122

EXPLANATION:
Substitute x = 16: y = 7(16) + 10 = 122.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-high-26",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-high-26",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
  "section": "math",
  "module": "math-module-2",
  "domain": "Algebra",
  "skill": "Linear functions",
  "subskill": "Linear functions",
  "conceptId": "Algebra-linear-functions",
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-high-26",
  "conceptFingerprint": "Algebra-Linear functions-25",
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
    "contextKey": "sat-series-b-sat-mock-15-math-25",
    "contextFamily": "sat-series-b-Algebra-Linear functions",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Algebra-Linear functions-25",
    "constructionFamily": "sat-series-b|sat-mock-15|Algebra|Linear functions|family-7",
    "answerFormat": "numeric",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-high-27

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear equations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A resource planner compares a starting condition with a later condition to determine the requested quantity. The calculation focuses on the condition that links the known and unknown values. The selected comparison condition establishes the target relationship. A linear model is y = 5x + 10. For what value of x is y = 20?

CHOICES:
[
  "2",
  "3",
  "1",
  "4"
]

ANSWER: A

EXPLANATION:
Subtract 10 and divide by 5 to obtain x = 2.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-high-27",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-high-27",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
  "section": "math",
  "module": "math-module-2",
  "domain": "Algebra",
  "skill": "Linear equations",
  "subskill": "Linear equations",
  "conceptId": "Algebra-linear-equations",
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-high-27",
  "conceptFingerprint": "Algebra-Linear equations-26",
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
    "contextKey": "sat-series-b-sat-mock-15-math-26",
    "contextFamily": "sat-series-b-Algebra-Linear equations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Algebra-Linear equations-26",
    "constructionFamily": "sat-series-b|sat-mock-15|Algebra|Linear equations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "two-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-high-28

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear representations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
An operations analyst uses the stated model to connect the observed quantities and identify the requested value. The requested value follows from the relationship among the measured quantities. The selected comparison condition establishes the target relationship. A line passes through (3, 19) and has slope 3. What is its y-intercept?

CHOICES:
[
  "11",
  "10",
  "9",
  "20"
]

ANSWER: B

EXPLANATION:
Using y = mx + b gives b = 10.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-high-28",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-high-28",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-high-28",
  "conceptFingerprint": "Algebra-Linear representations-27",
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
    "contextKey": "sat-series-b-sat-mock-15-math-27",
    "contextFamily": "sat-series-b-Algebra-Linear representations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Algebra-Linear representations-27",
    "constructionFamily": "sat-series-b|sat-mock-15|Algebra|Linear representations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-high-29

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear functions and representations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
An engineering team represents the relationship symbolically and checks the unknown against an observed condition. The calculation uses the reported relationship directly. The selected comparison condition establishes the target relationship. A line passes through (4, 41) and (6, 57). What is its slope?

CHOICES:
[
  "9",
  "7",
  "8",
  "16"
]

ANSWER: C

EXPLANATION:
Slope = (57 − 41)/(6 − 4) = 8.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-high-29",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-high-29",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-high-29",
  "conceptFingerprint": "Algebra-Linear functions and representations-28",
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
    "contextKey": "sat-series-b-sat-mock-15-math-28",
    "contextFamily": "sat-series-b-Algebra-Linear functions and representations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Algebra-Linear functions and representations-28",
    "constructionFamily": "sat-series-b|sat-mock-15|Algebra|Linear functions and representations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift",
      "two-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-high-30

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic equations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A field researcher compares two measured states and reconstructs the unknown quantity from the reported relationship. The stated quantities provide enough information to identify the target. The selected comparison condition establishes the target relationship. A quadratic has roots 6 and 12. What is the sum of the roots?

CHOICES:
[
  "19",
  "17",
  "36",
  "18"
]

ANSWER: D

EXPLANATION:
Add the two roots: 6 + 12 = 18.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-high-30",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-high-30",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
  "section": "math",
  "module": "math-module-2",
  "domain": "Advanced Math",
  "skill": "Quadratic equations",
  "subskill": "Quadratic equations",
  "conceptId": "Advanced Math-quadratic-equations",
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-high-30",
  "conceptFingerprint": "Advanced Math-Quadratic equations-29",
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
    "contextKey": "sat-series-b-sat-mock-15-math-29",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic equations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Advanced Math-Quadratic equations-29",
    "constructionFamily": "sat-series-b|sat-mock-15|Advanced Math|Quadratic equations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-high-31

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Exponential equations
DIFFICULTY: medium
QUESTION TYPE: student-produced-response

PROMPT:
A quality analyst checks how a reported change follows from the quantities given in the scenario. The model provides the constraint needed to determine the target. The selected comparison condition establishes the target relationship. If 4^x = 64, what is x?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 3

EXPLANATION:
Equal powers with the same base have equal exponents, so x = 3.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-high-31",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-high-31",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
  "section": "math",
  "module": "math-module-2",
  "domain": "Advanced Math",
  "skill": "Exponential equations",
  "subskill": "Exponential equations",
  "conceptId": "Advanced Math-exponential-equations",
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-high-31",
  "conceptFingerprint": "Advanced Math-Exponential equations-30",
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
    "contextKey": "sat-series-b-sat-mock-15-math-30",
    "contextFamily": "sat-series-b-Advanced Math-Exponential equations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Advanced Math-Exponential equations-30",
    "constructionFamily": "sat-series-b|sat-mock-15|Advanced Math|Exponential equations|family-7",
    "answerFormat": "numeric",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-high-32

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic functions and representations
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A monitoring team relates the measured values through the stated mathematical condition. The unknown is isolated from the stated condition. The selected comparison condition establishes the target relationship. For f(x) = (x − 20309)² + 20310, what is the minimum value of f?

CHOICES:
[
  "20310",
  "20311",
  "20309",
  "40620"
]

ANSWER: A

EXPLANATION:
The square is minimized at 0, so the minimum is 20310.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-high-32",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-high-32",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
    "equation": "y = 1x² − 40618x + 412475791",
    "x_range": [
      20299,
      20319
    ],
    "visualVariant": "sat-mock-15-math-math-module-2-high-32"
  },
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-high-32",
  "conceptFingerprint": "Advanced Math-Quadratic functions and representations-31",
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
    "contextKey": "sat-series-b-sat-mock-15-math-31",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic functions and representations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Advanced Math-Quadratic functions and representations-31",
    "constructionFamily": "sat-series-b|sat-mock-15|Advanced Math|Quadratic functions and representations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "representation-shift",
      "multi-step",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "advanced math|parabola|{equation:y = <n>x² − <n>x + <n>|type:parabola|x_range:[<n>,<n>]}|data:advanced math|parabola|{equation:y = 1x² − 40618x + 412475791|type:parabola|x_range:[20299,20319]}",
    "figureStructureFingerprint": "advanced math|parabola|{equation:y = <n>x² − <n>x + <n>|type:parabola|x_range:[<n>,<n>]}",
    "figureDataFingerprint": "advanced math|parabola|{equation:y = 1x² − 40618x + 412475791|type:parabola|x_range:[20299,20319]}"
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-high-33

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic parameter reasoning
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A resource planner compares a starting condition with a later condition to determine the requested quantity. The mathematical relationship is evaluated using the given measurements. The selected comparison condition establishes the target relationship. For 3x² − 60x + k = 0, the equation has exactly one real solution. What is k?

CHOICES:
[
  "301",
  "300",
  "299",
  "600"
]

ANSWER: B

EXPLANATION:
A repeated root requires the discriminant to equal zero.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-high-33",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-high-33",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-high-33",
  "conceptFingerprint": "Advanced Math-Quadratic parameter reasoning-32",
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
    "contextKey": "sat-series-b-sat-mock-15-math-32",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic parameter reasoning",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Advanced Math-Quadratic parameter reasoning-32",
    "constructionFamily": "sat-series-b|sat-mock-15|Advanced Math|Quadratic parameter reasoning|family-7",
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

### Question: sat-series-b-mock-15-math-math-module-2-high-34

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic equations
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
An operations analyst uses the stated model to connect the observed quantities and identify the requested value. The reported measurements are translated into the required mathematical form. The selected comparison condition establishes the target relationship. A quadratic has roots 10 and 16. What is the sum of the roots?

CHOICES:
[
  "27",
  "25",
  "26",
  "52"
]

ANSWER: C

EXPLANATION:
Add the two roots: 10 + 16 = 26.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-high-34",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-high-34",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-high-34",
  "conceptFingerprint": "Advanced Math-Quadratic equations-33",
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
    "contextKey": "sat-series-b-sat-mock-15-math-33",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic equations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Advanced Math-Quadratic equations-33",
    "constructionFamily": "sat-series-b|sat-mock-15|Advanced Math|Quadratic equations|family-7",
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

### Question: sat-series-b-mock-15-math-math-module-2-high-35

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Exponential equations
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
An engineering team represents the relationship symbolically and checks the unknown against an observed condition. The quantities are connected through the model given in the scenario. The selected comparison condition establishes the target relationship. If 3^x = 27, what is x?

CHOICES:
[
  "6",
  "4",
  "2",
  "3"
]

ANSWER: D

EXPLANATION:
Equal powers with the same base have equal exponents, so x = 3.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-high-35",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-high-35",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-high-35",
  "conceptFingerprint": "Advanced Math-Exponential equations-34",
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
    "contextKey": "sat-series-b-sat-mock-15-math-34",
    "contextFamily": "sat-series-b-Advanced Math-Exponential equations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Advanced Math-Exponential equations-34",
    "constructionFamily": "sat-series-b|sat-mock-15|Advanced Math|Exponential equations|family-7",
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

### Question: sat-series-b-mock-15-math-math-module-2-high-36

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic functions and representations
DIFFICULTY: hard
QUESTION TYPE: student-produced-response

PROMPT:
A systems analyst converts the stated conditions into a mathematical relationship and evaluates the unknown. The baseline is established before the requested quantity is determined. The selected comparison condition establishes the target relationship. For f(x) = (x − 20313)² + 20306, what is the minimum value of f?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 20306

EXPLANATION:
The square is minimized at 0, so the minimum is 20306.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-high-36",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-high-36",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
  "section": "math",
  "module": "math-module-2",
  "domain": "Advanced Math",
  "skill": "Quadratic functions and representations",
  "subskill": "Quadratic functions and representations",
  "conceptId": "Advanced Math-quadratic-functions-and-representations",
  "difficulty": "hard",
  "difficultyBand": "math-high-hard",
  "cognitiveDemand": "analyze",
  "questionType": "student-produced-response",
  "stimulusType": "quadratic",
  "interactionType": "student-produced-response",
  "timingMode": "timed",
  "estimatedTimeSeconds": 105,
  "calculatorEligibility": true,
  "calculatorMode": "either",
  "calculatorRequired": false,
  "referenceSheetRelevant": true,
  "figure": {
    "type": "parabola",
    "equation": "y = 1x² − 40626x + 412638275",
    "x_range": [
      20303,
      20323
    ],
    "visualVariant": "sat-mock-15-math-math-module-2-high-36"
  },
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-high-36",
  "conceptFingerprint": "Advanced Math-Quadratic functions and representations-35",
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
    "contextKey": "sat-series-b-sat-mock-15-math-35",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic functions and representations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Advanced Math-Quadratic functions and representations-35",
    "constructionFamily": "sat-series-b|sat-mock-15|Advanced Math|Quadratic functions and representations|family-7",
    "answerFormat": "numeric",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "representation-shift",
      "multi-step",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "advanced math|parabola|{equation:y = <n>x² − <n>x + <n>|type:parabola|x_range:[<n>,<n>]}|data:advanced math|parabola|{equation:y = 1x² − 40626x + 412638275|type:parabola|x_range:[20303,20323]}",
    "figureStructureFingerprint": "advanced math|parabola|{equation:y = <n>x² − <n>x + <n>|type:parabola|x_range:[<n>,<n>]}",
    "figureDataFingerprint": "advanced math|parabola|{equation:y = 1x² − 40626x + 412638275|type:parabola|x_range:[20303,20323]}"
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-high-37

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Problem-Solving and Data Analysis
SKILL: Weighted means
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A planning analyst models a changing quantity from a stated baseline and rate. The calculation focuses on the condition that links the known and unknown values. The selected comparison condition establishes the target relationship. Group A has 23 observations with mean 20; Group B has 27 observations with mean 39. What is the combined mean?

CHOICES:
[
  "30.26",
  "29.26",
  "31.26",
  "60.52"
]

ANSWER: A

EXPLANATION:
Use the weighted total divided by the combined number of observations.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-high-37",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-high-37",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-high-37",
  "conceptFingerprint": "Problem-Solving and Data Analysis-Weighted means-36",
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
    "contextKey": "sat-series-b-sat-mock-15-math-36",
    "contextFamily": "sat-series-b-Problem-Solving and Data Analysis-Weighted means",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Problem-Solving and Data Analysis-Weighted means-36",
    "constructionFamily": "sat-series-b|sat-mock-15|Problem-Solving and Data Analysis|Weighted means|family-7",
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

### Question: sat-series-b-mock-15-math-math-module-2-high-38

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Problem-Solving and Data Analysis
SKILL: Percentages
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A measurement team uses a stated relationship between variables to reconstruct the missing value. The requested value follows from the relationship among the measured quantities. The selected comparison condition establishes the target relationship. A survey includes 599 responses. 56% select option A. How many responses select A?

CHOICES:
[
  "336.44",
  "335.44",
  "670.88",
  "334.44"
]

ANSWER: B

EXPLANATION:
Multiply 599 by 56/100.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-high-38",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-high-38",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-high-38",
  "conceptFingerprint": "Problem-Solving and Data Analysis-Percentages-37",
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
    "contextKey": "sat-series-b-sat-mock-15-math-37",
    "contextFamily": "sat-series-b-Problem-Solving and Data Analysis-Percentages",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Problem-Solving and Data Analysis-Percentages-37",
    "constructionFamily": "sat-series-b|sat-mock-15|Problem-Solving and Data Analysis|Percentages|family-7",
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

### Question: sat-series-b-mock-15-math-math-module-2-high-39

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Problem-Solving and Data Analysis
SKILL: Data models
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A project analyst translates the reported quantities into an equation before evaluating the target. The calculation uses the reported relationship directly. The selected comparison condition establishes the target relationship. A data set is modeled by y = 10x + 19. What y-value is predicted when x = 3?

CHOICES:
[
  "48",
  "50",
  "49",
  "98"
]

ANSWER: C

EXPLANATION:
Substitute x = 3 into the model.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-high-39",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-high-39",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
        20319
      ],
      [
        2,
        20321
      ],
      [
        3,
        20306
      ],
      [
        4,
        20308
      ],
      [
        5,
        20310
      ],
      [
        6,
        20312
      ]
    ],
    "visualVariant": "sat-mock-15-math-math-module-2-high-39"
  },
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-high-39",
  "conceptFingerprint": "Problem-Solving and Data Analysis-Data models-38",
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
    "contextKey": "sat-series-b-sat-mock-15-math-38",
    "contextFamily": "sat-series-b-Problem-Solving and Data Analysis-Data models",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Problem-Solving and Data Analysis-Data models-38",
    "constructionFamily": "sat-series-b|sat-mock-15|Problem-Solving and Data Analysis|Data models|family-7",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "data-interpretation",
      "representation-shift",
      "strategic-choice",
      "multi-step"
    ],
    "figureOriginalityFingerprint": "problem-solving and data analysis|scatter_plot|{points:[[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>]]|type:scatter_plot}|data:problem-solving and data analysis|scatter_plot|{points:[[1,20319],[2,20321],[3,20306],[4,20308],[5,20310],[6,20312]]|type:scatter_plot}",
    "figureStructureFingerprint": "problem-solving and data analysis|scatter_plot|{points:[[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>]]|type:scatter_plot}",
    "figureDataFingerprint": "problem-solving and data analysis|scatter_plot|{points:[[1,20319],[2,20321],[3,20306],[4,20308],[5,20310],[6,20312]]|type:scatter_plot}"
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-high-40

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Problem-Solving and Data Analysis
SKILL: Measures of spread
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A data specialist translates the stated relationship into a mathematical model before determining the requested value. The stated quantities provide enough information to identify the target. The selected comparison condition establishes the target relationship. A data set has first quartile 21 and third quartile 34. What is the interquartile range?

CHOICES:
[
  "14",
  "26",
  "12",
  "13"
]

ANSWER: D

EXPLANATION:
IQR equals Q3 minus Q1.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-high-40",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-high-40",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-high-40",
  "conceptFingerprint": "Problem-Solving and Data Analysis-Measures of spread-39",
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
    "contextKey": "sat-series-b-sat-mock-15-math-39",
    "contextFamily": "sat-series-b-Problem-Solving and Data Analysis-Measures of spread",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Problem-Solving and Data Analysis-Measures of spread-39",
    "constructionFamily": "sat-series-b|sat-mock-15|Problem-Solving and Data Analysis|Measures of spread|family-7",
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

### Question: sat-series-b-mock-15-math-math-module-2-high-41

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Geometry and Trigonometry
SKILL: Similarity and scaling
DIFFICULTY: hard
QUESTION TYPE: student-produced-response

PROMPT:
A research coordinator compares linked measurements and uses the reported constraint to determine the result. The model provides the constraint needed to determine the target. The selected comparison condition establishes the target relationship. Two similar figures have corresponding lengths in the ratio 5079:1. The smaller figure has area 50790. What is the larger area?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 1310191080390

EXPLANATION:
Areas scale by the square of the length ratio.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-high-41",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-high-41",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
  "section": "math",
  "module": "math-module-2",
  "domain": "Geometry and Trigonometry",
  "skill": "Similarity and scaling",
  "subskill": "Similarity and scaling",
  "conceptId": "Geometry and Trigonometry-similarity-and-scaling",
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
    "shape": "similar-figures",
    "values": {
      "scale": 5079,
      "area": 50790
    },
    "visualVariant": "sat-mock-15-math-math-module-2-high-41"
  },
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-high-41",
  "conceptFingerprint": "Geometry and Trigonometry-Similarity and scaling-40",
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
    "contextKey": "sat-series-b-sat-mock-15-math-40",
    "contextFamily": "sat-series-b-Geometry and Trigonometry-Similarity and scaling",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Geometry and Trigonometry-Similarity and scaling-40",
    "constructionFamily": "sat-series-b|sat-mock-15|Geometry and Trigonometry|Similarity and scaling|family-7",
    "answerFormat": "numeric",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "multi-step",
      "constraint-inference",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:<n>|scale:<n>}}|data:geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:50790|scale:5079}}",
    "figureStructureFingerprint": "geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:<n>|scale:<n>}}",
    "figureDataFingerprint": "geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:50790|scale:5079}}"
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-high-42

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Geometry and Trigonometry
SKILL: Geometry and measurement
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A field researcher compares two measured states and reconstructs the unknown quantity from the reported relationship. The unknown is isolated from the stated condition. The selected comparison condition establishes the target relationship. A triangle has base 20308 and height 20308. What is its area?

CHOICES:
[
  "206207432",
  "206207431",
  "412414864",
  "206207433"
]

ANSWER: A

EXPLANATION:
Use one-half times base times height.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-high-42",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-high-42",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
  "section": "math",
  "module": "math-module-2",
  "domain": "Geometry and Trigonometry",
  "skill": "Geometry and measurement",
  "subskill": "Geometry and measurement",
  "conceptId": "Geometry and Trigonometry-geometry-and-measurement",
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
    "shape": "triangle",
    "values": {
      "base": 20308,
      "height": 20308
    },
    "visualVariant": "sat-mock-15-math-math-module-2-high-42"
  },
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-high-42",
  "conceptFingerprint": "Geometry and Trigonometry-Geometry and measurement-41",
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
    "contextKey": "sat-series-b-sat-mock-15-math-41",
    "contextFamily": "sat-series-b-Geometry and Trigonometry-Geometry and measurement",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Geometry and Trigonometry-Geometry and measurement-41",
    "constructionFamily": "sat-series-b|sat-mock-15|Geometry and Trigonometry|Geometry and measurement|family-7",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "multi-step",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:<n>|height:<n>}}|data:geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:20308|height:20308}}",
    "figureStructureFingerprint": "geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:<n>|height:<n>}}",
    "figureDataFingerprint": "geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:20308|height:20308}}"
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-high-43

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Geometry and Trigonometry
SKILL: Circles
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A quality analyst checks how a reported change follows from the quantities given in the scenario. The mathematical relationship is evaluated using the given measurements. The selected comparison condition establishes the target relationship. A circle has radius 20315. What is its area in terms of π?

CHOICES:
[
  "412699225π + 1",
  "412699225π",
  "412699225π − 1",
  "none of these"
]

ANSWER: B

EXPLANATION:
Area equals πr².

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-high-43",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-high-43",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
    "radius": 20315,
    "center_label": "O",
    "visualVariant": "sat-mock-15-math-math-module-2-high-43"
  },
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-high-43",
  "conceptFingerprint": "Geometry and Trigonometry-Circles-42",
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
    "contextKey": "sat-series-b-sat-mock-15-math-42",
    "contextFamily": "sat-series-b-Geometry and Trigonometry-Circles",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Geometry and Trigonometry-Circles-42",
    "constructionFamily": "sat-series-b|sat-mock-15|Geometry and Trigonometry|Circles|family-7",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "direct-application",
      "single-step",
      "strategic-choice",
      "multi-step"
    ],
    "figureOriginalityFingerprint": "geometry and trigonometry|circle|{center_label:o|radius:<n>|type:circle}|data:geometry and trigonometry|circle|{center_label:o|radius:20315|type:circle}",
    "figureStructureFingerprint": "geometry and trigonometry|circle|{center_label:o|radius:<n>|type:circle}",
    "figureDataFingerprint": "geometry and trigonometry|circle|{center_label:o|radius:20315|type:circle}"
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-high-44

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Geometry and Trigonometry
SKILL: Right triangles
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A monitoring team relates the measured values through the stated mathematical condition. The reported measurements are translated into the required mathematical form. The selected comparison condition establishes the target relationship. A right triangle has legs 20310 and 20314. What is its area?

CHOICES:
[
  "206288671",
  "206288669",
  "206288670",
  "412577340"
]

ANSWER: C

EXPLANATION:
Area equals one-half the product of the perpendicular legs.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-high-44",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-high-44",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
    "leg_a": 20310,
    "leg_b": 20314,
    "labels": {
      "a": "a",
      "b": "b",
      "c": "c"
    },
    "unknown_side": "c",
    "visualVariant": "sat-mock-15-math-math-module-2-high-44"
  },
  "isOperational": true,
  "adaptiveRoute": "high",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-high-44",
  "conceptFingerprint": "Geometry and Trigonometry-Right triangles-43",
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
    "contextKey": "sat-series-b-sat-mock-15-math-43",
    "contextFamily": "sat-series-b-Geometry and Trigonometry-Right triangles",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Geometry and Trigonometry-Right triangles-43",
    "constructionFamily": "sat-series-b|sat-mock-15|Geometry and Trigonometry|Right triangles|family-7",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "representation-shift",
      "multi-step",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "geometry and trigonometry|right_triangle|{labels:{a:a|b:b|c:c}|leg_a:<n>|leg_b:<n>|type:right_triangle|unknown_side:c}|data:geometry and trigonometry|right_triangle|{labels:{a:a|b:b|c:c}|leg_a:20310|leg_b:20314|type:right_triangle|unknown_side:c}",
    "figureStructureFingerprint": "geometry and trigonometry|right_triangle|{labels:{a:a|b:b|c:c}|leg_a:<n>|leg_b:<n>|type:right_triangle|unknown_side:c}",
    "figureDataFingerprint": "geometry and trigonometry|right_triangle|{labels:{a:a|b:b|c:c}|leg_a:20310|leg_b:20314|type:right_triangle|unknown_side:c}"
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-standard-45

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear functions and representations
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A project analyst translates the reported quantities into an equation before evaluating the target. The quantities are connected through the model given in the scenario. The reported comparison condition establishes the target relationship. A line passes through (13, 105) and (15, 119). What is its slope?

CHOICES:
[
  "8",
  "6",
  "14",
  "7"
]

ANSWER: D

EXPLANATION:
Slope = (119 − 105)/(15 − 13) = 7.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-standard-45",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-standard-45",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-standard-45",
  "conceptFingerprint": "Algebra-Linear functions and representations-44",
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
    "contextKey": "sat-series-b-sat-mock-15-math-44",
    "contextFamily": "sat-series-b-Algebra-Linear functions and representations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Algebra-Linear functions and representations-44",
    "constructionFamily": "sat-series-b|sat-mock-15|Algebra|Linear functions and representations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift",
      "two-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-standard-46

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear functions
DIFFICULTY: easy
QUESTION TYPE: student-produced-response

PROMPT:
A data specialist translates the stated relationship into a mathematical model before determining the requested value. The baseline is established before the requested quantity is determined. The reported comparison condition establishes the target relationship. A linear model is y = 5x + 14. What is y when x = 14?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 84

EXPLANATION:
Substitute x = 14: y = 5(14) + 14 = 84.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-standard-46",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-standard-46",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
  "section": "math",
  "module": "math-module-2",
  "domain": "Algebra",
  "skill": "Linear functions",
  "subskill": "Linear functions",
  "conceptId": "Algebra-linear-functions",
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-standard-46",
  "conceptFingerprint": "Algebra-Linear functions-45",
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
    "contextKey": "sat-series-b-sat-mock-15-math-45",
    "contextFamily": "sat-series-b-Algebra-Linear functions",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Algebra-Linear functions-45",
    "constructionFamily": "sat-series-b|sat-mock-15|Algebra|Linear functions|family-7",
    "answerFormat": "numeric",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-standard-47

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear equations
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A research coordinator compares linked measurements and uses the reported constraint to determine the result. The calculation focuses on the condition that links the known and unknown values. The reported comparison condition establishes the target relationship. A linear model is y = 3x + 14. For what value of x is y = 59?

CHOICES:
[
  "15",
  "16",
  "14",
  "30"
]

ANSWER: A

EXPLANATION:
Subtract 14 and divide by 3 to obtain x = 15.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-standard-47",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-standard-47",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
  "section": "math",
  "module": "math-module-2",
  "domain": "Algebra",
  "skill": "Linear equations",
  "subskill": "Linear equations",
  "conceptId": "Algebra-linear-equations",
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-standard-47",
  "conceptFingerprint": "Algebra-Linear equations-46",
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
    "contextKey": "sat-series-b-sat-mock-15-math-46",
    "contextFamily": "sat-series-b-Algebra-Linear equations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Algebra-Linear equations-46",
    "constructionFamily": "sat-series-b|sat-mock-15|Algebra|Linear equations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "two-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-standard-48

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear representations
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A field researcher compares two measured states and reconstructs the unknown quantity from the reported relationship. The requested value follows from the relationship among the measured quantities. The reported comparison condition establishes the target relationship. A line passes through (16, 141) and has slope 8. What is its y-intercept?

CHOICES:
[
  "14",
  "13",
  "12",
  "26"
]

ANSWER: B

EXPLANATION:
Using y = mx + b gives b = 13.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-standard-48",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-standard-48",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-standard-48",
  "conceptFingerprint": "Algebra-Linear representations-47",
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
    "contextKey": "sat-series-b-sat-mock-15-math-47",
    "contextFamily": "sat-series-b-Algebra-Linear representations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Algebra-Linear representations-47",
    "constructionFamily": "sat-series-b|sat-mock-15|Algebra|Linear representations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-standard-49

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear functions and representations
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A quality analyst checks how a reported change follows from the quantities given in the scenario. The calculation uses the reported relationship directly. The reported comparison condition establishes the target relationship. A line passes through (2, 25) and (4, 37). What is its slope?

CHOICES:
[
  "7",
  "5",
  "6",
  "12"
]

ANSWER: C

EXPLANATION:
Slope = (37 − 25)/(4 − 2) = 6.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-standard-49",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-standard-49",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-standard-49",
  "conceptFingerprint": "Algebra-Linear functions and representations-48",
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
    "contextKey": "sat-series-b-sat-mock-15-math-48",
    "contextFamily": "sat-series-b-Algebra-Linear functions and representations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Algebra-Linear functions and representations-48",
    "constructionFamily": "sat-series-b|sat-mock-15|Algebra|Linear functions and representations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift",
      "two-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-standard-50

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear functions
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A monitoring team relates the measured values through the stated mathematical condition. The stated quantities provide enough information to identify the target. The reported comparison condition establishes the target relationship. A linear model is y = 4x + 13. What is y when x = 3?

CHOICES:
[
  "26",
  "24",
  "50",
  "25"
]

ANSWER: D

EXPLANATION:
Substitute x = 3: y = 4(3) + 13 = 25.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-standard-50",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-standard-50",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
  "section": "math",
  "module": "math-module-2",
  "domain": "Algebra",
  "skill": "Linear functions",
  "subskill": "Linear functions",
  "conceptId": "Algebra-linear-functions",
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-standard-50",
  "conceptFingerprint": "Algebra-Linear functions-49",
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
    "contextKey": "sat-series-b-sat-mock-15-math-49",
    "contextFamily": "sat-series-b-Algebra-Linear functions",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Algebra-Linear functions-49",
    "constructionFamily": "sat-series-b|sat-mock-15|Algebra|Linear functions|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-standard-51

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear equations
DIFFICULTY: medium
QUESTION TYPE: student-produced-response

PROMPT:
A resource planner compares a starting condition with a later condition to determine the requested quantity. The model provides the constraint needed to determine the target. The reported comparison condition establishes the target relationship. A linear model is y = 2x + 13. For what value of x is y = 21?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 4

EXPLANATION:
Subtract 13 and divide by 2 to obtain x = 4.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-standard-51",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-standard-51",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
  "section": "math",
  "module": "math-module-2",
  "domain": "Algebra",
  "skill": "Linear equations",
  "subskill": "Linear equations",
  "conceptId": "Algebra-linear-equations",
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-standard-51",
  "conceptFingerprint": "Algebra-Linear equations-50",
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
    "contextKey": "sat-series-b-sat-mock-15-math-50",
    "contextFamily": "sat-series-b-Algebra-Linear equations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Algebra-Linear equations-50",
    "constructionFamily": "sat-series-b|sat-mock-15|Algebra|Linear equations|family-7",
    "answerFormat": "numeric",
    "figurePurpose": null,
    "difficultyFeatures": [
      "two-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-standard-52

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic functions and representations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A data specialist translates the stated relationship into a mathematical model before determining the requested value. The unknown is isolated from the stated condition. The reported comparison condition establishes the target relationship. For f(x) = (x − 20312)² + 20309, what is the minimum value of f?

CHOICES:
[
  "20309",
  "20310",
  "20308",
  "40618"
]

ANSWER: A

EXPLANATION:
The square is minimized at 0, so the minimum is 20309.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-standard-52",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-standard-52",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
    "equation": "y = 1x² − 40624x + 412597653",
    "x_range": [
      20302,
      20322
    ],
    "visualVariant": "sat-mock-15-math-math-module-2-standard-52"
  },
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-standard-52",
  "conceptFingerprint": "Advanced Math-Quadratic functions and representations-51",
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
    "contextKey": "sat-series-b-sat-mock-15-math-51",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic functions and representations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Advanced Math-Quadratic functions and representations-51",
    "constructionFamily": "sat-series-b|sat-mock-15|Advanced Math|Quadratic functions and representations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "representation-shift",
      "multi-step",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "advanced math|parabola|{equation:y = <n>x² − <n>x + <n>|type:parabola|x_range:[<n>,<n>]}|data:advanced math|parabola|{equation:y = 1x² − 40624x + 412597653|type:parabola|x_range:[20302,20322]}",
    "figureStructureFingerprint": "advanced math|parabola|{equation:y = <n>x² − <n>x + <n>|type:parabola|x_range:[<n>,<n>]}",
    "figureDataFingerprint": "advanced math|parabola|{equation:y = 1x² − 40624x + 412597653|type:parabola|x_range:[20302,20322]}"
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-standard-53

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic parameter reasoning
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A research coordinator compares linked measurements and uses the reported constraint to determine the result. The mathematical relationship is evaluated using the given measurements. The reported comparison condition establishes the target relationship. For 3x² − 72x + k = 0, the equation has exactly one real solution. What is k?

CHOICES:
[
  "433",
  "432",
  "431",
  "864"
]

ANSWER: B

EXPLANATION:
A repeated root requires the discriminant to equal zero.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-standard-53",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-standard-53",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-standard-53",
  "conceptFingerprint": "Advanced Math-Quadratic parameter reasoning-52",
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
    "contextKey": "sat-series-b-sat-mock-15-math-52",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic parameter reasoning",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Advanced Math-Quadratic parameter reasoning-52",
    "constructionFamily": "sat-series-b|sat-mock-15|Advanced Math|Quadratic parameter reasoning|family-7",
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

### Question: sat-series-b-mock-15-math-math-module-2-standard-54

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic equations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A field researcher compares two measured states and reconstructs the unknown quantity from the reported relationship. The reported measurements are translated into the required mathematical form. The reported comparison condition establishes the target relationship. A quadratic has roots 13 and 20. What is the sum of the roots?

CHOICES:
[
  "34",
  "32",
  "33",
  "66"
]

ANSWER: C

EXPLANATION:
Add the two roots: 13 + 20 = 33.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-standard-54",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-standard-54",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-standard-54",
  "conceptFingerprint": "Advanced Math-Quadratic equations-53",
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
    "contextKey": "sat-series-b-sat-mock-15-math-53",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic equations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Advanced Math-Quadratic equations-53",
    "constructionFamily": "sat-series-b|sat-mock-15|Advanced Math|Quadratic equations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-standard-55

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Exponential equations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A quality analyst checks how a reported change follows from the quantities given in the scenario. The quantities are connected through the model given in the scenario. The reported comparison condition establishes the target relationship. If 3^x = 9, what is x?

CHOICES:
[
  "4",
  "3",
  "1",
  "2"
]

ANSWER: D

EXPLANATION:
Equal powers with the same base have equal exponents, so x = 2.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-standard-55",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-standard-55",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-standard-55",
  "conceptFingerprint": "Advanced Math-Exponential equations-54",
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
    "contextKey": "sat-series-b-sat-mock-15-math-54",
    "contextFamily": "sat-series-b-Advanced Math-Exponential equations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Advanced Math-Exponential equations-54",
    "constructionFamily": "sat-series-b|sat-mock-15|Advanced Math|Exponential equations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-standard-56

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic functions and representations
DIFFICULTY: medium
QUESTION TYPE: student-produced-response

PROMPT:
A monitoring team relates the measured values through the stated mathematical condition. The baseline is established before the requested quantity is determined. The reported comparison condition establishes the target relationship. For f(x) = (x − 20303)² + 20306, what is the minimum value of f?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 20306

EXPLANATION:
The square is minimized at 0, so the minimum is 20306.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-standard-56",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-standard-56",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
  "section": "math",
  "module": "math-module-2",
  "domain": "Advanced Math",
  "skill": "Quadratic functions and representations",
  "subskill": "Quadratic functions and representations",
  "conceptId": "Advanced Math-quadratic-functions-and-representations",
  "difficulty": "medium",
  "difficultyBand": "math-standard-medium",
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
    "equation": "y = 1x² − 40606x + 412232115",
    "x_range": [
      20293,
      20313
    ],
    "visualVariant": "sat-mock-15-math-math-module-2-standard-56"
  },
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-standard-56",
  "conceptFingerprint": "Advanced Math-Quadratic functions and representations-55",
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
    "contextKey": "sat-series-b-sat-mock-15-math-55",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic functions and representations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Advanced Math-Quadratic functions and representations-55",
    "constructionFamily": "sat-series-b|sat-mock-15|Advanced Math|Quadratic functions and representations|family-7",
    "answerFormat": "numeric",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "representation-shift",
      "multi-step",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "advanced math|parabola|{equation:y = <n>x² − <n>x + <n>|type:parabola|x_range:[<n>,<n>]}|data:advanced math|parabola|{equation:y = 1x² − 40606x + 412232115|type:parabola|x_range:[20293,20313]}",
    "figureStructureFingerprint": "advanced math|parabola|{equation:y = <n>x² − <n>x + <n>|type:parabola|x_range:[<n>,<n>]}",
    "figureDataFingerprint": "advanced math|parabola|{equation:y = 1x² − 40606x + 412232115|type:parabola|x_range:[20293,20313]}"
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-standard-57

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic parameter reasoning
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A resource planner compares a starting condition with a later condition to determine the requested quantity. The calculation focuses on the condition that links the known and unknown values. The reported comparison condition establishes the target relationship. For 5x² − 110x + k = 0, the equation has exactly one real solution. What is k?

CHOICES:
[
  "605",
  "604",
  "606",
  "1210"
]

ANSWER: A

EXPLANATION:
A repeated root requires the discriminant to equal zero.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-standard-57",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-standard-57",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-standard-57",
  "conceptFingerprint": "Advanced Math-Quadratic parameter reasoning-56",
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
    "contextKey": "sat-series-b-sat-mock-15-math-56",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic parameter reasoning",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Advanced Math-Quadratic parameter reasoning-56",
    "constructionFamily": "sat-series-b|sat-mock-15|Advanced Math|Quadratic parameter reasoning|family-7",
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

### Question: sat-series-b-mock-15-math-math-module-2-standard-58

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic equations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
An operations analyst uses the stated model to connect the observed quantities and identify the requested value. The requested value follows from the relationship among the measured quantities. The reported comparison condition establishes the target relationship. A quadratic has roots 4 and 12. What is the sum of the roots?

CHOICES:
[
  "17",
  "16",
  "32",
  "15"
]

ANSWER: B

EXPLANATION:
Add the two roots: 4 + 12 = 16.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-standard-58",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-standard-58",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-standard-58",
  "conceptFingerprint": "Advanced Math-Quadratic equations-57",
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
    "contextKey": "sat-series-b-sat-mock-15-math-57",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic equations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Advanced Math-Quadratic equations-57",
    "constructionFamily": "sat-series-b|sat-mock-15|Advanced Math|Quadratic equations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-standard-59

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Problem-Solving and Data Analysis
SKILL: Data models
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
An engineering team represents the relationship symbolically and checks the unknown against an observed condition. The calculation uses the reported relationship directly. The reported comparison condition establishes the target relationship. A data set is modeled by y = 7x + 14. What y-value is predicted when x = 4?

CHOICES:
[
  "41",
  "43",
  "42",
  "84"
]

ANSWER: C

EXPLANATION:
Substitute x = 4 into the model.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-standard-59",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-standard-59",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
        20314
      ],
      [
        2,
        20321
      ],
      [
        3,
        20311
      ],
      [
        4,
        20318
      ],
      [
        5,
        20308
      ],
      [
        6,
        20315
      ]
    ],
    "visualVariant": "sat-mock-15-math-math-module-2-standard-59"
  },
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-standard-59",
  "conceptFingerprint": "Problem-Solving and Data Analysis-Data models-58",
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
    "contextKey": "sat-series-b-sat-mock-15-math-58",
    "contextFamily": "sat-series-b-Problem-Solving and Data Analysis-Data models",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Problem-Solving and Data Analysis-Data models-58",
    "constructionFamily": "sat-series-b|sat-mock-15|Problem-Solving and Data Analysis|Data models|family-7",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "data-interpretation",
      "representation-shift",
      "strategic-choice",
      "multi-step"
    ],
    "figureOriginalityFingerprint": "problem-solving and data analysis|scatter_plot|{points:[[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>]]|type:scatter_plot}|data:problem-solving and data analysis|scatter_plot|{points:[[1,20314],[2,20321],[3,20311],[4,20318],[5,20308],[6,20315]]|type:scatter_plot}",
    "figureStructureFingerprint": "problem-solving and data analysis|scatter_plot|{points:[[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>]]|type:scatter_plot}",
    "figureDataFingerprint": "problem-solving and data analysis|scatter_plot|{points:[[1,20314],[2,20321],[3,20311],[4,20318],[5,20308],[6,20315]]|type:scatter_plot}"
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-standard-60

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Problem-Solving and Data Analysis
SKILL: Measures of spread
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A systems analyst converts the stated conditions into a mathematical relationship and evaluates the unknown. The stated quantities provide enough information to identify the target. The reported comparison condition establishes the target relationship. A data set has first quartile 9 and third quartile 22. What is the interquartile range?

CHOICES:
[
  "14",
  "26",
  "12",
  "13"
]

ANSWER: D

EXPLANATION:
IQR equals Q3 minus Q1.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-standard-60",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-standard-60",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-standard-60",
  "conceptFingerprint": "Problem-Solving and Data Analysis-Measures of spread-59",
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
    "contextKey": "sat-series-b-sat-mock-15-math-59",
    "contextFamily": "sat-series-b-Problem-Solving and Data Analysis-Measures of spread",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Problem-Solving and Data Analysis-Measures of spread-59",
    "constructionFamily": "sat-series-b|sat-mock-15|Problem-Solving and Data Analysis|Measures of spread|family-7",
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

### Question: sat-series-b-mock-15-math-math-module-2-standard-61

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Problem-Solving and Data Analysis
SKILL: Weighted means
DIFFICULTY: hard
QUESTION TYPE: student-produced-response

PROMPT:
A planning analyst models a changing quantity from a stated baseline and rate. The model provides the constraint needed to determine the target. The reported comparison condition establishes the target relationship. Group A has 17 observations with mean 28; Group B has 36 observations with mean 33. What is the combined mean?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 31.4

EXPLANATION:
Use the weighted total divided by the combined number of observations.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-standard-61",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-standard-61",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
  "section": "math",
  "module": "math-module-2",
  "domain": "Problem-Solving and Data Analysis",
  "skill": "Weighted means",
  "subskill": "Weighted means",
  "conceptId": "Problem-Solving and Data Analysis-weighted-means",
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-standard-61",
  "conceptFingerprint": "Problem-Solving and Data Analysis-Weighted means-60",
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
    "contextKey": "sat-series-b-sat-mock-15-math-60",
    "contextFamily": "sat-series-b-Problem-Solving and Data Analysis-Weighted means",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Problem-Solving and Data Analysis-Weighted means-60",
    "constructionFamily": "sat-series-b|sat-mock-15|Problem-Solving and Data Analysis|Weighted means|family-7",
    "answerFormat": "numeric",
    "figurePurpose": null,
    "difficultyFeatures": [
      "data-interpretation",
      "multi-step",
      "strategic-choice"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-standard-62

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Problem-Solving and Data Analysis
SKILL: Percentages
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A measurement team uses a stated relationship between variables to reconstruct the missing value. The unknown is isolated from the stated condition. The reported comparison condition establishes the target relationship. A survey includes 343 responses. 23% select option A. How many responses select A?

CHOICES:
[
  "78.89",
  "77.89",
  "157.78",
  "79.89"
]

ANSWER: A

EXPLANATION:
Multiply 343 by 23/100.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-standard-62",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-standard-62",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
  "section": "math",
  "module": "math-module-2",
  "domain": "Problem-Solving and Data Analysis",
  "skill": "Percentages",
  "subskill": "Percentages",
  "conceptId": "Problem-Solving and Data Analysis-percentages",
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-standard-62",
  "conceptFingerprint": "Problem-Solving and Data Analysis-Percentages-61",
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
    "contextKey": "sat-series-b-sat-mock-15-math-61",
    "contextFamily": "sat-series-b-Problem-Solving and Data Analysis-Percentages",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Problem-Solving and Data Analysis-Percentages-61",
    "constructionFamily": "sat-series-b|sat-mock-15|Problem-Solving and Data Analysis|Percentages|family-7",
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

### Question: sat-series-b-mock-15-math-math-module-2-standard-63

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Geometry and Trigonometry
SKILL: Circles
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A project analyst translates the reported quantities into an equation before evaluating the target. The mathematical relationship is evaluated using the given measurements. The reported comparison condition establishes the target relationship. A circle has radius 20310. What is its area in terms of π?

CHOICES:
[
  "412496100π + 1",
  "412496100π",
  "412496100π − 1",
  "none of these"
]

ANSWER: B

EXPLANATION:
Area equals πr².

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-standard-63",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-standard-63",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
    "radius": 20310,
    "center_label": "O",
    "visualVariant": "sat-mock-15-math-math-module-2-standard-63"
  },
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-standard-63",
  "conceptFingerprint": "Geometry and Trigonometry-Circles-62",
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
    "contextKey": "sat-series-b-sat-mock-15-math-62",
    "contextFamily": "sat-series-b-Geometry and Trigonometry-Circles",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Geometry and Trigonometry-Circles-62",
    "constructionFamily": "sat-series-b|sat-mock-15|Geometry and Trigonometry|Circles|family-7",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "direct-application",
      "single-step",
      "strategic-choice",
      "multi-step"
    ],
    "figureOriginalityFingerprint": "geometry and trigonometry|circle|{center_label:o|radius:<n>|type:circle}|data:geometry and trigonometry|circle|{center_label:o|radius:20310|type:circle}",
    "figureStructureFingerprint": "geometry and trigonometry|circle|{center_label:o|radius:<n>|type:circle}",
    "figureDataFingerprint": "geometry and trigonometry|circle|{center_label:o|radius:20310|type:circle}"
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-standard-64

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Geometry and Trigonometry
SKILL: Right triangles
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A data specialist translates the stated relationship into a mathematical model before determining the requested value. The reported measurements are translated into the required mathematical form. The reported comparison condition establishes the target relationship. A right triangle has legs 20313 and 20319. What is its area?

CHOICES:
[
  "206369924.5",
  "206369922.5",
  "206369923.5",
  "412739847"
]

ANSWER: C

EXPLANATION:
Area equals one-half the product of the perpendicular legs.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-standard-64",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-standard-64",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
    "leg_a": 20313,
    "leg_b": 20319,
    "labels": {
      "a": "a",
      "b": "b",
      "c": "c"
    },
    "unknown_side": "c",
    "visualVariant": "sat-mock-15-math-math-module-2-standard-64"
  },
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-standard-64",
  "conceptFingerprint": "Geometry and Trigonometry-Right triangles-63",
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
    "contextKey": "sat-series-b-sat-mock-15-math-63",
    "contextFamily": "sat-series-b-Geometry and Trigonometry-Right triangles",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Geometry and Trigonometry-Right triangles-63",
    "constructionFamily": "sat-series-b|sat-mock-15|Geometry and Trigonometry|Right triangles|family-7",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "representation-shift",
      "multi-step",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "geometry and trigonometry|right_triangle|{labels:{a:a|b:b|c:c}|leg_a:<n>|leg_b:<n>|type:right_triangle|unknown_side:c}|data:geometry and trigonometry|right_triangle|{labels:{a:a|b:b|c:c}|leg_a:20313|leg_b:20319|type:right_triangle|unknown_side:c}",
    "figureStructureFingerprint": "geometry and trigonometry|right_triangle|{labels:{a:a|b:b|c:c}|leg_a:<n>|leg_b:<n>|type:right_triangle|unknown_side:c}",
    "figureDataFingerprint": "geometry and trigonometry|right_triangle|{labels:{a:a|b:b|c:c}|leg_a:20313|leg_b:20319|type:right_triangle|unknown_side:c}"
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-standard-65

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Geometry and Trigonometry
SKILL: Similarity and scaling
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A research coordinator compares linked measurements and uses the reported constraint to determine the result. The quantities are connected through the model given in the scenario. The reported comparison condition establishes the target relationship. Two similar figures have corresponding lengths in the ratio 5078:1. The smaller figure has area 50800. What is the larger area?

CHOICES:
[
  "1309933067201",
  "1309933067199",
  "2619866134400",
  "1309933067200"
]

ANSWER: D

EXPLANATION:
Areas scale by the square of the length ratio.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-standard-65",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-standard-65",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
      "scale": 5078,
      "area": 50800
    },
    "visualVariant": "sat-mock-15-math-math-module-2-standard-65"
  },
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-standard-65",
  "conceptFingerprint": "Geometry and Trigonometry-Similarity and scaling-64",
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
    "contextKey": "sat-series-b-sat-mock-15-math-64",
    "contextFamily": "sat-series-b-Geometry and Trigonometry-Similarity and scaling",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Geometry and Trigonometry-Similarity and scaling-64",
    "constructionFamily": "sat-series-b|sat-mock-15|Geometry and Trigonometry|Similarity and scaling|family-7",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "multi-step",
      "constraint-inference",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:<n>|scale:<n>}}|data:geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:50800|scale:5078}}",
    "figureStructureFingerprint": "geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:<n>|scale:<n>}}",
    "figureDataFingerprint": "geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:50800|scale:5078}}"
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-standard-66

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Geometry and Trigonometry
SKILL: Geometry and measurement
DIFFICULTY: hard
QUESTION TYPE: student-produced-response

PROMPT:
A field researcher compares two measured states and reconstructs the unknown quantity from the reported relationship. The baseline is established before the requested quantity is determined. The reported comparison condition establishes the target relationship. A triangle has base 20312 and height 20311. What is its area?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 206278516

EXPLANATION:
Use one-half times base times height.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-standard-66",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-standard-66",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
  "section": "math",
  "module": "math-module-2",
  "domain": "Geometry and Trigonometry",
  "skill": "Geometry and measurement",
  "subskill": "Geometry and measurement",
  "conceptId": "Geometry and Trigonometry-geometry-and-measurement",
  "difficulty": "hard",
  "difficultyBand": "math-standard-hard",
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
      "base": 20312,
      "height": 20311
    },
    "visualVariant": "sat-mock-15-math-math-module-2-standard-66"
  },
  "isOperational": true,
  "adaptiveRoute": "standard",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-standard-66",
  "conceptFingerprint": "Geometry and Trigonometry-Geometry and measurement-65",
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
    "contextKey": "sat-series-b-sat-mock-15-math-65",
    "contextFamily": "sat-series-b-Geometry and Trigonometry-Geometry and measurement",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Geometry and Trigonometry-Geometry and measurement-65",
    "constructionFamily": "sat-series-b|sat-mock-15|Geometry and Trigonometry|Geometry and measurement|family-7",
    "answerFormat": "numeric",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "multi-step",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:<n>|height:<n>}}|data:geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:20312|height:20311}}",
    "figureStructureFingerprint": "geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:<n>|height:<n>}}",
    "figureDataFingerprint": "geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:20312|height:20311}}"
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-low-67

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear equations
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A planning analyst models a changing quantity from a stated baseline and rate. The calculation focuses on the condition that links the known and unknown values. The observed comparison condition establishes the target relationship. A linear model is y = 8x + 17. For what value of x is y = 121?

CHOICES:
[
  "13",
  "14",
  "12",
  "26"
]

ANSWER: A

EXPLANATION:
Subtract 17 and divide by 8 to obtain x = 13.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-low-67",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-low-67",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-low-67",
  "conceptFingerprint": "Algebra-Linear equations-66",
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
    "contextKey": "sat-series-b-sat-mock-15-math-66",
    "contextFamily": "sat-series-b-Algebra-Linear equations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Algebra-Linear equations-66",
    "constructionFamily": "sat-series-b|sat-mock-15|Algebra|Linear equations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "two-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-low-68

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear representations
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A measurement team uses a stated relationship between variables to reconstruct the missing value. The requested value follows from the relationship among the measured quantities. The observed comparison condition establishes the target relationship. A line passes through (14, 101) and has slope 6. What is its y-intercept?

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
  "contentId": "sat-series-b-mock-15-math-math-module-2-low-68",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-low-68",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-low-68",
  "conceptFingerprint": "Algebra-Linear representations-67",
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
    "contextKey": "sat-series-b-sat-mock-15-math-67",
    "contextFamily": "sat-series-b-Algebra-Linear representations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Algebra-Linear representations-67",
    "constructionFamily": "sat-series-b|sat-mock-15|Algebra|Linear representations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-low-69

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear functions and representations
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A project analyst translates the reported quantities into an equation before evaluating the target. The calculation uses the reported relationship directly. The observed comparison condition establishes the target relationship. A line passes through (15, 77) and (17, 85). What is its slope?

CHOICES:
[
  "5",
  "3",
  "4",
  "8"
]

ANSWER: C

EXPLANATION:
Slope = (85 − 77)/(17 − 15) = 4.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-low-69",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-low-69",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-low-69",
  "conceptFingerprint": "Algebra-Linear functions and representations-68",
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
    "contextKey": "sat-series-b-sat-mock-15-math-68",
    "contextFamily": "sat-series-b-Algebra-Linear functions and representations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Algebra-Linear functions and representations-68",
    "constructionFamily": "sat-series-b|sat-mock-15|Algebra|Linear functions and representations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift",
      "two-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-low-70

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear functions
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A data specialist translates the stated relationship into a mathematical model before determining the requested value. The stated quantities provide enough information to identify the target. The observed comparison condition establishes the target relationship. A linear model is y = 2x + 17. What is y when x = 16?

CHOICES:
[
  "50",
  "48",
  "98",
  "49"
]

ANSWER: D

EXPLANATION:
Substitute x = 16: y = 2(16) + 17 = 49.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-low-70",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-low-70",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-low-70",
  "conceptFingerprint": "Algebra-Linear functions-69",
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
    "contextKey": "sat-series-b-sat-mock-15-math-69",
    "contextFamily": "sat-series-b-Algebra-Linear functions",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Algebra-Linear functions-69",
    "constructionFamily": "sat-series-b|sat-mock-15|Algebra|Linear functions|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-low-71

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear equations
DIFFICULTY: easy
QUESTION TYPE: student-produced-response

PROMPT:
A research coordinator compares linked measurements and uses the reported constraint to determine the result. The model provides the constraint needed to determine the target. The observed comparison condition establishes the target relationship. A linear model is y = 7x + 16. For what value of x is y = 30?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 2

EXPLANATION:
Subtract 16 and divide by 7 to obtain x = 2.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-low-71",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-low-71",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
  "section": "math",
  "module": "math-module-2",
  "domain": "Algebra",
  "skill": "Linear equations",
  "subskill": "Linear equations",
  "conceptId": "Algebra-linear-equations",
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-low-71",
  "conceptFingerprint": "Algebra-Linear equations-70",
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
    "contextKey": "sat-series-b-sat-mock-15-math-70",
    "contextFamily": "sat-series-b-Algebra-Linear equations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Algebra-Linear equations-70",
    "constructionFamily": "sat-series-b|sat-mock-15|Algebra|Linear equations|family-7",
    "answerFormat": "numeric",
    "figurePurpose": null,
    "difficultyFeatures": [
      "two-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-low-72

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear representations
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A field researcher compares two measured states and reconstructs the unknown quantity from the reported relationship. The unknown is isolated from the stated condition. The observed comparison condition establishes the target relationship. A line passes through (3, 31) and has slope 5. What is its y-intercept?

CHOICES:
[
  "16",
  "17",
  "15",
  "32"
]

ANSWER: A

EXPLANATION:
Using y = mx + b gives b = 16.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-low-72",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-low-72",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-low-72",
  "conceptFingerprint": "Algebra-Linear representations-71",
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
    "contextKey": "sat-series-b-sat-mock-15-math-71",
    "contextFamily": "sat-series-b-Algebra-Linear representations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Algebra-Linear representations-71",
    "constructionFamily": "sat-series-b|sat-mock-15|Algebra|Linear representations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-low-73

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Algebra
SKILL: Linear functions and representations
DIFFICULTY: easy
QUESTION TYPE: multiple-choice

PROMPT:
A quality analyst checks how a reported change follows from the quantities given in the scenario. The mathematical relationship is evaluated using the given measurements. The observed comparison condition establishes the target relationship. A line passes through (4, 28) and (6, 34). What is its slope?

CHOICES:
[
  "4",
  "3",
  "2",
  "6"
]

ANSWER: B

EXPLANATION:
Slope = (34 − 28)/(6 − 4) = 3.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-low-73",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-low-73",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-low-73",
  "conceptFingerprint": "Algebra-Linear functions and representations-72",
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
    "contextKey": "sat-series-b-sat-mock-15-math-72",
    "contextFamily": "sat-series-b-Algebra-Linear functions and representations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Algebra-Linear functions and representations-72",
    "constructionFamily": "sat-series-b|sat-mock-15|Algebra|Linear functions and representations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift",
      "two-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-low-74

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic equations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A measurement team uses a stated relationship between variables to reconstruct the missing value. The reported measurements are translated into the required mathematical form. The observed comparison condition establishes the target relationship. A quadratic has roots 3 and 12. What is the sum of the roots?

CHOICES:
[
  "16",
  "14",
  "15",
  "30"
]

ANSWER: C

EXPLANATION:
Add the two roots: 3 + 12 = 15.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-low-74",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-low-74",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-low-74",
  "conceptFingerprint": "Advanced Math-Quadratic equations-73",
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
    "contextKey": "sat-series-b-sat-mock-15-math-73",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic equations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Advanced Math-Quadratic equations-73",
    "constructionFamily": "sat-series-b|sat-mock-15|Advanced Math|Quadratic equations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-low-75

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Exponential equations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A project analyst translates the reported quantities into an equation before evaluating the target. The quantities are connected through the model given in the scenario. The observed comparison condition establishes the target relationship. If 3^x = 729, what is x?

CHOICES:
[
  "12",
  "7",
  "5",
  "6"
]

ANSWER: D

EXPLANATION:
Equal powers with the same base have equal exponents, so x = 6.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-low-75",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-low-75",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-low-75",
  "conceptFingerprint": "Advanced Math-Exponential equations-74",
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
    "contextKey": "sat-series-b-sat-mock-15-math-74",
    "contextFamily": "sat-series-b-Advanced Math-Exponential equations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Advanced Math-Exponential equations-74",
    "constructionFamily": "sat-series-b|sat-mock-15|Advanced Math|Exponential equations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-low-76

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic functions and representations
DIFFICULTY: medium
QUESTION TYPE: student-produced-response

PROMPT:
A data specialist translates the stated relationship into a mathematical model before determining the requested value. The baseline is established before the requested quantity is determined. The observed comparison condition establishes the target relationship. For f(x) = (x − 20306)² + 20305, what is the minimum value of f?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 20305

EXPLANATION:
The square is minimized at 0, so the minimum is 20305.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-low-76",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-low-76",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
  "section": "math",
  "module": "math-module-2",
  "domain": "Advanced Math",
  "skill": "Quadratic functions and representations",
  "subskill": "Quadratic functions and representations",
  "conceptId": "Advanced Math-quadratic-functions-and-representations",
  "difficulty": "medium",
  "difficultyBand": "math-low-medium",
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
    "equation": "y = 1x² − 40612x + 412353941",
    "x_range": [
      20296,
      20316
    ],
    "visualVariant": "sat-mock-15-math-math-module-2-low-76"
  },
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-low-76",
  "conceptFingerprint": "Advanced Math-Quadratic functions and representations-75",
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
    "contextKey": "sat-series-b-sat-mock-15-math-75",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic functions and representations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Advanced Math-Quadratic functions and representations-75",
    "constructionFamily": "sat-series-b|sat-mock-15|Advanced Math|Quadratic functions and representations|family-7",
    "answerFormat": "numeric",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "representation-shift",
      "multi-step",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "advanced math|parabola|{equation:y = <n>x² − <n>x + <n>|type:parabola|x_range:[<n>,<n>]}|data:advanced math|parabola|{equation:y = 1x² − 40612x + 412353941|type:parabola|x_range:[20296,20316]}",
    "figureStructureFingerprint": "advanced math|parabola|{equation:y = <n>x² − <n>x + <n>|type:parabola|x_range:[<n>,<n>]}",
    "figureDataFingerprint": "advanced math|parabola|{equation:y = 1x² − 40612x + 412353941|type:parabola|x_range:[20296,20316]}"
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-low-77

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic parameter reasoning
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A research coordinator compares linked measurements and uses the reported constraint to determine the result. The calculation focuses on the condition that links the known and unknown values. The observed comparison condition establishes the target relationship. For 5x² − 20x + k = 0, the equation has exactly one real solution. What is k?

CHOICES:
[
  "20",
  "19",
  "21",
  "40"
]

ANSWER: A

EXPLANATION:
A repeated root requires the discriminant to equal zero.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-low-77",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-low-77",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-low-77",
  "conceptFingerprint": "Advanced Math-Quadratic parameter reasoning-76",
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
    "contextKey": "sat-series-b-sat-mock-15-math-76",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic parameter reasoning",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Advanced Math-Quadratic parameter reasoning-76",
    "constructionFamily": "sat-series-b|sat-mock-15|Advanced Math|Quadratic parameter reasoning|family-7",
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

### Question: sat-series-b-mock-15-math-math-module-2-low-78

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic equations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A field researcher compares two measured states and reconstructs the unknown quantity from the reported relationship. The requested value follows from the relationship among the measured quantities. The observed comparison condition establishes the target relationship. A quadratic has roots 7 and 16. What is the sum of the roots?

CHOICES:
[
  "24",
  "23",
  "46",
  "22"
]

ANSWER: B

EXPLANATION:
Add the two roots: 7 + 16 = 23.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-low-78",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-low-78",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-low-78",
  "conceptFingerprint": "Advanced Math-Quadratic equations-77",
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
    "contextKey": "sat-series-b-sat-mock-15-math-77",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic equations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Advanced Math-Quadratic equations-77",
    "constructionFamily": "sat-series-b|sat-mock-15|Advanced Math|Quadratic equations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-low-79

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Exponential equations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A quality analyst checks how a reported change follows from the quantities given in the scenario. The calculation uses the reported relationship directly. The observed comparison condition establishes the target relationship. If 2^x = 64, what is x?

CHOICES:
[
  "5",
  "7",
  "6",
  "12"
]

ANSWER: C

EXPLANATION:
Equal powers with the same base have equal exponents, so x = 6.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-low-79",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-low-79",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-low-79",
  "conceptFingerprint": "Advanced Math-Exponential equations-78",
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
    "contextKey": "sat-series-b-sat-mock-15-math-78",
    "contextFamily": "sat-series-b-Advanced Math-Exponential equations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Advanced Math-Exponential equations-78",
    "constructionFamily": "sat-series-b|sat-mock-15|Advanced Math|Exponential equations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "representation-shift"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-low-80

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Advanced Math
SKILL: Quadratic functions and representations
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A monitoring team relates the measured values through the stated mathematical condition. The stated quantities provide enough information to identify the target. The observed comparison condition establishes the target relationship. For f(x) = (x − 20310)² + 20312, what is the minimum value of f?

CHOICES:
[
  "20313",
  "40624",
  "20311",
  "20312"
]

ANSWER: D

EXPLANATION:
The square is minimized at 0, so the minimum is 20312.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-low-80",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-low-80",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
    "equation": "y = 1x² − 40620x + 412516412",
    "x_range": [
      20300,
      20320
    ],
    "visualVariant": "sat-mock-15-math-math-module-2-low-80"
  },
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-low-80",
  "conceptFingerprint": "Advanced Math-Quadratic functions and representations-79",
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
    "contextKey": "sat-series-b-sat-mock-15-math-79",
    "contextFamily": "sat-series-b-Advanced Math-Quadratic functions and representations",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Advanced Math-Quadratic functions and representations-79",
    "constructionFamily": "sat-series-b|sat-mock-15|Advanced Math|Quadratic functions and representations|family-7",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "representation-shift",
      "multi-step",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "advanced math|parabola|{equation:y = <n>x² − <n>x + <n>|type:parabola|x_range:[<n>,<n>]}|data:advanced math|parabola|{equation:y = 1x² − 40620x + 412516412|type:parabola|x_range:[20300,20320]}",
    "figureStructureFingerprint": "advanced math|parabola|{equation:y = <n>x² − <n>x + <n>|type:parabola|x_range:[<n>,<n>]}",
    "figureDataFingerprint": "advanced math|parabola|{equation:y = 1x² − 40620x + 412516412|type:parabola|x_range:[20300,20320]}"
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-low-81

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Problem-Solving and Data Analysis
SKILL: Weighted means
DIFFICULTY: medium
QUESTION TYPE: student-produced-response

PROMPT:
A resource planner compares a starting condition with a later condition to determine the requested quantity. The model provides the constraint needed to determine the target. The observed comparison condition establishes the target relationship. Group A has 20 observations with mean 18; Group B has 31 observations with mean 36. What is the combined mean?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 28.94

EXPLANATION:
Use the weighted total divided by the combined number of observations.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-low-81",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-low-81",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
  "section": "math",
  "module": "math-module-2",
  "domain": "Problem-Solving and Data Analysis",
  "skill": "Weighted means",
  "subskill": "Weighted means",
  "conceptId": "Problem-Solving and Data Analysis-weighted-means",
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-low-81",
  "conceptFingerprint": "Problem-Solving and Data Analysis-Weighted means-80",
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
    "contextKey": "sat-series-b-sat-mock-15-math-80",
    "contextFamily": "sat-series-b-Problem-Solving and Data Analysis-Weighted means",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Problem-Solving and Data Analysis-Weighted means-80",
    "constructionFamily": "sat-series-b|sat-mock-15|Problem-Solving and Data Analysis|Weighted means|family-7",
    "answerFormat": "numeric",
    "figurePurpose": null,
    "difficultyFeatures": [
      "data-interpretation",
      "multi-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-low-82

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Problem-Solving and Data Analysis
SKILL: Percentages
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
An operations analyst uses the stated model to connect the observed quantities and identify the requested value. The unknown is isolated from the stated condition. The observed comparison condition establishes the target relationship. A survey includes 563 responses. 40% select option A. How many responses select A?

CHOICES:
[
  "225.2",
  "224.2",
  "450.4",
  "226.2"
]

ANSWER: A

EXPLANATION:
Multiply 563 by 40/100.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-low-82",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-low-82",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
  "section": "math",
  "module": "math-module-2",
  "domain": "Problem-Solving and Data Analysis",
  "skill": "Percentages",
  "subskill": "Percentages",
  "conceptId": "Problem-Solving and Data Analysis-percentages",
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-low-82",
  "conceptFingerprint": "Problem-Solving and Data Analysis-Percentages-81",
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
    "contextKey": "sat-series-b-sat-mock-15-math-81",
    "contextFamily": "sat-series-b-Problem-Solving and Data Analysis-Percentages",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Problem-Solving and Data Analysis-Percentages-81",
    "constructionFamily": "sat-series-b|sat-mock-15|Problem-Solving and Data Analysis|Percentages|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-low-83

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Problem-Solving and Data Analysis
SKILL: Data models
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
An engineering team represents the relationship symbolically and checks the unknown against an observed condition. The mathematical relationship is evaluated using the given measurements. The observed comparison condition establishes the target relationship. A data set is modeled by y = 6x + 6. What y-value is predicted when x = 12?

CHOICES:
[
  "79",
  "78",
  "77",
  "156"
]

ANSWER: B

EXPLANATION:
Substitute x = 12 into the model.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-low-83",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-low-83",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
        20306
      ],
      [
        2,
        20310
      ],
      [
        3,
        20314
      ],
      [
        4,
        20318
      ],
      [
        5,
        20305
      ],
      [
        6,
        20309
      ]
    ],
    "visualVariant": "sat-mock-15-math-math-module-2-low-83"
  },
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-low-83",
  "conceptFingerprint": "Problem-Solving and Data Analysis-Data models-82",
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
    "contextKey": "sat-series-b-sat-mock-15-math-82",
    "contextFamily": "sat-series-b-Problem-Solving and Data Analysis-Data models",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Problem-Solving and Data Analysis-Data models-82",
    "constructionFamily": "sat-series-b|sat-mock-15|Problem-Solving and Data Analysis|Data models|family-7",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "data-interpretation",
      "representation-shift"
    ],
    "figureOriginalityFingerprint": "problem-solving and data analysis|scatter_plot|{points:[[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>]]|type:scatter_plot}|data:problem-solving and data analysis|scatter_plot|{points:[[1,20306],[2,20310],[3,20314],[4,20318],[5,20305],[6,20309]]|type:scatter_plot}",
    "figureStructureFingerprint": "problem-solving and data analysis|scatter_plot|{points:[[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>],[<n>,<n>]]|type:scatter_plot}",
    "figureDataFingerprint": "problem-solving and data analysis|scatter_plot|{points:[[1,20306],[2,20310],[3,20314],[4,20318],[5,20305],[6,20309]]|type:scatter_plot}"
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-low-84

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Problem-Solving and Data Analysis
SKILL: Measures of spread
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A systems analyst converts the stated conditions into a mathematical relationship and evaluates the unknown. The reported measurements are translated into the required mathematical form. The observed comparison condition establishes the target relationship. A data set has first quartile 17 and third quartile 29. What is the interquartile range?

CHOICES:
[
  "13",
  "11",
  "12",
  "24"
]

ANSWER: C

EXPLANATION:
IQR equals Q3 minus Q1.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-low-84",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-low-84",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-low-84",
  "conceptFingerprint": "Problem-Solving and Data Analysis-Measures of spread-83",
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
    "contextKey": "sat-series-b-sat-mock-15-math-83",
    "contextFamily": "sat-series-b-Problem-Solving and Data Analysis-Measures of spread",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Problem-Solving and Data Analysis-Measures of spread-83",
    "constructionFamily": "sat-series-b|sat-mock-15|Problem-Solving and Data Analysis|Measures of spread|family-7",
    "answerFormat": "A-D",
    "figurePurpose": null,
    "difficultyFeatures": [
      "direct-application",
      "single-step"
    ]
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-low-85

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Geometry and Trigonometry
SKILL: Similarity and scaling
DIFFICULTY: medium
QUESTION TYPE: multiple-choice

PROMPT:
A planning analyst models a changing quantity from a stated baseline and rate. The quantities are connected through the model given in the scenario. The observed comparison condition establishes the target relationship. Two similar figures have corresponding lengths in the ratio 5078:1. The smaller figure has area 50787. What is the larger area?

CHOICES:
[
  "1309597848109",
  "1309597848107",
  "2619195696216",
  "1309597848108"
]

ANSWER: D

EXPLANATION:
Areas scale by the square of the length ratio.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-low-85",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-low-85",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
  "section": "math",
  "module": "math-module-2",
  "domain": "Geometry and Trigonometry",
  "skill": "Similarity and scaling",
  "subskill": "Similarity and scaling",
  "conceptId": "Geometry and Trigonometry-similarity-and-scaling",
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
    "shape": "similar-figures",
    "values": {
      "scale": 5078,
      "area": 50787
    },
    "visualVariant": "sat-mock-15-math-math-module-2-low-85"
  },
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-low-85",
  "conceptFingerprint": "Geometry and Trigonometry-Similarity and scaling-84",
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
    "contextKey": "sat-series-b-sat-mock-15-math-84",
    "contextFamily": "sat-series-b-Geometry and Trigonometry-Similarity and scaling",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Geometry and Trigonometry-Similarity and scaling-84",
    "constructionFamily": "sat-series-b|sat-mock-15|Geometry and Trigonometry|Similarity and scaling|family-7",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "multi-step",
      "constraint-inference"
    ],
    "figureOriginalityFingerprint": "geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:<n>|scale:<n>}}|data:geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:50787|scale:5078}}",
    "figureStructureFingerprint": "geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:<n>|scale:<n>}}",
    "figureDataFingerprint": "geometry and trigonometry|geometry|{shape:similar-figures|type:geometry|values:{area:50787|scale:5078}}"
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-low-86

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Geometry and Trigonometry
SKILL: Geometry and measurement
DIFFICULTY: hard
QUESTION TYPE: student-produced-response

PROMPT:
A measurement team uses a stated relationship between variables to reconstruct the missing value. The baseline is established before the requested quantity is determined. The observed comparison condition establishes the target relationship. A triangle has base 20310 and height 20316. What is its area?
Enter your answer as a number.

CHOICES:
[]

ANSWER: 206308980

EXPLANATION:
Use one-half times base times height.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-low-86",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-low-86",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
  "section": "math",
  "module": "math-module-2",
  "domain": "Geometry and Trigonometry",
  "skill": "Geometry and measurement",
  "subskill": "Geometry and measurement",
  "conceptId": "Geometry and Trigonometry-geometry-and-measurement",
  "difficulty": "hard",
  "difficultyBand": "math-low-hard",
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
      "base": 20310,
      "height": 20316
    },
    "visualVariant": "sat-mock-15-math-math-module-2-low-86"
  },
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-low-86",
  "conceptFingerprint": "Geometry and Trigonometry-Geometry and measurement-85",
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
    "contextKey": "sat-series-b-sat-mock-15-math-85",
    "contextFamily": "sat-series-b-Geometry and Trigonometry-Geometry and measurement",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Geometry and Trigonometry-Geometry and measurement-85",
    "constructionFamily": "sat-series-b|sat-mock-15|Geometry and Trigonometry|Geometry and measurement|family-7",
    "answerFormat": "numeric",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "multi-step",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:<n>|height:<n>}}|data:geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:20310|height:20316}}",
    "figureStructureFingerprint": "geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:<n>|height:<n>}}",
    "figureDataFingerprint": "geometry and trigonometry|geometry|{shape:triangle|type:geometry|values:{base:20310|height:20316}}"
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-low-87

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Geometry and Trigonometry
SKILL: Circles
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A project analyst translates the reported quantities into an equation before evaluating the target. The calculation focuses on the condition that links the known and unknown values. The observed comparison condition establishes the target relationship. A circle has radius 20319. What is its area in terms of π?

CHOICES:
[
  "412861761π",
  "412861761π + 1",
  "412861761π − 1",
  "none of these"
]

ANSWER: A

EXPLANATION:
Area equals πr².

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-low-87",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-low-87",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
    "radius": 20319,
    "center_label": "O",
    "visualVariant": "sat-mock-15-math-math-module-2-low-87"
  },
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-low-87",
  "conceptFingerprint": "Geometry and Trigonometry-Circles-86",
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
    "contextKey": "sat-series-b-sat-mock-15-math-86",
    "contextFamily": "sat-series-b-Geometry and Trigonometry-Circles",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Geometry and Trigonometry-Circles-86",
    "constructionFamily": "sat-series-b|sat-mock-15|Geometry and Trigonometry|Circles|family-7",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "direct-application",
      "single-step",
      "strategic-choice",
      "multi-step"
    ],
    "figureOriginalityFingerprint": "geometry and trigonometry|circle|{center_label:o|radius:<n>|type:circle}|data:geometry and trigonometry|circle|{center_label:o|radius:20319|type:circle}",
    "figureStructureFingerprint": "geometry and trigonometry|circle|{center_label:o|radius:<n>|type:circle}",
    "figureDataFingerprint": "geometry and trigonometry|circle|{center_label:o|radius:20319|type:circle}"
  }
}
```

### Question: sat-series-b-mock-15-math-math-module-2-low-88

STATUS: LEGACY
TEST KEY: sat-series-b-mock-15
TEST ID: sat-series-b-mock-15
SECTION: math
MODULE: math-module-2
DOMAIN: Geometry and Trigonometry
SKILL: Right triangles
DIFFICULTY: hard
QUESTION TYPE: multiple-choice

PROMPT:
A data specialist translates the stated relationship into a mathematical model before determining the requested value. The requested value follows from the relationship among the measured quantities. The observed comparison condition establishes the target relationship. A right triangle has legs 20307 and 20309. What is its area?

CHOICES:
[
  "206207432.5",
  "206207431.5",
  "206207430.5",
  "412414863"
]

ANSWER: B

EXPLANATION:
Area equals one-half the product of the perpendicular legs.

SYSTEM METADATA (DO NOT EDIT DIRECTLY):
```json
{
  "contentId": "sat-series-b-mock-15-math-math-module-2-low-88",
  "version": 6,
  "product": "sat",
  "questionId": "sat-series-b-mock-15-math-math-module-2-low-88",
  "testId": "sat-series-b-mock-15",
  "assessmentFamily": "sat",
  "assessmentVariant": "sat-series-b",
  "assessmentNumber": 15,
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
    "leg_a": 20307,
    "leg_b": 20309,
    "labels": {
      "a": "a",
      "b": "b",
      "c": "c"
    },
    "unknown_side": "c",
    "visualVariant": "sat-mock-15-math-math-module-2-low-88"
  },
  "isOperational": true,
  "adaptiveRoute": "low",
  "originalityFingerprint": "sat-series-b-sat-series-b-mock-15-math-math-module-2-low-88",
  "conceptFingerprint": "Geometry and Trigonometry-Right triangles-87",
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
    "contextKey": "sat-series-b-sat-mock-15-math-87",
    "contextFamily": "sat-series-b-Geometry and Trigonometry-Right triangles",
    "applicationFingerprint": "sat-series-b-sat-mock-15-Geometry and Trigonometry-Right triangles-87",
    "constructionFamily": "sat-series-b|sat-mock-15|Geometry and Trigonometry|Right triangles|family-7",
    "answerFormat": "A-D",
    "figurePurpose": "question-essential",
    "difficultyFeatures": [
      "representation-shift",
      "multi-step",
      "strategic-choice"
    ],
    "figureOriginalityFingerprint": "geometry and trigonometry|right_triangle|{labels:{a:a|b:b|c:c}|leg_a:<n>|leg_b:<n>|type:right_triangle|unknown_side:c}|data:geometry and trigonometry|right_triangle|{labels:{a:a|b:b|c:c}|leg_a:20307|leg_b:20309|type:right_triangle|unknown_side:c}",
    "figureStructureFingerprint": "geometry and trigonometry|right_triangle|{labels:{a:a|b:b|c:c}|leg_a:<n>|leg_b:<n>|type:right_triangle|unknown_side:c}",
    "figureDataFingerprint": "geometry and trigonometry|right_triangle|{labels:{a:a|b:b|c:c}|leg_a:20307|leg_b:20309|type:right_triangle|unknown_side:c}"
  }
}
```
