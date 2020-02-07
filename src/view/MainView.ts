import { HandlerView } from './HandlerView';

class MainView {
  private _sliderBody: HTMLElement;
  private _parent: HTMLElement;
  private _selectedRange: HTMLElement;
  private _handlers: HandlerView[];
  private _min: number;
  private _max: number;
  private _values: number[];

  constructor(
    parent: HTMLElement,
    hasRange: boolean,
    isVertical: boolean,
    min: number,
    max: number,
    values: number[],
  ) {
    this._min = min;
    this._max = max;
    this._values = values;
    this._sliderBody = document.createElement('div');
    this._sliderBody.classList.add('sliderBody');
    this._parent = parent;
    this._parent.appendChild(this._sliderBody);
    this._handlers = hasRange
      ? [
          new HandlerView(this._sliderBody, values[0], isVertical, min, max),
          new HandlerView(this._sliderBody, values[1], isVertical, min, max),
        ]
      : [new HandlerView(this._sliderBody, values[0], isVertical, min, max)];
    this._selectedRange = document.createElement('div');
    this._selectedRange.classList.add('selectedRange');
    if (isVertical) this._parent.classList.add('slider_vertical');
    if (hasRange) this._selectedRange.classList.add('range_between');
  }
}

export { MainView };
