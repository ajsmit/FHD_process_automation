# UI Design Goals And Contract

Version: 2026-03-09
Status: Active implementation contract (aligned to current code)
Scope: `TITLE_REGISTRATION` (ROTT), `UWC External Academic Profile` invite form, active `supervisor_profiles` and `MOU` modules

## Boundaries
- This file is authoritative for UI/UX layout and interaction contracts.
- It does not redefine policy gates; those remain in [POLICY_RULEBOOK.md](./POLICY_RULEBOOK.md).
- It does not redefine field authority/mapping; those remain in [POLICY_FIELD_MAP.md](./POLICY_FIELD_MAP.md).
- For implementation sequencing and release process, use [WORKFLOW_ORCHESTRATION_RUNBOOK.md](./WORKFLOW_ORCHESTRATION_RUNBOOK.md) and [PROJECT_IMPLEMENTATION_PLAN.md](./PROJECT_IMPLEMENTATION_PLAN.md).

## 1. Design Principles
1. Professional first: production-grade visual clarity, no placeholder-like states.
2. Deterministic layout: fixed grid + predictable spans, avoid arbitrary width changes.
3. Policy-visible UI: required/derived/read-only states must be obvious to non-technical users.
4. Workflow-safe interactions: hide/disable controls based on actual workflow gates.
5. Consistency over novelty: repeated role cards must look and behave the same unless policy explicitly differs.

## 2. Implemented Visual Baseline
- Theme: dark, high-contrast cards on layered surfaces.
- Components: custom wrappers (`Card`, `Button`, `Badge`, `SearchInput`, dropdown wrappers).
- Motion: subtle section entrance and limited attention motion for errors (`framer-motion`).
- Icons: semantic section cues via `lucide-react`.

## 3. Grid And Spacing Contract
- Grid model:
  - mobile: `grid-cols-1`
  - tablet: `md:grid-cols-6`
  - desktop: `lg:grid-cols-12`
- Standard spans:
  - short fields: `md:col-span-2` / `lg:col-span-3`
  - medium fields: `md:col-span-3` / `lg:col-span-4` or `lg:col-span-6`
  - long fields and textareas: `md:col-span-6` / `lg:col-span-12`
- Rhythm:
  - section container spacing: `space-y-4`
  - card-internal vertical spacing: 2-3 utility steps (`mb-2`, `mb-3`)
  - field gaps: `gap-3`

## 4. Form Semantics Contract
- Required cues:
  - show explicit `Required` marker in red tone on required labels.
- Placeholder quality:
  - placeholders must be instructional examples, never existing DB entries.
- Dropdown behavior:
  - all selects must include a blank placeholder option first (e.g., `--- Select ... ---`).
- Read-only style:
  - visually distinct disabled/read-only fields (muted foreground and disabled cursor where applicable).
- Validation visibility:
  - concise inline helper text where policy constraints matter (e.g., keyword count, abstract limits).

## 5. Module-Specific Contract
### 5.1 ROTT (`client/app/title-registration/components/TitleRegistrationModule.tsx`)
- Must keep role cards aligned to one reusable visual pattern:
  - primary supervisor,
  - administrative supervisor,
  - co-supervisor 1,
  - co-supervisor 2.
- External role path must show, in-card:
  - registry lookup,
  - minimal requester capture (`Title`, `First Name`, `Surname`, `Email`),
  - `Send Profile Link` action under email,
  - persistent invite status text + link.
- MOU entry-point button must remain disabled until ROTT completion is 100%.

### 5.2 External Invite Form (`client/app/external-academic/[token]/page.tsx`)
- Must preserve invitation context block at top:
  - addressed salutation,
  - invited role,
  - thesis type,
  - thesis title,
  - student name.
- Must keep section grouping:
  - Identity,
  - Contact,
  - Address,
  - Institution And Role,
  - Research Profile.
- Sticky submit footer is allowed if it does not obscure fields.

### 5.3 Supervisor Profiles + MOU
- Should adopt same card/header/icon/required-cue language used in external invite form and ROTT.
- Must avoid style regressions that reintroduce rigid full-width/half-width only layouts.

## 6. Role-Card Pattern (Canonical — Implemented)
The `SupervisorRoleCard` component (`client/app/title-registration/components/SupervisorRoleCard.tsx`) is the canonical pattern for all repeated-role UI blocks.

### How it works
- All per-role variance is expressed as a `RoleCardConfig` object: field-key names, directory, placeholder text, invite label, and the optional `sameAsPrimary` shortcut config.
- The component renders the full card (heading, icon, internal/external toggle, registry lookup, minimal external capture, invite button + status) once, driven entirely by config.
- Per-role business logic (which `FormData` keys to patch, which save callback to call) lives in the parent as typed callbacks passed via props. The card is UI-only.
- All role cards use `sectionGrid = 'grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12'` and canonical `col-span` values, consistent with §3.

### Mandatory use for future repeated-role structures
Any future module with structurally identical role cards — examiners, arbiters, multi-role approval blocks, signatory blocks — **must** use `SupervisorRoleCard` or a component following the same config-driven pattern. Copy-pasting role card JSX is prohibited (see `POLICY_RULEBOOK.md §16`).

### Remaining gaps to close
1. Complete visual parity rollout for `supervisor_profiles` and `MOU` forms with the current ROTT/external-form cues (same card/header/icon/required-cue language).
2. Artifact links (PDF, MOU PDF, CV) now use `NEXT_PUBLIC_API_BASE`-derived origin — verify this resolves correctly in all deployment environments.

## 7. Acceptance Checklist (Per UI Change)
1. Required fields clearly marked and visually consistent.
2. Dropdowns start blank and do not preselect DB entries.
3. External/internal conditional fields reveal/hide correctly.
4. Invite status survives refresh/re-login and is shown per role.
5. Save and gate messaging remains clear and accurate.
6. Mobile/tablet/desktop layouts remain readable and aligned.
