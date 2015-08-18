## Context

`tingle`的上下文模块，提供全局性的属性和方法。

### TOUCH

根据运行环境确定手势相关的`event`名称

* START：移动端的值是`touchstart`，PC端的值是`mousedown`
* MOVE：移动端的值是`touchmove`，PC端的值是`mousemove`
* END：移动端的值是`touchend`，PC端的值是`mouseup`
* CANCEL：移动端的值是`touchcancel`，PC端的值是`mouseup`

### is

运行环境

* mobile：boolean，是否是运行在移动端，目前没有区分`pad`，`pad`环境下该值为`true`
* pc：boolean，是否是运行在PC端

### support

* 3d：是否支持`css`硬件加速
* hairline：是否支持`0.5px`的细线
* touch：是否支持移动端手势

### getTID

获取自增长的`id`

```js
Context.getTID(); // 0
Context.getTID(); // 1
```

### mixin

合并对象，功能同`jQuery`的`extend`

```js
var obj = Context.mixin({name:'tingle'}, {age:'1'});
// obj === {'name':'tingle', 'age':'1'}
```

### noop

空函数，常用于回调函数的默认函数

```js

TextField.defaultProps = {
    onChange: Context.noop
}
```

### rem(px, artBoardWidth)

将`px`单位的值转换为`rem`单位的值。

参数：

* px：{Number}，必选项。表示要被转换的值。
* artBoardWidth：{Number}，可选。计算`rem`时要基于的画板宽度，即设计稿的实际宽度，默认`750px`。

使用：

```js
Context.rem(750); // 基于`750px`的设计稿，`750px`等于`10rem`
Context.rem(750, 640); // 基于`640px`的设计稿，`750px`等于`11.71875rem`
```

### makePrivateRem(artBoardWidth)

以指定画板宽度(`artBoardWidth`)创建私有的`rem`方法。

参数：

* artBoardWidth：{Number}，可选。计算`rem`时要基于的画板尺寸，即设计稿的实际尺寸。

使用：

```js
var Context = require('tingle-context');
var privateRem = Context.makePrivateRem(640); // 创建基于`640px`宽的`rem`方法
privateRem(750); // 基于`640px`的设计稿，`750px`等于`11.71875rem`

// 默认的`rem`方法是基于`750px`宽的设计稿
Context.rem(750); // 10rem
```



## TODOs

* 添加`set`方法，用于全局配置`tingle`的运行环境。如`Tingle.set('artBoardWidth', 640)`。

## updates

#### v0.0.4 (2015-08-18)

* `0.5px`支持，在`html`元素的`class`中以`hairline`标识。
* 无入侵的`rem`方案支持，添加`rem`方法和`makePrivateRem`方法。

#### v0.0.3 (2015-07-14)

* 添加文档


