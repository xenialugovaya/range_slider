import { EventObserver } from '../observer/observer';
import { Handler } from './handler';

type sliderOptions = {
  min?: number;
  max?: number;
  step?: number;
  values?: number[];
  isVertical?: boolean;
  hasRange?: boolean;
  hasLabels?: boolean;
};

class MainModel {
  private _observers = new EventObserver();
  private _min = 0;
  private _max = 100;
  private _step = 1;
  private _values = [0];
  private _isVertical = false;
  private _hasRange = false;
  private _hasLabels = false;
  private _handlers: Handler[] = [];
  constructor(sliderOptions: sliderOptions) {
    this._min = sliderOptions.min ? sliderOptions.min : 0;
    this._max = sliderOptions.max ? sliderOptions.max : this._max;
    this._step = sliderOptions.step ? sliderOptions.step : this._step;
    this._values = sliderOptions.values ? sliderOptions.values : this._values;
    this._hasRange = sliderOptions.hasRange ? sliderOptions.hasRange : this._hasRange;
    this._isVertical = sliderOptions.isVertical ? sliderOptions.isVertical : this._isVertical;
    this._hasLabels = sliderOptions.hasLabels ? sliderOptions.hasLabels : this._hasLabels;
  }

  get isVertical() {
    if (this._isVertical) return this._isVertical;
  }

  get hasRange() {
    if (this._hasRange) return this._hasRange;
  }

  // get initial coordinates of any element, depending on dimension
  getCoords(elem: HTMLElement): object {
    const box = elem.getBoundingClientRect();
    if (this._isVertical) {
      return {
        x: box.left + pageXOffset,
        y: box.bottom + pageYOffset,
      };
    } else {
      return {
        x: box.left + pageXOffset,
        y: box.top + pageXOffset,
      };
    }
  }

  //create handlers depending on range
  setHandlers(): void {
    if (this._values[0] === this._values[1]) this._values[1] += this._step;
    if (this._values[0] > this._values[1])
      [this._values[0], this._values[1]] = [this._values[1], this._values[0]];
    if (this._hasRange) {
      this._handlers = [new Handler(this._values[0]), new Handler(this._values[1])];
    } else {
      this._handlers = [new Handler(this._values[0])];
    }
  }

  //set limits of a slider in terms of px to control handler movement
  setLimits(sliderBody: HTMLElement, handler: HTMLElement): object {
    if (this._isVertical) {
      return {
        minLimit: 0,
        maxLimit: sliderBody.offsetHeight - handler.offsetHeight,
      };
    } else {
      return {
        minLimit: 0,
        maxLimit: sliderBody.offsetWidth - handler.offsetWidth,
      };
    }
  }
}

export { MainModel };
