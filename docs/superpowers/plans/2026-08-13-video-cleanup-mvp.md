# Video Cleanup MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify the first deployable frontend/product slice for the AI video cleanup SaaS.

**Architecture:** Next.js 16 App Router hosts SEO content and an interactive client studio. Pure TypeScript modules own validation, credit estimation, and job-state rules so they can later be reused by server routes and provider workers.

**Tech Stack:** Next.js 16.2.9, React 19.2, TypeScript 5.9, Vitest 3.2, GitHub Actions.

## Global Constraints

- Videos must be user-owned or authorized to modify.
- MVP accepts MP4, MOV, and WebM up to 100 MB and 60 seconds.
- Do not integrate paid AI or billing until the UI and business rules pass CI.
- Keep provider-specific logic out of UI components.

---

### Task 1: Foundation and business rules

- [x] Add Next.js/TypeScript project configuration.
- [x] Add tests for file validation, credit estimation, and job-state transitions.
- [x] Add the minimal implementations required by those tests.
- [x] Add CI gates for typecheck, unit tests, and production build.

### Task 2: Marketing page and cleanup studio

- [ ] Build responsive marketing layout and product positioning.
- [ ] Build upload/drop interaction and video metadata validation.
- [ ] Build cost controls and ownership confirmation.
- [ ] Build processing and completion states.

### Task 3: Verify and iterate

- [ ] Run CI.
- [ ] Read failing job logs if any.
- [ ] Fix failures and rerun until all required checks pass.
- [ ] Open a pull request to `main` after verification.
