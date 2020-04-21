import { HandlerView } from './HandlerView';
import { SelectedArea } from './SelectedAreaView';
import { EventObserver } from '../observer/observer';
import { sliderOptions } from '../model/sliderOptions';

class MainView {
  public observer: EventObserver;

  private sliderBody: HTMLElement;

  private parent: HTMLElement;

  private selectedArea: SelectedArea;

  private handlers: HandlerView[];

  private min: number;

  private max: number;

  private values: number[];

  private isVertical: boolean;

  private hasRange: boolean;

  private hasLabels: boolean;

  private mouseMove: any;

  private mouseUp: any;

  private handlerTargetId: string;

  constructor(
    parent: HTMLElement,
    hasRange: boolean,
    isVertical: boolean,
    min: number,
    max: number,
    values: number[],
    hasLabels: boolean,
  ) {
    this.observer = new EventObserver();
    this.handlers = [];
    this.min = min;
    this.max = max;
    this.values = values;
    this.isVertical = isVertical;
    this.hasRange = hasRange;
    this.hasLabels = hasLabels;
    this.parent = parent;
    this.sliderBody = document.createElement('div');

    this.mouseMove;
    this.mouseUp;
    this.handlerTargetId = '';

    this.sliderInit();
    this.selectedArea = new SelectedArea(
      this.sliderBody,
      this.hasRange,
      this.isVertical,
      this.handlers[0].elem,
      this.handlers[1].elem,
    );

    this.handlers.forEach(handler => {
      handler.elem.addEventListener('mousedown', this.dragAndDrop.bind(this));
    });
  }

  private sliderInit(): void {
    this.sliderBody.classList.add('sliderBody');
    this.parent.appendChild(this.sliderBody);
    this.setOrientation(this.isVertical);
    this.setHandlers();
    this.setHandlerPosition();
  }

  update(valueData: sliderOptions): void {
    this.min = valueData.min !== undefined ? valueData.min : this.min;
    this.max = valueData.max ? valueData.max : this.max;
    this.values = valueData.values ? valueData.values : this.values;
    this.isVertical = valueData.isVertical !== undefined ? valueData.isVertical : this.isVertical;
    this.hasRange = valueData.hasRange !== undefined ? valueData.hasRange : this.hasRange;
    this.hasLabels = valueData.hasLabels !== undefined ? valueData.hasLabels : this.hasLabels;

    this.setOrientation(this.isVertical);
    this.setHandlerPosition();
    this.handlers.forEach((handler, index) =>
      handler.updateLabel(this.hasLabels, this.values[index]),
    );
    this.setRange(this.hasRange);
    this.selectedArea.updateSelectedRange(
      this.hasRange,
      this.isVertical,
      this.handlers[1].elem,
      this.handlers[0].elem,
    );
  }

  setOrientation(vertical: boolean): void {
    if (vertical) {
      this.parent.classList.remove('slider_horizontal');
      this.parent.classList.add('slider_vertical');
    } else {
      this.parent.classList.remove('slider_vertical');
      this.parent.classList.add('slider_horizontal');
    }
  }

  setHandlers(): void {
    this.handlers.push(new HandlerView(this.sliderBody, this.hasLabels));
    if (this.hasRange) {
      this.handlers.push(new HandlerView(this.sliderBody, this.hasLabels));
      this.handlers[0].elem.id = 'handler_min';
      this.handlers[1].elem.id = 'handler_max';
    }
  }

  getHandlers(): HandlerView[] {
    return this.handlers;
  }

  setHandlerPosition(): void {
    this.handlers.forEach((handler, index) =>
      handler.setPosition(this.values[index], this.min, this.max, this.isVertical),
    );
  }

  setRange(range: boolean): void {
    if (!range) {
      this.handlers[1].elem.remove();
      this.handlers[1].labelElem?.remove();
    } else {
      this.handlers[0].elem.after(this.handlers[1].elem);
      if (this.handlers[1].labelElem && this.hasLabels) {
        this.handlers[1].elem.before(this.handlers[1].labelElem);
      }
    }
  }

  getCoords(elem: HTMLElement, vertical: boolean): number {
    const box = elem.getBoundingClientRect();
    if (vertical) {
      return box.bottom + pageYOffset;
    }
    return box.left + pageXOffset;
  }

  dragAndDrop(e: MouseEvent): void {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    this.handlerTargetId = target.id;
    this.mouseMove = this.onMouseMove.bind(this);
    this.mouseUp = this.onMouseUp.bind(this);
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
  }

  onMouseMove(e: MouseEvent): void {
    if (this.isVertical) {
      this.moveAt(e.pageY, this.handlerTargetId);
    } else {
      this.moveAt(e.pageX, this.handlerTargetId);
    }
  }

  moveAt(coordinate: number, targetId: string): void {
    const sliderCoord = this.getCoords(this.sliderBody, this.isVertical);
    const value = this.isVertical
      ? ((sliderCoord - coordinate) / this.sliderBody.offsetHeight) * (this.max - this.min) +
        this.min
      : ((coordinate - sliderCoord) / this.sliderBody.offsetWidth) * (this.max - this.min) +
        this.min;
    if (!targetId || targetId === 'handler_min') {
      this.handlers[0].elem.style.zIndex = '100';
      this.handlers[1].elem.style.zIndex = '10';
      this.observer.broadcast({
        values: [value, this.values[1]],
      });
    } else {
      this.handlers[0].elem.style.zIndex = '10';
      this.handlers[1].elem.style.zIndex = '100';
      this.observer.broadcast({
        values: [this.values[0], value],
      });
    }
  }

  onMouseUp(): void {
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }
}

export { MainView };
