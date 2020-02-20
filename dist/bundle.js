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

/***/ "./src/ControlPanel/ControlPanel.ts":
/*!******************************************!*\
  !*** ./src/ControlPanel/ControlPanel.ts ***!
  \******************************************/
/*! exports provided: ControlPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControlPanel", function() { return ControlPanel; });
class ControlPanel {
    constructor(slider) {
        this._slider = slider;
        this._parent = this._slider.parent;
        this._controlPanel = document.createElement('div');
        this._valueInputs = [];
        this._minMaxInputs = [];
        this._stepInput = document.createElement('input');
        this._orientationRadios = [];
        this._rangeRadios = [];
        this._showLabelRadios = [];
        this._hasRange = slider.hasRange;
        this.panelInit();
        this.setEventListeners();
        this.getSliderOptions();
        this.updateValues();
    }
    panelInit() {
        this._controlPanel.classList.add('controlPanel');
        this._parent.after(this._controlPanel);
        this.createMaxMinInputs();
        this.createValueInputs();
        this.createStepInput();
        this.createOrientationRadios();
        this.createRangeRadios();
        this.createShowLabelRadios();
    }
    setEventListeners() {
        this.minMaxInputs.forEach(input => input.addEventListener('change', this.changeMinMax.bind(this)));
        this.valueInputs.forEach(input => input.addEventListener('change', this.changeValues.bind(this)));
        this.stepInput.addEventListener('change', this.changeStep.bind(this));
        this.orientationRadios.forEach(radio => radio.addEventListener('change', this.changeOrientation.bind(this)));
        this.rangeRadios.forEach(radio => radio.addEventListener('change', this.changeRange.bind(this)));
    }
    getSliderOptions() {
        this.minMaxInputs.forEach((input, index) => (input.value = this._slider.minMax[index].toString()));
        this.valueInputs[0].value = this._slider.rangeValue[0].toString();
        if (this.valueInputs[1]) {
            this.valueInputs[1].value = this._slider.rangeValue[1].toString();
        }
        this.stepInput.value = this._slider.step.toString();
        this._slider.isVertical
            ? (this.orientationRadios[0].checked = true)
            : (this.orientationRadios[1].checked = true);
        if (this._slider.hasRange) {
            this.rangeRadios[1].checked = true;
        }
        else {
            this.rangeRadios[0].checked = true;
        }
    }
    changeMinMax() {
        const newMinMax = this.minMaxInputs.map(input => parseInt(input.value));
        this._slider.minMax = newMinMax;
    }
    changeValues() {
        const newValues = this.valueInputs.map(input => parseInt(input.value));
        this._slider.rangeValue = newValues;
    }
    changeStep() {
        const newStep = parseInt(this.stepInput.value);
        this._slider.step = newStep;
    }
    changeOrientation() {
        const newOrientation = this.orientationRadios[0].checked ? true : false;
        this._slider.isVertical = newOrientation;
    }
    changeRange() {
        const newRange = this.rangeRadios[1].checked ? true : false;
        if (!newRange) {
            this.valueInputs[1].remove();
        }
        else {
            this.valueInputs[0].after(this.valueInputs[1]);
        }
        this._slider.hasRange = newRange;
    }
    updateValues() {
        this._slider.observer.subscribe((values) => {
            this.valueInputs.forEach((input, index) => (input.value = values[index].toString()));
        });
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
    createShowLabelRadios() {
        const title = document.createElement('p');
        this._controlPanel.append(title);
        title.innerText = 'Показать значения/Скрыть значения';
        const radioShowLabel = document.createElement('input');
        radioShowLabel.id = 'radio_showLabel';
        const radioHideLabel = document.createElement('input');
        radioHideLabel.id = 'radio_hideLabel';
        this._showLabelRadios = [radioShowLabel, radioHideLabel];
        this._showLabelRadios.forEach(radio => {
            radio.type = 'radio';
            radio.name = 'label';
            this._controlPanel.append(radio);
        });
    }
    get showLabelRadios() {
        return this._showLabelRadios;
    }
}



/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _presenter_Facade__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./presenter/Facade */ "./src/presenter/Facade.ts");
/* harmony import */ var _ControlPanel_ControlPanel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ControlPanel/ControlPanel */ "./src/ControlPanel/ControlPanel.ts");


$(function () {
    $.fn.slider = function (options) {
        const facade = new _presenter_Facade__WEBPACK_IMPORTED_MODULE_0__["Facade"](this.get(0), options);
        const panel = new _ControlPanel_ControlPanel__WEBPACK_IMPORTED_MODULE_1__["ControlPanel"](facade);
        return { facade, panel };
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
/* harmony import */ var _observer_observer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../observer/observer */ "./src/observer/observer.ts");



class Facade {
    constructor(parent, sliderOptions) {
        this.observer = new _observer_observer__WEBPACK_IMPORTED_MODULE_2__["EventObserver"]();
        this._model = new _model_MainModel__WEBPACK_IMPORTED_MODULE_0__["MainModel"](sliderOptions);
        this._presenter = new _Presenter__WEBPACK_IMPORTED_MODULE_1__["Presenter"](parent, this._model);
        this.updateValues();
    }
    updateValues() {
        this._model.observer.subscribe((valueData) => {
            if (valueData.values)
                this.observer.broadcast(valueData.values);
        });
    }
    get parent() {
        return this._presenter.parent;
    }
    get minMax() {
        return [this._model.min, this._model.max];
    }
    set minMax(value) {
        [this._model.min, this._model.max] = value;
    }
    //not used
    get singleValue() {
        return this._model.singleValue;
    }
    //not used
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
    get hasRange() {
        return this._model.hasRange;
    }
    set hasRange(range) {
        this._model.hasRange = range;
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
        this._parent = parent;
        this._view = new _view_MainView__WEBPACK_IMPORTED_MODULE_0__["MainView"](this._parent, this._model.hasRange, this._model.isVertical, this._model.min, this._model.max, this._values, this._model.step);
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
    get parent() {
        return this._parent;
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
/* harmony import */ var _observer_observer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../observer/observer */ "./src/observer/observer.ts");


class MainView {
    constructor(parent, hasRange, isVertical, min, max, values, step) {
        this.observer = new _observer_observer__WEBPACK_IMPORTED_MODULE_1__["EventObserver"]();
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
        this.setSliderBody();
        this.setOrientation(this._isVertical);
        this.setHandlers(this._hasRange);
        this.setHandlerPosition(this._values, this._isVertical);
        this.setSelectedRange();
        this.updateSelectedRange();
        this._handlers.forEach(handler => {
            handler.elem.ondragstart = function () {
                return false;
            };
            handler.elem.addEventListener('mousedown', this.dragAndDrop.bind(this));
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
            this._selectedRange.classList.add('selectedRange');
            this._selectedRange.classList.remove('range_between');
            this.updateSelectedRange();
        }
        else {
            this._handlers[0].elem.after(this._handlers[1].elem);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbnRyb2xQYW5lbC9Db250cm9sUGFuZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9tb2RlbC9NYWluTW9kZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVsL2hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29ic2VydmVyL29ic2VydmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9wcmVzZW50ZXIvRmFjYWRlLnRzIiwid2VicGFjazovLy8uL3NyYy9wcmVzZW50ZXIvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy92aWV3L0hhbmRsZXJWaWV3LnRzIiwid2VicGFjazovLy8uL3NyYy92aWV3L01haW5WaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FB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SUFBSSxDQUFDLElBQUksQ0FBQztRQUNkLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxLQUFLLGFBQWEsRUFBRTtZQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztnQkFDdEIsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDakMsQ0FBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO2dCQUN0QixNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQzthQUNqQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRCxTQUFTO1FBQ1AsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0QsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUQsQ0FBQztDQUNGO0FBRW1CIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHsgRmFjYWRlIH0gZnJvbSAnLi4vcHJlc2VudGVyL0ZhY2FkZSc7XG5cbmNsYXNzIENvbnRyb2xQYW5lbCB7XG4gIHByaXZhdGUgX3NsaWRlcjogRmFjYWRlO1xuICBwcml2YXRlIF9wYXJlbnQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9jb250cm9sUGFuZWw6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9taW5NYXhJbnB1dHM6IEhUTUxJbnB1dEVsZW1lbnRbXTtcbiAgcHJpdmF0ZSBfdmFsdWVJbnB1dHM6IEhUTUxJbnB1dEVsZW1lbnRbXTtcbiAgcHJpdmF0ZSBfc3RlcElucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuICBwcml2YXRlIF9vcmllbnRhdGlvblJhZGlvczogSFRNTElucHV0RWxlbWVudFtdO1xuICBwcml2YXRlIF9yYW5nZVJhZGlvczogSFRNTElucHV0RWxlbWVudFtdO1xuICBwcml2YXRlIF9zaG93TGFiZWxSYWRpb3M6IEhUTUxJbnB1dEVsZW1lbnRbXTtcbiAgcHJpdmF0ZSBfaGFzUmFuZ2U6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3Ioc2xpZGVyOiBGYWNhZGUpIHtcbiAgICB0aGlzLl9zbGlkZXIgPSBzbGlkZXI7XG4gICAgdGhpcy5fcGFyZW50ID0gdGhpcy5fc2xpZGVyLnBhcmVudDtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl92YWx1ZUlucHV0cyA9IFtdO1xuICAgIHRoaXMuX21pbk1heElucHV0cyA9IFtdO1xuICAgIHRoaXMuX3N0ZXBJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgdGhpcy5fb3JpZW50YXRpb25SYWRpb3MgPSBbXTtcbiAgICB0aGlzLl9yYW5nZVJhZGlvcyA9IFtdO1xuICAgIHRoaXMuX3Nob3dMYWJlbFJhZGlvcyA9IFtdO1xuICAgIHRoaXMuX2hhc1JhbmdlID0gc2xpZGVyLmhhc1JhbmdlO1xuXG4gICAgdGhpcy5wYW5lbEluaXQoKTtcbiAgICB0aGlzLnNldEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgdGhpcy5nZXRTbGlkZXJPcHRpb25zKCk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFuZWxJbml0KCkge1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5jbGFzc0xpc3QuYWRkKCdjb250cm9sUGFuZWwnKTtcbiAgICB0aGlzLl9wYXJlbnQuYWZ0ZXIodGhpcy5fY29udHJvbFBhbmVsKTtcbiAgICB0aGlzLmNyZWF0ZU1heE1pbklucHV0cygpO1xuICAgIHRoaXMuY3JlYXRlVmFsdWVJbnB1dHMoKTtcbiAgICB0aGlzLmNyZWF0ZVN0ZXBJbnB1dCgpO1xuICAgIHRoaXMuY3JlYXRlT3JpZW50YXRpb25SYWRpb3MoKTtcbiAgICB0aGlzLmNyZWF0ZVJhbmdlUmFkaW9zKCk7XG4gICAgdGhpcy5jcmVhdGVTaG93TGFiZWxSYWRpb3MoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5taW5NYXhJbnB1dHMuZm9yRWFjaChpbnB1dCA9PlxuICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jaGFuZ2VNaW5NYXguYmluZCh0aGlzKSksXG4gICAgKTtcbiAgICB0aGlzLnZhbHVlSW5wdXRzLmZvckVhY2goaW5wdXQgPT5cbiAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuY2hhbmdlVmFsdWVzLmJpbmQodGhpcykpLFxuICAgICk7XG4gICAgdGhpcy5zdGVwSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jaGFuZ2VTdGVwLmJpbmQodGhpcykpO1xuICAgIHRoaXMub3JpZW50YXRpb25SYWRpb3MuZm9yRWFjaChyYWRpbyA9PlxuICAgICAgcmFkaW8uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jaGFuZ2VPcmllbnRhdGlvbi5iaW5kKHRoaXMpKSxcbiAgICApO1xuICAgIHRoaXMucmFuZ2VSYWRpb3MuZm9yRWFjaChyYWRpbyA9PlxuICAgICAgcmFkaW8uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jaGFuZ2VSYW5nZS5iaW5kKHRoaXMpKSxcbiAgICApO1xuICB9XG5cbiAgZ2V0U2xpZGVyT3B0aW9ucygpIHtcbiAgICB0aGlzLm1pbk1heElucHV0cy5mb3JFYWNoKFxuICAgICAgKGlucHV0LCBpbmRleCkgPT4gKGlucHV0LnZhbHVlID0gdGhpcy5fc2xpZGVyLm1pbk1heFtpbmRleF0udG9TdHJpbmcoKSksXG4gICAgKTtcbiAgICB0aGlzLnZhbHVlSW5wdXRzWzBdLnZhbHVlID0gdGhpcy5fc2xpZGVyLnJhbmdlVmFsdWVbMF0udG9TdHJpbmcoKTtcbiAgICBpZiAodGhpcy52YWx1ZUlucHV0c1sxXSkge1xuICAgICAgdGhpcy52YWx1ZUlucHV0c1sxXS52YWx1ZSA9IHRoaXMuX3NsaWRlci5yYW5nZVZhbHVlWzFdLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHRoaXMuc3RlcElucHV0LnZhbHVlID0gdGhpcy5fc2xpZGVyLnN0ZXAudG9TdHJpbmcoKTtcbiAgICB0aGlzLl9zbGlkZXIuaXNWZXJ0aWNhbFxuICAgICAgPyAodGhpcy5vcmllbnRhdGlvblJhZGlvc1swXS5jaGVja2VkID0gdHJ1ZSlcbiAgICAgIDogKHRoaXMub3JpZW50YXRpb25SYWRpb3NbMV0uY2hlY2tlZCA9IHRydWUpO1xuXG4gICAgaWYgKHRoaXMuX3NsaWRlci5oYXNSYW5nZSkge1xuICAgICAgdGhpcy5yYW5nZVJhZGlvc1sxXS5jaGVja2VkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yYW5nZVJhZGlvc1swXS5jaGVja2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNoYW5nZU1pbk1heCgpIHtcbiAgICBjb25zdCBuZXdNaW5NYXggPSB0aGlzLm1pbk1heElucHV0cy5tYXAoaW5wdXQgPT4gcGFyc2VJbnQoaW5wdXQudmFsdWUpKTtcbiAgICB0aGlzLl9zbGlkZXIubWluTWF4ID0gbmV3TWluTWF4O1xuICB9XG5cbiAgcHJpdmF0ZSBjaGFuZ2VWYWx1ZXMoKSB7XG4gICAgY29uc3QgbmV3VmFsdWVzID0gdGhpcy52YWx1ZUlucHV0cy5tYXAoaW5wdXQgPT4gcGFyc2VJbnQoaW5wdXQudmFsdWUpKTtcbiAgICB0aGlzLl9zbGlkZXIucmFuZ2VWYWx1ZSA9IG5ld1ZhbHVlcztcbiAgfVxuICBwcml2YXRlIGNoYW5nZVN0ZXAoKSB7XG4gICAgY29uc3QgbmV3U3RlcCA9IHBhcnNlSW50KHRoaXMuc3RlcElucHV0LnZhbHVlKTtcbiAgICB0aGlzLl9zbGlkZXIuc3RlcCA9IG5ld1N0ZXA7XG4gIH1cblxuICBwcml2YXRlIGNoYW5nZU9yaWVudGF0aW9uKCkge1xuICAgIGNvbnN0IG5ld09yaWVudGF0aW9uID0gdGhpcy5vcmllbnRhdGlvblJhZGlvc1swXS5jaGVja2VkID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHRoaXMuX3NsaWRlci5pc1ZlcnRpY2FsID0gbmV3T3JpZW50YXRpb247XG4gIH1cblxuICBwcml2YXRlIGNoYW5nZVJhbmdlKCkge1xuICAgIGNvbnN0IG5ld1JhbmdlID0gdGhpcy5yYW5nZVJhZGlvc1sxXS5jaGVja2VkID8gdHJ1ZSA6IGZhbHNlO1xuICAgIGlmICghbmV3UmFuZ2UpIHtcbiAgICAgIHRoaXMudmFsdWVJbnB1dHNbMV0ucmVtb3ZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmFsdWVJbnB1dHNbMF0uYWZ0ZXIodGhpcy52YWx1ZUlucHV0c1sxXSk7XG4gICAgfVxuICAgIHRoaXMuX3NsaWRlci5oYXNSYW5nZSA9IG5ld1JhbmdlO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVWYWx1ZXMoKSB7XG4gICAgdGhpcy5fc2xpZGVyLm9ic2VydmVyLnN1YnNjcmliZSgodmFsdWVzOiBudW1iZXJbXSkgPT4ge1xuICAgICAgdGhpcy52YWx1ZUlucHV0cy5mb3JFYWNoKChpbnB1dCwgaW5kZXgpID0+IChpbnB1dC52YWx1ZSA9IHZhbHVlc1tpbmRleF0udG9TdHJpbmcoKSkpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVNYXhNaW5JbnB1dHMoKSB7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZCh0aXRsZSk7XG4gICAgdGl0bGUuaW5uZXJUZXh0ID0gJ9Cc0LjQvS4g0LfQvdCw0YfQtdC90LjQtS/QnNCw0LrRgS4g0LfQvdCw0YfQtdC90LjQtSc7XG4gICAgY29uc3QgaW5wdXRNaW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGNvbnN0IGlucHV0TWF4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBpbnB1dE1pbi5jbGFzc0xpc3QuYWRkKCdsaW1pdFZhbHVlJyk7XG4gICAgaW5wdXRNYXguY2xhc3NMaXN0LmFkZCgnbGltaXRWYWx1ZScpO1xuICAgIGlucHV0TWluLnR5cGUgPSAnbnVtYmVyJztcbiAgICBpbnB1dE1heC50eXBlID0gJ251bWJlcic7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZChpbnB1dE1pbik7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZChpbnB1dE1heCk7XG4gICAgdGhpcy5fbWluTWF4SW5wdXRzID0gW2lucHV0TWluLCBpbnB1dE1heF07XG4gIH1cblxuICBnZXQgbWluTWF4SW5wdXRzKCkge1xuICAgIHJldHVybiB0aGlzLl9taW5NYXhJbnB1dHM7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVZhbHVlSW5wdXRzKCkge1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQodGl0bGUpO1xuICAgIHRpdGxlLmlubmVyVGV4dCA9ICfQl9C90LDRh9C10L3QuNC1INCx0LXQs9GD0L3QutC+0LInO1xuICAgIGNvbnN0IGlucHV0U2luZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBpbnB1dFNpbmdsZS5jbGFzc0xpc3QuYWRkKCdoYW5kbGVyVmFsdWUnKTtcbiAgICBpbnB1dFNpbmdsZS50eXBlID0gJ251bWJlcic7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZChpbnB1dFNpbmdsZSk7XG4gICAgdGhpcy5fdmFsdWVJbnB1dHMucHVzaChpbnB1dFNpbmdsZSk7XG4gICAgaWYgKHRoaXMuX2hhc1JhbmdlKSB7XG4gICAgICBjb25zdCBpbnB1dE1pbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oYW5kbGVyVmFsdWUnKTtcbiAgICAgIGlmIChpbnB1dE1pbikgaW5wdXRNaW4uY2xhc3NMaXN0LmFkZCgndmFsdWVfbWluJyk7XG4gICAgICBjb25zdCBpbnB1dE1heCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICBpbnB1dE1heC5jbGFzc0xpc3QuYWRkKCdoYW5kbGVyVmFsdWUnLCAndmFsdWVfbWF4Jyk7XG4gICAgICBpbnB1dE1heC50eXBlID0gJ251bWJlcic7XG4gICAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKGlucHV0TWF4KTtcbiAgICAgIHRoaXMuX3ZhbHVlSW5wdXRzLnB1c2goaW5wdXRNYXgpO1xuICAgIH1cbiAgfVxuICBnZXQgdmFsdWVJbnB1dHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlSW5wdXRzO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVTdGVwSW5wdXQoKSB7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZCh0aXRsZSk7XG4gICAgdGl0bGUuaW5uZXJUZXh0ID0gJ9CX0L3QsNGH0LXQvdC40LUg0YjQsNCz0LAnO1xuICAgIHRoaXMuX3N0ZXBJbnB1dC5jbGFzc0xpc3QuYWRkKCdzdGVwVmFsdWUnKTtcbiAgICB0aGlzLl9zdGVwSW5wdXQudHlwZSA9ICdudW1iZXInO1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQodGhpcy5fc3RlcElucHV0KTtcbiAgfVxuXG4gIGdldCBzdGVwSW5wdXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0ZXBJbnB1dDtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlT3JpZW50YXRpb25SYWRpb3MoKSB7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZCh0aXRsZSk7XG4gICAgdGl0bGUuaW5uZXJUZXh0ID0gJ9CS0LXRgNGC0LjQutCw0LvRjNC90YvQuS/Qs9C+0YDQuNC30L7QvdGC0LDQu9GM0L3Ri9C5JztcbiAgICBjb25zdCByYWRpb1ZlcnRpY2FsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICByYWRpb1ZlcnRpY2FsLmlkID0gJ3JhZGlvX3ZlcnRpY2FsJztcbiAgICBjb25zdCByYWRpb0hvcml6b250YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHJhZGlvSG9yaXpvbnRhbC5pZCA9ICdyYWRpb19ob3Jpem9udGFsJztcbiAgICB0aGlzLl9vcmllbnRhdGlvblJhZGlvcyA9IFtyYWRpb1ZlcnRpY2FsLCByYWRpb0hvcml6b250YWxdO1xuICAgIHRoaXMuX29yaWVudGF0aW9uUmFkaW9zLmZvckVhY2gocmFkaW8gPT4ge1xuICAgICAgcmFkaW8udHlwZSA9ICdyYWRpbyc7XG4gICAgICByYWRpby5uYW1lID0gJ29yaWVudGF0aW9uJztcbiAgICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQocmFkaW8pO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0IG9yaWVudGF0aW9uUmFkaW9zKCkge1xuICAgIHJldHVybiB0aGlzLl9vcmllbnRhdGlvblJhZGlvcztcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlUmFuZ2VSYWRpb3MoKSB7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZCh0aXRsZSk7XG4gICAgdGl0bGUuaW5uZXJUZXh0ID0gJ9Ce0LTQuNC90L7Rh9C90L7QtS/QuNC90YLQtdGA0LLQsNC7JztcbiAgICBjb25zdCByYWRpb1NpbmdsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgcmFkaW9TaW5nbGUuaWQgPSAncmFkaW9fc2luZ2xlJztcbiAgICBjb25zdCByYWRpb0RvdWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgcmFkaW9Eb3VibGUuaWQgPSAncmFkaW9fZG91YmxlJztcbiAgICB0aGlzLl9yYW5nZVJhZGlvcyA9IFtyYWRpb1NpbmdsZSwgcmFkaW9Eb3VibGVdO1xuICAgIHRoaXMuX3JhbmdlUmFkaW9zLmZvckVhY2gocmFkaW8gPT4ge1xuICAgICAgcmFkaW8udHlwZSA9ICdyYWRpbyc7XG4gICAgICByYWRpby5uYW1lID0gJ3JhbmdlJztcbiAgICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQocmFkaW8pO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0IHJhbmdlUmFkaW9zKCkge1xuICAgIHJldHVybiB0aGlzLl9yYW5nZVJhZGlvcztcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlU2hvd0xhYmVsUmFkaW9zKCkge1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQodGl0bGUpO1xuICAgIHRpdGxlLmlubmVyVGV4dCA9ICfQn9C+0LrQsNC30LDRgtGMINC30L3QsNGH0LXQvdC40Y8v0KHQutGA0YvRgtGMINC30L3QsNGH0LXQvdC40Y8nO1xuICAgIGNvbnN0IHJhZGlvU2hvd0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICByYWRpb1Nob3dMYWJlbC5pZCA9ICdyYWRpb19zaG93TGFiZWwnO1xuICAgIGNvbnN0IHJhZGlvSGlkZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICByYWRpb0hpZGVMYWJlbC5pZCA9ICdyYWRpb19oaWRlTGFiZWwnO1xuICAgIHRoaXMuX3Nob3dMYWJlbFJhZGlvcyA9IFtyYWRpb1Nob3dMYWJlbCwgcmFkaW9IaWRlTGFiZWxdO1xuICAgIHRoaXMuX3Nob3dMYWJlbFJhZGlvcy5mb3JFYWNoKHJhZGlvID0+IHtcbiAgICAgIHJhZGlvLnR5cGUgPSAncmFkaW8nO1xuICAgICAgcmFkaW8ubmFtZSA9ICdsYWJlbCc7XG4gICAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKHJhZGlvKTtcbiAgICB9KTtcbiAgfVxuICBnZXQgc2hvd0xhYmVsUmFkaW9zKCkge1xuICAgIHJldHVybiB0aGlzLl9zaG93TGFiZWxSYWRpb3M7XG4gIH1cbn1cblxuZXhwb3J0IHsgQ29udHJvbFBhbmVsIH07XG4iLCJpbXBvcnQgeyBGYWNhZGUgfSBmcm9tICcuL3ByZXNlbnRlci9GYWNhZGUnO1xuaW1wb3J0IHsgQ29udHJvbFBhbmVsIH0gZnJvbSAnLi9Db250cm9sUGFuZWwvQ29udHJvbFBhbmVsJztcblxuJChmdW5jdGlvbigpIHtcbiAgJC5mbi5zbGlkZXIgPSBmdW5jdGlvbihvcHRpb25zKTogeyBmYWNhZGU6IEZhY2FkZTsgcGFuZWw6IENvbnRyb2xQYW5lbCB9IHtcbiAgICBjb25zdCBmYWNhZGU6IEZhY2FkZSA9IG5ldyBGYWNhZGUodGhpcy5nZXQoMCksIG9wdGlvbnMpO1xuICAgIGNvbnN0IHBhbmVsOiBDb250cm9sUGFuZWwgPSBuZXcgQ29udHJvbFBhbmVsKGZhY2FkZSk7XG4gICAgcmV0dXJuIHsgZmFjYWRlLCBwYW5lbCB9O1xuICB9O1xufSk7XG4iLCJpbXBvcnQgeyBFdmVudE9ic2VydmVyIH0gZnJvbSAnLi4vb2JzZXJ2ZXIvb2JzZXJ2ZXInO1xuaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gJy4vaGFuZGxlcic7XG5pbXBvcnQgeyBzbGlkZXJPcHRpb25zIH0gZnJvbSAnLi9zbGlkZXJPcHRpb25zJztcblxuY2xhc3MgTWFpbk1vZGVsIHtcbiAgcHVibGljIG9ic2VydmVyOiBFdmVudE9ic2VydmVyO1xuICBwcml2YXRlIF9taW4gPSAwO1xuICBwcml2YXRlIF9tYXggPSAxMDA7XG4gIHByaXZhdGUgX3N0ZXAgPSAxO1xuICBwcml2YXRlIF92YWx1ZXMgPSBbMTAsIDIwXTtcbiAgcHJpdmF0ZSBfaXNWZXJ0aWNhbCA9IGZhbHNlO1xuICBwcml2YXRlIF9oYXNSYW5nZSA9IHRydWU7XG4gIHByaXZhdGUgX2hhc0xhYmVscyA9IGZhbHNlO1xuICBwcml2YXRlIF9oYW5kbGVyczogSGFuZGxlcltdID0gW107XG4gIGNvbnN0cnVjdG9yKHNsaWRlck9wdGlvbnM6IHNsaWRlck9wdGlvbnMpIHtcbiAgICB0aGlzLm9ic2VydmVyID0gbmV3IEV2ZW50T2JzZXJ2ZXIoKTtcbiAgICB0aGlzLl9taW4gPSBzbGlkZXJPcHRpb25zLm1pbiA/IHNsaWRlck9wdGlvbnMubWluIDogMDtcbiAgICB0aGlzLl9tYXggPSBzbGlkZXJPcHRpb25zLm1heCA/IHNsaWRlck9wdGlvbnMubWF4IDogdGhpcy5fbWF4O1xuICAgIHRoaXMuX3N0ZXAgPSBzbGlkZXJPcHRpb25zLnN0ZXAgPyBzbGlkZXJPcHRpb25zLnN0ZXAgOiB0aGlzLl9zdGVwO1xuICAgIHRoaXMuX3ZhbHVlcyA9IHNsaWRlck9wdGlvbnMudmFsdWVzID8gc2xpZGVyT3B0aW9ucy52YWx1ZXMgOiB0aGlzLl92YWx1ZXM7XG4gICAgdGhpcy5faGFzUmFuZ2UgPSBzbGlkZXJPcHRpb25zLmhhc1JhbmdlID8gc2xpZGVyT3B0aW9ucy5oYXNSYW5nZSA6IHRoaXMuX2hhc1JhbmdlO1xuICAgIHRoaXMuX2lzVmVydGljYWwgPSBzbGlkZXJPcHRpb25zLmlzVmVydGljYWwgPyBzbGlkZXJPcHRpb25zLmlzVmVydGljYWwgOiB0aGlzLl9pc1ZlcnRpY2FsO1xuICAgIHRoaXMuX2hhc0xhYmVscyA9IHNsaWRlck9wdGlvbnMuaGFzTGFiZWxzID8gc2xpZGVyT3B0aW9ucy5oYXNMYWJlbHMgOiB0aGlzLl9oYXNMYWJlbHM7XG4gIH1cblxuICBub3RpZnlQcmVzZW50ZXIodmFsdWVEYXRhOiBzbGlkZXJPcHRpb25zKSB7XG4gICAgdGhpcy5vYnNlcnZlci5icm9hZGNhc3QodmFsdWVEYXRhKTtcbiAgfVxuXG4gIGdldCBtaW4oKTogbnVtYmVyIHtcbiAgICB0aGlzLl9taW4gPSBNYXRoLnJvdW5kKHRoaXMuX21pbiAvIHRoaXMuX3N0ZXApICogdGhpcy5fc3RlcDtcbiAgICByZXR1cm4gdGhpcy5fbWluO1xuICB9XG5cbiAgc2V0IG1pbihtaW46IG51bWJlcikge1xuICAgIHRoaXMuX21pbiA9IG1pbjtcbiAgICB0aGlzLm5vdGlmeVByZXNlbnRlcih7XG4gICAgICBtaW46IHRoaXMubWluLFxuICAgICAgdmFsdWVzOiB0aGlzLnJhbmdlVmFsdWUsXG4gICAgfSk7XG4gIH1cblxuICBnZXQgbWF4KCk6IG51bWJlciB7XG4gICAgdGhpcy5fbWF4ID0gTWF0aC5yb3VuZCh0aGlzLl9tYXggLyB0aGlzLl9zdGVwKSAqIHRoaXMuX3N0ZXA7XG4gICAgcmV0dXJuIHRoaXMuX21heDtcbiAgfVxuXG4gIHNldCBtYXgobWF4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9tYXggPSBtYXg7XG4gICAgdGhpcy5ub3RpZnlQcmVzZW50ZXIoe1xuICAgICAgbWF4OiB0aGlzLm1heCxcbiAgICAgIHZhbHVlczogdGhpcy5yYW5nZVZhbHVlLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0IHN0ZXAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc3RlcDtcbiAgfVxuXG4gIHNldCBzdGVwKHN0ZXA6IG51bWJlcikge1xuICAgIHRoaXMuX3N0ZXAgPSBzdGVwO1xuICAgIHRoaXMubm90aWZ5UHJlc2VudGVyKHtcbiAgICAgIHN0ZXA6IHRoaXMuX3N0ZXAsXG4gICAgICB2YWx1ZXM6IHRoaXMucmFuZ2VWYWx1ZSxcbiAgICB9KTtcbiAgfVxuICAvL9C90LUg0LjRgdC/0L7Qu9GM0LfRg9C10YLRgdGPIVxuICBnZXQgc2luZ2xlVmFsdWUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jYWxjVmFsdWVzKHRoaXMuX3ZhbHVlcylbMF07XG4gIH1cbiAgLy/QvdC1INC40YHQv9C+0LvRjNC30YPQtdGC0YHRjyFcbiAgc2V0IHNpbmdsZVZhbHVlKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl92YWx1ZXNbMF0gPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCByYW5nZVZhbHVlKCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gdGhpcy5jYWxjVmFsdWVzKHRoaXMuX3ZhbHVlcyk7XG4gIH1cblxuICBzZXQgcmFuZ2VWYWx1ZSh2YWx1ZXM6IG51bWJlcltdKSB7XG4gICAgdGhpcy5fdmFsdWVzID0gdmFsdWVzO1xuICAgIHRoaXMubm90aWZ5UHJlc2VudGVyKHtcbiAgICAgIHZhbHVlczogdGhpcy5jYWxjVmFsdWVzKHRoaXMuX3ZhbHVlcyksXG4gICAgfSk7XG4gIH1cblxuICBnZXQgaXNWZXJ0aWNhbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNWZXJ0aWNhbDtcbiAgfVxuXG4gIHNldCBpc1ZlcnRpY2FsKHZlcnRpY2FsOiBib29sZWFuKSB7XG4gICAgdGhpcy5faXNWZXJ0aWNhbCA9IHZlcnRpY2FsO1xuICAgIHRoaXMubm90aWZ5UHJlc2VudGVyKHtcbiAgICAgIHZhbHVlczogdGhpcy5yYW5nZVZhbHVlLFxuICAgICAgaXNWZXJ0aWNhbDogdGhpcy5faXNWZXJ0aWNhbCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBoYXNSYW5nZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGFzUmFuZ2U7XG4gIH1cblxuICBzZXQgaGFzUmFuZ2UocmFuZ2U6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oYXNSYW5nZSA9IHJhbmdlO1xuICAgIHRoaXMubm90aWZ5UHJlc2VudGVyKHtcbiAgICAgIHZhbHVlczogdGhpcy5yYW5nZVZhbHVlLFxuICAgICAgaGFzUmFuZ2U6IHRoaXMuX2hhc1JhbmdlLFxuICAgIH0pO1xuICB9XG5cbiAgLy9jaGVjayB0aGF0IHZhbHVlcyBvZiBoYW5kbGVycyBhcmUgd2l0aGluIG1pbiBhbmQgbWF4XG4gIC8vY2hlY2sgdGhhdCB2YWx1ZSAwIGlzIGxlc3MgdGhhbiB2YWx1ZSAxIGZvciByYW5nZVxuICBjYWxjVmFsdWVzKHZhbHVlczogbnVtYmVyW10pOiBudW1iZXJbXSB7XG4gICAgdmFsdWVzID0gdmFsdWVzLm1hcCh2YWx1ZSA9PiBNYXRoLnJvdW5kKHZhbHVlIC8gdGhpcy5fc3RlcCkgKiB0aGlzLl9zdGVwKTtcbiAgICBpZiAodmFsdWVzWzBdID4gdmFsdWVzWzFdKSBbdmFsdWVzWzBdLCB2YWx1ZXNbMV1dID0gW3ZhbHVlc1sxXSwgdmFsdWVzWzBdXTtcbiAgICB2YWx1ZXMgPSB2YWx1ZXMubWFwKHZhbHVlID0+XG4gICAgICB2YWx1ZSA8IHRoaXMuX21pbiA/IHRoaXMuX21pbiA6IHZhbHVlID4gdGhpcy5fbWF4ID8gdGhpcy5fbWF4IDogdmFsdWUsXG4gICAgKTtcblxuICAgIHJldHVybiB2YWx1ZXM7XG4gIH1cblxuICAvL2NyZWF0ZSBoYW5kbGVycyBkZXBlbmRpbmcgb24gcmFuZ2UuIG5vdCB1c2VkXG4gIHNldEhhbmRsZXJzKHZhbHVlczogbnVtYmVyW10pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faGFzUmFuZ2UpIHtcbiAgICAgIHRoaXMuX2hhbmRsZXJzID0gW25ldyBIYW5kbGVyKHZhbHVlc1swXSksIG5ldyBIYW5kbGVyKHZhbHVlc1sxXSldO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oYW5kbGVycyA9IFtuZXcgSGFuZGxlcih2YWx1ZXNbMF0pXTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgTWFpbk1vZGVsIH07XG4iLCJjbGFzcyBIYW5kbGVyIHtcbiAgcHJpdmF0ZSBfcG9zaXRpb246IG51bWJlcjtcbiAgY29uc3RydWN0b3IocG9zaXRpb246IG51bWJlcikge1xuICAgIHRoaXMuX3Bvc2l0aW9uID0gcG9zaXRpb247XG4gIH1cblxuICBnZXQgcG9zaXRpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XG4gIH1cblxuICBzZXQgcG9zaXRpb24odmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3Bvc2l0aW9uID0gdmFsdWU7XG4gIH1cbn1cblxuZXhwb3J0IHsgSGFuZGxlciB9O1xuIiwiY2xhc3MgRXZlbnRPYnNlcnZlciB7XG4gIHByaXZhdGUgX29ic2VydmVyczogRnVuY3Rpb25bXTtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fb2JzZXJ2ZXJzID0gW107XG4gIH1cbiAgc3Vic2NyaWJlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMuX29ic2VydmVycy5wdXNoKGZuKTtcbiAgfVxuICB1bnN1YnNjcmliZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLl9vYnNlcnZlcnMgPSB0aGlzLl9vYnNlcnZlcnMuZmlsdGVyKHN1YnNjcmliZXIgPT4gc3Vic2NyaWJlciAhPT0gZm4pO1xuICB9XG4gIGJyb2FkY2FzdChkYXRhOiBvYmplY3QpOiB2b2lkIHtcbiAgICB0aGlzLl9vYnNlcnZlcnMuZm9yRWFjaChzdWJzY3JpYmVyID0+IHN1YnNjcmliZXIoZGF0YSkpO1xuICB9XG59XG5cbmV4cG9ydCB7IEV2ZW50T2JzZXJ2ZXIgfTtcbiIsImltcG9ydCB7IE1haW5Nb2RlbCB9IGZyb20gJy4uL21vZGVsL01haW5Nb2RlbCc7XG5pbXBvcnQgeyBQcmVzZW50ZXIgfSBmcm9tICcuL1ByZXNlbnRlcic7XG5pbXBvcnQgeyBzbGlkZXJPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWwvc2xpZGVyT3B0aW9ucyc7XG5pbXBvcnQgeyBFdmVudE9ic2VydmVyIH0gZnJvbSAnLi4vb2JzZXJ2ZXIvb2JzZXJ2ZXInO1xuXG5jbGFzcyBGYWNhZGUge1xuICBwcml2YXRlIF9tb2RlbDogTWFpbk1vZGVsO1xuICBwcml2YXRlIF9wcmVzZW50ZXI6IFByZXNlbnRlcjtcbiAgcHVibGljIG9ic2VydmVyOiBFdmVudE9ic2VydmVyO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmVudDogSFRNTEVsZW1lbnQsIHNsaWRlck9wdGlvbnM6IHNsaWRlck9wdGlvbnMpIHtcbiAgICB0aGlzLm9ic2VydmVyID0gbmV3IEV2ZW50T2JzZXJ2ZXIoKTtcbiAgICB0aGlzLl9tb2RlbCA9IG5ldyBNYWluTW9kZWwoc2xpZGVyT3B0aW9ucyk7XG4gICAgdGhpcy5fcHJlc2VudGVyID0gbmV3IFByZXNlbnRlcihwYXJlbnQsIHRoaXMuX21vZGVsKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlcygpO1xuICB9XG5cbiAgdXBkYXRlVmFsdWVzKCkge1xuICAgIHRoaXMuX21vZGVsLm9ic2VydmVyLnN1YnNjcmliZSgodmFsdWVEYXRhOiBzbGlkZXJPcHRpb25zKSA9PiB7XG4gICAgICBpZiAodmFsdWVEYXRhLnZhbHVlcykgdGhpcy5vYnNlcnZlci5icm9hZGNhc3QodmFsdWVEYXRhLnZhbHVlcyk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgcGFyZW50KCkge1xuICAgIHJldHVybiB0aGlzLl9wcmVzZW50ZXIucGFyZW50O1xuICB9XG5cbiAgZ2V0IG1pbk1heCgpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIFt0aGlzLl9tb2RlbC5taW4sIHRoaXMuX21vZGVsLm1heF07XG4gIH1cblxuICBzZXQgbWluTWF4KHZhbHVlOiBudW1iZXJbXSkge1xuICAgIFt0aGlzLl9tb2RlbC5taW4sIHRoaXMuX21vZGVsLm1heF0gPSB2YWx1ZTtcbiAgfVxuICAvL25vdCB1c2VkXG4gIGdldCBzaW5nbGVWYWx1ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5zaW5nbGVWYWx1ZTtcbiAgfVxuICAvL25vdCB1c2VkXG4gIHNldCBzaW5nbGVWYWx1ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fbW9kZWwuc2luZ2xlVmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCByYW5nZVZhbHVlKCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwucmFuZ2VWYWx1ZTtcbiAgfVxuXG4gIHNldCByYW5nZVZhbHVlKHZhbHVlOiBudW1iZXJbXSkge1xuICAgIHRoaXMuX21vZGVsLnJhbmdlVmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBzdGVwKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLnN0ZXA7XG4gIH1cblxuICBzZXQgc3RlcCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fbW9kZWwuc3RlcCA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IGlzVmVydGljYWwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmlzVmVydGljYWw7XG4gIH1cblxuICBzZXQgaXNWZXJ0aWNhbCh2ZXJ0aWNhbDogYm9vbGVhbikge1xuICAgIHRoaXMuX21vZGVsLmlzVmVydGljYWwgPSB2ZXJ0aWNhbDtcbiAgfVxuXG4gIGdldCBoYXNSYW5nZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuaGFzUmFuZ2U7XG4gIH1cblxuICBzZXQgaGFzUmFuZ2UocmFuZ2U6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9tb2RlbC5oYXNSYW5nZSA9IHJhbmdlO1xuICB9XG59XG5cbmV4cG9ydCB7IEZhY2FkZSB9O1xuIiwiaW1wb3J0IHsgTWFpbk1vZGVsIH0gZnJvbSAnLi4vbW9kZWwvTWFpbk1vZGVsJztcbmltcG9ydCB7IE1haW5WaWV3IH0gZnJvbSAnLi4vdmlldy9NYWluVmlldyc7XG5pbXBvcnQgeyBzbGlkZXJPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWwvc2xpZGVyT3B0aW9ucyc7XG5cbmNsYXNzIFByZXNlbnRlciB7XG4gIHByaXZhdGUgX21vZGVsOiBNYWluTW9kZWw7XG4gIHByaXZhdGUgX3ZpZXc6IE1haW5WaWV3O1xuICBwcml2YXRlIF92YWx1ZXM6IG51bWJlcltdO1xuICBwcml2YXRlIF9wYXJlbnQ6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmVudDogSFRNTEVsZW1lbnQsIG1vZGVsOiBNYWluTW9kZWwpIHtcbiAgICB0aGlzLl9tb2RlbCA9IG1vZGVsO1xuICAgIHRoaXMuX3ZhbHVlcyA9IHRoaXMuX21vZGVsLnJhbmdlVmFsdWU7XG4gICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgIHRoaXMuX3ZpZXcgPSBuZXcgTWFpblZpZXcoXG4gICAgICB0aGlzLl9wYXJlbnQsXG4gICAgICB0aGlzLl9tb2RlbC5oYXNSYW5nZSxcbiAgICAgIHRoaXMuX21vZGVsLmlzVmVydGljYWwsXG4gICAgICB0aGlzLl9tb2RlbC5taW4sXG4gICAgICB0aGlzLl9tb2RlbC5tYXgsXG4gICAgICB0aGlzLl92YWx1ZXMsXG4gICAgICB0aGlzLl9tb2RlbC5zdGVwLFxuICAgICk7XG4gICAgdGhpcy51cGRhdGVNb2RlbCgpO1xuICAgIHRoaXMudXBkYXRlVmlldygpO1xuICB9XG5cbiAgdXBkYXRlTW9kZWwoKSB7XG4gICAgdGhpcy5fdmlldy5vYnNlcnZlci5zdWJzY3JpYmUoKHZhbHVlRGF0YTogc2xpZGVyT3B0aW9ucykgPT4ge1xuICAgICAgaWYgKHZhbHVlRGF0YS5taW4pIHRoaXMuX21vZGVsLm1pbiA9IHZhbHVlRGF0YS5taW47XG4gICAgICBpZiAodmFsdWVEYXRhLm1heCkgdGhpcy5fbW9kZWwubWF4ID0gdmFsdWVEYXRhLm1heDtcbiAgICAgIGlmICh2YWx1ZURhdGEudmFsdWVzKSB0aGlzLl9tb2RlbC5yYW5nZVZhbHVlID0gdmFsdWVEYXRhLnZhbHVlcztcbiAgICAgIGlmICh2YWx1ZURhdGEuaXNWZXJ0aWNhbCAhPT0gdW5kZWZpbmVkKSB0aGlzLl9tb2RlbC5pc1ZlcnRpY2FsID0gdmFsdWVEYXRhLmlzVmVydGljYWw7XG4gICAgICBpZiAodmFsdWVEYXRhLnN0ZXApIHRoaXMuX21vZGVsLnN0ZXAgPSB2YWx1ZURhdGEuc3RlcDtcbiAgICAgIGlmICh2YWx1ZURhdGEuaGFzUmFuZ2UgIT09IHVuZGVmaW5lZCkgdGhpcy5fbW9kZWwuaGFzUmFuZ2UgPSB2YWx1ZURhdGEuaGFzUmFuZ2U7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVWaWV3KCkge1xuICAgIHRoaXMuX21vZGVsLm9ic2VydmVyLnN1YnNjcmliZSgodmFsdWVEYXRhOiBzbGlkZXJPcHRpb25zKSA9PiB7XG4gICAgICB0aGlzLl92aWV3LnVwZGF0ZSh2YWx1ZURhdGEpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0IHBhcmVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xuICB9XG59XG5cbmV4cG9ydCB7IFByZXNlbnRlciB9O1xuIiwiY2xhc3MgSGFuZGxlclZpZXcge1xuICBwcml2YXRlIF9oYW5kbGVyOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfcGFyZW50OiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihwYXJlbnQ6IEhUTUxFbGVtZW50LCBtaW5MaW1pdDogbnVtYmVyLCBtYXhMaW1pdDogbnVtYmVyKSB7XG4gICAgdGhpcy5faGFuZGxlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX2hhbmRsZXIuY2xhc3NMaXN0LmFkZCgnaGFuZGxlcicpO1xuICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcbiAgICB0aGlzLl9wYXJlbnQuYXBwZW5kKHRoaXMuX2hhbmRsZXIpO1xuICB9XG5cbiAgc2V0UG9zaXRpb24odmFsdWU6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyLCBpc1ZlcnRpY2FsOiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWVzQ291bnQgPSBtYXggLSBtaW47XG4gICAgY29uc3QgcG9zaXRpb25Qcm9wZXJ0eSA9IGlzVmVydGljYWwgPyAnYm90dG9tJyA6ICdsZWZ0JztcbiAgICBjb25zdCBoYW5kbGVyU2l6ZSA9IGlzVmVydGljYWxcbiAgICAgID8gKHRoaXMuX2hhbmRsZXIub2Zmc2V0SGVpZ2h0IC8gdGhpcy5fcGFyZW50Lm9mZnNldEhlaWdodCkgKiAxMDBcbiAgICAgIDogKHRoaXMuX2hhbmRsZXIub2Zmc2V0V2lkdGggLyB0aGlzLl9wYXJlbnQub2Zmc2V0V2lkdGgpICogMTAwO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gKCh2YWx1ZSAtIG1pbikgLyB2YWx1ZXNDb3VudCkgKiAxMDAgLSBoYW5kbGVyU2l6ZSAvIDI7XG4gICAgdGhpcy5faGFuZGxlci5zdHlsZVtwb3NpdGlvblByb3BlcnR5XSA9IGAke3Bvc2l0aW9ufSVgO1xuICB9XG5cbiAgZ2V0IGVsZW0oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZXI7XG4gIH1cbn1cblxuZXhwb3J0IHsgSGFuZGxlclZpZXcgfTtcbiIsImltcG9ydCB7IEhhbmRsZXJWaWV3IH0gZnJvbSAnLi9IYW5kbGVyVmlldyc7XG5pbXBvcnQgeyBFdmVudE9ic2VydmVyIH0gZnJvbSAnLi4vb2JzZXJ2ZXIvb2JzZXJ2ZXInO1xuaW1wb3J0IHsgc2xpZGVyT3B0aW9ucyB9IGZyb20gJy4uL21vZGVsL3NsaWRlck9wdGlvbnMnO1xuXG5jbGFzcyBNYWluVmlldyB7XG4gIHB1YmxpYyBvYnNlcnZlcjogRXZlbnRPYnNlcnZlcjtcbiAgcHJpdmF0ZSBfc2xpZGVyQm9keTogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX3BhcmVudDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX3NlbGVjdGVkUmFuZ2U6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9oYW5kbGVyczogSGFuZGxlclZpZXdbXTtcbiAgcHJpdmF0ZSBfbWluOiBudW1iZXI7XG4gIHByaXZhdGUgX21heDogbnVtYmVyO1xuICBwcml2YXRlIF9taW5NYXg6IG51bWJlcltdO1xuICBwcml2YXRlIF92YWx1ZXM6IG51bWJlcltdO1xuICBwcml2YXRlIF9zdGVwOiBudW1iZXI7XG4gIHByaXZhdGUgX2lzVmVydGljYWw6IGJvb2xlYW47XG4gIHByaXZhdGUgX2hhc1JhbmdlOiBib29sZWFuO1xuICBwcml2YXRlIF9tb3VzZU1vdmU6IGFueTtcbiAgcHJpdmF0ZSBfbW91c2VVcDogYW55O1xuICBwcml2YXRlIF9oYW5kbGVyVGFyZ2V0SWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwYXJlbnQ6IEhUTUxFbGVtZW50LFxuICAgIGhhc1JhbmdlOiBib29sZWFuLFxuICAgIGlzVmVydGljYWw6IGJvb2xlYW4sXG4gICAgbWluOiBudW1iZXIsXG4gICAgbWF4OiBudW1iZXIsXG4gICAgdmFsdWVzOiBudW1iZXJbXSxcbiAgICBzdGVwOiBudW1iZXIsXG4gICkge1xuICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgRXZlbnRPYnNlcnZlcigpO1xuICAgIHRoaXMuX21pbiA9IG1pbjtcbiAgICB0aGlzLl9tYXggPSBtYXg7XG4gICAgdGhpcy5fbWluTWF4ID0gW3RoaXMuX21pbiwgdGhpcy5fbWF4XTtcbiAgICB0aGlzLl92YWx1ZXMgPSB2YWx1ZXM7XG4gICAgdGhpcy5fc3RlcCA9IHN0ZXA7XG4gICAgdGhpcy5faXNWZXJ0aWNhbCA9IGlzVmVydGljYWw7XG4gICAgdGhpcy5faGFzUmFuZ2UgPSBoYXNSYW5nZTtcbiAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5fc2xpZGVyQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX3NlbGVjdGVkUmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9oYW5kbGVycyA9IFtdO1xuICAgIHRoaXMuX21vdXNlTW92ZTtcbiAgICB0aGlzLl9tb3VzZVVwO1xuICAgIHRoaXMuX2hhbmRsZXJUYXJnZXRJZCA9ICcnO1xuXG4gICAgdGhpcy5zZXRTbGlkZXJCb2R5KCk7XG4gICAgdGhpcy5zZXRPcmllbnRhdGlvbih0aGlzLl9pc1ZlcnRpY2FsKTtcbiAgICB0aGlzLnNldEhhbmRsZXJzKHRoaXMuX2hhc1JhbmdlKTtcbiAgICB0aGlzLnNldEhhbmRsZXJQb3NpdGlvbih0aGlzLl92YWx1ZXMsIHRoaXMuX2lzVmVydGljYWwpO1xuXG4gICAgdGhpcy5zZXRTZWxlY3RlZFJhbmdlKCk7XG4gICAgdGhpcy51cGRhdGVTZWxlY3RlZFJhbmdlKCk7XG5cbiAgICB0aGlzLl9oYW5kbGVycy5mb3JFYWNoKGhhbmRsZXIgPT4ge1xuICAgICAgaGFuZGxlci5lbGVtLm9uZHJhZ3N0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH07XG4gICAgICBoYW5kbGVyLmVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5kcmFnQW5kRHJvcC5iaW5kKHRoaXMpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZSh2YWx1ZURhdGE6IHNsaWRlck9wdGlvbnMpIHtcbiAgICB0aGlzLl9taW4gPSB2YWx1ZURhdGEubWluID8gdmFsdWVEYXRhLm1pbiA6IHRoaXMuX21pbjtcbiAgICB0aGlzLl9tYXggPSB2YWx1ZURhdGEubWF4ID8gdmFsdWVEYXRhLm1heCA6IHRoaXMuX21heDtcbiAgICB0aGlzLl92YWx1ZXMgPSB2YWx1ZURhdGEudmFsdWVzID8gdmFsdWVEYXRhLnZhbHVlcyA6IHRoaXMuX3ZhbHVlcztcbiAgICB0aGlzLl9pc1ZlcnRpY2FsID0gdmFsdWVEYXRhLmlzVmVydGljYWwgIT09IHVuZGVmaW5lZCA/IHZhbHVlRGF0YS5pc1ZlcnRpY2FsIDogdGhpcy5faXNWZXJ0aWNhbDtcbiAgICB0aGlzLl9oYXNSYW5nZSA9IHZhbHVlRGF0YS5oYXNSYW5nZSAhPT0gdW5kZWZpbmVkID8gdmFsdWVEYXRhLmhhc1JhbmdlIDogdGhpcy5faGFzUmFuZ2U7XG4gICAgdGhpcy51cGRhdGVSYW5nZSgpO1xuICAgIHRoaXMuc2V0T3JpZW50YXRpb24odGhpcy5faXNWZXJ0aWNhbCk7XG4gICAgdGhpcy5zZXRIYW5kbGVyUG9zaXRpb24odGhpcy5fdmFsdWVzLCB0aGlzLl9pc1ZlcnRpY2FsKTtcblxuICAgIHRoaXMudXBkYXRlU2VsZWN0ZWRSYW5nZSgpO1xuICAgIGlmICh2YWx1ZURhdGEuc3RlcCkgdGhpcy5fc3RlcCA9IHZhbHVlRGF0YS5zdGVwO1xuICB9XG5cbiAgc2V0U2xpZGVyQm9keSgpIHtcbiAgICB0aGlzLl9zbGlkZXJCb2R5LmNsYXNzTGlzdC5hZGQoJ3NsaWRlckJvZHknKTtcbiAgICB0aGlzLl9wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5fc2xpZGVyQm9keSk7XG4gIH1cblxuICBzZXRPcmllbnRhdGlvbihpc1ZlcnRpY2FsOiBib29sZWFuKSB7XG4gICAgdGhpcy5faXNWZXJ0aWNhbCA9IGlzVmVydGljYWw7XG4gICAgaWYgKGlzVmVydGljYWwpIHtcbiAgICAgIHRoaXMuX3BhcmVudC5jbGFzc0xpc3QucmVtb3ZlKCdzbGlkZXJfaG9yaXpvbnRhbCcpO1xuICAgICAgdGhpcy5fcGFyZW50LmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl92ZXJ0aWNhbCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9wYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX3ZlcnRpY2FsJyk7XG4gICAgICB0aGlzLl9wYXJlbnQuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX2hvcml6b250YWwnKTtcbiAgICB9XG4gIH1cblxuICBzZXRIYW5kbGVycyhoYXNSYW5nZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2hhbmRsZXJzLnB1c2gobmV3IEhhbmRsZXJWaWV3KHRoaXMuX3NsaWRlckJvZHksIHRoaXMuX21pbiwgdGhpcy5fbWF4KSk7XG4gICAgaWYgKGhhc1JhbmdlKSB7XG4gICAgICB0aGlzLl9oYW5kbGVycy5wdXNoKG5ldyBIYW5kbGVyVmlldyh0aGlzLl9zbGlkZXJCb2R5LCB0aGlzLl9taW4sIHRoaXMuX21heCkpO1xuICAgICAgdGhpcy5faGFuZGxlcnNbMF0uZWxlbS5pZCA9ICdoYW5kbGVyX21pbic7XG4gICAgICB0aGlzLl9oYW5kbGVyc1sxXS5lbGVtLmlkID0gJ2hhbmRsZXJfbWF4JztcbiAgICB9XG4gIH1cblxuICBnZXRIYW5kbGVycygpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlcnM7XG4gIH1cblxuICB1cGRhdGVSYW5nZSgpIHtcbiAgICBpZiAoIXRoaXMuX2hhc1JhbmdlKSB7XG4gICAgICB0aGlzLl9oYW5kbGVyc1sxXS5lbGVtLnJlbW92ZSgpO1xuICAgICAgdGhpcy5fc2VsZWN0ZWRSYW5nZS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZFJhbmdlJyk7XG4gICAgICB0aGlzLl9zZWxlY3RlZFJhbmdlLmNsYXNzTGlzdC5yZW1vdmUoJ3JhbmdlX2JldHdlZW4nKTtcbiAgICAgIHRoaXMudXBkYXRlU2VsZWN0ZWRSYW5nZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oYW5kbGVyc1swXS5lbGVtLmFmdGVyKHRoaXMuX2hhbmRsZXJzWzFdLmVsZW0pO1xuICAgICAgdGhpcy5fc2VsZWN0ZWRSYW5nZS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZFJhbmdlJyk7XG4gICAgICB0aGlzLl9zZWxlY3RlZFJhbmdlLmNsYXNzTGlzdC5hZGQoJ3JhbmdlX2JldHdlZW4nKTtcbiAgICB9XG4gIH1cblxuICBzZXRIYW5kbGVyUG9zaXRpb24odmFsdWVzOiBudW1iZXJbXSwgaXNWZXJ0aWNhbDogYm9vbGVhbikge1xuICAgIHRoaXMuX2hhbmRsZXJzLmZvckVhY2goKGhhbmRsZXIsIGluZGV4KSA9PlxuICAgICAgaGFuZGxlci5zZXRQb3NpdGlvbih2YWx1ZXNbaW5kZXhdLCB0aGlzLl9taW4sIHRoaXMuX21heCwgaXNWZXJ0aWNhbCksXG4gICAgKTtcbiAgfVxuXG4gIHNldFNlbGVjdGVkUmFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VsZWN0ZWRSYW5nZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX3NsaWRlckJvZHkuYXBwZW5kQ2hpbGQodGhpcy5fc2VsZWN0ZWRSYW5nZSk7XG4gICAgdGhpcy5fc2VsZWN0ZWRSYW5nZS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZFJhbmdlJyk7XG4gICAgaWYgKHRoaXMuX2hhc1JhbmdlKSB7XG4gICAgICB0aGlzLl9zZWxlY3RlZFJhbmdlLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkUmFuZ2UnKTtcbiAgICAgIHRoaXMuX3NlbGVjdGVkUmFuZ2UuY2xhc3NMaXN0LmFkZCgncmFuZ2VfYmV0d2VlbicpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVNlbGVjdGVkUmFuZ2UoKSB7XG4gICAgdGhpcy5faXNWZXJ0aWNhbFxuICAgICAgPyAodGhpcy5fc2VsZWN0ZWRSYW5nZS5zdHlsZS5oZWlnaHQgPVxuICAgICAgICAgIHRoaXMuZ2V0Q29vcmRzKHRoaXMuX3NsaWRlckJvZHkpIC0gdGhpcy5nZXRDb29yZHModGhpcy5faGFuZGxlcnNbMF0uZWxlbSkgKyAncHgnKVxuICAgICAgOiAodGhpcy5fc2VsZWN0ZWRSYW5nZS5zdHlsZS53aWR0aCA9IHRoaXMuZ2V0Q29vcmRzKHRoaXMuX2hhbmRsZXJzWzBdLmVsZW0pICsgJ3B4Jyk7XG4gICAgaWYgKHRoaXMuX2hhc1JhbmdlKSB7XG4gICAgICBjb25zdCBwb3NNaW4gPSB0aGlzLl9pc1ZlcnRpY2FsID8gJ2JvdHRvbScgOiAnbGVmdCc7XG4gICAgICBjb25zdCBzaXplID0gdGhpcy5faXNWZXJ0aWNhbCA/ICdoZWlnaHQnIDogJ3dpZHRoJztcbiAgICAgIHRoaXMuX3NlbGVjdGVkUmFuZ2Uuc3R5bGVbcG9zTWluXSA9IHRoaXMuX2lzVmVydGljYWxcbiAgICAgICAgPyB0aGlzLmdldENvb3Jkcyh0aGlzLl9zbGlkZXJCb2R5KSAtIHRoaXMuZ2V0Q29vcmRzKHRoaXMuX2hhbmRsZXJzWzBdLmVsZW0pICsgJ3B4J1xuICAgICAgICA6IHRoaXMuZ2V0Q29vcmRzKHRoaXMuX2hhbmRsZXJzWzBdLmVsZW0pICsgJ3B4JztcbiAgICAgIHRoaXMuX3NlbGVjdGVkUmFuZ2Uuc3R5bGVbc2l6ZV0gPSB0aGlzLl9pc1ZlcnRpY2FsXG4gICAgICAgID8gdGhpcy5nZXRDb29yZHModGhpcy5faGFuZGxlcnNbMF0uZWxlbSkgLSB0aGlzLmdldENvb3Jkcyh0aGlzLl9oYW5kbGVyc1sxXS5lbGVtKSArICdweCdcbiAgICAgICAgOiB0aGlzLmdldENvb3Jkcyh0aGlzLl9oYW5kbGVyc1sxXS5lbGVtKSAtIHRoaXMuZ2V0Q29vcmRzKHRoaXMuX2hhbmRsZXJzWzBdLmVsZW0pICsgJ3B4JztcbiAgICB9XG4gIH1cblxuICBnZXRDb29yZHMoZWxlbTogSFRNTEVsZW1lbnQpIHtcbiAgICBjb25zdCBib3ggPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGlmICh0aGlzLl9pc1ZlcnRpY2FsKSB7XG4gICAgICByZXR1cm4gYm94LmJvdHRvbSArIHBhZ2VZT2Zmc2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYm94LmxlZnQgKyBwYWdlWE9mZnNldDtcbiAgICB9XG4gIH1cbiAgZHJhZ0FuZERyb3AoZTogTW91c2VFdmVudCkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICB0aGlzLl9oYW5kbGVyVGFyZ2V0SWQgPSB0YXJnZXQuaWQ7XG4gICAgdGhpcy5fbW91c2VNb3ZlID0gdGhpcy5vbk1vdXNlTW92ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX21vdXNlVXAgPSB0aGlzLm9uTW91c2VVcC5iaW5kKHRoaXMpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX21vdXNlTW92ZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX21vdXNlVXApO1xuICB9XG5cbiAgb25Nb3VzZU1vdmUoZTogTW91c2VFdmVudCkge1xuICAgIGlmICh0aGlzLl9pc1ZlcnRpY2FsKSB7XG4gICAgICB0aGlzLm1vdmVBdChlLnBhZ2VZLCB0aGlzLl9oYW5kbGVyVGFyZ2V0SWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vdmVBdChlLnBhZ2VYLCB0aGlzLl9oYW5kbGVyVGFyZ2V0SWQpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVBdChjb29yZGluYXRlOiBudW1iZXIsIHRhcmdldElkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzbGlkZXJDb29yZCA9IHRoaXMuZ2V0Q29vcmRzKHRoaXMuX3NsaWRlckJvZHkpO1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5faXNWZXJ0aWNhbFxuICAgICAgPyAoKHNsaWRlckNvb3JkIC0gY29vcmRpbmF0ZSkgLyB0aGlzLl9zbGlkZXJCb2R5Lm9mZnNldEhlaWdodCkgKiAodGhpcy5fbWF4IC0gdGhpcy5fbWluKSArXG4gICAgICAgIHRoaXMuX21pblxuICAgICAgOiAoKGNvb3JkaW5hdGUgLSBzbGlkZXJDb29yZCkgLyB0aGlzLl9zbGlkZXJCb2R5Lm9mZnNldFdpZHRoKSAqICh0aGlzLl9tYXggLSB0aGlzLl9taW4pICtcbiAgICAgICAgdGhpcy5fbWluO1xuICAgIGlmICghdGFyZ2V0SWQgfHwgdGFyZ2V0SWQgPT09ICdoYW5kbGVyX21pbicpIHtcbiAgICAgIHRoaXMub2JzZXJ2ZXIuYnJvYWRjYXN0KHtcbiAgICAgICAgdmFsdWVzOiBbdmFsdWUsIHRoaXMuX3ZhbHVlc1sxXV0sXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vYnNlcnZlci5icm9hZGNhc3Qoe1xuICAgICAgICB2YWx1ZXM6IFt0aGlzLl92YWx1ZXNbMF0sIHZhbHVlXSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uTW91c2VVcCgpIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9tb3VzZU1vdmUpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uTW91c2VVcCk7XG4gIH1cbn1cblxuZXhwb3J0IHsgTWFpblZpZXcgfTtcbiJdLCJzb3VyY2VSb290IjoiIn0=