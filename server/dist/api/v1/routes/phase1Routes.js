"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const phase1Controller_1 = require("../../../controllers/phase1Controller");
const router = express_1.default.Router();
router.get('/workflows/:studentNumber', phase1Controller_1.getWorkflow);
router.post('/workflows/:studentNumber/steps/:step/complete', phase1Controller_1.completeStep);
router.post('/title-registrations', phase1Controller_1.createTitleRegistration);
router.post('/workflows/:studentNumber/steps/:step/generate-pdf', phase1Controller_1.generatePdf);
exports.default = router;
