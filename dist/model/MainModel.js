import { EventObserver } from '../observer/observer';
class MainModel {
    constructor(sliderOptions) {
        this._min = 0;
        this._max = 100;
        this._step = 1;
        this._values = [10, 20];
        this._isVertical = false;
        this._hasRange = true;
        this._hasLabels = true;
        this.observer = new EventObserver();
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
        if (this._min < this._max) {
            return Math.round(this._min / this._step) * this._step;
        }
        else {
            return Math.round(this._max / this._step) * this._step;
        }
    }
    set min(min) {
        this._min = min;
        this.notifyPresenter({
            min: this.min,
            max: this.max,
            values: this.rangeValue,
        });
    }
    get max() {
        if (this._max < this._min) {
            return Math.round(this._min / this._step) * this._step;
        }
        else {
            return Math.round(this._max / this._step) * this._step;
        }
    }
    set max(max) {
        this._max = max;
        this.notifyPresenter({
            min: this.min,
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
        values = values.map(value => Math.round(value / this.step) * this.step);
        if (values[0] > values[1])
            [values[0], values[1]] = [values[1], values[0]];
        values = values.map(value => value < this.min ? this.min : value > this.max ? this.max : value);
        return values;
    }
}
export { MainModel };
//# sourceMappingURL=MainModel.js.map