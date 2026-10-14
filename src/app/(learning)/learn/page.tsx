import type { Metadata } from "next";
import { Atom, Leaf, Network, Clock3 } from "lucide-react";
import { PageHeader } from "@/components/page-header";

import { PrimaryButton } from "@/components/primary-button";
import { Card } from "@/components/ui/card";
import { FoodChainsMastery } from "@/components/food-chains-mastery";
import { topics, recommendedLesson, exam, subject } from "@/content/biology";

export const metadata: Metadata = { title: "Explore Biology" };
const icons = { "cell-structure": Atom, ecology: Network, "food-chains": Leaf };

export default function LearnPage() {
  const orderedTopics = [...topics].sort((a, b) => Number(!!b.isGoldenPath) - Number(!!a.isGoldenPath));
  return <><PageHeader eyebrow={`${exam.name} · Learning path`} title={`A little ${subject.name}, a little clearer.`} description="Explore the connections. Build your understanding one concept at a time." /><section aria-labelledby="topics-heading" className="space-y-4"><div className="flex items-center justify-between"><h2 id="topics-heading" className="section-heading">Your topics</h2><span className="text-xs text-muted-foreground">1 lesson available</span></div>{orderedTopics.map((topic) => {
    const Icon = icons[topic.id as keyof typeof icons];
    return <article id={topic.id} key={topic.id} className="scroll-mt-6"><Card className={topic.isGoldenPath ? "space-y-4 border-[#b5c8a6] bg-[#f0f3e7]" : "space-y-4"}>{topic.isGoldenPath && <p className="eyebrow">Recommended for you</p>}<div className="flex items-start gap-3"><span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-card text-primary"><Icon aria-hidden="true" className="size-6" /></span><div className="space-y-1"><h3 className="text-lg font-semibold leading-6 tracking-tight">{topic.title}</h3><p className="text-sm leading-6 text-muted-foreground">{topic.description}</p></div></div>{topic.isGoldenPath && <FoodChainsMastery />}{topic.isGoldenPath ? <div className="space-y-3 border-t border-[#cdd8c2] pt-4"><div><p className="text-xs font-semibold text-primary">MICRO-LESSON</p><h4 className="mt-1 text-sm font-semibold">{recommendedLesson.title}</h4><p className="mt-2 text-sm leading-6 text-muted-foreground">{recommendedLesson.objective.description}</p></div><p className="flex items-center gap-2 text-xs text-muted-foreground"><Clock3 aria-hidden="true" className="size-4" />{recommendedLesson.estimatedMinutes} minutes · 3 short steps + Quick Check</p><PrimaryButton href="/learn/food-chains" className="w-full">Open topic</PrimaryButton></div> : <p className="border-t border-border pt-3 text-xs text-muted-foreground">Preview only · Lesson coming later.</p>}</Card></article>;
  })}</section><p className="text-sm leading-6 text-muted-foreground">Food Chains is ready to explore, with guided practice to help you work through tricky ideas.</p></>;
}
