"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
function toNumber(value, fallback) {
    const parsed = Number.parseInt(String(value !== null && value !== void 0 ? value : ''), 10);
    return Number.isFinite(parsed) ? parsed : fallback;
}
function buildConfig() {
    var _a, _b, _c, _d, _e, _f, _g;
    const dbClient = ((_a = process.env.DB_CLIENT) !== null && _a !== void 0 ? _a : 'sqlite3').trim();
    if (dbClient === 'mysql2') {
        const connectionString = (_b = process.env.DATABASE_URL) === null || _b === void 0 ? void 0 : _b.trim();
        if (connectionString) {
            return {
                client: 'mysql2',
                connection: connectionString,
                pool: {
                    min: toNumber(process.env.DB_POOL_MIN, 2),
                    max: toNumber(process.env.DB_POOL_MAX, 10),
                },
            };
        }
        return {
            client: 'mysql2',
            connection: {
                host: (_c = process.env.DB_HOST) !== null && _c !== void 0 ? _c : '127.0.0.1',
                port: toNumber(process.env.DB_PORT, 3306),
                user: (_d = process.env.DB_USER) !== null && _d !== void 0 ? _d : 'root',
                password: (_e = process.env.DB_PASSWORD) !== null && _e !== void 0 ? _e : '',
                database: (_f = process.env.DB_NAME) !== null && _f !== void 0 ? _f : 'fhd_process_automation',
            },
            pool: {
                min: toNumber(process.env.DB_POOL_MIN, 2),
                max: toNumber(process.env.DB_POOL_MAX, 10),
            },
        };
    }
    return {
        client: 'sqlite3',
        connection: {
            filename: ((_g = process.env.SQLITE_FILE) === null || _g === void 0 ? void 0 : _g.trim()) || path_1.default.join(__dirname, '../../dev.sqlite3'),
        },
        useNullAsDefault: true,
    };
}
const resolved = buildConfig();
const knexConfig = {
    development: resolved,
    test: resolved,
    production: resolved,
};
exports.default = knexConfig;
