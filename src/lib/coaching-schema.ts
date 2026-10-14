import { z } from "zod";

export const reasoningTypes = ["misconception", "partial_understanding", "uncertain", "unrelated", "mostly_correct"] as const;

export const coachRequestSchema = z.object({
  lessonId: z.string().min(1).max(80),
  questionId: z.string().min(1).max(80),
  selectedAnswerId: z.string().min(1).max(80),
  reasoning: z.string().trim().min(1).max(600),
  coachingAttempt: z.number().int().min(1).max(3),
}).strict();

// Plain types keep the OpenAI JSON Schema compatible. Length and semantic
// constraints are checked separately after parsing, before anything is rendered.
export const aiCoachOutputSchema = z.object({
  reasoningType: z.enum(reasoningTypes),
  acknowledgement: z.string(),
  possibleMisconception: z.string().nullable(),
  guidance: z.string(),
  guidingQuestionId: z.enum(["maize-consumer"]),
  example: z.string().nullable(),
  revealAnswer: z.literal(false),
}).strict();

export type AiCoachOutput = z.infer<typeof aiCoachOutputSchema>;

export const coachingResponseSchema = z.object({
  source: z.enum(["ai", "local"]),
  reasoningType: z.enum(reasoningTypes).optional(),
  acknowledgement: z.string().min(1).max(220),
  misconception: z.string().max(220).nullable(),
  guidance: z.string().max(350),
  guidingQuestion: z.string().min(1).max(180),
  example: z.array(z.string().min(1).max(60)).min(1).max(5),
  exampleText: z.string().max(220).nullable(),
  responseOptions: z.array(z.object({ id: z.string(), text: z.string() }).strict()),
  revealAnswer: z.literal(false),
}).strict();
