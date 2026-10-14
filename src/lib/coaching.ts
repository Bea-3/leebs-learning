import { foodChainsCoaching as content } from "@/content/food-chains-coaching";
import type { CoachingService } from "@/types/coaching";

/** Local, predefined prompts. No request, delay, or generative analysis. */
export const localCoachingService: CoachingService = {
  async getPrompt(input) {
    if (input.concept.conceptId !== "producers-consumers" || input.question.id !== "primary-consumer-demo") {
      throw new Error("Guided practice is unavailable for this concept.");
    }
    const frogReasoning = input.selectedAnswerId === "b" && /eats? (?:the grasshopper|another animal)|first animal/i.test(input.reasoning);
    return {
      source: "local",
      acknowledgement: frogReasoning ? content.acknowledgement : content.fallbackAcknowledgement,
      misconception: frogReasoning ? content.misconception : null,
      guidance: "",
      guidingQuestion: content.guidingQuestion,
      example: content.example,
      exampleText: null,
      responseOptions: content.responseOptions,
      revealAnswer: false,
    };
  },
};
