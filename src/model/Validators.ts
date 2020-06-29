export default class Validators {
  public static isValidNumber(value: number): boolean {
    return Number.isFinite(value);
  }

  public static isBoolean(value: boolean): boolean {
    return typeof value === 'boolean';
  }

  public static verifyValue(options: {
    newValue: number;
    index: number;
    currentValues: number[];
    min: number;
    max: number;
    step: number;
  }): number {
    const { newValue, index, currentValues, min, max, step } = options;
    let checkedValue;
    const modulus = (max - min) % step;
    const handlerNotMoved = newValue === currentValues[0] || newValue === currentValues[1];
    if (handlerNotMoved) {
      checkedValue = newValue;
      return checkedValue;
    }
    if (min < 0) {
      const lastSectionIsSmallerThanStep = modulus > 0 && newValue > max - modulus;
      if (lastSectionIsSmallerThanStep) {
        checkedValue = max - modulus;
        return checkedValue;
      }
      const shift = Math.abs(min) - Math.round(Math.abs(min) / step) * step;
      checkedValue = Math.round(newValue / step) * step - shift;
      if (shift >= 0) {
        if (newValue < currentValues[index]) {
          checkedValue = Math.ceil(newValue / step) * step - shift;
        }
      } else if (newValue > currentValues[index]) {
        checkedValue = Math.floor(newValue / step) * step - shift;
      }
      return checkedValue;
    }
    const lastSectionIsSmallerThanStep = modulus > 0 && newValue + min > max - modulus;
    if (lastSectionIsSmallerThanStep) {
      checkedValue = max - modulus;
      return checkedValue;
    }
    checkedValue = Math.round(newValue / step) * step;
    if ((checkedValue - min) % step !== 0) {
      checkedValue += min;
    }
    return checkedValue;
  }

  public static verifyMinMaxValues(values: number[], range: boolean): number[] {
    const checkedValues = values;
    const minValueIsGreaterThanMaxValue = checkedValues[0] > checkedValues[1] && range;
    if (minValueIsGreaterThanMaxValue) {
      [checkedValues[0], checkedValues[1]] = [checkedValues[1], checkedValues[0]];
    }
    return checkedValues;
  }

  public static verifyLimits(value: number, min: number, max: number): number {
    let checkedValue = value;
    if (checkedValue < min) {
      checkedValue = min;
    }
    if (checkedValue > max) {
      checkedValue = max;
    }
    return checkedValue;
  }

  public static verifyStep(step: number, min: number, max: number): number {
    const maxStep = max - min;
    if (step > maxStep) {
      return maxStep;
    }
    if (step <= 0) {
      return 1;
    }
    return step;
  }
}
