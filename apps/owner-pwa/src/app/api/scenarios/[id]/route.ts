import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/api-guard";
import { canEditScenario } from "@/domain/permissions";
import { normalizeScenarioStatus } from "@/domain/workflow";
import { presentScenario } from "@/lib/scenario-presenter";
import { notifyRole } from "@/lib/notifications";
import { writeAuditLog } from "@/lib/audit";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requirePermission("scenario:view");
  if (!guard.ok) return guard.response;

  const { id } = await params;

  const scenario = await prisma.scenario.findUnique({
    where: { id },
    include: {
      author: { select: { id: true, username: true, role: true } },
      comments: { orderBy: { createdAt: "asc" } },
      activities: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!scenario) {
    return NextResponse.json(
      { error: "Nie znaleziono scenariusza" },
      { status: 404 }
    );
  }

  return NextResponse.json(presentScenario(scenario, guard.session));
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requirePermission("scenario:edit-own", request);
  if (!guard.ok) return guard.response;

  const { id } = await params;

  try {
    const existing = await prisma.scenario.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Nie znaleziono scenariusza" }, { status: 404 });
    }

    if (!canEditScenario(guard.session, existing)) {
      return NextResponse.json({ error: "Brak uprawnien do edycji" }, { status: 403 });
    }

    const { title, description, ownerNote, dueAt, priority, submitForReview } =
      await request.json();

    if (!title || !description) {
      return NextResponse.json(
        { error: "Tytul i opis sa wymagane" },
        { status: 400 }
      );
    }

    const oldStatus = normalizeScenarioStatus(existing.status);
    const goesBackToReview =
      submitForReview || oldStatus === "accepted" || oldStatus === "ready_to_record";
    const nextStatus = goesBackToReview ? "in_review" : oldStatus;
    const nextVersion =
      oldStatus === "accepted" || oldStatus === "ready_to_record" || oldStatus === "recorded"
        ? existing.version + 1
        : existing.version;

    const scenario = await prisma.scenario.update({
      where: { id },
      data: {
        title: String(title).trim(),
        description: String(description).trim(),
        ownerNote: ownerNote ? String(ownerNote).trim() : null,
        dueAt: dueAt ? new Date(dueAt) : null,
        priority: priority === "high" ? "high" : "normal",
        status: nextStatus,
        version: nextVersion,
        activities: {
          create: {
            actorId: guard.session.userId,
            actorName: guard.session.username,
            action: goesBackToReview ? "scenario.updated_and_sent" : "scenario.updated",
            fromStatus: oldStatus,
            toStatus: nextStatus,
            note: nextVersion !== existing.version ? `Nowa wersja v${nextVersion}` : null,
          },
        },
      },
      include: {
        author: { select: { id: true, username: true, role: true } },
        comments: { orderBy: { createdAt: "asc" } },
        activities: { orderBy: { createdAt: "desc" } },
      },
    });

    if (goesBackToReview) {
      await notifyRole({
        role: "owner",
        scenarioId: scenario.id,
        type: "review_requested",
        title: "Poprawiona wersja do recenzji",
        body: scenario.title,
      });
    }

    await writeAuditLog({
      actor: guard.session,
      action: "scenario.updated",
      targetType: "scenario",
      targetId: scenario.id,
      details: { fromStatus: oldStatus, toStatus: nextStatus, version: nextVersion },
    });

    return NextResponse.json(presentScenario(scenario, guard.session));
  } catch (error) {
    console.error("Update scenario error:", error);
    return NextResponse.json(
      { error: "Nie udalo sie zaktualizowac scenariusza" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requirePermission("scenario:archive", request);
  if (!guard.ok) return guard.response;

  const { id } = await params;

  try {
    const existing = await prisma.scenario.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Nie znaleziono scenariusza" }, { status: 404 });
    }

    const scenario = await prisma.scenario.update({
      where: { id },
      data: {
        status: "archived",
        activities: {
          create: {
            actorId: guard.session.userId,
            actorName: guard.session.username,
            action: "scenario.archived",
            fromStatus: normalizeScenarioStatus(existing.status),
            toStatus: "archived",
          },
        },
      },
    });

    await writeAuditLog({
      actor: guard.session,
      action: "scenario.archived",
      targetType: "scenario",
      targetId: scenario.id,
    });

    return NextResponse.json({ success: true, scenario: presentScenario(scenario, guard.session) });
  } catch (error) {
    console.error("Archive scenario error:", error);
    return NextResponse.json(
      { error: "Nie udalo sie zarchiwizowac scenariusza" },
      { status: 500 }
    );
  }
}
