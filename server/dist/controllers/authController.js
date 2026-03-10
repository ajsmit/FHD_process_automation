"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDevLogin = postDevLogin;
exports.getMe = getMe;
const knex_1 = __importDefault(require("../db/knex"));
const tokenService_1 = require("../auth/tokenService");
function devAuthEnabled() {
    var _a, _b;
    const env = ((_a = process.env.ENABLE_DEV_AUTH) !== null && _a !== void 0 ? _a : (((_b = process.env.NODE_ENV) !== null && _b !== void 0 ? _b : 'development') === 'production' ? 'false' : 'true'))
        .trim()
        .toLowerCase();
    return env === 'true';
}
function postDevLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (!devAuthEnabled()) {
            res.status(403).json({ message: 'Dev auth is disabled.' });
            return;
        }
        try {
            const sasiId = typeof ((_a = req.body) === null || _a === void 0 ? void 0 : _a.sasiId) === 'string' ? req.body.sasiId.trim() : '';
            if (!sasiId) {
                res.status(400).json({ message: 'sasiId is required.' });
                return;
            }
            const user = yield (0, knex_1.default)('users')
                .where({ sasi_id: sasiId })
                .select('id', 'sasi_id', 'first_name', 'last_name', 'role')
                .first();
            if (!user) {
                res.status(404).json({ message: 'User not found for supplied sasiId.' });
                return;
            }
            const token = (0, tokenService_1.signAuthToken)({
                id: user.id,
                sasiId: user.sasi_id,
                role: user.role,
                firstName: user.first_name,
                lastName: user.last_name,
            });
            res.status(200).json({
                token,
                user: {
                    id: user.id,
                    sasiId: user.sasi_id,
                    role: user.role,
                    firstName: user.first_name,
                    lastName: user.last_name,
                },
            });
        }
        catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'Dev login failed' });
        }
    });
}
function getMe(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.authUser) {
            res.status(401).json({ message: 'Authentication required.' });
            return;
        }
        res.status(200).json({ user: req.authUser });
    });
}
