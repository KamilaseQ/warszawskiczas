import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import {
  normalizeAccountStatus,
  normalizeRole,
  type AccountStatus,
  type UserRole,
} from "@/domain/permissions";

export interface SessionPayload {
  userId: string;
  username: string;
  role: UserRole;
  accountStatus: AccountStatus;
  exp: number;
}

// Lazy secret — never throw at module level
function getSecret(): Uint8Array {
  const raw = process.env.AUTH_SECRET;
  if (!raw) throw new Error("AUTH_SECRET is not set");
  return new TextEncoder().encode(raw);
}

const EXPIRATION = "24h";

export async function createSession(
  userId: string,
  username: string,
  role: UserRole,
  accountStatus: AccountStatus
): Promise<string> {
  const token = await new SignJWT({ userId, username, role, accountStatus })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(EXPIRATION)
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return token;
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    const user = await prisma.user.findUnique({
      where: { username: payload.username as string },
      select: { id: true, username: true, role: true, accountStatus: true },
    });
    if (!user) return null;

    return {
      userId: user.id,
      username: user.username,
      role: normalizeRole(user.role),
      accountStatus: normalizeAccountStatus(user.role, user.accountStatus),
      exp: payload.exp ?? 0,
    } as SessionPayload;
  } catch {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

/**
 * Auto-seed: creates admin & owner users from env vars if no users exist in the database.
 * Runs only once — subsequent calls are no-ops (guarded by a flag + DB check).
 */
let seedChecked = false;

export async function ensureAdminExists(): Promise<void> {
  if (seedChecked) return;
  seedChecked = true;

  try {
    const userCount = await prisma.user.count();
    if (userCount > 0) return; // users already exist, nothing to do

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      console.warn("⚠️  No users in DB and ADMIN_USERNAME/ADMIN_PASSWORD env vars are missing — cannot auto-seed.");
      return;
    }

    const hashedAdmin = await bcrypt.hash(adminPassword, 12);
    await prisma.user.create({
      data: {
        username: adminUsername,
        password: hashedAdmin,
        role: "owner",
        accountStatus: "active",
      },
    });
    console.log(`Auto-seeded owner user: "${adminUsername}"`);

    // Also seed owner if env vars are provided
    const ownerUsername = process.env.OWNER_USERNAME;
    const ownerPassword = process.env.OWNER_PASSWORD;
    if (ownerUsername && ownerPassword) {
      const hashedOwner = await bcrypt.hash(ownerPassword, 12);
      await prisma.user.create({
        data: {
          username: ownerUsername,
          password: hashedOwner,
          role: "owner",
          accountStatus: "active",
        },
      });
      console.log(`Auto-seeded owner user: "${ownerUsername}"`);
    }
  } catch (error) {
    console.error("Auto-seed error:", error);
    seedChecked = false;
    // Don't throw — seed failure shouldn't block login for existing users
  }
}

export async function validateCredentials(
  username: string,
  password: string
): Promise<{
  valid: boolean;
  user:
    | {
        id: string;
        username: string;
        role: UserRole;
        accountStatus: AccountStatus;
      }
    | null;
  dbError?: boolean;
}> {
  // Ensure admin user exists on first login attempt
  await ensureAdminExists();

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return { valid: false, user: null };

    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      return {
        valid: true,
        user: {
          id: user.id,
          username: user.username,
          role: normalizeRole(user.role),
          accountStatus: normalizeAccountStatus(user.role, user.accountStatus),
        },
      };
    }
    return { valid: false, user: null };
  } catch (error) {
    console.error("DB/Auth error:", error);
    return { valid: false, user: null, dbError: true };
  }
}
