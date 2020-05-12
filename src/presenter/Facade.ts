import MainModel from '../model/MainModel';
import Presenter from './Presenter';
import { sliderOptions } from '../model/sliderOptions';
import EventObserver from '../observer/observer';

export default class Facade {
  private model: MainModel;

  private presenter: Presenter;

  public observer: EventObserver;

  constructor(parent: HTMLElement, options: sliderOptions) {
    this.observer = new EventObserver();
    this.model = new MainModel(options);
    this.presenter = new Presenter(parent, this.model);
    this.updateValues();
  }

  updateValues(): void {
    this.model.observer.subscribe((valueData: sliderOptions) => {
      this.observer.broadcast(valueData);
    });
  }

  getParent(): HTMLElement {
    return this.presenter.getParent();
  }

  getMinMax(): number[] {
    return [this.model.getMin(), this.model.getMax()];
  }

  setMinMax(value: number[]) {
    this.model.setMin(value[0]);
    this.model.setMax(value[1]);
  }

  getValues(): number[] {
    return this.model.getValues();
  }

  setValues(values: number[]) {
    this.model.setValues(values);
  }

  getStep(): number {
    return this.model.getStep();
  }

  setStep(value: number) {
    this.model.setStep(value);
  }

  getOrientation(): boolean {
    return this.model.getOrientation();
  }

  setOrientation(vertical: boolean) {
    this.model.setOrientation(vertical);
  }

  getRange(): boolean {
    return this.model.getRange();
  }

  setRange(range: boolean) {
    this.model.setRange(range);
  }

  getLabels(): boolean {
    return this.model.getLabels();
  }

  setLabels(label: boolean) {
    this.model.setLabels(label);
  }
}
