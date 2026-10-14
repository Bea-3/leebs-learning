# Leebs — MVP Scope

## Sprint Objective

Demonstrate one compelling learner journey.

This is NOT a production-ready LMS.

## P0 — Must Work

### Onboarding

Learner can:

- identify herself as Adora/demo learner
- select JAMB
- select Biology

### Dashboard

Display:

- learner greeting
- current subject
- recommended activity
- topic mastery
- learning streak
- offline/content status

### Learning Path

Display:

- Biology topics
- mastery state for each topic
- recommended next topic

### Micro-Lesson

Support:

- lesson title
- learning objective
- short content sections
- lightweight diagrams/illustrations
- progress
- quick knowledge checks

### Assessment

Support:

- multiple-choice questions
- answer selection
- correctness evaluation
- feedback

### Reasoning

When appropriate, learners can explain why they selected an answer.

Support:

- short text response
- "I'm not sure"

Voice input is optional and not P0.

### AI Coach

Given:

- approved lesson context
- question
- learner answer
- correct answer
- learner reasoning

return structured coaching.

The coach should guide before revealing.

### Transfer Question

After coaching, test the same concept using a different question.

### Reflection

Learner completes a short reflection such as:

"In your own words..."

### Mastery

Update topic mastery based on demonstrated understanding.

Use states:

Needs Practice
Developing
Understanding
Strong

### Local Persistence

Persist:

- lesson progress
- assessment attempts
- mastery
- reflections

### Responsive UI

Golden path must work well on a small mobile viewport.

---

## P1 — Build After Golden Path

- offline caching
- installable PWA
- XP
- streak improvements
- learning journal screen
- richer animations
- downloadable lesson packs
- connectivity indicator
- Nigerian Pidgin explanation option

---

## P2 — Only If Time Remains

- additional subjects
- WAEC mode
- NECO mode
- audio explanations
- voice reflection
- achievements
- more personalization

---

## Explicitly Out of Scope

Do NOT build:

- instructor dashboard
- school dashboard
- parent dashboard
- course authoring system
- payment system
- subscriptions
- social feed
- messaging
- discussion forums
- certificates
- live classes
- SCORM
- university courses
- complex RBAC
- production analytics platform
- full examination prediction
- native mobile application

Do not add these unless explicitly requested.

## Demo Content

Initial content:

JAMB
└── Biology
    ├── Cell Structure
    ├── Ecology
    └── Food Chains & Energy Flow

Food Chains should contain the most polished golden-path experience.

## Golden Path Priority

If time becomes constrained:

Cut peripheral features before compromising:

Incorrect Answer
→ Reasoning
→ Coaching
→ Transfer Question
→ Mastery

That interaction is the MVP.