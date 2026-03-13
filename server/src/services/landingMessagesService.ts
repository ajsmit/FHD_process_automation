import db from '../db/knex';
import { isAdministrativeRole, isDeptHdRepRole, isFacultyHdRepRole, isLegacyAdminRole, isSystemAdminRole } from '../auth/roleService';
import type { Role } from '../auth/tokenService';
import { AuthorizationError } from '../errors/httpErrors';

interface AuthUserLike {
  id: number;
  role: Role;
}

interface UserRow {
  id: number;
  departments: string | null;
}

interface LandingMessageRow {
  id: number;
  scope: 'faculty' | 'department';
  department_name: string | null;
  message: string;
  active_from: string | null;
  active_until: string | null;
  created_by_user_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface LandingMessage {
  id: number;
  scope: 'faculty' | 'department';
  departmentName: string | null;
  message: string;
  activeFrom: string | null;
  activeUntil: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LandingMessageInput {
  scope: 'faculty' | 'department';
  departmentName?: string | null;
  message: string;
  activeFrom?: string | null;
  activeUntil?: string | null;
}

function parseDate(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    throw new Error('Dates must use YYYY-MM-DD format.');
  }
  const parsed = new Date(`${trimmed}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error('Invalid date value.');
  }
  return trimmed;
}

function mapRow(row: LandingMessageRow): LandingMessage {
  return {
    id: row.id,
    scope: row.scope,
    departmentName: row.department_name,
    message: row.message,
    activeFrom: row.active_from,
    activeUntil: row.active_until,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function parseDepartments(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === 'string').map((value) => value.trim()).filter(Boolean);
  } catch {
    return [];
  }
}

async function loadActorDepartments(userId: number): Promise<string[]> {
  const row = await db<UserRow>('users').where({ id: userId }).first('id', 'departments');
  return parseDepartments(row?.departments ?? null);
}

function isFacultyMessageEditor(role: Role): boolean {
  return isSystemAdminRole(role) || isFacultyHdRepRole(role) || isLegacyAdminRole(role);
}

function isDepartmentMessageEditor(role: Role): boolean {
  return isSystemAdminRole(role) || isFacultyHdRepRole(role) || isDeptHdRepRole(role) || isLegacyAdminRole(role);
}

export async function listLandingMessages(departmentName?: string): Promise<LandingMessage[]> {
  const today = new Date().toISOString().slice(0, 10);

  const query = db<LandingMessageRow>('landing_messages')
    .where((builder) => {
      builder.whereNull('active_from').orWhere('active_from', '<=', today);
    })
    .andWhere((builder) => {
      builder.whereNull('active_until').orWhere('active_until', '>=', today);
    })
    .andWhere((builder) => {
      builder.where('scope', 'faculty');
      if (departmentName && departmentName.trim()) {
        builder.orWhere((nested) => {
          nested.where('scope', 'department').andWhere('department_name', departmentName.trim());
        });
      }
    })
    .orderBy('updated_at', 'desc');

  const rows = await query;
  return rows.map(mapRow);
}

export async function listManagedLandingMessages(actor: AuthUserLike): Promise<LandingMessage[]> {
  const base = db<LandingMessageRow>('landing_messages').orderBy('updated_at', 'desc');

  if (isSystemAdminRole(actor.role) || isFacultyHdRepRole(actor.role) || isLegacyAdminRole(actor.role)) {
    const rows = await base;
    return rows.map(mapRow);
  }

  if (!isDeptHdRepRole(actor.role)) {
    throw new AuthorizationError('Actor is not authorized to manage landing messages.');
  }

  const departments = await loadActorDepartments(actor.id);
  if (departments.length === 0) {
    return [];
  }
  const rows = await base.whereIn('department_name', departments);
  return rows.map(mapRow);
}

export async function createLandingMessage(actor: AuthUserLike, input: LandingMessageInput): Promise<LandingMessage> {
  const scope = input.scope;
  const message = input.message.trim();
  if (!message) {
    throw new Error('Message text is required.');
  }

  const activeFrom = parseDate(input.activeFrom);
  const activeUntil = parseDate(input.activeUntil);
  if (activeFrom && activeUntil && activeUntil < activeFrom) {
    throw new Error('activeUntil must be on or after activeFrom.');
  }

  let departmentName: string | null = null;
  if (scope === 'faculty') {
    if (!isFacultyMessageEditor(actor.role)) {
      throw new AuthorizationError('Actor is not authorized to publish Faculty landing messages.');
    }
  } else {
    if (!isDepartmentMessageEditor(actor.role)) {
      throw new AuthorizationError('Actor is not authorized to publish department landing messages.');
    }
    departmentName = (input.departmentName ?? '').trim();
    if (!departmentName) {
      throw new Error('Department name is required for department landing messages.');
    }

    if (isDeptHdRepRole(actor.role) && !isAdministrativeRole(actor.role)) {
      throw new Error('Unexpected role configuration.');
    }

    if (isDeptHdRepRole(actor.role) && !isSystemAdminRole(actor.role) && !isFacultyHdRepRole(actor.role) && !isLegacyAdminRole(actor.role)) {
      const actorDepartments = await loadActorDepartments(actor.id);
      if (!actorDepartments.includes(departmentName)) {
        throw new AuthorizationError('Dept HD representatives can only publish messages for their assigned departments.');
      }
    }
  }

  const [id] = await db('landing_messages').insert({
    scope,
    department_name: departmentName,
    message,
    active_from: activeFrom,
    active_until: activeUntil,
    created_by_user_id: actor.id,
    updated_at: db.fn.now(),
  });

  const row = await db<LandingMessageRow>('landing_messages').where({ id }).first();
  if (!row) {
    throw new Error('Failed to create landing message.');
  }
  return mapRow(row);
}

export async function updateLandingMessage(actor: AuthUserLike, id: number, patch: Partial<LandingMessageInput>): Promise<LandingMessage> {
  const row = await db<LandingMessageRow>('landing_messages').where({ id }).first();
  if (!row) {
    throw new Error('Landing message not found.');
  }

  if (row.scope === 'faculty' && !isFacultyMessageEditor(actor.role)) {
    throw new AuthorizationError('Actor is not authorized to update Faculty landing messages.');
  }

  if (row.scope === 'department' && !isDepartmentMessageEditor(actor.role)) {
    throw new AuthorizationError('Actor is not authorized to update department landing messages.');
  }

  if (row.scope === 'department' && isDeptHdRepRole(actor.role) && !isSystemAdminRole(actor.role) && !isFacultyHdRepRole(actor.role) && !isLegacyAdminRole(actor.role)) {
    const actorDepartments = await loadActorDepartments(actor.id);
    const targetDepartment = row.department_name?.trim() ?? '';
    if (!actorDepartments.includes(targetDepartment)) {
      throw new AuthorizationError('Dept HD representatives can only update messages for their assigned departments.');
    }
  }

  const nextMessage = patch.message === undefined ? row.message : patch.message.trim();
  if (!nextMessage) {
    throw new Error('Message text is required.');
  }

  const nextActiveFrom = patch.activeFrom === undefined ? row.active_from : parseDate(patch.activeFrom);
  const nextActiveUntil = patch.activeUntil === undefined ? row.active_until : parseDate(patch.activeUntil);

  if (nextActiveFrom && nextActiveUntil && nextActiveUntil < nextActiveFrom) {
    throw new Error('activeUntil must be on or after activeFrom.');
  }

  await db('landing_messages').where({ id }).update({
    message: nextMessage,
    active_from: nextActiveFrom,
    active_until: nextActiveUntil,
    updated_at: db.fn.now(),
  });

  const updated = await db<LandingMessageRow>('landing_messages').where({ id }).first();
  if (!updated) {
    throw new Error('Failed to update landing message.');
  }
  return mapRow(updated);
}
