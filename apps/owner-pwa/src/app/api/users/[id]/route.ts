import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { normalizeAccountStatus, normalizeRole } from "@/domain/permissions";
import { validatePassword, PASSWORD_RULE_TEXT } from "@/domain/password";
import { requirePermission } from "@/lib/api-guard";
import { writeAuditLog } from "@/lib/audit";

async function wouldRemoveLastActiveOwner(
  userId: string,
  nextRole?: string,
  nextStatus?: string
) {
  const current = await prisma.user.findUnique({ where: { id: userId } });
  if (!current) return false;

  const isCurrentOwner =
    normalizeRole(current.role) === "owner" &&
    normalizeAccountStatus(current.role, current.accountStatus) === "active";
  if (!isCurrentOwner) return false;

  const willStillBeOwner =
    normalizeRole(nextRole ?? current.role) === "owner" &&
    normalizeAccountStatus(nextRole ?? current.role, nextStatus ?? current.accountStatus) ===
      "active";
  if (willStillBeOwner) return false;

  const otherOwners = await prisma.user.count({
    where: {
      id: { not: userId },
      accountStatus: "active",
      OR: [{ role: "owner" }, { role: "admin" }],
    },
  });

  return otherOwners === 0;
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const guard = await requirePermission("users:manage", request);
    if (!guard.ok) return guard.response;

    const { id } = await params;
    const data = await request.json();

    const updateData: { role?: string; accountStatus?: string; password?: string } = {};

    if (data.role) updateData.role = normalizeRole(data.role);
    if (data.accountStatus) {
      updateData.accountStatus = normalizeAccountStatus(updateData.role, data.accountStatus);
    }
    if (data.password) {
      if (!validatePassword(data.password)) {
        return NextResponse.json({ error: PASSWORD_RULE_TEXT }, { status: 400 });
      }
      updateData.password = await bcrypt.hash(data.password, 12);
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "Brak danych do aktualizacji" }, { status: 400 });
    }

    if (await wouldRemoveLastActiveOwner(id, updateData.role, updateData.accountStatus)) {
      return NextResponse.json(
        { error: "Nie mozna odebrac dostepu ostatniemu aktywnemu wlascicielowi." },
        { status: 409 }
      );
    }

    const updated = await prisma.user.update({
      where: { id },
      data: updateData,
      select: { id: true, username: true, role: true, accountStatus: true }
    });

    await writeAuditLog({
      actor: guard.session,
      action: "user.updated",
      targetType: "user",
      targetId: updated.id,
      details: { role: updateData.role, accountStatus: updateData.accountStatus },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json({ error: "Wystapil blad." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const guard = await requirePermission("users:manage", request);
    if (!guard.ok) return guard.response;

    const { id } = await params;

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (user.username === guard.session.username) {
        return NextResponse.json({ error: "Nie możesz usunąć własnego konta z tego poziomu." }, { status: 403 });
    }

    if (await wouldRemoveLastActiveOwner(id, "viewer", "suspended")) {
      return NextResponse.json(
        { error: "Nie mozna usunac ostatniego aktywnego wlasciciela." },
        { status: 409 }
      );
    }

    await prisma.user.delete({ where: { id } });

    await writeAuditLog({
      actor: guard.session,
      action: "user.deleted",
      targetType: "user",
      targetId: id,
      details: { username: user.username, role: user.role },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete user error:", error);
    return NextResponse.json({ error: "Wystapil blad." }, { status: 500 });
  }
}
