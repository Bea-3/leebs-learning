import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { JournalHistory } from "@/components/journal-history";
export const metadata: Metadata = { title: "Your journal" };
export default function JournalPage() {
  return <><PageHeader eyebrow="Your learning journal" title="Put it in your own words." description="Look back at the idea you worked through and what helped it make sense." /><JournalHistory /></>;
}
