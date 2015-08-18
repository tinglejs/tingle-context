/**
 * Tingle Context
 * The environment for tingle's initialization
 * @auther jiushen
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */

var env = require('./env');
var {TOUCH_START, TOUCH_END, TOUCH_CANCEL} = env.event;

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

        layer.addEventListener(TOUCH_START, this.onTouchStart.bind(this), false);
        layer.addEventListener(TOUCH_END, this.onTouchEnd.bind(this), false);
        layer.addEventListener(TOUCH_CANCEL, this.onTouchEnd.bind(this), false);
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
        layer.removeEventListener(TOUCH_START, this.onTouchStart.bind(this), false);
        layer.removeEventListener(TOUCH_END, this.onTouchEnd.bind(this), false);
        layer.removeEventListener(TOUCH_CANCEL, this.onTouchEnd.bind(this), false);
    }
}

TouchEffect.attach = function (layer, options) {
    return new TouchEffect(layer, options);
};

module.exports = TouchEffect;

