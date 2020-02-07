import { MainView } from '../view/MainView';
class Presenter {
    constructor(parent, model) {
        this._model = model;
        this._values = this._model.rangeValue;
        this._view = new MainView(parent, this._model.hasRange, this._model.isVertical, this._model.min, this._model.max, this._values);
    }
}
export { Presenter };
//# sourceMappingURL=Presenter.js.map