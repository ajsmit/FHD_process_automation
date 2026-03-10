import db from '../db/knex';

interface AuthAuditEventInput {
  eventType: string;
  userId?: number | null;
  actorSasiId?: string | null;
  route?: string | null;
  method?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  details?: Record<string, unknown>;
}

export async function logAuthAuditEvent(input: AuthAuditEventInput): Promise<void> {
  try {
    await db('auth_audit_events').insert({
      event_type: input.eventType,
      user_id: input.userId ?? null,
      actor_sasi_id: input.actorSasiId ?? '',
      route: input.route ?? '',
      method: input.method ?? '',
      ip_address: input.ipAddress ?? '',
      user_agent: input.userAgent ?? '',
      details_json: JSON.stringify(input.details ?? {}),
      created_at: db.fn.now(),
    });
  } catch (error) {
    console.error('Failed to persist auth audit event:', error);
  }
}
