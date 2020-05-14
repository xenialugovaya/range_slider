import MainModel from '../model/MainModel';
import Presenter from './Presenter';
import { sliderOptions } from '../model/sliderOptions';
import EventObserver from '../observer/observer';

export default class Facade {
  private model!: MainModel;

  private presenter!: Presenter;

  public observer = new EventObserver();

  constructor(parent: HTMLElement, options: sliderOptions) {
    this.init(parent, options);
  }

  public updateValues(): void {
    this.model.observer.subscribe((valueData: sliderOptions) => {
      this.observer.broadcast(valueData);
    });
  }

  public getParent(): HTMLElement {
    return this.presenter.getParent();
  }

  public getMinMax(): number[] {
    return [this.model.getMin(), this.model.getMax()];
  }

  public setMinMax(value: number[]): void {
    this.model.setMin(value[0]);
    this.model.setMax(value[1]);
  }

  public getValues(): number[] {
    return this.model.getValues();
  }

  public setValues(values: number[]): void {
    this.model.setValues(values);
  }

  public getStep(): number {
    return this.model.getStep();
  }

  public setStep(value: number): void {
    this.model.setStep(value);
  }

  public getOrientation(): boolean {
    return this.model.getOrientation();
  }

  public setOrientation(vertical: boolean): void {
    this.model.setOrientation(vertical);
  }

  public getRange(): boolean {
    return this.model.getRange();
  }

  public setRange(range: boolean): void {
    this.model.setRange(range);
  }

  public getLabels(): boolean {
    return this.model.getLabels();
  }

  public setLabels(label: boolean): void {
    this.model.setLabels(label);
  }

  private init(parent: HTMLElement, options: sliderOptions): void {
    this.model = new MainModel(options);
    this.presenter = new Presenter(parent, this.model);
    this.updateValues();
  }
}
