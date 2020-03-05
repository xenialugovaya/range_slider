import { MainView } from '../../../src/view/MainView';

describe('test main view logic', function() {
  setFixtures('<div class="slider"></div>');
  const parent: any = document.querySelector('.slider');
  const hasRange = true;
  const isVertical = true;
  const min = 0;
  const max = 100;
  const values = [10, 20];
  const hasLabels = true;

  let view: MainView;

  view = new MainView(parent, hasRange, isVertical, min, max, values, hasLabels);

  describe('method setOrientation should change parent class depending on orientation', function() {
    it('if flag vertical is true, slider class should be slider_vertical', function() {
      const vertical = true;
      view.setOrientation(vertical);
      expect(parent).toHaveClass('slider_vertical');
      expect(parent).not.toHaveClass('slider_horizontal');
    });
    /*  it('if flag vertical is false, slider class should be slider_horizontal', function() {
      const vertical = false;
      view.setOrientation(vertical);
      expect(parent).toHaveClass('slider_horizontal');
      expect(parent).not.toHaveClass('slider_vertical');
    });
    */
  });

  describe('test manipulations with handlers', function() {
    it('method getHandlers should return array of handler html elements', function() {
      expect(view.getHandlers()[0].elem).toHaveClass('handler');
      expect(view.getHandlers()[1].elem).toHaveClass('handler');
    });
    it('method updateHandlersAmount should add/remove handler if range true/false', function() {
      setFixtures('<div class="slider"></div>');
      const parent: any = document.querySelector('.slider');
      const hasRange = true;
      if (parent) {
        view = new MainView(parent, hasRange, isVertical, min, max, values, hasLabels);
      }

      expect($('#handler_max')).toExist();

      let range = false;
      view.updateHandlersAmount(range);
      expect($('#handler_max')).not.toExist();

      range = true;
      view.updateHandlersAmount(range);
      expect($('#handler_max')).toExist();
    });
  });

  describe('getCoords should return start coordinate depending on orientation', function() {
    beforeEach(function() {
      const elem = document.createElement('div');
      document.body.append(elem);
      elem.classList.add('test_coord');
      elem.style.height = '10px';
    });
    it('should return bottom coordiante if vertical flag is true', function() {
      const elem: any = document.querySelector('.test_coord');

      const vertical = true;
      //getBoundingClientRect возвращает 8 по умолчанию
      expect(view.getCoords(elem, vertical)).toEqual(18);
    });
    it('should return left coordiante if vertical flag is false', function() {
      const elem: any = document.querySelector('.test_coord');
      const vertical = false;
      expect(view.getCoords(elem, vertical)).toEqual(8);
    });
  });

  describe('test events', function() {
    it('mousedown event should be triggered on handlers', function() {
      setFixtures('<div class="slider"></div>');
      const parent: any = document.querySelector('.slider');
      const hasRange = true;
      const isVertical = true;
      const min = 0;
      const max = 100;
      const values = [10, 20];
      const hasLabels = true;
      const view = new MainView(parent, hasRange, isVertical, min, max, values, hasLabels);
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
