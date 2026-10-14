"use client";

import { Clock3, Leaf, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PrimaryButton } from "@/components/primary-button";
import { recommendedLesson, recommendedTopic } from "@/content/biology";
import { useFoodChainsResult } from "@/lib/food-chains-progress";

export function LearningCard() {
  const result = useFoodChainsResult();
  return <Card className="relative overflow-hidden border-primary bg-primary p-6 text-primary-foreground sm:p-8"><div className="pointer-events-none absolute -right-6 -top-6 size-36 rounded-full border-[22px] border-white/5" aria-hidden="true" /><div className="relative space-y-5"><div className="flex items-center justify-between"><span className="text-xs font-semibold uppercase tracking-widest text-[#dbe8c5]">{result ? `${result.mastery} · Lesson complete` : "Your next small step"}</span><Leaf aria-hidden="true" className="size-6 text-[#dbe8c5]" /></div><div className="space-y-2"><h2 className="max-w-sm text-2xl font-semibold leading-tight">{recommendedTopic.title}</h2><p className="max-w-sm text-sm leading-6 text-[#e1eae4]">{result?.mastery === "Understanding" ? "You applied the idea to a new food chain. Your understanding is growing." : result ? "Lesson completed. Keep practising how producers and consumers connect." : recommendedTopic.description}</p></div><div className="flex items-center gap-2 text-xs text-[#e1eae4]"><Clock3 aria-hidden="true" className="size-4" />{recommendedLesson.estimatedMinutes}-minute lesson<span aria-hidden="true">·</span>Biology</div><PrimaryButton href="/learn/food-chains" className="w-full bg-[#e5edcf] text-[#234735] hover:bg-[#f0f4e3] sm:w-auto">{result ? "Review Food Chains" : "Continue Learning"}</PrimaryButton><p className="flex items-center gap-1.5 text-xs text-[#e1eae4]"><ArrowUpRight aria-hidden="true" className="size-3.5" />{result ? "Revisit the lesson whenever you need it." : "Three short steps, then try a Quick Check."}</p></div></Card>;
}
