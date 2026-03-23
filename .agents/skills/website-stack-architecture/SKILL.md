# website-stack-architecture

## Purpose
Keep the website stack, repo structure, and public/admin boundaries consistent.

## Use when
Any task touches framework choice, app structure, routing, layout, data boundaries, admin access, or future app integration.

## Project truths
- The website is the first shipping product.
- The website must be premium and custom, not builder-constrained.
- Hostinger Node.js Web App hosting is the deployment target.
- Public site and early offer-management live inside apps/website for now.
- The owner PWA is a later app, not part of MVP.

## Rules
- Use Next.js App Router with TypeScript.
- Keep the website custom-coded.
- Keep public pages and internal offer-management pages in the same app for now.
- Use route groups and access boundaries cleanly.
- Keep the admin/internal area minimal and operational.
- Avoid premature microservices or multiple backends.

## Recommended high-level shape
- apps/website/app/(public)/...
- apps/website/app/(internal)/...
- packages/shared-types
- packages/shared-config

## Guardrails
- Do not propose Hostinger Website Builder as final architecture.
- Do not split public site and offer-management into separate products now.
- Do not build the owner PWA into the website app.
- Do not add a full CMS unless there is a strong proven need.

## Output format
- Decision
- Folder implications
- Why this is best now
- What is intentionally postponed
