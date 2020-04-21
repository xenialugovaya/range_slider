import EventObserver from '../observer/observer';
import { sliderOptions } from './sliderOptions';

export default class MainModel {
  public observer: EventObserver;

  private minValue = 0;

  private maxValue = 100;

  private stepValue = 1;

  private values = [10, 20];

  private vertical = false;

  private range = true;

  private labels = true;

  constructor(options: sliderOptions) {
    this.observer = new EventObserver();
    this.minValue = options.min ? options.min : this.minValue;
    this.maxValue = options.max ? options.max : this.maxValue;
    this.stepValue = options.step ? options.step : this.stepValue;
    this.values = options.values ? options.values : this.values;
    this.range = options.hasRange ? options.hasRange : this.range;
    this.vertical = options.isVertical ? options.isVertical : this.vertical;
    this.labels = options.hasLabels ? options.hasLabels : this.labels;
  }

  update(valueData: sliderOptions): void {
    if (valueData.min !== undefined) this.min = valueData.min;
    if (valueData.max) this.max = valueData.max;
    if (valueData.values) this.rangeValue = valueData.values;
    if (valueData.isVertical !== undefined) this.isVertical = valueData.isVertical;
    if (valueData.step) this.step = valueData.step;
    if (valueData.hasRange !== undefined) this.hasRange = valueData.hasRange;
    if (valueData.hasLabels !== undefined) this.hasLabels = valueData.hasLabels;
  }

  notifyPresenter(valueData: sliderOptions): void {
    this.observer.broadcast(valueData);
  }

  get min(): number {
    if (this.minValue < this.maxValue) {
      return Math.round(this.minValue / this.stepValue) * this.stepValue;
    }
    return Math.round(this.maxValue / this.stepValue) * this.stepValue;
  }

  set min(min: number) {
    this.minValue = min;
    this.notifyPresenter({
      min: this.minValue,
      max: this.maxValue,
      values: this.rangeValue,
    });
  }

  get max(): number {
    if (this.maxValue < this.minValue) {
      return Math.round(this.minValue / this.stepValue) * this.stepValue;
    }
    return Math.round(this.maxValue / this.stepValue) * this.stepValue;
  }

  set max(max: number) {
    this.maxValue = max;
    this.notifyPresenter({
      min: this.minValue,
      max: this.maxValue,
      values: this.rangeValue,
    });
  }

  get step(): number {
    return this.stepValue;
  }

  set step(step: number) {
    this.stepValue = step;
    this.notifyPresenter({
      step: this.stepValue,
      values: this.rangeValue,
    });
  }

  get rangeValue(): number[] {
    return this.calcValues(this.values);
  }

  set rangeValue(values: number[]) {
    this.values = values;
    this.notifyPresenter({
      values: this.rangeValue,
    });
  }

  get isVertical(): boolean {
    return this.vertical;
  }

  set isVertical(vertical: boolean) {
    this.vertical = vertical;
    this.notifyPresenter({
      values: this.rangeValue,
      isVertical: this.vertical,
    });
  }

  get hasRange(): boolean {
    return this.range;
  }

  set hasRange(range: boolean) {
    this.range = range;
    this.notifyPresenter({
      values: this.rangeValue,
      hasRange: this.range,
    });
  }

  get hasLabels(): boolean {
    return this.labels;
  }

  set hasLabels(label: boolean) {
    this.labels = label;
    this.notifyPresenter({
      values: this.rangeValue,
      hasLabels: this.labels,
    });
  }

  // check that values of handlers are within min and max
  // check that value 0 is less than value 1 for range
  calcValues(values: number[]): number[] {
    let checkedValues = values.map((value) => Math.round(value / this.stepValue) * this.stepValue);

    if (checkedValues[0] > checkedValues[1]) [checkedValues[0], checkedValues[1]] = [checkedValues[1], checkedValues[0]];

    if (checkedValues[0] === checkedValues[1]) checkedValues[1] += this.stepValue;

    checkedValues = checkedValues.map((value) => (value < this.minValue ? this.minValue : value > this.maxValue ? this.maxValue : value));

    return checkedValues;
  }
}
