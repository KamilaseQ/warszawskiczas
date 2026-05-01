import { NextRequest, NextResponse } from "next/server";
import { normalizeAccountStatus, normalizeRole } from "@/domain/permissions";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/api-guard";
import { writeAuditLog } from "@/lib/audit";

function createInviteCode() {
  return `WC-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

export async function GET() {
  const guard = await requirePermission("users:manage");
  if (!guard.ok) return guard.response;

  const invitations = await prisma.invitation.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
    include: {
      createdBy: { select: { username: true } },
      usedBy: { select: { username: true } },
    },
  });

  return NextResponse.json(invitations);
}

export async function POST(request: NextRequest) {
  const guard = await requirePermission("users:manage", request);
  if (!guard.ok) return guard.response;

  const data = await request.json().catch(() => ({}));
  const role = normalizeRole(data.role);
  const accountStatus = normalizeAccountStatus(role, data.accountStatus || "active");
  const expiresAt = data.expiresAt ? new Date(data.expiresAt) : null;

  const invitation = await prisma.invitation.create({
    data: {
      code: createInviteCode(),
      role,
      accountStatus,
      expiresAt,
      createdById: guard.session.userId,
    },
  });

  await writeAuditLog({
    actor: guard.session,
    action: "invitation.created",
    targetType: "invitation",
    targetId: invitation.id,
    details: { role, accountStatus },
  });

  return NextResponse.json(invitation, { status: 201 });
}
