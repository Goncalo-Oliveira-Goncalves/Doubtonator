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

## App Structure

```
Doubtinator/
├── Frontend/
│   ├── tabs/
│   │   ├── home-tab/          ← Canvas, agent nodes, navbar, rewards store
│   │   ├── quests-tab/        ← Quest board, video recording, script approval
│   │   ├── clan-tab/          ← Chat, friends, tournaments
│   │   ├── avatar-tab/        ← Profile card, evolution dashboard, journal
│   │   └── calendar-tab/      ← Day timeline view
│   └── bottom-navbar.md
│
└── Backend/
    ├── database-info/          ← PostgreSQL schema (users, canvases, journals, etc.)
    ├── languages-and-frameworks.md
    └── notes.md
```

---

## Tech Stack

### Frontend
- React Native — cross-platform iOS & Android
- Mobile-first, 9:16 canvas layout

### Backend *(in progress)*
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL via Sequelize ORM
- **API style:** RESTful
- **Auth:** Session-based with security hardening (SQL injection prevention, DDOS protection)
- **Deployment:** Serverless / Cloud Functions (AWS or equivalent)

### Integrations
- Fathom Analytics API
- Instagram API
- Zernio API

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
- [x] Seach into how duolingo does palettes and other brand guidelines elements
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
