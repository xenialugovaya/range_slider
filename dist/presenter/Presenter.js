import { MainView } from '../view/MainView';
class Presenter {
    constructor(parent, model) {
        this._model = model;
        this._view = new MainView(parent, this._model.hasRange, this._model.isVertical);
    }
}
export { Presenter };
//# sourceMappingURL=Presenter.js.map