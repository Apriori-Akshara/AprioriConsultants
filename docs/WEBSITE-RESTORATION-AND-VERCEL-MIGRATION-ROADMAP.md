# Apriori Website Recovery, Vercel Migration and Delivery Roadmap

**Last updated:** October 31, 2026  
**Status:** Stage 1 — Vercel migration IN PROGRESS; public-domain restoration, redesign and mock-test resumption are gated in sequence.  
**Authority:** This is the single current source of truth for the website-hosting recovery order. It supersedes older statements that describe Render as the current public website host.

## Required project sequence

The work must proceed in this exact order. Do not skip ahead or run later-stage work while an earlier stage remains open.

1. **Vercel migration**
2. **Public website restoration verification**
3. **Pending website redesign**
4. **Resume mock-test work**

The completed state of one stage is the entry condition for the next. A successful build or a deployment marked READY does not, by itself, complete either migration or public restoration.

## Stage 1 — Vercel migration

**IN PROGRESS**

### Completed and verified

- GitHub repository: `Apriori-Akshara/AprioriConsultants`, branch `main`.
- Vercel project: `apriori-consultants`.
- Vercel Node.js project setting: **24.x**.
- Latest production deployment: **READY**.
- Deployment ID: `dpl_EfFcpksrF1eKBAeeJPNCKJvr6Sz3`.
- Source commit: `91e056089490fc54eb2dffe47e760229b62620c8`.
- Build completed successfully. The existing SAT Series B build precheck produced 10 mocks / 1,960 records, and Next.js generated all 39 static pages before deployment completion.
- The production deployment has the aliases `www.aprioriconsultants.org` and `aprioriconsultants.org`; both Vercel project-domain associations report verified. The apex domain is configured to redirect to `www` with HTTP 308.
- The Vercel deployment URL `https://apriori-consultants-1lmrslzp6-aksharas-projects.vercel.app/` returned HTTP 200 when checked through the authenticated Vercel deployment-fetch connection. This confirms the deployed homepage responds; it is not proof that the custom domain is publicly routed or that visual acceptance has passed.

### Remaining migration blockers

**The public domain still resolves to Render, not Vercel.** The GoDaddy DNS nameservers are `ns08.domaincontrol.com` and `ns07.domaincontrol.com`.

Last observed website records:

| Host | Current record pointing to Render | Vercel-reported recommendation |
|---|---|---|
| Apex `@` | A `216.24.57.1` | Preferred IPv4 set: `216.198.79.1` and `64.29.17.1`; alternate: `76.76.21.21` |
| `www` | CNAME `aprioriconsultants.onrender.com` | Preferred CNAME: `cd3ea3f5daa82b89.vercel-dns-017.com`; alternate: `cname.vercel-dns.com` |
| `www` | A `216.24.57.18` and `216.24.57.16` | Remove the old Render A records when the approved cutover is performed; do not leave conflicting A/CNAME records for `www`. |

These values are the Vercel domain-configuration recommendations returned during the October 31 audit. Re-check the live GoDaddy zone and Vercel domain instructions immediately before changing DNS. Do not change nameserver, MX, TXT, email, or unrelated records.

**No DNS records have been changed by this work.** The GoDaddy DNS zone is external to the current Vercel connection.

Additional pre-cutover checks:

1. Confirm Vercel's effective deployment-protection/SSO behavior will not block anonymous visitors to the custom domains. The project currently reports SSO protection enabled for production deployment URLs and all previews; custom-domain visitor behavior has not yet been verified.
2. Check the Vercel environment-variable *names and configuration status* required by server-side routes, authentication, email and database access without exposing secret values.
3. Confirm the target database and any required backend integrations are reachable from the Vercel runtime. A successful static build does not prove database-backed routes or forms work.
4. Confirm the Vercel deployment is still READY and the domain associations remain verified.
5. Only then perform the approved GoDaddy DNS cutover and allow DNS propagation.

### Render status and cost boundary

The Render web service `AprioriConsultants` (`https://aprioriconsultants.onrender.com`) is **suspended by billing**. Its suspended response was confirmed as HTTP 503 with Render's suspension-routing header. Do not pay, resume, redeploy, or change Render as part of this recovery sequence. Public website delivery must not depend on the suspended Render web service.

### Stage 1 completion gate

Stage 1 is complete only when the public DNS records route both custom domains to Vercel, Vercel serves the intended production deployment, public visitors are not blocked by deployment protection, and required runtime configuration has been checked. Until then, report migration as IN PROGRESS.

## Stage 2 — Public website restoration verification

**PENDING — blocked by Stage 1**

After the DNS cutover, verify the live custom domain before any redesign work resumes.

Required checks:

1. `https://www.aprioriconsultants.org/` loads the Vercel production homepage for an ordinary unauthenticated visitor.
2. `https://aprioriconsultants.org/` redirects to `https://www.aprioriconsultants.org/` without passing through Render.
3. Main-menu, submenu and other no-login public routes load directly and through navigation; refresh/deep links work.
4. CSS, JavaScript, images, fonts and other static assets load from the deployed application.
5. Public contact/application forms and other public interactions are checked end-to-end, including their required API/email/database dependencies.
6. Browser console and network checks show no material client-side errors, failed assets or unexpected calls to the suspended Render website service.
7. Public login/registration entry pages render correctly. Authenticated product functionality is not redesigned or functionally reworked under this restoration check; verify only the access boundary and expected route availability.
8. Test desktop, tablet and mobile rendering for the existing public site and record any pre-existing defects separately from restoration blockers.
9. The public domain is checked again after propagation, not just the Vercel deployment URL.

Close Stage 2 only after the public website is reachable and the documented public-route/asset/interaction checks pass. Record failures and fix them before advancing. A homepage HTTP 200 alone is insufficient.

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
- Do not make DNS changes, pay for or resume Render, change production environment values, or alter authenticated/mock-test functionality outside the stage and approval gates above.
- Keep historical deployment and implementation records for auditability; mark them historical rather than deleting or silently rewriting them.
- Update this roadmap and the relevant detailed source documents when a stage changes state.
- The repository branch and code remain the source of truth for implementation; this roadmap controls the delivery sequence and current handoff.

## October 31, 2026 audit record

- Vercel Node.js setting changed to 24.x.
- Production deployment `dpl_EfFcpksrF1eKBAeeJPNCKJvr6Sz3` reached READY on commit `91e056089490fc54eb2dffe47e760229b62620c8`.
- Vercel deployment homepage response: HTTP 200.
- Vercel custom domains: verified and assigned; apex redirects to www.
- GoDaddy DNS still points to Render; public www domain still returned Render suspension HTTP 503.
- Vercel SSO protection remains reported as enabled for production deployment URLs and all previews; effective custom-domain anonymous access still needs verification.
- No GoDaddy DNS, Render billing/service, application source code, authenticated pages or mock-test functionality was changed during this audit.
