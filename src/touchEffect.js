/**
 * Tingle Context
 * The environment for tingle's initialization
 * @auther jiushen
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */

var supportTouch = 'ontouchstart' in window;
// 常量
var START = supportTouch ? 'touchstart' : 'mousedown';
//var MOVE = supportTouch ? 'touchmove' : 'mousemove';
var END = supportTouch ? 'touchend' : 'mouseup';
var CANCEL = supportTouch ? 'touchcancel' : 'mouseup';

class TouchEffect {
    /**
     *
     * @param layer
     * @param options
     */
    constructor(layer, options) {
        this.layer = layer;
        this.options = options || {
            selector: "tTE", // abbr. tTouchEffect
            activeClass: "hover"
        };
        this.selector = this.options.selector;
        this.activeClass = this.options.activeClass;
        this.initEvent()
    }

    initEvent() {
        var layer = this.layer;

        layer.addEventListener(START, this.onTouchStart.bind(this), false);
        layer.addEventListener(END, this.onTouchEnd.bind(this), false);
        layer.addEventListener(CANCEL, this.onTouchEnd.bind(this), false);
    }

    onTouchStart(event) {

        var target = event.target;

        while (target && target.classList && !target.classList.contains(this.selector)) {
            target = target.parentNode;
        }

        if (target && target.classList && target.classList.contains(this.selector)) {
            target.classList.add(this.activeClass)
        }
    }

    onTouchEnd(event) {

        var target = event.target;

        while (target && target.classList && !target.classList.contains(this.selector)) {
            target = target.parentNode;
        }

        if (target && target.classList && target.classList.contains(this.selector)) {
            target.classList.remove(this.activeClass)
        }
    }

    destroy() {
        var layer = this.layer;

        layer.removeEventListener(START, this.onTouchStart.bind(this), false);
        layer.removeEventListener(END, this.onTouchEnd.bind(this), false);
        layer.removeEventListener(CANCEL, this.onTouchEnd.bind(this), false);
    }
}

TouchEffect.attach = function (layer, options) {
    return new TouchEffect(layer, options);
};

module.exports = TouchEffect;

