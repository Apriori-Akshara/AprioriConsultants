# Primary Website Visual System and Redesign Policy

**Last updated:** October 31, 2026  
**Status:** Premium Academic Precision visual system approved; Vercel DNS cutover is complete; public restoration verification remains in progress. The focused Premium Services visibility correction is restoration defect remediation, not completion of the broader homepage redesign.  
**Authority:** Primary reference for the visual redesign of the Apriori Consultants website

This document records the approved visual direction, strict scope boundaries, approval gates, and page-by-page sequence for the website redesign. It applies to the public website and later, separately authorized authenticated pages and mock-test screens. The operational order is controlled by [docs/WEBSITE-RESTORATION-AND-VERCEL-MIGRATION-ROADMAP.md](WEBSITE-RESTORATION-AND-VERCEL-MIGRATION-ROADMAP.md): Vercel migration, public restoration verification, public-page redesign, then resumed mock-test work. Do not start redesign implementation until Stages 1 and 2 of that roadmap have passed.

**Approval of this visual system is not blanket permission to start every redesign phase.** Each phase or mock-test batch must have the explicit authorization described below. Until the relevant authorization is given, do not change code or page styling in that scope.

## 1. Primary visual direction: Premium Academic Precision

Apriori should look like a premium, high-end EdTech platform through academic credibility, disciplined typography, precise educational visuals, generous whitespace, and consistent alignment—not through excessive decoration or by copying a competitor.

The design must feel like one coherent Apriori system across the website. Public marketing pages may be more expressive; authenticated product pages may be more restrained; mock-test screens should remain exam-focused. Any later visual differences must still belong to the same design language.

### Reference principles

Use these public examples as inspiration for principles, not as templates to copy:

- [Blueprint Prep](https://blueprintprep.com/): confident presentation and purposeful educational storytelling.
- [UWorld SAT](https://collegeprep.uworld.com/sat/): precise, readable educational diagrams and structured visual explanations.
- [SAT Sphere](https://www.satsphere.com/): contemporary restraint, generous space, and selectively used graphic motifs.
- [OnePrep](https://www.oneprep.com/): clean product presentation, clear typography, and restrained surfaces.
- [Blueprep](https://blueprep.com/): quiet, legible test-interface presentation as a future reference only, after mock-test redesign is separately authorized.

Do not copy competitor content, imagery, illustrations, brand assets, or distinctive branded styling. All visuals must remain appropriate to Apriori's existing identity.

## 2. Core design rules

### 2.1 Color

- Preserve Apriori's existing brand identity and established brand colors.
- Use white and light neutral surfaces as the primary foundation, with deep ink/near-black text and readable muted secondary text.
- Use the existing brand accent consistently and selectively; use pale tints for subtle supporting surfaces.
- Keep borders restrained and low-contrast where appropriate.
- Avoid introducing multiple unrelated accent colors or using gradients throughout the site. Gradients and background motifs are optional, rare decorative treatments—not a new brand palette.

Do not choose exact color values until the existing site's current tokens and styles have been inspected.

### 2.2 Typography

- Establish one consistent typographic hierarchy for page titles, section headings, subsection headings, body copy, labels, and metadata.
- Use readable, appropriately weighted headings and body text; avoid thin text, excessive letter spacing, and unnecessary all-caps copy.
- Prefer the current brand typeface if it is suitable and already applied consistently. If a change is justified, use no more than two complementary font families. Manrope for headings and Inter for body/interface text are candidate options, not a mandate; inspect existing font loading and brand usage before selecting.
- As a starting range for public-page typography, use desktop page titles around 48–56 px, mobile page titles around 34–40 px, section headings around 32–38 px, subsection headings around 22–26 px, and body text around 16–18 px. Adapt responsibly to the existing design and content without rewriting it.
- Maintain comfortable body-text line spacing, generally around 1.5–1.65 where suitable.
- Where mathematical expressions already appear on a page, retain accurate mathematical notation and consistent baselines. This policy does not authorize rewriting question content or changing mock-test screens.

### 2.3 Spacing, alignment, and layout consistency

Use a repeatable spacing scale based on values such as 4, 8, 12, 16, 24, 32, 48, 64, and 80 px. Exact values should be adapted to the existing application and viewport.

- Keep page content aligned to a consistent grid and sensible maximum widths.
- Align headings, text, images, cards, and their edges deliberately.
- Apply consistent gaps between labels, text groups, cards, and major sections.
- Keep card padding and repeated component proportions consistent.
- Use responsive gutters and typography at desktop, tablet, and mobile sizes.
- Preserve the current order, grouping, meaning, and purpose of page sections. Spacing and alignment may be refined; moving, reordering, adding, or removing sections requires separate approval.

### 2.4 Cards, borders, controls, and surfaces

- Prefer clear surfaces, subtle borders, generous internal padding, and minimal shadows.
- Keep corner radii, border weights, control heights, type weights, and existing state styling consistent.
- Do not put every element inside a card. Use whitespace and alignment to establish hierarchy.
- Do not change what any button, form, link, control, or other interactive element does.

### 2.5 Graphics, imagery, and icons

- Favor crisp, technically accurate educational graphics and consistent drawing conventions.
- Keep charts, figures, tables, labels, annotations, and axis treatments clean and readable.
- Use consistent icon families, sizes, and stroke weights.
- Use high-quality, coherently cropped imagery only where imagery is already appropriate to the existing page.
- Avoid mixing unrelated stock-photo treatments, clip art, emojis, 3D decorations, and inconsistent illustration styles.
- Any new decorative graphic must support the existing presentation; it must not suggest a new product feature or replace existing content.

### 2.6 Visual effects and responsiveness

- Use gradients, subtle textures, hover effects, and transitions sparingly and purposefully.
- Avoid distracting animation, especially in learning or testing contexts.
- Maintain legibility, contrast, consistent spacing, and good wrapping at mobile, tablet, and desktop widths.
- Do not introduce visual changes that alter a component's behavior or the meaning of any visible status.

## 3. Non-negotiable scope boundary

The authorized redesign scope is restricted to **graphics, visuals, imagery, typography, fonts, spacing, alignment, and visual styling**.

The following must be preserved unless the user gives separate, explicit approval for the specific proposed change:

- all page copy and other content;
- all questions, answer options, explanations, reports, data, and educational meaning;
- all existing pages, routes, navigation destinations, page purposes, and section order;
- all features, functionality, actions, forms, interactions, and responsive behavior beyond purely visual presentation;
- authentication, account access, subscriptions, entitlements, test rules, calculators, scoring, reporting, and other product/business logic.

Architecture, navigation, content, and rearrangement or regrouping of existing sections may be **suggested separately**. Suggestions are not authorization: do not implement them without explicit user approval.

### Scope isolation requirement

During public-page work, visual changes must not leak into authenticated-only pages or mock-test screens. Do not make unscoped global CSS, font, token, or shared-component changes that cause those protected pages to change inadvertently. Prefer public-page-scoped styles or verify carefully that any shared change has no visual effect outside the currently authorized pages. If the scope cannot be safely isolated, stop and document the issue rather than allowing unintended changes.

## 4. Mandatory redesign sequence and approval gates

Work strictly in the phases below. Approval for one phase never authorizes the next phase. Do not infer permission from this document's existence or from approval of the design direction.

### Phase 1 — Homepage and all other public pages

**Entry gate:** one explicit user approval to begin the public-page redesign.

Once this phase has been authorized, no separate explicit approval is required for each individual public page. Process the pages **one page at a time** in the order below:

1. **Landing page/homepage first.**
2. **Each main-menu page**, following the order in which the main menu currently presents those pages.
3. **Each submenu page**, following the existing menu hierarchy and order.
4. **All remaining public pages** that can be viewed without a successfully authenticated session, including public login/registration-related screens where those routes are available before login.

Preserve current page and section order; the scope is a visual refresh, not a structural redesign. Keep a clear record of each page completed and the exact files changed.

The user may conduct human review after the work or in batches, as directed. Do not require per-page approval during this authorized phase, and do not assume a review schedule that the user has not requested.

**Hard exclusions during Phase 1:** do not change the visual design, styling, shared appearance, or layout of any page/state that is available only after successful login. Do not change mock-test screens. The phase must be implemented so public-page changes do not alter them indirectly.

### Phase 2 — Pages available only after login

**Entry gate:** after Phase 1 is completed, obtain separate, explicit user approval before beginning Phase 2.

Then process the existing authenticated-only pages one page at a time, using the same visual system and strict visual-only scope. Preserve all content, page/section ordering, navigation, access rules, functionality, data, and behavior. Approval for Phase 1 does not authorize Phase 2.

### Phase 3 — Mock-test screens

Mock-test screens are excluded from Phases 1 and 2 unless a later rule explicitly brings them into scope.

**Entry gate and batch approvals:** each separately authorized batch may contain a maximum of **five mock tests from one series**. Obtain explicit user approval for every batch. Approval for one batch does not authorize the next batch or any other series. Do not combine mock tests from different series into one approval batch.

Examples of separate approval batches are:

- SAT Series A Mocks 1–5, then SAT Series A Mocks 6–10;
- PSAT Mocks 1–5, then PSAT Mocks 6–10;
- SAT Series B Mocks 11–15, then SAT Series B Mocks 16–20.

Within an approved batch, process mock tests one at a time. Apply the visual system only to the authorized tests. Preserve all question content, answer choices, explanations, test behavior, timing, navigation, calculators, adaptive logic, accessibility semantics, scoring, reports, data, and functionality. Do not let shared-style changes visually alter mock tests outside the approved batch.

No mock-test visual or design changes are permitted before the relevant batch has been explicitly authorized.

## 5. Implementation and verification protocol

When a phase or batch is authorized:

1. Inspect the existing page and its styles before editing; confirm whether it is public, authenticated-only, or a mock-test screen.
2. Confirm the exact page boundary and the current menu order before work begins.
3. Make visual changes to one page at a time and keep styles/components scoped to the authorized page group.
4. Do not alter copy, content, page/section ordering, functionality, navigation, architecture, or business logic under the visual-design authorization.
5. Check desktop, tablet, and mobile presentation, including typography wrapping, spacing, alignment, image cropping, and component consistency.
6. Review the diff to confirm the change is visual-only and has not touched protected pages or unapproved shared styling.
7. Record the page or mock identifier, files changed, visual checks performed, and any unresolved issues. Provide a compact progress report that distinguishes completed pages from pages merely proposed or inspected.
8. Follow the user's instruction on whether human review is page-by-page, after a phase, or in batches. Do not introduce an additional approval gate where this document explicitly says one is not required; do respect every phase and mock-batch gate.

No production deployment is implied by this documentation. Deployment must follow the project's normal release process and whatever authorization is applicable at that time.


### Homepage URL and visual acceptance criteria (Phase 1)

**Expected public homepage:** https://www.aprioriconsultants.org/ (Vercel production domain; DNS cutover complete; Stage 2 public restoration verification remains in progress).  
**Production deployment URL containing the Premium Services correction:** https://apriori-consultants-1xtfaetq1-aksharas-projects.vercel.app/  
**Historical Render URL:** https://aprioriconsultants.onrender.com/ (billing-suspended; not a verification target).

The following criteria apply to the homepage redesign and must be checked before marking this page complete:

- **Typography:** coherent page/section/subsection hierarchy; headings and body copy remain readable and unclipped; body text uses comfortable line spacing; no copy is rewritten.
- **Color:** established Apriori navy and red accents are retained; light neutral surfaces and deep-ink text dominate; no unrelated accent palette is introduced.
- **Spacing and alignment:** content follows a consistent grid and spacing scale; section edges, card padding, image edges, and form controls align deliberately.
- **Surfaces and controls:** borders, radii, and shadows are restrained and consistent; existing buttons, form fields, links, and controls retain their actions and state behavior.
- **Graphics and imagery:** existing images and icons remain present, keep their meaning, and crop cleanly without distortion; no new product feature is implied.
- **Desktop check (target viewport 1440 × 900):** content stays within its intended width, navigation and headings do not collide, and sections retain visual balance.
- **Tablet check (target viewport 768 × 1024):** columns, cards, forms, and imagery adapt without overlap, clipping, or cramped text.
- **Mobile check (target viewport 390 × 844):** no unintended horizontal page scrolling; all existing content and controls remain visible and legible, with natural text wrapping.
- **Content and behavior:** all copy, images, links, navigation destinations, form fields, interactive behavior, and original section order are preserved.
- **Scope isolation:** only homepage-specific component styles may change; no global stylesheet, shared navigation styling, authenticated-only page, or mock-test screen may receive an unintended visual change.
- **Build and release:** the production build passes, the final diff contains only authorized visual and documentation changes, and the public homepage is checked after deployment.

Acceptance is not declared until the responsive checks, diff review, build, and deployment status have been recorded. If a browser viewport cannot be directly tested, record that limitation instead of claiming the check passed.

## 6. Current recorded status — October 31, 2026

- **Visual direction:** Premium Academic Precision is approved as the primary design reference.
- **Operational gate:** Vercel migration/DNS cutover is complete. Finish Stage 2 public website restoration verification, as defined in `docs/WEBSITE-RESTORATION-AND-VERCEL-MIGRATION-ROADMAP.md`, before continuing the broader Phase 1 redesign.
- **Homepage:** the homepage styling implementation exists in commit `bf7d593ccd62033a11bff128a10f075edcace063`. It changed seven homepage component CSS modules and did not change page-component logic or global/shared styles.
- **Homepage verification:** the earlier seven CSS modules passed the recorded structural CSS check. The user has since completed DNS cutover and Vercel confirms both custom domains correctly configured; the Premium Services correction is deployed to production and the deployment reached READY. Desktop/tablet/mobile visual acceptance and full public-route/browser-console verification have not been independently completed in this session and therefore remain **PENDING**. Do not mark the homepage or Stage 2 visually accepted yet.
- **Remaining public pages:** the main-menu pages, submenu pages and other pages viewable without successful authentication remain pending Phase 1, in the exact menu/hierarchy sequence in Section 4. Process one page at a time after Stage 2 passes.
- **Phase 1 scope:** public unauthenticated pages only. Preserve content, page/section order, routes, navigation, functionality and behavior. Do not change any page/state available only after successful login, and do not change mock-test screens.
- **Authenticated-only pages:** protected from Phase 1; Phase 2 requires separate explicit user approval after Phase 1 is complete.
- **Mock-test screen redesign:** Phase 3 requires separate explicit approval for each batch of at most five mock tests from one series.
- **Architecture, navigation, content or section reordering:** suggestions may be recorded separately; implementation requires additional explicit approval.

This policy remains the primary reference for visual-design work. The recovery roadmap controls when the policy may be acted upon.

## 7. October 31, 2026 — Premium Services visibility restoration correction

This is a focused defect correction to restore an existing homepage section during Stage 2; it does not declare the homepage redesign or Phase 1 complete.

- **Affected section:** homepage Our Premium Services, between Why Choose Us and Testimonials.
- **Files:** `components/Home/Ourcourses.js`, `components/Home/CoursesSlider.js`, `src/styles/home/ourcourses.module.css`.
- **Problem:** the service-card carousel relies on client-side initialization; the shared Slick stylesheet hides slides until initialization and defines a fixed slider-track height. Reveal wrappers can also leave heading/card text hidden before the animation becomes visible.
- **Correction:** render the section heading directly; preserve all existing service-card text, images, links and order; show a responsive three/two/one-column fallback until the carousel reports initialization; then retain the original three-slide autoplay carousel and existing responsive behavior. Remove reveal-only hiding within this section and scope track/slide sizing to this component's CSS module.
- **Design alignment:** retain Apriori navy/red accents, light card surfaces, restrained borders/shadows, readable typography, consistent spacing and responsive gutters. No copy, image, route, interaction purpose or section order is changed.
- **Isolation:** no global/shared stylesheet, navigation, authenticated-only page, login-only state, mock-test screen, API, backend or business logic is changed.
- **Production code deployment:** commit `85ae34cc7f988265674b20548758cd036abbf58d` on `main`; Vercel deployment `dpl_F35LCc3pFZ2mXCWWQpUowH1MyV4j` reached READY and includes both custom-domain aliases. Live desktop/tablet/mobile visual acceptance remains pending.
- **Gate:** the broader homepage redesign and remaining public-page redesign sequence remain gated behind completion of Stage 2 and the approvals/sequence in Section 4.
