import HandlerView from './HandlerView';
import SelectedArea from './SelectedAreaView';
import EventObserver from '../observer/observer';
import { sliderOptions } from '../model/sliderOptions';

export default class MainView {
  public observer = new EventObserver();

  private sliderBody = document.createElement('div');

  private parent!: HTMLElement;

  private selectedArea!: SelectedArea;

  private handlers: HandlerView[] = [];

  private min!: number;

  private max!: number;

  private values!: number[];

  private isVertical!: boolean;

  private hasRange!: boolean;

  private hasLabels!: boolean;

  private mouseMove = this.onMouseMove.bind(this);

  private mouseUp = this.onMouseUp.bind(this);

  private handlerTargetId = '';

  constructor(
    parent: HTMLElement,
    hasRange: boolean,
    isVertical: boolean,
    min: number,
    max: number,
    values: number[],
    hasLabels: boolean,
  ) {
    this.init(parent, hasRange, isVertical, min, max, values, hasLabels);
  }

  public update(valueData: sliderOptions): void {
    this.min = valueData.min !== undefined ? valueData.min : this.min;
    this.max = valueData.max !== undefined ? valueData.max : this.max;
    this.values = valueData.values ? valueData.values : this.values;
    this.isVertical = valueData.isVertical !== undefined ? valueData.isVertical : this.isVertical;
    this.hasRange = valueData.hasRange !== undefined ? valueData.hasRange : this.hasRange;
    this.hasLabels = valueData.hasLabels !== undefined ? valueData.hasLabels : this.hasLabels;
    this.setOrientation(this.isVertical);
    this.handlers.forEach((handler, index) => handler.updateLabel(this.hasLabels, this.values[index]));
    this.setRange(this.hasRange);
    this.setHandlerPosition();
    this.selectedArea.updateSelectedRange(
      this.hasRange,
      this.isVertical,
      this.handlers[1].getElement(),
      this.handlers[0].getElement(),
    );
  }

  public getHandlers(): HandlerView[] {
    return this.handlers;
  }

  private init(
    parent: HTMLElement,
    hasRange: boolean,
    isVertical: boolean,
    min: number,
    max: number,
    values: number[],
    hasLabels: boolean,
  ): void {
    this.min = min;
    this.max = max;
    this.values = values;
    this.isVertical = isVertical;
    this.hasRange = hasRange;
    this.hasLabels = hasLabels;
    this.parent = parent;
    this.sliderBody.classList.add('slider__body');
    this.parent.appendChild(this.sliderBody);
    this.setOrientation(this.isVertical);
    this.setHandlers();
    this.setHandlerPosition();
    this.bindEvents();
    this.selectedArea = new SelectedArea(
      this.sliderBody,
      this.hasRange,
      this.isVertical,
      this.handlers[0].getElement(),
      this.handlers[1].getElement(),
    );
  }

  private bindEvents(): void {
    this.handlers.forEach((handler) => {
      handler.getElement().addEventListener('mousedown', this.handleHandlerMouseDown.bind(this));
    });
    this.sliderBody.addEventListener('mousedown', this.handleSliderBodyMouseDown.bind(this));
  }

  private setOrientation(vertical: boolean): void {
    if (vertical) {
      this.parent.classList.remove('slider_horizontal');
      this.parent.classList.add('slider_vertical');
    } else {
      this.parent.classList.remove('slider_vertical');
      this.parent.classList.add('slider_horizontal');
    }
  }

  private setHandlers(): void {
    this.handlers.push(new HandlerView(this.sliderBody, this.hasLabels));
    if (this.hasRange) {
      this.handlers.push(new HandlerView(this.sliderBody, this.hasLabels));
      this.handlers[0].getElement().id = 'handler_min';
      this.handlers[1].getElement().id = 'handler_max';
    }
  }

  private setHandlerPosition(): void {
    this.handlers.forEach((handler, index) => handler.setPosition(this.values[index], this.min, this.max, this.isVertical));
    if (this.values[0] === this.max) {
      this.handlers[0].getElement().style.zIndex = '100';
    } else if (this.values[0] === this.min) {
      this.handlers[0].getElement().style.zIndex = '1';
    }
  }

  private setRange(range: boolean): void {
    const maxHandlerElement = this.handlers[1].getElement();
    const maxHandlerLabel = this.handlers[1].getLabelElement();
    const minHandlerElement = this.handlers[0].getElement();
    if (!range) {
      maxHandlerElement.remove();
      maxHandlerLabel?.remove();
    } else {
      minHandlerElement.after(maxHandlerElement);
      if (maxHandlerLabel && this.hasLabels) {
        maxHandlerElement.before(maxHandlerLabel);
      }
    }
  }

  private getCoordinates(element: HTMLElement, vertical: boolean): number {
    const box = element.getBoundingClientRect();
    if (vertical) {
      return box.bottom + pageYOffset;
    }
    return box.left + pageXOffset;
  }

  private handleSliderBodyMouseDown(e: MouseEvent): void {
    let clickCoordinate = e.pageX;
    const handlersCoordinates = this.handlers.map((handler) => this.getCoordinates(handler.getElement(), this.isVertical));
    if (this.isVertical) {
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
    if (this.isVertical) {
      this.moveAt(e.pageY, this.handlerTargetId);
    } else {
      this.moveAt(e.pageX, this.handlerTargetId);
    }
  }

  private moveAt(coordinate: number, targetId: string): void {
    const sliderCoordinate = this.getCoordinates(this.sliderBody, this.isVertical);
    let value = this.isVertical
      ? ((sliderCoordinate - coordinate) / this.sliderBody.offsetHeight) * (this.max - this.min)
      : ((coordinate - sliderCoordinate) / this.sliderBody.offsetWidth) * (this.max - this.min);
    if (this.min < 0) {
      value += this.min;
    }
    if (!targetId || targetId === 'handler_min') {
      if ((value + this.min) > this.values[1] && this.values[1] !== this.max && this.hasRange) {
        value = this.values[1];
        this.handlers[0].getElement().style.zIndex = '10';
        this.handlers[1].getElement().style.zIndex = '100';
      } else {
        this.handlers[0].getElement().style.zIndex = '100';
        this.handlers[1].getElement().style.zIndex = '10';
      }
      this.observer.broadcast({
        values: [value, this.values[1]],
      });
    } else {
      if (value < this.values[0]) {
        value = this.values[0];
        this.handlers[0].getElement().style.zIndex = '100';
        this.handlers[1].getElement().style.zIndex = '10';
      } else {
        this.handlers[0].getElement().style.zIndex = '10';
        this.handlers[1].getElement().style.zIndex = '100';
      }
      this.observer.broadcast({
        values: [this.values[0], value],
      });
    }
  }

  private onMouseUp(): void {
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }
}
