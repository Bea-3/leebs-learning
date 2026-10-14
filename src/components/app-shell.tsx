"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brand } from "@/components/brand";
import { BottomNavigation } from "@/components/bottom-navigation";
import { demoLearner } from "@/data/demo";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const isActiveLesson = usePathname() === "/learn/food-chains/lesson";
  return (
    <div className={cn("mx-auto min-h-dvh max-w-3xl px-5 sm:px-8", isActiveLesson ? "pb-[calc(2rem+env(safe-area-inset-bottom))]" : "pb-[calc(7rem+env(safe-area-inset-bottom))]")}>
      <header className="flex items-center justify-between py-6">
        <Link href="/dashboard" aria-label="Leebs home"><Brand /></Link>
        <span
          className="flex size-10 items-center justify-center rounded-full border border-border bg-accent text-sm font-bold text-accent-foreground"
          aria-label={demoLearner.name}
        >
          {demoLearner.name[0]}
        </span>
      </header>
      <main id="main-content" className="space-y-7">
        {children}
      </main>
      {!isActiveLesson && <BottomNavigation />}
    </div>
  );
}
