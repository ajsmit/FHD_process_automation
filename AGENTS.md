# AGENTS.md - Project Working Standards

## Purpose
This file defines execution rules for AI/human agents working in this repository: quality expectations, consistency rules, and delivery guardrails.

## What To Put Here
- Workspace-wide implementation standards.
- Naming and consistency rules that must be enforced in code/UI/data.
- UX expectations for production-facing screens.
- Project-specific operational constraints that should be applied every turn.

## What Not To Put Here
- Mission/values language (use `SOUL.md`).
- Project identity/scope framing (use `IDENTITY.md`).
- Session-specific notes or temporary observations (use `MEMORY.md`).

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

## Change-Safety Workflow

- Use periodic safety checkpoints during substantial edits:
  - create a targeted `git stash` before potentially destructive file operations,
  - create small, scoped commits after each validated tranche.
- Prefer reversible operations and checkpoint first when touching migrations, auth, workflow orchestration, or generated-artifact cleanup.
- If a remote is configured and push access is available, push validated checkpoint commits to GitHub to reduce local-only risk.
