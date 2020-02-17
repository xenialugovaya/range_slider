class HandlerView {
  private _handler: HTMLElement;
  private _parent: HTMLElement;

  constructor(parent: HTMLElement, minLimit: number, maxLimit: number) {
    this._handler = document.createElement('div');
    this._handler.classList.add('handler');
    this._parent = parent;
    this._parent.append(this._handler);
  }

  setPosition(value: number, min: number, max: number, isVertical: boolean): void {
    const valuesCount = max - min;
    const positionProperty = isVertical ? 'bottom' : 'left';
    const handlerSize = isVertical
      ? (this._handler.offsetHeight / this._parent.offsetHeight) * 100
      : (this._handler.offsetWidth / this._parent.offsetWidth) * 100;
    const position = ((value - min) / valuesCount) * 100 - handlerSize / 2;
    this._handler.style[positionProperty] = `${position}%`;
  }

  get elem() {
    return this._handler;
  }
}

export { HandlerView };
