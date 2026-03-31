# Auth and Security Plan

## Auth strategy

- **Primary model:** server-managed sessions.
- **Session transport:** secure, httpOnly, sameSite cookies.
- **Session store:** centralized store (DB or Redis-backed) to support revocation.
- **CSRF defense:** token-based CSRF protection on state-changing requests.

Why this default:

- Matches project direction in root README.
- Reduces token leakage risk on mobile/web hybrids.
- Supports explicit session invalidation and device/session management.

## Authorization

- Role and scope checks at service boundary.
- Minimum roles initially: `user`, `admin`.
- Sensitive operations (rewards approvals, tournament admin, system config) require elevated role checks.

## Security middleware baseline

Order:

1. request ID
2. structured request logging
3. CORS (explicit origins)
4. security headers
5. rate limiting and abuse guard
6. body size limits
7. session auth
8. authorization
9. input validation
10. handler
11. global error handler

## Input and output hardening

- Validate all request payloads with schema validators.
- Reject unexpected fields when strict mode is enabled.
- Use ORM parameterization and no raw unsafe SQL concatenation.
- Sanitize and normalize text fields that can be rendered later.
- Return stable, non-sensitive error responses.

## Abuse prevention and DDOS controls

- Edge/network rate limiting per IP and per session.
- App-level route-specific limits (auth routes stricter).
- Burst + sustained window limits.
- Temporary blocking/greylisting for repeated abuse.
- Request size/time limits and slow-client protections.

## Secrets and credentials policy

- No secrets in source control.
- Credentials in environment/secret manager only.
- API keys encrypted at rest when stored in DB.
- Separate credentials per environment.
- Rotation runbook for integration credentials.

## Session management controls

- Session timeout with sliding window for active users.
- Explicit logout revokes current session.
- Optional global logout revokes all sessions for a user.
- Device/session visibility endpoint planned for account security UX.

## Security logging and audit

- Log auth events: login success/failure, logout, privilege errors, suspicious spikes.
- Include request ID, user ID (if known), route, status code, timing.
- Never log passwords, raw tokens, or unredacted secrets.

## Threat-focused checklist

- SQL injection: schema validation, parameterized ORM queries.
- CSRF: mandatory CSRF tokens for writes.
- XSS: strict output encoding/sanitization in client rendering paths.
- Broken auth: secure cookie flags, server-side session checks.
- Privilege escalation: explicit role checks on sensitive routes.
- Replay abuse: idempotency keys on sensitive mutating endpoints.
