import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/api-guard";
import {
  canTransitionScenario,
  isScenarioStatus,
  normalizeScenarioStatus,
  requiresTransitionComment,
} from "@/domain/workflow";
import { presentScenario } from "@/lib/scenario-presenter";
import { notifyRole, notifyUsers } from "@/lib/notifications";
import { writeAuditLog } from "@/lib/audit";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requirePermission("scenario:view", request);
  if (!guard.ok) return guard.response;

  const { id } = await params;

  try {
    const { status, comment } = await request.json();

    if (!isScenarioStatus(status)) {
      return NextResponse.json(
        { error: "Nieprawidlowy status" },
        { status: 400 }
      );
    }

    const existing = await prisma.scenario.findUnique({
      where: { id },
      include: { author: { select: { id: true } } },
    });

    if (!existing) {
      return NextResponse.json({ error: "Nie znaleziono scenariusza" }, { status: 404 });
    }

    const fromStatus = normalizeScenarioStatus(existing.status);
    const transition = canTransitionScenario(guard.session, existing, status);
    if (!transition.allowed) {
      return NextResponse.json({ error: transition.reason }, { status: 403 });
    }

    if (requiresTransitionComment(status) && !String(comment || "").trim()) {
      return NextResponse.json(
        { error: "Komentarz jest wymagany przy odeslaniu do poprawek." },
        { status: 400 }
      );
    }

    const scenario = await prisma.scenario.update({
      where: { id },
      data: {
        status,
        comments: comment
          ? {
              create: {
                authorId: guard.session.userId,
                authorName: guard.session.username,
                type: status === "changes_requested" ? "review" : "comment",
                body: String(comment).trim(),
              },
            }
          : undefined,
        activities: {
          create: {
            actorId: guard.session.userId,
            actorName: guard.session.username,
            action: "scenario.status_changed",
            fromStatus,
            toStatus: status,
            note: comment ? String(comment).trim() : null,
          },
        },
      },
      include: {
        author: { select: { id: true, username: true, role: true } },
        comments: { orderBy: { createdAt: "asc" } },
        activities: { orderBy: { createdAt: "desc" } },
      },
    });

    if (status === "in_review") {
      await notifyRole({
        role: "owner",
        scenarioId: scenario.id,
        type: "review_requested",
        title: "Scenariusz czeka na decyzje",
        body: scenario.title,
      });
    }

    if (
      (status === "accepted" || status === "changes_requested" || status === "ready_to_record") &&
      scenario.authorId
    ) {
      await notifyUsers({
        userIds: [scenario.authorId],
        scenarioId: scenario.id,
        type: "review_decision",
        title:
          status === "accepted"
            ? "Scenariusz zaakceptowany"
            : status === "ready_to_record"
              ? "Scenariusz gotowy do nagrania"
              : "Scenariusz wrocil do poprawek",
        body: scenario.title,
      });
    }

    await writeAuditLog({
      actor: guard.session,
      action: "scenario.status_changed",
      targetType: "scenario",
      targetId: scenario.id,
      details: { fromStatus, toStatus: status },
    });

    return NextResponse.json(presentScenario(scenario, guard.session));
  } catch (error) {
    console.error("Scenario status error:", error);
    return NextResponse.json(
      { error: "Nie udalo sie zmienic statusu" },
      { status: 500 }
    );
  }
}
