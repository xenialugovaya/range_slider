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
    return [this.model.min, this.model.max];
  }

  set minMax(value: number[]) {
    [this.model.min, this.model.max] = value;
  }

  get rangeValue(): number[] {
    return this.model.rangeValue;
  }

  set rangeValue(value: number[]) {
    this.model.rangeValue = value;
  }

  get step(): number {
    return this.model.step;
  }

  set step(value: number) {
    this.model.step = value;
  }

  get isVertical(): boolean {
    return this.model.isVertical;
  }

  set isVertical(vertical: boolean) {
    this.model.isVertical = vertical;
  }

  get hasRange(): boolean {
    return this.model.hasRange;
  }

  set hasRange(range: boolean) {
    this.model.hasRange = range;
  }

  get hasLabels(): boolean {
    return this.model.hasLabels;
  }

  set hasLabels(label: boolean) {
    this.model.hasLabels = label;
  }
}
