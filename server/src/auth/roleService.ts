import type { Role } from './tokenService';

export function isSystemAdminRole(role: Role): boolean {
  return role === 'system_admin';
}

export function isDeptHdRepRole(role: Role): boolean {
  return role === 'dept_hd_rep';
}

export function isDeptChairpersonRole(role: Role): boolean {
  return role === 'dept_chairperson';
}

export function isFacultyHdRepRole(role: Role): boolean {
  return role === 'faculty_hd_rep';
}

export function isLegacyAdminRole(role: Role): boolean {
  return role === 'admin';
}

export function isAdministrativeRole(role: Role): boolean {
  return isLegacyAdminRole(role)
    || isSystemAdminRole(role)
    || isDeptHdRepRole(role)
    || isDeptChairpersonRole(role)
    || isFacultyHdRepRole(role);
}
