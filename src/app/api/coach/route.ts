import "server-only";
import { handleCoachRequest } from "@/lib/coach-handler.server";

export const runtime = "nodejs";
export async function POST(request: Request) {
  return handleCoachRequest(request);
}
