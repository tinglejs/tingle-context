/**
 * Tingle Context
 * The environment for tingle's initialization
 * @author gnosaij
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */

const win = window;
const doc = document;

const ua = navigator.userAgent;
const isMobile = !!ua.match(/mobile/i) || 'orientation' in win;
const isPC = !isMobile;

const supportTouch = 'ontouchstart' in window;
const support3D = ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix());
const supportHairline = (() => {
    var support = false;
    if (win.devicePixelRatio && devicePixelRatio >= 2) {
        const testElem = doc.createElement('div');
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
const START = supportTouch ? 'touchstart' : 'mousedown';
const MOVE = supportTouch ? 'touchmove' : 'mousemove';
const END = supportTouch ? 'touchend' : 'mouseup';
const CANCEL = supportTouch ? 'touchcancel' : 'mouseup';

const env = {
    is: {
        pc: isPC,
        mobile: isMobile
    },
    support: {
        '3d': support3D,
        hairline: supportHairline,
        touch: supportTouch
    },
    eventName: {
        TOUCH_START: START,
        TOUCH_MOVE: MOVE,
        TOUCH_END: END,
        TOUCH_CANCEL: CANCEL,
        RESIZE: 'resize'
    },
    // 不建议使用
    TOUCH: {
        START,
        MOVE,
        END,
        CANCEL
    }
};

module.exports = env;
