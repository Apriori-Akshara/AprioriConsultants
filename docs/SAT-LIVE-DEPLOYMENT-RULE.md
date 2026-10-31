# Public Website Deployment and Verification Rule

**Last updated:** October 31, 2026  
**Current frontend host:** Vercel — DNS CUTOVER COMPLETE; public restoration verification in progress  
**Backend/database:** Render — intentionally left billing-suspended until the user chooses to reactivate them

This is the permanent deployment and student-facing verification rule. The current recovery order and frontend-only launch exception are governed by `docs/WEBSITE-RESTORATION-AND-VERCEL-MIGRATION-ROADMAP.md`.

## 1. Hosting authority

- Vercel project: `apriori-consultants`, Node.js 24.x.
- Latest production deployment before the Premium Services correction: READY — `dpl_CebMmuTcsfnJ2kSUhLoPXwX5jLx6`, commit `4a100442353638dfc40b0cbea256c56904f10912` on `main`.
- Intended public website: `https://www.aprioriconsultants.org`; apex `https://aprioriconsultants.org` redirects to www with HTTP 308.
- Both Vercel project-domain associations report verified and are assigned as deployment aliases.
- The user completed the GoDaddy DNS cutover. Vercel reports misconfigured=false and no conflicts for both domains: www uses CNAME cd3ea3f5daa82b89.vercel-dns-017.com; the apex uses A 216.198.79.1 and A 64.29.17.1.
- Render `AprioriConsultants` web service and `apriori-consultants-database` PostgreSQL instance are billing-suspended. They must not be paid for, resumed, redeployed or modified as part of this frontend-only launch.

## 2. Approved frontend-only public launch

The user has explicitly authorized public visibility of the Vercel frontend while the Render backend/database remain suspended. This does not authorize a full-stack migration or a claim that backend-dependent features work.

Vercel currently reports Vercel Authentication scope `prod_deployment_urls_and_all_previews` (Standard Protection). This protects generated deployment URLs and previews but does not protect the actual custom production domains. Keep this setting; do not weaken it or switch to All Deployments.

Source inspection confirms the homepage and representative public content routes are rendered by frontend components. The navigation's first-party `/api/auth/session` request is guarded: the API handler catches database errors and returns `authenticated: false`, allowing public content to render without a working database.

The Vercel environment-variable inventory currently shows `NEXT_PUBLIC_BACKENDURL` set to `https://aprioribackend.onrender.com`; no `DATABASE_URL` entry appeared in the returned inventory. The database helper requires `DATABASE_URL`. This is acceptable for static public content, but PostgreSQL-backed API functionality is not available. The connected Render workspace did not list a service matching the `aprioribackend.onrender.com` hostname; its status remains unverified.

## 3. Public-site acceptance — frontend scope

Following the completed user DNS cutover, verify:

- `https://www.aprioriconsultants.org/` loads the intended Vercel production homepage for an ordinary unauthenticated visitor.
- The apex domain redirects to www without routing through Render.
- Public main-menu/submenu content routes and deep links render on direct navigation and refresh.
- Stylesheets, JavaScript, images, fonts and the Contact map embed load.
- Client-side navigation and responsive layout work across desktop, tablet and mobile.
- No public content page depends on the suspended Render website service or crashes because the database is unavailable.
- Record material browser console/network errors and separate pre-existing defects from restoration blockers.

The public frontend may be accepted while backend services are suspended. Report the launch as **frontend restored; backend-dependent features deferred**, never as a fully restored application.

## 4. Explicitly deferred backend-dependent functionality

Until the user chooses to reactivate Render and the required runtime configuration is verified, do not report these as operational:

- login, registration, email verification, password reset and session-backed account state;
- PostgreSQL-backed APIs, student/profile records, admin functions and other database operations;
- payment, entitlement, SAT/PSAT mock-test, progress and result workflows;
- email delivery or any feature that requires a suspended/unavailable backend.

The homepage Apply controls, Contact Message form and footer newsletter controls currently have no submission handlers in the inspected source. They are not functional merely because the frontend becomes public. Their implementation and end-to-end verification are separate follow-up work, even after Render is reactivated.

Do not weaken authentication, authorization, subscription or student-data safeguards to make the frontend-only launch appear functional. Do not fake successful submissions or substitute local/mock student data.

## 5. Reactivation boundary

When the user later decides to pay and reactivate Render, treat backend restoration as a separate authorized task:

1. Confirm the correct Render backend service and PostgreSQL resources; the configured `aprioribackend.onrender.com` hostname was not present in the currently connected Render service inventory.
2. Confirm database availability and backups/migrations before connecting application traffic.
3. Configure the required Vercel server-side environment variables (including the database connection) without exposing secrets.
4. Verify authentication, API, email and student workflows end-to-end against the restored services.

Do not perform any of these steps now.

## 6. Current audit — October 31, 2026

- Latest Vercel production deployment is READY and aliases both custom domains.
- Both Vercel domain associations are verified; apex redirect is configured.
- Vercel Standard Protection scope is `prod_deployment_urls_and_all_previews`; custom production domains are not gated by this setting.
- Vercel currently detects apex A `216.24.57.1`; www CNAME `aprioriconsultants.onrender.com` and A `216.24.57.18`, `216.24.57.16`. Both DNS configurations are marked misconfigured for Vercel.
- Preferred Vercel records are apex A `216.198.79.1` and `64.29.17.1`; www CNAME `cd3ea3f5daa82b89.vercel-dns-017.com`.
- Render website service and PostgreSQL database are suspended by billing, by user choice.
- No DNS, Vercel settings, environment variables, Render resources or application code were changed in this audit.

## October 31, 2026 — Current public restoration checkpoint

Vercel confirms both public domains are verified, correctly configured and assigned to the project; the apex redirect to www is HTTP 308. The user reports the homepage is back online. Stage 2 remains in progress until public routes, assets, navigation, responsive layouts and browser-console checks are completed.

The Premium Services blank-section defect is being corrected on the homepage only. The fix is scoped to components/Home/Ourcourses.js, components/Home/CoursesSlider.js and src/styles/home/ourcourses.module.css; production promotion and final public visual confirmation are pending. Backend/database services remain suspended and unchanged.
