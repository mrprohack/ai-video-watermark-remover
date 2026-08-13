# SEO Growth Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn ClearFrame from a single-page MVP into a focused, crawlable, conversion-oriented AI video cleanup website with strong technical SEO and a small set of genuinely distinct high-intent landing pages.

**Architecture:** Keep the interactive cleanup studio on the homepage and add reusable SEO page primitives for focused use cases. Every indexable route gets unique metadata, unique visible copy, a clear user job, internal links, and shared SoftwareApplication structured data. The sitemap is generated from one canonical route registry so metadata, navigation, and crawl discovery stay consistent.

**Tech Stack:** Next.js 16.3 App Router, React 19, TypeScript, CSS, Vitest, Playwright.

## Global Constraints

- Keep responsible-use positioning: content must be owned or authorized for modification.
- Do not create stock-agency watermark bypass pages or language encouraging infringement.
- Do not create thin keyword-swapped doorway pages.
- Structured data must match visible page content.
- Keep current security headers, MIME validation, deterministic `npm ci`, and read-only CI permissions.
- No paid AI provider, authentication, storage, or billing integration in this milestone.
- Preserve the current visual design system and interactive studio workflow.

---

### Task 1: SEO route registry and metadata helpers

**Files:**
- Create: `src/lib/seo-pages.ts`
- Create: `src/lib/structured-data.ts`
- Test: `tests/seo-pages.test.ts`

**Interfaces:**
- Produces: `SEO_PAGES`, `SeoPageDefinition`, `softwareApplicationJsonLd()`.

- [ ] Write tests requiring unique slugs, titles, descriptions, H1s, intents, and canonical paths.
- [ ] Run tests and verify they fail before implementation.
- [ ] Implement the route registry and SoftwareApplication JSON-LD helper.
- [ ] Run tests and verify they pass.

### Task 2: Focused landing-page template and four high-intent routes

**Files:**
- Create: `src/components/seo-tool-page.tsx`
- Create: `src/app/video-watermark-remover/page.tsx`
- Create: `src/app/remove-logo-from-video/page.tsx`
- Create: `src/app/remove-text-from-video/page.tsx`
- Create: `src/app/remove-date-stamp-from-video/page.tsx`
- Modify: `src/app/globals.css`
- Test: `e2e/seo-pages.spec.ts`

**Interfaces:**
- Consumes: `SEO_PAGES`, `softwareApplicationJsonLd()`.
- Produces: four crawlable pages with distinct titles, H1s, explanations, FAQs, limitations, responsible-use language, and links back to the studio.

- [ ] Add failing browser tests for route status, title, meta description, canonical, H1, internal CTA, and JSON-LD.
- [ ] Run the browser suite and confirm 404/failure on new routes.
- [ ] Implement reusable page template and four distinct routes.
- [ ] Add responsive styles without introducing a second visual system.
- [ ] Run browser tests and fix until green.

### Task 3: Homepage search-intent and internal-link upgrade

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Modify: `e2e/home.spec.ts`

**Interfaces:**
- Consumes: SEO route registry.
- Produces: stronger primary keyword targeting, crawlable internal links, WebApplication JSON-LD, and clearer differentiation between current and planned capabilities.

- [ ] Add failing assertions for homepage title/description, JSON-LD, and tool-page internal links.
- [ ] Update hero/supporting copy to lead with “AI Video Watermark Remover” while preserving authorized-use framing.
- [ ] Add a compact use-case link section pointing to distinct landing pages.
- [ ] Add visible trust/limitations copy so structured data and marketing claims remain truthful.
- [ ] Run unit and browser tests until green.

### Task 4: Sitemap, robots, and crawl consistency

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `e2e/home.spec.ts`
- Test: `tests/seo-pages.test.ts`

**Interfaces:**
- Consumes: SEO route registry.
- Produces: sitemap entries for every indexable page with one canonical origin.

- [ ] Add failing tests requiring all route registry paths in sitemap output.
- [ ] Generate sitemap entries from route registry.
- [ ] Verify robots continues to expose the sitemap and all routes are crawlable.

### Task 5: Content quality and anti-doorway safeguards

**Files:**
- Modify: `tests/seo-pages.test.ts`
- Modify: `README.md`

**Interfaces:**
- Produces: automated uniqueness safeguards and documented SEO principles.

- [ ] Add tests that fail if page H1/title/summary bodies are duplicated or too short to be meaningful.
- [ ] Document why the project intentionally limits the first SEO cluster to genuinely different user jobs.
- [ ] Run tests and fix any weak page definition.

### Task 6: Full production verification and PR

**Files:**
- Modify only if verification finds defects.

- [ ] Run `npm ci`.
- [ ] Run `npm audit --omit=dev --audit-level=high`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Run the complete Playwright suite on desktop and mobile.
- [ ] Review generated screenshots for clipping, weak hierarchy, broken links, and visual regressions.
- [ ] Compare `main...feat/seo-growth-pages` for unintended changes.
- [ ] Push final commits and open a PR without merging it.
