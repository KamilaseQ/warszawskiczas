import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

// Fix for Hostinger/cPanel typical connection issues:
// "localhost" often attempts to use a unix socket which NodeJS does not have access to. We enforce TCP by using 127.0.0.1
function createAdapter() {
  return new PrismaMariaDb({
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
  });
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  adapter: createAdapter(),
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

