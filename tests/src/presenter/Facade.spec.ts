import { sliderOptions } from '../../../src/model/sliderOptions';
import { Facade } from '../../../src/presenter/Facade';

describe('test facade', function() {
  setFixtures('<div class="slider"></div>');
  const parent: HTMLElement | null = document.querySelector('.slider');
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

  afterEach(function() {
    facade.minMax = [0, 100];
    facade.rangeValue = [5, 6];
    facade.step = 1;
    facade.isVertical = true;
    facade.hasRange = true;
    facade.hasLabels = true;
  });

  describe('test getters', function() {
    it('should return parent html element', function() {
      expect(facade.parent).toHaveClass('slider');
    });
    it('should return minMax', function() {
      expect(facade.minMax).toEqual([0, 100]);
    });

    it('should return values', function() {
      expect(facade.rangeValue).toEqual([5, 6]);
    });
    it('should return step', function() {
      expect(facade.step).toEqual(1);
    });
    it('should return orientation', function() {
      expect(facade.isVertical).toBeTruthy();
    });
    it('should return range', function() {
      expect(facade.hasRange).toBeTruthy();
    });
    it('should return show labels', function() {
      expect(facade.hasLabels).toBeTruthy();
    });
  });

  describe('test setters', function() {
    it('should set new minMax', function() {
      facade.minMax = [10, 20];
      expect(facade.minMax).toEqual([10, 20]);
    });
    it('should set new values', function() {
      facade.rangeValue = [10, 20];
      expect(facade.rangeValue).toEqual([10, 20]);
    });
    it('should set new step', function() {
      facade.step = 5;
      expect(facade.step).toEqual(5);
    });
    it('should set new orientation', function() {
      facade.isVertical = false;
      expect(facade.isVertical).toBeFalsy();
    });
    it('should set new range', function() {
      facade.hasRange = false;
      expect(facade.hasRange).toBeFalsy();
    });
    it('should set new visibility for labels', function() {
      facade.hasLabels = false;
      expect(facade.hasLabels).toBeFalsy();
    });
  });
});
