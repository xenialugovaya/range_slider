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
        this._sliderBody.classList.add('sliderBody');
        this._parent.appendChild(this._sliderBody);
        this.setOrientation();
        this.setHandlers();
        this.setHandlerPosition();
    }
    update(valueData) {
        this._min = valueData.min ? valueData.min : this._min;
        this._max = valueData.max ? valueData.max : this._max;
        this._values = valueData.values ? valueData.values : this._values;
        this._isVertical = valueData.isVertical !== undefined ? valueData.isVertical : this._isVertical;
        this._hasRange = valueData.hasRange !== undefined ? valueData.hasRange : this._hasRange;
        this._hasLabels = valueData.hasLabels !== undefined ? valueData.hasLabels : this._hasLabels;
        this.setOrientation();
        this.setHandlerPosition();
        this._handlers.forEach((handler, index) => handler.updateLabel(this._hasLabels, this._values[index]));
        this.updateHandlersAmount(this._hasRange);
        this._selectedArea.updateSelectedRange(this._hasRange, this._isVertical, this._handlers[1].elem, this._handlers[0].elem, this._handlers[1].labelElem);
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
    setHandlerPosition() {
        this._handlers.forEach((handler, index) => handler.setPosition(this._values[index], this._min, this._max, this._isVertical));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbnRyb2xQYW5lbC9Db250cm9sUGFuZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9tb2RlbC9NYWluTW9kZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVsL2hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29ic2VydmVyL29ic2VydmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9wcmVzZW50ZXIvRmFjYWRlLnRzIiwid2VicGFjazovLy8uL3NyYy9wcmVzZW50ZXIvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy92aWV3L0hhbmRsZXJWaWV3LnRzIiwid2VicGFjazovLy8uL3NyYy92aWV3L0xhYmVsVmlldy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlldy9NYWluVmlldy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlldy9TZWxlY3RlZEFyZWFWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFF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Q0FBQztJQUN6RixDQUFDO0lBRU8sU0FBUyxDQUFDLElBQWlCLEVBQUUsUUFBaUI7UUFDcEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDekMsSUFBSSxRQUFRLEVBQUU7WUFDWixPQUFPLEdBQUcsQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO1NBQ2pDO2FBQU07WUFDTCxPQUFPLEdBQUcsQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO1NBQy9CO0lBQ0gsQ0FBQztDQUNGO0FBRXVCIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHsgRmFjYWRlIH0gZnJvbSAnLi4vcHJlc2VudGVyL0ZhY2FkZSc7XG5cbmNsYXNzIENvbnRyb2xQYW5lbCB7XG4gIHByaXZhdGUgX3NsaWRlcjogRmFjYWRlO1xuICBwcml2YXRlIF9wYXJlbnQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9jb250cm9sUGFuZWw6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9taW5NYXhJbnB1dHM6IEhUTUxJbnB1dEVsZW1lbnRbXTtcbiAgcHJpdmF0ZSBfdmFsdWVJbnB1dHM6IEhUTUxJbnB1dEVsZW1lbnRbXTtcbiAgcHJpdmF0ZSBfc3RlcElucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuICBwcml2YXRlIF9vcmllbnRhdGlvblJhZGlvczogSFRNTElucHV0RWxlbWVudFtdO1xuICBwcml2YXRlIF9yYW5nZVJhZGlvczogSFRNTElucHV0RWxlbWVudFtdO1xuICBwcml2YXRlIF9zaG93TGFiZWxSYWRpb3M6IEhUTUxJbnB1dEVsZW1lbnRbXTtcbiAgcHJpdmF0ZSBfaGFzUmFuZ2U6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3Ioc2xpZGVyOiBGYWNhZGUpIHtcbiAgICB0aGlzLl9zbGlkZXIgPSBzbGlkZXI7XG4gICAgdGhpcy5fcGFyZW50ID0gdGhpcy5fc2xpZGVyLnBhcmVudDtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl92YWx1ZUlucHV0cyA9IFtdO1xuICAgIHRoaXMuX21pbk1heElucHV0cyA9IFtdO1xuICAgIHRoaXMuX3N0ZXBJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgdGhpcy5fb3JpZW50YXRpb25SYWRpb3MgPSBbXTtcbiAgICB0aGlzLl9yYW5nZVJhZGlvcyA9IFtdO1xuICAgIHRoaXMuX3Nob3dMYWJlbFJhZGlvcyA9IFtdO1xuICAgIHRoaXMuX2hhc1JhbmdlID0gc2xpZGVyLmhhc1JhbmdlO1xuXG4gICAgdGhpcy5wYW5lbEluaXQoKTtcbiAgICB0aGlzLnNldEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgdGhpcy5nZXRTbGlkZXJPcHRpb25zKCk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFuZWxJbml0KCkge1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5jbGFzc0xpc3QuYWRkKCdjb250cm9sUGFuZWwnKTtcbiAgICB0aGlzLl9wYXJlbnQuYWZ0ZXIodGhpcy5fY29udHJvbFBhbmVsKTtcbiAgICB0aGlzLmNyZWF0ZU1heE1pbklucHV0cygpO1xuICAgIHRoaXMuY3JlYXRlVmFsdWVJbnB1dHMoKTtcbiAgICB0aGlzLmNyZWF0ZVN0ZXBJbnB1dCgpO1xuICAgIHRoaXMuY3JlYXRlT3JpZW50YXRpb25SYWRpb3MoKTtcbiAgICB0aGlzLmNyZWF0ZVJhbmdlUmFkaW9zKCk7XG4gICAgdGhpcy5jcmVhdGVTaG93TGFiZWxSYWRpb3MoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5taW5NYXhJbnB1dHMuZm9yRWFjaChpbnB1dCA9PlxuICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jaGFuZ2VNaW5NYXguYmluZCh0aGlzKSksXG4gICAgKTtcbiAgICB0aGlzLnZhbHVlSW5wdXRzLmZvckVhY2goaW5wdXQgPT5cbiAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuY2hhbmdlVmFsdWVzLmJpbmQodGhpcykpLFxuICAgICk7XG4gICAgdGhpcy5zdGVwSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jaGFuZ2VTdGVwLmJpbmQodGhpcykpO1xuICAgIHRoaXMub3JpZW50YXRpb25SYWRpb3MuZm9yRWFjaChyYWRpbyA9PlxuICAgICAgcmFkaW8uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jaGFuZ2VPcmllbnRhdGlvbi5iaW5kKHRoaXMpKSxcbiAgICApO1xuICAgIHRoaXMucmFuZ2VSYWRpb3MuZm9yRWFjaChyYWRpbyA9PlxuICAgICAgcmFkaW8uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jaGFuZ2VSYW5nZS5iaW5kKHRoaXMpKSxcbiAgICApO1xuICAgIHRoaXMuc2hvd0xhYmVsUmFkaW9zLmZvckVhY2gocmFkaW8gPT5cbiAgICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuY2hhbmdlTGFiZWxWaXNpYmlsaXR5LmJpbmQodGhpcykpLFxuICAgICk7XG4gIH1cblxuICBnZXRTbGlkZXJPcHRpb25zKCkge1xuICAgIHRoaXMubWluTWF4SW5wdXRzLmZvckVhY2goXG4gICAgICAoaW5wdXQsIGluZGV4KSA9PiAoaW5wdXQudmFsdWUgPSB0aGlzLl9zbGlkZXIubWluTWF4W2luZGV4XS50b1N0cmluZygpKSxcbiAgICApO1xuICAgIHRoaXMudmFsdWVJbnB1dHNbMF0udmFsdWUgPSB0aGlzLl9zbGlkZXIucmFuZ2VWYWx1ZVswXS50b1N0cmluZygpO1xuICAgIGlmICh0aGlzLnZhbHVlSW5wdXRzWzFdKSB7XG4gICAgICB0aGlzLnZhbHVlSW5wdXRzWzFdLnZhbHVlID0gdGhpcy5fc2xpZGVyLnJhbmdlVmFsdWVbMV0udG9TdHJpbmcoKTtcbiAgICB9XG4gICAgdGhpcy5zdGVwSW5wdXQudmFsdWUgPSB0aGlzLl9zbGlkZXIuc3RlcC50b1N0cmluZygpO1xuICAgIHRoaXMuX3NsaWRlci5pc1ZlcnRpY2FsXG4gICAgICA/ICh0aGlzLm9yaWVudGF0aW9uUmFkaW9zWzBdLmNoZWNrZWQgPSB0cnVlKVxuICAgICAgOiAodGhpcy5vcmllbnRhdGlvblJhZGlvc1sxXS5jaGVja2VkID0gdHJ1ZSk7XG5cbiAgICBpZiAodGhpcy5fc2xpZGVyLmhhc1JhbmdlKSB7XG4gICAgICB0aGlzLnJhbmdlUmFkaW9zWzFdLmNoZWNrZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJhbmdlUmFkaW9zWzBdLmNoZWNrZWQgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5fc2xpZGVyLmhhc0xhYmVscykge1xuICAgICAgdGhpcy5zaG93TGFiZWxSYWRpb3NbMF0uY2hlY2tlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hvd0xhYmVsUmFkaW9zWzFdLmNoZWNrZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2hhbmdlTWluTWF4KCkge1xuICAgIGNvbnN0IG5ld01pbk1heCA9IHRoaXMubWluTWF4SW5wdXRzLm1hcChpbnB1dCA9PiBwYXJzZUludChpbnB1dC52YWx1ZSkpO1xuICAgIHRoaXMuX3NsaWRlci5taW5NYXggPSBuZXdNaW5NYXg7XG4gIH1cblxuICBwcml2YXRlIGNoYW5nZVZhbHVlcygpIHtcbiAgICBjb25zdCBuZXdWYWx1ZXMgPSB0aGlzLnZhbHVlSW5wdXRzLm1hcChpbnB1dCA9PiBwYXJzZUludChpbnB1dC52YWx1ZSkpO1xuICAgIHRoaXMuX3NsaWRlci5yYW5nZVZhbHVlID0gbmV3VmFsdWVzO1xuICB9XG4gIHByaXZhdGUgY2hhbmdlU3RlcCgpIHtcbiAgICBjb25zdCBuZXdTdGVwID0gcGFyc2VJbnQodGhpcy5zdGVwSW5wdXQudmFsdWUpO1xuICAgIHRoaXMuX3NsaWRlci5zdGVwID0gbmV3U3RlcDtcbiAgfVxuXG4gIHByaXZhdGUgY2hhbmdlT3JpZW50YXRpb24oKSB7XG4gICAgY29uc3QgbmV3T3JpZW50YXRpb24gPSB0aGlzLm9yaWVudGF0aW9uUmFkaW9zWzBdLmNoZWNrZWQgPyB0cnVlIDogZmFsc2U7XG4gICAgdGhpcy5fc2xpZGVyLmlzVmVydGljYWwgPSBuZXdPcmllbnRhdGlvbjtcbiAgfVxuXG4gIHByaXZhdGUgY2hhbmdlUmFuZ2UoKSB7XG4gICAgY29uc3QgbmV3UmFuZ2UgPSB0aGlzLnJhbmdlUmFkaW9zWzFdLmNoZWNrZWQgPyB0cnVlIDogZmFsc2U7XG4gICAgaWYgKCFuZXdSYW5nZSkge1xuICAgICAgdGhpcy52YWx1ZUlucHV0c1sxXS5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWx1ZUlucHV0c1swXS5hZnRlcih0aGlzLnZhbHVlSW5wdXRzWzFdKTtcbiAgICB9XG4gICAgdGhpcy5fc2xpZGVyLmhhc1JhbmdlID0gbmV3UmFuZ2U7XG4gIH1cblxuICBwcml2YXRlIGNoYW5nZUxhYmVsVmlzaWJpbGl0eSgpIHtcbiAgICBjb25zdCBzaG93TGFiZWxzID0gdGhpcy5zaG93TGFiZWxSYWRpb3NbMF0uY2hlY2tlZCA/IHRydWUgOiBmYWxzZTtcbiAgICB0aGlzLl9zbGlkZXIuaGFzTGFiZWxzID0gc2hvd0xhYmVscztcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlVmFsdWVzKCkge1xuICAgIHRoaXMuX3NsaWRlci5vYnNlcnZlci5zdWJzY3JpYmUoKHZhbHVlczogbnVtYmVyW10pID0+IHtcbiAgICAgIHRoaXMudmFsdWVJbnB1dHMuZm9yRWFjaCgoaW5wdXQsIGluZGV4KSA9PiAoaW5wdXQudmFsdWUgPSB2YWx1ZXNbaW5kZXhdLnRvU3RyaW5nKCkpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTWF4TWluSW5wdXRzKCkge1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQodGl0bGUpO1xuICAgIHRpdGxlLmlubmVyVGV4dCA9ICfQnNC40L0uINC30L3QsNGH0LXQvdC40LUv0JzQsNC60YEuINC30L3QsNGH0LXQvdC40LUnO1xuICAgIGNvbnN0IGlucHV0TWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBjb25zdCBpbnB1dE1heCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaW5wdXRNaW4uY2xhc3NMaXN0LmFkZCgnbGltaXRWYWx1ZScpO1xuICAgIGlucHV0TWF4LmNsYXNzTGlzdC5hZGQoJ2xpbWl0VmFsdWUnKTtcbiAgICBpbnB1dE1pbi50eXBlID0gJ251bWJlcic7XG4gICAgaW5wdXRNYXgudHlwZSA9ICdudW1iZXInO1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQoaW5wdXRNaW4pO1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQoaW5wdXRNYXgpO1xuICAgIHRoaXMuX21pbk1heElucHV0cyA9IFtpbnB1dE1pbiwgaW5wdXRNYXhdO1xuICB9XG5cbiAgZ2V0IG1pbk1heElucHV0cygpIHtcbiAgICByZXR1cm4gdGhpcy5fbWluTWF4SW5wdXRzO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVWYWx1ZUlucHV0cygpIHtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKHRpdGxlKTtcbiAgICB0aXRsZS5pbm5lclRleHQgPSAn0JfQvdCw0YfQtdC90LjQtSDQsdC10LPRg9C90LrQvtCyJztcbiAgICBjb25zdCBpbnB1dFNpbmdsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaW5wdXRTaW5nbGUuY2xhc3NMaXN0LmFkZCgnaGFuZGxlclZhbHVlJyk7XG4gICAgaW5wdXRTaW5nbGUudHlwZSA9ICdudW1iZXInO1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQoaW5wdXRTaW5nbGUpO1xuICAgIHRoaXMuX3ZhbHVlSW5wdXRzLnB1c2goaW5wdXRTaW5nbGUpO1xuICAgIGlmICh0aGlzLl9oYXNSYW5nZSkge1xuICAgICAgY29uc3QgaW5wdXRNaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGFuZGxlclZhbHVlJyk7XG4gICAgICBpZiAoaW5wdXRNaW4pIGlucHV0TWluLmNsYXNzTGlzdC5hZGQoJ3ZhbHVlX21pbicpO1xuICAgICAgY29uc3QgaW5wdXRNYXggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgaW5wdXRNYXguY2xhc3NMaXN0LmFkZCgnaGFuZGxlclZhbHVlJywgJ3ZhbHVlX21heCcpO1xuICAgICAgaW5wdXRNYXgudHlwZSA9ICdudW1iZXInO1xuICAgICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZChpbnB1dE1heCk7XG4gICAgICB0aGlzLl92YWx1ZUlucHV0cy5wdXNoKGlucHV0TWF4KTtcbiAgICB9XG4gIH1cbiAgZ2V0IHZhbHVlSW5wdXRzKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZUlucHV0cztcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlU3RlcElucHV0KCkge1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQodGl0bGUpO1xuICAgIHRpdGxlLmlubmVyVGV4dCA9ICfQl9C90LDRh9C10L3QuNC1INGI0LDQs9CwJztcbiAgICB0aGlzLl9zdGVwSW5wdXQuY2xhc3NMaXN0LmFkZCgnc3RlcFZhbHVlJyk7XG4gICAgdGhpcy5fc3RlcElucHV0LnR5cGUgPSAnbnVtYmVyJztcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKHRoaXMuX3N0ZXBJbnB1dCk7XG4gIH1cblxuICBnZXQgc3RlcElucHV0KCkge1xuICAgIHJldHVybiB0aGlzLl9zdGVwSW5wdXQ7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZU9yaWVudGF0aW9uUmFkaW9zKCkge1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQodGl0bGUpO1xuICAgIHRpdGxlLmlubmVyVGV4dCA9ICfQktC10YDRgtC40LrQsNC70YzQvdGL0Lkv0LPQvtGA0LjQt9C+0L3RgtCw0LvRjNC90YvQuSc7XG4gICAgY29uc3QgcmFkaW9WZXJ0aWNhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgcmFkaW9WZXJ0aWNhbC5pZCA9ICdyYWRpb192ZXJ0aWNhbCc7XG4gICAgY29uc3QgcmFkaW9Ib3Jpem9udGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICByYWRpb0hvcml6b250YWwuaWQgPSAncmFkaW9faG9yaXpvbnRhbCc7XG4gICAgdGhpcy5fb3JpZW50YXRpb25SYWRpb3MgPSBbcmFkaW9WZXJ0aWNhbCwgcmFkaW9Ib3Jpem9udGFsXTtcbiAgICB0aGlzLl9vcmllbnRhdGlvblJhZGlvcy5mb3JFYWNoKHJhZGlvID0+IHtcbiAgICAgIHJhZGlvLnR5cGUgPSAncmFkaW8nO1xuICAgICAgcmFkaW8ubmFtZSA9ICdvcmllbnRhdGlvbic7XG4gICAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKHJhZGlvKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBvcmllbnRhdGlvblJhZGlvcygpIHtcbiAgICByZXR1cm4gdGhpcy5fb3JpZW50YXRpb25SYWRpb3M7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVJhbmdlUmFkaW9zKCkge1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQodGl0bGUpO1xuICAgIHRpdGxlLmlubmVyVGV4dCA9ICfQntC00LjQvdC+0YfQvdC+0LUv0LjQvdGC0LXRgNCy0LDQuyc7XG4gICAgY29uc3QgcmFkaW9TaW5nbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHJhZGlvU2luZ2xlLmlkID0gJ3JhZGlvX3NpbmdsZSc7XG4gICAgY29uc3QgcmFkaW9Eb3VibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHJhZGlvRG91YmxlLmlkID0gJ3JhZGlvX2RvdWJsZSc7XG4gICAgdGhpcy5fcmFuZ2VSYWRpb3MgPSBbcmFkaW9TaW5nbGUsIHJhZGlvRG91YmxlXTtcbiAgICB0aGlzLl9yYW5nZVJhZGlvcy5mb3JFYWNoKHJhZGlvID0+IHtcbiAgICAgIHJhZGlvLnR5cGUgPSAncmFkaW8nO1xuICAgICAgcmFkaW8ubmFtZSA9ICdyYW5nZSc7XG4gICAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKHJhZGlvKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldCByYW5nZVJhZGlvcygpIHtcbiAgICByZXR1cm4gdGhpcy5fcmFuZ2VSYWRpb3M7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVNob3dMYWJlbFJhZGlvcygpIHtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKHRpdGxlKTtcbiAgICB0aXRsZS5pbm5lclRleHQgPSAn0J/QvtC60LDQt9Cw0YLRjCDQt9C90LDRh9C10L3QuNGPL9Ch0LrRgNGL0YLRjCDQt9C90LDRh9C10L3QuNGPJztcbiAgICBjb25zdCByYWRpb1Nob3dMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgcmFkaW9TaG93TGFiZWwuaWQgPSAncmFkaW9fc2hvd0xhYmVsJztcbiAgICBjb25zdCByYWRpb0hpZGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgcmFkaW9IaWRlTGFiZWwuaWQgPSAncmFkaW9faGlkZUxhYmVsJztcbiAgICB0aGlzLl9zaG93TGFiZWxSYWRpb3MgPSBbcmFkaW9TaG93TGFiZWwsIHJhZGlvSGlkZUxhYmVsXTtcbiAgICB0aGlzLl9zaG93TGFiZWxSYWRpb3MuZm9yRWFjaChyYWRpbyA9PiB7XG4gICAgICByYWRpby50eXBlID0gJ3JhZGlvJztcbiAgICAgIHJhZGlvLm5hbWUgPSAnbGFiZWwnO1xuICAgICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZChyYWRpbyk7XG4gICAgfSk7XG4gIH1cbiAgZ2V0IHNob3dMYWJlbFJhZGlvcygpIHtcbiAgICByZXR1cm4gdGhpcy5fc2hvd0xhYmVsUmFkaW9zO1xuICB9XG59XG5cbmV4cG9ydCB7IENvbnRyb2xQYW5lbCB9O1xuIiwiaW1wb3J0IHsgRmFjYWRlIH0gZnJvbSAnLi9wcmVzZW50ZXIvRmFjYWRlJztcbmltcG9ydCB7IENvbnRyb2xQYW5lbCB9IGZyb20gJy4vQ29udHJvbFBhbmVsL0NvbnRyb2xQYW5lbCc7XG5cbiQoZnVuY3Rpb24oKSB7XG4gICQuZm4uc2xpZGVyID0gZnVuY3Rpb24ob3B0aW9ucyk6IHsgZmFjYWRlOiBGYWNhZGU7IHBhbmVsOiBDb250cm9sUGFuZWwgfSB7XG4gICAgY29uc3QgZmFjYWRlOiBGYWNhZGUgPSBuZXcgRmFjYWRlKHRoaXMuZ2V0KDApLCBvcHRpb25zKTtcbiAgICBjb25zdCBwYW5lbDogQ29udHJvbFBhbmVsID0gbmV3IENvbnRyb2xQYW5lbChmYWNhZGUpO1xuICAgIHJldHVybiB7IGZhY2FkZSwgcGFuZWwgfTtcbiAgfTtcbn0pO1xuIiwiaW1wb3J0IHsgRXZlbnRPYnNlcnZlciB9IGZyb20gJy4uL29ic2VydmVyL29ic2VydmVyJztcbmltcG9ydCB7IEhhbmRsZXIgfSBmcm9tICcuL2hhbmRsZXInO1xuaW1wb3J0IHsgc2xpZGVyT3B0aW9ucyB9IGZyb20gJy4vc2xpZGVyT3B0aW9ucyc7XG5cbmNsYXNzIE1haW5Nb2RlbCB7XG4gIHB1YmxpYyBvYnNlcnZlcjogRXZlbnRPYnNlcnZlcjtcbiAgcHJpdmF0ZSBfbWluID0gMDtcbiAgcHJpdmF0ZSBfbWF4ID0gMTAwO1xuICBwcml2YXRlIF9zdGVwID0gMTtcbiAgcHJpdmF0ZSBfdmFsdWVzID0gWzEwLCAyMF07XG4gIHByaXZhdGUgX2lzVmVydGljYWwgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfaGFzUmFuZ2UgPSB0cnVlO1xuICBwcml2YXRlIF9oYXNMYWJlbHMgPSB0cnVlO1xuICBwcml2YXRlIF9oYW5kbGVyczogSGFuZGxlcltdID0gW107XG4gIGNvbnN0cnVjdG9yKHNsaWRlck9wdGlvbnM6IHNsaWRlck9wdGlvbnMpIHtcbiAgICB0aGlzLm9ic2VydmVyID0gbmV3IEV2ZW50T2JzZXJ2ZXIoKTtcbiAgICB0aGlzLl9taW4gPSBzbGlkZXJPcHRpb25zLm1pbiA/IHNsaWRlck9wdGlvbnMubWluIDogMDtcbiAgICB0aGlzLl9tYXggPSBzbGlkZXJPcHRpb25zLm1heCA/IHNsaWRlck9wdGlvbnMubWF4IDogdGhpcy5fbWF4O1xuICAgIHRoaXMuX3N0ZXAgPSBzbGlkZXJPcHRpb25zLnN0ZXAgPyBzbGlkZXJPcHRpb25zLnN0ZXAgOiB0aGlzLl9zdGVwO1xuICAgIHRoaXMuX3ZhbHVlcyA9IHNsaWRlck9wdGlvbnMudmFsdWVzID8gc2xpZGVyT3B0aW9ucy52YWx1ZXMgOiB0aGlzLl92YWx1ZXM7XG4gICAgdGhpcy5faGFzUmFuZ2UgPSBzbGlkZXJPcHRpb25zLmhhc1JhbmdlID8gc2xpZGVyT3B0aW9ucy5oYXNSYW5nZSA6IHRoaXMuX2hhc1JhbmdlO1xuICAgIHRoaXMuX2lzVmVydGljYWwgPSBzbGlkZXJPcHRpb25zLmlzVmVydGljYWwgPyBzbGlkZXJPcHRpb25zLmlzVmVydGljYWwgOiB0aGlzLl9pc1ZlcnRpY2FsO1xuICAgIHRoaXMuX2hhc0xhYmVscyA9IHNsaWRlck9wdGlvbnMuaGFzTGFiZWxzID8gc2xpZGVyT3B0aW9ucy5oYXNMYWJlbHMgOiB0aGlzLl9oYXNMYWJlbHM7XG4gIH1cblxuICBub3RpZnlQcmVzZW50ZXIodmFsdWVEYXRhOiBzbGlkZXJPcHRpb25zKSB7XG4gICAgdGhpcy5vYnNlcnZlci5icm9hZGNhc3QodmFsdWVEYXRhKTtcbiAgfVxuXG4gIGdldCBtaW4oKTogbnVtYmVyIHtcbiAgICB0aGlzLl9taW4gPSBNYXRoLnJvdW5kKHRoaXMuX21pbiAvIHRoaXMuX3N0ZXApICogdGhpcy5fc3RlcDtcbiAgICByZXR1cm4gdGhpcy5fbWluO1xuICB9XG5cbiAgc2V0IG1pbihtaW46IG51bWJlcikge1xuICAgIHRoaXMuX21pbiA9IG1pbjtcbiAgICB0aGlzLm5vdGlmeVByZXNlbnRlcih7XG4gICAgICBtaW46IHRoaXMubWluLFxuICAgICAgdmFsdWVzOiB0aGlzLnJhbmdlVmFsdWUsXG4gICAgfSk7XG4gIH1cblxuICBnZXQgbWF4KCk6IG51bWJlciB7XG4gICAgdGhpcy5fbWF4ID0gTWF0aC5yb3VuZCh0aGlzLl9tYXggLyB0aGlzLl9zdGVwKSAqIHRoaXMuX3N0ZXA7XG4gICAgcmV0dXJuIHRoaXMuX21heDtcbiAgfVxuXG4gIHNldCBtYXgobWF4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9tYXggPSBtYXg7XG4gICAgdGhpcy5ub3RpZnlQcmVzZW50ZXIoe1xuICAgICAgbWF4OiB0aGlzLm1heCxcbiAgICAgIHZhbHVlczogdGhpcy5yYW5nZVZhbHVlLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0IHN0ZXAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc3RlcDtcbiAgfVxuXG4gIHNldCBzdGVwKHN0ZXA6IG51bWJlcikge1xuICAgIHRoaXMuX3N0ZXAgPSBzdGVwO1xuICAgIHRoaXMubm90aWZ5UHJlc2VudGVyKHtcbiAgICAgIHN0ZXA6IHRoaXMuX3N0ZXAsXG4gICAgICB2YWx1ZXM6IHRoaXMucmFuZ2VWYWx1ZSxcbiAgICB9KTtcbiAgfVxuICAvL9C90LUg0LjRgdC/0L7Qu9GM0LfRg9C10YLRgdGPIVxuICBnZXQgc2luZ2xlVmFsdWUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jYWxjVmFsdWVzKHRoaXMuX3ZhbHVlcylbMF07XG4gIH1cbiAgLy/QvdC1INC40YHQv9C+0LvRjNC30YPQtdGC0YHRjyFcbiAgc2V0IHNpbmdsZVZhbHVlKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl92YWx1ZXNbMF0gPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCByYW5nZVZhbHVlKCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gdGhpcy5jYWxjVmFsdWVzKHRoaXMuX3ZhbHVlcyk7XG4gIH1cblxuICBzZXQgcmFuZ2VWYWx1ZSh2YWx1ZXM6IG51bWJlcltdKSB7XG4gICAgdGhpcy5fdmFsdWVzID0gdmFsdWVzO1xuICAgIHRoaXMubm90aWZ5UHJlc2VudGVyKHtcbiAgICAgIHZhbHVlczogdGhpcy5yYW5nZVZhbHVlLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0IGlzVmVydGljYWwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzVmVydGljYWw7XG4gIH1cblxuICBzZXQgaXNWZXJ0aWNhbCh2ZXJ0aWNhbDogYm9vbGVhbikge1xuICAgIHRoaXMuX2lzVmVydGljYWwgPSB2ZXJ0aWNhbDtcbiAgICB0aGlzLm5vdGlmeVByZXNlbnRlcih7XG4gICAgICB2YWx1ZXM6IHRoaXMucmFuZ2VWYWx1ZSxcbiAgICAgIGlzVmVydGljYWw6IHRoaXMuX2lzVmVydGljYWwsXG4gICAgfSk7XG4gIH1cblxuICBnZXQgaGFzUmFuZ2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2hhc1JhbmdlO1xuICB9XG5cbiAgc2V0IGhhc1JhbmdlKHJhbmdlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGFzUmFuZ2UgPSByYW5nZTtcbiAgICB0aGlzLm5vdGlmeVByZXNlbnRlcih7XG4gICAgICB2YWx1ZXM6IHRoaXMucmFuZ2VWYWx1ZSxcbiAgICAgIGhhc1JhbmdlOiB0aGlzLl9oYXNSYW5nZSxcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBoYXNMYWJlbHMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2hhc0xhYmVscztcbiAgfVxuXG4gIHNldCBoYXNMYWJlbHMobGFiZWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oYXNMYWJlbHMgPSBsYWJlbDtcbiAgICB0aGlzLm5vdGlmeVByZXNlbnRlcih7XG4gICAgICB2YWx1ZXM6IHRoaXMucmFuZ2VWYWx1ZSxcbiAgICAgIGhhc0xhYmVsczogdGhpcy5faGFzTGFiZWxzLFxuICAgIH0pO1xuICB9XG5cbiAgLy9jaGVjayB0aGF0IHZhbHVlcyBvZiBoYW5kbGVycyBhcmUgd2l0aGluIG1pbiBhbmQgbWF4XG4gIC8vY2hlY2sgdGhhdCB2YWx1ZSAwIGlzIGxlc3MgdGhhbiB2YWx1ZSAxIGZvciByYW5nZVxuICBjYWxjVmFsdWVzKHZhbHVlczogbnVtYmVyW10pOiBudW1iZXJbXSB7XG4gICAgdmFsdWVzID0gdmFsdWVzLm1hcCh2YWx1ZSA9PiBNYXRoLnJvdW5kKHZhbHVlIC8gdGhpcy5fc3RlcCkgKiB0aGlzLl9zdGVwKTtcbiAgICBpZiAodmFsdWVzWzBdID4gdmFsdWVzWzFdKSBbdmFsdWVzWzBdLCB2YWx1ZXNbMV1dID0gW3ZhbHVlc1sxXSwgdmFsdWVzWzBdXTtcbiAgICB2YWx1ZXMgPSB2YWx1ZXMubWFwKHZhbHVlID0+XG4gICAgICB2YWx1ZSA8IHRoaXMuX21pbiA/IHRoaXMuX21pbiA6IHZhbHVlID4gdGhpcy5fbWF4ID8gdGhpcy5fbWF4IDogdmFsdWUsXG4gICAgKTtcblxuICAgIHJldHVybiB2YWx1ZXM7XG4gIH1cblxuICAvL2NyZWF0ZSBoYW5kbGVycyBkZXBlbmRpbmcgb24gcmFuZ2UuIG5vdCB1c2VkXG4gIHNldEhhbmRsZXJzKHZhbHVlczogbnVtYmVyW10pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faGFzUmFuZ2UpIHtcbiAgICAgIHRoaXMuX2hhbmRsZXJzID0gW25ldyBIYW5kbGVyKHZhbHVlc1swXSksIG5ldyBIYW5kbGVyKHZhbHVlc1sxXSldO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oYW5kbGVycyA9IFtuZXcgSGFuZGxlcih2YWx1ZXNbMF0pXTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgTWFpbk1vZGVsIH07XG4iLCJjbGFzcyBIYW5kbGVyIHtcbiAgcHJpdmF0ZSBfcG9zaXRpb246IG51bWJlcjtcbiAgY29uc3RydWN0b3IocG9zaXRpb246IG51bWJlcikge1xuICAgIHRoaXMuX3Bvc2l0aW9uID0gcG9zaXRpb247XG4gIH1cblxuICBnZXQgcG9zaXRpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XG4gIH1cblxuICBzZXQgcG9zaXRpb24odmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3Bvc2l0aW9uID0gdmFsdWU7XG4gIH1cbn1cblxuZXhwb3J0IHsgSGFuZGxlciB9O1xuIiwiY2xhc3MgRXZlbnRPYnNlcnZlciB7XG4gIHByaXZhdGUgX29ic2VydmVyczogRnVuY3Rpb25bXTtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fb2JzZXJ2ZXJzID0gW107XG4gIH1cbiAgc3Vic2NyaWJlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMuX29ic2VydmVycy5wdXNoKGZuKTtcbiAgfVxuICB1bnN1YnNjcmliZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLl9vYnNlcnZlcnMgPSB0aGlzLl9vYnNlcnZlcnMuZmlsdGVyKHN1YnNjcmliZXIgPT4gc3Vic2NyaWJlciAhPT0gZm4pO1xuICB9XG4gIGJyb2FkY2FzdChkYXRhOiBvYmplY3QpOiB2b2lkIHtcbiAgICB0aGlzLl9vYnNlcnZlcnMuZm9yRWFjaChzdWJzY3JpYmVyID0+IHN1YnNjcmliZXIoZGF0YSkpO1xuICB9XG59XG5cbmV4cG9ydCB7IEV2ZW50T2JzZXJ2ZXIgfTtcbiIsImltcG9ydCB7IE1haW5Nb2RlbCB9IGZyb20gJy4uL21vZGVsL01haW5Nb2RlbCc7XG5pbXBvcnQgeyBQcmVzZW50ZXIgfSBmcm9tICcuL1ByZXNlbnRlcic7XG5pbXBvcnQgeyBzbGlkZXJPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWwvc2xpZGVyT3B0aW9ucyc7XG5pbXBvcnQgeyBFdmVudE9ic2VydmVyIH0gZnJvbSAnLi4vb2JzZXJ2ZXIvb2JzZXJ2ZXInO1xuXG5jbGFzcyBGYWNhZGUge1xuICBwcml2YXRlIF9tb2RlbDogTWFpbk1vZGVsO1xuICBwcml2YXRlIF9wcmVzZW50ZXI6IFByZXNlbnRlcjtcbiAgcHVibGljIG9ic2VydmVyOiBFdmVudE9ic2VydmVyO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmVudDogSFRNTEVsZW1lbnQsIHNsaWRlck9wdGlvbnM6IHNsaWRlck9wdGlvbnMpIHtcbiAgICB0aGlzLm9ic2VydmVyID0gbmV3IEV2ZW50T2JzZXJ2ZXIoKTtcbiAgICB0aGlzLl9tb2RlbCA9IG5ldyBNYWluTW9kZWwoc2xpZGVyT3B0aW9ucyk7XG4gICAgdGhpcy5fcHJlc2VudGVyID0gbmV3IFByZXNlbnRlcihwYXJlbnQsIHRoaXMuX21vZGVsKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlcygpO1xuICB9XG5cbiAgdXBkYXRlVmFsdWVzKCkge1xuICAgIHRoaXMuX21vZGVsLm9ic2VydmVyLnN1YnNjcmliZSgodmFsdWVEYXRhOiBzbGlkZXJPcHRpb25zKSA9PiB7XG4gICAgICBpZiAodmFsdWVEYXRhLnZhbHVlcykgdGhpcy5vYnNlcnZlci5icm9hZGNhc3QodmFsdWVEYXRhLnZhbHVlcyk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgcGFyZW50KCkge1xuICAgIHJldHVybiB0aGlzLl9wcmVzZW50ZXIucGFyZW50O1xuICB9XG5cbiAgZ2V0IG1pbk1heCgpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIFt0aGlzLl9tb2RlbC5taW4sIHRoaXMuX21vZGVsLm1heF07XG4gIH1cblxuICBzZXQgbWluTWF4KHZhbHVlOiBudW1iZXJbXSkge1xuICAgIFt0aGlzLl9tb2RlbC5taW4sIHRoaXMuX21vZGVsLm1heF0gPSB2YWx1ZTtcbiAgfVxuICAvL25vdCB1c2VkXG4gIGdldCBzaW5nbGVWYWx1ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5zaW5nbGVWYWx1ZTtcbiAgfVxuICAvL25vdCB1c2VkXG4gIHNldCBzaW5nbGVWYWx1ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fbW9kZWwuc2luZ2xlVmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCByYW5nZVZhbHVlKCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwucmFuZ2VWYWx1ZTtcbiAgfVxuXG4gIHNldCByYW5nZVZhbHVlKHZhbHVlOiBudW1iZXJbXSkge1xuICAgIHRoaXMuX21vZGVsLnJhbmdlVmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBzdGVwKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLnN0ZXA7XG4gIH1cblxuICBzZXQgc3RlcCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fbW9kZWwuc3RlcCA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IGlzVmVydGljYWwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmlzVmVydGljYWw7XG4gIH1cblxuICBzZXQgaXNWZXJ0aWNhbCh2ZXJ0aWNhbDogYm9vbGVhbikge1xuICAgIHRoaXMuX21vZGVsLmlzVmVydGljYWwgPSB2ZXJ0aWNhbDtcbiAgfVxuXG4gIGdldCBoYXNSYW5nZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuaGFzUmFuZ2U7XG4gIH1cblxuICBzZXQgaGFzUmFuZ2UocmFuZ2U6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9tb2RlbC5oYXNSYW5nZSA9IHJhbmdlO1xuICB9XG4gIGdldCBoYXNMYWJlbHMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmhhc0xhYmVscztcbiAgfVxuXG4gIHNldCBoYXNMYWJlbHMobGFiZWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9tb2RlbC5oYXNMYWJlbHMgPSBsYWJlbDtcbiAgfVxufVxuXG5leHBvcnQgeyBGYWNhZGUgfTtcbiIsImltcG9ydCB7IE1haW5Nb2RlbCB9IGZyb20gJy4uL21vZGVsL01haW5Nb2RlbCc7XG5pbXBvcnQgeyBNYWluVmlldyB9IGZyb20gJy4uL3ZpZXcvTWFpblZpZXcnO1xuaW1wb3J0IHsgc2xpZGVyT3B0aW9ucyB9IGZyb20gJy4uL21vZGVsL3NsaWRlck9wdGlvbnMnO1xuXG5jbGFzcyBQcmVzZW50ZXIge1xuICBwcml2YXRlIF9tb2RlbDogTWFpbk1vZGVsO1xuICBwcml2YXRlIF92aWV3OiBNYWluVmlldztcbiAgcHJpdmF0ZSBfdmFsdWVzOiBudW1iZXJbXTtcbiAgcHJpdmF0ZSBfcGFyZW50OiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihwYXJlbnQ6IEhUTUxFbGVtZW50LCBtb2RlbDogTWFpbk1vZGVsKSB7XG4gICAgdGhpcy5fbW9kZWwgPSBtb2RlbDtcbiAgICB0aGlzLl92YWx1ZXMgPSB0aGlzLl9tb2RlbC5yYW5nZVZhbHVlO1xuICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcbiAgICB0aGlzLl92aWV3ID0gbmV3IE1haW5WaWV3KFxuICAgICAgdGhpcy5fcGFyZW50LFxuICAgICAgdGhpcy5fbW9kZWwuaGFzUmFuZ2UsXG4gICAgICB0aGlzLl9tb2RlbC5pc1ZlcnRpY2FsLFxuICAgICAgdGhpcy5fbW9kZWwubWluLFxuICAgICAgdGhpcy5fbW9kZWwubWF4LFxuICAgICAgdGhpcy5fdmFsdWVzLFxuICAgICAgdGhpcy5fbW9kZWwuaGFzTGFiZWxzLFxuICAgICk7XG4gICAgdGhpcy51cGRhdGVNb2RlbCgpO1xuICAgIHRoaXMudXBkYXRlVmlldygpO1xuICB9XG5cbiAgdXBkYXRlTW9kZWwoKSB7XG4gICAgdGhpcy5fdmlldy5vYnNlcnZlci5zdWJzY3JpYmUoKHZhbHVlRGF0YTogc2xpZGVyT3B0aW9ucykgPT4ge1xuICAgICAgaWYgKHZhbHVlRGF0YS5taW4pIHRoaXMuX21vZGVsLm1pbiA9IHZhbHVlRGF0YS5taW47XG4gICAgICBpZiAodmFsdWVEYXRhLm1heCkgdGhpcy5fbW9kZWwubWF4ID0gdmFsdWVEYXRhLm1heDtcbiAgICAgIGlmICh2YWx1ZURhdGEudmFsdWVzKSB0aGlzLl9tb2RlbC5yYW5nZVZhbHVlID0gdmFsdWVEYXRhLnZhbHVlcztcbiAgICAgIGlmICh2YWx1ZURhdGEuaXNWZXJ0aWNhbCAhPT0gdW5kZWZpbmVkKSB0aGlzLl9tb2RlbC5pc1ZlcnRpY2FsID0gdmFsdWVEYXRhLmlzVmVydGljYWw7XG4gICAgICBpZiAodmFsdWVEYXRhLnN0ZXApIHRoaXMuX21vZGVsLnN0ZXAgPSB2YWx1ZURhdGEuc3RlcDtcbiAgICAgIGlmICh2YWx1ZURhdGEuaGFzUmFuZ2UgIT09IHVuZGVmaW5lZCkgdGhpcy5fbW9kZWwuaGFzUmFuZ2UgPSB2YWx1ZURhdGEuaGFzUmFuZ2U7XG4gICAgICBpZiAodmFsdWVEYXRhLmhhc0xhYmVscyAhPT0gdW5kZWZpbmVkKSB0aGlzLl9tb2RlbC5oYXNMYWJlbHMgPSB2YWx1ZURhdGEuaGFzTGFiZWxzO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlVmlldygpIHtcbiAgICB0aGlzLl9tb2RlbC5vYnNlcnZlci5zdWJzY3JpYmUoKHZhbHVlRGF0YTogc2xpZGVyT3B0aW9ucykgPT4ge1xuICAgICAgdGhpcy5fdmlldy51cGRhdGUodmFsdWVEYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBwYXJlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BhcmVudDtcbiAgfVxufVxuXG5leHBvcnQgeyBQcmVzZW50ZXIgfTtcbiIsImltcG9ydCB7IExhYmVsVmlldyB9IGZyb20gJy4vTGFiZWxWaWV3JztcblxuY2xhc3MgSGFuZGxlclZpZXcge1xuICBwcml2YXRlIF9wYXJlbnQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9oYW5kbGVyOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfbGFiZWw6IExhYmVsVmlldyB8IG51bGw7XG4gIHByaXZhdGUgX3Nob3dMYWJlbDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihwYXJlbnQ6IEhUTUxFbGVtZW50LCBzaG93TGFiZWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oYW5kbGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgIHRoaXMuX3Nob3dMYWJlbCA9IHNob3dMYWJlbDtcbiAgICB0aGlzLl9sYWJlbCA9IHNob3dMYWJlbCA/IG5ldyBMYWJlbFZpZXcoKSA6IG51bGw7XG4gICAgdGhpcy5oYW5kbGVySW5pdCgpO1xuICB9XG4gIHByaXZhdGUgaGFuZGxlckluaXQoKSB7XG4gICAgdGhpcy5fcGFyZW50LmFwcGVuZCh0aGlzLl9oYW5kbGVyKTtcbiAgICB0aGlzLl9oYW5kbGVyLmNsYXNzTGlzdC5hZGQoJ2hhbmRsZXInKTtcbiAgICBpZiAodGhpcy5fbGFiZWwpIHRoaXMuX2hhbmRsZXIuYmVmb3JlKHRoaXMuX2xhYmVsLmVsZW0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRIYW5kbGVyU2l6ZShpc1ZlcnRpY2FsOiBib29sZWFuKSB7XG4gICAgY29uc3QgaGFuZGxlclNpemUgPSBpc1ZlcnRpY2FsXG4gICAgICA/ICh0aGlzLl9oYW5kbGVyLm9mZnNldEhlaWdodCAvIHRoaXMuX3BhcmVudC5vZmZzZXRIZWlnaHQpICogMTAwXG4gICAgICA6ICh0aGlzLl9oYW5kbGVyLm9mZnNldFdpZHRoIC8gdGhpcy5fcGFyZW50Lm9mZnNldFdpZHRoKSAqIDEwMDtcbiAgICByZXR1cm4gaGFuZGxlclNpemU7XG4gIH1cblxuICBzZXRQb3NpdGlvbih2YWx1ZTogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIsIGlzVmVydGljYWw6IGJvb2xlYW4pIHtcbiAgICBjb25zdCB2YWx1ZXNDb3VudCA9IG1heCAtIG1pbjtcbiAgICBjb25zdCBwb3NpdGlvblByb3BlcnR5ID0gaXNWZXJ0aWNhbCA/ICdib3R0b20nIDogJ2xlZnQnO1xuICAgIGNvbnN0IGhhbmRsZXJTaXplID0gdGhpcy5nZXRIYW5kbGVyU2l6ZShpc1ZlcnRpY2FsKTtcbiAgICBjb25zdCBwb3NpdGlvbiA9ICgodmFsdWUgLSBtaW4pIC8gdmFsdWVzQ291bnQpICogMTAwIC0gaGFuZGxlclNpemUgLyAyO1xuICAgIHRoaXMuX2hhbmRsZXIuc3R5bGVbcG9zaXRpb25Qcm9wZXJ0eV0gPSBgJHtwb3NpdGlvbn0lYDtcbiAgICB0aGlzLnNldExhYmVsUG9zaXRpb24odmFsdWUsIHZhbHVlc0NvdW50LCBtaW4sIGlzVmVydGljYWwpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRMYWJlbFBvc2l0aW9uKHZhbHVlOiBudW1iZXIsIHZhbHVlc0NvdW50OiBudW1iZXIsIG1pbjogbnVtYmVyLCBpc1ZlcnRpY2FsOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuX2xhYmVsKSB7XG4gICAgICBjb25zdCBsYWJlbFNpemUgPSB0aGlzLl9sYWJlbC5nZXRMYWJlbFNpemUoaXNWZXJ0aWNhbCwgdGhpcy5fcGFyZW50KTtcbiAgICAgIGNvbnN0IGZpeGVkUG9zaXRpb25Qcm9wZXJ0eSA9IHRoaXMuX2xhYmVsLmdldEZpeGVkUG9zaXRpb25Qcm9wZXJ0eShpc1ZlcnRpY2FsKTtcbiAgICAgIGNvbnN0IHBvc2l0aW9uUHJvcGVydHkgPSBpc1ZlcnRpY2FsID8gJ2JvdHRvbScgOiAnbGVmdCc7XG4gICAgICBjb25zdCBsYWJlbFBvc2l0aW9uID0gKCh2YWx1ZSAtIG1pbikgLyB2YWx1ZXNDb3VudCkgKiAxMDAgLSBsYWJlbFNpemUgLyAyO1xuICAgICAgdGhpcy5fbGFiZWwuZWxlbS5zdHlsZVtwb3NpdGlvblByb3BlcnR5XSA9IGAke2xhYmVsUG9zaXRpb259JWA7XG4gICAgICB0aGlzLl9sYWJlbC5lbGVtLnN0eWxlW2ZpeGVkUG9zaXRpb25Qcm9wZXJ0eV0gPSAnMzMwJSc7XG4gICAgICB0aGlzLnNldExhYmVsVmFsdWUodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBlbGVtKCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVyO1xuICB9XG4gIGdldCBsYWJlbEVsZW0oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xhYmVsPy5lbGVtO1xuICB9XG4gIHByaXZhdGUgc2V0TGFiZWxWYWx1ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX2xhYmVsKSB0aGlzLl9sYWJlbC5zZXRMYWJlbFZhbHVlKHZhbHVlKTtcbiAgfVxuXG4gIHVwZGF0ZUxhYmVsKHNob3dMYWJlbDogYm9vbGVhbiB8IHVuZGVmaW5lZCwgdmFsdWU6IG51bWJlcikge1xuICAgIGlmIChzaG93TGFiZWwpIHtcbiAgICAgIHRoaXMuX2xhYmVsID0gdGhpcy5fbGFiZWwgPyB0aGlzLl9sYWJlbCA6IG5ldyBMYWJlbFZpZXcoKTtcbiAgICAgIHRoaXMuX2hhbmRsZXIuYmVmb3JlKHRoaXMuX2xhYmVsLmVsZW0pO1xuICAgICAgdGhpcy5zZXRMYWJlbFZhbHVlKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbGFiZWw/LmVsZW0ucmVtb3ZlKCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IEhhbmRsZXJWaWV3IH07XG4iLCJjbGFzcyBMYWJlbFZpZXcge1xuICBwcml2YXRlIF9sYWJlbDogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9sYWJlbC5jbGFzc0xpc3QuYWRkKCdsYWJlbCcpO1xuICB9XG5cbiAgZ2V0IGVsZW0oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xhYmVsO1xuICB9XG5cbiAgc2V0TGFiZWxWYWx1ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fbGFiZWwuaW5uZXJUZXh0ID0gdmFsdWUudG9TdHJpbmcoKTtcbiAgfVxuXG4gIGdldExhYmVsU2l6ZShpc1ZlcnRpY2FsOiBib29sZWFuLCBwYXJlbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3QgbGFiZWxTaXplID0gaXNWZXJ0aWNhbFxuICAgICAgPyAodGhpcy5lbGVtLm9mZnNldEhlaWdodCAvIHBhcmVudC5vZmZzZXRIZWlnaHQpICogMTAwXG4gICAgICA6ICh0aGlzLmVsZW0ub2Zmc2V0V2lkdGggLyBwYXJlbnQub2Zmc2V0V2lkdGgpICogMTAwO1xuXG4gICAgcmV0dXJuIGxhYmVsU2l6ZTtcbiAgfVxuXG4gIGdldEZpeGVkUG9zaXRpb25Qcm9wZXJ0eShpc1ZlcnRpY2FsOiBib29sZWFuKSB7XG4gICAgY29uc3QgZml4ZWRQb3NpdGlvblByb3BlcnR5ID0gaXNWZXJ0aWNhbCA/ICdsZWZ0JyA6ICdib3R0b20nO1xuICAgIHJldHVybiBmaXhlZFBvc2l0aW9uUHJvcGVydHk7XG4gIH1cbn1cblxuZXhwb3J0IHsgTGFiZWxWaWV3IH07XG4iLCJpbXBvcnQgeyBIYW5kbGVyVmlldyB9IGZyb20gJy4vSGFuZGxlclZpZXcnO1xuaW1wb3J0IHsgU2VsZWN0ZWRBcmVhIH0gZnJvbSAnLi9TZWxlY3RlZEFyZWFWaWV3JztcbmltcG9ydCB7IEV2ZW50T2JzZXJ2ZXIgfSBmcm9tICcuLi9vYnNlcnZlci9vYnNlcnZlcic7XG5pbXBvcnQgeyBzbGlkZXJPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWwvc2xpZGVyT3B0aW9ucyc7XG5cbmNsYXNzIE1haW5WaWV3IHtcbiAgcHVibGljIG9ic2VydmVyOiBFdmVudE9ic2VydmVyO1xuICBwcml2YXRlIF9zbGlkZXJCb2R5OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfcGFyZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfc2VsZWN0ZWRBcmVhOiBTZWxlY3RlZEFyZWE7XG4gIHByaXZhdGUgX2hhbmRsZXJzOiBIYW5kbGVyVmlld1tdO1xuICBwcml2YXRlIF9taW46IG51bWJlcjtcbiAgcHJpdmF0ZSBfbWF4OiBudW1iZXI7XG4gIHByaXZhdGUgX3ZhbHVlczogbnVtYmVyW107XG4gIHByaXZhdGUgX2lzVmVydGljYWw6IGJvb2xlYW47XG4gIHByaXZhdGUgX2hhc1JhbmdlOiBib29sZWFuO1xuICBwcml2YXRlIF9oYXNMYWJlbHM6IGJvb2xlYW47XG4gIHByaXZhdGUgX21vdXNlTW92ZTogYW55O1xuICBwcml2YXRlIF9tb3VzZVVwOiBhbnk7XG4gIHByaXZhdGUgX2hhbmRsZXJUYXJnZXRJZDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHBhcmVudDogSFRNTEVsZW1lbnQsXG4gICAgaGFzUmFuZ2U6IGJvb2xlYW4sXG4gICAgaXNWZXJ0aWNhbDogYm9vbGVhbixcbiAgICBtaW46IG51bWJlcixcbiAgICBtYXg6IG51bWJlcixcbiAgICB2YWx1ZXM6IG51bWJlcltdLFxuICAgIGhhc0xhYmVsczogYm9vbGVhbixcbiAgKSB7XG4gICAgdGhpcy5vYnNlcnZlciA9IG5ldyBFdmVudE9ic2VydmVyKCk7XG4gICAgdGhpcy5faGFuZGxlcnMgPSBbXTtcbiAgICB0aGlzLl9taW4gPSBtaW47XG4gICAgdGhpcy5fbWF4ID0gbWF4O1xuICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlcztcbiAgICB0aGlzLl9pc1ZlcnRpY2FsID0gaXNWZXJ0aWNhbDtcbiAgICB0aGlzLl9oYXNSYW5nZSA9IGhhc1JhbmdlO1xuICAgIHRoaXMuX2hhc0xhYmVscyA9IGhhc0xhYmVscztcbiAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5fc2xpZGVyQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgdGhpcy5fbW91c2VNb3ZlO1xuICAgIHRoaXMuX21vdXNlVXA7XG4gICAgdGhpcy5faGFuZGxlclRhcmdldElkID0gJyc7XG5cbiAgICB0aGlzLnNsaWRlckluaXQoKTtcbiAgICB0aGlzLl9zZWxlY3RlZEFyZWEgPSBuZXcgU2VsZWN0ZWRBcmVhKFxuICAgICAgdGhpcy5fc2xpZGVyQm9keSxcbiAgICAgIHRoaXMuX2hhc1JhbmdlLFxuICAgICAgdGhpcy5faXNWZXJ0aWNhbCxcbiAgICAgIHRoaXMuX2hhbmRsZXJzWzBdLmVsZW0sXG4gICAgICB0aGlzLl9oYW5kbGVyc1sxXS5lbGVtLFxuICAgICk7XG5cbiAgICB0aGlzLl9oYW5kbGVycy5mb3JFYWNoKGhhbmRsZXIgPT4ge1xuICAgICAgaGFuZGxlci5lbGVtLm9uZHJhZ3N0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH07XG4gICAgICBoYW5kbGVyLmVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5kcmFnQW5kRHJvcC5iaW5kKHRoaXMpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2xpZGVySW5pdCgpIHtcbiAgICB0aGlzLl9zbGlkZXJCb2R5LmNsYXNzTGlzdC5hZGQoJ3NsaWRlckJvZHknKTtcbiAgICB0aGlzLl9wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5fc2xpZGVyQm9keSk7XG4gICAgdGhpcy5zZXRPcmllbnRhdGlvbigpO1xuICAgIHRoaXMuc2V0SGFuZGxlcnMoKTtcbiAgICB0aGlzLnNldEhhbmRsZXJQb3NpdGlvbigpO1xuICB9XG5cbiAgdXBkYXRlKHZhbHVlRGF0YTogc2xpZGVyT3B0aW9ucykge1xuICAgIHRoaXMuX21pbiA9IHZhbHVlRGF0YS5taW4gPyB2YWx1ZURhdGEubWluIDogdGhpcy5fbWluO1xuICAgIHRoaXMuX21heCA9IHZhbHVlRGF0YS5tYXggPyB2YWx1ZURhdGEubWF4IDogdGhpcy5fbWF4O1xuICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlRGF0YS52YWx1ZXMgPyB2YWx1ZURhdGEudmFsdWVzIDogdGhpcy5fdmFsdWVzO1xuICAgIHRoaXMuX2lzVmVydGljYWwgPSB2YWx1ZURhdGEuaXNWZXJ0aWNhbCAhPT0gdW5kZWZpbmVkID8gdmFsdWVEYXRhLmlzVmVydGljYWwgOiB0aGlzLl9pc1ZlcnRpY2FsO1xuICAgIHRoaXMuX2hhc1JhbmdlID0gdmFsdWVEYXRhLmhhc1JhbmdlICE9PSB1bmRlZmluZWQgPyB2YWx1ZURhdGEuaGFzUmFuZ2UgOiB0aGlzLl9oYXNSYW5nZTtcbiAgICB0aGlzLl9oYXNMYWJlbHMgPSB2YWx1ZURhdGEuaGFzTGFiZWxzICE9PSB1bmRlZmluZWQgPyB2YWx1ZURhdGEuaGFzTGFiZWxzIDogdGhpcy5faGFzTGFiZWxzO1xuXG4gICAgdGhpcy5zZXRPcmllbnRhdGlvbigpO1xuICAgIHRoaXMuc2V0SGFuZGxlclBvc2l0aW9uKCk7XG5cbiAgICB0aGlzLl9oYW5kbGVycy5mb3JFYWNoKChoYW5kbGVyLCBpbmRleCkgPT5cbiAgICAgIGhhbmRsZXIudXBkYXRlTGFiZWwodGhpcy5faGFzTGFiZWxzLCB0aGlzLl92YWx1ZXNbaW5kZXhdKSxcbiAgICApO1xuICAgIHRoaXMudXBkYXRlSGFuZGxlcnNBbW91bnQodGhpcy5faGFzUmFuZ2UpO1xuICAgIHRoaXMuX3NlbGVjdGVkQXJlYS51cGRhdGVTZWxlY3RlZFJhbmdlKFxuICAgICAgdGhpcy5faGFzUmFuZ2UsXG4gICAgICB0aGlzLl9pc1ZlcnRpY2FsLFxuICAgICAgdGhpcy5faGFuZGxlcnNbMV0uZWxlbSxcbiAgICAgIHRoaXMuX2hhbmRsZXJzWzBdLmVsZW0sXG4gICAgICB0aGlzLl9oYW5kbGVyc1sxXS5sYWJlbEVsZW0sXG4gICAgKTtcbiAgfVxuXG4gIHNldE9yaWVudGF0aW9uKCkge1xuICAgIGlmICh0aGlzLl9pc1ZlcnRpY2FsKSB7XG4gICAgICB0aGlzLl9wYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX2hvcml6b250YWwnKTtcbiAgICAgIHRoaXMuX3BhcmVudC5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfdmVydGljYWwnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlcl92ZXJ0aWNhbCcpO1xuICAgICAgdGhpcy5fcGFyZW50LmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9ob3Jpem9udGFsJyk7XG4gICAgfVxuICB9XG5cbiAgc2V0SGFuZGxlcnMoKSB7XG4gICAgdGhpcy5faGFuZGxlcnMucHVzaChuZXcgSGFuZGxlclZpZXcodGhpcy5fc2xpZGVyQm9keSwgdGhpcy5faGFzTGFiZWxzKSk7XG4gICAgaWYgKHRoaXMuX2hhc1JhbmdlKSB7XG4gICAgICB0aGlzLl9oYW5kbGVycy5wdXNoKG5ldyBIYW5kbGVyVmlldyh0aGlzLl9zbGlkZXJCb2R5LCB0aGlzLl9oYXNMYWJlbHMpKTtcbiAgICAgIHRoaXMuX2hhbmRsZXJzWzBdLmVsZW0uaWQgPSAnaGFuZGxlcl9taW4nO1xuICAgICAgdGhpcy5faGFuZGxlcnNbMV0uZWxlbS5pZCA9ICdoYW5kbGVyX21heCc7XG4gICAgfVxuICB9XG5cbiAgZ2V0SGFuZGxlcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZXJzO1xuICB9XG5cbiAgc2V0SGFuZGxlclBvc2l0aW9uKCkge1xuICAgIHRoaXMuX2hhbmRsZXJzLmZvckVhY2goKGhhbmRsZXIsIGluZGV4KSA9PlxuICAgICAgaGFuZGxlci5zZXRQb3NpdGlvbih0aGlzLl92YWx1ZXNbaW5kZXhdLCB0aGlzLl9taW4sIHRoaXMuX21heCwgdGhpcy5faXNWZXJ0aWNhbCksXG4gICAgKTtcbiAgfVxuICB1cGRhdGVIYW5kbGVyc0Ftb3VudChyYW5nZTogYm9vbGVhbikge1xuICAgIGlmICghcmFuZ2UpIHtcbiAgICAgIHRoaXMuX2hhbmRsZXJzWzFdLmVsZW0ucmVtb3ZlKCk7XG4gICAgICB0aGlzLl9oYW5kbGVyc1sxXS5sYWJlbEVsZW0/LnJlbW92ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oYW5kbGVyc1swXS5lbGVtLmFmdGVyKHRoaXMuX2hhbmRsZXJzWzFdLmVsZW0pO1xuICAgICAgaWYgKHRoaXMuX2hhbmRsZXJzWzFdLmxhYmVsRWxlbSkgdGhpcy5faGFuZGxlcnNbMV0uZWxlbS5iZWZvcmUodGhpcy5faGFuZGxlcnNbMV0ubGFiZWxFbGVtKTtcbiAgICB9XG4gIH1cblxuICBnZXRDb29yZHMoZWxlbTogSFRNTEVsZW1lbnQpIHtcbiAgICBjb25zdCBib3ggPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGlmICh0aGlzLl9pc1ZlcnRpY2FsKSB7XG4gICAgICByZXR1cm4gYm94LmJvdHRvbSArIHBhZ2VZT2Zmc2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYm94LmxlZnQgKyBwYWdlWE9mZnNldDtcbiAgICB9XG4gIH1cbiAgZHJhZ0FuZERyb3AoZTogTW91c2VFdmVudCkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICB0aGlzLl9oYW5kbGVyVGFyZ2V0SWQgPSB0YXJnZXQuaWQ7XG4gICAgdGhpcy5fbW91c2VNb3ZlID0gdGhpcy5vbk1vdXNlTW92ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX21vdXNlVXAgPSB0aGlzLm9uTW91c2VVcC5iaW5kKHRoaXMpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX21vdXNlTW92ZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX21vdXNlVXApO1xuICB9XG5cbiAgb25Nb3VzZU1vdmUoZTogTW91c2VFdmVudCkge1xuICAgIGlmICh0aGlzLl9pc1ZlcnRpY2FsKSB7XG4gICAgICB0aGlzLm1vdmVBdChlLnBhZ2VZLCB0aGlzLl9oYW5kbGVyVGFyZ2V0SWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vdmVBdChlLnBhZ2VYLCB0aGlzLl9oYW5kbGVyVGFyZ2V0SWQpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVBdChjb29yZGluYXRlOiBudW1iZXIsIHRhcmdldElkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzbGlkZXJDb29yZCA9IHRoaXMuZ2V0Q29vcmRzKHRoaXMuX3NsaWRlckJvZHkpO1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5faXNWZXJ0aWNhbFxuICAgICAgPyAoKHNsaWRlckNvb3JkIC0gY29vcmRpbmF0ZSkgLyB0aGlzLl9zbGlkZXJCb2R5Lm9mZnNldEhlaWdodCkgKiAodGhpcy5fbWF4IC0gdGhpcy5fbWluKSArXG4gICAgICAgIHRoaXMuX21pblxuICAgICAgOiAoKGNvb3JkaW5hdGUgLSBzbGlkZXJDb29yZCkgLyB0aGlzLl9zbGlkZXJCb2R5Lm9mZnNldFdpZHRoKSAqICh0aGlzLl9tYXggLSB0aGlzLl9taW4pICtcbiAgICAgICAgdGhpcy5fbWluO1xuICAgIGlmICghdGFyZ2V0SWQgfHwgdGFyZ2V0SWQgPT09ICdoYW5kbGVyX21pbicpIHtcbiAgICAgIHRoaXMub2JzZXJ2ZXIuYnJvYWRjYXN0KHtcbiAgICAgICAgdmFsdWVzOiBbdmFsdWUsIHRoaXMuX3ZhbHVlc1sxXV0sXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vYnNlcnZlci5icm9hZGNhc3Qoe1xuICAgICAgICB2YWx1ZXM6IFt0aGlzLl92YWx1ZXNbMF0sIHZhbHVlXSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uTW91c2VVcCgpIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9tb3VzZU1vdmUpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uTW91c2VVcCk7XG4gIH1cbn1cblxuZXhwb3J0IHsgTWFpblZpZXcgfTtcbiIsImNsYXNzIFNlbGVjdGVkQXJlYSB7XG4gIHByaXZhdGUgX3NlbGVjdGVkUmFuZ2U6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9wYXJlbnQ6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHBhcmVudDogSFRNTEVsZW1lbnQsXG4gICAgcmFuZ2U6IGJvb2xlYW4sXG4gICAgdmVydGljYWw6IGJvb2xlYW4sXG4gICAgaGFuZGxlck1pbjogSFRNTEVsZW1lbnQsXG4gICAgaGFuZGxlck1heDogSFRNTEVsZW1lbnQsXG4gICkge1xuICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcbiAgICB0aGlzLl9zZWxlY3RlZFJhbmdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fcGFyZW50LmFwcGVuZCh0aGlzLl9zZWxlY3RlZFJhbmdlKTtcbiAgICBpZiAoIXJhbmdlKSB7XG4gICAgICB0aGlzLl9zZWxlY3RlZFJhbmdlLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkUmFuZ2UnKTtcbiAgICAgIHRoaXMuc2V0UG9zaXRpb25TaW5nbGUodmVydGljYWwsIGhhbmRsZXJNaW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZWxlY3RlZFJhbmdlLmNsYXNzTGlzdC5hZGQoJ3JhbmdlX2JldHdlZW4nKTtcbiAgICAgIHRoaXMuc2V0UG9zaXRpb25SYW5nZSh2ZXJ0aWNhbCwgaGFuZGxlck1heCwgaGFuZGxlck1pbik7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlU2VsZWN0ZWRSYW5nZShcbiAgICByYW5nZTogYm9vbGVhbixcbiAgICB2ZXJ0aWNhbDogYm9vbGVhbixcbiAgICBoYW5kbGVyTWF4OiBIVE1MRWxlbWVudCxcbiAgICBoYW5kbGVyTWluOiBIVE1MRWxlbWVudCxcbiAgICBsYWJlbE1heDogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQsXG4gICk6IHZvaWQge1xuICAgIGlmICghcmFuZ2UpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGVkUmFuZ2UuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWRSYW5nZScpO1xuICAgICAgdGhpcy5fc2VsZWN0ZWRSYW5nZS5jbGFzc0xpc3QucmVtb3ZlKCdyYW5nZV9iZXR3ZWVuJyk7XG4gICAgICAvL2hhbmRsZXJNYXgucmVtb3ZlKCk7XG4gICAgICAvL2lmIChsYWJlbE1heCkgbGFiZWxNYXgucmVtb3ZlKCk7XG4gICAgICB0aGlzLnNldFBvc2l0aW9uU2luZ2xlKHZlcnRpY2FsLCBoYW5kbGVyTWluKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2VsZWN0ZWRSYW5nZS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZFJhbmdlJyk7XG4gICAgICB0aGlzLl9zZWxlY3RlZFJhbmdlLmNsYXNzTGlzdC5hZGQoJ3JhbmdlX2JldHdlZW4nKTtcbiAgICAgIC8vaGFuZGxlck1pbi5hZnRlcihoYW5kbGVyTWF4KTtcbiAgICAgIC8vIGlmIChsYWJlbE1heCkgaGFuZGxlck1heC5iZWZvcmUobGFiZWxNYXgpO1xuICAgICAgdGhpcy5zZXRQb3NpdGlvblJhbmdlKHZlcnRpY2FsLCBoYW5kbGVyTWF4LCBoYW5kbGVyTWluKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldFBvc2l0aW9uU2luZ2xlKHZlcnRpY2FsOiBib29sZWFuLCBoYW5kbGVyOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIHZlcnRpY2FsXG4gICAgICA/ICh0aGlzLl9zZWxlY3RlZFJhbmdlLnN0eWxlLmhlaWdodCA9XG4gICAgICAgICAgdGhpcy5nZXRDb29yZHModGhpcy5fcGFyZW50LCB2ZXJ0aWNhbCkgLSB0aGlzLmdldENvb3JkcyhoYW5kbGVyLCB2ZXJ0aWNhbCkgKyAncHgnKVxuICAgICAgOiAodGhpcy5fc2VsZWN0ZWRSYW5nZS5zdHlsZS53aWR0aCA9IHRoaXMuZ2V0Q29vcmRzKGhhbmRsZXIsIHZlcnRpY2FsKSArICdweCcpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRQb3NpdGlvblJhbmdlKFxuICAgIHZlcnRpY2FsOiBib29sZWFuLFxuICAgIGhhbmRsZXJNYXg6IEhUTUxFbGVtZW50LFxuICAgIGhhbmRsZXJNaW46IEhUTUxFbGVtZW50LFxuICApOiB2b2lkIHtcbiAgICBjb25zdCBwb3NNaW4gPSB2ZXJ0aWNhbCA/ICdib3R0b20nIDogJ2xlZnQnO1xuICAgIGNvbnN0IGxlbmd0aCA9IHZlcnRpY2FsID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuICAgIHRoaXMuX3NlbGVjdGVkUmFuZ2Uuc3R5bGVbcG9zTWluXSA9IHZlcnRpY2FsXG4gICAgICA/IHRoaXMuZ2V0Q29vcmRzKHRoaXMuX3BhcmVudCwgdmVydGljYWwpIC0gdGhpcy5nZXRDb29yZHMoaGFuZGxlck1pbiwgdmVydGljYWwpICsgJ3B4J1xuICAgICAgOiB0aGlzLmdldENvb3JkcyhoYW5kbGVyTWluLCB2ZXJ0aWNhbCkgKyAncHgnO1xuICAgIHRoaXMuX3NlbGVjdGVkUmFuZ2Uuc3R5bGVbbGVuZ3RoXSA9IHZlcnRpY2FsXG4gICAgICA/IHRoaXMuZ2V0Q29vcmRzKGhhbmRsZXJNaW4sIHZlcnRpY2FsKSAtIHRoaXMuZ2V0Q29vcmRzKGhhbmRsZXJNYXgsIHZlcnRpY2FsKSArICdweCdcbiAgICAgIDogdGhpcy5nZXRDb29yZHMoaGFuZGxlck1heCwgdmVydGljYWwpIC0gdGhpcy5nZXRDb29yZHMoaGFuZGxlck1pbiwgdmVydGljYWwpICsgJ3B4JztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29vcmRzKGVsZW06IEhUTUxFbGVtZW50LCB2ZXJ0aWNhbDogYm9vbGVhbik6IG51bWJlciB7XG4gICAgY29uc3QgYm94ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBpZiAodmVydGljYWwpIHtcbiAgICAgIHJldHVybiBib3guYm90dG9tICsgcGFnZVlPZmZzZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBib3gubGVmdCArIHBhZ2VYT2Zmc2V0O1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyBTZWxlY3RlZEFyZWEgfTtcbiJdLCJzb3VyY2VSb290IjoiIn0=