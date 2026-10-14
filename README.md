# Leebs

Leebs is a mobile-first learning companion for Nigerian students preparing for high-stakes exams. This invention-sprint MVP focuses on one JAMB Biology journey: Food Chains & Energy Flow. Adora is a fictional learner used to demonstrate the experience.

**Before the AI explains, the learner explains.**

## Run locally

Use Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

Open http://localhost:3000. For live AI coaching, set these server-only values in ignored `.env.local`:

```dotenv
OPENAI_API_KEY=your-key
OPENAI_MODEL=your-compatible-model
```

`OPENAI_MODEL` is optional; the existing default is `gpt-5.4-mini`. Keep the working model configured for your API project. Restart the server after environment changes. Never use `NEXT_PUBLIC_` for a key or commit `.env.local`. A funded API account is required for live requests. Without a key, the full journey works with Guided practice.

## Demo path

Dashboard → Continue Learning → Food Chains overview → Start lesson → three micro-learning steps → Quick Check.

Choose **Frog**, then explain: “I thought a primary consumer must eat another animal.”

AI Coach (or Guided practice) → answer Yes to the maize/chicken question → identify Grasshopper through guided discovery → choose Rat in the new Cassava chain → reflect in your own words → Finish lesson → Developing → Understanding → Back to learning.

Food Chains now shows **Understanding** on the dashboard and learning path. Refresh to demonstrate local persistence. Journal displays the completed reflection. The recommendation offers Review Food Chains. Lessons can be restarted for another demonstration; the latest completed result is retained, and later assisted attempts do not erase previously demonstrated Understanding.

The direct correct Quick Check answer, Grasshopper, still gets concise feedback without remediation. It records lesson completion at Developing because a new transfer question has not yet supplied mastery evidence.

## What is implemented

- One structured Food Chains micro-lesson, knowledge interaction, practice assessment, reasoning, guided discovery, transfer question, reflection, and concept mastery feedback.
- Server-side OpenAI Responses structured outputs with Zod validation and trusted sprint-approved concept context. AI personalizes coaching; application code owns correctness, navigation, and mastery.
- LocalStorage stores only a versioned Food Chains completion/mastery record and optional final reflection on the current browser/device. No learner reasoning is persisted. Corrupt or unavailable storage does not block the journey; unavailable storage falls back to memory and cannot survive refresh.
- A small Journal for the completed Food Chains result. Cell Structure and Ecology are labelled previews.
- Focused lesson mode, accessible forms/radio controls, visible focus, feedback announcements, and comfortable mobile touch targets.

Only completed results are saved. Active lesson steps and coaching state reset on reload. There is no cross-device sync or full persistent mastery engine.

## AI resilience

Missing key, lost connection, timeout, API error, malformed output, or detected answer leakage falls back to prewritten **Guided practice**. Live AI is labelled **AI Coach**. Requests have bounded deadlines; raw errors never appear in learner screens. Safe category diagnostics run in local development only. The server uses `store: false` and does not log learner reasoning, keys, or prompts.

This is **graceful AI fallback**, not full offline support. A connection is needed to load application routes. There is no service worker, PWA, or offline content pack. Leakage checks are bounded heuristics, not a guarantee of perfect tutoring or factual correctness.

See [AI manual checks and reasoning inputs](docs/AI-COACH-TESTING.md).

## Validation

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm start
```

Install the browser once with `npx playwright install chromium`. Playwright builds an isolated production app on port 3100 with the API key cleared. SDK and browser AI tests use mocks; automated tests never make paid calls. Coverage includes the golden path, direct correct answers, fallback, request validation, injection/leak guards, keyboard use, mobile/desktop layouts, local progress, refresh, reflection history, and storage failure.

## Submission claims and boundaries

Describe Leebs as a mobile-first JAMB Biology learning companion that asks for reasoning before coaching, supports transfer practice, and saves completed Food Chains progress/reflection locally.

Questions are original **JAMB-style practice**, not official past questions. Mastery reflects this concept’s practice evidence; it does not predict exam performance or provide a readiness percentage. AI coaching can fail and is supported by deterministic fallback.

Out of scope: additional full subjects/exams, authentication, databases, cloud sync, instructor/parent dashboards, payments, social features, achievements, analytics, voice, multilingual modes, AI-generated lessons, and full offline/PWA infrastructure. The sprint endpoint has no production authentication or abuse controls.

## Structure

- `src/content/`: typed lesson/question content, approved concepts, and deterministic coaching.
- `src/lib/coach-handler.server.ts` and `src/app/api/coach/route.ts`: server-only AI boundary.
- `src/lib/api-coaching.ts`, `src/lib/coaching.ts`: browser service and local fallback.
- `src/lib/food-chains-progress.ts`: small typed local result store with memory fallback.
- `src/components/`: existing learning journey and small dashboard/journal surfaces.
- `tests/`: mocked API tests and browser journeys.

Product requirements remain in `docs/` and `AGENTS.md`.
