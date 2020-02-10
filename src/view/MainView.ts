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
    this.setSliderBody();
    this.setOrientation(this._isVertical);
    this.setHandlers(this._hasRange);
    this.setHandlerPosition(this._values, this._isVertical);
    this.setSelectedRange();
    this.updateSelectedRange();
    this.setOrientationToRadio();
    this.setStepToInput();
  }

  notifyPresenter() {
    const newValues = this._controlPanel.valueInputs.map(input => parseInt(input.value));
    const newOrientation = this._controlPanel.orientationRadios[0].checked ? true : false;
    const newStep = parseInt(this._controlPanel.stepInput.value);
    this.observer.broadcast({
      values: newValues,
      isVertical: newOrientation,
      step: newStep,
    });
  }

  update(valueData: sliderOptions) {
    const isVertical = valueData.isVertical !== undefined ? valueData.isVertical : this._isVertical;
    this._values = valueData.values ? valueData.values : this._values;
    this.setOrientation(isVertical);
    this.setHandlerPosition(this._values, isVertical);
    this.updateSelectedRange();
    if (valueData.step) this._step = valueData.step;
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
    this._handlers.forEach(handler => {
      handler.elem.addEventListener('mousedown', this.dragAndDrop.bind(this));
    });
  }

  getHandlers() {
    return this._handlers;
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
      //  this._selectedRange.style[minPosition] = this.getCoords(this._handlers[0].elem).x + '%';
      //  this._selectedRange.style[maxPosition] = this.getCoords(this._handlers[1].elem).x + '%';
    }
  }

  updateSelectedRange() {
    this._isVertical
      ? (this._selectedRange.style.height =
          this.getCoords(this._sliderBody).y - this.getCoords(this._handlers[0].elem).y + 'px')
      : (this._selectedRange.style.width = this.getCoords(this._handlers[0].elem).x + 'px');
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
  dragAndDrop() {
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }
  onMouseMove() {}
  onMouseUp() {}

  getCoords(elem: HTMLElement) {
    const box = elem.getBoundingClientRect();
    return {
      x: box.left + pageXOffset,
      y: box.bottom + pageYOffset,
    };
  }
}

export { MainView };
