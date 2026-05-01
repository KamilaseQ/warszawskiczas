import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { validatePassword, validateUsername, PASSWORD_RULE_TEXT } from "@/domain/password";
import { requireActiveSession } from "@/lib/api-guard";

export async function PUT(request: NextRequest) {
  const guard = await requireActiveSession(request);
  if (!guard.ok) return guard.response;
  const session = guard.session;

  try {
    const { username, password } = await request.json();

    if (!username || !validateUsername(username)) {
      return NextResponse.json(
        { error: "Login musi miec od 3 do 30 znakow i moze zawierac litery, cyfry oraz podkreslenie." },
        { status: 400 }
      );
    }

    // Since we're using session username to identify the user
    const user = await prisma.user.findUnique({
      where: { username: session.username as string },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const dataToUpdate: { username: string; password?: string } = { username };

    if (password) {
      if (!validatePassword(password)) {
        return NextResponse.json({ error: PASSWORD_RULE_TEXT }, { status: 400 });
      }
      dataToUpdate.password = await bcrypt.hash(password, 12);
    }

    // Check if new username is taken by someone else
    if (username !== user.username) {
      const existing = await prisma.user.findUnique({ where: { username } });
      if (existing) {
        return NextResponse.json({ error: "Nazwa użytkownika jest już zajęta" }, { status: 400 });
      }
    }

    await prisma.user.update({
      where: { id: user.id },
      data: dataToUpdate,
    });

    if (username !== user.username) {
      // Re-issue session with new username so they stay logged in
      await createSession(session.userId, username, session.role, session.accountStatus);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("User update error:", error);
    return NextResponse.json({ error: "Wystąpił błąd podczas zapisywania" }, { status: 500 });
  }
}
