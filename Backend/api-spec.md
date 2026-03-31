# API Specification Plan

## API style and baseline

- **Style:** RESTful JSON API
- **Base path:** `/api/v1`
- **Auth:** session cookie for user context, CSRF protection for state-changing endpoints
- **Content type:** `application/json`
- **Time format:** ISO 8601 UTC

## Response envelope

Success:

```json
{
  "data": {},
  "meta": {
    "requestId": "req_123",
    "timestamp": "2026-03-31T12:00:00Z"
  }
}
```

Error:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Input validation failed",
    "details": []
  },
  "meta": {
    "requestId": "req_123",
    "timestamp": "2026-03-31T12:00:00Z"
  }
}
```

## Core resource groups

- `POST /auth/session` - create session
- `DELETE /auth/session` - logout current session
- `GET /auth/session` - current auth status
- `POST /auth/session/refresh` - refresh/rotate session where applicable

- `GET /users/me` - current profile
- `PATCH /users/me` - update profile/preferences
- `GET /users/:userId/progression` - xp, streak, sparks, rank summary

- `GET /quests` - list quests for current user
- `PATCH /quests/:questId/status` - update quest state
- `POST /quests/:questId/submissions` - answer/upload/approval payload

- `GET /canvases` - list user canvases
- `POST /canvases` - create canvas
- `GET /canvases/:canvasId` - get canvas
- `PATCH /canvases/:canvasId` - update canvas metadata
- `POST /canvases/:canvasId/nodes` - create node
- `PATCH /canvases/:canvasId/nodes/:nodeId` - edit node
- `POST /canvases/:canvasId/versions` - create snapshot/version
- `POST /canvases/:canvasId/pin` - pin active version

- `GET /clan/chats` - list user chats
- `GET /clan/chats/:chatId/messages` - list messages
- `POST /clan/chats/:chatId/messages` - send message
- `PATCH /clan/chats/:chatId/messages/:messageId` - seen status, edits (if enabled)

- `GET /clan/posts` - list posts
- `POST /clan/posts` - create post
- `POST /clan/posts/:postId/reactions` - react to post
- `POST /clan/posts/:postId/comments` - create comment

- `GET /tournaments/current` - current tournament data
- `GET /tournaments/:tournamentId/leaderboard` - leaderboard snapshot

- `GET /events` - calendar events by range
- `POST /events` - create event
- `PATCH /events/:eventId` - update event

- `GET /rewards/catalog` - rewards list
- `POST /rewards/requests` - request/redeem reward

- `GET /achievements` - achievement definitions + user progress

## Query conventions

- Pagination: `?page=1&pageSize=20` or cursor-based for high-volume feeds.
- Filtering: simple query params per resource (`status`, `type`, `from`, `to`, etc.).
- Sorting: `?sortBy=createdAt&sortOrder=desc`.
- Search: explicit `q` param where applicable.

## Idempotency and concurrency

- `POST` endpoints with financial/redeem effects must accept `Idempotency-Key`.
- Mutating requests should support optimistic concurrency via `version` or `updatedAt` checks.
- Canvas version writes are append-only snapshots.

## Status code policy

- `200` successful read/update
- `201` created
- `204` no content on successful delete/no-body operations
- `400` malformed request
- `401` unauthenticated
- `403` forbidden
- `404` not found
- `409` conflict
- `422` validation domain errors
- `429` rate-limited
- `500` unhandled/internal

## API versioning

- Major version in URL path (`/api/v1`).
- Backward-compatible additions allowed in same version.
- Breaking changes require `/api/v2` and migration notice.
