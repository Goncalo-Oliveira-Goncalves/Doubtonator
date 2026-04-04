# Doubtonator Backend

## Implementation status

- **Running API:** Express app in `src/` — `npm install`, copy `.env.example` → `.env`, then `npm run dev` or `npm start`.
- **Persistence:** Not fully wired yet. Canvas workflow is per-user on disk under `data/user-canvas/<userId>/` (see `src/modules/canvas/`). PostgreSQL + Sequelize integration is the next step.
- **Production target:** **Railway** (Node process) + **Supabase** (Postgres; optional Auth, Storage, Realtime). Config stub: `railway.toml`. Env placeholders: `.env.example`.

## Infrastructure decisions (frozen for next phase)

| Concern | Choice |
|--------|--------|
| API hosting | **Railway** — connect the GitHub repo, set service root to this `Backend/` folder |
| Database | **Supabase Postgres** — use `DATABASE_URL` in Railway; align schema with `database-info/Database Structure Backend.md` over time |
| Auth (target) | **Supabase Auth** (JWT) for real users, or session store backed by DB/Redis if you keep cookies |
| Secrets | Railway + Supabase dashboards only — never commit `.env` |

---

# Planning pack

This folder defines how the backend should be designed and delivered; implementation is catching up to these docs.

## Scope

- Runtime and framework decisions for the backend
- API contracts and cross-cutting standards
- Auth and security posture
- Data model boundaries and migration order
- External integration contracts
- Deployment, observability, and testing strategy
- Phased delivery roadmap

## Current baseline

- Product phase: `alpha-v0.1`
- Backend stack direction: Node.js + Express + PostgreSQL + Sequelize
- API style: REST
- Auth direction: session-based for local dev; production toward Supabase Auth + hardened cookies / JWT
- Deployment direction: **Railway** (API) + **Supabase** (data); workers/queues later as needed

## Planning docs

- `architecture.md` - Feature-first backend architecture, module boundaries, and request lifecycle.
- `api-spec.md` - API conventions, endpoint groups, response envelope, and versioning approach.
- `auth-and-security.md` - Session auth model, middleware order, and abuse prevention controls.
- `data-model-plan.md` - Domain data model plan and migration sequencing.
- `integrations.md` - Fathom, Instagram, and Zernio integration contracts.
- `deployment-and-ops.md` - Environment model, runtime topology, health checks, observability, rollback.
- `testing-strategy.md` - Unit/integration/e2e and contract testing plan.
- `roadmap.md` - Delivery phases and acceptance criteria.
- `languages-and-frameworks.md` - Finalized technology decisions and rationale.
- `notes.md` - Decision log and open questions.

## Folder checklist mapping

You already created backend topic folders. Treat them as a progress checklist.  
Current plan coverage maps as follows:

- `database-info` -> source of truth integrated in `data-model-plan.md`.
- `authentication-and-authz` and `security` -> covered by `auth-and-security.md`.
- `networking-and-http` and `api-design` -> covered by `api-spec.md`.
- `orm` -> covered by `languages-and-frameworks.md` and `data-model-plan.md`.
- `web-servers-and-hosting`, `cloud-and-conteinerization`, `deployment-strategies`, `backup-and-recovery` -> covered by `deployment-and-ops.md`.
- `background-jobs-or-queues` and `performance-and-scaling` -> covered by `architecture.md` and `deployment-and-ops.md`.
- `testing` -> covered by `testing-strategy.md`.
- `docs-and-contracts` -> covered by `api-spec.md` and this planning pack.
- `observability` -> covered by `deployment-and-ops.md`.
- `ci-or-cd-pipelines` and `version-control-and-workflow` -> covered by `testing-strategy.md` and `roadmap.md`.
- `compliance-and-privacy` -> baseline in `auth-and-security.md` (expand in implementation phase).

## How to use this folder

1. Align product and engineering on these docs.
2. Resolve open questions in `notes.md`.
3. Freeze MVP contracts (`api-spec.md`, `data-model-plan.md`, `auth-and-security.md`).
4. Start implementation by module, following `architecture.md` and `roadmap.md`.
