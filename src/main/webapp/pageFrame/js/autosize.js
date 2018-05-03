/*!
 Autosize 3.0.15
 license: MIT
 http://www.jacklmoore.com/autosize
 */
!function (a, b) {
    if ("function" == typeof define && define.amd)define(["exports", "module"], b); else if ("undefined" != typeof exports && "undefined" != typeof module)b(exports, module); else {
        var c = {exports: {}};
        b(c.exports, c), a.autosize = c.exports
    }
}(this, function (a, b) {
    "use strict";
    function c(a) {
        function b() {
            var b = window.getComputedStyle(a, null);
            n = b.overflowY, "vertical" === b.resize ? a.style.resize = "none" : "both" === b.resize && (a.style.resize = "horizontal"), m = "content-box" === b.boxSizing ? -(parseFloat(b.paddingTop) + parseFloat(b.paddingBottom)) : parseFloat(b.borderTopWidth) + parseFloat(b.borderBottomWidth), isNaN(m) && (m = 0), e()
        }

        function c(b) {
            var c = a.style.width;
            a.style.width = "0px", a.offsetWidth, a.style.width = c, n = b, l && (a.style.overflowY = b), d()
        }

        function d() {
            var b = window.pageYOffset, c = document.body.scrollTop, d = a.style.height;
            a.style.height = "auto";
            var e = a.scrollHeight + m;
            return 0 === a.scrollHeight ? void(a.style.height = d) : (a.style.height = e + "px", o = a.clientWidth, document.documentElement.scrollTop = b, void(document.body.scrollTop = c))
        }

        function e() {
            var b = a.style.height;
            d();
            var e = window.getComputedStyle(a, null);
            if (e.height !== a.style.height ? "visible" !== n && c("visible") : "hidden" !== n && c("hidden"), b !== a.style.height) {
                var f = g("autosize:resized");
                a.dispatchEvent(f)
            }
        }

        var h = void 0 === arguments[1] ? {} : arguments[1], i = h.setOverflowX, j = void 0 === i ? !0 : i, k = h.setOverflowY, l = void 0 === k ? !0 : k;
        if (a && a.nodeName && "TEXTAREA" === a.nodeName && !f.has(a)) {
            var m = null, n = null, o = a.clientWidth, p = function () {
                a.clientWidth !== o && e()
            }, q = function (b) {
                window.removeEventListener("resize", p, !1), a.removeEventListener("input", e, !1), a.removeEventListener("keyup", e, !1), a.removeEventListener("autosize:destroy", q, !1), a.removeEventListener("autosize:update", e, !1), f["delete"](a), Object.keys(b).forEach(function (c) {
                    a.style[c] = b[c]
                })
            }.bind(a, {
                height: a.style.height,
                resize: a.style.resize,
                overflowY: a.style.overflowY,
                overflowX: a.style.overflowX,
                wordWrap: a.style.wordWrap
            });
            a.addEventListener("autosize:destroy", q, !1), "onpropertychange" in a && "oninput" in a && a.addEventListener("keyup", e, !1), window.addEventListener("resize", p, !1), a.addEventListener("input", e, !1), a.addEventListener("autosize:update", e, !1), f.add(a), j && (a.style.overflowX = "hidden", a.style.wordWrap = "break-word"), b()
        }
    }

    function d(a) {
        if (a && a.nodeName && "TEXTAREA" === a.nodeName) {
            var b = g("autosize:destroy");
            a.dispatchEvent(b)
        }
    }

    function e(a) {
        if (a && a.nodeName && "TEXTAREA" === a.nodeName) {
            var b = g("autosize:update");
            a.dispatchEvent(b)
        }
    }

    var f = "function" == typeof Set ? new Set : function () {
        var a = [];
        return {
            has: function (b) {
                return Boolean(a.indexOf(b) > -1)
            }, add: function (b) {
                a.push(b)
            }, "delete": function (b) {
                a.splice(a.indexOf(b), 1)
            }
        }
    }(), g = function (a) {
        return new Event(a)
    };
    try {
        new Event("test")
    } catch (h) {
        g = function (a) {
            var b = document.createEvent("Event");
            return b.initEvent(a, !0, !1), b
        }
    }
    var i = null;
    "undefined" == typeof window || "function" != typeof window.getComputedStyle ? (i = function (a) {
        return a
    }, i.destroy = function (a) {
        return a
    }, i.update = function (a) {
        return a
    }) : (i = function (a, b) {
        return a && Array.prototype.forEach.call(a.length ? a : [a], function (a) {
            return c(a, b)
        }), a
    }, i.destroy = function (a) {
        return a && Array.prototype.forEach.call(a.length ? a : [a], d), a
    }, i.update = function (a) {
        return a && Array.prototype.forEach.call(a.length ? a : [a], e), a
    }), b.exports = i
});