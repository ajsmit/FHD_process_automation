import type { Knex } from 'knex';

function parseDepartments(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((value) => String(value ?? '').trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function toDepartmentsJson(values: string[]): string {
  const unique = Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
  return JSON.stringify(unique);
}

export async function up(knex: Knex): Promise<void> {
  await knex('users')
    .whereNotNull('sasi_id')
    .whereRaw("TRIM(COALESCE(sasi_id, '')) <> ''")
    .whereRaw("TRIM(COALESCE(staff_number, '')) = ''")
    .whereIn('role', ['supervisor', 'dept_hd_rep', 'dept_chairperson', 'faculty_hd_rep', 'system_admin', 'admin'])
    .update({
      staff_number: knex.ref('sasi_id'),
      updated_at: knex.fn.now(),
    });

  const scopedUsers = await knex('users')
    .whereIn('role', ['dept_hd_rep', 'dept_chairperson'])
    .select('id', 'sasi_id', 'role', 'departments');

  for (const user of scopedUsers) {
    const staffNumber = String(user.sasi_id ?? '').trim();
    if (!staffNumber) continue;

    const staffRole = user.role === 'dept_hd_rep' ? 'dept_fhd_rep' : 'hod';
    const rows = await knex('sasi_staff')
      .where({ staff_number: staffNumber, role: staffRole })
      .select('department');

    const mapped = rows
      .map((row) => String(row.department ?? '').trim())
      .filter(Boolean);
    const existing = parseDepartments(user.departments as string | null | undefined);
    const combined = Array.from(new Set([...existing, ...mapped]));
    if (combined.length === 0) continue;

    await knex('users')
      .where({ id: user.id })
      .update({
        departments: toDepartmentsJson(combined),
        updated_at: knex.fn.now(),
      });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex('users')
    .whereIn('role', ['dept_hd_rep', 'dept_chairperson'])
    .update({
      departments: null,
      updated_at: knex.fn.now(),
    });
}
