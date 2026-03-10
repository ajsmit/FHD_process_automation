# POLICY_FIELD_MAP

Version: 2026-03-10
Status: Draft-v1.2 (aligned to implemented ROTT + external invite workflow + next-wave module baseline)
Related: [POLICY_RULEBOOK.md](./POLICY_RULEBOOK.md)

## Boundaries
- This file is authoritative for field-level canonical mappings only.
- For policy doctrine and lifecycle/state contracts, use [POLICY_RULEBOOK.md](./POLICY_RULEBOOK.md).
- For technical routes/tables/env contracts, use [PG_PLATFORM_TECH_SPEC.md](./PG_PLATFORM_TECH_SPEC.md).
- For implementation orchestration and regression execution, use [WORKFLOW_ORCHESTRATION_RUNBOOK.md](./WORKFLOW_ORCHESTRATION_RUNBOOK.md) and [REGRESSION_CHECKLIST.md](./REGRESSION_CHECKLIST.md).

## 1. Purpose
This document maps template field labels to canonical web-system keys, ownership, validation, and downstream propagation.

Use this as:
1. AI implementation contract.
2. Human policy refinement checklist.
3. Regression reference when labels/keys change.

## 2. Column Definitions
- `template_label`: label from `.docx` template (or canonical display label where template variants exist).
- `canonical_key`: canonical internal key to store and reuse.
- `authority`: `SASI | WORKFLOW | DERIVED | DIRECTORY | EXTERNAL_REGISTRY`.
- `prefill_from`: upstream source/module.
- `editability`: `read_only | editable`.
- `save_gate`: minimal validation at draft save.
- `submit_gate`: stricter validation before route transition.
- `propagates_to`: downstream modules/artifacts receiving this value.

## 3. Canonical Domain Prefixes
- `student.*` identity/registration baseline.
- `research.*` thesis/abstract/ethics/proposal.
- `supervision.*` supervisor roster and metadata.
- `profile.*` prospective supervisor profile evidence.
- `mou.*` MOU payload.
- `exam.*` examiner/arbiter workflow.
- `progress.*` progression and milestone reporting.

## 3.1 Directory/Registry Source Maps (Expanded)

### 3.1.1 Internal Staff Directory (`uwc_staff_directory`)
| dataset_field | canonical usage | used_in_modules |
|---|---|---|
| staff_number, staff_name, staff_title, first_name, last_name | supervision.* identity resolution | ROTT, MOU, supervisor profiles, change supervisor |
| email, phone | profile.contact_email, notifications, examiner correspondence | profiles, examiners, arbiter |
| position_title, employee_type, faculty_role | role validation and approval routing | ROTT, examiners, arbiter |
| faculty_name, department_name, office_location, campus | institutional context checks | ROTT, ITS, examiners |
| highest_qualification, orcid, google_scholar_url, scopus_id, research_specialisations, is_nrf_rated, nrf_rating | profile/evidence prefill and examiner quality checks | profiles, examiners summary CV |
| available_as_supervisor, available_as_co_supervisor, available_as_examiner, available_as_arbiter, can_serve_as_chair, can_sign_hod_delegate | eligibility and gate checks | all supervision/examiner/arbiter modules |
| max_supervision_load, current_supervision_load, max_examiner_load, current_examiner_load, availability_notes, active_status, is_internal | capacity policy and allocation gating | ROTT, add/change supervisor, appoint/change examiners, appoint arbiter |

### 3.1.2 External Academic Registry (`external_academic_registry`)
| dataset_field | canonical usage | used_in_modules |
|---|---|---|
| title, first_name, middle_names, preferred_name, last_name, full_name, normalized_full_name | external person identity resolution | ROTT, profiles, examiners, arbiter |
| unique_identifier_type, unique_identifier_value, normalized_unique_identifier | unique external identity key and duplicate prevention | ROTT lookup, examiners, arbiter, compliance |
| email, alternate_email, preferred_contact_method, phone | contact and notification channels | profiles, examiners, arbiter |
| address, city, province_state, postal_code, country | external contact block + international policy checks | ROTT, profiles, examiners |
| affiliation_institution, affiliation_department, affiliation_position_title | affiliation/conflict checks | examiners, arbiter, summary CV |
| highest_qualification, orcid, website_url, google_scholar_url, scopus_id, expertise_keywords | quality/specialization matching | profiles, examiners, arbiter |
| eligible_as_supervisor, eligible_as_examiner, eligible_as_arbiter, eligible_for_masters, eligible_for_phd | role + degree-level eligibility gates | ROTT, examiners, arbiter |
| is_international, is_former_uwc_staff, is_former_uwc_student | policy and conflict constraints | examiners, arbiter |
| cv_last_received_on, cv_file_path | CV evidence compliance | profiles, examiner summary CV |
| last_appointed_supervisor_on, last_appointed_examiner_on, last_appointed_arbiter_on, max_active_assignments, current_active_assignments, conflict_of_interest_notes, active_status, notes | capacity/risk/compliance gating | change/appoint examiner, appoint arbiter, quality review |

### 3.1.3 External Invite Flow (ROTT capture when no match)
| step | canonical_key | authority | behavior |
|---|---|---|---|
| capture invite email | supervision.external_invite.email | WORKFLOW | required when lookup returns no match |
| assign intended role | supervision.external_invite.role | WORKFLOW | one of `supervisor/admin/co1/co2` |
| generate invite token/link | supervision.external_invite.token | DERIVED | secure tokenized URL generated by system |
| persist invite status | supervision.external_invite.status | DERIVED/WORKFLOW | track `pending/completed/expired` and delivery state `sent/queued/failed` per role |
| external profile submit | external_registry.* | EXTERNAL_REGISTRY | writes/updates registry with mandatory unique identifier |
| auto-case sync | supervision.* external fields | DERIVED/WORKFLOW | linked case form updated and downstream prefill refreshed |

## 4. Implemented Module Field Maps

### 4.1 TITLE_REGISTRATION (ROTT)

| template_label | canonical_key | authority | prefill_from | editability | save_gate | submit_gate | propagates_to |
|---|---|---|---|---|---|---|---|
| Student Title | student.title | SASI | SASI sync | read_only | present | present | MOU, Intention to Submit, all downstream docs |
| Student First-Name | student.first_names | SASI | SASI sync | read_only | present | present | all downstream modules |
| Student Surname | student.last_name | SASI | SASI sync | read_only | present | present | all downstream modules |
| Student Number | student.number | SASI | SASI sync | read_only | present | present | all downstream modules |
| Department | student.department | SASI | SASI sync | read_only | present | present | all downstream modules |
| Degree | student.degree | SASI | SASI sync | read_only | present | present | module branching logic |
| Date of first title registration on SASI | student.first_registration_date | SASI | SASI sync | read_only | valid date | valid date | Progress, upgrade, compliance checks |
| Student registration active on SASI | student.registration_active | SASI | SASI sync | read_only | Yes/No | must be Yes | route gating |
| Year first registered | student.first_registration_year | DERIVED | SASI date | read_only | derived set | derived set | downstream timelines |
| Semester first registered | student.first_registration_semester | SASI/WORKFLOW | SASI/prefill | editable | present | present | downstream milestones |
| Planned format (single-select dropdown; stored as canonical boolean flags) | research.planned_format.* | WORKFLOW | user | editable | one selected | policy-consistent with degree | print PDF, MOU outputs |
| Supervisor | supervision.primary.name | DIRECTORY/WORKFLOW | directory/user | editable | present | full name + policy checks | profiles, MOU, all downstream forms |
| Supervisor Qualifications | supervision.primary.qualification | DIRECTORY/WORKFLOW | directory/user | editable | present | present | profiles, MOU |
| Supervisor is UWC-internal | supervision.primary.is_internal | WORKFLOW | user | editable | Yes/No | internal must resolve directory | profile gating |
| Supervisor external title/first/surname/email (requester capture) | supervision.primary.external.{title,first_name,surname,email} | WORKFLOW/EXTERNAL_REGISTRY | lookup/user | editable | title+first+surname+valid email required if external | required if external | profiles, MOU, PDF |
| Supervisor external address/contact enrichment | supervision.primary.external.address | EXTERNAL_REGISTRY/DERIVED | invite completion sync | read_only in ROTT | optional at ROTT save | required later in supervisor profile completion if role remains external | profiles, MOU, PDF |
| Supervisor external unique identifier (SA ID/Passport/Other) | supervision.primary.external.identifier | EXTERNAL_REGISTRY | external registry lookup/invite completion | read_only/editable via invite flow | present if registry-linked | mandatory for completion of external registry record | examiner/arbiter compatibility |
| Administrative Supervisor (Nominal Role) | supervision.admin.name | WORKFLOW/DERIVED | user/copy from primary | editable | present | full-name integrity | profiles, MOU |
| Administrative Supervisor Qualifications | supervision.admin.qualification | WORKFLOW | user/directory | editable | present | present | profiles, MOU |
| Administrative Supervisor is UWC-internal | supervision.admin.is_internal | WORKFLOW | user | editable | Yes/No | if internal -> directory match; else external fields complete | profiles |
| Has Co-supervisor? | supervision.co.has_any | WORKFLOW | user | editable | Yes/No | if Yes -> at least one co-supervisor | profiles, MOU |
| Co-supervisor 1 name/title/qualification | supervision.co1.* | WORKFLOW/DIRECTORY | user/directory | editable | shape-valid | if present -> valid per internal/external policy | profiles, MOU |
| Co-supervisor 1 external title/first/surname/email (requester capture) | supervision.co1.external.{title,first_name,surname,email} | WORKFLOW/EXTERNAL_REGISTRY | lookup/user | editable | title+first+surname+valid email required if external | required if external | profiles, MOU |
| Co-supervisor 1 external address/contact enrichment | supervision.co1.external.address | EXTERNAL_REGISTRY/DERIVED | invite completion sync | read_only in ROTT | optional at ROTT save | required later in supervisor profile completion if role remains external | profiles, MOU |
| Co-supervisor 1 external unique identifier | supervision.co1.external.identifier | EXTERNAL_REGISTRY | external registry lookup/invite completion | read_only/editable via invite flow | present if registry-linked | mandatory for completion of external registry record | examiner/arbiter compatibility |
| Co-supervisor 2 name/title/qualification | supervision.co2.* | WORKFLOW/DIRECTORY | user/directory | editable | shape-valid | if present -> valid + distinct from co1 | profiles, MOU |
| Co-supervisor 2 external title/first/surname/email (requester capture) | supervision.co2.external.{title,first_name,surname,email} | WORKFLOW/EXTERNAL_REGISTRY | lookup/user | editable | title+first+surname+valid email required if external | required if external | profiles, MOU |
| Co-supervisor 2 external address/contact enrichment | supervision.co2.external.address | EXTERNAL_REGISTRY/DERIVED | invite completion sync | read_only in ROTT | optional at ROTT save | required later in supervisor profile completion if role remains external | profiles, MOU |
| Co-supervisor 2 external unique identifier | supervision.co2.external.identifier | EXTERNAL_REGISTRY | external registry lookup/invite completion | read_only/editable via invite flow | present if registry-linked | mandatory for completion of external registry record | examiner/arbiter compatibility |
| Thesis title | research.title | WORKFLOW | user | editable | present | present | MOU, Intention to Submit, examiners workflow |
| Key words | research.keywords | WORKFLOW | user | editable | >=3 comma items | >=3 + at least one phrase | downstream research documents |
| Abstract | research.abstract | WORKFLOW | user | editable | <=200 words for completion metric | substantial abstract + reference rule if citations used | MOU prefill, PDF |
| Does this project need Ethics clearance? | research.ethics.required | WORKFLOW | user | editable | Yes/No | if Yes -> ref required | exam readiness |
| Ethics clearance reference number | research.ethics.reference | WORKFLOW | user | editable | optional unless required | required when ethics.required = Yes | downstream compliance |
| Date ethics clearance issued | research.ethics.date_issued | WORKFLOW | user | editable | date shape if supplied | as policy requires | downstream compliance |
| PhD proposal link (5-10 pages incl. timeframes) | research.proposal.link | WORKFLOW | user | editable | optional except PhD target completion | required for PhD submission gate | Intention to Submit, approvals |
| Initial thesis title for MSc->PhD upgrade | research.upgrade.initial_title | WORKFLOW | user | editable | optional | required in upgrade workflow where applicable | UPGRADE_MSC_TO_PHD |
| Has the MOU been submitted? | mou.status.submitted | DERIVED | MOU completion | read_only | system-set | must be Yes where required downstream | Intention to Submit, readiness checks |

### 4.2 PROSPECTIVE_SUPERVISOR_PROFILE (ROTT)

| template_label | canonical_key | authority | prefill_from | editability | save_gate | submit_gate | propagates_to |
|---|---|---|---|---|---|---|---|
| Role (Supervisor/Co-supervisor/Admin) | profile.role | DERIVED | supervision roster | read_only | present | present | compliance summaries |
| Person name | profile.person_name | DERIVED/WORKFLOW | supervision roster | editable | present | present | MOU prefill |
| Title | profile.person_title | WORKFLOW | roster | editable | present | present | MOU prefill |
| Qualifications | profile.qualifications | WORKFLOW | roster | editable | present | present | MOU prefill |
| Internal/External | profile.is_internal | DERIVED/WORKFLOW | roster | editable | Yes/No | external requires valid contact email + external address | MOU prefill |
| External address | profile.external_address | WORKFLOW | roster or registry invite sync | editable | shape-valid | required if external | MOU readiness |
| Contact email | profile.contact_email | WORKFLOW | roster or registry invite sync | editable | email format if provided | required+valid if external | MOU readiness |
| Publication count (last 4 years) | profile.publication_count | WORKFLOW | user | editable | numeric | 3-5 required | faculty review quality |
| Publication list | profile.recent_publications | WORKFLOW | user | editable | parseable list/json | 3-5 entries required | faculty quality pack |
| Contribution motivation (co-supervisor) | profile.contribution_motivation | WORKFLOW | user | editable | optional draft | required for co-supervisor role | MOU gate |
| New to department | profile.new_to_department | WORKFLOW | user | editable | Yes/No | if Yes -> valid contact email required | risk/compliance |
| CV attached | profile.cv_attached | WORKFLOW | user | editable | Yes/No | must be Yes | MOU gate |
| CV file path/upload | profile.cv_file_path | WORKFLOW | upload | editable | file metadata valid | required for completion | MOU gate |
| Profile status | profile.status | DERIVED | system | read_only | state-valid | must be completed for all active profiles | MOU, dept send-to-faculty gate |

### 4.3 MOU

| template_label | canonical_key | authority | prefill_from | editability | save_gate | submit_gate | propagates_to |
|---|---|---|---|---|---|---|---|
| STUDENT FULL NAME | mou.student.full_name | DERIVED | student + ROTT | read_only | present | present | MOU PDF |
| STUDENT NUMBER | mou.student.number | SASI/DERIVED | ROTT | read_only | present | present | MOU PDF |
| DEGREE | mou.student.degree | DERIVED | ROTT | read_only | present | present | MOU PDF |
| DEPARTMENT | mou.student.department | DERIVED | ROTT | read_only | present | present | MOU PDF |
| FIRST YEAR OF REGISTRATION | mou.student.first_year | DERIVED | ROTT | read_only | present | present | MOU PDF |
| EXPECTED DATE OF COMPLETION | mou.student.expected_completion | SASI/DERIVED | SASI + ROTT | read_only | date-valid | date-valid | planning |
| THESIS TITLE | mou.research.title | DERIVED | ROTT research.title | read_only | present | present | all MOU artifacts |
| BRIEF DESCRIPTION OF PROJECT (<200 WORDS) | mou.research.brief_description | DERIVED/WORKFLOW | ROTT.abstract + user refine | editable | <=200 words | <=200 words | MOU completion |
| Principal Supervisor | mou.supervision.primary.name | DERIVED | ROTT + profiles | read_only | present | present | MOU signatures |
| Principal Supervisor Highest Qualifications | mou.supervision.primary.qualification | DERIVED | profiles/ROTT | read_only | present | present | MOU PDF |
| Principal Supervisor Main responsibilities | mou.supervision.primary.responsibilities | WORKFLOW | user | editable | present | present | MOU completion |
| Co-Supervisor(s) | mou.supervision.co.names | DERIVED | ROTT/profiles | read_only | consistent with ROTT | consistent with ROTT | signature gating |
| Co-Supervisor Highest Qualifications | mou.supervision.co.qualifications | DERIVED | profiles | read_only | present when co exists | present when co exists | MOU PDF |
| Co-Supervisor responsibilities | mou.supervision.co.responsibilities | WORKFLOW | user | editable | optional draft | required when co exists (policy refinement) | MOU completeness |
| Sections 11-25 (availability, leave, facilities, finance, publications, data ownership, meetings, reports, outputs, conferences, duties, expectations, other issues) | mou.plan.* | WORKFLOW | user | editable | all required section keys non-empty per completion policy | must satisfy completion=100% | MOU final PDF |
| Student Signature Confirmed | mou.signatures.student | WORKFLOW | user | editable | Yes/No | must be Yes | MOU complete |
| Supervisor Signature Confirmed | mou.signatures.supervisor | WORKFLOW | user | editable | Yes/No | must be Yes | MOU complete |
| Co-Supervisor Signature Confirmed | mou.signatures.co_supervisor | DERIVED/WORKFLOW | auto No/Yes + user | editable | Yes/No | must be Yes when co-supervisor exists | MOU complete |
| Dept Chair/PG Coord Signature Confirmed | mou.signatures.dept | WORKFLOW | user | editable | Yes/No | must be Yes | MOU complete |

## 5. Next-Wave Module Field Maps (First Pass)

### 5.1 INTENTION_TO_SUBMIT (first downstream candidate)

| template_label | canonical_key | authority | prefill_from | editability | save_gate | submit_gate | propagates_to |
|---|---|---|---|---|---|---|---|
| Title / First-Name / Surname | its.student.* | DERIVED | student + ROTT | read_only | present | present | examiners workflow |
| Student Number | its.student.number | DERIVED | ROTT | read_only | present | present | examiners workflow |
| Department | its.student.department | DERIVED | ROTT | read_only | present | present | examiners workflow |
| Degree | its.student.degree | DERIVED | ROTT | read_only | present | present | examiners workflow |
| Supervisor | its.supervision.primary_name | DERIVED | ROTT | read_only | present | present | examiners workflow |
| Co-Supervisor | its.supervision.co_names | DERIVED | ROTT | read_only | consistent with ROTT | consistent with ROTT | examiners workflow |
| Thesis title | its.research.title | DERIVED | ROTT | read_only (default) | present | present | APPOINT_EXAMINERS |
| Year of first enrolment | its.student.first_enrolment_year | DERIVED | ROTT | read_only | present | present | compliance |
| Submission type (Mini/Project/Full) | its.submission.output_type | WORKFLOW | user | editable | one selected | one selected + consistent with degree path | examination prep |
| Intended submission date | its.submission.intended_date | WORKFLOW | user | editable | valid date | valid date + reasonable lead time policy | APPOINT_EXAMINERS scheduling |
| Student declaration text | its.declaration.student | WORKFLOW | template default | editable | present | present | audit trail |
| Student signature/date | its.signatures.student.* | WORKFLOW | user | editable | shape-valid | required | route to supervisor |
| Supervisor approval status | its.approvals.supervisor.status | WORKFLOW | user/role action | editable by role | approved/not approved | required for dept approval route | APPOINT_EXAMINERS gate |
| Co-supervisor approval status | its.approvals.co_supervisor.status | WORKFLOW | user/role action | editable by role | optional if co absent | required if co exists | APPOINT_EXAMINERS gate |
| Department Postgrad Coordinator approval | its.approvals.dept.status | WORKFLOW | role action | editable by role | present at final route | required before APPOINT_EXAMINERS | APPOINT_EXAMINERS prefill gate |
| Non-approval motivation attachment | its.attachments.nonapproval_motivation | WORKFLOW | upload | editable | optional | required when supervisor not approved | review loop |

### 5.2 APPOINT_EXAMINERS (first-pass extracted mapping)

| template_label | canonical_key | authority | prefill_from | editability | save_gate | submit_gate | propagates_to |
|---|---|---|---|---|---|---|---|
| Student Title/Names | exam.student.* | DERIVED | ROTT | read_only | present | present | examiner pack |
| Student Number | exam.student.number | DERIVED | ROTT | read_only | present | present | examiner pack |
| Faculty & Department | exam.student.faculty_department | DERIVED | SASI/ROTT | read_only | present | present | examiner pack |
| Qualification Title | exam.student.qualification_title | DERIVED | ROTT degree/title | read_only | present | present | examiner pack |
| Full name of Supervisor | exam.supervision.primary_name | DERIVED | ROTT | read_only | present | present | examiner pack |
| Full name(s) of Co-Supervisor(s) | exam.supervision.co_names | DERIVED | ROTT | read_only | consistent | consistent | examiner pack |
| Thesis title | exam.research.title | DERIVED | ROTT/CHANGE_TITLE approved | read_only | present | present | examiner pack |
| Year first enrolment | exam.student.first_enrolment_year | DERIVED | ROTT | read_only | present | present | compliance |
| Have you registered this thesis title already (Yes/No) | exam.research.title_registered | WORKFLOW/DERIVED | title state | editable | Yes/No | Yes unless concurrent change-title path | gating rule |
| Title-change concurrent declaration | exam.research.title_change_concurrent | WORKFLOW | user | editable | Yes/No | required when title not yet registered | CHANGE_TITLE linkage |
| Examiner N type (Internal/External/International) | exam.examiners[n].type | WORKFLOW | user | editable | one selected | count composition policy per degree | exam panel policy |
| Full name of examiner | exam.examiners[n].name | WORKFLOW | user | editable | present | present | EXAMINER_SUMMARY_CV |
| Affiliation of examiner | exam.examiners[n].affiliation | WORKFLOW | user | editable | present | present | conflict checks |
| Reason for using this examiner | exam.examiners[n].motivation | WORKFLOW | user | editable | present | present | audit/faculty vetting |
| Full CV lodged within past year | exam.examiners[n].cv_recent | WORKFLOW | user | editable | Yes/No | required Yes for externals | EXAMINER_SUMMARY_CV |
| Conflict of Interest details | exam.examiners[n].conflict_disclosure | WORKFLOW | user | editable | present (explicit none allowed) | must pass conflict policy | faculty/senate vetting |
| Supervisor signature/date | exam.signatures.supervisor.* | WORKFLOW | role action | editable by role | shape-valid | required | routing |
| Co-supervisor signature/date | exam.signatures.co_supervisor.* | WORKFLOW | role action | editable by role | conditional | required if co exists | routing |
| Departmental Coordinator signature/date | exam.signatures.dept.* | WORKFLOW | role action | editable by role | shape-valid | required | downstream approval |

### 5.3 CHANGE_EXAMINERS (first-pass extracted mapping)

| template_label | canonical_key | authority | prefill_from | editability | save_gate | submit_gate | propagates_to |
|---|---|---|---|---|---|---|---|
| Student Title/Names | cex.student.* | DERIVED | ROTT | read_only | present | present | examiner chain |
| Student Number | cex.student.number | DERIVED | ROTT | read_only | present | present | examiner chain |
| Thesis title | cex.research.title | DERIVED | ROTT/current title state | read_only | present | present | examiner chain |
| Current examiner panel summary | cex.panel.current_summary | DERIVED | APPOINT_EXAMINERS submitted panel | read_only | present | present | change evidence |
| Change motivation | cex.change.motivation | WORKFLOW | user | editable | present | required | faculty/dept review |
| Replacement examiner details | cex.replacements[n].* | WORKFLOW | user | editable | at least one replacement examiner complete | policy-valid composition for final panel | EXAMINER_SUMMARY_CV, APPOINT_ARBITER |

### 5.4 EXAMINER_SUMMARY_CV (first-pass extracted mapping)

| template_label | canonical_key | authority | prefill_from | editability | save_gate | submit_gate | propagates_to |
|---|---|---|---|---|---|---|---|
| Student Title/Names | escv.student.* | DERIVED | ROTT | read_only | present | present | senate/faculty packet |
| Student Number | escv.student.number | DERIVED | ROTT | read_only | present | present | senate/faculty packet |
| Thesis title | escv.research.title | DERIVED | ROTT | read_only | present | present | senate/faculty packet |
| Examiner panel summary | escv.panel.summary | DERIVED | APPOINT_EXAMINERS/CHANGE_EXAMINERS submitted panel | read_only | present | present | senate/faculty packet |
| Summary CV packet status | escv.cv_packet.status | WORKFLOW | user | editable | present | must be `Complete` | senate/faculty packet |
| Compiled by / date | escv.compilation.* | WORKFLOW | user | editable | present | required | audit |
| Notes | escv.notes | WORKFLOW | user | editable | optional | optional | senate/faculty packet |

### 5.5 APPOINT_ARBITER (first-pass extracted mapping)

| template_label | canonical_key | authority | prefill_from | editability | save_gate | submit_gate | propagates_to |
|---|---|---|---|---|---|---|---|
| Student Title/Names | arb.student.* | DERIVED | ROTT | read_only | present | present | arbitration chain |
| Student Number | arb.student.number | DERIVED | ROTT | read_only | present | present | arbitration chain |
| Thesis title | arb.research.title | DERIVED | ROTT/current title state | read_only | present | present | arbitration chain |
| Examiner panel summary | arb.panel.summary | DERIVED | APPOINT_EXAMINERS/CHANGE_EXAMINERS submitted panel | read_only | present | present | arbitration chain |
| Arbiter identity/type/affiliation | arb.person.* | WORKFLOW/DIRECTORY/EXTERNAL_REGISTRY | user/lookup | editable | present | required | appointment output |
| Arbiter motivation | arb.justification.motivation | WORKFLOW | user | editable | present | required | approval dossier |
| Arbiter CV received | arb.cv.received | WORKFLOW | user | editable | present | must be `Yes` | approval dossier |
| Conflict disclosure | arb.conflict.disclosure | WORKFLOW | user | editable | present | required (explicit none allowed) | approval dossier |

### 5.6 Change-request module implementation note (current)
For `CHANGE_TITLE`, `CHANGE_SUPERVISOR`, and `ADD_CO_SUPERVISOR`:
1. Canonical payloads are now persisted to dedicated module tables (`change_title_forms`, `change_supervisor_forms`, `add_co_supervisor_forms`) with status/completion/PDF metadata.
2. Submit gates enforce module-specific validation:
- `CHANGE_TITLE`: proposed title required, must differ from current title, and rationale minimum quality check.
- `CHANGE_SUPERVISOR`: role-to-change required, incoming/outgoing must differ, continuity plan minimum quality check.
- `ADD_CO_SUPERVISOR`: proposed co-supervisor must not duplicate existing co-supervisor entries.
3. On final approval, canonical ROTT payload is synchronised:
- `CHANGE_TITLE` writes approved title to `research.title` (`ROTT: Thesis title`).
- `CHANGE_SUPERVISOR` writes approved role replacement into `supervision.*` roster fields.
- `ADD_CO_SUPERVISOR` writes approved additional co-supervisor into available `supervision.co1/co2` slot.
4. Printable PDFs are generated from persisted module payloads (not transient UI state).

### 5.7 Phase-B lifecycle implementation note (current)
For `ITS`, `APPOINT_EXAMINERS`, `CHANGE_EXAMINERS`, `EXAMINER_SUMMARY_CV`, and `APPOINT_ARBITER`:
1. Canonical payloads are now persisted to module-specific tables (`*_forms`) with status and completion metadata.
2. Role-scoped review transitions are implemented server-side with actor-to-case authorization checks.
3. Printable PDFs for each module are generated from persisted canonical payloads (not UI state), using ROTT-aligned layout conventions.

## 6. Remaining Forms: Starter Field Map Stubs (Dependency-Focused)

These stubs define upstream prefill obligations and minimum canonical outputs. Detailed label maps to be expanded from templates.

| module | reads_from (required) | writes_to (canonical) | critical propagated outputs |
|---|---|---|---|
| CHANGE_EXAMINERS | APPOINT_EXAMINERS active panel | exam.panel version update | refreshes EXAMINER_SUMMARY_CV + arbitration context |
| APPOINT_ARBITER | APPOINT_EXAMINERS/CHANGE_EXAMINERS | exam.arbiter assignment | arbitration pathway evidence |
| EXAMINER_SUMMARY_CV | APPOINT_EXAMINERS or CHANGE_EXAMINERS | exam.cv_pack metadata | senate/faculty examiner evidence packet |
| PROGRESS_REPORT | TITLE_REGISTRATION, MOU, supervision roster | progress.periodic records | informs leave, readmission, summative, upgrade |
| LEAVE_OF_ABSENCE | PROGRESS_REPORT, student status | progress.leave periods/status | prerequisite context for readmission |
| READMISSION_REQUEST | LEAVE_OF_ABSENCE, registration history | progress.readmission decision data | restores route for ongoing modules |
| UPGRADE_MSC_TO_PHD | TITLE_REGISTRATION (MSc), PROGRESS_REPORT | student.degree transition records | updates degree-specific validation in all future forms |
| SUPERVISOR_SUMMATIVE_REPORT | PROGRESS_REPORT, ITS, exam outcomes | progress.summative assessment | final closure/archival pack |
| OTHER_REQUEST | active case context, referenced modules | generic structured request payload | routed approvals with explicit impacts |

## 7. Policy Notes Requiring Human Refinement
1. Confirm exact examiner composition rules by degree (already indicated in template notes; formalize as rule codes).
2. Confirm whether ITS thesis title is strictly read-only or conditionally editable with linked `CHANGE_TITLE` case.
3. Confirm attachment requirements per non-approval and exception scenarios.
4. Expand all stubbed modules into full field-level label maps from `.docx` templates.
5. Legacy `phase1_workflows.intention_to_submit_status` step-flag path has been removed from active schema/bootstrap contract and must not be reintroduced as module authority.

## 8. Cross-Reference Contracts
1. Implementation sequence and phase priorities:
- [PROJECT_IMPLEMENTATION_PLAN.md](./PROJECT_IMPLEMENTATION_PLAN.md)
- [WORKFLOW_ORCHESTRATION_RUNBOOK.md](./WORKFLOW_ORCHESTRATION_RUNBOOK.md)

2. Environment mapping and endpoint/table contracts:
- [PG_PLATFORM_TECH_SPEC.md](./PG_PLATFORM_TECH_SPEC.md)

3. UI/component/role-card contracts:
- [UI_DESIGN_GOALS.md](./UI_DESIGN_GOALS.md)
- [POLICY_RULEBOOK.md](./POLICY_RULEBOOK.md)

4. To Do operational feed behavior:
- [PG_PLATFORM_TECH_SPEC.md](./PG_PLATFORM_TECH_SPEC.md)
- [POLICY_RULEBOOK.md](./POLICY_RULEBOOK.md)
