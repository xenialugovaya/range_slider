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
});
