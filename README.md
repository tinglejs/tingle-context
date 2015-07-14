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


## updates

#### v1.0.3 (2015-07-14)

* 添加文档


