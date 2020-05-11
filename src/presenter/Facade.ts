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

  get parent(): HTMLElement {
    return this.presenter.parent;
  }

  get minMax(): number[] {
    return [this.model.getMin(), this.model.getMax()];
  }

  set minMax(value: number[]) {
    this.model.setMin(value[0]);
    this.model.setMax(value[1]);
  }

  get rangeValue(): number[] {
    return this.model.getValues();
  }

  set rangeValue(values: number[]) {
    this.model.setValues(values);
  }

  get step(): number {
    return this.model.getStep();
  }

  set step(value: number) {
    this.model.setStep(value);
  }

  get isVertical(): boolean {
    return this.model.getOrientation();
  }

  set isVertical(vertical: boolean) {
    this.model.setOrientation(vertical);
  }

  get hasRange(): boolean {
    return this.model.getRange();
  }

  set hasRange(range: boolean) {
    this.model.setRange(range);
  }

  get hasLabels(): boolean {
    return this.model.getLabels();
  }

  set hasLabels(label: boolean) {
    this.model.setLabels(label);
  }
}
