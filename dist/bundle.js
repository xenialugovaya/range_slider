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
            ? ((sliderCoord - coordinate) / this._sliderBody.offsetHeight) * (this._max - this._min) +
                this._min
            : ((coordinate - sliderCoord) / this._sliderBody.offsetWidth) * (this._max - this._min) +
                this._min;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9tb2RlbC9NYWluTW9kZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVsL2hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29ic2VydmVyL29ic2VydmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9wcmVzZW50ZXIvRmFjYWRlLnRzIiwid2VicGFjazovLy8uL3NyYy9wcmVzZW50ZXIvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy92aWV3L0NvbnRyb2xQYW5lbFZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXcvSGFuZGxlclZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXcvTWFpblZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7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QUFtQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUQsQ0FBQztDQUNGO0FBRW1CIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHsgRmFjYWRlIH0gZnJvbSAnLi9wcmVzZW50ZXIvRmFjYWRlJztcblxuJChmdW5jdGlvbigpIHtcbiAgJC5mbi5zbGlkZXIgPSBmdW5jdGlvbihvcHRpb25zKTogRmFjYWRlIHtcbiAgICBjb25zdCBmYWNhZGU6IEZhY2FkZSA9IG5ldyBGYWNhZGUodGhpcy5nZXQoMCksIG9wdGlvbnMpO1xuICAgIHJldHVybiBmYWNhZGU7XG4gIH07XG59KTtcbiIsImltcG9ydCB7IEV2ZW50T2JzZXJ2ZXIgfSBmcm9tICcuLi9vYnNlcnZlci9vYnNlcnZlcic7XG5pbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSAnLi9oYW5kbGVyJztcbmltcG9ydCB7IHNsaWRlck9wdGlvbnMgfSBmcm9tICcuL3NsaWRlck9wdGlvbnMnO1xuXG5jbGFzcyBNYWluTW9kZWwge1xuICBwdWJsaWMgb2JzZXJ2ZXI6IEV2ZW50T2JzZXJ2ZXI7XG4gIHByaXZhdGUgX21pbiA9IDA7XG4gIHByaXZhdGUgX21heCA9IDEwMDtcbiAgcHJpdmF0ZSBfc3RlcCA9IDE7XG4gIHByaXZhdGUgX3ZhbHVlcyA9IFsxMCwgMjBdO1xuICBwcml2YXRlIF9pc1ZlcnRpY2FsID0gZmFsc2U7XG4gIHByaXZhdGUgX2hhc1JhbmdlID0gdHJ1ZTtcbiAgcHJpdmF0ZSBfaGFzTGFiZWxzID0gZmFsc2U7XG4gIHByaXZhdGUgX2hhbmRsZXJzOiBIYW5kbGVyW10gPSBbXTtcbiAgY29uc3RydWN0b3Ioc2xpZGVyT3B0aW9uczogc2xpZGVyT3B0aW9ucykge1xuICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgRXZlbnRPYnNlcnZlcigpO1xuICAgIHRoaXMuX21pbiA9IHNsaWRlck9wdGlvbnMubWluID8gc2xpZGVyT3B0aW9ucy5taW4gOiAwO1xuICAgIHRoaXMuX21heCA9IHNsaWRlck9wdGlvbnMubWF4ID8gc2xpZGVyT3B0aW9ucy5tYXggOiB0aGlzLl9tYXg7XG4gICAgdGhpcy5fc3RlcCA9IHNsaWRlck9wdGlvbnMuc3RlcCA/IHNsaWRlck9wdGlvbnMuc3RlcCA6IHRoaXMuX3N0ZXA7XG4gICAgdGhpcy5fdmFsdWVzID0gc2xpZGVyT3B0aW9ucy52YWx1ZXMgPyBzbGlkZXJPcHRpb25zLnZhbHVlcyA6IHRoaXMuX3ZhbHVlcztcbiAgICB0aGlzLl9oYXNSYW5nZSA9IHNsaWRlck9wdGlvbnMuaGFzUmFuZ2UgPyBzbGlkZXJPcHRpb25zLmhhc1JhbmdlIDogdGhpcy5faGFzUmFuZ2U7XG4gICAgdGhpcy5faXNWZXJ0aWNhbCA9IHNsaWRlck9wdGlvbnMuaXNWZXJ0aWNhbCA/IHNsaWRlck9wdGlvbnMuaXNWZXJ0aWNhbCA6IHRoaXMuX2lzVmVydGljYWw7XG4gICAgdGhpcy5faGFzTGFiZWxzID0gc2xpZGVyT3B0aW9ucy5oYXNMYWJlbHMgPyBzbGlkZXJPcHRpb25zLmhhc0xhYmVscyA6IHRoaXMuX2hhc0xhYmVscztcbiAgfVxuXG4gIG5vdGlmeVByZXNlbnRlcih2YWx1ZURhdGE6IHNsaWRlck9wdGlvbnMpIHtcbiAgICB0aGlzLm9ic2VydmVyLmJyb2FkY2FzdCh2YWx1ZURhdGEpO1xuICB9XG5cbiAgZ2V0IG1pbigpOiBudW1iZXIge1xuICAgIHRoaXMuX21pbiA9IE1hdGgucm91bmQodGhpcy5fbWluIC8gdGhpcy5fc3RlcCkgKiB0aGlzLl9zdGVwO1xuICAgIHJldHVybiB0aGlzLl9taW47XG4gIH1cblxuICBzZXQgbWluKG1pbjogbnVtYmVyKSB7XG4gICAgdGhpcy5fbWluID0gbWluO1xuICAgIHRoaXMubm90aWZ5UHJlc2VudGVyKHtcbiAgICAgIG1pbjogdGhpcy5taW4sXG4gICAgICB2YWx1ZXM6IHRoaXMucmFuZ2VWYWx1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBtYXgoKTogbnVtYmVyIHtcbiAgICB0aGlzLl9tYXggPSBNYXRoLnJvdW5kKHRoaXMuX21heCAvIHRoaXMuX3N0ZXApICogdGhpcy5fc3RlcDtcbiAgICByZXR1cm4gdGhpcy5fbWF4O1xuICB9XG5cbiAgc2V0IG1heChtYXg6IG51bWJlcikge1xuICAgIHRoaXMuX21heCA9IG1heDtcbiAgICB0aGlzLm5vdGlmeVByZXNlbnRlcih7XG4gICAgICBtYXg6IHRoaXMubWF4LFxuICAgICAgdmFsdWVzOiB0aGlzLnJhbmdlVmFsdWUsXG4gICAgfSk7XG4gIH1cblxuICBnZXQgc3RlcCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9zdGVwO1xuICB9XG5cbiAgc2V0IHN0ZXAoc3RlcDogbnVtYmVyKSB7XG4gICAgdGhpcy5fc3RlcCA9IHN0ZXA7XG4gICAgdGhpcy5ub3RpZnlQcmVzZW50ZXIoe1xuICAgICAgc3RlcDogdGhpcy5fc3RlcCxcbiAgICAgIHZhbHVlczogdGhpcy5yYW5nZVZhbHVlLFxuICAgIH0pO1xuICB9XG4gIC8v0L3QtSDQuNGB0L/QvtC70YzQt9GD0LXRgtGB0Y8hXG4gIGdldCBzaW5nbGVWYWx1ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNhbGNWYWx1ZXModGhpcy5fdmFsdWVzKVswXTtcbiAgfVxuICAvL9C90LUg0LjRgdC/0L7Qu9GM0LfRg9C10YLRgdGPIVxuICBzZXQgc2luZ2xlVmFsdWUodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3ZhbHVlc1swXSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHJhbmdlVmFsdWUoKTogbnVtYmVyW10ge1xuICAgIHJldHVybiB0aGlzLmNhbGNWYWx1ZXModGhpcy5fdmFsdWVzKTtcbiAgfVxuXG4gIHNldCByYW5nZVZhbHVlKHZhbHVlczogbnVtYmVyW10pIHtcbiAgICB0aGlzLl92YWx1ZXMgPSB2YWx1ZXM7XG4gICAgdGhpcy5ub3RpZnlQcmVzZW50ZXIoe1xuICAgICAgdmFsdWVzOiB0aGlzLmNhbGNWYWx1ZXModGhpcy5fdmFsdWVzKSxcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBpc1ZlcnRpY2FsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc1ZlcnRpY2FsO1xuICB9XG5cbiAgc2V0IGlzVmVydGljYWwodmVydGljYWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pc1ZlcnRpY2FsID0gdmVydGljYWw7XG4gICAgdGhpcy5ub3RpZnlQcmVzZW50ZXIoe1xuICAgICAgdmFsdWVzOiB0aGlzLnJhbmdlVmFsdWUsXG4gICAgICBpc1ZlcnRpY2FsOiB0aGlzLl9pc1ZlcnRpY2FsLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0IGhhc1JhbmdlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oYXNSYW5nZTtcbiAgfVxuXG4gIHNldCBoYXNSYW5nZShyYW5nZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2hhc1JhbmdlID0gcmFuZ2U7XG4gICAgdGhpcy5ub3RpZnlQcmVzZW50ZXIoe1xuICAgICAgdmFsdWVzOiB0aGlzLnJhbmdlVmFsdWUsXG4gICAgICBoYXNSYW5nZTogdGhpcy5faGFzUmFuZ2UsXG4gICAgfSk7XG4gIH1cblxuICAvL2NoZWNrIHRoYXQgdmFsdWVzIG9mIGhhbmRsZXJzIGFyZSB3aXRoaW4gbWluIGFuZCBtYXhcbiAgLy9jaGVjayB0aGF0IHZhbHVlIDAgaXMgbGVzcyB0aGFuIHZhbHVlIDEgZm9yIHJhbmdlXG4gIGNhbGNWYWx1ZXModmFsdWVzOiBudW1iZXJbXSk6IG51bWJlcltdIHtcbiAgICB2YWx1ZXMgPSB2YWx1ZXMubWFwKHZhbHVlID0+IE1hdGgucm91bmQodmFsdWUgLyB0aGlzLl9zdGVwKSAqIHRoaXMuX3N0ZXApO1xuICAgIGlmICh2YWx1ZXNbMF0gPiB2YWx1ZXNbMV0pIFt2YWx1ZXNbMF0sIHZhbHVlc1sxXV0gPSBbdmFsdWVzWzFdLCB2YWx1ZXNbMF1dO1xuICAgIHZhbHVlcyA9IHZhbHVlcy5tYXAodmFsdWUgPT5cbiAgICAgIHZhbHVlIDwgdGhpcy5fbWluID8gdGhpcy5fbWluIDogdmFsdWUgPiB0aGlzLl9tYXggPyB0aGlzLl9tYXggOiB2YWx1ZSxcbiAgICApO1xuXG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfVxuXG4gIC8vY3JlYXRlIGhhbmRsZXJzIGRlcGVuZGluZyBvbiByYW5nZS4gbm90IHVzZWRcbiAgc2V0SGFuZGxlcnModmFsdWVzOiBudW1iZXJbXSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9oYXNSYW5nZSkge1xuICAgICAgdGhpcy5faGFuZGxlcnMgPSBbbmV3IEhhbmRsZXIodmFsdWVzWzBdKSwgbmV3IEhhbmRsZXIodmFsdWVzWzFdKV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hhbmRsZXJzID0gW25ldyBIYW5kbGVyKHZhbHVlc1swXSldO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyBNYWluTW9kZWwgfTtcbiIsImNsYXNzIEhhbmRsZXIge1xuICBwcml2YXRlIF9wb3NpdGlvbjogbnVtYmVyO1xuICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgdGhpcy5fcG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgfVxuXG4gIGdldCBwb3NpdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbjtcbiAgfVxuXG4gIHNldCBwb3NpdGlvbih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fcG9zaXRpb24gPSB2YWx1ZTtcbiAgfVxufVxuXG5leHBvcnQgeyBIYW5kbGVyIH07XG4iLCJjbGFzcyBFdmVudE9ic2VydmVyIHtcbiAgcHJpdmF0ZSBfb2JzZXJ2ZXJzOiBGdW5jdGlvbltdO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9vYnNlcnZlcnMgPSBbXTtcbiAgfVxuICBzdWJzY3JpYmUoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fb2JzZXJ2ZXJzLnB1c2goZm4pO1xuICB9XG4gIHVuc3Vic2NyaWJlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMuX29ic2VydmVycyA9IHRoaXMuX29ic2VydmVycy5maWx0ZXIoc3Vic2NyaWJlciA9PiBzdWJzY3JpYmVyICE9PSBmbik7XG4gIH1cbiAgYnJvYWRjYXN0KGRhdGE6IG9iamVjdCk6IHZvaWQge1xuICAgIHRoaXMuX29ic2VydmVycy5mb3JFYWNoKHN1YnNjcmliZXIgPT4gc3Vic2NyaWJlcihkYXRhKSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgRXZlbnRPYnNlcnZlciB9O1xuIiwiaW1wb3J0IHsgTWFpbk1vZGVsIH0gZnJvbSAnLi4vbW9kZWwvTWFpbk1vZGVsJztcbmltcG9ydCB7IFByZXNlbnRlciB9IGZyb20gJy4vUHJlc2VudGVyJztcbmltcG9ydCB7IHNsaWRlck9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbC9zbGlkZXJPcHRpb25zJztcblxuY2xhc3MgRmFjYWRlIHtcbiAgcHJpdmF0ZSBfbW9kZWw6IE1haW5Nb2RlbDtcbiAgcHJpdmF0ZSBfcHJlc2VudGVyOiBQcmVzZW50ZXI7XG5cbiAgY29uc3RydWN0b3IocGFyZW50OiBIVE1MRWxlbWVudCwgc2xpZGVyT3B0aW9uczogc2xpZGVyT3B0aW9ucykge1xuICAgIHRoaXMuX21vZGVsID0gbmV3IE1haW5Nb2RlbChzbGlkZXJPcHRpb25zKTtcbiAgICB0aGlzLl9wcmVzZW50ZXIgPSBuZXcgUHJlc2VudGVyKHBhcmVudCwgdGhpcy5fbW9kZWwpO1xuICAgIHRoaXMuX3ByZXNlbnRlci5zZXRTdGVwVG9JbnB1dCgpO1xuICB9XG5cbiAgZ2V0IHNpbmdsZVZhbHVlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLnNpbmdsZVZhbHVlO1xuICB9XG5cbiAgc2V0IHNpbmdsZVZhbHVlKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9tb2RlbC5zaW5nbGVWYWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHJhbmdlVmFsdWUoKTogbnVtYmVyW10ge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5yYW5nZVZhbHVlO1xuICB9XG5cbiAgc2V0IHJhbmdlVmFsdWUodmFsdWU6IG51bWJlcltdKSB7XG4gICAgdGhpcy5fbW9kZWwucmFuZ2VWYWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHN0ZXAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuc3RlcDtcbiAgfVxuXG4gIHNldCBzdGVwKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9tb2RlbC5zdGVwID0gdmFsdWU7XG4gIH1cblxuICBnZXQgaXNWZXJ0aWNhbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuaXNWZXJ0aWNhbDtcbiAgfVxuXG4gIHNldCBpc1ZlcnRpY2FsKHZlcnRpY2FsOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbW9kZWwuaXNWZXJ0aWNhbCA9IHZlcnRpY2FsO1xuICB9XG59XG5cbmV4cG9ydCB7IEZhY2FkZSB9O1xuIiwiaW1wb3J0IHsgTWFpbk1vZGVsIH0gZnJvbSAnLi4vbW9kZWwvTWFpbk1vZGVsJztcbmltcG9ydCB7IE1haW5WaWV3IH0gZnJvbSAnLi4vdmlldy9NYWluVmlldyc7XG5pbXBvcnQgeyBzbGlkZXJPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWwvc2xpZGVyT3B0aW9ucyc7XG5cbmNsYXNzIFByZXNlbnRlciB7XG4gIHByaXZhdGUgX21vZGVsOiBNYWluTW9kZWw7XG4gIHByaXZhdGUgX3ZpZXc6IE1haW5WaWV3O1xuICBwcml2YXRlIF92YWx1ZXM6IG51bWJlcltdO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmVudDogSFRNTEVsZW1lbnQsIG1vZGVsOiBNYWluTW9kZWwpIHtcbiAgICB0aGlzLl9tb2RlbCA9IG1vZGVsO1xuICAgIHRoaXMuX3ZhbHVlcyA9IHRoaXMuX21vZGVsLnJhbmdlVmFsdWU7XG4gICAgdGhpcy5fdmlldyA9IG5ldyBNYWluVmlldyhcbiAgICAgIHBhcmVudCxcbiAgICAgIHRoaXMuX21vZGVsLmhhc1JhbmdlLFxuICAgICAgdGhpcy5fbW9kZWwuaXNWZXJ0aWNhbCxcbiAgICAgIHRoaXMuX21vZGVsLm1pbixcbiAgICAgIHRoaXMuX21vZGVsLm1heCxcbiAgICAgIHRoaXMuX3ZhbHVlcyxcbiAgICAgIHRoaXMuX21vZGVsLnN0ZXAsXG4gICAgKTtcbiAgICB0aGlzLnVwZGF0ZU1vZGVsKCk7XG4gICAgdGhpcy51cGRhdGVWaWV3KCk7XG4gIH1cblxuICB1cGRhdGVNb2RlbCgpIHtcbiAgICB0aGlzLl92aWV3Lm9ic2VydmVyLnN1YnNjcmliZSgodmFsdWVEYXRhOiBzbGlkZXJPcHRpb25zKSA9PiB7XG4gICAgICBpZiAodmFsdWVEYXRhLm1pbikgdGhpcy5fbW9kZWwubWluID0gdmFsdWVEYXRhLm1pbjtcbiAgICAgIGlmICh2YWx1ZURhdGEubWF4KSB0aGlzLl9tb2RlbC5tYXggPSB2YWx1ZURhdGEubWF4O1xuICAgICAgaWYgKHZhbHVlRGF0YS52YWx1ZXMpIHRoaXMuX21vZGVsLnJhbmdlVmFsdWUgPSB2YWx1ZURhdGEudmFsdWVzO1xuICAgICAgaWYgKHZhbHVlRGF0YS5pc1ZlcnRpY2FsICE9PSB1bmRlZmluZWQpIHRoaXMuX21vZGVsLmlzVmVydGljYWwgPSB2YWx1ZURhdGEuaXNWZXJ0aWNhbDtcbiAgICAgIGlmICh2YWx1ZURhdGEuc3RlcCkgdGhpcy5fbW9kZWwuc3RlcCA9IHZhbHVlRGF0YS5zdGVwO1xuICAgICAgaWYgKHZhbHVlRGF0YS5oYXNSYW5nZSAhPT0gdW5kZWZpbmVkKSB0aGlzLl9tb2RlbC5oYXNSYW5nZSA9IHZhbHVlRGF0YS5oYXNSYW5nZTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVZpZXcoKSB7XG4gICAgdGhpcy5fbW9kZWwub2JzZXJ2ZXIuc3Vic2NyaWJlKCh2YWx1ZURhdGE6IHNsaWRlck9wdGlvbnMpID0+IHtcbiAgICAgIHRoaXMuX3ZpZXcudXBkYXRlKHZhbHVlRGF0YSk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRTdGVwVG9JbnB1dCgpIHtcbiAgICB0aGlzLl92aWV3LnNldFN0ZXBUb0lucHV0KCk7XG4gIH1cbn1cblxuZXhwb3J0IHsgUHJlc2VudGVyIH07XG4iLCJjbGFzcyBDb250cm9sUGFuZWwge1xuICBwcml2YXRlIF9wYXJlbnQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9jb250cm9sUGFuZWw6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9taW5NYXhJbnB1dHM6IEhUTUxJbnB1dEVsZW1lbnRbXTtcbiAgcHJpdmF0ZSBfdmFsdWVJbnB1dHM6IEhUTUxJbnB1dEVsZW1lbnRbXTtcbiAgcHJpdmF0ZSBfc3RlcElucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuICBwcml2YXRlIF9vcmllbnRhdGlvblJhZGlvczogSFRNTElucHV0RWxlbWVudFtdO1xuICBwcml2YXRlIF9yYW5nZVJhZGlvczogSFRNTElucHV0RWxlbWVudFtdO1xuICBwcml2YXRlIF9oYXNSYW5nZTogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfaXNWZXJ0aWNhbDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihwYXJlbnQ6IEhUTUxFbGVtZW50LCBoYXNSYW5nZTogYm9vbGVhbiwgaXNWZXJ0aWNhbDogYm9vbGVhbikge1xuICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuY2xhc3NMaXN0LmFkZCgnY29udHJvbFBhbmVsJyk7XG4gICAgdGhpcy5fcGFyZW50LmFmdGVyKHRoaXMuX2NvbnRyb2xQYW5lbCk7XG4gICAgdGhpcy5fdmFsdWVJbnB1dHMgPSBbXTtcbiAgICB0aGlzLl9taW5NYXhJbnB1dHMgPSBbXTtcbiAgICB0aGlzLl9zdGVwSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRoaXMuX29yaWVudGF0aW9uUmFkaW9zID0gW107XG4gICAgdGhpcy5fcmFuZ2VSYWRpb3MgPSBbXTtcbiAgICB0aGlzLl9oYXNSYW5nZSA9IGhhc1JhbmdlO1xuICAgIHRoaXMuX2lzVmVydGljYWwgPSBpc1ZlcnRpY2FsO1xuICAgIHRoaXMuY3JlYXRlTWF4TWluSW5wdXRzKCk7XG4gICAgdGhpcy5jcmVhdGVWYWx1ZUlucHV0cygpO1xuICAgIHRoaXMuY3JlYXRlU3RlcElucHV0KCk7XG4gICAgdGhpcy5jcmVhdGVPcmllbnRhdGlvblJhZGlvcygpO1xuICAgIHRoaXMuY3JlYXRlUmFuZ2VSYWRpb3MoKTtcbiAgfVxuXG4gIGNyZWF0ZU1heE1pbklucHV0cygpIHtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKHRpdGxlKTtcbiAgICB0aXRsZS5pbm5lclRleHQgPSAn0JzQuNC9LiDQt9C90LDRh9C10L3QuNC1L9Cc0LDQutGBLiDQt9C90LDRh9C10L3QuNC1JztcbiAgICBjb25zdCBpbnB1dE1pbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgY29uc3QgaW5wdXRNYXggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGlucHV0TWluLmNsYXNzTGlzdC5hZGQoJ2xpbWl0VmFsdWUnKTtcbiAgICBpbnB1dE1heC5jbGFzc0xpc3QuYWRkKCdsaW1pdFZhbHVlJyk7XG4gICAgaW5wdXRNaW4udHlwZSA9ICdudW1iZXInO1xuICAgIGlucHV0TWF4LnR5cGUgPSAnbnVtYmVyJztcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKGlucHV0TWluKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKGlucHV0TWF4KTtcbiAgICB0aGlzLl9taW5NYXhJbnB1dHMgPSBbaW5wdXRNaW4sIGlucHV0TWF4XTtcbiAgfVxuXG4gIGdldCBtaW5NYXhJbnB1dHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21pbk1heElucHV0cztcbiAgfVxuXG4gIGNyZWF0ZVZhbHVlSW5wdXRzKCkge1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQodGl0bGUpO1xuICAgIHRpdGxlLmlubmVyVGV4dCA9ICfQl9C90LDRh9C10L3QuNC1INCx0LXQs9GD0L3QutC+0LInO1xuICAgIGNvbnN0IGlucHV0U2luZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBpbnB1dFNpbmdsZS5jbGFzc0xpc3QuYWRkKCdoYW5kbGVyVmFsdWUnKTtcbiAgICBpbnB1dFNpbmdsZS50eXBlID0gJ251bWJlcic7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZChpbnB1dFNpbmdsZSk7XG4gICAgdGhpcy5fdmFsdWVJbnB1dHMucHVzaChpbnB1dFNpbmdsZSk7XG4gICAgaWYgKHRoaXMuX2hhc1JhbmdlKSB7XG4gICAgICBjb25zdCBpbnB1dE1pbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oYW5kbGVyVmFsdWUnKTtcbiAgICAgIGlmIChpbnB1dE1pbikgaW5wdXRNaW4uY2xhc3NMaXN0LmFkZCgndmFsdWVfbWluJyk7XG4gICAgICBjb25zdCBpbnB1dE1heCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICBpbnB1dE1heC5jbGFzc0xpc3QuYWRkKCdoYW5kbGVyVmFsdWUnLCAndmFsdWVfbWF4Jyk7XG4gICAgICBpbnB1dE1heC50eXBlID0gJ251bWJlcic7XG4gICAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKGlucHV0TWF4KTtcbiAgICAgIHRoaXMuX3ZhbHVlSW5wdXRzLnB1c2goaW5wdXRNYXgpO1xuICAgIH1cbiAgfVxuICBnZXQgdmFsdWVJbnB1dHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlSW5wdXRzO1xuICB9XG5cbiAgY3JlYXRlU3RlcElucHV0KCkge1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQodGl0bGUpO1xuICAgIHRpdGxlLmlubmVyVGV4dCA9ICfQl9C90LDRh9C10L3QuNC1INGI0LDQs9CwJztcbiAgICB0aGlzLl9zdGVwSW5wdXQuY2xhc3NMaXN0LmFkZCgnc3RlcFZhbHVlJyk7XG4gICAgdGhpcy5fc3RlcElucHV0LnR5cGUgPSAnbnVtYmVyJztcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKHRoaXMuX3N0ZXBJbnB1dCk7XG4gIH1cblxuICBnZXQgc3RlcElucHV0KCkge1xuICAgIHJldHVybiB0aGlzLl9zdGVwSW5wdXQ7XG4gIH1cblxuICBjcmVhdGVPcmllbnRhdGlvblJhZGlvcygpIHtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKHRpdGxlKTtcbiAgICB0aXRsZS5pbm5lclRleHQgPSAn0JLQtdGA0YLQuNC60LDQu9GM0L3Ri9C5L9Cz0L7RgNC40LfQvtC90YLQsNC70YzQvdGL0LknO1xuICAgIGNvbnN0IHJhZGlvVmVydGljYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHJhZGlvVmVydGljYWwuaWQgPSAncmFkaW9fdmVydGljYWwnO1xuICAgIGNvbnN0IHJhZGlvSG9yaXpvbnRhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgcmFkaW9Ib3Jpem9udGFsLmlkID0gJ3JhZGlvX2hvcml6b250YWwnO1xuICAgIHRoaXMuX29yaWVudGF0aW9uUmFkaW9zID0gW3JhZGlvVmVydGljYWwsIHJhZGlvSG9yaXpvbnRhbF07XG4gICAgdGhpcy5fb3JpZW50YXRpb25SYWRpb3MuZm9yRWFjaChyYWRpbyA9PiB7XG4gICAgICByYWRpby50eXBlID0gJ3JhZGlvJztcbiAgICAgIHJhZGlvLm5hbWUgPSAnb3JpZW50YXRpb24nO1xuICAgICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZChyYWRpbyk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgb3JpZW50YXRpb25SYWRpb3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX29yaWVudGF0aW9uUmFkaW9zO1xuICB9XG5cbiAgY3JlYXRlUmFuZ2VSYWRpb3MoKSB7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZCh0aXRsZSk7XG4gICAgdGl0bGUuaW5uZXJUZXh0ID0gJ9Ce0LTQuNC90L7Rh9C90L7QtS/QuNC90YLQtdGA0LLQsNC7JztcbiAgICBjb25zdCByYWRpb1NpbmdsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgcmFkaW9TaW5nbGUuaWQgPSAncmFkaW9fc2luZ2xlJztcbiAgICBjb25zdCByYWRpb0RvdWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgcmFkaW9Eb3VibGUuaWQgPSAncmFkaW9fZG91YmxlJztcbiAgICB0aGlzLl9yYW5nZVJhZGlvcyA9IFtyYWRpb1NpbmdsZSwgcmFkaW9Eb3VibGVdO1xuICAgIHRoaXMuX3JhbmdlUmFkaW9zLmZvckVhY2gocmFkaW8gPT4ge1xuICAgICAgcmFkaW8udHlwZSA9ICdyYWRpbyc7XG4gICAgICByYWRpby5uYW1lID0gJ3JhbmdlJztcbiAgICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQocmFkaW8pO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0IHJhbmdlUmFkaW9zKCkge1xuICAgIHJldHVybiB0aGlzLl9yYW5nZVJhZGlvcztcbiAgfVxufVxuXG5leHBvcnQgeyBDb250cm9sUGFuZWwgfTtcbiIsImNsYXNzIEhhbmRsZXJWaWV3IHtcbiAgcHJpdmF0ZSBfaGFuZGxlcjogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX3BhcmVudDogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IocGFyZW50OiBIVE1MRWxlbWVudCwgbWluTGltaXQ6IG51bWJlciwgbWF4TGltaXQ6IG51bWJlcikge1xuICAgIHRoaXMuX2hhbmRsZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9oYW5kbGVyLmNsYXNzTGlzdC5hZGQoJ2hhbmRsZXInKTtcbiAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5fcGFyZW50LmFwcGVuZCh0aGlzLl9oYW5kbGVyKTtcbiAgfVxuXG4gIHNldFBvc2l0aW9uKHZhbHVlOiBudW1iZXIsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlciwgaXNWZXJ0aWNhbDogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IHZhbHVlc0NvdW50ID0gbWF4IC0gbWluO1xuICAgIGNvbnN0IHBvc2l0aW9uUHJvcGVydHkgPSBpc1ZlcnRpY2FsID8gJ2JvdHRvbScgOiAnbGVmdCc7XG4gICAgY29uc3QgaGFuZGxlclNpemUgPSBpc1ZlcnRpY2FsXG4gICAgICA/ICh0aGlzLl9oYW5kbGVyLm9mZnNldEhlaWdodCAvIHRoaXMuX3BhcmVudC5vZmZzZXRIZWlnaHQpICogMTAwXG4gICAgICA6ICh0aGlzLl9oYW5kbGVyLm9mZnNldFdpZHRoIC8gdGhpcy5fcGFyZW50Lm9mZnNldFdpZHRoKSAqIDEwMDtcbiAgICBjb25zdCBwb3NpdGlvbiA9ICgodmFsdWUgLSBtaW4pIC8gdmFsdWVzQ291bnQpICogMTAwIC0gaGFuZGxlclNpemUgLyAyO1xuICAgIHRoaXMuX2hhbmRsZXIuc3R5bGVbcG9zaXRpb25Qcm9wZXJ0eV0gPSBgJHtwb3NpdGlvbn0lYDtcbiAgfVxuXG4gIGdldCBlbGVtKCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVyO1xuICB9XG59XG5cbmV4cG9ydCB7IEhhbmRsZXJWaWV3IH07XG4iLCJpbXBvcnQgeyBIYW5kbGVyVmlldyB9IGZyb20gJy4vSGFuZGxlclZpZXcnO1xuaW1wb3J0IHsgQ29udHJvbFBhbmVsIH0gZnJvbSAnLi9Db250cm9sUGFuZWxWaWV3JztcbmltcG9ydCB7IEV2ZW50T2JzZXJ2ZXIgfSBmcm9tICcuLi9vYnNlcnZlci9vYnNlcnZlcic7XG5pbXBvcnQgeyBzbGlkZXJPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWwvc2xpZGVyT3B0aW9ucyc7XG5cbmNsYXNzIE1haW5WaWV3IHtcbiAgcHVibGljIG9ic2VydmVyOiBFdmVudE9ic2VydmVyO1xuICBwcml2YXRlIF9zbGlkZXJCb2R5OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfcGFyZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfc2VsZWN0ZWRSYW5nZTogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX2hhbmRsZXJzOiBIYW5kbGVyVmlld1tdO1xuICBwcml2YXRlIF9taW46IG51bWJlcjtcbiAgcHJpdmF0ZSBfbWF4OiBudW1iZXI7XG4gIHByaXZhdGUgX21pbk1heDogbnVtYmVyW107XG4gIHByaXZhdGUgX3ZhbHVlczogbnVtYmVyW107XG4gIHByaXZhdGUgX2NvbnRyb2xQYW5lbDogQ29udHJvbFBhbmVsO1xuICBwcml2YXRlIF9zdGVwOiBudW1iZXI7XG4gIHByaXZhdGUgX2lzVmVydGljYWw6IGJvb2xlYW47XG4gIHByaXZhdGUgX2hhc1JhbmdlOiBib29sZWFuO1xuICBwcml2YXRlIF9tb3VzZU1vdmU6IGFueTtcbiAgcHJpdmF0ZSBfbW91c2VVcDogYW55O1xuICBwcml2YXRlIF9oYW5kbGVyVGFyZ2V0SWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwYXJlbnQ6IEhUTUxFbGVtZW50LFxuICAgIGhhc1JhbmdlOiBib29sZWFuLFxuICAgIGlzVmVydGljYWw6IGJvb2xlYW4sXG4gICAgbWluOiBudW1iZXIsXG4gICAgbWF4OiBudW1iZXIsXG4gICAgdmFsdWVzOiBudW1iZXJbXSxcbiAgICBzdGVwOiBudW1iZXIsXG4gICkge1xuICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgRXZlbnRPYnNlcnZlcigpO1xuICAgIHRoaXMuX21pbiA9IG1pbjtcbiAgICB0aGlzLl9tYXggPSBtYXg7XG4gICAgdGhpcy5fbWluTWF4ID0gW3RoaXMuX21pbiwgdGhpcy5fbWF4XTtcbiAgICB0aGlzLl92YWx1ZXMgPSB2YWx1ZXM7XG4gICAgdGhpcy5fc3RlcCA9IHN0ZXA7XG4gICAgdGhpcy5faXNWZXJ0aWNhbCA9IGlzVmVydGljYWw7XG4gICAgdGhpcy5faGFzUmFuZ2UgPSBoYXNSYW5nZTtcbiAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5fc2xpZGVyQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX3NlbGVjdGVkUmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9oYW5kbGVycyA9IFtdO1xuICAgIHRoaXMuX21vdXNlTW92ZTtcbiAgICB0aGlzLl9tb3VzZVVwO1xuICAgIHRoaXMuX2hhbmRsZXJUYXJnZXRJZCA9ICcnO1xuXG4gICAgdGhpcy5fY29udHJvbFBhbmVsID0gbmV3IENvbnRyb2xQYW5lbCh0aGlzLl9wYXJlbnQsIGhhc1JhbmdlLCBpc1ZlcnRpY2FsKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwubWluTWF4SW5wdXRzLmZvckVhY2goaW5wdXQgPT5cbiAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMubm90aWZ5UHJlc2VudGVyLmJpbmQodGhpcykpLFxuICAgICk7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLnZhbHVlSW5wdXRzLmZvckVhY2goaW5wdXQgPT5cbiAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMubm90aWZ5UHJlc2VudGVyLmJpbmQodGhpcykpLFxuICAgICk7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLnN0ZXBJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLm5vdGlmeVByZXNlbnRlci5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwub3JpZW50YXRpb25SYWRpb3MuZm9yRWFjaChyYWRpbyA9PlxuICAgICAgcmFkaW8uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5ub3RpZnlQcmVzZW50ZXIuYmluZCh0aGlzKSksXG4gICAgKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwucmFuZ2VSYWRpb3MuZm9yRWFjaChyYWRpbyA9PlxuICAgICAgcmFkaW8uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5ub3RpZnlQcmVzZW50ZXIuYmluZCh0aGlzKSksXG4gICAgKTtcblxuICAgIHRoaXMuc2V0U2xpZGVyQm9keSgpO1xuICAgIHRoaXMuc2V0T3JpZW50YXRpb24odGhpcy5faXNWZXJ0aWNhbCk7XG4gICAgdGhpcy5zZXRIYW5kbGVycyh0aGlzLl9oYXNSYW5nZSk7XG4gICAgdGhpcy5zZXRIYW5kbGVyUG9zaXRpb24odGhpcy5fdmFsdWVzLCB0aGlzLl9pc1ZlcnRpY2FsKTtcbiAgICB0aGlzLnNldFZhbHVlc1RvSW5wdXRzKCk7XG4gICAgdGhpcy5zZXRNaW5NYXhUb0lucHV0cygpO1xuICAgIHRoaXMuc2V0U2VsZWN0ZWRSYW5nZSgpO1xuICAgIHRoaXMudXBkYXRlU2VsZWN0ZWRSYW5nZSgpO1xuICAgIHRoaXMuc2V0T3JpZW50YXRpb25Ub1JhZGlvKCk7XG4gICAgdGhpcy5zZXRTdGVwVG9JbnB1dCgpO1xuICAgIHRoaXMuc2V0UmFuZ2VUb1JhZGlvKCk7XG5cbiAgICB0aGlzLl9oYW5kbGVycy5mb3JFYWNoKGhhbmRsZXIgPT4ge1xuICAgICAgaGFuZGxlci5lbGVtLm9uZHJhZ3N0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH07XG4gICAgICBoYW5kbGVyLmVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5kcmFnQW5kRHJvcC5iaW5kKHRoaXMpKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5vdGlmeVByZXNlbnRlcigpIHtcbiAgICBjb25zdCBuZXdNaW5NYXggPSB0aGlzLl9jb250cm9sUGFuZWwubWluTWF4SW5wdXRzLm1hcChpbnB1dCA9PiBwYXJzZUludChpbnB1dC52YWx1ZSkpO1xuICAgIGNvbnN0IG5ld1ZhbHVlcyA9IHRoaXMuX2NvbnRyb2xQYW5lbC52YWx1ZUlucHV0cy5tYXAoaW5wdXQgPT4gcGFyc2VJbnQoaW5wdXQudmFsdWUpKTtcbiAgICBjb25zdCBuZXdPcmllbnRhdGlvbiA9IHRoaXMuX2NvbnRyb2xQYW5lbC5vcmllbnRhdGlvblJhZGlvc1swXS5jaGVja2VkID8gdHJ1ZSA6IGZhbHNlO1xuICAgIGNvbnN0IG5ld1N0ZXAgPSBwYXJzZUludCh0aGlzLl9jb250cm9sUGFuZWwuc3RlcElucHV0LnZhbHVlKTtcbiAgICBjb25zdCBuZXdSYW5nZSA9IHRoaXMuX2NvbnRyb2xQYW5lbC5yYW5nZVJhZGlvc1sxXS5jaGVja2VkID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHRoaXMub2JzZXJ2ZXIuYnJvYWRjYXN0KHtcbiAgICAgIG1pbjogbmV3TWluTWF4WzBdLFxuICAgICAgbWF4OiBuZXdNaW5NYXhbMV0sXG4gICAgICB2YWx1ZXM6IG5ld1ZhbHVlcyxcbiAgICAgIGlzVmVydGljYWw6IG5ld09yaWVudGF0aW9uLFxuICAgICAgc3RlcDogbmV3U3RlcCxcbiAgICAgIGhhc1JhbmdlOiBuZXdSYW5nZSxcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZSh2YWx1ZURhdGE6IHNsaWRlck9wdGlvbnMpIHtcbiAgICB0aGlzLl9taW4gPSB2YWx1ZURhdGEubWluID8gdmFsdWVEYXRhLm1pbiA6IHRoaXMuX21pbjtcbiAgICB0aGlzLl9tYXggPSB2YWx1ZURhdGEubWF4ID8gdmFsdWVEYXRhLm1heCA6IHRoaXMuX21heDtcbiAgICB0aGlzLl92YWx1ZXMgPSB2YWx1ZURhdGEudmFsdWVzID8gdmFsdWVEYXRhLnZhbHVlcyA6IHRoaXMuX3ZhbHVlcztcbiAgICB0aGlzLl9pc1ZlcnRpY2FsID0gdmFsdWVEYXRhLmlzVmVydGljYWwgIT09IHVuZGVmaW5lZCA/IHZhbHVlRGF0YS5pc1ZlcnRpY2FsIDogdGhpcy5faXNWZXJ0aWNhbDtcbiAgICB0aGlzLl9oYXNSYW5nZSA9IHZhbHVlRGF0YS5oYXNSYW5nZSAhPT0gdW5kZWZpbmVkID8gdmFsdWVEYXRhLmhhc1JhbmdlIDogdGhpcy5faGFzUmFuZ2U7XG4gICAgdGhpcy51cGRhdGVSYW5nZSgpO1xuICAgIHRoaXMuc2V0T3JpZW50YXRpb24odGhpcy5faXNWZXJ0aWNhbCk7XG4gICAgdGhpcy5zZXRIYW5kbGVyUG9zaXRpb24odGhpcy5fdmFsdWVzLCB0aGlzLl9pc1ZlcnRpY2FsKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwudmFsdWVJbnB1dHNbMF0udmFsdWUgPSB0aGlzLl92YWx1ZXNbMF0udG9TdHJpbmcoKTtcbiAgICBpZiAodGhpcy5fY29udHJvbFBhbmVsLnZhbHVlSW5wdXRzWzFdKSB7XG4gICAgICB0aGlzLl9jb250cm9sUGFuZWwudmFsdWVJbnB1dHNbMV0udmFsdWUgPSB0aGlzLl92YWx1ZXNbMV0udG9TdHJpbmcoKTtcbiAgICB9XG4gICAgdGhpcy51cGRhdGVTZWxlY3RlZFJhbmdlKCk7XG4gICAgaWYgKHZhbHVlRGF0YS5zdGVwKSB0aGlzLl9zdGVwID0gdmFsdWVEYXRhLnN0ZXA7XG4gIH1cblxuICBzZXRTbGlkZXJCb2R5KCkge1xuICAgIHRoaXMuX3NsaWRlckJvZHkuY2xhc3NMaXN0LmFkZCgnc2xpZGVyQm9keScpO1xuICAgIHRoaXMuX3BhcmVudC5hcHBlbmRDaGlsZCh0aGlzLl9zbGlkZXJCb2R5KTtcbiAgfVxuXG4gIHNldE9yaWVudGF0aW9uKGlzVmVydGljYWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pc1ZlcnRpY2FsID0gaXNWZXJ0aWNhbDtcbiAgICBpZiAoaXNWZXJ0aWNhbCkge1xuICAgICAgdGhpcy5fcGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlcl9ob3Jpem9udGFsJyk7XG4gICAgICB0aGlzLl9wYXJlbnQuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX3ZlcnRpY2FsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3BhcmVudC5jbGFzc0xpc3QucmVtb3ZlKCdzbGlkZXJfdmVydGljYWwnKTtcbiAgICAgIHRoaXMuX3BhcmVudC5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfaG9yaXpvbnRhbCcpO1xuICAgIH1cbiAgfVxuXG4gIHNldEhhbmRsZXJzKGhhc1JhbmdlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGFuZGxlcnMucHVzaChuZXcgSGFuZGxlclZpZXcodGhpcy5fc2xpZGVyQm9keSwgdGhpcy5fbWluLCB0aGlzLl9tYXgpKTtcbiAgICBpZiAoaGFzUmFuZ2UpIHtcbiAgICAgIHRoaXMuX2hhbmRsZXJzLnB1c2gobmV3IEhhbmRsZXJWaWV3KHRoaXMuX3NsaWRlckJvZHksIHRoaXMuX21pbiwgdGhpcy5fbWF4KSk7XG4gICAgICB0aGlzLl9oYW5kbGVyc1swXS5lbGVtLmlkID0gJ2hhbmRsZXJfbWluJztcbiAgICAgIHRoaXMuX2hhbmRsZXJzWzFdLmVsZW0uaWQgPSAnaGFuZGxlcl9tYXgnO1xuICAgIH1cbiAgfVxuXG4gIGdldEhhbmRsZXJzKCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVycztcbiAgfVxuXG4gIHVwZGF0ZVJhbmdlKCkge1xuICAgIGlmICghdGhpcy5faGFzUmFuZ2UpIHtcbiAgICAgIHRoaXMuX2hhbmRsZXJzWzFdLmVsZW0ucmVtb3ZlKCk7XG4gICAgICB0aGlzLl9jb250cm9sUGFuZWwudmFsdWVJbnB1dHNbMV0ucmVtb3ZlKCk7XG4gICAgICB0aGlzLl9zZWxlY3RlZFJhbmdlLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkUmFuZ2UnKTtcbiAgICAgIHRoaXMuX3NlbGVjdGVkUmFuZ2UuY2xhc3NMaXN0LnJlbW92ZSgncmFuZ2VfYmV0d2VlbicpO1xuICAgICAgdGhpcy51cGRhdGVTZWxlY3RlZFJhbmdlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hhbmRsZXJzWzBdLmVsZW0uYWZ0ZXIodGhpcy5faGFuZGxlcnNbMV0uZWxlbSk7XG4gICAgICB0aGlzLl9jb250cm9sUGFuZWwudmFsdWVJbnB1dHNbMF0uYWZ0ZXIodGhpcy5fY29udHJvbFBhbmVsLnZhbHVlSW5wdXRzWzFdKTtcbiAgICAgIHRoaXMuX3NlbGVjdGVkUmFuZ2UuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWRSYW5nZScpO1xuICAgICAgdGhpcy5fc2VsZWN0ZWRSYW5nZS5jbGFzc0xpc3QuYWRkKCdyYW5nZV9iZXR3ZWVuJyk7XG4gICAgfVxuICB9XG5cbiAgc2V0SGFuZGxlclBvc2l0aW9uKHZhbHVlczogbnVtYmVyW10sIGlzVmVydGljYWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oYW5kbGVycy5mb3JFYWNoKChoYW5kbGVyLCBpbmRleCkgPT5cbiAgICAgIGhhbmRsZXIuc2V0UG9zaXRpb24odmFsdWVzW2luZGV4XSwgdGhpcy5fbWluLCB0aGlzLl9tYXgsIGlzVmVydGljYWwpLFxuICAgICk7XG4gIH1cblxuICBzZXRTZWxlY3RlZFJhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlbGVjdGVkUmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9zbGlkZXJCb2R5LmFwcGVuZENoaWxkKHRoaXMuX3NlbGVjdGVkUmFuZ2UpO1xuICAgIHRoaXMuX3NlbGVjdGVkUmFuZ2UuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWRSYW5nZScpO1xuICAgIGlmICh0aGlzLl9oYXNSYW5nZSkge1xuICAgICAgdGhpcy5fc2VsZWN0ZWRSYW5nZS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZFJhbmdlJyk7XG4gICAgICB0aGlzLl9zZWxlY3RlZFJhbmdlLmNsYXNzTGlzdC5hZGQoJ3JhbmdlX2JldHdlZW4nKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVTZWxlY3RlZFJhbmdlKCkge1xuICAgIHRoaXMuX2lzVmVydGljYWxcbiAgICAgID8gKHRoaXMuX3NlbGVjdGVkUmFuZ2Uuc3R5bGUuaGVpZ2h0ID1cbiAgICAgICAgICB0aGlzLmdldENvb3Jkcyh0aGlzLl9zbGlkZXJCb2R5KSAtIHRoaXMuZ2V0Q29vcmRzKHRoaXMuX2hhbmRsZXJzWzBdLmVsZW0pICsgJ3B4JylcbiAgICAgIDogKHRoaXMuX3NlbGVjdGVkUmFuZ2Uuc3R5bGUud2lkdGggPSB0aGlzLmdldENvb3Jkcyh0aGlzLl9oYW5kbGVyc1swXS5lbGVtKSArICdweCcpO1xuICAgIGlmICh0aGlzLl9oYXNSYW5nZSkge1xuICAgICAgY29uc3QgcG9zTWluID0gdGhpcy5faXNWZXJ0aWNhbCA/ICdib3R0b20nIDogJ2xlZnQnO1xuICAgICAgY29uc3Qgc2l6ZSA9IHRoaXMuX2lzVmVydGljYWwgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG4gICAgICB0aGlzLl9zZWxlY3RlZFJhbmdlLnN0eWxlW3Bvc01pbl0gPSB0aGlzLl9pc1ZlcnRpY2FsXG4gICAgICAgID8gdGhpcy5nZXRDb29yZHModGhpcy5fc2xpZGVyQm9keSkgLSB0aGlzLmdldENvb3Jkcyh0aGlzLl9oYW5kbGVyc1swXS5lbGVtKSArICdweCdcbiAgICAgICAgOiB0aGlzLmdldENvb3Jkcyh0aGlzLl9oYW5kbGVyc1swXS5lbGVtKSArICdweCc7XG4gICAgICB0aGlzLl9zZWxlY3RlZFJhbmdlLnN0eWxlW3NpemVdID0gdGhpcy5faXNWZXJ0aWNhbFxuICAgICAgICA/IHRoaXMuZ2V0Q29vcmRzKHRoaXMuX2hhbmRsZXJzWzBdLmVsZW0pIC0gdGhpcy5nZXRDb29yZHModGhpcy5faGFuZGxlcnNbMV0uZWxlbSkgKyAncHgnXG4gICAgICAgIDogdGhpcy5nZXRDb29yZHModGhpcy5faGFuZGxlcnNbMV0uZWxlbSkgLSB0aGlzLmdldENvb3Jkcyh0aGlzLl9oYW5kbGVyc1swXS5lbGVtKSArICdweCc7XG4gICAgfVxuICB9XG5cbiAgc2V0TWluTWF4VG9JbnB1dHMoKSB7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLm1pbk1heElucHV0cy5tYXAoXG4gICAgICAoaW5wdXQsIGluZGV4KSA9PiAoaW5wdXQudmFsdWUgPSB0aGlzLl9taW5NYXhbaW5kZXhdLnRvU3RyaW5nKCkpLFxuICAgICk7XG4gIH1cbiAgc2V0VmFsdWVzVG9JbnB1dHMoKSB7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLnZhbHVlSW5wdXRzLm1hcChcbiAgICAgIChpbnB1dCwgaW5kZXgpID0+IChpbnB1dC52YWx1ZSA9IHRoaXMuX3ZhbHVlc1tpbmRleF0udG9TdHJpbmcoKSksXG4gICAgKTtcbiAgfVxuXG4gIHNldFN0ZXBUb0lucHV0KCkge1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5zdGVwSW5wdXQudmFsdWUgPSB0aGlzLl9zdGVwLnRvU3RyaW5nKCk7XG4gIH1cblxuICBzZXRPcmllbnRhdGlvblRvUmFkaW8oKSB7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLm9yaWVudGF0aW9uUmFkaW9zLm1hcCgocmFkaW8sIGluZGV4KSA9PlxuICAgICAgdGhpcy5faXNWZXJ0aWNhbFxuICAgICAgICA/ICh0aGlzLl9jb250cm9sUGFuZWwub3JpZW50YXRpb25SYWRpb3NbMF0uY2hlY2tlZCA9IHRydWUpXG4gICAgICAgIDogKHRoaXMuX2NvbnRyb2xQYW5lbC5vcmllbnRhdGlvblJhZGlvc1sxXS5jaGVja2VkID0gdHJ1ZSksXG4gICAgKTtcbiAgfVxuXG4gIHNldFJhbmdlVG9SYWRpbygpIHtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwucmFuZ2VSYWRpb3MubWFwKChyYWRpbywgaW5kZXgpID0+XG4gICAgICB0aGlzLl9oYXNSYW5nZVxuICAgICAgICA/ICh0aGlzLl9jb250cm9sUGFuZWwucmFuZ2VSYWRpb3NbMV0uY2hlY2tlZCA9IHRydWUpXG4gICAgICAgIDogKHRoaXMuX2NvbnRyb2xQYW5lbC5yYW5nZVJhZGlvc1swXS5jaGVja2VkID0gdHJ1ZSksXG4gICAgKTtcbiAgfVxuXG4gIGdldENvb3JkcyhlbGVtOiBIVE1MRWxlbWVudCkge1xuICAgIGNvbnN0IGJveCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgaWYgKHRoaXMuX2lzVmVydGljYWwpIHtcbiAgICAgIHJldHVybiBib3guYm90dG9tICsgcGFnZVlPZmZzZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBib3gubGVmdCArIHBhZ2VYT2Zmc2V0O1xuICAgIH1cbiAgfVxuICBkcmFnQW5kRHJvcChlOiBNb3VzZUV2ZW50KSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0IGFzIEhUTUxEaXZFbGVtZW50O1xuICAgIHRoaXMuX2hhbmRsZXJUYXJnZXRJZCA9IHRhcmdldC5pZDtcbiAgICB0aGlzLl9tb3VzZU1vdmUgPSB0aGlzLm9uTW91c2VNb3ZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fbW91c2VVcCA9IHRoaXMub25Nb3VzZVVwLmJpbmQodGhpcyk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5fbW91c2VNb3ZlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5fbW91c2VVcCk7XG4gIH1cblxuICBvbk1vdXNlTW92ZShlOiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKHRoaXMuX2lzVmVydGljYWwpIHtcbiAgICAgIHRoaXMubW92ZUF0KGUucGFnZVksIHRoaXMuX2hhbmRsZXJUYXJnZXRJZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW92ZUF0KGUucGFnZVgsIHRoaXMuX2hhbmRsZXJUYXJnZXRJZCk7XG4gICAgfVxuICB9XG5cbiAgbW92ZUF0KGNvb3JkaW5hdGU6IG51bWJlciwgdGFyZ2V0SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNsaWRlckNvb3JkID0gdGhpcy5nZXRDb29yZHModGhpcy5fc2xpZGVyQm9keSk7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLl9pc1ZlcnRpY2FsXG4gICAgICA/ICgoc2xpZGVyQ29vcmQgLSBjb29yZGluYXRlKSAvIHRoaXMuX3NsaWRlckJvZHkub2Zmc2V0SGVpZ2h0KSAqICh0aGlzLl9tYXggLSB0aGlzLl9taW4pICtcbiAgICAgICAgdGhpcy5fbWluXG4gICAgICA6ICgoY29vcmRpbmF0ZSAtIHNsaWRlckNvb3JkKSAvIHRoaXMuX3NsaWRlckJvZHkub2Zmc2V0V2lkdGgpICogKHRoaXMuX21heCAtIHRoaXMuX21pbikgK1xuICAgICAgICB0aGlzLl9taW47XG4gICAgaWYgKCF0YXJnZXRJZCB8fCB0YXJnZXRJZCA9PT0gJ2hhbmRsZXJfbWluJykge1xuICAgICAgdGhpcy5vYnNlcnZlci5icm9hZGNhc3Qoe1xuICAgICAgICB2YWx1ZXM6IFt2YWx1ZSwgdGhpcy5fdmFsdWVzWzFdXSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9ic2VydmVyLmJyb2FkY2FzdCh7XG4gICAgICAgIHZhbHVlczogW3RoaXMuX3ZhbHVlc1swXSwgdmFsdWVdLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25Nb3VzZVVwKCkge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX21vdXNlTW92ZSk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25Nb3VzZVVwKTtcbiAgfVxufVxuXG5leHBvcnQgeyBNYWluVmlldyB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==