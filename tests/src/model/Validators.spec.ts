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

  describe('test verifyValue function', () => {
    it('if step is bigger than remained segment, the handler should not move', () => {
      const {
        newValue, index, currentValues, min, max, step,
      } = testOptions;
      const modulus = (max - min) % step;
      expect(Validators.verifyValue(newValue, index, currentValues, min, max, step)).toEqual(max - modulus);
    });
    it('if min is less than 0 and step is bigger than remained segment, the handler should not move', () => {
      let {
        newValue, index, currentValues, min, max, step,
      } = testOptions;
      min = -4;
      const modulus = (max - min) % step;
      expect(Validators.verifyValue(newValue, index, currentValues, min, max, step)).toEqual(max - modulus);
    });

    it('if min is less than 0, newValue < currentValues[index] and shift < 0 value should be counted with Math.round', () => {
      let {
        newValue, index, currentValues, min, max, step,
      } = testOptions;
      min = -4;
      newValue = -3;
      const shift = Math.abs(min) - Math.round(Math.abs(min) / step) * step;
      expect(Validators.verifyValue(newValue, index, currentValues, min, max, step)).toEqual(Math.round(newValue / step) * step - shift);
    });

    it('if min is less than 0, newValue < currentValues[index] and shift >= 0 value should be counted with Math.round', () => {
      let {
        newValue, index, currentValues, min, max, step,
      } = testOptions;
      min = -5;
      newValue = -3;
      const shift = Math.abs(min) - Math.round(Math.abs(min) / step) * step;
      expect(Validators.verifyValue(newValue, index, currentValues, min, max, step)).toEqual(Math.ceil(newValue / step) * step - shift);
    });

    it('if min is less than 0 and newValue > currentValues[index] value should be counted with Math.floor', () => {
      let {
        newValue, index, currentValues, min, max, step,
      } = testOptions;
      min = -4;
      const shift = Math.abs(min) - Math.round(Math.abs(min) / step) * step;
      expect(Validators.verifyValue(newValue, index, currentValues, min, max, step)).toEqual(Math.floor(newValue / step) * step - shift);
    });

    it('if selected segment is not divided evenly by step, the value should be adjusted on min limit', () => {
      let {
        newValue, index, currentValues, min, max, step,
      } = testOptions;
      step = 4;
      expect(Validators.verifyValue(newValue, index, currentValues, min, max, step)).toEqual(Math.round(newValue / step) * step + min);
    });
  });

  describe('test verifyStep function', () => {
    let {
      min, max, step,
    } = testOptions;

    it('step should not be bigger than max - min', () => {
      step = 20;
      expect(Validators.verifyStep(step, min, max)).toEqual(max - min);
    });
    it('step should not be less than 1', () => {
      step = -1;
      expect(Validators.verifyStep(step, min, max)).toEqual(1);
    });
  });
});
