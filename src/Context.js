 /**
 * Tingle Context
 * The environment for tingle's initialization
 * @auther gnosaij
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */
require("fastclick").attach(document.body);
React.initializeTouchEvents(true);

var win = window;
var doc = document;

var ua = navigator.userAgent;
var isMobile  = !!ua.match(/mobile/i) || 'orientation' in win;
var isPC = !isMobile;

var supportTouch = 'ontouchstart' in window;
var support3D = ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix());

// 常量
var START = supportTouch ? 'touchstart' : 'mousedown';
var MOVE = supportTouch ? 'touchmove' : 'mousemove';
var END = supportTouch ? 'touchend' : 'mouseup';
var CANCEL = supportTouch ? 'touchcancel' : 'mouseup';

/**
 * Top namespace
 */
var Tingle = {
    is: {
        pc: isPC,
        mobile: isMobile
    },
    support: {
        '3d': support3D
    },
    TOUCH: {
        START: START,
        MOVE: MOVE,
        END: END,
        CANCEL: CANCEL
    },
    mixin: redo(mixin),
    noop() {}
};

// simple mixin
function mixin(receiver, supplier) {
    if (Object.keys) {
        Object.keys(supplier).forEach(function(property) {
            Object.defineProperty(receiver, property, Object.getOwnPropertyDescriptor(supplier, property));
        });
    } else {
        for (var property in supplier) {
            if (supplier.hasOwnProperty(property)) {
                receiver[property] = supplier[property];
            }
        }
    }
    return receiver;
}

// 变换两个参数的函数到多个参数
// var add = function (x, y) { return x+y; }
// add = redo(add);
// add(1,2,3) => 6
function redo(fn) {
    return function () {
        var args = arguments;
        var ret = fn(args[0], args[1]);
        for (var i=2, l=args.length; i<l; i++) {
            ret = fn(ret, args[i]);
        }
        return ret;
    }
}

/**
 * TODO: modernizr env
 */

module.exports = window.Tingle = Tingle;