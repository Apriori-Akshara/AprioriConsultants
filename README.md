This repository contains the Apriori Consultants Next.js website and test-prep application.

## Current delivery sequence

Follow [docs/WEBSITE-RESTORATION-AND-VERCEL-MIGRATION-ROADMAP.md](docs/WEBSITE-RESTORATION-AND-VERCEL-MIGRATION-ROADMAP.md) as the current delivery authority: **1. Vercel migration → 2. public website restoration verification → 3. pending public website redesign → 4. resume mock-test work.** The Vercel production deployment is READY, but GoDaddy DNS still routes the public domain to the suspended Render service. Do not treat the website as restored until the DNS, public-access, runtime and public-route checks in that roadmap pass.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Production hosting

Vercel is the intended production host for the Next.js website. The October 31, 2026 Vercel production deployment is READY; custom-domain DNS cutover and public restoration verification remain pending. Render is suspended and is not the current public website host. Follow the recovery roadmap before changing DNS or resuming later work.

For framework deployment details, see the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## Website Visual System

The primary design direction, visual-only scope, redesign sequence, and approval gates are documented in [docs/WEBSITE-VISUAL-SYSTEM-AND-REDESIGN-POLICY.md](docs/WEBSITE-VISUAL-SYSTEM-AND-REDESIGN-POLICY.md).

That policy is authoritative for future website visual redesign work. In particular, public pages are redesigned first, page by page, only after approval to begin Phase 1; authenticated-only pages require separate approval; and mock-test screens require explicit approval for each batch of up to five tests within a single series. Visual changes must not alter content, functionality, navigation, architecture, or section order without separate approval.

