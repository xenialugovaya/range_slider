import MainModel from '../model/MainModel';
import MainView from '../view/MainView';
import { sliderOptions } from '../model/sliderOptions';

export default class Presenter {
  private model!: MainModel;

  private view!: MainView;

  private parent!: HTMLElement;

  constructor(parent: HTMLElement, model: MainModel) {
    this.init(parent, model);
  }

  private init(parent: HTMLElement, model: MainModel): void {
    this.model = model;
    this.parent = parent;
    this.view = new MainView(
      this.parent,
      this.model.getRange(),
      this.model.getOrientation(),
      this.model.getMin(),
      this.model.getMax(),
      this.model.getValues(),
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
    return this.parent;
  }
}
