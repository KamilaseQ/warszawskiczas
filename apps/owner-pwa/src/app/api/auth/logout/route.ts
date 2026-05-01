import { NextRequest, NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";
import { requireActiveSession } from "@/lib/api-guard";

export async function POST(request: NextRequest) {
  const guard = await requireActiveSession(request);
  if (!guard.ok && guard.response.status !== 401) return guard.response;
  await destroySession();
  return NextResponse.json({ success: true });
}
