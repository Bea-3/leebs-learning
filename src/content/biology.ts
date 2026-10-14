import type { Exam, Lesson, Question, Subject, Topic } from "@/types/learning";

export const exam: Exam = { id: "jamb", name: "JAMB" };
export const subject: Subject = { id: "biology", examId: exam.id, name: "Biology" };
export const topics: Topic[] = [
  { id: "cell-structure", subjectId: subject.id, title: "Cell Structure", description: "Get to know the tiny building blocks of life.", conceptIds: ["cell-parts"], lessonIds: [] },
  { id: "ecology", subjectId: subject.id, title: "Ecology", description: "Explore how living things connect with their environment.", conceptIds: ["organism-environment"], lessonIds: [] },
  { id: "food-chains", subjectId: subject.id, title: "Food Chains & Energy Flow", description: "Follow the energy from sunlight to living things.", conceptIds: ["producers-consumers"], lessonIds: ["energy-starts-here"], isGoldenPath: true },
];
const demoSources = [{
  title: "Leebs original demo content",
  note: "Phase 2 practice content based on the sprint brief. Requires curriculum review before public release. Not an official JAMB past question.",
}];
export const lessons: Lesson[] = [{
  id: "energy-starts-here", topicId: "food-chains", title: "Follow the energy",
  objective: { id: "identify-producer", conceptId: "producers-consumers", description: "Understand how energy moves through a food chain and identify producers and consumers." },
  estimatedMinutes: 5, contentStatus: "demo", sources: demoSources,
  questionIds: ["primary-consumer-demo"],
  sections: [
    {
      id: "sun", kind: "explanation", heading: "Where energy begins",
      body: "Most food chains begin with energy from the Sun.",
      example: "Energy moves through the chain as organisms eat.",
      chain: ["Sun", "Grass", "Grasshopper", "Frog"],
      knowledgeCheck: {
        prompt: "Where did the frog’s energy ultimately begin?",
        options: [{ id: "sun", text: "Sun" }, { id: "grass", text: "Grass" }, { id: "grasshopper", text: "Grasshopper" }],
        correctAnswerId: "sun", correctFeedback: "Yes — the energy began with sunlight, then passed along the chain.",
        retryFeedback: "Not quite. Follow the chain backwards: Frog ← Grasshopper ← Grass ← ? Try again.",
      },
    },
    {
      id: "producers", kind: "explanation", heading: "Plants are producers",
      body: "Green plants make their own food using energy from sunlight. This process is called photosynthesis. Because plants make food rather than eating other organisms, we call them producers.",
      example: "Think of grass growing beside your school. It uses sunlight to make food. When a grasshopper eats it, some of the energy stored in that food passes to the grasshopper.",
      chain: ["Sun", "Grass"], think: "Picture a goat eating grass. Which organism makes its own food?",
    },
    {
      id: "consumers", kind: "explanation", heading: "Consumers get energy by eating",
      body: "Consumers obtain energy by eating plants or other organisms. A primary consumer eats the producer directly. ‘Primary’ tells us its place in the food chain: it is the first consumer after the producer.",
      example: "In a grass → goat chain, grass is the producer and the goat is the primary consumer. The goat gets energy by eating the grass.",
      chain: ["Grass", "Goat"], think: "In another chain, look for the organism that eats the plant directly.",
    },
  ],
}];
export const questions: Question[] = [{
  id: "primary-consumer-demo", lessonId: "energy-starts-here", kind: "practice-demo",
  label: "JAMB-style practice question", conceptId: "producers-consumers",
  chain: ["Grass", "Grasshopper", "Frog", "Snake"],
  prompt: "Which organism is the primary consumer?",
  options: [{ id: "a", text: "Grass" }, { id: "b", text: "Frog" }, { id: "c", text: "Grasshopper" }, { id: "d", text: "Snake" }],
  correctAnswerId: "c",
  explanation: "Grass is the producer. The grasshopper feeds directly on the producer, so the grasshopper is the primary consumer.",
  sources: demoSources,
}];
export const recommendedTopic = topics.find((topic) => topic.isGoldenPath)!;
export const recommendedLesson = lessons[0];
export const recommendedQuestion = questions.find((question) => question.id === recommendedLesson.questionIds[0])!;
