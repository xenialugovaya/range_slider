import { MainModel } from '../../../src/model/MainModel';

describe('test model logic', function() {
  const model: MainModel = new MainModel({
    step: 10,
    hasLabels: true,
  });
  it('if functions get/set min is correct', function() {
    model.min = 100;
    expect(model.min).toEqual(Math.round(100 / 10) * 10);
  });
  it('if functions get/set max is correct', function() {
    model.max = 200;
    expect(model.max).toEqual(Math.round(200 / 10) * 10);
  });
  it('if min is greater than max, max should be replaced by min value', function() {
    model.min = 300;
    model.max = 200;
    expect(model.max).toEqual(Math.round(300 / 10) * 10);
    expect(model.min).toEqual(Math.round(200 / 10) * 10);
  });
  it('if function get hasLabels is correct', function() {
    expect(model.hasLabels).toEqual(true);
  });

  it('if function get step is correct', function() {
    expect(model.step).toEqual(10);
  });
});
