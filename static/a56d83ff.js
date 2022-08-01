function e(e, t, n, s) {
  var i,
    r = arguments.length,
    o = r < 3 ? t : null === s ? (s = Object.getOwnPropertyDescriptor(t, n)) : s
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
    o = Reflect.decorate(e, t, n, s)
  else
    for (var a = e.length - 1; a >= 0; a--)
      (i = e[a]) && (o = (r < 3 ? i(o) : r > 3 ? i(t, n, o) : i(t, n)) || o)
  return r > 3 && o && Object.defineProperty(t, n, o), o
  /**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
}
const t =
    window.ShadowRoot &&
    (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) &&
    'adoptedStyleSheets' in Document.prototype &&
    'replace' in CSSStyleSheet.prototype,
  n = Symbol(),
  s = new WeakMap()
class i {
  constructor(e, t, s) {
    if (((this._$cssResult$ = !0), s !== n))
      throw Error(
        'CSSResult is not constructable. Use `unsafeCSS` or `css` instead.'
      )
    ;(this.cssText = e), (this.t = t)
  }
  get styleSheet() {
    let e = this.o
    const n = this.t
    if (t && void 0 === e) {
      const t = void 0 !== n && 1 === n.length
      t && (e = s.get(n)),
        void 0 === e &&
          ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText),
          t && s.set(n, e))
    }
    return e
  }
  toString() {
    return this.cssText
  }
}
const r = (e, ...t) => {
    const s =
      1 === e.length
        ? e[0]
        : t.reduce(
            (t, n, s) =>
              t +
              ((e) => {
                if (!0 === e._$cssResult$) return e.cssText
                if ('number' == typeof e) return e
                throw Error(
                  "Value passed to 'css' function must be a 'css' function result: " +
                    e +
                    ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."
                )
              })(n) +
              e[s + 1],
            e[0]
          )
    return new i(s, e, n)
  },
  o = t
    ? (e) => e
    : (e) =>
        e instanceof CSSStyleSheet
          ? ((e) => {
              let t = ''
              for (const n of e.cssRules) t += n.cssText
              return ((e) =>
                new i('string' == typeof e ? e : e + '', void 0, n))(t)
            })(e)
          : e
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var a
const l = window.trustedTypes,
  c = l ? l.emptyScript : '',
  h = window.reactiveElementPolyfillSupport,
  p = {
    toAttribute(e, t) {
      switch (t) {
        case Boolean:
          e = e ? c : null
          break
        case Object:
        case Array:
          e = null == e ? e : JSON.stringify(e)
      }
      return e
    },
    fromAttribute(e, t) {
      let n = e
      switch (t) {
        case Boolean:
          n = null !== e
          break
        case Number:
          n = null === e ? null : Number(e)
          break
        case Object:
        case Array:
          try {
            n = JSON.parse(e)
          } catch (e) {
            n = null
          }
      }
      return n
    },
  },
  d = (e, t) => t !== e && (t == t || e == e),
  u = { attribute: !0, type: String, converter: p, reflect: !1, hasChanged: d }
class g extends HTMLElement {
  constructor() {
    super(),
      (this._$Ei = new Map()),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$El = null),
      this.u()
  }
  static addInitializer(e) {
    var t
    ;(null !== (t = this.h) && void 0 !== t) || (this.h = []), this.h.push(e)
  }
  static get observedAttributes() {
    this.finalize()
    const e = []
    return (
      this.elementProperties.forEach((t, n) => {
        const s = this._$Ep(n, t)
        void 0 !== s && (this._$Ev.set(s, n), e.push(s))
      }),
      e
    )
  }
  static createProperty(e, t = u) {
    if (
      (t.state && (t.attribute = !1),
      this.finalize(),
      this.elementProperties.set(e, t),
      !t.noAccessor && !this.prototype.hasOwnProperty(e))
    ) {
      const n = 'symbol' == typeof e ? Symbol() : '__' + e,
        s = this.getPropertyDescriptor(e, n, t)
      void 0 !== s && Object.defineProperty(this.prototype, e, s)
    }
  }
  static getPropertyDescriptor(e, t, n) {
    return {
      get() {
        return this[t]
      },
      set(s) {
        const i = this[e]
        ;(this[t] = s), this.requestUpdate(e, i, n)
      },
      configurable: !0,
      enumerable: !0,
    }
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) || u
  }
  static finalize() {
    if (this.hasOwnProperty('finalized')) return !1
    this.finalized = !0
    const e = Object.getPrototypeOf(this)
    if (
      (e.finalize(),
      (this.elementProperties = new Map(e.elementProperties)),
      (this._$Ev = new Map()),
      this.hasOwnProperty('properties'))
    ) {
      const e = this.properties,
        t = [
          ...Object.getOwnPropertyNames(e),
          ...Object.getOwnPropertySymbols(e),
        ]
      for (const n of t) this.createProperty(n, e[n])
    }
    return (this.elementStyles = this.finalizeStyles(this.styles)), !0
  }
  static finalizeStyles(e) {
    const t = []
    if (Array.isArray(e)) {
      const n = new Set(e.flat(1 / 0).reverse())
      for (const e of n) t.unshift(o(e))
    } else void 0 !== e && t.push(o(e))
    return t
  }
  static _$Ep(e, t) {
    const n = t.attribute
    return !1 === n
      ? void 0
      : 'string' == typeof n
      ? n
      : 'string' == typeof e
      ? e.toLowerCase()
      : void 0
  }
  u() {
    var e
    ;(this._$E_ = new Promise((e) => (this.enableUpdating = e))),
      (this._$AL = new Map()),
      this._$Eg(),
      this.requestUpdate(),
      null === (e = this.constructor.h) ||
        void 0 === e ||
        e.forEach((e) => e(this))
  }
  addController(e) {
    var t, n
    ;(null !== (t = this._$ES) && void 0 !== t ? t : (this._$ES = [])).push(e),
      void 0 !== this.renderRoot &&
        this.isConnected &&
        (null === (n = e.hostConnected) || void 0 === n || n.call(e))
  }
  removeController(e) {
    var t
    null === (t = this._$ES) ||
      void 0 === t ||
      t.splice(this._$ES.indexOf(e) >>> 0, 1)
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((e, t) => {
      this.hasOwnProperty(t) && (this._$Ei.set(t, this[t]), delete this[t])
    })
  }
  createRenderRoot() {
    var e
    const n =
      null !== (e = this.shadowRoot) && void 0 !== e
        ? e
        : this.attachShadow(this.constructor.shadowRootOptions)
    return (
      ((e, n) => {
        t
          ? (e.adoptedStyleSheets = n.map((e) =>
              e instanceof CSSStyleSheet ? e : e.styleSheet
            ))
          : n.forEach((t) => {
              const n = document.createElement('style'),
                s = window.litNonce
              void 0 !== s && n.setAttribute('nonce', s),
                (n.textContent = t.cssText),
                e.appendChild(n)
            })
      })(n, this.constructor.elementStyles),
      n
    )
  }
  connectedCallback() {
    var e
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(!0),
      null === (e = this._$ES) ||
        void 0 === e ||
        e.forEach((e) => {
          var t
          return null === (t = e.hostConnected) || void 0 === t
            ? void 0
            : t.call(e)
        })
  }
  enableUpdating(e) {}
  disconnectedCallback() {
    var e
    null === (e = this._$ES) ||
      void 0 === e ||
      e.forEach((e) => {
        var t
        return null === (t = e.hostDisconnected) || void 0 === t
          ? void 0
          : t.call(e)
      })
  }
  attributeChangedCallback(e, t, n) {
    this._$AK(e, n)
  }
  _$EO(e, t, n = u) {
    var s, i
    const r = this.constructor._$Ep(e, n)
    if (void 0 !== r && !0 === n.reflect) {
      const o = (
        null !==
          (i =
            null === (s = n.converter) || void 0 === s
              ? void 0
              : s.toAttribute) && void 0 !== i
          ? i
          : p.toAttribute
      )(t, n.type)
      ;(this._$El = e),
        null == o ? this.removeAttribute(r) : this.setAttribute(r, o),
        (this._$El = null)
    }
  }
  _$AK(e, t) {
    var n, s
    const i = this.constructor,
      r = i._$Ev.get(e)
    if (void 0 !== r && this._$El !== r) {
      const e = i.getPropertyOptions(r),
        o = e.converter,
        a =
          null !==
            (s =
              null !== (n = null == o ? void 0 : o.fromAttribute) &&
              void 0 !== n
                ? n
                : 'function' == typeof o
                ? o
                : null) && void 0 !== s
            ? s
            : p.fromAttribute
      ;(this._$El = r), (this[r] = a(t, e.type)), (this._$El = null)
    }
  }
  requestUpdate(e, t, n) {
    let s = !0
    void 0 !== e &&
      (((n = n || this.constructor.getPropertyOptions(e)).hasChanged || d)(
        this[e],
        t
      )
        ? (this._$AL.has(e) || this._$AL.set(e, t),
          !0 === n.reflect &&
            this._$El !== e &&
            (void 0 === this._$EC && (this._$EC = new Map()),
            this._$EC.set(e, n)))
        : (s = !1)),
      !this.isUpdatePending && s && (this._$E_ = this._$Ej())
  }
  async _$Ej() {
    this.isUpdatePending = !0
    try {
      await this._$E_
    } catch (e) {
      Promise.reject(e)
    }
    const e = this.scheduleUpdate()
    return null != e && (await e), !this.isUpdatePending
  }
  scheduleUpdate() {
    return this.performUpdate()
  }
  performUpdate() {
    var e
    if (!this.isUpdatePending) return
    this.hasUpdated,
      this._$Ei &&
        (this._$Ei.forEach((e, t) => (this[t] = e)), (this._$Ei = void 0))
    let t = !1
    const n = this._$AL
    try {
      ;(t = this.shouldUpdate(n)),
        t
          ? (this.willUpdate(n),
            null === (e = this._$ES) ||
              void 0 === e ||
              e.forEach((e) => {
                var t
                return null === (t = e.hostUpdate) || void 0 === t
                  ? void 0
                  : t.call(e)
              }),
            this.update(n))
          : this._$Ek()
    } catch (e) {
      throw ((t = !1), this._$Ek(), e)
    }
    t && this._$AE(n)
  }
  willUpdate(e) {}
  _$AE(e) {
    var t
    null === (t = this._$ES) ||
      void 0 === t ||
      t.forEach((e) => {
        var t
        return null === (t = e.hostUpdated) || void 0 === t ? void 0 : t.call(e)
      }),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(e)),
      this.updated(e)
  }
  _$Ek() {
    ;(this._$AL = new Map()), (this.isUpdatePending = !1)
  }
  get updateComplete() {
    return this.getUpdateComplete()
  }
  getUpdateComplete() {
    return this._$E_
  }
  shouldUpdate(e) {
    return !0
  }
  update(e) {
    void 0 !== this._$EC &&
      (this._$EC.forEach((e, t) => this._$EO(t, this[t], e)),
      (this._$EC = void 0)),
      this._$Ek()
  }
  updated(e) {}
  firstUpdated(e) {}
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var f
;(g.finalized = !0),
  (g.elementProperties = new Map()),
  (g.elementStyles = []),
  (g.shadowRootOptions = { mode: 'open' }),
  null == h || h({ ReactiveElement: g }),
  (null !== (a = globalThis.reactiveElementVersions) && void 0 !== a
    ? a
    : (globalThis.reactiveElementVersions = [])
  ).push('1.3.3')
const m = globalThis.trustedTypes,
  b = m ? m.createPolicy('lit-html', { createHTML: (e) => e }) : void 0,
  w = `lit$${(Math.random() + '').slice(9)}$`,
  y = '?' + w,
  v = `<${y}>`,
  x = document,
  k = (e = '') => x.createComment(e),
  $ = (e) => null === e || ('object' != typeof e && 'function' != typeof e),
  _ = Array.isArray,
  S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  A = /-->/g,
  E = />/g,
  T =
    />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,
  R = /'/g,
  P = /"/g,
  C = /^(?:script|style|textarea|title)$/i,
  z = (
    (e) =>
    (t, ...n) => ({ _$litType$: e, strings: t, values: n })
  )(1),
  j = Symbol.for('lit-noChange'),
  L = Symbol.for('lit-nothing'),
  U = new WeakMap(),
  I = x.createTreeWalker(x, 129, null, !1),
  N = (e, t) => {
    const n = e.length - 1,
      s = []
    let i,
      r = 2 === t ? '<svg>' : '',
      o = S
    for (let t = 0; t < n; t++) {
      const n = e[t]
      let a,
        l,
        c = -1,
        h = 0
      for (; h < n.length && ((o.lastIndex = h), (l = o.exec(n)), null !== l); )
        (h = o.lastIndex),
          o === S
            ? '!--' === l[1]
              ? (o = A)
              : void 0 !== l[1]
              ? (o = E)
              : void 0 !== l[2]
              ? (C.test(l[2]) && (i = RegExp('</' + l[2], 'g')), (o = T))
              : void 0 !== l[3] && (o = T)
            : o === T
            ? '>' === l[0]
              ? ((o = null != i ? i : S), (c = -1))
              : void 0 === l[1]
              ? (c = -2)
              : ((c = o.lastIndex - l[2].length),
                (a = l[1]),
                (o = void 0 === l[3] ? T : '"' === l[3] ? P : R))
            : o === P || o === R
            ? (o = T)
            : o === A || o === E
            ? (o = S)
            : ((o = T), (i = void 0))
      const p = o === T && e[t + 1].startsWith('/>') ? ' ' : ''
      r +=
        o === S
          ? n + v
          : c >= 0
          ? (s.push(a), n.slice(0, c) + '$lit$' + n.slice(c) + w + p)
          : n + w + (-2 === c ? (s.push(void 0), t) : p)
    }
    const a = r + (e[n] || '<?>') + (2 === t ? '</svg>' : '')
    if (!Array.isArray(e) || !e.hasOwnProperty('raw'))
      throw Error('invalid template strings array')
    return [void 0 !== b ? b.createHTML(a) : a, s]
  }
class H {
  constructor({ strings: e, _$litType$: t }, n) {
    let s
    this.parts = []
    let i = 0,
      r = 0
    const o = e.length - 1,
      a = this.parts,
      [l, c] = N(e, t)
    if (
      ((this.el = H.createElement(l, n)),
      (I.currentNode = this.el.content),
      2 === t)
    ) {
      const e = this.el.content,
        t = e.firstChild
      t.remove(), e.append(...t.childNodes)
    }
    for (; null !== (s = I.nextNode()) && a.length < o; ) {
      if (1 === s.nodeType) {
        if (s.hasAttributes()) {
          const e = []
          for (const t of s.getAttributeNames())
            if (t.endsWith('$lit$') || t.startsWith(w)) {
              const n = c[r++]
              if ((e.push(t), void 0 !== n)) {
                const e = s.getAttribute(n.toLowerCase() + '$lit$').split(w),
                  t = /([.?@])?(.*)/.exec(n)
                a.push({
                  type: 1,
                  index: i,
                  name: t[2],
                  strings: e,
                  ctor:
                    '.' === t[1] ? B : '?' === t[1] ? Z : '@' === t[1] ? V : M,
                })
              } else a.push({ type: 6, index: i })
            }
          for (const t of e) s.removeAttribute(t)
        }
        if (C.test(s.tagName)) {
          const e = s.textContent.split(w),
            t = e.length - 1
          if (t > 0) {
            s.textContent = m ? m.emptyScript : ''
            for (let n = 0; n < t; n++)
              s.append(e[n], k()), I.nextNode(), a.push({ type: 2, index: ++i })
            s.append(e[t], k())
          }
        }
      } else if (8 === s.nodeType)
        if (s.data === y) a.push({ type: 2, index: i })
        else {
          let e = -1
          for (; -1 !== (e = s.data.indexOf(w, e + 1)); )
            a.push({ type: 7, index: i }), (e += w.length - 1)
        }
      i++
    }
  }
  static createElement(e, t) {
    const n = x.createElement('template')
    return (n.innerHTML = e), n
  }
}
function O(e, t, n = e, s) {
  var i, r, o, a
  if (t === j) return t
  let l =
    void 0 !== s
      ? null === (i = n._$Cl) || void 0 === i
        ? void 0
        : i[s]
      : n._$Cu
  const c = $(t) ? void 0 : t._$litDirective$
  return (
    (null == l ? void 0 : l.constructor) !== c &&
      (null === (r = null == l ? void 0 : l._$AO) ||
        void 0 === r ||
        r.call(l, !1),
      void 0 === c ? (l = void 0) : ((l = new c(e)), l._$AT(e, n, s)),
      void 0 !== s
        ? ((null !== (o = (a = n)._$Cl) && void 0 !== o ? o : (a._$Cl = []))[
            s
          ] = l)
        : (n._$Cu = l)),
    void 0 !== l && (t = O(e, l._$AS(e, t.values), l, s)),
    t
  )
}
class D {
  constructor(e, t) {
    ;(this.v = []), (this._$AN = void 0), (this._$AD = e), (this._$AM = t)
  }
  get parentNode() {
    return this._$AM.parentNode
  }
  get _$AU() {
    return this._$AM._$AU
  }
  p(e) {
    var t
    const {
        el: { content: n },
        parts: s,
      } = this._$AD,
      i = (
        null !== (t = null == e ? void 0 : e.creationScope) && void 0 !== t
          ? t
          : x
      ).importNode(n, !0)
    I.currentNode = i
    let r = I.nextNode(),
      o = 0,
      a = 0,
      l = s[0]
    for (; void 0 !== l; ) {
      if (o === l.index) {
        let t
        2 === l.type
          ? (t = new q(r, r.nextSibling, this, e))
          : 1 === l.type
          ? (t = new l.ctor(r, l.name, l.strings, this, e))
          : 6 === l.type && (t = new Q(r, this, e)),
          this.v.push(t),
          (l = s[++a])
      }
      o !== (null == l ? void 0 : l.index) && ((r = I.nextNode()), o++)
    }
    return i
  }
  m(e) {
    let t = 0
    for (const n of this.v)
      void 0 !== n &&
        (void 0 !== n.strings
          ? (n._$AI(e, n, t), (t += n.strings.length - 2))
          : n._$AI(e[t])),
        t++
  }
}
class q {
  constructor(e, t, n, s) {
    var i
    ;(this.type = 2),
      (this._$AH = L),
      (this._$AN = void 0),
      (this._$AA = e),
      (this._$AB = t),
      (this._$AM = n),
      (this.options = s),
      (this._$Cg =
        null === (i = null == s ? void 0 : s.isConnected) || void 0 === i || i)
  }
  get _$AU() {
    var e, t
    return null !==
      (t = null === (e = this._$AM) || void 0 === e ? void 0 : e._$AU) &&
      void 0 !== t
      ? t
      : this._$Cg
  }
  get parentNode() {
    let e = this._$AA.parentNode
    const t = this._$AM
    return void 0 !== t && 11 === e.nodeType && (e = t.parentNode), e
  }
  get startNode() {
    return this._$AA
  }
  get endNode() {
    return this._$AB
  }
  _$AI(e, t = this) {
    ;(e = O(this, e, t)),
      $(e)
        ? e === L || null == e || '' === e
          ? (this._$AH !== L && this._$AR(), (this._$AH = L))
          : e !== this._$AH && e !== j && this.$(e)
        : void 0 !== e._$litType$
        ? this.T(e)
        : void 0 !== e.nodeType
        ? this.k(e)
        : ((e) => {
            var t
            return (
              _(e) ||
              'function' ==
                typeof (null === (t = e) || void 0 === t
                  ? void 0
                  : t[Symbol.iterator])
            )
          })(e)
        ? this.S(e)
        : this.$(e)
  }
  M(e, t = this._$AB) {
    return this._$AA.parentNode.insertBefore(e, t)
  }
  k(e) {
    this._$AH !== e && (this._$AR(), (this._$AH = this.M(e)))
  }
  $(e) {
    this._$AH !== L && $(this._$AH)
      ? (this._$AA.nextSibling.data = e)
      : this.k(x.createTextNode(e)),
      (this._$AH = e)
  }
  T(e) {
    var t
    const { values: n, _$litType$: s } = e,
      i =
        'number' == typeof s
          ? this._$AC(e)
          : (void 0 === s.el && (s.el = H.createElement(s.h, this.options)), s)
    if ((null === (t = this._$AH) || void 0 === t ? void 0 : t._$AD) === i)
      this._$AH.m(n)
    else {
      const e = new D(i, this),
        t = e.p(this.options)
      e.m(n), this.k(t), (this._$AH = e)
    }
  }
  _$AC(e) {
    let t = U.get(e.strings)
    return void 0 === t && U.set(e.strings, (t = new H(e))), t
  }
  S(e) {
    _(this._$AH) || ((this._$AH = []), this._$AR())
    const t = this._$AH
    let n,
      s = 0
    for (const i of e)
      s === t.length
        ? t.push((n = new q(this.M(k()), this.M(k()), this, this.options)))
        : (n = t[s]),
        n._$AI(i),
        s++
    s < t.length && (this._$AR(n && n._$AB.nextSibling, s), (t.length = s))
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var n
    for (
      null === (n = this._$AP) || void 0 === n || n.call(this, !1, !0, t);
      e && e !== this._$AB;

    ) {
      const t = e.nextSibling
      e.remove(), (e = t)
    }
  }
  setConnected(e) {
    var t
    void 0 === this._$AM &&
      ((this._$Cg = e),
      null === (t = this._$AP) || void 0 === t || t.call(this, e))
  }
}
class M {
  constructor(e, t, n, s, i) {
    ;(this.type = 1),
      (this._$AH = L),
      (this._$AN = void 0),
      (this.element = e),
      (this.name = t),
      (this._$AM = s),
      (this.options = i),
      n.length > 2 || '' !== n[0] || '' !== n[1]
        ? ((this._$AH = Array(n.length - 1).fill(new String())),
          (this.strings = n))
        : (this._$AH = L)
  }
  get tagName() {
    return this.element.tagName
  }
  get _$AU() {
    return this._$AM._$AU
  }
  _$AI(e, t = this, n, s) {
    const i = this.strings
    let r = !1
    if (void 0 === i)
      (e = O(this, e, t, 0)),
        (r = !$(e) || (e !== this._$AH && e !== j)),
        r && (this._$AH = e)
    else {
      const s = e
      let o, a
      for (e = i[0], o = 0; o < i.length - 1; o++)
        (a = O(this, s[n + o], t, o)),
          a === j && (a = this._$AH[o]),
          r || (r = !$(a) || a !== this._$AH[o]),
          a === L ? (e = L) : e !== L && (e += (null != a ? a : '') + i[o + 1]),
          (this._$AH[o] = a)
    }
    r && !s && this.C(e)
  }
  C(e) {
    e === L
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, null != e ? e : '')
  }
}
class B extends M {
  constructor() {
    super(...arguments), (this.type = 3)
  }
  C(e) {
    this.element[this.name] = e === L ? void 0 : e
  }
}
const F = m ? m.emptyScript : ''
class Z extends M {
  constructor() {
    super(...arguments), (this.type = 4)
  }
  C(e) {
    e && e !== L
      ? this.element.setAttribute(this.name, F)
      : this.element.removeAttribute(this.name)
  }
}
class V extends M {
  constructor(e, t, n, s, i) {
    super(e, t, n, s, i), (this.type = 5)
  }
  _$AI(e, t = this) {
    var n
    if ((e = null !== (n = O(this, e, t, 0)) && void 0 !== n ? n : L) === j)
      return
    const s = this._$AH,
      i =
        (e === L && s !== L) ||
        e.capture !== s.capture ||
        e.once !== s.once ||
        e.passive !== s.passive,
      r = e !== L && (s === L || i)
    i && this.element.removeEventListener(this.name, this, s),
      r && this.element.addEventListener(this.name, this, e),
      (this._$AH = e)
  }
  handleEvent(e) {
    var t, n
    'function' == typeof this._$AH
      ? this._$AH.call(
          null !==
            (n =
              null === (t = this.options) || void 0 === t ? void 0 : t.host) &&
            void 0 !== n
            ? n
            : this.element,
          e
        )
      : this._$AH.handleEvent(e)
  }
}
class Q {
  constructor(e, t, n) {
    ;(this.element = e),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = t),
      (this.options = n)
  }
  get _$AU() {
    return this._$AM._$AU
  }
  _$AI(e) {
    O(this, e)
  }
}
const G = window.litHtmlPolyfillSupport
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var W, K
null == G || G(H, q),
  (null !== (f = globalThis.litHtmlVersions) && void 0 !== f
    ? f
    : (globalThis.litHtmlVersions = [])
  ).push('2.2.6')
class J extends g {
  constructor() {
    super(...arguments),
      (this.renderOptions = { host: this }),
      (this._$Do = void 0)
  }
  createRenderRoot() {
    var e, t
    const n = super.createRenderRoot()
    return (
      (null !== (e = (t = this.renderOptions).renderBefore) && void 0 !== e) ||
        (t.renderBefore = n.firstChild),
      n
    )
  }
  update(e) {
    const t = this.render()
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(e),
      (this._$Do = ((e, t, n) => {
        var s, i
        const r =
          null !== (s = null == n ? void 0 : n.renderBefore) && void 0 !== s
            ? s
            : t
        let o = r._$litPart$
        if (void 0 === o) {
          const e =
            null !== (i = null == n ? void 0 : n.renderBefore) && void 0 !== i
              ? i
              : null
          r._$litPart$ = o = new q(
            t.insertBefore(k(), e),
            e,
            void 0,
            null != n ? n : {}
          )
        }
        return o._$AI(e), o
      })(t, this.renderRoot, this.renderOptions))
  }
  connectedCallback() {
    var e
    super.connectedCallback(),
      null === (e = this._$Do) || void 0 === e || e.setConnected(!0)
  }
  disconnectedCallback() {
    var e
    super.disconnectedCallback(),
      null === (e = this._$Do) || void 0 === e || e.setConnected(!1)
  }
  render() {
    return j
  }
}
;(J.finalized = !0),
  (J._$litElement$ = !0),
  null === (W = globalThis.litElementHydrateSupport) ||
    void 0 === W ||
    W.call(globalThis, { LitElement: J })
const X = globalThis.litElementPolyfillSupport
null == X || X({ LitElement: J }),
  (null !== (K = globalThis.litElementVersions) && void 0 !== K
    ? K
    : (globalThis.litElementVersions = [])
  ).push('3.2.1')
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = (e) => (t) =>
    'function' == typeof t
      ? ((e, t) => (window.customElements.define(e, t), t))(e, t)
      : ((e, t) => {
          const { kind: n, elements: s } = t
          return {
            kind: n,
            elements: s,
            finisher(t) {
              window.customElements.define(e, t)
            },
          }
        })(e, t),
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */ ee = (e, t) =>
    'method' === t.kind && t.descriptor && !('value' in t.descriptor)
      ? {
          ...t,
          finisher(n) {
            n.createProperty(t.key, e)
          },
        }
      : {
          kind: 'field',
          key: Symbol(),
          placement: 'own',
          descriptor: {},
          originalKey: t.key,
          initializer() {
            'function' == typeof t.initializer &&
              (this[t.key] = t.initializer.call(this))
          },
          finisher(n) {
            n.createProperty(t.key, e)
          },
        }
function te(e) {
  return (t, n) =>
    void 0 !== n
      ? ((e, t, n) => {
          t.constructor.createProperty(n, e)
        })(e, t, n)
      : ee(e, t)
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var ne
null === (ne = window.HTMLSlotElement) ||
  void 0 === ne ||
  ne.prototype.assignedElements
let se = class extends J {
  render() {
    return z`<h1>${this.title}</h1>`
  }
}
;(se.styles = r`h1{font-size:1.8rem;margin:10px 0;font-weight:600;text-align:center}`),
  (se = e([Y('app-title')], se))
const ie = (e) => {
  if (e === window.location.pathname) return
  const t = new CustomEvent('navigate', { detail: { route: e } })
  document.dispatchEvent(t)
}
let re = class extends J {
  constructor() {
    super(...arguments),
      (this.pages = []),
      (this.PAGE_ACTIVE_FLAG = 'active'),
      (this.loadedPageRoutes = new Set())
  }
  connectedCallback() {
    var e
    null === (e = super.connectedCallback) || void 0 === e || e.call(this),
      (this.navigateHandler = this.onNavigateHandler.bind(this)),
      (this.popStateHandler = this.onPopStateHandler.bind(this)),
      document.addEventListener('navigate', this.navigateHandler),
      window.addEventListener('popstate', this.popStateHandler)
  }
  disconnectedCallback() {
    var e
    null === (e = super.disconnectedCallback) || void 0 === e || e.call(this),
      this.navigateHandler &&
        document.removeEventListener('navigate', this.navigateHandler),
      this.popStateHandler &&
        window.removeEventListener('popstate', this.popStateHandler)
  }
  firstUpdated() {
    if (!this.pages.length) throw new Error('No pages initialized')
  }
  updated(e) {
    e.has('pages') && !this.activePage && this.initActivePage()
  }
  render() {
    return z`<slot></slot>`
  }
  getPageElement(e) {
    const t = this.querySelector(e.tagName)
    if (!t) throw new Error('No page element found')
    return t
  }
  get currentPageElement() {
    return this.querySelector(`[${this.PAGE_ACTIVE_FLAG}]`)
  }
  initActivePage() {
    const e = this.findMatchedPage()
    this.mount(e)
  }
  async mount(e) {
    this.loadedPageRoutes.has(e.route) || this.loadedPageRoutes.add(e.route),
      this.appendPage(e)
    this.getPageElement(e).setAttribute(this.PAGE_ACTIVE_FLAG, '')
  }
  unmount() {
    const e = this.currentPageElement
    null == e || e.removeAttribute(this.PAGE_ACTIVE_FLAG),
      null == e || e.remove()
  }
  async appendPage(e) {
    const t = document.createElement(e.tagName)
    this.appendChild(t)
  }
  onNavigateHandler(e) {
    if (e instanceof CustomEvent) {
      const { route: t } = e.detail
      window.history.pushState(null, '', t), this.reloadPage()
    }
  }
  onPopStateHandler() {
    this.reloadPage()
  }
  reloadPage() {
    const e = this.findMatchedPage()
    this.unmount(), this.mount(e)
  }
  findMatchedPage() {
    const e = this.pages.find(({ route: e }) => {
      const t = e.split(/\//),
        n = window.location.pathname.split(/\//)
      return t.every((e, t) => !!e.startsWith(':') || e === n[t])
    })
    if (!e) throw new Error('Failed to find matched page')
    return e
  }
}
;(re.styles = r`:host{display:flex;flex-direction:column}::slotted(*){display:none}::slotted([active]){display:initial}`),
  e([te({ type: Array })], re.prototype, 'pages', void 0),
  (re = e([Y('dom-router')], re))
let oe = class extends J {
  constructor() {
    super(),
      (this.menus = []),
      (this.activeRoute = null),
      window.addEventListener('popstate', () => {
        this.requestUpdate()
      })
  }
  render() {
    return z` <ul> ${this.menus
      .filter((e) => e.title)
      .map(
        ({ title: e, route: t }) =>
          z` <li> <button ?active="${this.isActiveMenu(t)}" @click="${() => {
            this.moveToPage(t)
          }}" @keydown="${(e) => {
            ;('enter' !== e.key && 'space' !== e.key) || this.moveToPage(t)
          }}"> ${e} </button> </li> `
      )} </ul> `
  }
  isActiveMenu(e) {
    return window.location.pathname === e
  }
  moveToPage(e) {
    ie(e), this.requestUpdate()
  }
}
;(oe.styles = r`ul{list-style:none;padding:20px 0;margin:0;display:flex;gap:20px;justify-content:center;border-bottom:1px dashed var(--theme-red-color)}button{border:0;background-color:transparent;transition:transform .2s ease-in-out 0s;color:inherit}button:hover,button[active]{font-weight:600;transform:scale(1.5);transition:transform .2s ease-in-out 0s}`),
  e([te({ type: Array })], oe.prototype, 'menus', void 0),
  e([te({ type: String })], oe.prototype, 'activeRoute', void 0),
  (oe = e([Y('menu-list')], oe))
let ae = class extends J {
  constructor() {
    super(...arguments),
      (this.isLoading = !1),
      (this.loadingStartHandler = () => {
        ;(document.body.style.overflow = 'hidden'),
          (this.isLoading = !0),
          (this.modal.style.opacity = '1')
      }),
      (this.loadingStopHandler = () => {
        ;(document.body.style.overflow = 'auto'),
          (this.isLoading = !1),
          (this.modal.style.opacity = '0')
      })
  }
  get modal() {
    const e = this.renderRoot.querySelector('#modal')
    if (!e) throw new Error('Failed to find modal')
    return e
  }
  connectedCallback() {
    var e
    null === (e = super.connectedCallback) || void 0 === e || e.call(this),
      window.addEventListener('loadingStart', this.loadingStartHandler),
      window.addEventListener('loadingStop', this.loadingStopHandler)
  }
  disconnectedCallback() {
    var e
    null === (e = super.disconnectedCallback) || void 0 === e || e.call(this),
      window.removeEventListener('loadingStart', this.loadingStartHandler),
      window.removeEventListener('loadingStop', this.loadingStopHandler)
  }
  render() {
    return z`<section id="modal" class="${
      this.isLoading ? 'is-loading' : ''
    }"> <p id="message">Now Loading...</p> </section>`
  }
}
;(ae.styles = r`#modal{position:fixed;left:0;right:0;top:0;bottom:0;height:100vh;background-color:rgba(0,0,0,.5);z-index:1;transition:opacity .3s ease-in-out 0s;pointer-events:none;opacity:0}#modal.is-loading{transition:opacity .5s ease-in-out 0s;pointer-events:auto;opacity:1}#message{position:absolute;left:50%;top:30%;transform:translate(-50%,-50%);font-weight:700;font-size:1.2rem;text-shadow:-1px -1px 0 #fff,1px -1px 0 #fff,-1px 1px 0 #fff,1px 1px 0 #fff}`),
  e([te({ type: Boolean })], ae.prototype, 'isLoading', void 0),
  (ae = e([Y('modal-spinner')], ae))
const le = [
    {
      title: '포스팅',
      tagName: 'post-list',
      importPath: '../../pages/post-list.js',
      route: '/',
    },
    {
      title: '글쓰기',
      tagName: 'create-post',
      importPath: '../../pages/create-post.js',
      route: '/create',
    },
    {
      title: '배포하기',
      tagName: 'deploy-post',
      importPath: '../../pages/deploy-post.js',
      route: '/deploy',
    },
    {
      title: '설정',
      tagName: 'app-config',
      importPath: '../../pages/app-config.js',
      route: '/config',
    },
    {
      tagName: 'post-detail',
      importPath: '../../pages/post-detail.js',
      route: '/posts/:name',
    },
  ],
  ce = 'https://post-logs-server.herokuapp.com'
var he = new (class {
  constructor(e, t, n) {
    ;(this.baseUrl = e),
      (this.beforeRequestHandler = t),
      (this.afterResponseHandler = n),
      (this.headers = { 'content-type': 'application/json' })
  }
  buildRequestURL(e) {
    return `${this.baseUrl}${e}`
  }
  async get(e, t = {}) {
    try {
      this.beforeRequestHandler()
      const n = await fetch(this.buildRequestURL(e), {
        method: 'get',
        headers: { ...this.headers, ...t },
      })
      if (!n.ok) throw new Error(await n.text())
      return await n.json()
    } catch (e) {
      throw (this.handleError(e), e)
    } finally {
      this.afterResponseHandler()
    }
  }
  async post(e, t, n = {}) {
    try {
      let s,
        i = { ...this.headers, ...n }
      t instanceof FormData
        ? ((s = t), (i = void 0))
        : t && (s = JSON.stringify(t)),
        this.beforeRequestHandler()
      const r = await fetch(this.buildRequestURL(e), {
        method: 'post',
        headers: i,
        body: s,
      })
      if (!r.ok) throw new Error(await r.text())
      return await r.json()
    } catch (e) {
      throw (this.handleError(e), e)
    } finally {
      this.afterResponseHandler()
    }
  }
  async put(e, t, n = {}) {
    try {
      let s,
        i = { ...this.headers, ...n }
      t instanceof FormData
        ? ((s = t), (i = void 0))
        : t && (s = JSON.stringify(t)),
        this.beforeRequestHandler()
      const r = await fetch(this.buildRequestURL(e), {
        method: 'put',
        headers: i,
        body: s,
      })
      if (!r.ok) throw new Error(await r.text())
      return await r.json()
    } catch (e) {
      throw (this.handleError(e), e)
    } finally {
      this.afterResponseHandler()
    }
  }
  async delete(e, t = {}) {
    try {
      this.beforeRequestHandler()
      const n = await fetch(this.buildRequestURL(e), {
        method: 'delete',
        headers: { ...this.headers, ...t },
      })
      if (!n.ok) throw new Error(await n.text())
      return await n.json()
    } catch (e) {
      throw (this.handleError(e), e)
    } finally {
      this.afterResponseHandler()
    }
  }
  handleError(e) {
    e instanceof Error ? alert(e.message) : alert('Unexpected error ocurred')
  }
})(
  `${ce}/apis`,
  () => {
    window.dispatchEvent(new CustomEvent('loadingStart'))
  },
  () => {
    window.dispatchEvent(new CustomEvent('loadingStop'))
  }
)
const pe = {
  getPosts: async () => he.get('/posts'),
  getPost: async (e) => he.get(`/posts/${e}`),
  async createPost(e, t, n) {
    const s = new FormData()
    return (
      s.append('tempPost', JSON.stringify(e)),
      s.append('content', t),
      s.append('thumbnail', n),
      he.post('/posts', s, { 'content-type': 'multipart/form-data' })
    )
  },
  async updatePost(e, t, n, s) {
    const i = new FormData()
    return (
      i.append('tempPost', JSON.stringify(t)),
      i.append('content', n),
      s && i.append('thumbnail', s),
      he.put(`/posts/${e}`, i, { 'content-type': 'multipart/form-data' })
    )
  },
  async deletePost(e) {
    await he.delete(`/posts/${e.replace(/\.md$/, '')}`)
  },
  deployPosts: async () => he.post('/deploy'),
  getCategories: async () => he.get('/categories'),
  getTags: async () => he.get('/tags'),
  getLastSyncDatetime: async () => he.get('/configurations/last-sync-datetime'),
  syncRepository: async () => he.post('/configurations/sync-repository'),
  getModifiedPosts: async () => he.get('/modified-posts'),
  getTemplate: async () => he.get('/configurations/template'),
  saveTemplate: async (e) =>
    he.post('/configurations/save-template', { content: e }),
}
class de {
  static splitByIndex(e, t) {
    return [e.slice(0, t), e.slice(t)]
  }
}
let ue = class extends J {
  constructor() {
    super(...arguments), (this.value = '')
  }
  set _value(e) {
    this.dispatchValueChangeEvent(e)
  }
  dispatchValueChangeEvent(e) {
    this.dispatchEvent(
      new CustomEvent('valueChange', { detail: { value: e }, composed: !0 })
    )
  }
  dispatchChangeEvent() {
    this.dispatchEvent(
      new CustomEvent('change', { detail: { value: this.value }, composed: !0 })
    )
  }
  get editor() {
    const e = this.renderRoot.querySelector('#editor')
    if (!e) throw new Error('Failed to find editor')
    return e
  }
  keydownHandler(e) {
    const { key: t, shiftKey: n, metaKey: s, ctrlKey: i } = e
    'Tab' === t && (e.preventDefault(), n ? this.unTab() : this.doTab()),
      'Enter' === t && this.duplicatePrevFragment() && e.preventDefault(),
      (s || i) &&
        ('[' === t && (e.preventDefault(), this.unTab()),
        ']' === t && (e.preventDefault(), this.appendTab()))
  }
  getFrontContent() {
    const { selectionStart: e } = this.editor,
      t = de.splitByIndex(this.value, e)[0].split('\n')
    return t[t.length - 1]
  }
  duplicatePrevFragment() {
    const e = this.getFrontContent(),
      t = /(.?)+([0-9]\.|- |> )/
    if (t.test(e)) {
      const n = e.match(t)
      if (n) return this.appendText(`\n${n[0]}`), !0
    }
    return !1
  }
  placeCaret(e) {
    this.editor.setSelectionRange(e, e)
  }
  getCurrentLineIndex() {
    const { selectionStart: e } = this.editor
    return de.splitByIndex(this.value, e)[0].split('\n').length - 1
  }
  async appendText(e) {
    const { selectionStart: t, selectionEnd: n } = this.editor,
      s = de.splitByIndex(this.value, t)[0],
      i = de.splitByIndex(this.value, n)[1]
    ;(this._value = `${s}${e}${i}`),
      await this.updateComplete,
      this.editor.setSelectionRange(t + e.length, t + e.length)
  }
  async appendTab() {
    const { selectionStart: e } = this.editor,
      t = this.getCurrentLineIndex()
    ;(this._value = this.value
      .split('\n')
      .map((e, n) => (n !== t ? e : `\t${e}`))
      .join('\n')),
      await this.updateComplete,
      this.placeCaret(e + 1)
  }
  doTab() {
    this.appendText('\t')
  }
  async unTab() {
    const e = this.getFrontContent()
    if (/^( |\t)/.test(e)) {
      const { selectionStart: e } = this.editor,
        t = this.getCurrentLineIndex()
      ;(this._value = this.value
        .split('\n')
        .map((e, n) => (n !== t ? e : e.replace(/^( |\t)/, '')))
        .join('\n')),
        await this.updateComplete,
        this.placeCaret(e - 1)
    }
  }
  reset() {
    ;(this._value = ''), (this.editor.value = '')
  }
  focus() {
    this.editor.focus()
  }
  render() {
    return z` <textarea id="editor" @keydown="${
      this.keydownHandler
    }" @input="${() => {
      this._value = this.editor.value
    }}" .value="${this.value}" @change="${() => {
      this.dispatchChangeEvent()
    }}"></textarea> `
  }
}
;(ue.styles = r`:host{display:flex}#editor{font-family:sans-serif;color:var(--theme-font-color);font-size:14px;background-color:var(--theme-light-background-color);padding:10px;border:1px dashed var(--theme-red-color);width:100%;height:700px;outline:0;tab-size:2;overflow:auto;box-sizing:border-box;resize:none}#editor:focus{border-style:solid}#editor::-webkit-scrollbar{cursor:default;width:5px}#editor::-webkit-scrollbar-thumb{background-color:var(--theme-red-color)}`),
  e([te({ type: String })], ue.prototype, 'value', void 0),
  (ue = e([Y('markdown-editor')], ue))
const ge = r`input,select{font-family:sans-serif;color:var(--theme-font-color);font-size:.8rem;box-sizing:border-box;border:1px dashed var(--theme-red-color);outline:0;background-color:transparent;max-width:180px;height:30px;margin:auto 0;padding:0 5px}input[type=checkbox]{margin:auto auto auto 0}input[type=file]{height:inherit;border:none;max-width:inherit}input:focus,select:focus{border-style:solid}input[type=file]:focus{border-style:none}`,
  fe = r`label{font-family:sans-serif;color:var(--theme-font-color);font-size:.8rem;display:grid;grid-template-rows:auto 1fr;gap:5px}`,
  me = r`h2{margin:0 0 10px;padding-bottom:5px;border-bottom:1px dashed var(--theme-red-color)}`,
  be = r`h3{margin:10px 0;padding-bottom:5px;border-bottom:1px dashed var(--theme-red-color)}`,
  we = r`section.container{border:1px dashed var(--theme-red-color);padding:10px;background-color:var(--theme-light-background-color)}`,
  ye = r`.button-container{display:grid;grid-auto-flow:column;gap:10px;justify-content:end}button{background-color:var(--theme-light-background-color);height:40px;min-width:120px;border:1px dashed var(--theme-red-color);font-weight:600;transition:transform .2s ease-in-out 0s}button:hover{transform:scale(1.2,1.2)}button:active{transform:scale(1,1)}button[danger]{color:var(--theme-red-color)}`
class ve extends J {
  constructor() {
    super(...arguments), (this.active = !1)
  }
  beforeActive() {
    return !0
  }
  beforeInactive() {
    return !0
  }
  shouldUpdate(e) {
    return (
      super.shouldUpdate(e),
      !e.has('active') ||
        (this.active ? this.beforeActive() : this.beforeInactive())
    )
  }
  updated(e) {
    e.has('active') && this.active && (document.title = this.pageTitle)
  }
}
e([te({ type: String })], ve.prototype, 'pageTitle', void 0),
  e([te({ type: Boolean })], ve.prototype, 'active', void 0)
let xe = class extends ve {
  constructor() {
    super(...arguments),
      (this.pageTitle = 'Post Logs | 설정'),
      (this.lastSyncDatetime = null),
      (this.template = null)
  }
  get markdownEditor() {
    const e = this.renderRoot.querySelector('markdown-editor')
    if (!e) throw new Error('Failed to find markdown editor')
    return e
  }
  async firstUpdated() {
    this.refreshLastSyncDatetime(), this.fetchTemplate()
  }
  async refreshLastSyncDatetime() {
    this.lastSyncDatetime = await pe.getLastSyncDatetime()
  }
  async fetchTemplate() {
    this.template = await pe.getTemplate()
  }
  async syncRepository() {
    if (this.lastSyncDatetime) {
      if (
        !window.confirm(
          '기존 포스팅 데이터를 삭제하고 저장소와 동기화 하시겠습니까?'
        )
      )
        return
    }
    await pe.syncRepository(), await this.refreshLastSyncDatetime()
  }
  async saveTemplate() {
    if (!this.templateContent)
      return alert('템플릿을 입력해 주세요'), void this.markdownEditor.focus()
    const e = this.templateContent
    await pe.saveTemplate(e),
      alert('새로운 템플릿이 등록 됐습니다.'),
      this.fetchTemplate()
  }
  render() {
    return z`<section id="config"> <section id="template" class="container"> <header> <h2>Template</h2> </header> <markdown-editor @valueChange="${(
      e
    ) => {
      const { value: t } = e.detail
      this.templateContent = t
    }}" .value="${
      this.template || ''
    }"></markdown-editor> <section class="button-container"> <button @click="${
      this.saveTemplate
    }">Save Template</button> </section> </section> <section id="repo-sync" class="container"> <header> <h2>Repository Sync</h2> </header> ${
      this.lastSyncDatetime
        ? z` <label> <span>최근 동기화</span> <input id="sync-date-input" type="datetime-local" readonly="readonly" .value="${((
            e
          ) => {
            const t = new Date().getTimezoneOffset()
            return new Date(e - 60 * t * 1e3).toISOString().split('.')[0]
          })(this.lastSyncDatetime)}"> </label> `
        : z`<p>최근 동기화 기록이 존재하지 않습니다.</p> <p>Sync 버튼을 통해 저장소 동기화를 진행해 주세요</p> `
    } <section class="button-container"> <button @click="${
      this.syncRepository
    }">Sync</button> </section> </section> </section> `
  }
}
function ke() {
  return {
    baseUrl: null,
    breaks: !1,
    extensions: null,
    gfm: !0,
    headerIds: !0,
    headerPrefix: '',
    highlight: null,
    langPrefix: 'language-',
    mangle: !0,
    pedantic: !1,
    renderer: null,
    sanitize: !1,
    sanitizer: null,
    silent: !1,
    smartLists: !1,
    smartypants: !1,
    tokenizer: null,
    walkTokens: null,
    xhtml: !1,
  }
}
;(xe.styles = r`${we} ${me} ${fe} ${ge} ${ye} :host{font-size:.8rem}#config{display:grid;grid-template-columns:1fr;gap:10px}input#sync-date-input{max-width:inherit;text-align:center}p{font-size:.8rem;text-align:center}markdown-editor{margin-top:10px}.button-container{margin-top:10px}#template-list{margin:10px 0;padding:0;list-style:none}`),
  e([te({ type: Number })], xe.prototype, 'lastSyncDatetime', void 0),
  e([te({ type: String })], xe.prototype, 'template', void 0),
  (xe = e([Y('app-config')], xe))
let $e = {
  baseUrl: null,
  breaks: !1,
  extensions: null,
  gfm: !0,
  headerIds: !0,
  headerPrefix: '',
  highlight: null,
  langPrefix: 'language-',
  mangle: !0,
  pedantic: !1,
  renderer: null,
  sanitize: !1,
  sanitizer: null,
  silent: !1,
  smartLists: !1,
  smartypants: !1,
  tokenizer: null,
  walkTokens: null,
  xhtml: !1,
}
const _e = /[&<>"']/,
  Se = /[&<>"']/g,
  Ae = /[<>"']|&(?!#?\w+;)/,
  Ee = /[<>"']|&(?!#?\w+;)/g,
  Te = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' },
  Re = (e) => Te[e]
function Pe(e, t) {
  if (t) {
    if (_e.test(e)) return e.replace(Se, Re)
  } else if (Ae.test(e)) return e.replace(Ee, Re)
  return e
}
const Ce = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi
function ze(e) {
  return e.replace(Ce, (e, t) =>
    'colon' === (t = t.toLowerCase())
      ? ':'
      : '#' === t.charAt(0)
      ? 'x' === t.charAt(1)
        ? String.fromCharCode(parseInt(t.substring(2), 16))
        : String.fromCharCode(+t.substring(1))
      : ''
  )
}
const je = /(^|[^\[])\^/g
function Le(e, t) {
  ;(e = 'string' == typeof e ? e : e.source), (t = t || '')
  const n = {
    replace: (t, s) => (
      (s = (s = s.source || s).replace(je, '$1')), (e = e.replace(t, s)), n
    ),
    getRegex: () => new RegExp(e, t),
  }
  return n
}
const Ue = /[^\w:]/g,
  Ie = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i
function Ne(e, t, n) {
  if (e) {
    let e
    try {
      e = decodeURIComponent(ze(n)).replace(Ue, '').toLowerCase()
    } catch (e) {
      return null
    }
    if (
      0 === e.indexOf('javascript:') ||
      0 === e.indexOf('vbscript:') ||
      0 === e.indexOf('data:')
    )
      return null
  }
  t &&
    !Ie.test(n) &&
    (n = (function (e, t) {
      He[' ' + e] ||
        (Oe.test(e) ? (He[' ' + e] = e + '/') : (He[' ' + e] = Ze(e, '/', !0)))
      const n = -1 === (e = He[' ' + e]).indexOf(':')
      return '//' === t.substring(0, 2)
        ? n
          ? t
          : e.replace(De, '$1') + t
        : '/' === t.charAt(0)
        ? n
          ? t
          : e.replace(qe, '$1') + t
        : e + t
    })(t, n))
  try {
    n = encodeURI(n).replace(/%25/g, '%')
  } catch (e) {
    return null
  }
  return n
}
const He = {},
  Oe = /^[^:]+:\/*[^/]*$/,
  De = /^([^:]+:)[\s\S]*$/,
  qe = /^([^:]+:\/*[^/]*)[\s\S]*$/
const Me = { exec: function () {} }
function Be(e) {
  let t,
    n,
    s = 1
  for (; s < arguments.length; s++)
    for (n in ((t = arguments[s]), t))
      Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
  return e
}
function Fe(e, t) {
  const n = e
    .replace(/\|/g, (e, t, n) => {
      let s = !1,
        i = t
      for (; --i >= 0 && '\\' === n[i]; ) s = !s
      return s ? '|' : ' |'
    })
    .split(/ \|/)
  let s = 0
  if (
    (n[0].trim() || n.shift(),
    n.length > 0 && !n[n.length - 1].trim() && n.pop(),
    n.length > t)
  )
    n.splice(t)
  else for (; n.length < t; ) n.push('')
  for (; s < n.length; s++) n[s] = n[s].trim().replace(/\\\|/g, '|')
  return n
}
function Ze(e, t, n) {
  const s = e.length
  if (0 === s) return ''
  let i = 0
  for (; i < s; ) {
    const r = e.charAt(s - i - 1)
    if (r !== t || n) {
      if (r === t || !n) break
      i++
    } else i++
  }
  return e.slice(0, s - i)
}
function Ve(e) {
  e &&
    e.sanitize &&
    !e.silent &&
    console.warn(
      'marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options'
    )
}
function Qe(e, t) {
  if (t < 1) return ''
  let n = ''
  for (; t > 1; ) 1 & t && (n += e), (t >>= 1), (e += e)
  return n + e
}
function Ge(e, t, n, s) {
  const i = t.href,
    r = t.title ? Pe(t.title) : null,
    o = e[1].replace(/\\([\[\]])/g, '$1')
  if ('!' !== e[0].charAt(0)) {
    s.state.inLink = !0
    const e = {
      type: 'link',
      raw: n,
      href: i,
      title: r,
      text: o,
      tokens: s.inlineTokens(o, []),
    }
    return (s.state.inLink = !1), e
  }
  return { type: 'image', raw: n, href: i, title: r, text: Pe(o) }
}
class We {
  constructor(e) {
    this.options = e || $e
  }
  space(e) {
    const t = this.rules.block.newline.exec(e)
    if (t && t[0].length > 0) return { type: 'space', raw: t[0] }
  }
  code(e) {
    const t = this.rules.block.code.exec(e)
    if (t) {
      const e = t[0].replace(/^ {1,4}/gm, '')
      return {
        type: 'code',
        raw: t[0],
        codeBlockStyle: 'indented',
        text: this.options.pedantic ? e : Ze(e, '\n'),
      }
    }
  }
  fences(e) {
    const t = this.rules.block.fences.exec(e)
    if (t) {
      const e = t[0],
        n = (function (e, t) {
          const n = e.match(/^(\s+)(?:```)/)
          if (null === n) return t
          const s = n[1]
          return t
            .split('\n')
            .map((e) => {
              const t = e.match(/^\s+/)
              if (null === t) return e
              const [n] = t
              return n.length >= s.length ? e.slice(s.length) : e
            })
            .join('\n')
        })(e, t[3] || '')
      return { type: 'code', raw: e, lang: t[2] ? t[2].trim() : t[2], text: n }
    }
  }
  heading(e) {
    const t = this.rules.block.heading.exec(e)
    if (t) {
      let e = t[2].trim()
      if (/#$/.test(e)) {
        const t = Ze(e, '#')
        this.options.pedantic
          ? (e = t.trim())
          : (t && !/ $/.test(t)) || (e = t.trim())
      }
      const n = {
        type: 'heading',
        raw: t[0],
        depth: t[1].length,
        text: e,
        tokens: [],
      }
      return this.lexer.inline(n.text, n.tokens), n
    }
  }
  hr(e) {
    const t = this.rules.block.hr.exec(e)
    if (t) return { type: 'hr', raw: t[0] }
  }
  blockquote(e) {
    const t = this.rules.block.blockquote.exec(e)
    if (t) {
      const e = t[0].replace(/^ *>[ \t]?/gm, '')
      return {
        type: 'blockquote',
        raw: t[0],
        tokens: this.lexer.blockTokens(e, []),
        text: e,
      }
    }
  }
  list(e) {
    let t = this.rules.block.list.exec(e)
    if (t) {
      let n,
        s,
        i,
        r,
        o,
        a,
        l,
        c,
        h,
        p,
        d,
        u,
        g = t[1].trim()
      const f = g.length > 1,
        m = {
          type: 'list',
          raw: '',
          ordered: f,
          start: f ? +g.slice(0, -1) : '',
          loose: !1,
          items: [],
        }
      ;(g = f ? `\\d{1,9}\\${g.slice(-1)}` : `\\${g}`),
        this.options.pedantic && (g = f ? g : '[*+-]')
      const b = new RegExp(`^( {0,3}${g})((?:[\t ][^\\n]*)?(?:\\n|$))`)
      for (
        ;
        e && ((u = !1), (t = b.exec(e))) && !this.rules.block.hr.test(e);

      ) {
        if (
          ((n = t[0]),
          (e = e.substring(n.length)),
          (c = t[2].split('\n', 1)[0]),
          (h = e.split('\n', 1)[0]),
          this.options.pedantic
            ? ((r = 2), (d = c.trimLeft()))
            : ((r = t[2].search(/[^ ]/)),
              (r = r > 4 ? 1 : r),
              (d = c.slice(r)),
              (r += t[1].length)),
          (a = !1),
          !c &&
            /^ *$/.test(h) &&
            ((n += h + '\n'), (e = e.substring(h.length + 1)), (u = !0)),
          !u)
        ) {
          const t = new RegExp(
              `^ {0,${Math.min(
                3,
                r - 1
              )}}(?:[*+-]|\\d{1,9}[.)])((?: [^\\n]*)?(?:\\n|$))`
            ),
            s = new RegExp(
              `^ {0,${Math.min(
                3,
                r - 1
              )}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`
            ),
            i = new RegExp(`^ {0,${Math.min(3, r - 1)}}(?:\`\`\`|~~~)`),
            o = new RegExp(`^ {0,${Math.min(3, r - 1)}}#`)
          for (
            ;
            e &&
            ((p = e.split('\n', 1)[0]),
            (c = p),
            this.options.pedantic &&
              (c = c.replace(/^ {1,4}(?=( {4})*[^ ])/g, '  ')),
            !i.test(c)) &&
            !o.test(c) &&
            !t.test(c) &&
            !s.test(e);

          ) {
            if (c.search(/[^ ]/) >= r || !c.trim()) d += '\n' + c.slice(r)
            else {
              if (a) break
              d += '\n' + c
            }
            a || c.trim() || (a = !0),
              (n += p + '\n'),
              (e = e.substring(p.length + 1))
          }
        }
        m.loose || (l ? (m.loose = !0) : /\n *\n *$/.test(n) && (l = !0)),
          this.options.gfm &&
            ((s = /^\[[ xX]\] /.exec(d)),
            s && ((i = '[ ] ' !== s[0]), (d = d.replace(/^\[[ xX]\] +/, '')))),
          m.items.push({
            type: 'list_item',
            raw: n,
            task: !!s,
            checked: i,
            loose: !1,
            text: d,
          }),
          (m.raw += n)
      }
      ;(m.items[m.items.length - 1].raw = n.trimRight()),
        (m.items[m.items.length - 1].text = d.trimRight()),
        (m.raw = m.raw.trimRight())
      const w = m.items.length
      for (o = 0; o < w; o++) {
        ;(this.lexer.state.top = !1),
          (m.items[o].tokens = this.lexer.blockTokens(m.items[o].text, []))
        const e = m.items[o].tokens.filter((e) => 'space' === e.type),
          t = e.every((e) => {
            const t = e.raw.split('')
            let n = 0
            for (const e of t) if (('\n' === e && (n += 1), n > 1)) return !0
            return !1
          })
        !m.loose && e.length && t && ((m.loose = !0), (m.items[o].loose = !0))
      }
      return m
    }
  }
  html(e) {
    const t = this.rules.block.html.exec(e)
    if (t) {
      const e = {
        type: 'html',
        raw: t[0],
        pre:
          !this.options.sanitizer &&
          ('pre' === t[1] || 'script' === t[1] || 'style' === t[1]),
        text: t[0],
      }
      return (
        this.options.sanitize &&
          ((e.type = 'paragraph'),
          (e.text = this.options.sanitizer
            ? this.options.sanitizer(t[0])
            : Pe(t[0])),
          (e.tokens = []),
          this.lexer.inline(e.text, e.tokens)),
        e
      )
    }
  }
  def(e) {
    const t = this.rules.block.def.exec(e)
    if (t) {
      t[3] && (t[3] = t[3].substring(1, t[3].length - 1))
      return {
        type: 'def',
        tag: t[1].toLowerCase().replace(/\s+/g, ' '),
        raw: t[0],
        href: t[2],
        title: t[3],
      }
    }
  }
  table(e) {
    const t = this.rules.block.table.exec(e)
    if (t) {
      const e = {
        type: 'table',
        header: Fe(t[1]).map((e) => ({ text: e })),
        align: t[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        rows:
          t[3] && t[3].trim() ? t[3].replace(/\n[ \t]*$/, '').split('\n') : [],
      }
      if (e.header.length === e.align.length) {
        e.raw = t[0]
        let n,
          s,
          i,
          r,
          o = e.align.length
        for (n = 0; n < o; n++)
          /^ *-+: *$/.test(e.align[n])
            ? (e.align[n] = 'right')
            : /^ *:-+: *$/.test(e.align[n])
            ? (e.align[n] = 'center')
            : /^ *:-+ *$/.test(e.align[n])
            ? (e.align[n] = 'left')
            : (e.align[n] = null)
        for (o = e.rows.length, n = 0; n < o; n++)
          e.rows[n] = Fe(e.rows[n], e.header.length).map((e) => ({ text: e }))
        for (o = e.header.length, s = 0; s < o; s++)
          (e.header[s].tokens = []),
            this.lexer.inline(e.header[s].text, e.header[s].tokens)
        for (o = e.rows.length, s = 0; s < o; s++)
          for (r = e.rows[s], i = 0; i < r.length; i++)
            (r[i].tokens = []), this.lexer.inline(r[i].text, r[i].tokens)
        return e
      }
    }
  }
  lheading(e) {
    const t = this.rules.block.lheading.exec(e)
    if (t) {
      const e = {
        type: 'heading',
        raw: t[0],
        depth: '=' === t[2].charAt(0) ? 1 : 2,
        text: t[1],
        tokens: [],
      }
      return this.lexer.inline(e.text, e.tokens), e
    }
  }
  paragraph(e) {
    const t = this.rules.block.paragraph.exec(e)
    if (t) {
      const e = {
        type: 'paragraph',
        raw: t[0],
        text: '\n' === t[1].charAt(t[1].length - 1) ? t[1].slice(0, -1) : t[1],
        tokens: [],
      }
      return this.lexer.inline(e.text, e.tokens), e
    }
  }
  text(e) {
    const t = this.rules.block.text.exec(e)
    if (t) {
      const e = { type: 'text', raw: t[0], text: t[0], tokens: [] }
      return this.lexer.inline(e.text, e.tokens), e
    }
  }
  escape(e) {
    const t = this.rules.inline.escape.exec(e)
    if (t) return { type: 'escape', raw: t[0], text: Pe(t[1]) }
  }
  tag(e) {
    const t = this.rules.inline.tag.exec(e)
    if (t)
      return (
        !this.lexer.state.inLink && /^<a /i.test(t[0])
          ? (this.lexer.state.inLink = !0)
          : this.lexer.state.inLink &&
            /^<\/a>/i.test(t[0]) &&
            (this.lexer.state.inLink = !1),
        !this.lexer.state.inRawBlock &&
        /^<(pre|code|kbd|script)(\s|>)/i.test(t[0])
          ? (this.lexer.state.inRawBlock = !0)
          : this.lexer.state.inRawBlock &&
            /^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0]) &&
            (this.lexer.state.inRawBlock = !1),
        {
          type: this.options.sanitize ? 'text' : 'html',
          raw: t[0],
          inLink: this.lexer.state.inLink,
          inRawBlock: this.lexer.state.inRawBlock,
          text: this.options.sanitize
            ? this.options.sanitizer
              ? this.options.sanitizer(t[0])
              : Pe(t[0])
            : t[0],
        }
      )
  }
  link(e) {
    const t = this.rules.inline.link.exec(e)
    if (t) {
      const e = t[2].trim()
      if (!this.options.pedantic && /^</.test(e)) {
        if (!/>$/.test(e)) return
        const t = Ze(e.slice(0, -1), '\\')
        if ((e.length - t.length) % 2 == 0) return
      } else {
        const e = (function (e, t) {
          if (-1 === e.indexOf(t[1])) return -1
          const n = e.length
          let s = 0,
            i = 0
          for (; i < n; i++)
            if ('\\' === e[i]) i++
            else if (e[i] === t[0]) s++
            else if (e[i] === t[1] && (s--, s < 0)) return i
          return -1
        })(t[2], '()')
        if (e > -1) {
          const n = (0 === t[0].indexOf('!') ? 5 : 4) + t[1].length + e
          ;(t[2] = t[2].substring(0, e)),
            (t[0] = t[0].substring(0, n).trim()),
            (t[3] = '')
        }
      }
      let n = t[2],
        s = ''
      if (this.options.pedantic) {
        const e = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n)
        e && ((n = e[1]), (s = e[3]))
      } else s = t[3] ? t[3].slice(1, -1) : ''
      return (
        (n = n.trim()),
        /^</.test(n) &&
          (n =
            this.options.pedantic && !/>$/.test(e)
              ? n.slice(1)
              : n.slice(1, -1)),
        Ge(
          t,
          {
            href: n ? n.replace(this.rules.inline._escapes, '$1') : n,
            title: s ? s.replace(this.rules.inline._escapes, '$1') : s,
          },
          t[0],
          this.lexer
        )
      )
    }
  }
  reflink(e, t) {
    let n
    if (
      (n = this.rules.inline.reflink.exec(e)) ||
      (n = this.rules.inline.nolink.exec(e))
    ) {
      let e = (n[2] || n[1]).replace(/\s+/g, ' ')
      if (((e = t[e.toLowerCase()]), !e || !e.href)) {
        const e = n[0].charAt(0)
        return { type: 'text', raw: e, text: e }
      }
      return Ge(n, e, n[0], this.lexer)
    }
  }
  emStrong(e, t, n = '') {
    let s = this.rules.inline.emStrong.lDelim.exec(e)
    if (!s) return
    if (s[3] && n.match(/[\p{L}\p{N}]/u)) return
    const i = s[1] || s[2] || ''
    if (!i || (i && ('' === n || this.rules.inline.punctuation.exec(n)))) {
      const n = s[0].length - 1
      let i,
        r,
        o = n,
        a = 0
      const l =
        '*' === s[0][0]
          ? this.rules.inline.emStrong.rDelimAst
          : this.rules.inline.emStrong.rDelimUnd
      for (
        l.lastIndex = 0, t = t.slice(-1 * e.length + n);
        null != (s = l.exec(t));

      ) {
        if (((i = s[1] || s[2] || s[3] || s[4] || s[5] || s[6]), !i)) continue
        if (((r = i.length), s[3] || s[4])) {
          o += r
          continue
        }
        if ((s[5] || s[6]) && n % 3 && !((n + r) % 3)) {
          a += r
          continue
        }
        if (((o -= r), o > 0)) continue
        if (((r = Math.min(r, r + o + a)), Math.min(n, r) % 2)) {
          const t = e.slice(1, n + s.index + r)
          return {
            type: 'em',
            raw: e.slice(0, n + s.index + r + 1),
            text: t,
            tokens: this.lexer.inlineTokens(t, []),
          }
        }
        const t = e.slice(2, n + s.index + r - 1)
        return {
          type: 'strong',
          raw: e.slice(0, n + s.index + r + 1),
          text: t,
          tokens: this.lexer.inlineTokens(t, []),
        }
      }
    }
  }
  codespan(e) {
    const t = this.rules.inline.code.exec(e)
    if (t) {
      let e = t[2].replace(/\n/g, ' ')
      const n = /[^ ]/.test(e),
        s = /^ /.test(e) && / $/.test(e)
      return (
        n && s && (e = e.substring(1, e.length - 1)),
        (e = Pe(e, !0)),
        { type: 'codespan', raw: t[0], text: e }
      )
    }
  }
  br(e) {
    const t = this.rules.inline.br.exec(e)
    if (t) return { type: 'br', raw: t[0] }
  }
  del(e) {
    const t = this.rules.inline.del.exec(e)
    if (t)
      return {
        type: 'del',
        raw: t[0],
        text: t[2],
        tokens: this.lexer.inlineTokens(t[2], []),
      }
  }
  autolink(e, t) {
    const n = this.rules.inline.autolink.exec(e)
    if (n) {
      let e, s
      return (
        '@' === n[2]
          ? ((e = Pe(this.options.mangle ? t(n[1]) : n[1])),
            (s = 'mailto:' + e))
          : ((e = Pe(n[1])), (s = e)),
        {
          type: 'link',
          raw: n[0],
          text: e,
          href: s,
          tokens: [{ type: 'text', raw: e, text: e }],
        }
      )
    }
  }
  url(e, t) {
    let n
    if ((n = this.rules.inline.url.exec(e))) {
      let e, s
      if ('@' === n[2])
        (e = Pe(this.options.mangle ? t(n[0]) : n[0])), (s = 'mailto:' + e)
      else {
        let t
        do {
          ;(t = n[0]), (n[0] = this.rules.inline._backpedal.exec(n[0])[0])
        } while (t !== n[0])
        ;(e = Pe(n[0])), (s = 'www.' === n[1] ? 'http://' + e : e)
      }
      return {
        type: 'link',
        raw: n[0],
        text: e,
        href: s,
        tokens: [{ type: 'text', raw: e, text: e }],
      }
    }
  }
  inlineText(e, t) {
    const n = this.rules.inline.text.exec(e)
    if (n) {
      let e
      return (
        (e = this.lexer.state.inRawBlock
          ? this.options.sanitize
            ? this.options.sanitizer
              ? this.options.sanitizer(n[0])
              : Pe(n[0])
            : n[0]
          : Pe(this.options.smartypants ? t(n[0]) : n[0])),
        { type: 'text', raw: n[0], text: e }
      )
    }
  }
}
const Ke = {
  newline: /^(?: *(?:\n|$))+/,
  code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
  fences:
    /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
  hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
  heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
  html: '^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))',
  def: /^ {0,3}\[(label)\]: *(?:\n *)?<?([^\s>]+)>?(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
  table: Me,
  lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
  _paragraph:
    /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
  text: /^[^\n]+/,
  _label: /(?!\s*\])(?:\\.|[^\[\]\\])+/,
  _title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/,
}
;(Ke.def = Le(Ke.def)
  .replace('label', Ke._label)
  .replace('title', Ke._title)
  .getRegex()),
  (Ke.bullet = /(?:[*+-]|\d{1,9}[.)])/),
  (Ke.listItemStart = Le(/^( *)(bull) */)
    .replace('bull', Ke.bullet)
    .getRegex()),
  (Ke.list = Le(Ke.list)
    .replace(/bull/g, Ke.bullet)
    .replace(
      'hr',
      '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))'
    )
    .replace('def', '\\n+(?=' + Ke.def.source + ')')
    .getRegex()),
  (Ke._tag =
    'address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul'),
  (Ke._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/),
  (Ke.html = Le(Ke.html, 'i')
    .replace('comment', Ke._comment)
    .replace('tag', Ke._tag)
    .replace(
      'attribute',
      / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/
    )
    .getRegex()),
  (Ke.paragraph = Le(Ke._paragraph)
    .replace('hr', Ke.hr)
    .replace('heading', ' {0,3}#{1,6} ')
    .replace('|lheading', '')
    .replace('|table', '')
    .replace('blockquote', ' {0,3}>')
    .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
    .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
    .replace(
      'html',
      '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)'
    )
    .replace('tag', Ke._tag)
    .getRegex()),
  (Ke.blockquote = Le(Ke.blockquote)
    .replace('paragraph', Ke.paragraph)
    .getRegex()),
  (Ke.normal = Be({}, Ke)),
  (Ke.gfm = Be({}, Ke.normal, {
    table:
      '^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)',
  })),
  (Ke.gfm.table = Le(Ke.gfm.table)
    .replace('hr', Ke.hr)
    .replace('heading', ' {0,3}#{1,6} ')
    .replace('blockquote', ' {0,3}>')
    .replace('code', ' {4}[^\\n]')
    .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
    .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
    .replace(
      'html',
      '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)'
    )
    .replace('tag', Ke._tag)
    .getRegex()),
  (Ke.gfm.paragraph = Le(Ke._paragraph)
    .replace('hr', Ke.hr)
    .replace('heading', ' {0,3}#{1,6} ')
    .replace('|lheading', '')
    .replace('table', Ke.gfm.table)
    .replace('blockquote', ' {0,3}>')
    .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
    .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
    .replace(
      'html',
      '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)'
    )
    .replace('tag', Ke._tag)
    .getRegex()),
  (Ke.pedantic = Be({}, Ke.normal, {
    html: Le(
      '^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))'
    )
      .replace('comment', Ke._comment)
      .replace(
        /tag/g,
        '(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b'
      )
      .getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: Me,
    paragraph: Le(Ke.normal._paragraph)
      .replace('hr', Ke.hr)
      .replace('heading', ' *#{1,6} *[^\n]')
      .replace('lheading', Ke.lheading)
      .replace('blockquote', ' {0,3}>')
      .replace('|fences', '')
      .replace('|list', '')
      .replace('|html', '')
      .getRegex(),
  }))
const Je = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: Me,
  tag: '^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>',
  link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(ref)\]/,
  nolink: /^!?\[(ref)\](?:\[\])?/,
  reflinkSearch: 'reflink|nolink(?!\\()',
  emStrong: {
    lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
    rDelimAst:
      /^[^_*]*?\_\_[^_*]*?\*[^_*]*?(?=\_\_)|[^*]+(?=[^*])|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,
    rDelimUnd:
      /^[^_*]*?\*\*[^_*]*?\_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/,
  },
  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: Me,
  text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
  punctuation: /^([\spunctuation])/,
}
function Xe(e) {
  return e
    .replace(/---/g, '—')
    .replace(/--/g, '–')
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1‘')
    .replace(/'/g, '’')
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1“')
    .replace(/"/g, '”')
    .replace(/\.{3}/g, '…')
}
function Ye(e) {
  let t,
    n,
    s = ''
  const i = e.length
  for (t = 0; t < i; t++)
    (n = e.charCodeAt(t)),
      Math.random() > 0.5 && (n = 'x' + n.toString(16)),
      (s += '&#' + n + ';')
  return s
}
;(Je._punctuation = '!"#$%&\'()+\\-.,/:;<=>?@\\[\\]`^{|}~'),
  (Je.punctuation = Le(Je.punctuation)
    .replace(/punctuation/g, Je._punctuation)
    .getRegex()),
  (Je.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g),
  (Je.escapedEmSt = /\\\*|\\_/g),
  (Je._comment = Le(Ke._comment).replace('(?:--\x3e|$)', '--\x3e').getRegex()),
  (Je.emStrong.lDelim = Le(Je.emStrong.lDelim)
    .replace(/punct/g, Je._punctuation)
    .getRegex()),
  (Je.emStrong.rDelimAst = Le(Je.emStrong.rDelimAst, 'g')
    .replace(/punct/g, Je._punctuation)
    .getRegex()),
  (Je.emStrong.rDelimUnd = Le(Je.emStrong.rDelimUnd, 'g')
    .replace(/punct/g, Je._punctuation)
    .getRegex()),
  (Je._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g),
  (Je._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/),
  (Je._email =
    /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/),
  (Je.autolink = Le(Je.autolink)
    .replace('scheme', Je._scheme)
    .replace('email', Je._email)
    .getRegex()),
  (Je._attribute =
    /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/),
  (Je.tag = Le(Je.tag)
    .replace('comment', Je._comment)
    .replace('attribute', Je._attribute)
    .getRegex()),
  (Je._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/),
  (Je._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/),
  (Je._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/),
  (Je.link = Le(Je.link)
    .replace('label', Je._label)
    .replace('href', Je._href)
    .replace('title', Je._title)
    .getRegex()),
  (Je.reflink = Le(Je.reflink)
    .replace('label', Je._label)
    .replace('ref', Ke._label)
    .getRegex()),
  (Je.nolink = Le(Je.nolink).replace('ref', Ke._label).getRegex()),
  (Je.reflinkSearch = Le(Je.reflinkSearch, 'g')
    .replace('reflink', Je.reflink)
    .replace('nolink', Je.nolink)
    .getRegex()),
  (Je.normal = Be({}, Je)),
  (Je.pedantic = Be({}, Je.normal, {
    strong: {
      start: /^__|\*\*/,
      middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
      endAst: /\*\*(?!\*)/g,
      endUnd: /__(?!_)/g,
    },
    em: {
      start: /^_|\*/,
      middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
      endAst: /\*(?!\*)/g,
      endUnd: /_(?!_)/g,
    },
    link: Le(/^!?\[(label)\]\((.*?)\)/)
      .replace('label', Je._label)
      .getRegex(),
    reflink: Le(/^!?\[(label)\]\s*\[([^\]]*)\]/)
      .replace('label', Je._label)
      .getRegex(),
  })),
  (Je.gfm = Be({}, Je.normal, {
    escape: Le(Je.escape).replace('])', '~|])').getRegex(),
    _extended_email:
      /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
    url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
    _backpedal:
      /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/,
  })),
  (Je.gfm.url = Le(Je.gfm.url, 'i')
    .replace('email', Je.gfm._extended_email)
    .getRegex()),
  (Je.breaks = Be({}, Je.gfm, {
    br: Le(Je.br).replace('{2,}', '*').getRegex(),
    text: Le(Je.gfm.text)
      .replace('\\b_', '\\b_| {2,}\\n')
      .replace(/\{2,\}/g, '*')
      .getRegex(),
  }))
class et {
  constructor(e) {
    ;(this.tokens = []),
      (this.tokens.links = Object.create(null)),
      (this.options = e || $e),
      (this.options.tokenizer = this.options.tokenizer || new We()),
      (this.tokenizer = this.options.tokenizer),
      (this.tokenizer.options = this.options),
      (this.tokenizer.lexer = this),
      (this.inlineQueue = []),
      (this.state = { inLink: !1, inRawBlock: !1, top: !0 })
    const t = { block: Ke.normal, inline: Je.normal }
    this.options.pedantic
      ? ((t.block = Ke.pedantic), (t.inline = Je.pedantic))
      : this.options.gfm &&
        ((t.block = Ke.gfm),
        this.options.breaks ? (t.inline = Je.breaks) : (t.inline = Je.gfm)),
      (this.tokenizer.rules = t)
  }
  static get rules() {
    return { block: Ke, inline: Je }
  }
  static lex(e, t) {
    return new et(t).lex(e)
  }
  static lexInline(e, t) {
    return new et(t).inlineTokens(e)
  }
  lex(e) {
    let t
    for (
      e = e.replace(/\r\n|\r/g, '\n'), this.blockTokens(e, this.tokens);
      (t = this.inlineQueue.shift());

    )
      this.inlineTokens(t.src, t.tokens)
    return this.tokens
  }
  blockTokens(e, t = []) {
    let n, s, i, r
    for (
      e = this.options.pedantic
        ? e.replace(/\t/g, '    ').replace(/^ +$/gm, '')
        : e.replace(/^( *)(\t+)/gm, (e, t, n) => t + '    '.repeat(n.length));
      e;

    )
      if (
        !(
          this.options.extensions &&
          this.options.extensions.block &&
          this.options.extensions.block.some(
            (s) =>
              !!(n = s.call({ lexer: this }, e, t)) &&
              ((e = e.substring(n.raw.length)), t.push(n), !0)
          )
        )
      )
        if ((n = this.tokenizer.space(e)))
          (e = e.substring(n.raw.length)),
            1 === n.raw.length && t.length > 0
              ? (t[t.length - 1].raw += '\n')
              : t.push(n)
        else if ((n = this.tokenizer.code(e)))
          (e = e.substring(n.raw.length)),
            (s = t[t.length - 1]),
            !s || ('paragraph' !== s.type && 'text' !== s.type)
              ? t.push(n)
              : ((s.raw += '\n' + n.raw),
                (s.text += '\n' + n.text),
                (this.inlineQueue[this.inlineQueue.length - 1].src = s.text))
        else if ((n = this.tokenizer.fences(e)))
          (e = e.substring(n.raw.length)), t.push(n)
        else if ((n = this.tokenizer.heading(e)))
          (e = e.substring(n.raw.length)), t.push(n)
        else if ((n = this.tokenizer.hr(e)))
          (e = e.substring(n.raw.length)), t.push(n)
        else if ((n = this.tokenizer.blockquote(e)))
          (e = e.substring(n.raw.length)), t.push(n)
        else if ((n = this.tokenizer.list(e)))
          (e = e.substring(n.raw.length)), t.push(n)
        else if ((n = this.tokenizer.html(e)))
          (e = e.substring(n.raw.length)), t.push(n)
        else if ((n = this.tokenizer.def(e)))
          (e = e.substring(n.raw.length)),
            (s = t[t.length - 1]),
            !s || ('paragraph' !== s.type && 'text' !== s.type)
              ? this.tokens.links[n.tag] ||
                (this.tokens.links[n.tag] = { href: n.href, title: n.title })
              : ((s.raw += '\n' + n.raw),
                (s.text += '\n' + n.raw),
                (this.inlineQueue[this.inlineQueue.length - 1].src = s.text))
        else if ((n = this.tokenizer.table(e)))
          (e = e.substring(n.raw.length)), t.push(n)
        else if ((n = this.tokenizer.lheading(e)))
          (e = e.substring(n.raw.length)), t.push(n)
        else {
          if (
            ((i = e),
            this.options.extensions && this.options.extensions.startBlock)
          ) {
            let t = 1 / 0
            const n = e.slice(1)
            let s
            this.options.extensions.startBlock.forEach(function (e) {
              ;(s = e.call({ lexer: this }, n)),
                'number' == typeof s && s >= 0 && (t = Math.min(t, s))
            }),
              t < 1 / 0 && t >= 0 && (i = e.substring(0, t + 1))
          }
          if (this.state.top && (n = this.tokenizer.paragraph(i)))
            (s = t[t.length - 1]),
              r && 'paragraph' === s.type
                ? ((s.raw += '\n' + n.raw),
                  (s.text += '\n' + n.text),
                  this.inlineQueue.pop(),
                  (this.inlineQueue[this.inlineQueue.length - 1].src = s.text))
                : t.push(n),
              (r = i.length !== e.length),
              (e = e.substring(n.raw.length))
          else if ((n = this.tokenizer.text(e)))
            (e = e.substring(n.raw.length)),
              (s = t[t.length - 1]),
              s && 'text' === s.type
                ? ((s.raw += '\n' + n.raw),
                  (s.text += '\n' + n.text),
                  this.inlineQueue.pop(),
                  (this.inlineQueue[this.inlineQueue.length - 1].src = s.text))
                : t.push(n)
          else if (e) {
            const t = 'Infinite loop on byte: ' + e.charCodeAt(0)
            if (this.options.silent) {
              console.error(t)
              break
            }
            throw new Error(t)
          }
        }
    return (this.state.top = !0), t
  }
  inline(e, t) {
    this.inlineQueue.push({ src: e, tokens: t })
  }
  inlineTokens(e, t = []) {
    let n,
      s,
      i,
      r,
      o,
      a,
      l = e
    if (this.tokens.links) {
      const e = Object.keys(this.tokens.links)
      if (e.length > 0)
        for (
          ;
          null != (r = this.tokenizer.rules.inline.reflinkSearch.exec(l));

        )
          e.includes(r[0].slice(r[0].lastIndexOf('[') + 1, -1)) &&
            (l =
              l.slice(0, r.index) +
              '[' +
              Qe('a', r[0].length - 2) +
              ']' +
              l.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))
    }
    for (; null != (r = this.tokenizer.rules.inline.blockSkip.exec(l)); )
      l =
        l.slice(0, r.index) +
        '[' +
        Qe('a', r[0].length - 2) +
        ']' +
        l.slice(this.tokenizer.rules.inline.blockSkip.lastIndex)
    for (; null != (r = this.tokenizer.rules.inline.escapedEmSt.exec(l)); )
      l =
        l.slice(0, r.index) +
        '++' +
        l.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex)
    for (; e; )
      if (
        (o || (a = ''),
        (o = !1),
        !(
          this.options.extensions &&
          this.options.extensions.inline &&
          this.options.extensions.inline.some(
            (s) =>
              !!(n = s.call({ lexer: this }, e, t)) &&
              ((e = e.substring(n.raw.length)), t.push(n), !0)
          )
        ))
      )
        if ((n = this.tokenizer.escape(e)))
          (e = e.substring(n.raw.length)), t.push(n)
        else if ((n = this.tokenizer.tag(e)))
          (e = e.substring(n.raw.length)),
            (s = t[t.length - 1]),
            s && 'text' === n.type && 'text' === s.type
              ? ((s.raw += n.raw), (s.text += n.text))
              : t.push(n)
        else if ((n = this.tokenizer.link(e)))
          (e = e.substring(n.raw.length)), t.push(n)
        else if ((n = this.tokenizer.reflink(e, this.tokens.links)))
          (e = e.substring(n.raw.length)),
            (s = t[t.length - 1]),
            s && 'text' === n.type && 'text' === s.type
              ? ((s.raw += n.raw), (s.text += n.text))
              : t.push(n)
        else if ((n = this.tokenizer.emStrong(e, l, a)))
          (e = e.substring(n.raw.length)), t.push(n)
        else if ((n = this.tokenizer.codespan(e)))
          (e = e.substring(n.raw.length)), t.push(n)
        else if ((n = this.tokenizer.br(e)))
          (e = e.substring(n.raw.length)), t.push(n)
        else if ((n = this.tokenizer.del(e)))
          (e = e.substring(n.raw.length)), t.push(n)
        else if ((n = this.tokenizer.autolink(e, Ye)))
          (e = e.substring(n.raw.length)), t.push(n)
        else if (this.state.inLink || !(n = this.tokenizer.url(e, Ye))) {
          if (
            ((i = e),
            this.options.extensions && this.options.extensions.startInline)
          ) {
            let t = 1 / 0
            const n = e.slice(1)
            let s
            this.options.extensions.startInline.forEach(function (e) {
              ;(s = e.call({ lexer: this }, n)),
                'number' == typeof s && s >= 0 && (t = Math.min(t, s))
            }),
              t < 1 / 0 && t >= 0 && (i = e.substring(0, t + 1))
          }
          if ((n = this.tokenizer.inlineText(i, Xe)))
            (e = e.substring(n.raw.length)),
              '_' !== n.raw.slice(-1) && (a = n.raw.slice(-1)),
              (o = !0),
              (s = t[t.length - 1]),
              s && 'text' === s.type
                ? ((s.raw += n.raw), (s.text += n.text))
                : t.push(n)
          else if (e) {
            const t = 'Infinite loop on byte: ' + e.charCodeAt(0)
            if (this.options.silent) {
              console.error(t)
              break
            }
            throw new Error(t)
          }
        } else (e = e.substring(n.raw.length)), t.push(n)
    return t
  }
}
class tt {
  constructor(e) {
    this.options = e || $e
  }
  code(e, t, n) {
    const s = (t || '').match(/\S*/)[0]
    if (this.options.highlight) {
      const t = this.options.highlight(e, s)
      null != t && t !== e && ((n = !0), (e = t))
    }
    return (
      (e = e.replace(/\n$/, '') + '\n'),
      s
        ? '<pre><code class="' +
          this.options.langPrefix +
          Pe(s, !0) +
          '">' +
          (n ? e : Pe(e, !0)) +
          '</code></pre>\n'
        : '<pre><code>' + (n ? e : Pe(e, !0)) + '</code></pre>\n'
    )
  }
  blockquote(e) {
    return `<blockquote>\n${e}</blockquote>\n`
  }
  html(e) {
    return e
  }
  heading(e, t, n, s) {
    if (this.options.headerIds) {
      return `<h${t} id="${
        this.options.headerPrefix + s.slug(n)
      }">${e}</h${t}>\n`
    }
    return `<h${t}>${e}</h${t}>\n`
  }
  hr() {
    return this.options.xhtml ? '<hr/>\n' : '<hr>\n'
  }
  list(e, t, n) {
    const s = t ? 'ol' : 'ul'
    return (
      '<' +
      s +
      (t && 1 !== n ? ' start="' + n + '"' : '') +
      '>\n' +
      e +
      '</' +
      s +
      '>\n'
    )
  }
  listitem(e) {
    return `<li>${e}</li>\n`
  }
  checkbox(e) {
    return (
      '<input ' +
      (e ? 'checked="" ' : '') +
      'disabled="" type="checkbox"' +
      (this.options.xhtml ? ' /' : '') +
      '> '
    )
  }
  paragraph(e) {
    return `<p>${e}</p>\n`
  }
  table(e, t) {
    return (
      t && (t = `<tbody>${t}</tbody>`),
      '<table>\n<thead>\n' + e + '</thead>\n' + t + '</table>\n'
    )
  }
  tablerow(e) {
    return `<tr>\n${e}</tr>\n`
  }
  tablecell(e, t) {
    const n = t.header ? 'th' : 'td'
    return (t.align ? `<${n} align="${t.align}">` : `<${n}>`) + e + `</${n}>\n`
  }
  strong(e) {
    return `<strong>${e}</strong>`
  }
  em(e) {
    return `<em>${e}</em>`
  }
  codespan(e) {
    return `<code>${e}</code>`
  }
  br() {
    return this.options.xhtml ? '<br/>' : '<br>'
  }
  del(e) {
    return `<del>${e}</del>`
  }
  link(e, t, n) {
    if (null === (e = Ne(this.options.sanitize, this.options.baseUrl, e)))
      return n
    let s = '<a href="' + Pe(e) + '"'
    return t && (s += ' title="' + t + '"'), (s += '>' + n + '</a>'), s
  }
  image(e, t, n) {
    if (null === (e = Ne(this.options.sanitize, this.options.baseUrl, e)))
      return n
    let s = `<img src="${e}" alt="${n}"`
    return (
      t && (s += ` title="${t}"`), (s += this.options.xhtml ? '/>' : '>'), s
    )
  }
  text(e) {
    return e
  }
}
class nt {
  strong(e) {
    return e
  }
  em(e) {
    return e
  }
  codespan(e) {
    return e
  }
  del(e) {
    return e
  }
  html(e) {
    return e
  }
  text(e) {
    return e
  }
  link(e, t, n) {
    return '' + n
  }
  image(e, t, n) {
    return '' + n
  }
  br() {
    return ''
  }
}
class st {
  constructor() {
    this.seen = {}
  }
  serialize(e) {
    return e
      .toLowerCase()
      .trim()
      .replace(/<[!\/a-z].*?>/gi, '')
      .replace(
        /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,
        ''
      )
      .replace(/\s/g, '-')
  }
  getNextSafeSlug(e, t) {
    let n = e,
      s = 0
    if (this.seen.hasOwnProperty(n)) {
      s = this.seen[e]
      do {
        s++, (n = e + '-' + s)
      } while (this.seen.hasOwnProperty(n))
    }
    return t || ((this.seen[e] = s), (this.seen[n] = 0)), n
  }
  slug(e, t = {}) {
    const n = this.serialize(e)
    return this.getNextSafeSlug(n, t.dryrun)
  }
}
class it {
  constructor(e) {
    ;(this.options = e || $e),
      (this.options.renderer = this.options.renderer || new tt()),
      (this.renderer = this.options.renderer),
      (this.renderer.options = this.options),
      (this.textRenderer = new nt()),
      (this.slugger = new st())
  }
  static parse(e, t) {
    return new it(t).parse(e)
  }
  static parseInline(e, t) {
    return new it(t).parseInline(e)
  }
  parse(e, t = !0) {
    let n,
      s,
      i,
      r,
      o,
      a,
      l,
      c,
      h,
      p,
      d,
      u,
      g,
      f,
      m,
      b,
      w,
      y,
      v,
      x = ''
    const k = e.length
    for (n = 0; n < k; n++)
      if (
        ((p = e[n]),
        this.options.extensions &&
          this.options.extensions.renderers &&
          this.options.extensions.renderers[p.type] &&
          ((v = this.options.extensions.renderers[p.type].call(
            { parser: this },
            p
          )),
          !1 !== v ||
            ![
              'space',
              'hr',
              'heading',
              'code',
              'table',
              'blockquote',
              'list',
              'html',
              'paragraph',
              'text',
            ].includes(p.type)))
      )
        x += v || ''
      else
        switch (p.type) {
          case 'space':
            continue
          case 'hr':
            x += this.renderer.hr()
            continue
          case 'heading':
            x += this.renderer.heading(
              this.parseInline(p.tokens),
              p.depth,
              ze(this.parseInline(p.tokens, this.textRenderer)),
              this.slugger
            )
            continue
          case 'code':
            x += this.renderer.code(p.text, p.lang, p.escaped)
            continue
          case 'table':
            for (c = '', l = '', r = p.header.length, s = 0; s < r; s++)
              l += this.renderer.tablecell(
                this.parseInline(p.header[s].tokens),
                { header: !0, align: p.align[s] }
              )
            for (
              c += this.renderer.tablerow(l), h = '', r = p.rows.length, s = 0;
              s < r;
              s++
            ) {
              for (a = p.rows[s], l = '', o = a.length, i = 0; i < o; i++)
                l += this.renderer.tablecell(this.parseInline(a[i].tokens), {
                  header: !1,
                  align: p.align[i],
                })
              h += this.renderer.tablerow(l)
            }
            x += this.renderer.table(c, h)
            continue
          case 'blockquote':
            ;(h = this.parse(p.tokens)), (x += this.renderer.blockquote(h))
            continue
          case 'list':
            for (
              d = p.ordered,
                u = p.start,
                g = p.loose,
                r = p.items.length,
                h = '',
                s = 0;
              s < r;
              s++
            )
              (m = p.items[s]),
                (b = m.checked),
                (w = m.task),
                (f = ''),
                m.task &&
                  ((y = this.renderer.checkbox(b)),
                  g
                    ? m.tokens.length > 0 && 'paragraph' === m.tokens[0].type
                      ? ((m.tokens[0].text = y + ' ' + m.tokens[0].text),
                        m.tokens[0].tokens &&
                          m.tokens[0].tokens.length > 0 &&
                          'text' === m.tokens[0].tokens[0].type &&
                          (m.tokens[0].tokens[0].text =
                            y + ' ' + m.tokens[0].tokens[0].text))
                      : m.tokens.unshift({ type: 'text', text: y })
                    : (f += y)),
                (f += this.parse(m.tokens, g)),
                (h += this.renderer.listitem(f, w, b))
            x += this.renderer.list(h, d, u)
            continue
          case 'html':
            x += this.renderer.html(p.text)
            continue
          case 'paragraph':
            x += this.renderer.paragraph(this.parseInline(p.tokens))
            continue
          case 'text':
            for (
              h = p.tokens ? this.parseInline(p.tokens) : p.text;
              n + 1 < k && 'text' === e[n + 1].type;

            )
              (p = e[++n]),
                (h += '\n' + (p.tokens ? this.parseInline(p.tokens) : p.text))
            x += t ? this.renderer.paragraph(h) : h
            continue
          default: {
            const e = 'Token with "' + p.type + '" type was not found.'
            if (this.options.silent) return void console.error(e)
            throw new Error(e)
          }
        }
    return x
  }
  parseInline(e, t) {
    t = t || this.renderer
    let n,
      s,
      i,
      r = ''
    const o = e.length
    for (n = 0; n < o; n++)
      if (
        ((s = e[n]),
        this.options.extensions &&
          this.options.extensions.renderers &&
          this.options.extensions.renderers[s.type] &&
          ((i = this.options.extensions.renderers[s.type].call(
            { parser: this },
            s
          )),
          !1 !== i ||
            ![
              'escape',
              'html',
              'link',
              'image',
              'strong',
              'em',
              'codespan',
              'br',
              'del',
              'text',
            ].includes(s.type)))
      )
        r += i || ''
      else
        switch (s.type) {
          case 'escape':
          case 'text':
            r += t.text(s.text)
            break
          case 'html':
            r += t.html(s.text)
            break
          case 'link':
            r += t.link(s.href, s.title, this.parseInline(s.tokens, t))
            break
          case 'image':
            r += t.image(s.href, s.title, s.text)
            break
          case 'strong':
            r += t.strong(this.parseInline(s.tokens, t))
            break
          case 'em':
            r += t.em(this.parseInline(s.tokens, t))
            break
          case 'codespan':
            r += t.codespan(s.text)
            break
          case 'br':
            r += t.br()
            break
          case 'del':
            r += t.del(this.parseInline(s.tokens, t))
            break
          default: {
            const e = 'Token with "' + s.type + '" type was not found.'
            if (this.options.silent) return void console.error(e)
            throw new Error(e)
          }
        }
    return r
  }
}
function rt(e, t, n) {
  if (null == e)
    throw new Error('marked(): input parameter is undefined or null')
  if ('string' != typeof e)
    throw new Error(
      'marked(): input parameter is of type ' +
        Object.prototype.toString.call(e) +
        ', string expected'
    )
  if (
    ('function' == typeof t && ((n = t), (t = null)),
    Ve((t = Be({}, rt.defaults, t || {}))),
    n)
  ) {
    const s = t.highlight
    let i
    try {
      i = et.lex(e, t)
    } catch (e) {
      return n(e)
    }
    const r = function (e) {
      let r
      if (!e)
        try {
          t.walkTokens && rt.walkTokens(i, t.walkTokens), (r = it.parse(i, t))
        } catch (t) {
          e = t
        }
      return (t.highlight = s), e ? n(e) : n(null, r)
    }
    if (!s || s.length < 3) return r()
    if ((delete t.highlight, !i.length)) return r()
    let o = 0
    return (
      rt.walkTokens(i, function (e) {
        'code' === e.type &&
          (o++,
          setTimeout(() => {
            s(e.text, e.lang, function (t, n) {
              if (t) return r(t)
              null != n && n !== e.text && ((e.text = n), (e.escaped = !0)),
                o--,
                0 === o && r()
            })
          }, 0))
      }),
      void (0 === o && r())
    )
  }
  try {
    const n = et.lex(e, t)
    return t.walkTokens && rt.walkTokens(n, t.walkTokens), it.parse(n, t)
  } catch (e) {
    if (
      ((e.message +=
        '\nPlease report this to https://github.com/markedjs/marked.'),
      t.silent)
    )
      return (
        '<p>An error occurred:</p><pre>' + Pe(e.message + '', !0) + '</pre>'
      )
    throw e
  }
}
;(rt.options = rt.setOptions =
  function (e) {
    var t
    return Be(rt.defaults, e), (t = rt.defaults), ($e = t), rt
  }),
  (rt.getDefaults = ke),
  (rt.defaults = $e),
  (rt.use = function (...e) {
    const t = Be({}, ...e),
      n = rt.defaults.extensions || { renderers: {}, childTokens: {} }
    let s
    e.forEach((e) => {
      if (
        (e.extensions &&
          ((s = !0),
          e.extensions.forEach((e) => {
            if (!e.name) throw new Error('extension name required')
            if (e.renderer) {
              const t = n.renderers ? n.renderers[e.name] : null
              n.renderers[e.name] = t
                ? function (...n) {
                    let s = e.renderer.apply(this, n)
                    return !1 === s && (s = t.apply(this, n)), s
                  }
                : e.renderer
            }
            if (e.tokenizer) {
              if (!e.level || ('block' !== e.level && 'inline' !== e.level))
                throw new Error("extension level must be 'block' or 'inline'")
              n[e.level]
                ? n[e.level].unshift(e.tokenizer)
                : (n[e.level] = [e.tokenizer]),
                e.start &&
                  ('block' === e.level
                    ? n.startBlock
                      ? n.startBlock.push(e.start)
                      : (n.startBlock = [e.start])
                    : 'inline' === e.level &&
                      (n.startInline
                        ? n.startInline.push(e.start)
                        : (n.startInline = [e.start])))
            }
            e.childTokens && (n.childTokens[e.name] = e.childTokens)
          })),
        e.renderer)
      ) {
        const n = rt.defaults.renderer || new tt()
        for (const t in e.renderer) {
          const s = n[t]
          n[t] = (...i) => {
            let r = e.renderer[t].apply(n, i)
            return !1 === r && (r = s.apply(n, i)), r
          }
        }
        t.renderer = n
      }
      if (e.tokenizer) {
        const n = rt.defaults.tokenizer || new We()
        for (const t in e.tokenizer) {
          const s = n[t]
          n[t] = (...i) => {
            let r = e.tokenizer[t].apply(n, i)
            return !1 === r && (r = s.apply(n, i)), r
          }
        }
        t.tokenizer = n
      }
      if (e.walkTokens) {
        const n = rt.defaults.walkTokens
        t.walkTokens = function (t) {
          e.walkTokens.call(this, t), n && n.call(this, t)
        }
      }
      s && (t.extensions = n), rt.setOptions(t)
    })
  }),
  (rt.walkTokens = function (e, t) {
    for (const n of e)
      switch ((t.call(rt, n), n.type)) {
        case 'table':
          for (const e of n.header) rt.walkTokens(e.tokens, t)
          for (const e of n.rows) for (const n of e) rt.walkTokens(n.tokens, t)
          break
        case 'list':
          rt.walkTokens(n.items, t)
          break
        default:
          rt.defaults.extensions &&
          rt.defaults.extensions.childTokens &&
          rt.defaults.extensions.childTokens[n.type]
            ? rt.defaults.extensions.childTokens[n.type].forEach(function (e) {
                rt.walkTokens(n[e], t)
              })
            : n.tokens && rt.walkTokens(n.tokens, t)
      }
  }),
  (rt.parseInline = function (e, t) {
    if (null == e)
      throw new Error(
        'marked.parseInline(): input parameter is undefined or null'
      )
    if ('string' != typeof e)
      throw new Error(
        'marked.parseInline(): input parameter is of type ' +
          Object.prototype.toString.call(e) +
          ', string expected'
      )
    Ve((t = Be({}, rt.defaults, t || {})))
    try {
      const n = et.lexInline(e, t)
      return (
        t.walkTokens && rt.walkTokens(n, t.walkTokens), it.parseInline(n, t)
      )
    } catch (e) {
      if (
        ((e.message +=
          '\nPlease report this to https://github.com/markedjs/marked.'),
        t.silent)
      )
        return (
          '<p>An error occurred:</p><pre>' + Pe(e.message + '', !0) + '</pre>'
        )
      throw e
    }
  }),
  (rt.Parser = it),
  (rt.parser = it.parse),
  (rt.Renderer = tt),
  (rt.TextRenderer = nt),
  (rt.Lexer = et),
  (rt.lexer = et.lex),
  (rt.Tokenizer = We),
  (rt.Slugger = st),
  (rt.parse = rt),
  rt.options,
  rt.setOptions,
  rt.use,
  rt.walkTokens,
  rt.parseInline,
  it.parse,
  et.lex
var ot = r`
  pre code.hljs {
    display: block;
    overflow-x: auto;
    padding: 1em;
  }
  code.hljs {
    padding: 3px 5px;
  }
  .hljs {
    background: var(--code-bg-color);
    color: #fff;
    border-radius: 4px;
    box-shadow: var(--common-shadow);
    line-height: var(--wide-spacing);

    @media (prefers-color-scheme: dark) {
      box-shadow: none;
    }
  }
  .hljs-comment {
    color: #506686;
  }
  .hljs-punctuation,
  .hljs-tag {
    color: #444a;
  }
  .hljs-tag .hljs-attr,
  .hljs-tag .hljs-name {
    color: #4db0d7;
  }
  .hljs-attribute,
  .hljs-doctag,
  .hljs-keyword,
  .hljs-meta .hljs-keyword,
  .hljs-name,
  .hljs-selector-tag {
    font-weight: 700;
  }
  .hljs-deletion,
  .hljs-number,
  .hljs-quote,
  .hljs-selector-class,
  .hljs-selector-id,
  .hljs-string,
  .hljs-template-tag,
  .hljs-type {
    color: #800;
  }
  .hljs-section,
  .hljs-title {
    color: #fff;
    font-weight: 700;
  }
  .hljs-link,
  .hljs-operator,
  .hljs-regexp,
  .hljs-selector-attr,
  .hljs-selector-pseudo,
  .hljs-symbol,
  .hljs-template-variable,
  .hljs-variable {
    color: #ab5656;
  }
  .hljs-literal {
    color: #695;
  }
  .hljs-addition,
  .hljs-built_in,
  .hljs-bullet,
  .hljs-code {
    color: #397300;
  }
  .hljs-meta {
    color: #1f7199;
  }
  .hljs-meta .hljs-string {
    color: #38a;
  }
  .hljs-emphasis {
    font-style: italic;
  }
  .hljs-strong {
    font-weight: 700;
  }

  // Customized
  .hljs.language-bash {
    color: #97a7c8;
  }
  .hljs-keyword {
    color: #d59df6;
  }
  .hljs-string {
    color: #70f49c;
  }
  .hljs-title.class_,
  .hljs-variable {
    color: #e26674;
  }
  .hljs-title.function_ {
    color: #71b1fe;
  }
  .hljs-punctuation {
    color: #ffd703;
  }
  .hljs-attr,
  .hljs-number,
  .hljs-attribute {
    color: #4db0d7;
  }
  .hljs-tag {
    color: #e26674;
  }
  .hljs-tag .hljs-name {
    color: #e26674;
  }
  .hljs-selector-tag,
  .hljs-selector-id {
    color: #ffd703;
  }
`
let at = class extends J {
  get preview() {
    const e = this.renderRoot.querySelector('#preview')
    if (!e) throw new Error('Failed to find preview element')
    return e
  }
  updated(e) {
    e.has('markdown') &&
      this.markdown &&
      (this.renderHtml(), this.highlightCodeBlock())
  }
  async highlightCodeBlock() {
    this.preview.querySelectorAll('pre code').forEach((e) => {
      window.hljs.highlightElement(e)
    })
  }
  renderHtml() {
    this.markdown &&
      (this.preview.innerHTML = `\n      ${rt.parse(this.markdown)}\n    `)
  }
  render() {
    return z` <div id="preview"></div> `
  }
}
;(at.styles = r`${ot} #preview{font-family:sans-serif;color:var(--theme-font-color);font-size:14px;background-color:var(--theme-light-background-color);padding:10px;border:1px dashed var(--theme-red-color);height:700px;outline:0;tab-size:2;overflow:auto;box-sizing:border-box}#preview::-webkit-scrollbar{cursor:default;width:5px}#preview::-webkit-scrollbar-thumb{background-color:var(--theme-red-color)}`),
  e([te({ type: String })], at.prototype, 'markdown', void 0),
  (at = e([Y('markdown-preview')], at))
let lt = class extends J {
  constructor() {
    super(...arguments), (this.enablePreview = !1), (this.content = '')
  }
  render() {
    return z` <section> <header id="header"> <label> <span>Preview</span> <input type="checkbox" .checked="${Boolean(
      this.enablePreview
    )}" @change="${() => {
      this.enablePreview = !this.enablePreview
    }}"> </label> </header> ${
      this.enablePreview
        ? z`<markdown-preview .markdown="${this.content}"></markdown-preview>`
        : z`<markdown-editor .value="${this.content}" @valueChange="${(e) => {
            this.content = e.detail.value
          }}"></markdown-editor>`
    } </section> `
  }
}
;(lt.styles = r`#header{margin-bottom:10px}#header label{display:inline-flex}#header span{font-size:.8rem;margin:auto 0}`),
  e([te({ type: Boolean })], lt.prototype, 'enablePreview', void 0),
  e([te({ type: String })], lt.prototype, 'content', void 0),
  (lt = e([Y('markdown-view-editor')], lt))
let ct = class extends J {
  constructor() {
    super(...arguments), (this.references = []), (this.newReferences = [])
  }
  get newRefForm() {
    const e = this.renderRoot.querySelector('#new-reference-form')
    if (!e) throw new Error('Failed to find target from')
    return e
  }
  get newRefTitleInput() {
    const e = this.renderRoot.querySelector('#reference-title-input')
    if (!e) throw new Error('Failed to find target input')
    return e
  }
  get newRefUrlInput() {
    const e = this.renderRoot.querySelector('#reference-url-input')
    if (!e) throw new Error('Failed to find target input')
    return e
  }
  get selectedRefs() {
    return Array.from(
      this.renderRoot.querySelectorAll('#reference-selector input')
    )
      .filter((e) => e.checked)
      .map((e) => {
        const { title: t, url: n } = e.dataset
        return { title: t, url: n }
      })
  }
  computeReferenceCandidates(e) {
    const t = document.createElement('div')
    t.innerHTML = rt.parse(e)
    const n = t.querySelectorAll('a')
    if (!n.length) return t.remove(), []
    const s = []
    return (
      n.forEach((e) => {
        const { href: t, innerText: n } = e
        ;(null == t ? void 0 : t.startsWith(window.location.origin)) ||
          s.push({ title: n || t, url: t })
      }),
      t.remove(),
      s
    )
  }
  addNewReference(e) {
    e.preventDefault()
    const t = this.newReferences.map(({ url: e }) => e),
      n = this.newRefTitleInput.value,
      s = this.newRefUrlInput.value
    t.indexOf(s) >= 0
      ? alert('동일한 참조항목이 존재 합니다.')
      : ((this.newReferences = [...this.newReferences, { title: n, url: s }]),
        this.newRefForm.reset(),
        this.newRefTitleInput.focus())
  }
  render() {
    let e = []
    return (
      this.content && (e = this.computeReferenceCandidates(this.content)),
      z`<section id="reference-selector" class="container"> <header> <h2>References</h2> </header> ${
        this.references.length
          ? z`<section> <h3>Registered References</h3> <ul> ${this.references.map(
              (e) =>
                z`<li> <label> <input type="checkbox" .defaultChecked="${!0}" data-title="${
                  e.title
                }" data-url="${
                  e.url
                }"> <div class="input-container"> <input .value="${
                  e.title
                }"> <a href="${e.url}" target="_blank">${
                  e.url
                }</a> </div> </label> </li>`
            )} </ul> </section>`
          : ''
      } ${
        e.length
          ? z`<section> <h3>Content References</h3> <ul> ${e.map(
              (e) =>
                z`<li> <label> <input type="checkbox" data-title="${e.title}" data-url="${e.url}"> <div class="input-container"> <input .value="${e.title}"> <a href="${e.url}" target="_blank">${e.url}</a> </div> </label> </li>`
            )} </ul> </section>`
          : ''
      } <section id="custom-ref-container"> <h3>Custom References</h3> <form id="new-reference-form" @submit="${
        this.addNewReference
      }"> <input id="reference-title-input" required placeholder="이름"> <input id="reference-url-input" required type="url" placeholder="URL"> <button>+</button> </form> <ul> ${this.newReferences.map(
        (e) =>
          z`<li> <label> <input type="checkbox" .defaultChecked="${!0}" data-title="${
            e.title
          }" data-url="${
            e.url
          }"> <div class="input-container"> <input .value="${
            e.title
          }"> <a href="${e.url}" target="_blank">${
            e.url
          }</a> </div> </label> </li>`
      )} </ul> </section> </section>`
    )
  }
}
;(ct.styles = r`${we} ${me} ${be} ${ye} #reference-selector ul{display:grid;grid-template-columns:repeat(2,1fr);gap:5px;list-style:none;margin:0;padding:0}#reference-selector li label{display:grid;grid-template-columns:auto 1fr 1fr;gap:5px}#reference-selector input{box-sizing:border-box;border:1px dashed var(--theme-red-color);outline:0;background-color:transparent;max-width:180px;height:30px;margin:auto 0;padding:0 5px}#reference-selector #new-reference-form{display:grid;grid-template-columns:1fr 1fr auto;margin-bottom:10px;gap:10px}#reference-selector #new-reference-form input{max-width:inherit}#reference-selector #new-reference-form button{height:30px;min-width:initial;padding:0 10px}#reference-selector .input-container{display:flex;gap:10px}#reference-selector .input-container a{margin:auto 0;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;max-width:160px}`),
  e([te({ type: String })], ct.prototype, 'content', void 0),
  e([te({ type: Array })], ct.prototype, 'references', void 0),
  e([te({ type: Array })], ct.prototype, 'newReferences', void 0),
  (ct = e([Y('reference-selector')], ct))
let ht = class extends J {
  constructor() {
    super(...arguments),
      (this.tags = []),
      (this.chosenTags = []),
      (this.newTags = [])
  }
  get tagSelectorInputs() {
    return Array.from(
      this.renderRoot.querySelectorAll('#exists-tags input[type=checkbox]')
    )
  }
  newTagChangeHandler(e) {
    const t = e.currentTarget,
      n = Array.from(
        new Set(
          t.value
            .split(',')
            .map((e) => e.trim())
            .filter((e) => e)
        )
      ),
      { newTags: s, existsTags: i } = n.reduce(
        (e, t) => {
          const n = this.tags.find(({ name: e }) => e === t)
          return n ? e.existsTags.push(n) : e.newTags.push({ name: t }), e
        },
        { newTags: [], existsTags: [] }
      )
    if (
      ((this.newTags = s),
      (t.value = s.map(({ name: e }) => e).join(', ')),
      i.length && this.tagSelectorInputs.length)
    ) {
      const e = i.map(({ name: e }) => e)
      this.tagSelectorInputs
        .filter((t) => e.indexOf(t.value) >= 0)
        .forEach((e) => {
          e.setAttribute('checked', '')
        })
    }
  }
  firstUpdated() {
    this.fetchTags()
  }
  async fetchTags() {
    this.tags = await pe.getTags()
  }
  get selectedTags() {
    return [
      ...Array.from(
        this.renderRoot.querySelectorAll('input[type=checkbox].exists-tag')
      )
        .filter(({ checked: e }) => e)
        .map(({ id: e, value: t }) => ({ id: e, name: t })),
      ...Array.from(
        this.renderRoot.querySelectorAll('input[type=checkbox].new-tag')
      )
        .filter(({ checked: e }) => e)
        .map(({ value: e }) => ({ name: e })),
    ]
  }
  render() {
    return z` <section id="tag-selector" class="container"> <header> <h2>Tags</h2> </header> <label id="new-tag-input-label"> <input id="new-tag-input" @change="${
      this.newTagChangeHandler
    }" placeholder="Type tags here as csv format."> </label> ${
      this.newTags.length
        ? z` <div id="new-tags"> ${this.newTags.map(
            (e) =>
              z`<label> <input class="new-tag" type="checkbox" checked="checked" .value="${e.name}" disabled="disabled"> <span>${e.name}</span> </label>`
          )} </div> `
        : ''
    } <div id="exists-tags"> ${this.tags.map(
      (e) =>
        z` <label> <input class="exists-tag" type="checkbox" ?checked="${
          this.chosenTags.findIndex(({ name: t }) => t === e.name) >= 0
        }" id="${e.id}" .value="${e.name}"> <span>${e.name}</span> </label>`
    )} </div> </section> `
  }
}
;(ht.styles = r`${we} ${me} #tag-selector>label>input{box-sizing:border-box;border:1px dashed var(--theme-red-color);outline:0;background-color:transparent;max-width:180px;height:30px;margin:auto 0 5px 0;padding:0 5px}#tag-selector>div{display:grid;grid-template-columns:repeat(6,1fr)}#tag-selector #new-tags{border-bottom:1px dashed var(--theme-red-color);padding:0 0 5px;margin:5px 0}#tag-selector #new-tag-input-label{display:flex}#tag-selector #new-tag-input{max-width:none;flex:1}#tag-selector label{display:grid;grid-template-columns:auto 1fr;gap:5px;overflow:hidden;white-space:nowrap}#tag-selector label>span{text-overflow:ellipsis;overflow:hidden}`),
  e([te({ type: Array })], ht.prototype, 'tags', void 0),
  e([te({ type: Array })], ht.prototype, 'chosenTags', void 0),
  e([te({ type: Array })], ht.prototype, 'newTags', void 0),
  (ht = e([Y('tag-selector')], ht))
let pt = class extends J {
  constructor() {
    super(...arguments),
      (this.categories = []),
      (this.posts = []),
      (this.createMode = !1)
  }
  get thumbnailInput() {
    const e = this.renderRoot.querySelector('#thumbnail-input')
    if (!e) throw new Error('Failed to find input')
    return e
  }
  get tagSelector() {
    const e = this.renderRoot.querySelector('tag-selector')
    if (!e) throw new Error('Failed to find tag selector')
    return e
  }
  get refSelector() {
    const e = this.renderRoot.querySelector('reference-selector')
    if (!e) throw new Error('Failed to find reference selector')
    return e
  }
  firstUpdated() {
    this.fetchPosts(), this.fetchCategories()
  }
  async fetchCategories() {
    this.categories = await pe.getCategories()
  }
  async fetchPosts() {
    this.posts = await pe.getPosts()
  }
  get form() {
    const e = this.renderRoot.querySelector('form')
    if (!e) throw new Error('Failed to find form element')
    return e
  }
  serialize() {
    var e, t, n
    const {
      title: s,
      description: i,
      category: r,
      publishedAt: o,
      published: a = !1,
      nextPostTitle: l,
      prevPostTitle: c,
    } = Object.fromEntries(new FormData(this.form))
    if (!s) throw new Error('포스팅의 제목을 입력해 주세요.')
    if (!r) throw new Error('포스팅의 카테고리를 선택해 주세요.')
    if (!this.createMode && !o)
      throw new Error('포스팅 작성일을 선택해 주세요.')
    if (!i) throw new Error('포스팅의 설명을 입력해 주세요.')
    if (
      !(null === (e = this.thumbnailInput.files) || void 0 === e
        ? void 0
        : e.length) &&
      !(null === (t = this.post) || void 0 === t ? void 0 : t.thumbnailName)
    )
      throw new Error('포스팅 썸네일 이미지를 선택해 주세요.')
    const h = this.tagSelector.selectedTags
    if (!h.length) throw new Error('포스팅의 태그를 선택해 주세요.')
    const p = this.refSelector.selectedRefs,
      d = {
        title: s,
        category: r,
        publishedAt: o,
        published: Boolean(a),
        description: i,
        fileName: `${r.toLowerCase()}-${s.toLowerCase()}.md`.replace(
          / +/g,
          '-'
        ),
        tags: h,
        references: p,
      }
    c && (d.series = { prevPostTitle: c }),
      l && (d.series = { ...d.series, nextPostTitle: l })
    const u = { tempPost: d }
    if (
      null === (n = this.thumbnailInput.files) || void 0 === n ? void 0 : n[0]
    ) {
      const [e] = this.thumbnailInput.files
      u.thumbnail = e
    }
    return u
  }
  render() {
    var e, t, n, s, i, r, o, a, l, c
    return z` <section class="container"> <h2>Info</h2> <form> <label> <span>제목</span> <input name="title" .value="${
      (null === (e = this.post) || void 0 === e ? void 0 : e.title) || ''
    }"> </label> <label> <span>카테고리</span> <input list="category" name="category" .value="${
      (null === (t = this.post) || void 0 === t ? void 0 : t.category) || ''
    }"> <datalist id="category"> ${this.categories.map(
      (e) => z`<option>${e}</option>`
    )} </datalist> </label> <label> <span>작성일</span> <input name="publishedAt" type="date" .value="${
      (null === (n = this.post) || void 0 === n ? void 0 : n.publishedAt) ||
      ((e) => {
        const t = new Date().getTimezoneOffset()
        return new Date(e - 60 * t * 1e3).toISOString().slice(0, 10)
      })(Date.now())
    }"> </label> <label> <span>배포여부</span> <input name="published" type="checkbox" ?checked="${
      (null === (s = this.post) || void 0 === s ? void 0 : s.published) || !1
    }"> </label> <label> <span>이전글</span> <select name="prevPostTitle"> <option></option> ${this.posts.map(
      (e) => {
        var t, n
        return z`<option ?selected="${
          (null ===
            (n =
              null === (t = this.post) || void 0 === t ? void 0 : t.series) ||
          void 0 === n
            ? void 0
            : n.prevPostTitle) === e.title
        }"> ${e.title} </option>`
      }
    )} </select> </label> <label> <span>다음글</span> <select name="nextPostTitle"> <option></option> ${this.posts.map(
      (e) => {
        var t, n
        return z`<option ?selected="${
          (null ===
            (n =
              null === (t = this.post) || void 0 === t ? void 0 : t.series) ||
          void 0 === n
            ? void 0
            : n.nextPostTitle) === e.title
        }"> ${e.title} </option>`
      }
    )} </select> </label> <label class="description"> <span>설명</span> <input name="description" .value="${
      (null === (i = this.post) || void 0 === i ? void 0 : i.description) || ''
    }"> </label> </form> </section> <section id="thumbnail-selector" class="container"> <h2>Thumbnail</h2> <input id="thumbnail-input" name="thumbnailName" type="file" accept="image/png" @input="${(
      e
    ) => {
      var t
      const n = e.currentTarget
      ;(null === (t = n.files) || void 0 === t ? void 0 : t[0])
        ? (this.thumbnailObjURL = window.URL.createObjectURL(n.files[0]))
        : (this.thumbnailObjURL = void 0)
    }}"> ${
      (null === (r = this.post) || void 0 === r ? void 0 : r.thumbnailName) ||
      this.thumbnailObjURL
        ? z`<img class="thumbnail-preview" src="${
            this.thumbnailObjURL
              ? this.thumbnailObjURL
              : `${ce}/${
                  null === (o = this.post) || void 0 === o
                    ? void 0
                    : o.thumbnailName
                }`
          }" alt="${
            (null === (a = this.post) || void 0 === a
              ? void 0
              : a.thumbnailName) || 'Thumbnail preview'
          }">`
        : ''
    } </section> <tag-selector .chosenTags="${
      (null === (l = this.post) || void 0 === l ? void 0 : l.tags) || []
    }"></tag-selector> <reference-selector .references="${
      (null === (c = this.post) || void 0 === c ? void 0 : c.references) || []
    }" .content="${this.content}"></reference-selector> `
  }
}
;(pt.styles = r`${we} ${me} ${ge} :host{font-family:sans-serif;color:var(--theme-font-color);font-size:.8rem;display:grid;grid-template-columns:1fr;gap:10px}form{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}form>label{display:grid;grid-template-rows:auto 1fr;gap:5px}form>label.description{grid-column:1/5}form>label.description>input{max-width:inherit}#thumbnail-selector{display:grid}#thumbnail-selector img{margin:10px auto}#thumbnail-selector .thumbnail-preview{max-height:300px;max-width:100%}`),
  e([te({ type: Object })], pt.prototype, 'post', void 0),
  e([te({ type: String })], pt.prototype, 'content', void 0),
  e([te({ type: Array })], pt.prototype, 'categories', void 0),
  e([te({ type: Array })], pt.prototype, 'posts', void 0),
  e([te({ type: String })], pt.prototype, 'thumbnailObjURL', void 0),
  e([te({ type: Boolean })], pt.prototype, 'createMode', void 0),
  (pt = e([Y('post-info')], pt))
const dt = (e, t = 300) => {
  let n = null
  return (...s) => {
    n && clearTimeout(n),
      (n = setTimeout(() => {
        e(...s)
      }, t))
  }
}
let ut = class extends ve {
  constructor() {
    super(...arguments),
      (this.pageTitle = 'Post Logs | 글쓰기'),
      (this.refCandidates = []),
      (this.template = null)
  }
  firstUpdated(e) {
    super.firstUpdated(e), this.getTemplate()
  }
  async getTemplate() {
    this.template = await pe.getTemplate()
  }
  get postInfo() {
    const e = this.renderRoot.querySelector('post-info')
    if (!e) throw new Error('Failed to find post-info element')
    return e
  }
  async createPostHandler() {
    const { tempPost: e, thumbnail: t } = this.postInfo.serialize()
    if (!this.content) throw new Error('작성된 포스팅이 없습니다.')
    await pe.createPost(e, this.content, t),
      alert('새로운 포스트가 등록 됐습니다.'),
      ie('/')
  }
  render() {
    const e = dt((e) => {
      if (e instanceof CustomEvent) {
        const { value: t } = e.detail
        this.content = t
      }
    })
    return z`<section id="create-post"> <post-info .content="${
      this.content || ''
    }" createMode></post-info> <markdown-view-editor @valueChange="${e}" .content="${
      this.template || ''
    }"></markdown-view-editor> <section id="button-container"> <button @click="${
      this.createPostHandler
    }">저장</button> </section> </section> `
  }
}
;(ut.styles = r`section#create-post{display:grid;grid-template-columns:1fr;gap:10px}section#button-container{display:grid;gap:10px;justify-content:end}button{background-color:var(--theme-light-background-color);height:40px;min-width:120px;border:1px dashed var(--theme-red-color);font-weight:600;transition:transform .2s ease-in-out 0s}button:hover{transform:scale(1.2,1.2)}button:active{transform:scale(1,1)}`),
  e([te({ type: Array })], ut.prototype, 'refCandidates', void 0),
  e([te({ type: String })], ut.prototype, 'content', void 0),
  e([te({ type: String })], ut.prototype, 'template', void 0),
  (ut = e([Y('create-post')], ut))
let gt = class extends J {
  openPostDetail() {
    const e = this.post.fileName.replace(/\.md$/, '')
    ie(`/posts/${e}`)
  }
  render() {
    return z` <section class="post-card" @click="${
      this.openPostDetail
    }" @keydown="${(e) => {
      'enter' === e.key && this.openPostDetail()
    }}"> <div> <header> <span class="category-tag">${
      this.post.category
    }</span> <h2 class="title">${
      this.post.title
    }</h2> </header> <p class="description">${
      this.post.description
    }</p> </div> <div class="right-column"> ${
      this.post.published
        ? z`<span class="published-at">${new Date(
            this.post.publishedAt
          ).toDateString()}</span>`
        : z`<span class="draft-tag">Draft</span>`
    } ${
      this.post.thumbnailName &&
      z`<img class="thumbnail" alt="${
        this.post.title
      }" src="${`${ce}/${this.post.thumbnailName}`}">`
    } </div> </section> `
  }
}
;(gt.styles = r`.post-card{display:grid;grid-template-columns:1fr auto;border:1px dashed var(--theme-red-color);padding:10px;margin-bottom:10px;background-color:var(--theme-light-background-color);transition:transform .2s ease-in-out 0s;cursor:pointer}.post-card:hover{transform:scale(1.15)}header{display:grid;grid-template-columns:auto 1fr;gap:5px}.category-tag{border:1px dashed var(--theme-red-color);border-radius:8px;padding:5px;margin:auto 0;color:var(--theme-red-color);font-size:.7rem;font-weight:600}.title{font-size:.9rem;font-weight:600;color:var(--theme-font-color);margin:10px 0}.description{font-size:.8rem;font-weight:500;margin:0 5px;white-space:pre-wrap}.right-column{display:grid;grid-template-rows:auto 1fr;gap:10px}.published-at{text-align:right;font-size:.8rem;color:var(--theme-red-color);font-weight:600;border:1px dashed var(--theme-red-color);border-radius:8px;padding:5px 10px;margin-left:auto}.draft-tag{border:1px dashed var(--theme-red-color);border-radius:8px;padding:5px 10px;margin-left:auto;color:var(--theme-red-color);font-size:.7rem;font-weight:600}.thumbnail{border-radius:6px;width:250px}`),
  e([te({ type: Object })], gt.prototype, 'post', void 0),
  (gt = e([Y('post-card')], gt))
let ft = class extends ve {
  constructor() {
    super(...arguments),
      (this.pageTitle = 'Post Logs | Deploy'),
      (this.modifiedPosts = [])
  }
  firstUpdated() {
    this.fetchModifiedPosts()
  }
  async fetchModifiedPosts() {
    this.modifiedPosts = await pe.getModifiedPosts()
  }
  async deployPosts() {
    window.confirm('변경 사항을 배포할까요?') &&
      (await pe.deployPosts(),
      window.alert('변경사항이 배포 됐습니다.'),
      ie('/'))
  }
  render() {
    const e = this.modifiedPosts.filter(({ isCreated: e }) => e),
      t = this.modifiedPosts.filter(({ isCreated: e, isUpdated: t }) => !e && t)
    return z`<section id="deploy-post" class="container"> ${
      e.length || t.length ? '' : z` <p>배포할 포스팅이 없습니다.</p> `
    } ${
      e.length
        ? z`<section id="created-posts"> <h2>새로운 포스팅</h2> <ul> ${e.map(
            (e) => z` <li> <post-card .post="${e}"></post-card> </li> `
          )} </ul> </section>`
        : ''
    } ${
      t.length
        ? z`<section id="created-posts"> <h2>수정된 포스팅</h2> <ul> ${t.map(
            (e) => z` <li> <post-card .post="${e}"></post-card> </li> `
          )} </ul> </section>`
        : ''
    } </section> ${
      e.length || t.length
        ? z`<section class="button-container"> <button danger @click="${this.deployPosts}">배포</button> </section> `
        : ''
    } `
  }
}
;(ft.styles = r`:host{font-size:.8rem}#deploy-post{display:grid;gap:10px}${we} ${me} ${ye} ul{margin:0;padding:0;list-style:none}li{margin:0;padding:0}p{text-align:center}.button-container{margin-top:10px}`),
  e([te({ type: Array })], ft.prototype, 'modifiedPosts', void 0),
  (ft = e([Y('deploy-post')], ft))
let mt = class extends J {
  render() {
    return z`<p>Now Loading...</p>`
  }
}
mt = e([Y('now-loading')], mt)
let bt = class extends ve {
  constructor() {
    super(),
      (this.pageTitle = ''),
      (this.enablePreview = !1),
      (this.postFileName = window.location.pathname.replace(/^\/posts\//g, '')),
      this.postFileName || (window.location.href = '/'),
      (this.pageTitle = `Post Logs | ${this.postFileName}`)
  }
  get postInfo() {
    const e = this.renderRoot.querySelector('post-info')
    if (!e) throw new Error('No post info element found')
    return e
  }
  firstUpdated() {
    this.postFileName && this.fetchPost(this.postFileName)
  }
  async fetchPost(e) {
    this.post = await pe.getPost(e)
  }
  async deletePost() {
    var e
    if (!(null === (e = this.post) || void 0 === e ? void 0 : e.fileName))
      throw new Error('No post fileName found')
    window.confirm('포스팅을 삭제할까요?') &&
      (await pe.deletePost(this.post.fileName)),
      alert('포스팅이 삭제 됐습니다.'),
      ie('/')
  }
  async updatePost() {
    var e, t
    try {
      const n = null === (e = this.post) || void 0 === e ? void 0 : e.id
      if (!n) throw new Error('포스팅 아이디를 찾을 수 없습니다.')
      const s =
        this.content ||
        (null === (t = this.post) || void 0 === t ? void 0 : t.content)
      if (!s) throw new Error('작성된 포스팅이 없습니다.')
      const { tempPost: i, thumbnail: r } = this.postInfo.serialize()
      if (!window.confirm('포스팅의 변경사항을 저장할까요?')) return
      await pe.updatePost(n, i, s, r), alert('포스팅이 저장 됐습니다.'), ie('/')
    } catch (e) {
      throw (
        (e instanceof Error
          ? alert(e.message)
          : alert('Unexpected error occurred'),
        e)
      )
    }
  }
  render() {
    var e
    if (!(null === (e = this.post) || void 0 === e ? void 0 : e.content))
      return z`<now-loading></now-loading>`
    const t = dt((e) => {
      if (e instanceof CustomEvent) {
        const { value: t } = e.detail
        this.content = t
      }
    })
    return z` <section id="post-detail"> <post-info .post="${
      this.post
    }" .content="${
      this.content || this.post.content
    }"></post-info> <markdown-view-editor enablePreview @valueChange="${t}" .content="${
      this.post.content
    }"></markdown-view-editor> <div class="button-container"> ${
      this.post.isCreated
        ? z`<button danger @click="${this.deletePost}">삭제</button>`
        : ''
    } <button @click="${this.updatePost}">저장</button> </div> </section> `
  }
}
;(bt.styles = r`${ye} section#post-detail{display:grid;grid-template-columns:1fr;gap:10px}`),
  e([te({ type: Boolean })], bt.prototype, 'enablePreview', void 0),
  e([te({ type: String })], bt.prototype, 'postFileName', void 0),
  e([te({ type: Object })], bt.prototype, 'post', void 0),
  e([te({ type: String })], bt.prototype, 'content', void 0),
  (bt = e([Y('post-detail')], bt))
let wt = class extends ve {
  constructor() {
    super(...arguments),
      (this.pageTitle = 'Post Logs | 포스팅'),
      (this.posts = []),
      (this.keyword = '')
  }
  firstUpdated() {
    this.fetchPosts()
  }
  async fetchPosts() {
    this.posts = await pe.getPosts()
  }
  render() {
    const e = this.posts.filter(
      (e) =>
        !this.keyword ||
        `${e.title}${e.category}${e.tags.map(({ name: e }) => e).join(',')}${e}`
          .toLowerCase()
          .indexOf(this.keyword) >= 0
    )
    return z` <section id="post-list"> <form id="search-form"> <label> <span>Keyword</span> <input type="search" placeholder="Search..." @input="${(
      e
    ) => {
      const t = e.currentTarget
      this.keyword = t.value
    }}"> </label> </form> <ul> ${e.map(
      (e) => z`<li> <post-card .post="${e}"></post-card> </li>`
    )} </ul> </section> `
  }
}
;(wt.styles = r`${fe} ${ge} #post-list{display:grid;gap:10px}#search-form{display:grid;grid-template-columns:repeat(4,1fr)}ul{margin:0;padding:0;list-style:none}`),
  e([te({ type: Array })], wt.prototype, 'posts', void 0),
  e([te({ type: String })], wt.prototype, 'keyword', void 0),
  (wt = e([Y('post-list')], wt))
let yt = class extends J {
  render() {
    return z` <modal-spinner></modal-spinner> <header> <app-title title="Post Logs"></app-title> <nav> <menu-list .menus="${le}"></menu-list> </nav> </header> <main> <dom-router .pages="${le}"></dom-router> </main> `
  }
}
;(yt.styles = r`:host{min-height:100vh;display:flex;flex-direction:column}header{position:sticky;top:0;background-color:var(--theme-background-color)}main{flex-grow:1;width:800px;max-width:800px;margin:20px auto 0 auto;padding-bottom:10px}`),
  e([te({ type: Object })], yt.prototype, 'activePage', void 0),
  (yt = e([Y('post-logs')], yt))
