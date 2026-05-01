import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/api-guard";

export async function GET() {
  const guard = await requirePermission("notifications:view");
  if (!guard.ok) return guard.response;

  const notifications = await prisma.notification.findMany({
    where: { userId: guard.session.userId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json({
    unread: notifications.filter((notification) => !notification.readAt).length,
    notifications,
  });
}
