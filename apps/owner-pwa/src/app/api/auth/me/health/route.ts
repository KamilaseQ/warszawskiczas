import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as mariadb from "mariadb";

export async function GET() {
  const diagnostics: Record<string, any> = {
    timestamp: new Date().toISOString(),
    envCheck: {
      DB_HOST: process.env.DB_HOST,
      DB_USER: !!process.env.DB_USER,
      DB_PASSWORD: !!process.env.DB_PASSWORD,
      DB_NAME: !!process.env.DB_NAME,
      DB_PORT: process.env.DB_PORT || "3306",
      AUTH_SECRET: !!process.env.AUTH_SECRET,
      ADMIN_USERNAME: !!process.env.ADMIN_USERNAME,
      INVITE_CODE: !!process.env.INVITE_CODE,
    },
    rawTests: {},
  };

  // Test 1: Raw MariaDB via 127.0.0.1 (forced TCP)
  try {
    const rawConn = await mariadb.createConnection({
      host: "127.0.0.1",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT || 3306),
      connectTimeout: 3000,
    });
    const rows = await rawConn.query("SELECT 1 as ok");
    diagnostics.rawTests.tcp = { status: "success", result: rows };
    await rawConn.end();
  } catch (e) {
    diagnostics.rawTests.tcp = { status: "error", error: String(e) };
  }

  // Test 2: Prisma via adapter (pool limit=2)
  try {
    const userCount = await prisma.user.count();
    diagnostics.prisma = { status: "success", userCount };
  } catch (e) {
    diagnostics.prisma = { status: "error", error: String(e) };
  }

  return NextResponse.json(diagnostics, { status: 200 });
}

