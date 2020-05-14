import { sliderOptions } from '../../../src/model/sliderOptions';
import Facade from '../../../src/presenter/Facade';

describe('test facade', () => {
  setFixtures('<div class="slider"></div>');
  const parent: any = document.querySelector('.slider');
  const options: sliderOptions = {
    min: 0,
    max: 100,
    values: [5, 6],
    step: 1,
    isVertical: true,
    hasRange: true,
    hasLabels: true,
  };

  const facade = new Facade(parent, options);

  afterEach(() => {
    facade.setMinMax([0, 100]);
    facade.setValues([5, 6]);
    facade.setStep(1);
    facade.setOrientation(true);
    facade.setRange(true);
    facade.setLabels(true);
  });

  describe('test getters', () => {
    it('should return parent html element', () => {
      expect(facade.getParent()).toHaveClass('slider');
    });
    it('should return minMax', () => {
      expect(facade.getMinMax()).toEqual([0, 100]);
    });

    it('should return values', () => {
      expect(facade.getValues()).toEqual([5, 6]);
    });
    it('should return step', () => {
      expect(facade.getStep()).toEqual(1);
    });
    it('should return orientation', () => {
      expect(facade.getOrientation()).toBeTruthy();
    });
    it('should return range', () => {
      expect(facade.getRange()).toBeTruthy();
    });
    it('should return show labels', () => {
      expect(facade.getLabels()).toBeTruthy();
    });
  });

  describe('test setters', () => {
    it('should set new minMax', () => {
      facade.setMinMax([10, 20]);
      expect(facade.getMinMax()).toEqual([10, 20]);
    });
    it('should set new values', () => {
      facade.setValues([10, 20]);
      expect(facade.getValues()).toEqual([10, 20]);
    });
    it('should set new step', () => {
      facade.setStep(5);
      expect(facade.getStep()).toEqual(5);
    });
    it('should set new orientation', () => {
      facade.setOrientation(false);
      expect(facade.getOrientation()).toBeFalsy();
    });
    it('should set new range', () => {
      facade.setRange(false);
      expect(facade.getRange()).toBeFalsy();
    });
    it('should set new visibility for labels', () => {
      facade.setLabels(false);
      expect(facade.getLabels()).toBeFalsy();
    });
  });
});
