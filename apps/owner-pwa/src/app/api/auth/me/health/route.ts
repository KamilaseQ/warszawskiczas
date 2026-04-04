import { NextResponse } from "next/server";

export async function GET() {
  const diagnostics: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    env: {
      DATABASE_URL: !!process.env.DATABASE_URL,
      AUTH_SECRET: !!process.env.AUTH_SECRET,
      ADMIN_USERNAME: !!process.env.ADMIN_USERNAME,
      INVITE_CODE: !!process.env.INVITE_CODE,
      DB_HOST: process.env.DB_HOST || "(not set)",
    },
  };

  // Test: Prisma connection
  try {
    // Dynamic import to avoid crashing if DATABASE_URL is missing
    const { prisma } = await import("@/lib/prisma");
    const userCount = await prisma.user.count();
    diagnostics.database = { status: "connected", userCount };
  } catch (e) {
    diagnostics.database = { status: "error", message: String(e) };
  }

  return NextResponse.json(diagnostics, { status: 200 });
}
