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
    facade.minMax = [0, 100];
    facade.rangeValue = [5, 6];
    facade.step = 1;
    facade.isVertical = true;
    facade.hasRange = true;
    facade.hasLabels = true;
  });

  describe('test getters', () => {
    it('should return parent html element', () => {
      expect(facade.parent).toHaveClass('slider');
    });
    it('should return minMax', () => {
      expect(facade.minMax).toEqual([0, 100]);
    });

    it('should return values', () => {
      expect(facade.rangeValue).toEqual([5, 6]);
    });
    it('should return step', () => {
      expect(facade.step).toEqual(1);
    });
    it('should return orientation', () => {
      expect(facade.isVertical).toBeTruthy();
    });
    it('should return range', () => {
      expect(facade.hasRange).toBeTruthy();
    });
    it('should return show labels', () => {
      expect(facade.hasLabels).toBeTruthy();
    });
  });

  describe('test setters', () => {
    it('should set new minMax', () => {
      facade.minMax = [10, 20];
      expect(facade.minMax).toEqual([10, 20]);
    });
    it('should set new values', () => {
      facade.rangeValue = [10, 20];
      expect(facade.rangeValue).toEqual([10, 20]);
    });
    it('should set new step', () => {
      facade.step = 5;
      expect(facade.step).toEqual(5);
    });
    it('should set new orientation', () => {
      facade.isVertical = false;
      expect(facade.isVertical).toBeFalsy();
    });
    it('should set new range', () => {
      facade.hasRange = false;
      expect(facade.hasRange).toBeFalsy();
    });
    it('should set new visibility for labels', () => {
      facade.hasLabels = false;
      expect(facade.hasLabels).toBeFalsy();
    });
  });
});
