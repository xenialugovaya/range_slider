class SelectedArea {
  private _selectedRange: HTMLElement;
  private _parent: HTMLElement;

  constructor(
    parent: HTMLElement,
    range: boolean,
    vertical: boolean,
    handlerMin: HTMLElement,
    handlerMax: HTMLElement,
  ) {
    this._parent = parent;
    this._selectedRange = document.createElement('div');
    this._parent.append(this._selectedRange);
    if (!range) {
      this._selectedRange.classList.add('selectedRange');
      this.setPositionSingle(vertical, handlerMin);
    } else {
      this._selectedRange.classList.add('range_between');
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
      this._selectedRange.classList.add('selectedRange');
      this._selectedRange.classList.remove('range_between');
      this.setPositionSingle(vertical, handlerMin);
    } else {
      this._selectedRange.classList.remove('selectedRange');
      this._selectedRange.classList.add('range_between');
      this.setPositionRange(vertical, handlerMax, handlerMin);
    }
  }

  private setPositionSingle(vertical: boolean, handler: HTMLElement): void {
    vertical
      ? (this._selectedRange.style.height =
          this.getCoords(this._parent, vertical) -
          this.getCoords(handler, vertical) +
          handler.offsetHeight +
          'px')
      : (this._selectedRange.style.width =
          this.getCoords(handler, vertical) -
          this.getCoords(this._parent, vertical) +
          handler.offsetWidth +
          'px');
  }

  private setPositionRange(
    vertical: boolean,
    handlerMax: HTMLElement,
    handlerMin: HTMLElement,
  ): void {
    const posMin = vertical ? 'bottom' : 'left';
    const length = vertical ? 'height' : 'width';
    this._selectedRange.style[posMin] = vertical
      ? this.getCoords(this._parent, vertical) - this.getCoords(handlerMin, vertical) + 'px'
      : this.getCoords(handlerMin, vertical) - this.getCoords(this._parent, vertical) + 'px';
    this._selectedRange.style[length] = vertical
      ? this.getCoords(handlerMin, vertical) - this.getCoords(handlerMax, vertical) + 'px'
      : this.getCoords(handlerMax, vertical) - this.getCoords(handlerMin, vertical) + 'px';
  }

  private getCoords(elem: HTMLElement, vertical: boolean): number {
    const box = elem.getBoundingClientRect();
    if (vertical) {
      return box.bottom + pageYOffset;
    } else {
      return box.left + pageXOffset;
    }
  }

  get selectedArea() {
    return this._selectedRange;
  }
}

export { SelectedArea };
