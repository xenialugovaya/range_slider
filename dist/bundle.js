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
        this._step = 5;
        this._values = [10, 20];
        this._isVertical = false;
        this._hasRange = false;
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
    notifyPresenter(valueData) {
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
        this.notifyPresenter({
            step: this._step,
            values: this.rangeValue,
        });
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
        this.notifyPresenter({
            values: this.calcValues(this._values),
        });
    }
    get isVertical() {
        return this._isVertical;
    }
    set isVertical(vertical) {
        this._isVertical = vertical;
        this.notifyPresenter({
            values: this.rangeValue,
            isVertical: this._isVertical,
        });
    }
    get hasRange() {
        return this._hasRange;
    }
    set hasRange(range) {
        this._hasRange = range;
    }
    //check that values of handlers are within min and max
    //check that value 0 is less than value 1 for range
    calcValues(values) {
        values = values.map(value => Math.round(value / this._step) * this._step);
        if (values[0] > values[1])
            [values[0], values[1]] = [values[1], values[0]];
        values = values.map(value => value < this._min ? this._min : value > this._max ? this._max : value);
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
            if (valueData.isVertical !== undefined)
                this._model.isVertical = valueData.isVertical;
            if (valueData.step)
                this._model.step = valueData.step;
        });
    }
    updateView() {
        this._model.observer.subscribe((valueData) => {
            this._view.update(valueData);
        });
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
    constructor(parent, minLimit, maxLimit) {
        this._handler = document.createElement('div');
        this._handler.classList.add('handler');
        this._parent = parent;
        this._parent.appendChild(this._handler);
        this._minLimit = minLimit;
        this._maxLimit = maxLimit;
    }
    setPosition(value, isVertical) {
        const valuesCount = this._maxLimit - this._minLimit;
        const positionProperty = isVertical ? 'bottom' : 'left';
        const handlerSize = isVertical
            ? (this._handler.offsetHeight / this._parent.offsetHeight) * 100
            : (this._handler.offsetWidth / this._parent.offsetWidth) * 100;
        const position = ((value - this._minLimit) / valuesCount) * 100 - handlerSize / 2;
        this._handler.style[positionProperty] = `${position}%`;
    }
    get elem() {
        return this._handler;
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
        this._hasRange = hasRange;
        this._parent = parent;
        this._sliderBody = document.createElement('div');
        this._selectedRange = document.createElement('div');
        this._handlers = [];
        this._controlPanel = new _ControlPanelView__WEBPACK_IMPORTED_MODULE_1__["ControlPanel"](this._parent, hasRange, isVertical);
        this._controlPanel.valueInputs.forEach(input => input.addEventListener('input', this.notifyPresenter.bind(this)));
        this._controlPanel.stepInput.addEventListener('input', this.notifyPresenter.bind(this));
        this._controlPanel.orientationRadios.forEach(radio => radio.addEventListener('change', this.notifyPresenter.bind(this)));
        this.setSliderBody();
        this.setOrientation(this._isVertical);
        this.setHandlers(this._hasRange);
        this.setHandlerPosition(this._values, this._isVertical);
        this.setSelectedRange();
        this.updateSelectedRange();
        this.setOrientationToRadio();
        this.setStepToInput();
    }
    notifyPresenter() {
        const newValues = this._controlPanel.valueInputs.map(input => parseInt(input.value));
        const newOrientation = this._controlPanel.orientationRadios[0].checked ? true : false;
        const newStep = parseInt(this._controlPanel.stepInput.value);
        this.observer.broadcast({
            values: newValues,
            isVertical: newOrientation,
            step: newStep,
        });
    }
    update(valueData) {
        const isVertical = valueData.isVertical !== undefined ? valueData.isVertical : this._isVertical;
        this._values = valueData.values ? valueData.values : this._values;
        this.setOrientation(isVertical);
        this.setHandlerPosition(this._values, isVertical);
        this.updateSelectedRange();
        if (valueData.step)
            this._step = valueData.step;
    }
    setSliderBody() {
        this._sliderBody = document.createElement('div');
        this._sliderBody.classList.add('sliderBody');
        this._parent.appendChild(this._sliderBody);
    }
    setOrientation(isVertical) {
        this._isVertical = isVertical;
        if (isVertical) {
            this._parent.classList.remove('slider_horizontal');
            this._parent.classList.add('slider_vertical');
        }
        else {
            this._parent.classList.remove('slider_vertical');
            this._parent.classList.add('slider_horizontal');
        }
    }
    setHandlers(hasRange) {
        this._handlers.push(new _HandlerView__WEBPACK_IMPORTED_MODULE_0__["HandlerView"](this._sliderBody, this._min, this._max));
        if (hasRange) {
            this._handlers.push(new _HandlerView__WEBPACK_IMPORTED_MODULE_0__["HandlerView"](this._sliderBody, this._min, this._max));
            this._handlers[0].elem.id = 'handler_min';
            this._handlers[1].elem.id = 'handler_max';
        }
        this._handlers.forEach(handler => {
            handler.elem.addEventListener('mousedown', this.dragAndDrop.bind(this));
        });
    }
    getHandlers() {
        return this._handlers;
    }
    setHandlerPosition(values, isVertical) {
        this._handlers.forEach((handler, index) => handler.setPosition(values[index], isVertical));
    }
    setSelectedRange() {
        this._selectedRange = document.createElement('div');
        this._sliderBody.appendChild(this._selectedRange);
        this._selectedRange.classList.add('selectedRange');
        if (this._hasRange) {
            this._selectedRange.classList.remove('selectedRange');
            this._selectedRange.classList.add('range_between');
            //  this._selectedRange.style[minPosition] = this.getCoords(this._handlers[0].elem).x + '%';
            //  this._selectedRange.style[maxPosition] = this.getCoords(this._handlers[1].elem).x + '%';
        }
    }
    updateSelectedRange() {
        this._isVertical
            ? (this._selectedRange.style.height =
                this.getCoords(this._sliderBody).y - this.getCoords(this._handlers[0].elem).y + 'px')
            : (this._selectedRange.style.width = this.getCoords(this._handlers[0].elem).x + 'px');
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
    dragAndDrop() {
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
    }
    onMouseMove() { }
    onMouseUp() { }
    getCoords(elem) {
        const box = elem.getBoundingClientRect();
        return {
            x: box.left + pageXOffset,
            y: box.bottom + pageYOffset,
        };
    }
}



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9tb2RlbC9NYWluTW9kZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVsL2hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29ic2VydmVyL29ic2VydmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9wcmVzZW50ZXIvRmFjYWRlLnRzIiwid2VicGFjazovLy8uL3NyYy9wcmVzZW50ZXIvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy92aWV3L0NvbnRyb2xQYW5lbFZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXcvSGFuZGxlclZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXcvTWFpblZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7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QixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFDRCxXQUFXLEtBQUksQ0FBQztJQUNoQixTQUFTLEtBQUksQ0FBQztJQUVkLFNBQVMsQ0FBQyxJQUFpQjtRQUN6QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUN6QyxPQUFPO1lBQ0wsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLEdBQUcsV0FBVztZQUN6QixDQUFDLEVBQUUsR0FBRyxDQUFDLE1BQU0sR0FBRyxXQUFXO1NBQzVCLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFFbUIiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBGYWNhZGUgfSBmcm9tICcuL3ByZXNlbnRlci9GYWNhZGUnO1xuXG4kKGZ1bmN0aW9uKCkge1xuICAkLmZuLnNsaWRlciA9IGZ1bmN0aW9uKG9wdGlvbnMpOiBGYWNhZGUge1xuICAgIGNvbnN0IGZhY2FkZTogRmFjYWRlID0gbmV3IEZhY2FkZSh0aGlzLmdldCgwKSwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIGZhY2FkZTtcbiAgfTtcbn0pO1xuIiwiaW1wb3J0IHsgRXZlbnRPYnNlcnZlciB9IGZyb20gJy4uL29ic2VydmVyL29ic2VydmVyJztcbmltcG9ydCB7IEhhbmRsZXIgfSBmcm9tICcuL2hhbmRsZXInO1xuaW1wb3J0IHsgc2xpZGVyT3B0aW9ucyB9IGZyb20gJy4vc2xpZGVyT3B0aW9ucyc7XG5cbmNsYXNzIE1haW5Nb2RlbCB7XG4gIHB1YmxpYyBvYnNlcnZlcjogRXZlbnRPYnNlcnZlcjtcbiAgcHJpdmF0ZSBfbWluID0gMDtcbiAgcHJpdmF0ZSBfbWF4ID0gMTAwO1xuICBwcml2YXRlIF9zdGVwID0gNTtcbiAgcHJpdmF0ZSBfdmFsdWVzID0gWzEwLCAyMF07XG4gIHByaXZhdGUgX2lzVmVydGljYWwgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfaGFzUmFuZ2UgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfaGFzTGFiZWxzID0gZmFsc2U7XG4gIHByaXZhdGUgX2hhbmRsZXJzOiBIYW5kbGVyW10gPSBbXTtcbiAgY29uc3RydWN0b3Ioc2xpZGVyT3B0aW9uczogc2xpZGVyT3B0aW9ucykge1xuICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgRXZlbnRPYnNlcnZlcigpO1xuICAgIHRoaXMuX21pbiA9IHNsaWRlck9wdGlvbnMubWluID8gc2xpZGVyT3B0aW9ucy5taW4gOiAwO1xuICAgIHRoaXMuX21heCA9IHNsaWRlck9wdGlvbnMubWF4ID8gc2xpZGVyT3B0aW9ucy5tYXggOiB0aGlzLl9tYXg7XG4gICAgdGhpcy5fc3RlcCA9IHNsaWRlck9wdGlvbnMuc3RlcCA/IHNsaWRlck9wdGlvbnMuc3RlcCA6IHRoaXMuX3N0ZXA7XG4gICAgdGhpcy5fdmFsdWVzID0gc2xpZGVyT3B0aW9ucy52YWx1ZXMgPyBzbGlkZXJPcHRpb25zLnZhbHVlcyA6IHRoaXMuX3ZhbHVlcztcbiAgICB0aGlzLl9oYXNSYW5nZSA9IHNsaWRlck9wdGlvbnMuaGFzUmFuZ2UgPyBzbGlkZXJPcHRpb25zLmhhc1JhbmdlIDogdGhpcy5faGFzUmFuZ2U7XG4gICAgdGhpcy5faXNWZXJ0aWNhbCA9IHNsaWRlck9wdGlvbnMuaXNWZXJ0aWNhbCA/IHNsaWRlck9wdGlvbnMuaXNWZXJ0aWNhbCA6IHRoaXMuX2lzVmVydGljYWw7XG4gICAgdGhpcy5faGFzTGFiZWxzID0gc2xpZGVyT3B0aW9ucy5oYXNMYWJlbHMgPyBzbGlkZXJPcHRpb25zLmhhc0xhYmVscyA6IHRoaXMuX2hhc0xhYmVscztcbiAgfVxuXG4gIG5vdGlmeVByZXNlbnRlcih2YWx1ZURhdGE6IHNsaWRlck9wdGlvbnMpIHtcbiAgICB0aGlzLm9ic2VydmVyLmJyb2FkY2FzdCh2YWx1ZURhdGEpO1xuICB9XG5cbiAgZ2V0IG1pbigpOiBudW1iZXIge1xuICAgIHRoaXMuX21pbiA9IE1hdGgucm91bmQodGhpcy5fbWluIC8gdGhpcy5fc3RlcCkgKiB0aGlzLl9zdGVwO1xuICAgIHJldHVybiB0aGlzLl9taW47XG4gIH1cblxuICBzZXQgbWluKG1pbjogbnVtYmVyKSB7XG4gICAgdGhpcy5fbWluID0gbWluO1xuICB9XG5cbiAgZ2V0IG1heCgpOiBudW1iZXIge1xuICAgIHRoaXMuX21heCA9IE1hdGgucm91bmQodGhpcy5fbWF4IC8gdGhpcy5fc3RlcCkgKiB0aGlzLl9zdGVwO1xuICAgIHJldHVybiB0aGlzLl9tYXg7XG4gIH1cblxuICBzZXQgbWF4KG1heDogbnVtYmVyKSB7XG4gICAgdGhpcy5fbWF4ID0gbWF4O1xuICB9XG5cbiAgZ2V0IHN0ZXAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc3RlcDtcbiAgfVxuXG4gIHNldCBzdGVwKHN0ZXA6IG51bWJlcikge1xuICAgIHRoaXMuX3N0ZXAgPSBzdGVwO1xuICAgIHRoaXMubm90aWZ5UHJlc2VudGVyKHtcbiAgICAgIHN0ZXA6IHRoaXMuX3N0ZXAsXG4gICAgICB2YWx1ZXM6IHRoaXMucmFuZ2VWYWx1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBzaW5nbGVWYWx1ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNhbGNWYWx1ZXModGhpcy5fdmFsdWVzKVswXTtcbiAgfVxuXG4gIHNldCBzaW5nbGVWYWx1ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fdmFsdWVzWzBdID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcmFuZ2VWYWx1ZSgpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIHRoaXMuY2FsY1ZhbHVlcyh0aGlzLl92YWx1ZXMpO1xuICB9XG5cbiAgc2V0IHJhbmdlVmFsdWUodmFsdWVzOiBudW1iZXJbXSkge1xuICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlcztcbiAgICB0aGlzLm5vdGlmeVByZXNlbnRlcih7XG4gICAgICB2YWx1ZXM6IHRoaXMuY2FsY1ZhbHVlcyh0aGlzLl92YWx1ZXMpLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0IGlzVmVydGljYWwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzVmVydGljYWw7XG4gIH1cblxuICBzZXQgaXNWZXJ0aWNhbCh2ZXJ0aWNhbDogYm9vbGVhbikge1xuICAgIHRoaXMuX2lzVmVydGljYWwgPSB2ZXJ0aWNhbDtcbiAgICB0aGlzLm5vdGlmeVByZXNlbnRlcih7XG4gICAgICB2YWx1ZXM6IHRoaXMucmFuZ2VWYWx1ZSxcbiAgICAgIGlzVmVydGljYWw6IHRoaXMuX2lzVmVydGljYWwsXG4gICAgfSk7XG4gIH1cblxuICBnZXQgaGFzUmFuZ2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2hhc1JhbmdlO1xuICB9XG5cbiAgc2V0IGhhc1JhbmdlKHJhbmdlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGFzUmFuZ2UgPSByYW5nZTtcbiAgfVxuXG4gIC8vY2hlY2sgdGhhdCB2YWx1ZXMgb2YgaGFuZGxlcnMgYXJlIHdpdGhpbiBtaW4gYW5kIG1heFxuICAvL2NoZWNrIHRoYXQgdmFsdWUgMCBpcyBsZXNzIHRoYW4gdmFsdWUgMSBmb3IgcmFuZ2VcbiAgY2FsY1ZhbHVlcyh2YWx1ZXM6IG51bWJlcltdKTogbnVtYmVyW10ge1xuICAgIHZhbHVlcyA9IHZhbHVlcy5tYXAodmFsdWUgPT4gTWF0aC5yb3VuZCh2YWx1ZSAvIHRoaXMuX3N0ZXApICogdGhpcy5fc3RlcCk7XG4gICAgaWYgKHZhbHVlc1swXSA+IHZhbHVlc1sxXSkgW3ZhbHVlc1swXSwgdmFsdWVzWzFdXSA9IFt2YWx1ZXNbMV0sIHZhbHVlc1swXV07XG4gICAgdmFsdWVzID0gdmFsdWVzLm1hcCh2YWx1ZSA9PlxuICAgICAgdmFsdWUgPCB0aGlzLl9taW4gPyB0aGlzLl9taW4gOiB2YWx1ZSA+IHRoaXMuX21heCA/IHRoaXMuX21heCA6IHZhbHVlLFxuICAgICk7XG5cbiAgICByZXR1cm4gdmFsdWVzO1xuICB9XG4gIC8vY3JlYXRlIGhhbmRsZXJzIGRlcGVuZGluZyBvbiByYW5nZVxuICBzZXRIYW5kbGVycyh2YWx1ZXM6IG51bWJlcltdKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2hhc1JhbmdlKSB7XG4gICAgICB0aGlzLl9oYW5kbGVycyA9IFtuZXcgSGFuZGxlcih2YWx1ZXNbMF0pLCBuZXcgSGFuZGxlcih2YWx1ZXNbMV0pXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGFuZGxlcnMgPSBbbmV3IEhhbmRsZXIodmFsdWVzWzBdKV07XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IE1haW5Nb2RlbCB9O1xuIiwiY2xhc3MgSGFuZGxlciB7XG4gIHByaXZhdGUgX3Bvc2l0aW9uOiBudW1iZXI7XG4gIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICB9XG5cbiAgZ2V0IHBvc2l0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uO1xuICB9XG5cbiAgc2V0IHBvc2l0aW9uKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IHZhbHVlO1xuICB9XG59XG5cbmV4cG9ydCB7IEhhbmRsZXIgfTtcbiIsImNsYXNzIEV2ZW50T2JzZXJ2ZXIge1xuICBwcml2YXRlIF9vYnNlcnZlcnM6IEZ1bmN0aW9uW107XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX29ic2VydmVycyA9IFtdO1xuICB9XG4gIHN1YnNjcmliZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLl9vYnNlcnZlcnMucHVzaChmbik7XG4gIH1cbiAgdW5zdWJzY3JpYmUoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fb2JzZXJ2ZXJzID0gdGhpcy5fb2JzZXJ2ZXJzLmZpbHRlcihzdWJzY3JpYmVyID0+IHN1YnNjcmliZXIgIT09IGZuKTtcbiAgfVxuICBicm9hZGNhc3QoZGF0YTogb2JqZWN0KTogdm9pZCB7XG4gICAgdGhpcy5fb2JzZXJ2ZXJzLmZvckVhY2goc3Vic2NyaWJlciA9PiBzdWJzY3JpYmVyKGRhdGEpKTtcbiAgfVxufVxuXG5leHBvcnQgeyBFdmVudE9ic2VydmVyIH07XG4iLCJpbXBvcnQgeyBNYWluTW9kZWwgfSBmcm9tICcuLi9tb2RlbC9NYWluTW9kZWwnO1xuaW1wb3J0IHsgUHJlc2VudGVyIH0gZnJvbSAnLi9QcmVzZW50ZXInO1xuaW1wb3J0IHsgc2xpZGVyT3B0aW9ucyB9IGZyb20gJy4uL21vZGVsL3NsaWRlck9wdGlvbnMnO1xuXG5jbGFzcyBGYWNhZGUge1xuICBwcml2YXRlIF9tb2RlbDogTWFpbk1vZGVsO1xuICBwcml2YXRlIF9wcmVzZW50ZXI6IFByZXNlbnRlcjtcblxuICBjb25zdHJ1Y3RvcihwYXJlbnQ6IEhUTUxFbGVtZW50LCBzbGlkZXJPcHRpb25zOiBzbGlkZXJPcHRpb25zKSB7XG4gICAgdGhpcy5fbW9kZWwgPSBuZXcgTWFpbk1vZGVsKHNsaWRlck9wdGlvbnMpO1xuICAgIHRoaXMuX3ByZXNlbnRlciA9IG5ldyBQcmVzZW50ZXIocGFyZW50LCB0aGlzLl9tb2RlbCk7XG4gICAgdGhpcy5fcHJlc2VudGVyLnNldFZhbHVlc1RvSW5wdXRzKCk7XG4gICAgdGhpcy5fcHJlc2VudGVyLnNldFN0ZXBUb0lucHV0KCk7XG4gIH1cblxuICBnZXQgc2luZ2xlVmFsdWUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuc2luZ2xlVmFsdWU7XG4gIH1cblxuICBzZXQgc2luZ2xlVmFsdWUodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX21vZGVsLnNpbmdsZVZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcmFuZ2VWYWx1ZSgpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLnJhbmdlVmFsdWU7XG4gIH1cblxuICBzZXQgcmFuZ2VWYWx1ZSh2YWx1ZTogbnVtYmVyW10pIHtcbiAgICB0aGlzLl9tb2RlbC5yYW5nZVZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBnZXQgc3RlcCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5zdGVwO1xuICB9XG5cbiAgc2V0IHN0ZXAodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX21vZGVsLnN0ZXAgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBpc1ZlcnRpY2FsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5pc1ZlcnRpY2FsO1xuICB9XG5cbiAgc2V0IGlzVmVydGljYWwodmVydGljYWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9tb2RlbC5pc1ZlcnRpY2FsID0gdmVydGljYWw7XG4gIH1cbn1cblxuZXhwb3J0IHsgRmFjYWRlIH07XG4iLCJpbXBvcnQgeyBNYWluTW9kZWwgfSBmcm9tICcuLi9tb2RlbC9NYWluTW9kZWwnO1xuaW1wb3J0IHsgTWFpblZpZXcgfSBmcm9tICcuLi92aWV3L01haW5WaWV3JztcbmltcG9ydCB7IHNsaWRlck9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbC9zbGlkZXJPcHRpb25zJztcblxuY2xhc3MgUHJlc2VudGVyIHtcbiAgcHJpdmF0ZSBfbW9kZWw6IE1haW5Nb2RlbDtcbiAgcHJpdmF0ZSBfdmlldzogTWFpblZpZXc7XG4gIHByaXZhdGUgX3ZhbHVlczogbnVtYmVyW107XG5cbiAgY29uc3RydWN0b3IocGFyZW50OiBIVE1MRWxlbWVudCwgbW9kZWw6IE1haW5Nb2RlbCkge1xuICAgIHRoaXMuX21vZGVsID0gbW9kZWw7XG4gICAgdGhpcy5fdmFsdWVzID0gdGhpcy5fbW9kZWwucmFuZ2VWYWx1ZTtcbiAgICB0aGlzLl92aWV3ID0gbmV3IE1haW5WaWV3KFxuICAgICAgcGFyZW50LFxuICAgICAgdGhpcy5fbW9kZWwuaGFzUmFuZ2UsXG4gICAgICB0aGlzLl9tb2RlbC5pc1ZlcnRpY2FsLFxuICAgICAgdGhpcy5fbW9kZWwubWluLFxuICAgICAgdGhpcy5fbW9kZWwubWF4LFxuICAgICAgdGhpcy5fdmFsdWVzLFxuICAgICAgdGhpcy5fbW9kZWwuc3RlcCxcbiAgICApO1xuICAgIHRoaXMudXBkYXRlTW9kZWwoKTtcbiAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgfVxuXG4gIHVwZGF0ZU1vZGVsKCkge1xuICAgIHRoaXMuX3ZpZXcub2JzZXJ2ZXIuc3Vic2NyaWJlKCh2YWx1ZURhdGE6IHNsaWRlck9wdGlvbnMpID0+IHtcbiAgICAgIGlmICh2YWx1ZURhdGEudmFsdWVzKSB0aGlzLl9tb2RlbC5yYW5nZVZhbHVlID0gdmFsdWVEYXRhLnZhbHVlcztcbiAgICAgIGlmICh2YWx1ZURhdGEuaXNWZXJ0aWNhbCAhPT0gdW5kZWZpbmVkKSB0aGlzLl9tb2RlbC5pc1ZlcnRpY2FsID0gdmFsdWVEYXRhLmlzVmVydGljYWw7XG4gICAgICBpZiAodmFsdWVEYXRhLnN0ZXApIHRoaXMuX21vZGVsLnN0ZXAgPSB2YWx1ZURhdGEuc3RlcDtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVZpZXcoKSB7XG4gICAgdGhpcy5fbW9kZWwub2JzZXJ2ZXIuc3Vic2NyaWJlKCh2YWx1ZURhdGE6IHNsaWRlck9wdGlvbnMpID0+IHtcbiAgICAgIHRoaXMuX3ZpZXcudXBkYXRlKHZhbHVlRGF0YSk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRWYWx1ZXNUb0lucHV0cygpIHtcbiAgICB0aGlzLl92aWV3LnNldFZhbHVlc1RvSW5wdXRzKCk7XG4gIH1cblxuICBzZXRTdGVwVG9JbnB1dCgpIHtcbiAgICB0aGlzLl92aWV3LnNldFN0ZXBUb0lucHV0KCk7XG4gIH1cbn1cblxuZXhwb3J0IHsgUHJlc2VudGVyIH07XG4iLCJjbGFzcyBDb250cm9sUGFuZWwge1xuICBwcml2YXRlIF9wYXJlbnQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9jb250cm9sUGFuZWw6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF92YWx1ZUlucHV0czogSFRNTElucHV0RWxlbWVudFtdO1xuICBwcml2YXRlIF9zdGVwSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gIHByaXZhdGUgX29yaWVudGF0aW9uUmFkaW9zOiBIVE1MSW5wdXRFbGVtZW50W107XG4gIHByaXZhdGUgX2hhc1JhbmdlOiBib29sZWFuO1xuICBwcml2YXRlIF9pc1ZlcnRpY2FsOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmVudDogSFRNTEVsZW1lbnQsIGhhc1JhbmdlOiBib29sZWFuLCBpc1ZlcnRpY2FsOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5jbGFzc0xpc3QuYWRkKCdjb250cm9sUGFuZWwnKTtcbiAgICB0aGlzLl9wYXJlbnQuYWZ0ZXIodGhpcy5fY29udHJvbFBhbmVsKTtcbiAgICB0aGlzLl92YWx1ZUlucHV0cyA9IFtdO1xuICAgIHRoaXMuX3N0ZXBJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgdGhpcy5fb3JpZW50YXRpb25SYWRpb3MgPSBbXTtcbiAgICB0aGlzLl9oYXNSYW5nZSA9IGhhc1JhbmdlO1xuICAgIHRoaXMuX2lzVmVydGljYWwgPSBpc1ZlcnRpY2FsO1xuICAgIHRoaXMuY3JlYXRlVmFsdWVJbnB1dHMoKTtcbiAgICB0aGlzLmNyZWF0ZVN0ZXBJbnB1dCgpO1xuICAgIHRoaXMuY3JlYXRlT3JpZW50YXRpb25SYWRpb3MoKTtcbiAgfVxuICBjcmVhdGVWYWx1ZUlucHV0cygpIHtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKHRpdGxlKTtcbiAgICB0aXRsZS5pbm5lclRleHQgPSAn0JfQvdCw0YfQtdC90LjQtSDQsdC10LPRg9C90LrQvtCyJztcbiAgICBjb25zdCBpbnB1dFNpbmdsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaW5wdXRTaW5nbGUuY2xhc3NMaXN0LmFkZCgnaGFuZGxlclZhbHVlJyk7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZChpbnB1dFNpbmdsZSk7XG4gICAgdGhpcy5fdmFsdWVJbnB1dHMucHVzaChpbnB1dFNpbmdsZSk7XG4gICAgaWYgKHRoaXMuX2hhc1JhbmdlKSB7XG4gICAgICBjb25zdCBpbnB1dE1pbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oYW5kbGVyVmFsdWUnKTtcbiAgICAgIGlmIChpbnB1dE1pbikgaW5wdXRNaW4uY2xhc3NMaXN0LmFkZCgndmFsdWVfbWluJyk7XG4gICAgICBjb25zdCBpbnB1dE1heCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICBpbnB1dE1heC5jbGFzc0xpc3QuYWRkKCdoYW5kbGVyVmFsdWUnLCAndmFsdWVfbWF4Jyk7XG4gICAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKGlucHV0TWF4KTtcbiAgICAgIHRoaXMuX3ZhbHVlSW5wdXRzLnB1c2goaW5wdXRNYXgpO1xuICAgIH1cbiAgfVxuICBnZXQgdmFsdWVJbnB1dHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlSW5wdXRzO1xuICB9XG5cbiAgY3JlYXRlU3RlcElucHV0KCkge1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQodGl0bGUpO1xuICAgIHRpdGxlLmlubmVyVGV4dCA9ICfQl9C90LDRh9C10L3QuNC1INGI0LDQs9CwJztcbiAgICB0aGlzLl9zdGVwSW5wdXQuY2xhc3NMaXN0LmFkZCgnc3RlcFZhbHVlJyk7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZCh0aGlzLl9zdGVwSW5wdXQpO1xuICB9XG5cbiAgZ2V0IHN0ZXBJbnB1dCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RlcElucHV0O1xuICB9XG5cbiAgY3JlYXRlT3JpZW50YXRpb25SYWRpb3MoKSB7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZCh0aXRsZSk7XG4gICAgdGl0bGUuaW5uZXJUZXh0ID0gJ9CS0LXRgNGC0LjQutCw0LvRjNC90YvQuS/Qs9C+0YDQuNC30L7QvdGC0LDQu9GM0L3Ri9C5JztcbiAgICBjb25zdCByYWRpb1ZlcnRpY2FsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICByYWRpb1ZlcnRpY2FsLmlkID0gJ3JhZGlvX3ZlcnRpY2FsJztcbiAgICBjb25zdCByYWRpb0hvcml6b250YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHJhZGlvSG9yaXpvbnRhbC5pZCA9ICdyYWRpb19ob3Jpem9udGFsJztcbiAgICB0aGlzLl9vcmllbnRhdGlvblJhZGlvcyA9IFtyYWRpb1ZlcnRpY2FsLCByYWRpb0hvcml6b250YWxdO1xuICAgIHRoaXMuX29yaWVudGF0aW9uUmFkaW9zLmZvckVhY2gocmFkaW8gPT4ge1xuICAgICAgcmFkaW8udHlwZSA9ICdyYWRpbyc7XG4gICAgICByYWRpby5uYW1lID0gJ29yaWVudGF0aW9uJztcbiAgICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQocmFkaW8pO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0IG9yaWVudGF0aW9uUmFkaW9zKCkge1xuICAgIHJldHVybiB0aGlzLl9vcmllbnRhdGlvblJhZGlvcztcbiAgfVxufVxuXG5leHBvcnQgeyBDb250cm9sUGFuZWwgfTtcbiIsImNsYXNzIEhhbmRsZXJWaWV3IHtcbiAgcHJpdmF0ZSBfaGFuZGxlcjogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX3BhcmVudDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX21pbkxpbWl0OiBudW1iZXI7XG4gIHByaXZhdGUgX21heExpbWl0OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IocGFyZW50OiBIVE1MRWxlbWVudCwgbWluTGltaXQ6IG51bWJlciwgbWF4TGltaXQ6IG51bWJlcikge1xuICAgIHRoaXMuX2hhbmRsZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9oYW5kbGVyLmNsYXNzTGlzdC5hZGQoJ2hhbmRsZXInKTtcbiAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5fcGFyZW50LmFwcGVuZENoaWxkKHRoaXMuX2hhbmRsZXIpO1xuICAgIHRoaXMuX21pbkxpbWl0ID0gbWluTGltaXQ7XG4gICAgdGhpcy5fbWF4TGltaXQgPSBtYXhMaW1pdDtcbiAgfVxuXG4gIHNldFBvc2l0aW9uKHZhbHVlOiBudW1iZXIsIGlzVmVydGljYWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZXNDb3VudCA9IHRoaXMuX21heExpbWl0IC0gdGhpcy5fbWluTGltaXQ7XG4gICAgY29uc3QgcG9zaXRpb25Qcm9wZXJ0eSA9IGlzVmVydGljYWwgPyAnYm90dG9tJyA6ICdsZWZ0JztcbiAgICBjb25zdCBoYW5kbGVyU2l6ZSA9IGlzVmVydGljYWxcbiAgICAgID8gKHRoaXMuX2hhbmRsZXIub2Zmc2V0SGVpZ2h0IC8gdGhpcy5fcGFyZW50Lm9mZnNldEhlaWdodCkgKiAxMDBcbiAgICAgIDogKHRoaXMuX2hhbmRsZXIub2Zmc2V0V2lkdGggLyB0aGlzLl9wYXJlbnQub2Zmc2V0V2lkdGgpICogMTAwO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gKCh2YWx1ZSAtIHRoaXMuX21pbkxpbWl0KSAvIHZhbHVlc0NvdW50KSAqIDEwMCAtIGhhbmRsZXJTaXplIC8gMjtcbiAgICB0aGlzLl9oYW5kbGVyLnN0eWxlW3Bvc2l0aW9uUHJvcGVydHldID0gYCR7cG9zaXRpb259JWA7XG4gIH1cblxuICBnZXQgZWxlbSgpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlcjtcbiAgfVxufVxuXG5leHBvcnQgeyBIYW5kbGVyVmlldyB9O1xuIiwiaW1wb3J0IHsgSGFuZGxlclZpZXcgfSBmcm9tICcuL0hhbmRsZXJWaWV3JztcbmltcG9ydCB7IENvbnRyb2xQYW5lbCB9IGZyb20gJy4vQ29udHJvbFBhbmVsVmlldyc7XG5pbXBvcnQgeyBFdmVudE9ic2VydmVyIH0gZnJvbSAnLi4vb2JzZXJ2ZXIvb2JzZXJ2ZXInO1xuaW1wb3J0IHsgc2xpZGVyT3B0aW9ucyB9IGZyb20gJy4uL21vZGVsL3NsaWRlck9wdGlvbnMnO1xuXG5jbGFzcyBNYWluVmlldyB7XG4gIHB1YmxpYyBvYnNlcnZlcjogRXZlbnRPYnNlcnZlcjtcbiAgcHJpdmF0ZSBfc2xpZGVyQm9keTogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX3BhcmVudDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX3NlbGVjdGVkUmFuZ2U6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9oYW5kbGVyczogSGFuZGxlclZpZXdbXTtcbiAgcHJpdmF0ZSBfbWluOiBudW1iZXI7XG4gIHByaXZhdGUgX21heDogbnVtYmVyO1xuICBwcml2YXRlIF92YWx1ZXM6IG51bWJlcltdO1xuICBwcml2YXRlIF9jb250cm9sUGFuZWw6IENvbnRyb2xQYW5lbDtcbiAgcHJpdmF0ZSBfc3RlcDogbnVtYmVyO1xuICBwcml2YXRlIF9pc1ZlcnRpY2FsOiBib29sZWFuO1xuICBwcml2YXRlIF9oYXNSYW5nZTogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwYXJlbnQ6IEhUTUxFbGVtZW50LFxuICAgIGhhc1JhbmdlOiBib29sZWFuLFxuICAgIGlzVmVydGljYWw6IGJvb2xlYW4sXG4gICAgbWluOiBudW1iZXIsXG4gICAgbWF4OiBudW1iZXIsXG4gICAgdmFsdWVzOiBudW1iZXJbXSxcbiAgICBzdGVwOiBudW1iZXIsXG4gICkge1xuICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgRXZlbnRPYnNlcnZlcigpO1xuICAgIHRoaXMuX21pbiA9IG1pbjtcbiAgICB0aGlzLl9tYXggPSBtYXg7XG4gICAgdGhpcy5fdmFsdWVzID0gdmFsdWVzO1xuICAgIHRoaXMuX3N0ZXAgPSBzdGVwO1xuICAgIHRoaXMuX2lzVmVydGljYWwgPSBpc1ZlcnRpY2FsO1xuICAgIHRoaXMuX2hhc1JhbmdlID0gaGFzUmFuZ2U7XG4gICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgIHRoaXMuX3NsaWRlckJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9zZWxlY3RlZFJhbmdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5faGFuZGxlcnMgPSBbXTtcblxuICAgIHRoaXMuX2NvbnRyb2xQYW5lbCA9IG5ldyBDb250cm9sUGFuZWwodGhpcy5fcGFyZW50LCBoYXNSYW5nZSwgaXNWZXJ0aWNhbCk7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLnZhbHVlSW5wdXRzLmZvckVhY2goaW5wdXQgPT5cbiAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcy5ub3RpZnlQcmVzZW50ZXIuYmluZCh0aGlzKSksXG4gICAgKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuc3RlcElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcy5ub3RpZnlQcmVzZW50ZXIuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLm9yaWVudGF0aW9uUmFkaW9zLmZvckVhY2gocmFkaW8gPT5cbiAgICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMubm90aWZ5UHJlc2VudGVyLmJpbmQodGhpcykpLFxuICAgICk7XG4gICAgdGhpcy5zZXRTbGlkZXJCb2R5KCk7XG4gICAgdGhpcy5zZXRPcmllbnRhdGlvbih0aGlzLl9pc1ZlcnRpY2FsKTtcbiAgICB0aGlzLnNldEhhbmRsZXJzKHRoaXMuX2hhc1JhbmdlKTtcbiAgICB0aGlzLnNldEhhbmRsZXJQb3NpdGlvbih0aGlzLl92YWx1ZXMsIHRoaXMuX2lzVmVydGljYWwpO1xuICAgIHRoaXMuc2V0U2VsZWN0ZWRSYW5nZSgpO1xuICAgIHRoaXMudXBkYXRlU2VsZWN0ZWRSYW5nZSgpO1xuICAgIHRoaXMuc2V0T3JpZW50YXRpb25Ub1JhZGlvKCk7XG4gICAgdGhpcy5zZXRTdGVwVG9JbnB1dCgpO1xuICB9XG5cbiAgbm90aWZ5UHJlc2VudGVyKCkge1xuICAgIGNvbnN0IG5ld1ZhbHVlcyA9IHRoaXMuX2NvbnRyb2xQYW5lbC52YWx1ZUlucHV0cy5tYXAoaW5wdXQgPT4gcGFyc2VJbnQoaW5wdXQudmFsdWUpKTtcbiAgICBjb25zdCBuZXdPcmllbnRhdGlvbiA9IHRoaXMuX2NvbnRyb2xQYW5lbC5vcmllbnRhdGlvblJhZGlvc1swXS5jaGVja2VkID8gdHJ1ZSA6IGZhbHNlO1xuICAgIGNvbnN0IG5ld1N0ZXAgPSBwYXJzZUludCh0aGlzLl9jb250cm9sUGFuZWwuc3RlcElucHV0LnZhbHVlKTtcbiAgICB0aGlzLm9ic2VydmVyLmJyb2FkY2FzdCh7XG4gICAgICB2YWx1ZXM6IG5ld1ZhbHVlcyxcbiAgICAgIGlzVmVydGljYWw6IG5ld09yaWVudGF0aW9uLFxuICAgICAgc3RlcDogbmV3U3RlcCxcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZSh2YWx1ZURhdGE6IHNsaWRlck9wdGlvbnMpIHtcbiAgICBjb25zdCBpc1ZlcnRpY2FsID0gdmFsdWVEYXRhLmlzVmVydGljYWwgIT09IHVuZGVmaW5lZCA/IHZhbHVlRGF0YS5pc1ZlcnRpY2FsIDogdGhpcy5faXNWZXJ0aWNhbDtcbiAgICB0aGlzLl92YWx1ZXMgPSB2YWx1ZURhdGEudmFsdWVzID8gdmFsdWVEYXRhLnZhbHVlcyA6IHRoaXMuX3ZhbHVlcztcbiAgICB0aGlzLnNldE9yaWVudGF0aW9uKGlzVmVydGljYWwpO1xuICAgIHRoaXMuc2V0SGFuZGxlclBvc2l0aW9uKHRoaXMuX3ZhbHVlcywgaXNWZXJ0aWNhbCk7XG4gICAgdGhpcy51cGRhdGVTZWxlY3RlZFJhbmdlKCk7XG4gICAgaWYgKHZhbHVlRGF0YS5zdGVwKSB0aGlzLl9zdGVwID0gdmFsdWVEYXRhLnN0ZXA7XG4gIH1cbiAgc2V0U2xpZGVyQm9keSgpIHtcbiAgICB0aGlzLl9zbGlkZXJCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fc2xpZGVyQm9keS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJCb2R5Jyk7XG4gICAgdGhpcy5fcGFyZW50LmFwcGVuZENoaWxkKHRoaXMuX3NsaWRlckJvZHkpO1xuICB9XG5cbiAgc2V0T3JpZW50YXRpb24oaXNWZXJ0aWNhbDogYm9vbGVhbikge1xuICAgIHRoaXMuX2lzVmVydGljYWwgPSBpc1ZlcnRpY2FsO1xuICAgIGlmIChpc1ZlcnRpY2FsKSB7XG4gICAgICB0aGlzLl9wYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX2hvcml6b250YWwnKTtcbiAgICAgIHRoaXMuX3BhcmVudC5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfdmVydGljYWwnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlcl92ZXJ0aWNhbCcpO1xuICAgICAgdGhpcy5fcGFyZW50LmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9ob3Jpem9udGFsJyk7XG4gICAgfVxuICB9XG5cbiAgc2V0SGFuZGxlcnMoaGFzUmFuZ2U6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oYW5kbGVycy5wdXNoKG5ldyBIYW5kbGVyVmlldyh0aGlzLl9zbGlkZXJCb2R5LCB0aGlzLl9taW4sIHRoaXMuX21heCkpO1xuICAgIGlmIChoYXNSYW5nZSkge1xuICAgICAgdGhpcy5faGFuZGxlcnMucHVzaChuZXcgSGFuZGxlclZpZXcodGhpcy5fc2xpZGVyQm9keSwgdGhpcy5fbWluLCB0aGlzLl9tYXgpKTtcbiAgICAgIHRoaXMuX2hhbmRsZXJzWzBdLmVsZW0uaWQgPSAnaGFuZGxlcl9taW4nO1xuICAgICAgdGhpcy5faGFuZGxlcnNbMV0uZWxlbS5pZCA9ICdoYW5kbGVyX21heCc7XG4gICAgfVxuICAgIHRoaXMuX2hhbmRsZXJzLmZvckVhY2goaGFuZGxlciA9PiB7XG4gICAgICBoYW5kbGVyLmVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5kcmFnQW5kRHJvcC5iaW5kKHRoaXMpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEhhbmRsZXJzKCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVycztcbiAgfVxuXG4gIHNldEhhbmRsZXJQb3NpdGlvbih2YWx1ZXM6IG51bWJlcltdLCBpc1ZlcnRpY2FsOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGFuZGxlcnMuZm9yRWFjaCgoaGFuZGxlciwgaW5kZXgpID0+IGhhbmRsZXIuc2V0UG9zaXRpb24odmFsdWVzW2luZGV4XSwgaXNWZXJ0aWNhbCkpO1xuICB9XG5cbiAgc2V0U2VsZWN0ZWRSYW5nZSgpIHtcbiAgICB0aGlzLl9zZWxlY3RlZFJhbmdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fc2xpZGVyQm9keS5hcHBlbmRDaGlsZCh0aGlzLl9zZWxlY3RlZFJhbmdlKTtcbiAgICB0aGlzLl9zZWxlY3RlZFJhbmdlLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkUmFuZ2UnKTtcbiAgICBpZiAodGhpcy5faGFzUmFuZ2UpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGVkUmFuZ2UuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWRSYW5nZScpO1xuICAgICAgdGhpcy5fc2VsZWN0ZWRSYW5nZS5jbGFzc0xpc3QuYWRkKCdyYW5nZV9iZXR3ZWVuJyk7XG4gICAgICAvLyAgdGhpcy5fc2VsZWN0ZWRSYW5nZS5zdHlsZVttaW5Qb3NpdGlvbl0gPSB0aGlzLmdldENvb3Jkcyh0aGlzLl9oYW5kbGVyc1swXS5lbGVtKS54ICsgJyUnO1xuICAgICAgLy8gIHRoaXMuX3NlbGVjdGVkUmFuZ2Uuc3R5bGVbbWF4UG9zaXRpb25dID0gdGhpcy5nZXRDb29yZHModGhpcy5faGFuZGxlcnNbMV0uZWxlbSkueCArICclJztcbiAgICB9XG4gIH1cblxuICB1cGRhdGVTZWxlY3RlZFJhbmdlKCkge1xuICAgIHRoaXMuX2lzVmVydGljYWxcbiAgICAgID8gKHRoaXMuX3NlbGVjdGVkUmFuZ2Uuc3R5bGUuaGVpZ2h0ID1cbiAgICAgICAgICB0aGlzLmdldENvb3Jkcyh0aGlzLl9zbGlkZXJCb2R5KS55IC0gdGhpcy5nZXRDb29yZHModGhpcy5faGFuZGxlcnNbMF0uZWxlbSkueSArICdweCcpXG4gICAgICA6ICh0aGlzLl9zZWxlY3RlZFJhbmdlLnN0eWxlLndpZHRoID0gdGhpcy5nZXRDb29yZHModGhpcy5faGFuZGxlcnNbMF0uZWxlbSkueCArICdweCcpO1xuICB9XG5cbiAgc2V0VmFsdWVzVG9JbnB1dHMoKSB7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLnZhbHVlSW5wdXRzLm1hcChcbiAgICAgIChpbnB1dCwgaW5kZXgpID0+IChpbnB1dC52YWx1ZSA9IHRoaXMuX3ZhbHVlc1tpbmRleF0udG9TdHJpbmcoKSksXG4gICAgKTtcbiAgfVxuXG4gIHNldFN0ZXBUb0lucHV0KCkge1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5zdGVwSW5wdXQudmFsdWUgPSB0aGlzLl9zdGVwLnRvU3RyaW5nKCk7XG4gIH1cblxuICBzZXRPcmllbnRhdGlvblRvUmFkaW8oKSB7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLm9yaWVudGF0aW9uUmFkaW9zLm1hcCgocmFkaW8sIGluZGV4KSA9PlxuICAgICAgdGhpcy5faXNWZXJ0aWNhbFxuICAgICAgICA/ICh0aGlzLl9jb250cm9sUGFuZWwub3JpZW50YXRpb25SYWRpb3NbMF0uY2hlY2tlZCA9IHRydWUpXG4gICAgICAgIDogKHRoaXMuX2NvbnRyb2xQYW5lbC5vcmllbnRhdGlvblJhZGlvc1sxXS5jaGVja2VkID0gdHJ1ZSksXG4gICAgKTtcbiAgfVxuICBkcmFnQW5kRHJvcCgpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlLmJpbmQodGhpcykpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uTW91c2VVcC5iaW5kKHRoaXMpKTtcbiAgfVxuICBvbk1vdXNlTW92ZSgpIHt9XG4gIG9uTW91c2VVcCgpIHt9XG5cbiAgZ2V0Q29vcmRzKGVsZW06IEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3QgYm94ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4ge1xuICAgICAgeDogYm94LmxlZnQgKyBwYWdlWE9mZnNldCxcbiAgICAgIHk6IGJveC5ib3R0b20gKyBwYWdlWU9mZnNldCxcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCB7IE1haW5WaWV3IH07XG4iXSwic291cmNlUm9vdCI6IiJ9