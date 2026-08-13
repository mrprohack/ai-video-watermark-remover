# ClearFrame — AI Video Watermark Remover

A production-oriented AI video cleanup SaaS for removing unwanted overlays from videos users own or are authorized to edit.

## Current milestone

The `feat/mvp-video-cleanup` branch contains the first verified product slice:

- Next.js 16 App Router foundation
- responsive SEO-first landing page
- interactive upload and video-preview studio
- MP4/MOV/WebM validation
- 100 MB / 60-second MVP limits
- transparent credit estimation
- explicit job-state workflow
- ownership/authorization confirmation
- unit tests and GitHub Actions CI

The processing UI currently uses a deterministic demo state and **does not call a paid AI provider yet**. Provider integration, private R2 storage, authentication, credits ledger, and Stripe billing are subsequent milestones.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run typecheck
npm test
npm run build
```

## Project docs

- `docs/superpowers/specs/2026-08-13-video-cleanup-mvp-design.md`
- `docs/superpowers/plans/2026-08-13-video-cleanup-mvp.md`

## Responsible use

This project is designed for videos the user owns or has permission to modify. Do not use it to evade copyright restrictions or remove rights-management information without authorization.
