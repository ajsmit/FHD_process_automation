"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config({ path: process.cwd() + '/.env' });
const config = {
    port: process.env.PORT || 3001,
    host: process.env.HOST || 'localhost',
    db: {
        client: process.env.DB_CLIENT || 'sqlite3',
        url: process.env.DATABASE_URL,
        sqliteFile: process.env.SQLITE_FILE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
    },
    sasi: {
        provider: process.env.SASI_PROVIDER || 'local',
        apiEndpoint: process.env.SASI_API_ENDPOINT,
        apiKey: process.env.SASI_API_KEY,
    },
    bootstrap: {
        autoInitDb: process.env.AUTO_INIT_DB,
        enableDemoData: process.env.ENABLE_DEMO_DATA,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
};
exports.default = config;
