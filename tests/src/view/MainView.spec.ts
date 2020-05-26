import MainView from '../../../src/view/MainView';
import { definedOptions } from '../../../src/model/definedOptions';


describe('test main view logic', () => {
  setFixtures('<div class="slider"></div>');
  const parent: any = document.querySelector('.slider');
  const options: definedOptions = {
    hasRange: true,
    isVertical: true,
    min: 0,
    step: 1,
    max: 100,
    values: [10, 20],
    hasLabels: true,
  };
  let view: MainView;

  view = new MainView(parent, options);

  describe('method setOrientation should change parent class depending on orientation', () => {
    it('if flag vertical is true, slider class should be slider_vertical', () => {
      const vertical = true;
      view.setOrientation(vertical);
      expect(parent).toHaveClass('slider_vertical');
      expect(parent).not.toHaveClass('slider_horizontal');
    });
  });

  describe('test manipulations with handlers', () => {
    it('method getHandlers should return array of handler html elements', () => {
      expect(view.getHandlers()[0].getElement()).toHaveClass('slider__handler');
      expect(view.getHandlers()[1].getElement()).toHaveClass('slider__handler');
    });
    it('method setRange should add/remove handler if range true/false', () => {
      setFixtures('<div class="slider"></div>');
      const parent: any = document.querySelector('.slider');
      options.hasRange = true;
      if (parent) {
        view = new MainView(parent, options);
      }

      expect($('#handler_max')).toExist();

      let range = false;
      view.setRange(range);
      expect($('#handler_max')).not.toExist();

      range = true;
      view.setRange(range);
      expect($('#handler_max')).toExist();
    });
  });

  describe('getCoords should return start coordinate depending on orientation', () => {
    beforeEach(() => {
      const elem = document.createElement('div');
      document.body.append(elem);
      elem.classList.add('test_coordinates');
      elem.style.height = '10px';
    });
    it('should return bottom coordiante if vertical flag is true', () => {
      const elem: any = document.querySelector('.test_coordinates');

      const vertical = true;
      // getBoundingClientRect возвращает 8 по умолчанию
      expect(view.getCoordinates(elem, vertical)).toEqual(18);
    });
    it('should return left coordiante if vertical flag is false', () => {
      const elem: any = document.querySelector('.test_coordinates');
      const vertical = false;
      expect(view.getCoordinates(elem, vertical)).toEqual(8);
    });
  });

  describe('test events', () => {
    it('mousedown event should be triggered on handlers', () => {
      setFixtures('<div class="slider"></div>');
      const parent: any = document.querySelector('.slider');
      const options: definedOptions = {
        hasRange: true,
        isVertical: true,
        min: 0,
        max: 100,
        step: 1,
        values: [10, 20],
        hasLabels: true,
      };
      const view = new MainView(parent, options);
      const handlerMin = document.querySelector('#handler_min') as HTMLElement;
      const handlerMax = document.querySelector('#handler_max') as HTMLElement;
      spyOn(view.observer, 'broadcast').and.callThrough();
      handlerMin.dispatchEvent(new MouseEvent('mousedown'));
      document.dispatchEvent(new MouseEvent('mousemove'));

      expect(view.observer.broadcast).toHaveBeenCalled();

      document.dispatchEvent(new MouseEvent('mouseup'));

      handlerMax.dispatchEvent(new MouseEvent('mousedown'));
      document.dispatchEvent(new MouseEvent('mousemove'));
      expect(view.observer.broadcast).toHaveBeenCalled();
    });
  });
});
