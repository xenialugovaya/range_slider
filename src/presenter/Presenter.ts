import { MainModel } from '../model/MainModel';
import { MainView } from '../view/MainView';

class Presenter {
  private _model: MainModel;
  private _view: MainView;
  constructor(parent: HTMLElement, model: MainModel) {
    this._model = model;
    this._view = new MainView(parent, this._model.hasRange, this._model.isVertical);
  }
}

export { Presenter };
