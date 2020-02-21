class SelectedArea {
    constructor(parent) {
        this._selectedRange = document.createElement('div');
        parent.append(this._selectedRange);
    }
    updateSelectedRange(range, vertical, handlerMax, handlerMin) {
        if (!range) {
            this._selectedRange.classList.add('selectedRange');
            this._selectedRange.classList.remove('range_between');
            this.setPositionSingle(vertical, handlerMin);
        }
        else {
            this._selectedRange.classList.remove('selectedRange');
            this._selectedRange.classList.add('range_between');
            this.setPositionRange(vertical, handlerMax, handlerMin);
        }
    }
    setPositionSingle(vertical, handler) {
        const size = vertical ? 'height' : 'width';
        this._selectedRange.style[size] = this.getCoords(handler, vertical) + 'px';
    }
    setPositionRange(vertical, handlerMax, handlerMin) {
        const posMin = vertical ? 'bottom' : 'left';
        const size = vertical ? 'height' : 'width';
        this._selectedRange.style[posMin] = this.getCoords(handlerMin, vertical) + 'px';
        this._selectedRange.style[size] =
            this.getCoords(handlerMax, vertical) - this.getCoords(handlerMin, vertical) + 'px';
    }
    getCoords(elem, vertical) {
        const box = elem.getBoundingClientRect();
        if (vertical) {
            return box.top + pageYOffset;
        }
        else {
            return box.left + pageXOffset;
        }
    }
}
export { SelectedArea };
//# sourceMappingURL=SelectedView.js.map