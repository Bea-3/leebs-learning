import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { PrimaryButton } from "@/components/primary-button";
import { recommendedLesson, recommendedTopic } from "@/content/biology";

export const metadata: Metadata = { title: "Food Chains & Energy Flow" };
export default function TopicPage() {
  return <div className="mx-auto max-w-xl space-y-6">
    <Link href="/learn" className="inline-flex min-h-12 items-center text-sm font-semibold text-primary">← Biology topics</Link>
    <PageHeader eyebrow="JAMB · Biology" title={recommendedTopic.title} description={recommendedLesson.objective.description} />
    <p className="text-sm text-muted-foreground">About {recommendedLesson.estimatedMinutes} minutes · 3 short steps + a Quick Check</p>
    <section className="space-y-3" aria-labelledby="steps-heading">
      <h2 id="steps-heading" className="section-heading">What you’ll explore</h2>
      <ol className="space-y-3">{recommendedLesson.sections.map((step, index) => <li key={step.id} className="flex items-center gap-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold">{index + 1}</span><span className="text-sm font-medium">{step.heading}</span></li>)}</ol>
    </section>
    <PrimaryButton href="/learn/food-chains/lesson" className="w-full">Start lesson</PrimaryButton>
    <p className="text-xs leading-5 text-muted-foreground">JAMB-style practice. Work through the idea, then apply it to a new food chain.</p>
  </div>;
}
