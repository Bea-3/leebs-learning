import { Sprout } from "lucide-react";
import { cn } from "@/lib/utils";

export function Brand({ className }: { className?: string }) {
  return <span className={cn("inline-flex items-center gap-2.5 text-2xl font-extrabold tracking-tight text-primary", className)}><span className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><Sprout aria-hidden="true" className="size-6" /></span>leebs<span className="text-accent-foreground">.</span></span>;
}
