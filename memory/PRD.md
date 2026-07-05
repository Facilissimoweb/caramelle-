# Facilissimo Web — PRD

## Original Problem Statement
"Modernizza il front hand dando una sensazioni futuristica"
The user asked to modernize the frontend of an existing GitHub-imported React + Vite + TypeScript app ("Facilissimo Web" of M. Teresa Rogani, Italian freelance web designer) with a futuristic feel.

User choices:
- Style: **Holographic / iridescente**
- Palette: libera scelta
- Animazioni: **il più possibile**
- Font: libera scelta

## Architecture
- **Frontend**: `/app/frontend/` — React 19 + Vite 6 + TypeScript + Tailwind CSS v4 + Motion (framer-motion). Port 3000.
- **Backend**: `/app/backend/` — FastAPI + Motor (async MongoDB) + emergentintegrations. Port 8001.
- **Database**: MongoDB (local) — collection `contact_submissions`.
- **LLM**: Anthropic **Claude Sonnet 4.6** via `emergentintegrations` + `EMERGENT_LLM_KEY`.

## Core Requirements
- Single-page site with 5 tabs: Inizio, Chi Sono, Proposte, Contatti, Chat AI
- Contact form persisting to MongoDB with real-time submissions dashboard
- AI chat assistant in Italian representing M. Teresa Rogani

## What's been implemented (2026-01)
- Restructured monolithic Express+Vite app into split FastAPI backend + Vite frontend
- Full **holographic/iridescent** redesign:
  - Aurora blobs, grid overlay, grain overlay (animated background layers)
  - Iridescent gradient text (`.holo-text`), chrome text (`.chrome-text`)
  - Glassmorphism panels with animated conic-gradient borders (`.holo-panel`)
  - Pill-shaped iridescent CTA (`.btn-holo`), ghost buttons (`.btn-ghost`)
  - Pulse dots, holographic tags/chips
  - Marquee tech-stack strip
  - Hero orb with rotating conic gradient border and central sparkle glow
- Fonts: **Chakra Petch** (display) + **DM Sans** (body) + **JetBrains Mono** (accents)
- Motion micro-animations on all cards, staggered entrances, sheen sweeps on hover
- Chat AI upgraded from Gemini direct API to Claude Sonnet 4.6 via Emergent LLM Key
- All 6 components redesigned (Header, Footer, HomeView, AboutView, ProposteView, ContattiView, ChatView)
- Data-testids across all interactive elements

## Backend endpoints
- `GET /api/health` → `{status: ok}`
- `POST /api/contact` → stores submission in MongoDB
- `GET /api/contact/submissions` → last 50 submissions
- `POST /api/chat` → Claude Sonnet 4.6 with system instruction (Facilissimo Web assistant)

## Test Results (iteration_1)
- Backend: 75% (health/contact/list PASS; chat FAILS due to `EMERGENT_LLM_KEY` budget = 0)
- Frontend: 88% (hero, nav, contact form all PASS; chat UI stuck due to backend 500)
- **Action for user**: top up Emergent LLM Key balance (Profile → Universal Key → Add Balance)

## Backlog / P1
- Add streaming responses to chat (SSE) for token-by-token display
- Add Framer-Motion page transitions between tabs
- Optional: 3D WebGL hero background (three.js)
- Optional: user testimonials carousel
- Optional: language toggle IT/EN

## Notes
- The Emergent LLM Key balance shows Max budget 0.0. User must add balance to enable Chat AI.
- Frontend gracefully surfaces this as: "Il credito dell'AI Key è esaurito..."
