var win = window;
var doc = document;

var ua = navigator.userAgent;
var isMobile = !!ua.match(/mobile/i) || 'orientation' in win;
var isPC = !isMobile;

var supportTouch = 'ontouchstart' in window;
var support3D = ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix());
var supportHairline = (function() {
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

var env = {
    is: {
        pc: isPC,
        mobile: isMobile
    },
    support: {
        '3d': support3D,
        hairline: supportHairline,
        touch: supportTouch
    },
    event: {
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