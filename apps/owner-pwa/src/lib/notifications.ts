import { normalizeRole, type UserRole } from "@/domain/permissions";
import { prisma } from "@/lib/prisma";

export async function notifyUsers({
  userIds,
  scenarioId,
  type,
  title,
  body,
}: {
  userIds: string[];
  scenarioId?: string | null;
  type: string;
  title: string;
  body: string;
}) {
  const uniqueIds = [...new Set(userIds.filter(Boolean))];
  if (uniqueIds.length === 0) return;

  await prisma.notification.createMany({
    data: uniqueIds.map((userId) => ({
      userId,
      scenarioId: scenarioId ?? null,
      type,
      title,
      body,
    })),
  });
}

export async function notifyRole({
  role,
  scenarioId,
  type,
  title,
  body,
}: {
  role: UserRole;
  scenarioId?: string | null;
  type: string;
  title: string;
  body: string;
}) {
  const users = await prisma.user.findMany({
    where: {
      accountStatus: "active",
      OR:
        role === "owner"
          ? [{ role: "owner" }, { role: "admin" }]
          : [{ role }],
    },
    select: { id: true, role: true },
  });

  await notifyUsers({
    userIds: users.filter((user) => normalizeRole(user.role) === role).map((user) => user.id),
    scenarioId,
    type,
    title,
    body,
  });
}
