import assert from "node:assert/strict";
import test from "node:test";
import { canTransitionScenario, normalizeScenarioStatus, requiresTransitionComment } from "./workflow";
import type { PermissionActor } from "./permissions";

const owner: PermissionActor = {
  userId: "owner-1",
  username: "owner",
  role: "owner",
  accountStatus: "active",
};

const editor: PermissionActor = {
  userId: "editor-1",
  username: "editor",
  role: "editor",
  accountStatus: "active",
};

test("legacy statuses are normalized", () => {
  assert.equal(normalizeScenarioStatus("PENDING"), "in_review");
  assert.equal(normalizeScenarioStatus("REJECTED"), "changes_requested");
});

test("review return requires comment", () => {
  assert.equal(requiresTransitionComment("changes_requested"), true);
  assert.equal(requiresTransitionComment("accepted"), false);
});

test("workflow allows only role-aware transitions", () => {
  assert.equal(
    canTransitionScenario(owner, { status: "in_review", authorId: "editor-1" }, "accepted")
      .allowed,
    true
  );
  assert.equal(
    canTransitionScenario(editor, { status: "draft", authorId: "editor-1" }, "in_review")
      .allowed,
    true
  );
  assert.equal(
    canTransitionScenario(editor, { status: "in_review", authorId: "editor-1" }, "accepted")
      .allowed,
    false
  );
  assert.equal(
    canTransitionScenario(owner, { status: "draft", authorId: "editor-1" }, "recorded").allowed,
    false
  );
});
