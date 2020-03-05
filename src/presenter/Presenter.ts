import { MainModel } from '../model/MainModel';
import { MainView } from '../view/MainView';
import { sliderOptions } from '../model/sliderOptions';

class Presenter {
  private _model: MainModel;
  private _view: MainView;
  private _values: number[];
  private _parent: HTMLElement;

  constructor(parent: HTMLElement, model: MainModel) {
    this._model = model;
    this._values = this._model.rangeValue;
    this._parent = parent;
    this._view = new MainView(
      this._parent,
      this._model.hasRange,
      this._model.isVertical,
      this._model.min,
      this._model.max,
      this._values,
      this._model.hasLabels,
    );
    this.updateModel();
    this.updateView();
  }

  private updateModel() {
    this._view.observer.subscribe((valueData: sliderOptions) => {
      this._model.update(valueData);
    });
  }

  private updateView() {
    this._model.observer.subscribe((valueData: sliderOptions) => {
      this._view.update(valueData);
    });
  }

  get parent() {
    return this._parent;
  }
}

export { Presenter };
