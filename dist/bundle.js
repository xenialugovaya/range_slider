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
        this._min = 0;
        this._max = 100;
        this._step = 1;
        this._values = [10, 20];
        this._isVertical = false;
        this._hasRange = true;
        this._hasLabels = false;
        this._handlers = [];
        this.observer = new _observer_observer__WEBPACK_IMPORTED_MODULE_0__["EventObserver"]();
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
        this.observer.broadcast(this.calcValues(this._values));
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
        this._values.map(value => Math.round(value / this._step) * this._step);
        values.map(value => (value < this._min ? this._min : value > this._max ? this._max : value));
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
        this._presenter.setHandlersPosition();
        this._presenter.setValuesToInputs();
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
        this.updateModel();
        this.updateView();
    }
    //не работает
    updateModel() {
        this._view.observer.subscribe((valueData) => {
            this._model.rangeValue = valueData;
        });
    }
    //не работает
    updateView() {
        this._model.observer.subscribe((valueData) => {
            this._view.update(valueData);
        });
    }
    setHandlersPosition() {
        this._view.setHandlerPosition();
    }
    setValuesToInputs() {
        this._view.setValuesToInputs();
    }
    //не работает
    getValuesfromInputs(valueData) {
    }
}



/***/ }),

/***/ "./src/view/ControlPanelView.ts":
/*!**************************************!*\
  !*** ./src/view/ControlPanelView.ts ***!
  \**************************************/
/*! exports provided: ControlPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControlPanel", function() { return ControlPanel; });
class ControlPanel {
    constructor(parent, hasRange, isVertical) {
        this._parent = parent;
        this._controlPanel = document.createElement('div');
        this._controlPanel.classList.add('controlPanel');
        this._parent.after(this._controlPanel);
        this._valueInputs = [];
        this._hasRange = hasRange;
        this._isVertical = isVertical;
    }
    createValueInputs() {
        let inputSingle = document.createElement('input');
        inputSingle.classList.add('handlerValue');
        this._controlPanel.append(inputSingle);
        this._valueInputs.push(inputSingle);
        if (this._hasRange) {
            let inputMin = document.querySelector('.handlerValue');
            if (inputMin)
                inputMin.classList.add('value_min');
            let inputMax = document.createElement('input');
            inputMax.classList.add('handlerValue', 'value_max');
            this._controlPanel.append(inputMax);
            this._valueInputs.push(inputMax);
        }
    }
    get valueInputs() {
        return this._valueInputs;
    }
    //не работает
    chageValues() {
        return this._valueInputs.map(input => input.valueAsNumber);
    }
    createOrientationRadios() {
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
    constructor(parent, isVertical, minLimit, maxLimit) {
        this._handler = document.createElement('div');
        this._handler.classList.add('handler');
        this._parent = parent;
        this._parent.appendChild(this._handler);
        this._isVertical = isVertical;
        this._minLimit = minLimit;
        this._maxLimit = maxLimit;
    }
    setPosition(value) {
        const valuesCount = this._maxLimit - this._minLimit;
        const positionProperty = this._isVertical ? 'bottom' : 'left';
        const handlerSize = this._isVertical ? (this._handler.offsetHeight / this._parent.offsetHeight) * 100 : (this._handler.offsetWidth / this._parent.offsetWidth) * 100;
        const position = (((value - this._minLimit) / valuesCount) * 100) - handlerSize / 2;
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
/* harmony import */ var _ControlPanelView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ControlPanelView */ "./src/view/ControlPanelView.ts");
/* harmony import */ var _observer_observer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../observer/observer */ "./src/observer/observer.ts");



class MainView {
    constructor(parent, hasRange, isVertical, min, max, values) {
        this.observer = new _observer_observer__WEBPACK_IMPORTED_MODULE_2__["EventObserver"];
        this._min = min;
        this._max = max;
        this._values = values;
        this._sliderBody = document.createElement('div');
        this._sliderBody.classList.add('sliderBody');
        this._parent = parent;
        this._parent.appendChild(this._sliderBody);
        this._handlers = hasRange
            ? [
                new _HandlerView__WEBPACK_IMPORTED_MODULE_0__["HandlerView"](this._sliderBody, isVertical, min, max),
                new _HandlerView__WEBPACK_IMPORTED_MODULE_0__["HandlerView"](this._sliderBody, isVertical, min, max),
            ]
            : [new _HandlerView__WEBPACK_IMPORTED_MODULE_0__["HandlerView"](this._sliderBody, isVertical, min, max)];
        this._selectedRange = document.createElement('div');
        this._sliderBody.appendChild(this._selectedRange);
        this._selectedRange.classList.add('selectedRange');
        if (isVertical) {
            this._parent.classList.add('slider_vertical');
        }
        else {
            this._parent.classList.add('slider_horizontal');
        }
        if (hasRange)
            this._selectedRange.classList.add('range_between');
        this._controlPanel = new _ControlPanelView__WEBPACK_IMPORTED_MODULE_1__["ControlPanel"](this._parent, hasRange, isVertical);
        this._controlPanel.createValueInputs();
        //не работает
        this._controlPanel.valueInputs.forEach(input => input.addEventListener('input', this.changeValues.bind(this)));
    }
    //не работает
    changeValues() {
        let valueData = this._controlPanel.valueInputs.map(input => parseInt(input.value));
        //this.update(valueData);
        this.observer.broadcast(valueData);
    }
    update(values) {
        this._handlers.forEach((handler, index) => handler.setPosition(values[index]));
    }
    setHandlerPosition() {
        this._handlers.forEach((handler, index) => handler.setPosition(this._values[index]));
    }
    setValuesToInputs() {
        this._controlPanel.valueInputs.map((input, index) => input.value = '' + this._values[index]);
    }
    //не работает
    getValuesfromInputs() {
    }
}



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9tb2RlbC9NYWluTW9kZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVsL2hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29ic2VydmVyL29ic2VydmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9wcmVzZW50ZXIvRmFjYWRlLnRzIiwid2VicGFjazovLy8uL3NyYy9wcmVzZW50ZXIvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy92aWV3L0NvbnRyb2xQYW5lbFZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXcvSGFuZGxlclZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXcvTWFpblZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7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QUFTLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsTUFBTSxDQUFDLE1BQWdCO1FBQ3JCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWpGLENBQUM7SUFFQSxrQkFBa0I7UUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFFRCxpQkFBaUI7UUFDaEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFDRCxhQUFhO0lBQ2IsbUJBQW1CO0lBRW5CLENBQUM7Q0FFSDtBQUVtQiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7IEZhY2FkZSB9IGZyb20gJy4vcHJlc2VudGVyL0ZhY2FkZSc7XG5cbiQoZnVuY3Rpb24oKSB7XG4gICQuZm4uc2xpZGVyID0gZnVuY3Rpb24ob3B0aW9ucyk6IEZhY2FkZSB7XG4gICAgY29uc3QgZmFjYWRlOiBGYWNhZGUgPSBuZXcgRmFjYWRlKHRoaXMuZ2V0KDApLCBvcHRpb25zKTtcbiAgICByZXR1cm4gZmFjYWRlO1xuICB9O1xufSk7XG4iLCJpbXBvcnQgeyBFdmVudE9ic2VydmVyIH0gZnJvbSAnLi4vb2JzZXJ2ZXIvb2JzZXJ2ZXInO1xuaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gJy4vaGFuZGxlcic7XG5cbnR5cGUgc2xpZGVyT3B0aW9ucyA9IHtcbiAgbWluPzogbnVtYmVyO1xuICBtYXg/OiBudW1iZXI7XG4gIHN0ZXA/OiBudW1iZXI7XG4gIHZhbHVlcz86IG51bWJlcltdO1xuICBpc1ZlcnRpY2FsPzogYm9vbGVhbjtcbiAgaGFzUmFuZ2U/OiBib29sZWFuO1xuICBoYXNMYWJlbHM/OiBib29sZWFuO1xufTtcblxuY2xhc3MgTWFpbk1vZGVsIHtcbiAgcHVibGljIG9ic2VydmVyOiBFdmVudE9ic2VydmVyO1xuICBwcml2YXRlIF9taW4gPSAwO1xuICBwcml2YXRlIF9tYXggPSAxMDA7XG4gIHByaXZhdGUgX3N0ZXAgPSAxO1xuICBwcml2YXRlIF92YWx1ZXMgPSBbMTAsIDIwXTtcbiAgcHJpdmF0ZSBfaXNWZXJ0aWNhbCA9IGZhbHNlO1xuICBwcml2YXRlIF9oYXNSYW5nZSA9IHRydWU7XG4gIHByaXZhdGUgX2hhc0xhYmVscyA9IGZhbHNlO1xuICBwcml2YXRlIF9oYW5kbGVyczogSGFuZGxlcltdID0gW107XG4gIGNvbnN0cnVjdG9yKHNsaWRlck9wdGlvbnM6IHNsaWRlck9wdGlvbnMpIHtcbiAgICB0aGlzLm9ic2VydmVyID0gbmV3IEV2ZW50T2JzZXJ2ZXIoKTsgIFxuICAgIHRoaXMuX21pbiA9IHNsaWRlck9wdGlvbnMubWluID8gc2xpZGVyT3B0aW9ucy5taW4gOiAwO1xuICAgIHRoaXMuX21heCA9IHNsaWRlck9wdGlvbnMubWF4ID8gc2xpZGVyT3B0aW9ucy5tYXggOiB0aGlzLl9tYXg7XG4gICAgdGhpcy5fc3RlcCA9IHNsaWRlck9wdGlvbnMuc3RlcCA/IHNsaWRlck9wdGlvbnMuc3RlcCA6IHRoaXMuX3N0ZXA7XG4gICAgdGhpcy5fdmFsdWVzID0gc2xpZGVyT3B0aW9ucy52YWx1ZXMgPyBzbGlkZXJPcHRpb25zLnZhbHVlcyA6IHRoaXMuX3ZhbHVlcztcbiAgICB0aGlzLl9oYXNSYW5nZSA9IHNsaWRlck9wdGlvbnMuaGFzUmFuZ2UgPyBzbGlkZXJPcHRpb25zLmhhc1JhbmdlIDogdGhpcy5faGFzUmFuZ2U7XG4gICAgdGhpcy5faXNWZXJ0aWNhbCA9IHNsaWRlck9wdGlvbnMuaXNWZXJ0aWNhbCA/IHNsaWRlck9wdGlvbnMuaXNWZXJ0aWNhbCA6IHRoaXMuX2lzVmVydGljYWw7XG4gICAgdGhpcy5faGFzTGFiZWxzID0gc2xpZGVyT3B0aW9ucy5oYXNMYWJlbHMgPyBzbGlkZXJPcHRpb25zLmhhc0xhYmVscyA6IHRoaXMuX2hhc0xhYmVscztcbiAgfVxuICBnZXQgbWluKCk6IG51bWJlciB7XG4gICAgdGhpcy5fbWluID0gTWF0aC5yb3VuZCh0aGlzLl9taW4gLyB0aGlzLl9zdGVwKSAqIHRoaXMuX3N0ZXA7XG4gICAgcmV0dXJuIHRoaXMuX21pbjtcbiAgfVxuXG4gIHNldCBtaW4obWluOiBudW1iZXIpIHtcbiAgICB0aGlzLl9taW4gPSBtaW47XG4gIH1cblxuICBnZXQgbWF4KCk6IG51bWJlciB7XG4gICAgdGhpcy5fbWF4ID0gTWF0aC5yb3VuZCh0aGlzLl9tYXggLyB0aGlzLl9zdGVwKSAqIHRoaXMuX3N0ZXA7XG4gICAgcmV0dXJuIHRoaXMuX21heDtcbiAgfVxuXG4gIHNldCBtYXgobWF4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9tYXggPSBtYXg7XG4gIH1cblxuICBnZXQgc3RlcCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9zdGVwO1xuICB9XG5cbiAgc2V0IHN0ZXAoc3RlcDogbnVtYmVyKSB7XG4gICAgdGhpcy5fc3RlcCA9IHN0ZXA7XG4gIH1cblxuICBnZXQgc2luZ2xlVmFsdWUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jYWxjVmFsdWVzKHRoaXMuX3ZhbHVlcylbMF07XG4gIH1cblxuICBzZXQgc2luZ2xlVmFsdWUodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3ZhbHVlc1swXSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHJhbmdlVmFsdWUoKTogbnVtYmVyW10ge1xuICAgIHJldHVybiB0aGlzLmNhbGNWYWx1ZXModGhpcy5fdmFsdWVzKTtcbiAgIFxuICB9XG5cbiAgc2V0IHJhbmdlVmFsdWUodmFsdWVzOiBudW1iZXJbXSkge1xuICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlcztcbiAgICB0aGlzLm9ic2VydmVyLmJyb2FkY2FzdCh0aGlzLmNhbGNWYWx1ZXModGhpcy5fdmFsdWVzKSk7XG4gIH1cblxuICBnZXQgaXNWZXJ0aWNhbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNWZXJ0aWNhbDtcbiAgfVxuXG4gIHNldCBpc1ZlcnRpY2FsKHZlcnRpY2FsOiBib29sZWFuKSB7XG4gICAgdGhpcy5faXNWZXJ0aWNhbCA9IHZlcnRpY2FsO1xuICB9XG5cbiAgZ2V0IGhhc1JhbmdlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oYXNSYW5nZTtcbiAgfVxuXG4gIHNldCBoYXNSYW5nZShyYW5nZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2hhc1JhbmdlID0gcmFuZ2U7XG4gIH1cblxuICAvLyBnZXQgaW5pdGlhbCBjb29yZGluYXRlcyBvZiBhbnkgZWxlbWVudCwgZGVwZW5kaW5nIG9uIGRpbWVuc2lvblxuICBnZXRDb29yZHMoZWxlbTogSFRNTEVsZW1lbnQpOiBvYmplY3Qge1xuICAgIGNvbnN0IGJveCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgaWYgKHRoaXMuX2lzVmVydGljYWwpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHg6IGJveC5sZWZ0ICsgcGFnZVhPZmZzZXQsXG4gICAgICAgIHk6IGJveC5ib3R0b20gKyBwYWdlWU9mZnNldCxcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHg6IGJveC5sZWZ0ICsgcGFnZVhPZmZzZXQsXG4gICAgICAgIHk6IGJveC50b3AgKyBwYWdlWE9mZnNldCxcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgLy9jaGVjayB0aGF0IHZhbHVlcyBvZiBoYW5kbGVycyBhcmUgd2l0aGluIG1pbiBhbmQgbWF4XG4gIC8vY2hlY2sgdGhhdCB2YWx1ZSAwIGlzIGxlc3MgdGhhbiB2YWx1ZSAxIGZvciByYW5nZVxuICBjYWxjVmFsdWVzKHZhbHVlczogbnVtYmVyW10pOiBudW1iZXJbXSB7XG4gICAgdGhpcy5fdmFsdWVzLm1hcCh2YWx1ZSA9PiBNYXRoLnJvdW5kKHZhbHVlIC8gdGhpcy5fc3RlcCkgKiB0aGlzLl9zdGVwKTtcbiAgICB2YWx1ZXMubWFwKHZhbHVlID0+ICh2YWx1ZSA8IHRoaXMuX21pbiA/IHRoaXMuX21pbiA6IHZhbHVlID4gdGhpcy5fbWF4ID8gdGhpcy5fbWF4IDogdmFsdWUpKTtcbiAgICBpZiAodmFsdWVzWzBdID09PSB2YWx1ZXNbMV0pIHZhbHVlc1sxXSArPSB0aGlzLl9zdGVwO1xuICAgIGlmICh2YWx1ZXNbMF0gPiB2YWx1ZXNbMV0pIFt2YWx1ZXNbMF0sIHZhbHVlc1sxXV0gPSBbdmFsdWVzWzFdLCB2YWx1ZXNbMF1dO1xuICAgIHJldHVybiB2YWx1ZXM7XG4gIH1cbiAgLy9jcmVhdGUgaGFuZGxlcnMgZGVwZW5kaW5nIG9uIHJhbmdlXG4gIHNldEhhbmRsZXJzKHZhbHVlczogbnVtYmVyW10pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faGFzUmFuZ2UpIHtcbiAgICAgIHRoaXMuX2hhbmRsZXJzID0gW25ldyBIYW5kbGVyKHZhbHVlc1swXSksIG5ldyBIYW5kbGVyKHZhbHVlc1sxXSldO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oYW5kbGVycyA9IFtuZXcgSGFuZGxlcih2YWx1ZXNbMF0pXTtcbiAgICB9XG4gIH1cblxuICAvL3NldCBsaW1pdHMgb2YgYSBzbGlkZXIgaW4gdGVybXMgb2YgcHggdG8gY29udHJvbCBoYW5kbGVyIG1vdmVtZW50XG4gIHNldExpbWl0cyhzbGlkZXJCb2R5OiBIVE1MRWxlbWVudCwgaGFuZGxlcjogSFRNTEVsZW1lbnQpOiBvYmplY3Qge1xuICAgIGlmICh0aGlzLl9pc1ZlcnRpY2FsKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtaW5MaW1pdDogMCxcbiAgICAgICAgbWF4TGltaXQ6IHNsaWRlckJvZHkub2Zmc2V0SGVpZ2h0IC0gaGFuZGxlci5vZmZzZXRIZWlnaHQsXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtaW5MaW1pdDogMCxcbiAgICAgICAgbWF4TGltaXQ6IHNsaWRlckJvZHkub2Zmc2V0V2lkdGggLSBoYW5kbGVyLm9mZnNldFdpZHRoLFxuICAgICAgfTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgTWFpbk1vZGVsIH07XG4iLCJjbGFzcyBIYW5kbGVyIHtcbiAgcHJpdmF0ZSBfcG9zaXRpb246IG51bWJlcjtcbiAgY29uc3RydWN0b3IocG9zaXRpb246IG51bWJlcikge1xuICAgIHRoaXMuX3Bvc2l0aW9uID0gcG9zaXRpb247XG4gIH1cblxuICBnZXQgcG9zaXRpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XG4gIH1cblxuICBzZXQgcG9zaXRpb24odmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3Bvc2l0aW9uID0gdmFsdWU7XG4gIH1cbn1cblxuZXhwb3J0IHsgSGFuZGxlciB9O1xuIiwiY2xhc3MgRXZlbnRPYnNlcnZlciB7XG4gIHByaXZhdGUgX29ic2VydmVyczogRnVuY3Rpb25bXTtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fb2JzZXJ2ZXJzID0gW107XG4gIH1cbiAgc3Vic2NyaWJlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMuX29ic2VydmVycy5wdXNoKGZuKTtcbiAgfVxuICB1bnN1YnNjcmliZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLl9vYnNlcnZlcnMgPSB0aGlzLl9vYnNlcnZlcnMuZmlsdGVyKHN1YnNjcmliZXIgPT4gc3Vic2NyaWJlciAhPT0gZm4pO1xuICB9XG4gIGJyb2FkY2FzdChkYXRhOiBvYmplY3QpOiB2b2lkIHtcbiAgICB0aGlzLl9vYnNlcnZlcnMuZm9yRWFjaChzdWJzY3JpYmVyID0+IHN1YnNjcmliZXIoZGF0YSkpO1xuICB9XG59XG5cbmV4cG9ydCB7IEV2ZW50T2JzZXJ2ZXIgfTtcbiIsImltcG9ydCB7IE1haW5Nb2RlbCB9IGZyb20gJy4uL21vZGVsL01haW5Nb2RlbCc7XG5pbXBvcnQgeyBQcmVzZW50ZXIgfSBmcm9tICcuL1ByZXNlbnRlcic7XG5pbXBvcnQgeyBzbGlkZXJPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWwvc2xpZGVyT3B0aW9ucyc7XG5cbmNsYXNzIEZhY2FkZSB7XG4gIHByaXZhdGUgX21vZGVsOiBNYWluTW9kZWw7XG4gIHByaXZhdGUgX3ByZXNlbnRlcjogUHJlc2VudGVyO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmVudDogSFRNTEVsZW1lbnQsIHNsaWRlck9wdGlvbnM6IHNsaWRlck9wdGlvbnMpIHtcbiAgICB0aGlzLl9tb2RlbCA9IG5ldyBNYWluTW9kZWwoc2xpZGVyT3B0aW9ucyk7XG4gICAgdGhpcy5fcHJlc2VudGVyID0gbmV3IFByZXNlbnRlcihwYXJlbnQsIHRoaXMuX21vZGVsKTtcbiAgICB0aGlzLl9wcmVzZW50ZXIuc2V0SGFuZGxlcnNQb3NpdGlvbigpO1xuICAgIHRoaXMuX3ByZXNlbnRlci5zZXRWYWx1ZXNUb0lucHV0cygpO1xuICAgIFxuICB9XG5cbiAgZ2V0IHNpbmdsZVZhbHVlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLnNpbmdsZVZhbHVlO1xuICB9XG5cbiAgc2V0IHNpbmdsZVZhbHVlKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9tb2RlbC5zaW5nbGVWYWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHJhbmdlVmFsdWUoKTogbnVtYmVyW10ge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5yYW5nZVZhbHVlO1xuICB9XG5cbiAgc2V0IHJhbmdlVmFsdWUodmFsdWU6IG51bWJlcltdKSB7XG4gICAgdGhpcy5fbW9kZWwucmFuZ2VWYWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHN0ZXAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuc3RlcDtcbiAgfVxuXG4gIHNldCBzdGVwKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9tb2RlbC5zdGVwID0gdmFsdWU7XG4gIH1cblxuICBnZXQgaXNWZXJ0aWNhbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuaXNWZXJ0aWNhbDtcbiAgfVxuXG4gIHNldCBpc1ZlcnRpY2FsKHZlcnRpY2FsOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbW9kZWwuaXNWZXJ0aWNhbCA9IHZlcnRpY2FsO1xuICB9XG5cbiAgXG5cbn1cblxuZXhwb3J0IHsgRmFjYWRlIH07XG4iLCJpbXBvcnQgeyBNYWluTW9kZWwgfSBmcm9tICcuLi9tb2RlbC9NYWluTW9kZWwnO1xuaW1wb3J0IHsgTWFpblZpZXcgfSBmcm9tICcuLi92aWV3L01haW5WaWV3JztcblxuY2xhc3MgUHJlc2VudGVyIHtcbiAgcHJpdmF0ZSBfbW9kZWw6IE1haW5Nb2RlbDtcbiAgcHJpdmF0ZSBfdmlldzogTWFpblZpZXc7XG4gIHByaXZhdGUgX3ZhbHVlczogbnVtYmVyW107XG5cbiAgY29uc3RydWN0b3IocGFyZW50OiBIVE1MRWxlbWVudCwgbW9kZWw6IE1haW5Nb2RlbCkge1xuICAgIHRoaXMuX21vZGVsID0gbW9kZWw7XG4gICAgdGhpcy5fdmFsdWVzID0gdGhpcy5fbW9kZWwucmFuZ2VWYWx1ZTtcbiAgICB0aGlzLl92aWV3ID0gbmV3IE1haW5WaWV3KFxuICAgICAgcGFyZW50LFxuICAgICAgdGhpcy5fbW9kZWwuaGFzUmFuZ2UsXG4gICAgICB0aGlzLl9tb2RlbC5pc1ZlcnRpY2FsLFxuICAgICAgdGhpcy5fbW9kZWwubWluLFxuICAgICAgdGhpcy5fbW9kZWwubWF4LFxuICAgICAgdGhpcy5fdmFsdWVzLFxuICAgICk7XG4gICAgdGhpcy51cGRhdGVNb2RlbCgpO1xuICAgIHRoaXMudXBkYXRlVmlldygpO1xuICBcbiAgfVxuXG4vL9C90LUg0YDQsNCx0L7RgtCw0LXRglxuICB1cGRhdGVNb2RlbCgpIHtcbiAgICB0aGlzLl92aWV3Lm9ic2VydmVyLnN1YnNjcmliZSgodmFsdWVEYXRhOiBudW1iZXJbXSk9PntcbiAgICAgIHRoaXMuX21vZGVsLnJhbmdlVmFsdWUgPSB2YWx1ZURhdGE7XG4gICAgIH0pO1xuICB9XG4vL9C90LUg0YDQsNCx0L7RgtCw0LXRglxuICB1cGRhdGVWaWV3KCkge1xuICAgIHRoaXMuX21vZGVsLm9ic2VydmVyLnN1YnNjcmliZSgodmFsdWVEYXRhOiBudW1iZXJbXSk9PntcbiAgICAgIHRoaXMuX3ZpZXcudXBkYXRlKHZhbHVlRGF0YSk7XG4gICAgIH0pO1xuICB9XG4gIFxuXG4gIHNldEhhbmRsZXJzUG9zaXRpb24oKXtcbiAgICB0aGlzLl92aWV3LnNldEhhbmRsZXJQb3NpdGlvbigpO1xuICB9XG5cbiAgc2V0VmFsdWVzVG9JbnB1dHMoKSB7XG4gICAgdGhpcy5fdmlldy5zZXRWYWx1ZXNUb0lucHV0cygpO1xuICAgfVxuICAgLy/QvdC1INGA0LDQsdC+0YLQsNC10YJcbiAgIGdldFZhbHVlc2Zyb21JbnB1dHModmFsdWVEYXRhOiBudW1iZXJbXSkge1xuICAgXG4gICAgXG4gIH1cbiAgXG4gIFxuXG59XG5cbmV4cG9ydCB7IFByZXNlbnRlciB9O1xuIiwiY2xhc3MgQ29udHJvbFBhbmVsIHtcbiAgICBwcml2YXRlIF9wYXJlbnQ6IEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgX2NvbnRyb2xQYW5lbDogSFRNTEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBfdmFsdWVJbnB1dHM6IEhUTUxJbnB1dEVsZW1lbnRbXTtcbiAgICBwcml2YXRlIF9oYXNSYW5nZTogYm9vbGVhbjtcbiAgICBwcml2YXRlIF9pc1ZlcnRpY2FsOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocGFyZW50OiBIVE1MRWxlbWVudCwgaGFzUmFuZ2U6IGJvb2xlYW4sIGlzVmVydGljYWw6IGJvb2xlYW4pe1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgICAgICAgICAgdGhpcy5fY29udHJvbFBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9jb250cm9sUGFuZWwuY2xhc3NMaXN0LmFkZCgnY29udHJvbFBhbmVsJyk7XG4gICAgICAgICAgICB0aGlzLl9wYXJlbnQuYWZ0ZXIodGhpcy5fY29udHJvbFBhbmVsKTtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlSW5wdXRzID0gW107XG4gICAgICAgICAgICB0aGlzLl9oYXNSYW5nZSA9IGhhc1JhbmdlO1xuICAgICAgICAgICAgdGhpcy5faXNWZXJ0aWNhbCA9IGlzVmVydGljYWw7XG4gICAgfVxuICAgIGNyZWF0ZVZhbHVlSW5wdXRzKCkge1xuICAgICAgICBsZXQgaW5wdXRTaW5nbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBpbnB1dFNpbmdsZS5jbGFzc0xpc3QuYWRkKCdoYW5kbGVyVmFsdWUnKVxuICAgICAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKGlucHV0U2luZ2xlKTtcbiAgICAgICAgdGhpcy5fdmFsdWVJbnB1dHMucHVzaChpbnB1dFNpbmdsZSk7XG4gICAgICAgIGlmICh0aGlzLl9oYXNSYW5nZSl7XG4gICAgICAgICAgICBsZXQgaW5wdXRNaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGFuZGxlclZhbHVlJyk7XG4gICAgICAgICAgICBpZiAoaW5wdXRNaW4pIGlucHV0TWluLmNsYXNzTGlzdC5hZGQoJ3ZhbHVlX21pbicpO1xuICAgICAgICAgICAgbGV0IGlucHV0TWF4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGlucHV0TWF4LmNsYXNzTGlzdC5hZGQoJ2hhbmRsZXJWYWx1ZScsICd2YWx1ZV9tYXgnKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQoaW5wdXRNYXgpO1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVJbnB1dHMucHVzaChpbnB1dE1heCk7XG4gICAgICAgICAgICBcblxuICAgICAgICB9XG5cbiAgICB9XG4gICAgZ2V0IHZhbHVlSW5wdXRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWVJbnB1dHM7XG4gICB9XG4gLy/QvdC1INGA0LDQsdC+0YLQsNC10YJcbiAgIGNoYWdlVmFsdWVzKCk6IG51bWJlcltde1xuICAgIHJldHVybiB0aGlzLl92YWx1ZUlucHV0cy5tYXAoaW5wdXQgPT4gaW5wdXQudmFsdWVBc051bWJlcik7XG4gIH1cblxuICAgY3JlYXRlT3JpZW50YXRpb25SYWRpb3MoKSB7XG5cbiAgIH1cbiAgICAgICAgICAgIFxuICAgIFxufVxuXG5leHBvcnQgeyBDb250cm9sUGFuZWwgfTsiLCJjbGFzcyBIYW5kbGVyVmlldyB7XG4gIHByaXZhdGUgX2hhbmRsZXI6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9wYXJlbnQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9pc1ZlcnRpY2FsOiBib29sZWFuO1xuICBwcml2YXRlIF9taW5MaW1pdDogbnVtYmVyO1xuICBwcml2YXRlIF9tYXhMaW1pdDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHBhcmVudDogSFRNTEVsZW1lbnQsXG4gICAgaXNWZXJ0aWNhbDogYm9vbGVhbixcbiAgICBtaW5MaW1pdDogbnVtYmVyLFxuICAgIG1heExpbWl0OiBudW1iZXIsXG4gICkge1xuICAgIHRoaXMuX2hhbmRsZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9oYW5kbGVyLmNsYXNzTGlzdC5hZGQoJ2hhbmRsZXInKTtcbiAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5fcGFyZW50LmFwcGVuZENoaWxkKHRoaXMuX2hhbmRsZXIpO1xuICAgIHRoaXMuX2lzVmVydGljYWwgPSBpc1ZlcnRpY2FsO1xuICAgIHRoaXMuX21pbkxpbWl0ID0gbWluTGltaXQ7XG4gICAgdGhpcy5fbWF4TGltaXQgPSBtYXhMaW1pdDtcbiAgfVxuXG4gIHNldFBvc2l0aW9uKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZXNDb3VudCA9IHRoaXMuX21heExpbWl0IC0gdGhpcy5fbWluTGltaXQ7XG4gICAgY29uc3QgcG9zaXRpb25Qcm9wZXJ0eSA9IHRoaXMuX2lzVmVydGljYWwgPyAnYm90dG9tJyA6ICdsZWZ0JztcbiAgICBjb25zdCBoYW5kbGVyU2l6ZSA9IHRoaXMuX2lzVmVydGljYWwgPyAodGhpcy5faGFuZGxlci5vZmZzZXRIZWlnaHQgLyB0aGlzLl9wYXJlbnQub2Zmc2V0SGVpZ2h0KSAqIDEwMCA6ICh0aGlzLl9oYW5kbGVyLm9mZnNldFdpZHRoIC8gdGhpcy5fcGFyZW50Lm9mZnNldFdpZHRoKSAqIDEwMDsgXG4gICAgY29uc3QgcG9zaXRpb24gPSAoKCh2YWx1ZSAtIHRoaXMuX21pbkxpbWl0KSAvIHZhbHVlc0NvdW50KSAqIDEwMCkgLSBoYW5kbGVyU2l6ZSAvIDI7XG4gICAgdGhpcy5faGFuZGxlci5zdHlsZVtwb3NpdGlvblByb3BlcnR5XSA9IGAke3Bvc2l0aW9ufSVgO1xuICB9XG59XG5cbmV4cG9ydCB7IEhhbmRsZXJWaWV3IH07XG4iLCJpbXBvcnQgeyBIYW5kbGVyVmlldyB9IGZyb20gJy4vSGFuZGxlclZpZXcnO1xuaW1wb3J0IHsgQ29udHJvbFBhbmVsIH0gZnJvbSAnLi9Db250cm9sUGFuZWxWaWV3JztcbmltcG9ydCB7IEV2ZW50T2JzZXJ2ZXIgfSBmcm9tICcuLi9vYnNlcnZlci9vYnNlcnZlcic7XG5cbmNsYXNzIE1haW5WaWV3IHtcbiAgcHVibGljIG9ic2VydmVyOiBFdmVudE9ic2VydmVyO1xuICBwcml2YXRlIF9zbGlkZXJCb2R5OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfcGFyZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfc2VsZWN0ZWRSYW5nZTogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX2hhbmRsZXJzOiBIYW5kbGVyVmlld1tdO1xuICBwcml2YXRlIF9taW46IG51bWJlcjtcbiAgcHJpdmF0ZSBfbWF4OiBudW1iZXI7XG4gIHByaXZhdGUgX3ZhbHVlczogbnVtYmVyW107XG4gIHByaXZhdGUgX2NvbnRyb2xQYW5lbDogQ29udHJvbFBhbmVsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHBhcmVudDogSFRNTEVsZW1lbnQsXG4gICAgaGFzUmFuZ2U6IGJvb2xlYW4sXG4gICAgaXNWZXJ0aWNhbDogYm9vbGVhbixcbiAgICBtaW46IG51bWJlcixcbiAgICBtYXg6IG51bWJlcixcbiAgICB2YWx1ZXM6IG51bWJlcltdLFxuICApIHtcbiAgICB0aGlzLm9ic2VydmVyID0gbmV3IEV2ZW50T2JzZXJ2ZXI7XG4gICAgdGhpcy5fbWluID0gbWluO1xuICAgIHRoaXMuX21heCA9IG1heDtcbiAgICB0aGlzLl92YWx1ZXMgPSB2YWx1ZXM7XG4gICAgdGhpcy5fc2xpZGVyQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX3NsaWRlckJvZHkuY2xhc3NMaXN0LmFkZCgnc2xpZGVyQm9keScpO1xuICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcbiAgICB0aGlzLl9wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5fc2xpZGVyQm9keSk7XG4gICAgdGhpcy5faGFuZGxlcnMgPSBoYXNSYW5nZVxuICAgICAgPyBbXG4gICAgICAgICAgbmV3IEhhbmRsZXJWaWV3KHRoaXMuX3NsaWRlckJvZHksIGlzVmVydGljYWwsIG1pbiwgbWF4KSxcbiAgICAgICAgICBuZXcgSGFuZGxlclZpZXcodGhpcy5fc2xpZGVyQm9keSwgaXNWZXJ0aWNhbCwgbWluLCBtYXgpLFxuICAgICAgICBdXG4gICAgICA6IFtuZXcgSGFuZGxlclZpZXcodGhpcy5fc2xpZGVyQm9keSwgaXNWZXJ0aWNhbCwgbWluLCBtYXgpXTtcbiAgICB0aGlzLl9zZWxlY3RlZFJhbmdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fc2xpZGVyQm9keS5hcHBlbmRDaGlsZCh0aGlzLl9zZWxlY3RlZFJhbmdlKTtcbiAgICB0aGlzLl9zZWxlY3RlZFJhbmdlLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkUmFuZ2UnKTtcbiAgICBpZiAoaXNWZXJ0aWNhbCkge1xuICAgICAgdGhpcy5fcGFyZW50LmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl92ZXJ0aWNhbCcpO1xuICAgIH0gZWxzZXtcbiAgICAgIHRoaXMuX3BhcmVudC5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfaG9yaXpvbnRhbCcpO1xuICAgIH1cbiAgICBpZiAoaGFzUmFuZ2UpIHRoaXMuX3NlbGVjdGVkUmFuZ2UuY2xhc3NMaXN0LmFkZCgncmFuZ2VfYmV0d2VlbicpO1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbCA9IG5ldyBDb250cm9sUGFuZWwodGhpcy5fcGFyZW50LCBoYXNSYW5nZSwgaXNWZXJ0aWNhbCk7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLmNyZWF0ZVZhbHVlSW5wdXRzKCk7IFxuICAgIC8v0L3QtSDRgNCw0LHQvtGC0LDQtdGCXG4gICAgdGhpcy5fY29udHJvbFBhbmVsLnZhbHVlSW5wdXRzLmZvckVhY2goaW5wdXQgPT4gaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzLmNoYW5nZVZhbHVlcy5iaW5kKHRoaXMpKSk7XG4gIH1cblxuICAvL9C90LUg0YDQsNCx0L7RgtCw0LXRglxuICBjaGFuZ2VWYWx1ZXMoKSB7XG4gICAgXG4gICAgIGxldCB2YWx1ZURhdGEgPSB0aGlzLl9jb250cm9sUGFuZWwudmFsdWVJbnB1dHMubWFwKCBpbnB1dCA9PiBwYXJzZUludChpbnB1dC52YWx1ZSkgKTsgXG4gICAgIC8vdGhpcy51cGRhdGUodmFsdWVEYXRhKTtcbiAgICAgdGhpcy5vYnNlcnZlci5icm9hZGNhc3QodmFsdWVEYXRhKTtcbiAgfVxuXG4gIHVwZGF0ZSh2YWx1ZXM6IG51bWJlcltdKXtcbiAgICB0aGlzLl9oYW5kbGVycy5mb3JFYWNoKChoYW5kbGVyLCBpbmRleCkgPT4gaGFuZGxlci5zZXRQb3NpdGlvbih2YWx1ZXNbaW5kZXhdKSk7XG5cbiAgfVxuXG4gICBzZXRIYW5kbGVyUG9zaXRpb24oKXtcbiAgICB0aGlzLl9oYW5kbGVycy5mb3JFYWNoKChoYW5kbGVyLCBpbmRleCkgPT4gaGFuZGxlci5zZXRQb3NpdGlvbih0aGlzLl92YWx1ZXNbaW5kZXhdKSk7XG4gICB9XG5cbiAgIHNldFZhbHVlc1RvSW5wdXRzKCkge1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC52YWx1ZUlucHV0cy5tYXAoKGlucHV0LCBpbmRleCkgPT4gaW5wdXQudmFsdWUgPSAnJyArIHRoaXMuX3ZhbHVlc1tpbmRleF0pO1xuICAgfVxuICAgLy/QvdC1INGA0LDQsdC+0YLQsNC10YJcbiAgIGdldFZhbHVlc2Zyb21JbnB1dHMoKSB7XG4gICAgICBcbiAgIH1cbiAgICAgXG59XG5cbmV4cG9ydCB7IE1haW5WaWV3IH07XG4iXSwic291cmNlUm9vdCI6IiJ9