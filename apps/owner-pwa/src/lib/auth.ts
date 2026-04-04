import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export type UserRole = "admin" | "owner" | "editor" | "viewer" | "pending";

export interface SessionPayload {
  username: string;
  role: UserRole;
  exp: number;
}

const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "fallback-secret-change-me"
);

const EXPIRATION = "24h";

export async function createSession(
  username: string,
  role: UserRole
): Promise<string> {
  const token = await new SignJWT({ username, role })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(EXPIRATION)
    .sign(SECRET);

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
    const { payload } = await jwtVerify(token, SECRET);
    const user = await prisma.user.findUnique({
      where: { username: payload.username as string },
      select: { role: true }
    });
    if (!user) return null;
    
    return { ...payload, role: user.role } as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function validateCredentials(
  username: string,
  password: string
): Promise<{ valid: boolean; role: UserRole | null }> {
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return { valid: false, role: null };

    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      return { valid: true, role: user.role as UserRole };
    }
  } catch (error) {
    console.error("Auth error:", error);
  }
  return { valid: false, role: null };
}
