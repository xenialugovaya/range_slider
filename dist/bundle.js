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
        this._view = new _view_MainView__WEBPACK_IMPORTED_MODULE_0__["MainView"](this._parent, this._model.hasRange, this._model.isVertical, this._model.min, this._model.max, this._values, this._model.hasLabels);
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
/* harmony import */ var _SelectedAreaView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SelectedAreaView */ "./src/view/SelectedAreaView.ts");
/* harmony import */ var _observer_observer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../observer/observer */ "./src/observer/observer.ts");



class MainView {
    constructor(parent, hasRange, isVertical, min, max, values, hasLabels) {
        this.observer = new _observer_observer__WEBPACK_IMPORTED_MODULE_2__["EventObserver"]();
        this._handlers = [];
        this._min = min;
        this._max = max;
        this._values = values;
        this._isVertical = isVertical;
        this._hasRange = hasRange;
        this._hasLabels = hasLabels;
        this._parent = parent;
        this._sliderBody = document.createElement('div');
        this._mouseMove;
        this._mouseUp;
        this._handlerTargetId = '';
        this.sliderInit();
        this._selectedArea = new _SelectedAreaView__WEBPACK_IMPORTED_MODULE_1__["SelectedArea"](this._sliderBody, this._hasRange, this._isVertical, this._handlers[0].elem, this._handlers[1].elem);
        this._handlers.forEach(handler => {
            handler.elem.ondragstart = function () {
                return false;
            };
            handler.elem.addEventListener('mousedown', this.dragAndDrop.bind(this));
        });
    }
    sliderInit() {
        this.setSliderBody();
        this.setOrientation();
        this.setHandlers();
        this.setHandlerPosition(this._values, this._isVertical);
    }
    update(valueData) {
        this._min = valueData.min ? valueData.min : this._min;
        this._max = valueData.max ? valueData.max : this._max;
        this._values = valueData.values ? valueData.values : this._values;
        this._isVertical = valueData.isVertical !== undefined ? valueData.isVertical : this._isVertical;
        this._hasRange = valueData.hasRange !== undefined ? valueData.hasRange : this._hasRange;
        this._hasLabels = valueData.hasLabels !== undefined ? valueData.hasLabels : this._hasLabels;
        this.setOrientation();
        this.setHandlerPosition(this._values, this._isVertical);
        this._handlers.forEach((handler, index) => handler.updateLabel(this._hasLabels, this._values[index]));
        this.updateHandlersAmount(this._hasRange);
        this._selectedArea.updateSelectedRange(this._hasRange, this._isVertical, this._handlers[1].elem, this._handlers[0].elem, this._handlers[1].labelElem);
    }
    setSliderBody() {
        this._sliderBody.classList.add('sliderBody');
        this._parent.appendChild(this._sliderBody);
    }
    setOrientation() {
        if (this._isVertical) {
            this._parent.classList.remove('slider_horizontal');
            this._parent.classList.add('slider_vertical');
        }
        else {
            this._parent.classList.remove('slider_vertical');
            this._parent.classList.add('slider_horizontal');
        }
    }
    setHandlers() {
        this._handlers.push(new _HandlerView__WEBPACK_IMPORTED_MODULE_0__["HandlerView"](this._sliderBody, this._hasLabels));
        if (this._hasRange) {
            this._handlers.push(new _HandlerView__WEBPACK_IMPORTED_MODULE_0__["HandlerView"](this._sliderBody, this._hasLabels));
            this._handlers[0].elem.id = 'handler_min';
            this._handlers[1].elem.id = 'handler_max';
        }
    }
    getHandlers() {
        return this._handlers;
    }
    setHandlerPosition(values, isVertical) {
        this._handlers.forEach((handler, index) => handler.setPosition(values[index], this._min, this._max, isVertical));
    }
    updateHandlersAmount(range) {
        var _a;
        if (!range) {
            this._handlers[1].elem.remove();
            (_a = this._handlers[1].labelElem) === null || _a === void 0 ? void 0 : _a.remove();
        }
        else {
            this._handlers[0].elem.after(this._handlers[1].elem);
            if (this._handlers[1].labelElem)
                this._handlers[1].elem.before(this._handlers[1].labelElem);
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



/***/ }),

/***/ "./src/view/SelectedAreaView.ts":
/*!**************************************!*\
  !*** ./src/view/SelectedAreaView.ts ***!
  \**************************************/
/*! exports provided: SelectedArea */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectedArea", function() { return SelectedArea; });
class SelectedArea {
    constructor(parent, range, vertical, handlerMin, handlerMax) {
        this._parent = parent;
        this._selectedRange = document.createElement('div');
        this._parent.append(this._selectedRange);
        if (!range) {
            this._selectedRange.classList.add('selectedRange');
            this.setPositionSingle(vertical, handlerMin);
        }
        else {
            this._selectedRange.classList.add('range_between');
            this.setPositionRange(vertical, handlerMax, handlerMin);
        }
    }
    updateSelectedRange(range, vertical, handlerMax, handlerMin, labelMax) {
        if (!range) {
            this._selectedRange.classList.add('selectedRange');
            this._selectedRange.classList.remove('range_between');
            //handlerMax.remove();
            //if (labelMax) labelMax.remove();
            this.setPositionSingle(vertical, handlerMin);
        }
        else {
            this._selectedRange.classList.remove('selectedRange');
            this._selectedRange.classList.add('range_between');
            //handlerMin.after(handlerMax);
            // if (labelMax) handlerMax.before(labelMax);
            this.setPositionRange(vertical, handlerMax, handlerMin);
        }
    }
    setPositionSingle(vertical, handler) {
        vertical
            ? (this._selectedRange.style.height =
                this.getCoords(this._parent, vertical) - this.getCoords(handler, vertical) + 'px')
            : (this._selectedRange.style.width = this.getCoords(handler, vertical) + 'px');
    }
    setPositionRange(vertical, handlerMax, handlerMin) {
        const posMin = vertical ? 'bottom' : 'left';
        const length = vertical ? 'height' : 'width';
        this._selectedRange.style[posMin] = vertical
            ? this.getCoords(this._parent, vertical) - this.getCoords(handlerMin, vertical) + 'px'
            : this.getCoords(handlerMin, vertical) + 'px';
        this._selectedRange.style[length] = vertical
            ? this.getCoords(handlerMin, vertical) - this.getCoords(handlerMax, vertical) + 'px'
            : this.getCoords(handlerMax, vertical) - this.getCoords(handlerMin, vertical) + 'px';
    }
    getCoords(elem, vertical) {
        const box = elem.getBoundingClientRect();
        if (vertical) {
            return box.bottom + pageYOffset;
        }
        else {
            return box.left + pageXOffset;
        }
    }
}



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbnRyb2xQYW5lbC9Db250cm9sUGFuZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9tb2RlbC9NYWluTW9kZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVsL2hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29ic2VydmVyL29ic2VydmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9wcmVzZW50ZXIvRmFjYWRlLnRzIiwid2VicGFjazovLy8uL3NyYy9wcmVzZW50ZXIvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy92aWV3L0hhbmRsZXJWaWV3LnRzIiwid2VicGFjazovLy8uL3NyYy92aWV3L0xhYmVsVmlldy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlldy9NYWluVmlldy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlldy9TZWxlY3RlZEFyZWFWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFF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RSxRQUFRLENBQUMsR0FBRyxJQUFJO1lBQ3BGLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDekYsQ0FBQztJQUVPLFNBQVMsQ0FBQyxJQUFpQixFQUFFLFFBQWlCO1FBQ3BELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ3pDLElBQUksUUFBUSxFQUFFO1lBQ1osT0FBTyxHQUFHLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztTQUNqQzthQUFNO1lBQ0wsT0FBTyxHQUFHLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztTQUMvQjtJQUNILENBQUM7Q0FDRjtBQUV1QiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7IEZhY2FkZSB9IGZyb20gJy4uL3ByZXNlbnRlci9GYWNhZGUnO1xuXG5jbGFzcyBDb250cm9sUGFuZWwge1xuICBwcml2YXRlIF9zbGlkZXI6IEZhY2FkZTtcbiAgcHJpdmF0ZSBfcGFyZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfY29udHJvbFBhbmVsOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfbWluTWF4SW5wdXRzOiBIVE1MSW5wdXRFbGVtZW50W107XG4gIHByaXZhdGUgX3ZhbHVlSW5wdXRzOiBIVE1MSW5wdXRFbGVtZW50W107XG4gIHByaXZhdGUgX3N0ZXBJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbiAgcHJpdmF0ZSBfb3JpZW50YXRpb25SYWRpb3M6IEhUTUxJbnB1dEVsZW1lbnRbXTtcbiAgcHJpdmF0ZSBfcmFuZ2VSYWRpb3M6IEhUTUxJbnB1dEVsZW1lbnRbXTtcbiAgcHJpdmF0ZSBfc2hvd0xhYmVsUmFkaW9zOiBIVE1MSW5wdXRFbGVtZW50W107XG4gIHByaXZhdGUgX2hhc1JhbmdlOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHNsaWRlcjogRmFjYWRlKSB7XG4gICAgdGhpcy5fc2xpZGVyID0gc2xpZGVyO1xuICAgIHRoaXMuX3BhcmVudCA9IHRoaXMuX3NsaWRlci5wYXJlbnQ7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fdmFsdWVJbnB1dHMgPSBbXTtcbiAgICB0aGlzLl9taW5NYXhJbnB1dHMgPSBbXTtcbiAgICB0aGlzLl9zdGVwSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRoaXMuX29yaWVudGF0aW9uUmFkaW9zID0gW107XG4gICAgdGhpcy5fcmFuZ2VSYWRpb3MgPSBbXTtcbiAgICB0aGlzLl9zaG93TGFiZWxSYWRpb3MgPSBbXTtcbiAgICB0aGlzLl9oYXNSYW5nZSA9IHNsaWRlci5oYXNSYW5nZTtcblxuICAgIHRoaXMucGFuZWxJbml0KCk7XG4gICAgdGhpcy5zZXRFdmVudExpc3RlbmVycygpO1xuICAgIHRoaXMuZ2V0U2xpZGVyT3B0aW9ucygpO1xuICAgIHRoaXMudXBkYXRlVmFsdWVzKCk7XG4gIH1cblxuICBwcml2YXRlIHBhbmVsSW5pdCgpIHtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuY2xhc3NMaXN0LmFkZCgnY29udHJvbFBhbmVsJyk7XG4gICAgdGhpcy5fcGFyZW50LmFmdGVyKHRoaXMuX2NvbnRyb2xQYW5lbCk7XG4gICAgdGhpcy5jcmVhdGVNYXhNaW5JbnB1dHMoKTtcbiAgICB0aGlzLmNyZWF0ZVZhbHVlSW5wdXRzKCk7XG4gICAgdGhpcy5jcmVhdGVTdGVwSW5wdXQoKTtcbiAgICB0aGlzLmNyZWF0ZU9yaWVudGF0aW9uUmFkaW9zKCk7XG4gICAgdGhpcy5jcmVhdGVSYW5nZVJhZGlvcygpO1xuICAgIHRoaXMuY3JlYXRlU2hvd0xhYmVsUmFkaW9zKCk7XG4gIH1cblxuICBwcml2YXRlIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMubWluTWF4SW5wdXRzLmZvckVhY2goaW5wdXQgPT5cbiAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuY2hhbmdlTWluTWF4LmJpbmQodGhpcykpLFxuICAgICk7XG4gICAgdGhpcy52YWx1ZUlucHV0cy5mb3JFYWNoKGlucHV0ID0+XG4gICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmNoYW5nZVZhbHVlcy5iaW5kKHRoaXMpKSxcbiAgICApO1xuICAgIHRoaXMuc3RlcElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuY2hhbmdlU3RlcC5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLm9yaWVudGF0aW9uUmFkaW9zLmZvckVhY2gocmFkaW8gPT5cbiAgICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuY2hhbmdlT3JpZW50YXRpb24uYmluZCh0aGlzKSksXG4gICAgKTtcbiAgICB0aGlzLnJhbmdlUmFkaW9zLmZvckVhY2gocmFkaW8gPT5cbiAgICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuY2hhbmdlUmFuZ2UuYmluZCh0aGlzKSksXG4gICAgKTtcbiAgICB0aGlzLnNob3dMYWJlbFJhZGlvcy5mb3JFYWNoKHJhZGlvID0+XG4gICAgICByYWRpby5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmNoYW5nZUxhYmVsVmlzaWJpbGl0eS5iaW5kKHRoaXMpKSxcbiAgICApO1xuICB9XG5cbiAgZ2V0U2xpZGVyT3B0aW9ucygpIHtcbiAgICB0aGlzLm1pbk1heElucHV0cy5mb3JFYWNoKFxuICAgICAgKGlucHV0LCBpbmRleCkgPT4gKGlucHV0LnZhbHVlID0gdGhpcy5fc2xpZGVyLm1pbk1heFtpbmRleF0udG9TdHJpbmcoKSksXG4gICAgKTtcbiAgICB0aGlzLnZhbHVlSW5wdXRzWzBdLnZhbHVlID0gdGhpcy5fc2xpZGVyLnJhbmdlVmFsdWVbMF0udG9TdHJpbmcoKTtcbiAgICBpZiAodGhpcy52YWx1ZUlucHV0c1sxXSkge1xuICAgICAgdGhpcy52YWx1ZUlucHV0c1sxXS52YWx1ZSA9IHRoaXMuX3NsaWRlci5yYW5nZVZhbHVlWzFdLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHRoaXMuc3RlcElucHV0LnZhbHVlID0gdGhpcy5fc2xpZGVyLnN0ZXAudG9TdHJpbmcoKTtcbiAgICB0aGlzLl9zbGlkZXIuaXNWZXJ0aWNhbFxuICAgICAgPyAodGhpcy5vcmllbnRhdGlvblJhZGlvc1swXS5jaGVja2VkID0gdHJ1ZSlcbiAgICAgIDogKHRoaXMub3JpZW50YXRpb25SYWRpb3NbMV0uY2hlY2tlZCA9IHRydWUpO1xuXG4gICAgaWYgKHRoaXMuX3NsaWRlci5oYXNSYW5nZSkge1xuICAgICAgdGhpcy5yYW5nZVJhZGlvc1sxXS5jaGVja2VkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yYW5nZVJhZGlvc1swXS5jaGVja2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3NsaWRlci5oYXNMYWJlbHMpIHtcbiAgICAgIHRoaXMuc2hvd0xhYmVsUmFkaW9zWzBdLmNoZWNrZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3dMYWJlbFJhZGlvc1sxXS5jaGVja2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNoYW5nZU1pbk1heCgpIHtcbiAgICBjb25zdCBuZXdNaW5NYXggPSB0aGlzLm1pbk1heElucHV0cy5tYXAoaW5wdXQgPT4gcGFyc2VJbnQoaW5wdXQudmFsdWUpKTtcbiAgICB0aGlzLl9zbGlkZXIubWluTWF4ID0gbmV3TWluTWF4O1xuICB9XG5cbiAgcHJpdmF0ZSBjaGFuZ2VWYWx1ZXMoKSB7XG4gICAgY29uc3QgbmV3VmFsdWVzID0gdGhpcy52YWx1ZUlucHV0cy5tYXAoaW5wdXQgPT4gcGFyc2VJbnQoaW5wdXQudmFsdWUpKTtcbiAgICB0aGlzLl9zbGlkZXIucmFuZ2VWYWx1ZSA9IG5ld1ZhbHVlcztcbiAgfVxuICBwcml2YXRlIGNoYW5nZVN0ZXAoKSB7XG4gICAgY29uc3QgbmV3U3RlcCA9IHBhcnNlSW50KHRoaXMuc3RlcElucHV0LnZhbHVlKTtcbiAgICB0aGlzLl9zbGlkZXIuc3RlcCA9IG5ld1N0ZXA7XG4gIH1cblxuICBwcml2YXRlIGNoYW5nZU9yaWVudGF0aW9uKCkge1xuICAgIGNvbnN0IG5ld09yaWVudGF0aW9uID0gdGhpcy5vcmllbnRhdGlvblJhZGlvc1swXS5jaGVja2VkID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHRoaXMuX3NsaWRlci5pc1ZlcnRpY2FsID0gbmV3T3JpZW50YXRpb247XG4gIH1cblxuICBwcml2YXRlIGNoYW5nZVJhbmdlKCkge1xuICAgIGNvbnN0IG5ld1JhbmdlID0gdGhpcy5yYW5nZVJhZGlvc1sxXS5jaGVja2VkID8gdHJ1ZSA6IGZhbHNlO1xuICAgIGlmICghbmV3UmFuZ2UpIHtcbiAgICAgIHRoaXMudmFsdWVJbnB1dHNbMV0ucmVtb3ZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmFsdWVJbnB1dHNbMF0uYWZ0ZXIodGhpcy52YWx1ZUlucHV0c1sxXSk7XG4gICAgfVxuICAgIHRoaXMuX3NsaWRlci5oYXNSYW5nZSA9IG5ld1JhbmdlO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGFuZ2VMYWJlbFZpc2liaWxpdHkoKSB7XG4gICAgY29uc3Qgc2hvd0xhYmVscyA9IHRoaXMuc2hvd0xhYmVsUmFkaW9zWzBdLmNoZWNrZWQgPyB0cnVlIDogZmFsc2U7XG4gICAgdGhpcy5fc2xpZGVyLmhhc0xhYmVscyA9IHNob3dMYWJlbHM7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVZhbHVlcygpIHtcbiAgICB0aGlzLl9zbGlkZXIub2JzZXJ2ZXIuc3Vic2NyaWJlKCh2YWx1ZXM6IG51bWJlcltdKSA9PiB7XG4gICAgICB0aGlzLnZhbHVlSW5wdXRzLmZvckVhY2goKGlucHV0LCBpbmRleCkgPT4gKGlucHV0LnZhbHVlID0gdmFsdWVzW2luZGV4XS50b1N0cmluZygpKSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZU1heE1pbklucHV0cygpIHtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKHRpdGxlKTtcbiAgICB0aXRsZS5pbm5lclRleHQgPSAn0JzQuNC9LiDQt9C90LDRh9C10L3QuNC1L9Cc0LDQutGBLiDQt9C90LDRh9C10L3QuNC1JztcbiAgICBjb25zdCBpbnB1dE1pbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgY29uc3QgaW5wdXRNYXggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGlucHV0TWluLmNsYXNzTGlzdC5hZGQoJ2xpbWl0VmFsdWUnKTtcbiAgICBpbnB1dE1heC5jbGFzc0xpc3QuYWRkKCdsaW1pdFZhbHVlJyk7XG4gICAgaW5wdXRNaW4udHlwZSA9ICdudW1iZXInO1xuICAgIGlucHV0TWF4LnR5cGUgPSAnbnVtYmVyJztcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKGlucHV0TWluKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKGlucHV0TWF4KTtcbiAgICB0aGlzLl9taW5NYXhJbnB1dHMgPSBbaW5wdXRNaW4sIGlucHV0TWF4XTtcbiAgfVxuXG4gIGdldCBtaW5NYXhJbnB1dHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21pbk1heElucHV0cztcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlVmFsdWVJbnB1dHMoKSB7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZCh0aXRsZSk7XG4gICAgdGl0bGUuaW5uZXJUZXh0ID0gJ9CX0L3QsNGH0LXQvdC40LUg0LHQtdCz0YPQvdC60L7Qsic7XG4gICAgY29uc3QgaW5wdXRTaW5nbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGlucHV0U2luZ2xlLmNsYXNzTGlzdC5hZGQoJ2hhbmRsZXJWYWx1ZScpO1xuICAgIGlucHV0U2luZ2xlLnR5cGUgPSAnbnVtYmVyJztcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKGlucHV0U2luZ2xlKTtcbiAgICB0aGlzLl92YWx1ZUlucHV0cy5wdXNoKGlucHV0U2luZ2xlKTtcbiAgICBpZiAodGhpcy5faGFzUmFuZ2UpIHtcbiAgICAgIGNvbnN0IGlucHV0TWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhhbmRsZXJWYWx1ZScpO1xuICAgICAgaWYgKGlucHV0TWluKSBpbnB1dE1pbi5jbGFzc0xpc3QuYWRkKCd2YWx1ZV9taW4nKTtcbiAgICAgIGNvbnN0IGlucHV0TWF4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgIGlucHV0TWF4LmNsYXNzTGlzdC5hZGQoJ2hhbmRsZXJWYWx1ZScsICd2YWx1ZV9tYXgnKTtcbiAgICAgIGlucHV0TWF4LnR5cGUgPSAnbnVtYmVyJztcbiAgICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQoaW5wdXRNYXgpO1xuICAgICAgdGhpcy5fdmFsdWVJbnB1dHMucHVzaChpbnB1dE1heCk7XG4gICAgfVxuICB9XG4gIGdldCB2YWx1ZUlucHV0cygpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWVJbnB1dHM7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVN0ZXBJbnB1dCgpIHtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKHRpdGxlKTtcbiAgICB0aXRsZS5pbm5lclRleHQgPSAn0JfQvdCw0YfQtdC90LjQtSDRiNCw0LPQsCc7XG4gICAgdGhpcy5fc3RlcElucHV0LmNsYXNzTGlzdC5hZGQoJ3N0ZXBWYWx1ZScpO1xuICAgIHRoaXMuX3N0ZXBJbnB1dC50eXBlID0gJ251bWJlcic7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZCh0aGlzLl9zdGVwSW5wdXQpO1xuICB9XG5cbiAgZ2V0IHN0ZXBJbnB1dCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RlcElucHV0O1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVPcmllbnRhdGlvblJhZGlvcygpIHtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKHRpdGxlKTtcbiAgICB0aXRsZS5pbm5lclRleHQgPSAn0JLQtdGA0YLQuNC60LDQu9GM0L3Ri9C5L9Cz0L7RgNC40LfQvtC90YLQsNC70YzQvdGL0LknO1xuICAgIGNvbnN0IHJhZGlvVmVydGljYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHJhZGlvVmVydGljYWwuaWQgPSAncmFkaW9fdmVydGljYWwnO1xuICAgIGNvbnN0IHJhZGlvSG9yaXpvbnRhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgcmFkaW9Ib3Jpem9udGFsLmlkID0gJ3JhZGlvX2hvcml6b250YWwnO1xuICAgIHRoaXMuX29yaWVudGF0aW9uUmFkaW9zID0gW3JhZGlvVmVydGljYWwsIHJhZGlvSG9yaXpvbnRhbF07XG4gICAgdGhpcy5fb3JpZW50YXRpb25SYWRpb3MuZm9yRWFjaChyYWRpbyA9PiB7XG4gICAgICByYWRpby50eXBlID0gJ3JhZGlvJztcbiAgICAgIHJhZGlvLm5hbWUgPSAnb3JpZW50YXRpb24nO1xuICAgICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZChyYWRpbyk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgb3JpZW50YXRpb25SYWRpb3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX29yaWVudGF0aW9uUmFkaW9zO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVSYW5nZVJhZGlvcygpIHtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKHRpdGxlKTtcbiAgICB0aXRsZS5pbm5lclRleHQgPSAn0J7QtNC40L3QvtGH0L3QvtC1L9C40L3RgtC10YDQstCw0LsnO1xuICAgIGNvbnN0IHJhZGlvU2luZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICByYWRpb1NpbmdsZS5pZCA9ICdyYWRpb19zaW5nbGUnO1xuICAgIGNvbnN0IHJhZGlvRG91YmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICByYWRpb0RvdWJsZS5pZCA9ICdyYWRpb19kb3VibGUnO1xuICAgIHRoaXMuX3JhbmdlUmFkaW9zID0gW3JhZGlvU2luZ2xlLCByYWRpb0RvdWJsZV07XG4gICAgdGhpcy5fcmFuZ2VSYWRpb3MuZm9yRWFjaChyYWRpbyA9PiB7XG4gICAgICByYWRpby50eXBlID0gJ3JhZGlvJztcbiAgICAgIHJhZGlvLm5hbWUgPSAncmFuZ2UnO1xuICAgICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZChyYWRpbyk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgcmFuZ2VSYWRpb3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JhbmdlUmFkaW9zO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVTaG93TGFiZWxSYWRpb3MoKSB7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZCh0aXRsZSk7XG4gICAgdGl0bGUuaW5uZXJUZXh0ID0gJ9Cf0L7QutCw0LfQsNGC0Ywg0LfQvdCw0YfQtdC90LjRjy/QodC60YDRi9GC0Ywg0LfQvdCw0YfQtdC90LjRjyc7XG4gICAgY29uc3QgcmFkaW9TaG93TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHJhZGlvU2hvd0xhYmVsLmlkID0gJ3JhZGlvX3Nob3dMYWJlbCc7XG4gICAgY29uc3QgcmFkaW9IaWRlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHJhZGlvSGlkZUxhYmVsLmlkID0gJ3JhZGlvX2hpZGVMYWJlbCc7XG4gICAgdGhpcy5fc2hvd0xhYmVsUmFkaW9zID0gW3JhZGlvU2hvd0xhYmVsLCByYWRpb0hpZGVMYWJlbF07XG4gICAgdGhpcy5fc2hvd0xhYmVsUmFkaW9zLmZvckVhY2gocmFkaW8gPT4ge1xuICAgICAgcmFkaW8udHlwZSA9ICdyYWRpbyc7XG4gICAgICByYWRpby5uYW1lID0gJ2xhYmVsJztcbiAgICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQocmFkaW8pO1xuICAgIH0pO1xuICB9XG4gIGdldCBzaG93TGFiZWxSYWRpb3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Nob3dMYWJlbFJhZGlvcztcbiAgfVxufVxuXG5leHBvcnQgeyBDb250cm9sUGFuZWwgfTtcbiIsImltcG9ydCB7IEZhY2FkZSB9IGZyb20gJy4vcHJlc2VudGVyL0ZhY2FkZSc7XG5pbXBvcnQgeyBDb250cm9sUGFuZWwgfSBmcm9tICcuL0NvbnRyb2xQYW5lbC9Db250cm9sUGFuZWwnO1xuXG4kKGZ1bmN0aW9uKCkge1xuICAkLmZuLnNsaWRlciA9IGZ1bmN0aW9uKG9wdGlvbnMpOiB7IGZhY2FkZTogRmFjYWRlOyBwYW5lbDogQ29udHJvbFBhbmVsIH0ge1xuICAgIGNvbnN0IGZhY2FkZTogRmFjYWRlID0gbmV3IEZhY2FkZSh0aGlzLmdldCgwKSwgb3B0aW9ucyk7XG4gICAgY29uc3QgcGFuZWw6IENvbnRyb2xQYW5lbCA9IG5ldyBDb250cm9sUGFuZWwoZmFjYWRlKTtcbiAgICByZXR1cm4geyBmYWNhZGUsIHBhbmVsIH07XG4gIH07XG59KTtcbiIsImltcG9ydCB7IEV2ZW50T2JzZXJ2ZXIgfSBmcm9tICcuLi9vYnNlcnZlci9vYnNlcnZlcic7XG5pbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSAnLi9oYW5kbGVyJztcbmltcG9ydCB7IHNsaWRlck9wdGlvbnMgfSBmcm9tICcuL3NsaWRlck9wdGlvbnMnO1xuXG5jbGFzcyBNYWluTW9kZWwge1xuICBwdWJsaWMgb2JzZXJ2ZXI6IEV2ZW50T2JzZXJ2ZXI7XG4gIHByaXZhdGUgX21pbiA9IDA7XG4gIHByaXZhdGUgX21heCA9IDEwMDtcbiAgcHJpdmF0ZSBfc3RlcCA9IDE7XG4gIHByaXZhdGUgX3ZhbHVlcyA9IFsxMCwgMjBdO1xuICBwcml2YXRlIF9pc1ZlcnRpY2FsID0gZmFsc2U7XG4gIHByaXZhdGUgX2hhc1JhbmdlID0gdHJ1ZTtcbiAgcHJpdmF0ZSBfaGFzTGFiZWxzID0gdHJ1ZTtcbiAgcHJpdmF0ZSBfaGFuZGxlcnM6IEhhbmRsZXJbXSA9IFtdO1xuICBjb25zdHJ1Y3RvcihzbGlkZXJPcHRpb25zOiBzbGlkZXJPcHRpb25zKSB7XG4gICAgdGhpcy5vYnNlcnZlciA9IG5ldyBFdmVudE9ic2VydmVyKCk7XG4gICAgdGhpcy5fbWluID0gc2xpZGVyT3B0aW9ucy5taW4gPyBzbGlkZXJPcHRpb25zLm1pbiA6IDA7XG4gICAgdGhpcy5fbWF4ID0gc2xpZGVyT3B0aW9ucy5tYXggPyBzbGlkZXJPcHRpb25zLm1heCA6IHRoaXMuX21heDtcbiAgICB0aGlzLl9zdGVwID0gc2xpZGVyT3B0aW9ucy5zdGVwID8gc2xpZGVyT3B0aW9ucy5zdGVwIDogdGhpcy5fc3RlcDtcbiAgICB0aGlzLl92YWx1ZXMgPSBzbGlkZXJPcHRpb25zLnZhbHVlcyA/IHNsaWRlck9wdGlvbnMudmFsdWVzIDogdGhpcy5fdmFsdWVzO1xuICAgIHRoaXMuX2hhc1JhbmdlID0gc2xpZGVyT3B0aW9ucy5oYXNSYW5nZSA/IHNsaWRlck9wdGlvbnMuaGFzUmFuZ2UgOiB0aGlzLl9oYXNSYW5nZTtcbiAgICB0aGlzLl9pc1ZlcnRpY2FsID0gc2xpZGVyT3B0aW9ucy5pc1ZlcnRpY2FsID8gc2xpZGVyT3B0aW9ucy5pc1ZlcnRpY2FsIDogdGhpcy5faXNWZXJ0aWNhbDtcbiAgICB0aGlzLl9oYXNMYWJlbHMgPSBzbGlkZXJPcHRpb25zLmhhc0xhYmVscyA/IHNsaWRlck9wdGlvbnMuaGFzTGFiZWxzIDogdGhpcy5faGFzTGFiZWxzO1xuICB9XG5cbiAgbm90aWZ5UHJlc2VudGVyKHZhbHVlRGF0YTogc2xpZGVyT3B0aW9ucykge1xuICAgIHRoaXMub2JzZXJ2ZXIuYnJvYWRjYXN0KHZhbHVlRGF0YSk7XG4gIH1cblxuICBnZXQgbWluKCk6IG51bWJlciB7XG4gICAgdGhpcy5fbWluID0gTWF0aC5yb3VuZCh0aGlzLl9taW4gLyB0aGlzLl9zdGVwKSAqIHRoaXMuX3N0ZXA7XG4gICAgcmV0dXJuIHRoaXMuX21pbjtcbiAgfVxuXG4gIHNldCBtaW4obWluOiBudW1iZXIpIHtcbiAgICB0aGlzLl9taW4gPSBtaW47XG4gICAgdGhpcy5ub3RpZnlQcmVzZW50ZXIoe1xuICAgICAgbWluOiB0aGlzLm1pbixcbiAgICAgIHZhbHVlczogdGhpcy5yYW5nZVZhbHVlLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0IG1heCgpOiBudW1iZXIge1xuICAgIHRoaXMuX21heCA9IE1hdGgucm91bmQodGhpcy5fbWF4IC8gdGhpcy5fc3RlcCkgKiB0aGlzLl9zdGVwO1xuICAgIHJldHVybiB0aGlzLl9tYXg7XG4gIH1cblxuICBzZXQgbWF4KG1heDogbnVtYmVyKSB7XG4gICAgdGhpcy5fbWF4ID0gbWF4O1xuICAgIHRoaXMubm90aWZ5UHJlc2VudGVyKHtcbiAgICAgIG1heDogdGhpcy5tYXgsXG4gICAgICB2YWx1ZXM6IHRoaXMucmFuZ2VWYWx1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBzdGVwKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3N0ZXA7XG4gIH1cblxuICBzZXQgc3RlcChzdGVwOiBudW1iZXIpIHtcbiAgICB0aGlzLl9zdGVwID0gc3RlcDtcbiAgICB0aGlzLm5vdGlmeVByZXNlbnRlcih7XG4gICAgICBzdGVwOiB0aGlzLl9zdGVwLFxuICAgICAgdmFsdWVzOiB0aGlzLnJhbmdlVmFsdWUsXG4gICAgfSk7XG4gIH1cbiAgLy/QvdC1INC40YHQv9C+0LvRjNC30YPQtdGC0YHRjyFcbiAgZ2V0IHNpbmdsZVZhbHVlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY2FsY1ZhbHVlcyh0aGlzLl92YWx1ZXMpWzBdO1xuICB9XG4gIC8v0L3QtSDQuNGB0L/QvtC70YzQt9GD0LXRgtGB0Y8hXG4gIHNldCBzaW5nbGVWYWx1ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fdmFsdWVzWzBdID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcmFuZ2VWYWx1ZSgpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIHRoaXMuY2FsY1ZhbHVlcyh0aGlzLl92YWx1ZXMpO1xuICB9XG5cbiAgc2V0IHJhbmdlVmFsdWUodmFsdWVzOiBudW1iZXJbXSkge1xuICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlcztcbiAgICB0aGlzLm5vdGlmeVByZXNlbnRlcih7XG4gICAgICB2YWx1ZXM6IHRoaXMucmFuZ2VWYWx1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBpc1ZlcnRpY2FsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc1ZlcnRpY2FsO1xuICB9XG5cbiAgc2V0IGlzVmVydGljYWwodmVydGljYWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pc1ZlcnRpY2FsID0gdmVydGljYWw7XG4gICAgdGhpcy5ub3RpZnlQcmVzZW50ZXIoe1xuICAgICAgdmFsdWVzOiB0aGlzLnJhbmdlVmFsdWUsXG4gICAgICBpc1ZlcnRpY2FsOiB0aGlzLl9pc1ZlcnRpY2FsLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0IGhhc1JhbmdlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oYXNSYW5nZTtcbiAgfVxuXG4gIHNldCBoYXNSYW5nZShyYW5nZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2hhc1JhbmdlID0gcmFuZ2U7XG4gICAgdGhpcy5ub3RpZnlQcmVzZW50ZXIoe1xuICAgICAgdmFsdWVzOiB0aGlzLnJhbmdlVmFsdWUsXG4gICAgICBoYXNSYW5nZTogdGhpcy5faGFzUmFuZ2UsXG4gICAgfSk7XG4gIH1cblxuICBnZXQgaGFzTGFiZWxzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oYXNMYWJlbHM7XG4gIH1cblxuICBzZXQgaGFzTGFiZWxzKGxhYmVsOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGFzTGFiZWxzID0gbGFiZWw7XG4gICAgdGhpcy5ub3RpZnlQcmVzZW50ZXIoe1xuICAgICAgdmFsdWVzOiB0aGlzLnJhbmdlVmFsdWUsXG4gICAgICBoYXNMYWJlbHM6IHRoaXMuX2hhc0xhYmVscyxcbiAgICB9KTtcbiAgfVxuXG4gIC8vY2hlY2sgdGhhdCB2YWx1ZXMgb2YgaGFuZGxlcnMgYXJlIHdpdGhpbiBtaW4gYW5kIG1heFxuICAvL2NoZWNrIHRoYXQgdmFsdWUgMCBpcyBsZXNzIHRoYW4gdmFsdWUgMSBmb3IgcmFuZ2VcbiAgY2FsY1ZhbHVlcyh2YWx1ZXM6IG51bWJlcltdKTogbnVtYmVyW10ge1xuICAgIHZhbHVlcyA9IHZhbHVlcy5tYXAodmFsdWUgPT4gTWF0aC5yb3VuZCh2YWx1ZSAvIHRoaXMuX3N0ZXApICogdGhpcy5fc3RlcCk7XG4gICAgaWYgKHZhbHVlc1swXSA+IHZhbHVlc1sxXSkgW3ZhbHVlc1swXSwgdmFsdWVzWzFdXSA9IFt2YWx1ZXNbMV0sIHZhbHVlc1swXV07XG4gICAgdmFsdWVzID0gdmFsdWVzLm1hcCh2YWx1ZSA9PlxuICAgICAgdmFsdWUgPCB0aGlzLl9taW4gPyB0aGlzLl9taW4gOiB2YWx1ZSA+IHRoaXMuX21heCA/IHRoaXMuX21heCA6IHZhbHVlLFxuICAgICk7XG5cbiAgICByZXR1cm4gdmFsdWVzO1xuICB9XG5cbiAgLy9jcmVhdGUgaGFuZGxlcnMgZGVwZW5kaW5nIG9uIHJhbmdlLiBub3QgdXNlZFxuICBzZXRIYW5kbGVycyh2YWx1ZXM6IG51bWJlcltdKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2hhc1JhbmdlKSB7XG4gICAgICB0aGlzLl9oYW5kbGVycyA9IFtuZXcgSGFuZGxlcih2YWx1ZXNbMF0pLCBuZXcgSGFuZGxlcih2YWx1ZXNbMV0pXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGFuZGxlcnMgPSBbbmV3IEhhbmRsZXIodmFsdWVzWzBdKV07XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IE1haW5Nb2RlbCB9O1xuIiwiY2xhc3MgSGFuZGxlciB7XG4gIHByaXZhdGUgX3Bvc2l0aW9uOiBudW1iZXI7XG4gIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICB9XG5cbiAgZ2V0IHBvc2l0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uO1xuICB9XG5cbiAgc2V0IHBvc2l0aW9uKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IHZhbHVlO1xuICB9XG59XG5cbmV4cG9ydCB7IEhhbmRsZXIgfTtcbiIsImNsYXNzIEV2ZW50T2JzZXJ2ZXIge1xuICBwcml2YXRlIF9vYnNlcnZlcnM6IEZ1bmN0aW9uW107XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX29ic2VydmVycyA9IFtdO1xuICB9XG4gIHN1YnNjcmliZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLl9vYnNlcnZlcnMucHVzaChmbik7XG4gIH1cbiAgdW5zdWJzY3JpYmUoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fb2JzZXJ2ZXJzID0gdGhpcy5fb2JzZXJ2ZXJzLmZpbHRlcihzdWJzY3JpYmVyID0+IHN1YnNjcmliZXIgIT09IGZuKTtcbiAgfVxuICBicm9hZGNhc3QoZGF0YTogb2JqZWN0KTogdm9pZCB7XG4gICAgdGhpcy5fb2JzZXJ2ZXJzLmZvckVhY2goc3Vic2NyaWJlciA9PiBzdWJzY3JpYmVyKGRhdGEpKTtcbiAgfVxufVxuXG5leHBvcnQgeyBFdmVudE9ic2VydmVyIH07XG4iLCJpbXBvcnQgeyBNYWluTW9kZWwgfSBmcm9tICcuLi9tb2RlbC9NYWluTW9kZWwnO1xuaW1wb3J0IHsgUHJlc2VudGVyIH0gZnJvbSAnLi9QcmVzZW50ZXInO1xuaW1wb3J0IHsgc2xpZGVyT3B0aW9ucyB9IGZyb20gJy4uL21vZGVsL3NsaWRlck9wdGlvbnMnO1xuaW1wb3J0IHsgRXZlbnRPYnNlcnZlciB9IGZyb20gJy4uL29ic2VydmVyL29ic2VydmVyJztcblxuY2xhc3MgRmFjYWRlIHtcbiAgcHJpdmF0ZSBfbW9kZWw6IE1haW5Nb2RlbDtcbiAgcHJpdmF0ZSBfcHJlc2VudGVyOiBQcmVzZW50ZXI7XG4gIHB1YmxpYyBvYnNlcnZlcjogRXZlbnRPYnNlcnZlcjtcblxuICBjb25zdHJ1Y3RvcihwYXJlbnQ6IEhUTUxFbGVtZW50LCBzbGlkZXJPcHRpb25zOiBzbGlkZXJPcHRpb25zKSB7XG4gICAgdGhpcy5vYnNlcnZlciA9IG5ldyBFdmVudE9ic2VydmVyKCk7XG4gICAgdGhpcy5fbW9kZWwgPSBuZXcgTWFpbk1vZGVsKHNsaWRlck9wdGlvbnMpO1xuICAgIHRoaXMuX3ByZXNlbnRlciA9IG5ldyBQcmVzZW50ZXIocGFyZW50LCB0aGlzLl9tb2RlbCk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZXMoKTtcbiAgfVxuXG4gIHVwZGF0ZVZhbHVlcygpIHtcbiAgICB0aGlzLl9tb2RlbC5vYnNlcnZlci5zdWJzY3JpYmUoKHZhbHVlRGF0YTogc2xpZGVyT3B0aW9ucykgPT4ge1xuICAgICAgaWYgKHZhbHVlRGF0YS52YWx1ZXMpIHRoaXMub2JzZXJ2ZXIuYnJvYWRjYXN0KHZhbHVlRGF0YS52YWx1ZXMpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0IHBhcmVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJlc2VudGVyLnBhcmVudDtcbiAgfVxuXG4gIGdldCBtaW5NYXgoKTogbnVtYmVyW10ge1xuICAgIHJldHVybiBbdGhpcy5fbW9kZWwubWluLCB0aGlzLl9tb2RlbC5tYXhdO1xuICB9XG5cbiAgc2V0IG1pbk1heCh2YWx1ZTogbnVtYmVyW10pIHtcbiAgICBbdGhpcy5fbW9kZWwubWluLCB0aGlzLl9tb2RlbC5tYXhdID0gdmFsdWU7XG4gIH1cbiAgLy9ub3QgdXNlZFxuICBnZXQgc2luZ2xlVmFsdWUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuc2luZ2xlVmFsdWU7XG4gIH1cbiAgLy9ub3QgdXNlZFxuICBzZXQgc2luZ2xlVmFsdWUodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX21vZGVsLnNpbmdsZVZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcmFuZ2VWYWx1ZSgpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLnJhbmdlVmFsdWU7XG4gIH1cblxuICBzZXQgcmFuZ2VWYWx1ZSh2YWx1ZTogbnVtYmVyW10pIHtcbiAgICB0aGlzLl9tb2RlbC5yYW5nZVZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBnZXQgc3RlcCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5zdGVwO1xuICB9XG5cbiAgc2V0IHN0ZXAodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX21vZGVsLnN0ZXAgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBpc1ZlcnRpY2FsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5pc1ZlcnRpY2FsO1xuICB9XG5cbiAgc2V0IGlzVmVydGljYWwodmVydGljYWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9tb2RlbC5pc1ZlcnRpY2FsID0gdmVydGljYWw7XG4gIH1cblxuICBnZXQgaGFzUmFuZ2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmhhc1JhbmdlO1xuICB9XG5cbiAgc2V0IGhhc1JhbmdlKHJhbmdlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbW9kZWwuaGFzUmFuZ2UgPSByYW5nZTtcbiAgfVxuICBnZXQgaGFzTGFiZWxzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5oYXNMYWJlbHM7XG4gIH1cblxuICBzZXQgaGFzTGFiZWxzKGxhYmVsOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbW9kZWwuaGFzTGFiZWxzID0gbGFiZWw7XG4gIH1cbn1cblxuZXhwb3J0IHsgRmFjYWRlIH07XG4iLCJpbXBvcnQgeyBNYWluTW9kZWwgfSBmcm9tICcuLi9tb2RlbC9NYWluTW9kZWwnO1xuaW1wb3J0IHsgTWFpblZpZXcgfSBmcm9tICcuLi92aWV3L01haW5WaWV3JztcbmltcG9ydCB7IHNsaWRlck9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbC9zbGlkZXJPcHRpb25zJztcblxuY2xhc3MgUHJlc2VudGVyIHtcbiAgcHJpdmF0ZSBfbW9kZWw6IE1haW5Nb2RlbDtcbiAgcHJpdmF0ZSBfdmlldzogTWFpblZpZXc7XG4gIHByaXZhdGUgX3ZhbHVlczogbnVtYmVyW107XG4gIHByaXZhdGUgX3BhcmVudDogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IocGFyZW50OiBIVE1MRWxlbWVudCwgbW9kZWw6IE1haW5Nb2RlbCkge1xuICAgIHRoaXMuX21vZGVsID0gbW9kZWw7XG4gICAgdGhpcy5fdmFsdWVzID0gdGhpcy5fbW9kZWwucmFuZ2VWYWx1ZTtcbiAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5fdmlldyA9IG5ldyBNYWluVmlldyhcbiAgICAgIHRoaXMuX3BhcmVudCxcbiAgICAgIHRoaXMuX21vZGVsLmhhc1JhbmdlLFxuICAgICAgdGhpcy5fbW9kZWwuaXNWZXJ0aWNhbCxcbiAgICAgIHRoaXMuX21vZGVsLm1pbixcbiAgICAgIHRoaXMuX21vZGVsLm1heCxcbiAgICAgIHRoaXMuX3ZhbHVlcyxcbiAgICAgIHRoaXMuX21vZGVsLmhhc0xhYmVscyxcbiAgICApO1xuICAgIHRoaXMudXBkYXRlTW9kZWwoKTtcbiAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgfVxuXG4gIHVwZGF0ZU1vZGVsKCkge1xuICAgIHRoaXMuX3ZpZXcub2JzZXJ2ZXIuc3Vic2NyaWJlKCh2YWx1ZURhdGE6IHNsaWRlck9wdGlvbnMpID0+IHtcbiAgICAgIGlmICh2YWx1ZURhdGEubWluKSB0aGlzLl9tb2RlbC5taW4gPSB2YWx1ZURhdGEubWluO1xuICAgICAgaWYgKHZhbHVlRGF0YS5tYXgpIHRoaXMuX21vZGVsLm1heCA9IHZhbHVlRGF0YS5tYXg7XG4gICAgICBpZiAodmFsdWVEYXRhLnZhbHVlcykgdGhpcy5fbW9kZWwucmFuZ2VWYWx1ZSA9IHZhbHVlRGF0YS52YWx1ZXM7XG4gICAgICBpZiAodmFsdWVEYXRhLmlzVmVydGljYWwgIT09IHVuZGVmaW5lZCkgdGhpcy5fbW9kZWwuaXNWZXJ0aWNhbCA9IHZhbHVlRGF0YS5pc1ZlcnRpY2FsO1xuICAgICAgaWYgKHZhbHVlRGF0YS5zdGVwKSB0aGlzLl9tb2RlbC5zdGVwID0gdmFsdWVEYXRhLnN0ZXA7XG4gICAgICBpZiAodmFsdWVEYXRhLmhhc1JhbmdlICE9PSB1bmRlZmluZWQpIHRoaXMuX21vZGVsLmhhc1JhbmdlID0gdmFsdWVEYXRhLmhhc1JhbmdlO1xuICAgICAgaWYgKHZhbHVlRGF0YS5oYXNMYWJlbHMgIT09IHVuZGVmaW5lZCkgdGhpcy5fbW9kZWwuaGFzTGFiZWxzID0gdmFsdWVEYXRhLmhhc0xhYmVscztcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVZpZXcoKSB7XG4gICAgdGhpcy5fbW9kZWwub2JzZXJ2ZXIuc3Vic2NyaWJlKCh2YWx1ZURhdGE6IHNsaWRlck9wdGlvbnMpID0+IHtcbiAgICAgIHRoaXMuX3ZpZXcudXBkYXRlKHZhbHVlRGF0YSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgcGFyZW50KCkge1xuICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XG4gIH1cbn1cblxuZXhwb3J0IHsgUHJlc2VudGVyIH07XG4iLCJpbXBvcnQgeyBMYWJlbFZpZXcgfSBmcm9tICcuL0xhYmVsVmlldyc7XG5cbmNsYXNzIEhhbmRsZXJWaWV3IHtcbiAgcHJpdmF0ZSBfcGFyZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfaGFuZGxlcjogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX2xhYmVsOiBMYWJlbFZpZXcgfCBudWxsO1xuICBwcml2YXRlIF9zaG93TGFiZWw6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocGFyZW50OiBIVE1MRWxlbWVudCwgc2hvd0xhYmVsOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGFuZGxlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcbiAgICB0aGlzLl9zaG93TGFiZWwgPSBzaG93TGFiZWw7XG4gICAgdGhpcy5fbGFiZWwgPSBzaG93TGFiZWwgPyBuZXcgTGFiZWxWaWV3KCkgOiBudWxsO1xuICAgIHRoaXMuaGFuZGxlckluaXQoKTtcbiAgfVxuICBwcml2YXRlIGhhbmRsZXJJbml0KCkge1xuICAgIHRoaXMuX3BhcmVudC5hcHBlbmQodGhpcy5faGFuZGxlcik7XG4gICAgdGhpcy5faGFuZGxlci5jbGFzc0xpc3QuYWRkKCdoYW5kbGVyJyk7XG4gICAgaWYgKHRoaXMuX2xhYmVsKSB0aGlzLl9oYW5kbGVyLmJlZm9yZSh0aGlzLl9sYWJlbC5lbGVtKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0SGFuZGxlclNpemUoaXNWZXJ0aWNhbDogYm9vbGVhbikge1xuICAgIGNvbnN0IGhhbmRsZXJTaXplID0gaXNWZXJ0aWNhbFxuICAgICAgPyAodGhpcy5faGFuZGxlci5vZmZzZXRIZWlnaHQgLyB0aGlzLl9wYXJlbnQub2Zmc2V0SGVpZ2h0KSAqIDEwMFxuICAgICAgOiAodGhpcy5faGFuZGxlci5vZmZzZXRXaWR0aCAvIHRoaXMuX3BhcmVudC5vZmZzZXRXaWR0aCkgKiAxMDA7XG4gICAgcmV0dXJuIGhhbmRsZXJTaXplO1xuICB9XG5cbiAgc2V0UG9zaXRpb24odmFsdWU6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyLCBpc1ZlcnRpY2FsOiBib29sZWFuKSB7XG4gICAgY29uc3QgdmFsdWVzQ291bnQgPSBtYXggLSBtaW47XG4gICAgY29uc3QgcG9zaXRpb25Qcm9wZXJ0eSA9IGlzVmVydGljYWwgPyAnYm90dG9tJyA6ICdsZWZ0JztcbiAgICBjb25zdCBoYW5kbGVyU2l6ZSA9IHRoaXMuZ2V0SGFuZGxlclNpemUoaXNWZXJ0aWNhbCk7XG4gICAgY29uc3QgcG9zaXRpb24gPSAoKHZhbHVlIC0gbWluKSAvIHZhbHVlc0NvdW50KSAqIDEwMCAtIGhhbmRsZXJTaXplIC8gMjtcbiAgICB0aGlzLl9oYW5kbGVyLnN0eWxlW3Bvc2l0aW9uUHJvcGVydHldID0gYCR7cG9zaXRpb259JWA7XG4gICAgdGhpcy5zZXRMYWJlbFBvc2l0aW9uKHZhbHVlLCB2YWx1ZXNDb3VudCwgbWluLCBpc1ZlcnRpY2FsKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0TGFiZWxQb3NpdGlvbih2YWx1ZTogbnVtYmVyLCB2YWx1ZXNDb3VudDogbnVtYmVyLCBtaW46IG51bWJlciwgaXNWZXJ0aWNhbDogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLl9sYWJlbCkge1xuICAgICAgY29uc3QgbGFiZWxTaXplID0gdGhpcy5fbGFiZWwuZ2V0TGFiZWxTaXplKGlzVmVydGljYWwsIHRoaXMuX3BhcmVudCk7XG4gICAgICBjb25zdCBmaXhlZFBvc2l0aW9uUHJvcGVydHkgPSB0aGlzLl9sYWJlbC5nZXRGaXhlZFBvc2l0aW9uUHJvcGVydHkoaXNWZXJ0aWNhbCk7XG4gICAgICBjb25zdCBwb3NpdGlvblByb3BlcnR5ID0gaXNWZXJ0aWNhbCA/ICdib3R0b20nIDogJ2xlZnQnO1xuICAgICAgY29uc3QgbGFiZWxQb3NpdGlvbiA9ICgodmFsdWUgLSBtaW4pIC8gdmFsdWVzQ291bnQpICogMTAwIC0gbGFiZWxTaXplIC8gMjtcbiAgICAgIHRoaXMuX2xhYmVsLmVsZW0uc3R5bGVbcG9zaXRpb25Qcm9wZXJ0eV0gPSBgJHtsYWJlbFBvc2l0aW9ufSVgO1xuICAgICAgdGhpcy5fbGFiZWwuZWxlbS5zdHlsZVtmaXhlZFBvc2l0aW9uUHJvcGVydHldID0gJzMzMCUnO1xuICAgICAgdGhpcy5zZXRMYWJlbFZhbHVlKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBnZXQgZWxlbSgpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlcjtcbiAgfVxuICBnZXQgbGFiZWxFbGVtKCkge1xuICAgIHJldHVybiB0aGlzLl9sYWJlbD8uZWxlbTtcbiAgfVxuICBwcml2YXRlIHNldExhYmVsVmFsdWUodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9sYWJlbCkgdGhpcy5fbGFiZWwuc2V0TGFiZWxWYWx1ZSh2YWx1ZSk7XG4gIH1cblxuICB1cGRhdGVMYWJlbChzaG93TGFiZWw6IGJvb2xlYW4gfCB1bmRlZmluZWQsIHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAoc2hvd0xhYmVsKSB7XG4gICAgICB0aGlzLl9sYWJlbCA9IHRoaXMuX2xhYmVsID8gdGhpcy5fbGFiZWwgOiBuZXcgTGFiZWxWaWV3KCk7XG4gICAgICB0aGlzLl9oYW5kbGVyLmJlZm9yZSh0aGlzLl9sYWJlbC5lbGVtKTtcbiAgICAgIHRoaXMuc2V0TGFiZWxWYWx1ZSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2xhYmVsPy5lbGVtLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyBIYW5kbGVyVmlldyB9O1xuIiwiY2xhc3MgTGFiZWxWaWV3IHtcbiAgcHJpdmF0ZSBfbGFiZWw6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fbGFiZWwuY2xhc3NMaXN0LmFkZCgnbGFiZWwnKTtcbiAgfVxuXG4gIGdldCBlbGVtKCkge1xuICAgIHJldHVybiB0aGlzLl9sYWJlbDtcbiAgfVxuXG4gIHNldExhYmVsVmFsdWUodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2xhYmVsLmlubmVyVGV4dCA9IHZhbHVlLnRvU3RyaW5nKCk7XG4gIH1cblxuICBnZXRMYWJlbFNpemUoaXNWZXJ0aWNhbDogYm9vbGVhbiwgcGFyZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGNvbnN0IGxhYmVsU2l6ZSA9IGlzVmVydGljYWxcbiAgICAgID8gKHRoaXMuZWxlbS5vZmZzZXRIZWlnaHQgLyBwYXJlbnQub2Zmc2V0SGVpZ2h0KSAqIDEwMFxuICAgICAgOiAodGhpcy5lbGVtLm9mZnNldFdpZHRoIC8gcGFyZW50Lm9mZnNldFdpZHRoKSAqIDEwMDtcblxuICAgIHJldHVybiBsYWJlbFNpemU7XG4gIH1cblxuICBnZXRGaXhlZFBvc2l0aW9uUHJvcGVydHkoaXNWZXJ0aWNhbDogYm9vbGVhbikge1xuICAgIGNvbnN0IGZpeGVkUG9zaXRpb25Qcm9wZXJ0eSA9IGlzVmVydGljYWwgPyAnbGVmdCcgOiAnYm90dG9tJztcbiAgICByZXR1cm4gZml4ZWRQb3NpdGlvblByb3BlcnR5O1xuICB9XG59XG5cbmV4cG9ydCB7IExhYmVsVmlldyB9O1xuIiwiaW1wb3J0IHsgSGFuZGxlclZpZXcgfSBmcm9tICcuL0hhbmRsZXJWaWV3JztcbmltcG9ydCB7IFNlbGVjdGVkQXJlYSB9IGZyb20gJy4vU2VsZWN0ZWRBcmVhVmlldyc7XG5pbXBvcnQgeyBFdmVudE9ic2VydmVyIH0gZnJvbSAnLi4vb2JzZXJ2ZXIvb2JzZXJ2ZXInO1xuaW1wb3J0IHsgc2xpZGVyT3B0aW9ucyB9IGZyb20gJy4uL21vZGVsL3NsaWRlck9wdGlvbnMnO1xuXG5jbGFzcyBNYWluVmlldyB7XG4gIHB1YmxpYyBvYnNlcnZlcjogRXZlbnRPYnNlcnZlcjtcbiAgcHJpdmF0ZSBfc2xpZGVyQm9keTogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX3BhcmVudDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX3NlbGVjdGVkQXJlYTogU2VsZWN0ZWRBcmVhO1xuICBwcml2YXRlIF9oYW5kbGVyczogSGFuZGxlclZpZXdbXTtcbiAgcHJpdmF0ZSBfbWluOiBudW1iZXI7XG4gIHByaXZhdGUgX21heDogbnVtYmVyO1xuICBwcml2YXRlIF92YWx1ZXM6IG51bWJlcltdO1xuICBwcml2YXRlIF9pc1ZlcnRpY2FsOiBib29sZWFuO1xuICBwcml2YXRlIF9oYXNSYW5nZTogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfaGFzTGFiZWxzOiBib29sZWFuO1xuICBwcml2YXRlIF9tb3VzZU1vdmU6IGFueTtcbiAgcHJpdmF0ZSBfbW91c2VVcDogYW55O1xuICBwcml2YXRlIF9oYW5kbGVyVGFyZ2V0SWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwYXJlbnQ6IEhUTUxFbGVtZW50LFxuICAgIGhhc1JhbmdlOiBib29sZWFuLFxuICAgIGlzVmVydGljYWw6IGJvb2xlYW4sXG4gICAgbWluOiBudW1iZXIsXG4gICAgbWF4OiBudW1iZXIsXG4gICAgdmFsdWVzOiBudW1iZXJbXSxcbiAgICBoYXNMYWJlbHM6IGJvb2xlYW4sXG4gICkge1xuICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgRXZlbnRPYnNlcnZlcigpO1xuICAgIHRoaXMuX2hhbmRsZXJzID0gW107XG4gICAgdGhpcy5fbWluID0gbWluO1xuICAgIHRoaXMuX21heCA9IG1heDtcbiAgICB0aGlzLl92YWx1ZXMgPSB2YWx1ZXM7XG4gICAgdGhpcy5faXNWZXJ0aWNhbCA9IGlzVmVydGljYWw7XG4gICAgdGhpcy5faGFzUmFuZ2UgPSBoYXNSYW5nZTtcbiAgICB0aGlzLl9oYXNMYWJlbHMgPSBoYXNMYWJlbHM7XG4gICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgIHRoaXMuX3NsaWRlckJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIHRoaXMuX21vdXNlTW92ZTtcbiAgICB0aGlzLl9tb3VzZVVwO1xuICAgIHRoaXMuX2hhbmRsZXJUYXJnZXRJZCA9ICcnO1xuXG4gICAgdGhpcy5zbGlkZXJJbml0KCk7XG4gICAgdGhpcy5fc2VsZWN0ZWRBcmVhID0gbmV3IFNlbGVjdGVkQXJlYShcbiAgICAgIHRoaXMuX3NsaWRlckJvZHksXG4gICAgICB0aGlzLl9oYXNSYW5nZSxcbiAgICAgIHRoaXMuX2lzVmVydGljYWwsXG4gICAgICB0aGlzLl9oYW5kbGVyc1swXS5lbGVtLFxuICAgICAgdGhpcy5faGFuZGxlcnNbMV0uZWxlbSxcbiAgICApO1xuXG4gICAgdGhpcy5faGFuZGxlcnMuZm9yRWFjaChoYW5kbGVyID0+IHtcbiAgICAgIGhhbmRsZXIuZWxlbS5vbmRyYWdzdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuICAgICAgaGFuZGxlci5lbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuZHJhZ0FuZERyb3AuYmluZCh0aGlzKSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHNsaWRlckluaXQoKSB7XG4gICAgdGhpcy5zZXRTbGlkZXJCb2R5KCk7XG4gICAgdGhpcy5zZXRPcmllbnRhdGlvbigpO1xuICAgIHRoaXMuc2V0SGFuZGxlcnMoKTtcbiAgICB0aGlzLnNldEhhbmRsZXJQb3NpdGlvbih0aGlzLl92YWx1ZXMsIHRoaXMuX2lzVmVydGljYWwpO1xuICB9XG5cbiAgdXBkYXRlKHZhbHVlRGF0YTogc2xpZGVyT3B0aW9ucykge1xuICAgIHRoaXMuX21pbiA9IHZhbHVlRGF0YS5taW4gPyB2YWx1ZURhdGEubWluIDogdGhpcy5fbWluO1xuICAgIHRoaXMuX21heCA9IHZhbHVlRGF0YS5tYXggPyB2YWx1ZURhdGEubWF4IDogdGhpcy5fbWF4O1xuICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlRGF0YS52YWx1ZXMgPyB2YWx1ZURhdGEudmFsdWVzIDogdGhpcy5fdmFsdWVzO1xuICAgIHRoaXMuX2lzVmVydGljYWwgPSB2YWx1ZURhdGEuaXNWZXJ0aWNhbCAhPT0gdW5kZWZpbmVkID8gdmFsdWVEYXRhLmlzVmVydGljYWwgOiB0aGlzLl9pc1ZlcnRpY2FsO1xuICAgIHRoaXMuX2hhc1JhbmdlID0gdmFsdWVEYXRhLmhhc1JhbmdlICE9PSB1bmRlZmluZWQgPyB2YWx1ZURhdGEuaGFzUmFuZ2UgOiB0aGlzLl9oYXNSYW5nZTtcbiAgICB0aGlzLl9oYXNMYWJlbHMgPSB2YWx1ZURhdGEuaGFzTGFiZWxzICE9PSB1bmRlZmluZWQgPyB2YWx1ZURhdGEuaGFzTGFiZWxzIDogdGhpcy5faGFzTGFiZWxzO1xuICAgIHRoaXMuc2V0T3JpZW50YXRpb24oKTtcbiAgICB0aGlzLnNldEhhbmRsZXJQb3NpdGlvbih0aGlzLl92YWx1ZXMsIHRoaXMuX2lzVmVydGljYWwpO1xuXG4gICAgdGhpcy5faGFuZGxlcnMuZm9yRWFjaCgoaGFuZGxlciwgaW5kZXgpID0+XG4gICAgICBoYW5kbGVyLnVwZGF0ZUxhYmVsKHRoaXMuX2hhc0xhYmVscywgdGhpcy5fdmFsdWVzW2luZGV4XSksXG4gICAgKTtcbiAgICB0aGlzLnVwZGF0ZUhhbmRsZXJzQW1vdW50KHRoaXMuX2hhc1JhbmdlKTtcbiAgICB0aGlzLl9zZWxlY3RlZEFyZWEudXBkYXRlU2VsZWN0ZWRSYW5nZShcbiAgICAgIHRoaXMuX2hhc1JhbmdlLFxuICAgICAgdGhpcy5faXNWZXJ0aWNhbCxcbiAgICAgIHRoaXMuX2hhbmRsZXJzWzFdLmVsZW0sXG4gICAgICB0aGlzLl9oYW5kbGVyc1swXS5lbGVtLFxuICAgICAgdGhpcy5faGFuZGxlcnNbMV0ubGFiZWxFbGVtLFxuICAgICk7XG4gIH1cblxuICBzZXRTbGlkZXJCb2R5KCkge1xuICAgIHRoaXMuX3NsaWRlckJvZHkuY2xhc3NMaXN0LmFkZCgnc2xpZGVyQm9keScpO1xuICAgIHRoaXMuX3BhcmVudC5hcHBlbmRDaGlsZCh0aGlzLl9zbGlkZXJCb2R5KTtcbiAgfVxuXG4gIHNldE9yaWVudGF0aW9uKCkge1xuICAgIGlmICh0aGlzLl9pc1ZlcnRpY2FsKSB7XG4gICAgICB0aGlzLl9wYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX2hvcml6b250YWwnKTtcbiAgICAgIHRoaXMuX3BhcmVudC5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfdmVydGljYWwnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlcl92ZXJ0aWNhbCcpO1xuICAgICAgdGhpcy5fcGFyZW50LmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9ob3Jpem9udGFsJyk7XG4gICAgfVxuICB9XG5cbiAgc2V0SGFuZGxlcnMoKSB7XG4gICAgdGhpcy5faGFuZGxlcnMucHVzaChuZXcgSGFuZGxlclZpZXcodGhpcy5fc2xpZGVyQm9keSwgdGhpcy5faGFzTGFiZWxzKSk7XG4gICAgaWYgKHRoaXMuX2hhc1JhbmdlKSB7XG4gICAgICB0aGlzLl9oYW5kbGVycy5wdXNoKG5ldyBIYW5kbGVyVmlldyh0aGlzLl9zbGlkZXJCb2R5LCB0aGlzLl9oYXNMYWJlbHMpKTtcbiAgICAgIHRoaXMuX2hhbmRsZXJzWzBdLmVsZW0uaWQgPSAnaGFuZGxlcl9taW4nO1xuICAgICAgdGhpcy5faGFuZGxlcnNbMV0uZWxlbS5pZCA9ICdoYW5kbGVyX21heCc7XG4gICAgfVxuICB9XG5cbiAgZ2V0SGFuZGxlcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZXJzO1xuICB9XG5cbiAgc2V0SGFuZGxlclBvc2l0aW9uKHZhbHVlczogbnVtYmVyW10sIGlzVmVydGljYWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oYW5kbGVycy5mb3JFYWNoKChoYW5kbGVyLCBpbmRleCkgPT5cbiAgICAgIGhhbmRsZXIuc2V0UG9zaXRpb24odmFsdWVzW2luZGV4XSwgdGhpcy5fbWluLCB0aGlzLl9tYXgsIGlzVmVydGljYWwpLFxuICAgICk7XG4gIH1cbiAgdXBkYXRlSGFuZGxlcnNBbW91bnQocmFuZ2U6IGJvb2xlYW4pIHtcbiAgICBpZiAoIXJhbmdlKSB7XG4gICAgICB0aGlzLl9oYW5kbGVyc1sxXS5lbGVtLnJlbW92ZSgpO1xuICAgICAgdGhpcy5faGFuZGxlcnNbMV0ubGFiZWxFbGVtPy5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGFuZGxlcnNbMF0uZWxlbS5hZnRlcih0aGlzLl9oYW5kbGVyc1sxXS5lbGVtKTtcbiAgICAgIGlmICh0aGlzLl9oYW5kbGVyc1sxXS5sYWJlbEVsZW0pIHRoaXMuX2hhbmRsZXJzWzFdLmVsZW0uYmVmb3JlKHRoaXMuX2hhbmRsZXJzWzFdLmxhYmVsRWxlbSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q29vcmRzKGVsZW06IEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3QgYm94ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBpZiAodGhpcy5faXNWZXJ0aWNhbCkge1xuICAgICAgcmV0dXJuIGJveC5ib3R0b20gKyBwYWdlWU9mZnNldDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGJveC5sZWZ0ICsgcGFnZVhPZmZzZXQ7XG4gICAgfVxuICB9XG4gIGRyYWdBbmREcm9wKGU6IE1vdXNlRXZlbnQpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgdGhpcy5faGFuZGxlclRhcmdldElkID0gdGFyZ2V0LmlkO1xuICAgIHRoaXMuX21vdXNlTW92ZSA9IHRoaXMub25Nb3VzZU1vdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9tb3VzZVVwID0gdGhpcy5vbk1vdXNlVXAuYmluZCh0aGlzKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9tb3VzZU1vdmUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9tb3VzZVVwKTtcbiAgfVxuXG4gIG9uTW91c2VNb3ZlKGU6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAodGhpcy5faXNWZXJ0aWNhbCkge1xuICAgICAgdGhpcy5tb3ZlQXQoZS5wYWdlWSwgdGhpcy5faGFuZGxlclRhcmdldElkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb3ZlQXQoZS5wYWdlWCwgdGhpcy5faGFuZGxlclRhcmdldElkKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlQXQoY29vcmRpbmF0ZTogbnVtYmVyLCB0YXJnZXRJZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2xpZGVyQ29vcmQgPSB0aGlzLmdldENvb3Jkcyh0aGlzLl9zbGlkZXJCb2R5KTtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2lzVmVydGljYWxcbiAgICAgID8gKChzbGlkZXJDb29yZCAtIGNvb3JkaW5hdGUpIC8gdGhpcy5fc2xpZGVyQm9keS5vZmZzZXRIZWlnaHQpICogKHRoaXMuX21heCAtIHRoaXMuX21pbikgK1xuICAgICAgICB0aGlzLl9taW5cbiAgICAgIDogKChjb29yZGluYXRlIC0gc2xpZGVyQ29vcmQpIC8gdGhpcy5fc2xpZGVyQm9keS5vZmZzZXRXaWR0aCkgKiAodGhpcy5fbWF4IC0gdGhpcy5fbWluKSArXG4gICAgICAgIHRoaXMuX21pbjtcbiAgICBpZiAoIXRhcmdldElkIHx8IHRhcmdldElkID09PSAnaGFuZGxlcl9taW4nKSB7XG4gICAgICB0aGlzLm9ic2VydmVyLmJyb2FkY2FzdCh7XG4gICAgICAgIHZhbHVlczogW3ZhbHVlLCB0aGlzLl92YWx1ZXNbMV1dLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub2JzZXJ2ZXIuYnJvYWRjYXN0KHtcbiAgICAgICAgdmFsdWVzOiBbdGhpcy5fdmFsdWVzWzBdLCB2YWx1ZV0sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvbk1vdXNlVXAoKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5fbW91c2VNb3ZlKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5vbk1vdXNlVXApO1xuICB9XG59XG5cbmV4cG9ydCB7IE1haW5WaWV3IH07XG4iLCJjbGFzcyBTZWxlY3RlZEFyZWEge1xuICBwcml2YXRlIF9zZWxlY3RlZFJhbmdlOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfcGFyZW50OiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwYXJlbnQ6IEhUTUxFbGVtZW50LFxuICAgIHJhbmdlOiBib29sZWFuLFxuICAgIHZlcnRpY2FsOiBib29sZWFuLFxuICAgIGhhbmRsZXJNaW46IEhUTUxFbGVtZW50LFxuICAgIGhhbmRsZXJNYXg6IEhUTUxFbGVtZW50LFxuICApIHtcbiAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5fc2VsZWN0ZWRSYW5nZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX3BhcmVudC5hcHBlbmQodGhpcy5fc2VsZWN0ZWRSYW5nZSk7XG4gICAgaWYgKCFyYW5nZSkge1xuICAgICAgdGhpcy5fc2VsZWN0ZWRSYW5nZS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZFJhbmdlJyk7XG4gICAgICB0aGlzLnNldFBvc2l0aW9uU2luZ2xlKHZlcnRpY2FsLCBoYW5kbGVyTWluKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2VsZWN0ZWRSYW5nZS5jbGFzc0xpc3QuYWRkKCdyYW5nZV9iZXR3ZWVuJyk7XG4gICAgICB0aGlzLnNldFBvc2l0aW9uUmFuZ2UodmVydGljYWwsIGhhbmRsZXJNYXgsIGhhbmRsZXJNaW4pO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVNlbGVjdGVkUmFuZ2UoXG4gICAgcmFuZ2U6IGJvb2xlYW4sXG4gICAgdmVydGljYWw6IGJvb2xlYW4sXG4gICAgaGFuZGxlck1heDogSFRNTEVsZW1lbnQsXG4gICAgaGFuZGxlck1pbjogSFRNTEVsZW1lbnQsXG4gICAgbGFiZWxNYXg6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkLFxuICApOiB2b2lkIHtcbiAgICBpZiAoIXJhbmdlKSB7XG4gICAgICB0aGlzLl9zZWxlY3RlZFJhbmdlLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkUmFuZ2UnKTtcbiAgICAgIHRoaXMuX3NlbGVjdGVkUmFuZ2UuY2xhc3NMaXN0LnJlbW92ZSgncmFuZ2VfYmV0d2VlbicpO1xuICAgICAgLy9oYW5kbGVyTWF4LnJlbW92ZSgpO1xuICAgICAgLy9pZiAobGFiZWxNYXgpIGxhYmVsTWF4LnJlbW92ZSgpO1xuICAgICAgdGhpcy5zZXRQb3NpdGlvblNpbmdsZSh2ZXJ0aWNhbCwgaGFuZGxlck1pbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NlbGVjdGVkUmFuZ2UuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWRSYW5nZScpO1xuICAgICAgdGhpcy5fc2VsZWN0ZWRSYW5nZS5jbGFzc0xpc3QuYWRkKCdyYW5nZV9iZXR3ZWVuJyk7XG4gICAgICAvL2hhbmRsZXJNaW4uYWZ0ZXIoaGFuZGxlck1heCk7XG4gICAgICAvLyBpZiAobGFiZWxNYXgpIGhhbmRsZXJNYXguYmVmb3JlKGxhYmVsTWF4KTtcbiAgICAgIHRoaXMuc2V0UG9zaXRpb25SYW5nZSh2ZXJ0aWNhbCwgaGFuZGxlck1heCwgaGFuZGxlck1pbik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRQb3NpdGlvblNpbmdsZSh2ZXJ0aWNhbDogYm9vbGVhbiwgaGFuZGxlcjogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICB2ZXJ0aWNhbFxuICAgICAgPyAodGhpcy5fc2VsZWN0ZWRSYW5nZS5zdHlsZS5oZWlnaHQgPVxuICAgICAgICAgIHRoaXMuZ2V0Q29vcmRzKHRoaXMuX3BhcmVudCwgdmVydGljYWwpIC0gdGhpcy5nZXRDb29yZHMoaGFuZGxlciwgdmVydGljYWwpICsgJ3B4JylcbiAgICAgIDogKHRoaXMuX3NlbGVjdGVkUmFuZ2Uuc3R5bGUud2lkdGggPSB0aGlzLmdldENvb3JkcyhoYW5kbGVyLCB2ZXJ0aWNhbCkgKyAncHgnKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0UG9zaXRpb25SYW5nZShcbiAgICB2ZXJ0aWNhbDogYm9vbGVhbixcbiAgICBoYW5kbGVyTWF4OiBIVE1MRWxlbWVudCxcbiAgICBoYW5kbGVyTWluOiBIVE1MRWxlbWVudCxcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgcG9zTWluID0gdmVydGljYWwgPyAnYm90dG9tJyA6ICdsZWZ0JztcbiAgICBjb25zdCBsZW5ndGggPSB2ZXJ0aWNhbCA/ICdoZWlnaHQnIDogJ3dpZHRoJztcbiAgICB0aGlzLl9zZWxlY3RlZFJhbmdlLnN0eWxlW3Bvc01pbl0gPSB2ZXJ0aWNhbFxuICAgICAgPyB0aGlzLmdldENvb3Jkcyh0aGlzLl9wYXJlbnQsIHZlcnRpY2FsKSAtIHRoaXMuZ2V0Q29vcmRzKGhhbmRsZXJNaW4sIHZlcnRpY2FsKSArICdweCdcbiAgICAgIDogdGhpcy5nZXRDb29yZHMoaGFuZGxlck1pbiwgdmVydGljYWwpICsgJ3B4JztcbiAgICB0aGlzLl9zZWxlY3RlZFJhbmdlLnN0eWxlW2xlbmd0aF0gPSB2ZXJ0aWNhbFxuICAgICAgPyB0aGlzLmdldENvb3JkcyhoYW5kbGVyTWluLCB2ZXJ0aWNhbCkgLSB0aGlzLmdldENvb3JkcyhoYW5kbGVyTWF4LCB2ZXJ0aWNhbCkgKyAncHgnXG4gICAgICA6IHRoaXMuZ2V0Q29vcmRzKGhhbmRsZXJNYXgsIHZlcnRpY2FsKSAtIHRoaXMuZ2V0Q29vcmRzKGhhbmRsZXJNaW4sIHZlcnRpY2FsKSArICdweCc7XG4gIH1cblxuICBwcml2YXRlIGdldENvb3JkcyhlbGVtOiBIVE1MRWxlbWVudCwgdmVydGljYWw6IGJvb2xlYW4pOiBudW1iZXIge1xuICAgIGNvbnN0IGJveCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgaWYgKHZlcnRpY2FsKSB7XG4gICAgICByZXR1cm4gYm94LmJvdHRvbSArIHBhZ2VZT2Zmc2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYm94LmxlZnQgKyBwYWdlWE9mZnNldDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgU2VsZWN0ZWRBcmVhIH07XG4iXSwic291cmNlUm9vdCI6IiJ9