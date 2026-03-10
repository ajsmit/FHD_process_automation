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
exports.createExternalAcademicInvite = createExternalAcademicInvite;
exports.getExternalAcademicInvite = getExternalAcademicInvite;
exports.completeExternalAcademicInvite = completeExternalAcademicInvite;
const crypto_1 = require("crypto");
const knex_1 = __importDefault(require("../db/knex"));
const titleRegistrationWorkflowService_1 = require("./titleRegistrationWorkflowService");
const emailService_1 = require("./emailService");
function clean(value) {
    return String(value !== null && value !== void 0 ? value : '').trim();
}
function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
function normalizeName(value) {
    return value
        .toLowerCase()
        .replace(/\b(professor|prof|associate|dr|mr|mrs|ms|prof\.)\b/g, '')
        .replace(/[^a-z\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}
function normalizeIdentifier(type, raw) {
    const cleaned = raw.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    return `${type}:${cleaned}`;
}
function validateIdentifier(type, value) {
    const cleaned = value.replace(/\s+/g, '');
    if (!cleaned) {
        throw new Error('A unique identifier is required (SA ID, passport number, or other unique ID).');
    }
    if (type === 'SA_ID' && !/^\d{13}$/.test(cleaned)) {
        throw new Error('South African ID number must be exactly 13 digits.');
    }
    if (type === 'PASSPORT' && cleaned.length < 5) {
        throw new Error('Passport number appears invalid.');
    }
    if (type === 'OTHER' && cleaned.length < 4) {
        throw new Error('Other unique identifier appears invalid.');
    }
}
function validateRole(role) {
    if (role !== 'supervisor' && role !== 'admin' && role !== 'co1' && role !== 'co2') {
        throw new Error('Role must be supervisor, admin, co1, or co2.');
    }
}
function parseCaseFormData(raw) {
    if (typeof raw !== 'string' || !raw.trim())
        return {};
    try {
        const parsed = JSON.parse(raw);
        return typeof parsed === 'object' && parsed !== null ? parsed : {};
    }
    catch (_a) {
        return {};
    }
}
function deriveThesisType(formData) {
    var _a, _b;
    const options = [
        { key: 'PhD by traditional thesis format', label: 'PhD by traditional thesis format' },
        { key: 'PhD by publication', label: 'PhD by publication' },
        { key: 'Masters Full-thesis', label: 'Masters Full-thesis' },
        { key: 'Masters Mini thesis', label: 'Masters Mini thesis' },
        { key: 'Masters by publication', label: 'Masters by publication' },
    ];
    const selected = options.find((option) => formData[option.key] === true);
    const degree = clean(String((_a = formData.Degree) !== null && _a !== void 0 ? _a : ''));
    return (_b = selected === null || selected === void 0 ? void 0 : selected.label) !== null && _b !== void 0 ? _b : (degree || 'Not specified');
}
function sanitizeThesisTitle(value) {
    return clean(value).replace(/\.+$/, '').trim();
}
function deriveInviteeName(role, formData) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    if (role === 'supervisor') {
        return {
            inviteeTitle: clean(String((_a = formData['Supervisor Title']) !== null && _a !== void 0 ? _a : '')),
            inviteeFirstName: clean(String((_b = formData['Supervisor External First Name']) !== null && _b !== void 0 ? _b : '')),
            inviteeSurname: clean(String((_c = formData['Supervisor External Surname']) !== null && _c !== void 0 ? _c : '')),
        };
    }
    if (role === 'admin') {
        return {
            inviteeTitle: clean(String((_d = formData['Administrative Supervisor External Title']) !== null && _d !== void 0 ? _d : '')),
            inviteeFirstName: clean(String((_e = formData['Administrative Supervisor External First Name']) !== null && _e !== void 0 ? _e : '')),
            inviteeSurname: clean(String((_f = formData['Administrative Supervisor External Surname']) !== null && _f !== void 0 ? _f : '')),
        };
    }
    if (role === 'co1') {
        return {
            inviteeTitle: clean(String((_g = formData['Co-supervisor Title']) !== null && _g !== void 0 ? _g : '')),
            inviteeFirstName: clean(String((_h = formData['Co-supervisor External First Name']) !== null && _h !== void 0 ? _h : '')),
            inviteeSurname: clean(String((_j = formData['Co-supervisor External Surname']) !== null && _j !== void 0 ? _j : '')),
        };
    }
    return {
        inviteeTitle: clean(String((_k = formData['Second Co-supervisor Title']) !== null && _k !== void 0 ? _k : '')),
        inviteeFirstName: clean(String((_l = formData['Second Co-supervisor External First Name']) !== null && _l !== void 0 ? _l : '')),
        inviteeSurname: clean(String((_m = formData['Second Co-supervisor External Surname']) !== null && _m !== void 0 ? _m : '')),
    };
}
function externalPatchForRole(role, externalAcademicId, payload) {
    const fullName = `${clean(payload.first_name)} ${clean(payload.last_name)}`.replace(/\s+/g, ' ').trim();
    if (role === 'supervisor') {
        return {
            'Supervisor is UWC-internal': 'No',
            'Supervisor External Lookup Id': String(externalAcademicId),
            'Supervisor Title': clean(payload.title),
            'Supervisor External First Name': clean(payload.first_name),
            'Supervisor External Surname': clean(payload.last_name),
            'Supervisor Qualifications': clean(payload.highest_qualification),
            'Supervisor External Address': clean(payload.address),
            'Supervisor External Email': clean(payload.email),
            Supervisor: fullName,
        };
    }
    if (role === 'admin') {
        return {
            'Administrative Supervisor same as Supervisor': 'No',
            'Administrative Supervisor is UWC-internal': 'No',
            'Administrative Supervisor External Lookup Id': String(externalAcademicId),
            'Administrative Supervisor External Title': clean(payload.title),
            'Administrative Supervisor External First Name': clean(payload.first_name),
            'Administrative Supervisor External Surname': clean(payload.last_name),
            'Administrative Supervisor Qualifications (Nominal Role)': clean(payload.highest_qualification),
            'Administrative Supervisor External Address': clean(payload.address),
            'Administrative Supervisor External Email': clean(payload.email),
            'Administrative Supervisor (Nominal Role)': fullName,
        };
    }
    if (role === 'co1') {
        return {
            'Has Co-supervisor?': 'Yes',
            'Co-supervisor is UWC-internal': 'No',
            'Co-supervisor External Lookup Id': String(externalAcademicId),
            'Co-supervisor Title': clean(payload.title),
            'Co-supervisor External First Name': clean(payload.first_name),
            'Co-supervisor External Surname': clean(payload.last_name),
            'Co-supervisor Qualifications': clean(payload.highest_qualification),
            'Co-supervisor External Address': clean(payload.address),
            'Co-supervisor External Email': clean(payload.email),
            'Co-supervisor': fullName,
        };
    }
    return {
        'Has Co-supervisor?': 'Yes',
        'Second Co-supervisor is UWC-internal': 'No',
        'Second Co-supervisor External Lookup Id': String(externalAcademicId),
        'Second Co-supervisor Title': clean(payload.title),
        'Second Co-supervisor External First Name': clean(payload.first_name),
        'Second Co-supervisor External Surname': clean(payload.last_name),
        'Second Co-supervisor Qualifications': clean(payload.highest_qualification),
        'Second Co-supervisor External Address': clean(payload.address),
        'Second Co-supervisor External Email': clean(payload.email),
        'Second Co-supervisor': fullName,
    };
}
function createExternalAcademicInvite(caseId, roleInput, emailInput) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        validateRole(roleInput);
        const email = clean(emailInput).toLowerCase();
        if (!isEmail(email)) {
            throw new Error('Please provide a valid email address for the external academic.');
        }
        const caseRow = yield (0, knex_1.default)('title_registration_cases').where({ id: caseId }).first();
        if (!caseRow) {
            throw new Error('Title registration case not found for invite request.');
        }
        const token = (0, crypto_1.randomUUID)().replace(/-/g, '');
        const expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
        const [inviteId] = yield (0, knex_1.default)('external_academic_profile_invites').insert({
            case_id: caseId,
            role: roleInput,
            email,
            token,
            status: 'pending',
            expires_at: expiresAt.toISOString(),
        });
        const appBase = ((_a = process.env.EXTERNAL_PROFILE_BASE_URL) === null || _a === void 0 ? void 0 : _a.trim()) || 'http://localhost:3000';
        const inviteLink = `${appBase.replace(/\/$/, '')}/external-academic/${token}`;
        const subject = 'UWC External Academic Profile Request';
        const body = `You have been requested to provide your details for UWC postgraduate workflow role "${roleInput}". ` +
            `Please complete this secure web form: ${inviteLink} . This link expires on ${expiresAt.toISOString().slice(0, 10)}.`;
        const [notificationId] = yield (0, knex_1.default)('notification_queue').insert({
            case_id: caseId,
            email_to: email,
            subject,
            body,
            status: 'queued',
        });
        let deliveryStatus = 'queued';
        const delivery = yield (0, emailService_1.sendEmail)({ to: email, subject, text: body });
        if (delivery.sent) {
            deliveryStatus = 'sent';
            yield (0, knex_1.default)('notification_queue').where({ id: Number(notificationId) }).update({ status: 'sent' });
        }
        else if (delivery.reason && delivery.reason !== 'SMTP is not configured.') {
            deliveryStatus = 'failed';
            yield (0, knex_1.default)('notification_queue').where({ id: Number(notificationId) }).update({
                status: 'failed',
                body: `${body}\n\nDelivery error: ${delivery.reason}`,
            });
        }
        return {
            inviteId: Number(inviteId),
            token,
            inviteLink,
            expiresAt: expiresAt.toISOString(),
            deliveryStatus,
        };
    });
}
function getExternalAcademicInvite(tokenInput) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const token = clean(tokenInput);
        const invite = yield (0, knex_1.default)('external_academic_profile_invites').where({ token }).first();
        if (!invite) {
            throw new Error('Invite link not found.');
        }
        if (invite.status !== 'pending') {
            throw new Error('This invite link has already been used.');
        }
        if (invite.expires_at && new Date(invite.expires_at).getTime() < Date.now()) {
            yield (0, knex_1.default)('external_academic_profile_invites').where({ id: invite.id }).update({ status: 'expired', updated_at: knex_1.default.fn.now() });
            throw new Error('This invite link has expired.');
        }
        let studentName = 'Student';
        let thesisType = 'Not specified';
        let thesisTitle = 'Not specified';
        let inviteeTitle = '';
        let inviteeFirstName = '';
        let inviteeSurname = '';
        if (invite.case_id) {
            const context = yield (0, knex_1.default)('title_registration_cases')
                .leftJoin('sasi_students', 'sasi_students.id', 'title_registration_cases.sasi_student_id')
                .where('title_registration_cases.id', invite.case_id)
                .first(knex_1.default.raw('sasi_students.first_names as student_first_names'), knex_1.default.raw('sasi_students.last_name as student_last_name'), knex_1.default.raw('title_registration_cases.form_data_json as form_data_json'));
            const formData = parseCaseFormData(context === null || context === void 0 ? void 0 : context.form_data_json);
            const nameFromForm = `${clean(String((_a = formData['Student First-Name']) !== null && _a !== void 0 ? _a : ''))} ${clean(String((_b = formData['Student Surname']) !== null && _b !== void 0 ? _b : ''))}`.replace(/\s+/g, ' ').trim();
            const nameFromSasi = `${clean(context === null || context === void 0 ? void 0 : context.student_first_names)} ${clean(context === null || context === void 0 ? void 0 : context.student_last_name)}`.replace(/\s+/g, ' ').trim();
            studentName = nameFromForm || nameFromSasi || studentName;
            thesisType = deriveThesisType(formData);
            thesisTitle = sanitizeThesisTitle(String((_c = formData['Thesis title']) !== null && _c !== void 0 ? _c : '')) || thesisTitle;
            const inviteeName = deriveInviteeName(invite.role, formData);
            inviteeTitle = inviteeName.inviteeTitle;
            inviteeFirstName = inviteeName.inviteeFirstName;
            inviteeSurname = inviteeName.inviteeSurname;
        }
        return {
            role: invite.role,
            email: invite.email,
            expiresAt: invite.expires_at,
            caseId: invite.case_id,
            studentName,
            thesisType,
            thesisTitle,
            inviteeTitle,
            inviteeFirstName,
            inviteeSurname,
        };
    });
}
function completeExternalAcademicInvite(tokenInput, payloadInput) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const token = clean(tokenInput);
        const invite = yield (0, knex_1.default)('external_academic_profile_invites').where({ token }).first();
        if (!invite) {
            throw new Error('Invite link not found.');
        }
        if (invite.status !== 'pending') {
            throw new Error('This invite link is no longer active.');
        }
        if (invite.expires_at && new Date(invite.expires_at).getTime() < Date.now()) {
            yield (0, knex_1.default)('external_academic_profile_invites').where({ id: invite.id }).update({ status: 'expired', updated_at: knex_1.default.fn.now() });
            throw new Error('This invite link has expired.');
        }
        const payload = Object.assign(Object.assign({}, payloadInput), { title: clean(payloadInput.title), first_name: clean(payloadInput.first_name), middle_names: clean(payloadInput.middle_names), preferred_name: clean(payloadInput.preferred_name), last_name: clean(payloadInput.last_name), highest_qualification: clean(payloadInput.highest_qualification), email: clean(payloadInput.email).toLowerCase(), alternate_email: clean(payloadInput.alternate_email).toLowerCase(), preferred_contact_method: clean(payloadInput.preferred_contact_method), address: clean(payloadInput.address), city: clean(payloadInput.city), province_state: clean(payloadInput.province_state), postal_code: clean(payloadInput.postal_code), country: clean(payloadInput.country), phone: clean(payloadInput.phone), affiliation_institution: clean(payloadInput.affiliation_institution), affiliation_department: clean(payloadInput.affiliation_department), affiliation_position_title: clean(payloadInput.affiliation_position_title), orcid: clean(payloadInput.orcid), website_url: clean(payloadInput.website_url), google_scholar_url: clean(payloadInput.google_scholar_url), scopus_id: clean(payloadInput.scopus_id), expertise_keywords: clean(payloadInput.expertise_keywords), identifier_type: payloadInput.identifier_type, identifier_value: clean(payloadInput.identifier_value) });
        if (!payload.first_name || !payload.last_name) {
            throw new Error('First name and surname are required.');
        }
        if (!payload.title) {
            throw new Error('Title is required.');
        }
        if (!payload.highest_qualification) {
            throw new Error('Highest qualification is required.');
        }
        if (!payload.address) {
            throw new Error('Address is required.');
        }
        if (!payload.country) {
            throw new Error('Country is required.');
        }
        if (!isEmail(payload.email)) {
            throw new Error('A valid primary email address is required.');
        }
        if (payload.alternate_email && !isEmail(payload.alternate_email)) {
            throw new Error('Alternate email format is invalid.');
        }
        if (!payload.identifier_type || (payload.identifier_type !== 'SA_ID' && payload.identifier_type !== 'PASSPORT' && payload.identifier_type !== 'OTHER')) {
            throw new Error('Identifier type must be SA_ID, PASSPORT, or OTHER.');
        }
        validateIdentifier(payload.identifier_type, payload.identifier_value);
        const normalizedUniqueIdentifier = normalizeIdentifier(payload.identifier_type, payload.identifier_value);
        const fullName = `${payload.title} ${payload.first_name} ${payload.last_name}`.replace(/\s+/g, ' ').trim();
        const normalizedFullName = normalizeName(fullName);
        const existingByIdentifier = yield (0, knex_1.default)('external_academic_registry').where({ normalized_unique_identifier: normalizedUniqueIdentifier }).first();
        const existingByEmail = yield (0, knex_1.default)('external_academic_registry').whereRaw('LOWER(email) = ?', [payload.email]).first();
        const existing = (_a = existingByIdentifier !== null && existingByIdentifier !== void 0 ? existingByIdentifier : existingByEmail) !== null && _a !== void 0 ? _a : null;
        if (existingByIdentifier && existingByEmail && existingByIdentifier.id !== existingByEmail.id) {
            throw new Error('Identifier and email match different registry records. Please contact administrator.');
        }
        let externalAcademicId = 0;
        if (existing) {
            yield (0, knex_1.default)('external_academic_registry').where({ id: existing.id }).update({
                title: payload.title,
                first_name: payload.first_name,
                middle_names: payload.middle_names,
                preferred_name: payload.preferred_name,
                last_name: payload.last_name,
                full_name: fullName,
                normalized_full_name: normalizedFullName,
                unique_identifier_type: payload.identifier_type,
                unique_identifier_value: payload.identifier_value,
                normalized_unique_identifier: normalizedUniqueIdentifier,
                highest_qualification: payload.highest_qualification,
                email: payload.email,
                alternate_email: payload.alternate_email,
                preferred_contact_method: payload.preferred_contact_method,
                address: payload.address,
                city: payload.city,
                province_state: payload.province_state,
                postal_code: payload.postal_code,
                country: payload.country,
                phone: payload.phone,
                affiliation_institution: payload.affiliation_institution,
                affiliation_department: payload.affiliation_department,
                affiliation_position_title: payload.affiliation_position_title,
                orcid: payload.orcid,
                website_url: payload.website_url,
                google_scholar_url: payload.google_scholar_url,
                scopus_id: payload.scopus_id,
                expertise_keywords: payload.expertise_keywords,
                active_status: 1,
                updated_at: knex_1.default.fn.now(),
            });
            externalAcademicId = Number(existing.id);
        }
        else {
            const [createdId] = yield (0, knex_1.default)('external_academic_registry').insert({
                title: payload.title,
                first_name: payload.first_name,
                middle_names: payload.middle_names,
                preferred_name: payload.preferred_name,
                last_name: payload.last_name,
                full_name: fullName,
                normalized_full_name: normalizedFullName,
                unique_identifier_type: payload.identifier_type,
                unique_identifier_value: payload.identifier_value,
                normalized_unique_identifier: normalizedUniqueIdentifier,
                highest_qualification: payload.highest_qualification,
                email: payload.email,
                alternate_email: payload.alternate_email,
                preferred_contact_method: payload.preferred_contact_method,
                address: payload.address,
                city: payload.city,
                province_state: payload.province_state,
                postal_code: payload.postal_code,
                country: payload.country,
                phone: payload.phone,
                affiliation_institution: payload.affiliation_institution,
                affiliation_department: payload.affiliation_department,
                affiliation_position_title: payload.affiliation_position_title,
                orcid: payload.orcid,
                website_url: payload.website_url,
                google_scholar_url: payload.google_scholar_url,
                scopus_id: payload.scopus_id,
                expertise_keywords: payload.expertise_keywords,
                active_status: 1,
            });
            externalAcademicId = Number(createdId);
        }
        yield (0, knex_1.default)('external_academic_profile_invites').where({ id: invite.id }).update({
            status: 'completed',
            completed_at: knex_1.default.fn.now(),
            external_academic_id: externalAcademicId,
            updated_at: knex_1.default.fn.now(),
        });
        let caseUpdated = false;
        if (invite.case_id) {
            const patch = externalPatchForRole(invite.role, externalAcademicId, payload);
            yield (0, titleRegistrationWorkflowService_1.updateForm)(invite.case_id, patch);
            caseUpdated = true;
        }
        return { externalAcademicId, caseUpdated };
    });
}
