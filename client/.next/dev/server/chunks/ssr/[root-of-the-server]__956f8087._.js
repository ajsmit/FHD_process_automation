module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/client/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs);
}
}),
"[project]/client/components/ui/badge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/lib/utils.ts [app-ssr] (ecmascript)");
;
;
const tone = {
    approved: 'bg-ok/20 text-ok',
    in_progress: 'bg-accent/20 text-accent',
    action_required: 'bg-warn/20 text-warn',
    default: 'bg-white/10 text-muted'
};
function Badge({ label, status = 'default' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('inline-flex rounded-full px-2 py-1 text-xs font-medium', tone[status]),
        children: label
    }, void 0, false, {
        fileName: "[project]/client/components/ui/badge.tsx",
        lineNumber: 11,
        columnNumber: 10
    }, this);
}
}),
"[project]/client/components/ui/button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function Button({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
        whileTap: {
            scale: 0.98
        },
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('inline-flex items-center justify-center rounded-xl border border-white/10 bg-surface2 px-3 py-2 text-sm font-semibold text-text shadow-card transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/client/components/ui/button.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
}),
"[project]/client/components/ui/card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Card({ children, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('rounded-xl2 border border-white/10 bg-surface/75 p-4 shadow-card backdrop-blur', className),
        children: children
    }, void 0, false, {
        fileName: "[project]/client/components/ui/card.tsx",
        lineNumber: 5,
        columnNumber: 10
    }, this);
}
}),
"[project]/client/components/ui/search-input.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SearchInput",
    ()=>SearchInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function SearchInput(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2 rounded-xl border border-white/10 bg-surface2 px-3 py-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                size: 16,
                className: "text-muted"
            }, void 0, false, {
                fileName: "[project]/client/components/ui/search-input.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ...props,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-full bg-transparent text-sm text-text outline-none placeholder:text-muted', props.className)
            }, void 0, false, {
                fileName: "[project]/client/components/ui/search-input.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client/components/ui/search-input.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
}),
"[project]/client/components/ui/sidebar-item.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SidebarItem",
    ()=>SidebarItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
function SidebarItem({ label, active, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-full rounded-xl px-3 py-2 text-left text-sm transition', active ? 'bg-accent/20 text-accent' : 'text-muted hover:bg-white/10 hover:text-text'),
        children: label
    }, void 0, false, {
        fileName: "[project]/client/components/ui/sidebar-item.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
}),
"[project]/client/app/title-registration/components/ExternalInviteModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExternalInviteModal",
    ()=>ExternalInviteModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/components/ui/button.tsx [app-ssr] (ecmascript)");
'use client';
;
;
function ExternalInviteModal({ open, role, email, onEmailChange, feedback, inviteLink, onSend, onClose }) {
    if (!open) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-lg rounded-2xl border border-white/10 bg-surface p-5 shadow-card",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-base font-semibold",
                    children: "Send External Profile Link"
                }, void 0, false, {
                    fileName: "[project]/client/app/title-registration/components/ExternalInviteModal.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-1 text-sm text-muted",
                    children: [
                        "Role: ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-medium text-text",
                            children: role
                        }, void 0, false, {
                            fileName: "[project]/client/app/title-registration/components/ExternalInviteModal.tsx",
                            lineNumber: 35,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/client/app/title-registration/components/ExternalInviteModal.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "mt-4 block space-y-1 text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-muted",
                            children: "External academic email"
                        }, void 0, false, {
                            fileName: "[project]/client/app/title-registration/components/ExternalInviteModal.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                            value: email,
                            onChange: (event)=>onEmailChange(event.target.value),
                            placeholder: "name@example.org"
                        }, void 0, false, {
                            fileName: "[project]/client/app/title-registration/components/ExternalInviteModal.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/client/app/title-registration/components/ExternalInviteModal.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this),
                feedback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: `mt-3 text-sm ${inviteLink ? 'text-emerald-400' : 'text-rose-400'}`,
                    children: feedback
                }, void 0, false, {
                    fileName: "[project]/client/app/title-registration/components/ExternalInviteModal.tsx",
                    lineNumber: 47,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4 flex gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: onSend,
                            children: "Send Link"
                        }, void 0, false, {
                            fileName: "[project]/client/app/title-registration/components/ExternalInviteModal.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            className: "bg-transparent",
                            onClick: onClose,
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/client/app/title-registration/components/ExternalInviteModal.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/client/app/title-registration/components/ExternalInviteModal.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/client/app/title-registration/components/ExternalInviteModal.tsx",
            lineNumber: 32,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client/app/title-registration/components/ExternalInviteModal.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
}),
"[project]/client/lib/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
const apiBase = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:3001/api/v1';
async function request(path, init) {
    const response = await fetch(`${apiBase}${path}`, {
        ...init,
        headers: {
            'Content-Type': 'application/json',
            ...init?.headers ?? {}
        },
        cache: 'no-store'
    });
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
}),
"[project]/client/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-ssr] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$search$2d$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/components/ui/search-input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$sidebar$2d$item$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/components/ui/sidebar-item.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$app$2f$title$2d$registration$2f$components$2f$ExternalInviteModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/app/title-registration/components/ExternalInviteModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/lib/api.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
const modules = [
    'title_registration',
    'supervisor_profiles',
    'mou',
    'pipeline',
    'tasks',
    'people',
    'approvals',
    'system',
    'radar',
    'timelines',
    'calendar',
    'kanban',
    'team',
    'policy'
];
function statusLabel(status) {
    const map = {
        awaiting_student_vetting: 'Awaiting student vetting',
        awaiting_supervisor_review: 'Awaiting supervisor review',
        returned_by_supervisor: 'Returned by supervisor',
        awaiting_dept_fhd_review: 'Awaiting Dept FHD review',
        awaiting_chairperson_signature: 'Awaiting Chairperson signature',
        awaiting_dept_fhd_send_to_faculty: 'Awaiting Dept FHD send to Faculty',
        returned_by_dept_fhd: 'Returned by Dept FHD',
        sent_to_faculty_fhd: 'Sent to Faculty FHD',
        returned_by_faculty_fhd: 'Returned by Faculty FHD',
        approved: 'Approved'
    };
    return map[status];
}
function statusTone(status) {
    if (status === 'approved') return 'approved';
    if (status.includes('returned')) return 'action_required';
    return 'in_progress';
}
const readonlyFormFields = [
    'Student Title',
    'Student First-Name',
    'Student Surname',
    'Student Number',
    'Department',
    'Degree',
    'Date of first title registration on SASI',
    'Student registration active on SASI',
    'Year first registered',
    'Has the MOU been submitted?'
];
function Page() {
    const [activeModule, setActiveModule] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('title_registration');
    const [studentNumber, setStudentNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('1234567');
    const [student, setStudent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [caseRecord, setCaseRecord] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pipeline, setPipeline] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [tasks, setTasks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [people, setPeople] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [peopleDirectory, setPeopleDirectory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [bcbDirectory, setBcbDirectory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [externalDirectory, setExternalDirectory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [supervisorProfiles, setSupervisorProfiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [mouRecord, setMouRecord] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mouData, setMouData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mouPdfPath, setMouPdfPath] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [notifications, setNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [pdfPath, setPdfPath] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [decision, setDecision] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('vetted');
    const [comments, setComments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [info, setInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lastSavedAt, setLastSavedAt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [externalSearchByRole, setExternalSearchByRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        supervisor: '',
        admin: '',
        co1: '',
        co2: ''
    });
    const [isInviteModalOpen, setIsInviteModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [inviteRole, setInviteRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('supervisor');
    const [inviteEmail, setInviteEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [inviteFeedback, setInviteFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [inviteLink, setInviteLink] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const printUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!pdfPath) return null;
        const idx = pdfPath.indexOf('/generated_forms/');
        if (idx === -1) return null;
        return `http://localhost:3001${pdfPath.slice(idx)}`;
    }, [
        pdfPath
    ]);
    const mouPrintUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!mouPdfPath) return null;
        const idx = mouPdfPath.indexOf('/generated_forms/');
        if (idx === -1) return null;
        return `http://localhost:3001${mouPdfPath.slice(idx)}`;
    }, [
        mouPdfPath
    ]);
    async function refreshCaseNotifications(id) {
        const noteResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNotifications"])(id);
        setNotifications(noteResponse.data);
    }
    async function refreshSupervisorProfiles(caseId) {
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSupervisorProfiles"])(caseId);
        setSupervisorProfiles(response.data);
    }
    async function refreshMou(caseId) {
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMou"])(caseId);
        setMouRecord(response.record);
        setMouData(response.formData);
        setMouPdfPath(response.record.pdf_path);
    }
    async function runSasiCheck() {
        setLoading(true);
        setError(null);
        setInfo(null);
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["checkSasi"])(studentNumber.trim());
            if (!response.eligible || !response.caseRecord || !response.formData || !response.student) {
                setError(response.reasons.join(' '));
                return;
            }
            setStudent(response.student);
            setCaseRecord(response.caseRecord);
            setFormData(response.formData);
            setPdfPath(response.caseRecord.pdf_path);
            const [peopleResult, bcbResult, externalResult] = await Promise.all([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDirectoryStaff"])({
                    internalOnly: true
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDirectoryStaff"])({
                    department: 'Department of Biodiversity and Conservation Biology',
                    internalOnly: true
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getExternalAcademics"])()
            ]);
            setPeopleDirectory(peopleResult.data);
            setBcbDirectory(bcbResult.data);
            setExternalDirectory(externalResult.data);
            await refreshCaseNotifications(response.caseRecord.id);
            await refreshSupervisorProfiles(response.caseRecord.id);
            try {
                await refreshMou(response.caseRecord.id);
            } catch  {
                setMouRecord(null);
                setMouData(null);
                setMouPdfPath(null);
            }
            setInfo('SASI check passed and form prefilled.');
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : 'SASI check failed');
        } finally{
            setLoading(false);
        }
    }
    async function saveField(label, value) {
        if (!caseRecord || !formData) return;
        const next = {
            ...formData,
            [label]: value
        };
        setFormData(next);
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["patchForm"])(caseRecord.id, {
                [label]: value
            });
            setCaseRecord(response.case);
            setFormData(response.formData);
            const now = new Date();
            const stamp = `${now.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            })} ${now.toLocaleDateString([], {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            })}`;
            setLastSavedAt(now.toISOString());
            await refreshSupervisorProfiles(caseRecord.id);
            if (mouRecord?.status !== 'completed') {
                try {
                    await refreshMou(caseRecord.id);
                } catch  {
                // MOU prerequisites may not be met yet.
                }
            }
            setInfo(`Saved ${label}. Information saved at ${stamp}.`);
        } catch (saveError) {
            setError(saveError instanceof Error ? saveError.message : 'Failed to save field');
        }
    }
    async function saveFields(patch) {
        if (!caseRecord || !formData) return;
        const next = {
            ...formData,
            ...patch
        };
        setFormData(next);
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["patchForm"])(caseRecord.id, patch);
            setCaseRecord(response.case);
            setFormData(response.formData);
            const now = new Date();
            const stamp = `${now.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            })} ${now.toLocaleDateString([], {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            })}`;
            setLastSavedAt(now.toISOString());
            setInfo(`Information saved at ${stamp}.`);
        } catch (saveError) {
            setError(saveError instanceof Error ? saveError.message : 'Failed to save form fields');
        }
    }
    async function saveSupervisorFields(patch) {
        if (!formData) return;
        const merged = {
            ...formData,
            ...patch
        };
        const nextPatch = {
            ...patch
        };
        if (merged['Administrative Supervisor same as Supervisor'] === 'Yes') {
            nextPatch['Administrative Supervisor is UWC-internal'] = merged['Supervisor is UWC-internal'];
            if (merged['Supervisor is UWC-internal'] === 'Yes') {
                nextPatch['Administrative Supervisor (Nominal Role)'] = merged.Supervisor;
                nextPatch['Administrative Supervisor Qualifications (Nominal Role)'] = merged['Supervisor Qualifications'];
            } else {
                const fullName = `${merged['Supervisor External First Name']} ${merged['Supervisor External Surname']}`.replace(/\s+/g, ' ').trim();
                nextPatch['Administrative Supervisor (Nominal Role)'] = fullName;
                nextPatch['Administrative Supervisor External Title'] = merged['Supervisor Title'];
                nextPatch['Administrative Supervisor External First Name'] = merged['Supervisor External First Name'];
                nextPatch['Administrative Supervisor External Surname'] = merged['Supervisor External Surname'];
                nextPatch['Administrative Supervisor Qualifications (Nominal Role)'] = merged['Supervisor Qualifications'];
                nextPatch['Administrative Supervisor External Address'] = merged['Supervisor External Address'];
                nextPatch['Administrative Supervisor External Email'] = merged['Supervisor External Email'];
                nextPatch['Administrative Supervisor External Lookup Id'] = merged['Supervisor External Lookup Id'];
            }
        }
        await saveFields(nextPatch);
    }
    function updateLocalFields(patch) {
        setFormData((prev)=>prev ? {
                ...prev,
                ...patch
            } : prev);
        setError(null);
    }
    function buildPersistablePatch(data) {
        const patch = {};
        for (const key of Object.keys(data)){
            if (!readonlyFormFields.includes(key)) {
                patch[key] = data[key];
            }
        }
        return patch;
    }
    async function persistCurrentForm(successPrefix) {
        if (!caseRecord || !formData) return false;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["patchForm"])(caseRecord.id, buildPersistablePatch(formData));
        setCaseRecord(response.case);
        setFormData(response.formData);
        const now = new Date();
        const stamp = `${now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        })} ${now.toLocaleDateString([], {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })}`;
        setLastSavedAt(now.toISOString());
        setInfo(successPrefix ? `${successPrefix} Information saved at ${stamp}.` : `Information saved at ${stamp}.`);
        return true;
    }
    async function saveCoSupervisorFields(patch) {
        await saveFields({
            'Has Co-supervisor?': 'Yes',
            ...patch
        });
    }
    function getCoSupervisorCount(data) {
        if (data['Has Co-supervisor?'] === 'No') {
            return 0;
        }
        if (data['Second Co-supervisor Title'].trim().toUpperCase() !== 'NA') {
            return 2;
        }
        return 1;
    }
    async function setCoSupervisorCount(count) {
        if (!formData) return;
        if (count === 0) {
            await saveFields({
                'Has Co-supervisor?': 'No',
                'Co-supervisor Title': 'NA',
                'Co-supervisor': 'NA',
                'Co-supervisor Qualifications': 'NA',
                'Co-supervisor is UWC-internal': 'Yes',
                'Co-supervisor External Lookup Id': '',
                'Co-supervisor External First Name': '',
                'Co-supervisor External Surname': '',
                'Co-supervisor External Address': '',
                'Co-supervisor External Email': '',
                'Second Co-supervisor Title': 'NA',
                'Second Co-supervisor': 'NA',
                'Second Co-supervisor Qualifications': 'NA',
                'Second Co-supervisor is UWC-internal': 'Yes',
                'Second Co-supervisor External Lookup Id': '',
                'Second Co-supervisor External First Name': '',
                'Second Co-supervisor External Surname': '',
                'Second Co-supervisor External Address': '',
                'Second Co-supervisor External Email': ''
            });
            return;
        }
        if (count === 1) {
            await saveFields({
                'Has Co-supervisor?': 'Yes',
                'Co-supervisor Title': formData['Co-supervisor Title'] === 'NA' ? 'Dr' : formData['Co-supervisor Title'],
                'Co-supervisor': formData['Co-supervisor'] === 'NA' ? '' : formData['Co-supervisor'],
                'Co-supervisor Qualifications': formData['Co-supervisor Qualifications'] === 'NA' ? '' : formData['Co-supervisor Qualifications'],
                'Second Co-supervisor Title': 'NA',
                'Second Co-supervisor': 'NA',
                'Second Co-supervisor Qualifications': 'NA',
                'Second Co-supervisor is UWC-internal': 'Yes',
                'Second Co-supervisor External Lookup Id': '',
                'Second Co-supervisor External First Name': '',
                'Second Co-supervisor External Surname': '',
                'Second Co-supervisor External Address': '',
                'Second Co-supervisor External Email': ''
            });
            return;
        }
        await saveFields({
            'Has Co-supervisor?': 'Yes',
            'Co-supervisor Title': formData['Co-supervisor Title'] === 'NA' ? 'Dr' : formData['Co-supervisor Title'],
            'Co-supervisor': formData['Co-supervisor'] === 'NA' ? '' : formData['Co-supervisor'],
            'Co-supervisor Qualifications': formData['Co-supervisor Qualifications'] === 'NA' ? '' : formData['Co-supervisor Qualifications'],
            'Second Co-supervisor Title': formData['Second Co-supervisor Title'] === 'NA' ? 'Dr' : formData['Second Co-supervisor Title'],
            'Second Co-supervisor': formData['Second Co-supervisor'] === 'NA' ? '' : formData['Second Co-supervisor'],
            'Second Co-supervisor Qualifications': formData['Second Co-supervisor Qualifications'] === 'NA' ? '' : formData['Second Co-supervisor Qualifications']
        });
    }
    function formatInternalPerson(person) {
        const fullName = `${person.first_name ?? ''} ${person.last_name ?? ''}`.trim() || person.staff_name;
        return `${person.staff_title ? `${person.staff_title} ` : ''}${fullName}`.trim();
    }
    function internalPersonValue(person) {
        return `${person.first_name ?? ''} ${person.last_name ?? ''}`.trim() || person.staff_name;
    }
    function normalizePersonName(value) {
        return value.trim().toLowerCase().replace(/\s+/g, ' ');
    }
    function resolveInternalDisplayName(value, directory) {
        const normalized = normalizePersonName(value);
        const matched = directory.find((person)=>{
            const staffName = normalizePersonName(person.staff_name);
            const firstLast = normalizePersonName(`${person.first_name ?? ''} ${person.last_name ?? ''}`);
            return normalized === staffName || normalized === firstLast;
        });
        if (!matched) {
            return value.trim();
        }
        return formatInternalPerson(matched);
    }
    function formatExternalPerson(person) {
        const idPart = person.unique_identifier_type && person.unique_identifier_value ? ` [${person.unique_identifier_type}: ${person.unique_identifier_value}]` : '';
        return `${person.title ? `${person.title} ` : ''}${person.first_name} ${person.last_name}`.replace(/\s+/g, ' ').trim() + idPart;
    }
    const externalDirectorySearchIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>externalDirectory.map((person)=>({
                person,
                searchText: [
                    person.full_name,
                    person.last_name,
                    person.email,
                    person.alternate_email,
                    person.unique_identifier_value,
                    person.unique_identifier_type
                ].join(' ').toLowerCase()
            })), [
        externalDirectory
    ]);
    const filteredExternalByRole = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const roles = [
            'supervisor',
            'admin',
            'co1',
            'co2'
        ];
        const result = {
            supervisor: externalDirectory,
            admin: externalDirectory,
            co1: externalDirectory,
            co2: externalDirectory
        };
        for (const role of roles){
            const query = externalSearchByRole[role].trim().toLowerCase();
            if (!query) {
                result[role] = externalDirectory;
                continue;
            }
            result[role] = externalDirectorySearchIndex.filter((item)=>item.searchText.includes(query)).map((item)=>item.person);
        }
        return result;
    }, [
        externalDirectory,
        externalDirectorySearchIndex,
        externalSearchByRole
    ]);
    function filteredExternalDirectory(role) {
        return filteredExternalByRole[role];
    }
    function openInviteModal(role, suggestedEmail) {
        setInviteRole(role);
        setInviteEmail((suggestedEmail ?? '').trim());
        setInviteFeedback(null);
        setInviteLink(null);
        setIsInviteModalOpen(true);
    }
    async function handleInviteExternalAcademic(role) {
        if (!caseRecord) return;
        setInviteFeedback(null);
        setInviteLink(null);
        setError(null);
        setInfo(null);
        if (!inviteEmail.trim()) {
            setInviteFeedback('Please enter an email address to request an external academic profile.');
            return;
        }
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createExternalAcademicInvite"])(caseRecord.id, role, inviteEmail.trim());
            setInviteEmail('');
            setIsInviteModalOpen(false);
            setInviteLink(result.inviteLink);
            setInviteFeedback(`External academic invite sent. Expires on ${new Date(result.expiresAt).toLocaleDateString([], {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            })}.`);
        } catch (requestError) {
            setInviteFeedback(requestError instanceof Error ? requestError.message : 'Failed to send external academic invite');
        }
    }
    async function applyExternalLookup(role, value) {
        if (!formData) return;
        const selected = externalDirectory.find((entry)=>String(entry.id) === value);
        if (role === 'supervisor') {
            await saveSupervisorFields({
                'Supervisor is UWC-internal': 'No',
                'Supervisor External Lookup Id': value,
                'Supervisor Title': selected?.title ?? formData['Supervisor Title'],
                'Supervisor External First Name': selected?.first_name ?? formData['Supervisor External First Name'],
                'Supervisor External Surname': selected?.last_name ?? formData['Supervisor External Surname'],
                'Supervisor Qualifications': selected?.highest_qualification ?? formData['Supervisor Qualifications'],
                'Supervisor External Address': selected?.address ?? formData['Supervisor External Address'],
                'Supervisor External Email': selected?.email ?? formData['Supervisor External Email']
            });
            return;
        }
        if (role === 'admin') {
            await saveFields({
                'Administrative Supervisor External Lookup Id': value,
                'Administrative Supervisor External Title': selected?.title ?? formData['Administrative Supervisor External Title'],
                'Administrative Supervisor External First Name': selected?.first_name ?? formData['Administrative Supervisor External First Name'],
                'Administrative Supervisor External Surname': selected?.last_name ?? formData['Administrative Supervisor External Surname'],
                'Administrative Supervisor Qualifications (Nominal Role)': selected?.highest_qualification ?? formData['Administrative Supervisor Qualifications (Nominal Role)'],
                'Administrative Supervisor External Address': selected?.address ?? formData['Administrative Supervisor External Address'],
                'Administrative Supervisor External Email': selected?.email ?? formData['Administrative Supervisor External Email']
            });
            return;
        }
        if (role === 'co1') {
            await saveCoSupervisorFields({
                'Co-supervisor is UWC-internal': 'No',
                'Co-supervisor External Lookup Id': value,
                'Co-supervisor Title': selected?.title ?? formData['Co-supervisor Title'],
                'Co-supervisor External First Name': selected?.first_name ?? formData['Co-supervisor External First Name'],
                'Co-supervisor External Surname': selected?.last_name ?? formData['Co-supervisor External Surname'],
                'Co-supervisor Qualifications': selected?.highest_qualification ?? formData['Co-supervisor Qualifications'],
                'Co-supervisor External Address': selected?.address ?? formData['Co-supervisor External Address'],
                'Co-supervisor External Email': selected?.email ?? formData['Co-supervisor External Email']
            });
            return;
        }
        await saveCoSupervisorFields({
            'Second Co-supervisor is UWC-internal': 'No',
            'Second Co-supervisor External Lookup Id': value,
            'Second Co-supervisor Title': selected?.title ?? formData['Second Co-supervisor Title'],
            'Second Co-supervisor External First Name': selected?.first_name ?? formData['Second Co-supervisor External First Name'],
            'Second Co-supervisor External Surname': selected?.last_name ?? formData['Second Co-supervisor External Surname'],
            'Second Co-supervisor Qualifications': selected?.highest_qualification ?? formData['Second Co-supervisor Qualifications'],
            'Second Co-supervisor External Address': selected?.address ?? formData['Second Co-supervisor External Address'],
            'Second Co-supervisor External Email': selected?.email ?? formData['Second Co-supervisor External Email']
        });
    }
    async function handleAdminSupervisorSameAsSupervisorChange(value) {
        if (!formData) return;
        const patch = {
            'Administrative Supervisor same as Supervisor': value
        };
        // Defensively re-affirm the state of the main supervisor to prevent resets.
        patch['Supervisor is UWC-internal'] = formData['Supervisor is UWC-internal'];
        if (formData['Supervisor is UWC-internal'] === 'Yes') {
            patch.Supervisor = formData.Supervisor;
            patch['Supervisor Qualifications'] = formData['Supervisor Qualifications'];
        } else {
            patch['Supervisor Title'] = formData['Supervisor Title'];
            patch['Supervisor External First Name'] = formData['Supervisor External First Name'];
            patch['Supervisor External Surname'] = formData['Supervisor External Surname'];
            patch['Supervisor Qualifications'] = formData['Supervisor Qualifications'];
            patch['Supervisor External Address'] = formData['Supervisor External Address'];
            patch['Supervisor External Email'] = formData['Supervisor External Email'];
            patch['Supervisor External Lookup Id'] = formData['Supervisor External Lookup Id'];
        }
        if (value === 'Yes') {
            // If admin is same, copy the now-affirmed supervisor details.
            patch['Administrative Supervisor is UWC-internal'] = patch['Supervisor is UWC-internal'];
            if (patch['Supervisor is UWC-internal'] === 'Yes') {
                patch['Administrative Supervisor (Nominal Role)'] = patch.Supervisor;
                patch['Administrative Supervisor Qualifications (Nominal Role)'] = patch['Supervisor Qualifications'];
            } else {
                patch['Administrative Supervisor (Nominal Role)'] = `${patch['Supervisor External First Name']} ${patch['Supervisor External Surname']}`.replace(/\s+/g, ' ').trim();
                patch['Administrative Supervisor External Title'] = patch['Supervisor Title'];
                patch['Administrative Supervisor External First Name'] = patch['Supervisor External First Name'];
                patch['Administrative Supervisor External Surname'] = patch['Supervisor External Surname'];
                patch['Administrative Supervisor Qualifications (Nominal Role)'] = patch['Supervisor Qualifications'];
                patch['Administrative Supervisor External Address'] = patch['Supervisor External Address'];
                patch['Administrative Supervisor External Email'] = patch['Supervisor External Email'];
                patch['Administrative Supervisor External Lookup Id'] = patch['Supervisor External Lookup Id'];
            }
        } else {
            // If not the same, reset the admin fields.
            patch['Administrative Supervisor (Nominal Role)'] = '';
            patch['Administrative Supervisor Qualifications (Nominal Role)'] = '';
            patch['Administrative Supervisor External Title'] = '';
            patch['Administrative Supervisor External First Name'] = '';
            patch['Administrative Supervisor External Surname'] = '';
            patch['Administrative Supervisor External Address'] = '';
            patch['Administrative Supervisor External Email'] = '';
            patch['Administrative Supervisor External Lookup Id'] = '';
            patch['Administrative Supervisor is UWC-internal'] = 'Yes';
        }
        await saveFields(patch);
    }
    async function handleGeneratePdf() {
        if (!caseRecord || !formData) return;
        setError(null);
        setIsSaving(true);
        try {
            const saved = await persistCurrentForm();
            if (!saved) return;
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generatePrintPdf"])(caseRecord.id);
            setPdfPath(response.pdfPath);
            setInfo('Information saved and PDF generated from exact canonical template.');
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : 'Failed to save form before PDF generation');
        } finally{
            setIsSaving(false);
        }
    }
    async function handleSaveFormNow() {
        if (!caseRecord || !formData) return;
        setError(null);
        setIsSaving(true);
        try {
            await persistCurrentForm();
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : 'Failed to save form');
        } finally{
            setIsSaving(false);
        }
    }
    async function handleStudentVet() {
        if (!caseRecord) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["studentVet"])(caseRecord.id);
        setCaseRecord(response.case);
        await refreshCaseNotifications(caseRecord.id);
        setInfo('Form vetted by student and emailed to supervisor queue.');
    }
    async function handleSupervisorReview() {
        if (!caseRecord) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supervisorReview"])(caseRecord.id, decision, comments);
        setCaseRecord(response.case);
        await refreshCaseNotifications(caseRecord.id);
        setInfo('Supervisor action captured and notifications queued.');
    }
    async function handleDeptReview() {
        if (!caseRecord) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deptReview"])(caseRecord.id, decision, comments);
        setCaseRecord(response.case);
        await refreshCaseNotifications(caseRecord.id);
        setInfo('Dept FHD action captured.');
    }
    async function handleFacultyReview() {
        if (!caseRecord) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["facultyReview"])(caseRecord.id, decision, comments);
        setCaseRecord(response.case);
        await refreshCaseNotifications(caseRecord.id);
        setInfo('Faculty FHD action captured.');
    }
    async function handleChairpersonSign() {
        if (!caseRecord) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["chairpersonSign"])(caseRecord.id, comments);
        setCaseRecord(response.case);
        await refreshCaseNotifications(caseRecord.id);
        setInfo('Chairperson signature recorded. Awaiting Dept FHD send-to-Faculty.');
    }
    async function handleDeptSendFaculty() {
        if (!caseRecord) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deptSendFaculty"])(caseRecord.id);
        setCaseRecord(response.case);
        await refreshCaseNotifications(caseRecord.id);
        setInfo('Dept FHD sent to Faculty FHD rep after Chairperson signature.');
    }
    async function loadModuleData(moduleKey) {
        setActiveModule(moduleKey);
        setError(null);
        setInfo(null);
        if (moduleKey === 'mou' && caseRecord) {
            await refreshMou(caseRecord.id);
        }
        if (moduleKey === 'supervisor_profiles' && caseRecord) {
            await refreshSupervisorProfiles(caseRecord.id);
        }
        if (moduleKey === 'pipeline') {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPipeline"])();
            setPipeline(response.data);
        }
        if (moduleKey === 'tasks') {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTasks"])();
            setTasks(response.data);
        }
        if (moduleKey === 'people' || moduleKey === 'team') {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPeople"])();
            setPeople(response.data);
        }
        if (moduleKey === 'approvals' || moduleKey === 'system') {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNotifications"])(caseRecord?.id);
            setNotifications(response.data);
        }
    }
    async function triggerReminder() {
        if (!caseRecord) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sendReminder"])(caseRecord.id);
        if (response.sent) {
            await refreshCaseNotifications(caseRecord.id);
            setInfo('Reminder queued to Faculty FHD rep and Dept FHD rep.');
        } else {
            setInfo(response.reason ?? 'No reminder sent.');
        }
    }
    async function updateProfileField(profileId, patch) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["patchSupervisorProfile"])(profileId, patch);
        if (caseRecord) {
            await refreshSupervisorProfiles(caseRecord.id);
        }
        setInfo('Supervisor profile updated.');
    }
    async function handleSubmitProfile(profileId) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["submitSupervisorProfile"])(profileId);
        if (caseRecord) {
            await refreshSupervisorProfiles(caseRecord.id);
        }
        setInfo('Supervisor profile marked completed.');
    }
    async function handleRequestProfiles() {
        if (!caseRecord) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["requestSupervisorProfiles"])(caseRecord.id);
        await refreshSupervisorProfiles(caseRecord.id);
        setInfo(`Requested completion for ${response.requested} supervisor profile form(s).`);
    }
    async function handleSupervisorProfileReminder() {
        if (!caseRecord) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sendSupervisorProfilesReminder"])(caseRecord.id);
        if (response.sent) {
            await refreshCaseNotifications(caseRecord.id);
            setInfo('Supervisor profile reminder queued.');
            return;
        }
        setInfo(response.reason ?? 'No reminder sent.');
    }
    async function handleUploadProfileCv(profileId, file) {
        const contentBase64 = await new Promise((resolve, reject)=>{
            const reader = new FileReader();
            reader.onload = ()=>resolve(String(reader.result ?? ''));
            reader.onerror = ()=>reject(new Error('Failed to read file.'));
            reader.readAsDataURL(file);
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uploadSupervisorProfileCv"])(profileId, {
            fileName: file.name,
            contentBase64
        });
        if (caseRecord) {
            await refreshSupervisorProfiles(caseRecord.id);
        }
        setInfo('CV uploaded for supervisor profile.');
    }
    async function saveMouField(label, value) {
        if (!caseRecord || !mouData) return;
        const next = {
            ...mouData,
            [label]: value
        };
        setMouData(next);
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["patchMou"])(caseRecord.id, {
            [label]: value
        });
        setMouRecord(response.record);
        setMouData(response.formData);
        setInfo(`Saved MOU field: ${label}`);
    }
    async function handleCompleteMou() {
        if (!caseRecord) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["completeMou"])(caseRecord.id);
        setMouRecord(response.record);
        await runSasiCheck();
        setInfo('MOU completed. Thesis title formalities package is finalized.');
    }
    async function handlePrintMou() {
        if (!caseRecord) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["printMou"])(caseRecord.id);
        setMouPdfPath(response.pdfPath);
        setInfo('MOU PDF generated.');
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen p-4 md:p-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                y: 12
            },
            animate: {
                opacity: 1,
                y: 0
            },
            className: "mx-auto grid max-w-7xl gap-4 md:grid-cols-[220px_1fr]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                    className: "h-fit",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "mb-3 text-lg font-bold",
                            children: "FHD Dashboard"
                        }, void 0, false, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 777,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-1",
                            children: modules.map((moduleName)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$sidebar$2d$item$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SidebarItem"], {
                                    label: moduleName.replace('_', ' '),
                                    active: moduleName === activeModule,
                                    onClick: ()=>void loadModuleData(moduleName)
                                }, moduleName, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 780,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 778,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/client/app/page.tsx",
                    lineNumber: 776,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-3 md:grid-cols-[1fr_auto] md:items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$search$2d$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SearchInput"], {
                                            value: studentNumber,
                                            onChange: (event)=>setStudentNumber(event.target.value),
                                            placeholder: "Enter SASI student number (e.g. 1234567)"
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 788,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            disabled: loading,
                                            onClick: ()=>void runSasiCheck(),
                                            children: "Check SASI"
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 789,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 787,
                                    columnNumber: 13
                                }, this),
                                student && caseRecord && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 flex flex-wrap items-center gap-2 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                student.first_names,
                                                " ",
                                                student.last_name
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 795,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                            label: statusLabel(caseRecord.case_status),
                                            status: statusTone(caseRecord.case_status)
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 796,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-muted",
                                            children: [
                                                "Completion ",
                                                caseRecord.completion_percent,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 797,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 794,
                                    columnNumber: 15
                                }, this),
                                caseRecord && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-2 h-2 overflow-hidden rounded-full bg-white/10",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-full rounded-full bg-accent transition-all",
                                        style: {
                                            width: `${caseRecord.completion_percent}%`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/page.tsx",
                                        lineNumber: 802,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 801,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 786,
                            columnNumber: 11
                        }, this),
                        activeModule === 'title_registration' && formData && caseRecord && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TitleRegistrationModule, {
                                    formData: formData,
                                    caseRecord: caseRecord,
                                    peopleDirectory: peopleDirectory,
                                    bcbDirectory: bcbDirectory,
                                    externalSearchByRole: externalSearchByRole,
                                    setExternalSearchByRole: setExternalSearchByRole,
                                    filteredExternalDirectory: filteredExternalDirectory,
                                    formatExternalPerson: formatExternalPerson,
                                    formatInternalPerson: formatInternalPerson,
                                    internalPersonValue: internalPersonValue,
                                    resolveInternalDisplayName: resolveInternalDisplayName,
                                    getCoSupervisorCount: getCoSupervisorCount,
                                    setCoSupervisorCount: setCoSupervisorCount,
                                    saveField: saveField,
                                    saveCoSupervisorFields: saveCoSupervisorFields,
                                    updateLocalFields: updateLocalFields,
                                    applyExternalLookup: applyExternalLookup,
                                    openInviteModal: openInviteModal,
                                    handleAdminSupervisorSameAsSupervisorChange: handleAdminSupervisorSameAsSupervisorChange,
                                    loadModuleData: loadModuleData,
                                    handleSaveFormNow: handleSaveFormNow,
                                    handleGeneratePdf: handleGeneratePdf,
                                    handleStudentVet: handleStudentVet,
                                    handleSupervisorReview: handleSupervisorReview,
                                    handleDeptReview: handleDeptReview,
                                    handleChairpersonSign: handleChairpersonSign,
                                    handleDeptSendFaculty: handleDeptSendFaculty,
                                    handleFacultyReview: handleFacultyReview,
                                    triggerReminder: triggerReminder,
                                    isSaving: isSaving,
                                    printUrl: printUrl,
                                    lastSavedAt: lastSavedAt,
                                    decision: decision,
                                    setDecision: setDecision,
                                    comments: comments,
                                    setComments: setComments,
                                    inviteFeedback: inviteFeedback,
                                    inviteLink: inviteLink
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 809,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$app$2f$title$2d$registration$2f$components$2f$ExternalInviteModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ExternalInviteModal"], {
                                    open: isInviteModalOpen,
                                    role: inviteRole,
                                    email: inviteEmail,
                                    onEmailChange: setInviteEmail,
                                    feedback: inviteFeedback,
                                    inviteLink: inviteLink,
                                    onSend: ()=>void handleInviteExternalAcademic(inviteRole),
                                    onClose: ()=>{
                                        setIsInviteModalOpen(false);
                                        setInviteFeedback(null);
                                        setInviteLink(null);
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 849,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true),
                        activeModule === 'supervisor_profiles' && caseRecord && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mb-3 text-base font-bold",
                                    children: "Supervisor Profile Forms"
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 868,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-3 flex flex-wrap gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: ()=>void handleRequestProfiles(),
                                            children: "Request Completion"
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 870,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: ()=>void handleSupervisorProfileReminder(),
                                            children: "Send Reminder"
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 871,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 869,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: [
                                        supervisorProfiles.map((profile)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-xl border border-white/10 bg-surface2 p-3 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mb-2 font-semibold",
                                                        children: [
                                                            profile.role.replace('_', ' '),
                                                            ": ",
                                                            profile.person_title,
                                                            " ",
                                                            profile.person_name,
                                                            " (",
                                                            profile.status,
                                                            ")"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/client/app/page.tsx",
                                                        lineNumber: 876,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid gap-2 md:grid-cols-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "space-y-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-muted",
                                                                        children: "Publications in last 4 years (3-5)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/client/app/page.tsx",
                                                                        lineNumber: 881,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        className: "w-full rounded-xl border border-white/10 bg-surface px-3 py-2",
                                                                        value: profile.publication_count ?? '',
                                                                        onChange: (event)=>{
                                                                            const raw = event.target.value.trim();
                                                                            const next = raw ? Number.parseInt(raw, 10) : null;
                                                                            void updateProfileField(profile.id, {
                                                                                publication_count: Number.isNaN(next) ? null : next
                                                                            });
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/client/app/page.tsx",
                                                                        lineNumber: 882,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/client/app/page.tsx",
                                                                lineNumber: 880,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "space-y-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-muted",
                                                                        children: "New to department?"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/client/app/page.tsx",
                                                                        lineNumber: 893,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                        className: "w-full rounded-xl border border-white/10 bg-surface px-3 py-2",
                                                                        value: profile.new_to_department,
                                                                        onChange: (event)=>void updateProfileField(profile.id, {
                                                                                new_to_department: event.target.value
                                                                            }),
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "No",
                                                                                children: "No"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/client/app/page.tsx",
                                                                                lineNumber: 899,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "Yes",
                                                                                children: "Yes"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/client/app/page.tsx",
                                                                                lineNumber: 900,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/client/app/page.tsx",
                                                                        lineNumber: 894,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/client/app/page.tsx",
                                                                lineNumber: 892,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "space-y-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-muted",
                                                                        children: "CV attached?"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/client/app/page.tsx",
                                                                        lineNumber: 904,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                        className: "w-full rounded-xl border border-white/10 bg-surface px-3 py-2",
                                                                        value: profile.cv_attached,
                                                                        onChange: (event)=>void updateProfileField(profile.id, {
                                                                                cv_attached: event.target.value
                                                                            }),
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "No",
                                                                                children: "No"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/client/app/page.tsx",
                                                                                lineNumber: 910,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "Yes",
                                                                                children: "Yes"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/client/app/page.tsx",
                                                                                lineNumber: 911,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/client/app/page.tsx",
                                                                        lineNumber: 905,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/client/app/page.tsx",
                                                                lineNumber: 903,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "space-y-1 md:col-span-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-muted",
                                                                        children: "CV upload (.pdf, .doc, .docx)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/client/app/page.tsx",
                                                                        lineNumber: 915,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "file",
                                                                        accept: ".pdf,.doc,.docx",
                                                                        className: "w-full rounded-xl border border-white/10 bg-surface px-3 py-2",
                                                                        onChange: (event)=>{
                                                                            const file = event.target.files?.[0];
                                                                            if (file) {
                                                                                void handleUploadProfileCv(profile.id, file);
                                                                            }
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/client/app/page.tsx",
                                                                        lineNumber: 916,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    profile.cv_file_path && (()=>{
                                                                        const idx = profile.cv_file_path.indexOf('/generated_forms/');
                                                                        if (idx === -1) return null;
                                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                            className: "text-xs text-accent",
                                                                            href: `http://localhost:3001${profile.cv_file_path.slice(idx)}`,
                                                                            target: "_blank",
                                                                            rel: "noreferrer",
                                                                            children: "Open uploaded CV"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/client/app/page.tsx",
                                                                            lineNumber: 932,
                                                                            columnNumber: 31
                                                                        }, this);
                                                                    })()
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/client/app/page.tsx",
                                                                lineNumber: 914,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "space-y-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-muted",
                                                                        children: "Contact email"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/client/app/page.tsx",
                                                                        lineNumber: 945,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        className: "w-full rounded-xl border border-white/10 bg-surface px-3 py-2",
                                                                        value: profile.contact_email,
                                                                        onChange: (event)=>void updateProfileField(profile.id, {
                                                                                contact_email: event.target.value
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/client/app/page.tsx",
                                                                        lineNumber: 946,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/client/app/page.tsx",
                                                                lineNumber: 944,
                                                                columnNumber: 23
                                                            }, this),
                                                            profile.role === 'co_supervisor' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "space-y-1 md:col-span-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-muted",
                                                                        children: "Point 5.2 Motivation (contribution, not expertise)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/client/app/page.tsx",
                                                                        lineNumber: 950,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                        className: "min-h-20 w-full rounded-xl border border-white/10 bg-surface px-3 py-2",
                                                                        value: profile.contribution_motivation,
                                                                        onChange: (event)=>void updateProfileField(profile.id, {
                                                                                contribution_motivation: event.target.value
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/client/app/page.tsx",
                                                                        lineNumber: 951,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/client/app/page.tsx",
                                                                lineNumber: 949,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "space-y-1 md:col-span-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-muted",
                                                                        children: "Latest publications (one per line, 3-5 max)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/client/app/page.tsx",
                                                                        lineNumber: 955,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                        className: "min-h-24 w-full rounded-xl border border-white/10 bg-surface px-3 py-2",
                                                                        value: (()=>{
                                                                            try {
                                                                                const arr = JSON.parse(profile.recent_publications_json);
                                                                                return Array.isArray(arr) ? arr.join('\n') : '';
                                                                            } catch  {
                                                                                return '';
                                                                            }
                                                                        })(),
                                                                        onChange: (event)=>void updateProfileField(profile.id, {
                                                                                recent_publications: event.target.value.split('\n').map((line)=>line.trim()).filter(Boolean)
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/client/app/page.tsx",
                                                                        lineNumber: 956,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/client/app/page.tsx",
                                                                lineNumber: 954,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/client/app/page.tsx",
                                                        lineNumber: 879,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                            onClick: ()=>void handleSubmitProfile(profile.id),
                                                            disabled: profile.status === 'completed' || profile.cv_attached !== 'Yes' || !profile.cv_file_path,
                                                            children: "Mark Profile Completed"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client/app/page.tsx",
                                                            lineNumber: 971,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/page.tsx",
                                                        lineNumber: 970,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, profile.id, true, {
                                                fileName: "[project]/client/app/page.tsx",
                                                lineNumber: 875,
                                                columnNumber: 19
                                            }, this)),
                                        supervisorProfiles.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-muted",
                                            children: "No supervisor profile forms activated yet. Enter supervisor details in ROTT first."
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 980,
                                            columnNumber: 53
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 873,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 867,
                            columnNumber: 13
                        }, this),
                        activeModule === 'mou' && caseRecord && mouData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mb-3 text-base font-bold",
                                    children: "MOU 2026 Module"
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 987,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-3 text-sm text-muted",
                                    children: "Prefilled from ROTT + Supervisor Profiles. Complete remaining sections, confirm signatures, then generate final PDF for Faculty HD records."
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 988,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-3 text-sm text-muted",
                                    children: [
                                        "Status: ",
                                        mouRecord?.status ?? 'draft',
                                        " • Completion: ",
                                        mouRecord?.completion_percent ?? 0,
                                        "%"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 989,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-3 md:grid-cols-2",
                                    children: [
                                        [
                                            'Student Full Name',
                                            'Student Number',
                                            'Degree',
                                            'Department',
                                            'First Year of Registration',
                                            'Study Mode',
                                            'Expected Date of Completion',
                                            'Thesis Title',
                                            'Brief Description of Project (<200 words)',
                                            'Principal Supervisor',
                                            'Principal Supervisor Highest Qualifications',
                                            'Principal Supervisor Main Responsibilities',
                                            'Co-supervisor(s)',
                                            'Co-supervisor Highest Qualifications',
                                            'Co-supervisor Main Responsibilities',
                                            'Supervisor Availability Arrangements',
                                            'Student Leave Entitlement Per Annum',
                                            'Student Extended Research Away from UWC Arrangements',
                                            'Prescribed Courses/Workshops',
                                            'Time Allocation',
                                            'Space Allocation',
                                            'Computer Facilities',
                                            'Financial Arrangements for Project',
                                            'Publication Issues',
                                            'Data Ownership',
                                            'Supervisor-Student Meetings',
                                            'Progress Reports',
                                            'Study Outputs',
                                            'Research Visits/Conferences',
                                            'Other Duties',
                                            'Other Expectations',
                                            'Other Issues Relevant to Study'
                                        ].map((label)=>{
                                            const isReadonly = new Set([
                                                'Student Full Name',
                                                'Student Number',
                                                'Degree',
                                                'Department',
                                                'First Year of Registration',
                                                'Study Mode',
                                                'Expected Date of Completion',
                                                'Thesis Title',
                                                'Principal Supervisor',
                                                'Principal Supervisor Highest Qualifications',
                                                'Co-supervisor(s)',
                                                'Co-supervisor Highest Qualifications'
                                            ]).has(label);
                                            const isLong = [
                                                'Brief Description of Project (<200 words)',
                                                'Principal Supervisor Main Responsibilities',
                                                'Co-supervisor Main Responsibilities',
                                                'Supervisor Availability Arrangements',
                                                'Student Extended Research Away from UWC Arrangements',
                                                'Prescribed Courses/Workshops',
                                                'Time Allocation',
                                                'Computer Facilities',
                                                'Financial Arrangements for Project',
                                                'Publication Issues',
                                                'Data Ownership',
                                                'Supervisor-Student Meetings',
                                                'Progress Reports',
                                                'Study Outputs',
                                                'Research Visits/Conferences',
                                                'Other Duties',
                                                'Other Expectations',
                                                'Other Issues Relevant to Study'
                                            ].includes(label);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: `space-y-1 text-sm ${isLong ? 'md:col-span-2' : ''}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted",
                                                        children: label
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/page.tsx",
                                                        lineNumber: 1063,
                                                        columnNumber: 23
                                                    }, this),
                                                    isLong ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                        className: "min-h-20 w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                        value: mouData[label],
                                                        disabled: isReadonly || mouRecord?.status === 'completed',
                                                        onChange: (event)=>void saveMouField(label, event.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/page.tsx",
                                                        lineNumber: 1065,
                                                        columnNumber: 25
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                        value: mouData[label],
                                                        disabled: isReadonly || mouRecord?.status === 'completed',
                                                        onChange: (event)=>void saveMouField(label, event.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/page.tsx",
                                                        lineNumber: 1067,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, label, true, {
                                                fileName: "[project]/client/app/page.tsx",
                                                lineNumber: 1062,
                                                columnNumber: 21
                                            }, this);
                                        }),
                                        [
                                            'Student Signature Confirmed',
                                            'Supervisor Signature Confirmed',
                                            'Co-supervisor Signature Confirmed',
                                            'Dept Chair/PG Coord Signature Confirmed'
                                        ].map((label)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "space-y-1 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted",
                                                        children: label
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/page.tsx",
                                                        lineNumber: 1082,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                        value: mouData[label],
                                                        disabled: mouRecord?.status === 'completed',
                                                        onChange: (event)=>void saveMouField(label, event.target.value),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "No",
                                                                children: "No"
                                                            }, void 0, false, {
                                                                fileName: "[project]/client/app/page.tsx",
                                                                lineNumber: 1084,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "Yes",
                                                                children: "Yes"
                                                            }, void 0, false, {
                                                                fileName: "[project]/client/app/page.tsx",
                                                                lineNumber: 1085,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/client/app/page.tsx",
                                                        lineNumber: 1083,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, label, true, {
                                                fileName: "[project]/client/app/page.tsx",
                                                lineNumber: 1081,
                                                columnNumber: 19
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 990,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 flex flex-wrap gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: ()=>void handlePrintMou(),
                                            children: "Generate MOU PDF"
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1092,
                                            columnNumber: 17
                                        }, this),
                                        mouPrintUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: mouPrintUrl,
                                            target: "_blank",
                                            rel: "noreferrer",
                                            className: "inline-flex items-center rounded-xl border border-accent/60 px-3 py-2 text-sm font-semibold text-accent",
                                            children: "Open MOU PDF"
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1094,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: ()=>void handleCompleteMou(),
                                            disabled: mouRecord?.status === 'completed',
                                            children: "Mark MOU Completed"
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1098,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1091,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 986,
                            columnNumber: 13
                        }, this),
                        activeModule === 'pipeline' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mb-3 text-base font-bold",
                                    children: "Pipeline View"
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1107,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: pipeline.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-xl border border-white/10 bg-surface2 p-3 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-semibold",
                                                    children: [
                                                        String(item.student_number),
                                                        " • ",
                                                        String(item.first_names),
                                                        " ",
                                                        String(item.last_name)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1111,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-muted",
                                                    children: [
                                                        "Status: ",
                                                        String(item.case_status),
                                                        " • Completion: ",
                                                        String(item.completion_percent),
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1112,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-muted",
                                                    children: [
                                                        "Supervisor profiles: ",
                                                        String(item.supervisor_profiles_completed ?? 0),
                                                        "/",
                                                        String(item.supervisor_profiles_total ?? 0),
                                                        " completed"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1113,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-muted",
                                                    children: [
                                                        "MOU: ",
                                                        String(item.mou_status ?? 'pending'),
                                                        " • Title formalities finalised: ",
                                                        String(Boolean(item.title_formalities_finalised))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1114,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, String(item.id), true, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1110,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1108,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1106,
                            columnNumber: 13
                        }, this),
                        activeModule === 'tasks' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mb-3 text-base font-bold",
                                    children: "Tasks Module"
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1123,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: tasks.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-xl border border-white/10 bg-surface2 p-3 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-semibold",
                                                    children: [
                                                        String(item.module_name),
                                                        " • ",
                                                        String(item.student_number)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1127,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-muted",
                                                    children: [
                                                        String(item.status),
                                                        " • ",
                                                        String(item.summary)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1128,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, String(item.id), true, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1126,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1124,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1122,
                            columnNumber: 13
                        }, this),
                        (activeModule === 'people' || activeModule === 'team') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mb-3 flex items-center gap-2 text-base font-bold",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1137,
                                            columnNumber: 80
                                        }, this),
                                        " People / Team"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1137,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: people.map((person)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-xl border border-white/10 bg-surface2 p-3 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-semibold",
                                                    children: String(person.full_name)
                                                }, void 0, false, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1141,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-muted",
                                                    children: [
                                                        String(person.role),
                                                        " • ",
                                                        String(person.email)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1142,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, String(person.id), true, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1140,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1138,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1136,
                            columnNumber: 13
                        }, this),
                        (activeModule === 'approvals' || activeModule === 'system') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mb-3 flex items-center gap-2 text-base font-bold",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1151,
                                            columnNumber: 80
                                        }, this),
                                        " Notification Queue"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1151,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: notifications.map((note)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-xl border border-white/10 bg-surface2 p-3 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-semibold",
                                                    children: String(note.subject)
                                                }, void 0, false, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1155,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-muted",
                                                    children: [
                                                        "To: ",
                                                        String(note.email_to),
                                                        " • Status: ",
                                                        String(note.status)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1156,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, String(note.id), true, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1154,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1152,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1150,
                            columnNumber: 13
                        }, this),
                        [
                            'radar',
                            'timelines',
                            'calendar',
                            'kanban',
                            'policy'
                        ].includes(activeModule) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-base font-bold capitalize",
                                    children: [
                                        activeModule,
                                        " module"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1165,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-sm text-muted",
                                    children: "Entries are created and updated from title registration state changes via backend module mappings."
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1166,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1164,
                            columnNumber: 13
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            className: "border-err/40",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "flex items-center gap-2 text-sm text-err",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/page.tsx",
                                        lineNumber: 1172,
                                        columnNumber: 71
                                    }, this),
                                    " ",
                                    error
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/page.tsx",
                                lineNumber: 1172,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1171,
                            columnNumber: 13
                        }, this),
                        info && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            className: "border-ok/40",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "flex items-center gap-2 text-sm text-ok",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/page.tsx",
                                        lineNumber: 1178,
                                        columnNumber: 70
                                    }, this),
                                    " ",
                                    info
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/page.tsx",
                                lineNumber: 1178,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1177,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/client/app/page.tsx",
                    lineNumber: 785,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/client/app/page.tsx",
            lineNumber: 775,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client/app/page.tsx",
        lineNumber: 774,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__956f8087._.js.map