# ClearFrame MVP Threat Model

## Scope

This threat model covers the current Next.js frontend MVP and the planned transition to authenticated uploads, private media storage, AI processing, credits, and billing.

## Security objectives

1. A user's private video must never become readable by another user without explicit authorization.
2. Untrusted media must never be treated as trusted because of a filename, browser MIME string, or client-supplied duration.
3. An attacker must not be able to turn the product into an arbitrary network fetcher or SSRF primitive.
4. An attacker must not be able to create unbounded GPU/API/storage spend.
5. Billing, credits, retries, and provider callbacks must be idempotent and auditable.
6. Provider, storage, database, and payment secrets must never reach browser bundles.
7. Failed or expired jobs must not leave private media indefinitely retained.

## Current architecture and trust boundaries

```text
Untrusted user-selected file
        |
        v
Browser / React studio
        |
        +--> local object URL preview
        |
        +--> deterministic demo job state

Next.js server
        |
        +--> static pages / metadata
        +--> health endpoint

No current path uploads the selected video to a remote processor.
```

### Current trusted components

- repository-controlled Next.js application code
- pinned GitHub Actions used by CI
- dependencies resolved by the committed npm lockfile

### Current untrusted inputs

- file name
- browser-reported MIME type
- file bytes
- decoded media metadata exposed by the browser
- URL/query/header input to public routes

Client validation improves UX only. It is not a security boundary for the future server-side upload pipeline.

## Current controls

- only MP4, MOV, and WebM filename/MIME combinations are accepted by the client UI
- client-side file-size and duration limits
- ownership/authorization confirmation in the processing workflow
- Content Security Policy with no framing or object embedding
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- strict referrer policy
- restrictive browser permissions policy
- production dependency audit
- pinned GitHub Actions with read-only permanent CI permissions
- committed lockfile and deterministic `npm ci`
- browser tests for security headers and critical interaction semantics

## Planned backend trust boundaries

```text
Browser
  |
  | authenticated request for upload authorization
  v
Application API / authorization layer
  |
  +--> database / job ledger
  |
  +--> private object storage <--- untrusted uploaded media
  |
  +--> controlled processing queue
          |
          v
      AI provider / GPU worker
          |
          v
      private output storage

Payment provider ---> signed webhook ---> billing/credit ledger
AI provider -------> verified callback/polling ---> job state machine
```

## Primary threats and required mitigations

### T1: Malicious or mislabeled media

**Threat:** A user uploads a non-video file, malformed container, parser bomb, excessive-duration asset, or content whose real type differs from the browser metadata.

**Required controls before remote upload processing:**

- enforce byte-size limits at the upload/storage boundary
- inspect magic bytes/container structure server-side
- probe duration, dimensions, streams, and codecs using a hardened media-inspection process
- reject unexpected stream counts/codecs/containers before GPU processing
- isolate native media tooling from application credentials and the public network where practical
- set CPU, memory, wall-clock, disk, and output-size limits for media inspection and transcoding

### T2: Cross-user media disclosure

**Threat:** Guessable IDs, public buckets, overly broad signed URLs, or missing authorization expose another user's source or result.

**Required controls:**

- private buckets only
- opaque object keys unrelated to original filenames
- authorization before every signed upload/download URL is issued
- short URL expirations and least-privilege HTTP method/object scope
- database row-level or equivalent authorization tied to the authenticated user
- do not place private media URLs in logs, analytics, referers, or public HTML

### T3: SSRF and arbitrary remote fetching

**Threat:** Future URL-based import or provider callbacks cause the server to fetch internal hosts, cloud metadata, localhost, private networks, or attacker-controlled redirect chains.

**Required controls:**

- do not support arbitrary URL import in the first production backend
- if introduced later, use a dedicated fetcher with protocol allowlisting, DNS/IP checks, redirect re-validation, response-size/time limits, and private/link-local/loopback blocking
- never allow user input to become a provider callback destination

### T4: Cost and resource abuse

**Threat:** Automated users generate unlimited preview, provider, storage, or GPU spend.

**Required controls:**

- authenticated quotas for paid processing
- per-user and per-IP request limits
- concurrent-job ceilings
- reserve credits before enqueueing paid work
- provider request idempotency keys
- maximum duration/resolution/file-size caps by plan
- global circuit breakers / daily spend limits
- abuse telemetry that avoids logging private media

### T5: Billing or credit duplication

**Threat:** Retried browser requests, repeated webhooks, or duplicated provider callbacks grant credits multiple times or double-charge jobs.

**Required controls:**

- append-only credit ledger
- unique idempotency keys
- webhook event IDs stored with uniqueness constraints
- reserve -> settle/refund accounting rather than mutating a single balance blindly
- transactional state transitions

### T6: Forged provider/payment callbacks

**Threat:** Attackers send fake job completion or payment events.

**Required controls:**

- verify provider/payment signatures or shared secrets where supported
- reject stale/replayed callback identifiers
- verify the referenced internal job/customer before state mutation
- fetch authoritative provider/payment state server-to-server for sensitive transitions when appropriate

### T7: Secret exposure

**Threat:** API keys are embedded in `NEXT_PUBLIC_*`, client code, logs, screenshots, error messages, or repository history.

**Required controls:**

- provider/storage/database/payment secrets are server-only
- deployment secret manager/environment only
- secret scanning in repository/deployment workflows
- redact authorization headers and secret-bearing query parameters from logs
- rotate any secret suspected of exposure rather than merely deleting it from Git

### T8: Retention failure

**Threat:** Source/result files remain indefinitely after users expect deletion.

**Required controls:**

- explicit `expires_at` for every temporary source/result
- lifecycle deletion at storage layer plus application reconciliation
- deletion status observable by operations
- retention policy shown accurately in product copy

### T9: Unauthorized rights-management removal

**Threat:** The service is intentionally used to remove copyright-management information from content the user has no right to modify.

**Required controls:**

- preserve the ownership/permission confirmation
- avoid product copy that promotes piracy or bypassing stock-media protections
- maintain a clear abuse/reporting path and applicable takedown process before public launch

## Security release gate for the real processing backend

Do not enable production remote processing until all of these are demonstrated by tests or deployment evidence:

- authentication and per-object authorization
- private signed storage access
- server-side media verification
- job-state transition tests
- idempotent credit/payment/provider flows
- request/job rate limits and spend ceilings
- SSRF-safe remote-fetch posture (preferably no URL import initially)
- automatic retention cleanup
- webhook/provider authentication
- secrets absent from client bundles
- audit/security tests passing in CI

## Deferred risks

The current CSP still permits inline script/style execution as required by the present Next.js application shape. A nonce/hash-based CSP can reduce that surface later, but should be introduced with dedicated browser tests because an incorrectly strict CSP can break Next.js hydration. This is a hardening opportunity, not evidence of a current exploit by itself.
