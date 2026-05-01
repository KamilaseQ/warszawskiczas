import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/api-guard";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requirePermission("notifications:view", request);
  if (!guard.ok) return guard.response;

  const { id } = await params;
  const notification = await prisma.notification.findFirst({
    where: { id, userId: guard.session.userId },
  });

  if (!notification) {
    return NextResponse.json({ error: "Nie znaleziono powiadomienia" }, { status: 404 });
  }

  const updated = await prisma.notification.update({
    where: { id },
    data: { readAt: new Date() },
  });

  return NextResponse.json(updated);
}
