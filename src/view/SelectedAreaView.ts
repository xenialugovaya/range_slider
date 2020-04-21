export default class SelectedArea {
  private selectedRange: HTMLElement;

  private parent: HTMLElement;

  constructor(
    parent: HTMLElement,
    range: boolean,
    vertical: boolean,
    handlerMin: HTMLElement,
    handlerMax: HTMLElement,
  ) {
    this.parent = parent;
    this.selectedRange = document.createElement('div');
    this.parent.append(this.selectedRange);
    if (!range) {
      this.selectedRange.classList.add('selectedRange');
      this.setPositionSingle(vertical, handlerMin);
    } else {
      this.selectedRange.classList.add('range_between');
      this.setPositionRange(vertical, handlerMax, handlerMin);
    }
  }

  updateSelectedRange(
    range: boolean,
    vertical: boolean,
    handlerMax: HTMLElement,
    handlerMin: HTMLElement,
  ): void {
    if (!range) {
      this.selectedRange.classList.add('selectedRange');
      this.selectedRange.classList.remove('range_between');
      this.setPositionSingle(vertical, handlerMin);
    } else {
      this.selectedRange.classList.remove('selectedRange');
      this.selectedRange.classList.add('range_between');
      this.setPositionRange(vertical, handlerMax, handlerMin);
    }
  }

  private setPositionSingle(vertical: boolean, handler: HTMLElement): void {
    vertical
      ? (this.selectedRange.style.height = `${this.getCoords(this.parent, vertical)
          - this.getCoords(handler, vertical)
          + handler.offsetHeight}px`)
      : (this.selectedRange.style.width = `${this.getCoords(handler, vertical)
          - this.getCoords(this.parent, vertical)
          + handler.offsetWidth}px`);
  }

  private setPositionRange(
    vertical: boolean,
    handlerMax: HTMLElement,
    handlerMin: HTMLElement,
  ): void {
    const posMin = vertical ? 'bottom' : 'left';
    const length = vertical ? 'height' : 'width';
    this.selectedRange.style[posMin] = vertical
      ? `${this.getCoords(this.parent, vertical) - this.getCoords(handlerMin, vertical)}px`
      : `${this.getCoords(handlerMin, vertical) - this.getCoords(this.parent, vertical)}px`;
    this.selectedRange.style[length] = vertical
      ? `${this.getCoords(handlerMin, vertical) - this.getCoords(handlerMax, vertical)}px`
      : `${this.getCoords(handlerMax, vertical) - this.getCoords(handlerMin, vertical)}px`;
  }

  private getCoords(elem: HTMLElement, vertical: boolean): number {
    const box = elem.getBoundingClientRect();
    if (vertical) {
      return box.bottom + pageYOffset;
    }
    return box.left + pageXOffset;
  }

  get selectedArea() {
    return this.selectedRange;
  }
}
