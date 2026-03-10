"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const tokenService_1 = require("../auth/tokenService");
function extractBearerToken(req) {
    const authHeader = req.header('authorization');
    if (!authHeader)
        return null;
    const [scheme, token] = authHeader.split(/\s+/, 2);
    if (!scheme || !token || scheme.toLowerCase() !== 'bearer')
        return null;
    return token.trim();
}
const requireAuth = (req, res, next) => {
    const token = extractBearerToken(req);
    if (!token) {
        res.status(401).json({ message: 'Authentication required. Provide Bearer token.' });
        return;
    }
    try {
        req.authUser = (0, tokenService_1.verifyAuthToken)(token);
        next();
    }
    catch (error) {
        res.status(401).json({ message: error instanceof Error ? error.message : 'Invalid token' });
    }
};
exports.requireAuth = requireAuth;
