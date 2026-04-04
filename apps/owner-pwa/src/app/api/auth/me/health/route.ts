import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as mariadb from "mariadb";

export async function GET() {
  const diagnostics: Record<string, any> = {
    timestamp: new Date().toISOString(),
    envCheck: {
      DB_HOST: process.env.DB_HOST, // Show raw host to trace localhost vs IP
      DB_USER: !!process.env.DB_USER,
      DB_PASSWORD: !!process.env.DB_PASSWORD,
      DB_NAME: !!process.env.DB_NAME,
      DB_PORT: process.env.DB_PORT || "3306"
    },
    rawTests: {},
  };

  // Test 1: Raw MariaDB default connection
  try {
    const rawConn = await mariadb.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT || 3306),
      connectTimeout: 1500, // VERY short to avoid 503 Proxy timeout
    });
    diagnostics.rawTests.default = "success";
    await rawConn.end();
  } catch (e) {
    diagnostics.rawTests.default = { error: String(e) };
  }

  // Test 2: Raw MariaDB forcing 127.0.0.1 (TCP IPv4)
  try {
    const rawConn2 = await mariadb.createConnection({
      host: "127.0.0.1",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT || 3306),
      connectTimeout: 1500, // VERY short to avoid 503 Proxy timeout
    });
    diagnostics.rawTests.ipv4 = "success";
    await rawConn2.end();
  } catch (e) {
    diagnostics.rawTests.ipv4 = { error: String(e) };
  }

  // Test 3: Prisma check (SKIPPED to avoid 10-second pool timeout causing 503)
  diagnostics.prisma = { skipped: "True due to 503 risk" };

  return NextResponse.json(diagnostics, { status: 200 });
}
