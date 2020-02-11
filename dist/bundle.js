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
            if (valueData.hasRange !== undefined)
                this._model.hasRange = valueData.hasRange;
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
        this._rangeRadios = [];
        this._hasRange = hasRange;
        this._isVertical = isVertical;
        this.createValueInputs();
        this.createStepInput();
        this.createOrientationRadios();
        this.createRangeRadios();
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
        this._controlPanel.rangeRadios.forEach(radio => radio.addEventListener('change', this.notifyPresenter.bind(this)));
        this.setSliderBody();
        this.setOrientation(this._isVertical);
        this.setHandlers(this._hasRange);
        this.setHandlerPosition(this._values, this._isVertical);
        this.setSelectedRange();
        this.updateSelectedRange();
        this.setOrientationToRadio();
        this.setStepToInput();
        this.setRangeToRadio();
        this._handlers.forEach(handler => handler.elem.addEventListener('mousedown', this.dragAndDrop.bind(this)));
    }
    notifyPresenter() {
        const newValues = this._controlPanel.valueInputs.map(input => parseInt(input.value));
        const newOrientation = this._controlPanel.orientationRadios[0].checked ? true : false;
        const newStep = parseInt(this._controlPanel.stepInput.value);
        const newRange = this._controlPanel.rangeRadios[1].checked ? true : false;
        this.observer.broadcast({
            values: newValues,
            isVertical: newOrientation,
            step: newStep,
            hasRange: newRange,
        });
    }
    update(valueData) {
        this._isVertical = valueData.isVertical !== undefined ? valueData.isVertical : this._isVertical;
        this._hasRange = valueData.hasRange !== undefined ? valueData.hasRange : this._hasRange;
        this._values = valueData.values ? valueData.values : this._values;
        this.setOrientation(this._isVertical);
        this.setHandlerPosition(this._values, this._isVertical);
        this.updateSelectedRange();
        if (valueData.step)
            this._step = valueData.step;
        // this.updateHandlers(this._hasRange);
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
    }
    getHandlers() {
        return this._handlers;
    }
    //не работает
    updateHandlers(hasRange) {
        if (hasRange) {
            this._handlers.push(new _HandlerView__WEBPACK_IMPORTED_MODULE_0__["HandlerView"](this._sliderBody, this._min, this._max));
            this.setHandlerPosition(this._values, this._isVertical);
        }
        else {
            this._handlers.pop();
            this.setHandlerPosition(this._values, this._isVertical);
        }
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
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
    }
    onMouseMove(e) {
        if (this._isVertical) {
            this.moveAt(e.pageY, e.target);
        }
        else {
            this.moveAt(e.pageX, e.target);
        }
    }
    moveAt(coordinate, target) {
        const sliderCoord = this.getCoords(this._sliderBody);
        const value = this._isVertical
            ? Math.round(((sliderCoord - coordinate) / this._sliderBody.offsetHeight) * this._max)
            : Math.round(((coordinate - sliderCoord) / this._sliderBody.offsetWidth) * this._max);
        if (target.id == 'handler_min') {
            this._controlPanel.valueInputs[0].value = value.toString();
            this.observer.broadcast({
                values: [value, this._values[1]],
            });
        }
        else {
            this._controlPanel.valueInputs[1].value = value.toString();
            this.observer.broadcast({
                values: [this._values[0], value],
            });
        }
    }
    onMouseUp() {
        document.removeEventListener('mousemove', this.onMouseMove.bind(this));
    }
}



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9tb2RlbC9NYWluTW9kZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVsL2hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29ic2VydmVyL29ic2VydmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9wcmVzZW50ZXIvRmFjYWRlLnRzIiwid2VicGFjazovLy8uL3NyYy9wcmVzZW50ZXIvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy92aWV3L0NvbnRyb2xQYW5lbFZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXcvSGFuZGxlclZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXcvTWFpblZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7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LElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUN0RixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDcEQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDbkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVc7Z0JBQ2xELENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSTtnQkFDbEYsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDbEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVc7Z0JBQ2hELENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUk7Z0JBQ3hGLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxD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LFdBQVcsR0FBRyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdEYsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RixJQUFJLE1BQU0sQ0FBQyxFQUFFLElBQUksYUFBYSxFQUFFO1lBQzlCLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7Z0JBQ3RCLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pDLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzNELElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO2dCQUN0QixNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQzthQUNqQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRCxTQUFTO1FBQ1AsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7Q0FDRjtBQUVtQiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7IEZhY2FkZSB9IGZyb20gJy4vcHJlc2VudGVyL0ZhY2FkZSc7XG5cbiQoZnVuY3Rpb24oKSB7XG4gICQuZm4uc2xpZGVyID0gZnVuY3Rpb24ob3B0aW9ucyk6IEZhY2FkZSB7XG4gICAgY29uc3QgZmFjYWRlOiBGYWNhZGUgPSBuZXcgRmFjYWRlKHRoaXMuZ2V0KDApLCBvcHRpb25zKTtcbiAgICByZXR1cm4gZmFjYWRlO1xuICB9O1xufSk7XG4iLCJpbXBvcnQgeyBFdmVudE9ic2VydmVyIH0gZnJvbSAnLi4vb2JzZXJ2ZXIvb2JzZXJ2ZXInO1xuaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gJy4vaGFuZGxlcic7XG5pbXBvcnQgeyBzbGlkZXJPcHRpb25zIH0gZnJvbSAnLi9zbGlkZXJPcHRpb25zJztcblxuY2xhc3MgTWFpbk1vZGVsIHtcbiAgcHVibGljIG9ic2VydmVyOiBFdmVudE9ic2VydmVyO1xuICBwcml2YXRlIF9taW4gPSAwO1xuICBwcml2YXRlIF9tYXggPSAxMDA7XG4gIHByaXZhdGUgX3N0ZXAgPSAxO1xuICBwcml2YXRlIF92YWx1ZXMgPSBbMTAsIDIwXTtcbiAgcHJpdmF0ZSBfaXNWZXJ0aWNhbCA9IGZhbHNlO1xuICBwcml2YXRlIF9oYXNSYW5nZSA9IHRydWU7XG4gIHByaXZhdGUgX2hhc0xhYmVscyA9IGZhbHNlO1xuICBwcml2YXRlIF9oYW5kbGVyczogSGFuZGxlcltdID0gW107XG4gIGNvbnN0cnVjdG9yKHNsaWRlck9wdGlvbnM6IHNsaWRlck9wdGlvbnMpIHtcbiAgICB0aGlzLm9ic2VydmVyID0gbmV3IEV2ZW50T2JzZXJ2ZXIoKTtcbiAgICB0aGlzLl9taW4gPSBzbGlkZXJPcHRpb25zLm1pbiA/IHNsaWRlck9wdGlvbnMubWluIDogMDtcbiAgICB0aGlzLl9tYXggPSBzbGlkZXJPcHRpb25zLm1heCA/IHNsaWRlck9wdGlvbnMubWF4IDogdGhpcy5fbWF4O1xuICAgIHRoaXMuX3N0ZXAgPSBzbGlkZXJPcHRpb25zLnN0ZXAgPyBzbGlkZXJPcHRpb25zLnN0ZXAgOiB0aGlzLl9zdGVwO1xuICAgIHRoaXMuX3ZhbHVlcyA9IHNsaWRlck9wdGlvbnMudmFsdWVzID8gc2xpZGVyT3B0aW9ucy52YWx1ZXMgOiB0aGlzLl92YWx1ZXM7XG4gICAgdGhpcy5faGFzUmFuZ2UgPSBzbGlkZXJPcHRpb25zLmhhc1JhbmdlID8gc2xpZGVyT3B0aW9ucy5oYXNSYW5nZSA6IHRoaXMuX2hhc1JhbmdlO1xuICAgIHRoaXMuX2lzVmVydGljYWwgPSBzbGlkZXJPcHRpb25zLmlzVmVydGljYWwgPyBzbGlkZXJPcHRpb25zLmlzVmVydGljYWwgOiB0aGlzLl9pc1ZlcnRpY2FsO1xuICAgIHRoaXMuX2hhc0xhYmVscyA9IHNsaWRlck9wdGlvbnMuaGFzTGFiZWxzID8gc2xpZGVyT3B0aW9ucy5oYXNMYWJlbHMgOiB0aGlzLl9oYXNMYWJlbHM7XG4gIH1cblxuICBub3RpZnlQcmVzZW50ZXIodmFsdWVEYXRhOiBzbGlkZXJPcHRpb25zKSB7XG4gICAgdGhpcy5vYnNlcnZlci5icm9hZGNhc3QodmFsdWVEYXRhKTtcbiAgfVxuXG4gIGdldCBtaW4oKTogbnVtYmVyIHtcbiAgICB0aGlzLl9taW4gPSBNYXRoLnJvdW5kKHRoaXMuX21pbiAvIHRoaXMuX3N0ZXApICogdGhpcy5fc3RlcDtcbiAgICByZXR1cm4gdGhpcy5fbWluO1xuICB9XG5cbiAgc2V0IG1pbihtaW46IG51bWJlcikge1xuICAgIHRoaXMuX21pbiA9IG1pbjtcbiAgfVxuXG4gIGdldCBtYXgoKTogbnVtYmVyIHtcbiAgICB0aGlzLl9tYXggPSBNYXRoLnJvdW5kKHRoaXMuX21heCAvIHRoaXMuX3N0ZXApICogdGhpcy5fc3RlcDtcbiAgICByZXR1cm4gdGhpcy5fbWF4O1xuICB9XG5cbiAgc2V0IG1heChtYXg6IG51bWJlcikge1xuICAgIHRoaXMuX21heCA9IG1heDtcbiAgfVxuXG4gIGdldCBzdGVwKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3N0ZXA7XG4gIH1cblxuICBzZXQgc3RlcChzdGVwOiBudW1iZXIpIHtcbiAgICB0aGlzLl9zdGVwID0gc3RlcDtcbiAgICB0aGlzLm5vdGlmeVByZXNlbnRlcih7XG4gICAgICBzdGVwOiB0aGlzLl9zdGVwLFxuICAgICAgdmFsdWVzOiB0aGlzLnJhbmdlVmFsdWUsXG4gICAgfSk7XG4gIH1cblxuICBnZXQgc2luZ2xlVmFsdWUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jYWxjVmFsdWVzKHRoaXMuX3ZhbHVlcylbMF07XG4gIH1cblxuICBzZXQgc2luZ2xlVmFsdWUodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3ZhbHVlc1swXSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHJhbmdlVmFsdWUoKTogbnVtYmVyW10ge1xuICAgIHJldHVybiB0aGlzLmNhbGNWYWx1ZXModGhpcy5fdmFsdWVzKTtcbiAgfVxuXG4gIHNldCByYW5nZVZhbHVlKHZhbHVlczogbnVtYmVyW10pIHtcbiAgICB0aGlzLl92YWx1ZXMgPSB2YWx1ZXM7XG4gICAgdGhpcy5ub3RpZnlQcmVzZW50ZXIoe1xuICAgICAgdmFsdWVzOiB0aGlzLmNhbGNWYWx1ZXModGhpcy5fdmFsdWVzKSxcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBpc1ZlcnRpY2FsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc1ZlcnRpY2FsO1xuICB9XG5cbiAgc2V0IGlzVmVydGljYWwodmVydGljYWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pc1ZlcnRpY2FsID0gdmVydGljYWw7XG4gICAgdGhpcy5ub3RpZnlQcmVzZW50ZXIoe1xuICAgICAgdmFsdWVzOiB0aGlzLnJhbmdlVmFsdWUsXG4gICAgICBpc1ZlcnRpY2FsOiB0aGlzLl9pc1ZlcnRpY2FsLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0IGhhc1JhbmdlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oYXNSYW5nZTtcbiAgfVxuXG4gIHNldCBoYXNSYW5nZShyYW5nZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2hhc1JhbmdlID0gcmFuZ2U7XG4gICAgdGhpcy5ub3RpZnlQcmVzZW50ZXIoe1xuICAgICAgdmFsdWVzOiB0aGlzLnJhbmdlVmFsdWUsXG4gICAgICBoYXNSYW5nZTogdGhpcy5faGFzUmFuZ2UsXG4gICAgfSk7XG4gIH1cblxuICAvL2NoZWNrIHRoYXQgdmFsdWVzIG9mIGhhbmRsZXJzIGFyZSB3aXRoaW4gbWluIGFuZCBtYXhcbiAgLy9jaGVjayB0aGF0IHZhbHVlIDAgaXMgbGVzcyB0aGFuIHZhbHVlIDEgZm9yIHJhbmdlXG4gIGNhbGNWYWx1ZXModmFsdWVzOiBudW1iZXJbXSk6IG51bWJlcltdIHtcbiAgICB2YWx1ZXMgPSB2YWx1ZXMubWFwKHZhbHVlID0+IE1hdGgucm91bmQodmFsdWUgLyB0aGlzLl9zdGVwKSAqIHRoaXMuX3N0ZXApO1xuICAgIGlmICh2YWx1ZXNbMF0gPiB2YWx1ZXNbMV0pIFt2YWx1ZXNbMF0sIHZhbHVlc1sxXV0gPSBbdmFsdWVzWzFdLCB2YWx1ZXNbMF1dO1xuICAgIHZhbHVlcyA9IHZhbHVlcy5tYXAodmFsdWUgPT5cbiAgICAgIHZhbHVlIDwgdGhpcy5fbWluID8gdGhpcy5fbWluIDogdmFsdWUgPiB0aGlzLl9tYXggPyB0aGlzLl9tYXggOiB2YWx1ZSxcbiAgICApO1xuXG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfVxuICAvL2NyZWF0ZSBoYW5kbGVycyBkZXBlbmRpbmcgb24gcmFuZ2VcbiAgc2V0SGFuZGxlcnModmFsdWVzOiBudW1iZXJbXSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9oYXNSYW5nZSkge1xuICAgICAgdGhpcy5faGFuZGxlcnMgPSBbbmV3IEhhbmRsZXIodmFsdWVzWzBdKSwgbmV3IEhhbmRsZXIodmFsdWVzWzFdKV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hhbmRsZXJzID0gW25ldyBIYW5kbGVyKHZhbHVlc1swXSldO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyBNYWluTW9kZWwgfTtcbiIsImNsYXNzIEhhbmRsZXIge1xuICBwcml2YXRlIF9wb3NpdGlvbjogbnVtYmVyO1xuICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgdGhpcy5fcG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgfVxuXG4gIGdldCBwb3NpdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbjtcbiAgfVxuXG4gIHNldCBwb3NpdGlvbih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fcG9zaXRpb24gPSB2YWx1ZTtcbiAgfVxufVxuXG5leHBvcnQgeyBIYW5kbGVyIH07XG4iLCJjbGFzcyBFdmVudE9ic2VydmVyIHtcbiAgcHJpdmF0ZSBfb2JzZXJ2ZXJzOiBGdW5jdGlvbltdO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9vYnNlcnZlcnMgPSBbXTtcbiAgfVxuICBzdWJzY3JpYmUoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fb2JzZXJ2ZXJzLnB1c2goZm4pO1xuICB9XG4gIHVuc3Vic2NyaWJlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMuX29ic2VydmVycyA9IHRoaXMuX29ic2VydmVycy5maWx0ZXIoc3Vic2NyaWJlciA9PiBzdWJzY3JpYmVyICE9PSBmbik7XG4gIH1cbiAgYnJvYWRjYXN0KGRhdGE6IG9iamVjdCk6IHZvaWQge1xuICAgIHRoaXMuX29ic2VydmVycy5mb3JFYWNoKHN1YnNjcmliZXIgPT4gc3Vic2NyaWJlcihkYXRhKSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgRXZlbnRPYnNlcnZlciB9O1xuIiwiaW1wb3J0IHsgTWFpbk1vZGVsIH0gZnJvbSAnLi4vbW9kZWwvTWFpbk1vZGVsJztcbmltcG9ydCB7IFByZXNlbnRlciB9IGZyb20gJy4vUHJlc2VudGVyJztcbmltcG9ydCB7IHNsaWRlck9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbC9zbGlkZXJPcHRpb25zJztcblxuY2xhc3MgRmFjYWRlIHtcbiAgcHJpdmF0ZSBfbW9kZWw6IE1haW5Nb2RlbDtcbiAgcHJpdmF0ZSBfcHJlc2VudGVyOiBQcmVzZW50ZXI7XG5cbiAgY29uc3RydWN0b3IocGFyZW50OiBIVE1MRWxlbWVudCwgc2xpZGVyT3B0aW9uczogc2xpZGVyT3B0aW9ucykge1xuICAgIHRoaXMuX21vZGVsID0gbmV3IE1haW5Nb2RlbChzbGlkZXJPcHRpb25zKTtcbiAgICB0aGlzLl9wcmVzZW50ZXIgPSBuZXcgUHJlc2VudGVyKHBhcmVudCwgdGhpcy5fbW9kZWwpO1xuICAgIHRoaXMuX3ByZXNlbnRlci5zZXRWYWx1ZXNUb0lucHV0cygpO1xuICAgIHRoaXMuX3ByZXNlbnRlci5zZXRTdGVwVG9JbnB1dCgpO1xuICB9XG5cbiAgZ2V0IHNpbmdsZVZhbHVlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLnNpbmdsZVZhbHVlO1xuICB9XG5cbiAgc2V0IHNpbmdsZVZhbHVlKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9tb2RlbC5zaW5nbGVWYWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHJhbmdlVmFsdWUoKTogbnVtYmVyW10ge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5yYW5nZVZhbHVlO1xuICB9XG5cbiAgc2V0IHJhbmdlVmFsdWUodmFsdWU6IG51bWJlcltdKSB7XG4gICAgdGhpcy5fbW9kZWwucmFuZ2VWYWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHN0ZXAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuc3RlcDtcbiAgfVxuXG4gIHNldCBzdGVwKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9tb2RlbC5zdGVwID0gdmFsdWU7XG4gIH1cblxuICBnZXQgaXNWZXJ0aWNhbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuaXNWZXJ0aWNhbDtcbiAgfVxuXG4gIHNldCBpc1ZlcnRpY2FsKHZlcnRpY2FsOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbW9kZWwuaXNWZXJ0aWNhbCA9IHZlcnRpY2FsO1xuICB9XG59XG5cbmV4cG9ydCB7IEZhY2FkZSB9O1xuIiwiaW1wb3J0IHsgTWFpbk1vZGVsIH0gZnJvbSAnLi4vbW9kZWwvTWFpbk1vZGVsJztcbmltcG9ydCB7IE1haW5WaWV3IH0gZnJvbSAnLi4vdmlldy9NYWluVmlldyc7XG5pbXBvcnQgeyBzbGlkZXJPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWwvc2xpZGVyT3B0aW9ucyc7XG5cbmNsYXNzIFByZXNlbnRlciB7XG4gIHByaXZhdGUgX21vZGVsOiBNYWluTW9kZWw7XG4gIHByaXZhdGUgX3ZpZXc6IE1haW5WaWV3O1xuICBwcml2YXRlIF92YWx1ZXM6IG51bWJlcltdO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmVudDogSFRNTEVsZW1lbnQsIG1vZGVsOiBNYWluTW9kZWwpIHtcbiAgICB0aGlzLl9tb2RlbCA9IG1vZGVsO1xuICAgIHRoaXMuX3ZhbHVlcyA9IHRoaXMuX21vZGVsLnJhbmdlVmFsdWU7XG4gICAgdGhpcy5fdmlldyA9IG5ldyBNYWluVmlldyhcbiAgICAgIHBhcmVudCxcbiAgICAgIHRoaXMuX21vZGVsLmhhc1JhbmdlLFxuICAgICAgdGhpcy5fbW9kZWwuaXNWZXJ0aWNhbCxcbiAgICAgIHRoaXMuX21vZGVsLm1pbixcbiAgICAgIHRoaXMuX21vZGVsLm1heCxcbiAgICAgIHRoaXMuX3ZhbHVlcyxcbiAgICAgIHRoaXMuX21vZGVsLnN0ZXAsXG4gICAgKTtcbiAgICB0aGlzLnVwZGF0ZU1vZGVsKCk7XG4gICAgdGhpcy51cGRhdGVWaWV3KCk7XG4gIH1cblxuICB1cGRhdGVNb2RlbCgpIHtcbiAgICB0aGlzLl92aWV3Lm9ic2VydmVyLnN1YnNjcmliZSgodmFsdWVEYXRhOiBzbGlkZXJPcHRpb25zKSA9PiB7XG4gICAgICBpZiAodmFsdWVEYXRhLnZhbHVlcykgdGhpcy5fbW9kZWwucmFuZ2VWYWx1ZSA9IHZhbHVlRGF0YS52YWx1ZXM7XG4gICAgICBpZiAodmFsdWVEYXRhLmlzVmVydGljYWwgIT09IHVuZGVmaW5lZCkgdGhpcy5fbW9kZWwuaXNWZXJ0aWNhbCA9IHZhbHVlRGF0YS5pc1ZlcnRpY2FsO1xuICAgICAgaWYgKHZhbHVlRGF0YS5zdGVwKSB0aGlzLl9tb2RlbC5zdGVwID0gdmFsdWVEYXRhLnN0ZXA7XG4gICAgICBpZiAodmFsdWVEYXRhLmhhc1JhbmdlICE9PSB1bmRlZmluZWQpIHRoaXMuX21vZGVsLmhhc1JhbmdlID0gdmFsdWVEYXRhLmhhc1JhbmdlO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlVmlldygpIHtcbiAgICB0aGlzLl9tb2RlbC5vYnNlcnZlci5zdWJzY3JpYmUoKHZhbHVlRGF0YTogc2xpZGVyT3B0aW9ucykgPT4ge1xuICAgICAgdGhpcy5fdmlldy51cGRhdGUodmFsdWVEYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldFZhbHVlc1RvSW5wdXRzKCkge1xuICAgIHRoaXMuX3ZpZXcuc2V0VmFsdWVzVG9JbnB1dHMoKTtcbiAgfVxuXG4gIHNldFN0ZXBUb0lucHV0KCkge1xuICAgIHRoaXMuX3ZpZXcuc2V0U3RlcFRvSW5wdXQoKTtcbiAgfVxufVxuXG5leHBvcnQgeyBQcmVzZW50ZXIgfTtcbiIsImNsYXNzIENvbnRyb2xQYW5lbCB7XG4gIHByaXZhdGUgX3BhcmVudDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX2NvbnRyb2xQYW5lbDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX3ZhbHVlSW5wdXRzOiBIVE1MSW5wdXRFbGVtZW50W107XG4gIHByaXZhdGUgX3N0ZXBJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbiAgcHJpdmF0ZSBfb3JpZW50YXRpb25SYWRpb3M6IEhUTUxJbnB1dEVsZW1lbnRbXTtcbiAgcHJpdmF0ZSBfcmFuZ2VSYWRpb3M6IEhUTUxJbnB1dEVsZW1lbnRbXTtcbiAgcHJpdmF0ZSBfaGFzUmFuZ2U6IGJvb2xlYW47XG4gIHByaXZhdGUgX2lzVmVydGljYWw6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocGFyZW50OiBIVE1MRWxlbWVudCwgaGFzUmFuZ2U6IGJvb2xlYW4sIGlzVmVydGljYWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLmNsYXNzTGlzdC5hZGQoJ2NvbnRyb2xQYW5lbCcpO1xuICAgIHRoaXMuX3BhcmVudC5hZnRlcih0aGlzLl9jb250cm9sUGFuZWwpO1xuICAgIHRoaXMuX3ZhbHVlSW5wdXRzID0gW107XG4gICAgdGhpcy5fc3RlcElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB0aGlzLl9vcmllbnRhdGlvblJhZGlvcyA9IFtdO1xuICAgIHRoaXMuX3JhbmdlUmFkaW9zID0gW107XG4gICAgdGhpcy5faGFzUmFuZ2UgPSBoYXNSYW5nZTtcbiAgICB0aGlzLl9pc1ZlcnRpY2FsID0gaXNWZXJ0aWNhbDtcbiAgICB0aGlzLmNyZWF0ZVZhbHVlSW5wdXRzKCk7XG4gICAgdGhpcy5jcmVhdGVTdGVwSW5wdXQoKTtcbiAgICB0aGlzLmNyZWF0ZU9yaWVudGF0aW9uUmFkaW9zKCk7XG4gICAgdGhpcy5jcmVhdGVSYW5nZVJhZGlvcygpO1xuICB9XG4gIGNyZWF0ZVZhbHVlSW5wdXRzKCkge1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQodGl0bGUpO1xuICAgIHRpdGxlLmlubmVyVGV4dCA9ICfQl9C90LDRh9C10L3QuNC1INCx0LXQs9GD0L3QutC+0LInO1xuICAgIGNvbnN0IGlucHV0U2luZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBpbnB1dFNpbmdsZS5jbGFzc0xpc3QuYWRkKCdoYW5kbGVyVmFsdWUnKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKGlucHV0U2luZ2xlKTtcbiAgICB0aGlzLl92YWx1ZUlucHV0cy5wdXNoKGlucHV0U2luZ2xlKTtcbiAgICBpZiAodGhpcy5faGFzUmFuZ2UpIHtcbiAgICAgIGNvbnN0IGlucHV0TWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhhbmRsZXJWYWx1ZScpO1xuICAgICAgaWYgKGlucHV0TWluKSBpbnB1dE1pbi5jbGFzc0xpc3QuYWRkKCd2YWx1ZV9taW4nKTtcbiAgICAgIGNvbnN0IGlucHV0TWF4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgIGlucHV0TWF4LmNsYXNzTGlzdC5hZGQoJ2hhbmRsZXJWYWx1ZScsICd2YWx1ZV9tYXgnKTtcbiAgICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQoaW5wdXRNYXgpO1xuICAgICAgdGhpcy5fdmFsdWVJbnB1dHMucHVzaChpbnB1dE1heCk7XG4gICAgfVxuICB9XG4gIGdldCB2YWx1ZUlucHV0cygpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWVJbnB1dHM7XG4gIH1cblxuICBjcmVhdGVTdGVwSW5wdXQoKSB7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZCh0aXRsZSk7XG4gICAgdGl0bGUuaW5uZXJUZXh0ID0gJ9CX0L3QsNGH0LXQvdC40LUg0YjQsNCz0LAnO1xuICAgIHRoaXMuX3N0ZXBJbnB1dC5jbGFzc0xpc3QuYWRkKCdzdGVwVmFsdWUnKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKHRoaXMuX3N0ZXBJbnB1dCk7XG4gIH1cblxuICBnZXQgc3RlcElucHV0KCkge1xuICAgIHJldHVybiB0aGlzLl9zdGVwSW5wdXQ7XG4gIH1cblxuICBjcmVhdGVPcmllbnRhdGlvblJhZGlvcygpIHtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuYXBwZW5kKHRpdGxlKTtcbiAgICB0aXRsZS5pbm5lclRleHQgPSAn0JLQtdGA0YLQuNC60LDQu9GM0L3Ri9C5L9Cz0L7RgNC40LfQvtC90YLQsNC70YzQvdGL0LknO1xuICAgIGNvbnN0IHJhZGlvVmVydGljYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHJhZGlvVmVydGljYWwuaWQgPSAncmFkaW9fdmVydGljYWwnO1xuICAgIGNvbnN0IHJhZGlvSG9yaXpvbnRhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgcmFkaW9Ib3Jpem9udGFsLmlkID0gJ3JhZGlvX2hvcml6b250YWwnO1xuICAgIHRoaXMuX29yaWVudGF0aW9uUmFkaW9zID0gW3JhZGlvVmVydGljYWwsIHJhZGlvSG9yaXpvbnRhbF07XG4gICAgdGhpcy5fb3JpZW50YXRpb25SYWRpb3MuZm9yRWFjaChyYWRpbyA9PiB7XG4gICAgICByYWRpby50eXBlID0gJ3JhZGlvJztcbiAgICAgIHJhZGlvLm5hbWUgPSAnb3JpZW50YXRpb24nO1xuICAgICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZChyYWRpbyk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgb3JpZW50YXRpb25SYWRpb3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX29yaWVudGF0aW9uUmFkaW9zO1xuICB9XG5cbiAgY3JlYXRlUmFuZ2VSYWRpb3MoKSB7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLmFwcGVuZCh0aXRsZSk7XG4gICAgdGl0bGUuaW5uZXJUZXh0ID0gJ9Ce0LTQuNC90L7Rh9C90L7QtS/QuNC90YLQtdGA0LLQsNC7JztcbiAgICBjb25zdCByYWRpb1NpbmdsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgcmFkaW9TaW5nbGUuaWQgPSAncmFkaW9fc2luZ2xlJztcbiAgICBjb25zdCByYWRpb0RvdWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgcmFkaW9Eb3VibGUuaWQgPSAncmFkaW9fZG91YmxlJztcbiAgICB0aGlzLl9yYW5nZVJhZGlvcyA9IFtyYWRpb1NpbmdsZSwgcmFkaW9Eb3VibGVdO1xuICAgIHRoaXMuX3JhbmdlUmFkaW9zLmZvckVhY2gocmFkaW8gPT4ge1xuICAgICAgcmFkaW8udHlwZSA9ICdyYWRpbyc7XG4gICAgICByYWRpby5uYW1lID0gJ3JhbmdlJztcbiAgICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5hcHBlbmQocmFkaW8pO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0IHJhbmdlUmFkaW9zKCkge1xuICAgIHJldHVybiB0aGlzLl9yYW5nZVJhZGlvcztcbiAgfVxufVxuXG5leHBvcnQgeyBDb250cm9sUGFuZWwgfTtcbiIsImNsYXNzIEhhbmRsZXJWaWV3IHtcbiAgcHJpdmF0ZSBfaGFuZGxlcjogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX3BhcmVudDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX21pbkxpbWl0OiBudW1iZXI7XG4gIHByaXZhdGUgX21heExpbWl0OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IocGFyZW50OiBIVE1MRWxlbWVudCwgbWluTGltaXQ6IG51bWJlciwgbWF4TGltaXQ6IG51bWJlcikge1xuICAgIHRoaXMuX2hhbmRsZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9oYW5kbGVyLmNsYXNzTGlzdC5hZGQoJ2hhbmRsZXInKTtcbiAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5fcGFyZW50LmFwcGVuZENoaWxkKHRoaXMuX2hhbmRsZXIpO1xuICAgIHRoaXMuX21pbkxpbWl0ID0gbWluTGltaXQ7XG4gICAgdGhpcy5fbWF4TGltaXQgPSBtYXhMaW1pdDtcbiAgfVxuXG4gIHNldFBvc2l0aW9uKHZhbHVlOiBudW1iZXIsIGlzVmVydGljYWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZXNDb3VudCA9IHRoaXMuX21heExpbWl0IC0gdGhpcy5fbWluTGltaXQ7XG4gICAgY29uc3QgcG9zaXRpb25Qcm9wZXJ0eSA9IGlzVmVydGljYWwgPyAnYm90dG9tJyA6ICdsZWZ0JztcbiAgICBjb25zdCBoYW5kbGVyU2l6ZSA9IGlzVmVydGljYWxcbiAgICAgID8gKHRoaXMuX2hhbmRsZXIub2Zmc2V0SGVpZ2h0IC8gdGhpcy5fcGFyZW50Lm9mZnNldEhlaWdodCkgKiAxMDBcbiAgICAgIDogKHRoaXMuX2hhbmRsZXIub2Zmc2V0V2lkdGggLyB0aGlzLl9wYXJlbnQub2Zmc2V0V2lkdGgpICogMTAwO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gKCh2YWx1ZSAtIHRoaXMuX21pbkxpbWl0KSAvIHZhbHVlc0NvdW50KSAqIDEwMCAtIGhhbmRsZXJTaXplIC8gMjtcbiAgICB0aGlzLl9oYW5kbGVyLnN0eWxlW3Bvc2l0aW9uUHJvcGVydHldID0gYCR7cG9zaXRpb259JWA7XG4gIH1cblxuICBnZXQgZWxlbSgpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlcjtcbiAgfVxufVxuXG5leHBvcnQgeyBIYW5kbGVyVmlldyB9O1xuIiwiaW1wb3J0IHsgSGFuZGxlclZpZXcgfSBmcm9tICcuL0hhbmRsZXJWaWV3JztcbmltcG9ydCB7IENvbnRyb2xQYW5lbCB9IGZyb20gJy4vQ29udHJvbFBhbmVsVmlldyc7XG5pbXBvcnQgeyBFdmVudE9ic2VydmVyIH0gZnJvbSAnLi4vb2JzZXJ2ZXIvb2JzZXJ2ZXInO1xuaW1wb3J0IHsgc2xpZGVyT3B0aW9ucyB9IGZyb20gJy4uL21vZGVsL3NsaWRlck9wdGlvbnMnO1xuXG5jbGFzcyBNYWluVmlldyB7XG4gIHB1YmxpYyBvYnNlcnZlcjogRXZlbnRPYnNlcnZlcjtcbiAgcHJpdmF0ZSBfc2xpZGVyQm9keTogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX3BhcmVudDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX3NlbGVjdGVkUmFuZ2U6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9oYW5kbGVyczogSGFuZGxlclZpZXdbXTtcbiAgcHJpdmF0ZSBfbWluOiBudW1iZXI7XG4gIHByaXZhdGUgX21heDogbnVtYmVyO1xuICBwcml2YXRlIF92YWx1ZXM6IG51bWJlcltdO1xuICBwcml2YXRlIF9jb250cm9sUGFuZWw6IENvbnRyb2xQYW5lbDtcbiAgcHJpdmF0ZSBfc3RlcDogbnVtYmVyO1xuICBwcml2YXRlIF9pc1ZlcnRpY2FsOiBib29sZWFuO1xuICBwcml2YXRlIF9oYXNSYW5nZTogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwYXJlbnQ6IEhUTUxFbGVtZW50LFxuICAgIGhhc1JhbmdlOiBib29sZWFuLFxuICAgIGlzVmVydGljYWw6IGJvb2xlYW4sXG4gICAgbWluOiBudW1iZXIsXG4gICAgbWF4OiBudW1iZXIsXG4gICAgdmFsdWVzOiBudW1iZXJbXSxcbiAgICBzdGVwOiBudW1iZXIsXG4gICkge1xuICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgRXZlbnRPYnNlcnZlcigpO1xuICAgIHRoaXMuX21pbiA9IG1pbjtcbiAgICB0aGlzLl9tYXggPSBtYXg7XG4gICAgdGhpcy5fdmFsdWVzID0gdmFsdWVzO1xuICAgIHRoaXMuX3N0ZXAgPSBzdGVwO1xuICAgIHRoaXMuX2lzVmVydGljYWwgPSBpc1ZlcnRpY2FsO1xuICAgIHRoaXMuX2hhc1JhbmdlID0gaGFzUmFuZ2U7XG4gICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgIHRoaXMuX3NsaWRlckJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9zZWxlY3RlZFJhbmdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5faGFuZGxlcnMgPSBbXTtcblxuICAgIHRoaXMuX2NvbnRyb2xQYW5lbCA9IG5ldyBDb250cm9sUGFuZWwodGhpcy5fcGFyZW50LCBoYXNSYW5nZSwgaXNWZXJ0aWNhbCk7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLnZhbHVlSW5wdXRzLmZvckVhY2goaW5wdXQgPT5cbiAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcy5ub3RpZnlQcmVzZW50ZXIuYmluZCh0aGlzKSksXG4gICAgKTtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwuc3RlcElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcy5ub3RpZnlQcmVzZW50ZXIuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLm9yaWVudGF0aW9uUmFkaW9zLmZvckVhY2gocmFkaW8gPT5cbiAgICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMubm90aWZ5UHJlc2VudGVyLmJpbmQodGhpcykpLFxuICAgICk7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLnJhbmdlUmFkaW9zLmZvckVhY2gocmFkaW8gPT5cbiAgICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMubm90aWZ5UHJlc2VudGVyLmJpbmQodGhpcykpLFxuICAgICk7XG5cbiAgICB0aGlzLnNldFNsaWRlckJvZHkoKTtcbiAgICB0aGlzLnNldE9yaWVudGF0aW9uKHRoaXMuX2lzVmVydGljYWwpO1xuICAgIHRoaXMuc2V0SGFuZGxlcnModGhpcy5faGFzUmFuZ2UpO1xuICAgIHRoaXMuc2V0SGFuZGxlclBvc2l0aW9uKHRoaXMuX3ZhbHVlcywgdGhpcy5faXNWZXJ0aWNhbCk7XG4gICAgdGhpcy5zZXRTZWxlY3RlZFJhbmdlKCk7XG4gICAgdGhpcy51cGRhdGVTZWxlY3RlZFJhbmdlKCk7XG4gICAgdGhpcy5zZXRPcmllbnRhdGlvblRvUmFkaW8oKTtcbiAgICB0aGlzLnNldFN0ZXBUb0lucHV0KCk7XG4gICAgdGhpcy5zZXRSYW5nZVRvUmFkaW8oKTtcblxuICAgIHRoaXMuX2hhbmRsZXJzLmZvckVhY2goaGFuZGxlciA9PlxuICAgICAgaGFuZGxlci5lbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuZHJhZ0FuZERyb3AuYmluZCh0aGlzKSksXG4gICAgKTtcbiAgfVxuXG4gIG5vdGlmeVByZXNlbnRlcigpIHtcbiAgICBjb25zdCBuZXdWYWx1ZXMgPSB0aGlzLl9jb250cm9sUGFuZWwudmFsdWVJbnB1dHMubWFwKGlucHV0ID0+IHBhcnNlSW50KGlucHV0LnZhbHVlKSk7XG4gICAgY29uc3QgbmV3T3JpZW50YXRpb24gPSB0aGlzLl9jb250cm9sUGFuZWwub3JpZW50YXRpb25SYWRpb3NbMF0uY2hlY2tlZCA/IHRydWUgOiBmYWxzZTtcbiAgICBjb25zdCBuZXdTdGVwID0gcGFyc2VJbnQodGhpcy5fY29udHJvbFBhbmVsLnN0ZXBJbnB1dC52YWx1ZSk7XG4gICAgY29uc3QgbmV3UmFuZ2UgPSB0aGlzLl9jb250cm9sUGFuZWwucmFuZ2VSYWRpb3NbMV0uY2hlY2tlZCA/IHRydWUgOiBmYWxzZTtcbiAgICB0aGlzLm9ic2VydmVyLmJyb2FkY2FzdCh7XG4gICAgICB2YWx1ZXM6IG5ld1ZhbHVlcyxcbiAgICAgIGlzVmVydGljYWw6IG5ld09yaWVudGF0aW9uLFxuICAgICAgc3RlcDogbmV3U3RlcCxcbiAgICAgIGhhc1JhbmdlOiBuZXdSYW5nZSxcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZSh2YWx1ZURhdGE6IHNsaWRlck9wdGlvbnMpIHtcbiAgICB0aGlzLl9pc1ZlcnRpY2FsID0gdmFsdWVEYXRhLmlzVmVydGljYWwgIT09IHVuZGVmaW5lZCA/IHZhbHVlRGF0YS5pc1ZlcnRpY2FsIDogdGhpcy5faXNWZXJ0aWNhbDtcbiAgICB0aGlzLl9oYXNSYW5nZSA9IHZhbHVlRGF0YS5oYXNSYW5nZSAhPT0gdW5kZWZpbmVkID8gdmFsdWVEYXRhLmhhc1JhbmdlIDogdGhpcy5faGFzUmFuZ2U7XG5cbiAgICB0aGlzLl92YWx1ZXMgPSB2YWx1ZURhdGEudmFsdWVzID8gdmFsdWVEYXRhLnZhbHVlcyA6IHRoaXMuX3ZhbHVlcztcbiAgICB0aGlzLnNldE9yaWVudGF0aW9uKHRoaXMuX2lzVmVydGljYWwpO1xuICAgIHRoaXMuc2V0SGFuZGxlclBvc2l0aW9uKHRoaXMuX3ZhbHVlcywgdGhpcy5faXNWZXJ0aWNhbCk7XG4gICAgdGhpcy51cGRhdGVTZWxlY3RlZFJhbmdlKCk7XG4gICAgaWYgKHZhbHVlRGF0YS5zdGVwKSB0aGlzLl9zdGVwID0gdmFsdWVEYXRhLnN0ZXA7XG4gICAgLy8gdGhpcy51cGRhdGVIYW5kbGVycyh0aGlzLl9oYXNSYW5nZSk7XG4gIH1cbiAgc2V0U2xpZGVyQm9keSgpIHtcbiAgICB0aGlzLl9zbGlkZXJCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fc2xpZGVyQm9keS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJCb2R5Jyk7XG4gICAgdGhpcy5fcGFyZW50LmFwcGVuZENoaWxkKHRoaXMuX3NsaWRlckJvZHkpO1xuICB9XG5cbiAgc2V0T3JpZW50YXRpb24oaXNWZXJ0aWNhbDogYm9vbGVhbikge1xuICAgIHRoaXMuX2lzVmVydGljYWwgPSBpc1ZlcnRpY2FsO1xuICAgIGlmIChpc1ZlcnRpY2FsKSB7XG4gICAgICB0aGlzLl9wYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX2hvcml6b250YWwnKTtcbiAgICAgIHRoaXMuX3BhcmVudC5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfdmVydGljYWwnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlcl92ZXJ0aWNhbCcpO1xuICAgICAgdGhpcy5fcGFyZW50LmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9ob3Jpem9udGFsJyk7XG4gICAgfVxuICB9XG5cbiAgc2V0SGFuZGxlcnMoaGFzUmFuZ2U6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oYW5kbGVycy5wdXNoKG5ldyBIYW5kbGVyVmlldyh0aGlzLl9zbGlkZXJCb2R5LCB0aGlzLl9taW4sIHRoaXMuX21heCkpO1xuICAgIGlmIChoYXNSYW5nZSkge1xuICAgICAgdGhpcy5faGFuZGxlcnMucHVzaChuZXcgSGFuZGxlclZpZXcodGhpcy5fc2xpZGVyQm9keSwgdGhpcy5fbWluLCB0aGlzLl9tYXgpKTtcbiAgICAgIHRoaXMuX2hhbmRsZXJzWzBdLmVsZW0uaWQgPSAnaGFuZGxlcl9taW4nO1xuICAgICAgdGhpcy5faGFuZGxlcnNbMV0uZWxlbS5pZCA9ICdoYW5kbGVyX21heCc7XG4gICAgfVxuICB9XG5cbiAgZ2V0SGFuZGxlcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZXJzO1xuICB9XG5cbiAgLy/QvdC1INGA0LDQsdC+0YLQsNC10YJcbiAgdXBkYXRlSGFuZGxlcnMoaGFzUmFuZ2U6IGJvb2xlYW4pIHtcbiAgICBpZiAoaGFzUmFuZ2UpIHtcbiAgICAgIHRoaXMuX2hhbmRsZXJzLnB1c2gobmV3IEhhbmRsZXJWaWV3KHRoaXMuX3NsaWRlckJvZHksIHRoaXMuX21pbiwgdGhpcy5fbWF4KSk7XG4gICAgICB0aGlzLnNldEhhbmRsZXJQb3NpdGlvbih0aGlzLl92YWx1ZXMsIHRoaXMuX2lzVmVydGljYWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oYW5kbGVycy5wb3AoKTtcbiAgICAgIHRoaXMuc2V0SGFuZGxlclBvc2l0aW9uKHRoaXMuX3ZhbHVlcywgdGhpcy5faXNWZXJ0aWNhbCk7XG4gICAgfVxuICB9XG5cbiAgc2V0SGFuZGxlclBvc2l0aW9uKHZhbHVlczogbnVtYmVyW10sIGlzVmVydGljYWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oYW5kbGVycy5mb3JFYWNoKChoYW5kbGVyLCBpbmRleCkgPT4gaGFuZGxlci5zZXRQb3NpdGlvbih2YWx1ZXNbaW5kZXhdLCBpc1ZlcnRpY2FsKSk7XG4gIH1cblxuICBzZXRTZWxlY3RlZFJhbmdlKCkge1xuICAgIHRoaXMuX3NlbGVjdGVkUmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9zbGlkZXJCb2R5LmFwcGVuZENoaWxkKHRoaXMuX3NlbGVjdGVkUmFuZ2UpO1xuICAgIHRoaXMuX3NlbGVjdGVkUmFuZ2UuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWRSYW5nZScpO1xuICAgIGlmICh0aGlzLl9oYXNSYW5nZSkge1xuICAgICAgdGhpcy5fc2VsZWN0ZWRSYW5nZS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZFJhbmdlJyk7XG4gICAgICB0aGlzLl9zZWxlY3RlZFJhbmdlLmNsYXNzTGlzdC5hZGQoJ3JhbmdlX2JldHdlZW4nKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVTZWxlY3RlZFJhbmdlKCkge1xuICAgIHRoaXMuX2lzVmVydGljYWxcbiAgICAgID8gKHRoaXMuX3NlbGVjdGVkUmFuZ2Uuc3R5bGUuaGVpZ2h0ID1cbiAgICAgICAgICB0aGlzLmdldENvb3Jkcyh0aGlzLl9zbGlkZXJCb2R5KSAtIHRoaXMuZ2V0Q29vcmRzKHRoaXMuX2hhbmRsZXJzWzBdLmVsZW0pICsgJ3B4JylcbiAgICAgIDogKHRoaXMuX3NlbGVjdGVkUmFuZ2Uuc3R5bGUud2lkdGggPSB0aGlzLmdldENvb3Jkcyh0aGlzLl9oYW5kbGVyc1swXS5lbGVtKSArICdweCcpO1xuICAgIGlmICh0aGlzLl9oYXNSYW5nZSkge1xuICAgICAgY29uc3QgcG9zTWluID0gdGhpcy5faXNWZXJ0aWNhbCA/ICdib3R0b20nIDogJ2xlZnQnO1xuICAgICAgY29uc3Qgc2l6ZSA9IHRoaXMuX2lzVmVydGljYWwgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG4gICAgICB0aGlzLl9zZWxlY3RlZFJhbmdlLnN0eWxlW3Bvc01pbl0gPSB0aGlzLl9pc1ZlcnRpY2FsXG4gICAgICAgID8gdGhpcy5nZXRDb29yZHModGhpcy5fc2xpZGVyQm9keSkgLSB0aGlzLmdldENvb3Jkcyh0aGlzLl9oYW5kbGVyc1swXS5lbGVtKSArICdweCdcbiAgICAgICAgOiB0aGlzLmdldENvb3Jkcyh0aGlzLl9oYW5kbGVyc1swXS5lbGVtKSArICdweCc7XG4gICAgICB0aGlzLl9zZWxlY3RlZFJhbmdlLnN0eWxlW3NpemVdID0gdGhpcy5faXNWZXJ0aWNhbFxuICAgICAgICA/IHRoaXMuZ2V0Q29vcmRzKHRoaXMuX2hhbmRsZXJzWzBdLmVsZW0pIC0gdGhpcy5nZXRDb29yZHModGhpcy5faGFuZGxlcnNbMV0uZWxlbSkgKyAncHgnXG4gICAgICAgIDogdGhpcy5nZXRDb29yZHModGhpcy5faGFuZGxlcnNbMV0uZWxlbSkgLSB0aGlzLmdldENvb3Jkcyh0aGlzLl9oYW5kbGVyc1swXS5lbGVtKSArICdweCc7XG4gICAgfVxuICB9XG5cbiAgc2V0VmFsdWVzVG9JbnB1dHMoKSB7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLnZhbHVlSW5wdXRzLm1hcChcbiAgICAgIChpbnB1dCwgaW5kZXgpID0+IChpbnB1dC52YWx1ZSA9IHRoaXMuX3ZhbHVlc1tpbmRleF0udG9TdHJpbmcoKSksXG4gICAgKTtcbiAgfVxuXG4gIHNldFN0ZXBUb0lucHV0KCkge1xuICAgIHRoaXMuX2NvbnRyb2xQYW5lbC5zdGVwSW5wdXQudmFsdWUgPSB0aGlzLl9zdGVwLnRvU3RyaW5nKCk7XG4gIH1cblxuICBzZXRPcmllbnRhdGlvblRvUmFkaW8oKSB7XG4gICAgdGhpcy5fY29udHJvbFBhbmVsLm9yaWVudGF0aW9uUmFkaW9zLm1hcCgocmFkaW8sIGluZGV4KSA9PlxuICAgICAgdGhpcy5faXNWZXJ0aWNhbFxuICAgICAgICA/ICh0aGlzLl9jb250cm9sUGFuZWwub3JpZW50YXRpb25SYWRpb3NbMF0uY2hlY2tlZCA9IHRydWUpXG4gICAgICAgIDogKHRoaXMuX2NvbnRyb2xQYW5lbC5vcmllbnRhdGlvblJhZGlvc1sxXS5jaGVja2VkID0gdHJ1ZSksXG4gICAgKTtcbiAgfVxuXG4gIHNldFJhbmdlVG9SYWRpbygpIHtcbiAgICB0aGlzLl9jb250cm9sUGFuZWwucmFuZ2VSYWRpb3MubWFwKChyYWRpbywgaW5kZXgpID0+XG4gICAgICB0aGlzLl9oYXNSYW5nZVxuICAgICAgICA/ICh0aGlzLl9jb250cm9sUGFuZWwucmFuZ2VSYWRpb3NbMV0uY2hlY2tlZCA9IHRydWUpXG4gICAgICAgIDogKHRoaXMuX2NvbnRyb2xQYW5lbC5yYW5nZVJhZGlvc1swXS5jaGVja2VkID0gdHJ1ZSksXG4gICAgKTtcbiAgfVxuXG4gIGdldENvb3JkcyhlbGVtOiBIVE1MRWxlbWVudCkge1xuICAgIGNvbnN0IGJveCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgaWYgKHRoaXMuX2lzVmVydGljYWwpIHtcbiAgICAgIHJldHVybiBib3guYm90dG9tICsgcGFnZVlPZmZzZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBib3gubGVmdCArIHBhZ2VYT2Zmc2V0O1xuICAgIH1cbiAgfVxuICBkcmFnQW5kRHJvcChlOiBNb3VzZUV2ZW50KSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5vbk1vdXNlTW92ZS5iaW5kKHRoaXMpKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5vbk1vdXNlVXAuYmluZCh0aGlzKSk7XG4gIH1cblxuICBvbk1vdXNlTW92ZShlOiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKHRoaXMuX2lzVmVydGljYWwpIHtcbiAgICAgIHRoaXMubW92ZUF0KGUucGFnZVksIGUudGFyZ2V0IGFzIEhUTUxEaXZFbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb3ZlQXQoZS5wYWdlWCwgZS50YXJnZXQgYXMgSFRNTERpdkVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVBdChjb29yZGluYXRlOiBudW1iZXIsIHRhcmdldDogSFRNTERpdkVsZW1lbnQpIHtcbiAgICBjb25zdCBzbGlkZXJDb29yZCA9IHRoaXMuZ2V0Q29vcmRzKHRoaXMuX3NsaWRlckJvZHkpO1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5faXNWZXJ0aWNhbFxuICAgICAgPyBNYXRoLnJvdW5kKCgoc2xpZGVyQ29vcmQgLSBjb29yZGluYXRlKSAvIHRoaXMuX3NsaWRlckJvZHkub2Zmc2V0SGVpZ2h0KSAqIHRoaXMuX21heClcbiAgICAgIDogTWF0aC5yb3VuZCgoKGNvb3JkaW5hdGUgLSBzbGlkZXJDb29yZCkgLyB0aGlzLl9zbGlkZXJCb2R5Lm9mZnNldFdpZHRoKSAqIHRoaXMuX21heCk7XG4gICAgaWYgKHRhcmdldC5pZCA9PSAnaGFuZGxlcl9taW4nKSB7XG4gICAgICB0aGlzLl9jb250cm9sUGFuZWwudmFsdWVJbnB1dHNbMF0udmFsdWUgPSB2YWx1ZS50b1N0cmluZygpO1xuICAgICAgdGhpcy5vYnNlcnZlci5icm9hZGNhc3Qoe1xuICAgICAgICB2YWx1ZXM6IFt2YWx1ZSwgdGhpcy5fdmFsdWVzWzFdXSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9jb250cm9sUGFuZWwudmFsdWVJbnB1dHNbMV0udmFsdWUgPSB2YWx1ZS50b1N0cmluZygpO1xuICAgICAgdGhpcy5vYnNlcnZlci5icm9hZGNhc3Qoe1xuICAgICAgICB2YWx1ZXM6IFt0aGlzLl92YWx1ZXNbMF0sIHZhbHVlXSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uTW91c2VVcCgpIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlLmJpbmQodGhpcykpO1xuICB9XG59XG5cbmV4cG9ydCB7IE1haW5WaWV3IH07XG4iXSwic291cmNlUm9vdCI6IiJ9