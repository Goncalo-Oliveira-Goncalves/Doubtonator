# Backend Languages and Frameworks Decisions

## Finalized defaults (MVP)

- **Runtime:** Node.js (LTS)
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **API style:** REST (`/api/v1`)
- **Auth model:** Session-based auth with secure cookies
- **Deployment target:** **Railway** for the API; **Supabase** for PostgreSQL (and optional Auth/Storage). Background workers added when needed.

## Why this stack

- Fast delivery for current alpha stage.
- Strong ecosystem and hiring familiarity.
- PostgreSQL matches the relational data complexity of quests, canvases, social, tournaments, and rewards.
- Sequelize provides productivity with migrations and model ergonomics while keeping SQL control where needed.

## Operational requirements

- Centralized config validation at startup.
- Structured logging with request IDs.
- Typed error envelope across all endpoints.
- Input validation on all boundaries.
- Health/readiness endpoints from day one.

## Supporting technology (planned)

- **Queue/background processing:** provider-managed queue for integrations and retries.
- **Cache/session acceleration:** Redis-compatible store if needed by load.
- **Observability:** log + metrics + error tracking stack in staging and production.

## Non-goals for MVP

- Microservices split.
- GraphQL or gRPC transport.
- Multi-region active-active architecture.
