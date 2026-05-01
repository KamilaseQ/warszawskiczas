import { NextResponse } from "next/server";
import { requirePermission } from "@/lib/api-guard";

export async function GET() {
  const guard = await requirePermission("users:manage");
  if (!guard.ok) {
    return NextResponse.json({ status: "ok" }, { status: 200 });
  }

  const diagnostics: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    env: {
      DATABASE_URL: !!process.env.DATABASE_URL,
      AUTH_SECRET: !!process.env.AUTH_SECRET,
      ADMIN_USERNAME: !!process.env.ADMIN_USERNAME,
    },
  };

  // Test: Prisma connection
  try {
    // Dynamic import to avoid crashing if DATABASE_URL is missing
    const { prisma } = await import("@/lib/prisma");
    const userCount = await prisma.user.count();
    diagnostics.database = { status: "connected", userCount };
  } catch {
    diagnostics.database = { status: "error" };
  }

  return NextResponse.json(diagnostics, { status: 200 });
}
