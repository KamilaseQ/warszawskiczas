export const PASSWORD_RULE_TEXT =
  "Haslo musi miec minimum 8 znakow, wielka litere i cyfre.";

export function validatePassword(password: string) {
  return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

export function validateUsername(username: string) {
  return /^[a-zA-Z0-9_]{3,30}$/.test(username);
}
