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
"[project]/client/components/ui/dropdown.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DecisionDropdown",
    ()=>DecisionDropdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
'use client';
;
;
;
function DecisionDropdown({ value, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"], {
                className: "inline-flex items-center gap-2 rounded-xl border border-white/10 bg-surface2 px-3 py-2 text-sm",
                children: [
                    value === 'vetted' ? 'Vetted' : 'Insufficient',
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        size: 14
                    }, void 0, false, {
                        fileName: "[project]/client/components/ui/dropdown.tsx",
                        lineNumber: 11,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/components/ui/dropdown.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
                    className: "z-20 rounded-xl border border-white/10 bg-surface p-1 shadow-card",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Item"], {
                            className: "cursor-pointer rounded-lg px-2 py-1 text-sm outline-none hover:bg-white/10",
                            onSelect: ()=>onChange('vetted'),
                            children: "Vetted"
                        }, void 0, false, {
                            fileName: "[project]/client/components/ui/dropdown.tsx",
                            lineNumber: 15,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Item"], {
                            className: "cursor-pointer rounded-lg px-2 py-1 text-sm outline-none hover:bg-white/10",
                            onSelect: ()=>onChange('insufficient'),
                            children: "Insufficient"
                        }, void 0, false, {
                            fileName: "[project]/client/components/ui/dropdown.tsx",
                            lineNumber: 18,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/client/components/ui/dropdown.tsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/client/components/ui/dropdown.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client/components/ui/dropdown.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
}),
"[project]/client/app/title-registration/components/ExternalRegistryLookup.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExternalRegistryLookup",
    ()=>ExternalRegistryLookup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
function ExternalRegistryLookup({ searchValue, onSearchChange, lookupValue, onLookupChange, options, formatOptionLabel }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "space-y-1 text-sm md:col-span-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted",
                        children: "Search external registry (surname/email/ID/passport)"
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/ExternalRegistryLookup.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                        value: searchValue,
                        onChange: (event)=>onSearchChange(event.target.value),
                        placeholder: "Example: Smith, person@uni.edu, 7801015009087"
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/ExternalRegistryLookup.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/app/title-registration/components/ExternalRegistryLookup.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "space-y-1 text-sm md:col-span-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted",
                        children: "Lookup previously used external academics"
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/ExternalRegistryLookup.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                        value: lookupValue,
                        onChange: (event)=>onLookupChange(event.target.value),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Not in database / enter manually"
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/ExternalRegistryLookup.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this),
                            options.map((person)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: String(person.id),
                                    children: formatOptionLabel(person)
                                }, person.id, false, {
                                    fileName: "[project]/client/app/title-registration/components/ExternalRegistryLookup.tsx",
                                    lineNumber: 39,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/title-registration/components/ExternalRegistryLookup.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/app/title-registration/components/ExternalRegistryLookup.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/client/app/title-registration/components/TitleRegistrationModule.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TitleRegistrationModule",
    ()=>TitleRegistrationModule
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$dropdown$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/components/ui/dropdown.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$app$2f$title$2d$registration$2f$components$2f$ExternalRegistryLookup$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/app/title-registration/components/ExternalRegistryLookup.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function TitleRegistrationModule(props) {
    const { formData, caseRecord, peopleDirectory, bcbDirectory, externalSearchByRole, setExternalSearchByRole, filteredExternalDirectory, formatExternalPerson, formatInternalPerson, internalPersonValue, resolveInternalDisplayName, getCoSupervisorCount, setCoSupervisorCount, saveField, saveFields, saveSupervisorFields, saveCoSupervisorFields, updateLocalFields, applyExternalLookup, sendExternalProfileLink, handleAdminSupervisorSameAsSupervisorChange, loadModuleData, handleSaveFormNow, handleGeneratePdf, handleStudentVet, handleSupervisorReview, handleDeptReview, handleChairpersonSign, handleDeptSendFaculty, handleFacultyReview, triggerReminder, isSaving, printUrl, lastSavedAt, decision, setDecision, comments, setComments, inviteFeedback, inviteLink } = props;
    const plannedFormatLabels = [
        'PhD by traditional thesis format',
        'PhD by publication',
        'Masters Full-thesis',
        'Masters Mini thesis',
        'Masters by publication'
    ];
    const selectedPlannedFormat = plannedFormatLabels.find((label)=>Boolean(formData[label])) ?? '';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2 flex items-center gap-2 text-sm text-muted",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this),
                            "Main ROTT Sections"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted",
                        children: "Student Details, Thesis Details, Ethics, MOU, Supervisor Details, Administrative Supervisor (Nominal Role), Co-supervisor Details."
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "mb-3 text-sm font-bold",
                        children: "Student Details"
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-3 md:grid-cols-2",
                        children: [
                            [
                                'Student Title',
                                'Student First-Name',
                                'Student Surname',
                                'Student Number',
                                'Department',
                                'Degree',
                                'Date of first title registration on SASI',
                                'Student registration active on SASI',
                                'Year first registered',
                                'Semester first registered'
                            ].map((label)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "space-y-1 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-muted",
                                            children: label
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                            lineNumber: 132,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                            value: String(formData[label]),
                                            disabled: true
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                            lineNumber: 133,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, label, true, {
                                    fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                    lineNumber: 131,
                                    columnNumber: 13
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm md:col-span-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted",
                                        children: "Planned format (select one)"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 137,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                        value: selectedPlannedFormat,
                                        onChange: (event)=>{
                                            const label = event.target.value;
                                            void saveFields({
                                                'PhD by traditional thesis format': label === 'PhD by traditional thesis format',
                                                'PhD by publication': label === 'PhD by publication',
                                                'Masters Full-thesis': label === 'Masters Full-thesis',
                                                'Masters Mini thesis': label === 'Masters Mini thesis',
                                                'Masters by publication': label === 'Masters by publication'
                                            });
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "--- Select planned format ---"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 152,
                                                columnNumber: 15
                                            }, this),
                                            plannedFormatLabels.map((label)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: label,
                                                    children: label
                                                }, label, false, {
                                                    fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                    lineNumber: 154,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 138,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "mb-3 text-sm font-bold",
                        children: "Thesis Details"
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-3 md:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm md:col-span-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted",
                                        children: "Thesis title"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 165,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        className: "min-h-20 w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                        value: formData['Thesis title'],
                                        onChange: (event)=>void saveField('Thesis title', event.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 166,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 164,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm md:col-span-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted",
                                        children: "Key words"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 169,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                        value: formData['Key words'],
                                        onChange: (event)=>void saveField('Key words', event.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 170,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-muted",
                                        children: "Use precise key phrases, comma-separated."
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 171,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 168,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm md:col-span-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted",
                                        children: "Abstract"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 174,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        className: "min-h-28 w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                        value: formData.Abstract,
                                        onChange: (event)=>void saveField('Abstract', event.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 175,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 173,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm md:col-span-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted",
                                        children: "Initial thesis title for upgrade from Masters to Doctoral"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 178,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                        value: formData['Initial thesis title for upgrade from Masters to Doctoral'],
                                        onChange: (event)=>void saveField('Initial thesis title for upgrade from Masters to Doctoral', event.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 179,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 177,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm md:col-span-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted",
                                        children: "PhD project proposal upload/link (5-10 pages incl. timeframes)"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 182,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                        value: formData['PhD proposal link (5-10 pages incl. timeframes)'],
                                        onChange: (event)=>void saveField('PhD proposal link (5-10 pages incl. timeframes)', event.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 183,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "mb-3 text-sm font-bold",
                        children: "Ethics"
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-3 md:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted",
                                        children: "Does this project need Ethics clearance?"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 192,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                        value: formData['Does this project need Ethics clearance?'],
                                        onChange: (event)=>void saveField('Does this project need Ethics clearance?', event.target.value),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Yes",
                                                children: "Yes"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 194,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "No",
                                                children: "No"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 195,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 193,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 191,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted",
                                        children: "Ethics clearance reference number"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 199,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                        value: formData['Ethics clearance reference number'],
                                        onChange: (event)=>void saveField('Ethics clearance reference number', event.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 200,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 198,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted",
                                        children: "Date on which ethics clearance was issued"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 203,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                        value: formData['Date on which ethics clearance was issued'],
                                        onChange: (event)=>void saveField('Date on which ethics clearance was issued', event.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 204,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 202,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                lineNumber: 188,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "mb-3 text-sm font-bold",
                        children: "MOU"
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 210,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "space-y-1 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted",
                                children: "Has the MOU been submitted?"
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 212,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                value: formData['Has the MOU been submitted?'],
                                disabled: true
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 213,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 211,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-xs text-muted",
                        children: "Sequence enforced: ROTT -> Supervisor Profiles (+CV) -> MOU."
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 215,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            disabled: caseRecord.completion_percent < 100,
                            onClick: ()=>void loadModuleData('mou'),
                            children: "Open MOU Module"
                        }, void 0, false, {
                            fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                            lineNumber: 217,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 216,
                        columnNumber: 9
                    }, this),
                    caseRecord.completion_percent < 100 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-xs text-muted",
                        children: "Complete and save the ROTT in full before opening MOU."
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 220,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, this),
            inviteFeedback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: `text-sm ${inviteLink ? 'text-emerald-400' : 'text-rose-400'}`,
                        children: inviteFeedback
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 228,
                        columnNumber: 11
                    }, this),
                    inviteLink && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: inviteLink,
                            target: "_blank",
                            rel: "noreferrer",
                            className: "text-accent underline",
                            children: "Open external profile link"
                        }, void 0, false, {
                            fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                            lineNumber: 231,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 230,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                lineNumber: 227,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "mb-3 text-sm font-bold",
                        children: "Supervisor Details"
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 240,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-3 md:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted",
                                        children: "Supervisor is UWC-internal"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 243,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                        value: formData['Supervisor is UWC-internal'],
                                        onChange: (event)=>updateLocalFields({
                                                'Supervisor is UWC-internal': event.target.value
                                            }),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Yes",
                                                children: "Yes"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 245,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "No",
                                                children: "No"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 246,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 244,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 242,
                                columnNumber: 11
                            }, this),
                            formData['Supervisor is UWC-internal'] === 'Yes' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "space-y-1 text-sm md:col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted",
                                                children: "Supervisor"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 252,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                value: formData.Supervisor,
                                                onChange: (event)=>{
                                                    const selected = peopleDirectory.find((person)=>internalPersonValue(person) === event.target.value);
                                                    void saveSupervisorFields({
                                                        Supervisor: event.target.value,
                                                        'Supervisor Qualifications': selected?.highest_qualification ?? formData['Supervisor Qualifications']
                                                    });
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "--- Select supervisor ---"
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                        lineNumber: 264,
                                                        columnNumber: 19
                                                    }, this),
                                                    peopleDirectory.map((person)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: internalPersonValue(person),
                                                            children: formatInternalPerson(person)
                                                        }, person.id, false, {
                                                            fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                            lineNumber: 266,
                                                            columnNumber: 21
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 253,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 251,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "space-y-1 text-sm md:col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted",
                                                children: "Supervisor (resolved)"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 271,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                value: resolveInternalDisplayName(formData.Supervisor, peopleDirectory),
                                                disabled: true
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 272,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 270,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "space-y-1 text-sm md:col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted",
                                                children: "Supervisor Qualifications"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 275,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                value: formData['Supervisor Qualifications'],
                                                disabled: true
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 276,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 274,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$app$2f$title$2d$registration$2f$components$2f$ExternalRegistryLookup$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ExternalRegistryLookup"], {
                                        role: "supervisor",
                                        searchValue: externalSearchByRole.supervisor,
                                        onSearchChange: (value)=>setExternalSearchByRole((prev)=>({
                                                    ...prev,
                                                    supervisor: value
                                                })),
                                        lookupValue: formData['Supervisor External Lookup Id'],
                                        onLookupChange: (value)=>void applyExternalLookup('supervisor', value),
                                        options: filteredExternalDirectory('supervisor'),
                                        formatOptionLabel: formatExternalPerson
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 281,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "space-y-1 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted",
                                                children: "Title"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 290,
                                                columnNumber: 52
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                placeholder: "e.g., Prof / Dr / Mr / Ms",
                                                value: formData['Supervisor Title'],
                                                onChange: (event)=>updateLocalFields({
                                                        'Supervisor is UWC-internal': 'No',
                                                        'Supervisor Title': event.target.value
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 290,
                                                columnNumber: 93
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 290,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "space-y-1 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted",
                                                children: "First Name"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 291,
                                                columnNumber: 52
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                placeholder: "Enter first/given name",
                                                value: formData['Supervisor External First Name'],
                                                onChange: (event)=>updateLocalFields({
                                                        'Supervisor is UWC-internal': 'No',
                                                        'Supervisor External First Name': event.target.value
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 291,
                                                columnNumber: 98
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 291,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "space-y-1 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted",
                                                children: "Surname"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 292,
                                                columnNumber: 52
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                placeholder: "Enter surname/family name",
                                                value: formData['Supervisor External Surname'],
                                                onChange: (event)=>updateLocalFields({
                                                        'Supervisor is UWC-internal': 'No',
                                                        'Supervisor External Surname': event.target.value
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 292,
                                                columnNumber: 95
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 292,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "space-y-1 text-sm md:col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted",
                                                children: "Resolved Name"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 294,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                value: `${formData['Supervisor Title']} ${formData['Supervisor External First Name']} ${formData['Supervisor External Surname']}`.replace(/\s+/g, ' ').trim(),
                                                disabled: true
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 295,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 293,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "space-y-1 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted",
                                                children: "Email"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 297,
                                                columnNumber: 52
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                placeholder: "name@institution.edu",
                                                value: formData['Supervisor External Email'],
                                                onChange: (event)=>updateLocalFields({
                                                        'Supervisor is UWC-internal': 'No',
                                                        'Supervisor External Email': event.target.value
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 297,
                                                columnNumber: 93
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 297,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:col-span-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: ()=>void sendExternalProfileLink('supervisor', formData['Supervisor External Email']),
                                            children: "Send Profile Link"
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                            lineNumber: 299,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 298,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 241,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                lineNumber: 239,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "mb-3 text-sm font-bold",
                        children: "Administrative Supervisor (Nominal Role)"
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 309,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-3 md:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted",
                                        children: "Administrative supervisor same as supervisor?"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 312,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                        value: formData['Administrative Supervisor same as Supervisor'],
                                        onChange: (event)=>void handleAdminSupervisorSameAsSupervisorChange(event.target.value),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Yes",
                                                children: "Yes"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 314,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "No",
                                                children: "No"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 315,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 313,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 311,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted",
                                        children: "Administrative Supervisor is UWC-internal"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 319,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                        value: formData['Administrative Supervisor is UWC-internal'],
                                        disabled: formData['Administrative Supervisor same as Supervisor'] === 'Yes',
                                        onChange: (event)=>updateLocalFields({
                                                'Administrative Supervisor is UWC-internal': event.target.value
                                            }),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Yes",
                                                children: "Yes"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 321,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "No",
                                                children: "No"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 322,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 320,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 318,
                                columnNumber: 11
                            }, this),
                            formData['Administrative Supervisor same as Supervisor'] === 'Yes' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "space-y-1 text-sm md:col-span-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-muted",
                                            children: "Administrative Supervisor (resolved)"
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                            lineNumber: 329,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                            value: formData['Supervisor is UWC-internal'] === 'Yes' ? resolveInternalDisplayName(formData.Supervisor, peopleDirectory) : `${formData['Supervisor Title']} ${formData['Supervisor External First Name']} ${formData['Supervisor External Surname']}`.replace(/\s+/g, ' ').trim(),
                                            disabled: true
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                            lineNumber: 330,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                    lineNumber: 328,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false) : formData['Administrative Supervisor is UWC-internal'] === 'Yes' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "space-y-1 text-sm md:col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted",
                                                children: "Administrative Supervisor"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 336,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                value: formData['Administrative Supervisor (Nominal Role)'],
                                                onChange: (event)=>void saveField('Administrative Supervisor (Nominal Role)', event.target.value),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "--- Select administrative supervisor ---"
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                        lineNumber: 338,
                                                        columnNumber: 19
                                                    }, this),
                                                    bcbDirectory.map((person)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: internalPersonValue(person),
                                                            children: formatInternalPerson(person)
                                                        }, person.id, false, {
                                                            fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                            lineNumber: 340,
                                                            columnNumber: 21
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 337,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 335,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "space-y-1 text-sm md:col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted",
                                                children: "Administrative Supervisor Qualifications"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 345,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                value: formData['Administrative Supervisor Qualifications (Nominal Role)'],
                                                disabled: true
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 346,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 344,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$app$2f$title$2d$registration$2f$components$2f$ExternalRegistryLookup$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ExternalRegistryLookup"], {
                                        role: "admin",
                                        searchValue: externalSearchByRole.admin,
                                        onSearchChange: (value)=>setExternalSearchByRole((prev)=>({
                                                    ...prev,
                                                    admin: value
                                                })),
                                        lookupValue: formData['Administrative Supervisor External Lookup Id'],
                                        onLookupChange: (value)=>void applyExternalLookup('admin', value),
                                        options: filteredExternalDirectory('admin'),
                                        formatOptionLabel: formatExternalPerson
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 351,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "space-y-1 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted",
                                                children: "Title"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 360,
                                                columnNumber: 52
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                placeholder: "e.g., Prof / Dr / Mr / Ms",
                                                value: formData['Administrative Supervisor External Title'],
                                                onChange: (event)=>updateLocalFields({
                                                        'Administrative Supervisor is UWC-internal': 'No',
                                                        'Administrative Supervisor External Title': event.target.value
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 360,
                                                columnNumber: 93
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 360,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "space-y-1 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted",
                                                children: "First Name"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 361,
                                                columnNumber: 52
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                placeholder: "Enter first/given name",
                                                value: formData['Administrative Supervisor External First Name'],
                                                onChange: (event)=>updateLocalFields({
                                                        'Administrative Supervisor is UWC-internal': 'No',
                                                        'Administrative Supervisor External First Name': event.target.value
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 361,
                                                columnNumber: 98
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 361,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "space-y-1 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted",
                                                children: "Surname"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 362,
                                                columnNumber: 52
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                placeholder: "Enter surname/family name",
                                                value: formData['Administrative Supervisor External Surname'],
                                                onChange: (event)=>updateLocalFields({
                                                        'Administrative Supervisor is UWC-internal': 'No',
                                                        'Administrative Supervisor External Surname': event.target.value
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 362,
                                                columnNumber: 95
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 362,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "space-y-1 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted",
                                                children: "Email"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 363,
                                                columnNumber: 52
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                placeholder: "name@institution.edu",
                                                value: formData['Administrative Supervisor External Email'],
                                                onChange: (event)=>updateLocalFields({
                                                        'Administrative Supervisor is UWC-internal': 'No',
                                                        'Administrative Supervisor External Email': event.target.value
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 363,
                                                columnNumber: 93
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 363,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:col-span-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: ()=>void sendExternalProfileLink('admin', formData['Administrative Supervisor External Email']),
                                            children: "Send Profile Link"
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                            lineNumber: 365,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 364,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 310,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                lineNumber: 308,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "mb-3 text-sm font-bold",
                        children: "Co-supervisor Details"
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 375,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-3 md:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted",
                                        children: "Number of Co-supervisors"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 378,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                        value: String(getCoSupervisorCount(formData)),
                                        onChange: (event)=>void setCoSupervisorCount(Number(event.target.value)),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "0",
                                                children: "0"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 380,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "1",
                                                children: "1"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 381,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "2",
                                                children: "2"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 382,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 379,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 377,
                                columnNumber: 11
                            }, this),
                            getCoSupervisorCount(formData) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted",
                                        children: "Co-supervisor 1 is UWC-internal"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 387,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                        value: formData['Co-supervisor is UWC-internal'],
                                        onChange: (event)=>{
                                            updateLocalFields({
                                                'Has Co-supervisor?': 'Yes',
                                                'Co-supervisor is UWC-internal': event.target.value
                                            });
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Yes",
                                                children: "Yes"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 394,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "No",
                                                children: "No"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 395,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 388,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 386,
                                columnNumber: 13
                            }, this),
                            getCoSupervisorCount(formData) === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted md:col-span-2",
                                children: "No co-supervisor fields are required."
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 399,
                                columnNumber: 52
                            }, this),
                            getCoSupervisorCount(formData) >= 1 && formData['Co-supervisor is UWC-internal'] === 'Yes' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "space-y-1 text-sm md:col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted",
                                                children: "Co-supervisor 1"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 404,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                value: formData['Co-supervisor'],
                                                onChange: (event)=>void saveCoSupervisorFields({
                                                        'Co-supervisor is UWC-internal': 'Yes',
                                                        'Co-supervisor': event.target.value
                                                    }),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "--- Select co-supervisor 1 ---"
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                        lineNumber: 409,
                                                        columnNumber: 19
                                                    }, this),
                                                    peopleDirectory.map((person)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: internalPersonValue(person),
                                                            children: formatInternalPerson(person)
                                                        }, person.id, false, {
                                                            fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                            lineNumber: 411,
                                                            columnNumber: 21
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 405,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 403,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "space-y-1 text-sm md:col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted",
                                                children: "Co-supervisor 1 (resolved)"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 416,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                value: `${formData['Co-supervisor Title']} ${formData['Co-supervisor']}`.trim(),
                                                disabled: true
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 417,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 415,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true),
                            getCoSupervisorCount(formData) >= 1 && formData['Co-supervisor is UWC-internal'] === 'No' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$app$2f$title$2d$registration$2f$components$2f$ExternalRegistryLookup$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ExternalRegistryLookup"], {
                                        role: "co1",
                                        searchValue: externalSearchByRole.co1,
                                        onSearchChange: (value)=>setExternalSearchByRole((prev)=>({
                                                    ...prev,
                                                    co1: value
                                                })),
                                        lookupValue: formData['Co-supervisor External Lookup Id'],
                                        onLookupChange: (value)=>void applyExternalLookup('co1', value),
                                        options: filteredExternalDirectory('co1'),
                                        formatOptionLabel: formatExternalPerson
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 423,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "space-y-1 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted",
                                                children: "Title"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 432,
                                                columnNumber: 52
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                placeholder: "e.g., Prof / Dr / Mr / Ms",
                                                value: formData['Co-supervisor Title'],
                                                onChange: (event)=>updateLocalFields({
                                                        'Has Co-supervisor?': 'Yes',
                                                        'Co-supervisor is UWC-internal': 'No',
                                                        'Co-supervisor Title': event.target.value
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 432,
                                                columnNumber: 93
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 432,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "space-y-1 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted",
                                                children: "First Name"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 433,
                                                columnNumber: 52
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                placeholder: "Enter first/given name",
                                                value: formData['Co-supervisor External First Name'],
                                                onChange: (event)=>updateLocalFields({
                                                        'Has Co-supervisor?': 'Yes',
                                                        'Co-supervisor is UWC-internal': 'No',
                                                        'Co-supervisor External First Name': event.target.value
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 433,
                                                columnNumber: 98
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 433,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "space-y-1 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted",
                                                children: "Surname"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 434,
                                                columnNumber: 52
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                placeholder: "Enter surname/family name",
                                                value: formData['Co-supervisor External Surname'],
                                                onChange: (event)=>updateLocalFields({
                                                        'Has Co-supervisor?': 'Yes',
                                                        'Co-supervisor is UWC-internal': 'No',
                                                        'Co-supervisor External Surname': event.target.value
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 434,
                                                columnNumber: 95
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 434,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "space-y-1 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted",
                                                children: "Email"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 435,
                                                columnNumber: 52
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                placeholder: "name@institution.edu",
                                                value: formData['Co-supervisor External Email'],
                                                onChange: (event)=>updateLocalFields({
                                                        'Has Co-supervisor?': 'Yes',
                                                        'Co-supervisor is UWC-internal': 'No',
                                                        'Co-supervisor External Email': event.target.value
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 435,
                                                columnNumber: 93
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 435,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:col-span-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: ()=>void sendExternalProfileLink('co1', formData['Co-supervisor External Email']),
                                            children: "Send Profile Link"
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                            lineNumber: 437,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 436,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true),
                            getCoSupervisorCount(formData) === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "space-y-1 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted",
                                                children: "Co-supervisor 2 is UWC-internal"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 446,
                                                columnNumber: 52
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                value: formData['Second Co-supervisor is UWC-internal'],
                                                onChange: (event)=>{
                                                    updateLocalFields({
                                                        'Has Co-supervisor?': 'Yes',
                                                        'Second Co-supervisor is UWC-internal': event.target.value
                                                    });
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "Yes",
                                                        children: "Yes"
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                        lineNumber: 451,
                                                        columnNumber: 18
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "No",
                                                        children: "No"
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                        lineNumber: 451,
                                                        columnNumber: 50
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 446,
                                                columnNumber: 119
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 446,
                                        columnNumber: 15
                                    }, this),
                                    formData['Second Co-supervisor is UWC-internal'] === 'Yes' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "space-y-1 text-sm md:col-span-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted",
                                                        children: "Co-supervisor 2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                        lineNumber: 454,
                                                        columnNumber: 70
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                        value: formData['Second Co-supervisor'],
                                                        onChange: (event)=>void saveCoSupervisorFields({
                                                                'Second Co-supervisor is UWC-internal': 'Yes',
                                                                'Second Co-supervisor': event.target.value
                                                            }),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "",
                                                                children: "--- Select co-supervisor 2 ---"
                                                            }, void 0, false, {
                                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                                lineNumber: 454,
                                                                columnNumber: 390
                                                            }, this),
                                                            peopleDirectory.map((person)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: internalPersonValue(person),
                                                                    children: formatInternalPerson(person)
                                                                }, person.id, false, {
                                                                    fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                                    lineNumber: 454,
                                                                    columnNumber: 480
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                        lineNumber: 454,
                                                        columnNumber: 121
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 454,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "space-y-1 text-sm md:col-span-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted",
                                                        children: "Co-supervisor 2 (resolved)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                        lineNumber: 455,
                                                        columnNumber: 70
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                        value: `${formData['Second Co-supervisor Title']} ${formData['Second Co-supervisor']}`.trim(),
                                                        disabled: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                        lineNumber: 455,
                                                        columnNumber: 132
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 455,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$app$2f$title$2d$registration$2f$components$2f$ExternalRegistryLookup$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ExternalRegistryLookup"], {
                                                role: "co2",
                                                searchValue: externalSearchByRole.co2,
                                                onSearchChange: (value)=>setExternalSearchByRole((prev)=>({
                                                            ...prev,
                                                            co2: value
                                                        })),
                                                lookupValue: formData['Second Co-supervisor External Lookup Id'],
                                                onLookupChange: (value)=>void applyExternalLookup('co2', value),
                                                options: filteredExternalDirectory('co2'),
                                                formatOptionLabel: formatExternalPerson
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 459,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "space-y-1 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted",
                                                        children: "Title"
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                        lineNumber: 468,
                                                        columnNumber: 56
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                        placeholder: "e.g., Prof / Dr / Mr / Ms",
                                                        value: formData['Second Co-supervisor Title'],
                                                        onChange: (event)=>updateLocalFields({
                                                                'Has Co-supervisor?': 'Yes',
                                                                'Second Co-supervisor is UWC-internal': 'No',
                                                                'Second Co-supervisor Title': event.target.value
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                        lineNumber: 468,
                                                        columnNumber: 97
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 468,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "space-y-1 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted",
                                                        children: "First Name"
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                        lineNumber: 469,
                                                        columnNumber: 56
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                        placeholder: "Enter first/given name",
                                                        value: formData['Second Co-supervisor External First Name'],
                                                        onChange: (event)=>updateLocalFields({
                                                                'Has Co-supervisor?': 'Yes',
                                                                'Second Co-supervisor is UWC-internal': 'No',
                                                                'Second Co-supervisor External First Name': event.target.value
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                        lineNumber: 469,
                                                        columnNumber: 102
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 469,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "space-y-1 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted",
                                                        children: "Surname"
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                        lineNumber: 470,
                                                        columnNumber: 56
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                        placeholder: "Enter surname/family name",
                                                        value: formData['Second Co-supervisor External Surname'],
                                                        onChange: (event)=>updateLocalFields({
                                                                'Has Co-supervisor?': 'Yes',
                                                                'Second Co-supervisor is UWC-internal': 'No',
                                                                'Second Co-supervisor External Surname': event.target.value
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                        lineNumber: 470,
                                                        columnNumber: 99
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 470,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "space-y-1 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted",
                                                        children: "Email"
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                        lineNumber: 471,
                                                        columnNumber: 56
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                        placeholder: "name@institution.edu",
                                                        value: formData['Second Co-supervisor External Email'],
                                                        onChange: (event)=>updateLocalFields({
                                                                'Has Co-supervisor?': 'Yes',
                                                                'Second Co-supervisor is UWC-internal': 'No',
                                                                'Second Co-supervisor External Email': event.target.value
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                        lineNumber: 471,
                                                        columnNumber: 97
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 471,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "md:col-span-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                    onClick: ()=>void sendExternalProfileLink('co2', formData['Second Co-supervisor External Email']),
                                                    children: "Send Profile Link"
                                                }, void 0, false, {
                                                    fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                    lineNumber: 473,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 472,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 376,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                lineNumber: 374,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                disabled: isSaving,
                                onClick: ()=>void handleSaveFormNow(),
                                children: "Save"
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 486,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                disabled: isSaving || caseRecord.completion_percent < 100,
                                onClick: ()=>void handleGeneratePdf(),
                                children: "Generate Print PDF"
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 489,
                                columnNumber: 11
                            }, this),
                            printUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: printUrl,
                                target: "_blank",
                                rel: "noreferrer",
                                className: "inline-flex items-center rounded-xl border border-accent/60 px-3 py-2 text-sm font-semibold text-accent",
                                children: "Open Printable PDF"
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 493,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                disabled: caseRecord.case_status !== 'awaiting_student_vetting',
                                onClick: ()=>void handleStudentVet(),
                                children: "Email to Supervisor"
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 497,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 485,
                        columnNumber: 9
                    }, this),
                    lastSavedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-xs text-muted",
                        children: [
                            "Information saved at ",
                            new Date(lastSavedAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                            }),
                            " ",
                            new Date(lastSavedAt).toLocaleDateString([], {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                            }),
                            "."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 502,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                lineNumber: 484,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "mb-2 text-sm font-bold",
                        children: "Review Actions"
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 509,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-3 md:grid-cols-[auto_1fr_auto_auto_auto]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$dropdown$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DecisionDropdown"], {
                                value: decision,
                                onChange: setDecision
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 511,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "rounded-xl border border-white/10 bg-surface2 px-3 py-2 text-sm",
                                placeholder: "Comments for return actions",
                                value: comments,
                                onChange: (event)=>setComments(event.target.value)
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 512,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                disabled: caseRecord.case_status !== 'awaiting_supervisor_review',
                                onClick: ()=>void handleSupervisorReview(),
                                children: "Supervisor Review"
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 513,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                disabled: caseRecord.case_status !== 'awaiting_dept_fhd_review',
                                onClick: ()=>void handleDeptReview(),
                                children: "Dept FHD Vet (Adriaan)"
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 516,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                disabled: caseRecord.case_status !== 'awaiting_chairperson_signature',
                                onClick: ()=>void handleChairpersonSign(),
                                children: "Chairperson Sign"
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 519,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 510,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 grid gap-3 md:grid-cols-[auto_auto_auto]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                disabled: caseRecord.case_status !== 'awaiting_dept_fhd_send_to_faculty',
                                onClick: ()=>void handleDeptSendFaculty(),
                                children: "Dept FHD Send to Faculty"
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 524,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                disabled: caseRecord.case_status !== 'sent_to_faculty_fhd',
                                onClick: ()=>void handleFacultyReview(),
                                children: "Faculty FHD Review"
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 527,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                disabled: caseRecord.case_status !== 'sent_to_faculty_fhd',
                                onClick: ()=>void triggerReminder(),
                                children: "Send 3-Workday Reminder"
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 530,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 523,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 text-xs text-muted",
                        children: "Flow: Supervisor -> Dept FHD vet -> Chairperson sign -> Dept FHD sends to Faculty FHD -> Faculty vet/return."
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 534,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                lineNumber: 508,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
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
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$app$2f$title$2d$registration$2f$components$2f$TitleRegistrationModule$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/app/title-registration/components/TitleRegistrationModule.tsx [app-ssr] (ecmascript)");
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
        return value.trim().toLowerCase().replace(/^(prof|prof\.|dr|dr\.|mr|mr\.|mrs|mrs\.|ms|ms\.)\s+/i, '').replace(/\s+/g, ' ');
    }
    function resolveInternalDisplayName(value, directory) {
        if (!value.trim()) return '';
        const normalized = normalizePersonName(value);
        const matched = directory.find((person)=>{
            const candidates = [
                person.staff_name,
                `${person.first_name ?? ''} ${person.last_name ?? ''}`,
                `${person.staff_title ? `${person.staff_title} ` : ''}${person.first_name ?? ''} ${person.last_name ?? ''}`,
                formatInternalPerson(person)
            ].map((candidate)=>normalizePersonName(candidate));
            return candidates.includes(normalized);
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
                            lineNumber: 785,
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
                                    lineNumber: 788,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 786,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/client/app/page.tsx",
                    lineNumber: 784,
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
                                            lineNumber: 796,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            disabled: loading,
                                            onClick: ()=>void runSasiCheck(),
                                            children: "Check SASI"
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 797,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 795,
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
                                            lineNumber: 803,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                            label: statusLabel(caseRecord.case_status),
                                            status: statusTone(caseRecord.case_status)
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 804,
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
                                            lineNumber: 805,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 802,
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
                                        lineNumber: 810,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 809,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 794,
                            columnNumber: 11
                        }, this),
                        activeModule === 'title_registration' && formData && caseRecord && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$app$2f$title$2d$registration$2f$components$2f$TitleRegistrationModule$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TitleRegistrationModule"], {
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
                                    saveFields: saveFields,
                                    saveSupervisorFields: saveSupervisorFields,
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
                                    lineNumber: 817,
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
                                    lineNumber: 859,
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
                                    lineNumber: 878,
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
                                            lineNumber: 880,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: ()=>void handleSupervisorProfileReminder(),
                                            children: "Send Reminder"
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 881,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 879,
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
                                                        lineNumber: 886,
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
                                                                        lineNumber: 891,
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
                                                                        lineNumber: 892,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/client/app/page.tsx",
                                                                lineNumber: 890,
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
                                                                        lineNumber: 903,
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
                                                                                value: "",
                                                                                disabled: true,
                                                                                children: "---"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/client/app/page.tsx",
                                                                                lineNumber: 909,
                                                                                columnNumber: 27
                                                                            }, this),
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
                                                                        lineNumber: 904,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/client/app/page.tsx",
                                                                lineNumber: 902,
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
                                                                        lineNumber: 915,
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
                                                                                value: "",
                                                                                disabled: true,
                                                                                children: "---"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/client/app/page.tsx",
                                                                                lineNumber: 921,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "No",
                                                                                children: "No"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/client/app/page.tsx",
                                                                                lineNumber: 922,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "Yes",
                                                                                children: "Yes"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/client/app/page.tsx",
                                                                                lineNumber: 923,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/client/app/page.tsx",
                                                                        lineNumber: 916,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/client/app/page.tsx",
                                                                lineNumber: 914,
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
                                                                        lineNumber: 927,
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
                                                                        lineNumber: 928,
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
                                                                            lineNumber: 944,
                                                                            columnNumber: 31
                                                                        }, this);
                                                                    })()
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/client/app/page.tsx",
                                                                lineNumber: 926,
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
                                                                        lineNumber: 957,
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
                                                                        lineNumber: 958,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/client/app/page.tsx",
                                                                lineNumber: 956,
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
                                                                        lineNumber: 962,
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
                                                                        lineNumber: 963,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/client/app/page.tsx",
                                                                lineNumber: 961,
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
                                                                        lineNumber: 967,
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
                                                                        lineNumber: 968,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/client/app/page.tsx",
                                                                lineNumber: 966,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/client/app/page.tsx",
                                                        lineNumber: 889,
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
                                                            lineNumber: 983,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/page.tsx",
                                                        lineNumber: 982,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, profile.id, true, {
                                                fileName: "[project]/client/app/page.tsx",
                                                lineNumber: 885,
                                                columnNumber: 19
                                            }, this)),
                                        supervisorProfiles.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-muted",
                                            children: "No supervisor profile forms activated yet. Enter supervisor details in ROTT first."
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 992,
                                            columnNumber: 53
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 883,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 877,
                            columnNumber: 13
                        }, this),
                        activeModule === 'mou' && caseRecord && mouData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mb-3 text-base font-bold",
                                    children: "MOU 2026 Module"
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 999,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-3 text-sm text-muted",
                                    children: "Prefilled from ROTT + Supervisor Profiles. Complete remaining sections, confirm signatures, then generate final PDF for Faculty HD records."
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1000,
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
                                    lineNumber: 1001,
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
                                                        lineNumber: 1075,
                                                        columnNumber: 23
                                                    }, this),
                                                    isLong ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                        className: "min-h-20 w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                        value: mouData[label],
                                                        disabled: isReadonly || mouRecord?.status === 'completed',
                                                        onChange: (event)=>void saveMouField(label, event.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/page.tsx",
                                                        lineNumber: 1077,
                                                        columnNumber: 25
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                        value: mouData[label],
                                                        disabled: isReadonly || mouRecord?.status === 'completed',
                                                        onChange: (event)=>void saveMouField(label, event.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/page.tsx",
                                                        lineNumber: 1079,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, label, true, {
                                                fileName: "[project]/client/app/page.tsx",
                                                lineNumber: 1074,
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
                                                        lineNumber: 1094,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                        value: mouData[label],
                                                        disabled: mouRecord?.status === 'completed',
                                                        onChange: (event)=>void saveMouField(label, event.target.value),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "",
                                                                disabled: true,
                                                                children: "---"
                                                            }, void 0, false, {
                                                                fileName: "[project]/client/app/page.tsx",
                                                                lineNumber: 1096,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "No",
                                                                children: "No"
                                                            }, void 0, false, {
                                                                fileName: "[project]/client/app/page.tsx",
                                                                lineNumber: 1097,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "Yes",
                                                                children: "Yes"
                                                            }, void 0, false, {
                                                                fileName: "[project]/client/app/page.tsx",
                                                                lineNumber: 1098,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/client/app/page.tsx",
                                                        lineNumber: 1095,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, label, true, {
                                                fileName: "[project]/client/app/page.tsx",
                                                lineNumber: 1093,
                                                columnNumber: 19
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1002,
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
                                            lineNumber: 1105,
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
                                            lineNumber: 1107,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: ()=>void handleCompleteMou(),
                                            disabled: mouRecord?.status === 'completed',
                                            children: "Mark MOU Completed"
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1111,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1104,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 998,
                            columnNumber: 13
                        }, this),
                        activeModule === 'pipeline' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mb-3 text-base font-bold",
                                    children: "Pipeline View"
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1120,
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
                                                    lineNumber: 1124,
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
                                                    lineNumber: 1125,
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
                                                    lineNumber: 1126,
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
                                                    lineNumber: 1127,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, String(item.id), true, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1123,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1121,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1119,
                            columnNumber: 13
                        }, this),
                        activeModule === 'tasks' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mb-3 text-base font-bold",
                                    children: "Tasks Module"
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1136,
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
                                                    lineNumber: 1140,
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
                                                    lineNumber: 1141,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, String(item.id), true, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1139,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1137,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1135,
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
                                            lineNumber: 1150,
                                            columnNumber: 80
                                        }, this),
                                        " People / Team"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1150,
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
                                                    lineNumber: 1154,
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
                                                    lineNumber: 1155,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, String(person.id), true, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1153,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1151,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1149,
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
                                            lineNumber: 1164,
                                            columnNumber: 80
                                        }, this),
                                        " Notification Queue"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1164,
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
                                                    lineNumber: 1168,
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
                                                    lineNumber: 1169,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, String(note.id), true, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1167,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1165,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1163,
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
                                    lineNumber: 1178,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-sm text-muted",
                                    children: "Entries are created and updated from title registration state changes via backend module mappings."
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1179,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1177,
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
                                        lineNumber: 1185,
                                        columnNumber: 71
                                    }, this),
                                    " ",
                                    error
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/page.tsx",
                                lineNumber: 1185,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1184,
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
                                        lineNumber: 1191,
                                        columnNumber: 70
                                    }, this),
                                    " ",
                                    info
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/page.tsx",
                                lineNumber: 1191,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1190,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/client/app/page.tsx",
                    lineNumber: 793,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/client/app/page.tsx",
            lineNumber: 783,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client/app/page.tsx",
        lineNumber: 782,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ab21ee7f._.js.map