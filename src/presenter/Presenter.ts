import { MainModel } from '../model/MainModel';
import { MainView } from '../view/MainView';
import { sliderOptions } from '../model/sliderOptions';

class Presenter {
  private _model: MainModel;
  private _view: MainView;
  private _values: number[];

  constructor(parent: HTMLElement, model: MainModel) {
    this._model = model;
    this._values = this._model.rangeValue;
    this._view = new MainView(
      parent,
      this._model.hasRange,
      this._model.isVertical,
      this._model.min,
      this._model.max,
      this._values,
      this._model.step,
    );
    this.updateModel();
    this.updateView();
  }

  updateModel() {
    this._view.observer.subscribe((valueData: sliderOptions) => {
      if (valueData.values) this._model.rangeValue = valueData.values;
      if (valueData.isVertical !== undefined) this._model.isVertical = valueData.isVertical;
      if (valueData.step) this._model.step = valueData.step;
      if (valueData.hasRange !== undefined) this._model.hasRange = valueData.hasRange;
    });
  }

  updateView() {
    this._model.observer.subscribe((valueData: sliderOptions) => {
      this._view.update(valueData);
    });
  }

  setStepToInput() {
    this._view.setStepToInput();
  }
}

export { Presenter };
