"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnswerChoices } from "@/components/answer-choices";
import { Button } from "@/components/ui/button";
import { FoodChain } from "@/components/food-chain";
import { ProgressBar } from "@/components/progress-bar";
import { foodChainsCoaching as content, transferQuestion } from "@/content/food-chains-coaching";
import { localCoachingService } from "@/lib/coaching";
import { apiCoachingService } from "@/lib/api-coaching";
import { saveFoodChainsResult, useFoodChainsResult } from "@/lib/food-chains-progress";
import type { CoachingResponse, CoachingService } from "@/types/coaching";
import type { Lesson, Question } from "@/types/learning";

type Stage = "reasoning" | "coach" | "discovery" | "transfer" | "reflection" | "complete";
const stages: Stage[] = ["reasoning", "coach", "discovery", "transfer", "reflection", "complete"];
const titles: Record<Stage, string> = {
  reasoning: "Why did you choose that?", coach: "Let’s work it out", discovery: "Follow the producer",
  transfer: "Prove it", reflection: "Before you go...", complete: "Understanding grows",
};

export function RecoveryJourney({ lesson, question, selectedAnswerId, service = apiCoachingService }: {
  lesson: Lesson; question: Question; selectedAnswerId: string; service?: CoachingService;
}) {
  const [stage, setStage] = useState<Stage>("reasoning");
  const [reasoning, setReasoning] = useState("");
  const [unsure, setUnsure] = useState(false);
  const [prompt, setPrompt] = useState<CoachingResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [coachAnswer, setCoachAnswer] = useState<string | null>(null);
  const [discoveryAnswer, setDiscoveryAnswer] = useState<string | null>(null);
  const [discoveryAttempts, setDiscoveryAttempts] = useState(0);
  const [discoveryFeedback, setDiscoveryFeedback] = useState("");
  const [discoveryDone, setDiscoveryDone] = useState(false);
  const [transferAnswer, setTransferAnswer] = useState<string | null>(null);
  const [transferAttempts, setTransferAttempts] = useState(0);
  const [transferFeedback, setTransferFeedback] = useState("");
  const [transferDone, setTransferDone] = useState(false);
  const [assistedTransfer, setAssistedTransfer] = useState(false);
  const [reflection, setReflection] = useState("");
  const [saved, setSaved] = useState(true);
  const bestResult = useFoodChainsResult();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const requestInFlight = useRef(false);

  useEffect(() => {
    headingRef.current?.focus();
    headingRef.current?.scrollIntoView({ block: "start" });
  }, [stage]);

  async function requestCoaching() {
    if (requestInFlight.current || (!unsure && !reasoning.trim())) return;
    requestInFlight.current = true;
    setLoading(true);
    try {
      const response = await service.getPrompt({
        concept: lesson.objective, question, selectedAnswerId,
        reasoning: unsure ? "I’m not sure" : reasoning.trim(), attempt: 1,
      });
      // Preserve the think-before-help boundary, including for a future provider.
      if (response.revealAnswer || !response.guidingQuestion || !response.responseOptions.length) {
        throw new Error("Invalid coaching prompt");
      }
      setPrompt(response);
      setStage("coach");
    } catch {
      const fallback = await localCoachingService.getPrompt({
        concept: lesson.objective, question, selectedAnswerId,
        reasoning: unsure ? "I’m not sure" : reasoning.trim(), attempt: 1,
      });
      setPrompt(fallback);
      setStage("coach");
    } finally {
      setLoading(false);
      requestInFlight.current = false;
    }
  }

  function checkDiscovery() {
    if (!discoveryAnswer || discoveryDone) return;
    const attempts = discoveryAttempts + 1;
    setDiscoveryAttempts(attempts);
    if (discoveryAnswer === question.correctAnswerId) {
      setDiscoveryFeedback(question.explanation);
      setDiscoveryDone(true);
    } else if (attempts >= content.maxAttempts) {
      setDiscoveryFeedback(question.explanation + " Let’s apply that idea to a different chain.");
      setDiscoveryDone(true);
    } else {
      setDiscoveryFeedback(content.discoveryHint);
    }
  }

  function checkTransfer() {
    if (!transferAnswer || transferDone) return;
    const attempts = transferAttempts + 1;
    setTransferAttempts(attempts);
    if (transferAnswer === transferQuestion.correctAnswerId) {
      setTransferFeedback("You’ve got it. " + transferQuestion.explanation);
      setTransferDone(true);
    } else if (attempts >= content.maxAttempts) {
      setTransferFeedback("Cassava is the producer. " + transferQuestion.explanation + " You can keep practising next time.");
      setAssistedTransfer(true);
      setTransferDone(true);
    } else {
      setTransferFeedback(transferQuestion.hint!);
    }
  }

  return <div className="mx-auto max-w-xl space-y-5">
    <Link href="/learn/food-chains" className="inline-flex min-h-12 items-center text-sm font-semibold text-primary">← Topic overview</Link>
    <p className="eyebrow">Food Chains & Energy Flow</p>
    <ProgressBar value={stages.indexOf(stage) + 1} max={stages.length} label="Work through the idea" />
    {stage === "reasoning" && <p role="status" className="text-sm font-semibold text-primary">Not quite — let’s look at your thinking.</p>}
    <h1 ref={headingRef} tabIndex={-1} className="text-3xl font-bold tracking-tight">{titles[stage]}</h1>
    {stage === "reasoning" && <form className="space-y-5" onSubmit={(event) => { event.preventDefault(); void requestCoaching(); }}>
      <p className="text-sm leading-6 text-muted-foreground">Explain what you were thinking. It doesn’t have to be perfect.</p>
      <p className="text-sm">You chose: <strong>{question.options.find((option) => option.id === selectedAnswerId)?.text}</strong></p>
      <div className="space-y-2"><label htmlFor="reasoning" className="block text-sm font-semibold">Your thinking</label>
        <textarea id="reasoning" rows={3} maxLength={600} value={reasoning} disabled={loading} onChange={(event) => { setReasoning(event.target.value); setUnsure(false); }} className="w-full rounded-2xl border border-border bg-card p-3 text-base leading-6" />
      </div>
      <label className="flex min-h-12 items-center gap-3 rounded-2xl border border-border bg-card p-3 text-sm"><input type="checkbox" checked={unsure} disabled={loading} onChange={(event) => setUnsure(event.target.checked)} className="size-5 accent-primary" />I’m not sure</label>
      {loading && <p role="status" aria-live="polite" className="flex items-center gap-2 text-sm text-primary"><span aria-hidden="true" className="size-3 rounded-full bg-primary" />Thinking about your explanation...</p>}
      <Button type="submit" className="w-full" disabled={loading || (!unsure && !reasoning.trim())}>{loading ? "Thinking…" : "Continue"}</Button>
    </form>}
    {stage === "coach" && prompt && <form className="space-y-5" onSubmit={(event) => { event.preventDefault(); if (coachAnswer) setStage("discovery"); }}>
      <p className="text-xs leading-5 text-muted-foreground">{prompt.source === "ai" ? "AI Coach" : "Guided practice · Prewritten prompts, not AI analysis"}</p>
      <p className="text-sm leading-6">{prompt.acknowledgement}</p>
      {prompt.guidance && <p className="text-sm leading-6">{prompt.guidance}</p>}
      {prompt.exampleText && prompt.exampleText.trim().toLowerCase() !== prompt.guidingQuestion.trim().toLowerCase() && <p className="text-sm leading-6 text-muted-foreground">{prompt.exampleText}</p>}
      <FoodChain organisms={prompt.example} />
      <fieldset className="space-y-3"><legend className="mb-3 text-base font-semibold">{prompt.guidingQuestion}</legend><AnswerChoices name="coaching" options={prompt.responseOptions} selected={coachAnswer} onSelect={setCoachAnswer} /></fieldset>
      <Button type="submit" className="w-full" disabled={!coachAnswer}>Check answer</Button>
    </form>}
    {stage === "discovery" && <form className="space-y-5" onSubmit={(event) => { event.preventDefault(); if (discoveryDone) setStage("transfer"); else checkDiscovery(); }}>
      <p className="text-sm leading-6">{coachAnswer === "yes" ? content.yesFeedback : content.strongerHint}</p>
      <p className="text-sm leading-6">{content.connection}</p>
      {question.chain && <FoodChain organisms={question.chain} />}
      <fieldset className="space-y-3"><legend className="mb-3 text-base font-semibold">{content.discoveryPrompt}</legend><AnswerChoices name="discovery" options={content.discoveryOptions} selected={discoveryAnswer} disabled={discoveryDone} onSelect={(answer) => { setDiscoveryAnswer(answer); setDiscoveryFeedback(""); }} /></fieldset>
      <p role="status" aria-atomic="true" className="text-sm leading-6 text-primary">{discoveryFeedback}</p>
      <Button type="submit" className="w-full" disabled={!discoveryAnswer}>{discoveryDone ? "Prove understanding" : "Check answer"}</Button>
    </form>}
    {stage === "transfer" && <form className="space-y-5" onSubmit={(event) => { event.preventDefault(); if (transferDone) setStage("reflection"); else checkTransfer(); }}>
      <p className="text-xs text-muted-foreground">Demo · {transferQuestion.label}</p>
      {transferQuestion.chain && <FoodChain organisms={transferQuestion.chain} />}
      <fieldset className="space-y-3"><legend className="mb-3 text-base font-semibold">{transferQuestion.prompt}</legend><AnswerChoices name="transfer" lettered options={transferQuestion.options} selected={transferAnswer} disabled={transferDone} onSelect={(answer) => { setTransferAnswer(answer); setTransferFeedback(""); }} /></fieldset>
      <p role="status" aria-atomic="true" className="text-sm leading-6 text-primary">{transferFeedback}</p>
      <Button type="submit" className="w-full" disabled={!transferAnswer}>{transferDone ? "Continue" : "Check answer"}</Button>
    </form>}
    {stage === "reflection" && <form className="space-y-5" onSubmit={(event) => { event.preventDefault(); if (reflection.trim()) {
      setSaved(saveFoodChainsResult({ mastery: assistedTransfer ? "Developing" : "Understanding", evidence: assistedTransfer ? "assisted-transfer" : "transfer", reflection: reflection.trim() }));
      setStage("complete");
    } }}>
      <label htmlFor="reflection" className="block text-base font-semibold">{content.reflectionPrompt}</label>
      <textarea id="reflection" rows={3} maxLength={600} value={reflection} onChange={(event) => setReflection(event.target.value)} className="w-full rounded-2xl border border-border bg-card p-3 text-base leading-6" />
      <Button type="submit" className="w-full" disabled={!reflection.trim()}>Finish lesson</Button>
    </form>}
    {stage === "complete" && <section aria-label="Lesson completed" className="space-y-5">
      <h2 className="text-lg font-semibold">Food Chains</h2>
      <p className="rounded-2xl bg-secondary p-4 font-semibold">{assistedTransfer ? "Developing · Keep practising" : "Developing → Understanding"}</p>
      {assistedTransfer && bestResult?.mastery === "Understanding" && <p className="text-sm leading-6">This practice needed guidance. Your best demonstrated mastery remains Understanding.</p>}
      <p className="text-sm leading-6">{assistedTransfer ? content.assistedExplanation : prompt?.source === "ai" && prompt.reasoningType !== "misconception" ? content.completionAfterReview : content.completionExplanation}</p>
      {!saved && <p role="status" className="text-sm leading-6">You can continue, but this browser couldn’t save your result.</p>}
      <Button asChild className="w-full"><Link href="/dashboard">Back to learning</Link></Button>
    </section>}
  </div>;
}
