# Integrations Plan

## Integrated platforms

- Fathom API
- Instagram API
- Zernio API

## Integration architecture

- Use dedicated connector services under `integrations` module.
- Keep provider-specific logic isolated behind a shared interface:
  - authenticate
  - fetch
  - transform
  - publish/sync
  - handle errors

## Credential and token policy

- Credentials stored encrypted at rest.
- Environment-level master key for encryption/decryption.
- Per-user or per-workspace integration links depending on provider model.
- Token refresh flows handled by background jobs where providers support refresh tokens.

## Reliability policy

- Retry only transient failures (timeouts, 429, 5xx).
- Exponential backoff with jitter.
- Circuit-breaker behavior after repeated provider failures.
- Dead-letter queue for persistent failure with operator visibility.

## Data contract strategy

- Create provider-specific DTOs and map into internal canonical types.
- Internal domain never depends directly on raw provider payload shape.
- Persist provider object IDs and sync checkpoints for incremental sync.

## Sync patterns

- Pull-based periodic sync for analytics/remote state.
- Push-based callbacks/webhooks where provider allows.
- Idempotent upsert logic for all imported records.

## Observability

- Track per-provider metrics:
  - success/failure counts
  - p95 latency
  - retry counts
  - rate-limit hits
- Structured logs include provider name, operation, correlation ID, sanitized identifiers.

## Security controls for integrations

- Least-privilege scopes only.
- Rotation and revocation runbook per provider.
- Explicit user disconnect endpoint to revoke and purge credentials safely.

## MVP integration boundaries

- Fathom: ingest analytics snapshots and key summary metrics.
- Instagram: fetch publishing status and metadata required for app workflow.
- Zernio: support required publishing/automation calls for the current product loop.

## Deferred (post-MVP)

- Multi-account linking per provider.
- Advanced replay/reconciliation tooling.
- Full webhook signature verification tooling if provider supports webhooks and this is needed in production.
