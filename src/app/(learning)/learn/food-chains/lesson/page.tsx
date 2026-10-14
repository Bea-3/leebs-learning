import type { Metadata } from "next";
import { LessonJourney } from "@/components/lesson-journey";
import { recommendedLesson, recommendedQuestion } from "@/content/biology";

export const metadata: Metadata = { title: "Follow the energy" };
export default function LessonPage() {
  return <LessonJourney lesson={recommendedLesson} question={recommendedQuestion} />;
}
