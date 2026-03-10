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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const v1_1 = __importDefault(require("./api/v1"));
const initDb_1 = require("./db/initDb");
// Load environment variables
dotenv_1.default.config({ path: process.cwd() + '/.env' });
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
// Middleware
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/generated_forms', express_1.default.static(path_1.default.resolve(__dirname, '../../generated_forms')));
app.use('/ridiculous_forms', express_1.default.static(path_1.default.resolve(__dirname, '../../ridiculous_forms')));
// API routes
app.use('/api/v1', v1_1.default);
app.get('/', (req, res) => {
    res.json({ status: 'API_UP', message: 'Use Next.js client on port 3000 and API on /api/v1' });
});
// Start the server
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const shouldInitDb = ((_a = process.env.AUTO_INIT_DB) !== null && _a !== void 0 ? _a : (process.env.NODE_ENV === 'production' ? 'false' : 'true')).trim().toLowerCase() === 'true';
        if (shouldInitDb) {
            yield (0, initDb_1.initDb)();
        }
        else {
            console.log('AUTO_INIT_DB=false: skipping automatic schema/data bootstrap.');
        }
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    });
}
start().catch((error) => {
    console.error('Failed to initialize server:', error);
    process.exit(1);
});
