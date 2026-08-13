# ClearFrame — AI Video Watermark Remover

A production-oriented AI video cleanup SaaS for removing unwanted overlays from videos users own or are authorized to edit.

## Current milestone

The `feat/mvp-video-cleanup` branch contains the hardened first product slice:

- Next.js 16 App Router foundation
- responsive SEO-first landing page
- interactive upload and video-preview studio
- MP4/MOV/WebM client validation with MIME/extension consistency checks
- 100 MB / 60-second MVP limits
- transparent credit estimation
- explicit job-state workflow
- ownership/authorization confirmation
- canonical metadata, `robots.txt`, and `sitemap.xml`
- browser security headers and CSP
- accessible selected/progress state semantics
- deterministic npm lockfile and read-only, SHA-pinned GitHub Actions CI
- unit tests and desktop/mobile Playwright coverage

The processing UI currently uses a deterministic demo state and **does not call a paid AI provider yet**. Provider integration, private object storage, authentication, credit ledger, and Stripe billing are subsequent milestones.

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

The GitHub Actions workflow runs the same gates with read-only repository permissions and immutable action SHAs.

## Project docs

- `docs/superpowers/specs/2026-08-13-video-cleanup-mvp-design.md`
- `docs/superpowers/plans/2026-08-13-video-cleanup-mvp.md`
- `docs/security/threat-model.md`
- `SECURITY.md`

## Security boundary

The current MVP keeps selected video data in the browser and does not send it to an application server, object store, or AI provider. Client-side file checks are usability checks, not a substitute for the server-side media inspection required before remote processing is enabled.

See `docs/security/threat-model.md` for the required controls around private storage, authorization, server-side media validation, SSRF prevention, cost controls, idempotency, webhooks, secrets, and media retention.

## Responsible use

This project is designed for videos the user owns or has permission to modify. Do not use it to evade copyright restrictions or remove rights-management information without authorization.
