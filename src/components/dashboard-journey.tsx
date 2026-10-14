"use client";

import Link from "next/link";
import { ArrowUpRight, Sprout } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { LearningCard } from "@/components/learning-card";
import { MasteryBadge } from "@/components/mastery-badge";
import { Card } from "@/components/ui/card";
import { demoLearner } from "@/data/demo";
import { exam, subject, topics } from "@/content/biology";
import { useFoodChainsResult } from "@/lib/food-chains-progress";

export function DashboardJourney() {
  const result = useFoodChainsResult();
  return <>
    <PageHeader eyebrow={`${exam.name} · ${subject.name}`} title={`Hi, ${demoLearner.name}`} description="You don’t have to know it all today. Let’s make one idea clearer." />
    <LearningCard />
    <section className="space-y-4" aria-labelledby="journey-heading">
      <div className="flex items-center justify-between gap-3"><h2 id="journey-heading" className="section-heading">Your understanding</h2><Link href="/learn" className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-primary">View topics<ArrowUpRight aria-hidden="true" className="size-4" /></Link></div>
      <Card className="space-y-4"><ul className="divide-y divide-border">{topics.map((topic) => <li key={topic.id} className="flex flex-wrap items-center justify-between gap-2 py-3"><span className="text-sm font-medium">{topic.title}</span>{topic.isGoldenPath ? <MasteryBadge state={result?.mastery ?? "Needs Practice"} /> : <span className="text-xs text-muted-foreground">Preview · Coming later</span>}</li>)}</ul><p className="text-xs leading-5 text-muted-foreground">Mastery reflects practice with this concept, not a prediction of your exam score.</p></Card>
    </section>
    <Card className="flex gap-3 border-transparent bg-secondary shadow-none"><Sprout aria-hidden="true" className="mt-1 size-5 shrink-0 text-primary" /><div><h2 className="text-sm font-semibold">Understanding grows with practice</h2><p className="mt-1 text-sm leading-6 text-muted-foreground">Getting stuck is part of learning. There’s always room to try again.</p></div></Card>
  </>;
}
