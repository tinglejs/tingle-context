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
// 引入环境检测模块
const env = require('./env');
const classnames = require('classnames');

// React的移动端touch事件初始化
React.initializeTouchEvents(true);

// 全局点击态初始化
require("./touchEffect").attach(doc.body);

/**
 * 对象扩展
 * @param  {Object} receiver
 * @param  {Object} supplier
 * @return {Object} 扩展后的receiver对象
 */
const mixin = (receiver, supplier) => {
    if (Object.keys) {
        Object.keys(supplier).forEach((property) => {
            Object.defineProperty(receiver, property, Object.getOwnPropertyDescriptor(supplier, property));
        });
    } else {
        for (let property in supplier) {
            if (supplier.hasOwnProperty(property)) {
                receiver[property] = supplier[property];
            }
        }
    }
    return receiver;
};


/**
 * 变换两个参数的函数到多个参数
 * @param  {Function} fn 基函数
 * @return {Function} 变换后的函数
 * @demo
 *      let add = (x, y) => { return x+y; }
 *      add = redo(add);
 *      add(1,2,3) => 6
 */
const redo = (fn) => {
    return () => {
        const args = arguments;
        let ret = fn(args[0], args[1]);
        for (let i = 2, l = args.length; i < l; i++) {
            ret = fn(ret, args[i]);
        }
        return ret;
    }
};


/**
 * 获取自增长id
 * @return {Number}
 */
let tid = 0;
let getTID = () => {
    return tid++;
};


/**
 * rem system
 * @TODO 这个闭包 + rem方法 + makePrivateRem方法的整合
 */
((docEl, fontEl) => {
    let dpr = win.devicePixelRatio || 1;

    // 类似小米2 webView webkit版本是534及以下，避免闪屏
    const matches = navigator.userAgent.match(/Android[\S\s]+AppleWebkit\/?(\d{3})/i);
    if (matches && matches[1] <= 534) {
        dpr = 1;
    }

    win.dpr = dpr;
    docEl.setAttribute('data-dpr', dpr);
    docEl.firstElementChild.appendChild(fontEl);

    let setRem = () => {
        const docWidth = docEl.clientWidth;
        win.rem = docWidth / 10;

        // ZTE 中兴 ZTE U930_TD/1.0 Linux/2.6.39/Android/4.0Release/3.5.2012 Browser/AppleWebkit534.30
        // 老机器bug rem计算不是标准=html fontsize
        if (/ZTE U930_TD/.test(navigator.userAgent)) {
            win.rem = win.rem * 1.13;
        }

        fontEl.innerHTML = 'html{font-size:' + win.rem + 'px!important}';
    };

    win.addEventListener('resize', () => {
        // resize时立刻change,pad上刷屏明显
        setRem();
    }, false);
    win.addEventListener('pageshow', (e)=> {
        if (e.persisted) {
            setRem();
        }
    }, false);


    setRem();


})(doc.documentElement, doc.createElement('style'));

const defaultArtBoardWidth = 750;

let rem = (px, artBoardWidth)=> {
    artBoardWidth = artBoardWidth || defaultArtBoardWidth;
    return (px * 10 / artBoardWidth) + 'rem';
};

let makePrivateRem = (artBoardWidth) => {
    return (px) => {
        return rem(px, artBoardWidth);
    }
};


/**
 * Top namespace
 */
const Context = {
    getTID,
    mixin: redo(mixin),
    noop(v) {
        return v;
    },
    rem,
    makePrivateRem
};

Context.mixin(Context, env);


/**
 * 在body上添加环境检测的标识类className
 */
doc.documentElement.className = classnames(doc.documentElement.className.trim(), {
    pc: env.is.pc,
    mobile: env.is.mobile,
    hairline: env.support.hairline
});

module.exports = Context;

/**
 * TODO: modernizr env
 */
