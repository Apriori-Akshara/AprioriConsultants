# SAT Live Deployment and Verification Rule

**Established:** September 11, 2026

This is a permanent working rule for the SAT/test-prep build process.

## 1. Primary verification environment

The **public live website** is the primary student-facing environment for verification:

`https://www.aprioriconsultants.org`

The Render URL is an infrastructure/deployment environment and is **not** the normal user verification target.

## 2. Deployment requirement

Unless a change absolutely requires a remote-only Render operation, every product change must be carried through to the public live website before the user is asked to verify it.

Do not ask the user to verify a feature on the Render URL merely because the code was deployed there.

The intended sequence is:

**GitHub implementation → deployment/hosting synchronization → public live website → user verification**

The user should not have to determine whether a GitHub change has reached the public website.

## 3. Authentication and session changes

Authentication, login, registration, email verification, session-cookie, SAT-access, and authorization changes are especially important because a stale public deployment can make a correctly implemented repository change appear broken.

If the public live website cannot use a recently implemented authentication change, first determine whether the public domain is serving the current application/deployment before changing the authentication code again.

Do not duplicate or rewrite working authentication merely because the public domain has not yet received the current deployment.

## 4. Live-domain priority

For student-facing testing, use the public live domain for:

- Login and logout
- Registration and email verification
- Profile and Courses
- SAT Foundation
- SAT Advanced
- SAT Mock Tests
- Subscription/entitlement flows when implemented
- Student-facing UI/UX
- Responsive/mobile checks
- End-to-end user journeys

The Render URL may be used internally when necessary to diagnose deployment/build/service issues, but it should not become the user's routine testing URL.

## 5. No deployment lag by design

When a GitHub change is intended for the public website, deployment synchronization to the live site must be treated as part of the same implementation task, not as an optional later step.

A feature is not considered ready for user verification merely because GitHub contains the code or a Render deployment is green. It must be available on the public live website.

## 6. Documentation and verification

Project documentation should record the live-deployment rule immediately when it is established. Normal feature/status documentation should still be updated after the user verifies the relevant live changes, unless the user explicitly asks for a rule or architecture decision to be documented earlier.
