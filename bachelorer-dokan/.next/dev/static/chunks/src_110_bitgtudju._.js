(()=>{"use strict";(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/auth/AuthProvider.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/errors.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    user: null,
    profile: null,
    isAdmin: false,
    loading: true,
    signOut: async ()=>{},
    refreshProfile: async ()=>{}
});
function AuthProvider({ children }) {
    _s();
    const [session, setSession] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(undefined) // undefined = still checking
    ;
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            // Fires once immediately with the stored session, then on every sign-in/out/refresh.
            const { data } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.onAuthStateChange({
                "AuthProvider.useEffect": (_event, next)=>setSession(next)
            }["AuthProvider.useEffect"]);
            // Older supabase-js versions don't emit an initial event, so also read the stored session.
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getSession().then({
                "AuthProvider.useEffect": ({ data: s })=>setSession({
                        "AuthProvider.useEffect": (prev)=>prev === undefined ? s.session : prev
                    }["AuthProvider.useEffect"])
            }["AuthProvider.useEffect"]);
            return ({
                "AuthProvider.useEffect": ()=>data.subscription.unsubscribe()
            })["AuthProvider.useEffect"];
        }
    }["AuthProvider.useEffect"], []);
    const userId = session?.user?.id;
    const refreshProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[refreshProfile]": async ()=>{
            if (!userId) return;
            const [{ data }, flags] = await Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('profiles').select('id, full_name, avatar_url, cover_url, university, department, city, bio').eq('id', userId).maybeSingle(),
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].rpc('my_flags')
            ]);
            setProfile(data ? {
                ...data,
                ...flags.data?.[0] ?? {}
            } : data);
        }
    }["AuthProvider.useCallback[refreshProfile]"], [
        userId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            if (!userId) {
                setProfile(null);
                return;
            }
            refreshProfile();
        }
    }["AuthProvider.useEffect"], [
        userId,
        refreshProfile
    ]);
    const signOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[signOut]": async ()=>{
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
            if (error) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["friendlyError"])(error));
            else __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('লগআউট হয়েছে।');
        }
    }["AuthProvider.useCallback[signOut]"], []);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AuthProvider.useMemo[value]": ()=>({
                user: session?.user ?? null,
                profile,
                isAdmin: !!profile?.is_admin,
                loading: session === undefined,
                signOut,
                refreshProfile
            })
    }["AuthProvider.useMemo[value]"], [
        session,
        profile,
        signOut,
        refreshProfile
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/auth/AuthProvider.jsx",
        lineNumber: 54,
        columnNumber: 10
    }, this);
}
_s(AuthProvider, "FCm256jjcnlFlR6Ag0XXMzCos5U=");
_c = AuthProvider;
const useAuth = ()=>{
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
};
_s1(useAuth, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/auth/LiveProvider.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LiveProvider",
    ()=>LiveProvider,
    "useOnline",
    ()=>useOnline
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthProvider$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/auth/AuthProvider.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$chat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/chat.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$profile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/profile.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const LiveContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    online: new Set()
});
function LiveProvider({ children }) {
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthProvider$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [online, setOnline] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "LiveProvider.useState": ()=>new Set()
    }["LiveProvider.useState"]);
    const userId = user?.id;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveProvider.useEffect": ()=>{
            if (!userId) {
                setOnline(new Set());
                return;
            }
            const channel = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].channel('presence:dokan', {
                config: {
                    presence: {
                        key: userId
                    }
                }
            });
            channel.on('presence', {
                event: 'sync'
            }, {
                "LiveProvider.useEffect": ()=>setOnline(new Set(Object.keys(channel.presenceState())))
            }["LiveProvider.useEffect"]).subscribe({
                "LiveProvider.useEffect": (status)=>{
                    if (status === 'SUBSCRIBED') channel.track({
                        at: Date.now()
                    });
                }
            }["LiveProvider.useEffect"]);
            const deliver = {
                "LiveProvider.useEffect.deliver": ()=>document.visibilityState === 'visible' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$chat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["markAllDelivered"])().then({
                        "LiveProvider.useEffect.deliver": ()=>{}
                    }["LiveProvider.useEffect.deliver"], {
                        "LiveProvider.useEffect.deliver": ()=>{}
                    }["LiveProvider.useEffect.deliver"])
            }["LiveProvider.useEffect.deliver"];
            deliver();
            const incoming = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].channel(`delivery:${userId}`).on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'messages'
            }, {
                "LiveProvider.useEffect.incoming": ({ new: m })=>{
                    if (m.sender_id !== userId) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$chat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["markAllDelivered"])().then({
                        "LiveProvider.useEffect.incoming": ()=>{}
                    }["LiveProvider.useEffect.incoming"], {
                        "LiveProvider.useEffect.incoming": ()=>{}
                    }["LiveProvider.useEffect.incoming"]);
                }
            }["LiveProvider.useEffect.incoming"]).subscribe();
            const ping = {
                "LiveProvider.useEffect.ping": ()=>document.visibilityState === 'visible' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$profile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["touchLastSeen"])(userId).then({
                        "LiveProvider.useEffect.ping": ()=>{}
                    }["LiveProvider.useEffect.ping"], {
                        "LiveProvider.useEffect.ping": ()=>{}
                    }["LiveProvider.useEffect.ping"])
            }["LiveProvider.useEffect.ping"];
            ping();
            const timer = setInterval(ping, 60000);
            document.addEventListener('visibilitychange', deliver);
            return ({
                "LiveProvider.useEffect": ()=>{
                    clearInterval(timer);
                    document.removeEventListener('visibilitychange', deliver);
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].removeChannel(channel);
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].removeChannel(incoming);
                }
            })["LiveProvider.useEffect"];
        }
    }["LiveProvider.useEffect"], [
        userId
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LiveProvider.useMemo[value]": ()=>({
                online
            })
    }["LiveProvider.useMemo[value]"], [
        online
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LiveContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/auth/LiveProvider.jsx",
        lineNumber: 54,
        columnNumber: 10
    }, this);
}
_s(LiveProvider, "wsplUd+Qc9kadqp1CLRUK5K4xEw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthProvider$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = LiveProvider;
function useOnline(id) {
    _s1();
    const { online } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LiveContext);
    return !!id && online.has(id);
}
_s1(useOnline, "0NUot80LXhGsMy+ehNX1pIWadT8=");
var _c;
__turbopack_context__.k.register(_c, "LiveProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/Footer.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Icons.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function Footer() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    if (pathname.startsWith('/admin') || pathname.startsWith('/messages')) return null;
    const col = 'space-y-2.5 text-[15px] text-white/65';
    const a = 'transition hover:text-white';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "aurora grain on-dark mt-24 text-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex h-10 w-10 items-center justify-center rounded-[14px] bg-white/10 text-amber-300 ring-1 ring-white/20",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                name: "bag",
                                                className: "h-5 w-5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Footer.jsx",
                                                lineNumber: 18,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Footer.jsx",
                                            lineNumber: 17,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-display text-xl font-extrabold",
                                            children: "Bachelorer Dokan"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Footer.jsx",
                                            lineNumber: 20,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/Footer.jsx",
                                    lineNumber: 16,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-4 max-w-xs text-[15px] leading-relaxed text-white/65",
                                    children: "স্টুডেন্টদের জন্য নিরাপদ কেনাবেচার জায়গা। টাকা থাকে এসক্রো-তে, পণ্য হাতে পেলে তবেই বিক্রেতা পান।"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Footer.jsx",
                                    lineNumber: 22,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Footer.jsx",
                            lineNumber: 15,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-3 font-semibold",
                                    children: "মার্কেটপ্লেস"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Footer.jsx",
                                    lineNumber: 27,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: col,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: a,
                                                href: "/",
                                                children: "সব প্রোডাক্ট"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Footer.jsx",
                                                lineNumber: 29,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Footer.jsx",
                                            lineNumber: 29,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: a,
                                                href: "/add-product",
                                                children: "বিক্রি করুন"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Footer.jsx",
                                                lineNumber: 30,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Footer.jsx",
                                            lineNumber: 30,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: a,
                                                href: "/?category=books",
                                                children: "বই"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Footer.jsx",
                                                lineNumber: 31,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Footer.jsx",
                                            lineNumber: 31,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: a,
                                                href: "/?category=electronics",
                                                children: "ইলেকট্রনিক্স"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Footer.jsx",
                                                lineNumber: 32,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Footer.jsx",
                                            lineNumber: 32,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/Footer.jsx",
                                    lineNumber: 28,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Footer.jsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-3 font-semibold",
                                    children: "আমার অ্যাকাউন্ট"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Footer.jsx",
                                    lineNumber: 36,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: col,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: a,
                                                href: "/wallet",
                                                children: "ওয়ালেট"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Footer.jsx",
                                                lineNumber: 38,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Footer.jsx",
                                            lineNumber: 38,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: a,
                                                href: "/orders",
                                                children: "অর্ডার"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Footer.jsx",
                                                lineNumber: 39,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Footer.jsx",
                                            lineNumber: 39,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: a,
                                                href: "/messages",
                                                children: "মেসেজ"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Footer.jsx",
                                                lineNumber: 40,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Footer.jsx",
                                            lineNumber: 40,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: a,
                                                href: "/profile",
                                                children: "প্রোফাইল"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Footer.jsx",
                                                lineNumber: 41,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Footer.jsx",
                                            lineNumber: 41,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/Footer.jsx",
                                    lineNumber: 37,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Footer.jsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-3 font-semibold",
                                    children: "নিরাপত্তা"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Footer.jsx",
                                    lineNumber: 45,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: col,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    name: "shield",
                                                    className: "h-4 w-4 text-amber-300"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/Footer.jsx",
                                                    lineNumber: 47,
                                                    columnNumber: 55
                                                }, this),
                                                " এসক্রো সুরক্ষা"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/Footer.jsx",
                                            lineNumber: 47,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    name: "flag",
                                                    className: "h-4 w-4 text-amber-300"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/Footer.jsx",
                                                    lineNumber: 48,
                                                    columnNumber: 55
                                                }, this),
                                                " সন্দেহজনক পোস্ট রিপোর্ট করুন"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/Footer.jsx",
                                            lineNumber: 48,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    name: "lock",
                                                    className: "h-4 w-4 text-amber-300"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/Footer.jsx",
                                                    lineNumber: 49,
                                                    columnNumber: 55
                                                }, this),
                                                " যাচাইকৃত লেনদেন"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/Footer.jsx",
                                            lineNumber: 49,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/Footer.jsx",
                                    lineNumber: 46,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Footer.jsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/Footer.jsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-6 text-sm text-white/50",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "© ",
                                new Date().getFullYear(),
                                " Bachelorer Dokan. সর্বস্বত্ব সংরক্ষিত।"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Footer.jsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "ভালোবাসা দিয়ে তৈরি, ছাত্রদের জন্য।"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Footer.jsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/Footer.jsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/Footer.jsx",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/layout/Footer.jsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_s(Footer, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/Navbar.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthProvider$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/auth/AuthProvider.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useUnreadCount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useUnreadCount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useWallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Icons.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Media$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Media.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$NotificationBell$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/NotificationBell.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/format.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
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
function IconLink({ href, label, icon, badge, active }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: href,
        "aria-label": label,
        title: label,
        className: `relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-teal-900/[0.07] ${active ? 'bg-teal-900/[0.08] text-teal-900' : 'text-teal-900/70'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                name: icon
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Navbar.jsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            badge > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-amber-400 px-1 text-[11px] font-bold leading-none text-teal-950 ring-2 ring-white",
                children: badge > 9 ? '9+' : badge
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Navbar.jsx",
                lineNumber: 26,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Navbar.jsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = IconLink;
function AccountMenu({ user, profile, isAdmin, signOut }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const name = profile?.full_name || user.email?.split('@')[0];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AccountMenu.useEffect": ()=>{
            if (!open) return;
            const onDown = {
                "AccountMenu.useEffect.onDown": (e)=>!ref.current?.contains(e.target) && setOpen(false)
            }["AccountMenu.useEffect.onDown"];
            const onKey = {
                "AccountMenu.useEffect.onKey": (e)=>e.key === 'Escape' && setOpen(false)
            }["AccountMenu.useEffect.onKey"];
            document.addEventListener('mousedown', onDown);
            document.addEventListener('keydown', onKey);
            return ({
                "AccountMenu.useEffect": ()=>{
                    document.removeEventListener('mousedown', onDown);
                    document.removeEventListener('keydown', onKey);
                }
            })["AccountMenu.useEffect"];
        }
    }["AccountMenu.useEffect"], [
        open
    ]);
    const item = 'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[15px] text-slate-700 transition hover:bg-teal-900/[0.06]';
    const close = ()=>setOpen(false);
    const link = (href, icon, text)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            role: "menuitem",
            href: href,
            onClick: close,
            className: item,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    name: icon,
                    className: "h-[18px] w-[18px] text-teal-800"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/Navbar.jsx",
                    lineNumber: 56,
                    columnNumber: 7
                }, this),
                " ",
                text
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/Navbar.jsx",
            lineNumber: 55,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setOpen((o)=>!o),
                "aria-expanded": open,
                "aria-haspopup": "menu",
                className: "flex items-center gap-1.5 rounded-full py-1 pl-1 pr-2 transition hover:bg-teal-900/[0.07]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Media$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                        name: name,
                        url: profile?.avatar_url,
                        className: "h-8 w-8 text-xs"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Navbar.jsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        name: "down",
                        className: `h-4 w-4 text-teal-900/60 transition ${open ? 'rotate-180' : ''}`
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Navbar.jsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/Navbar.jsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "menu",
                className: "absolute right-0 top-[calc(100%+10px)] w-72 rounded-3xl border border-teal-900/10 bg-white/95 p-2 shadow-[0_24px_50px_-20px_rgba(10,61,56,0.45)] backdrop-blur-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/profile",
                        onClick: close,
                        className: "flex items-center gap-3 rounded-2xl px-3 pb-3 pt-2.5 transition hover:bg-teal-900/[0.05]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Media$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                name: name,
                                url: profile?.avatar_url,
                                className: "h-11 w-11"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Navbar.jsx",
                                lineNumber: 78,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "block truncate font-semibold text-teal-950",
                                        children: name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Navbar.jsx",
                                        lineNumber: 80,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "block truncate text-[13px] text-slate-500",
                                        children: "প্রোফাইল দেখুন ও এডিট করুন"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Navbar.jsx",
                                        lineNumber: 81,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/Navbar.jsx",
                                lineNumber: 79,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Navbar.jsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "my-1 h-px bg-teal-900/10"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Navbar.jsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this),
                    link('/wallet', 'wallet', 'ওয়ালেট'),
                    link('/orders', 'receipt', 'আমার অর্ডার'),
                    link('/profile/listings', 'tag', 'আমার প্রোডাক্ট'),
                    link('/messages', 'chat', 'মেসেজ'),
                    isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "my-1 h-px bg-teal-900/10"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Navbar.jsx",
                                lineNumber: 91,
                                columnNumber: 15
                            }, this),
                            link('/admin', 'dashboard', 'অ্যাডমিন প্যানেল')
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Navbar.jsx",
                        lineNumber: 90,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "my-1 h-px bg-teal-900/10"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Navbar.jsx",
                        lineNumber: 95,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        role: "menuitem",
                        type: "button",
                        onClick: ()=>{
                            close();
                            signOut();
                        },
                        className: `${item} text-rose-700 hover:bg-rose-50`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                name: "logout",
                                className: "h-[18px] w-[18px]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Navbar.jsx",
                                lineNumber: 105,
                                columnNumber: 13
                            }, this),
                            " লগআউট"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Navbar.jsx",
                        lineNumber: 96,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/Navbar.jsx",
                lineNumber: 73,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Navbar.jsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
_s(AccountMenu, "wl9VvfhnMVWQ+kCekFjcRPEi3/0=");
_c1 = AccountMenu;
function NavSearch() {
    _s1();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [q, setQ] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(params.get('q') ?? '');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NavSearch.useEffect": ()=>setQ(pathname === '/' ? params.get('q') ?? '' : '')
    }["NavSearch.useEffect"], [
        params,
        pathname
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        role: "search",
        onSubmit: (e)=>{
            e.preventDefault();
            router.push(q.trim() ? `/?q=${encodeURIComponent(q.trim())}#results` : '/');
        },
        className: "hidden min-w-0 max-w-md flex-1 md:block",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "flex h-11 items-center gap-2 rounded-full bg-teal-900/[0.05] px-4 ring-1 ring-inset ring-transparent transition focus-within:bg-white focus-within:ring-teal-600/40",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    name: "search",
                    className: "h-[18px] w-[18px] text-teal-800/60"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/Navbar.jsx",
                    lineNumber: 130,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    value: q,
                    onChange: (e)=>setQ(e.target.value),
                    placeholder: "বই, নোটস, ল্যাপটপ খুঁজুন…",
                    "aria-label": "প্রোডাক্ট খুঁজুন",
                    className: "min-w-0 flex-1 bg-transparent text-[15px] text-slate-800 outline-none placeholder:text-slate-400"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/Navbar.jsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/Navbar.jsx",
            lineNumber: 129,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/layout/Navbar.jsx",
        lineNumber: 121,
        columnNumber: 5
    }, this);
}
_s1(NavSearch, "kA6okpbXnKTaPnLT+qET3JUeJ+U=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c2 = NavSearch;
function Navbar() {
    _s2();
    const { user, profile, isAdmin, loading, signOut } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthProvider$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const unread = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useUnreadCount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(user?.id);
    const { balance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(user?.id);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [isMounted, setIsMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            setIsMounted(true);
        }
    }["Navbar.useEffect"], []);
    if (pathname.startsWith('/admin')) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-50 border-b border-teal-900/10 bg-white/75 backdrop-blur-xl supports-[backdrop-filter]:bg-white/65",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    className: "group flex shrink-0 items-center gap-2.5",
                    "aria-label": "Bachelorer Dokan হোম",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex h-10 w-10 items-center justify-center rounded-[14px] bg-gradient-to-br from-teal-700 to-teal-950 text-amber-300 shadow-[0_10px_20px_-8px_rgba(10,61,56,0.9)] transition group-hover:rotate-[-6deg]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                name: "bag",
                                className: "h-5 w-5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Navbar.jsx",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Navbar.jsx",
                            lineNumber: 161,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-display hidden text-[19px] font-extrabold tracking-tight text-teal-950 sm:block",
                            children: "Bachelorer Dokan"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Navbar.jsx",
                            lineNumber: 164,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/Navbar.jsx",
                    lineNumber: 160,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavSearch, {}, void 0, false, {
                    fileName: "[project]/src/components/layout/Navbar.jsx",
                    lineNumber: 167,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "flex shrink-0 items-center gap-1 sm:gap-1.5",
                    "aria-label": "প্রধান মেনু",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: isMounted && user ? '/add-product' : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginHref"])('/add-product'),
                            size: "sm",
                            variant: "dark",
                            className: "mr-0.5 sm:mr-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    name: "plus",
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Navbar.jsx",
                                    lineNumber: 171,
                                    columnNumber: 13
                                }, this),
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden min-[400px]:inline",
                                    children: "Sell Item"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Navbar.jsx",
                                    lineNumber: 171,
                                    columnNumber: 54
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Navbar.jsx",
                            lineNumber: 170,
                            columnNumber: 11
                        }, this),
                        !isMounted || loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "skeleton h-9 w-16 rounded-full",
                            "aria-hidden": "true"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Navbar.jsx",
                            lineNumber: 175,
                            columnNumber: 13
                        }, this) : user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/wallet",
                                    "aria-label": "ওয়ালেট",
                                    className: "mr-0.5 hidden h-10 items-center gap-2 rounded-full bg-gradient-to-r from-amber-50 to-amber-100/70 pl-3 pr-4 text-sm font-bold text-teal-950 ring-1 ring-inset ring-amber-300/50 transition hover:ring-amber-400 sm:flex",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            name: "wallet",
                                            className: "h-[18px] w-[18px] text-amber-700"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Navbar.jsx",
                                            lineNumber: 183,
                                            columnNumber: 17
                                        }, this),
                                        balance === null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "skeleton h-4 w-10"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Navbar.jsx",
                                            lineNumber: 184,
                                            columnNumber: 37
                                        }, this) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(balance)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/Navbar.jsx",
                                    lineNumber: 178,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$NotificationBell$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/src/components/layout/Navbar.jsx",
                                    lineNumber: 186,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconLink, {
                                    href: "/messages",
                                    label: "মেসেজ",
                                    icon: "chat",
                                    badge: unread,
                                    active: pathname.startsWith('/messages')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Navbar.jsx",
                                    lineNumber: 187,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AccountMenu, {
                                    user: user,
                                    profile: profile,
                                    isAdmin: isAdmin,
                                    signOut: signOut
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Navbar.jsx",
                                    lineNumber: 188,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Navbar.jsx",
                            lineNumber: 177,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginHref"])(pathname),
                            size: "sm",
                            variant: "outline",
                            children: "লগইন"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Navbar.jsx",
                            lineNumber: 191,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/Navbar.jsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/Navbar.jsx",
            lineNumber: 159,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/layout/Navbar.jsx",
        lineNumber: 158,
        columnNumber: 5
    }, this);
}
_s2(Navbar, "QPpyvBq5fODh8jTP/xceW9sFy+o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthProvider$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useUnreadCount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c3 = Navbar;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "IconLink");
__turbopack_context__.k.register(_c1, "AccountMenu");
__turbopack_context__.k.register(_c2, "NavSearch");
__turbopack_context__.k.register(_c3, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/NotificationBell.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NotificationBell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthProvider$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/auth/AuthProvider.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useNotifications$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useNotifications.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Icons.jsx [app-client] (ecmascript)");
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
const KIND_ICON = {
    report: 'flag',
    dispute: 'alert',
    order: 'receipt',
    wallet: 'wallet',
    message: 'chat',
    deposit: 'wallet',
    withdrawal: 'wallet',
    moderation: 'shield',
    system: 'sparkle'
};
const URGENT = new Set([
    'report',
    'dispute',
    'deposit',
    'withdrawal'
]);
// A short two-tone chime for admins when something needs attention. No audio file needed.
function chime() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        [
            660,
            880
        ].forEach((f, i)=>{
            const o = ctx.createOscillator();
            const g = ctx.createGain();
            o.frequency.value = f;
            o.connect(g);
            g.connect(ctx.destination);
            const t = ctx.currentTime + i * 0.16;
            g.gain.setValueAtTime(0.0001, t);
            g.gain.exponentialRampToValueAtTime(0.18, t + 0.02);
            g.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
            o.start(t);
            o.stop(t + 0.3);
        });
    } catch  {}
}
function NotificationBell() {
    _s();
    const { user, isAdmin } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthProvider$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const onNew = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "NotificationBell.useCallback[onNew]": (n)=>{
            // Messages already have their own badge; everything else gets a toast.
            if (n.kind === 'message') return;
            const urgent = isAdmin && URGENT.has(n.kind);
            if (urgent) chime();
            const show = urgent ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"];
            show(n.title, {
                description: n.body,
                duration: urgent ? 12000 : 5000,
                action: n.link ? {
                    label: 'দেখুন',
                    onClick: ({
                        "NotificationBell.useCallback[onNew]": ()=>window.location.href = n.link
                    })["NotificationBell.useCallback[onNew]"]
                } : undefined
            });
        }
    }["NotificationBell.useCallback[onNew]"], [
        isAdmin
    ]);
    const { items, unread, markAllRead } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useNotifications$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(user?.id, onNew);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NotificationBell.useEffect": ()=>{
            if (!open) return;
            const onDown = {
                "NotificationBell.useEffect.onDown": (e)=>!ref.current?.contains(e.target) && setOpen(false)
            }["NotificationBell.useEffect.onDown"];
            const onKey = {
                "NotificationBell.useEffect.onKey": (e)=>e.key === 'Escape' && setOpen(false)
            }["NotificationBell.useEffect.onKey"];
            document.addEventListener('mousedown', onDown);
            document.addEventListener('keydown', onKey);
            return ({
                "NotificationBell.useEffect": ()=>{
                    document.removeEventListener('mousedown', onDown);
                    document.removeEventListener('keydown', onKey);
                }
            })["NotificationBell.useEffect"];
        }
    }["NotificationBell.useEffect"], [
        open
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setOpen((o)=>!o),
                "aria-label": `নোটিফিকেশন${unread ? `, ${unread}টি নতুন` : ''}`,
                "aria-expanded": open,
                className: "relative flex h-10 w-10 items-center justify-center rounded-full text-teal-900/70 transition hover:bg-teal-900/[0.07]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        name: "bell"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/NotificationBell.jsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    unread > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-rose-500 px-1 text-[11px] font-bold leading-none text-white ring-2 ring-white",
                        children: unread > 9 ? '9+' : unread
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/NotificationBell.jsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/NotificationBell.jsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-x-3 top-[68px] z-50 overflow-hidden rounded-3xl border border-teal-900/10 bg-white shadow-[0_30px_60px_-24px_rgba(10,61,56,0.5)] sm:absolute sm:inset-x-auto sm:right-0 sm:top-[calc(100%+10px)] sm:w-[380px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between border-b border-teal-900/10 px-5 py-3.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-display text-lg font-bold text-teal-950",
                                children: "নোটিফিকেশন"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/NotificationBell.jsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this),
                            unread > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: markAllRead,
                                className: "text-sm font-semibold text-teal-700 hover:text-teal-900",
                                children: "সব পড়া হয়েছে"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/NotificationBell.jsx",
                                lineNumber: 88,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/NotificationBell.jsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "max-h-[60vh] overflow-y-auto",
                        children: items.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "px-5 py-12 text-center text-sm text-slate-500",
                            children: "এখনো কোনো নোটিফিকেশন নেই"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/NotificationBell.jsx",
                            lineNumber: 95,
                            columnNumber: 15
                        }, this) : items.map((n)=>{
                            const inner = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `flex gap-3 px-5 py-3.5 transition hover:bg-teal-900/[0.04] ${n.read_at ? '' : 'bg-teal-50/70'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${URGENT.has(n.kind) ? 'bg-rose-100 text-rose-700' : 'bg-teal-900/[0.07] text-teal-800'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            name: KIND_ICON[n.kind] || 'bell',
                                            className: "h-[18px] w-[18px]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/NotificationBell.jsx",
                                            lineNumber: 105,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/NotificationBell.jsx",
                                        lineNumber: 100,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0 flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `text-[14.5px] leading-snug ${n.read_at ? 'text-slate-700' : 'font-semibold text-teal-950'}`,
                                                children: n.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/NotificationBell.jsx",
                                                lineNumber: 108,
                                                columnNumber: 23
                                            }, this),
                                            n.body && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-0.5 line-clamp-2 text-[13px] text-slate-500",
                                                children: n.body
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/NotificationBell.jsx",
                                                lineNumber: 109,
                                                columnNumber: 34
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-xs text-slate-400",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timeAgo"])(n.created_at)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/NotificationBell.jsx",
                                                lineNumber: 110,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/NotificationBell.jsx",
                                        lineNumber: 107,
                                        columnNumber: 21
                                    }, this),
                                    !n.read_at && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mt-2 h-2 w-2 shrink-0 rounded-full bg-teal-600"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/NotificationBell.jsx",
                                        lineNumber: 112,
                                        columnNumber: 36
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/NotificationBell.jsx",
                                lineNumber: 99,
                                columnNumber: 19
                            }, this);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "border-b border-teal-900/[0.05] last:border-0",
                                children: n.link ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: n.link,
                                    onClick: ()=>setOpen(false),
                                    children: inner
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/NotificationBell.jsx",
                                    lineNumber: 118,
                                    columnNumber: 23
                                }, this) : inner
                            }, n.id, false, {
                                fileName: "[project]/src/components/layout/NotificationBell.jsx",
                                lineNumber: 116,
                                columnNumber: 19
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/NotificationBell.jsx",
                        lineNumber: 93,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/NotificationBell.jsx",
                lineNumber: 84,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/NotificationBell.jsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
_s(NotificationBell, "ftmxO0c7Xm6451y94Z4NGNgw/HY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthProvider$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useNotifications$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = NotificationBell;
var _c;
__turbopack_context__.k.register(_c, "NotificationBell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/Button.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Feedback$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Feedback.jsx [app-client] (ecmascript)");
;
;
;
const VARIANTS = {
    // Marigold is reserved for the money actions: Search, Buy via Escrow, Pay.
    primary: 'bg-amber-400 text-teal-950 shadow-[0_10px_24px_-10px_rgba(217,119,6,0.8),inset_0_1px_0_rgba(255,255,255,0.5)] hover:bg-amber-300 hover:shadow-[0_14px_30px_-10px_rgba(217,119,6,0.9),inset_0_1px_0_rgba(255,255,255,0.5)]',
    dark: 'bg-teal-900 text-white shadow-[0_10px_24px_-12px_rgba(10,61,56,0.85)] hover:bg-teal-800',
    soft: 'bg-teal-900/[0.06] text-teal-950 hover:bg-teal-900/10',
    outline: 'bg-white text-teal-950 ring-1 ring-inset ring-teal-900/15 hover:bg-teal-50/70 hover:ring-teal-900/30',
    danger: 'bg-rose-600 text-white shadow-[0_10px_24px_-12px_rgba(225,29,72,0.8)] hover:bg-rose-500',
    glass: 'bg-white/10 text-white ring-1 ring-inset ring-white/25 backdrop-blur-md hover:bg-white/20'
};
const SIZES = {
    sm: 'h-9 rounded-xl px-3.5 text-sm',
    md: 'h-11 rounded-xl px-5 text-[15px]',
    lg: 'h-[52px] rounded-2xl px-7 text-base'
};
function Button({ variant = 'dark', size = 'md', loading = false, href, className = '', children, disabled, type = 'button', ...rest }) {
    const cls = `inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition duration-200 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 ${VARIANTS[variant]} ${SIZES[size]} ${className}`;
    if (href && !disabled) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: href,
            className: cls,
            ...rest,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/ui/Button.jsx",
            lineNumber: 37,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: type,
        className: cls,
        disabled: disabled || loading,
        "aria-busy": loading || undefined,
        ...rest,
        children: [
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Feedback$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spinner"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Button.jsx",
                lineNumber: 44,
                columnNumber: 19
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Button.jsx",
        lineNumber: 43,
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
"[project]/src/components/ui/Feedback.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EmptyState",
    ()=>EmptyState,
    "ErrorState",
    ()=>ErrorState,
    "PageSpinner",
    ()=>PageSpinner,
    "Skeleton",
    ()=>Skeleton,
    "Spinner",
    ()=>Spinner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Icons.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button.jsx [app-client] (ecmascript)");
;
;
;
function Spinner({ className = 'h-5 w-5' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: `animate-spin ${className}`,
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "12",
                r: "9",
                stroke: "currentColor",
                strokeOpacity: "0.25",
                strokeWidth: "3"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Feedback.jsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M21 12a9 9 0 0 0-9-9",
                stroke: "currentColor",
                strokeWidth: "3",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Feedback.jsx",
                lineNumber: 8,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Feedback.jsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
_c = Spinner;
function PageSpinner({ label = 'লোড হচ্ছে...' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "status",
        className: "flex min-h-[60vh] flex-col items-center justify-center gap-3 text-teal-800",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Spinner, {
                className: "h-8 w-8"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Feedback.jsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm text-slate-500",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Feedback.jsx",
                lineNumber: 17,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Feedback.jsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c1 = PageSpinner;
function Skeleton({ className = '' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `skeleton rounded-xl ${className}`,
        "aria-hidden": "true"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Feedback.jsx",
        lineNumber: 23,
        columnNumber: 10
    }, this);
}
_c2 = Skeleton;
function EmptyState({ icon = 'search', title, children, action }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center rounded-3xl border border-dashed border-teal-900/15 bg-white/60 px-6 py-16 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-900/[0.06] text-teal-800",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    name: icon,
                    className: "h-7 w-7"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/Feedback.jsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Feedback.jsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "font-display text-xl font-bold text-teal-950",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Feedback.jsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            children && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 max-w-md text-[15px] leading-relaxed text-slate-500",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Feedback.jsx",
                lineNumber: 33,
                columnNumber: 20
            }, this),
            action && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6",
                children: action
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Feedback.jsx",
                lineNumber: 34,
                columnNumber: 18
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Feedback.jsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_c3 = EmptyState;
function ErrorState({ title = 'লোড করা যায়নি', message, onRetry }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "alert",
        className: "flex flex-col items-center rounded-3xl border border-rose-200 bg-rose-50/70 px-6 py-14 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-700",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    name: "alert",
                    className: "h-7 w-7"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/Feedback.jsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Feedback.jsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "font-display text-xl font-bold text-rose-900",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Feedback.jsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 max-w-md text-[15px] leading-relaxed text-rose-800/80",
                children: message
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Feedback.jsx",
                lineNumber: 46,
                columnNumber: 19
            }, this),
            onRetry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                className: "mt-6",
                variant: "dark",
                onClick: onRetry,
                children: "আবার চেষ্টা করুন"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Feedback.jsx",
                lineNumber: 48,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Feedback.jsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_c4 = ErrorState;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "Spinner");
__turbopack_context__.k.register(_c1, "PageSpinner");
__turbopack_context__.k.register(_c2, "Skeleton");
__turbopack_context__.k.register(_c3, "EmptyState");
__turbopack_context__.k.register(_c4, "ErrorState");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/Icons.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Icon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const PATHS = {
    search: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "11",
                cy: "11",
                r: "7"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 2,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m20 20-3.5-3.5"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 2,
                columnNumber: 45
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 2,
        columnNumber: 11
    }, ("TURBOPACK compile-time value", void 0)),
    pin: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 3,
                columnNumber: 10
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "10",
                r: "2.5"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 3,
                columnNumber: 73
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 3,
        columnNumber: 8
    }, ("TURBOPACK compile-time value", void 0)),
    plus: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "M12 5v14M5 12h14"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 4,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)),
    chat: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 5,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)),
    shield: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 3l7 3v5c0 5-3.2 8.2-7 10-3.8-1.8-7-5-7-10V6l7-3z"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 6,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m9 12 2 2 4-4"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 6,
                columnNumber: 78
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 6,
        columnNumber: 11
    }, ("TURBOPACK compile-time value", void 0)),
    x: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "M6 6l12 12M18 6 6 18"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 7,
        columnNumber: 6
    }, ("TURBOPACK compile-time value", void 0)),
    filter: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4 7h9M17 7h3M4 17h3M11 17h9"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 8,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "15",
                cy: "7",
                r: "2"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 8,
                columnNumber: 54
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "9",
                cy: "17",
                r: "2"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 8,
                columnNumber: 85
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 8,
        columnNumber: 11
    }, ("TURBOPACK compile-time value", void 0)),
    check: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "m5 12.5 4.5 4.5L19 7"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 9,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0)),
    back: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "M19 12H5m6-6-6 6 6 6"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 10,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)),
    next: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "m9 6 6 6-6 6"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 11,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)),
    prev: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "m15 6-6 6 6 6"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 12,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)),
    send: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "M21 3 10 14M21 3l-7 18-4-7-7-4 18-7z"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 13,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)),
    user: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "8",
                r: "4"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 14,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4 21c1-4 4-6 8-6s7 2 8 6"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 14,
                columnNumber: 42
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 14,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)),
    logout: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "M9 21H5V3h4M16 17l5-5-5-5M21 12H9"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 15,
        columnNumber: 11
    }, ("TURBOPACK compile-time value", void 0)),
    bag: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M5 8h14l-1 12H6L5 8z"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 16,
                columnNumber: 10
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M9 8V6a3 3 0 0 1 6 0v2"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 16,
                columnNumber: 43
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 16,
        columnNumber: 8
    }, ("TURBOPACK compile-time value", void 0)),
    clock: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "12",
                r: "9"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 17,
                columnNumber: 12
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 7v5l3 2"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 17,
                columnNumber: 44
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 17,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0)),
    box: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3 8l9-5 9 5v8l-9 5-9-5V8z"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 18,
                columnNumber: 10
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m3 8 9 5 9-5M12 13v8"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 18,
                columnNumber: 49
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 18,
        columnNumber: 8
    }, ("TURBOPACK compile-time value", void 0)),
    alert: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 3 2 20h20L12 3z"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 19,
                columnNumber: 12
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 10v4M12 17.5v.5"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 19,
                columnNumber: 44
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 19,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0)),
    lock: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "5",
                y: "11",
                width: "14",
                height: "9",
                rx: "2"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 20,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8 11V8a4 4 0 0 1 8 0v3"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 20,
                columnNumber: 61
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 20,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)),
    down: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "m6 9 6 6 6-6"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 21,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)),
    image: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "3",
                y: "4",
                width: "18",
                height: "16",
                rx: "2"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 22,
                columnNumber: 12
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "9",
                cy: "10",
                r: "1.5"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 22,
                columnNumber: 62
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m21 16-5-5-8 8"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 22,
                columnNumber: 95
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 22,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0)),
    upload: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "M12 16V4m0 0-4 4m4-4 4 4M4 20h16"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 23,
        columnNumber: 11
    }, ("TURBOPACK compile-time value", void 0)),
    trash: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 24,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0)),
    wallet: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3 7a2 2 0 0 1 2-2h13v4"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 25,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3 7v11a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1H5a2 2 0 0 1-2-2z"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 25,
                columnNumber: 49
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "16.5",
                cy: "14.5",
                r: "1.2"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 25,
                columnNumber: 134
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 25,
        columnNumber: 11
    }, ("TURBOPACK compile-time value", void 0)),
    bell: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6z"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 26,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M10 19a2 2 0 0 0 4 0"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 26,
                columnNumber: 66
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 26,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)),
    edit: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4z"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 27,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m13.5 6.5 4 4"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 27,
                columnNumber: 62
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 27,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)),
    flag: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M5 21V4"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 28,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M5 4h11l-2 4 2 4H5"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 28,
                columnNumber: 31
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 28,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)),
    eye: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 29,
                columnNumber: 10
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "12",
                r: "3"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 29,
                columnNumber: 71
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 29,
        columnNumber: 8
    }, ("TURBOPACK compile-time value", void 0)),
    users: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "9",
                cy: "8",
                r: "3.5"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 30,
                columnNumber: 12
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 30,
                columnNumber: 44
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.7c2 .6 3.2 2.3 3.5 5.3"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 30,
                columnNumber: 103
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 30,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0)),
    dashboard: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "3",
                y: "3",
                width: "7",
                height: "9",
                rx: "1.5"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 31,
                columnNumber: 16
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "14",
                y: "3",
                width: "7",
                height: "5",
                rx: "1.5"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 31,
                columnNumber: 66
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "14",
                y: "12",
                width: "7",
                height: "9",
                rx: "1.5"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 31,
                columnNumber: 117
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "3",
                y: "16",
                width: "7",
                height: "5",
                rx: "1.5"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 31,
                columnNumber: 169
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 31,
        columnNumber: 14
    }, ("TURBOPACK compile-time value", void 0)),
    settings: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "12",
                r: "3"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 32,
                columnNumber: 15
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 32,
                columnNumber: 47
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 32,
        columnNumber: 13
    }, ("TURBOPACK compile-time value", void 0)),
    list: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 33,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)),
    tag: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3 12V4h8l10 10-8 8L3 12z"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 34,
                columnNumber: 10
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "7.5",
                cy: "8.5",
                r: "1.2"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 34,
                columnNumber: 48
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 34,
        columnNumber: 8
    }, ("TURBOPACK compile-time value", void 0)),
    menu: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "M4 6h16M4 12h16M4 18h16"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 35,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)),
    arrowUp: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "M12 19V5m-6 6 6-6 6 6"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 36,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0)),
    arrowDown: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "M12 5v14m6-6-6 6-6-6"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 37,
        columnNumber: 14
    }, ("TURBOPACK compile-time value", void 0)),
    ban: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "12",
                r: "9"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 38,
                columnNumber: 10
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m5.7 5.7 12.6 12.6"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 38,
                columnNumber: 42
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 38,
        columnNumber: 8
    }, ("TURBOPACK compile-time value", void 0)),
    home: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9z"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 39,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)),
    star: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 40,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)),
    external: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "M14 4h6v6M20 4 10 14M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 41,
        columnNumber: 13
    }, ("TURBOPACK compile-time value", void 0)),
    camera: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 42,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "13",
                r: "3.5"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 42,
                columnNumber: 107
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 42,
        columnNumber: 11
    }, ("TURBOPACK compile-time value", void 0)),
    share: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "6",
                cy: "12",
                r: "2.5"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 43,
                columnNumber: 12
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "18",
                cy: "6",
                r: "2.5"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 43,
                columnNumber: 45
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "18",
                cy: "18",
                r: "2.5"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 43,
                columnNumber: 78
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 43,
                columnNumber: 112
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 43,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0)),
    trend: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "m3 17 6-6 4 4 8-8M15 7h6v6"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 44,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0)),
    doublecheck: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "m2 12.5 4.5 4.5L15 8.5M9 16l1 1 9-9"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 45,
        columnNumber: 16
    }, ("TURBOPACK compile-time value", void 0)),
    receipt2: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "M6 3h12v18l-3-2-3 2-3-2-3 2V3z"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 46,
        columnNumber: 13
    }, ("TURBOPACK compile-time value", void 0)),
    book: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5z"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 47,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4 19a2 2 0 0 1 2-2h13"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 47,
                columnNumber: 67
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 47,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)),
    laptop: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "4",
                y: "5",
                width: "16",
                height: "11",
                rx: "1.5"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 48,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M2 19h20"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 48,
                columnNumber: 65
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 48,
        columnNumber: 11
    }, ("TURBOPACK compile-time value", void 0)),
    pencil: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "m4 20 1-4L16 5l3 3L8 19l-4 1zM14 7l3 3"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 49,
        columnNumber: 11
    }, ("TURBOPACK compile-time value", void 0)),
    shirt: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "m8 3-5 3 2.5 4L8 9v12h8V9l2.5 1L21 6l-5-3a4 4 0 0 1-8 0z"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 50,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0)),
    bed: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 51,
                columnNumber: 10
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "7",
                cy: "11",
                r: "1.5"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 51,
                columnNumber: 68
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 51,
        columnNumber: 8
    }, ("TURBOPACK compile-time value", void 0)),
    grid: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "4",
                y: "4",
                width: "7",
                height: "7",
                rx: "1.5"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 52,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "13",
                y: "4",
                width: "7",
                height: "7",
                rx: "1.5"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 52,
                columnNumber: 61
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "4",
                y: "13",
                width: "7",
                height: "7",
                rx: "1.5"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 52,
                columnNumber: 112
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "13",
                y: "13",
                width: "7",
                height: "7",
                rx: "1.5"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 52,
                columnNumber: 163
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 52,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)),
    note: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M6 3h9l4 4v14H6V3z"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 53,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M14 3v5h5M9 13h7M9 17h5"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 53,
                columnNumber: 42
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 53,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)),
    card: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "3",
                y: "5",
                width: "18",
                height: "14",
                rx: "2"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 54,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3 10h18M7 15h4"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Icons.jsx",
                lineNumber: 54,
                columnNumber: 61
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 54,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)),
    sparkle: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 55,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0)),
    receipt: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "M6 3h12v18l-3-2-3 2-3-2-3 2V3zM9 8h6M9 12h6"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 56,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0))
};
function Icon({ name, className = 'h-5 w-5', strokeWidth = 1.8, ...rest }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: `shrink-0 ${className}`,
        "aria-hidden": "true",
        ...rest,
        children: PATHS[name]
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Icons.jsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
_c = Icon;
var _c;
__turbopack_context__.k.register(_c, "Icon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/Media.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Avatar",
    ()=>Avatar,
    "SmartImage",
    ()=>SmartImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Icons.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/format.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function SmartImage({ src, alt, className = '' }) {
    _s();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('loading') // loading | ready | error
    ;
    if (!src || state === 'error') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `flex items-center justify-center bg-teal-900/[0.05] text-teal-800/50 ${className}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                name: "image",
                className: "h-9 w-9",
                strokeWidth: 1.4
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Media.jsx",
                lineNumber: 12,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/Media.jsx",
            lineNumber: 11,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative overflow-hidden ${className}`,
        children: [
            state === 'loading' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "skeleton absolute inset-0 rounded-none"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Media.jsx",
                lineNumber: 18,
                columnNumber: 31
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: src,
                alt: alt,
                loading: "lazy",
                decoding: "async",
                onLoad: ()=>setState('ready'),
                onError: ()=>setState('error'),
                className: `h-full w-full object-cover transition duration-500 ${state === 'ready' ? 'opacity-100' : 'opacity-0'}`
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Media.jsx",
                lineNumber: 20,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Media.jsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_s(SmartImage, "y/hGu3n0PNRpW1dJ+mSELSzYC9o=");
_c = SmartImage;
function Avatar({ name, url, className = 'h-10 w-10 text-sm' }) {
    if (url) {
        // eslint-disable-next-line @next/next/no-img-element
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: url,
            alt: "",
            className: `shrink-0 rounded-full object-cover ${className}`
        }, void 0, false, {
            fileName: "[project]/src/components/ui/Media.jsx",
            lineNumber: 36,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        "aria-hidden": "true",
        className: `flex shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0d9488,#0a3d38)] font-bold text-white ${className}`,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initials"])(name)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Media.jsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_c1 = Avatar;
var _c, _c1;
__turbopack_context__.k.register(_c, "SmartImage");
__turbopack_context__.k.register(_c1, "Avatar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useNotifications.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>useNotifications
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$notifications$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/notifications.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function useNotifications(userId, onNew) {
    _s();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useNotifications.useCallback[load]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$notifications$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchNotifications"])().then(setItems).catch({
                "useNotifications.useCallback[load]": ()=>{}
            }["useNotifications.useCallback[load]"])
    }["useNotifications.useCallback[load]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useNotifications.useEffect": ()=>{
            if (!userId) {
                setItems([]);
                return;
            }
            load();
            const channel = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].channel(`notif:${userId}`).on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'notifications',
                filter: `user_id=eq.${userId}`
            }, {
                "useNotifications.useEffect.channel": ({ new: n })=>{
                    setItems({
                        "useNotifications.useEffect.channel": (prev)=>[
                                n,
                                ...prev
                            ].slice(0, 25)
                    }["useNotifications.useEffect.channel"]);
                    onNew?.(n);
                }
            }["useNotifications.useEffect.channel"]).subscribe();
            return ({
                "useNotifications.useEffect": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].removeChannel(channel)
            })["useNotifications.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["useNotifications.useEffect"], [
        userId,
        load
    ]);
    const markAllRead = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useNotifications.useCallback[markAllRead]": async ()=>{
            setItems({
                "useNotifications.useCallback[markAllRead]": (prev)=>prev.map({
                        "useNotifications.useCallback[markAllRead]": (n)=>({
                                ...n,
                                read_at: n.read_at || new Date().toISOString()
                            })
                    }["useNotifications.useCallback[markAllRead]"])
            }["useNotifications.useCallback[markAllRead]"]);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$notifications$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["markNotificationsRead"])();
        }
    }["useNotifications.useCallback[markAllRead]"], []);
    return {
        items,
        unread: items.filter((n)=>!n.read_at).length,
        markAllRead,
        reload: load
    };
}
_s(useNotifications, "AaB5omwUyIQ3396GjGEvJXhRxWA=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useUnreadCount.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>useUnreadCount
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$chat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/chat.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function useUnreadCount(userId) {
    _s();
    const [count, setCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useUnreadCount.useEffect": ()=>{
            if (!userId) {
                setCount(0);
                return;
            }
            let alive = true;
            const refresh = {
                "useUnreadCount.useEffect.refresh": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$chat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchUnreadCount"])(userId).then({
                        "useUnreadCount.useEffect.refresh": (n)=>alive && setCount(n)
                    }["useUnreadCount.useEffect.refresh"]).catch({
                        "useUnreadCount.useEffect.refresh": ()=>{}
                    }["useUnreadCount.useEffect.refresh"])
            }["useUnreadCount.useEffect.refresh"];
            refresh();
            // RLS means we only ever receive events for conversations we belong to.
            const channel = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].channel(`unread:${userId}`).on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'messages'
            }, refresh).subscribe();
            return ({
                "useUnreadCount.useEffect": ()=>{
                    alive = false;
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].removeChannel(channel);
                }
            })["useUnreadCount.useEffect"];
        }
    }["useUnreadCount.useEffect"], [
        userId
    ]);
    return count;
}
_s(useUnreadCount, "/xL7qdScToREtqzbt5GZ1kHtYjQ=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useWallet.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>useWallet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/wallet.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function useWallet(userId) {
    _s();
    const [balance, setBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWallet.useCallback[load]": ()=>{
            if (userId) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchWallet"])(userId).then(setBalance).catch({
                "useWallet.useCallback[load]": ()=>setBalance(0)
            }["useWallet.useCallback[load]"]);
        }
    }["useWallet.useCallback[load]"], [
        userId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWallet.useEffect": ()=>{
            if (!userId) return;
            load();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeWallet"])(userId, load);
        }
    }["useWallet.useEffect"], [
        userId,
        load
    ]);
    return {
        balance,
        reload: load
    };
}
_s(useWallet, "cCyLbFllUCdNfvbW30FJY+h1SmI=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/errors.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "friendlyError",
    ()=>friendlyError
]);
// Our SQL functions raise short codes (e.g. 'LISTING_UNAVAILABLE'); map them to Bangla here.
const CODES = {
    NOT_AUTHENTICATED: 'আগে লগইন করুন।',
    NOT_ALLOWED: 'এই কাজটি করার অনুমতি আপনার নেই।',
    LISTING_NOT_FOUND: 'প্রোডাক্টটি আর পাওয়া যাচ্ছে না।',
    LISTING_NO_SELLER: 'এই প্রোডাক্টের বিক্রেতার তথ্য নেই, তাই এখানে চ্যাট বা কেনা যাবে না।',
    LISTING_UNAVAILABLE: 'প্রোডাক্টটি আর পাওয়া যাচ্ছে না। হয়তো অন্য কেউ আগেই কিনে ফেলেছেন।',
    LISTING_RESERVED: 'চালু অর্ডার থাকায় এখন এটি বদলানো যাবে না।',
    OWN_LISTING: 'নিজের প্রোডাক্ট নিজে কেনা যাবে না।',
    INVALID_PRICE: 'প্রোডাক্টের দাম ঠিক নেই, তাই কেনা যাচ্ছে না।',
    ORDER_NOT_FOUND: 'অর্ডারটি খুঁজে পাওয়া যায়নি।',
    INVALID_STATE: 'অর্ডারের অবস্থা বদলে গেছে। পেজটি রিফ্রেশ করে আবার দেখুন।',
    PAYMENTS_LIVE: 'টেস্ট পেমেন্ট বন্ধ। পেমেন্ট গেটওয়ে দিয়ে টাকা দিন।',
    REASON_TOO_SHORT: 'কারণটি অন্তত কয়েক শব্দে লিখুন।',
    USE_WALLET: 'এখন ওয়ালেট থেকে পেমেন্ট করতে হবে।',
    INSUFFICIENT_BALANCE: 'ওয়ালেটে যথেষ্ট ব্যালেন্স নেই। আগে টাকা যোগ করুন।',
    ACCOUNT_BANNED: 'আপনার অ্যাকাউন্ট সীমিত করা হয়েছে। সাপোর্টে যোগাযোগ করুন।',
    AMOUNT_TOO_LOW: 'পরিমাণ সর্বনিম্ন সীমার চেয়ে কম।',
    AMOUNT_TOO_HIGH: 'পরিমাণ সর্বোচ্চ সীমার চেয়ে বেশি।',
    INVALID_AMOUNT: 'সঠিক পরিমাণ লিখুন।',
    INVALID_TRX: 'TrxID সঠিক নয়। ৬-২০ অক্ষরের অক্ষর/সংখ্যা দিন।',
    INVALID_NUMBER: 'নম্বরটি সঠিক নয়। ০১XXXXXXXXX ফরম্যাটে দিন।',
    TOO_MANY_PENDING: 'আপনার ৫টি অনুরোধ এখনো যাচাই বাকি। অপেক্ষা করুন।',
    PAYMENTS_TEST_MODE: 'সাইট এখন টেস্ট মোডে। আসল ডিপোজিট চালু হয়নি।',
    DAILY_LIMIT: 'আজকের উত্তোলনের সীমা পার হয়ে যাবে।',
    REF_REQUIRED: 'পেআউটের রেফারেন্স/TrxID দিন।',
    TOO_MANY_REPORTS: 'আজ অনেক রিপোর্ট করেছেন। কাল আবার চেষ্টা করুন।',
    NOT_FOUND: 'খুঁজে পাওয়া যায়নি।'
};
function friendlyError(err, fallback = 'কিছু একটা সমস্যা হয়েছে। একটু পরে আবার চেষ্টা করুন।') {
    if (!err) return fallback;
    if (err.name === 'AbortError') return null // cancelled request, not a real error
    ;
    const msg = String(err.message || '');
    const low = msg.toLowerCase();
    const code = err.code;
    if (CODES[msg]) return CODES[msg];
    if (low.includes('failed to fetch') || low.includes('networkerror') || low.includes('load failed')) return 'ইন্টারনেট সংযোগ নেই বা দুর্বল। সংযোগ দেখে আবার চেষ্টা করুন।';
    // Auth
    if (low.includes('invalid login credentials')) return 'ইমেইল বা পাসওয়ার্ড ভুল।';
    if (low.includes('user already registered')) return 'এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা আছে। লগইন করুন।';
    if (low.includes('email not confirmed')) return 'আগে ইমেইলে পাঠানো লিংকে ক্লিক করে অ্যাকাউন্ট ভেরিফাই করুন।';
    if (low.includes('password should be at least')) return 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।';
    if (low.includes('rate limit') || code === 'over_email_send_rate_limit') return 'অল্প সময়ে অনেকবার চেষ্টা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।';
    // Postgres / PostgREST
    if (code === '42501' || low.includes('row-level security') || low.includes('permission denied')) return 'এই কাজের অনুমতি নেই। লগইন করা আছে কিনা দেখুন।';
    if (code === 'PGRST202' || code === '42P01' || code === 'PGRST205' || low.includes('does not exist')) return 'এই ফিচারের ডাটাবেস সেটআপ বাকি আছে। /supabase ফোল্ডারের SQL ফাইলটি চালান।';
    if (code === '23505') {
        if (low.includes('deposit_trx')) return 'এই TrxID আগেই ব্যবহার করা হয়েছে।';
        if (low.includes('reports_one_open')) return 'আপনি আগেই এটি রিপোর্ট করেছেন। আমাদের টিম দেখছে।';
        return 'এটি আগেই করা হয়েছে।';
    }
    if (low.includes('bucket not found')) return 'ছবি রাখার বাকেট (product-images) পাওয়া যায়নি।';
    return fallback;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/format.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// en-IN gives lakh/crore grouping (1,00,000), which is how Bangladesh writes numbers.
__turbopack_context__.s([
    "formatDate",
    ()=>formatDate,
    "formatDateTime",
    ()=>formatDateTime,
    "formatPrice",
    ()=>formatPrice,
    "formatTime",
    ()=>formatTime,
    "initials",
    ()=>initials,
    "isSameDay",
    ()=>isSameDay,
    "loginHref",
    ()=>loginHref,
    "safeNext",
    ()=>safeNext,
    "timeAgo",
    ()=>timeAgo
]);
const formatPrice = (n)=>`৳${Number(n ?? 0).toLocaleString('en-IN')}`;
const rtf = typeof Intl !== 'undefined' ? new Intl.RelativeTimeFormat('bn', {
    numeric: 'auto'
}) : null;
function timeAgo(date) {
    if (!date || !rtf) return '';
    const diff = (new Date(date).getTime() - Date.now()) / 1000;
    const steps = [
        [
            'year',
            31536000
        ],
        [
            'month',
            2592000
        ],
        [
            'week',
            604800
        ],
        [
            'day',
            86400
        ],
        [
            'hour',
            3600
        ],
        [
            'minute',
            60
        ]
    ];
    for (const [unit, secs] of steps){
        if (Math.abs(diff) >= secs) return rtf.format(Math.round(diff / secs), unit);
    }
    return 'এইমাত্র';
}
const formatDate = (date)=>date ? new Date(date).toLocaleDateString('bn-BD', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }) : '';
const formatTime = (date)=>date ? new Date(date).toLocaleTimeString('bn-BD', {
        hour: 'numeric',
        minute: '2-digit'
    }) : '';
const formatDateTime = (date)=>date ? `${formatDate(date)}, ${formatTime(date)}` : '';
const isSameDay = (a, b)=>new Date(a).toDateString() === new Date(b).toDateString();
const initials = (name)=>(name || '?').trim().split(/\s+/).slice(0, 2).map((w)=>Array.from(w)[0]).join('').toUpperCase();
const safeNext = (next)=>next && next.startsWith('/') && !next.startsWith('//') ? next : '/';
const loginHref = (next)=>`/login?next=${encodeURIComponent(next || '/')}`;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/services/chat.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchConversation",
    ()=>fetchConversation,
    "fetchConversations",
    ()=>fetchConversations,
    "fetchMessages",
    ()=>fetchMessages,
    "fetchUnreadByConversation",
    ()=>fetchUnreadByConversation,
    "fetchUnreadCount",
    ()=>fetchUnreadCount,
    "markAllDelivered",
    ()=>markAllDelivered,
    "markConversationDelivered",
    ()=>markConversationDelivered,
    "markConversationRead",
    ()=>markConversationRead,
    "sendMessage",
    ()=>sendMessage,
    "startConversation",
    ()=>startConversation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.js [app-client] (ecmascript)");
;
async function startConversation(listingId, buyerId) {
    const args = {
        p_listing_id: String(listingId)
    };
    if (buyerId) args.p_buyer_id = buyerId;
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].rpc('start_conversation', args);
    if (error) throw error;
    return data // conversation id
    ;
}
const CONVERSATION_SELECT = `
  id, listing_id, buyer_id, seller_id, last_message_at, last_message_preview, last_sender_id,
  listing:listings(id, title, price, image_url, status),
  buyer:profiles!conversations_buyer_id_fkey(id, full_name, avatar_url, last_seen_at),
  seller:profiles!conversations_seller_id_fkey(id, full_name, avatar_url, last_seen_at)
`;
async function fetchConversations() {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('conversations').select(CONVERSATION_SELECT).order('last_message_at', {
        ascending: false
    }).limit(100);
    if (error) throw error;
    return data ?? [];
}
async function fetchConversation(id) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('conversations').select(CONVERSATION_SELECT).eq('id', id).maybeSingle();
    if (error) throw error;
    return data;
}
async function fetchMessages(conversationId, { before, limit = 40 } = {}) {
    let q = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('messages').select('id, conversation_id, sender_id, body, created_at, delivered_at, read_at').eq('conversation_id', conversationId).order('created_at', {
        ascending: false
    }).limit(limit);
    if (before) q = q.lt('created_at', before);
    const { data, error } = await q;
    if (error) throw error;
    return (data ?? []).reverse() // oldest -> newest for display
    ;
}
async function sendMessage(conversationId, body) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('messages').insert({
        conversation_id: conversationId,
        body
    }).select('id, conversation_id, sender_id, body, created_at, delivered_at, read_at').single();
    if (error) throw error;
    return data;
}
const markConversationRead = (conversationId)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].rpc('mark_conversation_read', {
        p_conversation_id: conversationId
    });
async function fetchUnreadByConversation(userId) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('messages').select('conversation_id').is('read_at', null).neq('sender_id', userId).limit(1000);
    if (error) throw error;
    return (data ?? []).reduce((acc, m)=>({
            ...acc,
            [m.conversation_id]: (acc[m.conversation_id] || 0) + 1
        }), {});
}
async function fetchUnreadCount(userId) {
    const { count, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('messages').select('id', {
        count: 'exact',
        head: true
    }).is('read_at', null).neq('sender_id', userId);
    if (error) throw error;
    return count ?? 0;
}
const markConversationDelivered = (conversationId)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].rpc('mark_conversation_delivered', {
        p_conversation_id: conversationId
    });
const markAllDelivered = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].rpc('mark_all_delivered');
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/services/notifications.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchNotifications",
    ()=>fetchNotifications,
    "markNotificationsRead",
    ()=>markNotificationsRead
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.js [app-client] (ecmascript)");
;
async function fetchNotifications(limit = 25) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('notifications').select('id, kind, title, body, link, read_at, created_at').order('created_at', {
        ascending: false
    }).limit(limit);
    if (error) throw error;
    return data ?? [];
}
const markNotificationsRead = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].rpc('mark_notifications_read');
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/services/profile.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchProfile",
    ()=>fetchProfile,
    "fetchSellerStats",
    ()=>fetchSellerStats,
    "touchLastSeen",
    ()=>touchLastSeen,
    "updateProfile",
    ()=>updateProfile,
    "uploadAvatar",
    ()=>uploadAvatar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.js [app-client] (ecmascript)");
;
async function fetchProfile(id) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('profiles').select('id, full_name, avatar_url, cover_url, university, department, city, bio, created_at, last_seen_at').eq('id', id).maybeSingle();
    if (error) {
        if (error.code === '22P02') return null;
        throw error;
    }
    return data;
}
async function updateProfile(id, values) {
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('profiles').update({
        ...values,
        updated_at: new Date().toISOString()
    }).eq('id', id);
    if (error) throw error;
}
async function uploadAvatar(userId, blob, kind = 'avatar') {
    const path = `${userId}/${kind}-${Date.now()}.jpg`;
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('avatars').upload(path, blob, {
        contentType: blob.type || 'image/jpeg',
        cacheControl: '31536000',
        upsert: false
    });
    if (error) throw error;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('avatars').getPublicUrl(path).data.publicUrl;
}
const touchLastSeen = (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('profiles').update({
        last_seen_at: new Date().toISOString()
    }).eq('id', id);
async function fetchSellerStats(sellerId) {
    const [{ count: sold }, { count: active }] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('orders').select('id', {
            count: 'exact',
            head: true
        }).eq('seller_id', sellerId).eq('status', 'completed'),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('listings').select('id', {
            count: 'exact',
            head: true
        }).eq('seller_id', sellerId).eq('status', 'active')
    ]);
    return {
        sold: sold ?? 0,
        active: active ?? 0
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/services/wallet.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchLedger",
    ()=>fetchLedger,
    "fetchMyRequests",
    ()=>fetchMyRequests,
    "fetchWallet",
    ()=>fetchWallet,
    "requestWithdrawal",
    ()=>requestWithdrawal,
    "submitDeposit",
    ()=>submitDeposit,
    "subscribeWallet",
    ()=>subscribeWallet,
    "testTopup",
    ()=>testTopup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.js [app-client] (ecmascript)");
;
async function rpc(name, args) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].rpc(name, args);
    if (error) throw error;
    return data;
}
async function fetchWallet(userId) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('wallets').select('balance').eq('user_id', userId).maybeSingle();
    if (error) throw error;
    return Number(data?.balance ?? 0);
}
async function fetchLedger(userId, limit = 50) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('ledger_entries').select('id, kind, amount, balance_after, note, created_at').eq('user_id', userId).order('created_at', {
        ascending: false
    }).limit(limit);
    if (error) throw error;
    return data ?? [];
}
async function fetchMyRequests(userId) {
    const [d, w] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('deposit_requests').select('*').eq('user_id', userId).order('created_at', {
            ascending: false
        }).limit(20),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('withdrawal_requests').select('*').eq('user_id', userId).order('created_at', {
            ascending: false
        }).limit(20)
    ]);
    if (d.error) throw d.error;
    if (w.error) throw w.error;
    return {
        deposits: d.data ?? [],
        withdrawals: w.data ?? []
    };
}
const testTopup = (amount)=>rpc('test_topup', {
        p_amount: amount
    });
const submitDeposit = ({ amount, method, sender, trx })=>rpc('submit_deposit', {
        p_amount: amount,
        p_method: method,
        p_sender: sender || null,
        p_trx: trx
    });
const requestWithdrawal = ({ amount, method, account, name })=>rpc('request_withdrawal', {
        p_amount: amount,
        p_method: method,
        p_account: account,
        p_name: name || null
    });
function subscribeWallet(userId, onChange) {
    const channel = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"]// এখানে Date.now() যুক্ত করা হয়েছে যাতে চ্যানেল ক্র্যাশ না করে
    .channel(`wallet:${userId}-${Date.now()}`).on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'wallets',
        filter: `user_id=eq.${userId}`
    }, onChange).subscribe();
    return ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].removeChannel(channel);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/supabase.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
;
const url = ("TURBOPACK compile-time value", "https://pzaledrqtzjamvcfkdmf.supabase.co");
const key = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6YWxlZHJxdHpqYW12Y2ZrZG1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2NDk5MTksImV4cCI6MjEwNzIyNTkxOX0.6eriN_OaRsFmUxhRxp6iZXEHq1kL1rreGq0mM_6I6Fg");
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(url, key, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
    }
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);})()

//# sourceMappingURL=src_110_bitgtudju._.js.map