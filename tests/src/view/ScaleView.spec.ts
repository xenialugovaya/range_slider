import ScaleView from '../../../src/view/ScaleView';
import { definedOptions } from '../../../src/model/definedOptions';

describe('test scale view', () => {
  const slider = document.createElement('div');
  slider.classList.add('slider');
  const sliderBody = document.createElement('div');
  sliderBody.classList.add('slider__body');
  slider.append(sliderBody);

  const options: definedOptions = {
    hasRange: true,
    isVertical: true,
    min: 0,
    step: 1,
    max: 100,
    values: [10, 20],
    hasLabels: true,
    hasScale: true,
  };

  const scale = new ScaleView(slider);

  describe('test scale rendering methods', () => {
    beforeEach(() => {
      options.isVertical = true;
      options.hasScale = true;
    });
    it('scale is rendered in vertical orientation', () => {
      scale.setScale(options);
      expect(slider.firstChild).toHaveClass('slider__scale');
    });
    it('scale is rendered in horizontal orientation', () => {
      options.isVertical = false;
      scale.updateScale(options);
      expect(slider.lastChild).toHaveClass('slider__scale');
    });
    it('scale is not rendered', () => {
      options.hasScale = false;
      scale.updateScale(options);
      expect(slider.querySelector('.slider__scale')).toBeNull();
    });
  });
});
