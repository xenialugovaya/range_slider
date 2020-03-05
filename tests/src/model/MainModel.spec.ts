import { MainModel } from '../../../src/model/MainModel';

describe('test model logic', function() {
  let model: MainModel = new MainModel({});
  beforeEach(() => {
    model = new MainModel({});
  });

  describe('test min/max limits', function() {
    it('functions get/set min are correct', function() {
      model.min = 100;
      expect(model.min).toEqual(Math.round(100 / 10) * 10);
    });
    it('functions get/set max are correct', function() {
      model.max = 300;
      expect(model.max).toEqual(Math.round(300 / 10) * 10);
    });
    it('if min is greater than max, max should be replaced by min value', function() {
      model.min = 300;
      model.max = 200;
      expect(model.max).toEqual(Math.round(300 / 10) * 10);
      expect(model.min).toEqual(Math.round(200 / 10) * 10);
    });
  });

  describe('values should be calculated correctly', function() {
    it('min value should be less than max value', function() {
      model.rangeValue = [50, 20];
      expect(model.rangeValue[0]).toEqual(20);
      expect(model.rangeValue[1]).toEqual(50);
    });

    it('if values are equal, max value should be increased by step', function() {
      model.rangeValue = [20, 20];
      model.step = 5;
      expect(model.rangeValue[1]).toEqual(25);
    });

    it('if min value is less than min limit it should be equal to min limit', function() {
      model.rangeValue = [0, 20];
      model.min = 10;
      expect(model.rangeValue[0]).toEqual(10);
    });

    it('if max value is more than max limit it should be equal to max limit', function() {
      model.rangeValue = [0, 20];
      model.max = 30;
      expect(model.rangeValue[1]).toEqual(20);
    });
  });

  it('if function get hasLabels is correct', function() {
    model.hasLabels = true;
    expect(model.hasLabels).toEqual(true);
  });

  it('if function get hasRange is correct', function() {
    model.hasRange = true;
    expect(model.hasRange).toEqual(true);
  });

  it('if function get isVertical is correct', function() {
    model.isVertical = true;
    expect(model.isVertical).toEqual(true);
  });

  it('if function get step is correct', function() {
    model.step = 10;
    expect(model.step).toEqual(10);
  });

  describe('test update method', function() {
    it('should set options correctly', function() {
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
      expect(model.min).toEqual(0);
      expect(model.max).toEqual(100);
      expect(model.step).toEqual(1);
      expect(model.hasRange).toBeFalsy();
      expect(model.hasLabels).toBeFalsy();
      expect(model.isVertical).toBeFalsy();
      expect(model.rangeValue).toEqual([0, 1]);
    });
    it('should set options correctly if they are partly defined', function() {
      const options = {
        hasRange: true,
        hasLabels: true,
        isVertical: true,
        values: [20, 30],
      };
      model.update(options);
      expect(model.min).toEqual(0);
      expect(model.max).toEqual(100);
      expect(model.step).toEqual(1);
      expect(model.hasRange).toBeTruthy();
      expect(model.hasLabels).toBeTruthy();
      expect(model.isVertical).toBeTruthy();
      expect(model.rangeValue).toEqual([20, 30]);
    });
  });
});
