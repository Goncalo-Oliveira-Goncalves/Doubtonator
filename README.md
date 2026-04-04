# DOUBTINATOR

> *Just press record.*

**Doubtinator** is a mobile-first app that gamifies the content creation process and automates every step of it — leaving the creator with one job: **film**.

Each user is paired with a personal AI automation that handles scripting, scheduling, posting, analytics, and more. The only thing a creator has to do is show up and record.

For iPhone and Android.

---

## What It Does

| Layer | Role |
|---|---|
| **AI Automation** | Handles scripts, captions, scheduling, and publishing via connected APIs (Fathom, Instagram, Zernio) |
| **Gamification** | XP, streaks, sparks (in-game currency), badges, tournaments, and an evolving avatar |
| **Canvas** | Visual workflow builder — drag nodes, connect agents and databases, build your automation graph |
| **Quests** | Daily and weekly tasks: answer questions, approve AI-generated scripts, record videos |
| **Clan** | Friends, group chat, tournaments with live leaderboards |
| **Journal** | Personal reflection and growth tracking within the Avatar tab |

---

## Repository layout

Git tracks `Frontend/` and `Backend/` (capital letters). On Windows the paths may appear lowercased; they are the same tree.

```
Doubtonator/
├── Frontend/                 ← Specs, HTML prototypes, tab docs (`tabs/`, etc.)
├── frontend/react-mobile/    ← React Native app (add when you commit this subtree)
├── Backend/                  ← Express API (`src/`), planning docs, `database-info/`
├── AI Workflow/              ← Default Mermaid template for the home canvas graph
├── assets/                   ← Shared SVGs and UI assets
├── HTMLs/                    ← Standalone HTML experiments
└── package.json              ← Monorepo helpers (`npm run backend:dev`)
```

---

## Tech Stack

### Frontend
- React Native — cross-platform iOS & Android (see `frontend/react-mobile/` when enabled)
- Mobile-first, 9:16 canvas layout
- Static HTML/PIXI prototypes under `Frontend/tabs/` for design and previews

### Backend *(in progress)*
- **Runtime:** Node.js 20+
- **Framework:** Express.js
- **Database:** PostgreSQL (planned: **Supabase** as managed Postgres; app code still targets SQL + ORM migrations)
- **ORM:** Sequelize (see `Backend/languages-and-frameworks.md`)
- **API style:** REST (`/api/v1`)
- **Auth today:** Cookie sessions (dev-friendly); production will move to **Supabase Auth (JWT)** and/or a shared session store once the DB is wired
- **Hosting (decided):** **Railway** for the Node API; **Supabase** for Postgres (+ optional Auth, Storage, Realtime)

### Integrations
- Fathom Analytics API
- Instagram API
- Zernio API

---

## Local development

1. **Backend API**
   - `cd Backend` (or `backend` on a case-insensitive disk)
   - Copy `Backend/.env.example` → `Backend/.env` and fill `SESSION_SECRET`, etc.
   - `npm install` then `npm run dev`
   - Health: `http://localhost:<PORT>/health` (default port from `.env`, often `3001`)

2. **From repo root**
   - `npm run backend:dev` — same as `npm run dev` inside `Backend/`

3. **Canvas / users (dev)**
   - Per-user Mermaid files live under `Backend/data/user-canvas/` (gitignored). Set `DEV_AUTO_USER_ID` in `.env` for automatic local login. See `Backend/README.md`.

---

## Deployment (Railway + Supabase)

1. Create a **Supabase** project; copy the **database connection string** and (when you use them) project URL and keys into Railway environment variables (`DATABASE_URL`, `SUPABASE_URL`, etc.). Keep `SUPABASE_SERVICE_ROLE_KEY` server-only.

2. Create a **Railway** service from this repo and set the service **root directory** to `Backend` so `package.json` and `railway.toml` are at the top of the deploy context.

3. Set `NODE_ENV=production`, `SESSION_SECRET`, `CORS_ORIGIN` (your real web/app origin), and `PORT` is provided by Railway — the server already reads `process.env.PORT`.

4. **Not done yet in code:** connecting Sequelize to `DATABASE_URL` and replacing in-memory sessions for multi-instance production. The planning docs in `Backend/` describe the target shape.

Details: `Backend/README.md`, `Backend/deployment-and-ops.md`, `Backend/railway.toml`.

---

## Versioning

This project follows a Greek alphabet versioning scheme:

| Phase | Versions | Description |
|---|---|---|
| **Alpha** | `alpha-v0.1` → `alpha-v0.24` | Design specs, architecture, early prototypes |
| **Beta** | `beta-v0.2` → ... | Feature development |
| **...** | continuing through **Omega** | Greek alphabet milestones |
| **Omega** | `omega-v0.x` | Animations — Lottie files for streak fire (×6 color variants), spark burst, and clapperboard-on-fire |
| **v1.0** | After Omega | Public release |

> Current version: **alpha-v0.1**

---

## Status

- [x] Frontend design specs (all 5 tabs documented)
- [x] Search into how duolingo does palettes and other brand guidelines elements
- [x] Replicate brand guidelines of duolingo in your own style
- [x] Clear Up All AI Doubts
- [ ] Design Examples to AI
- [ ] Tag all algorithm requirements across frontend specs with `[TODO]` markers
- [ ] Create all missing UI assets and icons (see Assets Needed below)
- [x] Database schema drafted
- [x] Backend language and framework selected
- [ ] Backend implementation
- [ ] Frontend implementation
- [ ] AI automation layer
- [ ] API integrations
- [ ] Testing & monitoring

---

*Built for my clients.*

---

## Assets Needed

### UI Icons & SVGs
- [ ] `assets/other-ui-elements/soundwave-icon.svg` — talk button soundwave icon (answer-questions quest)
- [ ] `assets/other-ui-elements/rank-medal-gold.svg` — 1st place rank medal for leaderboard rows
- [ ] `assets/other-ui-elements/rank-medal-silver.svg` — 2nd place rank medal for leaderboard rows
- [ ] `assets/other-ui-elements/rank-medal-bronze.svg` — 3rd place rank medal for leaderboard rows

### Canvas Node Shapes
- [ ] `assets/canvas-nodes/node-shape-circle.svg` — circle node shape for PixiJS canvas
- [ ] `assets/canvas-nodes/node-shape-square.svg` — square node shape for PixiJS canvas
- [ ] `assets/canvas-nodes/node-shape-shield.svg` — shield node shape for PixiJS canvas
- [ ] `assets/canvas-nodes/node-shape-star.svg` — star node shape for PixiJS canvas

### Lottie Animations *(Omega phase — deferred)*
- [ ] `assets/lottie/streak-fire-yellow.json`
- [ ] `assets/lottie/streak-fire-yellow-orange.json`
- [ ] `assets/lottie/streak-fire-orange.json`
- [ ] `assets/lottie/streak-fire-orange-blue.json`
- [ ] `assets/lottie/streak-fire-blue.json`
- [ ] `assets/lottie/streak-fire-grey.json`
- [ ] `assets/lottie/spark-burst.json`
- [ ] `assets/lottie/clapperboard-on-fire.json`
