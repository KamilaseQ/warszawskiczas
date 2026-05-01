import assert from "node:assert/strict";
import test from "node:test";
import { validatePassword, validateUsername } from "./password";

test("password rule is shared and strict enough for account changes", () => {
  assert.equal(validatePassword("short"), false);
  assert.equal(validatePassword("longbutnodigit"), false);
  assert.equal(validatePassword("Correct1"), true);
});

test("username rule is consistent", () => {
  assert.equal(validateUsername("ab"), false);
  assert.equal(validateUsername("dobry_login_1"), true);
  assert.equal(validateUsername("zly login"), false);
});
