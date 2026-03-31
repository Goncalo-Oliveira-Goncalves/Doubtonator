# Data Model Plan

Source baseline: `backend/database-info/Database Structure Backend.md` (raw brainstorm source of truth).

## Integration of `Database Structure Backend.md`

The raw structure file is now integrated into this plan using a normalized mapping.

Raw section -> Planned model:

- `Users DB` -> `users`, `user_preferences`, `user_progress_metrics`, `user_rank_history`, `user_integration_credentials`
- `Chat DB` -> `chats`, `chat_participants`, `messages`, `message_attachments`
- `Canvases DB` + `Canvas Versions DB` + `Nodes` + `Evolution DB` -> `canvases`, `canvas_nodes`, `canvas_connections`, `canvas_versions`, `node_versions`, `node_activity_timeline`
- `Events DB` + `Event Type DB` -> `events`, `event_types`, `event_targets`, `event_recurrence_rules`, `event_exception_dates`
- `Posts DB` + `Comments DB` -> `posts`, `comments`, `post_reactions`, `comment_reactions`
- `Tournament` + `Tiers DB` + `Tournaments DB` -> `tournament_tiers`, `tournaments`, `tournament_participants`, `tournament_rank_snapshots`, `tournament_rewards`
- `Quest DB` -> `quests`, `quest_assignments`, `quest_submissions`
- `Form DB` -> `forms`, `form_questions`, `form_answers`
- `Adchievements DB` -> `achievements`, `achievement_levels`, `user_achievement_progress`
- `Rewards Store DB` -> `reward_catalog`, `reward_items`, `reward_requests`, `user_owned_rewards`
- `Assets DB` -> `assets`, `asset_variants`
- `Interaction DB` -> `interaction_events`
- `App Versions DB` -> `app_versions`
- `Subagents DB` + `Subagent Versions DB` -> `subagents`, `subagent_versions`

Normalization notes applied from raw file:

- Move nested lists into relational tables with foreign keys.
- Keep evolving node/quest metadata in typed JSON only where schema is not stable yet.
- Preserve version DAG behavior for canvas/node/subagent versions with `parent_version_id`.
- Keep credentials encrypted and isolated from core profile fields.

## Modeling principles

- Normalize core transactional data first.
- Keep JSON fields only where schema evolves frequently.
- Use append-only history tables for versioned entities.
- Enforce foreign keys for all core ownership relationships.

## Bounded contexts and entity groups

## 1) Identity and user profile

Core entities:

- `users`
- `user_preferences`
- `user_progress_metrics`
- `user_rank_history`
- `user_badges`
- `user_integration_credentials`

Notes:

- API keys for integrations should be encrypted at rest.
- Profile media stored as asset references, not raw blobs in DB.

## 2) Canvas and automation graph

Core entities:

- `canvases`
- `canvas_versions` (append-only snapshots)
- `canvas_nodes`
- `canvas_connections`
- `node_versions` (for agent config evolution)
- `node_activity_timeline`
- `subagents`
- `subagent_versions`

Notes:

- `canvas_versions` and `node_versions` use parent-version DAG fields.
- Current pinning uses explicit pointer fields (`pinned_version_id`).

## 3) Quests and forms

Core entities:

- `quests`
- `quest_assignments`
- `quest_submissions`
- `forms`
- `form_questions`
- `form_answers`

Notes:

- Quest-type-specific payload can start in typed JSON and be promoted to tables where needed.

## 4) Clan social layer

Core entities:

- `friendships`
- `chats`
- `chat_participants`
- `messages`
- `message_attachments`
- `posts`
- `post_reactions`
- `comments`
- `comment_reactions`

## 5) Tournaments and ranking

Core entities:

- `tournament_tiers`
- `tournaments`
- `tournament_participants`
- `tournament_rewards`
- `tournament_rank_snapshots`

## 6) Events and calendar

Core entities:

- `event_types`
- `events`
- `event_targets` (user/group/all)
- `event_recurrence_rules`
- `event_exception_dates`

## 7) Rewards and achievements

Core entities:

- `reward_catalog`
- `reward_items`
- `reward_requests`
- `user_owned_rewards`
- `achievements`
- `achievement_levels`
- `user_achievement_progress`

## 8) Assets and app metadata

Core entities:

- `assets`
- `asset_variants`
- `app_versions`
- `interaction_events`

## Relationship highlights

- `users` owns most user-scoped records via `user_id`.
- `canvases` belongs to `users`; `canvas_nodes` belongs to `canvases`.
- `canvas_versions` snapshots node/connection state by version.
- `subagents` and `subagent_versions` are reusable capability definitions referenced by nodes.
- `tournaments` link to `tournament_tiers` and participant snapshots.

## Migration sequence

Phase A (foundation):

1. users, preferences, sessions, credentials
2. assets, app versions, interaction events

Phase B (core product loops):

3. canvases, nodes, connections, canvas versions
4. quests, forms, quest assignments/submissions

Phase C (community systems):

5. friendships, chats, messages
6. posts, comments, reactions
7. tournaments and ranking
8. events calendar with recurrence

Phase D (economy and achievements):

9. rewards catalog/requests/ownership
10. achievements and user progress

## Data lifecycle and retention

- Timeline and interaction events should support retention windows or archival.
- Hard-delete only for legal/account deletion workflows.
- Most domain data should be soft-deletable with auditability where needed.

## Open modeling decisions

- Final group model schema for event targeting and clan organization.
- Whether rewards inventory is globally limited or unlimited digital stock.
- Whether chat message edits/deletes are allowed and how audit trail is stored.
- Whether node timeline entries remain normalized or use event store pattern.
- Final shape for journal and "other DBs" from the raw file (keep out of MVP migration set until clarified).
