# Backend Decision Log

This file tracks backend decisions and unresolved questions for planning and implementation.

## Confirmed decisions

- Backend language and runtime: JavaScript on Node.js.
- Framework: Express.js.
- API style: RESTful JSON API.
- Database: PostgreSQL via **Supabase** (managed).
- ORM: Sequelize.
- Auth model: session-based for current dev scaffold; production path: **Supabase Auth** (JWT) and/or DB-backed sessions.
- API hosting: **Railway**. Data hosting: **Supabase**.

## Product constraints shaping backend

- Keep backend lean for cost control.
- Push presentation and non-sensitive computation to frontend when appropriate.
- Preserve auditability for social, rewards, and tournament actions.
- Build with incremental delivery from alpha phase.

## Security priorities

- Prevent SQL injection via strict validation and parameterized DB access.
- Prevent abuse/DDOS with layered rate limiting and edge controls.
- Keep secrets and API keys out of source control and encrypted at rest.
- Maintain secure session lifecycle (creation, renewal, revocation).

## Reliability priorities

- Health/readiness endpoints.
- Structured logging and request IDs.
- Retry/backoff strategy for external integrations.
- Background job processing for long-running and provider-dependent work.

## Open questions to resolve

- Session storage for production (Supabase-backed table, Redis, or pure JWT with short TTL).
- Real-time channel strategy for clan/chat updates (polling, SSE, or WebSocket).
- Caching policy and where cache is introduced in MVP vs later phases.
- Rollout strategy for integrations (all at once vs staged by provider).

## Definition of ready for implementation

- API envelope and endpoint contracts frozen for MVP.
- Data model migration sequence approved.
- Security baseline approved.
- Testing gates agreed for CI and release.