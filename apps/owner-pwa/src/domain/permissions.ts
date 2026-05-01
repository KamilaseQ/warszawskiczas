export const ROLES = ["owner", "editor", "viewer"] as const;
export type UserRole = (typeof ROLES)[number];

export const ACCOUNT_STATUSES = ["active", "pending", "suspended"] as const;
export type AccountStatus = (typeof ACCOUNT_STATUSES)[number];

export const PERMISSIONS = [
  "scenario:view",
  "scenario:create",
  "scenario:edit-own",
  "scenario:edit-all",
  "scenario:send-review",
  "scenario:review",
  "scenario:mark-recorded",
  "scenario:archive",
  "users:manage",
  "history:view",
  "notifications:view",
] as const;

export type Permission = (typeof PERMISSIONS)[number];

export interface PermissionActor {
  userId?: string | null;
  username: string;
  role: UserRole;
  accountStatus: AccountStatus;
}

export interface ScenarioOwnership {
  authorId?: string | null;
}

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  owner: [
    "scenario:view",
    "scenario:create",
    "scenario:edit-own",
    "scenario:edit-all",
    "scenario:send-review",
    "scenario:review",
    "scenario:mark-recorded",
    "scenario:archive",
    "users:manage",
    "history:view",
    "notifications:view",
  ],
  editor: [
    "scenario:view",
    "scenario:create",
    "scenario:edit-own",
    "scenario:send-review",
    "scenario:mark-recorded",
    "history:view",
    "notifications:view",
  ],
  viewer: ["scenario:view", "notifications:view"],
};

export const ROLE_LABELS: Record<UserRole, string> = {
  owner: "Wlasciciel",
  editor: "Scenarzysta",
  viewer: "Podglad",
};

export const ACCOUNT_STATUS_LABELS: Record<AccountStatus, string> = {
  active: "Aktywne",
  pending: "Oczekuje",
  suspended: "Zablokowane",
};

export function normalizeRole(rawRole: string | null | undefined): UserRole {
  if (rawRole === "admin") return "owner";
  if (rawRole === "owner" || rawRole === "editor" || rawRole === "viewer") {
    return rawRole;
  }
  return "viewer";
}

export function normalizeAccountStatus(
  rawRole: string | null | undefined,
  rawStatus: string | null | undefined
): AccountStatus {
  if (rawRole === "pending") return "pending";
  if (
    rawStatus === "active" ||
    rawStatus === "pending" ||
    rawStatus === "suspended"
  ) {
    return rawStatus;
  }
  return "active";
}

export function hasPermission(
  actor: PermissionActor | null | undefined,
  permission: Permission
) {
  if (!actor || actor.accountStatus !== "active") return false;
  return ROLE_PERMISSIONS[actor.role]?.includes(permission) ?? false;
}

export function canEditScenario(
  actor: PermissionActor,
  scenario: ScenarioOwnership
) {
  if (hasPermission(actor, "scenario:edit-all")) return true;
  if (!hasPermission(actor, "scenario:edit-own")) return false;
  return Boolean(actor.userId && actor.userId === scenario.authorId);
}

export function canReviewScenario(
  actor: PermissionActor,
  scenario: ScenarioOwnership
) {
  if (!hasPermission(actor, "scenario:review")) return false;
  return Boolean(!scenario.authorId || scenario.authorId !== actor.userId);
}

export function canManageRecording(actor: PermissionActor) {
  return hasPermission(actor, "scenario:mark-recorded");
}
