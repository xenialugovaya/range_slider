import EventObserver from '../observer/observer';
import { sliderOptions } from './sliderOptions';
import { definedOptions } from './definedOptions';
import Validators from './Validators';

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
    const {
      min, max, values, isVertical, step, hasRange, hasLabels,
    } = valueData;
    if (min !== undefined) this.setMin(min);
    if (max !== undefined) this.setMax(max);
    if (values !== undefined) this.setValues(values);
    if (isVertical !== undefined) this.setOrientation(isVertical);
    if (step !== undefined) this.setStep(step);
    if (hasRange !== undefined) this.setRange(hasRange);
    if (hasLabels !== undefined) this.setLabels(hasLabels);
  }

  public getOptions(): definedOptions {
    return this.options;
  }

  public getMin(): number {
    if (this.options.min > this.options.max) {
      [this.options.max, this.options.min] = [this.options.min, this.options.max];
    }
    return this.options.min;
  }

  public setMin(min: number): void {
    if (Validators.isValidNumber(min)) {
      this.options.min = min;
    } else {
      this.options.min = 0;
    }
    this.broadcastUpdates({
      min: this.getMin(),
      max: this.getMax(),
      values: this.getValues(),
      step: this.getStep(),
    });
  }

  public getMax(): number {
    if (this.options.max < this.options.min) {
      [this.options.max, this.options.min] = [this.options.min, this.options.max];
    }
    if (this.options.max === this.options.min) {
      return this.options.max + this.options.step;
    }
    return this.options.max;
  }

  public setMax(max: number): void {
    if (Validators.isValidNumber(max)) {
      this.options.max = max;
    } else {
      this.options.max = 0;
    }
    this.broadcastUpdates({
      min: this.getMin(),
      max: this.getMax(),
      values: this.getValues(),
      step: this.getStep(),
    });
  }

  public getStep(): number {
    this.options.step = Validators.verifyStep(this.options.step, this.getMin(), this.getMax());
    return this.options.step;
  }

  public setStep(step: number): void {
    if (Validators.isValidNumber(step)) {
      this.options.step = Validators.verifyStep(step, this.getMin(), this.getMax());
    } else {
      this.options.step = 1;
    }
    this.broadcastUpdates({
      step: this.getStep(),
      values: this.getValues(),
    });
  }

  public getValues(): number[] {
    this.options.values = this.options.values.map((value, index) => {
      const options = {
        newValue: value,
        index,
        currentValues: this.options.values,
        min: this.getMin(),
        max: this.getMax(),
        step: this.getStep(),
      };
      return Validators.verifyValue(options);
    });
    this.options.values = this.options.values.map((value) => Validators.verifyLimits(value, this.getMin(), this.getMax()));
    this.options.values = Validators.verifyMinMaxValues(this.options.values, this.options.hasRange);
    return this.options.values;
  }

  public setValues(values: number[]): void {
    let checkedValues = values.map((value) => {
      if (Validators.isValidNumber(value)) {
        return value;
      }
      return 0;
    });
    checkedValues = values.map((value, index) => {
      if (value !== this.options.values[index]) {
        const options = {
          newValue: value,
          index,
          currentValues: this.options.values,
          min: this.getMin(),
          max: this.getMax(),
          step: this.getStep(),
        };
        return Validators.verifyValue(options);
      }
      return value;
    });
    checkedValues = checkedValues.map((value) => Validators.verifyLimits(value, this.getMin(), this.getMax()));
    this.options.values = Validators.verifyMinMaxValues(checkedValues, this.options.hasRange);
    this.broadcastUpdates({
      values: this.options.values,
    });
  }

  public getOrientation(): boolean {
    return this.options.isVertical;
  }

  public setOrientation(vertical: boolean): void {
    if (Validators.isBoolean(vertical)) {
      this.options.isVertical = vertical;
    } else {
      this.options.isVertical = Boolean(vertical);
    }
    this.broadcastUpdates({
      values: this.getValues(),
      isVertical: this.getOrientation(),
    });
  }

  public getRange(): boolean {
    return this.options.hasRange;
  }

  public setRange(range: boolean): void {
    if (Validators.isBoolean(range)) {
      this.options.hasRange = range;
    } else {
      this.options.hasRange = Boolean(range);
    }
    this.broadcastUpdates({
      values: this.getValues(),
      hasRange: this.getRange(),
    });
  }

  public getLabels(): boolean {
    return this.options.hasLabels;
  }

  public setLabels(label: boolean): void {
    if (Validators.isBoolean(label)) {
      this.options.hasLabels = label;
    } else {
      this.options.hasLabels = Boolean(label);
    }
    this.broadcastUpdates({
      hasLabels: this.getLabels(),
    });
  }

  private init(options: sliderOptions): void {
    const {
      min, max, values, isVertical, step, hasRange, hasLabels,
    } = options;
    if (max !== undefined) this.setMax(max);
    if (min !== undefined) this.setMin(min);
    if (step !== undefined) this.setStep(step);
    if (values !== undefined) {
      if (values.length === 1) values.push(values[0] + 1);
      this.setValues(values);
    }
    if (hasRange !== undefined) this.setRange(hasRange);
    if (isVertical !== undefined) this.setOrientation(isVertical);
    if (hasLabels !== undefined) this.setLabels(hasLabels);
  }

  private broadcastUpdates(valueData: sliderOptions): void {
    this.observer.broadcast(valueData);
  }
}
