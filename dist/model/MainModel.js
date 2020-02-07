import { EventObserver } from '../observer/observer';
import { Handler } from './handler';
class MainModel {
    constructor(sliderOptions) {
        this._observers = new EventObserver();
        this._min = 0;
        this._max = 100;
        this._step = 1;
        this._values = [0];
        this._isVertical = false;
        this._hasRange = false;
        this._hasLabels = false;
        this._handlers = [];
        this._min = sliderOptions.min ? sliderOptions.min : 0;
        this._max = sliderOptions.max ? sliderOptions.max : this._max;
        this._step = sliderOptions.step ? sliderOptions.step : this._step;
        this._values = sliderOptions.values ? sliderOptions.values : this._values;
        this._hasRange = sliderOptions.hasRange ? sliderOptions.hasRange : this._hasRange;
        this._isVertical = sliderOptions.isVertical ? sliderOptions.isVertical : this._isVertical;
        this._hasLabels = sliderOptions.hasLabels ? sliderOptions.hasLabels : this._hasLabels;
    }
    get isVertical() {
        if (this._isVertical)
            return this._isVertical;
    }
    get hasRange() {
        if (this._hasRange)
            return this._hasRange;
    }
    // get initial coordinates of any element, depending on dimension
    getCoords(elem) {
        const box = elem.getBoundingClientRect();
        if (this._isVertical) {
            return {
                x: box.left + pageXOffset,
                y: box.bottom + pageYOffset,
            };
        }
        else {
            return {
                x: box.left + pageXOffset,
                y: box.top + pageXOffset,
            };
        }
    }
    //create handlers depending on range
    setHandlers() {
        if (this._values[0] === this._values[1])
            this._values[1] += this._step;
        if (this._values[0] > this._values[1])
            [this._values[0], this._values[1]] = [this._values[1], this._values[0]];
        if (this._hasRange) {
            this._handlers = [new Handler(this._values[0]), new Handler(this._values[1])];
        }
        else {
            this._handlers = [new Handler(this._values[0])];
        }
    }
    //set limits of a slider in terms of px to control handler movement
    setLimits(sliderBody, handler) {
        if (this._isVertical) {
            return {
                minLimit: 0,
                maxLimit: sliderBody.offsetHeight - handler.offsetHeight,
            };
        }
        else {
            return {
                minLimit: 0,
                maxLimit: sliderBody.offsetWidth - handler.offsetWidth,
            };
        }
    }
}
export { MainModel };
//# sourceMappingURL=MainModel.js.map