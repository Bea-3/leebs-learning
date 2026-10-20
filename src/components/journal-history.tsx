"use client";

import { NotebookPen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MasteryBadge } from "@/components/mastery-badge";
import { PrimaryButton } from "@/components/primary-button";
import { recommendedTopic } from "@/content/biology";
import { useFoodChainsResult } from "@/lib/food-chains-progress";

export function JournalHistory() {
  const result = useFoodChainsResult();
  if (!result) return <Card className="flex flex-col items-center gap-5 px-6 py-8 text-center"><NotebookPen aria-hidden="true" className="size-9 text-primary" /><div className="space-y-2"><h2 className="text-xl font-semibold">Your first reflection is ahead</h2><p className="max-w-sm text-sm leading-6 text-muted-foreground">Work through Food Chains, then capture the idea in your own words.</p></div><PrimaryButton href="/learn/food-chains" className="w-full sm:w-auto">Explore Food Chains</PrimaryButton></Card>;
  return <article aria-label="Food Chains learning history"><Card className="space-y-4">
    <h2 className="text-xl font-semibold">{recommendedTopic.title}</h2>
    <p className="text-xs text-muted-foreground">Best demonstrated mastery</p>
    <MasteryBadge state={result.mastery} />
    <p className="text-sm leading-6 text-muted-foreground">{result.evidence === "transfer" ? "You worked through the idea and applied it to a new food chain." : result.evidence === "assisted-transfer" ? "You worked through the idea with guidance. Keep practising with a new food chain." : "You answered the Quick Check correctly. Apply the idea to a new chain to build your understanding."}</p>
    {result.reflection && <div className="space-y-2"><h3 className="text-sm font-semibold">Your latest reflection</h3><p className="text-xs text-muted-foreground">This may be from a later practice than your best result above.</p><blockquote className="whitespace-pre-wrap break-words border-l-2 border-primary pl-4 text-sm leading-6">{result.reflection}</blockquote></div>}
    <PrimaryButton href="/learn/food-chains" className="w-full">Review Food Chains</PrimaryButton>
  </Card></article>;
}
