import EventObserver from '../observer/observer';
import { sliderOptions } from './sliderOptions';

export default class MainModel {
  public observer = new EventObserver();

  private options = {
    min: 0,
    max: 100,
    step: 1,
    values: [10, 20],
    isVertical: false,
    hasRange: true,
    hasLabels: true,
  }

  constructor(options: sliderOptions) {
    this.init(options);
  }

  private init(options: sliderOptions): void {
    this.options.max = options.max ? options.max : this.options.max;
    this.options.min = options.min ? options.min : this.options.min;
    this.options.step = options.step ? options.step : this.options.step;
    this.options.values = options.values ? options.values : this.options.values;
    this.options.hasRange = options.hasRange ? options.hasRange : this.options.hasRange;
    this.options.isVertical = options.isVertical ? options.isVertical : this.options.isVertical;
    this.options.hasLabels = options.hasLabels ? options.hasLabels : this.options.hasLabels;
  }

  update(valueData: sliderOptions): void {
    if (valueData.min !== undefined) this.setMin(valueData.min);
    if (valueData.max) this.setMax(valueData.max);
    if (valueData.values) this.setValues(valueData.values);
    if (valueData.isVertical !== undefined) this.setOrientation(valueData.isVertical);
    if (valueData.step) this.setStep(valueData.step);
    if (valueData.hasRange !== undefined) this.setRange(valueData.hasRange);
    if (valueData.hasLabels !== undefined) this.setLabels(valueData.hasLabels);
  }

  notifyPresenter(valueData: sliderOptions): void {
    this.observer.broadcast(valueData);
  }

  getMin(): number {
    if (this.options.min > this.options.max) {
      return this.options.max;
    }
    return this.options.min;
  }

  setMin(min: number): void {
    this.options.min = min;
    this.notifyPresenter({
      min: this.getMin(),
      max: this.getMax(),
      values: this.getValues(),
      step: this.getStep(),
    });
  }

  getMax(): number {
    if (this.options.max < this.options.min) {
      return this.options.min;
    }
    if (this.options.max === this.options.min) {
      return this.options.max + this.options.step;
    }
    return this.options.max;
  }

  setMax(max: number): void {
    this.options.max = max;
    this.notifyPresenter({
      min: this.getMin(),
      max: this.getMax(),
      values: this.getValues(),
      step: this.getStep(),
    });
  }

  getStep(): number {
    this.options.step = this.verifyStep(this.options.step);
    return this.options.step;
  }

  setStep(step: number): void {
    this.options.step = this.verifyStep(step);
    this.notifyPresenter({
      step: this.getStep(),
      values: this.getValues(),
    });
  }

  getValues(): number[] {
    this.options.values = this.options.values.map((value) => this.verifyValue(value));
    this.verifyMinMaxValues();
    this.verifyLimits();
    return this.options.values;
  }

  setValues(values: number[]): void {
    values.forEach((value, index) => {
      if (value !== this.options.values[index]) {
        this.options.values[index] = this.verifyValue(value);
      }
    });
    this.verifyMinMaxValues();
    this.verifyLimits();
    this.notifyPresenter({
      values: this.options.values,
    });
  }

  getOrientation(): boolean {
    return this.options.isVertical;
  }

  setOrientation(vertical: boolean): void {
    this.options.isVertical = vertical;
    this.notifyPresenter({
      values: this.getValues(),
      isVertical: this.getOrientation(),
    });
  }

  getRange(): boolean {
    return this.options.hasRange;
  }

  setRange(range: boolean): void {
    this.options.hasRange = range;
    this.notifyPresenter({
      values: this.getValues(),
      hasRange: this.getRange(),
    });
  }

  getLabels(): boolean {
    return this.options.hasLabels;
  }

  setLabels(label: boolean): void {
    this.options.hasLabels = label;
    this.notifyPresenter({
      hasLabels: this.getLabels(),
    });
  }

  verifyValue(value: number): number {
    let checkedValue;
    const modulus = (this.getMax() - this.getMin()) % this.options.step;
    if (modulus > 0 && (value + this.getMin()) > this.getMax() - modulus) {
      checkedValue = this.getMax() - modulus;
      return checkedValue;
    }
    if (this.getMin() < 0) {
      if (modulus > 0 && value > this.getMax() - modulus) {
        checkedValue = this.getMax() - modulus;
        return checkedValue;
      }
      const shift = Math.abs(this.getMin()) - Math.round(Math.abs(this.getMin()) / this.options.step) * this.options.step;
      checkedValue = Math.round(value / this.options.step) * this.options.step - shift;
      return checkedValue;
    }
    if (value === this.options.values[0] || value === this.options.values[1]) {
      return value;
    }
    checkedValue = Math.round(value / this.options.step) * this.options.step + this.getMin();
    return checkedValue;
  }

  verifyMinMaxValues(): void {
    if (this.options.values[0] > this.options.values[1]) {
      [this.options.values[0], this.options.values[1]] = [this.options.values[1], this.options.values[0]];
    }
  }

  verifyLimits(): void {
    this.options.values = this.options.values.map((value) => (value < this.getMin() ? this.getMin() : value > this.getMax() ? this.getMax() : value));
  }

  verifyStep(step: number): number {
    const maxStep = this.getMax() - this.getMin();
    if (step > maxStep) {
      return maxStep;
    } if (step <= 0) {
      return 1;
    }
    return step;
  }
}
