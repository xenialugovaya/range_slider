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
        this.showLabelRadios.forEach(radio => radio.addEventListener('change', this.changeLabelVisibility.bind(this)));
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
        if (this._slider.hasLabels) {
            this.showLabelRadios[0].checked = true;
        }
        else {
            this.showLabelRadios[1].checked = true;
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
    changeLabelVisibility() {
        const showLabels = this.showLabelRadios[0].checked ? true : false;
        this._slider.hasLabels = showLabels;
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
        this._hasLabels = true;
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
            values: this.rangeValue,
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
    get hasLabels() {
        return this._hasLabels;
    }
    set hasLabels(label) {
        this._hasLabels = label;
        this.notifyPresenter({
            values: this.rangeValue,
            hasLabels: this._hasLabels,
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
    get hasLabels() {
        return this._model.hasLabels;
    }
    set hasLabels(label) {
        this._model.hasLabels = label;
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
        this._view = new _view_MainView__WEBPACK_IMPORTED_MODULE_0__["MainView"](this._parent, this._model.hasRange, this._model.isVertical, this._model.min, this._model.max, this._values, this._model.step, this._model.hasLabels);
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
            if (valueData.hasLabels !== undefined)
                this._model.hasLabels = valueData.hasLabels;
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
/* harmony import */ var _LabelView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LabelView */ "./src/view/LabelView.ts");

class HandlerView {
    constructor(parent, showLabel) {
        this._handler = document.createElement('div');
        this._parent = parent;
        this._showLabel = showLabel;
        this._label = showLabel ? new _LabelView__WEBPACK_IMPORTED_MODULE_0__["LabelView"]() : null;
        this.handlerInit();
    }
    handlerInit() {
        this._parent.append(this._handler);
        this._handler.classList.add('handler');
        if (this._label)
            this._handler.before(this._label.elem);
    }
    getHandlerSize(isVertical) {
        const handlerSize = isVertical
            ? (this._handler.offsetHeight / this._parent.offsetHeight) * 100
            : (this._handler.offsetWidth / this._parent.offsetWidth) * 100;
        return handlerSize;
    }
    setPosition(value, min, max, isVertical) {
        const valuesCount = max - min;
        const positionProperty = isVertical ? 'bottom' : 'left';
        const handlerSize = this.getHandlerSize(isVertical);
        const position = ((value - min) / valuesCount) * 100 - handlerSize / 2;
        this._handler.style[positionProperty] = `${position}%`;
        this.setLabelPosition(value, valuesCount, min, isVertical);
    }
    setLabelPosition(value, valuesCount, min, isVertical) {
        if (this._label) {
            const labelSize = this._label.getLabelSize(isVertical, this._parent);
            const fixedPositionProperty = this._label.getFixedPositionProperty(isVertical);
            const positionProperty = isVertical ? 'bottom' : 'left';
            const labelPosition = ((value - min) / valuesCount) * 100 - labelSize / 2;
            this._label.elem.style[positionProperty] = `${labelPosition}%`;
            this._label.elem.style[fixedPositionProperty] = '330%';
            this.setLabelValue(value);
        }
    }
    get elem() {
        return this._handler;
    }
    get labelElem() {
        var _a;
        return (_a = this._label) === null || _a === void 0 ? void 0 : _a.elem;
    }
    setLabelValue(value) {
        if (this._label)
            this._label.setLabelValue(value);
    }
    updateLabel(showLabel, value) {
        var _a;
        if (showLabel) {
            this._label = this._label ? this._label : new _LabelView__WEBPACK_IMPORTED_MODULE_0__["LabelView"]();
            this._handler.before(this._label.elem);
            this.setLabelValue(value);
        }
        else {
            (_a = this._label) === null || _a === void 0 ? void 0 : _a.elem.remove();
        }
    }
}



/***/ }),

/***/ "./src/view/LabelView.ts":
/*!*******************************!*\
  !*** ./src/view/LabelView.ts ***!
  \*******************************/
/*! exports provided: LabelView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LabelView", function() { return LabelView; });
class LabelView {
    constructor() {
        this._label = document.createElement('div');
        this._label.classList.add('label');
    }
    get elem() {
        return this._label;
    }
    setLabelValue(value) {
        this._label.innerText = value.toString();
    }
    getLabelSize(isVertical, parent) {
        const labelSize = isVertical
            ? (this.elem.offsetHeight / parent.offsetHeight) * 100
            : (this.elem.offsetWidth / parent.offsetWidth) * 100;
        return labelSize;
    }
    getFixedPositionProperty(isVertical) {
        const fixedPositionProperty = isVertical ? 'left' : 'bottom';
        return fixedPositionProperty;
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
    constructor(parent, hasRange, isVertical, min, max, values, step, hasLabels) {
        this.observer = new _observer_observer__WEBPACK_IMPORTED_MODULE_1__["EventObserver"]();
        this._min = min;
        this._max = max;
        this._values = values;
        this._step = step;
        this._isVertical = isVertical;
        this._hasRange = hasRange;
        this._hasLabels = hasLabels;
        this._parent = parent;
        this._sliderBody = document.createElement('div');
        this._selectedRange = document.createElement('div');
        this._handlers = [];
        this._mouseMove;
        this._mouseUp;
        this._handlerTargetId = '';
        this.sliderInit();
        this._handlers.forEach(handler => {
            handler.elem.ondragstart = function () {
                return false;
            };
            handler.elem.addEventListener('mousedown', this.dragAndDrop.bind(this));
        });
    }
    sliderInit() {
        this.setSliderBody();
        this.setOrientation(this._isVertical);
        this.setHandlers(this._hasRange);
        this.setHandlerPosition(this._values, this._isVertical);
        this.setSelectedRange();
        this.updateSelectedRange();
    }
    update(valueData) {
        this._min = valueData.min ? valueData.min : this._min;
        this._max = valueData.max ? valueData.max : this._max;
        this._values = valueData.values ? valueData.values : this._values;
        this._isVertical = valueData.isVertical !== undefined ? valueData.isVertical : this._isVertical;
        this._hasRange = valueData.hasRange !== undefined ? valueData.hasRange : this._hasRange;
        this._hasLabels = valueData.hasLabels !== undefined ? valueData.hasLabels : this._hasLabels;
        this.updateRange();
        this.setOrientation(this._isVertical);
        this.setHandlerPosition(this._values, this._isVertical);
        this.updateSelectedRange();
        if (valueData.step)
            this._step = valueData.step;
        this._handlers.forEach((handler, index) => handler.updateLabel(this._hasLabels, this._values[index]));
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
        this._handlers.push(new _HandlerView__WEBPACK_IMPORTED_MODULE_0__["HandlerView"](this._sliderBody, this._hasLabels));
        if (hasRange) {
            this._handlers.push(new _HandlerView__WEBPACK_IMPORTED_MODULE_0__["HandlerView"](this._sliderBody, this._hasLabels));
            this._handlers[0].elem.id = 'handler_min';
            this._handlers[1].elem.id = 'handler_max';
        }
    }
    getHandlers() {
        return this._handlers;
    }
    updateRange() {
        var _a;
        if (!this._hasRange) {
            this._handlers[1].elem.remove();
            (_a = this._handlers[1].labelElem) === null || _a === void 0 ? void 0 : _a.remove();
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
        this._sliderBody.append(this._selectedRange);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbnRyb2xQYW5lbC9Db250cm9sUGFuZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9tb2RlbC9NYWluTW9kZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVsL2hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29ic2VydmVyL29ic2VydmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9wcmVzZW50ZXIvRmFjYWRlLnRzIiwid2VicGFjazovLy8uL3NyYy9wcmVzZW50ZXIvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy92aWV3L0hhbmRsZXJWaWV3LnRzIiwid2VicGFjazovLy8uL3NyYy92aWV3L0xhYmVsVmlldy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlldy9NYWluVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFD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QUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3JGLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDZCxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsS0FBSyxhQUFhLEVBQUU7WUFDM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7Z0JBQ3RCLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pDLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztnQkFDdEIsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUM7YUFDakMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQsU0FBUztRQUNQLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNELFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFELENBQUM7Q0FDRjtBQUVtQiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7IEZhY2FkZSB9IGZyb20gJy4uL3ByZXNlbnRlci9GYWNhZGUnO1xuXG5jbGFzcyBDb250cm9sUGFuZWwge1xuICBwcml2YXRlIF9zbGlkZXI6IEZhY2FkZTtcbiAgcHJpdmF0ZSBfcGFyZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfY29udHJvbFBhbmVsOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfbWluTWF4SW5wdXRzOiBIVE1MSW5wdXRFbGVtZW50W107XG4gIHByaXZhdGUgX3ZhbHVlSW5wdXRzOiBIVE1MSW5wdXRFbGVtZW50W107XG4gIHByaXZhdGUgX3N0ZXBJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbiAgcHJpdmF0ZSBfb3JpZW50YXRpb25SYWRpb3M6IEhUTUxJbnB1dEVsZW1lbnRbXTtcbiAgcHJpdmF0ZSBfcmFuZ2VSYWRpb3M6IEhUTUxJbnB1dEVsZW1lbnRbXTtcbiAgcHJpdmF0ZSBfc2hvd0xhYmVsUmFkaW9zOiBIVE1MSW5wdXRFbGVtZW50W107XG4gIHByaXZhdGUgX2hhc1JhbmdlOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHNsaWRlcjogRmFjYWRlKSB7XG4gICAgdGhpcy5fc2xpZGVyID0gc2xpZGVyO1xuICAgIHRoaXMuX3BhcmVudCA9IHRoaXMuX3NsaWRlci5wYXJlbnQ7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fdmFsdWVJbnB1dHMgPSBbXTtcbiAgICB0aGlzLl9taW5NYXhJbnB1dHMgPSBbXTtcbiAgICB0aGlzLl9zdGVwSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRoaXMuX29yaWVudGF0aW9uUmFkaW9zID0gW107XG4gICAgdGhpcy5fcmFuZ2VSYWRpb3MgPSBbXTtcbiAgICB0aGlzLl9zaG93TGFiZWxSYWRpb3MgPSBbXTtcbiAgICB0aGlzLl9oYXNSYW5nZSA9IHNsaWRlci5oYXNSYW5nZTtcblxuICAgIHRoaXMucGFuZWxJbml0KCk7XG4gICAgdGhpcy5zZXRFdmVudExpc3RlbmVycygpO1xuICAgIHRoaXMuZ2V0U2xpZGVyT3B0aW9ucygpO1xuICAgIHRoaXMudXBkYXRlVmFsdWVzKCk7XG4gIH1cblxuICBwcml2YXRlIHBhbmVsSW5pdCgpIHtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuY2xhc3NMaXN0LmFkZCgnY29udHJvbFBhbmVsJyk7XG4gICAgdGhpcy5fcGFyZW50LmFmdGVyKHRoaXMuX2NvbnRyb2xQYW5lbCk7XG4gICAgdGhpcy5jcmVhdGVNYXhNaW5JbnB1dHMoKTtcbiAgICB0aGlzLmNyZWF0ZVZhbHVlSW5wdXRzKCk7XG4gICAgdGhpcy5jcmVhdGVTdGVwSW5wdXQoKTtcbiAgICB0aGlzLmNyZWF0ZU9yaWVudGF0aW9uUmFkaW9zKCk7XG4gICAgdGhpcy5jcmVhdGVSYW5nZVJhZGlvcygpO1xuICAgIHRoaXMuY3JlYXRlU2hvd0xhYmVsUmFkaW9zKCk7XG4gIH1cblxuICBwcml2YXRlIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMubWluTWF4SW5wdXRzLmZvckVhY2goaW5wdXQgPT5cbiAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuY2hhbmdlTWluTWF4LmJpbmQodGhpcykpLFxuICAgICk7XG4gICAgdGhpcy52YWx1ZUlucHV0cy5mb3JFYWNoKGlucHV0ID0+XG4gICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmNoYW5nZVZhbHVlcy5iaW5kKHRoaXMpKSxcbiAgICApO1xuICAgIHRoaXMuc3RlcElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuY2hhbmdlU3RlcC5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLm9yaWVudGF0aW9uUmFkaW9zLmZvckVhY2gocmFkaW8gPT5cbiAgICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuY2hhbmdlT3JpZW50YXRpb24uYmluZCh0aGlzKSksXG4gICAgKTtcbiAgICB0aGlzLnJhbmdlUmFkaW9zLmZvckVhY2gocmFkaW8gPT5cbiAgICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuY2hhbmdlUmFuZ2UuYmluZCh0aGlzKSksXG4gICAgKTtcbiAgICB0aGlzLnNob3dMYWJlbFJhZGlvcy5mb3JFYWNoKHJhZGlvID0+XG4gICAgICByYWRpby5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmNoYW5nZUxhYmVsVmlzaWJpbGl0eS5iaW5kKHRoaXMpKSxcbiAgICApO1xuICB9XG5cbiAgZ2V0U2xpZGVyT3B0aW9ucygpIHtcbiAgICB0aGlzLm1pbk1heElucHV0cy5mb3JFYWNoKFxuICAgICAgKGlucHV0LCBpbmRleCkgPT4gKGlucHV0LnZhbHVlID0gdGhpcy5fc2xpZGVyLm1pbk1heFtpbmRleF0udG9TdHJpbmcoKSksXG4gICAgKTtcbiAgICB0aGlzLnZhbHVlSW5wdXRzWzBdLnZhbHVlID0gdGhpcy5fc2xpZGVyLnJhbmdlVmFsdWVbMF0udG9TdHJpbmcoKTtcbiAgICBpZiAodGhpcy52YWx1ZUlucHV0c1sxXSkge1xuICAgICAgdGhpcy52YWx1ZUlucHV0c1sxXS52YWx1ZSA9IHRoaXMuX3NsaWRlci5yYW5nZVZhbHVlWzFdLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHRoaXMuc3RlcElucHV0LnZhbHVlID0gdGhpcy5fc2xpZGVyLnN0ZXAudG9TdHJpbmcoKTtcbiAgICB0aGlzLl9zbGlkZXIuaXNWZXJ0aWNhbFxuICAgICAgPyAodGhpcy5vcmllbnRhdGlvblJhZGlvc1swXS5jaGVja2VkID0gdHJ1ZSlcbiAgICAgIDogKHRoaXMub3JpZW50YXRpb25SYWRpb3NbMV0uY2hlY2tlZCA9IHRydWUpO1xuXG4gICAgaWYgKHRoaXMuX3NsaWRlci5oYXNSYW5nZSkge1xuICAgICAgdGhpcy5yYW5nZVJhZGlvc1sxXS5jaGVja2VkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yYW5nZVJhZGlvc1swXS5jaGVja2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3NsaWRlci5oYXNMYWJlbHMpIHtcbiAgICAgIHRoaXMuc2hvd0xhYmVsUmFkaW9zWzBdLmNoZWNrZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3dMYWJlbFJhZGlvc1sxXS5jaGVja2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNoYW5nZU1pbk1heCgpIHtcbiAgICBjb25zdCBuZXdNaW5NYXggPSB0aGlzLm1pbk1heElucHV0cy5tYXAoaW5wdXQgPT4gcGFyc2VJbnQoaW5wdXQudmFsdWUpKTtcbiAgICB0aGlzLl9zbGlkZXIubWluTWF4ID0gbmV3TWluTWF4O1xuICB9XG5cbiAgcHJpdmF0ZSBjaGFuZ2VWYWx1ZXMoKSB7XG4gICAgY29uc3QgbmV3VmFsdWVzID0gdGhpcy52YWx1ZUlucHV0cy5tYXAoaW5wdXQgPT4gcGFyc2VJbnQoaW5wdXQudmFsdWUpKTtcbiAgICB0aGlzLl9zbGlkZXIucmFuZ2VWYWx1ZSA9IG5ld1ZhbHVlcztcbiAgfVxuICBwcml2YXRlIGNoYW5nZVN0ZXAoKSB7XG4gICAgY29uc3QgbmV3U3RlcCA9IHBhcnNlSW50KHRoaXMuc3RlcElucHV0LnZhbHVlKTtcbiAgICB0aGlzLl9zbGlkZXIuc3RlcCA9IG5ld1N0ZXA7XG4gIH1cblxuICBwcml2YXRlIGNoYW5nZU9yaWVudGF0aW9uKCkge1xuICAgIGNvbnN0IG5ld09yaWVudGF0aW9uID0gdGhpcy5vcmllbnRhdGlvblJhZGlvc1swXS5jaGVja2VkID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHRoaXMuX3NsaWRlci5pc1ZlcnRpY2FsID0gbmV3T3JpZW50YXRpb247XG4gIH1cblxuICBwcml2YXRlIGNoYW5nZVJhbmdlKCkge1xuICAgIGNvbnN0IG5ld1JhbmdlID0gdGhpcy5yYW5nZVJhZGlvc1sxXS5jaGVja2VkID8gdHJ1ZSA6IGZhbHNlO1xuICAgIGlmICghbmV3UmFuZ2UpIHtcbiAgICAgIHRoaXMudmFsdWVJbnB1dHNbMV0ucmVtb3ZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmFsdWVJbnB1dHNbMF0uYWZ0ZXIodGhpcy52YWx1ZUlucHV0c1sxXSk7XG4gICAgfVxuICAgIHRoaXMuX3NsaWRlci5oYXNSYW5nZSA9IG5ld1JhbmdlO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGFuZ2VMYWJlbFZpc2liaWxpdHkoKSB7XG4gICAgY29uc3Qgc2hvd0xhYmVscyA9IHRoaXMuc2hvd0xhYmVsUmFkaW9zWzBdLmNoZWNrZWQgPyB0cnVlIDogZmFsc2U7XG4gICAgdGhpcy5fc2xpZGVyLmhhc0xhYmVscyA9IHNob3dMYWJlbHM7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVZhbHVlcygpIHtcbiAgICB0aGlzLl9zbGlkZXIub2JzZXJ2ZXIuc3Vic2NyaWJlKCh2YWx1ZXM6IG51bWJlcltdKSA9PiB7XG4gICAgICB0aGlzLnZhbHVlSW5wdXRzLmZvckVhY2goKGlucHV0LCBpbmRleCkgPT4gKGlucHV0LnZhbHVlID0gdmFsdWVzW2luZGV4XS50b1N0cmluZygpKSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZU1heE1pbklucHV0cygpIHtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKHRpdGxlKTtcbiAgICB0aXRsZS5pbm5lclRleHQgPSAn0JzQuNC9LiDQt9C90LDRh9C10L3QuNC1L9Cc0LDQutGBLiDQt9C90LDRh9C10L3QuNC1JztcbiAgICBjb25zdCBpbnB1dE1pbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgY29uc3QgaW5wdXRNYXggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGlucHV0TWluLmNsYXNzTGlzdC5hZGQoJ2xpbWl0VmFsdWUnKTtcbiAgICBpbnB1dE1heC5jbGFzc0xpc3QuYWRkKCdsaW1pdFZhbHVlJyk7XG4gICAgaW5wdXRNaW4udHlwZSA9ICdudW1iZXInO1xuICAgIGlucHV0TWF4LnR5cGUgPSAnbnVtYmVyJztcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKGlucHV0TWluKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKGlucHV0TWF4KTtcbiAgICB0aGlzLl9taW5NYXhJbnB1dHMgPSBbaW5wdXRNaW4sIGlucHV0TWF4XTtcbiAgfVxuXG4gIGdldCBtaW5NYXhJbnB1dHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21pbk1heElucHV0cztcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlVmFsdWVJbnB1dHMoKSB7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZCh0aXRsZSk7XG4gICAgdGl0bGUuaW5uZXJUZXh0ID0gJ9CX0L3QsNGH0LXQvdC40LUg0LHQtdCz0YPQvdC60L7Qsic7XG4gICAgY29uc3QgaW5wdXRTaW5nbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGlucHV0U2luZ2xlLmNsYXNzTGlzdC5hZGQoJ2hhbmRsZXJWYWx1ZScpO1xuICAgIGlucHV0U2luZ2xlLnR5cGUgPSAnbnVtYmVyJztcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKGlucHV0U2luZ2xlKTtcbiAgICB0aGlzLl92YWx1ZUlucHV0cy5wdXNoKGlucHV0U2luZ2xlKTtcbiAgICBpZiAodGhpcy5faGFzUmFuZ2UpIHtcbiAgICAgIGNvbnN0IGlucHV0TWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhhbmRsZXJWYWx1ZScpO1xuICAgICAgaWYgKGlucHV0TWluKSBpbnB1dE1pbi5jbGFzc0xpc3QuYWRkKCd2YWx1ZV9taW4nKTtcbiAgICAgIGNvbnN0IGlucHV0TWF4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgIGlucHV0TWF4LmNsYXNzTGlzdC5hZGQoJ2hhbmRsZXJWYWx1ZScsICd2YWx1ZV9tYXgnKTtcbiAgICAgIGlucHV0TWF4LnR5cGUgPSAnbnVtYmVyJztcbiAgICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQoaW5wdXRNYXgpO1xuICAgICAgdGhpcy5fdmFsdWVJbnB1dHMucHVzaChpbnB1dE1heCk7XG4gICAgfVxuICB9XG4gIGdldCB2YWx1ZUlucHV0cygpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWVJbnB1dHM7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVN0ZXBJbnB1dCgpIHtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKHRpdGxlKTtcbiAgICB0aXRsZS5pbm5lclRleHQgPSAn0JfQvdCw0YfQtdC90LjQtSDRiNCw0LPQsCc7XG4gICAgdGhpcy5fc3RlcElucHV0LmNsYXNzTGlzdC5hZGQoJ3N0ZXBWYWx1ZScpO1xuICAgIHRoaXMuX3N0ZXBJbnB1dC50eXBlID0gJ251bWJlcic7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZCh0aGlzLl9zdGVwSW5wdXQpO1xuICB9XG5cbiAgZ2V0IHN0ZXBJbnB1dCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RlcElucHV0O1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVPcmllbnRhdGlvblJhZGlvcygpIHtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKHRpdGxlKTtcbiAgICB0aXRsZS5pbm5lclRleHQgPSAn0JLQtdGA0YLQuNC60LDQu9GM0L3Ri9C5L9Cz0L7RgNC40LfQvtC90YLQsNC70YzQvdGL0LknO1xuICAgIGNvbnN0IHJhZGlvVmVydGljYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHJhZGlvVmVydGljYWwuaWQgPSAncmFkaW9fdmVydGljYWwnO1xuICAgIGNvbnN0IHJhZGlvSG9yaXpvbnRhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgcmFkaW9Ib3Jpem9udGFsLmlkID0gJ3JhZGlvX2hvcml6b250YWwnO1xuICAgIHRoaXMuX29yaWVudGF0aW9uUmFkaW9zID0gW3JhZGlvVmVydGljYWwsIHJhZGlvSG9yaXpvbnRhbF07XG4gICAgdGhpcy5fb3JpZW50YXRpb25SYWRpb3MuZm9yRWFjaChyYWRpbyA9PiB7XG4gICAgICByYWRpby50eXBlID0gJ3JhZGlvJztcbiAgICAgIHJhZGlvLm5hbWUgPSAnb3JpZW50YXRpb24nO1xuICAgICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZChyYWRpbyk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgb3JpZW50YXRpb25SYWRpb3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX29yaWVudGF0aW9uUmFkaW9zO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVSYW5nZVJhZGlvcygpIHtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKHRpdGxlKTtcbiAgICB0aXRsZS5pbm5lclRleHQgPSAn0J7QtNC40L3QvtGH0L3QvtC1L9C40L3RgtC10YDQstCw0LsnO1xuICAgIGNvbnN0IHJhZGlvU2luZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICByYWRpb1NpbmdsZS5pZCA9ICdyYWRpb19zaW5nbGUnO1xuICAgIGNvbnN0IHJhZGlvRG91YmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICByYWRpb0RvdWJsZS5pZCA9ICdyYWRpb19kb3VibGUnO1xuICAgIHRoaXMuX3JhbmdlUmFkaW9zID0gW3JhZGlvU2luZ2xlLCByYWRpb0RvdWJsZV07XG4gICAgdGhpcy5fcmFuZ2VSYWRpb3MuZm9yRWFjaChyYWRpbyA9PiB7XG4gICAgICByYWRpby50eXBlID0gJ3JhZGlvJztcbiAgICAgIHJhZGlvLm5hbWUgPSAncmFuZ2UnO1xuICAgICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZChyYWRpbyk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgcmFuZ2VSYWRpb3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JhbmdlUmFkaW9zO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVTaG93TGFiZWxSYWRpb3MoKSB7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZCh0aXRsZSk7XG4gICAgdGl0bGUuaW5uZXJUZXh0ID0gJ9Cf0L7QutCw0LfQsNGC0Ywg0LfQvdCw0YfQtdC90LjRjy/QodC60YDRi9GC0Ywg0LfQvdCw0YfQtdC90LjRjyc7XG4gICAgY29uc3QgcmFkaW9TaG93TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHJhZGlvU2hvd0xhYmVsLmlkID0gJ3JhZGlvX3Nob3dMYWJlbCc7XG4gICAgY29uc3QgcmFkaW9IaWRlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHJhZGlvSGlkZUxhYmVsLmlkID0gJ3JhZGlvX2hpZGVMYWJlbCc7XG4gICAgdGhpcy5fc2hvd0xhYmVsUmFkaW9zID0gW3JhZGlvU2hvd0xhYmVsLCByYWRpb0hpZGVMYWJlbF07XG4gICAgdGhpcy5fc2hvd0xhYmVsUmFkaW9zLmZvckVhY2gocmFkaW8gPT4ge1xuICAgICAgcmFkaW8udHlwZSA9ICdyYWRpbyc7XG4gICAgICByYWRpby5uYW1lID0gJ2xhYmVsJztcbiAgICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQocmFkaW8pO1xuICAgIH0pO1xuICB9XG4gIGdldCBzaG93TGFiZWxSYWRpb3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Nob3dMYWJlbFJhZGlvcztcbiAgfVxufVxuXG5leHBvcnQgeyBDb250cm9sUGFuZWwgfTtcbiIsImltcG9ydCB7IEZhY2FkZSB9IGZyb20gJy4vcHJlc2VudGVyL0ZhY2FkZSc7XG5pbXBvcnQgeyBDb250cm9sUGFuZWwgfSBmcm9tICcuL0NvbnRyb2xQYW5lbC9Db250cm9sUGFuZWwnO1xuXG4kKGZ1bmN0aW9uKCkge1xuICAkLmZuLnNsaWRlciA9IGZ1bmN0aW9uKG9wdGlvbnMpOiB7IGZhY2FkZTogRmFjYWRlOyBwYW5lbDogQ29udHJvbFBhbmVsIH0ge1xuICAgIGNvbnN0IGZhY2FkZTogRmFjYWRlID0gbmV3IEZhY2FkZSh0aGlzLmdldCgwKSwgb3B0aW9ucyk7XG4gICAgY29uc3QgcGFuZWw6IENvbnRyb2xQYW5lbCA9IG5ldyBDb250cm9sUGFuZWwoZmFjYWRlKTtcbiAgICByZXR1cm4geyBmYWNhZGUsIHBhbmVsIH07XG4gIH07XG59KTtcbiIsImltcG9ydCB7IEV2ZW50T2JzZXJ2ZXIgfSBmcm9tICcuLi9vYnNlcnZlci9vYnNlcnZlcic7XG5pbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSAnLi9oYW5kbGVyJztcbmltcG9ydCB7IHNsaWRlck9wdGlvbnMgfSBmcm9tICcuL3NsaWRlck9wdGlvbnMnO1xuXG5jbGFzcyBNYWluTW9kZWwge1xuICBwdWJsaWMgb2JzZXJ2ZXI6IEV2ZW50T2JzZXJ2ZXI7XG4gIHByaXZhdGUgX21pbiA9IDA7XG4gIHByaXZhdGUgX21heCA9IDEwMDtcbiAgcHJpdmF0ZSBfc3RlcCA9IDE7XG4gIHByaXZhdGUgX3ZhbHVlcyA9IFsxMCwgMjBdO1xuICBwcml2YXRlIF9pc1ZlcnRpY2FsID0gZmFsc2U7XG4gIHByaXZhdGUgX2hhc1JhbmdlID0gdHJ1ZTtcbiAgcHJpdmF0ZSBfaGFzTGFiZWxzID0gdHJ1ZTtcbiAgcHJpdmF0ZSBfaGFuZGxlcnM6IEhhbmRsZXJbXSA9IFtdO1xuICBjb25zdHJ1Y3RvcihzbGlkZXJPcHRpb25zOiBzbGlkZXJPcHRpb25zKSB7XG4gICAgdGhpcy5vYnNlcnZlciA9IG5ldyBFdmVudE9ic2VydmVyKCk7XG4gICAgdGhpcy5fbWluID0gc2xpZGVyT3B0aW9ucy5taW4gPyBzbGlkZXJPcHRpb25zLm1pbiA6IDA7XG4gICAgdGhpcy5fbWF4ID0gc2xpZGVyT3B0aW9ucy5tYXggPyBzbGlkZXJPcHRpb25zLm1heCA6IHRoaXMuX21heDtcbiAgICB0aGlzLl9zdGVwID0gc2xpZGVyT3B0aW9ucy5zdGVwID8gc2xpZGVyT3B0aW9ucy5zdGVwIDogdGhpcy5fc3RlcDtcbiAgICB0aGlzLl92YWx1ZXMgPSBzbGlkZXJPcHRpb25zLnZhbHVlcyA/IHNsaWRlck9wdGlvbnMudmFsdWVzIDogdGhpcy5fdmFsdWVzO1xuICAgIHRoaXMuX2hhc1JhbmdlID0gc2xpZGVyT3B0aW9ucy5oYXNSYW5nZSA/IHNsaWRlck9wdGlvbnMuaGFzUmFuZ2UgOiB0aGlzLl9oYXNSYW5nZTtcbiAgICB0aGlzLl9pc1ZlcnRpY2FsID0gc2xpZGVyT3B0aW9ucy5pc1ZlcnRpY2FsID8gc2xpZGVyT3B0aW9ucy5pc1ZlcnRpY2FsIDogdGhpcy5faXNWZXJ0aWNhbDtcbiAgICB0aGlzLl9oYXNMYWJlbHMgPSBzbGlkZXJPcHRpb25zLmhhc0xhYmVscyA/IHNsaWRlck9wdGlvbnMuaGFzTGFiZWxzIDogdGhpcy5faGFzTGFiZWxzO1xuICB9XG5cbiAgbm90aWZ5UHJlc2VudGVyKHZhbHVlRGF0YTogc2xpZGVyT3B0aW9ucykge1xuICAgIHRoaXMub2JzZXJ2ZXIuYnJvYWRjYXN0KHZhbHVlRGF0YSk7XG4gIH1cblxuICBnZXQgbWluKCk6IG51bWJlciB7XG4gICAgdGhpcy5fbWluID0gTWF0aC5yb3VuZCh0aGlzLl9taW4gLyB0aGlzLl9zdGVwKSAqIHRoaXMuX3N0ZXA7XG4gICAgcmV0dXJuIHRoaXMuX21pbjtcbiAgfVxuXG4gIHNldCBtaW4obWluOiBudW1iZXIpIHtcbiAgICB0aGlzLl9taW4gPSBtaW47XG4gICAgdGhpcy5ub3RpZnlQcmVzZW50ZXIoe1xuICAgICAgbWluOiB0aGlzLm1pbixcbiAgICAgIHZhbHVlczogdGhpcy5yYW5nZVZhbHVlLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0IG1heCgpOiBudW1iZXIge1xuICAgIHRoaXMuX21heCA9IE1hdGgucm91bmQodGhpcy5fbWF4IC8gdGhpcy5fc3RlcCkgKiB0aGlzLl9zdGVwO1xuICAgIHJldHVybiB0aGlzLl9tYXg7XG4gIH1cblxuICBzZXQgbWF4KG1heDogbnVtYmVyKSB7XG4gICAgdGhpcy5fbWF4ID0gbWF4O1xuICAgIHRoaXMubm90aWZ5UHJlc2VudGVyKHtcbiAgICAgIG1heDogdGhpcy5tYXgsXG4gICAgICB2YWx1ZXM6IHRoaXMucmFuZ2VWYWx1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBzdGVwKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3N0ZXA7XG4gIH1cblxuICBzZXQgc3RlcChzdGVwOiBudW1iZXIpIHtcbiAgICB0aGlzLl9zdGVwID0gc3RlcDtcbiAgICB0aGlzLm5vdGlmeVByZXNlbnRlcih7XG4gICAgICBzdGVwOiB0aGlzLl9zdGVwLFxuICAgICAgdmFsdWVzOiB0aGlzLnJhbmdlVmFsdWUsXG4gICAgfSk7XG4gIH1cbiAgLy/QvdC1INC40YHQv9C+0LvRjNC30YPQtdGC0YHRjyFcbiAgZ2V0IHNpbmdsZVZhbHVlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY2FsY1ZhbHVlcyh0aGlzLl92YWx1ZXMpWzBdO1xuICB9XG4gIC8v0L3QtSDQuNGB0L/QvtC70YzQt9GD0LXRgtGB0Y8hXG4gIHNldCBzaW5nbGVWYWx1ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fdmFsdWVzWzBdID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcmFuZ2VWYWx1ZSgpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIHRoaXMuY2FsY1ZhbHVlcyh0aGlzLl92YWx1ZXMpO1xuICB9XG5cbiAgc2V0IHJhbmdlVmFsdWUodmFsdWVzOiBudW1iZXJbXSkge1xuICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlcztcbiAgICB0aGlzLm5vdGlmeVByZXNlbnRlcih7XG4gICAgICB2YWx1ZXM6IHRoaXMucmFuZ2VWYWx1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBpc1ZlcnRpY2FsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc1ZlcnRpY2FsO1xuICB9XG5cbiAgc2V0IGlzVmVydGljYWwodmVydGljYWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pc1ZlcnRpY2FsID0gdmVydGljYWw7XG4gICAgdGhpcy5ub3RpZnlQcmVzZW50ZXIoe1xuICAgICAgdmFsdWVzOiB0aGlzLnJhbmdlVmFsdWUsXG4gICAgICBpc1ZlcnRpY2FsOiB0aGlzLl9pc1ZlcnRpY2FsLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0IGhhc1JhbmdlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oYXNSYW5nZTtcbiAgfVxuXG4gIHNldCBoYXNSYW5nZShyYW5nZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2hhc1JhbmdlID0gcmFuZ2U7XG4gICAgdGhpcy5ub3RpZnlQcmVzZW50ZXIoe1xuICAgICAgdmFsdWVzOiB0aGlzLnJhbmdlVmFsdWUsXG4gICAgICBoYXNSYW5nZTogdGhpcy5faGFzUmFuZ2UsXG4gICAgfSk7XG4gIH1cblxuICBnZXQgaGFzTGFiZWxzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oYXNMYWJlbHM7XG4gIH1cblxuICBzZXQgaGFzTGFiZWxzKGxhYmVsOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGFzTGFiZWxzID0gbGFiZWw7XG4gICAgdGhpcy5ub3RpZnlQcmVzZW50ZXIoe1xuICAgICAgdmFsdWVzOiB0aGlzLnJhbmdlVmFsdWUsXG4gICAgICBoYXNMYWJlbHM6IHRoaXMuX2hhc0xhYmVscyxcbiAgICB9KTtcbiAgfVxuXG4gIC8vY2hlY2sgdGhhdCB2YWx1ZXMgb2YgaGFuZGxlcnMgYXJlIHdpdGhpbiBtaW4gYW5kIG1heFxuICAvL2NoZWNrIHRoYXQgdmFsdWUgMCBpcyBsZXNzIHRoYW4gdmFsdWUgMSBmb3IgcmFuZ2VcbiAgY2FsY1ZhbHVlcyh2YWx1ZXM6IG51bWJlcltdKTogbnVtYmVyW10ge1xuICAgIHZhbHVlcyA9IHZhbHVlcy5tYXAodmFsdWUgPT4gTWF0aC5yb3VuZCh2YWx1ZSAvIHRoaXMuX3N0ZXApICogdGhpcy5fc3RlcCk7XG4gICAgaWYgKHZhbHVlc1swXSA+IHZhbHVlc1sxXSkgW3ZhbHVlc1swXSwgdmFsdWVzWzFdXSA9IFt2YWx1ZXNbMV0sIHZhbHVlc1swXV07XG4gICAgdmFsdWVzID0gdmFsdWVzLm1hcCh2YWx1ZSA9PlxuICAgICAgdmFsdWUgPCB0aGlzLl9taW4gPyB0aGlzLl9taW4gOiB2YWx1ZSA+IHRoaXMuX21heCA/IHRoaXMuX21heCA6IHZhbHVlLFxuICAgICk7XG5cbiAgICByZXR1cm4gdmFsdWVzO1xuICB9XG5cbiAgLy9jcmVhdGUgaGFuZGxlcnMgZGVwZW5kaW5nIG9uIHJhbmdlLiBub3QgdXNlZFxuICBzZXRIYW5kbGVycyh2YWx1ZXM6IG51bWJlcltdKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2hhc1JhbmdlKSB7XG4gICAgICB0aGlzLl9oYW5kbGVycyA9IFtuZXcgSGFuZGxlcih2YWx1ZXNbMF0pLCBuZXcgSGFuZGxlcih2YWx1ZXNbMV0pXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGFuZGxlcnMgPSBbbmV3IEhhbmRsZXIodmFsdWVzWzBdKV07XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IE1haW5Nb2RlbCB9O1xuIiwiY2xhc3MgSGFuZGxlciB7XG4gIHByaXZhdGUgX3Bvc2l0aW9uOiBudW1iZXI7XG4gIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICB9XG5cbiAgZ2V0IHBvc2l0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uO1xuICB9XG5cbiAgc2V0IHBvc2l0aW9uKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IHZhbHVlO1xuICB9XG59XG5cbmV4cG9ydCB7IEhhbmRsZXIgfTtcbiIsImNsYXNzIEV2ZW50T2JzZXJ2ZXIge1xuICBwcml2YXRlIF9vYnNlcnZlcnM6IEZ1bmN0aW9uW107XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX29ic2VydmVycyA9IFtdO1xuICB9XG4gIHN1YnNjcmliZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLl9vYnNlcnZlcnMucHVzaChmbik7XG4gIH1cbiAgdW5zdWJzY3JpYmUoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fb2JzZXJ2ZXJzID0gdGhpcy5fb2JzZXJ2ZXJzLmZpbHRlcihzdWJzY3JpYmVyID0+IHN1YnNjcmliZXIgIT09IGZuKTtcbiAgfVxuICBicm9hZGNhc3QoZGF0YTogb2JqZWN0KTogdm9pZCB7XG4gICAgdGhpcy5fb2JzZXJ2ZXJzLmZvckVhY2goc3Vic2NyaWJlciA9PiBzdWJzY3JpYmVyKGRhdGEpKTtcbiAgfVxufVxuXG5leHBvcnQgeyBFdmVudE9ic2VydmVyIH07XG4iLCJpbXBvcnQgeyBNYWluTW9kZWwgfSBmcm9tICcuLi9tb2RlbC9NYWluTW9kZWwnO1xuaW1wb3J0IHsgUHJlc2VudGVyIH0gZnJvbSAnLi9QcmVzZW50ZXInO1xuaW1wb3J0IHsgc2xpZGVyT3B0aW9ucyB9IGZyb20gJy4uL21vZGVsL3NsaWRlck9wdGlvbnMnO1xuaW1wb3J0IHsgRXZlbnRPYnNlcnZlciB9IGZyb20gJy4uL29ic2VydmVyL29ic2VydmVyJztcblxuY2xhc3MgRmFjYWRlIHtcbiAgcHJpdmF0ZSBfbW9kZWw6IE1haW5Nb2RlbDtcbiAgcHJpdmF0ZSBfcHJlc2VudGVyOiBQcmVzZW50ZXI7XG4gIHB1YmxpYyBvYnNlcnZlcjogRXZlbnRPYnNlcnZlcjtcblxuICBjb25zdHJ1Y3RvcihwYXJlbnQ6IEhUTUxFbGVtZW50LCBzbGlkZXJPcHRpb25zOiBzbGlkZXJPcHRpb25zKSB7XG4gICAgdGhpcy5vYnNlcnZlciA9IG5ldyBFdmVudE9ic2VydmVyKCk7XG4gICAgdGhpcy5fbW9kZWwgPSBuZXcgTWFpbk1vZGVsKHNsaWRlck9wdGlvbnMpO1xuICAgIHRoaXMuX3ByZXNlbnRlciA9IG5ldyBQcmVzZW50ZXIocGFyZW50LCB0aGlzLl9tb2RlbCk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZXMoKTtcbiAgfVxuXG4gIHVwZGF0ZVZhbHVlcygpIHtcbiAgICB0aGlzLl9tb2RlbC5vYnNlcnZlci5zdWJzY3JpYmUoKHZhbHVlRGF0YTogc2xpZGVyT3B0aW9ucykgPT4ge1xuICAgICAgaWYgKHZhbHVlRGF0YS52YWx1ZXMpIHRoaXMub2JzZXJ2ZXIuYnJvYWRjYXN0KHZhbHVlRGF0YS52YWx1ZXMpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0IHBhcmVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJlc2VudGVyLnBhcmVudDtcbiAgfVxuXG4gIGdldCBtaW5NYXgoKTogbnVtYmVyW10ge1xuICAgIHJldHVybiBbdGhpcy5fbW9kZWwubWluLCB0aGlzLl9tb2RlbC5tYXhdO1xuICB9XG5cbiAgc2V0IG1pbk1heCh2YWx1ZTogbnVtYmVyW10pIHtcbiAgICBbdGhpcy5fbW9kZWwubWluLCB0aGlzLl9tb2RlbC5tYXhdID0gdmFsdWU7XG4gIH1cbiAgLy9ub3QgdXNlZFxuICBnZXQgc2luZ2xlVmFsdWUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuc2luZ2xlVmFsdWU7XG4gIH1cbiAgLy9ub3QgdXNlZFxuICBzZXQgc2luZ2xlVmFsdWUodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX21vZGVsLnNpbmdsZVZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcmFuZ2VWYWx1ZSgpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLnJhbmdlVmFsdWU7XG4gIH1cblxuICBzZXQgcmFuZ2VWYWx1ZSh2YWx1ZTogbnVtYmVyW10pIHtcbiAgICB0aGlzLl9tb2RlbC5yYW5nZVZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBnZXQgc3RlcCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5zdGVwO1xuICB9XG5cbiAgc2V0IHN0ZXAodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX21vZGVsLnN0ZXAgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBpc1ZlcnRpY2FsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5pc1ZlcnRpY2FsO1xuICB9XG5cbiAgc2V0IGlzVmVydGljYWwodmVydGljYWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9tb2RlbC5pc1ZlcnRpY2FsID0gdmVydGljYWw7XG4gIH1cblxuICBnZXQgaGFzUmFuZ2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmhhc1JhbmdlO1xuICB9XG5cbiAgc2V0IGhhc1JhbmdlKHJhbmdlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbW9kZWwuaGFzUmFuZ2UgPSByYW5nZTtcbiAgfVxuICBnZXQgaGFzTGFiZWxzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5oYXNMYWJlbHM7XG4gIH1cblxuICBzZXQgaGFzTGFiZWxzKGxhYmVsOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbW9kZWwuaGFzTGFiZWxzID0gbGFiZWw7XG4gIH1cbn1cblxuZXhwb3J0IHsgRmFjYWRlIH07XG4iLCJpbXBvcnQgeyBNYWluTW9kZWwgfSBmcm9tICcuLi9tb2RlbC9NYWluTW9kZWwnO1xuaW1wb3J0IHsgTWFpblZpZXcgfSBmcm9tICcuLi92aWV3L01haW5WaWV3JztcbmltcG9ydCB7IHNsaWRlck9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbC9zbGlkZXJPcHRpb25zJztcblxuY2xhc3MgUHJlc2VudGVyIHtcbiAgcHJpdmF0ZSBfbW9kZWw6IE1haW5Nb2RlbDtcbiAgcHJpdmF0ZSBfdmlldzogTWFpblZpZXc7XG4gIHByaXZhdGUgX3ZhbHVlczogbnVtYmVyW107XG4gIHByaXZhdGUgX3BhcmVudDogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IocGFyZW50OiBIVE1MRWxlbWVudCwgbW9kZWw6IE1haW5Nb2RlbCkge1xuICAgIHRoaXMuX21vZGVsID0gbW9kZWw7XG4gICAgdGhpcy5fdmFsdWVzID0gdGhpcy5fbW9kZWwucmFuZ2VWYWx1ZTtcbiAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5fdmlldyA9IG5ldyBNYWluVmlldyhcbiAgICAgIHRoaXMuX3BhcmVudCxcbiAgICAgIHRoaXMuX21vZGVsLmhhc1JhbmdlLFxuICAgICAgdGhpcy5fbW9kZWwuaXNWZXJ0aWNhbCxcbiAgICAgIHRoaXMuX21vZGVsLm1pbixcbiAgICAgIHRoaXMuX21vZGVsLm1heCxcbiAgICAgIHRoaXMuX3ZhbHVlcyxcbiAgICAgIHRoaXMuX21vZGVsLnN0ZXAsXG4gICAgICB0aGlzLl9tb2RlbC5oYXNMYWJlbHMsXG4gICAgKTtcbiAgICB0aGlzLnVwZGF0ZU1vZGVsKCk7XG4gICAgdGhpcy51cGRhdGVWaWV3KCk7XG4gIH1cblxuICB1cGRhdGVNb2RlbCgpIHtcbiAgICB0aGlzLl92aWV3Lm9ic2VydmVyLnN1YnNjcmliZSgodmFsdWVEYXRhOiBzbGlkZXJPcHRpb25zKSA9PiB7XG4gICAgICBpZiAodmFsdWVEYXRhLm1pbikgdGhpcy5fbW9kZWwubWluID0gdmFsdWVEYXRhLm1pbjtcbiAgICAgIGlmICh2YWx1ZURhdGEubWF4KSB0aGlzLl9tb2RlbC5tYXggPSB2YWx1ZURhdGEubWF4O1xuICAgICAgaWYgKHZhbHVlRGF0YS52YWx1ZXMpIHRoaXMuX21vZGVsLnJhbmdlVmFsdWUgPSB2YWx1ZURhdGEudmFsdWVzO1xuICAgICAgaWYgKHZhbHVlRGF0YS5pc1ZlcnRpY2FsICE9PSB1bmRlZmluZWQpIHRoaXMuX21vZGVsLmlzVmVydGljYWwgPSB2YWx1ZURhdGEuaXNWZXJ0aWNhbDtcbiAgICAgIGlmICh2YWx1ZURhdGEuc3RlcCkgdGhpcy5fbW9kZWwuc3RlcCA9IHZhbHVlRGF0YS5zdGVwO1xuICAgICAgaWYgKHZhbHVlRGF0YS5oYXNSYW5nZSAhPT0gdW5kZWZpbmVkKSB0aGlzLl9tb2RlbC5oYXNSYW5nZSA9IHZhbHVlRGF0YS5oYXNSYW5nZTtcbiAgICAgIGlmICh2YWx1ZURhdGEuaGFzTGFiZWxzICE9PSB1bmRlZmluZWQpIHRoaXMuX21vZGVsLmhhc0xhYmVscyA9IHZhbHVlRGF0YS5oYXNMYWJlbHM7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVWaWV3KCkge1xuICAgIHRoaXMuX21vZGVsLm9ic2VydmVyLnN1YnNjcmliZSgodmFsdWVEYXRhOiBzbGlkZXJPcHRpb25zKSA9PiB7XG4gICAgICB0aGlzLl92aWV3LnVwZGF0ZSh2YWx1ZURhdGEpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0IHBhcmVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xuICB9XG59XG5cbmV4cG9ydCB7IFByZXNlbnRlciB9O1xuIiwiaW1wb3J0IHsgTGFiZWxWaWV3IH0gZnJvbSAnLi9MYWJlbFZpZXcnO1xuXG5jbGFzcyBIYW5kbGVyVmlldyB7XG4gIHByaXZhdGUgX3BhcmVudDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX2hhbmRsZXI6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9sYWJlbDogTGFiZWxWaWV3IHwgbnVsbDtcbiAgcHJpdmF0ZSBfc2hvd0xhYmVsOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmVudDogSFRNTEVsZW1lbnQsIHNob3dMYWJlbDogYm9vbGVhbikge1xuICAgIHRoaXMuX2hhbmRsZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5fc2hvd0xhYmVsID0gc2hvd0xhYmVsO1xuICAgIHRoaXMuX2xhYmVsID0gc2hvd0xhYmVsID8gbmV3IExhYmVsVmlldygpIDogbnVsbDtcbiAgICB0aGlzLmhhbmRsZXJJbml0KCk7XG4gIH1cbiAgcHJpdmF0ZSBoYW5kbGVySW5pdCgpIHtcbiAgICB0aGlzLl9wYXJlbnQuYXBwZW5kKHRoaXMuX2hhbmRsZXIpO1xuICAgIHRoaXMuX2hhbmRsZXIuY2xhc3NMaXN0LmFkZCgnaGFuZGxlcicpO1xuICAgIGlmICh0aGlzLl9sYWJlbCkgdGhpcy5faGFuZGxlci5iZWZvcmUodGhpcy5fbGFiZWwuZWxlbSk7XG4gIH1cblxuICBwcml2YXRlIGdldEhhbmRsZXJTaXplKGlzVmVydGljYWw6IGJvb2xlYW4pIHtcbiAgICBjb25zdCBoYW5kbGVyU2l6ZSA9IGlzVmVydGljYWxcbiAgICAgID8gKHRoaXMuX2hhbmRsZXIub2Zmc2V0SGVpZ2h0IC8gdGhpcy5fcGFyZW50Lm9mZnNldEhlaWdodCkgKiAxMDBcbiAgICAgIDogKHRoaXMuX2hhbmRsZXIub2Zmc2V0V2lkdGggLyB0aGlzLl9wYXJlbnQub2Zmc2V0V2lkdGgpICogMTAwO1xuICAgIHJldHVybiBoYW5kbGVyU2l6ZTtcbiAgfVxuXG4gIHNldFBvc2l0aW9uKHZhbHVlOiBudW1iZXIsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlciwgaXNWZXJ0aWNhbDogYm9vbGVhbikge1xuICAgIGNvbnN0IHZhbHVlc0NvdW50ID0gbWF4IC0gbWluO1xuICAgIGNvbnN0IHBvc2l0aW9uUHJvcGVydHkgPSBpc1ZlcnRpY2FsID8gJ2JvdHRvbScgOiAnbGVmdCc7XG4gICAgY29uc3QgaGFuZGxlclNpemUgPSB0aGlzLmdldEhhbmRsZXJTaXplKGlzVmVydGljYWwpO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gKCh2YWx1ZSAtIG1pbikgLyB2YWx1ZXNDb3VudCkgKiAxMDAgLSBoYW5kbGVyU2l6ZSAvIDI7XG4gICAgdGhpcy5faGFuZGxlci5zdHlsZVtwb3NpdGlvblByb3BlcnR5XSA9IGAke3Bvc2l0aW9ufSVgO1xuICAgIHRoaXMuc2V0TGFiZWxQb3NpdGlvbih2YWx1ZSwgdmFsdWVzQ291bnQsIG1pbiwgaXNWZXJ0aWNhbCk7XG4gIH1cblxuICBwcml2YXRlIHNldExhYmVsUG9zaXRpb24odmFsdWU6IG51bWJlciwgdmFsdWVzQ291bnQ6IG51bWJlciwgbWluOiBudW1iZXIsIGlzVmVydGljYWw6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5fbGFiZWwpIHtcbiAgICAgIGNvbnN0IGxhYmVsU2l6ZSA9IHRoaXMuX2xhYmVsLmdldExhYmVsU2l6ZShpc1ZlcnRpY2FsLCB0aGlzLl9wYXJlbnQpO1xuICAgICAgY29uc3QgZml4ZWRQb3NpdGlvblByb3BlcnR5ID0gdGhpcy5fbGFiZWwuZ2V0Rml4ZWRQb3NpdGlvblByb3BlcnR5KGlzVmVydGljYWwpO1xuICAgICAgY29uc3QgcG9zaXRpb25Qcm9wZXJ0eSA9IGlzVmVydGljYWwgPyAnYm90dG9tJyA6ICdsZWZ0JztcbiAgICAgIGNvbnN0IGxhYmVsUG9zaXRpb24gPSAoKHZhbHVlIC0gbWluKSAvIHZhbHVlc0NvdW50KSAqIDEwMCAtIGxhYmVsU2l6ZSAvIDI7XG4gICAgICB0aGlzLl9sYWJlbC5lbGVtLnN0eWxlW3Bvc2l0aW9uUHJvcGVydHldID0gYCR7bGFiZWxQb3NpdGlvbn0lYDtcbiAgICAgIHRoaXMuX2xhYmVsLmVsZW0uc3R5bGVbZml4ZWRQb3NpdGlvblByb3BlcnR5XSA9ICczMzAlJztcbiAgICAgIHRoaXMuc2V0TGFiZWxWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGVsZW0oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZXI7XG4gIH1cbiAgZ2V0IGxhYmVsRWxlbSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbGFiZWw/LmVsZW07XG4gIH1cbiAgcHJpdmF0ZSBzZXRMYWJlbFZhbHVlKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fbGFiZWwpIHRoaXMuX2xhYmVsLnNldExhYmVsVmFsdWUodmFsdWUpO1xuICB9XG5cbiAgdXBkYXRlTGFiZWwoc2hvd0xhYmVsOiBib29sZWFuIHwgdW5kZWZpbmVkLCB2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHNob3dMYWJlbCkge1xuICAgICAgdGhpcy5fbGFiZWwgPSB0aGlzLl9sYWJlbCA/IHRoaXMuX2xhYmVsIDogbmV3IExhYmVsVmlldygpO1xuICAgICAgdGhpcy5faGFuZGxlci5iZWZvcmUodGhpcy5fbGFiZWwuZWxlbSk7XG4gICAgICB0aGlzLnNldExhYmVsVmFsdWUodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9sYWJlbD8uZWxlbS5yZW1vdmUoKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgSGFuZGxlclZpZXcgfTtcbiIsImNsYXNzIExhYmVsVmlldyB7XG4gIHByaXZhdGUgX2xhYmVsOiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9sYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX2xhYmVsLmNsYXNzTGlzdC5hZGQoJ2xhYmVsJyk7XG4gIH1cblxuICBnZXQgZWxlbSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbGFiZWw7XG4gIH1cbiAgc2V0TGFiZWxWYWx1ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fbGFiZWwuaW5uZXJUZXh0ID0gdmFsdWUudG9TdHJpbmcoKTtcbiAgfVxuXG4gIGdldExhYmVsU2l6ZShpc1ZlcnRpY2FsOiBib29sZWFuLCBwYXJlbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3QgbGFiZWxTaXplID0gaXNWZXJ0aWNhbFxuICAgICAgPyAodGhpcy5lbGVtLm9mZnNldEhlaWdodCAvIHBhcmVudC5vZmZzZXRIZWlnaHQpICogMTAwXG4gICAgICA6ICh0aGlzLmVsZW0ub2Zmc2V0V2lkdGggLyBwYXJlbnQub2Zmc2V0V2lkdGgpICogMTAwO1xuXG4gICAgcmV0dXJuIGxhYmVsU2l6ZTtcbiAgfVxuXG4gIGdldEZpeGVkUG9zaXRpb25Qcm9wZXJ0eShpc1ZlcnRpY2FsOiBib29sZWFuKSB7XG4gICAgY29uc3QgZml4ZWRQb3NpdGlvblByb3BlcnR5ID0gaXNWZXJ0aWNhbCA/ICdsZWZ0JyA6ICdib3R0b20nO1xuICAgIHJldHVybiBmaXhlZFBvc2l0aW9uUHJvcGVydHk7XG4gIH1cbn1cblxuZXhwb3J0IHsgTGFiZWxWaWV3IH07XG4iLCJpbXBvcnQgeyBIYW5kbGVyVmlldyB9IGZyb20gJy4vSGFuZGxlclZpZXcnO1xuaW1wb3J0IHsgRXZlbnRPYnNlcnZlciB9IGZyb20gJy4uL29ic2VydmVyL29ic2VydmVyJztcbmltcG9ydCB7IHNsaWRlck9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbC9zbGlkZXJPcHRpb25zJztcblxuY2xhc3MgTWFpblZpZXcge1xuICBwdWJsaWMgb2JzZXJ2ZXI6IEV2ZW50T2JzZXJ2ZXI7XG4gIHByaXZhdGUgX3NsaWRlckJvZHk6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9wYXJlbnQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9zZWxlY3RlZFJhbmdlOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfaGFuZGxlcnM6IEhhbmRsZXJWaWV3W107XG4gIHByaXZhdGUgX21pbjogbnVtYmVyO1xuICBwcml2YXRlIF9tYXg6IG51bWJlcjtcbiAgcHJpdmF0ZSBfdmFsdWVzOiBudW1iZXJbXTtcbiAgcHJpdmF0ZSBfc3RlcDogbnVtYmVyO1xuICBwcml2YXRlIF9pc1ZlcnRpY2FsOiBib29sZWFuO1xuICBwcml2YXRlIF9oYXNSYW5nZTogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfaGFzTGFiZWxzOiBib29sZWFuO1xuICBwcml2YXRlIF9tb3VzZU1vdmU6IGFueTtcbiAgcHJpdmF0ZSBfbW91c2VVcDogYW55O1xuICBwcml2YXRlIF9oYW5kbGVyVGFyZ2V0SWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwYXJlbnQ6IEhUTUxFbGVtZW50LFxuICAgIGhhc1JhbmdlOiBib29sZWFuLFxuICAgIGlzVmVydGljYWw6IGJvb2xlYW4sXG4gICAgbWluOiBudW1iZXIsXG4gICAgbWF4OiBudW1iZXIsXG4gICAgdmFsdWVzOiBudW1iZXJbXSxcbiAgICBzdGVwOiBudW1iZXIsXG4gICAgaGFzTGFiZWxzOiBib29sZWFuLFxuICApIHtcbiAgICB0aGlzLm9ic2VydmVyID0gbmV3IEV2ZW50T2JzZXJ2ZXIoKTtcbiAgICB0aGlzLl9taW4gPSBtaW47XG4gICAgdGhpcy5fbWF4ID0gbWF4O1xuICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlcztcbiAgICB0aGlzLl9zdGVwID0gc3RlcDtcbiAgICB0aGlzLl9pc1ZlcnRpY2FsID0gaXNWZXJ0aWNhbDtcbiAgICB0aGlzLl9oYXNSYW5nZSA9IGhhc1JhbmdlO1xuICAgIHRoaXMuX2hhc0xhYmVscyA9IGhhc0xhYmVscztcbiAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5fc2xpZGVyQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX3NlbGVjdGVkUmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9oYW5kbGVycyA9IFtdO1xuICAgIHRoaXMuX21vdXNlTW92ZTtcbiAgICB0aGlzLl9tb3VzZVVwO1xuICAgIHRoaXMuX2hhbmRsZXJUYXJnZXRJZCA9ICcnO1xuXG4gICAgdGhpcy5zbGlkZXJJbml0KCk7XG5cbiAgICB0aGlzLl9oYW5kbGVycy5mb3JFYWNoKGhhbmRsZXIgPT4ge1xuICAgICAgaGFuZGxlci5lbGVtLm9uZHJhZ3N0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH07XG4gICAgICBoYW5kbGVyLmVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5kcmFnQW5kRHJvcC5iaW5kKHRoaXMpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2xpZGVySW5pdCgpIHtcbiAgICB0aGlzLnNldFNsaWRlckJvZHkoKTtcbiAgICB0aGlzLnNldE9yaWVudGF0aW9uKHRoaXMuX2lzVmVydGljYWwpO1xuICAgIHRoaXMuc2V0SGFuZGxlcnModGhpcy5faGFzUmFuZ2UpO1xuICAgIHRoaXMuc2V0SGFuZGxlclBvc2l0aW9uKHRoaXMuX3ZhbHVlcywgdGhpcy5faXNWZXJ0aWNhbCk7XG5cbiAgICB0aGlzLnNldFNlbGVjdGVkUmFuZ2UoKTtcbiAgICB0aGlzLnVwZGF0ZVNlbGVjdGVkUmFuZ2UoKTtcbiAgfVxuXG4gIHVwZGF0ZSh2YWx1ZURhdGE6IHNsaWRlck9wdGlvbnMpIHtcbiAgICB0aGlzLl9taW4gPSB2YWx1ZURhdGEubWluID8gdmFsdWVEYXRhLm1pbiA6IHRoaXMuX21pbjtcbiAgICB0aGlzLl9tYXggPSB2YWx1ZURhdGEubWF4ID8gdmFsdWVEYXRhLm1heCA6IHRoaXMuX21heDtcbiAgICB0aGlzLl92YWx1ZXMgPSB2YWx1ZURhdGEudmFsdWVzID8gdmFsdWVEYXRhLnZhbHVlcyA6IHRoaXMuX3ZhbHVlcztcbiAgICB0aGlzLl9pc1ZlcnRpY2FsID0gdmFsdWVEYXRhLmlzVmVydGljYWwgIT09IHVuZGVmaW5lZCA/IHZhbHVlRGF0YS5pc1ZlcnRpY2FsIDogdGhpcy5faXNWZXJ0aWNhbDtcbiAgICB0aGlzLl9oYXNSYW5nZSA9IHZhbHVlRGF0YS5oYXNSYW5nZSAhPT0gdW5kZWZpbmVkID8gdmFsdWVEYXRhLmhhc1JhbmdlIDogdGhpcy5faGFzUmFuZ2U7XG4gICAgdGhpcy5faGFzTGFiZWxzID0gdmFsdWVEYXRhLmhhc0xhYmVscyAhPT0gdW5kZWZpbmVkID8gdmFsdWVEYXRhLmhhc0xhYmVscyA6IHRoaXMuX2hhc0xhYmVscztcbiAgICB0aGlzLnVwZGF0ZVJhbmdlKCk7XG4gICAgdGhpcy5zZXRPcmllbnRhdGlvbih0aGlzLl9pc1ZlcnRpY2FsKTtcbiAgICB0aGlzLnNldEhhbmRsZXJQb3NpdGlvbih0aGlzLl92YWx1ZXMsIHRoaXMuX2lzVmVydGljYWwpO1xuICAgIHRoaXMudXBkYXRlU2VsZWN0ZWRSYW5nZSgpO1xuICAgIGlmICh2YWx1ZURhdGEuc3RlcCkgdGhpcy5fc3RlcCA9IHZhbHVlRGF0YS5zdGVwO1xuXG4gICAgdGhpcy5faGFuZGxlcnMuZm9yRWFjaCgoaGFuZGxlciwgaW5kZXgpID0+XG4gICAgICBoYW5kbGVyLnVwZGF0ZUxhYmVsKHRoaXMuX2hhc0xhYmVscywgdGhpcy5fdmFsdWVzW2luZGV4XSksXG4gICAgKTtcbiAgfVxuXG4gIHNldFNsaWRlckJvZHkoKSB7XG4gICAgdGhpcy5fc2xpZGVyQm9keS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJCb2R5Jyk7XG4gICAgdGhpcy5fcGFyZW50LmFwcGVuZENoaWxkKHRoaXMuX3NsaWRlckJvZHkpO1xuICB9XG5cbiAgc2V0T3JpZW50YXRpb24oaXNWZXJ0aWNhbDogYm9vbGVhbikge1xuICAgIHRoaXMuX2lzVmVydGljYWwgPSBpc1ZlcnRpY2FsO1xuICAgIGlmIChpc1ZlcnRpY2FsKSB7XG4gICAgICB0aGlzLl9wYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX2hvcml6b250YWwnKTtcbiAgICAgIHRoaXMuX3BhcmVudC5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfdmVydGljYWwnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlcl92ZXJ0aWNhbCcpO1xuICAgICAgdGhpcy5fcGFyZW50LmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9ob3Jpem9udGFsJyk7XG4gICAgfVxuICB9XG5cbiAgc2V0SGFuZGxlcnMoaGFzUmFuZ2U6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oYW5kbGVycy5wdXNoKG5ldyBIYW5kbGVyVmlldyh0aGlzLl9zbGlkZXJCb2R5LCB0aGlzLl9oYXNMYWJlbHMpKTtcbiAgICBpZiAoaGFzUmFuZ2UpIHtcbiAgICAgIHRoaXMuX2hhbmRsZXJzLnB1c2gobmV3IEhhbmRsZXJWaWV3KHRoaXMuX3NsaWRlckJvZHksIHRoaXMuX2hhc0xhYmVscykpO1xuICAgICAgdGhpcy5faGFuZGxlcnNbMF0uZWxlbS5pZCA9ICdoYW5kbGVyX21pbic7XG4gICAgICB0aGlzLl9oYW5kbGVyc1sxXS5lbGVtLmlkID0gJ2hhbmRsZXJfbWF4JztcbiAgICB9XG4gIH1cblxuICBnZXRIYW5kbGVycygpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlcnM7XG4gIH1cblxuICB1cGRhdGVSYW5nZSgpIHtcbiAgICBpZiAoIXRoaXMuX2hhc1JhbmdlKSB7XG4gICAgICB0aGlzLl9oYW5kbGVyc1sxXS5lbGVtLnJlbW92ZSgpO1xuICAgICAgdGhpcy5faGFuZGxlcnNbMV0ubGFiZWxFbGVtPy5yZW1vdmUoKTtcbiAgICAgIHRoaXMuX3NlbGVjdGVkUmFuZ2UuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWRSYW5nZScpO1xuICAgICAgdGhpcy5fc2VsZWN0ZWRSYW5nZS5jbGFzc0xpc3QucmVtb3ZlKCdyYW5nZV9iZXR3ZWVuJyk7XG4gICAgICB0aGlzLnVwZGF0ZVNlbGVjdGVkUmFuZ2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGFuZGxlcnNbMF0uZWxlbS5hZnRlcih0aGlzLl9oYW5kbGVyc1sxXS5lbGVtKTtcbiAgICAgIHRoaXMuX3NlbGVjdGVkUmFuZ2UuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWRSYW5nZScpO1xuICAgICAgdGhpcy5fc2VsZWN0ZWRSYW5nZS5jbGFzc0xpc3QuYWRkKCdyYW5nZV9iZXR3ZWVuJyk7XG4gICAgfVxuICB9XG5cbiAgc2V0SGFuZGxlclBvc2l0aW9uKHZhbHVlczogbnVtYmVyW10sIGlzVmVydGljYWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oYW5kbGVycy5mb3JFYWNoKChoYW5kbGVyLCBpbmRleCkgPT5cbiAgICAgIGhhbmRsZXIuc2V0UG9zaXRpb24odmFsdWVzW2luZGV4XSwgdGhpcy5fbWluLCB0aGlzLl9tYXgsIGlzVmVydGljYWwpLFxuICAgICk7XG4gIH1cblxuICBzZXRTZWxlY3RlZFJhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlbGVjdGVkUmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9zbGlkZXJCb2R5LmFwcGVuZCh0aGlzLl9zZWxlY3RlZFJhbmdlKTtcbiAgICB0aGlzLl9zZWxlY3RlZFJhbmdlLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkUmFuZ2UnKTtcbiAgICBpZiAodGhpcy5faGFzUmFuZ2UpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGVkUmFuZ2UuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWRSYW5nZScpO1xuICAgICAgdGhpcy5fc2VsZWN0ZWRSYW5nZS5jbGFzc0xpc3QuYWRkKCdyYW5nZV9iZXR3ZWVuJyk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlU2VsZWN0ZWRSYW5nZSgpIHtcbiAgICB0aGlzLl9pc1ZlcnRpY2FsXG4gICAgICA/ICh0aGlzLl9zZWxlY3RlZFJhbmdlLnN0eWxlLmhlaWdodCA9XG4gICAgICAgICAgdGhpcy5nZXRDb29yZHModGhpcy5fc2xpZGVyQm9keSkgLSB0aGlzLmdldENvb3Jkcyh0aGlzLl9oYW5kbGVyc1swXS5lbGVtKSArICdweCcpXG4gICAgICA6ICh0aGlzLl9zZWxlY3RlZFJhbmdlLnN0eWxlLndpZHRoID0gdGhpcy5nZXRDb29yZHModGhpcy5faGFuZGxlcnNbMF0uZWxlbSkgKyAncHgnKTtcbiAgICBpZiAodGhpcy5faGFzUmFuZ2UpIHtcbiAgICAgIGNvbnN0IHBvc01pbiA9IHRoaXMuX2lzVmVydGljYWwgPyAnYm90dG9tJyA6ICdsZWZ0JztcbiAgICAgIGNvbnN0IHNpemUgPSB0aGlzLl9pc1ZlcnRpY2FsID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuICAgICAgdGhpcy5fc2VsZWN0ZWRSYW5nZS5zdHlsZVtwb3NNaW5dID0gdGhpcy5faXNWZXJ0aWNhbFxuICAgICAgICA/IHRoaXMuZ2V0Q29vcmRzKHRoaXMuX3NsaWRlckJvZHkpIC0gdGhpcy5nZXRDb29yZHModGhpcy5faGFuZGxlcnNbMF0uZWxlbSkgKyAncHgnXG4gICAgICAgIDogdGhpcy5nZXRDb29yZHModGhpcy5faGFuZGxlcnNbMF0uZWxlbSkgKyAncHgnO1xuICAgICAgdGhpcy5fc2VsZWN0ZWRSYW5nZS5zdHlsZVtzaXplXSA9IHRoaXMuX2lzVmVydGljYWxcbiAgICAgICAgPyB0aGlzLmdldENvb3Jkcyh0aGlzLl9oYW5kbGVyc1swXS5lbGVtKSAtIHRoaXMuZ2V0Q29vcmRzKHRoaXMuX2hhbmRsZXJzWzFdLmVsZW0pICsgJ3B4J1xuICAgICAgICA6IHRoaXMuZ2V0Q29vcmRzKHRoaXMuX2hhbmRsZXJzWzFdLmVsZW0pIC0gdGhpcy5nZXRDb29yZHModGhpcy5faGFuZGxlcnNbMF0uZWxlbSkgKyAncHgnO1xuICAgIH1cbiAgfVxuXG4gIGdldENvb3JkcyhlbGVtOiBIVE1MRWxlbWVudCkge1xuICAgIGNvbnN0IGJveCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgaWYgKHRoaXMuX2lzVmVydGljYWwpIHtcbiAgICAgIHJldHVybiBib3guYm90dG9tICsgcGFnZVlPZmZzZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBib3gubGVmdCArIHBhZ2VYT2Zmc2V0O1xuICAgIH1cbiAgfVxuICBkcmFnQW5kRHJvcChlOiBNb3VzZUV2ZW50KSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0IGFzIEhUTUxEaXZFbGVtZW50O1xuICAgIHRoaXMuX2hhbmRsZXJUYXJnZXRJZCA9IHRhcmdldC5pZDtcbiAgICB0aGlzLl9tb3VzZU1vdmUgPSB0aGlzLm9uTW91c2VNb3ZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fbW91c2VVcCA9IHRoaXMub25Nb3VzZVVwLmJpbmQodGhpcyk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5fbW91c2VNb3ZlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5fbW91c2VVcCk7XG4gIH1cblxuICBvbk1vdXNlTW92ZShlOiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKHRoaXMuX2lzVmVydGljYWwpIHtcbiAgICAgIHRoaXMubW92ZUF0KGUucGFnZVksIHRoaXMuX2hhbmRsZXJUYXJnZXRJZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW92ZUF0KGUucGFnZVgsIHRoaXMuX2hhbmRsZXJUYXJnZXRJZCk7XG4gICAgfVxuICB9XG5cbiAgbW92ZUF0KGNvb3JkaW5hdGU6IG51bWJlciwgdGFyZ2V0SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNsaWRlckNvb3JkID0gdGhpcy5nZXRDb29yZHModGhpcy5fc2xpZGVyQm9keSk7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLl9pc1ZlcnRpY2FsXG4gICAgICA/ICgoc2xpZGVyQ29vcmQgLSBjb29yZGluYXRlKSAvIHRoaXMuX3NsaWRlckJvZHkub2Zmc2V0SGVpZ2h0KSAqICh0aGlzLl9tYXggLSB0aGlzLl9taW4pICtcbiAgICAgICAgdGhpcy5fbWluXG4gICAgICA6ICgoY29vcmRpbmF0ZSAtIHNsaWRlckNvb3JkKSAvIHRoaXMuX3NsaWRlckJvZHkub2Zmc2V0V2lkdGgpICogKHRoaXMuX21heCAtIHRoaXMuX21pbikgK1xuICAgICAgICB0aGlzLl9taW47XG4gICAgaWYgKCF0YXJnZXRJZCB8fCB0YXJnZXRJZCA9PT0gJ2hhbmRsZXJfbWluJykge1xuICAgICAgdGhpcy5vYnNlcnZlci5icm9hZGNhc3Qoe1xuICAgICAgICB2YWx1ZXM6IFt2YWx1ZSwgdGhpcy5fdmFsdWVzWzFdXSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9ic2VydmVyLmJyb2FkY2FzdCh7XG4gICAgICAgIHZhbHVlczogW3RoaXMuX3ZhbHVlc1swXSwgdmFsdWVdLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25Nb3VzZVVwKCkge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX21vdXNlTW92ZSk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25Nb3VzZVVwKTtcbiAgfVxufVxuXG5leHBvcnQgeyBNYWluVmlldyB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==