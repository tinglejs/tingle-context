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
    noop: function() {}
};


/**
 * TODO: modernizr env
 */

module.exports = window.Tingle = Tingle;