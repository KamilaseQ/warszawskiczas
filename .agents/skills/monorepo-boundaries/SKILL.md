# monorepo-boundaries

## Purpose
Maintain clean boundaries inside one repository without over-engineering shared code.

## Use when
Repo structure, folder creation, package extraction, shared types, config, tooling.

## Rules
- Keep website and owner-pwa separate apps.
- Share only what is genuinely reused.
- Extract shared types before extracting shared UI.
- Do not create packages “just in case”.
- Keep repo practical and understandable.

## Guardrails
- No giant shared package with everything.
- No forced abstraction too early.
- No unclear folder naming.

## Output format
- Proposed folder change
- Why it belongs there
- What not to extract yet
