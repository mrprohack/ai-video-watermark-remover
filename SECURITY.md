# Security Policy

## Reporting a vulnerability

Please report suspected vulnerabilities privately through this repository's GitHub Security Advisory / private vulnerability reporting flow when available. Do not publish exploit details in a public issue before a fix is available.

Include the affected route or component, reproduction steps, impact, and any relevant browser/server logs. Never include real user videos, credentials, API keys, payment data, or other secrets in a report.

## Current security boundary

The current MVP is a frontend-only product slice. Selected videos are previewed through browser object URLs and are not uploaded to an AI provider, object store, or application backend. The cleanup result is a deterministic demo state, not a remotely processed file.

That boundary is intentional. Backend upload, authentication, billing, and AI-provider work must not weaken it without adding the controls listed in `docs/security/threat-model.md`.

## Required release gates

Every production change must keep these checks green:

- deterministic dependency installation from the committed lockfile
- production dependency audit with no high-severity findings
- TypeScript typecheck
- unit tests
- Next.js production build
- browser smoke tests
- browser security-header assertions

## Future backend requirements

Before accepting remote video uploads or remote video URLs, the backend must include all of the following:

- authenticated ownership for every user-scoped object and job
- private object storage with short-lived signed access URLs
- server-side file-size, container, codec, duration, and media-type verification; browser MIME and file extensions are hints only
- explicit upload and job rate limits, concurrency limits, and cost ceilings
- strict outbound-request controls; never fetch arbitrary user URLs without SSRF protections
- provider/webhook signature or shared-secret verification where supported
- idempotency for paid jobs, callbacks, credit settlement, and retries
- automatic deletion/retention enforcement for source and result media
- secrets available only to server-side code and deployment secret stores
- authorization checks on every read, write, retry, download, and delete operation
- auditability for billing/credit changes and privileged administrative actions

## Responsible-use boundary

The product is intended for videos the user owns or is authorized to modify. Product copy and processing flows should not encourage unauthorized removal of copyright-management or rights-management information.
