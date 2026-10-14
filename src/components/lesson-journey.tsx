"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FoodChain } from "@/components/food-chain";
import { ProgressBar } from "@/components/progress-bar";
import type { AnswerOption, Lesson, Question } from "@/types/learning";

function AnswerChoices({ options, selected, onSelect, disabled = false, name }: {
  options: AnswerOption[]; selected: string | null; onSelect: (id: string) => void; disabled?: boolean; name: string;
}) {
  return <div className="space-y-2">{options.map((option, index) => <label key={option.id} className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl border p-3 text-sm ${selected === option.id ? "border-primary bg-secondary font-semibold" : "border-border bg-card"} ${disabled ? "cursor-default" : "hover:bg-secondary"}`}>
    <input className="size-5 shrink-0 accent-primary" type="radio" name={name} value={option.id} checked={selected === option.id} disabled={disabled} onChange={() => onSelect(option.id)} />
    <span>{name === "assessment" && `${String.fromCharCode(65 + index)}. `}{option.text}</span>
    {selected === option.id && <span className="ml-auto text-xs text-primary">Selected</span>}
  </label>)}</div>;
}

export function LessonJourney({ lesson, question }: { lesson: Lesson; question: Question }) {
  const [position, setPosition] = useState(0);
  const [knowledgeAnswer, setKnowledgeAnswer] = useState<string | null>(null);
  const [checkedKnowledgeAnswer, setCheckedKnowledgeAnswer] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(false);
  const step = lesson.sections[position];
  const check = step?.knowledgeCheck;
  const knowledgeCorrect = !check || checkedKnowledgeAnswer === check.correctAnswerId;
  const assessment = position === lesson.sections.length;
  const correct = submitted && selectedAnswer === question.correctAnswerId;

  useEffect(() => {
    if (mounted.current) {
      headingRef.current?.focus();
      headingRef.current?.scrollIntoView({ block: "start" });
    }
    mounted.current = true;
  }, [position, submitted]);

  function restart() {
    setPosition(0);
    setKnowledgeAnswer(null);
    setCheckedKnowledgeAnswer(null);
    setSelectedAnswer(null);
    setSubmitted(false);
  }

  return <div className="mx-auto max-w-xl space-y-5">
    <Link href="/learn/food-chains" className="inline-flex min-h-12 items-center text-sm font-semibold text-primary">← Topic overview</Link>
    <p className="eyebrow">Food Chains & Energy Flow</p>
    <ProgressBar value={assessment ? lesson.sections.length : position + 1} max={lesson.sections.length} label={assessment ? "Learning steps finished · Quick Check" : "Lesson step"} />
    {assessment ? <>
      <header className="space-y-2"><p className="text-xs text-muted-foreground">Demo · {question.label}</p><h1 ref={headingRef} tabIndex={-1} className="text-3xl font-bold tracking-tight">{submitted ? (correct ? "That’s right!" : "Not quite — let’s look at your thinking.") : "Quick Check"}</h1></header>
      {submitted ? <section aria-label="Your result" className="space-y-5">
        <div role="status" className="rounded-2xl bg-secondary p-5 text-sm leading-6">
          {correct ? question.explanation : "Next, Leebs will help you work through why you chose that answer. Guided coaching is coming in the next phase."}
        </div>
        <p className="text-sm text-muted-foreground">This is the end of today’s demo activity. Your sample mastery stays the same.</p>
        <Button asChild className="w-full"><Link href="/dashboard">Back to your journey</Link></Button>
        <Button variant="outline" className="w-full" onClick={restart}>Retry lesson</Button>
      </section> : <>
        {question.chain && <FoodChain organisms={question.chain} />}
        <form onSubmit={(event) => { event.preventDefault(); if (selectedAnswer) setSubmitted(true); }} className="space-y-5">
          <fieldset className="space-y-4"><legend className="mb-4 text-lg font-semibold">{question.prompt}</legend><AnswerChoices name="assessment" options={question.options} selected={selectedAnswer} onSelect={setSelectedAnswer} /></fieldset>
          <p className="text-xs text-muted-foreground">Choose one answer, then check it.</p>
          <div className="flex gap-3"><Button type="button" variant="outline" onClick={() => setPosition(position - 1)}>Back</Button><Button type="submit" className="flex-1" disabled={!selectedAnswer}>Check Answer</Button></div>
        </form>
      </>}
    </> : <>
      <h1 ref={headingRef} tabIndex={-1} className="text-3xl font-bold tracking-tight">{step.heading}</h1>
      <p className="text-base leading-7">{step.body}</p>
      {step.chain && <FoodChain organisms={step.chain} />}
      {step.example && <p className="text-sm leading-6 text-muted-foreground">{step.example}</p>}
      {check ? <fieldset className="space-y-3"><legend className="mb-3 text-sm font-semibold">{check.prompt}</legend>
        <AnswerChoices name="knowledge" options={check.options} selected={knowledgeAnswer} onSelect={(answer) => {
          setKnowledgeAnswer(answer);
          setCheckedKnowledgeAnswer(null);
        }} />
        <p role="status" aria-atomic="true" className="text-sm leading-6 text-primary">{checkedKnowledgeAnswer && (knowledgeCorrect ? check.correctFeedback : check.retryFeedback)}</p>
      </fieldset> : step.think && <p className="border-l-2 border-primary pl-4 text-sm font-medium leading-6">{step.think}</p>}
      <div className="flex gap-3">
        {position > 0 && <Button variant="outline" onClick={() => setPosition(position - 1)}>Back</Button>}
        <Button className="flex-1" disabled={!!check && !knowledgeAnswer} onClick={() => {
          if (check && !knowledgeCorrect) setCheckedKnowledgeAnswer(knowledgeAnswer);
          else setPosition(position + 1);
        }}>{check && !knowledgeCorrect ? "Check answer" : position === lesson.sections.length - 1 ? "Go to Quick Check" : "Continue"}</Button>
      </div>
    </>}
  </div>;
}
