import { MainModel } from '../model/MainModel';
import { Presenter } from './Presenter';
class Facade {
    constructor(parent, sliderOptions) {
        this._model = new MainModel(sliderOptions);
        this._presenter = new Presenter(parent, this._model);
        this._presenter.setValuesToInputs();
        this._presenter.setStepToInput();
    }
    get singleValue() {
        return this._model.singleValue;
    }
    set singleValue(value) {
        this._model.singleValue = value;
    }
    get rangeValue() {
        return this._model.rangeValue;
    }
    set rangeValue(value) {
        this._model.rangeValue = value;
    }
    get step() {
        return this._model.step;
    }
    set step(value) {
        this._model.step = value;
    }
    get isVertical() {
        return this._model.isVertical;
    }
    set isVertical(vertical) {
        this._model.isVertical = vertical;
    }
}
export { Facade };
//# sourceMappingURL=Facade.js.map