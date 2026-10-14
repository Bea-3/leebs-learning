import { foodChainsCoaching } from "@/content/food-chains-coaching";
import { localCoachingService } from "@/lib/coaching";
import { coachingResponseSchema } from "@/lib/coaching-schema";
import type { CoachingService } from "@/types/coaching";

export function createApiCoachingService(fetcher: typeof fetch = fetch, timeoutMs = 16_000): CoachingService {
  return {
    async getPrompt(input) {
      if (typeof navigator !== "undefined" && navigator.onLine === false) return localCoachingService.getPrompt(input);
      const controller = new AbortController();
      let timer: ReturnType<typeof setTimeout> | undefined;
      try {
        const request = (async () => {
          const response = await fetcher("/api/coach", {
            method: "POST", headers: { "Content-Type": "application/json" }, cache: "no-store", signal: controller.signal,
            body: JSON.stringify({
              lessonId: input.question.lessonId, questionId: input.question.id,
              selectedAnswerId: input.selectedAnswerId, reasoning: input.reasoning, coachingAttempt: input.attempt,
            }),
          });
          if (!response.ok) throw new Error("Coach unavailable");
          return coachingResponseSchema.parse(await response.json());
        })();
        const coaching = await Promise.race([
          request,
          new Promise<never>((_, reject) => { timer = setTimeout(() => { controller.abort(); reject(new Error("Coach timeout")); }, timeoutMs); }),
        ]);
        // The approved fixed question and options remain application-owned.
        if (coaching.guidingQuestion !== foodChainsCoaching.guidingQuestion || JSON.stringify(coaching.responseOptions) !== JSON.stringify(foodChainsCoaching.responseOptions)) throw new Error("Unsupported guiding question");
        return coaching;
      } catch {
        return localCoachingService.getPrompt(input);
      } finally {
        if (timer) clearTimeout(timer);
      }
    },
  };
}

export const apiCoachingService = createApiCoachingService();
