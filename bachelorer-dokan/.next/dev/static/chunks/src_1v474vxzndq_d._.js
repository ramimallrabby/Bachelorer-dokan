(()=>{"use strict";(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/escrow/EscrowDialog.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EscrowDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthProvider$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/auth/AuthProvider.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useWallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Dialog$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Dialog.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Icons.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Form$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Form.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Media$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Media.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$orders$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/orders.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/errors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/format.js [app-client] (ecmascript)");
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
;
;
;
;
const STEPS = [
    'আপনি টাকা এসক্রো-তে জমা দেন। বিক্রেতা জানেন টাকা নিরাপদে আছে।',
    'বিক্রেতার সাথে চ্যাটে সময় ঠিক করে পণ্য বুঝে নিন।',
    'পণ্য ঠিক থাকলে “পণ্য পেয়েছি” কনফার্ম করুন। তখনই বিক্রেতা টাকা পান।'
];
function EscrowDialog({ open, onClose, listing, sellerName }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthProvider$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { balance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(user?.id);
    const [config, setConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [note, setNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EscrowDialog.useEffect": ()=>{
            if (open) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$orders$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEscrowConfig"])().then(setConfig);
        }
    }["EscrowDialog.useEffect"], [
        open
    ]);
    const fee = config ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$orders$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcFee"])(listing.price, config.feeBps) : 0;
    const total = Number(listing.price) + fee;
    const short = balance !== null && balance < total;
    async function pay() {
        setBusy(true);
        let orderId;
        try {
            orderId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$orders$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createOrder"])(listing.id, note);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$orders$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["payForOrder"])(orderId);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('টাকা এসক্রো-তে জমা হয়েছে।');
        } catch (err) {
            const message = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["friendlyError"])(err);
            if (message) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(message);
            if (!orderId) return setBusy(false) // nothing was created: stay here so they can retry
            ;
        // An order exists but payment failed: the order page has a "pay now" retry.
        }
        router.push(`/orders/${orderId}`);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Dialog$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        open: open,
        onClose: busy ? ()=>{} : onClose,
        title: "Escrow দিয়ে কিনুন",
        width: "max-w-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4 rounded-2xl bg-teal-900/[0.05] p-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Media$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SmartImage"], {
                        src: listing.image_url,
                        alt: "",
                        className: "h-16 w-20 rounded-xl"
                    }, void 0, false, {
                        fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "line-clamp-1 font-semibold text-teal-950",
                                children: listing.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-500",
                                children: [
                                    "বিক্রেতা: ",
                                    sellerName
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                className: "mt-5 space-y-3",
                children: STEPS.map((text, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-900 text-xs font-bold text-white",
                                children: i + 1
                            }, void 0, false, {
                                fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                                lineNumber: 68,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[15px] leading-relaxed text-slate-600",
                                children: text
                            }, void 0, false, {
                                fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                                lineNumber: 69,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "escrow-note",
                        className: "mb-1.5 block text-sm font-semibold text-teal-950",
                        children: [
                            "মিটআপের জায়গা বা সময় ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-normal text-slate-400",
                                children: "(ঐচ্ছিক)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                                lineNumber: 76,
                                columnNumber: 34
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Form$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                        id: "escrow-note",
                        value: note,
                        onChange: (e)=>setNote(e.target.value),
                        maxLength: 300,
                        className: "min-h-20",
                        placeholder: "যেমন: কাল বিকেল ৪টায়, মেইন গেটের সামনে"
                    }, void 0, false, {
                        fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                className: "mt-6 space-y-2 rounded-2xl bg-white p-4 text-[15px] ring-1 ring-teal-900/10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-slate-600",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                children: "প্রোডাক্টের দাম"
                            }, void 0, false, {
                                fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(listing.price)
                            }, void 0, false, {
                                fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    fee > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-slate-600",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                children: "Escrow ফি"
                            }, void 0, false, {
                                fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(fee)
                            }, void 0, false, {
                                fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                                lineNumber: 89,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                        lineNumber: 87,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between border-t border-teal-900/10 pt-2 text-base font-bold text-teal-950",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                children: "মোট"
                            }, void 0, false, {
                                fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                className: "font-display text-lg",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(total)
                            }, void 0, false, {
                                fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mt-4 flex items-center justify-between gap-3 rounded-2xl p-4 ring-1 ${short ? 'bg-rose-50 ring-rose-200' : 'bg-teal-900/[0.05] ring-teal-900/10'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `flex h-10 w-10 items-center justify-center rounded-xl ${short ? 'bg-rose-100 text-rose-700' : 'bg-white text-teal-800'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    name: "wallet",
                                    className: "h-5 w-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                                    lineNumber: 101,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[13px] text-slate-500",
                                        children: "ওয়ালেট ব্যালেন্স"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                                        lineNumber: 104,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-display text-lg font-extrabold text-teal-950",
                                        children: balance === null ? '…' : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(balance)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                                        lineNumber: 105,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    short && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/wallet",
                        className: "rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500",
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(total - balance),
                            " যোগ করুন"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                        lineNumber: 109,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            config?.mode === 'test' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3 flex gap-2 rounded-xl bg-amber-50 p-3 text-sm leading-relaxed text-amber-900 ring-1 ring-amber-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        name: "alert",
                        className: "mt-0.5 h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this),
                    "টেস্ট মোড: ওয়ালেটে থাকা টাকা খেলার টাকা। আসল টাকা লেনদেন হচ্ছে না।"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                lineNumber: 116,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "soft",
                        size: "lg",
                        onClick: onClose,
                        disabled: busy,
                        children: "বাতিল"
                    }, void 0, false, {
                        fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "primary",
                        size: "lg",
                        loading: busy,
                        disabled: !config || short || balance === null,
                        onClick: pay,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                name: "lock",
                                className: "h-5 w-5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this),
                            "ওয়ালেট থেকে ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(total),
                            " জমা দিন"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
                lineNumber: 122,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/escrow/EscrowDialog.jsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_s(EscrowDialog, "xsX2ATGE7cJuPmPosyxDYTNtEJM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthProvider$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = EscrowDialog;
var _c;
__turbopack_context__.k.register(_c, "EscrowDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/product/ProductActions.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductActions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthProvider$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/auth/AuthProvider.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Dialog$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Dialog.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Icons.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$escrow$2f$EscrowDialog$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/escrow/EscrowDialog.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$chat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/chat.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$listings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/listings.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/errors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/format.js [app-client] (ecmascript)");
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
;
;
function ProductActions({ listing, sellerName }) {
    _s();
    const { user, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthProvider$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [escrowOpen, setEscrowOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [confirmDelete, setConfirmDelete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null) // 'chat' | 'sold' | 'delete'
    ;
    const isOwner = !!user && listing.seller_id === user.id;
    const noSeller = !listing.seller_id;
    const unavailable = listing.status !== 'active';
    const unavailableLabel = {
        sold: 'বিক্রি হয়ে গেছে',
        reserved: 'রিজার্ভড',
        hidden: 'পাওয়া যাচ্ছে না'
    }[listing.status];
    const requireLogin = ()=>router.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginHref"])(pathname));
    async function chat() {
        if (!user) return requireLogin();
        setBusy('chat');
        try {
            const id = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$chat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startConversation"])(listing.id);
            router.push(`/messages/${id}`);
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["friendlyError"])(err));
            setBusy(null);
        }
    }
    async function sold() {
        setBusy('sold');
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$listings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["markListingSold"])(listing.id);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('প্রোডাক্টটি বিক্রি হয়েছে হিসেবে চিহ্নিত করা হয়েছে।');
            router.refresh();
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["friendlyError"])(err));
        } finally{
            setBusy(null);
        }
    }
    async function remove() {
        setBusy('delete');
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$listings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteListing"])(listing.id);
            const path = listing.image_url?.split('/product-images/')[1];
            if (path?.startsWith(`${user.id}/`)) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$listings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeListingImage"])(path); // best effort cleanup
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('প্রোডাক্ট ডিলিট করা হয়েছে।');
            router.replace('/');
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["friendlyError"])(err));
            setBusy(null);
            setConfirmDelete(false);
        }
    }
    // ---------- Seller's own listing ----------
    if (isOwner) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "mt-6 rounded-2xl bg-white p-5 ring-1 ring-teal-900/[0.07]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "font-semibold text-teal-950",
                    children: "এটি আপনার প্রোডাক্ট"
                }, void 0, false, {
                    fileName: "[project]/src/components/product/ProductActions.jsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-0.5 text-sm text-slate-500",
                    children: "ক্রেতাদের মেসেজ পাবেন মেসেজ ট্যাবে।"
                }, void 0, false, {
                    fileName: "[project]/src/components/product/ProductActions.jsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4 flex flex-wrap gap-3",
                    children: [
                        (listing.status === 'active' || listing.status === 'sold') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: `/product/${listing.id}/edit`,
                            variant: "dark",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    name: "edit",
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/product/ProductActions.jsx",
                                    lineNumber: 80,
                                    columnNumber: 15
                                }, this),
                                " এডিট করুন"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/product/ProductActions.jsx",
                            lineNumber: 79,
                            columnNumber: 13
                        }, this),
                        listing.status === 'sold' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            variant: "soft",
                            loading: busy === 'reopen',
                            onClick: async ()=>{
                                setBusy('reopen');
                                try {
                                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$listings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reopenListing"])(listing.id);
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('প্রোডাক্ট আবার চালু হয়েছে।');
                                    router.refresh();
                                } catch (err) {
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["friendlyError"])(err));
                                } finally{
                                    setBusy(null);
                                }
                            },
                            children: "আবার চালু করুন"
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/ProductActions.jsx",
                            lineNumber: 84,
                            columnNumber: 13
                        }, this),
                        listing.status === 'hidden' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-rose-700",
                            children: "এই প্রোডাক্ট পর্যালোচনার জন্য লুকানো আছে। আমাদের টিম দেখছে।"
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/ProductActions.jsx",
                            lineNumber: 103,
                            columnNumber: 43
                        }, this),
                        listing.status === 'active' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            variant: "soft",
                            onClick: sold,
                            loading: busy === 'sold',
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    name: "check",
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/product/ProductActions.jsx",
                                    lineNumber: 106,
                                    columnNumber: 15
                                }, this),
                                " বিক্রি হয়ে গেছে"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/product/ProductActions.jsx",
                            lineNumber: 105,
                            columnNumber: 13
                        }, this),
                        listing.status !== 'reserved' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            variant: "outline",
                            className: "text-rose-700",
                            onClick: ()=>setConfirmDelete(true),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    name: "trash",
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/product/ProductActions.jsx",
                                    lineNumber: 111,
                                    columnNumber: 15
                                }, this),
                                " ডিলিট করুন"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/product/ProductActions.jsx",
                            lineNumber: 110,
                            columnNumber: 13
                        }, this),
                        listing.status === 'reserved' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-amber-800",
                            children: "চালু এসক্রো অর্ডার আছে। অর্ডার পেজ থেকে এগিয়ে যান।"
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/ProductActions.jsx",
                            lineNumber: 114,
                            columnNumber: 45
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/product/ProductActions.jsx",
                    lineNumber: 77,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Dialog$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    open: confirmDelete,
                    onClose: ()=>setConfirmDelete(false),
                    title: "প্রোডাক্টটি ডিলিট করবেন?",
                    width: "max-w-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-600",
                            children: "এই কাজ আর ফেরানো যাবে না।"
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/ProductActions.jsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 flex justify-end gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    variant: "soft",
                                    onClick: ()=>setConfirmDelete(false),
                                    children: "না, থাক"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/product/ProductActions.jsx",
                                    lineNumber: 120,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    variant: "danger",
                                    loading: busy === 'delete',
                                    onClick: remove,
                                    children: "হ্যাঁ, ডিলিট করুন"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/product/ProductActions.jsx",
                                    lineNumber: 123,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/product/ProductActions.jsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/product/ProductActions.jsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/product/ProductActions.jsx",
            lineNumber: 74,
            columnNumber: 7
        }, this);
    }
    // ---------- Buyer view (sticky bar on phones, inline on desktop) ----------
    const disabledAll = loading || noSeller;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-x-0 bottom-0 z-40 border-t border-teal-900/10 bg-white/80 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl md:static md:z-auto md:mt-6 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none",
                children: [
                    noSeller && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-2 text-sm text-slate-500",
                        children: "এই প্রোডাক্টের বিক্রেতার তথ্য নেই, তাই চ্যাট বা কেনা যাবে না।"
                    }, void 0, false, {
                        fileName: "[project]/src/components/product/ProductActions.jsx",
                        lineNumber: 137,
                        columnNumber: 22
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto flex max-w-6xl items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-display text-xl font-extrabold text-teal-900 md:hidden",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(listing.price)
                            }, void 0, false, {
                                fileName: "[project]/src/components/product/ProductActions.jsx",
                                lineNumber: 139,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "primary",
                                size: "lg",
                                className: "flex-1",
                                disabled: disabledAll || unavailable,
                                onClick: ()=>user ? setEscrowOpen(true) : requireLogin(),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        name: "shield",
                                        className: "h-5 w-5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/product/ProductActions.jsx",
                                        lineNumber: 147,
                                        columnNumber: 13
                                    }, this),
                                    unavailable ? unavailableLabel : 'Buy via Escrow'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/product/ProductActions.jsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "outline",
                                size: "lg",
                                className: "flex-1",
                                disabled: disabledAll,
                                loading: busy === 'chat',
                                onClick: chat,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        name: "chat",
                                        className: "h-5 w-5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/product/ProductActions.jsx",
                                        lineNumber: 151,
                                        columnNumber: 13
                                    }, this),
                                    " Chat with Seller"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/product/ProductActions.jsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/product/ProductActions.jsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/product/ProductActions.jsx",
                lineNumber: 136,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$escrow$2f$EscrowDialog$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: escrowOpen,
                onClose: ()=>setEscrowOpen(false),
                listing: listing,
                sellerName: sellerName
            }, void 0, false, {
                fileName: "[project]/src/components/product/ProductActions.jsx",
                lineNumber: 156,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/product/ProductActions.jsx",
        lineNumber: 135,
        columnNumber: 5
    }, this);
}
_s(ProductActions, "HRm56ev0TXrmOgcAOFK0wvuu6Mo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthProvider$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = ProductActions;
var _c;
__turbopack_context__.k.register(_c, "ProductActions");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/product/ViewCounter.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ViewCounter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$listings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/listings.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function ViewCounter({ id }) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ViewCounter.useEffect": ()=>{
            try {
                const key = `viewed:${id}`;
                if (sessionStorage.getItem(key)) return;
                sessionStorage.setItem(key, '1');
            } catch  {}
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$listings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bumpViews"])(id).then({
                "ViewCounter.useEffect": ()=>{}
            }["ViewCounter.useEffect"], {
                "ViewCounter.useEffect": ()=>{}
            }["ViewCounter.useEffect"]);
        }
    }["ViewCounter.useEffect"], [
        id
    ]);
    return null;
}
_s(ViewCounter, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = ViewCounter;
var _c;
__turbopack_context__.k.register(_c, "ViewCounter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/report/ReportButton.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ReportButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthProvider$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/auth/AuthProvider.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Dialog$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Dialog.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Icons.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Form$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Form.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$reports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/reports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/errors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/format.js [app-client] (ecmascript)");
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
;
;
function ReportButton({ type, targetId, ownerId, label = 'রিপোর্ট করুন', className = '' }) {
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthProvider$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [reason, setReason] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [details, setDetails] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [done, setDone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    if (user && ownerId && user.id === ownerId) return null // you can't report yourself
    ;
    async function send() {
        setBusy(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$reports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["submitReport"])({
                type,
                targetId,
                reason,
                details
            });
            setDone(true);
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["friendlyError"])(e));
        } finally{
            setBusy(false);
        }
    }
    const close = ()=>{
        setOpen(false);
        setTimeout(()=>{
            setDone(false);
            setReason('');
            setDetails('');
        }, 250);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>user ? setOpen(true) : router.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginHref"])(pathname)),
                className: `inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-rose-600 ${className}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        name: "flag",
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/report/ReportButton.jsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    " ",
                    label
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/report/ReportButton.jsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Dialog$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: open,
                onClose: close,
                title: done ? 'ধন্যবাদ' : type === 'user' ? 'ব্যবহারকারীকে রিপোর্ট' : 'প্রোডাক্ট রিপোর্ট করুন',
                width: "max-w-md",
                variant: "sheet",
                children: done ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "py-4 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                name: "check",
                                className: "h-7 w-7"
                            }, void 0, false, {
                                fileName: "[project]/src/components/report/ReportButton.jsx",
                                lineNumber: 62,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/report/ReportButton.jsx",
                            lineNumber: 61,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-semibold text-teal-950",
                            children: "রিপোর্ট জমা হয়েছে"
                        }, void 0, false, {
                            fileName: "[project]/src/components/report/ReportButton.jsx",
                            lineNumber: 64,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1.5 text-[15px] leading-relaxed text-slate-500",
                            children: "আমাদের টিমকে এখনই জানানো হয়েছে। আপনার পরিচয় অন্য কেউ জানবে না।"
                        }, void 0, false, {
                            fileName: "[project]/src/components/report/ReportButton.jsx",
                            lineNumber: 65,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            variant: "dark",
                            className: "mt-6",
                            onClick: close,
                            children: "ঠিক আছে"
                        }, void 0, false, {
                            fileName: "[project]/src/components/report/ReportButton.jsx",
                            lineNumber: 66,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/report/ReportButton.jsx",
                    lineNumber: 60,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                                    className: "mb-2 text-sm font-semibold text-teal-950",
                                    children: "সমস্যাটি কী?"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/report/ReportButton.jsx",
                                    lineNumber: 71,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1.5",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REPORT_REASONS"].map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: `flex cursor-pointer items-center gap-3 rounded-xl px-3.5 py-3 text-[15px] ring-1 ring-inset transition ${reason === r.value ? 'bg-rose-50 text-rose-900 ring-rose-300' : 'bg-white text-slate-700 ring-teal-900/10 hover:bg-slate-50'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "radio",
                                                    name: "reason",
                                                    value: r.value,
                                                    checked: reason === r.value,
                                                    onChange: ()=>setReason(r.value),
                                                    className: "accent-rose-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/report/ReportButton.jsx",
                                                    lineNumber: 80,
                                                    columnNumber: 21
                                                }, this),
                                                r.label
                                            ]
                                        }, r.value, true, {
                                            fileName: "[project]/src/components/report/ReportButton.jsx",
                                            lineNumber: 74,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/report/ReportButton.jsx",
                                    lineNumber: 72,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/report/ReportButton.jsx",
                            lineNumber: 70,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "report-details",
                                    className: "mb-1.5 block text-sm font-semibold text-teal-950",
                                    children: [
                                        "বিস্তারিত ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-normal text-slate-400",
                                            children: "(ঐচ্ছিক)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/report/ReportButton.jsx",
                                            lineNumber: 88,
                                            columnNumber: 27
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/report/ReportButton.jsx",
                                    lineNumber: 87,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Form$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                                    id: "report-details",
                                    value: details,
                                    onChange: (e)=>setDetails(e.target.value),
                                    maxLength: 800,
                                    className: "min-h-24",
                                    placeholder: "কী ঘটেছে সংক্ষেপে লিখুন…"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/report/ReportButton.jsx",
                                    lineNumber: 90,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/report/ReportButton.jsx",
                            lineNumber: 86,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 flex justify-end gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    variant: "soft",
                                    onClick: close,
                                    children: "বাতিল"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/report/ReportButton.jsx",
                                    lineNumber: 93,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    variant: "danger",
                                    disabled: !reason,
                                    loading: busy,
                                    onClick: send,
                                    children: "রিপোর্ট পাঠান"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/report/ReportButton.jsx",
                                    lineNumber: 94,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/report/ReportButton.jsx",
                            lineNumber: 92,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/report/ReportButton.jsx",
                    lineNumber: 69,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/report/ReportButton.jsx",
                lineNumber: 58,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/report/ReportButton.jsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_s(ReportButton, "FUSbfO5I/tB92iJK6c10YX70voA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthProvider$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = ReportButton;
var _c;
__turbopack_context__.k.register(_c, "ReportButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/Dialog.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Dialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Icons.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function Dialog({ open, onClose, title, children, variant = 'center', width = 'max-w-lg' }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dialog.useEffect": ()=>{
            const d = ref.current;
            if (!d) return;
            if (open && !d.open) d.showModal();
            if (!open && d.open) d.close();
        }
    }["Dialog.useEffect"], [
        open
    ]);
    const position = variant === 'sheet' ? 'max-sm:m-0 max-sm:mt-auto max-sm:w-full max-sm:max-w-none' : '';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dialog", {
        ref: ref,
        onClose: onClose,
        onClick: (e)=>e.target === ref.current && onClose(),
        "aria-label": title,
        className: `m-auto w-[min(94vw,40rem)] ${width} border-0 bg-transparent p-0 text-left backdrop:bg-teal-950/55 backdrop:backdrop-blur-sm ${position}`,
        children: open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `max-h-[92vh] overflow-y-auto bg-white shadow-[0_40px_80px_-30px_rgba(10,61,56,0.6)] ${variant === 'sheet' ? 'rounded-t-3xl sm:rounded-3xl' : 'rounded-3xl'}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "sticky top-0 z-10 flex items-center justify-between gap-4 bg-white/90 px-6 pb-3 pt-5 backdrop-blur",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-display text-xl font-bold text-teal-950",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/Dialog.jsx",
                            lineNumber: 37,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onClose,
                            "aria-label": "বন্ধ করুন",
                            className: "flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                name: "x",
                                className: "h-5 w-5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/Dialog.jsx",
                                lineNumber: 44,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/Dialog.jsx",
                            lineNumber: 38,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/Dialog.jsx",
                    lineNumber: 36,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-6 pb-6",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/Dialog.jsx",
                    lineNumber: 47,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/Dialog.jsx",
            lineNumber: 31,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Dialog.jsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_s(Dialog, "8uVE59eA/r6b92xF80p7sH8rXLk=");
_c = Dialog;
var _c;
__turbopack_context__.k.register(_c, "Dialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/Form.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Chip",
    ()=>Chip,
    "Field",
    ()=>Field,
    "Input",
    ()=>Input,
    "Select",
    ()=>Select,
    "Textarea",
    ()=>Textarea
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const control = 'w-full rounded-xl border border-teal-900/15 bg-white px-4 text-[15px] text-slate-900 placeholder:text-slate-400 shadow-[inset_0_1px_2px_rgba(10,61,56,0.05)] outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-500/15 disabled:bg-slate-50 aria-[invalid=true]:border-rose-400 aria-[invalid=true]:ring-rose-500/10';
const Input = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = function Input({ className = '', ...props }, ref) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        ref: ref,
        className: `h-12 ${control} ${className}`,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Form.jsx",
        lineNumber: 8,
        columnNumber: 10
    }, this);
});
_c1 = Input;
const Textarea = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c2 = function Textarea({ className = '', ...props }, ref) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
        ref: ref,
        className: `min-h-28 py-3 leading-relaxed ${control} ${className}`,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Form.jsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
});
_c3 = Textarea;
const Select = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c4 = function Select({ className = '', children, ...props }, ref) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
        ref: ref,
        className: `h-12 ${control} ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Form.jsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
});
_c5 = Select;
function Field({ label, hint, error, children }) {
    _s();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: id,
                className: "mb-1.5 block text-sm font-semibold text-teal-950",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Form.jsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            children({
                id,
                'aria-invalid': error ? true : undefined,
                'aria-describedby': error || hint ? `${id}-d` : undefined
            }),
            (error || hint) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                id: `${id}-d`,
                className: `mt-1.5 text-[13px] ${error ? 'text-rose-600' : 'text-slate-500'}`,
                children: error || hint
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Form.jsx",
                lineNumber: 33,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Form.jsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_s(Field, "WhsuKpSQZEWeFcB7gWlfDRQktoQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"]
    ];
});
_c6 = Field;
function Chip({ active, children, className = '', ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        "aria-pressed": !!active,
        className: `whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition active:scale-95 ${active ? 'bg-teal-900 text-white shadow-[0_8px_20px_-10px_rgba(10,61,56,0.9)]' : 'bg-white text-teal-900 ring-1 ring-inset ring-teal-900/10 hover:bg-teal-50 hover:ring-teal-900/25'} ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Form.jsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c7 = Chip;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "Input$forwardRef");
__turbopack_context__.k.register(_c1, "Input");
__turbopack_context__.k.register(_c2, "Textarea$forwardRef");
__turbopack_context__.k.register(_c3, "Textarea");
__turbopack_context__.k.register(_c4, "Select$forwardRef");
__turbopack_context__.k.register(_c5, "Select");
__turbopack_context__.k.register(_c6, "Field");
__turbopack_context__.k.register(_c7, "Chip");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/constants.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CATEGORIES",
    ()=>CATEGORIES,
    "CONDITIONS",
    ()=>CONDITIONS,
    "LEDGER_KINDS",
    ()=>LEDGER_KINDS,
    "MAX_IMAGE_MB",
    ()=>MAX_IMAGE_MB,
    "ORDER_STATUS",
    ()=>ORDER_STATUS,
    "PAGE_SIZE",
    ()=>PAGE_SIZE,
    "PAYMENT_METHODS",
    ()=>PAYMENT_METHODS,
    "PRIORITY",
    ()=>PRIORITY,
    "REPORT_REASONS",
    ()=>REPORT_REASONS,
    "REPORT_STATUS",
    ()=>REPORT_STATUS,
    "SORTS",
    ()=>SORTS,
    "TONES",
    ()=>TONES,
    "labelOf",
    ()=>labelOf
]);
const PAGE_SIZE = 12;
const CATEGORIES = [
    {
        value: 'books',
        label: 'বই'
    },
    {
        value: 'notes',
        label: 'নোটস'
    },
    {
        value: 'electronics',
        label: 'ইলেকট্রনিক্স'
    },
    {
        value: 'stationery',
        label: 'স্টেশনারি ও ড্রয়িং'
    },
    {
        value: 'hostel',
        label: 'হোস্টেল'
    },
    {
        value: 'clothing',
        label: 'পোশাক'
    },
    {
        value: 'others',
        label: 'অন্যান্য'
    }
];
const CONDITIONS = [
    {
        value: 'new',
        label: 'নতুন'
    },
    {
        value: 'like_new',
        label: 'প্রায় নতুন'
    },
    {
        value: 'good',
        label: 'ভালো'
    },
    {
        value: 'used',
        label: 'ব্যবহৃত'
    }
];
const SORTS = [
    {
        value: 'newest',
        label: 'সবচেয়ে নতুন'
    },
    {
        value: 'price_asc',
        label: 'দাম: কম থেকে বেশি'
    },
    {
        value: 'price_desc',
        label: 'দাম: বেশি থেকে কম'
    }
];
const labelOf = (list, value)=>list.find((i)=>i.value === value)?.label ?? null;
const MAX_IMAGE_MB = 8;
const ORDER_STATUS = {
    pending_payment: {
        label: 'পেমেন্টের অপেক্ষায়',
        tone: 'amber',
        step: 0
    },
    funded: {
        label: 'টাকা এসক্রো-তে জমা',
        tone: 'teal',
        step: 1
    },
    delivered: {
        label: 'পণ্য হস্তান্তর হয়েছে',
        tone: 'teal',
        step: 2
    },
    completed: {
        label: 'সম্পন্ন',
        tone: 'green',
        step: 3
    },
    disputed: {
        label: 'বিরোধ চলছে',
        tone: 'rose',
        step: -1
    },
    cancelled: {
        label: 'বাতিল',
        tone: 'slate',
        step: -1
    },
    refunded: {
        label: 'টাকা ফেরত',
        tone: 'slate',
        step: -1
    }
};
const TONES = {
    amber: 'bg-amber-100 text-amber-900 ring-amber-300/60',
    teal: 'bg-teal-50 text-teal-900 ring-teal-200',
    green: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
    rose: 'bg-rose-50 text-rose-800 ring-rose-200',
    slate: 'bg-slate-100 text-slate-700 ring-slate-200',
    violet: 'bg-violet-50 text-violet-800 ring-violet-200'
};
const REPORT_REASONS = [
    {
        value: 'scam',
        label: 'প্রতারণা বা স্ক্যাম'
    },
    {
        value: 'fake',
        label: 'নকল বা ভুয়া পণ্য'
    },
    {
        value: 'prohibited',
        label: 'নিষিদ্ধ পণ্য'
    },
    {
        value: 'wrong_category',
        label: 'ভুল ক্যাটাগরি বা তথ্য'
    },
    {
        value: 'abusive',
        label: 'অশালীন বা আপত্তিকর'
    },
    {
        value: 'duplicate',
        label: 'একই পোস্ট বারবার'
    },
    {
        value: 'other',
        label: 'অন্য কারণ'
    }
];
const PAYMENT_METHODS = [
    {
        value: 'bkash',
        label: 'bKash',
        color: '#E2136E'
    },
    {
        value: 'nagad',
        label: 'Nagad',
        color: '#F6921E'
    },
    {
        value: 'rocket',
        label: 'Rocket',
        color: '#8C3494'
    },
    {
        value: 'bank',
        label: 'ব্যাংক',
        color: '#0F766E'
    }
];
const LEDGER_KINDS = {
    deposit: {
        label: 'ডিপোজিট',
        sign: 1
    },
    test_credit: {
        label: 'টেস্ট ক্রেডিট',
        sign: 1
    },
    escrow_hold: {
        label: 'এসক্রো-তে জমা',
        sign: -1
    },
    escrow_release: {
        label: 'বিক্রির টাকা',
        sign: 1
    },
    escrow_refund: {
        label: 'এসক্রো ফেরত',
        sign: 1
    },
    withdrawal_hold: {
        label: 'উত্তোলন অনুরোধ',
        sign: -1
    },
    withdrawal_reversal: {
        label: 'উত্তোলন ফেরত',
        sign: 1
    },
    adjustment: {
        label: 'অ্যাডজাস্টমেন্ট',
        sign: 0
    },
    platform_fee: {
        label: 'প্ল্যাটফর্ম ফি',
        sign: 0
    }
};
const REPORT_STATUS = {
    open: {
        label: 'নতুন',
        tone: 'rose'
    },
    investigating: {
        label: 'তদন্তাধীন',
        tone: 'amber'
    },
    resolved: {
        label: 'নিষ্পন্ন',
        tone: 'green'
    },
    dismissed: {
        label: 'খারিজ',
        tone: 'slate'
    }
};
const PRIORITY = {
    normal: {
        label: 'সাধারণ',
        tone: 'slate'
    },
    high: {
        label: 'উচ্চ',
        tone: 'amber'
    },
    critical: {
        label: 'জরুরি',
        tone: 'rose'
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/services/listings.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bumpViews",
    ()=>bumpViews,
    "createListing",
    ()=>createListing,
    "deleteListing",
    ()=>deleteListing,
    "fetchListingById",
    ()=>fetchListingById,
    "fetchListings",
    ()=>fetchListings,
    "fetchListingsBySeller",
    ()=>fetchListingsBySeller,
    "fetchLocations",
    ()=>fetchLocations,
    "fetchMyListings",
    ()=>fetchMyListings,
    "markListingSold",
    ()=>markListingSold,
    "removeListingImage",
    ()=>removeListingImage,
    "reopenListing",
    ()=>reopenListing,
    "updateListing",
    ()=>updateListing,
    "uploadListingImage",
    ()=>uploadListingImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.js [app-client] (ecmascript)");
;
;
// Cards don't need `description`, so we don't download it for 12 rows at a time.
const CARD_COLUMNS = 'id, title, price, location, image_url, category, condition, status, created_at, seller_id';
// PostgREST's or() treats , ( ) as syntax and ilike treats % _ as wildcards: strip them from user text.
const clean = (s = '')=>s.replace(/[,()%_*\\"']/g, ' ').replace(/\s+/g, ' ').trim();
async function fetchListings(filters, signal) {
    const { q, category, condition, location, minPrice, maxPrice, sort, page } = filters;
    const from = (page - 1) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAGE_SIZE"];
    let query = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('listings').select(CARD_COLUMNS, {
        count: 'exact'
    }).in('status', [
        'active',
        'reserved'
    ]);
    // Every word must match somewhere in title / description / location.
    for (const word of clean(q).split(' ').filter(Boolean).slice(0, 5)){
        query = query.or(`title.ilike.%${word}%,description.ilike.%${word}%,location.ilike.%${word}%`);
    }
    if (category) query = query.eq('category', category);
    if (condition) query = query.eq('condition', condition);
    const loc = clean(location);
    if (loc) query = query.ilike('location', `%${loc}%`);
    if (minPrice !== '' && !Number.isNaN(Number(minPrice))) query = query.gte('price', Number(minPrice));
    if (maxPrice !== '' && !Number.isNaN(Number(maxPrice))) query = query.lte('price', Number(maxPrice));
    if (sort === 'price_asc') query = query.order('price', {
        ascending: true
    });
    else if (sort === 'price_desc') query = query.order('price', {
        ascending: false
    });
    query = query.order('created_at', {
        ascending: false
    }).range(from, from + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAGE_SIZE"] - 1);
    if (signal) query = query.abortSignal(signal);
    const { data, count, error } = await query;
    // PGRST103 = asked for a page beyond the last one (e.g. a stale ?page=9 after filtering).
    if (error?.code === 'PGRST103') return {
        items: [],
        total: 0,
        outOfRange: true
    };
    if (error) throw error;
    return {
        items: data ?? [],
        total: count ?? 0,
        outOfRange: false
    };
}
async function fetchLocations() {
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('listing_locations').select('location').limit(30);
    return (data ?? []).map((r)=>r.location);
}
async function fetchListingById(id) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('listings').select('*, seller:profiles(id, full_name, avatar_url, created_at, university)').eq('id', id).maybeSingle();
    if (error) {
        // 22P02 = id isn't a valid uuid/integer for this table: same as "not found" for the visitor.
        if (error.code === '22P02') return null;
        throw error;
    }
    return data;
}
async function uploadListingImage(userId, blob) {
    // First folder segment must equal the user's id: the storage policy checks this.
    const path = `${userId}/${crypto.randomUUID()}.jpg`;
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('product-images').upload(path, blob, {
        contentType: blob.type || 'image/jpeg',
        cacheControl: '31536000',
        upsert: false
    });
    if (error) throw error;
    const { data } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('product-images').getPublicUrl(path);
    return {
        path,
        url: data.publicUrl
    };
}
const removeListingImage = (path)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('product-images').remove([
        path
    ]);
async function createListing(values) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('listings').insert(values).select('id').single();
    if (error) throw error;
    return data;
}
async function deleteListing(id) {
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('listings').delete().eq('id', id);
    if (error) throw error;
}
async function markListingSold(id) {
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].rpc('mark_listing_sold', {
        p_listing_id: String(id)
    });
    if (error) throw error;
}
async function updateListing(id, values) {
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('listings').update(values).eq('id', id);
    if (error) throw error;
}
async function fetchMyListings(userId) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('listings').select('id, title, price, image_url, status, category, views, created_at, hidden_reason').eq('seller_id', userId).order('created_at', {
        ascending: false
    });
    if (error) throw error;
    return data ?? [];
}
async function fetchListingsBySeller(sellerId) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('listings').select('id, title, price, location, image_url, category, condition, status, created_at, seller_id').eq('seller_id', sellerId).in('status', [
        'active',
        'reserved',
        'sold'
    ]).order('created_at', {
        ascending: false
    }).limit(48);
    if (error) throw error;
    return data ?? [];
}
const reopenListing = async (id)=>{
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].rpc('reopen_listing', {
        p_listing_id: String(id)
    });
    if (error) throw error;
};
const bumpViews = (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].rpc('bump_listing_views', {
        p_listing_id: String(id)
    });
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/services/orders.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calcFee",
    ()=>calcFee,
    "cancelOrder",
    ()=>cancelOrder,
    "confirmReceipt",
    ()=>confirmReceipt,
    "createOrder",
    ()=>createOrder,
    "fetchOrder",
    ()=>fetchOrder,
    "fetchOrderEvents",
    ()=>fetchOrderEvents,
    "fetchOrders",
    ()=>fetchOrders,
    "getEscrowConfig",
    ()=>getEscrowConfig,
    "markDelivered",
    ()=>markDelivered,
    "openDispute",
    ()=>openDispute,
    "payForOrder",
    ()=>payForOrder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.js [app-client] (ecmascript)");
;
const ORDER_SELECT = `
  *,
  buyer:profiles!orders_buyer_id_fkey(id, full_name, avatar_url),
  seller:profiles!orders_seller_id_fkey(id, full_name, avatar_url)
`;
let configPromise;
function getEscrowConfig() {
    configPromise ??= __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('app_settings').select('key, value').then(({ data })=>{
        const s = Object.fromEntries((data ?? []).map((r)=>[
                r.key,
                r.value
            ]));
        return {
            mode: s.payments_mode ?? 'test',
            settings: s,
            feeBps: Number(s.escrow_fee_bps ?? 0),
            autoReleaseHours: Number(s.auto_release_hours ?? 72)
        };
    });
    return configPromise;
}
const calcFee = (price, feeBps)=>Math.round(Number(price) * feeBps / 100) / 100;
async function rpc(name, args) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].rpc(name, args);
    if (error) throw error;
    return data;
}
const createOrder = (listingId, note)=>rpc('create_order', {
        p_listing_id: String(listingId),
        p_note: note?.trim() || null
    });
async function payForOrder(orderId) {
    const result = await rpc('pay_order_with_wallet', {
        p_order_id: orderId
    });
    if (result !== 'funded') throw new Error(result);
}
const markDelivered = (orderId)=>rpc('mark_delivered', {
        p_order_id: orderId
    });
const confirmReceipt = (orderId)=>rpc('confirm_receipt', {
        p_order_id: orderId
    });
const cancelOrder = (orderId)=>rpc('cancel_order', {
        p_order_id: orderId
    });
const openDispute = (orderId, reason)=>rpc('open_dispute', {
        p_order_id: orderId,
        p_reason: reason
    });
async function fetchOrders() {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('orders').select(ORDER_SELECT).order('created_at', {
        ascending: false
    }).limit(100);
    if (error) throw error;
    return data ?? [];
}
async function fetchOrder(id) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('orders').select(ORDER_SELECT).eq('id', id).maybeSingle();
    if (error) throw error;
    return data;
}
async function fetchOrderEvents(orderId) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('order_events').select('id, from_status, to_status, note, created_at, actor_id').eq('order_id', orderId).order('created_at', {
        ascending: true
    });
    if (error) throw error;
    return data ?? [];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/services/reports.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "submitReport",
    ()=>submitReport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.js [app-client] (ecmascript)");
;
async function submitReport({ type, targetId, reason, details }) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].rpc('submit_report', {
        p_type: type,
        p_target_id: String(targetId),
        p_reason: reason,
        p_details: details?.trim() || null
    });
    if (error) throw error;
    return data;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);})()

//# sourceMappingURL=src_1v474vxzndq_d._.js.map