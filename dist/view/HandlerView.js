class HandlerView {
    constructor(parent, isVertical, minLimit, maxLimit) {
        this._handler = document.createElement('div');
        this._handler.classList.add('handler');
        this._parent = parent;
        this._parent.appendChild(this._handler);
        this._isVertical = isVertical;
        this._minLimit = minLimit;
        this._maxLimit = maxLimit;
    }
    setPosition(value) {
        const valuesCount = this._maxLimit - this._minLimit;
        const positionProperty = this._isVertical ? 'bottom' : 'left';
        const handlerSize = this._isVertical ? (this._handler.offsetHeight / this._parent.offsetHeight) * 100 : (this._handler.offsetWidth / this._parent.offsetWidth) * 100;
        const position = (((value - this._minLimit) / valuesCount) * 100) - handlerSize / 2;
        this._handler.style[positionProperty] = `${position}%`;
    }
}
export { HandlerView };
//# sourceMappingURL=HandlerView.js.map