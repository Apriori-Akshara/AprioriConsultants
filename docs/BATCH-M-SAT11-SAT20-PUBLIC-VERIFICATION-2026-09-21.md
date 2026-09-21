# Batch M — SAT11–SAT20 Public Route Smoke Verification — 2026-09-21

## Purpose

This checkpoint verifies that the deployed SAT Series B entry page and the ten SAT11–SAT20 routes are live and correctly protected by the existing verified-account login boundary.

## Scope

- `/SATMocksSeriesB`
- `/SATMocks/SAT11` through `/SATMocks/SAT20`
- Live production host: `https://www.aprioriconsultants.org`

For an unauthenticated request, each protected route must return a redirect to `/Auth?returnTo=<same route>`. The verification does not weaken authentication and does not mutate production content.

## Boundary

This is a deployment/route smoke check only. It does **not** claim completion of authenticated student acceptance, question-by-question rendering, timing, adaptive progression, persistence, scoring, or reporting for SAT11–SAT20. Those remain part of the final end-to-end student acceptance checkpoint.

## Production safety

- Production corpus remains frozen at 30 mocks.
- SAT21 is not created.
- No question-generation or production-content mutation occurs.
- No authentication, payment, or access rule is changed.
