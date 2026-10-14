"use client";
import { MasteryBadge } from "@/components/mastery-badge";
import { useFoodChainsResult } from "@/lib/food-chains-progress";
export function FoodChainsMastery() {
  const result = useFoodChainsResult();
  return <MasteryBadge state={result?.mastery ?? "Needs Practice"} />;
}
