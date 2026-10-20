"use client";

import { useSyncExternalStore } from "react";
import { z } from "zod";

export const FOOD_CHAINS_PROGRESS_KEY = "leebs.food-chains.v1";
const resultSchema = z.object({
  version: z.literal(1), lessonCompleted: z.literal(true),
  mastery: z.enum(["Developing", "Understanding"]),
  evidence: z.enum(["quick-check", "transfer", "assisted-transfer"]),
  reflection: z.string().max(600).nullable(), completedAt: z.string().datetime(),
});
export type FoodChainsResult = z.infer<typeof resultSchema>;
let snapshot: FoodChainsResult | null = null;
let initialized = false;
const listeners = new Set<() => void>();

function readStoredResult() {
  try {
    const raw = window.localStorage.getItem(FOOD_CHAINS_PROGRESS_KEY);
    const parsed = raw ? resultSchema.safeParse(JSON.parse(raw)) : null;
    return parsed?.success ? parsed.data : null;
  } catch { return null; }
}
function getSnapshot() {
  if (!initialized && typeof window !== "undefined") {
    initialized = true;
    snapshot = readStoredResult();
  }
  return snapshot;
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === FOOD_CHAINS_PROGRESS_KEY || event.key === null) {
      snapshot = readStoredResult();
      listeners.forEach((notify) => notify());
    }
  };
  window.addEventListener("storage", onStorage);
  return () => { listeners.delete(listener); window.removeEventListener("storage", onStorage); };
}
const serverSnapshot = () => null;
export function useFoodChainsResult() {
  return useSyncExternalStore(subscribe, getSnapshot, serverSnapshot);
}

export function saveFoodChainsResult(result: Omit<FoodChainsResult, "version" | "completedAt" | "lessonCompleted">): boolean {
  const previous = getSnapshot();
  const incoming = resultSchema.parse({ ...result, version: 1, lessonCompleted: true, completedAt: new Date().toISOString() });
  const reflection = incoming.reflection?.trim() || previous?.reflection || null;
  // Mastery, evidence and completedAt describe the best result together.
  // The latest reflection may come from later practice, including an assisted attempt.
  snapshot = previous?.mastery === "Understanding" && incoming.mastery === "Developing"
    ? { ...previous, reflection }
    : { ...incoming, reflection };
  initialized = true;
  let saved = true;
  try { window.localStorage.setItem(FOOD_CHAINS_PROGRESS_KEY, JSON.stringify(snapshot)); }
  catch { saved = false; }
  listeners.forEach((notify) => notify());
  return saved;
}
