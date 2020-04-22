define('./workbox-e5601c40.js', ['exports'], function (e) {
    'use strict'
    try {
        self['workbox:core:5.1.2'] && _()
    } catch (e) {}
    const t = (e, ...t) => {
        let s = e
        return t.length > 0 && (s += ' :: ' + JSON.stringify(t)), s
    }
    class s extends Error {
        constructor(e, s) {
            super(t(e, s)), (this.name = e), (this.details = s)
        }
    }
    try {
        self['workbox:routing:5.1.2'] && _()
    } catch (e) {}
    const n = (e) => (e && 'object' == typeof e ? e : { handle: e })
    class r {
        constructor(e, t, s = 'GET') {
            ;(this.handler = n(t)), (this.match = e), (this.method = s)
        }
    }
    class i extends r {
        constructor(e, t, s) {
            super(
                ({ url: t }) => {
                    const s = e.exec(t.href)
                    if (s && (t.origin === location.origin || 0 === s.index))
                        return s.slice(1)
                },
                t,
                s
            )
        }
    }
    const o = (e) =>
        new URL(String(e), location.href).href.replace(
            new RegExp('^' + location.origin),
            ''
        )
    class c {
        constructor() {
            this.t = new Map()
        }
        get routes() {
            return this.t
        }
        addFetchListener() {
            self.addEventListener('fetch', (e) => {
                const { request: t } = e,
                    s = this.handleRequest({ request: t, event: e })
                s && e.respondWith(s)
            })
        }
        addCacheListener() {
            self.addEventListener('message', (e) => {
                if (e.data && 'CACHE_URLS' === e.data.type) {
                    const { payload: t } = e.data,
                        s = Promise.all(
                            t.urlsToCache.map((e) => {
                                'string' == typeof e && (e = [e])
                                const t = new Request(...e)
                                return this.handleRequest({ request: t })
                            })
                        )
                    e.waitUntil(s),
                        e.ports &&
                            e.ports[0] &&
                            s.then(() => e.ports[0].postMessage(!0))
                }
            })
        }
        handleRequest({ request: e, event: t }) {
            const s = new URL(e.url, location.href)
            if (!s.protocol.startsWith('http')) return
            const { params: n, route: r } = this.findMatchingRoute({
                url: s,
                request: e,
                event: t,
            })
            let i,
                o = r && r.handler
            if ((!o && this.s && (o = this.s), o)) {
                try {
                    i = o.handle({ url: s, request: e, event: t, params: n })
                } catch (e) {
                    i = Promise.reject(e)
                }
                return (
                    i instanceof Promise &&
                        this.i &&
                        (i = i.catch((n) =>
                            this.i.handle({ url: s, request: e, event: t })
                        )),
                    i
                )
            }
        }
        findMatchingRoute({ url: e, request: t, event: s }) {
            const n = this.t.get(t.method) || []
            for (const r of n) {
                let n
                const i = r.match({ url: e, request: t, event: s })
                if (i)
                    return (
                        (n = i),
                        ((Array.isArray(i) && 0 === i.length) ||
                            (i.constructor === Object &&
                                0 === Object.keys(i).length) ||
                            'boolean' == typeof i) &&
                            (n = void 0),
                        { route: r, params: n }
                    )
            }
            return {}
        }
        setDefaultHandler(e) {
            this.s = n(e)
        }
        setCatchHandler(e) {
            this.i = n(e)
        }
        registerRoute(e) {
            this.t.has(e.method) || this.t.set(e.method, []),
                this.t.get(e.method).push(e)
        }
        unregisterRoute(e) {
            if (!this.t.has(e.method))
                throw new s('unregister-route-but-not-found-with-method', {
                    method: e.method,
                })
            const t = this.t.get(e.method).indexOf(e)
            if (!(t > -1)) throw new s('unregister-route-route-not-registered')
            this.t.get(e.method).splice(t, 1)
        }
    }
    let a
    const u = () => (
        a || ((a = new c()), a.addFetchListener(), a.addCacheListener()), a
    )
    const h = {
            googleAnalytics: 'googleAnalytics',
            precache: 'precache-v2',
            prefix: 'workbox',
            runtime: 'runtime',
            suffix:
                'undefined' != typeof registration ? registration.scope : '',
        },
        l = (e) =>
            [h.prefix, e, h.suffix].filter((e) => e && e.length > 0).join('-'),
        f = (e) => e || l(h.precache),
        w = (e) => e || l(h.runtime),
        p = new Set()
    const d = (e, t) => e.filter((e) => t in e),
        y = async ({ request: e, mode: t, plugins: s = [] }) => {
            const n = d(s, 'cacheKeyWillBeUsed')
            let r = e
            for (const e of n)
                (r = await e.cacheKeyWillBeUsed.call(e, {
                    mode: t,
                    request: r,
                })),
                    'string' == typeof r && (r = new Request(r))
            return r
        },
        g = async ({
            cacheName: e,
            request: t,
            event: s,
            matchOptions: n,
            plugins: r = [],
        }) => {
            const i = await self.caches.open(e),
                o = await y({ plugins: r, request: t, mode: 'read' })
            let c = await i.match(o, n)
            for (const t of r)
                if ('cachedResponseWillBeUsed' in t) {
                    const r = t.cachedResponseWillBeUsed
                    c = await r.call(t, {
                        cacheName: e,
                        event: s,
                        matchOptions: n,
                        cachedResponse: c,
                        request: o,
                    })
                }
            return c
        },
        m = async ({
            cacheName: e,
            request: t,
            response: n,
            event: r,
            plugins: i = [],
            matchOptions: c,
        }) => {
            const a = await y({ plugins: i, request: t, mode: 'write' })
            if (!n) throw new s('cache-put-with-no-response', { url: o(a.url) })
            const u = await (async ({
                request: e,
                response: t,
                event: s,
                plugins: n = [],
            }) => {
                let r = t,
                    i = !1
                for (const t of n)
                    if ('cacheWillUpdate' in t) {
                        i = !0
                        const n = t.cacheWillUpdate
                        if (
                            ((r = await n.call(t, {
                                request: e,
                                response: r,
                                event: s,
                            })),
                            !r)
                        )
                            break
                    }
                return i || (r = r && 200 === r.status ? r : void 0), r || null
            })({ event: r, plugins: i, response: n, request: a })
            if (!u) return
            const h = await self.caches.open(e),
                l = d(i, 'cacheDidUpdate'),
                f =
                    l.length > 0
                        ? await g({ cacheName: e, matchOptions: c, request: a })
                        : null
            try {
                await h.put(a, u)
            } catch (e) {
                throw (
                    ('QuotaExceededError' === e.name &&
                        (await (async function () {
                            for (const e of p) await e()
                        })()),
                    e)
                )
            }
            for (const t of l)
                await t.cacheDidUpdate.call(t, {
                    cacheName: e,
                    event: r,
                    oldResponse: f,
                    newResponse: u,
                    request: a,
                })
        },
        q = g,
        v = async ({
            request: e,
            fetchOptions: t,
            event: n,
            plugins: r = [],
        }) => {
            if (
                ('string' == typeof e && (e = new Request(e)),
                n instanceof FetchEvent && n.preloadResponse)
            ) {
                const e = await n.preloadResponse
                if (e) return e
            }
            const i = d(r, 'fetchDidFail'),
                o = i.length > 0 ? e.clone() : null
            try {
                for (const t of r)
                    if ('requestWillFetch' in t) {
                        const s = t.requestWillFetch,
                            r = e.clone()
                        e = await s.call(t, { request: r, event: n })
                    }
            } catch (e) {
                throw new s('plugin-error-request-will-fetch', {
                    thrownError: e,
                })
            }
            const c = e.clone()
            try {
                let s
                s = 'navigate' === e.mode ? await fetch(e) : await fetch(e, t)
                for (const e of r)
                    'fetchDidSucceed' in e &&
                        (s = await e.fetchDidSucceed.call(e, {
                            event: n,
                            request: c,
                            response: s,
                        }))
                return s
            } catch (e) {
                for (const t of i)
                    await t.fetchDidFail.call(t, {
                        error: e,
                        event: n,
                        originalRequest: o.clone(),
                        request: c.clone(),
                    })
                throw e
            }
        }
    try {
        self['workbox:strategies:5.1.2'] && _()
    } catch (e) {}
    const R = {
        cacheWillUpdate: async ({ response: e }) =>
            200 === e.status || 0 === e.status ? e : null,
    }
    let U
    async function L(e, t) {
        const s = e.clone(),
            n = {
                headers: new Headers(s.headers),
                status: s.status,
                statusText: s.statusText,
            },
            r = t ? t(n) : n,
            i = (function () {
                if (void 0 === U) {
                    const e = new Response('')
                    if ('body' in e)
                        try {
                            new Response(e.body), (U = !0)
                        } catch (e) {
                            U = !1
                        }
                    U = !1
                }
                return U
            })()
                ? s.body
                : await s.blob()
        return new Response(i, r)
    }
    try {
        self['workbox:precaching:5.1.2'] && _()
    } catch (e) {}
    function x(e) {
        if (!e) throw new s('add-to-cache-list-unexpected-type', { entry: e })
        if ('string' == typeof e) {
            const t = new URL(e, location.href)
            return { cacheKey: t.href, url: t.href }
        }
        const { revision: t, url: n } = e
        if (!n) throw new s('add-to-cache-list-unexpected-type', { entry: e })
        if (!t) {
            const e = new URL(n, location.href)
            return { cacheKey: e.href, url: e.href }
        }
        const r = new URL(n, location.href),
            i = new URL(n, location.href)
        return (
            r.searchParams.set('__WB_REVISION__', t),
            { cacheKey: r.href, url: i.href }
        )
    }
    class N {
        constructor(e) {
            ;(this.o = f(e)),
                (this.u = new Map()),
                (this.h = new Map()),
                (this.l = new Map())
        }
        addToCacheList(e) {
            const t = []
            for (const n of e) {
                'string' == typeof n
                    ? t.push(n)
                    : n && void 0 === n.revision && t.push(n.url)
                const { cacheKey: e, url: r } = x(n),
                    i =
                        'string' != typeof n && n.revision
                            ? 'reload'
                            : 'default'
                if (this.u.has(r) && this.u.get(r) !== e)
                    throw new s('add-to-cache-list-conflicting-entries', {
                        firstEntry: this.u.get(r),
                        secondEntry: e,
                    })
                if ('string' != typeof n && n.integrity) {
                    if (this.l.has(e) && this.l.get(e) !== n.integrity)
                        throw new s(
                            'add-to-cache-list-conflicting-integrities',
                            { url: r }
                        )
                    this.l.set(e, n.integrity)
                }
                if ((this.u.set(r, e), this.h.set(r, i), t.length > 0)) {
                    const e = `Workbox is precaching URLs without revision info: ${t.join(
                        ', '
                    )}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`
                    console.warn(e)
                }
            }
        }
        async install({ event: e, plugins: t } = {}) {
            const s = [],
                n = [],
                r = await self.caches.open(this.o),
                i = await r.keys(),
                o = new Set(i.map((e) => e.url))
            for (const [e, t] of this.u)
                o.has(t) ? n.push(e) : s.push({ cacheKey: t, url: e })
            const c = s.map(({ cacheKey: s, url: n }) => {
                const r = this.l.get(s),
                    i = this.h.get(n)
                return this.p({
                    cacheKey: s,
                    cacheMode: i,
                    event: e,
                    integrity: r,
                    plugins: t,
                    url: n,
                })
            })
            return (
                await Promise.all(c),
                { updatedURLs: s.map((e) => e.url), notUpdatedURLs: n }
            )
        }
        async activate() {
            const e = await self.caches.open(this.o),
                t = await e.keys(),
                s = new Set(this.u.values()),
                n = []
            for (const r of t)
                s.has(r.url) || (await e.delete(r), n.push(r.url))
            return { deletedURLs: n }
        }
        async p({
            cacheKey: e,
            url: t,
            cacheMode: n,
            event: r,
            plugins: i,
            integrity: o,
        }) {
            const c = new Request(t, {
                integrity: o,
                cache: n,
                credentials: 'same-origin',
            })
            let a,
                u = await v({ event: r, plugins: i, request: c })
            for (const e of i || []) 'cacheWillUpdate' in e && (a = e)
            if (
                !(a
                    ? await a.cacheWillUpdate({
                          event: r,
                          request: c,
                          response: u,
                      })
                    : u.status < 400)
            )
                throw new s('bad-precaching-response', {
                    url: t,
                    status: u.status,
                })
            u.redirected && (u = await L(u)),
                await m({
                    event: r,
                    plugins: i,
                    response: u,
                    request: e === t ? c : new Request(e),
                    cacheName: this.o,
                    matchOptions: { ignoreSearch: !0 },
                })
        }
        getURLsToCacheKeys() {
            return this.u
        }
        getCachedURLs() {
            return [...this.u.keys()]
        }
        getCacheKeyForURL(e) {
            const t = new URL(e, location.href)
            return this.u.get(t.href)
        }
        async matchPrecache(e) {
            const t = e instanceof Request ? e.url : e,
                s = this.getCacheKeyForURL(t)
            if (s) {
                return (await self.caches.open(this.o)).match(s)
            }
        }
        createHandler(e = !0) {
            return async ({ request: t }) => {
                try {
                    const e = await this.matchPrecache(t)
                    if (e) return e
                    throw new s('missing-precache-entry', {
                        cacheName: this.o,
                        url: t instanceof Request ? t.url : t,
                    })
                } catch (s) {
                    if (e) return fetch(t)
                    throw s
                }
            }
        }
        createHandlerBoundToURL(e, t = !0) {
            if (!this.getCacheKeyForURL(e))
                throw new s('non-precached-url', { url: e })
            const n = this.createHandler(t),
                r = new Request(e)
            return () => n({ request: r })
        }
    }
    let O
    const b = () => (O || (O = new N()), O)
    const M = (e, t) => {
        const s = b().getURLsToCacheKeys()
        for (const n of (function* (
            e,
            {
                ignoreURLParametersMatching: t,
                directoryIndex: s,
                cleanURLs: n,
                urlManipulation: r,
            } = {}
        ) {
            const i = new URL(e, location.href)
            ;(i.hash = ''), yield i.href
            const o = (function (e, t = []) {
                for (const s of [...e.searchParams.keys()])
                    t.some((e) => e.test(s)) && e.searchParams.delete(s)
                return e
            })(i, t)
            if ((yield o.href, s && o.pathname.endsWith('/'))) {
                const e = new URL(o.href)
                ;(e.pathname += s), yield e.href
            }
            if (n) {
                const e = new URL(o.href)
                ;(e.pathname += '.html'), yield e.href
            }
            if (r) {
                const e = r({ url: i })
                for (const t of e) yield t.href
            }
        })(e, t)) {
            const e = s.get(n)
            if (e) return e
        }
    }
    let E = !1
    function P(e) {
        E ||
            ((({
                ignoreURLParametersMatching: e = [/^utm_/],
                directoryIndex: t = 'index.html',
                cleanURLs: s = !0,
                urlManipulation: n,
            } = {}) => {
                const r = f()
                self.addEventListener('fetch', (i) => {
                    const o = M(i.request.url, {
                        cleanURLs: s,
                        directoryIndex: t,
                        ignoreURLParametersMatching: e,
                        urlManipulation: n,
                    })
                    if (!o) return
                    let c = self.caches
                        .open(r)
                        .then((e) => e.match(o))
                        .then((e) => e || fetch(o))
                    i.respondWith(c)
                })
            })(e),
            (E = !0))
    }
    const K = [],
        T = {
            get: () => K,
            add(e) {
                K.push(...e)
            },
        },
        C = (e) => {
            const t = b(),
                s = T.get()
            e.waitUntil(
                t.install({ event: e, plugins: s }).catch((e) => {
                    throw e
                })
            )
        },
        S = (e) => {
            const t = b()
            e.waitUntil(t.activate())
        }
    ;(e.CacheFirst = class {
        constructor(e = {}) {
            ;(this.o = w(e.cacheName)),
                (this.g = e.plugins || []),
                (this.m = e.fetchOptions),
                (this.q = e.matchOptions)
        }
        async handle({ event: e, request: t }) {
            'string' == typeof t && (t = new Request(t))
            let n,
                r = await q({
                    cacheName: this.o,
                    request: t,
                    event: e,
                    matchOptions: this.q,
                    plugins: this.g,
                })
            if (!r)
                try {
                    r = await this.v(t, e)
                } catch (e) {
                    n = e
                }
            if (!r) throw new s('no-response', { url: t.url, error: n })
            return r
        }
        async v(e, t) {
            const s = await v({
                    request: e,
                    event: t,
                    fetchOptions: this.m,
                    plugins: this.g,
                }),
                n = s.clone(),
                r = m({
                    cacheName: this.o,
                    request: e,
                    response: n,
                    event: t,
                    plugins: this.g,
                })
            if (t)
                try {
                    t.waitUntil(r)
                } catch (e) {}
            return s
        }
    }),
        (e.NetworkFirst = class {
            constructor(e = {}) {
                if (((this.o = w(e.cacheName)), e.plugins)) {
                    const t = e.plugins.some((e) => !!e.cacheWillUpdate)
                    this.g = t ? e.plugins : [R, ...e.plugins]
                } else this.g = [R]
                ;(this.R = e.networkTimeoutSeconds || 0),
                    (this.m = e.fetchOptions),
                    (this.q = e.matchOptions)
            }
            async handle({ event: e, request: t }) {
                const n = []
                'string' == typeof t && (t = new Request(t))
                const r = []
                let i
                if (this.R) {
                    const { id: s, promise: o } = this.U({
                        request: t,
                        event: e,
                        logs: n,
                    })
                    ;(i = s), r.push(o)
                }
                const o = this.L({
                    timeoutId: i,
                    request: t,
                    event: e,
                    logs: n,
                })
                r.push(o)
                let c = await Promise.race(r)
                if ((c || (c = await o), !c))
                    throw new s('no-response', { url: t.url })
                return c
            }
            U({ request: e, logs: t, event: s }) {
                let n
                return {
                    promise: new Promise((t) => {
                        n = setTimeout(async () => {
                            t(await this.N({ request: e, event: s }))
                        }, 1e3 * this.R)
                    }),
                    id: n,
                }
            }
            async L({ timeoutId: e, request: t, logs: s, event: n }) {
                let r, i
                try {
                    i = await v({
                        request: t,
                        event: n,
                        fetchOptions: this.m,
                        plugins: this.g,
                    })
                } catch (e) {
                    r = e
                }
                if ((e && clearTimeout(e), r || !i))
                    i = await this.N({ request: t, event: n })
                else {
                    const e = i.clone(),
                        s = m({
                            cacheName: this.o,
                            request: t,
                            response: e,
                            event: n,
                            plugins: this.g,
                        })
                    if (n)
                        try {
                            n.waitUntil(s)
                        } catch (e) {}
                }
                return i
            }
            N({ event: e, request: t }) {
                return q({
                    cacheName: this.o,
                    request: t,
                    event: e,
                    matchOptions: this.q,
                    plugins: this.g,
                })
            }
        }),
        (e.NetworkOnly = class {
            constructor(e = {}) {
                ;(this.g = e.plugins || []), (this.m = e.fetchOptions)
            }
            async handle({ event: e, request: t }) {
                let n, r
                'string' == typeof t && (t = new Request(t))
                try {
                    r = await v({
                        request: t,
                        event: e,
                        fetchOptions: this.m,
                        plugins: this.g,
                    })
                } catch (e) {
                    n = e
                }
                if (!r) throw new s('no-response', { url: t.url, error: n })
                return r
            }
        }),
        (e.clientsClaim = function () {
            self.addEventListener('activate', () => self.clients.claim())
        }),
        (e.precacheAndRoute = function (e, t) {
            !(function (e) {
                b().addToCacheList(e),
                    e.length > 0 &&
                        (self.addEventListener('install', C),
                        self.addEventListener('activate', S))
            })(e),
                P(t)
        }),
        (e.registerRoute = function (e, t, n) {
            let o
            if ('string' == typeof e) {
                const s = new URL(e, location.href)
                o = new r(({ url: e }) => e.href === s.href, t, n)
            } else if (e instanceof RegExp) o = new i(e, t, n)
            else if ('function' == typeof e) o = new r(e, t, n)
            else {
                if (!(e instanceof r))
                    throw new s('unsupported-route-type', {
                        moduleName: 'workbox-routing',
                        funcName: 'registerRoute',
                        paramName: 'capture',
                    })
                o = e
            }
            return u().registerRoute(o), o
        }),
        (e.skipWaiting = function () {
            self.addEventListener('install', () => self.skipWaiting())
        })
})
