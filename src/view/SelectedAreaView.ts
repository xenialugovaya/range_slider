export default class SelectedArea {
  private selectedRange = document.createElement('div');

  private parent!: HTMLElement;

  constructor(
    parent: HTMLElement,
    range: boolean,
    vertical: boolean,
    handlers: HTMLElement [],
  ) {
    this.init(parent, range, vertical, handlers);
  }

  public updateSelectedRange(
    range: boolean,
    vertical: boolean,
    handlers: HTMLElement[],
  ): void {
    if (!range) {
      this.selectedRange.classList.add('slider__selected');
      this.selectedRange.classList.remove('slider__selected-range');
      this.setPositionSingle(vertical, handlers[0]);
      this.setDefaultStyles(vertical, range);
    } else {
      this.selectedRange.classList.remove('slider__selected');
      this.selectedRange.classList.add('slider__selected-range');
      this.setPositionRange(vertical, handlers);
      this.setDefaultStyles(vertical, range);
    }
  }

  public getSelectedArea(): HTMLDivElement {
    return this.selectedRange;
  }

  private init(
    parent: HTMLElement,
    range: boolean,
    vertical: boolean,
    handlers: HTMLElement[],
  ): void {
    this.parent = parent;
    this.parent.append(this.selectedRange);
    if (!range) {
      this.selectedRange.classList.add('slider__selected');
      this.setPositionSingle(vertical, handlers[0]);
      this.setDefaultStyles(vertical, range);
    } else {
      this.selectedRange.classList.add('slider__selected-range');
      this.setPositionRange(vertical, handlers);
      this.setDefaultStyles(vertical, range);
    }
  }

  private setPositionSingle(vertical: boolean, handler: HTMLElement): void {
    if (vertical) {
      (this.selectedRange.style.height = `${(this.getCoordinate(this.parent, vertical) - (handler.offsetWidth / 2))
        - this.getCoordinate(handler, vertical)
        + handler.offsetHeight}px`);
    } else {
      (this.selectedRange.style.width = `${(((this.getCoordinate(handler, vertical) + (handler.offsetWidth / 2))
        - this.getCoordinate(this.parent, vertical)) / this.parent.offsetWidth) * 100}%`);
    }
  }

  private setPositionRange(
    vertical: boolean,
    handlers: HTMLElement[],
  ): void {
    const posMin = vertical ? 'bottom' : 'left';
    const length = vertical ? 'height' : 'width';
    this.selectedRange.style[posMin] = vertical
      ? `${((this.getCoordinate(this.parent, vertical) - this.getCoordinate(handlers[0], vertical) + (handlers[0].offsetWidth / 2)) / this.parent.offsetHeight) * 100}%`
      : `${((this.getCoordinate(handlers[0], vertical) - this.getCoordinate(this.parent, vertical) + (handlers[0].offsetWidth / 2)) / this.parent.offsetWidth) * 100}%`;
    this.selectedRange.style[length] = vertical
      ? `${((this.getCoordinate(handlers[0], vertical) - this.getCoordinate(handlers[1], vertical)) / this.parent.offsetHeight) * 100}%`
      : `${((this.getCoordinate(handlers[1], vertical) - this.getCoordinate(handlers[0], vertical)) / this.parent.offsetWidth) * 100}%`;
  }

  private setDefaultStyles(vertical: boolean, range: boolean): void{
    if (vertical) {
      this.selectedRange.style.width = '100%';
      if (range) {
        this.selectedRange.style.left = '0%';
      } else {
        this.selectedRange.style.bottom = '0%';
      }
    } else {
      this.selectedRange.style.height = '100%';
      if (range) {
        this.selectedRange.style.bottom = '0%';
      } else {
        this.selectedRange.style.left = '0%';
      }
    }
  }

  private getCoordinate(element: HTMLElement, vertical: boolean): number {
    const box = element.getBoundingClientRect();
    if (vertical) {
      return box.bottom + pageYOffset;
    }
    return box.left + pageXOffset;
  }
}
