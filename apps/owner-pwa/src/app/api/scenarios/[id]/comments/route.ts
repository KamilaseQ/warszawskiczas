import { NextRequest, NextResponse } from "next/server";
import { canEditScenario } from "@/domain/permissions";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/api-guard";
import { writeAuditLog } from "@/lib/audit";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requirePermission("scenario:view", request);
  if (!guard.ok) return guard.response;

  const { id } = await params;
  const { body } = await request.json();
  const text = String(body || "").trim();

  if (!text) {
    return NextResponse.json({ error: "Komentarz nie moze byc pusty" }, { status: 400 });
  }

  const scenario = await prisma.scenario.findUnique({
    where: { id },
    select: { id: true, authorId: true },
  });

  if (!scenario) {
    return NextResponse.json({ error: "Nie znaleziono scenariusza" }, { status: 404 });
  }

  if (guard.session.role === "viewer" && !canEditScenario(guard.session, scenario)) {
    return NextResponse.json({ error: "Brak uprawnien do komentowania" }, { status: 403 });
  }

  const comment = await prisma.scenarioComment.create({
    data: {
      scenarioId: id,
      authorId: guard.session.userId,
      authorName: guard.session.username,
      type: "comment",
      body: text,
    },
  });

  await prisma.scenarioActivity.create({
    data: {
      scenarioId: id,
      actorId: guard.session.userId,
      actorName: guard.session.username,
      action: "scenario.comment_added",
      note: text,
    },
  });

  await writeAuditLog({
    actor: guard.session,
    action: "scenario.comment_added",
    targetType: "scenario",
    targetId: id,
  });

  return NextResponse.json(comment, { status: 201 });
}
