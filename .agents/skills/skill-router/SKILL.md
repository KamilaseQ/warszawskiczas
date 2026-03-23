# skill-router

## Purpose
Select the right skills for the task, avoid loading irrelevant guidance, and ensure the agent uses the correct project rules before planning or implementing anything.

## Use when
Use at the beginning of every meaningful task in this repository.

## Do not use when
Do not skip this skill for implementation, design, architecture, SEO, content, or workflow tasks.

## Project truths
- This repository contains multiple specialized skills.
- Not every skill should be loaded for every task.
- Wrong skill selection creates confusion, bloated context, and weaker output.
- The website comes first.
- The public website must live in `apps/website`.
- The owner app is a later-stage product.
- The user wants critical judgment, not passive agreement.

## Core routing rules
- Always start by reading:
  - `.agents/project-constitution.md`
  - all relevant files in `.agents/context/`
  - `.agents/workflows/spec-driven-delivery.md`
- Then identify the dominant task type.
- Load only the skills relevant to the current task.
- Prefer a small, sharp set of skills over loading everything.
- If the task touches both design and architecture, load both groups.
- If the task touches public page design, page intent must be considered before section design.
- If the task touches section design, visual grammar must be considered before polishing UI details.

## Skill selection logic

### A. Project-wide default skills
Load these for most serious tasks:
- `critical-reviewer`
- `monorepo-boundaries`

Load workflow/context first, then add task-specific skills below.

### B. Public website architecture and structure
Use when the task concerns:
- website structure
- route structure
- code organization
- `apps/website`
- Next.js app setup
- public page architecture
- repo boundaries
- workspace decisions

Load:
- `website-stack-architecture`
- `monorepo-boundaries`
- `critical-reviewer`

### C. Homepage design, public page design, page intent, UI direction
Use when the task concerns:
- homepage design
- public page design
- differences between subpages
- emotional role of a page
- hierarchy of public pages
- UX flow of a page
- premium page experience
- deciding what a page should feel like

Load:
- `wc-design-direction-and-page-intent`
- `wc-brand-and-luxury-experience`
- `ui-system-guardrails`
- `critical-reviewer`

### D. Section design, composition, layout rhythm, visual refinement
Use when the task concerns:
- building or refining sections
- composition
- spacing
- section rhythm
- CTA placement
- image/text balance
- editorial layout decisions
- premium visual direction

Load:
- `wc-visual-grammar-and-composition`
- `premium-section-implementation`
- `ui-system-guardrails`
- `wc-brand-and-luxury-experience`
- `critical-reviewer`

### E. Combined page + section design
Use when the task concerns both:
- page intent
- section implementation
- overall flow of a page
- redesign of homepage or a major public page

Load:
- `wc-design-direction-and-page-intent`
- `wc-visual-grammar-and-composition`
- `premium-section-implementation`
- `ui-system-guardrails`
- `wc-brand-and-luxury-experience`
- `critical-reviewer`

### F. SEO, discoverability, AI search visibility
Use when the task concerns:
- metadata
- schema
- internal linking
- page roles
- local SEO
- AI search visibility
- page naming / search intent / crawlability

Load:
- `wc-seo-and-ai-search`
- `wc-website-information-architecture`
- `wc-local-trust-signals`
- `critical-reviewer`

If SEO affects page design directly, also load:
- `wc-design-direction-and-page-intent`

### G. Offer, product listing, catalog logic, collection pages
Use when the task concerns:
- products page
- product cards
- collection structure
- catalog presentation
- hidden collection
- offer visibility/status
- product browsing experience

Load:
- `wc-product-offer-management`
- `offer-and-forms-data-model`
- `wc-design-direction-and-page-intent`
- `wc-visual-grammar-and-composition`
- `ui-system-guardrails`
- `critical-reviewer`

### H. Lead capture, contact flows, forms, conversion points
Use when the task concerns:
- contact page
- inquiry forms
- lead capture
- CTA logic
- conversion sections
- premium contact flow

Load:
- `wc-lead-capture-and-forms`
- `offer-and-forms-data-model`
- `wc-design-direction-and-page-intent`
- `wc-visual-grammar-and-composition`
- `ui-system-guardrails`
- `critical-reviewer`

### I. Trust, boutique, Mokotowska 71, local prestige
Use when the task concerns:
- boutique page
- trust sections
- local positioning
- Mokotowska 71
- experience of visiting the boutique
- place-based prestige

Load:
- `wc-local-trust-signals`
- `wc-design-direction-and-page-intent`
- `wc-visual-grammar-and-composition`
- `wc-brand-and-luxury-experience`
- `critical-reviewer`

### J. Content safety and factual boundaries
Use when the task concerns:
- claims about policies
- sourcing timelines
- authenticity verification
- payment/return/warranty claims
- sensitive business details

Load:
- `content-guardrails-wc`
- `critical-reviewer`

### K. Future owner app / PWA / CRM logic
Use when the task concerns:
- owner workflow
- pipeline
- tasks
- calendar
- calls
- client model
- owner mobile UX

Load:
- `owner-pwa-principles`
- `crm-client-model`
- `simple-shared-pipeline`
- `calls-and-communication-log`
- `tasks-calendar-and-overdue`
- `critical-reviewer`

## Priority rules
- If the task is about a public page, prefer loading page-intent and visual-grammar skills before fine UI tweaks.
- If the task is about a section, do not design it without understanding the page role first.
- If the task is about polish, first check whether the problem is actually hierarchy, spacing, composition, or page role.
- If the task risks making the site generic, overloaded, or cliché, always keep `critical-reviewer` active.

## Required routing output
Before implementation, state:
- dominant task type
- selected skills
- why those skills were selected
- what skills were intentionally not loaded

## Guardrails
- Do not load all skills blindly.
- Do not skip workflow/context reading.
- Do not treat homepage design and contact page design as the same kind of task.
- Do not design sections in isolation from page intent.
- Do not confuse consistency with sameness.

## Checklist
- Did I read constitution, context, and workflow first?
- Did I identify the true task type?
- Did I load page-intent skill for public page decisions?
- Did I load visual-grammar skill for composition/layout decisions?
- Did I avoid unnecessary skills?
- Did I keep `critical-reviewer` active where needed?

## Output format
- Task type
- Skills loaded
- Why these skills
- Risks if wrong skills were used