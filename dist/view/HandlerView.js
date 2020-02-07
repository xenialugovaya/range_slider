class HandlerView {
    constructor(parent, value, isVertical, minLimit, maxLimit) {
        this._handler = document.createElement('div');
        this._handler.classList.add('handler');
        this._parent = parent;
        this._parent.appendChild(this._handler);
        this._value = value;
        this._isVertical = isVertical;
        this._minLimit = minLimit;
        this._maxLimit = maxLimit;
    }
    setPosition() {
        const valuesCount = this._maxLimit - this._minLimit;
        const positionProperty = this._isVertical ? 'top' : 'left';
        const position = this._isVertical
            ? ((this._value - this._minLimit) / valuesCount) * 100
            : 100 - ((this._value - this._minLimit) / valuesCount) * 100;
        this._handler.style[positionProperty] = `${position}%`;
    }
}
export { HandlerView };
//# sourceMappingURL=HandlerView.js.map