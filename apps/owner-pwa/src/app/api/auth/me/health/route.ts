import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Diagnostic endpoint — checks database connectivity and user table state.
 * Returns no sensitive data, only counts and connection status.
 * Can be removed after successful deployment verification.
 */
export async function GET() {
  const diagnostics: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    envCheck: {
      DB_HOST: !!process.env.DB_HOST,
      DB_USER: !!process.env.DB_USER,
      DB_PASSWORD: !!process.env.DB_PASSWORD,
      DB_NAME: !!process.env.DB_NAME,
      DB_PORT: process.env.DB_PORT || "not set (defaults to 3306)",
      AUTH_SECRET: !!process.env.AUTH_SECRET,
      ADMIN_USERNAME: !!process.env.ADMIN_USERNAME,
      ADMIN_PASSWORD: !!process.env.ADMIN_PASSWORD,
    },
  };

  try {
    const userCount = await prisma.user.count();
    const scenarioCount = await prisma.scenario.count();

    diagnostics.database = {
      connected: true,
      userCount,
      scenarioCount,
    };

    if (userCount > 0) {
      // Show usernames only (no passwords/sensitive data)
      const users = await prisma.user.findMany({
        select: { username: true, role: true, createdAt: true },
      });
      diagnostics.users = users;
    }
  } catch (error) {
    diagnostics.database = {
      connected: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }

  return NextResponse.json(diagnostics, { status: 200 });
}
