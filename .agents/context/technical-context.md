# Technical Context

## Current direction
Use a monorepo with separate apps:
- apps/website
- apps/owner-pwa (later)

## Current architectural decision
At this stage, public website and lightweight offer-management backoffice live inside apps/website.
This reduces overhead and avoids premature fragmentation.

## Source of truth
Product/offer data must have one source of truth.
Do not create separate independent product systems for the website and later owner app.

## Editing permissions
The owner should be able to use app later to:
- add a new watch
- change watch status
- change watch price
- update watch description
The owner should not be given broad website-copy editing in the operational workflow.

## Product priorities
The website is built first.
The owner PWA is a later phase.
