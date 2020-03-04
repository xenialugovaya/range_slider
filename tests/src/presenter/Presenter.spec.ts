import { Presenter } from '../../../src/presenter/Presenter';
import { MainModel } from '../../../src/model/MainModel';
import { sliderOptions } from '../../../src/model/sliderOptions';

describe('test presenter logic', function() {
  setFixtures('<div class="slider"></div>');
  const parent: any = document.querySelector('.slider');
  const options: sliderOptions = {};

  const model = new MainModel(options);
  const presenter = new Presenter(parent, model);
  describe('test method get for parent html', function() {
    it('should return parent html element', function() {
      expect(presenter.parent).toHaveClass('slider');
    });
  });

  describe('test updateModel method', function() {
    it('should update model options', function() {
      const valueData: sliderOptions = {
        min: 10,
        max: 20,
      };
      spyOn(presenter, 'updateModel').and.callFake(function() {
        if (valueData.min) model.min = valueData.min;
        if (valueData.max) model.max = valueData.max;
        expect(model.min).toEqual(10);
        expect(model.max).toEqual(20);
      });
    });
  });
});
