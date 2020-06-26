e.exports = function(e) {
    "use strict";

    function t(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function n(e) {
        for (var n = 1; n < arguments.length; n++) {
            var i = null != arguments[n] ? arguments[n] : {},
                r = Object.keys(i);
            "function" == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(i).filter(function(e) {
                return Object.getOwnPropertyDescriptor(i, e).enumerable
            }))), r.forEach(function(n) {
                t(e, n, i[n])
            })
        }
        return e
    }
    var i = function(e) {
            var t = "transitionend",
                n = {
                    TRANSITION_END: "mmTransitionEnd",
                    triggerTransitionEnd: function(n) {
                        e(n).trigger(t)
                    },
                    supportsTransitionEnd: function() {
                        return Boolean(t)
                    }
                };

            function i(t) {
                var i = this,
                    r = !1;
                return e(this).one(n.TRANSITION_END, function() {
                    r = !0
                }), setTimeout(function() {
                    r || n.triggerTransitionEnd(i)
                }, t), this
            }
            return e.fn.mmEmulateTransitionEnd = i, e.event.special[n.TRANSITION_END] = {
                bindType: t,
                delegateType: t,
                handle: function(t) {
                    if (e(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
                }
            }, n
        }(e = e && e.hasOwnProperty("default") ? e.default : e),
        r = "metisMenu",
        a = e.fn[r],
        o = {
            toggle: !0,
            preventDefault: !0,
            triggerElement: "a",
            parentTrigger: "li",
            subMenu: "ul"
        },
        l = {
            SHOW: "show.metisMenu",
            SHOWN: "shown.metisMenu",
            HIDE: "hide.metisMenu",
            HIDDEN: "hidden.metisMenu",
            CLICK_DATA_API: "click.metisMenu.data-api"
        },
        s = {
            METIS: "metismenu",
            ACTIVE: "mm-active",
            SHOW: "mm-show",
            COLLAPSE: "mm-collapse",
            COLLAPSING: "mm-collapsing",
            COLLAPSED: "mm-collapsed"
        },
        d = function() {
            function t(e, t) {
                this.element = e, this.config = n({}, o, t), this.transitioning = null, this.init()
            }
            var r = t.prototype;
            return r.init = function() {
                var t = this,
                    n = this.config;
                e(this.element).addClass(s.METIS), e(this.element).find(n.parentTrigger + "." + s.ACTIVE).children(n.triggerElement).attr("aria-expanded", "true"), e(this.element).find(n.parentTrigger + "." + s.ACTIVE).parents(n.parentTrigger).addClass(s.ACTIVE), e(this.element).find(n.parentTrigger + "." + s.ACTIVE).parents(n.parentTrigger).children(n.triggerElement).attr("aria-expanded", "true"), e(this.element).find(n.parentTrigger + "." + s.ACTIVE).has(n.subMenu).children(n.subMenu).addClass(s.COLLAPSE + " " + s.SHOW), e(this.element).find(n.parentTrigger).not("." + s.ACTIVE).has(n.subMenu).children(n.subMenu).addClass(s.COLLAPSE), e(this.element).find(n.parentTrigger).has(n.subMenu).children(n.triggerElement).on(l.CLICK_DATA_API, function(i) {
                    var r = e(this),
                        a = r.parent(n.parentTrigger),
                        o = a.siblings(n.parentTrigger).children(n.triggerElement),
                        l = a.children(n.subMenu);
                    n.preventDefault && i.preventDefault(), "true" !== r.attr("aria-disabled") && (a.hasClass(s.ACTIVE) ? (r.attr("aria-expanded", "false"), t.hide(l)) : (t.show(l), r.attr("aria-expanded", "true"), n.toggle && o.attr("aria-expanded", "false")), n.onTransitionStart && n.onTransitionStart(i))
                })
            }, r.show = function(t) {
                var n = this;
                if (!this.transitioning && !e(t).hasClass(s.COLLAPSING)) {
                    var r = e(t),
                        a = e.Event(l.SHOW);
                    if (r.trigger(a), !a.isDefaultPrevented()) {
                        if (r.parent(this.config.parentTrigger).addClass(s.ACTIVE), this.config.toggle) {
                            var o = r.parent(this.config.parentTrigger).siblings().children(this.config.subMenu + "." + s.SHOW);
                            this.hide(o)
                        }
                        r.removeClass(s.COLLAPSE).addClass(s.COLLAPSING).height(0), this.setTransitioning(!0), r.height(t[0].scrollHeight).one(i.TRANSITION_END, function() {
                            n.config && n.element && (r.removeClass(s.COLLAPSING).addClass(s.COLLAPSE + " " + s.SHOW).height(""), n.setTransitioning(!1), r.trigger(l.SHOWN))
                        }).mmEmulateTransitionEnd(350)
                    }
                }
            }, r.hide = function(t) {
                var n = this;
                if (!this.transitioning && e(t).hasClass(s.SHOW)) {
                    var r = e(t),
                        a = e.Event(l.HIDE);
                    if (r.trigger(a), !a.isDefaultPrevented()) {
                        r.parent(this.config.parentTrigger).removeClass(s.ACTIVE), r.height(r.height())[0].offsetHeight, r.addClass(s.COLLAPSING).removeClass(s.COLLAPSE).removeClass(s.SHOW), this.setTransitioning(!0);
                        var o = function() {
                            n.config && n.element && (n.transitioning && n.config.onTransitionEnd && n.config.onTransitionEnd(), n.setTransitioning(!1), r.trigger(l.HIDDEN), r.removeClass(s.COLLAPSING).addClass(s.COLLAPSE))
                        };
                        0 === r.height() || "none" === r.css("display") ? o() : r.height(0).one(i.TRANSITION_END, o).mmEmulateTransitionEnd(350)
                    }
                }
            }, r.setTransitioning = function(e) {
                this.transitioning = e
            }, r.dispose = function() {
                e.removeData(this.element, "metisMenu"), e(this.element).find(this.config.parentTrigger).has(this.config.subMenu).children(this.config.triggerElement).off("click"), this.transitioning = null, this.config = null, this.element = null
            }, t.jQueryInterface = function(i) {
                return this.each(function() {
                    var r = e(this),
                        a = r.data("metisMenu"),
                        l = n({}, o, r.data(), "object" == typeof i && i ? i : {});
                    if (a || (a = new t(this, l), r.data("metisMenu", a)), "string" == typeof i) {
                        if (void 0 === a[i]) throw new Error('No method named "' + i + '"');
                        a[i]()
                    }
                })
            }, t
        }();
    return e.fn[r] = d.jQueryInterface, e.fn[r].Constructor = d, e.fn[r].noConflict = function() {
        return e.fn[r] = a, d.jQueryInterface
    }, d
}(n(1))
},
function(e, t, n) {
    (function(e) {
        e(document).ready(function() {
            e(".btn-open-options").click(function() {
                e(".ui-theme-settings").toggleClass("settings-open")
            }), e(".close-sidebar-btn").click(function() {
                var t = e(this).attr("data-class");
                e(".app-container").toggleClass(t);
                var n = e(this);
                n.hasClass("is-active") ? n.removeClass("is-active") : n.addClass("is-active")
            }), e(".switch-container-class").on("click", function() {
                var t = e(this).attr("data-class");
                e(".app-container").toggleClass(t), e(this).parent().find(".switch-container-class").removeClass("active"), e(this).addClass("active")
            }), e(".switch-theme-class").on("click", function() {
                var t = e(this).attr("data-class");
                "body-tabs-line" == t && (e(".app-container").removeClass("body-tabs-shadow"), e(".app-container").addClass(t)), "body-tabs-shadow" == t && (e(".app-container").removeClass("body-tabs-line"), e(".app-container").addClass(t)), e(this).parent().find(".switch-theme-class").removeClass("active"), e(this).addClass("active")
            }), e(".switch-header-cs-class").on("click", function() {
                var t = e(this).attr("data-class");
                e(".switch-header-cs-class").removeClass("active"), e(this).addClass("active"), e(".app-header").attr("class", "app-header"), e(".app-header").addClass("header-shadow " + t)
            }), e(".switch-sidebar-cs-class").on("click", function() {
                var t = e(this).attr("data-class");
                e(".switch-sidebar-cs-class").removeClass("active"), e(this).addClass("active"), e(".app-sidebar").attr("class", "app-sidebar"), e(".app-sidebar").addClass("sidebar-shadow " + t)
            })
        })
    }).call(this, n(1))
},
function(e, t, n) {
    "use strict";
    n.r(t),
        function(e) {
            var t = n(4),
                i = n.n(t);
            e(document).ready(function() {
                e(function() {
                    var t, n = -1,
                        r = 0;
                    e("#closeButton").click(function() {
                        e(this).is(":checked") ? e("#addBehaviorOnToastCloseClick").prop("disabled", !1) : (e("#addBehaviorOnToastCloseClick").prop("disabled", !0), e("#addBehaviorOnToastCloseClick").prop("checked", !1))
                    }), e("#showtoast").click(function() {
                        var a, o = e("#toastTypeGroup input:radio:checked").val(),
                            l = e("#message").val(),
                            s = e("#title").val() || "",
                            d = e("#showDuration"),
                            u = e("#hideDuration"),
                            c = e("#timeOut"),
                            h = e("#extendedTimeOut"),
                            p = e("#showEasing"),
                            f = e("#hideEasing"),
                            m = e("#showMethod"),
                            g = e("#hideMethod"),
                            _ = r++,
                            y = e("#addClear").prop("checked");
                        i.a.options = {
                            closeButton: e("#closeButton").prop("checked"),
                            debug: e("#debugInfo").prop("checked"),
                            newestOnTop: e("#newestOnTop").prop("checked"),
                            progressBar: e("#progressBar").prop("checked"),
                            rtl: e("#rtl").prop("checked"),
                            positionClass: e("#positionGroup input:radio:checked").val() || "toast-top-right",
                            preventDuplicates: e("#preventDuplicates").prop("checked"),
                            onclick: null
                        }, e("#addBehaviorOnToastClick").prop("checked") && (i.a.options.onclick = function() {
                            alert("You can perform some custom action after a toast goes away")
                        }), e("#addBehaviorOnToastCloseClick").prop("checked") && (i.a.options.onCloseClick = function() {
                            alert("You can perform some custom action when the close button is clicked")
                        }), d.val().length && (i.a.options.showDuration = parseInt(d.val())), u.val().length && (i.a.options.hideDuration = parseInt(u.val())), c.val().length && (i.a.options.timeOut = y ? 0 : parseInt(c.val())), h.val().length && (i.a.options.extendedTimeOut = y ? 0 : parseInt(h.val())), p.val().length && (i.a.options.showEasing = p.val()), f.val().length && (i.a.options.hideEasing = f.val()), m.val().length && (i.a.options.showMethod = m.val()), g.val().length && (i.a.options.hideMethod = g.val()), y && (l = function(e) {
                            return e = e || "Clear itself?", e += '<br /><br /><button type="button" class="btn clear">Yes</button>'
                        }(l), i.a.options.tapToDismiss = !1), l || (++n === (a = ["My name is Inigo Montoya. You killed my father. Prepare to die!", '<div><input class="input-small" value="textbox"/>&nbsp;<a href="http://johnpapa.net" target="_blank">This is a hyperlink</a></div><div><button type="button" id="okBtn" class="btn btn-primary">Close me</button><button type="button" id="surpriseBtn" class="btn" style="margin: 0 8px 0 8px">Surprise me</button></div>', "Are you the six fingered man?", "Inconceivable!", "I do not think that means what you think it means.", "Have fun storming the castle!"]).length && (n = 0), l = a[n]), e("#toastrOptions").text('Command: toastr["' + o + '"]("' + l + (s ? '", "' + s : "") + '")\n\ntoastr.options = ' + JSON.stringify(i.a.options, null, 2));
                        var v = i.a[o](l, s);
                        t = v, void 0 !== v && (v.find("#okBtn").length && v.delegate("#okBtn", "click", function() {
                            alert("you clicked me. i was toast #" + _ + ". goodbye!"), v.remove()
                        }), v.find("#surpriseBtn").length && v.delegate("#surpriseBtn", "click", function() {
                            alert("Surprise! you clicked me. i was toast #" + _ + ". You could perform an action here.")
                        }), v.find(".clear").length && v.delegate(".clear", "click", function() {
                            i.a.clear(v, {
                                force: !0
                            })
                        }))
                    }), e("#clearlasttoast").click(function() {
                        i.a.clear(t)
                    }), e("#cleartoasts").click(function() {
                        i.a.clear()
                    })
                }), e(".show-toastr-example").click(function() {
                    i.a.options = {
                        closeButton: !0,
                        debug: !1,
                        newestOnTop: !0,
                        progressBar: !0,
                        positionClass: "toast-bottom-center",
                        preventDuplicates: !1,
                        onclick: null,
                        showDuration: "300",
                        hideDuration: "1000",
                        timeOut: "5000",
                        extendedTimeOut: "1000",
                        showEasing: "swing",
                        hideEasing: "linear",
                        showMethod: "fadeIn",
                        hideMethod: "fadeOut"
                    }, i.a.info("You don't have any new items in your calendar today!", "Example Toastr")
                })
            })
        }.call(this, n(1))
},
function(e, t) {
    e.exports = function() {
        throw new Error("define cannot be used indirect")
    }
},
function(e, t, n) {
    "use strict";
    n.r(t),
        function(e) {
            var t = n(13);
            e(document).ready(function() {
                setTimeout(function() {
                    if (e(".scrollbar-container")[0]) {
                        e(".scrollbar-container").each(function() {
                            new t.a(e(this)[0], {
                                wheelSpeed: 2,
                                wheelPropagation: !1,
                                minScrollbarLength: 20
                            })
                        });
                        new t.a(".scrollbar-sidebar", {
                            wheelSpeed: 2,
                            wheelPropagation: !1,
                            minScrollbarLength: 20
                        })
                    }
                }, 1e3)
            })
        }.call(this, n(1))
},
function(e, t, n) {
    "use strict";
    n.r(t),
        function(e) {
            n(157);
            e(document).ready(function() {
                e("#calendar-list").fullCalendar({
                    header: {
                        left: "prev,next today",
                        center: "title",
                        right: "listDay,listWeek,month"
                    },
                    themeSystem: "bootstrap4",
                    bootstrapFontAwesome: !0,
                    views: {
                        listDay: {
                            buttonText: "list day"
                        },
                        listWeek: {
                            buttonText: "list week"
                        }
                    },
                    defaultView: "listWeek",
                    defaultDate: "2018-03-12",
                    navLinks: !0,
                    editable: !0,
                    eventLimit: !0,
                    events: [{
                        title: "All Day Event",
                        start: "2018-03-01"
                    }, {
                        title: "Long Event",
                        start: "2018-03-07",
                        end: "2018-03-10"
                    }, {
                        id: 999,
                        title: "Repeating Event",
                        start: "2018-03-09T16:00:00"
                    }, {
                        id: 999,
                        title: "Repeating Event",
                        start: "2018-03-16T16:00:00"
                    }, {
                        title: "Conference",
                        start: "2018-03-11",
                        end: "2018-03-13"
                    }, {
                        title: "Meeting",
                        start: "2018-03-12T10:30:00",
                        end: "2018-03-12T12:30:00"
                    }, {
                        title: "Lunch",
                        start: "2018-03-12T12:00:00"
                    }, {
                        title: "Meeting",
                        start: "2018-03-12T14:30:00"
                    }, {
                        title: "Happy Hour",
                        start: "2018-03-12T17:30:00"
                    }, {
                        title: "Dinner",
                        start: "2018-03-12T20:00:00"
                    }, {
                        title: "Birthday Party",
                        start: "2018-03-13T07:00:00"
                    }, {
                        title: "Click for Google",
                        url: "http://google.com/",
                        start: "2018-03-28"
                    }]
                }), e("#calendar").fullCalendar({
                    header: {
                        left: "prev,next today",
                        center: "title",
                        right: "month,basicWeek,basicDay"
                    },
                    themeSystem: "bootstrap4",
                    bootstrapFontAwesome: !0,
                    defaultDate: "2018-03-12",
                    navLinks: !0,
                    editable: !0,
                    eventLimit: !0,
                    events: [{
                        title: "All Day Event",
                        start: "2018-03-01"
                    }, {
                        title: "Long Event",
                        start: "2018-03-07",
                        end: "2018-03-10"
                    }, {
                        id: 999,
                        title: "Repeating Event",
                        start: "2018-03-09T16:00:00"
                    }, {
                        id: 999,
                        title: "Repeating Event",
                        start: "2018-03-16T16:00:00"
                    }, {
                        title: "Conference",
                        start: "2018-03-11",
                        end: "2018-03-13"
                    }, {
                        title: "Meeting",
                        start: "2018-03-12T10:30:00",
                        end: "2018-03-12T12:30:00"
                    }, {
                        title: "Lunch",
                        start: "2018-03-12T12:00:00"
                    }, {
                        title: "Meeting",
                        start: "2018-03-12T14:30:00"
                    }, {
                        title: "Happy Hour",
                        start: "2018-03-12T17:30:00"
                    }, {
                        title: "Dinner",
                        start: "2018-03-12T20:00:00"
                    }, {
                        title: "Birthday Party",
                        start: "2018-03-13T07:00:00"
                    }, {
                        title: "Click for Google",
                        url: "http://google.com/",
                        start: "2018-03-28"
                    }]
                }), e("#calendar-bg-events").fullCalendar({
                    header: {
                        left: "prev,next today",
                        center: "title",
                        right: "month,agendaWeek,agendaDay,listMonth"
                    },
                    themeSystem: "bootstrap4",
                    bootstrapFontAwesome: !0,
                    defaultDate: "2018-03-12",
                    navLinks: !0,
                    businessHours: !0,
                    editable: !0,
                    events: [{
                        title: "Business Lunch",
                        start: "2018-03-03T13:00:00",
                        constraint: "businessHours"
                    }, {
                        title: "Meeting",
                        start: "2018-03-13T11:00:00",
                        constraint: "availableForMeeting",
                        color: "#257e4a"
                    }, {
                        title: "Conference",
                        start: "2018-03-18",
                        end: "2018-03-20"
                    }, {
                        title: "Party",
                        start: "2018-03-29T20:00:00"
                    }, {
                        id: "availableForMeeting",
                        start: "2018-03-11T10:00:00",
                        end: "2018-03-11T16:00:00",
                        rendering: "background"
                    }, {
                        id: "availableForMeeting",
                        start: "2018-03-13T10:00:00",
                        end: "2018-03-13T16:00:00",
                        rendering: "background"
                    }, {
                        start: "2018-03-24",
                        end: "2018-03-28",
                        overlap: !1,
                        rendering: "background",
                        color: "var(--danger)"
                    }, {
                        start: "2018-03-06",
                        end: "2018-03-08",
                        overlap: !1,
                        rendering: "background",
                        color: "var(--success)"
                    }]
                })
            })
        }.call(this, n(1))
},
function(e, t, n) {
    /*!
     * FullCalendar v3.10.0
     * Docs & License: https://fullcalendar.io/
     * (c) 2018 Adam Shaw
     */
    var i;
    "undefined" != typeof self && self, i = function(e, t) {
        return function(e) {
            var t = {};

            function n(i) {
                if (t[i]) return t[i].exports;
                var r = t[i] = {
                    i: i,
                    l: !1,
                    exports: {}
                };
                return e[i].call(r.exports, r, r.exports, n), r.l = !0, r.exports
            }
            return n.m = e, n.c = t, n.d = function(e, t, i) {
                n.o(e, t) || Object.defineProperty(e, t, {
                    configurable: !1,
                    enumerable: !0,
                    get: i
                })
            }, n.n = function(e) {
                var t = e && e.__esModule ? function() {
                    return e.default
                } : function() {
                    return e
                };
                return n.d(t, "a", t), t
            }, n.o = function(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
            }, n.p = "", n(n.s = 256)
        }([function(t, n) {
            t.exports = e
        }, , function(e, t) {
            var n = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
            };
            t.__extends = function(e, t) {
                function i() {
                    this.constructor = e
                }
                n(e, t), e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, new i)
            }
        }, function(e, n) {
            e.exports = t
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(0),
                r = n(3);

            function a(e) {
                e.height("")
            }

            function o(e) {
                var t, n = e[0].offsetWidth - e[0].clientWidth,
                    i = e[0].offsetHeight - e[0].clientHeight;
                return n = l(n), t = {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: i = l(i)
                }, ! function() {
                    null === s && (e = r("<div><div/></div>").css({
                        position: "absolute",
                        top: -1e3,
                        left: 0,
                        border: 0,
                        padding: 0,
                        overflow: "scroll",
                        direction: "rtl"
                    }).appendTo("body"), t = e.children().offset().left > e.offset().left, e.remove(), s = t);
                    var e, t;
                    return s
                }() || "rtl" !== e.css("direction") ? t.right = n : t.left = n, t
            }

            function l(e) {
                return e = Math.max(0, e), e = Math.round(e)
            }
            t.compensateScroll = function(e, t) {
                t.left && e.css({
                    "border-left-width": 1,
                    "margin-left": t.left - 1
                }), t.right && e.css({
                    "border-right-width": 1,
                    "margin-right": t.right - 1
                })
            }, t.uncompensateScroll = function(e) {
                e.css({
                    "margin-left": "",
                    "margin-right": "",
                    "border-left-width": "",
                    "border-right-width": ""
                })
            }, t.disableCursor = function() {
                r("body").addClass("fc-not-allowed")
            }, t.enableCursor = function() {
                r("body").removeClass("fc-not-allowed")
            }, t.distributeHeight = function(e, t, n) {
                var i = Math.floor(t / e.length),
                    o = Math.floor(t - i * (e.length - 1)),
                    l = [],
                    s = [],
                    d = [],
                    u = 0;
                a(e), e.each(function(t, n) {
                    var a = t === e.length - 1 ? o : i,
                        c = r(n).outerHeight(!0);
                    c < a ? (l.push(n), s.push(c), d.push(r(n).height())) : u += c
                }), n && (t -= u, i = Math.floor(t / l.length), o = Math.floor(t - i * (l.length - 1))), r(l).each(function(e, t) {
                    var n = e === l.length - 1 ? o : i,
                        a = s[e],
                        u = n - (a - d[e]);
                    a < n && r(t).height(u)
                })
            }, t.undistributeHeight = a, t.matchCellWidths = function(e) {
                var t = 0;
                return e.find("> *").each(function(e, n) {
                    var i = r(n).outerWidth();
                    i > t && (t = i)
                }), t++, e.width(t), t
            }, t.subtractInnerElHeight = function(e, t) {
                var n, i = e.add(t);
                return i.css({
                    position: "relative",
                    left: -1
                }), n = e.outerHeight() - t.outerHeight(), i.css({
                    position: "",
                    left: ""
                }), n
            }, t.getScrollParent = function(e) {
                var t = e.css("position"),
                    n = e.parents().filter(function() {
                        var e = r(this);
                        return /(auto|scroll)/.test(e.css("overflow") + e.css("overflow-y") + e.css("overflow-x"))
                    }).eq(0);
                return "fixed" !== t && n.length ? n : r(e[0].ownerDocument || document)
            }, t.getOuterRect = function(e, t) {
                var n = e.offset(),
                    i = n.left - (t ? t.left : 0),
                    r = n.top - (t ? t.top : 0);
                return {
                    left: i,
                    right: i + e.outerWidth(),
                    top: r,
                    bottom: r + e.outerHeight()
                }
            }, t.getClientRect = function(e, t) {
                var n = e.offset(),
                    i = o(e),
                    r = n.left + d(e, "border-left-width") + i.left - (t ? t.left : 0),
                    a = n.top + d(e, "border-top-width") + i.top - (t ? t.top : 0);
                return {
                    left: r,
                    right: r + e[0].clientWidth,
                    top: a,
                    bottom: a + e[0].clientHeight
                }
            }, t.getContentRect = function(e, t) {
                var n = e.offset(),
                    i = n.left + d(e, "border-left-width") + d(e, "padding-left") - (t ? t.left : 0),
                    r = n.top + d(e, "border-top-width") + d(e, "padding-top") - (t ? t.top : 0);
                return {
                    left: i,
                    right: i + e.width(),
                    top: r,
                    bottom: r + e.height()
                }
            }, t.getScrollbarWidths = o;
            var s = null;

            function d(e, t) {
                return parseFloat(e.css(t)) || 0
            }

            function u(e) {
                e.preventDefault()
            }

            function c(e, t, n, i, r) {
                if (n.func) return n.func(e, t);
                var a = e[n.field],
                    o = t[n.field];
                return null == a && i && (a = i[n.field]), null == o && r && (o = r[n.field]), h(a, o) * (n.order || 1)
            }

            function h(e, t) {
                return e || t ? null == t ? -1 : null == e ? 1 : "string" === r.type(e) || "string" === r.type(t) ? String(e).localeCompare(String(t)) : e - t : 0
            }

            function p(e, n) {
                var i, r, a;
                for (i = 0; i < t.unitsDesc.length && !((a = f(r = t.unitsDesc[i], e, n)) >= 1 && M(a)); i++);
                return r
            }

            function f(e, t, n) {
                return null != n ? n.diff(t, e, !0) : i.isDuration(t) ? t.as(e) : t.end.diff(t.start, e, !0)
            }

            function m(e) {
                return Boolean(e.hours() || e.minutes() || e.seconds() || e.milliseconds())
            }

            function g() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                var n = window.console;
                if (n && n.log) return n.log.apply(n, e)
            }
            t.isPrimaryMouseButton = function(e) {
                return 1 === e.which && !e.ctrlKey
            }, t.getEvX = function(e) {
                var t = e.originalEvent.touches;
                return t && t.length ? t[0].pageX : e.pageX
            }, t.getEvY = function(e) {
                var t = e.originalEvent.touches;
                return t && t.length ? t[0].pageY : e.pageY
            }, t.getEvIsTouch = function(e) {
                return /^touch/.test(e.type)
            }, t.preventSelection = function(e) {
                e.addClass("fc-unselectable").on("selectstart", u)
            }, t.allowSelection = function(e) {
                e.removeClass("fc-unselectable").off("selectstart", u)
            }, t.preventDefault = u, t.intersectRects = function(e, t) {
                var n = {
                    left: Math.max(e.left, t.left),
                    right: Math.min(e.right, t.right),
                    top: Math.max(e.top, t.top),
                    bottom: Math.min(e.bottom, t.bottom)
                };
                return n.left < n.right && n.top < n.bottom && n
            }, t.constrainPoint = function(e, t) {
                return {
                    left: Math.min(Math.max(e.left, t.left), t.right),
                    top: Math.min(Math.max(e.top, t.top), t.bottom)
                }
            }, t.getRectCenter = function(e) {
                return {
                    left: (e.left + e.right) / 2,
                    top: (e.top + e.bottom) / 2
                }
            }, t.diffPoints = function(e, t) {
                return {
                    left: e.left - t.left,
                    top: e.top - t.top
                }
            }, t.parseFieldSpecs = function(e) {
                var t, n, i = [],
                    a = [];
                for ("string" == typeof e ? a = e.split(/\s*,\s*/) : "function" == typeof e ? a = [e] : r.isArray(e) && (a = e), t = 0; t < a.length; t++) "string" == typeof(n = a[t]) ? i.push("-" === n.charAt(0) ? {
                    field: n.substring(1),
                    order: -1
                } : {
                    field: n,
                    order: 1
                }) : "function" == typeof n && i.push({
                    func: n
                });
                return i
            }, t.compareByFieldSpecs = function(e, t, n, i, r) {
                var a, o;
                for (a = 0; a < n.length; a++)
                    if (o = c(e, t, n[a], i, r)) return o;
                return 0
            }, t.compareByFieldSpec = c, t.flexibleCompare = h, t.dayIDs = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"], t.unitsDesc = ["year", "month", "week", "day", "hour", "minute", "second", "millisecond"], t.diffDayTime = function(e, t) {
                return i.duration({
                    days: e.clone().stripTime().diff(t.clone().stripTime(), "days"),
                    ms: e.time() - t.time()
                })
            }, t.diffDay = function(e, t) {
                return i.duration({
                    days: e.clone().stripTime().diff(t.clone().stripTime(), "days")
                })
            }, t.diffByUnit = function(e, t, n) {
                return i.duration(Math.round(e.diff(t, n, !0)), n)
            }, t.computeGreatestUnit = p, t.computeDurationGreatestUnit = function(e, t) {
                var n = p(e);
                return "week" === n && "object" == typeof t && t.days && (n = "day"), n
            }, t.divideRangeByDuration = function(e, t, n) {
                var i;
                return m(n) ? (t - e) / n : (i = n.asMonths(), Math.abs(i) >= 1 && M(i) ? t.diff(e, "months", !0) / i : t.diff(e, "days", !0) / n.asDays())
            }, t.divideDurationByDuration = function(e, t) {
                var n, i;
                return m(e) || m(t) ? e / t : (n = e.asMonths(), i = t.asMonths(), Math.abs(n) >= 1 && M(n) && Math.abs(i) >= 1 && M(i) ? n / i : e.asDays() / t.asDays())
            }, t.multiplyDuration = function(e, t) {
                var n;
                return m(e) ? i.duration(e * t) : (n = e.asMonths(), Math.abs(n) >= 1 && M(n) ? i.duration({
                    months: n * t
                }) : i.duration({
                    days: e.asDays() * t
                }))
            }, t.durationHasTime = m, t.isNativeDate = function(e) {
                return "[object Date]" === Object.prototype.toString.call(e) || e instanceof Date
            }, t.isTimeString = function(e) {
                return "string" == typeof e && /^\d+\:\d+(?:\:\d+\.?(?:\d{3})?)?$/.test(e)
            }, t.log = g, t.warn = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                var n = window.console;
                return n && n.warn ? n.warn.apply(n, e) : g.apply(null, e)
            };
            var _ = {}.hasOwnProperty;

            function y(e, t) {
                return _.call(e, t)
            }

            function v(e) {
                return (e + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#039;").replace(/"/g, "&quot;").replace(/\n/g, "<br />")
            }

            function M(e) {
                return e % 1 == 0
            }
            t.mergeProps = function e(t, n) {
                var i, r, a, o, l, s, d = {};
                if (n)
                    for (i = 0; i < n.length; i++) {
                        for (r = n[i], a = [], o = t.length - 1; o >= 0; o--)
                            if ("object" == typeof(l = t[o][r])) a.unshift(l);
                            else if (void 0 !== l) {
                            d[r] = l;
                            break
                        }
                        a.length && (d[r] = e(a))
                    }
                for (i = t.length - 1; i >= 0; i--)
                    for (r in s = t[i]) r in d || (d[r] = s[r]);
                return d
            }, t.copyOwnProps = function(e, t) {
                for (var n in e) y(e, n) && (t[n] = e[n])
            }, t.hasOwnProp = y, t.applyAll = function(e, t, n) {
                if (r.isFunction(e) && (e = [e]), e) {
                    var i = void 0,
                        a = void 0;
                    for (i = 0; i < e.length; i++) a = e[i].apply(t, n) || a;
                    return a
                }
            }, t.removeMatching = function(e, t) {
                for (var n = 0, i = 0; i < e.length;) t(e[i]) ? (e.splice(i, 1), n++) : i++;
                return n
            }, t.removeExact = function(e, t) {
                for (var n = 0, i = 0; i < e.length;) e[i] === t ? (e.splice(i, 1), n++) : i++;
                return n
            }, t.isArraysEqual = function(e, t) {
                var n, i = e.length;
                if (null == i || i !== t.length) return !1;
                for (n = 0; n < i; n++)
                    if (e[n] !== t[n]) return !1;
                return !0
            }, t.firstDefined = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                for (var n = 0; n < e.length; n++)
                    if (void 0 !== e[n]) return e[n]
            }, t.htmlEscape = v, t.stripHtmlEntities = function(e) {
                return e.replace(/&.*?;/g, "")
            }, t.cssToStr = function(e) {
                var t = [];
                return r.each(e, function(e, n) {
                    null != n && t.push(e + ":" + n)
                }), t.join(";")
            }, t.attrsToStr = function(e) {
                var t = [];
                return r.each(e, function(e, n) {
                    null != n && t.push(e + '="' + v(n) + '"')
                }), t.join(" ")
            }, t.capitaliseFirstLetter = function(e) {
                return e.charAt(0).toUpperCase() + e.slice(1)
            }, t.compareNumbers = function(e, t) {
                return e - t
            }, t.isInt = M, t.proxy = function(e, t) {
                var n = e[t];
                return function() {
                    return n.apply(e, arguments)
                }
            }, t.debounce = function(e, t, n) {
                var i, r, a, o, l;
                void 0 === n && (n = !1);
                var s = function() {
                    var d = +new Date - o;
                    d < t ? i = setTimeout(s, t - d) : (i = null, n || (l = e.apply(a, r), a = r = null))
                };
                return function() {
                    a = this, r = arguments, o = +new Date;
                    var d = n && !i;
                    return i || (i = setTimeout(s, t)), d && (l = e.apply(a, r), a = r = null), l
                }
            }
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(0),
                r = n(11),
                a = function() {
                    function e(e, t) {
                        this.isStart = !0, this.isEnd = !0, i.isMoment(e) && (e = e.clone().stripZone()), i.isMoment(t) && (t = t.clone().stripZone()), e && (this.startMs = e.valueOf()), t && (this.endMs = t.valueOf())
                    }
                    return e.invertRanges = function(t, n) {
                        var i, r, a = [],
                            l = n.startMs;
                        for (t.sort(o), i = 0; i < t.length; i++)(r = t[i]).startMs > l && a.push(new e(l, r.startMs)), r.endMs > l && (l = r.endMs);
                        return l < n.endMs && a.push(new e(l, n.endMs)), a
                    }, e.prototype.intersect = function(t) {
                        var n = this.startMs,
                            i = this.endMs,
                            r = null;
                        return null != t.startMs && (n = null == n ? t.startMs : Math.max(n, t.startMs)), null != t.endMs && (i = null == i ? t.endMs : Math.min(i, t.endMs)), (null == n || null == i || n < i) && ((r = new e(n, i)).isStart = this.isStart && n === this.startMs, r.isEnd = this.isEnd && i === this.endMs), r
                    }, e.prototype.intersectsWith = function(e) {
                        return (null == this.endMs || null == e.startMs || this.endMs > e.startMs) && (null == this.startMs || null == e.endMs || this.startMs < e.endMs)
                    }, e.prototype.containsRange = function(e) {
                        return (null == this.startMs || null != e.startMs && e.startMs >= this.startMs) && (null == this.endMs || null != e.endMs && e.endMs <= this.endMs)
                    }, e.prototype.containsDate = function(e) {
                        var t = e.valueOf();
                        return (null == this.startMs || t >= this.startMs) && (null == this.endMs || t < this.endMs)
                    }, e.prototype.constrainDate = function(e) {
                        var t = e.valueOf();
                        return null != this.startMs && t < this.startMs && (t = this.startMs), null != this.endMs && t >= this.endMs && (t = this.endMs - 1), t
                    }, e.prototype.equals = function(e) {
                        return this.startMs === e.startMs && this.endMs === e.endMs
                    }, e.prototype.clone = function() {
                        var t = new e(this.startMs, this.endMs);
                        return t.isStart = this.isStart, t.isEnd = this.isEnd, t
                    }, e.prototype.getStart = function() {
                        return null != this.startMs ? r.default.utc(this.startMs).stripZone() : null
                    }, e.prototype.getEnd = function() {
                        return null != this.endMs ? r.default.utc(this.endMs).stripZone() : null
                    }, e.prototype.as = function(e) {
                        return i.utc(this.endMs).diff(i.utc(this.startMs), e, !0)
                    }, e
                }();

            function o(e, t) {
                return e.startMs - t.startMs
            }
            t.default = a
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(3),
                a = n(52),
                o = n(35),
                l = n(36),
                s = function(e) {
                    function t(n) {
                        var i = e.call(this) || this;
                        return i.calendar = n, i.className = [], i.uid = String(t.uuid++), i
                    }
                    return i.__extends(t, e), t.parse = function(e, t) {
                        var n = new this(t);
                        return !("object" != typeof e || !n.applyProps(e)) && n
                    }, t.normalizeId = function(e) {
                        return e ? String(e) : null
                    }, t.prototype.fetch = function(e, t, n) {}, t.prototype.removeEventDefsById = function(e) {}, t.prototype.removeAllEventDefs = function() {}, t.prototype.getPrimitive = function(e) {}, t.prototype.parseEventDefs = function(e) {
                        var t, n, i = [];
                        for (t = 0; t < e.length; t++)(n = this.parseEventDef(e[t])) && i.push(n);
                        return i
                    }, t.prototype.parseEventDef = function(e) {
                        var t = this.calendar.opt("eventDataTransform"),
                            n = this.eventDataTransform;
                        return t && (e = t(e, this.calendar)), n && (e = n(e, this.calendar)), l.default.parse(e, this)
                    }, t.prototype.applyManualStandardProps = function(e) {
                        return null != e.id && (this.id = t.normalizeId(e.id)), r.isArray(e.className) ? this.className = e.className : "string" == typeof e.className && (this.className = e.className.split(/\s+/)), !0
                    }, t.uuid = 0, t.defineStandardProps = a.default.defineStandardProps, t.copyVerbatimStandardProps = a.default.copyVerbatimStandardProps, t
                }(o.default);
            t.default = s, a.default.mixInto(s), s.defineStandardProps({
                id: !1,
                className: !1,
                color: !0,
                backgroundColor: !0,
                borderColor: !0,
                textColor: !0,
                editable: !0,
                startEditable: !0,
                durationEditable: !0,
                rendering: !0,
                overlap: !0,
                constraint: !0,
                allDayDefault: !0,
                eventDataTransform: !0
            })
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(3),
                a = n(15),
                o = 0,
                l = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return i.__extends(t, e), t.prototype.listenTo = function(e, t, n) {
                        if ("object" == typeof t)
                            for (var i in t) t.hasOwnProperty(i) && this.listenTo(e, i, t[i]);
                        else "string" == typeof t && e.on(t + "." + this.getListenerNamespace(), r.proxy(n, this))
                    }, t.prototype.stopListeningTo = function(e, t) {
                        e.off((t || "") + "." + this.getListenerNamespace())
                    }, t.prototype.getListenerNamespace = function() {
                        return null == this.listenerId && (this.listenerId = o++), "_listener" + this.listenerId
                    }, t
                }(a.default);
            t.default = l
        }, , function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(37),
                a = n(53),
                o = n(16),
                l = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return i.__extends(t, e), t.prototype.buildInstances = function() {
                        return [this.buildInstance()]
                    }, t.prototype.buildInstance = function() {
                        return new a.default(this, this.dateProfile)
                    }, t.prototype.isAllDay = function() {
                        return this.dateProfile.isAllDay()
                    }, t.prototype.clone = function() {
                        var t = e.prototype.clone.call(this);
                        return t.dateProfile = this.dateProfile, t
                    }, t.prototype.rezone = function() {
                        var e = this.source.calendar,
                            t = this.dateProfile;
                        this.dateProfile = new o.default(e.moment(t.start), t.end ? e.moment(t.end) : null, e)
                    }, t.prototype.applyManualStandardProps = function(t) {
                        var n = e.prototype.applyManualStandardProps.call(this, t),
                            i = o.default.parse(t, this.source);
                        return !!i && (this.dateProfile = i, null != t.date && (this.miscProps.date = t.date), n)
                    }, t
                }(r.default);
            t.default = l, l.defineStandardProps({
                start: !1,
                date: !1,
                end: !1,
                allDay: !1
            })
        }, , function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(0),
                r = n(3),
                a = n(4),
                o = /^\s*\d{4}-\d\d$/,
                l = /^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?)?$/,
                s = i.fn;
            t.newMomentProto = s;
            var d = r.extend({}, s);
            t.oldMomentProto = d;
            var u = i.momentProperties;
            u.push("_fullCalendar"), u.push("_ambigTime"), u.push("_ambigZone"), t.oldMomentFormat = function(e, t) {
                return d.format.call(e, t)
            };
            var c = function() {
                return h(arguments)
            };

            function h(e, t, n) {
                void 0 === t && (t = !1), void 0 === n && (n = !1);
                var s, d, u, c, h = e[0],
                    p = 1 === e.length && "string" == typeof h;
                return i.isMoment(h) || a.isNativeDate(h) || void 0 === h ? c = i.apply(null, e) : (s = !1, d = !1, p ? o.test(h) ? (e = [h += "-01"], s = !0, d = !0) : (u = l.exec(h)) && (s = !u[5], d = !0) : r.isArray(h) && (d = !0), c = t || s ? i.utc.apply(i, e) : i.apply(null, e), s ? (c._ambigTime = !0, c._ambigZone = !0) : n && (d ? c._ambigZone = !0 : p && c.utcOffset(h))), c._fullCalendar = !0, c
            }
            t.default = c, c.utc = function() {
                var e = h(arguments, !0);
                return e.hasTime() && e.utc(), e
            }, c.parseZone = function() {
                return h(arguments, !0, !0)
            }, s.week = s.weeks = function(e) {
                var t = this._locale._fullCalendar_weekCalc;
                return null == e && "function" == typeof t ? t(this) : "ISO" === t ? d.isoWeek.apply(this, arguments) : d.week.apply(this, arguments)
            }, s.time = function(e) {
                if (!this._fullCalendar) return d.time.apply(this, arguments);
                if (null == e) return i.duration({
                    hours: this.hours(),
                    minutes: this.minutes(),
                    seconds: this.seconds(),
                    milliseconds: this.milliseconds()
                });
                this._ambigTime = !1, i.isDuration(e) || i.isMoment(e) || (e = i.duration(e));
                var t = 0;
                return i.isDuration(e) && (t = 24 * Math.floor(e.asDays())), this.hours(t + e.hours()).minutes(e.minutes()).seconds(e.seconds()).milliseconds(e.milliseconds())
            }, s.stripTime = function() {
                return this._ambigTime || (this.utc(!0), this.set({
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    ms: 0
                }), this._ambigTime = !0, this._ambigZone = !0), this
            }, s.hasTime = function() {
                return !this._ambigTime
            }, s.stripZone = function() {
                var e;
                return this._ambigZone || (e = this._ambigTime, this.utc(!0), this._ambigTime = e || !1, this._ambigZone = !0), this
            }, s.hasZone = function() {
                return !this._ambigZone
            }, s.local = function(e) {
                return d.local.call(this, this._ambigZone || e), this._ambigTime = !1, this._ambigZone = !1, this
            }, s.utc = function(e) {
                return d.utc.call(this, e), this._ambigTime = !1, this._ambigZone = !1, this
            }, s.utcOffset = function(e) {
                return null != e && (this._ambigTime = !1, this._ambigZone = !1), d.utcOffset.apply(this, arguments)
            }
        }, function(e, t) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = function() {
                function e(e, t) {
                    this.isAllDay = !1, this.unzonedRange = e, this.isAllDay = t
                }
                return e.prototype.toLegacy = function(e) {
                    return {
                        start: e.msToMoment(this.unzonedRange.startMs, this.isAllDay),
                        end: e.msToMoment(this.unzonedRange.endMs, this.isAllDay)
                    }
                }, e
            }();
            t.default = n
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(3),
                a = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return i.__extends(t, e), t.prototype.on = function(e, t) {
                        return r(this).on(e, this._prepareIntercept(t)), this
                    }, t.prototype.one = function(e, t) {
                        return r(this).one(e, this._prepareIntercept(t)), this
                    }, t.prototype._prepareIntercept = function(e) {
                        var t = function(t, n) {
                            return e.apply(n.context || this, n.args || [])
                        };
                        return e.guid || (e.guid = r.guid++), t.guid = e.guid, t
                    }, t.prototype.off = function(e, t) {
                        return r(this).off(e, t), this
                    }, t.prototype.trigger = function(e) {
                        for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                        return r(this).triggerHandler(e, {
                            args: t
                        }), this
                    }, t.prototype.triggerWith = function(e, t, n) {
                        return r(this).triggerHandler(e, {
                            context: t,
                            args: n
                        }), this
                    }, t.prototype.hasHandlers = function(e) {
                        var t = r._data(this, "events");
                        return t && t[e] && t[e].length > 0
                    }, t
                }(n(15).default);
            t.default = a
        }, function(e, t) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = function() {
                function e(e) {
                    this.view = e._getView(), this.component = e
                }
                return e.prototype.opt = function(e) {
                    return this.view.opt(e)
                }, e.prototype.end = function() {}, e
            }();
            t.default = n
        }, function(e, t) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = function() {
                function e() {}
                return e.mixInto = function(e) {
                    var t = this;
                    Object.getOwnPropertyNames(this.prototype).forEach(function(n) {
                        e.prototype[n] || (e.prototype[n] = t.prototype[n])
                    })
                }, e.mixOver = function(e) {
                    var t = this;
                    Object.getOwnPropertyNames(this.prototype).forEach(function(n) {
                        e.prototype[n] = t.prototype[n]
                    })
                }, e
            }();
            t.default = n
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(5),
                r = function() {
                    function e(e, t, n) {
                        this.start = e, this.end = t || null, this.unzonedRange = this.buildUnzonedRange(n)
                    }
                    return e.parse = function(t, n) {
                        var i = t.start || t.date,
                            r = t.end;
                        if (!i) return !1;
                        var a = n.calendar,
                            o = a.moment(i),
                            l = r ? a.moment(r) : null,
                            s = t.allDay,
                            d = a.opt("forceEventDuration");
                        return !!o.isValid() && (null == s && null == (s = n.allDayDefault) && (s = a.opt("allDayDefault")), !0 === s ? (o.stripTime(), l && l.stripTime()) : !1 === s && (o.hasTime() || o.time(0), l && !l.hasTime() && l.time(0)), !l || l.isValid() && l.isAfter(o) || (l = null), !l && d && (l = a.getDefaultEventEnd(!o.hasTime(), o)), new e(o, l, a))
                    }, e.isStandardProp = function(e) {
                        return "start" === e || "date" === e || "end" === e || "allDay" === e
                    }, e.prototype.isAllDay = function() {
                        return !(this.start.hasTime() || this.end && this.end.hasTime())
                    }, e.prototype.buildUnzonedRange = function(e) {
                        var t = this.start.clone().stripZone().valueOf(),
                            n = this.getEnd(e).stripZone().valueOf();
                        return new i.default(t, n)
                    }, e.prototype.getEnd = function(e) {
                        return this.end ? this.end.clone() : e.getDefaultEventEnd(this.isAllDay(), this.start)
                    }, e
                }();
            t.default = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(4),
                a = function(e) {
                    function t(t, n) {
                        var i = e.call(this, n) || this;
                        return i.component = t, i
                    }
                    return i.__extends(t, e), t.prototype.handleInteractionStart = function(t) {
                        var n, i, a, o = this.subjectEl;
                        this.component.hitsNeeded(), this.computeScrollBounds(), t ? (a = i = {
                            left: r.getEvX(t),
                            top: r.getEvY(t)
                        }, o && (n = r.getOuterRect(o), a = r.constrainPoint(a, n)), this.origHit = this.queryHit(a.left, a.top), o && this.options.subjectCenter && (this.origHit && (n = r.intersectRects(this.origHit, n) || n), a = r.getRectCenter(n)), this.coordAdjust = r.diffPoints(a, i)) : (this.origHit = null, this.coordAdjust = null), e.prototype.handleInteractionStart.call(this, t)
                    }, t.prototype.handleDragStart = function(t) {
                        var n;
                        e.prototype.handleDragStart.call(this, t), (n = this.queryHit(r.getEvX(t), r.getEvY(t))) && this.handleHitOver(n)
                    }, t.prototype.handleDrag = function(t, n, i) {
                        var a;
                        e.prototype.handleDrag.call(this, t, n, i), o(a = this.queryHit(r.getEvX(i), r.getEvY(i)), this.hit) || (this.hit && this.handleHitOut(), a && this.handleHitOver(a))
                    }, t.prototype.handleDragEnd = function(t) {
                        this.handleHitDone(), e.prototype.handleDragEnd.call(this, t)
                    }, t.prototype.handleHitOver = function(e) {
                        var t = o(e, this.origHit);
                        this.hit = e, this.trigger("hitOver", this.hit, t, this.origHit)
                    }, t.prototype.handleHitOut = function() {
                        this.hit && (this.trigger("hitOut", this.hit), this.handleHitDone(), this.hit = null)
                    }, t.prototype.handleHitDone = function() {
                        this.hit && this.trigger("hitDone", this.hit)
                    }, t.prototype.handleInteractionEnd = function(t, n) {
                        e.prototype.handleInteractionEnd.call(this, t, n), this.origHit = null, this.hit = null, this.component.hitsNotNeeded()
                    }, t.prototype.handleScrollEnd = function() {
                        e.prototype.handleScrollEnd.call(this), this.isDragging && (this.component.releaseHits(), this.component.prepareHits())
                    }, t.prototype.queryHit = function(e, t) {
                        return this.coordAdjust && (e += this.coordAdjust.left, t += this.coordAdjust.top), this.component.queryHit(e, t)
                    }, t
                }(n(59).default);

            function o(e, t) {
                return !e && !t || !(!e || !t) && (e.component === t.component && l(e, t) && l(t, e))
            }

            function l(e, t) {
                for (var n in e)
                    if (!/^(component|left|right|top|bottom)$/.test(n) && e[n] !== t[n]) return !1;
                return !0
            }
            t.default = a
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.version = "3.10.0", t.internalApiVersion = 12;
            var i = n(4);
            t.applyAll = i.applyAll, t.debounce = i.debounce, t.isInt = i.isInt, t.htmlEscape = i.htmlEscape, t.cssToStr = i.cssToStr, t.proxy = i.proxy, t.capitaliseFirstLetter = i.capitaliseFirstLetter, t.getOuterRect = i.getOuterRect, t.getClientRect = i.getClientRect, t.getContentRect = i.getContentRect, t.getScrollbarWidths = i.getScrollbarWidths, t.preventDefault = i.preventDefault, t.parseFieldSpecs = i.parseFieldSpecs, t.compareByFieldSpecs = i.compareByFieldSpecs, t.compareByFieldSpec = i.compareByFieldSpec, t.flexibleCompare = i.flexibleCompare, t.computeGreatestUnit = i.computeGreatestUnit, t.divideRangeByDuration = i.divideRangeByDuration, t.divideDurationByDuration = i.divideDurationByDuration, t.multiplyDuration = i.multiplyDuration, t.durationHasTime = i.durationHasTime, t.log = i.log, t.warn = i.warn, t.removeExact = i.removeExact, t.intersectRects = i.intersectRects, t.allowSelection = i.allowSelection, t.attrsToStr = i.attrsToStr, t.compareNumbers = i.compareNumbers, t.compensateScroll = i.compensateScroll, t.computeDurationGreatestUnit = i.computeDurationGreatestUnit, t.constrainPoint = i.constrainPoint, t.copyOwnProps = i.copyOwnProps, t.diffByUnit = i.diffByUnit, t.diffDay = i.diffDay, t.diffDayTime = i.diffDayTime, t.diffPoints = i.diffPoints, t.disableCursor = i.disableCursor, t.distributeHeight = i.distributeHeight, t.enableCursor = i.enableCursor, t.firstDefined = i.firstDefined, t.getEvIsTouch = i.getEvIsTouch, t.getEvX = i.getEvX, t.getEvY = i.getEvY, t.getRectCenter = i.getRectCenter, t.getScrollParent = i.getScrollParent, t.hasOwnProp = i.hasOwnProp, t.isArraysEqual = i.isArraysEqual, t.isNativeDate = i.isNativeDate, t.isPrimaryMouseButton = i.isPrimaryMouseButton, t.isTimeString = i.isTimeString, t.matchCellWidths = i.matchCellWidths, t.mergeProps = i.mergeProps, t.preventSelection = i.preventSelection, t.removeMatching = i.removeMatching, t.stripHtmlEntities = i.stripHtmlEntities, t.subtractInnerElHeight = i.subtractInnerElHeight, t.uncompensateScroll = i.uncompensateScroll, t.undistributeHeight = i.undistributeHeight, t.dayIDs = i.dayIDs, t.unitsDesc = i.unitsDesc;
            var r = n(49);
            t.formatDate = r.formatDate, t.formatRange = r.formatRange, t.queryMostGranularFormatUnit = r.queryMostGranularFormatUnit;
            var a = n(32);
            t.datepickerLocale = a.datepickerLocale, t.locale = a.locale, t.getMomentLocaleData = a.getMomentLocaleData, t.populateInstanceComputableOptions = a.populateInstanceComputableOptions;
            var o = n(19);
            t.eventDefsToEventInstances = o.eventDefsToEventInstances, t.eventFootprintToComponentFootprint = o.eventFootprintToComponentFootprint, t.eventInstanceToEventRange = o.eventInstanceToEventRange, t.eventInstanceToUnzonedRange = o.eventInstanceToUnzonedRange, t.eventRangeToEventFootprint = o.eventRangeToEventFootprint;
            var l = n(11);
            t.moment = l.default;
            var s = n(13);
            t.EmitterMixin = s.default;
            var d = n(7);
            t.ListenerMixin = d.default;
            var u = n(51);
            t.Model = u.default;
            var c = n(217);
            t.Constraints = c.default;
            var h = n(55);
            t.DateProfileGenerator = h.default;
            var p = n(5);
            t.UnzonedRange = p.default;
            var f = n(12);
            t.ComponentFootprint = f.default;
            var m = n(218);
            t.BusinessHourGenerator = m.default;
            var g = n(219);
            t.EventPeriod = g.default;
            var _ = n(220);
            t.EventManager = _.default;
            var y = n(37);
            t.EventDef = y.default;
            var v = n(39);
            t.EventDefMutation = v.default;
            var M = n(36);
            t.EventDefParser = M.default;
            var b = n(53);
            t.EventInstance = b.default;
            var w = n(50);
            t.EventRange = w.default;
            var L = n(54);
            t.RecurringEventDef = L.default;
            var D = n(9);
            t.SingleEventDef = D.default;
            var T = n(40);
            t.EventDefDateMutation = T.default;
            var k = n(16);
            t.EventDateProfile = k.default;
            var S = n(38);
            t.EventSourceParser = S.default;
            var x = n(6);
            t.EventSource = x.default;
            var Y = n(57);
            t.defineThemeSystem = Y.defineThemeSystem, t.getThemeSystemClass = Y.getThemeSystemClass;
            var E = n(20);
            t.EventInstanceGroup = E.default;
            var C = n(56);
            t.ArrayEventSource = C.default;
            var H = n(223);
            t.FuncEventSource = H.default;
            var P = n(224);
            t.JsonFeedEventSource = P.default;
            var O = n(34);
            t.EventFootprint = O.default;
            var A = n(35);
            t.Class = A.default;
            var I = n(15);
            t.Mixin = I.default;
            var R = n(58);
            t.CoordCache = R.default;
            var j = n(225);
            t.Iterator = j.default;
            var F = n(59);
            t.DragListener = F.default;
            var N = n(17);
            t.HitDragListener = N.default;
            var W = n(226);
            t.MouseFollower = W.default;
            var z = n(52);
            t.ParsableModelMixin = z.default;
            var B = n(227);
            t.Popover = B.default;
            var V = n(21);
            t.Promise = V.default;
            var G = n(228);
            t.TaskQueue = G.default;
            var U = n(229);
            t.RenderQueue = U.default;
            var Z = n(41);
            t.Scroller = Z.default;
            var q = n(22);
            t.Theme = q.default;
            var X = n(230);
            t.Component = X.default;
            var J = n(231);
            t.DateComponent = J.default;
            var $ = n(42);
            t.InteractiveDateComponent = $.default;
            var K = n(232);
            t.Calendar = K.default;
            var Q = n(43);
            t.View = Q.default;
            var ee = n(24);
            t.defineView = ee.defineView, t.getViewConfig = ee.getViewConfig;
            var te = n(60);
            t.DayTableMixin = te.default;
            var ne = n(61);
            t.BusinessHourRenderer = ne.default;
            var ie = n(44);
            t.EventRenderer = ie.default;
            var re = n(62);
            t.FillRenderer = re.default;
            var ae = n(63);
            t.HelperRenderer = ae.default;
            var oe = n(233);
            t.ExternalDropping = oe.default;
            var le = n(234);
            t.EventResizing = le.default;
            var se = n(64);
            t.EventPointing = se.default;
            var de = n(235);
            t.EventDragging = de.default;
            var ue = n(236);
            t.DateSelecting = ue.default;
            var ce = n(237);
            t.DateClicking = ce.default;
            var he = n(14);
            t.Interaction = he.default;
            var pe = n(65);
            t.StandardInteractionsMixin = pe.default;
            var fe = n(238);
            t.AgendaView = fe.default;
            var me = n(239);
            t.TimeGrid = me.default;
            var ge = n(240);
            t.TimeGridEventRenderer = ge.default;
            var _e = n(242);
            t.TimeGridFillRenderer = _e.default;
            var ye = n(241);
            t.TimeGridHelperRenderer = ye.default;
            var ve = n(66);
            t.DayGrid = ve.default;
            var Me = n(243);
            t.DayGridEventRenderer = Me.default;
            var be = n(245);
            t.DayGridFillRenderer = be.default;
            var we = n(244);
            t.DayGridHelperRenderer = we.default;
            var Le = n(67);
            t.BasicView = Le.default;
            var De = n(68);
            t.BasicViewDateProfileGenerator = De.default;
            var Te = n(246);
            t.MonthView = Te.default;
            var ke = n(247);
            t.MonthViewDateProfileGenerator = ke.default;
            var Se = n(248);
            t.ListView = Se.default;
            var xe = n(250);
            t.ListEventPointing = xe.default;
            var Ye = n(249);
            t.ListEventRenderer = Ye.default
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(50),
                r = n(34),
                a = n(12);
            t.eventDefsToEventInstances = function(e, t) {
                var n, i = [];
                for (n = 0; n < e.length; n++) i.push.apply(i, e[n].buildInstances(t));
                return i
            }, t.eventInstanceToEventRange = function(e) {
                return new i.default(e.dateProfile.unzonedRange, e.def, e)
            }, t.eventRangeToEventFootprint = function(e) {
                return new r.default(new a.default(e.unzonedRange, e.eventDef.isAllDay()), e.eventDef, e.eventInstance)
            }, t.eventInstanceToUnzonedRange = function(e) {
                return e.dateProfile.unzonedRange
            }, t.eventFootprintToComponentFootprint = function(e) {
                return e.componentFootprint
            }
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(5),
                r = n(19),
                a = n(50),
                o = function() {
                    function e(e) {
                        this.eventInstances = e || []
                    }
                    return e.prototype.getAllEventRanges = function(e) {
                        return e ? this.sliceNormalRenderRanges(e) : this.eventInstances.map(r.eventInstanceToEventRange)
                    }, e.prototype.sliceRenderRanges = function(e) {
                        return this.isInverse() ? this.sliceInverseRenderRanges(e) : this.sliceNormalRenderRanges(e)
                    }, e.prototype.sliceNormalRenderRanges = function(e) {
                        var t, n, i, r = this.eventInstances,
                            o = [];
                        for (t = 0; t < r.length; t++)(i = (n = r[t]).dateProfile.unzonedRange.intersect(e)) && o.push(new a.default(i, n.def, n));
                        return o
                    }, e.prototype.sliceInverseRenderRanges = function(e) {
                        var t = this.eventInstances.map(r.eventInstanceToUnzonedRange),
                            n = this.getEventDef();
                        return (t = i.default.invertRanges(t, e)).map(function(e) {
                            return new a.default(e, n)
                        })
                    }, e.prototype.isInverse = function() {
                        return this.getEventDef().hasInverseRendering()
                    }, e.prototype.getEventDef = function() {
                        return this.explicitEventDef || this.eventInstances[0].def
                    }, e
                }();
            t.default = o
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(3),
                r = {
                    construct: function(e) {
                        var t = i.Deferred(),
                            n = t.promise();
                        return "function" == typeof e && e(function(e) {
                            t.resolve(e), a(n, e)
                        }, function() {
                            t.reject(), o(n)
                        }), n
                    },
                    resolve: function(e) {
                        var t = i.Deferred().resolve(e).promise();
                        return a(t, e), t
                    },
                    reject: function() {
                        var e = i.Deferred().reject().promise();
                        return o(e), e
                    }
                };

            function a(e, t) {
                e.then = function(n) {
                    return "function" == typeof n ? r.resolve(n(t)) : e
                }
            }

            function o(e) {
                e.then = function(t, n) {
                    return "function" == typeof n && n(), e
                }
            }
            t.default = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(3),
                r = function() {
                    function e(e) {
                        this.optionsManager = e, this.processIconOverride()
                    }
                    return e.prototype.processIconOverride = function() {
                        this.iconOverrideOption && this.setIconOverride(this.optionsManager.get(this.iconOverrideOption))
                    }, e.prototype.setIconOverride = function(e) {
                        var t, n;
                        if (i.isPlainObject(e)) {
                            for (n in t = i.extend({}, this.iconClasses), e) t[n] = this.applyIconOverridePrefix(e[n]);
                            this.iconClasses = t
                        } else !1 === e && (this.iconClasses = {})
                    }, e.prototype.applyIconOverridePrefix = function(e) {
                        var t = this.iconOverridePrefix;
                        return t && 0 !== e.indexOf(t) && (e = t + e), e
                    }, e.prototype.getClass = function(e) {
                        return this.classes[e] || ""
                    }, e.prototype.getIconClass = function(e) {
                        var t = this.iconClasses[e];
                        return t ? this.baseIconClass + " " + t : ""
                    }, e.prototype.getCustomButtonIconClass = function(e) {
                        var t;
                        return this.iconOverrideCustomButtonOption && (t = e[this.iconOverrideCustomButtonOption]) ? this.baseIconClass + " " + this.applyIconOverridePrefix(t) : ""
                    }, e
                }();
            t.default = r, r.prototype.classes = {}, r.prototype.iconClasses = {}, r.prototype.baseIconClass = "", r.prototype.iconOverridePrefix = ""
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(3),
                r = n(18),
                a = n(13),
                o = n(7);
            r.touchMouseIgnoreWait = 500;
            var l = null,
                s = 0,
                d = function() {
                    function e() {
                        this.isTouching = !1, this.mouseIgnoreDepth = 0
                    }
                    return e.get = function() {
                        return l || (l = new e).bind(), l
                    }, e.needed = function() {
                        e.get(), s++
                    }, e.unneeded = function() {
                        --s || (l.unbind(), l = null)
                    }, e.prototype.bind = function() {
                        var e = this;
                        this.listenTo(i(document), {
                            touchstart: this.handleTouchStart,
                            touchcancel: this.handleTouchCancel,
                            touchend: this.handleTouchEnd,
                            mousedown: this.handleMouseDown,
                            mousemove: this.handleMouseMove,
                            mouseup: this.handleMouseUp,
                            click: this.handleClick,
                            selectstart: this.handleSelectStart,
                            contextmenu: this.handleContextMenu
                        }), window.addEventListener("touchmove", this.handleTouchMoveProxy = function(t) {
                            e.handleTouchMove(i.Event(t))
                        }, {
                            passive: !1
                        }), window.addEventListener("scroll", this.handleScrollProxy = function(t) {
                            e.handleScroll(i.Event(t))
                        }, !0)
                    }, e.prototype.unbind = function() {
                        this.stopListeningTo(i(document)), window.removeEventListener("touchmove", this.handleTouchMoveProxy, {
                            passive: !1
                        }), window.removeEventListener("scroll", this.handleScrollProxy, !0)
                    }, e.prototype.handleTouchStart = function(e) {
                        this.stopTouch(e, !0), this.isTouching = !0, this.trigger("touchstart", e)
                    }, e.prototype.handleTouchMove = function(e) {
                        this.isTouching && this.trigger("touchmove", e)
                    }, e.prototype.handleTouchCancel = function(e) {
                        this.isTouching && (this.trigger("touchcancel", e), this.stopTouch(e))
                    }, e.prototype.handleTouchEnd = function(e) {
                        this.stopTouch(e)
                    }, e.prototype.handleMouseDown = function(e) {
                        this.shouldIgnoreMouse() || this.trigger("mousedown", e)
                    }, e.prototype.handleMouseMove = function(e) {
                        this.shouldIgnoreMouse() || this.trigger("mousemove", e)
                    }, e.prototype.handleMouseUp = function(e) {
                        this.shouldIgnoreMouse() || this.trigger("mouseup", e)
                    }, e.prototype.handleClick = function(e) {
                        this.shouldIgnoreMouse() || this.trigger("click", e)
                    }, e.prototype.handleSelectStart = function(e) {
                        this.trigger("selectstart", e)
                    }, e.prototype.handleContextMenu = function(e) {
                        this.trigger("contextmenu", e)
                    }, e.prototype.handleScroll = function(e) {
                        this.trigger("scroll", e)
                    }, e.prototype.stopTouch = function(e, t) {
                        void 0 === t && (t = !1), this.isTouching && (this.isTouching = !1, this.trigger("touchend", e), t || this.startTouchMouseIgnore())
                    }, e.prototype.startTouchMouseIgnore = function() {
                        var e = this,
                            t = r.touchMouseIgnoreWait;
                        t && (this.mouseIgnoreDepth++, setTimeout(function() {
                            e.mouseIgnoreDepth--
                        }, t))
                    }, e.prototype.shouldIgnoreMouse = function() {
                        return this.isTouching || Boolean(this.mouseIgnoreDepth)
                    }, e
                }();
            t.default = d, o.default.mixInto(d), a.default.mixInto(d)
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(18);
            t.viewHash = {}, i.views = t.viewHash, t.defineView = function(e, n) {
                t.viewHash[e] = n
            }, t.getViewConfig = function(e) {
                return t.viewHash[e]
            }
        }, , , , , , , , function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(3),
                r = n(0),
                a = n(18),
                o = n(33),
                l = n(4);
            t.localeOptionHash = {}, a.locales = t.localeOptionHash;
            var s = {
                    buttonText: function(e) {
                        return {
                            prev: l.stripHtmlEntities(e.prevText),
                            next: l.stripHtmlEntities(e.nextText),
                            today: l.stripHtmlEntities(e.currentText)
                        }
                    },
                    monthYearFormat: function(e) {
                        return e.showMonthAfterYear ? "YYYY[" + e.yearSuffix + "] MMMM" : "MMMM YYYY[" + e.yearSuffix + "]"
                    }
                },
                d = {
                    dayOfMonthFormat: function(e, t) {
                        var n = e.longDateFormat("l");
                        return n = n.replace(/^Y+[^\w\s]*|[^\w\s]*Y+$/g, ""), t.isRTL ? n += " ddd" : n = "ddd " + n, n
                    },
                    mediumTimeFormat: function(e) {
                        return e.longDateFormat("LT").replace(/\s*a$/i, "a")
                    },
                    smallTimeFormat: function(e) {
                        return e.longDateFormat("LT").replace(":mm", "(:mm)").replace(/(\Wmm)$/, "($1)").replace(/\s*a$/i, "a")
                    },
                    extraSmallTimeFormat: function(e) {
                        return e.longDateFormat("LT").replace(":mm", "(:mm)").replace(/(\Wmm)$/, "($1)").replace(/\s*a$/i, "t")
                    },
                    hourFormat: function(e) {
                        return e.longDateFormat("LT").replace(":mm", "").replace(/(\Wmm)$/, "").replace(/\s*a$/i, "a")
                    },
                    noMeridiemTimeFormat: function(e) {
                        return e.longDateFormat("LT").replace(/\s*a$/i, "")
                    }
                },
                u = {
                    smallDayDateFormat: function(e) {
                        return e.isRTL ? "D dd" : "dd D"
                    },
                    weekFormat: function(e) {
                        return e.isRTL ? "w[ " + e.weekNumberTitle + "]" : "[" + e.weekNumberTitle + " ]w"
                    },
                    smallWeekFormat: function(e) {
                        return e.isRTL ? "w[" + e.weekNumberTitle + "]" : "[" + e.weekNumberTitle + "]w"
                    }
                };

            function c(e, n) {
                var r, a;
                r = t.localeOptionHash[e] || (t.localeOptionHash[e] = {}), n && (r = t.localeOptionHash[e] = o.mergeOptions([r, n])), a = h(e), i.each(d, function(e, t) {
                    null == r[e] && (r[e] = t(a, r))
                }), o.globalDefaults.locale = e
            }

            function h(e) {
                return r.localeData(e) || r.localeData("en")
            }
            t.populateInstanceComputableOptions = function(e) {
                i.each(u, function(t, n) {
                    null == e[t] && (e[t] = n(e))
                })
            }, t.datepickerLocale = function(e, n, r) {
                var a = t.localeOptionHash[e] || (t.localeOptionHash[e] = {});
                a.isRTL = r.isRTL, a.weekNumberTitle = r.weekHeader, i.each(s, function(e, t) {
                    a[e] = t(r)
                });
                var o = i.datepicker;
                o && (o.regional[n] = o.regional[e] = r, o.regional.en = o.regional[""], o.setDefaults(r))
            }, t.locale = c, t.getMomentLocaleData = h, c("en", o.englishDefaults)
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(4);
            t.globalDefaults = {
                titleRangeSeparator: " – ",
                monthYearFormat: "MMMM YYYY",
                defaultTimedEventDuration: "02:00:00",
                defaultAllDayEventDuration: {
                    days: 1
                },
                forceEventDuration: !1,
                nextDayThreshold: "09:00:00",
                columnHeader: !0,
                defaultView: "month",
                aspectRatio: 1.35,
                header: {
                    left: "title",
                    center: "",
                    right: "today prev,next"
                },
                weekends: !0,
                weekNumbers: !1,
                weekNumberTitle: "W",
                weekNumberCalculation: "local",
                scrollTime: "06:00:00",
                minTime: "00:00:00",
                maxTime: "24:00:00",
                showNonCurrentDates: !0,
                lazyFetching: !0,
                startParam: "start",
                endParam: "end",
                timezoneParam: "timezone",
                timezone: !1,
                locale: null,
                isRTL: !1,
                buttonText: {
                    prev: "prev",
                    next: "next",
                    prevYear: "prev year",
                    nextYear: "next year",
                    year: "year",
                    today: "today",
                    month: "month",
                    week: "week",
                    day: "day"
                },
                allDayText: "all-day",
                agendaEventMinHeight: 0,
                theme: !1,
                dragOpacity: .75,
                dragRevertDuration: 500,
                dragScroll: !0,
                unselectAuto: !0,
                dropAccept: "*",
                eventOrder: "title",
                eventLimit: !1,
                eventLimitText: "more",
                eventLimitClick: "popover",
                dayPopoverFormat: "LL",
                handleWindowResize: !0,
                windowResizeDelay: 100,
                longPressDelay: 1e3
            }, t.englishDefaults = {
                dayPopoverFormat: "dddd, MMMM D"
            }, t.rtlDefaults = {
                header: {
                    left: "next,prev today",
                    center: "",
                    right: "title"
                },
                buttonIcons: {
                    prev: "right-single-arrow",
                    next: "left-single-arrow",
                    prevYear: "right-double-arrow",
                    nextYear: "left-double-arrow"
                },
                themeButtonIcons: {
                    prev: "circle-triangle-e",
                    next: "circle-triangle-w",
                    nextYear: "seek-prev",
                    prevYear: "seek-next"
                }
            };
            var r = ["header", "footer", "buttonText", "buttonIcons", "themeButtonIcons"];
            t.mergeOptions = function(e) {
                return i.mergeProps(e, r)
            }
        }, function(e, t) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = function() {
                function e(e, t, n) {
                    this.componentFootprint = e, this.eventDef = t, n && (this.eventInstance = n)
                }
                return e.prototype.getEventLegacy = function() {
                    return (this.eventInstance || this.eventDef).toLegacy()
                }, e
            }();
            t.default = n
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(4),
                a = function() {
                    function e() {}
                    return e.extend = function(e) {
                        var t = function(e) {
                            function t() {
                                return null !== e && e.apply(this, arguments) || this
                            }
                            return i.__extends(t, e), t
                        }(this);
                        return r.copyOwnProps(e, t.prototype), t
                    }, e.mixin = function(e) {
                        r.copyOwnProps(e, this.prototype)
                    }, e
                }();
            t.default = a
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(0),
                r = n(4),
                a = n(9),
                o = n(54);
            t.default = {
                parse: function(e, t) {
                    return r.isTimeString(e.start) || i.isDuration(e.start) || r.isTimeString(e.end) || i.isDuration(e.end) ? o.default.parse(e, t) : a.default.parse(e, t)
                }
            }
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(3),
                r = n(52),
                a = function() {
                    function e(e) {
                        this.source = e, this.className = [], this.miscProps = {}
                    }
                    return e.parse = function(e, t) {
                        var n = new this(t);
                        return !!n.applyProps(e) && n
                    }, e.normalizeId = function(e) {
                        return String(e)
                    }, e.generateId = function() {
                        return "_fc" + e.uuid++
                    }, e.prototype.clone = function() {
                        var t = new this.constructor(this.source);
                        return t.id = this.id, t.rawId = this.rawId, t.uid = this.uid, e.copyVerbatimStandardProps(this, t), t.className = this.className.slice(), t.miscProps = i.extend({}, this.miscProps), t
                    }, e.prototype.hasInverseRendering = function() {
                        return "inverse-background" === this.getRendering()
                    }, e.prototype.hasBgRendering = function() {
                        var e = this.getRendering();
                        return "inverse-background" === e || "background" === e
                    }, e.prototype.getRendering = function() {
                        return null != this.rendering ? this.rendering : this.source.rendering
                    }, e.prototype.getConstraint = function() {
                        return null != this.constraint ? this.constraint : null != this.source.constraint ? this.source.constraint : this.source.calendar.opt("eventConstraint")
                    }, e.prototype.getOverlap = function() {
                        return null != this.overlap ? this.overlap : null != this.source.overlap ? this.source.overlap : this.source.calendar.opt("eventOverlap")
                    }, e.prototype.isStartExplicitlyEditable = function() {
                        return null != this.startEditable ? this.startEditable : this.source.startEditable
                    }, e.prototype.isDurationExplicitlyEditable = function() {
                        return null != this.durationEditable ? this.durationEditable : this.source.durationEditable
                    }, e.prototype.isExplicitlyEditable = function() {
                        return null != this.editable ? this.editable : this.source.editable
                    }, e.prototype.toLegacy = function() {
                        var t = i.extend({}, this.miscProps);
                        return t._id = this.uid, t.source = this.source, t.className = this.className.slice(), t.allDay = this.isAllDay(), null != this.rawId && (t.id = this.rawId), e.copyVerbatimStandardProps(this, t), t
                    }, e.prototype.applyManualStandardProps = function(t) {
                        return null != t.id ? this.id = e.normalizeId(this.rawId = t.id) : this.id = e.generateId(), null != t._id ? this.uid = String(t._id) : this.uid = e.generateId(), i.isArray(t.className) && (this.className = t.className), "string" == typeof t.className && (this.className = t.className.split(/\s+/)), !0
                    }, e.prototype.applyMiscProps = function(e) {
                        i.extend(this.miscProps, e)
                    }, e.uuid = 0, e.defineStandardProps = r.default.defineStandardProps, e.copyVerbatimStandardProps = r.default.copyVerbatimStandardProps, e
                }();
            t.default = a, r.default.mixInto(a), a.defineStandardProps({
                _id: !1,
                id: !1,
                className: !1,
                source: !1,
                title: !0,
                url: !0,
                rendering: !0,
                constraint: !0,
                overlap: !0,
                editable: !0,
                startEditable: !0,
                durationEditable: !0,
                color: !0,
                backgroundColor: !0,
                borderColor: !0,
                textColor: !0
            })
        }, function(e, t) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = {
                sourceClasses: [],
                registerClass: function(e) {
                    this.sourceClasses.unshift(e)
                },
                parse: function(e, t) {
                    var n, i, r = this.sourceClasses;
                    for (n = 0; n < r.length; n++)
                        if (i = r[n].parse(e, t)) return i
                }
            }
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(4),
                r = n(16),
                a = n(37),
                o = n(40),
                l = n(9),
                s = function() {
                    function e() {}
                    return e.createFromRawProps = function(t, n, l) {
                        var s, d, u, c, h = t.def,
                            p = {},
                            f = {},
                            m = {},
                            g = {},
                            _ = null,
                            y = null;
                        for (s in n) r.default.isStandardProp(s) ? p[s] = n[s] : h.isStandardProp(s) ? f[s] = n[s] : h.miscProps[s] !== n[s] && (m[s] = n[s]);
                        return (d = r.default.parse(p, h.source)) && (u = o.default.createFromDiff(t.dateProfile, d, l)), f.id !== h.id && (_ = f.id), i.isArraysEqual(f.className, h.className) || (y = f.className), a.default.copyVerbatimStandardProps(f, g), (c = new e).eventDefId = _, c.className = y, c.verbatimStandardProps = g, c.miscProps = m, u && (c.dateMutation = u), c
                    }, e.prototype.mutateSingle = function(e) {
                        var t;
                        return this.dateMutation && (t = e.dateProfile, e.dateProfile = this.dateMutation.buildNewDateProfile(t, e.source.calendar)), null != this.eventDefId && (e.id = a.default.normalizeId(e.rawId = this.eventDefId)), this.className && (e.className = this.className), this.verbatimStandardProps && l.default.copyVerbatimStandardProps(this.verbatimStandardProps, e), this.miscProps && e.applyMiscProps(this.miscProps), t ? function() {
                            e.dateProfile = t
                        } : function() {}
                    }, e.prototype.setDateMutation = function(e) {
                        e && !e.isEmpty() ? this.dateMutation = e : this.dateMutation = null
                    }, e.prototype.isEmpty = function() {
                        return !this.dateMutation
                    }, e
                }();
            t.default = s
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(4),
                r = n(16),
                a = function() {
                    function e() {
                        this.clearEnd = !1, this.forceTimed = !1, this.forceAllDay = !1
                    }
                    return e.createFromDiff = function(t, n, r) {
                        var a, o, l, s = t.end && !n.end,
                            d = t.isAllDay() && !n.isAllDay(),
                            u = !t.isAllDay() && n.isAllDay();

                        function c(e, t) {
                            return r ? i.diffByUnit(e, t, r) : n.isAllDay() ? i.diffDay(e, t) : i.diffDayTime(e, t)
                        }
                        return a = c(n.start, t.start), n.end && (o = c(n.unzonedRange.getEnd(), t.unzonedRange.getEnd()).subtract(a)), (l = new e).clearEnd = s, l.forceTimed = d, l.forceAllDay = u, l.setDateDelta(a), l.setEndDelta(o), l
                    }, e.prototype.buildNewDateProfile = function(e, t) {
                        var n = e.start.clone(),
                            i = null,
                            a = !1;
                        return e.end && !this.clearEnd ? i = e.end.clone() : this.endDelta && !i && (i = t.getDefaultEventEnd(e.isAllDay(), n)), this.forceTimed ? (a = !0, n.hasTime() || n.time(0), i && !i.hasTime() && i.time(0)) : this.forceAllDay && (n.hasTime() && n.stripTime(), i && i.hasTime() && i.stripTime()), this.dateDelta && (a = !0, n.add(this.dateDelta), i && i.add(this.dateDelta)), this.endDelta && (a = !0, i.add(this.endDelta)), this.startDelta && (a = !0, n.add(this.startDelta)), a && (n = t.applyTimezone(n), i && (i = t.applyTimezone(i))), !i && t.opt("forceEventDuration") && (i = t.getDefaultEventEnd(e.isAllDay(), n)), new r.default(n, i, t)
                    }, e.prototype.setDateDelta = function(e) {
                        e && e.valueOf() ? this.dateDelta = e : this.dateDelta = null
                    }, e.prototype.setStartDelta = function(e) {
                        e && e.valueOf() ? this.startDelta = e : this.startDelta = null
                    }, e.prototype.setEndDelta = function(e) {
                        e && e.valueOf() ? this.endDelta = e : this.endDelta = null
                    }, e.prototype.isEmpty = function() {
                        return !(this.clearEnd || this.forceTimed || this.forceAllDay || this.dateDelta || this.startDelta || this.endDelta)
                    }, e
                }();
            t.default = a
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(3),
                a = n(4),
                o = function(e) {
                    function t(t) {
                        var n = e.call(this) || this;
                        return t = t || {}, n.overflowX = t.overflowX || t.overflow || "auto", n.overflowY = t.overflowY || t.overflow || "auto", n
                    }
                    return i.__extends(t, e), t.prototype.render = function() {
                        this.el = this.renderEl(), this.applyOverflow()
                    }, t.prototype.renderEl = function() {
                        return this.scrollEl = r('<div class="fc-scroller"></div>')
                    }, t.prototype.clear = function() {
                        this.setHeight("auto"), this.applyOverflow()
                    }, t.prototype.destroy = function() {
                        this.el.remove()
                    }, t.prototype.applyOverflow = function() {
                        this.scrollEl.css({
                            "overflow-x": this.overflowX,
                            "overflow-y": this.overflowY
                        })
                    }, t.prototype.lockOverflow = function(e) {
                        var t = this.overflowX,
                            n = this.overflowY;
                        e = e || this.getScrollbarWidths(), "auto" === t && (t = e.top || e.bottom || this.scrollEl[0].scrollWidth - 1 > this.scrollEl[0].clientWidth ? "scroll" : "hidden"), "auto" === n && (n = e.left || e.right || this.scrollEl[0].scrollHeight - 1 > this.scrollEl[0].clientHeight ? "scroll" : "hidden"), this.scrollEl.css({
                            "overflow-x": t,
                            "overflow-y": n
                        })
                    }, t.prototype.setHeight = function(e) {
                        this.scrollEl.height(e)
                    }, t.prototype.getScrollTop = function() {
                        return this.scrollEl.scrollTop()
                    }, t.prototype.setScrollTop = function(e) {
                        this.scrollEl.scrollTop(e)
                    }, t.prototype.getClientWidth = function() {
                        return this.scrollEl[0].clientWidth
                    }, t.prototype.getClientHeight = function() {
                        return this.scrollEl[0].clientHeight
                    }, t.prototype.getScrollbarWidths = function() {
                        return a.getScrollbarWidths(this.scrollEl)
                    }, t
                }(n(35).default);
            t.default = o
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(3),
                a = n(4),
                o = n(231),
                l = n(23),
                s = function(e) {
                    function t(t, n) {
                        var i = e.call(this, t, n) || this;
                        return i.segSelector = ".fc-event-container > *", i.dateSelectingClass && (i.dateClicking = new i.dateClickingClass(i)), i.dateSelectingClass && (i.dateSelecting = new i.dateSelectingClass(i)), i.eventPointingClass && (i.eventPointing = new i.eventPointingClass(i)), i.eventDraggingClass && i.eventPointing && (i.eventDragging = new i.eventDraggingClass(i, i.eventPointing)), i.eventResizingClass && i.eventPointing && (i.eventResizing = new i.eventResizingClass(i, i.eventPointing)), i.externalDroppingClass && (i.externalDropping = new i.externalDroppingClass(i)), i
                    }
                    return i.__extends(t, e), t.prototype.setElement = function(t) {
                        e.prototype.setElement.call(this, t), this.dateClicking && this.dateClicking.bindToEl(t), this.dateSelecting && this.dateSelecting.bindToEl(t), this.bindAllSegHandlersToEl(t)
                    }, t.prototype.removeElement = function() {
                        this.endInteractions(), e.prototype.removeElement.call(this)
                    }, t.prototype.executeEventUnrender = function() {
                        this.endInteractions(), e.prototype.executeEventUnrender.call(this)
                    }, t.prototype.bindGlobalHandlers = function() {
                        e.prototype.bindGlobalHandlers.call(this), this.externalDropping && this.externalDropping.bindToDocument()
                    }, t.prototype.unbindGlobalHandlers = function() {
                        e.prototype.unbindGlobalHandlers.call(this), this.externalDropping && this.externalDropping.unbindFromDocument()
                    }, t.prototype.bindDateHandlerToEl = function(e, t, n) {
                        var i = this;
                        this.el.on(t, function(e) {
                            if (!r(e.target).is(i.segSelector + ":not(.fc-helper)," + i.segSelector + ":not(.fc-helper) *,.fc-more,a[data-goto]")) return n.call(i, e)
                        })
                    }, t.prototype.bindAllSegHandlersToEl = function(e) {
                        [this.eventPointing, this.eventDragging, this.eventResizing].forEach(function(t) {
                            t && t.bindToEl(e)
                        })
                    }, t.prototype.bindSegHandlerToEl = function(e, t, n) {
                        var i = this;
                        e.on(t, this.segSelector, function(e) {
                            var t = r(e.currentTarget);
                            if (!t.is(".fc-helper")) {
                                var a = t.data("fc-seg");
                                if (a && !i.shouldIgnoreEventPointing()) return n.call(i, a, e)
                            }
                        })
                    }, t.prototype.shouldIgnoreMouse = function() {
                        return l.default.get().shouldIgnoreMouse()
                    }, t.prototype.shouldIgnoreTouch = function() {
                        var e = this._getView();
                        return e.isSelected || e.selectedEvent
                    }, t.prototype.shouldIgnoreEventPointing = function() {
                        return this.eventDragging && this.eventDragging.isDragging || this.eventResizing && this.eventResizing.isResizing
                    }, t.prototype.canStartSelection = function(e, t) {
                        return a.getEvIsTouch(t) && !this.canStartResize(e, t) && (this.isEventDefDraggable(e.footprint.eventDef) || this.isEventDefResizable(e.footprint.eventDef))
                    }, t.prototype.canStartDrag = function(e, t) {
                        return !this.canStartResize(e, t) && this.isEventDefDraggable(e.footprint.eventDef)
                    }, t.prototype.canStartResize = function(e, t) {
                        var n = this._getView(),
                            i = e.footprint.eventDef;
                        return (!a.getEvIsTouch(t) || n.isEventDefSelected(i)) && this.isEventDefResizable(i) && r(t.target).is(".fc-resizer")
                    }, t.prototype.endInteractions = function() {
                        [this.dateClicking, this.dateSelecting, this.eventPointing, this.eventDragging, this.eventResizing].forEach(function(e) {
                            e && e.end()
                        })
                    }, t.prototype.isEventDefDraggable = function(e) {
                        return this.isEventDefStartEditable(e)
                    }, t.prototype.isEventDefStartEditable = function(e) {
                        var t = e.isStartExplicitlyEditable();
                        return null == t && null == (t = this.opt("eventStartEditable")) && (t = this.isEventDefGenerallyEditable(e)), t
                    }, t.prototype.isEventDefGenerallyEditable = function(e) {
                        var t = e.isExplicitlyEditable();
                        return null == t && (t = this.opt("editable")), t
                    }, t.prototype.isEventDefResizableFromStart = function(e) {
                        return this.opt("eventResizableFromStart") && this.isEventDefResizable(e)
                    }, t.prototype.isEventDefResizableFromEnd = function(e) {
                        return this.isEventDefResizable(e)
                    }, t.prototype.isEventDefResizable = function(e) {
                        var t = e.isDurationExplicitlyEditable();
                        return null == t && null == (t = this.opt("eventDurationEditable")) && (t = this.isEventDefGenerallyEditable(e)), t
                    }, t.prototype.diffDates = function(e, t) {
                        return this.largeUnit ? a.diffByUnit(e, t, this.largeUnit) : a.diffDayTime(e, t)
                    }, t.prototype.isEventInstanceGroupAllowed = function(e) {
                        var t, n = this._getView(),
                            i = this.dateProfile,
                            r = this.eventRangesToEventFootprints(e.getAllEventRanges());
                        for (t = 0; t < r.length; t++)
                            if (!i.validUnzonedRange.containsRange(r[t].componentFootprint.unzonedRange)) return !1;
                        return n.calendar.constraints.isEventInstanceGroupAllowed(e)
                    }, t.prototype.isExternalInstanceGroupAllowed = function(e) {
                        var t, n = this._getView(),
                            i = this.dateProfile,
                            r = this.eventRangesToEventFootprints(e.getAllEventRanges());
                        for (t = 0; t < r.length; t++)
                            if (!i.validUnzonedRange.containsRange(r[t].componentFootprint.unzonedRange)) return !1;
                        for (t = 0; t < r.length; t++)
                            if (!n.calendar.constraints.isSelectionFootprintAllowed(r[t].componentFootprint)) return !1;
                        return !0
                    }, t
                }(o.default);
            t.default = s
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(3),
                a = n(0),
                o = n(4),
                l = n(229),
                s = n(55),
                d = n(42),
                u = n(23),
                c = n(5),
                h = function(e) {
                    function t(t, n) {
                        var i = e.call(this, null, n.options) || this;
                        return i.batchRenderDepth = 0, i.isSelected = !1, i.calendar = t, i.viewSpec = n, i.type = n.type, i.name = i.type, i.initRenderQueue(), i.initHiddenDays(), i.dateProfileGenerator = new i.dateProfileGeneratorClass(i), i.bindBaseRenderHandlers(), i.eventOrderSpecs = o.parseFieldSpecs(i.opt("eventOrder")), i.initialize && i.initialize(), i
                    }
                    return i.__extends(t, e), t.prototype._getView = function() {
                        return this
                    }, t.prototype.opt = function(e) {
                        return this.options[e]
                    }, t.prototype.initRenderQueue = function() {
                        this.renderQueue = new l.default({
                            event: this.opt("eventRenderWait")
                        }), this.renderQueue.on("start", this.onRenderQueueStart.bind(this)), this.renderQueue.on("stop", this.onRenderQueueStop.bind(this)), this.on("before:change", this.startBatchRender), this.on("change", this.stopBatchRender)
                    }, t.prototype.onRenderQueueStart = function() {
                        this.calendar.freezeContentHeight(), this.addScroll(this.queryScroll())
                    }, t.prototype.onRenderQueueStop = function() {
                        this.calendar.updateViewSize() && this.popScroll(), this.calendar.thawContentHeight()
                    }, t.prototype.startBatchRender = function() {
                        this.batchRenderDepth++ || this.renderQueue.pause()
                    }, t.prototype.stopBatchRender = function() {
                        --this.batchRenderDepth || this.renderQueue.resume()
                    }, t.prototype.requestRender = function(e, t, n) {
                        this.renderQueue.queue(e, t, n)
                    }, t.prototype.whenSizeUpdated = function(e) {
                        this.renderQueue.isRunning ? this.renderQueue.one("stop", e.bind(this)) : e.call(this)
                    }, t.prototype.computeTitle = function(e) {
                        var t;
                        return t = /^(year|month)$/.test(e.currentRangeUnit) ? e.currentUnzonedRange : e.activeUnzonedRange, this.formatRange({
                            start: this.calendar.msToMoment(t.startMs, e.isRangeAllDay),
                            end: this.calendar.msToMoment(t.endMs, e.isRangeAllDay)
                        }, e.isRangeAllDay, this.opt("titleFormat") || this.computeTitleFormat(e), this.opt("titleRangeSeparator"))
                    }, t.prototype.computeTitleFormat = function(e) {
                        var t = e.currentRangeUnit;
                        return "year" === t ? "YYYY" : "month" === t ? this.opt("monthYearFormat") : e.currentUnzonedRange.as("days") > 1 ? "ll" : "LL"
                    }, t.prototype.setDate = function(e) {
                        var t = this.get("dateProfile"),
                            n = this.dateProfileGenerator.build(e, void 0, !0);
                        t && t.activeUnzonedRange.equals(n.activeUnzonedRange) || this.set("dateProfile", n)
                    }, t.prototype.unsetDate = function() {
                        this.unset("dateProfile")
                    }, t.prototype.fetchInitialEvents = function(e) {
                        var t = this.calendar,
                            n = e.isRangeAllDay && !this.usesMinMaxTime;
                        return t.requestEvents(t.msToMoment(e.activeUnzonedRange.startMs, n), t.msToMoment(e.activeUnzonedRange.endMs, n))
                    }, t.prototype.bindEventChanges = function() {
                        this.listenTo(this.calendar, "eventsReset", this.resetEvents)
                    }, t.prototype.unbindEventChanges = function() {
                        this.stopListeningTo(this.calendar, "eventsReset")
                    }, t.prototype.setEvents = function(e) {
                        this.set("currentEvents", e), this.set("hasEvents", !0)
                    }, t.prototype.unsetEvents = function() {
                        this.unset("currentEvents"), this.unset("hasEvents")
                    }, t.prototype.resetEvents = function(e) {
                        this.startBatchRender(), this.unsetEvents(), this.setEvents(e), this.stopBatchRender()
                    }, t.prototype.requestDateRender = function(e) {
                        var t = this;
                        this.requestRender(function() {
                            t.executeDateRender(e)
                        }, "date", "init")
                    }, t.prototype.requestDateUnrender = function() {
                        var e = this;
                        this.requestRender(function() {
                            e.executeDateUnrender()
                        }, "date", "destroy")
                    }, t.prototype.executeDateRender = function(t) {
                        e.prototype.executeDateRender.call(this, t), this.render && this.render(), this.trigger("datesRendered"), this.addScroll({
                            isDateInit: !0
                        }), this.startNowIndicator()
                    }, t.prototype.executeDateUnrender = function() {
                        this.unselect(), this.stopNowIndicator(), this.trigger("before:datesUnrendered"), this.destroy && this.destroy(), e.prototype.executeDateUnrender.call(this)
                    }, t.prototype.bindBaseRenderHandlers = function() {
                        var e = this;
                        this.on("datesRendered", function() {
                            e.whenSizeUpdated(e.triggerViewRender)
                        }), this.on("before:datesUnrendered", function() {
                            e.triggerViewDestroy()
                        })
                    }, t.prototype.triggerViewRender = function() {
                        this.publiclyTrigger("viewRender", {
                            context: this,
                            args: [this, this.el]
                        })
                    }, t.prototype.triggerViewDestroy = function() {
                        this.publiclyTrigger("viewDestroy", {
                            context: this,
                            args: [this, this.el]
                        })
                    }, t.prototype.requestEventsRender = function(e) {
                        var t = this;
                        this.requestRender(function() {
                            t.executeEventRender(e), t.whenSizeUpdated(t.triggerAfterEventsRendered)
                        }, "event", "init")
                    }, t.prototype.requestEventsUnrender = function() {
                        var e = this;
                        this.requestRender(function() {
                            e.triggerBeforeEventsDestroyed(), e.executeEventUnrender()
                        }, "event", "destroy")
                    }, t.prototype.requestBusinessHoursRender = function(e) {
                        var t = this;
                        this.requestRender(function() {
                            t.renderBusinessHours(e)
                        }, "businessHours", "init")
                    }, t.prototype.requestBusinessHoursUnrender = function() {
                        var e = this;
                        this.requestRender(function() {
                            e.unrenderBusinessHours()
                        }, "businessHours", "destroy")
                    }, t.prototype.bindGlobalHandlers = function() {
                        e.prototype.bindGlobalHandlers.call(this), this.listenTo(u.default.get(), {
                            touchstart: this.processUnselect,
                            mousedown: this.handleDocumentMousedown
                        })
                    }, t.prototype.unbindGlobalHandlers = function() {
                        e.prototype.unbindGlobalHandlers.call(this), this.stopListeningTo(u.default.get())
                    }, t.prototype.startNowIndicator = function() {
                        var e, t, n, i = this;
                        this.opt("nowIndicator") && (e = this.getNowIndicatorUnit()) && (t = o.proxy(this, "updateNowIndicator"), this.initialNowDate = this.calendar.getNow(), this.initialNowQueriedMs = (new Date).valueOf(), n = this.initialNowDate.clone().startOf(e).add(1, e).valueOf() - this.initialNowDate.valueOf(), this.nowIndicatorTimeoutID = setTimeout(function() {
                            i.nowIndicatorTimeoutID = null, t(), n = +a.duration(1, e), n = Math.max(100, n), i.nowIndicatorIntervalID = setInterval(t, n)
                        }, n))
                    }, t.prototype.updateNowIndicator = function() {
                        this.isDatesRendered && this.initialNowDate && (this.unrenderNowIndicator(), this.renderNowIndicator(this.initialNowDate.clone().add((new Date).valueOf() - this.initialNowQueriedMs)), this.isNowIndicatorRendered = !0)
                    }, t.prototype.stopNowIndicator = function() {
                        this.isNowIndicatorRendered && (this.nowIndicatorTimeoutID && (clearTimeout(this.nowIndicatorTimeoutID), this.nowIndicatorTimeoutID = null), this.nowIndicatorIntervalID && (clearInterval(this.nowIndicatorIntervalID), this.nowIndicatorIntervalID = null), this.unrenderNowIndicator(), this.isNowIndicatorRendered = !1)
                    }, t.prototype.updateSize = function(t, n, i) {
                        this.setHeight ? this.setHeight(t, n) : e.prototype.updateSize.call(this, t, n, i), this.updateNowIndicator()
                    }, t.prototype.addScroll = function(e) {
                        var t = this.queuedScroll || (this.queuedScroll = {});
                        r.extend(t, e)
                    }, t.prototype.popScroll = function() {
                        this.applyQueuedScroll(), this.queuedScroll = null
                    }, t.prototype.applyQueuedScroll = function() {
                        this.queuedScroll && this.applyScroll(this.queuedScroll)
                    }, t.prototype.queryScroll = function() {
                        var e = {};
                        return this.isDatesRendered && r.extend(e, this.queryDateScroll()), e
                    }, t.prototype.applyScroll = function(e) {
                        e.isDateInit && this.isDatesRendered && r.extend(e, this.computeInitialDateScroll()), this.isDatesRendered && this.applyDateScroll(e)
                    }, t.prototype.computeInitialDateScroll = function() {
                        return {}
                    }, t.prototype.queryDateScroll = function() {
                        return {}
                    }, t.prototype.applyDateScroll = function(e) {}, t.prototype.reportEventDrop = function(e, t, n, i) {
                        var r = this.calendar.eventManager.mutateEventsWithId(e.def.id, t),
                            o = t.dateMutation;
                        o && (e.dateProfile = o.buildNewDateProfile(e.dateProfile, this.calendar)), this.triggerEventDrop(e, o && o.dateDelta || a.duration(), r, n, i)
                    }, t.prototype.triggerEventDrop = function(e, t, n, i, r) {
                        this.publiclyTrigger("eventDrop", {
                            context: i[0],
                            args: [e.toLegacy(), t, n, r, {}, this]
                        })
                    }, t.prototype.reportExternalDrop = function(e, t, n, i, r, a) {
                        t && this.calendar.eventManager.addEventDef(e, n), this.triggerExternalDrop(e, t, i, r, a)
                    }, t.prototype.triggerExternalDrop = function(e, t, n, i, r) {
                        this.publiclyTrigger("drop", {
                            context: n[0],
                            args: [e.dateProfile.start.clone(), i, r, this]
                        }), t && this.publiclyTrigger("eventReceive", {
                            context: this,
                            args: [e.buildInstance().toLegacy(), this]
                        })
                    }, t.prototype.reportEventResize = function(e, t, n, i) {
                        var r = this.calendar.eventManager.mutateEventsWithId(e.def.id, t);
                        e.dateProfile = t.dateMutation.buildNewDateProfile(e.dateProfile, this.calendar);
                        var a = t.dateMutation.endDelta || t.dateMutation.startDelta;
                        this.triggerEventResize(e, a, r, n, i)
                    }, t.prototype.triggerEventResize = function(e, t, n, i, r) {
                        this.publiclyTrigger("eventResize", {
                            context: i[0],
                            args: [e.toLegacy(), t, n, r, {}, this]
                        })
                    }, t.prototype.select = function(e, t) {
                        this.unselect(t), this.renderSelectionFootprint(e), this.reportSelection(e, t)
                    }, t.prototype.renderSelectionFootprint = function(t) {
                        this.renderSelection ? this.renderSelection(t.toLegacy(this.calendar)) : e.prototype.renderSelectionFootprint.call(this, t)
                    }, t.prototype.reportSelection = function(e, t) {
                        this.isSelected = !0, this.triggerSelect(e, t)
                    }, t.prototype.triggerSelect = function(e, t) {
                        var n = this.calendar.footprintToDateProfile(e);
                        this.publiclyTrigger("select", {
                            context: this,
                            args: [n.start, n.end, t, this]
                        })
                    }, t.prototype.unselect = function(e) {
                        this.isSelected && (this.isSelected = !1, this.destroySelection && this.destroySelection(), this.unrenderSelection(), this.publiclyTrigger("unselect", {
                            context: this,
                            args: [e, this]
                        }))
                    }, t.prototype.selectEventInstance = function(e) {
                        this.selectedEventInstance && this.selectedEventInstance === e || (this.unselectEventInstance(), this.getEventSegs().forEach(function(t) {
                            t.footprint.eventInstance === e && t.el && t.el.addClass("fc-selected")
                        }), this.selectedEventInstance = e)
                    }, t.prototype.unselectEventInstance = function() {
                        this.selectedEventInstance && (this.getEventSegs().forEach(function(e) {
                            e.el && e.el.removeClass("fc-selected")
                        }), this.selectedEventInstance = null)
                    }, t.prototype.isEventDefSelected = function(e) {
                        return this.selectedEventInstance && this.selectedEventInstance.def.id === e.id
                    }, t.prototype.handleDocumentMousedown = function(e) {
                        o.isPrimaryMouseButton(e) && this.processUnselect(e)
                    }, t.prototype.processUnselect = function(e) {
                        this.processRangeUnselect(e), this.processEventUnselect(e)
                    }, t.prototype.processRangeUnselect = function(e) {
                        var t;
                        this.isSelected && this.opt("unselectAuto") && ((t = this.opt("unselectCancel")) && r(e.target).closest(t).length || this.unselect(e))
                    }, t.prototype.processEventUnselect = function(e) {
                        this.selectedEventInstance && (r(e.target).closest(".fc-selected").length || this.unselectEventInstance())
                    }, t.prototype.triggerBaseRendered = function() {
                        this.publiclyTrigger("viewRender", {
                            context: this,
                            args: [this, this.el]
                        })
                    }, t.prototype.triggerBaseUnrendered = function() {
                        this.publiclyTrigger("viewDestroy", {
                            context: this,
                            args: [this, this.el]
                        })
                    }, t.prototype.triggerDayClick = function(e, t, n) {
                        var i = this.calendar.footprintToDateProfile(e);
                        this.publiclyTrigger("dayClick", {
                            context: t,
                            args: [i.start, n, this]
                        })
                    }, t.prototype.isDateInOtherMonth = function(e, t) {
                        return !1
                    }, t.prototype.getUnzonedRangeOption = function(e) {
                        var t = this.opt(e);
                        if ("function" == typeof t && (t = t.apply(null, Array.prototype.slice.call(arguments, 1))), t) return this.calendar.parseUnzonedRange(t)
                    }, t.prototype.initHiddenDays = function() {
                        var e, t = this.opt("hiddenDays") || [],
                            n = [],
                            i = 0;
                        for (!1 === this.opt("weekends") && t.push(0, 6), e = 0; e < 7; e++)(n[e] = -1 !== r.inArray(e, t)) || i++;
                        if (!i) throw new Error("invalid hiddenDays");
                        this.isHiddenDayHash = n
                    }, t.prototype.trimHiddenDays = function(e) {
                        var t = e.getStart(),
                            n = e.getEnd();
                        return t && (t = this.skipHiddenDays(t)), n && (n = this.skipHiddenDays(n, -1, !0)), null === t || null === n || t < n ? new c.default(t, n) : null
                    }, t.prototype.isHiddenDay = function(e) {
                        return a.isMoment(e) && (e = e.day()), this.isHiddenDayHash[e]
                    }, t.prototype.skipHiddenDays = function(e, t, n) {
                        void 0 === t && (t = 1), void 0 === n && (n = !1);
                        for (var i = e.clone(); this.isHiddenDayHash[(i.day() + (n ? t : 0) + 7) % 7];) i.add(t, "days");
                        return i
                    }, t
                }(d.default);
            t.default = h, h.prototype.usesMinMaxTime = !1, h.prototype.dateProfileGeneratorClass = s.default, h.watch("displayingDates", ["isInDom", "dateProfile"], function(e) {
                this.requestDateRender(e.dateProfile)
            }, function() {
                this.requestDateUnrender()
            }), h.watch("displayingBusinessHours", ["displayingDates", "businessHourGenerator"], function(e) {
                this.requestBusinessHoursRender(e.businessHourGenerator)
            }, function() {
                this.requestBusinessHoursUnrender()
            }), h.watch("initialEvents", ["dateProfile"], function(e) {
                return this.fetchInitialEvents(e.dateProfile)
            }), h.watch("bindingEvents", ["initialEvents"], function(e) {
                this.setEvents(e.initialEvents), this.bindEventChanges()
            }, function() {
                this.unbindEventChanges(), this.unsetEvents()
            }), h.watch("displayingEvents", ["displayingDates", "hasEvents"], function() {
                this.requestEventsRender(this.get("currentEvents"))
            }, function() {
                this.requestEventsUnrender()
            }), h.watch("title", ["dateProfile"], function(e) {
                return this.title = this.computeTitle(e.dateProfile)
            }), h.watch("legacyDateProps", ["dateProfile"], function(e) {
                var t = this.calendar,
                    n = e.dateProfile;
                this.start = t.msToMoment(n.activeUnzonedRange.startMs, n.isRangeAllDay), this.end = t.msToMoment(n.activeUnzonedRange.endMs, n.isRangeAllDay), this.intervalStart = t.msToMoment(n.currentUnzonedRange.startMs, n.isRangeAllDay), this.intervalEnd = t.msToMoment(n.currentUnzonedRange.endMs, n.isRangeAllDay)
            })
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(3),
                r = n(4),
                a = function() {
                    function e(e, t) {
                        this.view = e._getView(), this.component = e, this.fillRenderer = t
                    }
                    return e.prototype.opt = function(e) {
                        return this.view.opt(e)
                    }, e.prototype.rangeUpdated = function() {
                        var e, t;
                        this.eventTimeFormat = this.opt("eventTimeFormat") || this.opt("timeFormat") || this.computeEventTimeFormat(), null == (e = this.opt("displayEventTime")) && (e = this.computeDisplayEventTime()), null == (t = this.opt("displayEventEnd")) && (t = this.computeDisplayEventEnd()), this.displayEventTime = e, this.displayEventEnd = t
                    }, e.prototype.render = function(e) {
                        var t, n, i, r = this.component._getDateProfile(),
                            a = [],
                            o = [];
                        for (t in e) i = (n = e[t]).sliceRenderRanges(r.activeUnzonedRange), n.getEventDef().hasBgRendering() ? a.push.apply(a, i) : o.push.apply(o, i);
                        this.renderBgRanges(a), this.renderFgRanges(o)
                    }, e.prototype.unrender = function() {
                        this.unrenderBgRanges(), this.unrenderFgRanges()
                    }, e.prototype.renderFgRanges = function(e) {
                        var t = this.component.eventRangesToEventFootprints(e),
                            n = this.component.eventFootprintsToSegs(t);
                        n = this.renderFgSegEls(n), !1 !== this.renderFgSegs(n) && (this.fgSegs = n)
                    }, e.prototype.unrenderFgRanges = function() {
                        this.unrenderFgSegs(this.fgSegs || []), this.fgSegs = null
                    }, e.prototype.renderBgRanges = function(e) {
                        var t = this.component.eventRangesToEventFootprints(e),
                            n = this.component.eventFootprintsToSegs(t);
                        !1 !== this.renderBgSegs(n) && (this.bgSegs = n)
                    }, e.prototype.unrenderBgRanges = function() {
                        this.unrenderBgSegs(), this.bgSegs = null
                    }, e.prototype.getSegs = function() {
                        return (this.bgSegs || []).concat(this.fgSegs || [])
                    }, e.prototype.renderFgSegs = function(e) {
                        return !1
                    }, e.prototype.unrenderFgSegs = function(e) {}, e.prototype.renderBgSegs = function(e) {
                        var t = this;
                        if (!this.fillRenderer) return !1;
                        this.fillRenderer.renderSegs("bgEvent", e, {
                            getClasses: function(e) {
                                return t.getBgClasses(e.footprint.eventDef)
                            },
                            getCss: function(e) {
                                return {
                                    "background-color": t.getBgColor(e.footprint.eventDef)
                                }
                            },
                            filterEl: function(e, n) {
                                return t.filterEventRenderEl(e.footprint, n)
                            }
                        })
                    }, e.prototype.unrenderBgSegs = function() {
                        this.fillRenderer && this.fillRenderer.unrender("bgEvent")
                    }, e.prototype.renderFgSegEls = function(e, t) {
                        var n = this;
                        void 0 === t && (t = !1);
                        var r, a = this.view.hasPublicHandlers("eventRender"),
                            o = "",
                            l = [];
                        if (e.length) {
                            for (r = 0; r < e.length; r++) this.beforeFgSegHtml(e[r]), o += this.fgSegHtml(e[r], t);
                            i(o).each(function(t, r) {
                                var o = e[t],
                                    s = i(r);
                                a && (s = n.filterEventRenderEl(o.footprint, s)), s && (s.data("fc-seg", o), o.el = s, l.push(o))
                            })
                        }
                        return l
                    }, e.prototype.beforeFgSegHtml = function(e) {}, e.prototype.fgSegHtml = function(e, t) {}, e.prototype.getSegClasses = function(e, t, n) {
                        var i = ["fc-event", e.isStart ? "fc-start" : "fc-not-start", e.isEnd ? "fc-end" : "fc-not-end"].concat(this.getClasses(e.footprint.eventDef));
                        return t && i.push("fc-draggable"), n && i.push("fc-resizable"), this.view.isEventDefSelected(e.footprint.eventDef) && i.push("fc-selected"), i
                    }, e.prototype.filterEventRenderEl = function(e, t) {
                        var n = e.getEventLegacy(),
                            r = this.view.publiclyTrigger("eventRender", {
                                context: n,
                                args: [n, t, this.view]
                            });
                        return !1 === r ? t = null : r && !0 !== r && (t = i(r)), t
                    }, e.prototype.getTimeText = function(e, t, n) {
                        return this._getTimeText(e.eventInstance.dateProfile.start, e.eventInstance.dateProfile.end, e.componentFootprint.isAllDay, t, n)
                    }, e.prototype._getTimeText = function(e, t, n, i, r) {
                        return null == i && (i = this.eventTimeFormat), null == r && (r = this.displayEventEnd), this.displayEventTime && !n ? r && t ? this.view.formatRange({
                            start: e,
                            end: t
                        }, !1, i) : e.format(i) : ""
                    }, e.prototype.computeEventTimeFormat = function() {
                        return this.opt("smallTimeFormat")
                    }, e.prototype.computeDisplayEventTime = function() {
                        return !0
                    }, e.prototype.computeDisplayEventEnd = function() {
                        return !0
                    }, e.prototype.getBgClasses = function(e) {
                        var t = this.getClasses(e);
                        return t.push("fc-bgevent"), t
                    }, e.prototype.getClasses = function(e) {
                        var t, n = this.getStylingObjs(e),
                            i = [];
                        for (t = 0; t < n.length; t++) i.push.apply(i, n[t].eventClassName || n[t].className || []);
                        return i
                    }, e.prototype.getSkinCss = function(e) {
                        return {
                            "background-color": this.getBgColor(e),
                            "border-color": this.getBorderColor(e),
                            color: this.getTextColor(e)
                        }
                    }, e.prototype.getBgColor = function(e) {
                        var t, n, i = this.getStylingObjs(e);
                        for (t = 0; t < i.length && !n; t++) n = i[t].eventBackgroundColor || i[t].eventColor || i[t].backgroundColor || i[t].color;
                        return n || (n = this.opt("eventBackgroundColor") || this.opt("eventColor")), n
                    }, e.prototype.getBorderColor = function(e) {
                        var t, n, i = this.getStylingObjs(e);
                        for (t = 0; t < i.length && !n; t++) n = i[t].eventBorderColor || i[t].eventColor || i[t].borderColor || i[t].color;
                        return n || (n = this.opt("eventBorderColor") || this.opt("eventColor")), n
                    }, e.prototype.getTextColor = function(e) {
                        var t, n, i = this.getStylingObjs(e);
                        for (t = 0; t < i.length && !n; t++) n = i[t].eventTextColor || i[t].textColor;
                        return n || (n = this.opt("eventTextColor")), n
                    }, e.prototype.getStylingObjs = function(e) {
                        var t = this.getFallbackStylingObjs(e);
                        return t.unshift(e), t
                    }, e.prototype.getFallbackStylingObjs = function(e) {
                        return [e.source]
                    }, e.prototype.sortEventSegs = function(e) {
                        e.sort(r.proxy(this, "compareEventSegs"))
                    }, e.prototype.compareEventSegs = function(e, t) {
                        var n = e.footprint,
                            i = t.footprint,
                            a = n.componentFootprint,
                            o = i.componentFootprint,
                            l = a.unzonedRange,
                            s = o.unzonedRange;
                        return l.startMs - s.startMs || s.endMs - s.startMs - (l.endMs - l.startMs) || o.isAllDay - a.isAllDay || r.compareByFieldSpecs(n.eventDef, i.eventDef, this.view.eventOrderSpecs, n.eventDef.miscProps, i.eventDef.miscProps)
                    }, e
                }();
            t.default = a
        }, , , , , function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(11);

            function r(e) {
                return "en" !== e.locale() ? e.clone().locale("en") : e
            }
            i.newMomentProto.format = function() {
                return this._fullCalendar && arguments[0] ? c(this, arguments[0]) : this._ambigTime ? i.oldMomentFormat(r(this), "YYYY-MM-DD") : this._ambigZone ? i.oldMomentFormat(r(this), "YYYY-MM-DD[T]HH:mm:ss") : this._fullCalendar ? i.oldMomentFormat(r(this)) : i.oldMomentProto.format.apply(this, arguments)
            }, i.newMomentProto.toISOString = function() {
                return this._ambigTime ? i.oldMomentFormat(r(this), "YYYY-MM-DD") : this._ambigZone ? i.oldMomentFormat(r(this), "YYYY-MM-DD[T]HH:mm:ss") : this._fullCalendar ? i.oldMomentProto.toISOString.apply(r(this), arguments) : i.oldMomentProto.toISOString.apply(this, arguments)
            };
            var a = "\v",
                o = "",
                l = "",
                s = new RegExp(l + "([^" + l + "]*)" + l, "g"),
                d = {
                    t: function(e) {
                        return i.oldMomentFormat(e, "a").charAt(0)
                    },
                    T: function(e) {
                        return i.oldMomentFormat(e, "A").charAt(0)
                    }
                },
                u = {
                    Y: {
                        value: 1,
                        unit: "year"
                    },
                    M: {
                        value: 2,
                        unit: "month"
                    },
                    W: {
                        value: 3,
                        unit: "week"
                    },
                    w: {
                        value: 3,
                        unit: "week"
                    },
                    D: {
                        value: 4,
                        unit: "day"
                    },
                    d: {
                        value: 4,
                        unit: "day"
                    }
                };

            function c(e, t) {
                return function(e, t) {
                    return v(y(e, t).join(""))
                }(p(t).fakeFormatString, e)
            }
            t.formatDate = c, t.formatRange = function(e, t, n, r, a) {
                return e = i.default.parseZone(e), t = i.default.parseZone(t),
                    function(e, t, n, i, r) {
                        var a, o, l, s = e.sameUnits,
                            d = t.clone().stripZone(),
                            u = n.clone().stripZone(),
                            c = y(e.fakeFormatString, t),
                            h = y(e.fakeFormatString, n),
                            p = "",
                            f = "",
                            m = "",
                            g = "",
                            _ = "";
                        for (a = 0; a < s.length && (!s[a] || d.isSame(u, s[a])); a++) p += c[a];
                        for (o = s.length - 1; o > a && (!s[o] || d.isSame(u, s[o])) && (o - 1 !== a || "." !== c[o]); o--) f = c[o] + f;
                        for (l = a; l <= o; l++) m += c[l], g += h[l];
                        return (m || g) && (_ = r ? g + i + m : m + i + g), v(p + _ + f)
                    }(p(n = e.localeData().longDateFormat(n) || n), e, t, r || " - ", a)
            };
            var h = {};

            function p(e) {
                return h[e] || (h[e] = function(e) {
                    var t = f(e);
                    return {
                        fakeFormatString: g(t),
                        sameUnits: _(t)
                    }
                }(e))
            }

            function f(e) {
                for (var t, n = [], i = /\[([^\]]*)\]|\(([^\)]*)\)|(LTS|LT|(\w)\4*o?)|([^\w\[\(]+)/g; t = i.exec(e);) t[1] ? n.push.apply(n, m(t[1])) : t[2] ? n.push({
                    maybe: f(t[2])
                }) : t[3] ? n.push({
                    token: t[3]
                }) : t[5] && n.push.apply(n, m(t[5]));
                return n
            }

            function m(e) {
                return ". " === e ? [".", " "] : [e]
            }

            function g(e) {
                var t, n, i = [];
                for (t = 0; t < e.length; t++) "string" == typeof(n = e[t]) ? i.push("[" + n + "]") : n.token ? n.token in d ? i.push(o + "[" + n.token + "]") : i.push(n.token) : n.maybe && i.push(l + g(n.maybe) + l);
                return i.join(a)
            }

            function _(e) {
                var t, n, i, r = [];
                for (t = 0; t < e.length; t++)(n = e[t]).token ? (i = u[n.token.charAt(0)], r.push(i ? i.unit : "second")) : n.maybe ? r.push.apply(r, _(n.maybe)) : r.push(null);
                return r
            }

            function y(e, t) {
                var n, r, l = [],
                    s = i.oldMomentFormat(t, e).split(a);
                for (n = 0; n < s.length; n++)(r = s[n]).charAt(0) === o ? l.push(d[r.substring(1)](t)) : l.push(r);
                return l
            }

            function v(e) {
                return e.replace(s, function(e, t) {
                    return t.match(/[1-9]/) ? t : ""
                })
            }
            t.queryMostGranularFormatUnit = function(e) {
                var t, n, i, r, a = f(e);
                for (t = 0; t < a.length; t++)(n = a[t]).token && (i = u[n.token.charAt(0)]) && (!r || i.value > r.value) && (r = i);
                return r ? r.unit : null
            }
        }, function(e, t) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = function() {
                return function(e, t, n) {
                    this.unzonedRange = e, this.eventDef = t, n && (this.eventInstance = n)
                }
            }();
            t.default = n
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(35),
                a = n(13),
                o = n(7),
                l = function(e) {
                    function t() {
                        var t = e.call(this) || this;
                        return t._watchers = {}, t._props = {}, t.applyGlobalWatchers(), t.constructed(), t
                    }
                    return i.__extends(t, e), t.watch = function(e) {
                        for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                        this.prototype.hasOwnProperty("_globalWatchArgs") || (this.prototype._globalWatchArgs = Object.create(this.prototype._globalWatchArgs)), this.prototype._globalWatchArgs[e] = t
                    }, t.prototype.constructed = function() {}, t.prototype.applyGlobalWatchers = function() {
                        var e, t = this._globalWatchArgs;
                        for (e in t) this.watch.apply(this, [e].concat(t[e]))
                    }, t.prototype.has = function(e) {
                        return e in this._props
                    }, t.prototype.get = function(e) {
                        return void 0 === e ? this._props : this._props[e]
                    }, t.prototype.set = function(e, t) {
                        var n;
                        "string" == typeof e ? (n = {})[e] = void 0 === t ? null : t : n = e, this.setProps(n)
                    }, t.prototype.reset = function(e) {
                        var t, n = this._props,
                            i = {};
                        for (t in n) i[t] = void 0;
                        for (t in e) i[t] = e[t];
                        this.setProps(i)
                    }, t.prototype.unset = function(e) {
                        var t, n, i = {};
                        for (t = "string" == typeof e ? [e] : e, n = 0; n < t.length; n++) i[t[n]] = void 0;
                        this.setProps(i)
                    }, t.prototype.setProps = function(e) {
                        var t, n, i = {},
                            r = 0;
                        for (t in e) "object" != typeof(n = e[t]) && n === this._props[t] || (i[t] = n, r++);
                        if (r) {
                            for (t in this.trigger("before:batchChange", i), i) n = i[t], this.trigger("before:change", t, n), this.trigger("before:change:" + t, n);
                            for (t in i) void 0 === (n = i[t]) ? delete this._props[t] : this._props[t] = n, this.trigger("change:" + t, n), this.trigger("change", t, n);
                            this.trigger("batchChange", i)
                        }
                    }, t.prototype.watch = function(e, t, n, i) {
                        var r = this;
                        this.unwatch(e), this._watchers[e] = this._watchDeps(t, function(t) {
                            var i = n.call(r, t);
                            i && i.then ? (r.unset(e), i.then(function(t) {
                                r.set(e, t)
                            })) : r.set(e, i)
                        }, function(t) {
                            r.unset(e), i && i.call(r, t)
                        })
                    }, t.prototype.unwatch = function(e) {
                        var t = this._watchers[e];
                        t && (delete this._watchers[e], t.teardown())
                    }, t.prototype._watchDeps = function(e, t, n) {
                        var i = this,
                            r = 0,
                            a = e.length,
                            o = 0,
                            l = {},
                            s = [],
                            d = !1,
                            u = function(e, t) {
                                i.on(e, t), s.push([e, t])
                            };
                        return e.forEach(function(e) {
                            var i = !1;
                            "?" === e.charAt(0) && (e = e.substring(1), i = !0), u("before:change:" + e, function(e) {
                                1 == ++r && o === a && (d = !0, n(l), d = !1)
                            }), u("change:" + e, function(n) {
                                ! function(e, n, i) {
                                    void 0 === n ? (i || void 0 === l[e] || o--, delete l[e]) : (i || void 0 !== l[e] || o++, l[e] = n), --r || o === a && (d || t(l))
                                }(e, n, i)
                            })
                        }), e.forEach(function(e) {
                            var t = !1;
                            "?" === e.charAt(0) && (e = e.substring(1), t = !0), i.has(e) ? (l[e] = i.get(e), o++) : t && o++
                        }), o === a && t(l), {
                            teardown: function() {
                                for (var e = 0; e < s.length; e++) i.off(s[e][0], s[e][1]);
                                s = null, o === a && n()
                            },
                            flash: function() {
                                o === a && (n(), t(l))
                            }
                        }
                    }, t.prototype.flash = function(e) {
                        var t = this._watchers[e];
                        t && t.flash()
                    }, t
                }(r.default);
            t.default = l, l.prototype._globalWatchArgs = {}, a.default.mixInto(l), o.default.mixInto(l)
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(4),
                a = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return i.__extends(t, e), t.defineStandardProps = function(e) {
                        var t = this.prototype;
                        t.hasOwnProperty("standardPropMap") || (t.standardPropMap = Object.create(t.standardPropMap)), r.copyOwnProps(e, t.standardPropMap)
                    }, t.copyVerbatimStandardProps = function(e, t) {
                        var n, i = this.prototype.standardPropMap;
                        for (n in i) null != e[n] && !0 === i[n] && (t[n] = e[n])
                    }, t.prototype.applyProps = function(e) {
                        var t, n = this.standardPropMap,
                            i = {},
                            r = {};
                        for (t in e) !0 === n[t] ? this[t] = e[t] : !1 === n[t] ? i[t] = e[t] : r[t] = e[t];
                        return this.applyMiscProps(r), this.applyManualStandardProps(i)
                    }, t.prototype.applyManualStandardProps = function(e) {
                        return !0
                    }, t.prototype.applyMiscProps = function(e) {}, t.prototype.isStandardProp = function(e) {
                        return e in this.standardPropMap
                    }, t
                }(n(15).default);
            t.default = a, a.prototype.standardPropMap = {}
        }, function(e, t) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = function() {
                function e(e, t) {
                    this.def = e, this.dateProfile = t
                }
                return e.prototype.toLegacy = function() {
                    var e = this.dateProfile,
                        t = this.def.toLegacy();
                    return t.start = e.start.clone(), t.end = e.end ? e.end.clone() : null, t
                }, e
            }();
            t.default = n
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(3),
                a = n(0),
                o = n(37),
                l = n(53),
                s = n(16),
                d = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return i.__extends(t, e), t.prototype.isAllDay = function() {
                        return !this.startTime && !this.endTime
                    }, t.prototype.buildInstances = function(e) {
                        for (var t, n, i, r = this.source.calendar, a = e.getStart(), o = e.getEnd(), d = []; a.isBefore(o);) this.dowHash && !this.dowHash[a.day()] || (n = (t = r.applyTimezone(a)).clone(), i = null, this.startTime ? n.time(this.startTime) : n.stripTime(), this.endTime && (i = t.clone().time(this.endTime)), d.push(new l.default(this, new s.default(n, i, r)))), a.add(1, "days");
                        return d
                    }, t.prototype.setDow = function(e) {
                        this.dowHash || (this.dowHash = {});
                        for (var t = 0; t < e.length; t++) this.dowHash[e[t]] = !0
                    }, t.prototype.clone = function() {
                        var t = e.prototype.clone.call(this);
                        return t.startTime && (t.startTime = a.duration(this.startTime)), t.endTime && (t.endTime = a.duration(this.endTime)), this.dowHash && (t.dowHash = r.extend({}, this.dowHash)), t
                    }, t
                }(o.default);
            t.default = d, d.prototype.applyProps = function(e) {
                var t = o.default.prototype.applyProps.call(this, e);
                return e.start && (this.startTime = a.duration(e.start)), e.end && (this.endTime = a.duration(e.end)), e.dow && this.setDow(e.dow), t
            }, d.defineStandardProps({
                start: !1,
                end: !1,
                dow: !1
            })
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(0),
                r = n(4),
                a = n(5),
                o = function() {
                    function e(e) {
                        this._view = e
                    }
                    return e.prototype.opt = function(e) {
                        return this._view.opt(e)
                    }, e.prototype.trimHiddenDays = function(e) {
                        return this._view.trimHiddenDays(e)
                    }, e.prototype.msToUtcMoment = function(e, t) {
                        return this._view.calendar.msToUtcMoment(e, t)
                    }, e.prototype.buildPrev = function(e) {
                        var t = e.date.clone().startOf(e.currentRangeUnit).subtract(e.dateIncrement);
                        return this.build(t, -1)
                    }, e.prototype.buildNext = function(e) {
                        var t = e.date.clone().startOf(e.currentRangeUnit).add(e.dateIncrement);
                        return this.build(t, 1)
                    }, e.prototype.build = function(e, t, n) {
                        void 0 === n && (n = !1);
                        var r, a, o, l, s, d, u, c, h = !e.hasTime();
                        return r = this.buildValidRange(), r = this.trimHiddenDays(r), n && (e = this.msToUtcMoment(r.constrainDate(e), h)), l = this.buildCurrentRangeInfo(e, t), s = /^(year|month|week|day)$/.test(l.unit), d = this.buildRenderRange(this.trimHiddenDays(l.unzonedRange), l.unit, s), u = (d = this.trimHiddenDays(d)).clone(), this.opt("showNonCurrentDates") || (u = u.intersect(l.unzonedRange)), a = i.duration(this.opt("minTime")), o = i.duration(this.opt("maxTime")), (u = (u = this.adjustActiveRange(u, a, o)).intersect(r)) && (e = this.msToUtcMoment(u.constrainDate(e), h)), c = l.unzonedRange.intersectsWith(r), {
                            validUnzonedRange: r,
                            currentUnzonedRange: l.unzonedRange,
                            currentRangeUnit: l.unit,
                            isRangeAllDay: s,
                            activeUnzonedRange: u,
                            renderUnzonedRange: d,
                            minTime: a,
                            maxTime: o,
                            isValid: c,
                            date: e,
                            dateIncrement: this.buildDateIncrement(l.duration)
                        }
                    }, e.prototype.buildValidRange = function() {
                        return this._view.getUnzonedRangeOption("validRange", this._view.calendar.getNow()) || new a.default
                    }, e.prototype.buildCurrentRangeInfo = function(e, t) {
                        var n, i = this._view.viewSpec,
                            a = null,
                            o = null,
                            l = null;
                        return i.duration ? (a = i.duration, o = i.durationUnit, l = this.buildRangeFromDuration(e, t, a, o)) : (n = this.opt("dayCount")) ? (o = "day", l = this.buildRangeFromDayCount(e, t, n)) : (l = this.buildCustomVisibleRange(e)) ? o = r.computeGreatestUnit(l.getStart(), l.getEnd()) : (a = this.getFallbackDuration(), o = r.computeGreatestUnit(a), l = this.buildRangeFromDuration(e, t, a, o)), {
                            duration: a,
                            unit: o,
                            unzonedRange: l
                        }
                    }, e.prototype.getFallbackDuration = function() {
                        return i.duration({
                            days: 1
                        })
                    }, e.prototype.adjustActiveRange = function(e, t, n) {
                        var i = e.getStart(),
                            r = e.getEnd();
                        return this._view.usesMinMaxTime && (t < 0 && i.time(0).add(t), n > 864e5 && r.time(n - 864e5)), new a.default(i, r)
                    }, e.prototype.buildRangeFromDuration = function(e, t, n, o) {
                        var l, s, d, u, c, h = this.opt("dateAlignment");

                        function p() {
                            d = e.clone().startOf(h), u = d.clone().add(n), c = new a.default(d, u)
                        }
                        return h || ((l = this.opt("dateIncrement")) ? (s = i.duration(l), h = s < n ? r.computeDurationGreatestUnit(s, l) : o) : h = o), n.as("days") <= 1 && this._view.isHiddenDay(d) && (d = this._view.skipHiddenDays(d, t)).startOf("day"), p(), this.trimHiddenDays(c) || (e = this._view.skipHiddenDays(e, t), p()), c
                    }, e.prototype.buildRangeFromDayCount = function(e, t, n) {
                        var i, r, o = this.opt("dateAlignment"),
                            l = 0;
                        if (o || -1 !== t) {
                            i = e.clone(), o && i.startOf(o), i.startOf("day"), r = (i = this._view.skipHiddenDays(i)).clone();
                            do {
                                r.add(1, "day"), this._view.isHiddenDay(r) || l++
                            } while (l < n)
                        } else {
                            r = e.clone().startOf("day").add(1, "day"), i = (r = this._view.skipHiddenDays(r, -1, !0)).clone();
                            do {
                                i.add(-1, "day"), this._view.isHiddenDay(i) || l++
                            } while (l < n)
                        }
                        return new a.default(i, r)
                    }, e.prototype.buildCustomVisibleRange = function(e) {
                        var t = this._view.getUnzonedRangeOption("visibleRange", this._view.calendar.applyTimezone(e));
                        return !t || null != t.startMs && null != t.endMs ? t : null
                    }, e.prototype.buildRenderRange = function(e, t, n) {
                        return e.clone()
                    }, e.prototype.buildDateIncrement = function(e) {
                        var t, n = this.opt("dateIncrement");
                        return n ? i.duration(n) : (t = this.opt("dateAlignment")) ? i.duration(1, t) : e || i.duration({
                            days: 1
                        })
                    }, e
                }();
            t.default = o
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(3),
                a = n(4),
                o = n(21),
                l = n(6),
                s = n(9),
                d = function(e) {
                    function t(t) {
                        var n = e.call(this, t) || this;
                        return n.eventDefs = [], n
                    }
                    return i.__extends(t, e), t.parse = function(e, t) {
                        var n;
                        return r.isArray(e.events) ? n = e : r.isArray(e) && (n = {
                            events: e
                        }), !!n && l.default.parse.call(this, n, t)
                    }, t.prototype.setRawEventDefs = function(e) {
                        this.rawEventDefs = e, this.eventDefs = this.parseEventDefs(e)
                    }, t.prototype.fetch = function(e, t, n) {
                        var i, r = this.eventDefs;
                        if (null != this.currentTimezone && this.currentTimezone !== n)
                            for (i = 0; i < r.length; i++) r[i] instanceof s.default && r[i].rezone();
                        return this.currentTimezone = n, o.default.resolve(r)
                    }, t.prototype.addEventDef = function(e) {
                        this.eventDefs.push(e)
                    }, t.prototype.removeEventDefsById = function(e) {
                        return a.removeMatching(this.eventDefs, function(t) {
                            return t.id === e
                        })
                    }, t.prototype.removeAllEventDefs = function() {
                        this.eventDefs = []
                    }, t.prototype.getPrimitive = function() {
                        return this.rawEventDefs
                    }, t.prototype.applyManualStandardProps = function(t) {
                        var n = e.prototype.applyManualStandardProps.call(this, t);
                        return this.setRawEventDefs(t.events), n
                    }, t
                }(l.default);
            t.default = d, d.defineStandardProps({
                events: !1
            })
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(221),
                r = n(222),
                a = {};
            t.defineThemeSystem = function(e, t) {
                a[e] = t
            }, t.getThemeSystemClass = function(e) {
                return e ? !0 === e ? r.default : a[e] : i.default
            }
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(3),
                r = n(4),
                a = function() {
                    function e(e) {
                        this.isHorizontal = !1, this.isVertical = !1, this.els = i(e.els), this.isHorizontal = e.isHorizontal, this.isVertical = e.isVertical, this.forcedOffsetParentEl = e.offsetParent ? i(e.offsetParent) : null
                    }
                    return e.prototype.build = function() {
                        var e = this.forcedOffsetParentEl;
                        !e && this.els.length > 0 && (e = this.els.eq(0).offsetParent()), this.origin = e ? e.offset() : null, this.boundingRect = this.queryBoundingRect(), this.isHorizontal && this.buildElHorizontals(), this.isVertical && this.buildElVerticals()
                    }, e.prototype.clear = function() {
                        this.origin = null, this.boundingRect = null, this.lefts = null, this.rights = null, this.tops = null, this.bottoms = null
                    }, e.prototype.ensureBuilt = function() {
                        this.origin || this.build()
                    }, e.prototype.buildElHorizontals = function() {
                        var e = [],
                            t = [];
                        this.els.each(function(n, r) {
                            var a = i(r),
                                o = a.offset().left,
                                l = a.outerWidth();
                            e.push(o), t.push(o + l)
                        }), this.lefts = e, this.rights = t
                    }, e.prototype.buildElVerticals = function() {
                        var e = [],
                            t = [];
                        this.els.each(function(n, r) {
                            var a = i(r),
                                o = a.offset().top,
                                l = a.outerHeight();
                            e.push(o), t.push(o + l)
                        }), this.tops = e, this.bottoms = t
                    }, e.prototype.getHorizontalIndex = function(e) {
                        this.ensureBuilt();
                        var t, n = this.lefts,
                            i = this.rights,
                            r = n.length;
                        for (t = 0; t < r; t++)
                            if (e >= n[t] && e < i[t]) return t
                    }, e.prototype.getVerticalIndex = function(e) {
                        this.ensureBuilt();
                        var t, n = this.tops,
                            i = this.bottoms,
                            r = n.length;
                        for (t = 0; t < r; t++)
                            if (e >= n[t] && e < i[t]) return t
                    }, e.prototype.getLeftOffset = function(e) {
                        return this.ensureBuilt(), this.lefts[e]
                    }, e.prototype.getLeftPosition = function(e) {
                        return this.ensureBuilt(), this.lefts[e] - this.origin.left
                    }, e.prototype.getRightOffset = function(e) {
                        return this.ensureBuilt(), this.rights[e]
                    }, e.prototype.getRightPosition = function(e) {
                        return this.ensureBuilt(), this.rights[e] - this.origin.left
                    }, e.prototype.getWidth = function(e) {
                        return this.ensureBuilt(), this.rights[e] - this.lefts[e]
                    }, e.prototype.getTopOffset = function(e) {
                        return this.ensureBuilt(), this.tops[e]
                    }, e.prototype.getTopPosition = function(e) {
                        return this.ensureBuilt(), this.tops[e] - this.origin.top
                    }, e.prototype.getBottomOffset = function(e) {
                        return this.ensureBuilt(), this.bottoms[e]
                    }, e.prototype.getBottomPosition = function(e) {
                        return this.ensureBuilt(), this.bottoms[e] - this.origin.top
                    }, e.prototype.getHeight = function(e) {
                        return this.ensureBuilt(), this.bottoms[e] - this.tops[e]
                    }, e.prototype.queryBoundingRect = function() {
                        var e;
                        return this.els.length > 0 && !(e = r.getScrollParent(this.els.eq(0))).is(document) && !e.is("html,body") ? r.getClientRect(e) : null
                    }, e.prototype.isPointInBounds = function(e, t) {
                        return this.isLeftInBounds(e) && this.isTopInBounds(t)
                    }, e.prototype.isLeftInBounds = function(e) {
                        return !this.boundingRect || e >= this.boundingRect.left && e < this.boundingRect.right
                    }, e.prototype.isTopInBounds = function(e) {
                        return !this.boundingRect || e >= this.boundingRect.top && e < this.boundingRect.bottom
                    }, e
                }();
            t.default = a
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(3),
                r = n(4),
                a = n(7),
                o = n(23),
                l = function() {
                    function e(e) {
                        this.isInteracting = !1, this.isDistanceSurpassed = !1, this.isDelayEnded = !1, this.isDragging = !1, this.isTouch = !1, this.isGeneric = !1, this.shouldCancelTouchScroll = !0, this.scrollAlwaysKills = !1, this.isAutoScroll = !1, this.scrollSensitivity = 30, this.scrollSpeed = 200, this.scrollIntervalMs = 50, this.options = e || {}
                    }
                    return e.prototype.startInteraction = function(e, t) {
                        if (void 0 === t && (t = {}), "mousedown" === e.type) {
                            if (o.default.get().shouldIgnoreMouse()) return;
                            if (!r.isPrimaryMouseButton(e)) return;
                            e.preventDefault()
                        }
                        this.isInteracting || (this.delay = r.firstDefined(t.delay, this.options.delay, 0), this.minDistance = r.firstDefined(t.distance, this.options.distance, 0), this.subjectEl = this.options.subjectEl, r.preventSelection(i("body")), this.isInteracting = !0, this.isTouch = r.getEvIsTouch(e), this.isGeneric = "dragstart" === e.type, this.isDelayEnded = !1, this.isDistanceSurpassed = !1, this.originX = r.getEvX(e), this.originY = r.getEvY(e), this.scrollEl = r.getScrollParent(i(e.target)), this.bindHandlers(), this.initAutoScroll(), this.handleInteractionStart(e), this.startDelay(e), this.minDistance || this.handleDistanceSurpassed(e))
                    }, e.prototype.handleInteractionStart = function(e) {
                        this.trigger("interactionStart", e)
                    }, e.prototype.endInteraction = function(e, t) {
                        this.isInteracting && (this.endDrag(e), this.delayTimeoutId && (clearTimeout(this.delayTimeoutId), this.delayTimeoutId = null), this.destroyAutoScroll(), this.unbindHandlers(), this.isInteracting = !1, this.handleInteractionEnd(e, t), r.allowSelection(i("body")))
                    }, e.prototype.handleInteractionEnd = function(e, t) {
                        this.trigger("interactionEnd", e, t || !1)
                    }, e.prototype.bindHandlers = function() {
                        var e = o.default.get();
                        this.isGeneric ? this.listenTo(i(document), {
                            drag: this.handleMove,
                            dragstop: this.endInteraction
                        }) : this.isTouch ? this.listenTo(e, {
                            touchmove: this.handleTouchMove,
                            touchend: this.endInteraction,
                            scroll: this.handleTouchScroll
                        }) : this.listenTo(e, {
                            mousemove: this.handleMouseMove,
                            mouseup: this.endInteraction
                        }), this.listenTo(e, {
                            selectstart: r.preventDefault,
                            contextmenu: r.preventDefault
                        })
                    }, e.prototype.unbindHandlers = function() {
                        this.stopListeningTo(o.default.get()), this.stopListeningTo(i(document))
                    }, e.prototype.startDrag = function(e, t) {
                        this.startInteraction(e, t), this.isDragging || (this.isDragging = !0, this.handleDragStart(e))
                    }, e.prototype.handleDragStart = function(e) {
                        this.trigger("dragStart", e)
                    }, e.prototype.handleMove = function(e) {
                        var t = r.getEvX(e) - this.originX,
                            n = r.getEvY(e) - this.originY,
                            i = this.minDistance;
                        this.isDistanceSurpassed || t * t + n * n >= i * i && this.handleDistanceSurpassed(e), this.isDragging && this.handleDrag(t, n, e)
                    }, e.prototype.handleDrag = function(e, t, n) {
                        this.trigger("drag", e, t, n), this.updateAutoScroll(n)
                    }, e.prototype.endDrag = function(e) {
                        this.isDragging && (this.isDragging = !1, this.handleDragEnd(e))
                    }, e.prototype.handleDragEnd = function(e) {
                        this.trigger("dragEnd", e)
                    }, e.prototype.startDelay = function(e) {
                        var t = this;
                        this.delay ? this.delayTimeoutId = setTimeout(function() {
                            t.handleDelayEnd(e)
                        }, this.delay) : this.handleDelayEnd(e)
                    }, e.prototype.handleDelayEnd = function(e) {
                        this.isDelayEnded = !0, this.isDistanceSurpassed && this.startDrag(e)
                    }, e.prototype.handleDistanceSurpassed = function(e) {
                        this.isDistanceSurpassed = !0, this.isDelayEnded && this.startDrag(e)
                    }, e.prototype.handleTouchMove = function(e) {
                        this.isDragging && this.shouldCancelTouchScroll && e.preventDefault(), this.handleMove(e)
                    }, e.prototype.handleMouseMove = function(e) {
                        this.handleMove(e)
                    }, e.prototype.handleTouchScroll = function(e) {
                        this.isDragging && !this.scrollAlwaysKills || this.endInteraction(e, !0)
                    }, e.prototype.trigger = function(e) {
                        for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                        this.options[e] && this.options[e].apply(this, t), this["_" + e] && this["_" + e].apply(this, t)
                    }, e.prototype.initAutoScroll = function() {
                        var e = this.scrollEl;
                        this.isAutoScroll = this.options.scroll && e && !e.is(window) && !e.is(document), this.isAutoScroll && this.listenTo(e, "scroll", r.debounce(this.handleDebouncedScroll, 100))
                    }, e.prototype.destroyAutoScroll = function() {
                        this.endAutoScroll(), this.isAutoScroll && this.stopListeningTo(this.scrollEl, "scroll")
                    }, e.prototype.computeScrollBounds = function() {
                        this.isAutoScroll && (this.scrollBounds = r.getOuterRect(this.scrollEl))
                    }, e.prototype.updateAutoScroll = function(e) {
                        var t, n, i, a, o = this.scrollSensitivity,
                            l = this.scrollBounds,
                            s = 0,
                            d = 0;
                        l && (t = (o - (r.getEvY(e) - l.top)) / o, n = (o - (l.bottom - r.getEvY(e))) / o, i = (o - (r.getEvX(e) - l.left)) / o, a = (o - (l.right - r.getEvX(e))) / o, t >= 0 && t <= 1 ? s = t * this.scrollSpeed * -1 : n >= 0 && n <= 1 && (s = n * this.scrollSpeed), i >= 0 && i <= 1 ? d = i * this.scrollSpeed * -1 : a >= 0 && a <= 1 && (d = a * this.scrollSpeed)), this.setScrollVel(s, d)
                    }, e.prototype.setScrollVel = function(e, t) {
                        this.scrollTopVel = e, this.scrollLeftVel = t, this.constrainScrollVel(), !this.scrollTopVel && !this.scrollLeftVel || this.scrollIntervalId || (this.scrollIntervalId = setInterval(r.proxy(this, "scrollIntervalFunc"), this.scrollIntervalMs))
                    }, e.prototype.constrainScrollVel = function() {
                        var e = this.scrollEl;
                        this.scrollTopVel < 0 ? e.scrollTop() <= 0 && (this.scrollTopVel = 0) : this.scrollTopVel > 0 && e.scrollTop() + e[0].clientHeight >= e[0].scrollHeight && (this.scrollTopVel = 0), this.scrollLeftVel < 0 ? e.scrollLeft() <= 0 && (this.scrollLeftVel = 0) : this.scrollLeftVel > 0 && e.scrollLeft() + e[0].clientWidth >= e[0].scrollWidth && (this.scrollLeftVel = 0)
                    }, e.prototype.scrollIntervalFunc = function() {
                        var e = this.scrollEl,
                            t = this.scrollIntervalMs / 1e3;
                        this.scrollTopVel && e.scrollTop(e.scrollTop() + this.scrollTopVel * t), this.scrollLeftVel && e.scrollLeft(e.scrollLeft() + this.scrollLeftVel * t), this.constrainScrollVel(), this.scrollTopVel || this.scrollLeftVel || this.endAutoScroll()
                    }, e.prototype.endAutoScroll = function() {
                        this.scrollIntervalId && (clearInterval(this.scrollIntervalId), this.scrollIntervalId = null, this.handleScrollEnd())
                    }, e.prototype.handleDebouncedScroll = function() {
                        this.scrollIntervalId || this.handleScrollEnd()
                    }, e.prototype.handleScrollEnd = function() {}, e
                }();
            t.default = l, a.default.mixInto(l)
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(4),
                a = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return i.__extends(t, e), t.prototype.updateDayTable = function() {
                        for (var e, t, n, i = this, r = i.view, a = r.calendar, o = a.msToUtcMoment(i.dateProfile.renderUnzonedRange.startMs, !0), l = a.msToUtcMoment(i.dateProfile.renderUnzonedRange.endMs, !0), s = -1, d = [], u = []; o.isBefore(l);) r.isHiddenDay(o) ? d.push(s + .5) : (s++, d.push(s), u.push(o.clone())), o.add(1, "days");
                        if (this.breakOnWeeks) {
                            for (t = u[0].day(), e = 1; e < u.length && u[e].day() !== t; e++);
                            n = Math.ceil(u.length / e)
                        } else n = 1, e = u.length;
                        this.dayDates = u, this.dayIndices = d, this.daysPerRow = e, this.rowCnt = n, this.updateDayTableCols()
                    }, t.prototype.updateDayTableCols = function() {
                        this.colCnt = this.computeColCnt(), this.colHeadFormat = this.opt("columnHeaderFormat") || this.opt("columnFormat") || this.computeColHeadFormat()
                    }, t.prototype.computeColCnt = function() {
                        return this.daysPerRow
                    }, t.prototype.getCellDate = function(e, t) {
                        return this.dayDates[this.getCellDayIndex(e, t)].clone()
                    }, t.prototype.getCellRange = function(e, t) {
                        var n = this.getCellDate(e, t),
                            i = n.clone().add(1, "days");
                        return {
                            start: n,
                            end: i
                        }
                    }, t.prototype.getCellDayIndex = function(e, t) {
                        return e * this.daysPerRow + this.getColDayIndex(t)
                    }, t.prototype.getColDayIndex = function(e) {
                        return this.isRTL ? this.colCnt - 1 - e : e
                    }, t.prototype.getDateDayIndex = function(e) {
                        var t = this.dayIndices,
                            n = e.diff(this.dayDates[0], "days");
                        return n < 0 ? t[0] - 1 : n >= t.length ? t[t.length - 1] + 1 : t[n]
                    }, t.prototype.computeColHeadFormat = function() {
                        return this.rowCnt > 1 || this.colCnt > 10 ? "ddd" : this.colCnt > 1 ? this.opt("dayOfMonthFormat") : "dddd"
                    }, t.prototype.sliceRangeByRow = function(e) {
                        var t, n, i, r, a, o = this.daysPerRow,
                            l = this.view.computeDayRange(e),
                            s = this.getDateDayIndex(l.start),
                            d = this.getDateDayIndex(l.end.clone().subtract(1, "days")),
                            u = [];
                        for (t = 0; t < this.rowCnt; t++) i = (n = t * o) + o - 1, r = Math.max(s, n), a = Math.min(d, i), (r = Math.ceil(r)) <= (a = Math.floor(a)) && u.push({
                            row: t,
                            firstRowDayIndex: r - n,
                            lastRowDayIndex: a - n,
                            isStart: r === s,
                            isEnd: a === d
                        });
                        return u
                    }, t.prototype.sliceRangeByDay = function(e) {
                        var t, n, i, r, a, o, l = this.daysPerRow,
                            s = this.view.computeDayRange(e),
                            d = this.getDateDayIndex(s.start),
                            u = this.getDateDayIndex(s.end.clone().subtract(1, "days")),
                            c = [];
                        for (t = 0; t < this.rowCnt; t++)
                            for (i = (n = t * l) + l - 1, r = n; r <= i; r++) a = Math.max(d, r), o = Math.min(u, r), (a = Math.ceil(a)) <= (o = Math.floor(o)) && c.push({
                                row: t,
                                firstRowDayIndex: a - n,
                                lastRowDayIndex: o - n,
                                isStart: a === d,
                                isEnd: o === u
                            });
                        return c
                    }, t.prototype.renderHeadHtml = function() {
                        var e = this.view.calendar.theme;
                        return '<div class="fc-row ' + e.getClass("headerRow") + '"><table class="' + e.getClass("tableGrid") + '"><thead>' + this.renderHeadTrHtml() + "</thead></table></div>"
                    }, t.prototype.renderHeadIntroHtml = function() {
                        return this.renderIntroHtml()
                    }, t.prototype.renderHeadTrHtml = function() {
                        return "<tr>" + (this.isRTL ? "" : this.renderHeadIntroHtml()) + this.renderHeadDateCellsHtml() + (this.isRTL ? this.renderHeadIntroHtml() : "") + "</tr>"
                    }, t.prototype.renderHeadDateCellsHtml = function() {
                        var e, t, n = [];
                        for (e = 0; e < this.colCnt; e++) t = this.getCellDate(0, e), n.push(this.renderHeadDateCellHtml(t));
                        return n.join("")
                    }, t.prototype.renderHeadDateCellHtml = function(e, t, n) {
                        var i, a = this,
                            o = a.view,
                            l = a.dateProfile.activeUnzonedRange.containsDate(e),
                            s = ["fc-day-header", o.calendar.theme.getClass("widgetHeader")];
                        return i = "function" == typeof a.opt("columnHeaderHtml") ? a.opt("columnHeaderHtml")(e) : "function" == typeof a.opt("columnHeaderText") ? r.htmlEscape(a.opt("columnHeaderText")(e)) : r.htmlEscape(e.format(a.colHeadFormat)), 1 === a.rowCnt ? s = s.concat(a.getDayClasses(e, !0)) : s.push("fc-" + r.dayIDs[e.day()]), '<th class="' + s.join(" ") + '"' + (1 === (l && a.rowCnt) ? ' data-date="' + e.format("YYYY-MM-DD") + '"' : "") + (t > 1 ? ' colspan="' + t + '"' : "") + (n ? " " + n : "") + ">" + (l ? o.buildGotoAnchorHtml({
                            date: e,
                            forceOff: a.rowCnt > 1 || 1 === a.colCnt
                        }, i) : i) + "</th>"
                    }, t.prototype.renderBgTrHtml = function(e) {
                        return "<tr>" + (this.isRTL ? "" : this.renderBgIntroHtml(e)) + this.renderBgCellsHtml(e) + (this.isRTL ? this.renderBgIntroHtml(e) : "") + "</tr>"
                    }, t.prototype.renderBgIntroHtml = function(e) {
                        return this.renderIntroHtml()
                    }, t.prototype.renderBgCellsHtml = function(e) {
                        var t, n, i = [];
                        for (t = 0; t < this.colCnt; t++) n = this.getCellDate(e, t), i.push(this.renderBgCellHtml(n));
                        return i.join("")
                    }, t.prototype.renderBgCellHtml = function(e, t) {
                        var n = this,
                            i = n.view,
                            r = n.dateProfile.activeUnzonedRange.containsDate(e),
                            a = n.getDayClasses(e);
                        return a.unshift("fc-day", i.calendar.theme.getClass("widgetContent")), '<td class="' + a.join(" ") + '"' + (r ? ' data-date="' + e.format("YYYY-MM-DD") + '"' : "") + (t ? " " + t : "") + "></td>"
                    }, t.prototype.renderIntroHtml = function() {}, t.prototype.bookendCells = function(e) {
                        var t = this.renderIntroHtml();
                        t && (this.isRTL ? e.append(t) : e.prepend(t))
                    }, t
                }(n(15).default);
            t.default = a
        }, function(e, t) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = function() {
                function e(e, t) {
                    this.component = e, this.fillRenderer = t
                }
                return e.prototype.render = function(e) {
                    var t = this.component,
                        n = t._getDateProfile().activeUnzonedRange,
                        i = e.buildEventInstanceGroup(t.hasAllDayBusinessHours, n),
                        r = i ? t.eventRangesToEventFootprints(i.sliceRenderRanges(n)) : [];
                    this.renderEventFootprints(r)
                }, e.prototype.renderEventFootprints = function(e) {
                    var t = this.component.eventFootprintsToSegs(e);
                    this.renderSegs(t), this.segs = t
                }, e.prototype.renderSegs = function(e) {
                    this.fillRenderer && this.fillRenderer.renderSegs("businessHours", e, {
                        getClasses: function(e) {
                            return ["fc-nonbusiness", "fc-bgevent"]
                        }
                    })
                }, e.prototype.unrender = function() {
                    this.fillRenderer && this.fillRenderer.unrender("businessHours"), this.segs = null
                }, e.prototype.getSegs = function() {
                    return this.segs || []
                }, e
            }();
            t.default = n
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(3),
                r = n(4),
                a = function() {
                    function e(e) {
                        this.fillSegTag = "div", this.component = e, this.elsByFill = {}
                    }
                    return e.prototype.renderFootprint = function(e, t, n) {
                        this.renderSegs(e, this.component.componentFootprintToSegs(t), n)
                    }, e.prototype.renderSegs = function(e, t, n) {
                        var i;
                        return t = this.buildSegEls(e, t, n), (i = this.attachSegEls(e, t)) && this.reportEls(e, i), t
                    }, e.prototype.unrender = function(e) {
                        var t = this.elsByFill[e];
                        t && (t.remove(), delete this.elsByFill[e])
                    }, e.prototype.buildSegEls = function(e, t, n) {
                        var r, a = this,
                            o = "",
                            l = [];
                        if (t.length) {
                            for (r = 0; r < t.length; r++) o += this.buildSegHtml(e, t[r], n);
                            i(o).each(function(e, r) {
                                var o = t[e],
                                    s = i(r);
                                n.filterEl && (s = n.filterEl(o, s)), s && (s = i(s)).is(a.fillSegTag) && (o.el = s, l.push(o))
                            })
                        }
                        return l
                    }, e.prototype.buildSegHtml = function(e, t, n) {
                        var i = n.getClasses ? n.getClasses(t) : [],
                            a = r.cssToStr(n.getCss ? n.getCss(t) : {});
                        return "<" + this.fillSegTag + (i.length ? ' class="' + i.join(" ") + '"' : "") + (a ? ' style="' + a + '"' : "") + " />"
                    }, e.prototype.attachSegEls = function(e, t) {}, e.prototype.reportEls = function(e, t) {
                        this.elsByFill[e] ? this.elsByFill[e] = this.elsByFill[e].add(t) : this.elsByFill[e] = i(t)
                    }, e
                }();
            t.default = a
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(9),
                r = n(34),
                a = n(6),
                o = function() {
                    function e(e, t) {
                        this.view = e._getView(), this.component = e, this.eventRenderer = t
                    }
                    return e.prototype.renderComponentFootprint = function(e) {
                        this.renderEventFootprints([this.fabricateEventFootprint(e)])
                    }, e.prototype.renderEventDraggingFootprints = function(e, t, n) {
                        this.renderEventFootprints(e, t, "fc-dragging", n ? null : this.view.opt("dragOpacity"))
                    }, e.prototype.renderEventResizingFootprints = function(e, t, n) {
                        this.renderEventFootprints(e, t, "fc-resizing")
                    }, e.prototype.renderEventFootprints = function(e, t, n, i) {
                        var r, a = this.component.eventFootprintsToSegs(e),
                            o = "fc-helper " + (n || "");
                        for (a = this.eventRenderer.renderFgSegEls(a), r = 0; r < a.length; r++) a[r].el.addClass(o);
                        if (null != i)
                            for (r = 0; r < a.length; r++) a[r].el.css("opacity", i);
                        this.helperEls = this.renderSegs(a, t)
                    }, e.prototype.renderSegs = function(e, t) {}, e.prototype.unrender = function() {
                        this.helperEls && (this.helperEls.remove(), this.helperEls = null)
                    }, e.prototype.fabricateEventFootprint = function(e) {
                        var t, n = this.view.calendar,
                            o = n.footprintToDateProfile(e),
                            l = new i.default(new a.default(n));
                        return l.dateProfile = o, t = l.buildInstance(), new r.default(e, l, t)
                    }, e
                }();
            t.default = o
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(23),
                a = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return i.__extends(t, e), t.prototype.bindToEl = function(e) {
                        var t = this.component;
                        t.bindSegHandlerToEl(e, "click", this.handleClick.bind(this)), t.bindSegHandlerToEl(e, "mouseenter", this.handleMouseover.bind(this)), t.bindSegHandlerToEl(e, "mouseleave", this.handleMouseout.bind(this))
                    }, t.prototype.handleClick = function(e, t) {
                        !1 === this.component.publiclyTrigger("eventClick", {
                            context: e.el[0],
                            args: [e.footprint.getEventLegacy(), t, this.view]
                        }) && t.preventDefault()
                    }, t.prototype.handleMouseover = function(e, t) {
                        r.default.get().shouldIgnoreMouse() || this.mousedOverSeg || (this.mousedOverSeg = e, this.view.isEventDefResizable(e.footprint.eventDef) && e.el.addClass("fc-allow-mouse-resize"), this.component.publiclyTrigger("eventMouseover", {
                            context: e.el[0],
                            args: [e.footprint.getEventLegacy(), t, this.view]
                        }))
                    }, t.prototype.handleMouseout = function(e, t) {
                        this.mousedOverSeg && (this.mousedOverSeg = null, this.view.isEventDefResizable(e.footprint.eventDef) && e.el.removeClass("fc-allow-mouse-resize"), this.component.publiclyTrigger("eventMouseout", {
                            context: e.el[0],
                            args: [e.footprint.getEventLegacy(), t || {}, this.view]
                        }))
                    }, t.prototype.end = function() {
                        this.mousedOverSeg && this.handleMouseout(this.mousedOverSeg)
                    }, t
                }(n(14).default);
            t.default = a
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(15),
                a = n(237),
                o = n(236),
                l = n(64),
                s = n(235),
                d = n(234),
                u = n(233),
                c = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return i.__extends(t, e), t
                }(r.default);
            t.default = c, c.prototype.dateClickingClass = a.default, c.prototype.dateSelectingClass = o.default, c.prototype.eventPointingClass = l.default, c.prototype.eventDraggingClass = s.default, c.prototype.eventResizingClass = d.default, c.prototype.externalDroppingClass = u.default
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(3),
                a = n(4),
                o = n(58),
                l = n(227),
                s = n(5),
                d = n(12),
                u = n(34),
                c = n(61),
                h = n(65),
                p = n(42),
                f = n(60),
                m = n(243),
                g = n(244),
                _ = n(245),
                y = function(e) {
                    function t(t) {
                        var n = e.call(this, t) || this;
                        return n.cellWeekNumbersVisible = !1, n.bottomCoordPadding = 0, n.isRigid = !1, n.hasAllDayBusinessHours = !0, n
                    }
                    return i.__extends(t, e), t.prototype.componentFootprintToSegs = function(e) {
                        var t, n, i = this.sliceRangeByRow(e.unzonedRange);
                        for (t = 0; t < i.length; t++) n = i[t], this.isRTL ? (n.leftCol = this.daysPerRow - 1 - n.lastRowDayIndex, n.rightCol = this.daysPerRow - 1 - n.firstRowDayIndex) : (n.leftCol = n.firstRowDayIndex, n.rightCol = n.lastRowDayIndex);
                        return i
                    }, t.prototype.renderDates = function(e) {
                        this.dateProfile = e, this.updateDayTable(), this.renderGrid()
                    }, t.prototype.unrenderDates = function() {
                        this.removeSegPopover()
                    }, t.prototype.renderGrid = function() {
                        var e, t, n = this.view,
                            i = this.rowCnt,
                            r = this.colCnt,
                            a = "";
                        for (this.headContainerEl && this.headContainerEl.html(this.renderHeadHtml()), e = 0; e < i; e++) a += this.renderDayRowHtml(e, this.isRigid);
                        for (this.el.html(a), this.rowEls = this.el.find(".fc-row"), this.cellEls = this.el.find(".fc-day, .fc-disabled-day"), this.rowCoordCache = new o.default({
                                els: this.rowEls,
                                isVertical: !0
                            }), this.colCoordCache = new o.default({
                                els: this.cellEls.slice(0, this.colCnt),
                                isHorizontal: !0
                            }), e = 0; e < i; e++)
                            for (t = 0; t < r; t++) this.publiclyTrigger("dayRender", {
                                context: n,
                                args: [this.getCellDate(e, t), this.getCellEl(e, t), n]
                            })
                    }, t.prototype.renderDayRowHtml = function(e, t) {
                        var n = this.view.calendar.theme,
                            i = ["fc-row", "fc-week", n.getClass("dayRow")];
                        return t && i.push("fc-rigid"), '<div class="' + i.join(" ") + '"><div class="fc-bg"><table class="' + n.getClass("tableGrid") + '">' + this.renderBgTrHtml(e) + '</table></div><div class="fc-content-skeleton"><table>' + (this.getIsNumbersVisible() ? "<thead>" + this.renderNumberTrHtml(e) + "</thead>" : "") + "</table></div></div>"
                    }, t.prototype.getIsNumbersVisible = function() {
                        return this.getIsDayNumbersVisible() || this.cellWeekNumbersVisible
                    }, t.prototype.getIsDayNumbersVisible = function() {
                        return this.rowCnt > 1
                    }, t.prototype.renderNumberTrHtml = function(e) {
                        return "<tr>" + (this.isRTL ? "" : this.renderNumberIntroHtml(e)) + this.renderNumberCellsHtml(e) + (this.isRTL ? this.renderNumberIntroHtml(e) : "") + "</tr>"
                    }, t.prototype.renderNumberIntroHtml = function(e) {
                        return this.renderIntroHtml()
                    }, t.prototype.renderNumberCellsHtml = function(e) {
                        var t, n, i = [];
                        for (t = 0; t < this.colCnt; t++) n = this.getCellDate(e, t), i.push(this.renderNumberCellHtml(n));
                        return i.join("")
                    }, t.prototype.renderNumberCellHtml = function(e) {
                        var t, n, i = this.view,
                            r = "",
                            a = this.dateProfile.activeUnzonedRange.containsDate(e),
                            o = this.getIsDayNumbersVisible() && a;
                        return o || this.cellWeekNumbersVisible ? ((t = this.getDayClasses(e)).unshift("fc-day-top"), this.cellWeekNumbersVisible && (n = "ISO" === e._locale._fullCalendar_weekCalc ? 1 : e._locale.firstDayOfWeek()), r += '<td class="' + t.join(" ") + '"' + (a ? ' data-date="' + e.format() + '"' : "") + ">", this.cellWeekNumbersVisible && e.day() === n && (r += i.buildGotoAnchorHtml({
                            date: e,
                            type: "week"
                        }, {
                            class: "fc-week-number"
                        }, e.format("w"))), o && (r += i.buildGotoAnchorHtml(e, {
                            class: "fc-day-number"
                        }, e.format("D"))), r += "</td>") : "<td/>"
                    }, t.prototype.prepareHits = function() {
                        this.colCoordCache.build(), this.rowCoordCache.build(), this.rowCoordCache.bottoms[this.rowCnt - 1] += this.bottomCoordPadding
                    }, t.prototype.releaseHits = function() {
                        this.colCoordCache.clear(), this.rowCoordCache.clear()
                    }, t.prototype.queryHit = function(e, t) {
                        if (this.colCoordCache.isLeftInBounds(e) && this.rowCoordCache.isTopInBounds(t)) {
                            var n = this.colCoordCache.getHorizontalIndex(e),
                                i = this.rowCoordCache.getVerticalIndex(t);
                            if (null != i && null != n) return this.getCellHit(i, n)
                        }
                    }, t.prototype.getHitFootprint = function(e) {
                        var t = this.getCellRange(e.row, e.col);
                        return new d.default(new s.default(t.start, t.end), !0)
                    }, t.prototype.getHitEl = function(e) {
                        return this.getCellEl(e.row, e.col)
                    }, t.prototype.getCellHit = function(e, t) {
                        return {
                            row: e,
                            col: t,
                            component: this,
                            left: this.colCoordCache.getLeftOffset(t),
                            right: this.colCoordCache.getRightOffset(t),
                            top: this.rowCoordCache.getTopOffset(e),
                            bottom: this.rowCoordCache.getBottomOffset(e)
                        }
                    }, t.prototype.getCellEl = function(e, t) {
                        return this.cellEls.eq(e * this.colCnt + t)
                    }, t.prototype.executeEventUnrender = function() {
                        this.removeSegPopover(), e.prototype.executeEventUnrender.call(this)
                    }, t.prototype.getOwnEventSegs = function() {
                        return e.prototype.getOwnEventSegs.call(this).concat(this.popoverSegs || [])
                    }, t.prototype.renderDrag = function(e, t, n) {
                        var i;
                        for (i = 0; i < e.length; i++) this.renderHighlight(e[i].componentFootprint);
                        if (e.length && t && t.component !== this) return this.helperRenderer.renderEventDraggingFootprints(e, t, n), !0
                    }, t.prototype.unrenderDrag = function() {
                        this.unrenderHighlight(), this.helperRenderer.unrender()
                    }, t.prototype.renderEventResize = function(e, t, n) {
                        var i;
                        for (i = 0; i < e.length; i++) this.renderHighlight(e[i].componentFootprint);
                        this.helperRenderer.renderEventResizingFootprints(e, t, n)
                    }, t.prototype.unrenderEventResize = function() {
                        this.unrenderHighlight(), this.helperRenderer.unrender()
                    }, t.prototype.removeSegPopover = function() {
                        this.segPopover && this.segPopover.hide()
                    }, t.prototype.limitRows = function(e) {
                        var t, n, i = this.eventRenderer.rowStructs || [];
                        for (t = 0; t < i.length; t++) this.unlimitRow(t), !1 !== (n = !!e && ("number" == typeof e ? e : this.computeRowLevelLimit(t))) && this.limitRow(t, n)
                    }, t.prototype.computeRowLevelLimit = function(e) {
                        var t, n, i, a = this.rowEls.eq(e).height(),
                            o = this.eventRenderer.rowStructs[e].tbodyEl.children();

                        function l(e, t) {
                            i = Math.max(i, r(t).outerHeight())
                        }
                        for (t = 0; t < o.length; t++)
                            if (n = o.eq(t).removeClass("fc-limited"), i = 0, n.find("> td > :first-child").each(l), n.position().top + i > a) return t;
                        return !1
                    }, t.prototype.limitRow = function(e, t) {
                        var n, i, a, o, l, s, d, u, c, h, p, f, m, g, _, y = this,
                            v = this.eventRenderer.rowStructs[e],
                            M = [],
                            b = 0,
                            w = function(n) {
                                for (; b < n;)(s = y.getCellSegs(e, b, t)).length && (c = i[t - 1][b], _ = y.renderMoreLink(e, b, s), g = r("<div/>").append(_), c.append(g), M.push(g[0])), b++
                            };
                        if (t && t < v.segLevels.length) {
                            for (n = v.segLevels[t - 1], i = v.cellMatrix, a = v.tbodyEl.children().slice(t).addClass("fc-limited").get(), o = 0; o < n.length; o++) {
                                for (w((l = n[o]).leftCol), u = [], d = 0; b <= l.rightCol;) s = this.getCellSegs(e, b, t), u.push(s), d += s.length, b++;
                                if (d) {
                                    for (h = (c = i[t - 1][l.leftCol]).attr("rowspan") || 1, p = [], f = 0; f < u.length; f++) m = r('<td class="fc-more-cell"/>').attr("rowspan", h), s = u[f], _ = this.renderMoreLink(e, l.leftCol + f, [l].concat(s)), g = r("<div/>").append(_), m.append(g), p.push(m[0]), M.push(m[0]);
                                    c.addClass("fc-limited").after(r(p)), a.push(c[0])
                                }
                            }
                            w(this.colCnt), v.moreEls = r(M), v.limitedEls = r(a)
                        }
                    }, t.prototype.unlimitRow = function(e) {
                        var t = this.eventRenderer.rowStructs[e];
                        t.moreEls && (t.moreEls.remove(), t.moreEls = null), t.limitedEls && (t.limitedEls.removeClass("fc-limited"), t.limitedEls = null)
                    }, t.prototype.renderMoreLink = function(e, t, n) {
                        var i = this,
                            a = this.view;
                        return r('<a class="fc-more"/>').text(this.getMoreLinkText(n.length)).on("click", function(o) {
                            var l = i.opt("eventLimitClick"),
                                s = i.getCellDate(e, t),
                                d = r(o.currentTarget),
                                u = i.getCellEl(e, t),
                                c = i.getCellSegs(e, t),
                                h = i.resliceDaySegs(c, s),
                                p = i.resliceDaySegs(n, s);
                            "function" == typeof l && (l = i.publiclyTrigger("eventLimitClick", {
                                context: a,
                                args: [{
                                    date: s.clone(),
                                    dayEl: u,
                                    moreEl: d,
                                    segs: h,
                                    hiddenSegs: p
                                }, o, a]
                            })), "popover" === l ? i.showSegPopover(e, t, d, h) : "string" == typeof l && a.calendar.zoomTo(s, l)
                        })
                    }, t.prototype.showSegPopover = function(e, t, n, i) {
                        var r, a, o = this,
                            s = this.view,
                            d = n.parent();
                        r = 1 === this.rowCnt ? s.el : this.rowEls.eq(e), a = {
                            className: "fc-more-popover " + s.calendar.theme.getClass("popover"),
                            content: this.renderSegPopoverContent(e, t, i),
                            parentEl: s.el,
                            top: r.offset().top,
                            autoHide: !0,
                            viewportConstrain: this.opt("popoverViewportConstrain"),
                            hide: function() {
                                o.popoverSegs && o.triggerBeforeEventSegsDestroyed(o.popoverSegs), o.segPopover.removeElement(), o.segPopover = null, o.popoverSegs = null
                            }
                        }, this.isRTL ? a.right = d.offset().left + d.outerWidth() + 1 : a.left = d.offset().left - 1, this.segPopover = new l.default(a), this.segPopover.show(), this.bindAllSegHandlersToEl(this.segPopover.el), this.triggerAfterEventSegsRendered(i)
                    }, t.prototype.renderSegPopoverContent = function(e, t, n) {
                        var i, o = this.view.calendar.theme,
                            l = this.getCellDate(e, t).format(this.opt("dayPopoverFormat")),
                            s = r('<div class="fc-header ' + o.getClass("popoverHeader") + '"><span class="fc-close ' + o.getIconClass("close") + '"></span><span class="fc-title">' + a.htmlEscape(l) + '</span><div class="fc-clear"/></div><div class="fc-body ' + o.getClass("popoverContent") + '"><div class="fc-event-container"></div></div>'),
                            d = s.find(".fc-event-container");
                        for (n = this.eventRenderer.renderFgSegEls(n, !0), this.popoverSegs = n, i = 0; i < n.length; i++) this.hitsNeeded(), n[i].hit = this.getCellHit(e, t), this.hitsNotNeeded(), d.append(n[i].el);
                        return s
                    }, t.prototype.resliceDaySegs = function(e, t) {
                        var n, i, a, o = t.clone(),
                            l = o.clone().add(1, "days"),
                            c = new s.default(o, l),
                            h = [];
                        for (n = 0; n < e.length; n++)(a = (i = e[n]).footprint.componentFootprint.unzonedRange.intersect(c)) && h.push(r.extend({}, i, {
                            footprint: new u.default(new d.default(a, i.footprint.componentFootprint.isAllDay), i.footprint.eventDef, i.footprint.eventInstance),
                            isStart: i.isStart && a.isStart,
                            isEnd: i.isEnd && a.isEnd
                        }));
                        return this.eventRenderer.sortEventSegs(h), h
                    }, t.prototype.getMoreLinkText = function(e) {
                        var t = this.opt("eventLimitText");
                        return "function" == typeof t ? t(e) : "+" + e + " " + t
                    }, t.prototype.getCellSegs = function(e, t, n) {
                        for (var i, r = this.eventRenderer.rowStructs[e].segMatrix, a = n || 0, o = []; a < r.length;)(i = r[a][t]) && o.push(i), a++;
                        return o
                    }, t
                }(p.default);
            t.default = y, y.prototype.eventRendererClass = m.default, y.prototype.businessHourRendererClass = c.default, y.prototype.helperRendererClass = g.default, y.prototype.fillRendererClass = _.default, h.default.mixInto(y), f.default.mixInto(y)
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(3),
                a = n(4),
                o = n(41),
                l = n(43),
                s = n(68),
                d = n(66),
                u = function(e) {
                    function t(t, n) {
                        var i = e.call(this, t, n) || this;
                        return i.dayGrid = i.instantiateDayGrid(), i.dayGrid.isRigid = i.hasRigidRows(), i.opt("weekNumbers") && (i.opt("weekNumbersWithinDays") ? (i.dayGrid.cellWeekNumbersVisible = !0, i.dayGrid.colWeekNumbersVisible = !1) : (i.dayGrid.cellWeekNumbersVisible = !1, i.dayGrid.colWeekNumbersVisible = !0)), i.addChild(i.dayGrid), i.scroller = new o.default({
                            overflowX: "hidden",
                            overflowY: "auto"
                        }), i
                    }
                    return i.__extends(t, e), t.prototype.instantiateDayGrid = function() {
                        return new(function(e) {
                            function t() {
                                var t = null !== e && e.apply(this, arguments) || this;
                                return t.colWeekNumbersVisible = !1, t
                            }
                            return i.__extends(t, e), t.prototype.renderHeadIntroHtml = function() {
                                var e = this.view;
                                return this.colWeekNumbersVisible ? '<th class="fc-week-number ' + e.calendar.theme.getClass("widgetHeader") + '" ' + e.weekNumberStyleAttr() + "><span>" + a.htmlEscape(this.opt("weekNumberTitle")) + "</span></th>" : ""
                            }, t.prototype.renderNumberIntroHtml = function(e) {
                                var t = this.view,
                                    n = this.getCellDate(e, 0);
                                return this.colWeekNumbersVisible ? '<td class="fc-week-number" ' + t.weekNumberStyleAttr() + ">" + t.buildGotoAnchorHtml({
                                    date: n,
                                    type: "week",
                                    forceOff: 1 === this.colCnt
                                }, n.format("w")) + "</td>" : ""
                            }, t.prototype.renderBgIntroHtml = function() {
                                var e = this.view;
                                return this.colWeekNumbersVisible ? '<td class="fc-week-number ' + e.calendar.theme.getClass("widgetContent") + '" ' + e.weekNumberStyleAttr() + "></td>" : ""
                            }, t.prototype.renderIntroHtml = function() {
                                var e = this.view;
                                return this.colWeekNumbersVisible ? '<td class="fc-week-number" ' + e.weekNumberStyleAttr() + "></td>" : ""
                            }, t.prototype.getIsNumbersVisible = function() {
                                return d.default.prototype.getIsNumbersVisible.apply(this, arguments) || this.colWeekNumbersVisible
                            }, t
                        }(this.dayGridClass))(this)
                    }, t.prototype.executeDateRender = function(t) {
                        this.dayGrid.breakOnWeeks = /year|month|week/.test(t.currentRangeUnit), e.prototype.executeDateRender.call(this, t)
                    }, t.prototype.renderSkeleton = function() {
                        var e, t;
                        this.el.addClass("fc-basic-view").html(this.renderSkeletonHtml()), this.scroller.render(), e = this.scroller.el.addClass("fc-day-grid-container"), t = r('<div class="fc-day-grid" />').appendTo(e), this.el.find(".fc-body > tr > td").append(e), this.dayGrid.headContainerEl = this.el.find(".fc-head-container"), this.dayGrid.setElement(t)
                    }, t.prototype.unrenderSkeleton = function() {
                        this.dayGrid.removeElement(), this.scroller.destroy()
                    }, t.prototype.renderSkeletonHtml = function() {
                        var e = this.calendar.theme;
                        return '<table class="' + e.getClass("tableGrid") + '">' + (this.opt("columnHeader") ? '<thead class="fc-head"><tr><td class="fc-head-container ' + e.getClass("widgetHeader") + '">&nbsp;</td></tr></thead>' : "") + '<tbody class="fc-body"><tr><td class="' + e.getClass("widgetContent") + '"></td></tr></tbody></table>'
                    }, t.prototype.weekNumberStyleAttr = function() {
                        return null != this.weekNumberWidth ? 'style="width:' + this.weekNumberWidth + 'px"' : ""
                    }, t.prototype.hasRigidRows = function() {
                        var e = this.opt("eventLimit");
                        return e && "number" != typeof e
                    }, t.prototype.updateSize = function(t, n, i) {
                        var r, o, l = this.opt("eventLimit"),
                            s = this.dayGrid.headContainerEl.find(".fc-row");
                        this.dayGrid.rowEls ? (e.prototype.updateSize.call(this, t, n, i), this.dayGrid.colWeekNumbersVisible && (this.weekNumberWidth = a.matchCellWidths(this.el.find(".fc-week-number"))), this.scroller.clear(), a.uncompensateScroll(s), this.dayGrid.removeSegPopover(), l && "number" == typeof l && this.dayGrid.limitRows(l), r = this.computeScrollerHeight(t), this.setGridHeight(r, n), l && "number" != typeof l && this.dayGrid.limitRows(l), n || (this.scroller.setHeight(r), ((o = this.scroller.getScrollbarWidths()).left || o.right) && (a.compensateScroll(s, o), r = this.computeScrollerHeight(t), this.scroller.setHeight(r)), this.scroller.lockOverflow(o))) : n || (r = this.computeScrollerHeight(t), this.scroller.setHeight(r))
                    }, t.prototype.computeScrollerHeight = function(e) {
                        return e - a.subtractInnerElHeight(this.el, this.scroller.el)
                    }, t.prototype.setGridHeight = function(e, t) {
                        t ? a.undistributeHeight(this.dayGrid.rowEls) : a.distributeHeight(this.dayGrid.rowEls, e, !0)
                    }, t.prototype.computeInitialDateScroll = function() {
                        return {
                            top: 0
                        }
                    }, t.prototype.queryDateScroll = function() {
                        return {
                            top: this.scroller.getScrollTop()
                        }
                    }, t.prototype.applyDateScroll = function(e) {
                        void 0 !== e.top && this.scroller.setScrollTop(e.top)
                    }, t
                }(l.default);
            t.default = u, u.prototype.dateProfileGeneratorClass = s.default, u.prototype.dayGridClass = d.default
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(5),
                a = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return i.__extends(t, e), t.prototype.buildRenderRange = function(t, n, i) {
                        var a = e.prototype.buildRenderRange.call(this, t, n, i),
                            o = this.msToUtcMoment(a.startMs, i),
                            l = this.msToUtcMoment(a.endMs, i);
                        return /^(year|month)$/.test(n) && (o.startOf("week"), l.weekday() && l.add(1, "week").startOf("week")), new r.default(o, l)
                    }, t
                }(n(55).default);
            t.default = a
        }, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(5),
                r = n(12),
                a = n(36),
                o = n(6),
                l = n(19),
                s = function() {
                    function e(e, t) {
                        this.eventManager = e, this._calendar = t
                    }
                    return e.prototype.opt = function(e) {
                        return this._calendar.opt(e)
                    }, e.prototype.isEventInstanceGroupAllowed = function(e) {
                        var t, n = e.getEventDef(),
                            i = this.eventRangesToEventFootprints(e.getAllEventRanges()),
                            r = this.getPeerEventInstances(n).map(l.eventInstanceToEventRange),
                            a = this.eventRangesToEventFootprints(r),
                            o = n.getConstraint(),
                            s = n.getOverlap(),
                            d = this.opt("eventAllow");
                        for (t = 0; t < i.length; t++)
                            if (!this.isFootprintAllowed(i[t].componentFootprint, a, o, s, i[t].eventInstance)) return !1;
                        if (d)
                            for (t = 0; t < i.length; t++)
                                if (!1 === d(i[t].componentFootprint.toLegacy(this._calendar), i[t].getEventLegacy())) return !1;
                        return !0
                    }, e.prototype.getPeerEventInstances = function(e) {
                        return this.eventManager.getEventInstancesWithoutId(e.id)
                    }, e.prototype.isSelectionFootprintAllowed = function(e) {
                        var t, n = this.eventManager.getEventInstances().map(l.eventInstanceToEventRange),
                            i = this.eventRangesToEventFootprints(n);
                        return !!this.isFootprintAllowed(e, i, this.opt("selectConstraint"), this.opt("selectOverlap")) && (!(t = this.opt("selectAllow")) || !1 !== t(e.toLegacy(this._calendar)))
                    }, e.prototype.isFootprintAllowed = function(e, t, n, i, r) {
                        var a, o;
                        if (null != n && (a = this.constraintValToFootprints(n, e.isAllDay), !this.isFootprintWithinConstraints(e, a))) return !1;
                        if (o = this.collectOverlapEventFootprints(t, e), !1 === i) {
                            if (o.length) return !1
                        } else if ("function" == typeof i && ! function(e, t, n) {
                                var i;
                                for (i = 0; i < e.length; i++)
                                    if (!t(e[i].eventInstance.toLegacy(), n ? n.toLegacy() : null)) return !1;
                                return !0
                            }(o, i, r)) return !1;
                        return !(r && ! function(e, t) {
                            var n, i, r, a, o = t.toLegacy();
                            for (n = 0; n < e.length; n++) {
                                if (i = e[n].eventInstance, r = i.def, !1 === (a = r.getOverlap())) return !1;
                                if ("function" == typeof a && !a(i.toLegacy(), o)) return !1
                            }
                            return !0
                        }(o, r))
                    }, e.prototype.isFootprintWithinConstraints = function(e, t) {
                        var n;
                        for (n = 0; n < t.length; n++)
                            if (this.footprintContainsFootprint(t[n], e)) return !0;
                        return !1
                    }, e.prototype.constraintValToFootprints = function(e, t) {
                        var n;
                        return "businessHours" === e ? this.buildCurrentBusinessFootprints(t) : "object" == typeof e ? (n = this.parseEventDefToInstances(e)) ? this.eventInstancesToFootprints(n) : this.parseFootprints(e) : null != e ? (n = this.eventManager.getEventInstancesWithId(e), this.eventInstancesToFootprints(n)) : void 0
                    }, e.prototype.buildCurrentBusinessFootprints = function(e) {
                        var t = this._calendar.view,
                            n = t.get("businessHourGenerator"),
                            i = t.dateProfile.activeUnzonedRange,
                            r = n.buildEventInstanceGroup(e, i);
                        return r ? this.eventInstancesToFootprints(r.eventInstances) : []
                    }, e.prototype.eventInstancesToFootprints = function(e) {
                        var t = e.map(l.eventInstanceToEventRange);
                        return this.eventRangesToEventFootprints(t).map(l.eventFootprintToComponentFootprint)
                    }, e.prototype.collectOverlapEventFootprints = function(e, t) {
                        var n, i = [];
                        for (n = 0; n < e.length; n++) this.footprintsIntersect(t, e[n].componentFootprint) && i.push(e[n]);
                        return i
                    }, e.prototype.parseEventDefToInstances = function(e) {
                        var t = this.eventManager,
                            n = a.default.parse(e, new o.default(this._calendar));
                        return !!n && n.buildInstances(t.currentPeriod.unzonedRange)
                    }, e.prototype.eventRangesToEventFootprints = function(e) {
                        var t, n = [];
                        for (t = 0; t < e.length; t++) n.push.apply(n, this.eventRangeToEventFootprints(e[t]));
                        return n
                    }, e.prototype.eventRangeToEventFootprints = function(e) {
                        return [l.eventRangeToEventFootprint(e)]
                    }, e.prototype.parseFootprints = function(e) {
                        var t, n;
                        return e.start && ((t = this._calendar.moment(e.start)).isValid() || (t = null)), e.end && ((n = this._calendar.moment(e.end)).isValid() || (n = null)), [new r.default(new i.default(t, n), t && !t.hasTime() || n && !n.hasTime())]
                    }, e.prototype.footprintContainsFootprint = function(e, t) {
                        return e.unzonedRange.containsRange(t.unzonedRange)
                    }, e.prototype.footprintsIntersect = function(e, t) {
                        return e.unzonedRange.intersectsWith(t.unzonedRange)
                    }, e
                }();
            t.default = s
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(3),
                r = n(19),
                a = n(20),
                o = n(54),
                l = n(6),
                s = {
                    start: "09:00",
                    end: "17:00",
                    dow: [1, 2, 3, 4, 5],
                    rendering: "inverse-background"
                },
                d = function() {
                    function e(e, t) {
                        this.rawComplexDef = e, this.calendar = t
                    }
                    return e.prototype.buildEventInstanceGroup = function(e, t) {
                        var n, i = this.buildEventDefs(e);
                        if (i.length) return (n = new a.default(r.eventDefsToEventInstances(i, t))).explicitEventDef = i[0], n
                    }, e.prototype.buildEventDefs = function(e) {
                        var t, n = this.rawComplexDef,
                            r = [],
                            a = !1,
                            o = [];
                        for (!0 === n ? r = [{}] : i.isPlainObject(n) ? r = [n] : i.isArray(n) && (r = n, a = !0), t = 0; t < r.length; t++) a && !r[t].dow || o.push(this.buildEventDef(e, r[t]));
                        return o
                    }, e.prototype.buildEventDef = function(e, t) {
                        var n = i.extend({}, s, t);
                        return e && (n.start = null, n.end = null), o.default.parse(n, new l.default(this.calendar))
                    }, e
                }();
            t.default = d
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(3),
                r = n(4),
                a = n(21),
                o = n(13),
                l = n(5),
                s = n(20),
                d = function() {
                    function e(e, t, n) {
                        this.pendingCnt = 0, this.freezeDepth = 0, this.stuntedReleaseCnt = 0, this.releaseCnt = 0, this.start = e, this.end = t, this.timezone = n, this.unzonedRange = new l.default(e.clone().stripZone(), t.clone().stripZone()), this.requestsByUid = {}, this.eventDefsByUid = {}, this.eventDefsById = {}, this.eventInstanceGroupsById = {}
                    }
                    return e.prototype.isWithinRange = function(e, t) {
                        return !e.isBefore(this.start) && !t.isAfter(this.end)
                    }, e.prototype.requestSources = function(e) {
                        this.freeze();
                        for (var t = 0; t < e.length; t++) this.requestSource(e[t]);
                        this.thaw()
                    }, e.prototype.requestSource = function(e) {
                        var t = this,
                            n = {
                                source: e,
                                status: "pending",
                                eventDefs: null
                            };
                        this.requestsByUid[e.uid] = n, this.pendingCnt += 1, e.fetch(this.start, this.end, this.timezone).then(function(e) {
                            "cancelled" !== n.status && (n.status = "completed", n.eventDefs = e, t.addEventDefs(e), t.pendingCnt--, t.tryRelease())
                        }, function() {
                            "cancelled" !== n.status && (n.status = "failed", t.pendingCnt--, t.tryRelease())
                        })
                    }, e.prototype.purgeSource = function(e) {
                        var t = this.requestsByUid[e.uid];
                        t && (delete this.requestsByUid[e.uid], "pending" === t.status ? (t.status = "cancelled", this.pendingCnt--, this.tryRelease()) : "completed" === t.status && t.eventDefs.forEach(this.removeEventDef.bind(this)))
                    }, e.prototype.purgeAllSources = function() {
                        var e, t, n = this.requestsByUid,
                            i = 0;
                        for (e in n) "pending" === (t = n[e]).status ? t.status = "cancelled" : "completed" === t.status && i++;
                        this.requestsByUid = {}, this.pendingCnt = 0, i && this.removeAllEventDefs()
                    }, e.prototype.getEventDefByUid = function(e) {
                        return this.eventDefsByUid[e]
                    }, e.prototype.getEventDefsById = function(e) {
                        var t = this.eventDefsById[e];
                        return t ? t.slice() : []
                    }, e.prototype.addEventDefs = function(e) {
                        for (var t = 0; t < e.length; t++) this.addEventDef(e[t])
                    }, e.prototype.addEventDef = function(e) {
                        var t, n = this.eventDefsById,
                            i = e.id,
                            r = n[i] || (n[i] = []),
                            a = e.buildInstances(this.unzonedRange);
                        for (r.push(e), this.eventDefsByUid[e.uid] = e, t = 0; t < a.length; t++) this.addEventInstance(a[t], i)
                    }, e.prototype.removeEventDefsById = function(e) {
                        var t = this;
                        this.getEventDefsById(e).forEach(function(e) {
                            t.removeEventDef(e)
                        })
                    }, e.prototype.removeAllEventDefs = function() {
                        var e = i.isEmptyObject(this.eventDefsByUid);
                        this.eventDefsByUid = {}, this.eventDefsById = {}, this.eventInstanceGroupsById = {}, e || this.tryRelease()
                    }, e.prototype.removeEventDef = function(e) {
                        var t = this.eventDefsById,
                            n = t[e.id];
                        delete this.eventDefsByUid[e.uid], n && (r.removeExact(n, e), n.length || delete t[e.id], this.removeEventInstancesForDef(e))
                    }, e.prototype.getEventInstances = function() {
                        var e, t = this.eventInstanceGroupsById,
                            n = [];
                        for (e in t) n.push.apply(n, t[e].eventInstances);
                        return n
                    }, e.prototype.getEventInstancesWithId = function(e) {
                        var t = this.eventInstanceGroupsById[e];
                        return t ? t.eventInstances.slice() : []
                    }, e.prototype.getEventInstancesWithoutId = function(e) {
                        var t, n = this.eventInstanceGroupsById,
                            i = [];
                        for (t in n) t !== e && i.push.apply(i, n[t].eventInstances);
                        return i
                    }, e.prototype.addEventInstance = function(e, t) {
                        var n = this.eventInstanceGroupsById;
                        (n[t] || (n[t] = new s.default)).eventInstances.push(e), this.tryRelease()
                    }, e.prototype.removeEventInstancesForDef = function(e) {
                        var t, n = this.eventInstanceGroupsById,
                            i = n[e.id];
                        i && (t = r.removeMatching(i.eventInstances, function(t) {
                            return t.def === e
                        }), i.eventInstances.length || delete n[e.id], t && this.tryRelease())
                    }, e.prototype.tryRelease = function() {
                        this.pendingCnt || (this.freezeDepth ? this.stuntedReleaseCnt++ : this.release())
                    }, e.prototype.release = function() {
                        this.releaseCnt++, this.trigger("release", this.eventInstanceGroupsById)
                    }, e.prototype.whenReleased = function() {
                        var e = this;
                        return this.releaseCnt ? a.default.resolve(this.eventInstanceGroupsById) : a.default.construct(function(t) {
                            e.one("release", t)
                        })
                    }, e.prototype.freeze = function() {
                        this.freezeDepth++ || (this.stuntedReleaseCnt = 0)
                    }, e.prototype.thaw = function() {
                        --this.freezeDepth || !this.stuntedReleaseCnt || this.pendingCnt || this.release()
                    }, e
                }();
            t.default = d, o.default.mixInto(d)
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(3),
                r = n(4),
                a = n(219),
                o = n(56),
                l = n(6),
                s = n(38),
                d = n(9),
                u = n(20),
                c = n(13),
                h = n(7),
                p = function() {
                    function e(e) {
                        this.calendar = e, this.stickySource = new o.default(e), this.otherSources = []
                    }
                    return e.prototype.requestEvents = function(e, t, n, i) {
                        return !i && this.currentPeriod && this.currentPeriod.isWithinRange(e, t) && n === this.currentPeriod.timezone || this.setPeriod(new a.default(e, t, n)), this.currentPeriod.whenReleased()
                    }, e.prototype.addSource = function(e) {
                        this.otherSources.push(e), this.currentPeriod && this.currentPeriod.requestSource(e)
                    }, e.prototype.removeSource = function(e) {
                        r.removeExact(this.otherSources, e), this.currentPeriod && this.currentPeriod.purgeSource(e)
                    }, e.prototype.removeAllSources = function() {
                        this.otherSources = [], this.currentPeriod && this.currentPeriod.purgeAllSources()
                    }, e.prototype.refetchSource = function(e) {
                        var t = this.currentPeriod;
                        t && (t.freeze(), t.purgeSource(e), t.requestSource(e), t.thaw())
                    }, e.prototype.refetchAllSources = function() {
                        var e = this.currentPeriod;
                        e && (e.freeze(), e.purgeAllSources(), e.requestSources(this.getSources()), e.thaw())
                    }, e.prototype.getSources = function() {
                        return [this.stickySource].concat(this.otherSources)
                    }, e.prototype.multiQuerySources = function(e) {
                        e ? i.isArray(e) || (e = [e]) : e = [];
                        var t, n = [];
                        for (t = 0; t < e.length; t++) n.push.apply(n, this.querySources(e[t]));
                        return n
                    }, e.prototype.querySources = function(e) {
                        var t, n, r = this.otherSources;
                        for (t = 0; t < r.length; t++)
                            if ((n = r[t]) === e) return [n];
                        return (n = this.getSourceById(l.default.normalizeId(e))) ? [n] : (e = s.default.parse(e, this.calendar)) ? i.grep(r, function(t) {
                            return n = t, e.getPrimitive() === n.getPrimitive();
                            var n
                        }) : void 0
                    }, e.prototype.getSourceById = function(e) {
                        return i.grep(this.otherSources, function(t) {
                            return t.id && t.id === e
                        })[0]
                    }, e.prototype.setPeriod = function(e) {
                        this.currentPeriod && (this.unbindPeriod(this.currentPeriod), this.currentPeriod = null), this.currentPeriod = e, this.bindPeriod(e), e.requestSources(this.getSources())
                    }, e.prototype.bindPeriod = function(e) {
                        this.listenTo(e, "release", function(e) {
                            this.trigger("release", e)
                        })
                    }, e.prototype.unbindPeriod = function(e) {
                        this.stopListeningTo(e)
                    }, e.prototype.getEventDefByUid = function(e) {
                        if (this.currentPeriod) return this.currentPeriod.getEventDefByUid(e)
                    }, e.prototype.addEventDef = function(e, t) {
                        t && this.stickySource.addEventDef(e), this.currentPeriod && this.currentPeriod.addEventDef(e)
                    }, e.prototype.removeEventDefsById = function(e) {
                        this.getSources().forEach(function(t) {
                            t.removeEventDefsById(e)
                        }), this.currentPeriod && this.currentPeriod.removeEventDefsById(e)
                    }, e.prototype.removeAllEventDefs = function() {
                        this.getSources().forEach(function(e) {
                            e.removeAllEventDefs()
                        }), this.currentPeriod && this.currentPeriod.removeAllEventDefs()
                    }, e.prototype.mutateEventsWithId = function(e, t) {
                        var n, i = this.currentPeriod,
                            r = [];
                        return i ? (i.freeze(), (n = i.getEventDefsById(e)).forEach(function(e) {
                            i.removeEventDef(e), r.push(t.mutateSingle(e)), i.addEventDef(e)
                        }), i.thaw(), function() {
                            i.freeze();
                            for (var e = 0; e < n.length; e++) i.removeEventDef(n[e]), r[e](), i.addEventDef(n[e]);
                            i.thaw()
                        }) : function() {}
                    }, e.prototype.buildMutatedEventInstanceGroup = function(e, t) {
                        var n, i, r = this.getEventDefsById(e),
                            a = [];
                        for (n = 0; n < r.length; n++)(i = r[n].clone()) instanceof d.default && (t.mutateSingle(i), a.push.apply(a, i.buildInstances()));
                        return new u.default(a)
                    }, e.prototype.freeze = function() {
                        this.currentPeriod && this.currentPeriod.freeze()
                    }, e.prototype.thaw = function() {
                        this.currentPeriod && this.currentPeriod.thaw()
                    }, e.prototype.getEventDefsById = function(e) {
                        return this.currentPeriod.getEventDefsById(e)
                    }, e.prototype.getEventInstances = function() {
                        return this.currentPeriod.getEventInstances()
                    }, e.prototype.getEventInstancesWithId = function(e) {
                        return this.currentPeriod.getEventInstancesWithId(e)
                    }, e.prototype.getEventInstancesWithoutId = function(e) {
                        return this.currentPeriod.getEventInstancesWithoutId(e)
                    }, e
                }();
            t.default = p, c.default.mixInto(p), h.default.mixInto(p)
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return i.__extends(t, e), t
                }(n(22).default);
            t.default = r, r.prototype.classes = {
                widget: "fc-unthemed",
                widgetHeader: "fc-widget-header",
                widgetContent: "fc-widget-content",
                buttonGroup: "fc-button-group",
                button: "fc-button",
                cornerLeft: "fc-corner-left",
                cornerRight: "fc-corner-right",
                stateDefault: "fc-state-default",
                stateActive: "fc-state-active",
                stateDisabled: "fc-state-disabled",
                stateHover: "fc-state-hover",
                stateDown: "fc-state-down",
                popoverHeader: "fc-widget-header",
                popoverContent: "fc-widget-content",
                headerRow: "fc-widget-header",
                dayRow: "fc-widget-content",
                listView: "fc-widget-content"
            }, r.prototype.baseIconClass = "fc-icon", r.prototype.iconClasses = {
                close: "fc-icon-x",
                prev: "fc-icon-left-single-arrow",
                next: "fc-icon-right-single-arrow",
                prevYear: "fc-icon-left-double-arrow",
                nextYear: "fc-icon-right-double-arrow"
            }, r.prototype.iconOverrideOption = "buttonIcons", r.prototype.iconOverrideCustomButtonOption = "icon", r.prototype.iconOverridePrefix = "fc-icon-"
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return i.__extends(t, e), t
                }(n(22).default);
            t.default = r, r.prototype.classes = {
                widget: "ui-widget",
                widgetHeader: "ui-widget-header",
                widgetContent: "ui-widget-content",
                buttonGroup: "fc-button-group",
                button: "ui-button",
                cornerLeft: "ui-corner-left",
                cornerRight: "ui-corner-right",
                stateDefault: "ui-state-default",
                stateActive: "ui-state-active",
                stateDisabled: "ui-state-disabled",
                stateHover: "ui-state-hover",
                stateDown: "ui-state-down",
                today: "ui-state-highlight",
                popoverHeader: "ui-widget-header",
                popoverContent: "ui-widget-content",
                headerRow: "ui-widget-header",
                dayRow: "ui-widget-content",
                listView: "ui-widget-content"
            }, r.prototype.baseIconClass = "ui-icon", r.prototype.iconClasses = {
                close: "ui-icon-closethick",
                prev: "ui-icon-circle-triangle-w",
                next: "ui-icon-circle-triangle-e",
                prevYear: "ui-icon-seek-prev",
                nextYear: "ui-icon-seek-next"
            }, r.prototype.iconOverrideOption = "themeButtonIcons", r.prototype.iconOverrideCustomButtonOption = "themeIcon", r.prototype.iconOverridePrefix = "ui-icon-"
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(3),
                a = n(21),
                o = n(6),
                l = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return i.__extends(t, e), t.parse = function(e, t) {
                        var n;
                        return r.isFunction(e.events) ? n = e : r.isFunction(e) && (n = {
                            events: e
                        }), !!n && o.default.parse.call(this, n, t)
                    }, t.prototype.fetch = function(e, t, n) {
                        var i = this;
                        return this.calendar.pushLoading(), a.default.construct(function(r) {
                            i.func.call(i.calendar, e.clone(), t.clone(), n, function(e) {
                                i.calendar.popLoading(), r(i.parseEventDefs(e))
                            })
                        })
                    }, t.prototype.getPrimitive = function() {
                        return this.func
                    }, t.prototype.applyManualStandardProps = function(t) {
                        var n = e.prototype.applyManualStandardProps.call(this, t);
                        return this.func = t.events, n
                    }, t
                }(o.default);
            t.default = l, l.defineStandardProps({
                events: !1
            })
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(3),
                a = n(4),
                o = n(21),
                l = n(6),
                s = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return i.__extends(t, e), t.parse = function(e, t) {
                        var n;
                        return "string" == typeof e.url ? n = e : "string" == typeof e && (n = {
                            url: e
                        }), !!n && l.default.parse.call(this, n, t)
                    }, t.prototype.fetch = function(e, n, i) {
                        var l = this,
                            s = this.ajaxSettings,
                            d = s.success,
                            u = s.error,
                            c = this.buildRequestParams(e, n, i);
                        return this.calendar.pushLoading(), o.default.construct(function(e, n) {
                            r.ajax(r.extend({}, t.AJAX_DEFAULTS, s, {
                                url: l.url,
                                data: c,
                                success: function(t, i, o) {
                                    var s;
                                    l.calendar.popLoading(), t ? (s = a.applyAll(d, l, [t, i, o]), r.isArray(s) && (t = s), e(l.parseEventDefs(t))) : n()
                                },
                                error: function(e, t, i) {
                                    l.calendar.popLoading(), a.applyAll(u, l, [e, t, i]), n()
                                }
                            }))
                        })
                    }, t.prototype.buildRequestParams = function(e, t, n) {
                        var i, a, o, l, s = this.calendar,
                            d = this.ajaxSettings,
                            u = {};
                        return null == (i = this.startParam) && (i = s.opt("startParam")), null == (a = this.endParam) && (a = s.opt("endParam")), null == (o = this.timezoneParam) && (o = s.opt("timezoneParam")), l = r.isFunction(d.data) ? d.data() : d.data || {}, r.extend(u, l), u[i] = e.format(), u[a] = t.format(), n && "local" !== n && (u[o] = n), u
                    }, t.prototype.getPrimitive = function() {
                        return this.url
                    }, t.prototype.applyMiscProps = function(e) {
                        this.ajaxSettings = e
                    }, t.AJAX_DEFAULTS = {
                        dataType: "json",
                        cache: !1
                    }, t
                }(l.default);
            t.default = s, s.defineStandardProps({
                url: !0,
                startParam: !0,
                endParam: !0,
                timezoneParam: !0
            })
        }, function(e, t) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = function() {
                function e(e) {
                    this.items = e || []
                }
                return e.prototype.proxyCall = function(e) {
                    for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                    var i = [];
                    return this.items.forEach(function(n) {
                        i.push(n[e].apply(n, t))
                    }), i
                }, e
            }();
            t.default = n
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(3),
                r = n(4),
                a = n(7),
                o = function() {
                    function e(e, t) {
                        this.isFollowing = !1, this.isHidden = !1, this.isAnimating = !1, this.options = t = t || {}, this.sourceEl = e, this.parentEl = t.parentEl ? i(t.parentEl) : e.parent()
                    }
                    return e.prototype.start = function(e) {
                        this.isFollowing || (this.isFollowing = !0, this.y0 = r.getEvY(e), this.x0 = r.getEvX(e), this.topDelta = 0, this.leftDelta = 0, this.isHidden || this.updatePosition(), r.getEvIsTouch(e) ? this.listenTo(i(document), "touchmove", this.handleMove) : this.listenTo(i(document), "mousemove", this.handleMove))
                    }, e.prototype.stop = function(e, t) {
                        var n = this,
                            r = this.options.revertDuration,
                            a = function() {
                                n.isAnimating = !1, n.removeElement(), n.top0 = n.left0 = null, t && t()
                            };
                        this.isFollowing && !this.isAnimating && (this.isFollowing = !1, this.stopListeningTo(i(document)), e && r && !this.isHidden ? (this.isAnimating = !0, this.el.animate({
                            top: this.top0,
                            left: this.left0
                        }, {
                            duration: r,
                            complete: a
                        })) : a())
                    }, e.prototype.getEl = function() {
                        var e = this.el;
                        return e || ((e = this.el = this.sourceEl.clone().addClass(this.options.additionalClass || "").css({
                            position: "absolute",
                            visibility: "",
                            display: this.isHidden ? "none" : "",
                            margin: 0,
                            right: "auto",
                            bottom: "auto",
                            width: this.sourceEl.width(),
                            height: this.sourceEl.height(),
                            opacity: this.options.opacity || "",
                            zIndex: this.options.zIndex
                        })).addClass("fc-unselectable"), e.appendTo(this.parentEl)), e
                    }, e.prototype.removeElement = function() {
                        this.el && (this.el.remove(), this.el = null)
                    }, e.prototype.updatePosition = function() {
                        var e, t;
                        this.getEl(), null == this.top0 && (e = this.sourceEl.offset(), t = this.el.offsetParent().offset(), this.top0 = e.top - t.top, this.left0 = e.left - t.left), this.el.css({
                            top: this.top0 + this.topDelta,
                            left: this.left0 + this.leftDelta
                        })
                    }, e.prototype.handleMove = function(e) {
                        this.topDelta = r.getEvY(e) - this.y0, this.leftDelta = r.getEvX(e) - this.x0, this.isHidden || this.updatePosition()
                    }, e.prototype.hide = function() {
                        this.isHidden || (this.isHidden = !0, this.el && this.el.hide())
                    }, e.prototype.show = function() {
                        this.isHidden && (this.isHidden = !1, this.updatePosition(), this.getEl().show())
                    }, e
                }();
            t.default = o, a.default.mixInto(o)
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(3),
                r = n(4),
                a = n(7),
                o = function() {
                    function e(e) {
                        this.isHidden = !0, this.margin = 10, this.options = e || {}
                    }
                    return e.prototype.show = function() {
                        this.isHidden && (this.el || this.render(), this.el.show(), this.position(), this.isHidden = !1, this.trigger("show"))
                    }, e.prototype.hide = function() {
                        this.isHidden || (this.el.hide(), this.isHidden = !0, this.trigger("hide"))
                    }, e.prototype.render = function() {
                        var e = this,
                            t = this.options;
                        this.el = i('<div class="fc-popover"/>').addClass(t.className || "").css({
                            top: 0,
                            left: 0
                        }).append(t.content).appendTo(t.parentEl), this.el.on("click", ".fc-close", function() {
                            e.hide()
                        }), t.autoHide && this.listenTo(i(document), "mousedown", this.documentMousedown)
                    }, e.prototype.documentMousedown = function(e) {
                        this.el && !i(e.target).closest(this.el).length && this.hide()
                    }, e.prototype.removeElement = function() {
                        this.hide(), this.el && (this.el.remove(), this.el = null), this.stopListeningTo(i(document), "mousedown")
                    }, e.prototype.position = function() {
                        var e, t, n, a, o, l = this.options,
                            s = this.el.offsetParent().offset(),
                            d = this.el.outerWidth(),
                            u = this.el.outerHeight(),
                            c = i(window),
                            h = r.getScrollParent(this.el);
                        a = l.top || 0, o = void 0 !== l.left ? l.left : void 0 !== l.right ? l.right - d : 0, h.is(window) || h.is(document) ? (h = c, e = 0, t = 0) : (e = (n = h.offset()).top, t = n.left), e += c.scrollTop(), t += c.scrollLeft(), !1 !== l.viewportConstrain && (a = Math.min(a, e + h.outerHeight() - u - this.margin), a = Math.max(a, e + this.margin), o = Math.min(o, t + h.outerWidth() - d - this.margin), o = Math.max(o, t + this.margin)), this.el.css({
                            top: a - s.top,
                            left: o - s.left
                        })
                    }, e.prototype.trigger = function(e) {
                        this.options[e] && this.options[e].apply(this, Array.prototype.slice.call(arguments, 1))
                    }, e
                }();
            t.default = o, a.default.mixInto(o)
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(13),
                r = function() {
                    function e() {
                        this.q = [], this.isPaused = !1, this.isRunning = !1
                    }
                    return e.prototype.queue = function() {
                        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                        this.q.push.apply(this.q, e), this.tryStart()
                    }, e.prototype.pause = function() {
                        this.isPaused = !0
                    }, e.prototype.resume = function() {
                        this.isPaused = !1, this.tryStart()
                    }, e.prototype.getIsIdle = function() {
                        return !this.isRunning && !this.isPaused
                    }, e.prototype.tryStart = function() {
                        !this.isRunning && this.canRunNext() && (this.isRunning = !0, this.trigger("start"), this.runRemaining())
                    }, e.prototype.canRunNext = function() {
                        return !this.isPaused && this.q.length
                    }, e.prototype.runRemaining = function() {
                        var e, t, n = this;
                        do {
                            if (e = this.q.shift(), (t = this.runTask(e)) && t.then) return void t.then(function() {
                                n.canRunNext() && n.runRemaining()
                            })
                        } while (this.canRunNext());
                        this.trigger("stop"), this.isRunning = !1, this.tryStart()
                    }, e.prototype.runTask = function(e) {
                        return e()
                    }, e
                }();
            t.default = r, i.default.mixInto(r)
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = function(e) {
                    function t(t) {
                        var n = e.call(this) || this;
                        return n.waitsByNamespace = t || {}, n
                    }
                    return i.__extends(t, e), t.prototype.queue = function(e, t, n) {
                        var i, r = {
                            func: e,
                            namespace: t,
                            type: n
                        };
                        t && (i = this.waitsByNamespace[t]), this.waitNamespace && (t === this.waitNamespace && null != i ? this.delayWait(i) : (this.clearWait(), this.tryStart())), this.compoundTask(r) && (this.waitNamespace || null == i ? this.tryStart() : this.startWait(t, i))
                    }, t.prototype.startWait = function(e, t) {
                        this.waitNamespace = e, this.spawnWait(t)
                    }, t.prototype.delayWait = function(e) {
                        clearTimeout(this.waitId), this.spawnWait(e)
                    }, t.prototype.spawnWait = function(e) {
                        var t = this;
                        this.waitId = setTimeout(function() {
                            t.waitNamespace = null, t.tryStart()
                        }, e)
                    }, t.prototype.clearWait = function() {
                        this.waitNamespace && (clearTimeout(this.waitId), this.waitId = null, this.waitNamespace = null)
                    }, t.prototype.canRunNext = function() {
                        if (!e.prototype.canRunNext.call(this)) return !1;
                        if (this.waitNamespace) {
                            for (var t = this.q, n = 0; n < t.length; n++)
                                if (t[n].namespace !== this.waitNamespace) return !0;
                            return !1
                        }
                        return !0
                    }, t.prototype.runTask = function(e) {
                        e.func()
                    }, t.prototype.compoundTask = function(e) {
                        var t, n, i = this.q,
                            r = !0;
                        if (e.namespace && "destroy" === e.type)
                            for (t = i.length - 1; t >= 0; t--)
                                if ((n = i[t]).namespace === e.namespace) switch (n.type) {
                                    case "init":
                                        r = !1;
                                    case "add":
                                    case "remove":
                                        i.splice(t, 1)
                                }
                        return r && i.push(e), r
                    }, t
                }(n(228).default);
            t.default = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return i.__extends(t, e), t.prototype.setElement = function(e) {
                        this.el = e, this.bindGlobalHandlers(), this.renderSkeleton(), this.set("isInDom", !0)
                    }, t.prototype.removeElement = function() {
                        this.unset("isInDom"), this.unrenderSkeleton(), this.unbindGlobalHandlers(), this.el.remove()
                    }, t.prototype.bindGlobalHandlers = function() {}, t.prototype.unbindGlobalHandlers = function() {}, t.prototype.renderSkeleton = function() {}, t.prototype.unrenderSkeleton = function() {}, t
                }(n(51).default);
            t.default = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(3),
                a = n(0),
                o = n(4),
                l = n(11),
                s = n(49),
                d = n(230),
                u = n(19),
                c = function(e) {
                    function t(n, i) {
                        var r = e.call(this) || this;
                        return r.isRTL = !1, r.hitsNeededDepth = 0, r.hasAllDayBusinessHours = !1, r.isDatesRendered = !1, n && (r.view = n), i && (r.options = i), r.uid = String(t.guid++), r.childrenByUid = {}, r.nextDayThreshold = a.duration(r.opt("nextDayThreshold")), r.isRTL = r.opt("isRTL"), r.fillRendererClass && (r.fillRenderer = new r.fillRendererClass(r)), r.eventRendererClass && (r.eventRenderer = new r.eventRendererClass(r, r.fillRenderer)), r.helperRendererClass && r.eventRenderer && (r.helperRenderer = new r.helperRendererClass(r, r.eventRenderer)), r.businessHourRendererClass && r.fillRenderer && (r.businessHourRenderer = new r.businessHourRendererClass(r, r.fillRenderer)), r
                    }
                    return i.__extends(t, e), t.prototype.addChild = function(e) {
                        return !this.childrenByUid[e.uid] && (this.childrenByUid[e.uid] = e, !0)
                    }, t.prototype.removeChild = function(e) {
                        return !!this.childrenByUid[e.uid] && (delete this.childrenByUid[e.uid], !0)
                    }, t.prototype.updateSize = function(e, t, n) {
                        this.callChildren("updateSize", arguments)
                    }, t.prototype.opt = function(e) {
                        return this._getView().opt(e)
                    }, t.prototype.publiclyTrigger = function() {
                        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                        var n = this._getCalendar();
                        return n.publiclyTrigger.apply(n, e)
                    }, t.prototype.hasPublicHandlers = function() {
                        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                        var n = this._getCalendar();
                        return n.hasPublicHandlers.apply(n, e)
                    }, t.prototype.executeDateRender = function(e) {
                        this.dateProfile = e, this.renderDates(e), this.isDatesRendered = !0, this.callChildren("executeDateRender", arguments)
                    }, t.prototype.executeDateUnrender = function() {
                        this.callChildren("executeDateUnrender", arguments), this.dateProfile = null, this.unrenderDates(), this.isDatesRendered = !1
                    }, t.prototype.renderDates = function(e) {}, t.prototype.unrenderDates = function() {}, t.prototype.getNowIndicatorUnit = function() {}, t.prototype.renderNowIndicator = function(e) {
                        this.callChildren("renderNowIndicator", arguments)
                    }, t.prototype.unrenderNowIndicator = function() {
                        this.callChildren("unrenderNowIndicator", arguments)
                    }, t.prototype.renderBusinessHours = function(e) {
                        this.businessHourRenderer && this.businessHourRenderer.render(e), this.callChildren("renderBusinessHours", arguments)
                    }, t.prototype.unrenderBusinessHours = function() {
                        this.callChildren("unrenderBusinessHours", arguments), this.businessHourRenderer && this.businessHourRenderer.unrender()
                    }, t.prototype.executeEventRender = function(e) {
                        this.eventRenderer ? (this.eventRenderer.rangeUpdated(), this.eventRenderer.render(e)) : this.renderEvents && this.renderEvents(function(e) {
                            var t, n, i, r = [];
                            for (t in e)
                                for (n = e[t].eventInstances, i = 0; i < n.length; i++) r.push(n[i].toLegacy());
                            return r
                        }(e)), this.callChildren("executeEventRender", arguments)
                    }, t.prototype.executeEventUnrender = function() {
                        this.callChildren("executeEventUnrender", arguments), this.eventRenderer ? this.eventRenderer.unrender() : this.destroyEvents && this.destroyEvents()
                    }, t.prototype.getBusinessHourSegs = function() {
                        var e = this.getOwnBusinessHourSegs();
                        return this.iterChildren(function(t) {
                            e.push.apply(e, t.getBusinessHourSegs())
                        }), e
                    }, t.prototype.getOwnBusinessHourSegs = function() {
                        return this.businessHourRenderer ? this.businessHourRenderer.getSegs() : []
                    }, t.prototype.getEventSegs = function() {
                        var e = this.getOwnEventSegs();
                        return this.iterChildren(function(t) {
                            e.push.apply(e, t.getEventSegs())
                        }), e
                    }, t.prototype.getOwnEventSegs = function() {
                        return this.eventRenderer ? this.eventRenderer.getSegs() : []
                    }, t.prototype.triggerAfterEventsRendered = function() {
                        this.triggerAfterEventSegsRendered(this.getEventSegs()), this.publiclyTrigger("eventAfterAllRender", {
                            context: this,
                            args: [this]
                        })
                    }, t.prototype.triggerAfterEventSegsRendered = function(e) {
                        var t = this;
                        this.hasPublicHandlers("eventAfterRender") && e.forEach(function(e) {
                            var n;
                            e.el && (n = e.footprint.getEventLegacy(), t.publiclyTrigger("eventAfterRender", {
                                context: n,
                                args: [n, e.el, t]
                            }))
                        })
                    }, t.prototype.triggerBeforeEventsDestroyed = function() {
                        this.triggerBeforeEventSegsDestroyed(this.getEventSegs())
                    }, t.prototype.triggerBeforeEventSegsDestroyed = function(e) {
                        var t = this;
                        this.hasPublicHandlers("eventDestroy") && e.forEach(function(e) {
                            var n;
                            e.el && (n = e.footprint.getEventLegacy(), t.publiclyTrigger("eventDestroy", {
                                context: n,
                                args: [n, e.el, t]
                            }))
                        })
                    }, t.prototype.showEventsWithId = function(e) {
                        this.getEventSegs().forEach(function(t) {
                            t.footprint.eventDef.id === e && t.el && t.el.css("visibility", "")
                        }), this.callChildren("showEventsWithId", arguments)
                    }, t.prototype.hideEventsWithId = function(e) {
                        this.getEventSegs().forEach(function(t) {
                            t.footprint.eventDef.id === e && t.el && t.el.css("visibility", "hidden")
                        }), this.callChildren("hideEventsWithId", arguments)
                    }, t.prototype.renderDrag = function(e, t, n) {
                        var i = !1;
                        return this.iterChildren(function(r) {
                            r.renderDrag(e, t, n) && (i = !0)
                        }), i
                    }, t.prototype.unrenderDrag = function() {
                        this.callChildren("unrenderDrag", arguments)
                    }, t.prototype.renderEventResize = function(e, t, n) {
                        this.callChildren("renderEventResize", arguments)
                    }, t.prototype.unrenderEventResize = function() {
                        this.callChildren("unrenderEventResize", arguments)
                    }, t.prototype.renderSelectionFootprint = function(e) {
                        this.renderHighlight(e), this.callChildren("renderSelectionFootprint", arguments)
                    }, t.prototype.unrenderSelection = function() {
                        this.unrenderHighlight(), this.callChildren("unrenderSelection", arguments)
                    }, t.prototype.renderHighlight = function(e) {
                        this.fillRenderer && this.fillRenderer.renderFootprint("highlight", e, {
                            getClasses: function() {
                                return ["fc-highlight"]
                            }
                        }), this.callChildren("renderHighlight", arguments)
                    }, t.prototype.unrenderHighlight = function() {
                        this.fillRenderer && this.fillRenderer.unrender("highlight"), this.callChildren("unrenderHighlight", arguments)
                    }, t.prototype.hitsNeeded = function() {
                        this.hitsNeededDepth++ || this.prepareHits(), this.callChildren("hitsNeeded", arguments)
                    }, t.prototype.hitsNotNeeded = function() {
                        this.hitsNeededDepth && !--this.hitsNeededDepth && this.releaseHits(), this.callChildren("hitsNotNeeded", arguments)
                    }, t.prototype.prepareHits = function() {}, t.prototype.releaseHits = function() {}, t.prototype.queryHit = function(e, t) {
                        var n, i, r = this.childrenByUid;
                        for (n in r)
                            if (i = r[n].queryHit(e, t)) break;
                        return i
                    }, t.prototype.getSafeHitFootprint = function(e) {
                        var t = this.getHitFootprint(e);
                        return this.dateProfile.activeUnzonedRange.containsRange(t.unzonedRange) ? t : null
                    }, t.prototype.getHitFootprint = function(e) {}, t.prototype.getHitEl = function(e) {}, t.prototype.eventRangesToEventFootprints = function(e) {
                        var t, n = [];
                        for (t = 0; t < e.length; t++) n.push.apply(n, this.eventRangeToEventFootprints(e[t]));
                        return n
                    }, t.prototype.eventRangeToEventFootprints = function(e) {
                        return [u.eventRangeToEventFootprint(e)]
                    }, t.prototype.eventFootprintsToSegs = function(e) {
                        var t, n = [];
                        for (t = 0; t < e.length; t++) n.push.apply(n, this.eventFootprintToSegs(e[t]));
                        return n
                    }, t.prototype.eventFootprintToSegs = function(e) {
                        var t, n, i, r = e.componentFootprint.unzonedRange;
                        for (t = this.componentFootprintToSegs(e.componentFootprint), n = 0; n < t.length; n++) i = t[n], r.isStart || (i.isStart = !1), r.isEnd || (i.isEnd = !1), i.footprint = e;
                        return t
                    }, t.prototype.componentFootprintToSegs = function(e) {
                        return []
                    }, t.prototype.callChildren = function(e, t) {
                        this.iterChildren(function(n) {
                            n[e].apply(n, t)
                        })
                    }, t.prototype.iterChildren = function(e) {
                        var t, n = this.childrenByUid;
                        for (t in n) e(n[t])
                    }, t.prototype._getCalendar = function() {
                        return this.calendar || this.view.calendar
                    }, t.prototype._getView = function() {
                        return this.view
                    }, t.prototype._getDateProfile = function() {
                        return this._getView().get("dateProfile")
                    }, t.prototype.buildGotoAnchorHtml = function(e, t, n) {
                        var i, a, s, d;
                        return r.isPlainObject(e) ? (i = e.date, a = e.type, s = e.forceOff) : i = e, d = {
                            date: (i = l.default(i)).format("YYYY-MM-DD"),
                            type: a || "day"
                        }, "string" == typeof t && (n = t, t = null), t = t ? " " + o.attrsToStr(t) : "", n = n || "", !s && this.opt("navLinks") ? "<a" + t + ' data-goto="' + o.htmlEscape(JSON.stringify(d)) + '">' + n + "</a>" : "<span" + t + ">" + n + "</span>"
                    }, t.prototype.getAllDayHtml = function() {
                        return this.opt("allDayHtml") || o.htmlEscape(this.opt("allDayText"))
                    }, t.prototype.getDayClasses = function(e, t) {
                        var n, i = this._getView(),
                            r = [];
                        return this.dateProfile.activeUnzonedRange.containsDate(e) ? (r.push("fc-" + o.dayIDs[e.day()]), i.isDateInOtherMonth(e, this.dateProfile) && r.push("fc-other-month"), n = i.calendar.getNow(), e.isSame(n, "day") ? (r.push("fc-today"), !0 !== t && r.push(i.calendar.theme.getClass("today"))) : e < n ? r.push("fc-past") : r.push("fc-future")) : r.push("fc-disabled-day"), r
                    }, t.prototype.formatRange = function(e, t, n, i) {
                        var r = e.end;
                        return t && (r = r.clone().subtract(1)), s.formatRange(e.start, r, n, i, this.isRTL)
                    }, t.prototype.currentRangeAs = function(e) {
                        return this._getDateProfile().currentUnzonedRange.as(e)
                    }, t.prototype.computeDayRange = function(e) {
                        var t = this._getCalendar(),
                            n = t.msToUtcMoment(e.startMs, !0),
                            i = t.msToUtcMoment(e.endMs),
                            r = +i.time(),
                            a = i.clone().stripTime();
                        return r && r >= this.nextDayThreshold && a.add(1, "days"), a <= n && (a = n.clone().add(1, "days")), {
                            start: n,
                            end: a
                        }
                    }, t.prototype.isMultiDayRange = function(e) {
                        var t = this.computeDayRange(e);
                        return t.end.diff(t.start, "days") > 1
                    }, t.guid = 0, t
                }(d.default);
            t.default = c
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(3),
                r = n(0),
                a = n(4),
                o = n(33),
                l = n(225),
                s = n(23),
                d = n(13),
                u = n(7),
                c = n(257),
                h = n(258),
                p = n(259),
                f = n(217),
                m = n(32),
                g = n(11),
                _ = n(5),
                y = n(12),
                v = n(16),
                M = n(220),
                b = n(218),
                w = n(38),
                L = n(36),
                D = n(9),
                T = n(39),
                k = n(6),
                S = n(57),
                x = function() {
                    function e(e, t) {
                        this.loadingLevel = 0, this.ignoreUpdateViewSize = 0, this.freezeContentHeightDepth = 0, s.default.needed(), this.el = e, this.viewsByType = {}, this.optionsManager = new h.default(this, t), this.viewSpecManager = new p.default(this.optionsManager, this), this.initMomentInternals(), this.initCurrentDate(), this.initEventManager(), this.constraints = new f.default(this.eventManager, this), this.constructed()
                    }
                    return e.prototype.constructed = function() {}, e.prototype.getView = function() {
                        return this.view
                    }, e.prototype.publiclyTrigger = function(e, t) {
                        var n, r, a = this.opt(e);
                        if (i.isPlainObject(t) ? (n = t.context, r = t.args) : i.isArray(t) && (r = t), null == n && (n = this.el[0]), r || (r = []), this.triggerWith(e, n, r), a) return a.apply(n, r)
                    }, e.prototype.hasPublicHandlers = function(e) {
                        return this.hasHandlers(e) || this.opt(e)
                    }, e.prototype.option = function(e, t) {
                        var n;
                        if ("string" == typeof e) {
                            if (void 0 === t) return this.optionsManager.get(e);
                            (n = {})[e] = t, this.optionsManager.add(n)
                        } else "object" == typeof e && this.optionsManager.add(e)
                    }, e.prototype.opt = function(e) {
                        return this.optionsManager.get(e)
                    }, e.prototype.instantiateView = function(e) {
                        var t = this.viewSpecManager.getViewSpec(e);
                        if (!t) throw new Error('View type "' + e + '" is not valid');
                        return new t.class(this, t)
                    }, e.prototype.isValidViewType = function(e) {
                        return Boolean(this.viewSpecManager.getViewSpec(e))
                    }, e.prototype.changeView = function(e, t) {
                        t && (t.start && t.end ? this.optionsManager.recordOverrides({
                            visibleRange: t
                        }) : this.currentDate = this.moment(t).stripZone()), this.renderView(e)
                    }, e.prototype.zoomTo = function(e, t) {
                        var n;
                        t = t || "day", n = this.viewSpecManager.getViewSpec(t) || this.viewSpecManager.getUnitViewSpec(t), this.currentDate = e.clone(), this.renderView(n ? n.type : null)
                    }, e.prototype.initCurrentDate = function() {
                        var e = this.opt("defaultDate");
                        this.currentDate = null != e ? this.moment(e).stripZone() : this.getNow()
                    }, e.prototype.prev = function() {
                        var e = this.view,
                            t = e.dateProfileGenerator.buildPrev(e.get("dateProfile"));
                        t.isValid && (this.currentDate = t.date, this.renderView())
                    }, e.prototype.next = function() {
                        var e = this.view,
                            t = e.dateProfileGenerator.buildNext(e.get("dateProfile"));
                        t.isValid && (this.currentDate = t.date, this.renderView())
                    }, e.prototype.prevYear = function() {
                        this.currentDate.add(-1, "years"), this.renderView()
                    }, e.prototype.nextYear = function() {
                        this.currentDate.add(1, "years"), this.renderView()
                    }, e.prototype.today = function() {
                        this.currentDate = this.getNow(), this.renderView()
                    }, e.prototype.gotoDate = function(e) {
                        this.currentDate = this.moment(e).stripZone(), this.renderView()
                    }, e.prototype.incrementDate = function(e) {
                        this.currentDate.add(r.duration(e)), this.renderView()
                    }, e.prototype.getDate = function() {
                        return this.applyTimezone(this.currentDate)
                    }, e.prototype.pushLoading = function() {
                        this.loadingLevel++ || this.publiclyTrigger("loading", [!0, this.view])
                    }, e.prototype.popLoading = function() {
                        --this.loadingLevel || this.publiclyTrigger("loading", [!1, this.view])
                    }, e.prototype.render = function() {
                        this.contentEl ? this.elementVisible() && (this.calcSize(), this.updateViewSize()) : this.initialRender()
                    }, e.prototype.initialRender = function() {
                        var e = this,
                            t = this.el;
                        t.addClass("fc"), t.on("click.fc", "a[data-goto]", function(t) {
                            var n = i(t.currentTarget).data("goto"),
                                r = e.moment(n.date),
                                o = n.type,
                                l = e.view.opt("navLink" + a.capitaliseFirstLetter(o) + "Click");
                            "function" == typeof l ? l(r, t) : ("string" == typeof l && (o = l), e.zoomTo(r, o))
                        }), this.optionsManager.watch("settingTheme", ["?theme", "?themeSystem"], function(n) {
                            var i = new(S.getThemeSystemClass(n.themeSystem || n.theme))(e.optionsManager),
                                r = i.getClass("widget");
                            e.theme = i, r && t.addClass(r)
                        }, function() {
                            var n = e.theme.getClass("widget");
                            e.theme = null, n && t.removeClass(n)
                        }), this.optionsManager.watch("settingBusinessHourGenerator", ["?businessHours"], function(t) {
                            e.businessHourGenerator = new b.default(t.businessHours, e), e.view && e.view.set("businessHourGenerator", e.businessHourGenerator)
                        }, function() {
                            e.businessHourGenerator = null
                        }), this.optionsManager.watch("applyingDirClasses", ["?isRTL", "?locale"], function(e) {
                            t.toggleClass("fc-ltr", !e.isRTL), t.toggleClass("fc-rtl", e.isRTL)
                        }), this.contentEl = i("<div class='fc-view-container'/>").prependTo(t), this.initToolbars(), this.renderHeader(), this.renderFooter(), this.renderView(this.opt("defaultView")), this.opt("handleWindowResize") && i(window).resize(this.windowResizeProxy = a.debounce(this.windowResize.bind(this), this.opt("windowResizeDelay")))
                    }, e.prototype.destroy = function() {
                        this.view && this.clearView(), this.toolbarsManager.proxyCall("removeElement"), this.contentEl.remove(), this.el.removeClass("fc fc-ltr fc-rtl"), this.optionsManager.unwatch("settingTheme"), this.optionsManager.unwatch("settingBusinessHourGenerator"), this.el.off(".fc"), this.windowResizeProxy && (i(window).unbind("resize", this.windowResizeProxy), this.windowResizeProxy = null), s.default.unneeded()
                    }, e.prototype.elementVisible = function() {
                        return this.el.is(":visible")
                    }, e.prototype.bindViewHandlers = function(e) {
                        var t = this;
                        e.watch("titleForCalendar", ["title"], function(n) {
                            e === t.view && t.setToolbarsTitle(n.title)
                        }), e.watch("dateProfileForCalendar", ["dateProfile"], function(n) {
                            e === t.view && (t.currentDate = n.dateProfile.date, t.updateToolbarButtons(n.dateProfile))
                        })
                    }, e.prototype.unbindViewHandlers = function(e) {
                        e.unwatch("titleForCalendar"), e.unwatch("dateProfileForCalendar")
                    }, e.prototype.renderView = function(e) {
                        var t, n = this.view;
                        this.freezeContentHeight(), n && e && n.type !== e && this.clearView(), !this.view && e && (t = this.view = this.viewsByType[e] || (this.viewsByType[e] = this.instantiateView(e)), this.bindViewHandlers(t), t.startBatchRender(), t.setElement(i("<div class='fc-view fc-" + e + "-view' />").appendTo(this.contentEl)), this.toolbarsManager.proxyCall("activateButton", e)), this.view && (this.view.get("businessHourGenerator") !== this.businessHourGenerator && this.view.set("businessHourGenerator", this.businessHourGenerator), this.view.setDate(this.currentDate), t && t.stopBatchRender()), this.thawContentHeight()
                    }, e.prototype.clearView = function() {
                        var e = this.view;
                        this.toolbarsManager.proxyCall("deactivateButton", e.type), this.unbindViewHandlers(e), e.removeElement(), e.unsetDate(), this.view = null
                    }, e.prototype.reinitView = function() {
                        var e = this.view,
                            t = e.queryScroll();
                        this.freezeContentHeight(), this.clearView(), this.calcSize(), this.renderView(e.type), this.view.applyScroll(t), this.thawContentHeight()
                    }, e.prototype.getSuggestedViewHeight = function() {
                        return null == this.suggestedViewHeight && this.calcSize(), this.suggestedViewHeight
                    }, e.prototype.isHeightAuto = function() {
                        return "auto" === this.opt("contentHeight") || "auto" === this.opt("height")
                    }, e.prototype.updateViewSize = function(e) {
                        void 0 === e && (e = !1);
                        var t, n = this.view;
                        if (!this.ignoreUpdateViewSize && n) return e && (this.calcSize(), t = n.queryScroll()), this.ignoreUpdateViewSize++, n.updateSize(this.getSuggestedViewHeight(), this.isHeightAuto(), e), this.ignoreUpdateViewSize--, e && n.applyScroll(t), !0
                    }, e.prototype.calcSize = function() {
                        this.elementVisible() && this._calcSize()
                    }, e.prototype._calcSize = function() {
                        var e = this.opt("contentHeight"),
                            t = this.opt("height");
                        this.suggestedViewHeight = "number" == typeof e ? e : "function" == typeof e ? e() : "number" == typeof t ? t - this.queryToolbarsHeight() : "function" == typeof t ? t() - this.queryToolbarsHeight() : "parent" === t ? this.el.parent().height() - this.queryToolbarsHeight() : Math.round(this.contentEl.width() / Math.max(this.opt("aspectRatio"), .5))
                    }, e.prototype.windowResize = function(e) {
                        e.target === window && this.view && this.view.isDatesRendered && this.updateViewSize(!0) && this.publiclyTrigger("windowResize", [this.view])
                    }, e.prototype.freezeContentHeight = function() {
                        this.freezeContentHeightDepth++ || this.forceFreezeContentHeight()
                    }, e.prototype.forceFreezeContentHeight = function() {
                        this.contentEl.css({
                            width: "100%",
                            height: this.contentEl.height(),
                            overflow: "hidden"
                        })
                    }, e.prototype.thawContentHeight = function() {
                        this.freezeContentHeightDepth--, this.contentEl.css({
                            width: "",
                            height: "",
                            overflow: ""
                        }), this.freezeContentHeightDepth && this.forceFreezeContentHeight()
                    }, e.prototype.initToolbars = function() {
                        this.header = new c.default(this, this.computeHeaderOptions()), this.footer = new c.default(this, this.computeFooterOptions()), this.toolbarsManager = new l.default([this.header, this.footer])
                    }, e.prototype.computeHeaderOptions = function() {
                        return {
                            extraClasses: "fc-header-toolbar",
                            layout: this.opt("header")
                        }
                    }, e.prototype.computeFooterOptions = function() {
                        return {
                            extraClasses: "fc-footer-toolbar",
                            layout: this.opt("footer")
                        }
                    }, e.prototype.renderHeader = function() {
                        var e = this.header;
                        e.setToolbarOptions(this.computeHeaderOptions()), e.render(), e.el && this.el.prepend(e.el)
                    }, e.prototype.renderFooter = function() {
                        var e = this.footer;
                        e.setToolbarOptions(this.computeFooterOptions()), e.render(), e.el && this.el.append(e.el)
                    }, e.prototype.setToolbarsTitle = function(e) {
                        this.toolbarsManager.proxyCall("updateTitle", e)
                    }, e.prototype.updateToolbarButtons = function(e) {
                        var t = this.getNow(),
                            n = this.view,
                            i = n.dateProfileGenerator.build(t),
                            r = n.dateProfileGenerator.buildPrev(n.get("dateProfile")),
                            a = n.dateProfileGenerator.buildNext(n.get("dateProfile"));
                        this.toolbarsManager.proxyCall(i.isValid && !e.currentUnzonedRange.containsDate(t) ? "enableButton" : "disableButton", "today"), this.toolbarsManager.proxyCall(r.isValid ? "enableButton" : "disableButton", "prev"), this.toolbarsManager.proxyCall(a.isValid ? "enableButton" : "disableButton", "next")
                    }, e.prototype.queryToolbarsHeight = function() {
                        return this.toolbarsManager.items.reduce(function(e, t) {
                            return e + (t.el ? t.el.outerHeight(!0) : 0)
                        }, 0)
                    }, e.prototype.select = function(e, t) {
                        this.view.select(this.buildSelectFootprint.apply(this, arguments))
                    }, e.prototype.unselect = function() {
                        this.view && this.view.unselect()
                    }, e.prototype.buildSelectFootprint = function(e, t) {
                        var n, i = this.moment(e).stripZone();
                        return n = t ? this.moment(t).stripZone() : i.hasTime() ? i.clone().add(this.defaultTimedEventDuration) : i.clone().add(this.defaultAllDayEventDuration), new y.default(new _.default(i, n), !i.hasTime())
                    }, e.prototype.initMomentInternals = function() {
                        var e = this;
                        this.defaultAllDayEventDuration = r.duration(this.opt("defaultAllDayEventDuration")), this.defaultTimedEventDuration = r.duration(this.opt("defaultTimedEventDuration")), this.optionsManager.watch("buildingMomentLocale", ["?locale", "?monthNames", "?monthNamesShort", "?dayNames", "?dayNamesShort", "?firstDay", "?weekNumberCalculation"], function(t) {
                            var n, i = t.weekNumberCalculation,
                                r = t.firstDay;
                            "iso" === i && (i = "ISO");
                            var a = Object.create(m.getMomentLocaleData(t.locale));
                            t.monthNames && (a._months = t.monthNames), t.monthNamesShort && (a._monthsShort = t.monthNamesShort), t.dayNames && (a._weekdays = t.dayNames), t.dayNamesShort && (a._weekdaysShort = t.dayNamesShort), null == r && "ISO" === i && (r = 1), null != r && ((n = Object.create(a._week)).dow = r, a._week = n), "ISO" !== i && "local" !== i && "function" != typeof i || (a._fullCalendar_weekCalc = i), e.localeData = a, e.currentDate && e.localizeMoment(e.currentDate)
                        })
                    }, e.prototype.moment = function() {
                        for (var e, t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                        return "local" === this.opt("timezone") ? (e = g.default.apply(null, t)).hasTime() && e.local() : e = "UTC" === this.opt("timezone") ? g.default.utc.apply(null, t) : g.default.parseZone.apply(null, t), this.localizeMoment(e), e
                    }, e.prototype.msToMoment = function(e, t) {
                        var n = g.default.utc(e);
                        return t ? n.stripTime() : n = this.applyTimezone(n), this.localizeMoment(n), n
                    }, e.prototype.msToUtcMoment = function(e, t) {
                        var n = g.default.utc(e);
                        return t && n.stripTime(), this.localizeMoment(n), n
                    }, e.prototype.localizeMoment = function(e) {
                        e._locale = this.localeData
                    }, e.prototype.getIsAmbigTimezone = function() {
                        return "local" !== this.opt("timezone") && "UTC" !== this.opt("timezone")
                    }, e.prototype.applyTimezone = function(e) {
                        if (!e.hasTime()) return e.clone();
                        var t, n = this.moment(e.toArray()),
                            i = e.time().asMilliseconds() - n.time().asMilliseconds();
                        return i && (t = n.clone().add(i), e.time().asMilliseconds() - t.time().asMilliseconds() == 0 && (n = t)), n
                    }, e.prototype.footprintToDateProfile = function(e, t) {
                        void 0 === t && (t = !1);
                        var n, i = g.default.utc(e.unzonedRange.startMs);
                        return t || (n = g.default.utc(e.unzonedRange.endMs)), e.isAllDay ? (i.stripTime(), n && n.stripTime()) : (i = this.applyTimezone(i), n && (n = this.applyTimezone(n))), this.localizeMoment(i), n && this.localizeMoment(n), new v.default(i, n, this)
                    }, e.prototype.getNow = function() {
                        var e = this.opt("now");
                        return "function" == typeof e && (e = e()), this.moment(e).stripZone()
                    }, e.prototype.humanizeDuration = function(e) {
                        return e.locale(this.opt("locale")).humanize()
                    }, e.prototype.parseUnzonedRange = function(e) {
                        var t = null,
                            n = null;
                        return e.start && (t = this.moment(e.start).stripZone()), e.end && (n = this.moment(e.end).stripZone()), t || n ? t && n && n.isBefore(t) ? null : new _.default(t, n) : null
                    }, e.prototype.initEventManager = function() {
                        var e = this,
                            t = new M.default(this),
                            n = this.opt("eventSources") || [],
                            i = this.opt("events");
                        this.eventManager = t, i && n.unshift(i), t.on("release", function(t) {
                            e.trigger("eventsReset", t)
                        }), t.freeze(), n.forEach(function(n) {
                            var i = w.default.parse(n, e);
                            i && t.addSource(i)
                        }), t.thaw()
                    }, e.prototype.requestEvents = function(e, t) {
                        return this.eventManager.requestEvents(e, t, this.opt("timezone"), !this.opt("lazyFetching"))
                    }, e.prototype.getEventEnd = function(e) {
                        return e.end ? e.end.clone() : this.getDefaultEventEnd(e.allDay, e.start)
                    }, e.prototype.getDefaultEventEnd = function(e, t) {
                        var n = t.clone();
                        return e ? n.stripTime().add(this.defaultAllDayEventDuration) : n.add(this.defaultTimedEventDuration), this.getIsAmbigTimezone() && n.stripZone(), n
                    }, e.prototype.rerenderEvents = function() {
                        this.view.flash("displayingEvents")
                    }, e.prototype.refetchEvents = function() {
                        this.eventManager.refetchAllSources()
                    }, e.prototype.renderEvents = function(e, t) {
                        this.eventManager.freeze();
                        for (var n = 0; n < e.length; n++) this.renderEvent(e[n], t);
                        this.eventManager.thaw()
                    }, e.prototype.renderEvent = function(e, t) {
                        void 0 === t && (t = !1);
                        var n = this.eventManager,
                            i = L.default.parse(e, e.source || n.stickySource);
                        i && n.addEventDef(i, t)
                    }, e.prototype.removeEvents = function(e) {
                        var t, n = this.eventManager,
                            i = [],
                            r = {};
                        if (null == e) n.removeAllEventDefs();
                        else {
                            for (n.getEventInstances().forEach(function(e) {
                                    i.push(e.toLegacy())
                                }), i = Y(i, e), t = 0; t < i.length; t++) r[this.eventManager.getEventDefByUid(i[t]._id).id] = !0;
                            for (t in n.freeze(), r) n.removeEventDefsById(t);
                            n.thaw()
                        }
                    }, e.prototype.clientEvents = function(e) {
                        var t = [];
                        return this.eventManager.getEventInstances().forEach(function(e) {
                            t.push(e.toLegacy())
                        }), Y(t, e)
                    }, e.prototype.updateEvents = function(e) {
                        this.eventManager.freeze();
                        for (var t = 0; t < e.length; t++) this.updateEvent(e[t]);
                        this.eventManager.thaw()
                    }, e.prototype.updateEvent = function(e) {
                        var t, n, i = this.eventManager.getEventDefByUid(e._id);
                        i instanceof D.default && (t = i.buildInstance(), n = T.default.createFromRawProps(t, e, null), this.eventManager.mutateEventsWithId(i.id, n))
                    }, e.prototype.getEventSources = function() {
                        return this.eventManager.otherSources.slice()
                    }, e.prototype.getEventSourceById = function(e) {
                        return this.eventManager.getSourceById(k.default.normalizeId(e))
                    }, e.prototype.addEventSource = function(e) {
                        var t = w.default.parse(e, this);
                        t && this.eventManager.addSource(t)
                    }, e.prototype.removeEventSources = function(e) {
                        var t, n, i = this.eventManager;
                        if (null == e) this.eventManager.removeAllSources();
                        else {
                            for (t = i.multiQuerySources(e), i.freeze(), n = 0; n < t.length; n++) i.removeSource(t[n]);
                            i.thaw()
                        }
                    }, e.prototype.removeEventSource = function(e) {
                        var t, n = this.eventManager,
                            i = n.querySources(e);
                        for (n.freeze(), t = 0; t < i.length; t++) n.removeSource(i[t]);
                        n.thaw()
                    }, e.prototype.refetchEventSources = function(e) {
                        var t, n = this.eventManager,
                            i = n.multiQuerySources(e);
                        for (n.freeze(), t = 0; t < i.length; t++) n.refetchSource(i[t]);
                        n.thaw()
                    }, e.defaults = o.globalDefaults, e.englishDefaults = o.englishDefaults, e.rtlDefaults = o.rtlDefaults, e
                }();

            function Y(e, t) {
                return null == t ? e : i.isFunction(t) ? e.filter(t) : (t += "", e.filter(function(e) {
                    return e.id == t || e._id === t
                }))
            }
            t.default = x, d.default.mixInto(x), u.default.mixInto(x)
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(3),
                a = n(0),
                o = n(18),
                l = n(4),
                s = n(11),
                d = n(7),
                u = n(17),
                c = n(9),
                h = n(20),
                p = n(6),
                f = function(e) {
                    function t() {
                        var t = null !== e && e.apply(this, arguments) || this;
                        return t.isDragging = !1, t
                    }
                    return i.__extends(t, e), t.prototype.end = function() {
                        this.dragListener && this.dragListener.endInteraction()
                    }, t.prototype.bindToDocument = function() {
                        this.listenTo(r(document), {
                            dragstart: this.handleDragStart,
                            sortstart: this.handleDragStart
                        })
                    }, t.prototype.unbindFromDocument = function() {
                        this.stopListeningTo(r(document))
                    }, t.prototype.handleDragStart = function(e, t) {
                        var n, i;
                        this.opt("droppable") && (n = r((t ? t.item : null) || e.target), i = this.opt("dropAccept"), (r.isFunction(i) ? i.call(n[0], n) : n.is(i)) && (this.isDragging || this.listenToExternalDrag(n, e, t)))
                    }, t.prototype.listenToExternalDrag = function(e, t, n) {
                        var i, s = this,
                            d = this.component,
                            c = this.view,
                            p = function(e) {
                                var t, n, i, l, s = o.dataAttrPrefix;
                                s && (s += "-");
                                (t = e.data(s + "event") || null) && (t = "object" == typeof t ? r.extend({}, t) : {}, null == (n = t.start) && (n = t.time), i = t.duration, l = t.stick, delete t.start, delete t.time, delete t.duration, delete t.stick);
                                null == n && (n = e.data(s + "start"));
                                null == n && (n = e.data(s + "time"));
                                null == i && (i = e.data(s + "duration"));
                                null == l && (l = e.data(s + "stick"));
                                return n = null != n ? a.duration(n) : null, i = null != i ? a.duration(i) : null, l = Boolean(l), {
                                    eventProps: t,
                                    startTime: n,
                                    duration: i,
                                    stick: l
                                }
                            }(e);
                        (this.dragListener = new u.default(d, {
                            interactionStart: function() {
                                s.isDragging = !0
                            },
                            hitOver: function(e) {
                                var t, n = !0,
                                    r = e.component.getSafeHitFootprint(e);
                                r && (i = s.computeExternalDrop(r, p)) ? (t = new h.default(i.buildInstances()), n = p.eventProps ? d.isEventInstanceGroupAllowed(t) : d.isExternalInstanceGroupAllowed(t)) : n = !1, n || (i = null, l.disableCursor()), i && d.renderDrag(d.eventRangesToEventFootprints(t.sliceRenderRanges(d.dateProfile.renderUnzonedRange, c.calendar)))
                            },
                            hitOut: function() {
                                i = null
                            },
                            hitDone: function() {
                                l.enableCursor(), d.unrenderDrag()
                            },
                            interactionEnd: function(t) {
                                i && c.reportExternalDrop(i, Boolean(p.eventProps), Boolean(p.stick), e, t, n), s.isDragging = !1, s.dragListener = null
                            }
                        })).startDrag(t)
                    }, t.prototype.computeExternalDrop = function(e, t) {
                        var n, i = this.view.calendar,
                            a = s.default.utc(e.unzonedRange.startMs).stripZone();
                        return e.isAllDay && (t.startTime ? a.time(t.startTime) : a.stripTime()), t.duration && (n = a.clone().add(t.duration)), a = i.applyTimezone(a), n && (n = i.applyTimezone(n)), c.default.parse(r.extend({}, t.eventProps, {
                            start: a,
                            end: n
                        }), new p.default(i))
                    }, t
                }(n(14).default);
            t.default = f, d.default.mixInto(f), o.dataAttrPrefix = ""
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(3),
                a = n(4),
                o = n(39),
                l = n(40),
                s = n(17),
                d = function(e) {
                    function t(t, n) {
                        var i = e.call(this, t) || this;
                        return i.isResizing = !1, i.eventPointing = n, i
                    }
                    return i.__extends(t, e), t.prototype.end = function() {
                        this.dragListener && this.dragListener.endInteraction()
                    }, t.prototype.bindToEl = function(e) {
                        var t = this.component;
                        t.bindSegHandlerToEl(e, "mousedown", this.handleMouseDown.bind(this)), t.bindSegHandlerToEl(e, "touchstart", this.handleTouchStart.bind(this))
                    }, t.prototype.handleMouseDown = function(e, t) {
                        this.component.canStartResize(e, t) && this.buildDragListener(e, r(t.target).is(".fc-start-resizer")).startInteraction(t, {
                            distance: 5
                        })
                    }, t.prototype.handleTouchStart = function(e, t) {
                        this.component.canStartResize(e, t) && this.buildDragListener(e, r(t.target).is(".fc-start-resizer")).startInteraction(t)
                    }, t.prototype.buildDragListener = function(e, t) {
                        var n, i, r = this,
                            o = this.component,
                            l = this.view,
                            d = l.calendar,
                            u = d.eventManager,
                            c = e.el,
                            h = e.footprint.eventDef,
                            p = e.footprint.eventInstance;
                        return this.dragListener = new s.default(o, {
                            scroll: this.opt("dragScroll"),
                            subjectEl: c,
                            interactionStart: function() {
                                n = !1
                            },
                            dragStart: function(t) {
                                n = !0, r.eventPointing.handleMouseout(e, t), r.segResizeStart(e, t)
                            },
                            hitOver: function(n, s, c) {
                                var p, f = !0,
                                    m = o.getSafeHitFootprint(c),
                                    g = o.getSafeHitFootprint(n);
                                m && g && (i = t ? r.computeEventStartResizeMutation(m, g, e.footprint) : r.computeEventEndResizeMutation(m, g, e.footprint)) ? (p = u.buildMutatedEventInstanceGroup(h.id, i), f = o.isEventInstanceGroupAllowed(p)) : f = !1, f ? i.isEmpty() && (i = null) : (i = null, a.disableCursor()), i && (l.hideEventsWithId(e.footprint.eventDef.id), l.renderEventResize(o.eventRangesToEventFootprints(p.sliceRenderRanges(o.dateProfile.renderUnzonedRange, d)), e))
                            },
                            hitOut: function() {
                                i = null
                            },
                            hitDone: function() {
                                l.unrenderEventResize(e), l.showEventsWithId(e.footprint.eventDef.id), a.enableCursor()
                            },
                            interactionEnd: function(t) {
                                n && r.segResizeStop(e, t), i && l.reportEventResize(p, i, c, t), r.dragListener = null
                            }
                        })
                    }, t.prototype.segResizeStart = function(e, t) {
                        this.isResizing = !0, this.component.publiclyTrigger("eventResizeStart", {
                            context: e.el[0],
                            args: [e.footprint.getEventLegacy(), t, {}, this.view]
                        })
                    }, t.prototype.segResizeStop = function(e, t) {
                        this.isResizing = !1, this.component.publiclyTrigger("eventResizeStop", {
                            context: e.el[0],
                            args: [e.footprint.getEventLegacy(), t, {}, this.view]
                        })
                    }, t.prototype.computeEventStartResizeMutation = function(e, t, n) {
                        var i, r, a = n.componentFootprint.unzonedRange,
                            s = this.component.diffDates(t.unzonedRange.getStart(), e.unzonedRange.getStart());
                        return a.getStart().add(s) < a.getEnd() && ((i = new l.default).setStartDelta(s), (r = new o.default).setDateMutation(i), r)
                    }, t.prototype.computeEventEndResizeMutation = function(e, t, n) {
                        var i, r, a = n.componentFootprint.unzonedRange,
                            s = this.component.diffDates(t.unzonedRange.getEnd(), e.unzonedRange.getEnd());
                        return a.getEnd().add(s) > a.getStart() && ((i = new l.default).setEndDelta(s), (r = new o.default).setDateMutation(i), r)
                    }, t
                }(n(14).default);
            t.default = d
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(4),
                a = n(39),
                o = n(40),
                l = n(59),
                s = n(17),
                d = n(226),
                u = function(e) {
                    function t(t, n) {
                        var i = e.call(this, t) || this;
                        return i.isDragging = !1, i.eventPointing = n, i
                    }
                    return i.__extends(t, e), t.prototype.end = function() {
                        this.dragListener && this.dragListener.endInteraction()
                    }, t.prototype.getSelectionDelay = function() {
                        var e = this.opt("eventLongPressDelay");
                        return null == e && (e = this.opt("longPressDelay")), e
                    }, t.prototype.bindToEl = function(e) {
                        var t = this.component;
                        t.bindSegHandlerToEl(e, "mousedown", this.handleMousedown.bind(this)), t.bindSegHandlerToEl(e, "touchstart", this.handleTouchStart.bind(this))
                    }, t.prototype.handleMousedown = function(e, t) {
                        !this.component.shouldIgnoreMouse() && this.component.canStartDrag(e, t) && this.buildDragListener(e).startInteraction(t, {
                            distance: 5
                        })
                    }, t.prototype.handleTouchStart = function(e, t) {
                        var n = this.component,
                            i = {
                                delay: this.view.isEventDefSelected(e.footprint.eventDef) ? 0 : this.getSelectionDelay()
                            };
                        n.canStartDrag(e, t) ? this.buildDragListener(e).startInteraction(t, i) : n.canStartSelection(e, t) && this.buildSelectListener(e).startInteraction(t, i)
                    }, t.prototype.buildSelectListener = function(e) {
                        var t = this,
                            n = this.view,
                            i = e.footprint.eventDef,
                            r = e.footprint.eventInstance;
                        if (this.dragListener) return this.dragListener;
                        var a = this.dragListener = new l.default({
                            dragStart: function(e) {
                                a.isTouch && !n.isEventDefSelected(i) && r && n.selectEventInstance(r)
                            },
                            interactionEnd: function(e) {
                                t.dragListener = null
                            }
                        });
                        return a
                    }, t.prototype.buildDragListener = function(e) {
                        var t, n, i, a = this,
                            o = this.component,
                            l = this.view,
                            u = l.calendar,
                            c = u.eventManager,
                            h = e.el,
                            p = e.footprint.eventDef,
                            f = e.footprint.eventInstance;
                        if (this.dragListener) return this.dragListener;
                        var m = this.dragListener = new s.default(l, {
                            scroll: this.opt("dragScroll"),
                            subjectEl: h,
                            subjectCenter: !0,
                            interactionStart: function(i) {
                                e.component = o, t = !1, (n = new d.default(e.el, {
                                    additionalClass: "fc-dragging",
                                    parentEl: l.el,
                                    opacity: m.isTouch ? null : a.opt("dragOpacity"),
                                    revertDuration: a.opt("dragRevertDuration"),
                                    zIndex: 2
                                })).hide(), n.start(i)
                            },
                            dragStart: function(n) {
                                m.isTouch && !l.isEventDefSelected(p) && f && l.selectEventInstance(f), t = !0, a.eventPointing.handleMouseout(e, n), a.segDragStart(e, n), l.hideEventsWithId(e.footprint.eventDef.id)
                            },
                            hitOver: function(t, s, d) {
                                var h, f, g, _ = !0;
                                e.hit && (d = e.hit), h = d.component.getSafeHitFootprint(d), f = t.component.getSafeHitFootprint(t), h && f && (i = a.computeEventDropMutation(h, f, p)) ? (g = c.buildMutatedEventInstanceGroup(p.id, i), _ = o.isEventInstanceGroupAllowed(g)) : _ = !1, _ || (i = null, r.disableCursor()), i && l.renderDrag(o.eventRangesToEventFootprints(g.sliceRenderRanges(o.dateProfile.renderUnzonedRange, u)), e, m.isTouch) ? n.hide() : n.show(), s && (i = null)
                            },
                            hitOut: function() {
                                l.unrenderDrag(e), n.show(), i = null
                            },
                            hitDone: function() {
                                r.enableCursor()
                            },
                            interactionEnd: function(r) {
                                delete e.component, n.stop(!i, function() {
                                    t && (l.unrenderDrag(e), a.segDragStop(e, r)), l.showEventsWithId(e.footprint.eventDef.id), i && l.reportEventDrop(f, i, h, r)
                                }), a.dragListener = null
                            }
                        });
                        return m
                    }, t.prototype.segDragStart = function(e, t) {
                        this.isDragging = !0, this.component.publiclyTrigger("eventDragStart", {
                            context: e.el[0],
                            args: [e.footprint.getEventLegacy(), t, {}, this.view]
                        })
                    }, t.prototype.segDragStop = function(e, t) {
                        this.isDragging = !1, this.component.publiclyTrigger("eventDragStop", {
                            context: e.el[0],
                            args: [e.footprint.getEventLegacy(), t, {}, this.view]
                        })
                    }, t.prototype.computeEventDropMutation = function(e, t, n) {
                        var i = new a.default;
                        return i.setDateMutation(this.computeEventDateMutation(e, t)), i
                    }, t.prototype.computeEventDateMutation = function(e, t) {
                        var n, i, r = e.unzonedRange.getStart(),
                            a = t.unzonedRange.getStart(),
                            l = !1,
                            s = !1,
                            d = !1;
                        return e.isAllDay !== t.isAllDay && (l = !0, t.isAllDay ? (d = !0, r.stripTime()) : s = !0), n = this.component.diffDates(a, r), (i = new o.default).clearEnd = l, i.forceTimed = s, i.forceAllDay = d, i.setDateDelta(n), i
                    }, t
                }(n(14).default);
            t.default = u
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(4),
                a = n(17),
                o = n(12),
                l = n(5),
                s = function(e) {
                    function t(t) {
                        var n = e.call(this, t) || this;
                        return n.dragListener = n.buildDragListener(), n
                    }
                    return i.__extends(t, e), t.prototype.end = function() {
                        this.dragListener.endInteraction()
                    }, t.prototype.getDelay = function() {
                        var e = this.opt("selectLongPressDelay");
                        return null == e && (e = this.opt("longPressDelay")), e
                    }, t.prototype.bindToEl = function(e) {
                        var t = this,
                            n = this.component,
                            i = this.dragListener;
                        n.bindDateHandlerToEl(e, "mousedown", function(e) {
                            t.opt("selectable") && !n.shouldIgnoreMouse() && i.startInteraction(e, {
                                distance: t.opt("selectMinDistance")
                            })
                        }), n.bindDateHandlerToEl(e, "touchstart", function(e) {
                            t.opt("selectable") && !n.shouldIgnoreTouch() && i.startInteraction(e, {
                                delay: t.getDelay()
                            })
                        }), r.preventSelection(e)
                    }, t.prototype.buildDragListener = function() {
                        var e, t = this,
                            n = this.component;
                        return new a.default(n, {
                            scroll: this.opt("dragScroll"),
                            interactionStart: function() {
                                e = null
                            },
                            dragStart: function(e) {
                                t.view.unselect(e)
                            },
                            hitOver: function(i, a, o) {
                                var l, s;
                                o && (l = n.getSafeHitFootprint(o), s = n.getSafeHitFootprint(i), (e = l && s ? t.computeSelection(l, s) : null) ? n.renderSelectionFootprint(e) : !1 === e && r.disableCursor())
                            },
                            hitOut: function() {
                                e = null, n.unrenderSelection()
                            },
                            hitDone: function() {
                                r.enableCursor()
                            },
                            interactionEnd: function(n, i) {
                                !i && e && t.view.reportSelection(e, n)
                            }
                        })
                    }, t.prototype.computeSelection = function(e, t) {
                        var n = this.computeSelectionFootprint(e, t);
                        return !(n && !this.isSelectionFootprintAllowed(n)) && n
                    }, t.prototype.computeSelectionFootprint = function(e, t) {
                        var n = [e.unzonedRange.startMs, e.unzonedRange.endMs, t.unzonedRange.startMs, t.unzonedRange.endMs];
                        return n.sort(r.compareNumbers), new o.default(new l.default(n[0], n[3]), e.isAllDay)
                    }, t.prototype.isSelectionFootprintAllowed = function(e) {
                        return this.component.dateProfile.validUnzonedRange.containsRange(e.unzonedRange) && this.view.calendar.constraints.isSelectionFootprintAllowed(e)
                    }, t
                }(n(14).default);
            t.default = s
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(17),
                a = function(e) {
                    function t(t) {
                        var n = e.call(this, t) || this;
                        return n.dragListener = n.buildDragListener(), n
                    }
                    return i.__extends(t, e), t.prototype.end = function() {
                        this.dragListener.endInteraction()
                    }, t.prototype.bindToEl = function(e) {
                        var t = this.component,
                            n = this.dragListener;
                        t.bindDateHandlerToEl(e, "mousedown", function(e) {
                            t.shouldIgnoreMouse() || n.startInteraction(e)
                        }), t.bindDateHandlerToEl(e, "touchstart", function(e) {
                            t.shouldIgnoreTouch() || n.startInteraction(e)
                        })
                    }, t.prototype.buildDragListener = function() {
                        var e, t = this,
                            n = this.component,
                            i = new r.default(n, {
                                scroll: this.opt("dragScroll"),
                                interactionStart: function() {
                                    e = i.origHit
                                },
                                hitOver: function(t, n, i) {
                                    n || (e = null)
                                },
                                hitOut: function() {
                                    e = null
                                },
                                interactionEnd: function(i, r) {
                                    var a;
                                    !r && e && (a = n.getSafeHitFootprint(e)) && t.view.triggerDayClick(a, n.getHitEl(e), i)
                                }
                            });
                        return i.shouldCancelTouchScroll = !1, i.scrollAlwaysKills = !0, i
                    }, t
                }(n(14).default);
            t.default = a
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i, r, a = n(2),
                o = n(0),
                l = n(3),
                s = n(4),
                d = n(41),
                u = n(43),
                c = n(239),
                h = n(66),
                p = function(e) {
                    function t(t, n) {
                        var i = e.call(this, t, n) || this;
                        return i.usesMinMaxTime = !0, i.timeGrid = i.instantiateTimeGrid(), i.addChild(i.timeGrid), i.opt("allDaySlot") && (i.dayGrid = i.instantiateDayGrid(), i.addChild(i.dayGrid)), i.scroller = new d.default({
                            overflowX: "hidden",
                            overflowY: "auto"
                        }), i
                    }
                    return a.__extends(t, e), t.prototype.instantiateTimeGrid = function() {
                        var e = new this.timeGridClass(this);
                        return s.copyOwnProps(i, e), e
                    }, t.prototype.instantiateDayGrid = function() {
                        var e = new this.dayGridClass(this);
                        return s.copyOwnProps(r, e), e
                    }, t.prototype.renderSkeleton = function() {
                        var e, t;
                        this.el.addClass("fc-agenda-view").html(this.renderSkeletonHtml()), this.scroller.render(), e = this.scroller.el.addClass("fc-time-grid-container"), t = l('<div class="fc-time-grid" />').appendTo(e), this.el.find(".fc-body > tr > td").append(e), this.timeGrid.headContainerEl = this.el.find(".fc-head-container"), this.timeGrid.setElement(t), this.dayGrid && (this.dayGrid.setElement(this.el.find(".fc-day-grid")), this.dayGrid.bottomCoordPadding = this.dayGrid.el.next("hr").outerHeight())
                    }, t.prototype.unrenderSkeleton = function() {
                        this.timeGrid.removeElement(), this.dayGrid && this.dayGrid.removeElement(), this.scroller.destroy()
                    }, t.prototype.renderSkeletonHtml = function() {
                        var e = this.calendar.theme;
                        return '<table class="' + e.getClass("tableGrid") + '">' + (this.opt("columnHeader") ? '<thead class="fc-head"><tr><td class="fc-head-container ' + e.getClass("widgetHeader") + '">&nbsp;</td></tr></thead>' : "") + '<tbody class="fc-body"><tr><td class="' + e.getClass("widgetContent") + '">' + (this.dayGrid ? '<div class="fc-day-grid"/><hr class="fc-divider ' + e.getClass("widgetHeader") + '"/>' : "") + "</td></tr></tbody></table>"
                    }, t.prototype.axisStyleAttr = function() {
                        return null != this.axisWidth ? 'style="width:' + this.axisWidth + 'px"' : ""
                    }, t.prototype.getNowIndicatorUnit = function() {
                        return this.timeGrid.getNowIndicatorUnit()
                    }, t.prototype.updateSize = function(t, n, i) {
                        var r, a, o;
                        if (e.prototype.updateSize.call(this, t, n, i), this.axisWidth = s.matchCellWidths(this.el.find(".fc-axis")), this.timeGrid.colEls) {
                            var l = this.el.find(".fc-row:not(.fc-scroller *)");
                            this.timeGrid.bottomRuleEl.hide(), this.scroller.clear(), s.uncompensateScroll(l), this.dayGrid && (this.dayGrid.removeSegPopover(), (r = this.opt("eventLimit")) && "number" != typeof r && (r = 5), r && this.dayGrid.limitRows(r)), n || (a = this.computeScrollerHeight(t), this.scroller.setHeight(a), ((o = this.scroller.getScrollbarWidths()).left || o.right) && (s.compensateScroll(l, o), a = this.computeScrollerHeight(t), this.scroller.setHeight(a)), this.scroller.lockOverflow(o), this.timeGrid.getTotalSlatHeight() < a && this.timeGrid.bottomRuleEl.show())
                        } else n || (a = this.computeScrollerHeight(t), this.scroller.setHeight(a))
                    }, t.prototype.computeScrollerHeight = function(e) {
                        return e - s.subtractInnerElHeight(this.el, this.scroller.el)
                    }, t.prototype.computeInitialDateScroll = function() {
                        var e = o.duration(this.opt("scrollTime")),
                            t = this.timeGrid.computeTimeTop(e);
                        return (t = Math.ceil(t)) && t++, {
                            top: t
                        }
                    }, t.prototype.queryDateScroll = function() {
                        return {
                            top: this.scroller.getScrollTop()
                        }
                    }, t.prototype.applyDateScroll = function(e) {
                        void 0 !== e.top && this.scroller.setScrollTop(e.top)
                    }, t.prototype.getHitFootprint = function(e) {
                        return e.component.getHitFootprint(e)
                    }, t.prototype.getHitEl = function(e) {
                        return e.component.getHitEl(e)
                    }, t.prototype.executeEventRender = function(e) {
                        var t, n, i = {},
                            r = {};
                        for (t in e)(n = e[t]).getEventDef().isAllDay() ? i[t] = n : r[t] = n;
                        this.timeGrid.executeEventRender(r), this.dayGrid && this.dayGrid.executeEventRender(i)
                    }, t.prototype.renderDrag = function(e, t, n) {
                        var i = f(e),
                            r = !1;
                        return r = this.timeGrid.renderDrag(i.timed, t, n), this.dayGrid && (r = this.dayGrid.renderDrag(i.allDay, t, n) || r), r
                    }, t.prototype.renderEventResize = function(e, t, n) {
                        var i = f(e);
                        this.timeGrid.renderEventResize(i.timed, t, n), this.dayGrid && this.dayGrid.renderEventResize(i.allDay, t, n)
                    }, t.prototype.renderSelectionFootprint = function(e) {
                        e.isAllDay ? this.dayGrid && this.dayGrid.renderSelectionFootprint(e) : this.timeGrid.renderSelectionFootprint(e)
                    }, t
                }(u.default);

            function f(e) {
                var t, n = [],
                    i = [];
                for (t = 0; t < e.length; t++) e[t].componentFootprint.isAllDay ? n.push(e[t]) : i.push(e[t]);
                return {
                    allDay: n,
                    timed: i
                }
            }
            t.default = p, p.prototype.timeGridClass = c.default, p.prototype.dayGridClass = h.default, i = {
                renderHeadIntroHtml: function() {
                    var e, t = this.view,
                        n = t.calendar,
                        i = n.msToUtcMoment(this.dateProfile.renderUnzonedRange.startMs, !0);
                    return this.opt("weekNumbers") ? (e = i.format(this.opt("smallWeekFormat")), '<th class="fc-axis fc-week-number ' + n.theme.getClass("widgetHeader") + '" ' + t.axisStyleAttr() + ">" + t.buildGotoAnchorHtml({
                        date: i,
                        type: "week",
                        forceOff: this.colCnt > 1
                    }, s.htmlEscape(e)) + "</th>") : '<th class="fc-axis ' + n.theme.getClass("widgetHeader") + '" ' + t.axisStyleAttr() + "></th>"
                },
                renderBgIntroHtml: function() {
                    var e = this.view;
                    return '<td class="fc-axis ' + e.calendar.theme.getClass("widgetContent") + '" ' + e.axisStyleAttr() + "></td>"
                },
                renderIntroHtml: function() {
                    return '<td class="fc-axis" ' + this.view.axisStyleAttr() + "></td>"
                }
            }, r = {
                renderBgIntroHtml: function() {
                    var e = this.view;
                    return '<td class="fc-axis ' + e.calendar.theme.getClass("widgetContent") + '" ' + e.axisStyleAttr() + "><span>" + e.getAllDayHtml() + "</span></td>"
                },
                renderIntroHtml: function() {
                    return '<td class="fc-axis" ' + this.view.axisStyleAttr() + "></td>"
                }
            }
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(3),
                a = n(0),
                o = n(4),
                l = n(42),
                s = n(61),
                d = n(65),
                u = n(60),
                c = n(58),
                h = n(5),
                p = n(12),
                f = n(240),
                m = n(241),
                g = n(242),
                _ = [{
                    hours: 1
                }, {
                    minutes: 30
                }, {
                    minutes: 15
                }, {
                    seconds: 30
                }, {
                    seconds: 15
                }],
                y = function(e) {
                    function t(t) {
                        var n = e.call(this, t) || this;
                        return n.processOptions(), n
                    }
                    return i.__extends(t, e), t.prototype.componentFootprintToSegs = function(e) {
                        var t, n = this.sliceRangeByTimes(e.unzonedRange);
                        for (t = 0; t < n.length; t++) this.isRTL ? n[t].col = this.daysPerRow - 1 - n[t].dayIndex : n[t].col = n[t].dayIndex;
                        return n
                    }, t.prototype.sliceRangeByTimes = function(e) {
                        var t, n, i = [];
                        for (n = 0; n < this.daysPerRow; n++)(t = e.intersect(this.dayRanges[n])) && i.push({
                            startMs: t.startMs,
                            endMs: t.endMs,
                            isStart: t.isStart,
                            isEnd: t.isEnd,
                            dayIndex: n
                        });
                        return i
                    }, t.prototype.processOptions = function() {
                        var e, t = this.opt("slotDuration"),
                            n = this.opt("snapDuration");
                        t = a.duration(t), n = n ? a.duration(n) : t, this.slotDuration = t, this.snapDuration = n, this.snapsPerSlot = t / n, e = this.opt("slotLabelFormat"), r.isArray(e) && (e = e[e.length - 1]), this.labelFormat = e || this.opt("smallTimeFormat"), e = this.opt("slotLabelInterval"), this.labelInterval = e ? a.duration(e) : this.computeLabelInterval(t)
                    }, t.prototype.computeLabelInterval = function(e) {
                        var t, n, i;
                        for (t = _.length - 1; t >= 0; t--)
                            if (n = a.duration(_[t]), i = o.divideDurationByDuration(n, e), o.isInt(i) && i > 1) return n;
                        return a.duration(e)
                    }, t.prototype.renderDates = function(e) {
                        this.dateProfile = e, this.updateDayTable(), this.renderSlats(), this.renderColumns()
                    }, t.prototype.unrenderDates = function() {
                        this.unrenderColumns()
                    }, t.prototype.renderSkeleton = function() {
                        var e = this.view.calendar.theme;
                        this.el.html('<div class="fc-bg"></div><div class="fc-slats"></div><hr class="fc-divider ' + e.getClass("widgetHeader") + '" style="display:none" />'), this.bottomRuleEl = this.el.find("hr")
                    }, t.prototype.renderSlats = function() {
                        var e = this.view.calendar.theme;
                        this.slatContainerEl = this.el.find("> .fc-slats").html('<table class="' + e.getClass("tableGrid") + '">' + this.renderSlatRowHtml() + "</table>"), this.slatEls = this.slatContainerEl.find("tr"), this.slatCoordCache = new c.default({
                            els: this.slatEls,
                            isVertical: !0
                        })
                    }, t.prototype.renderSlatRowHtml = function() {
                        for (var e, t, n, i = this.view, r = i.calendar, l = r.theme, s = this.isRTL, d = this.dateProfile, u = "", c = a.duration(+d.minTime), h = a.duration(0); c < d.maxTime;) e = r.msToUtcMoment(d.renderUnzonedRange.startMs).time(c), t = o.isInt(o.divideDurationByDuration(h, this.labelInterval)), n = '<td class="fc-axis fc-time ' + l.getClass("widgetContent") + '" ' + i.axisStyleAttr() + ">" + (t ? "<span>" + o.htmlEscape(e.format(this.labelFormat)) + "</span>" : "") + "</td>", u += '<tr data-time="' + e.format("HH:mm:ss") + '"' + (t ? "" : ' class="fc-minor"') + ">" + (s ? "" : n) + '<td class="' + l.getClass("widgetContent") + '"/>' + (s ? n : "") + "</tr>", c.add(this.slotDuration), h.add(this.slotDuration);
                        return u
                    }, t.prototype.renderColumns = function() {
                        var e = this.dateProfile,
                            t = this.view.calendar.theme;
                        this.dayRanges = this.dayDates.map(function(t) {
                            return new h.default(t.clone().add(e.minTime), t.clone().add(e.maxTime))
                        }), this.headContainerEl && this.headContainerEl.html(this.renderHeadHtml()), this.el.find("> .fc-bg").html('<table class="' + t.getClass("tableGrid") + '">' + this.renderBgTrHtml(0) + "</table>"), this.colEls = this.el.find(".fc-day, .fc-disabled-day"), this.colCoordCache = new c.default({
                            els: this.colEls,
                            isHorizontal: !0
                        }), this.renderContentSkeleton()
                    }, t.prototype.unrenderColumns = function() {
                        this.unrenderContentSkeleton()
                    }, t.prototype.renderContentSkeleton = function() {
                        var e, t, n = "";
                        for (e = 0; e < this.colCnt; e++) n += '<td><div class="fc-content-col"><div class="fc-event-container fc-helper-container"></div><div class="fc-event-container"></div><div class="fc-highlight-container"></div><div class="fc-bgevent-container"></div><div class="fc-business-container"></div></div></td>';
                        t = this.contentSkeletonEl = r('<div class="fc-content-skeleton"><table><tr>' + n + "</tr></table></div>"), this.colContainerEls = t.find(".fc-content-col"), this.helperContainerEls = t.find(".fc-helper-container"), this.fgContainerEls = t.find(".fc-event-container:not(.fc-helper-container)"), this.bgContainerEls = t.find(".fc-bgevent-container"), this.highlightContainerEls = t.find(".fc-highlight-container"), this.businessContainerEls = t.find(".fc-business-container"), this.bookendCells(t.find("tr")), this.el.append(t)
                    }, t.prototype.unrenderContentSkeleton = function() {
                        this.contentSkeletonEl && (this.contentSkeletonEl.remove(), this.contentSkeletonEl = null, this.colContainerEls = null, this.helperContainerEls = null, this.fgContainerEls = null, this.bgContainerEls = null, this.highlightContainerEls = null, this.businessContainerEls = null)
                    }, t.prototype.groupSegsByCol = function(e) {
                        var t, n = [];
                        for (t = 0; t < this.colCnt; t++) n.push([]);
                        for (t = 0; t < e.length; t++) n[e[t].col].push(e[t]);
                        return n
                    }, t.prototype.attachSegsByCol = function(e, t) {
                        var n, i, r;
                        for (n = 0; n < this.colCnt; n++)
                            for (i = e[n], r = 0; r < i.length; r++) t.eq(n).append(i[r].el)
                    }, t.prototype.getNowIndicatorUnit = function() {
                        return "minute"
                    }, t.prototype.renderNowIndicator = function(e) {
                        if (this.colContainerEls) {
                            var t, n = this.componentFootprintToSegs(new p.default(new h.default(e, e.valueOf() + 1), !1)),
                                i = this.computeDateTop(e, e),
                                a = [];
                            for (t = 0; t < n.length; t++) a.push(r('<div class="fc-now-indicator fc-now-indicator-line"></div>').css("top", i).appendTo(this.colContainerEls.eq(n[t].col))[0]);
                            n.length > 0 && a.push(r('<div class="fc-now-indicator fc-now-indicator-arrow"></div>').css("top", i).appendTo(this.el.find(".fc-content-skeleton"))[0]), this.nowIndicatorEls = r(a)
                        }
                    }, t.prototype.unrenderNowIndicator = function() {
                        this.nowIndicatorEls && (this.nowIndicatorEls.remove(), this.nowIndicatorEls = null)
                    }, t.prototype.updateSize = function(t, n, i) {
                        e.prototype.updateSize.call(this, t, n, i), this.slatCoordCache.build(), i && this.updateSegVerticals([].concat(this.eventRenderer.getSegs(), this.businessSegs || []))
                    }, t.prototype.getTotalSlatHeight = function() {
                        return this.slatContainerEl.outerHeight()
                    }, t.prototype.computeDateTop = function(e, t) {
                        return this.computeTimeTop(a.duration(e - t.clone().stripTime()))
                    }, t.prototype.computeTimeTop = function(e) {
                        var t, n, i = this.slatEls.length,
                            r = (e - this.dateProfile.minTime) / this.slotDuration;
                        return r = Math.max(0, r), r = Math.min(i, r), t = Math.floor(r), n = r - (t = Math.min(t, i - 1)), this.slatCoordCache.getTopPosition(t) + this.slatCoordCache.getHeight(t) * n
                    }, t.prototype.updateSegVerticals = function(e) {
                        this.computeSegVerticals(e), this.assignSegVerticals(e)
                    }, t.prototype.computeSegVerticals = function(e) {
                        var t, n, i, r = this.opt("agendaEventMinHeight");
                        for (t = 0; t < e.length; t++) n = e[t], i = this.dayDates[n.dayIndex], n.top = this.computeDateTop(n.startMs, i), n.bottom = Math.max(n.top + r, this.computeDateTop(n.endMs, i))
                    }, t.prototype.assignSegVerticals = function(e) {
                        var t, n;
                        for (t = 0; t < e.length; t++)(n = e[t]).el.css(this.generateSegVerticalCss(n))
                    }, t.prototype.generateSegVerticalCss = function(e) {
                        return {
                            top: e.top,
                            bottom: -e.bottom
                        }
                    }, t.prototype.prepareHits = function() {
                        this.colCoordCache.build(), this.slatCoordCache.build()
                    }, t.prototype.releaseHits = function() {
                        this.colCoordCache.clear()
                    }, t.prototype.queryHit = function(e, t) {
                        var n = this.snapsPerSlot,
                            i = this.colCoordCache,
                            r = this.slatCoordCache;
                        if (i.isLeftInBounds(e) && r.isTopInBounds(t)) {
                            var a = i.getHorizontalIndex(e),
                                o = r.getVerticalIndex(t);
                            if (null != a && null != o) {
                                var l = r.getTopOffset(o),
                                    s = r.getHeight(o),
                                    d = (t - l) / s,
                                    u = Math.floor(d * n),
                                    c = l + u / n * s,
                                    h = l + (u + 1) / n * s;
                                return {
                                    col: a,
                                    snap: o * n + u,
                                    component: this,
                                    left: i.getLeftOffset(a),
                                    right: i.getRightOffset(a),
                                    top: c,
                                    bottom: h
                                }
                            }
                        }
                    }, t.prototype.getHitFootprint = function(e) {
                        var t, n = this.getCellDate(0, e.col),
                            i = this.computeSnapTime(e.snap);
                        return n.time(i), t = n.clone().add(this.snapDuration), new p.default(new h.default(n, t), !1)
                    }, t.prototype.computeSnapTime = function(e) {
                        return a.duration(this.dateProfile.minTime + this.snapDuration * e)
                    }, t.prototype.getHitEl = function(e) {
                        return this.colEls.eq(e.col)
                    }, t.prototype.renderDrag = function(e, t, n) {
                        var i;
                        if (t) {
                            if (e.length) return this.helperRenderer.renderEventDraggingFootprints(e, t, n), !0
                        } else
                            for (i = 0; i < e.length; i++) this.renderHighlight(e[i].componentFootprint)
                    }, t.prototype.unrenderDrag = function() {
                        this.unrenderHighlight(), this.helperRenderer.unrender()
                    }, t.prototype.renderEventResize = function(e, t, n) {
                        this.helperRenderer.renderEventResizingFootprints(e, t, n)
                    }, t.prototype.unrenderEventResize = function() {
                        this.helperRenderer.unrender()
                    }, t.prototype.renderSelectionFootprint = function(e) {
                        this.opt("selectHelper") ? this.helperRenderer.renderComponentFootprint(e) : this.renderHighlight(e)
                    }, t.prototype.unrenderSelection = function() {
                        this.helperRenderer.unrender(), this.unrenderHighlight()
                    }, t
                }(l.default);
            t.default = y, y.prototype.eventRendererClass = f.default, y.prototype.businessHourRendererClass = s.default, y.prototype.helperRendererClass = m.default, y.prototype.fillRendererClass = g.default, d.default.mixInto(y), u.default.mixInto(y)
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(4),
                a = function(e) {
                    function t(t, n) {
                        var i = e.call(this, t, n) || this;
                        return i.timeGrid = t, i
                    }
                    return i.__extends(t, e), t.prototype.renderFgSegs = function(e) {
                        this.renderFgSegsIntoContainers(e, this.timeGrid.fgContainerEls)
                    }, t.prototype.renderFgSegsIntoContainers = function(e, t) {
                        var n, i;
                        for (n = this.timeGrid.groupSegsByCol(e), i = 0; i < this.timeGrid.colCnt; i++) this.updateFgSegCoords(n[i]);
                        this.timeGrid.attachSegsByCol(n, t)
                    }, t.prototype.unrenderFgSegs = function() {
                        this.fgSegs && this.fgSegs.forEach(function(e) {
                            e.el.remove()
                        })
                    }, t.prototype.computeEventTimeFormat = function() {
                        return this.opt("noMeridiemTimeFormat")
                    }, t.prototype.computeDisplayEventEnd = function() {
                        return !0
                    }, t.prototype.fgSegHtml = function(e, t) {
                        var n, i, a, o = this.view,
                            l = o.calendar,
                            s = e.footprint.componentFootprint,
                            d = s.isAllDay,
                            u = e.footprint.eventDef,
                            c = o.isEventDefDraggable(u),
                            h = !t && e.isStart && o.isEventDefResizableFromStart(u),
                            p = !t && e.isEnd && o.isEventDefResizableFromEnd(u),
                            f = this.getSegClasses(e, c, h || p),
                            m = r.cssToStr(this.getSkinCss(u));
                        if (f.unshift("fc-time-grid-event", "fc-v-event"), o.isMultiDayRange(s.unzonedRange)) {
                            if (e.isStart || e.isEnd) {
                                var g = l.msToMoment(e.startMs),
                                    _ = l.msToMoment(e.endMs);
                                n = this._getTimeText(g, _, d), i = this._getTimeText(g, _, d, "LT"), a = this._getTimeText(g, _, d, null, !1)
                            }
                        } else n = this.getTimeText(e.footprint), i = this.getTimeText(e.footprint, "LT"), a = this.getTimeText(e.footprint, null, !1);
                        return '<a class="' + f.join(" ") + '"' + (u.url ? ' href="' + r.htmlEscape(u.url) + '"' : "") + (m ? ' style="' + m + '"' : "") + '><div class="fc-content">' + (n ? '<div class="fc-time" data-start="' + r.htmlEscape(a) + '" data-full="' + r.htmlEscape(i) + '"><span>' + r.htmlEscape(n) + "</span></div>" : "") + (u.title ? '<div class="fc-title">' + r.htmlEscape(u.title) + "</div>" : "") + '</div><div class="fc-bg"/>' + (p ? '<div class="fc-resizer fc-end-resizer" />' : "") + "</a>"
                    }, t.prototype.updateFgSegCoords = function(e) {
                        this.timeGrid.computeSegVerticals(e), this.computeFgSegHorizontals(e), this.timeGrid.assignSegVerticals(e), this.assignFgSegHorizontals(e)
                    }, t.prototype.computeFgSegHorizontals = function(e) {
                        var t, n, i;
                        if (this.sortEventSegs(e), function(e) {
                                var t, n, i, r, a;
                                for (t = 0; t < e.length; t++)
                                    for (n = e[t], i = 0; i < n.length; i++)
                                        for ((r = n[i]).forwardSegs = [], a = t + 1; a < e.length; a++) l(r, e[a], r.forwardSegs)
                            }(t = function(e) {
                                var t, n, i, r = [];
                                for (t = 0; t < e.length; t++) {
                                    for (n = e[t], i = 0; i < r.length && l(n, r[i]).length; i++);
                                    n.level = i, (r[i] || (r[i] = [])).push(n)
                                }
                                return r
                            }(e)), n = t[0]) {
                            for (i = 0; i < n.length; i++) o(n[i]);
                            for (i = 0; i < n.length; i++) this.computeFgSegForwardBack(n[i], 0, 0)
                        }
                    }, t.prototype.computeFgSegForwardBack = function(e, t, n) {
                        var i, r = e.forwardSegs;
                        if (void 0 === e.forwardCoord)
                            for (r.length ? (this.sortForwardSegs(r), this.computeFgSegForwardBack(r[0], t + 1, n), e.forwardCoord = r[0].backwardCoord) : e.forwardCoord = 1, e.backwardCoord = e.forwardCoord - (e.forwardCoord - n) / (t + 1), i = 0; i < r.length; i++) this.computeFgSegForwardBack(r[i], 0, e.forwardCoord)
                    }, t.prototype.sortForwardSegs = function(e) {
                        e.sort(r.proxy(this, "compareForwardSegs"))
                    }, t.prototype.compareForwardSegs = function(e, t) {
                        return t.forwardPressure - e.forwardPressure || (e.backwardCoord || 0) - (t.backwardCoord || 0) || this.compareEventSegs(e, t)
                    }, t.prototype.assignFgSegHorizontals = function(e) {
                        var t, n;
                        for (t = 0; t < e.length; t++)(n = e[t]).el.css(this.generateFgSegHorizontalCss(n)), n.footprint.eventDef.title && n.bottom - n.top < 30 && n.el.addClass("fc-short")
                    }, t.prototype.generateFgSegHorizontalCss = function(e) {
                        var t, n, i = this.opt("slotEventOverlap"),
                            r = e.backwardCoord,
                            a = e.forwardCoord,
                            o = this.timeGrid.generateSegVerticalCss(e),
                            l = this.timeGrid.isRTL;
                        return i && (a = Math.min(1, r + 2 * (a - r))), l ? (t = 1 - a, n = r) : (t = r, n = 1 - a), o.zIndex = e.level + 1, o.left = 100 * t + "%", o.right = 100 * n + "%", i && e.forwardPressure && (o[l ? "marginLeft" : "marginRight"] = 20), o
                    }, t
                }(n(44).default);

            function o(e) {
                var t, n, i = e.forwardSegs,
                    r = 0;
                if (void 0 === e.forwardPressure) {
                    for (t = 0; t < i.length; t++) o(n = i[t]), r = Math.max(r, 1 + n.forwardPressure);
                    e.forwardPressure = r
                }
            }

            function l(e, t, n) {
                void 0 === n && (n = []);
                for (var i = 0; i < t.length; i++) r = e, a = t[i], r.bottom > a.top && r.top < a.bottom && n.push(t[i]);
                var r, a;
                return n
            }
            t.default = a
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(3),
                a = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return i.__extends(t, e), t.prototype.renderSegs = function(e, t) {
                        var n, i, a, o = [];
                        for (this.eventRenderer.renderFgSegsIntoContainers(e, this.component.helperContainerEls), n = 0; n < e.length; n++) i = e[n], t && t.col === i.col && (a = t.el, i.el.css({
                            left: a.css("left"),
                            right: a.css("right"),
                            "margin-left": a.css("margin-left"),
                            "margin-right": a.css("margin-right")
                        })), o.push(i.el[0]);
                        return r(o)
                    }, t
                }(n(63).default);
            t.default = a
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return i.__extends(t, e), t.prototype.attachSegEls = function(e, t) {
                        var n, i = this.component;
                        return "bgEvent" === e ? n = i.bgContainerEls : "businessHours" === e ? n = i.businessContainerEls : "highlight" === e && (n = i.highlightContainerEls), i.updateSegVerticals(t), i.attachSegsByCol(i.groupSegsByCol(t), n), t.map(function(e) {
                            return e.el[0]
                        })
                    }, t
                }(n(62).default);
            t.default = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(3),
                a = n(4),
                o = function(e) {
                    function t(t, n) {
                        var i = e.call(this, t, n) || this;
                        return i.dayGrid = t, i
                    }
                    return i.__extends(t, e), t.prototype.renderBgRanges = function(t) {
                        t = r.grep(t, function(e) {
                            return e.eventDef.isAllDay()
                        }), e.prototype.renderBgRanges.call(this, t)
                    }, t.prototype.renderFgSegs = function(e) {
                        var t = this.rowStructs = this.renderSegRows(e);
                        this.dayGrid.rowEls.each(function(e, n) {
                            r(n).find(".fc-content-skeleton > table").append(t[e].tbodyEl)
                        })
                    }, t.prototype.unrenderFgSegs = function() {
                        for (var e, t = this.rowStructs || []; e = t.pop();) e.tbodyEl.remove();
                        this.rowStructs = null
                    }, t.prototype.renderSegRows = function(e) {
                        var t, n, i = [];
                        for (t = this.groupSegRows(e), n = 0; n < t.length; n++) i.push(this.renderSegRow(n, t[n]));
                        return i
                    }, t.prototype.renderSegRow = function(e, t) {
                        var n, i, a, o, l, s, d, u = this.dayGrid.colCnt,
                            c = this.buildSegLevels(t),
                            h = Math.max(1, c.length),
                            p = r("<tbody/>"),
                            f = [],
                            m = [],
                            g = [];

                        function _(e) {
                            for (; a < e;)(d = (g[n - 1] || [])[a]) ? d.attr("rowspan", parseInt(d.attr("rowspan") || 1, 10) + 1) : (d = r("<td/>"), o.append(d)), m[n][a] = d, g[n][a] = d, a++
                        }
                        for (n = 0; n < h; n++) {
                            if (i = c[n], a = 0, o = r("<tr/>"), f.push([]), m.push([]), g.push([]), i)
                                for (l = 0; l < i.length; l++) {
                                    for (_((s = i[l]).leftCol), d = r('<td class="fc-event-container"/>').append(s.el), s.leftCol !== s.rightCol ? d.attr("colspan", s.rightCol - s.leftCol + 1) : g[n][a] = d; a <= s.rightCol;) m[n][a] = d, f[n][a] = s, a++;
                                    o.append(d)
                                }
                            _(u), this.dayGrid.bookendCells(o), p.append(o)
                        }
                        return {
                            row: e,
                            tbodyEl: p,
                            cellMatrix: m,
                            segMatrix: f,
                            segLevels: c,
                            segs: t
                        }
                    }, t.prototype.buildSegLevels = function(e) {
                        var t, n, i, r = [];
                        for (this.sortEventSegs(e), t = 0; t < e.length; t++) {
                            for (n = e[t], i = 0; i < r.length && l(n, r[i]); i++);
                            n.level = i, (r[i] || (r[i] = [])).push(n)
                        }
                        for (i = 0; i < r.length; i++) r[i].sort(s);
                        return r
                    }, t.prototype.groupSegRows = function(e) {
                        var t, n = [];
                        for (t = 0; t < this.dayGrid.rowCnt; t++) n.push([]);
                        for (t = 0; t < e.length; t++) n[e[t].row].push(e[t]);
                        return n
                    }, t.prototype.computeEventTimeFormat = function() {
                        return this.opt("extraSmallTimeFormat")
                    }, t.prototype.computeDisplayEventEnd = function() {
                        return 1 === this.dayGrid.colCnt
                    }, t.prototype.fgSegHtml = function(e, t) {
                        var n, i, r = this.view,
                            o = e.footprint.eventDef,
                            l = e.footprint.componentFootprint.isAllDay,
                            s = r.isEventDefDraggable(o),
                            d = !t && l && e.isStart && r.isEventDefResizableFromStart(o),
                            u = !t && l && e.isEnd && r.isEventDefResizableFromEnd(o),
                            c = this.getSegClasses(e, s, d || u),
                            h = a.cssToStr(this.getSkinCss(o)),
                            p = "";
                        return c.unshift("fc-day-grid-event", "fc-h-event"), e.isStart && (n = this.getTimeText(e.footprint)) && (p = '<span class="fc-time">' + a.htmlEscape(n) + "</span>"), i = '<span class="fc-title">' + (a.htmlEscape(o.title || "") || "&nbsp;") + "</span>", '<a class="' + c.join(" ") + '"' + (o.url ? ' href="' + a.htmlEscape(o.url) + '"' : "") + (h ? ' style="' + h + '"' : "") + '><div class="fc-content">' + (this.dayGrid.isRTL ? i + " " + p : p + " " + i) + "</div>" + (d ? '<div class="fc-resizer fc-start-resizer" />' : "") + (u ? '<div class="fc-resizer fc-end-resizer" />' : "") + "</a>"
                    }, t
                }(n(44).default);

            function l(e, t) {
                var n, i;
                for (n = 0; n < t.length; n++)
                    if ((i = t[n]).leftCol <= e.rightCol && i.rightCol >= e.leftCol) return !0;
                return !1
            }

            function s(e, t) {
                return e.leftCol - t.leftCol
            }
            t.default = o
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(3),
                a = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return i.__extends(t, e), t.prototype.renderSegs = function(e, t) {
                        var n, i = [];
                        return n = this.eventRenderer.renderSegRows(e), this.component.rowEls.each(function(e, a) {
                            var o, l, s = r(a),
                                d = r('<div class="fc-helper-skeleton"><table/></div>');
                            t && t.row === e ? l = t.el.position().top : ((o = s.find(".fc-content-skeleton tbody")).length || (o = s.find(".fc-content-skeleton table")), l = o.position().top), d.css("top", l).find("table").append(n[e].tbodyEl), s.append(d), i.push(d[0])
                        }), r(i)
                    }, t
                }(n(63).default);
            t.default = a
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(3),
                a = function(e) {
                    function t() {
                        var t = null !== e && e.apply(this, arguments) || this;
                        return t.fillSegTag = "td", t
                    }
                    return i.__extends(t, e), t.prototype.attachSegEls = function(e, t) {
                        var n, i, r, a = [];
                        for (n = 0; n < t.length; n++) i = t[n], r = this.renderFillRow(e, i), this.component.rowEls.eq(i.row).append(r), a.push(r[0]);
                        return a
                    }, t.prototype.renderFillRow = function(e, t) {
                        var n, i, a, o = this.component.colCnt,
                            l = t.leftCol,
                            s = t.rightCol + 1;
                        return n = "businessHours" === e ? "bgevent" : e.toLowerCase(), a = (i = r('<div class="fc-' + n + '-skeleton"><table><tr/></table></div>')).find("tr"), l > 0 && a.append(new Array(l + 1).join("<td/>")), a.append(t.el.attr("colspan", s - l)), s < o && a.append(new Array(o - s + 1).join("<td/>")), this.component.bookendCells(a), i
                    }, t
                }(n(62).default);
            t.default = a
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(0),
                a = n(4),
                o = n(67),
                l = n(247),
                s = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return i.__extends(t, e), t.prototype.setGridHeight = function(e, t) {
                        t && (e *= this.dayGrid.rowCnt / 6), a.distributeHeight(this.dayGrid.rowEls, e, !t)
                    }, t.prototype.isDateInOtherMonth = function(e, t) {
                        return e.month() !== r.utc(t.currentUnzonedRange.startMs).month()
                    }, t
                }(o.default);
            t.default = s, s.prototype.dateProfileGeneratorClass = l.default
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(68),
                a = n(5),
                o = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return i.__extends(t, e), t.prototype.buildRenderRange = function(t, n, i) {
                        var r, o = e.prototype.buildRenderRange.call(this, t, n, i),
                            l = this.msToUtcMoment(o.startMs, i),
                            s = this.msToUtcMoment(o.endMs, i);
                        return this.opt("fixedWeekCount") && (r = Math.ceil(s.diff(l, "weeks", !0)), s.add(6 - r, "weeks")), new a.default(l, s)
                    }, t
                }(r.default);
            t.default = o
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(3),
                a = n(4),
                o = n(5),
                l = n(43),
                s = n(41),
                d = n(249),
                u = n(250),
                c = function(e) {
                    function t(t, n) {
                        var i = e.call(this, t, n) || this;
                        return i.segSelector = ".fc-list-item", i.scroller = new s.default({
                            overflowX: "hidden",
                            overflowY: "auto"
                        }), i
                    }
                    return i.__extends(t, e), t.prototype.renderSkeleton = function() {
                        this.el.addClass("fc-list-view " + this.calendar.theme.getClass("listView")), this.scroller.render(), this.scroller.el.appendTo(this.el), this.contentEl = this.scroller.scrollEl
                    }, t.prototype.unrenderSkeleton = function() {
                        this.scroller.destroy()
                    }, t.prototype.updateSize = function(t, n, i) {
                        e.prototype.updateSize.call(this, t, n, i), this.scroller.clear(), n || this.scroller.setHeight(this.computeScrollerHeight(t))
                    }, t.prototype.computeScrollerHeight = function(e) {
                        return e - a.subtractInnerElHeight(this.el, this.scroller.el)
                    }, t.prototype.renderDates = function(e) {
                        for (var t = this.calendar, n = t.msToUtcMoment(e.renderUnzonedRange.startMs, !0), i = t.msToUtcMoment(e.renderUnzonedRange.endMs, !0), r = [], a = []; n < i;) r.push(n.clone()), a.push(new o.default(n, n.clone().add(1, "day"))), n.add(1, "day");
                        this.dayDates = r, this.dayRanges = a
                    }, t.prototype.componentFootprintToSegs = function(e) {
                        var t, n, i, r = this.dayRanges,
                            a = [];
                        for (t = 0; t < r.length; t++)
                            if ((n = e.unzonedRange.intersect(r[t])) && (i = {
                                    startMs: n.startMs,
                                    endMs: n.endMs,
                                    isStart: n.isStart,
                                    isEnd: n.isEnd,
                                    dayIndex: t
                                }, a.push(i), !i.isEnd && !e.isAllDay && t + 1 < r.length && e.unzonedRange.endMs < r[t + 1].startMs + this.nextDayThreshold)) {
                                i.endMs = e.unzonedRange.endMs, i.isEnd = !0;
                                break
                            } return a
                    }, t.prototype.renderEmptyMessage = function() {
                        this.contentEl.html('<div class="fc-list-empty-wrap2"><div class="fc-list-empty-wrap1"><div class="fc-list-empty">' + a.htmlEscape(this.opt("noEventsMessage")) + "</div></div></div>")
                    }, t.prototype.renderSegList = function(e) {
                        var t, n, i, a = this.groupSegsByDay(e),
                            o = r('<table class="fc-list-table ' + this.calendar.theme.getClass("tableList") + '"><tbody/></table>'),
                            l = o.find("tbody");
                        for (t = 0; t < a.length; t++)
                            if (n = a[t])
                                for (l.append(this.dayHeaderHtml(this.dayDates[t])), this.eventRenderer.sortEventSegs(n), i = 0; i < n.length; i++) l.append(n[i].el);
                        this.contentEl.empty().append(o)
                    }, t.prototype.groupSegsByDay = function(e) {
                        var t, n, i = [];
                        for (t = 0; t < e.length; t++)(i[(n = e[t]).dayIndex] || (i[n.dayIndex] = [])).push(n);
                        return i
                    }, t.prototype.dayHeaderHtml = function(e) {
                        var t = this.opt("listDayFormat"),
                            n = this.opt("listDayAltFormat");
                        return '<tr class="fc-list-heading" data-date="' + e.format("YYYY-MM-DD") + '"><td class="' + (this.calendar.theme.getClass("tableListHeading") || this.calendar.theme.getClass("widgetHeader")) + '" colspan="3">' + (t ? this.buildGotoAnchorHtml(e, {
                            class: "fc-list-heading-main"
                        }, a.htmlEscape(e.format(t))) : "") + (n ? this.buildGotoAnchorHtml(e, {
                            class: "fc-list-heading-alt"
                        }, a.htmlEscape(e.format(n))) : "") + "</td></tr>"
                    }, t
                }(l.default);
            t.default = c, c.prototype.eventRendererClass = d.default, c.prototype.eventPointingClass = u.default
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(4),
                a = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return i.__extends(t, e), t.prototype.renderFgSegs = function(e) {
                        e.length ? this.component.renderSegList(e) : this.component.renderEmptyMessage()
                    }, t.prototype.fgSegHtml = function(e) {
                        var t, n = this.view,
                            i = n.calendar,
                            a = i.theme,
                            o = e.footprint,
                            l = o.eventDef,
                            s = o.componentFootprint,
                            d = l.url,
                            u = ["fc-list-item"].concat(this.getClasses(l)),
                            c = this.getBgColor(l);
                        return t = s.isAllDay ? n.getAllDayHtml() : n.isMultiDayRange(s.unzonedRange) ? e.isStart || e.isEnd ? r.htmlEscape(this._getTimeText(i.msToMoment(e.startMs), i.msToMoment(e.endMs), s.isAllDay)) : n.getAllDayHtml() : r.htmlEscape(this.getTimeText(o)), d && u.push("fc-has-url"), '<tr class="' + u.join(" ") + '">' + (this.displayEventTime ? '<td class="fc-list-item-time ' + a.getClass("widgetContent") + '">' + (t || "") + "</td>" : "") + '<td class="fc-list-item-marker ' + a.getClass("widgetContent") + '"><span class="fc-event-dot"' + (c ? ' style="background-color:' + c + '"' : "") + '></span></td><td class="fc-list-item-title ' + a.getClass("widgetContent") + '"><a' + (d ? ' href="' + r.htmlEscape(d) + '"' : "") + ">" + r.htmlEscape(l.title || "") + "</a></td></tr>"
                    }, t.prototype.computeEventTimeFormat = function() {
                        return this.opt("mediumTimeFormat")
                    }, t
                }(n(44).default);
            t.default = a
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(3),
                a = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return i.__extends(t, e), t.prototype.handleClick = function(t, n) {
                        var i;
                        e.prototype.handleClick.call(this, t, n), r(n.target).closest("a[href]").length || (i = t.footprint.eventDef.url) && !n.isDefaultPrevented() && (window.location.href = i)
                    }, t
                }(n(64).default);
            t.default = a
        }, , , , , , function(e, t, n) {
            var i = n(3),
                r = n(18),
                a = n(4),
                o = n(232);
            n(11), n(49), n(260), n(261), n(264), n(265), n(266), n(267), i.fullCalendar = r, i.fn.fullCalendar = function(e) {
                var t = Array.prototype.slice.call(arguments, 1),
                    n = this;
                return this.each(function(r, l) {
                    var s, d = i(l),
                        u = d.data("fullCalendar");
                    "string" == typeof e ? "getCalendar" === e ? r || (n = u) : "destroy" === e ? u && (u.destroy(), d.removeData("fullCalendar")) : u ? i.isFunction(u[e]) ? (s = u[e].apply(u, t), r || (n = s), "destroy" === e && d.removeData("fullCalendar")) : a.warn("'" + e + "' is an unknown FullCalendar method.") : a.warn("Attempting to call a FullCalendar method on an element with no calendar.") : u || (u = new o.default(d, e), d.data("fullCalendar", u), u.render())
                }), n
            }, e.exports = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(3),
                r = n(4),
                a = function() {
                    function e(e, t) {
                        this.el = null, this.viewsWithButtons = [], this.calendar = e, this.toolbarOptions = t
                    }
                    return e.prototype.setToolbarOptions = function(e) {
                        this.toolbarOptions = e
                    }, e.prototype.render = function() {
                        var e = this.toolbarOptions.layout,
                            t = this.el;
                        e ? (t ? t.empty() : t = this.el = i("<div class='fc-toolbar " + this.toolbarOptions.extraClasses + "'/>"), t.append(this.renderSection("left")).append(this.renderSection("right")).append(this.renderSection("center")).append('<div class="fc-clear"/>')) : this.removeElement()
                    }, e.prototype.removeElement = function() {
                        this.el && (this.el.remove(), this.el = null)
                    }, e.prototype.renderSection = function(e) {
                        var t = this,
                            n = this.calendar,
                            a = n.theme,
                            o = n.optionsManager,
                            l = n.viewSpecManager,
                            s = i('<div class="fc-' + e + '"/>'),
                            d = this.toolbarOptions.layout[e],
                            u = o.get("customButtons") || {},
                            c = o.overrides.buttonText || {},
                            h = o.get("buttonText") || {};
                        return d && i.each(d.split(" "), function(e, o) {
                            var d, p = i(),
                                f = !0;
                            i.each(o.split(","), function(e, o) {
                                var s, d, m, g, _, y, v, M, b;
                                "title" === o ? (p = p.add(i("<h2>&nbsp;</h2>")), f = !1) : ((s = u[o]) ? (m = function(e) {
                                    s.click && s.click.call(M[0], e)
                                }, (g = a.getCustomButtonIconClass(s)) || (g = a.getIconClass(o)) || (_ = s.text)) : (d = l.getViewSpec(o)) ? (t.viewsWithButtons.push(o), m = function() {
                                    n.changeView(o)
                                }, (_ = d.buttonTextOverride) || (g = a.getIconClass(o)) || (_ = d.buttonTextDefault)) : n[o] && (m = function() {
                                    n[o]()
                                }, (_ = c[o]) || (g = a.getIconClass(o)) || (_ = h[o])), m && (v = ["fc-" + o + "-button", a.getClass("button"), a.getClass("stateDefault")], _ ? (y = r.htmlEscape(_), b = "") : g && (y = "<span class='" + g + "'></span>", b = ' aria-label="' + o + '"'), M = i('<button type="button" class="' + v.join(" ") + '"' + b + ">" + y + "</button>").click(function(e) {
                                    M.hasClass(a.getClass("stateDisabled")) || (m(e), (M.hasClass(a.getClass("stateActive")) || M.hasClass(a.getClass("stateDisabled"))) && M.removeClass(a.getClass("stateHover")))
                                }).mousedown(function() {
                                    M.not("." + a.getClass("stateActive")).not("." + a.getClass("stateDisabled")).addClass(a.getClass("stateDown"))
                                }).mouseup(function() {
                                    M.removeClass(a.getClass("stateDown"))
                                }).hover(function() {
                                    M.not("." + a.getClass("stateActive")).not("." + a.getClass("stateDisabled")).addClass(a.getClass("stateHover"))
                                }, function() {
                                    M.removeClass(a.getClass("stateHover")).removeClass(a.getClass("stateDown"))
                                }), p = p.add(M)))
                            }), f && p.first().addClass(a.getClass("cornerLeft")).end().last().addClass(a.getClass("cornerRight")).end(), p.length > 1 ? (d = i("<div/>"), f && d.addClass(a.getClass("buttonGroup")), d.append(p), s.append(d)) : s.append(p)
                        }), s
                    }, e.prototype.updateTitle = function(e) {
                        this.el && this.el.find("h2").text(e)
                    }, e.prototype.activateButton = function(e) {
                        this.el && this.el.find(".fc-" + e + "-button").addClass(this.calendar.theme.getClass("stateActive"))
                    }, e.prototype.deactivateButton = function(e) {
                        this.el && this.el.find(".fc-" + e + "-button").removeClass(this.calendar.theme.getClass("stateActive"))
                    }, e.prototype.disableButton = function(e) {
                        this.el && this.el.find(".fc-" + e + "-button").prop("disabled", !0).addClass(this.calendar.theme.getClass("stateDisabled"))
                    }, e.prototype.enableButton = function(e) {
                        this.el && this.el.find(".fc-" + e + "-button").prop("disabled", !1).removeClass(this.calendar.theme.getClass("stateDisabled"))
                    }, e.prototype.getViewsWithButtons = function() {
                        return this.viewsWithButtons
                    }, e
                }();
            t.default = a
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(3),
                a = n(4),
                o = n(33),
                l = n(32),
                s = function(e) {
                    function t(t, n) {
                        var i = e.call(this) || this;
                        return i._calendar = t, i.overrides = r.extend({}, n), i.dynamicOverrides = {}, i.compute(), i
                    }
                    return i.__extends(t, e), t.prototype.add = function(e) {
                        var t, n = 0;
                        for (t in this.recordOverrides(e), e) n++;
                        if (1 === n) {
                            if ("height" === t || "contentHeight" === t || "aspectRatio" === t) return void this._calendar.updateViewSize(!0);
                            if ("defaultDate" === t) return;
                            if ("businessHours" === t) return;
                            if (/^(event|select)(Overlap|Constraint|Allow)$/.test(t)) return;
                            if ("timezone" === t) return void this._calendar.view.flash("initialEvents")
                        }
                        this._calendar.renderHeader(), this._calendar.renderFooter(), this._calendar.viewsByType = {}, this._calendar.reinitView()
                    }, t.prototype.compute = function() {
                        var e, t, n, i;
                        e = a.firstDefined(this.dynamicOverrides.locale, this.overrides.locale), (t = l.localeOptionHash[e]) || (e = o.globalDefaults.locale, t = l.localeOptionHash[e] || {}), n = a.firstDefined(this.dynamicOverrides.isRTL, this.overrides.isRTL, t.isRTL, o.globalDefaults.isRTL) ? o.rtlDefaults : {}, this.dirDefaults = n, this.localeDefaults = t, i = o.mergeOptions([o.globalDefaults, n, t, this.overrides, this.dynamicOverrides]), l.populateInstanceComputableOptions(i), this.reset(i)
                    }, t.prototype.recordOverrides = function(e) {
                        var t;
                        for (t in e) this.dynamicOverrides[t] = e[t];
                        this._calendar.viewSpecManager.clearCache(), this.compute()
                    }, t
                }(n(51).default);
            t.default = s
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(0),
                r = n(3),
                a = n(24),
                o = n(4),
                l = n(33),
                s = n(32),
                d = function() {
                    function e(e, t) {
                        this.optionsManager = e, this._calendar = t, this.clearCache()
                    }
                    return e.prototype.clearCache = function() {
                        this.viewSpecCache = {}
                    }, e.prototype.getViewSpec = function(e) {
                        var t = this.viewSpecCache;
                        return t[e] || (t[e] = this.buildViewSpec(e))
                    }, e.prototype.getUnitViewSpec = function(e) {
                        var t, n, i;
                        if (-1 !== r.inArray(e, o.unitsDesc))
                            for (t = this._calendar.header.getViewsWithButtons(), r.each(a.viewHash, function(e) {
                                    t.push(e)
                                }), n = 0; n < t.length; n++)
                                if ((i = this.getViewSpec(t[n])) && i.singleUnit === e) return i
                    }, e.prototype.buildViewSpec = function(e) {
                        for (var t, n, r, s, d, u = this.optionsManager.overrides.views || {}, c = [], h = [], p = [], f = e; f;) t = a.viewHash[f], n = u[f], f = null, "function" == typeof t && (t = {
                            class: t
                        }), t && (c.unshift(t), h.unshift(t.defaults || {}), r = r || t.duration, f = f || t.type), n && (p.unshift(n), r = r || n.duration, f = f || n.type);
                        return (t = o.mergeProps(c)).type = e, !!t.class && ((r = r || this.optionsManager.dynamicOverrides.duration || this.optionsManager.overrides.duration) && (s = i.duration(r)).valueOf() && (d = o.computeDurationGreatestUnit(s, r), t.duration = s, t.durationUnit = d, 1 === s.as(d) && (t.singleUnit = d, p.unshift(u[d] || {}))), t.defaults = l.mergeOptions(h), t.overrides = l.mergeOptions(p), this.buildViewSpecOptions(t), this.buildViewSpecButtonText(t, e), t)
                    }, e.prototype.buildViewSpecOptions = function(e) {
                        var t = this.optionsManager;
                        e.options = l.mergeOptions([l.globalDefaults, e.defaults, t.dirDefaults, t.localeDefaults, t.overrides, e.overrides, t.dynamicOverrides]), s.populateInstanceComputableOptions(e.options)
                    }, e.prototype.buildViewSpecButtonText = function(e, t) {
                        var n = this.optionsManager;

                        function i(n) {
                            var i = n.buttonText || {};
                            return i[t] || (e.buttonTextKey ? i[e.buttonTextKey] : null) || (e.singleUnit ? i[e.singleUnit] : null)
                        }
                        e.buttonTextOverride = i(n.dynamicOverrides) || i(n.overrides) || e.overrides.buttonText, e.buttonTextDefault = i(n.localeDefaults) || i(n.dirDefaults) || e.defaults.buttonText || i(l.globalDefaults) || (e.duration ? this._calendar.humanizeDuration(e.duration) : null) || t
                    }, e
                }();
            t.default = d
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(38),
                r = n(56),
                a = n(223),
                o = n(224);
            i.default.registerClass(r.default), i.default.registerClass(a.default), i.default.registerClass(o.default)
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(57),
                r = n(221),
                a = n(222),
                o = n(262),
                l = n(263);
            i.defineThemeSystem("standard", r.default), i.defineThemeSystem("jquery-ui", a.default), i.defineThemeSystem("bootstrap3", o.default), i.defineThemeSystem("bootstrap4", l.default)
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return i.__extends(t, e), t
                }(n(22).default);
            t.default = r, r.prototype.classes = {
                widget: "fc-bootstrap3",
                tableGrid: "table-bordered",
                tableList: "table",
                tableListHeading: "active",
                buttonGroup: "btn-group",
                button: "btn btn-default",
                stateActive: "active",
                stateDisabled: "disabled",
                today: "alert alert-info",
                popover: "panel panel-default",
                popoverHeader: "panel-heading",
                popoverContent: "panel-body",
                headerRow: "panel-default",
                dayRow: "panel-default",
                listView: "panel panel-default"
            }, r.prototype.baseIconClass = "glyphicon", r.prototype.iconClasses = {
                close: "glyphicon-remove",
                prev: "glyphicon-chevron-left",
                next: "glyphicon-chevron-right",
                prevYear: "glyphicon-backward",
                nextYear: "glyphicon-forward"
            }, r.prototype.iconOverrideOption = "bootstrapGlyphicons", r.prototype.iconOverrideCustomButtonOption = "bootstrapGlyphicon", r.prototype.iconOverridePrefix = "glyphicon-"
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return i.__extends(t, e), t
                }(n(22).default);
            t.default = r, r.prototype.classes = {
                widget: "fc-bootstrap4",
                tableGrid: "table-bordered",
                tableList: "table",
                tableListHeading: "table-active",
                buttonGroup: "btn-group",
                button: "btn btn-primary",
                stateActive: "active",
                stateDisabled: "disabled",
                today: "alert alert-info",
                popover: "card card-primary",
                popoverHeader: "card-header",
                popoverContent: "card-body",
                headerRow: "table-bordered",
                dayRow: "table-bordered",
                listView: "card card-primary"
            }, r.prototype.baseIconClass = "fa", r.prototype.iconClasses = {
                close: "fa-times",
                prev: "fa-chevron-left",
                next: "fa-chevron-right",
                prevYear: "fa-angle-double-left",
                nextYear: "fa-angle-double-right"
            }, r.prototype.iconOverrideOption = "bootstrapFontAwesome", r.prototype.iconOverrideCustomButtonOption = "bootstrapFontAwesome", r.prototype.iconOverridePrefix = "fa-"
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(24),
                r = n(67),
                a = n(246);
            i.defineView("basic", {
                class: r.default
            }), i.defineView("basicDay", {
                type: "basic",
                duration: {
                    days: 1
                }
            }), i.defineView("basicWeek", {
                type: "basic",
                duration: {
                    weeks: 1
                }
            }), i.defineView("month", {
                class: a.default,
                duration: {
                    months: 1
                },
                defaults: {
                    fixedWeekCount: !0
                }
            })
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(24),
                r = n(238);
            i.defineView("agenda", {
                class: r.default,
                defaults: {
                    allDaySlot: !0,
                    slotDuration: "00:30:00",
                    slotEventOverlap: !0
                }
            }), i.defineView("agendaDay", {
                type: "agenda",
                duration: {
                    days: 1
                }
            }), i.defineView("agendaWeek", {
                type: "agenda",
                duration: {
                    weeks: 1
                }
            })
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(24),
                r = n(248);
            i.defineView("list", {
                class: r.default,
                buttonTextKey: "list",
                defaults: {
                    buttonText: "list",
                    listDayFormat: "LL",
                    noEventsMessage: "No events to display"
                }
            }), i.defineView("listDay", {
                type: "list",
                duration: {
                    days: 1
                },
                defaults: {
                    listDayFormat: "dddd"
                }
            }), i.defineView("listWeek", {
                type: "list",
                duration: {
                    weeks: 1
                },
                defaults: {
                    listDayFormat: "dddd",
                    listDayAltFormat: "LL"
                }
            }), i.defineView("listMonth", {
                type: "list",
                duration: {
                    month: 1
                },
                defaults: {
                    listDayAltFormat: "dddd"
                }
            }), i.defineView("listYear", {
                type: "list",
                duration: {
                    year: 1
                },
                defaults: {
                    listDayAltFormat: "dddd"
                }
            })
        }, function(e, t) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }])
    }, e.exports = i(n(0), n(1))
},
function(e, t) {
    e.exports = function(e) {
        return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", {
            enumerable: !0,
            get: function() {
                return e.l
            }
        }), Object.defineProperty(e, "id", {
            enumerable: !0,
            get: function() {
                return e.i
            }
        }), e.webpackPolyfill = 1), e
    }
},
function(e, t, n) {
    var i = {
        "./af": 14,
        "./af.js": 14,
        "./ar": 15,
        "./ar-dz": 16,
        "./ar-dz.js": 16,
        "./ar-kw": 17,
        "./ar-kw.js": 17,
        "./ar-ly": 18,
        "./ar-ly.js": 18,
        "./ar-ma": 19,
        "./ar-ma.js": 19,
        "./ar-sa": 20,
        "./ar-sa.js": 20,
        "./ar-tn": 21,
        "./ar-tn.js": 21,
        "./ar.js": 15,
        "./az": 22,
        "./az.js": 22,
        "./be": 23,
        "./be.js": 23,
        "./bg": 24,
        "./bg.js": 24,
        "./bm": 25,
        "./bm.js": 25,
        "./bn": 26,
        "./bn.js": 26,
        "./bo": 27,
        "./bo.js": 27,
        "./br": 28,
        "./br.js": 28,
        "./bs": 29,
        "./bs.js": 29,
        "./ca": 30,
        "./ca.js": 30,
        "./cs": 31,
        "./cs.js": 31,
        "./cv": 32,
        "./cv.js": 32,
        "./cy": 33,
        "./cy.js": 33,
        "./da": 34,
        "./da.js": 34,
        "./de": 35,
        "./de-at": 36,
        "./de-at.js": 36,
        "./de-ch": 37,
        "./de-ch.js": 37,
        "./de.js": 35,
        "./dv": 38,
        "./dv.js": 38,
        "./el": 39,
        "./el.js": 39,
        "./en-au": 40,
        "./en-au.js": 40,
        "./en-ca": 41,
        "./en-ca.js": 41,
        "./en-gb": 42,
        "./en-gb.js": 42,
        "./en-ie": 43,
        "./en-ie.js": 43,
        "./en-il": 44,
        "./en-il.js": 44,
        "./en-nz": 45,
        "./en-nz.js": 45,
        "./eo": 46,
        "./eo.js": 46,
        "./es": 47,
        "./es-do": 48,
        "./es-do.js": 48,
        "./es-us": 49,
        "./es-us.js": 49,
        "./es.js": 47,
        "./et": 50,
        "./et.js": 50,
        "./eu": 51,
        "./eu.js": 51,
        "./fa": 52,
        "./fa.js": 52,
        "./fi": 53,
        "./fi.js": 53,
        "./fo": 54,
        "./fo.js": 54,
        "./fr": 55,
        "./fr-ca": 56,
        "./fr-ca.js": 56,
        "./fr-ch": 57,
        "./fr-ch.js": 57,
        "./fr.js": 55,
        "./fy": 58,
        "./fy.js": 58,
        "./gd": 59,
        "./gd.js": 59,
        "./gl": 60,
        "./gl.js": 60,
        "./gom-latn": 61,
        "./gom-latn.js": 61,
        "./gu": 62,
        "./gu.js": 62,
        "./he": 63,
        "./he.js": 63,
        "./hi": 64,
        "./hi.js": 64,
        "./hr": 65,
        "./hr.js": 65,
        "./hu": 66,
        "./hu.js": 66,
        "./hy-am": 67,
        "./hy-am.js": 67,
        "./id": 68,
        "./id.js": 68,
        "./is": 69,
        "./is.js": 69,
        "./it": 70,
        "./it.js": 70,
        "./ja": 71,
        "./ja.js": 71,
        "./jv": 72,
        "./jv.js": 72,
        "./ka": 73,
        "./ka.js": 73,
        "./kk": 74,
        "./kk.js": 74,
        "./km": 75,
        "./km.js": 75,
        "./kn": 76,
        "./kn.js": 76,
        "./ko": 77,
        "./ko.js": 77,
        "./ku": 78,
        "./ku.js": 78,
        "./ky": 79,
        "./ky.js": 79,
        "./lb": 80,
        "./lb.js": 80,
        "./lo": 81,
        "./lo.js": 81,
        "./lt": 82,
        "./lt.js": 82,
        "./lv": 83,
        "./lv.js": 83,
        "./me": 84,
        "./me.js": 84,
        "./mi": 85,
        "./mi.js": 85,
        "./mk": 86,
        "./mk.js": 86,
        "./ml": 87,
        "./ml.js": 87,
        "./mn": 88,
        "./mn.js": 88,
        "./mr": 89,
        "./mr.js": 89,
        "./ms": 90,
        "./ms-my": 91,
        "./ms-my.js": 91,
        "./ms.js": 90,
        "./mt": 92,
        "./mt.js": 92,
        "./my": 93,
        "./my.js": 93,
        "./nb": 94,
        "./nb.js": 94,
        "./ne": 95,
        "./ne.js": 95,
        "./nl": 96,
        "./nl-be": 97,
        "./nl-be.js": 97,
        "./nl.js": 96,
        "./nn": 98,
        "./nn.js": 98,
        "./pa-in": 99,
        "./pa-in.js": 99,
        "./pl": 100,
        "./pl.js": 100,
        "./pt": 101,
        "./pt-br": 102,
        "./pt-br.js": 102,
        "./pt.js": 101,
        "./ro": 103,
        "./ro.js": 103,
        "./ru": 104,
        "./ru.js": 104,
        "./sd": 105,
        "./sd.js": 105,
        "./se": 106,
        "./se.js": 106,
        "./si": 107,
        "./si.js": 107,
        "./sk": 108,
        "./sk.js": 108,
        "./sl": 109,
        "./sl.js": 109,
        "./sq": 110,
        "./sq.js": 110,
        "./sr": 111,
        "./sr-cyrl": 112,
        "./sr-cyrl.js": 112,
        "./sr.js": 111,
        "./ss": 113,
        "./ss.js": 113,
        "./sv": 114,
        "./sv.js": 114,
        "./sw": 115,
        "./sw.js": 115,
        "./ta": 116,
        "./ta.js": 116,
        "./te": 117,
        "./te.js": 117,
        "./tet": 118,
        "./tet.js": 118,
        "./tg": 119,
        "./tg.js": 119,
        "./th": 120,
        "./th.js": 120,
        "./tl-ph": 121,
        "./tl-ph.js": 121,
        "./tlh": 122,
        "./tlh.js": 122,
        "./tr": 123,
        "./tr.js": 123,
        "./tzl": 124,
        "./tzl.js": 124,
        "./tzm": 125,
        "./tzm-latn": 126,
        "./tzm-latn.js": 126,
        "./tzm.js": 125,
        "./ug-cn": 127,
        "./ug-cn.js": 127,
        "./uk": 128,
        "./uk.js": 128,
        "./ur": 129,
        "./ur.js": 129,
        "./uz": 130,
        "./uz-latn": 131,
        "./uz-latn.js": 131,
        "./uz.js": 130,
        "./vi": 132,
        "./vi.js": 132,
        "./x-pseudo": 133,
        "./x-pseudo.js": 133,
        "./yo": 134,
        "./yo.js": 134,
        "./zh-cn": 135,
        "./zh-cn.js": 135,
        "./zh-hk": 136,
        "./zh-hk.js": 136,
        "./zh-tw": 137,
        "./zh-tw.js": 137
    };

    function r(e) {
        var t = a(e);
        return n(t)
    }

    function a(e) {
        var t = i[e];
        if (!(t + 1)) {
            var n = new Error("Cannot find module '" + e + "'");
            throw n.code = "MODULE_NOT_FOUND", n
        }
        return t
    }
    r.keys = function() {
        return Object.keys(i)
    }, r.resolve = a, e.exports = r, r.id = 159
},
function(e, t, n) {
    "use strict";
    n.r(t),
        function(e) {
            n(161);
            var t = n(145),
                i = n.n(t);
            n(162);
            e(document).ready(function() {
                if (e(function() {
                        var t = {
                            AF: 16.63,
                            AL: 11.58,
                            DZ: 158.97
                        };
                        setTimeout(function() {
                            e("#world-map-gdp").vectorMap({
                                map: "world_mill",
                                series: {
                                    regions: [{
                                        values: t,
                                        scale: ["#C8EEFF", "#0071A4"],
                                        normalizeFunction: "polynomial"
                                    }]
                                },
                                onRegionTipShow: function(e, n, i) {
                                    n.html(n.html() + " (GDP - " + t[i] + ")")
                                }
                            })
                        }, 2e3)
                    }), document.getElementById("gmap-example")) new i.a({
                    el: "#gmap-example",
                    lat: -12.043333,
                    lng: -77.028333,
                    width: "100%",
                    height: "300px"
                })
            })
        }.call(this, n(1))
},
function(e, t, n) {
    (function(i, r) {
        var a, o, l, s;
        s = {
            set: {
                colors: 1,
                values: 1,
                backgroundColor: 1,
                scaleColors: 1,
                normalizeFunction: 1,
                focus: 1
            },
            get: {
                selectedRegions: 1,
                selectedMarkers: 1,
                mapObject: 1,
                regionName: 1
            }
        }, i.fn.vectorMap = function(e) {
            var t = this.children(".jvectormap-container").data("mapObject");
            if ("addMap" === e) d.Map.maps[arguments[1]] = arguments[2];
            else {
                if (("set" === e || "get" === e) && s[e][arguments[1]]) return t[e + (arguments[1].charAt(0).toUpperCase() + arguments[1].substr(1))].apply(t, Array.prototype.slice.call(arguments, 2));
                (e = e || {}).container = this, t = new d.Map(e)
            }
            return this
        }, o = [n(1)], void 0 === (l = "function" == typeof(a = function(e) {
            function t(t) {
                var o = t || window.event,
                    l = s.call(arguments, 1),
                    d = 0,
                    u = 0,
                    c = 0,
                    h = 0;
                if ((t = e.event.fix(o)).type = "mousewheel", "detail" in o && (c = -1 * o.detail), "wheelDelta" in o && (c = o.wheelDelta), "wheelDeltaY" in o && (c = o.wheelDeltaY), "wheelDeltaX" in o && (u = -1 * o.wheelDeltaX), "axis" in o && o.axis === o.HORIZONTAL_AXIS && (u = -1 * c, c = 0), d = 0 === c ? u : c, "deltaY" in o && (c = -1 * o.deltaY, d = c), "deltaX" in o && (u = o.deltaX, 0 === c && (d = -1 * u)), 0 !== c || 0 !== u) {
                    if (1 === o.deltaMode) {
                        var p = e.data(this, "mousewheel-line-height");
                        d *= p, c *= p, u *= p
                    } else if (2 === o.deltaMode) {
                        var f = e.data(this, "mousewheel-page-height");
                        d *= f, c *= f, u *= f
                    }
                    return h = Math.max(Math.abs(c), Math.abs(u)), (!a || a > h) && (a = h, i(o, h) && (a /= 40)), i(o, h) && (d /= 40, u /= 40, c /= 40), d = Math[d >= 1 ? "floor" : "ceil"](d / a), u = Math[u >= 1 ? "floor" : "ceil"](u / a), c = Math[c >= 1 ? "floor" : "ceil"](c / a), t.deltaX = u, t.deltaY = c, t.deltaFactor = a, t.deltaMode = 0, l.unshift(t, d, u, c), r && clearTimeout(r), r = setTimeout(n, 200), (e.event.dispatch || e.event.handle).apply(this, l)
                }
            }

            function n() {
                a = null
            }

            function i(e, t) {
                return u.settings.adjustOldDeltas && "mousewheel" === e.type && t % 120 == 0
            }
            var r, a, o = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
                l = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
                s = Array.prototype.slice;
            if (e.event.fixHooks)
                for (var d = o.length; d;) e.event.fixHooks[o[--d]] = e.event.mouseHooks;
            var u = e.event.special.mousewheel = {
                version: "3.1.9",
                setup: function() {
                    if (this.addEventListener)
                        for (var n = l.length; n;) this.addEventListener(l[--n], t, !1);
                    else this.onmousewheel = t;
                    e.data(this, "mousewheel-line-height", u.getLineHeight(this)), e.data(this, "mousewheel-page-height", u.getPageHeight(this))
                },
                teardown: function() {
                    if (this.removeEventListener)
                        for (var e = l.length; e;) this.removeEventListener(l[--e], t, !1);
                    else this.onmousewheel = null
                },
                getLineHeight: function(t) {
                    return parseInt(e(t)["offsetParent" in e.fn ? "offsetParent" : "parent"]().css("fontSize"), 10)
                },
                getPageHeight: function(t) {
                    return e(t).height()
                },
                settings: {
                    adjustOldDeltas: !0
                }
            };
            e.fn.extend({
                mousewheel: function(e) {
                    return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
                },
                unmousewheel: function(e) {
                    return this.unbind("mousewheel", e)
                }
            })
        }) ? a.apply(t, o) : a) || (e.exports = l);
        var d = {
            inherits: function(e, t) {
                function n() {}
                n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e, e.parentClass = t
            },
            mixin: function(e, t) {
                var n;
                for (n in t.prototype) t.prototype.hasOwnProperty(n) && (e.prototype[n] = t.prototype[n])
            },
            min: function(e) {
                var t, n = Number.MAX_VALUE;
                if (e instanceof Array)
                    for (t = 0; t < e.length; t++) e[t] < n && (n = e[t]);
                else
                    for (t in e) e[t] < n && (n = e[t]);
                return n
            },
            max: function(e) {
                var t, n = Number.MIN_VALUE;
                if (e instanceof Array)
                    for (t = 0; t < e.length; t++) e[t] > n && (n = e[t]);
                else
                    for (t in e) e[t] > n && (n = e[t]);
                return n
            },
            keys: function(e) {
                var t, n = [];
                for (t in e) n.push(t);
                return n
            },
            values: function(e) {
                var t, n, i = [];
                for (n = 0; n < arguments.length; n++)
                    for (t in e = arguments[n]) i.push(e[t]);
                return i
            },
            whenImageLoaded: function(e) {
                var t = new d.$.Deferred,
                    n = d.$("<img/>");
                return n.error(function() {
                    t.reject()
                }).load(function() {
                    t.resolve(n)
                }), n.attr("src", e), t
            },
            isImageUrl: function(e) {
                return /\.\w{3,4}$/.test(e)
            }
        };
        d.$ = i, Array.prototype.indexOf || (Array.prototype.indexOf = function(e, t) {
            var n;
            if (null == this) throw new TypeError('"this" is null or not defined');
            var i = Object(this),
                r = i.length >>> 0;
            if (0 === r) return -1;
            var a = +t || 0;
            if (Math.abs(a) === 1 / 0 && (a = 0), a >= r) return -1;
            for (n = Math.max(a >= 0 ? a : r - Math.abs(a), 0); r > n;) {
                if (n in i && i[n] === e) return n;
                n++
            }
            return -1
        }), d.AbstractElement = function(e, t) {
            this.node = this.createElement(e), this.name = e, this.properties = {}, t && this.set(t)
        }, d.AbstractElement.prototype.set = function(e, t) {
            var n;
            if ("object" == typeof e)
                for (n in e) this.properties[n] = e[n], this.applyAttr(n, e[n]);
            else this.properties[e] = t, this.applyAttr(e, t)
        }, d.AbstractElement.prototype.get = function(e) {
            return this.properties[e]
        }, d.AbstractElement.prototype.applyAttr = function(e, t) {
            this.node.setAttribute(e, t)
        }, d.AbstractElement.prototype.remove = function() {
            d.$(this.node).remove()
        }, d.AbstractCanvasElement = function(e, t, n) {
            this.container = e, this.setSize(t, n), this.rootElement = new d[this.classPrefix + "GroupElement"], this.node.appendChild(this.rootElement.node), this.container.appendChild(this.node)
        }, d.AbstractCanvasElement.prototype.add = function(e, t) {
            (t = t || this.rootElement).add(e), e.canvas = this
        }, d.AbstractCanvasElement.prototype.addPath = function(e, t, n) {
            var i = new d[this.classPrefix + "PathElement"](e, t);
            return this.add(i, n), i
        }, d.AbstractCanvasElement.prototype.addCircle = function(e, t, n) {
            var i = new d[this.classPrefix + "CircleElement"](e, t);
            return this.add(i, n), i
        }, d.AbstractCanvasElement.prototype.addImage = function(e, t, n) {
            var i = new d[this.classPrefix + "ImageElement"](e, t);
            return this.add(i, n), i
        }, d.AbstractCanvasElement.prototype.addText = function(e, t, n) {
            var i = new d[this.classPrefix + "TextElement"](e, t);
            return this.add(i, n), i
        }, d.AbstractCanvasElement.prototype.addGroup = function(e) {
            var t = new d[this.classPrefix + "GroupElement"];
            return e ? e.node.appendChild(t.node) : this.node.appendChild(t.node), t.canvas = this, t
        }, d.AbstractShapeElement = function(e, t, n) {
            this.style = n || {}, this.style.current = this.style.current || {}, this.isHovered = !1, this.isSelected = !1, this.updateStyle()
        }, d.AbstractShapeElement.prototype.setStyle = function(e, t) {
            var n = {};
            "object" == typeof e ? n = e : n[e] = t, d.$.extend(this.style.current, n), this.updateStyle()
        }, d.AbstractShapeElement.prototype.updateStyle = function() {
            var e = {};
            d.AbstractShapeElement.mergeStyles(e, this.style.initial), d.AbstractShapeElement.mergeStyles(e, this.style.current), this.isHovered && d.AbstractShapeElement.mergeStyles(e, this.style.hover), this.isSelected && (d.AbstractShapeElement.mergeStyles(e, this.style.selected), this.isHovered && d.AbstractShapeElement.mergeStyles(e, this.style.selectedHover)), this.set(e)
        }, d.AbstractShapeElement.mergeStyles = function(e, t) {
            var n;
            for (n in t = t || {}) null === t[n] ? delete e[n] : e[n] = t[n]
        }, d.SVGElement = function() {
            d.SVGElement.parentClass.apply(this, arguments)
        }, d.inherits(d.SVGElement, d.AbstractElement), d.SVGElement.svgns = "http://www.w3.org/2000/svg", d.SVGElement.prototype.createElement = function(e) {
            return document.createElementNS(d.SVGElement.svgns, e)
        }, d.SVGElement.prototype.addClass = function(e) {
            this.node.setAttribute("class", e)
        }, d.SVGElement.prototype.getElementCtr = function(e) {
            return d["SVG" + e]
        }, d.SVGElement.prototype.getBBox = function() {
            return this.node.getBBox()
        }, d.SVGGroupElement = function() {
            d.SVGGroupElement.parentClass.call(this, "g")
        }, d.inherits(d.SVGGroupElement, d.SVGElement), d.SVGGroupElement.prototype.add = function(e) {
            this.node.appendChild(e.node)
        }, d.SVGCanvasElement = function() {
            this.classPrefix = "SVG", d.SVGCanvasElement.parentClass.call(this, "svg"), this.defsElement = new d.SVGElement("defs"), this.node.appendChild(this.defsElement.node), d.AbstractCanvasElement.apply(this, arguments)
        }, d.inherits(d.SVGCanvasElement, d.SVGElement), d.mixin(d.SVGCanvasElement, d.AbstractCanvasElement), d.SVGCanvasElement.prototype.setSize = function(e, t) {
            this.width = e, this.height = t, this.node.setAttribute("width", e), this.node.setAttribute("height", t)
        }, d.SVGCanvasElement.prototype.applyTransformParams = function(e, t, n) {
            this.scale = e, this.transX = t, this.transY = n, this.rootElement.node.setAttribute("transform", "scale(" + e + ") translate(" + t + ", " + n + ")")
        }, d.SVGShapeElement = function(e, t) {
            d.SVGShapeElement.parentClass.call(this, e, t), d.AbstractShapeElement.apply(this, arguments)
        }, d.inherits(d.SVGShapeElement, d.SVGElement), d.mixin(d.SVGShapeElement, d.AbstractShapeElement), d.SVGShapeElement.prototype.applyAttr = function(e, t) {
            var n, i, r = this;
            "fill" === e && d.isImageUrl(t) ? d.SVGShapeElement.images[t] ? this.applyAttr("fill", "url(#image" + d.SVGShapeElement.images[t] + ")") : d.whenImageLoaded(t).then(function(e) {
                (i = new d.SVGElement("image")).node.setAttributeNS("http://www.w3.org/1999/xlink", "href", t), i.applyAttr("x", "0"), i.applyAttr("y", "0"), i.applyAttr("width", e[0].width), i.applyAttr("height", e[0].height), (n = new d.SVGElement("pattern")).applyAttr("id", "image" + d.SVGShapeElement.imageCounter), n.applyAttr("x", 0), n.applyAttr("y", 0), n.applyAttr("width", e[0].width / 2), n.applyAttr("height", e[0].height / 2), n.applyAttr("viewBox", "0 0 " + e[0].width + " " + e[0].height), n.applyAttr("patternUnits", "userSpaceOnUse"), n.node.appendChild(i.node), r.canvas.defsElement.node.appendChild(n.node), d.SVGShapeElement.images[t] = d.SVGShapeElement.imageCounter++, r.applyAttr("fill", "url(#image" + d.SVGShapeElement.images[t] + ")")
            }) : d.SVGShapeElement.parentClass.prototype.applyAttr.apply(this, arguments)
        }, d.SVGShapeElement.imageCounter = 1, d.SVGShapeElement.images = {}, d.SVGPathElement = function(e, t) {
            d.SVGPathElement.parentClass.call(this, "path", e, t), this.node.setAttribute("fill-rule", "evenodd")
        }, d.inherits(d.SVGPathElement, d.SVGShapeElement), d.SVGCircleElement = function(e, t) {
            d.SVGCircleElement.parentClass.call(this, "circle", e, t)
        }, d.inherits(d.SVGCircleElement, d.SVGShapeElement), d.SVGImageElement = function(e, t) {
            d.SVGImageElement.parentClass.call(this, "image", e, t)
        }, d.inherits(d.SVGImageElement, d.SVGShapeElement), d.SVGImageElement.prototype.applyAttr = function(e, t) {
            var n = this;
            "image" == e ? d.whenImageLoaded(t).then(function(e) {
                n.node.setAttributeNS("http://www.w3.org/1999/xlink", "href", t), n.width = e[0].width, n.height = e[0].height, n.applyAttr("width", n.width), n.applyAttr("height", n.height), n.applyAttr("x", n.cx - n.width / 2), n.applyAttr("y", n.cy - n.height / 2), d.$(n.node).trigger("imageloaded", [e])
            }) : "cx" == e ? (this.cx = t, this.width && this.applyAttr("x", t - this.width / 2)) : "cy" == e ? (this.cy = t, this.height && this.applyAttr("y", t - this.height / 2)) : d.SVGImageElement.parentClass.prototype.applyAttr.apply(this, arguments)
        }, d.SVGTextElement = function(e, t) {
            d.SVGTextElement.parentClass.call(this, "text", e, t)
        }, d.inherits(d.SVGTextElement, d.SVGShapeElement), d.SVGTextElement.prototype.applyAttr = function(e, t) {
            "text" === e ? this.node.textContent = t : d.SVGTextElement.parentClass.prototype.applyAttr.apply(this, arguments)
        }, d.VMLElement = function() {
            d.VMLElement.VMLInitialized || d.VMLElement.initializeVML(), d.VMLElement.parentClass.apply(this, arguments)
        }, d.inherits(d.VMLElement, d.AbstractElement), d.VMLElement.VMLInitialized = !1, d.VMLElement.initializeVML = function() {
            try {
                document.namespaces.rvml || document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), d.VMLElement.prototype.createElement = function(e) {
                    return document.createElement("<rvml:" + e + ' class="rvml">')
                }
            } catch (e) {
                d.VMLElement.prototype.createElement = function(e) {
                    return document.createElement("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
                }
            }
            document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)"), d.VMLElement.VMLInitialized = !0
        }, d.VMLElement.prototype.getElementCtr = function(e) {
            return d["VML" + e]
        }, d.VMLElement.prototype.addClass = function(e) {
            d.$(this.node).addClass(e)
        }, d.VMLElement.prototype.applyAttr = function(e, t) {
            this.node[e] = t
        }, d.VMLElement.prototype.getBBox = function() {
            var e = d.$(this.node);
            return {
                x: e.position().left / this.canvas.scale,
                y: e.position().top / this.canvas.scale,
                width: e.width() / this.canvas.scale,
                height: e.height() / this.canvas.scale
            }
        }, d.VMLGroupElement = function() {
            d.VMLGroupElement.parentClass.call(this, "group"), this.node.style.left = "0px", this.node.style.top = "0px", this.node.coordorigin = "0 0"
        }, d.inherits(d.VMLGroupElement, d.VMLElement), d.VMLGroupElement.prototype.add = function(e) {
            this.node.appendChild(e.node)
        }, d.VMLCanvasElement = function() {
            this.classPrefix = "VML", d.VMLCanvasElement.parentClass.call(this, "group"), d.AbstractCanvasElement.apply(this, arguments), this.node.style.position = "absolute"
        }, d.inherits(d.VMLCanvasElement, d.VMLElement), d.mixin(d.VMLCanvasElement, d.AbstractCanvasElement), d.VMLCanvasElement.prototype.setSize = function(e, t) {
            var n, i, r, a;
            if (this.width = e, this.height = t, this.node.style.width = e + "px", this.node.style.height = t + "px", this.node.coordsize = e + " " + t, this.node.coordorigin = "0 0", this.rootElement) {
                for (r = 0, a = (n = this.rootElement.node.getElementsByTagName("shape")).length; a > r; r++) n[r].coordsize = e + " " + t, n[r].style.width = e + "px", n[r].style.height = t + "px";
                for (r = 0, a = (i = this.node.getElementsByTagName("group")).length; a > r; r++) i[r].coordsize = e + " " + t, i[r].style.width = e + "px", i[r].style.height = t + "px"
            }
        }, d.VMLCanvasElement.prototype.applyTransformParams = function(e, t, n) {
            this.scale = e, this.transX = t, this.transY = n, this.rootElement.node.coordorigin = this.width - t - this.width / 100 + "," + (this.height - n - this.height / 100), this.rootElement.node.coordsize = this.width / e + "," + this.height / e
        }, d.VMLShapeElement = function(e, t) {
            d.VMLShapeElement.parentClass.call(this, e, t), this.fillElement = new d.VMLElement("fill"), this.strokeElement = new d.VMLElement("stroke"), this.node.appendChild(this.fillElement.node), this.node.appendChild(this.strokeElement.node), this.node.stroked = !1, d.AbstractShapeElement.apply(this, arguments)
        }, d.inherits(d.VMLShapeElement, d.VMLElement), d.mixin(d.VMLShapeElement, d.AbstractShapeElement), d.VMLShapeElement.prototype.applyAttr = function(e, t) {
            switch (e) {
                case "fill":
                    this.node.fillcolor = t;
                    break;
                case "fill-opacity":
                    this.fillElement.node.opacity = Math.round(100 * t) + "%";
                    break;
                case "stroke":
                    this.node.stroked = "none" !== t, this.node.strokecolor = t;
                    break;
                case "stroke-opacity":
                    this.strokeElement.node.opacity = Math.round(100 * t) + "%";
                    break;
                case "stroke-width":
                    this.node.stroked = 0 !== parseInt(t, 10), this.node.strokeweight = t;
                    break;
                case "d":
                    this.node.path = d.VMLPathElement.pathSvgToVml(t);
                    break;
                default:
                    d.VMLShapeElement.parentClass.prototype.applyAttr.apply(this, arguments)
            }
        }, d.VMLPathElement = function(e, t) {
            var n = new d.VMLElement("skew");
            d.VMLPathElement.parentClass.call(this, "shape", e, t), this.node.coordorigin = "0 0", n.node.on = !0, n.node.matrix = "0.01,0,0,0.01,0,0", n.node.offset = "0,0", this.node.appendChild(n.node)
        }, d.inherits(d.VMLPathElement, d.VMLShapeElement), d.VMLPathElement.prototype.applyAttr = function(e, t) {
            "d" === e ? this.node.path = d.VMLPathElement.pathSvgToVml(t) : d.VMLShapeElement.prototype.applyAttr.call(this, e, t)
        }, d.VMLPathElement.pathSvgToVml = function(e) {
            var t, n, i = 0,
                r = 0;
            return (e = e.replace(/(-?\d+)e(-?\d+)/g, "0")).replace(/([MmLlHhVvCcSs])\s*((?:-?\d*(?:\.\d+)?\s*,?\s*)+)/g, function(e, a, o) {
                (o = o.replace(/(\d)-/g, "$1,-").replace(/^\s+/g, "").replace(/\s+$/g, "").replace(/\s+/g, ",").split(","))[0] || o.shift();
                for (var l = 0, s = o.length; s > l; l++) o[l] = Math.round(100 * o[l]);
                switch (a) {
                    case "m":
                        return i += o[0], r += o[1], "t" + o.join(",");
                    case "M":
                        return i = o[0], r = o[1], "m" + o.join(",");
                    case "l":
                        return i += o[0], r += o[1], "r" + o.join(",");
                    case "L":
                        return i = o[0], r = o[1], "l" + o.join(",");
                    case "h":
                        return i += o[0], "r" + o[0] + ",0";
                    case "H":
                        return "l" + (i = o[0]) + "," + r;
                    case "v":
                        return r += o[0], "r0," + o[0];
                    case "V":
                        return r = o[0], "l" + i + "," + r;
                    case "c":
                        return t = i + o[o.length - 4], n = r + o[o.length - 3], i += o[o.length - 2], r += o[o.length - 1], "v" + o.join(",");
                    case "C":
                        return t = o[o.length - 4], n = o[o.length - 3], i = o[o.length - 2], r = o[o.length - 1], "c" + o.join(",");
                    case "s":
                        return o.unshift(r - n), o.unshift(i - t), t = i + o[o.length - 4], n = r + o[o.length - 3], i += o[o.length - 2], r += o[o.length - 1], "v" + o.join(",");
                    case "S":
                        return o.unshift(r + r - n), o.unshift(i + i - t), t = o[o.length - 4], n = o[o.length - 3], i = o[o.length - 2], r = o[o.length - 1], "c" + o.join(",")
                }
                return ""
            }).replace(/z/g, "e")
        }, d.VMLCircleElement = function(e, t) {
            d.VMLCircleElement.parentClass.call(this, "oval", e, t)
        }, d.inherits(d.VMLCircleElement, d.VMLShapeElement), d.VMLCircleElement.prototype.applyAttr = function(e, t) {
            switch (e) {
                case "r":
                    this.node.style.width = 2 * t + "px", this.node.style.height = 2 * t + "px", this.applyAttr("cx", this.get("cx") || 0), this.applyAttr("cy", this.get("cy") || 0);
                    break;
                case "cx":
                    if (!t) return;
                    this.node.style.left = t - (this.get("r") || 0) + "px";
                    break;
                case "cy":
                    if (!t) return;
                    this.node.style.top = t - (this.get("r") || 0) + "px";
                    break;
                default:
                    d.VMLCircleElement.parentClass.prototype.applyAttr.call(this, e, t)
            }
        }, d.VectorCanvas = function(e, t, n) {
            return this.mode = window.SVGAngle ? "svg" : "vml", this.impl = "svg" == this.mode ? new d.SVGCanvasElement(e, t, n) : new d.VMLCanvasElement(e, t, n), this.impl.mode = this.mode, this.impl
        }, d.SimpleScale = function(e) {
            this.scale = e
        }, d.SimpleScale.prototype.getValue = function(e) {
            return e
        }, d.OrdinalScale = function(e) {
            this.scale = e
        }, d.OrdinalScale.prototype.getValue = function(e) {
            return this.scale[e]
        }, d.OrdinalScale.prototype.getTicks = function() {
            var e, t = [];
            for (e in this.scale) t.push({
                label: e,
                value: this.scale[e]
            });
            return t
        }, d.NumericScale = function(e, t, n, i) {
            this.scale = [], t = t || "linear", e && this.setScale(e), t && this.setNormalizeFunction(t), void 0 !== n && this.setMin(n), void 0 !== i && this.setMax(i)
        }, d.NumericScale.prototype = {
            setMin: function(e) {
                this.clearMinValue = e, this.minValue = "function" == typeof this.normalize ? this.normalize(e) : e
            },
            setMax: function(e) {
                this.clearMaxValue = e, this.maxValue = "function" == typeof this.normalize ? this.normalize(e) : e
            },
            setScale: function(e) {
                var t;
                for (this.scale = [], t = 0; t < e.length; t++) this.scale[t] = [e[t]]
            },
            setNormalizeFunction: function(e) {
                "polynomial" === e ? this.normalize = function(e) {
                    return Math.pow(e, .2)
                } : "linear" === e ? delete this.normalize : this.normalize = e, this.setMin(this.clearMinValue), this.setMax(this.clearMaxValue)
            },
            getValue: function(e) {
                var t, n, i = [],
                    r = 0,
                    a = 0;
                for ("function" == typeof this.normalize && (e = this.normalize(e)), a = 0; a < this.scale.length - 1; a++) t = this.vectorLength(this.vectorSubtract(this.scale[a + 1], this.scale[a])), i.push(t), r += t;
                for (n = (this.maxValue - this.minValue) / r, a = 0; a < i.length; a++) i[a] *= n;
                for (a = 0, e -= this.minValue; e - i[a] >= 0;) e -= i[a], a++;
                return this.vectorToNum(a == this.scale.length - 1 ? this.scale[a] : this.vectorAdd(this.scale[a], this.vectorMult(this.vectorSubtract(this.scale[a + 1], this.scale[a]), e / i[a])))
            },
            vectorToNum: function(e) {
                var t, n = 0;
                for (t = 0; t < e.length; t++) n += Math.round(e[t]) * Math.pow(256, e.length - t - 1);
                return n
            },
            vectorSubtract: function(e, t) {
                var n, i = [];
                for (n = 0; n < e.length; n++) i[n] = e[n] - t[n];
                return i
            },
            vectorAdd: function(e, t) {
                var n, i = [];
                for (n = 0; n < e.length; n++) i[n] = e[n] + t[n];
                return i
            },
            vectorMult: function(e, t) {
                var n, i = [];
                for (n = 0; n < e.length; n++) i[n] = e[n] * t;
                return i
            },
            vectorLength: function(e) {
                var t, n = 0;
                for (t = 0; t < e.length; t++) n += e[t] * e[t];
                return Math.sqrt(n)
            },
            getTicks: function() {
                var e, t, n = [this.clearMinValue, this.clearMaxValue],
                    i = n[1] - n[0],
                    r = Math.pow(10, Math.floor(Math.log(i / 5) / Math.LN10)),
                    a = 5 / i * r,
                    o = [];
                for (.15 >= a ? r *= 10 : .35 >= a ? r *= 5 : .75 >= a && (r *= 2), n[0] = Math.floor(n[0] / r) * r, n[1] = Math.ceil(n[1] / r) * r, e = n[0]; e <= n[1];) t = e == n[0] ? this.clearMinValue : e == n[1] ? this.clearMaxValue : e, o.push({
                    label: e,
                    value: this.getValue(t)
                }), e += r;
                return o
            }
        }, d.ColorScale = function() {
            d.ColorScale.parentClass.apply(this, arguments)
        }, d.inherits(d.ColorScale, d.NumericScale), d.ColorScale.prototype.setScale = function(e) {
            var t;
            for (t = 0; t < e.length; t++) this.scale[t] = d.ColorScale.rgbToArray(e[t])
        }, d.ColorScale.prototype.getValue = function(e) {
            return d.ColorScale.numToRgb(d.ColorScale.parentClass.prototype.getValue.call(this, e))
        }, d.ColorScale.arrayToRgb = function(e) {
            var t, n, i = "#";
            for (n = 0; n < e.length; n++) i += 1 == (t = e[n].toString(16)).length ? "0" + t : t;
            return i
        }, d.ColorScale.numToRgb = function(e) {
            for (e = e.toString(16); e.length < 6;) e = "0" + e;
            return "#" + e
        }, d.ColorScale.rgbToArray = function(e) {
            return e = e.substr(1), [parseInt(e.substr(0, 2), 16), parseInt(e.substr(2, 2), 16), parseInt(e.substr(4, 2), 16)]
        }, d.Legend = function(e) {
            this.params = e || {}, this.map = this.params.map, this.series = this.params.series, this.body = d.$("<div/>"), this.body.addClass("jvectormap-legend"), this.params.cssClass && this.body.addClass(this.params.cssClass), e.vertical ? this.map.legendCntVertical.append(this.body) : this.map.legendCntHorizontal.append(this.body), this.render()
        }, d.Legend.prototype.render = function() {
            var e, t, n, i, r = this.series.scale.getTicks(),
                a = d.$("<div/>").addClass("jvectormap-legend-inner");
            for (this.body.html(""), this.params.title && this.body.append(d.$("<div/>").addClass("jvectormap-legend-title").html(this.params.title)), this.body.append(a), e = 0; e < r.length; e++) {
                switch (t = d.$("<div/>").addClass("jvectormap-legend-tick"), n = d.$("<div/>").addClass("jvectormap-legend-tick-sample"), this.series.params.attribute) {
                    case "fill":
                        d.isImageUrl(r[e].value) ? n.css("background", "url(" + r[e].value + ")") : n.css("background", r[e].value);
                        break;
                    case "stroke":
                        n.css("background", r[e].value);
                        break;
                    case "image":
                        n.css("background", "url(" + r[e].value + ") no-repeat center center");
                        break;
                    case "r":
                        d.$("<div/>").css({
                            "border-radius": r[e].value,
                            border: this.map.params.markerStyle.initial["stroke-width"] + "px " + this.map.params.markerStyle.initial.stroke + " solid",
                            width: 2 * r[e].value + "px",
                            height: 2 * r[e].value + "px",
                            background: this.map.params.markerStyle.initial.fill
                        }).appendTo(n)
                }
                t.append(n), i = r[e].label, this.params.labelRender && (i = this.params.labelRender(i)), t.append(d.$("<div>" + i + " </div>").addClass("jvectormap-legend-tick-text")), a.append(t)
            }
            a.append(d.$("<div/>").css("clear", "both"))
        }, d.DataSeries = function(e, t, n) {
            var i;
            (e = e || {}).attribute = e.attribute || "fill", this.elements = t, this.params = e, this.map = n, e.attributes && this.setAttributes(e.attributes), d.$.isArray(e.scale) ? (i = "fill" === e.attribute || "stroke" === e.attribute ? d.ColorScale : d.NumericScale, this.scale = new i(e.scale, e.normalizeFunction, e.min, e.max)) : this.scale = e.scale ? new d.OrdinalScale(e.scale) : new d.SimpleScale(e.scale), this.values = e.values || {}, this.setValues(this.values), this.params.legend && (this.legend = new d.Legend(r.extend({
                map: this.map,
                series: this
            }, this.params.legend)))
        }, d.DataSeries.prototype = {
            setAttributes: function(e, t) {
                var n, i = e;
                if ("string" == typeof e) this.elements[e] && this.elements[e].setStyle(this.params.attribute, t);
                else
                    for (n in i) this.elements[n] && this.elements[n].element.setStyle(this.params.attribute, i[n])
            },
            setValues: function(e) {
                var t, n, i = -Number.MAX_VALUE,
                    r = Number.MAX_VALUE,
                    a = {};
                if (this.scale instanceof d.OrdinalScale || this.scale instanceof d.SimpleScale)
                    for (n in e) a[n] = e[n] ? this.scale.getValue(e[n]) : this.elements[n].element.style.initial[this.params.attribute];
                else {
                    if (void 0 === this.params.min || void 0 === this.params.max)
                        for (n in e)(t = parseFloat(e[n])) > i && (i = t), r > t && (r = t);
                    for (n in void 0 === this.params.min ? (this.scale.setMin(r), this.params.min = r) : this.scale.setMin(this.params.min), void 0 === this.params.max ? (this.scale.setMax(i), this.params.max = i) : this.scale.setMax(this.params.max), e) "indexOf" != n && (t = parseFloat(e[n]), a[n] = isNaN(t) ? this.elements[n].element.style.initial[this.params.attribute] : this.scale.getValue(t))
                }
                this.setAttributes(a), d.$.extend(this.values, e)
            },
            clear: function() {
                var e, t = {};
                for (e in this.values) this.elements[e] && (t[e] = this.elements[e].element.shape.style.initial[this.params.attribute]);
                this.setAttributes(t), this.values = {}
            },
            setScale: function(e) {
                this.scale.setScale(e), this.values && this.setValues(this.values)
            },
            setNormalizeFunction: function(e) {
                this.scale.setNormalizeFunction(e), this.values && this.setValues(this.values)
            }
        }, d.Proj = {
            degRad: 180 / Math.PI,
            radDeg: Math.PI / 180,
            radius: 6381372,
            sgn: function(e) {
                return e > 0 ? 1 : 0 > e ? -1 : e
            },
            mill: function(e, t, n) {
                return {
                    x: this.radius * (t - n) * this.radDeg,
                    y: -this.radius * Math.log(Math.tan((45 + .4 * e) * this.radDeg)) / .8
                }
            },
            mill_inv: function(e, t, n) {
                return {
                    lat: (2.5 * Math.atan(Math.exp(.8 * t / this.radius)) - 5 * Math.PI / 8) * this.degRad,
                    lng: (n * this.radDeg + e / this.radius) * this.degRad
                }
            },
            merc: function(e, t, n) {
                return {
                    x: this.radius * (t - n) * this.radDeg,
                    y: -this.radius * Math.log(Math.tan(Math.PI / 4 + e * Math.PI / 360))
                }
            },
            merc_inv: function(e, t, n) {
                return {
                    lat: (2 * Math.atan(Math.exp(t / this.radius)) - Math.PI / 2) * this.degRad,
                    lng: (n * this.radDeg + e / this.radius) * this.degRad
                }
            },
            aea: function(e, t, n) {
                var i = n * this.radDeg,
                    r = 29.5 * this.radDeg,
                    a = 45.5 * this.radDeg,
                    o = e * this.radDeg,
                    l = t * this.radDeg,
                    s = (Math.sin(r) + Math.sin(a)) / 2,
                    d = Math.cos(r) * Math.cos(r) + 2 * s * Math.sin(r),
                    u = s * (l - i),
                    c = Math.sqrt(d - 2 * s * Math.sin(o)) / s,
                    h = Math.sqrt(d - 2 * s * Math.sin(0)) / s;
                return {
                    x: c * Math.sin(u) * this.radius,
                    y: -(h - c * Math.cos(u)) * this.radius
                }
            },
            aea_inv: function(e, t, n) {
                var i = e / this.radius,
                    r = t / this.radius,
                    a = n * this.radDeg,
                    o = 29.5 * this.radDeg,
                    l = 45.5 * this.radDeg,
                    s = (Math.sin(o) + Math.sin(l)) / 2,
                    d = Math.cos(o) * Math.cos(o) + 2 * s * Math.sin(o),
                    u = Math.sqrt(d - 2 * s * Math.sin(0)) / s,
                    c = Math.sqrt(i * i + (u - r) * (u - r)),
                    h = Math.atan(i / (u - r));
                return {
                    lat: Math.asin((d - c * c * s * s) / (2 * s)) * this.degRad,
                    lng: (a + h / s) * this.degRad
                }
            },
            lcc: function(e, t, n) {
                var i = n * this.radDeg,
                    r = t * this.radDeg,
                    a = 33 * this.radDeg,
                    o = 45 * this.radDeg,
                    l = e * this.radDeg,
                    s = Math.log(Math.cos(a) * (1 / Math.cos(o))) / Math.log(Math.tan(Math.PI / 4 + o / 2) * (1 / Math.tan(Math.PI / 4 + a / 2))),
                    d = Math.cos(a) * Math.pow(Math.tan(Math.PI / 4 + a / 2), s) / s,
                    u = d * Math.pow(1 / Math.tan(Math.PI / 4 + l / 2), s),
                    c = d * Math.pow(1 / Math.tan(Math.PI / 4 + 0), s);
                return {
                    x: u * Math.sin(s * (r - i)) * this.radius,
                    y: -(c - u * Math.cos(s * (r - i))) * this.radius
                }
            },
            lcc_inv: function(e, t, n) {
                var i = e / this.radius,
                    r = t / this.radius,
                    a = n * this.radDeg,
                    o = 33 * this.radDeg,
                    l = 45 * this.radDeg,
                    s = Math.log(Math.cos(o) * (1 / Math.cos(l))) / Math.log(Math.tan(Math.PI / 4 + l / 2) * (1 / Math.tan(Math.PI / 4 + o / 2))),
                    d = Math.cos(o) * Math.pow(Math.tan(Math.PI / 4 + o / 2), s) / s,
                    u = d * Math.pow(1 / Math.tan(Math.PI / 4 + 0), s),
                    c = this.sgn(s) * Math.sqrt(i * i + (u - r) * (u - r)),
                    h = Math.atan(i / (u - r));
                return {
                    lat: (2 * Math.atan(Math.pow(d / c, 1 / s)) - Math.PI / 2) * this.degRad,
                    lng: (a + h / s) * this.degRad
                }
            }
        }, d.MapObject = function() {}, d.MapObject.prototype.getLabelText = function(e) {
            return this.config.label ? "function" == typeof this.config.label.render ? this.config.label.render(e) : e : null
        }, d.MapObject.prototype.getLabelOffsets = function(e) {
            var t;
            return this.config.label && ("function" == typeof this.config.label.offsets ? t = this.config.label.offsets(e) : "object" == typeof this.config.label.offsets && (t = this.config.label.offsets[e])), t || [0, 0]
        }, d.MapObject.prototype.setHovered = function(e) {
            this.isHovered !== e && (this.isHovered = e, this.shape.isHovered = e, this.shape.updateStyle(), this.label && (this.label.isHovered = e, this.label.updateStyle()))
        }, d.MapObject.prototype.setSelected = function(e) {
            this.isSelected !== e && (this.isSelected = e, this.shape.isSelected = e, this.shape.updateStyle(), this.label && (this.label.isSelected = e, this.label.updateStyle()), d.$(this.shape).trigger("selected", [e]))
        }, d.MapObject.prototype.setStyle = function() {
            this.shape.setStyle.apply(this.shape, arguments)
        }, d.MapObject.prototype.remove = function() {
            this.shape.remove(), this.label && this.label.remove()
        }, d.Region = function(e) {
            var t, n, i, r;
            this.config = e, this.map = this.config.map, r = e.canvas.addGroup(e.canvas.rootElement), this.shape = e.canvas.addPath({
                d: e.path
            }, e.style, r), e.canvas.addPath({
                d: e.path,
                "data-code": e.code
            }, {
                initial: {
                    fill: "transparent",
                    stroke: "transparent",
                    "stroke-width": e.margin
                }
            }, r).addClass("jvectormap-region jvectormap-element"), t = this.shape.getBBox(), n = this.getLabelText(e.code), this.config.label && n && (i = this.getLabelOffsets(e.code), this.labelX = t.x + t.width / 2 + i[0], this.labelY = t.y + t.height / 2 + i[1], this.label = e.canvas.addText({
                text: n,
                "text-anchor": "middle",
                "alignment-baseline": "central",
                x: this.labelX,
                y: this.labelY,
                "data-code": e.code
            }, e.labelStyle, e.labelsGroup), this.label.addClass("jvectormap-region jvectormap-element"))
        }, d.inherits(d.Region, d.MapObject), d.Region.prototype.updateLabelPosition = function() {
            this.label && this.label.set({
                x: this.labelX * this.map.scale + this.map.transX * this.map.scale,
                y: this.labelY * this.map.scale + this.map.transY * this.map.scale
            })
        }, d.Marker = function(e) {
            var t;
            this.config = e, this.map = this.config.map, this.isImage = !!this.config.style.initial.image, this.createShape(), t = this.getLabelText(e.index), this.config.label && t && (this.offsets = this.getLabelOffsets(e.index), this.labelX = e.cx / this.map.scale - this.map.transX, this.labelY = e.cy / this.map.scale - this.map.transY, this.label = e.canvas.addText({
                text: t,
                "data-index": e.index,
                dy: "0.6ex",
                x: this.labelX,
                y: this.labelY
            }, e.labelStyle, e.labelsGroup), this.label.addClass("jvectormap-marker jvectormap-element"))
        }, d.inherits(d.Marker, d.MapObject), d.Marker.prototype.createShape = function() {
            var e = this;
            this.shape && this.shape.remove(), this.shape = this.config.canvas[this.isImage ? "addImage" : "addCircle"]({
                "data-index": this.config.index,
                cx: this.config.cx,
                cy: this.config.cy
            }, this.config.style, this.config.group), this.shape.addClass("jvectormap-marker jvectormap-element"), this.isImage && d.$(this.shape.node).on("imageloaded", function() {
                e.updateLabelPosition()
            })
        }, d.Marker.prototype.updateLabelPosition = function() {
            this.label && this.label.set({
                x: this.labelX * this.map.scale + this.offsets[0] + this.map.transX * this.map.scale + 5 + (this.isImage ? (this.shape.width || 0) / 2 : this.shape.properties.r),
                y: this.labelY * this.map.scale + this.map.transY * this.map.scale + this.offsets[1]
            })
        }, d.Marker.prototype.setStyle = function(e) {
            var t;
            d.Marker.parentClass.prototype.setStyle.apply(this, arguments), "r" === e && this.updateLabelPosition(), (t = !!this.shape.get("image")) != this.isImage && (this.isImage = t, this.config.style = d.$.extend(!0, {}, this.shape.style), this.createShape())
        }, d.Map = function(e) {
            var t, n = this;
            if (this.params = d.$.extend(!0, {}, d.Map.defaultParams, e), !d.Map.maps[this.params.map]) throw new Error("Attempt to use map which was not loaded: " + this.params.map);
            for (t in this.mapData = d.Map.maps[this.params.map], this.markers = {}, this.regions = {}, this.regionsColors = {}, this.regionsData = {}, this.container = d.$("<div>").addClass("jvectormap-container"), this.params.container && this.params.container.append(this.container), this.container.data("mapObject", this), this.defaultWidth = this.mapData.width, this.defaultHeight = this.mapData.height, this.setBackgroundColor(this.params.backgroundColor), this.onResize = function() {
                    n.updateSize()
                }, d.$(window).resize(this.onResize), d.Map.apiEvents) this.params[t] && this.container.bind(d.Map.apiEvents[t] + ".jvectormap", this.params[t]);
            this.canvas = new d.VectorCanvas(this.container[0], this.width, this.height), this.params.bindTouchEvents && ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch ? this.bindContainerTouchEvents() : window.MSGesture && this.bindContainerPointerEvents()), this.bindContainerEvents(), this.bindElementEvents(), this.createTip(), this.params.zoomButtons && this.bindZoomButtons(), this.createRegions(), this.createMarkers(this.params.markers || {}), this.updateSize(), this.params.focusOn && ("string" == typeof this.params.focusOn ? this.params.focusOn = {
                region: this.params.focusOn
            } : d.$.isArray(this.params.focusOn) && (this.params.focusOn = {
                regions: this.params.focusOn
            }), this.setFocus(this.params.focusOn)), this.params.selectedRegions && this.setSelectedRegions(this.params.selectedRegions), this.params.selectedMarkers && this.setSelectedMarkers(this.params.selectedMarkers), this.legendCntHorizontal = d.$("<div/>").addClass("jvectormap-legend-cnt jvectormap-legend-cnt-h"), this.legendCntVertical = d.$("<div/>").addClass("jvectormap-legend-cnt jvectormap-legend-cnt-v"), this.container.append(this.legendCntHorizontal), this.container.append(this.legendCntVertical), this.params.series && this.createSeries()
        }, d.Map.prototype = {
            transX: 0,
            transY: 0,
            scale: 1,
            baseTransX: 0,
            baseTransY: 0,
            baseScale: 1,
            width: 0,
            height: 0,
            setBackgroundColor: function(e) {
                this.container.css("background-color", e)
            },
            resize: function() {
                var e = this.baseScale;
                this.width / this.height > this.defaultWidth / this.defaultHeight ? (this.baseScale = this.height / this.defaultHeight, this.baseTransX = Math.abs(this.width - this.defaultWidth * this.baseScale) / (2 * this.baseScale)) : (this.baseScale = this.width / this.defaultWidth, this.baseTransY = Math.abs(this.height - this.defaultHeight * this.baseScale) / (2 * this.baseScale)), this.scale *= this.baseScale / e, this.transX *= this.baseScale / e, this.transY *= this.baseScale / e
            },
            updateSize: function() {
                this.width = this.container.width(), this.height = this.container.height(), this.resize(), this.canvas.setSize(this.width, this.height), this.applyTransform()
            },
            reset: function() {
                var e, t;
                for (e in this.series)
                    for (t = 0; t < this.series[e].length; t++) this.series[e][t].clear();
                this.scale = this.baseScale, this.transX = this.baseTransX, this.transY = this.baseTransY, this.applyTransform()
            },
            applyTransform: function() {
                var e, t, n, i;
                this.defaultWidth * this.scale <= this.width ? (e = (this.width - this.defaultWidth * this.scale) / (2 * this.scale), n = (this.width - this.defaultWidth * this.scale) / (2 * this.scale)) : (e = 0, n = (this.width - this.defaultWidth * this.scale) / this.scale), this.defaultHeight * this.scale <= this.height ? (t = (this.height - this.defaultHeight * this.scale) / (2 * this.scale), i = (this.height - this.defaultHeight * this.scale) / (2 * this.scale)) : (t = 0, i = (this.height - this.defaultHeight * this.scale) / this.scale), this.transY > t ? this.transY = t : this.transY < i && (this.transY = i), this.transX > e ? this.transX = e : this.transX < n && (this.transX = n), this.canvas.applyTransformParams(this.scale, this.transX, this.transY), this.markers && this.repositionMarkers(), this.repositionLabels(), this.container.trigger("viewportChange", [this.scale / this.baseScale, this.transX, this.transY])
            },
            bindContainerEvents: function() {
                var e, t, n = !1,
                    i = this;
                this.params.panOnDrag && (this.container.mousemove(function(r) {
                    return n && (i.transX -= (e - r.pageX) / i.scale, i.transY -= (t - r.pageY) / i.scale, i.applyTransform(), e = r.pageX, t = r.pageY), !1
                }).mousedown(function(i) {
                    return n = !0, e = i.pageX, t = i.pageY, !1
                }), this.onContainerMouseUp = function() {
                    n = !1
                }, d.$("body").mouseup(this.onContainerMouseUp)), this.params.zoomOnScroll && this.container.mousewheel(function(e) {
                    var t = d.$(i.container).offset(),
                        n = e.pageX - t.left,
                        r = e.pageY - t.top,
                        a = Math.pow(1 + i.params.zoomOnScrollSpeed / 1e3, e.deltaFactor * e.deltaY);
                    i.tip.hide(), i.setScale(i.scale * a, n, r), e.preventDefault()
                })
            },
            bindContainerTouchEvents: function() {
                var e, t, n, i, r, a, o, l = this,
                    s = function(s) {
                        var u, c, h, p, f = s.originalEvent.touches;
                        "touchstart" == s.type && (o = 0), 1 == f.length ? (1 == o && (h = l.transX, p = l.transY, l.transX -= (n - f[0].pageX) / l.scale, l.transY -= (i - f[0].pageY) / l.scale, l.applyTransform(), l.tip.hide(), (h != l.transX || p != l.transY) && s.preventDefault()), n = f[0].pageX, i = f[0].pageY) : 2 == f.length && (2 == o ? (c = Math.sqrt(Math.pow(f[0].pageX - f[1].pageX, 2) + Math.pow(f[0].pageY - f[1].pageY, 2)) / t, l.setScale(e * c, r, a), l.tip.hide(), s.preventDefault()) : (u = d.$(l.container).offset(), r = f[0].pageX > f[1].pageX ? f[1].pageX + (f[0].pageX - f[1].pageX) / 2 : f[0].pageX + (f[1].pageX - f[0].pageX) / 2, a = f[0].pageY > f[1].pageY ? f[1].pageY + (f[0].pageY - f[1].pageY) / 2 : f[0].pageY + (f[1].pageY - f[0].pageY) / 2, r -= u.left, a -= u.top, e = l.scale, t = Math.sqrt(Math.pow(f[0].pageX - f[1].pageX, 2) + Math.pow(f[0].pageY - f[1].pageY, 2)))), o = f.length
                    };
                d.$(this.container).bind("touchstart", s), d.$(this.container).bind("touchmove", s)
            },
            bindContainerPointerEvents: function() {
                var e = this,
                    t = new MSGesture,
                    n = this.container[0];
                t.target = n, n.addEventListener("MSGestureChange", function(t) {
                    var n, i;
                    (0 != t.translationX || 0 != t.translationY) && (n = e.transX, i = e.transY, e.transX += t.translationX / e.scale, e.transY += t.translationY / e.scale, e.applyTransform(), e.tip.hide(), (n != e.transX || i != e.transY) && t.preventDefault()), 1 != t.scale && (e.setScale(e.scale * t.scale, t.offsetX, t.offsetY), e.tip.hide(), t.preventDefault())
                }, !1), n.addEventListener("pointerdown", function(e) {
                    t.addPointer(e.pointerId)
                }, !1)
            },
            bindElementEvents: function() {
                var e, t, n, i = this;
                this.container.mousemove(function(i) {
                    Math.abs(e - i.pageX) + Math.abs(t - i.pageY) > 2 && (n = !0)
                }), this.container.delegate("[class~='jvectormap-element']", "mouseover mouseout", function(e) {
                    var t = -1 === (d.$(this).attr("class").baseVal || d.$(this).attr("class")).indexOf("jvectormap-region") ? "marker" : "region",
                        n = d.$(this).attr("region" == t ? "data-code" : "data-index"),
                        r = "region" == t ? i.regions[n].element : i.markers[n].element,
                        a = "region" == t ? i.mapData.paths[n].name : i.markers[n].config.name || "",
                        o = d.$.Event(t + "TipShow.jvectormap"),
                        l = d.$.Event(t + "Over.jvectormap");
                    "mouseover" == e.type ? (i.container.trigger(l, [n]), l.isDefaultPrevented() || r.setHovered(!0), i.tip.text(a), i.container.trigger(o, [i.tip, n]), o.isDefaultPrevented() || (i.tip.show(), i.tipWidth = i.tip.width(), i.tipHeight = i.tip.height())) : (r.setHovered(!1), i.tip.hide(), i.container.trigger(t + "Out.jvectormap", [n]))
                }), this.container.delegate("[class~='jvectormap-element']", "mousedown", function(i) {
                    e = i.pageX, t = i.pageY, n = !1
                }), this.container.delegate("[class~='jvectormap-element']", "mouseup", function() {
                    var e = -1 === (d.$(this).attr("class").baseVal ? d.$(this).attr("class").baseVal : d.$(this).attr("class")).indexOf("jvectormap-region") ? "marker" : "region",
                        t = d.$(this).attr("region" == e ? "data-code" : "data-index"),
                        r = d.$.Event(e + "Click.jvectormap"),
                        a = "region" == e ? i.regions[t].element : i.markers[t].element;
                    n || (i.container.trigger(r, [t]), ("region" === e && i.params.regionsSelectable || "marker" === e && i.params.markersSelectable) && (r.isDefaultPrevented() || (i.params[e + "sSelectableOne"] && i.clearSelected(e + "s"), a.setSelected(!a.isSelected))))
                })
            },
            bindZoomButtons: function() {
                var e = this;
                d.$("<div/>").addClass("jvectormap-zoomin").text("+").appendTo(this.container), d.$("<div/>").addClass("jvectormap-zoomout").html("&#x2212;").appendTo(this.container), this.container.find(".jvectormap-zoomin").click(function() {
                    e.setScale(e.scale * e.params.zoomStep, e.width / 2, e.height / 2, !1, e.params.zoomAnimate)
                }), this.container.find(".jvectormap-zoomout").click(function() {
                    e.setScale(e.scale / e.params.zoomStep, e.width / 2, e.height / 2, !1, e.params.zoomAnimate)
                })
            },
            createTip: function() {
                var e = this;
                this.tip = d.$("<div/>").addClass("jvectormap-tip").appendTo(d.$("body")), this.container.mousemove(function(t) {
                    var n = t.pageX - 15 - e.tipWidth,
                        i = t.pageY - 15 - e.tipHeight;
                    5 > n && (n = t.pageX + 15), 5 > i && (i = t.pageY + 15), e.tip.css({
                        left: n,
                        top: i
                    })
                })
            },
            setScale: function(e, t, n, i, r) {
                var a, o, l, s, u, c, h, p, f, m = d.$.Event("zoom.jvectormap"),
                    g = this,
                    _ = 0,
                    y = Math.abs(Math.round(60 * (e - this.scale) / Math.max(e, this.scale))),
                    v = new d.$.Deferred;
                return e > this.params.zoomMax * this.baseScale ? e = this.params.zoomMax * this.baseScale : e < this.params.zoomMin * this.baseScale && (e = this.params.zoomMin * this.baseScale), void 0 !== t && void 0 !== n && (zoomStep = e / this.scale, i ? (p = t + this.defaultWidth * (this.width / (this.defaultWidth * e)) / 2, f = n + this.defaultHeight * (this.height / (this.defaultHeight * e)) / 2) : (p = this.transX - (zoomStep - 1) / e * t, f = this.transY - (zoomStep - 1) / e * n)), r && y > 0 ? (o = this.scale, l = (e - o) / y, s = this.transX * this.scale, c = this.transY * this.scale, u = (p * e - s) / y, h = (f * e - c) / y, a = setInterval(function() {
                    _ += 1, g.scale = o + l * _, g.transX = (s + u * _) / g.scale, g.transY = (c + h * _) / g.scale, g.applyTransform(), _ == y && (clearInterval(a), g.container.trigger(m, [e / g.baseScale]), v.resolve())
                }, 10)) : (this.transX = p, this.transY = f, this.scale = e, this.applyTransform(), this.container.trigger(m, [e / this.baseScale]), v.resolve()), v
            },
            setFocus: function(e) {
                var t, n, i, r, a;
                if ((e = e || {}).region ? i = [e.region] : e.regions && (i = e.regions), i) {
                    for (r = 0; r < i.length; r++) this.regions[i[r]] && ((n = this.regions[i[r]].element.shape.getBBox()) && (void 0 === t ? t = n : t = {
                        x: Math.min(t.x, n.x),
                        y: Math.min(t.y, n.y),
                        width: Math.max(t.x + t.width, n.x + n.width) - Math.min(t.x, n.x),
                        height: Math.max(t.y + t.height, n.y + n.height) - Math.min(t.y, n.y)
                    }));
                    return this.setScale(Math.min(this.width / t.width, this.height / t.height), -(t.x + t.width / 2), -(t.y + t.height / 2), !0, e.animate)
                }
                return e.lat && e.lng ? (a = this.latLngToPoint(e.lat, e.lng), e.x = this.transX - a.x / this.scale, e.y = this.transY - a.y / this.scale) : e.x && e.y && (e.x *= -this.defaultWidth, e.y *= -this.defaultHeight), this.setScale(e.scale * this.baseScale, e.x, e.y, !0, e.animate)
            },
            getSelected: function(e) {
                var t, n = [];
                for (t in this[e]) this[e][t].element.isSelected && n.push(t);
                return n
            },
            getSelectedRegions: function() {
                return this.getSelected("regions")
            },
            getSelectedMarkers: function() {
                return this.getSelected("markers")
            },
            setSelected: function(e, t) {
                var n;
                if ("object" != typeof t && (t = [t]), d.$.isArray(t))
                    for (n = 0; n < t.length; n++) this[e][t[n]].element.setSelected(!0);
                else
                    for (n in t) this[e][n].element.setSelected(!!t[n])
            },
            setSelectedRegions: function(e) {
                this.setSelected("regions", e)
            },
            setSelectedMarkers: function(e) {
                this.setSelected("markers", e)
            },
            clearSelected: function(e) {
                var t, n = {},
                    i = this.getSelected(e);
                for (t = 0; t < i.length; t++) n[i[t]] = !1;
                this.setSelected(e, n)
            },
            clearSelectedRegions: function() {
                this.clearSelected("regions")
            },
            clearSelectedMarkers: function() {
                this.clearSelected("markers")
            },
            getMapObject: function() {
                return this
            },
            getRegionName: function(e) {
                return this.mapData.paths[e].name
            },
            createRegions: function() {
                var e, t, n = this;
                for (e in this.regionLabelsGroup = this.regionLabelsGroup || this.canvas.addGroup(), this.mapData.paths) t = new d.Region({
                    map: this,
                    path: this.mapData.paths[e].path,
                    code: e,
                    style: d.$.extend(!0, {}, this.params.regionStyle),
                    margin: this.params.regionMargin,
                    labelStyle: d.$.extend(!0, {}, this.params.regionLabelStyle),
                    canvas: this.canvas,
                    labelsGroup: this.regionLabelsGroup,
                    label: "vml" != this.canvas.mode ? this.params.labels && this.params.labels.regions : null
                }), d.$(t.shape).bind("selected", function(e, t) {
                    n.container.trigger("regionSelected.jvectormap", [d.$(this.node).attr("data-code"), t, n.getSelectedRegions()])
                }), this.regions[e] = {
                    element: t,
                    config: this.mapData.paths[e]
                }
            },
            createMarkers: function(e) {
                var t, n, i, r, a, o = this;
                if (this.markersGroup = this.markersGroup || this.canvas.addGroup(), this.markerLabelsGroup = this.markerLabelsGroup || this.canvas.addGroup(), d.$.isArray(e))
                    for (a = e.slice(), e = {}, t = 0; t < a.length; t++) e[t] = a[t];
                for (t in e) r = e[t] instanceof Array ? {
                    latLng: e[t]
                } : e[t], !1 !== (i = this.getMarkerPosition(r)) && (n = new d.Marker({
                    map: this,
                    style: d.$.extend(!0, {}, this.params.markerStyle, {
                        initial: r.style || {}
                    }),
                    labelStyle: d.$.extend(!0, {}, this.params.markerLabelStyle),
                    index: t,
                    cx: i.x,
                    cy: i.y,
                    group: this.markersGroup,
                    canvas: this.canvas,
                    labelsGroup: this.markerLabelsGroup,
                    label: "vml" != this.canvas.mode ? this.params.labels && this.params.labels.markers : null
                }), d.$(n.shape).bind("selected", function(e, t) {
                    o.container.trigger("markerSelected.jvectormap", [d.$(this.node).attr("data-index"), t, o.getSelectedMarkers()])
                }), this.markers[t] && this.removeMarkers([t]), this.markers[t] = {
                    element: n,
                    config: r
                })
            },
            repositionMarkers: function() {
                var e, t;
                for (e in this.markers) !1 !== (t = this.getMarkerPosition(this.markers[e].config)) && this.markers[e].element.setStyle({
                    cx: t.x,
                    cy: t.y
                })
            },
            repositionLabels: function() {
                var e;
                for (e in this.regions) this.regions[e].element.updateLabelPosition();
                for (e in this.markers) this.markers[e].element.updateLabelPosition()
            },
            getMarkerPosition: function(e) {
                return d.Map.maps[this.params.map].projection ? this.latLngToPoint.apply(this, e.latLng || [0, 0]) : {
                    x: e.coords[0] * this.scale + this.transX * this.scale,
                    y: e.coords[1] * this.scale + this.transY * this.scale
                }
            },
            addMarker: function(e, t, n) {
                var i, r, a = {},
                    o = [];
                n = n || [];
                for (a[e] = t, r = 0; r < n.length; r++) i = {}, void 0 !== n[r] && (i[e] = n[r]), o.push(i);
                this.addMarkers(a, o)
            },
            addMarkers: function(e, t) {
                var n;
                for (t = t || [], this.createMarkers(e), n = 0; n < t.length; n++) this.series.markers[n].setValues(t[n] || {})
            },
            removeMarkers: function(e) {
                var t;
                for (t = 0; t < e.length; t++) this.markers[e[t]].element.remove(), delete this.markers[e[t]]
            },
            removeAllMarkers: function() {
                var e, t = [];
                for (e in this.markers) t.push(e);
                this.removeMarkers(t)
            },
            latLngToPoint: function(e, t) {
                var n, i, r, a = d.Map.maps[this.params.map].projection,
                    o = a.centralMeridian;
                return -180 + o > t && (t += 360), n = d.Proj[a.type](e, t, o), !!(i = this.getInsetForPoint(n.x, n.y)) && (r = i.bbox, n.x = (n.x - r[0].x) / (r[1].x - r[0].x) * i.width * this.scale, n.y = (n.y - r[0].y) / (r[1].y - r[0].y) * i.height * this.scale, {
                    x: n.x + this.transX * this.scale + i.left * this.scale,
                    y: n.y + this.transY * this.scale + i.top * this.scale
                })
            },
            pointToLatLng: function(e, t) {
                var n, i, r, a, o, l = d.Map.maps[this.params.map].projection,
                    s = l.centralMeridian,
                    u = d.Map.maps[this.params.map].insets;
                for (n = 0; n < u.length; n++)
                    if (r = (i = u[n]).bbox, a = e - (this.transX * this.scale + i.left * this.scale), o = t - (this.transY * this.scale + i.top * this.scale), a = a / (i.width * this.scale) * (r[1].x - r[0].x) + r[0].x, o = o / (i.height * this.scale) * (r[1].y - r[0].y) + r[0].y, a > r[0].x && a < r[1].x && o > r[0].y && o < r[1].y) return d.Proj[l.type + "_inv"](a, -o, s);
                return !1
            },
            getInsetForPoint: function(e, t) {
                var n, i, r = d.Map.maps[this.params.map].insets;
                for (n = 0; n < r.length; n++)
                    if (e > (i = r[n].bbox)[0].x && e < i[1].x && t > i[0].y && t < i[1].y) return r[n]
            },
            createSeries: function() {
                var e, t;
                for (t in this.series = {
                        markers: [],
                        regions: []
                    }, this.params.series)
                    for (e = 0; e < this.params.series[t].length; e++) this.series[t][e] = new d.DataSeries(this.params.series[t][e], this[t], this)
            },
            remove: function() {
                this.tip.remove(), this.container.remove(), d.$(window).unbind("resize", this.onResize), d.$("body").unbind("mouseup", this.onContainerMouseUp)
            }
        }, d.Map.maps = {}, d.Map.defaultParams = {
            map: "world_mill_en",
            backgroundColor: "#505050",
            zoomButtons: !0,
            zoomOnScroll: !0,
            zoomOnScrollSpeed: 3,
            panOnDrag: !0,
            zoomMax: 8,
            zoomMin: 1,
            zoomStep: 1.6,
            zoomAnimate: !0,
            regionsSelectable: !1,
            markersSelectable: !1,
            bindTouchEvents: !0,
            regionStyle: {
                initial: {
                    fill: "white",
                    "fill-opacity": 1,
                    stroke: "none",
                    "stroke-width": 0,
                    "stroke-opacity": 1
                },
                hover: {
                    "fill-opacity": .8,
                    cursor: "pointer"
                },
                selected: {
                    fill: "yellow"
                },
                selectedHover: {}
            },
            regionMargin: 0,
            regionLabelStyle: {
                initial: {
                    "font-family": "Verdana",
                    "font-size": "12",
                    "font-weight": "bold",
                    cursor: "default",
                    fill: "black"
                },
                hover: {
                    cursor: "pointer"
                }
            },
            markerStyle: {
                initial: {
                    fill: "grey",
                    stroke: "#505050",
                    "fill-opacity": 1,
                    "stroke-width": 1,
                    "stroke-opacity": 1,
                    r: 5
                },
                hover: {
                    stroke: "black",
                    "stroke-width": 2,
                    cursor: "pointer"
                },
                selected: {
                    fill: "blue"
                },
                selectedHover: {}
            },
            markerLabelStyle: {
                initial: {
                    "font-family": "Verdana",
                    "font-size": "12",
                    "font-weight": "bold",
                    cursor: "default",
                    fill: "black"
                },
                hover: {
                    cursor: "pointer"
                }
            }
        }, d.Map.apiEvents = {
            onRegionTipShow: "regionTipShow",
            onRegionOver: "regionOver",
            onRegionOut: "regionOut",
            onRegionClick: "regionClick",
            onRegionSelected: "regionSelected",
            onMarkerTipShow: "markerTipShow",
            onMarkerOver: "markerOver",
            onMarkerOut: "markerOut",
            onMarkerClick: "markerClick",
            onMarkerSelected: "markerSelected",
            onViewportChange: "viewportChange"
        }, d.MultiMap = function(e) {
            var t = this;
            this.maps = {}, this.params = d.$.extend(!0, {}, d.MultiMap.defaultParams, e), this.params.maxLevel = this.params.maxLevel || Number.MAX_VALUE, this.params.main = this.params.main || {}, this.params.main.multiMapLevel = 0, this.history = [this.addMap(this.params.main.map, this.params.main)], this.defaultProjection = this.history[0].mapData.projection.type, this.mapsLoaded = {}, this.params.container.css({
                position: "relative"
            }), this.backButton = d.$("<div/>").addClass("jvectormap-goback").text("Back").appendTo(this.params.container), this.backButton.hide(), this.backButton.click(function() {
                t.goBack()
            }), this.spinner = d.$("<div/>").addClass("jvectormap-spinner").appendTo(this.params.container), this.spinner.hide()
        }, d.MultiMap.prototype = {
            addMap: function(e, t) {
                var n = d.$("<div/>").css({
                    width: "100%",
                    height: "100%"
                });
                return this.params.container.append(n), this.maps[e] = new d.Map(d.$.extend(t, {
                    container: n
                })), this.params.maxLevel > t.multiMapLevel && this.maps[e].container.on("regionClick.jvectormap", {
                    scope: this
                }, function(e, t) {
                    var n = e.data.scope,
                        i = n.params.mapNameByCode(t, n);
                    n.drillDownPromise && "pending" === n.drillDownPromise.state() || n.drillDown(i, t)
                }), this.maps[e]
            },
            downloadMap: function(e) {
                var t = this,
                    n = d.$.Deferred();
                return this.mapsLoaded[e] ? n.resolve() : d.$.get(this.params.mapUrlByCode(e, this)).then(function() {
                    t.mapsLoaded[e] = !0, n.resolve()
                }, function() {
                    n.reject()
                }), n
            },
            drillDown: function(e, t) {
                var n = this.history[this.history.length - 1],
                    i = this,
                    r = n.setFocus({
                        region: t,
                        animate: !0
                    }),
                    a = this.downloadMap(t);
                r.then(function() {
                    "pending" === a.state() && i.spinner.show()
                }), a.always(function() {
                    i.spinner.hide()
                }), this.drillDownPromise = d.$.when(a, r), this.drillDownPromise.then(function() {
                    n.params.container.hide(), i.maps[e] ? i.maps[e].params.container.show() : i.addMap(e, {
                        map: e,
                        multiMapLevel: n.params.multiMapLevel + 1
                    }), i.history.push(i.maps[e]), i.backButton.show()
                })
            },
            goBack: function() {
                var e = this.history.pop(),
                    t = this.history[this.history.length - 1],
                    n = this;
                e.setFocus({
                    scale: 1,
                    x: .5,
                    y: .5,
                    animate: !0
                }).then(function() {
                    e.params.container.hide(), t.params.container.show(), t.updateSize(), 1 === n.history.length && n.backButton.hide(), t.setFocus({
                        scale: 1,
                        x: .5,
                        y: .5,
                        animate: !0
                    })
                })
            }
        }, d.MultiMap.defaultParams = {
            mapNameByCode: function(e, t) {
                return e.toLowerCase() + "_" + t.defaultProjection + "_en"
            },
            mapUrlByCode: function(e, t) {
                return "jquery-jvectormap-data-" + e.toLowerCase() + "-" + t.defaultProjection + "-en.js"
            }
        }
    }).call(this, n(1), n(1))
},
function(e, t, n) {
    (function(e) {
        e.fn.vectorMap("addMap", "world_mill", {
            insets: [{
                width: 900,
                top: 0,
                height: 440.7063107441331,
                bbox: [{
                    y: -12671671.123330014,
                    x: -20004297.151525836
                }, {
                    y: 6930392.025135122,
                    x: 20026572.394749384
                }],
                left: 0
            }],
            paths: {
                BD: {
                    path: "M651.84,230.21l-0.6,-2.0l-1.36,-1.71l-2.31,-0.11l-0.41,0.48l0.2,0.94l-0.53,0.99l-0.72,-0.36l-0.68,0.35l-1.2,-0.36l-0.37,-2.0l-0.81,-1.86l0.39,-1.46l-0.22,-0.47l-1.14,-0.53l0.29,-0.5l1.48,-0.94l0.03,-0.65l-1.55,-1.22l0.55,-1.14l1.61,0.94l1.04,0.15l0.18,1.54l0.34,0.35l5.64,0.63l-0.84,1.64l-1.22,0.34l-0.77,1.51l0.07,0.47l1.37,1.37l0.67,-0.19l0.42,-1.39l1.21,3.84l-0.03,1.21l-0.33,-0.15l-0.4,0.28Z",
                    name: "Bangladesh"
                },
                BE: {
                    path: "M429.29,144.05l1.91,0.24l2.1,-0.63l2.63,1.99l-0.21,1.66l-0.69,0.4l-0.18,1.2l-1.66,-1.13l-1.39,0.15l-2.73,-2.7l-1.17,-0.18l-0.16,-0.52l1.54,-0.5Z",
                    name: "Belgium"
                },
                BF: {
                    path: "M421.42,247.64l-0.11,0.95l0.34,1.16l1.4,1.71l0.07,1.1l0.32,0.37l2.55,0.51l-0.04,1.28l-0.38,0.53l-1.07,0.21l-0.72,1.18l-0.63,0.21l-3.22,-0.25l-0.94,0.39l-5.4,-0.05l-0.39,0.38l0.16,2.73l-1.23,-0.43l-1.17,0.1l-0.89,0.57l-2.27,-1.72l-0.13,-1.11l0.61,-0.96l0.02,-0.93l1.87,-1.98l0.44,-1.81l0.43,-0.39l1.28,0.26l1.05,-0.52l0.47,-0.73l1.84,-1.09l0.55,-0.83l2.2,-1.0l1.15,-0.3l0.72,0.45l1.13,-0.01Z",
                    name: "Burkina Faso"
                },
                BG: {
                    path: "M491.65,168.18l-0.86,0.88l-0.91,2.17l0.48,1.34l-1.6,-0.24l-2.55,0.95l-0.28,1.51l-1.8,0.22l-2.0,-1.0l-1.92,0.79l-1.42,-0.07l-0.15,-1.63l-1.05,-0.97l0.0,-0.8l1.2,-1.57l0.01,-0.56l-1.14,-1.23l-0.05,-0.94l0.88,0.97l0.88,-0.2l1.91,0.47l3.68,0.16l1.42,-0.81l2.72,-0.66l2.55,1.24Z",
                    name: "Bulgaria"
                },
                BA: {
                    path: "M463.49,163.65l2.1,0.5l1.72,-0.03l1.52,0.68l-0.36,0.78l0.08,0.45l1.04,1.02l-0.25,0.98l-1.81,1.15l-0.38,1.38l-1.67,-0.87l-0.89,-1.2l-2.11,-1.83l-1.63,-2.22l0.23,-0.57l0.48,0.38l0.55,-0.06l0.43,-0.51l0.94,-0.06Z",
                    name: "Bosnia and Herz."
                },
                BN: {
                    path: "M707.48,273.58l0.68,-0.65l1.41,-0.91l-0.15,1.63l-0.81,-0.05l-0.61,0.58l-0.53,-0.6Z",
                    name: "Brunei"
                },
                BO: {
                    path: "M263.83,340.69l-3.09,-0.23l-0.38,0.23l-0.7,1.52l-1.31,-1.53l-3.28,-0.64l-2.37,2.4l-1.31,0.26l-0.88,-3.26l-1.3,-2.86l0.74,-2.37l-0.13,-0.43l-1.2,-1.01l-0.37,-1.89l-1.08,-1.55l1.45,-2.56l-0.96,-2.33l0.47,-1.06l-0.34,-0.73l0.91,-1.32l0.16,-3.84l0.5,-1.18l-1.81,-3.41l2.46,0.07l0.8,-0.85l3.4,-1.91l2.66,-0.35l-0.19,1.38l0.3,1.07l-0.05,1.97l2.72,2.27l2.88,0.49l0.89,0.86l1.79,0.58l0.98,0.7l1.71,0.05l1.17,0.61l0.6,2.7l-0.7,0.54l0.96,2.99l0.37,0.28l4.3,0.1l-0.25,1.2l0.27,1.02l1.43,0.9l0.5,1.35l-0.41,1.86l-0.65,1.08l0.12,1.35l-2.69,-1.65l-2.4,-0.03l-4.36,0.76l-1.49,2.5l-0.11,1.52l-0.75,2.37Z",
                    name: "Bolivia"
                },
                JP: {
                    path: "M781.12,166.87l1.81,0.68l1.62,-0.97l0.39,2.42l-3.35,0.75l-2.23,2.88l-3.63,-1.9l-0.56,0.2l-1.26,3.05l-2.16,0.03l-0.29,-2.51l1.08,-2.03l2.45,-0.16l0.37,-0.33l1.25,-5.94l2.47,2.71l2.03,1.12ZM773.56,187.34l-0.91,2.22l0.37,1.52l-1.14,1.75l-3.02,1.26l-4.58,0.27l-3.34,3.01l-1.25,-0.8l-0.09,-1.9l-0.46,-0.38l-4.35,0.62l-3.0,1.32l-2.85,0.05l-0.37,0.27l0.13,0.44l2.32,1.89l-1.54,4.34l-1.26,0.9l-0.79,-0.7l0.56,-2.27l-0.21,-0.45l-1.47,-0.75l-0.74,-1.4l2.12,-0.84l1.26,-1.7l2.45,-1.42l1.83,-1.91l4.78,-0.81l2.6,0.57l0.44,-0.21l2.39,-4.66l1.29,1.06l0.5,0.01l5.1,-4.02l1.69,-3.73l-0.38,-3.4l0.9,-1.61l2.14,-0.44l1.23,3.72l-0.07,2.18l-2.23,2.84l-0.04,3.16ZM757.78,196.26l0.19,0.56l-1.01,1.21l-1.16,-0.68l-1.28,0.65l-0.69,1.45l-1.02,-0.5l0.01,-0.93l1.14,-1.38l1.57,0.14l0.85,-0.98l1.4,0.46Z",
                    name: "Japan"
                },
                BI: {
                    path: "M495.45,295.49l-1.08,-2.99l1.14,-0.11l0.64,-1.19l0.76,0.09l0.65,1.83l-2.1,2.36Z",
                    name: "Burundi"
                },
                BJ: {
                    path: "M429.57,255.75l-0.05,0.8l0.5,1.34l-0.42,0.86l0.17,0.79l-1.81,2.12l-0.57,1.76l-0.08,5.42l-1.41,0.2l-0.48,-1.36l0.11,-5.71l-0.52,-0.7l-0.2,-1.35l-1.48,-1.48l0.21,-0.9l0.89,-0.43l0.42,-0.92l1.27,-0.36l1.22,-1.34l0.61,-0.0l1.62,1.24Z",
                    name: "Benin"
                },
                BT: {
                    path: "M650.32,213.86l0.84,0.71l-0.12,1.1l-3.76,-0.11l-1.57,0.4l-1.93,-0.87l1.48,-1.96l1.13,-0.57l1.63,0.57l1.33,0.08l0.99,0.65Z",
                    name: "Bhutan"
                },
                JM: {
                    path: "M228.38,239.28l-0.8,0.4l-2.26,-1.06l0.84,-0.23l2.14,0.3l1.17,0.56l-1.08,0.03Z",
                    name: "Jamaica"
                },
                BW: {
                    path: "M483.92,330.07l2.27,4.01l2.83,2.86l0.96,0.31l0.78,2.43l2.13,0.61l1.02,0.76l-3.0,1.64l-2.32,2.02l-1.54,2.69l-1.52,0.45l-0.64,1.94l-1.34,0.52l-1.85,-0.12l-1.21,-0.74l-1.35,-0.3l-1.22,0.62l-0.75,1.37l-2.31,1.9l-1.4,0.21l-0.35,-0.59l0.16,-1.75l-1.48,-2.54l-0.62,-0.43l-0.0,-7.1l2.08,-0.08l0.39,-0.4l0.07,-8.9l5.19,-0.93l0.8,0.89l0.51,0.07l1.5,-0.95l2.21,-0.49Z",
                    name: "Botswana"
                },
                BR: {
                    path: "M259.98,275.05l3.24,0.7l0.65,-0.53l4.55,-1.32l1.08,-1.06l-0.02,-0.63l0.55,-0.05l0.28,0.28l-0.26,0.87l0.22,0.48l0.73,0.32l0.4,0.81l-0.62,0.86l-0.4,2.13l0.82,2.56l1.69,1.43l1.43,0.2l3.17,-1.68l3.18,0.3l0.65,-0.75l-0.27,-0.92l1.9,-0.09l2.39,0.99l1.06,-0.61l0.84,0.78l1.2,-0.18l1.18,-1.06l0.84,-1.94l1.36,-2.11l0.37,-0.05l1.89,5.45l1.33,0.59l0.05,1.28l-1.77,1.94l0.02,0.56l1.02,0.87l4.07,0.36l0.08,2.16l0.66,0.29l1.74,-1.5l6.97,2.32l1.02,1.22l-0.35,1.18l0.49,0.5l2.81,-0.74l4.77,1.3l3.75,-0.08l3.57,2.0l3.29,2.86l1.93,0.72l2.12,0.12l0.71,0.62l1.21,4.51l-0.95,3.98l-4.72,5.06l-1.64,2.92l-1.72,2.05l-0.8,0.3l-0.72,2.03l0.18,4.75l-0.94,5.53l-0.81,1.13l-0.43,3.36l-2.55,3.5l-0.4,2.51l-1.86,1.04l-0.67,1.53l-2.54,0.01l-3.94,1.01l-1.83,1.2l-2.87,0.82l-3.03,2.19l-2.2,2.83l-0.36,2.0l0.4,1.58l-0.44,2.6l-0.51,1.2l-1.77,1.54l-2.75,4.78l-3.83,3.42l-1.24,2.74l-1.18,1.15l-0.36,-0.83l0.95,-1.14l0.01,-0.5l-1.52,-1.97l-4.56,-3.32l-1.03,-0.0l-2.38,-2.02l-0.81,-0.0l5.34,-5.45l3.77,-2.58l0.22,-2.46l-1.35,-1.81l-0.91,0.07l0.58,-2.33l0.01,-1.54l-1.11,-0.83l-1.75,0.3l-0.44,-3.11l-0.52,-0.95l-1.88,-0.88l-1.24,0.47l-2.17,-0.41l0.15,-3.21l-0.62,-1.34l0.66,-0.73l-0.22,-1.34l0.66,-1.13l0.44,-2.04l-0.61,-1.83l-1.4,-0.86l-0.2,-0.75l0.34,-1.39l-0.38,-0.5l-4.52,-0.1l-0.72,-2.22l0.59,-0.42l-0.03,-1.1l-0.5,-0.87l-0.32,-1.7l-1.45,-0.76l-1.63,-0.02l-1.05,-0.72l-1.6,-0.48l-1.13,-0.99l-2.69,-0.4l-2.47,-2.06l0.13,-4.35l-0.45,-0.45l-3.46,0.5l-3.44,1.94l-0.6,0.74l-2.9,-0.17l-1.47,0.42l-0.72,-0.18l0.15,-3.52l-0.63,-0.34l-1.94,1.41l-1.87,-0.06l-0.83,-1.18l-1.37,-0.26l0.21,-1.01l-1.35,-1.49l-0.88,-1.91l0.56,-0.6l-0.0,-0.81l1.29,-0.62l0.22,-0.43l-0.22,-1.19l0.61,-0.91l0.15,-0.99l2.65,-1.58l1.99,-0.47l0.42,-0.36l2.06,0.11l0.42,-0.33l1.19,-8.0l-0.41,-1.56l-1.1,-1.0l0.01,-1.33l1.91,-0.42l0.08,-0.96l-0.33,-0.43l-1.14,-0.2l-0.02,-0.83l4.47,0.05l0.82,-0.67l0.82,1.81l0.8,0.07l1.15,1.1l2.26,-0.05l0.71,-0.83l2.78,-0.96l0.48,-1.13l1.6,-0.64l0.24,-0.47l-0.48,-0.82l-1.83,-0.19l-0.36,-3.22Z",
                    name: "Brazil"
                },
                BS: {
                    path: "M226.4,223.87l-0.48,-1.15l-0.84,-0.75l0.36,-1.11l0.95,1.95l0.01,1.06ZM225.56,216.43l-1.87,0.29l-0.04,-0.22l0.74,-0.14l1.17,0.06Z",
                    name: "Bahamas"
                },
                BY: {
                    path: "M493.84,128.32l0.29,0.7l0.49,0.23l1.19,-0.38l2.09,0.72l0.19,1.26l-0.45,1.24l1.57,2.26l0.89,0.59l0.17,0.81l1.58,0.56l0.4,0.5l-0.53,0.41l-1.87,-0.11l-0.73,0.38l-0.13,0.52l1.04,2.74l-1.91,0.26l-0.89,0.99l-0.11,1.18l-2.73,-0.04l-0.53,-0.62l-0.52,-0.08l-0.75,0.46l-0.91,-0.42l-1.92,-0.07l-2.75,-0.79l-2.6,-0.28l-2.0,0.07l-1.5,0.92l-0.67,0.07l-0.08,-1.22l-0.59,-1.19l1.36,-0.88l0.01,-1.35l-0.7,-1.41l-0.07,-1.0l2.16,-0.02l2.72,-1.3l0.75,-2.04l1.91,-1.04l0.2,-0.41l-0.19,-1.25l3.8,-1.78l2.3,0.77Z",
                    name: "Belarus"
                },
                BZ: {
                    path: "M198.03,244.38l0.1,-4.49l0.69,-0.06l0.74,-1.3l0.34,0.28l-0.4,1.3l0.17,0.58l-0.34,2.25l-1.3,1.42Z",
                    name: "Belize"
                },
                RU: {
                    path: "M491.55,115.25l2.55,-1.85l-0.01,-0.65l-2.2,-1.5l7.32,-6.76l1.03,-2.11l-0.13,-0.49l-3.46,-2.52l0.86,-2.7l-2.11,-2.81l1.56,-3.67l-2.77,-4.52l2.15,-2.99l-0.08,-0.55l-3.65,-2.73l0.3,-2.54l1.81,-0.37l4.26,-1.77l2.42,-1.45l4.06,2.61l6.79,1.04l9.34,4.85l1.78,1.88l0.14,2.46l-2.55,2.02l-3.9,1.06l-11.07,-3.14l-2.06,0.53l-0.13,0.7l3.94,2.94l0.31,5.86l0.26,0.36l5.14,2.24l0.58,-0.29l0.32,-1.94l-1.35,-1.78l1.13,-1.09l6.13,2.42l2.11,-0.98l0.18,-0.56l-1.51,-2.67l5.41,-3.76l2.07,0.22l2.26,1.41l0.57,-0.16l1.46,-2.87l-0.05,-0.44l-1.92,-2.32l1.12,-2.32l-1.32,-2.27l5.87,1.16l1.04,1.75l-2.59,0.43l-0.33,0.4l0.02,2.36l2.46,1.83l3.87,-0.91l0.86,-2.8l13.69,-5.65l0.99,0.11l-1.92,2.06l0.23,0.67l3.11,0.45l2.0,-1.48l4.56,-0.12l3.64,-1.73l2.65,2.44l0.56,-0.01l2.85,-2.88l-0.01,-0.57l-2.35,-2.29l0.9,-1.01l7.14,1.3l3.41,1.36l9.05,4.97l0.51,-0.11l1.67,-2.27l-0.05,-0.53l-2.43,-2.21l-0.06,-0.78l-0.34,-0.36l-2.52,-0.36l0.64,-1.93l-1.32,-3.46l-0.06,-1.21l4.48,-4.06l1.69,-4.29l1.6,-0.81l6.23,1.18l0.44,2.21l-2.29,3.64l0.06,0.5l1.47,1.39l0.76,3.0l-0.56,6.03l2.69,2.82l-0.96,2.57l-4.86,5.95l0.23,0.64l2.86,0.61l0.42,-0.17l0.93,-1.4l2.64,-1.03l0.87,-2.24l2.09,-1.96l0.07,-0.5l-1.36,-2.28l1.09,-2.69l-0.32,-0.55l-2.47,-0.33l-0.5,-2.06l1.94,-4.38l-0.06,-0.42l-2.96,-3.4l4.12,-2.88l0.16,-0.4l-0.51,-2.93l0.54,-0.05l1.13,2.25l-0.96,4.35l0.27,0.47l2.68,0.84l0.5,-0.51l-1.02,-2.99l3.79,-1.66l5.01,-0.24l4.53,2.61l0.48,-0.06l0.07,-0.48l-2.18,-3.82l-0.23,-4.67l3.98,-0.9l5.97,0.21l5.49,-0.64l0.27,-0.65l-1.83,-2.31l2.56,-2.9l2.87,-0.17l4.8,-2.47l6.54,-0.67l1.03,-1.42l6.25,-0.45l2.32,1.11l5.53,-2.7l4.5,0.08l0.39,-0.28l0.66,-2.15l2.26,-2.12l5.69,-2.11l3.21,1.29l-2.46,0.94l-0.25,0.42l0.34,0.35l5.41,0.77l0.61,2.33l0.58,0.25l2.2,-1.22l7.13,0.07l5.51,2.47l1.79,1.72l-0.53,2.24l-9.16,4.15l-1.97,1.52l0.16,0.71l6.77,1.91l2.16,-0.78l1.13,2.74l0.67,0.11l1.01,-1.15l3.81,-0.73l7.7,0.77l0.54,1.99l0.36,0.29l10.47,0.71l0.43,-0.38l0.13,-3.23l4.87,0.78l3.95,-0.02l3.83,2.4l1.03,2.71l-1.35,1.79l0.02,0.5l3.15,3.64l4.07,1.96l0.53,-0.18l2.23,-4.47l3.95,1.93l4.16,-1.21l4.73,1.39l2.05,-1.26l3.94,0.62l0.43,-0.55l-1.68,-4.02l2.89,-1.8l22.31,3.03l2.16,2.75l6.55,3.51l10.29,-0.81l4.82,0.73l1.85,1.66l-0.29,3.08l0.25,0.41l3.08,1.26l3.56,-0.88l4.35,-0.11l4.8,0.87l4.57,-0.47l4.23,3.79l0.43,0.07l3.1,-1.4l0.16,-0.6l-1.88,-2.62l0.85,-1.52l7.71,1.21l5.22,-0.26l7.09,2.09l9.59,5.22l6.35,4.11l-0.2,2.38l1.88,1.41l0.6,-0.42l-0.48,-2.53l6.15,0.57l4.4,3.51l-1.97,1.43l-4.0,0.41l-0.36,0.39l-0.06,3.79l-0.74,0.62l-2.07,-0.11l-1.91,-1.39l-3.14,-1.11l-0.78,-1.85l-2.72,-0.68l-2.63,0.49l-1.04,-1.1l0.46,-1.31l-0.5,-0.51l-3.0,0.98l-0.22,0.58l0.99,1.7l-1.21,1.48l-3.04,1.68l-3.12,-0.28l-0.4,0.23l0.09,0.46l2.2,2.09l1.46,3.2l1.15,1.1l0.24,1.33l-0.42,0.67l-4.63,-0.77l-6.96,2.9l-2.19,0.44l-7.6,5.06l-0.84,1.45l-3.61,-2.37l-6.24,2.82l-0.94,-1.15l-0.53,-0.08l-2.28,1.52l-3.2,-0.49l-0.44,0.27l-0.78,2.37l-3.05,3.78l0.09,1.47l0.29,0.36l2.54,0.72l-0.29,4.53l-1.97,0.11l-0.35,0.26l-1.07,2.94l0.8,1.45l-3.91,1.58l-1.05,3.95l-3.48,0.77l-0.3,0.3l-0.72,3.29l-3.09,2.65l-0.7,-1.74l-2.44,-12.44l1.16,-4.71l2.04,-2.06l0.22,-1.64l3.8,-0.86l4.46,-4.61l4.28,-3.81l4.48,-3.01l2.17,-5.63l-0.42,-0.54l-3.04,0.33l-1.77,3.31l-5.86,3.86l-1.86,-4.25l-0.45,-0.23l-6.46,1.3l-6.47,6.44l-0.01,0.55l1.58,1.74l-8.24,1.17l0.15,-2.2l-0.34,-0.42l-3.89,-0.56l-3.25,1.81l-7.62,-0.62l-8.45,1.19l-17.71,15.41l0.22,0.7l3.74,0.41l1.36,2.17l2.43,0.76l1.88,-1.68l2.4,0.2l3.4,3.54l0.08,2.6l-1.95,3.42l-0.21,3.9l-1.1,5.06l-3.71,4.54l-0.87,2.21l-8.29,8.89l-3.19,1.7l-1.32,0.03l-1.45,-1.36l-0.49,-0.04l-2.27,1.5l0.41,-3.65l-0.59,-2.47l1.75,-0.89l2.91,0.53l0.42,-0.2l1.68,-3.03l0.87,-3.46l0.97,-1.18l1.32,-2.88l-0.45,-0.56l-4.14,0.95l-2.19,1.25l-3.41,-0.0l-1.06,-2.93l-2.97,-2.3l-4.28,-1.06l-1.75,-5.07l-2.66,-5.01l-2.29,-1.29l-3.75,-1.01l-3.44,0.08l-3.18,0.62l-2.24,1.77l0.05,0.66l1.18,0.69l0.02,1.43l-1.33,1.05l-2.26,3.51l-0.04,1.43l-3.16,1.84l-2.82,-1.16l-3.01,0.23l-1.35,-1.07l-1.5,-0.35l-3.9,2.31l-3.22,0.52l-2.27,0.79l-3.05,-0.51l-2.21,0.03l-1.48,-1.6l-2.6,-1.63l-2.63,-0.43l-5.46,1.01l-3.23,-1.25l-0.72,-2.57l-5.2,-1.24l-2.75,-1.36l-0.5,0.12l-2.59,3.45l0.84,2.1l-2.06,1.93l-3.41,-0.77l-2.42,-0.12l-1.83,-1.54l-2.53,-0.05l-2.42,-0.98l-3.86,1.57l-4.72,2.78l-3.3,0.75l-1.55,-1.92l-3.0,0.41l-1.11,-1.33l-1.62,-0.59l-1.31,-1.94l-1.38,-0.6l-3.7,0.79l-3.31,-1.83l-0.51,0.11l-0.99,1.29l-5.29,-8.05l-2.96,-2.48l0.65,-0.77l0.01,-0.51l-0.5,-0.11l-6.2,3.21l-1.84,0.15l0.15,-1.39l-0.26,-0.42l-3.22,-1.17l-2.46,0.7l-0.69,-3.16l-0.32,-0.31l-4.5,-0.75l-2.47,1.47l-6.19,1.27l-1.29,0.86l-9.51,1.3l-1.15,1.17l-0.03,0.53l1.47,1.9l-1.89,0.69l-0.22,0.56l0.31,0.6l-2.11,1.44l0.03,0.68l3.75,2.12l-0.39,0.98l-3.23,-0.13l-0.86,0.86l-3.09,-1.59l-3.97,0.07l-2.66,1.35l-8.32,-3.56l-4.07,0.06l-5.39,3.68l-0.39,2.0l-2.03,-1.5l-0.59,0.13l-2.0,3.59l0.57,0.93l-1.28,2.16l0.06,0.48l2.13,2.17l1.95,0.04l1.37,1.82l-0.23,1.46l0.25,0.43l0.83,0.33l-0.8,1.31l-2.49,0.62l-2.49,3.2l0.0,0.49l2.17,2.78l-0.15,2.18l2.5,3.24l-1.58,1.59l-0.7,-0.13l-1.63,-1.72l-2.29,-0.84l-0.94,-1.31l-2.34,-0.63l-1.48,0.4l-0.43,-0.47l-3.51,-1.48l-5.76,-1.01l-0.45,0.19l-2.89,-2.34l-2.9,-1.2l-1.53,-1.29l1.29,-0.43l2.08,-2.61l-0.05,-0.55l-0.89,-0.79l3.05,-1.06l0.27,-0.42l-0.07,-0.69l-0.49,-0.35l-1.73,0.39l0.04,-0.68l1.04,-0.72l2.66,-0.48l0.4,-1.32l-0.5,-1.6l0.92,-1.54l0.03,-1.17l-0.29,-0.37l-3.69,-1.06l-1.41,0.02l-1.42,-1.41l-2.19,0.38l-2.77,-1.01l-0.03,-0.59l-0.89,-1.43l-2.0,-0.32l-0.11,-0.54l0.49,-0.53l0.01,-0.53l-1.6,-1.9l-3.58,0.02l-0.88,0.73l-0.46,-0.07l-1.0,-2.79l2.22,-0.02l0.97,-0.74l0.07,-0.57l-0.9,-1.04l-1.35,-0.48l-0.11,-0.7l-0.95,-0.58l-1.38,-1.99l0.46,-0.98l-0.51,-1.96l-2.45,-0.84l-1.21,0.3l-0.46,-0.76l-2.46,-0.83l-0.72,-1.87l-0.21,-1.69l-0.99,-0.85l0.85,-1.17l-0.7,-3.21l1.66,-1.97l-0.16,-0.79ZM749.2,170.72l-0.6,0.4l-0.13,0.16l-0.01,-0.51l0.74,-0.05ZM871.88,65.81l2.17,-0.13l3.19,1.16l-2.39,1.09l-5.63,0.48l-0.26,-0.84l2.92,-1.76ZM797.39,48.49l-2.0,1.36l-3.8,-0.42l-4.25,-1.8l0.35,-0.97l9.69,1.83ZM783.67,46.12l-1.63,3.09l-8.98,-0.13l-4.09,1.14l-4.54,-2.97l1.16,-3.01l3.05,-0.89l6.5,0.22l8.54,2.56ZM778.2,134.98l-0.56,-0.9l0.27,-0.12l0.29,1.01ZM778.34,135.48l0.94,3.53l-0.05,3.38l1.05,3.39l2.18,5.0l-2.89,-0.83l-0.49,0.26l-1.54,4.65l2.42,3.5l-0.04,1.13l-1.24,-1.24l-0.61,0.06l-1.09,1.61l-0.28,-1.61l0.27,-3.1l-0.28,-3.4l0.58,-2.47l0.11,-4.39l-1.46,-3.36l0.21,-4.32l2.15,-1.46l0.07,-0.34ZM771.95,56.61l1.76,-1.42l2.89,-0.42l3.28,1.71l0.14,0.6l-3.27,0.03l-4.81,-0.5ZM683.76,31.09l-13.01,1.93l4.03,-6.35l1.82,-0.56l1.73,0.34l5.99,2.98l-0.56,1.66ZM670.85,27.93l-5.08,0.64l-6.86,-1.57l-3.99,-2.05l-2.1,-4.16l-2.6,-0.87l5.72,-3.5l5.2,-1.28l4.69,2.85l5.59,5.4l-0.56,4.53ZM564.15,68.94l-0.64,0.17l-7.85,-0.57l-0.86,-2.04l-4.28,-1.17l-0.28,-1.94l2.27,-0.89l0.25,-0.39l-0.08,-2.38l4.81,-3.97l-0.15,-0.7l-1.47,-0.38l5.3,-3.81l0.15,-0.44l-0.58,-1.94l5.28,-2.51l8.21,-3.27l8.28,-0.96l4.35,-1.94l4.6,-0.64l1.36,1.61l-1.34,1.28l-16.43,4.94l-7.97,4.88l-7.74,9.63l0.66,4.14l4.16,3.27ZM548.81,18.48l-5.5,1.18l-0.58,1.02l-2.59,0.84l-2.13,-1.07l1.12,-1.42l-0.3,-0.65l-2.33,-0.07l1.68,-0.36l3.47,-0.06l0.42,1.29l0.66,0.16l1.38,-1.34l2.15,-0.88l2.94,1.01l-0.39,0.36ZM477.37,133.15l-4.08,0.05l-2.56,-0.32l0.33,-0.87l3.17,-1.03l3.24,0.96l-0.09,1.23Z",
                    name: "Russia"
                },
                RW: {
                    path: "M497.0,288.25l0.71,1.01l-0.11,1.09l-1.63,0.03l-1.04,1.39l-0.83,-0.11l0.51,-1.2l0.08,-1.34l0.42,-0.41l0.7,0.14l1.19,-0.61Z",
                    name: "Rwanda"
                },
                RS: {
                    path: "M469.4,163.99l0.42,-0.5l-0.01,-0.52l-1.15,-1.63l1.43,-0.62l1.33,0.12l1.17,1.06l0.46,1.13l1.34,0.64l0.35,1.35l1.46,0.9l0.76,-0.29l0.2,0.69l-0.48,0.78l0.22,1.12l1.05,1.22l-0.77,0.8l-0.37,1.52l-1.21,0.08l0.24,-0.64l-0.39,-0.54l-2.08,-1.64l-0.9,0.05l-0.48,0.94l-2.12,-1.37l0.53,-1.6l-1.11,-1.37l0.51,-1.1l-0.41,-0.57Z",
                    name: "Serbia"
                },
                TL: {
                    path: "M734.55,307.93l-0.1,-0.97l4.5,-0.86l-2.82,1.28l-1.59,0.55Z",
                    name: "Timor-Leste"
                },
                TM: {
                    path: "M553.03,173.76l-0.04,0.34l-0.09,-0.22l0.13,-0.12ZM555.87,172.66l0.45,-0.1l1.48,0.74l2.06,2.43l4.07,-0.18l0.38,-0.51l-0.32,-1.19l1.92,-0.94l1.91,-1.59l2.94,1.39l0.43,2.47l1.19,0.67l2.58,-0.13l0.62,0.4l1.32,3.12l4.54,3.44l2.67,1.45l3.06,1.14l-0.04,1.05l-1.33,-0.75l-0.59,0.19l-0.32,0.84l-2.2,0.81l-0.46,2.13l-1.21,0.74l-1.91,0.42l-0.73,1.33l-1.56,0.31l-2.22,-0.94l-0.2,-2.17l-0.38,-0.36l-1.73,-0.09l-2.76,-2.46l-2.14,-0.4l-2.84,-1.48l-1.78,-0.27l-1.24,0.53l-1.57,-0.08l-2.0,1.69l-1.7,0.43l-0.36,-1.58l0.36,-2.98l-0.22,-0.4l-1.65,-0.84l0.54,-1.69l-0.34,-0.52l-1.22,-0.13l0.36,-1.64l2.22,0.59l2.2,-0.95l0.12,-0.65l-1.77,-1.74l-0.66,-1.57Z",
                    name: "Turkmenistan"
                },
                TJ: {
                    path: "M597.75,178.82l-2.54,-0.44l-0.47,0.34l-0.24,1.7l0.43,0.45l2.64,-0.22l3.18,0.95l4.39,-0.41l0.56,2.37l0.52,0.29l0.67,-0.24l1.11,0.49l0.21,2.13l-3.76,-0.21l-1.8,1.32l-1.76,0.74l-0.61,-0.58l0.21,-2.23l-0.64,-0.49l-0.07,-0.93l-1.36,-0.66l-0.45,0.07l-1.08,1.01l-0.55,1.48l-1.31,-0.05l-0.95,1.16l-0.9,-0.35l-1.86,0.74l1.26,-2.83l-0.54,-2.17l-1.67,-0.82l0.33,-0.66l2.18,-0.04l1.19,-1.63l0.76,-1.79l2.43,-0.5l-0.26,1.0l0.73,1.05Z",
                    name: "Tajikistan"
                },
                RO: {
                    path: "M487.53,154.23l0.6,0.24l2.87,3.98l-0.17,2.69l0.45,1.42l1.32,0.81l1.35,-0.42l0.76,0.36l0.02,0.31l-0.83,0.45l-0.59,-0.22l-0.54,0.3l-0.62,3.3l-1.0,-0.22l-2.07,-1.13l-2.95,0.71l-1.25,0.76l-3.51,-0.15l-1.89,-0.47l-0.87,0.16l-0.82,-1.3l0.29,-0.26l-0.06,-0.64l-1.09,-0.34l-0.56,0.5l-1.05,-0.64l-0.39,-1.39l-1.36,-0.65l-0.35,-1.0l-0.83,-0.75l1.54,-0.54l2.66,-4.21l2.4,-1.24l2.96,0.34l1.48,0.73l0.79,-0.45l1.78,-0.3l0.75,-0.74l0.79,0.0Z",
                    name: "Romania"
                },
                GW: {
                    path: "M386.23,253.6l-0.29,0.84l0.15,0.6l-2.21,0.59l-0.86,0.96l-1.04,-0.83l-1.09,-0.23l-0.54,-1.06l-0.66,-0.49l2.41,-0.48l4.13,0.1Z",
                    name: "Guinea-Bissau"
                },
                GT: {
                    path: "M195.08,249.77l-2.48,-0.37l-1.03,-0.45l-1.14,-0.89l0.3,-0.99l-0.24,-0.68l0.96,-1.66l2.98,-0.01l0.4,-0.37l-0.19,-1.28l-1.67,-1.4l0.51,-0.4l0.0,-1.05l3.85,0.02l-0.21,4.53l0.4,0.43l1.46,0.38l-1.48,0.98l-0.35,0.7l0.12,0.57l-2.2,1.96Z",
                    name: "Guatemala"
                },
                GR: {
                    path: "M487.07,174.59l-0.59,1.43l-0.37,0.21l-2.84,-0.35l-3.03,0.77l-0.18,0.68l1.28,1.23l-0.61,0.23l-1.14,0.0l-1.2,-1.39l-0.63,0.03l-0.53,1.01l0.56,1.76l1.03,1.19l-0.56,0.38l-0.05,0.62l2.52,2.12l0.02,0.87l-1.78,-0.59l-0.48,0.56l0.5,1.0l-1.07,0.2l-0.3,0.53l0.75,2.01l-0.98,0.02l-1.84,-1.12l-1.37,-4.2l-2.21,-2.95l-0.11,-0.56l1.04,-1.28l0.2,-0.95l0.85,-0.66l0.03,-0.46l1.32,-0.21l1.01,-0.64l1.22,0.05l0.65,-0.56l2.26,-0.0l1.82,-0.75l1.85,1.0l2.28,-0.28l0.35,-0.39l0.01,-0.77l0.34,0.22ZM480.49,192.16l0.58,0.4l-0.68,-0.12l0.11,-0.28ZM482.52,192.82l2.51,0.06l0.24,0.32l-1.99,0.13l-0.77,-0.51Z",
                    name: "Greece"
                },
                GQ: {
                    path: "M448.79,279.62l0.02,2.22l-4.09,0.0l0.69,-2.27l3.38,0.05Z",
                    name: "Eq. Guinea"
                },
                GY: {
                    path: "M277.42,270.07l-0.32,1.83l-1.32,0.57l-0.23,0.46l-0.28,2.0l1.11,1.82l0.83,0.19l0.32,1.25l1.13,1.62l-1.21,-0.19l-1.08,0.71l-1.77,0.5l-0.44,0.46l-0.86,-0.09l-1.32,-1.01l-0.77,-2.27l0.36,-1.9l0.68,-1.23l-0.57,-1.17l-0.74,-0.43l0.12,-1.16l-0.9,-0.69l-1.1,0.09l-1.31,-1.48l0.53,-0.72l-0.04,-0.84l1.99,-0.86l0.05,-0.59l-0.71,-0.78l0.14,-0.57l1.66,-1.24l1.36,0.77l1.41,1.49l0.06,1.15l0.37,0.38l0.8,0.05l2.06,1.86Z",
                    name: "Guyana"
                },
                GE: {
                    path: "M521.71,168.93l5.29,0.89l4.07,2.01l1.41,-0.44l2.07,0.56l0.68,1.1l1.07,0.55l-0.12,0.59l0.98,1.29l-1.01,-0.13l-1.81,-0.83l-0.94,0.47l-3.23,0.43l-2.29,-1.39l-2.33,0.05l0.21,-0.97l-0.76,-2.26l-1.45,-1.12l-1.43,-0.39l-0.41,-0.42Z",
                    name: "Georgia"
                },
                GB: {
                    path: "M412.61,118.72l-2.19,3.22l-0.0,0.45l5.13,-0.3l-0.53,2.37l-2.2,3.12l0.29,0.63l2.37,0.21l2.33,4.3l1.76,0.69l2.2,5.12l2.94,0.77l-0.23,1.62l-1.15,0.88l-0.1,0.52l0.82,1.42l-1.86,1.43l-3.3,-0.02l-4.12,0.87l-1.04,-0.58l-0.47,0.06l-1.51,1.41l-2.12,-0.34l-1.86,1.18l-0.6,-0.29l3.19,-3.0l2.16,-0.69l0.28,-0.41l-0.34,-0.36l-3.73,-0.53l-0.4,-0.76l2.2,-0.87l0.17,-0.61l-1.26,-1.67l0.36,-1.7l3.38,0.28l0.43,-0.33l0.37,-1.99l-1.79,-2.49l-3.11,-0.72l-0.38,-0.59l0.79,-1.35l-0.04,-0.46l-0.82,-0.97l-0.61,0.01l-0.68,0.84l-0.1,-2.34l-1.23,-1.88l0.85,-3.47l1.77,-2.68l1.85,0.26l2.17,-0.22ZM406.26,132.86l-1.01,1.77l-1.57,-0.59l-1.16,0.01l0.37,-1.54l-0.39,-1.39l1.45,-0.1l2.3,1.84Z",
                    name: "United Kingdom"
                },
                GA: {
                    path: "M453.24,279.52l-0.08,0.98l0.7,1.29l2.36,0.24l-0.98,2.63l1.18,1.79l0.25,1.78l-0.29,1.52l-0.6,0.93l-1.84,-0.09l-1.23,-1.11l-0.66,0.23l-0.15,0.84l-1.42,0.26l-1.02,0.7l-0.11,0.52l0.77,1.35l-1.34,0.97l-3.94,-4.3l-1.44,-2.45l0.06,-0.6l0.54,-0.81l1.05,-3.46l4.17,-0.07l0.4,-0.4l-0.02,-2.66l2.39,0.21l1.25,-0.27Z",
                    name: "Gabon"
                },
                GN: {
                    path: "M391.8,254.11l0.47,0.8l1.11,-0.32l0.98,0.7l1.07,0.2l2.26,-1.22l0.64,0.44l1.13,1.56l-0.48,1.4l0.8,0.3l-0.08,0.48l0.46,0.68l-0.35,1.36l1.05,2.61l-1.0,0.69l0.03,1.41l-0.72,-0.06l-1.08,1.0l-0.24,-0.27l0.07,-1.11l-1.05,-1.54l-1.79,0.21l-0.35,-2.01l-1.6,-2.18l-2.0,-0.0l-1.31,0.54l-1.95,2.18l-1.86,-2.19l-1.2,-0.78l-0.3,-1.11l-0.8,-0.85l0.65,-0.72l0.81,-0.03l1.64,-0.8l0.23,-1.87l2.67,0.64l0.89,-0.3l1.21,0.15Z",
                    name: "Guinea"
                },
                GM: {
                    path: "M379.31,251.39l0.1,-0.35l2.43,-0.07l0.74,-0.61l0.51,-0.03l0.77,0.49l-1.03,-0.3l-1.87,0.9l-1.65,-0.04ZM384.03,250.91l0.91,0.05l0.75,-0.24l-0.59,0.31l-1.08,-0.13Z",
                    name: "Gambia"
                },
                GL: {
                    path: "M353.02,1.2l14.69,4.67l-3.68,1.89l-22.97,0.86l-0.36,0.27l0.12,0.43l1.55,1.18l8.79,-0.66l7.48,2.07l4.86,-1.77l1.66,1.73l-2.53,3.19l-0.01,0.48l0.46,0.15l6.35,-2.2l12.06,-2.31l7.24,1.13l1.09,1.99l-9.79,4.01l-1.44,1.32l-7.87,0.98l-0.35,0.41l0.38,0.38l5.07,0.24l-2.53,3.58l-2.07,3.81l0.08,6.05l2.57,3.11l-3.22,0.2l-4.12,1.66l-0.05,0.72l4.45,2.65l0.51,3.75l-2.3,0.4l-0.25,0.64l2.79,3.69l-4.82,0.31l-0.36,0.29l0.16,0.44l2.62,1.8l-0.59,1.22l-3.3,0.7l-3.45,0.01l-0.29,0.68l3.03,3.12l0.02,1.34l-4.4,-1.73l-1.72,1.35l0.15,0.66l3.31,1.15l3.13,2.71l0.81,3.16l-3.85,0.75l-4.89,-4.26l-0.47,-0.03l-0.17,0.44l0.79,2.86l-2.71,2.21l-0.13,0.44l0.37,0.27l8.73,0.34l-12.32,6.64l-7.24,1.48l-2.94,0.08l-2.69,1.75l-3.43,4.41l-5.24,2.84l-1.73,0.18l-7.12,2.1l-2.15,2.52l-0.13,2.99l-1.19,2.45l-4.01,3.09l-0.14,0.44l0.97,2.9l-2.28,6.48l-3.1,0.2l-3.83,-3.07l-4.86,-0.02l-2.25,-1.93l-1.7,-3.79l-4.3,-4.84l-1.21,-2.49l-0.44,-3.8l-3.32,-3.63l0.84,-2.86l-1.56,-1.7l2.28,-4.6l3.83,-1.74l1.03,-1.96l0.52,-3.47l-0.59,-0.41l-4.17,2.21l-2.07,0.58l-2.72,-1.28l-0.15,-2.71l0.85,-2.09l2.01,-0.06l5.06,1.2l0.46,-0.23l-0.14,-0.49l-6.54,-4.47l-2.67,0.55l-1.58,-0.86l2.56,-4.01l-0.03,-0.48l-1.5,-1.74l-4.98,-8.5l-3.13,-1.96l0.03,-1.88l-0.24,-0.37l-6.85,-3.02l-5.36,-0.38l-12.7,0.58l-2.78,-1.57l-3.66,-2.77l5.73,-1.45l5.0,-0.28l0.38,-0.38l-0.35,-0.41l-10.67,-1.38l-5.3,-2.06l0.25,-1.54l18.41,-5.26l1.22,-2.27l-0.25,-0.55l-6.14,-1.86l1.68,-1.77l8.55,-4.03l3.59,-0.63l0.3,-0.54l-0.88,-2.27l5.47,-1.47l7.65,-0.95l7.55,-0.05l3.04,1.85l6.48,-3.27l5.81,2.22l3.56,0.5l5.16,1.94l0.5,-0.21l-0.17,-0.52l-5.71,-3.13l0.28,-2.13l8.12,-3.6l8.7,0.28l3.35,-2.34l8.71,-0.6l19.93,0.8Z",
                    name: "Greenland"
                },
                GH: {
                    path: "M420.53,257.51l-0.01,0.72l0.96,1.2l0.24,3.73l0.59,0.95l-0.51,2.1l0.19,1.41l1.02,2.21l-6.97,2.84l-1.8,-0.57l0.04,-0.89l-1.02,-2.04l0.61,-2.65l1.07,-2.32l-0.96,-6.47l5.01,0.07l0.94,-0.39l0.61,0.11Z",
                    name: "Ghana"
                },
                OM: {
                    path: "M568.09,230.93l-0.91,1.67l-1.22,0.04l-0.6,0.76l-0.41,1.51l0.27,1.58l-1.16,0.05l-1.56,0.97l-0.76,1.74l-1.62,0.05l-0.98,0.65l-0.17,1.15l-0.89,0.52l-1.49,-0.18l-2.4,0.94l-2.47,-5.4l7.35,-2.71l1.67,-5.23l-1.12,-2.09l0.05,-0.83l0.67,-1.0l0.07,-1.05l0.9,-0.42l-0.05,-2.07l0.7,-0.01l1.0,1.62l1.51,1.08l3.3,0.84l1.73,2.29l0.81,0.37l-1.23,2.35l-0.99,0.79Z",
                    name: "Oman"
                },
                TN: {
                    path: "M448.1,188.24l-1.0,1.27l-0.02,1.32l0.84,0.88l-0.28,2.09l-1.53,1.32l-0.12,0.42l0.48,1.54l1.42,0.32l0.53,1.11l0.9,0.52l-0.11,1.67l-3.54,2.64l-0.1,2.38l-0.58,0.3l-0.96,-4.45l-1.54,-1.25l-0.16,-0.78l-1.92,-1.56l-0.18,-1.76l1.51,-1.62l0.59,-2.34l-0.38,-2.78l0.42,-1.21l2.45,-1.05l1.29,0.26l-0.06,1.11l0.58,0.38l1.47,-0.73Z",
                    name: "Tunisia"
                },
                JO: {
                    path: "M518.64,201.38l-5.14,1.56l-0.19,0.65l2.16,2.39l-0.89,1.14l-1.71,0.34l-1.71,1.8l-2.34,-0.37l1.21,-4.32l0.56,-4.07l2.8,0.94l4.46,-2.71l0.79,2.66Z",
                    name: "Jordan"
                },
                HR: {
                    path: "M455.59,162.84l1.09,0.07l-0.82,0.94l-0.27,-1.01ZM456.96,162.92l0.62,-0.41l1.73,0.45l0.42,-0.4l-0.01,-0.59l0.86,-0.52l0.2,-1.05l1.63,-0.68l2.57,1.68l2.07,0.6l0.87,-0.31l1.05,1.57l-0.52,0.63l-1.05,-0.56l-1.68,0.04l-2.1,-0.5l-1.29,0.06l-0.57,0.49l-0.59,-0.47l-0.62,0.16l-0.46,1.7l1.79,2.42l2.79,2.75l-1.18,-0.87l-2.21,-0.87l-1.67,-1.78l0.13,-0.63l-1.05,-1.19l-0.32,-1.27l-1.42,-0.43Z",
                    name: "Croatia"
                },
                HT: {
                    path: "M237.05,238.38l-1.16,0.43l-0.91,-0.55l0.05,-0.2l2.02,0.31ZM237.53,238.43l1.06,0.12l-0.05,0.01l-1.01,-0.12ZM239.25,238.45l0.79,-0.51l0.06,-0.62l-1.02,-1.0l0.02,-0.82l-0.3,-0.4l-0.93,-0.32l3.16,0.45l0.02,1.84l-0.48,0.34l-0.08,0.58l0.54,0.72l-1.78,-0.26Z",
                    name: "Haiti"
                },
                HU: {
                    path: "M462.08,157.89l0.65,-1.59l-0.09,-0.44l0.64,-0.0l0.39,-0.34l0.1,-0.69l1.75,0.87l2.32,-0.37l0.43,-0.66l3.49,-0.78l0.69,-0.78l0.57,-0.14l2.57,0.93l0.67,-0.23l1.03,0.65l0.08,0.37l-1.42,0.71l-2.59,4.14l-1.8,0.53l-1.68,-0.1l-2.74,1.23l-1.85,-0.54l-2.54,-1.66l-0.66,-1.1Z",
                    name: "Hungary"
                },
                HN: {
                    path: "M199.6,249.52l-1.7,-1.21l0.06,-0.94l3.04,-2.14l2.37,0.28l1.27,-0.09l1.1,-0.52l1.3,0.28l1.14,-0.25l1.38,0.37l2.23,1.37l-2.36,0.93l-1.23,-0.39l-0.88,1.3l-1.28,0.99l-0.98,-0.22l-0.42,0.52l-0.96,0.05l-0.36,0.41l0.04,0.88l-0.52,0.6l-0.3,0.04l-0.3,-0.55l-0.66,-0.31l0.11,-0.67l-0.48,-0.65l-0.87,-0.26l-0.73,0.2Z",
                    name: "Honduras"
                },
                PR: {
                    path: "M256.17,238.73l-0.26,0.27l-2.83,0.05l-0.07,-0.55l1.95,-0.1l1.22,0.33Z",
                    name: "Puerto Rico"
                },
                PS: {
                    path: "M509.21,203.07l0.1,-0.06l-0.02,0.03l-0.09,0.03ZM509.36,202.91l-0.02,-0.63l-0.33,-0.16l0.31,-1.09l0.24,0.1l-0.2,1.78Z",
                    name: "Palestine"
                },
                PT: {
                    path: "M401.84,187.38l-0.64,0.47l-1.13,-0.35l-0.91,0.17l0.28,-1.78l-0.24,-1.78l-1.25,-0.56l-0.45,-0.84l0.17,-1.66l1.01,-1.18l0.69,-2.92l-0.04,-1.39l-0.59,-1.9l1.3,-0.85l0.84,1.35l3.1,-0.3l0.46,0.99l-1.05,0.94l-0.03,2.16l-0.41,0.57l-0.08,1.1l-0.79,0.18l-0.26,0.59l0.91,1.6l-0.63,1.75l0.76,1.09l-1.1,1.52l0.07,1.05Z",
                    name: "Portugal"
                },
                PY: {
                    path: "M274.9,336.12l0.74,1.52l-0.16,3.45l0.32,0.41l2.64,0.5l1.11,-0.47l1.4,0.59l0.36,0.6l0.53,3.42l1.27,0.4l0.98,-0.38l0.51,0.27l-0.0,1.18l-1.21,5.32l-2.09,1.9l-1.8,0.4l-4.71,-0.98l2.2,-3.63l-0.32,-1.5l-2.78,-1.28l-3.03,-1.94l-2.07,-0.44l-4.34,-4.06l0.91,-2.9l0.08,-1.42l1.07,-2.04l4.13,-0.72l2.18,0.03l2.05,1.17l0.03,0.59Z",
                    name: "Paraguay"
                },
                PA: {
                    path: "M213.8,263.68l0.26,-1.52l-0.36,-0.26l-0.01,-0.49l0.44,-0.1l0.93,1.4l1.26,0.03l0.77,0.49l1.38,-0.23l2.51,-1.11l0.86,-0.72l3.45,0.85l1.4,1.18l0.41,1.74l-0.21,0.34l-0.53,-0.12l-0.47,0.29l-0.16,0.6l-0.68,-1.28l0.45,-0.49l-0.19,-0.66l-0.47,-0.13l-0.54,-0.84l-1.5,-0.75l-1.1,0.16l-0.75,0.99l-1.62,0.84l-0.18,0.96l0.85,0.97l-0.58,0.45l-0.69,0.08l-0.34,-1.18l-1.27,0.03l-0.71,-1.05l-2.59,-0.46Z",
                    name: "Panama"
                },
                PG: {
                    path: "M808.58,298.86l2.54,2.56l-0.13,0.26l-0.33,0.12l-0.87,-0.78l-1.22,-2.16ZM801.41,293.04l0.5,0.29l0.26,0.27l-0.49,-0.35l-0.27,-0.21ZM803.17,294.58l0.59,0.5l0.08,1.06l-0.29,-0.91l-0.38,-0.65ZM796.68,298.41l0.52,0.75l1.43,-0.19l2.27,-1.81l-0.01,-1.43l1.12,0.16l-0.04,1.1l-0.7,1.28l-1.12,0.18l-0.62,0.79l-2.46,1.11l-1.17,-0.0l-3.08,-1.25l3.41,0.0l0.45,-0.68ZM789.15,303.55l2.31,1.8l1.59,2.61l1.34,0.13l-0.06,0.66l0.31,0.43l1.06,0.24l0.06,0.65l2.25,1.05l-1.22,0.13l-0.72,-0.63l-4.56,-0.65l-3.22,-2.87l-1.49,-2.34l-3.27,-1.1l-2.38,0.72l-1.59,0.86l-0.2,0.42l0.27,1.55l-1.55,0.68l-1.36,-0.4l-2.21,-0.09l-0.08,-15.41l8.39,2.93l2.95,2.4l0.6,1.64l4.02,1.49l0.31,0.68l-1.76,0.21l-0.33,0.52l0.55,1.68Z",
                    name: "Papua New Guinea"
                },
                PE: {
                    path: "M244.96,295.21l-1.26,-0.07l-0.57,0.42l-1.93,0.45l-2.98,1.75l-0.36,1.36l-0.58,0.8l0.12,1.37l-1.24,0.59l-0.22,1.22l-0.62,0.84l1.04,2.27l1.28,1.44l-0.41,0.84l0.32,0.57l1.48,0.13l1.16,1.37l2.21,0.07l1.63,-1.08l-0.13,3.02l0.3,0.4l1.14,0.29l1.31,-0.34l1.9,3.59l-0.48,0.85l-0.17,3.85l-0.94,1.59l0.35,0.75l-0.47,1.07l0.98,1.97l-2.1,3.82l-0.98,0.5l-2.17,-1.28l-0.39,-1.16l-4.95,-2.58l-4.46,-2.79l-1.84,-1.51l-0.91,-1.84l0.3,-0.96l-2.11,-3.33l-4.82,-9.68l-1.04,-1.2l-0.87,-1.94l-3.4,-2.48l0.58,-1.18l-1.13,-2.23l0.66,-1.49l1.45,-1.15l-0.6,0.98l0.07,0.92l0.47,0.36l1.74,0.03l0.97,1.17l0.54,0.07l1.42,-1.03l0.6,-1.84l1.42,-2.02l3.04,-1.04l2.73,-2.62l0.86,-1.74l-0.1,-1.87l1.44,1.02l0.9,1.25l1.06,0.59l1.7,2.73l1.86,0.31l1.45,-0.61l0.96,0.39l1.36,-0.19l1.45,0.89l-1.4,2.21l0.31,0.61l0.59,0.05l0.47,0.5Z",
                    name: "Peru"
                },
                PK: {
                    path: "M615.09,192.34l-1.83,1.81l-2.6,0.39l-3.73,-0.68l-1.58,1.33l-0.09,0.42l1.77,4.39l1.7,1.23l-1.69,1.27l-0.12,2.14l-2.33,2.64l-1.6,2.8l-2.46,2.67l-3.03,-0.07l-2.76,2.83l0.05,0.6l1.5,1.11l0.26,1.9l1.44,1.5l0.37,1.68l-5.01,-0.01l-1.78,1.7l-1.42,-0.52l-0.76,-1.87l-2.27,-2.15l-11.61,0.86l0.71,-2.34l3.43,-1.32l0.25,-0.44l-0.21,-1.24l-1.2,-0.65l-0.28,-2.46l-2.29,-1.14l-1.28,-1.94l2.82,0.94l2.62,-0.38l1.42,0.33l0.76,-0.56l1.71,0.19l3.25,-1.14l0.27,-0.36l0.08,-2.19l1.18,-1.32l1.68,0.0l0.58,-0.82l1.6,-0.3l1.19,0.16l0.98,-0.78l0.02,-1.88l0.93,-1.47l1.48,-0.66l0.19,-0.55l-0.66,-1.25l2.04,-0.11l0.69,-1.01l-0.02,-1.16l1.11,-1.06l-0.17,-1.78l-0.49,-1.03l1.15,-0.98l5.42,-0.91l2.6,-0.82l1.6,1.16l0.97,2.34l3.45,0.97Z",
                    name: "Pakistan"
                },
                PH: {
                    path: "M737.01,263.84l0.39,2.97l-0.44,1.18l-0.55,-1.53l-0.67,-0.14l-1.17,1.28l0.65,2.09l-0.42,0.69l-2.48,-1.23l-0.57,-1.49l0.65,-1.03l-0.1,-0.54l-1.59,-1.19l-0.56,0.08l-0.65,0.87l-1.23,0.0l-1.58,0.97l0.83,-1.8l2.56,-1.42l0.65,0.84l0.45,0.13l1.9,-0.69l0.56,-1.11l1.5,-0.06l0.38,-0.43l-0.09,-1.19l1.21,0.71l0.36,2.02ZM733.59,256.58l0.05,0.75l0.08,0.26l-0.8,-0.42l-0.18,-0.71l0.85,0.12ZM734.08,256.1l-0.12,-1.12l-1.0,-1.27l1.36,0.03l0.53,0.73l0.51,2.04l-1.27,-0.4ZM733.76,257.68l0.38,0.98l-0.32,0.15l-0.07,-1.13ZM724.65,238.43l1.46,0.7l0.72,-0.31l-0.32,1.17l0.79,1.71l-0.57,1.84l-1.53,1.04l-0.39,2.25l0.56,2.04l1.63,0.57l1.16,-0.27l2.71,1.23l-0.19,1.08l0.76,0.84l-0.08,0.36l-1.4,-0.9l-0.88,-1.27l-0.66,0.0l-0.38,0.55l-1.6,-1.31l-2.15,0.36l-0.87,-0.39l0.07,-0.61l0.66,-0.55l-0.01,-0.62l-0.75,-0.59l-0.72,0.44l-0.74,-0.87l-0.39,-2.49l0.32,0.27l0.66,-0.28l0.26,-3.97l0.7,-2.02l1.14,0.0ZM731.03,258.87l-0.88,0.85l-1.19,1.94l-1.05,-1.19l0.93,-1.1l0.32,-1.47l0.52,-0.06l-0.27,1.15l0.22,0.45l0.49,-0.12l1.0,-1.32l-0.08,0.85ZM726.83,255.78l0.83,0.38l1.17,-0.0l-0.02,0.48l-2.0,1.4l0.03,-2.26ZM724.81,252.09l-0.38,1.27l-1.42,-1.95l1.2,0.05l0.6,0.63ZM716.55,261.82l1.1,-0.95l0.03,-0.03l-0.28,0.36l-0.85,0.61ZM719.22,259.06l0.04,-0.06l0.8,-1.53l0.16,0.75l-1.0,0.84Z",
                    name: "Philippines"
                },
                PL: {
                    path: "M468.44,149.42l-1.11,-1.54l-1.86,-0.33l-0.48,-1.05l-1.72,-0.37l-0.65,0.69l-0.72,-0.36l0.11,-0.61l-0.33,-0.46l-1.75,-0.27l-1.04,-0.93l-0.94,-1.94l0.16,-1.22l-0.62,-1.8l-0.78,-1.07l0.57,-1.04l-0.48,-1.43l1.41,-0.83l6.91,-2.71l2.14,0.5l0.52,0.91l5.51,0.44l4.55,-0.05l1.07,0.31l0.48,0.84l0.15,1.58l0.65,1.2l-0.01,0.99l-1.27,0.58l-0.19,0.54l0.73,1.48l0.08,1.55l1.2,2.76l-0.17,0.58l-1.23,0.44l-2.27,2.72l0.18,0.95l-1.97,-1.03l-1.98,0.4l-1.36,-0.28l-1.24,0.58l-1.07,-0.97l-1.16,0.24Z",
                    name: "Poland"
                },
                ZM: {
                    path: "M481.47,313.3l0.39,0.31l2.52,0.14l0.99,1.17l2.01,0.35l1.4,-0.64l0.69,1.17l1.78,0.33l1.84,2.35l2.23,0.18l0.4,-0.43l-0.21,-2.74l-0.62,-0.3l-0.48,0.32l-1.98,-1.17l0.72,-5.29l-0.51,-1.18l0.57,-1.3l3.68,-0.62l0.26,0.63l1.21,0.63l0.9,-0.22l2.16,0.67l1.33,0.71l1.07,1.02l0.56,1.87l-0.88,2.7l0.43,2.09l-0.73,0.87l-0.76,2.37l0.59,0.68l-6.6,1.83l-0.29,0.44l0.19,1.45l-1.68,0.35l-1.43,1.02l-0.38,0.87l-0.87,0.26l-3.48,3.69l-4.16,-0.53l-1.52,-1.0l-1.77,-0.13l-1.83,0.52l-3.04,-3.4l0.11,-7.59l4.82,0.03l0.39,-0.49l-0.18,-0.76l0.33,-0.83l-0.4,-1.36l0.24,-1.05Z",
                    name: "Zambia"
                },
                EH: {
                    path: "M384.42,230.28l0.25,-0.79l1.06,-1.29l0.8,-3.51l3.38,-2.78l0.7,-1.81l0.06,4.84l-1.98,0.2l-0.94,1.59l0.39,3.56l-3.7,-0.01ZM392.01,218.1l0.7,-1.8l1.77,-0.24l2.09,0.34l0.95,-0.62l1.28,-0.07l-0.0,2.51l-6.79,-0.12Z",
                    name: "W. Sahara"
                },
                EE: {
                    path: "M485.71,115.04l2.64,0.6l2.56,0.11l-1.6,1.91l0.61,3.54l-0.81,0.87l-1.78,-0.01l-3.22,-1.76l-1.8,0.45l0.21,-1.53l-0.58,-0.41l-0.69,0.34l-1.26,-1.03l-0.17,-1.63l2.83,-0.92l3.05,-0.52Z",
                    name: "Estonia"
                },
                EG: {
                    path: "M492.06,205.03l1.46,0.42l2.95,-1.64l2.04,-0.21l1.53,0.3l0.59,1.19l0.69,0.04l0.41,-0.64l1.81,0.58l1.95,0.16l1.04,-0.51l1.42,4.08l-2.03,4.54l-1.66,-1.77l-1.76,-3.85l-0.64,-0.12l-0.36,0.67l1.04,2.88l3.44,6.95l1.78,3.04l2.03,2.65l-0.36,0.53l0.23,2.01l2.7,2.19l-28.41,0.0l0.0,-18.96l-0.73,-2.2l0.59,-1.56l-0.32,-1.26l0.68,-0.99l3.06,-0.04l4.82,1.52Z",
                    name: "Egypt"
                },
                ZA: {
                    path: "M467.14,373.21l-0.13,-1.96l-0.68,-1.56l0.7,-0.68l-0.13,-2.33l-4.56,-8.19l0.77,-0.86l0.6,0.45l0.69,1.31l2.83,0.72l1.5,-0.26l2.24,-1.39l0.19,-9.55l1.35,2.3l-0.21,1.5l0.61,1.2l0.4,0.19l1.79,-0.27l2.6,-2.07l0.69,-1.32l0.96,-0.48l2.19,1.04l2.04,0.13l1.77,-0.65l0.85,-2.12l1.38,-0.33l1.59,-2.76l2.15,-1.89l3.41,-1.87l2.0,0.45l1.02,-0.28l0.99,0.2l1.75,5.29l-0.38,3.25l-0.81,-0.23l-1.0,0.46l-0.87,1.68l-0.05,1.16l1.97,1.84l1.47,-0.29l0.69,-1.18l1.09,0.01l-0.76,3.69l-0.58,1.09l-2.2,1.79l-3.17,4.76l-2.8,2.83l-3.57,2.88l-2.53,1.05l-1.22,0.14l-0.51,0.7l-1.18,-0.32l-1.39,0.5l-2.59,-0.52l-1.61,0.33l-1.18,-0.11l-2.55,1.1l-2.1,0.44l-1.6,1.07l-0.85,0.05l-0.93,-0.89l-0.93,-0.15l-0.97,-1.13l-0.25,0.05ZM491.45,364.19l0.62,-0.93l1.48,-0.59l1.18,-2.19l-0.07,-0.49l-1.99,-1.69l-1.66,0.56l-1.43,1.14l-1.34,1.73l0.02,0.51l1.88,2.11l1.31,-0.16Z",
                    name: "South Africa"
                },
                EC: {
                    path: "M231.86,285.53l0.29,1.59l-0.69,1.45l-2.61,2.51l-3.13,1.11l-1.53,2.18l-0.49,1.68l-1.0,0.73l-1.02,-1.11l-1.78,-0.16l0.67,-1.15l-0.24,-0.86l1.25,-2.13l-0.54,-1.09l-0.67,-0.08l-0.72,0.87l-0.87,-0.64l0.35,-0.69l-0.36,-1.96l0.81,-0.51l0.45,-1.51l0.92,-1.57l-0.07,-0.97l2.65,-1.33l2.75,1.35l0.77,1.05l2.12,0.35l0.76,-0.32l1.96,1.21Z",
                    name: "Ecuador"
                },
                IT: {
                    path: "M451.59,158.63l3.48,0.94l-0.21,1.17l0.3,0.83l-1.49,-0.24l-2.04,1.1l-0.21,0.39l0.13,1.45l-0.25,1.12l0.82,1.57l2.39,1.63l1.31,2.54l2.79,2.43l2.05,0.08l0.21,0.23l-0.39,0.33l0.09,0.67l4.05,1.97l2.17,1.76l-0.16,0.36l-1.17,-1.08l-2.18,-0.49l-0.44,0.2l-1.05,1.91l0.14,0.54l1.57,0.95l-0.19,0.98l-1.06,0.33l-1.25,2.34l-0.37,0.08l0.0,-0.33l1.0,-2.45l-1.73,-3.17l-1.12,-0.51l-0.88,-1.33l-1.51,-0.51l-1.27,-1.25l-1.75,-0.18l-4.12,-3.21l-1.62,-1.65l-1.03,-3.19l-3.53,-1.36l-1.3,0.51l-1.69,1.41l0.16,-0.72l-0.28,-0.47l-1.14,-0.33l-0.53,-1.96l0.72,-0.78l0.04,-0.48l-0.65,-1.17l0.8,0.39l1.4,-0.23l1.11,-0.84l0.52,0.35l1.19,-0.1l0.75,-1.2l1.53,0.33l1.36,-0.56l0.35,-1.14l1.08,0.32l0.68,-0.64l1.98,-0.44l0.42,0.82ZM459.19,184.75l-0.65,1.65l0.32,1.05l-0.31,0.89l-1.5,-0.85l-4.5,-1.67l0.19,-0.82l2.67,0.23l3.78,-0.48ZM443.93,176.05l1.18,1.66l-0.3,3.32l-1.06,-0.01l-0.77,0.73l-0.53,-0.44l-0.1,-3.37l-0.39,-1.22l1.04,0.01l0.92,-0.68Z",
                    name: "Italy"
                },
                VN: {
                    path: "M690.56,230.25l-2.7,1.82l-2.09,2.46l-0.63,1.95l4.31,6.45l2.32,1.65l1.43,1.94l1.11,4.59l-0.32,4.24l-1.93,1.54l-2.84,1.61l-2.11,2.15l-2.73,2.06l-0.59,-1.05l0.63,-1.53l-0.13,-0.47l-1.34,-1.04l1.51,-0.71l2.55,-0.18l0.3,-0.63l-0.82,-1.14l4.0,-2.07l0.31,-3.05l-0.57,-1.77l0.42,-2.66l-0.73,-1.97l-1.86,-1.76l-3.63,-5.29l-2.72,-1.46l0.36,-0.47l1.5,-0.64l0.21,-0.52l-0.97,-2.27l-0.37,-0.24l-2.83,-0.02l-2.24,-3.9l0.83,-0.4l4.39,-0.29l2.06,-1.31l1.15,0.89l1.88,0.4l-0.17,1.51l1.35,1.16l1.67,0.45Z",
                    name: "Vietnam"
                },
                SB: {
                    path: "M826.69,311.6l-0.61,0.09l-0.2,-0.33l0.37,0.15l0.44,0.09ZM824.18,307.38l-0.26,-0.3l-0.31,-0.91l0.03,0.0l0.54,1.21ZM823.04,309.33l-1.66,-0.22l-0.2,-0.52l1.16,0.28l0.69,0.46ZM819.28,304.68l1.14,0.65l0.02,0.03l-0.81,-0.44l-0.35,-0.23Z",
                    name: "Solomon Is."
                },
                ET: {
                    path: "M516.04,247.79l1.1,0.84l1.63,-0.45l0.68,0.47l1.63,0.03l2.01,0.94l1.73,1.66l1.64,2.07l-1.52,2.04l0.16,1.72l0.39,0.38l2.05,0.0l-0.36,1.03l2.86,3.58l8.32,3.08l1.31,0.02l-6.32,6.75l-3.1,0.11l-2.36,1.77l-1.47,0.04l-0.86,0.79l-1.38,-0.0l-1.32,-0.81l-2.29,1.05l-0.76,0.98l-3.29,-0.41l-3.07,-2.07l-1.8,-0.07l-0.62,-0.6l0.0,-1.24l-0.28,-0.38l-1.15,-0.37l-1.4,-2.59l-1.19,-0.68l-0.47,-1.0l-1.27,-1.23l-1.16,-0.22l0.43,-0.72l1.45,-0.28l0.41,-0.95l-0.03,-2.21l0.68,-2.44l1.05,-0.63l1.43,-3.06l1.57,-1.37l1.02,-2.51l0.35,-1.88l2.52,0.46l0.44,-0.24l0.58,-1.43Z",
                    name: "Ethiopia"
                },
                SO: {
                    path: "M525.13,288.48l-1.13,-1.57l-0.03,-8.86l2.66,-3.38l1.67,-0.13l2.13,-1.69l3.41,-0.23l7.08,-7.55l2.91,-3.69l0.08,-4.82l2.98,-0.67l1.24,-0.86l0.45,-0.0l-0.2,3.0l-1.21,3.62l-2.73,5.97l-2.13,3.65l-5.03,6.16l-8.56,6.4l-2.78,3.08l-0.8,1.56Z",
                    name: "Somalia"
                },
                ZW: {
                    path: "M498.91,341.09l-1.11,-0.22l-0.92,0.28l-2.09,-0.44l-1.5,-1.11l-1.89,-0.43l-0.62,-1.4l-0.01,-0.84l-0.3,-0.38l-0.97,-0.25l-2.71,-2.74l-1.92,-3.32l3.83,0.45l3.73,-3.82l1.08,-0.44l0.26,-0.77l1.25,-0.9l1.41,-0.26l0.5,0.89l1.99,-0.05l1.72,1.17l1.11,0.17l1.05,0.66l0.01,2.99l-0.59,3.76l0.38,0.86l-0.23,1.23l-0.39,0.35l-0.63,1.81l-2.43,2.75Z",
                    name: "Zimbabwe"
                },
                ES: {
                    path: "M416.0,169.21l1.07,1.17l4.61,1.38l1.06,-0.57l2.6,1.26l2.71,-0.3l0.09,1.12l-2.14,1.8l-3.11,0.61l-0.31,0.31l-0.2,0.89l-1.54,1.69l-0.97,2.4l0.84,1.74l-1.32,1.27l-0.48,1.68l-1.88,0.65l-1.66,2.07l-5.36,-0.01l-1.79,1.08l-0.89,0.98l-0.88,-0.17l-0.79,-0.82l-0.68,-1.59l-2.37,-0.63l-0.11,-0.5l1.21,-1.82l-0.77,-1.13l0.61,-1.68l-0.76,-1.62l0.87,-0.49l0.09,-1.25l0.42,-0.6l0.03,-2.11l0.99,-0.69l0.13,-0.5l-1.03,-1.73l-1.46,-0.11l-0.61,0.38l-1.06,0.0l-0.52,-1.23l-0.53,-0.21l-1.32,0.67l-0.01,-1.49l-0.75,-0.96l3.03,-1.88l2.99,0.53l3.32,-0.02l2.63,0.51l6.01,-0.06Z",
                    name: "Spain"
                },
                ER: {
                    path: "M520.38,246.23l3.42,2.43l3.5,3.77l0.84,0.54l-0.95,-0.01l-3.51,-3.89l-2.33,-1.15l-1.73,-0.07l-0.91,-0.51l-1.26,0.51l-1.34,-1.02l-0.61,0.17l-0.66,1.61l-2.35,-0.43l-0.17,-0.67l1.29,-5.29l0.61,-0.61l1.95,-0.53l0.87,-1.01l1.17,2.41l0.68,2.33l1.49,1.43Z",
                    name: "Eritrea"
                },
                ME: {
                    path: "M468.91,172.53l-1.22,-1.02l0.47,-1.81l0.89,-0.72l2.26,1.51l-0.5,0.57l-0.75,-0.27l-1.14,1.73Z",
                    name: "Montenegro"
                },
                MD: {
                    path: "M488.41,153.73l1.4,-0.27l1.72,0.93l1.07,0.15l0.85,0.65l-0.14,0.84l0.96,0.85l1.12,2.47l-1.15,-0.07l-0.66,-0.41l-0.52,0.25l-0.09,0.86l-1.08,1.89l-0.27,-0.86l0.25,-1.34l-0.16,-1.6l-3.29,-4.34Z",
                    name: "Moldova"
                },
                MG: {
                    path: "M545.91,319.14l0.4,3.03l0.62,1.21l-0.21,1.02l-0.57,-0.8l-0.69,-0.01l-0.47,0.76l0.41,2.12l-0.18,0.87l-0.73,0.78l-0.15,2.14l-4.71,15.2l-1.06,2.88l-3.92,1.64l-3.12,-1.49l-0.6,-1.21l-0.19,-2.4l-0.86,-2.05l-0.21,-1.77l0.38,-1.62l1.21,-0.75l0.01,-0.76l1.19,-2.04l0.23,-1.66l-1.06,-2.99l-0.19,-2.21l0.81,-1.33l0.32,-1.46l4.63,-1.22l3.44,-3.0l0.85,-1.4l-0.08,-0.7l0.78,-0.04l1.38,-1.77l0.13,-1.64l0.45,-0.61l1.16,1.69l0.59,1.6Z",
                    name: "Madagascar"
                },
                MA: {
                    path: "M378.78,230.02l0.06,-0.59l0.92,-0.73l0.82,-1.37l-0.09,-1.04l0.79,-1.7l1.31,-1.58l0.96,-0.59l0.66,-1.55l0.09,-1.47l0.81,-1.48l1.72,-1.07l1.55,-2.69l1.16,-0.96l2.44,-0.39l1.94,-1.82l1.31,-0.78l2.09,-2.28l-0.51,-3.65l1.24,-3.7l1.5,-1.75l4.46,-2.57l2.37,-4.47l1.44,0.01l1.68,1.21l2.32,-0.19l3.47,0.65l0.8,1.54l0.16,1.71l0.86,2.96l0.56,0.59l-0.26,0.61l-3.05,0.44l-1.26,1.05l-1.33,0.22l-0.33,0.37l-0.09,1.78l-2.68,1.0l-1.07,1.42l-4.47,1.13l-4.04,2.01l-0.54,4.64l-1.15,0.06l-0.92,0.61l-1.96,-0.35l-2.42,0.54l-0.74,1.9l-0.86,0.4l-1.14,3.26l-3.53,3.01l-0.8,3.55l-0.96,1.1l-0.29,0.82l-4.95,0.18Z",
                    name: "Morocco"
                },
                UZ: {
                    path: "M598.64,172.75l-1.63,1.52l0.06,0.64l1.85,1.12l1.97,-0.64l2.21,1.17l-2.52,1.68l-2.59,-0.22l-0.18,-0.41l0.46,-1.23l-0.45,-0.53l-3.35,0.69l-2.1,3.51l-1.87,-0.12l-1.03,1.51l0.22,0.55l1.64,0.62l0.46,1.83l-1.19,2.49l-2.66,-0.53l0.05,-1.36l-0.26,-0.39l-3.3,-1.23l-2.56,-1.4l-4.4,-3.34l-1.34,-3.14l-1.08,-0.6l-2.58,0.13l-0.69,-0.44l-0.47,-2.52l-3.37,-1.6l-0.43,0.05l-2.07,1.72l-2.1,1.01l-0.21,0.47l0.28,1.01l-1.91,0.03l-0.09,-10.5l5.99,-1.7l6.19,3.54l2.71,2.84l7.05,-0.67l2.71,2.01l-0.17,2.81l0.39,0.42l0.9,0.02l0.44,2.14l0.38,0.32l2.94,0.09l0.95,1.42l1.28,-0.24l1.05,-2.04l4.43,-2.5Z",
                    name: "Uzbekistan"
                },
                MM: {
                    path: "M673.9,230.21l-1.97,1.57l-0.57,0.96l-1.4,0.6l-1.36,1.05l-1.99,0.36l-1.08,2.66l-0.91,0.4l-0.19,0.55l1.21,2.27l2.52,3.43l-0.79,1.91l-0.74,0.41l-0.17,0.52l0.65,1.37l1.61,1.95l0.25,2.58l0.9,2.13l-1.92,3.57l0.68,-2.25l-0.81,-1.74l0.19,-2.65l-1.05,-1.53l-1.24,-6.17l-1.12,-2.26l-0.6,-0.13l-4.34,3.02l-2.39,-0.65l0.77,-2.84l-0.52,-2.61l-1.91,-2.96l0.25,-0.75l-0.29,-0.51l-1.33,-0.3l-1.61,-1.93l-0.1,-1.3l0.82,-0.24l0.04,-1.64l1.02,-0.52l0.21,-0.45l-0.23,-0.95l0.54,-0.96l0.08,-2.22l1.46,0.45l0.47,-0.2l1.12,-2.19l0.16,-1.35l1.33,-2.16l-0.0,-1.52l2.89,-1.66l1.63,0.44l0.5,-0.44l-0.17,-1.4l0.64,-0.36l0.08,-1.04l0.77,-0.11l0.71,1.35l1.06,0.69l-0.03,3.86l-2.38,2.37l-0.3,3.15l0.46,0.43l2.28,-0.38l0.51,2.08l1.47,0.67l-0.6,1.8l0.19,0.48l2.97,1.48l1.64,-0.55l0.02,0.32Z",
                    name: "Myanmar"
                },
                ML: {
                    path: "M392.61,254.08l-0.19,-2.37l-0.99,-0.87l-0.44,-1.3l-0.09,-1.28l0.81,-0.58l0.35,-1.24l2.37,0.65l1.31,-0.47l0.86,0.15l0.66,-0.56l9.83,-0.04l0.38,-0.28l0.56,-1.8l-0.44,-0.65l-2.35,-21.95l3.27,-0.04l16.7,11.38l0.74,1.31l2.5,1.09l0.02,1.38l0.44,0.39l2.34,-0.21l0.01,5.38l-1.28,1.61l-0.26,1.49l-5.31,0.57l-1.07,0.92l-2.9,0.1l-0.86,-0.48l-1.38,0.36l-2.4,1.08l-0.6,0.87l-1.85,1.09l-0.43,0.7l-0.79,0.39l-1.44,-0.21l-0.81,0.84l-0.34,1.64l-1.91,2.02l-0.06,1.03l-0.67,1.22l0.13,1.16l-0.97,0.39l-0.23,-0.64l-0.52,-0.24l-1.35,0.4l-0.34,0.55l-2.69,-0.28l-0.37,-0.35l-0.02,-0.9l-0.65,-0.35l0.45,-0.64l-0.03,-0.53l-2.12,-2.44l-0.76,-0.01l-2.0,1.16l-0.78,-0.15l-0.8,-0.67l-1.21,0.23Z",
                    name: "Mali"
                },
                MN: {
                    path: "M676.61,146.48l3.81,1.68l5.67,-1.0l2.37,0.41l2.34,1.5l1.79,1.75l2.29,-0.03l3.12,0.52l2.47,-0.81l3.41,-0.59l3.53,-2.21l1.25,0.29l1.53,1.13l2.27,-0.21l-2.66,5.01l0.64,1.68l0.47,0.21l1.32,-0.38l2.38,0.48l2.02,-1.11l1.76,0.89l2.06,2.02l-0.13,0.53l-1.72,-0.29l-3.77,0.46l-1.88,0.99l-1.76,1.99l-3.71,1.17l-2.45,1.6l-3.83,-0.87l-0.41,0.17l-1.31,1.99l1.04,2.24l-1.52,0.9l-1.74,1.57l-2.79,1.02l-3.78,0.13l-4.05,1.05l-2.77,1.52l-1.16,-0.85l-2.94,0.0l-3.62,-1.79l-2.58,-0.49l-3.4,0.41l-5.12,-0.67l-2.63,0.06l-1.31,-1.6l-1.4,-3.0l-1.48,-0.33l-3.13,-1.94l-6.16,-0.93l-0.71,-1.06l0.86,-3.82l-1.93,-2.71l-3.5,-1.18l-1.95,-1.58l-0.5,-1.72l2.34,-0.52l4.75,-2.8l3.62,-1.47l2.18,0.97l2.46,0.05l1.81,1.53l2.46,0.12l3.95,0.71l2.43,-2.28l0.08,-0.48l-0.9,-1.72l2.24,-2.98l2.62,1.27l4.94,1.17l0.43,2.24Z",
                    name: "Mongolia"
                },
                MK: {
                    path: "M472.8,173.98l0.49,-0.71l3.57,-0.71l1.0,0.77l0.13,1.45l-0.65,0.53l-1.15,-0.05l-1.12,0.67l-1.39,0.22l-0.79,-0.55l-0.29,-1.03l0.19,-0.6Z",
                    name: "Macedonia"
                },
                MW: {
                    path: "M505.5,309.31l0.85,1.95l0.15,2.86l-0.69,1.65l0.71,1.8l0.06,1.28l0.49,0.64l0.07,1.06l0.4,0.55l0.8,-0.23l0.55,0.61l0.69,-0.21l0.34,0.6l0.19,2.94l-1.04,0.62l-0.54,1.25l-1.11,-1.08l-0.16,-1.56l0.51,-1.31l-0.32,-1.3l-0.99,-0.65l-0.82,0.12l-2.36,-1.64l0.63,-1.96l0.82,-1.18l-0.46,-2.01l0.9,-2.86l-0.94,-2.51l0.96,0.18l0.29,0.4Z",
                    name: "Malawi"
                },
                MR: {
                    path: "M407.36,220.66l-2.58,0.03l-0.39,0.44l2.42,22.56l0.36,0.43l-0.39,1.24l-9.75,0.04l-0.56,0.53l-0.91,-0.11l-1.27,0.45l-1.61,-0.66l-0.97,0.03l-0.36,0.29l-0.38,1.35l-0.42,0.23l-2.93,-3.4l-2.96,-1.52l-1.62,-0.03l-1.27,0.54l-1.12,-0.2l-0.65,0.4l-0.08,-0.49l0.68,-1.29l0.31,-2.43l-0.57,-3.91l0.23,-1.21l-0.69,-1.5l-1.15,-1.02l0.25,-0.39l9.58,0.02l0.4,-0.45l-0.46,-3.68l0.47,-1.04l2.12,-0.21l0.36,-0.4l-0.08,-6.4l7.81,0.13l0.41,-0.4l0.01,-3.31l7.76,5.35Z",
                    name: "Mauritania"
                },
                UG: {
                    path: "M498.55,276.32l0.7,-0.46l1.65,0.5l1.96,-0.57l1.7,0.01l1.45,-0.98l0.91,1.33l1.33,3.95l-2.57,4.03l-1.46,-0.4l-2.54,0.91l-1.37,1.61l-0.01,0.81l-2.42,-0.01l-2.26,1.01l-0.17,-1.59l0.58,-1.04l0.14,-1.94l1.37,-2.28l1.78,-1.58l-0.17,-0.65l-0.72,-0.24l0.13,-2.43Z",
                    name: "Uganda"
                },
                MY: {
                    path: "M717.47,273.46l-1.39,0.65l-2.12,-0.41l-2.88,-0.0l-0.38,0.28l-0.84,2.75l-0.99,0.96l-1.21,3.29l-1.73,0.45l-2.45,-0.68l-1.39,0.31l-1.33,1.15l-1.59,-0.14l-1.41,0.44l-1.44,-1.19l-0.18,-0.73l1.34,0.53l1.93,-0.47l0.75,-2.22l4.02,-1.03l2.75,-3.21l0.82,0.94l0.64,-0.05l0.4,-0.65l0.96,0.06l0.42,-0.36l0.24,-2.68l1.81,-1.64l1.21,-1.86l0.63,-0.01l1.07,1.05l0.34,1.28l3.44,1.35l-0.06,0.35l-1.37,0.1l-0.35,0.54l0.32,0.88ZM673.68,269.59l0.17,1.09l0.47,0.33l1.65,-0.3l0.87,-0.94l1.61,1.52l0.98,1.56l-0.12,2.81l0.41,2.29l0.95,0.9l0.88,2.44l-1.27,0.12l-5.1,-3.67l-0.34,-1.29l-1.37,-1.59l-0.33,-1.97l-0.88,-1.4l0.25,-1.68l-0.46,-1.05l1.63,0.84Z",
                    name: "Malaysia"
                },
                MX: {
                    path: "M133.12,200.41l0.2,0.47l9.63,3.33l6.96,-0.02l0.4,-0.4l0.0,-0.74l3.77,0.0l3.55,2.93l1.39,2.83l1.52,1.04l2.08,0.82l0.47,-0.14l1.46,-2.0l1.73,-0.04l1.59,0.98l2.05,3.35l1.47,1.56l1.26,3.14l2.18,1.02l2.26,0.58l-1.18,3.72l-0.42,5.04l1.79,4.89l1.62,1.89l0.61,1.52l1.2,1.42l2.55,0.66l1.37,1.1l7.54,-1.89l1.86,-1.3l1.14,-4.3l4.1,-1.21l3.57,-0.11l0.32,0.3l-0.06,0.94l-1.26,1.45l-0.67,1.71l0.38,0.7l-0.72,2.27l-0.49,-0.3l-1.0,0.08l-1.0,1.39l-0.47,-0.11l-0.53,0.47l-4.26,-0.02l-0.4,0.4l-0.0,1.06l-1.1,0.26l0.1,0.44l1.82,1.44l0.56,0.91l-3.19,0.21l-1.21,2.09l0.24,0.72l-0.2,0.44l-2.24,-2.18l-1.45,-0.93l-2.22,-0.69l-1.52,0.22l-3.07,1.16l-10.55,-3.85l-2.86,-1.96l-3.78,-0.92l-1.08,-1.19l-2.62,-1.43l-1.18,-1.54l-0.38,-0.81l0.66,-0.63l-0.18,-0.53l0.52,-0.76l0.01,-0.91l-2.0,-3.82l-2.21,-2.63l-2.53,-2.09l-1.19,-1.62l-2.2,-1.17l-0.3,-0.43l0.34,-1.48l-0.21,-0.45l-1.23,-0.6l-1.36,-1.2l-0.59,-1.78l-1.54,-0.47l-2.44,-2.55l-0.16,-0.9l-1.33,-2.03l-0.84,-1.99l-0.16,-1.33l-1.81,-1.1l-0.97,0.05l-1.31,-0.7l-0.57,0.22l-0.4,1.12l0.72,3.77l3.51,3.89l0.28,0.78l0.53,0.26l0.41,1.43l1.33,1.73l1.58,1.41l0.8,2.39l1.43,2.41l0.13,1.32l0.37,0.36l1.04,0.08l1.67,2.28l-0.85,0.76l-0.66,-1.51l-1.68,-1.54l-2.91,-1.87l0.06,-1.82l-0.54,-1.68l-2.91,-2.03l-0.55,0.09l-1.95,-1.1l-0.88,-0.94l0.68,-0.08l0.93,-1.01l0.08,-1.78l-1.93,-1.94l-1.46,-0.77l-3.75,-7.56l4.88,-0.42Z",
                    name: "Mexico"
                },
                IL: {
                    path: "M507.76,203.05l0.4,-0.78l0.18,0.4l-0.33,1.03l0.52,0.44l0.68,-0.22l-0.86,3.6l-1.16,-3.32l0.59,-0.74l-0.03,-0.41ZM508.73,200.34l0.37,-1.02l0.64,0.0l0.52,-0.51l-0.49,1.53l-0.56,-0.24l-0.48,0.23Z",
                    name: "Israel"
                },
                FR: {
                    path: "M444.48,172.62l-0.64,1.78l-0.58,-0.31l-0.49,-1.72l0.4,-0.89l1.0,-0.72l0.3,1.85ZM429.64,147.1l1.78,1.58l1.46,-0.13l2.1,1.42l1.35,0.27l1.23,0.83l3.04,0.5l-1.03,1.85l-0.3,2.12l-0.41,0.32l-0.95,-0.24l-0.5,0.43l0.06,0.61l-1.81,1.92l-0.04,1.42l0.55,0.38l0.88,-0.36l0.61,0.97l-0.03,1.0l0.57,0.91l-0.75,1.09l0.65,2.39l1.27,0.57l-0.18,0.82l-2.01,1.53l-4.77,-0.8l-3.82,1.0l-0.53,1.85l-2.49,0.34l-2.71,-1.31l-1.16,0.57l-4.31,-1.29l-0.72,-0.86l1.19,-1.78l0.39,-6.45l-2.58,-3.3l-1.9,-1.66l-3.72,-1.23l-0.19,-1.72l2.81,-0.61l4.12,0.81l0.47,-0.48l-0.6,-2.77l1.94,0.95l5.83,-2.54l0.92,-2.74l1.6,-0.49l0.24,0.78l1.36,0.33l1.05,1.19ZM289.01,278.39l-0.81,0.8l-0.78,0.12l-0.5,-0.66l-0.56,-0.1l-0.91,0.6l-0.46,-0.22l1.09,-2.96l-0.96,-1.77l-0.17,-1.49l1.07,-1.77l2.32,0.75l2.51,2.01l0.3,0.74l-2.14,3.96Z",
                    name: "France"
                },
                XS: {
                    path: "M531.15,258.94l1.51,0.12l5.13,-0.95l5.3,-1.48l-0.01,4.4l-2.67,3.39l-1.85,0.01l-8.04,-2.94l-2.55,-3.17l1.12,-1.71l2.04,2.34Z",
                    name: "Somaliland"
                },
                FI: {
                    path: "M492.17,76.39l-0.23,3.5l3.52,2.63l-2.08,2.88l-0.02,0.44l2.8,4.56l-1.59,3.31l2.16,3.24l-0.94,2.39l0.14,0.47l3.44,2.51l-0.77,1.62l-7.52,6.95l-4.5,0.31l-4.38,1.37l-3.8,0.74l-1.44,-1.96l-2.17,-1.11l0.5,-3.66l-1.16,-3.33l1.09,-2.08l2.21,-2.42l5.67,-4.32l1.64,-0.83l0.21,-0.42l-0.46,-2.02l-3.38,-1.89l-0.75,-1.43l-0.22,-6.74l-6.79,-4.8l0.8,-0.62l2.54,2.12l3.46,-0.12l3.0,0.96l2.51,-2.11l1.17,-3.08l3.55,-1.38l2.76,1.53l-0.95,2.79Z",
                    name: "Finland"
                },
                FJ: {
                    path: "M869.95,326.98l-1.21,0.41l-0.08,-0.23l2.97,-1.21l-0.14,0.42l-1.54,0.61ZM867.58,329.25l0.43,0.37l-0.27,0.88l-1.24,0.28l-1.04,-0.24l-0.14,-0.66l0.63,-0.58l0.92,0.26l0.7,-0.31Z",
                    name: "Fiji"
                },
                FK: {
                    path: "M274.36,425.85l1.44,1.08l-0.47,0.73l-3.0,0.89l-0.96,-1.0l-0.52,-0.05l-1.83,1.29l-0.73,-0.88l2.46,-1.64l1.93,0.76l1.67,-1.19Z",
                    name: "Falkland Is."
                },
                NI: {
                    path: "M202.33,252.67l0.81,-0.18l1.03,-1.02l-0.04,-0.88l0.68,-0.0l0.63,-0.54l0.97,0.22l1.53,-1.26l0.58,-0.99l1.17,0.34l2.41,-0.94l0.13,1.32l-0.81,1.94l0.1,2.74l-0.36,0.37l-0.11,1.75l-0.47,0.81l0.18,1.14l-1.73,-0.85l-0.71,0.27l-1.47,-0.6l-0.52,0.16l-4.01,-3.81Z",
                    name: "Nicaragua"
                },
                NL: {
                    path: "M430.31,143.39l0.6,-0.5l2.13,-4.8l3.2,-1.33l1.74,0.08l0.33,0.8l-0.59,2.92l-0.5,0.99l-1.26,0.0l-0.4,0.45l0.33,2.7l-2.2,-1.78l-2.62,0.58l-0.75,-0.11Z",
                    name: "Netherlands"
                },
                NO: {
                    path: "M491.44,67.41l6.8,2.89l-2.29,0.86l-0.15,0.65l2.33,2.38l-4.98,1.79l0.84,-2.45l-0.18,-0.48l-3.55,-1.8l-3.89,1.52l-1.42,3.38l-2.12,1.72l-2.64,-1.0l-3.11,0.21l-2.66,-2.22l-0.5,-0.01l-1.41,1.1l-1.44,0.17l-0.35,0.35l-0.32,2.47l-4.32,-0.64l-0.44,0.29l-0.58,2.11l-2.45,0.2l-4.15,7.68l-3.88,5.76l0.78,1.62l-0.64,1.16l-2.24,-0.06l-0.38,0.24l-1.66,3.89l0.15,5.17l1.57,2.04l-0.78,4.16l-2.02,2.48l-0.85,1.63l-1.3,-1.75l-0.58,-0.07l-4.87,4.19l-3.1,0.79l-3.16,-1.7l-0.85,-3.77l-0.77,-8.55l2.14,-2.31l6.55,-3.27l5.02,-4.17l10.63,-13.84l10.98,-8.7l5.35,-1.91l4.34,0.12l3.69,-3.64l4.49,0.19l4.37,-0.89ZM484.55,20.04l4.26,1.75l-3.1,2.55l-7.1,0.65l-7.08,-0.9l-0.37,-1.31l-0.37,-0.29l-3.44,-0.1l-2.08,-2.0l6.87,-1.44l3.9,1.31l2.39,-1.64l6.13,1.4ZM481.69,33.93l-4.45,1.74l-3.54,-0.99l1.12,-0.9l0.05,-0.58l-1.06,-1.22l4.22,-0.89l1.09,1.97l2.57,0.87ZM466.44,24.04l7.43,3.77l-5.41,1.86l-1.58,4.08l-2.26,1.2l-1.12,4.11l-2.61,0.18l-4.79,-2.86l1.84,-1.54l-0.1,-0.68l-3.69,-1.53l-4.77,-4.51l-1.73,-3.89l6.11,-1.82l1.54,1.92l3.57,-0.08l1.2,-1.96l3.32,-0.18l3.05,1.92Z",
                    name: "Norway"
                },
                NA: {
                    path: "M474.26,330.66l-0.97,0.04l-0.38,0.4l-0.07,8.9l-2.09,0.08l-0.39,0.4l-0.0,17.42l-1.98,1.23l-1.17,0.17l-2.44,-0.66l-0.48,-1.13l-0.99,-0.74l-0.54,0.05l-0.9,1.01l-1.53,-1.68l-0.93,-1.88l-1.99,-8.56l-0.06,-3.12l-0.33,-1.52l-2.3,-3.34l-1.91,-4.83l-1.96,-2.43l-0.12,-1.57l2.33,-0.79l1.43,0.07l1.81,1.13l10.23,-0.25l1.84,1.23l5.87,0.35ZM474.66,330.64l6.51,-1.6l1.9,0.39l-1.69,0.4l-1.31,0.83l-1.12,-0.94l-4.29,0.92Z",
                    name: "Namibia"
                },
                VU: {
                    path: "M839.04,322.8l0.22,1.14l-0.44,0.03l-0.2,-1.45l0.42,0.27Z",
                    name: "Vanuatu"
                },
                NC: {
                    path: "M838.78,341.24l-0.33,0.22l-2.9,-1.75l-3.26,-3.37l1.65,0.83l4.85,4.07Z",
                    name: "New Caledonia"
                },
                NE: {
                    path: "M454.75,226.53l1.33,1.37l0.48,0.07l1.27,-0.7l0.53,3.52l0.94,0.83l0.17,0.92l0.81,0.69l-0.44,0.95l-0.96,5.26l-0.13,3.22l-3.04,2.31l-1.22,3.57l1.02,1.24l-0.0,1.46l0.39,0.4l1.13,0.04l-0.9,1.25l-1.47,-2.42l-0.86,-0.29l-2.09,1.37l-1.74,-0.67l-1.45,-0.17l-0.85,0.35l-1.36,-0.07l-1.64,1.09l-1.06,0.05l-2.94,-1.28l-1.44,0.59l-1.01,-0.03l-0.97,-0.94l-2.7,-0.98l-2.69,0.3l-0.87,0.64l-0.47,1.6l-0.75,1.16l-0.12,1.53l-1.57,-1.1l-1.31,0.24l0.03,-0.81l-0.32,-0.41l-2.59,-0.52l-0.15,-1.16l-1.35,-1.6l-0.29,-1.0l0.13,-0.84l1.29,-0.08l1.08,-0.92l3.31,-0.22l2.22,-0.41l0.32,-0.34l0.2,-1.47l1.39,-1.88l-0.01,-5.66l3.36,-1.12l7.24,-5.12l8.42,-4.92l3.69,1.06Z",
                    name: "Niger"
                },
                NG: {
                    path: "M456.32,253.89l0.64,0.65l-0.28,1.04l-2.11,2.01l-2.03,5.18l-1.37,1.16l-1.15,3.18l-1.33,0.66l-1.46,-0.97l-1.21,0.16l-1.38,1.36l-0.91,0.24l-1.79,4.06l-2.33,0.81l-1.11,-0.07l-0.86,0.5l-1.71,-0.05l-1.19,-1.39l-0.89,-1.89l-1.77,-1.66l-3.95,-0.08l0.07,-5.21l0.42,-1.43l1.95,-2.3l-0.14,-0.91l0.43,-1.18l-0.53,-1.41l0.25,-2.92l0.72,-1.07l0.32,-1.34l0.46,-0.39l2.47,-0.28l2.34,0.89l1.15,1.02l1.28,0.04l1.22,-0.58l3.03,1.27l1.49,-0.14l1.36,-1.0l1.33,0.07l0.82,-0.35l3.45,0.8l1.82,-1.32l1.84,2.67l0.66,0.16Z",
                    name: "Nigeria"
                },
                NZ: {
                    path: "M857.8,379.65l1.86,3.12l0.44,0.18l0.3,-0.38l0.03,-1.23l0.38,0.27l0.57,2.31l2.02,0.94l1.81,0.27l1.57,-1.06l0.7,0.18l-1.15,3.59l-1.98,0.11l-0.74,1.2l0.2,1.11l-2.42,3.98l-1.49,0.92l-1.04,-0.85l1.21,-2.05l-0.81,-2.01l-2.63,-1.25l0.04,-0.57l1.82,-1.19l0.43,-2.34l-0.16,-2.03l-0.95,-1.82l-0.06,-0.72l-3.11,-3.64l-0.79,-1.52l1.56,1.45l1.76,0.66l0.65,2.34ZM853.83,393.59l0.57,1.24l0.59,0.16l1.42,-0.97l0.46,0.79l0.0,1.03l-2.47,3.48l-1.26,1.2l-0.06,0.5l0.55,0.87l-1.41,0.07l-2.33,1.38l-2.03,5.02l-3.02,2.16l-2.06,-0.06l-1.71,-1.04l-2.47,-0.2l-0.27,-0.73l1.22,-2.1l3.05,-2.94l1.62,-0.59l4.02,-2.82l1.57,-1.67l1.07,-2.16l0.88,-0.7l0.48,-1.75l1.24,-0.97l0.35,0.79Z",
                    name: "New Zealand"
                },
                NP: {
                    path: "M641.14,213.62l0.01,3.19l-1.74,0.04l-4.8,-0.86l-1.58,-1.39l-3.37,-0.34l-7.65,-3.7l0.8,-2.09l2.33,-1.7l1.77,0.75l2.49,1.76l1.38,0.41l0.99,1.35l1.9,0.52l1.99,1.17l5.49,0.9Z",
                    name: "Nepal"
                },
                XK: {
                    path: "M472.77,172.64l-1.08,-1.29l0.96,-0.77l0.29,-0.83l1.98,1.64l-0.36,0.67l-1.79,0.58Z",
                    name: "Kosovo"
                },
                CI: {
                    path: "M407.4,259.27l0.86,0.42l0.56,0.9l1.13,0.53l1.19,-0.61l0.97,-0.08l1.42,0.54l0.6,3.24l-1.03,2.08l-0.65,2.84l1.06,2.33l-0.06,0.53l-2.54,-0.47l-1.66,0.03l-3.06,0.46l-4.11,1.6l0.32,-3.06l-1.18,-1.31l-1.32,-0.66l0.42,-0.85l-0.2,-1.4l0.5,-0.67l0.01,-1.59l0.84,-0.32l0.26,-0.5l-1.15,-3.01l0.12,-0.5l0.51,-0.25l0.66,0.31l1.93,0.02l0.67,-0.71l0.71,-0.14l0.25,0.69l0.57,0.22l1.4,-0.61Z",
                    name: "Côte d'Ivoire"
                },
                CH: {
                    path: "M444.62,156.35l-0.29,0.87l0.18,0.53l1.13,0.58l1.0,0.1l-0.1,0.65l-0.79,0.38l-1.72,-0.37l-0.45,0.23l-0.45,1.04l-0.75,0.06l-0.84,-0.4l-1.32,1.0l-0.96,0.12l-0.88,-0.55l-0.81,-1.3l-0.49,-0.16l-0.63,0.26l0.02,-0.65l1.71,-1.66l0.1,-0.56l0.93,0.08l0.58,-0.46l1.99,0.02l0.66,-0.61l2.19,0.79Z",
                    name: "Switzerland"
                },
                CO: {
                    path: "M242.07,254.93l-1.7,0.59l-0.59,1.18l-1.7,1.69l-0.38,1.93l-0.67,1.43l0.31,0.57l1.03,0.13l0.25,0.9l0.57,0.64l-0.04,2.34l1.64,1.42l3.16,-0.24l1.26,0.28l1.67,2.06l0.41,0.13l4.09,-0.39l0.45,0.22l-0.92,1.95l-0.2,1.8l0.52,1.83l0.75,1.05l-1.12,1.1l0.07,0.63l0.84,0.51l0.74,1.29l-0.39,-0.45l-0.59,-0.01l-0.71,0.74l-4.71,-0.05l-0.4,0.41l0.03,1.57l0.33,0.39l1.11,0.2l-1.68,0.4l-0.29,0.38l-0.01,1.82l1.16,1.14l0.34,1.25l-1.05,7.05l-1.04,-0.87l1.26,-1.99l-0.13,-0.56l-2.18,-1.23l-1.38,0.2l-1.14,-0.38l-1.27,0.61l-1.55,-0.26l-1.38,-2.46l-1.23,-0.75l-0.85,-1.2l-1.67,-1.19l-0.86,0.13l-2.11,-1.32l-1.01,0.31l-1.8,-0.29l-0.52,-0.91l-3.09,-1.68l0.77,-0.52l-0.1,-1.12l0.41,-0.64l1.34,-0.32l2.0,-2.88l-0.11,-0.57l-0.66,-0.43l0.39,-1.38l-0.52,-2.1l0.49,-0.83l-0.4,-2.13l-0.97,-1.35l0.17,-0.66l0.86,-0.08l0.47,-0.75l-0.46,-1.63l1.41,-0.07l1.8,-1.69l0.93,-0.24l0.3,-0.38l0.45,-2.76l1.22,-1.0l1.44,-0.04l0.45,-0.5l1.91,0.12l2.93,-1.84l1.15,-1.14l0.91,0.46l-0.25,0.45Z",
                    name: "Colombia"
                },
                CN: {
                    path: "M740.23,148.97l4.57,1.3l2.8,2.17l0.98,2.9l0.38,0.27l3.8,0.0l2.32,-1.28l3.29,-0.75l-0.96,2.09l-1.02,1.28l-0.85,3.4l-1.52,2.73l-2.76,-0.5l-2.4,1.13l-0.21,0.45l0.64,2.57l-0.32,3.2l-0.94,0.06l-0.37,0.89l-0.91,-1.01l-0.64,0.07l-0.92,1.57l-3.73,1.25l-0.26,0.48l0.26,1.06l-1.5,-0.08l-1.09,-0.86l-0.56,0.06l-1.67,2.06l-2.7,1.56l-2.03,1.88l-3.4,0.83l-1.93,1.4l-1.15,0.34l0.33,-0.7l-0.41,-0.89l1.79,-1.79l0.02,-0.54l-1.32,-1.56l-0.48,-0.1l-2.24,1.09l-2.83,2.06l-1.51,1.83l-2.28,0.13l-1.55,1.49l-0.04,0.5l1.32,1.97l2.0,0.58l0.31,1.35l1.98,0.84l3.0,-1.96l2.0,1.02l1.49,0.11l0.22,0.83l-3.37,0.86l-1.12,1.48l-2.5,1.52l-1.29,1.99l0.14,0.56l2.57,1.48l0.97,2.7l3.17,4.63l-0.03,1.66l-1.35,0.65l-0.2,0.51l0.6,1.47l1.4,0.91l-0.89,3.82l-1.43,0.38l-3.85,6.44l-2.27,3.11l-6.78,4.57l-2.73,0.29l-1.45,1.04l-0.62,-0.61l-0.55,-0.01l-1.36,1.25l-3.39,1.27l-2.61,0.4l-1.1,2.79l-0.81,0.09l-0.49,-1.42l0.5,-0.85l-0.25,-0.59l-3.36,-0.84l-1.3,0.4l-2.31,-0.62l-0.94,-0.84l0.33,-1.28l-0.3,-0.49l-2.19,-0.46l-1.13,-0.93l-0.47,-0.02l-2.06,1.36l-4.29,0.28l-2.76,1.05l-0.28,0.43l0.32,2.53l-0.59,-0.03l-0.19,-1.34l-0.55,-0.34l-1.68,0.7l-2.46,-1.23l0.62,-1.87l-0.26,-0.51l-1.37,-0.44l-0.54,-2.22l-0.45,-0.3l-2.13,0.35l0.24,-2.48l2.39,-2.4l0.03,-4.31l-1.19,-0.92l-0.78,-1.49l-0.41,-0.21l-1.41,0.19l-1.98,-0.3l0.46,-1.07l-1.17,-1.7l-0.55,-0.11l-1.63,1.05l-2.25,-0.57l-2.89,1.73l-2.25,1.98l-1.75,0.29l-1.17,-0.71l-3.31,-0.65l-1.48,0.79l-1.04,1.27l-0.12,-1.17l-0.54,-0.34l-1.44,0.54l-5.55,-0.86l-1.98,-1.16l-1.89,-0.54l-0.99,-1.35l-1.34,-0.37l-2.55,-1.79l-2.01,-0.84l-1.21,0.56l-5.57,-3.45l-0.53,-2.31l1.19,0.25l0.48,-0.37l0.08,-1.42l-0.98,-1.56l0.15,-2.44l-2.69,-3.32l-4.12,-1.23l-0.67,-2.0l-1.92,-1.48l-0.38,-0.7l-0.51,-3.01l-1.52,-0.66l-0.7,0.13l-0.48,-2.05l0.55,-0.51l-0.09,-0.82l2.03,-1.19l1.6,-0.54l2.56,0.38l0.42,-0.22l0.85,-1.7l3.0,-0.33l1.1,-1.26l4.05,-1.77l0.39,-0.91l-0.17,-1.44l1.45,-0.67l0.2,-0.52l-2.07,-4.9l4.51,-1.12l1.37,-0.73l1.89,-5.51l4.98,0.86l1.51,-1.7l0.11,-2.87l1.99,-0.38l1.83,-2.06l0.49,-0.13l0.68,2.08l2.23,1.77l3.44,1.16l1.55,2.29l-0.92,3.49l0.96,1.67l6.54,1.13l2.95,1.87l1.47,0.35l1.06,2.62l1.53,1.91l3.05,0.08l5.14,0.67l3.37,-0.41l2.36,0.43l3.65,1.8l3.06,0.04l1.45,0.88l2.87,-1.59l3.95,-1.02l3.83,-0.14l3.06,-1.14l1.77,-1.6l1.72,-1.01l0.17,-0.49l-1.1,-2.05l1.02,-1.54l4.02,0.8l2.45,-1.61l3.76,-1.19l1.96,-2.13l1.63,-0.83l3.51,-0.4l1.92,0.34l0.46,-0.3l0.17,-1.5l-2.27,-2.22l-2.11,-1.09l-2.18,1.11l-2.32,-0.47l-1.29,0.32l-0.4,-0.82l2.73,-5.16l3.02,1.06l3.53,-2.06l0.18,-1.68l2.16,-3.35l1.49,-1.35l-0.03,-1.85l-1.07,-0.85l1.54,-1.26l2.98,-0.59l3.23,-0.09l3.64,0.99l2.04,1.16l3.29,6.71l0.92,3.19ZM696.92,237.31l-1.87,1.08l-1.63,-0.64l-0.06,-1.79l1.03,-0.98l2.58,-0.69l1.16,0.05l0.3,0.54l-0.98,1.06l-0.53,1.37Z",
                    name: "China"
                },
                CM: {
                    path: "M457.92,257.49l1.05,1.91l-1.4,0.16l-1.05,-0.23l-0.45,0.22l-0.54,1.19l0.08,0.45l1.48,1.47l1.05,0.45l1.01,2.46l-1.52,2.99l-0.68,0.68l-0.13,3.69l2.38,3.84l1.09,0.8l0.24,2.48l-3.67,-1.14l-11.27,-0.13l0.23,-1.79l-0.98,-1.66l-1.19,-0.54l-0.44,-0.97l-0.6,-0.42l1.71,-4.27l0.75,-0.13l1.38,-1.36l0.65,-0.03l1.71,0.99l1.93,-1.12l1.14,-3.18l1.38,-1.17l2.0,-5.14l2.17,-2.13l0.3,-1.64l-0.86,-0.88l0.03,-0.33l0.94,1.28l0.07,3.22Z",
                    name: "Cameroon"
                },
                CL: {
                    path: "M246.5,429.18l-3.14,1.83l-0.57,3.16l-0.64,0.05l-2.68,-1.06l-2.82,-2.33l-3.04,-1.89l-0.69,-1.85l0.63,-2.14l-1.21,-2.11l-0.31,-5.37l1.01,-2.91l2.57,-2.38l-0.18,-0.68l-3.16,-0.77l2.05,-2.47l0.77,-4.65l2.32,0.9l0.54,-0.29l1.31,-6.31l-0.22,-0.44l-1.68,-0.8l-0.56,0.28l-0.7,3.36l-0.81,-0.22l1.56,-9.41l1.15,-2.24l-0.71,-2.82l-0.18,-2.84l1.01,-0.33l3.26,-9.14l1.07,-4.22l-0.56,-4.21l0.74,-2.34l-0.29,-3.27l1.46,-3.34l2.04,-16.59l-0.66,-7.76l1.03,-0.53l0.54,-0.9l0.79,1.14l0.32,1.78l1.25,1.16l-0.69,2.55l1.33,2.9l0.97,3.59l0.46,0.29l1.5,-0.3l0.11,0.23l-0.76,2.44l-2.57,1.23l-0.23,0.37l0.08,4.33l-0.46,0.77l0.56,1.21l-1.58,1.51l-1.68,2.62l-0.89,2.47l0.2,2.7l-1.48,2.73l1.12,5.09l0.64,0.61l-0.01,2.29l-1.38,2.68l0.01,2.4l-1.89,2.04l0.02,2.75l0.69,2.57l-1.43,1.13l-1.26,5.68l0.39,3.51l-0.97,0.89l0.58,3.5l1.02,1.14l-0.65,1.02l0.15,0.57l1.0,0.53l0.16,0.69l-1.03,0.85l0.26,1.75l-0.89,4.03l-1.31,2.66l0.24,1.75l-0.71,1.83l-1.99,1.7l0.3,3.67l0.88,1.19l1.58,0.01l0.01,2.21l1.04,1.95l5.98,0.63ZM248.69,430.79l0.0,7.33l0.4,0.4l3.52,0.05l-0.44,0.75l-1.94,0.98l-2.49,-0.37l-1.88,-1.06l-2.55,-0.49l-5.59,-3.71l-2.38,-2.63l4.1,2.48l3.32,1.23l0.45,-0.12l1.29,-1.57l0.83,-2.32l2.05,-1.24l1.31,0.29Z",
                    name: "Chile"
                },
                XC: {
                    path: "M504.91,192.87l0.34,0.01l0.27,-0.07l-0.29,0.26l-0.31,-0.2Z",
                    name: "N. Cyprus"
                },
                CA: {
                    path: "M280.06,145.6l-1.67,2.88l0.07,0.49l0.5,0.04l1.46,-0.98l1.0,0.42l-0.56,0.72l0.17,0.62l2.22,0.89l1.35,-0.71l1.95,0.78l-0.66,2.01l0.5,0.51l1.32,-0.42l0.98,3.17l-0.91,2.41l-0.8,0.08l-1.23,-0.45l0.47,-2.25l-0.89,-0.83l-0.48,0.06l-2.78,2.63l-0.34,-0.02l1.02,-0.85l-0.14,-0.69l-2.4,-0.77l-7.4,0.08l-0.17,-0.41l1.3,-0.94l0.02,-0.64l-0.73,-0.58l1.85,-1.74l2.57,-5.16l1.47,-1.79l1.99,-1.05l0.46,0.06l-1.53,2.45ZM68.32,74.16l4.13,0.95l4.02,2.14l2.61,0.4l2.47,-1.89l2.88,-1.31l3.85,0.48l3.71,-1.94l3.82,-1.04l1.56,1.68l0.49,0.08l1.87,-1.04l0.65,-1.98l1.24,0.35l4.16,3.94l0.54,0.01l2.75,-2.49l0.26,2.59l0.49,0.35l3.08,-0.73l1.04,-1.27l2.73,0.23l3.83,1.86l5.86,1.61l3.47,0.75l2.44,-0.26l2.73,1.78l-2.98,1.81l-0.19,0.41l0.31,0.32l4.53,0.92l6.87,-0.5l2.0,-0.69l2.49,2.39l0.53,0.02l2.72,-2.16l-0.02,-0.64l-2.16,-1.54l1.15,-1.06l4.83,-0.61l1.84,0.95l2.48,2.31l3.01,-0.23l4.55,1.92l3.85,-0.67l3.61,0.1l0.41,-0.44l-0.25,-2.36l1.79,-0.61l3.49,1.32l-0.01,3.77l0.31,0.39l0.45,-0.22l1.48,-3.16l1.74,0.1l0.41,-0.3l1.13,-4.37l-2.78,-3.11l-2.8,-1.74l0.19,-4.64l2.71,-3.07l2.98,0.67l2.41,1.95l3.19,4.8l-1.99,1.97l0.21,0.68l4.33,0.84l-0.01,4.15l0.25,0.37l0.44,-0.09l3.07,-3.15l2.54,2.39l-0.61,3.33l2.42,2.88l0.61,0.0l2.61,-3.08l1.88,-3.82l0.17,-4.58l6.72,0.94l3.13,2.04l0.13,1.82l-1.76,2.19l-0.01,0.49l1.66,2.16l-0.26,1.71l-4.68,2.8l-3.28,0.61l-2.47,-1.2l-0.55,0.23l-0.73,2.04l-2.38,3.43l-0.74,1.77l-2.74,2.57l-3.44,0.25l-2.21,1.78l-0.28,2.53l-2.82,0.55l-3.12,3.22l-2.72,4.31l-1.03,3.17l-0.14,4.31l0.33,0.41l3.44,0.57l2.24,5.95l0.45,0.23l3.4,-0.69l4.52,1.51l2.43,1.31l1.91,1.73l3.1,0.96l2.62,1.46l6.6,0.54l-0.35,2.74l0.81,3.53l1.81,3.78l3.83,3.3l0.45,0.04l2.1,-1.28l1.37,-3.69l-1.31,-5.38l-1.45,-1.58l3.57,-1.47l2.84,-2.46l1.52,-2.8l-0.25,-2.55l-1.7,-3.07l-2.85,-2.61l2.8,-3.95l-1.08,-3.37l-0.79,-5.67l1.36,-0.7l6.76,1.41l2.12,-0.96l5.12,3.36l1.05,1.61l4.08,0.26l-0.06,2.87l0.83,4.7l0.3,0.32l2.16,0.54l1.73,2.06l0.5,0.09l3.63,-2.03l2.52,-4.19l1.26,-1.32l7.6,11.72l-0.92,2.04l0.16,0.51l3.3,1.97l2.22,1.98l4.1,0.98l1.43,0.99l0.95,2.79l2.1,0.68l0.84,1.08l0.17,3.45l-3.37,2.26l-4.22,1.24l-3.06,2.63l-4.06,0.51l-5.35,-0.69l-6.39,0.2l-2.3,2.41l-3.26,1.51l-6.47,7.15l-0.06,0.48l0.44,0.19l2.13,-0.52l4.17,-4.24l5.12,-2.62l3.52,-0.3l1.69,1.21l-2.12,2.21l0.81,3.47l1.02,2.61l3.47,1.6l4.14,-0.45l2.15,-2.8l0.26,1.48l1.14,0.8l-2.56,1.69l-5.5,1.82l-2.54,1.27l-2.74,2.15l-1.4,-0.16l-0.07,-2.01l4.14,-2.44l0.18,-0.45l-0.39,-0.29l-6.63,0.45l-1.39,-1.49l-0.14,-4.43l-1.11,-0.91l-1.82,0.39l-0.66,-0.66l-0.6,0.03l-1.91,2.39l-0.82,2.52l-0.8,1.27l-1.67,0.56l-0.46,0.76l-8.31,0.07l-1.21,0.62l-2.35,1.97l-0.71,-0.14l-1.37,0.96l-1.12,-0.48l-4.74,1.26l-0.9,1.17l0.21,0.62l1.73,0.3l-1.81,0.31l-1.85,0.81l-2.11,-0.13l-2.95,1.78l-0.69,-0.09l1.39,-2.1l1.73,-1.21l0.1,-2.29l1.16,-1.99l0.49,0.53l2.03,0.42l1.2,-1.16l0.02,-0.47l-2.66,-3.51l-2.28,-0.61l-5.64,-0.71l-0.4,-0.57l-0.79,0.13l0.2,-0.41l-0.22,-0.55l-0.68,-0.26l0.19,-1.26l-0.78,-0.73l0.31,-0.64l-0.29,-0.57l-2.6,-0.44l-0.75,-1.63l-0.94,-0.66l-4.31,-0.65l-1.13,1.19l-1.48,0.59l-0.85,1.06l-2.83,-0.76l-2.09,0.39l-2.39,-0.97l-4.24,-0.7l-0.57,-0.4l-0.41,-1.63l-0.4,-0.3l-0.85,0.02l-0.39,0.4l-0.01,0.85l-69.13,-0.01l-6.51,-4.52l-4.5,-1.38l-1.26,-2.66l0.33,-1.93l-0.23,-0.43l-3.01,-1.35l-0.55,-2.77l-2.89,-2.38l-0.04,-1.45l1.39,-1.83l-0.28,-2.55l-4.16,-2.2l-4.07,-6.6l-4.02,-3.22l-1.3,-1.88l-0.5,-0.13l-2.51,1.21l-2.23,1.87l-3.85,-3.88l-2.44,-1.04l-2.22,-0.13l0.03,-37.49ZM260.37,148.65l3.04,0.76l2.26,1.2l-3.78,-0.95l-1.53,-1.01ZM249.4,3.81l6.68,0.49l5.32,0.79l4.26,1.57l-0.07,1.1l-5.85,2.53l-6.02,1.21l-2.39,1.39l-0.18,0.45l0.39,0.29l4.01,-0.02l-4.65,2.82l-4.2,1.74l-4.19,4.59l-5.03,0.92l-1.67,1.15l-7.47,0.59l-0.37,0.37l0.32,0.42l2.41,0.49l-0.81,0.47l-0.12,0.59l1.83,2.41l-2.02,1.59l-3.81,1.51l-1.32,2.16l-3.38,1.53l-0.22,0.48l0.35,1.19l0.4,0.29l3.88,-0.18l0.03,0.61l-6.33,2.95l-6.41,-1.4l-7.43,0.79l-3.72,-0.62l-4.4,-0.25l-0.23,-1.83l4.29,-1.11l0.28,-0.51l-1.1,-3.45l1.0,-0.25l6.58,2.28l0.47,-0.16l-0.05,-0.49l-3.41,-3.45l-3.58,-0.98l1.48,-1.55l4.34,-1.29l0.97,-2.19l-0.16,-0.48l-3.42,-2.13l-0.81,-2.26l6.2,0.22l2.24,0.58l3.91,-2.1l0.2,-0.43l-0.35,-0.32l-5.64,-0.67l-8.73,0.36l-4.26,-1.9l-2.12,-2.4l-2.78,-1.66l-0.41,-1.52l3.31,-1.03l2.93,-0.2l4.91,-0.99l3.7,-2.27l2.87,0.3l2.62,1.67l0.56,-0.14l1.82,-3.2l3.13,-0.94l4.44,-0.69l7.53,-0.26l1.48,0.67l7.19,-1.06l10.8,0.79ZM203.85,57.54l0.01,0.42l1.97,2.97l0.68,-0.02l2.24,-3.72l5.95,-1.86l4.01,4.64l-0.35,2.91l0.5,0.43l4.95,-1.36l2.32,-1.8l5.31,2.28l3.27,2.11l0.3,1.84l0.48,0.33l4.42,-0.99l2.64,2.87l5.97,1.77l2.06,1.72l2.11,3.71l-4.19,1.86l-0.01,0.73l5.9,2.83l3.94,0.94l3.78,3.95l3.46,0.25l-0.63,2.37l-4.11,4.47l-2.76,-1.56l-3.9,-3.94l-3.59,0.41l-0.33,0.34l-0.19,2.72l2.63,2.38l3.42,1.89l0.94,0.97l1.55,3.75l-0.7,2.29l-2.74,-0.92l-6.25,-3.15l-0.51,0.13l0.05,0.52l6.07,5.69l0.18,0.59l-6.09,-1.39l-5.31,-2.24l-2.63,-1.66l0.6,-0.77l-0.12,-0.6l-7.39,-4.01l-0.59,0.37l0.03,0.79l-6.73,0.6l-1.69,-1.1l1.36,-2.46l4.51,-0.07l5.15,-0.52l0.31,-0.6l-0.74,-1.3l0.78,-1.84l3.21,-4.05l-0.67,-2.35l-1.11,-1.6l-3.84,-2.1l-4.35,-1.28l0.91,-0.63l0.06,-0.61l-2.65,-2.75l-2.34,-0.36l-1.89,-1.46l-0.53,0.03l-1.24,1.23l-4.36,0.55l-9.04,-0.99l-9.26,-1.98l-1.6,-1.22l2.22,-1.77l0.13,-0.44l-0.38,-0.27l-3.22,-0.02l-0.72,-4.25l1.83,-4.04l2.42,-1.85l5.5,-1.1l-1.39,2.35ZM261.19,159.33l2.07,0.61l1.44,-0.04l-1.15,0.63l-2.94,-1.23l-0.4,-0.68l0.36,-0.37l0.61,1.07ZM230.83,84.39l-2.37,0.18l-0.49,-1.63l0.93,-2.09l1.94,-0.51l1.62,0.99l0.02,1.52l-1.66,1.54ZM229.43,58.25l0.11,0.65l-4.87,-0.21l-2.72,0.62l-3.1,-2.57l0.08,-1.26l0.86,-0.23l5.57,0.51l4.08,2.5ZM222.0,105.02l-0.72,1.49l-0.63,-0.19l-0.48,-0.84l0.81,-0.99l0.65,0.05l0.37,0.46ZM183.74,38.32l2.9,1.7l4.79,-0.01l1.84,1.46l-0.49,1.68l0.23,0.48l2.82,1.14l1.76,1.26l7.01,0.65l4.1,-1.1l5.03,-0.43l3.93,0.35l2.48,1.77l0.46,1.7l-1.3,1.1l-3.56,1.01l-3.23,-0.59l-7.17,0.76l-5.09,0.09l-3.99,-0.6l-6.42,-1.54l-0.79,-2.51l-0.3,-2.49l-2.64,-2.5l-5.32,-0.72l-2.52,-1.4l0.68,-1.57l4.78,0.31ZM207.38,91.35l0.4,1.56l0.56,0.26l1.06,-0.52l1.32,0.96l5.42,2.57l0.2,1.68l0.46,0.35l1.68,-0.28l1.15,0.85l-1.55,0.87l-3.61,-0.88l-1.32,-1.69l-0.57,-0.06l-2.45,2.1l-3.12,1.79l-0.7,-1.87l-0.42,-0.26l-2.16,0.24l1.39,-1.39l0.32,-3.14l0.76,-3.35l1.18,0.22ZM215.49,102.6l-2.67,1.95l-1.4,-0.07l-0.3,-0.58l1.53,-1.48l2.84,0.18ZM202.7,24.12l2.53,1.59l-2.87,1.4l-4.53,4.05l-4.25,0.38l-5.03,-0.68l-2.45,-2.04l0.03,-1.62l1.82,-1.37l0.14,-0.45l-0.38,-0.27l-4.45,0.04l-2.59,-1.76l-1.41,-2.29l1.57,-2.32l1.62,-1.66l2.44,-0.39l0.25,-0.65l-0.6,-0.74l4.86,-0.25l3.24,3.11l8.16,2.3l1.9,3.61ZM187.47,59.2l-2.76,3.49l-2.38,-0.15l-1.44,-3.84l0.04,-2.2l1.19,-1.88l2.3,-1.23l5.07,0.17l4.11,1.02l-3.24,3.72l-2.88,0.89ZM186.07,48.79l-1.08,1.53l-3.34,-0.34l-2.56,-1.1l1.03,-1.75l3.25,-1.23l1.95,1.58l0.75,1.3ZM185.71,35.32l-5.3,-0.2l-0.32,-0.71l4.31,0.07l1.3,0.84ZM180.68,32.48l-3.34,1.0l-1.79,-1.1l-0.98,-1.87l-0.15,-1.73l4.1,0.53l2.67,1.7l-0.51,1.47ZM180.9,76.31l-1.1,1.08l-3.13,-1.23l-2.12,0.43l-2.71,-1.57l1.72,-1.09l1.55,-1.72l3.81,1.9l1.98,2.2ZM169.74,54.87l2.96,0.97l4.17,-0.57l0.41,0.88l-2.14,2.11l0.09,0.64l3.55,1.92l-0.4,3.72l-3.79,1.65l-2.17,-0.35l-1.72,-1.74l-6.02,-3.5l0.03,-0.85l4.68,0.54l0.4,-0.21l-0.05,-0.45l-2.48,-2.81l2.46,-1.95ZM174.45,40.74l1.37,1.73l0.07,2.44l-1.05,3.45l-3.79,0.47l-2.32,-0.69l0.05,-2.64l-0.44,-0.41l-3.68,0.35l-0.12,-3.1l2.45,0.1l3.67,-1.73l3.41,0.29l0.37,-0.26ZM170.05,31.55l0.67,1.56l-3.33,-0.49l-4.22,-1.77l-4.35,-0.16l1.4,-0.94l-0.06,-0.7l-2.81,-1.23l-0.12,-1.39l4.39,0.68l6.62,1.98l1.81,2.47ZM134.5,58.13l-1.02,1.82l0.45,0.58l5.4,-1.39l3.33,2.29l0.49,-0.03l2.6,-2.23l1.94,1.32l2.0,4.5l0.7,0.06l1.3,-2.29l-1.63,-4.46l1.69,-0.54l2.31,0.71l2.65,1.81l2.49,7.92l8.48,4.27l-0.19,1.35l-3.79,0.33l-0.26,0.67l1.4,1.49l-0.58,1.1l-4.23,-0.64l-4.43,-1.19l-3.0,0.28l-4.66,1.47l-10.52,1.04l-1.43,-2.02l-3.42,-1.2l-2.21,0.43l-2.51,-2.86l4.84,-1.05l3.6,0.19l3.27,-0.78l0.31,-0.39l-0.31,-0.39l-4.84,-1.06l-8.79,0.27l-0.85,-1.07l5.26,-1.66l0.27,-0.45l-0.4,-0.34l-3.8,0.06l-3.81,-1.06l1.81,-3.01l1.66,-1.79l6.48,-2.81l1.97,0.71ZM158.7,56.61l-1.7,2.44l-3.2,-2.75l0.37,-0.3l3.11,-0.18l1.42,0.79ZM149.61,42.73l1.01,1.89l0.5,0.18l2.14,-0.82l2.23,0.19l0.36,2.04l-1.33,2.09l-8.28,0.76l-6.35,2.15l-3.41,0.1l-0.19,-0.96l4.9,-2.08l0.23,-0.46l-0.41,-0.31l-11.25,0.59l-2.89,-0.74l3.04,-4.44l2.14,-1.32l6.81,1.69l4.58,3.06l4.37,0.39l0.36,-0.63l-3.36,-4.6l1.85,-1.53l2.18,0.51l0.77,2.26ZM144.76,34.41l-4.36,1.44l-3.0,-1.4l1.46,-1.24l3.47,-0.52l2.96,0.71l-0.52,1.01ZM145.13,29.83l-1.9,0.66l-3.67,-0.0l2.27,-1.61l3.3,0.95ZM118.92,65.79l-6.03,2.02l-1.33,-1.9l-5.38,-2.28l2.59,-5.05l2.16,-3.14l-0.02,-0.48l-1.97,-2.41l7.64,-0.7l3.6,1.02l6.3,0.27l4.42,2.95l-2.53,0.98l-6.24,3.43l-3.1,3.28l-0.11,2.01ZM129.54,35.53l-0.28,3.37l-1.72,1.62l-2.33,0.28l-4.61,2.19l-3.86,0.76l-2.64,-0.87l3.72,-3.4l5.01,-3.34l3.72,0.07l3.0,-0.67ZM111.09,152.69l-0.67,0.24l-3.85,-1.37l-0.83,-1.17l-2.12,-1.07l-0.66,-1.02l-2.4,-0.55l-0.74,-1.71l6.02,1.45l2.0,2.55l2.52,1.39l0.73,1.27ZM87.8,134.64l0.89,0.29l1.86,-0.21l-0.65,3.34l1.69,2.33l-1.31,-1.33l-0.99,-1.62l-1.17,-0.98l-0.33,-1.82Z",
                    name: "Canada"
                },
                CG: {
                    path: "M466.72,276.48l-0.1,1.03l-1.25,2.97l-0.19,3.62l-0.46,1.78l-0.23,0.63l-1.61,1.19l-1.21,1.39l-1.09,2.43l0.04,2.09l-3.25,3.24l-0.5,-0.24l-0.5,-0.83l-1.36,-0.02l-0.98,0.89l-1.68,-0.99l-1.54,1.24l-1.52,-1.96l1.57,-1.14l0.11,-0.52l-0.77,-1.35l2.1,-0.66l0.39,-0.73l1.05,0.82l2.21,0.11l1.12,-1.37l0.37,-1.81l-0.27,-2.09l-1.13,-1.5l1.0,-2.69l-0.13,-0.45l-0.92,-0.58l-1.6,0.17l-0.51,-0.94l0.1,-0.61l2.75,0.09l3.97,1.24l0.51,-0.33l0.17,-1.28l1.24,-2.21l1.28,-1.14l2.76,0.49Z",
                    name: "Congo"
                },
                CF: {
                    path: "M461.16,278.2l-0.26,-1.19l-1.09,-0.77l-0.84,-1.17l-0.29,-1.0l-1.04,-1.15l0.08,-3.43l0.58,-0.49l1.16,-2.35l1.85,-0.17l0.61,-0.62l0.97,0.58l3.15,-0.96l2.48,-1.92l0.02,-0.96l2.81,0.02l2.36,-1.17l1.93,-2.85l1.16,-0.93l1.11,-0.3l0.27,0.86l1.34,1.47l-0.39,2.01l0.3,1.01l4.01,2.75l0.17,0.93l2.63,2.31l0.6,1.44l2.08,1.4l-3.84,-0.21l-1.94,0.88l-1.23,-0.49l-2.67,1.2l-1.29,-0.18l-0.51,0.36l-0.6,1.22l-3.35,-0.65l-1.57,-0.91l-2.42,-0.83l-1.45,0.91l-0.97,1.27l-0.26,1.56l-3.22,-0.43l-1.49,1.33l-0.94,1.62Z",
                    name: "Central African Rep."
                },
                CD: {
                    path: "M487.01,272.38l2.34,-0.14l1.35,1.84l1.34,0.45l0.86,-0.39l1.21,0.12l1.07,-0.41l0.54,0.89l2.04,1.54l-0.14,2.72l0.7,0.54l-1.38,1.13l-1.53,2.54l-0.17,2.05l-0.59,1.08l-0.02,1.72l-0.72,0.84l-0.66,3.01l0.63,1.32l-0.44,4.26l0.64,1.47l-0.37,1.22l0.86,1.8l1.53,1.41l0.3,1.26l0.44,0.5l-4.08,0.75l-0.92,1.81l0.51,1.34l-0.74,5.43l0.17,0.38l2.45,1.46l0.54,-0.1l0.12,1.62l-1.28,-0.01l-1.85,-2.35l-1.94,-0.45l-0.48,-1.13l-0.55,-0.2l-1.41,0.74l-1.71,-0.3l-1.01,-1.18l-2.49,-0.19l-0.44,-0.77l-1.98,-0.21l-2.88,0.36l0.11,-2.41l-0.85,-1.13l-0.16,-1.36l0.32,-1.73l-0.46,-0.89l-0.04,-1.49l-0.4,-0.39l-2.53,0.02l0.1,-0.41l-0.39,-0.49l-1.28,0.01l-0.43,0.45l-1.62,0.32l-0.83,1.79l-1.09,-0.28l-2.4,0.52l-1.37,-1.91l-1.3,-3.3l-0.38,-0.27l-7.39,-0.03l-2.46,0.42l0.5,-0.45l0.37,-1.47l0.66,-0.38l0.92,0.08l0.73,-0.82l0.87,0.02l0.31,0.68l1.4,0.36l3.59,-3.63l0.01,-2.23l1.02,-2.29l2.69,-2.39l0.43,-0.99l0.49,-1.96l0.17,-3.51l1.25,-2.95l0.36,-3.14l0.86,-1.13l1.1,-0.66l3.57,1.73l3.65,0.73l0.46,-0.21l0.8,-1.46l1.24,0.19l2.61,-1.17l0.81,0.44l1.04,-0.03l0.59,-0.66l0.7,-0.16l1.81,0.25Z",
                    name: "Dem. Rep. Congo"
                },
                CZ: {
                    path: "M458.46,144.88l1.22,1.01l1.47,0.23l0.13,0.93l1.36,0.68l0.54,-0.2l0.24,-0.55l1.15,0.25l0.53,1.09l1.68,0.18l0.6,0.84l-1.04,0.73l-0.96,1.28l-1.6,0.17l-0.55,0.56l-1.04,-0.46l-1.05,0.15l-2.12,-0.96l-1.05,0.34l-1.2,1.12l-1.56,-0.87l-2.57,-2.1l-0.53,-1.88l4.7,-2.52l0.71,0.26l0.9,-0.28Z",
                    name: "Czech Rep."
                },
                CY: {
                    path: "M504.36,193.47l0.43,0.28l-1.28,0.57l-0.92,-0.28l-0.24,-0.46l2.01,-0.13Z",
                    name: "Cyprus"
                },
                CR: {
                    path: "M211.34,258.05l0.48,0.99l1.6,1.6l-0.54,0.45l0.29,1.42l-0.25,1.19l-1.09,-0.59l-0.05,-1.25l-2.46,-1.42l-0.28,-0.77l-0.66,-0.45l-0.45,-0.0l-0.11,1.04l-1.32,-0.95l0.31,-1.3l-0.36,-0.6l0.31,-0.27l1.42,0.58l1.29,-0.14l0.56,0.56l0.74,0.17l0.55,-0.27Z",
                    name: "Costa Rica"
                },
                CU: {
                    path: "M221.21,227.25l1.27,1.02l2.19,-0.28l4.43,3.33l2.08,0.43l-0.1,0.38l0.36,0.5l1.75,0.1l1.48,0.84l-3.11,0.51l-4.15,-0.03l0.77,-0.67l-0.04,-0.64l-1.2,-0.74l-1.49,-0.16l-0.7,-0.61l-0.56,-1.4l-0.4,-0.25l-1.34,0.1l-2.2,-0.66l-0.88,-0.58l-3.18,-0.4l-0.27,-0.16l0.58,-0.74l-0.36,-0.29l-2.72,-0.05l-1.7,1.29l-0.91,0.03l-0.61,0.69l-1.01,0.22l1.11,-1.29l1.01,-0.52l3.69,-1.01l3.98,0.21l2.21,0.84Z",
                    name: "Cuba"
                },
                SZ: {
                    path: "M500.35,351.36l0.5,2.04l-0.38,0.89l-1.05,0.21l-1.23,-1.2l-0.02,-0.64l0.83,-1.57l1.34,0.27Z",
                    name: "Swaziland"
                },
                SY: {
                    path: "M511.0,199.79l0.05,-1.33l0.54,-1.36l1.28,-0.99l0.13,-0.45l-0.41,-1.11l-1.14,-0.36l-0.19,-1.74l0.52,-1.0l1.29,-1.21l0.2,-1.18l0.59,0.23l2.62,-0.76l1.36,0.52l2.06,-0.01l2.95,-1.08l3.25,-0.26l-0.67,0.94l-1.28,0.66l-0.21,0.4l0.23,2.01l-0.88,3.19l-10.15,5.73l-2.15,-0.85Z",
                    name: "Syria"
                },
                KG: {
                    path: "M621.35,172.32l-3.87,1.69l-0.96,1.18l-3.04,0.34l-1.13,1.86l-2.36,-0.35l-1.99,0.63l-2.39,1.4l0.06,0.95l-0.4,0.37l-4.52,0.43l-3.02,-0.93l-2.37,0.17l0.11,-0.79l2.32,0.42l1.13,-0.88l1.99,0.2l3.21,-2.14l-0.03,-0.69l-2.97,-1.57l-1.94,0.65l-1.22,-0.74l1.71,-1.58l-0.12,-0.67l-0.36,-0.15l0.32,-0.77l1.36,-0.35l4.02,1.02l0.49,-0.3l0.35,-1.59l1.09,-0.48l3.42,1.22l1.11,-0.31l7.64,0.39l1.16,1.0l1.23,0.39Z",
                    name: "Kyrgyzstan"
                },
                KE: {
                    path: "M506.26,284.69l1.87,-2.56l0.93,-2.15l-1.38,-4.08l-1.06,-1.6l2.82,-2.75l0.79,0.26l0.12,1.41l0.86,0.83l1.9,0.11l3.28,2.13l3.57,0.44l1.05,-1.12l1.96,-0.9l0.82,0.68l1.16,0.09l-1.78,2.45l0.03,9.12l1.3,1.94l-1.37,0.78l-0.67,1.03l-1.08,0.46l-0.34,1.67l-0.81,1.07l-0.45,1.55l-0.68,0.56l-3.2,-2.23l-0.35,-1.58l-8.86,-4.98l0.14,-1.6l-0.57,-1.04Z",
                    name: "Kenya"
                },
                SS: {
                    path: "M481.71,263.34l1.07,-0.72l1.2,-3.18l1.36,-0.26l1.61,1.99l0.87,0.34l1.1,-0.41l1.5,0.07l0.57,0.53l2.49,0.0l0.44,-0.63l1.07,-0.4l0.45,-0.84l0.59,-0.33l1.9,1.33l1.6,-0.2l2.83,-3.33l-0.32,-2.21l1.59,-0.52l-0.24,1.6l0.3,1.83l1.35,1.18l0.2,1.87l0.35,0.41l0.02,1.53l-0.23,0.47l-1.42,0.25l-0.85,1.44l0.3,0.6l1.4,0.16l1.11,1.08l0.59,1.13l1.03,0.53l1.28,2.36l-4.41,3.98l-1.74,0.01l-1.89,0.55l-1.47,-0.52l-1.15,0.57l-2.96,-2.62l-1.3,0.49l-1.06,-0.15l-0.79,0.39l-0.82,-0.22l-1.8,-2.7l-1.91,-1.1l-0.66,-1.5l-2.62,-2.32l-0.18,-0.94l-2.37,-1.6Z",
                    name: "S. Sudan"
                },
                SR: {
                    path: "M283.12,270.19l2.1,0.53l-1.08,1.95l0.2,1.72l0.93,1.49l-0.59,2.03l-0.43,0.71l-1.12,-0.42l-1.32,0.22l-0.93,-0.2l-0.46,0.26l-0.25,0.73l0.33,0.7l-0.89,-0.13l-1.39,-1.97l-0.31,-1.34l-0.97,-0.31l-0.89,-1.47l0.35,-1.61l1.45,-0.82l0.33,-1.87l2.61,0.44l0.57,-0.47l1.75,-0.16Z",
                    name: "Suriname"
                },
                KH: {
                    path: "M689.52,249.39l0.49,1.45l-0.28,2.74l-4.0,1.86l-0.16,0.6l0.68,0.95l-2.06,0.17l-2.05,0.97l-1.82,-0.32l-2.12,-3.7l-0.55,-2.85l1.4,-1.85l3.02,-0.45l2.23,0.35l2.01,0.98l0.51,-0.14l0.95,-1.48l1.74,0.74Z",
                    name: "Cambodia"
                },
                SV: {
                    path: "M195.8,250.13l1.4,-1.19l2.24,1.45l0.98,-0.27l0.44,0.2l-0.27,1.05l-1.14,-0.03l-3.64,-1.21Z",
                    name: "El Salvador"
                },
                SK: {
                    path: "M476.82,151.17l-1.14,1.9l-2.73,-0.92l-0.82,0.2l-0.74,0.8l-3.46,0.73l-0.47,0.69l-1.76,0.33l-1.88,-1.0l-0.18,-0.81l0.38,-0.75l1.87,-0.32l1.74,-1.89l0.83,0.16l0.79,-0.34l1.51,1.04l1.34,-0.63l1.25,0.3l1.65,-0.42l1.81,0.95Z",
                    name: "Slovakia"
                },
                KR: {
                    path: "M737.51,185.84l0.98,-0.1l0.87,-1.17l2.69,-0.32l0.33,-0.29l1.76,2.79l0.58,1.76l0.02,3.12l-0.8,1.32l-2.21,0.55l-1.93,1.13l-1.8,0.19l-0.2,-1.1l0.43,-2.28l-0.95,-2.56l1.43,-0.37l0.23,-0.62l-1.43,-2.06Z",
                    name: "Korea"
                },
                SI: {
                    path: "M456.18,162.07l-0.51,-1.32l0.18,-1.05l1.69,0.2l1.42,-0.71l2.09,-0.07l0.62,-0.51l0.21,0.47l-1.61,0.67l-0.44,1.34l-0.66,0.24l-0.26,0.82l-1.22,-0.49l-0.84,0.46l-0.69,-0.04Z",
                    name: "Slovenia"
                },
                KP: {
                    path: "M736.77,185.16l-0.92,-0.42l-0.88,0.62l-1.21,-0.88l0.96,-1.15l0.59,-2.59l-0.46,-0.74l-2.09,-0.77l1.64,-1.52l2.72,-1.58l1.58,-1.91l1.11,0.78l2.17,0.11l0.41,-0.5l-0.3,-1.22l3.52,-1.18l0.94,-1.4l0.98,1.08l-2.19,2.18l0.01,2.14l-1.06,0.54l-1.41,1.4l-1.7,0.52l-1.25,1.09l-0.14,1.98l0.94,0.45l1.15,1.04l-0.13,0.26l-2.6,0.29l-1.13,1.29l-1.22,0.08Z",
                    name: "Dem. Rep. Korea"
                },
                KW: {
                    path: "M540.81,207.91l0.37,0.86l-0.17,0.76l0.6,1.53l-0.95,0.04l-0.82,-1.28l-1.57,-0.18l1.31,-1.88l1.22,0.17Z",
                    name: "Kuwait"
                },
                SN: {
                    path: "M390.09,248.21l0.12,1.55l0.49,1.46l0.96,0.82l0.05,1.28l-1.26,-0.19l-0.75,0.33l-1.84,-0.61l-5.84,-0.13l-2.54,0.51l-0.22,-1.03l1.77,0.04l2.01,-0.91l1.03,0.48l1.09,0.04l1.29,-0.62l0.14,-0.58l-0.51,-0.74l-1.81,0.25l-1.13,-0.63l-0.79,0.04l-0.72,0.61l-2.31,0.06l-0.92,-1.77l-0.81,-0.64l0.64,-0.35l2.46,-3.74l1.04,0.19l1.38,-0.56l1.19,-0.02l2.72,1.37l3.03,3.48Z",
                    name: "Senegal"
                },
                SL: {
                    path: "M394.46,264.11l-1.73,1.98l-0.58,1.33l-2.07,-1.06l-1.22,-1.26l-0.65,-2.39l1.16,-0.96l0.67,-1.17l1.21,-0.52l1.66,0.0l1.03,1.64l0.52,2.41Z",
                    name: "Sierra Leone"
                },
                KZ: {
                    path: "M552.8,172.89l0.46,-1.27l-0.48,-1.05l-2.96,-1.19l-1.06,-2.58l-1.37,-0.87l-0.03,-0.3l1.95,0.23l0.45,-0.38l0.08,-1.96l1.75,-0.41l2.1,0.45l0.48,-0.33l0.45,-3.04l-0.45,-2.09l-0.41,-0.31l-2.42,0.15l-2.36,-0.73l-2.87,1.37l-2.17,0.61l-0.85,-0.34l0.13,-1.61l-1.6,-2.12l-2.02,-0.08l-1.78,-1.82l1.29,-2.18l-0.57,-0.95l1.62,-2.91l2.21,1.63l0.63,-0.27l0.29,-2.22l4.92,-3.43l3.71,-0.08l8.4,3.6l2.92,-1.36l3.77,-0.06l3.11,1.66l0.51,-0.11l0.6,-0.81l3.31,0.13l0.39,-0.25l0.63,-1.57l-0.17,-0.5l-3.5,-1.98l1.87,-1.27l-0.13,-1.03l1.98,-0.72l0.18,-0.62l-1.59,-2.06l0.81,-0.82l9.23,-1.18l1.33,-0.88l6.18,-1.26l2.26,-1.42l4.08,0.68l0.73,3.33l0.51,0.3l2.48,-0.8l2.79,1.02l-0.17,1.56l0.43,0.44l2.55,-0.24l4.89,-2.53l0.03,0.32l3.15,2.61l5.56,8.47l0.65,0.02l1.12,-1.46l3.15,1.74l3.76,-0.78l1.15,0.49l1.14,1.8l1.84,0.76l0.99,1.29l3.35,-0.25l1.02,1.52l-1.6,1.81l-1.93,0.28l-0.34,0.38l-0.11,3.05l-1.13,1.16l-4.75,-1.0l-0.46,0.27l-1.76,5.47l-1.1,0.59l-4.91,1.23l-0.27,0.54l2.1,4.97l-1.37,0.63l-0.23,0.41l0.13,1.13l-0.88,-0.25l-1.42,-1.13l-7.89,-0.4l-0.92,0.31l-3.73,-1.22l-1.42,0.63l-0.53,1.66l-3.72,-0.94l-1.85,0.43l-0.76,1.4l-4.65,2.62l-1.13,2.08l-0.44,0.01l-0.92,-1.4l-2.87,-0.09l-0.45,-2.14l-0.38,-0.32l-0.8,-0.01l0.0,-2.96l-3.0,-2.22l-7.31,0.58l-2.35,-2.68l-6.71,-3.69l-6.45,1.83l-0.29,0.39l0.1,10.85l-0.7,0.08l-1.62,-2.17l-1.83,-0.96l-3.11,0.59l-0.64,0.51Z",
                    name: "Kazakhstan"
                },
                SA: {
                    path: "M537.53,210.34l2.0,0.24l0.9,1.32l1.49,-0.06l0.87,2.08l1.29,0.76l0.51,0.99l1.56,1.03l-0.1,1.9l0.32,0.9l1.58,2.47l0.76,0.53l0.7,-0.04l1.68,4.23l7.53,1.33l0.51,-0.29l0.77,1.25l-1.55,4.87l-7.29,2.52l-7.3,1.03l-2.34,1.17l-1.88,2.74l-0.76,0.28l-0.82,-0.78l-0.91,0.12l-2.88,-0.51l-3.51,0.25l-0.86,-0.56l-0.57,0.15l-0.66,1.27l0.16,1.11l-0.43,0.32l-0.93,-1.4l-0.33,-1.16l-1.23,-0.88l-1.27,-2.06l-0.78,-2.22l-1.73,-1.79l-1.14,-0.48l-1.54,-2.31l-0.21,-3.41l-1.44,-2.93l-1.27,-1.16l-1.33,-0.57l-1.31,-3.37l-0.77,-0.67l-0.97,-1.97l-2.8,-4.03l-1.06,-0.17l0.37,-1.96l0.2,-0.72l2.74,0.3l1.08,-0.84l0.6,-0.94l1.74,-0.35l0.65,-1.03l0.71,-0.4l0.1,-0.62l-2.06,-2.28l4.39,-1.22l0.48,-0.37l2.77,0.69l3.66,1.9l7.03,5.5l4.87,0.3Z",
                    name: "Saudi Arabia"
                },
                SE: {
                    path: "M480.22,89.3l-4.03,1.17l-2.43,2.86l0.26,2.57l-8.77,6.64l-1.78,5.79l1.78,2.68l2.22,1.96l-2.07,3.77l-2.72,1.13l-0.95,6.04l-1.29,3.01l-2.74,-0.31l-0.4,0.22l-1.31,2.59l-2.34,0.13l-0.75,-3.09l-2.08,-4.03l-1.83,-4.96l1.0,-1.93l2.14,-2.7l0.83,-4.45l-1.6,-2.17l-0.15,-4.94l1.48,-3.39l2.58,-0.15l0.87,-1.59l-0.78,-1.57l3.76,-5.59l4.04,-7.48l2.17,0.01l0.39,-0.29l0.57,-2.07l4.37,0.64l0.46,-0.34l0.33,-2.56l1.1,-0.13l6.94,4.87l0.06,6.32l0.66,1.36Z",
                    name: "Sweden"
                },
                SD: {
                    path: "M505.98,259.4l-0.34,-0.77l-1.17,-0.9l-0.26,-1.61l0.29,-1.81l-0.34,-0.46l-1.16,-0.17l-0.54,0.59l-1.23,0.11l-0.28,0.65l0.53,0.65l0.17,1.22l-2.44,3.0l-0.96,0.19l-2.39,-1.4l-0.95,0.52l-0.38,0.78l-1.11,0.41l-0.29,0.5l-1.94,0.0l-0.54,-0.52l-1.81,-0.09l-0.95,0.4l-2.45,-2.35l-2.07,0.54l-0.73,1.26l-0.6,2.1l-1.25,0.58l-0.75,-0.62l0.27,-2.65l-1.48,-1.78l-0.22,-1.48l-0.92,-0.96l-0.02,-1.29l-0.57,-1.16l-0.68,-0.16l0.69,-1.29l-0.18,-1.14l0.65,-0.62l0.03,-0.55l-0.36,-0.41l1.55,-2.97l1.91,0.16l0.43,-0.4l-0.1,-10.94l2.49,-0.01l0.4,-0.4l-0.0,-4.82l29.02,0.0l0.64,2.04l-0.49,0.66l0.36,2.69l0.93,3.16l2.12,1.55l-0.89,1.04l-1.72,0.39l-0.98,0.9l-1.43,5.65l0.24,1.15l-0.38,2.06l-0.96,2.38l-1.53,1.31l-1.32,2.91l-1.22,0.86l-0.37,1.34Z",
                    name: "Sudan"
                },
                DO: {
                    path: "M241.8,239.2l0.05,-0.65l-0.46,-0.73l0.42,-0.44l0.19,-1.0l-0.09,-1.53l1.66,0.01l1.99,0.63l0.33,0.67l1.28,0.19l0.33,0.76l1.0,0.08l0.8,0.62l-0.45,0.51l-1.13,-0.47l-1.88,-0.01l-1.27,0.59l-0.75,-0.55l-1.01,0.54l-0.79,1.4l-0.23,-0.61Z",
                    name: "Dominican Rep."
                },
                DJ: {
                    path: "M528.43,256.18l-0.45,0.66l-0.58,-0.25l-1.51,0.13l-0.18,-1.01l1.45,-1.95l0.83,0.17l0.77,-0.44l0.2,1.0l-1.2,0.51l-0.06,0.7l0.73,0.47Z",
                    name: "Djibouti"
                },
                DK: {
                    path: "M452.28,129.07l-1.19,2.24l-2.13,-1.6l-0.23,-0.95l2.98,-0.95l0.57,1.26ZM447.74,126.31l-0.26,0.57l-0.88,-0.07l-1.8,2.53l0.48,1.69l-1.09,0.36l-1.61,-0.39l-0.89,-1.69l-0.07,-3.43l0.96,-1.73l2.02,-0.2l1.09,-1.07l1.33,-0.67l-0.05,1.06l-0.73,1.41l0.3,1.0l1.2,0.64Z",
                    name: "Denmark"
                },
                DE: {
                    path: "M453.14,155.55l-0.55,-0.36l-1.2,-0.1l-1.87,0.57l-2.13,-0.13l-0.56,0.63l-0.86,-0.6l-0.96,0.09l-2.57,-0.93l-0.85,0.67l-1.47,-0.02l0.24,-1.75l1.23,-2.14l-0.28,-0.59l-3.52,-0.58l-0.92,-0.66l0.12,-1.2l-0.48,-0.88l0.27,-2.17l-0.37,-3.03l1.41,-0.22l0.63,-1.26l0.66,-3.19l-0.41,-1.18l0.26,-0.39l1.66,-0.15l0.33,0.54l0.62,0.07l1.7,-1.69l-0.54,-3.02l1.37,0.33l1.31,-0.37l0.31,1.18l2.25,0.71l-0.02,0.92l0.5,0.4l2.55,-0.65l1.34,-0.87l2.57,1.24l1.06,0.98l0.48,1.44l-0.57,0.74l-0.0,0.48l0.87,1.15l0.57,1.64l-0.14,1.29l0.82,1.7l-1.5,-0.07l-0.56,0.57l-4.47,2.15l-0.22,0.54l0.68,2.26l2.58,2.16l-0.66,1.11l-0.79,0.36l-0.23,0.43l0.32,1.87Z",
                    name: "Germany"
                },
                YE: {
                    path: "M528.27,246.72l0.26,-0.42l-0.22,-1.01l0.19,-1.5l0.92,-0.69l-0.07,-1.35l0.39,-0.75l1.01,0.47l3.34,-0.27l3.76,0.41l0.95,0.81l1.36,-0.58l1.74,-2.62l2.18,-1.09l6.86,-0.94l2.48,5.41l-1.64,0.76l-0.56,1.9l-6.23,2.16l-2.29,1.8l-1.93,0.05l-1.41,1.02l-4.24,0.74l-1.72,1.49l-3.28,0.19l-0.52,-1.18l0.02,-1.51l-1.34,-3.29Z",
                    name: "Yemen"
                },
                DZ: {
                    path: "M441.46,188.44l-0.32,1.07l0.39,2.64l-0.54,2.16l-1.58,1.82l0.37,2.39l1.91,1.55l0.18,0.8l1.42,1.03l1.84,7.23l0.12,1.16l-0.57,5.0l0.2,1.51l-0.87,0.99l-0.02,0.51l1.41,1.86l0.14,1.2l0.89,1.48l0.5,0.16l0.98,-0.41l1.73,1.08l0.82,1.23l-8.22,4.81l-7.23,5.11l-3.43,1.13l-2.3,0.21l-0.28,-1.59l-2.56,-1.09l-0.67,-1.25l-26.12,-17.86l0.01,-3.47l3.77,-1.88l2.44,-0.41l2.12,-0.75l1.08,-1.42l2.81,-1.05l0.35,-2.08l1.33,-0.29l1.04,-0.94l3.47,-0.69l0.46,-1.08l-0.1,-0.45l-0.58,-0.52l-0.82,-2.81l-0.19,-1.83l-0.78,-1.49l2.03,-1.31l2.63,-0.48l1.7,-1.22l2.31,-0.84l8.24,-0.73l1.49,0.38l2.28,-1.1l2.46,-0.02l0.92,0.6l1.35,-0.05Z",
                    name: "Algeria"
                },
                US: {
                    path: "M892.72,99.2l1.31,0.53l1.41,-0.37l1.89,0.98l1.89,0.42l-1.32,0.58l-2.9,-1.53l-2.08,0.22l-0.26,-0.15l0.07,-0.67ZM183.22,150.47l0.37,1.47l1.12,0.85l4.23,0.7l2.39,0.98l2.17,-0.38l1.85,0.5l-1.55,0.65l-3.49,2.61l-0.16,0.77l0.5,0.39l2.33,-0.61l1.77,1.02l5.15,-2.4l-0.31,0.65l0.25,0.56l1.36,0.38l1.71,1.16l4.7,-0.88l0.67,0.85l1.31,0.21l0.58,0.58l-1.34,0.17l-2.18,-0.32l-3.6,0.89l-2.71,3.25l0.35,0.9l0.59,-0.0l0.55,-0.6l-1.36,4.65l0.29,3.09l0.67,1.58l0.61,0.45l1.77,-0.44l1.6,-1.96l0.14,-2.21l-0.82,-1.96l0.11,-1.13l1.19,-2.37l0.44,-0.33l0.48,0.75l0.4,-0.29l0.4,-1.37l0.6,-0.47l0.24,-0.8l1.69,0.49l1.65,1.08l-0.03,2.37l-1.27,1.13l-0.0,1.13l0.87,0.36l1.66,-1.29l0.5,0.17l0.5,2.6l-2.49,3.75l0.17,0.61l1.54,0.62l1.48,0.17l1.92,-0.44l4.72,-2.15l2.16,-1.8l-0.05,-1.24l0.75,-0.22l3.92,0.36l2.12,-1.05l0.21,-0.4l-0.28,-1.48l3.27,-2.4l8.32,-0.02l0.56,-0.82l1.9,-0.77l0.93,-1.51l0.74,-2.37l1.58,-1.98l0.92,0.62l1.47,-0.47l0.8,0.66l-0.0,4.09l1.96,2.6l-2.34,1.31l-5.37,2.09l-1.83,2.72l0.02,1.79l0.83,1.59l0.54,0.23l-6.19,0.94l-2.2,0.89l-0.23,0.48l0.45,0.29l2.99,-0.46l-2.19,0.56l-1.13,0.0l-0.15,-0.32l-0.48,0.08l-0.76,0.82l0.22,0.67l0.32,0.06l-0.41,1.62l-1.27,1.58l-1.48,-1.07l-0.49,-0.04l-0.16,0.46l0.52,1.58l0.61,0.59l0.03,0.79l-0.95,1.38l-1.21,-1.22l-0.27,-2.27l-0.35,-0.35l-0.42,0.25l-0.48,1.27l0.33,1.41l-0.97,-0.27l-0.48,0.24l0.18,0.5l1.52,0.83l0.1,2.52l0.79,0.51l0.52,3.42l-1.42,1.88l-2.47,0.8l-1.71,1.66l-1.31,0.25l-1.27,1.03l-0.43,0.99l-2.69,1.78l-2.64,3.03l-0.45,2.12l0.45,2.08l0.85,2.38l1.09,1.9l0.04,1.2l1.16,3.06l-0.18,2.69l-0.55,1.43l-0.47,0.21l-0.89,-0.23l-0.49,-1.18l-0.87,-0.56l-2.75,-5.16l0.48,-1.68l-0.72,-1.78l-2.01,-2.38l-1.12,-0.53l-2.72,1.18l-1.47,-1.35l-1.57,-0.68l-2.99,0.31l-2.17,-0.3l-2.0,0.19l-1.15,0.46l-0.19,0.58l0.39,0.63l0.14,1.34l-0.84,-0.2l-0.84,0.46l-1.58,-0.07l-2.08,-1.44l-2.09,0.33l-1.91,-0.62l-3.73,0.84l-2.39,2.07l-2.54,1.22l-1.45,1.41l-0.61,1.38l0.34,3.71l-0.29,0.02l-3.5,-1.33l-1.25,-3.11l-1.44,-1.5l-2.24,-3.56l-1.76,-1.09l-2.27,-0.01l-1.71,2.07l-1.76,-0.69l-1.16,-0.74l-1.52,-2.98l-3.93,-3.16l-4.34,-0.0l-0.4,0.4l-0.0,0.74l-6.5,0.02l-9.02,-3.14l-0.34,-0.71l-5.7,0.49l-0.43,-1.29l-1.62,-1.61l-1.14,-0.38l-0.55,-0.88l-1.28,-0.13l-1.01,-0.77l-2.22,-0.27l-0.43,-0.3l-0.36,-1.58l-2.4,-2.83l-2.01,-3.85l-0.06,-0.9l-2.92,-3.26l-0.33,-2.29l-1.3,-1.66l0.52,-2.37l-0.09,-2.57l-0.78,-2.3l0.95,-2.82l0.61,-5.68l-0.47,-4.27l-1.46,-4.08l3.19,0.79l1.26,2.83l0.69,0.08l0.69,-1.14l-1.1,-4.79l68.76,-0.0l0.4,-0.4l0.14,-0.86ZM32.44,67.52l1.73,1.97l0.55,0.05l0.99,-0.79l3.65,0.24l-0.09,0.62l0.32,0.45l3.83,0.77l2.61,-0.43l5.19,1.4l4.84,0.43l1.89,0.57l3.42,-0.7l6.14,1.87l-0.03,38.06l0.38,0.4l2.39,0.11l2.31,0.98l3.9,3.99l0.55,0.04l2.4,-2.03l2.16,-1.04l1.2,1.71l3.95,3.14l4.09,6.63l4.2,2.29l0.06,1.83l-1.02,1.23l-1.16,-1.08l-2.04,-1.03l-0.67,-2.89l-3.28,-3.03l-1.65,-3.57l-6.35,-0.32l-2.82,-1.01l-5.26,-3.85l-6.77,-2.04l-3.53,0.3l-4.81,-1.69l-3.25,-1.63l-2.78,0.8l-0.28,0.46l0.44,2.21l-3.91,0.96l-2.26,1.27l-2.3,0.65l-0.27,-1.65l1.05,-3.42l2.49,-1.09l0.16,-0.6l-0.69,-0.96l-0.55,-0.1l-3.19,2.12l-1.78,2.56l-3.55,2.61l-0.04,0.61l1.56,1.52l-2.07,2.29l-5.11,2.57l-0.77,1.66l-3.76,1.77l-0.92,1.73l-2.69,1.38l-1.81,-0.22l-6.95,3.32l-3.97,0.91l4.85,-2.5l2.59,-1.86l3.26,-0.52l1.19,-1.4l3.42,-2.1l2.59,-2.27l0.42,-2.68l1.23,-2.1l-0.04,-0.46l-0.45,-0.11l-2.68,1.03l-0.63,-0.49l-0.53,0.03l-1.05,1.04l-1.36,-1.54l-0.66,0.08l-0.32,0.62l-0.58,-1.14l-0.56,-0.16l-2.41,1.42l-1.07,-0.0l-0.17,-1.75l0.3,-1.71l-1.61,-1.33l-3.41,0.59l-1.96,-1.63l-1.57,-0.84l-0.15,-2.21l-1.7,-1.43l0.82,-1.88l1.99,-2.12l0.88,-1.92l1.71,-0.24l2.04,0.51l1.87,-1.77l1.91,0.25l1.91,-1.23l0.17,-0.43l-0.47,-1.82l-1.07,-0.7l1.39,-1.17l0.12,-0.45l-0.39,-0.26l-1.65,0.07l-2.66,0.88l-0.75,0.78l-1.92,-0.8l-3.46,0.44l-3.44,-0.91l-1.06,-1.61l-2.65,-1.99l2.91,-1.43l5.5,-2.0l1.52,0.0l-0.26,1.62l0.41,0.46l5.29,-0.16l0.3,-0.65l-2.03,-2.59l-3.14,-1.68l-1.79,-2.12l-2.4,-1.83l-3.09,-1.24l1.04,-1.69l4.23,-0.14l3.36,-2.07l0.73,-2.27l2.39,-1.99l2.42,-0.52l4.65,-1.97l2.46,0.23l3.71,-2.35l3.5,0.89ZM37.6,123.41l-2.25,1.23l-0.95,-0.69l-0.29,-1.24l3.21,-1.63l1.42,0.21l0.67,0.7l-1.8,1.42ZM31.06,234.03l0.98,0.47l0.74,0.87l-1.77,1.07l-0.44,-1.53l0.49,-0.89ZM29.34,232.07l0.18,0.05l0.08,0.05l-0.16,0.03l-0.11,-0.14ZM25.16,230.17l0.05,-0.03l0.18,0.22l-0.13,-0.01l-0.1,-0.18ZM5.89,113.26l-1.08,0.41l-2.21,-1.12l1.53,-0.4l1.62,0.28l0.14,0.83Z",
                    name: "United States"
                },
                UY: {
                    path: "M286.85,372.74l-0.92,1.5l-2.59,1.44l-1.69,-0.52l-1.42,0.26l-2.39,-1.19l-1.52,0.08l-1.27,-1.3l0.16,-1.5l0.56,-0.79l-0.02,-2.73l1.21,-4.74l1.19,-0.21l2.37,2.0l1.08,0.03l4.36,3.17l1.22,1.6l-0.96,1.5l0.61,1.4Z",
                    name: "Uruguay"
                },
                LB: {
                    path: "M510.37,198.01l-0.88,0.51l1.82,-3.54l0.62,0.08l0.22,0.61l-1.13,0.88l-0.65,1.47Z",
                    name: "Lebanon"
                },
                LA: {
                    path: "M689.54,248.53l-1.76,-0.74l-0.49,0.15l-0.94,1.46l-1.32,-0.64l0.62,-0.98l0.11,-2.17l-2.04,-2.42l-0.25,-2.65l-1.9,-2.1l-2.15,-0.31l-0.78,0.91l-1.12,0.06l-1.05,-0.4l-2.06,1.2l-0.04,-1.59l0.61,-2.68l-0.36,-0.49l-1.35,-0.1l-0.11,-1.23l-0.96,-0.88l1.96,-1.89l0.39,0.36l1.33,0.07l0.42,-0.45l-0.34,-2.66l0.7,-0.21l1.28,1.81l1.11,2.35l0.36,0.23l2.82,0.02l0.71,1.67l-1.39,0.65l-0.72,0.93l0.13,0.6l2.91,1.51l3.6,5.25l1.88,1.78l0.56,1.62l-0.35,1.96Z",
                    name: "Lao PDR"
                },
                TW: {
                    path: "M724.01,226.68l-0.74,1.48l-0.9,-1.52l-0.25,-1.74l1.38,-2.44l1.73,-1.74l0.64,0.44l-1.85,5.52Z",
                    name: "Taiwan"
                },
                TT: {
                    path: "M266.64,259.32l0.28,-1.16l1.13,-0.22l-0.06,1.2l-1.35,0.18Z",
                    name: "Trinidad and Tobago"
                },
                TR: {
                    path: "M513.21,175.47l3.64,1.17l3.05,-0.44l2.1,0.26l3.11,-1.56l2.46,-0.13l2.19,1.33l0.33,0.82l-0.22,1.33l0.25,0.44l2.28,1.13l-1.17,0.57l-0.21,0.45l0.75,3.2l-0.41,1.16l1.13,1.92l-0.55,0.22l-0.9,-0.67l-2.91,-0.37l-1.24,0.46l-4.23,0.41l-2.81,1.05l-1.91,0.01l-1.52,-0.53l-2.58,0.75l-0.66,-0.45l-0.62,0.3l-0.12,1.45l-0.89,0.84l-0.47,-0.67l0.79,-1.3l-0.41,-0.2l-1.43,0.23l-2.0,-0.63l-2.02,1.65l-3.51,0.3l-2.13,-1.53l-2.7,-0.1l-0.86,1.24l-1.38,0.27l-2.29,-1.44l-2.71,-0.01l-1.37,-2.65l-1.68,-1.52l1.07,-1.99l-0.09,-0.49l-1.27,-1.12l2.37,-2.41l3.7,-0.11l1.28,-2.24l4.49,0.37l3.21,-1.97l2.81,-0.82l3.99,-0.06l4.29,2.07ZM488.79,176.72l-1.72,1.31l-0.5,-0.88l1.37,-2.57l-0.7,-0.85l1.7,-0.63l1.8,0.34l0.46,1.17l1.76,0.78l-2.87,0.32l-1.3,1.01Z",
                    name: "Turkey"
                },
                LK: {
                    path: "M624.16,268.99l-1.82,0.48l-0.99,-1.67l-0.42,-3.46l0.95,-3.43l1.21,0.98l2.26,4.19l-0.34,2.33l-0.85,0.58Z",
                    name: "Sri Lanka"
                },
                LV: {
                    path: "M489.16,122.85l0.96,0.66l0.22,1.65l0.68,1.76l-3.65,1.7l-2.23,-1.58l-1.29,-0.26l-0.68,-0.77l-2.42,0.34l-4.16,-0.23l-2.47,0.9l0.06,-1.98l1.13,-2.06l1.95,-1.02l2.12,2.58l2.01,-0.07l0.38,-0.33l0.44,-2.52l1.76,-0.53l3.06,1.7l2.15,0.07Z",
                    name: "Latvia"
                },
                LT: {
                    path: "M486.93,129.3l0.17,1.12l-1.81,0.98l-0.72,2.02l-2.47,1.18l-2.1,-0.02l-0.73,-1.05l-1.06,-0.3l-0.09,-1.87l-3.56,-1.13l-0.43,-2.36l2.48,-0.94l4.12,0.22l2.25,-0.31l0.52,0.69l1.24,0.21l2.19,1.56Z",
                    name: "Lithuania"
                },
                LU: {
                    path: "M436.08,149.45l-0.48,-0.07l0.3,-1.28l0.27,0.4l-0.09,0.96Z",
                    name: "Luxembourg"
                },
                LR: {
                    path: "M399.36,265.97l0.18,1.54l-0.48,0.99l0.08,0.47l2.47,1.8l-0.33,2.8l-2.65,-1.13l-5.78,-4.61l0.58,-1.32l2.1,-2.33l0.86,-0.22l0.77,1.14l-0.14,0.85l0.59,0.87l1.0,0.14l0.76,-0.99Z",
                    name: "Liberia"
                },
                LS: {
                    path: "M491.06,363.48l-0.49,0.15l-1.49,-1.67l1.1,-1.43l2.19,-1.44l1.51,1.27l-0.98,1.82l-1.23,0.38l-0.62,0.93Z",
                    name: "Lesotho"
                },
                TH: {
                    path: "M670.27,255.86l-1.41,3.87l0.15,2.0l0.38,0.36l1.38,0.07l0.9,2.04l0.55,2.34l1.4,1.44l1.61,0.38l0.96,0.97l-0.5,0.64l-1.1,0.2l-0.34,-1.18l-2.04,-1.1l-0.63,0.23l-0.63,-0.62l-0.48,-1.3l-2.56,-2.63l-0.73,0.41l0.95,-3.89l2.16,-4.22ZM670.67,254.77l-0.92,-2.18l-0.26,-2.61l-2.14,-3.06l0.71,-0.49l0.89,-2.59l-3.61,-5.45l0.87,-0.51l1.05,-2.58l1.74,-0.18l2.6,-1.59l0.76,0.56l0.13,1.39l0.37,0.36l1.23,0.09l-0.51,2.28l0.05,2.42l0.6,0.34l2.43,-1.42l0.77,0.39l1.47,-0.07l0.71,-0.88l1.48,0.14l1.71,1.88l0.25,2.65l1.92,2.11l-0.1,1.89l-0.61,0.86l-2.22,-0.33l-3.5,0.64l-1.6,2.12l0.36,2.58l-1.51,-0.79l-1.84,-0.01l0.28,-1.52l-0.4,-0.47l-2.21,0.01l-0.4,0.37l-0.19,2.74l-0.34,0.93Z",
                    name: "Thailand"
                },
                TF: {
                    path: "M596.68,420.38l-3.2,0.18l-0.05,-1.26l0.39,-1.41l1.3,0.78l2.08,0.35l-0.52,1.36Z",
                    name: "Fr. S. Antarctic Lands"
                },
                TG: {
                    path: "M422.7,257.63l-0.09,1.23l1.53,1.52l0.08,1.09l0.5,0.65l-0.11,5.62l0.49,1.47l-1.31,0.35l-1.02,-2.13l-0.18,-1.12l0.53,-2.19l-0.63,-1.16l-0.22,-3.68l-1.01,-1.4l0.07,-0.28l1.37,0.03Z",
                    name: "Togo"
                },
                TD: {
                    path: "M480.25,235.49l0.12,9.57l-2.1,0.05l-1.14,1.89l-0.69,1.63l0.34,0.73l-0.66,0.91l0.24,0.89l-0.86,1.95l0.45,0.5l0.6,-0.1l0.34,0.64l0.03,1.38l0.9,1.04l-1.45,0.43l-1.27,1.03l-1.83,2.76l-2.16,1.07l-2.31,-0.15l-0.86,0.25l-0.26,0.49l0.17,0.61l-2.11,1.68l-2.85,0.87l-1.09,-0.57l-0.73,0.66l-1.12,0.1l-1.1,-3.12l-1.25,-0.64l-1.22,-1.22l0.29,-0.64l3.01,0.04l0.35,-0.6l-1.3,-2.2l-0.08,-3.31l-0.97,-1.66l0.22,-1.04l-0.38,-0.48l-1.22,-0.04l0.0,-1.25l-0.98,-1.07l0.96,-3.01l3.25,-2.65l0.13,-3.33l0.95,-5.18l0.52,-1.07l-0.1,-0.48l-0.91,-0.78l-0.2,-0.96l-0.8,-0.58l-0.55,-3.65l2.1,-1.2l19.57,9.83Z",
                    name: "Chad"
                },
                LY: {
                    path: "M483.48,203.15l-0.75,1.1l0.29,1.39l-0.6,1.83l0.73,2.14l0.0,24.12l-2.48,0.01l-0.41,0.85l-19.41,-9.76l-4.41,2.28l-1.37,-1.33l-3.82,-1.1l-1.14,-1.65l-1.98,-1.23l-1.22,0.32l-0.66,-1.11l-0.17,-1.26l-1.28,-1.69l0.87,-1.19l-0.07,-4.34l0.43,-2.27l-0.86,-3.45l1.13,-0.76l0.22,-1.16l-0.2,-1.03l3.48,-2.61l0.29,-1.94l2.45,0.8l1.18,-0.21l1.98,0.44l3.15,1.18l1.37,2.54l5.72,1.67l2.64,1.35l1.61,-0.72l1.29,-1.34l-0.44,-2.34l0.66,-1.13l1.67,-1.21l1.57,-0.35l3.14,0.53l1.08,1.28l3.99,0.78l0.36,0.54Z",
                    name: "Libya"
                },
                AE: {
                    path: "M550.76,223.97l1.88,-0.4l3.84,0.02l4.78,-4.75l0.19,0.36l0.26,1.58l-0.81,0.01l-0.39,0.35l-0.08,2.04l-0.81,0.63l-0.01,0.96l-0.66,0.99l-0.39,1.41l-7.08,-1.25l-0.7,-1.96Z",
                    name: "United Arab Emirates"
                },
                VE: {
                    path: "M240.68,256.69l0.53,0.75l-0.02,1.06l-1.07,1.78l0.95,2.0l0.42,0.22l1.4,-0.44l0.56,-1.83l-0.77,-1.17l-0.1,-1.47l2.82,-0.93l0.26,-0.49l-0.28,-0.96l0.3,-0.28l0.66,1.31l1.96,0.26l1.4,1.22l0.08,0.68l0.39,0.35l4.81,-0.22l1.49,1.11l1.92,0.31l1.67,-0.84l0.22,-0.6l3.44,-0.14l-0.17,0.55l0.86,1.19l2.19,0.35l1.67,1.1l0.37,1.86l0.41,0.32l1.55,0.17l-1.66,1.35l-0.22,0.92l0.65,0.97l-1.67,0.54l-0.3,0.4l0.04,0.99l-0.56,0.57l-0.01,0.55l1.85,2.27l-0.66,0.69l-4.47,1.29l-0.72,0.54l-3.69,-0.9l-0.71,0.27l-0.02,0.7l0.91,0.53l-0.08,1.54l0.35,1.58l0.35,0.31l1.66,0.17l-1.3,0.52l-0.48,1.13l-2.68,0.91l-0.6,0.77l-1.57,0.13l-1.17,-1.13l-0.8,-2.52l-1.25,-1.26l1.02,-1.23l-1.29,-2.95l0.18,-1.62l1.0,-2.21l-0.2,-0.49l-1.14,-0.46l-4.02,0.36l-1.82,-2.1l-1.57,-0.33l-2.99,0.22l-1.06,-0.97l0.25,-1.23l-0.2,-1.01l-0.59,-0.69l-0.29,-1.06l-1.08,-0.39l0.78,-2.79l1.9,-2.11Z",
                    name: "Venezuela"
                },
                AF: {
                    path: "M600.7,188.88l-1.57,1.3l-0.1,0.48l0.8,2.31l-1.09,1.04l-0.03,1.27l-0.48,0.71l-2.16,-0.08l-0.37,0.59l0.78,1.48l-1.38,0.69l-1.06,1.69l0.06,1.7l-0.65,0.52l-0.91,-0.21l-1.91,0.36l-0.48,0.77l-1.88,0.13l-1.4,1.56l-0.18,2.32l-2.91,1.02l-1.65,-0.23l-0.71,0.55l-1.41,-0.3l-2.41,0.39l-3.52,-1.17l1.96,-2.35l-0.21,-1.78l-0.3,-0.34l-1.63,-0.4l-0.19,-1.58l-0.75,-2.03l0.95,-1.36l-0.19,-0.6l-0.73,-0.28l1.47,-4.8l2.14,0.9l2.12,-0.36l0.74,-1.34l1.77,-0.39l1.54,-0.92l0.63,-2.31l1.87,-0.5l0.49,-0.81l0.94,0.56l2.13,0.11l2.55,0.92l1.95,-0.83l0.65,0.43l0.56,-0.13l0.69,-1.12l1.57,-0.08l0.72,-1.66l0.79,-0.74l0.8,0.39l-0.17,0.56l0.71,0.58l-0.08,2.39l1.11,0.95ZM601.37,188.71l1.73,-0.71l1.43,-1.18l4.03,0.35l-2.23,0.74l-4.95,0.8Z",
                    name: "Afghanistan"
                },
                IQ: {
                    path: "M530.82,187.47l0.79,0.66l1.26,-0.28l1.46,3.08l1.63,0.94l0.14,1.23l-1.22,1.05l-0.53,2.52l1.73,2.67l3.12,1.62l1.15,1.88l-0.38,1.85l0.39,0.48l0.41,-0.0l0.02,1.07l0.76,0.94l-2.47,-0.1l-1.71,2.44l-4.31,-0.2l-7.02,-5.48l-3.73,-1.94l-2.88,-0.73l-0.85,-2.87l5.45,-3.02l0.95,-3.43l-0.19,-1.96l1.27,-0.7l1.22,-1.7l0.87,-0.36l2.69,0.34Z",
                    name: "Iraq"
                },
                IS: {
                    path: "M384.14,88.06l-0.37,2.61l2.54,2.51l-2.9,2.75l-9.19,3.4l-9.25,-1.66l1.7,-1.22l-0.1,-0.7l-4.05,-1.47l2.96,-0.53l0.33,-0.43l-0.11,-1.2l-0.33,-0.36l-4.67,-0.85l1.28,-2.04l3.45,-0.56l3.77,2.72l0.44,0.02l3.64,-2.16l3.3,1.08l3.98,-2.16l3.58,0.26Z",
                    name: "Iceland"
                },
                IR: {
                    path: "M533.43,187.16l-1.27,-2.15l0.42,-0.98l-0.71,-3.04l1.03,-0.5l0.33,0.83l1.26,1.35l2.05,0.51l1.11,-0.16l2.89,-2.11l0.62,-0.14l0.39,0.46l-0.72,1.2l0.06,0.49l1.56,1.53l0.65,0.04l0.67,1.81l2.56,0.83l1.87,1.48l3.69,0.49l3.91,-0.76l0.47,-0.73l2.17,-0.6l1.66,-1.54l1.51,0.08l1.18,-0.53l1.59,0.24l2.83,1.48l1.88,0.3l2.77,2.47l1.77,0.18l0.18,1.99l-1.68,5.49l0.24,0.5l0.61,0.23l-0.82,1.48l0.8,2.18l0.19,1.71l0.3,0.34l1.63,0.4l0.15,1.32l-2.15,2.35l-0.01,0.53l2.21,3.03l2.34,1.24l0.06,2.14l1.24,0.72l0.11,0.69l-3.31,1.27l-1.08,3.03l-9.68,-1.68l-0.99,-3.05l-1.43,-0.73l-2.17,0.46l-2.47,1.26l-2.83,-0.82l-2.46,-2.02l-2.41,-0.8l-3.42,-6.06l-0.48,-0.2l-1.18,0.39l-1.44,-0.82l-0.5,0.08l-0.65,0.74l-0.97,-1.01l-0.02,-1.31l-0.71,-0.39l0.26,-1.81l-1.29,-2.11l-3.13,-1.63l-1.58,-2.43l0.5,-1.9l1.31,-1.26l-0.19,-1.66l-1.74,-1.1l-1.57,-3.3Z",
                    name: "Iran"
                },
                AM: {
                    path: "M536.99,182.33l-0.28,0.03l-1.23,-2.13l-0.93,0.01l-0.62,-0.66l-0.69,-0.07l-0.96,-0.81l-1.56,-0.62l0.19,-1.12l-0.26,-0.79l2.72,-0.36l1.09,1.01l-0.17,0.92l1.02,0.78l-0.47,0.62l0.08,0.56l2.04,1.23l0.04,1.4Z",
                    name: "Armenia"
                },
                AL: {
                    path: "M470.32,171.8l0.74,0.03l0.92,0.89l-0.17,1.95l0.36,1.28l1.01,0.82l-1.82,2.83l-0.19,-0.61l-1.25,-0.89l-0.18,-1.2l0.53,-2.82l-0.54,-1.47l0.6,-0.83Z",
                    name: "Albania"
                },
                AO: {
                    path: "M461.55,300.03l1.26,3.15l1.94,2.36l2.47,-0.53l1.25,0.32l0.44,-0.18l0.93,-1.92l1.31,-0.08l0.41,-0.44l0.47,-0.0l-0.1,0.41l0.39,0.49l2.65,-0.02l0.03,1.19l0.48,1.01l-0.34,1.52l0.18,1.55l0.83,1.04l-0.13,2.85l0.54,0.39l3.96,-0.41l-0.1,1.79l0.39,1.05l-0.24,1.43l-4.7,-0.03l-0.4,0.39l-0.12,8.13l2.92,3.49l-3.83,0.88l-5.89,-0.36l-1.88,-1.24l-10.47,0.22l-1.3,-1.01l-1.85,-0.16l-2.4,0.77l-0.15,-1.06l0.33,-2.16l1.0,-3.45l1.35,-3.2l2.24,-2.8l0.33,-2.06l-0.13,-1.53l-0.8,-1.08l-1.21,-2.87l0.87,-1.62l-1.27,-4.12l-1.17,-1.53l2.47,-0.63l7.03,0.03ZM451.71,298.87l-0.47,-1.25l1.25,-1.11l0.32,0.3l-0.99,1.03l-0.12,1.03Z",
                    name: "Angola"
                },
                AR: {
                    path: "M249.29,428.93l-2.33,-0.52l-5.83,-0.43l-0.89,-1.66l0.05,-2.37l-0.45,-0.4l-1.43,0.18l-0.67,-0.91l-0.2,-3.13l1.88,-1.47l0.79,-2.04l-0.25,-1.7l1.3,-2.68l0.91,-4.15l-0.22,-1.69l0.85,-0.45l0.2,-0.44l-0.27,-1.16l-0.98,-0.68l0.59,-0.92l-0.05,-0.5l-1.04,-1.07l-0.52,-3.1l0.97,-0.86l-0.42,-3.58l1.2,-5.43l1.38,-0.98l0.16,-0.43l-0.75,-2.79l-0.01,-2.43l1.78,-1.75l0.06,-2.57l1.43,-2.85l0.01,-2.58l-0.69,-0.74l-1.09,-4.52l1.47,-2.7l-0.18,-2.79l0.85,-2.35l1.59,-2.46l1.73,-1.64l0.05,-0.52l-0.6,-0.84l0.44,-0.85l-0.07,-4.19l2.7,-1.44l0.86,-2.75l-0.21,-0.71l1.76,-2.01l2.9,0.57l1.38,1.78l0.68,-0.08l0.87,-1.87l2.39,0.09l4.95,4.77l2.17,0.49l3.0,1.92l2.47,1.0l0.25,0.82l-2.37,3.93l0.23,0.59l5.39,1.16l2.12,-0.44l2.45,-2.16l0.5,-2.38l0.76,-0.31l0.98,1.2l-0.04,1.8l-3.67,2.51l-2.85,2.66l-3.43,3.88l-1.3,5.07l0.01,2.72l-0.54,0.73l-0.36,3.28l3.14,2.64l-0.16,2.11l1.4,1.11l-0.1,1.09l-2.29,3.52l-3.55,1.49l-4.92,0.6l-2.71,-0.29l-0.43,0.51l0.5,1.65l-0.49,2.1l0.38,1.42l-1.19,0.83l-2.36,0.38l-2.3,-1.04l-1.38,0.83l0.41,3.64l1.69,0.91l1.4,-0.71l0.36,0.76l-2.04,0.86l-2.01,1.89l-0.97,4.63l-2.34,0.1l-2.09,1.78l-0.61,2.75l2.46,2.31l2.17,0.63l-0.7,2.32l-2.83,1.73l-1.73,3.86l-2.17,1.22l-1.16,1.67l0.75,3.76l1.04,1.28ZM256.71,438.88l-2.0,0.15l-1.4,-1.22l-3.82,-0.1l-0.0,-5.83l1.6,3.05l3.26,2.07l3.08,0.78l-0.71,1.1Z",
                    name: "Argentina"
                },
                AU: {
                    path: "M705.8,353.26l0.26,0.04l0.17,-0.47l-0.48,-1.42l0.92,1.11l0.45,0.15l0.27,-0.39l-0.1,-1.56l-1.98,-3.63l1.09,-3.31l-0.24,-1.57l0.34,-0.62l0.38,1.06l0.43,-0.19l0.99,-1.7l1.91,-0.83l1.29,-1.15l1.81,-0.91l0.96,-0.17l0.92,0.26l1.92,-0.95l1.47,-0.28l1.03,-0.8l1.43,0.04l2.78,-0.84l1.36,-1.15l0.71,-1.45l1.41,-1.26l0.3,-2.58l1.27,-1.59l0.78,1.65l0.54,0.19l1.07,-0.51l0.15,-0.6l-0.73,-1.0l0.45,-0.71l0.78,0.39l0.58,-0.3l0.28,-1.82l1.87,-2.14l1.12,-0.39l0.28,-0.58l0.62,0.17l0.53,-0.73l1.87,-0.57l1.65,1.05l1.35,1.48l3.39,0.38l0.43,-0.54l-0.46,-1.23l1.05,-1.79l1.04,-0.61l0.14,-0.55l-0.25,-0.41l0.88,-1.17l1.31,-0.77l1.3,0.27l2.1,-0.48l0.31,-0.4l-0.05,-1.3l-0.92,-0.77l1.48,0.56l1.41,1.07l2.11,0.65l0.81,-0.2l1.4,0.7l1.69,-0.66l0.8,0.19l0.64,-0.33l0.71,0.77l-1.33,1.94l-0.71,0.07l-0.35,0.51l0.24,0.86l-1.52,2.35l0.12,1.05l2.15,1.65l1.97,0.85l3.04,2.36l1.97,0.65l0.55,0.88l2.72,0.85l1.84,-1.1l2.07,-5.97l-0.42,-3.59l0.3,-1.73l0.47,-0.87l-0.31,-0.68l1.09,-3.28l0.46,-0.47l0.4,0.71l0.16,1.51l0.65,0.52l0.16,1.04l0.85,1.21l0.12,2.38l0.9,2.0l0.57,0.18l1.3,-0.78l1.69,1.7l-0.2,1.08l0.53,2.2l0.39,1.3l0.68,0.48l0.6,1.95l-0.19,1.48l0.81,1.76l6.01,3.69l-0.11,0.76l1.38,1.58l0.95,2.77l0.58,0.22l0.72,-0.41l0.8,0.9l0.61,0.01l0.46,2.41l4.81,4.71l0.66,2.02l-0.07,3.31l1.14,2.2l-0.13,2.24l-1.1,3.68l0.03,1.64l-0.47,1.89l-1.05,2.4l-1.9,1.47l-1.72,3.51l-2.38,6.09l-0.24,2.82l-1.14,0.8l-2.85,0.15l-2.31,1.19l-2.51,2.25l-3.09,-1.57l0.3,-1.15l-0.54,-0.47l-1.5,0.63l-2.01,1.94l-7.12,-2.18l-1.48,-1.63l-1.14,-3.74l-1.45,-1.26l-1.81,-0.26l0.56,-1.18l-0.61,-2.1l-0.72,-0.1l-1.14,1.82l-0.9,0.21l0.63,-0.82l0.36,-1.55l0.92,-1.31l-0.13,-2.34l-0.7,-0.22l-2.0,2.34l-1.51,0.93l-0.94,2.01l-1.35,-0.81l-0.02,-1.52l-1.57,-2.04l-1.09,-0.88l0.24,-0.33l-0.14,-0.59l-3.21,-1.69l-1.83,-0.12l-2.54,-1.35l-4.58,0.28l-6.02,1.9l-2.53,-0.13l-2.62,1.41l-2.13,0.63l-1.49,2.6l-3.49,0.31l-2.29,-0.5l-3.48,0.43l-1.6,1.47l-0.81,-0.04l-2.37,1.63l-3.26,-0.1l-3.72,-2.21l0.04,-1.05l1.19,-0.46l0.49,-0.89l0.21,-2.97l-0.28,-1.64l-1.34,-2.86l-0.38,-1.47l0.05,-1.72l-0.95,-1.7l-0.18,-0.97l-1.01,-0.99l-0.29,-1.98l-1.13,-1.75ZM784.92,393.44l2.65,1.02l3.23,-0.96l1.09,0.14l0.15,3.06l-0.85,1.13l-0.17,1.63l-0.87,-0.24l-1.57,1.91l-1.68,-0.18l-1.4,-2.36l-0.37,-2.04l-1.39,-2.51l0.04,-0.8l1.15,0.18Z",
                    name: "Australia"
                },
                AT: {
                    path: "M462.89,152.8l0.04,2.25l-1.07,0.0l-0.33,0.63l0.36,0.51l-1.04,2.13l-2.02,0.07l-1.33,0.7l-5.29,-0.99l-0.47,-0.93l-0.44,-0.21l-2.47,0.55l-0.42,0.51l-3.18,-0.81l0.43,-0.91l1.12,0.78l0.6,-0.17l0.25,-0.58l1.93,0.12l1.86,-0.56l1.0,0.08l0.68,0.57l0.62,-0.15l0.26,-0.77l-0.3,-1.78l0.8,-0.44l0.68,-1.15l1.52,0.85l0.47,-0.06l1.34,-1.25l0.64,-0.17l1.81,0.92l1.28,-0.11l0.7,0.37Z",
                    name: "Austria"
                },
                IN: {
                    path: "M623.34,207.03l-1.24,1.04l-0.97,2.55l0.22,0.51l8.04,3.87l3.42,0.37l1.57,1.38l4.92,0.88l2.18,-0.04l0.38,-0.3l0.29,-1.24l-0.32,-1.64l0.14,-0.87l0.82,-0.31l0.45,2.48l2.28,1.02l1.77,-0.38l4.14,0.1l0.38,-0.36l0.18,-1.66l-0.5,-0.65l1.37,-0.29l2.25,-1.99l2.7,-1.62l1.93,0.62l1.8,-0.98l0.79,1.14l-0.68,0.91l0.26,0.63l2.42,0.36l0.09,0.47l-0.83,0.75l0.13,1.07l-1.52,-0.29l-3.24,1.86l-0.13,1.78l-1.32,2.14l-0.18,1.39l-0.93,1.82l-1.64,-0.5l-0.52,0.37l-0.09,2.63l-0.56,1.11l0.19,0.81l-0.53,0.27l-1.18,-3.73l-1.08,-0.27l-0.38,0.31l-0.24,1.0l-0.66,-0.66l0.54,-1.06l1.22,-0.34l1.15,-2.25l-0.24,-0.56l-1.57,-0.47l-4.34,-0.28l-0.18,-1.56l-0.35,-0.35l-1.11,-0.12l-1.91,-1.12l-0.56,0.17l-0.88,1.82l0.11,0.49l1.36,1.07l-1.09,0.69l-0.69,1.11l0.18,0.56l1.24,0.57l-0.32,1.54l0.85,1.94l0.36,2.01l-0.22,0.59l-4.58,0.52l-0.33,0.42l0.13,1.8l-1.17,1.36l-3.65,1.81l-2.79,3.03l-4.32,3.28l-0.18,1.27l-4.65,1.79l-0.77,2.16l0.64,5.3l-1.06,2.49l-0.01,3.94l-1.24,0.28l-1.14,1.93l0.39,0.84l-1.68,0.53l-1.04,1.83l-0.65,0.47l-2.06,-2.05l-2.1,-6.02l-2.2,-3.64l-1.05,-4.75l-2.29,-3.57l-1.76,-8.2l0.01,-3.11l-0.49,-2.53l-0.55,-0.29l-3.53,1.52l-1.53,-0.27l-2.86,-2.77l0.85,-0.67l0.08,-0.55l-0.74,-1.03l-2.67,-2.06l1.24,-1.32l5.34,0.01l0.39,-0.49l-0.5,-2.29l-1.42,-1.46l-0.27,-1.93l-1.43,-1.2l2.31,-2.37l3.05,0.06l2.62,-2.85l1.6,-2.81l2.4,-2.73l0.07,-2.04l1.97,-1.48l-0.02,-0.65l-1.93,-1.31l-0.82,-1.78l-0.8,-2.21l0.9,-0.89l3.59,0.65l2.92,-0.42l2.33,-2.19l2.31,2.85l-0.24,2.13l0.99,1.59l-0.05,0.82l-1.34,-0.28l-0.47,0.48l0.7,3.06l2.62,1.99l2.99,1.65Z",
                    name: "India"
                },
                TZ: {
                    path: "M495.56,296.42l2.8,-3.12l-0.02,-0.81l-0.64,-1.3l0.68,-0.52l0.14,-1.47l-0.76,-1.25l0.31,-0.11l2.26,0.03l-0.51,2.76l0.76,1.3l0.5,0.12l1.05,-0.53l1.19,-0.12l0.61,0.24l1.43,-0.62l0.1,-0.67l-0.71,-0.62l1.57,-1.7l8.65,4.86l0.32,1.53l3.34,2.33l-1.05,2.8l0.13,1.61l1.63,1.12l-0.6,1.76l-0.01,2.33l1.89,4.03l0.57,0.43l-1.46,1.08l-2.61,0.94l-1.43,-0.04l-1.06,0.77l-2.29,0.36l-2.87,-0.68l-0.83,0.07l-0.63,-0.75l-0.31,-2.78l-1.32,-1.35l-3.25,-0.77l-3.96,-1.58l-1.18,-2.41l-0.32,-1.75l-1.76,-1.49l0.42,-1.05l-0.44,-0.89l0.08,-0.96l-0.46,-0.58l0.06,-0.56Z",
                    name: "Tanzania"
                },
                AZ: {
                    path: "M539.29,175.73l1.33,0.32l1.94,-1.8l2.3,3.34l1.43,0.43l-1.26,0.15l-0.35,0.32l-0.8,3.14l-0.99,0.96l0.05,1.11l-1.26,-1.13l0.7,-1.18l-0.04,-0.47l-0.74,-0.86l-1.48,0.15l-2.34,1.71l-0.03,-1.27l-2.03,-1.35l0.47,-0.62l-0.08,-0.56l-1.03,-0.79l0.29,-0.43l-0.14,-0.58l-1.13,-0.86l1.89,0.68l1.69,0.06l0.37,-0.87l-0.81,-1.37l0.42,0.06l1.63,1.72ZM533.78,180.57l0.61,0.46l0.69,-0.0l0.59,1.15l-0.68,-0.15l-1.21,-1.45Z",
                    name: "Azerbaijan"
                },
                IE: {
                    path: "M405.08,135.42l0.35,2.06l-1.75,2.78l-4.22,1.88l-2.84,-0.4l1.73,-3.0l-1.18,-3.53l4.6,-3.74l0.32,1.15l-0.49,1.74l0.4,0.51l1.47,-0.04l1.6,0.6Z",
                    name: "Ireland"
                },
                ID: {
                    path: "M756.47,287.89l0.69,4.01l2.79,1.78l0.51,-0.1l2.04,-2.59l2.71,-1.43l2.05,-0.0l3.9,1.73l2.46,0.45l0.08,15.12l-1.75,-1.54l-2.54,-0.51l-0.88,0.71l-2.32,0.06l0.69,-1.33l1.45,-0.64l0.23,-0.46l-0.65,-2.74l-1.24,-2.21l-5.04,-2.29l-2.09,-0.23l-3.68,-2.27l-0.55,0.13l-0.65,1.07l-0.52,0.12l-0.55,-1.89l-1.21,-0.78l1.84,-0.62l1.72,0.05l0.39,-0.52l-0.21,-0.66l-0.38,-0.28l-3.45,-0.0l-1.13,-1.48l-2.1,-0.43l-0.52,-0.6l2.69,-0.48l1.28,-0.78l3.66,0.94l0.3,0.71ZM757.91,300.34l-0.62,0.82l-0.1,-0.8l0.59,-1.12l0.13,1.1ZM747.38,292.98l0.34,0.72l-1.22,-0.57l-4.68,-0.1l0.27,-0.62l2.78,-0.09l2.52,0.67ZM741.05,285.25l-0.67,-2.88l0.64,-2.01l0.41,0.86l1.21,0.18l0.16,0.7l-0.1,1.68l-0.84,-0.16l-0.46,0.3l-0.34,1.34ZM739.05,293.5l-0.5,0.44l-1.34,-0.36l-0.17,-0.37l1.73,-0.08l0.27,0.36ZM721.45,284.51l-0.19,1.97l2.24,2.23l0.54,0.02l1.27,-1.07l2.75,-0.5l-0.9,1.21l-2.11,0.93l-0.16,0.6l2.22,3.01l-0.3,1.07l1.36,1.74l-2.26,0.85l-0.28,-0.31l0.12,-1.19l-1.64,-1.34l0.17,-2.23l-0.56,-0.39l-1.67,0.76l-0.23,0.39l0.3,6.17l-1.1,0.25l-0.69,-0.47l0.64,-2.21l-0.39,-2.42l-0.39,-0.34l-0.8,-0.01l-0.58,-1.29l0.98,-1.6l0.35,-1.96l1.32,-3.87ZM728.59,296.27l0.38,0.49l-0.02,1.28l-0.88,0.49l-0.53,-0.47l1.04,-1.79ZM729.04,286.98l0.27,-0.05l-0.02,0.13l-0.24,-0.08ZM721.68,284.05l0.16,-0.32l1.89,-1.65l1.83,0.68l3.16,0.35l2.94,-0.1l2.39,-1.66l-1.73,2.13l-1.66,0.43l-2.41,-0.48l-4.17,0.13l-2.39,0.51ZM730.55,310.47l1.11,-1.93l2.03,-0.82l0.08,0.62l-1.45,1.67l-1.77,0.46ZM728.12,305.88l-0.1,0.38l-3.46,0.66l-2.91,-0.27l-0.0,-0.25l1.54,-0.41l1.66,0.73l1.67,-0.19l1.61,-0.65ZM722.9,310.24l-0.64,0.03l-2.26,-1.2l1.11,-0.24l1.78,1.41ZM716.26,305.77l0.88,0.51l1.28,-0.17l0.2,0.35l-4.65,0.73l0.39,-0.67l1.15,-0.02l0.75,-0.73ZM711.66,293.84l-0.38,-0.16l-2.54,1.01l-1.12,-1.44l-1.69,-0.13l-1.16,-0.75l-3.04,0.77l-1.1,-1.15l-3.31,-0.11l-0.35,-3.05l-1.35,-0.95l-1.11,-1.98l-0.33,-2.06l0.27,-2.14l0.9,-1.01l0.37,1.15l2.09,1.49l1.53,-0.48l1.82,0.08l1.38,-1.19l1.0,-0.18l2.28,0.67l2.26,-0.53l1.52,-3.64l1.01,-0.99l0.78,-2.57l4.1,0.3l-1.11,1.77l0.02,0.46l1.7,2.2l-0.23,1.39l2.07,1.71l-2.33,0.42l-0.88,1.9l0.1,2.05l-2.4,1.9l-0.06,2.45l-0.7,2.79ZM692.58,302.03l0.35,0.26l4.8,0.25l0.78,-0.97l4.17,1.09l1.13,1.68l3.69,0.45l2.13,1.04l-1.8,0.6l-2.77,-0.99l-4.8,-0.12l-5.24,-1.41l-1.84,-0.25l-1.11,0.3l-4.26,-0.97l-0.7,-1.14l-1.59,-0.13l1.18,-1.65l2.74,0.13l2.87,1.13l0.26,0.68ZM685.53,299.17l-2.22,0.04l-2.06,-2.03l-3.15,-2.01l-2.93,-3.51l-3.11,-5.33l-2.2,-2.12l-1.64,-4.06l-2.32,-1.69l-1.27,-2.07l-1.96,-1.5l-2.51,-2.65l-0.11,-0.66l4.81,0.53l2.15,2.38l3.31,2.74l2.35,2.66l2.7,0.17l1.95,1.59l1.54,2.17l1.59,0.95l-0.84,1.71l0.15,0.52l1.44,0.87l0.79,0.1l0.4,1.58l0.87,1.4l1.96,0.39l1.0,1.31l-0.6,3.01l-0.09,3.5Z",
                    name: "Indonesia"
                },
                UA: {
                    path: "M492.5,162.44l1.28,-2.49l1.82,0.19l0.66,-0.23l0.09,-0.71l-0.25,-0.75l-0.79,-0.72l-0.33,-1.21l-0.86,-0.62l-0.02,-1.19l-1.13,-0.86l-1.15,-0.19l-2.04,-1.0l-1.66,0.32l-0.66,0.47l-0.92,-0.0l-0.84,0.78l-2.48,0.7l-1.18,-0.71l-3.07,-0.36l-0.89,0.43l-0.24,-0.55l-1.11,-0.7l0.35,-0.93l1.26,-1.02l-0.54,-1.23l2.04,-2.43l1.4,-0.62l0.25,-1.19l-1.04,-2.39l0.83,-0.13l1.28,-0.84l1.8,-0.07l2.47,0.26l2.86,0.81l1.88,0.06l0.86,0.44l1.04,-0.41l0.77,0.66l2.18,-0.15l0.92,0.3l0.52,-0.34l0.15,-1.53l0.56,-0.54l2.85,-0.05l0.84,-0.72l3.04,-0.18l1.23,1.46l-0.48,0.77l0.21,1.03l0.36,0.32l1.8,0.14l0.93,2.08l3.18,1.15l1.94,-0.45l1.67,1.49l1.4,-0.03l3.35,0.96l0.02,0.54l-0.96,1.59l0.47,1.97l-0.26,0.7l-2.36,0.28l-1.29,0.89l-0.23,1.38l-1.83,0.27l-1.58,0.97l-2.41,0.21l-2.16,1.17l-0.21,0.38l0.34,2.26l1.23,0.75l2.13,-0.08l-0.14,0.31l-2.65,0.53l-3.23,1.69l-0.87,-0.39l0.42,-1.1l-0.25,-0.52l-2.21,-0.73l2.35,-1.06l0.12,-0.65l-0.93,-0.82l-3.62,-0.74l-0.13,-0.89l-0.46,-0.34l-2.61,0.59l-0.91,1.69l-1.71,2.04l-0.86,-0.4l-1.62,0.27Z",
                    name: "Ukraine"
                },
                QA: {
                    path: "M549.33,221.64l-0.76,-0.23l-0.14,-1.64l0.84,-1.29l0.47,0.52l0.04,1.34l-0.45,1.3Z",
                    name: "Qatar"
                },
                MZ: {
                    path: "M508.58,318.75l-0.34,-2.57l0.51,-2.05l3.55,0.63l2.5,-0.38l1.02,-0.76l1.49,0.01l2.74,-0.98l1.66,-1.2l0.5,9.24l0.41,1.23l-0.68,1.67l-0.93,1.71l-1.5,1.5l-5.16,2.28l-2.78,2.73l-1.02,0.53l-1.71,1.8l-0.98,0.57l-0.35,2.41l1.16,1.94l0.49,2.17l0.43,0.31l-0.06,2.06l-0.39,1.17l0.5,0.72l-0.25,0.73l-0.92,0.83l-5.12,2.39l-1.22,1.36l0.21,1.13l0.58,0.39l-0.11,0.72l-1.22,-0.01l-0.73,-2.97l0.42,-3.09l-1.78,-5.37l2.49,-2.81l0.69,-1.89l0.44,-0.43l0.28,-1.53l-0.39,-0.93l0.59,-3.65l-0.01,-3.26l-1.49,-1.16l-1.2,-0.22l-1.74,-1.17l-1.92,0.01l-0.29,-2.08l7.06,-1.96l1.28,1.09l0.89,-0.1l0.67,0.44l0.1,0.73l-0.51,1.29l0.19,1.81l1.75,1.83l0.65,-0.13l0.71,-1.65l1.17,-0.86l-0.26,-3.47l-1.05,-1.85l-1.04,-0.94Z",
                    name: "Mozambique"
                }
            },
            height: 440.7063107441331,
            projection: {
                type: "mill",
                centralMeridian: 11.5
            },
            width: 900
        })
    }).call(this, n(1))
},
function(e, t, n) {
    "use strict";
    n.r(t);
    var i = n(5),
        r = n.n(i),
        a = (n(205), function() {
            return Math.round(100 * Math.random())
        }),
        o = r.a.helpers.color,
        l = (o(window.chartColors.red).alpha(.5).rgbString(), window.chartColors.red, a(), a(), a(), a(), a(), a(), a(), o(window.chartColors.blue).alpha(.5).rgbString(), window.chartColors.blue, a(), a(), a(), a(), a(), a(), a()),
        s = {
            type: "pie",
            data: {
                datasets: [{
                    data: [a(), a(), a(), a(), a()],
                    backgroundColor: [window.chartColors.red, window.chartColors.orange, window.chartColors.yellow, window.chartColors.green, window.chartColors.blue],
                    label: "Dataset 1"
                }],
                labels: ["Red", "Orange", "Yellow", "Green", "Blue"]
            },
            options: {
                responsive: !0
            }
        },
        d = (l = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: "Dataset 1",
                backgroundColor: window.chartColors.red,
                data: [a(), a(), a(), a(), a(), a(), a()]
            }, {
                label: "Dataset 2",
                backgroundColor: window.chartColors.blue,
                data: [a(), a(), a(), a(), a(), a(), a()]
            }, {
                label: "Dataset 3",
                backgroundColor: window.chartColors.green,
                data: [a(), a(), a(), a(), a(), a(), a()]
            }]
        }, {
            type: "radar",
            data: {
                labels: [
                    ["Eating", "Dinner"],
                    ["Drinking", "Water"], "Sleeping", ["Designing", "Graphics"], "Coding", "Cycling", "Running"
                ],
                datasets: [{
                    label: "My First dataset",
                    backgroundColor: o(window.chartColors.red).alpha(.2).rgbString(),
                    borderColor: window.chartColors.red,
                    pointBackgroundColor: window.chartColors.red,
                    data: [a(), a(), a(), a(), a(), a(), a()]
                }, {
                    label: "My Second dataset",
                    backgroundColor: o(window.chartColors.blue).alpha(.2).rgbString(),
                    borderColor: window.chartColors.blue,
                    pointBackgroundColor: window.chartColors.blue,
                    data: [a(), a(), a(), a(), a(), a(), a()]
                }]
            },
            options: {
                legend: {
                    position: "top"
                },
                title: {
                    display: !1,
                    text: "Chart.js Radar Chart"
                },
                scale: {
                    ticks: {
                        beginAtZero: !0
                    }
                }
            }
        }),
        u = {
            type: "doughnut",
            data: {
                datasets: [{
                    data: [a(), a(), a(), a(), a()],
                    backgroundColor: [window.chartColors.red, window.chartColors.orange, window.chartColors.yellow, window.chartColors.green, window.chartColors.blue],
                    label: "Dataset 1"
                }],
                labels: ["Red", "Orange", "Yellow", "Green", "Blue"]
            },
            options: {
                responsive: !0,
                legend: {
                    position: "top"
                },
                title: {
                    display: !1,
                    text: "Chart.js Doughnut Chart"
                },
                animation: {
                    animateScale: !0,
                    animateRotate: !0
                }
            }
        },
        c = {
            type: "doughnut",
            data: {
                datasets: [{
                    data: [a(), a(), a(), a(), a()],
                    backgroundColor: [window.chartColors.red, window.chartColors.orange, window.chartColors.yellow, window.chartColors.green, window.chartColors.blue],
                    label: "Dataset 1"
                }],
                labels: ["Red", "Orange", "Yellow", "Green", "Blue"]
            },
            options: {
                responsive: !0,
                maintainAspectRatio: !1,
                legend: {
                    display: !1
                },
                title: {
                    display: !1,
                    text: "Chart.js Doughnut Chart"
                },
                animation: {
                    animateScale: !0,
                    animateRotate: !0
                }
            }
        },
        h = {
            data: {
                datasets: [{
                    data: [a(), a(), a(), a(), a()],
                    backgroundColor: [o(chartColors.red).alpha(.5).rgbString(), o(chartColors.orange).alpha(.5).rgbString(), o(chartColors.yellow).alpha(.5).rgbString(), o(chartColors.green).alpha(.5).rgbString(), o(chartColors.blue).alpha(.5).rgbString()],
                    label: "My dataset"
                }],
                labels: ["Red", "Orange", "Yellow", "Green", "Blue"]
            },
            options: {
                responsive: !0,
                legend: {
                    position: "right"
                },
                title: {
                    display: !1,
                    text: "Chart.js Polar Area Chart"
                },
                scale: {
                    ticks: {
                        beginAtZero: !0
                    },
                    reverse: !1
                },
                animation: {
                    animateRotate: !1,
                    animateScale: !0
                }
            }
        },
        p = {
            type: "line",
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [{
                    label: "My First dataset",
                    backgroundColor: window.chartColors.red,
                    borderColor: window.chartColors.red,
                    data: [a(), a(), a(), a(), a(), a(), a()],
                    fill: !1
                }, {
                    label: "My Second dataset",
                    fill: !1,
                    backgroundColor: window.chartColors.blue,
                    borderColor: window.chartColors.blue,
                    data: [a(), a(), a(), a(), a(), a(), a()]
                }]
            },
            options: {
                responsive: !0,
                maintainAspectRatio: !1,
                title: {
                    display: !1,
                    text: "Chart.js Line Chart"
                },
                legend: {
                    display: !1
                },
                layout: {
                    padding: {
                        left: 10,
                        right: 10,
                        top: 10,
                        bottom: 0
                    }
                },
                tooltips: {
                    mode: "index",
                    intersect: !1
                },
                hover: {
                    mode: "nearest",
                    intersect: !0
                },
                pointBackgroundColor: "#fff",
                pointBorderColor: window.chartColors.blue,
                pointBorderWidth: "2",
                scales: {
                    xAxes: [{
                        display: !1,
                        scaleLabel: {
                            display: !0,
                            labelString: "Month"
                        }
                    }],
                    yAxes: [{
                        display: !1,
                        scaleLabel: {
                            display: !0,
                            labelString: "Value"
                        }
                    }]
                }
            }
        },
        f = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: "Dataset 1",
                backgroundColor: o(window.chartColors.red).alpha(.5).rgbString(),
                borderColor: window.chartColors.red,
                borderWidth: 1,
                data: [a(), a(), a(), a(), a(), a(), a()]
            }, {
                label: "Dataset 2",
                backgroundColor: o(window.chartColors.blue).alpha(.5).rgbString(),
                borderColor: window.chartColors.blue,
                data: [a(), a(), a(), a(), a(), a(), a()]
            }]
        };
    window.onload = function() {
        if (document.getElementById("canvas")) {
            var e = document.getElementById("canvas").getContext("2d");
            window.myBar = new r.a(e, {
                type: "bar",
                data: l,
                options: {
                    responsive: !0,
                    legend: {
                        position: "top"
                    },
                    title: {
                        display: !1,
                        text: "Chart.js Bar Chart"
                    }
                }
            })
        }
        if (document.getElementById("chart-area")) {
            var t = document.getElementById("chart-area").getContext("2d");
            window.myPie = new r.a(t, s)
        }
        if (document.getElementById("doughnut-chart")) {
            var n = document.getElementById("doughnut-chart").getContext("2d");
            window.myDoughnut = new r.a(n, u)
        }
        if (document.getElementById("doughnut-chart-2")) {
            var i = document.getElementById("doughnut-chart-2").getContext("2d");
            window.myDoughnut = new r.a(i, c)
        }
        if (document.getElementById("doughnut-chart-3")) {
            var a = document.getElementById("doughnut-chart-3").getContext("2d");
            window.myDoughnut = new r.a(a, c)
        }
        if (document.getElementById("radar-chart") && (window.myRadar = new r.a(document.getElementById("radar-chart"), d)), document.getElementById("polar-chart")) {
            var o = document.getElementById("polar-chart");
            window.myPolarArea = r.a.PolarArea(o, h)
        }
        if (document.getElementById("line-chart")) {
            var m = document.getElementById("line-chart").getContext("2d");
            window.myLine = new r.a(m, p)
        }
        if (document.getElementById("chart-horiz-bar")) {
            var g = document.getElementById("chart-horiz-bar").getContext("2d");
            window.myHorizontalBar = new r.a(g, {
                type: "horizontalBar",
                data: f,
                options: {
                    elements: {
                        rectangle: {
                            borderWidth: 2
                        }
                    },
                    responsive: !0,
                    legend: {
                        position: "right"
                    },
                    title: {
                        display: !1,
                        text: "Chart.js Horizontal Bar Chart"
                    }
                }
            })
        }
        if (document.getElementById("stacked-bars-chart")) {
            var _ = document.getElementById("stacked-bars-chart").getContext("2d");
            window.myBar = new r.a(_, {
                type: "bar",
                data: l,
                options: {
                    title: {
                        display: !0,
                        text: "Chart.js Bar Chart - Stacked"
                    },
                    tooltips: {
                        mode: "index",
                        intersect: !1
                    },
                    responsive: !0,
                    scales: {
                        xAxes: [{
                            stacked: !0
                        }],
                        yAxes: [{
                            stacked: !0
                        }]
                    }
                }
            })
        }
    }
},
function(e, t, n) {
    "use strict";
    n(3)._set("global", {
        responsive: !0,
        responsiveAnimationDuration: 0,
        maintainAspectRatio: !0,
        events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
        hover: {
            onHover: null,
            mode: "nearest",
            intersect: !0,
            animationDuration: 400
        },
        onClick: null,
        defaultColor: "rgba(0,0,0,0.1)",
        defaultFontColor: "#666",
        defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        defaultFontSize: 12,
        defaultFontStyle: "normal",
        showLines: !0,
        elements: {},
        layout: {
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        }
    }), e.exports = function() {
        var e = function(e, t) {
            return this.construct(e, t), this
        };
        return e.Chart = e, e
    }
},
function(e, t, n) {
    "use strict";
    var i = n(12),
        r = {
            linear: function(e) {
                return e
            },
            easeInQuad: function(e) {
                return e * e
            },
            easeOutQuad: function(e) {
                return -e * (e - 2)
            },
            easeInOutQuad: function(e) {
                return (e /= .5) < 1 ? .5 * e * e : -.5 * (--e * (e - 2) - 1)
            },
            easeInCubic: function(e) {
                return e * e * e
            },
            easeOutCubic: function(e) {
                return (e -= 1) * e * e + 1
            },
            easeInOutCubic: function(e) {
                return (e /= .5) < 1 ? .5 * e * e * e : .5 * ((e -= 2) * e * e + 2)
            },
            easeInQuart: function(e) {
                return e * e * e * e
            },
            easeOutQuart: function(e) {
                return -((e -= 1) * e * e * e - 1)
            },
            easeInOutQuart: function(e) {
                return (e /= .5) < 1 ? .5 * e * e * e * e : -.5 * ((e -= 2) * e * e * e - 2)
            },
            easeInQuint: function(e) {
                return e * e * e * e * e
            },
            easeOutQuint: function(e) {
                return (e -= 1) * e * e * e * e + 1
            },
            easeInOutQuint: function(e) {
                return (e /= .5) < 1 ? .5 * e * e * e * e * e : .5 * ((e -= 2) * e * e * e * e + 2)
            },
            easeInSine: function(e) {
                return 1 - Math.cos(e * (Math.PI / 2))
            },
            easeOutSine: function(e) {
                return Math.sin(e * (Math.PI / 2))
            },
            easeInOutSine: function(e) {
                return -.5 * (Math.cos(Math.PI * e) - 1)
            },
            easeInExpo: function(e) {
                return 0 === e ? 0 : Math.pow(2, 10 * (e - 1))
            },
            easeOutExpo: function(e) {
                return 1 === e ? 1 : 1 - Math.pow(2, -10 * e)
            },
            easeInOutExpo: function(e) {
                return 0 === e ? 0 : 1 === e ? 1 : (e /= .5) < 1 ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (2 - Math.pow(2, -10 * --e))
            },
            easeInCirc: function(e) {
                return e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1)
            },
            easeOutCirc: function(e) {
                return Math.sqrt(1 - (e -= 1) * e)
            },
            easeInOutCirc: function(e) {
                return (e /= .5) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
            },
            easeInElastic: function(e) {
                var t = 1.70158,
                    n = 0,
                    i = 1;
                return 0 === e ? 0 : 1 === e ? 1 : (n || (n = .3), i < 1 ? (i = 1, t = n / 4) : t = n / (2 * Math.PI) * Math.asin(1 / i), -i * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * (2 * Math.PI) / n))
            },
            easeOutElastic: function(e) {
                var t = 1.70158,
                    n = 0,
                    i = 1;
                return 0 === e ? 0 : 1 === e ? 1 : (n || (n = .3), i < 1 ? (i = 1, t = n / 4) : t = n / (2 * Math.PI) * Math.asin(1 / i), i * Math.pow(2, -10 * e) * Math.sin((e - t) * (2 * Math.PI) / n) + 1)
            },
            easeInOutElastic: function(e) {
                var t = 1.70158,
                    n = 0,
                    i = 1;
                return 0 === e ? 0 : 2 == (e /= .5) ? 1 : (n || (n = .45), i < 1 ? (i = 1, t = n / 4) : t = n / (2 * Math.PI) * Math.asin(1 / i), e < 1 ? i * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * (2 * Math.PI) / n) * -.5 : i * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - t) * (2 * Math.PI) / n) * .5 + 1)
            },
            easeInBack: function(e) {
                var t = 1.70158;
                return e * e * ((t + 1) * e - t)
            },
            easeOutBack: function(e) {
                var t = 1.70158;
                return (e -= 1) * e * ((t + 1) * e + t) + 1
            },
            easeInOutBack: function(e) {
                var t = 1.70158;
                return (e /= .5) < 1 ? e * e * ((1 + (t *= 1.525)) * e - t) * .5 : .5 * ((e -= 2) * e * ((1 + (t *= 1.525)) * e + t) + 2)
            },
            easeInBounce: function(e) {
                return 1 - r.easeOutBounce(1 - e)
            },
            easeOutBounce: function(e) {
                return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
            },
            easeInOutBounce: function(e) {
                return e < .5 ? .5 * r.easeInBounce(2 * e) : .5 * r.easeOutBounce(2 * e - 1) + .5
            }
        };
    e.exports = {
        effects: r
    }, i.easingEffects = r
},
function(e, t, n) {
    "use strict";
    var i = n(12);
    t = e.exports = {
        clear: function(e) {
            e.ctx.clearRect(0, 0, e.width, e.height)
        },
        roundedRect: function(e, t, n, i, r, a) {
            if (a) {
                var o = Math.min(a, r / 2 - 1e-7, i / 2 - 1e-7);
                e.moveTo(t + o, n), e.lineTo(t + i - o, n), e.arcTo(t + i, n, t + i, n + o, o), e.lineTo(t + i, n + r - o), e.arcTo(t + i, n + r, t + i - o, n + r, o), e.lineTo(t + o, n + r), e.arcTo(t, n + r, t, n + r - o, o), e.lineTo(t, n + o), e.arcTo(t, n, t + o, n, o), e.closePath(), e.moveTo(t, n)
            } else e.rect(t, n, i, r)
        },
        drawPoint: function(e, t, n, i, r, a) {
            var o, l, s, d, u, c;
            if (a = a || 0, !t || "object" != typeof t || "[object HTMLImageElement]" !== (o = t.toString()) && "[object HTMLCanvasElement]" !== o) {
                if (!(isNaN(n) || n <= 0)) {
                    switch (e.save(), e.translate(i, r), e.rotate(a * Math.PI / 180), e.beginPath(), t) {
                        default:
                            e.arc(0, 0, n, 0, 2 * Math.PI), e.closePath();
                            break;
                        case "triangle":
                            u = (l = 3 * n / Math.sqrt(3)) * Math.sqrt(3) / 2, e.moveTo(-l / 2, u / 3), e.lineTo(l / 2, u / 3), e.lineTo(0, -2 * u / 3), e.closePath();
                            break;
                        case "rect":
                            c = 1 / Math.SQRT2 * n, e.rect(-c, -c, 2 * c, 2 * c);
                            break;
                        case "rectRounded":
                            var h = n / Math.SQRT2,
                                p = -h,
                                f = -h,
                                m = Math.SQRT2 * n;
                            this.roundedRect(e, p, f, m, m, .425 * n);
                            break;
                        case "rectRot":
                            c = 1 / Math.SQRT2 * n, e.moveTo(-c, 0), e.lineTo(0, c), e.lineTo(c, 0), e.lineTo(0, -c), e.closePath();
                            break;
                        case "cross":
                            e.moveTo(0, n), e.lineTo(0, -n), e.moveTo(-n, 0), e.lineTo(n, 0);
                            break;
                        case "crossRot":
                            s = Math.cos(Math.PI / 4) * n, d = Math.sin(Math.PI / 4) * n, e.moveTo(-s, -d), e.lineTo(s, d), e.moveTo(-s, d), e.lineTo(s, -d);
                            break;
                        case "star":
                            e.moveTo(0, n), e.lineTo(0, -n), e.moveTo(-n, 0), e.lineTo(n, 0), s = Math.cos(Math.PI / 4) * n, d = Math.sin(Math.PI / 4) * n, e.moveTo(-s, -d), e.lineTo(s, d), e.moveTo(-s, d), e.lineTo(s, -d);
                            break;
                        case "line":
                            e.moveTo(-n, 0), e.lineTo(n, 0);
                            break;
                        case "dash":
                            e.moveTo(0, 0), e.lineTo(n, 0)
                    }
                    e.fill(), e.stroke(), e.restore()
                }
            } else e.drawImage(t, i - t.width / 2, r - t.height / 2, t.width, t.height)
        },
        clipArea: function(e, t) {
            e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip()
        },
        unclipArea: function(e) {
            e.restore()
        },
        lineTo: function(e, t, n, i) {
            if (n.steppedLine) return "after" === n.steppedLine && !i || "after" !== n.steppedLine && i ? e.lineTo(t.x, n.y) : e.lineTo(n.x, t.y), void e.lineTo(n.x, n.y);
            n.tension ? e.bezierCurveTo(i ? t.controlPointPreviousX : t.controlPointNextX, i ? t.controlPointPreviousY : t.controlPointNextY, i ? n.controlPointNextX : n.controlPointPreviousX, i ? n.controlPointNextY : n.controlPointPreviousY, n.x, n.y) : e.lineTo(n.x, n.y)
        }
    };
    i.clear = t.clear, i.drawRoundedRectangle = function(e) {
        e.beginPath(), t.roundedRect.apply(t, arguments)
    }
},
function(e, t, n) {
    "use strict";
    var i = n(12);
    e.exports = {
        toLineHeight: function(e, t) {
            var n = ("" + e).match(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/);
            if (!n || "normal" === n[1]) return 1.2 * t;
            switch (e = +n[2], n[3]) {
                case "px":
                    return e;
                case "%":
                    e /= 100
            }
            return t * e
        },
        toPadding: function(e) {
            var t, n, r, a;
            return i.isObject(e) ? (t = +e.top || 0, n = +e.right || 0, r = +e.bottom || 0, a = +e.left || 0) : t = n = r = a = +e || 0, {
                top: t,
                right: n,
                bottom: r,
                left: a,
                height: t + r,
                width: a + n
            }
        },
        resolve: function(e, t, n) {
            var r, a, o;
            for (r = 0, a = e.length; r < a; ++r)
                if (void 0 !== (o = e[r]) && (void 0 !== t && "function" == typeof o && (o = o(t)), void 0 !== n && i.isArray(o) && (o = o[n]), void 0 !== o)) return o
        }
    }
},
function(e, t, n) {
    "use strict";
    var i = n(138),
        r = n(3),
        a = n(2),
        o = n(7);
    e.exports = function() {
        function e(e, t, n) {
            var i;
            return "string" == typeof e ? (i = parseInt(e, 10), -1 !== e.indexOf("%") && (i = i / 100 * t.parentNode[n])) : i = e, i
        }

        function t(e) {
            return null != e && "none" !== e
        }

        function n(n, i, r) {
            var o = document.defaultView,
                l = a._getParentNode(n),
                s = o.getComputedStyle(n)[i],
                d = o.getComputedStyle(l)[i],
                u = t(s),
                c = t(d),
                h = Number.POSITIVE_INFINITY;
            return u || c ? Math.min(u ? e(s, n, r) : h, c ? e(d, l, r) : h) : "none"
        }
        a.configMerge = function() {
            return a.merge(a.clone(arguments[0]), [].slice.call(arguments, 1), {
                merger: function(e, t, n, i) {
                    var r = t[e] || {},
                        l = n[e];
                    "scales" === e ? t[e] = a.scaleMerge(r, l) : "scale" === e ? t[e] = a.merge(r, [o.getScaleDefaults(l.type), l]) : a._merger(e, t, n, i)
                }
            })
        }, a.scaleMerge = function() {
            return a.merge(a.clone(arguments[0]), [].slice.call(arguments, 1), {
                merger: function(e, t, n, i) {
                    if ("xAxes" === e || "yAxes" === e) {
                        var r, l, s, d = n[e].length;
                        for (t[e] || (t[e] = []), r = 0; r < d; ++r) s = n[e][r], l = a.valueOrDefault(s.type, "xAxes" === e ? "category" : "linear"), r >= t[e].length && t[e].push({}), !t[e][r].type || s.type && s.type !== t[e][r].type ? a.merge(t[e][r], [o.getScaleDefaults(l), s]) : a.merge(t[e][r], s)
                    } else a._merger(e, t, n, i)
                }
            })
        }, a.where = function(e, t) {
            if (a.isArray(e) && Array.prototype.filter) return e.filter(t);
            var n = [];
            return a.each(e, function(e) {
                t(e) && n.push(e)
            }), n
        }, a.findIndex = Array.prototype.findIndex ? function(e, t, n) {
            return e.findIndex(t, n)
        } : function(e, t, n) {
            n = void 0 === n ? e : n;
            for (var i = 0, r = e.length; i < r; ++i)
                if (t.call(n, e[i], i, e)) return i;
            return -1
        }, a.findNextWhere = function(e, t, n) {
            a.isNullOrUndef(n) && (n = -1);
            for (var i = n + 1; i < e.length; i++) {
                var r = e[i];
                if (t(r)) return r
            }
        }, a.findPreviousWhere = function(e, t, n) {
            a.isNullOrUndef(n) && (n = e.length);
            for (var i = n - 1; i >= 0; i--) {
                var r = e[i];
                if (t(r)) return r
            }
        }, a.isNumber = function(e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        }, a.almostEquals = function(e, t, n) {
            return Math.abs(e - t) < n
        }, a.almostWhole = function(e, t) {
            var n = Math.round(e);
            return n - t < e && n + t > e
        }, a.max = function(e) {
            return e.reduce(function(e, t) {
                return isNaN(t) ? e : Math.max(e, t)
            }, Number.NEGATIVE_INFINITY)
        }, a.min = function(e) {
            return e.reduce(function(e, t) {
                return isNaN(t) ? e : Math.min(e, t)
            }, Number.POSITIVE_INFINITY)
        }, a.sign = Math.sign ? function(e) {
            return Math.sign(e)
        } : function(e) {
            return 0 === (e = +e) || isNaN(e) ? e : e > 0 ? 1 : -1
        }, a.log10 = Math.log10 ? function(e) {
            return Math.log10(e)
        } : function(e) {
            var t = Math.log(e) * Math.LOG10E,
                n = Math.round(t);
            return e === Math.pow(10, n) ? n : t
        }, a.toRadians = function(e) {
            return e * (Math.PI / 180)
        }, a.toDegrees = function(e) {
            return e * (180 / Math.PI)
        }, a.getAngleFromPoint = function(e, t) {
            var n = t.x - e.x,
                i = t.y - e.y,
                r = Math.sqrt(n * n + i * i),
                a = Math.atan2(i, n);
            return a < -.5 * Math.PI && (a += 2 * Math.PI), {
                angle: a,
                distance: r
            }
        }, a.distanceBetweenPoints = function(e, t) {
            return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2))
        }, a.aliasPixel = function(e) {
            return e % 2 == 0 ? 0 : .5
        }, a.splineCurve = function(e, t, n, i) {
            var r = e.skip ? t : e,
                a = t,
                o = n.skip ? t : n,
                l = Math.sqrt(Math.pow(a.x - r.x, 2) + Math.pow(a.y - r.y, 2)),
                s = Math.sqrt(Math.pow(o.x - a.x, 2) + Math.pow(o.y - a.y, 2)),
                d = l / (l + s),
                u = s / (l + s),
                c = i * (d = isNaN(d) ? 0 : d),
                h = i * (u = isNaN(u) ? 0 : u);
            return {
                previous: {
                    x: a.x - c * (o.x - r.x),
                    y: a.y - c * (o.y - r.y)
                },
                next: {
                    x: a.x + h * (o.x - r.x),
                    y: a.y + h * (o.y - r.y)
                }
            }
        }, a.EPSILON = Number.EPSILON || 1e-14, a.splineCurveMonotone = function(e) {
            var t, n, i, r, o, l, s, d, u, c = (e || []).map(function(e) {
                    return {
                        model: e._model,
                        deltaK: 0,
                        mK: 0
                    }
                }),
                h = c.length;
            for (t = 0; t < h; ++t)
                if (!(i = c[t]).model.skip) {
                    if (n = t > 0 ? c[t - 1] : null, (r = t < h - 1 ? c[t + 1] : null) && !r.model.skip) {
                        var p = r.model.x - i.model.x;
                        i.deltaK = 0 !== p ? (r.model.y - i.model.y) / p : 0
                    }!n || n.model.skip ? i.mK = i.deltaK : !r || r.model.skip ? i.mK = n.deltaK : this.sign(n.deltaK) !== this.sign(i.deltaK) ? i.mK = 0 : i.mK = (n.deltaK + i.deltaK) / 2
                } for (t = 0; t < h - 1; ++t) i = c[t], r = c[t + 1], i.model.skip || r.model.skip || (a.almostEquals(i.deltaK, 0, this.EPSILON) ? i.mK = r.mK = 0 : (o = i.mK / i.deltaK, l = r.mK / i.deltaK, (d = Math.pow(o, 2) + Math.pow(l, 2)) <= 9 || (s = 3 / Math.sqrt(d), i.mK = o * s * i.deltaK, r.mK = l * s * i.deltaK)));
            for (t = 0; t < h; ++t)(i = c[t]).model.skip || (n = t > 0 ? c[t - 1] : null, r = t < h - 1 ? c[t + 1] : null, n && !n.model.skip && (u = (i.model.x - n.model.x) / 3, i.model.controlPointPreviousX = i.model.x - u, i.model.controlPointPreviousY = i.model.y - u * i.mK), r && !r.model.skip && (u = (r.model.x - i.model.x) / 3, i.model.controlPointNextX = i.model.x + u, i.model.controlPointNextY = i.model.y + u * i.mK))
        }, a.nextItem = function(e, t, n) {
            return n ? t >= e.length - 1 ? e[0] : e[t + 1] : t >= e.length - 1 ? e[e.length - 1] : e[t + 1]
        }, a.previousItem = function(e, t, n) {
            return n ? t <= 0 ? e[e.length - 1] : e[t - 1] : t <= 0 ? e[0] : e[t - 1]
        }, a.niceNum = function(e, t) {
            var n = Math.floor(a.log10(e)),
                i = e / Math.pow(10, n);
            return (t ? i < 1.5 ? 1 : i < 3 ? 2 : i < 7 ? 5 : 10 : i <= 1 ? 1 : i <= 2 ? 2 : i <= 5 ? 5 : 10) * Math.pow(10, n)
        }, a.requestAnimFrame = "undefined" == typeof window ? function(e) {
            e()
        } : window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
            return window.setTimeout(e, 1e3 / 60)
        }, a.getRelativePosition = function(e, t) {
            var n, i, r = e.originalEvent || e,
                o = e.target || e.srcElement,
                l = o.getBoundingClientRect(),
                s = r.touches;
            s && s.length > 0 ? (n = s[0].clientX, i = s[0].clientY) : (n = r.clientX, i = r.clientY);
            var d = parseFloat(a.getStyle(o, "padding-left")),
                u = parseFloat(a.getStyle(o, "padding-top")),
                c = parseFloat(a.getStyle(o, "padding-right")),
                h = parseFloat(a.getStyle(o, "padding-bottom")),
                p = l.right - l.left - d - c,
                f = l.bottom - l.top - u - h;
            return {
                x: n = Math.round((n - l.left - d) / p * o.width / t.currentDevicePixelRatio),
                y: i = Math.round((i - l.top - u) / f * o.height / t.currentDevicePixelRatio)
            }
        }, a.getConstraintWidth = function(e) {
            return n(e, "max-width", "clientWidth")
        }, a.getConstraintHeight = function(e) {
            return n(e, "max-height", "clientHeight")
        }, a._calculatePadding = function(e, t, n) {
            return (t = a.getStyle(e, t)).indexOf("%") > -1 ? n / parseInt(t, 10) : parseInt(t, 10)
        }, a._getParentNode = function(e) {
            var t = e.parentNode;
            return t && t.host && (t = t.host), t
        }, a.getMaximumWidth = function(e) {
            var t = a._getParentNode(e);
            if (!t) return e.clientWidth;
            var n = t.clientWidth,
                i = n - a._calculatePadding(t, "padding-left", n) - a._calculatePadding(t, "padding-right", n),
                r = a.getConstraintWidth(e);
            return isNaN(r) ? i : Math.min(i, r)
        }, a.getMaximumHeight = function(e) {
            var t = a._getParentNode(e);
            if (!t) return e.clientHeight;
            var n = t.clientHeight,
                i = n - a._calculatePadding(t, "padding-top", n) - a._calculatePadding(t, "padding-bottom", n),
                r = a.getConstraintHeight(e);
            return isNaN(r) ? i : Math.min(i, r)
        }, a.getStyle = function(e, t) {
            return e.currentStyle ? e.currentStyle[t] : document.defaultView.getComputedStyle(e, null).getPropertyValue(t)
        }, a.retinaScale = function(e, t) {
            var n = e.currentDevicePixelRatio = t || "undefined" != typeof window && window.devicePixelRatio || 1;
            if (1 !== n) {
                var i = e.canvas,
                    r = e.height,
                    a = e.width;
                i.height = r * n, i.width = a * n, e.ctx.scale(n, n), i.style.height || i.style.width || (i.style.height = r + "px", i.style.width = a + "px")
            }
        }, a.fontString = function(e, t, n) {
            return t + " " + e + "px " + n
        }, a.longestText = function(e, t, n, i) {
            var r = (i = i || {}).data = i.data || {},
                o = i.garbageCollect = i.garbageCollect || [];
            i.font !== t && (r = i.data = {}, o = i.garbageCollect = [], i.font = t), e.font = t;
            var l = 0;
            a.each(n, function(t) {
                null != t && !0 !== a.isArray(t) ? l = a.measureText(e, r, o, l, t) : a.isArray(t) && a.each(t, function(t) {
                    null == t || a.isArray(t) || (l = a.measureText(e, r, o, l, t))
                })
            });
            var s = o.length / 2;
            if (s > n.length) {
                for (var d = 0; d < s; d++) delete r[o[d]];
                o.splice(0, s)
            }
            return l
        }, a.measureText = function(e, t, n, i, r) {
            var a = t[r];
            return a || (a = t[r] = e.measureText(r).width, n.push(r)), a > i && (i = a), i
        }, a.numberOfLabelLines = function(e) {
            var t = 1;
            return a.each(e, function(e) {
                a.isArray(e) && e.length > t && (t = e.length)
            }), t
        }, a.color = i ? function(e) {
            return e instanceof CanvasGradient && (e = r.global.defaultColor), i(e)
        } : function(e) {
            return console.error("Color.js not found!"), e
        }, a.getHoverColor = function(e) {
            return e instanceof CanvasPattern ? e : a.color(e).saturate(.5).darken(.1).rgbString()
        }
    }
},
function(e, t, n) {
    var i = n(170),
        r = function() {
            return new d
        };
    for (var a in i) {
        r[a + "Raw"] = function(e) {
            return function(t) {
                return "number" == typeof t && (t = Array.prototype.slice.call(arguments)), i[e](t)
            }
        }(a);
        var o = /(\w+)2(\w+)/.exec(a),
            l = o[1],
            s = o[2];
        (r[l] = r[l] || {})[s] = r[a] = function(e) {
            return function(t) {
                "number" == typeof t && (t = Array.prototype.slice.call(arguments));
                var n = i[e](t);
                if ("string" == typeof n || void 0 === n) return n;
                for (var r = 0; r < n.length; r++) n[r] = Math.round(n[r]);
                return n
            }
        }(a)
    }
    var d = function() {
        this.convs = {}
    };
    d.prototype.routeSpace = function(e, t) {
        var n = t[0];
        return void 0 === n ? this.getValues(e) : ("number" == typeof n && (n = Array.prototype.slice.call(t)), this.setValues(e, n))
    }, d.prototype.setValues = function(e, t) {
        return this.space = e, this.convs = {}, this.convs[e] = t, this
    }, d.prototype.getValues = function(e) {
        var t = this.convs[e];
        if (!t) {
            var n = this.space,
                i = this.convs[n];
            t = r[n][e](i), this.convs[e] = t
        }
        return t
    }, ["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function(e) {
        d.prototype[e] = function(t) {
            return this.routeSpace(e, arguments)
        }
    }), e.exports = r
},
function(e, t) {
    function n(e) {
        var t, n, i = e[0] / 255,
            r = e[1] / 255,
            a = e[2] / 255,
            o = Math.min(i, r, a),
            l = Math.max(i, r, a),
            s = l - o;
        return l == o ? t = 0 : i == l ? t = (r - a) / s : r == l ? t = 2 + (a - i) / s : a == l && (t = 4 + (i - r) / s), (t = Math.min(60 * t, 360)) < 0 && (t += 360), n = (o + l) / 2, [t, 100 * (l == o ? 0 : n <= .5 ? s / (l + o) : s / (2 - l - o)), 100 * n]
    }

    function i(e) {
        var t, n, i = e[0],
            r = e[1],
            a = e[2],
            o = Math.min(i, r, a),
            l = Math.max(i, r, a),
            s = l - o;
        return n = 0 == l ? 0 : s / l * 1e3 / 10, l == o ? t = 0 : i == l ? t = (r - a) / s : r == l ? t = 2 + (a - i) / s : a == l && (t = 4 + (i - r) / s), (t = Math.min(60 * t, 360)) < 0 && (t += 360), [t, n, l / 255 * 1e3 / 10]
    }

    function a(e) {
        var t = e[0],
            i = e[1],
            r = e[2];
        return [n(e)[0], 100 * (1 / 255 * Math.min(t, Math.min(i, r))), 100 * (r = 1 - 1 / 255 * Math.max(t, Math.max(i, r)))]
    }

    function o(e) {
        var t, n = e[0] / 255,
            i = e[1] / 255,
            r = e[2] / 255;
        return [100 * ((1 - n - (t = Math.min(1 - n, 1 - i, 1 - r))) / (1 - t) || 0), 100 * ((1 - i - t) / (1 - t) || 0), 100 * ((1 - r - t) / (1 - t) || 0), 100 * t]
    }

    function l(e) {
        return D[JSON.stringify(e)]
    }

    function s(e) {
        var t = e[0] / 255,
            n = e[1] / 255,
            i = e[2] / 255;
        return [100 * (.4124 * (t = t > .04045 ? Math.pow((t + .055) / 1.055, 2.4) : t / 12.92) + .3576 * (n = n > .04045 ? Math.pow((n + .055) / 1.055, 2.4) : n / 12.92) + .1805 * (i = i > .04045 ? Math.pow((i + .055) / 1.055, 2.4) : i / 12.92)), 100 * (.2126 * t + .7152 * n + .0722 * i), 100 * (.0193 * t + .1192 * n + .9505 * i)]
    }

    function d(e) {
        var t = s(e),
            n = t[0],
            i = t[1],
            r = t[2];
        return i /= 100, r /= 108.883, n = (n /= 95.047) > .008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116, [116 * (i = i > .008856 ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116) - 16, 500 * (n - i), 200 * (i - (r = r > .008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116))]
    }

    function u(e) {
        var t, n, i, r, a, o = e[0] / 360,
            l = e[1] / 100,
            s = e[2] / 100;
        if (0 == l) return [a = 255 * s, a, a];
        t = 2 * s - (n = s < .5 ? s * (1 + l) : s + l - s * l), r = [0, 0, 0];
        for (var d = 0; d < 3; d++)(i = o + 1 / 3 * -(d - 1)) < 0 && i++, i > 1 && i--, a = 6 * i < 1 ? t + 6 * (n - t) * i : 2 * i < 1 ? n : 3 * i < 2 ? t + (n - t) * (2 / 3 - i) * 6 : t, r[d] = 255 * a;
        return r
    }

    function c(e) {
        var t = e[0] / 60,
            n = e[1] / 100,
            i = e[2] / 100,
            r = Math.floor(t) % 6,
            a = t - Math.floor(t),
            o = 255 * i * (1 - n),
            l = 255 * i * (1 - n * a),
            s = 255 * i * (1 - n * (1 - a));
        i *= 255;
        switch (r) {
            case 0:
                return [i, s, o];
            case 1:
                return [l, i, o];
            case 2:
                return [o, i, s];
            case 3:
                return [o, l, i];
            case 4:
                return [s, o, i];
            case 5:
                return [i, o, l]
        }
    }

    function h(e) {
        var t, n, i, a, o = e[0] / 360,
            l = e[1] / 100,
            s = e[2] / 100,
            d = l + s;
        switch (d > 1 && (l /= d, s /= d), i = 6 * o - (t = Math.floor(6 * o)), 0 != (1 & t) && (i = 1 - i), a = l + i * ((n = 1 - s) - l), t) {
            default:
            case 6:
            case 0:
                r = n, g = a, b = l;
                break;
            case 1:
                r = a, g = n, b = l;
                break;
            case 2:
                r = l, g = n, b = a;
                break;
            case 3:
                r = l, g = a, b = n;
                break;
            case 4:
                r = a, g = l, b = n;
                break;
            case 5:
                r = n, g = l, b = a
        }
        return [255 * r, 255 * g, 255 * b]
    }

    function p(e) {
        var t = e[0] / 100,
            n = e[1] / 100,
            i = e[2] / 100,
            r = e[3] / 100;
        return [255 * (1 - Math.min(1, t * (1 - r) + r)), 255 * (1 - Math.min(1, n * (1 - r) + r)), 255 * (1 - Math.min(1, i * (1 - r) + r))]
    }

    function f(e) {
        var t, n, i, r = e[0] / 100,
            a = e[1] / 100,
            o = e[2] / 100;
        return n = -.9689 * r + 1.8758 * a + .0415 * o, i = .0557 * r + -.204 * a + 1.057 * o, t = (t = 3.2406 * r + -1.5372 * a + -.4986 * o) > .0031308 ? 1.055 * Math.pow(t, 1 / 2.4) - .055 : t *= 12.92, n = n > .0031308 ? 1.055 * Math.pow(n, 1 / 2.4) - .055 : n *= 12.92, i = i > .0031308 ? 1.055 * Math.pow(i, 1 / 2.4) - .055 : i *= 12.92, [255 * (t = Math.min(Math.max(0, t), 1)), 255 * (n = Math.min(Math.max(0, n), 1)), 255 * (i = Math.min(Math.max(0, i), 1))]
    }

    function m(e) {
        var t = e[0],
            n = e[1],
            i = e[2];
        return n /= 100, i /= 108.883, t = (t /= 95.047) > .008856 ? Math.pow(t, 1 / 3) : 7.787 * t + 16 / 116, [116 * (n = n > .008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116) - 16, 500 * (t - n), 200 * (n - (i = i > .008856 ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116))]
    }

    function _(e) {
        var t, n, i, r, a = e[0],
            o = e[1],
            l = e[2];
        return a <= 8 ? r = (n = 100 * a / 903.3) / 100 * 7.787 + 16 / 116 : (n = 100 * Math.pow((a + 16) / 116, 3), r = Math.pow(n / 100, 1 / 3)), [t = t / 95.047 <= .008856 ? t = 95.047 * (o / 500 + r - 16 / 116) / 7.787 : 95.047 * Math.pow(o / 500 + r, 3), n, i = i / 108.883 <= .008859 ? i = 108.883 * (r - l / 200 - 16 / 116) / 7.787 : 108.883 * Math.pow(r - l / 200, 3)]
    }

    function y(e) {
        var t, n = e[0],
            i = e[1],
            r = e[2];
        return (t = 360 * Math.atan2(r, i) / 2 / Math.PI) < 0 && (t += 360), [n, Math.sqrt(i * i + r * r), t]
    }

    function v(e) {
        return f(_(e))
    }

    function M(e) {
        var t, n = e[0],
            i = e[1];
        return t = e[2] / 360 * 2 * Math.PI, [n, i * Math.cos(t), i * Math.sin(t)]
    }

    function w(e) {
        return L[e]
    }
    e.exports = {
        rgb2hsl: n,
        rgb2hsv: i,
        rgb2hwb: a,
        rgb2cmyk: o,
        rgb2keyword: l,
        rgb2xyz: s,
        rgb2lab: d,
        rgb2lch: function(e) {
            return y(d(e))
        },
        hsl2rgb: u,
        hsl2hsv: function(e) {
            var t = e[0],
                n = e[1] / 100,
                i = e[2] / 100;
            if (0 === i) return [0, 0, 0];
            return [t, 100 * (2 * (n *= (i *= 2) <= 1 ? i : 2 - i) / (i + n)), 100 * ((i + n) / 2)]
        },
        hsl2hwb: function(e) {
            return a(u(e))
        },
        hsl2cmyk: function(e) {
            return o(u(e))
        },
        hsl2keyword: function(e) {
            return l(u(e))
        },
        hsv2rgb: c,
        hsv2hsl: function(e) {
            var t, n, i = e[0],
                r = e[1] / 100,
                a = e[2] / 100;
            return t = r * a, [i, 100 * (t = (t /= (n = (2 - r) * a) <= 1 ? n : 2 - n) || 0), 100 * (n /= 2)]
        },
        hsv2hwb: function(e) {
            return a(c(e))
        },
        hsv2cmyk: function(e) {
            return o(c(e))
        },
        hsv2keyword: function(e) {
            return l(c(e))
        },
        hwb2rgb: h,
        hwb2hsl: function(e) {
            return n(h(e))
        },
        hwb2hsv: function(e) {
            return i(h(e))
        },
        hwb2cmyk: function(e) {
            return o(h(e))
        },
        hwb2keyword: function(e) {
            return l(h(e))
        },
        cmyk2rgb: p,
        cmyk2hsl: function(e) {
            return n(p(e))
        },
        cmyk2hsv: function(e) {
            return i(p(e))
        },
        cmyk2hwb: function(e) {
            return a(p(e))
        },
        cmyk2keyword: function(e) {
            return l(p(e))
        },
        keyword2rgb: w,
        keyword2hsl: function(e) {
            return n(w(e))
        },
        keyword2hsv: function(e) {
            return i(w(e))
        },
        keyword2hwb: function(e) {
            return a(w(e))
        },
        keyword2cmyk: function(e) {
            return o(w(e))
        },
        keyword2lab: function(e) {
            return d(w(e))
        },
        keyword2xyz: function(e) {
            return s(w(e))
        },
        xyz2rgb: f,
        xyz2lab: m,
        xyz2lch: function(e) {
            return y(m(e))
        },
        lab2xyz: _,
        lab2rgb: v,
        lab2lch: y,
        lch2lab: M,
        lch2xyz: function(e) {
            return _(M(e))
        },
        lch2rgb: function(e) {
            return v(M(e))
        }
    };
    var L = {
            aliceblue: [240, 248, 255],
            antiquewhite: [250, 235, 215],
            aqua: [0, 255, 255],
            aquamarine: [127, 255, 212],
            azure: [240, 255, 255],
            beige: [245, 245, 220],
            bisque: [255, 228, 196],
            black: [0, 0, 0],
            blanchedalmond: [255, 235, 205],
            blue: [0, 0, 255],
            blueviolet: [138, 43, 226],
            brown: [165, 42, 42],
            burlywood: [222, 184, 135],
            cadetblue: [95, 158, 160],
            chartreuse: [127, 255, 0],
            chocolate: [210, 105, 30],
            coral: [255, 127, 80],
            cornflowerblue: [100, 149, 237],
            cornsilk: [255, 248, 220],
            crimson: [220, 20, 60],
            cyan: [0, 255, 255],
            darkblue: [0, 0, 139],
            darkcyan: [0, 139, 139],
            darkgoldenrod: [184, 134, 11],
            darkgray: [169, 169, 169],
            darkgreen: [0, 100, 0],
            darkgrey: [169, 169, 169],
            darkkhaki: [189, 183, 107],
            darkmagenta: [139, 0, 139],
            darkolivegreen: [85, 107, 47],
            darkorange: [255, 140, 0],
            darkorchid: [153, 50, 204],
            darkred: [139, 0, 0],
            darksalmon: [233, 150, 122],
            darkseagreen: [143, 188, 143],
            darkslateblue: [72, 61, 139],
            darkslategray: [47, 79, 79],
            darkslategrey: [47, 79, 79],
            darkturquoise: [0, 206, 209],
            darkviolet: [148, 0, 211],
            deeppink: [255, 20, 147],
            deepskyblue: [0, 191, 255],
            dimgray: [105, 105, 105],
            dimgrey: [105, 105, 105],
            dodgerblue: [30, 144, 255],
            firebrick: [178, 34, 34],
            floralwhite: [255, 250, 240],
            forestgreen: [34, 139, 34],
            fuchsia: [255, 0, 255],
            gainsboro: [220, 220, 220],
            ghostwhite: [248, 248, 255],
            gold: [255, 215, 0],
            goldenrod: [218, 165, 32],
            gray: [128, 128, 128],
            green: [0, 128, 0],
            greenyellow: [173, 255, 47],
            grey: [128, 128, 128],
            honeydew: [240, 255, 240],
            hotpink: [255, 105, 180],
            indianred: [205, 92, 92],
            indigo: [75, 0, 130],
            ivory: [255, 255, 240],
            khaki: [240, 230, 140],
            lavender: [230, 230, 250],
            lavenderblush: [255, 240, 245],
            lawngreen: [124, 252, 0],
            lemonchiffon: [255, 250, 205],
            lightblue: [173, 216, 230],
            lightcoral: [240, 128, 128],
            lightcyan: [224, 255, 255],
            lightgoldenrodyellow: [250, 250, 210],
            lightgray: [211, 211, 211],
            lightgreen: [144, 238, 144],
            lightgrey: [211, 211, 211],
            lightpink: [255, 182, 193],
            lightsalmon: [255, 160, 122],
            lightseagreen: [32, 178, 170],
            lightskyblue: [135, 206, 250],
            lightslategray: [119, 136, 153],
            lightslategrey: [119, 136, 153],
            lightsteelblue: [176, 196, 222],
            lightyellow: [255, 255, 224],
            lime: [0, 255, 0],
            limegreen: [50, 205, 50],
            linen: [250, 240, 230],
            magenta: [255, 0, 255],
            maroon: [128, 0, 0],
            mediumaquamarine: [102, 205, 170],
            mediumblue: [0, 0, 205],
            mediumorchid: [186, 85, 211],
            mediumpurple: [147, 112, 219],
            mediumseagreen: [60, 179, 113],
            mediumslateblue: [123, 104, 238],
            mediumspringgreen: [0, 250, 154],
            mediumturquoise: [72, 209, 204],
            mediumvioletred: [199, 21, 133],
            midnightblue: [25, 25, 112],
            mintcream: [245, 255, 250],
            mistyrose: [255, 228, 225],
            moccasin: [255, 228, 181],
            navajowhite: [255, 222, 173],
            navy: [0, 0, 128],
            oldlace: [253, 245, 230],
            olive: [128, 128, 0],
            olivedrab: [107, 142, 35],
            orange: [255, 165, 0],
            orangered: [255, 69, 0],
            orchid: [218, 112, 214],
            palegoldenrod: [238, 232, 170],
            palegreen: [152, 251, 152],
            paleturquoise: [175, 238, 238],
            palevioletred: [219, 112, 147],
            papayawhip: [255, 239, 213],
            peachpuff: [255, 218, 185],
            peru: [205, 133, 63],
            pink: [255, 192, 203],
            plum: [221, 160, 221],
            powderblue: [176, 224, 230],
            purple: [128, 0, 128],
            rebeccapurple: [102, 51, 153],
            red: [255, 0, 0],
            rosybrown: [188, 143, 143],
            royalblue: [65, 105, 225],
            saddlebrown: [139, 69, 19],
            salmon: [250, 128, 114],
            sandybrown: [244, 164, 96],
            seagreen: [46, 139, 87],
            seashell: [255, 245, 238],
            sienna: [160, 82, 45],
            silver: [192, 192, 192],
            skyblue: [135, 206, 235],
            slateblue: [106, 90, 205],
            slategray: [112, 128, 144],
            slategrey: [112, 128, 144],
            snow: [255, 250, 250],
            springgreen: [0, 255, 127],
            steelblue: [70, 130, 180],
            tan: [210, 180, 140],
            teal: [0, 128, 128],
            thistle: [216, 191, 216],
            tomato: [255, 99, 71],
            turquoise: [64, 224, 208],
            violet: [238, 130, 238],
            wheat: [245, 222, 179],
            white: [255, 255, 255],
            whitesmoke: [245, 245, 245],
            yellow: [255, 255, 0],
            yellowgreen: [154, 205, 50]
        },
        D = {};
    for (var T in L) D[JSON.stringify(L[T])] = T
},
function(e, t, n) {
    var i = n(172);

    function r(e) {
        if (e) {
            var t = [0, 0, 0],
                n = 1,
                r = e.match(/^#([a-fA-F0-9]{3})$/i);
            if (r) {
                r = r[1];
                for (var a = 0; a < t.length; a++) t[a] = parseInt(r[a] + r[a], 16)
            } else if (r = e.match(/^#([a-fA-F0-9]{6})$/i)) {
                r = r[1];
                for (a = 0; a < t.length; a++) t[a] = parseInt(r.slice(2 * a, 2 * a + 2), 16)
            } else if (r = e.match(/^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i)) {
                for (a = 0; a < t.length; a++) t[a] = parseInt(r[a + 1]);
                n = parseFloat(r[4])
            } else if (r = e.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i)) {
                for (a = 0; a < t.length; a++) t[a] = Math.round(2.55 * parseFloat(r[a + 1]));
                n = parseFloat(r[4])
            } else if (r = e.match(/(\w+)/)) {
                if ("transparent" == r[1]) return [0, 0, 0, 0];
                if (!(t = i[r[1]])) return
            }
            for (a = 0; a < t.length; a++) t[a] = u(t[a], 0, 255);
            return n = n || 0 == n ? u(n, 0, 1) : 1, t[3] = n, t
        }
    }

    function a(e) {
        if (e) {
            var t = e.match(/^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/);
            if (t) {
                var n = parseFloat(t[4]);
                return [u(parseInt(t[1]), 0, 360), u(parseFloat(t[2]), 0, 100), u(parseFloat(t[3]), 0, 100), u(isNaN(n) ? 1 : n, 0, 1)]
            }
        }
    }

    function o(e) {
        if (e) {
            var t = e.match(/^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/);
            if (t) {
                var n = parseFloat(t[4]);
                return [u(parseInt(t[1]), 0, 360), u(parseFloat(t[2]), 0, 100), u(parseFloat(t[3]), 0, 100), u(isNaN(n) ? 1 : n, 0, 1)]
            }
        }
    }

    function l(e, t) {
        return void 0 === t && (t = void 0 !== e[3] ? e[3] : 1), "rgba(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + t + ")"
    }

    function s(e, t) {
        return "rgba(" + Math.round(e[0] / 255 * 100) + "%, " + Math.round(e[1] / 255 * 100) + "%, " + Math.round(e[2] / 255 * 100) + "%, " + (t || e[3] || 1) + ")"
    }

    function d(e, t) {
        return void 0 === t && (t = void 0 !== e[3] ? e[3] : 1), "hsla(" + e[0] + ", " + e[1] + "%, " + e[2] + "%, " + t + ")"
    }

    function u(e, t, n) {
        return Math.min(Math.max(t, e), n)
    }

    function c(e) {
        var t = e.toString(16).toUpperCase();
        return t.length < 2 ? "0" + t : t
    }
    e.exports = {
        getRgba: r,
        getHsla: a,
        getRgb: function(e) {
            var t = r(e);
            return t && t.slice(0, 3)
        },
        getHsl: function(e) {
            var t = a(e);
            return t && t.slice(0, 3)
        },
        getHwb: o,
        getAlpha: function(e) {
            var t = r(e);
            if (t) return t[3];
            if (t = a(e)) return t[3];
            if (t = o(e)) return t[3]
        },
        hexString: function(e) {
            return "#" + c(e[0]) + c(e[1]) + c(e[2])
        },
        rgbString: function(e, t) {
            if (t < 1 || e[3] && e[3] < 1) return l(e, t);
            return "rgb(" + e[0] + ", " + e[1] + ", " + e[2] + ")"
        },
        rgbaString: l,
        percentString: function(e, t) {
            if (t < 1 || e[3] && e[3] < 1) return s(e, t);
            var n = Math.round(e[0] / 255 * 100),
                i = Math.round(e[1] / 255 * 100),
                r = Math.round(e[2] / 255 * 100);
            return "rgb(" + n + "%, " + i + "%, " + r + "%)"
        },
        percentaString: s,
        hslString: function(e, t) {
            if (t < 1 || e[3] && e[3] < 1) return d(e, t);
            return "hsl(" + e[0] + ", " + e[1] + "%, " + e[2] + "%)"
        },
        hslaString: d,
        hwbString: function(e, t) {
            void 0 === t && (t = void 0 !== e[3] ? e[3] : 1);
            return "hwb(" + e[0] + ", " + e[1] + "%, " + e[2] + "%" + (void 0 !== t && 1 !== t ? ", " + t : "") + ")"
        },
        keyword: function(e) {
            return h[e.slice(0, 3)]
        }
    };
    var h = {};
    for (var p in i) h[i[p]] = p
},
function(e, t, n) {
    "use strict";
    e.exports = {
        aliceblue: [240, 248, 255],
        antiquewhite: [250, 235, 215],
        aqua: [0, 255, 255],
        aquamarine: [127, 255, 212],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        bisque: [255, 228, 196],
        black: [0, 0, 0],
        blanchedalmond: [255, 235, 205],
        blue: [0, 0, 255],
        blueviolet: [138, 43, 226],
        brown: [165, 42, 42],
        burlywood: [222, 184, 135],
        cadetblue: [95, 158, 160],
        chartreuse: [127, 255, 0],
        chocolate: [210, 105, 30],
        coral: [255, 127, 80],
        cornflowerblue: [100, 149, 237],
        cornsilk: [255, 248, 220],
        crimson: [220, 20, 60],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgoldenrod: [184, 134, 11],
        darkgray: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkgrey: [169, 169, 169],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkseagreen: [143, 188, 143],
        darkslateblue: [72, 61, 139],
        darkslategray: [47, 79, 79],
        darkslategrey: [47, 79, 79],
        darkturquoise: [0, 206, 209],
        darkviolet: [148, 0, 211],
        deeppink: [255, 20, 147],
        deepskyblue: [0, 191, 255],
        dimgray: [105, 105, 105],
        dimgrey: [105, 105, 105],
        dodgerblue: [30, 144, 255],
        firebrick: [178, 34, 34],
        floralwhite: [255, 250, 240],
        forestgreen: [34, 139, 34],
        fuchsia: [255, 0, 255],
        gainsboro: [220, 220, 220],
        ghostwhite: [248, 248, 255],
        gold: [255, 215, 0],
        goldenrod: [218, 165, 32],
        gray: [128, 128, 128],
        green: [0, 128, 0],
        greenyellow: [173, 255, 47],
        grey: [128, 128, 128],
        honeydew: [240, 255, 240],
        hotpink: [255, 105, 180],
        indianred: [205, 92, 92],
        indigo: [75, 0, 130],
        ivory: [255, 255, 240],
        khaki: [240, 230, 140],
        lavender: [230, 230, 250],
        lavenderblush: [255, 240, 245],
        lawngreen: [124, 252, 0],
        lemonchiffon: [255, 250, 205],
        lightblue: [173, 216, 230],
        lightcoral: [240, 128, 128],
        lightcyan: [224, 255, 255],
        lightgoldenrodyellow: [250, 250, 210],
        lightgray: [211, 211, 211],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightsalmon: [255, 160, 122],
        lightseagreen: [32, 178, 170],
        lightskyblue: [135, 206, 250],
        lightslategray: [119, 136, 153],
        lightslategrey: [119, 136, 153],
        lightsteelblue: [176, 196, 222],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        limegreen: [50, 205, 50],
        linen: [250, 240, 230],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        mediumaquamarine: [102, 205, 170],
        mediumblue: [0, 0, 205],
        mediumorchid: [186, 85, 211],
        mediumpurple: [147, 112, 219],
        mediumseagreen: [60, 179, 113],
        mediumslateblue: [123, 104, 238],
        mediumspringgreen: [0, 250, 154],
        mediumturquoise: [72, 209, 204],
        mediumvioletred: [199, 21, 133],
        midnightblue: [25, 25, 112],
        mintcream: [245, 255, 250],
        mistyrose: [255, 228, 225],
        moccasin: [255, 228, 181],
        navajowhite: [255, 222, 173],
        navy: [0, 0, 128],
        oldlace: [253, 245, 230],
        olive: [128, 128, 0],
        olivedrab: [107, 142, 35],
        orange: [255, 165, 0],
        orangered: [255, 69, 0],
        orchid: [218, 112, 214],
        palegoldenrod: [238, 232, 170],
        palegreen: [152, 251, 152],
        paleturquoise: [175, 238, 238],
        palevioletred: [219, 112, 147],
        papayawhip: [255, 239, 213],
        peachpuff: [255, 218, 185],
        peru: [205, 133, 63],
        pink: [255, 192, 203],
        plum: [221, 160, 221],
        powderblue: [176, 224, 230],
        purple: [128, 0, 128],
        rebeccapurple: [102, 51, 153],
        red: [255, 0, 0],
        rosybrown: [188, 143, 143],
        royalblue: [65, 105, 225],
        saddlebrown: [139, 69, 19],
        salmon: [250, 128, 114],
        sandybrown: [244, 164, 96],
        seagreen: [46, 139, 87],
        seashell: [255, 245, 238],
        sienna: [160, 82, 45],
        silver: [192, 192, 192],
        skyblue: [135, 206, 235],
        slateblue: [106, 90, 205],
        slategray: [112, 128, 144],
        slategrey: [112, 128, 144],
        snow: [255, 250, 250],
        springgreen: [0, 255, 127],
        steelblue: [70, 130, 180],
        tan: [210, 180, 140],
        teal: [0, 128, 128],
        thistle: [216, 191, 216],
        tomato: [255, 99, 71],
        turquoise: [64, 224, 208],
        violet: [238, 130, 238],
        wheat: [245, 222, 179],
        white: [255, 255, 255],
        whitesmoke: [245, 245, 245],
        yellow: [255, 255, 0],
        yellowgreen: [154, 205, 50]
    }
},
function(e, t, n) {
    "use strict";
    var i = n(3),
        r = n(6),
        a = n(2);
    i._set("global", {
        elements: {
            arc: {
                backgroundColor: i.global.defaultColor,
                borderColor: "#fff",
                borderWidth: 2
            }
        }
    }), e.exports = r.extend({
        inLabelRange: function(e) {
            var t = this._view;
            return !!t && Math.pow(e - t.x, 2) < Math.pow(t.radius + t.hoverRadius, 2)
        },
        inRange: function(e, t) {
            var n = this._view;
            if (n) {
                for (var i = a.getAngleFromPoint(n, {
                        x: e,
                        y: t
                    }), r = i.angle, o = i.distance, l = n.startAngle, s = n.endAngle; s < l;) s += 2 * Math.PI;
                for (; r > s;) r -= 2 * Math.PI;
                for (; r < l;) r += 2 * Math.PI;
                var d = r >= l && r <= s,
                    u = o >= n.innerRadius && o <= n.outerRadius;
                return d && u
            }
            return !1
        },
        getCenterPoint: function() {
            var e = this._view,
                t = (e.startAngle + e.endAngle) / 2,
                n = (e.innerRadius + e.outerRadius) / 2;
            return {
                x: e.x + Math.cos(t) * n,
                y: e.y + Math.sin(t) * n
            }
        },
        getArea: function() {
            var e = this._view;
            return Math.PI * ((e.endAngle - e.startAngle) / (2 * Math.PI)) * (Math.pow(e.outerRadius, 2) - Math.pow(e.innerRadius, 2))
        },
        tooltipPosition: function() {
            var e = this._view,
                t = e.startAngle + (e.endAngle - e.startAngle) / 2,
                n = (e.outerRadius - e.innerRadius) / 2 + e.innerRadius;
            return {
                x: e.x + Math.cos(t) * n,
                y: e.y + Math.sin(t) * n
            }
        },
        draw: function() {
            var e = this._chart.ctx,
                t = this._view,
                n = t.startAngle,
                i = t.endAngle;
            e.beginPath(), e.arc(t.x, t.y, t.outerRadius, n, i), e.arc(t.x, t.y, t.innerRadius, i, n, !0), e.closePath(), e.strokeStyle = t.borderColor, e.lineWidth = t.borderWidth, e.fillStyle = t.backgroundColor, e.fill(), e.lineJoin = "bevel", t.borderWidth && e.stroke()
        }
    })
},
function(e, t, n) {
    "use strict";
    var i = n(3),
        r = n(6),
        a = n(2),
        o = i.global;
    i._set("global", {
        elements: {
            line: {
                tension: .4,
                backgroundColor: o.defaultColor,
                borderWidth: 3,
                borderColor: o.defaultColor,
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0,
                borderJoinStyle: "miter",
                capBezierPoints: !0,
                fill: !0
            }
        }
    }), e.exports = r.extend({
        draw: function() {
            var e, t, n, i, r = this._view,
                l = this._chart.ctx,
                s = r.spanGaps,
                d = this._children.slice(),
                u = o.elements.line,
                c = -1;
            for (this._loop && d.length && d.push(d[0]), l.save(), l.lineCap = r.borderCapStyle || u.borderCapStyle, l.setLineDash && l.setLineDash(r.borderDash || u.borderDash), l.lineDashOffset = r.borderDashOffset || u.borderDashOffset, l.lineJoin = r.borderJoinStyle || u.borderJoinStyle, l.lineWidth = r.borderWidth || u.borderWidth, l.strokeStyle = r.borderColor || o.defaultColor, l.beginPath(), c = -1, e = 0; e < d.length; ++e) t = d[e], n = a.previousItem(d, e), i = t._view, 0 === e ? i.skip || (l.moveTo(i.x, i.y), c = e) : (n = -1 === c ? n : d[c], i.skip || (c !== e - 1 && !s || -1 === c ? l.moveTo(i.x, i.y) : a.canvas.lineTo(l, n._view, t._view), c = e));
            l.stroke(), l.restore()
        }
    })
},
function(e, t, n) {
    "use strict";
    var i = n(3),
        r = n(6),
        a = n(2),
        o = i.global.defaultColor;

    function l(e) {
        var t = this._view;
        return !!t && Math.abs(e - t.x) < t.radius + t.hitRadius
    }
    i._set("global", {
        elements: {
            point: {
                radius: 3,
                pointStyle: "circle",
                backgroundColor: o,
                borderColor: o,
                borderWidth: 1,
                hitRadius: 1,
                hoverRadius: 4,
                hoverBorderWidth: 1
            }
        }
    }), e.exports = r.extend({
        inRange: function(e, t) {
            var n = this._view;
            return !!n && Math.pow(e - n.x, 2) + Math.pow(t - n.y, 2) < Math.pow(n.hitRadius + n.radius, 2)
        },
        inLabelRange: l,
        inXRange: l,
        inYRange: function(e) {
            var t = this._view;
            return !!t && Math.abs(e - t.y) < t.radius + t.hitRadius
        },
        getCenterPoint: function() {
            var e = this._view;
            return {
                x: e.x,
                y: e.y
            }
        },
        getArea: function() {
            return Math.PI * Math.pow(this._view.radius, 2)
        },
        tooltipPosition: function() {
            var e = this._view;
            return {
                x: e.x,
                y: e.y,
                padding: e.radius + e.borderWidth
            }
        },
        draw: function(e) {
            var t = this._view,
                n = this._model,
                r = this._chart.ctx,
                l = t.pointStyle,
                s = t.rotation,
                d = t.radius,
                u = t.x,
                c = t.y;
            t.skip || (void 0 === e || n.x >= e.left && 1.01 * e.right >= n.x && n.y >= e.top && 1.01 * e.bottom >= n.y) && (r.strokeStyle = t.borderColor || o, r.lineWidth = a.valueOrDefault(t.borderWidth, i.global.elements.point.borderWidth), r.fillStyle = t.backgroundColor || o, a.canvas.drawPoint(r, l, d, u, c, s))
        }
    })
},
function(e, t, n) {
    "use strict";
    var i = n(3),
        r = n(6);

    function a(e) {
        return void 0 !== e._view.width
    }

    function o(e) {
        var t, n, i, r, o = e._view;
        if (a(e)) {
            var l = o.width / 2;
            t = o.x - l, n = o.x + l, i = Math.min(o.y, o.base), r = Math.max(o.y, o.base)
        } else {
            var s = o.height / 2;
            t = Math.min(o.x, o.base), n = Math.max(o.x, o.base), i = o.y - s, r = o.y + s
        }
        return {
            left: t,
            top: i,
            right: n,
            bottom: r
        }
    }
    i._set("global", {
        elements: {
            rectangle: {
                backgroundColor: i.global.defaultColor,
                borderColor: i.global.defaultColor,
                borderSkipped: "bottom",
                borderWidth: 0
            }
        }
    }), e.exports = r.extend({
        draw: function() {
            var e, t, n, i, r, a, o, l = this._chart.ctx,
                s = this._view,
                d = s.borderWidth;
            if (s.horizontal ? (e = s.base, t = s.x, n = s.y - s.height / 2, i = s.y + s.height / 2, r = t > e ? 1 : -1, a = 1, o = s.borderSkipped || "left") : (e = s.x - s.width / 2, t = s.x + s.width / 2, n = s.y, r = 1, a = (i = s.base) > n ? 1 : -1, o = s.borderSkipped || "bottom"), d) {
                var u = Math.min(Math.abs(e - t), Math.abs(n - i)),
                    c = (d = d > u ? u : d) / 2,
                    h = e + ("left" !== o ? c * r : 0),
                    p = t + ("right" !== o ? -c * r : 0),
                    f = n + ("top" !== o ? c * a : 0),
                    m = i + ("bottom" !== o ? -c * a : 0);
                h !== p && (n = f, i = m), f !== m && (e = h, t = p)
            }
            l.beginPath(), l.fillStyle = s.backgroundColor, l.strokeStyle = s.borderColor, l.lineWidth = d;
            var g = [
                    [e, i],
                    [e, n],
                    [t, n],
                    [t, i]
                ],
                _ = ["bottom", "left", "top", "right"].indexOf(o, 0);

            function y(e) {
                return g[(_ + e) % 4]
            } - 1 === _ && (_ = 0);
            var v = y(0);
            l.moveTo(v[0], v[1]);
            for (var M = 1; M < 4; M++) v = y(M), l.lineTo(v[0], v[1]);
            l.fill(), d && l.stroke()
        },
        height: function() {
            var e = this._view;
            return e.base - e.y
        },
        inRange: function(e, t) {
            var n = !1;
            if (this._view) {
                var i = o(this);
                n = e >= i.left && e <= i.right && t >= i.top && t <= i.bottom
            }
            return n
        },
        inLabelRange: function(e, t) {
            if (!this._view) return !1;
            var n = o(this);
            return a(this) ? e >= n.left && e <= n.right : t >= n.top && t <= n.bottom
        },
        inXRange: function(e) {
            var t = o(this);
            return e >= t.left && e <= t.right
        },
        inYRange: function(e) {
            var t = o(this);
            return e >= t.top && e <= t.bottom
        },
        getCenterPoint: function() {
            var e, t, n = this._view;
            return a(this) ? (e = n.x, t = (n.y + n.base) / 2) : (e = (n.x + n.base) / 2, t = n.y), {
                x: e,
                y: t
            }
        },
        getArea: function() {
            var e = this._view;
            return e.width * Math.abs(e.y - e.base)
        },
        tooltipPosition: function() {
            var e = this._view;
            return {
                x: e.x,
                y: e.y
            }
        }
    })
},
function(e, t) {
    e.exports = {
        acquireContext: function(e) {
            return e && e.canvas && (e = e.canvas), e && e.getContext("2d") || null
        }
    }
},
function(e, t, n) {
    "use strict";
    var i = n(2),
        r = "$chartjs",
        a = "chartjs-",
        o = a + "render-monitor",
        l = a + "render-animation",
        s = ["animationstart", "webkitAnimationStart"],
        d = {
            touchstart: "mousedown",
            touchmove: "mousemove",
            touchend: "mouseup",
            pointerenter: "mouseenter",
            pointerdown: "mousedown",
            pointermove: "mousemove",
            pointerup: "mouseup",
            pointerleave: "mouseout",
            pointerout: "mouseout"
        };

    function u(e, t) {
        var n = i.getStyle(e, t),
            r = n && n.match(/^(\d+)(\.\d+)?px$/);
        return r ? Number(r[1]) : void 0
    }
    var c = !! function() {
        var e = !1;
        try {
            var t = Object.defineProperty({}, "passive", {
                get: function() {
                    e = !0
                }
            });
            window.addEventListener("e", null, t)
        } catch (e) {}
        return e
    }() && {
        passive: !0
    };

    function h(e, t, n) {
        e.addEventListener(t, n, c)
    }

    function p(e, t, n) {
        e.removeEventListener(t, n, c)
    }

    function f(e, t, n, i, r) {
        return {
            type: e,
            chart: t,
            native: r || null,
            x: void 0 !== n ? n : null,
            y: void 0 !== i ? i : null
        }
    }

    function m(e, t, n) {
        var d, u, c, p, m = e[r] || (e[r] = {}),
            g = m.resizer = function(e) {
                var t = document.createElement("div"),
                    n = a + "size-monitor",
                    i = "position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;";
                t.style.cssText = i, t.className = n, t.innerHTML = '<div class="' + n + '-expand" style="' + i + '"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="' + n + '-shrink" style="' + i + '"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div>';
                var r = t.childNodes[0],
                    o = t.childNodes[1];
                t._reset = function() {
                    r.scrollLeft = 1e6, r.scrollTop = 1e6, o.scrollLeft = 1e6, o.scrollTop = 1e6
                };
                var l = function() {
                    t._reset(), e()
                };
                return h(r, "scroll", l.bind(r, "expand")), h(o, "scroll", l.bind(o, "shrink")), t
            }((d = function() {
                if (m.resizer) return t(f("resize", n))
            }, c = !1, p = [], function() {
                p = Array.prototype.slice.call(arguments), u = u || this, c || (c = !0, i.requestAnimFrame.call(window, function() {
                    c = !1, d.apply(u, p)
                }))
            }));
        ! function(e, t) {
            var n = e[r] || (e[r] = {}),
                a = n.renderProxy = function(e) {
                    e.animationName === l && t()
                };
            i.each(s, function(t) {
                h(e, t, a)
            }), n.reflow = !!e.offsetParent, e.classList.add(o)
        }(e, function() {
            if (m.resizer) {
                var t = e.parentNode;
                t && t !== g.parentNode && t.insertBefore(g, t.firstChild), g._reset()
            }
        })
    }

    function g(e) {
        var t = e[r] || {},
            n = t.resizer;
        delete t.resizer,
            function(e) {
                var t = e[r] || {},
                    n = t.renderProxy;
                n && (i.each(s, function(t) {
                    p(e, t, n)
                }), delete t.renderProxy), e.classList.remove(o)
            }(e), n && n.parentNode && n.parentNode.removeChild(n)
    }
    e.exports = {
        _enabled: "undefined" != typeof window && "undefined" != typeof document,
        initialize: function() {
            var e, t, n, i = "from{opacity:0.99}to{opacity:1}";
            t = "@-webkit-keyframes " + l + "{" + i + "}@keyframes " + l + "{" + i + "}." + o + "{-webkit-animation:" + l + " 0.001s;animation:" + l + " 0.001s;}", n = (e = this)._style || document.createElement("style"), e._style || (e._style = n, t = "/* Chart.js */\n" + t, n.setAttribute("type", "text/css"), document.getElementsByTagName("head")[0].appendChild(n)), n.appendChild(document.createTextNode(t))
        },
        acquireContext: function(e, t) {
            "string" == typeof e ? e = document.getElementById(e) : e.length && (e = e[0]), e && e.canvas && (e = e.canvas);
            var n = e && e.getContext && e.getContext("2d");
            return n && n.canvas === e ? (function(e, t) {
                var n = e.style,
                    i = e.getAttribute("height"),
                    a = e.getAttribute("width");
                if (e[r] = {
                        initial: {
                            height: i,
                            width: a,
                            style: {
                                display: n.display,
                                height: n.height,
                                width: n.width
                            }
                        }
                    }, n.display = n.display || "block", null === a || "" === a) {
                    var o = u(e, "width");
                    void 0 !== o && (e.width = o)
                }
                if (null === i || "" === i)
                    if ("" === e.style.height) e.height = e.width / (t.options.aspectRatio || 2);
                    else {
                        var l = u(e, "height");
                        void 0 !== o && (e.height = l)
                    }
            }(e, t), n) : null
        },
        releaseContext: function(e) {
            var t = e.canvas;
            if (t[r]) {
                var n = t[r].initial;
                ["height", "width"].forEach(function(e) {
                    var r = n[e];
                    i.isNullOrUndef(r) ? t.removeAttribute(e) : t.setAttribute(e, r)
                }), i.each(n.style || {}, function(e, n) {
                    t.style[n] = e
                }), t.width = t.width, delete t[r]
            }
        },
        addEventListener: function(e, t, n) {
            var a = e.canvas;
            if ("resize" !== t) {
                var o = n[r] || (n[r] = {});
                h(a, t, (o.proxies || (o.proxies = {}))[e.id + "_" + t] = function(t) {
                    n(function(e, t) {
                        var n = d[e.type] || e.type,
                            r = i.getRelativePosition(e, t);
                        return f(n, t, r.x, r.y, e)
                    }(t, e))
                })
            } else m(a, n, e)
        },
        removeEventListener: function(e, t, n) {
            var i = e.canvas;
            if ("resize" !== t) {
                var a = ((n[r] || {}).proxies || {})[e.id + "_" + t];
                a && p(i, t, a)
            } else g(i)
        }
    }, i.addEvent = h, i.removeEvent = p
},
function(e, t, n) {
    "use strict";
    var i = n(139),
        r = n(140),
        a = n(3),
        o = n(2),
        l = n(141),
        s = n(9),
        d = n(142),
        u = n(143),
        c = n(7),
        h = n(144);
    e.exports = function(e) {
        function t(e) {
            return "top" === e || "bottom" === e
        }
        e.types = {}, e.instances = {}, e.controllers = {}, o.extend(e.prototype, {
            construct: function(t, n) {
                var i = this;
                n = function(e) {
                    var t = (e = e || {}).data = e.data || {};
                    return t.datasets = t.datasets || [], t.labels = t.labels || [], e.options = o.configMerge(a.global, a[e.type], e.options || {}), e
                }(n);
                var r = d.acquireContext(t, n),
                    l = r && r.canvas,
                    s = l && l.height,
                    u = l && l.width;
                i.id = o.uid(), i.ctx = r, i.canvas = l, i.config = n, i.width = u, i.height = s, i.aspectRatio = s ? u / s : null, i.options = n.options, i._bufferedRender = !1, i.chart = i, i.controller = i, e.instances[i.id] = i, Object.defineProperty(i, "data", {
                    get: function() {
                        return i.config.data
                    },
                    set: function(e) {
                        i.config.data = e
                    }
                }), r && l ? (i.initialize(), i.update()) : console.error("Failed to create chart: can't acquire context from the given item")
            },
            initialize: function() {
                var e = this;
                return u.notify(e, "beforeInit"), o.retinaScale(e, e.options.devicePixelRatio), e.bindEvents(), e.options.responsive && e.resize(!0), e.ensureScalesHaveIDs(), e.buildOrUpdateScales(), e.initToolTip(), u.notify(e, "afterInit"), e
            },
            clear: function() {
                return o.canvas.clear(this), this
            },
            stop: function() {
                return r.cancelAnimation(this), this
            },
            resize: function(e) {
                var t = this,
                    n = t.options,
                    i = t.canvas,
                    r = n.maintainAspectRatio && t.aspectRatio || null,
                    a = Math.max(0, Math.floor(o.getMaximumWidth(i))),
                    l = Math.max(0, Math.floor(r ? a / r : o.getMaximumHeight(i)));
                if ((t.width !== a || t.height !== l) && (i.width = t.width = a, i.height = t.height = l, i.style.width = a + "px", i.style.height = l + "px", o.retinaScale(t, n.devicePixelRatio), !e)) {
                    var s = {
                        width: a,
                        height: l
                    };
                    u.notify(t, "resize", [s]), t.options.onResize && t.options.onResize(t, s), t.stop(), t.update({
                        duration: t.options.responsiveAnimationDuration
                    })
                }
            },
            ensureScalesHaveIDs: function() {
                var e = this.options,
                    t = e.scales || {},
                    n = e.scale;
                o.each(t.xAxes, function(e, t) {
                    e.id = e.id || "x-axis-" + t
                }), o.each(t.yAxes, function(e, t) {
                    e.id = e.id || "y-axis-" + t
                }), n && (n.id = n.id || "scale")
            },
            buildOrUpdateScales: function() {
                var e = this,
                    n = e.options,
                    i = e.scales || {},
                    r = [],
                    a = Object.keys(i).reduce(function(e, t) {
                        return e[t] = !1, e
                    }, {});
                n.scales && (r = r.concat((n.scales.xAxes || []).map(function(e) {
                    return {
                        options: e,
                        dtype: "category",
                        dposition: "bottom"
                    }
                }), (n.scales.yAxes || []).map(function(e) {
                    return {
                        options: e,
                        dtype: "linear",
                        dposition: "left"
                    }
                }))), n.scale && r.push({
                    options: n.scale,
                    dtype: "radialLinear",
                    isDefault: !0,
                    dposition: "chartArea"
                }), o.each(r, function(n) {
                    var r = n.options,
                        l = r.id,
                        s = o.valueOrDefault(r.type, n.dtype);
                    t(r.position) !== t(n.dposition) && (r.position = n.dposition), a[l] = !0;
                    var d = null;
                    if (l in i && i[l].type === s)(d = i[l]).options = r, d.ctx = e.ctx, d.chart = e;
                    else {
                        var u = c.getScaleConstructor(s);
                        if (!u) return;
                        d = new u({
                            id: l,
                            type: s,
                            options: r,
                            ctx: e.ctx,
                            chart: e
                        }), i[d.id] = d
                    }
                    d.mergeTicksOptions(), n.isDefault && (e.scale = d)
                }), o.each(a, function(e, t) {
                    e || delete i[t]
                }), e.scales = i, c.addScalesToLayout(this)
            },
            buildOrUpdateControllers: function() {
                var t = this,
                    n = [],
                    i = [];
                return o.each(t.data.datasets, function(r, a) {
                    var o = t.getDatasetMeta(a),
                        l = r.type || t.config.type;
                    if (o.type && o.type !== l && (t.destroyDatasetMeta(a), o = t.getDatasetMeta(a)), o.type = l, n.push(o.type), o.controller) o.controller.updateIndex(a), o.controller.linkScales();
                    else {
                        var s = e.controllers[o.type];
                        if (void 0 === s) throw new Error('"' + o.type + '" is not a chart type.');
                        o.controller = new s(t, a), i.push(o.controller)
                    }
                }, t), i
            },
            resetElements: function() {
                var e = this;
                o.each(e.data.datasets, function(t, n) {
                    e.getDatasetMeta(n).controller.reset()
                }, e)
            },
            reset: function() {
                this.resetElements(), this.tooltip.initialize()
            },
            update: function(t) {
                var n, i, r = this;
                if (t && "object" == typeof t || (t = {
                        duration: t,
                        lazy: arguments[1]
                    }), i = (n = r).options, o.each(n.scales, function(e) {
                        s.removeBox(n, e)
                    }), i = o.configMerge(e.defaults.global, e.defaults[n.config.type], i), n.options = n.config.options = i, n.ensureScalesHaveIDs(), n.buildOrUpdateScales(), n.tooltip._options = i.tooltips, n.tooltip.initialize(), u._invalidate(r), !1 !== u.notify(r, "beforeUpdate")) {
                    r.tooltip._data = r.data;
                    var a = r.buildOrUpdateControllers();
                    o.each(r.data.datasets, function(e, t) {
                        r.getDatasetMeta(t).controller.buildOrUpdateElements()
                    }, r), r.updateLayout(), r.options.animation && r.options.animation.duration && o.each(a, function(e) {
                        e.reset()
                    }), r.updateDatasets(), r.tooltip.initialize(), r.lastActive = [], u.notify(r, "afterUpdate"), r._bufferedRender ? r._bufferedRequest = {
                        duration: t.duration,
                        easing: t.easing,
                        lazy: t.lazy
                    } : r.render(t)
                }
            },
            updateLayout: function() {
                !1 !== u.notify(this, "beforeLayout") && (s.update(this, this.width, this.height), u.notify(this, "afterScaleUpdate"), u.notify(this, "afterLayout"))
            },
            updateDatasets: function() {
                if (!1 !== u.notify(this, "beforeDatasetsUpdate")) {
                    for (var e = 0, t = this.data.datasets.length; e < t; ++e) this.updateDataset(e);
                    u.notify(this, "afterDatasetsUpdate")
                }
            },
            updateDataset: function(e) {
                var t = this.getDatasetMeta(e),
                    n = {
                        meta: t,
                        index: e
                    };
                !1 !== u.notify(this, "beforeDatasetUpdate", [n]) && (t.controller.update(), u.notify(this, "afterDatasetUpdate", [n]))
            },
            render: function(e) {
                var t = this;
                e && "object" == typeof e || (e = {
                    duration: e,
                    lazy: arguments[1]
                });
                var n = e.duration,
                    a = e.lazy;
                if (!1 !== u.notify(t, "beforeRender")) {
                    var l = t.options.animation,
                        s = function(e) {
                            u.notify(t, "afterRender"), o.callback(l && l.onComplete, [e], t)
                        };
                    if (l && (void 0 !== n && 0 !== n || void 0 === n && 0 !== l.duration)) {
                        var d = new i({
                            numSteps: (n || l.duration) / 16.66,
                            easing: e.easing || l.easing,
                            render: function(e, t) {
                                var n = o.easing.effects[t.easing],
                                    i = t.currentStep,
                                    r = i / t.numSteps;
                                e.draw(n(r), r, i)
                            },
                            onAnimationProgress: l.onProgress,
                            onAnimationComplete: s
                        });
                        r.addAnimation(t, d, n, a)
                    } else t.draw(), s(new i({
                        numSteps: 0,
                        chart: t
                    }));
                    return t
                }
            },
            draw: function(e) {
                var t = this;
                t.clear(), o.isNullOrUndef(e) && (e = 1), t.transition(e), t.width <= 0 || t.height <= 0 || !1 !== u.notify(t, "beforeDraw", [e]) && (o.each(t.boxes, function(e) {
                    e.draw(t.chartArea)
                }, t), t.scale && t.scale.draw(), t.drawDatasets(e), t._drawTooltip(e), u.notify(t, "afterDraw", [e]))
            },
            transition: function(e) {
                for (var t = 0, n = (this.data.datasets || []).length; t < n; ++t) this.isDatasetVisible(t) && this.getDatasetMeta(t).controller.transition(e);
                this.tooltip.transition(e)
            },
            drawDatasets: function(e) {
                var t = this;
                if (!1 !== u.notify(t, "beforeDatasetsDraw", [e])) {
                    for (var n = (t.data.datasets || []).length - 1; n >= 0; --n) t.isDatasetVisible(n) && t.drawDataset(n, e);
                    u.notify(t, "afterDatasetsDraw", [e])
                }
            },
            drawDataset: function(e, t) {
                var n = this.getDatasetMeta(e),
                    i = {
                        meta: n,
                        index: e,
                        easingValue: t
                    };
                !1 !== u.notify(this, "beforeDatasetDraw", [i]) && (n.controller.draw(t), u.notify(this, "afterDatasetDraw", [i]))
            },
            _drawTooltip: function(e) {
                var t = this.tooltip,
                    n = {
                        tooltip: t,
                        easingValue: e
                    };
                !1 !== u.notify(this, "beforeTooltipDraw", [n]) && (t.draw(), u.notify(this, "afterTooltipDraw", [n]))
            },
            getElementAtEvent: function(e) {
                return l.modes.single(this, e)
            },
            getElementsAtEvent: function(e) {
                return l.modes.label(this, e, {
                    intersect: !0
                })
            },
            getElementsAtXAxis: function(e) {
                return l.modes["x-axis"](this, e, {
                    intersect: !0
                })
            },
            getElementsAtEventForMode: function(e, t, n) {
                var i = l.modes[t];
                return "function" == typeof i ? i(this, e, n) : []
            },
            getDatasetAtEvent: function(e) {
                return l.modes.dataset(this, e, {
                    intersect: !0
                })
            },
            getDatasetMeta: function(e) {
                var t = this.data.datasets[e];
                t._meta || (t._meta = {});
                var n = t._meta[this.id];
                return n || (n = t._meta[this.id] = {
                    type: null,
                    data: [],
                    dataset: null,
                    controller: null,
                    hidden: null,
                    xAxisID: null,
                    yAxisID: null
                }), n
            },
            getVisibleDatasetCount: function() {
                for (var e = 0, t = 0, n = this.data.datasets.length; t < n; ++t) this.isDatasetVisible(t) && e++;
                return e
            },
            isDatasetVisible: function(e) {
                var t = this.getDatasetMeta(e);
                return "boolean" == typeof t.hidden ? !t.hidden : !this.data.datasets[e].hidden
            },
            generateLegend: function() {
                return this.options.legendCallback(this)
            },
            destroyDatasetMeta: function(e) {
                var t = this.id,
                    n = this.data.datasets[e],
                    i = n._meta && n._meta[t];
                i && (i.controller.destroy(), delete n._meta[t])
            },
            destroy: function() {
                var t, n, i = this,
                    r = i.canvas;
                for (i.stop(), t = 0, n = i.data.datasets.length; t < n; ++t) i.destroyDatasetMeta(t);
                r && (i.unbindEvents(), o.canvas.clear(i), d.releaseContext(i.ctx), i.canvas = null, i.ctx = null), u.notify(i, "destroy"), delete e.instances[i.id]
            },
            toBase64Image: function() {
                return this.canvas.toDataURL.apply(this.canvas, arguments)
            },
            initToolTip: function() {
                var e = this;
                e.tooltip = new h({
                    _chart: e,
                    _chartInstance: e,
                    _data: e.data,
                    _options: e.options.tooltips
                }, e)
            },
            bindEvents: function() {
                var e = this,
                    t = e._listeners = {},
                    n = function() {
                        e.eventHandler.apply(e, arguments)
                    };
                o.each(e.options.events, function(i) {
                    d.addEventListener(e, i, n), t[i] = n
                }), e.options.responsive && (n = function() {
                    e.resize()
                }, d.addEventListener(e, "resize", n), t.resize = n)
            },
            unbindEvents: function() {
                var e = this,
                    t = e._listeners;
                t && (delete e._listeners, o.each(t, function(t, n) {
                    d.removeEventListener(e, n, t)
                }))
            },
            updateHoverStyle: function(e, t, n) {
                var i, r, a, o = n ? "setHoverStyle" : "removeHoverStyle";
                for (r = 0, a = e.length; r < a; ++r)(i = e[r]) && this.getDatasetMeta(i._datasetIndex).controller[o](i)
            },
            eventHandler: function(e) {
                var t = this,
                    n = t.tooltip;
                if (!1 !== u.notify(t, "beforeEvent", [e])) {
                    t._bufferedRender = !0, t._bufferedRequest = null;
                    var i = t.handleEvent(e);
                    n && (i = n._start ? n.handleEvent(e) : i | n.handleEvent(e)), u.notify(t, "afterEvent", [e]);
                    var r = t._bufferedRequest;
                    return r ? t.render(r) : i && !t.animating && (t.stop(), t.render({
                        duration: t.options.hover.animationDuration,
                        lazy: !0
                    })), t._bufferedRender = !1, t._bufferedRequest = null, t
                }
            },
            handleEvent: function(e) {
                var t, n = this,
                    i = n.options || {},
                    r = i.hover;
                return n.lastActive = n.lastActive || [], "mouseout" === e.type ? n.active = [] : n.active = n.getElementsAtEventForMode(e, r.mode, r), o.callback(i.onHover || i.hover.onHover, [e.native, n.active], n), "mouseup" !== e.type && "click" !== e.type || i.onClick && i.onClick.call(n, e.native, n.active), n.lastActive.length && n.updateHoverStyle(n.lastActive, r.mode, !1), n.active.length && r.mode && n.updateHoverStyle(n.active, r.mode, !0), t = !o.arrayEquals(n.active, n.lastActive), n.lastActive = n.active, t
            }
        }), e.Controller = e
    }
},
function(e, t, n) {
    "use strict";
    var i = n(2);
    e.exports = function(e) {
        var t = ["push", "pop", "shift", "splice", "unshift"];

        function n(e, n) {
            var i = e._chartjs;
            if (i) {
                var r = i.listeners,
                    a = r.indexOf(n); - 1 !== a && r.splice(a, 1), r.length > 0 || (t.forEach(function(t) {
                    delete e[t]
                }), delete e._chartjs)
            }
        }
        e.DatasetController = function(e, t) {
            this.initialize(e, t)
        }, i.extend(e.DatasetController.prototype, {
            datasetElementType: null,
            dataElementType: null,
            initialize: function(e, t) {
                this.chart = e, this.index = t, this.linkScales(), this.addElements()
            },
            updateIndex: function(e) {
                this.index = e
            },
            linkScales: function() {
                var e = this,
                    t = e.getMeta(),
                    n = e.getDataset();
                null !== t.xAxisID && t.xAxisID in e.chart.scales || (t.xAxisID = n.xAxisID || e.chart.options.scales.xAxes[0].id), null !== t.yAxisID && t.yAxisID in e.chart.scales || (t.yAxisID = n.yAxisID || e.chart.options.scales.yAxes[0].id)
            },
            getDataset: function() {
                return this.chart.data.datasets[this.index]
            },
            getMeta: function() {
                return this.chart.getDatasetMeta(this.index)
            },
            getScaleForId: function(e) {
                return this.chart.scales[e]
            },
            reset: function() {
                this.update(!0)
            },
            destroy: function() {
                this._data && n(this._data, this)
            },
            createMetaDataset: function() {
                var e = this.datasetElementType;
                return e && new e({
                    _chart: this.chart,
                    _datasetIndex: this.index
                })
            },
            createMetaData: function(e) {
                var t = this.dataElementType;
                return t && new t({
                    _chart: this.chart,
                    _datasetIndex: this.index,
                    _index: e
                })
            },
            addElements: function() {
                var e, t, n = this.getMeta(),
                    i = this.getDataset().data || [],
                    r = n.data;
                for (e = 0, t = i.length; e < t; ++e) r[e] = r[e] || this.createMetaData(e);
                n.dataset = n.dataset || this.createMetaDataset()
            },
            addElementAndReset: function(e) {
                var t = this.createMetaData(e);
                this.getMeta().data.splice(e, 0, t), this.updateElement(t, e, !0)
            },
            buildOrUpdateElements: function() {
                var e, r, a = this,
                    o = a.getDataset(),
                    l = o.data || (o.data = []);
                a._data !== l && (a._data && n(a._data, a), r = a, (e = l)._chartjs ? e._chartjs.listeners.push(r) : (Object.defineProperty(e, "_chartjs", {
                    configurable: !0,
                    enumerable: !1,
                    value: {
                        listeners: [r]
                    }
                }), t.forEach(function(t) {
                    var n = "onData" + t.charAt(0).toUpperCase() + t.slice(1),
                        r = e[t];
                    Object.defineProperty(e, t, {
                        configurable: !0,
                        enumerable: !1,
                        value: function() {
                            var t = Array.prototype.slice.call(arguments),
                                a = r.apply(this, t);
                            return i.each(e._chartjs.listeners, function(e) {
                                "function" == typeof e[n] && e[n].apply(e, t)
                            }), a
                        }
                    })
                })), a._data = l), a.resyncElements()
            },
            update: i.noop,
            transition: function(e) {
                for (var t = this.getMeta(), n = t.data || [], i = n.length, r = 0; r < i; ++r) n[r].transition(e);
                t.dataset && t.dataset.transition(e)
            },
            draw: function() {
                var e = this.getMeta(),
                    t = e.data || [],
                    n = t.length,
                    i = 0;
                for (e.dataset && e.dataset.draw(); i < n; ++i) t[i].draw()
            },
            removeHoverStyle: function(e) {
                i.merge(e._model, e.$previousStyle || {}), delete e.$previousStyle
            },
            setHoverStyle: function(e) {
                var t = this.chart.data.datasets[e._datasetIndex],
                    n = e._index,
                    r = e.custom || {},
                    a = i.valueAtIndexOrDefault,
                    o = i.getHoverColor,
                    l = e._model;
                e.$previousStyle = {
                    backgroundColor: l.backgroundColor,
                    borderColor: l.borderColor,
                    borderWidth: l.borderWidth
                }, l.backgroundColor = r.hoverBackgroundColor ? r.hoverBackgroundColor : a(t.hoverBackgroundColor, n, o(l.backgroundColor)), l.borderColor = r.hoverBorderColor ? r.hoverBorderColor : a(t.hoverBorderColor, n, o(l.borderColor)), l.borderWidth = r.hoverBorderWidth ? r.hoverBorderWidth : a(t.hoverBorderWidth, n, l.borderWidth)
            },
            resyncElements: function() {
                var e = this.getMeta(),
                    t = this.getDataset().data,
                    n = e.data.length,
                    i = t.length;
                i < n ? e.data.splice(i, n - i) : i > n && this.insertElements(n, i - n)
            },
            insertElements: function(e, t) {
                for (var n = 0; n < t; ++n) this.addElementAndReset(e + n)
            },
            onDataPush: function() {
                this.insertElements(this.getDataset().data.length - 1, arguments.length)
            },
            onDataPop: function() {
                this.getMeta().data.pop()
            },
            onDataShift: function() {
                this.getMeta().data.shift()
            },
            onDataSplice: function(e, t) {
                this.getMeta().data.splice(e, t), this.insertElements(e, arguments.length - 2)
            },
            onDataUnshift: function() {
                this.insertElements(0, arguments.length)
            }
        }), e.DatasetController.extend = i.inherits
    }
},
function(e, t, n) {
    "use strict";
    var i = n(2),
        r = n(10);
    e.exports = function(e) {
        var t = i.noop;
        e.LinearScaleBase = r.extend({
            getRightValue: function(e) {
                return "string" == typeof e ? +e : r.prototype.getRightValue.call(this, e)
            },
            handleTickRangeOptions: function() {
                var e = this,
                    t = e.options.ticks;
                if (t.beginAtZero) {
                    var n = i.sign(e.min),
                        r = i.sign(e.max);
                    n < 0 && r < 0 ? e.max = 0 : n > 0 && r > 0 && (e.min = 0)
                }
                var a = void 0 !== t.min || void 0 !== t.suggestedMin,
                    o = void 0 !== t.max || void 0 !== t.suggestedMax;
                void 0 !== t.min ? e.min = t.min : void 0 !== t.suggestedMin && (null === e.min ? e.min = t.suggestedMin : e.min = Math.min(e.min, t.suggestedMin)), void 0 !== t.max ? e.max = t.max : void 0 !== t.suggestedMax && (null === e.max ? e.max = t.suggestedMax : e.max = Math.max(e.max, t.suggestedMax)), a !== o && e.min >= e.max && (a ? e.max = e.min + 1 : e.min = e.max - 1), e.min === e.max && (e.max++, t.beginAtZero || e.min--)
            },
            getTickLimit: t,
            handleDirectionalChanges: t,
            buildTicks: function() {
                var e = this,
                    t = e.options.ticks,
                    n = e.getTickLimit(),
                    r = {
                        maxTicks: n = Math.max(2, n),
                        min: t.min,
                        max: t.max,
                        precision: t.precision,
                        stepSize: i.valueOrDefault(t.fixedStepSize, t.stepSize)
                    },
                    a = e.ticks = function(e, t) {
                        var n, r, a, o = [];
                        if (e.stepSize && e.stepSize > 0) a = e.stepSize;
                        else {
                            var l = i.niceNum(t.max - t.min, !1);
                            a = i.niceNum(l / (e.maxTicks - 1), !0), void 0 !== (r = e.precision) && (n = Math.pow(10, r), a = Math.ceil(a * n) / n)
                        }
                        var s = Math.floor(t.min / a) * a,
                            d = Math.ceil(t.max / a) * a;
                        i.isNullOrUndef(e.min) || i.isNullOrUndef(e.max) || !e.stepSize || i.almostWhole((e.max - e.min) / e.stepSize, a / 1e3) && (s = e.min, d = e.max);
                        var u = (d - s) / a;
                        u = i.almostEquals(u, Math.round(u), a / 1e3) ? Math.round(u) : Math.ceil(u), r = 1, a < 1 && (r = Math.pow(10, 1 - Math.floor(i.log10(a))), s = Math.round(s * r) / r, d = Math.round(d * r) / r), o.push(void 0 !== e.min ? e.min : s);
                        for (var c = 1; c < u; ++c) o.push(Math.round((s + c * a) * r) / r);
                        return o.push(void 0 !== e.max ? e.max : d), o
                    }(r, e);
                e.handleDirectionalChanges(), e.max = i.max(a), e.min = i.min(a), t.reverse ? (a.reverse(), e.start = e.max, e.end = e.min) : (e.start = e.min, e.end = e.max)
            },
            convertTicksToLabels: function() {
                var e = this;
                e.ticksAsNumbers = e.ticks.slice(), e.zeroLineIndex = e.ticks.indexOf(0), r.prototype.convertTicksToLabels.call(e)
            }
        })
    }
},
function(e, t, n) {
    "use strict";
    var i = n(10),
        r = n(7);
    e.exports = function() {
        var e = i.extend({
            getLabels: function() {
                var e = this.chart.data;
                return this.options.labels || (this.isHorizontal() ? e.xLabels : e.yLabels) || e.labels
            },
            determineDataLimits: function() {
                var e, t = this,
                    n = t.getLabels();
                t.minIndex = 0, t.maxIndex = n.length - 1, void 0 !== t.options.ticks.min && (e = n.indexOf(t.options.ticks.min), t.minIndex = -1 !== e ? e : t.minIndex), void 0 !== t.options.ticks.max && (e = n.indexOf(t.options.ticks.max), t.maxIndex = -1 !== e ? e : t.maxIndex), t.min = n[t.minIndex], t.max = n[t.maxIndex]
            },
            buildTicks: function() {
                var e = this,
                    t = e.getLabels();
                e.ticks = 0 === e.minIndex && e.maxIndex === t.length - 1 ? t : t.slice(e.minIndex, e.maxIndex + 1)
            },
            getLabelForIndex: function(e, t) {
                var n = this,
                    i = n.chart.data,
                    r = n.isHorizontal();
                return i.yLabels && !r ? n.getRightValue(i.datasets[t].data[e]) : n.ticks[e - n.minIndex]
            },
            getPixelForValue: function(e, t) {
                var n, i = this,
                    r = i.options.offset,
                    a = Math.max(i.maxIndex + 1 - i.minIndex - (r ? 0 : 1), 1);
                if (null != e && (n = i.isHorizontal() ? e.x : e.y), void 0 !== n || void 0 !== e && isNaN(t)) {
                    e = n || e;
                    var o = i.getLabels().indexOf(e);
                    t = -1 !== o ? o : t
                }
                if (i.isHorizontal()) {
                    var l = i.width / a,
                        s = l * (t - i.minIndex);
                    return r && (s += l / 2), i.left + Math.round(s)
                }
                var d = i.height / a,
                    u = d * (t - i.minIndex);
                return r && (u += d / 2), i.top + Math.round(u)
            },
            getPixelForTick: function(e) {
                return this.getPixelForValue(this.ticks[e], e + this.minIndex, null)
            },
            getValueForPixel: function(e) {
                var t = this,
                    n = t.options.offset,
                    i = Math.max(t._ticks.length - (n ? 0 : 1), 1),
                    r = t.isHorizontal(),
                    a = (r ? t.width : t.height) / i;
                return e -= r ? t.left : t.top, n && (e -= a / 2), (e <= 0 ? 0 : Math.round(e / a)) + t.minIndex
            },
            getBasePixel: function() {
                return this.bottom
            }
        });
        r.registerScaleType("category", e, {
            position: "bottom"
        })
    }
},
function(e, t, n) {
    "use strict";
    var i = n(3),
        r = n(2),
        a = n(7),
        o = n(11);
    e.exports = function(e) {
        var t = {
                position: "left",
                ticks: {
                    callback: o.formatters.linear
                }
            },
            n = e.LinearScaleBase.extend({
                determineDataLimits: function() {
                    var e = this,
                        t = e.options,
                        n = e.chart,
                        i = n.data.datasets,
                        a = e.isHorizontal();

                    function o(t) {
                        return a ? t.xAxisID === e.id : t.yAxisID === e.id
                    }
                    e.min = null, e.max = null;
                    var l = t.stacked;
                    if (void 0 === l && r.each(i, function(e, t) {
                            if (!l) {
                                var i = n.getDatasetMeta(t);
                                n.isDatasetVisible(t) && o(i) && void 0 !== i.stack && (l = !0)
                            }
                        }), t.stacked || l) {
                        var s = {};
                        r.each(i, function(i, a) {
                            var l = n.getDatasetMeta(a),
                                d = [l.type, void 0 === t.stacked && void 0 === l.stack ? a : "", l.stack].join(".");
                            void 0 === s[d] && (s[d] = {
                                positiveValues: [],
                                negativeValues: []
                            });
                            var u = s[d].positiveValues,
                                c = s[d].negativeValues;
                            n.isDatasetVisible(a) && o(l) && r.each(i.data, function(n, i) {
                                var r = +e.getRightValue(n);
                                isNaN(r) || l.data[i].hidden || (u[i] = u[i] || 0, c[i] = c[i] || 0, t.relativePoints ? u[i] = 100 : r < 0 ? c[i] += r : u[i] += r)
                            })
                        }), r.each(s, function(t) {
                            var n = t.positiveValues.concat(t.negativeValues),
                                i = r.min(n),
                                a = r.max(n);
                            e.min = null === e.min ? i : Math.min(e.min, i), e.max = null === e.max ? a : Math.max(e.max, a)
                        })
                    } else r.each(i, function(t, i) {
                        var a = n.getDatasetMeta(i);
                        n.isDatasetVisible(i) && o(a) && r.each(t.data, function(t, n) {
                            var i = +e.getRightValue(t);
                            isNaN(i) || a.data[n].hidden || (null === e.min ? e.min = i : i < e.min && (e.min = i), null === e.max ? e.max = i : i > e.max && (e.max = i))
                        })
                    });
                    e.min = isFinite(e.min) && !isNaN(e.min) ? e.min : 0, e.max = isFinite(e.max) && !isNaN(e.max) ? e.max : 1, this.handleTickRangeOptions()
                },
                getTickLimit: function() {
                    var e, t = this.options.ticks;
                    if (this.isHorizontal()) e = Math.min(t.maxTicksLimit ? t.maxTicksLimit : 11, Math.ceil(this.width / 50));
                    else {
                        var n = r.valueOrDefault(t.fontSize, i.global.defaultFontSize);
                        e = Math.min(t.maxTicksLimit ? t.maxTicksLimit : 11, Math.ceil(this.height / (2 * n)))
                    }
                    return e
                },
                handleDirectionalChanges: function() {
                    this.isHorizontal() || this.ticks.reverse()
                },
                getLabelForIndex: function(e, t) {
                    return +this.getRightValue(this.chart.data.datasets[t].data[e])
                },
                getPixelForValue: function(e) {
                    var t = this,
                        n = t.start,
                        i = +t.getRightValue(e),
                        r = t.end - n;
                    return t.isHorizontal() ? t.left + t.width / r * (i - n) : t.bottom - t.height / r * (i - n)
                },
                getValueForPixel: function(e) {
                    var t = this,
                        n = t.isHorizontal(),
                        i = n ? t.width : t.height,
                        r = (n ? e - t.left : t.bottom - e) / i;
                    return t.start + (t.end - t.start) * r
                },
                getPixelForTick: function(e) {
                    return this.getPixelForValue(this.ticksAsNumbers[e])
                }
            });
        a.registerScaleType("linear", n, t)
    }
},
function(e, t, n) {
    "use strict";
    var i = n(2),
        r = n(10),
        a = n(7),
        o = n(11);
    e.exports = function(e) {
        var t = {
                position: "left",
                ticks: {
                    callback: o.formatters.logarithmic
                }
            },
            n = r.extend({
                determineDataLimits: function() {
                    var e = this,
                        t = e.options,
                        n = e.chart,
                        r = n.data.datasets,
                        a = e.isHorizontal();

                    function o(t) {
                        return a ? t.xAxisID === e.id : t.yAxisID === e.id
                    }
                    e.min = null, e.max = null, e.minNotZero = null;
                    var l = t.stacked;
                    if (void 0 === l && i.each(r, function(e, t) {
                            if (!l) {
                                var i = n.getDatasetMeta(t);
                                n.isDatasetVisible(t) && o(i) && void 0 !== i.stack && (l = !0)
                            }
                        }), t.stacked || l) {
                        var s = {};
                        i.each(r, function(r, a) {
                            var l = n.getDatasetMeta(a),
                                d = [l.type, void 0 === t.stacked && void 0 === l.stack ? a : "", l.stack].join(".");
                            n.isDatasetVisible(a) && o(l) && (void 0 === s[d] && (s[d] = []), i.each(r.data, function(t, n) {
                                var i = s[d],
                                    r = +e.getRightValue(t);
                                isNaN(r) || l.data[n].hidden || r < 0 || (i[n] = i[n] || 0, i[n] += r)
                            }))
                        }), i.each(s, function(t) {
                            if (t.length > 0) {
                                var n = i.min(t),
                                    r = i.max(t);
                                e.min = null === e.min ? n : Math.min(e.min, n), e.max = null === e.max ? r : Math.max(e.max, r)
                            }
                        })
                    } else i.each(r, function(t, r) {
                        var a = n.getDatasetMeta(r);
                        n.isDatasetVisible(r) && o(a) && i.each(t.data, function(t, n) {
                            var i = +e.getRightValue(t);
                            isNaN(i) || a.data[n].hidden || i < 0 || (null === e.min ? e.min = i : i < e.min && (e.min = i), null === e.max ? e.max = i : i > e.max && (e.max = i), 0 !== i && (null === e.minNotZero || i < e.minNotZero) && (e.minNotZero = i))
                        })
                    });
                    this.handleTickRangeOptions()
                },
                handleTickRangeOptions: function() {
                    var e = this,
                        t = e.options.ticks,
                        n = i.valueOrDefault;
                    e.min = n(t.min, e.min), e.max = n(t.max, e.max), e.min === e.max && (0 !== e.min && null !== e.min ? (e.min = Math.pow(10, Math.floor(i.log10(e.min)) - 1), e.max = Math.pow(10, Math.floor(i.log10(e.max)) + 1)) : (e.min = 1, e.max = 10)), null === e.min && (e.min = Math.pow(10, Math.floor(i.log10(e.max)) - 1)), null === e.max && (e.max = 0 !== e.min ? Math.pow(10, Math.floor(i.log10(e.min)) + 1) : 10), null === e.minNotZero && (e.min > 0 ? e.minNotZero = e.min : e.max < 1 ? e.minNotZero = Math.pow(10, Math.floor(i.log10(e.max))) : e.minNotZero = 1)
                },
                buildTicks: function() {
                    var e = this,
                        t = e.options.ticks,
                        n = !e.isHorizontal(),
                        r = {
                            min: t.min,
                            max: t.max
                        },
                        a = e.ticks = function(e, t) {
                            var n, r, a = [],
                                o = i.valueOrDefault,
                                l = o(e.min, Math.pow(10, Math.floor(i.log10(t.min)))),
                                s = Math.floor(i.log10(t.max)),
                                d = Math.ceil(t.max / Math.pow(10, s));
                            0 === l ? (n = Math.floor(i.log10(t.minNotZero)), r = Math.floor(t.minNotZero / Math.pow(10, n)), a.push(l), l = r * Math.pow(10, n)) : (n = Math.floor(i.log10(l)), r = Math.floor(l / Math.pow(10, n)));
                            var u = n < 0 ? Math.pow(10, Math.abs(n)) : 1;
                            do {
                                a.push(l), 10 == ++r && (r = 1, u = ++n >= 0 ? 1 : u), l = Math.round(r * Math.pow(10, n) * u) / u
                            } while (n < s || n === s && r < d);
                            var c = o(e.max, l);
                            return a.push(c), a
                        }(r, e);
                    e.max = i.max(a), e.min = i.min(a), t.reverse ? (n = !n, e.start = e.max, e.end = e.min) : (e.start = e.min, e.end = e.max), n && a.reverse()
                },
                convertTicksToLabels: function() {
                    this.tickValues = this.ticks.slice(), r.prototype.convertTicksToLabels.call(this)
                },
                getLabelForIndex: function(e, t) {
                    return +this.getRightValue(this.chart.data.datasets[t].data[e])
                },
                getPixelForTick: function(e) {
                    return this.getPixelForValue(this.tickValues[e])
                },
                _getFirstTickValue: function(e) {
                    var t = Math.floor(i.log10(e));
                    return Math.floor(e / Math.pow(10, t)) * Math.pow(10, t)
                },
                getPixelForValue: function(t) {
                    var n, r, a, o, l, s = this,
                        d = s.options.ticks.reverse,
                        u = i.log10,
                        c = s._getFirstTickValue(s.minNotZero),
                        h = 0;
                    return t = +s.getRightValue(t), d ? (a = s.end, o = s.start, l = -1) : (a = s.start, o = s.end, l = 1), s.isHorizontal() ? (n = s.width, r = d ? s.right : s.left) : (n = s.height, l *= -1, r = d ? s.top : s.bottom), t !== a && (0 === a && (n -= h = i.getValueOrDefault(s.options.ticks.fontSize, e.defaults.global.defaultFontSize), a = c), 0 !== t && (h += n / (u(o) - u(a)) * (u(t) - u(a))), r += l * h), r
                },
                getValueForPixel: function(t) {
                    var n, r, a, o, l = this,
                        s = l.options.ticks.reverse,
                        d = i.log10,
                        u = l._getFirstTickValue(l.minNotZero);
                    if (s ? (r = l.end, a = l.start) : (r = l.start, a = l.end), l.isHorizontal() ? (n = l.width, o = s ? l.right - t : t - l.left) : (n = l.height, o = s ? t - l.top : l.bottom - t), o !== r) {
                        if (0 === r) {
                            var c = i.getValueOrDefault(l.options.ticks.fontSize, e.defaults.global.defaultFontSize);
                            o -= c, n -= c, r = u
                        }
                        o *= d(a) - d(r), o /= n, o = Math.pow(10, d(r) + o)
                    }
                    return o
                }
            });
        a.registerScaleType("logarithmic", n, t)
    }
},
function(e, t, n) {
    "use strict";
    var i = n(3),
        r = n(2),
        a = n(7),
        o = n(11);
    e.exports = function(e) {
        var t = i.global,
            n = {
                display: !0,
                animate: !0,
                position: "chartArea",
                angleLines: {
                    display: !0,
                    color: "rgba(0, 0, 0, 0.1)",
                    lineWidth: 1
                },
                gridLines: {
                    circular: !1
                },
                ticks: {
                    showLabelBackdrop: !0,
                    backdropColor: "rgba(255,255,255,0.75)",
                    backdropPaddingY: 2,
                    backdropPaddingX: 2,
                    callback: o.formatters.linear
                },
                pointLabels: {
                    display: !0,
                    fontSize: 10,
                    callback: function(e) {
                        return e
                    }
                }
            };

        function l(e) {
            var t = e.options;
            return t.angleLines.display || t.pointLabels.display ? e.chart.data.labels.length : 0
        }

        function s(e) {
            var n = e.options.pointLabels,
                i = r.valueOrDefault(n.fontSize, t.defaultFontSize),
                a = r.valueOrDefault(n.fontStyle, t.defaultFontStyle),
                o = r.valueOrDefault(n.fontFamily, t.defaultFontFamily);
            return {
                size: i,
                style: a,
                family: o,
                font: r.fontString(i, a, o)
            }
        }

        function d(e, t, n, i, r) {
            return e === i || e === r ? {
                start: t - n / 2,
                end: t + n / 2
            } : e < i || e > r ? {
                start: t - n - 5,
                end: t
            } : {
                start: t,
                end: t + n + 5
            }
        }

        function u(e) {
            return 0 === e || 180 === e ? "center" : e < 180 ? "left" : "right"
        }

        function c(e, t, n, i) {
            if (r.isArray(t))
                for (var a = n.y, o = 1.5 * i, l = 0; l < t.length; ++l) e.fillText(t[l], n.x, a), a += o;
            else e.fillText(t, n.x, n.y)
        }

        function h(e, t, n) {
            90 === e || 270 === e ? n.y -= t.h / 2 : (e > 270 || e < 90) && (n.y -= t.h)
        }

        function p(e) {
            return r.isNumber(e) ? e : 0
        }
        var f = e.LinearScaleBase.extend({
            setDimensions: function() {
                var e = this,
                    n = e.options,
                    i = n.ticks;
                e.width = e.maxWidth, e.height = e.maxHeight, e.xCenter = Math.round(e.width / 2), e.yCenter = Math.round(e.height / 2);
                var a = r.min([e.height, e.width]),
                    o = r.valueOrDefault(i.fontSize, t.defaultFontSize);
                e.drawingArea = n.display ? a / 2 - (o / 2 + i.backdropPaddingY) : a / 2
            },
            determineDataLimits: function() {
                var e = this,
                    t = e.chart,
                    n = Number.POSITIVE_INFINITY,
                    i = Number.NEGATIVE_INFINITY;
                r.each(t.data.datasets, function(a, o) {
                    if (t.isDatasetVisible(o)) {
                        var l = t.getDatasetMeta(o);
                        r.each(a.data, function(t, r) {
                            var a = +e.getRightValue(t);
                            isNaN(a) || l.data[r].hidden || (n = Math.min(a, n), i = Math.max(a, i))
                        })
                    }
                }), e.min = n === Number.POSITIVE_INFINITY ? 0 : n, e.max = i === Number.NEGATIVE_INFINITY ? 0 : i, e.handleTickRangeOptions()
            },
            getTickLimit: function() {
                var e = this.options.ticks,
                    n = r.valueOrDefault(e.fontSize, t.defaultFontSize);
                return Math.min(e.maxTicksLimit ? e.maxTicksLimit : 11, Math.ceil(this.drawingArea / (1.5 * n)))
            },
            convertTicksToLabels: function() {
                var t = this;
                e.LinearScaleBase.prototype.convertTicksToLabels.call(t), t.pointLabels = t.chart.data.labels.map(t.options.pointLabels.callback, t)
            },
            getLabelForIndex: function(e, t) {
                return +this.getRightValue(this.chart.data.datasets[t].data[e])
            },
            fit: function() {
                var e, t;
                this.options.pointLabels.display ? function(e) {
                    var t, n, i, a = s(e),
                        o = Math.min(e.height / 2, e.width / 2),
                        u = {
                            r: e.width,
                            l: 0,
                            t: e.height,
                            b: 0
                        },
                        c = {};
                    e.ctx.font = a.font, e._pointLabelSizes = [];
                    var h, p, f, m = l(e);
                    for (t = 0; t < m; t++) {
                        i = e.getPointPosition(t, o), h = e.ctx, p = a.size, f = e.pointLabels[t] || "", n = r.isArray(f) ? {
                            w: r.longestText(h, h.font, f),
                            h: f.length * p + 1.5 * (f.length - 1) * p
                        } : {
                            w: h.measureText(f).width,
                            h: p
                        }, e._pointLabelSizes[t] = n;
                        var g = e.getIndexAngle(t),
                            _ = r.toDegrees(g) % 360,
                            y = d(_, i.x, n.w, 0, 180),
                            v = d(_, i.y, n.h, 90, 270);
                        y.start < u.l && (u.l = y.start, c.l = g), y.end > u.r && (u.r = y.end, c.r = g), v.start < u.t && (u.t = v.start, c.t = g), v.end > u.b && (u.b = v.end, c.b = g)
                    }
                    e.setReductions(o, u, c)
                }(this) : (e = this, t = Math.min(e.height / 2, e.width / 2), e.drawingArea = Math.round(t), e.setCenterPoint(0, 0, 0, 0))
            },
            setReductions: function(e, t, n) {
                var i = t.l / Math.sin(n.l),
                    r = Math.max(t.r - this.width, 0) / Math.sin(n.r),
                    a = -t.t / Math.cos(n.t),
                    o = -Math.max(t.b - this.height, 0) / Math.cos(n.b);
                i = p(i), r = p(r), a = p(a), o = p(o), this.drawingArea = Math.min(Math.round(e - (i + r) / 2), Math.round(e - (a + o) / 2)), this.setCenterPoint(i, r, a, o)
            },
            setCenterPoint: function(e, t, n, i) {
                var r = this,
                    a = r.width - t - r.drawingArea,
                    o = e + r.drawingArea,
                    l = n + r.drawingArea,
                    s = r.height - i - r.drawingArea;
                r.xCenter = Math.round((o + a) / 2 + r.left), r.yCenter = Math.round((l + s) / 2 + r.top)
            },
            getIndexAngle: function(e) {
                return e * (2 * Math.PI / l(this)) + (this.chart.options && this.chart.options.startAngle ? this.chart.options.startAngle : 0) * Math.PI * 2 / 360
            },
            getDistanceFromCenterForValue: function(e) {
                var t = this;
                if (null === e) return 0;
                var n = t.drawingArea / (t.max - t.min);
                return t.options.ticks.reverse ? (t.max - e) * n : (e - t.min) * n
            },
            getPointPosition: function(e, t) {
                var n = this.getIndexAngle(e) - Math.PI / 2;
                return {
                    x: Math.round(Math.cos(n) * t) + this.xCenter,
                    y: Math.round(Math.sin(n) * t) + this.yCenter
                }
            },
            getPointPositionForValue: function(e, t) {
                return this.getPointPosition(e, this.getDistanceFromCenterForValue(t))
            },
            getBasePosition: function() {
                var e = this.min,
                    t = this.max;
                return this.getPointPositionForValue(0, this.beginAtZero ? 0 : e < 0 && t < 0 ? t : e > 0 && t > 0 ? e : 0)
            },
            draw: function() {
                var e = this,
                    n = e.options,
                    i = n.gridLines,
                    a = n.ticks,
                    o = r.valueOrDefault;
                if (n.display) {
                    var d = e.ctx,
                        p = this.getIndexAngle(0),
                        f = o(a.fontSize, t.defaultFontSize),
                        m = o(a.fontStyle, t.defaultFontStyle),
                        g = o(a.fontFamily, t.defaultFontFamily),
                        _ = r.fontString(f, m, g);
                    r.each(e.ticks, function(n, s) {
                        if (s > 0 || a.reverse) {
                            var u = e.getDistanceFromCenterForValue(e.ticksAsNumbers[s]);
                            if (i.display && 0 !== s && function(e, t, n, i) {
                                    var a = e.ctx;
                                    if (a.strokeStyle = r.valueAtIndexOrDefault(t.color, i - 1), a.lineWidth = r.valueAtIndexOrDefault(t.lineWidth, i - 1), e.options.gridLines.circular) a.beginPath(), a.arc(e.xCenter, e.yCenter, n, 0, 2 * Math.PI), a.closePath(), a.stroke();
                                    else {
                                        var o = l(e);
                                        if (0 === o) return;
                                        a.beginPath();
                                        var s = e.getPointPosition(0, n);
                                        a.moveTo(s.x, s.y);
                                        for (var d = 1; d < o; d++) s = e.getPointPosition(d, n), a.lineTo(s.x, s.y);
                                        a.closePath(), a.stroke()
                                    }
                                }(e, i, u, s), a.display) {
                                var c = o(a.fontColor, t.defaultFontColor);
                                if (d.font = _, d.save(), d.translate(e.xCenter, e.yCenter), d.rotate(p), a.showLabelBackdrop) {
                                    var h = d.measureText(n).width;
                                    d.fillStyle = a.backdropColor, d.fillRect(-h / 2 - a.backdropPaddingX, -u - f / 2 - a.backdropPaddingY, h + 2 * a.backdropPaddingX, f + 2 * a.backdropPaddingY)
                                }
                                d.textAlign = "center", d.textBaseline = "middle", d.fillStyle = c, d.fillText(n, 0, -u), d.restore()
                            }
                        }
                    }), (n.angleLines.display || n.pointLabels.display) && function(e) {
                        var n = e.ctx,
                            i = e.options,
                            a = i.angleLines,
                            o = i.pointLabels;
                        n.lineWidth = a.lineWidth, n.strokeStyle = a.color;
                        var d = e.getDistanceFromCenterForValue(i.ticks.reverse ? e.min : e.max),
                            p = s(e);
                        n.textBaseline = "top";
                        for (var f = l(e) - 1; f >= 0; f--) {
                            if (a.display) {
                                var m = e.getPointPosition(f, d);
                                n.beginPath(), n.moveTo(e.xCenter, e.yCenter), n.lineTo(m.x, m.y), n.stroke(), n.closePath()
                            }
                            if (o.display) {
                                var g = e.getPointPosition(f, d + 5),
                                    _ = r.valueAtIndexOrDefault(o.fontColor, f, t.defaultFontColor);
                                n.font = p.font, n.fillStyle = _;
                                var y = e.getIndexAngle(f),
                                    v = r.toDegrees(y);
                                n.textAlign = u(v), h(v, e._pointLabelSizes[f], g), c(n, e.pointLabels[f] || "", g, p.size)
                            }
                        }
                    }(e)
                }
            }
        });
        a.registerScaleType("radialLinear", f, n)
    }
},
function(e, t, n) {
    "use strict";
    var i = n(0);
    i = "function" == typeof i ? i : window.moment;
    var r = n(3),
        a = n(2),
        o = n(10),
        l = n(7),
        s = Number.MIN_SAFE_INTEGER || -9007199254740991,
        d = Number.MAX_SAFE_INTEGER || 9007199254740991,
        u = {
            millisecond: {
                common: !0,
                size: 1,
                steps: [1, 2, 5, 10, 20, 50, 100, 250, 500]
            },
            second: {
                common: !0,
                size: 1e3,
                steps: [1, 2, 5, 10, 15, 30]
            },
            minute: {
                common: !0,
                size: 6e4,
                steps: [1, 2, 5, 10, 15, 30]
            },
            hour: {
                common: !0,
                size: 36e5,
                steps: [1, 2, 3, 6, 12]
            },
            day: {
                common: !0,
                size: 864e5,
                steps: [1, 2, 5]
            },
            week: {
                common: !1,
                size: 6048e5,
                steps: [1, 2, 3, 4]
            },
            month: {
                common: !0,
                size: 2628e6,
                steps: [1, 2, 3]
            },
            quarter: {
                common: !1,
                size: 7884e6,
                steps: [1, 2, 3, 4]
            },
            year: {
                common: !0,
                size: 3154e7
            }
        },
        c = Object.keys(u);

    function h(e, t) {
        return e - t
    }

    function p(e) {
        var t, n, i, r = {},
            a = [];
        for (t = 0, n = e.length; t < n; ++t) r[i = e[t]] || (r[i] = !0, a.push(i));
        return a
    }

    function f(e, t, n, i) {
        var r = function(e, t, n) {
                for (var i, r, a, o = 0, l = e.length - 1; o >= 0 && o <= l;) {
                    if (r = e[(i = o + l >> 1) - 1] || null, a = e[i], !r) return {
                        lo: null,
                        hi: a
                    };
                    if (a[t] < n) o = i + 1;
                    else {
                        if (!(r[t] > n)) return {
                            lo: r,
                            hi: a
                        };
                        l = i - 1
                    }
                }
                return {
                    lo: a,
                    hi: null
                }
            }(e, t, n),
            a = r.lo ? r.hi ? r.lo : e[e.length - 2] : e[0],
            o = r.lo ? r.hi ? r.hi : e[e.length - 1] : e[1],
            l = o[t] - a[t],
            s = l ? (n - a[t]) / l : 0,
            d = (o[i] - a[i]) * s;
        return a[i] + d
    }

    function m(e, t) {
        var n = t.parser,
            r = t.parser || t.format;
        return "function" == typeof n ? n(e) : "string" == typeof e && "string" == typeof r ? i(e, r) : (e instanceof i || (e = i(e)), e.isValid() ? e : "function" == typeof r ? r(e) : e)
    }

    function g(e, t) {
        if (a.isNullOrUndef(e)) return null;
        var n = t.options.time,
            i = m(t.getRightValue(e), n);
        return i.isValid() ? (n.round && i.startOf(n.round), i.valueOf()) : null
    }

    function _(e) {
        for (var t = c.indexOf(e) + 1, n = c.length; t < n; ++t)
            if (u[c[t]].common) return c[t]
    }

    function y(e, t, n, r) {
        var o, l = r.time,
            s = l.unit || function(e, t, n, i) {
                var r, a, o, l = c.length;
                for (r = c.indexOf(e); r < l - 1; ++r)
                    if (o = (a = u[c[r]]).steps ? a.steps[a.steps.length - 1] : d, a.common && Math.ceil((n - t) / (o * a.size)) <= i) return c[r];
                return c[l - 1]
            }(l.minUnit, e, t, n),
            h = _(s),
            p = a.valueOrDefault(l.stepSize, l.unitStepSize),
            f = "week" === s && l.isoWeekday,
            m = r.ticks.major.enabled,
            g = u[s],
            y = i(e),
            v = i(t),
            M = [];
        for (p || (p = function(e, t, n, i) {
                var r, a, o, l = t - e,
                    s = u[n],
                    d = s.size,
                    c = s.steps;
                if (!c) return Math.ceil(l / (i * d));
                for (r = 0, a = c.length; r < a && (o = c[r], !(Math.ceil(l / (d * o)) <= i)); ++r);
                return o
            }(e, t, s, n)), f && (y = y.isoWeekday(f), v = v.isoWeekday(f)), y = y.startOf(f ? "day" : s), (v = v.startOf(f ? "day" : s)) < t && v.add(1, s), o = i(y), m && h && !f && !l.round && (o.startOf(h), o.add(~~((y - o) / (g.size * p)) * p, s)); o < v; o.add(p, s)) M.push(+o);
        return M.push(+o), M
    }
    e.exports = function() {
        var e = o.extend({
            initialize: function() {
                if (!i) throw new Error("Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com");
                this.mergeTicksOptions(), o.prototype.initialize.call(this)
            },
            update: function() {
                var e = this.options;
                return e.time && e.time.format && console.warn("options.time.format is deprecated and replaced by options.time.parser."), o.prototype.update.apply(this, arguments)
            },
            getRightValue: function(e) {
                return e && void 0 !== e.t && (e = e.t), o.prototype.getRightValue.call(this, e)
            },
            determineDataLimits: function() {
                var e, t, n, r, o, l, u = this,
                    c = u.chart,
                    f = u.options.time,
                    m = f.unit || "day",
                    _ = d,
                    y = s,
                    v = [],
                    M = [],
                    b = [];
                for (e = 0, n = c.data.labels.length; e < n; ++e) b.push(g(c.data.labels[e], u));
                for (e = 0, n = (c.data.datasets || []).length; e < n; ++e)
                    if (c.isDatasetVisible(e))
                        if (o = c.data.datasets[e].data, a.isObject(o[0]))
                            for (M[e] = [], t = 0, r = o.length; t < r; ++t) l = g(o[t], u), v.push(l), M[e][t] = l;
                        else v.push.apply(v, b), M[e] = b.slice(0);
                else M[e] = [];
                b.length && (b = p(b).sort(h), _ = Math.min(_, b[0]), y = Math.max(y, b[b.length - 1])), v.length && (v = p(v).sort(h), _ = Math.min(_, v[0]), y = Math.max(y, v[v.length - 1])), _ = g(f.min, u) || _, y = g(f.max, u) || y, _ = _ === d ? +i().startOf(m) : _, y = y === s ? +i().endOf(m) + 1 : y, u.min = Math.min(_, y), u.max = Math.max(_ + 1, y), u._horizontal = u.isHorizontal(), u._table = [], u._timestamps = {
                    data: v,
                    datasets: M,
                    labels: b
                }
            },
            buildTicks: function() {
                var e, t, n, r = this,
                    a = r.min,
                    o = r.max,
                    l = r.options,
                    s = l.time,
                    d = [],
                    h = [];
                switch (l.ticks.source) {
                    case "data":
                        d = r._timestamps.data;
                        break;
                    case "labels":
                        d = r._timestamps.labels;
                        break;
                    case "auto":
                    default:
                        d = y(a, o, r.getLabelCapacity(a), l)
                }
                for ("ticks" === l.bounds && d.length && (a = d[0], o = d[d.length - 1]), a = g(s.min, r) || a, o = g(s.max, r) || o, e = 0, t = d.length; e < t; ++e)(n = d[e]) >= a && n <= o && h.push(n);
                return r.min = a, r.max = o, r._unit = s.unit || function(e, t, n, r) {
                        var a, o, l = i.duration(i(r).diff(i(n)));
                        for (a = c.length - 1; a >= c.indexOf(t); a--)
                            if (o = c[a], u[o].common && l.as(o) >= e.length) return o;
                        return c[t ? c.indexOf(t) : 0]
                    }(h, s.minUnit, r.min, r.max), r._majorUnit = _(r._unit), r._table = function(e, t, n, i) {
                        if ("linear" === i || !e.length) return [{
                            time: t,
                            pos: 0
                        }, {
                            time: n,
                            pos: 1
                        }];
                        var r, a, o, l, s, d = [],
                            u = [t];
                        for (r = 0, a = e.length; r < a; ++r)(l = e[r]) > t && l < n && u.push(l);
                        for (u.push(n), r = 0, a = u.length; r < a; ++r) s = u[r + 1], o = u[r - 1], l = u[r], void 0 !== o && void 0 !== s && Math.round((s + o) / 2) === l || d.push({
                            time: l,
                            pos: r / (a - 1)
                        });
                        return d
                    }(r._timestamps.data, a, o, l.distribution), r._offsets = function(e, t, n, i, r) {
                        var a, o, l = 0,
                            s = 0;
                        return r.offset && t.length && (r.time.min || (a = t.length > 1 ? t[1] : i, o = t[0], l = (f(e, "time", a, "pos") - f(e, "time", o, "pos")) / 2), r.time.max || (a = t[t.length - 1], o = t.length > 1 ? t[t.length - 2] : n, s = (f(e, "time", a, "pos") - f(e, "time", o, "pos")) / 2)), {
                            left: l,
                            right: s
                        }
                    }(r._table, h, a, o, l), r._labelFormat = function(e, t) {
                        var n, i, r, a = e.length;
                        for (n = 0; n < a; n++) {
                            if (0 !== (i = m(e[n], t)).millisecond()) return "MMM D, YYYY h:mm:ss.SSS a";
                            0 === i.second() && 0 === i.minute() && 0 === i.hour() || (r = !0)
                        }
                        return r ? "MMM D, YYYY h:mm:ss a" : "MMM D, YYYY"
                    }(r._timestamps.data, s),
                    function(e, t) {
                        var n, r, a, o, l = [];
                        for (n = 0, r = e.length; n < r; ++n) a = e[n], o = !!t && a === +i(a).startOf(t), l.push({
                            value: a,
                            major: o
                        });
                        return l
                    }(h, r._majorUnit)
            },
            getLabelForIndex: function(e, t) {
                var n = this.chart.data,
                    i = this.options.time,
                    r = n.labels && e < n.labels.length ? n.labels[e] : "",
                    o = n.datasets[t].data[e];
                return a.isObject(o) && (r = this.getRightValue(o)), i.tooltipFormat ? m(r, i).format(i.tooltipFormat) : "string" == typeof r ? r : m(r, i).format(this._labelFormat)
            },
            tickFormatFunction: function(e, t, n, i) {
                var r = this.options,
                    o = e.valueOf(),
                    l = r.time.displayFormats,
                    s = l[this._unit],
                    d = this._majorUnit,
                    u = l[d],
                    c = e.clone().startOf(d).valueOf(),
                    h = r.ticks.major,
                    p = h.enabled && d && u && o === c,
                    f = e.format(i || (p ? u : s)),
                    m = p ? h : r.ticks.minor,
                    g = a.valueOrDefault(m.callback, m.userCallback);
                return g ? g(f, t, n) : f
            },
            convertTicksToLabels: function(e) {
                var t, n, r = [];
                for (t = 0, n = e.length; t < n; ++t) r.push(this.tickFormatFunction(i(e[t].value), t, e));
                return r
            },
            getPixelForOffset: function(e) {
                var t = this,
                    n = t._horizontal ? t.width : t.height,
                    i = t._horizontal ? t.left : t.top,
                    r = f(t._table, "time", e, "pos");
                return i + n * (t._offsets.left + r) / (t._offsets.left + 1 + t._offsets.right)
            },
            getPixelForValue: function(e, t, n) {
                var i = null;
                if (void 0 !== t && void 0 !== n && (i = this._timestamps.datasets[n][t]), null === i && (i = g(e, this)), null !== i) return this.getPixelForOffset(i)
            },
            getPixelForTick: function(e) {
                var t = this.getTicks();
                return e >= 0 && e < t.length ? this.getPixelForOffset(t[e].value) : null
            },
            getValueForPixel: function(e) {
                var t = this,
                    n = t._horizontal ? t.width : t.height,
                    r = t._horizontal ? t.left : t.top,
                    a = (n ? (e - r) / n : 0) * (t._offsets.left + 1 + t._offsets.left) - t._offsets.right,
                    o = f(t._table, "pos", a, "time");
                return i(o)
            },
            getLabelWidth: function(e) {
                var t = this.options.ticks,
                    n = this.ctx.measureText(e).width,
                    i = a.toRadians(t.maxRotation),
                    o = Math.cos(i),
                    l = Math.sin(i);
                return n * o + a.valueOrDefault(t.fontSize, r.global.defaultFontSize) * l
            },
            getLabelCapacity: function(e) {
                var t = this,
                    n = t.options.time.displayFormats.millisecond,
                    r = t.tickFormatFunction(i(e), 0, [], n),
                    a = t.getLabelWidth(r),
                    o = t.isHorizontal() ? t.width : t.height,
                    l = Math.floor(o / a);
                return l > 0 ? l : 1
            }
        });
        l.registerScaleType("time", e, {
            position: "bottom",
            distribution: "linear",
            bounds: "data",
            time: {
                parser: !1,
                format: !1,
                unit: !1,
                round: !1,
                displayFormat: !1,
                isoWeekday: !1,
                minUnit: "millisecond",
                displayFormats: {
                    millisecond: "h:mm:ss.SSS a",
                    second: "h:mm:ss a",
                    minute: "h:mm a",
                    hour: "hA",
                    day: "MMM D",
                    week: "ll",
                    month: "MMM YYYY",
                    quarter: "[Q]Q - YYYY",
                    year: "YYYY"
                }
            },
            ticks: {
                autoSkip: !1,
                source: "auto",
                major: {
                    enabled: !1
                }
            }
        })
    }
},
function(e, t, n) {
    "use strict";
    var i = n(3),
        r = n(8),
        a = n(2);
    i._set("bar", {
        hover: {
            mode: "label"
        },
        scales: {
            xAxes: [{
                type: "category",
                categoryPercentage: .8,
                barPercentage: .9,
                offset: !0,
                gridLines: {
                    offsetGridLines: !0
                }
            }],
            yAxes: [{
                type: "linear"
            }]
        }
    }), i._set("horizontalBar", {
        hover: {
            mode: "index",
            axis: "y"
        },
        scales: {
            xAxes: [{
                type: "linear",
                position: "bottom"
            }],
            yAxes: [{
                position: "left",
                type: "category",
                categoryPercentage: .8,
                barPercentage: .9,
                offset: !0,
                gridLines: {
                    offsetGridLines: !0
                }
            }]
        },
        elements: {
            rectangle: {
                borderSkipped: "left"
            }
        },
        tooltips: {
            callbacks: {
                title: function(e, t) {
                    var n = "";
                    return e.length > 0 && (e[0].yLabel ? n = e[0].yLabel : t.labels.length > 0 && e[0].index < t.labels.length && (n = t.labels[e[0].index])), n
                },
                label: function(e, t) {
                    return (t.datasets[e.datasetIndex].label || "") + ": " + e.xLabel
                }
            },
            mode: "index",
            axis: "y"
        }
    }), e.exports = function(e) {
        e.controllers.bar = e.DatasetController.extend({
            dataElementType: r.Rectangle,
            initialize: function() {
                var t;
                e.DatasetController.prototype.initialize.apply(this, arguments), (t = this.getMeta()).stack = this.getDataset().stack, t.bar = !0
            },
            update: function(e) {
                var t, n, i = this.getMeta().data;
                for (this._ruler = this.getRuler(), t = 0, n = i.length; t < n; ++t) this.updateElement(i[t], t, e)
            },
            updateElement: function(e, t, n) {
                var i = this,
                    r = i.chart,
                    o = i.getMeta(),
                    l = i.getDataset(),
                    s = e.custom || {},
                    d = r.options.elements.rectangle;
                e._xScale = i.getScaleForId(o.xAxisID), e._yScale = i.getScaleForId(o.yAxisID), e._datasetIndex = i.index, e._index = t, e._model = {
                    datasetLabel: l.label,
                    label: r.data.labels[t],
                    borderSkipped: s.borderSkipped ? s.borderSkipped : d.borderSkipped,
                    backgroundColor: s.backgroundColor ? s.backgroundColor : a.valueAtIndexOrDefault(l.backgroundColor, t, d.backgroundColor),
                    borderColor: s.borderColor ? s.borderColor : a.valueAtIndexOrDefault(l.borderColor, t, d.borderColor),
                    borderWidth: s.borderWidth ? s.borderWidth : a.valueAtIndexOrDefault(l.borderWidth, t, d.borderWidth)
                }, i.updateElementGeometry(e, t, n), e.pivot()
            },
            updateElementGeometry: function(e, t, n) {
                var i = this,
                    r = e._model,
                    a = i.getValueScale(),
                    o = a.getBasePixel(),
                    l = a.isHorizontal(),
                    s = i._ruler || i.getRuler(),
                    d = i.calculateBarValuePixels(i.index, t),
                    u = i.calculateBarIndexPixels(i.index, t, s);
                r.horizontal = l, r.base = n ? o : d.base, r.x = l ? n ? o : d.head : u.center, r.y = l ? u.center : n ? o : d.head, r.height = l ? u.size : void 0, r.width = l ? void 0 : u.size
            },
            getValueScaleId: function() {
                return this.getMeta().yAxisID
            },
            getIndexScaleId: function() {
                return this.getMeta().xAxisID
            },
            getValueScale: function() {
                return this.getScaleForId(this.getValueScaleId())
            },
            getIndexScale: function() {
                return this.getScaleForId(this.getIndexScaleId())
            },
            _getStacks: function(e) {
                var t, n, i = this.chart,
                    r = this.getIndexScale().options.stacked,
                    a = void 0 === e ? i.data.datasets.length : e + 1,
                    o = [];
                for (t = 0; t < a; ++t)(n = i.getDatasetMeta(t)).bar && i.isDatasetVisible(t) && (!1 === r || !0 === r && -1 === o.indexOf(n.stack) || void 0 === r && (void 0 === n.stack || -1 === o.indexOf(n.stack))) && o.push(n.stack);
                return o
            },
            getStackCount: function() {
                return this._getStacks().length
            },
            getStackIndex: function(e, t) {
                var n = this._getStacks(e),
                    i = void 0 !== t ? n.indexOf(t) : -1;
                return -1 === i ? n.length - 1 : i
            },
            getRuler: function() {
                var e, t, n = this.getIndexScale(),
                    i = this.getStackCount(),
                    r = this.index,
                    o = n.isHorizontal(),
                    l = o ? n.left : n.top,
                    s = l + (o ? n.width : n.height),
                    d = [];
                for (e = 0, t = this.getMeta().data.length; e < t; ++e) d.push(n.getPixelForValue(null, e, r));
                return {
                    min: a.isNullOrUndef(n.options.barThickness) ? function(e, t) {
                        var n, i, r, a, o = e.isHorizontal() ? e.width : e.height,
                            l = e.getTicks();
                        for (r = 1, a = t.length; r < a; ++r) o = Math.min(o, t[r] - t[r - 1]);
                        for (r = 0, a = l.length; r < a; ++r) i = e.getPixelForTick(r), o = r > 0 ? Math.min(o, i - n) : o, n = i;
                        return o
                    }(n, d) : -1,
                    pixels: d,
                    start: l,
                    end: s,
                    stackCount: i,
                    scale: n
                }
            },
            calculateBarValuePixels: function(e, t) {
                var n, i, r, a, o, l, s = this.chart,
                    d = this.getMeta(),
                    u = this.getValueScale(),
                    c = s.data.datasets,
                    h = u.getRightValue(c[e].data[t]),
                    p = u.options.stacked,
                    f = d.stack,
                    m = 0;
                if (p || void 0 === p && void 0 !== f)
                    for (n = 0; n < e; ++n)(i = s.getDatasetMeta(n)).bar && i.stack === f && i.controller.getValueScaleId() === u.id && s.isDatasetVisible(n) && (r = u.getRightValue(c[n].data[t]), (h < 0 && r < 0 || h >= 0 && r > 0) && (m += r));
                return a = u.getPixelForValue(m), {
                    size: l = ((o = u.getPixelForValue(m + h)) - a) / 2,
                    base: a,
                    head: o,
                    center: o + l / 2
                }
            },
            calculateBarIndexPixels: function(e, t, n) {
                var i = n.scale.options,
                    r = "flex" === i.barThickness ? function(e, t, n) {
                        var i, r = t.pixels,
                            a = r[e],
                            o = e > 0 ? r[e - 1] : null,
                            l = e < r.length - 1 ? r[e + 1] : null,
                            s = n.categoryPercentage;
                        return null === o && (o = a - (null === l ? t.end - a : l - a)), null === l && (l = a + a - o), i = a - (a - o) / 2 * s, {
                            chunk: (l - o) / 2 * s / t.stackCount,
                            ratio: n.barPercentage,
                            start: i
                        }
                    }(t, n, i) : function(e, t, n) {
                        var i, r, o = n.barThickness,
                            l = t.stackCount,
                            s = t.pixels[e];
                        return a.isNullOrUndef(o) ? (i = t.min * n.categoryPercentage, r = n.barPercentage) : (i = o * l, r = 1), {
                            chunk: i / l,
                            ratio: r,
                            start: s - i / 2
                        }
                    }(t, n, i),
                    o = this.getStackIndex(e, this.getMeta().stack),
                    l = r.start + r.chunk * o + r.chunk / 2,
                    s = Math.min(a.valueOrDefault(i.maxBarThickness, 1 / 0), r.chunk * r.ratio);
                return {
                    base: l - s / 2,
                    head: l + s / 2,
                    center: l,
                    size: s
                }
            },
            draw: function() {
                var e = this.chart,
                    t = this.getValueScale(),
                    n = this.getMeta().data,
                    i = this.getDataset(),
                    r = n.length,
                    o = 0;
                for (a.canvas.clipArea(e.ctx, e.chartArea); o < r; ++o) isNaN(t.getRightValue(i.data[o])) || n[o].draw();
                a.canvas.unclipArea(e.ctx)
            }
        }), e.controllers.horizontalBar = e.controllers.bar.extend({
            getValueScaleId: function() {
                return this.getMeta().xAxisID
            },
            getIndexScaleId: function() {
                return this.getMeta().yAxisID
            }
        })
    }
},
function(e, t, n) {
    "use strict";
    var i = n(3),
        r = n(8),
        a = n(2);
    i._set("bubble", {
        hover: {
            mode: "single"
        },
        scales: {
            xAxes: [{
                type: "linear",
                position: "bottom",
                id: "x-axis-0"
            }],
            yAxes: [{
                type: "linear",
                position: "left",
                id: "y-axis-0"
            }]
        },
        tooltips: {
            callbacks: {
                title: function() {
                    return ""
                },
                label: function(e, t) {
                    var n = t.datasets[e.datasetIndex].label || "",
                        i = t.datasets[e.datasetIndex].data[e.index];
                    return n + ": (" + e.xLabel + ", " + e.yLabel + ", " + i.r + ")"
                }
            }
        }
    }), e.exports = function(e) {
        e.controllers.bubble = e.DatasetController.extend({
            dataElementType: r.Point,
            update: function(e) {
                var t = this,
                    n = t.getMeta().data;
                a.each(n, function(n, i) {
                    t.updateElement(n, i, e)
                })
            },
            updateElement: function(e, t, n) {
                var i = this,
                    r = i.getMeta(),
                    a = e.custom || {},
                    o = i.getScaleForId(r.xAxisID),
                    l = i.getScaleForId(r.yAxisID),
                    s = i._resolveElementOptions(e, t),
                    d = i.getDataset().data[t],
                    u = i.index,
                    c = n ? o.getPixelForDecimal(.5) : o.getPixelForValue("object" == typeof d ? d : NaN, t, u),
                    h = n ? l.getBasePixel() : l.getPixelForValue(d, t, u);
                e._xScale = o, e._yScale = l, e._options = s, e._datasetIndex = u, e._index = t, e._model = {
                    backgroundColor: s.backgroundColor,
                    borderColor: s.borderColor,
                    borderWidth: s.borderWidth,
                    hitRadius: s.hitRadius,
                    pointStyle: s.pointStyle,
                    rotation: s.rotation,
                    radius: n ? 0 : s.radius,
                    skip: a.skip || isNaN(c) || isNaN(h),
                    x: c,
                    y: h
                }, e.pivot()
            },
            setHoverStyle: function(e) {
                var t = e._model,
                    n = e._options;
                e.$previousStyle = {
                    backgroundColor: t.backgroundColor,
                    borderColor: t.borderColor,
                    borderWidth: t.borderWidth,
                    radius: t.radius
                }, t.backgroundColor = a.valueOrDefault(n.hoverBackgroundColor, a.getHoverColor(n.backgroundColor)), t.borderColor = a.valueOrDefault(n.hoverBorderColor, a.getHoverColor(n.borderColor)), t.borderWidth = a.valueOrDefault(n.hoverBorderWidth, n.borderWidth), t.radius = n.radius + n.hoverRadius
            },
            _resolveElementOptions: function(e, t) {
                var n, i, r, o = this.chart,
                    l = o.data.datasets[this.index],
                    s = e.custom || {},
                    d = o.options.elements.point,
                    u = a.options.resolve,
                    c = l.data[t],
                    h = {},
                    p = {
                        chart: o,
                        dataIndex: t,
                        dataset: l,
                        datasetIndex: this.index
                    },
                    f = ["backgroundColor", "borderColor", "borderWidth", "hoverBackgroundColor", "hoverBorderColor", "hoverBorderWidth", "hoverRadius", "hitRadius", "pointStyle", "rotation"];
                for (n = 0, i = f.length; n < i; ++n) h[r = f[n]] = u([s[r], l[r], d[r]], p, t);
                return h.radius = u([s.radius, c ? c.r : void 0, l.radius, d.radius], p, t), h
            }
        })
    }
},
function(e, t, n) {
    "use strict";
    var i = n(3),
        r = n(8),
        a = n(2);
    i._set("doughnut", {
        animation: {
            animateRotate: !0,
            animateScale: !1
        },
        hover: {
            mode: "single"
        },
        legendCallback: function(e) {
            var t = [];
            t.push('<ul class="' + e.id + '-legend">');
            var n = e.data,
                i = n.datasets,
                r = n.labels;
            if (i.length)
                for (var a = 0; a < i[0].data.length; ++a) t.push('<li><span style="background-color:' + i[0].backgroundColor[a] + '"></span>'), r[a] && t.push(r[a]), t.push("</li>");
            return t.push("</ul>"), t.join("")
        },
        legend: {
            labels: {
                generateLabels: function(e) {
                    var t = e.data;
                    return t.labels.length && t.datasets.length ? t.labels.map(function(n, i) {
                        var r = e.getDatasetMeta(0),
                            o = t.datasets[0],
                            l = r.data[i],
                            s = l && l.custom || {},
                            d = a.valueAtIndexOrDefault,
                            u = e.options.elements.arc;
                        return {
                            text: n,
                            fillStyle: s.backgroundColor ? s.backgroundColor : d(o.backgroundColor, i, u.backgroundColor),
                            strokeStyle: s.borderColor ? s.borderColor : d(o.borderColor, i, u.borderColor),
                            lineWidth: s.borderWidth ? s.borderWidth : d(o.borderWidth, i, u.borderWidth),
                            hidden: isNaN(o.data[i]) || r.data[i].hidden,
                            index: i
                        }
                    }) : []
                }
            },
            onClick: function(e, t) {
                var n, i, r, a = t.index,
                    o = this.chart;
                for (n = 0, i = (o.data.datasets || []).length; n < i; ++n)(r = o.getDatasetMeta(n)).data[a] && (r.data[a].hidden = !r.data[a].hidden);
                o.update()
            }
        },
        cutoutPercentage: 50,
        rotation: -.5 * Math.PI,
        circumference: 2 * Math.PI,
        tooltips: {
            callbacks: {
                title: function() {
                    return ""
                },
                label: function(e, t) {
                    var n = t.labels[e.index],
                        i = ": " + t.datasets[e.datasetIndex].data[e.index];
                    return a.isArray(n) ? (n = n.slice())[0] += i : n += i, n
                }
            }
        }
    }), i._set("pie", a.clone(i.doughnut)), i._set("pie", {
        cutoutPercentage: 0
    }), e.exports = function(e) {
        e.controllers.doughnut = e.controllers.pie = e.DatasetController.extend({
            dataElementType: r.Arc,
            linkScales: a.noop,
            getRingIndex: function(e) {
                for (var t = 0, n = 0; n < e; ++n) this.chart.isDatasetVisible(n) && ++t;
                return t
            },
            update: function(e) {
                var t = this,
                    n = t.chart,
                    i = n.chartArea,
                    r = n.options,
                    o = r.elements.arc,
                    l = i.right - i.left - o.borderWidth,
                    s = i.bottom - i.top - o.borderWidth,
                    d = Math.min(l, s),
                    u = {
                        x: 0,
                        y: 0
                    },
                    c = t.getMeta(),
                    h = r.cutoutPercentage,
                    p = r.circumference;
                if (p < 2 * Math.PI) {
                    var f = r.rotation % (2 * Math.PI),
                        m = (f += 2 * Math.PI * (f >= Math.PI ? -1 : f < -Math.PI ? 1 : 0)) + p,
                        g = {
                            x: Math.cos(f),
                            y: Math.sin(f)
                        },
                        _ = {
                            x: Math.cos(m),
                            y: Math.sin(m)
                        },
                        y = f <= 0 && m >= 0 || f <= 2 * Math.PI && 2 * Math.PI <= m,
                        v = f <= .5 * Math.PI && .5 * Math.PI <= m || f <= 2.5 * Math.PI && 2.5 * Math.PI <= m,
                        M = f <= -Math.PI && -Math.PI <= m || f <= Math.PI && Math.PI <= m,
                        b = f <= .5 * -Math.PI && .5 * -Math.PI <= m || f <= 1.5 * Math.PI && 1.5 * Math.PI <= m,
                        w = h / 100,
                        L = {
                            x: M ? -1 : Math.min(g.x * (g.x < 0 ? 1 : w), _.x * (_.x < 0 ? 1 : w)),
                            y: b ? -1 : Math.min(g.y * (g.y < 0 ? 1 : w), _.y * (_.y < 0 ? 1 : w))
                        },
                        D = {
                            x: y ? 1 : Math.max(g.x * (g.x > 0 ? 1 : w), _.x * (_.x > 0 ? 1 : w)),
                            y: v ? 1 : Math.max(g.y * (g.y > 0 ? 1 : w), _.y * (_.y > 0 ? 1 : w))
                        },
                        T = {
                            width: .5 * (D.x - L.x),
                            height: .5 * (D.y - L.y)
                        };
                    d = Math.min(l / T.width, s / T.height), u = {
                        x: -.5 * (D.x + L.x),
                        y: -.5 * (D.y + L.y)
                    }
                }
                n.borderWidth = t.getMaxBorderWidth(c.data), n.outerRadius = Math.max((d - n.borderWidth) / 2, 0), n.innerRadius = Math.max(h ? n.outerRadius / 100 * h : 0, 0), n.radiusLength = (n.outerRadius - n.innerRadius) / n.getVisibleDatasetCount(), n.offsetX = u.x * n.outerRadius, n.offsetY = u.y * n.outerRadius, c.total = t.calculateTotal(), t.outerRadius = n.outerRadius - n.radiusLength * t.getRingIndex(t.index), t.innerRadius = Math.max(t.outerRadius - n.radiusLength, 0), a.each(c.data, function(n, i) {
                    t.updateElement(n, i, e)
                })
            },
            updateElement: function(e, t, n) {
                var i = this,
                    r = i.chart,
                    o = r.chartArea,
                    l = r.options,
                    s = l.animation,
                    d = (o.left + o.right) / 2,
                    u = (o.top + o.bottom) / 2,
                    c = l.rotation,
                    h = l.rotation,
                    p = i.getDataset(),
                    f = n && s.animateRotate ? 0 : e.hidden ? 0 : i.calculateCircumference(p.data[t]) * (l.circumference / (2 * Math.PI)),
                    m = n && s.animateScale ? 0 : i.innerRadius,
                    g = n && s.animateScale ? 0 : i.outerRadius,
                    _ = a.valueAtIndexOrDefault;
                a.extend(e, {
                    _datasetIndex: i.index,
                    _index: t,
                    _model: {
                        x: d + r.offsetX,
                        y: u + r.offsetY,
                        startAngle: c,
                        endAngle: h,
                        circumference: f,
                        outerRadius: g,
                        innerRadius: m,
                        label: _(p.label, t, r.data.labels[t])
                    }
                });
                var y = e._model,
                    v = e.custom || {},
                    M = a.valueAtIndexOrDefault,
                    b = this.chart.options.elements.arc;
                y.backgroundColor = v.backgroundColor ? v.backgroundColor : M(p.backgroundColor, t, b.backgroundColor), y.borderColor = v.borderColor ? v.borderColor : M(p.borderColor, t, b.borderColor), y.borderWidth = v.borderWidth ? v.borderWidth : M(p.borderWidth, t, b.borderWidth), n && s.animateRotate || (y.startAngle = 0 === t ? l.rotation : i.getMeta().data[t - 1]._model.endAngle, y.endAngle = y.startAngle + y.circumference), e.pivot()
            },
            calculateTotal: function() {
                var e, t = this.getDataset(),
                    n = this.getMeta(),
                    i = 0;
                return a.each(n.data, function(n, r) {
                    e = t.data[r], isNaN(e) || n.hidden || (i += Math.abs(e))
                }), i
            },
            calculateCircumference: function(e) {
                var t = this.getMeta().total;
                return t > 0 && !isNaN(e) ? 2 * Math.PI * (Math.abs(e) / t) : 0
            },
            getMaxBorderWidth: function(e) {
                for (var t, n, i = 0, r = this.index, a = e.length, o = 0; o < a; o++) t = e[o]._model ? e[o]._model.borderWidth : 0, i = (n = e[o]._chart ? e[o]._chart.config.data.datasets[r].hoverBorderWidth : 0) > (i = t > i ? t : i) ? n : i;
                return i
            }
        })
    }
},
function(e, t, n) {
    "use strict";
    var i = n(3),
        r = n(8),
        a = n(2);
    i._set("line", {
        showLines: !0,
        spanGaps: !1,
        hover: {
            mode: "label"
        },
        scales: {
            xAxes: [{
                type: "category",
                id: "x-axis-0"
            }],
            yAxes: [{
                type: "linear",
                id: "y-axis-0"
            }]
        }
    }), e.exports = function(e) {
        function t(e, t) {
            return a.valueOrDefault(e.showLine, t.showLines)
        }
        e.controllers.line = e.DatasetController.extend({
            datasetElementType: r.Line,
            dataElementType: r.Point,
            update: function(e) {
                var n, i, r, o = this,
                    l = o.getMeta(),
                    s = l.dataset,
                    d = l.data || [],
                    u = o.chart.options,
                    c = u.elements.line,
                    h = o.getScaleForId(l.yAxisID),
                    p = o.getDataset(),
                    f = t(p, u);
                for (f && (r = s.custom || {}, void 0 !== p.tension && void 0 === p.lineTension && (p.lineTension = p.tension), s._scale = h, s._datasetIndex = o.index, s._children = d, s._model = {
                        spanGaps: p.spanGaps ? p.spanGaps : u.spanGaps,
                        tension: r.tension ? r.tension : a.valueOrDefault(p.lineTension, c.tension),
                        backgroundColor: r.backgroundColor ? r.backgroundColor : p.backgroundColor || c.backgroundColor,
                        borderWidth: r.borderWidth ? r.borderWidth : p.borderWidth || c.borderWidth,
                        borderColor: r.borderColor ? r.borderColor : p.borderColor || c.borderColor,
                        borderCapStyle: r.borderCapStyle ? r.borderCapStyle : p.borderCapStyle || c.borderCapStyle,
                        borderDash: r.borderDash ? r.borderDash : p.borderDash || c.borderDash,
                        borderDashOffset: r.borderDashOffset ? r.borderDashOffset : p.borderDashOffset || c.borderDashOffset,
                        borderJoinStyle: r.borderJoinStyle ? r.borderJoinStyle : p.borderJoinStyle || c.borderJoinStyle,
                        fill: r.fill ? r.fill : void 0 !== p.fill ? p.fill : c.fill,
                        steppedLine: r.steppedLine ? r.steppedLine : a.valueOrDefault(p.steppedLine, c.stepped),
                        cubicInterpolationMode: r.cubicInterpolationMode ? r.cubicInterpolationMode : a.valueOrDefault(p.cubicInterpolationMode, c.cubicInterpolationMode)
                    }, s.pivot()), n = 0, i = d.length; n < i; ++n) o.updateElement(d[n], n, e);
                for (f && 0 !== s._model.tension && o.updateBezierControlPoints(), n = 0, i = d.length; n < i; ++n) d[n].pivot()
            },
            getPointBackgroundColor: function(e, t) {
                var n = this.chart.options.elements.point.backgroundColor,
                    i = this.getDataset(),
                    r = e.custom || {};
                return r.backgroundColor ? n = r.backgroundColor : i.pointBackgroundColor ? n = a.valueAtIndexOrDefault(i.pointBackgroundColor, t, n) : i.backgroundColor && (n = i.backgroundColor), n
            },
            getPointBorderColor: function(e, t) {
                var n = this.chart.options.elements.point.borderColor,
                    i = this.getDataset(),
                    r = e.custom || {};
                return r.borderColor ? n = r.borderColor : i.pointBorderColor ? n = a.valueAtIndexOrDefault(i.pointBorderColor, t, n) : i.borderColor && (n = i.borderColor), n
            },
            getPointBorderWidth: function(e, t) {
                var n = this.chart.options.elements.point.borderWidth,
                    i = this.getDataset(),
                    r = e.custom || {};
                return isNaN(r.borderWidth) ? !isNaN(i.pointBorderWidth) || a.isArray(i.pointBorderWidth) ? n = a.valueAtIndexOrDefault(i.pointBorderWidth, t, n) : isNaN(i.borderWidth) || (n = i.borderWidth) : n = r.borderWidth, n
            },
            getPointRotation: function(e, t) {
                var n = this.chart.options.elements.point.rotation,
                    i = this.getDataset(),
                    r = e.custom || {};
                return isNaN(r.rotation) ? isNaN(i.pointRotation) && !a.isArray(i.pointRotation) || (n = a.valueAtIndexOrDefault(i.pointRotation, t, n)) : n = r.rotation, n
            },
            updateElement: function(e, t, n) {
                var i, r, o = this,
                    l = o.getMeta(),
                    s = e.custom || {},
                    d = o.getDataset(),
                    u = o.index,
                    c = d.data[t],
                    h = o.getScaleForId(l.yAxisID),
                    p = o.getScaleForId(l.xAxisID),
                    f = o.chart.options.elements.point;
                void 0 !== d.radius && void 0 === d.pointRadius && (d.pointRadius = d.radius), void 0 !== d.hitRadius && void 0 === d.pointHitRadius && (d.pointHitRadius = d.hitRadius), i = p.getPixelForValue("object" == typeof c ? c : NaN, t, u), r = n ? h.getBasePixel() : o.calculatePointY(c, t, u), e._xScale = p, e._yScale = h, e._datasetIndex = u, e._index = t, e._model = {
                    x: i,
                    y: r,
                    skip: s.skip || isNaN(i) || isNaN(r),
                    radius: s.radius || a.valueAtIndexOrDefault(d.pointRadius, t, f.radius),
                    pointStyle: s.pointStyle || a.valueAtIndexOrDefault(d.pointStyle, t, f.pointStyle),
                    rotation: o.getPointRotation(e, t),
                    backgroundColor: o.getPointBackgroundColor(e, t),
                    borderColor: o.getPointBorderColor(e, t),
                    borderWidth: o.getPointBorderWidth(e, t),
                    tension: l.dataset._model ? l.dataset._model.tension : 0,
                    steppedLine: !!l.dataset._model && l.dataset._model.steppedLine,
                    hitRadius: s.hitRadius || a.valueAtIndexOrDefault(d.pointHitRadius, t, f.hitRadius)
                }
            },
            calculatePointY: function(e, t, n) {
                var i, r, a, o = this.chart,
                    l = this.getMeta(),
                    s = this.getScaleForId(l.yAxisID),
                    d = 0,
                    u = 0;
                if (s.options.stacked) {
                    for (i = 0; i < n; i++)
                        if (r = o.data.datasets[i], "line" === (a = o.getDatasetMeta(i)).type && a.yAxisID === s.id && o.isDatasetVisible(i)) {
                            var c = Number(s.getRightValue(r.data[t]));
                            c < 0 ? u += c || 0 : d += c || 0
                        } var h = Number(s.getRightValue(e));
                    return h < 0 ? s.getPixelForValue(u + h) : s.getPixelForValue(d + h)
                }
                return s.getPixelForValue(e)
            },
            updateBezierControlPoints: function() {
                var e, t, n, i, r = this.getMeta(),
                    o = this.chart.chartArea,
                    l = r.data || [];

                function s(e, t, n) {
                    return Math.max(Math.min(e, n), t)
                }
                if (r.dataset._model.spanGaps && (l = l.filter(function(e) {
                        return !e._model.skip
                    })), "monotone" === r.dataset._model.cubicInterpolationMode) a.splineCurveMonotone(l);
                else
                    for (e = 0, t = l.length; e < t; ++e) n = l[e]._model, i = a.splineCurve(a.previousItem(l, e)._model, n, a.nextItem(l, e)._model, r.dataset._model.tension), n.controlPointPreviousX = i.previous.x, n.controlPointPreviousY = i.previous.y, n.controlPointNextX = i.next.x, n.controlPointNextY = i.next.y;
                if (this.chart.options.elements.line.capBezierPoints)
                    for (e = 0, t = l.length; e < t; ++e)(n = l[e]._model).controlPointPreviousX = s(n.controlPointPreviousX, o.left, o.right), n.controlPointPreviousY = s(n.controlPointPreviousY, o.top, o.bottom), n.controlPointNextX = s(n.controlPointNextX, o.left, o.right), n.controlPointNextY = s(n.controlPointNextY, o.top, o.bottom)
            },
            draw: function() {
                var e, n = this.chart,
                    i = this.getMeta(),
                    r = i.data || [],
                    o = n.chartArea,
                    l = r.length,
                    s = 0;
                for (t(this.getDataset(), n.options) && (e = (i.dataset._model.borderWidth || 0) / 2, a.canvas.clipArea(n.ctx, {
                        left: o.left,
                        right: o.right,
                        top: o.top - e,
                        bottom: o.bottom + e
                    }), i.dataset.draw(), a.canvas.unclipArea(n.ctx)); s < l; ++s) r[s].draw(o)
            },
            setHoverStyle: function(e) {
                var t = this.chart.data.datasets[e._datasetIndex],
                    n = e._index,
                    i = e.custom || {},
                    r = e._model;
                e.$previousStyle = {
                    backgroundColor: r.backgroundColor,
                    borderColor: r.borderColor,
                    borderWidth: r.borderWidth,
                    radius: r.radius
                }, r.backgroundColor = i.hoverBackgroundColor || a.valueAtIndexOrDefault(t.pointHoverBackgroundColor, n, a.getHoverColor(r.backgroundColor)), r.borderColor = i.hoverBorderColor || a.valueAtIndexOrDefault(t.pointHoverBorderColor, n, a.getHoverColor(r.borderColor)), r.borderWidth = i.hoverBorderWidth || a.valueAtIndexOrDefault(t.pointHoverBorderWidth, n, r.borderWidth), r.radius = i.hoverRadius || a.valueAtIndexOrDefault(t.pointHoverRadius, n, this.chart.options.elements.point.hoverRadius)
            }
        })
    }
},
function(e, t, n) {
    "use strict";
    var i = n(3),
        r = n(8),
        a = n(2);
    i._set("polarArea", {
        scale: {
            type: "radialLinear",
            angleLines: {
                display: !1
            },
            gridLines: {
                circular: !0
            },
            pointLabels: {
                display: !1
            },
            ticks: {
                beginAtZero: !0
            }
        },
        animation: {
            animateRotate: !0,
            animateScale: !0
        },
        startAngle: -.5 * Math.PI,
        legendCallback: function(e) {
            var t = [];
            t.push('<ul class="' + e.id + '-legend">');
            var n = e.data,
                i = n.datasets,
                r = n.labels;
            if (i.length)
                for (var a = 0; a < i[0].data.length; ++a) t.push('<li><span style="background-color:' + i[0].backgroundColor[a] + '"></span>'), r[a] && t.push(r[a]), t.push("</li>");
            return t.push("</ul>"), t.join("")
        },
        legend: {
            labels: {
                generateLabels: function(e) {
                    var t = e.data;
                    return t.labels.length && t.datasets.length ? t.labels.map(function(n, i) {
                        var r = e.getDatasetMeta(0),
                            o = t.datasets[0],
                            l = r.data[i].custom || {},
                            s = a.valueAtIndexOrDefault,
                            d = e.options.elements.arc;
                        return {
                            text: n,
                            fillStyle: l.backgroundColor ? l.backgroundColor : s(o.backgroundColor, i, d.backgroundColor),
                            strokeStyle: l.borderColor ? l.borderColor : s(o.borderColor, i, d.borderColor),
                            lineWidth: l.borderWidth ? l.borderWidth : s(o.borderWidth, i, d.borderWidth),
                            hidden: isNaN(o.data[i]) || r.data[i].hidden,
                            index: i
                        }
                    }) : []
                }
            },
            onClick: function(e, t) {
                var n, i, r, a = t.index,
                    o = this.chart;
                for (n = 0, i = (o.data.datasets || []).length; n < i; ++n)(r = o.getDatasetMeta(n)).data[a].hidden = !r.data[a].hidden;
                o.update()
            }
        },
        tooltips: {
            callbacks: {
                title: function() {
                    return ""
                },
                label: function(e, t) {
                    return t.labels[e.index] + ": " + e.yLabel
                }
            }
        }
    }), e.exports = function(e) {
        e.controllers.polarArea = e.DatasetController.extend({
            dataElementType: r.Arc,
            linkScales: a.noop,
            update: function(e) {
                var t, n, i, r = this,
                    o = r.getDataset(),
                    l = r.getMeta(),
                    s = r.chart.options.startAngle || 0,
                    d = r._starts = [],
                    u = r._angles = [];
                for (r._updateRadius(), l.count = r.countVisibleElements(), t = 0, n = o.data.length; t < n; t++) d[t] = s, i = r._computeAngle(t), u[t] = i, s += i;
                a.each(l.data, function(t, n) {
                    r.updateElement(t, n, e)
                })
            },
            _updateRadius: function() {
                var e = this,
                    t = e.chart,
                    n = t.chartArea,
                    i = t.options,
                    r = i.elements.arc,
                    a = Math.min(n.right - n.left, n.bottom - n.top);
                t.outerRadius = Math.max((a - r.borderWidth / 2) / 2, 0), t.innerRadius = Math.max(i.cutoutPercentage ? t.outerRadius / 100 * i.cutoutPercentage : 1, 0), t.radiusLength = (t.outerRadius - t.innerRadius) / t.getVisibleDatasetCount(), e.outerRadius = t.outerRadius - t.radiusLength * e.index, e.innerRadius = e.outerRadius - t.radiusLength
            },
            updateElement: function(e, t, n) {
                var i = this,
                    r = i.chart,
                    o = i.getDataset(),
                    l = r.options,
                    s = l.animation,
                    d = r.scale,
                    u = r.data.labels,
                    c = d.xCenter,
                    h = d.yCenter,
                    p = l.startAngle,
                    f = e.hidden ? 0 : d.getDistanceFromCenterForValue(o.data[t]),
                    m = i._starts[t],
                    g = m + (e.hidden ? 0 : i._angles[t]),
                    _ = s.animateScale ? 0 : d.getDistanceFromCenterForValue(o.data[t]);
                a.extend(e, {
                    _datasetIndex: i.index,
                    _index: t,
                    _scale: d,
                    _model: {
                        x: c,
                        y: h,
                        innerRadius: 0,
                        outerRadius: n ? _ : f,
                        startAngle: n && s.animateRotate ? p : m,
                        endAngle: n && s.animateRotate ? p : g,
                        label: a.valueAtIndexOrDefault(u, t, u[t])
                    }
                });
                var y = this.chart.options.elements.arc,
                    v = e.custom || {},
                    M = a.valueAtIndexOrDefault,
                    b = e._model;
                b.backgroundColor = v.backgroundColor ? v.backgroundColor : M(o.backgroundColor, t, y.backgroundColor), b.borderColor = v.borderColor ? v.borderColor : M(o.borderColor, t, y.borderColor), b.borderWidth = v.borderWidth ? v.borderWidth : M(o.borderWidth, t, y.borderWidth), e.pivot()
            },
            countVisibleElements: function() {
                var e = this.getDataset(),
                    t = this.getMeta(),
                    n = 0;
                return a.each(t.data, function(t, i) {
                    isNaN(e.data[i]) || t.hidden || n++
                }), n
            },
            _computeAngle: function(e) {
                var t = this,
                    n = this.getMeta().count,
                    i = t.getDataset(),
                    r = t.getMeta();
                if (isNaN(i.data[e]) || r.data[e].hidden) return 0;
                var o = {
                    chart: t.chart,
                    dataIndex: e,
                    dataset: i,
                    datasetIndex: t.index
                };
                return a.options.resolve([t.chart.options.elements.arc.angle, 2 * Math.PI / n], o, e)
            }
        })
    }
},
function(e, t, n) {
    "use strict";
    var i = n(3),
        r = n(8),
        a = n(2);
    i._set("radar", {
        scale: {
            type: "radialLinear"
        },
        elements: {
            line: {
                tension: 0
            }
        }
    }), e.exports = function(e) {
        e.controllers.radar = e.DatasetController.extend({
            datasetElementType: r.Line,
            dataElementType: r.Point,
            linkScales: a.noop,
            update: function(e) {
                var t = this,
                    n = t.getMeta(),
                    i = n.dataset,
                    r = n.data,
                    o = i.custom || {},
                    l = t.getDataset(),
                    s = t.chart.options.elements.line,
                    d = t.chart.scale;
                void 0 !== l.tension && void 0 === l.lineTension && (l.lineTension = l.tension), a.extend(n.dataset, {
                    _datasetIndex: t.index,
                    _scale: d,
                    _children: r,
                    _loop: !0,
                    _model: {
                        tension: o.tension ? o.tension : a.valueOrDefault(l.lineTension, s.tension),
                        backgroundColor: o.backgroundColor ? o.backgroundColor : l.backgroundColor || s.backgroundColor,
                        borderWidth: o.borderWidth ? o.borderWidth : l.borderWidth || s.borderWidth,
                        borderColor: o.borderColor ? o.borderColor : l.borderColor || s.borderColor,
                        fill: o.fill ? o.fill : void 0 !== l.fill ? l.fill : s.fill,
                        borderCapStyle: o.borderCapStyle ? o.borderCapStyle : l.borderCapStyle || s.borderCapStyle,
                        borderDash: o.borderDash ? o.borderDash : l.borderDash || s.borderDash,
                        borderDashOffset: o.borderDashOffset ? o.borderDashOffset : l.borderDashOffset || s.borderDashOffset,
                        borderJoinStyle: o.borderJoinStyle ? o.borderJoinStyle : l.borderJoinStyle || s.borderJoinStyle
                    }
                }), n.dataset.pivot(), a.each(r, function(n, i) {
                    t.updateElement(n, i, e)
                }, t), t.updateBezierControlPoints()
            },
            updateElement: function(e, t, n) {
                var i = this,
                    r = e.custom || {},
                    o = i.getDataset(),
                    l = i.chart.scale,
                    s = i.chart.options.elements.point,
                    d = l.getPointPositionForValue(t, o.data[t]);
                void 0 !== o.radius && void 0 === o.pointRadius && (o.pointRadius = o.radius), void 0 !== o.hitRadius && void 0 === o.pointHitRadius && (o.pointHitRadius = o.hitRadius), a.extend(e, {
                    _datasetIndex: i.index,
                    _index: t,
                    _scale: l,
                    _model: {
                        x: n ? l.xCenter : d.x,
                        y: n ? l.yCenter : d.y,
                        tension: r.tension ? r.tension : a.valueOrDefault(o.lineTension, i.chart.options.elements.line.tension),
                        radius: r.radius ? r.radius : a.valueAtIndexOrDefault(o.pointRadius, t, s.radius),
                        backgroundColor: r.backgroundColor ? r.backgroundColor : a.valueAtIndexOrDefault(o.pointBackgroundColor, t, s.backgroundColor),
                        borderColor: r.borderColor ? r.borderColor : a.valueAtIndexOrDefault(o.pointBorderColor, t, s.borderColor),
                        borderWidth: r.borderWidth ? r.borderWidth : a.valueAtIndexOrDefault(o.pointBorderWidth, t, s.borderWidth),
                        pointStyle: r.pointStyle ? r.pointStyle : a.valueAtIndexOrDefault(o.pointStyle, t, s.pointStyle),
                        rotation: r.rotation ? r.rotation : a.valueAtIndexOrDefault(o.pointRotation, t, s.rotation),
                        hitRadius: r.hitRadius ? r.hitRadius : a.valueAtIndexOrDefault(o.pointHitRadius, t, s.hitRadius)
                    }
                }), e._model.skip = r.skip ? r.skip : isNaN(e._model.x) || isNaN(e._model.y)
            },
            updateBezierControlPoints: function() {
                var e = this.chart.chartArea,
                    t = this.getMeta();
                a.each(t.data, function(n, i) {
                    var r = n._model,
                        o = a.splineCurve(a.previousItem(t.data, i, !0)._model, r, a.nextItem(t.data, i, !0)._model, r.tension);
                    r.controlPointPreviousX = Math.max(Math.min(o.previous.x, e.right), e.left), r.controlPointPreviousY = Math.max(Math.min(o.previous.y, e.bottom), e.top), r.controlPointNextX = Math.max(Math.min(o.next.x, e.right), e.left), r.controlPointNextY = Math.max(Math.min(o.next.y, e.bottom), e.top), n.pivot()
                })
            },
            setHoverStyle: function(e) {
                var t = this.chart.data.datasets[e._datasetIndex],
                    n = e.custom || {},
                    i = e._index,
                    r = e._model;
                e.$previousStyle = {
                    backgroundColor: r.backgroundColor,
                    borderColor: r.borderColor,
                    borderWidth: r.borderWidth,
                    radius: r.radius
                }, r.radius = n.hoverRadius ? n.hoverRadius : a.valueAtIndexOrDefault(t.pointHoverRadius, i, this.chart.options.elements.point.hoverRadius), r.backgroundColor = n.hoverBackgroundColor ? n.hoverBackgroundColor : a.valueAtIndexOrDefault(t.pointHoverBackgroundColor, i, a.getHoverColor(r.backgroundColor)), r.borderColor = n.hoverBorderColor ? n.hoverBorderColor : a.valueAtIndexOrDefault(t.pointHoverBorderColor, i, a.getHoverColor(r.borderColor)), r.borderWidth = n.hoverBorderWidth ? n.hoverBorderWidth : a.valueAtIndexOrDefault(t.pointHoverBorderWidth, i, r.borderWidth)
            }
        })
    }
},
function(e, t, n) {
    "use strict";
    n(3)._set("scatter", {
        hover: {
            mode: "single"
        },
        scales: {
            xAxes: [{
                id: "x-axis-1",
                type: "linear",
                position: "bottom"
            }],
            yAxes: [{
                id: "y-axis-1",
                type: "linear",
                position: "left"
            }]
        },
        showLines: !1,
        tooltips: {
            callbacks: {
                title: function() {
                    return ""
                },
                label: function(e) {
                    return "(" + e.xLabel + ", " + e.yLabel + ")"
                }
            }
        }
    }), e.exports = function(e) {
        e.controllers.scatter = e.controllers.line
    }
},
function(e, t, n) {
    "use strict";
    e.exports = function(e) {
        e.Bar = function(t, n) {
            return n.type = "bar", new e(t, n)
        }
    }
},
function(e, t, n) {
    "use strict";
    e.exports = function(e) {
        e.Bubble = function(t, n) {
            return n.type = "bubble", new e(t, n)
        }
    }
},
function(e, t, n) {
    "use strict";
    e.exports = function(e) {
        e.Doughnut = function(t, n) {
            return n.type = "doughnut", new e(t, n)
        }
    }
},
function(e, t, n) {
    "use strict";
    e.exports = function(e) {
        e.Line = function(t, n) {
            return n.type = "line", new e(t, n)
        }
    }
},
function(e, t, n) {
    "use strict";
    e.exports = function(e) {
        e.PolarArea = function(t, n) {
            return n.type = "polarArea", new e(t, n)
        }
    }
},
function(e, t, n) {
    "use strict";
    e.exports = function(e) {
        e.Radar = function(t, n) {
            return n.type = "radar", new e(t, n)
        }
    }
},
function(e, t, n) {
    "use strict";
    e.exports = function(e) {
        e.Scatter = function(t, n) {
            return n.type = "scatter", new e(t, n)
        }
    }
},
function(e, t, n) {
    "use strict";
    e.exports = {}, e.exports.filler = n(202), e.exports.legend = n(203), e.exports.title = n(204)
},
function(e, t, n) {
    "use strict";
    var i = n(3),
        r = n(8),
        a = n(2);
    i._set("global", {
        plugins: {
            filler: {
                propagate: !0
            }
        }
    });
    var o = {
        dataset: function(e) {
            var t = e.fill,
                n = e.chart,
                i = n.getDatasetMeta(t),
                r = i && n.isDatasetVisible(t) && i.dataset._children || [],
                a = r.length || 0;
            return a ? function(e, t) {
                return t < a && r[t]._view || null
            } : null
        },
        boundary: function(e) {
            var t = e.boundary,
                n = t ? t.x : null,
                i = t ? t.y : null;
            return function(e) {
                return {
                    x: null === n ? e.x : n,
                    y: null === i ? e.y : i
                }
            }
        }
    };

    function l(e, t, n) {
        var i, r = e._model || {},
            a = r.fill;
        if (void 0 === a && (a = !!r.backgroundColor), !1 === a || null === a) return !1;
        if (!0 === a) return "origin";
        if (i = parseFloat(a, 10), isFinite(i) && Math.floor(i) === i) return "-" !== a[0] && "+" !== a[0] || (i = t + i), !(i === t || i < 0 || i >= n) && i;
        switch (a) {
            case "bottom":
                return "start";
            case "top":
                return "end";
            case "zero":
                return "origin";
            case "origin":
            case "start":
            case "end":
                return a;
            default:
                return !1
        }
    }

    function s(e) {
        var t, n = e.el._model || {},
            i = e.el._scale || {},
            r = e.fill,
            a = null;
        if (isFinite(r)) return null;
        if ("start" === r ? a = void 0 === n.scaleBottom ? i.bottom : n.scaleBottom : "end" === r ? a = void 0 === n.scaleTop ? i.top : n.scaleTop : void 0 !== n.scaleZero ? a = n.scaleZero : i.getBasePosition ? a = i.getBasePosition() : i.getBasePixel && (a = i.getBasePixel()), null != a) {
            if (void 0 !== a.x && void 0 !== a.y) return a;
            if ("number" == typeof a && isFinite(a)) return {
                x: (t = i.isHorizontal()) ? a : null,
                y: t ? null : a
            }
        }
        return null
    }

    function d(e, t, n) {
        var i, r = e[t].fill,
            a = [t];
        if (!n) return r;
        for (; !1 !== r && -1 === a.indexOf(r);) {
            if (!isFinite(r)) return r;
            if (!(i = e[r])) return !1;
            if (i.visible) return r;
            a.push(r), r = i.fill
        }
        return !1
    }

    function u(e) {
        var t = e.fill,
            n = "dataset";
        return !1 === t ? null : (isFinite(t) || (n = "boundary"), o[n](e))
    }

    function c(e) {
        return e && !e.skip
    }

    function h(e, t, n, i, r) {
        var o;
        if (i && r) {
            for (e.moveTo(t[0].x, t[0].y), o = 1; o < i; ++o) a.canvas.lineTo(e, t[o - 1], t[o]);
            for (e.lineTo(n[r - 1].x, n[r - 1].y), o = r - 1; o > 0; --o) a.canvas.lineTo(e, n[o], n[o - 1], !0)
        }
    }
    e.exports = {
        id: "filler",
        afterDatasetsUpdate: function(e, t) {
            var n, i, a, o, c = (e.data.datasets || []).length,
                h = t.propagate,
                p = [];
            for (i = 0; i < c; ++i) o = null, (a = (n = e.getDatasetMeta(i)).dataset) && a._model && a instanceof r.Line && (o = {
                visible: e.isDatasetVisible(i),
                fill: l(a, i, c),
                chart: e,
                el: a
            }), n.$filler = o, p.push(o);
            for (i = 0; i < c; ++i)(o = p[i]) && (o.fill = d(p, i, h), o.boundary = s(o), o.mapper = u(o))
        },
        beforeDatasetDraw: function(e, t) {
            var n = t.meta.$filler;
            if (n) {
                var r = e.ctx,
                    o = n.el,
                    l = o._view,
                    s = o._children || [],
                    d = n.mapper,
                    u = l.backgroundColor || i.global.defaultColor;
                d && u && s.length && (a.canvas.clipArea(r, e.chartArea), function(e, t, n, i, r, a) {
                    var o, l, s, d, u, p, f, m = t.length,
                        g = i.spanGaps,
                        _ = [],
                        y = [],
                        v = 0,
                        M = 0;
                    for (e.beginPath(), o = 0, l = m + !!a; o < l; ++o) u = n(d = t[s = o % m]._view, s, i), p = c(d), f = c(u), p && f ? (v = _.push(d), M = y.push(u)) : v && M && (g ? (p && _.push(d), f && y.push(u)) : (h(e, _, y, v, M), v = M = 0, _ = [], y = []));
                    h(e, _, y, v, M), e.closePath(), e.fillStyle = r, e.fill()
                }(r, s, d, l, u, o._loop), a.canvas.unclipArea(r))
            }
        }
    }
},
function(e, t, n) {
    "use strict";
    var i = n(3),
        r = n(6),
        a = n(2),
        o = n(9),
        l = a.noop;

    function s(e, t) {
        return e.usePointStyle ? t * Math.SQRT2 : e.boxWidth
    }
    i._set("global", {
        legend: {
            display: !0,
            position: "top",
            fullWidth: !0,
            reverse: !1,
            weight: 1e3,
            onClick: function(e, t) {
                var n = t.datasetIndex,
                    i = this.chart,
                    r = i.getDatasetMeta(n);
                r.hidden = null === r.hidden ? !i.data.datasets[n].hidden : null, i.update()
            },
            onHover: null,
            labels: {
                boxWidth: 40,
                padding: 10,
                generateLabels: function(e) {
                    var t = e.data;
                    return a.isArray(t.datasets) ? t.datasets.map(function(t, n) {
                        return {
                            text: t.label,
                            fillStyle: a.isArray(t.backgroundColor) ? t.backgroundColor[0] : t.backgroundColor,
                            hidden: !e.isDatasetVisible(n),
                            lineCap: t.borderCapStyle,
                            lineDash: t.borderDash,
                            lineDashOffset: t.borderDashOffset,
                            lineJoin: t.borderJoinStyle,
                            lineWidth: t.borderWidth,
                            strokeStyle: t.borderColor,
                            pointStyle: t.pointStyle,
                            datasetIndex: n
                        }
                    }, this) : []
                }
            }
        },
        legendCallback: function(e) {
            var t = [];
            t.push('<ul class="' + e.id + '-legend">');
            for (var n = 0; n < e.data.datasets.length; n++) t.push('<li><span style="background-color:' + e.data.datasets[n].backgroundColor + '"></span>'), e.data.datasets[n].label && t.push(e.data.datasets[n].label), t.push("</li>");
            return t.push("</ul>"), t.join("")
        }
    });
    var d = r.extend({
        initialize: function(e) {
            a.extend(this, e), this.legendHitBoxes = [], this.doughnutMode = !1
        },
        beforeUpdate: l,
        update: function(e, t, n) {
            var i = this;
            return i.beforeUpdate(), i.maxWidth = e, i.maxHeight = t, i.margins = n, i.beforeSetDimensions(), i.setDimensions(), i.afterSetDimensions(), i.beforeBuildLabels(), i.buildLabels(), i.afterBuildLabels(), i.beforeFit(), i.fit(), i.afterFit(), i.afterUpdate(), i.minSize
        },
        afterUpdate: l,
        beforeSetDimensions: l,
        setDimensions: function() {
            var e = this;
            e.isHorizontal() ? (e.width = e.maxWidth, e.left = 0, e.right = e.width) : (e.height = e.maxHeight, e.top = 0, e.bottom = e.height), e.paddingLeft = 0, e.paddingTop = 0, e.paddingRight = 0, e.paddingBottom = 0, e.minSize = {
                width: 0,
                height: 0
            }
        },
        afterSetDimensions: l,
        beforeBuildLabels: l,
        buildLabels: function() {
            var e = this,
                t = e.options.labels || {},
                n = a.callback(t.generateLabels, [e.chart], e) || [];
            t.filter && (n = n.filter(function(n) {
                return t.filter(n, e.chart.data)
            })), e.options.reverse && n.reverse(), e.legendItems = n
        },
        afterBuildLabels: l,
        beforeFit: l,
        fit: function() {
            var e = this,
                t = e.options,
                n = t.labels,
                r = t.display,
                o = e.ctx,
                l = i.global,
                d = a.valueOrDefault,
                u = d(n.fontSize, l.defaultFontSize),
                c = d(n.fontStyle, l.defaultFontStyle),
                h = d(n.fontFamily, l.defaultFontFamily),
                p = a.fontString(u, c, h),
                f = e.legendHitBoxes = [],
                m = e.minSize,
                g = e.isHorizontal();
            if (g ? (m.width = e.maxWidth, m.height = r ? 10 : 0) : (m.width = r ? 10 : 0, m.height = e.maxHeight), r)
                if (o.font = p, g) {
                    var _ = e.lineWidths = [0],
                        y = e.legendItems.length ? u + n.padding : 0;
                    o.textAlign = "left", o.textBaseline = "top", a.each(e.legendItems, function(t, i) {
                        var r = s(n, u) + u / 2 + o.measureText(t.text).width;
                        _[_.length - 1] + r + n.padding >= e.width && (y += u + n.padding, _[_.length] = e.left), f[i] = {
                            left: 0,
                            top: 0,
                            width: r,
                            height: u
                        }, _[_.length - 1] += r + n.padding
                    }), m.height += y
                } else {
                    var v = n.padding,
                        M = e.columnWidths = [],
                        b = n.padding,
                        w = 0,
                        L = 0,
                        D = u + v;
                    a.each(e.legendItems, function(e, t) {
                        var i = s(n, u) + u / 2 + o.measureText(e.text).width;
                        L + D > m.height && (b += w + n.padding, M.push(w), w = 0, L = 0), w = Math.max(w, i), L += D, f[t] = {
                            left: 0,
                            top: 0,
                            width: i,
                            height: u
                        }
                    }), b += w, M.push(w), m.width += b
                } e.width = m.width, e.height = m.height
        },
        afterFit: l,
        isHorizontal: function() {
            return "top" === this.options.position || "bottom" === this.options.position
        },
        draw: function() {
            var e = this,
                t = e.options,
                n = t.labels,
                r = i.global,
                o = r.elements.line,
                l = e.width,
                d = e.lineWidths;
            if (t.display) {
                var u, c = e.ctx,
                    h = a.valueOrDefault,
                    p = h(n.fontColor, r.defaultFontColor),
                    f = h(n.fontSize, r.defaultFontSize),
                    m = h(n.fontStyle, r.defaultFontStyle),
                    g = h(n.fontFamily, r.defaultFontFamily),
                    _ = a.fontString(f, m, g);
                c.textAlign = "left", c.textBaseline = "middle", c.lineWidth = .5, c.strokeStyle = p, c.fillStyle = p, c.font = _;
                var y = s(n, f),
                    v = e.legendHitBoxes,
                    M = e.isHorizontal();
                u = M ? {
                    x: e.left + (l - d[0]) / 2,
                    y: e.top + n.padding,
                    line: 0
                } : {
                    x: e.left + n.padding,
                    y: e.top + n.padding,
                    line: 0
                };
                var b = f + n.padding;
                a.each(e.legendItems, function(i, s) {
                    var p = c.measureText(i.text).width,
                        m = y + f / 2 + p,
                        g = u.x,
                        _ = u.y;
                    M ? g + m >= l && (_ = u.y += b, u.line++, g = u.x = e.left + (l - d[u.line]) / 2) : _ + b > e.bottom && (g = u.x = g + e.columnWidths[u.line] + n.padding, _ = u.y = e.top + n.padding, u.line++),
                        function(e, n, i) {
                            if (!(isNaN(y) || y <= 0)) {
                                c.save(), c.fillStyle = h(i.fillStyle, r.defaultColor), c.lineCap = h(i.lineCap, o.borderCapStyle), c.lineDashOffset = h(i.lineDashOffset, o.borderDashOffset), c.lineJoin = h(i.lineJoin, o.borderJoinStyle), c.lineWidth = h(i.lineWidth, o.borderWidth), c.strokeStyle = h(i.strokeStyle, r.defaultColor);
                                var l = 0 === h(i.lineWidth, o.borderWidth);
                                if (c.setLineDash && c.setLineDash(h(i.lineDash, o.borderDash)), t.labels && t.labels.usePointStyle) {
                                    var s = f * Math.SQRT2 / 2,
                                        d = s / Math.SQRT2,
                                        u = e + d,
                                        p = n + d;
                                    a.canvas.drawPoint(c, i.pointStyle, s, u, p)
                                } else l || c.strokeRect(e, n, y, f), c.fillRect(e, n, y, f);
                                c.restore()
                            }
                        }(g, _, i), v[s].left = g, v[s].top = _,
                        function(e, t, n, i) {
                            var r = f / 2,
                                a = y + r + e,
                                o = t + r;
                            c.fillText(n.text, a, o), n.hidden && (c.beginPath(), c.lineWidth = 2, c.moveTo(a, o), c.lineTo(a + i, o), c.stroke())
                        }(g, _, i, p), M ? u.x += m + n.padding : u.y += b
                })
            }
        },
        handleEvent: function(e) {
            var t = this,
                n = t.options,
                i = "mouseup" === e.type ? "click" : e.type,
                r = !1;
            if ("mousemove" === i) {
                if (!n.onHover) return
            } else {
                if ("click" !== i) return;
                if (!n.onClick) return
            }
            var a = e.x,
                o = e.y;
            if (a >= t.left && a <= t.right && o >= t.top && o <= t.bottom)
                for (var l = t.legendHitBoxes, s = 0; s < l.length; ++s) {
                    var d = l[s];
                    if (a >= d.left && a <= d.left + d.width && o >= d.top && o <= d.top + d.height) {
                        if ("click" === i) {
                            n.onClick.call(t, e.native, t.legendItems[s]), r = !0;
                            break
                        }
                        if ("mousemove" === i) {
                            n.onHover.call(t, e.native, t.legendItems[s]), r = !0;
                            break
                        }
                    }
                }
            return r
        }
    });

    function u(e, t) {
        var n = new d({
            ctx: e.ctx,
            options: t,
            chart: e
        });
        o.configure(e, n, t), o.addBox(e, n), e.legend = n
    }
    e.exports = {
        id: "legend",
        _element: d,
        beforeInit: function(e) {
            var t = e.options.legend;
            t && u(e, t)
        },
        beforeUpdate: function(e) {
            var t = e.options.legend,
                n = e.legend;
            t ? (a.mergeIf(t, i.global.legend), n ? (o.configure(e, n, t), n.options = t) : u(e, t)) : n && (o.removeBox(e, n), delete e.legend)
        },
        afterEvent: function(e, t) {
            var n = e.legend;
            n && n.handleEvent(t)
        }
    }
},
function(e, t, n) {
    "use strict";
    var i = n(3),
        r = n(6),
        a = n(2),
        o = n(9),
        l = a.noop;
    i._set("global", {
        title: {
            display: !1,
            fontStyle: "bold",
            fullWidth: !0,
            lineHeight: 1.2,
            padding: 10,
            position: "top",
            text: "",
            weight: 2e3
        }
    });
    var s = r.extend({
        initialize: function(e) {
            a.extend(this, e), this.legendHitBoxes = []
        },
        beforeUpdate: l,
        update: function(e, t, n) {
            var i = this;
            return i.beforeUpdate(), i.maxWidth = e, i.maxHeight = t, i.margins = n, i.beforeSetDimensions(), i.setDimensions(), i.afterSetDimensions(), i.beforeBuildLabels(), i.buildLabels(), i.afterBuildLabels(), i.beforeFit(), i.fit(), i.afterFit(), i.afterUpdate(), i.minSize
        },
        afterUpdate: l,
        beforeSetDimensions: l,
        setDimensions: function() {
            var e = this;
            e.isHorizontal() ? (e.width = e.maxWidth, e.left = 0, e.right = e.width) : (e.height = e.maxHeight, e.top = 0, e.bottom = e.height), e.paddingLeft = 0, e.paddingTop = 0, e.paddingRight = 0, e.paddingBottom = 0, e.minSize = {
                width: 0,
                height: 0
            }
        },
        afterSetDimensions: l,
        beforeBuildLabels: l,
        buildLabels: l,
        afterBuildLabels: l,
        beforeFit: l,
        fit: function() {
            var e = this,
                t = a.valueOrDefault,
                n = e.options,
                r = n.display,
                o = t(n.fontSize, i.global.defaultFontSize),
                l = e.minSize,
                s = a.isArray(n.text) ? n.text.length : 1,
                d = a.options.toLineHeight(n.lineHeight, o),
                u = r ? s * d + 2 * n.padding : 0;
            e.isHorizontal() ? (l.width = e.maxWidth, l.height = u) : (l.width = u, l.height = e.maxHeight), e.width = l.width, e.height = l.height
        },
        afterFit: l,
        isHorizontal: function() {
            var e = this.options.position;
            return "top" === e || "bottom" === e
        },
        draw: function() {
            var e = this,
                t = e.ctx,
                n = a.valueOrDefault,
                r = e.options,
                o = i.global;
            if (r.display) {
                var l, s, d, u = n(r.fontSize, o.defaultFontSize),
                    c = n(r.fontStyle, o.defaultFontStyle),
                    h = n(r.fontFamily, o.defaultFontFamily),
                    p = a.fontString(u, c, h),
                    f = a.options.toLineHeight(r.lineHeight, u),
                    m = f / 2 + r.padding,
                    g = 0,
                    _ = e.top,
                    y = e.left,
                    v = e.bottom,
                    M = e.right;
                t.fillStyle = n(r.fontColor, o.defaultFontColor), t.font = p, e.isHorizontal() ? (s = y + (M - y) / 2, d = _ + m, l = M - y) : (s = "left" === r.position ? y + m : M - m, d = _ + (v - _) / 2, l = v - _, g = Math.PI * ("left" === r.position ? -.5 : .5)), t.save(), t.translate(s, d), t.rotate(g), t.textAlign = "center", t.textBaseline = "middle";
                var b = r.text;
                if (a.isArray(b))
                    for (var w = 0, L = 0; L < b.length; ++L) t.fillText(b[L], 0, w, l), w += f;
                else t.fillText(b, 0, 0, l);
                t.restore()
            }
        }
    });

    function d(e, t) {
        var n = new s({
            ctx: e.ctx,
            options: t,
            chart: e
        });
        o.configure(e, n, t), o.addBox(e, n), e.titleBlock = n
    }
    e.exports = {
        id: "title",
        _element: s,
        beforeInit: function(e) {
            var t = e.options.title;
            t && d(e, t)
        },
        beforeUpdate: function(e) {
            var t = e.options.title,
                n = e.titleBlock;
            t ? (a.mergeIf(t, i.global.title), n ? (o.configure(e, n, t), n.options = t) : d(e, t)) : n && (o.removeBox(e, n), delete e.titleBlock)
        }
    }
},
function(e, t, n) {
    "use strict";
    var i, r, a, o, l, s, d, u, c, h, p;
    window.chartColors = {
        red: "#dc3545",
        orange: "#fd7e14",
        yellow: "#ffc107",
        green: "#28a745",
        blue: "#007bff",
        purple: "#6f42c1",
        grey: "#6c757d"
    }, u = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], c = ["#4dc9f6", "#f67019", "#f53794", "#537bc4", "#acc236", "#166a8f", "#00a950", "#58595b", "#8549ba"], h = (i = this).Samples || (i.Samples = {}), p = i.Color, h.utils = {
        srand: function(e) {
            this._seed = e
        },
        rand: function(e, t) {
            var n = this._seed;
            return e = void 0 === e ? 0 : e, t = void 0 === t ? 1 : t, this._seed = (9301 * n + 49297) % 233280, e + this._seed / 233280 * (t - e)
        },
        numbers: function(e) {
            var t, n, i = e || {},
                r = i.min || 0,
                a = i.max || 1,
                o = i.from || [],
                l = i.count || 8,
                s = i.decimals || 8,
                d = i.continuity || 1,
                u = Math.pow(10, s) || 0,
                c = [];
            for (t = 0; t < l; ++t) n = (o[t] || 0) + this.rand(r, a), this.rand() <= d ? c.push(Math.round(u * n) / u) : c.push(null);
            return c
        },
        labels: function(e) {
            var t, n = e || {},
                i = n.min || 0,
                r = n.max || 100,
                a = (r - i) / (n.count || 8),
                o = n.decimals || 8,
                l = Math.pow(10, o) || 0,
                s = n.prefix || "",
                d = [];
            for (t = i; t < r; t += a) d.push(s + Math.round(l * t) / l);
            return d
        },
        months: function(e) {
            var t, n, i = e || {},
                r = i.count || 12,
                a = i.section,
                o = [];
            for (t = 0; t < r; ++t) n = u[Math.ceil(t) % 12], o.push(n.substring(0, a));
            return o
        },
        color: function(e) {
            return c[e % c.length]
        },
        transparentize: function(e, t) {
            var n = void 0 === t ? .5 : 1 - t;
            return p(e).alpha(n).rgbString()
        }
    }, window.randomScalingFactor = function() {
        return Math.round(h.utils.rand(-100, 100))
    }, h.utils.srand(Date.now()), document.location.hostname.match(/^(www\.)?chartjs\.org$/) && (r = window, a = document, o = "script", l = "ga", r.GoogleAnalyticsObject = l, r.ga = r.ga || function() {
        (r.ga.q = r.ga.q || []).push(arguments)
    }, r.ga.l = 1 * new Date, s = a.createElement(o), d = a.getElementsByTagName(o)[0], s.async = 1, s.src = "//www.google-analytics.com/analytics.js", d.parentNode.insertBefore(s, d), ga("create", "UA-28909194-3", "auto"), ga("send", "pageview"))
},
function(e, t) {}]);