import { MainView } from '../view/MainView';
class Presenter {
    constructor(parent, model) {
        this._model = model;
        this._values = this._model.rangeValue;
        this._view = new MainView(parent, this._model.hasRange, this._model.isVertical, this._model.min, this._model.max, this._values, this._model.step);
        this.updateModel();
        this.updateView();
    }
    updateModel() {
        this._view.observer.subscribe((valueData) => {
            if (valueData.values)
                this._model.rangeValue = valueData.values;
            if (valueData.isVertical)
                this._model.isVertical = valueData.isVertical;
        });
    }
    updateView() {
        this._model.observer.subscribe((valueData) => {
            this._view.update(valueData);
        });
    }
    setHandlersPosition() {
        this._view.setHandlerPosition();
    }
    setValuesToInputs() {
        this._view.setValuesToInputs();
    }
    setStepToInput() {
        this._view.setStepToInput();
    }
}
export { Presenter };
//# sourceMappingURL=Presenter.js.map