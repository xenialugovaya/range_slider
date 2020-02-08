/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _presenter_Facade__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./presenter/Facade */ "./src/presenter/Facade.ts");

$(function () {
    $.fn.slider = function (options) {
        const facade = new _presenter_Facade__WEBPACK_IMPORTED_MODULE_0__["Facade"](this.get(0), options);
        return facade;
    };
});


/***/ }),

/***/ "./src/model/MainModel.ts":
/*!********************************!*\
  !*** ./src/model/MainModel.ts ***!
  \********************************/
/*! exports provided: MainModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainModel", function() { return MainModel; });
/* harmony import */ var _observer_observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observer/observer */ "./src/observer/observer.ts");
/* harmony import */ var _handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handler */ "./src/model/handler.ts");


class MainModel {
    constructor(sliderOptions) {
        this._observers = new _observer_observer__WEBPACK_IMPORTED_MODULE_0__["EventObserver"]();
        this._min = 0;
        this._max = 100;
        this._step = 1;
        this._values = [0, 1];
        this._isVertical = false;
        this._hasRange = false;
        this._hasLabels = false;
        this._handlers = [];
        this._min = sliderOptions.min ? sliderOptions.min : 0;
        this._max = sliderOptions.max ? sliderOptions.max : this._max;
        this._step = sliderOptions.step ? sliderOptions.step : this._step;
        this._values = sliderOptions.values ? sliderOptions.values : this._values;
        this._hasRange = sliderOptions.hasRange ? sliderOptions.hasRange : this._hasRange;
        this._isVertical = sliderOptions.isVertical ? sliderOptions.isVertical : this._isVertical;
        this._hasLabels = sliderOptions.hasLabels ? sliderOptions.hasLabels : this._hasLabels;
    }
    get min() {
        this._min = Math.round(this._min / this._step) * this._step;
        return this._min;
    }
    set min(min) {
        this._min = min;
    }
    get max() {
        this._max = Math.round(this._max / this._step) * this._step;
        return this._max;
    }
    set max(max) {
        this._max = max;
    }
    get step() {
        return this._step;
    }
    set step(step) {
        this._step = step;
    }
    get singleValue() {
        return this.calcValues(this._values)[0];
    }
    set singleValue(value) {
        this._values[0] = value;
    }
    get rangeValue() {
        return this.calcValues(this._values);
    }
    set rangeValue(values) {
        this._values = values;
    }
    get isVertical() {
        return this._isVertical;
    }
    set isVertical(vertical) {
        this._isVertical = vertical;
    }
    get hasRange() {
        return this._hasRange;
    }
    set hasRange(range) {
        this._hasRange = range;
    }
    // get initial coordinates of any element, depending on dimension
    getCoords(elem) {
        const box = elem.getBoundingClientRect();
        if (this._isVertical) {
            return {
                x: box.left + pageXOffset,
                y: box.bottom + pageYOffset,
            };
        }
        else {
            return {
                x: box.left + pageXOffset,
                y: box.top + pageXOffset,
            };
        }
    }
    //check that values of handlers are within min and max
    //check that value 0 is less than value 1 for range
    calcValues(values) {
        values.map(value => (value < this._min ? this._min : value > this._max ? this._max : value));
        this._values.map(value => Math.round(value / this._step) * this._step);
        if (values[0] === values[1])
            values[1] += this._step;
        if (values[0] > values[1])
            [values[0], values[1]] = [values[1], values[0]];
        return values;
    }
    //create handlers depending on range
    setHandlers(values) {
        if (this._hasRange) {
            this._handlers = [new _handler__WEBPACK_IMPORTED_MODULE_1__["Handler"](values[0]), new _handler__WEBPACK_IMPORTED_MODULE_1__["Handler"](values[1])];
        }
        else {
            this._handlers = [new _handler__WEBPACK_IMPORTED_MODULE_1__["Handler"](values[0])];
        }
    }
    //set limits of a slider in terms of px to control handler movement
    setLimits(sliderBody, handler) {
        if (this._isVertical) {
            return {
                minLimit: 0,
                maxLimit: sliderBody.offsetHeight - handler.offsetHeight,
            };
        }
        else {
            return {
                minLimit: 0,
                maxLimit: sliderBody.offsetWidth - handler.offsetWidth,
            };
        }
    }
}



/***/ }),

/***/ "./src/model/handler.ts":
/*!******************************!*\
  !*** ./src/model/handler.ts ***!
  \******************************/
/*! exports provided: Handler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Handler", function() { return Handler; });
class Handler {
    constructor(position) {
        this._position = position;
    }
    get position() {
        return this._position;
    }
    set position(value) {
        this._position = value;
    }
}



/***/ }),

/***/ "./src/observer/observer.ts":
/*!**********************************!*\
  !*** ./src/observer/observer.ts ***!
  \**********************************/
/*! exports provided: EventObserver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventObserver", function() { return EventObserver; });
class EventObserver {
    constructor() {
        this._observers = [];
    }
    subscribe(fn) {
        this._observers.push(fn);
    }
    unsubscribe(fn) {
        this._observers = this._observers.filter(subscriber => subscriber !== fn);
    }
    broadcast(data) {
        this._observers.forEach(subscriber => subscriber(data));
    }
}



/***/ }),

/***/ "./src/presenter/Facade.ts":
/*!*********************************!*\
  !*** ./src/presenter/Facade.ts ***!
  \*********************************/
/*! exports provided: Facade */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Facade", function() { return Facade; });
/* harmony import */ var _model_MainModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/MainModel */ "./src/model/MainModel.ts");
/* harmony import */ var _Presenter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Presenter */ "./src/presenter/Presenter.ts");


class Facade {
    constructor(parent, sliderOptions) {
        this._model = new _model_MainModel__WEBPACK_IMPORTED_MODULE_0__["MainModel"](sliderOptions);
        this._presenter = new _Presenter__WEBPACK_IMPORTED_MODULE_1__["Presenter"](parent, this._model);
    }
    get singleValue() {
        return this._model.singleValue;
    }
    set singleValue(value) {
        this._model.singleValue = value;
    }
    get rangeValue() {
        return this._model.rangeValue;
    }
    set rangeValue(value) {
        this._model.rangeValue = value;
    }
    get step() {
        return this._model.step;
    }
    set step(value) {
        this._model.step = value;
    }
    get isVertical() {
        return this._model.isVertical;
    }
    set isVertical(vertical) {
        this._model.isVertical = vertical;
    }
}



/***/ }),

/***/ "./src/presenter/Presenter.ts":
/*!************************************!*\
  !*** ./src/presenter/Presenter.ts ***!
  \************************************/
/*! exports provided: Presenter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Presenter", function() { return Presenter; });
/* harmony import */ var _view_MainView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/MainView */ "./src/view/MainView.ts");

class Presenter {
    constructor(parent, model) {
        this._model = model;
        this._values = this._model.rangeValue;
        this._view = new _view_MainView__WEBPACK_IMPORTED_MODULE_0__["MainView"](parent, this._model.hasRange, this._model.isVertical, this._model.min, this._model.max, this._values);
    }
}



/***/ }),

/***/ "./src/view/HandlerView.ts":
/*!*********************************!*\
  !*** ./src/view/HandlerView.ts ***!
  \*********************************/
/*! exports provided: HandlerView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HandlerView", function() { return HandlerView; });
class HandlerView {
    constructor(parent, value, isVertical, minLimit, maxLimit) {
        this._handler = document.createElement('div');
        this._handler.classList.add('handler');
        this._parent = parent;
        this._parent.appendChild(this._handler);
        this._value = value;
        this._isVertical = isVertical;
        this._minLimit = minLimit;
        this._maxLimit = maxLimit;
    }
    setPosition() {
        const valuesCount = this._maxLimit - this._minLimit;
        const positionProperty = this._isVertical ? 'top' : 'left';
        const position = this._isVertical
            ? ((this._value - this._minLimit) / valuesCount) * 100
            : 100 - ((this._value - this._minLimit) / valuesCount) * 100;
        this._handler.style[positionProperty] = `${position}%`;
    }
}



/***/ }),

/***/ "./src/view/MainView.ts":
/*!******************************!*\
  !*** ./src/view/MainView.ts ***!
  \******************************/
/*! exports provided: MainView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainView", function() { return MainView; });
/* harmony import */ var _HandlerView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HandlerView */ "./src/view/HandlerView.ts");

class MainView {
    constructor(parent, hasRange, isVertical, min, max, values) {
        this._min = min;
        this._max = max;
        this._values = values;
        this._sliderBody = document.createElement('div');
        this._sliderBody.classList.add('sliderBody');
        this._parent = parent;
        this._parent.appendChild(this._sliderBody);
        this._handlers = hasRange
            ? [
                new _HandlerView__WEBPACK_IMPORTED_MODULE_0__["HandlerView"](this._sliderBody, values[0], isVertical, min, max),
                new _HandlerView__WEBPACK_IMPORTED_MODULE_0__["HandlerView"](this._sliderBody, values[1], isVertical, min, max),
            ]
            : [new _HandlerView__WEBPACK_IMPORTED_MODULE_0__["HandlerView"](this._sliderBody, values[0], isVertical, min, max)];
        this._selectedRange = document.createElement('div');
        this._selectedRange.classList.add('selectedRange');
        if (isVertical)
            this._parent.classList.add('slider_vertical');
        if (hasRange)
            this._selectedRange.classList.add('range_between');
    }
}



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9tb2RlbC9NYWluTW9kZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVsL2hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29ic2VydmVyL29ic2VydmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9wcmVzZW50ZXIvRmFjYWRlLnRzIiwid2VicGFjazovLy8uL3NyYy9wcmVzZW50ZXIvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy92aWV3L0hhbmRsZXJWaWV3LnRzIiwid2VicGFjazovLy8uL3NyYy92aWV3L01haW5WaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUE0QztBQUc1QyxDQUFDLENBQUM7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QUVtQiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7IEZhY2FkZSB9IGZyb20gJy4vcHJlc2VudGVyL0ZhY2FkZSc7XG5pbXBvcnQgeyBzbGlkZXJPcHRpb25zIH0gZnJvbSAnLi9tb2RlbC9zbGlkZXJPcHRpb25zJztcblxuJChmdW5jdGlvbigpIHtcbiAgJC5mbi5zbGlkZXIgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgY29uc3QgZmFjYWRlOiBGYWNhZGUgPSBuZXcgRmFjYWRlKHRoaXMuZ2V0KDApLCBvcHRpb25zKTtcbiAgICByZXR1cm4gZmFjYWRlO1xuICB9O1xufSk7XG4iLCJpbXBvcnQgeyBFdmVudE9ic2VydmVyIH0gZnJvbSAnLi4vb2JzZXJ2ZXIvb2JzZXJ2ZXInO1xuaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gJy4vaGFuZGxlcic7XG5cbnR5cGUgc2xpZGVyT3B0aW9ucyA9IHtcbiAgbWluPzogbnVtYmVyO1xuICBtYXg/OiBudW1iZXI7XG4gIHN0ZXA/OiBudW1iZXI7XG4gIHZhbHVlcz86IG51bWJlcltdO1xuICBpc1ZlcnRpY2FsPzogYm9vbGVhbjtcbiAgaGFzUmFuZ2U/OiBib29sZWFuO1xuICBoYXNMYWJlbHM/OiBib29sZWFuO1xufTtcblxuY2xhc3MgTWFpbk1vZGVsIHtcbiAgcHJpdmF0ZSBfb2JzZXJ2ZXJzID0gbmV3IEV2ZW50T2JzZXJ2ZXIoKTtcbiAgcHJpdmF0ZSBfbWluID0gMDtcbiAgcHJpdmF0ZSBfbWF4ID0gMTAwO1xuICBwcml2YXRlIF9zdGVwID0gMTtcbiAgcHJpdmF0ZSBfdmFsdWVzID0gWzAsIDFdO1xuICBwcml2YXRlIF9pc1ZlcnRpY2FsID0gZmFsc2U7XG4gIHByaXZhdGUgX2hhc1JhbmdlID0gZmFsc2U7XG4gIHByaXZhdGUgX2hhc0xhYmVscyA9IGZhbHNlO1xuICBwcml2YXRlIF9oYW5kbGVyczogSGFuZGxlcltdID0gW107XG4gIGNvbnN0cnVjdG9yKHNsaWRlck9wdGlvbnM6IHNsaWRlck9wdGlvbnMpIHtcbiAgICB0aGlzLl9taW4gPSBzbGlkZXJPcHRpb25zLm1pbiA/IHNsaWRlck9wdGlvbnMubWluIDogMDtcbiAgICB0aGlzLl9tYXggPSBzbGlkZXJPcHRpb25zLm1heCA/IHNsaWRlck9wdGlvbnMubWF4IDogdGhpcy5fbWF4O1xuICAgIHRoaXMuX3N0ZXAgPSBzbGlkZXJPcHRpb25zLnN0ZXAgPyBzbGlkZXJPcHRpb25zLnN0ZXAgOiB0aGlzLl9zdGVwO1xuICAgIHRoaXMuX3ZhbHVlcyA9IHNsaWRlck9wdGlvbnMudmFsdWVzID8gc2xpZGVyT3B0aW9ucy52YWx1ZXMgOiB0aGlzLl92YWx1ZXM7XG4gICAgdGhpcy5faGFzUmFuZ2UgPSBzbGlkZXJPcHRpb25zLmhhc1JhbmdlID8gc2xpZGVyT3B0aW9ucy5oYXNSYW5nZSA6IHRoaXMuX2hhc1JhbmdlO1xuICAgIHRoaXMuX2lzVmVydGljYWwgPSBzbGlkZXJPcHRpb25zLmlzVmVydGljYWwgPyBzbGlkZXJPcHRpb25zLmlzVmVydGljYWwgOiB0aGlzLl9pc1ZlcnRpY2FsO1xuICAgIHRoaXMuX2hhc0xhYmVscyA9IHNsaWRlck9wdGlvbnMuaGFzTGFiZWxzID8gc2xpZGVyT3B0aW9ucy5oYXNMYWJlbHMgOiB0aGlzLl9oYXNMYWJlbHM7XG4gIH1cbiAgZ2V0IG1pbigpOiBudW1iZXIge1xuICAgIHRoaXMuX21pbiA9IE1hdGgucm91bmQodGhpcy5fbWluIC8gdGhpcy5fc3RlcCkgKiB0aGlzLl9zdGVwO1xuICAgIHJldHVybiB0aGlzLl9taW47XG4gIH1cblxuICBzZXQgbWluKG1pbjogbnVtYmVyKSB7XG4gICAgdGhpcy5fbWluID0gbWluO1xuICB9XG5cbiAgZ2V0IG1heCgpOiBudW1iZXIge1xuICAgIHRoaXMuX21heCA9IE1hdGgucm91bmQodGhpcy5fbWF4IC8gdGhpcy5fc3RlcCkgKiB0aGlzLl9zdGVwO1xuICAgIHJldHVybiB0aGlzLl9tYXg7XG4gIH1cblxuICBzZXQgbWF4KG1heDogbnVtYmVyKSB7XG4gICAgdGhpcy5fbWF4ID0gbWF4O1xuICB9XG5cbiAgZ2V0IHN0ZXAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc3RlcDtcbiAgfVxuXG4gIHNldCBzdGVwKHN0ZXA6IG51bWJlcikge1xuICAgIHRoaXMuX3N0ZXAgPSBzdGVwO1xuICB9XG5cbiAgZ2V0IHNpbmdsZVZhbHVlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY2FsY1ZhbHVlcyh0aGlzLl92YWx1ZXMpWzBdO1xuICB9XG5cbiAgc2V0IHNpbmdsZVZhbHVlKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl92YWx1ZXNbMF0gPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCByYW5nZVZhbHVlKCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gdGhpcy5jYWxjVmFsdWVzKHRoaXMuX3ZhbHVlcyk7XG4gIH1cblxuICBzZXQgcmFuZ2VWYWx1ZSh2YWx1ZXM6IG51bWJlcltdKSB7XG4gICAgdGhpcy5fdmFsdWVzID0gdmFsdWVzO1xuICB9XG5cbiAgZ2V0IGlzVmVydGljYWwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzVmVydGljYWw7XG4gIH1cblxuICBzZXQgaXNWZXJ0aWNhbCh2ZXJ0aWNhbDogYm9vbGVhbikge1xuICAgIHRoaXMuX2lzVmVydGljYWwgPSB2ZXJ0aWNhbDtcbiAgfVxuXG4gIGdldCBoYXNSYW5nZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGFzUmFuZ2U7XG4gIH1cblxuICBzZXQgaGFzUmFuZ2UocmFuZ2U6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oYXNSYW5nZSA9IHJhbmdlO1xuICB9XG5cbiAgLy8gZ2V0IGluaXRpYWwgY29vcmRpbmF0ZXMgb2YgYW55IGVsZW1lbnQsIGRlcGVuZGluZyBvbiBkaW1lbnNpb25cbiAgZ2V0Q29vcmRzKGVsZW06IEhUTUxFbGVtZW50KTogb2JqZWN0IHtcbiAgICBjb25zdCBib3ggPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGlmICh0aGlzLl9pc1ZlcnRpY2FsKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB4OiBib3gubGVmdCArIHBhZ2VYT2Zmc2V0LFxuICAgICAgICB5OiBib3guYm90dG9tICsgcGFnZVlPZmZzZXQsXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB4OiBib3gubGVmdCArIHBhZ2VYT2Zmc2V0LFxuICAgICAgICB5OiBib3gudG9wICsgcGFnZVhPZmZzZXQsXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIC8vY2hlY2sgdGhhdCB2YWx1ZXMgb2YgaGFuZGxlcnMgYXJlIHdpdGhpbiBtaW4gYW5kIG1heFxuICAvL2NoZWNrIHRoYXQgdmFsdWUgMCBpcyBsZXNzIHRoYW4gdmFsdWUgMSBmb3IgcmFuZ2VcbiAgY2FsY1ZhbHVlcyh2YWx1ZXM6IG51bWJlcltdKTogbnVtYmVyW10ge1xuICAgIHZhbHVlcy5tYXAodmFsdWUgPT4gKHZhbHVlIDwgdGhpcy5fbWluID8gdGhpcy5fbWluIDogdmFsdWUgPiB0aGlzLl9tYXggPyB0aGlzLl9tYXggOiB2YWx1ZSkpO1xuICAgIHRoaXMuX3ZhbHVlcy5tYXAodmFsdWUgPT4gTWF0aC5yb3VuZCh2YWx1ZSAvIHRoaXMuX3N0ZXApICogdGhpcy5fc3RlcCk7XG4gICAgaWYgKHZhbHVlc1swXSA9PT0gdmFsdWVzWzFdKSB2YWx1ZXNbMV0gKz0gdGhpcy5fc3RlcDtcbiAgICBpZiAodmFsdWVzWzBdID4gdmFsdWVzWzFdKSBbdmFsdWVzWzBdLCB2YWx1ZXNbMV1dID0gW3ZhbHVlc1sxXSwgdmFsdWVzWzBdXTtcbiAgICByZXR1cm4gdmFsdWVzO1xuICB9XG4gIC8vY3JlYXRlIGhhbmRsZXJzIGRlcGVuZGluZyBvbiByYW5nZVxuICBzZXRIYW5kbGVycyh2YWx1ZXM6IG51bWJlcltdKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2hhc1JhbmdlKSB7XG4gICAgICB0aGlzLl9oYW5kbGVycyA9IFtuZXcgSGFuZGxlcih2YWx1ZXNbMF0pLCBuZXcgSGFuZGxlcih2YWx1ZXNbMV0pXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGFuZGxlcnMgPSBbbmV3IEhhbmRsZXIodmFsdWVzWzBdKV07XG4gICAgfVxuICB9XG5cbiAgLy9zZXQgbGltaXRzIG9mIGEgc2xpZGVyIGluIHRlcm1zIG9mIHB4IHRvIGNvbnRyb2wgaGFuZGxlciBtb3ZlbWVudFxuICBzZXRMaW1pdHMoc2xpZGVyQm9keTogSFRNTEVsZW1lbnQsIGhhbmRsZXI6IEhUTUxFbGVtZW50KTogb2JqZWN0IHtcbiAgICBpZiAodGhpcy5faXNWZXJ0aWNhbCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWluTGltaXQ6IDAsXG4gICAgICAgIG1heExpbWl0OiBzbGlkZXJCb2R5Lm9mZnNldEhlaWdodCAtIGhhbmRsZXIub2Zmc2V0SGVpZ2h0LFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWluTGltaXQ6IDAsXG4gICAgICAgIG1heExpbWl0OiBzbGlkZXJCb2R5Lm9mZnNldFdpZHRoIC0gaGFuZGxlci5vZmZzZXRXaWR0aCxcbiAgICAgIH07XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IE1haW5Nb2RlbCB9O1xuIiwiY2xhc3MgSGFuZGxlciB7XG4gIHByaXZhdGUgX3Bvc2l0aW9uOiBudW1iZXI7XG4gIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICB9XG5cbiAgZ2V0IHBvc2l0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uO1xuICB9XG5cbiAgc2V0IHBvc2l0aW9uKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IHZhbHVlO1xuICB9XG59XG5cbmV4cG9ydCB7IEhhbmRsZXIgfTtcbiIsImNsYXNzIEV2ZW50T2JzZXJ2ZXIge1xuICBwcml2YXRlIF9vYnNlcnZlcnM6IEZ1bmN0aW9uW107XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX29ic2VydmVycyA9IFtdO1xuICB9XG4gIHN1YnNjcmliZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLl9vYnNlcnZlcnMucHVzaChmbik7XG4gIH1cbiAgdW5zdWJzY3JpYmUoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fb2JzZXJ2ZXJzID0gdGhpcy5fb2JzZXJ2ZXJzLmZpbHRlcihzdWJzY3JpYmVyID0+IHN1YnNjcmliZXIgIT09IGZuKTtcbiAgfVxuICBicm9hZGNhc3QoZGF0YTogb2JqZWN0KTogdm9pZCB7XG4gICAgdGhpcy5fb2JzZXJ2ZXJzLmZvckVhY2goc3Vic2NyaWJlciA9PiBzdWJzY3JpYmVyKGRhdGEpKTtcbiAgfVxufVxuXG5leHBvcnQgeyBFdmVudE9ic2VydmVyIH07XG4iLCJpbXBvcnQgeyBNYWluTW9kZWwgfSBmcm9tICcuLi9tb2RlbC9NYWluTW9kZWwnO1xuaW1wb3J0IHsgUHJlc2VudGVyIH0gZnJvbSAnLi9QcmVzZW50ZXInO1xuaW1wb3J0IHsgc2xpZGVyT3B0aW9ucyB9IGZyb20gJy4uL21vZGVsL3NsaWRlck9wdGlvbnMnO1xuXG5jbGFzcyBGYWNhZGUge1xuICBwcml2YXRlIF9tb2RlbDogTWFpbk1vZGVsO1xuICBwcml2YXRlIF9wcmVzZW50ZXI6IFByZXNlbnRlcjtcblxuICBjb25zdHJ1Y3RvcihwYXJlbnQ6IEhUTUxFbGVtZW50LCBzbGlkZXJPcHRpb25zOiBzbGlkZXJPcHRpb25zKSB7XG4gICAgdGhpcy5fbW9kZWwgPSBuZXcgTWFpbk1vZGVsKHNsaWRlck9wdGlvbnMpO1xuICAgIHRoaXMuX3ByZXNlbnRlciA9IG5ldyBQcmVzZW50ZXIocGFyZW50LCB0aGlzLl9tb2RlbCk7XG4gIH1cblxuICBnZXQgc2luZ2xlVmFsdWUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuc2luZ2xlVmFsdWU7XG4gIH1cblxuICBzZXQgc2luZ2xlVmFsdWUodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX21vZGVsLnNpbmdsZVZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcmFuZ2VWYWx1ZSgpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLnJhbmdlVmFsdWU7XG4gIH1cblxuICBzZXQgcmFuZ2VWYWx1ZSh2YWx1ZTogbnVtYmVyW10pIHtcbiAgICB0aGlzLl9tb2RlbC5yYW5nZVZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBnZXQgc3RlcCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5zdGVwO1xuICB9XG5cbiAgc2V0IHN0ZXAodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX21vZGVsLnN0ZXAgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBpc1ZlcnRpY2FsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5pc1ZlcnRpY2FsO1xuICB9XG5cbiAgc2V0IGlzVmVydGljYWwodmVydGljYWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9tb2RlbC5pc1ZlcnRpY2FsID0gdmVydGljYWw7XG4gIH1cbn1cblxuZXhwb3J0IHsgRmFjYWRlIH07XG4iLCJpbXBvcnQgeyBNYWluTW9kZWwgfSBmcm9tICcuLi9tb2RlbC9NYWluTW9kZWwnO1xuaW1wb3J0IHsgTWFpblZpZXcgfSBmcm9tICcuLi92aWV3L01haW5WaWV3JztcblxuY2xhc3MgUHJlc2VudGVyIHtcbiAgcHJpdmF0ZSBfbW9kZWw6IE1haW5Nb2RlbDtcbiAgcHJpdmF0ZSBfdmlldzogTWFpblZpZXc7XG4gIHByaXZhdGUgX3ZhbHVlczogbnVtYmVyW107XG5cbiAgY29uc3RydWN0b3IocGFyZW50OiBIVE1MRWxlbWVudCwgbW9kZWw6IE1haW5Nb2RlbCkge1xuICAgIHRoaXMuX21vZGVsID0gbW9kZWw7XG4gICAgdGhpcy5fdmFsdWVzID0gdGhpcy5fbW9kZWwucmFuZ2VWYWx1ZTtcbiAgICB0aGlzLl92aWV3ID0gbmV3IE1haW5WaWV3KFxuICAgICAgcGFyZW50LFxuICAgICAgdGhpcy5fbW9kZWwuaGFzUmFuZ2UsXG4gICAgICB0aGlzLl9tb2RlbC5pc1ZlcnRpY2FsLFxuICAgICAgdGhpcy5fbW9kZWwubWluLFxuICAgICAgdGhpcy5fbW9kZWwubWF4LFxuICAgICAgdGhpcy5fdmFsdWVzLFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHsgUHJlc2VudGVyIH07XG4iLCJjbGFzcyBIYW5kbGVyVmlldyB7XG4gIHByaXZhdGUgX2hhbmRsZXI6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9wYXJlbnQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF92YWx1ZTogbnVtYmVyO1xuICBwcml2YXRlIF9pc1ZlcnRpY2FsOiBib29sZWFuO1xuICBwcml2YXRlIF9taW5MaW1pdDogbnVtYmVyO1xuICBwcml2YXRlIF9tYXhMaW1pdDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHBhcmVudDogSFRNTEVsZW1lbnQsXG4gICAgdmFsdWU6IG51bWJlcixcbiAgICBpc1ZlcnRpY2FsOiBib29sZWFuLFxuICAgIG1pbkxpbWl0OiBudW1iZXIsXG4gICAgbWF4TGltaXQ6IG51bWJlcixcbiAgKSB7XG4gICAgdGhpcy5faGFuZGxlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX2hhbmRsZXIuY2xhc3NMaXN0LmFkZCgnaGFuZGxlcicpO1xuICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcbiAgICB0aGlzLl9wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5faGFuZGxlcik7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLl9pc1ZlcnRpY2FsID0gaXNWZXJ0aWNhbDtcbiAgICB0aGlzLl9taW5MaW1pdCA9IG1pbkxpbWl0O1xuICAgIHRoaXMuX21heExpbWl0ID0gbWF4TGltaXQ7XG4gIH1cblxuICBzZXRQb3NpdGlvbigpOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZXNDb3VudCA9IHRoaXMuX21heExpbWl0IC0gdGhpcy5fbWluTGltaXQ7XG4gICAgY29uc3QgcG9zaXRpb25Qcm9wZXJ0eSA9IHRoaXMuX2lzVmVydGljYWwgPyAndG9wJyA6ICdsZWZ0JztcbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuX2lzVmVydGljYWxcbiAgICAgID8gKCh0aGlzLl92YWx1ZSAtIHRoaXMuX21pbkxpbWl0KSAvIHZhbHVlc0NvdW50KSAqIDEwMFxuICAgICAgOiAxMDAgLSAoKHRoaXMuX3ZhbHVlIC0gdGhpcy5fbWluTGltaXQpIC8gdmFsdWVzQ291bnQpICogMTAwO1xuICAgIHRoaXMuX2hhbmRsZXIuc3R5bGVbcG9zaXRpb25Qcm9wZXJ0eV0gPSBgJHtwb3NpdGlvbn0lYDtcbiAgfVxufVxuXG5leHBvcnQgeyBIYW5kbGVyVmlldyB9O1xuIiwiaW1wb3J0IHsgSGFuZGxlclZpZXcgfSBmcm9tICcuL0hhbmRsZXJWaWV3JztcblxuY2xhc3MgTWFpblZpZXcge1xuICBwcml2YXRlIF9zbGlkZXJCb2R5OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfcGFyZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfc2VsZWN0ZWRSYW5nZTogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX2hhbmRsZXJzOiBIYW5kbGVyVmlld1tdO1xuICBwcml2YXRlIF9taW46IG51bWJlcjtcbiAgcHJpdmF0ZSBfbWF4OiBudW1iZXI7XG4gIHByaXZhdGUgX3ZhbHVlczogbnVtYmVyW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcGFyZW50OiBIVE1MRWxlbWVudCxcbiAgICBoYXNSYW5nZTogYm9vbGVhbixcbiAgICBpc1ZlcnRpY2FsOiBib29sZWFuLFxuICAgIG1pbjogbnVtYmVyLFxuICAgIG1heDogbnVtYmVyLFxuICAgIHZhbHVlczogbnVtYmVyW10sXG4gICkge1xuICAgIHRoaXMuX21pbiA9IG1pbjtcbiAgICB0aGlzLl9tYXggPSBtYXg7XG4gICAgdGhpcy5fdmFsdWVzID0gdmFsdWVzO1xuICAgIHRoaXMuX3NsaWRlckJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9zbGlkZXJCb2R5LmNsYXNzTGlzdC5hZGQoJ3NsaWRlckJvZHknKTtcbiAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5fcGFyZW50LmFwcGVuZENoaWxkKHRoaXMuX3NsaWRlckJvZHkpO1xuICAgIHRoaXMuX2hhbmRsZXJzID0gaGFzUmFuZ2VcbiAgICAgID8gW1xuICAgICAgICAgIG5ldyBIYW5kbGVyVmlldyh0aGlzLl9zbGlkZXJCb2R5LCB2YWx1ZXNbMF0sIGlzVmVydGljYWwsIG1pbiwgbWF4KSxcbiAgICAgICAgICBuZXcgSGFuZGxlclZpZXcodGhpcy5fc2xpZGVyQm9keSwgdmFsdWVzWzFdLCBpc1ZlcnRpY2FsLCBtaW4sIG1heCksXG4gICAgICAgIF1cbiAgICAgIDogW25ldyBIYW5kbGVyVmlldyh0aGlzLl9zbGlkZXJCb2R5LCB2YWx1ZXNbMF0sIGlzVmVydGljYWwsIG1pbiwgbWF4KV07XG4gICAgdGhpcy5fc2VsZWN0ZWRSYW5nZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX3NlbGVjdGVkUmFuZ2UuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWRSYW5nZScpO1xuICAgIGlmIChpc1ZlcnRpY2FsKSB0aGlzLl9wYXJlbnQuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX3ZlcnRpY2FsJyk7XG4gICAgaWYgKGhhc1JhbmdlKSB0aGlzLl9zZWxlY3RlZFJhbmdlLmNsYXNzTGlzdC5hZGQoJ3JhbmdlX2JldHdlZW4nKTtcbiAgfVxufVxuXG5leHBvcnQgeyBNYWluVmlldyB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==