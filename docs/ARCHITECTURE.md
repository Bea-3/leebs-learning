# Leebs — MVP Architecture

## Application

Mobile-first Next.js web application.

## Frontend

Next.js
TypeScript
Tailwind CSS
shadcn/ui
Lucide icons

## Application Areas

/onboarding
/dashboard
/learn
/journal

## Content

Learning content should be represented as structured data.

Suggested entities:

Exam
Subject
Topic
Lesson
Concept
Question
Reflection

## Learner State

Store locally for MVP:

LearnerProfile
LessonProgress
QuestionAttempt
TopicMastery
ReflectionEntry

Use browser persistence.

Keep persistence behind an abstraction so cloud sync can be added
later.

## AI

Client
→ Next.js server endpoint
→ OpenAI API

Never:

Client
→ OpenAI API directly

## Coach Endpoint

POST /api/coach

Input:

{
  lessonId,
  questionId,
  selectedAnswer,
  reasoning,
  coachingAttempt
}

Server responsibilities:

1. validate request
2. retrieve approved content
3. construct coaching context
4. call AI model
5. validate structured response
6. return safe response

## Offline Architecture

Core content:
cache locally after retrieval.

Learner state:
persist locally.

AI:
online only.

The UI should treat connectivity as an enhancement boundary rather
than making the entire learning experience dependent on connectivity.

## Future Architecture

Later versions may introduce:

- authentication
- PostgreSQL
- Supabase
- cross-device synchronization
- curriculum management
- analytics

These should not influence MVP complexity unless required.