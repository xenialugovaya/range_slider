"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MainModel_1 = require("../model/MainModel");
const Presenter_1 = require("./Presenter");
const observer_1 = require("../observer/observer");
class Facade {
    constructor(parent, sliderOptions) {
        this.observer = new observer_1.EventObserver();
        this._model = new MainModel_1.MainModel(sliderOptions);
        this._presenter = new Presenter_1.Presenter(parent, this._model);
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
exports.Facade = Facade;
//# sourceMappingURL=Facade.js.map