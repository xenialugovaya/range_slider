import { HandlerView } from './HandlerView';
import { SelectedArea } from './SelectedAreaView';
import { EventObserver } from '../observer/observer';
class MainView {
    constructor(parent, hasRange, isVertical, min, max, values, hasLabels) {
        this.observer = new EventObserver();
        this._handlers = [];
        this._min = min;
        this._max = max;
        this._values = values;
        this._isVertical = isVertical;
        this._hasRange = hasRange;
        this._hasLabels = hasLabels;
        this._parent = parent;
        this._sliderBody = document.createElement('div');
        this._mouseMove;
        this._mouseUp;
        this._handlerTargetId = '';
        this.sliderInit();
        this._selectedArea = new SelectedArea(this._sliderBody, this._hasRange, this._isVertical, this._handlers[0].elem, this._handlers[1].elem);
        this._handlers.forEach(handler => {
            handler.elem.ondragstart = function () {
                return false;
            };
            handler.elem.addEventListener('mousedown', this.dragAndDrop.bind(this));
        });
    }
    sliderInit() {
        this.setSliderBody();
        this.setOrientation();
        this.setHandlers();
        this.setHandlerPosition(this._values, this._isVertical);
    }
    update(valueData) {
        this._min = valueData.min ? valueData.min : this._min;
        this._max = valueData.max ? valueData.max : this._max;
        this._values = valueData.values ? valueData.values : this._values;
        this._isVertical = valueData.isVertical !== undefined ? valueData.isVertical : this._isVertical;
        this._hasRange = valueData.hasRange !== undefined ? valueData.hasRange : this._hasRange;
        this._hasLabels = valueData.hasLabels !== undefined ? valueData.hasLabels : this._hasLabels;
        this.setOrientation();
        this.setHandlerPosition(this._values, this._isVertical);
        this._handlers.forEach((handler, index) => handler.updateLabel(this._hasLabels, this._values[index]));
        this.updateHandlersAmount(this._hasRange);
        this._selectedArea.updateSelectedRange(this._hasRange, this._isVertical, this._handlers[1].elem, this._handlers[0].elem, this._handlers[1].labelElem);
    }
    setSliderBody() {
        this._sliderBody.classList.add('sliderBody');
        this._parent.appendChild(this._sliderBody);
    }
    setOrientation() {
        if (this._isVertical) {
            this._parent.classList.remove('slider_horizontal');
            this._parent.classList.add('slider_vertical');
        }
        else {
            this._parent.classList.remove('slider_vertical');
            this._parent.classList.add('slider_horizontal');
        }
    }
    setHandlers() {
        this._handlers.push(new HandlerView(this._sliderBody, this._hasLabels));
        if (this._hasRange) {
            this._handlers.push(new HandlerView(this._sliderBody, this._hasLabels));
            this._handlers[0].elem.id = 'handler_min';
            this._handlers[1].elem.id = 'handler_max';
        }
    }
    getHandlers() {
        return this._handlers;
    }
    setHandlerPosition(values, isVertical) {
        this._handlers.forEach((handler, index) => handler.setPosition(values[index], this._min, this._max, isVertical));
    }
    updateHandlersAmount(range) {
        var _a;
        if (!range) {
            this._handlers[1].elem.remove();
            (_a = this._handlers[1].labelElem) === null || _a === void 0 ? void 0 : _a.remove();
        }
        else {
            this._handlers[0].elem.after(this._handlers[1].elem);
            if (this._handlers[1].labelElem)
                this._handlers[1].elem.before(this._handlers[1].labelElem);
        }
    }
    getCoords(elem) {
        const box = elem.getBoundingClientRect();
        if (this._isVertical) {
            return box.bottom + pageYOffset;
        }
        else {
            return box.left + pageXOffset;
        }
    }
    dragAndDrop(e) {
        e.preventDefault();
        const target = e.target;
        this._handlerTargetId = target.id;
        this._mouseMove = this.onMouseMove.bind(this);
        this._mouseUp = this.onMouseUp.bind(this);
        document.addEventListener('mousemove', this._mouseMove);
        document.addEventListener('mouseup', this._mouseUp);
    }
    onMouseMove(e) {
        if (this._isVertical) {
            this.moveAt(e.pageY, this._handlerTargetId);
        }
        else {
            this.moveAt(e.pageX, this._handlerTargetId);
        }
    }
    moveAt(coordinate, targetId) {
        const sliderCoord = this.getCoords(this._sliderBody);
        const value = this._isVertical
            ? ((sliderCoord - coordinate) / this._sliderBody.offsetHeight) * (this._max - this._min) +
                this._min
            : ((coordinate - sliderCoord) / this._sliderBody.offsetWidth) * (this._max - this._min) +
                this._min;
        if (!targetId || targetId === 'handler_min') {
            this.observer.broadcast({
                values: [value, this._values[1]],
            });
        }
        else {
            this.observer.broadcast({
                values: [this._values[0], value],
            });
        }
    }
    onMouseUp() {
        document.removeEventListener('mousemove', this._mouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    }
}
export { MainView };
//# sourceMappingURL=MainView.js.map