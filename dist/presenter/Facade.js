import { MainModel } from '../model/MainModel';
import { Presenter } from './Presenter';
import { EventObserver } from '../observer/observer';
class Facade {
    constructor(parent, sliderOptions) {
        this.observer = new EventObserver();
        this._model = new MainModel(sliderOptions);
        this._presenter = new Presenter(parent, this._model);
        this.updateValues();
    }
    updateValues() {
        this._model.observer.subscribe((valueData) => {
            this.observer.broadcast(valueData);
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
export { Facade };
//# sourceMappingURL=Facade.js.map