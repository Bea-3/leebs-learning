import type { AnswerOption, LearningObjective, Question } from "@/types/learning";

export interface CoachingInput {
  concept: LearningObjective;
  question: Question;
  selectedAnswerId: string;
  reasoning: string;
  attempt: number;
}

export interface CoachingResponse {
  source: "ai" | "local";
  reasoningType?: "misconception" | "partial_understanding" | "uncertain" | "unrelated" | "mostly_correct";
  acknowledgement: string;
  misconception: string | null;
  guidance: string;
  guidingQuestion: string;
  example: string[];
  exampleText: string | null;
  responseOptions: AnswerOption[];
  revealAnswer: boolean;
}

export interface CoachingService {
  getPrompt(input: CoachingInput): Promise<CoachingResponse>;
}
