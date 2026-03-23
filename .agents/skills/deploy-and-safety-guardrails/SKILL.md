# deploy-and-safety-guardrails

## Purpose
Keep deployment and production changes controlled, especially on Hostinger deployment paths.

## Use when
Env vars, hosting, build scripts, domain connection, deploy steps, release checks.

## Rules
- Never assume production config.
- Always define required env vars explicitly.
- Always provide post-deploy checks.
- Keep deployment simple.
- Prefer one clear deployment target for website MVP.

## Guardrails
- No production changes without validation checklist.
- No secrets in repo.
- No unexplained build assumptions.

## Output format
- Deploy implication
- Required config
- Validation checklist
- Risk points
