import assert from "node:assert/strict";
import test from "node:test";
import {
  canReviewScenario,
  hasPermission,
  normalizeAccountStatus,
  normalizeRole,
  type PermissionActor,
} from "./permissions";

const owner: PermissionActor = {
  userId: "owner-1",
  username: "owner",
  role: "owner",
  accountStatus: "active",
};

test("legacy admin maps to owner and pending maps to account status", () => {
  assert.equal(normalizeRole("admin"), "owner");
  assert.equal(normalizeRole("pending"), "viewer");
  assert.equal(normalizeAccountStatus("pending", null), "pending");
});

test("permissions deny by default for inactive users", () => {
  assert.equal(
    hasPermission({ ...owner, accountStatus: "suspended" }, "scenario:review"),
    false
  );
  assert.equal(hasPermission({ ...owner, role: "viewer" }, "scenario:create"), false);
});

test("owner cannot review own scenario", () => {
  assert.equal(canReviewScenario(owner, { authorId: "editor-1" }), true);
  assert.equal(canReviewScenario(owner, { authorId: "owner-1" }), false);
});
