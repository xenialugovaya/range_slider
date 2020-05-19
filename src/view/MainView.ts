import HandlerView from './HandlerView';
import SelectedArea from './SelectedAreaView';
import EventObserver from '../observer/observer';
import { sliderOptions } from '../model/sliderOptions';
import { definedOptions } from '../model/definedOptions';

export default class MainView {
  public observer = new EventObserver();

  private sliderBody = document.createElement('div');

  private parent!: HTMLElement;

  private selectedArea!: SelectedArea;

  private handlers: HandlerView[] = [];

  private options!: definedOptions;

  private mouseMove = this.onMouseMove.bind(this);

  private mouseUp = this.onMouseUp.bind(this);

  private handlerTargetId = '';

  constructor(
    parent: HTMLElement,
    options: definedOptions,
  ) {
    this.init(parent, options);
  }

  public update(valueData: sliderOptions): void {
    this.updateOptions(valueData);
    this.setOrientation(this.options.isVertical);
    this.setRange(this.options.hasRange);
    this.updateLabels();
    this.setHandlerPosition();
    this.selectedArea.updateSelectedRange(
      this.options.hasRange,
      this.options.isVertical,
      this.getHandlersElements(),
    );
  }

  public getHandlers(): HandlerView[] {
    return this.handlers;
  }

  public getHandlersElements(): HTMLElement[] {
    return this.handlers.map((handler) => handler.getElement());
  }

  public setOrientation(vertical: boolean): void {
    if (vertical) {
      this.parent.classList.remove('slider_horizontal');
      this.parent.classList.add('slider_vertical');
    } else {
      this.parent.classList.remove('slider_vertical');
      this.parent.classList.add('slider_horizontal');
    }
  }

  public setRange(range: boolean): void {
    const maxHandlerElementIsDefined = this.handlers[1] !== undefined;
    const minHandlerElement = this.handlers[0].getElement();
    if (maxHandlerElementIsDefined) {
      const maxHandlerElement = this.handlers[1].getElement();
      const maxHandlerLabel = this.handlers[1].getLabelElement();
      if (!range) {
        maxHandlerElement.remove();
        maxHandlerLabel?.remove();
      } else {
        minHandlerElement.after(maxHandlerElement);
        if (maxHandlerLabel && this.options.hasLabels) {
          maxHandlerElement.before(maxHandlerLabel);
        }
      }
    }
  }

  public getCoordinates(element: HTMLElement, vertical: boolean): number {
    const box = element.getBoundingClientRect();
    if (vertical) {
      return box.bottom + pageYOffset;
    }
    return box.left + pageXOffset;
  }

  private init(
    parent: HTMLElement,
    options: definedOptions,
  ): void {
    this.options = options;
    this.parent = parent;
    this.sliderBody.classList.add('slider__body');
    this.parent.append(this.sliderBody);
    this.setOrientation(this.options.isVertical);
    this.setHandlers();
    this.updateLabels();
    this.setHandlerPosition();
    this.bindEvents();
    this.selectedArea = new SelectedArea({
      sliderBody: this.sliderBody,
      hasRange: this.options.hasRange,
      isVertical: this.options.isVertical,
      handlers: this.getHandlersElements(),
    });
  }

  private bindEvents(): void {
    this.handlers.forEach((handler) => {
      handler.getElement().addEventListener('mousedown', this.handleHandlerMouseDown.bind(this));
    });
    this.sliderBody.addEventListener('mousedown', this.handleSliderBodyMouseDown.bind(this));
  }

  private updateOptions(valueData: sliderOptions): void {
    const {
      min, max, values, isVertical, step, hasRange, hasLabels,
    } = valueData;
    if (min !== undefined) this.options.min = min;
    if (max !== undefined) this.options.max = max;
    if (values !== undefined) this.options.values = values;
    if (isVertical !== undefined) this.options.isVertical = isVertical;
    if (step !== undefined) this.options.step = step;
    if (hasRange !== undefined) this.options.hasRange = hasRange;
    if (hasLabels !== undefined) this.options.hasLabels = hasLabels;
  }

  private setHandlers(): void {
    this.options.values.forEach(() => {
      this.handlers.push(new HandlerView(this.sliderBody, this.options.hasLabels));
    });
    this.handlers[0].getElement().id = 'handler_min';
    this.handlers[1].getElement().id = 'handler_max';
    this.handlers[0].appendHandler();
    if (this.options.hasRange) {
      this.handlers[1].appendHandler();
    }
  }

  private setHandlerPosition(): void {
    this.handlers.forEach((handler, index) => handler.setPosition(this.options.values[index], this.options.min, this.options.max, this.options.isVertical));
    if (this.options.values[0] === this.options.max) {
      this.handlers[0].getElement().style.zIndex = '100';
    } else if (this.options.values[0] === this.options.min) {
      this.handlers[0].getElement().style.zIndex = '1';
    }
  }

  private updateLabels(): void{
    this.handlers.forEach((handler, index) => handler.updateLabel(this.options.hasLabels, this.options.values[index]));
  }

  private handleSliderBodyMouseDown(e: MouseEvent): void {
    let clickCoordinate = e.pageX;
    const handlersCoordinates = this.handlers.map((handler) => this.getCoordinates(handler.getElement(), this.options.isVertical));
    if (this.options.isVertical) {
      clickCoordinate = e.pageY;
    }
    const handlerDistance = [Math.abs(clickCoordinate - handlersCoordinates[0]), Math.abs(clickCoordinate - handlersCoordinates[1])];
    if (handlerDistance[0] < handlerDistance[1]) {
      this.handlerTargetId = 'handler_min';
    } else if (handlerDistance[0] === handlerDistance[1] && clickCoordinate < handlersCoordinates[0]) {
      this.handlerTargetId = 'handler_min';
    } else {
      this.handlerTargetId = 'handler_max';
    }

    this.moveAt(clickCoordinate, this.handlerTargetId);
  }

  private handleHandlerMouseDown(e: MouseEvent): void {
    e.stopPropagation();
    const target = e.target as HTMLDivElement;
    this.handlerTargetId = target.id;
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
  }

  private onMouseMove(e: MouseEvent): void {
    if (this.options.isVertical) {
      this.moveAt(e.pageY, this.handlerTargetId);
    } else {
      this.moveAt(e.pageX, this.handlerTargetId);
    }
  }

  private moveAt(coordinate: number, targetId: string): void {
    const sliderCoordinate = this.getCoordinates(this.sliderBody, this.options.isVertical);
    let value = this.options.isVertical
      ? ((sliderCoordinate - coordinate) / this.sliderBody.offsetHeight) * (this.options.max - this.options.min)
      : ((coordinate - sliderCoordinate) / this.sliderBody.offsetWidth) * (this.options.max - this.options.min);
    if (this.options.min < 0) {
      value += this.options.min;
    }
    if (!this.options.hasRange) {
      this.observer.broadcast({
        values: [value, this.options.values[1]],
      });
    }
    if (targetId === 'handler_min') {
      const minValueMoreThanMaxValue = this.options.min < 0 ? value > this.options.values[1] : (value + this.options.min) > this.options.values[1];
      if (minValueMoreThanMaxValue && this.options.values[1] !== this.options.max && this.options.hasRange) {
        value = this.options.values[1];
        this.handlers[0].getElement().style.zIndex = '10';
        this.handlers[1].getElement().style.zIndex = '100';
      } else {
        this.handlers[0].getElement().style.zIndex = '100';
        this.handlers[1].getElement().style.zIndex = '10';
      }
      this.observer.broadcast({
        values: [value, this.options.values[1]],
      });
    } else if (targetId === 'handler_max') {
      const maxValueLessThanMinValue = this.options.min < 0 ? value < this.options.values[0] : (value + this.options.min) < this.options.values[0];
      if (maxValueLessThanMinValue) {
        value = this.options.values[0];
        this.handlers[0].getElement().style.zIndex = '100';
        this.handlers[1].getElement().style.zIndex = '10';
      } else {
        this.handlers[0].getElement().style.zIndex = '10';
        this.handlers[1].getElement().style.zIndex = '100';
      }
      this.observer.broadcast({
        values: [this.options.values[0], value],
      });
    }
  }

  private onMouseUp(): void {
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }
}
