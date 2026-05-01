import {
  canEditScenario,
  canManageRecording,
  canReviewScenario,
  hasPermission,
  type PermissionActor,
} from "@/domain/permissions";

export const SCENARIO_STATUSES = [
  "draft",
  "in_review",
  "changes_requested",
  "accepted",
  "ready_to_record",
  "recorded",
  "archived",
] as const;

export type ScenarioStatus = (typeof SCENARIO_STATUSES)[number];

export interface ScenarioForWorkflow {
  status: string;
  authorId?: string | null;
}

export const STATUS_DEFINITIONS: Record<
  ScenarioStatus,
  {
    label: string;
    shortLabel: string;
    nextAction: string;
    tone: "neutral" | "warning" | "success" | "danger" | "info";
  }
> = {
  draft: {
    label: "Wersja robocza",
    shortLabel: "Roboczy",
    nextAction: "Uzupelnij i wyslij do recenzji",
    tone: "neutral",
  },
  in_review: {
    label: "Do recenzji wlasciciela",
    shortLabel: "Do recenzji",
    nextAction: "Wlasciciel podejmuje decyzje",
    tone: "warning",
  },
  changes_requested: {
    label: "Poprawki",
    shortLabel: "Poprawki",
    nextAction: "Zespol poprawia scenariusz",
    tone: "danger",
  },
  accepted: {
    label: "Zaakceptowany",
    shortLabel: "Akcept",
    nextAction: "Oznacz gotowosc do nagrania",
    tone: "success",
  },
  ready_to_record: {
    label: "Gotowy do nagrania",
    shortLabel: "Do nagrania",
    nextAction: "Nagraj material i oznacz jako nagrany",
    tone: "info",
  },
  recorded: {
    label: "Nagrany",
    shortLabel: "Nagrany",
    nextAction: "Material jest zakonczony",
    tone: "success",
  },
  archived: {
    label: "Archiwum",
    shortLabel: "Archiwum",
    nextAction: "Dane zostaja w historii",
    tone: "neutral",
  },
};

const BASIC_FLOW: Record<ScenarioStatus, ScenarioStatus[]> = {
  draft: ["in_review", "archived"],
  in_review: ["accepted", "changes_requested", "archived"],
  changes_requested: ["in_review", "archived"],
  accepted: ["ready_to_record", "in_review", "archived"],
  ready_to_record: ["recorded", "in_review", "archived"],
  recorded: ["archived"],
  archived: [],
};

export function isScenarioStatus(status: string): status is ScenarioStatus {
  return SCENARIO_STATUSES.includes(status as ScenarioStatus);
}

export function normalizeScenarioStatus(status: string | null | undefined) {
  if (!status) return "draft";
  const legacy: Record<string, ScenarioStatus> = {
    PENDING: "in_review",
    ACCEPTED: "accepted",
    REJECTED: "changes_requested",
    RECORDED: "recorded",
  };
  const normalized = legacy[status] ?? status;
  return isScenarioStatus(normalized) ? normalized : "draft";
}

export function requiresTransitionComment(targetStatus: ScenarioStatus) {
  return targetStatus === "changes_requested";
}

export function getAllowedStatusTargets(
  actor: PermissionActor,
  scenario: ScenarioForWorkflow
) {
  const from = normalizeScenarioStatus(scenario.status);
  return BASIC_FLOW[from].filter((target) =>
    canTransitionScenario(actor, scenario, target).allowed
  );
}

export function canTransitionScenario(
  actor: PermissionActor,
  scenario: ScenarioForWorkflow,
  targetStatus: ScenarioStatus
): { allowed: true } | { allowed: false; reason: string } {
  const from = normalizeScenarioStatus(scenario.status);
  if (!BASIC_FLOW[from].includes(targetStatus)) {
    return { allowed: false, reason: "Ta zmiana statusu nie pasuje do workflow." };
  }

  if (targetStatus === "accepted" || targetStatus === "changes_requested") {
    if (!canReviewScenario(actor, scenario)) {
      return {
        allowed: false,
        reason: "Recenzje moze wykonac wlasciciel, ale nie autor scenariusza.",
      };
    }
    return { allowed: true };
  }

  if (targetStatus === "ready_to_record" || targetStatus === "recorded") {
    if (!canManageRecording(actor)) {
      return { allowed: false, reason: "Brak uprawnien do oznaczania nagran." };
    }
    return { allowed: true };
  }

  if (targetStatus === "archived") {
    if (!hasPermission(actor, "scenario:archive")) {
      return { allowed: false, reason: "Brak uprawnien do archiwizacji." };
    }
    return { allowed: true };
  }

  if (targetStatus === "in_review") {
    if (!canEditScenario(actor, scenario) && !hasPermission(actor, "scenario:send-review")) {
      return { allowed: false, reason: "Brak uprawnien do wysylki do recenzji." };
    }
    return { allowed: true };
  }

  return { allowed: false, reason: "Nieznana akcja." };
}

export function getScenarioNextAction(status: string) {
  return STATUS_DEFINITIONS[normalizeScenarioStatus(status)].nextAction;
}
