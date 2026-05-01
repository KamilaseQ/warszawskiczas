import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { normalizeAccountStatus, normalizeRole } from "@/domain/permissions";
import { PASSWORD_RULE_TEXT, validatePassword, validateUsername } from "@/domain/password";
import { writeAuditLog } from "@/lib/audit";

export async function POST(request: NextRequest) {
  try {
    const { username, password, inviteCode } = await request.json();

    const invitation = await prisma.invitation.findUnique({
      where: { code: String(inviteCode || "").trim() },
    });

    if (
      !invitation ||
      invitation.usedAt ||
      (invitation.expiresAt && invitation.expiresAt < new Date())
    ) {
      return NextResponse.json(
        { error: "Zaproszenie jest nieprawidlowe albo wygaslo." },
        { status: 403 }
      );
    }

    if (!username || !validateUsername(username)) {
      return NextResponse.json(
        { error: "Nazwa uzytkownika musi miec od 3 do 30 znakow i moze zawierac litery, cyfry oraz podkreslenie." },
        { status: 400 }
      );
    }

    if (!password || !validatePassword(password)) {
      return NextResponse.json({ error: PASSWORD_RULE_TEXT }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return NextResponse.json(
        { error: "Użytkownik o takiej nazwie już istnieje." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const role = normalizeRole(invitation.role);
    const accountStatus = normalizeAccountStatus(role, invitation.accountStatus);

    const user = await prisma.$transaction(async (tx) => {
      const created = await tx.user.create({
        data: {
          username,
          password: hashedPassword,
          role,
          accountStatus,
        },
      });

      await tx.invitation.update({
        where: { id: invitation.id },
        data: { usedAt: new Date(), usedById: created.id },
      });

      return created;
    });

    await writeAuditLog({
      actor: null,
      action: "user.registered_from_invitation",
      targetType: "user",
      targetId: user.id,
      details: { username: user.username, role, accountStatus },
    });

    return NextResponse.json({ success: true, username: user.username });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Błąd podczas rejestracji." },
      { status: 500 }
    );
  }
}
