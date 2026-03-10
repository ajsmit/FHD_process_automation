# FHD Process Automation Platform

A monorepo for postgraduate workflow automation.

## Stack
- `client`: Next.js 16 + Tailwind + Radix UI primitives + lucide icons + Framer Motion.
- `server`: Node.js/Express API with Knex (`sqlite3` for local dev, `mysql2` for server deployment).
- `packages/common-types`: shared TypeScript package scaffold.

## Prerequisites
1. Install Node.js 20+ and npm.
2. Open a terminal in the repo root:
   `/Users/ajsmit/Documents/FHD_process_automation`
3. Create environment files:
   - Root env contract (authoritative reference): `.env.example`
   - `cp server/.env.example server/.env`
   - `cp client/.env.example client/.env.local`

## Run The Server (API)
1. Install dependencies (first time only):
   ```bash
   npm install
   ```
2. Start the API server in dev mode:
   ```bash
   npm run dev:server
   ```
3. Confirm it is running by opening:
   `http://localhost:3001/api/v1/health`
   You should see:
   `{"status":"UP"}`

## Run The Client (Optional)
1. In a second terminal (same repo root), run:
   ```bash
   npm run dev:client
   ```
2. Open:
   `http://localhost:3000`
3. Expected startup banner includes:
   `Next.js 16.x.x`

## Stop Services
- In each terminal, press `Ctrl + C`.

## Run Backend Tests
```bash
npm run test:server
```

## Troubleshooting (Blank/Spinning Page)
If `http://localhost:3000` spins forever or commands fail with `EADDRINUSE`, old Node processes are still holding ports.
If clicking `Check SASI` fails, the API is not reachable (server not running, wrong `NEXT_PUBLIC_API_BASE`, or no reverse proxy route for `/api/v1`).

1. Check what is listening:
   ```bash
   lsof -nP -iTCP:3000 -sTCP:LISTEN
   lsof -nP -iTCP:3001 -sTCP:LISTEN
   ```
2. If anything is listed, stop those processes (replace `<PID>`):
   ```bash
   kill <PID>
   ```
3. Verify ports are clear:
   ```bash
   lsof -nP -iTCP:3000 -sTCP:LISTEN
   lsof -nP -iTCP:3001 -sTCP:LISTEN
   ```
   No output means the ports are free.
4. Start again:
   ```bash
   npm run dev:server
   npm run dev:client
   ```
5. Verify both endpoints:
   - API: `http://localhost:3001/api/v1/health` should return `{"status":"UP"}`
   - UI: `http://localhost:3000` should return HTTP `200`
6. If UI still spins, clear old listeners and retry:
   ```bash
   lsof -nP -iTCP:3000 -sTCP:LISTEN
   lsof -nP -iTCP:3001 -sTCP:LISTEN
   ```

## Key URLs
- Client UI: `http://localhost:3000`
- API health: `http://localhost:3001/api/v1/health`
- Generated PDFs: `http://localhost:3001/generated_forms/...`

## Environment Modes (Local vs Server)
This codebase is now environment-driven so the same code can run locally and on a dedicated server.

### Local development defaults
- `DB_CLIENT=sqlite3`
- `SASI_PROVIDER=local`
- `AUTO_INIT_DB=true`
- `ENABLE_DEMO_DATA=true`
- `ENABLE_DEV_AUTH=true`
- `ENABLE_LEGACY_PHASE1=false`

### Production/server defaults
- `DB_CLIENT=mysql2` (or `DATABASE_URL=...`)
- `SASI_PROVIDER=api`
- `AUTO_INIT_DB=false`
- `ENABLE_DEMO_DATA=false`

When `AUTO_INIT_DB=false`, the API starts without creating/seeding schema data automatically.

## SASI Integration Modes
- `SASI_PROVIDER=local`: reads from local table `sasi_students` (for development/testing).
- `SASI_PROVIDER=api`: reads from remote SASI API:
  - `SASI_API_ENDPOINT`
  - `SASI_API_KEY` (Bearer token)

Current remote API expectations:
- `GET {SASI_API_ENDPOINT}/students?student_number=...&first_name=...&last_name=...`
- `GET {SASI_API_ENDPOINT}/students/{studentNumber}`
- Either raw JSON array/object or `{ data: ... }` envelope.

## Production Deployment Checklist
1. Provision server (Linux VM or container host) and install Node 20+.
2. Provision MySQL and create database.
3. Configure `server/.env` for `mysql2` and `SASI_PROVIDER=api`.
4. Set `AUTO_INIT_DB=false` and `ENABLE_DEMO_DATA=false`.
5. Build:
   ```bash
   npm run build:server
   npm run build:client
   ```
6. Start services:
   - API: `npm start --workspace=server`
   - Client: `npm run start --workspace=client`
7. Put reverse proxy in front (Nginx/Caddy) and expose:
   - UI domain -> client `:3000`
   - API domain/path -> server `:3001/api/v1`
8. Set `NEXT_PUBLIC_API_BASE` in client environment to the API URL.

## Critical Environment Variables
Server (`server/.env`):
- `DB_CLIENT`, `SQLITE_FILE`, `DATABASE_URL`, `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- `SASI_PROVIDER`, `SASI_API_ENDPOINT`, `SASI_API_KEY`
- `AUTO_INIT_DB`, `ENABLE_DEMO_DATA`, `ENABLE_DEV_AUTH`, `ENABLE_LEGACY_PHASE1`
- `EXTERNAL_PROFILE_BASE_URL`
- `JWT_SECRET`, `JWT_EXPIRES_IN`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` (required for automatic external profile invite email delivery)

Client (`client/.env.local`):
- `NEXT_PUBLIC_API_BASE`
  - If unset, the client first tries same-origin `/api/v1`, then falls back to `:3001` in local dev (`:3000` UI -> `:3001` API).

## Directory CSV Imports (Departments/Staff)
On server startup, these CSV files are imported into SQLite for dropdown/directory use:
- `uwc_natural_sciences_departments.csv` -> `uwc_departments`
- `uwc_bcb_academic_staff_highest_qualification.csv` -> `uwc_staff_directory`

Directory API endpoints:
- `GET /api/v1/directory/departments`
- `GET /api/v1/directory/staff`
  - Optional query params: `department`, `q`, `internalOnly=true`

## Current focus
Title Registration workflow has been implemented end-to-end with SASI prefill checks, role-based vetting, reminders, module entries, and notification queueing.

## Developer Architecture Rule (Keep For Later Modules)
- Treat repeated role sections as reusable role-card patterns with configuration, not duplicated JSX/business logic.
- Current canonical example: ROTT supervisor cards (`primary`, `admin`, `co1`, `co2`).
- Keep differences declarative:
  - display headings/labels,
  - canonical persistence keys,
  - role-specific validations,
  - downstream mapping rules.
- Apply the same pattern in future modules (for example examiner cards, arbiter cards, multi-role signatory blocks).

## External Invite Delivery
- Pressing `Send Profile Link` in ROTT creates an external profile invite token/link and attempts immediate email delivery.
- If SMTP is configured (`SMTP_*` values in `server/.env`), the email is sent automatically.
- If SMTP is not configured, the invite link is still created and shown in the UI, but delivery status will be reported as queued.
- Invite status is tracked per role (`supervisor`, `admin`, `co1`, `co2`) and remains visible after reload/re-login.
- ROTT manual external capture is minimal (`Title`, `First Name`, `Surname`, `Email`); full profile completion happens in the invite form.

## To Do Module
- A dedicated `to_do` module aggregates pending and in-progress actions:
  - non-terminal module workflow items,
  - outstanding supervisor profile steps,
  - pending external invite completions,
  - queued/failed notification items.

See `PROJECT_IMPLEMENTATION_PLAN.md` for phased scope.

## Auth (Current)
- Transition endpoints now require JWT Bearer authentication and server-side actor-to-case authorization checks.
- Local development uses `POST /api/v1/auth/dev-login` (enabled by `ENABLE_DEV_AUTH=true`) to mint demo tokens from seeded `users.sasi_id`.
- Canonical transition role simulation currently maps to seeded identities:
  - student: `1234567`
  - supervisor: `STAFF-001`
  - dept admin: `STAFF-003`
  - faculty reviewer: `STAFF-004`
  - chairperson: `STAFF-005`
- Legacy route families are disabled by default (`ENABLE_LEGACY_PHASE1=false`) and return `410`.
