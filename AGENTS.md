# AGENTS.md - Project Working Standards

Use these standards for every task in this workspace.

## Quality Bar

- Be super pedantic about internal and visual consistency.
- Keep naming strictly consistent across database fields, API payloads, UI labels, and generated content.
- If a label or field name changes in one place, update all dependent references.
- Prefer canonical field names over aliases; avoid duplicate wording for the same concept.
- Treat unresolved naming mismatches as defects, not cosmetic issues.

## UX/UI Expectations

- Maintain a user-friendly, professional interface at all times.
- Prioritize clarity, hierarchy, readable typography, spacing consistency, and predictable interactions.
- Avoid placeholder-like or “unfinished” visual states in production-facing UI.
- Ensure state-dependent fields reveal/hide correctly and remain understandable to non-technical users.

## Project-Specific Expectations (Accumulating)

- Preserve policy compliance and auditability over convenience.
- Keep workflow behavior aligned with official form language and process steps.
- Keep dependent fields and derived displays synchronized with source-of-truth data.
- Do not label database-backed values as “inferred” when they are stored/canonical.
- When changing CSV/database ingestion, validate downstream UI/API behavior before closing the task.

