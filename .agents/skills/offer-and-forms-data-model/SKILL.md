# offer-and-forms-data-model

## Purpose
Define the smallest sufficient data model for product offer, lead capture, and future CRM evolution.

## Use when
Schema design, TypeScript types, forms persistence, product data, lead entities.

## Current minimal entities
### Product
- id
- slug
- category
- brand
- modelName
- referenceNumber (optional)
- description
- priceVisibility
- priceAmount (optional)
- currency
- publicStatus
- coverImage
- gallery
- isFeatured
- seoTitle (optional)
- seoDescription (optional)
- createdAt
- updatedAt

### Lead
- id
- category
- fullName
- email
- phone (optional)
- message
- relatedProductId (optional)
- source = website
- createdAt

## Rules
- Keep MVP schema lean.
- Add only fields used by the actual product.
- Avoid CRM overgrowth in website MVP.
- Leave room for later client/service models.

## Guardrails
- No giant universal entity for every future possibility.
- No premature analytics schema.
- No duplicated pricing logic.

## Output format
- Suggested schema
- Why each field exists
- What is intentionally omitted
- Migration implications later
