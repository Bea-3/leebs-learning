import type { Exam, Lesson, Question, Subject, Topic } from "@/types/learning";

export const exam: Exam = { id: "jamb", name: "JAMB" };
export const subject: Subject = { id: "biology", examId: exam.id, name: "Biology" };

export const topics: Topic[] = [
  {
    id: "cell-structure", subjectId: subject.id, title: "Cell Structure",
    description: "Get to know the tiny building blocks of life.",
    conceptIds: ["cell-parts"], lessonIds: [],
  },
  {
    id: "ecology", subjectId: subject.id, title: "Ecology",
    description: "Explore how living things connect with their environment.",
    conceptIds: ["organism-environment"], lessonIds: [],
  },
  {
    id: "food-chains", subjectId: subject.id, title: "Food Chains & Energy Flow",
    description: "Follow the energy from sunlight to living things.",
    conceptIds: ["producers-consumers"], lessonIds: ["energy-starts-here"], isGoldenPath: true,
  },
];

// Original demo seed, not approved curriculum or official examination material.
const demoSources = [{
  title: "Leebs original demo content",
  note: "Illustrative Phase 1 seed. Requires curriculum review before the learning workflow is released. Not an official JAMB past question.",
}];

export const lessons: Lesson[] = [{
  id: "energy-starts-here", topicId: "food-chains", title: "Where does the energy begin?",
  objective: { id: "identify-producer", conceptId: "producers-consumers", description: "Explain why a green plant is a producer in a food chain." },
  estimatedMinutes: 5, contentStatus: "demo", sources: demoSources,
  questionIds: ["grass-producer-demo"],
  sections: [
    { id: "producer", kind: "explanation", heading: "Start with a producer", body: "Green plants use light energy to make food through photosynthesis. This makes them producers in a food chain." },
    { id: "grass-goat", kind: "example", heading: "Grass → goat", body: "When a goat eats grass, energy stored in the grass passes to the goat. The goat is a consumer." },
    { id: "think", kind: "thinking-prompt", heading: "Think it through", body: "A goat eats plants rather than other animals. Why is it still a consumer?" },
  ],
}];

export const questions: Question[] = [{
  id: "grass-producer-demo", lessonId: "energy-starts-here", kind: "practice-demo",
  label: "JAMB-style practice question", conceptId: "producers-consumers",
  prompt: "In a grass → goat food chain, why is grass called a producer?",
  options: [
    { id: "makes-food", text: "It uses light energy to make food." },
    { id: "eats-animals", text: "It obtains food by eating animals." },
    { id: "moves", text: "It moves energy by walking." },
  ],
  correctAnswerId: "makes-food", explanation: "Grass is a green plant. It makes food through photosynthesis, so it is a producer.",
  hint: "Think about how grass gets its food.", sources: demoSources,
}];

export const recommendedTopic = topics.find((topic) => topic.isGoldenPath)!;
export const recommendedLesson = lessons[0];
