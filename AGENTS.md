# Leebs — Agent Instructions

## Project

Leebs is a mobile-first learning web application for Nigerian
students aged 14–20 preparing for JAMB, WAEC and NECO examinations.

This repository contains an invention-sprint MVP, not a
production-ready LMS.

The canonical demo learner is Adora, a 16-year-old Nigerian
secondary-school student preparing for JAMB.

## Product Goal

Help learners move from memorising answers to understanding concepts.

The core learning loop is:

Learn → Attempt → Reflect → AI Coach → Prove Understanding →
Track Progress

## MVP Principle

Prioritize demonstrating one excellent end-to-end learning journey
over building a broad LMS.

When choosing between infrastructure and learner experience,
prioritize the learner experience unless the infrastructure is
required for the golden path.

## Primary Platform

Leebs is mobile-first.

Design primarily for inexpensive Android smartphones and small
viewports.

The application should remain responsive on tablets and desktop,
but desktop is secondary.

## Operating Environment

Assume some learners have:

- unreliable internet connectivity
- expensive mobile data
- low-end smartphones
- limited access to private tutoring
- varying levels of digital confidence

Therefore:

- prefer text and lightweight illustrations over video
- minimize unnecessary network requests
- avoid large dependencies where practical
- make core learning content cacheable
- provide clear offline states

## Engineering Principles

1. Use TypeScript.
2. Prefer simple solutions.
3. Avoid premature abstractions.
4. Avoid unnecessary dependencies.
5. Build reusable components where genuinely useful.
6. Keep business logic separate from presentation.
7. Handle loading, empty, error and offline states.
8. Never expose API secrets to client code.
9. Do not add features outside MVP scope without explicit instruction.
10. Optimize for a convincing sprint demo rather than production scale.

## Learning Principles

Leebs rewards understanding rather than content completion.

The application should:

- encourage retrieval and active thinking
- ask learners to explain reasoning
- identify misconceptions
- provide hints before answers
- use formative assessment
- test understanding with a different question after coaching
- encourage reflection
- provide supportive feedback

Do not design interactions that shame students for incorrect answers.

"I'm not sure" is a valid learner response.

## AI Coach

The AI Coach is a guided tutor, not a general-purpose chatbot.

The coach should:

1. receive approved lesson context
2. consider the assessment question
3. consider the learner's selected answer
4. consider the learner's explanation
5. identify likely misconceptions
6. acknowledge what the learner understands
7. ask a useful guiding question
8. provide a relatable example where useful
9. avoid immediately revealing the answer
10. provide a direct explanation after reasonable attempts

The coach must remain grounded in approved learning content.

## Content

Initial MVP content:

Exam: JAMB
Subject: Biology

The prototype should contain approximately:

- 3 topics
- 3–5 micro-lessons
- 10–15 assessment questions

Do not claim generated questions are official JAMB past questions.

Use "JAMB-style practice question" where appropriate.

Learning content should support source/reference metadata.

## Progress

Do not present prototype scores as scientifically validated
predictions of examination performance.

Prefer mastery states such as:

- Needs Practice
- Developing
- Understanding
- Strong

## Offline

After relevant content has previously been loaded/downloaded:

Offline:
- lessons should remain readable
- cached assessments should work
- learner progress should persist
- reflections should persist

Online-only:
- AI coaching

When offline, provide a graceful fallback instead of a broken
AI interaction.

## Privacy

Collect as little personal information as possible.

Adora is fictional demo data.

Do not send unnecessary identifying information to external APIs.

## Accessibility

Use:

- semantic HTML
- sufficient contrast
- readable text sizes
- large touch targets
- keyboard-accessible controls
- visible focus states
- meaningful labels

Do not rely solely on color to communicate mastery or correctness.

## Definition of Done

Before considering a feature complete:

- it works on a small mobile viewport
- TypeScript passes
- relevant tests pass
- loading/error/offline states are considered
- accessibility basics are preserved
- the golden path still works

## Golden Path

The most important scenario in the repository is:

Adora opens Leebs
→ sees today's recommended learning activity
→ opens a Biology micro-lesson
→ learns a concept
→ attempts a practice question
→ answers incorrectly
→ explains her reasoning
→ receives guided AI coaching
→ corrects her understanding
→ answers a new transfer question
→ reflects on what she learned
→ mastery updates
→ returns to her learning journey

Protect this flow from regressions.