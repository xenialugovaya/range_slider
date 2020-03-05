import { MainView } from '../view/MainView';
class Presenter {
    constructor(parent, model) {
        this._model = model;
        this._values = this._model.rangeValue;
        this._parent = parent;
        this._view = new MainView(this._parent, this._model.hasRange, this._model.isVertical, this._model.min, this._model.max, this._values, this._model.hasLabels);
        this.updateModel();
        this.updateView();
    }
    updateModel() {
        this._view.observer.subscribe((valueData) => {
            this._model.update(valueData);
        });
    }
    updateView() {
        this._model.observer.subscribe((valueData) => {
            this._view.update(valueData);
        });
    }
    get parent() {
        return this._parent;
    }
}
export { Presenter };
//# sourceMappingURL=Presenter.js.map