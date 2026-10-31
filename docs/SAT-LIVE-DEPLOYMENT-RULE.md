# Public Website Deployment and Verification Rule

**Last updated:** October 31, 2026  
**Current production host:** Vercel (custom-domain DNS cutover pending)

This is the permanent deployment and student-facing verification rule. The current recovery order is governed by `docs/WEBSITE-RESTORATION-AND-VERCEL-MIGRATION-ROADMAP.md`.

## 1. Hosting authority

- Vercel is the intended production host for the Apriori Next.js website/application.
- The Vercel project is `apriori-consultants`, using Node.js 24.x.
- The October 31, 2026 production deployment for commit `91e056089490fc54eb2dffe47e760229b62620c8` is READY.
- The intended public verification domain is `https://www.aprioriconsultants.org`; the apex domain redirects to www.
- Render's `AprioriConsultants` web service is billing-suspended. The historical Render URL `https://aprioriconsultants.onrender.com` is not the public verification target and must not be resumed or paid for as part of website restoration.

A Vercel deployment marked READY is not proof that the custom domain has migrated. Until GoDaddy DNS is pointed to Vercel and public access is verified, the public domain remains unavailable.

## 2. Required release path

The intended sequence is:

**GitHub main → Vercel production build/deployment → custom-domain DNS routing → public-domain and runtime verification → user verification**

Deployment synchronization is part of the implementation task. Do not ask the user to verify a preview URL when the intended change is for the public website.

## 3. Public-site acceptance

A change is not ready for public verification merely because GitHub contains the code or Vercel reports READY. Verify:

- the public custom domain resolves to the intended Vercel deployment;
- ordinary visitors are not blocked by Vercel deployment protection;
- public pages, deep links, assets, client-side navigation and responsive layouts load;
- public forms and any required APIs, email and database integrations work;
- the browser console and network show no material failures;
- no public website route depends on the suspended Render website service.

Record any check that could not be performed; do not report it as passed.

## 4. Authentication and student-product checks

Authentication, login, registration, email verification, session-cookie, SAT-access and authorization changes must be checked against the current Vercel deployment and its actual environment configuration. Before changing authentication code, first establish that the public domain serves the current Vercel deployment and that required runtime services are reachable.

Do not rewrite working authentication because the public domain is still routed to an old or suspended host.

Authenticated student/mock-test acceptance is part of the later mock-test work sequence. Do not weaken auth, subscription, entitlement, scoring or student-data controls to make the public marketing pages appear available.

## 5. Current exception — October 31, 2026

- Vercel production deployment: READY.
- Vercel deployment homepage fetch: HTTP 200.
- Vercel custom domain associations: verified.
- GoDaddy DNS: still points website traffic to Render.
- `www.aprioriconsultants.org`: last checked as HTTP 503 from Render suspension.
- Vercel project SSO protection: reported enabled for production deployment URLs and all previews; effective custom-domain anonymous access still requires verification.
- GoDaddy DNS has not been changed.

Therefore the public site is **not yet restored**. Follow Stage 1 and Stage 2 of the recovery roadmap before starting the public-page redesign or resuming mock-test work.
