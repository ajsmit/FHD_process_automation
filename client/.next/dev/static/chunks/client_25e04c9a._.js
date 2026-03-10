(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/client/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/lib/utils.ts [app-client] (ecmascript)");
;
;
const tone = {
    approved: 'bg-ok/20 text-ok',
    in_progress: 'bg-accent/20 text-accent',
    action_required: 'bg-warn/20 text-warn',
    default: 'bg-white/10 text-muted'
};
function Badge({ label, status = 'default' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('inline-flex rounded-full px-2 py-1 text-xs font-medium', tone[status]),
        children: label
    }, void 0, false, {
        fileName: "[project]/client/components/ui/badge.tsx",
        lineNumber: 11,
        columnNumber: 10
    }, this);
}
_c = Badge;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
function Button({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
        whileTap: {
            scale: 0.98
        },
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('inline-flex items-center justify-center rounded-xl border border-white/10 bg-surface2 px-3 py-2 text-sm font-semibold text-text shadow-card transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/client/components/ui/button.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = Button;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/lib/utils.ts [app-client] (ecmascript)");
;
;
function Card({ children, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('rounded-xl2 border border-white/10 bg-surface/75 p-4 shadow-card backdrop-blur', className),
        children: children
    }, void 0, false, {
        fileName: "[project]/client/components/ui/card.tsx",
        lineNumber: 5,
        columnNumber: 10
    }, this);
}
_c = Card;
var _c;
__turbopack_context__.k.register(_c, "Card");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/components/ui/search-input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SearchInput",
    ()=>SearchInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
function SearchInput(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2 rounded-xl border border-white/10 bg-surface2 px-3 py-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                size: 16,
                className: "text-muted"
            }, void 0, false, {
                fileName: "[project]/client/components/ui/search-input.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ...props,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-full bg-transparent text-sm text-text outline-none placeholder:text-muted', props.className)
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
_c = SearchInput;
var _c;
__turbopack_context__.k.register(_c, "SearchInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/components/ui/sidebar-item.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SidebarItem",
    ()=>SidebarItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
function SidebarItem({ label, active, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-full rounded-xl px-3 py-2 text-left text-sm transition', active ? 'bg-accent/20 text-accent' : 'text-muted hover:bg-white/10 hover:text-text'),
        children: label
    }, void 0, false, {
        fileName: "[project]/client/components/ui/sidebar-item.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = SidebarItem;
var _c;
__turbopack_context__.k.register(_c, "SidebarItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/components/ui/dropdown.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DecisionDropdown",
    ()=>DecisionDropdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
'use client';
;
;
;
function DecisionDropdown({ value, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
                className: "inline-flex items-center gap-2 rounded-xl border border-white/10 bg-surface2 px-3 py-2 text-sm",
                children: [
                    value === 'vetted' ? 'Vetted' : 'Insufficient',
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                    className: "z-20 rounded-xl border border-white/10 bg-surface p-1 shadow-card",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
                            className: "cursor-pointer rounded-lg px-2 py-1 text-sm outline-none hover:bg-white/10",
                            onSelect: ()=>onChange('vetted'),
                            children: "Vetted"
                        }, void 0, false, {
                            fileName: "[project]/client/components/ui/dropdown.tsx",
                            lineNumber: 15,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
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
_c = DecisionDropdown;
var _c;
__turbopack_context__.k.register(_c, "DecisionDropdown");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/app/title-registration/components/ExternalRegistryLookup.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExternalRegistryLookup",
    ()=>ExternalRegistryLookup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function ExternalRegistryLookup({ searchValue, onSearchChange, lookupValue, onLookupChange, options, formatOptionLabel }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "space-y-1 text-sm md:col-span-3 lg:col-span-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted",
                        children: "Search external registry (surname/email/ID/passport)"
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/ExternalRegistryLookup.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "space-y-1 text-sm md:col-span-3 lg:col-span-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted",
                        children: "Lookup previously used external academics"
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/ExternalRegistryLookup.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                        value: lookupValue,
                        onChange: (event)=>onLookupChange(event.target.value),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Not in database / enter manually"
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/ExternalRegistryLookup.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this),
                            options.map((person)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
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
_c = ExternalRegistryLookup;
var _c;
__turbopack_context__.k.register(_c, "ExternalRegistryLookup");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/app/title-registration/components/SupervisorRoleCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldLabel",
    ()=>FieldLabel,
    "SupervisorRoleCard",
    ()=>SupervisorRoleCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$app$2f$title$2d$registration$2f$components$2f$ExternalRegistryLookup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/app/title-registration/components/ExternalRegistryLookup.tsx [app-client] (ecmascript)");
'use client';
;
;
;
;
function FieldLabel({ text, required = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-muted",
        children: [
            text,
            required ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ml-2 text-xs text-rose-300",
                children: "Required"
            }, void 0, false, {
                fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                lineNumber: 23,
                columnNumber: 19
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = FieldLabel;
// ---------------------------------------------------------------------------
// SupervisorRoleCard
// ---------------------------------------------------------------------------
const fieldClass = 'w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2';
const sectionGrid = 'grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12';
function SupervisorRoleCard({ config, formData, externalSearch, onExternalSearchChange, filteredExternalOptions, formatExternalPerson, formatInternalPerson, internalPersonValue, resolveInternalDisplayName, onIsInternalChange, onInternalSelect, onExternalLookup, onExternalFieldChange, onSendProfileLink, inviteStatus }) {
    const isInternal = formData[config.isInternalKey];
    const sameAsPrimary = config.sameAsPrimary;
    const collapsedBySameAsPrimary = sameAsPrimary != null && formData[sameAsPrimary.fieldKey] === 'Yes';
    const externalTitle = String(formData[config.externalTitleKey]);
    const externalFirstName = String(formData[config.externalFirstNameKey]);
    const externalSurname = String(formData[config.externalSurnameKey]);
    const externalEmail = String(formData[config.externalEmailKey]);
    const resolvedExternalName = `${externalTitle} ${externalFirstName} ${externalSurname}`.replace(/\s+/g, ' ').trim();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "mb-3 flex items-center gap-2 text-sm font-bold",
                children: [
                    config.icon,
                    config.heading
                ]
            }, void 0, true, {
                fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, this),
            sameAsPrimary != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${sectionGrid} mb-3`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "space-y-1 text-sm md:col-span-2 lg:col-span-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                text: sameAsPrimary.label,
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                lineNumber: 146,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                className: fieldClass,
                                value: formData[sameAsPrimary.fieldKey],
                                onChange: (event)=>void sameAsPrimary.onChange(event.target.value),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Yes",
                                        children: "Yes"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                        lineNumber: 154,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "No",
                                        children: "No"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                        lineNumber: 155,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                lineNumber: 147,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                        lineNumber: 145,
                        columnNumber: 11
                    }, this),
                    collapsedBySameAsPrimary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "space-y-1 text-sm md:col-span-4 lg:col-span-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted",
                                children: [
                                    config.heading,
                                    " (resolved)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                lineNumber: 160,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: fieldClass,
                                value: sameAsPrimary.resolveDisplayValue(),
                                disabled: true
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                lineNumber: 161,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                        lineNumber: 159,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                lineNumber: 144,
                columnNumber: 9
            }, this),
            !collapsedBySameAsPrimary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: sectionGrid,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "space-y-1 text-sm md:col-span-2 lg:col-span-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                text: `${config.heading} is UWC-internal`,
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                lineNumber: 172,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                className: fieldClass,
                                value: isInternal,
                                onChange: (event)=>onIsInternalChange(event.target.value),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Yes",
                                        children: "Yes"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                        lineNumber: 178,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "No",
                                        children: "No"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                        lineNumber: 179,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                lineNumber: 173,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                        lineNumber: 171,
                        columnNumber: 11
                    }, this),
                    isInternal === 'Yes' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm md:col-span-4 lg:col-span-9",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                        text: config.heading,
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                        lineNumber: 187,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: fieldClass,
                                        value: String(formData[config.internalNameKey]),
                                        onChange: (event)=>void onInternalSelect(event.target.value),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: config.internalSelectPlaceholder
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                                lineNumber: 193,
                                                columnNumber: 19
                                            }, this),
                                            config.directory.map((person)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: internalPersonValue(person),
                                                    children: formatInternalPerson(person)
                                                }, person.id, false, {
                                                    fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                                    lineNumber: 195,
                                                    columnNumber: 21
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                        lineNumber: 188,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                lineNumber: 186,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm md:col-span-3 lg:col-span-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted",
                                        children: [
                                            config.heading,
                                            " (resolved)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                        lineNumber: 203,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: fieldClass,
                                        value: resolveInternalDisplayName(String(formData[config.internalNameKey]), config.directory),
                                        disabled: true
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                        lineNumber: 204,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                lineNumber: 202,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm md:col-span-3 lg:col-span-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted",
                                        children: [
                                            config.heading,
                                            " Qualifications"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                        lineNumber: 215,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: fieldClass,
                                        value: String(formData[config.qualificationKey]),
                                        disabled: true
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                        lineNumber: 216,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                lineNumber: 214,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$app$2f$title$2d$registration$2f$components$2f$ExternalRegistryLookup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExternalRegistryLookup"], {
                                role: config.role,
                                searchValue: externalSearch,
                                onSearchChange: onExternalSearchChange,
                                lookupValue: String(formData[config.externalLookupIdKey]),
                                onLookupChange: onExternalLookup,
                                options: filteredExternalOptions,
                                formatOptionLabel: formatExternalPerson
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                lineNumber: 226,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm md:col-span-2 lg:col-span-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                        text: "Title",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                        lineNumber: 238,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: fieldClass,
                                        placeholder: "e.g., Prof / Dr / Mr / Ms",
                                        value: externalTitle,
                                        onChange: (event)=>onExternalFieldChange({
                                                [config.externalTitleKey]: event.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                        lineNumber: 239,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                lineNumber: 237,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm md:col-span-2 lg:col-span-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                        text: "First Name",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                        lineNumber: 251,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: fieldClass,
                                        placeholder: "Enter first/given name",
                                        value: externalFirstName,
                                        onChange: (event)=>onExternalFieldChange({
                                                [config.externalFirstNameKey]: event.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                        lineNumber: 252,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                lineNumber: 250,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm md:col-span-2 lg:col-span-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                        text: "Surname",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                        lineNumber: 264,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: fieldClass,
                                        placeholder: "Enter surname/family name",
                                        value: externalSurname,
                                        onChange: (event)=>onExternalFieldChange({
                                                [config.externalSurnameKey]: event.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                        lineNumber: 265,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                lineNumber: 263,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm md:col-span-3 lg:col-span-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted",
                                        children: "Resolved Name"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                        lineNumber: 277,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: fieldClass,
                                        value: resolvedExternalName,
                                        disabled: true
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                        lineNumber: 278,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                lineNumber: 276,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm md:col-span-3 lg:col-span-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                        text: "Email",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                        lineNumber: 281,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: fieldClass,
                                        placeholder: "name@institution.edu",
                                        value: externalEmail,
                                        onChange: (event)=>onExternalFieldChange({
                                                [config.externalEmailKey]: event.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                        lineNumber: 282,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                lineNumber: 280,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "md:col-span-6 lg:col-span-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: ()=>void onSendProfileLink(),
                                        children: "Send Profile Link"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                        lineNumber: 296,
                                        columnNumber: 17
                                    }, this),
                                    inviteStatus != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-xs text-muted",
                                        children: [
                                            inviteStatus.status === 'completed' ? `External ${config.inviteLabel} profile completed. Database has been updated.` : inviteStatus.status === 'pending' ? `Waiting on external ${config.inviteLabel} action (${inviteStatus.deliveryStatus}).` : 'Previous invite expired. Please send a new profile link.',
                                            inviteStatus.expiresAt != null ? ` Expires ${new Date(inviteStatus.expiresAt).toLocaleDateString([], {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            })}.` : '',
                                            ' ',
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: inviteStatus.inviteLink,
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "text-accent underline",
                                                children: "Open link"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                                lineNumber: 308,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                        lineNumber: 298,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                                lineNumber: 295,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
                lineNumber: 169,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client/app/title-registration/components/SupervisorRoleCard.tsx",
        lineNumber: 136,
        columnNumber: 5
    }, this);
}
_c1 = SupervisorRoleCard;
var _c, _c1;
__turbopack_context__.k.register(_c, "FieldLabel");
__turbopack_context__.k.register(_c1, "SupervisorRoleCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/app/title-registration/components/TitleRegistrationModule.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TitleRegistrationModule",
    ()=>TitleRegistrationModule
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserRound$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-round.js [app-client] (ecmascript) <export default as UserRound>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UsersRound$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users-round.js [app-client] (ecmascript) <export default as UsersRound>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$dropdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/components/ui/dropdown.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$app$2f$title$2d$registration$2f$components$2f$SupervisorRoleCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/app/title-registration/components/SupervisorRoleCard.tsx [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
const fieldClass = 'w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2';
const areaClass = 'min-h-20 w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2';
const sectionGrid = 'grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12';
const plannedFormatLabels = [
    'PhD by traditional thesis format',
    'PhD by publication',
    'Masters Full-thesis',
    'Masters Mini thesis',
    'Masters by publication'
];
function TitleRegistrationModule(props) {
    const { formData, caseRecord, peopleDirectory, bcbDirectory, externalSearchByRole, setExternalSearchByRole, filteredExternalDirectory, formatExternalPerson, formatInternalPerson, internalPersonValue, resolveInternalDisplayName, getCoSupervisorCount, setCoSupervisorCount, saveField, saveFields, saveSupervisorFields, saveCoSupervisorFields, updateLocalFields, applyExternalLookup, sendExternalProfileLink, handleAdminSupervisorSameAsSupervisorChange, loadModuleData, handleSaveFormNow, handleGeneratePdf, handleStudentVet, handleSupervisorReview, handleDeptReview, handleChairpersonSign, handleDeptSendFaculty, handleFacultyReview, triggerReminder, isSaving, printUrl, lastSavedAt, decision, setDecision, comments, setComments, inviteStatusByRole } = props;
    const selectedPlannedFormat = plannedFormatLabels.find((label)=>Boolean(formData[label])) ?? '';
    const coCount = getCoSupervisorCount(formData);
    // -------------------------------------------------------------------------
    // Per-role callbacks — all per-role variance lives here, not in the card
    // -------------------------------------------------------------------------
    const roleCallbacks = {
        supervisor: {
            onIsInternalChange: (v)=>updateLocalFields({
                    'Supervisor is UWC-internal': v
                }),
            onInternalSelect: (v)=>{
                const selected = peopleDirectory.find((p)=>internalPersonValue(p) === v);
                return saveSupervisorFields({
                    Supervisor: v,
                    'Supervisor Qualifications': selected?.highest_qualification ?? formData['Supervisor Qualifications']
                });
            },
            onExternalFieldChange: (patch)=>updateLocalFields({
                    'Supervisor is UWC-internal': 'No',
                    ...patch
                }),
            onSendProfileLink: ()=>sendExternalProfileLink('supervisor', formData['Supervisor External Email'])
        },
        admin: {
            onIsInternalChange: (v)=>updateLocalFields({
                    'Administrative Supervisor is UWC-internal': v
                }),
            onInternalSelect: (v)=>saveField('Administrative Supervisor (Nominal Role)', v),
            onExternalFieldChange: (patch)=>updateLocalFields({
                    'Administrative Supervisor is UWC-internal': 'No',
                    ...patch
                }),
            onSendProfileLink: ()=>sendExternalProfileLink('admin', formData['Administrative Supervisor External Email'])
        },
        co1: {
            onIsInternalChange: (v)=>updateLocalFields({
                    'Has Co-supervisor?': 'Yes',
                    'Co-supervisor is UWC-internal': v
                }),
            onInternalSelect: (v)=>saveCoSupervisorFields({
                    'Co-supervisor is UWC-internal': 'Yes',
                    'Co-supervisor': v
                }),
            onExternalFieldChange: (patch)=>updateLocalFields({
                    'Has Co-supervisor?': 'Yes',
                    'Co-supervisor is UWC-internal': 'No',
                    ...patch
                }),
            onSendProfileLink: ()=>sendExternalProfileLink('co1', formData['Co-supervisor External Email'])
        },
        co2: {
            onIsInternalChange: (v)=>updateLocalFields({
                    'Has Co-supervisor?': 'Yes',
                    'Second Co-supervisor is UWC-internal': v
                }),
            onInternalSelect: (v)=>saveCoSupervisorFields({
                    'Second Co-supervisor is UWC-internal': 'Yes',
                    'Second Co-supervisor': v
                }),
            onExternalFieldChange: (patch)=>updateLocalFields({
                    'Has Co-supervisor?': 'Yes',
                    'Second Co-supervisor is UWC-internal': 'No',
                    ...patch
                }),
            onSendProfileLink: ()=>sendExternalProfileLink('co2', formData['Second Co-supervisor External Email'])
        }
    };
    // Shared card props factory — wires config + callbacks + per-role state
    function roleCardProps(role) {
        return {
            formData,
            externalSearch: externalSearchByRole[role],
            onExternalSearchChange: (v)=>setExternalSearchByRole((prev)=>({
                        ...prev,
                        [role]: v
                    })),
            filteredExternalOptions: filteredExternalDirectory(role),
            formatExternalPerson,
            formatInternalPerson,
            internalPersonValue,
            resolveInternalDisplayName,
            onExternalLookup: (v)=>applyExternalLookup(role, v),
            inviteStatus: inviteStatusByRole[role],
            ...roleCallbacks[role]
        };
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2 flex items-center gap-2 text-sm text-muted",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                size: 14,
                                className: "text-accent"
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 218,
                                columnNumber: 11
                            }, this),
                            "Main ROTT Sections"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 217,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted",
                        children: "Student Details, Thesis Details, Ethics, MOU, Supervisor Details, Administrative Supervisor (Nominal Role), Co-supervisor Details."
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 221,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "mb-3 text-sm font-bold",
                        children: "Student Details"
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 229,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: sectionGrid,
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
                            ].map((label)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "space-y-1 text-sm md:col-span-3 lg:col-span-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-muted",
                                            children: label
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                            lineNumber: 246,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            className: fieldClass,
                                            value: String(formData[label]),
                                            disabled: true
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                            lineNumber: 247,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, label, true, {
                                    fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                    lineNumber: 245,
                                    columnNumber: 13
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm md:col-span-6 lg:col-span-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted",
                                        children: "Planned format (select one)"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 251,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: fieldClass,
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "--- Select planned format ---"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 266,
                                                columnNumber: 15
                                            }, this),
                                            plannedFormatLabels.map((label)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: label,
                                                    children: label
                                                }, label, false, {
                                                    fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                    lineNumber: 268,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 252,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 250,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 230,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                lineNumber: 228,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "mb-3 text-sm font-bold",
                        children: "Thesis Details"
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 279,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: sectionGrid,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm md:col-span-6 lg:col-span-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted",
                                        children: "Thesis title"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 282,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        className: areaClass,
                                        value: formData['Thesis title'],
                                        onChange: (event)=>void saveField('Thesis title', event.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 283,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 281,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm md:col-span-6 lg:col-span-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted",
                                        children: "Key words"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 290,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: fieldClass,
                                        value: formData['Key words'],
                                        onChange: (event)=>void saveField('Key words', event.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 291,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-muted",
                                        children: "Use precise key phrases, comma-separated."
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 296,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 289,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm md:col-span-6 lg:col-span-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted",
                                        children: "Abstract"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 299,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        className: "min-h-28 w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                        value: formData.Abstract,
                                        onChange: (event)=>void saveField('Abstract', event.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 300,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 298,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm md:col-span-3 lg:col-span-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted",
                                        children: "Initial thesis title for upgrade from Masters to Doctoral"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 307,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: fieldClass,
                                        value: formData['Initial thesis title for upgrade from Masters to Doctoral'],
                                        onChange: (event)=>void saveField('Initial thesis title for upgrade from Masters to Doctoral', event.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 310,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 306,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm md:col-span-3 lg:col-span-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted",
                                        children: "PhD project proposal upload/link (5-10 pages incl. timeframes)"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 322,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: fieldClass,
                                        value: formData['PhD proposal link (5-10 pages incl. timeframes)'],
                                        onChange: (event)=>void saveField('PhD proposal link (5-10 pages incl. timeframes)', event.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 325,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 321,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 280,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                lineNumber: 278,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "mb-3 text-sm font-bold",
                        children: "Ethics"
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 341,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: sectionGrid,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm md:col-span-2 lg:col-span-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted",
                                        children: "Does this project need Ethics clearance?"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 344,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: fieldClass,
                                        value: formData['Does this project need Ethics clearance?'],
                                        onChange: (event)=>void saveField('Does this project need Ethics clearance?', event.target.value),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Yes",
                                                children: "Yes"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 352,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "No",
                                                children: "No"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 353,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 345,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 343,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm md:col-span-2 lg:col-span-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted",
                                        children: "Ethics clearance reference number"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 357,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: fieldClass,
                                        value: formData['Ethics clearance reference number'],
                                        onChange: (event)=>void saveField('Ethics clearance reference number', event.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 358,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 356,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm md:col-span-2 lg:col-span-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted",
                                        children: "Date on which ethics clearance was issued"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 367,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: fieldClass,
                                        value: formData['Date on which ethics clearance was issued'],
                                        onChange: (event)=>void saveField('Date on which ethics clearance was issued', event.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 368,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 366,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 342,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                lineNumber: 340,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "mb-3 text-sm font-bold",
                        children: "MOU"
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 381,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "space-y-1 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted",
                                children: "Has the MOU been submitted?"
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 383,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: fieldClass,
                                value: formData['Has the MOU been submitted?'],
                                disabled: true
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 384,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 382,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-xs text-muted",
                        children: "Sequence enforced: ROTT -> Supervisor Profiles (+CV) -> MOU."
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 390,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            disabled: caseRecord.completion_percent < 100,
                            onClick: ()=>void loadModuleData('mou'),
                            children: "Open MOU Module"
                        }, void 0, false, {
                            fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                            lineNumber: 394,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 393,
                        columnNumber: 9
                    }, this),
                    caseRecord.completion_percent < 100 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-xs text-muted",
                        children: "Complete and save the ROTT in full before opening MOU."
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 402,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                lineNumber: 380,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$app$2f$title$2d$registration$2f$components$2f$SupervisorRoleCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SupervisorRoleCard"], {
                config: {
                    role: 'supervisor',
                    heading: 'Supervisor Details',
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserRound$3e$__["UserRound"], {
                        size: 14,
                        className: "text-accent"
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 413,
                        columnNumber: 17
                    }, void 0),
                    isInternalKey: 'Supervisor is UWC-internal',
                    internalNameKey: 'Supervisor',
                    qualificationKey: 'Supervisor Qualifications',
                    externalLookupIdKey: 'Supervisor External Lookup Id',
                    externalTitleKey: 'Supervisor Title',
                    externalFirstNameKey: 'Supervisor External First Name',
                    externalSurnameKey: 'Supervisor External Surname',
                    externalEmailKey: 'Supervisor External Email',
                    directory: peopleDirectory,
                    internalSelectPlaceholder: '--- Select supervisor ---',
                    inviteLabel: 'supervisor'
                },
                ...roleCardProps('supervisor')
            }, void 0, false, {
                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                lineNumber: 409,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$app$2f$title$2d$registration$2f$components$2f$SupervisorRoleCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SupervisorRoleCard"], {
                config: {
                    role: 'admin',
                    heading: 'Administrative Supervisor (Nominal Role)',
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                        size: 14,
                        className: "text-accent"
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 434,
                        columnNumber: 17
                    }, void 0),
                    isInternalKey: 'Administrative Supervisor is UWC-internal',
                    internalNameKey: 'Administrative Supervisor (Nominal Role)',
                    qualificationKey: 'Administrative Supervisor Qualifications (Nominal Role)',
                    externalLookupIdKey: 'Administrative Supervisor External Lookup Id',
                    externalTitleKey: 'Administrative Supervisor External Title',
                    externalFirstNameKey: 'Administrative Supervisor External First Name',
                    externalSurnameKey: 'Administrative Supervisor External Surname',
                    externalEmailKey: 'Administrative Supervisor External Email',
                    directory: bcbDirectory,
                    internalSelectPlaceholder: '--- Select administrative supervisor ---',
                    inviteLabel: 'administrative supervisor',
                    sameAsPrimary: {
                        fieldKey: 'Administrative Supervisor same as Supervisor',
                        label: 'Administrative supervisor same as supervisor?',
                        resolveDisplayValue: ()=>formData['Supervisor is UWC-internal'] === 'Yes' ? resolveInternalDisplayName(formData.Supervisor, peopleDirectory) : `${formData['Supervisor Title']} ${formData['Supervisor External First Name']} ${formData['Supervisor External Surname']}`.replace(/\s+/g, ' ').trim(),
                        onChange: handleAdminSupervisorSameAsSupervisorChange
                    }
                },
                ...roleCardProps('admin')
            }, void 0, false, {
                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                lineNumber: 430,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "mb-3 flex items-center gap-2 text-sm font-bold",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UsersRound$3e$__["UsersRound"], {
                                size: 14,
                                className: "text-accent"
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 464,
                                columnNumber: 11
                            }, this),
                            " Co-supervisor Details"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 463,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: sectionGrid,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 text-sm md:col-span-2 lg:col-span-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$app$2f$title$2d$registration$2f$components$2f$SupervisorRoleCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldLabel"], {
                                        text: "Number of Co-supervisors",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 468,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: fieldClass,
                                        value: String(coCount),
                                        onChange: (event)=>void setCoSupervisorCount(Number(event.target.value)),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "0",
                                                children: "0"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 476,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "1",
                                                children: "1"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 477,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "2",
                                                children: "2"
                                            }, void 0, false, {
                                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                                lineNumber: 478,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                        lineNumber: 469,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 467,
                                columnNumber: 11
                            }, this),
                            coCount === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "self-end text-sm text-muted md:col-span-4 lg:col-span-9",
                                children: "No co-supervisor fields are required."
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 482,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 466,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                lineNumber: 462,
                columnNumber: 7
            }, this),
            coCount >= 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$app$2f$title$2d$registration$2f$components$2f$SupervisorRoleCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SupervisorRoleCard"], {
                config: {
                    role: 'co1',
                    heading: 'Co-supervisor 1',
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UsersRound$3e$__["UsersRound"], {
                        size: 14,
                        className: "text-accent"
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 495,
                        columnNumber: 19
                    }, void 0),
                    isInternalKey: 'Co-supervisor is UWC-internal',
                    internalNameKey: 'Co-supervisor',
                    qualificationKey: 'Co-supervisor Qualifications',
                    externalLookupIdKey: 'Co-supervisor External Lookup Id',
                    externalTitleKey: 'Co-supervisor Title',
                    externalFirstNameKey: 'Co-supervisor External First Name',
                    externalSurnameKey: 'Co-supervisor External Surname',
                    externalEmailKey: 'Co-supervisor External Email',
                    directory: peopleDirectory,
                    internalSelectPlaceholder: '--- Select co-supervisor 1 ---',
                    inviteLabel: 'co-supervisor 1'
                },
                ...roleCardProps('co1')
            }, void 0, false, {
                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                lineNumber: 491,
                columnNumber: 9
            }, this),
            coCount === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$app$2f$title$2d$registration$2f$components$2f$SupervisorRoleCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SupervisorRoleCard"], {
                config: {
                    role: 'co2',
                    heading: 'Co-supervisor 2',
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UsersRound$3e$__["UsersRound"], {
                        size: 14,
                        className: "text-accent"
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 518,
                        columnNumber: 19
                    }, void 0),
                    isInternalKey: 'Second Co-supervisor is UWC-internal',
                    internalNameKey: 'Second Co-supervisor',
                    qualificationKey: 'Second Co-supervisor Qualifications',
                    externalLookupIdKey: 'Second Co-supervisor External Lookup Id',
                    externalTitleKey: 'Second Co-supervisor Title',
                    externalFirstNameKey: 'Second Co-supervisor External First Name',
                    externalSurnameKey: 'Second Co-supervisor External Surname',
                    externalEmailKey: 'Second Co-supervisor External Email',
                    directory: peopleDirectory,
                    internalSelectPlaceholder: '--- Select co-supervisor 2 ---',
                    inviteLabel: 'co-supervisor 2'
                },
                ...roleCardProps('co2')
            }, void 0, false, {
                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                lineNumber: 514,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                disabled: isSaving,
                                onClick: ()=>void handleSaveFormNow(),
                                children: "Save"
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 538,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                disabled: isSaving || caseRecord.completion_percent < 100,
                                onClick: ()=>void handleGeneratePdf(),
                                children: "Generate Print PDF"
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 541,
                                columnNumber: 11
                            }, this),
                            printUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: printUrl,
                                target: "_blank",
                                rel: "noreferrer",
                                className: "inline-flex items-center rounded-xl border border-accent/60 px-3 py-2 text-sm font-semibold text-accent",
                                children: "Open Printable PDF"
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 548,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                disabled: caseRecord.case_status !== 'awaiting_student_vetting',
                                onClick: ()=>void handleStudentVet(),
                                children: "Email to Supervisor"
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 557,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 537,
                        columnNumber: 9
                    }, this),
                    lastSavedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-xs text-muted",
                        children: [
                            "Information saved at",
                            ' ',
                            new Date(lastSavedAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                            }),
                            ' ',
                            new Date(lastSavedAt).toLocaleDateString([], {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                            }),
                            "."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 565,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                lineNumber: 536,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "mb-2 text-sm font-bold",
                        children: "Review Actions"
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 580,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-3 md:grid-cols-[auto_1fr_auto_auto_auto]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$dropdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DecisionDropdown"], {
                                value: decision,
                                onChange: setDecision
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 582,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "rounded-xl border border-white/10 bg-surface2 px-3 py-2 text-sm",
                                placeholder: "Comments for return actions",
                                value: comments,
                                onChange: (event)=>setComments(event.target.value)
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 583,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                disabled: caseRecord.case_status !== 'awaiting_supervisor_review',
                                onClick: ()=>void handleSupervisorReview(),
                                children: "Supervisor Review"
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 589,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                disabled: caseRecord.case_status !== 'awaiting_dept_fhd_review',
                                onClick: ()=>void handleDeptReview(),
                                children: "Dept FHD Vet (Adriaan)"
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 595,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                disabled: caseRecord.case_status !== 'awaiting_chairperson_signature',
                                onClick: ()=>void handleChairpersonSign(),
                                children: "Chairperson Sign"
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 601,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 581,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 grid gap-3 md:grid-cols-[auto_auto_auto]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                disabled: caseRecord.case_status !== 'awaiting_dept_fhd_send_to_faculty',
                                onClick: ()=>void handleDeptSendFaculty(),
                                children: "Dept FHD Send to Faculty"
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 609,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                disabled: caseRecord.case_status !== 'sent_to_faculty_fhd',
                                onClick: ()=>void handleFacultyReview(),
                                children: "Faculty FHD Review"
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 615,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                disabled: caseRecord.case_status !== 'sent_to_faculty_fhd',
                                onClick: ()=>void triggerReminder(),
                                children: "Send 3-Workday Reminder"
                            }, void 0, false, {
                                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                                lineNumber: 621,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 608,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 text-xs text-muted",
                        children: "Flow: Supervisor -> Dept FHD vet -> Chairperson sign -> Dept FHD sends to Faculty FHD -> Faculty vet/return."
                    }, void 0, false, {
                        fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                        lineNumber: 628,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/app/title-registration/components/TitleRegistrationModule.tsx",
                lineNumber: 579,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c = TitleRegistrationModule;
var _c;
__turbopack_context__.k.register(_c, "TitleRegistrationModule");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
    "getAppointArbiter",
    ()=>getAppointArbiter,
    "getAppointExaminers",
    ()=>getAppointExaminers,
    "getChangeExaminers",
    ()=>getChangeExaminers,
    "getDirectoryDepartments",
    ()=>getDirectoryDepartments,
    "getDirectoryStaff",
    ()=>getDirectoryStaff,
    "getExaminerSummaryCv",
    ()=>getExaminerSummaryCv,
    "getExternalAcademicInvite",
    ()=>getExternalAcademicInvite,
    "getExternalAcademics",
    ()=>getExternalAcademics,
    "getExternalInviteStatuses",
    ()=>getExternalInviteStatuses,
    "getExternalSupervisors",
    ()=>getExternalSupervisors,
    "getIntentionToSubmit",
    ()=>getIntentionToSubmit,
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
    "patchAppointArbiter",
    ()=>patchAppointArbiter,
    "patchAppointExaminers",
    ()=>patchAppointExaminers,
    "patchChangeExaminers",
    ()=>patchChangeExaminers,
    "patchExaminerSummaryCv",
    ()=>patchExaminerSummaryCv,
    "patchForm",
    ()=>patchForm,
    "patchIntentionToSubmit",
    ()=>patchIntentionToSubmit,
    "patchMou",
    ()=>patchMou,
    "patchSupervisorProfile",
    ()=>patchSupervisorProfile,
    "printMou",
    ()=>printMou,
    "requestSupervisorProfiles",
    ()=>requestSupervisorProfiles,
    "resolveApiOrigin",
    ()=>resolveApiOrigin,
    "sendReminder",
    ()=>sendReminder,
    "sendSupervisorProfilesReminder",
    ()=>sendSupervisorProfilesReminder,
    "studentVet",
    ()=>studentVet,
    "submitAppointArbiter",
    ()=>submitAppointArbiter,
    "submitAppointExaminers",
    ()=>submitAppointExaminers,
    "submitChangeExaminers",
    ()=>submitChangeExaminers,
    "submitExaminerSummaryCv",
    ()=>submitExaminerSummaryCv,
    "submitIntentionToSubmit",
    ()=>submitIntentionToSubmit,
    "submitSupervisorProfile",
    ()=>submitSupervisorProfile,
    "supervisorReview",
    ()=>supervisorReview,
    "uploadSupervisorProfileCv",
    ()=>uploadSupervisorProfileCv
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
function resolveApiBase() {
    const configured = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_BASE?.trim();
    if (configured) {
        return configured.replace(/\/+$/, '');
    }
    if ("TURBOPACK compile-time truthy", 1) {
        return `${window.location.origin}/api/v1`;
    }
    //TURBOPACK unreachable
    ;
}
function resolveApiOrigin() {
    const configured = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_BASE?.trim();
    if (configured) {
        try {
            return new URL(configured).origin;
        } catch  {
            return configured.replace(/\/api\/v1\/?$/, '');
        }
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (window.location.port === '3000') {
            return `${window.location.protocol}//${window.location.hostname}:3001`;
        }
        return window.location.origin;
    }
    //TURBOPACK unreachable
    ;
}
const apiBase = resolveApiBase();
function candidateApiBases() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const configured = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_BASE?.trim();
    if (configured) {
        return [
            configured.replace(/\/+$/, '')
        ];
    }
    const candidates = [
        `${window.location.origin}/api/v1`
    ];
    if (window.location.port === '3000') {
        candidates.push(`${window.location.protocol}//${window.location.hostname}:3001/api/v1`);
    }
    return Array.from(new Set(candidates.map((value)=>value.replace(/\/+$/, ''))));
}
const demoActorSasiIds = {
    student: '1234567',
    supervisor: 'STAFF-001',
    dept: 'STAFF-003',
    chair: 'STAFF-005',
    faculty: 'STAFF-004'
};
const tokenCacheByActor = new Map();
async function request(path, init) {
    const bases = candidateApiBases();
    let lastError = null;
    for (const base of bases){
        const url = `${base}${path}`;
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
            lastError = error instanceof Error ? error.message : 'Network error';
            continue;
        }
        const contentType = response.headers.get('content-type') ?? '';
        const bodyText = await response.text();
        if (!contentType.toLowerCase().includes('application/json')) {
            lastError = `API at ${base} returned non-JSON response (${response.status}).`;
            continue;
        }
        let payload = null;
        try {
            payload = JSON.parse(bodyText);
        } catch  {
            lastError = `API at ${base} returned invalid JSON (${response.status}).`;
            continue;
        }
        if (!response.ok) {
            throw new Error(payload.message ?? `Request failed (${response.status})`);
        }
        return payload;
    }
    throw new Error(`Cannot reach API. Checked: ${bases.join(', ')}. Start the server with "npm run dev:server" and set NEXT_PUBLIC_API_BASE if needed. ${lastError ? `(${lastError})` : ''}`);
}
async function devLogin(sasiId) {
    return request('/auth/dev-login', {
        method: 'POST',
        body: JSON.stringify({
            sasiId
        })
    });
}
async function authHeadersForActor(actorSasiId) {
    let token = tokenCacheByActor.get(actorSasiId);
    if (!token) {
        const result = await devLogin(actorSasiId);
        token = result.token;
        tokenCacheByActor.set(actorSasiId, token);
    }
    return {
        Authorization: `Bearer ${token}`
    };
}
async function checkSasi(studentNumber) {
    return request(`/title-registration/sasi/${studentNumber}/check`);
}
async function patchForm(caseId, patch) {
    const headers = await authHeadersForActor(demoActorSasiIds.student);
    return request(`/title-registration/cases/${caseId}/form`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(patch)
    });
}
async function generatePrintPdf(caseId) {
    const headers = await authHeadersForActor(demoActorSasiIds.student);
    return request(`/title-registration/cases/${caseId}/print`, {
        method: 'POST',
        headers
    });
}
async function studentVet(caseId) {
    const headers = await authHeadersForActor(demoActorSasiIds.student);
    return request(`/title-registration/cases/${caseId}/student-vet`, {
        method: 'POST',
        headers
    });
}
async function supervisorReview(caseId, decision, comments) {
    const headers = await authHeadersForActor(demoActorSasiIds.supervisor);
    return request(`/title-registration/cases/${caseId}/supervisor-review`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            decision,
            comments
        })
    });
}
async function deptReview(caseId, decision, comments) {
    const headers = await authHeadersForActor(demoActorSasiIds.dept);
    return request(`/title-registration/cases/${caseId}/dept-review`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            decision,
            comments
        })
    });
}
async function chairpersonSign(caseId, comments) {
    const headers = await authHeadersForActor(demoActorSasiIds.chair);
    return request(`/title-registration/cases/${caseId}/chairperson-sign`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            comments
        })
    });
}
async function deptSendFaculty(caseId) {
    const headers = await authHeadersForActor(demoActorSasiIds.dept);
    return request(`/title-registration/cases/${caseId}/dept-send-faculty`, {
        method: 'POST',
        headers
    });
}
async function facultyReview(caseId, decision, comments) {
    const headers = await authHeadersForActor(demoActorSasiIds.faculty);
    return request(`/title-registration/cases/${caseId}/faculty-review`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            decision,
            comments
        })
    });
}
async function sendReminder(caseId) {
    const headers = await authHeadersForActor(demoActorSasiIds.dept);
    return request(`/title-registration/cases/${caseId}/reminder`, {
        method: 'POST',
        headers
    });
}
async function getPipeline() {
    const headers = await authHeadersForActor(demoActorSasiIds.student);
    return request('/title-registration/pipeline', {
        headers
    });
}
async function getTasks() {
    const headers = await authHeadersForActor(demoActorSasiIds.student);
    return request('/title-registration/tasks', {
        headers
    });
}
async function getToDo() {
    const headers = await authHeadersForActor(demoActorSasiIds.student);
    return request('/title-registration/to-do', {
        headers
    });
}
async function getPeople() {
    const headers = await authHeadersForActor(demoActorSasiIds.student);
    return request('/title-registration/people', {
        headers
    });
}
async function getNotifications(caseId) {
    const query = typeof caseId === 'number' ? `?caseId=${caseId}` : '';
    const headers = await authHeadersForActor(demoActorSasiIds.student);
    return request(`/title-registration/notifications${query}`, {
        headers
    });
}
async function getSupervisorProfiles(caseId) {
    const headers = await authHeadersForActor(demoActorSasiIds.student);
    return request(`/title-registration/cases/${caseId}/supervisor-profiles`, {
        headers
    });
}
async function getExternalInviteStatuses(caseId) {
    const headers = await authHeadersForActor(demoActorSasiIds.student);
    return request(`/title-registration/cases/${caseId}/external-invites`, {
        headers
    });
}
async function patchSupervisorProfile(profileId, patch) {
    const headers = await authHeadersForActor(demoActorSasiIds.supervisor);
    return request(`/title-registration/supervisor-profiles/${profileId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(patch)
    });
}
async function submitSupervisorProfile(profileId) {
    const headers = await authHeadersForActor(demoActorSasiIds.supervisor);
    return request(`/title-registration/supervisor-profiles/${profileId}/submit`, {
        method: 'POST',
        headers
    });
}
async function requestSupervisorProfiles(caseId) {
    const headers = await authHeadersForActor(demoActorSasiIds.student);
    return request(`/title-registration/cases/${caseId}/supervisor-profiles/request`, {
        method: 'POST',
        headers
    });
}
async function sendSupervisorProfilesReminder(caseId) {
    const headers = await authHeadersForActor(demoActorSasiIds.dept);
    return request(`/title-registration/cases/${caseId}/supervisor-profiles/reminder`, {
        method: 'POST',
        headers
    });
}
async function uploadSupervisorProfileCv(profileId, payload) {
    const headers = await authHeadersForActor(demoActorSasiIds.supervisor);
    return request(`/title-registration/supervisor-profiles/${profileId}/upload-cv`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
    });
}
async function getMou(caseId) {
    const headers = await authHeadersForActor(demoActorSasiIds.student);
    return request(`/title-registration/cases/${caseId}/mou`, {
        headers
    });
}
async function patchMou(caseId, patch) {
    const headers = await authHeadersForActor(demoActorSasiIds.student);
    return request(`/title-registration/cases/${caseId}/mou`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(patch)
    });
}
async function completeMou(caseId) {
    const headers = await authHeadersForActor(demoActorSasiIds.student);
    return request(`/title-registration/cases/${caseId}/mou/complete`, {
        method: 'POST',
        headers
    });
}
async function printMou(caseId) {
    const headers = await authHeadersForActor(demoActorSasiIds.student);
    return request(`/title-registration/cases/${caseId}/mou/print`, {
        method: 'POST',
        headers
    });
}
async function getIntentionToSubmit(caseId) {
    const headers = await authHeadersForActor(demoActorSasiIds.student);
    return request(`/title-registration/cases/${caseId}/intention-to-submit`, {
        headers
    });
}
async function patchIntentionToSubmit(caseId, patch) {
    const headers = await authHeadersForActor(demoActorSasiIds.student);
    return request(`/title-registration/cases/${caseId}/intention-to-submit`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(patch)
    });
}
async function submitIntentionToSubmit(caseId) {
    const headers = await authHeadersForActor(demoActorSasiIds.student);
    return request(`/title-registration/cases/${caseId}/intention-to-submit/submit`, {
        method: 'POST',
        headers
    });
}
async function getAppointExaminers(caseId) {
    const headers = await authHeadersForActor(demoActorSasiIds.student);
    return request(`/title-registration/cases/${caseId}/appoint-examiners`, {
        headers
    });
}
async function patchAppointExaminers(caseId, patch) {
    const headers = await authHeadersForActor(demoActorSasiIds.student);
    return request(`/title-registration/cases/${caseId}/appoint-examiners`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(patch)
    });
}
async function submitAppointExaminers(caseId) {
    const headers = await authHeadersForActor(demoActorSasiIds.student);
    return request(`/title-registration/cases/${caseId}/appoint-examiners/submit`, {
        method: 'POST',
        headers
    });
}
async function getChangeExaminers(caseId) {
    const headers = await authHeadersForActor(demoActorSasiIds.student);
    return request(`/title-registration/cases/${caseId}/change-examiners`, {
        headers
    });
}
async function patchChangeExaminers(caseId, patch) {
    const headers = await authHeadersForActor(demoActorSasiIds.student);
    return request(`/title-registration/cases/${caseId}/change-examiners`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(patch)
    });
}
async function submitChangeExaminers(caseId) {
    const headers = await authHeadersForActor(demoActorSasiIds.student);
    return request(`/title-registration/cases/${caseId}/change-examiners/submit`, {
        method: 'POST',
        headers
    });
}
async function getExaminerSummaryCv(caseId) {
    const headers = await authHeadersForActor(demoActorSasiIds.student);
    return request(`/title-registration/cases/${caseId}/examiner-summary-cv`, {
        headers
    });
}
async function patchExaminerSummaryCv(caseId, patch) {
    const headers = await authHeadersForActor(demoActorSasiIds.student);
    return request(`/title-registration/cases/${caseId}/examiner-summary-cv`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(patch)
    });
}
async function submitExaminerSummaryCv(caseId) {
    const headers = await authHeadersForActor(demoActorSasiIds.student);
    return request(`/title-registration/cases/${caseId}/examiner-summary-cv/submit`, {
        method: 'POST',
        headers
    });
}
async function getAppointArbiter(caseId) {
    const headers = await authHeadersForActor(demoActorSasiIds.student);
    return request(`/title-registration/cases/${caseId}/appoint-arbiter`, {
        headers
    });
}
async function patchAppointArbiter(caseId, patch) {
    const headers = await authHeadersForActor(demoActorSasiIds.student);
    return request(`/title-registration/cases/${caseId}/appoint-arbiter`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(patch)
    });
}
async function submitAppointArbiter(caseId) {
    const headers = await authHeadersForActor(demoActorSasiIds.student);
    return request(`/title-registration/cases/${caseId}/appoint-arbiter/submit`, {
        method: 'POST',
        headers
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
"[project]/client/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$search$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/components/ui/search-input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$sidebar$2d$item$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/components/ui/sidebar-item.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$app$2f$title$2d$registration$2f$components$2f$TitleRegistrationModule$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/app/title-registration/components/TitleRegistrationModule.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
const modules = [
    'title_registration',
    'to_do',
    'supervisor_profiles',
    'mou',
    'intention_to_submit',
    'appoint_examiners',
    'change_examiners',
    'examiner_summary_cv',
    'appoint_arbiter',
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
const apiOrigin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveApiOrigin"])();
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
    _s();
    const [activeModule, setActiveModule] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('title_registration');
    const [studentNumber, setStudentNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('1234567');
    const [student, setStudent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [caseRecord, setCaseRecord] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pipeline, setPipeline] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [toDoItems, setToDoItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [tasks, setTasks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [people, setPeople] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [peopleDirectory, setPeopleDirectory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [bcbDirectory, setBcbDirectory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [externalDirectory, setExternalDirectory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [supervisorProfiles, setSupervisorProfiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [mouRecord, setMouRecord] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mouData, setMouData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mouPdfPath, setMouPdfPath] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [itsRecord, setItsRecord] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [itsData, setItsData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [appointRecord, setAppointRecord] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [appointData, setAppointData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [changeRecord, setChangeRecord] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [changeData, setChangeData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [summaryRecord, setSummaryRecord] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [summaryData, setSummaryData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [arbiterRecord, setArbiterRecord] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [arbiterData, setArbiterData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [notifications, setNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [pdfPath, setPdfPath] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [decision, setDecision] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('vetted');
    const [comments, setComments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [info, setInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lastSavedAt, setLastSavedAt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [externalSearchByRole, setExternalSearchByRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        supervisor: '',
        admin: '',
        co1: '',
        co2: ''
    });
    const [inviteFeedback, setInviteFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [inviteLink, setInviteLink] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [inviteStatusByRole, setInviteStatusByRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        supervisor: null,
        admin: null,
        co1: null,
        co2: null
    });
    const printUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Page.useMemo[printUrl]": ()=>{
            if (!pdfPath) return null;
            const idx = pdfPath.indexOf('/generated_forms/');
            if (idx === -1) return null;
            return `${apiOrigin}${pdfPath.slice(idx)}`;
        }
    }["Page.useMemo[printUrl]"], [
        pdfPath
    ]);
    const mouPrintUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Page.useMemo[mouPrintUrl]": ()=>{
            if (!mouPdfPath) return null;
            const idx = mouPdfPath.indexOf('/generated_forms/');
            if (idx === -1) return null;
            return `${apiOrigin}${mouPdfPath.slice(idx)}`;
        }
    }["Page.useMemo[mouPrintUrl]"], [
        mouPdfPath
    ]);
    async function refreshCaseNotifications(id) {
        const noteResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNotifications"])(id);
        setNotifications(noteResponse.data);
    }
    async function refreshSupervisorProfiles(caseId) {
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSupervisorProfiles"])(caseId);
        setSupervisorProfiles(response.data);
    }
    async function refreshMou(caseId) {
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMou"])(caseId);
        setMouRecord(response.record);
        setMouData(response.formData);
        setMouPdfPath(response.record.pdf_path);
    }
    async function refreshIntentionToSubmit(caseId) {
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIntentionToSubmit"])(caseId);
        setItsRecord(response.record);
        setItsData(response.formData);
    }
    async function refreshAppointExaminers(caseId) {
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAppointExaminers"])(caseId);
        setAppointRecord(response.record);
        setAppointData(response.formData);
    }
    async function refreshChangeExaminers(caseId) {
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChangeExaminers"])(caseId);
        setChangeRecord(response.record);
        setChangeData(response.formData);
    }
    async function refreshExaminerSummaryCv(caseId) {
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExaminerSummaryCv"])(caseId);
        setSummaryRecord(response.record);
        setSummaryData(response.formData);
    }
    async function refreshAppointArbiter(caseId) {
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAppointArbiter"])(caseId);
        setArbiterRecord(response.record);
        setArbiterData(response.formData);
    }
    async function refreshExternalInviteStatuses(caseId) {
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExternalInviteStatuses"])(caseId);
        const next = {
            supervisor: null,
            admin: null,
            co1: null,
            co2: null
        };
        for (const status of response.data){
            next[status.role] = status;
        }
        setInviteStatusByRole(next);
    }
    async function runSasiCheck() {
        setLoading(true);
        setError(null);
        setInfo(null);
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkSasi"])(studentNumber.trim());
            if (!response.eligible || !response.caseRecord || !response.formData || !response.student) {
                setError(response.reasons.join(' '));
                return;
            }
            setStudent(response.student);
            setCaseRecord(response.caseRecord);
            setFormData(response.formData);
            setPdfPath(response.caseRecord.pdf_path);
            const [peopleResult, bcbResult, externalResult] = await Promise.all([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDirectoryStaff"])({
                    internalOnly: true
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDirectoryStaff"])({
                    department: 'Department of Biodiversity and Conservation Biology',
                    internalOnly: true
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExternalAcademics"])()
            ]);
            setPeopleDirectory(peopleResult.data);
            setBcbDirectory(bcbResult.data);
            setExternalDirectory(externalResult.data);
            await refreshCaseNotifications(response.caseRecord.id);
            await refreshExternalInviteStatuses(response.caseRecord.id);
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
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["patchForm"])(caseRecord.id, {
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
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["patchForm"])(caseRecord.id, patch);
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
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["patchForm"])(caseRecord.id, buildPersistablePatch(formData));
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
    const externalDirectorySearchIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Page.useMemo[externalDirectorySearchIndex]": ()=>externalDirectory.map({
                "Page.useMemo[externalDirectorySearchIndex]": (person)=>({
                        person,
                        searchText: [
                            person.full_name,
                            person.last_name,
                            person.email,
                            person.alternate_email,
                            person.unique_identifier_value,
                            person.unique_identifier_type
                        ].join(' ').toLowerCase()
                    })
            }["Page.useMemo[externalDirectorySearchIndex]"])
    }["Page.useMemo[externalDirectorySearchIndex]"], [
        externalDirectory
    ]);
    const filteredExternalByRole = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Page.useMemo[filteredExternalByRole]": ()=>{
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
                result[role] = externalDirectorySearchIndex.filter({
                    "Page.useMemo[filteredExternalByRole]": (item)=>item.searchText.includes(query)
                }["Page.useMemo[filteredExternalByRole]"]).map({
                    "Page.useMemo[filteredExternalByRole]": (item)=>item.person
                }["Page.useMemo[filteredExternalByRole]"]);
            }
            return result;
        }
    }["Page.useMemo[filteredExternalByRole]"], [
        externalDirectory,
        externalDirectorySearchIndex,
        externalSearchByRole
    ]);
    function filteredExternalDirectory(role) {
        return filteredExternalByRole[role];
    }
    async function sendExternalProfileLink(role, emailInput) {
        if (!caseRecord || !formData) return;
        setInviteFeedback(null);
        setInviteLink(null);
        setError(null);
        setInfo(null);
        const roleFields = {
            supervisor: {
                title: formData['Supervisor Title'],
                firstName: formData['Supervisor External First Name'],
                surname: formData['Supervisor External Surname']
            },
            admin: {
                title: formData['Administrative Supervisor External Title'],
                firstName: formData['Administrative Supervisor External First Name'],
                surname: formData['Administrative Supervisor External Surname']
            },
            co1: {
                title: formData['Co-supervisor Title'],
                firstName: formData['Co-supervisor External First Name'],
                surname: formData['Co-supervisor External Surname']
            },
            co2: {
                title: formData['Second Co-supervisor Title'],
                firstName: formData['Second Co-supervisor External First Name'],
                surname: formData['Second Co-supervisor External Surname']
            }
        }[role];
        if (!roleFields.title.trim() || !roleFields.firstName.trim() || !roleFields.surname.trim()) {
            setInviteFeedback('Please enter title, first name, and surname before sending the profile link.');
            return;
        }
        if (!emailInput.trim()) {
            setInviteFeedback('Please enter email before sending the profile link.');
            return;
        }
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createExternalAcademicInvite"])(caseRecord.id, role, emailInput.trim());
            setInviteLink(result.inviteLink);
            const expiry = new Date(result.expiresAt).toLocaleDateString([], {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
            if (result.deliveryStatus === 'sent') {
                setInviteFeedback(`External academic invite email sent. Expires on ${expiry}.`);
            } else {
                setInviteFeedback(`Invite link created, but email delivery is ${result.deliveryStatus}. Expires on ${expiry}.`);
            }
            await refreshExternalInviteStatuses(caseRecord.id);
            const todoResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getToDo"])();
            setToDoItems(todoResponse.data);
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
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generatePrintPdf"])(caseRecord.id);
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
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["studentVet"])(caseRecord.id);
        setCaseRecord(response.case);
        await refreshCaseNotifications(caseRecord.id);
        setInfo('Form vetted by student and emailed to supervisor queue.');
    }
    async function handleSupervisorReview() {
        if (!caseRecord) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supervisorReview"])(caseRecord.id, decision, comments);
        setCaseRecord(response.case);
        await refreshCaseNotifications(caseRecord.id);
        setInfo('Supervisor action captured and notifications queued.');
    }
    async function handleDeptReview() {
        if (!caseRecord) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deptReview"])(caseRecord.id, decision, comments);
        setCaseRecord(response.case);
        await refreshCaseNotifications(caseRecord.id);
        setInfo('Dept FHD action captured.');
    }
    async function handleFacultyReview() {
        if (!caseRecord) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["facultyReview"])(caseRecord.id, decision, comments);
        setCaseRecord(response.case);
        await refreshCaseNotifications(caseRecord.id);
        setInfo('Faculty FHD action captured.');
    }
    async function handleChairpersonSign() {
        if (!caseRecord) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chairpersonSign"])(caseRecord.id, comments);
        setCaseRecord(response.case);
        await refreshCaseNotifications(caseRecord.id);
        setInfo('Chairperson signature recorded. Awaiting Dept FHD send-to-Faculty.');
    }
    async function handleDeptSendFaculty() {
        if (!caseRecord) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deptSendFaculty"])(caseRecord.id);
        setCaseRecord(response.case);
        await refreshCaseNotifications(caseRecord.id);
        setInfo('Dept FHD sent to Faculty FHD rep after Chairperson signature.');
    }
    async function loadModuleData(moduleKey) {
        setActiveModule(moduleKey);
        setError(null);
        setInfo(null);
        if (moduleKey === 'title_registration' && caseRecord) {
            await refreshExternalInviteStatuses(caseRecord.id);
        }
        if (moduleKey === 'mou' && caseRecord) {
            await refreshMou(caseRecord.id);
        }
        if (moduleKey === 'intention_to_submit' && caseRecord) {
            await refreshIntentionToSubmit(caseRecord.id);
        }
        if (moduleKey === 'appoint_examiners' && caseRecord) {
            await refreshAppointExaminers(caseRecord.id);
        }
        if (moduleKey === 'change_examiners' && caseRecord) {
            await refreshChangeExaminers(caseRecord.id);
        }
        if (moduleKey === 'examiner_summary_cv' && caseRecord) {
            await refreshExaminerSummaryCv(caseRecord.id);
        }
        if (moduleKey === 'appoint_arbiter' && caseRecord) {
            await refreshAppointArbiter(caseRecord.id);
        }
        if (moduleKey === 'supervisor_profiles' && caseRecord) {
            await refreshSupervisorProfiles(caseRecord.id);
        }
        if (moduleKey === 'pipeline') {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPipeline"])();
            setPipeline(response.data);
        }
        if (moduleKey === 'tasks') {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTasks"])();
            setTasks(response.data);
        }
        if (moduleKey === 'to_do') {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getToDo"])();
            setToDoItems(response.data);
        }
        if (moduleKey === 'people' || moduleKey === 'team') {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPeople"])();
            setPeople(response.data);
        }
        if (moduleKey === 'approvals' || moduleKey === 'system') {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNotifications"])(caseRecord?.id);
            setNotifications(response.data);
        }
    }
    async function triggerReminder() {
        if (!caseRecord) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendReminder"])(caseRecord.id);
        if (response.sent) {
            await refreshCaseNotifications(caseRecord.id);
            setInfo('Reminder queued to Faculty FHD rep and Dept FHD rep.');
        } else {
            setInfo(response.reason ?? 'No reminder sent.');
        }
    }
    async function updateProfileField(profileId, patch) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["patchSupervisorProfile"])(profileId, patch);
        if (caseRecord) {
            await refreshSupervisorProfiles(caseRecord.id);
        }
        setInfo('Supervisor profile updated.');
    }
    async function handleSubmitProfile(profileId) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["submitSupervisorProfile"])(profileId);
        if (caseRecord) {
            await refreshSupervisorProfiles(caseRecord.id);
        }
        setInfo('Supervisor profile marked completed.');
    }
    async function handleRequestProfiles() {
        if (!caseRecord) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestSupervisorProfiles"])(caseRecord.id);
        await refreshSupervisorProfiles(caseRecord.id);
        setInfo(`Requested completion for ${response.requested} supervisor profile form(s).`);
    }
    async function handleSupervisorProfileReminder() {
        if (!caseRecord) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendSupervisorProfilesReminder"])(caseRecord.id);
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
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uploadSupervisorProfileCv"])(profileId, {
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
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["patchMou"])(caseRecord.id, {
            [label]: value
        });
        setMouRecord(response.record);
        setMouData(response.formData);
        setInfo(`Saved MOU field: ${label}`);
    }
    async function handleCompleteMou() {
        if (!caseRecord) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["completeMou"])(caseRecord.id);
        setMouRecord(response.record);
        await runSasiCheck();
        setInfo('MOU completed. Thesis title formalities package is finalized.');
    }
    async function handlePrintMou() {
        if (!caseRecord) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["printMou"])(caseRecord.id);
        setMouPdfPath(response.pdfPath);
        setInfo('MOU PDF generated.');
    }
    async function saveItsField(label, value) {
        if (!caseRecord || !itsData) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["patchIntentionToSubmit"])(caseRecord.id, {
            [label]: value
        });
        setItsRecord(response.record);
        setItsData(response.formData);
        setInfo(`Saved ITS field: ${label}`);
    }
    async function submitItsModule() {
        if (!caseRecord) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["submitIntentionToSubmit"])(caseRecord.id);
        setItsRecord(response.record);
        await refreshIntentionToSubmit(caseRecord.id);
        setInfo('INTENTION_TO_SUBMIT submitted.');
    }
    async function saveAppointField(label, value) {
        if (!caseRecord || !appointData) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["patchAppointExaminers"])(caseRecord.id, {
            [label]: value
        });
        setAppointRecord(response.record);
        setAppointData(response.formData);
        setInfo(`Saved APPOINT_EXAMINERS field: ${label}`);
    }
    async function submitAppointModule() {
        if (!caseRecord) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["submitAppointExaminers"])(caseRecord.id);
        setAppointRecord(response.record);
        await refreshAppointExaminers(caseRecord.id);
        setInfo('APPOINT_EXAMINERS submitted.');
    }
    async function saveChangeField(label, value) {
        if (!caseRecord || !changeData) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["patchChangeExaminers"])(caseRecord.id, {
            [label]: value
        });
        setChangeRecord(response.record);
        setChangeData(response.formData);
        setInfo(`Saved CHANGE_EXAMINERS field: ${label}`);
    }
    async function submitChangeModule() {
        if (!caseRecord) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["submitChangeExaminers"])(caseRecord.id);
        setChangeRecord(response.record);
        await refreshChangeExaminers(caseRecord.id);
        setInfo('CHANGE_EXAMINERS submitted.');
    }
    async function saveSummaryField(label, value) {
        if (!caseRecord || !summaryData) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["patchExaminerSummaryCv"])(caseRecord.id, {
            [label]: value
        });
        setSummaryRecord(response.record);
        setSummaryData(response.formData);
        setInfo(`Saved EXAMINER_SUMMARY_CV field: ${label}`);
    }
    async function submitSummaryModule() {
        if (!caseRecord) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["submitExaminerSummaryCv"])(caseRecord.id);
        setSummaryRecord(response.record);
        await refreshExaminerSummaryCv(caseRecord.id);
        setInfo('EXAMINER_SUMMARY_CV submitted.');
    }
    async function saveArbiterField(label, value) {
        if (!caseRecord || !arbiterData) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["patchAppointArbiter"])(caseRecord.id, {
            [label]: value
        });
        setArbiterRecord(response.record);
        setArbiterData(response.formData);
        setInfo(`Saved APPOINT_ARBITER field: ${label}`);
    }
    async function submitArbiterModule() {
        if (!caseRecord) return;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["submitAppointArbiter"])(caseRecord.id);
        setArbiterRecord(response.record);
        await refreshAppointArbiter(caseRecord.id);
        setInfo('APPOINT_ARBITER submitted.');
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen p-4 md:p-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    className: "h-fit",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "mb-3 text-lg font-bold",
                            children: "FHD Dashboard"
                        }, void 0, false, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1018,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-1",
                            children: modules.map((moduleName)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$sidebar$2d$item$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SidebarItem"], {
                                    label: moduleName.replace('_', ' '),
                                    active: moduleName === activeModule,
                                    onClick: ()=>void loadModuleData(moduleName)
                                }, moduleName, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1021,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1019,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/client/app/page.tsx",
                    lineNumber: 1017,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-3 md:grid-cols-[1fr_auto] md:items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$search$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchInput"], {
                                            value: studentNumber,
                                            onChange: (event)=>setStudentNumber(event.target.value),
                                            placeholder: "Enter SASI student number (e.g. 1234567)"
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1029,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            disabled: loading,
                                            onClick: ()=>void runSasiCheck(),
                                            children: "Check SASI"
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1030,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1028,
                                    columnNumber: 13
                                }, this),
                                student && caseRecord && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 flex flex-wrap items-center gap-2 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                student.first_names,
                                                " ",
                                                student.last_name
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1036,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            label: statusLabel(caseRecord.case_status),
                                            status: statusTone(caseRecord.case_status)
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1037,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-muted",
                                            children: [
                                                "Completion ",
                                                caseRecord.completion_percent,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1038,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1035,
                                    columnNumber: 15
                                }, this),
                                caseRecord && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-2 h-2 overflow-hidden rounded-full bg-white/10",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-full rounded-full bg-accent transition-all",
                                        style: {
                                            width: `${caseRecord.completion_percent}%`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/page.tsx",
                                        lineNumber: 1043,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1042,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1027,
                            columnNumber: 11
                        }, this),
                        activeModule === 'title_registration' && formData && caseRecord && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$app$2f$title$2d$registration$2f$components$2f$TitleRegistrationModule$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TitleRegistrationModule"], {
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
                                sendExternalProfileLink: sendExternalProfileLink,
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
                                inviteStatusByRole: inviteStatusByRole
                            }, void 0, false, {
                                fileName: "[project]/client/app/page.tsx",
                                lineNumber: 1050,
                                columnNumber: 15
                            }, this)
                        }, void 0, false),
                        activeModule === 'to_do' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mb-3 text-base font-bold",
                                    children: "To Do Module"
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1096,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        toDoItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-xl border border-white/10 bg-surface2 p-3 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-semibold",
                                                        children: String(item.title)
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/page.tsx",
                                                        lineNumber: 1100,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-muted",
                                                        children: [
                                                            String(item.student_number),
                                                            " • ",
                                                            String(item.student_name)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/client/app/page.tsx",
                                                        lineNumber: 1101,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-muted",
                                                        children: String(item.detail)
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/page.tsx",
                                                        lineNumber: 1102,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, `${String(item.type)}-${String(item.case_id)}-${index}`, true, {
                                                fileName: "[project]/client/app/page.tsx",
                                                lineNumber: 1099,
                                                columnNumber: 19
                                            }, this)),
                                        toDoItems.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-muted",
                                            children: "No pending or in-progress actions."
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1105,
                                            columnNumber: 44
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1097,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1095,
                            columnNumber: 13
                        }, this),
                        activeModule === 'supervisor_profiles' && caseRecord && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mb-3 text-base font-bold",
                                    children: "Supervisor Profile Forms"
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1112,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-3 flex flex-wrap gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: ()=>void handleRequestProfiles(),
                                            children: "Request Completion"
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1114,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: ()=>void handleSupervisorProfileReminder(),
                                            children: "Send Reminder"
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1115,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1113,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: [
                                        supervisorProfiles.map((profile)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-xl border border-white/10 bg-surface2 p-3 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                        lineNumber: 1120,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mb-2 text-xs uppercase tracking-wide text-muted",
                                                        children: "Profile Form Fields"
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/page.tsx",
                                                        lineNumber: 1123,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-1 gap-2 md:grid-cols-6 lg:grid-cols-12",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "space-y-1 md:col-span-3 lg:col-span-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-muted",
                                                                        children: "Publications in last 4 years (3-5)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/client/app/page.tsx",
                                                                        lineNumber: 1126,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                                                        lineNumber: 1127,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/client/app/page.tsx",
                                                                lineNumber: 1125,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "space-y-1 md:col-span-3 lg:col-span-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-muted",
                                                                        children: "New to department?"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/client/app/page.tsx",
                                                                        lineNumber: 1138,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                        className: "w-full rounded-xl border border-white/10 bg-surface px-3 py-2",
                                                                        value: profile.new_to_department,
                                                                        onChange: (event)=>void updateProfileField(profile.id, {
                                                                                new_to_department: event.target.value
                                                                            }),
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "",
                                                                                disabled: true,
                                                                                children: "---"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/client/app/page.tsx",
                                                                                lineNumber: 1144,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "No",
                                                                                children: "No"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/client/app/page.tsx",
                                                                                lineNumber: 1145,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "Yes",
                                                                                children: "Yes"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/client/app/page.tsx",
                                                                                lineNumber: 1146,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/client/app/page.tsx",
                                                                        lineNumber: 1139,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/client/app/page.tsx",
                                                                lineNumber: 1137,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "space-y-1 md:col-span-3 lg:col-span-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-muted",
                                                                        children: "CV attached?"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/client/app/page.tsx",
                                                                        lineNumber: 1150,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                        className: "w-full rounded-xl border border-white/10 bg-surface px-3 py-2",
                                                                        value: profile.cv_attached,
                                                                        onChange: (event)=>void updateProfileField(profile.id, {
                                                                                cv_attached: event.target.value
                                                                            }),
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "",
                                                                                disabled: true,
                                                                                children: "---"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/client/app/page.tsx",
                                                                                lineNumber: 1156,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "No",
                                                                                children: "No"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/client/app/page.tsx",
                                                                                lineNumber: 1157,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "Yes",
                                                                                children: "Yes"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/client/app/page.tsx",
                                                                                lineNumber: 1158,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/client/app/page.tsx",
                                                                        lineNumber: 1151,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/client/app/page.tsx",
                                                                lineNumber: 1149,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "space-y-1 md:col-span-6 lg:col-span-8",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-muted",
                                                                        children: "CV upload (.pdf, .doc, .docx)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/client/app/page.tsx",
                                                                        lineNumber: 1162,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                                                        lineNumber: 1163,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    profile.cv_file_path && (()=>{
                                                                        const idx = profile.cv_file_path.indexOf('/generated_forms/');
                                                                        if (idx === -1) return null;
                                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                            className: "text-xs text-accent",
                                                                            href: `${apiOrigin}${profile.cv_file_path.slice(idx)}`,
                                                                            target: "_blank",
                                                                            rel: "noreferrer",
                                                                            children: "Open uploaded CV"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/client/app/page.tsx",
                                                                            lineNumber: 1179,
                                                                            columnNumber: 31
                                                                        }, this);
                                                                    })()
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/client/app/page.tsx",
                                                                lineNumber: 1161,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "space-y-1 md:col-span-3 lg:col-span-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-muted",
                                                                        children: "Contact email"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/client/app/page.tsx",
                                                                        lineNumber: 1192,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        className: "w-full rounded-xl border border-white/10 bg-surface px-3 py-2",
                                                                        value: profile.contact_email,
                                                                        onChange: (event)=>void updateProfileField(profile.id, {
                                                                                contact_email: event.target.value
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/client/app/page.tsx",
                                                                        lineNumber: 1193,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/client/app/page.tsx",
                                                                lineNumber: 1191,
                                                                columnNumber: 23
                                                            }, this),
                                                            profile.role === 'co_supervisor' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "space-y-1 md:col-span-6 lg:col-span-12",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-muted",
                                                                        children: "Point 5.2 Motivation (contribution, not expertise)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/client/app/page.tsx",
                                                                        lineNumber: 1197,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                        className: "min-h-20 w-full rounded-xl border border-white/10 bg-surface px-3 py-2",
                                                                        value: profile.contribution_motivation,
                                                                        onChange: (event)=>void updateProfileField(profile.id, {
                                                                                contribution_motivation: event.target.value
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/client/app/page.tsx",
                                                                        lineNumber: 1198,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/client/app/page.tsx",
                                                                lineNumber: 1196,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "space-y-1 md:col-span-6 lg:col-span-12",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-muted",
                                                                        children: "Latest publications (one per line, 3-5 max)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/client/app/page.tsx",
                                                                        lineNumber: 1202,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
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
                                                                        lineNumber: 1203,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/client/app/page.tsx",
                                                                lineNumber: 1201,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/client/app/page.tsx",
                                                        lineNumber: 1124,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            onClick: ()=>void handleSubmitProfile(profile.id),
                                                            disabled: profile.status === 'completed' || profile.cv_attached !== 'Yes' || !profile.cv_file_path,
                                                            children: "Mark Profile Completed"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client/app/page.tsx",
                                                            lineNumber: 1218,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/page.tsx",
                                                        lineNumber: 1217,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, profile.id, true, {
                                                fileName: "[project]/client/app/page.tsx",
                                                lineNumber: 1119,
                                                columnNumber: 19
                                            }, this)),
                                        supervisorProfiles.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-muted",
                                            children: "No supervisor profile forms activated yet. Enter supervisor details in ROTT first."
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1227,
                                            columnNumber: 53
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1117,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1111,
                            columnNumber: 13
                        }, this),
                        activeModule === 'mou' && caseRecord && mouData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mb-3 text-base font-bold",
                                    children: "MOU 2026 Module"
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1234,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-3 text-sm text-muted",
                                    children: "Prefilled from ROTT + Supervisor Profiles. Complete remaining sections, confirm signatures, then generate final PDF for Faculty HD records."
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1235,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                    lineNumber: 1236,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-2 text-xs uppercase tracking-wide text-muted",
                                    children: "MOU Fields"
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1237,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12",
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
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: `space-y-1 text-sm ${isLong ? 'md:col-span-6 lg:col-span-12' : 'md:col-span-3 lg:col-span-4'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted",
                                                        children: label
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/page.tsx",
                                                        lineNumber: 1311,
                                                        columnNumber: 23
                                                    }, this),
                                                    isLong ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                        className: "min-h-20 w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                        value: mouData[label],
                                                        disabled: isReadonly || mouRecord?.status === 'completed',
                                                        onChange: (event)=>void saveMouField(label, event.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/page.tsx",
                                                        lineNumber: 1313,
                                                        columnNumber: 25
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                        value: mouData[label],
                                                        disabled: isReadonly || mouRecord?.status === 'completed',
                                                        onChange: (event)=>void saveMouField(label, event.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/page.tsx",
                                                        lineNumber: 1315,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, label, true, {
                                                fileName: "[project]/client/app/page.tsx",
                                                lineNumber: 1310,
                                                columnNumber: 21
                                            }, this);
                                        }),
                                        [
                                            'Student Signature Confirmed',
                                            'Supervisor Signature Confirmed',
                                            'Co-supervisor Signature Confirmed',
                                            'Dept Chair/PG Coord Signature Confirmed'
                                        ].map((label)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "space-y-1 text-sm md:col-span-3 lg:col-span-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted",
                                                        children: label
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/app/page.tsx",
                                                        lineNumber: 1330,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                        value: mouData[label],
                                                        disabled: mouRecord?.status === 'completed',
                                                        onChange: (event)=>void saveMouField(label, event.target.value),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "",
                                                                disabled: true,
                                                                children: "---"
                                                            }, void 0, false, {
                                                                fileName: "[project]/client/app/page.tsx",
                                                                lineNumber: 1332,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "No",
                                                                children: "No"
                                                            }, void 0, false, {
                                                                fileName: "[project]/client/app/page.tsx",
                                                                lineNumber: 1333,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "Yes",
                                                                children: "Yes"
                                                            }, void 0, false, {
                                                                fileName: "[project]/client/app/page.tsx",
                                                                lineNumber: 1334,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/client/app/page.tsx",
                                                        lineNumber: 1331,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, label, true, {
                                                fileName: "[project]/client/app/page.tsx",
                                                lineNumber: 1329,
                                                columnNumber: 19
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1238,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 flex flex-wrap gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: ()=>void handlePrintMou(),
                                            children: "Generate MOU PDF"
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1341,
                                            columnNumber: 17
                                        }, this),
                                        mouPrintUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: mouPrintUrl,
                                            target: "_blank",
                                            rel: "noreferrer",
                                            className: "inline-flex items-center rounded-xl border border-accent/60 px-3 py-2 text-sm font-semibold text-accent",
                                            children: "Open MOU PDF"
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1343,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: ()=>void handleCompleteMou(),
                                            disabled: mouRecord?.status === 'completed',
                                            children: "Mark MOU Completed"
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1347,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1340,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1233,
                            columnNumber: 13
                        }, this),
                        activeModule === 'intention_to_submit' && caseRecord && itsData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mb-3 text-base font-bold",
                                    children: "INTENTION_TO_SUBMIT Module"
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1356,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-3 text-sm text-muted",
                                    children: "This module opens only after MOU submission and gates APPOINT_EXAMINERS."
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1357,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-3 text-sm text-muted",
                                    children: [
                                        "Status: ",
                                        itsRecord?.status ?? 'draft',
                                        " • Completion: ",
                                        itsRecord?.completion_percent ?? 0,
                                        "%"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1358,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12",
                                    children: [
                                        'Student Full Name',
                                        'Student Number',
                                        'Department',
                                        'Degree',
                                        'Supervisor',
                                        'Co-supervisor(s)',
                                        'Thesis title',
                                        'Year of first enrolment',
                                        'Submission type',
                                        'Intended submission date',
                                        'Student declaration',
                                        'Student signature date',
                                        'Supervisor approval status',
                                        'Co-supervisor approval status',
                                        'Department PG coordinator approval status',
                                        'Non-approval motivation'
                                    ].map((label)=>{
                                        const readonly = new Set([
                                            'Student Full Name',
                                            'Student Number',
                                            'Department',
                                            'Degree',
                                            'Supervisor',
                                            'Co-supervisor(s)',
                                            'Thesis title',
                                            'Year of first enrolment'
                                        ]).has(label);
                                        const isLong = [
                                            'Student declaration',
                                            'Non-approval motivation'
                                        ].includes(label);
                                        const isSelect = [
                                            'Submission type',
                                            'Supervisor approval status',
                                            'Co-supervisor approval status',
                                            'Department PG coordinator approval status'
                                        ].includes(label);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: `space-y-1 text-sm ${isLong ? 'md:col-span-6 lg:col-span-12' : 'md:col-span-3 lg:col-span-4'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-muted",
                                                    children: label
                                                }, void 0, false, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1395,
                                                    columnNumber: 23
                                                }, this),
                                                isSelect ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                    value: itsData[label],
                                                    disabled: readonly || itsRecord?.status === 'submitted',
                                                    onChange: (event)=>void saveItsField(label, event.target.value),
                                                    children: [
                                                        label === 'Submission type' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    children: "---"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client/app/page.tsx",
                                                                    lineNumber: 1400,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Mini thesis",
                                                                    children: "Mini thesis"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client/app/page.tsx",
                                                                    lineNumber: 1401,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Project",
                                                                    children: "Project"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client/app/page.tsx",
                                                                    lineNumber: 1402,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Full thesis",
                                                                    children: "Full thesis"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client/app/page.tsx",
                                                                    lineNumber: 1403,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true),
                                                        label === 'Supervisor approval status' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Pending",
                                                                    children: "Pending"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client/app/page.tsx",
                                                                    lineNumber: 1408,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Approved",
                                                                    children: "Approved"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client/app/page.tsx",
                                                                    lineNumber: 1409,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Not approved",
                                                                    children: "Not approved"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client/app/page.tsx",
                                                                    lineNumber: 1410,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true),
                                                        label === 'Co-supervisor approval status' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Not applicable",
                                                                    children: "Not applicable"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client/app/page.tsx",
                                                                    lineNumber: 1415,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Pending",
                                                                    children: "Pending"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client/app/page.tsx",
                                                                    lineNumber: 1416,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Approved",
                                                                    children: "Approved"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client/app/page.tsx",
                                                                    lineNumber: 1417,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Not approved",
                                                                    children: "Not approved"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client/app/page.tsx",
                                                                    lineNumber: 1418,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true),
                                                        label === 'Department PG coordinator approval status' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Pending",
                                                                    children: "Pending"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client/app/page.tsx",
                                                                    lineNumber: 1423,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Approved",
                                                                    children: "Approved"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client/app/page.tsx",
                                                                    lineNumber: 1424,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Not approved",
                                                                    children: "Not approved"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client/app/page.tsx",
                                                                    lineNumber: 1425,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1397,
                                                    columnNumber: 25
                                                }, this) : isLong ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    className: "min-h-20 w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                    value: itsData[label],
                                                    disabled: readonly || itsRecord?.status === 'submitted',
                                                    onChange: (event)=>void saveItsField(label, event.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1430,
                                                    columnNumber: 25
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                    value: itsData[label],
                                                    disabled: readonly || itsRecord?.status === 'submitted',
                                                    onChange: (event)=>void saveItsField(label, event.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1432,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, label, true, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1394,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1359,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: ()=>void submitItsModule(),
                                        disabled: itsRecord?.status === 'submitted',
                                        children: "Submit INTENTION_TO_SUBMIT"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/page.tsx",
                                        lineNumber: 1439,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1438,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1355,
                            columnNumber: 13
                        }, this),
                        activeModule === 'appoint_examiners' && caseRecord && appointData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mb-3 text-base font-bold",
                                    children: "APPOINT_EXAMINERS Module"
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1446,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-3 text-sm text-muted",
                                    children: "This module opens after INTENTION_TO_SUBMIT is submitted."
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1447,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-3 text-sm text-muted",
                                    children: [
                                        "Status: ",
                                        appointRecord?.status ?? 'draft',
                                        " • Completion: ",
                                        appointRecord?.completion_percent ?? 0,
                                        "%"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1448,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12",
                                    children: [
                                        'Student Full Name',
                                        'Student Number',
                                        'Faculty and Department',
                                        'Degree',
                                        'Supervisor',
                                        'Co-supervisor(s)',
                                        'Thesis title',
                                        'Year of first enrolment',
                                        'Title already registered',
                                        'Concurrent title-change declaration',
                                        'Examiner 1 Name',
                                        'Examiner 1 Type',
                                        'Examiner 1 Affiliation',
                                        'Examiner 1 Motivation',
                                        'Examiner 1 CV received',
                                        'Examiner 1 Conflict disclosure',
                                        'Examiner 2 Name',
                                        'Examiner 2 Type',
                                        'Examiner 2 Affiliation',
                                        'Examiner 2 Motivation',
                                        'Examiner 2 CV received',
                                        'Examiner 2 Conflict disclosure',
                                        'Examiner 3 Name',
                                        'Examiner 3 Type',
                                        'Examiner 3 Affiliation',
                                        'Examiner 3 Motivation',
                                        'Examiner 3 CV received',
                                        'Examiner 3 Conflict disclosure'
                                    ].map((label)=>{
                                        const readonly = new Set([
                                            'Student Full Name',
                                            'Student Number',
                                            'Faculty and Department',
                                            'Degree',
                                            'Supervisor',
                                            'Co-supervisor(s)',
                                            'Thesis title',
                                            'Year of first enrolment'
                                        ]).has(label);
                                        const isLong = label.includes('Motivation') || label.includes('Conflict disclosure') || label === 'Concurrent title-change declaration';
                                        const isSelect = label.includes('Type') || label.includes('CV received') || label === 'Title already registered';
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: `space-y-1 text-sm ${isLong ? 'md:col-span-6 lg:col-span-12' : 'md:col-span-3 lg:col-span-4'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-muted",
                                                    children: label
                                                }, void 0, false, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1496,
                                                    columnNumber: 23
                                                }, this),
                                                isSelect ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                    value: appointData[label],
                                                    disabled: readonly || appointRecord?.status === 'submitted',
                                                    onChange: (event)=>void saveAppointField(label, event.target.value),
                                                    children: [
                                                        label === 'Title already registered' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Yes",
                                                                    children: "Yes"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client/app/page.tsx",
                                                                    lineNumber: 1499,
                                                                    columnNumber: 71
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "No",
                                                                    children: "No"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client/app/page.tsx",
                                                                    lineNumber: 1499,
                                                                    columnNumber: 103
                                                                }, this)
                                                            ]
                                                        }, void 0, true),
                                                        label.includes('Type') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    children: "---"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client/app/page.tsx",
                                                                    lineNumber: 1500,
                                                                    columnNumber: 57
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Internal",
                                                                    children: "Internal"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client/app/page.tsx",
                                                                    lineNumber: 1500,
                                                                    columnNumber: 86
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "External",
                                                                    children: "External"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client/app/page.tsx",
                                                                    lineNumber: 1500,
                                                                    columnNumber: 128
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "International",
                                                                    children: "International"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client/app/page.tsx",
                                                                    lineNumber: 1500,
                                                                    columnNumber: 170
                                                                }, this)
                                                            ]
                                                        }, void 0, true),
                                                        label.includes('CV received') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "No",
                                                                    children: "No"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client/app/page.tsx",
                                                                    lineNumber: 1501,
                                                                    columnNumber: 64
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Yes",
                                                                    children: "Yes"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client/app/page.tsx",
                                                                    lineNumber: 1501,
                                                                    columnNumber: 94
                                                                }, this)
                                                            ]
                                                        }, void 0, true)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1498,
                                                    columnNumber: 25
                                                }, this) : isLong ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    className: "min-h-20 w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                    value: appointData[label],
                                                    disabled: readonly || appointRecord?.status === 'submitted',
                                                    onChange: (event)=>void saveAppointField(label, event.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1504,
                                                    columnNumber: 25
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                    value: appointData[label],
                                                    disabled: readonly || appointRecord?.status === 'submitted',
                                                    onChange: (event)=>void saveAppointField(label, event.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1506,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, label, true, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1495,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1449,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: ()=>void submitAppointModule(),
                                        disabled: appointRecord?.status === 'submitted',
                                        children: "Submit APPOINT_EXAMINERS"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/page.tsx",
                                        lineNumber: 1513,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1512,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1445,
                            columnNumber: 13
                        }, this),
                        activeModule === 'change_examiners' && caseRecord && changeData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mb-3 text-base font-bold",
                                    children: "CHANGE_EXAMINERS Module"
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1520,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-3 text-sm text-muted",
                                    children: "This module opens after APPOINT_EXAMINERS is submitted."
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1521,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-3 text-sm text-muted",
                                    children: [
                                        "Status: ",
                                        changeRecord?.status ?? 'draft',
                                        " • Completion: ",
                                        changeRecord?.completion_percent ?? 0,
                                        "%"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1522,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12",
                                    children: [
                                        'Student Full Name',
                                        'Student Number',
                                        'Thesis title',
                                        'Current examiner panel summary',
                                        'Change motivation',
                                        'Replacement Examiner 1 Name',
                                        'Replacement Examiner 1 Type',
                                        'Replacement Examiner 1 Affiliation',
                                        'Replacement Examiner 1 Motivation',
                                        'Replacement Examiner 2 Name',
                                        'Replacement Examiner 2 Type',
                                        'Replacement Examiner 2 Affiliation',
                                        'Replacement Examiner 2 Motivation'
                                    ].map((label)=>{
                                        const readonly = new Set([
                                            'Student Full Name',
                                            'Student Number',
                                            'Thesis title',
                                            'Current examiner panel summary'
                                        ]).has(label);
                                        const isLong = label.includes('motivation') || label.includes('summary');
                                        const isSelect = label.includes('Type');
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: `space-y-1 text-sm ${isLong ? 'md:col-span-6 lg:col-span-12' : 'md:col-span-3 lg:col-span-4'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-muted",
                                                    children: label
                                                }, void 0, false, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1551,
                                                    columnNumber: 23
                                                }, this),
                                                isSelect ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                    value: changeData[label],
                                                    disabled: readonly || changeRecord?.status === 'submitted',
                                                    onChange: (event)=>void saveChangeField(label, event.target.value),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "---"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client/app/page.tsx",
                                                            lineNumber: 1554,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Internal",
                                                            children: "Internal"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client/app/page.tsx",
                                                            lineNumber: 1555,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "External",
                                                            children: "External"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client/app/page.tsx",
                                                            lineNumber: 1556,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "International",
                                                            children: "International"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client/app/page.tsx",
                                                            lineNumber: 1557,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1553,
                                                    columnNumber: 25
                                                }, this) : isLong ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    className: "min-h-20 w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                    value: changeData[label],
                                                    disabled: readonly || changeRecord?.status === 'submitted',
                                                    onChange: (event)=>void saveChangeField(label, event.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1560,
                                                    columnNumber: 25
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                    value: changeData[label],
                                                    disabled: readonly || changeRecord?.status === 'submitted',
                                                    onChange: (event)=>void saveChangeField(label, event.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1562,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, label, true, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1550,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1523,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: ()=>void submitChangeModule(),
                                        disabled: changeRecord?.status === 'submitted',
                                        children: "Submit CHANGE_EXAMINERS"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/page.tsx",
                                        lineNumber: 1569,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1568,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1519,
                            columnNumber: 13
                        }, this),
                        activeModule === 'examiner_summary_cv' && caseRecord && summaryData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mb-3 text-base font-bold",
                                    children: "EXAMINER_SUMMARY_CV Module"
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1576,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-3 text-sm text-muted",
                                    children: "This module opens after APPOINT_EXAMINERS or CHANGE_EXAMINERS is submitted."
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1577,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-3 text-sm text-muted",
                                    children: [
                                        "Status: ",
                                        summaryRecord?.status ?? 'draft',
                                        " • Completion: ",
                                        summaryRecord?.completion_percent ?? 0,
                                        "%"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1578,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12",
                                    children: [
                                        'Student Full Name',
                                        'Student Number',
                                        'Thesis title',
                                        'Examiner panel summary',
                                        'Summary CV packet status',
                                        'Compiled by',
                                        'Compilation date',
                                        'Notes'
                                    ].map((label)=>{
                                        const readonly = new Set([
                                            'Student Full Name',
                                            'Student Number',
                                            'Thesis title',
                                            'Examiner panel summary'
                                        ]).has(label);
                                        const isLong = label === 'Examiner panel summary' || label === 'Notes';
                                        const isSelect = label === 'Summary CV packet status';
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: `space-y-1 text-sm ${isLong ? 'md:col-span-6 lg:col-span-12' : 'md:col-span-3 lg:col-span-4'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-muted",
                                                    children: label
                                                }, void 0, false, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1602,
                                                    columnNumber: 23
                                                }, this),
                                                isSelect ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                    value: summaryData[label],
                                                    disabled: readonly || summaryRecord?.status === 'submitted',
                                                    onChange: (event)=>void saveSummaryField(label, event.target.value),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Pending",
                                                            children: "Pending"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client/app/page.tsx",
                                                            lineNumber: 1605,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Complete",
                                                            children: "Complete"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client/app/page.tsx",
                                                            lineNumber: 1606,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1604,
                                                    columnNumber: 25
                                                }, this) : isLong ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    className: "min-h-20 w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                    value: summaryData[label],
                                                    disabled: readonly || summaryRecord?.status === 'submitted',
                                                    onChange: (event)=>void saveSummaryField(label, event.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1609,
                                                    columnNumber: 25
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                    value: summaryData[label],
                                                    disabled: readonly || summaryRecord?.status === 'submitted',
                                                    onChange: (event)=>void saveSummaryField(label, event.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1611,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, label, true, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1601,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1579,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: ()=>void submitSummaryModule(),
                                        disabled: summaryRecord?.status === 'submitted',
                                        children: "Submit EXAMINER_SUMMARY_CV"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/page.tsx",
                                        lineNumber: 1618,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1617,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1575,
                            columnNumber: 13
                        }, this),
                        activeModule === 'appoint_arbiter' && caseRecord && arbiterData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mb-3 text-base font-bold",
                                    children: "APPOINT_ARBITER Module"
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1625,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-3 text-sm text-muted",
                                    children: "This module opens after APPOINT_EXAMINERS or CHANGE_EXAMINERS is submitted."
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1626,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-3 text-sm text-muted",
                                    children: [
                                        "Status: ",
                                        arbiterRecord?.status ?? 'draft',
                                        " • Completion: ",
                                        arbiterRecord?.completion_percent ?? 0,
                                        "%"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1627,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12",
                                    children: [
                                        'Student Full Name',
                                        'Student Number',
                                        'Thesis title',
                                        'Examiner panel summary',
                                        'Arbiter Name',
                                        'Arbiter Type',
                                        'Arbiter Affiliation',
                                        'Arbiter Motivation',
                                        'Arbiter CV received',
                                        'Arbiter conflict disclosure'
                                    ].map((label)=>{
                                        const readonly = new Set([
                                            'Student Full Name',
                                            'Student Number',
                                            'Thesis title',
                                            'Examiner panel summary'
                                        ]).has(label);
                                        const isLong = label === 'Arbiter Motivation' || label === 'Arbiter conflict disclosure' || label === 'Examiner panel summary';
                                        const isSelect = label === 'Arbiter Type' || label === 'Arbiter CV received';
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: `space-y-1 text-sm ${isLong ? 'md:col-span-6 lg:col-span-12' : 'md:col-span-3 lg:col-span-4'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-muted",
                                                    children: label
                                                }, void 0, false, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1653,
                                                    columnNumber: 23
                                                }, this),
                                                isSelect ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                    value: arbiterData[label],
                                                    disabled: readonly || arbiterRecord?.status === 'submitted',
                                                    onChange: (event)=>void saveArbiterField(label, event.target.value),
                                                    children: [
                                                        label === 'Arbiter Type' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    children: "---"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client/app/page.tsx",
                                                                    lineNumber: 1656,
                                                                    columnNumber: 59
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Internal",
                                                                    children: "Internal"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client/app/page.tsx",
                                                                    lineNumber: 1656,
                                                                    columnNumber: 88
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "External",
                                                                    children: "External"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client/app/page.tsx",
                                                                    lineNumber: 1656,
                                                                    columnNumber: 130
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "International",
                                                                    children: "International"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client/app/page.tsx",
                                                                    lineNumber: 1656,
                                                                    columnNumber: 172
                                                                }, this)
                                                            ]
                                                        }, void 0, true),
                                                        label === 'Arbiter CV received' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "No",
                                                                    children: "No"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client/app/page.tsx",
                                                                    lineNumber: 1657,
                                                                    columnNumber: 66
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Yes",
                                                                    children: "Yes"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client/app/page.tsx",
                                                                    lineNumber: 1657,
                                                                    columnNumber: 96
                                                                }, this)
                                                            ]
                                                        }, void 0, true)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1655,
                                                    columnNumber: 25
                                                }, this) : isLong ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    className: "min-h-20 w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                    value: arbiterData[label],
                                                    disabled: readonly || arbiterRecord?.status === 'submitted',
                                                    onChange: (event)=>void saveArbiterField(label, event.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1660,
                                                    columnNumber: 25
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: "w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2",
                                                    value: arbiterData[label],
                                                    disabled: readonly || arbiterRecord?.status === 'submitted',
                                                    onChange: (event)=>void saveArbiterField(label, event.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1662,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, label, true, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1652,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1628,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: ()=>void submitArbiterModule(),
                                        disabled: arbiterRecord?.status === 'submitted',
                                        children: "Submit APPOINT_ARBITER"
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/page.tsx",
                                        lineNumber: 1669,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1668,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1624,
                            columnNumber: 13
                        }, this),
                        activeModule === 'pipeline' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mb-3 text-base font-bold",
                                    children: "Pipeline View"
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1676,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: pipeline.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-xl border border-white/10 bg-surface2 p-3 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                    lineNumber: 1680,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                    lineNumber: 1681,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                    lineNumber: 1682,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-muted",
                                                    children: [
                                                        "MOU: ",
                                                        String(item.mou_status ?? 'pending'),
                                                        " • Title formalities finalised: ",
                                                        String(Boolean(item.title_formalities_finalised))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1683,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, String(item.id), true, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1679,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1677,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1675,
                            columnNumber: 13
                        }, this),
                        activeModule === 'tasks' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mb-3 text-base font-bold",
                                    children: "Tasks Module"
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1692,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: tasks.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-xl border border-white/10 bg-surface2 p-3 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-semibold",
                                                    children: [
                                                        String(item.module_name),
                                                        " • ",
                                                        String(item.student_number)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1696,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-muted",
                                                    children: [
                                                        String(item.status),
                                                        " • ",
                                                        String(item.summary)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1697,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, String(item.id), true, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1695,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1693,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1691,
                            columnNumber: 13
                        }, this),
                        (activeModule === 'people' || activeModule === 'team') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mb-3 flex items-center gap-2 text-base font-bold",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1706,
                                            columnNumber: 80
                                        }, this),
                                        " People / Team"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1706,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: people.map((person)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-xl border border-white/10 bg-surface2 p-3 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-semibold",
                                                    children: String(person.full_name)
                                                }, void 0, false, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1710,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-muted",
                                                    children: [
                                                        String(person.role),
                                                        " • ",
                                                        String(person.email)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1711,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, String(person.id), true, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1709,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1707,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1705,
                            columnNumber: 13
                        }, this),
                        (activeModule === 'approvals' || activeModule === 'system') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mb-3 flex items-center gap-2 text-base font-bold",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1720,
                                            columnNumber: 80
                                        }, this),
                                        " Notification Queue"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1720,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: notifications.map((note)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-xl border border-white/10 bg-surface2 p-3 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-semibold",
                                                    children: String(note.subject)
                                                }, void 0, false, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1724,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-muted",
                                                    children: [
                                                        "To: ",
                                                        String(note.email_to),
                                                        " • Status: ",
                                                        String(note.status)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client/app/page.tsx",
                                                    lineNumber: 1725,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, String(note.id), true, {
                                            fileName: "[project]/client/app/page.tsx",
                                            lineNumber: 1723,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1721,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1719,
                            columnNumber: 13
                        }, this),
                        [
                            'radar',
                            'timelines',
                            'calendar',
                            'kanban',
                            'policy'
                        ].includes(activeModule) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-base font-bold capitalize",
                                    children: [
                                        activeModule,
                                        " module"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1734,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-sm text-muted",
                                    children: "Entries are created and updated from title registration state changes via backend module mappings."
                                }, void 0, false, {
                                    fileName: "[project]/client/app/page.tsx",
                                    lineNumber: 1735,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1733,
                            columnNumber: 13
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            className: "border-err/40",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "flex items-center gap-2 text-sm text-err",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/page.tsx",
                                        lineNumber: 1741,
                                        columnNumber: 71
                                    }, this),
                                    " ",
                                    error
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/page.tsx",
                                lineNumber: 1741,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1740,
                            columnNumber: 13
                        }, this),
                        info && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            className: "border-ok/40",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "flex items-center gap-2 text-sm text-ok",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/client/app/page.tsx",
                                        lineNumber: 1747,
                                        columnNumber: 70
                                    }, this),
                                    " ",
                                    info
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/app/page.tsx",
                                lineNumber: 1747,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/client/app/page.tsx",
                            lineNumber: 1746,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/client/app/page.tsx",
                    lineNumber: 1026,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/client/app/page.tsx",
            lineNumber: 1016,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client/app/page.tsx",
        lineNumber: 1015,
        columnNumber: 5
    }, this);
}
_s(Page, "vm3gGyahL4MxWs8aTudh+LzQgCw=");
_c = Page;
var _c;
__turbopack_context__.k.register(_c, "Page");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=client_25e04c9a._.js.map