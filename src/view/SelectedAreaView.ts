export default class SelectedArea {
  private selectedRange = document.createElement('div');

  private parent!: HTMLElement;

  constructor(
    parent: HTMLElement,
    range: boolean,
    vertical: boolean,
    handlerMin: HTMLElement,
    handlerMax: HTMLElement,
  ) {
    this.init(parent, range, vertical, handlerMin, handlerMax);
  }

  public updateSelectedRange(
    range: boolean,
    vertical: boolean,
    handlerMax: HTMLElement,
    handlerMin: HTMLElement,
  ): void {
    if (!range) {
      this.selectedRange.classList.add('slider__selected');
      this.selectedRange.classList.remove('slider__selected-range');
      this.setPositionSingle(vertical, handlerMin);
      this.setDefaultStyles(vertical, range);
    } else {
      this.selectedRange.classList.remove('slider__selected');
      this.selectedRange.classList.add('slider__selected-range');
      this.setPositionRange(vertical, handlerMax, handlerMin);
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
    handlerMin: HTMLElement,
    handlerMax: HTMLElement,
  ): void {
    this.parent = parent;
    this.parent.append(this.selectedRange);
    if (!range) {
      this.selectedRange.classList.add('slider__selected');
      this.setPositionSingle(vertical, handlerMin);
      this.setDefaultStyles(vertical, range);
    } else {
      this.selectedRange.classList.add('slider__selected-range');
      this.setPositionRange(vertical, handlerMax, handlerMin);
      this.setDefaultStyles(vertical, range);
    }
  }

  private setPositionSingle(vertical: boolean, handler: HTMLElement): void {
    if (vertical) {
      (this.selectedRange.style.height = `${this.getCoordinate(this.parent, vertical)
        - this.getCoordinate(handler, vertical)
        + handler.offsetHeight}px`);
    } else {
      (this.selectedRange.style.width = `${(((this.getCoordinate(handler, vertical) + (handler.offsetWidth / 2))
        - this.getCoordinate(this.parent, vertical)) / this.parent.offsetWidth) * 100}%`);
    }
  }

  private setPositionRange(
    vertical: boolean,
    handlerMax: HTMLElement,
    handlerMin: HTMLElement,
  ): void {
    const posMin = vertical ? 'bottom' : 'left';
    const length = vertical ? 'height' : 'width';
    this.selectedRange.style[posMin] = vertical
      ? `${((this.getCoordinate(this.parent, vertical) - this.getCoordinate(handlerMin, vertical)) / this.parent.offsetHeight) * 100}%`
      : `${((this.getCoordinate(handlerMin, vertical) - this.getCoordinate(this.parent, vertical) + (handlerMin.offsetWidth / 2)) / this.parent.offsetWidth) * 100}%`;
    this.selectedRange.style[length] = vertical
      ? `${((this.getCoordinate(handlerMin, vertical) - this.getCoordinate(handlerMax, vertical)) / this.parent.offsetHeight) * 100}%`
      : `${((this.getCoordinate(handlerMax, vertical) - this.getCoordinate(handlerMin, vertical)) / this.parent.offsetWidth) * 100}%`;
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
