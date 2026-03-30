# DOUBTINATOR

> *Just press record.*

**Doubtinator** is a mobile-first app that gamifies the content creation process and automates every step of it — leaving the creator with one job: **film**.

Each user is paired with a personal AI automation that handles scripting, scheduling, posting, analytics, and more. The only thing a creator has to do is show up and record.

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
| **v1.0** | After Omega | Public release |

> Current version: **alpha-v0.1**

---

## Status

- [x] Frontend design specs (all 5 tabs documented)
- [] Seach into how duolingo does palettes and other brand guidelines elements
- [] Replicate brand guidelines of duolingo in your own style
- [] Design Examples to AI
- [x] Database schema drafted
- [x] Backend language and framework selected
- [ ] Backend implementation
- [ ] Frontend implementation
- [ ] AI automation layer
- [ ] API integrations
- [ ] Testing & monitoring

---

*Built for my clients.*
