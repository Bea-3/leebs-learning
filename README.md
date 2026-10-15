# Leebs

**A mobile-first learning companion for Nigerian students preparing for JAMB, WAEC and NECO.**

> **Before the AI explains, the learner explains.**

Leebs helps students build understanding, not just memorise answers.

The current invention-sprint MVP demonstrates this through a JAMB-style Biology learning journey on **Food Chains & Energy Flow**.

## The Problem

A student can sit through a lesson and still leave with a misunderstanding.

For many Nigerian students, especially those from low-income households attending public schools, getting individual learning support can be difficult. Teachers may be responsible for classrooms of more than 30 students, while limited resources and heavy workloads make one-to-one attention difficult.

Private lessons can provide extra support, but they are not affordable for every family.

This can leave some students moving forward with unresolved misconceptions or relying on memorisation instead of genuinely understanding what they are learning.

Leebs explores how technology can give learners more personalised support while **supplementing, not replacing, teachers**.

## The Solution

Leebs combines short lessons, practice, reflection and AI-assisted coaching.

The learning loop is:

**Learn → Attempt → Explain → Coach → Prove Understanding → Reflect**

If a learner gets a question wrong, Leebs does not immediately reveal the answer.

It first asks:

**“Why did you choose that?”**

The AI Coach responds to the learner's reasoning, identifies where their understanding may have gone wrong and guides them with a focused question or simple example.

The learner then answers a **different transfer question** to demonstrate that they can apply the concept rather than simply repeat an answer they were just shown.

The goal is to use AI as a **thinking partner, not an answer machine**.

## Current MVP

The MVP follows **Adora**, a fictional Nigerian secondary-school learner preparing for JAMB.

It currently focuses on:

- **Exam:** JAMB
- **Subject:** Biology
- **Topic:** Food Chains & Energy Flow

The current experience includes:

- Mobile-first micro-learning
- Interactive knowledge checks
- JAMB-style practice questions
- “Explain your thinking” after an incorrect answer
- Reasoning-aware AI coaching
- Guided practice when AI is unavailable
- Transfer questions to prove understanding
- End-of-lesson reflection
- Mastery states such as **Developing** and **Understanding**
- Local progress and reflection storage
- A simple Learning Journal
- Accessible keyboard and mobile interactions

Cell Structure and Ecology are currently shown as previews.

Questions in this MVP are original **JAMB-style practice questions**, not official JAMB past questions.

## Run Locally

Use Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

Open `http://localhost:3000`.

For live AI coaching, create an ignored `.env.local` file:

```dotenv
OPENAI_API_KEY=your-key
OPENAI_MODEL=your-compatible-model
```

`OPENAI_MODEL` is optional; the existing default is `gpt-5.4-mini`.

Keep the working model configured for your API project and restart the server after environment changes.

Never use `NEXT_PUBLIC_` for an API key or commit `.env.local`.

A funded OpenAI API account is required for live AI requests. Without one, the learning journey continues using **Guided practice**.

## Demo Path

From the dashboard:

**Food Chains → Micro-lesson → Quick Check → Explain reasoning → AI Coach → Guided discovery → Transfer question → Reflection → Understanding**

For the golden path:

1. Complete the three Food Chains learning steps.
2. At the Quick Check, choose **Frog**.
3. Explain: _“I thought a primary consumer must eat another animal.”_
4. Continue through the AI Coach or Guided practice.
5. Work out which organism eats the producer directly.
6. Complete the new `Cassava → Rat → Snake → Hawk` question.
7. Write a short reflection.
8. Finish the lesson.

After successfully applying the concept to the new question:

**Developing → Understanding**

The dashboard and learning path retain the result locally, and the Journal displays the completed reflection.

If the original Quick Check is answered correctly, Leebs gives concise feedback without unnecessary remediation.

## AI Coach

The AI Coach is designed to respond to **why a learner is confused**, rather than simply generate an answer.

AI requests are made server-side using approved learning context. Structured responses are validated before reaching the learner.

Application code—not the AI—controls:

- answer correctness
- navigation
- transfer-question results
- mastery state

If the AI is unavailable, times out or returns an invalid response, Leebs switches to prewritten **Guided practice** so the learner can continue.

Live AI is labelled **AI Coach** and deterministic support is labelled **Guided practice**.

This is **graceful AI fallback**, not full offline support.

Learner reasoning is not persisted by the application.

See [AI manual checks and reasoning inputs](docs/AI-COACH-TESTING.md).

## How Codex Was Used

OpenAI Codex was used as an engineering collaborator throughout development.

Rather than generating the entire application at once, development was divided into focused phases with clear requirements and acceptance criteria.

Codex helped with:

- Next.js and TypeScript implementation
- reusable UI components
- lesson and assessment flows
- deterministic coaching
- OpenAI Coach integration
- structured-output validation
- AI fallback behaviour
- local progress persistence
- accessibility improvements
- automated browser tests
- debugging live API issues

Product direction, learning design and feature decisions were defined separately, with each major phase manually tested from the learner's perspective before moving forward.

Codex functioned as a **development accelerator and pair-programming tool**, rather than making the product and learning-design decisions.

## Designed for the Nigerian Learning Context

Leebs is being designed around constraints that can affect Nigerian learners, including:

- large classrooms and limited individual teacher attention
- families who cannot afford regular private lessons
- low-cost smartphones
- expensive mobile data
- unreliable connectivity
- limited educational resources in some public schools

The goal is not to replace teachers.

It is to give learners another space to **ask, attempt, make mistakes, reflect and understand**.

## Coming Soon

Leebs is currently an MVP. Future development may include:

- More Biology topics
- More school subjects
- JAMB, WAEC and NECO learning paths
- Properly sourced real examination questions
- Full offline lessons and assessments
- Low-data mode
- Learner accounts and progress sync
- Deeper mastery tracking
- Personalised study recommendations
- Expanded Learning Journal
- Nigerian Pidgin and other language options
- Teacher-facing learning insights

The longer-term goal is to make personalised learning support more accessible to students regardless of whether their families can afford extra lessons.

## Validation

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm start
```

Install the Playwright browser once with:

```sh
npx playwright install chromium
```

Automated AI tests use mocks and do not make paid OpenAI API calls.

The test suite covers the golden learning path, direct correct answers, AI fallback, request validation, answer-leak guards, keyboard use, responsive layouts, local progress, reflection history and storage failure.

## Current Limitations

This is an invention-sprint MVP, not a production learning platform.

Currently:

- only the completed Food Chains result is persisted
- active lesson and coaching state reset on reload
- progress is stored on the current browser/device
- there is no account or cross-device sync
- there is no full offline/PWA support
- AI coaching may be unavailable and is not treated as infallible
- mastery does not predict JAMB or other exam performance

## Project Structure

- `src/content/` — lesson, question and coaching content
- `src/components/` — learning journey, dashboard and Journal UI
- `src/lib/coaching.ts` — deterministic coaching
- `src/lib/api-coaching.ts` — browser AI coaching service
- `src/lib/coach-handler.server.ts` — server-side AI handling
- `src/app/api/coach/route.ts` — AI Coach API route
- `src/lib/food-chains-progress.ts` — local learning result store
- `tests/` — API, regression and browser journey tests
- `docs/` — product, learning-design and AI documentation

## Vision

In a large classroom, a teacher cannot always give every learner individual attention at the exact moment they become confused.

Leebs explores how technology can help fill that gap.

**Personalised learning support should not be available only to students who can afford extra lessons.**