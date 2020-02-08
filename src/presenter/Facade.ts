import { MainModel } from '../model/MainModel';
import { Presenter } from './Presenter';
import { MainView } from '../view/MainView';
import { sliderOptions } from '../model/sliderOptions';

class Facade {
  private _model: MainModel;
  private _presenter: Presenter;

  constructor(parent: HTMLElement, sliderOptions: sliderOptions) {
    this._model = new MainModel(sliderOptions);
    this._presenter = new Presenter(parent, this._model);
  }

  get singleValue(): number {
    return this._model.singleValue;
  }

  set singleValue(value: number) {
    this._model.singleValue = value;
  }

  get rangeValue(): number[] {
    return this._model.rangeValue;
  }

  set rangeValue(value: number[]) {
    this._model.rangeValue = value;
  }

  get step(): number {
    return this._model.step;
  }

  set step(value: number) {
    this._model.step = value;
  }

  get isVertical(): boolean {
    return this._model.isVertical;
  }

  set isVertical(vertical: boolean) {
    this._model.isVertical = vertical;
  }
}

export { Facade };
