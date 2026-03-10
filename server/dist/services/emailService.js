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
exports.sendEmail = sendEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
function smtpConfigured() {
    var _a, _b, _c;
    return Boolean(((_a = process.env.SMTP_HOST) === null || _a === void 0 ? void 0 : _a.trim()) &&
        ((_b = process.env.SMTP_PORT) === null || _b === void 0 ? void 0 : _b.trim()) &&
        ((_c = process.env.SMTP_FROM) === null || _c === void 0 ? void 0 : _c.trim()));
}
function sendEmail(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        if (!smtpConfigured()) {
            return { sent: false, reason: 'SMTP is not configured.' };
        }
        const port = Number.parseInt((_a = process.env.SMTP_PORT) !== null && _a !== void 0 ? _a : '', 10);
        if (!Number.isFinite(port) || port < 1) {
            return { sent: false, reason: 'SMTP_PORT is invalid.' };
        }
        try {
            const transporter = nodemailer_1.default.createTransport({
                host: process.env.SMTP_HOST,
                port,
                secure: process.env.SMTP_SECURE === 'true',
                auth: ((_b = process.env.SMTP_USER) === null || _b === void 0 ? void 0 : _b.trim())
                    ? {
                        user: process.env.SMTP_USER,
                        pass: (_c = process.env.SMTP_PASS) !== null && _c !== void 0 ? _c : '',
                    }
                    : undefined,
            });
            yield transporter.sendMail({
                from: process.env.SMTP_FROM,
                to: payload.to,
                subject: payload.subject,
                text: payload.text,
            });
            return { sent: true };
        }
        catch (error) {
            return { sent: false, reason: error instanceof Error ? error.message : 'SMTP send failed.' };
        }
    });
}
