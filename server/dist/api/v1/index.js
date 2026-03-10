"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const titleRegistrationRoutes_1 = __importDefault(require("./routes/titleRegistrationRoutes"));
const sasiRoutes_1 = __importDefault(require("./routes/sasiRoutes"));
const phase1Routes_1 = __importDefault(require("./routes/phase1Routes"));
const titleRegistrationWorkflowRoutes_1 = __importDefault(require("./routes/titleRegistrationWorkflowRoutes"));
const directoryRoutes_1 = __importDefault(require("./routes/directoryRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const router = express_1.default.Router();
router.get('/health', (req, res) => {
    res.json({ status: 'UP' });
});
function legacyEnabled() {
    var _a;
    const env = ((_a = process.env.ENABLE_LEGACY_PHASE1) !== null && _a !== void 0 ? _a : 'false').trim().toLowerCase();
    return env === 'true';
}
// Mount title registration routes
router.use('/sasi', sasiRoutes_1.default);
router.use('/title-registration', titleRegistrationWorkflowRoutes_1.default);
router.use('/directory', directoryRoutes_1.default);
router.use('/auth', authRoutes_1.default);
if (legacyEnabled()) {
    router.use('/title-registrations', titleRegistrationRoutes_1.default);
    router.use('/phase1', phase1Routes_1.default);
}
else {
    router.use('/title-registrations', (_req, res) => {
        res.status(410).json({ message: 'Legacy endpoint disabled. Use /api/v1/title-registration.' });
    });
    router.use('/phase1', (_req, res) => {
        res.status(410).json({ message: 'Legacy phase1 endpoints are disabled.' });
    });
}
exports.default = router;
