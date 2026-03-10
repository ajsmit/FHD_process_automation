"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signAuthToken = signAuthToken;
exports.verifyAuthToken = verifyAuthToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
function jwtSecret() {
    var _a, _b;
    const configured = (_a = config_1.default.jwt.secret) === null || _a === void 0 ? void 0 : _a.trim();
    if (configured) {
        return configured;
    }
    if (((_b = process.env.NODE_ENV) !== null && _b !== void 0 ? _b : 'development') !== 'production') {
        return 'dev-insecure-jwt-secret-change-me';
    }
    throw new Error('JWT_SECRET must be configured in production.');
}
function jwtExpiresIn() {
    var _a;
    const value = ((_a = config_1.default.jwt.expiresIn) === null || _a === void 0 ? void 0 : _a.trim()) || '8h';
    return value;
}
function signAuthToken(user) {
    const payload = {
        sub: String(user.id),
        sasi_id: user.sasiId,
        role: user.role,
        first_name: user.firstName,
        last_name: user.lastName,
    };
    return jsonwebtoken_1.default.sign(payload, jwtSecret(), { expiresIn: jwtExpiresIn() });
}
function verifyAuthToken(token) {
    const decoded = jsonwebtoken_1.default.verify(token, jwtSecret());
    const id = Number.parseInt(decoded.sub, 10);
    if (!Number.isFinite(id) || id < 1) {
        throw new Error('Invalid token subject');
    }
    if (decoded.role !== 'student' && decoded.role !== 'supervisor' && decoded.role !== 'admin') {
        throw new Error('Invalid token role');
    }
    return {
        id,
        sasiId: decoded.sasi_id,
        role: decoded.role,
        firstName: decoded.first_name,
        lastName: decoded.last_name,
    };
}
