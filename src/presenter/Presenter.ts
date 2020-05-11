import MainModel from '../model/MainModel';
import MainView from '../view/MainView';
import { sliderOptions } from '../model/sliderOptions';

export default class Presenter {
  private model: MainModel;

  private view: MainView;

  private values: number[];

  private parentNode: HTMLElement;

  constructor(parent: HTMLElement, model: MainModel) {
    this.model = model;
    this.values = this.model.getValues();
    this.parentNode = parent;
    this.view = new MainView(
      this.parentNode,
      this.model.getRange(),
      this.model.getOrientation(),
      this.model.getMin(),
      this.model.getMax(),
      this.values,
      this.model.getLabels(),
    );
    this.updateModel();
    this.updateView();
  }

  private updateModel(): void {
    this.view.observer.subscribe((valueData: sliderOptions) => {
      this.model.update(valueData);
    });
  }

  private updateView(): void {
    this.model.observer.subscribe((valueData: sliderOptions) => {
      this.view.update(valueData);
    });
  }

  getParent(): HTMLElement {
    return this.parentNode;
  }
}
