# Approved Launch Corpus

This directory is the **human-editable staging area for launch-approved content**.

A question belongs here only after human review has established that the content is suitable for the intended SAT/PSAT use.

## Required lifecycle

`DRAFT → REVIEW → APPROVED → CANONICAL → RUNTIME`

Approval in this directory does not by itself mutate production. Canonical promotion remains a controlled, validated operation.

## Required identity

Every question must retain its existing `testKey + questionId` when editing an existing target unless an explicit identity migration is approved.

New questions must not silently create new production mock targets.

## Required separation

Legacy content must never be treated as approved merely because it was exported here. A legacy item must be explicitly reviewed and assigned an approval status before canonical promotion.
