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
exports.getAll = exports.getById = exports.create = void 0;
const knex_1 = __importDefault(require("../db/knex"));
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const [id] = yield (0, knex_1.default)('title_registrations').insert(payload);
    return (0, exports.getById)(id);
});
exports.create = create;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, knex_1.default)('title_registrations').where({ id }).first();
});
exports.getById = getById;
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, knex_1.default)('title_registrations').select('*');
});
exports.getAll = getAll;
