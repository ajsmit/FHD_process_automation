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
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchSasiStudents = searchSasiStudents;
const sasiService_1 = require("../services/sasiService");
function searchSasiStudents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const studentNumber = typeof req.query.studentNumber === 'string' ? req.query.studentNumber : undefined;
            const firstName = typeof req.query.firstName === 'string' ? req.query.firstName : undefined;
            const lastName = typeof req.query.lastName === 'string' ? req.query.lastName : undefined;
            if (!studentNumber && !firstName && !lastName) {
                res.status(400).json({ message: 'Provide studentNumber or firstName/lastName query parameters.' });
                return;
            }
            const students = yield (0, sasiService_1.searchStudents)({ studentNumber, firstName, lastName });
            res.status(200).json({ data: students });
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to search SASI students', error });
        }
    });
}
