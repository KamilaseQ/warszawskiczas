import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

/**
 * Hostinger shared hosting — key settings:
 * - Force 127.0.0.1 (not "localhost") to avoid unix socket issues
 * - connectionLimit: 2 (shared hosting has very low max_connections)
 * - connectTimeout + acquireTimeout to fail fast instead of hanging
 */
function createAdapter() {
  // Always use 127.0.0.1 for TCP on shared hosting, even if DB_HOST says "localhost"
  const rawHost = process.env.DB_HOST || "localhost";
  const host = rawHost === "localhost" ? "127.0.0.1" : rawHost;

  return new PrismaMariaDb({
    host,
    port: parseInt(process.env.DB_PORT || "3306"),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 2,
    connectTimeout: 5000,
    acquireTimeout: 5000,
  });
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  adapter: createAdapter(),
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

