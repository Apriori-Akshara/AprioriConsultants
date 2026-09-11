# SAT Security Milestone — September 11, 2026

## Purpose

This addendum records the newly agreed security milestone for the Apriori Digital SAT platform.

## New urgent milestone

Immediately **after Mock 04 (PSAT + SAT) is complete and the internal unlock mechanism has been tested**, implement and test a targeted abuse-protection layer **before the public student registration link is distributed**.

### Scope

Protect the existing registration and email-verification flow against:

* automated mass registrations;
* repeated verification-email requests;
* fake-account creation;
* email bombing/abuse;
* unnecessary database and email-provider load.

The solution must be a focused server-side hardening layer. It must **not** redesign or replace the existing Student ID generation, registration, email verification, session authentication, SAT access, or database architecture.

At that milestone, inspect the current implementation first and implement appropriate rate limiting and abuse controls for registration and verification-email activity. Also review practical provider/service limits and make sure legitimate student registration remains usable.

## Current Student ID/verification architecture remains unchanged

* Student ID is generated automatically by the server during registration.
* The registering student does not choose or generate the Student ID.
* The ID is stored in PostgreSQL as the user's login ID.
* Registration initially creates the account as unverified.
* A secure time-limited verification token is generated server-side.
* The verification link is sent through Resend.
* Successful verification changes the account to verified.
* Unverified login rejection has already been tested successfully.

No additional Student ID safeguard is required at this time.

## Current development priority

**Do not implement this security milestone now.**

Continue the current mock-test content/QC sequence. The urgent security work becomes the next priority only after:

1. Mock 04 PSAT is complete and QC'd;
2. Mock 04 SAT is complete and QC'd;
3. the Mock 04 pair is deployed and user-verified; and
4. the internal unlock mechanism has been tested, including the controlled 8–10 unlock and separate SAT 11–20 progression condition.

## Next sequence after the security milestone

**Mock 03 PSAT → QC → Mock 03 SAT → combined QC/deployment → Mock 04 PSAT → QC → Mock 04 SAT → combined QC/deployment → unlock-mechanism testing → URGENT registration/verification abuse protection → public registration-link readiness.**

This addendum should be read together with `docs/SAT-PROJECT-STATE.md` and `docs/SAT-ARCHITECTURE.md`.