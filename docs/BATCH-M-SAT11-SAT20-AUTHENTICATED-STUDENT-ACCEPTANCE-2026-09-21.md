# Batch M — SAT11–SAT20 Authenticated Student Acceptance Checkpoint — 2026-09-21

## Status

**FOCUSED FUNCTIONALITY ACCEPTANCE — PASSED BY USER LIVE-SITE CHECK**

The unauthenticated public route smoke verification for SAT Series B is complete and green.

- Public route workflow: `Batch M SAT11-SAT20 Public Route Smoke Verification`
- Green workflow run: `35580194863`
- Verified scope:
  - `/SATMocksSeriesB`
  - `/SATMocks/SAT11` through `/SATMocks/SAT20`
- Public host: `https://www.aprioriconsultants.org`

The user performed a focused authenticated Series B live-site check and reported that the features and functionality appeared satisfactory. This records a **focused functionality pass**. It is not an exhaustive question-by-question content review, comprehensive visual QC, or final Batch M release acceptance.

## Acceptance result

**Result: PASS for focused functionality.** No functional defect was reported by the user during the live Series B check.

The broader final public QC remains pending and should not be inferred from this focused pass.

## Acceptance scope

Use the public website only with a normal verified student account.

### 1. Series B entry

Open:

`https://www.aprioriconsultants.org/SATMocksSeriesB`

Confirm:

- the Series B page loads after authentication;
- SAT11 through SAT20 are presented;
- no SAT21 is presented;
- the page does not expose protected test content while logged out.

### 2. SAT11 launch

Open:

`https://www.aprioriconsultants.org/SATMocks/SAT11`

Confirm:

- the correct SAT11 test opens;
- the instructions screen identifies the correct test;
- the test is not redirected back to the Series B library after authentication.

### 3. Question/content identity

During SAT11, confirm:

- Reading and Writing Module 1 loads;
- the displayed questions belong to SAT11;
- no SAT1–SAT10, PSAT, or other mock content appears;
- answer choices are selectable;
- Previous/Next navigation works.

### 4. Saved-state controls

Use at least one question to verify:

- answer selection is saved;
- Mark for Review can be toggled;
- a note can be saved;
- Question Navigator can move between questions.

### 5. Timing and module transition

Continue far enough to verify:

- the module timer starts;
- the timer counts down;
- Module 1 can be completed;
- adaptive Module 2 is reached;
- the second module is not silently replaced by an unsupported standard fallback.

Do not wait for a real-time expiry merely to test the timer.

### 6. Resume behavior

If an in-progress attempt is available:

- leave the test;
- reopen SAT11;
- confirm the saved attempt resumes at the saved section/module/question;
- confirm saved answers remain present.

### 7. Completion/reporting

If the acceptance run is completed:

- confirm the attempt reaches completion;
- confirm the report identifies SAT11;
- confirm the saved result is associated with SAT11;
- confirm the report is practice scoring, not represented as an official College Board scaled score.

### 8. Additional Series B launch spot-check

Repeat the launch/content-identity check for at least one additional Series B test, preferably SAT20.

Confirm that its test identity and content are correct and isolated from SAT11.

## Production boundary

This acceptance checkpoint must not:

- create SAT21;
- modify production questions;
- replace production content;
- regenerate the frozen corpus;
- weaken authentication;
- bypass subscription/access rules;
- create a second SAT engine;
- alter the shared adaptive engine merely to make acceptance easier.

## Current architecture already in place

The existing shared SAT runtime provides:

- verified-account server authentication;
- server-authoritative test access;
- shared adaptive module routing;
- timed modules;
- answer persistence;
- flag persistence;
- note persistence;
- position persistence;
- server-authoritative progression;
- completion scoring;
- saved report history.

The purpose of this checkpoint is to verify those existing capabilities against the newly exposed SAT11–SAT20 public Series B routes rather than to create a parallel implementation.

## Release decision boundary

The Batch M release remains **not fully student-accepted** until the authenticated public-site checks above are completed.

This focused acceptance is now recorded in the current Batch M status and release sequence documents. The next release work is the remaining substantive deep-QC/release blocker, followed by the final comprehensive public QC and Batch M acceptance.

If a later live check identifies a defect, fix only the verified defect, deploy it to the public domain, rerun the affected verification, and update the acceptance record.
