import { Check, Circle, Sprout, Sparkles } from "lucide-react";
import type { MasteryState } from "@/types/learning";
import { cn } from "@/lib/utils";

const masteryStyles = {
  "Needs Practice": { icon: Circle, className: "bg-[#f7e7da] text-[#7c4325]" },
  Developing: { icon: Sprout, className: "bg-[#f5edcc] text-[#705615]" },
  Understanding: { icon: Check, className: "bg-[#dfede2] text-[#245137]" },
  Strong: { icon: Sparkles, className: "bg-[#e6e4f3] text-[#51437b]" },
} satisfies Record<MasteryState, { icon: typeof Circle; className: string }>;

export function MasteryBadge({ state }: { state: MasteryState }) {
  const { icon: Icon, className } = masteryStyles[state];
  return <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold", className)}><Icon aria-hidden="true" className="size-3.5" />{state}</span>;
}
