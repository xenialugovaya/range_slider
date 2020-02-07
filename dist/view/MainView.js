import { HandlerView } from './HandlerView';
class MainView {
    constructor(parent, hasRange, isVertical) {
        this._sliderBody = document.createElement('div');
        this._sliderBody.classList.add('sliderBody');
        this._parent = parent;
        this._parent.appendChild(this._sliderBody);
        this._handlers = [new HandlerView(this._sliderBody)];
        this._selectedRange = document.createElement('div');
        this._selectedRange.classList.add('selectedRange');
        if (isVertical)
            this._parent.classList.add('slider_vertical');
        if (hasRange) {
            this._handlers.push(new HandlerView(this._sliderBody));
            this._selectedRange.classList.add('range_between');
        }
    }
}
export { MainView };
//# sourceMappingURL=MainView.js.map