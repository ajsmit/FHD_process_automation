"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const directoryController_1 = require("../../../controllers/directoryController");
const router = express_1.default.Router();
router.get('/departments', directoryController_1.getDepartments);
router.get('/staff', directoryController_1.getStaff);
router.get('/external-academics', directoryController_1.getExternalAcademics);
router.get('/external-supervisors', directoryController_1.getExternalAcademics);
router.post('/external-academics/invite', directoryController_1.postExternalAcademicInvite);
router.get('/external-academics/invites/:token', directoryController_1.getExternalAcademicInviteByToken);
router.post('/external-academics/invites/:token/complete', directoryController_1.postCompleteExternalAcademicInvite);
exports.default = router;
