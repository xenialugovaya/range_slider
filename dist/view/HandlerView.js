import { LabelView } from './LabelView';
class HandlerView {
    constructor(parent, showLabel) {
        this._handler = document.createElement('div');
        this._parent = parent;
        this._showLabel = showLabel;
        this._label = showLabel ? new LabelView() : null;
        this.handlerInit();
    }
    handlerInit() {
        this._parent.append(this._handler);
        this._handler.classList.add('handler');
        if (this._label)
            this._handler.before(this._label.elem);
    }
    getHandlerSize(isVertical) {
        const handlerSize = isVertical
            ? (this._handler.offsetHeight / this._parent.offsetHeight) * 100
            : (this._handler.offsetWidth / this._parent.offsetWidth) * 100;
        return handlerSize;
    }
    setPosition(value, min, max, isVertical) {
        const valuesCount = max - min;
        const positionProperty = isVertical ? 'bottom' : 'left';
        const handlerSize = this.getHandlerSize(isVertical);
        const position = ((value - min) / valuesCount) * 100 - handlerSize / 2;
        this._handler.style[positionProperty] = `${position}%`;
        this.setLabelPosition(value, valuesCount, min, isVertical);
    }
    setLabelPosition(value, valuesCount, min, isVertical) {
        if (this._label) {
            const labelSize = this._label.getLabelSize(isVertical, this._parent);
            const fixedPositionProperty = this._label.getFixedPositionProperty(isVertical);
            const positionProperty = isVertical ? 'bottom' : 'left';
            const labelPosition = ((value - min) / valuesCount) * 100 - labelSize / 2;
            this._label.elem.style[positionProperty] = `${labelPosition}%`;
            this._label.elem.style[fixedPositionProperty] = '330%';
            this.setLabelValue(value);
        }
    }
    get elem() {
        return this._handler;
    }
    get labelElem() {
        var _a;
        return (_a = this._label) === null || _a === void 0 ? void 0 : _a.elem;
    }
    setLabelValue(value) {
        if (this._label)
            this._label.setLabelValue(value);
    }
    updateLabel(showLabel, value) {
        var _a;
        if (showLabel) {
            this._label = this._label ? this._label : new LabelView();
            this._handler.before(this._label.elem);
            this.setLabelValue(value);
        }
        else {
            (_a = this._label) === null || _a === void 0 ? void 0 : _a.elem.remove();
        }
    }
}
export { HandlerView };
//# sourceMappingURL=HandlerView.js.map