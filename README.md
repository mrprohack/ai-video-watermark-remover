# ClearFrame — AI Video Watermark Remover

A production-oriented AI video cleanup SaaS for preparing authorized watermark, logo, text, and timestamp cleanup workflows.

## Current milestone

The project now includes the hardened product MVP plus a focused SEO growth layer:

- Next.js 16 App Router foundation
- responsive homepage with interactive upload and video-preview studio
- MP4/MOV/WebM client validation with MIME/extension consistency checks
- 100 MB / 60-second MVP limits
- transparent usage estimation and explicit job states
- ownership/authorization confirmation
- canonical metadata, `robots.txt`, and a route-driven `sitemap.xml`
- `WebApplication` and breadcrumb structured data that matches visible page content
- four distinct high-intent landing pages for watermark, logo, text, and date-stamp cleanup
- crawlable internal links between the homepage and focused use-case pages
- browser security headers and CSP
- accessible selected/progress state semantics
- deterministic npm lockfile and read-only, SHA-pinned GitHub Actions CI
- unit tests and desktop/mobile Playwright coverage

The processing UI currently uses a deterministic demo state and **does not call a paid AI provider yet**. Provider integration, private object storage, authentication, credit ledger, and Stripe billing remain separate milestones.

## SEO architecture

The first search cluster is intentionally small and utility-focused:

- `/video-watermark-remover`
- `/remove-logo-from-video`
- `/remove-text-from-video`
- `/remove-date-stamp-from-video`

Each page has a different user job, title, description, H1, explanatory content, quality limitations, FAQ content, responsible-use language, and related internal links. The project deliberately avoids mass-producing keyword-swapped or city/platform variants that would add little value and risk becoming doorway or scaled-content pages.

The route registry in `src/lib/seo-pages.ts` is the source of truth for these pages and sitemap entries. Tests enforce unique metadata and substantial page definitions before more routes are added.

## Local development

Install exactly the dependency graph committed in `package-lock.json`:

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

### Public site URL

Set `NEXT_PUBLIC_SITE_URL` to the canonical public origin when deploying outside Vercel:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

Only `http:` and `https:` URLs are accepted. On Vercel, `VERCEL_PROJECT_PRODUCTION_URL` is used automatically when an explicit site URL is not supplied. Local development falls back to `http://localhost:3000`.

## Verification

```bash
npm audit --omit=dev --audit-level=high
npm run typecheck
npm test
npm run build
npm run e2e
```

The browser suite verifies homepage and focused-page metadata, canonical URLs, structured data, sitemap discovery, internal links, security headers, core studio semantics, and mobile overflow.

## Project docs

- `docs/superpowers/specs/2026-08-13-video-cleanup-mvp-design.md`
- `docs/superpowers/plans/2026-08-13-video-cleanup-mvp.md`
- `docs/superpowers/plans/2026-08-13-seo-growth-architecture.md`
- `docs/security/threat-model.md`
- `SECURITY.md`

## Security boundary

The current MVP keeps selected video data in the browser and does not send it to an application server, object store, or AI provider. Client-side file checks are usability checks, not a substitute for the server-side media inspection required before remote processing is enabled.

See `docs/security/threat-model.md` for the required controls around private storage, authorization, server-side media validation, SSRF prevention, cost controls, idempotency, webhooks, secrets, and media retention.

## Responsible use

This project is designed for videos the user owns or has permission to modify. Do not use it to evade copyright restrictions or remove rights-management information without authorization.
