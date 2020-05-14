import MainModel from '../../../src/model/MainModel';

describe('test model logic', () => {
  let model: MainModel = new MainModel({});
  beforeEach(() => {
    model = new MainModel({});
  });

  describe('test min/max limits', () => {
    it('functions get/set min are correct', () => {
      model.setMin(100);
      expect(model.getMin()).toEqual(Math.round(100 / 10) * 10);
    });
    it('functions get/set max are correct', () => {
      model.setMax(300);
      expect(model.getMax()).toEqual(Math.round(300 / 10) * 10);
    });
    it('if min is greater than max, max should be replaced by min value', () => {
      model.setMin(300);
      model.setMax(200);
      expect(model.getMax()).toEqual(Math.round(300 / 10) * 10);
      expect(model.getMin()).toEqual(Math.round(200 / 10) * 10);
    });
  });

  describe('values should be calculated correctly', () => {
    it('min value should be less than max value', () => {
      model.setValues([50, 20]);
      expect(model.getValues()[0]).toEqual(20);
      expect(model.getValues()[1]).toEqual(50);
    });

    it('if min value is less than min limit it should be equal to min limit', () => {
      model.setValues([0, 20]);
      model.setMin(10);
      expect(model.getValues()[0]).toEqual(10);
    });

    it('if max value is more than max limit it should be equal to max limit', () => {
      model.setValues([0, 20]);
      model.setMax(10);
      expect(model.getValues()[1]).toEqual(10);
    });
  });

  it('if function get hasLabels is correct', () => {
    model.setLabels(true);
    expect(model.getLabels()).toEqual(true);
  });

  it('if function get hasRange is correct', () => {
    model.setRange(true);
    expect(model.getRange()).toEqual(true);
  });

  it('if function get isVertical is correct', () => {
    const vertical = true;
    model.setOrientation(vertical);
    expect(model.getOrientation()).toEqual(true);
  });

  it('if function get step is correct', () => {
    model.setStep(10);
    expect(model.getStep()).toEqual(10);
  });

  describe('test update method', () => {
    it('should set options correctly', () => {
      const options = {
        min: 0,
        max: 100,
        step: 1,
        hasRange: false,
        hasLabels: false,
        isVertical: false,
        values: [0, 1],
      };
      model.update(options);
      expect(model.getMin()).toEqual(0);
      expect(model.getMax()).toEqual(100);
      expect(model.getStep()).toEqual(1);
      expect(model.getRange()).toBeFalsy();
      expect(model.getLabels()).toBeFalsy();
      expect(model.getOrientation()).toBeFalsy();
      expect(model.getValues()).toEqual([0, 1]);
    });
    it('should set options correctly if they are partly defined', () => {
      const options = {
        hasRange: true,
        hasLabels: true,
        isVertical: true,
        values: [20, 30],
      };
      model.update(options);
      expect(model.getMin()).toEqual(0);
      expect(model.getMax()).toEqual(100);
      expect(model.getStep()).toEqual(1);
      expect(model.getRange()).toBeTruthy();
      expect(model.getLabels()).toBeTruthy();
      expect(model.getOrientation()).toBeTruthy();
      expect(model.getValues()).toEqual([20, 30]);
    });
  });
});
