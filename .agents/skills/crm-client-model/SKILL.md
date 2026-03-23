# crm-client-model

## Purpose
Model persistent clients with changing services over time.

## Use when
Later CRM/app data modeling.

## Rules
- Client is persistent.
- Interactions and service cases change over time.
- Avoid client duplication by service type.

## Guardrails
- No separate disconnected client records for the same person.
- No premature heavy CRM model in website MVP.

## Output format
- Entity relationship direction
- Why this matters operationally
- What to postpone
