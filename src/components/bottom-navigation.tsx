"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, House, NotebookPen } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Home", icon: House },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/journal", label: "Journal", icon: NotebookPen },
];

export function BottomNavigation() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main navigation" className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-card pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto grid max-w-2xl grid-cols-3 px-4 py-2">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary",
                active && "bg-secondary text-primary",
              )}
            >
              <Icon aria-hidden="true" className="size-5" strokeWidth={active ? 2.4 : 1.8} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
