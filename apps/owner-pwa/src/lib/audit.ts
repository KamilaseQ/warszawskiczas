import { prisma } from "@/lib/prisma";
import type { SessionPayload } from "@/lib/auth";

export async function writeAuditLog({
  actor,
  action,
  targetType,
  targetId,
  details,
}: {
  actor: Pick<SessionPayload, "userId" | "username"> | null;
  action: string;
  targetType: string;
  targetId?: string | null;
  details?: unknown;
}) {
  try {
    await prisma.auditLog.create({
      data: {
        actorId: actor?.userId ?? null,
        actorName: actor?.username ?? "system",
        action,
        targetType,
        targetId: targetId ?? null,
        details: details ? JSON.stringify(details) : null,
      },
    });
  } catch (error) {
    console.error("Audit log error:", error);
  }
}
