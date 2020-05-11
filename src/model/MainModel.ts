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
    if (this.minValue > this.maxValue) {
      return this.maxValue;
    }
    return this.minValue;
  }

  setMin(min: number): void {
    this.minValue = min;
    this.notifyPresenter({
      min: this.getMin(),
      max: this.getMax(),
      values: this.getValues(),
      step: this.getStep(),
    });
  }

  getMax(): number {
    if (this.maxValue < this.minValue) {
      return this.minValue;
    }
    if (this.maxValue === this.minValue) {
      return this.maxValue + this.stepValue;
    }
    return this.maxValue;
  }

  setMax(max: number): void {
    this.maxValue = max;
    this.notifyPresenter({
      min: this.getMin(),
      max: this.getMax(),
      values: this.getValues(),
      step: this.getStep(),
    });
  }

  getStep(): number {
    this.stepValue = this.verifyStep(this.stepValue);
    return this.stepValue;
  }

  setStep(step: number): void {
    this.stepValue = this.verifyStep(step);
    this.notifyPresenter({
      step: this.getStep(),
      values: this.getValues(),
    });
  }

  getValues(): number[] {
    this.values = this.values.map((value) => this.verifyValue(value));
    this.verifyMinMaxValues();
    this.verifyLimits();
    return this.values;
  }

  setValues(values: number[]): void {
    values.forEach((value, index) => {
      if (value !== this.values[index]) {
        this.values[index] = this.verifyValue(value);
      }
    });
    this.verifyMinMaxValues();
    this.verifyLimits();
    this.notifyPresenter({
      values: this.values,
    });
  }

  getOrientation(): boolean {
    return this.vertical;
  }

  setOrientation(vertical: boolean): void {
    this.vertical = vertical;
    this.notifyPresenter({
      values: this.getValues(),
      isVertical: this.getOrientation(),
    });
  }

  getRange(): boolean {
    return this.range;
  }

  setRange(range: boolean): void {
    this.range = range;
    this.notifyPresenter({
      values: this.getValues(),
      hasRange: this.getRange(),
    });
  }

  getLabels(): boolean {
    return this.labels;
  }

  setLabels(label: boolean): void {
    this.labels = label;
    this.notifyPresenter({
      hasLabels: this.getLabels(),
    });
  }

  verifyValue(value: number): number {
    let checkedValue;
    const modulus = (this.getMax() - this.getMin()) % this.stepValue;
    if (modulus > 0 && (value + this.getMin()) > this.getMax() - modulus) {
      checkedValue = this.getMax() - modulus;
      return checkedValue;
    }
    if (this.getMin() < 0) {
      if (modulus > 0 && value > this.getMax() - modulus) {
        checkedValue = this.getMax() - modulus;
        return checkedValue;
      }
      const shift = Math.abs(this.getMin()) - Math.round(Math.abs(this.getMin()) / this.stepValue) * this.stepValue;
      checkedValue = Math.round(value / this.stepValue) * this.stepValue - shift;
      return checkedValue;
    }
    if (value === this.values[0] || value === this.values[1]) {
      return value;
    }
    checkedValue = Math.round(value / this.stepValue) * this.stepValue + this.getMin();
    return checkedValue;
  }

  verifyMinMaxValues(): void {
    if (this.values[0] > this.values[1]) {
      [this.values[0], this.values[1]] = [this.values[1], this.values[0]];
    }
  }

  verifyLimits(): void {
    this.values = this.values.map((value) => (value < this.getMin() ? this.getMin() : value > this.getMax() ? this.getMax() : value));
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
