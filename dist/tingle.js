/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(2);

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* Tingle Context
	* The environment for tingle's initialization
	* @auther gnosaij
	*
	* Copyright 2014-2015, Tingle Team, Alinw.
	* All rights reserved.
	*/
	'use strict';
	
	__webpack_require__(3).attach(document.body);
	React.initializeTouchEvents(true);
	
	var Tingle = {
	    Dialog: __webpack_require__(4),
	    GroupList: __webpack_require__(11),
	    Layer: __webpack_require__(7),
	    Mask: __webpack_require__(9),
	    OnOff: __webpack_require__(13),
	    OnOffField: __webpack_require__(15),
	    Slide: __webpack_require__(17),
	    TextField: __webpack_require__(19),
	    TextareaField: __webpack_require__(21),
	    Tip: __webpack_require__(24)
	};
	
	module.exports = window.Tingle = Tingle;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;;(function () {
		'use strict';
	
		/**
		 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
		 *
		 * @codingstandard ftlabs-jsv2
		 * @copyright The Financial Times Limited [All Rights Reserved]
		 * @license MIT License (see LICENSE.txt)
		 */
	
		/*jslint browser:true, node:true*/
		/*global define, Event, Node*/
	
	
		/**
		 * Instantiate fast-clicking listeners on the specified layer.
		 *
		 * @constructor
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		function FastClick(layer, options) {
			var oldOnClick;
	
			options = options || {};
	
			/**
			 * Whether a click is currently being tracked.
			 *
			 * @type boolean
			 */
			this.trackingClick = false;
	
	
			/**
			 * Timestamp for when click tracking started.
			 *
			 * @type number
			 */
			this.trackingClickStart = 0;
	
	
			/**
			 * The element being tracked for a click.
			 *
			 * @type EventTarget
			 */
			this.targetElement = null;
	
	
			/**
			 * X-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartX = 0;
	
	
			/**
			 * Y-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartY = 0;
	
	
			/**
			 * ID of the last touch, retrieved from Touch.identifier.
			 *
			 * @type number
			 */
			this.lastTouchIdentifier = 0;
	
	
			/**
			 * Touchmove boundary, beyond which a click will be cancelled.
			 *
			 * @type number
			 */
			this.touchBoundary = options.touchBoundary || 10;
	
	
			/**
			 * The FastClick layer.
			 *
			 * @type Element
			 */
			this.layer = layer;
	
			/**
			 * The minimum time between tap(touchstart and touchend) events
			 *
			 * @type number
			 */
			this.tapDelay = options.tapDelay || 200;
	
			/**
			 * The maximum time for a tap
			 *
			 * @type number
			 */
			this.tapTimeout = options.tapTimeout || 700;
	
			if (FastClick.notNeeded(layer)) {
				return;
			}
	
			// Some old versions of Android don't have Function.prototype.bind
			function bind(method, context) {
				return function() { return method.apply(context, arguments); };
			}
	
	
			var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
			var context = this;
			for (var i = 0, l = methods.length; i < l; i++) {
				context[methods[i]] = bind(context[methods[i]], context);
			}
	
			// Set up event handlers as required
			if (deviceIsAndroid) {
				layer.addEventListener('mouseover', this.onMouse, true);
				layer.addEventListener('mousedown', this.onMouse, true);
				layer.addEventListener('mouseup', this.onMouse, true);
			}
	
			layer.addEventListener('click', this.onClick, true);
			layer.addEventListener('touchstart', this.onTouchStart, false);
			layer.addEventListener('touchmove', this.onTouchMove, false);
			layer.addEventListener('touchend', this.onTouchEnd, false);
			layer.addEventListener('touchcancel', this.onTouchCancel, false);
	
			// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
			// layer when they are cancelled.
			if (!Event.prototype.stopImmediatePropagation) {
				layer.removeEventListener = function(type, callback, capture) {
					var rmv = Node.prototype.removeEventListener;
					if (type === 'click') {
						rmv.call(layer, type, callback.hijacked || callback, capture);
					} else {
						rmv.call(layer, type, callback, capture);
					}
				};
	
				layer.addEventListener = function(type, callback, capture) {
					var adv = Node.prototype.addEventListener;
					if (type === 'click') {
						adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
							if (!event.propagationStopped) {
								callback(event);
							}
						}), capture);
					} else {
						adv.call(layer, type, callback, capture);
					}
				};
			}
	
			// If a handler is already declared in the element's onclick attribute, it will be fired before
			// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
			// adding it as listener.
			if (typeof layer.onclick === 'function') {
	
				// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
				// - the old one won't work if passed to addEventListener directly.
				oldOnClick = layer.onclick;
				layer.addEventListener('click', function(event) {
					oldOnClick(event);
				}, false);
				layer.onclick = null;
			}
		}
	
		/**
		* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
		*
		* @type boolean
		*/
		var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;
	
		/**
		 * Android requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;
	
	
		/**
		 * iOS requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;
	
	
		/**
		 * iOS 4 requires an exception for select elements.
		 *
		 * @type boolean
		 */
		var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);
	
	
		/**
		 * iOS 6.0-7.* requires the target element to be manually derived
		 *
		 * @type boolean
		 */
		var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);
	
		/**
		 * BlackBerry requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;
	
		/**
		 * Determine whether a given element requires a native click.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element needs a native click
		 */
		FastClick.prototype.needsClick = function(target) {
			switch (target.nodeName.toLowerCase()) {
	
			// Don't send a synthetic click to disabled inputs (issue #62)
			case 'button':
			case 'select':
			case 'textarea':
				if (target.disabled) {
					return true;
				}
	
				break;
			case 'input':
	
				// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
				if ((deviceIsIOS && target.type === 'file') || target.disabled) {
					return true;
				}
	
				break;
			case 'label':
			case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
			case 'video':
				return true;
			}
	
			return (/\bneedsclick\b/).test(target.className);
		};
	
	
		/**
		 * Determine whether a given element requires a call to focus to simulate click into element.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
		 */
		FastClick.prototype.needsFocus = function(target) {
			switch (target.nodeName.toLowerCase()) {
			case 'textarea':
				return true;
			case 'select':
				return !deviceIsAndroid;
			case 'input':
				switch (target.type) {
				case 'button':
				case 'checkbox':
				case 'file':
				case 'image':
				case 'radio':
				case 'submit':
					return false;
				}
	
				// No point in attempting to focus disabled inputs
				return !target.disabled && !target.readOnly;
			default:
				return (/\bneedsfocus\b/).test(target.className);
			}
		};
	
	
		/**
		 * Send a click event to the specified element.
		 *
		 * @param {EventTarget|Element} targetElement
		 * @param {Event} event
		 */
		FastClick.prototype.sendClick = function(targetElement, event) {
			var clickEvent, touch;
	
			// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
			if (document.activeElement && document.activeElement !== targetElement) {
				document.activeElement.blur();
			}
	
			touch = event.changedTouches[0];
	
			// Synthesise a click event, with an extra attribute so it can be tracked
			clickEvent = document.createEvent('MouseEvents');
			clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
			clickEvent.forwardedTouchEvent = true;
			targetElement.dispatchEvent(clickEvent);
		};
	
		FastClick.prototype.determineEventType = function(targetElement) {
	
			//Issue #159: Android Chrome Select Box does not open with a synthetic click event
			if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
				return 'mousedown';
			}
	
			return 'click';
		};
	
	
		/**
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.focus = function(targetElement) {
			var length;
	
			// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
			if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
				length = targetElement.value.length;
				targetElement.setSelectionRange(length, length);
			} else {
				targetElement.focus();
			}
		};
	
	
		/**
		 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
		 *
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.updateScrollParent = function(targetElement) {
			var scrollParent, parentElement;
	
			scrollParent = targetElement.fastClickScrollParent;
	
			// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
			// target element was moved to another parent.
			if (!scrollParent || !scrollParent.contains(targetElement)) {
				parentElement = targetElement;
				do {
					if (parentElement.scrollHeight > parentElement.offsetHeight) {
						scrollParent = parentElement;
						targetElement.fastClickScrollParent = parentElement;
						break;
					}
	
					parentElement = parentElement.parentElement;
				} while (parentElement);
			}
	
			// Always update the scroll top tracker if possible.
			if (scrollParent) {
				scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
			}
		};
	
	
		/**
		 * @param {EventTarget} targetElement
		 * @returns {Element|EventTarget}
		 */
		FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
	
			// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
			if (eventTarget.nodeType === Node.TEXT_NODE) {
				return eventTarget.parentNode;
			}
	
			return eventTarget;
		};
	
	
		/**
		 * On touch start, record the position and scroll offset.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchStart = function(event) {
			var targetElement, touch, selection;
	
			// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
			if (event.targetTouches.length > 1) {
				return true;
			}
	
			targetElement = this.getTargetElementFromEventTarget(event.target);
			touch = event.targetTouches[0];
	
			if (deviceIsIOS) {
	
				// Only trusted events will deselect text on iOS (issue #49)
				selection = window.getSelection();
				if (selection.rangeCount && !selection.isCollapsed) {
					return true;
				}
	
				if (!deviceIsIOS4) {
	
					// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
					// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
					// with the same identifier as the touch event that previously triggered the click that triggered the alert.
					// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
					// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
					// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
					// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
					// random integers, it's safe to to continue if the identifier is 0 here.
					if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
						event.preventDefault();
						return false;
					}
	
					this.lastTouchIdentifier = touch.identifier;
	
					// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
					// 1) the user does a fling scroll on the scrollable layer
					// 2) the user stops the fling scroll with another tap
					// then the event.target of the last 'touchend' event will be the element that was under the user's finger
					// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
					// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
					this.updateScrollParent(targetElement);
				}
			}
	
			this.trackingClick = true;
			this.trackingClickStart = event.timeStamp;
			this.targetElement = targetElement;
	
			this.touchStartX = touch.pageX;
			this.touchStartY = touch.pageY;
	
			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				event.preventDefault();
			}
	
			return true;
		};
	
	
		/**
		 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.touchHasMoved = function(event) {
			var touch = event.changedTouches[0], boundary = this.touchBoundary;
	
			if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
				return true;
			}
	
			return false;
		};
	
	
		/**
		 * Update the last position.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchMove = function(event) {
			if (!this.trackingClick) {
				return true;
			}
	
			// If the touch has moved, cancel the click tracking
			if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
				this.trackingClick = false;
				this.targetElement = null;
			}
	
			return true;
		};
	
	
		/**
		 * Attempt to find the labelled control for the given label element.
		 *
		 * @param {EventTarget|HTMLLabelElement} labelElement
		 * @returns {Element|null}
		 */
		FastClick.prototype.findControl = function(labelElement) {
	
			// Fast path for newer browsers supporting the HTML5 control attribute
			if (labelElement.control !== undefined) {
				return labelElement.control;
			}
	
			// All browsers under test that support touch events also support the HTML5 htmlFor attribute
			if (labelElement.htmlFor) {
				return document.getElementById(labelElement.htmlFor);
			}
	
			// If no for attribute exists, attempt to retrieve the first labellable descendant element
			// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
			return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
		};
	
	
		/**
		 * On touch end, determine whether to send a click event at once.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchEnd = function(event) {
			var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;
	
			if (!this.trackingClick) {
				return true;
			}
	
			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				this.cancelNextClick = true;
				return true;
			}
	
			if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
				return true;
			}
	
			// Reset to prevent wrong click cancel on input (issue #156).
			this.cancelNextClick = false;
	
			this.lastClickTime = event.timeStamp;
	
			trackingClickStart = this.trackingClickStart;
			this.trackingClick = false;
			this.trackingClickStart = 0;
	
			// On some iOS devices, the targetElement supplied with the event is invalid if the layer
			// is performing a transition or scroll, and has to be re-detected manually. Note that
			// for this to function correctly, it must be called *after* the event target is checked!
			// See issue #57; also filed as rdar://13048589 .
			if (deviceIsIOSWithBadTarget) {
				touch = event.changedTouches[0];
	
				// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
				targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
				targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
			}
	
			targetTagName = targetElement.tagName.toLowerCase();
			if (targetTagName === 'label') {
				forElement = this.findControl(targetElement);
				if (forElement) {
					this.focus(targetElement);
					if (deviceIsAndroid) {
						return false;
					}
	
					targetElement = forElement;
				}
			} else if (this.needsFocus(targetElement)) {
	
				// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
				// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
				if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
					this.targetElement = null;
					return false;
				}
	
				this.focus(targetElement);
				this.sendClick(targetElement, event);
	
				// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
				// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
				if (!deviceIsIOS || targetTagName !== 'select') {
					this.targetElement = null;
					event.preventDefault();
				}
	
				return false;
			}
	
			if (deviceIsIOS && !deviceIsIOS4) {
	
				// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
				// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
				scrollParent = targetElement.fastClickScrollParent;
				if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
					return true;
				}
			}
	
			// Prevent the actual click from going though - unless the target node is marked as requiring
			// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
			if (!this.needsClick(targetElement)) {
				event.preventDefault();
				this.sendClick(targetElement, event);
			}
	
			return false;
		};
	
	
		/**
		 * On touch cancel, stop tracking the click.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.onTouchCancel = function() {
			this.trackingClick = false;
			this.targetElement = null;
		};
	
	
		/**
		 * Determine mouse events which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onMouse = function(event) {
	
			// If a target element was never set (because a touch event was never fired) allow the event
			if (!this.targetElement) {
				return true;
			}
	
			if (event.forwardedTouchEvent) {
				return true;
			}
	
			// Programmatically generated events targeting a specific element should be permitted
			if (!event.cancelable) {
				return true;
			}
	
			// Derive and check the target element to see whether the mouse event needs to be permitted;
			// unless explicitly enabled, prevent non-touch click events from triggering actions,
			// to prevent ghost/doubleclicks.
			if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
	
				// Prevent any user-added listeners declared on FastClick element from being fired.
				if (event.stopImmediatePropagation) {
					event.stopImmediatePropagation();
				} else {
	
					// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
					event.propagationStopped = true;
				}
	
				// Cancel the event
				event.stopPropagation();
				event.preventDefault();
	
				return false;
			}
	
			// If the mouse event is permitted, return true for the action to go through.
			return true;
		};
	
	
		/**
		 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
		 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
		 * an actual click which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onClick = function(event) {
			var permitted;
	
			// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
			if (this.trackingClick) {
				this.targetElement = null;
				this.trackingClick = false;
				return true;
			}
	
			// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
			if (event.target.type === 'submit' && event.detail === 0) {
				return true;
			}
	
			permitted = this.onMouse(event);
	
			// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
			if (!permitted) {
				this.targetElement = null;
			}
	
			// If clicks are permitted, return true for the action to go through.
			return permitted;
		};
	
	
		/**
		 * Remove all FastClick's event listeners.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.destroy = function() {
			var layer = this.layer;
	
			if (deviceIsAndroid) {
				layer.removeEventListener('mouseover', this.onMouse, true);
				layer.removeEventListener('mousedown', this.onMouse, true);
				layer.removeEventListener('mouseup', this.onMouse, true);
			}
	
			layer.removeEventListener('click', this.onClick, true);
			layer.removeEventListener('touchstart', this.onTouchStart, false);
			layer.removeEventListener('touchmove', this.onTouchMove, false);
			layer.removeEventListener('touchend', this.onTouchEnd, false);
			layer.removeEventListener('touchcancel', this.onTouchCancel, false);
		};
	
	
		/**
		 * Check whether FastClick is needed.
		 *
		 * @param {Element} layer The layer to listen on
		 */
		FastClick.notNeeded = function(layer) {
			var metaViewport;
			var chromeVersion;
			var blackberryVersion;
			var firefoxVersion;
	
			// Devices that don't support touch don't need FastClick
			if (typeof window.ontouchstart === 'undefined') {
				return true;
			}
	
			// Chrome version - zero for other browsers
			chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];
	
			if (chromeVersion) {
	
				if (deviceIsAndroid) {
					metaViewport = document.querySelector('meta[name=viewport]');
	
					if (metaViewport) {
						// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// Chrome 32 and above with width=device-width or less don't need FastClick
						if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
	
				// Chrome desktop doesn't need FastClick (issue #15)
				} else {
					return true;
				}
			}
	
			if (deviceIsBlackBerry10) {
				blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);
	
				// BlackBerry 10.3+ does not require Fastclick library.
				// https://github.com/ftlabs/fastclick/issues/251
				if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
					metaViewport = document.querySelector('meta[name=viewport]');
	
					if (metaViewport) {
						// user-scalable=no eliminates click delay.
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// width=device-width (or less than device-width) eliminates click delay.
						if (document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
				}
			}
	
			// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
			if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}
	
			// Firefox version - zero for other browsers
			firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];
	
			if (firefoxVersion >= 27) {
				// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896
	
				metaViewport = document.querySelector('meta[name=viewport]');
				if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
					return true;
				}
			}
	
			// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
			// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
			if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}
	
			return false;
		};
	
	
		/**
		 * Factory method for creating a FastClick object
		 *
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		FastClick.attach = function(layer, options) {
			return new FastClick(layer, options);
		};
	
	
		if (true) {
	
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return FastClick;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && module.exports) {
			module.exports = FastClick.attach;
			module.exports.FastClick = FastClick;
		} else {
			window.FastClick = FastClick;
		}
	}());


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(5);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Dialog Component for tinglejs
	 */
	
	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _defineProperty(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var classnames = __webpack_require__(6);
	var Layer = __webpack_require__(7);
	
	var Dialog = (function (_React$Component) {
	    function Dialog(props) {
	        _classCallCheck(this, Dialog);
	
	        _get(Object.getPrototypeOf(Dialog.prototype), 'constructor', this).call(this, props);
	
	        this.state = {
	            show: this.props.show
	        };
	    }
	
	    _inherits(Dialog, _React$Component);
	
	    _createClass(Dialog, [{
	        key: '_show',
	        value: function _show(options) {
	            this.show(options, true);
	        }
	    }, {
	        key: 'show',
	        value: function show(options) {
	            var state = this.state,
	                prop = options ? options : this.props;
	
	            state.show = true;
	            state.title = prop.title;
	            state.children = prop.children;
	            state.buttons = prop.buttons;
	
	            this.setState(state);
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            this.state.show = false;
	            this.setState(this.state);
	        }
	    }, {
	        key: 'handleClick',
	        value: function handleClick(callback) {
	            this.hide();
	            callback && callback();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var t = this;
	            var btn = '';
	            var _props = this.props;
	            var className = _props.className;
	            var show = _props.show;
	            var other = _objectWithoutProperties(_props, ['className', 'show']);
	            var title = this.state.title;
	            var buttons = this.state.buttons;
	            var classSet = _defineProperty({
	                'tDialog tR5 tPT20': true
	            }, this.props.className, !!this.props.className);
	
	            btn = buttons && buttons.map(function (item) {
	                var callback = item.callback || function () {};
	                return React.createElement(
	                    'div',
	                    { className: 'tFB1' + (item.primary ? ' tPrimary' : ''), onClick: t.handleClick.bind(t, item.callback) },
	                    item.text
	                );
	            });
	
	            return React.createElement(
	                Layer,
	                _extends({ show: this.state.show }, other),
	                React.createElement(
	                    'div',
	                    { className: classnames(classSet) },
	                    title ? React.createElement(
	                        'h1',
	                        { className: 'tFAC tFS16 tFC3' },
	                        title
	                    ) : '',
	                    React.createElement(
	                        'div',
	                        { className: 'tPL16 tPR16 tPT8 tPB20 tFS14 tFC3 tFAC tLH1_5' },
	                        this.state.children
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'tOperation tFBH tFAC tH44 tF16 tLH44' },
	                        btn
	                    )
	                )
	            );
	        }
	    }]);
	
	    return Dialog;
	})(React.Component);
	
	Dialog.defaultProps = {
	    buttons: [{
	        text: '确 定',
	        callback: function callback() {},
	        primary: true
	    }],
	    mask: true,
	    show: false
	};
	
	// http://facebook.github.io/react/docs/reusable-components.html
	Dialog.propTypes = {};
	
	var WRAPPER_ID = '__TingleGlobalDialog__';
	var doc = document;
	
	Dialog.global = null;
	function show(options) {
	    // 只有首次全局调用时，才会创建全局实例
	    if (!Dialog.global) {
	        var wrapper = doc.getElementById(WRAPPER_ID);
	
	        var other = _objectWithoutProperties(options, []);
	
	        if (!wrapper) {
	            wrapper = doc.createElement('div');
	            wrapper.id = WRAPPER_ID;
	            doc.body.appendChild(wrapper);
	        }
	
	        Dialog.global = React.render(React.createElement(Dialog, other), wrapper);
	    }
	    Dialog.global._show(options);
	}
	Dialog.alert = function (options) {
	    options.buttons = [{
	        text: options.confirmText || '确 定',
	        callback: options.onConfirm,
	        primary: true
	    }];
	    show(options);
	};
	Dialog.confirm = function (options) {
	    options.buttons = [{
	        text: options.cancelText || '取 消',
	        callback: options.onCancel
	    }, {
	        text: options.confirmText || '确 定',
	        callback: options.onConfirm,
	        primary: true
	    }];
	    show(options);
	};
	
	module.exports = Dialog;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	
	(function () {
		'use strict';
	
		function classNames () {
	
			var classes = '';
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if ('string' === argType || 'number' === argType) {
					classes += ' ' + arg;
	
				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);
	
				} else if ('object' === argType) {
					for (var key in arg) {
						if (arg.hasOwnProperty(key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}
	
			return classes.substr(1);
		}
	
		if (true) {
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else {
			window.classNames = classNames;
		}
	
	}());


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(8);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Layer Component for tinglejs
	 */
	
	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var Mask = __webpack_require__(9);
	
	var Layer = (function (_React$Component) {
	    function Layer(props) {
	        _classCallCheck(this, Layer);
	
	        _get(Object.getPrototypeOf(Layer.prototype), 'constructor', this).call(this, props);
	    }
	
	    _inherits(Layer, _React$Component);
	
	    _createClass(Layer, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            document.documentElement.style.height = '100%';
	            document.body.style.height = '100%';
	            this.handleMask(this.props);
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(props, state) {
	            this.handleMask(props);
	        }
	    }, {
	        key: 'handleMask',
	        value: function handleMask(props) {
	            if (props.mask) {
	                props.show ? Mask.show({
	                    opacity: 0.2
	                }) : Mask.hide();
	            }
	        }
	    }, {
	        key: 'getStyle',
	        value: function getStyle() {
	            var prop = this.props,
	                show = prop.show,
	                width = ('width' in prop),
	                height = ('height' in prop),
	                full = prop.mode == 'full',
	                top = ('top' in prop),
	                bottom = ('bottom' in prop),
	                left = ('left' in prop),
	                right = ('right' in prop),
	                style = {
	                width: full || !width ? '100%' : prop.width,
	                height: full ? '100%' : height ? prop.height : 'auto'
	            };
	
	            if (full) {
	                style.top = 0;
	                style.left = 0;
	            } else {
	                if (top) {
	                    style.top = prop.top;
	                } else if (bottom) {
	                    style.bottom = prop.bottom;
	                } else {
	                    style.top = '50%';
	                    style['WebkitTransform'] = (style['WebkitTransform'] || '') + ' translateY(-50%)';
	                    style['transform'] = (style['transform'] || '') + ' translateY(-50%)';
	                }
	
	                if (left) {
	                    style.left = prop.left;
	                } else if (right) {
	                    style.right = prop.right;
	                } else {
	                    style.left = '50%';
	                    style['WebkitTransform'] = (style['WebkitTransform'] || '') + ' translateX(-50%)';
	                    style['transform'] = (style['transform'] || '') + ' translateX(-50%)';
	                }
	            }
	
	            style.zIndex = prop.zIndex;
	            style.display = show ? 'block' : 'none';
	
	            return style;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { className: 'tLayer', style: this.getStyle() },
	                this.props.children
	            );
	        }
	    }]);
	
	    return Layer;
	})(React.Component);
	
	Layer.defaultProps = {
	    zIndex: 1001,
	    mask: false,
	    show: false
	};
	
	// http://facebook.github.io/react/docs/reusable-components.html
	Layer.propTypes = {};
	
	module.exports = Layer;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(10);

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _defineProperty(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var Mask = (function (_React$Component) {
	    function Mask(props) {
	        _classCallCheck(this, Mask);
	
	        _get(Object.getPrototypeOf(Mask.prototype), 'constructor', this).call(this, props);
	        this.state = {
	            opacity: props.opacity,
	            zIndex: props.zIndex,
	            onHide: props.onHide,
	            closeable: this.props.closeable
	        };
	    }
	
	    _inherits(Mask, _React$Component);
	
	    _createClass(Mask, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.el = this.refs.el.getDOMNode();
	        }
	    }, {
	        key: 'show',
	
	        /*
	            options.onHide
	            options.onClick
	            options.opacity
	        */
	        value: function show(options) {
	            options = options || {};
	            var t = this;
	            t.el.classList.add('visible');
	            t.el.offsetWidth;
	            t.setState({
	                closeable: 'closeable' in options ? options.closeable : false,
	                opacity: options.opacity || t.props.opacity,
	                onClick: options.onClick || t.props.onClick,
	                onHide: options.onHide || t.props.onHide
	            });
	            t.el.style.opacity = 1;
	        }
	    }, {
	        key: 'hide',
	        value: function hide(force) {
	            var t = this;
	
	            if (force || this.state.closeable) {
	                t.el.style.opacity = 0;
	                t.el.classList.remove('visible');
	                t.state.onHide.call(t);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var t = this;
	            var cls = React.addons.classSet;
	
	            cls = cls(_defineProperty({
	                tMask: true
	            }, t.props.className, !!t.props.className));
	            return React.createElement('div', { ref: 'el', className: cls, style: {
	                    backgroundColor: 'rgba(0, 0, 0, ' + t.state.opacity + ')',
	                    zIndex: t.state.zIndex
	                }, onClick: t.hide.bind(this, false) });
	        }
	    }]);
	
	    return Mask;
	})(React.Component);
	
	Mask.defaultProps = {
	    className: '',
	    zIndex: 1000,
	    opacity: 0.5,
	    visible: false,
	    onClick: function onClick() {},
	    onHide: function onHide() {},
	    closeable: true
	};
	
	var WRAPPER_ID = '__TingleGlobalMask__';
	var doc = document;
	var wrapper = doc.getElementById(WRAPPER_ID);
	if (!wrapper) {
	    wrapper = doc.createElement('div');
	    wrapper.id = WRAPPER_ID;
	    doc.body.appendChild(wrapper);
	}
	
	Mask.global = null;
	
	Mask.show = function (options) {
	    // 只有首次全局调用时，才会创建全局实例
	    if (!Mask.global) {
	        var wrapper = doc.getElementById(WRAPPER_ID);
	        if (!wrapper) {
	            wrapper = doc.createElement('div');
	            wrapper.id = WRAPPER_ID;
	            doc.body.appendChild(wrapper);
	        }
	        Mask.global = React.render(React.createElement(Mask, { closeable: false }), wrapper);
	    }
	    Mask.global.show(options);
	};
	
	Mask.hide = function () {
	    Mask.global && Mask.global.hide(true);
	};
	
	module.exports = Mask;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(12);

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _defineProperty(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var classnames = __webpack_require__(6);
	
	var GroupList = (function (_React$Component) {
	    function GroupList(props) {
	        _classCallCheck(this, GroupList);
	
	        _get(Object.getPrototypeOf(GroupList.prototype), "constructor", this).call(this, props);
	    }
	
	    _inherits(GroupList, _React$Component);
	
	    _createClass(GroupList, [{
	        key: "render",
	        value: function render() {
	            var t = this;
	            var items = React.Children.map(this.props.children, function (Item, index) {
	                return React.createElement(
	                    "li",
	                    { className: "tGroupListItem" },
	                    Item
	                );
	            });
	
	            return React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "h4",
	                    { className: "tFS12 tLH1_5 tPL10 tPR10 tOmit" },
	                    t.props.title
	                ),
	                React.createElement(
	                    "ul",
	                    { className: classnames(_defineProperty({
	                            tGroupList: true
	                        }, t.props.className, !!t.props.className)), style: {
	                            paddingLeft: t.props.itemIndent
	                        } },
	                    items
	                )
	            );
	        }
	    }]);
	
	    return GroupList;
	})(React.Component);
	
	GroupList.propTypes = {
	    itemIndent: React.PropTypes.number
	};
	
	GroupList.defaultProps = {
	    itemIndent: 0
	};
	
	module.exports = GroupList;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(14);

/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * OnOff Component for tinglejs
	 */
	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _defineProperty(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var OnOff = (function (_React$Component) {
	    function OnOff(props) {
	        _classCallCheck(this, OnOff);
	
	        _get(Object.getPrototypeOf(OnOff.prototype), "constructor", this).call(this, props);
	        // this.state = {
	        //     on:t.this.props.on
	        // }
	    }
	
	    _inherits(OnOff, _React$Component);
	
	    _createClass(OnOff, [{
	        key: "handleChange",
	
	        /*
	        * options
	        */
	        value: function handleChange() {
	            var t = this;
	            // t.state.on=!t.state.on;
	            // t.setState(t.state);
	            t.props.onChange(!t.props.on);
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var t = this;
	            var cx = React.addons.classSet;
	            var classSet = _defineProperty({
	                "tOnOffPannel": true,
	                "tOn": t.props.on
	            }, t.props.className, !!t.props.className);
	            return React.createElement(
	                "div",
	                { className: cx(classSet), onClick: t.handleChange.bind(this) },
	                React.createElement("div", { className: "tOnOffRadius" })
	            );
	        }
	    }]);
	
	    return OnOff;
	})(React.Component);
	
	OnOff.defaultProps = {
	    on: true,
	    onChange: function onChange() {}
	};
	
	// http://facebook.github.io/react/docs/reusable-components.html
	OnOff.propTypes = {
	    on: React.PropTypes.bool,
	    onChange: React.PropTypes.func
	};
	
	module.exports = OnOff;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(16);

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * OnOffField Component for tinglejs
	 * @auther ruiyang.dry
	 *
	 * Copyright 2014-2015, Tingle Team, Alinw.
	 * All rights reserved.
	 */
	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _defineProperty(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var OnOff = __webpack_require__(13);
	var classnames = __webpack_require__(6);
	
	var OnOffField = (function (_React$Component) {
	    function OnOffField(props) {
	        _classCallCheck(this, OnOffField);
	
	        _get(Object.getPrototypeOf(OnOffField.prototype), 'constructor', this).call(this, props);
	    }
	
	    _inherits(OnOffField, _React$Component);
	
	    _createClass(OnOffField, [{
	        key: 'handleChange',
	        value: function handleChange(on) {
	            console.log(arguments);
	            this.props.onChange(on);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var t = this;
	            return React.createElement(
	                'div',
	                { className: classnames(_defineProperty({
	                        'tPL10 tPR10 tFBH tFBAC tFS14 tOnOffField ': true
	                    }, t.props.className, !!t.props.className)) },
	                React.createElement(
	                    'div',
	                    { className: 'tMR10 tLH1_3 tFC6 tFieldLabel' },
	                    t.props.label
	                ),
	                React.createElement('div', { className: 'tFB1' }),
	                React.createElement(OnOff, { on: this.props.on, onChange: this.handleChange.bind(this) })
	            );
	        }
	    }]);
	
	    return OnOffField;
	})(React.Component);
	
	OnOffField.defaultProps = {};
	
	// http://facebook.github.io/react/docs/reusable-components.html
	OnOffField.propTypes = {
	    label: React.PropTypes.string.isRequired
	};
	
	module.exports = OnOffField;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(18);

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _defineProperty(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var classnames = __webpack_require__(6);
	
	var win = window;
	var doc = document;
	
	var ua = navigator.userAgent;
	var isMobile = !!ua.match(/mobile/i) || 'orientation' in win;
	var isPC = !isMobile;
	
	var supportTouch = ('ontouchstart' in window);
	var support3D = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix();
	
	// 常量
	var START = supportTouch ? 'touchstart' : 'mousedown';
	var MOVE = supportTouch ? 'touchmove' : 'mousemove';
	var END = supportTouch ? 'touchend' : 'mouseup';
	var CANCEL = supportTouch ? 'touchcancel' : 'mouseup';
	var PREV = 'prev';
	var CURRENT = 'current';
	var NEXT = 'next';
	var OFFSET = 'offset';
	var POS_MAP = {
	    '-1': PREV,
	    '0': CURRENT,
	    '1': NEXT
	};
	
	// 创建translate字符串
	// TODO: translate(0,0) translateZ(0);
	var makeTranslate = (function () {
	    var prefix = support3D ? 'translate3d(' : 'translate(';
	    var suffix = support3D ? ', 0)' : ')';
	    var join = ',';
	
	    function v(n) {
	        n = '' + (n || 0);
	        n = n.indexOf('%') > -1 ? n : n + 'px';
	        return n;
	    }
	
	    return function (x, y) {
	        return prefix + v(x) + join + v(y) + suffix;
	    };
	})();
	
	// 获取兼容PC和Device的event对象的page属性
	var getCursorPage = supportTouch ? function (event, page) {
	    return event.changedTouches[0][page];
	} : function (event, page) {
	    return event[page];
	};
	
	var noop = function noop() {};
	
	var Slide = (function (_React$Component) {
	    function Slide(props) {
	        _classCallCheck(this, Slide);
	
	        _get(Object.getPrototypeOf(Slide.prototype), 'constructor', this).call(this, props);
	        var t = this;
	
	        // 能够触发切换的最小偏移量
	        this.effectiveDelta = 40;
	
	        // 切换动画的时长
	        // TOTO 根据手势滑动的速度来决定动画时长
	        this.duration = 150;
	
	        this.state = {
	            // NOTE: 把list转成state的原因：
	            // 当item数量为2时，内部将会复制一份，处理后的数量为4，以实现循环轮播
	            // list: props.list,
	            // 当前item的索引值 以0开始
	            auto: props.auto,
	            index: props.index,
	            disabled: false
	        };
	
	        win.addEventListener('resize', function () {
	            t._resize.call(t);
	        });
	    }
	
	    _inherits(Slide, _React$Component);
	
	    _createClass(Slide, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            var t = this;
	
	            var originLength = React.Children.count(t.props.children);
	
	            // TODO: check
	            if (originLength === 1) {
	                t.state.disabled = true;
	            }
	
	            // item的长度经处理后不存在为2的情况
	            else if (originLength === 2) {
	                t._dummy = true;
	                t._realIndex = {
	                    '0': 0,
	                    '1': 1,
	                    '2': 0,
	                    '3': 1
	                };
	            }
	
	            // 处理以后的长度，即item的个数
	            t.length = t._dummy ? 4 : originLength;
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var t = this;
	
	            t.el = React.findDOMNode(t);
	
	            // 确定容器宽度
	            t.width = isPC ? t.el.clientWidth : win.innerWidth;
	
	            // 至少有2张slide时，才初始化事件
	            if (t.length > 1) {
	                t.el.addEventListener(START, t, false);
	            }
	
	            // 前一个，当前的，后一个item的element引用
	            t._prev = null;
	            t._current = null;
	            t._next = null;
	
	            t._deltaX = 0;
	            t._minIndex = 0;
	            t._maxIndex = t.length - 1;
	
	            t._goto(t.state.index, true);
	
	            t.props.onMount(t);
	
	            t._autoSlide();
	        }
	    }, {
	        key: '_autoSlide',
	        value: function _autoSlide() {
	            var t = this;
	            if (!t.state.auto) return;
	            t._autoSlideTimer = setTimeout(function () {
	                t.goNext();
	                t._autoSlide();
	            }, 4000);
	        }
	    }, {
	        key: '_goto',
	
	        /**
	         * @param {number} index 目标位置的索引值
	         * @param {boolean} callFromDidMount 是否是在componentDidMount中被调用的
	         */
	        value: function _goto(posIndex, callFromDidMount) {
	            var t = this;
	            callFromDidMount = !!callFromDidMount;
	
	            if (t.length === 1 || callFromDidMount) {
	                // `_getItemReady`方法被调用之前，需要先更新`currentPosIndex`的值
	                t.currentPosIndex = posIndex;
	                t._getItemReady(0);
	
	                if (t.length > 2 || t._dummy) {
	                    t._getItemReady(1);
	                    t._getItemReady(-1);
	                }
	
	                t._slideEnd();
	            } else if (!callFromDidMount) {
	
	                // 通过goNext/goPrev调用的_goto，一直有方向(_dir)值 向左:-1 / 向右:1
	                if (t._dir) {
	                    t._getItemUnready(t._dir === 1 ? t._next : t._prev);
	                    t._moveItem(t._current, t._dir);
	                    t._moveItem(t._dir === 1 ? t._prev : t._next, t._dir);
	
	                    // `_getItemReady`方法被调用之前，需要先更新`currentPosIndex`的值
	                    t.currentPosIndex = posIndex;
	                    t._getItemReady(t._dir * -1);
	
	                    setTimeout(function () {
	                        t._slideEnd();
	                    }, t.duration);
	                }
	
	                // 归位的情况：移动距离小于有效距离时
	                else if (posIndex === t.currentPosIndex) {
	                    // 归位当前item
	                    t._moveItem(t._current, 0);
	                    // 归位进入屏幕的另一个item
	                    // 说明:任意一个时间点,出现在屏幕内的item数量最多为2个,要么左边,要么右边,取决于移动方向
	                    if (t._moveBack) {
	                        t._moveItem(t._moveBack, 0);
	                    }
	                    // 当resize时
	                    else {
	                        t._moveItem(t._prev, 0);
	                        t._moveItem(t._next, 0);
	                    }
	                }
	            }
	
	            t._moveBack = null;
	            t._dir = null;
	        }
	    }, {
	        key: 'goNext',
	        value: function goNext() {
	            var t = this;
	            // 方向是向左(-1)，要展现的是后一张(1)
	            t._dir = -1;
	            t._goto(t._getPosIndex(1));
	        }
	    }, {
	        key: 'goPrev',
	        value: function goPrev() {
	            var t = this;
	            // 方向是向右(1)，要展现的是前一张(-1)
	            t._dir = 1;
	            t._goto(t._getPosIndex(-1));
	        }
	    }, {
	        key: '_moveItem',
	
	        /**
	         * 移动item到新的位置
	         * @param {element} item
	         * @param {number} dir 移动的方向 -1:向左移动 / 1:向右移动 / 0:移动到原位
	         */
	        value: function _moveItem(item, dir) {
	            var t = this;
	            item.style.webkitTransitionDuration = t.duration + 'ms';
	
	            var newOffset = +item.getAttribute(OFFSET) + dir;
	
	            t._setItemX(item, t._getPosX(newOffset));
	
	            // 如果进行了切换行为，即dir为-1或1
	            if (dir) {
	                item.setAttribute(OFFSET, newOffset);
	                t['_' + POS_MAP[newOffset]] = item;
	            }
	        }
	    }, {
	        key: '_getItemReady',
	
	        /**
	         * 根据指定的偏移量，找到对应的item，将其切换到可移动状态
	         * @param {number} offset -1:前一个位置 / 0:当前位置 / 1: 后一个位置
	         * @note 任何时刻，可移动状态的item数量只有三个
	         * @note 该方法依赖`currentPosIndex`和`offset`查找目标`item`，
	         *       而`_getItemUnready`方法直接给定了`item`，不需要依赖`currentPosIndex`和`offset`
	         */
	        value: function _getItemReady(offset) {
	            var t = this;
	            var targetPosIndex = t._getPosIndex(offset);
	            var item = React.findDOMNode(t.refs['item' + targetPosIndex]);
	            item.classList.add('ready');
	            item.setAttribute(OFFSET, offset);
	            item.style.webkitTransform = makeTranslate(t._getPosX(offset));
	            t['_' + POS_MAP[offset]] = item;
	        }
	    }, {
	        key: '_getItemUnready',
	
	        /**
	         * 将指定的item切换到不可移动状态，即不参与切换行为。
	         * @param {element} item 要改变状态的item
	         * @note 这个函数虽然含义上和_setItemReady对应，但参数直接只用item，
	         *  是处于性能考虑，因为调用该函数的时候，都是明确知道目标item的。
	         */
	        value: function _getItemUnready(item) {
	            var t = this;
	            item.classList.remove('ready');
	            item.removeAttribute(OFFSET);
	            item.style.webkitTransitionDuration = '0';
	            item.style.webkitTransform = 'none';
	        }
	    }, {
	        key: '_getPosX',
	
	        /**
	         * 获取指定的offset所对应的X坐标值(0点在当前item的左边缘)
	         * @param {number} offset -1:前一个位置 / 0:当前位置 / 1: 后一个位置
	         */
	        value: function _getPosX(offset) {
	            var t = this;
	            return offset === -1 ? -t.width : offset === 1 ? t.width : 0;
	        }
	    }, {
	        key: '_setItemX',
	
	        /**
	         *
	         */
	        value: function _setItemX(item, x) {
	            this['_' + POS_MAP[item.getAttribute(OFFSET)] + 'X'] = x;
	            item.style.webkitTransform = makeTranslate(x);
	        }
	    }, {
	        key: '_getPosIndex',
	
	        /**
	         * 获取前一个或后一个位置的索引值，相对值是currentPosIndex
	         * @param {number} offset -1:取前一个位置 / 0:取当前位置 / 1: 取后一个位置
	         */
	        value: function _getPosIndex(offset) {
	            var t = this,
	                index;
	            if (offset === -1) {
	                index = t.currentPosIndex === t._minIndex ? t._maxIndex : t.currentPosIndex - 1;
	            } else if (offset === 1) {
	                index = t.currentPosIndex === t._maxIndex ? t._minIndex : t.currentPosIndex + 1;
	            } else if (offset === 0) {
	                index = t.currentPosIndex;
	            } else {
	                throw new Error('error offset');
	            }
	            return index;
	        }
	    }, {
	        key: 'handleEvent',
	        value: function handleEvent(e) {
	            var t = this;
	            switch (e.type) {
	                case START:
	                    t._touchStart(e);
	                    break;
	                case MOVE:
	                    t._touchMove(e);
	                    break;
	                case END:
	                    t._touchEnd(e);
	                    break;
	                case CANCEL:
	                    t._touchEnd(e);
	                    break;
	            }
	        }
	    }, {
	        key: '_touchStart',
	        value: function _touchStart(e) {
	            // 只响应单指操作
	            if (supportTouch && e.touches.length > 1) {
	                return;
	            }
	
	            var t = this;
	
	            clearTimeout(t._autoSlideTimer);
	
	            // 恢复到0 拖拽过程中快速响应移动距离
	            t._prev.style.webkitTransitionDuration = '0ms';
	            t._current.style.webkitTransitionDuration = '0ms';
	            t._next.style.webkitTransitionDuration = '0ms';
	
	            // 移动初始值
	            t._prevX = t._getPosX(-1);
	            t._currentX = t._getPosX(0);
	            t._nextX = t._getPosX(1);
	
	            // 浏览器默认滚动
	            t.browserScrolling = false;
	
	            // 是否是切换状态 此时忽略浏览器默认的滚动行为
	            t.sliding = false;
	
	            t.startPageX = getCursorPage(e, 'pageX');
	            t.startPageY = getCursorPage(e, 'pageY');
	            t.basePageX = t.startPageX;
	            t.startTime = e.timeStamp;
	
	            doc.addEventListener(MOVE, t, false);
	            doc.addEventListener(END, t, false);
	        }
	    }, {
	        key: '_touchMove',
	        value: function _touchMove(e) {
	            // 只响应单指操作
	            if (supportTouch && e.touches.length > 1) {
	                return;
	            }
	
	            var t = this;
	
	            // 如果浏览器默认滚动行为已被触发，则不执行Slider的滚动
	            if (t.browserScrolling) {
	                return;
	            }
	
	            var pageX = getCursorPage(e, 'pageX'),
	                pageY = getCursorPage(e, 'pageY'),
	                distX,
	                newPrevX,
	                newCurrentX,
	                newNextX,
	                deltaY;
	
	            t.deltaX = pageX - t.startPageX;
	
	            // 如果slide开始滚动
	            if (t.sliding) {
	                e.preventDefault();
	                e.stopPropagation();
	
	                // 任意时刻的位移值
	                distX = pageX - t.basePageX;
	
	                // 当不是循环模式的时候，第一张和最后一张添加粘性
	                if (t.props.loop === false && (distX >= 0 && t.currentPosIndex === t._minIndex || distX < 0 && t.currentPosIndex === t._maxIndex)) {
	                    distX = distX - distX / 1.3;
	                }
	
	                // 位移后的X坐标
	                newPrevX = t._prevX + distX;
	                newCurrentX = t._currentX + distX;
	                newNextX = t._nextX + distX;
	
	                // 更新DOM位置
	                t._setItemX(t._prev, newPrevX);
	                t._setItemX(t._current, newCurrentX);
	                t._setItemX(t._next, newNextX);
	
	                if (t.deltaX >= 0) {
	                    t._moveBack = t._prev;
	                } else {
	                    t._moveBack = t._next;
	                }
	            } else {
	                deltaY = pageY - t.startPageY;
	
	                // 如果X轴的移动距离先达到5px，则执行Slider的滚动
	                // 如果Y轴的移动距离先达到5px，则执行浏览器默认的页面滚动
	                if (Math.abs(t.deltaX) > 5) {
	                    e.preventDefault();
	                    e.stopPropagation();
	                    t.sliding = true;
	                } else if (Math.abs(deltaY) > 5) {
	                    t.browserScrolling = true;
	                }
	            }
	
	            t.basePageX = pageX;
	        }
	    }, {
	        key: '_touchEnd',
	        value: function _touchEnd(e) {
	            // 只响应单指操作
	            if (supportTouch && e.touches.length > 1) {
	                return;
	            }
	
	            var t = this;
	
	            // 如果浏览器默认滚动行为已被触发，则不执行Slider的滚动
	            if (t.browserScrolling) {
	                return;
	            }
	
	            t.browserScrolling = false;
	
	            // 向右滑动
	            if (t.deltaX > t.effectiveDelta) {
	                if (t.currentPosIndex === t._minIndex && t.props.loop === false) {
	                    t._goto(t.currentPosIndex);
	                } else {
	                    t.goPrev();
	                }
	            }
	            // 向左滑动
	            else if (t.deltaX < -t.effectiveDelta) {
	                if (t.currentPosIndex === t._maxIndex && t.props.loop === false) {
	                    t._goto(t.currentPosIndex);
	                } else {
	                    t.goNext();
	                }
	            } else {
	                t._goto(t.currentPosIndex);
	            }
	
	            t.deltaX = 0;
	
	            doc.removeEventListener(MOVE, t, false);
	            doc.removeEventListener(END, t, false);
	
	            t._autoSlide();
	        }
	    }, {
	        key: '_slideEnd',
	        value: function _slideEnd() {
	            var t = this;
	            var realIndex = t._getRealIndex(t.currentPosIndex);
	            t.props.onSlideEnd({
	                index: realIndex,
	                item: t._current,
	                data: t.props.children[realIndex]
	            });
	        }
	    }, {
	        key: '_getRealIndex',
	        value: function _getRealIndex(posIndex) {
	            var t = this;
	            return t._dummy ? t._realIndex[posIndex] : posIndex;
	        }
	    }, {
	        key: '_resize',
	
	        /**
	         * 当屏幕旋转时，更新基本数据 && 再次定位
	         */
	        value: function _resize() {
	            var t = this;
	            t.width = isPC ? t.el.clientWidth : win.innerWidth;
	            t._goto(t.currentPosIndex);
	        }
	    }, {
	        key: '_renderItems',
	
	        /**
	         * 渲染items 当item数量为2时，该方法会被调用两次，第二次函数为true，以实现循环轮播
	         * @param {boolean} dummyMode 是否是在渲染补位的item，
	         * @note 只有当`props.children`的长度为2时，才需要进行补位
	         */
	        value: function _renderItems(dummyMode) {
	            var t = this;
	            return t.props.children.map(function (Child, index) {
	                return React.createElement(
	                    'div',
	                    { ref: 'item' + (index + (dummyMode ? 2 : 0)), key: index + (dummyMode ? 2 : 0),
	                        className: 'tSlideItem tSlideItem' + t._getRealIndex(index) },
	                    Child
	                );
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var t = this;
	            return React.createElement(
	                'div',
	                { className: classnames(_defineProperty({
	                        'tSlide': true,
	                        'tSlideOff': t.state.disabled
	                    }, t.props.className, !!t.props.className)) },
	                React.createElement(
	                    'div',
	                    { className: 't3D tSlideView', style: { height: t.props.height } },
	                    t._renderItems(),
	                    t._dummy && t._renderItems(true)
	                )
	            );
	        }
	    }]);
	
	    return Slide;
	})(React.Component);
	
	Slide.propTypes = {
	    height: React.PropTypes.number,
	    index: React.PropTypes.number,
	    auto: React.PropTypes.bool,
	    loop: React.PropTypes.bool,
	    onMount: React.PropTypes.func,
	    onSlideEnd: React.PropTypes.func
	};
	
	Slide.defaultProps = {
	    height: 180,
	    index: 0,
	    auto: false,
	    loop: true,
	    onMount: noop,
	    onSlideEnd: noop
	};
	
	module.exports = Slide;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(20);

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _defineProperty(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var classnames = __webpack_require__(6);
	
	var TextField = (function (_React$Component) {
	    function TextField(props) {
	        _classCallCheck(this, TextField);
	
	        _get(Object.getPrototypeOf(TextField.prototype), 'constructor', this).call(this, props);
	    }
	
	    _inherits(TextField, _React$Component);
	
	    _createClass(TextField, [{
	        key: 'handleChange',
	        value: function handleChange(e) {
	            this.props.onChange(e.target.value);
	        }
	    }, {
	        key: 'handleFocus',
	        value: function handleFocus() {
	            if (this.props.value.length) return;
	            this.refs.placeholder.getDOMNode().style.display = 'none';
	        }
	    }, {
	        key: 'handleBlur',
	        value: function handleBlur() {
	            if (this.props.value.length) return;
	            this.refs.placeholder.getDOMNode().style.display = 'block';
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var t = this;
	
	            return React.createElement(
	                'div',
	                { className: classnames(_defineProperty({
	                        'tPL10 tPR10 tFBH tFBAC tFS14 tTextField ': true
	                    }, t.props.className, !!t.props.className)) },
	                React.createElement(
	                    'div',
	                    { className: 'tMR10 tLH1_3 tFC6 tFieldLabel' },
	                    t.props.label
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'tFB1 tPR tFC9' },
	                    React.createElement(
	                        'div',
	                        { ref: 'placeholder', className: classnames({
	                                'tOmit tFieldPlaceholder': true,
	                                tDN: !!t.props.value
	                            }) },
	                        t.props.placeholder
	                    ),
	                    React.createElement('input', { className: 'tInput tFC9',
	                        type: 'text', value: t.props.value, readOnly: t.props.readOnly,
	                        onChange: t.handleChange.bind(t),
	                        onFocus: t.handleFocus.bind(t),
	                        onBlur: t.handleBlur.bind(t) })
	                )
	            );
	        }
	    }]);
	
	    return TextField;
	})(React.Component);
	
	TextField.defaultProps = {
	    placeholder: '',
	    value: '',
	    readOnly: false
	};
	
	TextField.propTypes = {
	    label: React.PropTypes.string.isRequired,
	    readOnly: React.PropTypes.bool,
	    onChange: React.PropTypes.func
	};
	
	module.exports = TextField;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(22);

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * TextareaField Component for tinglejs
	 * @auther zhangshun
	 *
	 * Copyright 2014-2015, Tingle Team, Alinw.
	 * All rights reserved.
	 */
	
	//https://github.com/andreypopp/react-textarea-autosize
	//http://stackoverflow.com/questions/6890149/remove-3-pixels-in-ios-webkit-textarea/7029825#7029825
	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _defineProperty(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var classnames = __webpack_require__(6);
	
	var autosize = __webpack_require__(23);
	
	var TextareaField = (function (_React$Component) {
	    function TextareaField(props) {
	        _classCallCheck(this, TextareaField);
	
	        _get(Object.getPrototypeOf(TextareaField.prototype), 'constructor', this).call(this, props);
	        this.state = {
	            lineHeight: props.lineHeight
	        };
	    }
	
	    _inherits(TextareaField, _React$Component);
	
	    _createClass(TextareaField, [{
	        key: 'render',
	        value: function render() {
	            var t = this;
	            var _props = this.props;
	            var placeholder = _props.placeholder;
	            var label = _props.label;
	            var readOnly = _props.readOnly;
	
	            var style = {
	                lineHeight: t.state.lineHeight + 'px',
	                minHeight: t.state.lineHeight * t.props.minRows,
	                maxHeight: t.state.lineHeight * t.props.maxRows
	            };
	
	            return React.createElement(
	                'div',
	                { className: classnames(_defineProperty({
	                        'tPL10 tPR10 tFBH tFBAC tFS14 tTextareaField': true,
	                        'readOnly': readOnly
	                    }, t.props.className, !!t.props.className)) },
	                label && React.createElement(
	                    'div',
	                    { className: 'tMR10 tLH1_3 tFC6 tFieldLabel' },
	                    label
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'tFB1 tPR tFC9' },
	                    React.createElement('textarea', { ref: 'textarea',
	                        className: 'tTextarea tFC9',
	                        style: style,
	                        placeholder: placeholder,
	                        value: t.props.value,
	                        readOnly: readOnly,
	                        rows: t.props.minRows,
	                        onChange: t.handleChange.bind(t),
	                        onFocus: t.handleFocus.bind(t),
	                        onBlur: t.handleBlur.bind(t) })
	                )
	            );
	        }
	    }, {
	        key: 'componentDidMount',
	
	        /**
	         * 重新调整高度
	         * @return {[type]} [description]
	         */
	        value: function componentDidMount() {
	            // 设置autosize
	            var t = this;
	            var textareaEle = React.findDOMNode(t.refs.textarea);
	            autosize(textareaEle);
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            // 销毁
	            autosize.destroy(React.findDOMNode(this.refs.textarea));
	        }
	    }, {
	        key: 'handleChange',
	        value: function handleChange(e) {
	            this.props.onChange(e.target.value, e);
	        }
	    }, {
	        key: 'handleFocus',
	        value: function handleFocus(e) {
	            this.props.onFocus(e);
	        }
	    }, {
	        key: 'handleBlur',
	        value: function handleBlur(e) {
	            this.props.onBlur(e);
	        }
	    }]);
	
	    return TextareaField;
	})(React.Component);
	
	TextareaField.defaultProps = {
	    value: '',
	    placeholder: '',
	    onChange: function onChange() {},
	    onFocus: function onFocus() {},
	    onBlur: function onBlur() {},
	    readOnly: false,
	    minRows: 1,
	    maxRows: 10,
	    lineHeight: 22
	};
	
	// http://facebook.github.io/react/docs/reusable-components.html
	TextareaField.propTypes = {
	    value: React.PropTypes.string,
	    placeholder: React.PropTypes.string,
	    onChange: React.PropTypes.func,
	    onFocus: React.PropTypes.func,
	    onBlur: React.PropTypes.func,
	    readOnly: React.PropTypes.bool,
	    minRows: React.PropTypes.number,
	    maxRows: React.PropTypes.number,
	    lineHeight: React.PropTypes.number
	};
	
	module.exports = TextareaField;

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	function assign(ta) {
		var _ref = arguments[1] === undefined ? {} : arguments[1];
	
		var _ref$setOverflowX = _ref.setOverflowX;
		var setOverflowX = _ref$setOverflowX === undefined ? true : _ref$setOverflowX;
		var _ref$setOverflowY = _ref.setOverflowY;
		var setOverflowY = _ref$setOverflowY === undefined ? true : _ref$setOverflowY;
	
		if (!ta || !ta.nodeName || ta.nodeName !== 'TEXTAREA' || ta.hasAttribute('data-autosize-on')) return;
	
		var heightOffset = null;
		var overflowY = 'hidden';
	
		function init() {
			var style = window.getComputedStyle(ta, null);
	
			if (style.resize === 'vertical') {
				ta.style.resize = 'none';
			} else if (style.resize === 'both') {
				ta.style.resize = 'horizontal';
			}
	
			if (style.boxSizing === 'content-box') {
				heightOffset = -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
			} else {
				heightOffset = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
			}
	
			update();
		}
	
		function changeOverflow(value) {
			{
				// Chrome/Safari-specific fix:
				// When the textarea y-overflow is hidden, Chrome/Safari do not reflow the text to account for the space
				// made available by removing the scrollbar. The following forces the necessary text reflow.
				var width = ta.style.width;
				ta.style.width = '0px';
				// Force reflow:
				/* jshint ignore:start */
				ta.offsetWidth;
				/* jshint ignore:end */
				ta.style.width = width;
			}
	
			overflowY = value;
	
			if (setOverflowY) {
				ta.style.overflowY = value;
			}
	
			update();
		}
	
		function update() {
			var startHeight = ta.style.height;
			var htmlTop = document.documentElement.scrollTop;
			var bodyTop = document.body.scrollTop;
			var originalHeight = ta.style.height;
	
			ta.style.height = 'auto';
	
			var endHeight = ta.scrollHeight + heightOffset;
	
			if (ta.scrollHeight === 0) {
				// If the scrollHeight is 0, then the element probably has display:none or is detached from the DOM.
				ta.style.height = originalHeight;
				return;
			}
	
			ta.style.height = endHeight + 'px';
	
			// prevents scroll-position jumping
			document.documentElement.scrollTop = htmlTop;
			document.body.scrollTop = bodyTop;
	
			var style = window.getComputedStyle(ta, null);
	
			if (style.height !== ta.style.height) {
				if (overflowY !== 'visible') {
					changeOverflow('visible');
					return;
				}
			} else {
				if (overflowY !== 'hidden') {
					changeOverflow('hidden');
					return;
				}
			}
	
			if (startHeight !== ta.style.height) {
				var evt = document.createEvent('Event');
				evt.initEvent('autosize:resized', true, false);
				ta.dispatchEvent(evt);
			}
		}
	
		var destroy = (function (style) {
			window.removeEventListener('resize', update);
			ta.removeEventListener('input', update);
			ta.removeEventListener('keyup', update);
			ta.removeAttribute('data-autosize-on');
			ta.removeEventListener('autosize:destroy', destroy);
	
			Object.keys(style).forEach(function (key) {
				ta.style[key] = style[key];
			});
		}).bind(ta, {
			height: ta.style.height,
			resize: ta.style.resize,
			overflowY: ta.style.overflowY,
			overflowX: ta.style.overflowX,
			wordWrap: ta.style.wordWrap
		});
	
		ta.addEventListener('autosize:destroy', destroy);
	
		// IE9 does not fire onpropertychange or oninput for deletions,
		// so binding to onkeyup to catch most of those events.
		// There is no way that I know of to detect something like 'cut' in IE9.
		if ('onpropertychange' in ta && 'oninput' in ta) {
			ta.addEventListener('keyup', update);
		}
	
		window.addEventListener('resize', update);
		ta.addEventListener('input', update);
		ta.addEventListener('autosize:update', update);
		ta.setAttribute('data-autosize-on', true);
	
		if (setOverflowY) {
			ta.style.overflowY = 'hidden';
		}
		if (setOverflowX) {
			ta.style.overflowX = 'hidden';
			ta.style.wordWrap = 'break-word';
		}
	
		init();
	}
	
	function destroy(ta) {
		if (!(ta && ta.nodeName && ta.nodeName === 'TEXTAREA')) return;
		var evt = document.createEvent('Event');
		evt.initEvent('autosize:destroy', true, false);
		ta.dispatchEvent(evt);
	}
	
	function update(ta) {
		if (!(ta && ta.nodeName && ta.nodeName === 'TEXTAREA')) return;
		var evt = document.createEvent('Event');
		evt.initEvent('autosize:update', true, false);
		ta.dispatchEvent(evt);
	}
	
	var autosize = null;
	
	// Do nothing in Node.js environment and IE8 (or lower)
	if (typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') {
		autosize = function (el) {
			return el;
		};
		autosize.destroy = function (el) {
			return el;
		};
		autosize.update = function (el) {
			return el;
		};
	} else {
		autosize = function (el, options) {
			if (el) {
				Array.prototype.forEach.call(el.length ? el : [el], function (x) {
					return assign(x, options);
				});
			}
			return el;
		};
		autosize.destroy = function (el) {
			if (el) {
				Array.prototype.forEach.call(el.length ? el : [el], destroy);
			}
			return el;
		};
		autosize.update = function (el) {
			if (el) {
				Array.prototype.forEach.call(el.length ? el : [el], update);
			}
			return el;
		};
	}
	
	exports['default'] = autosize;
	module.exports = exports['default'];

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(25);

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Tip Component for tinglejs
	 */
	
	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var classnames = __webpack_require__(6);
	var Layer = __webpack_require__(7);
	
	var Tip = (function (_React$Component) {
	    function Tip(props) {
	        _classCallCheck(this, Tip);
	
	        _get(Object.getPrototypeOf(Tip.prototype), 'constructor', this).call(this, props);
	
	        this.state = {
	            show: false
	        };
	    }
	
	    _inherits(Tip, _React$Component);
	
	    _createClass(Tip, [{
	        key: 'show',
	        value: function show(options) {
	            var width = options.icon ? options.width || this.props.width : 216;
	            this.setState({
	                width: width,
	                text: options.text,
	                icon: options.icon,
	                onHide: options.onHide || this.props.onHide,
	                show: true,
	                mask: 'mask' in options ? options.mask : true,
	                duration: options.duration
	            });
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            clearTimeout(this.timer);
	            this.setState({
	                show: false
	            });
	            this.props.onHide();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var t = this;
	            var _state = this.state;
	            var icon = _state.icon;
	            var text = _state.text;
	            var show = _state.show;
	            var duration = _state.duration;
	            var other = _objectWithoutProperties(_state, ['icon', 'text', 'show', 'duration']);
	            var classSet = {
	                'tF14 tFf tFAC tLH1_5': true,
	                'tPL20 tPR20': !icon
	            };
	
	            icon = icon ? React.createElement(
	                'div',
	                { className: 'tFAC tPB14 tPR' },
	                React.createElement('i', { className: 'tIcon tIcon' + (icon.charAt(0).toUpperCase() + icon.substring(1)) })
	            ) : '';
	
	            this.timer && clearTimeout(this.timer);
	            this.timer = show && setTimeout(function () {
	                t.hide();
	            }, duration || 3000);
	
	            return React.createElement(
	                Layer,
	                _extends({ show: show }, other),
	                React.createElement(
	                    'div',
	                    { className: 'tTip tPT20 tPB20 tR6' },
	                    icon,
	                    React.createElement(
	                        'div',
	                        { className: classnames(classSet) },
	                        text
	                    )
	                )
	            );
	        }
	    }]);
	
	    return Tip;
	})(React.Component);
	
	Tip.defaultProps = {
	    onHide: function onHide() {},
	    width: 136
	};
	
	// http://facebook.github.io/react/docs/reusable-components.html
	Tip.propTypes = {};
	
	var WRAPPER_ID = '__TingleGlobalTip__';
	var doc = document;
	
	Tip.global = null;
	Tip.show = function (options) {
	    // 只有首次全局调用时，才会创建全局实例
	    if (!Tip.global) {
	        var wrapper = doc.getElementById(WRAPPER_ID);
	        if (!wrapper) {
	            wrapper = doc.createElement('div');
	            wrapper.id = WRAPPER_ID;
	            doc.body.appendChild(wrapper);
	        }
	        Tip.global = React.render(React.createElement(Tip, null), wrapper);
	    }
	    Tip.global.show(options);
	};
	
	module.exports = Tip;

/***/ }
/******/ ]);
//# sourceMappingURL=tingle.js.map