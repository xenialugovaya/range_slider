import EventObserver from '../observer/observer';
import { sliderOptions } from './sliderOptions';
import { definedOptions } from './definedOptions';

export default class MainModel {
  public observer = new EventObserver();

  private options: definedOptions = {
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

  public update(valueData: sliderOptions): void {
    if (valueData.min !== undefined) this.setMin(valueData.min);
    if (valueData.max !== undefined) this.setMax(valueData.max);
    if (valueData.values !== undefined) this.setValues(valueData.values);
    if (valueData.isVertical !== undefined) this.setOrientation(valueData.isVertical);
    if (valueData.step !== undefined) this.setStep(valueData.step);
    if (valueData.hasRange !== undefined) this.setRange(valueData.hasRange);
    if (valueData.hasLabels !== undefined) this.setLabels(valueData.hasLabels);
  }

  public getOptions(): definedOptions {
    return this.options;
  }

  public getMin(): number {
    if (this.options.min > this.options.max) {
      return this.options.max;
    }
    return this.options.min;
  }

  public setMin(min: number): void {
    const minNotNaN = this.verifyValueIsNotNaN(min);
    this.options.min = minNotNaN;
    this.broadcastUpdates({
      min: this.getMin(),
      max: this.getMax(),
      values: this.getValues(),
      step: this.getStep(),
    });
  }

  public getMax(): number {
    if (this.options.max < this.options.min) {
      return this.options.min;
    }
    if (this.options.max === this.options.min) {
      return this.options.max + this.options.step;
    }
    return this.options.max;
  }

  public setMax(max: number): void {
    const maxNotNaN = this.verifyValueIsNotNaN(max);
    this.options.max = maxNotNaN;
    this.broadcastUpdates({
      min: this.getMin(),
      max: this.getMax(),
      values: this.getValues(),
      step: this.getStep(),
    });
  }

  public getStep(): number {
    this.options.step = this.verifyStep(this.options.step);
    return this.options.step;
  }

  public setStep(step: number): void {
    const stepNotNaN = this.verifyValueIsNotNaN(step);
    this.options.step = this.verifyStep(stepNotNaN);
    this.broadcastUpdates({
      step: this.getStep(),
      values: this.getValues(),
    });
  }

  public getValues(): number[] {
    this.options.values = this.options.values.map((value) => this.verifyValue(value));
    this.verifyMinMaxValues();
    this.verifyLimits();
    return this.options.values;
  }

  public setValues(values: number[]): void {
    const valuesNotNaN = values.map((value) => this.verifyValueIsNotNaN(value));
    valuesNotNaN.forEach((value, index) => {
      if (value !== this.options.values[index]) {
        this.options.values[index] = this.verifyValue(value);
      }
    });
    this.verifyMinMaxValues();
    this.verifyLimits();
    this.broadcastUpdates({
      values: this.options.values,
    });
  }

  public getOrientation(): boolean {
    return this.options.isVertical;
  }

  public setOrientation(vertical: boolean): void {
    this.options.isVertical = vertical;
    this.broadcastUpdates({
      values: this.getValues(),
      isVertical: this.getOrientation(),
    });
  }

  public getRange(): boolean {
    return this.options.hasRange;
  }

  public setRange(range: boolean): void {
    this.options.hasRange = range;
    this.broadcastUpdates({
      values: this.getValues(),
      hasRange: this.getRange(),
    });
  }

  public getLabels(): boolean {
    return this.options.hasLabels;
  }

  public setLabels(label: boolean): void {
    this.options.hasLabels = label;
    this.broadcastUpdates({
      hasLabels: this.getLabels(),
    });
  }

  private init(options: sliderOptions): void {
    if (options.max !== undefined) {
      this.setMax(options.max);
    } else {
      this.setMax(this.options.max);
    }
    if (options.min !== undefined) {
      this.setMin(options.min);
    } else {
      this.setMin(this.options.min);
    }
    if (options.step !== undefined) {
      this.setStep(options.step);
    } else {
      this.setStep(this.options.step);
    }
    if (options.values !== undefined) {
      this.setValues(options.values);
    } else {
      this.setValues(this.options.values);
    }
    if (options.hasRange !== undefined) {
      this.setRange(options.hasRange);
    } else {
      this.setRange(this.options.hasRange);
    }
    if (options.isVertical !== undefined) {
      this.setOrientation(options.isVertical);
    } else {
      this.setOrientation(this.options.isVertical);
    }
    if (options.hasLabels !== undefined) {
      this.setLabels(options.hasLabels);
    } else {
      this.setLabels(this.options.hasLabels);
    }
  }

  private verifyValueIsNotNaN(value: number) {
    if (Number.isNaN(value)) {
      value = 0;
    }
    return value;
  }

  private verifyValue(value: number): number {
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

  private verifyMinMaxValues(): void {
    if (this.options.values[0] > this.options.values[1]) {
      [this.options.values[0], this.options.values[1]] = [this.options.values[1], this.options.values[0]];
    }
  }

  private verifyLimits(): void {
    this.options.values = this.options.values.map((value) => (value < this.getMin() ? this.getMin() : value > this.getMax() ? this.getMax() : value));
  }

  private verifyStep(step: number): number {
    const maxStep = this.getMax() - this.getMin();
    if (step > maxStep) {
      return maxStep;
    } if (step <= 0) {
      return 1;
    }
    return step;
  }

  private broadcastUpdates(valueData: sliderOptions): void {
    this.observer.broadcast(valueData);
  }
}
