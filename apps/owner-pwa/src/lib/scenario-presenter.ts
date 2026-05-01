import {
  getAllowedStatusTargets,
  getScenarioNextAction,
  normalizeScenarioStatus,
  STATUS_DEFINITIONS,
} from "@/domain/workflow";
import type { SessionPayload } from "@/lib/auth";

export function presentScenario<T extends { status: string; authorId?: string | null }>(
  scenario: T,
  actor?: SessionPayload
) {
  const status = normalizeScenarioStatus(scenario.status);
  return {
    ...scenario,
    status,
    statusLabel: STATUS_DEFINITIONS[status].label,
    statusTone: STATUS_DEFINITIONS[status].tone,
    nextAction: getScenarioNextAction(status),
    allowedTransitions: actor ? getAllowedStatusTargets(actor, scenario) : [],
  };
}
