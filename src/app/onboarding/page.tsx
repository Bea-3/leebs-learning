import type { Metadata } from "next";
import { Check, Sprout } from "lucide-react";
import { Brand } from "@/components/brand";
import { PrimaryButton } from "@/components/primary-button";
import { Card } from "@/components/ui/card";
import { demoLearner } from "@/data/demo";
import { exam, subject } from "@/content/biology";

export const metadata: Metadata = { title: "Welcome" };

export default function OnboardingPage() {
  return <div className="mx-auto min-h-dvh max-w-xl px-6 py-8"><header><Brand /></header><main id="main-content" className="space-y-7 py-12"><div className="flex size-16 items-center justify-center rounded-3xl bg-secondary text-primary"><Sprout aria-hidden="true" className="size-8" /></div><div className="space-y-3"><p className="eyebrow">Your understanding starts here</p><h1 className="text-4xl font-bold leading-tight tracking-tight">Small lessons.<br />Big lightbulb moments.</h1><p className="text-sm leading-6 text-muted-foreground">A place to think things through, ask why, and build confidence for your exams.</p></div><Card className="space-y-5"><div className="flex items-center gap-3"><span className="flex size-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-accent-foreground">{demoLearner.name[0]}</span><div><h2 className="font-semibold">Meet {demoLearner.name}</h2><p className="text-sm text-muted-foreground">{demoLearner.age}-year-old demo learner</p></div></div><div className="grid grid-cols-2 gap-3"><div className="rounded-2xl bg-secondary p-3"><p className="text-xs text-muted-foreground">Preparing for</p><p className="mt-1 font-semibold">{exam.name}</p></div><div className="rounded-2xl bg-secondary p-3"><p className="text-xs text-muted-foreground">Exploring</p><p className="mt-1 font-semibold">{subject.name}</p></div></div><p className="flex items-center gap-2 text-xs text-muted-foreground"><Check aria-hidden="true" className="size-4 shrink-0 text-primary" />A ready-to-explore profile. No personal details needed.</p></Card><PrimaryButton href="/dashboard" className="w-full">Continue as {demoLearner.name}</PrimaryButton><p className="text-center text-xs leading-5 text-muted-foreground">This demo uses sample content and progress.<br />Try your first Food Chains lesson and Quick Check.</p></main></div>;
}
