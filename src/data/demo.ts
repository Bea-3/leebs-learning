import type { LearnerProfile, ReflectionEntry, TopicMastery } from "@/types/learning";

export const demoLearner: LearnerProfile = {
  id: "adora-demo", name: "Adora", age: 16, examId: "jamb", subjectId: "biology", isDemo: true,
};

// Illustrative states only; these are not calculated from learner evidence.
export const demoMastery: TopicMastery[] = [
  { learnerId: demoLearner.id, topicId: "cell-structure", state: "Understanding", concepts: [{ conceptId: "cell-parts", state: "Understanding" }], updatedAt: "2026-10-14T00:00:00Z", isDemo: true },
  { learnerId: demoLearner.id, topicId: "ecology", state: "Developing", concepts: [{ conceptId: "organism-environment", state: "Developing" }], updatedAt: "2026-10-14T00:00:00Z", isDemo: true },
  { learnerId: demoLearner.id, topicId: "food-chains", state: "Needs Practice", concepts: [{ conceptId: "producers-consumers", state: "Needs Practice" }], updatedAt: "2026-10-14T00:00:00Z", isDemo: true },
];

export const demoReflections: ReflectionEntry[] = [];
