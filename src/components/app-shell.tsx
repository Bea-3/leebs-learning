import Link from "next/link";
import { Brand } from "@/components/brand";
import { BottomNavigation } from "@/components/bottom-navigation";
import { demoLearner } from "@/data/demo";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-dvh max-w-3xl px-5 pb-[calc(7rem+env(safe-area-inset-bottom))] sm:px-8">
      <header className="flex items-center justify-between py-6">
        <Link href="/dashboard" aria-label="Leebs home"><Brand /></Link>
        <span
          className="flex size-10 items-center justify-center rounded-full border border-border bg-accent text-sm font-bold text-accent-foreground"
          aria-label={`${demoLearner.name}, demo learner`}
        >
          {demoLearner.name[0]}
        </span>
      </header>
      <main id="main-content" className="space-y-7">
        {children}
        <p className="pt-2 text-center text-xs leading-5 text-muted-foreground">
          Demo preview · Sample progress · No data is saved yet
        </p>
      </main>
      <BottomNavigation />
    </div>
  );
}
