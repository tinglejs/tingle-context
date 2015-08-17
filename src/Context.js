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
require("./touchEffect").attach(document.body);
var classnames = require('classnames');

var win = window;
var doc = document;

var ua = navigator.userAgent;
var isMobile = !!ua.match(/mobile/i) || 'orientation' in win;
var isPC = !isMobile;

var supportTouch = 'ontouchstart' in window;
var support3D = ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix());
var supportHalfPx = (function() {
    var support = false;
    if (win.devicePixelRatio && devicePixelRatio >= 2) {
        var testElem = doc.createElement('div');
        testElem.style.border = '.5px solid transparent';
        doc.body.appendChild(testElem);
        if (testElem.offsetHeight == 1) { // 0.5 + 0.5 = 1
            support = true;
        }
        doc.body.removeChild(testElem);
    }
    return support;
})();

// 常量
var START = supportTouch ? 'touchstart' : 'mousedown';
var MOVE = supportTouch ? 'touchmove' : 'mousemove';
var END = supportTouch ? 'touchend' : 'mouseup';
var CANCEL = supportTouch ? 'touchcancel' : 'mouseup';

/**
 * Top namespace
 */
var Tingle = {
    getTID,
    is: {
        pc: isPC,
        mobile: isMobile
    },
    support: {
        '3d': support3D,
        'halfPx': supportHalfPx,
        touch: supportTouch
    },
    TOUCH: {
        START,
        MOVE,
        END,
        CANCEL
    },
    mixin: redo(mixin),
    noop(v) {
        return v;
    },
    rem,
    makePrivateRem
};

/**
 * 对象扩展
 * @param  {Object} receiver
 * @param  {Object} supplier
 * @return {Object} 扩展后的receiver对象
 */
function mixin(receiver, supplier) {
    if (Object.keys) {
        Object.keys(supplier).forEach(function (property) {
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


/**
 * 变换两个参数的函数到多个参数
 * @param  {Function} fn 基函数
 * @return {Function} 变换后的函数
 * @demo
 *      function add(x, y) { return x+y; }
 *      add = redo(add);
 *      add(1,2,3) => 6
 */
function redo(fn) {
    return function () {
        var args = arguments;
        var ret = fn(args[0], args[1]);
        for (var i = 2, l = args.length; i < l; i++) {
            ret = fn(ret, args[i]);
        }
        return ret;
    }
}


/**
 * 获取自增长id
 * @return {Number}
 */
var tid = 0;
function getTID() {
    return tid++;
}


/**
 * rem base
 */
(function(docEl, fontEl) {
    var dpr = win.devicePixelRatio || 1;

    // 类似小米2webview webkit版本是534及以下，避免闪屏
    var matches = navigator.userAgent.match(/Android[\S\s]+AppleWebkit\/?(\d{3})/i);
    if (matches && matches[1] <= 534) {
        dpr = 1;
    }

    win.dpr = dpr;
    docEl.setAttribute('data-dpr', dpr);
    docEl.firstElementChild.appendChild(fontEl);

    win.addEventListener('resize', function() {
        // resize时立刻change,pad上刷屏明显
        setRem();
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            setRem();
        }
    }, false);

    setRem();

    function setRem() {
        var docWidth = docEl.clientWidth;
        win.rem = docWidth / 10;

        // ZTE 中兴 ZTE U930_TD/1.0 Linux/2.6.39/Android/4.0Release/3.5.2012 Browser/AppleWebkit534.30
        // 老机器bug rem计算不是标准=html fontsize
        if (/ZTE U930_TD/.test(navigator.userAgent)) {
            win.rem = win.rem * 1.13;
        }

        fontEl.innerHTML = 'html{font-size:' + win.rem + 'px!important}';
    }
})(doc.documentElement, doc.createElement('style'));


/**
 * 0.5px support detection
 */

(function() {
    if (win.devicePixelRatio && devicePixelRatio >= 2) {
        var testElem = doc.createElement('div');
        testElem.style.border = '.5px solid transparent';
        doc.body.appendChild(testElem);
        if (testElem.offsetHeight == 1) { // 0.5 + 0.5 = 1
            doc.documentElement.classList.add('hairlines');
        }
        doc.body.removeChild(testElem);
    }
})();

/**
 * px to rem
 */

var defaultArtBoardWidth = 750;

function rem(px, artBoardWidth) {
    artBoardWidth = artBoardWidth || defaultArtBoardWidth;
    return (px * 10 / artBoardWidth) + 'rem';
}

function makePrivateRem(artBoardWidth) {
    return function (px) {
        return rem(px, artBoardWidth);
    }
}

/**
 * TODO: modernizr env
 */

doc.documentElement.className = classnames(doc.documentElement.className.trim(), {
    pc: isPC,
    mobile: isMobile
});

module.exports = window.Tingle = Tingle;
