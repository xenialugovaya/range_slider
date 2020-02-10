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
    notifyPresnter(valueData) {
        this.observer.broadcast(valueData);
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
        this.notifyPresnter({
            values: this.calcValues(this._values),
        });
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
        this._presenter.setStepToInput();
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
        this._view = new _view_MainView__WEBPACK_IMPORTED_MODULE_0__["MainView"](parent, this._model.hasRange, this._model.isVertical, this._model.min, this._model.max, this._values, this._model.step);
        this.updateModel();
        this.updateView();
    }
    updateModel() {
        this._view.observer.subscribe((valueData) => {
            if (valueData.values)
                this._model.rangeValue = valueData.values;
            if (valueData.isVertical)
                this._model.isVertical = valueData.isVertical;
        });
    }
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
    setStepToInput() {
        this._view.setStepToInput();
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
        this._stepInput = document.createElement('input');
        this._orientationRadios = [];
        this._hasRange = hasRange;
        this._isVertical = isVertical;
        this.createValueInputs();
        this.createStepInput();
        this.createOrientationRadios();
    }
    createValueInputs() {
        const title = document.createElement('p');
        this._controlPanel.append(title);
        title.innerText = 'Значение бегунков';
        const inputSingle = document.createElement('input');
        inputSingle.classList.add('handlerValue');
        this._controlPanel.append(inputSingle);
        this._valueInputs.push(inputSingle);
        if (this._hasRange) {
            const inputMin = document.querySelector('.handlerValue');
            if (inputMin)
                inputMin.classList.add('value_min');
            const inputMax = document.createElement('input');
            inputMax.classList.add('handlerValue', 'value_max');
            this._controlPanel.append(inputMax);
            this._valueInputs.push(inputMax);
        }
    }
    get valueInputs() {
        return this._valueInputs;
    }
    createStepInput() {
        const title = document.createElement('p');
        this._controlPanel.append(title);
        title.innerText = 'Значение шага';
        this._stepInput.classList.add('stepValue');
        this._controlPanel.append(this._stepInput);
    }
    get stepInput() {
        return this._stepInput;
    }
    createOrientationRadios() {
        const title = document.createElement('p');
        this._controlPanel.append(title);
        title.innerText = 'Вертикальный/горизонтальный';
        const radioVertical = document.createElement('input');
        radioVertical.id = 'radio_vertical';
        const radioHorizontal = document.createElement('input');
        radioHorizontal.id = 'radio_horizontal';
        this._orientationRadios = [radioVertical, radioHorizontal];
        this._orientationRadios.forEach(radio => {
            radio.type = 'radio';
            radio.name = 'orientation';
            this._controlPanel.append(radio);
        });
    }
    get orientationRadios() {
        return this._orientationRadios;
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
        const handlerSize = this._isVertical
            ? (this._handler.offsetHeight / this._parent.offsetHeight) * 100
            : (this._handler.offsetWidth / this._parent.offsetWidth) * 100;
        const position = ((value - this._minLimit) / valuesCount) * 100 - handlerSize / 2;
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
    constructor(parent, hasRange, isVertical, min, max, values, step) {
        this.observer = new _observer_observer__WEBPACK_IMPORTED_MODULE_2__["EventObserver"]();
        this._min = min;
        this._max = max;
        this._values = values;
        this._step = step;
        this._isVertical = isVertical;
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
        this._controlPanel.valueInputs.forEach(input => input.addEventListener('input', this.notifyPresenter.bind(this)));
        this._controlPanel.orientationRadios.forEach(radio => radio.addEventListener('change', this.notifyPresenter.bind(this)));
        this.setOrientationToRadio();
    }
    notifyPresenter() {
        const newValues = this._controlPanel.valueInputs.map(input => parseInt(input.value));
        const newOrientation = this._controlPanel.orientationRadios[0].checked == true;
        this.observer.broadcast({
            values: newValues,
            isVertical: newOrientation,
        });
    }
    update(valueData) {
        this._handlers.forEach((handler, index) => {
            if (valueData.values)
                handler.setPosition(valueData.values[index]);
        });
        if (valueData.isVertical)
            this._isVertical = valueData.isVertical;
    }
    setHandlerPosition() {
        this._handlers.forEach((handler, index) => handler.setPosition(this._values[index]));
    }
    setValuesToInputs() {
        this._controlPanel.valueInputs.map((input, index) => (input.value = this._values[index].toString()));
    }
    setStepToInput() {
        this._controlPanel.stepInput.value = this._step.toString();
    }
    setOrientationToRadio() {
        this._controlPanel.orientationRadios.map((radio, index) => this._isVertical
            ? (this._controlPanel.orientationRadios[0].checked = true)
            : (this._controlPanel.orientationRadios[1].checked = true));
    }
}



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9tb2RlbC9NYWluTW9kZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVsL2hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29ic2VydmVyL29ic2VydmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9wcmVzZW50ZXIvRmFjYWRlLnRzIiwid2VicGFjazovLy8uL3NyYy9wcmVzZW50ZXIvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy92aWV3L0NvbnRyb2xQYW5lbFZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXcvSGFuZGxlclZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXcvTWFpblZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7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QUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDMUQsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQzdELENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFFbUIiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBGYWNhZGUgfSBmcm9tICcuL3ByZXNlbnRlci9GYWNhZGUnO1xuXG4kKGZ1bmN0aW9uKCkge1xuICAkLmZuLnNsaWRlciA9IGZ1bmN0aW9uKG9wdGlvbnMpOiBGYWNhZGUge1xuICAgIGNvbnN0IGZhY2FkZTogRmFjYWRlID0gbmV3IEZhY2FkZSh0aGlzLmdldCgwKSwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIGZhY2FkZTtcbiAgfTtcbn0pO1xuIiwiaW1wb3J0IHsgRXZlbnRPYnNlcnZlciB9IGZyb20gJy4uL29ic2VydmVyL29ic2VydmVyJztcbmltcG9ydCB7IEhhbmRsZXIgfSBmcm9tICcuL2hhbmRsZXInO1xuaW1wb3J0IHsgc2xpZGVyT3B0aW9ucyB9IGZyb20gJy4vc2xpZGVyT3B0aW9ucyc7XG5cbmNsYXNzIE1haW5Nb2RlbCB7XG4gIHB1YmxpYyBvYnNlcnZlcjogRXZlbnRPYnNlcnZlcjtcbiAgcHJpdmF0ZSBfbWluID0gMDtcbiAgcHJpdmF0ZSBfbWF4ID0gMTAwO1xuICBwcml2YXRlIF9zdGVwID0gMTtcbiAgcHJpdmF0ZSBfdmFsdWVzID0gWzEwLCAyMF07XG4gIHByaXZhdGUgX2lzVmVydGljYWwgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfaGFzUmFuZ2UgPSB0cnVlO1xuICBwcml2YXRlIF9oYXNMYWJlbHMgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfaGFuZGxlcnM6IEhhbmRsZXJbXSA9IFtdO1xuICBjb25zdHJ1Y3RvcihzbGlkZXJPcHRpb25zOiBzbGlkZXJPcHRpb25zKSB7XG4gICAgdGhpcy5vYnNlcnZlciA9IG5ldyBFdmVudE9ic2VydmVyKCk7XG4gICAgdGhpcy5fbWluID0gc2xpZGVyT3B0aW9ucy5taW4gPyBzbGlkZXJPcHRpb25zLm1pbiA6IDA7XG4gICAgdGhpcy5fbWF4ID0gc2xpZGVyT3B0aW9ucy5tYXggPyBzbGlkZXJPcHRpb25zLm1heCA6IHRoaXMuX21heDtcbiAgICB0aGlzLl9zdGVwID0gc2xpZGVyT3B0aW9ucy5zdGVwID8gc2xpZGVyT3B0aW9ucy5zdGVwIDogdGhpcy5fc3RlcDtcbiAgICB0aGlzLl92YWx1ZXMgPSBzbGlkZXJPcHRpb25zLnZhbHVlcyA/IHNsaWRlck9wdGlvbnMudmFsdWVzIDogdGhpcy5fdmFsdWVzO1xuICAgIHRoaXMuX2hhc1JhbmdlID0gc2xpZGVyT3B0aW9ucy5oYXNSYW5nZSA/IHNsaWRlck9wdGlvbnMuaGFzUmFuZ2UgOiB0aGlzLl9oYXNSYW5nZTtcbiAgICB0aGlzLl9pc1ZlcnRpY2FsID0gc2xpZGVyT3B0aW9ucy5pc1ZlcnRpY2FsID8gc2xpZGVyT3B0aW9ucy5pc1ZlcnRpY2FsIDogdGhpcy5faXNWZXJ0aWNhbDtcbiAgICB0aGlzLl9oYXNMYWJlbHMgPSBzbGlkZXJPcHRpb25zLmhhc0xhYmVscyA/IHNsaWRlck9wdGlvbnMuaGFzTGFiZWxzIDogdGhpcy5faGFzTGFiZWxzO1xuICB9XG5cbiAgbm90aWZ5UHJlc250ZXIodmFsdWVEYXRhOiBzbGlkZXJPcHRpb25zKSB7XG4gICAgdGhpcy5vYnNlcnZlci5icm9hZGNhc3QodmFsdWVEYXRhKTtcbiAgfVxuXG4gIGdldCBtaW4oKTogbnVtYmVyIHtcbiAgICB0aGlzLl9taW4gPSBNYXRoLnJvdW5kKHRoaXMuX21pbiAvIHRoaXMuX3N0ZXApICogdGhpcy5fc3RlcDtcbiAgICByZXR1cm4gdGhpcy5fbWluO1xuICB9XG5cbiAgc2V0IG1pbihtaW46IG51bWJlcikge1xuICAgIHRoaXMuX21pbiA9IG1pbjtcbiAgfVxuXG4gIGdldCBtYXgoKTogbnVtYmVyIHtcbiAgICB0aGlzLl9tYXggPSBNYXRoLnJvdW5kKHRoaXMuX21heCAvIHRoaXMuX3N0ZXApICogdGhpcy5fc3RlcDtcbiAgICByZXR1cm4gdGhpcy5fbWF4O1xuICB9XG5cbiAgc2V0IG1heChtYXg6IG51bWJlcikge1xuICAgIHRoaXMuX21heCA9IG1heDtcbiAgfVxuXG4gIGdldCBzdGVwKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3N0ZXA7XG4gIH1cblxuICBzZXQgc3RlcChzdGVwOiBudW1iZXIpIHtcbiAgICB0aGlzLl9zdGVwID0gc3RlcDtcbiAgfVxuXG4gIGdldCBzaW5nbGVWYWx1ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNhbGNWYWx1ZXModGhpcy5fdmFsdWVzKVswXTtcbiAgfVxuXG4gIHNldCBzaW5nbGVWYWx1ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fdmFsdWVzWzBdID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcmFuZ2VWYWx1ZSgpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIHRoaXMuY2FsY1ZhbHVlcyh0aGlzLl92YWx1ZXMpO1xuICB9XG5cbiAgc2V0IHJhbmdlVmFsdWUodmFsdWVzOiBudW1iZXJbXSkge1xuICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlcztcbiAgICB0aGlzLm5vdGlmeVByZXNudGVyKHtcbiAgICAgIHZhbHVlczogdGhpcy5jYWxjVmFsdWVzKHRoaXMuX3ZhbHVlcyksXG4gICAgfSk7XG4gIH1cblxuICBnZXQgaXNWZXJ0aWNhbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNWZXJ0aWNhbDtcbiAgfVxuXG4gIHNldCBpc1ZlcnRpY2FsKHZlcnRpY2FsOiBib29sZWFuKSB7XG4gICAgdGhpcy5faXNWZXJ0aWNhbCA9IHZlcnRpY2FsO1xuICB9XG5cbiAgZ2V0IGhhc1JhbmdlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oYXNSYW5nZTtcbiAgfVxuXG4gIHNldCBoYXNSYW5nZShyYW5nZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2hhc1JhbmdlID0gcmFuZ2U7XG4gIH1cblxuICAvLyBnZXQgaW5pdGlhbCBjb29yZGluYXRlcyBvZiBhbnkgZWxlbWVudCwgZGVwZW5kaW5nIG9uIGRpbWVuc2lvblxuICBnZXRDb29yZHMoZWxlbTogSFRNTEVsZW1lbnQpOiBvYmplY3Qge1xuICAgIGNvbnN0IGJveCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgaWYgKHRoaXMuX2lzVmVydGljYWwpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHg6IGJveC5sZWZ0ICsgcGFnZVhPZmZzZXQsXG4gICAgICAgIHk6IGJveC5ib3R0b20gKyBwYWdlWU9mZnNldCxcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHg6IGJveC5sZWZ0ICsgcGFnZVhPZmZzZXQsXG4gICAgICAgIHk6IGJveC50b3AgKyBwYWdlWE9mZnNldCxcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgLy9jaGVjayB0aGF0IHZhbHVlcyBvZiBoYW5kbGVycyBhcmUgd2l0aGluIG1pbiBhbmQgbWF4XG4gIC8vY2hlY2sgdGhhdCB2YWx1ZSAwIGlzIGxlc3MgdGhhbiB2YWx1ZSAxIGZvciByYW5nZVxuICBjYWxjVmFsdWVzKHZhbHVlczogbnVtYmVyW10pOiBudW1iZXJbXSB7XG4gICAgdGhpcy5fdmFsdWVzLm1hcCh2YWx1ZSA9PiBNYXRoLnJvdW5kKHZhbHVlIC8gdGhpcy5fc3RlcCkgKiB0aGlzLl9zdGVwKTtcbiAgICB2YWx1ZXMubWFwKHZhbHVlID0+ICh2YWx1ZSA8IHRoaXMuX21pbiA/IHRoaXMuX21pbiA6IHZhbHVlID4gdGhpcy5fbWF4ID8gdGhpcy5fbWF4IDogdmFsdWUpKTtcbiAgICBpZiAodmFsdWVzWzBdID09PSB2YWx1ZXNbMV0pIHZhbHVlc1sxXSArPSB0aGlzLl9zdGVwO1xuICAgIGlmICh2YWx1ZXNbMF0gPiB2YWx1ZXNbMV0pIFt2YWx1ZXNbMF0sIHZhbHVlc1sxXV0gPSBbdmFsdWVzWzFdLCB2YWx1ZXNbMF1dO1xuICAgIHJldHVybiB2YWx1ZXM7XG4gIH1cbiAgLy9jcmVhdGUgaGFuZGxlcnMgZGVwZW5kaW5nIG9uIHJhbmdlXG4gIHNldEhhbmRsZXJzKHZhbHVlczogbnVtYmVyW10pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faGFzUmFuZ2UpIHtcbiAgICAgIHRoaXMuX2hhbmRsZXJzID0gW25ldyBIYW5kbGVyKHZhbHVlc1swXSksIG5ldyBIYW5kbGVyKHZhbHVlc1sxXSldO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oYW5kbGVycyA9IFtuZXcgSGFuZGxlcih2YWx1ZXNbMF0pXTtcbiAgICB9XG4gIH1cblxuICAvL3NldCBsaW1pdHMgb2YgYSBzbGlkZXIgaW4gdGVybXMgb2YgcHggdG8gY29udHJvbCBoYW5kbGVyIG1vdmVtZW50XG4gIHNldExpbWl0cyhzbGlkZXJCb2R5OiBIVE1MRWxlbWVudCwgaGFuZGxlcjogSFRNTEVsZW1lbnQpOiBvYmplY3Qge1xuICAgIGlmICh0aGlzLl9pc1ZlcnRpY2FsKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtaW5MaW1pdDogMCxcbiAgICAgICAgbWF4TGltaXQ6IHNsaWRlckJvZHkub2Zmc2V0SGVpZ2h0IC0gaGFuZGxlci5vZmZzZXRIZWlnaHQsXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtaW5MaW1pdDogMCxcbiAgICAgICAgbWF4TGltaXQ6IHNsaWRlckJvZHkub2Zmc2V0V2lkdGggLSBoYW5kbGVyLm9mZnNldFdpZHRoLFxuICAgICAgfTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgTWFpbk1vZGVsIH07XG4iLCJjbGFzcyBIYW5kbGVyIHtcbiAgcHJpdmF0ZSBfcG9zaXRpb246IG51bWJlcjtcbiAgY29uc3RydWN0b3IocG9zaXRpb246IG51bWJlcikge1xuICAgIHRoaXMuX3Bvc2l0aW9uID0gcG9zaXRpb247XG4gIH1cblxuICBnZXQgcG9zaXRpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XG4gIH1cblxuICBzZXQgcG9zaXRpb24odmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3Bvc2l0aW9uID0gdmFsdWU7XG4gIH1cbn1cblxuZXhwb3J0IHsgSGFuZGxlciB9O1xuIiwiY2xhc3MgRXZlbnRPYnNlcnZlciB7XG4gIHByaXZhdGUgX29ic2VydmVyczogRnVuY3Rpb25bXTtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fb2JzZXJ2ZXJzID0gW107XG4gIH1cbiAgc3Vic2NyaWJlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMuX29ic2VydmVycy5wdXNoKGZuKTtcbiAgfVxuICB1bnN1YnNjcmliZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLl9vYnNlcnZlcnMgPSB0aGlzLl9vYnNlcnZlcnMuZmlsdGVyKHN1YnNjcmliZXIgPT4gc3Vic2NyaWJlciAhPT0gZm4pO1xuICB9XG4gIGJyb2FkY2FzdChkYXRhOiBvYmplY3QpOiB2b2lkIHtcbiAgICB0aGlzLl9vYnNlcnZlcnMuZm9yRWFjaChzdWJzY3JpYmVyID0+IHN1YnNjcmliZXIoZGF0YSkpO1xuICB9XG59XG5cbmV4cG9ydCB7IEV2ZW50T2JzZXJ2ZXIgfTtcbiIsImltcG9ydCB7IE1haW5Nb2RlbCB9IGZyb20gJy4uL21vZGVsL01haW5Nb2RlbCc7XG5pbXBvcnQgeyBQcmVzZW50ZXIgfSBmcm9tICcuL1ByZXNlbnRlcic7XG5pbXBvcnQgeyBzbGlkZXJPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWwvc2xpZGVyT3B0aW9ucyc7XG5cbmNsYXNzIEZhY2FkZSB7XG4gIHByaXZhdGUgX21vZGVsOiBNYWluTW9kZWw7XG4gIHByaXZhdGUgX3ByZXNlbnRlcjogUHJlc2VudGVyO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmVudDogSFRNTEVsZW1lbnQsIHNsaWRlck9wdGlvbnM6IHNsaWRlck9wdGlvbnMpIHtcbiAgICB0aGlzLl9tb2RlbCA9IG5ldyBNYWluTW9kZWwoc2xpZGVyT3B0aW9ucyk7XG4gICAgdGhpcy5fcHJlc2VudGVyID0gbmV3IFByZXNlbnRlcihwYXJlbnQsIHRoaXMuX21vZGVsKTtcbiAgICB0aGlzLl9wcmVzZW50ZXIuc2V0SGFuZGxlcnNQb3NpdGlvbigpO1xuICAgIHRoaXMuX3ByZXNlbnRlci5zZXRWYWx1ZXNUb0lucHV0cygpO1xuICAgIHRoaXMuX3ByZXNlbnRlci5zZXRTdGVwVG9JbnB1dCgpO1xuICB9XG5cbiAgZ2V0IHNpbmdsZVZhbHVlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLnNpbmdsZVZhbHVlO1xuICB9XG5cbiAgc2V0IHNpbmdsZVZhbHVlKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9tb2RlbC5zaW5nbGVWYWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHJhbmdlVmFsdWUoKTogbnVtYmVyW10ge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5yYW5nZVZhbHVlO1xuICB9XG5cbiAgc2V0IHJhbmdlVmFsdWUodmFsdWU6IG51bWJlcltdKSB7XG4gICAgdGhpcy5fbW9kZWwucmFuZ2VWYWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHN0ZXAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuc3RlcDtcbiAgfVxuXG4gIHNldCBzdGVwKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9tb2RlbC5zdGVwID0gdmFsdWU7XG4gIH1cblxuICBnZXQgaXNWZXJ0aWNhbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuaXNWZXJ0aWNhbDtcbiAgfVxuXG4gIHNldCBpc1ZlcnRpY2FsKHZlcnRpY2FsOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbW9kZWwuaXNWZXJ0aWNhbCA9IHZlcnRpY2FsO1xuICB9XG5cbiAgXG5cbn1cblxuZXhwb3J0IHsgRmFjYWRlIH07XG4iLCJpbXBvcnQgeyBNYWluTW9kZWwgfSBmcm9tICcuLi9tb2RlbC9NYWluTW9kZWwnO1xuaW1wb3J0IHsgTWFpblZpZXcgfSBmcm9tICcuLi92aWV3L01haW5WaWV3JztcbmltcG9ydCB7IHNsaWRlck9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbC9zbGlkZXJPcHRpb25zJztcblxuY2xhc3MgUHJlc2VudGVyIHtcbiAgcHJpdmF0ZSBfbW9kZWw6IE1haW5Nb2RlbDtcbiAgcHJpdmF0ZSBfdmlldzogTWFpblZpZXc7XG4gIHByaXZhdGUgX3ZhbHVlczogbnVtYmVyW107XG5cbiAgY29uc3RydWN0b3IocGFyZW50OiBIVE1MRWxlbWVudCwgbW9kZWw6IE1haW5Nb2RlbCkge1xuICAgIHRoaXMuX21vZGVsID0gbW9kZWw7XG4gICAgdGhpcy5fdmFsdWVzID0gdGhpcy5fbW9kZWwucmFuZ2VWYWx1ZTtcbiAgICB0aGlzLl92aWV3ID0gbmV3IE1haW5WaWV3KFxuICAgICAgcGFyZW50LFxuICAgICAgdGhpcy5fbW9kZWwuaGFzUmFuZ2UsXG4gICAgICB0aGlzLl9tb2RlbC5pc1ZlcnRpY2FsLFxuICAgICAgdGhpcy5fbW9kZWwubWluLFxuICAgICAgdGhpcy5fbW9kZWwubWF4LFxuICAgICAgdGhpcy5fdmFsdWVzLFxuICAgICAgdGhpcy5fbW9kZWwuc3RlcFxuICAgICk7XG4gICAgdGhpcy51cGRhdGVNb2RlbCgpO1xuICAgIHRoaXMudXBkYXRlVmlldygpO1xuICBcbiAgfVxuXG4gIHVwZGF0ZU1vZGVsKCkge1xuICAgIHRoaXMuX3ZpZXcub2JzZXJ2ZXIuc3Vic2NyaWJlKCh2YWx1ZURhdGE6IHNsaWRlck9wdGlvbnMpPT57XG4gICAgICBpZiAodmFsdWVEYXRhLnZhbHVlcykgdGhpcy5fbW9kZWwucmFuZ2VWYWx1ZSA9IHZhbHVlRGF0YS52YWx1ZXM7XG4gICAgICBpZiAodmFsdWVEYXRhLmlzVmVydGljYWwpIHRoaXMuX21vZGVsLmlzVmVydGljYWwgPSB2YWx1ZURhdGEuaXNWZXJ0aWNhbDtcbiAgICAgfSk7XG4gICBcbiAgfVxuXG4gIHVwZGF0ZVZpZXcoKSB7XG4gICAgdGhpcy5fbW9kZWwub2JzZXJ2ZXIuc3Vic2NyaWJlKCh2YWx1ZURhdGE6IHNsaWRlck9wdGlvbnMpPT57XG4gICAgICB0aGlzLl92aWV3LnVwZGF0ZSh2YWx1ZURhdGEpO1xuICAgICB9KTtcbiAgfVxuICBcblxuICBzZXRIYW5kbGVyc1Bvc2l0aW9uKCl7XG4gICAgdGhpcy5fdmlldy5zZXRIYW5kbGVyUG9zaXRpb24oKTtcbiAgfVxuXG4gIHNldFZhbHVlc1RvSW5wdXRzKCkge1xuICAgIHRoaXMuX3ZpZXcuc2V0VmFsdWVzVG9JbnB1dHMoKTtcbiAgIH1cbiAgIFxuICAgc2V0U3RlcFRvSW5wdXQoKSB7XG4gICAgIHRoaXMuX3ZpZXcuc2V0U3RlcFRvSW5wdXQoKTtcbiAgIH1cbiAgXG4gIFxuXG59XG5cbmV4cG9ydCB7IFByZXNlbnRlciB9O1xuIiwiY2xhc3MgQ29udHJvbFBhbmVsIHtcbiAgcHJpdmF0ZSBfcGFyZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfY29udHJvbFBhbmVsOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfdmFsdWVJbnB1dHM6IEhUTUxJbnB1dEVsZW1lbnRbXTtcbiAgcHJpdmF0ZSBfc3RlcElucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuICBwcml2YXRlIF9vcmllbnRhdGlvblJhZGlvczogSFRNTElucHV0RWxlbWVudFtdO1xuICBwcml2YXRlIF9oYXNSYW5nZTogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfaXNWZXJ0aWNhbDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihwYXJlbnQ6IEhUTUxFbGVtZW50LCBoYXNSYW5nZTogYm9vbGVhbiwgaXNWZXJ0aWNhbDogYm9vbGVhbikge1xuICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuY2xhc3NMaXN0LmFkZCgnY29udHJvbFBhbmVsJyk7XG4gICAgdGhpcy5fcGFyZW50LmFmdGVyKHRoaXMuX2NvbnRyb2xQYW5lbCk7XG4gICAgdGhpcy5fdmFsdWVJbnB1dHMgPSBbXTtcbiAgICB0aGlzLl9zdGVwSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRoaXMuX29yaWVudGF0aW9uUmFkaW9zID0gW107XG4gICAgdGhpcy5faGFzUmFuZ2UgPSBoYXNSYW5nZTtcbiAgICB0aGlzLl9pc1ZlcnRpY2FsID0gaXNWZXJ0aWNhbDtcbiAgICB0aGlzLmNyZWF0ZVZhbHVlSW5wdXRzKCk7XG4gICAgdGhpcy5jcmVhdGVTdGVwSW5wdXQoKTtcbiAgICB0aGlzLmNyZWF0ZU9yaWVudGF0aW9uUmFkaW9zKCk7XG4gIH1cbiAgY3JlYXRlVmFsdWVJbnB1dHMoKSB7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZCh0aXRsZSk7XG4gICAgdGl0bGUuaW5uZXJUZXh0ID0gJ9CX0L3QsNGH0LXQvdC40LUg0LHQtdCz0YPQvdC60L7Qsic7XG4gICAgY29uc3QgaW5wdXRTaW5nbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGlucHV0U2luZ2xlLmNsYXNzTGlzdC5hZGQoJ2hhbmRsZXJWYWx1ZScpO1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQoaW5wdXRTaW5nbGUpO1xuICAgIHRoaXMuX3ZhbHVlSW5wdXRzLnB1c2goaW5wdXRTaW5nbGUpO1xuICAgIGlmICh0aGlzLl9oYXNSYW5nZSkge1xuICAgICAgY29uc3QgaW5wdXRNaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGFuZGxlclZhbHVlJyk7XG4gICAgICBpZiAoaW5wdXRNaW4pIGlucHV0TWluLmNsYXNzTGlzdC5hZGQoJ3ZhbHVlX21pbicpO1xuICAgICAgY29uc3QgaW5wdXRNYXggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgaW5wdXRNYXguY2xhc3NMaXN0LmFkZCgnaGFuZGxlclZhbHVlJywgJ3ZhbHVlX21heCcpO1xuICAgICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZChpbnB1dE1heCk7XG4gICAgICB0aGlzLl92YWx1ZUlucHV0cy5wdXNoKGlucHV0TWF4KTtcbiAgICB9XG4gIH1cbiAgZ2V0IHZhbHVlSW5wdXRzKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZUlucHV0cztcbiAgfVxuXG4gIGNyZWF0ZVN0ZXBJbnB1dCgpIHtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKHRpdGxlKTtcbiAgICB0aXRsZS5pbm5lclRleHQgPSAn0JfQvdCw0YfQtdC90LjQtSDRiNCw0LPQsCc7XG4gICAgdGhpcy5fc3RlcElucHV0LmNsYXNzTGlzdC5hZGQoJ3N0ZXBWYWx1ZScpO1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQodGhpcy5fc3RlcElucHV0KTtcbiAgfVxuXG4gIGdldCBzdGVwSW5wdXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0ZXBJbnB1dDtcbiAgfVxuXG4gIGNyZWF0ZU9yaWVudGF0aW9uUmFkaW9zKCkge1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQodGl0bGUpO1xuICAgIHRpdGxlLmlubmVyVGV4dCA9ICfQktC10YDRgtC40LrQsNC70YzQvdGL0Lkv0LPQvtGA0LjQt9C+0L3RgtCw0LvRjNC90YvQuSc7XG4gICAgY29uc3QgcmFkaW9WZXJ0aWNhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgcmFkaW9WZXJ0aWNhbC5pZCA9ICdyYWRpb192ZXJ0aWNhbCc7XG4gICAgY29uc3QgcmFkaW9Ib3Jpem9udGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICByYWRpb0hvcml6b250YWwuaWQgPSAncmFkaW9faG9yaXpvbnRhbCc7XG4gICAgdGhpcy5fb3JpZW50YXRpb25SYWRpb3MgPSBbcmFkaW9WZXJ0aWNhbCwgcmFkaW9Ib3Jpem9udGFsXTtcbiAgICB0aGlzLl9vcmllbnRhdGlvblJhZGlvcy5mb3JFYWNoKHJhZGlvID0+IHtcbiAgICAgIHJhZGlvLnR5cGUgPSAncmFkaW8nO1xuICAgICAgcmFkaW8ubmFtZSA9ICdvcmllbnRhdGlvbic7XG4gICAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKHJhZGlvKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBvcmllbnRhdGlvblJhZGlvcygpIHtcbiAgICByZXR1cm4gdGhpcy5fb3JpZW50YXRpb25SYWRpb3M7XG4gIH1cbn1cblxuZXhwb3J0IHsgQ29udHJvbFBhbmVsIH07XG4iLCJjbGFzcyBIYW5kbGVyVmlldyB7XG4gIHByaXZhdGUgX2hhbmRsZXI6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9wYXJlbnQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9pc1ZlcnRpY2FsOiBib29sZWFuO1xuICBwcml2YXRlIF9taW5MaW1pdDogbnVtYmVyO1xuICBwcml2YXRlIF9tYXhMaW1pdDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmVudDogSFRNTEVsZW1lbnQsIGlzVmVydGljYWw6IGJvb2xlYW4sIG1pbkxpbWl0OiBudW1iZXIsIG1heExpbWl0OiBudW1iZXIpIHtcbiAgICB0aGlzLl9oYW5kbGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5faGFuZGxlci5jbGFzc0xpc3QuYWRkKCdoYW5kbGVyJyk7XG4gICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgIHRoaXMuX3BhcmVudC5hcHBlbmRDaGlsZCh0aGlzLl9oYW5kbGVyKTtcbiAgICB0aGlzLl9pc1ZlcnRpY2FsID0gaXNWZXJ0aWNhbDtcbiAgICB0aGlzLl9taW5MaW1pdCA9IG1pbkxpbWl0O1xuICAgIHRoaXMuX21heExpbWl0ID0gbWF4TGltaXQ7XG4gIH1cblxuICBzZXRQb3NpdGlvbih2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWVzQ291bnQgPSB0aGlzLl9tYXhMaW1pdCAtIHRoaXMuX21pbkxpbWl0O1xuICAgIGNvbnN0IHBvc2l0aW9uUHJvcGVydHkgPSB0aGlzLl9pc1ZlcnRpY2FsID8gJ2JvdHRvbScgOiAnbGVmdCc7XG4gICAgY29uc3QgaGFuZGxlclNpemUgPSB0aGlzLl9pc1ZlcnRpY2FsXG4gICAgICA/ICh0aGlzLl9oYW5kbGVyLm9mZnNldEhlaWdodCAvIHRoaXMuX3BhcmVudC5vZmZzZXRIZWlnaHQpICogMTAwXG4gICAgICA6ICh0aGlzLl9oYW5kbGVyLm9mZnNldFdpZHRoIC8gdGhpcy5fcGFyZW50Lm9mZnNldFdpZHRoKSAqIDEwMDtcbiAgICBjb25zdCBwb3NpdGlvbiA9ICgodmFsdWUgLSB0aGlzLl9taW5MaW1pdCkgLyB2YWx1ZXNDb3VudCkgKiAxMDAgLSBoYW5kbGVyU2l6ZSAvIDI7XG4gICAgdGhpcy5faGFuZGxlci5zdHlsZVtwb3NpdGlvblByb3BlcnR5XSA9IGAke3Bvc2l0aW9ufSVgO1xuICB9XG59XG5cbmV4cG9ydCB7IEhhbmRsZXJWaWV3IH07XG4iLCJpbXBvcnQgeyBIYW5kbGVyVmlldyB9IGZyb20gJy4vSGFuZGxlclZpZXcnO1xuaW1wb3J0IHsgQ29udHJvbFBhbmVsIH0gZnJvbSAnLi9Db250cm9sUGFuZWxWaWV3JztcbmltcG9ydCB7IEV2ZW50T2JzZXJ2ZXIgfSBmcm9tICcuLi9vYnNlcnZlci9vYnNlcnZlcic7XG5pbXBvcnQgeyBzbGlkZXJPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWwvc2xpZGVyT3B0aW9ucyc7XG5cbmNsYXNzIE1haW5WaWV3IHtcbiAgcHVibGljIG9ic2VydmVyOiBFdmVudE9ic2VydmVyO1xuICBwcml2YXRlIF9zbGlkZXJCb2R5OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfcGFyZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfc2VsZWN0ZWRSYW5nZTogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX2hhbmRsZXJzOiBIYW5kbGVyVmlld1tdO1xuICBwcml2YXRlIF9taW46IG51bWJlcjtcbiAgcHJpdmF0ZSBfbWF4OiBudW1iZXI7XG4gIHByaXZhdGUgX3ZhbHVlczogbnVtYmVyW107XG4gIHByaXZhdGUgX2NvbnRyb2xQYW5lbDogQ29udHJvbFBhbmVsO1xuICBwcml2YXRlIF9zdGVwOiBudW1iZXI7XG4gIHByaXZhdGUgX2lzVmVydGljYWw6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcGFyZW50OiBIVE1MRWxlbWVudCxcbiAgICBoYXNSYW5nZTogYm9vbGVhbixcbiAgICBpc1ZlcnRpY2FsOiBib29sZWFuLFxuICAgIG1pbjogbnVtYmVyLFxuICAgIG1heDogbnVtYmVyLFxuICAgIHZhbHVlczogbnVtYmVyW10sXG4gICAgc3RlcDogbnVtYmVyLFxuICApIHtcbiAgICB0aGlzLm9ic2VydmVyID0gbmV3IEV2ZW50T2JzZXJ2ZXIoKTtcbiAgICB0aGlzLl9taW4gPSBtaW47XG4gICAgdGhpcy5fbWF4ID0gbWF4O1xuICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlcztcbiAgICB0aGlzLl9zdGVwID0gc3RlcDtcbiAgICB0aGlzLl9pc1ZlcnRpY2FsID0gaXNWZXJ0aWNhbDtcbiAgICB0aGlzLl9zbGlkZXJCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fc2xpZGVyQm9keS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJCb2R5Jyk7XG4gICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgIHRoaXMuX3BhcmVudC5hcHBlbmRDaGlsZCh0aGlzLl9zbGlkZXJCb2R5KTtcbiAgICB0aGlzLl9oYW5kbGVycyA9IGhhc1JhbmdlXG4gICAgICA/IFtcbiAgICAgICAgICBuZXcgSGFuZGxlclZpZXcodGhpcy5fc2xpZGVyQm9keSwgaXNWZXJ0aWNhbCwgbWluLCBtYXgpLFxuICAgICAgICAgIG5ldyBIYW5kbGVyVmlldyh0aGlzLl9zbGlkZXJCb2R5LCBpc1ZlcnRpY2FsLCBtaW4sIG1heCksXG4gICAgICAgIF1cbiAgICAgIDogW25ldyBIYW5kbGVyVmlldyh0aGlzLl9zbGlkZXJCb2R5LCBpc1ZlcnRpY2FsLCBtaW4sIG1heCldO1xuICAgIHRoaXMuX3NlbGVjdGVkUmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9zbGlkZXJCb2R5LmFwcGVuZENoaWxkKHRoaXMuX3NlbGVjdGVkUmFuZ2UpO1xuICAgIHRoaXMuX3NlbGVjdGVkUmFuZ2UuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWRSYW5nZScpO1xuICAgIGlmIChpc1ZlcnRpY2FsKSB7XG4gICAgICB0aGlzLl9wYXJlbnQuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX3ZlcnRpY2FsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3BhcmVudC5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfaG9yaXpvbnRhbCcpO1xuICAgIH1cbiAgICBpZiAoaGFzUmFuZ2UpIHRoaXMuX3NlbGVjdGVkUmFuZ2UuY2xhc3NMaXN0LmFkZCgncmFuZ2VfYmV0d2VlbicpO1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbCA9IG5ldyBDb250cm9sUGFuZWwodGhpcy5fcGFyZW50LCBoYXNSYW5nZSwgaXNWZXJ0aWNhbCk7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLnZhbHVlSW5wdXRzLmZvckVhY2goaW5wdXQgPT5cbiAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcy5ub3RpZnlQcmVzZW50ZXIuYmluZCh0aGlzKSksXG4gICAgKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwub3JpZW50YXRpb25SYWRpb3MuZm9yRWFjaChyYWRpbyA9PlxuICAgICAgcmFkaW8uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5ub3RpZnlQcmVzZW50ZXIuYmluZCh0aGlzKSksXG4gICAgKTtcbiAgICB0aGlzLnNldE9yaWVudGF0aW9uVG9SYWRpbygpO1xuICB9XG5cbiAgbm90aWZ5UHJlc2VudGVyKCkge1xuICAgIGNvbnN0IG5ld1ZhbHVlcyA9IHRoaXMuX2NvbnRyb2xQYW5lbC52YWx1ZUlucHV0cy5tYXAoaW5wdXQgPT4gcGFyc2VJbnQoaW5wdXQudmFsdWUpKTtcbiAgICBjb25zdCBuZXdPcmllbnRhdGlvbiA9IHRoaXMuX2NvbnRyb2xQYW5lbC5vcmllbnRhdGlvblJhZGlvc1swXS5jaGVja2VkID09IHRydWU7XG5cbiAgICB0aGlzLm9ic2VydmVyLmJyb2FkY2FzdCh7XG4gICAgICB2YWx1ZXM6IG5ld1ZhbHVlcyxcbiAgICAgIGlzVmVydGljYWw6IG5ld09yaWVudGF0aW9uLFxuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlKHZhbHVlRGF0YTogc2xpZGVyT3B0aW9ucykge1xuICAgIHRoaXMuX2hhbmRsZXJzLmZvckVhY2goKGhhbmRsZXIsIGluZGV4KSA9PiB7XG4gICAgICBpZiAodmFsdWVEYXRhLnZhbHVlcykgaGFuZGxlci5zZXRQb3NpdGlvbih2YWx1ZURhdGEudmFsdWVzW2luZGV4XSk7XG4gICAgfSk7XG4gICAgaWYgKHZhbHVlRGF0YS5pc1ZlcnRpY2FsKSB0aGlzLl9pc1ZlcnRpY2FsID0gdmFsdWVEYXRhLmlzVmVydGljYWw7XG4gIH1cblxuICBzZXRIYW5kbGVyUG9zaXRpb24oKSB7XG4gICAgdGhpcy5faGFuZGxlcnMuZm9yRWFjaCgoaGFuZGxlciwgaW5kZXgpID0+IGhhbmRsZXIuc2V0UG9zaXRpb24odGhpcy5fdmFsdWVzW2luZGV4XSkpO1xuICB9XG5cbiAgc2V0VmFsdWVzVG9JbnB1dHMoKSB7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLnZhbHVlSW5wdXRzLm1hcChcbiAgICAgIChpbnB1dCwgaW5kZXgpID0+IChpbnB1dC52YWx1ZSA9IHRoaXMuX3ZhbHVlc1tpbmRleF0udG9TdHJpbmcoKSksXG4gICAgKTtcbiAgfVxuXG4gIHNldFN0ZXBUb0lucHV0KCkge1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5zdGVwSW5wdXQudmFsdWUgPSB0aGlzLl9zdGVwLnRvU3RyaW5nKCk7XG4gIH1cblxuICBzZXRPcmllbnRhdGlvblRvUmFkaW8oKSB7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLm9yaWVudGF0aW9uUmFkaW9zLm1hcCgocmFkaW8sIGluZGV4KSA9PlxuICAgICAgdGhpcy5faXNWZXJ0aWNhbFxuICAgICAgICA/ICh0aGlzLl9jb250cm9sUGFuZWwub3JpZW50YXRpb25SYWRpb3NbMF0uY2hlY2tlZCA9IHRydWUpXG4gICAgICAgIDogKHRoaXMuX2NvbnRyb2xQYW5lbC5vcmllbnRhdGlvblJhZGlvc1sxXS5jaGVja2VkID0gdHJ1ZSksXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgeyBNYWluVmlldyB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==