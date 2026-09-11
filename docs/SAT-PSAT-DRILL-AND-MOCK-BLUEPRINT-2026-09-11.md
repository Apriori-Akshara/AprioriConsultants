# Apriori SAT / PSAT — Drill and Mock Blueprint

**Date:** September 11, 2026  
**Status:** Permanent planning and assembly blueprint  
**Governing content standard:** `docs/TEST-PREP-CONTENT-QUALITY-CONTROL.md`

## 1. Assessment naming

The student-facing mock area is now conceptually **PSAT/SAT Mocks**.

It will contain:

- **10 PSAT mocks**;
- **10 SAT mocks — Series A**;
- **10 SAT mocks — Series B**.

Total initial mock inventory: **30 full-length mocks**.

The technical route name may remain temporarily `/SATMocks` until a later UI/route migration is deliberately implemented. Content identifiers must not depend on the visible route name.

## 2. PSAT scope

The initial PSAT bank is **PSAT/NMSQT-aligned**. The content model must retain an assessment-variant field so PSAT 10 and PSAT 8/9 content can be added later without creating a new question architecture.

The current PSAT/NMSQT standard digital structure is:

- Reading & Writing: 54 questions, 64 minutes;
- Math: 44 questions, 70 minutes;
- two modules per section;
- 10-minute break.

This matches the current College Board SAT Suite structure for the standard digital PSAT/NMSQT. citeturn161535search9turn476869search0

## 3. SAT scope

Series A and Series B are two independent banks of 10 SAT mocks each.

They must:

- use the current digital SAT structure;
- contain distinct original content;
- contain no cross-series duplication of scored questions;
- maintain the same domain and question-type blueprint;
- use independent adaptive Module 2 pools;
- share the same content taxonomy and QC process.

## 4. Foundation exercise/drill structure

Every Foundation exercise/drill = **5 sets × 10 questions = 50 questions**.

Set difficulty must increase after every set, with a major jump at each set boundary.

Controlled progression:

`foundation-set-01` → `foundation-set-02` → `foundation-set-03` → `foundation-set-04` → `foundation-set-05`

The broad Easy/Medium/Hard classification remains on every question. The progression-band label supplies the finer set-level difficulty information.

The sets must not simply recycle the same template. Each set should increase the reasoning, application, distractor sophistication, visual/data burden, or multi-step demand appropriate to the skill.

## 5. Advanced exercise/drill structure

Every Advanced exercise/drill = **10 sets × 20 questions = 200 questions**.

Controlled progression:

`advanced-set-01` through `advanced-set-10`

A major difficulty jump must occur after every set.

Advanced difficulty growth should come from increasingly sophisticated reasoning, multi-step operations, distractor quality, representation changes, data interpretation, strategic selection and time pressure rather than merely longer questions.

## 6. Timing policy

Every drill/exercise has a timing mode:

### Timed

- hard timeout;
- timer follows the real-assessment average time-per-question benchmark for the relevant product/section;
- when time expires, the activity is locked/submitted according to the test engine's rules;
- answers and elapsed time are persisted;
- the student cannot continue after timeout.

### Non-timed

- no timeout;
- elapsed time is always recorded;
- the student can continue until completion;
- time can be used later for pacing analytics and recommendations.

### Current SAT baseline timing

Reading & Writing: approximately **71 seconds/question** (64 minutes ÷ 54 questions).  
Math: approximately **95 seconds/question** (70 minutes ÷ 44 questions). citeturn161535search4turn161535search2

For mixed activities, the timeout must be calculated from the individual question's section/product timing benchmark rather than using one universal number.

## 7. Calculator policy

For PSAT/SAT Math practice and mock tests, the integrated calculator must be available throughout Math, consistent with the current digital SAT Suite environment.

College Board currently provides embedded Desmos scientific and graphing options and prohibits CAS calculators. citeturn161535search6turn161535search23

Questions will carry metadata indicating whether scientific or graphing functionality is expected, optional, unnecessary or required for the intended solution path.

## 8. Lessons

SAT lessons remain part of the learning modules and must connect directly to this same taxonomy.

Every lesson should provide a visual, progressive learning path:

**concept → visual explanation → worked example → strategy → guided practice → independent practice → error diagnosis → transfer**

Exercises/drills should link back to the lesson and skill that they reinforce.

## 9. Content volume implication

The 30 full-length mock forms require at least:

- 10 PSAT × 98 = 980 displayed question positions;
- 20 SAT × 98 = 1,960 displayed question positions;
- total displayed positions = **2,940**.

The actual source question bank must be considerably larger than 2,940 because it must also support:

- adaptive Module 2 route pools;
- Foundation drills;
- Advanced drills;
- timed and non-timed practice;
- topic/skill drills;
- lesson checkpoints;
- remediation;
- question replacement;
- calibration;
- future mock forms;
- duplication safeguards.

No exact final bank size is hard-coded yet; it will be determined from coverage, adaptive pool depth and QC capacity.

## 10. Permanent rule

All question, lesson and content decisions in this blueprint are governed by:

`docs/TEST-PREP-CONTENT-QUALITY-CONTROL.md`

The blueprint defines quantities and progression. The master QC document defines what is acceptable for publication.
