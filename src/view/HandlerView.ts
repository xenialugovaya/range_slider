class HandlerView {
  private _handler: HTMLElement;
  private _parent: HTMLElement;
  private _minLimit: number;
  private _maxLimit: number;

  constructor(parent: HTMLElement, minLimit: number, maxLimit: number) {
    this._handler = document.createElement('div');
    this._handler.classList.add('handler');
    this._parent = parent;
    this._parent.append(this._handler);
    this._minLimit = minLimit;
    this._maxLimit = maxLimit;
  }

  setPosition(value: number, isVertical: boolean): void {
    const valuesCount = this._maxLimit - this._minLimit;
    const positionProperty = isVertical ? 'bottom' : 'left';
    const handlerSize = isVertical
      ? (this._handler.offsetHeight / this._parent.offsetHeight) * 100
      : (this._handler.offsetWidth / this._parent.offsetWidth) * 100;
    const position = ((value - this._minLimit) / valuesCount) * 100 - handlerSize / 2;
    this._handler.style[positionProperty] = `${position}%`;
  }

  get elem() {
    return this._handler;
  }
}

export { HandlerView };
