# Backend Code Checklist (Execution)

This is the implementation checklist for the first backend coding pass.

## 0) Bootstrap

- [x] Create `backend/package.json` with runtime scripts.
- [ ] Install Express and core middleware dependencies.
- [x] Create `backend/src` feature-first skeleton.

## 1) Core App Foundation

- [x] Add centralized config loader with env validation.
- [x] Add structured error classes and global error middleware.
- [x] Add request ID + basic request logging middleware.
- [x] Add security middleware baseline (`helmet`, `cors`, JSON limits).
- [x] Add rate limit middleware baseline.

## 2) Health + Readiness

- [x] Implement `GET /health` (liveness).
- [x] Implement `GET /ready` (readiness placeholder with dependency checks scaffold).

## 3) Auth Session Foundation

- [x] Add session middleware wiring (`express-session` scaffold).
- [x] Add `GET /api/v1/auth/session` endpoint (session status).
- [x] Add `POST /api/v1/auth/session` placeholder (login stub).
- [x] Add `DELETE /api/v1/auth/session` placeholder (logout stub).

## 4) API Conventions

- [x] Add shared success/error response helpers.
- [x] Add `/api/v1` router boundary.
- [x] Add 404 handler in API namespace.

## 5) Module Skeletons

- [x] Create starter modules: `users`, `quests`, `canvas`, `clan`, `events`, `rewards`.
- [x] Add one starter route per module returning `501 Not Implemented`.

## 6) Dev and Quality

- [x] Add `nodemon` dev script.
- [x] Add `npm run lint` placeholder script.
- [x] Add `backend/.env.example` with required variables.
- [x] Add minimal smoke test command (`npm run test:smoke`) for health endpoints.

## 7) Next coding milestones

- [ ] Replace auth stubs with real credential/session flow.
- [ ] Add Sequelize bootstrapping and first migrations.
- [ ] Implement first functional module (`quests`) end-to-end.
