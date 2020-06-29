import Validators from '../../../src/model/Validators';

describe('test Validators logic', () => {
  const testOptions = {
    newValue: 9,
    index: 0,
    currentValues: [1, 1],
    min: 1,
    max: 10,
    step: 5,
  };

  beforeEach(() => {
    testOptions.min = 1;
    testOptions.newValue = 9;
    testOptions.step = 5;
  });

  describe('test verifyValue function', () => {
    it('if step is bigger than remained segment, the handler should not move', () => {
      const { min, max, step } = testOptions;
      const modulus = (max - min) % step;
      expect(Validators.verifyValue(testOptions)).toEqual(max - modulus);
    });
    it('if min is less than 0 and step is bigger than remained segment, the handler should not move', () => {
      testOptions.min = -4;
      const { max, min, step } = testOptions;
      const modulus = (max - min) % step;
      expect(Validators.verifyValue(testOptions)).toEqual(max - modulus);
    });

    it('if min is less than 0, newValue < currentValues[index] and shift < 0 value should be counted with Math.round', () => {
      testOptions.min = -4;
      testOptions.newValue = -3;
      const { newValue, min, step } = testOptions;
      const shift = Math.abs(min) - Math.round(Math.abs(min) / step) * step;
      expect(Validators.verifyValue(testOptions)).toEqual(
        Math.round(newValue / step) * step - shift,
      );
    });

    it('if min is less than 0, newValue < currentValues[index] and shift >= 0 value should be counted with Math.round', () => {
      testOptions.min = -5;
      testOptions.newValue = -3;
      const { newValue, min, step } = testOptions;
      const shift = Math.abs(min) - Math.round(Math.abs(min) / step) * step;
      expect(Validators.verifyValue(testOptions)).toEqual(
        Math.ceil(newValue / step) * step - shift,
      );
    });

    it('if min is less than 0 and newValue > currentValues[index] value should be counted with Math.floor', () => {
      testOptions.min = -4;
      const { newValue, min, step } = testOptions;
      const shift = Math.abs(min) - Math.round(Math.abs(min) / step) * step;
      expect(Validators.verifyValue(testOptions)).toEqual(
        Math.floor(newValue / step) * step - shift,
      );
    });

    it('if selected segment is not divided evenly by step, the value should be adjusted on min limit', () => {
      testOptions.step = 4;
      const { newValue, min, step } = testOptions;
      expect(Validators.verifyValue(testOptions)).toEqual(Math.round(newValue / step) * step + min);
    });
  });

  describe('test verifyStep function', () => {
    it('step should not be bigger than max - min', () => {
      testOptions.step = 20;
      const { min, max, step } = testOptions;
      expect(Validators.verifyStep(step, min, max)).toEqual(max - min);
    });
    it('step should not be less than 1', () => {
      testOptions.step = -1;
      const { min, max, step } = testOptions;
      expect(Validators.verifyStep(step, min, max)).toEqual(1);
    });
  });
});
