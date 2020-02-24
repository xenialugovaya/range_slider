"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MainView_1 = require("../view/MainView");
class Presenter {
    constructor(parent, model) {
        this._model = model;
        this._values = this._model.rangeValue;
        this._parent = parent;
        this._view = new MainView_1.MainView(this._parent, this._model.hasRange, this._model.isVertical, this._model.min, this._model.max, this._values, this._model.hasLabels);
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
exports.Presenter = Presenter;
//# sourceMappingURL=Presenter.js.map