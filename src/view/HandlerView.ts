class HandlerView {
  private _handler: HTMLElement;
  private _parent: HTMLElement;
  private _value: number;
  private _isVertical: boolean;
  private _minLimit: number;
  private _maxLimit: number;

  constructor(
    parent: HTMLElement,
    value: number,
    isVertical: boolean,
    minLimit: number,
    maxLimit: number,
  ) {
    this._handler = document.createElement('div');
    this._handler.classList.add('handler');
    this._parent = parent;
    this._parent.appendChild(this._handler);
    this._value = value;
    this._isVertical = isVertical;
    this._minLimit = minLimit;
    this._maxLimit = maxLimit;
  }

  setPosition(): void {
    const valuesCount = this._maxLimit - this._minLimit;
    const positionProperty = this._isVertical ? 'top' : 'left';
    const position = this._isVertical
      ? ((this._value - this._minLimit) / valuesCount) * 100
      : 100 - ((this._value - this._minLimit) / valuesCount) * 100;
    this._handler.style[positionProperty] = `${position}%`;
  }
}

export { HandlerView };
