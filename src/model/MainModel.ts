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
    if (this.minValue > this.maxValue) {
      return this.maxValue;
    }
    return this.minValue;
  }

  set min(min: number) {
    this.minValue = min;
    this.notifyPresenter({
      min: this.min,
      max: this.max,
      values: this.verifyValues(this.rangeValue),
      step: this.step,
    });
  }

  get max(): number {
    if (this.maxValue < this.minValue) {
      return this.minValue;
    }
    if (this.maxValue === this.minValue) {
      return this.maxValue + this.stepValue;
    }
    return this.maxValue;
  }

  set max(max: number) {
    this.maxValue = max;
    this.notifyPresenter({
      min: this.min,
      max: this.max,
      values: this.verifyValues(this.rangeValue),
      step: this.step,
    });
  }

  get step(): number {
    this.stepValue = this.verifyStep(this.stepValue);
    return this.stepValue;
  }

  set step(step: number) {
    this.stepValue = this.verifyStep(step);
    this.notifyPresenter({
      step: this.step,
      values: this.verifyValues(this.rangeValue),
    });
  }

  get rangeValue(): number[] {
    return this.values;
  }

  set rangeValue(values: number[]) {
    values.forEach((value, index) => {
      if (value !== this.values[index]) {
        this.values[index] = this.verifyValue(value);
        console.log(this.verifyValue(value));
      }
    });
    this.verifyMinMaxValues();
    this.verifyLimits();
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
      values: this.verifyValues(this.rangeValue),
      isVertical: this.vertical,
    });
  }

  get hasRange(): boolean {
    return this.range;
  }

  set hasRange(range: boolean) {
    this.range = range;
    this.notifyPresenter({
      values: this.verifyValues(this.rangeValue),
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

  verifyValues(values: number[]): number[] {
    let checkedValues = [];

    checkedValues = values.map((value) => {
      const modulus = (this.max - this.min) % this.stepValue;
      if (modulus > 0 && value > this.max - modulus) {
        return this.max - modulus;
      }
      if (this.min < 0) {
        const shift = Math.abs(this.min) - Math.round(Math.abs(this.min) / this.stepValue) * this.stepValue;
        return Math.round(value / this.stepValue) * this.stepValue - shift;
      }
      return Math.round(value / this.stepValue) * this.stepValue + this.min;
    });

    if (checkedValues[0] > checkedValues[1]) [checkedValues[0], checkedValues[1]] = [checkedValues[1], checkedValues[0]];

    checkedValues = checkedValues.map((value) => (value < this.min ? this.min : value > this.max ? this.max : value));

    return checkedValues;
  }

  verifyValue(value: number): number {
    let checkedValue;
    const modulus = (this.max - this.min) % this.stepValue;
    if (modulus > 0 && value > this.max - modulus) {
      checkedValue = this.max - modulus;
      return checkedValue;
    }
    if (this.min < 0) {
      const shift = Math.abs(this.min) - Math.round(Math.abs(this.min) / this.stepValue) * this.stepValue;
      checkedValue = Math.round(value / this.stepValue) * this.stepValue - shift;
      return checkedValue;
    }
    checkedValue = Math.round(value / this.stepValue) * this.stepValue + this.min;
    return checkedValue;
  }

  verifyMinMaxValues(): void {
    if (this.values[0] > this.values[1]) {
      [this.values[0], this.values[1]] = [this.values[1], this.values[0]];
    }
  }

  verifyLimits(): void {
    this.values = this.values.map((value) => (value < this.min ? this.min : value > this.max ? this.max : value));
  }

  verifyStep(step: number): number {
    const maxStep = this.max - this.min;
    if (step > maxStep) {
      return maxStep;
    } if (step <= 0) {
      return 1;
    }
    return step;
  }
}
