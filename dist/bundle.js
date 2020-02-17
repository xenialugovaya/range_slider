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
    notifyPresenter(valueData) {
        this.observer.broadcast(valueData);
    }
    get min() {
        this._min = Math.round(this._min / this._step) * this._step;
        return this._min;
    }
    set min(min) {
        this._min = min;
        this.notifyPresenter({
            min: this.min,
            values: this.rangeValue,
        });
    }
    get max() {
        this._max = Math.round(this._max / this._step) * this._step;
        return this._max;
    }
    set max(max) {
        this._max = max;
        this.notifyPresenter({
            max: this.max,
            values: this.rangeValue,
        });
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
    //не используется!
    get singleValue() {
        return this.calcValues(this._values)[0];
    }
    //не используется!
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
        this.notifyPresenter({
            values: this.rangeValue,
            hasRange: this._hasRange,
        });
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
    //create handlers depending on range. not used
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
            if (valueData.min)
                this._model.min = valueData.min;
            if (valueData.max)
                this._model.max = valueData.max;
            if (valueData.values)
                this._model.rangeValue = valueData.values;
            if (valueData.isVertical !== undefined)
                this._model.isVertical = valueData.isVertical;
            if (valueData.step)
                this._model.step = valueData.step;
            if (valueData.hasRange !== undefined)
                this._model.hasRange = valueData.hasRange;
        });
    }
    updateView() {
        this._model.observer.subscribe((valueData) => {
            this._view.update(valueData);
        });
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
        this._minMaxInputs = [];
        this._stepInput = document.createElement('input');
        this._orientationRadios = [];
        this._rangeRadios = [];
        this._hasRange = hasRange;
        this._isVertical = isVertical;
        this.createMaxMinInputs();
        this.createValueInputs();
        this.createStepInput();
        this.createOrientationRadios();
        this.createRangeRadios();
    }
    createMaxMinInputs() {
        const title = document.createElement('p');
        this._controlPanel.append(title);
        title.innerText = 'Мин. значение/Макс. значение';
        const inputMin = document.createElement('input');
        const inputMax = document.createElement('input');
        inputMin.classList.add('limitValue');
        inputMax.classList.add('limitValue');
        inputMin.type = 'number';
        inputMax.type = 'number';
        this._controlPanel.append(inputMin);
        this._controlPanel.append(inputMax);
        this._minMaxInputs = [inputMin, inputMax];
    }
    get minMaxInputs() {
        return this._minMaxInputs;
    }
    createValueInputs() {
        const title = document.createElement('p');
        this._controlPanel.append(title);
        title.innerText = 'Значение бегунков';
        const inputSingle = document.createElement('input');
        inputSingle.classList.add('handlerValue');
        inputSingle.type = 'number';
        this._controlPanel.append(inputSingle);
        this._valueInputs.push(inputSingle);
        if (this._hasRange) {
            const inputMin = document.querySelector('.handlerValue');
            if (inputMin)
                inputMin.classList.add('value_min');
            const inputMax = document.createElement('input');
            inputMax.classList.add('handlerValue', 'value_max');
            inputMax.type = 'number';
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
        this._stepInput.type = 'number';
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
    createRangeRadios() {
        const title = document.createElement('p');
        this._controlPanel.append(title);
        title.innerText = 'Одиночное/интервал';
        const radioSingle = document.createElement('input');
        radioSingle.id = 'radio_single';
        const radioDouble = document.createElement('input');
        radioDouble.id = 'radio_double';
        this._rangeRadios = [radioSingle, radioDouble];
        this._rangeRadios.forEach(radio => {
            radio.type = 'radio';
            radio.name = 'range';
            this._controlPanel.append(radio);
        });
    }
    get rangeRadios() {
        return this._rangeRadios;
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
        this._parent.append(this._handler);
    }
    setPosition(value, min, max, isVertical) {
        const valuesCount = max - min;
        const positionProperty = isVertical ? 'bottom' : 'left';
        const handlerSize = isVertical
            ? (this._handler.offsetHeight / this._parent.offsetHeight) * 100
            : (this._handler.offsetWidth / this._parent.offsetWidth) * 100;
        const position = ((value - min) / valuesCount) * 100 - handlerSize / 2;
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
        this._minMax = [this._min, this._max];
        this._values = values;
        this._step = step;
        this._isVertical = isVertical;
        this._hasRange = hasRange;
        this._parent = parent;
        this._sliderBody = document.createElement('div');
        this._selectedRange = document.createElement('div');
        this._handlers = [];
        this._mouseMove;
        this._mouseUp;
        this._handlerTargetId = '';
        this._controlPanel = new _ControlPanelView__WEBPACK_IMPORTED_MODULE_1__["ControlPanel"](this._parent, hasRange, isVertical);
        this._controlPanel.minMaxInputs.forEach(input => input.addEventListener('change', this.notifyPresenter.bind(this)));
        this._controlPanel.valueInputs.forEach(input => input.addEventListener('change', this.notifyPresenter.bind(this)));
        this._controlPanel.stepInput.addEventListener('change', this.notifyPresenter.bind(this));
        this._controlPanel.orientationRadios.forEach(radio => radio.addEventListener('change', this.notifyPresenter.bind(this)));
        this._controlPanel.rangeRadios.forEach(radio => radio.addEventListener('change', this.notifyPresenter.bind(this)));
        this.setSliderBody();
        this.setOrientation(this._isVertical);
        this.setHandlers(this._hasRange);
        this.setHandlerPosition(this._values, this._isVertical);
        this.setValuesToInputs();
        this.setMinMaxToInputs();
        this.setSelectedRange();
        this.updateSelectedRange();
        this.setOrientationToRadio();
        this.setStepToInput();
        this.setRangeToRadio();
        this._handlers.forEach(handler => {
            handler.elem.ondragstart = function () {
                return false;
            };
            handler.elem.addEventListener('mousedown', this.dragAndDrop.bind(this));
        });
    }
    notifyPresenter() {
        const newMinMax = this._controlPanel.minMaxInputs.map(input => parseInt(input.value));
        const newValues = this._controlPanel.valueInputs.map(input => parseInt(input.value));
        const newOrientation = this._controlPanel.orientationRadios[0].checked ? true : false;
        const newStep = parseInt(this._controlPanel.stepInput.value);
        const newRange = this._controlPanel.rangeRadios[1].checked ? true : false;
        this.observer.broadcast({
            min: newMinMax[0],
            max: newMinMax[1],
            values: newValues,
            isVertical: newOrientation,
            step: newStep,
            hasRange: newRange,
        });
    }
    update(valueData) {
        this._min = valueData.min ? valueData.min : this._min;
        this._max = valueData.max ? valueData.max : this._max;
        this._values = valueData.values ? valueData.values : this._values;
        this._isVertical = valueData.isVertical !== undefined ? valueData.isVertical : this._isVertical;
        this._hasRange = valueData.hasRange !== undefined ? valueData.hasRange : this._hasRange;
        this.updateRange();
        this.setOrientation(this._isVertical);
        this.setHandlerPosition(this._values, this._isVertical);
        this._controlPanel.valueInputs[0].value = this._values[0].toString();
        if (this._controlPanel.valueInputs[1]) {
            this._controlPanel.valueInputs[1].value = this._values[1].toString();
        }
        this.updateSelectedRange();
        if (valueData.step)
            this._step = valueData.step;
    }
    setSliderBody() {
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
    }
    getHandlers() {
        return this._handlers;
    }
    updateRange() {
        if (!this._hasRange) {
            this._handlers[1].elem.remove();
            this._controlPanel.valueInputs[1].remove();
            this._selectedRange.classList.add('selectedRange');
            this._selectedRange.classList.remove('range_between');
            this.updateSelectedRange();
        }
        else {
            this._handlers[0].elem.after(this._handlers[1].elem);
            this._controlPanel.valueInputs[0].after(this._controlPanel.valueInputs[1]);
            this._selectedRange.classList.remove('selectedRange');
            this._selectedRange.classList.add('range_between');
        }
    }
    setHandlerPosition(values, isVertical) {
        this._handlers.forEach((handler, index) => handler.setPosition(values[index], this._min, this._max, isVertical));
    }
    setSelectedRange() {
        this._selectedRange = document.createElement('div');
        this._sliderBody.appendChild(this._selectedRange);
        this._selectedRange.classList.add('selectedRange');
        if (this._hasRange) {
            this._selectedRange.classList.remove('selectedRange');
            this._selectedRange.classList.add('range_between');
        }
    }
    updateSelectedRange() {
        this._isVertical
            ? (this._selectedRange.style.height =
                this.getCoords(this._sliderBody) - this.getCoords(this._handlers[0].elem) + 'px')
            : (this._selectedRange.style.width = this.getCoords(this._handlers[0].elem) + 'px');
        if (this._hasRange) {
            const posMin = this._isVertical ? 'bottom' : 'left';
            const size = this._isVertical ? 'height' : 'width';
            this._selectedRange.style[posMin] = this._isVertical
                ? this.getCoords(this._sliderBody) - this.getCoords(this._handlers[0].elem) + 'px'
                : this.getCoords(this._handlers[0].elem) + 'px';
            this._selectedRange.style[size] = this._isVertical
                ? this.getCoords(this._handlers[0].elem) - this.getCoords(this._handlers[1].elem) + 'px'
                : this.getCoords(this._handlers[1].elem) - this.getCoords(this._handlers[0].elem) + 'px';
        }
    }
    setMinMaxToInputs() {
        this._controlPanel.minMaxInputs.map((input, index) => (input.value = this._minMax[index].toString()));
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
    setRangeToRadio() {
        this._controlPanel.rangeRadios.map((radio, index) => this._hasRange
            ? (this._controlPanel.rangeRadios[1].checked = true)
            : (this._controlPanel.rangeRadios[0].checked = true));
    }
    getCoords(elem) {
        const box = elem.getBoundingClientRect();
        if (this._isVertical) {
            return box.bottom + pageYOffset;
        }
        else {
            return box.left + pageXOffset;
        }
    }
    dragAndDrop(e) {
        e.preventDefault();
        const target = e.target;
        this._handlerTargetId = target.id;
        this._mouseMove = this.onMouseMove.bind(this);
        this._mouseUp = this.onMouseUp.bind(this);
        document.addEventListener('mousemove', this._mouseMove);
        document.addEventListener('mouseup', this._mouseUp);
    }
    onMouseMove(e) {
        if (this._isVertical) {
            this.moveAt(e.pageY, this._handlerTargetId);
        }
        else {
            this.moveAt(e.pageX, this._handlerTargetId);
        }
    }
    moveAt(coordinate, targetId) {
        const sliderCoord = this.getCoords(this._sliderBody);
        const value = this._isVertical
            ? Math.round(((sliderCoord - coordinate) / this._sliderBody.offsetHeight) * this._max)
            : Math.round(((coordinate - sliderCoord) / this._sliderBody.offsetWidth) * this._max);
        if (!targetId || targetId === 'handler_min') {
            this.observer.broadcast({
                values: [value, this._values[1]],
            });
        }
        else {
            this.observer.broadcast({
                values: [this._values[0], value],
            });
        }
    }
    onMouseUp() {
        document.removeEventListener('mousemove', this._mouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    }
}



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9tb2RlbC9NYWluTW9kZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVsL2hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29ic2VydmVyL29ic2VydmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9wcmVzZW50ZXIvRmFjYWRlLnRzIiwid2VicGFjazovLy8uL3NyYy9wcmVzZW50ZXIvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy92aWV3L0NvbnRyb2xQYW5lbFZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXcvSGFuZGxlclZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXcvTWFpblZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7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QUFDO0NBQ0Y7QUFFbUIiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBGYWNhZGUgfSBmcm9tICcuL3ByZXNlbnRlci9GYWNhZGUnO1xuXG4kKGZ1bmN0aW9uKCkge1xuICAkLmZuLnNsaWRlciA9IGZ1bmN0aW9uKG9wdGlvbnMpOiBGYWNhZGUge1xuICAgIGNvbnN0IGZhY2FkZTogRmFjYWRlID0gbmV3IEZhY2FkZSh0aGlzLmdldCgwKSwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIGZhY2FkZTtcbiAgfTtcbn0pO1xuIiwiaW1wb3J0IHsgRXZlbnRPYnNlcnZlciB9IGZyb20gJy4uL29ic2VydmVyL29ic2VydmVyJztcbmltcG9ydCB7IEhhbmRsZXIgfSBmcm9tICcuL2hhbmRsZXInO1xuaW1wb3J0IHsgc2xpZGVyT3B0aW9ucyB9IGZyb20gJy4vc2xpZGVyT3B0aW9ucyc7XG5cbmNsYXNzIE1haW5Nb2RlbCB7XG4gIHB1YmxpYyBvYnNlcnZlcjogRXZlbnRPYnNlcnZlcjtcbiAgcHJpdmF0ZSBfbWluID0gMDtcbiAgcHJpdmF0ZSBfbWF4ID0gMTAwO1xuICBwcml2YXRlIF9zdGVwID0gMTtcbiAgcHJpdmF0ZSBfdmFsdWVzID0gWzEwLCAyMF07XG4gIHByaXZhdGUgX2lzVmVydGljYWwgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfaGFzUmFuZ2UgPSB0cnVlO1xuICBwcml2YXRlIF9oYXNMYWJlbHMgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfaGFuZGxlcnM6IEhhbmRsZXJbXSA9IFtdO1xuICBjb25zdHJ1Y3RvcihzbGlkZXJPcHRpb25zOiBzbGlkZXJPcHRpb25zKSB7XG4gICAgdGhpcy5vYnNlcnZlciA9IG5ldyBFdmVudE9ic2VydmVyKCk7XG4gICAgdGhpcy5fbWluID0gc2xpZGVyT3B0aW9ucy5taW4gPyBzbGlkZXJPcHRpb25zLm1pbiA6IDA7XG4gICAgdGhpcy5fbWF4ID0gc2xpZGVyT3B0aW9ucy5tYXggPyBzbGlkZXJPcHRpb25zLm1heCA6IHRoaXMuX21heDtcbiAgICB0aGlzLl9zdGVwID0gc2xpZGVyT3B0aW9ucy5zdGVwID8gc2xpZGVyT3B0aW9ucy5zdGVwIDogdGhpcy5fc3RlcDtcbiAgICB0aGlzLl92YWx1ZXMgPSBzbGlkZXJPcHRpb25zLnZhbHVlcyA/IHNsaWRlck9wdGlvbnMudmFsdWVzIDogdGhpcy5fdmFsdWVzO1xuICAgIHRoaXMuX2hhc1JhbmdlID0gc2xpZGVyT3B0aW9ucy5oYXNSYW5nZSA/IHNsaWRlck9wdGlvbnMuaGFzUmFuZ2UgOiB0aGlzLl9oYXNSYW5nZTtcbiAgICB0aGlzLl9pc1ZlcnRpY2FsID0gc2xpZGVyT3B0aW9ucy5pc1ZlcnRpY2FsID8gc2xpZGVyT3B0aW9ucy5pc1ZlcnRpY2FsIDogdGhpcy5faXNWZXJ0aWNhbDtcbiAgICB0aGlzLl9oYXNMYWJlbHMgPSBzbGlkZXJPcHRpb25zLmhhc0xhYmVscyA/IHNsaWRlck9wdGlvbnMuaGFzTGFiZWxzIDogdGhpcy5faGFzTGFiZWxzO1xuICB9XG5cbiAgbm90aWZ5UHJlc2VudGVyKHZhbHVlRGF0YTogc2xpZGVyT3B0aW9ucykge1xuICAgIHRoaXMub2JzZXJ2ZXIuYnJvYWRjYXN0KHZhbHVlRGF0YSk7XG4gIH1cblxuICBnZXQgbWluKCk6IG51bWJlciB7XG4gICAgdGhpcy5fbWluID0gTWF0aC5yb3VuZCh0aGlzLl9taW4gLyB0aGlzLl9zdGVwKSAqIHRoaXMuX3N0ZXA7XG4gICAgcmV0dXJuIHRoaXMuX21pbjtcbiAgfVxuXG4gIHNldCBtaW4obWluOiBudW1iZXIpIHtcbiAgICB0aGlzLl9taW4gPSBtaW47XG4gICAgdGhpcy5ub3RpZnlQcmVzZW50ZXIoe1xuICAgICAgbWluOiB0aGlzLm1pbixcbiAgICAgIHZhbHVlczogdGhpcy5yYW5nZVZhbHVlLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0IG1heCgpOiBudW1iZXIge1xuICAgIHRoaXMuX21heCA9IE1hdGgucm91bmQodGhpcy5fbWF4IC8gdGhpcy5fc3RlcCkgKiB0aGlzLl9zdGVwO1xuICAgIHJldHVybiB0aGlzLl9tYXg7XG4gIH1cblxuICBzZXQgbWF4KG1heDogbnVtYmVyKSB7XG4gICAgdGhpcy5fbWF4ID0gbWF4O1xuICAgIHRoaXMubm90aWZ5UHJlc2VudGVyKHtcbiAgICAgIG1heDogdGhpcy5tYXgsXG4gICAgICB2YWx1ZXM6IHRoaXMucmFuZ2VWYWx1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBzdGVwKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3N0ZXA7XG4gIH1cblxuICBzZXQgc3RlcChzdGVwOiBudW1iZXIpIHtcbiAgICB0aGlzLl9zdGVwID0gc3RlcDtcbiAgICB0aGlzLm5vdGlmeVByZXNlbnRlcih7XG4gICAgICBzdGVwOiB0aGlzLl9zdGVwLFxuICAgICAgdmFsdWVzOiB0aGlzLnJhbmdlVmFsdWUsXG4gICAgfSk7XG4gIH1cbiAgLy/QvdC1INC40YHQv9C+0LvRjNC30YPQtdGC0YHRjyFcbiAgZ2V0IHNpbmdsZVZhbHVlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY2FsY1ZhbHVlcyh0aGlzLl92YWx1ZXMpWzBdO1xuICB9XG4gIC8v0L3QtSDQuNGB0L/QvtC70YzQt9GD0LXRgtGB0Y8hXG4gIHNldCBzaW5nbGVWYWx1ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fdmFsdWVzWzBdID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcmFuZ2VWYWx1ZSgpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIHRoaXMuY2FsY1ZhbHVlcyh0aGlzLl92YWx1ZXMpO1xuICB9XG5cbiAgc2V0IHJhbmdlVmFsdWUodmFsdWVzOiBudW1iZXJbXSkge1xuICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlcztcbiAgICB0aGlzLm5vdGlmeVByZXNlbnRlcih7XG4gICAgICB2YWx1ZXM6IHRoaXMuY2FsY1ZhbHVlcyh0aGlzLl92YWx1ZXMpLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0IGlzVmVydGljYWwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzVmVydGljYWw7XG4gIH1cblxuICBzZXQgaXNWZXJ0aWNhbCh2ZXJ0aWNhbDogYm9vbGVhbikge1xuICAgIHRoaXMuX2lzVmVydGljYWwgPSB2ZXJ0aWNhbDtcbiAgICB0aGlzLm5vdGlmeVByZXNlbnRlcih7XG4gICAgICB2YWx1ZXM6IHRoaXMucmFuZ2VWYWx1ZSxcbiAgICAgIGlzVmVydGljYWw6IHRoaXMuX2lzVmVydGljYWwsXG4gICAgfSk7XG4gIH1cblxuICBnZXQgaGFzUmFuZ2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2hhc1JhbmdlO1xuICB9XG5cbiAgc2V0IGhhc1JhbmdlKHJhbmdlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGFzUmFuZ2UgPSByYW5nZTtcbiAgICB0aGlzLm5vdGlmeVByZXNlbnRlcih7XG4gICAgICB2YWx1ZXM6IHRoaXMucmFuZ2VWYWx1ZSxcbiAgICAgIGhhc1JhbmdlOiB0aGlzLl9oYXNSYW5nZSxcbiAgICB9KTtcbiAgfVxuXG4gIC8vY2hlY2sgdGhhdCB2YWx1ZXMgb2YgaGFuZGxlcnMgYXJlIHdpdGhpbiBtaW4gYW5kIG1heFxuICAvL2NoZWNrIHRoYXQgdmFsdWUgMCBpcyBsZXNzIHRoYW4gdmFsdWUgMSBmb3IgcmFuZ2VcbiAgY2FsY1ZhbHVlcyh2YWx1ZXM6IG51bWJlcltdKTogbnVtYmVyW10ge1xuICAgIHZhbHVlcyA9IHZhbHVlcy5tYXAodmFsdWUgPT4gTWF0aC5yb3VuZCh2YWx1ZSAvIHRoaXMuX3N0ZXApICogdGhpcy5fc3RlcCk7XG4gICAgaWYgKHZhbHVlc1swXSA+IHZhbHVlc1sxXSkgW3ZhbHVlc1swXSwgdmFsdWVzWzFdXSA9IFt2YWx1ZXNbMV0sIHZhbHVlc1swXV07XG4gICAgdmFsdWVzID0gdmFsdWVzLm1hcCh2YWx1ZSA9PlxuICAgICAgdmFsdWUgPCB0aGlzLl9taW4gPyB0aGlzLl9taW4gOiB2YWx1ZSA+IHRoaXMuX21heCA/IHRoaXMuX21heCA6IHZhbHVlLFxuICAgICk7XG5cbiAgICByZXR1cm4gdmFsdWVzO1xuICB9XG5cbiAgLy9jcmVhdGUgaGFuZGxlcnMgZGVwZW5kaW5nIG9uIHJhbmdlLiBub3QgdXNlZFxuICBzZXRIYW5kbGVycyh2YWx1ZXM6IG51bWJlcltdKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2hhc1JhbmdlKSB7XG4gICAgICB0aGlzLl9oYW5kbGVycyA9IFtuZXcgSGFuZGxlcih2YWx1ZXNbMF0pLCBuZXcgSGFuZGxlcih2YWx1ZXNbMV0pXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGFuZGxlcnMgPSBbbmV3IEhhbmRsZXIodmFsdWVzWzBdKV07XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IE1haW5Nb2RlbCB9O1xuIiwiY2xhc3MgSGFuZGxlciB7XG4gIHByaXZhdGUgX3Bvc2l0aW9uOiBudW1iZXI7XG4gIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICB9XG5cbiAgZ2V0IHBvc2l0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uO1xuICB9XG5cbiAgc2V0IHBvc2l0aW9uKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IHZhbHVlO1xuICB9XG59XG5cbmV4cG9ydCB7IEhhbmRsZXIgfTtcbiIsImNsYXNzIEV2ZW50T2JzZXJ2ZXIge1xuICBwcml2YXRlIF9vYnNlcnZlcnM6IEZ1bmN0aW9uW107XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX29ic2VydmVycyA9IFtdO1xuICB9XG4gIHN1YnNjcmliZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLl9vYnNlcnZlcnMucHVzaChmbik7XG4gIH1cbiAgdW5zdWJzY3JpYmUoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fb2JzZXJ2ZXJzID0gdGhpcy5fb2JzZXJ2ZXJzLmZpbHRlcihzdWJzY3JpYmVyID0+IHN1YnNjcmliZXIgIT09IGZuKTtcbiAgfVxuICBicm9hZGNhc3QoZGF0YTogb2JqZWN0KTogdm9pZCB7XG4gICAgdGhpcy5fb2JzZXJ2ZXJzLmZvckVhY2goc3Vic2NyaWJlciA9PiBzdWJzY3JpYmVyKGRhdGEpKTtcbiAgfVxufVxuXG5leHBvcnQgeyBFdmVudE9ic2VydmVyIH07XG4iLCJpbXBvcnQgeyBNYWluTW9kZWwgfSBmcm9tICcuLi9tb2RlbC9NYWluTW9kZWwnO1xuaW1wb3J0IHsgUHJlc2VudGVyIH0gZnJvbSAnLi9QcmVzZW50ZXInO1xuaW1wb3J0IHsgc2xpZGVyT3B0aW9ucyB9IGZyb20gJy4uL21vZGVsL3NsaWRlck9wdGlvbnMnO1xuXG5jbGFzcyBGYWNhZGUge1xuICBwcml2YXRlIF9tb2RlbDogTWFpbk1vZGVsO1xuICBwcml2YXRlIF9wcmVzZW50ZXI6IFByZXNlbnRlcjtcblxuICBjb25zdHJ1Y3RvcihwYXJlbnQ6IEhUTUxFbGVtZW50LCBzbGlkZXJPcHRpb25zOiBzbGlkZXJPcHRpb25zKSB7XG4gICAgdGhpcy5fbW9kZWwgPSBuZXcgTWFpbk1vZGVsKHNsaWRlck9wdGlvbnMpO1xuICAgIHRoaXMuX3ByZXNlbnRlciA9IG5ldyBQcmVzZW50ZXIocGFyZW50LCB0aGlzLl9tb2RlbCk7XG4gICAgdGhpcy5fcHJlc2VudGVyLnNldFN0ZXBUb0lucHV0KCk7XG4gIH1cblxuICBnZXQgc2luZ2xlVmFsdWUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuc2luZ2xlVmFsdWU7XG4gIH1cblxuICBzZXQgc2luZ2xlVmFsdWUodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX21vZGVsLnNpbmdsZVZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcmFuZ2VWYWx1ZSgpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLnJhbmdlVmFsdWU7XG4gIH1cblxuICBzZXQgcmFuZ2VWYWx1ZSh2YWx1ZTogbnVtYmVyW10pIHtcbiAgICB0aGlzLl9tb2RlbC5yYW5nZVZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBnZXQgc3RlcCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5zdGVwO1xuICB9XG5cbiAgc2V0IHN0ZXAodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX21vZGVsLnN0ZXAgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBpc1ZlcnRpY2FsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5pc1ZlcnRpY2FsO1xuICB9XG5cbiAgc2V0IGlzVmVydGljYWwodmVydGljYWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9tb2RlbC5pc1ZlcnRpY2FsID0gdmVydGljYWw7XG4gIH1cbn1cblxuZXhwb3J0IHsgRmFjYWRlIH07XG4iLCJpbXBvcnQgeyBNYWluTW9kZWwgfSBmcm9tICcuLi9tb2RlbC9NYWluTW9kZWwnO1xuaW1wb3J0IHsgTWFpblZpZXcgfSBmcm9tICcuLi92aWV3L01haW5WaWV3JztcbmltcG9ydCB7IHNsaWRlck9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbC9zbGlkZXJPcHRpb25zJztcblxuY2xhc3MgUHJlc2VudGVyIHtcbiAgcHJpdmF0ZSBfbW9kZWw6IE1haW5Nb2RlbDtcbiAgcHJpdmF0ZSBfdmlldzogTWFpblZpZXc7XG4gIHByaXZhdGUgX3ZhbHVlczogbnVtYmVyW107XG5cbiAgY29uc3RydWN0b3IocGFyZW50OiBIVE1MRWxlbWVudCwgbW9kZWw6IE1haW5Nb2RlbCkge1xuICAgIHRoaXMuX21vZGVsID0gbW9kZWw7XG4gICAgdGhpcy5fdmFsdWVzID0gdGhpcy5fbW9kZWwucmFuZ2VWYWx1ZTtcbiAgICB0aGlzLl92aWV3ID0gbmV3IE1haW5WaWV3KFxuICAgICAgcGFyZW50LFxuICAgICAgdGhpcy5fbW9kZWwuaGFzUmFuZ2UsXG4gICAgICB0aGlzLl9tb2RlbC5pc1ZlcnRpY2FsLFxuICAgICAgdGhpcy5fbW9kZWwubWluLFxuICAgICAgdGhpcy5fbW9kZWwubWF4LFxuICAgICAgdGhpcy5fdmFsdWVzLFxuICAgICAgdGhpcy5fbW9kZWwuc3RlcCxcbiAgICApO1xuICAgIHRoaXMudXBkYXRlTW9kZWwoKTtcbiAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgfVxuXG4gIHVwZGF0ZU1vZGVsKCkge1xuICAgIHRoaXMuX3ZpZXcub2JzZXJ2ZXIuc3Vic2NyaWJlKCh2YWx1ZURhdGE6IHNsaWRlck9wdGlvbnMpID0+IHtcbiAgICAgIGlmICh2YWx1ZURhdGEubWluKSB0aGlzLl9tb2RlbC5taW4gPSB2YWx1ZURhdGEubWluO1xuICAgICAgaWYgKHZhbHVlRGF0YS5tYXgpIHRoaXMuX21vZGVsLm1heCA9IHZhbHVlRGF0YS5tYXg7XG4gICAgICBpZiAodmFsdWVEYXRhLnZhbHVlcykgdGhpcy5fbW9kZWwucmFuZ2VWYWx1ZSA9IHZhbHVlRGF0YS52YWx1ZXM7XG4gICAgICBpZiAodmFsdWVEYXRhLmlzVmVydGljYWwgIT09IHVuZGVmaW5lZCkgdGhpcy5fbW9kZWwuaXNWZXJ0aWNhbCA9IHZhbHVlRGF0YS5pc1ZlcnRpY2FsO1xuICAgICAgaWYgKHZhbHVlRGF0YS5zdGVwKSB0aGlzLl9tb2RlbC5zdGVwID0gdmFsdWVEYXRhLnN0ZXA7XG4gICAgICBpZiAodmFsdWVEYXRhLmhhc1JhbmdlICE9PSB1bmRlZmluZWQpIHRoaXMuX21vZGVsLmhhc1JhbmdlID0gdmFsdWVEYXRhLmhhc1JhbmdlO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlVmlldygpIHtcbiAgICB0aGlzLl9tb2RlbC5vYnNlcnZlci5zdWJzY3JpYmUoKHZhbHVlRGF0YTogc2xpZGVyT3B0aW9ucykgPT4ge1xuICAgICAgdGhpcy5fdmlldy51cGRhdGUodmFsdWVEYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldFN0ZXBUb0lucHV0KCkge1xuICAgIHRoaXMuX3ZpZXcuc2V0U3RlcFRvSW5wdXQoKTtcbiAgfVxufVxuXG5leHBvcnQgeyBQcmVzZW50ZXIgfTtcbiIsImNsYXNzIENvbnRyb2xQYW5lbCB7XG4gIHByaXZhdGUgX3BhcmVudDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX2NvbnRyb2xQYW5lbDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX21pbk1heElucHV0czogSFRNTElucHV0RWxlbWVudFtdO1xuICBwcml2YXRlIF92YWx1ZUlucHV0czogSFRNTElucHV0RWxlbWVudFtdO1xuICBwcml2YXRlIF9zdGVwSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gIHByaXZhdGUgX29yaWVudGF0aW9uUmFkaW9zOiBIVE1MSW5wdXRFbGVtZW50W107XG4gIHByaXZhdGUgX3JhbmdlUmFkaW9zOiBIVE1MSW5wdXRFbGVtZW50W107XG4gIHByaXZhdGUgX2hhc1JhbmdlOiBib29sZWFuO1xuICBwcml2YXRlIF9pc1ZlcnRpY2FsOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmVudDogSFRNTEVsZW1lbnQsIGhhc1JhbmdlOiBib29sZWFuLCBpc1ZlcnRpY2FsOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5jbGFzc0xpc3QuYWRkKCdjb250cm9sUGFuZWwnKTtcbiAgICB0aGlzLl9wYXJlbnQuYWZ0ZXIodGhpcy5fY29udHJvbFBhbmVsKTtcbiAgICB0aGlzLl92YWx1ZUlucHV0cyA9IFtdO1xuICAgIHRoaXMuX21pbk1heElucHV0cyA9IFtdO1xuICAgIHRoaXMuX3N0ZXBJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgdGhpcy5fb3JpZW50YXRpb25SYWRpb3MgPSBbXTtcbiAgICB0aGlzLl9yYW5nZVJhZGlvcyA9IFtdO1xuICAgIHRoaXMuX2hhc1JhbmdlID0gaGFzUmFuZ2U7XG4gICAgdGhpcy5faXNWZXJ0aWNhbCA9IGlzVmVydGljYWw7XG4gICAgdGhpcy5jcmVhdGVNYXhNaW5JbnB1dHMoKTtcbiAgICB0aGlzLmNyZWF0ZVZhbHVlSW5wdXRzKCk7XG4gICAgdGhpcy5jcmVhdGVTdGVwSW5wdXQoKTtcbiAgICB0aGlzLmNyZWF0ZU9yaWVudGF0aW9uUmFkaW9zKCk7XG4gICAgdGhpcy5jcmVhdGVSYW5nZVJhZGlvcygpO1xuICB9XG5cbiAgY3JlYXRlTWF4TWluSW5wdXRzKCkge1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQodGl0bGUpO1xuICAgIHRpdGxlLmlubmVyVGV4dCA9ICfQnNC40L0uINC30L3QsNGH0LXQvdC40LUv0JzQsNC60YEuINC30L3QsNGH0LXQvdC40LUnO1xuICAgIGNvbnN0IGlucHV0TWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBjb25zdCBpbnB1dE1heCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaW5wdXRNaW4uY2xhc3NMaXN0LmFkZCgnbGltaXRWYWx1ZScpO1xuICAgIGlucHV0TWF4LmNsYXNzTGlzdC5hZGQoJ2xpbWl0VmFsdWUnKTtcbiAgICBpbnB1dE1pbi50eXBlID0gJ251bWJlcic7XG4gICAgaW5wdXRNYXgudHlwZSA9ICdudW1iZXInO1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQoaW5wdXRNaW4pO1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQoaW5wdXRNYXgpO1xuICAgIHRoaXMuX21pbk1heElucHV0cyA9IFtpbnB1dE1pbiwgaW5wdXRNYXhdO1xuICB9XG5cbiAgZ2V0IG1pbk1heElucHV0cygpIHtcbiAgICByZXR1cm4gdGhpcy5fbWluTWF4SW5wdXRzO1xuICB9XG5cbiAgY3JlYXRlVmFsdWVJbnB1dHMoKSB7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZCh0aXRsZSk7XG4gICAgdGl0bGUuaW5uZXJUZXh0ID0gJ9CX0L3QsNGH0LXQvdC40LUg0LHQtdCz0YPQvdC60L7Qsic7XG4gICAgY29uc3QgaW5wdXRTaW5nbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGlucHV0U2luZ2xlLmNsYXNzTGlzdC5hZGQoJ2hhbmRsZXJWYWx1ZScpO1xuICAgIGlucHV0U2luZ2xlLnR5cGUgPSAnbnVtYmVyJztcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKGlucHV0U2luZ2xlKTtcbiAgICB0aGlzLl92YWx1ZUlucHV0cy5wdXNoKGlucHV0U2luZ2xlKTtcbiAgICBpZiAodGhpcy5faGFzUmFuZ2UpIHtcbiAgICAgIGNvbnN0IGlucHV0TWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhhbmRsZXJWYWx1ZScpO1xuICAgICAgaWYgKGlucHV0TWluKSBpbnB1dE1pbi5jbGFzc0xpc3QuYWRkKCd2YWx1ZV9taW4nKTtcbiAgICAgIGNvbnN0IGlucHV0TWF4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgIGlucHV0TWF4LmNsYXNzTGlzdC5hZGQoJ2hhbmRsZXJWYWx1ZScsICd2YWx1ZV9tYXgnKTtcbiAgICAgIGlucHV0TWF4LnR5cGUgPSAnbnVtYmVyJztcbiAgICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQoaW5wdXRNYXgpO1xuICAgICAgdGhpcy5fdmFsdWVJbnB1dHMucHVzaChpbnB1dE1heCk7XG4gICAgfVxuICB9XG4gIGdldCB2YWx1ZUlucHV0cygpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWVJbnB1dHM7XG4gIH1cblxuICBjcmVhdGVTdGVwSW5wdXQoKSB7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZCh0aXRsZSk7XG4gICAgdGl0bGUuaW5uZXJUZXh0ID0gJ9CX0L3QsNGH0LXQvdC40LUg0YjQsNCz0LAnO1xuICAgIHRoaXMuX3N0ZXBJbnB1dC5jbGFzc0xpc3QuYWRkKCdzdGVwVmFsdWUnKTtcbiAgICB0aGlzLl9zdGVwSW5wdXQudHlwZSA9ICdudW1iZXInO1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQodGhpcy5fc3RlcElucHV0KTtcbiAgfVxuXG4gIGdldCBzdGVwSW5wdXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0ZXBJbnB1dDtcbiAgfVxuXG4gIGNyZWF0ZU9yaWVudGF0aW9uUmFkaW9zKCkge1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQodGl0bGUpO1xuICAgIHRpdGxlLmlubmVyVGV4dCA9ICfQktC10YDRgtC40LrQsNC70YzQvdGL0Lkv0LPQvtGA0LjQt9C+0L3RgtCw0LvRjNC90YvQuSc7XG4gICAgY29uc3QgcmFkaW9WZXJ0aWNhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgcmFkaW9WZXJ0aWNhbC5pZCA9ICdyYWRpb192ZXJ0aWNhbCc7XG4gICAgY29uc3QgcmFkaW9Ib3Jpem9udGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICByYWRpb0hvcml6b250YWwuaWQgPSAncmFkaW9faG9yaXpvbnRhbCc7XG4gICAgdGhpcy5fb3JpZW50YXRpb25SYWRpb3MgPSBbcmFkaW9WZXJ0aWNhbCwgcmFkaW9Ib3Jpem9udGFsXTtcbiAgICB0aGlzLl9vcmllbnRhdGlvblJhZGlvcy5mb3JFYWNoKHJhZGlvID0+IHtcbiAgICAgIHJhZGlvLnR5cGUgPSAncmFkaW8nO1xuICAgICAgcmFkaW8ubmFtZSA9ICdvcmllbnRhdGlvbic7XG4gICAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKHJhZGlvKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBvcmllbnRhdGlvblJhZGlvcygpIHtcbiAgICByZXR1cm4gdGhpcy5fb3JpZW50YXRpb25SYWRpb3M7XG4gIH1cblxuICBjcmVhdGVSYW5nZVJhZGlvcygpIHtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKHRpdGxlKTtcbiAgICB0aXRsZS5pbm5lclRleHQgPSAn0J7QtNC40L3QvtGH0L3QvtC1L9C40L3RgtC10YDQstCw0LsnO1xuICAgIGNvbnN0IHJhZGlvU2luZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICByYWRpb1NpbmdsZS5pZCA9ICdyYWRpb19zaW5nbGUnO1xuICAgIGNvbnN0IHJhZGlvRG91YmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICByYWRpb0RvdWJsZS5pZCA9ICdyYWRpb19kb3VibGUnO1xuICAgIHRoaXMuX3JhbmdlUmFkaW9zID0gW3JhZGlvU2luZ2xlLCByYWRpb0RvdWJsZV07XG4gICAgdGhpcy5fcmFuZ2VSYWRpb3MuZm9yRWFjaChyYWRpbyA9PiB7XG4gICAgICByYWRpby50eXBlID0gJ3JhZGlvJztcbiAgICAgIHJhZGlvLm5hbWUgPSAncmFuZ2UnO1xuICAgICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZChyYWRpbyk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgcmFuZ2VSYWRpb3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JhbmdlUmFkaW9zO1xuICB9XG59XG5cbmV4cG9ydCB7IENvbnRyb2xQYW5lbCB9O1xuIiwiY2xhc3MgSGFuZGxlclZpZXcge1xuICBwcml2YXRlIF9oYW5kbGVyOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfcGFyZW50OiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihwYXJlbnQ6IEhUTUxFbGVtZW50LCBtaW5MaW1pdDogbnVtYmVyLCBtYXhMaW1pdDogbnVtYmVyKSB7XG4gICAgdGhpcy5faGFuZGxlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX2hhbmRsZXIuY2xhc3NMaXN0LmFkZCgnaGFuZGxlcicpO1xuICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcbiAgICB0aGlzLl9wYXJlbnQuYXBwZW5kKHRoaXMuX2hhbmRsZXIpO1xuICB9XG5cbiAgc2V0UG9zaXRpb24odmFsdWU6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyLCBpc1ZlcnRpY2FsOiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWVzQ291bnQgPSBtYXggLSBtaW47XG4gICAgY29uc3QgcG9zaXRpb25Qcm9wZXJ0eSA9IGlzVmVydGljYWwgPyAnYm90dG9tJyA6ICdsZWZ0JztcbiAgICBjb25zdCBoYW5kbGVyU2l6ZSA9IGlzVmVydGljYWxcbiAgICAgID8gKHRoaXMuX2hhbmRsZXIub2Zmc2V0SGVpZ2h0IC8gdGhpcy5fcGFyZW50Lm9mZnNldEhlaWdodCkgKiAxMDBcbiAgICAgIDogKHRoaXMuX2hhbmRsZXIub2Zmc2V0V2lkdGggLyB0aGlzLl9wYXJlbnQub2Zmc2V0V2lkdGgpICogMTAwO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gKCh2YWx1ZSAtIG1pbikgLyB2YWx1ZXNDb3VudCkgKiAxMDAgLSBoYW5kbGVyU2l6ZSAvIDI7XG4gICAgdGhpcy5faGFuZGxlci5zdHlsZVtwb3NpdGlvblByb3BlcnR5XSA9IGAke3Bvc2l0aW9ufSVgO1xuICB9XG5cbiAgZ2V0IGVsZW0oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZXI7XG4gIH1cbn1cblxuZXhwb3J0IHsgSGFuZGxlclZpZXcgfTtcbiIsImltcG9ydCB7IEhhbmRsZXJWaWV3IH0gZnJvbSAnLi9IYW5kbGVyVmlldyc7XG5pbXBvcnQgeyBDb250cm9sUGFuZWwgfSBmcm9tICcuL0NvbnRyb2xQYW5lbFZpZXcnO1xuaW1wb3J0IHsgRXZlbnRPYnNlcnZlciB9IGZyb20gJy4uL29ic2VydmVyL29ic2VydmVyJztcbmltcG9ydCB7IHNsaWRlck9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbC9zbGlkZXJPcHRpb25zJztcblxuY2xhc3MgTWFpblZpZXcge1xuICBwdWJsaWMgb2JzZXJ2ZXI6IEV2ZW50T2JzZXJ2ZXI7XG4gIHByaXZhdGUgX3NsaWRlckJvZHk6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9wYXJlbnQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9zZWxlY3RlZFJhbmdlOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfaGFuZGxlcnM6IEhhbmRsZXJWaWV3W107XG4gIHByaXZhdGUgX21pbjogbnVtYmVyO1xuICBwcml2YXRlIF9tYXg6IG51bWJlcjtcbiAgcHJpdmF0ZSBfbWluTWF4OiBudW1iZXJbXTtcbiAgcHJpdmF0ZSBfdmFsdWVzOiBudW1iZXJbXTtcbiAgcHJpdmF0ZSBfY29udHJvbFBhbmVsOiBDb250cm9sUGFuZWw7XG4gIHByaXZhdGUgX3N0ZXA6IG51bWJlcjtcbiAgcHJpdmF0ZSBfaXNWZXJ0aWNhbDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfaGFzUmFuZ2U6IGJvb2xlYW47XG4gIHByaXZhdGUgX21vdXNlTW92ZTogYW55O1xuICBwcml2YXRlIF9tb3VzZVVwOiBhbnk7XG4gIHByaXZhdGUgX2hhbmRsZXJUYXJnZXRJZDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHBhcmVudDogSFRNTEVsZW1lbnQsXG4gICAgaGFzUmFuZ2U6IGJvb2xlYW4sXG4gICAgaXNWZXJ0aWNhbDogYm9vbGVhbixcbiAgICBtaW46IG51bWJlcixcbiAgICBtYXg6IG51bWJlcixcbiAgICB2YWx1ZXM6IG51bWJlcltdLFxuICAgIHN0ZXA6IG51bWJlcixcbiAgKSB7XG4gICAgdGhpcy5vYnNlcnZlciA9IG5ldyBFdmVudE9ic2VydmVyKCk7XG4gICAgdGhpcy5fbWluID0gbWluO1xuICAgIHRoaXMuX21heCA9IG1heDtcbiAgICB0aGlzLl9taW5NYXggPSBbdGhpcy5fbWluLCB0aGlzLl9tYXhdO1xuICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlcztcbiAgICB0aGlzLl9zdGVwID0gc3RlcDtcbiAgICB0aGlzLl9pc1ZlcnRpY2FsID0gaXNWZXJ0aWNhbDtcbiAgICB0aGlzLl9oYXNSYW5nZSA9IGhhc1JhbmdlO1xuICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcbiAgICB0aGlzLl9zbGlkZXJCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fc2VsZWN0ZWRSYW5nZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX2hhbmRsZXJzID0gW107XG4gICAgdGhpcy5fbW91c2VNb3ZlO1xuICAgIHRoaXMuX21vdXNlVXA7XG4gICAgdGhpcy5faGFuZGxlclRhcmdldElkID0gJyc7XG5cbiAgICB0aGlzLl9jb250cm9sUGFuZWwgPSBuZXcgQ29udHJvbFBhbmVsKHRoaXMuX3BhcmVudCwgaGFzUmFuZ2UsIGlzVmVydGljYWwpO1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5taW5NYXhJbnB1dHMuZm9yRWFjaChpbnB1dCA9PlxuICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5ub3RpZnlQcmVzZW50ZXIuYmluZCh0aGlzKSksXG4gICAgKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwudmFsdWVJbnB1dHMuZm9yRWFjaChpbnB1dCA9PlxuICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5ub3RpZnlQcmVzZW50ZXIuYmluZCh0aGlzKSksXG4gICAgKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuc3RlcElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMubm90aWZ5UHJlc2VudGVyLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5vcmllbnRhdGlvblJhZGlvcy5mb3JFYWNoKHJhZGlvID0+XG4gICAgICByYWRpby5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLm5vdGlmeVByZXNlbnRlci5iaW5kKHRoaXMpKSxcbiAgICApO1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5yYW5nZVJhZGlvcy5mb3JFYWNoKHJhZGlvID0+XG4gICAgICByYWRpby5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLm5vdGlmeVByZXNlbnRlci5iaW5kKHRoaXMpKSxcbiAgICApO1xuXG4gICAgdGhpcy5zZXRTbGlkZXJCb2R5KCk7XG4gICAgdGhpcy5zZXRPcmllbnRhdGlvbih0aGlzLl9pc1ZlcnRpY2FsKTtcbiAgICB0aGlzLnNldEhhbmRsZXJzKHRoaXMuX2hhc1JhbmdlKTtcbiAgICB0aGlzLnNldEhhbmRsZXJQb3NpdGlvbih0aGlzLl92YWx1ZXMsIHRoaXMuX2lzVmVydGljYWwpO1xuICAgIHRoaXMuc2V0VmFsdWVzVG9JbnB1dHMoKTtcbiAgICB0aGlzLnNldE1pbk1heFRvSW5wdXRzKCk7XG4gICAgdGhpcy5zZXRTZWxlY3RlZFJhbmdlKCk7XG4gICAgdGhpcy51cGRhdGVTZWxlY3RlZFJhbmdlKCk7XG4gICAgdGhpcy5zZXRPcmllbnRhdGlvblRvUmFkaW8oKTtcbiAgICB0aGlzLnNldFN0ZXBUb0lucHV0KCk7XG4gICAgdGhpcy5zZXRSYW5nZVRvUmFkaW8oKTtcblxuICAgIHRoaXMuX2hhbmRsZXJzLmZvckVhY2goaGFuZGxlciA9PiB7XG4gICAgICBoYW5kbGVyLmVsZW0ub25kcmFnc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfTtcbiAgICAgIGhhbmRsZXIuZWxlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmRyYWdBbmREcm9wLmJpbmQodGhpcykpO1xuICAgIH0pO1xuICB9XG5cbiAgbm90aWZ5UHJlc2VudGVyKCkge1xuICAgIGNvbnN0IG5ld01pbk1heCA9IHRoaXMuX2NvbnRyb2xQYW5lbC5taW5NYXhJbnB1dHMubWFwKGlucHV0ID0+IHBhcnNlSW50KGlucHV0LnZhbHVlKSk7XG4gICAgY29uc3QgbmV3VmFsdWVzID0gdGhpcy5fY29udHJvbFBhbmVsLnZhbHVlSW5wdXRzLm1hcChpbnB1dCA9PiBwYXJzZUludChpbnB1dC52YWx1ZSkpO1xuICAgIGNvbnN0IG5ld09yaWVudGF0aW9uID0gdGhpcy5fY29udHJvbFBhbmVsLm9yaWVudGF0aW9uUmFkaW9zWzBdLmNoZWNrZWQgPyB0cnVlIDogZmFsc2U7XG4gICAgY29uc3QgbmV3U3RlcCA9IHBhcnNlSW50KHRoaXMuX2NvbnRyb2xQYW5lbC5zdGVwSW5wdXQudmFsdWUpO1xuICAgIGNvbnN0IG5ld1JhbmdlID0gdGhpcy5fY29udHJvbFBhbmVsLnJhbmdlUmFkaW9zWzFdLmNoZWNrZWQgPyB0cnVlIDogZmFsc2U7XG4gICAgdGhpcy5vYnNlcnZlci5icm9hZGNhc3Qoe1xuICAgICAgbWluOiBuZXdNaW5NYXhbMF0sXG4gICAgICBtYXg6IG5ld01pbk1heFsxXSxcbiAgICAgIHZhbHVlczogbmV3VmFsdWVzLFxuICAgICAgaXNWZXJ0aWNhbDogbmV3T3JpZW50YXRpb24sXG4gICAgICBzdGVwOiBuZXdTdGVwLFxuICAgICAgaGFzUmFuZ2U6IG5ld1JhbmdlLFxuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlKHZhbHVlRGF0YTogc2xpZGVyT3B0aW9ucykge1xuICAgIHRoaXMuX21pbiA9IHZhbHVlRGF0YS5taW4gPyB2YWx1ZURhdGEubWluIDogdGhpcy5fbWluO1xuICAgIHRoaXMuX21heCA9IHZhbHVlRGF0YS5tYXggPyB2YWx1ZURhdGEubWF4IDogdGhpcy5fbWF4O1xuICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlRGF0YS52YWx1ZXMgPyB2YWx1ZURhdGEudmFsdWVzIDogdGhpcy5fdmFsdWVzO1xuICAgIHRoaXMuX2lzVmVydGljYWwgPSB2YWx1ZURhdGEuaXNWZXJ0aWNhbCAhPT0gdW5kZWZpbmVkID8gdmFsdWVEYXRhLmlzVmVydGljYWwgOiB0aGlzLl9pc1ZlcnRpY2FsO1xuICAgIHRoaXMuX2hhc1JhbmdlID0gdmFsdWVEYXRhLmhhc1JhbmdlICE9PSB1bmRlZmluZWQgPyB2YWx1ZURhdGEuaGFzUmFuZ2UgOiB0aGlzLl9oYXNSYW5nZTtcbiAgICB0aGlzLnVwZGF0ZVJhbmdlKCk7XG4gICAgdGhpcy5zZXRPcmllbnRhdGlvbih0aGlzLl9pc1ZlcnRpY2FsKTtcbiAgICB0aGlzLnNldEhhbmRsZXJQb3NpdGlvbih0aGlzLl92YWx1ZXMsIHRoaXMuX2lzVmVydGljYWwpO1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC52YWx1ZUlucHV0c1swXS52YWx1ZSA9IHRoaXMuX3ZhbHVlc1swXS50b1N0cmluZygpO1xuICAgIGlmICh0aGlzLl9jb250cm9sUGFuZWwudmFsdWVJbnB1dHNbMV0pIHtcbiAgICAgIHRoaXMuX2NvbnRyb2xQYW5lbC52YWx1ZUlucHV0c1sxXS52YWx1ZSA9IHRoaXMuX3ZhbHVlc1sxXS50b1N0cmluZygpO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZVNlbGVjdGVkUmFuZ2UoKTtcbiAgICBpZiAodmFsdWVEYXRhLnN0ZXApIHRoaXMuX3N0ZXAgPSB2YWx1ZURhdGEuc3RlcDtcbiAgfVxuXG4gIHNldFNsaWRlckJvZHkoKSB7XG4gICAgdGhpcy5fc2xpZGVyQm9keS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJCb2R5Jyk7XG4gICAgdGhpcy5fcGFyZW50LmFwcGVuZENoaWxkKHRoaXMuX3NsaWRlckJvZHkpO1xuICB9XG5cbiAgc2V0T3JpZW50YXRpb24oaXNWZXJ0aWNhbDogYm9vbGVhbikge1xuICAgIHRoaXMuX2lzVmVydGljYWwgPSBpc1ZlcnRpY2FsO1xuICAgIGlmIChpc1ZlcnRpY2FsKSB7XG4gICAgICB0aGlzLl9wYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX2hvcml6b250YWwnKTtcbiAgICAgIHRoaXMuX3BhcmVudC5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfdmVydGljYWwnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlcl92ZXJ0aWNhbCcpO1xuICAgICAgdGhpcy5fcGFyZW50LmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9ob3Jpem9udGFsJyk7XG4gICAgfVxuICB9XG5cbiAgc2V0SGFuZGxlcnMoaGFzUmFuZ2U6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oYW5kbGVycy5wdXNoKG5ldyBIYW5kbGVyVmlldyh0aGlzLl9zbGlkZXJCb2R5LCB0aGlzLl9taW4sIHRoaXMuX21heCkpO1xuICAgIGlmIChoYXNSYW5nZSkge1xuICAgICAgdGhpcy5faGFuZGxlcnMucHVzaChuZXcgSGFuZGxlclZpZXcodGhpcy5fc2xpZGVyQm9keSwgdGhpcy5fbWluLCB0aGlzLl9tYXgpKTtcbiAgICAgIHRoaXMuX2hhbmRsZXJzWzBdLmVsZW0uaWQgPSAnaGFuZGxlcl9taW4nO1xuICAgICAgdGhpcy5faGFuZGxlcnNbMV0uZWxlbS5pZCA9ICdoYW5kbGVyX21heCc7XG4gICAgfVxuICB9XG5cbiAgZ2V0SGFuZGxlcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZXJzO1xuICB9XG5cbiAgdXBkYXRlUmFuZ2UoKSB7XG4gICAgaWYgKCF0aGlzLl9oYXNSYW5nZSkge1xuICAgICAgdGhpcy5faGFuZGxlcnNbMV0uZWxlbS5yZW1vdmUoKTtcbiAgICAgIHRoaXMuX2NvbnRyb2xQYW5lbC52YWx1ZUlucHV0c1sxXS5yZW1vdmUoKTtcbiAgICAgIHRoaXMuX3NlbGVjdGVkUmFuZ2UuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWRSYW5nZScpO1xuICAgICAgdGhpcy5fc2VsZWN0ZWRSYW5nZS5jbGFzc0xpc3QucmVtb3ZlKCdyYW5nZV9iZXR3ZWVuJyk7XG4gICAgICB0aGlzLnVwZGF0ZVNlbGVjdGVkUmFuZ2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGFuZGxlcnNbMF0uZWxlbS5hZnRlcih0aGlzLl9oYW5kbGVyc1sxXS5lbGVtKTtcbiAgICAgIHRoaXMuX2NvbnRyb2xQYW5lbC52YWx1ZUlucHV0c1swXS5hZnRlcih0aGlzLl9jb250cm9sUGFuZWwudmFsdWVJbnB1dHNbMV0pO1xuICAgICAgdGhpcy5fc2VsZWN0ZWRSYW5nZS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZFJhbmdlJyk7XG4gICAgICB0aGlzLl9zZWxlY3RlZFJhbmdlLmNsYXNzTGlzdC5hZGQoJ3JhbmdlX2JldHdlZW4nKTtcbiAgICB9XG4gIH1cblxuICBzZXRIYW5kbGVyUG9zaXRpb24odmFsdWVzOiBudW1iZXJbXSwgaXNWZXJ0aWNhbDogYm9vbGVhbikge1xuICAgIHRoaXMuX2hhbmRsZXJzLmZvckVhY2goKGhhbmRsZXIsIGluZGV4KSA9PlxuICAgICAgaGFuZGxlci5zZXRQb3NpdGlvbih2YWx1ZXNbaW5kZXhdLCB0aGlzLl9taW4sIHRoaXMuX21heCwgaXNWZXJ0aWNhbCksXG4gICAgKTtcbiAgfVxuXG4gIHNldFNlbGVjdGVkUmFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VsZWN0ZWRSYW5nZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX3NsaWRlckJvZHkuYXBwZW5kQ2hpbGQodGhpcy5fc2VsZWN0ZWRSYW5nZSk7XG4gICAgdGhpcy5fc2VsZWN0ZWRSYW5nZS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZFJhbmdlJyk7XG4gICAgaWYgKHRoaXMuX2hhc1JhbmdlKSB7XG4gICAgICB0aGlzLl9zZWxlY3RlZFJhbmdlLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkUmFuZ2UnKTtcbiAgICAgIHRoaXMuX3NlbGVjdGVkUmFuZ2UuY2xhc3NMaXN0LmFkZCgncmFuZ2VfYmV0d2VlbicpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVNlbGVjdGVkUmFuZ2UoKSB7XG4gICAgdGhpcy5faXNWZXJ0aWNhbFxuICAgICAgPyAodGhpcy5fc2VsZWN0ZWRSYW5nZS5zdHlsZS5oZWlnaHQgPVxuICAgICAgICAgIHRoaXMuZ2V0Q29vcmRzKHRoaXMuX3NsaWRlckJvZHkpIC0gdGhpcy5nZXRDb29yZHModGhpcy5faGFuZGxlcnNbMF0uZWxlbSkgKyAncHgnKVxuICAgICAgOiAodGhpcy5fc2VsZWN0ZWRSYW5nZS5zdHlsZS53aWR0aCA9IHRoaXMuZ2V0Q29vcmRzKHRoaXMuX2hhbmRsZXJzWzBdLmVsZW0pICsgJ3B4Jyk7XG4gICAgaWYgKHRoaXMuX2hhc1JhbmdlKSB7XG4gICAgICBjb25zdCBwb3NNaW4gPSB0aGlzLl9pc1ZlcnRpY2FsID8gJ2JvdHRvbScgOiAnbGVmdCc7XG4gICAgICBjb25zdCBzaXplID0gdGhpcy5faXNWZXJ0aWNhbCA/ICdoZWlnaHQnIDogJ3dpZHRoJztcbiAgICAgIHRoaXMuX3NlbGVjdGVkUmFuZ2Uuc3R5bGVbcG9zTWluXSA9IHRoaXMuX2lzVmVydGljYWxcbiAgICAgICAgPyB0aGlzLmdldENvb3Jkcyh0aGlzLl9zbGlkZXJCb2R5KSAtIHRoaXMuZ2V0Q29vcmRzKHRoaXMuX2hhbmRsZXJzWzBdLmVsZW0pICsgJ3B4J1xuICAgICAgICA6IHRoaXMuZ2V0Q29vcmRzKHRoaXMuX2hhbmRsZXJzWzBdLmVsZW0pICsgJ3B4JztcbiAgICAgIHRoaXMuX3NlbGVjdGVkUmFuZ2Uuc3R5bGVbc2l6ZV0gPSB0aGlzLl9pc1ZlcnRpY2FsXG4gICAgICAgID8gdGhpcy5nZXRDb29yZHModGhpcy5faGFuZGxlcnNbMF0uZWxlbSkgLSB0aGlzLmdldENvb3Jkcyh0aGlzLl9oYW5kbGVyc1sxXS5lbGVtKSArICdweCdcbiAgICAgICAgOiB0aGlzLmdldENvb3Jkcyh0aGlzLl9oYW5kbGVyc1sxXS5lbGVtKSAtIHRoaXMuZ2V0Q29vcmRzKHRoaXMuX2hhbmRsZXJzWzBdLmVsZW0pICsgJ3B4JztcbiAgICB9XG4gIH1cblxuICBzZXRNaW5NYXhUb0lucHV0cygpIHtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwubWluTWF4SW5wdXRzLm1hcChcbiAgICAgIChpbnB1dCwgaW5kZXgpID0+IChpbnB1dC52YWx1ZSA9IHRoaXMuX21pbk1heFtpbmRleF0udG9TdHJpbmcoKSksXG4gICAgKTtcbiAgfVxuICBzZXRWYWx1ZXNUb0lucHV0cygpIHtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwudmFsdWVJbnB1dHMubWFwKFxuICAgICAgKGlucHV0LCBpbmRleCkgPT4gKGlucHV0LnZhbHVlID0gdGhpcy5fdmFsdWVzW2luZGV4XS50b1N0cmluZygpKSxcbiAgICApO1xuICB9XG5cbiAgc2V0U3RlcFRvSW5wdXQoKSB7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLnN0ZXBJbnB1dC52YWx1ZSA9IHRoaXMuX3N0ZXAudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHNldE9yaWVudGF0aW9uVG9SYWRpbygpIHtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwub3JpZW50YXRpb25SYWRpb3MubWFwKChyYWRpbywgaW5kZXgpID0+XG4gICAgICB0aGlzLl9pc1ZlcnRpY2FsXG4gICAgICAgID8gKHRoaXMuX2NvbnRyb2xQYW5lbC5vcmllbnRhdGlvblJhZGlvc1swXS5jaGVja2VkID0gdHJ1ZSlcbiAgICAgICAgOiAodGhpcy5fY29udHJvbFBhbmVsLm9yaWVudGF0aW9uUmFkaW9zWzFdLmNoZWNrZWQgPSB0cnVlKSxcbiAgICApO1xuICB9XG5cbiAgc2V0UmFuZ2VUb1JhZGlvKCkge1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5yYW5nZVJhZGlvcy5tYXAoKHJhZGlvLCBpbmRleCkgPT5cbiAgICAgIHRoaXMuX2hhc1JhbmdlXG4gICAgICAgID8gKHRoaXMuX2NvbnRyb2xQYW5lbC5yYW5nZVJhZGlvc1sxXS5jaGVja2VkID0gdHJ1ZSlcbiAgICAgICAgOiAodGhpcy5fY29udHJvbFBhbmVsLnJhbmdlUmFkaW9zWzBdLmNoZWNrZWQgPSB0cnVlKSxcbiAgICApO1xuICB9XG5cbiAgZ2V0Q29vcmRzKGVsZW06IEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3QgYm94ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBpZiAodGhpcy5faXNWZXJ0aWNhbCkge1xuICAgICAgcmV0dXJuIGJveC5ib3R0b20gKyBwYWdlWU9mZnNldDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGJveC5sZWZ0ICsgcGFnZVhPZmZzZXQ7XG4gICAgfVxuICB9XG4gIGRyYWdBbmREcm9wKGU6IE1vdXNlRXZlbnQpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgdGhpcy5faGFuZGxlclRhcmdldElkID0gdGFyZ2V0LmlkO1xuICAgIHRoaXMuX21vdXNlTW92ZSA9IHRoaXMub25Nb3VzZU1vdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9tb3VzZVVwID0gdGhpcy5vbk1vdXNlVXAuYmluZCh0aGlzKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9tb3VzZU1vdmUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9tb3VzZVVwKTtcbiAgfVxuXG4gIG9uTW91c2VNb3ZlKGU6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAodGhpcy5faXNWZXJ0aWNhbCkge1xuICAgICAgdGhpcy5tb3ZlQXQoZS5wYWdlWSwgdGhpcy5faGFuZGxlclRhcmdldElkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb3ZlQXQoZS5wYWdlWCwgdGhpcy5faGFuZGxlclRhcmdldElkKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlQXQoY29vcmRpbmF0ZTogbnVtYmVyLCB0YXJnZXRJZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2xpZGVyQ29vcmQgPSB0aGlzLmdldENvb3Jkcyh0aGlzLl9zbGlkZXJCb2R5KTtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2lzVmVydGljYWxcbiAgICAgID8gTWF0aC5yb3VuZCgoKHNsaWRlckNvb3JkIC0gY29vcmRpbmF0ZSkgLyB0aGlzLl9zbGlkZXJCb2R5Lm9mZnNldEhlaWdodCkgKiB0aGlzLl9tYXgpXG4gICAgICA6IE1hdGgucm91bmQoKChjb29yZGluYXRlIC0gc2xpZGVyQ29vcmQpIC8gdGhpcy5fc2xpZGVyQm9keS5vZmZzZXRXaWR0aCkgKiB0aGlzLl9tYXgpO1xuICAgIGlmICghdGFyZ2V0SWQgfHwgdGFyZ2V0SWQgPT09ICdoYW5kbGVyX21pbicpIHtcbiAgICAgIHRoaXMub2JzZXJ2ZXIuYnJvYWRjYXN0KHtcbiAgICAgICAgdmFsdWVzOiBbdmFsdWUsIHRoaXMuX3ZhbHVlc1sxXV0sXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vYnNlcnZlci5icm9hZGNhc3Qoe1xuICAgICAgICB2YWx1ZXM6IFt0aGlzLl92YWx1ZXNbMF0sIHZhbHVlXSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uTW91c2VVcCgpIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9tb3VzZU1vdmUpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uTW91c2VVcCk7XG4gIH1cbn1cblxuZXhwb3J0IHsgTWFpblZpZXcgfTtcbiJdLCJzb3VyY2VSb290IjoiIn0=