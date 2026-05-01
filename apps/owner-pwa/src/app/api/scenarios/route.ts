import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/api-guard";
import { normalizeScenarioStatus } from "@/domain/workflow";
import { presentScenario } from "@/lib/scenario-presenter";
import { notifyRole } from "@/lib/notifications";
import { writeAuditLog } from "@/lib/audit";

export async function GET() {
  const guard = await requirePermission("scenario:view");
  if (!guard.ok) return guard.response;

  const scenarios = await prisma.scenario.findMany({
    orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
    include: {
      author: { select: { id: true, username: true, role: true } },
      comments: { orderBy: { createdAt: "asc" } },
      activities: { orderBy: { createdAt: "desc" }, take: 8 },
    },
  });

  return NextResponse.json(scenarios.map((scenario) => presentScenario(scenario, guard.session)));
}

export async function POST(request: NextRequest) {
  const guard = await requirePermission("scenario:create", request);
  if (!guard.ok) return guard.response;

  try {
    const { title, description, ownerNote, dueAt, priority, submitForReview } =
      await request.json();

    if (!title || !description) {
      return NextResponse.json(
        { error: "Tytul i opis sa wymagane" },
        { status: 400 }
      );
    }

    const nextStatus = submitForReview ? "in_review" : "draft";

    const scenario = await prisma.scenario.create({
      data: {
        title: String(title).trim(),
        description: String(description).trim(),
        ownerNote: ownerNote ? String(ownerNote).trim() : null,
        dueAt: dueAt ? new Date(dueAt) : null,
        priority: priority === "high" ? "high" : "normal",
        status: nextStatus,
        authorId: guard.session.userId,
        comments: ownerNote
          ? {
              create: {
                authorId: guard.session.userId,
                authorName: guard.session.username,
                type: "context",
                body: String(ownerNote).trim(),
              },
            }
          : undefined,
        activities: {
          create: {
            actorId: guard.session.userId,
            actorName: guard.session.username,
            action: submitForReview ? "scenario.created_and_sent" : "scenario.created",
            toStatus: nextStatus,
          },
        },
      },
      include: {
        author: { select: { id: true, username: true, role: true } },
        comments: { orderBy: { createdAt: "asc" } },
        activities: { orderBy: { createdAt: "desc" } },
      },
    });

    if (normalizeScenarioStatus(scenario.status) === "in_review") {
      await notifyRole({
        role: "owner",
        scenarioId: scenario.id,
        type: "review_requested",
        title: "Nowy scenariusz do decyzji",
        body: scenario.title,
      });
    }

    await writeAuditLog({
      actor: guard.session,
      action: "scenario.created",
      targetType: "scenario",
      targetId: scenario.id,
      details: { status: scenario.status },
    });

    return NextResponse.json(presentScenario(scenario, guard.session), { status: 201 });
  } catch (error) {
    console.error("Create scenario error:", error);
    return NextResponse.json(
      { error: "Nie udalo sie utworzyc scenariusza" },
      { status: 500 }
    );
  }
}
