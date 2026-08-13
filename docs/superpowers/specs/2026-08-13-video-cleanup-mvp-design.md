# Video Cleanup MVP Design

## Goal

Ship a trustworthy, responsive AI video-cleanup SaaS shell whose first acquisition tool is video watermark removal for videos the user owns or is authorized to modify.

## MVP scope

- Public SEO-first landing page with the working uploader above the fold.
- Client-side MP4/MOV/WebM validation, 100 MB limit, and 60-second MVP duration limit.
- Clear ownership/authorization confirmation before processing.
- Auto Clean and Standard/High quality controls.
- Transparent credit estimate before processing.
- Explicit job states: ready, queued, processing, completed, failed.
- Result state with before/after comparison shell and download action.
- No real removal provider or payments in this slice; those are isolated behind later provider and billing tasks.

## Visual direction

Marketing uses true white, ink typography, cobalt accents, thin cool-gray borders, generous whitespace, and large video-led surfaces. The cleanup studio uses dark graphite video chrome inside the otherwise light product page. Avoid generic neon AI gradients, decorative badges, or fake metrics.

## Architecture

Next.js 16 App Router renders server-owned marketing content and a focused client component for upload/playback state. Business rules live in small framework-independent modules under `src/lib`, tested with Vitest. Future AI providers must sit behind a provider interface rather than being called directly from UI components.

## Safety and trust

The UI requires users to confirm they own the video or have permission to modify it. Temporary-file deletion and private object storage are requirements for the provider/storage phase.
