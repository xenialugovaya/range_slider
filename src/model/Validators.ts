export default class Validators {
  public static isValidNumber(value: number): boolean {
    return Number.isFinite(value);
  }

  public static isBoolean(value: boolean): boolean {
    return typeof value === 'boolean';
  }

  public static verifyValue(newValue: number, index: number, currentValues: number[], min: number, max: number, step: number): number {
    let checkedValue;
    const modulus = (max - min) % step;
    if (modulus > 0 && (newValue + min) > max - modulus) {
      checkedValue = max - modulus;
      return checkedValue;
    }
    if (min < 0) {
      if (modulus > 0 && newValue > max - modulus) {
        checkedValue = max - modulus;
        return checkedValue;
      }
      const shift = Math.abs(min) - Math.round(Math.abs(min) / step) * step;
      if (newValue < currentValues[index]) {
        checkedValue = Math.ceil(newValue / step) * step - shift;
      } else {
        checkedValue = Math.floor(newValue / step) * step - shift;
      }
      return checkedValue;
    }
    if (newValue === currentValues[0] || newValue === currentValues[1]) {
      checkedValue = newValue;
      return checkedValue;
    }
    if (newValue < currentValues[index]) {
      checkedValue = Math.ceil(newValue / step) * step + min;
    } else {
      checkedValue = Math.floor(newValue / step) * step + min;
    }
    return checkedValue;
  }

  public static verifyMinMaxValues(values: number []): number [] {
    const checkedValues = values;
    if (checkedValues[0] > checkedValues[1]) {
      [checkedValues[0], checkedValues[1]] = [checkedValues[1], checkedValues[0]];
    }
    return checkedValues;
  }

  public static verifyLimits(value: number, min: number, max: number): number {
    let checkedValue = value;
    if (checkedValue < min) {
      checkedValue = min;
    } if (checkedValue > max) {
      checkedValue = max;
    }
    return checkedValue;
  }

  public static verifyStep(step: number, min: number, max: number): number {
    const maxStep = max - min;
    if (step > maxStep) {
      return maxStep;
    } if (step <= 0) {
      return 1;
    }
    return step;
  }
}