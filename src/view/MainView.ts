import { HandlerView } from './HandlerView';
import { ControlPanel } from './ControlPanelView';
import { EventObserver } from '../observer/observer';
import { sliderOptions } from '../model/sliderOptions';

class MainView {
  public observer: EventObserver;
  private _sliderBody: HTMLElement;
  private _parent: HTMLElement;
  private _selectedRange: HTMLElement;
  private _handlers: HandlerView[];
  private _min: number;
  private _max: number;
  private _values: number[];
  private _controlPanel: ControlPanel;
  private _step: number;
  private _isVertical: boolean;
  private _hasRange: boolean;

  constructor(
    parent: HTMLElement,
    hasRange: boolean,
    isVertical: boolean,
    min: number,
    max: number,
    values: number[],
    step: number,
  ) {
    this.observer = new EventObserver();
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

    this._controlPanel = new ControlPanel(this._parent, hasRange, isVertical);
    this._controlPanel.valueInputs.forEach(input =>
      input.addEventListener('input', this.notifyPresenter.bind(this)),
    );
    this._controlPanel.stepInput.addEventListener('input', this.notifyPresenter.bind(this));
    this._controlPanel.orientationRadios.forEach(radio =>
      radio.addEventListener('change', this.notifyPresenter.bind(this)),
    );
    this._controlPanel.rangeRadios.forEach(radio =>
      radio.addEventListener('change', this.notifyPresenter.bind(this)),
    );

    this.setSliderBody();
    this.setOrientation(this._isVertical);
    this.setHandlers(this._hasRange);
    this.setHandlerPosition(this._values, this._isVertical);
    this.setSelectedRange();
    this.updateSelectedRange();
    this.setOrientationToRadio();
    this.setStepToInput();
    this.setRangeToRadio();

    this._handlers.forEach(handler =>
      handler.elem.addEventListener('mousedown', this.dragAndDrop.bind(this)),
    );
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

  update(valueData: sliderOptions) {
    this._isVertical = valueData.isVertical !== undefined ? valueData.isVertical : this._isVertical;
    this._hasRange = valueData.hasRange !== undefined ? valueData.hasRange : this._hasRange;

    this._values = valueData.values ? valueData.values : this._values;
    this.setOrientation(this._isVertical);
    this.setHandlerPosition(this._values, this._isVertical);
    this.updateSelectedRange();
    if (valueData.step) this._step = valueData.step;
    // this.updateHandlers(this._hasRange);
  }
  setSliderBody() {
    this._sliderBody = document.createElement('div');
    this._sliderBody.classList.add('sliderBody');
    this._parent.appendChild(this._sliderBody);
  }

  setOrientation(isVertical: boolean) {
    this._isVertical = isVertical;
    if (isVertical) {
      this._parent.classList.remove('slider_horizontal');
      this._parent.classList.add('slider_vertical');
    } else {
      this._parent.classList.remove('slider_vertical');
      this._parent.classList.add('slider_horizontal');
    }
  }

  setHandlers(hasRange: boolean) {
    this._handlers.push(new HandlerView(this._sliderBody, this._min, this._max));
    if (hasRange) {
      this._handlers.push(new HandlerView(this._sliderBody, this._min, this._max));
      this._handlers[0].elem.id = 'handler_min';
      this._handlers[1].elem.id = 'handler_max';
    }
  }

  getHandlers() {
    return this._handlers;
  }

  //не работает
  updateHandlers(hasRange: boolean) {
    if (hasRange) {
      this._handlers.push(new HandlerView(this._sliderBody, this._min, this._max));
      this.setHandlerPosition(this._values, this._isVertical);
    } else {
      this._handlers.pop();
      this.setHandlerPosition(this._values, this._isVertical);
    }
  }

  setHandlerPosition(values: number[], isVertical: boolean) {
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
    this._controlPanel.valueInputs.map(
      (input, index) => (input.value = this._values[index].toString()),
    );
  }

  setStepToInput() {
    this._controlPanel.stepInput.value = this._step.toString();
  }

  setOrientationToRadio() {
    this._controlPanel.orientationRadios.map((radio, index) =>
      this._isVertical
        ? (this._controlPanel.orientationRadios[0].checked = true)
        : (this._controlPanel.orientationRadios[1].checked = true),
    );
  }

  setRangeToRadio() {
    this._controlPanel.rangeRadios.map((radio, index) =>
      this._hasRange
        ? (this._controlPanel.rangeRadios[1].checked = true)
        : (this._controlPanel.rangeRadios[0].checked = true),
    );
  }

  getCoords(elem: HTMLElement) {
    const box = elem.getBoundingClientRect();
    if (this._isVertical) {
      return box.bottom + pageYOffset;
    } else {
      return box.left + pageXOffset;
    }
  }
  dragAndDrop(e: MouseEvent) {
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  onMouseMove(e: MouseEvent) {
    if (this._isVertical) {
      this.moveAt(e.pageY, e.target as HTMLDivElement);
    } else {
      this.moveAt(e.pageX, e.target as HTMLDivElement);
    }
  }

  moveAt(coordinate: number, target: HTMLDivElement) {
    const sliderCoord = this.getCoords(this._sliderBody);
    const value = this._isVertical
      ? Math.round(((sliderCoord - coordinate) / this._sliderBody.offsetHeight) * this._max)
      : Math.round(((coordinate - sliderCoord) / this._sliderBody.offsetWidth) * this._max);
    if (target.id == 'handler_min') {
      this._controlPanel.valueInputs[0].value = value.toString();
      this.observer.broadcast({
        values: [value, this._values[1]],
      });
    } else {
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

export { MainView };
