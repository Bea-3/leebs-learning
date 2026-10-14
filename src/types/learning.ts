/** Phase 1 domain: structured content, with no persistence or scoring engine. */
export interface SourceReference {
  title: string;
  url?: string;
  note?: string;
}

export interface Exam {
  id: string;
  name: "JAMB";
}

export interface Subject {
  id: string;
  examId: Exam["id"];
  name: string;
}

export interface Topic {
  id: string;
  subjectId: Subject["id"];
  title: string;
  description: string;
  conceptIds: string[];
  lessonIds: Lesson["id"][];
  isGoldenPath?: boolean;
}

export interface LearningObjective {
  id: string;
  conceptId: string;
  description: string;
}

export interface ContentSection {
  id: string;
  kind: "explanation" | "example" | "thinking-prompt";
  heading: string;
  body: string;
}

export interface Lesson {
  id: string;
  topicId: Topic["id"];
  title: string;
  objective: LearningObjective;
  sections: ContentSection[];
  estimatedMinutes: number;
  questionIds: Question["id"][];
  sources: SourceReference[];
  contentStatus: "demo" | "approved";
}

export interface AnswerOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  lessonId: Lesson["id"];
  kind: "practice-demo" | "practice";
  label: "JAMB-style practice question";
  prompt: string;
  options: AnswerOption[];
  correctAnswerId: AnswerOption["id"];
  explanation: string;
  conceptId: string;
  hint?: string;
  sources: SourceReference[];
}

export interface LearnerProfile {
  id: string;
  name: string;
  age: number;
  examId: Exam["id"];
  subjectId: Subject["id"];
  isDemo: boolean;
}

export type MasteryState = "Needs Practice" | "Developing" | "Understanding" | "Strong";

export interface LessonProgress {
  learnerId: LearnerProfile["id"];
  lessonId: Lesson["id"];
  status: "not-started" | "in-progress" | "completed";
  completedSectionIds: ContentSection["id"][];
  updatedAt: string;
}

export interface TopicMastery {
  learnerId: LearnerProfile["id"];
  topicId: Topic["id"];
  concepts: { conceptId: string; state: MasteryState }[];
  state: MasteryState;
  updatedAt: string;
  isDemo: boolean;
}

export interface ReflectionEntry {
  id: string;
  learnerId: LearnerProfile["id"];
  lessonId: Lesson["id"];
  prompt: string;
  text: string;
  createdAt: string;
}
