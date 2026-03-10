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
exports.getWorkflow = getWorkflow;
exports.completeStep = completeStep;
exports.createTitleRegistration = createTitleRegistration;
exports.generatePdf = generatePdf;
const phase1WorkflowService_1 = require("../services/phase1WorkflowService");
function parseStep(step) {
    const allowed = ['mou', 'title_registration', 'supervisor_profile', 'examiners'];
    return allowed.includes(step) ? step : null;
}
function getWorkflow(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { studentNumber } = req.params;
            const result = yield (0, phase1WorkflowService_1.getOrCreateWorkflow)(studentNumber);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(404).json({ message: 'Workflow or student not found', error: error instanceof Error ? error.message : error });
        }
    });
}
function completeStep(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { studentNumber } = req.params;
            if (req.params.step === 'intention_to_submit') {
                res.status(410).json({ message: 'Legacy phase1 intention_to_submit step is retired. Use canonical INTENTION_TO_SUBMIT module flow.' });
                return;
            }
            const step = parseStep(req.params.step);
            if (!step) {
                res.status(400).json({ message: 'Invalid workflow step' });
                return;
            }
            const result = yield (0, phase1WorkflowService_1.markStepCompleted)(studentNumber, step);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to complete step' });
        }
    });
}
function createTitleRegistration(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const studentNumber = typeof req.body.studentNumber === 'string' ? req.body.studentNumber : '';
            const proposedTitle = typeof req.body.proposedTitle === 'string' ? req.body.proposedTitle : '';
            const abstract = typeof req.body.abstract === 'string' ? req.body.abstract : undefined;
            const result = yield (0, phase1WorkflowService_1.submitTitleRegistration)({
                studentNumber,
                proposedTitle,
                abstract,
            });
            if (result.policyIssues.length > 0) {
                res.status(422).json({ message: 'Validation failed', policyIssues: result.policyIssues, workflow: result.workflow });
                return;
            }
            res.status(201).json(result);
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to submit title registration', error });
        }
    });
}
function generatePdf(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { studentNumber } = req.params;
            if (req.params.step === 'intention_to_submit') {
                res.status(410).json({ message: 'Legacy phase1 intention_to_submit step is retired. Use canonical INTENTION_TO_SUBMIT module flow.' });
                return;
            }
            const step = parseStep(req.params.step);
            if (!step) {
                res.status(400).json({ message: 'Invalid workflow step' });
                return;
            }
            const result = yield (0, phase1WorkflowService_1.generateStepPdf)(studentNumber, step);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to generate PDF' });
        }
    });
}
