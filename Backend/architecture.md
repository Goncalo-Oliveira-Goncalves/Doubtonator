# Backend Architecture

## Architecture decisions

- **Structure:** feature-first modules, not layer-first folders.
- **Layers:** controller -> service -> repository.
- **Transport:** REST over HTTPS.
- **Persistence:** PostgreSQL via Sequelize.
- **Execution model:** API as serverless functions plus async workers for long-running tasks.

## Proposed module map

The backend should be organized by product domains from the current app design.

- `auth` - session creation, refresh, logout, device/session revocation.
- `users` - profile, preferences, progression metrics, account settings.
- `quests` - quest assignment, quest status, answer/record/approve flows.
- `canvas` - canvases, nodes, connections, snapshots/versions, pinned versions.
- `clan` - friends, chat, post feed, reactions, comments.
- `tournaments` - tournaments, tiers, ranking history, rewards.
- `events` - calendar event types, events, recurrence rules.
- `rewards` - rewards catalog, ownership, requests, redemption history.
- `achievements` - achievements definitions and user progress.
- `forms` - form templates and responses.
- `assets` - asset metadata and references.
- `integrations` - Fathom/Instagram/Zernio connectors and credentials policy.
- `analytics` - interaction/event ingestion and reporting views.

Shared cross-cutting modules:

- `shared/config` - centralized env parsing and startup validation.
- `shared/errors` - typed domain and platform errors.
- `shared/http` - response/error envelope and pagination helpers.
- `shared/security` - middleware for cors, rate limit, headers, authz.
- `shared/logging` - structured logging with request IDs.
- `shared/database` - sequelize bootstrapping, transactions, migrations.

## Layer responsibilities

- **Controller**
  - Parses request input and context.
  - Calls service with typed DTO input.
  - Returns standardized response shape.
  - Never contains business rules.

- **Service**
  - Implements domain rules and orchestration.
  - Owns idempotency and transaction boundaries.
  - Coordinates repositories and external connectors.
  - Never imports HTTP request/response objects.

- **Repository**
  - Handles SQL queries and ORM model operations.
  - Maps persistence rows to domain objects.
  - No domain policies beyond data integrity constraints.

## Request lifecycle and middleware order

`request-id -> logging -> cors -> security-headers -> rate-limit -> body-parser -> auth -> authz -> validation -> controller -> error-handler`

Rationale:

- Request IDs and logging must be first for full traceability.
- Rate limits run before expensive handlers.
- Auth/authz run before controller business actions.
- Global error handler ensures consistent failure output.

## Data ownership boundaries

- Each module owns its write model and invariants.
- Cross-module reads should go through services or read-optimized views.
- Event-like side effects (notifications, integration pushes, leaderboard recompute) should be dispatched asynchronously.

## Runtime topology

- **API functions:** stateless request handlers.
- **Worker functions:** background jobs for retries, sync pipelines, and delayed processing.
- **Database:** PostgreSQL with connection pooling strategy suitable for serverless.
- **Cache/queue (phase 2+):** add Redis/SQS equivalent when volume requires it.

## Non-functional standards

- Input validation at every boundary.
- Typed operational errors with stable error codes.
- Structured JSON logging and correlation IDs.
- Health and readiness endpoints.
- Graceful shutdown logic for non-serverless local/dev processes.
