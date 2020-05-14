import Presenter from '../../../src/presenter/Presenter';
import MainModel from '../../../src/model/MainModel';
import { sliderOptions } from '../../../src/model/sliderOptions';

describe('test presenter logic', () => {
  setFixtures('<div class="slider"></div>');
  const parent: any = document.querySelector('.slider');
  const options: sliderOptions = {};

  const model = new MainModel(options);
  const presenter = new Presenter(parent, model);
  describe('test method get for parent html', () => {
    it('should return parent html element', () => {
      expect(presenter.getParent()).toHaveClass('slider');
    });
  });
});
