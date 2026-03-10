(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/client/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "chairpersonSign",
    ()=>chairpersonSign,
    "checkSasi",
    ()=>checkSasi,
    "completeExternalAcademicInvite",
    ()=>completeExternalAcademicInvite,
    "completeMou",
    ()=>completeMou,
    "createExternalAcademicInvite",
    ()=>createExternalAcademicInvite,
    "deptReview",
    ()=>deptReview,
    "deptSendFaculty",
    ()=>deptSendFaculty,
    "facultyReview",
    ()=>facultyReview,
    "generatePrintPdf",
    ()=>generatePrintPdf,
    "getDirectoryDepartments",
    ()=>getDirectoryDepartments,
    "getDirectoryStaff",
    ()=>getDirectoryStaff,
    "getExternalAcademicInvite",
    ()=>getExternalAcademicInvite,
    "getExternalAcademics",
    ()=>getExternalAcademics,
    "getExternalInviteStatuses",
    ()=>getExternalInviteStatuses,
    "getExternalSupervisors",
    ()=>getExternalSupervisors,
    "getMou",
    ()=>getMou,
    "getNotifications",
    ()=>getNotifications,
    "getPeople",
    ()=>getPeople,
    "getPipeline",
    ()=>getPipeline,
    "getSupervisorProfiles",
    ()=>getSupervisorProfiles,
    "getTasks",
    ()=>getTasks,
    "getToDo",
    ()=>getToDo,
    "patchForm",
    ()=>patchForm,
    "patchMou",
    ()=>patchMou,
    "patchSupervisorProfile",
    ()=>patchSupervisorProfile,
    "printMou",
    ()=>printMou,
    "requestSupervisorProfiles",
    ()=>requestSupervisorProfiles,
    "sendReminder",
    ()=>sendReminder,
    "sendSupervisorProfilesReminder",
    ()=>sendSupervisorProfilesReminder,
    "studentVet",
    ()=>studentVet,
    "submitSupervisorProfile",
    ()=>submitSupervisorProfile,
    "supervisorReview",
    ()=>supervisorReview,
    "uploadSupervisorProfileCv",
    ()=>uploadSupervisorProfileCv
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const apiBase = (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:3001/api/v1').replace(/\/+$/, '');
async function request(path, init) {
    const url = `${apiBase}${path}`;
    let response;
    try {
        response = await fetch(url, {
            ...init,
            headers: {
                'Content-Type': 'application/json',
                ...init?.headers ?? {}
            },
            cache: 'no-store'
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Network error';
        throw new Error(`Cannot reach API at ${apiBase}. Start the server with "npm run dev:server" and confirm ${apiBase}/health is reachable. (${message})`);
    }
    const payload = await response.json();
    if (!response.ok) {
        throw new Error(payload.message ?? `Request failed (${response.status})`);
    }
    return payload;
}
async function checkSasi(studentNumber) {
    return request(`/title-registration/sasi/${studentNumber}/check`);
}
async function patchForm(caseId, patch) {
    return request(`/title-registration/cases/${caseId}/form`, {
        method: 'PATCH',
        body: JSON.stringify(patch)
    });
}
async function generatePrintPdf(caseId) {
    return request(`/title-registration/cases/${caseId}/print`, {
        method: 'POST'
    });
}
async function studentVet(caseId) {
    return request(`/title-registration/cases/${caseId}/student-vet`, {
        method: 'POST'
    });
}
async function supervisorReview(caseId, decision, comments) {
    return request(`/title-registration/cases/${caseId}/supervisor-review`, {
        method: 'POST',
        body: JSON.stringify({
            decision,
            comments
        })
    });
}
async function deptReview(caseId, decision, comments) {
    return request(`/title-registration/cases/${caseId}/dept-review`, {
        method: 'POST',
        body: JSON.stringify({
            decision,
            comments
        })
    });
}
async function chairpersonSign(caseId, comments) {
    return request(`/title-registration/cases/${caseId}/chairperson-sign`, {
        method: 'POST',
        body: JSON.stringify({
            comments
        })
    });
}
async function deptSendFaculty(caseId) {
    return request(`/title-registration/cases/${caseId}/dept-send-faculty`, {
        method: 'POST'
    });
}
async function facultyReview(caseId, decision, comments) {
    return request(`/title-registration/cases/${caseId}/faculty-review`, {
        method: 'POST',
        body: JSON.stringify({
            decision,
            comments
        })
    });
}
async function sendReminder(caseId) {
    return request(`/title-registration/cases/${caseId}/reminder`, {
        method: 'POST'
    });
}
async function getPipeline() {
    return request('/title-registration/pipeline');
}
async function getTasks() {
    return request('/title-registration/tasks');
}
async function getToDo() {
    return request('/title-registration/to-do');
}
async function getPeople() {
    return request('/title-registration/people');
}
async function getNotifications(caseId) {
    const query = typeof caseId === 'number' ? `?caseId=${caseId}` : '';
    return request(`/title-registration/notifications${query}`);
}
async function getSupervisorProfiles(caseId) {
    return request(`/title-registration/cases/${caseId}/supervisor-profiles`);
}
async function getExternalInviteStatuses(caseId) {
    return request(`/title-registration/cases/${caseId}/external-invites`);
}
async function patchSupervisorProfile(profileId, patch) {
    return request(`/title-registration/supervisor-profiles/${profileId}`, {
        method: 'PATCH',
        body: JSON.stringify(patch)
    });
}
async function submitSupervisorProfile(profileId) {
    return request(`/title-registration/supervisor-profiles/${profileId}/submit`, {
        method: 'POST'
    });
}
async function requestSupervisorProfiles(caseId) {
    return request(`/title-registration/cases/${caseId}/supervisor-profiles/request`, {
        method: 'POST'
    });
}
async function sendSupervisorProfilesReminder(caseId) {
    return request(`/title-registration/cases/${caseId}/supervisor-profiles/reminder`, {
        method: 'POST'
    });
}
async function uploadSupervisorProfileCv(profileId, payload) {
    return request(`/title-registration/supervisor-profiles/${profileId}/upload-cv`, {
        method: 'POST',
        body: JSON.stringify(payload)
    });
}
async function getMou(caseId) {
    return request(`/title-registration/cases/${caseId}/mou`);
}
async function patchMou(caseId, patch) {
    return request(`/title-registration/cases/${caseId}/mou`, {
        method: 'PATCH',
        body: JSON.stringify(patch)
    });
}
async function completeMou(caseId) {
    return request(`/title-registration/cases/${caseId}/mou/complete`, {
        method: 'POST'
    });
}
async function printMou(caseId) {
    return request(`/title-registration/cases/${caseId}/mou/print`, {
        method: 'POST'
    });
}
async function getDirectoryDepartments(faculty) {
    const query = faculty ? `?faculty=${encodeURIComponent(faculty)}` : '';
    return request(`/directory/departments${query}`);
}
async function getDirectoryStaff(params) {
    const search = new URLSearchParams();
    if (params?.department) {
        search.set('department', params.department);
    }
    if (params?.q) {
        search.set('q', params.q);
    }
    if (params?.internalOnly) {
        search.set('internalOnly', 'true');
    }
    const query = search.toString() ? `?${search.toString()}` : '';
    return request(`/directory/staff${query}`);
}
async function getExternalAcademics(q) {
    const query = q?.trim() ? `?q=${encodeURIComponent(q.trim())}` : '';
    return request(`/directory/external-academics${query}`);
}
async function getExternalSupervisors(q) {
    const query = q?.trim() ? `?q=${encodeURIComponent(q.trim())}` : '';
    return request(`/directory/external-supervisors${query}`);
}
async function createExternalAcademicInvite(caseId, role, email) {
    return request('/directory/external-academics/invite', {
        method: 'POST',
        body: JSON.stringify({
            caseId,
            role,
            email
        })
    });
}
async function getExternalAcademicInvite(token) {
    return request(`/directory/external-academics/invites/${encodeURIComponent(token)}`);
}
async function completeExternalAcademicInvite(token, payload) {
    return request(`/directory/external-academics/invites/${encodeURIComponent(token)}/complete`, {
        method: 'POST',
        body: JSON.stringify(payload)
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/app/external-academic/[token]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ExternalAcademicInvitePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const identifierTypes = [
    'SA_ID',
    'PASSPORT',
    'OTHER'
];
function ExternalAcademicInvitePage() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ExternalAcademicInvitePage.useMemo[token]": ()=>String(params?.token ?? '')
    }["ExternalAcademicInvitePage.useMemo[token]"], [
        params
    ]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [info, setInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [prefillEmail, setPrefillEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [role, setRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('external academic');
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        title: '',
        first_name: '',
        middle_names: '',
        preferred_name: '',
        last_name: '',
        highest_qualification: '',
        email: '',
        alternate_email: '',
        preferred_contact_method: '',
        address: '',
        city: '',
        province_state: '',
        postal_code: '',
        country: '',
        phone: '',
        affiliation_institution: '',
        affiliation_department: '',
        affiliation_position_title: '',
        orcid: '',
        website_url: '',
        google_scholar_url: '',
        scopus_id: '',
        expertise_keywords: '',
        identifier_type: 'SA_ID',
        identifier_value: ''
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ExternalAcademicInvitePage.useEffect": ()=>{
            if (!token) return;
            setLoading(true);
            setError(null);
            void (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExternalAcademicInvite"])(token).then({
                "ExternalAcademicInvitePage.useEffect": (invite)=>{
                    setPrefillEmail(invite.email);
                    setForm({
                        "ExternalAcademicInvitePage.useEffect": (prev)=>({
                                ...prev,
                                email: invite.email
                            })
                    }["ExternalAcademicInvitePage.useEffect"]);
                    setRole(invite.role.replace('_', ' '));
                }
            }["ExternalAcademicInvitePage.useEffect"]).catch({
                "ExternalAcademicInvitePage.useEffect": (requestError)=>{
                    setError(requestError instanceof Error ? requestError.message : 'Failed to load invite');
                }
            }["ExternalAcademicInvitePage.useEffect"]).finally({
                "ExternalAcademicInvitePage.useEffect": ()=>setLoading(false)
            }["ExternalAcademicInvitePage.useEffect"]);
        }
    }["ExternalAcademicInvitePage.useEffect"], [
        token
    ]);
    async function handleSubmit(event) {
        event.preventDefault();
        if (!token) return;
        setSubmitting(true);
        setError(null);
        setInfo(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["completeExternalAcademicInvite"])(token, form);
            setInfo('Profile submitted successfully. Thank you, your details have been saved and linked to the workflow case.');
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : 'Failed to submit profile');
        } finally{
            setSubmitting(false);
        }
    }
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "mx-auto max-w-3xl px-6 py-12 text-sm text-slate-600",
            children: "Loading invite..."
        }, void 0, false, {
            fileName: "[project]/client/app/external-academic/[token]/page.tsx",
            lineNumber: 86,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "mx-auto max-w-3xl px-6 py-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-semibold text-slate-900",
                children: "UWC External Academic Profile"
            }, void 0, false, {
                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-sm text-slate-600",
                children: [
                    "You were invited to complete your details for the role: ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-medium",
                        children: role
                    }, void 0, false, {
                        fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                        lineNumber: 92,
                        columnNumber: 106
                    }, this),
                    "."
                ]
            }, void 0, true, {
                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            prefillEmail ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-sm text-slate-600",
                children: [
                    "Invite email: ",
                    prefillEmail
                ]
            }, void 0, true, {
                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                lineNumber: 93,
                columnNumber: 23
            }, this) : null,
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700",
                children: error
            }, void 0, false, {
                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                lineNumber: 95,
                columnNumber: 16
            }, this) : null,
            info ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-4 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700",
                children: info
            }, void 0, false, {
                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                lineNumber: 96,
                columnNumber: 15
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "mt-6 grid grid-cols-1 gap-3 md:grid-cols-2",
                onSubmit: handleSubmit,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm",
                        children: [
                            "Title",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "mt-1 w-full rounded border px-3 py-2",
                                value: form.title,
                                onChange: (e)=>setForm({
                                        ...form,
                                        title: e.target.value
                                    }),
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                                lineNumber: 99,
                                columnNumber: 41
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm",
                        children: [
                            "First name",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "mt-1 w-full rounded border px-3 py-2",
                                value: form.first_name,
                                onChange: (e)=>setForm({
                                        ...form,
                                        first_name: e.target.value
                                    }),
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                                lineNumber: 100,
                                columnNumber: 46
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm",
                        children: [
                            "Middle names",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "mt-1 w-full rounded border px-3 py-2",
                                value: form.middle_names ?? '',
                                onChange: (e)=>setForm({
                                        ...form,
                                        middle_names: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                                lineNumber: 101,
                                columnNumber: 48
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm",
                        children: [
                            "Preferred name",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "mt-1 w-full rounded border px-3 py-2",
                                value: form.preferred_name ?? '',
                                onChange: (e)=>setForm({
                                        ...form,
                                        preferred_name: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                                lineNumber: 102,
                                columnNumber: 50
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm",
                        children: [
                            "Surname",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "mt-1 w-full rounded border px-3 py-2",
                                value: form.last_name,
                                onChange: (e)=>setForm({
                                        ...form,
                                        last_name: e.target.value
                                    }),
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                                lineNumber: 103,
                                columnNumber: 43
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm",
                        children: [
                            "Highest qualification",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "mt-1 w-full rounded border px-3 py-2",
                                value: form.highest_qualification,
                                onChange: (e)=>setForm({
                                        ...form,
                                        highest_qualification: e.target.value
                                    }),
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                                lineNumber: 104,
                                columnNumber: 57
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm",
                        children: [
                            "Identifier type",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                className: "mt-1 w-full rounded border px-3 py-2",
                                value: form.identifier_type,
                                onChange: (e)=>setForm({
                                        ...form,
                                        identifier_type: e.target.value
                                    }),
                                children: identifierTypes.map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: type,
                                        children: type
                                    }, type, false, {
                                        fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                                        lineNumber: 108,
                                        columnNumber: 44
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm",
                        children: [
                            "ID / Passport / Other unique number",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "mt-1 w-full rounded border px-3 py-2",
                                value: form.identifier_value,
                                onChange: (e)=>setForm({
                                        ...form,
                                        identifier_value: e.target.value
                                    }),
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                                lineNumber: 111,
                                columnNumber: 71
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm",
                        children: [
                            "Primary email",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "mt-1 w-full rounded border px-3 py-2",
                                type: "email",
                                value: form.email,
                                onChange: (e)=>setForm({
                                        ...form,
                                        email: e.target.value
                                    }),
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                                lineNumber: 113,
                                columnNumber: 49
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm",
                        children: [
                            "Alternate email",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "mt-1 w-full rounded border px-3 py-2",
                                type: "email",
                                value: form.alternate_email ?? '',
                                onChange: (e)=>setForm({
                                        ...form,
                                        alternate_email: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                                lineNumber: 114,
                                columnNumber: 51
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm",
                        children: [
                            "Phone",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "mt-1 w-full rounded border px-3 py-2",
                                value: form.phone ?? '',
                                onChange: (e)=>setForm({
                                        ...form,
                                        phone: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                                lineNumber: 115,
                                columnNumber: 41
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm",
                        children: [
                            "Preferred contact method",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "mt-1 w-full rounded border px-3 py-2",
                                value: form.preferred_contact_method ?? '',
                                onChange: (e)=>setForm({
                                        ...form,
                                        preferred_contact_method: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                                lineNumber: 116,
                                columnNumber: 60
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm md:col-span-2",
                        children: [
                            "Address",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "mt-1 w-full rounded border px-3 py-2",
                                value: form.address,
                                onChange: (e)=>setForm({
                                        ...form,
                                        address: e.target.value
                                    }),
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                                lineNumber: 118,
                                columnNumber: 57
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm",
                        children: [
                            "City",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "mt-1 w-full rounded border px-3 py-2",
                                value: form.city ?? '',
                                onChange: (e)=>setForm({
                                        ...form,
                                        city: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                                lineNumber: 119,
                                columnNumber: 40
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm",
                        children: [
                            "Province/State",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "mt-1 w-full rounded border px-3 py-2",
                                value: form.province_state ?? '',
                                onChange: (e)=>setForm({
                                        ...form,
                                        province_state: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                                lineNumber: 120,
                                columnNumber: 50
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm",
                        children: [
                            "Postal code",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "mt-1 w-full rounded border px-3 py-2",
                                value: form.postal_code ?? '',
                                onChange: (e)=>setForm({
                                        ...form,
                                        postal_code: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                                lineNumber: 121,
                                columnNumber: 47
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm",
                        children: [
                            "Country",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "mt-1 w-full rounded border px-3 py-2",
                                value: form.country,
                                onChange: (e)=>setForm({
                                        ...form,
                                        country: e.target.value
                                    }),
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                                lineNumber: 122,
                                columnNumber: 43
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm",
                        children: [
                            "Institution",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "mt-1 w-full rounded border px-3 py-2",
                                value: form.affiliation_institution ?? '',
                                onChange: (e)=>setForm({
                                        ...form,
                                        affiliation_institution: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                                lineNumber: 124,
                                columnNumber: 47
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm",
                        children: [
                            "Department",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "mt-1 w-full rounded border px-3 py-2",
                                value: form.affiliation_department ?? '',
                                onChange: (e)=>setForm({
                                        ...form,
                                        affiliation_department: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                                lineNumber: 125,
                                columnNumber: 46
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm",
                        children: [
                            "Position title",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "mt-1 w-full rounded border px-3 py-2",
                                value: form.affiliation_position_title ?? '',
                                onChange: (e)=>setForm({
                                        ...form,
                                        affiliation_position_title: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                                lineNumber: 126,
                                columnNumber: 50
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm",
                        children: [
                            "ORCID",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "mt-1 w-full rounded border px-3 py-2",
                                value: form.orcid ?? '',
                                onChange: (e)=>setForm({
                                        ...form,
                                        orcid: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                                lineNumber: 127,
                                columnNumber: 41
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm md:col-span-2",
                        children: [
                            "Expertise keywords (comma-separated)",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "mt-1 w-full rounded border px-3 py-2",
                                value: form.expertise_keywords ?? '',
                                onChange: (e)=>setForm({
                                        ...form,
                                        expertise_keywords: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                                lineNumber: 129,
                                columnNumber: 86
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm",
                        children: [
                            "Website URL",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "mt-1 w-full rounded border px-3 py-2",
                                value: form.website_url ?? '',
                                onChange: (e)=>setForm({
                                        ...form,
                                        website_url: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                                lineNumber: 131,
                                columnNumber: 47
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm",
                        children: [
                            "Google Scholar URL",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "mt-1 w-full rounded border px-3 py-2",
                                value: form.google_scholar_url ?? '',
                                onChange: (e)=>setForm({
                                        ...form,
                                        google_scholar_url: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                                lineNumber: 132,
                                columnNumber: 54
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm md:col-span-2",
                        children: [
                            "Scopus ID",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "mt-1 w-full rounded border px-3 py-2",
                                value: form.scopus_id ?? '',
                                onChange: (e)=>setForm({
                                        ...form,
                                        scopus_id: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                                lineNumber: 133,
                                columnNumber: 59
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 md:col-span-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            className: "rounded bg-slate-900 px-4 py-2 text-sm text-white disabled:opacity-60",
                            disabled: submitting,
                            children: submitting ? 'Submitting...' : 'Submit profile'
                        }, void 0, false, {
                            fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                            lineNumber: 136,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/app/external-academic/[token]/page.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client/app/external-academic/[token]/page.tsx",
        lineNumber: 90,
        columnNumber: 5
    }, this);
}
_s(ExternalAcademicInvitePage, "QuLc1vawWZahktTy0KU2pFP9bVs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = ExternalAcademicInvitePage;
var _c;
__turbopack_context__.k.register(_c, "ExternalAcademicInvitePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_e074a9a8._.js.map