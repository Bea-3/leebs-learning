import type { AnswerOption, LearningObjective, Question } from "@/types/learning";

export interface CoachingInput {
  concept: LearningObjective;
  question: Question;
  selectedAnswerId: string;
  reasoning: string;
  attempt: number;
}

export interface CoachingResponse {
  acknowledgement: string;
  misconception: string;
  guidingQuestion: string;
  example: string[];
  responseOptions: AnswerOption[];
  revealAnswer: boolean;
}

export interface CoachingService {
  getPrompt(input: CoachingInput): Promise<CoachingResponse>;
}
