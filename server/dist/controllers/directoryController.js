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
exports.getDepartments = getDepartments;
exports.getStaff = getStaff;
exports.getExternalAcademics = getExternalAcademics;
exports.postExternalAcademicInvite = postExternalAcademicInvite;
exports.getExternalAcademicInviteByToken = getExternalAcademicInviteByToken;
exports.postCompleteExternalAcademicInvite = postCompleteExternalAcademicInvite;
const directoryService_1 = require("../services/directoryService");
const externalAcademicOnboardingService_1 = require("../services/externalAcademicOnboardingService");
function getDepartments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const faculty = typeof req.query.faculty === 'string' ? req.query.faculty : undefined;
            const data = yield (0, directoryService_1.listDepartments)(faculty);
            res.status(200).json({ data });
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to load departments', error: error instanceof Error ? error.message : error });
        }
    });
}
function getStaff(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const department = typeof req.query.department === 'string' ? req.query.department : undefined;
            const q = typeof req.query.q === 'string' ? req.query.q : undefined;
            const internalOnly = req.query.internalOnly === 'true';
            const data = yield (0, directoryService_1.listStaff)({ department, q, internalOnly });
            res.status(200).json({ data });
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to load staff directory', error: error instanceof Error ? error.message : error });
        }
    });
}
function getExternalAcademics(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const q = typeof req.query.q === 'string' ? req.query.q : undefined;
            const data = yield (0, directoryService_1.listExternalAcademics)(q);
            res.status(200).json({ data });
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to load external academics registry', error: error instanceof Error ? error.message : error });
        }
    });
}
function postExternalAcademicInvite(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        try {
            const caseId = Number.parseInt(String((_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.caseId) !== null && _b !== void 0 ? _b : ''), 10);
            const role = typeof ((_c = req.body) === null || _c === void 0 ? void 0 : _c.role) === 'string' ? req.body.role : '';
            const email = typeof ((_d = req.body) === null || _d === void 0 ? void 0 : _d.email) === 'string' ? req.body.email : '';
            if (!Number.isFinite(caseId) || caseId < 1) {
                throw new Error('Valid caseId is required.');
            }
            const result = yield (0, externalAcademicOnboardingService_1.createExternalAcademicInvite)(caseId, role, email);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to create external academic invite' });
        }
    });
}
function getExternalAcademicInviteByToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = typeof req.params.token === 'string' ? req.params.token : '';
            const result = yield (0, externalAcademicOnboardingService_1.getExternalAcademicInvite)(token);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to load invite' });
        }
    });
}
function postCompleteExternalAcademicInvite(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const token = typeof req.params.token === 'string' ? req.params.token : '';
            const result = yield (0, externalAcademicOnboardingService_1.completeExternalAcademicInvite)(token, (_a = req.body) !== null && _a !== void 0 ? _a : {});
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to complete external academic profile' });
        }
    });
}
