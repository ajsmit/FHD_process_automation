# PDF Generation Package (Planned Extraction)

Status: Placeholder directory.

Current state:
- ROTT and MOU PDF composition/rendering are implemented inline in `../titleRegistrationWorkflowService.ts`.

Target state:
- Move PDF composition and rendering into dedicated modules under this directory.
- Keep rendering inputs as canonical payloads from persisted database data.

Suggested first extraction units:
- `titleRegistrationPdfService.ts`
- `mouPdfService.ts`
- `pdfTextLayout.ts`
