# Backend Testing Strategy

## Testing goals

- Prevent regressions in core creator workflows.
- Validate contract compatibility between mobile app and backend.
- Catch integration failures before production impact.

## Test layers

- **Unit tests**
  - Services and utility/domain logic
  - Repository helpers with mocked DB boundaries where appropriate
  - Error mapping and validation behavior

- **Integration tests**
  - API route to DB flows
  - Auth/session flows
  - Transaction and migration compatibility

- **E2E tests**
  - Critical product journeys:
    - login + session lifecycle
    - quest fetch/update/submit
    - canvas read/write/version pin
    - clan messaging basic flow

- **Contract tests**
  - API response envelope and schema stability
  - Integration connectors (Fathom/Instagram/Zernio) with provider stubs

## Minimum coverage priorities (MVP)

- Auth and security middleware
- Quests module
- Canvas versions and pinning logic
- Reward request flow
- Common error handling and response contract

## Test data strategy

- Seed deterministic fixtures for local and CI.
- Isolate test DB per run or transaction rollback model.
- Avoid coupling tests to production-like mutable external systems.

## CI quality gates

Required before merge/deploy:

1. lint and type checks pass
2. unit tests pass
3. integration tests pass
4. migration checks pass
5. API contract snapshot/schema checks pass

Optional but recommended:

- e2e smoke suite on staging
- performance smoke on high-risk routes

## Reliability and failure testing

- Retry behavior for transient integration failures.
- Rate-limit behavior and auth abuse controls.
- Graceful error handling for upstream provider outages.

## Exit criteria per backend milestone

- No failing tests in required suites.
- Stable API envelope validated by contract checks.
- Critical modules have targeted coverage and no known high-severity gaps.
