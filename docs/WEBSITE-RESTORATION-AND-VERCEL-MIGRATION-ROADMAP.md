# Apriori Website Recovery, Vercel Migration and Delivery Roadmap

**Last updated:** October 31, 2026  
**Status:** Stage 2 — user DNS cutover is complete and Vercel confirms both domains correctly configured; public-site restoration verification is in progress. Stages 3 and 4 remain gated.  
**Authority:** This is the single current source of truth for the website-hosting recovery order. It supersedes older statements that describe Render as the current public website host.

## Required project sequence

The work must proceed in this exact order. Do not skip ahead or run later-stage work while an earlier stage remains open.

1. **Vercel migration**
2. **Public website restoration verification**
3. **Pending website redesign**
4. **Resume mock-test work**

The completed state of one stage is the entry condition for the next. A successful build or a deployment marked READY does not, by itself, complete either migration or public restoration.

## Stage 1 — Vercel migration

**COMPLETE — user completed the GoDaddy DNS cutover; Vercel reports both domains correctly configured.**

### Completed and verified

- User-completed GoDaddy DNS cutover is confirmed by Vercel: the www domain uses the recommended CNAME; the apex uses the recommended Vercel A-record pair; both report misconfigured=false and no DNS conflicts.

- GitHub repository: `Apriori-Akshara/AprioriConsultants`, branch `main`.
- Vercel project: `apriori-consultants`.
- Vercel Node.js project setting: **24.x**.
- Previous production deployment before the Premium Services correction: READY — `dpl_CebMmuTcsfnJ2kSUhLoPXwX5jLx6`, commit `4a100442353638dfc40b0cbea256c56904f10912` (`docs: record frontend-only Vercel launch readiness`).
- Production deployment aliases include `www.aprioriconsultants.org` and `aprioriconsultants.org`.
- Both custom-domain associations remain Vercel-verified; the apex is configured to redirect to `www` with HTTP 308.
- Vercel project Node.js runtime is 24.x. The latest production deployment is READY; this is distinct from public-domain DNS cutover and post-cutover visual acceptance.

### Remaining migration blockers

**The public domain still resolves to Render, not Vercel.** The GoDaddy DNS nameservers are `ns08.domaincontrol.com` and `ns07.domaincontrol.com`.

Pre-cutover website records (historical; replaced by the user cutover):

| Host | Current record pointing to Render | Vercel-reported recommendation |
|---|---|---|
| Apex `@` | A `216.24.57.1` | Preferred IPv4 set: `216.198.79.1` and `64.29.17.1`; alternate: `76.76.21.21` |
| `www` | CNAME `aprioriconsultants.onrender.com` | Preferred CNAME: `cd3ea3f5daa82b89.vercel-dns-017.com`; alternate: `cname.vercel-dns.com` |
| `www` | A `216.24.57.18` and `216.24.57.16` | Remove the old Render A records when the approved cutover is performed; do not leave conflicting A/CNAME records for `www`. |

These values are the Vercel domain-configuration recommendations returned during the October 31 audit. Re-check the live GoDaddy zone and Vercel domain instructions immediately before changing DNS. Do not change nameserver, MX, TXT, email, or unrelated records.

**The user completed the DNS changes manually in GoDaddy.** The assistant did not edit DNS. The current accepted Vercel configuration is recorded in the Stage 2 checkpoint below.

### Approved frontend-only launch boundary — October 31, 2026

The user has explicitly authorized the public frontend to be restored on Vercel while the backend and PostgreSQL database remain on Render in their current billing-suspended state. This is a **frontend-only public launch**, not a full-stack migration or confirmation that login, forms, email, database operations, or student functionality work.

The pre-cutover inspection confirms:

1. **Vercel deployment and domain assignment — PASS.** The latest production deployment is READY and includes both custom-domain aliases. Both project-domain associations report verified.
2. **Anonymous custom-domain access configuration — PASS.** Vercel reports Vercel Authentication scope `prod_deployment_urls_and_all_previews` (Standard Protection). This protects generated deployment URLs/previews while leaving the actual production custom domains public. Do not disable this protection or change its scope.
3. **Public-page rendering boundary — PASS by source inspection.** The homepage and representative public pages (`/`, `/About`, `/Admissions`, `/Contact`, `/TestPrep`, `/Languages`, and `/Testimonials`) are rendered from frontend components and do not require a successful database read to produce their page content. The shared navigation performs a first-party `/api/auth/session` check; that API catches database errors and returns `authenticated: false`, so a suspended/unconfigured database does not prevent the public page from rendering.
4. **Backend-dependent functionality — DEFERRED.** The Vercel project environment-variable inventory currently shows `NEXT_PUBLIC_BACKENDURL` pointing to `https://aprioribackend.onrender.com`; no `DATABASE_URL` entry was present in the returned project-variable inventory. The application's database helper requires `DATABASE_URL`. The connected Render workspace currently lists the `AprioriConsultants` web service and `apriori-consultants-database` as suspended by billing. The configured `aprioribackend.onrender.com` hostname did not appear as a service in that workspace inventory, so its current service state is unverified.
5. **Public form behavior — DEFERRED.** The current homepage Apply form, Contact page Message form, and footer newsletter controls have no submission handlers in the inspected source. They must not be represented as working. Their future implementation is a separate task; reactivating Render alone will not add missing form handlers.

No code, production environment variable, Vercel protection setting, Render service/database, or DNS record needs to be changed to make the static public content eligible for the Vercel cutover. Preserve the existing backend URL variable unchanged for later investigation/reactivation.

### Pre-cutover DNS state — confirmed directly from Vercel

Vercel currently reports these external DNS records and recommendations:

| Host | Current DNS detected by Vercel | Preferred Vercel record |
|---|---|---|
| Apex `@` | A `216.24.57.1` | A `216.198.79.1` and A `64.29.17.1` |
| `www` | CNAME `aprioriconsultants.onrender.com` plus A `216.24.57.18` and `216.24.57.16` | CNAME `cd3ea3f5daa82b89.vercel-dns-017.com` only |

The detected nameservers are `ns07.domaincontrol.com` and `ns08.domaincontrol.com`. Both Vercel domain configurations report `misconfigured: true` because DNS still targets Render. Domain verification being true confirms the project association; it does not mean traffic is already routed to Vercel.

The user must make the DNS edits in GoDaddy. Replace the apex A record with the two preferred Vercel A records; remove the old `www` Render CNAME and both old `www` A records; add the preferred `www` CNAME. Preserve all unrelated records, including MX, TXT, SPF, DKIM, DMARC, email, and verification records. Do not change nameservers.

### Render status and cost boundary

The Render web service `AprioriConsultants` (`https://aprioriconsultants.onrender.com`) is **suspended by billing**. Its suspended response was confirmed as HTTP 503 with Render's suspension-routing header. Do not pay, resume, redeploy, or change Render as part of this recovery sequence. Public website delivery must not depend on the suspended Render web service.

### Stage 1 completion gate — PASS

The user completed the GoDaddy DNS cutover. Vercel now reports misconfigured=false for both www.aprioriconsultants.org and aprioriconsultants.org; the custom domains are verified and assigned to the production project; the apex redirects to www with HTTP 308. Stage 1 is therefore COMPLETE. Backend/database reachability remains explicitly outside this frontend-only migration and is DEFERRED until the user chooses to reactivate Render.

## Stage 2 — Public website restoration verification

**IN PROGRESS — DNS cutover confirmed; full public-site acceptance remains open**

Stage 2 is a **public frontend restoration check**. It must establish that an ordinary unauthenticated visitor can access the Vercel-hosted public website even while Render's backend/database remain suspended.

### Required frontend checks after the completed DNS cutover

1. `https://www.aprioriconsultants.org/` loads the intended Vercel production homepage for an ordinary unauthenticated visitor.
2. `https://aprioriconsultants.org/` redirects to `https://www.aprioriconsultants.org/` without passing through Render.
3. Public main-menu, submenu and other no-login content routes load both through navigation and by direct URL/deep link, including refresh.
4. CSS, JavaScript, images, fonts, and the Contact page map iframe load without material failures.
5. Public navigation works on desktop, tablet and mobile; record any pre-existing layout defects separately from restoration blockers.
6. The browser console/network shows no page-rendering failures and no public content route depends on the suspended Render website service.
7. Login and registration entry screens may be checked for rendering only. Do not attempt to certify login, registration, email verification, password reset, session, student, admin or mock-test workflows while the database/backend are suspended.
8. Record the final public DNS and Vercel domain status after propagation. A deployment URL response or Vercel domain association alone is not proof of public custom-domain restoration.

### Explicitly deferred until backend/database reactivation

- Login, registration, email verification, password reset, session validation, student/profile data, admin tools, payment/entitlement, SAT/PSAT mock tests, progress and results.
- Any API route requiring PostgreSQL or a Render backend.
- Contact/application/newsletter submission. In addition to their backend dependency, the currently inspected homepage Apply, Contact Message and footer newsletter controls do not have submission handlers in source; they need separate implementation and end-to-end verification before being advertised as usable.
- Email delivery and other transactional integrations.

Do not change authentication/security rules, make failed actions appear successful, create local/mock substitutes for student data, or weaken access controls to make the frontend-only launch appear fully functional.

Close Stage 2 when the public frontend routes, assets, navigation, anonymous access and responsive presentation pass. Record the backend-dependent features above as DEFERRED, not PASS. Stage 3 may then begin under the existing public-page-only redesign policy; Stage 4 remains gated behind Stage 3.

### October 31, 2026 — Post-cutover checkpoint

- The user reports that the public website is back online after the GoDaddy DNS cutover.
- Vercel confirms www.aprioriconsultants.org is verified, has no DNS conflicts, and uses the recommended CNAME cd3ea3f5daa82b89.vercel-dns-017.com; its domain configuration reports misconfigured=false.
- Vercel confirms aprioriconsultants.org is verified, has no DNS conflicts, and uses A records 216.198.79.1 and 64.29.17.1; its domain configuration reports misconfigured=false. The apex redirect to www is configured as HTTP 308.
- These facts close the Stage 1 cutover gate. They do not by themselves close Stage 2.
- The assistant could not independently complete the all-routes/assets/desktop-tablet-mobile/browser-console checks in this session. Keep those acceptance checks open rather than recording unsupported PASS results.
- The Premium Services blank-section defect has been corrected on main. Production deployment dpl_F35LCc3pFZ2mXCWWQpUowH1MyV4j (commit 85ae34cc7f988265674b20548758cd036abbf58d) reached READY and is assigned both www.aprioriconsultants.org and aprioriconsultants.org. The fix preserves all five existing cards, their text, images, links, section order and carousel behavior; it adds a responsive fallback while the carousel initializes and removes reveal-only hiding from this section. Vercel reported no runtime error clusters in the last-hour check. Live desktop/tablet/mobile visual confirmation remains pending.
- Render services/database remain billing-suspended and untouched. Backend-dependent functionality remains DEFERRED.
## Stage 3 — Pending website redesign

**PENDING — begins only after Stage 2 passes**

Use `docs/WEBSITE-VISUAL-SYSTEM-AND-REDESIGN-POLICY.md` as the authoritative design and scope specification. The approved direction is **Premium Academic Precision**.

### Phase 1 — Homepage and remaining public pages

The homepage styling implementation already exists in commit `bf7d593ccd62033a11bff128a10f075edcace063`, covering seven homepage CSS modules. The static CSS structure was checked, but live desktop/tablet/mobile acceptance on the restored public domain has not passed. Re-verify the homepage after Stage 2, then continue the remaining Phase 1 pages.

Process one page at a time in the existing order:

1. Homepage.
2. Main-menu pages in current menu order.
3. Submenu pages in existing hierarchy/order.
4. All other pages viewable without successful authentication, including public login/registration entry screens.

For each page, record exact files changed and complete:

- desktop check at 1440 × 900;
- tablet check at 768 × 1024;
- mobile check at 390 × 844;
- content, section order, navigation and existing interactions preserved;
- visual-only diff review and scope-isolation check;
- production build and deployment verification;
- post-deployment public-page check.

Keep the work visual-only: typography, fonts, spacing, alignment, graphics, imagery and visual styling. Do not rewrite content, reorder/add/remove sections, change routes/navigation, functionality, forms, APIs, authentication, business logic or architecture under this authorization.

### Protected redesign boundaries

- **Authenticated-only pages:** excluded from Phase 1. Separate explicit approval is required before Phase 2.
- **Mock-test screen redesign:** excluded from Phase 1 and Phase 2. Each visual batch requires separate explicit approval, may contain at most five mock tests, and must be from one series only.
- Public-page styles must be scoped so changes cannot alter any page/state available only after successful login or any mock-test screen.

Stage 3 is complete only when the authorized public-page redesign sequence and its recorded visual/build/deployment checkpoints pass. Do not begin authenticated-only or mock-test visual redesign without the separate approvals above.

## Stage 4 — Resume mock-test work

**PENDING — begins only after Stage 3**

Resume from the current documented SAT/PSAT state; do not restart completed work or invent a new mock.

- The controlled production corpus remains **30 mocks**: SAT1–SAT10, PSAT1–PSAT10 and SAT11–SAT20.
- SAT21 remains prohibited/not created.
- Batch M remains **NOT RELEASE-ELIGIBLE**.
- The next Batch M release checkpoint remains **Stage 15 — Technical release QC**, followed by Stage 16 final end-to-end student acceptance and Stage 17 final Batch M release acceptance.
- The separate question-bank content roadmap has Step 1 (legacy 30-mock baseline) complete; Step 2 (bulk source intake and deterministic mapping) is its next content-maintenance task. Treat it as part of the resumed mock-test work only after this global Stage 4 gate.
- Preserve the existing human-editable question-bank / canonical runtime-bank contract and all established corpus, originality, figure, math, compatibility, calibration, security and authorization gates.
- Do not repeat completed candidate generation, review, authorization, controlled replacement, corpus re-gating or Stage 14 public inspection.
- Mock-test *visual redesign* remains governed by the separate five-test, same-series approval rule; Stage 4 functional/content/release work does not grant that visual approval.

## Cross-stage operating rules

- This roadmap controls the order of work. If an older document says Render is the current website host, gives an old Render URL as the active test URL, or calls a later-stage task the immediate next action, treat that statement as historical and follow this roadmap.
- The assistant must not edit GoDaddy DNS; the user's manual DNS cutover is complete. Preserve all DNS/email/verification records and do not make further DNS changes. Do not pay for, resume, redeploy or alter Render services/database. Do not change production environment values or authenticated/mock-test functionality outside the stage and approval gates above.
- Keep historical deployment and implementation records for auditability; mark them historical rather than deleting or silently rewriting them.
- Update this roadmap and the relevant detailed source documents when a stage changes state.
- The repository branch and code remain the source of truth for implementation; this roadmap controls the delivery sequence and current handoff.

## October 31, 2026 pre-cutover audit record (historical snapshot)

- Current Vercel project: `apriori-consultants`; Node.js 24.x.
- Latest production deployment: READY — `dpl_CaRn7s5VSsyhJAAWf5yXcvKXgZqD`, commit `5dbc3f0dc6482b731d360e0cad76fa1a4aac1306` on `main`.
- Deployment aliases include both `www.aprioriconsultants.org` and `aprioriconsultants.org`.
- Project domain associations report verified; apex redirect is configured as HTTP 308 to www.
- Vercel deployment protection is enabled with Standard Protection scope `prod_deployment_urls_and_all_previews`; custom production domains remain publicly accessible under this scope.
- Vercel project environment inventory returned `NEXT_PUBLIC_BACKENDURL` targeting `https://aprioribackend.onrender.com`; no `DATABASE_URL` entry appeared in that inventory. Do not change these settings for the frontend-only cutover.
- Connected Render workspace lists `AprioriConsultants` web service and `apriori-consultants-database` as suspended by billing. Do not reactivate/pay or modify them.
- Vercel live DNS detection still shows apex A `216.24.57.1`, and www CNAME `aprioriconsultants.onrender.com` plus A `216.24.57.18` and `216.24.57.16`. Both domains are therefore still misconfigured for Vercel traffic.
- Preferred current Vercel DNS targets: apex A `216.198.79.1` and `64.29.17.1`; www CNAME `cd3ea3f5daa82b89.vercel-dns-017.com`.
- User is authorized to make the GoDaddy DNS cutover while leaving Render backend/database suspended. Preserve all unrelated DNS/email/verification records.
- No code, Vercel setting, environment variable, Render resource, or DNS record was changed in this inspection. Project records are being updated to reflect the frontend-only launch boundary and exact next action.
