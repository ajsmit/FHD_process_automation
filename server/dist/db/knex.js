"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const knexConfig_1 = __importDefault(require("./knexConfig"));
const env = ((_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : 'development').trim();
const selected = (_b = knexConfig_1.default[env]) !== null && _b !== void 0 ? _b : knexConfig_1.default.development;
const db = (0, knex_1.default)(selected);
exports.default = db;
