import type { Question } from "@/types/learning";

export const foodChainsCoaching = {
  sources: [{ title: "Leebs Phase 3 original guided practice", note: "Prewritten demo coaching from the sprint brief; not AI analysis or official JAMB material." }],
  acknowledgement: "You’re right that consumers get energy by eating other organisms.",
  fallbackAcknowledgement: "Let’s look at how consumers get energy.",
  misconception: "A consumer may be mistaken for an organism that must eat another animal.",
  guidingQuestion: "Would the chicken still be a consumer if it ate maize?",
  example: ["Maize", "Chicken", "Person"],
  responseOptions: [{ id: "yes", text: "Yes" }, { id: "no", text: "No" }, { id: "unsure", text: "I’m not sure" }],
  yesFeedback: "Exactly. A consumer can eat a plant or another organism.",
  strongerHint: "Maize is a producer. The chicken gets energy by eating it, so the chicken is still a consumer.",
  connection: "A primary consumer is the organism that eats the producer directly.",
  discoveryPrompt: "Which organism eats the producer directly?",
  discoveryOptions: [{ id: "c", text: "Grasshopper" }, { id: "b", text: "Frog" }, { id: "d", text: "Snake" }],
  discoveryHint: "Find the producer first. Follow the arrow to the organism that eats it directly.",
  reflectionPrompt: "In your own words, a primary consumer is...",
  completionExplanation: "You worked through a misconception and correctly applied the idea to a new food chain.",
  assistedExplanation: "You worked through the idea with an explanation. Try a new question next time to build your understanding.",
  maxAttempts: 3,
};

export const transferQuestion: Question = {
  id: "cassava-primary-consumer-demo", lessonId: "energy-starts-here", kind: "practice-demo",
  label: "JAMB-style practice question", conceptId: "producers-consumers",
  chain: ["Cassava", "Rat", "Snake", "Hawk"],
  prompt: "Which organism is the primary consumer?",
  options: [{ id: "a", text: "Cassava" }, { id: "b", text: "Rat" }, { id: "c", text: "Snake" }, { id: "d", text: "Hawk" }],
  correctAnswerId: "b", explanation: "The rat eats the producer directly, so it is the primary consumer.",
  hint: "Find the producer first. Then look at what eats it directly.",
  sources: foodChainsCoaching.sources,
};
