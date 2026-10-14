import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// shadcn/ui Card primitive with a compact server-rendered API.
export function Card({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card" className={cn("rounded-3xl border border-border bg-card p-5 shadow-sm", className)} {...props} />;
}
