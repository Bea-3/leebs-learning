import type { Metadata } from "next";
import { NotebookPen, Quote } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { PrimaryButton } from "@/components/primary-button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = { title: "Your journal" };

export default function JournalPage() {
  return <><PageHeader eyebrow="Your learning journal" title="Put it in your own words." description="A small space for the ideas that clicked, the questions you asked, and what changed your thinking." /><Card className="flex flex-col items-center gap-5 px-6 py-10 text-center"><span className="flex size-20 items-center justify-center rounded-3xl bg-accent text-accent-foreground"><NotebookPen aria-hidden="true" className="size-9" /></span><div className="space-y-2"><h2 className="text-xl font-semibold">Your first reflection is ahead</h2><p className="max-w-sm text-sm leading-6 text-muted-foreground">After a learning activity, you’ll pause to explain what you understood. Those reflections will appear here.</p></div><PrimaryButton href="/learn" className="w-full sm:w-auto">Explore Biology</PrimaryButton></Card><Card className="space-y-3 border-transparent bg-secondary shadow-none"><Quote aria-hidden="true" className="size-5 text-primary" /><p className="eyebrow">A question to keep in mind</p><p className="text-lg font-medium leading-7">“How would I explain this idea to a friend?”</p><p className="text-sm leading-6 text-muted-foreground">You don’t need perfect words. Start with what makes sense to you.</p></Card></>;
}
