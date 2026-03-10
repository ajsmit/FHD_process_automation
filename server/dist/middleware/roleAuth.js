"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAnyRole = requireAnyRole;
const actorRoleHeader = 'x-actor-role';
function readActorRole(req) {
    const raw = req.header(actorRoleHeader);
    return typeof raw === 'string' ? raw.trim() : '';
}
function requireAnyRole(allowedRoles) {
    const normalizedAllowed = allowedRoles.map((role) => role.trim().toLowerCase()).filter(Boolean);
    return (req, res, next) => {
        const actorRole = readActorRole(req).toLowerCase();
        if (!actorRole) {
            res.status(401).json({
                message: 'Authentication required for this transition endpoint.',
                details: `Provide actor role via ${actorRoleHeader}.`,
            });
            return;
        }
        if (!normalizedAllowed.includes(actorRole)) {
            res.status(403).json({
                message: 'Actor role is not authorized for this transition endpoint.',
                actorRole,
                allowedRoles: normalizedAllowed,
            });
            return;
        }
        next();
    };
}
